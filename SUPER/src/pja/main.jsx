// PJA — main app shell.

const TABS = [
  { id:'worker', label:'Worker Mobile', icon:'smartphone', sub:'10 screens · field flow' },
  { id:'spv',    label:'SPV Web',       icon:'sliders',    sub:'4 screens · oversight' },
  { id:'analytics', label:'Analytics',   icon:'bar-chart-3', sub:'Performance + AI' },
];

function TopBar({ active, setActive, showAnno, setShowAnno }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[10px] text-subtle">PJA · Personal Job Assignment · cross-module hub</div>
          </div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design</a>
          <a href="PTW Module.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="clipboard-list" size={13} /> PTW</a>
          <a href="Contractor Management Module.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="building-2" size={13} /> Contractor</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 font-semibold"><Icon name="clipboard-check" size={13} /> PJA</span>
        </nav>
        <button onClick={() => setShowAnno(s => !s)}
          className={`inline-flex items-center gap-1.5 px-2.5 h-8 rounded-md border text-[11.5px] font-bold transition-colors
            ${showAnno?'bg-brand-500 border-brand-500 text-white':'bg-white border-token text-muted hover:border-brand-300'}`}>
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
        {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500 mb-1.5">{eyebrow}</div>}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ letterSpacing:'-0.02em' }}>{title}</h2>
        {description && <p className="mt-1.5 text-[14px] text-muted max-w-2xl">{description}</p>}
      </div>
      {right}
    </div>
  );
}

