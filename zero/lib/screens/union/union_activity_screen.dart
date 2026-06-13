import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionActivityScreen extends StatelessWidget {
  const UnionActivityScreen({super.key});

  final _activities = const [
    {'user': 'أبو علي', 'action': 'انضم إلى النقابة', 'time': 'منذ ساعتين'},
    {'user': 'سارة', 'action': 'تمت ترقيتها إلى نائب', 'time': 'منذ 5 ساعات'},
    {'user': 'خالد', 'action': 'غادر النقابة', 'time': 'منذ يوم'},
    {'user': 'نور', 'action': 'انضم إلى النقابة', 'time': 'منذ يومين'},
    {'user': 'أحمد', 'action': 'تمت ترقيته إلى مشرف', 'time': 'منذ 3 أيام'},
    {'user': 'ليلى', 'action': 'انضمت إلى النقابة', 'time': 'منذ 4 أيام'},
    {'user': 'أبو علي', 'action': 'قام بتحديث وصف النقابة', 'time': 'منذ 5 أيام'},
    {'user': 'ياسر', 'action': 'غادر النقابة', 'time': 'منذ أسبوع'},
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
        title: const Text('سجل النشاط', textAlign: TextAlign.right),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: _activities.length,
        itemBuilder: (_, i) {
          final a = _activities[i];
          return Container(
            margin: const EdgeInsets.only(bottom: 8),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.cardBg,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 20,
                  backgroundColor: Colors.white12,
                  child: Text(
                    (a['user'] as String)[0],
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      RichText(
                        textAlign: TextAlign.right,
                        text: TextSpan(
                          children: [
                            TextSpan(
                              text: '${a['user']} ',
                              style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
                            ),
                            TextSpan(
                              text: a['action'] as String,
                              style: const TextStyle(color: Colors.white70),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        a['time'] as String,
                        style: const TextStyle(fontSize: 11, color: Colors.white38),
                        textAlign: TextAlign.right,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
