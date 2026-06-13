import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter_svga/flutter_svga.dart';
import 'package:dio/dio.dart';

class SvgaPlayer extends StatefulWidget {
  final String assetPath;
  final double? width;
  final double? height;
  final bool loops;
  final VoidCallback? onFinished;
  final BoxFit fit;
  final Map<String, String>? textReplacement; // SVGA layer key -> user text
  final Map<String, String>? imageReplacement; // SVGA layer key -> image URL
  final String? defaultImageUrl; // fallback image if user has no photo

  const SvgaPlayer({
    super.key,
    required this.assetPath,
    this.width,
    this.height,
    this.loops = true,
    this.onFinished,
    this.fit = BoxFit.contain,
    this.textReplacement,
    this.imageReplacement,
    this.defaultImageUrl,
  });

  @override
  State<SvgaPlayer> createState() => _SvgaPlayerState();
}

class _SvgaPlayerState extends State<SvgaPlayer> with SingleTickerProviderStateMixin {
  SVGAAnimationController? animationController;
  bool isLoading = true;
  bool hasError = false;

  @override
  void initState() {
    super.initState();
    animationController = SVGAAnimationController(vsync: this);
    _loadAnimation();
  }

  @override
  void didUpdateWidget(SvgaPlayer old) {
    super.didUpdateWidget(old);
    if (old.assetPath != widget.assetPath ||
        old.textReplacement != widget.textReplacement ||
        old.imageReplacement != widget.imageReplacement) {
      setState(() { isLoading = true; hasError = false; });
      _loadAnimation();
    }
  }

  @override
  void dispose() {
    animationController?.dispose();
    animationController = null;
    super.dispose();
  }

  Future<void> _loadAnimation() async {
    try {
      final isNetwork = widget.assetPath.startsWith('http://') || widget.assetPath.startsWith('https://');
      final videoItem = isNetwork
          ? await _loadFromUrl(widget.assetPath)
          : await SVGAParser.shared.decodeFromAssets(widget.assetPath);
      await _injectDynamicContent(videoItem);
      if (mounted) {
        setState(() {
          isLoading = false;
          animationController?.videoItem = videoItem;
          if (widget.loops) {
            animationController?.repeat();
          } else {
            animationController?.forward().then((_) {
              widget.onFinished?.call();
            });
          }
        });
      }
    } catch (e) {
      debugPrint('SVGA error: $e');
      if (mounted) {
        setState(() {
          isLoading = false;
          hasError = true;
        });
        Future.delayed(const Duration(seconds: 1), () {
          widget.onFinished?.call();
        });
      }
    }
  }

  Future<void> _injectDynamicContent(MovieEntity videoItem) async {
    if (widget.textReplacement == null && widget.imageReplacement == null) return;
    try {
      final dynamicItem = videoItem.dynamicItem;
      if (widget.textReplacement != null) {
        for (final entry in widget.textReplacement!.entries) {
          if (entry.key.isEmpty || entry.value.isEmpty) continue;
          debugPrint('SVGA setText: key="${entry.key}" value="${entry.value}"');
          final painter = TextPainter(
            text: TextSpan(
              text: entry.value,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            textDirection: TextDirection.ltr,
          )..layout();
          dynamicItem.setText(painter, entry.key);
        }
      }
      if (widget.imageReplacement != null) {
        for (final entry in widget.imageReplacement!.entries) {
          if (entry.key.isEmpty || entry.value.isEmpty) continue;
          debugPrint('SVGA setImage: key="${entry.key}" url="${entry.value}"');
          try {
            await dynamicItem.setImageWithUrl(entry.value, entry.key);
            debugPrint('SVGA setImage SUCCESS: key="${entry.key}"');
          } catch (e) {
            debugPrint('SVGA setImage ERROR: $e');
            if (widget.defaultImageUrl != null && widget.defaultImageUrl!.isNotEmpty) {
              debugPrint('SVGA trying defaultImage: ${widget.defaultImageUrl}');
              try {
                await dynamicItem.setImageWithUrl(widget.defaultImageUrl!, entry.key);
                debugPrint('SVGA defaultImage SUCCESS');
              } catch (e2) {
                debugPrint('SVGA defaultImage ERROR: $e2');
              }
            }
          }
        }
      }
    } catch (e) {
      debugPrint('SVGA dynamic injection error (non-fatal): $e');
    }
  }

  Future<MovieEntity> _loadFromUrl(String url) async {
    final dio = Dio(BaseOptions(
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 15),
      responseType: ResponseType.bytes,
    ));
    final response = await dio.get<Uint8List>(url);
    if (response.statusCode != 200 || response.data == null) {
      throw Exception('HTTP ${response.statusCode}');
    }
    debugPrint('SVGA downloaded: ${response.data!.length} bytes');
    return SVGAParser.shared.decodeFromBuffer(response.data!);
  }

  @override
  Widget build(BuildContext context) {
    final w = widget.width ?? 200;
    final h = widget.height ?? 200;
    return SizedBox(
      width: w,
      height: h,
      child: isLoading
          ? const Center(child: CircularProgressIndicator(strokeWidth: 2))
          : hasError
              ? const SizedBox.shrink()
              : animationController?.videoItem != null
                  ? SVGAImage(
                      animationController!,
                      fit: widget.fit,
                      preferredSize: Size(w, h),
                    )
                  : const SizedBox.shrink(),
    );
  }
}
