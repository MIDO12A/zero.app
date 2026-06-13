import 'package:flutter/material.dart';
import '../../config/r.dart';
import '../../config/app_colors.dart';

class ThemeListScreen extends StatefulWidget {
  const ThemeListScreen({super.key});

  @override
  State<ThemeListScreen> createState() => _ThemeListScreenState();
}

class _ThemeListScreenState extends State<ThemeListScreen> {
  int _selectedIndex = 0;

  final List<_ThemeItem> _themes = [
    _ThemeItem('السمة الكلاسيكية', AppColors.themeFriend, 0, true),
    _ThemeItem('سمة الليل', AppColors.themeParty, 50, false),
    _ThemeItem('سمة الزهور', AppColors.themeMusic, 30, false),
    _ThemeItem('سمة الفضاء', AppColors.themeGame, 40, false),
    _ThemeItem('سمة الرياضة', AppColors.themeHobby, 25, false),
    _ThemeItem('سمة الألعاب', AppColors.themeChat, 35, false),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A0F0F),
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(context),
            Expanded(
              child: GridView.builder(
                padding: const EdgeInsets.all(20),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 0.72,
                ),
                itemCount: _themes.length,
                itemBuilder: (_, i) => _buildThemeCard(i),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              padding: const EdgeInsets.all(4),
              child: R.image(R.backIc, width: 24, height: 24),
            ),
          ),
          const Spacer(),
          const Text('سمات الغرفة', style: TextStyle(fontSize: 17, color: Colors.white, fontWeight: FontWeight.w600)),
          const Spacer(),
          const SizedBox(width: 32),
        ],
      ),
    );
  }

  Widget _buildThemeCard(int index) {
    final theme = _themes[index];
    final selected = index == _selectedIndex;

    return GestureDetector(
      onTap: () => setState(() => _selectedIndex = index),
      child: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: selected ? AppColors.goldLight : Colors.transparent,
                width: 2,
              ),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Column(
                children: [
                  Container(
                    height: 120,
                    decoration: BoxDecoration(gradient: theme.gradient),
                    child: Center(
                      child: Icon(Icons.palette_outlined, color: Colors.white.withValues(alpha: 0.5), size: 48),
                    ),
                  ),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.fromLTRB(8, 8, 8, 8),
                    color: AppColors.cardBg,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(theme.name, style: const TextStyle(fontSize: 13, color: Colors.white, fontWeight: FontWeight.w500)),
                        const SizedBox(height: 4),
                        Text(
                          theme.isFree ? 'مجاني' : '${theme.price}',
                          style: TextStyle(
                            fontSize: 12,
                            color: theme.isFree ? AppColors.goldLight : Colors.white54,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          if (selected)
            Positioned(
              top: 8,
              right: 8,
              child: Container(
                width: 24,
                height: 24,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.goldLight,
                  border: Border.all(color: Colors.white, width: 2),
                ),
                child: const Icon(Icons.check, color: Colors.white, size: 14),
              ),
            ),
        ],
      ),
    );
  }
}

class _ThemeItem {
  final String name;
  final LinearGradient gradient;
  final int price;
  final bool isFree;

  _ThemeItem(this.name, this.gradient, this.price, this.isFree);
}
