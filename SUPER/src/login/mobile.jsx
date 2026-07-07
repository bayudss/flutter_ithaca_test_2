// Mobile screens 1.1 → 1.7.

// =================== 1.1 Splash ===================
function SplashScreen() {
  return (
    <div className="splash-bg absolute inset-0 flex flex-col items-center justify-center text-white">
      <div className="flex-1" />
      <BrandMark size={96} />
      <div className="mt-6 text-[26px] font-extrabold tracking-tight">Primacom</div>
      <div className="mt-1 text-[13px] text-white/75 font-medium">Smart Workforce & Operations</div>
      <div className="flex-1" />
      <div className="mb-12 flex items-center gap-2 text-white/70 text-[11px]">
        <Icon name="loader-2" size={14} className="spinner" />
        <span>Memuat aplikasi…</span>
      </div>
    </div>
  );
}
function Screen_Splash() {
  return (
    <div className="relative flex-1">
      <SplashScreen />
    </div>
  );
}

// =================== 1.2 Welcome ===================
function Screen_Welcome() {
  return (
    <div className="flex-1 flex flex-col px-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <WorkerIllustration size={220} />
        <div className="mt-7 text-[24px] font-extrabold tracking-tight leading-tight">
          Selamat datang di<br/>SuperApps
        </div>
        <div className="mt-3 text-[14px] text-muted leading-relaxed max-w-[280px]">
          Aplikasi terpadu untuk seluruh pekerja Primacom — clock in, izin, payslip, dan emergency dalam satu app.
        </div>
        {/* dots */}
        <div className="mt-6 flex items-center gap-1.5">
          <div className="w-6 h-1.5 rounded-full bg-brand-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-200" />
        </div>
      </div>
      <div className="space-y-2.5 pb-3">
        <PrimaryBtn icon="shield-check" size="lg">Masuk dengan akun Primacom</PrimaryBtn>
        <button className="w-full h-12 rounded-xl border border-token-strong text-[14px] font-semibold inline-flex items-center justify-center gap-2 bg-white">
          <Icon name="truck" size={18} className="text-safety-600" />
          Saya kontraktor
        </button>
        <div className="text-center text-[11px] text-subtle pt-2">v1.0 · Powered by Primacom</div>
      </div>
    </div>
  );
}

