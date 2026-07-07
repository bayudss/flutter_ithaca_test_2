import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

enum PrimaryBtnVariant { primary, secondary, safety, outline, ghost }

enum PrimaryBtnSize { md, lg }

/// Port of the `PrimaryBtn` React component from src/login/shared.jsx.
class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    required this.label,
    this.icon,
    this.iconRight,
    this.full = true,
    this.onPressed,
    this.variant = PrimaryBtnVariant.primary,
    this.size = PrimaryBtnSize.md,
  });

  final String label;
  final IconData? icon;
  final IconData? iconRight;
  final bool full;
  final VoidCallback? onPressed;
  final PrimaryBtnVariant variant;
  final PrimaryBtnSize size;

  @override
  Widget build(BuildContext context) {
    final height = size == PrimaryBtnSize.lg ? 56.0 : 48.0;
    final fontSize = size == PrimaryBtnSize.lg ? 15.0 : 14.0;
    final iconSize = 18.0;

    Color bg;
    Color fg;
    BoxBorder? border;
    switch (variant) {
      case PrimaryBtnVariant.primary:
        bg = AppColors.brand;
        fg = Colors.white;
        break;
      case PrimaryBtnVariant.secondary:
        bg = Colors.white;
        fg = AppColors.brand.shade700;
        border = Border.all(color: AppColors.brand.shade200);
        break;
      case PrimaryBtnVariant.safety:
        bg = AppColors.safety;
        fg = Colors.white;
        break;
      case PrimaryBtnVariant.outline:
        bg = Colors.transparent;
        fg = Colors.white;
        border = Border.all(color: Colors.white.withValues(alpha: 0.3));
        break;
      case PrimaryBtnVariant.ghost:
        bg = Colors.transparent;
        fg = AppColors.brand.shade700;
        break;
    }

    final child = Row(
      mainAxisSize: full ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (icon != null) ...[
          Icon(icon, size: iconSize, color: fg),
          const SizedBox(width: 8),
        ],
        Text(
          label,
          style: TextStyle(color: fg, fontWeight: FontWeight.w600, fontSize: fontSize),
        ),
        if (iconRight != null) ...[
          const SizedBox(width: 8),
          Icon(iconRight, size: iconSize, color: fg),
        ],
      ],
    );

    return SizedBox(
      width: full ? double.infinity : null,
      height: height,
      child: Material(
        color: bg,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: onPressed,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: border,
            ),
            alignment: Alignment.center,
            child: child,
          ),
        ),
      ),
    );
  }
}
