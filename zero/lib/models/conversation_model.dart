class ConversationModel {
  final String id;
  final String name;
  final String avatar;
  final String lastMessage;
  final int lastMessageTime;
  final int unreadCount;

  const ConversationModel({
    required this.id,
    required this.name,
    required this.avatar,
    required this.lastMessage,
    required this.lastMessageTime,
    required this.unreadCount,
  });
}
