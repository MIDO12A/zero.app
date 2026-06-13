import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionMembersScreen extends StatefulWidget {
  const UnionMembersScreen({super.key});

  @override
  State<UnionMembersScreen> createState() => _UnionMembersScreenState();
}

class _UnionMembersScreenState extends State<UnionMembersScreen> {
  final _members = [
    {'name': 'أبو علي', 'role': 'النقيب', 'level': 15, 'lastOnline': 'الآن', 'avatar': null},
    {'name': 'سارة', 'role': 'نائب', 'level': 12, 'lastOnline': 'منذ 5 دقائق', 'avatar': null},
    {'name': 'خالد', 'role': 'مشرف', 'level': 10, 'lastOnline': 'منذ ساعة', 'avatar': null},
    {'name': 'نور', 'role': 'مشرف', 'level': 9, 'lastOnline': 'منذ 3 ساعات', 'avatar': null},
    {'name': 'أحمد', 'role': 'عضو', 'level': 8, 'lastOnline': 'منذ يوم', 'avatar': null},
    {'name': 'ليلى', 'role': 'عضو', 'level': 7, 'lastOnline': 'منذ يومين', 'avatar': null},
    {'name': 'ياسر', 'role': 'عضو', 'level': 6, 'lastOnline': 'منذ 3 أيام', 'avatar': null},
    {'name': 'هدى', 'role': 'عضو', 'level': 5, 'lastOnline': 'منذ أسبوع', 'avatar': null},
  ];

  Color _roleColor(String role) {
    switch (role) {
      case 'النقيب':
        return const Color(0xFFFFC525);
      case 'نائب':
        return const Color(0xFF4CAF50);
      case 'مشرف':
        return const Color(0xFF2196F3);
      default:
        return Colors.white54;
    }
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
        title: const Text('الأعضاء', textAlign: TextAlign.right),
      ),
      body: RefreshIndicator(
        onRefresh: () => Future.delayed(const Duration(seconds: 1)),
        child: ListView.builder(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          itemCount: _members.length,
          itemBuilder: (_, i) {
            final m = _members[i];
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              decoration: BoxDecoration(
                color: AppColors.cardBg,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: Colors.white12,
                    child: const Icon(Icons.person, color: Colors.white54),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          m['name'] as String,
                          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Colors.white),
                          textAlign: TextAlign.right,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'المستوى ${m['level']} • ${m['lastOnline']}',
                          style: const TextStyle(fontSize: 12, color: Colors.white54),
                          textAlign: TextAlign.right,
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: _roleColor(m['role'] as String).withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      m['role'] as String,
                      style: TextStyle(fontSize: 12, color: _roleColor(m['role'] as String), fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
