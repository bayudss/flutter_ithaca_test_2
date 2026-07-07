// PTW Module — main app shell with persona tabs.

const TABS = [
  { id:'worker',   label:'Worker Mobile',  icon:'smartphone', sub:'11 screens · iPhone' },
  { id:'approver', label:'SPV / SO Mobile', icon:'check-square', sub:'Approval flow' },
  { id:'admin',    label:'SO Web Admin',    icon:'sliders',   sub:'4 screens · web' },
  { id:'cc',       label:'Command Center',  icon:'radar',     sub:'Tablet · dark' },
];

function TopBar({ active, setActive, showAnno, setShowAnno }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[10px] text-subtle">PTW / Permit to Work · Safety-critical</div>
          </div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html"      className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design</a>
          <a href="Safety Module.html"      className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="shield" size={13} /> Safety</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-danger-50 text-danger-700 font-semibold"><Icon name="clipboard-list" size={13} /> PTW</span>
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
        {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-danger-500 mb-1.5">{eyebrow}</div>}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ letterSpacing: '-0.02em' }}>{title}</h2>
        {description && <p className="mt-1.5 text-[14px] text-muted max-w-2xl">{description}</p>}
      </div>
      {right}
    </div>
  );
}

// ============================================================
// Worker tab — P1-P11
// ============================================================
function WorkerTab({ showAnno }) {
  const screens = [
    { id:'P1', label:'P1 — PTW Home', sub:'Daftar permit saya',
      anno:{ lab:'Tab + filter', text:'2 tab (saya / approver) dengan badge counter. Filter status chips. Active card highlight + countdown timer.' },
      render: () => <P1_Home /> },
    { id:'P2', label:'P2 — Pilih jenis', sub:'6 type color-coded',
      anno:{ lab:'Color-coded', text:'Setiap permit type punya warna khusus konsisten di semua modul. CS punya badge "SO wajib" prominent.' },
      render: () => <P2_TypePicker /> },
    { id:'P3', label:'P3 — Detail kerja', sub:'Step 1/5 · GPS + overlap',
      anno:{ lab:'Validasi overlap', text:'Sistem auto-detect PTW lain di area sama. Banner warning saat overlap detected — coordination required.' },
      render: () => <P3_FormStep1 /> },
    { id:'P4', label:'P4 — Hazard', sub:'Step 2/5 · risk matrix',
      anno:{ lab:'Auto-suggest', text:'Hazard list auto-suggest per type. Severity × Probability = score, lalu residual setelah control measures.' },
      render: () => <P4_FormStep2 /> },
    { id:'P5', label:'P5 — Worker', sub:'Step 3/5 · cert validation',
      anno:{ lab:'Cert block', text:'Sistem validasi sertifikasi otomatis. Worker dengan expired cert tidak bisa di-assign (BLOCKED state).' },
      render: () => <P5_FormStep3 /> },
    { id:'P6', label:'P6 — Review', sub:'Step 4/5 · documents',
      anno:{ lab:'Acknowledgment', text:'Self-signature di akhir. Risk Assessment + JSA wajib di-link sebelum bisa submit.' },
      render: () => <P6_FormStep4 /> },
    { id:'P7', label:'P7 — Submit', sub:'Step 5/5 · approval flow',
      anno:{ lab:'Approval flow', text:'Visualisasi flow approval dengan estimasi waktu. High-risk badge prominent untuk Hot Work / Confined Space.' },
      render: () => <P7_FormStep5 /> },
    { id:'P8', label:'P8 — Status', sub:'Timeline + comments',
      anno:{ lab:'SLA tracking', text:'Timeline approval dengan SLA timer. Warning saat SLA breach. Chat dengan approver real-time.' },
      render: () => <P8_StatusTracking /> },
    { id:'P9', label:'P9 — Briefing', sub:'Group photo + 5 signatures',
      anno:{ lab:'Wajib lengkap', text:'Activate PTW hanya bisa setelah semua signature lengkap. Foto group dengan face detection + GPS verified.' },
      render: () => <P9_PreJobBriefing /> },
    { id:'P10', label:'P10 — Gas test', sub:'CS only · setiap 4 jam',
      anno:{ lab:'Auto-suspend on FAIL', text:'4 parameter (O₂/LEL/H₂S/CO) dengan range safe. FAIL → auto-suspend PTW + alert SO + worker pull-out.' },
      render: () => <P10_GasTest /> },
    { id:'P11', label:'P11 — Close-out', sub:'Checklist + 3 signature',
      anno:{ lab:'Tutup PTW', text:'Checklist 7 step wajib selesai. 3 signature: worker + SPV + SO. Tanpa SO sign, PTW tidak bisa di-close.' },
      render: () => <P11_CloseOut /> },
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 1 — Worker Mobile"
        title="PTW — Worker flow"
        description="11 screen dari home, pilih type, 5-step form pengajuan, tracking status, pre-job briefing, gas test untuk Confined Space, hingga close-out signature."
      />
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {screens.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#scr-${s.id}`}
               className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-token bg-white text-[11px] font-semibold whitespace-nowrap hover:bg-elev hover:border-danger-200">
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
            <PhoneFrame label={s.label} sub={s.sub} anno={showAnno?s.anno:null}>
              {s.render()}
            </PhoneFrame>
          </div>
        ))}
      </div>

      {/* Compliance principles */}
      <div className="mt-14 surface rounded-xl p-6 border-l-4 border-l-danger-500 max-w-5xl">
        <div className="flex items-start gap-3">
          <Icon name="shield-check" size={22} className="text-danger-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[15px] font-extrabold tracking-tight">Compliance: SMKP + ISO 45001</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-[12px]">
              {[
                ['Cert validation block','Worker dengan sertifikasi expired tidak bisa di-assign — hardcoded di system.'],
                ['Risk Assessment wajib','Setiap PTW link ke RA terdokumentasi. Hazard register + control measures.'],
                ['Pre-job briefing','Activate hanya setelah signature lengkap + foto group + face detection.'],
                ['Gas test setiap 4 jam','CS auto-reminder. FAIL → auto-suspend + alert SO + audit log immutable.'],
                ['Validitas max 12 jam','1 shift only. Extension max +12 jam dengan SO approval + reason.'],
                ['Audit trail immutable','Setiap action signed dengan hash. Ready untuk audit eksternal Kemnaker / Direktorat Mineral.'],
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
// Approver tab — P12-P13
// ============================================================
function ApproverTab({ showAnno }) {
  const screens = [
    { id:'P12', label:'P12 — Approval inbox', sub:'SPV / SO · counter pending',
      anno:{ lab:'Swipe action', text:'Swipe right approve, swipe left reject. SLA breach card highlighted dengan red border + label.' },
      render: () => <P12_ApprovalInbox /> },
    { id:'P13', label:'P13 — Approval detail', sub:'Review + sign-off',
      anno:{ lab:'Validation panel', text:'Pre-approval validation otomatis: cert worker, hazard, JSA, overlap. Warning ditampilkan inline.' },
      render: () => <P13_ApprovalDetail /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 2 — SPV / SO Mobile"
        title="Approval flow — mobile"
        description="Untuk Supervisor (L1) dan Safety Officer (L2). Inbox dengan SLA tracker, detail review dengan validation panel, approve / reject / conditional approval."
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

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon:'shield-check', title:'Two-level approval',  desc:'L1 Supervisor area (semua PTW) + L2 Safety Officer (CS, WH>6m, HW, EX dekat utility) wajib.' },
          { icon:'timer',        title:'SLA tracking',         desc:'Target 30 menit per level. Auto-eskalasi ke HSE Lead jika breach >1 jam.' },
          { icon:'message-square',title:'Conditional approval', desc:'"Approve dengan catatan" — approver bisa kasih syarat sebelum work dimulai.' },
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
// Admin tab — W1-W4
// ============================================================
function AdminTab({ showAnno }) {
  const screens = [
    { id:'W1', label:'W1 — SO Dashboard',  anno:'KPIs + map site dengan pin PTW color-coded. Quick list real-time + pending approval table dengan SLA flag.',
      render: () => <W1_Dashboard /> },
    { id:'W2', label:'W2 — PTW Detail',    anno:'Comprehensive view dengan map, hazard register, action panel. Print certificate PDF untuk dipasang di area kerja.',
      render: () => <W2_Detail /> },
    { id:'W3', label:'W3 — Compliance',    anno:'Donut by type, trend 12 bulan, area heatmap, contractor performance. Export PDF untuk regulator (Kemnaker / Minerba).',
      render: () => <W3_Compliance /> },
    { id:'W4', label:'W4 — PTW Templates', anno:'Library template yang sering dipakai. Auto-fill form dengan data template — speed-up 68% vs from scratch.',
      render: () => <W4_Library /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 3 — SO Web Admin"
        title="PTW — Safety Officer web"
        description="Untuk HSE Lead dan Safety Officer. Dashboard dengan map site, detail view dengan hazard register, compliance report untuk audit, dan template library."
      />
      <div className="space-y-10">
        {screens.map(s => (
          <div key={s.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span>
              <h3 className="text-[15px] font-bold tracking-tight">{s.label.split('—')[1]}</h3>
            </div>
            <BrowserChrome url={`https://app.nusaraya.id/safety/ptw/${s.id.toLowerCase()}`} height={820}>
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
// Command Center tab — W5
// ============================================================
function CCTab({ showAnno }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader
        eyebrow="Tab 4 — Command Center · Tablet"
        title="PTW Live Operations"
        description="Always-on dashboard untuk operator Command Center. Dark theme high-contrast, map fullscreen dengan pin PTW color-coded, alert panel real-time, event stream."
      />
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W5</span>
          <h3 className="text-[15px] font-bold tracking-tight">Command Center Live · 1280×800 tablet · landscape</h3>
        </div>
        <TabletFrame>
          <W5_CommandCenter />
        </TabletFrame>
        {showAnno && (
          <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            <div>Map fullscreen dengan 12 PTW active. Right panel: alerts critical, expiring &lt;2h, active list. Bottom: event stream live. Pin warna mengikuti permit type — operator hafal warna dalam minggu pertama.</div>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-3 max-w-6xl">
        {[
          { ic:'map',           t:'Live site map',        d:'Pin per PTW dengan color by type. Pulse animation indicate active. Click → detail card.' },
          { ic:'alert-triangle',t:'Alert panel',           d:'Gas test overdue, PTW expiring 1h, weather suspend. Auto-prioritize critical first.' },
          { ic:'clock',         t:'Expiring tracker',      d:'PTW yang akan expire dalam 2 jam. Reminder push ke initiator + SO.' },
          { ic:'rss',           t:'Event stream',          d:'23 events / hour rata-rata. Color-coded per event type. Click untuk drill-down.' },
        ].map(n => (
          <div key={n.t} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-danger-50 text-danger-600 flex items-center justify-center">
              <Icon name={n.ic} size={17} />
            </div>
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
    return ['worker','approver','admin','cc'].includes(h) ? h : 'worker';
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
      {active === 'worker'   && <WorkerTab   showAnno={showAnno} />}
      {active === 'approver' && <ApproverTab showAnno={showAnno} />}
      {active === 'admin'    && <AdminTab    showAnno={showAnno} />}
      {active === 'cc'       && <CCTab       showAnno={showAnno} />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1700px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · PTW Module · Safety-critical · SMKP &amp; ISO 45001</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">Review with HSE Lead before production</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
