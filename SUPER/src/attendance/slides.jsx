// Slides app — wraps Attendance Module screens as 1920×1080 slides.

const slideMeta = [
  { id:'cover', kind:'cover' },
  { id:'mobile-overview', kind:'overview', tab:'Mobile' },

  { id:'A1', kind:'phone', title:'Home dashboard',     comp:'Screen_Home', clockedIn:true, dark:true,
    caption:'Landing pekerja setelah login. State on-shift menampilkan timer durasi, lokasi, dan timeline aktivitas hari ini.',
    spec:[
      { lbl:'State',        val:'2 mode · belum / on-shift' },
      { lbl:'Live clock',   val:'WITA · per detik' },
      { lbl:'Quick action', val:'Clock-in · riwayat · koreksi' },
      { lbl:'Timeline',     val:'Live · break aware' },
    ]},
  { id:'A2', kind:'phone', title:'Pilih metode',       comp:'Screen_Method',
    caption:'Setelah geofence 100m terverifikasi, pekerja memilih method. QR jadi primary, RFID alternatif, GPS hanya fallback.',
    spec:[
      { lbl:'Geofence',     val:'100m · auto-toleransi' },
      { lbl:'Method',       val:'QR · RFID · GPS · Face (P2)' },
      { lbl:'Default',      val:'QR Code' },
      { lbl:'Fallback',     val:'GPS-only di area tanpa pos' },
    ]},
  { id:'A3', kind:'phone', title:'QR Scanner',         comp:'Screen_Scanner', dark:true,
    caption:'Camera viewfinder dengan corner frame oranye dan scan line. Banner hijau memastikan GPS valid sebelum scan diterima.',
    spec:[
      { lbl:'Mode',         val:'Full-screen camera' },
      { lbl:'Indikator',    val:'GPS banner · akurasi ±4m' },
      { lbl:'Animasi',      val:'Scan line + corner glow' },
      { lbl:'Cancel',       val:'Always-visible button' },
    ]},
  { id:'A4', kind:'phone', title:'Success',            comp:'Screen_Success', offline:false,
    caption:'Animated check dengan ring-expand. Receipt lengkap menampilkan waktu, lokasi, method, dan status on-time.',
    spec:[
      { lbl:'Animasi',      val:'Ring expand + check pop' },
      { lbl:'Detail',       val:'Time · location · method · status' },
      { lbl:'Akurasi GPS',  val:'±4m · 12m dari titik' },
      { lbl:'Share',        val:'WhatsApp bukti opsional' },
    ]},
  { id:'A5', kind:'phone', title:'Offline success',    comp:'Screen_Success', offline:true,
    caption:'Variant kuning untuk koneksi terputus — clock-in tetap tercatat lokal dengan counter antrian sync di pojok.',
    spec:[
      { lbl:'Banner',       val:'Kuning · cloud-off icon' },
      { lbl:'Queue',        val:'Counter "3 antri"' },
      { lbl:'Storage',      val:'SQLite local + idempotency' },
      { lbl:'Sync',         val:'Auto saat reconnect' },
    ]},
  { id:'A6', kind:'phone', title:'Riwayat (heatmap)',   comp:'Screen_Riwayat',
    caption:'Calendar heatmap 30 hari. Hijau on-time, kuning telat, merah absent, biru cuti — pattern langsung terbaca.',
    spec:[
      { lbl:'Periode',      val:'30 hari · scrollable' },
      { lbl:'Status',       val:'5 warna konsisten' },
      { lbl:'Summary',      val:'Hadir / telat / cuti count' },
      { lbl:'Export',       val:'PDF · share' },
    ]},
  { id:'A7', kind:'phone', title:'Detail per hari',     comp:'Screen_Detail',
    caption:'Bottom sheet dari kalender. Tampilkan clock-in/out, durasi, OT, dan tap untuk ajukan koreksi langsung.',
    spec:[
      { lbl:'Trigger',      val:'Tap tanggal di A6' },
      { lbl:'Stats',        val:'In · out · durasi · OT' },
      { lbl:'Entries',      val:'Method + lokasi per event' },
      { lbl:'Action',       val:'Slip kerja · ajukan koreksi' },
    ]},
  { id:'A8', kind:'phone', title:'Form koreksi',        comp:'Screen_Correction',
    caption:'Pengajuan koreksi lengkap: jenis, tanggal, alasan, bukti foto, dan supervisor approver. Proses 1×24 jam.',
    spec:[
      { lbl:'Jenis',        val:'Lupa in · out · keduanya' },
      { lbl:'Bukti',        val:'Hingga 3 foto · galeri / camera' },
      { lbl:'Approver',     val:'Supervisor · NIK terverifikasi' },
      { lbl:'SLA',          val:'1×24 jam · auto-reminder' },
    ]},

  { id:'web-overview', kind:'overview', tab:'Web' },

  { id:'W1', kind:'web', title:'HR Dashboard — Live',  comp:'HR_LIVE',
    url:'https://app.nusaraya.id/hr/attendance',
    caption:'Live monitoring 2,547 karyawan dengan KPI top, filter komprehensif, dan tabel sortable. Klik baris untuk drawer detail.' },
  { id:'W2', kind:'web', title:'Drawer detail (90-day heatmap)', comp:'HR_DRAWER',
    url:'https://app.nusaraya.id/hr/attendance',
    caption:'Slide-in drawer dengan 4 tab: Profile, Attendance (heatmap 90 hari), Leave, Performance. Bisa multi-row navigation.' },
  { id:'W3', kind:'web', title:'Supervisor Approval Inbox', comp:'ApprovalInbox',
    url:'https://app.nusaraya.id/spv/inbox',
    caption:'Bulk select + approve / reject inline. Setiap aksi punya audit trail. Filter by type, tanggal, requestor.' },

  { id:'closing', kind:'closing' },
];

