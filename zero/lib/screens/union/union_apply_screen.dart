import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionApplyScreen extends StatefulWidget {
  const UnionApplyScreen({super.key});

  @override
  State<UnionApplyScreen> createState() => _UnionApplyScreenState();
}

class _UnionApplyScreenState extends State<UnionApplyScreen> {
  final _requests = [
    {'name': 'محمد', 'level': 8, 'date': '2026-06-05'},
    {'name': 'سامي', 'level': 5, 'date': '2026-06-04'},
    {'name': 'رنا', 'level': 10, 'date': '2026-06-03'},
    {'name': 'عمر', 'level': 3, 'date': '2026-06-02'},
  ];

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
        title: const Text('طلبات الانضمام', textAlign: TextAlign.right),
      ),
      body: _requests.isEmpty
          ? const Center(
              child: Text('لا توجد طلبات', style: TextStyle(color: Colors.white54, fontSize: 16)),
            )
          : ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              itemCount: _requests.length,
              itemBuilder: (_, i) {
                final r = _requests[i];
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
                              r['name'] as String,
                              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Colors.white),
                              textAlign: TextAlign.right,
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'المستوى ${r['level']} • ${r['date']}',
                              style: const TextStyle(fontSize: 12, color: Colors.white54),
                              textAlign: TextAlign.right,
                            ),
                          ],
                        ),
                      ),
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          GestureDetector(
                            onTap: () {
                              setState(() => _requests.removeAt(i));
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('تم قبول الطلب')),
                              );
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: const Color(0xFF4CAF50).withOpacity(0.2),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Text('قبول', style: TextStyle(color: Color(0xFF4CAF50), fontSize: 13)),
                            ),
                          ),
                          const SizedBox(width: 8),
                          GestureDetector(
                            onTap: () {
                              setState(() => _requests.removeAt(i));
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('تم رفض الطلب')),
                              );
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: Colors.red.withOpacity(0.2),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Text('رفض', style: TextStyle(color: Colors.red, fontSize: 13)),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}
