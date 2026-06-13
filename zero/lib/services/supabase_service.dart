import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:uuid/uuid.dart';
import '../models/room_model.dart';
import '../models/message_model.dart';
import '../models/gift_model.dart' as gm;
import '../models/user_model.dart';
import '../models/store_item_model.dart';
import '../models/union_model.dart';
import '../models/banner_config.dart';
import '../models/gifted_item_model.dart';
import '../models/notification_model.dart';
import 'level_service.dart';

class SupabaseService {
  static final SupabaseService _instance = SupabaseService._();
  factory SupabaseService() => _instance;
  SupabaseService._();

  late final SupabaseClient _client;

  void init() {
    _client = Supabase.instance.client;
  }

  SupabaseClient get client => _client;

  // ========== Rooms ==========

  Future<String> createRoom({
    required String name,
    String description = '',
    String roomPhotoUrl = '',
    required String hostUid,
    required String hostName,
    String hostPhotoUrl = '',
    bool isLocked = false,
    String password = '',
    String category = '',
    String country = '',
  }) async {
    final roomId = hostUid;
    final room = RoomModel(
      roomId: roomId,
      name: name,
      description: description,
      roomPhotoUrl: roomPhotoUrl,
      hostUid: hostUid,
      hostName: hostName,
      hostPhotoUrl: hostPhotoUrl,
      memberCount: 1,
      maxMembers: 8,
      isLocked: isLocked,
      category: category,
      createdAt: DateTime.now().millisecondsSinceEpoch,
      password: password,
      country: country,
    );
    await _client.from('rooms').upsert(room.toMap());
    await _client.from('room_members').insert({
      'room_id': roomId,
      'uid': hostUid,
      'name': hostName,
      'photo_url': hostPhotoUrl,
      'role': 'host',
      'joined_at': DateTime.now().toIso8601String(),
    });
    await _client.from('users').update({'hosted_room_id': roomId}).eq('uid', hostUid);
    return roomId;
  }

  Future<void> followRoom(String uid, String roomId) async {
    final res = await _client.from('users').select('followed_rooms').eq('uid', uid).maybeSingle();
    if (res == null) return;
    final followed = List<String>.from(res['followed_rooms'] ?? []);
    if (!followed.contains(roomId)) {
      followed.add(roomId);
      await _client.from('users').update({'followed_rooms': followed}).eq('uid', uid);
    }
  }

  Future<void> unfollowRoom(String uid, String roomId) async {
    final res = await _client.from('users').select('followed_rooms').eq('uid', uid).maybeSingle();
    if (res == null) return;
    final followed = List<String>.from(res['followed_rooms'] ?? []);
    if (followed.contains(roomId)) {
      followed.remove(roomId);
      await _client.from('users').update({'followed_rooms': followed}).eq('uid', uid);
    }
  }

  Stream<RoomModel?> roomStream(String roomId) {
    return _client.from('rooms').stream(primaryKey: ['room_id']).eq('room_id', roomId).map((list) {
      if (list.isEmpty) return null;
      return RoomModel.fromMap(list.first);
    });
  }

  Stream<List<RoomModel>> allRoomsStream() {
    return _client.from('rooms').stream(primaryKey: ['room_id']).map((list) {
      final rooms = list.map((e) => RoomModel.fromMap(e)).toList();
      rooms.sort((a, b) => b.totalGifts.compareTo(a.totalGifts));
      return rooms;
    });
  }

  Future<void> updateRoomMemberCount(String roomId, int count) async {
    await _client.from('rooms').update({'member_count': count}).eq('room_id', roomId);
  }

  Future<void> updateRoomName(String roomId, String name) async {
    await _client.from('rooms').update({'name': name}).eq('room_id', roomId);
  }

  Future<void> updateRoomSeatStyle(String roomId, int seatStyleIndex) async {
    await _client.from('rooms').update({'seat_style': seatStyleIndex}).eq('room_id', roomId);
  }

  Future<void> updateRoomSeatCount(String roomId, int count) async {
    await _client.from('rooms').update({'seat_count': count}).eq('room_id', roomId);
  }

  Future<void> updateRoomSeatColor(String roomId, int seatColorIndex) async {
    await _client.from('rooms').update({'seat_color': seatColorIndex}).eq('room_id', roomId);
  }

