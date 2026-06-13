import 'package:flutter/material.dart';
import '../../config/r.dart';
import '../../config/app_colors.dart';

class PlaylistScreen extends StatelessWidget {
  const PlaylistScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.roomBg,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 0),
              child: Row(
                children: [
                  GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: R.image(R.backIc, width: 28, height: 28),
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'قائمة التشغيل',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            _buildNowPlaying(),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                children: [
                  const Text(
                    'التالي',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                  const Spacer(),
                  Text(
                    '١٢ أغنية',
                    style: const TextStyle(
                      fontSize: 13,
                      color: AppColors.textTertiary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                itemCount: _queue.length,
                separatorBuilder: (_, __) => const Divider(
                  color: AppColors.divider,
                  height: 1,
                ),
                itemBuilder: (context, index) => _buildQueueItem(_queue[index]),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNowPlaying() {
    final song = currentlyPlaying;
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: AppColors.themeMusic,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: AppColors.cardBg,
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(
              Icons.music_note,
              color: Colors.white,
              size: 28,
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                const Text(
                  'الآن',
                  style: TextStyle(
                    fontSize: 11,
                    color: AppColors.textTertiary,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  song['title']!,
                  textAlign: TextAlign.right,
                  style: const TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  song['artist']!,
                  textAlign: TextAlign.right,
                  style: const TextStyle(
                    fontSize: 13,
                    color: Colors.white70,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          const Icon(Icons.equalizer, color: Colors.white, size: 28),
        ],
      ),
    );
  }

  Widget _buildQueueItem(Map<String, String> item) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.cardBg,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(
              Icons.music_note,
              color: AppColors.goldLight,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  item['title']!,
                  textAlign: TextAlign.right,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '${item['artist']!} • ${item['duration']!}',
                  textAlign: TextAlign.right,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.textTertiary,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            child: const Icon(Icons.thumb_up_alt_outlined,
                color: AppColors.textTertiary, size: 20),
          ),
          const SizedBox(width: 12),
          GestureDetector(
            child: const Icon(Icons.thumb_down_alt_outlined,
                color: AppColors.textTertiary, size: 20),
          ),
        ],
      ),
    );
  }
}

const Map<String, String> currentlyPlaying = {
  'title': 'نظر عيني',
  'artist': 'محمد عبده',
  'duration': '٤:٣٢',
};

const List<Map<String, String>> _queue = [
  {'title': 'أما براوة', 'artist': 'أصالة', 'duration': '٣:٤٥'},
  {'title': 'إنتي', 'artist': 'كاظم الساهر', 'duration': '٥:١٠'},
  {'title': 'سامحني', 'artist': 'عبد المجيد عبد الله', 'duration': '٤:٠٢'},
  {'title': 'حبيبي يا ناسي', 'artist': 'راشد الماجد', 'duration': '٣:٣٠'},
  {'title': 'كل القصايد', 'artist': 'ماجد المهندس', 'duration': '٤:١٥'},
  {'title': 'يا سيدي', 'artist': 'مشعل العبدلي', 'duration': '٣:٥٨'},
  {'title': 'أهل العشق', 'artist': 'نجوى كرم', 'duration': '٤:٤٥'},
  {'title': 'والله أحبك', 'artist': 'أصالة', 'duration': '٥:٠٣'},
  {'title': 'من غير ليه', 'artist': 'عمرو دياب', 'duration': '٣:٢٥'},
  {'title': 'إلا حبيبي', 'artist': 'ماجد المهندس', 'duration': '٤:١٠'},
  {'title': 'حبك شمس', 'artist': 'عبد المجيد عبد الله', 'duration': '٣:٤٨'},
  {'title': 'ما أقسى القلب', 'artist': 'راشد الماجد', 'duration': '٤:٢٢'},
];
