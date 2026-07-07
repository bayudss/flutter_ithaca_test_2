// Contractor Management — main app shell.

const TABS = [
  { id:'admin',     label:'HR Admin Web',      icon:'sliders',      sub:'Companies + Workers · 6 screens' },
  { id:'compliance',label:'SO Compliance Web', icon:'shield-check', sub:'Compliance + Suspension · 3 screens' },
  { id:'mobile',    label:'Worker Mobile',     icon:'smartphone',   sub:'4 screens · digital ID' },
  { id:'gate',      label:'Gate Console',      icon:'door-open',    sub:'Tablet · security' },
];

function TopBar({ active, setActive, showAnno, setShowAnno }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[10px] text-subtle">Contractor Management · Authoritative source</div>
          </div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html"      className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design</a>
          <a href="PTW Module.html"          className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="clipboard-list" size={13} /> PTW</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 font-semibold"><Icon name="building-2" size={13} /> Contractor</span>
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
// HR Admin Web
// ============================================================
function AdminTab({ showAnno }) {
  const [tab, setTab] = React.useState('companies');
  const [pickedContractor, setPickedContractor] = React.useState(null);
  const [pickedWorker, setPickedWorker] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showBulkUpload, setShowBulkUpload] = React.useState(false);

  // Determine which screen to show
  let activeScreen = 'dashboard';
  if (showBulkUpload) activeScreen = 'bulk';
  else if (pickedContractor) activeScreen = 'detail';

  const screens = [
    { id:'C1', label:'C1 — Dashboard',   anno:'KPIs + 3-tab (companies/workers/compliance). Tap row untuk detail.', render: () => <C1_Dashboard onTabChange={setTab} tab={tab} onPickContractor={setPickedContractor} onPickWorker={setPickedWorker} /> },
    { id:'C3', label:'C3 — Add Contractor (modal)', anno:'4-step modal: company, kontrak & PIC, documents, review. Auto-save draft.', render: () => (
      <div className="relative h-full">
        <C1_Dashboard onTabChange={() => {}} tab="companies" />
        <C3_AddContractor onClose={() => {}} />
      </div>
    )},
    { id:'C4', label:'C4 — Contractor Detail', anno:'6 tab: overview, workers, documents, compliance, performance, billing & SAP (read-only mirror).', render: () => <C4_ContractorDetail contractor={CONTRACTORS[0]} onClose={() => setPickedContractor(null)} /> },
    { id:'C6', label:'C6 — Bulk Upload CSV',     anno:'Upload xlsx/csv. Preview parsed dengan color-coded validation. Skip errors, import valid + warnings.', render: () => <C6_BulkUpload onClose={() => {}} /> },
    { id:'C7', label:'C7 — Worker Detail (drawer)', anno:'Drawer dari kanan dengan 8 tab. Hero header punya QR ID + status pills.', render: () => (
      <div className="relative h-full">
        <C1_Dashboard onTabChange={() => {}} tab="workers" />
        <C7_WorkerDrawer worker={WORKERS[0]} onClose={() => {}} />
      </div>
    )},
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader
        eyebrow="Tab 1 — HR Admin Web"
        title="Contractor &amp; Worker Management"
        description="Authoritative source untuk validasi worker di seluruh sistem. 26 contractor aktif, 3,142 worker, cert tracking lengkap dengan auto-expiry cascade."
      />
      <div className="space-y-10">
        {screens.map(s => (
          <div key={s.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span>
              <h3 className="text-[15px] font-bold tracking-tight">{s.label.split('—')[1]}</h3>
            </div>
            <BrowserChrome url={`https://app.nusaraya.id/hr/contractor/${s.id.toLowerCase()}`} height={820}>
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

      <div className="mt-12 surface rounded-xl p-6 border-l-4 border-l-brand-500 max-w-5xl">
        <div className="flex items-start gap-3">
          <Icon name="building-2" size={22} className="text-brand-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[15px] font-extrabold tracking-tight">Authoritative source — kenapa penting</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-[12px]">
              {[
                ['Single source of truth','Modul ini jadi acuan validasi worker di PTW (cert check), Attendance (gate access), Catering (worker count), dan SAP (payroll).'],
                ['Cascade auto-actions','Cert expired → access auto-revoked → PTW approval blocked → gate denied. Tidak ada manual sync.'],
                ['Compliance regulator','Sesuai Kepmen ESDM 1827/2018 dan SMKP. Audit trail immutable untuk inspection Kemenaker / Direktorat Minerba.'],
                ['Mass scale handling','3,142 worker dengan rotation antar kontraktor, sub-contractor chain, foreign worker (passport/KITAS). Bulk operations untuk efficiency HR.'],
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
// SO Compliance Web
// ============================================================
function ComplianceTab({ showAnno }) {
  const screens = [
    { id:'C11', label:'C11 — Compliance Dashboard', anno:'Score per kontraktor, expiry timeline 90 hari, risk heatmap, anomaly detection AI dengan suggested action.', render: () => <C11_Compliance /> },
    { id:'C12', label:'C12 — Training Scheduler',    anno:'14-day calendar grid. Per session: trainer, capacity, registered count. Bulk register dari kontraktor.', render: () => <C12_TrainingScheduler /> },
    { id:'C13', label:'C13 — Access Suspension',     anno:'List 12 suspended workers dengan reason. Auto-suspend rules + immutable audit log untuk regulator.', render: () => <C13_SuspensionMgmt /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader
        eyebrow="Tab 2 — SO Compliance Web"
        title="Compliance &amp; suspension management"
        description="Untuk Safety Officer dan HSE Lead. Dashboard compliance per kontraktor, training scheduler, dan suspension management dengan audit trail."
      />
      <div className="space-y-10">
        {screens.map(s => (
          <div key={s.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span>
              <h3 className="text-[15px] font-bold tracking-tight">{s.label.split('—')[1]}</h3>
            </div>
            <BrowserChrome url={`https://app.nusaraya.id/safety/contractor/${s.id.toLowerCase()}`} height={840}>
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
// Worker Mobile
// ============================================================
function MobileTab({ showAnno }) {
  const screens = [
    { id:'M1', label:'M1 — Digital ID Card',     sub:'Always offline · flip untuk emergency info',
      anno:{ lab:'Brand offline-first', text:'Cached untuk offline. Color background indicator compliance status. QR + photo untuk gate scan.' },
      render: () => <M1_IDCard /> },
    { id:'M2', label:'M2 — My Certifications',    sub:'Progress bar expiry',
      anno:{ lab:'Personal cert', text:'5 cert dengan color-coded urgency. Banner kuning kalau ada yang mendekati expiry. Link langsung schedule renewal.' },
      render: () => <M2_MyCerts /> },
    { id:'M3', label:'M3 — Compliance Score',    sub:'Gamification 100% + streak',
      anno:{ lab:'Gamification', text:'Reward visual untuk worker yang patuh compliance. Streak counter + achievements untuk motivasi.' },
      render: () => <M3_ComplianceScore /> },
    { id:'M4', label:'M4 — Access Status',        sub:'Per area + per equipment',
      anno:{ lab:'Transparency', text:'Worker tahu persis area mana yang authorized. Required cert untuk area yang belum authorized — bisa request.' },
      render: () => <M4_AccessStatus /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 3 — Worker Mobile"
        title="Worker view — digital ID &amp; compliance"
        description="4 screen untuk worker: kartu ID digital yang selalu accessible (offline cached), daftar sertifikasi dengan tracking expiry, compliance score gamification, dan access status per area / equipment."
      />
      <div className="grid gap-x-[260px] gap-y-14" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(390px, max-content))' }}>
        {screens.map(s => (
          <div key={s.id} className="scroll-mt-32">
            <PhoneFrame label={s.label} sub={s.sub} anno={showAnno?s.anno:null}>
              {s.render()}
            </PhoneFrame>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Gate Console
// ============================================================
function GateTab({ showAnno }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader
        eyebrow="Tab 4 — Gate Console · Tablet"
        title="Security operator console"
        description="Always-on tablet di pintu gate. Dark mode high-contrast. QR / RFID scan → auto-validation (identity + area access + cert + suspension list). GREEN granted atau RED denied dengan reason."
      />

      {/* Granted state */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W14a</span>
          <h3 className="text-[15px] font-bold tracking-tight">State: ACCESS GRANTED</h3>
        </div>
        <TabletFrame><W14_GateConsole mode="granted" /></TabletFrame>
        {showAnno && (
          <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            <div>Big GREEN dengan check icon, audio chime. 4 validation checkpoints visible: identity, access area, certs, not suspended. Sidebar last 10 scans untuk audit trail visual.</div>
          </div>
        )}
      </div>

      {/* Denied state */}
      <div className="mt-10">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W14b</span>
          <h3 className="text-[15px] font-bold tracking-tight">State: ACCESS DENIED (MCU expired)</h3>
        </div>
        <TabletFrame><W14_GateConsole mode="denied" /></TabletFrame>
        {showAnno && (
          <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            <div>Big RED dengan X icon, audio alarm subtle. Reason ditampilkan prominent. Override hanya untuk security supervisor — dengan reason logged.</div>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {[
          { ic:'qr-code',         t:'Multi-method scan',    d:'QR di app, RFID kartu fisik, atau search NIK manual. Auto-fallback kalau satu method gagal.' },
          { ic:'shield-check',    t:'Real-time validation', d:'4 check parallel: identity, area access, cert valid, not suspended. Response &lt;500ms.' },
          { ic:'history',         t:'Audit trail',           d:'Setiap scan tercatat immutable: timestamp, worker, result, override (if any), operator. Untuk regulator audit.' },
        ].map(n => (
          <div key={n.t} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name={n.ic} size={17} /></div>
            <div className="mt-3 text-[13px] font-bold tracking-tight">{n.t}</div>
            <div className="text-[12px] text-muted mt-1 leading-relaxed">{n.d}</div>
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
    return ['admin','compliance','mobile','gate'].includes(h) ? h : 'admin';
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
      {active === 'admin'      && <AdminTab      showAnno={showAnno} />}
      {active === 'compliance' && <ComplianceTab showAnno={showAnno} />}
      {active === 'mobile'     && <MobileTab     showAnno={showAnno} />}
      {active === 'gate'       && <GateTab       showAnno={showAnno} />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1700px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · Contractor Management · Authoritative source · SMKP &amp; Kepmen ESDM 1827</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">Compliance review with HSE + IT Security</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
