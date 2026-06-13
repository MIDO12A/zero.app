import { useEffect, useState } from 'react';
import { AppConfig, AppAsset, AssetSizeOverride } from '../types';
import { getAppConfig, updateAppConfig } from '../lib/db';
import { uploadAppAsset } from '../lib/storage';
import { Save, Upload, X, Image, FileType, Search, Minus, Plus } from 'lucide-react';

const ASSET_CATEGORIES = [
  {
    id: 'store',
    label: 'المتجر',
    subcategories: ['header', 'icons', 'backgrounds', 'items'],
  },
  {
    id: 'wallet',
    label: 'المحفظة',
    subcategories: ['header', 'coins', 'icons'],
  },
  {
    id: 'level',
    label: 'المستويات',
    subcategories: ['backgrounds', 'badges', 'vip'],
  },
  {
    id: 'union',
    label: 'النقابة',
    subcategories: ['icons', 'backgrounds'],
  },
  {
    id: 'account',
    label: 'حسابي',
    subcategories: ['header', 'menu', 'edit', 'settings'],
  },
  {
    id: 'discover',
    label: 'اكتشف',
    subcategories: ['header', 'categories', 'room-cards'],
  },
  {
    id: 'room',
    label: 'الغرفة',
    subcategories: ['backgrounds', 'mic', 'gift-panel', 'controls', 'user-info'],
  },
  {
    id: 'chat',
    label: 'الدردشة',
    subcategories: ['backgrounds'],
  },
  {
    id: 'login',
    label: 'تسجيل الدخول',
    subcategories: ['backgrounds', 'buttons'],
  },
  {
    id: 'nav',
    label: 'الشريط السفلي',
    subcategories: ['tabs'],
  },
  {
    id: 'common',
    label: 'عام',
    subcategories: ['avatars', 'gender', 'arrows', 'icons'],
  },
  {
    id: 'svga',
    label: 'SVGA',
    subcategories: ['frames', 'animations', 'waves'],
  },
];