  Future<RoomModel?> getRoom(String roomId) async {
    final res = await _client.from('rooms').select().eq('room_id', roomId).maybeSingle();
    if (res == null) return null;
    return RoomModel.fromMap(res);
  }

  Future<void> updateRoom(String roomId, Map<String, dynamic> updates) async {
    await _client.from('rooms').update(updates).eq('room_id', roomId);
  }

  Future<void> addModerator(String roomId, String uid) async {
    await _client.rpc('add_room_moderator', params: {
      'p_room_id': roomId,
      'p_uid': uid,
    });
  }

  Future<void> removeModerator(String roomId, String uid) async {
    await _client.rpc('remove_room_moderator', params: {
      'p_room_id': roomId,
      'p_uid': uid,
    });
  }

  // ========== Members ==========

  Future<void> joinRoom(String roomId, UserModel user) async {
    await _client.from('room_members').upsert({
      'room_id': roomId,
      'uid': user.uid,
      'name': user.name,
      'photo_url': user.photoUrl,
      'role': 'member',
      'joined_at': DateTime.now().toIso8601String(),
    });
  }

  Future<void> leaveRoom(String roomId, String uid) async {
    await _client.from('room_members').delete().eq('room_id', roomId).eq('uid', uid);
  }

  Stream<List<UserModel>> roomMembersStream(String roomId) {
    return _client.from('room_members').stream(primaryKey: ['room_id', 'uid']).eq('room_id', roomId).map((list) {
      return list.map((e) => UserModel.fromMap(e)).toList();
    });
  }

  // ========== Seats ==========

  Future<bool> takeSeat(String roomId, int seatIndex, UserModel user) async {
    final existing = await _client.from('room_seats').select().eq('room_id', roomId).eq('seat_index', seatIndex).maybeSingle();
    if (existing != null) return false;
    await _client.from('room_seats').insert({
      'room_id': roomId,
      'seat_index': seatIndex,
      'uid': user.uid,
      'name': user.name,
      'photo_url': user.photoUrl,
      'active_frame': user.activeFrame,
      'active_car': user.activeCar,
      'is_muted': false,
      'taken_at': DateTime.now().toIso8601String(),
    });
    return true;
  }

  Future<void> leaveSeat(String roomId, int seatIndex) async {
    await _client.from('room_seats').delete().eq('room_id', roomId).eq('seat_index', seatIndex);
  }

  Future<void> toggleMute(String roomId, int seatIndex, bool muted) async {
    await _client.from('room_seats').update({'is_muted': muted}).eq('room_id', roomId).eq('seat_index', seatIndex);
  }

  Stream<Map<int, Map<String, dynamic>>> seatsStream(String roomId) {
    return _client.from('room_seats').stream(primaryKey: ['room_id', 'seat_index']).eq('room_id', roomId).map((list) {
      final map = <int, Map<String, dynamic>>{};
      for (final e in list) {
        map[e['seat_index'] as int] = Map<String, dynamic>.from(e);
      }
      return map;
    });
  }

  // ========== Messages ==========

  Future<void> sendMessage(String roomId, String text, String senderUid,
      String senderName, String senderPhotoUrl) async {
    final msgId = const Uuid().v4();
    final msg = MessageModel(
      msgId: msgId,
      senderUid: senderUid,
      senderName: senderName,
      senderPhotoUrl: senderPhotoUrl,
      text: text,
      type: 'text',
      timestamp: DateTime.now().millisecondsSinceEpoch,
    );
    await _client.from('room_messages').insert(msg.toMap());
  }

  Stream<List<MessageModel>> messagesStream(String roomId) {
    return _client.from('room_messages').stream(primaryKey: ['msg_id']).eq('room_id', roomId).map((list) {
      return list.map((e) => MessageModel.fromMap(e)).toList();
    });
  }

  // ========== Gifts ==========

