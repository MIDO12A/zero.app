import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';
import 'union_members_screen.dart';
import 'union_manage_screen.dart';

class UnionDetailScreen extends StatelessWidget {
  final String unionId;

  const UnionDetailScreen({super.key, required this.unionId});

  static const _mockUnion = {
    'name': 'فرسان العرب',
    'level': 5,
    'members': 42,
    'activeToday': 15,
    'rank': 3,
    'description': 'نقابة فرسان العرب تجمع المحاربين الشجعان من كل مكان.',
  };

  static const _mockNotices = [
    'مرحباً بالأعضاء الجدد!',
    'اجتماع النقابة يوم الجمعة',
    'تهانينا للنقيب على الترقية!',
  ];

  static const _mockMembers = ['', '', '', '', '', ''];

  @override
  Widget build(BuildContext context) {
    final isAdmin = unionId == '1';
    return Scaffold(
      backgroundColor: AppColors.roomBg,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: R.image(R.backIc, width: 24, height: 24),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(_mockUnion['name'] as String, textAlign: TextAlign.right),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                const SizedBox(height: 8),
                _buildHeader(),
                const SizedBox(height: 16),
                _buildStatsRow(),
                const SizedBox(height: 16),
                if (isAdmin)
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const UnionManageScreen(),
                        ),
                      ),
                      icon: const Icon(Icons.settings, color: Colors.white, size: 18),
                      label: const Text('إدارة النقابة'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFFFC525),
                        foregroundColor: Colors.black,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                    ),
                  ),
                const SizedBox(height: 16),
                const Text(
                  'لوحة الإعلانات',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                  textAlign: TextAlign.right,
                ),
                const SizedBox(height: 8),
                ..._mockNotices.map((n) => Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.cardBg,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(n, style: const TextStyle(color: Colors.white), textAlign: TextAlign.right),
                )),
                const SizedBox(height: 16),
                const Text(
                  'الأعضاء',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                  textAlign: TextAlign.right,
                ),
                const SizedBox(height: 8),
                SizedBox(
                  height: 70,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: [
                      ..._mockMembers.map((_) => Container(
                        width: 56,
                        height: 56,
                        margin: const EdgeInsets.only(right: 10),
                        decoration: BoxDecoration(
                          color: AppColors.cardBg,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.person, color: Colors.white38),
                      )),
                      GestureDetector(
                        onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => const UnionMembersScreen(),
                          ),
                        ),
                        child: Container(
                          width: 56,
                          height: 56,
                          margin: const EdgeInsets.only(right: 10),
                          decoration: BoxDecoration(
                            color: const Color(0xFF4CAF50).withOpacity(0.3),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.arrow_forward_ios, color: Colors.white54, size: 18),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: const BoxDecoration(
              color: Color(0xFF1A1A1A),
              border: Border(top: BorderSide(color: AppColors.divider)),
            ),
            child: SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF4CAF50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: const Text(
                  'انضمام',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: AppColors.cardBg,
            shape: BoxShape.circle,
          ),
          child: const Icon(Icons.group, color: Colors.white, size: 40),
        ),
        const SizedBox(height: 12),
        Text(
          _mockUnion['name'] as String,
          style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
          textAlign: TextAlign.right,
        ),
        const SizedBox(height: 4),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
          decoration: BoxDecoration(
            color: const Color(0xFFFFC525).withOpacity(0.2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            'المستوى ${_mockUnion['level']}',
            style: const TextStyle(fontSize: 13, color: Color(0xFFFFC525)),
          ),
        ),
      ],
    );
  }

  Widget _buildStatsRow() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          _statItem('الأعضاء', '${_mockUnion['members']}'),
          _divider(),
          _statItem('نشط اليوم', '${_mockUnion['activeToday']}'),
          _divider(),
          _statItem('الترتيب', '#${_mockUnion['rank']}'),
        ],
      ),
    );
  }

  Widget _statItem(String label, String value) {
    return Expanded(
      child: Column(
        children: [
          Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 4),
          Text(label, style: const TextStyle(fontSize: 12, color: Colors.white54), textAlign: TextAlign.right),
        ],
      ),
    );
  }

  Widget _divider() {
    return Container(width: 1, height: 36, color: Colors.white12);
  }
}
