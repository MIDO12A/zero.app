import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionRankScreen extends StatefulWidget {
  const UnionRankScreen({super.key});

  @override
  State<UnionRankScreen> createState() => _UnionRankScreenState();
}

class _UnionRankScreenState extends State<UnionRankScreen> {
  bool _isWeekly = true;

  final _weekly = [
    {'name': 'فرسان العرب', 'score': 15200},
    {'name': 'الدرع الحديدي', 'score': 13400},
    {'name': 'حراس السلام', 'score': 12100},
    {'name': 'عصبة الأبطال', 'score': 9800},
    {'name': 'أسود الليل', 'score': 7200},
    {'name': 'النسور الذهبية', 'score': 5100},
  ];

  final _monthly = [
    {'name': 'حراس السلام', 'score': 52300},
    {'name': 'فرسان العرب', 'score': 48900},
    {'name': 'الدرع الحديدي', 'score': 41200},
    {'name': 'عصبة الأبطال', 'score': 35600},
    {'name': 'أسود الليل', 'score': 28400},
    {'name': 'النسور الذهبية', 'score': 19300},
  ];

  @override
  Widget build(BuildContext context) {
    final data = _isWeekly ? _weekly : _monthly;
    return Scaffold(
      backgroundColor: AppColors.roomBg,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: R.image(R.backIc, width: 24, height: 24),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('ترتيب النقابات', textAlign: TextAlign.right),
      ),
      body: Column(
        children: [
          Row(
            children: [
              Expanded(child: _tab('أسبوعي', _isWeekly, () => setState(() => _isWeekly = true))),
              Expanded(child: _tab('شهري', !_isWeekly, () => setState(() => _isWeekly = false))),
            ],
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              itemCount: data.length,
              itemBuilder: (_, i) {
                final item = data[i];
                final isFirst = i == 0;
                return Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                  decoration: BoxDecoration(
                    color: isFirst ? const Color(0xFFFFC525).withOpacity(0.1) : AppColors.cardBg,
                    borderRadius: BorderRadius.circular(12),
                    border: isFirst ? Border.all(color: const Color(0xFFFFC525).withOpacity(0.3)) : null,
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 32,
                        height: 32,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: isFirst ? const Color(0xFFFFC525) : Colors.white12,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          '${i + 1}',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: isFirst ? Colors.black : Colors.white,
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          item['name'] as String,
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: isFirst ? FontWeight.bold : FontWeight.normal,
                            color: Colors.white,
                          ),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      Text(
                        '${item['score']}',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: isFirst ? const Color(0xFFFFC525) : Colors.white70,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _tab(String label, bool selected, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: selected ? const Color(0xFFFFC525) : Colors.transparent,
              width: 2,
            ),
          ),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(
            color: selected ? const Color(0xFFFFC525) : Colors.white54,
            fontWeight: selected ? FontWeight.bold : FontWeight.normal,
            fontSize: 15,
          ),
        ),
      ),
    );
  }
}
