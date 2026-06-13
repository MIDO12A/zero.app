import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionNoticeScreen extends StatefulWidget {
  const UnionNoticeScreen({super.key});

  @override
  State<UnionNoticeScreen> createState() => _UnionNoticeScreenState();
}

class _UnionNoticeScreenState extends State<UnionNoticeScreen> {
  final _notices = [
    {'author': 'النقيب', 'date': '2026-06-01', 'body': 'مرحباً بالأعضاء الجدد! نرحب بكم في نقابتنا.'},
    {'author': 'نائب', 'date': '2026-05-28', 'body': 'اجتماع النقابة يوم الجمعة الساعة 8 مساءً.'},
    {'author': 'النقيب', 'date': '2026-05-25', 'body': 'تهانينا للنقيب على الترقية إلى المستوى 15!'},
    {'author': 'مشرف', 'date': '2026-05-20', 'body': 'تذكير: يرجى تحديث ملفاتكم الشخصية.'},
  ];

  void _addNotice() {
    showDialog(
      context: context,
      builder: (ctx) {
        final ctrl = TextEditingController();
        return AlertDialog(
          backgroundColor: const Color(0xFF2A2A2A),
          title: const Text('إضافة إشعار', style: TextStyle(color: Colors.white)),
          content: TextField(
            controller: ctrl,
            textAlign: TextAlign.right,
            maxLines: 3,
            style: const TextStyle(color: Colors.white),
            decoration: const InputDecoration(
              hintText: 'اكتب الإشعار هنا...',
              hintStyle: TextStyle(color: Colors.white38),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('إلغاء', style: TextStyle(color: Colors.white54)),
            ),
            TextButton(
              onPressed: () {
                if (ctrl.text.trim().isNotEmpty) {
                  setState(() {
                    _notices.insert(0, {
                      'author': 'النقيب',
                      'date': DateTime.now().toIso8601String().split('T')[0],
                      'body': ctrl.text.trim(),
                    });
                  });
                }
                Navigator.pop(ctx);
              },
              child: const Text('إضافة', style: TextStyle(color: Colors.white)),
            ),
          ],
        );
      },
    );
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
        title: const Text('الإشعارات', textAlign: TextAlign.right),
        actions: [
          IconButton(
            icon: const Icon(Icons.add, color: Colors.white),
            onPressed: _addNotice,
          ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: _notices.length,
        itemBuilder: (_, i) {
          final n = _notices[i];
          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.cardBg,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      n['author'] as String,
                      style: const TextStyle(fontSize: 13, color: Color(0xFFFFC525), fontWeight: FontWeight.w600),
                      textAlign: TextAlign.right,
                    ),
                    const Spacer(),
                    Text(
                      n['date'] as String,
                      style: const TextStyle(fontSize: 11, color: Colors.white38),
                      textAlign: TextAlign.right,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  n['body'] as String,
                  style: const TextStyle(fontSize: 14, color: Colors.white),
                  textAlign: TextAlign.right,
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
