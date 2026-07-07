// Slides app — wraps Catering / Mess Management screens as 1920×1080 slides.

const slideMeta = [
  { id:'cover', kind:'cover' },

  // ===== Worker Mobile =====
  { id:'worker-overview', kind:'overview', tab:'Worker', sub:'Mobile · 7 screens',
    color:{ bg:'#FFF6E8', accent:'#E68506' },
    features:[
      { ic:'qr-code', t:'QR · RFID · Manual', d:'3 method klaim — QR di app, tap kartu RFID di reader, atau berikan NIK ke petugas saat walk-in.' },
      { ic:'leaf',    t:'Diet-aware',         d:'Vegetarian, halal, no-pork, gluten-free, alergi spesifik — semua di-track untuk forecast dan menu pengganti.' },
      { ic:'trophy',  t:'Gamification',       d:'Streak harian, claim rate, leaderboard tim — encourage worker untuk klaim dan reduce no-show.' },
    ]},
  { id:'M1', kind:'phone', title:'Catering Home',     comp:'M_Home',
    caption:'Landing pekerja. Hero menu hari ini, 3 voucher slot horizontal-scrollable (claimed/active/locked), lokasi mess, streak gamification.',
    spec:[
      { lbl:'Slot',         val:'Sarapan · Siang · Malam' },
      { lbl:'State',        val:'Claimed · active · locked' },
      { lbl:'Hero',         val:'Foto + vendor + rating' },
      { lbl:'Gamif',        val:'52/57 · streak 14 hari' },
    ]},
  { id:'M2', kind:'phone', title:'Detail Menu',       comp:'M_Detail',
    caption:'Tap menu hari ini. Breakdown komposisi (karb/protein/sayur/buah), kalori, alergen warning, rating vendor, rate menu kemarin.',
    spec:[
      { lbl:'Composition',  val:'5 kategori + kalori' },
      { lbl:'Allergen',     val:'Banner danger jika ada' },
      { lbl:'Vendor',       val:'Rating + jumlah review' },
      { lbl:'Quick rate',   val:'5-bintang menu kemarin' },
    ]},
  { id:'M3', kind:'phone', title:'Klaim voucher (QR)', comp:'M_ClaimQR',
    caption:'QR voucher unik per slot dengan brightness auto-maks. Worker info di atas, validity di bawah, alternatif tap RFID.',
    spec:[
      { lbl:'QR',           val:'Unik per voucher · pulse' },
      { lbl:'Worker info',  val:'Foto · NIK · dept' },
      { lbl:'Validity',     val:'Voucher ID + jam expires' },
      { lbl:'Alternative',  val:'Tap RFID Smart Card' },
    ]},
  { id:'M4', kind:'phone', title:'Sukses klaim',      comp:'M_Success',
    caption:'Confetti subtle, ring-expand check, ticket-style receipt dengan menu, lokasi, vendor. Quick action rate + preview menu malam.',
    spec:[
      { lbl:'Animasi',      val:'Ring expand + confetti' },
      { lbl:'Receipt',      val:'Foto menu + 4 field detail' },
      { lbl:'Quick rate',   val:'5-bintang langsung' },
      { lbl:'CTA',          val:'Menu malam · selesai' },
    ]},
  { id:'M5', kind:'phone', title:'Riwayat klaim',     comp:'M_Riwayat',
    caption:'Calendar heatmap 30 hari dengan 3 dot per tanggal (sarapan/siang/malam). Hijau claimed, kuning pending, merah missed.',
    spec:[
      { lbl:'Heatmap',      val:'30 hari · 3 dot/hari' },
      { lbl:'Summary',      val:'87% claim rate bulan ini' },
      { lbl:'Breakdown',    val:'Per slot · per tanggal' },
      { lbl:'Tap row',      val:'Detail + rating diberikan' },
    ]},
  { id:'M6', kind:'phone', title:'Special diet',      comp:'M_Diet',
    caption:'Setup preferensi (vegetarian, no-pork default muslim, gluten-free, puasa), multi-select alergi, catatan untuk kitchen.',
    spec:[
      { lbl:'Berlaku',      val:'H+1 forecast dapur' },
      { lbl:'Toggle',       val:'5 preferensi utama' },
      { lbl:'Alergi',       val:'Multi-select chips' },
      { lbl:'Catatan',      val:'200 char ke dapur' },
    ]},
  { id:'M7', kind:'phone', title:'Walk-in mode',      comp:'M_Walkin', dark:true,
    caption:'Untuk pekerja tanpa app. Tap kartu RFID di reader, atau berikan NIK ke petugas. Mode dark + ilustrasi tap card animasi.',
    spec:[
      { lbl:'Mode',         val:'Tanpa app · fallback' },
      { lbl:'Method',       val:'RFID tap · NIK manual' },
      { lbl:'Visual',       val:'Dark · tap animation' },
      { lbl:'Backup',       val:'Untuk lost-card situation' },
    ]},

  // ===== Scanner =====
  { id:'scanner-overview', kind:'overview', tab:'Scanner', sub:'Doorkeeper · tablet dark',
    color:{ bg:'#0A0F18', accent:'#F39800', dark:true },
    features:[
      { ic:'monitor-dot', t:'Dark mode',     d:'Background gelap untuk reduce eye strain di pintu mess yang sering outdoor / kanopi terbuka.' },
      { ic:'volume-2',    t:'Audio feedback',d:'Suara "berhasil" / "ditolak" — operator tidak perlu lihat layar untuk tahu hasil scan.' },
      { ic:'hand',        t:'Large hit-target',d:'Tombol besar untuk dipakai dengan sarung tangan kerja. Hit-target minimum 56px.' },
    ]},
  { id:'W1', kind:'tablet', title:'Scanner Console',          comp:'ScannerConsole_NoModal',
    caption:'Console operator di pintu mess. Camera viewfinder dengan corner frame oranye, sidebar 5 scan terakhir, bottom counter live progress.',
    spec:[
      { lbl:'Mode',         val:'QR · RFID · Manual' },
      { lbl:'Sidebar',      val:'5 scan terakhir · live' },
      { lbl:'Counter',      val:'1,234 / 1,450 (85%)' },
      { lbl:'Operator',     val:'Audit per scan' },
    ]},
  { id:'W2', kind:'tablet', title:'Manual entry & override',  comp:'ScannerManualEntry',
    caption:'Untuk pekerja yang tidak bawa kartu/HP. Search NIK atau nama, verifikasi foto on file, alasan walk-in tercatat di audit log.',
    spec:[
      { lbl:'Search',       val:'NIK · nama · 3 hasil' },
      { lbl:'Verify',       val:'Foto on file H+3 bulan' },
      { lbl:'Eligibility',  val:'Cek cuti · roster · slot' },
      { lbl:'Audit',        val:'Alasan walk-in mandatory' },
    ]},

  // ===== FAC Admin =====
  { id:'fac-overview', kind:'overview', tab:'FAC Admin', sub:'6 screens · web',
    color:{ bg:'#EAF1F8', accent:'#1F4E79' },
    features:[
      { ic:'sliders',     t:'Forecast tool',     d:'H-1 jam 15:00 auto-lock. Composite dari roster + visitor + OT − leave − off-site. Target akurasi ±5%.' },
      { ic:'truck',       t:'Vendor SLA',        d:'On-time delivery %, waste rate, satisfaction, compliance docs (halal, food safety, hygiene).' },
      { ic:'radar',       t:'Live monitor',      d:'Map mess locations, stream feed real-time, velocity vs expected, anomaly detection auto-flag.' },
    ]},
  { id:'W4', kind:'web', title:'Dashboard',         comp:'FacDashboard',
    url:'https://app.nusaraya.id/fac/catering/w4',
    caption:'KPI top, banner slot aktif dengan velocity, 3-column status per slot (sarapan/siang/malam), trend redemption 7 hari.' },
  { id:'W5', kind:'web', title:'Menu planning',     comp:'FacMenuPlanning',
    url:'https://app.nusaraya.id/fac/catering/w5',
    caption:'Calendar view weekly · per cell 3 slot menu. Validation otomatis cegah protein sama 2 hari berturut, vendor belum di-assign.' },
  { id:'W6', kind:'web', title:'Vendor management', comp:'FacVendor',
    url:'https://app.nusaraya.id/fac/catering/w6',
    caption:'4 vendor: rating, cost/porsi, SLA on-time, waste, kontrak periode, compliance certificates, top performer mingguan.' },
  { id:'W7', kind:'web', title:'Headcount forecast', comp:'FacForecast',
    url:'https://app.nusaraya.id/fac/catering/w7',
    caption:'CRITICAL TOOL · sumber data composite, breakdown per lokasi + special diet, adjustment slider, lock H-1 dengan reason.' },
  { id:'W8', kind:'web', title:'Live monitor',      comp:'FacMonitor',
    url:'https://app.nusaraya.id/fac/catering/w8',
    caption:'Map mess locations dengan counter live, stream feed real-time, velocity vs expected, anomaly detector auto-suggest action.' },
  { id:'W9', kind:'web', title:'Feedback',          comp:'FacFeedback',
    url:'https://app.nusaraya.id/fac/catering/w9',
    caption:'Sentiment KPI, tab open/resolved, per-card respond/escalate/mark-resolved. Filter by vendor untuk performance review.' },

  // ===== Kitchen =====
  { id:'kitchen-overview', kind:'overview', tab:'Kitchen', sub:'Vendor staff · 2 screens',
    color:{ bg:'#FBF7F1', accent:'#5C8C44' },
    features:[
      { ic:'clipboard-list',  t:'Auto recipe calc', d:'Forecast porsi → quantity bahan baku otomatis. 1,800 porsi = 360kg beras + 1,800 paha ayam.' },
      { ic:'thermometer',     t:'Food safety',       d:'Hot box temperature monitoring per lokasi. Alert jika drop ke <60°C untuk compliance HACCP.' },
      { ic:'camera',          t:'Quality photos',    d:'Foto per 30 menit untuk audit FAC dan end-of-day food safety report.' },
    ]},
  { id:'W10', kind:'web', title:'Production sheet', comp:'KitchenProduction',
    url:'https://kitchen.nusaraya.id/w10',
    caption:'Locked forecast dari FAC + breakdown special diet. Resep auto-calc bahan baku, checklist 7-step dengan timestamp, allergen-aware list.' },
  { id:'W11', kind:'web', title:'Service operations',comp:'KitchenService',
    url:'https://kitchen.nusaraya.id/w11',
    caption:'Counter prepared/served/remaining real-time. Hot box temp per lokasi (food safety). Photo upload + waste prediction.' },

  // ===== Management =====
  { id:'mgmt-overview', kind:'overview', tab:'Management', sub:'Analytics',
    color:{ bg:'#FEF4E5', accent:'#CC7F00' },
    features:[
      { ic:'sparkles', t:'AI insights actionable', d:'Auto-detect Friday lunch dip, vendor cost gap, lokasi over-forecast. Rekomendasi konkret dengan confidence score.' },
      { ic:'target',   t:'Tied to board KPI',      d:'Cost/porsi, waste rate, satisfaction — semua terikat target board-level dan budget bulanan.' },
      { ic:'download', t:'Export & drill-down',    d:'PDF executive summary, Excel raw data, drill per lokasi/vendor/department/slot.' },
    ]},
  { id:'W12', kind:'web', title:'Analytics & AI insights', comp:'ManagementAnalytics',
    url:'https://app.nusaraya.id/mgmt/catering',
    caption:'5 KPI top, trend chart 12-bulan, vendor comparison, heatmap jam×hari, AI insights dengan confidence, cost breakdown waterfall.' },

  { id:'closing', kind:'closing' },
];