// =================== 1.3 Login ===================
function Screen_Login() {
  const [showPw, setShowPw] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  return (
    <div className="flex-1 flex flex-col px-6 pt-2">
      <button className="self-start -ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
        <Icon name="arrow-left" size={22} />
      </button>
      <div className="mt-3">
        <BrandMark size={56} ring={false} />
        <div className="mt-4 text-[22px] font-extrabold tracking-tight">Masuk ke akun Anda</div>
        <div className="mt-1 text-[13px] text-muted">Gunakan NIK dan password korporat Primacom.</div>
      </div>

      {/* SSO badge */}
      <div className="mt-5 flex items-center gap-2 px-3 h-10 rounded-lg bg-info-50 text-info-700 text-[12px]">
        <Icon name="shield-check" size={15} />
        <span>Single Sign-On via <strong>Keycloak</strong> · keycloak.primacom.co.id</span>
      </div>

      <div className="mt-4 space-y-3.5">
        <TextField label="NIK / Employee ID" icon="user" placeholder="NSR-000000" value="NSR-009281" onChange={()=>{}} />
        <TextField
          label="Password"
          type={showPw ? 'text' : 'password'}
          icon="lock"
          value="rahasia2026"
          onChange={()=>{}}
          suffix={
            <button onClick={() => setShowPw(s => !s)} className="text-subtle hover:text-[color:var(--text)] w-8 h-8 -mr-1 flex items-center justify-center">
              <Icon name={showPw ? 'eye-off' : 'eye'} size={16} />
            </button>
          }
        />
        <label className="flex items-center gap-2.5 text-[13px] cursor-pointer select-none">
          <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${remember ? 'bg-brand-500 border-brand-500' : 'border-token-strong bg-white'}`}
                onClick={() => setRemember(r => !r)}>
            {remember && <Icon name="check" size={14} className="text-white" />}
          </span>
          <span>Ingat saya selama <strong>30 hari</strong></span>
        </label>
      </div>

      <div className="mt-5">
        <PrimaryBtn icon="log-in" size="lg">Masuk</PrimaryBtn>
      </div>

      <div className="mt-4 flex items-center justify-between text-[13px]">
        <a className="text-brand-700 font-semibold">Lupa password?</a>
        <a className="text-subtle inline-flex items-center gap-1">
          <Icon name="life-buoy" size={14} />
          Bantuan login
        </a>
      </div>

      <div className="flex-1" />
      <div className="pb-3 text-center text-[11px] text-subtle">
        Dengan masuk, Anda menyetujui <span className="font-semibold">Syarat</span> & <span className="font-semibold">Kebijakan Privasi</span>.
      </div>
    </div>
  );
}

// =================== 1.4 MFA ===================
function Screen_MFA() {
  const [code] = React.useState(['9','2','4','8','','']);
  const [secs, setSecs] = React.useState(38);
  React.useEffect(() => {
    const t = setInterval(() => setSecs(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex-1 flex flex-col px-6 pt-2">
      <button className="self-start -ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
        <Icon name="arrow-left" size={22} />
      </button>
      <div className="mt-3 w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
        <Icon name="shield-check" size={26} />
      </div>
      <div className="mt-4 text-[22px] font-extrabold tracking-tight">Verifikasi keamanan</div>
      <div className="mt-1 text-[13px] text-muted leading-relaxed">
        Masukkan kode 6 digit dari aplikasi authenticator Anda. Kode berubah setiap 30 detik.
      </div>

      <div className="mt-7 flex gap-2 justify-between">
        {code.map((d, i) => (
          <div key={i}
               className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-[22px] font-bold mono
                ${d ? 'border-brand-500 bg-brand-50 text-brand-700' : i === 4 ? 'border-brand-500 bg-white text-brand-700' : 'border-token-strong bg-white text-subtle'}`}>
            {d || (i === 4 ? <span className="w-[2px] h-6 bg-brand-500 animate-pulse" /> : '')}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-[13px]">
        <div className="text-muted">
          Kode kedaluwarsa dalam <span className="mono font-bold text-[color:var(--text)]">00:{String(secs).padStart(2,'0')}</span>
        </div>
        <div className="w-9 h-9 rounded-full border-2 border-brand-100 relative">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#1670C4" strokeWidth="3"
                    strokeDasharray={`${(secs/60)*94} 94`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold mono text-brand-700">{secs}</div>
        </div>
      </div>

      <div className="mt-6 p-3 rounded-xl bg-elev border border-token">
        <div className="flex items-start gap-2.5">
          <Icon name="smartphone" size={16} className="text-brand-600 mt-0.5" />
          <div className="text-[12px] text-muted">
            Tidak punya akses authenticator?{' '}
            <a className="text-brand-700 font-semibold whitespace-nowrap">Kirim ulang via SMS</a>
          </div>
        </div>
      </div>

      <div className="flex-1" />
      <div className="pb-3">
        <PrimaryBtn icon="check" size="lg">Verifikasi</PrimaryBtn>
      </div>
    </div>
  );
}

// =================== 1.5 Biometric setup ===================
function Screen_Biometric() {
  return (
    <div className="flex-1 flex flex-col px-6 pt-2">
      <button className="self-end -mr-2 text-[13px] text-subtle font-medium px-3 h-10">Lewati</button>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative w-40 h-40 rounded-full bg-brand-50 flex items-center justify-center">
          <div className="absolute inset-3 rounded-full border-2 border-dashed border-brand-200" />
          <Icon name="fingerprint" size={88} className="text-brand-500" />
        </div>
        <div className="mt-7 text-[24px] font-extrabold tracking-tight leading-tight">
          Aktifkan login cepat
        </div>
        <div className="mt-3 text-[14px] text-muted leading-relaxed max-w-[290px]">
          Gunakan sidik jari atau Face ID untuk masuk lebih cepat — tanpa perlu memasukkan password setiap kali.
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 w-full max-w-[280px]">
          <div className="rounded-xl border border-token bg-white p-3 text-left">
            <Icon name="fingerprint" size={20} className="text-brand-500" />
            <div className="text-[12px] font-semibold mt-2">Touch ID</div>
            <div className="text-[10px] text-subtle">Terdeteksi</div>
          </div>
          <div className="rounded-xl border border-token bg-white p-3 text-left">
            <Icon name="scan-face" size={20} className="text-brand-500" />
            <div className="text-[12px] font-semibold mt-2">Face ID</div>
            <div className="text-[10px] text-subtle">Tersedia</div>
          </div>
        </div>
      </div>
      <div className="space-y-2.5 pb-3">
        <PrimaryBtn icon="fingerprint" size="lg">Aktifkan</PrimaryBtn>
        <button className="w-full h-12 rounded-xl text-[14px] font-semibold text-brand-700">Nanti saja</button>
      </div>
    </div>
  );
}

