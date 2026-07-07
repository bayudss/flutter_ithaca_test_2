import 'package:flutter/material.dart';

/// Big rounded "P" brand mark used on splash & login screens.
class BrandMark extends StatelessWidget {
  const BrandMark({super.key, this.size = 80, this.ring = true});

  final double size;
  final bool ring;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size * 1.35,
      height: size * 1.35,
      child: Stack(
        alignment: Alignment.center,
        children: [
          if (ring)
            Container(
              width: size * 1.35,
              height: size * 1.35,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(size * 1.35 * 0.28),
                border: Border.all(color: Colors.white.withValues(alpha: 0.15), width: 2),
              ),
            ),
          Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(size * 0.28),
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Color(0xFF2E9BE6), Color(0xFF1670C4), Color(0xFF0E4F8E)],
                stops: [0, 0.55, 1],
              ),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF1670C4).withValues(alpha: 0.45),
                  blurRadius: 30,
                  offset: const Offset(0, 12),
                ),
                BoxShadow(
                  color: const Color(0xFF0E4C8A).withValues(alpha: 0.6),
                  blurRadius: 16,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            alignment: Alignment.center,
            child: Text(
              'P',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w800,
                fontSize: size * 0.55,
                letterSpacing: -size * 0.02,
                height: 1,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