// Scanner wrapper without modal
function ScannerConsole_NoModal() {
  return <ScannerConsole showInvalidModal={() => {}} />;
}
window.ScannerConsole_NoModal = ScannerConsole_NoModal;

// ============================== Slide shells ==============================

function SlideShell({ children, label, idx, total, darkFooter }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white relative flex" data-screen-label={label}>
      {children}
      <div className={`absolute bottom-8 left-12 right-12 flex items-end justify-between text-[14px] pointer-events-none ${darkFooter?'text-white/70':'text-subtle'}`}>
        <div className="flex items-center gap-3">
          <BrandMark size={28} />
          <div>
            <div className={`font-bold tracking-tight ${darkFooter?'text-white':'text-[color:var(--text)]'}`}>SuperApps Nusaraya</div>
            <div className="text-[12px]">Catering / Mess Management · PoC</div>
          </div>
        </div>
        <div className="mono text-[12px]">{String(idx).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
      </div>
    </section>
  );
}

function SlideCover({ idx, total }) {
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} Cover`} idx={idx} total={total} darkFooter>
      <div className="relative flex-1 overflow-hidden"
           style={{ background:`
            radial-gradient(120% 80% at 20% 10%, rgba(243,152,0,0.55) 0%, transparent 55%),
            radial-gradient(140% 80% at 90% 100%, rgba(243,152,0,0.20) 0%, transparent 60%),
            linear-gradient(180deg, #0A1A29 0%, #143452 38%, #1F4E79 62%, #4179AE 96%)`}}>
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-20"
             style={{ background:'radial-gradient(circle, #F39800 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full opacity-15"
             style={{ background:'radial-gradient(circle, #5C8C44 0%, transparent 70%)' }} />

        <div className="absolute inset-0 flex flex-col justify-center px-32 text-white">
          <div className="inline-flex items-center gap-3 mb-10">
            <BrandMark size={88} />
            <div className="leading-tight">
              <div className="text-[16px] font-semibold tracking-[0.18em] uppercase text-white/70">SuperApps Nusaraya</div>
              <div className="text-[52px] font-extrabold tracking-tight">Module · Catering / Mess</div>
            </div>
          </div>
          <div className="text-[24px] font-semibold text-safety-300 mb-3 tracking-wide uppercase" style={{ letterSpacing:'0.18em' }}>PoC scope · review session</div>
          <h1 className="text-[88px] font-extrabold tracking-tight leading-[0.95]" style={{ letterSpacing:'-0.025em', textWrap:'balance', maxWidth:1300 }}>
            Catering operations<br/>untuk 5,000 pekerja.
          </h1>
          <p className="mt-8 text-[24px] text-white/80 max-w-[1200px] leading-relaxed">
            18 screen across 5 persona — pekerja, doorkeeper, FAC admin, kitchen, management. Multi-method voucher, headcount forecast, vendor SLA, food safety, dan AI insights.
          </p>

          <div className="mt-14 flex items-center gap-10 text-[14px]">
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Prepared by</div>
              <div className="text-[18px] font-semibold">Product Design · IR Team</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Reviewer</div>
              <div className="text-[18px] font-semibold">FAC · HR · vendor catering · mgmt</div>
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

function SlideOverview({ idx, total, tab, sub, color, features }) {
  const dark = color.dark;
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${tab}`} idx={idx} total={total} darkFooter={dark}>
      <div className="flex-1 flex flex-col justify-center px-32" style={{ background: color.bg, color: dark?'#fff':'inherit' }}>
        <div className="text-[20px] font-bold uppercase tracking-[0.22em]" style={{ color: color.accent }}>
          Persona
        </div>
        <h2 className="text-[120px] font-extrabold tracking-tight leading-none mt-4" style={{ letterSpacing:'-0.03em', color: dark?'#fff':'#0f1115' }}>
          {tab}
        </h2>
        <div className="mt-6 text-[28px] font-semibold" style={{ color: dark?'rgba(255,255,255,0.7)':'#5b6472' }}>{sub}</div>

        <div className="mt-14 grid grid-cols-3 gap-8 max-w-[1500px]">
          {features.map(f => (
            <div key={f.t} className="p-7 rounded-2xl"
                 style={{ background: dark?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.7)',
                          border: dark?'1px solid rgba(255,255,255,0.1)':'1px solid rgba(0,0,0,0.05)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white" style={{ background: color.accent }}>
                <Icon name={f.ic} size={26} />
              </div>
              <div className="text-[24px] font-extrabold tracking-tight" style={{ color: dark?'#fff':'#0f1115' }}>{f.t}</div>
              <div className="text-[17px] mt-2 leading-relaxed" style={{ color: dark?'rgba(255,255,255,0.7)':'#5b6472' }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function SlidePhone({ idx, total, title, comp, dark, caption, spec, screenNum }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total}>
      <div className="flex-1 grid grid-cols-[820px_1fr] bg-elev">
        <div className="relative flex items-center justify-center overflow-hidden" style={{ background:'linear-gradient(160deg, #FFF6E8 0%, #FDE6C0 100%)' }}>
          <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full"
               style={{ background:'radial-gradient(circle, rgba(230,133,6,0.18) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full"
               style={{ background:'radial-gradient(circle, rgba(92,140,68,0.18) 0%, transparent 70%)' }} />
          <div style={{ transform:'scale(1.05)' }}>
            <PhoneFrame label="" dark={dark}>
              {Comp ? <Comp /> : <div className="p-8 text-subtle">component missing</div>}
            </PhoneFrame>
          </div>
        </div>

        <div className="flex flex-col justify-center px-20">
          <div className="text-[20px] font-bold uppercase tracking-[0.22em]" style={{ color:'#E68506' }}>
            Worker mobile · {screenNum}
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

function SlideTablet({ idx, total, title, comp, caption, spec, screenNum }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total} darkFooter>
      <div className="flex-1 flex flex-col px-16 pt-16 pb-28" style={{ background:'#0A0F18', color:'#fff' }}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[18px] font-bold uppercase tracking-[0.22em] text-safety-400">Scanner / Doorkeeper · {screenNum}</div>
            <h2 className="text-[64px] font-extrabold tracking-tight leading-none mt-3" style={{ letterSpacing:'-0.025em' }}>{title}</h2>
          </div>
          <div className="text-[18px] text-white/70 max-w-[820px] text-right leading-relaxed">{caption}</div>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex min-h-0">
          <div className="flex-1 min-w-0 relative">
            {Comp ? <Comp /> : <div className="p-8 text-white/50">component missing</div>}
          </div>
          {spec && (
            <aside className="w-[380px] shrink-0 border-l border-white/10 bg-[#0A0F18] p-8 flex flex-col gap-7">
              {spec.map(d => (
                <div key={d.lbl}>
                  <div className="text-[14px] font-bold uppercase tracking-[0.16em] text-white/55 mb-1">{d.lbl}</div>
                  <div className="text-[20px] font-bold leading-snug text-white">{d.val}</div>
                </div>
              ))}
            </aside>
          )}
        </div>
      </div>
    </SlideShell>
  );
}

function SlideWeb({ idx, total, title, comp, url, caption, sectionLabel, accent }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total}>
      <div className="flex-1 flex flex-col bg-elev px-16 pt-16 pb-28">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[18px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>{sectionLabel}</div>
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
    <SlideShell label={`${String(idx).padStart(2,'0')} Q&A`} idx={idx} total={total} darkFooter>
      <div className="relative flex-1 overflow-hidden flex flex-col items-center justify-center text-white px-32"
           style={{ background:`
            radial-gradient(120% 80% at 20% 10%, rgba(243,152,0,0.55) 0%, transparent 55%),
            radial-gradient(140% 80% at 90% 100%, rgba(243,152,0,0.20) 0%, transparent 60%),
            linear-gradient(180deg, #0A1A29 0%, #143452 38%, #1F4E79 62%, #4179AE 96%)`}}>
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-20"
             style={{ background:'radial-gradient(circle, #F39800 0%, transparent 70%)' }} />

        <BrandMark size={120} />
        <div className="mt-12 text-[28px] font-bold uppercase tracking-[0.22em] text-safety-300">Diskusi &amp; Q&amp;A</div>
        <h2 className="mt-6 text-[120px] font-extrabold tracking-tight leading-[0.95] text-center" style={{ letterSpacing:'-0.025em' }}>
          Terima kasih.
        </h2>
        <p className="mt-10 text-[24px] text-white/75 text-center max-w-[1200px] leading-relaxed">
          Validasi business rules dari FAC, vendor catering, dan tim mining sebelum dev sprint. Khususnya forecast rule, slot timing, dan compliance halal/food safety.
        </p>

        <div className="mt-16 flex items-center gap-16 text-[16px]">
          <div className="text-center">
            <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Next module</div>
            <div className="text-[20px] font-semibold">Accommodation / Mess</div>
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
  // Compute screen numbers per persona
  let mob=0, scn=0, fac=0, kit=0, mgmt=0;
  slideMeta.forEach(s => {
    if (s.kind === 'phone') { mob++;  s.__num = `${mob}/7`; }
    if (s.kind === 'tablet'){ scn++;  s.__num = `${scn}/2`; }
    if (s.kind === 'web' && s.id.startsWith('W') && +s.id.slice(1) >= 4  && +s.id.slice(1) <= 9)  { fac++;  s.__num = `${fac}/6`;  s.__section='FAC Admin · web';   s.__accent='#1F4E79'; }
    if (s.kind === 'web' && (s.id === 'W10' || s.id === 'W11')) { kit++; s.__num = `${kit}/2`; s.__section='Kitchen · web';     s.__accent='#5C8C44'; }
    if (s.kind === 'web' && s.id === 'W12')                      { mgmt++; s.__num='1/1';      s.__section='Management · web';  s.__accent='#CC7F00'; }
  });

  return (
    <deck-stage>
      {slideMeta.map((s, i) => {
        const idx = i + 1;
        const props = { idx, total };
        if (s.kind === 'cover')    return <SlideCover    key={s.id} {...props} />;
        if (s.kind === 'overview') return <SlideOverview key={s.id} {...props} tab={s.tab} sub={s.sub} color={s.color} features={s.features} />;
        if (s.kind === 'phone')    return <SlidePhone    key={s.id} {...props} title={s.title} comp={s.comp} dark={s.dark} caption={s.caption} spec={s.spec} screenNum={s.__num} />;
        if (s.kind === 'tablet')   return <SlideTablet   key={s.id} {...props} title={s.title} comp={s.comp} caption={s.caption} spec={s.spec} screenNum={s.__num} />;
        if (s.kind === 'web')      return <SlideWeb      key={s.id} {...props} title={s.title} comp={s.comp} url={s.url} caption={s.caption} sectionLabel={`${s.__section} · ${s.__num}`} accent={s.__accent} />;
        if (s.kind === 'closing')  return <SlideClosing  key={s.id} {...props} />;
        return null;
      })}
    </deck-stage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
