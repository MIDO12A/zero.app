import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../room/room_screen.dart';
import 'create_room_screen.dart';
import '../../utils/app_colors.dart';
import '../../models/room_model.dart';
import '../../services/supabase_service.dart';
import '../../providers/user_provider.dart';
import '../rank/rank_screen.dart';
import '../../config/r.dart';

class DiscoverScreen extends StatefulWidget {
  const DiscoverScreen({super.key});

  @override
  State<DiscoverScreen> createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends State<DiscoverScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final SupabaseService _firebaseService = SupabaseService();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
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
          Stack(
            children: [
              R.loadImage(
                'assets/mipmap-xxhdpi/discover_header_bg.webp',
                width: double.infinity,
                fit: BoxFit.fitWidth,
              ),
              Padding(
                padding: const EdgeInsets.only(top: 40, left: 12, right: 12),
                child: Row(
                  children: [
                    R.loadImage(
                      'assets/mipmap-xxhdpi/discover_search_ic.webp',
                      width: 28,
                      height: 28,
                    ),
                    Expanded(
                      child: TabBar(
                        controller: _tabController,
                        labelColor: AppColors.colorPrimary,
                        unselectedLabelColor: Colors.grey,
                        indicatorColor: AppColors.colorPrimary,
                        tabs: const [
                          Tab(text: 'متابع'),
                          Tab(text: 'استكشاف'),
                          Tab(text: 'المجموعة'),
                        ],
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const CreateRoomScreen(),
                          ),
                        );
                      },
                      child: R.loadImage(
                        'assets/mipmap-xxhdpi/discover_room_ic.webp',
                        width: 28,
                        height: 28,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: const [
                FollowedRoomsTab(),
                ExploreTab(),
                GroupsTab(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class FollowedRoomsTab extends StatelessWidget {
  const FollowedRoomsTab({super.key});

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);
    final user = userProvider.currentUser;
    final firebaseService = SupabaseService();

    return StreamBuilder<List<RoomModel>>(
      stream: firebaseService.allRoomsStream(),
      builder: (context, snapshot) {
        final allRooms = snapshot.data ?? [];
        final followed = user != null
            ? allRooms.where((r) => user.followedRooms.contains(r.roomId)).toList()
            : [];
        if (followed.isEmpty) {
          return const Center(child: Text('No followed rooms'));
        }
        return ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: followed.length,
          itemBuilder: (context, index) {
            final room = followed[index];
            return Card(
              child: ListTile(
                title: Text(room.name),
                subtitle: Text(room.hostName),
                onTap: () {
                  navigateToRoom(
                    context,
                    roomName: room.name,
                    hostName: room.hostName,
                    roomId: room.roomId,
                    roomPassword: room.password,
                  );
                },
              ),
            );
          },
        );
      },
    );
  }
}

class ExploreTab extends StatefulWidget {
  const ExploreTab({super.key});

  @override
  State<ExploreTab> createState() => _ExploreTabState();
}

class _ExploreTabState extends State<ExploreTab> {
  final SupabaseService _firebaseService = SupabaseService();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          _buildDiscoverHeader(context),
          const SizedBox(height: 8),
          _buildHorizontalScrollCategories(),
          const SizedBox(height: 16),
          _buildRoomsList(),
        ],
      ),
    );
  }

  Widget _buildDiscoverHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 8, left: 18, right: 18),
      child: Row(
        children: [
          Expanded(
            child: AspectRatio(
              aspectRatio: 1,
              child: Container(
                constraints: const BoxConstraints(
                  minHeight: 210,
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  image: const DecorationImage(
                    image: AssetImage(
                      'assets/mipmap-xxhdpi/discover_game_teaming_ic.webp',
                    ),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: AspectRatio(
              aspectRatio: 1,
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  image: const DecorationImage(
                    image: AssetImage('assets/mipmap-xxhdpi/home_rank_bg.9.png'),
                    fit: BoxFit.fitWidth,
                  ),
                ),
                padding: const EdgeInsets.symmetric(
                  horizontal: 6,
                  vertical: 3,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const RankScreen(),
                            ),
                          );
                        },
                        child: Stack(
                          children: [
                            R.loadImage(
                              'assets/mipmap-xxhdpi/home_wealth_ic.webp',
                              width: double.infinity,
                              fit: BoxFit.contain,
                            ),
                            Positioned(
                              top: 7,
                              right: 19,
                              child: CircleAvatar(
                                radius: 14.5,
                                child: ClipOval(
                                  child: R.loadImage(
                                    'assets/mipmap-xxhdpi/ava_girl.webp',
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const RankScreen(),
                            ),
                          );
                        },
                        child: Stack(
                          children: [
                            R.loadImage(
                              'assets/mipmap-xxhdpi/home_charm_ic.webp',
                              width: double.infinity,
                              fit: BoxFit.contain,
                            ),
                            Positioned(
                              top: 7,
                              right: 19,
                              child: CircleAvatar(
                                radius: 14.5,
                                child: ClipOval(
                                  child: R.loadImage(
                                    'assets/mipmap-xxhdpi/ava_boy.webp',
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const RankScreen(),
                            ),
                          );
                        },
                        child: Stack(
                          children: [
                            R.loadImage(
                              'assets/mipmap-xxhdpi/home_room_ic.webp',
                              width: double.infinity,
                              fit: BoxFit.contain,
                            ),
                            Positioned(
                              top: 7,
                              right: 19,
                              child: CircleAvatar(
                                radius: 14.5,
                                child: ClipOval(
                                  child: R.loadImage(
                                    'assets/mipmap-xxhdpi/ava_girl.webp',
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
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

  Widget _buildHorizontalScrollCategories() {
    final categories = [
      {'name': 'Music', 'image': 'assets/mipmap-xxhdpi/discover_music_ic.webp'},
      {'name': 'Chat', 'image': 'assets/mipmap-xxhdpi/ic_chatting_friend.webp'},
      {
        'name': 'Social',
        'image': 'assets/mipmap-xxhdpi/ic_social_sharing.webp'
      },
      {
        'name': 'Hobby',
        'image': 'assets/mipmap-xxhdpi/discover_header_item_hobby_ic.webp'
      },
      {
        'name': 'Party',
        'image': 'assets/mipmap-xxhdpi/discover_header_item_party_ic.webp'
      },
    ];

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.only(left: 21),
      child: Row(
        children: categories
            .asMap()
            .entries
            .map(
              (entry) => Padding(
                padding: EdgeInsets.only(
                  right: entry.key == categories.length - 1 ? 16 : 6,
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: R.loadImage(
                    entry.value['image']!,
                    width: 135,
                    height: 62,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
            )
            .toList(),
      ),
    );
  }

  Widget _buildRoomsList() {
    return StreamBuilder<List<RoomModel>>(
      stream: _firebaseService.allRoomsStream(),
      builder: (context, snapshot) {
        final rooms = snapshot.data ?? [];
        if (rooms.isEmpty) {
          return const Padding(
            padding: EdgeInsets.all(32),
            child: Center(
              child: Text('No rooms yet', style: TextStyle(color: Colors.black45)),
            ),
          );
        }
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8),
          child: GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1.0,
            ),
            itemCount: rooms.length,
            itemBuilder: (context, index) => _buildRoomItem(rooms[index]),
          ),
        );
      },
    );
  }

  Widget _buildRoomItem(RoomModel room) {
    return GestureDetector(
      onTap: () {
        navigateToRoom(
          context,
          roomName: room.name,
          hostName: room.hostName,
          roomId: room.roomId,
          roomPassword: room.password,
          hotValue: room.hotValue.toString(),
        );
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: const Color(0xFFF5F5F5),
        ),
        child: Stack(
          children: [
            Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    room.name,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF16151A),
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(Icons.local_fire_department, color: Colors.orange, size: 14),
                      const SizedBox(width: 3),
                      Text(
                        '${room.hotValue}',
                        style: const TextStyle(fontSize: 12, color: Color(0xFF565964)),
                      ),
                      const SizedBox(width: 8),
                      const Icon(Icons.people, color: Color(0xFF565964), size: 14),
                      const SizedBox(width: 3),
                      Text(
                        '${room.memberCount}',
                        style: const TextStyle(fontSize: 12, color: Color(0xFF565964)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    room.hostName,
                    style: const TextStyle(fontSize: 11, color: Color(0xFF9BA1B6)),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class GroupsTab extends StatelessWidget {
  const GroupsTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Groups'),
    );
  }
}
