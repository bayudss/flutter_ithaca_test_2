import 'dart:async';
import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../widgets/primary_button.dart';
import 'biometric_screen.dart';

class MfaScreen extends StatefulWidget {
  const MfaScreen({super.key});

  @override
  State<MfaScreen> createState() => _MfaScreenState();
}

class _MfaScreenState extends State<MfaScreen> {
  final List<String> _code = ['9', '2', '4', '8', '', ''];
  int _secs = 38;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      setState(() => _secs = _secs > 0 ? _secs - 1 : 0);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

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
              Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  color: AppColors.info50,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Icon(Icons.verified_user_outlined, size: 26, color: AppColors.brand.shade600),
              ),
              const SizedBox(height: 16),
              const Text(
                'Verifikasi keamanan',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, letterSpacing: -0.3),
              ),
              const SizedBox(height: 4),
              const Text(
                'Masukkan kode 6 digit dari aplikasi authenticator Anda. Kode berubah setiap 30 detik.',
                style: TextStyle(fontSize: 13, color: AppColors.textMuted, height: 1.4),
              ),
              const SizedBox(height: 28),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: List.generate(_code.length, (i) {
                  final d = _code[i];
                  final isFocus = i == 4;
                  final filled = d.isNotEmpty;
                  return Container(
                    width: 48,
                    height: 56,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: filled ? AppColors.info50 : Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: filled || isFocus ? AppColors.brand : AppColors.borderStrong,
                        width: 2,
                      ),
                    ),
                    child: filled
                        ? Text(
                            d,
                            style: TextStyle(
                              fontFamily: 'monospace',
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                              color: AppColors.brand.shade700,
                            ),
                          )
                        : isFocus
                            ? Container(width: 2, height: 24, color: AppColors.brand)
                            : null,
                  );
                }),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  RichText(
                    text: TextSpan(
                      style: const TextStyle(fontSize: 13, color: AppColors.textMuted),
                      children: [
                        const TextSpan(text: 'Kode kedaluwarsa dalam '),
                        TextSpan(
                          text: '00:${_secs.toString().padLeft(2, '0')}',
                          style: const TextStyle(
                            fontFamily: 'monospace',
                            fontWeight: FontWeight.bold,
                            color: AppColors.text,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    width: 36,
                    height: 36,
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        SizedBox(
                          width: 36,
                          height: 36,
                          child: CircularProgressIndicator(
                            value: _secs / 60,
                            strokeWidth: 3,
                            backgroundColor: AppColors.brand.shade100,
                            valueColor: AlwaysStoppedAnimation(AppColors.brand),
                          ),
                        ),
                        Text(
                          '$_secs',
                          style: TextStyle(
                            fontFamily: 'monospace',
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: AppColors.brand.shade700,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.bgElev,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.border),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 2),
                      child: Icon(Icons.smartphone_outlined, size: 16, color: AppColors.brand.shade600),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: RichText(
                        text: TextSpan(
                          style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
                          children: [
                            const TextSpan(text: 'Tidak punya akses authenticator? '),
                            TextSpan(
                              text: 'Kirim ulang via SMS',
                              style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.brand.shade700),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const Spacer(),
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: PrimaryButton(
                  label: 'Verifikasi',
                  icon: Icons.check,
                  size: PrimaryBtnSize.lg,
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => const BiometricScreen()),
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
