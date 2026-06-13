export interface UserModel {
  uid: string;
  customId: string;
  name: string;
  email: string;
  photoUrl: string;
  coins: number;
  diamonds: number;
  gender: string;
  activeFrame: string | null;
  activeBubble: string | null;
  activeEntrance: string | null;
  activeCar: string | null;
  activeCover: string | null;
  activeNecklace: string | null;
  ownedItems: string[];
  ownedBadges: string[];
  ownedNecklaces: string[];
  hostedRoomId: string | null;
  followedRooms: string[];
  totalGiftsReceived: number;
  level: number;
  experience: number;
  followers: number;
  following: number;
  visitors: number;
  charm: number;
  wealthLevel: number;
  wealthExp: number;
  rechargeLevel: number;
  rechargeExp: number;
  gemsLevel: number;
  gemsExp: number;
  ownedLevelFrames: string[];
  ownedLevelBadges: string[];
  phone: string;
  lastIp: string;
  banned: boolean;
  banReason: string;
}

export interface RoomModel {
  roomId: string;
  name: string;
  description: string;
  roomPhotoUrl: string;
  hostUid: string;
  hostName: string;
  hostPhotoUrl: string;
  memberCount: number;
  maxMembers: number;
  isLocked: boolean;
  category: string;
  createdAt: number;
  password: string;
  seatCount: number;
  totalGifts: number;
  hotValue: number;
}

export interface GiftModel {
  id: string;
  name: string;
  value: number;
  iconAsset: string;
  animationAsset: string | null;
  isVap: boolean;
  isLucky: boolean;
  isStar: boolean;
  isMusic: boolean;
  packageCount: number;
  sortOrder: number;
  nameKey?: string;
  photoKey?: string;
  defaultImage?: string;
  wealthXp?: number;
  gemsXp?: number;
}

export interface SentGiftModel {
  id: string;
  giftId: string;
  senderId: string;
  senderName: string;
  senderPhotoUrl: string | null;
  receiverId: string;
  receiverName: string;
  roomId: string;
  value: number;
  count: number;
  timestamp: number;
}

export interface StoreItemModel {
  itemId: string;
  name: string;
  category: 'frame' | 'bubble' | 'entrance' | 'headwear' | 'car';
  iconAsset: string;
  price: number;
  svgaAsset: string | null;
  isPremium: boolean;
  nameKey?: string;
  photoKey?: string;
  defaultImage?: string;
}

export interface UnionModel {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  creatorName: string;
  logoUrl: string;
  memberCount: number;
  level: number;
  createdAt: number;
}

export interface ConversationModel {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
}

export interface BugReport {
  id: string;
  userId?: string;
  message: string;
  stackTrace?: string;
  timestamp: number;
  deviceInfo?: string;
  appVersion?: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'superadmin' | 'admin' | 'moderator';
  displayName: string;
  createdAt: number;
}

export interface AppConfig {
  primaryBg?: string;
  textPrimary?: string;
  textSecondary?: string;
  goldColor?: string;
  appName?: string;
  splashGifUrl?: string;
  audioProvider?: string;
  maintenanceMode?: boolean;
  fontFamily?: string;
  borderRadius?: number;
  buttonColor?: string;
  buttonTextColor?: string;
  headerColor?: string;
  tabBarColor?: string;
  screenTitles?: Record<string, string>;
  banners?: BannerConfig[];
  levelIcons?: Record<string, string>;
  giftUploadPath?: string;
  storeUploadPath?: string;
  assetsOverrides?: Record<string, string>;
  assetSizes?: Record<string, AssetSizeOverride>;
  cloudinary?: { cloudName?: string; apiKey?: string; apiSecret?: string };
  coinsPerRechargeXp?: number;
}

export interface AppAsset {
  key: string;
  name: string;
  category: string;
  subcategory: string;
  localPath: string;
  defaultWidth?: number;
  defaultHeight?: number;
}

export interface AssetSizeOverride {
  width?: number;
  height?: number;
}

export interface BannerConfig {
  id: string;
  imageUrl: string;
  linkUrl?: string;
  title?: string;
  sortOrder: number;
  active: boolean;
  createdAt: number;
}

export interface NotificationPayload {
  id: string;
  title: string;
  body: string;
  targetUsers: 'all' | 'specific' | 'level';
  targetValue?: string;
  sentAt: number;
  status: 'draft' | 'sent';
}

export interface LevelConfig {
  level: number;
  minExp: number;
  maxExp: number;
  title: string;
  type: 'wealth' | 'recharge' | 'gems';
  imageUrl?: string;
  frameUrl?: string;
  badgeUrl?: string;
  rewards: { coins?: number; diamonds?: number; frame?: string; badge?: string };
  progressColor?: string;
  boxImageUrl?: string;
}

export interface LevelType {
  id: 'wealth' | 'recharge' | 'gems';
  name: string;
  icon: string;
  color: string;
}

export interface VIPConfig {
  tier: number;
  name: string;
  minSpend: number;
  price?: number;
  color: string;
  image_url?: string;
  bg_url?: string;
  logo_url?: string;
  medal_url?: string;
  medal_img_url?: string;
  headwear_url?: string;
  headwear_img_url?: string;
  entrance_url?: string;
  entrance_img_url?: string;
  bubble_url?: string;
  bubble_img_url?: string;
  necklace_url?: string;
  necklace_img_url?: string;
  benefits: string[];
  accessories?: any[];
  items?: VIPBenefitItem[];
  additional_files?: VIPAdditionalFile[];
}

export interface VIPAdditionalFile {
  name: string;
  url: string;
  type: string;
}

export interface VIPBenefitItem {
  name: string;
  img?: string;
  peculiarityId?: number;
  title?: string;
}

export interface UserVIP {
  uid: string;
  tier: number;
  purchased_at: string;
  expires_at: string | null;
  gifted_by: string | null;
  user?: UserModel;
}

export interface BadgeConfig {
  id: string;
  name: string;
  iconAsset: string;
  description: string;
  unlockCondition: string;
  svgaUrl?: string;
  imageUrl?: string;
  sortOrder?: number;
  type?: 'admin' | 'level'; // Admin gift or Level reward
  levelType?: 'wealth' | 'recharge' | 'gems'; // Which level type?
  levelNumber?: number; // Which level number?
}

export interface NecklaceConfig {
  id: string;
  name: string;
  svgaUrl?: string;
  imageUrl?: string;
  price: number;
  sortOrder: number;
  createdAt?: string;
  type?: 'event' | 'admin' | 'recharge';
  requiredRechargeLevel?: number;
}

export interface AgencyModel {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  memberCount: number;
  totalRevenue: number;
  commissionRate: number;
  createdAt: number;
}

export interface CPModel {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  revenueShare: number;
  contentCount: number;
  status: 'active' | 'suspended';
  createdAt: number;
}

export interface BDModel {
  id: string;
  name: string;
  region: string;
  contactName: string;
  contactEmail: string;
  partnerSince: number;
  dealValue: number;
  status: 'active' | 'inactive';
}

export interface GiftedItem {
  id: string;
  uid: string;
  itemId: string;
  itemCategory: string;
  itemName: string;
  itemIcon: string;
  svgaAsset: string | null;
  sentBy: string;
  sentByName: string;
  sentAt: number;
  expiresAt: number;
}
