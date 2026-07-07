// Slides app — wraps existing login & onboarding screens as 1920x1080 slides.

const slideMeta = [
  { id:'cover', kind:'cover' },
  { id:'mobile-overview', kind:'overview', tab:'Mobile', sub:'7 screens', count:7 },
  { id:'1.1', kind:'phone', title:'Splash',           comp:'Screen_Splash',      dark:true,  caption:'Brand reveal + loading; menjadi state pertama untuk semua pengguna.' },
  { id:'1.2', kind:'phone', title:'Welcome',          comp:'Screen_Welcome',                 caption:'Entry point — pekerja memilih SSO Nusaraya, kontraktor, atau bantuan IT.' },
  { id:'1.3', kind:'phone', title:'Login (SSO)',      comp:'Screen_Login',                   caption:'Embedded Keycloak (OIDC). Sandbox WebView, satu klik kembali ke aplikasi.' },
  { id:'1.4', kind:'phone', title:'MFA',              comp:'Screen_MFA',                     caption:'OTP 6-digit · 60 detik. Wajib untuk role privileged (SPV/HR/SO/Mgmt/CC).' },
  { id:'1.5', kind:'phone', title:'Biometric setup',  comp:'Screen_Biometric',               caption:'Touch / Face ID untuk membuka aplikasi setelah first login. Token tetap di Keycloak.' },
  { id:'1.6', kind:'phone', title:'Permissions',      comp:'Screen_Permissions',             caption:'Minta GPS, kamera, dan notifikasi — tiap permission dijelaskan kegunaannya.' },
  { id:'1.7', kind:'phone', title:'Home dashboard',   comp:'Screen_Home',                    caption:'Landing pekerja setelah login: shift hari ini, quick actions, SOS.' },
  { id:'web-overview', kind:'overview', tab:'Web', sub:'HR & Admin', count:2 },
  { id:'2.1', kind:'web', title:'Login — Web (split screen)', comp:'WebLogin',
    url:'https://app.nusaraya.id/login',
    caption:'Untuk HR, Admin, Safety Officer, dan Management. Brand storytelling di kiri, form di kanan.' },
  { id:'2.2', kind:'web', title:'HR Dashboard',              comp:'HRDashboard',
    url:'https://app.nusaraya.id/hr/dashboard',
    caption:'Dashboard 12-col grid · KPI utama HR, distribusi shift, dan permit overview.' },
  { id:'tablet-overview', kind:'overview', tab:'Tablet', sub:'Command Center · Live', count:1 },
  { id:'3.1', kind:'tablet', title:'Command Center', comp:'CommandCenter',
    caption:'Dark theme · landscape. Map site, panel SOS, shuttle tracking, dan PTW list real-time.' },
  { id:'closing', kind:'closing' },
];

