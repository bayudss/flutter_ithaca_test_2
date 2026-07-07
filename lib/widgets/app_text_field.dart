import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

/// Port of the `TextField` React component from src/login/shared.jsx.
/// Named AppTextField to avoid clashing with Flutter's own TextField.
class AppTextField extends StatelessWidget {
  const AppTextField({
    super.key,
    this.label,
    this.obscureText = false,
    this.controller,
    this.onChanged,
    this.placeholder,
    this.icon,
    this.hint,
    this.error,
    this.suffix,
    this.keyboardType,
  });

  final String? label;
  final bool obscureText;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final String? placeholder;
  final IconData? icon;
  final String? hint;
  final String? error;
  final Widget? suffix;
  final TextInputType? keyboardType;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null) ...[
          Text(
            label!,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: AppColors.textMuted,
            ),
          ),
          const SizedBox(height: 6),
        ],
        Container(
          height: 48,
          padding: const EdgeInsets.symmetric(horizontal: 12),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: error != null ? AppColors.danger500 : AppColors.borderStrong,
            ),
          ),
          child: Row(
            children: [
              if (icon != null) ...[
                Icon(icon, size: 18, color: AppColors.textSubtle),
                const SizedBox(width: 8),
              ],
              Expanded(
                child: TextField(
                  controller: controller,
                  onChanged: onChanged,
                  obscureText: obscureText,
                  keyboardType: keyboardType,
                  style: const TextStyle(fontSize: 14, color: AppColors.text),
                  decoration: InputDecoration(
                    isDense: true,
                    border: InputBorder.none,
                    hintText: placeholder,
                    hintStyle: const TextStyle(color: AppColors.textSubtle, fontSize: 14),
                  ),
                ),
              ),
              if (suffix != null) suffix!,
            ],
          ),
        ),
        if (hint != null || error != null) ...[
          const SizedBox(height: 4),
          Text(
            error ?? hint!,
            style: TextStyle(
              fontSize: 11,
              color: error != null ? AppColors.danger600 : AppColors.textSubtle,
            ),
          ),
        ],
      ],
    );
  }
}