// =================== 1.6 Permissions ===================
function PermCard({ icon, title, desc, required, checked, onToggle }) {
  return (
    <div className={`rounded-xl border p-4 transition-all ${checked ? 'border-brand-500 bg-brand-50/60' : 'border-token bg-white'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${checked ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600'}`}>
          <Icon name={icon} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <div className="text-[14px] font-semibold">{title}</div>
            {required && <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-danger-50 text-danger-600">Wajib</span>}
          </div>
          <div className="text-[12px] text-muted mt-0.5 leading-snug">{desc}</div>
        </div>
        <button onClick={onToggle}
                className={`shrink-0 w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-brand-500' : 'bg-[color:var(--border-strong)]'}`}>
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
        </button>
      </div>
    </div>
  );
}
function Screen_Permissions() {
  const [perms, setPerms] = React.useState({ gps: true, cam: true, notif: true });
  return (
    <div className="flex-1 flex flex-col px-6 pt-2">
      <button className="self-start -ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
        <Icon name="arrow-left" size={22} />
      </button>
      <div className="mt-3">
        <div className="text-[22px] font-extrabold tracking-tight leading-tight">Beri akses untuk pengalaman penuh</div>
        <div className="mt-2 text-[13px] text-muted leading-relaxed">
          Anda bisa mengubah izin ini kapan saja melalui pengaturan perangkat.
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        <PermCard icon="map-pin" title="Lokasi (GPS)" required
          desc="Untuk attendance, pelacakan shuttle, dan emergency response saat SOS."
          checked={perms.gps} onToggle={() => setPerms(p => ({...p, gps: !p.gps}))} />
        <PermCard icon="camera" title="Kamera"
          desc="Untuk scan QR clock-in, foto temuan unsafe, dan dokumentasi inspeksi."
          checked={perms.cam} onToggle={() => setPerms(p => ({...p, cam: !p.cam}))} />
        <PermCard icon="bell" title="Notifikasi" required
          desc="Untuk approval, jadwal shift, pengingat istirahat, dan alert emergency."
          checked={perms.notif} onToggle={() => setPerms(p => ({...p, notif: !p.notif}))} />
      </div>

      <div className="flex-1" />
      <div className="pb-3">
        <PrimaryBtn iconRight="arrow-right" size="lg">Lanjutkan</PrimaryBtn>
      </div>
    </div>
  );
}

// =================== 1.7 Home / Dashboard (superapp redesign) ===================
// Primacom-blue gradient system.
const PC_HEADER_GRAD = 'linear-gradient(158deg, #2E9BE6 0%, #1670C4 46%, #0E4F9E 100%)';
const PC_CTA_GRAD    = 'linear-gradient(135deg, #1C8BE0 0%, #1466BE 55%, #0E4F9E 100%)';

const QA_TONES = {
  blue:   { bg:'#E7F0FE', fg:'#1670C4' },
  indigo: { bg:'#EBEBFE', fg:'#4F53D6' },
  green:  { bg:'#E3F7EE', fg:'#12A05C' },
  orange: { bg:'#FFF0DE', fg:'#E7860B' },
  red:    { bg:'#FEEAEA', fg:'#E24B4A' },
  purple: { bg:'#F3E9FD', fg:'#9333EA' },
  teal:   { bg:'#DDF5F4', fg:'#0E9A98' },
  gray:   { bg:'#EDF1F6', fg:'#5B6472' },
};

function QuickAction({ icon, label, tone='blue', badge }) {
  const t = QA_TONES[tone] || QA_TONES.blue;
  return (
    <button className="flex flex-col items-center gap-2 py-1.5">
      <div className="relative w-[52px] h-[52px] rounded-2xl flex items-center justify-center"
           style={{ background: t.bg, color: t.fg }}>
        <Icon name={icon} size={23} />
        {badge && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-danger-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">{badge}</span>
        )}
      </div>
      <div className="text-[11px] font-semibold text-center leading-tight max-w-[74px]" style={{ color:'#3a4250' }}>{label}</div>
    </button>
  );
}