const ALL_ASSETS: AppAsset[] = [
  // ===== Store (المتجر) =====
  { key: 'mine_mall_top_bg_webp', name: 'خلفية المتجر', category: 'store', subcategory: 'header', localPath: 'assets/mipmap-xxhdpi/mine_mall_top_bg.webp' },
  { key: 'mine_mall_buy_ic_webp', name: 'أيقونة الشراء', category: 'store', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/mine_mall_buy_ic.webp' },
  { key: 'mine_mall_tab_vip_ic_webp', name: 'أيقونة VIP', category: 'store', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/mine_mall_tab_vip_ic.webp' },
  { key: 'mine_vip_label_ic_webp', name: 'ملصق VIP', category: 'store', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/mine_vip_label_ic.webp' },
  { key: 'mine_vip_go_webp', name: 'سهم VIP', category: 'store', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/mine_vip_go.webp' },
  { key: 'mine_vip_center_bg_webp', name: 'خلفية VIP', category: 'store', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/mine_vip_center_bg.webp' },

  // ===== Wallet (المحفظة) =====
  { key: 'mine_wallet_header_bg_webp', name: 'خلفية المحفظة', category: 'wallet', subcategory: 'header', localPath: 'assets/mipmap-xxhdpi/mine_wallet_header_bg.webp' },
  { key: 'mine_wallet_coin_bag_ic_webp', name: 'كيس العملات', category: 'wallet', subcategory: 'coins', localPath: 'assets/mipmap-xxhdpi/mine_wallet_coin_bag_ic.webp' },
  { key: 'mine_wallet_detail_ic_webp', name: 'تفاصيل المحفظة', category: 'wallet', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/mine_wallet_detail_ic.webp' },
  { key: 'mine_wallet_filter_ic_webp', name: 'فلتر المحفظة', category: 'wallet', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/mine_wallet_filter_ic.webp' },
  { key: 'common_gold_ic_1_webp', name: 'عملة ذهبية 1', category: 'wallet', subcategory: 'coins', localPath: 'assets/mipmap-xxhdpi/common_gold_ic_1.webp' },
  { key: 'common_gold_ic_2_webp', name: 'عملة ذهبية 2', category: 'wallet', subcategory: 'coins', localPath: 'assets/mipmap-xxhdpi/common_gold_ic_2.webp' },
  { key: 'common_gold_ic_3_webp', name: 'عملة ذهبية 3', category: 'wallet', subcategory: 'coins', localPath: 'assets/mipmap-xxhdpi/common_gold_ic_3.webp' },
  { key: 'common_gold_ic_4_webp', name: 'عملة ذهبية 4', category: 'wallet', subcategory: 'coins', localPath: 'assets/mipmap-xxhdpi/common_gold_ic_4.webp' },
  { key: 'common_diamond_ic_webp', name: 'ألماسة', category: 'wallet', subcategory: 'coins', localPath: 'assets/mipmap-xxhdpi/common_diamond_ic.webp' },

  // ===== Level (المستويات) =====
  { key: 'level_top_bg_webp', name: 'خلفية المستوى', category: 'level', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/level_top_bg.webp' },
  { key: 'mine_level_ic_webp', name: 'شارة المستوى', category: 'level', subcategory: 'badges', localPath: 'assets/mipmap-xxhdpi/mine_level_ic.webp' },

  // ===== Union (النقابة) =====
  { key: 'mine_union_ic_webp', name: 'أيقونة النقابة', category: 'union', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/mine_union_ic.webp' },

  // ===== Account (حسابي) =====
  { key: 'mine_top_bg_webp', name: 'خلفية حسابي', category: 'account', subcategory: 'header', localPath: 'assets/mipmap-xxhdpi/mine_top_bg.webp', defaultWidth: 375, defaultHeight: 200 },
  { key: 'mine_btn_edit_ic_webp', name: 'زر التعديل', category: 'account', subcategory: 'edit', localPath: 'assets/mipmap-xxhdpi/mine_btn_edit_ic.webp' },
  { key: 'mine_avatar_ic_webp', name: 'إطار الصورة', category: 'account', subcategory: 'edit', localPath: 'assets/mipmap-xxhdpi/mine_avatar_ic.webp' },
  { key: 'mine_wallet_ic_webp', name: 'أيقونة المحفظة', category: 'account', subcategory: 'menu', localPath: 'assets/mipmap-xxhdpi/mine_wallet_ic.webp' },
  { key: 'mine_backpack_ic_webp', name: 'أيقونة الحقيبة', category: 'account', subcategory: 'menu', localPath: 'assets/mipmap-xxhdpi/mine_backpack_ic.webp' },
  { key: 'mine_mall_ic_webp', name: 'أيقونة المتجر', category: 'account', subcategory: 'menu', localPath: 'assets/mipmap-xxhdpi/mine_mall_ic.webp' },
  { key: 'mine_setting_ic_webp', name: 'أيقونة الإعدادات', category: 'account', subcategory: 'menu', localPath: 'assets/mipmap-xxhdpi/mine_setting_ic.webp' },
  { key: 'mine_feedback_ic_webp', name: 'أيقونة الملاحظات', category: 'account', subcategory: 'menu', localPath: 'assets/mipmap-xxhdpi/mine_feedback_ic.webp' },
  { key: 'common_user_id_ic_webp', name: 'أيقونة المعرف', category: 'account', subcategory: 'edit', localPath: 'assets/mipmap-xxhdpi/common_user_id_ic.webp' },
  { key: 'common_id_copy_ic_webp', name: 'نسخ المعرف', category: 'account', subcategory: 'edit', localPath: 'assets/mipmap-xxhdpi/common_id_copy_ic.webp' },
  // Settings
  { key: 'mine_google_ic_webp', name: 'أيقونة جوجل', category: 'account', subcategory: 'settings', localPath: 'assets/mipmap-xxhdpi/mine_google_ic.webp' },
  { key: 'mine_facebook_ic_webp', name: 'أيقونة فيسبوك', category: 'account', subcategory: 'settings', localPath: 'assets/mipmap-xxhdpi/mine_facebook_ic.webp' },
  { key: 'mine_phone_ic_webp', name: 'أيقونة الهاتف', category: 'account', subcategory: 'settings', localPath: 'assets/mipmap-xxhdpi/mine_phone_ic.webp' },
  { key: 'img_ask_webp', name: 'أيقونة استفسار', category: 'account', subcategory: 'settings', localPath: 'assets/mipmap-xxhdpi/img_ask.webp' },

  // ===== Discover (اكتشف) =====
  { key: 'discover_header_bg_webp', name: 'خلفية الاكتشاف', category: 'discover', subcategory: 'header', localPath: 'assets/mipmap-xxhdpi/discover_header_bg.webp' },
  { key: 'discover_search_ic_webp', name: 'أيقونة البحث', category: 'discover', subcategory: 'header', localPath: 'assets/mipmap-xxhdpi/discover_search_ic.webp' },
  { key: 'discover_room_ic_webp', name: 'أيقونة الغرفة', category: 'discover', subcategory: 'header', localPath: 'assets/mipmap-xxhdpi/discover_room_ic.webp' },
  { key: 'discover_music_ic_webp', name: 'أيقونة الموسيقى', category: 'discover', subcategory: 'categories', localPath: 'assets/mipmap-xxhdpi/discover_music_ic.webp' },
  { key: 'discover_room_social_share_ic_webp', name: 'مشاركة اجتماعية', category: 'discover', subcategory: 'categories', localPath: 'assets/mipmap-xxhdpi/discover_room_social_share_ic.webp' },
  // Category backgrounds
  { key: 'discover_item_chat_bg_webp', name: 'خلفية دردشة', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/discover_item_chat_bg.webp' },
  { key: 'discover_item_music_bg_webp', name: 'خلفية موسيقى', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/discover_item_music_bg.webp' },
  { key: 'discover_item_game_bg_webp', name: 'خلفية ألعاب', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/discover_item_game_bg.webp' },
  { key: 'discover_item_hobby_bg_webp', name: 'خلفية هوايات', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/discover_item_hobby_bg.webp' },
  { key: 'discover_item_party_bg_webp', name: 'خلفية حفلات', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/discover_item_party_bg.webp' },
  { key: 'discover_item_friend_bg_webp', name: 'خلفية أصدقاء', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/discover_item_friend_bg.webp' },
  // Category icons
  { key: 'discover_room_chat_ic_webp', name: 'أيقونة الدردشة', category: 'discover', subcategory: 'categories', localPath: 'assets/mipmap-xxhdpi/discover_room_chat_ic.webp' },
  { key: 'discover_room_enjoy_music_webp', name: 'أيقونة الموسيقى', category: 'discover', subcategory: 'categories', localPath: 'assets/mipmap-xxhdpi/discover_room_enjoy_music.webp' },
  { key: 'discover_room_game_team_ic_webp', name: 'أيقونة الألعاب', category: 'discover', subcategory: 'categories', localPath: 'assets/mipmap-xxhdpi/discover_room_game_team_ic.webp' },
  { key: 'discover_room_hobby_ic_webp', name: 'أيقونة الهوايات', category: 'discover', subcategory: 'categories', localPath: 'assets/mipmap-xxhdpi/discover_room_hobby_ic.webp' },
  { key: 'discover_room_party_ic_webp', name: 'أيقونة الحفلات', category: 'discover', subcategory: 'categories', localPath: 'assets/mipmap-xxhdpi/discover_room_party_ic.webp' },
  { key: 'discover_game_teaming_ic_webp', name: 'أيقونة الفرق', category: 'discover', subcategory: 'categories', localPath: 'assets/mipmap-xxhdpi/discover_game_teaming_ic.webp' },
  // Room cards
  { key: 'room_hot_logo_ic_webp', name: 'علامة النشاط', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/room_hot_logo_ic.webp' },
  { key: 'room_create_room_bg_webp', name: 'خلفية إنشاء غرفة', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/room_create_room_bg.webp' },
  { key: 'room_create_label_ic_webp', name: 'ملصق إنشاء غرفة', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/room_create_label_ic.webp' },
  { key: 'room_create_hobby_refresh_ic_webp', name: 'تحديث الهوايات', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/room_create_hobby_refresh_ic.webp' },
  { key: 'common_camera_ic_webp', name: 'أيقونة الكاميرا', category: 'discover', subcategory: 'room-cards', localPath: 'assets/mipmap-xxhdpi/common_camera_ic.webp' },

  // ===== Room (الغرفة) =====
  { key: 'room_bg_friend_webp', name: 'خلفية الغرفة', category: 'room', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/room_bg_friend.webp' },
  { key: 'room_bg_seat_pre_webp', name: 'خلفية المقعد', category: 'room', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/room_bg_seat_pre.webp' },
  // Mic
  { key: 'room_micphone_ic_webp', name: 'أيقونة المايك', category: 'room', subcategory: 'mic', localPath: 'assets/mipmap-xxhdpi/room_micphone_ic.webp' },
  { key: 'room_micphone_close_ic_webp', name: 'مايك مغلق', category: 'room', subcategory: 'mic', localPath: 'assets/mipmap-xxhdpi/room_micphone_close_ic.webp' },
  { key: 'room_mic_on_webp', name: 'مايك تشغيل', category: 'room', subcategory: 'mic', localPath: 'assets/mipmap-xxhdpi/room_mic_on.webp' },
  { key: 'room_mic_off_webp', name: 'مايك إيقاف', category: 'room', subcategory: 'mic', localPath: 'assets/mipmap-xxhdpi/room_mic_off.webp' },
  { key: 'room_mic_down_webp', name: 'مايك خفض', category: 'room', subcategory: 'mic', localPath: 'assets/mipmap-xxhdpi/room_mic_down.webp' },
  // Gift panel
  { key: 'room_gift_ic_webp', name: 'زر الهدية', category: 'room', subcategory: 'gift-panel', localPath: 'assets/mipmap-xxhdpi/room_gift_ic.webp' },
  { key: 'room_gift_panel_select_owner_ic_webp', name: 'اختيار مالك الهدية', category: 'room', subcategory: 'gift-panel', localPath: 'assets/mipmap-xxhdpi/room_gift_panel_select_owner_ic.webp' },
  { key: 'room_set_music_ic_webp', name: 'إعدادات الموسيقى', category: 'room', subcategory: 'controls', localPath: 'assets/mipmap-xxhdpi/room_set_music_ic.webp' },
  // Controls
  { key: 'room_emoj_ic_webp', name: 'زر الإيموجي', category: 'room', subcategory: 'controls', localPath: 'assets/mipmap-xxhdpi/room_emoj_ic.webp' },
  { key: 'room_chat_ic_webp', name: 'زر الدردشة', category: 'room', subcategory: 'controls', localPath: 'assets/mipmap-xxhdpi/room_chat_ic.webp' },
  { key: 'room_exit_ic_webp', name: 'زر الخروج', category: 'room', subcategory: 'controls', localPath: 'assets/mipmap-xxhdpi/room_exit_ic.webp' },
  { key: 'room_game_ic_webp', name: 'زر اللعبة', category: 'room', subcategory: 'controls', localPath: 'assets/mipmap-xxhdpi/room_game_ic.webp' },
  { key: 'room_lock_state_ic_webp', name: 'أيقونة القفل', category: 'room', subcategory: 'controls', localPath: 'assets/mipmap-xxhdpi/room_lock_state_ic.webp' },
  // User info
  { key: 'room_set_music_ic_webp', name: 'أيقونة الموسيقى', category: 'room', subcategory: 'user-info', localPath: 'assets/mipmap-xxhdpi/room_set_music_ic.webp' },
  // Seat shapes
  { key: 'room_seat_normal_bg_webp', name: 'مقعد عادي', category: 'room', subcategory: 'seats', localPath: 'assets/mipmap-xxhdpi/room_seat_normal_bg.webp' },
  { key: 'room_seat_vip_bg_webp', name: 'مقعد VIP', category: 'room', subcategory: 'seats', localPath: 'assets/mipmap-xxhdpi/room_seat_vip_bg.webp' },
  { key: 'room_seat_host_bg_webp', name: 'مقعد المضيف', category: 'room', subcategory: 'seats', localPath: 'assets/mipmap-xxhdpi/room_seat_host_bg.webp' },
  { key: 'room_seat_mic_bg_webp', name: 'مقعد المايك', category: 'room', subcategory: 'seats', localPath: 'assets/mipmap-xxhdpi/room_seat_mic_bg.webp' },
  { key: 'room_seat_empty_bg_webp', name: 'مقعد فارغ', category: 'room', subcategory: 'seats', localPath: 'assets/mipmap-xxhdpi/room_seat_empty_bg.webp' },
  { key: 'room_seat_occupied_bg_webp', name: 'مقعد مشغول', category: 'room', subcategory: 'seats', localPath: 'assets/mipmap-xxhdpi/room_seat_occupied_bg.webp' },
  { key: 'room_seat_lock_ic_webp', name: 'قفل المقعد', category: 'room', subcategory: 'seats', localPath: 'assets/mipmap-xxhdpi/room_seat_lock_ic.webp' },

  // ===== Chat (الدردشة) =====
  { key: 'chat_message_system_bg_webp', name: 'خلفية نظام الدردشة', category: 'chat', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/chat_message_system_bg.webp' },
  { key: 'chat_message_information_bg_webp', name: 'خلفية معلومات الدردشة', category: 'chat', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/chat_message_information_bg.webp' },

  // ===== Login (تسجيل الدخول) =====
  { key: 'bg_login_webp', name: 'خلفية تسجيل الدخول', category: 'login', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/bg_login.webp' },
  { key: 'login_welcome_ic_webp', name: 'شعار الترحيب', category: 'login', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/login_welcome_ic.webp' },
  { key: 'login_google_ic_webp', name: 'زر جوجل', category: 'login', subcategory: 'buttons', localPath: 'assets/mipmap-xxhdpi/login_google_ic.webp' },
  { key: 'login_fb_ic_webp', name: 'زر فيسبوك', category: 'login', subcategory: 'buttons', localPath: 'assets/mipmap-xxhdpi/login_fb_ic.webp' },
  { key: 'login_phone_ic_webp', name: 'زر الهاتف', category: 'login', subcategory: 'buttons', localPath: 'assets/mipmap-xxhdpi/login_phone_ic.webp' },
  { key: 'ic_launcher_webp', name: 'أيقونة التطبيق', category: 'login', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/ic_launcher.webp' },
  { key: 'splash_img_logo_webp', name: 'شعار البداية', category: 'login', subcategory: 'backgrounds', localPath: 'assets/mipmap-xxhdpi/splash_img_logo.webp' },

  // ===== Nav (الشريط السفلي) =====
  { key: 'tab_discover_nor_webp', name: 'اكتشف - عادي', category: 'nav', subcategory: 'tabs', localPath: 'assets/mipmap-xxhdpi/tab_discover_nor.webp' },
  { key: 'tab_discover_pre_webp', name: 'اكتشف - محدد', category: 'nav', subcategory: 'tabs', localPath: 'assets/mipmap-xxhdpi/tab_discover_pre.webp' },
  { key: 'tab_message_nor_webp', name: 'الرسائل - عادي', category: 'nav', subcategory: 'tabs', localPath: 'assets/mipmap-xxhdpi/tab_message_nor.webp' },
  { key: 'tab_message_pre_webp', name: 'الرسائل - محدد', category: 'nav', subcategory: 'tabs', localPath: 'assets/mipmap-xxhdpi/tab_message_pre.webp' },
  { key: 'tab_mine_nor_webp', name: 'حسابي - عادي', category: 'nav', subcategory: 'tabs', localPath: 'assets/mipmap-xxhdpi/tab_mine_nor.webp' },
  { key: 'tab_mine_pre_webp', name: 'حسابي - محدد', category: 'nav', subcategory: 'tabs', localPath: 'assets/mipmap-xxhdpi/tab_mine_pre.webp' },

  // ===== Common (عام) =====
  // Avatars
  { key: 'ava_boy_webp', name: 'صورة ولد', category: 'common', subcategory: 'avatars', localPath: 'assets/mipmap-xxhdpi/ava_boy.webp' },
  { key: 'ava_girl_webp', name: 'صورة بنت', category: 'common', subcategory: 'avatars', localPath: 'assets/mipmap-xxhdpi/ava_girl.webp' },
  // Gender
  { key: 'ic_sex_boy_webp', name: 'ذكر', category: 'common', subcategory: 'gender', localPath: 'assets/mipmap-xxhdpi/ic_sex_boy.webp' },
  { key: 'ic_sex_girl_webp', name: 'أنثى', category: 'common', subcategory: 'gender', localPath: 'assets/mipmap-xxhdpi/ic_sex_girl.webp' },
  { key: 'sex_male_ic_webp', name: 'ذكر (2)', category: 'common', subcategory: 'gender', localPath: 'assets/mipmap-xxhdpi/sex_male_ic.webp' },
  { key: 'sex_female_ic_webp', name: 'أنثى (2)', category: 'common', subcategory: 'gender', localPath: 'assets/mipmap-xxhdpi/sex_female_ic.webp' },
  // Arrows
  { key: 'back_ic_webp', name: 'رجوع', category: 'common', subcategory: 'arrows', localPath: 'assets/mipmap-xxhdpi/back_ic.webp' },
  { key: 'back_white_webp', name: 'رجوع أبيض', category: 'common', subcategory: 'arrows', localPath: 'assets/mipmap-xxhdpi/back_white.webp' },
  { key: 'back_white_2_webp', name: 'رجوع أبيض 2', category: 'common', subcategory: 'arrows', localPath: 'assets/mipmap-xxhdpi/back_white_2.webp' },
  { key: 'next_black_ic_webp', name: 'سهم أسود', category: 'common', subcategory: 'arrows', localPath: 'assets/mipmap-xxhdpi/next_black_ic.webp' },
  { key: 'common_next_4_ic_webp', name: 'سهم 4', category: 'common', subcategory: 'arrows', localPath: 'assets/mipmap-xxhdpi/common_next_4_ic.webp' },
  { key: 'common_back_2_webp', name: 'رجوع 2', category: 'common', subcategory: 'arrows', localPath: 'assets/mipmap-xxhdpi/common_back_2.webp' },
  // Icons
  { key: 'common_close_ic_webp', name: 'إغلاق', category: 'common', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/common_close_ic.webp' },
  { key: 'common_empty_ic_1_webp', name: 'فارغ', category: 'common', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/common_empty_ic_1.webp' },
  { key: 'mine_photo_add_ic_webp', name: 'إضافة صورة', category: 'common', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/mine_photo_add_ic.webp' },
  { key: 'mine_camera_ic_webp', name: 'كاميرا', category: 'common', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/mine_camera_ic.webp' },
  { key: 'common_user_id_ic_webp', name: 'معرف المستخدم', category: 'common', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/common_user_id_ic.webp' },
  { key: 'common_id_copy_ic_webp', name: 'نسخ المعرف', category: 'common', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/common_id_copy_ic.webp' },
  // Ranks
  { key: 'rank_wealth_bg_webp', name: 'خلفية الترتيب', category: 'common', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/rank_wealth_bg.webp' },
  { key: 'rank_tab_item_bg_webp', name: 'خلفية تبويب الترتيب', category: 'common', subcategory: 'icons', localPath: 'assets/mipmap-xxhdpi/rank_tab_item_bg.webp' },

  // ===== SVGA =====
  { key: 'super_admin_frame_svga', name: 'إطار المشرف', category: 'svga', subcategory: 'frames', localPath: 'assets/svga/super_admin_frame.svga' },
  { key: 'super_admin_svga', name: 'مشرف', category: 'svga', subcategory: 'frames', localPath: 'assets/svga/super_admin.svga' },
  { key: 'gift_anim_svga', name: 'أنيميشن الهدية', category: 'svga', subcategory: 'animations', localPath: 'assets/svga/gift_anim.svga' },
  { key: 'gift_svga', name: 'هدية', category: 'svga', subcategory: 'animations', localPath: 'assets/svga/gift.svga' },
  { key: 'miao_svga', name: 'مياو', category: 'svga', subcategory: 'animations', localPath: 'assets/svga/miao.svga' },
  { key: 'room_fm_wave_male_svga', name: 'موجة FM ذكر', category: 'svga', subcategory: 'waves', localPath: 'assets/svga/room_fm_wave_male.svga' },
  { key: 'room_fm_wave_female_svga', name: 'موجة FM أنثى', category: 'svga', subcategory: 'waves', localPath: 'assets/svga/room_fm_wave_female.svga' },
  { key: 'room_speaking_wave_male_svga', name: 'موجة تكلم ذكر', category: 'svga', subcategory: 'waves', localPath: 'assets/room_speaking_wave_male.svga' },
  { key: 'room_speaking_wave_female_svga', name: 'موجة تكلم أنثى', category: 'svga', subcategory: 'waves', localPath: 'assets/room_speaking_wave_female.svga' },
];

const SUBCAT_LABELS: Record<string, string> = {
  'header': 'الرأس',
  'icons': 'أيقونات',
  'backgrounds': 'خلفيات',
  'items': 'عناصر',
  'coins': 'عملات',
  'badges': 'شارات',
  'vip': 'VIP',
  'menu': 'القائمة',
  'edit': 'تعديل',
  'settings': 'الإعدادات',
  'categories': 'التصنيفات',
  'room-cards': 'بطاقات الغرف',
  'mic': 'المايك',
  'gift-panel': 'لوحة الهدايا',
  'seats': 'المقاعد',
  'controls': 'التحكم',
  'user-info': 'معلومات المستخدم',
  'tabs': 'الألسنة',
  'avatars': 'الصور الشخصية',
  'gender': 'الجنس',
  'arrows': 'أسهم',
  'buttons': 'أزرار',
  'frames': 'إطارات',
  'animations': 'أنيميشن',
  'waves': 'موجات',
};

export default function AppAssetsPage() {
  const [config, setConfig] = useState<AppConfig>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState('store');
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    getAppConfig().then(data => { if (data) setConfig(data); setLoading(false); });
  }, []);

  const overrides = config.assetsOverrides || {};
  const sizeOverrides = config.assetSizes || {};

  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleUpload = async (assetKey: string, file: File) => {
    setUploading(assetKey);
    try {
      const url = await uploadAppAsset(file, assetKey, (pct) => {
        setUploadProgress(p => ({ ...p, [assetKey]: pct }));
      });
      const newOverrides = { ...overrides, [assetKey]: url };
      const newConfig = { ...config, assetsOverrides: newOverrides };
      setConfig(newConfig);
      await updateAppConfig(newConfig);
    } catch (err) {
      alert('فشل الرفع: ' + (err as Error).message);
    }
    setUploading(null);
  };

  const handleUrl = async (assetKey: string, url: string) => {
    const newOverrides = { ...overrides, [assetKey]: url };
    const newConfig = { ...config, assetsOverrides: newOverrides };
    setConfig(newConfig);
    try {
      await updateAppConfig(newConfig);
    } catch (err) {
      alert('فشل الحفظ: ' + (err as Error).message);
      setConfig(config);
    }
  };

  const handleClear = async (assetKey: string) => {
    const newOverrides = { ...overrides };
    delete newOverrides[assetKey];
    const newSizes = { ...sizeOverrides };
    delete newSizes[assetKey];
    const newConfig = { ...config, assetsOverrides: newOverrides, assetSizes: newSizes };
    setConfig(newConfig);
    try {
      await updateAppConfig(newConfig);
    } catch (err) {
      alert('فشل الحذف: ' + (err as Error).message);
      setConfig(config);
    }
  };

  const handleSizeChange = async (assetKey: string, dimension: 'width' | 'height', value: number) => {
    const current = sizeOverrides[assetKey] || {};
    const updated = { ...current };
    if (value > 0) {
      updated[dimension] = value;
    } else {
      delete updated[dimension];
    }
    const newSizes = { ...sizeOverrides, [assetKey]: updated };
    const newConfig = { ...config, assetSizes: newSizes };
    setConfig(newConfig);
    await updateAppConfig(newConfig);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    await updateAppConfig(config);
    setSaving(false);
  };

  if (loading) return <div className="text-slate-500 text-xs">Loading...</div>;

  const currentCat = ASSET_CATEGORIES.find(c => c.id === activeCategory);
  const filtered = ALL_ASSETS.filter(a => {
    const cat = activeCategory === 'all' || a.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch = !q || a.name.toLowerCase().includes(q) || a.key.toLowerCase().includes(q) || a.subcategory.toLowerCase().includes(q);
    return cat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-semibold">أصول التطبيق</h2>
          <p className="text-slate-500 text-xs mt-0.5">إدارة جميع الصور والخلفيات وملفات SVGA في التطبيق</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث..." className="w-48 bg-[#161618] border border-white/10 rounded-lg py-1.5 pl-8 pr-2 text-xs text-white" />
          </div>
          <button onClick={handleSaveAll} disabled={saving} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-xs text-white font-semibold rounded-lg flex items-center gap-1">
            <Save className="w-3.5 h-3.5" /> {saving ? 'حفظ...' : 'حفظ الكل'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setActiveCategory('all')} className={`px-3 py-1.5 text-[10px] font-semibold rounded-lg transition-colors ${activeCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-[#161618] text-slate-400 border border-white/10'}`}>
          الكل ({ALL_ASSETS.length})
        </button>
        {ASSET_CATEGORIES.map(cat => {
          const count = ALL_ASSETS.filter(a => a.category === cat.id).length;
          return (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-3 py-1.5 text-[10px] font-semibold rounded-lg transition-colors ${activeCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-[#161618] text-slate-400 border border-white/10'}`}>
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {activeCategory === 'all' && !search && ASSET_CATEGORIES.map(cat => {
        const items = ALL_ASSETS.filter(a => a.category === cat.id);
        if (items.length === 0) return null;
        return (
          <div key={cat.id}>
            <h3 className="text-white text-xs font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {cat.label}
              <span className="text-slate-600 font-normal">({items.length})</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
              {items.map(asset => renderAssetCard(asset, overrides, sizeOverrides, uploading, handleUpload, handleUrl, handleClear, handleSizeChange))}
            </div>
          </div>
        );
      })}

      {(activeCategory !== 'all' || search) && currentCat && (
        <div>
          {currentCat.subcategories.map(sub => {
            const items = filtered.filter(a => a.subcategory === sub);
            if (items.length === 0) return null;
            return (
              <div key={sub} className="mb-6">
                <h3 className="text-white text-xs font-semibold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {SUBCAT_LABELS[sub] || sub}
                  <span className="text-slate-600 font-normal">({items.length})</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {items.map(asset => renderAssetCard(asset, overrides, sizeOverrides, uploading, handleUpload, handleUrl, handleClear, handleSizeChange))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function renderAssetCard(
  asset: AppAsset,
  overrides: Record<string, string>,
  sizeOverrides: Record<string, AssetSizeOverride>,
  uploading: string | null,
  onUpload: (key: string, file: File) => Promise<void>,
  onUrl: (key: string, url: string) => Promise<void>,
  onClear: (key: string) => Promise<void>,
  onSizeChange: (key: string, dim: 'width' | 'height', value: number) => Promise<void>,
) {
  const overrideUrl = overrides[asset.key];
  const size = sizeOverrides[asset.key] || {};
  const isSvga = asset.localPath.endsWith('.svga') || (overrideUrl && overrideUrl.endsWith('.svga'));
  const isUploading = uploading === asset.key;
  const w = size.width ?? asset.defaultWidth;
  const h = size.height ?? asset.defaultHeight;

  return (
    <div key={asset.key} className="bg-[#141417] rounded-xl border border-white/5 p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        {isSvga ? <FileType className="w-3 h-3 text-indigo-400" /> : <Image className="w-3 h-3 text-emerald-400" />}
        <span className="text-[10px] text-slate-400 font-medium truncate flex-1" title={asset.key}>{asset.name}</span>
      </div>

      <div className="relative w-full aspect-square rounded-lg bg-black/30 border border-white/5 overflow-hidden flex items-center justify-center">
        {overrideUrl ? (
          overrideUrl.endsWith('.svga')
            ? <div className="text-[9px] text-indigo-400 text-center p-2">SVGA<br />Loaded</div>
            : <img src={overrideUrl} className="w-full h-full object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : (
          <div className="text-[9px] text-slate-600 text-center p-2">الملف المحلي<br /><span className="text-[7px] opacity-60">{asset.localPath.split('/').pop()}</span></div>
        )}
      </div>

      {/* Size controls */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-1">
          <span className="text-[8px] text-slate-500">عرض:</span>
          <input
            type="number"
            min={0}
            value={w ?? ''}
            onChange={e => onSizeChange(asset.key, 'width', parseInt(e.target.value) || 0)}
            className="w-full bg-[#161618] border border-white/10 rounded py-0.5 px-1 text-[8px] text-white font-mono"
            placeholder="تلقائي"
          />
        </div>
        <div className="flex-1 flex items-center gap-1">
          <span className="text-[8px] text-slate-500">ارتفاع:</span>
          <input
            type="number"
            min={0}
            value={h ?? ''}
            onChange={e => onSizeChange(asset.key, 'height', parseInt(e.target.value) || 0)}
            className="w-full bg-[#161618] border border-white/10 rounded py-0.5 px-1 text-[8px] text-white font-mono"
            placeholder="تلقائي"
          />
        </div>
      </div>

      <div className="space-y-1">
        {isUploading ? (
          <div className="text-[9px] text-indigo-400 text-center">جاري الرفع...</div>
        ) : overrideUrl ? (
          <div className="flex items-center gap-1">
            <input type="text" value={overrideUrl} onChange={e => onUrl(asset.key, e.target.value)} className="flex-1 bg-[#161618] border border-white/10 rounded py-0.5 px-1 text-[8px] text-white font-mono truncate" />
            <button onClick={() => onClear(asset.key)} className="shrink-0 p-0.5 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/40">
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center gap-1 py-1 rounded border border-dashed border-white/10 cursor-pointer hover:border-indigo-500/50 text-[9px] text-slate-500 hover:text-indigo-400 transition-all">
            <Upload className="w-2.5 h-2.5" />
            رفع صورة أو SVGA
            <input type="file" accept="image/*,.svga" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (f) { await onUpload(asset.key, f); e.target.value = ''; }}} />
          </label>
        )}
      </div>
    </div>
  );
}
