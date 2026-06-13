import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/r.dart';
import '../../providers/user_provider.dart';
import '../../services/dynamic_config_service.dart';

class WalletCenterNewScreen extends StatelessWidget {
  const WalletCenterNewScreen({super.key});

  Widget _buildWalletItem(String iconPath, String title, VoidCallback onTap) {
    final dc = DynamicConfigService();
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        height: 50,
        child: Row(
          children: [
            const SizedBox(width: 16),
            R.image(iconPath, width: 24, height: 24),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                title,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: dc.textPrimary,
                ),
              ),
            ),
            R.image(R.commonNext4Ic, width: 16, height: 16),
            const SizedBox(width: 16),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);
    final user = userProvider.currentUser;
    final coins = user?.coins ?? 0;
    final dc = DynamicConfigService();
    return Scaffold(
      backgroundColor: dc.primaryBg,
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(
              height: 362,
              child: Stack(
                children: [
                  Positioned.fill(
                    child: R.image(
                      R.mineWalletHeaderBg,
                      width: double.infinity,
                      fit: BoxFit.fill,
                    ),
                  ),
                  Positioned(
                    top: 0,
                    left: 13,
                    right: 13,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GestureDetector(
                          onTap: () => Navigator.pop(context),
                          child: Transform.flip(
                            flipX: Directionality.of(context) == TextDirection.rtl,
                            child: R.image(R.backWhite, width: 43, height: 43),
                          ),
                        ),
                        GestureDetector(
                          onTap: () {},
                          child: R.image(R.mineWalletDetailIc, width: 24, height: 24),
                        ),
                      ],
                    ),
                  ),
                  Positioned(
                    top: 43 + 10,
                    left: 0,
                    right: 0,
                    child: Column(
                      children: [
                        R.image(R.mineWalletCoinBagIc),
                        const SizedBox(height: 8),
                        Text(
                          dc.getScreenTitle('wallet', 'Coin Balance'),
                          style: const TextStyle(fontSize: 13, color: Colors.white70),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            R.image(R.commonGoldIc3, width: 24, height: 24),
                            const SizedBox(width: 5),
                            Text(
                              '$coins',
                              style: const TextStyle(fontSize: 20, color: Colors.white),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: dc.primaryBg,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(dc.borderRadius.toDouble()),
                    topRight: Radius.circular(dc.borderRadius.toDouble()),
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.only(top: 12, bottom: 16),
                  child: Column(
                    children: [
                      _buildWalletItem(R.mineWalletCoinBagIc, dc.getScreenTitle('transactions', 'سجل المعاملات'), () {}),
                      Container(
                        height: 1,
                        color: dc.textSecondary.withValues(alpha: 0.2),
                        margin: const EdgeInsets.symmetric(horizontal: 16),
                      ),
                      _buildWalletItem(R.mineWalletDetailIc, dc.getScreenTitle('giftcards', 'بطاقات الهدايا'), () {}),
                      Container(
                        height: 1,
                        color: dc.textSecondary.withValues(alpha: 0.2),
                        margin: const EdgeInsets.symmetric(horizontal: 16),
                      ),
                      _buildWalletItem(R.mineWalletFilterIc, dc.getScreenTitle('redeem', 'استرداد'), () {}),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
