import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionStoreScreen extends StatelessWidget {
  const UnionStoreScreen({super.key});

  final _items = const [
    {'name': 'شعار ذهبي', 'cost': 500, 'desc': 'شعار خاص للنقابة'},
    {'name': 'إطار أعضاء', 'cost': 300, 'desc': 'إطار مميز للأعضاء'},
    {'name': 'رتبة خاصة', 'cost': 800, 'desc': 'رتبة حصرية لمدة شهر'},
    {'name': 'خلفية نقابة', 'cost': 400, 'desc': 'خلفية مخصصة لصفحة النقابة'},
    {'name': 'تذكرة حرب', 'cost': 200, 'desc': 'تذكرة للمشاركة في حرب النقابات'},
    {'name': 'صندوق كنز', 'cost': 1000, 'desc': 'صندوق يحتوي على جوائز متنوعة'},
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
        title: const Text('متجر النقابة', textAlign: TextAlign.right),
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            margin: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.cardBg,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.monetization_on, color: Color(0xFFFFC525), size: 24),
                const SizedBox(width: 8),
                const Text(
                  'عملات النقابة:',
                  style: TextStyle(color: Colors.white70, fontSize: 14),
                  textAlign: TextAlign.right,
                ),
                const SizedBox(width: 4),
                const Text(
                  '2,450',
                  style: TextStyle(
                    color: Color(0xFFFFC525),
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: _items.length,
              itemBuilder: (_, i) {
                final item = _items[i];
                return Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: AppColors.cardBg,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 50,
                        height: 50,
                        decoration: BoxDecoration(
                          color: const Color(0xFFFFC525).withOpacity(0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Icon(Icons.card_giftcard, color: Color(0xFFFFC525)),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item['name'] as String,
                              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Colors.white),
                              textAlign: TextAlign.right,
                            ),
                            const SizedBox(height: 2),
                            Text(
                              item['desc'] as String,
                              style: const TextStyle(fontSize: 12, color: Colors.white54),
                              textAlign: TextAlign.right,
                            ),
                          ],
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('تم شراء ${item['name']}')),
                          );
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFFC525).withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            '${item['cost']}',
                            style: const TextStyle(color: Color(0xFFFFC525), fontSize: 13, fontWeight: FontWeight.w600),
                          ),
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
}
