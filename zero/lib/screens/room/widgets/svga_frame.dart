import 'package:flutter/material.dart';
import 'svga_player.dart';

// ═══════════════════════════════════════════════════════════
// SvgaFrame — يُشغّل ملف SVGA حقيقي
// يستخدم في:
//   - المقاعد (على صورة المستخدم)
//   - بروفايل المستخدم
//   - قائمة المتصلين
// ═══════════════════════════════════════════════════════════

class SvgaFrame extends StatelessWidget {
  final String svgaPath;
  final double size;
  final bool visible;

  const SvgaFrame({
    super.key,
    required this.svgaPath,
    required this.size,
    this.visible = true,
  });

  @override
  Widget build(BuildContext context) {
    if (!visible) return const SizedBox.shrink();
    return SizedBox(
      width: size,
      height: size,
      child: SvgaPlayer(
        assetPath: svgaPath,
        width: size,
        height: size,
        loops: true,
      ),
    );
  }
}