// ============================================================
// Worker Mobile tab
// ============================================================
function WorkerTab({ showAnno }) {
  const screens = [
    { id:'J1', label:'J1 — PJA Home',           sub:'Tab + stats + filter',
      anno:{ lab:'Daily list', text:'3-tab (hari ini / mendatang / riwayat). Stats strip 4 status. Card per assignment dengan priority + status + cross-module PTW link.' },
      render: () => <J1_Home /> },
    { id:'J2', label:'J2 — Detail',              sub:'Cross-module integration',
      anno:{ lab:'Detail view', text:'Map preview, info pekerjaan, tools, SOP link, hazard + APD, PTW link, co-worker. Mulai locked sampai check-in geo-fence.' },
      render: () => <J2_Detail /> },
    { id:'J3a', label:'J3a — Geofence · out',     sub:'88m dari target',
      anno:{ lab:'Geo validation', text:'Map fullscreen dengan radius geo-fence 50m. Pin target merah + posisi worker hijau. Distance live update.' },
      render: () => <J3_CheckIn inside={false} /> },
    { id:'J3b', label:'J3b — Geofence · in',      sub:'12m · siap check-in',
      anno:{ lab:'In radius', text:'Banner hijau saat dalam radius. Button check-in enabled. Override manual dengan reason untuk audit log.' },
      render: () => <J3_CheckIn inside={true} /> },
    { id:'J4', label:'J4 — Eksekusi',            sub:'Timer + SOP checklist',
      anno:{ lab:'Active state', text:'Sticky timer header. Per-step SOP checklist dengan photo attach. Cross-module: Timesheet auto-log + PTW status visible.' },
      render: () => <J4_Execute /> },
    { id:'J5', label:'J5 — Photo capture',       sub:'GPS + EXIF mandatory',  dark:true,
      anno:{ lab:'Evidence', text:'Camera in-app dengan composition grid. GPS + timestamp di-overlay (akan burned ke foto). Required min before + after.' },
      render: () => <J5_PhotoCapture /> },
    { id:'J6', label:'J6 — Close-out',           sub:'Verification + rating',
      anno:{ lab:'Selesai PJA', text:'Verification checklist, summary durasi vs estim, self-rating, notes final. Cross-module: timesheet auto + SAP PM auto-trigger.' },
      render: () => <J6_CloseOut /> },
    { id:'J7', label:'J7 — Fuel request',        sub:'SIMPER + unit validated',
      anno:{ lab:'Cross-module', text:'Auto-detect driver + unit. Volume max sesuai capacity. Quota indicator. Contractor Mgmt validate SIMPER · Fuel Mgmt generate voucher.' },
      render: () => <J7_FuelRequest /> },
    { id:'J8', label:'J8 — Fuel voucher (QR)',   sub:'4 jam valid · 1 dispense',
      anno:{ lab:'Voucher', text:'QR voucher 4 jam validity. Detail driver/unit/volume/lokasi. Status menunggu dispense → auto-update saat scanned.' },
      render: () => <J8_FuelVoucher /> },
    { id:'J9', label:'J9 — Maintenance req',     sub:'Light WO Housing',
      anno:{ lab:'SAP PM auto-escalate', text:'High/Critical severity auto-create WO di SAP PM. Lokasi auto-detect dari attendance booking.' },
      render: () => <J9_MaintenanceRequest /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 1 — Worker Mobile"
        title="Field worker daily flow"
        description="10 screen mobile-first untuk worker lapangan. Geo-fence check-in, photo evidence dengan EXIF, SOP checklist dengan timer, fuel request, maintenance request — semua dengan cross-module integration eksplisit."
      />
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {screens.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#scr-${s.id}`}
               className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-token bg-white text-[11px] font-semibold whitespace-nowrap hover:bg-elev hover:border-brand-200">
              <span className="mono text-subtle">{s.id}</span>
              {s.label.split('—')[1]}
            </a>
            {i < screens.length-1 && <Icon name="chevron-right" size={12} className="text-subtle shrink-0" />}
          </React.Fragment>
        ))}
      </div>
      <div className="grid gap-x-[260px] gap-y-14" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(390px, max-content))' }}>
        {screens.map(s => (
          <div key={s.id} id={`scr-${s.id}`} className="scroll-mt-32">
            <PhoneFrame label={s.label} sub={s.sub} dark={s.dark} anno={showAnno?s.anno:null}>
              {s.render()}
            </PhoneFrame>
          </div>
        ))}
      </div>

      <div className="mt-14 surface rounded-xl p-6 border-l-4 border-l-brand-500 max-w-5xl">
        <div className="flex items-start gap-3">
          <Icon name="link" size={22} className="text-brand-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[15px] font-extrabold tracking-tight">Cross-module integrations</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-[12px]">
              {[
                ['PTW','High-risk PJA cross-check PTW active. Worker tidak bisa check-in geo-fence kalau PTW belum aktif.'],
                ['Contractor Mgmt','Cert worker (SIMPER, MCU, training) validated otomatis sebelum assignment dikirim atau fuel voucher generated.'],
                ['Timesheet','Waktu kerja dari check-in sampai close-out auto-log ke Timesheet. SPV approval ter-trigger setelah PJA closed.'],
                ['Fuel Management','Voucher QR generated untuk dispensing. Validasi SIMPER + unit + quota. Audit trail per transaksi.'],
                ['SAP PM','Maintenance request severity high/critical otomatis create WO di SAP PM. Hazard observation juga.'],
                ['Geo-fence + GPS','50m radius default. Override butuh reason + audit log. Photo evidence EXIF GPS verified.'],
              ].map(([t,d]) => (
                <div key={t} className="flex items-start gap-2"><Icon name="check" size={13} className="text-success-500 mt-0.5 shrink-0" /><span><span className="font-bold">{t}:</span> {d}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SPV Web tab
// ============================================================
function SPVTab({ showAnno }) {
  const screens = [
    { id:'W1', label:'W1 — SPV Dashboard',   anno:'KPIs + map worker positions live + worker list + tabel PJA hari ini. Privacy-aware untuk lokasi.', render: () => <W1_SPVDashboard /> },
    { id:'W2', label:'W2 — Create PJA',      anno:'Form lengkap dengan worker matching (cert match score). Cross-module callouts: Contractor + PTW.', render: () => <W2_CreatePJA /> },
    { id:'W3', label:'W3 — Live monitor',    anno:'Timeline 8-hour shift per worker. Alert deadline approaching, idle, overrun. Quick reassign.', render: () => <W3_Monitor /> },
    { id:'W4', label:'W4 — Approval inbox',  anno:'Inbox + review panel: photos, SOP completion, durasi vs estim, notes. Approve / reject / request info.', render: () => <W4_Approval /> },
  ];
  const handoverScreen = { id:'J10', label:'J10 — Handover Shift (SPV mobile)', sub:'2 signature wajib · audit lock',
    anno:{ lab:'End-of-shift', text:'SPV pagi serahkan ke SPV sore. Auto-list PJA in-progress, hazard, PTW lanjut, equipment. Both signature required.' },
    render: () => <J10_HandoverShift /> };
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader
        eyebrow="Tab 2 — SPV Web + Mobile"
        title="Supervisor oversight"
        description="4 web screen untuk SPV oversight (dashboard live, create PJA, monitoring, approval inbox) + 1 mobile screen untuk handover shift dengan dual signature."
      />
      <div className="space-y-10">
        {screens.map(s => (
          <div key={s.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span>
              <h3 className="text-[15px] font-bold tracking-tight">{s.label.split('—')[1]}</h3>
            </div>
            <BrowserChrome url={`https://app.nusaraya.id/ops/pja/${s.id.toLowerCase()}`} height={820}>
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

        {/* SPV mobile handover */}
        <div className="pt-6 border-t border-token">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{handoverScreen.id}</span>
            <h3 className="text-[15px] font-bold tracking-tight">{handoverScreen.label.split('—')[1]} — SPV mobile</h3>
          </div>
          <div className="flex justify-start">
            <PhoneFrame label={handoverScreen.label} sub={handoverScreen.sub} anno={showAnno?handoverScreen.anno:null}>
              {handoverScreen.render()}
            </PhoneFrame>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Analytics tab
// ============================================================
function AnalyticsTab({ showAnno }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader
        eyebrow="Tab 3 — Analytics"
        title="PJA Performance Analytics"
        description="KPI lengkap, completion rate per worker, durasi vs estimasi per kategori, AI insights actionable untuk coaching dan SOP optimization."
      />
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W5</span>
        <h3 className="text-[15px] font-bold tracking-tight">Performance &amp; AI insights</h3>
      </div>
      <BrowserChrome url="https://app.nusaraya.id/ops/pja/analytics" height={900}>
        <W5_Analytics />
      </BrowserChrome>
      {showAnno && (
        <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
          <Icon name="info" size={14} className="mt-0.5 shrink-0" />
          <div>KPI 5-card top. Top performers table per worker. Volume per kategori + AI insights actionable dengan confidence score — coaching atau SOP update bisa langsung di-action.</div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// App
// ============================================================
function App() {
  const [active, setActive] = React.useState(() => {
    const h = (window.location.hash || '').replace('#','');
    return ['worker','spv','analytics'].includes(h) ? h : 'worker';
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
      {active === 'worker'    && <WorkerTab    showAnno={showAnno} />}
      {active === 'spv'       && <SPVTab       showAnno={showAnno} />}
      {active === 'analytics' && <AnalyticsTab showAnno={showAnno} />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1700px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · PJA Module · cross-module hub (PTW · Contractor · Timesheet · Fuel · SAP PM)</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
