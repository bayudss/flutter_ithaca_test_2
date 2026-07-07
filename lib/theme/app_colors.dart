import 'package:flutter/material.dart';

/// Colors ported from the Primacom SuperApps design tokens
/// (SUPER/Login & Onboarding.html tailwind config).
class AppColors {
  AppColors._();

  static const Map<int, Color> _brandSwatch = {
    50: Color(0xFFEAF2FE),
    100: Color(0xFFCFE0FB),
    200: Color(0xFFA6C6F5),
    300: Color(0xFF6FA3EC),
    400: Color(0xFF3D85E0),
    500: Color(0xFF1670C4),
    600: Color(0xFF135DA8),
    700: Color(0xFF0F4C8A),
    800: Color(0xFF0C3C6E),
    900: Color(0xFF0A2E54),
  };
  static const MaterialColor brand = MaterialColor(0xFF1670C4, _brandSwatch);

  static const Map<int, Color> _safetySwatch = {
    50: Color(0xFFFEF4E5),
    100: Color(0xFFFCE3BC),
    200: Color(0xFFFACB87),
    300: Color(0xFFF7B354),
    400: Color(0xFFF5A529),
    500: Color(0xFFF39800),
    600: Color(0xFFCC7F00),
    700: Color(0xFFA36500),
    800: Color(0xFF7A4C00),
    900: Color(0xFF523300),
  };
  static const MaterialColor safety = MaterialColor(0xFFF39800, _safetySwatch);

  static const success50 = Color(0xFFE8F6F0);
  static const success500 = Color(0xFF1D9E75);
  static const success600 = Color(0xFF178060);
  static const success700 = Color(0xFF11624A);

  static const warning50 = Color(0xFFFEF4DE);
  static const warning500 = Color(0xFFEF9F27);
  static const warning600 = Color(0xFFC8821A);
  static const warning700 = Color(0xFF946011);

  static const danger50 = Color(0xFFFBE8E8);
  static const danger500 = Color(0xFFE24B4A);
  static const danger600 = Color(0xFFBE3A39);
  static const danger700 = Color(0xFF8E2A29);

  static const info50 = Color(0xFFE6F0FB);
  static const info500 = Color(0xFF378ADD);
  static const info600 = Color(0xFF2A6FB8);
  static const info700 = Color(0xFF1F548B);

  static const bg = Color(0xFFF5F6F8);
  static const bgElev = Color(0xFFFAFAFA);
  static const surface = Color(0xFFFFFFFF);
  static const border = Color(0xFFE6E8EC);
  static const borderStrong = Color(0xFFD0D4DC);
  static const text = Color(0xFF0F1115);
  static const textMuted = Color(0xFF5B6472);
  static const textSubtle = Color(0xFF8B94A2);
  static const ring = Color(0x591670C4);

  static const List<Color> splashGradient = [
    Color(0xFF0A2E54),
    Color(0xFF0F4C8A),
    Color(0xFF1670C4),
    Color(0xFF2E9BE6),
  ];

  static const List<Color> headerGradient = [
    Color(0xFF2E9BE6),
    Color(0xFF1670C4),
    Color(0xFF0E4F9E),
  ];

  static const List<Color> ctaGradient = [
    Color(0xFF1C8BE0),
    Color(0xFF1466BE),
    Color(0xFF0E4F9E),
  ];
}
