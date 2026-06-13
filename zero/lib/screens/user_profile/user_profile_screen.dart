import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import '../../config/r.dart';
import '../../config/app_colors.dart';
import '../../services/dynamic_config_service.dart';
import '../../services/level_service.dart';
import '../../services/supabase_service.dart';
import '../../services/cloudinary_service.dart';
import '../../providers/user_provider.dart';
import '../../models/user_model.dart';
import '../../models/profile_config.dart';
import '../../models/gift_model.dart' as gm;
import '../../models/gifted_item_model.dart';
import '../room/widgets/svga_player.dart';
import '../room/widgets/svga_frame.dart';
import '../follow/follow_recent_screen.dart';
import '../room/room_screen.dart';

class UserProfileScreen extends StatefulWidget {
  final String? targetUid;

  const UserProfileScreen({super.key, this.targetUid});

  @override
  State<UserProfileScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen> {
  final supabase = SupabaseService();
  UserModel? _user;
  bool _loading = true;
  bool _isFollowing = false;
  List<gm.SentGiftModel> _receivedGifts = [];
  List<GiftedItemModel> _ownedItemsAll = [];
  List<Map<String, dynamic>> _badgesCatalog = [];
  List<GiftedItemModel> _ownedNecklaces = [];
  List<Map<String, dynamic>> _rechargeNecklaces = [];
  String? _currentRoomId;
  int _chartTab = 0;
  List<String> _showcaseTabs = ['Gift'];
  gm.SentGiftModel? _selectedGift;
  GiftedItemModel? _selectedItem;
  Map<String, gm.GiftModel> _giftsCatalog = {};
  bool _uploadingCover = false;
  String? _profileBgUrl;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      final uid = widget.targetUid;
      final userProvider = Provider.of<UserProvider>(context, listen: false);
      final currentUser = userProvider.currentUser;

      UserModel? targetUser;
      if (uid != null) {
        targetUser = await supabase.getUser(uid);
        if (currentUser != null) {
          final following = await supabase.isFollowing(currentUser.uid, uid);
          if (mounted) setState(() => _isFollowing = following);
        }
        if (targetUser != null) {
          supabase.incrementVisitors(uid);
        }
      } else {
        targetUser = currentUser;
      }

      if (targetUser != null) {
        final uidVal = targetUser.uid;
        // Auto-award recharge necklaces
        final added = await supabase.awardRechargeNecklaces(uidVal, targetUser.rechargeLevel);
        if (added.isNotEmpty) {
          targetUser = await supabase.getUser(uidVal);
        }
        final gifts = await supabase.getReceivedGifts(uidVal);
        final badgesCat = await supabase.getBadgesCatalog();
        final nCat = await supabase.getNecklacesCatalog();
        final roomId = await supabase.getUserCurrentRoomId(uidVal);
        final giftsCat = await supabase.getGiftsCatalog();
        final ownedGifted = await supabase.getGiftedItems(uidVal);
        final necklaces = ownedGifted.where((i) => i.itemCategory == 'necklace').toList();
        final categories = ownedGifted.map((i) => i.itemCategory).toSet().where((c) => c.isNotEmpty).toList()..sort();
        final tabs = ['Gift', ...categories];
        // Build list of recharge necklaces for display under levels
        final rechargeNList = <Map<String, dynamic>>[];
        final ownedNIds = targetUser?.ownedNecklaces ?? [];
        for (final n in nCat) {
          if (n['type']?.toString() == 'recharge') {
            final req = (n['required_recharge_level'] ?? 0).toInt();
            if (req > 0 && ownedNIds.contains(n['id']?.toString())) {
              rechargeNList.add(n);
            }
          }
        }
        Map<String, dynamic>? extraUserData;
        try {
          extraUserData = await supabase.client
              .from('users')
              .select('profile_bg_url')
              .eq('uid', uidVal)
              .maybeSingle();
        } catch (_) {}
        if (mounted) {
          setState(() {
            _user = targetUser;
            _receivedGifts = gifts;
            _ownedItemsAll = ownedGifted;
            _badgesCatalog = badgesCat;
            _ownedNecklaces = necklaces;
            _rechargeNecklaces = rechargeNList;
            _showcaseTabs = tabs;
            _currentRoomId = roomId;
            _giftsCatalog = giftsCat;
            _profileBgUrl = extraUserData?['profile_bg_url']?.toString();
            _loading = false;
          });
        }
      } else {
        if (mounted) setState(() => _loading = false);
      }
    } catch (e) {
      debugPrint('_loadData error: $e');
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _toggleFollow() async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final currentUser = userProvider.currentUser;
    if (currentUser == null || _user == null) return;
    if (_isFollowing) {
      await supabase.unfollowUser(currentUser.uid, _user!.uid);
    } else {
      await supabase.followUser(currentUser.uid, _user!.uid);
    }
    if (mounted) setState(() => _isFollowing = !_isFollowing);
  }

