import 'package:flutter/material.dart';

class GuideScreen extends StatefulWidget {
  const GuideScreen({super.key});

  @override
  State<GuideScreen> createState() => _GuideScreenState();
}

class _GuideScreenState extends State<GuideScreen> {
  final PageController _controller = PageController();
  int _currentPage = 0;

  final List<_GuidePage> _pages = [
    _GuidePage(
      icon: Icons.headset_mic,
      title: 'Voice Chat Rooms',
      description: 'Join or create audio rooms\nand meet new people!',
    ),
    _GuidePage(
      icon: Icons.card_giftcard,
      title: 'Send Gifts',
      description: 'Show appreciation with\nvirtual gifts & animations',
    ),
    _GuidePage(
      icon: Icons.games,
      title: 'Play Games',
      description: 'Fun games to play together\ninside voice rooms',
    ),
  ];

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1A2E),
      body: Stack(
        children: [
          PageView.builder(
            controller: _controller,
            itemCount: _pages.length,
            onPageChanged: (i) => setState(() => _currentPage = i),
            itemBuilder: (_, i) => _buildPage(_pages[i]),
          ),
          Positioned(
            bottom: 80,
            left: 0,
            right: 0,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(
                    _pages.length,
                    (i) => Container(
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      width: _currentPage == i ? 24 : 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: _currentPage == i
                            ? Colors.blueAccent
                            : Colors.white30,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: 200,
                  height: 48,
                  child: ElevatedButton(
                    onPressed: () {
                      if (_currentPage < _pages.length - 1) {
                        _controller.nextPage(
                          duration: const Duration(milliseconds: 300),
                          curve: Curves.easeInOut,
                        );
                      } else {
                        Navigator.pushReplacementNamed(context, '/login');
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blueAccent,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                    ),
                    child: Text(
                      _currentPage == _pages.length - 1
                          ? 'Get Started'
                          : 'Next',
                      style: const TextStyle(
                          fontSize: 18, color: Colors.white),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPage(_GuidePage page) {
    return Padding(
      padding: const EdgeInsets.all(48),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              color: Colors.blueAccent.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(page.icon, size: 60, color: Colors.blueAccent),
          ),
          const SizedBox(height: 48),
          Text(
            page.title,
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            page.description,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 16, color: Colors.white70),
          ),
        ],
      ),
    );
  }
}

class _GuidePage {
  final IconData icon;
  final String title;
  final String description;
  _GuidePage({
    required this.icon,
    required this.title,
    required this.description,
  });
}
