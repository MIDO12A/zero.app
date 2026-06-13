import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/r.dart' show R;
import '../../l10n/app_localizations.dart';
import '../../services/dynamic_config_service.dart';
import '../../services/supabase_service.dart';
import '../../models/store_item_model.dart';
import '../../providers/user_provider.dart';

class MallScreen extends StatefulWidget {
  const MallScreen({super.key});

  @override
  State<MallScreen> createState() => _MallScreenState();
}

class _MallScreenState extends State<MallScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final SupabaseService _firebaseService = SupabaseService();
  List<StoreItemModel> _allItems = [];
  int _selectedCategoryIndex = 0;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 6, vsync: this);
    _tabController.addListener(() {
      setState(() {
        _selectedCategoryIndex = _tabController.index;
      });
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final userProvider = Provider.of<UserProvider>(context);
    final user = userProvider.currentUser;
    
    return StreamBuilder<List<StoreItemModel>>(
      stream: _firebaseService.storeItemsStream(),
      builder: (context, snapshot) {
        _allItems = snapshot.data ?? [];
        final dc = DynamicConfigService();
        
        final categories = ['headwear', 'bubble', 'car', 'entrance', 'frame', 'cover'];
        final categoryNames = [
          'القبعات',
          'الفقاعات',
          'السيارات',
          'المخرجات',
          'الاطارات',
          'غلاف المستخدم',
        ];
        
        final categoryItems = categories.map((cat) => 
          _allItems.where((item) => item.category == cat).toList()
        ).toList();
        
        final previewItem = _selectedCategoryIndex < categoryItems.length && categoryItems[_selectedCategoryIndex].isNotEmpty
            ? categoryItems[_selectedCategoryIndex].first
            : null;
        
        return Scaffold(
          backgroundColor: dc.primaryBg,
          body: Column(
            children: [
              Stack(
                children: [
                  R.image(
                    'assets/mipmap-xxhdpi/mine_mall_top_bg.webp',
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                  SafeArea(
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 8),
                          child: Row(
                            children: [
                              GestureDetector(
                                onTap: () => Navigator.pop(context),
                                child: R.image(
                                  'assets/mipmap-xxhdpi/back_white.webp',
                                  width: 24,
                                  height: 24,
                                ),
                              ),
                              const Spacer(),
                              Text(
                                dc.getScreenTitle('store', l10n.mallTitle),
                                style: const TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                              const Spacer(),
                              const SizedBox(width: 40),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),
                      ],
                    ),
                  ),
                ],
              ),
              // Preview area
              Container(
                padding: const EdgeInsets.symmetric(vertical: 12),
                color: dc.primaryBg,
                child: Column(
                  children: [
                    SizedBox(
                      width: 120,
                      height: 120,
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          Container(
                            width: 96,
                            height: 96,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: dc.goldColor,
                                width: 2,
                              ),
                            ),
                            child: ClipOval(
                              child: (user?.photoUrl != null && user!.photoUrl.isNotEmpty)
                                  ? Image.network(user.photoUrl, fit: BoxFit.cover)
                                  : Image.asset(R.avaBoy, fit: BoxFit.cover),
                            ),
                          ),
                          if (previewItem != null)
                            Positioned(
                              child: R.loadImage(
                                previewItem.iconAsset,
                                width: 70,
                                height: 70,
                                fit: BoxFit.contain,
                              ),
                            ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 8),
                    if (previewItem != null)
                      Text(
                        previewItem.name,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: dc.textPrimary,
                        ),
                      ),
                  ],
                ),
              ),
              // Category tabs
              Container(
                color: dc.tabBarColor,
                child: TabBar(
                  controller: _tabController,
                  isScrollable: true,
                  labelColor: dc.goldColor,
                  unselectedLabelColor: dc.textSecondary,
                  indicatorColor: dc.goldColor,
                  indicatorWeight: 3,
                  labelStyle: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                  ),
                  tabs: categoryNames.map((name) => 
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: Tab(text: name),
                    )
                  ).toList(),
                ),
              ),
              Divider(height: 1, color: dc.textSecondary.withValues(alpha: 0.2)),
              // Items grid
              Expanded(
                child: TabBarView(
                  controller: _tabController,
                  children: categoryItems.map((items) => 
                    _buildItemsTab(items, userProvider)
                  ).toList(),
                ),
              ),
              // Bottom bar (cl_buy)
              Container(
                color: const Color(0xFF302218),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    children: [
                      R.image(
                        'assets/mipmap-xxhdpi/common_gold_ic_1.webp',
                        width: 28,
                        height: 28,
                      ),
                      const SizedBox(width: 7),
                      Text(
                        user?.coins.toString() ?? '0',
                        style: const TextStyle(
                          fontSize: 17,
                          color: Color(0xFFFAE9B5),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Spacer(),
                      GestureDetector(
                        onTap: () {},
                        child: R.image(
                          'assets/mipmap-xxhdpi/mine_mall_buy_ic.webp',
                          width: 126,
                          height: 40,
                          fit: BoxFit.contain,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              // VIP tips bar - moved to VIP web app
            ],
          ),
        );
      },
    );
  }

  Widget _buildItemsTab(List<StoreItemModel> items, UserProvider userProvider) {
    final dc = DynamicConfigService();
    if (items.isEmpty) {
      return Center(
        child: Text('لا توجد عناصر بعد', style: TextStyle(color: dc.textSecondary)),
      );
    }
    
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 0.85,
        ),
        itemCount: items.length,
        itemBuilder: (context, index) {
          final item = items[index];
          final isOwned = userProvider.currentUser?.ownedItems.contains(item.itemId) ?? false;
          return Container(
            decoration: BoxDecoration(
              color: dc.primaryBg,
              borderRadius: BorderRadius.circular(dc.borderRadius.toDouble()),
            ),
            child: Column(
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: R.loadImage(
                      item.iconAsset,
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: Text(
                    item.name,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: dc.textPrimary,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(height: 4),
                if (!isOwned) ...[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      R.image(
                        'assets/mipmap-xxhdpi/common_diamond_ic.webp',
                        width: 14,
                        height: 14,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        item.price.toString(),
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: dc.buttonColor,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  GestureDetector(
                    onTap: () async {
                      final success = await userProvider.purchaseItem(item);
                      if (success) {
                        if (context.mounted) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text(dc.getScreenTitle('purchase_success', 'تم الشراء بنجاح!'))),
                          );
                        }
                      } else {
                        if (context.mounted) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text(dc.getScreenTitle('insufficient_coins', 'لا توجد عملات كافية!'))),
                          );
                        }
                      }
                    },
                    child: Container(
                      width: 100,
                      height: 30,
                      decoration: BoxDecoration(
                        color: dc.goldColor,
                        borderRadius: BorderRadius.circular(dc.borderRadius.toDouble()),
                      ),
                      child: Center(
                        child: Text(
                          dc.getScreenTitle('buy', 'شراء'),
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: dc.buttonTextColor,
                          ),
                        ),
                      ),
                    ),
                  ),
                ] else ...[
                  Text(
                    dc.getScreenTitle('owned', 'مملوك'),
                    style: const TextStyle(
                      fontSize: 12,
                      color: Colors.green,
                    ),
                  ),
                ],
                const SizedBox(height: 8),
              ],
            ),
          );
        },
      ),
    );
  }
}