const SPEAKER_NOTES = [
  /* cover */            "Halo semuanya. Hari ini saya akan tunjukkan flow Login & Onboarding untuk SuperApps Nusaraya — produk internal untuk pekerja, supervisor, HR, dan command center. Saya bagi jadi tiga konteks: mobile untuk pekerja lapangan, web untuk admin di kantor, dan tablet untuk operator command center. Semuanya menggunakan single design system dan single sumber autentikasi Keycloak.",
  /* mobile overview */  "Mulai dari mobile dulu. Ini yang dipakai mayoritas user — pekerja organic Nusaraya dan kontraktor seperti PT KNC. Ada tujuh screen dari saat aplikasi pertama kali dibuka sampai mereka mendarat di home dashboard. Kita rancang flow ini agar bisa dilewati dalam waktu kurang dari satu menit kalau koneksi normal, dan tetap jelas untuk pekerja yang baru pertama kali install.",
  /* 1.1 splash */       "Splash screen pertama. Brand reveal singkat — 1.2 detik — dengan loader di bawah. Tidak ada teks pemasaran karena ini untuk user internal, fokusnya cek koneksi ke backend dan token cache. Kalau ada cached session yang valid, splash langsung lewat ke home.",
  /* 1.2 welcome */      "Welcome screen. Tiga jalur: SSO Nusaraya untuk organic, kontraktor masuk lewat realm Keycloak terpisah, dan tombol bantuan ke IT support. Bahasa Indonesia karena mayoritas pekerja. Tap target besar — minimal 48px — supaya bisa dipakai pakai sarung tangan kerja.",
  /* 1.3 login */        "Login pakai embedded WebView ke keycloak.nusaraya.id. Kenapa tidak custom form? Karena policy keamanan Nusaraya wajib semua autentikasi lewat Keycloak — termasuk password policy, lockout, dan audit log. Tombol back kembali ke aplikasi tanpa kehilangan state.",
  /* 1.4 MFA */          "Setelah password benar, untuk role privileged kita minta MFA. OTP enam digit, valid 60 detik, dikirim via SMS atau authenticator app sesuai preferensi user. Untuk pekerja biasa, MFA opsional — bisa di-skip dan diatur belakangan di profile.",
  /* 1.5 biometric */    "First login satu kali kita tawarkan biometric — Touch ID atau Face ID — untuk membuka aplikasi di sesi berikutnya. Yang penting dipahami: ini cuma membuka local session. Refresh token tetap dari Keycloak, jadi kalau admin revoke akses di backend, biometric pun tidak bisa masuk.",
  /* 1.6 permissions */  "Permission request kita pecah supaya user tahu kenapa masing-masing diminta. GPS untuk geofence absensi dan SOS. Kamera untuk scan QR di pos jaga dan upload bukti incident. Notifikasi untuk alert safety dan reminder shift. Tiap permission punya copy yang jelas — bukan boilerplate iOS.",
  /* 1.7 home */         "Home dashboard. Begitu login selesai, pekerja langsung lihat tiga hal: shift hari ini, quick actions yang relevan dengan role mereka, dan tombol SOS yang selalu visible. SOS sengaja dibuat besar dan kontras karena dalam emergency, user tidak boleh harus mencari.",
  /* web overview */     "Sekarang web. Ini untuk user yang kerjanya di kantor — HR, Safety Officer, Management, dan Admin. Dua screen utama: login split-screen dan dashboard HR sebagai contoh role-based landing. Pola yang sama dipakai untuk role lain dengan widget berbeda.",
  /* 2.1 web login */    "Login web pakai split-screen. Kiri untuk konteks brand dan ringkasan apa yang ada di balik login. Kanan form yang sama dengan mobile — username, password, MFA — tapi dengan keyboard navigation dan password manager support yang proper.",
  /* 2.2 web dashboard */"Setelah login, HR mendarat di dashboard ini. Tiga KPI utama di atas: total active worker, attendance hari ini, dan permit yang expiring. Bawahnya grid widget yang bisa di-rearrange per user preference. Setiap widget link langsung ke modul yang dalam.",
  /* tablet overview */  "Terakhir tablet — khusus untuk command center. Mode landscape, dark theme, dan dirancang untuk dipasang di dinding ruang operator. Tidak ada login per session — device level provisioning, user tap badge mereka untuk audit log.",
  /* 3.1 command */      "Command center view. Map site dengan pin SOS aktif, alert, dan posisi shuttle. Panel kanan menampilkan SOS dengan severity dan MTTR, daftar PTW yang aktif atau hampir habis, dan tracking shuttle dengan ETA. Saat ada SOS baru masuk, alert bar di atas blink dan auto-fokus ke pin terkait.",
  /* closing */          "Itu seluruh flow login dan onboarding. Recap: tiga konteks — mobile, web, tablet — semuanya pakai Keycloak sebagai single sumber auth, design system yang sama, dan ada offline-aware behaviour terutama di mobile karena banyak area site yang sinyalnya tidak stabil. Pertanyaan?",
];

