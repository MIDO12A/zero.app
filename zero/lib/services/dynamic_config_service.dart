import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:restart_app/restart_app.dart' show Restart;

class DynamicConfigService extends ChangeNotifier {
  static final DynamicConfigService _instance = DynamicConfigService._();
  factory DynamicConfigService() => _instance;
  DynamicConfigService._();

  final SupabaseClient _client = Supabase.instance.client;
  
  // App Configurations
  String _appName = 'Zero';
  String _logoUrl = '';
  String _splashUrl = '';
  
  // Theme colors
  Color _primaryBg = const Color(0xFFFFFFFF);
  Color _textPrimary = const Color(0xFF16151A);
  Color _textSecondary = const Color(0xFF9BA1B6);
  Color _goldColor = const Color(0xFFDE880F);
  Color _buttonColor = const Color(0xFF6366F1);
  Color _buttonTextColor = const Color(0xFFFFFFFF);
  Color _headerColor = const Color(0xFFFFFFFF);
  Color _tabBarColor = const Color(0xFFFFFFFF);
  
  // Typography & Shape
  String _fontFamily = 'system';
  int _borderRadius = 8;
  
  // Tab/Page names
  String _discoverTitle = 'استكشاف';
  String _messageTitle = 'الرسائل';
  String _profileTitle = 'حسابي';
  Map<String, String> _screenTitles = {};
  
  // Audio configurations
  String _audioCompany = 'agora'; // Updated to use Agora
  final int _zegoAppId = 1614503125;
  final String _agoraAppId = 'eb1f5fe3800f430582a3e07140c27143';
  final String _agoraToken = '';
  
  // Easemob (Chat) configurations
  final String _easemobAppKey = '61200033730#200046947';
  final String _easemobOrgName = '61200033730';
  final String _easemobAppName = '200046947';
  final String _easemobWsUrl = 'msync-api-61.chat.agora.io';
  final String _easemobRestUrl = 'a61.chat.agora.io';
  final String _easemobPrimaryCert = '164d7c36fcd2494ca22a64539be1afb8';
  final String _easemobSecondaryCert = 'd40ad1b7130241c9968b17e776cd4642';

  // Assets override map
  Map<String, String> _assetsOverride = {};
  
  // Assets size overrides: { "assets_mipmap-xxhdpi_xxx_webp": {"width": 100, "height": 200} }
  Map<String, Map<String, dynamic>> _assetSizes = {};

  // Raw config map for dynamic access
  final Map<String, dynamic> _rawConfig = {};

  // Last System message
  Map<String, dynamic> _lastSystemMessage = {};

  // Level config
  int _coinsPerRechargeXp = 10;

  // Getters
  String get appName => _appName;
  String get logoUrl => _logoUrl;
  String get splashUrl => _splashUrl;
  Color get primaryBg => _primaryBg;
  Color get textPrimary => _textPrimary;
  Color get textSecondary => _textSecondary;
  Color get goldColor => _goldColor;
  Color get buttonColor => _buttonColor;
  Color get buttonTextColor => _buttonTextColor;
  Color get headerColor => _headerColor;
  Color get tabBarColor => _tabBarColor;
  String get fontFamily => _fontFamily;
  int get borderRadius => _borderRadius;
  String get discoverTitle => _discoverTitle;
  String get messageTitle => _messageTitle;
  String get profileTitle => _profileTitle;
  Map<String, String> get screenTitles => _screenTitles;
  String getScreenTitle(String key, String fallback) => _screenTitles[key] ?? fallback;
  String get audioCompany => _audioCompany;
  int get zegoAppId => _zegoAppId;
  String get agoraAppId => _agoraAppId;
  String get agoraToken => _agoraToken;
  String get easemobAppKey => _easemobAppKey;
  String get easemobOrgName => _easemobOrgName;
  String get easemobAppName => _easemobAppName;
  String get easemobWsUrl => _easemobWsUrl;
  String get easemobRestUrl => _easemobRestUrl;
  String get easemobPrimaryCert => _easemobPrimaryCert;
  String get easemobSecondaryCert => _easemobSecondaryCert;
  Map<String, String> get assetsOverride => _assetsOverride;
  Map<String, Map<String, dynamic>> get assetSizes => _assetSizes;
  Map<String, dynamic> get lastSystemMessage => _lastSystemMessage;
  int get coinsPerRechargeXp => _coinsPerRechargeXp;

  StreamSubscription<List<Map<String, dynamic>>>? _configSub;
  Completer<void>? _initCompleter;

