import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../widgets/app_text_field.dart';
import '../widgets/brand_mark.dart';
import '../widgets/primary_button.dart';
import 'mfa_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _showPw = false;
  bool _remember = true;
  final _nikController = TextEditingController(text: 'NSR-009281');
  final _pwController = TextEditingController(text: 'rahasia2026');

  @override
  void dispose() {
    _nikController.dispose();
    _pwController.dispose();
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
                style: IconButton.styleFrom(
                  padding: EdgeInsets.zero,
                  minimumSize: const Size(40, 40),
                ),
              ),
              const SizedBox(height: 12),
              const BrandMark(size: 56, ring: false),
              const SizedBox(height: 16),
              const Text(
                'Masuk ke akun Anda',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, letterSpacing: -0.3),
              ),
              const SizedBox(height: 4),
              const Text(
                'Gunakan NIK dan password korporat Primacom.',
                style: TextStyle(fontSize: 13, color: AppColors.textMuted),
              ),
              const SizedBox(height: 20),
              Container(
                height: 40,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                  color: AppColors.info50,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    Icon(Icons.verified_user_outlined, size: 15, color: AppColors.info700),
                    const SizedBox(width: 8),
                    Expanded(
                      child: RichText(
                        overflow: TextOverflow.ellipsis,
                        text: TextSpan(
                          style: TextStyle(fontSize: 12, color: AppColors.info700),
                          children: const [
                            TextSpan(text: 'Single Sign-On via '),
                            TextSpan(text: 'Keycloak', style: TextStyle(fontWeight: FontWeight.bold)),
                            TextSpan(text: ' · keycloak.primacom.co.id'),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              AppTextField(
                label: 'NIK / Employee ID',
                icon: Icons.person_outline,
                placeholder: 'NSR-000000',
                controller: _nikController,
              ),
              const SizedBox(height: 14),
              AppTextField(
                label: 'Password',
                icon: Icons.lock_outline,
                obscureText: !_showPw,
                controller: _pwController,
                suffix: IconButton(
                  onPressed: () => setState(() => _showPw = !_showPw),
                  icon: Icon(_showPw ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                      size: 16, color: AppColors.textSubtle),
                  style: IconButton.styleFrom(minimumSize: const Size(32, 32), padding: EdgeInsets.zero),
                ),
              ),
              const SizedBox(height: 14),
              InkWell(
                onTap: () => setState(() => _remember = !_remember),
                child: Row(
                  children: [
                    Container(
                      width: 20,
                      height: 20,
                      decoration: BoxDecoration(
                        color: _remember ? AppColors.brand : Colors.white,
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: _remember ? AppColors.brand : AppColors.borderStrong,
                          width: 2,
                        ),
                      ),
                      child: _remember ? const Icon(Icons.check, size: 14, color: Colors.white) : null,
                    ),
                    const SizedBox(width: 10),
                    RichText(
                      text: const TextSpan(
                        style: TextStyle(fontSize: 13, color: AppColors.text),
                        children: [
                          TextSpan(text: 'Ingat saya selama '),
                          TextSpan(text: '30 hari', style: TextStyle(fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              PrimaryButton(
                label: 'Masuk',
                icon: Icons.login,
                size: PrimaryBtnSize.lg,
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const MfaScreen()),
                  );
                },
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Lupa password?',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.brand.shade700),
                  ),
                  Row(
                    children: [
                      const Icon(Icons.support_agent_outlined, size: 14, color: AppColors.textSubtle),
                      const SizedBox(width: 4),
                      const Text('Bantuan login', style: TextStyle(fontSize: 13, color: AppColors.textSubtle)),
                    ],
                  ),
                ],
              ),
              const Spacer(),
              const Padding(
                padding: EdgeInsets.only(bottom: 12),
                child: Text.rich(
                  TextSpan(
                    style: TextStyle(fontSize: 11, color: AppColors.textSubtle),
                    children: [
                      TextSpan(text: 'Dengan masuk, Anda menyetujui '),
                      TextSpan(text: 'Syarat', style: TextStyle(fontWeight: FontWeight.w600)),
                      TextSpan(text: ' & '),
                      TextSpan(text: 'Kebijakan Privasi', style: TextStyle(fontWeight: FontWeight.w600)),
                      TextSpan(text: '.'),
                    ],
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