  Future<void> _navigateToRoom() async {
    final roomId = _currentRoomId ?? _user?.hostedRoomId;
    if (roomId == null || roomId.isEmpty) return;
    final room = await supabase.getRoom(roomId);
    if (room == null || !mounted) return;
    navigateToRoom(context,
        roomName: room.name,
        hostName: room.hostName,
        roomId: room.roomId,
        roomPassword: room.password,
        hotValue: room.totalGifts.toString(),
        gameDesc: room.description);
  }

  Future<void> _navigateToChat() async {
    if (_user == null || widget.targetUid == null) return;
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final currentUser = userProvider.currentUser;
    if (currentUser == null) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => ChatScreen(
          targetUid: _user!.uid,
          targetName: _user!.name,
          targetPhotoUrl: _user!.photoUrl,
        ),
      ),
    );
  }

  Future<void> _pickAndUploadCover() async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(source: ImageSource.gallery);
    if (picked == null) return;
    if (!mounted) return;
    setState(() => _uploadingCover = true);
    try {
      final url = await CloudinaryService().uploadImage(File(picked.path));
      if (!mounted) return;
      final userProvider = Provider.of<UserProvider>(context, listen: false);
      final uid = userProvider.currentUser?.uid;
      if (uid != null) {
        await supabase.updateUser(uid, {'profile_bg_url': url});
        if (mounted) setState(() => _profileBgUrl = url);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Upload failed: $e')),
        );
      }
    }
    if (mounted) setState(() => _uploadingCover = false);
  }

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);
    final user = _user ?? userProvider.currentUser;

    return ListenableBuilder(
      listenable: DynamicConfigService(),
      builder: (context, _) {
        final config = DynamicConfigService();
        final pf = ProfileConfig.fromConfig(config);
        return Scaffold(
          backgroundColor: config.primaryBg,
          body: SafeArea(
            child: Stack(
              children: [
                _loading
                    ? const Center(child: CircularProgressIndicator())
                    : SingleChildScrollView(
                        child: Column(
                          children: [
                            _buildHeader(context, config, pf, user),
                            _buildAvatarSection(config, user),
                            _buildUserInfo(config, user),
                            _buildStatsRow(context, config, user),
                            _buildLevelsRow(config, user),
                            if (_rechargeNecklaces.isNotEmpty)
                              _buildRechargeNecklacesSection(config),
                            if (user != null)
                              _buildOwnedBadgesSection(config, user),
                            _buildChartSection(config, user),
                            _buildAboutSection(config, user),
                            if (pf.showChatRoom) _buildRoomCard(config, user),
                            _buildActionButtons(config, user),
                            const SizedBox(height: 32),
                          ],
                        ),
                      ),
                if (_selectedGift != null) _buildGiftOverlay(config),
                if (_selectedItem != null) _buildItemOverlay(config),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildHeader(BuildContext context, DynamicConfigService config,
      ProfileConfig pf, UserModel? user) {
    return SizedBox(
      height: pf.headerHeight,
      child: Stack(
        children: [
          Container(
            width: double.infinity,
            height: pf.headerHeight,
            decoration: BoxDecoration(
              gradient: pf.headerGradient ??
                  LinearGradient(
                    colors: [
                      config.buttonColor,
                      config.buttonColor.withValues(alpha: 0.7),
                    ],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
            ),
            child: (pf.headerBgUrl != null && pf.headerBgUrl!.isNotEmpty
                ? Image.network(pf.headerBgUrl!, fit: BoxFit.cover)
                : null),
          ),
          if (pf.headerCoverOverlay)
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Colors.black.withValues(alpha: 0.4),
                      Colors.transparent,
                      Colors.black.withValues(alpha: 0.6),
                    ],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                ),
              ),
            ),
          Positioned(
            top: 8,
            left: 8,
            child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: Colors.black.withValues(alpha: 0.3),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.arrow_back,
                    color: Colors.white, size: 20),
              ),
            ),
          ),
          if (widget.targetUid == null)
            Positioned(
              top: 8,
              right: 8,
              child: GestureDetector(
                onTap: _uploadingCover ? null : _pickAndUploadCover,
                child: Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    color: Colors.black.withValues(alpha: 0.3),
                    shape: BoxShape.circle,
                  ),
                  child: _uploadingCover
                      ? const SizedBox(
                          width: 18, height: 18,
                          child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Icon(Icons.edit,
                          color: Colors.white, size: 18),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildAvatarSection(
      DynamicConfigService config, UserModel? user) {
    return Column(
      children: [
        // Cover banner behind avatar
        Container(
          width: double.infinity,
          height: 120,
          decoration: BoxDecoration(
            color: config.primaryBg,
            image: (_profileBgUrl != null && _profileBgUrl!.isNotEmpty)
                ? DecorationImage(image: NetworkImage(_profileBgUrl!), fit: BoxFit.cover)
                : null,
          ),
        ),
        // Avatar overlaps the bottom of the banner
        Transform.translate(
          offset: const Offset(0, -50),
          child: Column(
            children: [
              Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 4),
                    ),
                    child: ClipOval(
                      child: (user?.photoUrl != null && user!.photoUrl.isNotEmpty)
                          ? Image.network(user.photoUrl, fit: BoxFit.cover)
                          : Image.asset(R.avaBoy, fit: BoxFit.cover),
                    ),
                  ),
                  _buildFrameWidget(user?.activeFrame),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Flexible(
                    child: Text(
                      user?.name ?? 'اسم المستخدم',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: config.goldColor,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(width: 6),
                  Icon(
                    user?.gender == 'female'
                        ? Icons.female
                        : Icons.male,
                    size: 14,
                    color: user?.gender == 'female'
                        ? Colors.pink
                        : Colors.blue,
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'ID: ${(user?.customId ?? '').isNotEmpty ? user!.customId : user?.uid.substring(0, 8) ?? '12345678'}',
                    style: TextStyle(
                      fontSize: 12,
                      color: config.goldColor.withValues(alpha: 0.7),
                    ),
                  ),
                  const SizedBox(width: 4),
                  GestureDetector(
                    onTap: () {},
                    child: Icon(
                      Icons.copy,
                      size: 14,
                      color: config.goldColor.withValues(alpha: 0.7),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildUserInfo(
      DynamicConfigService config, UserModel? user) {
    return const SizedBox.shrink();
  }

  Widget _buildStatsRow(BuildContext context,
      DynamicConfigService config, UserModel? user) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          GestureDetector(
            onTap: () => Navigator.push(context,
                MaterialPageRoute(builder: (_) => const FollowRecentScreen(initialTab: 0))),
            child: _statItem('${user?.following ?? 0}', 'Following', config),
          ),
          GestureDetector(
            onTap: () => Navigator.push(context,
                MaterialPageRoute(builder: (_) => const FollowRecentScreen(initialTab: 1))),
            child: _statItem('${user?.followers ?? 0}', 'Fans', config),
          ),
          GestureDetector(
            onTap: () => Navigator.push(context,
                MaterialPageRoute(builder: (_) => const FollowRecentScreen(initialTab: 2))),
            child: _statItem('${user?.visitors ?? 0}', 'Visitors', config),
          ),
        ],
      ),
    );
  }

  Widget _buildLevelsRow(
      DynamicConfigService config, UserModel? user) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          _buildLevelBadge(user?.wealthLevel ?? 1, 'wealth'),
          const SizedBox(width: 8),
          _buildLevelBadge(user?.rechargeLevel ?? 1, 'recharge'),
          const SizedBox(width: 8),
          _buildLevelBadge(user?.gemsLevel ?? 1, 'gems'),
        ],
      ),
    );
  }

  Widget _buildRechargeNecklacesSection(DynamicConfigService config) {
    final items = _rechargeNecklaces.take(4).toList();
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: items.map((n) {
          final svga = n['svga_url']?.toString();
          final img = n['image_url']?.toString();
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 6),
            child: Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: config.goldColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: config.goldColor.withValues(alpha: 0.3)),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(11),
                child: svga != null && svga.isNotEmpty
                    ? SvgaPlayer(assetPath: svga, width: 48, height: 48)
                    : (img != null && img.isNotEmpty
                        ? Image.network(img, fit: BoxFit.contain,
                            errorBuilder: (_, __, ___) => const SizedBox())
                        : const SizedBox()),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildOwnedBadgesSection(
      DynamicConfigService config, UserModel? user) {
    final ownedBadgeIds = user?.ownedBadges ?? [];
    final levelBadgeUrls = user?.ownedLevelBadges ?? [];
    final badgeWidgets = <Widget>[];

    for (final id in ownedBadgeIds) {
      final match = _badgesCatalog.where((b) => b['id']?.toString() == id).toList();
      if (match.isNotEmpty) {
        final b = match.first;
        final svgaUrl = b['svga_url']?.toString();
        final imgUrl = b['image_url']?.toString();
        if (svgaUrl != null && svgaUrl.isNotEmpty) {
          badgeWidgets.add(_badgeSvgaItem(svgaUrl, b['name']?.toString() ?? id, isSvg: true));
        } else if (imgUrl != null && imgUrl.isNotEmpty) {
          badgeWidgets.add(_badgeSvgaItem(imgUrl, b['name']?.toString() ?? id, isSvg: false));
        } else {
          badgeWidgets.add(_badgeTextItem(id, config.goldColor));
        }
      } else {
        badgeWidgets.add(_badgeTextItem(id, config.goldColor));
      }
    }

    for (final url in levelBadgeUrls) {
      badgeWidgets.add(_badgeSvgaItem(url, '', isSvg: false));
    }

    for (final n in _ownedNecklaces) {
      final isSvg = n.svgaAsset != null && n.svgaAsset!.isNotEmpty;
      badgeWidgets.add(_badgeSvgaItem(isSvg ? n.svgaAsset : n.itemIcon, n.itemName, isSvg: isSvg));
    }

    if (badgeWidgets.isEmpty) {
      return _sectionCard(
        config,
        title: 'Necklaces & Badges',
        iconWidget: R.loadAsset('assets/mipmap-xxhdpi/room_gift_ic.webp', width: 20, height: 20),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Text('No badges yet',
              style: TextStyle(fontSize: 12, color: config.textSecondary)),
        ),
      );
    }

    return _sectionCard(
      config,
      title: 'Necklaces & Badges',
      iconWidget: R.loadAsset('assets/mipmap-xxhdpi/room_gift_ic.webp', width: 20, height: 20),
      child: Wrap(
        spacing: 8,
        runSpacing: 8,
        children: badgeWidgets,
      ),
    );
  }

  Widget _buildChartSection(
      DynamicConfigService config, UserModel? user) {
    if (user == null) return const SizedBox();
    final currentItems = <Widget>[];

    if (_chartTab == 0) {
      for (final g in _receivedGifts) {
        final giftDef = _giftsCatalog[g.giftId];
        currentItems.add(_chartItem(g.giftName, '${g.value} coins', iconUrl: giftDef?.iconAsset));
      }
    } else {
      final catIdx = _chartTab - 1;
      if (catIdx >= 0 && catIdx < _showcaseTabs.length - 1) {
        final cat = _showcaseTabs[catIdx + 1];
        final items = _ownedItemsAll.where((i) => i.itemCategory == cat).toList();
        for (final item in items) {
          currentItems.add(_chartItem(item.itemName, cat, svgaUrl: item.svgaAsset, iconUrl: item.itemIcon));
        }
      }
    }

    return _sectionCard(
      config,
      title: 'Showcase',
      iconWidget: R.loadAsset('assets/mipmap-xxhdpi/room_gift_ic.webp', width: 20, height: 20),
      child: Column(
        children: [
          Row(
            children: List.generate(_showcaseTabs.length, (i) {
              final isSelected = _chartTab == i;
              return Expanded(
                child: GestureDetector(
                  onTap: () => setState(() => _chartTab = i),
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    decoration: BoxDecoration(
                      border: Border(
                        bottom: BorderSide(
                          color: isSelected ? config.goldColor : Colors.transparent,
                          width: 2,
                        ),
                      ),
                    ),
                    child: Text(
                      _showcaseTabs[i],
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                        color: isSelected ? config.goldColor : config.textSecondary,
                      ),
                    ),
                  ),
                ),
              );
            }),
          ),
          const SizedBox(height: 12),
          currentItems.isEmpty
              ? Padding(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  child: Text('Empty',
                      style: TextStyle(fontSize: 12, color: config.textSecondary)),
                )
              : Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: currentItems,
                ),
        ],
      ),
    );
  }

  Widget _buildAboutSection(
      DynamicConfigService config, UserModel? user) {
    if (user == null) return const SizedBox();
    return _sectionCard(
      config,
      title: 'About',
      iconWidget: R.loadAsset('assets/mipmap-xxhdpi/room_gift_ic.webp', width: 20, height: 20),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 4),
        child: Row(
          children: [
            Icon(Icons.emoji_events, size: 16, color: config.goldColor),
            const SizedBox(width: 6),
            Text('Level ${user.level}',
                style: TextStyle(fontSize: 13, color: config.goldColor)),
            const Spacer(),
            Icon(Icons.monetization_on, size: 16, color: config.goldColor),
            const SizedBox(width: 6),
            Text('${user.coins} coins',
                style: TextStyle(fontSize: 13, color: config.goldColor)),
          ],
        ),
      ),
    );
  }

  Widget _buildRoomCard(
      DynamicConfigService config, UserModel? user) {
    final hasRoom = _currentRoomId != null || user?.hostedRoomId != null;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: GestureDetector(
        onTap: hasRoom ? _navigateToRoom : null,
        child: Container(
          width: double.infinity,
          height: 50,
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFFFF5722), Color(0xFFFF9800)],
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
            ),
            borderRadius: BorderRadius.circular(25),
          ),
          child: Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.meeting_room, size: 20, color: Colors.white),
                const SizedBox(width: 8),
                Text(
                  hasRoom ? 'Enter Room' : 'No room yet',
                  style: const TextStyle(
                    fontSize: 15,
                    color: Colors.white,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActionButtons(
      DynamicConfigService config, UserModel? user) {
    if (widget.targetUid == null || user == null) return const SizedBox();
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    if (widget.targetUid == userProvider.currentUser?.uid) return const SizedBox();

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
      child: Row(
        children: [
          Expanded(
            child: GestureDetector(
              onTap: _navigateToChat,
              child: Container(
                height: 44,
                decoration: BoxDecoration(
                  gradient: AppColors.giftBtnGradient,
                  borderRadius: BorderRadius.circular(config.borderRadius.toDouble()),
                ),
                child: const Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.chat, size: 18, color: Colors.white),
                      SizedBox(width: 6),
                      Text('Send Message',
                          style: TextStyle(
                              fontSize: 13,
                              color: Colors.white,
                              fontWeight: FontWeight.w500)),
                    ],
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          GestureDetector(
            onTap: _toggleFollow,
            child: Container(
              height: 44,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: _isFollowing
                    ? const Color(0xFFDE880F)
                    : Colors.grey.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(config.borderRadius.toDouble()),
                border: Border.all(
                  color: _isFollowing
                      ? const Color(0xFFDE880F)
                      : Colors.grey.withValues(alpha: 0.2),
                ),
              ),
              child: Center(
                child: Text(
                  _isFollowing ? 'Following' : 'Follow',
                  style: TextStyle(
                    fontSize: 13,
                    color: _isFollowing ? Colors.white : Colors.grey,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _sectionCard(
    DynamicConfigService config, {
    required String title,
    IconData? icon,
    Widget? iconWidget,
    Widget? trailing,
    required Widget child,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(config.borderRadius.toDouble()),
          border: Border.all(color: Colors.grey.withValues(alpha: 0.15)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                iconWidget ?? Icon(icon ?? Icons.circle, size: 16, color: config.goldColor),
                const SizedBox(width: 6),
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: config.goldColor,
                  ),
                ),
                if (trailing != null) ...[
                  const Spacer(),
                  trailing,
                ],
              ],
            ),
            const SizedBox(height: 12),
            child,
          ],
        ),
      ),
    );
  }

  Widget _statItem(
      String count, String label, DynamicConfigService config) {
    return Column(
      children: [
        Text(
          count,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: config.goldColor,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: config.goldColor.withValues(alpha: 0.7),
          ),
        ),
      ],
    );
  }

  Widget _badgeTextItem(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 11,
          color: color,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  Widget _badgeSvgaItem(String? url, String name, {bool isSvg = false}) {
    if (url != null && url.isNotEmpty) {
      return SizedBox(
        width: 48,
        height: 48,
        child: isSvg
            ? SvgaPlayer(assetPath: url, width: 48, height: 48, loops: true)
            : ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(url, fit: BoxFit.contain,
                    errorBuilder: (_, __, ___) => const SizedBox()),
              ),
      );
    }
    return _badgeTextItem(name.isNotEmpty ? name : 'Badge', Colors.grey);
  }

  Widget _chartItem(String name, String subtitle, {String? svgaUrl, String? iconUrl}) {
    final displayUrl = svgaUrl ?? iconUrl;
    return GestureDetector(
      onTap: () {
        if (displayUrl != null) {
          setState(() => _selectedItem = GiftedItemModel(
            id: '',
            uid: '',
            itemId: '',
            itemCategory: '',
            itemName: name,
            itemIcon: iconUrl ?? displayUrl,
            svgaAsset: svgaUrl,
            sentBy: '',
            sentByName: '',
            sentAt: 0,
            expiresAt: 0,
          ));
        }
      },
      child: Container(
        width: 64,
        padding: const EdgeInsets.all(4),
        child: Column(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: Colors.grey.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(8),
              ),
              child: displayUrl != null
                  ? (svgaUrl != null
                      ? SvgaPlayer(assetPath: svgaUrl, width: 48, height: 48, loops: true)
                      : ClipRRect(
                          borderRadius: BorderRadius.circular(7),
                          child: Image.network(iconUrl!, fit: BoxFit.contain,
                              errorBuilder: (_, __, ___) =>
                                  Icon(Icons.card_giftcard, size: 20, color: Colors.grey.withValues(alpha: 0.4))),
                        ))
                  : Icon(Icons.card_giftcard, size: 20, color: Colors.grey.withValues(alpha: 0.4)),
            ),
            const SizedBox(height: 4),
            Text(name,
                maxLines: 1, overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 9, color: Colors.grey)),
          ],
        ),
      ),
    );
  }

  Widget _buildFrameWidget(String? activeFrame) {
    if (activeFrame == null || activeFrame.isEmpty) {
      return SvgaFrame(svgaPath: R.superAdminFrame, size: 120);
    }
    if (activeFrame.startsWith('http')) {
      if (activeFrame.endsWith('.svga')) {
        return SvgaPlayer(
          assetPath: activeFrame,
          width: 120,
          height: 120,
          loops: true,
        );
      }
      return Image.network(
        activeFrame,
        fit: BoxFit.contain,
        errorBuilder: (_, __, ___) => const SizedBox(),
      );
    }
    final storeItem = SupabaseService().getStoreItemSync(activeFrame);
    final frameAsset = storeItem?.svgaAsset;
    if (frameAsset != null) {
      return SvgaPlayer(
        assetPath: frameAsset,
        width: 120,
        height: 120,
        loops: true,
      );
    }
    return SvgaFrame(svgaPath: R.superAdminFrame, size: 120);
  }

  Widget _buildGiftOverlay(DynamicConfigService config) {
    final g = _selectedGift!;
    return GestureDetector(
      onTap: () => setState(() => _selectedGift = null),
      child: Container(
        color: Colors.black.withValues(alpha: 0.7),
        child: Center(
          child: GestureDetector(
            onTap: () {},
            child: Container(
              width: 200,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (g.giftName.isNotEmpty)
                    Text(g.giftName,
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: Colors.grey.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(11),
                      child: _giftsCatalog[g.giftId]?.iconAsset != null
                          ? Image.network(_giftsCatalog[g.giftId]!.iconAsset,
                              fit: BoxFit.contain,
                              errorBuilder: (_, __, ___) =>
                                  Icon(Icons.card_giftcard, size: 40, color: config.goldColor))
                          : Icon(Icons.card_giftcard, size: 40, color: config.goldColor),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text('Value: ${g.value} x ${g.count}',
                      style: TextStyle(fontSize: 12, color: config.textSecondary)),
                  const SizedBox(height: 4),
                  Text('From: ${g.senderName}',
                      style: TextStyle(fontSize: 12, color: config.textSecondary)),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildItemOverlay(DynamicConfigService config) {
    final item = _selectedItem!;
    final isSvga = item.svgaAsset != null;
    final assetUrl = item.svgaAsset ?? item.itemIcon;
    return GestureDetector(
      onTap: () => setState(() => _selectedItem = null),
      child: Container(
        color: Colors.black.withValues(alpha: 0.7),
        child: Center(
          child: GestureDetector(
            onTap: () {},
            child: Container(
              width: 220,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(item.itemName,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: 100,
                    height: 100,
                    child: isSvga
                        ? SvgaPlayer(assetPath: assetUrl, width: 100, height: 100, loops: true)
                        : (assetUrl.isNotEmpty
                            ? ClipRRect(
                                borderRadius: BorderRadius.circular(12),
                                child: Image.network(assetUrl, fit: BoxFit.contain),
                              )
                            : Icon(Icons.card_giftcard, size: 50, color: config.goldColor)),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLevelBadge(int level, String type) {
    final lvlConfig = LevelService().getLevelConfig(type, level);
    final url = lvlConfig?.imageUrl;
    if (url != null) {
      return SizedBox(
        width: 36,
        height: 36,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: R.loadAsset(url),
        ),
      );
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
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

class ChatScreen extends StatelessWidget {
  final String targetUid;
  final String targetName;
  final String? targetPhotoUrl;

  const ChatScreen({
    super.key,
    required this.targetUid,
    required this.targetName,
    this.targetPhotoUrl,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(targetName)),
      body: const Center(child: Text('Chat coming soon')),
    );
  }
}
