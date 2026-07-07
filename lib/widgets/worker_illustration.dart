import 'package:flutter/material.dart';

/// Geometric worker/hard-hat illustration used on the Welcome screen.
/// Ported from the SVG in SUPER/src/login/shared.jsx.
class WorkerIllustration extends StatelessWidget {
  const WorkerIllustration({super.key, this.size = 200});

  final double size;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size * 200 / 240,
      child: CustomPaint(painter: _WorkerPainter()),
    );
  }
}

class _WorkerPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final sx = size.width / 240;
    final sy = size.height / 200;
    Offset p(double x, double y) => Offset(x * sx, y * sy);
    Path scaledPath(Path source) => source.transform(
          Matrix4.diagonal3Values(sx, sy, 1).storage,
        );

    // Background rounded rect with gradient.
    final bgRect = RRect.fromRectAndRadius(
      Rect.fromLTWH(0, 0, size.width, size.height),
      Radius.circular(20 * sx),
    );
    final bgPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [Color(0xFFEAF1F8), Color(0xFFCFDDEC)],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    canvas.drawRRect(bgRect, bgPaint);

    // Mountain silhouettes.
    final mountainBack = Path()
      ..moveTo(0, 150)
      ..lineTo(60, 90)
      ..lineTo(100, 120)
      ..lineTo(150, 70)
      ..lineTo(200, 110)
      ..lineTo(240, 90)
      ..lineTo(240, 200)
      ..lineTo(0, 200)
      ..close();
    canvas.drawPath(
      scaledPath(mountainBack),
      Paint()..color = const Color(0xFF1670C4).withValues(alpha: 0.85),
    );

    final mountainFront = Path()
      ..moveTo(0, 170)
      ..lineTo(40, 140)
      ..lineTo(90, 160)
      ..lineTo(140, 135)
      ..lineTo(190, 155)
      ..lineTo(240, 140)
      ..lineTo(240, 200)
      ..lineTo(0, 200)
      ..close();
    canvas.drawPath(scaledPath(mountainFront), Paint()..color = const Color(0xFF0F4C8A));

    // Sun.
    canvas.drawCircle(
      p(195, 55),
      22 * ((sx + sy) / 2),
      Paint()..color = const Color(0xFFF39800).withValues(alpha: 0.9),
    );

    // Worker bust (origin translated to 120,200).
    Offset t(double x, double y) => p(120 + x, 200 + y);

    final vest = Path()
      ..moveTo(t(-52, 0).dx, t(-52, 0).dy)
      ..cubicTo(t(-52, -30).dx, t(-52, -30).dy, t(-28, -50).dx, t(-28, -50).dy, t(0, -50).dx, t(0, -50).dy)
      ..cubicTo(t(28, -50).dx, t(28, -50).dy, t(52, -30).dx, t(52, -30).dy, t(52, 0).dx, t(52, 0).dy)
      ..close();
    canvas.drawPath(vest, Paint()..color = const Color(0xFFF39800));

    final stripe = Path()
      ..moveTo(t(-42, -10).dx, t(-42, -10).dy)
      ..cubicTo(t(-38, -22).dx, t(-38, -22).dy, t(-20, -30).dx, t(-20, -30).dy, t(0, -30).dx, t(0, -30).dy)
      ..cubicTo(t(20, -30).dx, t(20, -30).dy, t(38, -22).dx, t(38, -22).dy, t(42, -10).dx, t(42, -10).dy);
    canvas.drawPath(
      stripe,
      Paint()
        ..color = Colors.white
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3 * sy
        ..strokeCap = StrokeCap.round,
    );

    // Head.
    canvas.drawCircle(t(0, -62), 22 * ((sx + sy) / 2), Paint()..color = const Color(0xFFE8C9A0));

    // Hard hat.
    final hat = Path()
      ..moveTo(t(-28, -66).dx, t(-28, -66).dy)
      ..cubicTo(t(-28, -86).dx, t(-28, -86).dy, t(-16, -96).dx, t(-16, -96).dy, t(0, -96).dx, t(0, -96).dy)
      ..cubicTo(t(16, -96).dx, t(16, -96).dy, t(28, -86).dx, t(28, -86).dy, t(28, -66).dx, t(28, -66).dy)
      ..close();
    final hatPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: const [Color(0xFFF5A529), Color(0xFFCC7F00)],
      ).createShader(Rect.fromPoints(t(-28, -96), t(28, -66)));
    canvas.drawPath(hat, hatPaint);

    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(t(-30, -68).dx, t(-30, -68).dy, 60 * sx, 5 * sy),
        Radius.circular(2 * sx),
      ),
      Paint()..color = const Color(0xFFA36500),
    );

    canvas.drawLine(
      t(-22, -70),
      t(22, -70),
      Paint()
        ..color = const Color(0xFF7A4C00)
        ..strokeWidth = 1.5,
    );

    // Face.
    final eyePaint = Paint()..color = const Color(0xFF0F1115);
    canvas.drawCircle(t(-7, -62), 1.8 * ((sx + sy) / 2), eyePaint);
    canvas.drawCircle(t(7, -62), 1.8 * ((sx + sy) / 2), eyePaint);

    final smile = Path()
      ..moveTo(t(-5, -54).dx, t(-5, -54).dy)
      ..quadraticBezierTo(t(0, -50).dx, t(0, -50).dy, t(5, -54).dx, t(5, -54).dy);
    canvas.drawPath(
      smile,
      Paint()
        ..color = const Color(0xFF0F1115)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.5
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(covariant _WorkerPainter oldDelegate) => false;
}
