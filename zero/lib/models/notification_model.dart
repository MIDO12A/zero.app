class NotificationModel {
  final String id;
  final String title;
  final String body;
  final String target;
  final DateTime sentAt;

  NotificationModel({
    required this.id,
    required this.title,
    required this.body,
    this.target = 'all',
    DateTime? sentAt,
  }) : sentAt = sentAt ?? DateTime.now();

  factory NotificationModel.fromMap(Map map) {
    return NotificationModel(
      id: map['id']?.toString() ?? '',
      title: map['title']?.toString() ?? '',
      body: map['body']?.toString() ?? '',
      target: map['target']?.toString() ?? 'all',
      sentAt: map['sent_at'] != null
          ? DateTime.tryParse(map['sent_at'].toString()) ?? DateTime.now()
          : DateTime.now(),
    );
  }
}
