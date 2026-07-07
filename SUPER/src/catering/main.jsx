// Catering Module — main app shell (tabs across personas).

const TABS = [
  { id:'worker',  label:'Worker Mobile',    icon:'smartphone', sub:'7 screens · iPhone' },
  { id:'scanner', label:'Scanner Operator', icon:'qr-code',    sub:'tablet · doorkeeper' },
  { id:'fac',     label:'FAC Admin',        icon:'sliders',    sub:'6 screens · web' },
  { id:'kitchen', label:'Kitchen',          icon:'chef-hat',   sub:'2 screens · web' },
  { id:'mgmt',    label:'Management',       icon:'bar-chart-3',sub:'analytics' },
];

function TopBar({ active, setActive, showAnno, setShowAnno }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[10px] text-subtle">Catering / Mess Management · PoC</div>
          </div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html"      className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design</a>
          <a href="Attendance Module.html"  className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="clock" size={13} /> Attendance</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-cater-50 text-cater-700 font-semibold"><Icon name="utensils" size={13} /> Catering</span>
        </nav>
        <button onClick={() => setShowAnno(s => !s)}
          className={`inline-flex items-center gap-1.5 px-2.5 h-8 rounded-md border text-[11.5px] font-bold transition-colors
            ${showAnno?'bg-cater-500 border-cater-500 text-white':'bg-white border-token text-muted hover:border-cater-300'}`}>
          <Icon name={showAnno?'eye':'eye-off'} size={13} />
          {showAnno?'Annotations on':'Annotations off'}
        </button>
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-elev text-[11px] mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          v1.0
        </div>
      </div>
      <nav className="px-4 md:px-8 flex items-end gap-1 border-t border-token bg-white -mt-px overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`relative flex items-center gap-2 px-3 h-12 text-[13px] font-semibold transition-colors whitespace-nowrap
              ${active === t.id ? 'tab-active' : 'text-muted hover:text-[color:var(--text)]'}`}>
            <Icon name={t.icon} size={15} />
            <span>{t.label}</span>
            <span className="hidden lg:inline text-[10px] font-normal text-subtle ml-1">· {t.sub}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}

function SectionHeader({ eyebrow, title, description, right }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
      <div>
        {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-cater-600 mb-1.5">{eyebrow}</div>}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ letterSpacing:'-0.02em' }}>{title}</h2>
        {description && <p className="mt-1.5 text-[14px] text-muted max-w-2xl">{description}</p>}
      </div>
      {right}
    </div>
  );
}

// ============================================================
// Worker Mobile Tab
// ============================================================
function WorkerTab({ showAnno }) {
  const screens = [
    { id:'M1', label:'M1 — Catering Home', sub:'3 slot, hero menu',
      anno:{ lab:'Worker dashboard', text:'3 meal slot horizontal-scrollable. Claimed/active/locked state. Hero menu hari ini, gamification streak.' },
      render: () => <M_Home /> },
    { id:'M2', label:'M2 — Detail Menu', sub:'Komposisi, allergen, rate',
      anno:{ lab:'Menu detail', text:'Breakdown porsi (karb/protein/sayur/buah), kalori, alergen warning, vendor rating, rate menu kemarin.' },
      render: () => <M_Detail /> },
    { id:'M3', label:'M3 — Claim Voucher', sub:'QR + RFID alt',
      anno:{ lab:'Voucher voucher', text:'QR ID unik per voucher · brightness auto-max · RFID alternative · status menunggu reader (pulse).' },
      render: () => <M_ClaimQR /> },
    { id:'M4', label:'M4 — Claim Success', sub:'Animasi + struk',
      anno:{ lab:'Konfirmasi', text:'Ring expand + check-pop animation, confetti subtle. Ticket-style receipt + quick rate.' },
      render: () => <M_Success /> },
    { id:'M5', label:'M5 — Riwayat', sub:'Heatmap 3-dot/hari',
      anno:{ lab:'Calendar heatmap', text:'Per tanggal: 3 dot (sarapan/siang/malam). Hijau=claimed, kuning=pending, merah=missed.' },
      render: () => <M_Riwayat /> },
    { id:'M6', label:'M6 — Special Diet', sub:'Toggle + alergi',
      anno:{ lab:'Diet preferences', text:'Berlaku H+1 untuk forecast dapur. Daftar alergi spesifik, catatan untuk kitchen.' },
      render: () => <M_Diet /> },
    { id:'M7', label:'M7 — Walk-in mode', sub:'Tanpa app · RFID',
      anno:{ lab:'Fallback', text:'Untuk pekerja yang tidak bawa HP. Tap RFID di reader atau berikan NIK ke petugas.' },
      render: () => <M_Walkin /> },
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 1 — Worker Mobile"
        title="Catering — Worker flow"
        description="7 screen dari home (3 meal slot), detail menu lengkap, klaim QR + RFID, animasi sukses, riwayat heatmap, setup diet khusus, hingga walk-in mode tanpa app."
      />

      {/* Flow strip */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {screens.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#scr-${s.id}`}
               className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-token bg-white text-[11px] font-semibold whitespace-nowrap hover:bg-elev hover:border-cater-200">
              <span className="mono text-subtle">{s.id}</span>
              {s.label.split('—')[1]}
            </a>
            {i < screens.length-1 && <Icon name="chevron-right" size={12} className="text-subtle shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid gap-x-[260px] gap-y-14" style={{
        gridTemplateColumns:'repeat(auto-fill, minmax(390px, max-content))',
      }}>
        {screens.map(s => (
          <div key={s.id} id={`scr-${s.id}`} className="scroll-mt-32">
            <PhoneFrame label={s.label} sub={s.sub} anno={showAnno?s.anno:null}>
              {s.render()}
            </PhoneFrame>
          </div>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon:'qr-code', title:'QR + RFID + manual', desc:'3 method klaim — QR di app, tap kartu RFID/Smart Card di reader, atau berikan NIK ke petugas saat walk-in.' },
          { icon:'leaf',    title:'Diet-aware',           desc:'Vegetarian, halal, no-pork, gluten-free, alergi spesifik — semua di-track untuk forecast dan menu khusus.' },
          { icon:'trophy',  title:'Gamification',         desc:'Streak harian, claim rate, leaderboard tim — encourage worker untuk klaim dan reduce no-show.' },
        ].map(n => (
          <div key={n.title} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-cater-50 text-cater-600 flex items-center justify-center">
              <Icon name={n.icon} size={18} />
            </div>
            <div className="mt-3 text-[13px] font-bold tracking-tight">{n.title}</div>
            <div className="text-[12px] text-muted mt-1 leading-relaxed">{n.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Scanner Operator Tab
// ============================================================
function ScannerTab({ showAnno }) {
  const [showInvalid, setShowInvalid] = React.useState(false);

  const screens = [
    { id:'W1', label:'W1 — Scanner Console', sub:'Doorkeeper · tablet dark',
      anno:{ text:'Background dark untuk reduce eye strain. Mode QR/RFID/Manual. Live counter porsi vs forecast. Sidebar 5 scan terakhir.' },
      render: () => (
        <div className="relative">
          <ScannerConsole showInvalidModal={() => setShowInvalid(true)} />
          {showInvalid && <ScannerInvalidModal onClose={() => setShowInvalid(false)} reason="claimed" />}
        </div>
      )},
    { id:'W2', label:'W2 — Manual Entry / Override', sub:'Search NIK · audit-logged',
      anno:{ text:'Untuk pekerja yang tidak bawa kartu/HP. Search NIK atau nama, verifikasi foto, alasan walk-in tercatat di audit log.' },
      render: () => <ScannerManualEntry /> },
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 2 — Scanner Operator"
        title="Catering — Scanner / Doorkeeper"
        description="Console tablet untuk operator di pintu mess. Dark mode untuk visibility, large hit-target untuk gloved hands, real-time counter dan suara feedback."
      />

      <div className="space-y-12">
        {screens.map(s => (
          <div key={s.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span>
              <h3 className="text-[15px] font-bold tracking-tight">{s.label.split('—')[1]}</h3>
              {s.sub && <span className="text-[11px] text-subtle">— {s.sub}</span>}
            </div>
            <TabletFrame>{s.render()}</TabletFrame>
            {showAnno && s.anno && (
              <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
                <Icon name="info" size={14} className="mt-0.5 shrink-0" />
                <div>{s.anno.text}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-cater-600 mb-2">W3 — Invalid scan modal · variants</div>
        <p className="text-[13px] text-muted mb-4">Pop-up real-time saat scan ditolak. 4 reason: voucher sudah diklaim, belum aktif, pekerja cuti, salah slot. Suara alert subtle + override (call FAC).</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {['claimed', 'early', 'leave', 'wrongSlot'].map(r => (
            <div key={r} className="relative h-[480px] rounded-xl bg-[#0a0d12] overflow-hidden border border-token">
              <ScannerInvalidModal onClose={() => {}} reason={r} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FAC Admin Tab
// ============================================================
function FacTab({ showAnno }) {
  const screens = [
    { id:'W4', label:'W4 — Catering Dashboard', anno:'KPIs + slot status (3 col) + 7-day chart. Banner slot aktif dengan velocity vs expected.',
      render: () => <FacDashboard /> },
    { id:'W5', label:'W5 — Menu Planning', anno:'Calendar view weekly. Per cell: 3 slot menu (sarapan/siang/malam). Validasi auto: cegah protein sama 2 hari.',
      render: () => <FacMenuPlanning /> },
    { id:'W6', label:'W6 — Vendor Management', anno:'4 vendor: rating, cost, SLA on-time, waste rate, compliance docs (halal, food safety, hygiene).',
      render: () => <FacVendor /> },
    { id:'W7', label:'W7 — Headcount Forecast', anno:'CRITICAL TOOL. Sumber: roster + visitor + OT − leave − off-site. Per location + per diet. Auto-lock H-1 15:00.',
      render: () => <FacForecast /> },
    { id:'W8', label:'W8 — Live Redemption Monitor', anno:'Map mess locations dengan counter live, stream feed real-time, velocity vs expected, anomaly detection.',
      render: () => <FacMonitor /> },
    { id:'W9', label:'W9 — Feedback Management', anno:'Sentiment analysis (positive/neutral/negative), tabs (recent/open/resolved), filter vendor untuk performance.',
      render: () => <FacFeedback /> },
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 3 — FAC Admin"
        title="Catering — FAC Operations"
        description="6 screen untuk Facility Admin: dashboard live, menu planning, vendor management, forecast tool (CRITICAL), live monitor, feedback handling."
      />
      <div className="space-y-10">
        {screens.map(s => (
          <div key={s.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span>
              <h3 className="text-[15px] font-bold tracking-tight">{s.label.split('—')[1]}</h3>
            </div>
            <BrowserChrome url={`https://app.nusaraya.id/fac/catering/${s.id.toLowerCase()}`} height={820}>
              {s.render()}
            </BrowserChrome>
            {showAnno && (
              <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
                <Icon name="info" size={14} className="mt-0.5 shrink-0" />
                <div>{s.anno}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Kitchen Tab
// ============================================================
function KitchenTab({ showAnno }) {
  const screens = [
    { id:'W10', label:'W10 — Production Sheet', anno:'Locked forecast dari FAC. Resep dengan raw material calc (1,800 porsi → 360kg beras, 1,800 paha ayam dll). Checklist + timeline.',
      render: () => <KitchenProduction /> },
    { id:'W11', label:'W11 — Service Operations', anno:'Live counter prepared/served/remaining. Hot box temperature per lokasi (food safety). Photo quality real-time. Waste estimation.',
      render: () => <KitchenService /> },
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 4 — Kitchen / Vendor Staff"
        title="Catering — Kitchen Operations"
        description="Production sheet dengan resep auto-calculated untuk forecast porsi, dan service operations real-time dengan hot box temperature monitoring untuk food safety compliance."
      />
      <div className="space-y-10">
        {screens.map(s => (
          <div key={s.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span>
              <h3 className="text-[15px] font-bold tracking-tight">{s.label.split('—')[1]}</h3>
            </div>
            <BrowserChrome url={`https://kitchen.nusaraya.id/${s.id.toLowerCase()}`} height={820}>
              {s.render()}
            </BrowserChrome>
            {showAnno && (
              <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
                <Icon name="info" size={14} className="mt-0.5 shrink-0" />
                <div>{s.anno}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Management Tab
// ============================================================
function MgmtTab({ showAnno }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 5 — Management"
        title="Catering — Analytics &amp; Insights"
        description="Executive dashboard untuk manajemen: KPI bulanan, trend cost/waste/satisfaction, vendor performance comparison, heatmap pola redemption, dan AI insights yang actionable."
      />
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W12</span>
          <h3 className="text-[15px] font-bold tracking-tight">Catering Analytics — Management view</h3>
        </div>
        <BrowserChrome url="https://app.nusaraya.id/mgmt/catering" height={900}>
          <ManagementAnalytics />
        </BrowserChrome>
        {showAnno && (
          <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            <div>5 KPIs top, 4 trend chart 12-bulan, vendor comparison, heatmap jam×hari, AI insights dengan confidence score, cost breakdown waterfall, drill-down filter.</div>
          </div>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon:'sparkles', title:'AI insights actionable', desc:'Bukan dashboard pasif — sistem auto-detect pattern (Friday lunch dip, vendor cost gap, RA-2 over-forecast) dengan rekomendasi konkret.' },
          { icon:'target',   title:'Tied to business KPI',   desc:'Cost per portion, waste rate, satisfaction — semua terikat target board-level dan budget bulanan.' },
          { icon:'download', title:'Export & drill-down',    desc:'PDF executive summary, Excel raw data, drill per lokasi/vendor/department/slot. Ready untuk board pack.' },
        ].map(n => (
          <div key={n.title} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-cater-50 text-cater-600 flex items-center justify-center">
              <Icon name={n.icon} size={18} />
            </div>
            <div className="mt-3 text-[13px] font-bold tracking-tight">{n.title}</div>
            <div className="text-[12px] text-muted mt-1 leading-relaxed">{n.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// App
// ============================================================
function App() {
  const [active, setActive] = React.useState(() => {
    const h = (window.location.hash || '').replace('#','');
    return ['worker','scanner','fac','kitchen','mgmt'].includes(h) ? h : 'worker';
  });
  const [showAnno, setShowAnno] = React.useState(true);

  React.useEffect(() => {
    if (!window.location.hash.startsWith('#scr-')) {
      window.history.replaceState(null, '', `#${active}`);
    }
  }, [active]);

  React.useEffect(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } });
  });

  return (
    <div className="min-h-screen">
      <TopBar active={active} setActive={setActive} showAnno={showAnno} setShowAnno={setShowAnno} />
      {active === 'worker'  && <WorkerTab  showAnno={showAnno} />}
      {active === 'scanner' && <ScannerTab showAnno={showAnno} />}
      {active === 'fac'     && <FacTab     showAnno={showAnno} />}
      {active === 'kitchen' && <KitchenTab showAnno={showAnno} />}
      {active === 'mgmt'    && <MgmtTab    showAnno={showAnno} />}

      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1600px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · Catering / Mess Management · PoC</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">React · Tailwind · Lucide · Recharts</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
