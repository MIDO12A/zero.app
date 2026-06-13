import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class ErrorReportingService {
  static final ErrorReportingService _instance = ErrorReportingService._();
  factory ErrorReportingService() => _instance;
  ErrorReportingService._();

  final SupabaseClient _client = Supabase.instance.client;

  void init() {
    // 1. Intercept Flutter UI layout / rendering errors
    FlutterError.onError = (FlutterErrorDetails details) {
      FlutterError.presentError(details);
      _reportError(
        error: details.exceptionAsString(),
        stackTrace: details.stack?.toString() ?? '',
        type: 'UI / Layout',
      );
    };

    // 2. Intercept asynchronous / Dart thread exceptions
    PlatformDispatcher.instance.onError = (Object error, StackTrace stack) {
      _reportError(
        error: error.toString(),
        stackTrace: stack.toString(),
        type: 'Code / Logic',
      );
      return true; // Mark as handled
    };
  }

  Future<void> _reportError({
    required String error,
    required String stackTrace,
    required String type,
  }) async {
    try {
      final String os = kIsWeb ? 'Web' : Platform.operatingSystem;
      final String version = kIsWeb ? 'Browser' : Platform.operatingSystemVersion;

      await _client.from('bug_reports').insert({
        'error': error,
        'stack_trace': stackTrace.substring(0, stackTrace.length > 1500 ? 1500 : stackTrace.length),
        'device_info': '$os ($version)',
        'type': type,
      });
    } catch (e) {
      // Prevent infinite loop if logging itself fails
      debugPrint('Failed to log error to Supabase: $e');
    }
  }
}