  Future<bool> sendGift({
    required String roomId,
    required String giftId,
    String giftName = '',
    String? animationAsset,
    required String senderId,
    required String senderName,
    required String senderPhotoUrl,
    required String receiverId,
    required String receiverName,
    required int value,
    int count = 1,
  }) async {
    final id = const Uuid().v4();
    final totalCost = value * count;

    final senderRes = await _client.from('users').select('coins').eq('uid', senderId).maybeSingle();
    if (senderRes == null) return false;
    final senderCoins = senderRes['coins'] as int? ?? 0;
    if (senderCoins < totalCost) return false;

    final gift = gm.SentGiftModel(
      id: id,
      giftId: giftId,
      giftName: giftName,
      animationAsset: animationAsset,
      senderId: senderId,
      senderName: senderName,
      senderPhotoUrl: senderPhotoUrl,
      receiverId: receiverId,
      receiverName: receiverName,
      roomId: roomId,
      value: value,
      count: count,
      timestamp: DateTime.now(),
    );

    await _client.from('users').update({'coins': senderCoins - totalCost}).eq('uid', senderId);
    await _client.from('sent_gifts').insert(gift.toMap());

    final receiverRes = await _client.from('users').select('total_gifts_received').eq('uid', receiverId).maybeSingle();
    if (receiverRes != null) {
      final current = receiverRes['total_gifts_received'] as int? ?? 0;
      await _client.from('users').update({'total_gifts_received': current + gift.totalValue}).eq('uid', receiverId);
    }

    final roomRes = await _client.from('rooms').select('total_gifts, hot_value').eq('room_id', roomId).maybeSingle();
    if (roomRes != null) {
      final totalGifts = roomRes['total_gifts'] as int? ?? 0;
      final hotValue = roomRes['hot_value'] as int? ?? 0;
      await _client.from('rooms').update({
        'total_gifts': totalGifts + gift.totalValue,
        'hot_value': hotValue + gift.totalValue,
      }).eq('room_id', roomId);
    }

    try {
      final levelService = LevelService();
      await levelService.loadAllLevels();
      // 1 coin spent = 1 wealth XP for sender
      await levelService.addExp(uid: senderId, type: 'wealth', amount: totalCost);
      // 1 coin received = 1 attractiveness (gems) XP for receiver
      await levelService.addExp(uid: receiverId, type: 'gems', amount: totalCost);
    } catch (e) {
      debugPrint('sendGift: XP award error: $e');
    }

    return true;
  }

  Stream<List<gm.SentGiftModel>> sentGiftsStream(String roomId) {
    return _client.from('sent_gifts').stream(primaryKey: ['id']).eq('room_id', roomId).map((list) {
      return list.map((e) => gm.SentGiftModel.fromMap(e)).toList();
    });
  }

  Stream<List<gm.SentGiftModel>> userReceivedGiftsStream(String uid) {
    return _client.from('sent_gifts').stream(primaryKey: ['id']).map((list) {
      return list.map((e) => gm.SentGiftModel.fromMap(e)).toList();
    });
  }

  // ========== Users ==========

  Future<void> saveUser(UserModel user) async {
    final data = user.toMap();
    data['uid'] = user.uid;
    await _client.from('users').upsert(data);
  }

  Future<UserModel?> getUser(String uid) async {
    final res = await _client.from('users').select().eq('uid', uid).maybeSingle();
    if (res == null) return null;
    return UserModel.fromMap(res);
  }

  Stream<UserModel?> userStream(String uid) {
    return _client.from('users').stream(primaryKey: ['uid']).map((list) {
      if (list.isEmpty) return null;
      return UserModel.fromMap(list.first);
    });
  }

  Future<void> updateUser(String uid, Map<String, dynamic> data) async {
    await _client.from('users').update(data).eq('uid', uid);
  }

  Stream<List<UserModel>> allUsersStream() {
    return _client.from('users').stream(primaryKey: ['uid']).map((list) {
      return list.map((e) => UserModel.fromMap(e)).toList();
    });
  }

  // ========== Gift Catalog ==========
  Stream<List<gm.GiftModel>> giftsStream() {
    return _client.from('gifts').stream(primaryKey: ['id']).map((list) {
      final gifts = list.map((e) => gm.GiftModel.fromMap(e)).toList();
      gifts.sort((a, b) => a.sortOrder.compareTo(b.sortOrder));
      return gifts;
    });
  }

