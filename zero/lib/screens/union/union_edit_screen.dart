import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionEditScreen extends StatefulWidget {
  const UnionEditScreen({super.key});

  @override
  State<UnionEditScreen> createState() => _UnionEditScreenState();
}

class _UnionEditScreenState extends State<UnionEditScreen> {
  final _nameCtrl = TextEditingController(text: 'فرسان العرب');
  final _descCtrl = TextEditingController(text: 'نقابة تجمع المحاربين الشجعان من كل مكان.');
  int _minLevel = 3;

  @override
  void dispose() {
    _nameCtrl.dispose();
    _descCtrl.dispose();
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
        title: const Text('تعديل النقابة', textAlign: TextAlign.right),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            GestureDetector(
              onTap: () {},
              child: Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: AppColors.cardBg,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.group, color: Colors.white54, size: 44),
              ),
            ),
            const SizedBox(height: 28),
            TextFormField(
              controller: _nameCtrl,
              textAlign: TextAlign.right,
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: 'اسم النقابة',
                labelStyle: const TextStyle(color: Colors.white54),
                filled: true,
                fillColor: AppColors.cardBg,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _descCtrl,
              textAlign: TextAlign.right,
              maxLines: 4,
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: 'الوصف',
                labelStyle: const TextStyle(color: Colors.white54),
                filled: true,
                fillColor: AppColors.cardBg,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                const Text(
                  'الحد الأدنى للمستوى:',
                  style: TextStyle(color: Colors.white, fontSize: 14),
                  textAlign: TextAlign.right,
                ),
                const Spacer(),
                DropdownButton<int>(
                  value: _minLevel,
                  dropdownColor: const Color(0xFF2A2A2A),
                  style: const TextStyle(color: Colors.white),
                  items: List.generate(20, (i) => i + 1).map((l) {
                    return DropdownMenuItem(value: l, child: Text('$l'));
                  }).toList(),
                  onChanged: (v) => setState(() => _minLevel = v!),
                ),
              ],
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('تم حفظ التغييرات')),
                  );
                  Navigator.pop(context);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF4CAF50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'حفظ التغييرات',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
