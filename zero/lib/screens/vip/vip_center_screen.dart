import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../../providers/user_provider.dart';

class VipCenterScreen extends StatefulWidget {
  const VipCenterScreen({super.key});

  @override
  State<VipCenterScreen> createState() => _VipCenterScreenState();
}

class _VipCenterScreenState extends State<VipCenterScreen> {
  final _supabase = Supabase.instance.client;
  late final WebViewController _controller;
  bool _loading = true;
  bool _ready = false;
  bool _error = false;
  String _errorMsg = '';
  static const _fallbackUrl = 'https://zero-vip-store.netlify.app/#/VIP_2025';

  @override
  void initState() {
    super.initState();
    _loadVipUrl();
  }

  Future<void> _loadVipUrl() async {
    final userProvider = context.read<UserProvider>();
    final uid = userProvider.currentUser?.uid ?? '';

    String baseUrl = _fallbackUrl;
    try {
      final res = await _supabase
          .from('app_config')
          .select('value')
          .eq('key', 'vip_url')
          .maybeSingle();
      final val = res?['value'];
      if (val is String && val.isNotEmpty) {
        baseUrl = val;
      }
    } catch (e) {
      debugPrint('VIP config error: $e');
    }

    final uri = Uri.parse(baseUrl);
    final queryParams = Map<String, String>.from(uri.queryParameters);
    if (uid.isNotEmpty) queryParams['uid'] = uid;
    final finalUrl = uri.replace(queryParameters: queryParams).toString();

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) {
            if (mounted) setState(() {
              _loading = true;
              _error = false;
            });
          },
          onPageFinished: (_) {
            if (mounted) setState(() => _loading = false);
          },
          onWebResourceError: (err) {
            debugPrint('VIP WebView error: ${err.errorCode} ${err.description}');
            if (mounted) setState(() {
              _error = true;
              _errorMsg = '${err.errorCode}: ${err.description}';
            });
          },
          onNavigationRequest: (req) {
            debugPrint('VIP nav: ${req.url}');
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(finalUrl));

    if (mounted) setState(() { _ready = true; });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        elevation: 0,
        title: Text(
          'VIP',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: const Color(0xFFDE880F),
          ),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: Colors.white38),
            onPressed: () {
              setState(() {
                _loading = true;
                _error = false;
              });
              _controller.reload();
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          if (_ready)
            WebViewWidget(controller: _controller),
          if (_loading)
            const Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  CircularProgressIndicator(color: Color(0xFFDE880F)),
                  SizedBox(height: 12),
                  Text(
                    'Loading VIP...',
                    style: TextStyle(color: Colors.white38, fontSize: 12),
                  ),
                ],
              ),
            ),
          if (_error)
            Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.cloud_off, color: Colors.white24, size: 48),
                    const SizedBox(height: 12),
                    const Text(
                      'Failed to load VIP',
                      style: TextStyle(color: Colors.white38, fontSize: 14),
                    ),
                    if (_errorMsg.isNotEmpty) ...[
                      const SizedBox(height: 8),
                      Text(
                        _errorMsg,
                        style: TextStyle(color: Colors.white24, fontSize: 10),
                        textAlign: TextAlign.center,
                      ),
                    ],
                    const SizedBox(height: 16),
                    TextButton.icon(
                      onPressed: () {
                        setState(() {
                          _error = false;
                          _loading = true;
                          _errorMsg = '';
                        });
                        _controller.reload();
                      },
                      icon: const Icon(Icons.refresh, color: Color(0xFFDE880F)),
                      label: const Text('Retry', style: TextStyle(color: Color(0xFFDE880F))),
                    ),
                    const SizedBox(height: 8),
                    TextButton.icon(
                      onPressed: () => _controller.loadRequest(Uri.parse(_fallbackUrl)),
                      icon: const Icon(Icons.open_in_browser, color: Colors.blue, size: 16),
                      label: const Text('Reset & Retry', style: TextStyle(color: Colors.blue, fontSize: 12)),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