  Future<Map<String, gm.GiftModel>> getGiftsCatalog() async {
    try {
      final res = await _client.from('gifts').select('*');
      final list = (res as List?) ?? [];
      return {for (final e in list)
        (e['id']?.toString() ?? ''): gm.GiftModel.fromMap(e as Map<String, dynamic>)};
    } catch (e) {
      debugPrint('getGiftsCatalog error: $e');
      return {};
    }
  }

  // ========== Store ==========
  Map<String, StoreItemModel> _storeItems = {};

  Stream<List<StoreItemModel>> storeItemsStream() {
    return _client.from('store_items').stream(primaryKey: ['item_id']).map((list) {
      final items = list.map((e) => StoreItemModel.fromMap(e)).toList();
      _storeItems = {for (final item in items) item.itemId: item};
      return items;
    });
  }

  StoreItemModel? getStoreItemSync(String itemId) => _storeItems[itemId];

  Stream<List<BannerConfig>> bannersStream() {
    return _client.from('banners').stream(primaryKey: ['id']).map((list) {
      final banners = list
          .map((e) => BannerConfig.fromMap(e))
          .where((b) => b.active && b.imageUrl.isNotEmpty)
          .toList();
      banners.sort((a, b) => a.sortOrder.compareTo(b.sortOrder));
      return banners;
    });
  }

  Future<void> addStoreItem(StoreItemModel item) async {
    await _client.from('store_items').upsert(item.toMap());
  }

  Future<StoreItemModel?> getStoreItem(String itemId) async {
    final res = await _client.from('store_items').select().eq('item_id', itemId).maybeSingle();
    if (res == null) return null;
    return StoreItemModel.fromMap(res);
  }

  // ========== Backpack & Purchases ==========
  Future<bool> purchaseItem(String uid, StoreItemModel item) async {
    final res = await _client.from('users').select('coins, owned_items').eq('uid', uid).maybeSingle();
    if (res == null) return false;
    final coins = res['coins'] as int? ?? 0;
    final owned = List<String>.from(res['owned_items'] ?? []);
    if (coins < item.price) return false;

    owned.add(item.itemId);
    await _client.from('users').update({
      'coins': coins - item.price,
      'owned_items': owned,
    }).eq('uid', uid);

    return true;
  }

  Future<void> equipItem(String uid, String itemId, String category) async {
    final updateMap = <String, dynamic>{};
    switch (category) {
      case 'frame':
        updateMap['active_frame'] = itemId;
        break;
      case 'headwear':
        updateMap['active_headwear'] = itemId;
        break;
      case 'bubble':
        updateMap['active_bubble'] = itemId;
        break;
      case 'entrance':
        updateMap['active_entrance'] = itemId;
        break;
      case 'car':
        updateMap['active_car'] = itemId;
        break;
      case 'cover':
        updateMap['active_cover'] = itemId;
        break;
    }
    await _client.from('users').update(updateMap).eq('uid', uid);
  }

  Future<void> unequipItem(String uid, String category) async {
    final updateMap = <String, dynamic>{};
    switch (category) {
      case 'frame':
        updateMap['active_frame'] = null;
        break;
      case 'headwear':
        updateMap['active_headwear'] = null;
        break;
      case 'bubble':
        updateMap['active_bubble'] = null;
        break;
      case 'entrance':
        updateMap['active_entrance'] = null;
        break;
      case 'car':
        updateMap['active_car'] = null;
        break;
      case 'cover':
        updateMap['active_cover'] = null;
        break;
    }
    await _client.from('users').update(updateMap).eq('uid', uid);
  }

  // ========== Gifted Items ==========
  Stream<List<GiftedItemModel>> userGiftedItemsStream(String uid) {
    return _client.from('gifted_items').stream(primaryKey: ['id']).map((list) {
      return list
          .where((e) => e['uid'] == uid)
          .map((e) => GiftedItemModel.fromMap(e, e['id'] as String))
          .toList();
    });
  }

  Future<List<GiftedItemModel>> getGiftedItems(String uid) async {
    final res = await _client.from('gifted_items').select('*').eq('uid', uid);
    final list = (res as List?) ?? [];
    return list.map((e) {
      final map = e as Map<String, dynamic>;
      return GiftedItemModel.fromMap(map, map['id'] as String);
    }).toList();
  }

