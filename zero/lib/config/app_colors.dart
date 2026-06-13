import 'package:flutter/material.dart';
import '../services/dynamic_config_service.dart';

class AppColors {
  // Dynamically resolved colors
  static Color get primaryBg => DynamicConfigService().primaryBg;
  static Color get textPrimary => DynamicConfigService().textPrimary;
  static Color get textSecondary => DynamicConfigService().textSecondary;
  static Color get gold => DynamicConfigService().goldColor;
  static Color get buttonColor => DynamicConfigService().buttonColor;
  static Color get buttonTextColor => DynamicConfigService().buttonTextColor;
  static Color get headerColor => DynamicConfigService().headerColor;
  static Color get tabBarColor => DynamicConfigService().tabBarColor;
  static Color get colorPrimary => DynamicConfigService().buttonColor;
  static int get borderRadius => DynamicConfigService().borderRadius;
  static String get fontFamily => DynamicConfigService().fontFamily;

  // Static constant colors
  static const Color roomBg = Color(0xFF0F0909);    // #ff0f0909
  static const Color overlay = Color(0x33000000);   // #33000000
  static const Color cardBg = Color(0x1AFFFFFF);    // #1affffff
  static const Color cardBg2 = Color(0x0FFFFFFF);   // #0fffffff
  static const Color goldLight = Color(0xFFFFC525); // #ffc525
  static const Color goldBg = Color(0xFFFFF4E5);    // #fffff4e5
  static const Color accentRed = Color(0xFFA40E2C); // #ffa40e2c
  static const Color accentGold = Color(0xFFFFD654); // #ffffd654
  static const Color divider = Color(0x1AFFFFFF);
  static const Color muteRed = Color(0xFFE82323);   // #e82323
  static const Color charmBg = Color(0x33000000);   // mic_charm bg
  static const Color textTertiary = Color(0x99FFFFFF); // white60

  // Theme gradients (shape_room_theme_*)
  static const LinearGradient themeFriend = LinearGradient(
    colors: [Color(0xFFE447E7), Color(0xFFA136FF)],
  );
  static const LinearGradient themeChat = LinearGradient(
    colors: [Color(0xFF24D5C3), Color(0xFF03DF99)],
  );
  static const LinearGradient themeMusic = LinearGradient(
    colors: [Color(0xFF3697FF), Color(0xFFB534FF)],
  );
  static const LinearGradient themeGame = LinearGradient(
    colors: [Color(0xFFDB9C16), Color(0xFFF0C724)],
  );
  static const LinearGradient themeParty = LinearGradient(
    colors: [Color(0xFF3590FF), Color(0xFF294BF7)],
  );
  static const LinearGradient themeHobby = LinearGradient(
    colors: [Color(0xFF26C889), Color(0xFF86BC1B)],
  );

  // background 12dp radius shape
  static BoxDecoration roomBg12({double radius = 12, Color? color}) {
    return BoxDecoration(
      color: color ?? cardBg,
      borderRadius: BorderRadius.circular(radius),
    );
  }

  // Gift send button gradient
  static LinearGradient get giftBtnGradient => LinearGradient(
    colors: [DynamicConfigService().goldColor, const Color(0xFFFFC525)],
  );

  // Room change seat bg
  static BoxDecoration seatBg({bool selected = false}) {
    if (selected) {
      return BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        gradient: LinearGradient(
          colors: [gold, const Color(0xFFFFC525)],
        ),
      );
    }
    return BoxDecoration(
      color: primaryBg,
      borderRadius: BorderRadius.circular(12),
    );
  }

  // Chat input bg
  static BoxDecoration inputBg({double radius = 8}) {
    return BoxDecoration(
      color: primaryBg,
      borderRadius: BorderRadius.circular(radius),
    );
  }

  // Room header type badge
  static BoxDecoration headerBadge = BoxDecoration(
    gradient: const LinearGradient(
      colors: [Color(0xFF835FF3), Color(0xFF4F22DB)],
    ),
    borderRadius: BorderRadius.circular(20),
  );
}