  // Initialize and listen to app_config
  Future<void> init() async {
    _initCompleter = Completer<void>();
    // Cancel any existing subscription (safety for hot restart)
    _configSub?.cancel();
    // Listen to app_config from Supabase
    _configSub = _client.from('app_config').stream(primaryKey: ['id']).listen((list) {
      // Merge all key-value rows into a single config map
      final config = <String, dynamic>{};
      for (final row in list) {
        final k = row['key'] as String?;
        final v = row['value'];
        if (k != null) {
          // Try parsing JSON string values (for objects/arrays stored from dashboard)
          if (v is String) {
            final parsed = _tryParseJson(v);
            config[k] = parsed ?? v;
          } else {
            config[k] = v;
          }
        }
      }

      // Store raw config for dynamic access
      _rawConfig.clear();
      _rawConfig.addAll(config);

      // App name
      _appName = config['appName'] as String? ?? _appName;

      // Logo & Splash
      _logoUrl = config['logoUrl'] as String? ?? _logoUrl;
      _splashUrl = config['splashGifUrl'] as String? ?? _splashUrl;

      // Theme colors
      _primaryBg = _parseColor(config['primaryBg'], _primaryBg);
      _textPrimary = _parseColor(config['textPrimary'], _textPrimary);
      _textSecondary = _parseColor(config['textSecondary'], _textSecondary);
      _goldColor = _parseColor(config['goldColor'], _goldColor);
      _buttonColor = _parseColor(config['buttonColor'], _buttonColor);
      _buttonTextColor = _parseColor(config['buttonTextColor'], _buttonTextColor);
      _headerColor = _parseColor(config['headerColor'], _headerColor);
      _tabBarColor = _parseColor(config['tabBarColor'], _tabBarColor);

      // Typography & shape
      _fontFamily = config['fontFamily'] as String? ?? _fontFamily;
      _borderRadius = (config['borderRadius'] as num?)?.toInt() ?? _borderRadius;

      // Tab / page titles
      _discoverTitle = config['discoverTitle'] as String? ?? _discoverTitle;
      _messageTitle = config['messageTitle'] as String? ?? _messageTitle;
      _profileTitle = config['profileTitle'] as String? ?? _profileTitle;
      final titles = config['screenTitles'];
      if (titles is Map) {
        _screenTitles = titles.map((k, v) => MapEntry(k.toString(), v.toString()));
      }

      // Audio
      _audioCompany = config['audioProvider'] as String? ?? _audioCompany;

      // Assets overrides: { "assets_mipmap-xxhdpi_xxx_webp": "https://cloudinary.url/xxx.webp" }
      final overrides = config['assetsOverrides'];
      if (overrides is Map) {
        _assetsOverride = overrides.map((k, v) => MapEntry(k.toString(), v.toString()));
      }

      // Asset size overrides: { "assets_mipmap-xxhdpi_xxx_webp": {"width": 100, "height": 200} }
      final sizes = config['assetSizes'];
      if (sizes is Map) {
        _assetSizes = sizes.map((k, v) {
          final entry = v is Map ? Map<String, dynamic>.from(v) : <String, dynamic>{};
          return MapEntry(k.toString(), entry);
        });
      }

      // System message
      final msg = config['lastSystemMessage'];
      if (msg is Map) {
        _lastSystemMessage = msg.cast<String, dynamic>();
      }

      // Level config
      _coinsPerRechargeXp = (config['coinsPerRechargeXp'] as num?)?.toInt() ?? _coinsPerRechargeXp;

      // Restart app if flag is set
      final restartFlag = config['restartApp'];
      if (restartFlag == true || restartFlag == 'true') {
        debugPrint('DynamicConfigService: restartApp flag detected, restarting...');
        // Reset the flag back to false first to avoid restart loop
        _client.from('app_config').update({'value': 'false'}).eq('key', 'restartApp');
        Restart.restartApp();
      }

      if (_initCompleter != null && !_initCompleter!.isCompleted) {
        _initCompleter!.complete();
      }
      notifyListeners();
    }, onError: (error) {
      debugPrint('DynamicConfigService: error loading config: $error');
      if (_initCompleter != null && !_initCompleter!.isCompleted) {
        _initCompleter!.complete();
      }
    });
    // Wait for first data or timeout after 10s
    await _initCompleter!.future.timeout(const Duration(seconds: 10));
  }

  // Parse color from string (e.g. #FFFFFF or 0xFFFFFFFF or color name)
  Color _parseColor(dynamic val, Color fallback) {
    if (val == null) return fallback;
    String str = val.toString().trim().replaceAll('#', '');
    if (str.startsWith('0x')) {
      str = str.substring(2);
    }
    if (str.length == 6) {
      str = 'FF$str'; // Add alpha
    }
    final intValue = int.tryParse(str, radix: 16);
    if (intValue != null) {
      return Color(intValue);
    }
    return fallback;
  }

  // Try parsing a string as JSON, return parsed value or null
  dynamic _tryParseJson(String source) {
    try {
      final decoded = jsonDecode(source);
      if (decoded is Map || decoded is List) return decoded;
    } catch (_) {}
    return null;
  }

  // Dynamic config accessors (for profile etc.)
  dynamic getConfig(String key) => _rawConfig[key];

  Color? getColorConfig(String key) {
    final val = _rawConfig[key];
    if (val == null) return null;
    return _parseColor(val, Colors.transparent);
  }

  // Helper to resolve network asset override
  // Tries both full-path key (assets_mipmap-xxhdpi_file_webp) and short key (file_webp)
  String? getAssetOverride(String assetPath) {
    final fullKey = assetPath.replaceAll('/', '_').replaceAll('.', '_');
    final shortKey = assetPath.split('/').last.replaceAll('.', '_');
    return _assetsOverride[fullKey] ?? _assetsOverride[shortKey];
  }

  // Helper to get asset size override, returns Size if both width and height are set
  Size? getAssetSize(String assetPath) {
    final fullKey = assetPath.replaceAll('/', '_').replaceAll('.', '_');
    final shortKey = assetPath.split('/').last.replaceAll('.', '_');
    final entry = _assetSizes[fullKey] ?? _assetSizes[shortKey];
    if (entry == null) return null;
    final w = entry['width'];
    final h = entry['height'];
    if (w is num && h is num) {
      return Size(w.toDouble(), h.toDouble());
    }
    return null;
  }
}
