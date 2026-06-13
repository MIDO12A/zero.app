import 'package:flutter/material.dart';
import '../../config/r.dart';

class FollowRecentScreen extends StatefulWidget {
  final int initialTab;
  const FollowRecentScreen({super.key, this.initialTab = 0});

  @override
  State<FollowRecentScreen> createState() => _FollowRecentScreenState();
}

class _FollowRecentScreenState extends State<FollowRecentScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int _selectedIndex = 0;

  final List<Map<String, dynamic>> _following = List.generate(15, (i) => {
    'name': 'User_${i + 1}',
    'avatar': null,
    'id': '1000${i + 1}',
    'gender': i % 2 == 0 ? 'male' : 'female',
    'level': (i % 10) + 1,
    'isFollowed': i % 3 == 0,
    'country': i % 4,
  });

  final List<Map<String, dynamic>> _fans = List.generate(12, (i) => {
    'name': 'Fan_${i + 1}',
    'avatar': null,
    'id': '2000${i + 1}',
    'gender': i % 2 == 0 ? 'female' : 'male',
    'level': (i % 8) + 1,
    'isFollowed': i % 2 == 0,
    'country': i % 5,
  });

  final List<Map<String, dynamic>> _visitors = List.generate(8, (i) => {
    'name': 'Visitor_${i + 1}',
    'avatar': null,
    'id': '3000${i + 1}',
    'gender': i % 2 == 0 ? 'male' : 'female',
    'level': (i % 6) + 1,
    'time': '${i + 1}h ago',
    'country': i % 3,
  });

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this, initialIndex: widget.initialTab);
    _tabController.addListener(() {
      if (!_tabController.indexIsChanging) {
        setState(() => _selectedIndex = _tabController.index);
      }
    });
    _selectedIndex = widget.initialTab;
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [
          // Status bar + header
          SizedBox(height: MediaQuery.of(context).padding.top),
          Container(
            height: 44,
            padding: const EdgeInsets.symmetric(horizontal: 0),
            child: Row(
              children: [
                GestureDetector(
                  onTap: () => Navigator.pop(context),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 8),
                    child: R.image(R.backIc, width: 24, height: 24),
                  ),
                ),
                Expanded(
                  child: TabBar(
                    controller: _tabController,
                    isScrollable: true,
                    labelColor: const Color(0xFF16151A),
                    unselectedLabelColor: const Color(0xFF9BA1B6),
                    labelStyle: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
                    unselectedLabelStyle: const TextStyle(fontSize: 13),
                    indicator: _buildTabIndicator(),
                    indicatorSize: TabBarIndicatorSize.label,
                    tabs: [
                      Tab(text: 'Following', height: 44),
                      Tab(text: 'Fans', height: 44),
                      Tab(text: 'Visitors', height: 44),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const Divider(height: 1, color: Color(0xFFF0F0F0)),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildUserList(_following, isVisitor: false),
                _buildUserList(_fans, isVisitor: false),
                _buildUserList(_visitors, isVisitor: true),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Decoration _buildTabIndicator() {
    return const ShapeDecoration(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(20)),
      ),
      color: Color(0xFFDE880F),
    );
  }

  Widget _buildUserList(List<Map<String, dynamic>> items, {bool isVisitor = false}) {
    return ListView.separated(
      padding: EdgeInsets.zero,
      itemCount: items.length,
      separatorBuilder: (_, __) => const Divider(height: 1, indent: 72, color: Color(0xFFF0F0F0)),
      itemBuilder: (context, index) {
        final item = items[index];
        return _buildUserItem(item, isVisitor: isVisitor);
      },
    );
  }

  Widget _buildUserItem(Map<String, dynamic> item, {bool isVisitor = false}) {
    final name = item['name'] as String;
    final id = item['id'] as String;
    final gender = item['gender'] as String;
    final level = item['level'] as int;
    final country = item['country'] as int;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          // iv_avatar: UserVipAvatarView (48dp round)
          Stack(
            children: [
              ClipOval(
                child: Container(
                  width: 48, height: 48,
                  decoration: BoxDecoration(
                    color: Colors.grey.withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                    border: Border.all(color: const Color(0xFFDE880F), width: 1.5),
                  ),
                  child: Icon(Icons.person, size: 24, color: Colors.grey.withValues(alpha: 0.4)),
                ),
              ),
            ],
          ),
          const SizedBox(width: 13),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // cl_info row
                Row(
                  children: [
                    // iv_country_icon (20x13)
                    Container(
                      width: 20, height: 13,
                      decoration: BoxDecoration(
                        color: [Colors.blue, Colors.red, Colors.green, Colors.orange, Colors.purple][country % 5],
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                    const SizedBox(width: 4),
                    // tv_name (14sp, #16151A, max 1 line)
                    Flexible(
                      child: Text(
                        name,
                        style: const TextStyle(fontSize: 14, color: Color(0xFF16151A)),
                        maxLines: 1, overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 4),
                    // iv_sex (18x16)
                    Image.asset(
                      gender == 'male' ? R.sexMaleIc : R.sexFemaleIc,
                      width: 18, height: 16,
                      errorBuilder: (_, __, ___) => Icon(
                        gender == 'male' ? Icons.male : Icons.female,
                        size: 16, color: gender == 'male' ? Colors.blue : Colors.pink,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                // tv_id (12sp, #9BA1B6)
                Text(
                  'ID: $id',
                  style: const TextStyle(fontSize: 12, color: Color(0xFF9BA1B6)),
                ),
                const SizedBox(height: 4),
                // level_view
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(colors: [Color(0xFFDE880F), Color(0xFFFFC525)]),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    'Lv.$level',
                    style: const TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          // tv_right_btn (71x31) or tv_right_time
          if (isVisitor)
            Text(
              item['time'] ?? '',
              style: const TextStyle(fontSize: 10, color: Color(0xFF9BA1B6)),
            )
          else
            GestureDetector(
              onTap: () {
                setState(() {
                  item['isFollowed'] = !item['isFollowed'];
                });
              },
              child: Container(
                width: 71, height: 31,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: item['isFollowed'] ? const Color(0xFFDE880F) : const Color(0xFFD4D6E5),
                    width: 1,
                  ),
                  color: item['isFollowed'] ? const Color(0xFFDE880F) : Colors.transparent,
                ),
                child: Center(
                  child: Text(
                    item['isFollowed'] ? 'Following' : 'Follow',
                    style: TextStyle(
                      fontSize: 11,
                      color: item['isFollowed'] ? Colors.white : const Color(0xFF303236),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
