import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/user_model.dart';

class AuthService {
  final GoTrueClient _auth = Supabase.instance.client.auth;

  User? get currentUser => _auth.currentUser;

  Stream<AuthState> get authStateChanges => _auth.onAuthStateChange;

  Future<User?> signInWithGoogle() async {
    try {
      await _auth.signInWithOAuth(
        OAuthProvider.google,
        redirectTo: 'com.zero.app://login-callback',
      );
      final session = _auth.currentSession;
      return session?.user;
    } catch (e) {
      return null;
    }
  }

  UserModel? getUserModelFromFirebase(User? supabaseUser) {
    if (supabaseUser == null) return null;
    return UserModel(
      uid: supabaseUser.id,
      name: supabaseUser.userMetadata?['full_name']?.toString() ?? '',
      email: supabaseUser.email ?? '',
      photoUrl: supabaseUser.userMetadata?['avatar_url']?.toString() ?? '',
    );
  }

  Future<void> signOut() async {
    await _auth.signOut();
  }
}
