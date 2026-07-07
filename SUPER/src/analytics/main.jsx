// Analytics & Dashboard — main app shell.

const TABS = [
  { id:'executive',   label:'Executive',     icon:'crown' },
  { id:'operational', label:'Operational',   icon:'activity' },
  { id:'hr',          label:'HR',            icon:'users' },
  { id:'hse',         label:'HSE',           icon:'shield-alert' },
  { id:'fac',         label:'FAC',           icon:'building-2' },
  { id:'command',     label:'Command Center',icon:'radar' },
  { id:'mobile',      label:'Mobile',        icon:'smartphone' },
];

function TopBar({ active, setActive, showAnno, setShowAnno }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight"><div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div><div className="text-[10px] text-subtle">Analytics &amp; Dashboard · aggregated KPI</div></div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design</a>
          <a href="Transportation Module.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="bus" size={13} /> Transport</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 font-semibold"><Icon name="bar-chart-3" size={13} /> Analytics</span>
        </nav>
        <button onClick={() => setShowAnno(s => !s)}
          className={`inline-flex items-center gap-1.5 px-2.5 h-8 rounded-md border text-[11.5px] font-bold transition-colors ${showAnno?'bg-brand-500 border-brand-500 text-white':'bg-white border-token text-muted hover:border-brand-300'}`}>
          <Icon name={showAnno?'eye':'eye-off'} size={13} />{showAnno?'Annotations on':'Annotations off'}
        </button>
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-elev text-[11px] mono text-muted"><span className="w-1.5 h-1.5 rounded-full bg-success-500" /> v1.0</div>
      </div>
      <nav className="px-4 md:px-8 flex items-end gap-1 border-t border-token bg-white -mt-px overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`relative flex items-center gap-2 px-3 h-12 text-[13px] font-semibold transition-colors whitespace-nowrap ${active === t.id ? 'tab-active' : 'text-muted hover:text-[color:var(--text)]'}`}>
            <Icon name={t.icon} size={15} /><span>{t.label}</span>
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

// Single-screen web tab wrapper
function WebTab({ eyebrow, title, desc, screenId, screenTitle, anno, height=900, showAnno, urlBase='https://analytics.nusaraya.id', render }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader eyebrow={eyebrow} title={title} description={desc} />
      <div className="mb-3 flex items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{screenId}</span><h3 className="text-[15px] font-bold tracking-tight">{screenTitle}</h3></div>
      <BrowserChrome url={`${urlBase}/${screenId.toLowerCase()}`} height={height}>{render()}</BrowserChrome>
      {showAnno && <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2"><Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>{anno}</div></div>}
    </div>
  );
}

// Mobile tab (M1, M2)
function MobileTab({ showAnno }) {
  const screens = [
    { id:'M1', label:'My Team Performance', sub:'SPV · team KPI', anno:{ lab:'SPV light analytics', text:'Tim attendance/PJA/obs/compliance + comparison vs bulan lalu. Member list dengan quick stats, tap untuk detail.' }, render:() => <M1_TeamPerformance /> },
    { id:'M2', label:'Personal Insights', sub:'worker · stats saya', anno:{ lab:'Worker insights', text:'Stats personal (attendance/PJA/obs/streak) + gamification. Comparison personal vs team avg.' }, render:() => <M2_PersonalInsights /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader eyebrow="Tab 7 — Mobile" title="Light analytics · SPV &amp; Worker"
        description="2 screen mobile: My Team Performance untuk SPV (team KPI + member drill), dan Personal Insights untuk worker (stats personal + gamification + comparison vs team)." />
      <div className="flex flex-wrap gap-x-[260px] gap-y-14">
        {screens.map(s => (
          <PhoneFrame key={s.id} label={`${s.id} — ${s.label}`} sub={s.sub} anno={showAnno?s.anno:null}>{s.render()}</PhoneFrame>
        ))}
      </div>

      {/* Design notes */}
      <div className="mt-12 surface rounded-xl p-6 border-l-4 border-l-brand-500 max-w-5xl">
        <div className="flex items-start gap-3">
          <Icon name="bar-chart-3" size={22} className="text-brand-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[15px] font-extrabold tracking-tight">Performance &amp; data architecture</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-[12px]">
              {[
                ['Multi-source aggregation','8 SuperApps modules + SAP S/4HANA + FMS PrimaMine + Toledo weighbridge + Azure Data Lake.'],
                ['Dashboard load <3s','Skeleton loading + lazy-load deep drill-down on-demand.'],
                ['Configurable refresh','Real-time (FMS/SOS), 15s-6h interval per dashboard sesuai sumber.'],
                ['Print-friendly PDF','Executive monthly report + export at any drill level.'],
                ['Role-based dashboards','Executive, Operational, HR, HSE, FAC, Command Center — masing-masing perspektif.'],
                ['AI insights','Azure ML generated insights dengan confidence score di setiap dashboard.'],
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

// Command center (full-bleed dark, no browser chrome distractions but keep frame)
function CommandTab({ showAnno }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader eyebrow="Tab 6 — Command Center" title="Live multi-panel operations"
        description="Dark mission-control: SOS active (sound alert), PTW map, shuttle live, production (FMS), weather, system health. KPI ticker scrolling bawah, configurable per operator." />
      <div className="mb-3 flex items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">A6</span><h3 className="text-[15px] font-bold tracking-tight">Command Center Live · multi-panel</h3></div>
      <BrowserChrome url="https://analytics.nusaraya.id/command" height={760}><A6_CommandCenter /></BrowserChrome>
      {showAnno && <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2"><Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>6 panel: SOS active (REC + responder ETA), PTW map, production gauge (FMS), shuttle live, weather, system health. KPI ticker scroll bawah. Per-operator configurable layout.</div></div>}
    </div>
  );
}

function App() {
  const [active, setActive] = React.useState(() => {
    const h = (window.location.hash || '').replace('#','');
    return ['executive','operational','hr','hse','fac','command','mobile'].includes(h) ? h : 'executive';
  });
  const [showAnno, setShowAnno] = React.useState(true);

  React.useEffect(() => { window.history.replaceState(null, '', `#${active}`); }, [active]);
  React.useEffect(() => { if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } }); });

  return (
    <div className="min-h-screen">
      <TopBar active={active} setActive={setActive} showAnno={showAnno} setShowAnno={setShowAnno} />
      {active === 'executive'   && <WebTab showAnno={showAnno} eyebrow="Tab 1 — Executive" title="Executive Dashboard" desc="High-level strategic KPI untuk CEO/COO: workforce, production, safety, compliance dengan trend 12 bulan dan AI strategic insights." screenId="A1" screenTitle="Executive Dashboard" anno="Hero KPI besar, 4 trend chart (production/headcount/incident/cost) dengan target line, AI strategic insights, data freshness panel." render={() => <A1_Executive />} />}
      {active === 'operational' && <WebTab showAnno={showAnno} eyebrow="Tab 2 — Operational" title="Operational Dashboard" desc="Daily ops & throughput untuk Operations Manager: equipment availability, OEE, hauling cycle, weighbridge, bottleneck." screenId="A2" screenTitle="Operational Dashboard" anno="KPI ops + production gauge live (FMS) + site map status + hauling efficiency + bottleneck identification dengan drill-down." render={() => <A2_Operational />} />}
      {active === 'hr'          && <WebTab showAnno={showAnno} eyebrow="Tab 3 — HR" title="HR Dashboard" desc="Workforce KPI untuk HR Head: attendance, turnover, OT, leave. Attendance heatmap, distribution, top late, leave forecast." screenId="A3" screenTitle="HR Dashboard" anno="Attendance heatmap 30d×jam, distribution by dept (organik vs kontraktor), top 10 late, leave forecast dengan spike Idul Adha, action items." render={() => <A3_HR />} />}
      {active === 'hse'         && <WebTab showAnno={showAnno} eyebrow="Tab 4 — HSE" title="HSE Dashboard" desc="Safety KPI untuk Safety Head: LTIR/TRIR/LTI, near-miss, PTW, observation. Pareto incident, location heatmap, behavioral analytics." screenId="A4" screenTitle="HSE Dashboard" anno="6 safety KPI, Pareto by category (80/20), incident location map, PTW donut + compliance, observation trend + behavioral (unsafe cond/act/positive)." render={() => <A4_HSE />} />}
      {active === 'fac'         && <WebTab showAnno={showAnno} eyebrow="Tab 5 — Facility" title="FAC Dashboard" desc="Occupancy, catering, transport untuk FAC Head. Camp occupancy heatmap, meal forecast accuracy, shuttle on-time, cost dashboard." screenId="A5" screenTitle="FAC Dashboard" anno="Occupancy heatmap per camp×building, meal consumption vs forecast (±3.2% accuracy), shuttle on-time per rute, cost breakdown catering/housekeeping/maintenance." render={() => <A5_FAC />} />}
      {active === 'command'     && <CommandTab showAnno={showAnno} />}
      {active === 'mobile'      && <MobileTab showAnno={showAnno} />}

      {/* Builder + Explorer accessible from Executive area as extra — surface them under Operational footer link instead via hash; show inside their own sections */}
      {active === 'executive' && (
        <div className="px-4 md:px-8 pb-12 max-w-[1700px] space-y-10">
          <div>
            <div className="mb-3 flex items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">A7</span><h3 className="text-[15px] font-bold tracking-tight">Custom Report Builder</h3></div>
            <BrowserChrome url="https://analytics.nusaraya.id/builder" height={680}><A7_Builder /></BrowserChrome>
            {showAnno && <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2"><Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>Drag-drop metric library → canvas. Pilih visualization (bar/line/pie/table/map/KPI), apply filters, save & share dengan role/individual.</div></div>}
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">A8</span><h3 className="text-[15px] font-bold tracking-tight">Drill-Down Explorer</h3></div>
            <BrowserChrome url="https://analytics.nusaraya.id/explorer" height={680}><A8_Explorer /></BrowserChrome>
            {showAnno && <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2"><Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>3-level drill: Workforce → by Contractor → by Worker. Breadcrumb navigation, export at any level, lazy-load deep levels.</div></div>}
          </div>
        </div>
      )}

      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1700px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · Analytics &amp; Dashboard · 8 modules + SAP + FMS + Toledo + Azure Data Lake</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">React · Recharts · Leaflet</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
