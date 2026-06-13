import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';
import 'union_edit_screen.dart';
import 'union_notice_screen.dart';
import 'union_members_screen.dart';
import 'union_activity_screen.dart';

class UnionManageScreen extends StatelessWidget {
  const UnionManageScreen({super.key});

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
        title: const Text('إدارة النقابة', textAlign: TextAlign.right),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _manageTile(
            context,
            icon: Icons.edit,
            label: 'تعديل النقابة',
            onTap: () => Navigator.push(
              context, MaterialPageRoute(builder: (_) => const UnionEditScreen()),
            ),
          ),
          _manageTile(
            context,
            icon: Icons.people,
            label: 'إدارة الأعضاء',
            onTap: () => Navigator.push(
              context, MaterialPageRoute(builder: (_) => const UnionMembersScreen()),
            ),
          ),
          _manageTile(
            context,
            icon: Icons.campaign,
            label: 'الإشعارات',
            onTap: () => Navigator.push(
              context, MaterialPageRoute(builder: (_) => const UnionNoticeScreen()),
            ),
          ),
          _manageTile(
            context,
            icon: Icons.history,
            label: 'سجل النشاط',
            onTap: () => Navigator.push(
              context, MaterialPageRoute(builder: (_) => const UnionActivityScreen()),
            ),
          ),
          const SizedBox(height: 32),
          Container(
            decoration: BoxDecoration(
              color: Colors.red.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: ListTile(
              leading: const Icon(Icons.delete_forever, color: Colors.red),
              title: const Text('حل النقابة', style: TextStyle(color: Colors.red)),
              onTap: () => showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  backgroundColor: const Color(0xFF2A2A2A),
                  title: const Text('حل النقابة', style: TextStyle(color: Colors.white)),
                  content: const Text('هل أنت متأكد من حل النقابة؟', style: TextStyle(color: Colors.white70)),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(ctx),
                      child: const Text('إلغاء', style: TextStyle(color: Colors.white54)),
                    ),
                    TextButton(
                      onPressed: () { Navigator.pop(ctx); Navigator.pop(context); },
                      child: const Text('حل', style: TextStyle(color: Colors.red)),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _manageTile(BuildContext context, {required IconData icon, required String label, required VoidCallback onTap}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        leading: Icon(icon, color: Colors.white70),
        title: Text(label, style: const TextStyle(color: Colors.white), textAlign: TextAlign.right),
        trailing: const Icon(Icons.arrow_forward_ios, color: Colors.white38, size: 16),
        onTap: onTap,
      ),
    );
  }
}
