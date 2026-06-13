import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

class AppImage extends StatelessWidget {
  final String? asset;
  final String? url;
  final double width;
  final double height;
  final BoxFit fit;
  final Color? color;
  final double? borderRadius;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry? margin;
  final EdgeInsetsGeometry? padding;

  const AppImage.asset(
    this.asset, {
    super.key,
    this.url,
    this.width = 24,
    this.height = 24,
    this.fit = BoxFit.contain,
    this.color,
    this.borderRadius,
    this.onTap,
    this.margin,
    this.padding,
  });

  const AppImage.network(
    this.url, {
    super.key,
    this.asset,
    this.width = 24,
    this.height = 24,
    this.fit = BoxFit.cover,
    this.color,
    this.borderRadius,
    this.onTap,
    this.margin,
    this.padding,
  });

  @override
  Widget build(BuildContext context) {
    Widget image;
    if (url != null && url!.isNotEmpty) {
      image = CachedNetworkImage(
        imageUrl: url!,
        width: width,
        height: height,
        fit: fit,
        color: color,
        placeholder: (_, __) => _placeholder(),
        errorWidget: (_, __, ___) => _placeholder(),
      );
    } else if (asset != null) {
      image = Image.asset(
        asset!,
        width: width,
        height: height,
        fit: fit,
        color: color,
        errorBuilder: (_, __, ___) => _placeholder(),
      );
    } else {
      image = _placeholder();
    }

    if (borderRadius != null) {
      image = ClipRRect(
        borderRadius: BorderRadius.circular(borderRadius!),
        child: image,
      );
    }

    if (onTap != null || margin != null || padding != null) {
      return GestureDetector(
        onTap: onTap,
        child: Container(
          margin: margin,
          padding: padding,
          child: image,
        ),
      );
    }

    return image;
  }

  Widget _placeholder() {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        borderRadius: borderRadius != null
            ? BorderRadius.circular(borderRadius!)
            : null,
      ),
    );
  }
}
