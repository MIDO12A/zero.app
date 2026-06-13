import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionCreateScreen extends StatefulWidget {
  const UnionCreateScreen({super.key});

  @override
  State<UnionCreateScreen> createState() => _UnionCreateScreenState();
}

class _UnionCreateScreenState extends State<UnionCreateScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _descCtrl = TextEditingController();
  int _minLevel = 1;

  @override
  void dispose() {
    _nameCtrl.dispose();
    _descCtrl.dispose();
    super.dispose();
  }

  void _create() {
    if (!_formKey.currentState!.validate()) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('تم إنشاء النقابة بنجاح!')),
    );
    Navigator.pop(context);
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
        title: const Text('إنشاء نقابة', textAlign: TextAlign.right),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
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
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Icon(Icons.camera_alt, color: Colors.white54, size: 28),
                      SizedBox(height: 4),
                      Text('شعار', style: TextStyle(color: Colors.white54, fontSize: 12)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 28),
              TextFormField(
                controller: _nameCtrl,
                textAlign: TextAlign.right,
                style: const TextStyle(color: Colors.white),
                decoration: _inputDecoration('اسم النقابة'),
                validator: (v) => v == null || v.trim().isEmpty ? 'الرجاء إدخال اسم النقابة' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _descCtrl,
                textAlign: TextAlign.right,
                maxLines: 4,
                style: const TextStyle(color: Colors.white),
                decoration: _inputDecoration('الوصف'),
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
                  onPressed: _create,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF4CAF50),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text(
                    'إنشاء',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  InputDecoration _inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: const TextStyle(color: Colors.white54),
      filled: true,
      fillColor: AppColors.cardBg,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
    );
  }
}
