import 'package:agora_rtc_engine/agora_rtc_engine.dart';
import 'package:permission_handler/permission_handler.dart';
import '../config/app_config.dart';

class RoomAudioService {
  static final RoomAudioService _instance = RoomAudioService._();
  factory RoomAudioService() => _instance;
  RoomAudioService._();

  RtcEngine? _engine;
  bool _initialized = false;

  bool get isInitialized => _initialized;

  Future<bool> initialize() async {
    if (_initialized) return true;
    try {
      final status = await Permission.microphone.request();
      if (!status.isGranted) return false;
      _engine = createAgoraRtcEngine();
      await _engine?.initialize(RtcEngineContext(
        appId: AppConfig.agoraAppId,
      ));
      _initialized = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<void> joinChannel(String channelName, String uid) async {
    if (!_initialized) return;
    await _engine?.enableAudio();
    await _engine?.setClientRole(role: ClientRoleType.clientRoleBroadcaster);
    await _engine?.joinChannel(
      token: '',
      channelId: channelName,
      uid: 0,
      options: ChannelMediaOptions(
        channelProfile: ChannelProfileType.channelProfileLiveBroadcasting,
        clientRoleType: ClientRoleType.clientRoleBroadcaster,
      ),
    );
  }

  Future<void> leaveChannel() async {
    await _engine?.leaveChannel();
  }

  Future<void> toggleMic(bool on) async {
    await _engine?.enableLocalAudio(on);
  }

  Future<void> dispose() async {
    await _engine?.leaveChannel();
    await _engine?.release();
    _engine = null;
    _initialized = false;
  }
}