// ============================== Slide helpers ==============================

function SlideShell({ children, label, idx, total, eyebrow, title, sub }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white relative flex" data-screen-label={label}>
      {children}
      {/* Footer */}
      <div className="absolute bottom-8 left-12 right-12 flex items-end justify-between text-[14px] text-subtle pointer-events-none">
        <div className="flex items-center gap-3">
          <BrandMark size={28} ring={false} />
          <div>
            <div className="font-bold text-[color:var(--text)] tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[12px]">Login & Onboarding · v1.0</div>
          </div>
        </div>
        <div className="mono text-[12px]">{String(idx).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
      </div>
    </section>
  );
}

// Cover slide
function SlideCover({ idx, total }) {
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} Cover`} idx={idx} total={total}>
      <div className="relative flex-1 splash-bg overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-20"
             style={{ background:'radial-gradient(circle, #F39800 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full opacity-15"
             style={{ background:'radial-gradient(circle, #4179AE 0%, transparent 70%)' }} />

        <div className="absolute inset-0 flex flex-col justify-center px-32 text-white">
          <div className="inline-flex items-center gap-3 mb-10">
            <BrandMark size={88} />
            <div className="leading-tight">
              <div className="text-[16px] font-semibold tracking-[0.18em] uppercase text-white/70">SuperApps</div>
              <div className="text-[52px] font-extrabold tracking-tight">Nusaraya</div>
            </div>
          </div>
          <div className="text-[24px] font-semibold text-safety-300 mb-3 tracking-wide uppercase" style={{ letterSpacing:'0.18em' }}>Product walkthrough</div>
          <h1 className="text-[96px] font-extrabold tracking-tight leading-[0.95]" style={{ letterSpacing:'-0.025em', textWrap:'balance', maxWidth:1200 }}>
            Login &amp; Onboarding<br/>flow review
          </h1>
          <p className="mt-8 text-[24px] text-white/80 max-w-[1000px] leading-relaxed">
            7 mobile screen, 2 web view, dan 1 tablet command center — single design system, single auth, multi-tenant untuk organic Nusaraya &amp; kontraktor.
          </p>

          <div className="mt-14 flex items-center gap-10 text-[14px]">
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Prepared by</div>
              <div className="text-[18px] font-semibold">Product Design · IR Team</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Stakeholders</div>
              <div className="text-[18px] font-semibold">HR · Safety · IT Sec · Ops</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Tanggal</div>
              <div className="text-[18px] font-semibold mono">25 Mei 2026</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function SlideOverview({ idx, total, tab, sub, count }) {
  const colors = {
    Mobile: { bg:'#EAF1F8', accent:'#1F4E79', icon:'smartphone' },
    Web:    { bg:'#FEF4E5', accent:'#CC7F00', icon:'monitor' },
    Tablet: { bg:'#0A0F18', accent:'#F39800', icon:'tablet' },
  }[tab];
  const dark = tab === 'Tablet';
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${tab} overview`} idx={idx} total={total}>
      <div className="flex-1 flex flex-col justify-center px-32" style={{ background: colors.bg, color: dark?'#fff':'inherit' }}>
        <div className="text-[20px] font-bold uppercase tracking-[0.22em]" style={{ color: colors.accent }}>
          Section {tab === 'Mobile' ? '1' : tab === 'Web' ? '2' : '3'}
        </div>
        <h2 className="text-[140px] font-extrabold tracking-tight leading-none mt-4" style={{ letterSpacing:'-0.03em', color: dark?'#fff':'#0f1115' }}>
          {tab}
        </h2>
        <div className="mt-6 flex items-center gap-6 text-[28px]" style={{ color: dark?'rgba(255,255,255,0.7)':'#5b6472' }}>
          <div className="font-semibold">{sub}</div>
          <span style={{ color: colors.accent }}>·</span>
          <div className="font-semibold mono">{count} screen{count>1?'s':''}</div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-[1400px]">
          {(tab === 'Mobile' ? [
            { ic:'shield-check', t:'Keycloak SSO + MFA', d:'Single auth source untuk semua channel. MFA wajib untuk role privileged.' },
            { ic:'fingerprint',  t:'Biometric app-lock', d:'Touch / Face ID hanya membuka local session — refresh token tetap di server.' },
            { ic:'truck',        t:'Multi-tenant',       d:'Organic & kontraktor (KNC, hauling, dll) lewat realm Keycloak terpisah.' },
          ] : tab === 'Web' ? [
            { ic:'grid-3x3',     t:'12-col grid',        d:'Layout konsisten untuk semua role: HR, Safety Officer, Admin, Management.' },
            { ic:'shield-check', t:'Role-based widget',  d:'Setiap user hanya melihat widget sesuai role-nya — bukan toggle, tapi auto-render.' },
            { ic:'keyboard',     t:'Keyboard-first',     d:'Full keyboard navigation + screen-reader friendly · WCAG AA target.' },
          ] : [
            { ic:'monitor-dot',  t:'Always-on display',  d:'Dipasang di dinding ruang operator. Mode landscape, dark, dan high contrast.' },
            { ic:'badge-check',  t:'Device-level auth',  d:'Tidak ada login per session — operator tap badge untuk audit log per aksi.' },
            { ic:'activity',     t:'Real-time stream',   d:'WebSocket ke event bus — alert SOS tampil dalam <500ms dari trigger lapangan.' },
          ]).map(f => (
            <div key={f.t} className="p-6 rounded-2xl" style={{ background: dark?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.6)', border: dark?'1px solid rgba(255,255,255,0.1)':'1px solid rgba(0,0,0,0.06)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: colors.accent, color:'#fff' }}>
                <Icon name={f.ic} size={26} />
              </div>
              <div className="text-[22px] font-extrabold tracking-tight" style={{ color: dark?'#fff':'#0f1115' }}>{f.t}</div>
              <div className="text-[16px] mt-2 leading-relaxed" style={{ color: dark?'rgba(255,255,255,0.65)':'#5b6472' }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

// Phone slide — phone left, copy right
function SlidePhone({ idx, total, title, comp, dark, caption }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total}>
      <div className="flex-1 grid grid-cols-[820px_1fr] bg-elev">
        {/* Left — phone on plinth */}
        <div className="relative flex items-center justify-center overflow-hidden" style={{ background:'linear-gradient(160deg, #EAF1F8 0%, #CFDDEC 100%)' }}>
          <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full"
               style={{ background:'radial-gradient(circle, rgba(243,152,0,0.18) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full"
               style={{ background:'radial-gradient(circle, rgba(31,78,121,0.18) 0%, transparent 70%)' }} />
          <div style={{ transform:'scale(1.05)' }}>
            <PhoneFrame label="" dark={dark}>
              {Comp ? <Comp /> : <div className="p-8 text-subtle">component missing</div>}
            </PhoneFrame>
          </div>
        </div>

        {/* Right — copy */}
        <div className="flex flex-col justify-center px-20">
          <div className="text-[20px] font-bold uppercase tracking-[0.22em] text-brand-500">
            Mobile · screen {idx-2}/7
          </div>
          <h2 className="text-[88px] font-extrabold tracking-tight leading-[0.95] mt-4" style={{ letterSpacing:'-0.025em' }}>{title}</h2>
          <p className="mt-8 text-[26px] text-muted leading-relaxed max-w-[760px]" style={{ textWrap:'balance' }}>
            {caption}
          </p>

          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-6 max-w-[760px]">
            {(window.PHONE_DETAIL?.[title] || [
              { lbl:'Audience',     val:'Pekerja lapangan' },
              { lbl:'Tap target',   val:'≥ 48px (gloved)' },
              { lbl:'Bahasa',       val:'Indonesia' },
              { lbl:'Offline',      val:'Cached state' },
            ]).map(d => (
              <div key={d.lbl}>
                <div className="text-[14px] font-bold uppercase tracking-[0.16em] text-subtle mb-1">{d.lbl}</div>
                <div className="text-[20px] font-bold">{d.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// Per-phone details
window.PHONE_DETAIL = {
  'Splash': [
    { lbl:'Durasi',      val:'± 1.2 detik' },
    { lbl:'Action',      val:'Cek token + ping API' },
    { lbl:'Bahasa',      val:'Indonesia' },
    { lbl:'Fallback',    val:'Cached session → home' },
  ],
  'Welcome': [
    { lbl:'Audience',    val:'First-time / logout' },
    { lbl:'Jalur',       val:'Organic · Kontraktor · IT' },
    { lbl:'Tap target',  val:'≥ 48px (gloved)' },
    { lbl:'Lokalisasi',  val:'ID-default · EN opsional' },
  ],
  'Login (SSO)': [
    { lbl:'Provider',    val:'Keycloak OIDC' },
    { lbl:'Realm',       val:'nusaraya · kontraktor-knc' },
    { lbl:'Mode',        val:'Embedded WebView' },
    { lbl:'Recovery',    val:'Lupa password → HR' },
  ],
  'MFA': [
    { lbl:'Format',      val:'OTP 6 digit · 60 detik' },
    { lbl:'Channel',     val:'SMS · Authenticator' },
    { lbl:'Wajib untuk', val:'SPV · HR · SO · Mgmt · CC' },
    { lbl:'Lockout',     val:'5 attempt · 15 menit' },
  ],
  'Biometric setup': [
    { lbl:'iOS',         val:'Touch ID · Face ID' },
    { lbl:'Android',     val:'Fingerprint · Face' },
    { lbl:'Scope',       val:'Local session unlock' },
    { lbl:'Skip',        val:'Opsional · re-prompt H+7' },
  ],
  'Permissions': [
    { lbl:'GPS',         val:'Absensi geofence · SOS' },
    { lbl:'Kamera',      val:'QR scan · bukti incident' },
    { lbl:'Notifikasi',  val:'Safety alert · shift' },
    { lbl:'Pola',        val:'Pre-prompt · contextual' },
  ],
  'Home dashboard': [
    { lbl:'Layout',      val:'Header · grid · SOS' },
    { lbl:'Shift card',  val:'Live timer + lokasi' },
    { lbl:'Quick action',val:'Role-aware · 4-6 tile' },
    { lbl:'SOS',         val:'Persistent · 1-tap' },
  ],
};

// Web slide — full browser frame
function SlideWeb({ idx, total, title, comp, url, caption }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total}>
      <div className="flex-1 flex flex-col bg-elev px-16 pt-16 pb-28">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[18px] font-bold uppercase tracking-[0.22em] text-safety-600">Web · {idx-9} / 2</div>
            <h2 className="text-[64px] font-extrabold tracking-tight leading-none mt-3" style={{ letterSpacing:'-0.025em' }}>{title}</h2>
          </div>
          <div className="text-[18px] text-muted max-w-[760px] text-right leading-relaxed">{caption}</div>
        </div>

        {/* Browser chrome */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-token shadow-2xl bg-white flex flex-col">
          <div className="h-10 bg-elev border-b border-token flex items-center px-4 gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ED6A5E]" />
              <span className="w-3 h-3 rounded-full bg-[#F5BF4F]" />
              <span className="w-3 h-3 rounded-full bg-[#62C455]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white border border-token rounded-md h-7 px-3 text-[12px] mono text-subtle inline-flex items-center gap-1.5 min-w-[420px] justify-center">
                <Icon name="lock" size={12} /> {url}
              </div>
            </div>
            <div className="w-12" />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            {Comp ? <Comp /> : <div className="p-8 text-subtle">component missing</div>}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// Tablet slide — command center, dark
function SlideTablet({ idx, total, title, comp, caption }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total}>
      <div className="flex-1 flex flex-col px-16 pt-16 pb-28" style={{ background:'#0A0F18', color:'#fff' }}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[18px] font-bold uppercase tracking-[0.22em] text-safety-400">Tablet · Command Center</div>
            <h2 className="text-[64px] font-extrabold tracking-tight leading-none mt-3" style={{ letterSpacing:'-0.025em' }}>{title}</h2>
          </div>
          <div className="text-[18px] text-white/70 max-w-[760px] text-right leading-relaxed">{caption}</div>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {Comp ? <Comp /> : <div className="p-8 text-white/50">component missing</div>}
        </div>
      </div>
      {/* Override footer text color for dark */}
      <style>{`section[data-screen-label="${String(idx).padStart(2,'0')} ${title}"] .text-subtle { color: rgba(255,255,255,0.7); } section[data-screen-label="${String(idx).padStart(2,'0')} ${title}"] [data-screen-label]>div:last-child { color: rgba(255,255,255,0.95)!important; }`}</style>
    </SlideShell>
  );
}

// Closing
function SlideClosing({ idx, total }) {
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} Q&A`} idx={idx} total={total}>
      <div className="relative flex-1 splash-bg overflow-hidden flex flex-col items-center justify-center text-white px-32">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-20"
             style={{ background:'radial-gradient(circle, #F39800 0%, transparent 70%)' }} />

        <BrandMark size={120} />
        <div className="mt-12 text-[28px] font-bold uppercase tracking-[0.22em] text-safety-300">Diskusi &amp; Q&amp;A</div>
        <h2 className="mt-6 text-[120px] font-extrabold tracking-tight leading-[0.95] text-center" style={{ letterSpacing:'-0.025em' }}>
          Terima kasih.
        </h2>
        <p className="mt-10 text-[24px] text-white/75 text-center max-w-[1200px] leading-relaxed">
          Feedback dan pertanyaan ditunggu — terutama dari tim Safety dan HR untuk validasi business rules sebelum kita masuk ke development sprint berikutnya.
        </p>

        <div className="mt-16 flex items-center gap-16 text-[16px]">
          <div className="text-center">
            <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Next step</div>
            <div className="text-[20px] font-semibold">User testing · 28 Mei</div>
          </div>
          <div className="w-px h-14 bg-white/20" />
          <div className="text-center">
            <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Sprint kick-off</div>
            <div className="text-[20px] font-semibold mono">02 Juni 2026</div>
          </div>
          <div className="w-px h-14 bg-white/20" />
          <div className="text-center">
            <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Channel</div>
            <div className="text-[20px] font-semibold">#superapps-design</div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ============================== App ==============================
function App() {
  React.useEffect(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } });
  });

  const total = slideMeta.length;

  return (
    <deck-stage>
      {slideMeta.map((s, i) => {
        const idx = i + 1;
        const props = { idx, total };
        if (s.kind === 'cover')    return <SlideCover    key={s.id} {...props} />;
        if (s.kind === 'overview') return <SlideOverview key={s.id} {...props} tab={s.tab} sub={s.sub} count={s.count} />;
        if (s.kind === 'phone')    return <SlidePhone    key={s.id} {...props} title={s.title} comp={s.comp} dark={s.dark} caption={s.caption} />;
        if (s.kind === 'web')      return <SlideWeb      key={s.id} {...props} title={s.title} comp={s.comp} url={s.url} caption={s.caption} />;
        if (s.kind === 'tablet')   return <SlideTablet   key={s.id} {...props} title={s.title} comp={s.comp} caption={s.caption} />;
        if (s.kind === 'closing')  return <SlideClosing  key={s.id} {...props} />;
        return null;
      })}
    </deck-stage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