// Wrappers for web variants
function HR_LIVE() {
  return <HRDashboard onPickRow={() => {}} />;
}
function HR_DRAWER() {
  const row = { name:'Budi Santoso', nik:'NSR-009281', dept:'Mining Ops' };
  return (
    <div className="relative h-full">
      <HRDashboard onPickRow={() => {}} />
      <DetailDrawer row={row} onClose={() => {}} />
    </div>
  );
}
window.HR_LIVE = HR_LIVE;
window.HR_DRAWER = HR_DRAWER;

// ============================== Slide shells ==============================

function SlideShell({ children, label, idx, total }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white relative flex" data-screen-label={label}>
      {children}
      <div className="absolute bottom-8 left-12 right-12 flex items-end justify-between text-[14px] text-subtle pointer-events-none">
        <div className="flex items-center gap-3">
          <BrandMark size={28} ring={false} />
          <div>
            <div className="font-bold text-[color:var(--text)] tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[12px]">Attendance Module · PoC #1</div>
          </div>
        </div>
        <div className="mono text-[12px]">{String(idx).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
      </div>
    </section>
  );
}

function SlideCover({ idx, total }) {
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} Cover`} idx={idx} total={total}>
      <div className="relative flex-1 overflow-hidden"
           style={{ background:`
            radial-gradient(120% 80% at 20% 10%, rgba(243,152,0,0.55) 0%, transparent 55%),
            radial-gradient(140% 80% at 90% 100%, rgba(243,152,0,0.20) 0%, transparent 60%),
            linear-gradient(180deg, #0A2E54 0%, #0C3C6E 38%, #1670C4 62%, #3D85E0 96%)`}}>
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-20"
             style={{ background:'radial-gradient(circle, #F39800 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full opacity-15"
             style={{ background:'radial-gradient(circle, #3D85E0 0%, transparent 70%)' }} />

        <div className="absolute inset-0 flex flex-col justify-center px-32 text-white">
          <div className="inline-flex items-center gap-3 mb-10">
            <BrandMark size={88} />
            <div className="leading-tight">
              <div className="text-[16px] font-semibold tracking-[0.18em] uppercase text-white/70">SuperApps Nusaraya</div>
              <div className="text-[52px] font-extrabold tracking-tight">Module · Attendance</div>
            </div>
          </div>
          <div className="text-[24px] font-semibold text-safety-300 mb-3 tracking-wide uppercase" style={{ letterSpacing:'0.18em' }}>PoC #1 · review session</div>
          <h1 className="text-[96px] font-extrabold tracking-tight leading-[0.95]" style={{ letterSpacing:'-0.025em', textWrap:'balance', maxWidth:1300 }}>
            Attendance flow<br/>— mobile &amp; web
          </h1>
          <p className="mt-8 text-[24px] text-white/80 max-w-[1100px] leading-relaxed">
            8 mobile screen, 3 web screen. Multi-method clock-in (QR · RFID · GPS), geofence 100m, offline-first sync, dan drawer detail dengan heatmap 90 hari.
          </p>

          <div className="mt-14 flex items-center gap-10 text-[14px]">
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Prepared by</div>
              <div className="text-[18px] font-semibold">Product Design · IR Team</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Reviewer</div>
              <div className="text-[18px] font-semibold">HR · Mining Ops · IT Sec</div>
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

function SlideOverview({ idx, total, tab }) {
  const cfg = {
    Mobile: { bg:'#EAF2FE', accent:'#1670C4', dark:false, sub:'9 screens · iPhone',
      features:[
        { ic:'qr-code',   t:'Multi-method clock-in', d:'QR Code (primary), RFID (Smart Card), GPS-only (fallback). Phase 2: Face Recognition di lokasi tanpa pos jaga.' },
        { ic:'map-pin',   t:'Geofence 100m',         d:'Validasi koordinat sebelum scan QR aktif. Toleransi akurasi GPS ±10m otomatis disesuaikan.' },
        { ic:'cloud-off', t:'Offline-first',         d:'Data tersimpan SQLite lokal. Sync otomatis saat reconnect dengan idempotency key untuk cegah duplikat.' },
      ]},
    Web: { bg:'#FEF4E5', accent:'#CC7F00', dark:false, sub:'HR Admin + Supervisor',
      features:[
        { ic:'filter',     t:'Filter komprehensif', d:'Tanggal range, department, lokasi, shift, kontraktor. Saved filter untuk monitoring rutin.' },
        { ic:'sidebar',    t:'Drawer detail',        d:'Klik baris → drawer kanan dengan 4 tab: Profile, Attendance (90-day heatmap), Leave, Performance.' },
        { ic:'check-check',t:'Bulk approval',        d:'SPV bisa pilih banyak request sekaligus. Setiap aksi tercatat di audit trail untuk compliance.' },
      ]},
  }[tab];

  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${tab} overview`} idx={idx} total={total}>
      <div className="flex-1 flex flex-col justify-center px-32" style={{ background: cfg.bg }}>
        <div className="text-[20px] font-bold uppercase tracking-[0.22em]" style={{ color: cfg.accent }}>
          Section {tab === 'Mobile' ? '1' : '2'}
        </div>
        <h2 className="text-[140px] font-extrabold tracking-tight leading-none mt-4" style={{ letterSpacing:'-0.03em' }}>
          {tab}
        </h2>
        <div className="mt-6 text-[28px] font-semibold text-muted">{cfg.sub}</div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-[1500px]">
          {cfg.features.map(f => (
            <div key={f.t} className="p-7 rounded-2xl bg-white/70 border border-black/5">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white" style={{ background: cfg.accent }}>
                <Icon name={f.ic} size={26} />
              </div>
              <div className="text-[24px] font-extrabold tracking-tight">{f.t}</div>
              <div className="text-[17px] mt-2 leading-relaxed text-muted">{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function SlidePhone({ idx, total, title, comp, dark, caption, spec, screenNum, clockedIn, offline }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total}>
      <div className="flex-1 grid grid-cols-[820px_1fr] bg-elev">
        <div className="relative flex items-center justify-center overflow-hidden" style={{ background:'linear-gradient(160deg, #EAF2FE 0%, #CFE0FB 100%)' }}>
          <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full"
               style={{ background:'radial-gradient(circle, rgba(243,152,0,0.18) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full"
               style={{ background:'radial-gradient(circle, rgba(22,112,196,0.18) 0%, transparent 70%)' }} />
          <div style={{ transform:'scale(1.05)' }}>
            <PhoneFrame label="" dark={dark}>
              {comp === 'Screen_Home'    && <Comp clockedIn={!!clockedIn} setClockedIn={() => {}} />}
              {comp === 'Screen_Success' && <Comp offline={!!offline} />}
              {comp !== 'Screen_Home' && comp !== 'Screen_Success' && Comp && <Comp />}
            </PhoneFrame>
          </div>
        </div>

        <div className="flex flex-col justify-center px-20">
          <div className="text-[20px] font-bold uppercase tracking-[0.22em] text-brand-500">
            Mobile · {screenNum}
          </div>
          <h2 className="text-[88px] font-extrabold tracking-tight leading-[0.95] mt-4" style={{ letterSpacing:'-0.025em' }}>{title}</h2>
          <p className="mt-8 text-[26px] text-muted leading-relaxed max-w-[760px]" style={{ textWrap:'balance' }}>{caption}</p>

          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-7 max-w-[780px]">
            {spec.map(d => (
              <div key={d.lbl}>
                <div className="text-[14px] font-bold uppercase tracking-[0.16em] text-subtle mb-1">{d.lbl}</div>
                <div className="text-[20px] font-bold leading-snug">{d.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function SlideWeb({ idx, total, title, comp, url, caption, screenNum }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total}>
      <div className="flex-1 flex flex-col bg-elev px-16 pt-16 pb-28">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[18px] font-bold uppercase tracking-[0.22em] text-safety-600">Web · {screenNum}</div>
            <h2 className="text-[64px] font-extrabold tracking-tight leading-none mt-3" style={{ letterSpacing:'-0.025em' }}>{title}</h2>
          </div>
          <div className="text-[18px] text-muted max-w-[820px] text-right leading-relaxed">{caption}</div>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden border border-token shadow-2xl bg-white flex flex-col min-h-0">
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

function SlideClosing({ idx, total }) {
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} Q&A`} idx={idx} total={total}>
      <div className="relative flex-1 overflow-hidden flex flex-col items-center justify-center text-white px-32"
           style={{ background:`
            radial-gradient(120% 80% at 20% 10%, rgba(243,152,0,0.55) 0%, transparent 55%),
            radial-gradient(140% 80% at 90% 100%, rgba(243,152,0,0.20) 0%, transparent 60%),
            linear-gradient(180deg, #0A2E54 0%, #0C3C6E 38%, #1670C4 62%, #3D85E0 96%)`}}>
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-20"
             style={{ background:'radial-gradient(circle, #F39800 0%, transparent 70%)' }} />

        <BrandMark size={120} />
        <div className="mt-12 text-[28px] font-bold uppercase tracking-[0.22em] text-safety-300">Diskusi &amp; Q&amp;A</div>
        <h2 className="mt-6 text-[120px] font-extrabold tracking-tight leading-[0.95] text-center" style={{ letterSpacing:'-0.025em' }}>
          Terima kasih.
        </h2>
        <p className="mt-10 text-[24px] text-white/75 text-center max-w-[1200px] leading-relaxed">
          Validasi business rules dari HR &amp; Mining Ops, plus IT Sec untuk policy MFA &amp; geofence — siap dipindah ke development sprint 1 setelah review ini.
        </p>

        <div className="mt-16 flex items-center gap-16 text-[16px]">
          <div className="text-center">
            <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Next module</div>
            <div className="text-[20px] font-semibold">ESS · Catering</div>
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
  // Compute screen numbers
  let mobileNum = 0, webNum = 0;
  slideMeta.forEach(s => {
    if (s.kind === 'phone') { mobileNum++; s.__screenNum = `${mobileNum}/8`; }
    if (s.kind === 'web')   { webNum++; s.__screenNum = `${webNum}/3`; }
  });

  return (
    <deck-stage>
      {slideMeta.map((s, i) => {
        const idx = i + 1;
        const props = { idx, total };
        if (s.kind === 'cover')    return <SlideCover    key={s.id} {...props} />;
        if (s.kind === 'overview') return <SlideOverview key={s.id} {...props} tab={s.tab} />;
        if (s.kind === 'phone')    return <SlidePhone    key={s.id} {...props} title={s.title} comp={s.comp} dark={s.dark} caption={s.caption} spec={s.spec} screenNum={s.__screenNum} clockedIn={s.clockedIn} offline={s.offline} />;
        if (s.kind === 'web')      return <SlideWeb      key={s.id} {...props} title={s.title} comp={s.comp} url={s.url} caption={s.caption} screenNum={s.__screenNum} />;
        if (s.kind === 'closing')  return <SlideClosing  key={s.id} {...props} />;
        return null;
      })}
    </deck-stage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
