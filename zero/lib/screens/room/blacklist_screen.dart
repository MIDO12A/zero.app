import 'package:flutter/material.dart';
import '../../config/r.dart';
import '../../config/app_colors.dart';

class BlacklistScreen extends StatelessWidget {
  final String roomId;

  const BlacklistScreen({super.key, required this.roomId});

  @override
  Widget build(BuildContext context) {
    final banned = _mockBanned();

    return Scaffold(
      backgroundColor: const Color(0xFF1A0F0F),
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(context),
            Expanded(
              child: banned.isEmpty
                  ? _buildEmptyState()
                  : ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                      itemCount: banned.length,
                      separatorBuilder: (_, __) => Container(height: 0.5, color: const Color(0x1AFFFFFF)),
                      itemBuilder: (_, i) => _buildBannedItem(context, banned[i]),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              padding: const EdgeInsets.all(4),
              child: R.image(R.backIc, width: 24, height: 24),
            ),
          ),
          const Spacer(),
          const Text('القائمة السوداء', style: TextStyle(fontSize: 17, color: Colors.white, fontWeight: FontWeight.w600)),
          const Spacer(),
          const SizedBox(width: 32),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.shield_outlined, color: Colors.white.withValues(alpha: 0.2), size: 64),
          const SizedBox(height: 16),
          const Text(
            'لا يوجد مستخدمين محظورين',
            style: TextStyle(fontSize: 15, color: Colors.white54),
          ),
        ],
      ),
    );
  }

  Widget _buildBannedItem(BuildContext context, _BannedUser user) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Row(
        children: [
          ClipOval(
            child: R.image(
              user.avatar,
              width: 44,
              height: 44,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(user.nickname, style: const TextStyle(fontSize: 15, color: Colors.white, fontWeight: FontWeight.w500)),
                const SizedBox(height: 2),
                Text(
                  'السبب: ${user.reason}',
                  style: const TextStyle(fontSize: 12, color: Colors.white54),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () {},
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: AppColors.goldLight.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('فك الحظر', style: TextStyle(fontSize: 12, color: AppColors.goldLight)),
            ),
          ),
        ],
      ),
    );
  }

  List<_BannedUser> _mockBanned() {
    return [
      _BannedUser('مستخدم 1', R.avaBoy, 'تجاوز القوانين'),
      _BannedUser('مستخدم 2', R.avaGirl, 'إزعاج متكرر'),
      _BannedUser('مستخدم 3', R.avaBoy, 'محتوى غير لائق'),
    ];
  }
}

class _BannedUser {
  final String nickname;
  final String avatar;
  final String reason;

  _BannedUser(this.nickname, this.avatar, this.reason);
}
