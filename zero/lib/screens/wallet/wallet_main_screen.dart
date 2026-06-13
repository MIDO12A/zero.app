import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/r.dart';
import '../../providers/user_provider.dart';
import '../../services/dynamic_config_service.dart';
import '../../services/supabase_service.dart';

class WalletMainScreen extends StatefulWidget {
  const WalletMainScreen({super.key});

  @override
  State<WalletMainScreen> createState() => _WalletMainScreenState();
}

class _WalletMainScreenState extends State<WalletMainScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int _coins = 0;
  int _diamonds = 0;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);
    final user = userProvider.currentUser;
    _coins = user?.coins ?? 0;
    _diamonds = user?.diamonds ?? 0;
    final dc = DynamicConfigService();
    return Scaffold(
      backgroundColor: dc.primaryBg,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Stack(
              children: [
                R.image(
                  R.mineWalletHeaderBg,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
                Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 12, vertical: 8),
                      child: Row(
                        children: [
                          GestureDetector(
                            onTap: () => Navigator.pop(context),
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: R.image(
                                  R.backWhite,
                                  width: 24,
                                  height: 24,
                                ),
                            ),
                          ),
                          const Spacer(),
                          GestureDetector(
                            onTap: () {},
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: R.image(
                                  R.mineWalletFilterIc,
                                  width: 24,
                                  height: 24,
                                ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      dc.getScreenTitle('wallet', 'My Wallet'),
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 24),
                  ],
                ),
              ],
            ),
            // Tabs
            Container(
              color: dc.tabBarColor,
              child: TabBar(
                controller: _tabController,
                labelColor: dc.buttonColor,
                unselectedLabelColor: dc.textSecondary,
                indicatorColor: dc.buttonColor,
                tabs: [
                  Tab(text: dc.getScreenTitle('coins', 'Coins')),
                  Tab(text: dc.getScreenTitle('diamonds', 'Diamonds')),
                ],
              ),
            ),
            // Content
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildCoinSection(),
                  _buildDiamondSection(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _onRecharge(int coins) async {
    final user = context.read<UserProvider>().currentUser;
    if (user == null) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Recharge'),
        content: Text('Add $coins coins?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
          TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Confirm')),
        ],
      ),
    );
    if (confirmed == true) {
      await SupabaseService().addCoins(user.uid, coins);
      await context.read<UserProvider>().loadUser(user.uid);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('+$coins coins added!'), backgroundColor: Colors.green),
        );
      }
    }
  }

  void _onDiamondRecharge(int diamonds) async {
    final user = context.read<UserProvider>().currentUser;
    if (user == null) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Recharge'),
        content: Text('Add $diamonds diamonds?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
          TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Confirm')),
        ],
      ),
    );
    if (confirmed == true) {
      // For diamonds, update directly for now
      final svc = SupabaseService();
      final res = await svc.client.from('users').select('diamonds').eq('uid', user.uid).maybeSingle();
      if (res != null) {
        final current = res['diamonds'] as int? ?? 0;
        await svc.client.from('users').update({'diamonds': current + diamonds}).eq('uid', user.uid);
      }
      await context.read<UserProvider>().loadUser(user.uid);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('+$diamonds diamonds added!'), backgroundColor: Colors.green),
        );
      }
    }
  }

  Widget _buildCoinSection() {
    final dc = DynamicConfigService();
    final packages = [
      {'coins': '100', 'price': '\$0.99', 'bonus': ''},
      {'coins': '500', 'price': '\$4.99', 'bonus': '+50'},
      {'coins': '1000', 'price': '\$9.99', 'bonus': '+150'},
      {'coins': '5000', 'price': '\$49.99', 'bonus': '+1000'},
      {'coins': '10000', 'price': '\$99.99', 'bonus': '+2500'},
    ];
    return SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Current coins
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: dc.goldColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(dc.borderRadius.toDouble()),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          R.image(
                            R.commonGoldIc3,
                            width: 32,
                            height: 32,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            '$_coins',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: dc.goldColor,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  dc.getScreenTitle('recharge', 'Recharge'),
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: dc.textPrimary,
                  ),
                ),
                const SizedBox(height: 12),
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    childAspectRatio: 1.2,
                  ),
                  itemCount: packages.length,
                  itemBuilder: (context, index) {
                    final pkg = packages[index];
                    final coins = int.parse(pkg['coins']!);
                    return GestureDetector(
                      onTap: () => _onRecharge(coins),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: dc.primaryBg,
                          border: Border.all(color: dc.textSecondary.withValues(alpha: 0.2), width: 1),
                          borderRadius: BorderRadius.circular(dc.borderRadius.toDouble()),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            if (pkg['bonus']!.isNotEmpty)
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFFF4444),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  pkg['bonus']!,
                                  style: const TextStyle(
                                    fontSize: 10,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            const SizedBox(height: 4),
                            R.image(
                              R.commonGoldIc3,
                            width: 32,
                            height: 32,
                          ),
                          const SizedBox(height: 4),
                          Text(
                            pkg['coins']!,
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: dc.textPrimary,
                            ),
                          ),
                          const Spacer(),
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(vertical: 6),
                            decoration: BoxDecoration(
                              color: dc.buttonColor,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              pkg['price']!,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.bold,
                                color: dc.buttonTextColor,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    );
                  },
                ),
              ],
            ),
          );
        }

  Widget _buildDiamondSection() {
    final dc = DynamicConfigService();
    final packages = [
      {'diamonds': '50', 'price': '\$0.99', 'bonus': ''},
      {'diamonds': '250', 'price': '\$4.99', 'bonus': '+25'},
      {'diamonds': '500', 'price': '\$9.99', 'bonus': '+75'},
      {'diamonds': '2500', 'price': '\$49.99', 'bonus': '+500'},
      {'diamonds': '5000', 'price': '\$99.99', 'bonus': '+1250'},
    ];
    return SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Current diamonds
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: dc.buttonColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(dc.borderRadius.toDouble()),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          R.image(
                            R.commonDiamondIc,
                            width: 32,
                            height: 32,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            '$_diamonds',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: dc.buttonColor,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  dc.getScreenTitle('recharge', 'Recharge'),
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: dc.textPrimary,
                  ),
                ),
                const SizedBox(height: 12),
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    childAspectRatio: 1.2,
                  ),
                  itemCount: packages.length,
                  itemBuilder: (context, index) {
                    final pkg = packages[index];
                    final diamonds = int.parse(pkg['diamonds']!);
                    return GestureDetector(
                      onTap: () => _onDiamondRecharge(diamonds),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: dc.primaryBg,
                          border: Border.all(color: dc.textSecondary.withValues(alpha: 0.2), width: 1),
                          borderRadius: BorderRadius.circular(dc.borderRadius.toDouble()),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            if (pkg['bonus']!.isNotEmpty)
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFFF4444),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  pkg['bonus']!,
                                  style: const TextStyle(
                                    fontSize: 10,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            const SizedBox(height: 4),
                            R.image(
                              R.commonDiamondIc,
                            width: 32,
                            height: 32,
                          ),
                          const SizedBox(height: 4),
                          Text(
                            pkg['diamonds']!,
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: dc.textPrimary,
                            ),
                          ),
                          const Spacer(),
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(vertical: 6),
                            decoration: BoxDecoration(
                              color: dc.buttonColor,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              pkg['price']!,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.bold,
                                color: dc.buttonTextColor,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    );
                  },
                ),
              ],
            ),
          );
        }
}