  Future<void> removeGiftedItem(String id) async {
    await _client.from('gifted_items').delete().eq('id', id);
  }

  // ========== Image Messages ==========
  Future<void> sendImageMessage(String roomId, String imageUrl, String senderUid,
      String senderName, String senderPhotoUrl) async {
    final msgId = const Uuid().v4();
    final msg = MessageModel(
      msgId: msgId,
      senderUid: senderUid,
      senderName: senderName,
      senderPhotoUrl: senderPhotoUrl,
      text: '',
      imageUrl: imageUrl,
      type: 'image',
      timestamp: DateTime.now().millisecondsSinceEpoch,
    );
    await _client.from('room_messages').insert(msg.toMap());
  }

  // ========== Private Messaging ==========

  Future<String> _getOrCreateConversationId(String uid1, String uid2) async {
    final sorted = [uid1, uid2]..sort();
    return '${sorted[0]}_${sorted[1]}';
  }

  Future<void> sendPrivateMessage({
    required String senderId,
    required String senderName,
    required String senderPhotoUrl,
    required String receiverId,
    required String receiverName,
    required String receiverPhotoUrl,
    required String text,
    String? imageUrl,
    String type = 'text',
  }) async {
    final convId = await _getOrCreateConversationId(senderId, receiverId);
    final msgId = const Uuid().v4();
    final msg = MessageModel(
      msgId: msgId,
      senderUid: senderId,
      senderName: senderName,
      senderPhotoUrl: senderPhotoUrl,
      text: text,
      imageUrl: imageUrl,
      type: type,
      timestamp: DateTime.now().millisecondsSinceEpoch,
    );
    await _client.from('private_messages').insert(msg.toMap());

    final now = DateTime.now().toIso8601String();
    for (final uid in [senderId, receiverId]) {
      await _client.from('conversations').upsert({
        'uid': uid,
        'conv_id': convId,
        'last_message': text,
        'last_sender_uid': senderId,
        'last_timestamp': now,
        'unread_count': uid == senderId ? 0 : 1,
      });
    }
  }

  Stream<List<Map<String, dynamic>>> conversationsStream(String uid) {
    return _client.from('conversations').stream(primaryKey: ['uid', 'conv_id']).map((list) {
      final convs = list.map((e) => Map<String, dynamic>.from(e)).toList();
      convs.sort((a, b) {
        final at = a['last_timestamp'] as String? ?? '';
        final bt = b['last_timestamp'] as String? ?? '';
        return bt.compareTo(at);
      });
      return convs;
    });
  }

  Stream<List<MessageModel>> privateMessagesStream(String conversationId) {
    return _client.from('private_messages').stream(primaryKey: ['id']).map((list) {
      return list.map((e) => MessageModel.fromMap(e)).toList();
    });
  }

  Future<void> markConversationRead(String uid, String conversationId) async {
    await _client.from('conversations').update({'unread_count': 0}).eq('uid', uid).eq('conv_id', conversationId);
  }

  // ========== Recharge ==========
  Future<void> addCoins(String uid, int amount) async {
    final res = await _client.from('users').select('coins').eq('uid', uid).maybeSingle();
    if (res == null) return;
    final coins = res['coins'] as int? ?? 0;
    await _client.from('users').update({'coins': coins + amount}).eq('uid', uid);

    try {
      final levelService = LevelService();
      await levelService.loadAllLevels();
      // 1 coin recharged = 1 recharge XP
      await levelService.addExp(uid: uid, type: 'recharge', amount: amount);
    } catch (e) {
      debugPrint('addCoins: recharge XP error: $e');
    }
  }

  // ========== User Follow ==========

  Future<void> followUser(String uid, String targetUid) async {
    if (uid == targetUid) return;
    try {
      await _client.from('follows').insert({
        'follower_uid': uid,
        'following_uid': targetUid,
        'created_at': DateTime.now().toIso8601String(),
      });
      await _client.rpc('increment_follow', params: {'p_uid': uid, 'p_field': 'following'});
      await _client.rpc('increment_follow', params: {'p_uid': targetUid, 'p_field': 'followers'});
    } catch (e) {
      debugPrint('followUser error: $e');
    }
  }

