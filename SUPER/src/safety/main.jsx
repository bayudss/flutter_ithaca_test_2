// Safety Module — main app shell.

const TABS = [
  { id: 'mobile', label: 'Mobile View',           icon: 'smartphone', sub: '9 screens · SOS + Incident + BBS' },
  { id: 'cc',     label: 'Command Center',        icon: 'radar',      sub: 'Live dashboard · dark theme' },
  { id: 'incident', label: 'Incident Dashboard',  icon: 'shield',     sub: 'HR / SO · analytics' },
];

function TopBar({ active, setActive }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[10px] text-subtle">Safety & Emergency · Mission-critical</div>
          </div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html"      className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design System</a>
          <a href="Attendance Module.html"  className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="clock" size={13} /> Attendance</a>
          <a href="ESS Module.html"         className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="briefcase" size={13} /> ESS</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-danger-50 text-danger-700 font-semibold"><Icon name="shield" size={13} /> Safety</span>
        </nav>
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-elev text-[11px] mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          v1.0
        </div>
      </div>
      <nav className="px-4 md:px-8 flex items-end gap-1 border-t border-token bg-white -mt-px">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`relative flex items-center gap-2 px-3 h-12 text-[13px] font-semibold transition-colors
              ${active === t.id ? 'tab-active' : 'text-muted hover:text-[color:var(--text)]'}`}>
            <Icon name={t.icon} size={15} />
            <span>{t.label}</span>
            <span className="hidden md:inline text-[10px] font-normal text-subtle ml-1">· {t.sub}</span>
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
        {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-danger-500 mb-1.5">{eyebrow}</div>}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ letterSpacing: '-0.02em' }}>{title}</h2>
        {description && <p className="mt-1.5 text-[14px] text-muted max-w-2xl">{description}</p>}
      </div>
      {right}
    </div>
  );
}

// ============================================================
// Interactive SOS hold state — shared across C1→C2 demo
// ============================================================
function useSOSHold() {
  const [progress, setProgress] = React.useState(0);
  const [holding, setHolding] = React.useState(false);
  const timerRef = React.useRef(null);

  const start = () => {
    setHolding(true);
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timerRef.current); return 100; }
        return p + (100 / 30); // 3s / 30 ticks @ 100ms
      });
    }, 100);
  };
  const stop = () => {
    setHolding(false);
    clearInterval(timerRef.current);
    if (progress < 100) setProgress(0);
  };
  const reset = () => { setProgress(0); setHolding(false); };
  return { progress, holding, start, stop, reset };
}

