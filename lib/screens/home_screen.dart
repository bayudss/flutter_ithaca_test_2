import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF2F5FA),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.only(bottom: 110),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _Header(),
                Transform.translate(
                  offset: const Offset(0, -40),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: const _StatusCard(),
                  ),
                ),
                Transform.translate(
                  offset: const Offset(0, -28),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      _MissedClockOutAlert(),
                      SizedBox(height: 20),
                      _QuickActionsGrid(),
                      SizedBox(height: 20),
                      _PromoBanners(),
                      SizedBox(height: 20),
                      _AgendaSection(),
                      SizedBox(height: 20),
                      _RecentActivitySection(),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              color: Colors.white,
              padding: const EdgeInsets.only(bottom: 18),
              child: const _BottomNav(),
            ),
          ),
        ],
      ),
    );
  }
}

class _Header extends StatelessWidget {
  const _Header();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 64),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: AppColors.headerGradient,
        ),
      ),
      child: SafeArea(
        bottom: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.15),
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white.withValues(alpha: 0.4), width: 2),
                  ),
                  alignment: Alignment.center,
                  child: const Text('BS',
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Selamat pagi 👋', style: TextStyle(color: Colors.white.withValues(alpha: 0.8), fontSize: 12)),
                      const Text('Budi Santoso',
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                          overflow: TextOverflow.ellipsis),
                    ],
                  ),
                ),
                _HeaderIconButton(icon: Icons.qr_code, onTap: () {}),
                const SizedBox(width: 8),
                _HeaderIconButton(icon: Icons.notifications_outlined, badge: '3', onTap: () {}),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                _Chip(
                  icon: Icons.engineering_outlined,
                  label: 'Operator · PT Primacom',
                ),
                const SizedBox(width: 8),
                _Chip(
                  dotColor: const Color(0xFF4ADE80),
                  label: 'Tersinkron 06:42',
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _HeaderIconButton extends StatelessWidget {
  const _HeaderIconButton({required this.icon, this.badge, required this.onTap});
  final IconData icon;
  final String? badge;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      customBorder: const CircleBorder(),
      child: SizedBox(
        width: 40,
        height: 40,
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Container(
              decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.15), shape: BoxShape.circle),
              alignment: Alignment.center,
              child: Icon(icon, size: 19, color: Colors.white),
            ),
            if (badge != null)
              Positioned(
                top: -2,
                right: -2,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  height: 16,
                  constraints: const BoxConstraints(minWidth: 16),
                  decoration: BoxDecoration(
                    color: AppColors.safety,
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white.withValues(alpha: 0.6)),
                  ),
                  alignment: Alignment.center,
                  child: Text(badge!,
                      style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _Chip extends StatelessWidget {
  const _Chip({required this.label, this.icon, this.dotColor});
  final String label;
  final IconData? icon;
  final Color? dotColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      height: 28,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) Icon(icon, size: 13, color: Colors.white),
          if (dotColor != null)
            Container(width: 6, height: 6, decoration: BoxDecoration(color: dotColor, shape: BoxShape.circle)),
          const SizedBox(width: 6),
          Text(label, style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}

class _StatusCard extends StatelessWidget {
  const _StatusCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(color: const Color(0xFF0E4F9E).withValues(alpha: 0.25), blurRadius: 40, offset: const Offset(0, 20)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('STATUS HARI INI',
                        style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1, color: AppColors.textSubtle)),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Container(width: 8, height: 8, decoration: const BoxDecoration(color: AppColors.safety, shape: BoxShape.circle)),
                        const SizedBox(width: 8),
                        const Text('Belum Clock In', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, letterSpacing: -0.2)),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                height: 24,
                decoration: BoxDecoration(color: const Color(0xFFE7F0FE), borderRadius: BorderRadius.circular(12)),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Icon(Icons.wb_twilight, size: 13, color: AppColors.brand),
                    SizedBox(width: 4),
                    Text('Shift Pagi', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.brand)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: const Color(0xFFF3F6FB), borderRadius: BorderRadius.circular(16)),
            child: Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
                  alignment: Alignment.center,
                  child: const Icon(Icons.access_time, size: 20, color: AppColors.brand),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('06:00 – 14:00', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 2),
                      Row(
                        children: const [
                          Icon(Icons.location_on_outlined, size: 12, color: AppColors.textSubtle),
                          SizedBox(width: 4),
                          Flexible(
                            child: Text('PIT Bahana · Bukit Sangatta',
                                style: TextStyle(fontSize: 11, color: AppColors.textSubtle), overflow: TextOverflow.ellipsis),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: const [
                    Text('Mulai dalam', style: TextStyle(fontSize: 10, color: AppColors.textSubtle)),
                    Text('-01:18', style: TextStyle(fontFamily: 'monospace', fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.brand)),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: AppColors.ctaGradient),
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(color: const Color(0xFF1466BE).withValues(alpha: 0.7), blurRadius: 22, offset: const Offset(0, 12)),
                ],
              ),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  borderRadius: BorderRadius.circular(16),
                  onTap: () {},
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.fingerprint, size: 20, color: Colors.white),
                      SizedBox(width: 8),
                      Text('Clock In Sekarang',
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
                    ],
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              _MiniStat(value: '168j', label: 'Jam bln ini'),
              _MiniStat(value: '10', label: 'Sisa cuti', divider: true),
              _MiniStat(value: '1.240', label: 'Poin K3', divider: true),
            ],
          ),
        ],
      ),
    );
  }
}

