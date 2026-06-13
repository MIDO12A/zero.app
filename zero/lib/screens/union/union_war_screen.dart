import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionWarScreen extends StatelessWidget {
  const UnionWarScreen({super.key});

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
        title: const Text('حرب النقابات', textAlign: TextAlign.right),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFA40E2C), Color(0xFF6B0A1E)],
              ),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              children: [
                const Text(
                  'الحرب الحالية',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                  textAlign: TextAlign.right,
                ),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _warTeam('فرسان العرب', 85),
                    const Text('VS', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white38)),
                    _warTeam('الدرع الحديدي', 72),
                  ],
                ),
                const SizedBox(height: 16),
                const LinearProgressIndicator(
                  value: 0.54,
                  backgroundColor: Colors.white24,
                  color: Color(0xFFFFC525),
                ),
                const SizedBox(height: 8),
                const Text(
                  'متبقي 12 ساعة',
                  style: TextStyle(color: Colors.white60, fontSize: 13),
                  textAlign: TextAlign.right,
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'سجل الحروب',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
            textAlign: TextAlign.right,
          ),
          const SizedBox(height: 8),
          _warHistory('فرسان العرب', 'حراس السلام', 'فوز', true),
          _warHistory('فرسان العرب', 'عصبة الأبطال', 'فوز', true),
          _warHistory('فرسان العرب', 'أسود الليل', 'خسارة', false),
          _warHistory('فرسان العرب', 'النسور الذهبية', 'فوز', true),
        ],
      ),
    );
  }

  Widget _warTeam(String name, int score) {
    return Column(
      children: [
        Container(
          width: 60,
          height: 60,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.15),
            shape: BoxShape.circle,
          ),
          child: const Icon(Icons.group, color: Colors.white, size: 30),
        ),
        const SizedBox(height: 8),
        Text(name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 14)),
        const SizedBox(height: 4),
        Text('$score', style: const TextStyle(color: Color(0xFFFFC525), fontSize: 22, fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _warHistory(String team1, String team2, String result, bool won) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Expanded(
            child: Text(
              '$team1 vs $team2',
              style: const TextStyle(color: Colors.white, fontSize: 14),
              textAlign: TextAlign.right,
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: won ? const Color(0xFF4CAF50).withOpacity(0.2) : Colors.red.withOpacity(0.2),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              result,
              style: TextStyle(
                color: won ? const Color(0xFF4CAF50) : Colors.red,
                fontSize: 13,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