// ============================================================
// Mobile Tab
// ============================================================
function MobileTab() {
  const sosHold = useSOSHold();

  const screens = [
    { id:'C1', label:'C1 — Floating SOS',  sub:'Always visible · home context', dark: true,
      anno:{ lab:'Always accessible', text:'SOS button render sebagai overlay di setiap screen. Home context mengikuti design dashboard 1.7 (Login module).' },
      render: () => <Screen_FloatingSOS onTrigger={() => {}} /> },
    { id:'C2', label:'C2 — Hold to Activate', sub:'3-sec hold · interactive', dark: true,
      anno:{ lab:'Hold 3 detik', text:'Tahan tombol merah besar untuk lihat countdown 3→2→1 dan progress ring. Lepas untuk batal — mencegah trigger tidak sengaja.' },
      render: () => <Screen_SOSHold progress={sosHold.progress} holding={sosHold.holding} onMouseDown={sosHold.start} onMouseUp={sosHold.stop} /> },
    { id:'C3', label:'C3 — Sending', sub:'GPS · push · SMS backup', dark: true,
      anno:{ lab:'Checklist transparan', text:'User lihat exactly apa yang terkirim. GPS · CC notif · SO notif · SMS backup. Battery & network indicator visible.' },
      render: () => <Screen_SOSSending /> },
    { id:'C4', label:'C4 — SOS Active', sub:'Live timer · chat · map', dark: true,
      anno:{ lab:'Cannot dismiss', text:'Bottom bar merah persistent, "Batalkan" require konfirmasi 2x. Timer count-up real-time. Chat dengan responder live.' },
      render: () => <Screen_SOSActive /> },
    { id:'C4b', label:'C4b — Batalkan SOS', sub:'Konfirmasi 2× · alasan wajib', dark: true,
      anno:{ lab:'Fool-proof cancel', text:'Tap "Batalkan SOS" di C4 buka sheet ini: alasan wajib dipilih + konfirmasi tap kedua dalam 5 detik.' },
      render: () => <Screen_SOSCancel /> },
    { id:'C5', label:'C5 — SOS Resolved', sub:'Summary · follow-up', dark: true,
      anno:{ lab:'Resolved', text:'Background hijau. Summary respons time + responder note. Form follow-up (sehat? medis lanjutan?) sebelum close.' },
      render: () => <Screen_SOSResolved /> },
    { id:'C6', label:'C6 — Incident Report', sub:'7 kategori · severity 1-5',
      anno:{ lab:'Non-emergency', text:'Form lengkap dengan kategori (Near miss → LTI), severity scale color-coded, foto evidence, korban, saksi.' },
      render: () => <Screen_IncidentReport /> },
    { id:'C7', label:'C7 — BBS Observation', sub:'Unsafe Cond / Act / Positive',
      anno:{ lab:'Anonymous toggle', text:'BBS = Behavior Based Safety. Foto wajib. Bisa anonim untuk encourage reporting tanpa retaliation fear.' },
      render: () => <Screen_BBSObservation /> },
    { id:'C8', label:'C8 — Safety History', sub:'SOS · Insiden · Observasi',
      anno:{ lab:'Tab interaktif', text:'3-tab dengan counter. Klik tab untuk filter list. Stats Closed / In-progress / Open di atas.' },
      render: () => <Screen_SafetyHistory /> },
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 1 — Mobile · Safety-critical"
        title="SOS · Incident · BBS — Mobile flow"
        description="9 screen. SOS flow 6 screen yang harus fool-proof: button selalu accessible, hold 3-detik untuk activate, dan pembatalan butuh alasan + konfirmasi 2×."
        right={
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-subtle">
            <Icon name="mouse-pointer-click" size={14} /> C2 hold-to-activate interaktif
          </div>
        }
      />

      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {screens.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#scr-${s.id}`}
               className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-token bg-white text-[11px] font-semibold whitespace-nowrap hover:border-danger-300 hover:bg-danger-50/30">
              <span className="mono text-subtle">{s.id}</span>
              {s.label.split('—')[1]}
            </a>
            {i < screens.length - 1 && <Icon name="chevron-right" size={12} className="text-subtle shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid gap-x-[260px] gap-y-14" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, max-content))' }}>
        {screens.map(s => (
          <div key={s.id} id={`scr-${s.id}`} className="scroll-mt-32">
            <PhoneFrame label={s.label} sub={s.sub} dark={s.dark} anno={s.anno}>
              {s.render()}
            </PhoneFrame>
          </div>
        ))}
      </div>

      {/* Design principles callout */}
      <div className="mt-14 surface rounded-xl p-6 border-l-4 border-l-danger-500 max-w-5xl" style={{ borderLeftColor: '#E24B4A' }}>
        <div className="flex items-start gap-3">
          <Icon name="shield-alert" size={22} className="text-danger-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[15px] font-extrabold tracking-tight">Safety-critical design principles</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-[12px]">
              <div className="flex items-start gap-2"><Icon name="check" size={13} className="text-success-500 mt-0.5 shrink-0" /><span><span className="font-bold">Prominent & fast:</span> SOS button selalu visible, sekali tap untuk masuk hold-screen.</span></div>
              <div className="flex items-start gap-2"><Icon name="check" size={13} className="text-success-500 mt-0.5 shrink-0" /><span><span className="font-bold">Fool-proof activate:</span> 3-detik hold + progress ring + countdown — mencegah trigger tidak sengaja.</span></div>
              <div className="flex items-start gap-2"><Icon name="check" size={13} className="text-success-500 mt-0.5 shrink-0" /><span><span className="font-bold">Fool-proof cancel:</span> Saat SOS active, "Batalkan" require konfirmasi 2× — mencegah accidental dismiss.</span></div>
              <div className="flex items-start gap-2"><Icon name="check" size={13} className="text-success-500 mt-0.5 shrink-0" /><span><span className="font-bold">Multi-channel:</span> Push notif + SMS backup + lokasi GPS dikirim parallel untuk redundancy.</span></div>
              <div className="flex items-start gap-2"><Icon name="check" size={13} className="text-success-500 mt-0.5 shrink-0" /><span><span className="font-bold">State transparency:</span> User selalu tahu status: sent → ACK → en-route → resolved.</span></div>
              <div className="flex items-start gap-2"><Icon name="check" size={13} className="text-success-500 mt-0.5 shrink-0" /><span><span className="font-bold">Follow-up:</span> Setelah resolved, ada form konfirmasi kondisi user untuk medical follow-up.</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Command Center Tab
// ============================================================
function CommandCenterTab() {
  const [focusedSos, setFocusedSos] = React.useState(null);
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader
        eyebrow="Tab 2 — Web · Tablet · Command Center"
        title="Live Operations Dashboard"
        description="Mission-control style dashboard untuk tim Command Center. Dark theme high-contrast, real-time data, klik SOS card / pin di map untuk buka detail drawer (W7)."
        right={
          <div className="hidden md:flex items-center gap-3 text-[11px] text-subtle">
            <span className="inline-flex items-center gap-1"><Icon name="radar" size={13} /> 1280×800 · landscape</span>
            <button onClick={() => setFocusedSos('SOS-04219')} className="text-[11px] font-bold text-brand-700 inline-flex items-center gap-1 px-2.5 h-7 rounded-md bg-brand-50">
              <Icon name="alert-octagon" size={12} /> Demo SOS Detail
            </button>
          </div>
        }
      />

      <div className="space-y-2">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W6 + W7</span>
          <h3 className="text-[15px] font-bold tracking-tight">Command Center Live Dashboard</h3>
          <span className="text-[11px] text-subtle">— klik pin/card SOS untuk buka W7 drawer</span>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#0A0F18]" style={{ aspectRatio: '16/10', maxHeight: 900 }}>
          <CommandCenter focusedSosId={focusedSos} onSOSClick={setFocusedSos} onCloseDrawer={() => setFocusedSos(null)} />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl">
        {[
          { icon:'map',           title:'Live site map',     desc:'Topographic SVG dengan pin SOS / Alert / PTW / Shuttle / Equipment. Filter toggle per kategori, mini-map overview, koordinat live.' },
          { icon:'alert-octagon', title:'SOS panel',         desc:'List SOS aktif dengan severity, stage indicator (Sent → ACK → En-route → Done), elapsed timer counting up real-time.' },
          { icon:'activity',      title:'Live activity feed',desc:'Stream event semua modul: SOS, PTW, Shuttle, HR. Color-coded by event type, timestamp mono, filter inline.' },
          { icon:'bar-chart-3',   title:'Live KPI widgets',  desc:'Worker active · PTW · Shuttle · Incident today. Sparkline 14-titik per widget, tappable untuk drill-down.' },
        ].map(n => (
          <div key={n.title} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
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
// Incident Dashboard Tab
// ============================================================
function IncidentTab() {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader
        eyebrow="Tab 3 — Web · Safety Officer & HR"
        title="Incident Management Dashboard"
        description="Untuk Safety Officer & HR. KPI safety lengkap, trend 12 bulan, Pareto by category, heatmap lokasi × bulan, dan table investigasi."
      />

      <div className="space-y-2">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W8</span>
          <h3 className="text-[15px] font-bold tracking-tight">Incident Analytics & Investigation</h3>
        </div>
        <BrowserChrome url="https://app.nusaraya.id/safety/incidents" height={1100}>
          <IncidentDashboard />
        </BrowserChrome>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon:'trending-down',  title:'Trend chart',      desc:'Line chart 12 bulan dengan target line ≤ 10 incident/bulan. Highlight bulan terakhir prominent.' },
          { icon:'bar-chart-2',    title:'Pareto analysis',  desc:'Bar chart category + cumulative line. Reveals 80/20 — kategori mana yang paling worth diatasi.' },
          { icon:'grid-3x3',       title:'Location heatmap', desc:'Lokasi × bulan matrix. Color intensity = jumlah incident. Memudahkan spot hot spots geografis dan temporal.' },
        ].map(n => (
          <div key={n.title} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-danger-50 text-danger-600 flex items-center justify-center">
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
    return ['mobile','cc','incident'].includes(h) ? h : 'mobile';
  });
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
      <TopBar active={active} setActive={setActive} />
      {active === 'mobile'   && <MobileTab />}
      {active === 'cc'       && <CommandCenterTab />}
      {active === 'incident' && <IncidentTab />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1700px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · Safety & Emergency Module</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">Mission-critical · React · Tailwind · Lucide</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
