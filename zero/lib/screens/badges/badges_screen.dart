import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/r.dart';
import '../../services/dynamic_config_service.dart';
import '../../services/supabase_service.dart';
import '../../providers/user_provider.dart';
import '../room/widgets/svga_player.dart';

class BadgesScreen extends StatefulWidget {
  const BadgesScreen({super.key});

  @override
  State<BadgesScreen> createState() => _BadgesScreenState();
}

class _BadgesScreenState extends State<BadgesScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final SupabaseService _supabaseService = SupabaseService();
  List<Map<String, dynamic>> _allBadges = [];
  List<NecklaceItem> _allNecklaces = [];
  String? _selectedBadgeId;
  String? _selectedNecklaceUrl;
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _tabController.addListener(() => setState(() {}));
    _loadData();
  }

  Future<void> _loadData() async {
    final badges = await _supabaseService.getBadgesCatalog();
    _allBadges = badges;

    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final user = userProvider.currentUser;
    final necklaces = await _supabaseService.getNecklacesCatalog();
    debugPrint('Necklaces catalog loaded: ${necklaces.length} items');
    _allNecklaces = necklaces.map((n) {
      final nid = n['id']?.toString() ?? '';
      return NecklaceItem(
        id: nid,
        name: n['name']?.toString() ?? '',
        imageUrl: n['image_url']?.toString() ?? '',
        svgaUrl: n['svga_url']?.toString(),
        owned: (user?.ownedItems.contains(nid) ?? false) || (user?.ownedNecklaces.contains(nid) ?? false),
      );
    }).toList();

    if (mounted) setState(() => _loaded = true);
  }

  bool _hasBadge(String badgeId) {
    final user = Provider.of<UserProvider>(context, listen: false).currentUser;
    if (user == null) return false;
    return user.ownedBadges.contains(badgeId);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final config = DynamicConfigService();
    return Scaffold(
      backgroundColor: config.primaryBg,
      body: SafeArea(
        child: Column(
          children: [
            Stack(
              children: [
                R.loadAsset('assets/mipmap-xxhdpi/mine_mall_top_bg.webp',
                    width: double.infinity, fit: BoxFit.fitWidth),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: SizedBox(
                    height: 56,
                    child: Row(
                      children: [
                        GestureDetector(
                          onTap: () => Navigator.pop(context),
                          child: Padding(
                            padding: const EdgeInsets.all(8),
                            child: R.loadAsset(R.backIc, width: 24, height: 24),
                          ),
                        ),
                        const Spacer(),
                        Text(config.screenTitles['badges'] ?? 'الشارات',
                            style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                        const Spacer(),
                        const SizedBox(width: 40),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: TabBar(
                  controller: _tabController,
                  dividerColor: Colors.transparent,
                  indicator: BoxDecoration(
                    color: config.goldColor.withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  labelColor: Colors.white,
                  unselectedLabelColor: Colors.white70,
                  tabs: [
                    Tab(text: config.screenTitles['badges_tab'] ?? 'الشارات'),
                    Tab(text: config.screenTitles['necklaces_tab'] ?? 'القلادات'),
                  ],
                ),
              ),
            ),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildBadgesTab(config),
                  _buildNecklacesTab(config),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBadgesTab(DynamicConfigService config) {
    if (!_loaded) return const Center(child: CircularProgressIndicator());
    if (_allBadges.isEmpty) return Center(child: Text(config.screenTitles['no_badges'] ?? 'لا توجد شارات', style: TextStyle(color: config.textSecondary)));

    final selectedBadge = _selectedBadgeId != null
        ? _allBadges.where((b) => b['id']?.toString() == _selectedBadgeId).toList()
        : _allBadges;
    final displayed = selectedBadge.isNotEmpty ? selectedBadge.first : _allBadges.first;
    final displayedId = displayed['id']?.toString() ?? '';
    final badgeSvgUrl = displayed['svga_url']?.toString() ?? '';
    final badgeImgUrl = displayed['image_url']?.toString() ?? '';
    final isOwned = _hasBadge(displayedId);

    return Column(
      children: [
        Container(
          height: 200,
          margin: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              if (badgeSvgUrl.isNotEmpty)
                SvgaPlayer(assetPath: badgeSvgUrl, width: 120, height: 120)
              else if (badgeImgUrl.isNotEmpty)
                R.loadAsset(badgeImgUrl, width: 120, height: 120),
              if (!isOwned)
                Container(
                  decoration: BoxDecoration(
                    color: Colors.black54,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      R.loadAsset('assets/mipmap-xxhdpi/room_gift_ic.webp', width: 40, height: 40),
                      const SizedBox(height: 8),
                      Text(config.screenTitles['lock_text'] ?? 'لم تحصل عليه بعد',
                          style: TextStyle(color: Colors.white.withValues(alpha: 0.8), fontSize: 14)),
                    ],
                  ),
                ),
            ],
          ),
        ),
        Expanded(
          child: GridView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1,
            ),
            itemCount: _allBadges.length,
            itemBuilder: (context, index) {
              final badge = _allBadges[index];
              final bid = badge['id']?.toString() ?? '';
              final bSvg = badge['svga_url']?.toString() ?? '';
              final bImg = badge['image_url']?.toString() ?? '';
              final owned = _hasBadge(bid);
              return GestureDetector(
                onTap: () => setState(() => _selectedBadgeId = bid),
                child: Container(
                  decoration: BoxDecoration(
                    color: _selectedBadgeId == bid
                        ? config.goldColor.withValues(alpha: 0.2)
                        : Colors.white.withValues(alpha: 0.05),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: _selectedBadgeId == bid
                          ? config.goldColor
                          : Colors.transparent,
                      width: 2,
                    ),
                  ),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      if (bSvg.isNotEmpty)
                        SvgaPlayer(assetPath: bSvg, width: 40, height: 40)
                      else if (bImg.isNotEmpty)
                        R.loadAsset(bImg, width: 40, height: 40),
                      if (!owned)
                        R.loadAsset('assets/mipmap-xxhdpi/room_gift_ic.webp', width: 20, height: 20),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildNecklacesTab(DynamicConfigService config) {
    if (!_loaded) return const Center(child: CircularProgressIndicator());
    if (_allNecklaces.isEmpty) return Center(child: Text(config.screenTitles['no_necklaces'] ?? 'لا توجد قلادات', style: TextStyle(color: config.textSecondary)));

    final displayed = _selectedNecklaceUrl != null
        ? _allNecklaces.firstWhere(
            (n) => n.svgaUrl == _selectedNecklaceUrl || n.imageUrl == _selectedNecklaceUrl,
            orElse: () => _allNecklaces.first,
          )
        : _allNecklaces.first;
    final displaySvgUrl = displayed.svgaUrl ?? '';
    final displayImgUrl = displayed.imageUrl;

    return Column(
      children: [
        Container(
          height: 200,
          margin: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              if (displaySvgUrl.isNotEmpty)
                SvgaPlayer(assetPath: displaySvgUrl, width: 120, height: 120)
              else if (displayImgUrl.isNotEmpty)
                R.loadAsset(displayImgUrl, width: 120, height: 120),
              if (!displayed.owned)
                Container(
                  decoration: BoxDecoration(
                    color: Colors.black54,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      R.loadAsset('assets/mipmap-xxhdpi/room_gift_ic.webp', width: 40, height: 40),
                      const SizedBox(height: 8),
                      Text(config.screenTitles['lock_text'] ?? 'لم تحصل عليه بعد',
                          style: TextStyle(color: Colors.white.withValues(alpha: 0.8), fontSize: 14)),
                    ],
                  ),
                ),
            ],
          ),
        ),
        Expanded(
          child: GridView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1,
            ),
            itemCount: _allNecklaces.length,
            itemBuilder: (context, index) {
              final item = _allNecklaces[index];
              final nSvg = item.svgaUrl ?? '';
              final nImg = item.imageUrl;
              return GestureDetector(
                onTap: () => setState(() => _selectedNecklaceUrl = nSvg.isNotEmpty ? nSvg : nImg),
                child: Container(
                  decoration: BoxDecoration(
                    color: _selectedNecklaceUrl == (nSvg.isNotEmpty ? nSvg : nImg)
                        ? config.goldColor.withValues(alpha: 0.2)
                        : Colors.white.withValues(alpha: 0.05),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: _selectedNecklaceUrl == (nSvg.isNotEmpty ? nSvg : nImg)
                          ? config.goldColor
                          : Colors.transparent,
                      width: 2,
                    ),
                  ),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      if (nSvg.isNotEmpty)
                        SvgaPlayer(assetPath: nSvg, width: 40, height: 40)
                      else if (nImg.isNotEmpty)
                        R.loadAsset(nImg, width: 40, height: 40),
                      if (!item.owned)
                        R.loadAsset('assets/mipmap-xxhdpi/room_gift_ic.webp', width: 20, height: 20),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}

class NecklaceItem {
  final String id;
  final String name;
  final String imageUrl;
  final String? svgaUrl;
  final bool owned;
  NecklaceItem({
    required this.id,
    required this.name,
    required this.imageUrl,
    this.svgaUrl,
    this.owned = false,
  });
}
