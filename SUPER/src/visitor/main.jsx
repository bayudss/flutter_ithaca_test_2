// Visitor Management — main app shell.

const TABS = [
  { id:'host',    label:'Host Web',        icon:'user-plus',     sub:'V1,V2,V4 · register' },
  { id:'so',      label:'SO Web',          icon:'shield-check',  sub:'V3,V7 · approval' },
  { id:'gate',    label:'Gate Security',   icon:'door-open',     sub:'V5,V6,V8 · tablet' },
  { id:'visitor', label:'Visitor External',icon:'mail',          sub:'V9-V12 · pre-arrival' },
  { id:'escort',  label:'Escort Mobile',   icon:'user-check',    sub:'M1 · duty' },
];

function TopBar({ active, setActive, showAnno, setShowAnno }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[10px] text-subtle">Visitor Management + Mine Permit · compliance-critical</div>
          </div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design</a>
          <a href="PTW Module.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="clipboard-list" size={13} /> PTW</a>
          <a href="Contractor Management Module.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="building-2" size={13} /> Contractor</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 font-semibold"><Icon name="id-card" size={13} /> Visitor</span>
        </nav>
        <button onClick={() => setShowAnno(s => !s)}
          className={`inline-flex items-center gap-1.5 px-2.5 h-8 rounded-md border text-[11.5px] font-bold transition-colors
            ${showAnno?'bg-brand-500 border-brand-500 text-white':'bg-white border-token text-muted hover:border-brand-300'}`}>
          <Icon name={showAnno?'eye':'eye-off'} size={13} />
          {showAnno?'Annotations on':'Annotations off'}
        </button>
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-elev text-[11px] mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" /> v1.0
        </div>
      </div>
      <nav className="px-4 md:px-8 flex items-end gap-1 border-t border-token bg-white -mt-px overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`relative flex items-center gap-2 px-3 h-12 text-[13px] font-semibold transition-colors whitespace-nowrap
              ${active === t.id ? 'tab-active' : 'text-muted hover:text-[color:var(--text)]'}`}>
            <Icon name={t.icon} size={15} /><span>{t.label}</span>
            <span className="hidden lg:inline text-[10px] font-normal text-subtle ml-1">· {t.sub}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-6 md:mb-8">
      {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500 mb-1.5">{eyebrow}</div>}
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ letterSpacing:'-0.02em' }}>{title}</h2>
      {description && <p className="mt-1.5 text-[14px] text-muted max-w-3xl">{description}</p>}
    </div>
  );
}

// Generic web-screen stack
function WebStack({ screens, showAnno, urlBase }) {
  return (
    <div className="space-y-10">
      {screens.map(s => (
        <div key={s.id}>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span>
            <h3 className="text-[15px] font-bold tracking-tight">{s.title}</h3>
          </div>
          <BrowserChrome url={`${urlBase}/${s.id.toLowerCase()}`} height={s.height || 820}>
            {s.render()}
          </BrowserChrome>
          {showAnno && (
            <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
              <Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>{s.anno}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Tablet-screen stack (gate)
function TabletStack({ screens, showAnno }) {
  return (
    <div className="space-y-10">
      {screens.map(s => (
        <div key={s.id}>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span>
            <h3 className="text-[15px] font-bold tracking-tight">{s.title}</h3>
          </div>
          <TabletFrame>{s.render()}</TabletFrame>
          {showAnno && (
            <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
              <Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>{s.anno}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Host Web tab
// ============================================================
function HostTab({ showAnno }) {
  const screens = [
    { id:'V1', title:'Visitor Dashboard', anno:'KPI + 4 tab (upcoming/active/completed/registry). VIP & group badge. Compliance audit note Kepmen ESDM.', render:() => <V1_Dashboard /> },
    { id:'V2', title:'Register New Visit', anno:'3-step: visit info (area multi-select + risk), visitor list (bulk for group), preparations (K3L/MCU/NDA links). Submit → SO.', render:() => <V2_Register /> },
    { id:'V4', title:'Pre-Arrival Hub', anno:'Per-visitor card: K3L/MCU/NDA/Photo status. Email automation reminder. Tidak bisa issue permit sebelum 100% (kecuali emergency override).', render:() => <V4_PreArrival /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader eyebrow="Tab 1 — Host Web" title="Host / HR — registration &amp; tracking"
        description="Untuk host employee yang sponsor kunjungan. Dashboard registry, registrasi 3-step, dan pre-arrival hub untuk track completion K3L/MCU/NDA/photo sebelum visitor datang." />
      <WebStack screens={screens} showAnno={showAnno} urlBase="https://app.nusaraya.id/visitor/host" />
    </div>
  );
}

// ============================================================
// SO Web tab
// ============================================================
function SOTab({ showAnno }) {
  const screens = [
    { id:'V3', title:'SO Pre-Approval', anno:'Inbox visit requests. Conditional approval (approve sebagian area). Fast-track untuk regulator VIP. Decision + reason audit-logged.', render:() => <V3_SOApproval /> },
    { id:'V7', title:'Active Visit Monitoring', anno:'Live map + visitor list. Alert: unauthorized area, escort disconnected, overstay. Setiap alert + resolusi tercatat untuk audit.', height:880, render:() => <V7_Monitoring /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader eyebrow="Tab 2 — SO Web" title="Safety Officer — approval &amp; monitoring"
        description="SO sebagai gatekeeper compliance. Pre-approval dengan conditional area access, dan live monitoring dengan anomaly detection (unauthorized area, escort lost, overstay)." />
      <WebStack screens={screens} showAnno={showAnno} urlBase="https://app.nusaraya.id/visitor/so" />
    </div>
  );
}

// ============================================================
// Gate Security tab
// ============================================================
function GateTab({ showAnno }) {
  const screens = [
    { id:'V5', title:'Visitor Check-In', anno:'Search/scan QR. Verifikasi ID + live photo + vehicle plate. Issue permit (print/digital) + assign escort. Walk-in emergency flow fallback.', render:() => <V5_CheckIn /> },
    { id:'V8', title:'Visitor Exit', anno:'Scan QR permit. Returned items checklist, feedback rating, signature. Status → Closed, audit log difinalisasi.', render:() => <V8_Exit /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader eyebrow="Tab 3 — Gate Security · Tablet" title="Security gate — check-in, permit, exit"
        description="Tablet-optimized untuk operator security di gate. Check-in dengan verifikasi identity + photo, generate Mine Permit card, dan exit dengan returned-items checklist." />
      <TabletStack screens={screens} showAnno={showAnno} />

      {/* V6 permit card — full-width feature */}
      <div className="mt-10">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">V6</span>
          <h3 className="text-[15px] font-bold tracking-tight">Mine Permit Card (generated · printable)</h3>
        </div>
        <TabletFrame><V6_PermitCard /></TabletFrame>
        {showAnno && (
          <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            <div>Card design letterhead-style: photo prominent, permit number, valid period, areas authorized (✓/✗ + escort flag), escort info, QR verification, SO + visitor signature, compliance Kepmen ESDM footer. Print A6 atau digital wallet. Lost card → re-issue dengan audit.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Visitor External tab
// ============================================================
function VisitorTab({ showAnno }) {
  const webScreens = [
    { id:'V9',  title:'Invitation Email', anno:'Email template dengan visit details + 3 prep button (K3L/MCU/NDA). Link valid sampai tanggal visit.', height:760, render:() => <V9_Email /> },
    { id:'V10', title:'K3L Induction Online', anno:'8 slide module 45 menit + quiz 10 soal (pass 80%). Selfie anti-cheat aktif. Certificate auto-generate saat lulus.', height:900, render:() => <V10_Induction /> },
    { id:'V11', title:'MCU Declaration', anno:'Self-declaration riwayat penyakit, obat, alergi, kondisi fisik. Auto-flag SO jika high-risk (contoh: hipertensi → restricted area).', height:900, render:() => <V11_MCU /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader eyebrow="Tab 4 — Visitor External" title="Visitor self-service (pre-arrival)"
        description="Flow yang dialami visitor eksternal: terima email undangan, selesaikan K3L induction online (dengan quiz + anti-cheat selfie), MCU declaration, dan akses Mine Permit digital wallet." />
      <WebStack screens={webScreens} showAnno={showAnno} urlBase="https://visit.nusaraya.id" />

      {/* V12 mobile wallet */}
      <div className="mt-10">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">V12</span>
          <h3 className="text-[15px] font-bold tracking-tight">Mine Permit Wallet (visitor mobile · optional)</h3>
        </div>
        <div className="flex justify-start">
          <PhoneFrame label="V12 — Permit Wallet" sub="Digital QR · emergency hotline"
            anno={showAnno?{ lab:'Digital wallet', text:'Kalau visitor punya app: permit digital dengan QR, area authorized, escort info, emergency hotline. Otherwise printed card di gate.' }:null}>
            <V12_Wallet />
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Escort Mobile tab
// ============================================================
function EscortTab({ showAnno }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader eyebrow="Tab 5 — Escort Mobile" title="Escort employee duty"
        description="Untuk Nusaraya employee yang ditugaskan escort visitor. Lihat info visitor + area authorized, lapor lokasi untuk audit, cek authorization sebelum visitor masuk area, dan trigger SOS emergency." />
      <div className="flex justify-start">
        <PhoneFrame label="M1 — Escort Duty" sub="Active escort · authorization check + SOS"
          anno={showAnno?{ lab:'Escort duty', text:'Card active escort, area authorized visitor, quick action (lapor lokasi, cek authorization, end escort), dan emergency SOS. Authorization check menampilkan blocked area dengan jelas.' }:null}>
          <M1_EscortDuty />
        </PhoneFrame>
      </div>

      {/* Edge cases note */}
      <div className="mt-12 surface rounded-xl p-6 border-l-4 border-l-safety-500 max-w-5xl">
        <div className="flex items-start gap-3">
          <Icon name="git-branch" size={22} className="text-safety-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[15px] font-extrabold tracking-tight">Edge cases tercakup di mockup</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-[12px]">
              {[
                ['Walk-in visitor','Emergency flow di V5 (no pre-registration) dengan SO approval same-day.'],
                ['Visit extended','Overstay alert di V7 monitoring + extend option saat exit V8.'],
                ['Lost permit card','Re-issue di V6 dengan permit number baru, card lama auto-revoked, audit logged.'],
                ['Group visit (40)','Bulk add visitor di V2, group badge di V1 dashboard + SO inbox V3.'],
                ['VIP visit (Minister)','Fast-track badge di V3 SO approval — semua approval di-prioritize.'],
                ['Audit team (regulator)','Visitor type "Regulator/Auditor" dengan VIP flag + conditional area access.'],
                ['Vehicle pass','Plate tracking di V2 register, V5 check-in verify, V8 exit returned-items.'],
                ['High-risk MCU','Auto-flag SO di V11 (hipertensi → restricted high-altitude area).'],
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
// App
// ============================================================
function App() {
  const [active, setActive] = React.useState(() => {
    const h = (window.location.hash || '').replace('#','');
    return ['host','so','gate','visitor','escort'].includes(h) ? h : 'host';
  });
  const [showAnno, setShowAnno] = React.useState(true);

  React.useEffect(() => {
    window.history.replaceState(null, '', `#${active}`);
  }, [active]);

  React.useEffect(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } });
  });

  return (
    <div className="min-h-screen">
      <TopBar active={active} setActive={setActive} showAnno={showAnno} setShowAnno={setShowAnno} />
      {active === 'host'    && <HostTab    showAnno={showAnno} />}
      {active === 'so'      && <SOTab      showAnno={showAnno} />}
      {active === 'gate'    && <GateTab    showAnno={showAnno} />}
      {active === 'visitor' && <VisitorTab showAnno={showAnno} />}
      {active === 'escort'  && <EscortTab  showAnno={showAnno} />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1700px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · Visitor Management + Mine Permit · compliance Kepmen ESDM 1827/2018</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">Cross-cutting: Accommodation × Safety</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