class _MiniStat extends StatelessWidget {
  const _MiniStat({required this.value, required this.label, this.divider = false});
  final String value;
  final String label;
  final bool divider;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        decoration: divider ? const BoxDecoration(border: Border(left: BorderSide(color: AppColors.border))) : null,
        padding: divider ? const EdgeInsets.only(left: 8) : EdgeInsets.zero,
        child: Column(
          children: [
            Text(value, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Color(0xFF0E4F9E))),
            Text(label, style: const TextStyle(fontSize: 10, color: AppColors.textSubtle)),
          ],
        ),
      ),
    );
  }
}

class _MissedClockOutAlert extends StatelessWidget {
  const _MissedClockOutAlert();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: const Color(0xFFFFF4E2),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.warning500.withValues(alpha: 0.3)),
        ),
        child: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8)),
              alignment: Alignment.center,
              child: Icon(Icons.warning_amber_outlined, size: 16, color: AppColors.warning600),
            ),
            const SizedBox(width: 10),
            const Expanded(
              child: Text.rich(
                TextSpan(
                  style: TextStyle(fontSize: 12, color: AppColors.textMuted),
                  children: [
                    TextSpan(text: 'Belum clock-out kemarin.', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.text)),
                    TextSpan(text: ' Shift Senin 18 Mei.'),
                  ],
                ),
              ),
            ),
            TextButton(
              onPressed: () {},
              child: const Text('Koreksi', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.brand)),
            ),
          ],
        ),
      ),
    );
  }
}

class _QATone {
  const _QATone(this.bg, this.fg);
  final Color bg;
  final Color fg;
}

const _qaTones = {
  'blue': _QATone(Color(0xFFE7F0FE), Color(0xFF1670C4)),
  'indigo': _QATone(Color(0xFFEBEBFE), Color(0xFF4F53D6)),
  'green': _QATone(Color(0xFFE3F7EE), Color(0xFF12A05C)),
  'orange': _QATone(Color(0xFFFFF0DE), Color(0xFFE7860B)),
  'red': _QATone(Color(0xFFFEEAEA), Color(0xFFE24B4A)),
  'purple': _QATone(Color(0xFFF3E9FD), Color(0xFF9333EA)),
  'teal': _QATone(Color(0xFFDDF5F4), Color(0xFF0E9A98)),
  'gray': _QATone(Color(0xFFEDF1F6), Color(0xFF5B6472)),
};

class _QuickActionsGrid extends StatelessWidget {
  const _QuickActionsGrid();

  static const _items = [
    ('fingerprint', 'Clock In', 'blue', null),
    ('event_available', 'Ajukan Cuti', 'indigo', null),
    ('receipt_long', 'Payslip', 'green', null),
    ('directions_bus', 'Shuttle', 'orange', null),
    ('warning_amber', 'Lapor', 'red', null),
    ('fact_check', 'PTW', 'purple', null),
    ('school', 'e-Learning', 'teal', '2'),
    ('grid_view', 'Lainnya', 'gray', null),
  ];

