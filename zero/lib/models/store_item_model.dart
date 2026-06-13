class StoreItemModel {
  final String itemId;
  final String name;
  final String category; // 'frame', 'bubble', 'entrance', 'headwear', 'car'
  final String iconAsset;
  final int price;
  final String? svgaAsset; // for animations
  final bool isPremium;
  final String? nameKey; // SVGA layer key for user name text replacement
  final String? photoKey; // SVGA layer key for user photo image replacement
  final String? defaultImage; // fallback image URL if user has no photo

  StoreItemModel({
    required this.itemId,
    required this.name,
    required this.category,
    required this.iconAsset,
    required this.price,
    this.svgaAsset,
    this.isPremium = false,
    this.nameKey,
    this.photoKey,
    this.defaultImage,
  });

  factory StoreItemModel.fromMap(Map<String, dynamic> map) {
    return StoreItemModel(
      itemId: map['item_id']?.toString() ?? '',
      name: map['name']?.toString() ?? '',
      category: map['category']?.toString() ?? '',
      iconAsset: map['icon_asset']?.toString() ?? '',
      price: (map['price'] ?? 0).toInt(),
      svgaAsset: map['svga_asset']?.toString(),
      isPremium: map['is_premium'] as bool? ?? false,
      nameKey: map['name_key']?.toString(),
      photoKey: map['photo_key']?.toString(),
      defaultImage: map['default_image']?.toString(),
    );
  }

  Map<String, dynamic> toMap() => {
        'item_id': itemId,
        'name': name,
        'category': category,
        'icon_asset': iconAsset,
        'price': price,
        'svga_asset': svgaAsset,
        'is_premium': isPremium,
        if (nameKey != null) 'name_key': nameKey,
        if (photoKey != null) 'photo_key': photoKey,
        if (defaultImage != null) 'default_image': defaultImage,
      };
}
