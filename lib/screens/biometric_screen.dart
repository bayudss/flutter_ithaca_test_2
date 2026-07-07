import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../widgets/primary_button.dart';
import 'permissions_screen.dart';

class BiometricScreen extends StatelessWidget {
  const BiometricScreen({super.key});

  void _goNext(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => const PermissionsScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            children: [
              const SizedBox(height: 8),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () => _goNext(context),
                  child: const Text(
                    'Lewati',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: AppColors.textSubtle),
                  ),
                ),
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        Container(
                          width: 160,
                          height: 160,
                          decoration: const BoxDecoration(color: AppColors.info50, shape: BoxShape.circle),
                        ),
                        Container(
                          width: 136,
                          height: 136,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: AppColors.brand.shade200,
                              width: 2,
                              style: BorderStyle.solid,
                            ),
                          ),
                        ),
                        Icon(Icons.fingerprint, size: 88, color: AppColors.brand.shade400),
                      ],
                    ),
                    const SizedBox(height: 28),
                    const Text(
                      'Aktifkan login cepat',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, letterSpacing: -0.3),
                    ),
                    const SizedBox(height: 12),
                    const SizedBox(
                      width: 290,
                      child: Text(
                        'Gunakan sidik jari atau Face ID untuk masuk lebih cepat — tanpa perlu memasukkan password setiap kali.',
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 14, color: AppColors.textMuted, height: 1.5),
                      ),
                    ),
                    const SizedBox(height: 20),
                    SizedBox(
                      width: 280,
                      child: Row(
                        children: [
                          Expanded(
                            child: _BiometricOptionCard(
                              icon: Icons.fingerprint,
                              title: 'Touch ID',
                              status: 'Terdeteksi',
                            ),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: _BiometricOptionCard(
                              icon: Icons.face_outlined,
                              title: 'Face ID',
                              status: 'Tersedia',
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Column(
                  children: [
                    PrimaryButton(
                      label: 'Aktifkan',
                      icon: Icons.fingerprint,
                      size: PrimaryBtnSize.lg,
                      onPressed: () => _goNext(context),
                    ),
                    TextButton(
                      onPressed: () => _goNext(context),
                      child: Text(
                        'Nanti saja',
                        style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.brand.shade700),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _BiometricOptionCard extends StatelessWidget {
  const _BiometricOptionCard({required this.icon, required this.title, required this.status});

  final IconData icon;
  final String title;
  final String status;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 20, color: AppColors.brand.shade400),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
          Text(status, style: const TextStyle(fontSize: 10, color: AppColors.textSubtle)),
        ],
      ),
    );
  }
}
