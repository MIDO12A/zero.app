import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionInviteScreen extends StatefulWidget {
  const UnionInviteScreen({super.key});

  @override
  State<UnionInviteScreen> createState() => _UnionInviteScreenState();
}

class _UnionInviteScreenState extends State<UnionInviteScreen> {
  final _friends = List.generate(10, (i) {
    final names = ['أحمد', 'محمد', 'سارة', 'نور', 'خالد', 'ليلى', 'عمر', 'رنا', 'ياسر', 'هدى'];
    return {
      'name': names[i],
      'level': 3 + i * 2,
      'invited': false,
    };
  });

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
        title: const Text('دعوة أعضاء', textAlign: TextAlign.right),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: _friends.length,
        itemBuilder: (_, i) {
          final f = _friends[i];
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
                  child: Text(
                    (f['name'] as String)[0],
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        f['name'] as String,
                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Colors.white),
                        textAlign: TextAlign.right,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'المستوى ${f['level']}',
                        style: const TextStyle(fontSize: 12, color: Colors.white54),
                        textAlign: TextAlign.right,
                      ),
                    ],
                  ),
                ),
                f['invited'] as bool
                    ? const Text('تمت الدعوة', style: TextStyle(color: Colors.white38, fontSize: 13))
                    : GestureDetector(
                        onTap: () {
                          setState(() => f['invited'] = true);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('تمت دعوة ${f['name']}')),
                          );
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                          decoration: BoxDecoration(
                            color: const Color(0xFF4CAF50).withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Text('دعوة', style: TextStyle(color: Color(0xFF4CAF50), fontSize: 13)),
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
