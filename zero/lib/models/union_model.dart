class UnionModel {
  final String id;
  final String name;
  final String description;
  final String creatorId;
  final String creatorName;
  final String logoUrl;
  final int memberCount;
  final int level;
  final DateTime createdAt;

  UnionModel({
    required this.id,
    required this.name,
    required this.description,
    required this.creatorId,
    required this.creatorName,
    required this.logoUrl,
    required this.memberCount,
    required this.level,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'creator_id': creatorId,
      'creator_name': creatorName,
      'logo_url': logoUrl,
      'member_count': memberCount,
      'level': level,
      'created_at': createdAt.toIso8601String(),
    };
  }

  factory UnionModel.fromMap(Map<String, dynamic> map) {
    return UnionModel(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      description: map['description'] ?? '',
      creatorId: map['creator_id'] ?? '',
      creatorName: map['creator_name'] ?? '',
      logoUrl: map['logo_url'] ?? '',
      memberCount: map['member_count'] ?? 0,
      level: map['level'] ?? 1,
      createdAt: DateTime.parse(map['created_at'] ?? DateTime.now().toIso8601String()),
    );
  }
}
