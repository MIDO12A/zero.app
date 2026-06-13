import 'dart:developer' as developer;
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:provider/provider.dart';
import '../../services/supabase_service.dart';
import '../../providers/user_provider.dart';
import '../../config/r.dart';
import '../main_screen/main_screen.dart';
import 'setup_profile_screen.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  Future<void> _handleSignIn(BuildContext context, User user) async {
    try {
      final existingUser = await SupabaseService().getUser(user.id);

      if (context.mounted) {
        if (existingUser == null) {
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(
              builder: (_) => SetupProfileScreen(
                uid: user.id,
                email: user.email ?? '',
                photoUrl: user.userMetadata?['avatar_url']?.toString() ?? '',
              ),
            ),
            (route) => false,
          );
        } else {
          await Provider.of<UserProvider>(context, listen: false)
              .loadUser(user.id);
          if (context.mounted) {
            Navigator.pushAndRemoveUntil(
              context,
              MaterialPageRoute(builder: (_) => const MainScreen()),
              (route) => false,
            );
          }
        }
      }
    } catch (e) {
      debugPrint('Error signing in: $e');
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error signing in: $e')),
        );
      }
    }
  }

  Future<void> _signInAnonymously(BuildContext context) async {
    try {
      final res = await Supabase.instance.client.auth.signInAnonymously();
      final user = res.user;
      if (user == null) return;
      await _handleSignIn(context, user);
    } catch (e) {
      debugPrint('Error signing in anonymously: $e');
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error signing in: $e')),
        );
      }
    }
  }

  Future<void> _signInWithGoogle(BuildContext context) async {
    developer.log('_signInWithGoogle: starting OAuth flow');
    try {
      final result = await Supabase.instance.client.auth.signInWithOAuth(
        OAuthProvider.google,
        redirectTo: 'com.zero.app://login-callback',
      );
      developer.log('_signInWithGoogle: signInWithOAuth completed, result=$result');
    } catch (e) {
      developer.log('_signInWithGoogle: error = $e');
      debugPrint('Error signing in with Google: $e');
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error signing in: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          // Background
          R.image(
            'assets/mipmap-xxhdpi/bg_login.webp',
            fit: BoxFit.cover,
          ),
          // Content
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  // Welcome Logo
                  Padding(
                    padding: const EdgeInsets.only(bottom: 65),
                    child: R.loadImage(
                      'assets/mipmap-xxhdpi/login_welcome_ic.webp',
                      fit: BoxFit.contain,
                    ),
                  ),
                  // Google Login Button
                  GestureDetector(
                    onTap: () => _signInWithGoogle(context),
                    child: Container(
                      height: 50,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: const Color(0xFFFFCC80),
                        borderRadius: BorderRadius.circular(25),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          R.image(
                            'assets/mipmap-xxhdpi/login_google_ic.webp',
                            width: 24,
                            height: 24,
                          ),
                          const SizedBox(width: 8),
                          const Text(
                            'تسجيل الدخول',
                            style: TextStyle(
                              fontSize: 15,
                              color: Color(0xFF894916),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Facebook and Phone login buttons (optional)
                  Row(
                    children: [
                      Expanded(
                        child: GestureDetector(
                          onTap: () => _signInAnonymously(context),
                          child: Container(
                            height: 50,
                            margin: const EdgeInsets.only(right: 8),
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(
                                colors: [
                                  Color(0xFF3B5998),
                                  Color(0xFF192F6A),
                                ],
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                              ),
                              borderRadius: BorderRadius.circular(25),
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                R.image(
                                  'assets/mipmap-xxhdpi/login_fb_ic.webp',
                                  width: 24,
                                  height: 24,
                                ),
                                const SizedBox(width: 8),
                                const Text(
                                  'Facebook',
                                  style: TextStyle(
                                    fontSize: 15,
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: GestureDetector(
                          onTap: () => _signInAnonymously(context),
                          child: Container(
                            height: 50,
                            margin: const EdgeInsets.only(left: 8),
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(
                                colors: [
                                  Color(0xFFFF5722),
                                  Color(0xFFFF9800),
                                ],
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                              ),
                              borderRadius: BorderRadius.circular(25),
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                R.image(
                                  'assets/mipmap-xxhdpi/login_phone_ic.webp',
                                  width: 24,
                                  height: 24,
                                ),
                                const SizedBox(width: 8),
                                const Text(
                                  'الهاتف',
                                  style: TextStyle(
                                    fontSize: 15,
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 34),
                  // Privacy text
                  const Text(
                    'بالاستمرار، أنت توافق على سياسة الخصوصية وشروط الخدمة',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 10,
                      color: Color(0x80FFFFFF),
                    ),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
