import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../widgets/primary_button.dart';
import 'home_screen.dart';

class PermissionsScreen extends StatefulWidget {
  const PermissionsScreen({super.key});

  @override
  State<PermissionsScreen> createState() => _PermissionsScreenState();
}

class _PermissionsScreenState extends State<PermissionsScreen> {
  bool _gps = true;
  bool _cam = true;
  bool _notif = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 8),
              IconButton(
                onPressed: () => Navigator.of(context).maybePop(),
                icon: const Icon(Icons.arrow_back, size: 22),
                style: IconButton.styleFrom(padding: EdgeInsets.zero, minimumSize: const Size(40, 40)),
              ),
              const SizedBox(height: 12),
              const Text(
                'Beri akses untuk pengalaman penuh',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, letterSpacing: -0.3, height: 1.2),
              ),
              const SizedBox(height: 8),
              const Text(
                'Anda bisa mengubah izin ini kapan saja melalui pengaturan perangkat.',
                style: TextStyle(fontSize: 13, color: AppColors.textMuted, height: 1.4),
              ),
              const SizedBox(height: 20),
              _PermCard(
                icon: Icons.location_on_outlined,
                title: 'Lokasi (GPS)',
                required: true,
                desc: 'Untuk attendance, pelacakan shuttle, dan emergency response saat SOS.',
                checked: _gps,
                onToggle: () => setState(() => _gps = !_gps),
              ),
              const SizedBox(height: 10),
              _PermCard(
                icon: Icons.camera_alt_outlined,
                title: 'Kamera',
                required: false,
                desc: 'Untuk scan QR clock-in, foto temuan unsafe, dan dokumentasi inspeksi.',
                checked: _cam,
                onToggle: () => setState(() => _cam = !_cam),
              ),
              const SizedBox(height: 10),
              _PermCard(
                icon: Icons.notifications_outlined,
                title: 'Notifikasi',
                required: true,
                desc: 'Untuk approval, jadwal shift, pengingat istirahat, dan alert emergency.',
                checked: _notif,
                onToggle: () => setState(() => _notif = !_notif),
              ),
              const Spacer(),
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: PrimaryButton(
                  label: 'Lanjutkan',
                  iconRight: Icons.arrow_forward,
                  size: PrimaryBtnSize.lg,
                  onPressed: () {
                    Navigator.of(context).pushAndRemoveUntil(
                      MaterialPageRoute(builder: (_) => const HomeScreen()),
                      (route) => false,
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PermCard extends StatelessWidget {
  const _PermCard({
    required this.icon,
    required this.title,
    required this.required,
    required this.desc,
    required this.checked,
    required this.onToggle,
  });

  final IconData icon;
  final String title;
  final bool required;
  final String desc;
  final bool checked;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: checked ? AppColors.brand.shade50.withValues(alpha: 0.6) : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: checked ? AppColors.brand : AppColors.border),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: checked ? AppColors.brand : AppColors.brand.shade50,
              borderRadius: BorderRadius.circular(12),
            ),
            alignment: Alignment.center,
            child: Icon(icon, size: 20, color: checked ? Colors.white : AppColors.brand.shade600),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                    if (required) ...[
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.danger50,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          'WAJIB',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.5,
                            color: AppColors.danger600,
                          ),
                        ),
                      ),
                    ],
                  ],
                ),
                const SizedBox(height: 2),
                Text(desc, style: const TextStyle(fontSize: 12, color: AppColors.textMuted, height: 1.3)),
              ],
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            onTap: onToggle,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 150),
              width: 44,
              height: 24,
              padding: const EdgeInsets.all(2),
              decoration: BoxDecoration(
                color: checked ? AppColors.brand : AppColors.borderStrong,
                borderRadius: BorderRadius.circular(12),
              ),
              alignment: checked ? Alignment.centerRight : Alignment.centerLeft,
              child: Container(
                width: 20,
                height: 20,
                decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