  Future<void> unfollowUser(String uid, String targetUid) async {
    if (uid == targetUid) return;
    try {
      await _client.from('follows').delete().eq('follower_uid', uid).eq('following_uid', targetUid);
      await _client.rpc('decrement_follow', params: {'p_uid': uid, 'p_field': 'following'});
      await _client.rpc('decrement_follow', params: {'p_uid': targetUid, 'p_field': 'followers'});
    } catch (e) {
      debugPrint('unfollowUser error: $e');
    }
  }

  Future<bool> isFollowing(String uid, String targetUid) async {
    if (uid.isEmpty || targetUid.isEmpty) return false;
    try {
      final res = await _client.from('follows').select('id').eq('follower_uid', uid).eq('following_uid', targetUid).maybeSingle();
      return res != null;
    } catch (e) {
      debugPrint('isFollowing error: $e');
      return false;
    }
  }

  Future<int> incrementVisitors(String uid) async {
    try {
      final res = await _client.from('users').select('visitors').eq('uid', uid).maybeSingle();
      if (res == null) return 0;
      final current = (res['visitors'] as int? ?? 0) + 1;
      await _client.from('users').update({'visitors': current}).eq('uid', uid);
      return current;
    } catch (e) {
      debugPrint('incrementVisitors error: $e');
      return 0;
    }
  }

  Future<List<gm.SentGiftModel>> getReceivedGifts(String uid) async {
    try {
      final res = await _client.from('sent_gifts').select('*').eq('receiver_id', uid).order('created_at', ascending: false).limit(50);
      final list = (res as List?) ?? [];
      return list.map((e) => gm.SentGiftModel.fromMap(e as Map<String, dynamic>)).toList();
    } catch (e) {
      debugPrint('getReceivedGifts error: $e');
      return [];
    }
  }

  Future<String?> getUserCurrentRoomId(String uid) async {
    try {
      final res = await _client.from('room_members').select('room_id').eq('uid', uid).maybeSingle();
      return res?['room_id']?.toString();
    } catch (e) {
      debugPrint('getUserCurrentRoomId error: $e');
      return null;
    }
  }

  Future<List<GiftedItemModel>> getGiftedItemsByCategory(String uid, String category) async {
    try {
      final res = await _client.from('gifted_items').select('*').eq('uid', uid).eq('item_category', category);
      final list = (res as List?) ?? [];
      return list.map((e) {
        final map = e as Map<String, dynamic>;
        return GiftedItemModel.fromMap(map, map['id'] as String);
      }).toList();
    } catch (e) {
      debugPrint('getGiftedItemsByCategory error: $e');
      return [];
    }
  }

  Future<List<Map<String, dynamic>>> getBadgesCatalog() async {
    try {
      final res = await _client.from('badges').select('*');
      return (res as List?)?.cast<Map<String, dynamic>>() ?? [];
    } catch (e) {
      debugPrint('getBadgesCatalog error: $e');
      return [];
    }
  }

  Future<List<Map<String, dynamic>>> getNecklacesCatalog() async {
    try {
      final res = await _client.from('necklaces').select('*').order('sort_order');
      return (res as List?)?.cast<Map<String, dynamic>>() ?? [];
    } catch (e) {
      debugPrint('getNecklacesCatalog error: $e');
      return [];
    }
  }

  /// Auto-award recharge necklaces based on user's recharge level.
  /// Returns the list of newly awarded necklace IDs.
  Future<List<String>> awardRechargeNecklaces(String uid, int rechargeLevel) async {
    try {
      final cat = await getNecklacesCatalog();
      final eligible = <Map<String, dynamic>>[];
      for (final n in cat) {
        if (n['type']?.toString() == 'recharge') {
          final req = (n['required_recharge_level'] ?? 0).toInt();
          if (req > 0 && req <= rechargeLevel) {
            eligible.add(n);
          }
        }
      }
      if (eligible.isEmpty) return [];

      final userRes = await _client.from('users').select('owned_necklaces').eq('uid', uid).maybeSingle();
      final current = (userRes?['owned_necklaces'] as List?)?.map((e) => e.toString()).toList() ?? [];
      final toAdd = eligible
          .map((n) => n['id']?.toString() ?? '')
          .where((id) => id.isNotEmpty && !current.contains(id))
          .toList();
      if (toAdd.isEmpty) return [];

      final updated = [...current, ...toAdd];
      await updateUser(uid, {'owned_necklaces': updated});
      return toAdd;
    } catch (e) {
      debugPrint('awardRechargeNecklaces error: $e');
      return [];
    }
  }

