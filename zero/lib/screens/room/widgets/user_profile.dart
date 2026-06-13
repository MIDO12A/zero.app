import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';
import '../../../services/level_service.dart';
import '../../../services/supabase_service.dart';
import 'svga_frame.dart';
import 'svga_player.dart';
import 'vip_cover_animator.dart';

class UserProfile extends StatefulWidget {
  final Map<String, dynamic> user;
  final bool showMicControls;
  final bool isCurrentUser;
  final bool isFollowed;
  final VoidCallback? onClose;
  final VoidCallback? onViewProfile;
  final VoidCallback? onFollow;
  final VoidCallback? onChat;
  final VoidCallback? onMention;
  final VoidCallback? onGift;
  final VoidCallback? onMicDown;
  final VoidCallback? onMicMute;

  const UserProfile({
    super.key,
    required this.user,
    this.showMicControls = false,
    this.isCurrentUser = false,
    this.isFollowed = false,
    this.onClose,
    this.onViewProfile,
    this.onFollow,
    this.onChat,
    this.onMention,
    this.onGift,
    this.onMicDown,
    this.onMicMute,
  });

  @override
  State<UserProfile> createState() => _UserProfileState();
}

class _UserProfileState extends State<UserProfile> {
  List<Map<String, dynamic>> _badgesCatalog = [];
  List<String> _ownedBadgeIds = [];
  List<String> _ownedLevelBadgeUrls = [];
  List<Map<String, String?>> _necklaces = [];
  List<Map<String, dynamic>> _rechargeNecklaces = [];
  Map<String, dynamic> _extraUserData = {};
  bool _dataLoaded = false;
  Map<String, String> _storeSvgaMap = {}; // itemId -> svgaAsset URL
  List<Map<String, String?>> _showcaseItems = [];
  List<String> _showcaseCategories = [];

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    final uid = widget.user['id']?.toString();
    if (uid == null) return;
    try {
      final svc = SupabaseService();
      final userData = await svc.client
          .from('users')
          .select('active_frame, active_cover, owned_badges, owned_level_badges, wealth_level, recharge_level, gems_level, owned_level_frames, owned_level_badges, owned_items')
          .eq('uid', uid)
          .maybeSingle();
      if (userData != null) {
        _extraUserData = userData;
        _ownedBadgeIds = (userData['owned_badges'] as List?)?.cast<String>() ?? [];
        _ownedLevelBadgeUrls = (userData['owned_level_badges'] as List?)?.cast<String>() ?? [];
      }
      // Auto-award recharge necklaces
      try {
        final rl = (userData?['recharge_level'] ?? 1).toInt();
        await svc.awardRechargeNecklaces(uid, rl);
      } catch (_) {}
      // Load badges catalog
      try {
        final badges = await svc.getBadgesCatalog();
        _badgesCatalog = badges;
      } catch (_) {}
      // Load necklaces catalog and build recharge list
      try {
        final nCat = await svc.getNecklacesCatalog();
        final ownedN = (userData?['owned_necklaces'] as List?)?.map((e) => e.toString()).toList() ?? [];
        final rn = <Map<String, dynamic>>[];
        for (final n in nCat) {
          if (n['type']?.toString() == 'recharge') {
            final req = (n['required_recharge_level'] ?? 0).toInt();
            if (req > 0 && ownedN.contains(n['id']?.toString())) {
              rn.add(n);
            }
          }
        }
        _rechargeNecklaces = rn;
      } catch (_) {}
      // Load store items to resolve itemId -> svgaAsset URL
      try {
        final storeItems = await svc.client
            .from('store_items')
            .select('item_id, svga_asset');
        if (storeItems != null) {
          for (final item in (storeItems as List)) {
            final id = item['item_id']?.toString();
            final svga = item['svga_asset']?.toString();
            if (id != null && svga != null && svga.isNotEmpty) {
              _storeSvgaMap[id] = svga;
            }
          }
        }
      } catch (_) {}
      try {
        final gifts = await svc.getGiftedItems(uid);
        _necklaces = gifts
            .where((g) => g.itemCategory == 'necklace')
            .map((g) => {'icon': g.itemIcon, 'svga': g.svgaAsset, 'name': g.itemName})
            .toList();
        _showcaseItems = gifts.map((g) => {
          'name': g.itemName,
          'icon': g.itemIcon,
          'svga': g.svgaAsset,
          'category': g.itemCategory,
        }).toList();
        final cats = gifts.map((g) => g.itemCategory).toSet().where((c) => c.isNotEmpty && c != 'necklace').toList()..sort();
        _showcaseCategories = cats;
      } catch (_) {}
    } catch (_) {}
    if (mounted) setState(() => _dataLoaded = true);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onClose,
      behavior: HitTestBehavior.opaque,
      child: Container(
        color: Colors.black54,
        alignment: Alignment.bottomCenter,
        child: GestureDetector(onTap: () {}, child: _buildSheet()),
      ),
    );
  }

  Widget _buildSheet() {
    final avatar = widget.user['avatar']?.toString() ?? R.avaBoy;
    final name = widget.user['name']?.toString() ?? 'User';
    final vipLevel = widget.user['vipLevel']?.toString();

    return VipCoverAnimator(
      vipLevel: vipLevel,
          child: Stack(
        clipBehavior: Clip.none,
        alignment: Alignment.topCenter,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
            child: Container(
              margin: const EdgeInsets.only(top: 49),
              color: Colors.white,
              child: Stack(
                children: [
                  if (_extraUserData['active_cover']?.toString() != null &&
                      _extraUserData['active_cover'].toString().isNotEmpty)
                    Positioned.fill(
                      child: SvgaPlayer(
                        assetPath: _resolveSvga(_extraUserData['active_cover'].toString()),
                        fit: BoxFit.cover,
                      ),
                    ),
                  Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(height: 48),
                _buildUserInfo(name),
                _buildNecklacesRow(),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 24),
                  child: _buildMedals(vipLevel),
                ),
                if (_rechargeNecklaces.isNotEmpty) _buildRechargeNecklacesRow(),
                _buildBadgesSection(),
                if (_showcaseCategories.isNotEmpty) _buildShowcaseSection(),
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 61,
                    vertical: 24,
                  ),
                  child: _buildFollowRow(),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: SizedBox(height: 36, child: _buildOperateRow()),
                ),
                if (widget.showMicControls)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(79, 4, 79, 0),
                    child: _buildMicOperate(),
                  ),
                const SizedBox(height: 12),
              ],
            ),
          ],
        ),
      ),
    ),
    Positioned(
      top: 5,
      child: GestureDetector(
        onTap: widget.onViewProfile,
        child: Stack(
          alignment: Alignment.center,
          children: [
            Container(
              width: 88,
              height: 88,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white, width: 3),
              ),
              child: ClipOval(
                child: R.loadImage(
                  avatar,
                  width: 88,
                  height: 88,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            if (_extraUserData['active_frame'] != null || (_extraUserData['owned_level_frames'] as List?)?.isNotEmpty == true)
              SvgaFrame(
                svgaPath: _resolveSvga(_extraUserData['active_frame']?.toString() ?? (_extraUserData['owned_level_frames'] as List).last.toString()),
                size: 104,
              ),
          ],
        ),
      ),
    ),
          Positioned(
            top: 49 + 8,
            left: 0,
            child: GestureDetector(
              onTap: () {},
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: R.image(
                  R.roomUserinfoMoreIc,
                  width: 20,
                  height: 20,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildUserInfo(String name) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 25),
          child: Text(
            name,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Color(0xFF16151A),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(top: 5),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: const Color(0xFFF5F5F5),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(
              'ID: ${(widget.user['customId'] ?? widget.user['uid'] ?? '------')}',
              style: const TextStyle(fontSize: 10, color: Color(0xFF9BA1B6)),
            ),
          ),
        ),
        _buildLevelBadge({...widget.user, ..._extraUserData}),
      ],
    );
  }

  Widget _buildNecklacesRow() {
    if (!_dataLoaded || _necklaces.isEmpty) return const SizedBox();
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: _necklaces.take(4).map((n) {
          final svga = n['svga'];
          final icon = n['icon'] ?? '';
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 3),
            child: Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: const Color(0xFFF5F0FF),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: const Color(0xFFD4B8FF).withOpacity(0.5)),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(7),
                child: svga != null && svga.isNotEmpty
                    ? SvgaPlayer(assetPath: svga, width: 44, height: 44)
                    : (icon.isNotEmpty ? R.loadAsset(icon) : const SizedBox()),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildRechargeNecklacesRow() {
    final items = _rechargeNecklaces.take(4).toList();
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: items.map((n) {
          final svga = n['svga_url']?.toString();
          final img = n['image_url']?.toString();
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 6),
            child: Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: const Color(0xFFF5F0FF),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: const Color(0xFFD4B8FF).withOpacity(0.5)),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(7),
                child: svga != null && svga.isNotEmpty
                    ? SvgaPlayer(assetPath: svga, width: 44, height: 44)
                    : (img != null && img.isNotEmpty
                        ? R.loadAsset(img)
                        : const SizedBox()),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildMedals(String? vipLevel) {
    final vipLabel = vipLevel != null ? vipLevel : 'VIP';
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFFAB7BFF), Color(0xFF7B4FFF)],
            ),
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFAB7BFF).withOpacity(0.4),
                blurRadius: 8,
                spreadRadius: 0,
              ),
            ],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.workspace_premium, size: 10, color: Colors.white),
              const SizedBox(width: 4),
              Text(
                vipLabel,
                style: const TextStyle(
                  fontSize: 10,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(width: 6),
        _medal('Host', const Color(0xFFFF8C42)),
        const SizedBox(width: 6),
        _medal('Music', const Color(0xFF36BFFF)),
      ],
    );
  }

  Widget _medal(String text, Color c) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
    decoration: BoxDecoration(
      color: c.withValues(alpha: 0.12),
      borderRadius: BorderRadius.circular(20),
      border: Border.all(color: c.withValues(alpha: 0.4)),
    ),
    child: Text(text, style: TextStyle(fontSize: 10, color: c)),
  );

  Widget _buildBadgesSection() {
    if (!_dataLoaded) return const SizedBox();
    final badgeWidgets = <Widget>[];
    for (final id in _ownedBadgeIds) {
      final match = _badgesCatalog.where((b) => b['id']?.toString() == id).toList();
      if (match.isNotEmpty) {
        final b = match.first;
        final svga = b['svga_url']?.toString();
        final img = b['image_url']?.toString();
        badgeWidgets.add(_badgeItem(svga: svga, img: img));
      } else {
        badgeWidgets.add(_badgeTextItem(id));
      }
    }
    for (final url in _ownedLevelBadgeUrls) {
      badgeWidgets.add(_badgeItem(svga: url, img: null));
    }
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFFF8F8F8),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          const Text(
            'Badges',
            style: TextStyle(
              fontSize: 12,
              color: Color(0xFF16151A),
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: badgeWidgets.isEmpty
                ? const Text('لا توجد شارات بعد',
                    style: TextStyle(fontSize: 10, color: Color(0xFF9BA1B6)))
                : Wrap(
                    spacing: 4,
                    runSpacing: 4,
                    alignment: WrapAlignment.end,
                    children: badgeWidgets.take(8).toList(),
                  ),
          ),
          if (badgeWidgets.length > 8)
            Padding(
              padding: const EdgeInsets.only(left: 4),
              child: Text(
                '+${badgeWidgets.length - 8}',
                style: const TextStyle(fontSize: 10, color: Color(0xFF9BA1B6)),
              ),
            ),
        ],
      ),
    );
  }

  Widget _badgeItem({String? svga, String? img}) {
    return Container(
      width: 26,
      height: 26,
      decoration: BoxDecoration(
        color: Colors.amber.withOpacity(0.1),
        borderRadius: BorderRadius.circular(13),
        border: Border.all(color: Colors.amber.withOpacity(0.3)),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(13),
        child: svga != null && svga.isNotEmpty
            ? SvgaPlayer(assetPath: svga, width: 26, height: 26)
            : (img != null && img.isNotEmpty
                ? R.loadAsset(img)
                : const SizedBox()),
      ),
    );
  }

  Widget _badgeTextItem(String text) {
    return Container(
      width: 26,
      height: 26,
      decoration: BoxDecoration(
        color: Colors.amber.withOpacity(0.1),
        borderRadius: BorderRadius.circular(13),
        border: Border.all(color: Colors.amber.withOpacity(0.3)),
      ),
      alignment: Alignment.center,
      child: Text(text.length > 3 ? text.substring(0, 3) : text,
          style: const TextStyle(fontSize: 6, color: Color(0xFF9BA1B6))),
    );
  }

  Widget _buildShowcaseSection() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFFF8F8F8),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Showcase', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
          const SizedBox(height: 8),
          SizedBox(
            height: 52,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: _showcaseCategories.expand((cat) {
                final items = _showcaseItems.where((i) => i['category'] == cat).toList();
                return [
                  Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: Center(
                      child: Text(cat, style: const TextStyle(fontSize: 10, color: Color(0xFF9BA1B6))),
                    ),
                  ),
                  ...items.take(4).map((item) {
                    final svga = item['svga'];
                    final icon = item['icon'] ?? '';
                    return Padding(
                      padding: const EdgeInsets.only(right: 6),
                      child: Container(
                        width: 44, height: 44,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(7),
                          child: svga != null && svga.isNotEmpty
                              ? SvgaPlayer(assetPath: svga, width: 44, height: 44)
                              : (icon.isNotEmpty ? R.loadAsset(icon) : const SizedBox()),
                        ),
                      ),
                    );
                  }),
                ];
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFollowRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _countItem(widget.user['following']?.toString() ?? '0', 'Following'),
        const SizedBox(width: 24),
        _countItem(widget.user['fans']?.toString() ?? '0', 'Fans'),
        const SizedBox(width: 24),
        _countItem(widget.user['visitors']?.toString() ?? '0', 'Visitors'),
      ],
    );
  }

  Widget _countItem(String count, String label) => Column(
    children: [
      Text(
        count,
        style: const TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.bold,
          color: Color(0xFF16151A),
        ),
      ),
      const SizedBox(height: 2),
      Text(
        label,
        style: const TextStyle(fontSize: 10, color: Color(0x8016151A)),
      ),
    ],
  );

  Widget _buildOperateRow() {
    if (widget.isCurrentUser) {
      return Row(
        children: [
          Expanded(
            child: GestureDetector(
              onTap: widget.onChat,
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 4),
                height: 36,
                decoration: BoxDecoration(
                  gradient: AppColors.giftBtnGradient,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    R.image(
                      R.roomUserChatIc,
                      width: 20,
                      height: 20,
                    ),
                    const SizedBox(width: 4),
                    const Text(
                      'Message',
                      style: TextStyle(fontSize: 11, color: Colors.white),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      );
    }

    return Row(
      children: [
        Expanded(
          child: GestureDetector(
            onTap: widget.onFollow,
            child: Container(
              margin: const EdgeInsets.only(right: 4),
              height: 36,
              decoration: BoxDecoration(
                color: widget.isFollowed ? Colors.red.shade50 : const Color(0xFFF5F5F5),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    widget.isFollowed ? Icons.favorite : Icons.favorite_border,
                    color: widget.isFollowed ? Colors.red : const Color(0xFF16151A),
                    size: 16,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    widget.isFollowed ? 'Following' : 'Follow',
                    style: TextStyle(
                      fontSize: 11,
                      color: widget.isFollowed ? Colors.red : const Color(0xFF16151A),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        Expanded(
          child: GestureDetector(
            onTap: widget.onChat,
            child: _opBtn(
              icon: R.roomUserChatIc,
              label: 'Chat',
              marginStart: 4,
              marginEnd: 4,
            ),
          ),
        ),
        Expanded(
          child: GestureDetector(
            onTap: widget.onMention,
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 4),
              height: 36,
              decoration: BoxDecoration(
                color: const Color(0xFFF5F5F5),
                borderRadius: BorderRadius.circular(8),
              ),
              alignment: Alignment.center,
              child: R.image(
                R.roomMicOperateAtSign,
                width: 20,
                height: 20,
              ),
            ),
          ),
        ),
        Expanded(
          child: GestureDetector(
            onTap: widget.onGift,
            child: Container(
              margin: const EdgeInsets.only(left: 4),
              height: 36,
              decoration: BoxDecoration(
                gradient: AppColors.giftBtnGradient,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  R.image(
                    R.roomUserInfoGiftIc,
                    width: 20,
                    height: 20,
                  ),
                  const SizedBox(width: 4),
                  const Text(
                    'Gift',
                    style: TextStyle(fontSize: 11, color: Colors.white),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _opBtn({
    required String icon,
    required String label,
    double marginStart = 0,
    double marginEnd = 0,
  }) => Container(
    margin: EdgeInsets.only(left: marginStart, right: marginEnd),
    height: 36,
    decoration: BoxDecoration(
      color: const Color(0xFFF5F5F5),
      borderRadius: BorderRadius.circular(8),
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Image.asset(
          icon,
          width: 16,
          height: 16,
          errorBuilder: (_, __, ___) => const SizedBox(),
        ),
        const SizedBox(width: 4),
        Text(
          label,
          style: const TextStyle(fontSize: 11, color: Color(0xFF16151A)),
        ),
      ],
    ),
  );

  Widget _buildMicOperate() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        GestureDetector(
          onTap: widget.onMicDown,
          child: R.image(
            R.roomMicDown,
            width: 40,
            height: 40,
          ),
        ),
        GestureDetector(
          onTap: widget.onMicMute,
          child: R.image(
            R.roomMicOff,
            width: 40,
            height: 40,
          ),
        ),
      ],
    );
  }

  Widget _buildLevelBadge(Map<String, dynamic> user) {
    return Padding(
      padding: const EdgeInsets.only(top: 5),
      child: Column(
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _levelChip(user['wealth_level'] ?? 1, 'wealth'),
              const SizedBox(width: 4),
              _levelChip(user['recharge_level'] ?? 1, 'recharge'),
              const SizedBox(width: 4),
              _levelChip(user['gems_level'] ?? 1, 'gems'),
            ],
          ),
        ],
      ),
    );
  }

  String _resolveSvga(String itemId) {
    if (itemId.startsWith('http://') || itemId.startsWith('https://')) return itemId;
    return _storeSvgaMap[itemId] ?? itemId;
  }

  Widget _levelChip(int level, String type) {
    final config = LevelService().getLevelConfig(type, level);
    final url = config?.imageUrl;
    if (url != null) {
      return Container(
        width: 32,
        height: 32,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: R.loadAsset(url),
        ),
      );
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        gradient: AppColors.giftBtnGradient,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Text(
        'Lv.$level',
        style: const TextStyle(fontSize: 10, color: Colors.white),
      ),
    );
  }
}