function MobileBottomNav({ active = 0 }) {
  const left  = [{ name:'Home', icon:'home' }, { name:'Attendance', icon:'clock' }];
  const right = [{ name:'Safety', icon:'shield' }, { name:'Profile', icon:'user' }];
  const Tab = ({ t, i }) => (
    <button className="flex flex-col items-center gap-1 py-1 flex-1">
      <Icon name={t.icon} size={22} className={i === active ? 'text-[#1670C4]' : 'text-subtle'} />
      <span className={`text-[10px] font-semibold ${i === active ? 'text-[#1670C4]' : 'text-subtle'}`}>{t.name}</span>
    </button>
  );
  return (
    <div className="relative bg-white border-t border-token px-2 pt-1.5 pb-1.5"
         style={{ boxShadow:'0 -8px 24px -16px rgba(15,23,42,0.35)' }}>
      <div className="flex items-stretch">
        {left.map((t, i) => <Tab key={t.name} t={t} i={i} />)}
        <div className="w-16 shrink-0" />
        {right.map((t, i) => <Tab key={t.name} t={t} i={i + 3} />)}
      </div>
      {/* Center raised FAB — Clock In / Scan */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-6 flex flex-col items-center">
        <button className="w-14 h-14 rounded-full text-white flex items-center justify-center"
                style={{ background: PC_CTA_GRAD, boxShadow:'0 10px 22px -6px rgba(20,102,190,0.6)', border:'4px solid #fff' }}>
          <Icon name="scan-line" size={24} />
        </button>
        <span className="text-[10px] font-bold text-[#1670C4] mt-0.5">Clock In</span>
      </div>
    </div>
  );
}

function Screen_Home() {
  return (
    <div className="flex-1 min-h-0 flex flex-col relative" style={{ background:'#F2F5FA' }}>
      {/* ===== Scroll body — header scrolls WITH content (Dana/Gojek style) ===== */}
      <div className="no-scrollbar flex-1 min-h-0 overflow-y-auto -mt-[54px] pb-28 text-[#0f1115]">
      {/* Gradient header (extends under status bar) */}
      <div className="relative px-5 pt-[62px] pb-16 text-white overflow-hidden" style={{ background: PC_HEADER_GRAD }}>
        {/* Brand-echo concentric arcs */}
        <div className="absolute -right-10 -top-16 w-48 h-48 rounded-full border border-white/15" />
        <div className="absolute -right-4 -top-10 w-32 h-32 rounded-full border border-white/15" />
        <div className="absolute right-6 -top-4 w-16 h-16 rounded-full border border-white/15" />

        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur flex items-center justify-center font-bold text-[15px] ring-2 ring-white/40">BS</div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] text-white/80">Selamat pagi 👋</div>
            <div className="text-[16px] font-bold leading-tight truncate">Budi Santoso</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Icon name="qr-code" size={19} />
          </button>
          <button className="relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Icon name="bell" size={19} />
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-safety-500 text-white text-[9px] font-bold flex items-center justify-center border border-white/60">3</span>
          </button>
        </div>

        {/* role + sync chips */}
        <div className="relative mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-white/15 text-[11px] font-semibold">
            <Icon name="hard-hat" size={13} /> Operator · PT Primacom
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-white/15 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" /> Tersinkron 06:42
          </span>
        </div>
      </div>

      {/* Hero status / clock-in card */}
        <div className="relative z-10 px-5 -mt-10">
          <div className="rounded-[24px] bg-white p-4" style={{ boxShadow:'0 20px 40px -20px rgba(14,79,158,0.5)' }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-subtle">Status hari ini</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-safety-500" />
                  <span className="text-[17px] font-extrabold tracking-tight">Belum Clock In</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 h-6 rounded-full text-[11px] font-bold" style={{ background:'#E7F0FE', color:'#1670C4' }}>
                <Icon name="sunrise" size={13} /> Shift Pagi
              </span>
            </div>

            {/* shift detail row */}
            <div className="mt-3 flex items-center gap-3 rounded-2xl p-3" style={{ background:'#F3F6FB' }}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0" style={{ color:'#1670C4' }}>
                <Icon name="clock" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold leading-tight">06:00 – 14:00</div>
                <div className="text-[11px] text-muted flex items-center gap-1 mt-0.5 truncate">
                  <Icon name="map-pin" size={12} /> PIT Bahana · Bukit Sangatta
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-subtle">Mulai dalam</div>
                <div className="text-[13px] font-extrabold mono" style={{ color:'#1670C4' }}>-01:18</div>
              </div>
            </div>

            {/* CTA */}
            <button className="mt-3 w-full h-[52px] rounded-2xl text-white font-bold text-[15px] inline-flex items-center justify-center gap-2"
                    style={{ background: PC_CTA_GRAD, boxShadow:'0 12px 22px -10px rgba(20,102,190,0.7)' }}>
              <Icon name="fingerprint" size={20} /> Clock In Sekarang
            </button>

            {/* mini stats */}
            <div className="mt-4 grid grid-cols-3 text-center">
              {[
                { v:'168j', l:'Jam bln ini' },
                { v:'10',   l:'Sisa cuti' },
                { v:'1.240',l:'Poin K3' },
              ].map((s, i) => (
                <div key={s.l} className={`flex flex-col ${i>0 ? 'border-l border-token' : ''}`}>
                  <div className="text-[16px] font-extrabold tracking-tight" style={{ color:'#0E4F9E' }}>{s.v}</div>
                  <div className="text-[10px] text-subtle">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* belum clock-out alert */}
        <div className="px-5 mt-3">
          <div className="rounded-2xl p-3 flex items-center gap-2.5" style={{ background:'#FFF4E2', border:'1px solid rgba(243,152,0,0.3)' }}>
            <div className="w-8 h-8 rounded-lg bg-white text-warning-600 flex items-center justify-center shrink-0">
              <Icon name="alert-triangle" size={16} />
            </div>
            <div className="flex-1 min-w-0 text-[12px]">
              <span className="font-bold">Belum clock-out kemarin.</span>
              <span className="text-muted"> Shift Senin 18 Mei.</span>
            </div>
            <button className="text-[12px] font-bold px-2.5 h-8 rounded-lg" style={{ color:'#1670C4' }}>Koreksi</button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-5 mt-5">
          <div className="rounded-[22px] bg-white p-3.5" style={{ boxShadow:'0 10px 30px -22px rgba(15,23,42,0.4)' }}>
            <div className="grid grid-cols-4 gap-y-3">
              <QuickAction icon="fingerprint"    label="Clock In"   tone="blue" />
              <QuickAction icon="calendar-plus"  label="Ajukan Cuti" tone="indigo" />
              <QuickAction icon="receipt"        label="Payslip"    tone="green" />
              <QuickAction icon="bus"            label="Shuttle"    tone="orange" />
              <QuickAction icon="alert-triangle" label="Lapor"      tone="red" />
              <QuickAction icon="file-check-2"   label="PTW"        tone="purple" />
              <QuickAction icon="graduation-cap" label="e-Learning" tone="teal" badge="2" />
              <QuickAction icon="grid-3x3"       label="Lainnya"    tone="gray" />
            </div>
          </div>
        </div>

        {/* Promo / campaign banner */}
        <div className="mt-5">
          <div className="px-5 flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth:'none' }}>
            <div className="relative shrink-0 w-[290px] h-[110px] rounded-2xl overflow-hidden text-white p-4"
                 style={{ background:'linear-gradient(120deg,#0E4F9E 0%,#1670C4 60%,#2E9BE6 100%)' }}>
              <div className="absolute -right-6 -bottom-8 w-28 h-28 rounded-full bg-white/10" />
              <div className="relative">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/80">Kampanye K3</div>
                <div className="mt-1 text-[15px] font-extrabold leading-tight">Zero Harm Mei 2026</div>
                <div className="mt-1 text-[11px] text-white/85 max-w-[190px]">Kumpulkan 500 poin, tukar merchandise safety.</div>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 px-2 h-6 rounded-full">
                  Ikut sekarang <Icon name="arrow-right" size={12} />
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[290px] h-[110px] rounded-2xl overflow-hidden p-4"
                 style={{ background:'linear-gradient(120deg,#F39800 0%,#F5A529 100%)' }}>
              <div className="absolute -right-6 -bottom-8 w-28 h-28 rounded-full bg-white/15" />
              <div className="relative text-white">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/90">Reminder</div>
                <div className="mt-1 text-[15px] font-extrabold leading-tight">Refresh Training K3</div>
                <div className="mt-1 text-[11px] text-white/90 max-w-[190px]">Sertifikat Anda berakhir dalam 24 hari.</div>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold bg-white/25 px-2 h-6 rounded-full">
                  Jadwalkan <Icon name="arrow-right" size={12} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agenda hari ini — timeline */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[13px] font-extrabold tracking-tight">Agenda hari ini</div>
            <div className="text-[11px] text-subtle">Selasa, 19 Mei</div>
          </div>
          <div className="rounded-[22px] bg-white p-4" style={{ boxShadow:'0 10px 30px -22px rgba(15,23,42,0.4)' }}>
            {[
              { t:'05:45', title:'Safety briefing (P5M)', meta:'Ruang muster · wajib', tone:'blue', done:true },
              { t:'06:00', title:'Shift pagi dimulai', meta:'Clock in di gerbang PIT', tone:'blue', done:false, now:true },
              { t:'12:00', title:'Istirahat', meta:'60 menit', tone:'gray', done:false },
              { t:'14:00', title:'Shift selesai', meta:'Clock out', tone:'gray', done:false, last:true },
            ].map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full mt-1" style={{ background: a.now ? '#1670C4' : a.done ? '#12A05C' : '#CBD5E1', boxShadow: a.now ? '0 0 0 4px rgba(22,112,196,0.18)' : 'none' }} />
                  {!a.last && <div className="w-[2px] flex-1 my-1" style={{ background:'#E6E8EC' }} />}
                </div>
                <div className={`flex-1 min-w-0 ${a.last ? '' : 'pb-3'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-extrabold mono" style={{ color: a.now ? '#1670C4' : '#3a4250' }}>{a.t}</span>
                    {a.now && <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background:'#E7F0FE', color:'#1670C4' }}>Sekarang</span>}
                    {a.done && <Icon name="check" size={13} className="text-success-600" />}
                  </div>
                  <div className="text-[13px] font-semibold leading-tight">{a.title}</div>
                  <div className="text-[11px] text-subtle">{a.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aktivitas terbaru */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[13px] font-extrabold tracking-tight">Aktivitas terbaru</div>
            <a className="text-[12px] font-semibold" style={{ color:'#1670C4' }}>Lihat semua</a>
          </div>
          <div className="rounded-[22px] bg-white divide-y divide-[color:var(--border)]" style={{ boxShadow:'0 10px 30px -22px rgba(15,23,42,0.4)' }}>
            {[
              { icon:'check-circle-2', bg:'#E3F7EE', fg:'#12A05C', title:'Cuti tahunan disetujui', meta:'17 Mei · 2 hari', time:'kemarin' },
              { icon:'receipt',        bg:'#E7F0FE', fg:'#1670C4', title:'Payslip April terbit',    meta:'IDR 8.420.000 · netto', time:'2 hari' },
              { icon:'shield-check',   bg:'#F3E9FD', fg:'#9333EA', title:'Training K3 selesai',     meta:'Sertifikat aktif 12 bln', time:'5 hari' },
            ].map((a, i) => (
              <div key={i} className="p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:a.bg, color:a.fg }}>
                  <Icon name={a.icon} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold truncate">{a.title}</div>
                  <div className="text-[11px] text-subtle truncate">{a.meta}</div>
                </div>
                <div className="text-[11px] text-subtle whitespace-nowrap">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 pb-[18px] z-30 bg-white">
        <MobileBottomNav active={0} />
      </div>
    </div>
  );
}

// =================== Export ===================
window.Screen_Splash       = Screen_Splash;
window.Screen_Welcome      = Screen_Welcome;
window.Screen_Login        = Screen_Login;
window.Screen_MFA          = Screen_MFA;
window.Screen_Biometric    = Screen_Biometric;
window.Screen_Permissions  = Screen_Permissions;
window.Screen_Home         = Screen_Home;