  static const _iconMap = {
    'fingerprint': Icons.fingerprint,
    'event_available': Icons.event_available,
    'receipt_long': Icons.receipt_long,
    'directions_bus': Icons.directions_bus,
    'warning_amber': Icons.warning_amber,
    'fact_check': Icons.fact_check,
    'school': Icons.school,
    'grid_view': Icons.grid_view,
  };

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(22),
          boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 16, offset: const Offset(0, 8))],
        ),
        child: GridView.count(
          crossAxisCount: 4,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          childAspectRatio: 0.85,
          children: _items.map((item) {
            final tone = _qaTones[item.$3]!;
            return _QuickAction(icon: _iconMap[item.$1]!, label: item.$2, tone: tone, badge: item.$4);
          }).toList(),
        ),
      ),
    );
  }
}

class _QuickAction extends StatelessWidget {
  const _QuickAction({required this.icon, required this.label, required this.tone, this.badge});
  final IconData icon;
  final String label;
  final _QATone tone;
  final String? badge;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Stack(
          clipBehavior: Clip.none,
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(color: tone.bg, borderRadius: BorderRadius.circular(16)),
              alignment: Alignment.center,
              child: Icon(icon, size: 23, color: tone.fg),
            ),
            if (badge != null)
              Positioned(
                top: -4,
                right: -4,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  height: 16,
                  constraints: const BoxConstraints(minWidth: 16),
                  decoration: BoxDecoration(color: AppColors.danger500, shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 2)),
                  alignment: Alignment.center,
                  child: Text(badge!, style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
                ),
              ),
          ],
        ),
        const SizedBox(height: 6),
        Text(label,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF3A4250)),
            maxLines: 2,
            overflow: TextOverflow.ellipsis),
      ],
    );
  }
}

class _PromoBanners extends StatelessWidget {
  const _PromoBanners();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 110,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        children: [
          _PromoCard(
            gradientColors: const [Color(0xFF0E4F9E), Color(0xFF1670C4), Color(0xFF2E9BE6)],
            eyebrow: 'KAMPANYE K3',
            title: 'Zero Harm Mei 2026',
            body: 'Kumpulkan 500 poin, tukar merchandise safety.',
            cta: 'Ikut sekarang',
          ),
          const SizedBox(width: 12),
          _PromoCard(
            gradientColors: const [Color(0xFFF39800), Color(0xFFF5A529)],
            eyebrow: 'REMINDER',
            title: 'Refresh Training K3',
            body: 'Sertifikat Anda berakhir dalam 24 hari.',
            cta: 'Jadwalkan',
          ),
        ],
      ),
    );
  }
}