  // ========== Entrance Effects ==========
  Future<void> logEntrance(String roomId, String uid, String name, String photoUrl, String? entranceItem) async {
    await _client.from('rooms').select().eq('room_id', roomId).maybeSingle();
    // Entrance logged as room_messages with type 'entrance'
    // text = readable message, image_url = entrance item ID for animation lookup
    await _client.from('room_messages').insert({
      'msg_id': const Uuid().v4(),
      'room_id': roomId,
      'sender_uid': uid,
      'sender_name': name,
      'sender_photo_url': photoUrl,
      'text': '$name entered the room',
      'type': 'entrance',
      'image_url': entranceItem ?? '',
      'created_at': DateTime.now().toIso8601String(),
    });
  }

  Future<void> logExit(String roomId, String name) async {
    await _client.from('room_messages').insert({
      'msg_id': const Uuid().v4(),
      'room_id': roomId,
      'sender_uid': '',
      'sender_name': '',
      'sender_photo_url': '',
      'text': '$name left the room',
      'type': 'entrance',
      'created_at': DateTime.now().toIso8601String(),
    });
  }

  Stream<List<Map<String, dynamic>>> entrancesStream(String roomId) {
    return _client.from('room_messages').stream(primaryKey: ['msg_id']).eq('room_id', roomId).map((list) {
      return list.where((e) => e['type'] == 'entrance').map((e) => {
            'uid': e['sender_uid'],
            'name': e['sender_name'],
            'photoUrl': e['sender_photo_url'],
            'entranceItem': (e['image_url']?.toString() ?? '').isNotEmpty ? e['image_url']?.toString() : e['text']?.toString(),
            'timestamp': e['created_at'],
          }).toList();
    });
  }

  // ========== Unions ==========

  Future<String> createUnion({
    required String name,
    required String description,
    required String creatorId,
    required String creatorName,
    required String logoUrl,
  }) async {
    final unionId = const Uuid().v4().substring(0, 8);
    final union = UnionModel(
      id: unionId,
      name: name,
      description: description,
      creatorId: creatorId,
      creatorName: creatorName,
      logoUrl: logoUrl,
      memberCount: 1,
      level: 1,
      createdAt: DateTime.now(),
    );
    await _client.from('unions').upsert(union.toMap());
    await _client.from('union_members').insert({
      'union_id': unionId,
      'uid': creatorId,
      'role': 'owner',
      'joined_at': DateTime.now().toIso8601String(),
    });
    return unionId;
  }

  Stream<List<UnionModel>> allUnionsStream() {
    return _client.from('unions').stream(primaryKey: ['id']).map((list) {
      return list.map((e) => UnionModel.fromMap(e)).toList();
    });
  }

  Future<void> joinUnion(String unionId, String uid, String name) async {
    await _client.from('union_members').insert({
      'union_id': unionId,
      'uid': uid,
      'role': 'member',
      'joined_at': DateTime.now().toIso8601String(),
    });
    final res = await _client.from('unions').select('member_count').eq('id', unionId).maybeSingle();
    final count = res?['member_count'] as int? ?? 0;
    await _client.from('unions').update({'member_count': count + 1}).eq('id', unionId);
  }

  Future<void> leaveUnion(String unionId, String uid) async {
    await _client.from('union_members').delete().eq('union_id', unionId).eq('uid', uid);
    final res = await _client.from('unions').select('member_count').eq('id', unionId).maybeSingle();
    final count = res?['member_count'] as int? ?? 0;
    await _client.from('unions').update({'member_count': (count - 1).clamp(0, 999999)}).eq('id', unionId);
  }

  Stream<List<NotificationModel>> notificationsStream() {
    return _client
        .from('notifications')
        .stream(primaryKey: ['id'])
        .map((list) => list.map((e) => NotificationModel.fromMap(e)).toList());
  }
}
