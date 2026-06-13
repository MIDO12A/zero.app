import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';
import 'union_detail_screen.dart';
import 'union_create_screen.dart';

class UnionListScreen extends StatefulWidget {
  const UnionListScreen({super.key});

  @override
  State<UnionListScreen> createState() => _UnionListScreenState();
}

class _UnionListScreenState extends State<UnionListScreen> {
  final _searchCtrl = TextEditingController();
  String _query = '';

  final List<Map<String, dynamic>> _mockUnions = [
    {'id': '1', 'name': 'فرسان العرب', 'members': 42, 'level': 5, 'avatar': null},
    {'id': '2', 'name': 'أسود الليل', 'members': 28, 'level': 3, 'avatar': null},
    {'id': '3', 'name': 'الدرع الحديدي', 'members': 55, 'level': 7, 'avatar': null},
    {'id': '4', 'name': 'عصبة الأبطال', 'members': 33, 'level': 4, 'avatar': null},
    {'id': '5', 'name': 'حراس السلام', 'members': 61, 'level': 8, 'avatar': null},
    {'id': '6', 'name': 'النسور الذهبية', 'members': 19, 'level': 2, 'avatar': null},
  ];

  List<Map<String, dynamic>> get _filtered {
    if (_query.isEmpty) return _mockUnions;
    return _mockUnions.where((u) => u['name'].toString().contains(_query)).toList();
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.roomBg,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: R.image(R.backIc, width: 24, height: 24),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('النقابات', textAlign: TextAlign.right),
        centerTitle: true,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: TextField(
              controller: _searchCtrl,
              textAlign: TextAlign.right,
              onChanged: (v) => setState(() => _query = v),
              style: const TextStyle(color: Colors.white, fontSize: 14),
              decoration: InputDecoration(
                hintText: 'بحث عن نقابة...',
                hintStyle: const TextStyle(color: Colors.white38),
                prefixIcon: const Icon(Icons.search, color: Colors.white38),
                filled: true,
                fillColor: AppColors.cardBg,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: _filtered.length,
              itemBuilder: (_, i) => _UnionCard(
                union: _filtered[i],
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => UnionDetailScreen(unionId: _filtered[i]['id'] as String),
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const UnionCreateScreen()),
          );
        },
        backgroundColor: const Color(0xFF4CAF50),
        icon: const Icon(Icons.add),
        label: const Text('إنشاء نقابة'),
      ),
    );
  }
}

class _UnionCard extends StatelessWidget {
  final Map<String, dynamic> union;
  final VoidCallback onTap;

  const _UnionCard({required this.union, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: onTap,
        child: Row(
          children: [
            CircleAvatar(
              radius: 28,
              backgroundColor: const Color(0xFF4CAF50).withOpacity(0.3),
              child: const Icon(Icons.group, color: Colors.white),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    union['name'],
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.right,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${union['members']} عضو • المستوى ${union['level']}',
                    style: const TextStyle(fontSize: 12, color: Colors.white60),
                    textAlign: TextAlign.right,
                  ),
                ],
              ),
            ),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF4CAF50),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              ),
              child: const Text('انضمام', style: TextStyle(color: Colors.white, fontSize: 13)),
            ),
          ],
        ),
      ),
    );
  }
}