class _PromoCard extends StatelessWidget {
  const _PromoCard({required this.gradientColors, required this.eyebrow, required this.title, required this.body, required this.cta});
  final List<Color> gradientColors;
  final String eyebrow;
  final String title;
  final String body;
  final String cta;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 290,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: gradientColors),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(eyebrow, style: TextStyle(color: Colors.white.withValues(alpha: 0.85), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),
          const SizedBox(height: 4),
          Text(title, style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          SizedBox(
            width: 190,
            child: Text(body,
                style: TextStyle(color: Colors.white.withValues(alpha: 0.85), fontSize: 11), maxLines: 2, overflow: TextOverflow.ellipsis),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            height: 24,
            decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(12)),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(cta, style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                const SizedBox(width: 4),
                const Icon(Icons.arrow_forward, size: 12, color: Colors.white),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _AgendaSection extends StatelessWidget {
  const _AgendaSection();

  static const _items = [
    ('05:45', 'Safety briefing (P5M)', 'Ruang muster · wajib', true, false),
    ('06:00', 'Shift pagi dimulai', 'Clock in di gerbang PIT', false, true),
    ('12:00', 'Istirahat', '60 menit', false, false),
    ('14:00', 'Shift selesai', 'Clock out', false, false),
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('Agenda hari ini', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, letterSpacing: -0.2)),
              Text('Selasa, 19 Mei', style: TextStyle(fontSize: 11, color: AppColors.textSubtle)),
            ],
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(22),
              boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 16, offset: const Offset(0, 8))],
            ),
            child: Column(
              children: List.generate(_items.length, (i) {
                final (t, title, meta, done, now) = _items[i];
                final isLast = i == _items.length - 1;
                return IntrinsicHeight(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Column(
                        children: [
                          const SizedBox(height: 4),
                          Container(
                            width: 12,
                            height: 12,
                            decoration: BoxDecoration(
                              color: now ? AppColors.brand : (done ? AppColors.success500 : const Color(0xFFCBD5E1)),
                              shape: BoxShape.circle,
                              boxShadow: now ? [BoxShadow(color: AppColors.brand.withValues(alpha: 0.18), blurRadius: 0, spreadRadius: 4)] : null,
                            ),
                          ),
                          if (!isLast)
                            Expanded(
                              child: Container(width: 2, margin: const EdgeInsets.symmetric(vertical: 4), color: AppColors.border),
                            ),
                        ],
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Padding(
                          padding: EdgeInsets.only(bottom: isLast ? 0 : 12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Text(t,
                                      style: TextStyle(
                                          fontFamily: 'monospace',
                                          fontSize: 12,
                                          fontWeight: FontWeight.w800,
                                          color: now ? AppColors.brand : const Color(0xFF3A4250))),
                                  if (now) ...[
                                    const SizedBox(width: 6),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(color: const Color(0xFFE7F0FE), borderRadius: BorderRadius.circular(4)),
                                      child: const Text('SEKARANG',
                                          style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppColors.brand)),
                                    ),
                                  ],
                                  if (done) ...[
                                    const SizedBox(width: 6),
                                    const Icon(Icons.check, size: 13, color: AppColors.success600),
                                  ],
                                ],
                              ),
                              Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                              Text(meta, style: const TextStyle(fontSize: 11, color: AppColors.textSubtle)),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }
}

class _RecentActivitySection extends StatelessWidget {
  const _RecentActivitySection();

  static const _items = [
    (Icons.check_circle, Color(0xFFE3F7EE), Color(0xFF12A05C), 'Cuti tahunan disetujui', '17 Mei · 2 hari', 'kemarin'),
    (Icons.receipt_long, Color(0xFFE7F0FE), Color(0xFF1670C4), 'Payslip April terbit', 'IDR 8.420.000 · netto', '2 hari'),
    (Icons.verified_user, Color(0xFFF3E9FD), Color(0xFF9333EA), 'Training K3 selesai', 'Sertifikat aktif 12 bln', '5 hari'),
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('Aktivitas terbaru', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, letterSpacing: -0.2)),
              Text('Lihat semua', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.brand)),
            ],
          ),
          const SizedBox(height: 8),
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(22),
              boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 16, offset: const Offset(0, 8))],
            ),
            child: Column(
              children: List.generate(_items.length, (i) {
                final (icon, bg, fg, title, meta, time) = _items[i];
                return Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    border: i == _items.length - 1 ? null : const Border(bottom: BorderSide(color: AppColors.border)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 36,
                        height: 36,
                        decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(12)),
                        alignment: Alignment.center,
                        child: Icon(icon, size: 18, color: fg),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600), overflow: TextOverflow.ellipsis),
                            Text(meta, style: const TextStyle(fontSize: 11, color: AppColors.textSubtle), overflow: TextOverflow.ellipsis),
                          ],
                        ),
                      ),
                      Text(time, style: const TextStyle(fontSize: 11, color: AppColors.textSubtle)),
                    ],
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }
}

class _BottomNav extends StatelessWidget {
  const _BottomNav();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: const Border(top: BorderSide(color: AppColors.border)),
        boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.08), blurRadius: 24, offset: const Offset(0, -8))],
      ),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Row(
            children: [
              const _NavTab(icon: Icons.home, label: 'Home', active: true),
              const _NavTab(icon: Icons.access_time, label: 'Attendance', active: false),
              const SizedBox(width: 64),
              const _NavTab(icon: Icons.shield_outlined, label: 'Safety', active: false),
              const _NavTab(icon: Icons.person_outline, label: 'Profile', active: false),
            ],
          ),
          Positioned(
            top: -24,
            left: 0,
            right: 0,
            child: Center(
              child: Column(
                children: [
                  Container(
                    width: 56,
                    height: 56,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(colors: AppColors.ctaGradient),
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 4),
                      boxShadow: [BoxShadow(color: const Color(0xFF1466BE).withValues(alpha: 0.6), blurRadius: 22, offset: const Offset(0, 10))],
                    ),
                    child: const Icon(Icons.qr_code_scanner, color: Colors.white, size: 24),
                  ),
                  const SizedBox(height: 2),
                  const Text('Clock In', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.brand)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _NavTab extends StatelessWidget {
  const _NavTab({required this.icon, required this.label, required this.active});
  final IconData icon;
  final String label;
  final bool active;

  @override
  Widget build(BuildContext context) {
    final color = active ? AppColors.brand : AppColors.textSubtle;
    return Expanded(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 22, color: color),
          const SizedBox(height: 2),
          Text(label, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: color)),
        ],
      ),
    );
  }
}
