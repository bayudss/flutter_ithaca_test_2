// PTW — Web screens W1-W4 (SO Admin).

// ============================================================
// Web sidebar (Safety section · PTW highlighted)
// ============================================================
function WebSidebar({ current='dashboard' }) {
  const items = [
    { id:'overview',   name:'Overview',          icon:'layout-dashboard' },
    { id:'incidents',  name:'Incidents',          icon:'shield-alert' },
    { id:'dashboard',  name:'PTW Dashboard',      icon:'clipboard-list', active:true },
    { id:'compliance', name:'Compliance & audit', icon:'file-check-2' },
    { id:'library',    name:'PTW templates',      icon:'library' },
    { id:'investigation',name:'Investigation',    icon:'search' },
    { id:'training',   name:'Training & cert',    icon:'graduation-cap' },
  ];
  return (
    <aside className="w-60 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 px-4 border-b border-token flex items-center gap-2.5">
        <BrandMark size={30} />
        <div className="leading-tight">
          <div className="text-[12px] font-bold tracking-tight">Nusaraya</div>
          <div className="text-[9px] uppercase tracking-wider text-danger-700 font-bold">HSE · Safety</div>
        </div>
      </div>
      <div className="px-3 py-4 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Modules</div>
        <nav className="space-y-0.5">
          {items.map(i => {
            const active = i.id === current;
            return (
              <a key={i.id}
                 className={`flex items-center gap-2.5 px-3 h-9 rounded-md text-[12.5px] font-medium transition-colors
                   ${active?'bg-danger-50 text-danger-700':'text-muted hover:bg-elev'}`}>
                <Icon name={i.icon} size={15} />
                <span>{i.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
      <div className="p-3 border-t border-token">
        <div className="rounded-lg bg-elev p-3">
          <div className="text-[10px] uppercase tracking-wider text-danger-700 font-bold">Operator</div>
          <div className="text-[12px] font-bold mt-0.5">Bu Sari Hartati</div>
          <div className="text-[10px] text-muted">HSE Lead · Site Bahana</div>
        </div>
      </div>
    </aside>
  );
}

function WebTopBar({ title, sub }) {
  return (
    <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
      <div>
        <div className="text-[10px] text-subtle uppercase tracking-wider">{sub}</div>
        <div className="text-[14px] font-bold tracking-tight">{title}</div>
      </div>
      <div className="flex-1" />
      <div className="bg-elev rounded-md px-3 h-9 flex items-center gap-2 text-[12px] text-subtle min-w-[300px]">
        <Icon name="search" size={14} />
        <span>Cari PTW number, lokasi, pekerja…</span>
        <span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span>
      </div>
      <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative">
        <Icon name="bell" size={17} />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" />
      </button>
      <div className="h-6 w-px bg-[color:var(--border)]" />
      <div className="flex items-center gap-2">
        <Avatar name="Sari Hartati" size={32} tone="danger" />
        <div className="hidden lg:block leading-tight">
          <div className="text-[12px] font-bold">Sari Hartati</div>
          <div className="text-[10px] text-subtle">HSE Lead</div>
        </div>
        <Icon name="chevron-down" size={14} className="text-subtle" />
      </div>
    </header>
  );
}

function FilterChip({ icon, children, dot, tone }) {
  const t = tone==='danger'?'border-danger-300 bg-danger-50 text-danger-700':'border-token bg-white';
  return (
    <button className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-md ${t} text-[12px] font-semibold hover:border-danger-300 hover:bg-danger-50/40`}>
      {icon && <Icon name={icon} size={13} className="text-subtle" />}
      <span>{children}</span>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-danger-500 -ml-0.5" />}
      <Icon name="chevron-down" size={13} className="text-subtle" />
    </button>
  );
}

function KPICard({ icon, label, value, sub, tone='brand', delta }) {
  const tones = {
    brand:   'bg-brand-50 text-brand-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger:  'bg-danger-50 text-danger-500',
    safety:  'bg-safety-50 text-safety-600',
  };
  return (
    <div className="surface rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tones[tone]}`}>
          <Icon name={icon} size={17} />
        </div>
        {delta && <div className={`text-[11px] font-semibold ${delta.startsWith('+')?'text-success-600':'text-danger-600'} inline-flex items-center gap-1`}>
          <Icon name={delta.startsWith('+')?'trending-up':'trending-down'} size={12} /> {delta}
        </div>}
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-wider text-subtle font-semibold">{label}</div>
      <div className="mt-0.5 text-[24px] font-extrabold tracking-tight mono">{value}</div>
      {sub && <div className="text-[11px] text-subtle mt-0.5">{sub}</div>}
    </div>
  );
}

// ============================================================
// Sample data for web tables
// ============================================================
const WEB_PTW = [
  { id:'PTW-2026-00123', type:'HW', loc:'Coal Pad Agra · Sec 3',     init:'Budi Santoso',   spv:'Hadi W.',     so:'Sari H.',  state:'active',    risk:'high', from:'08:00', to:'14:30', dur:'6j 30m', workers:3, lat:42, lng:55 },
  { id:'PTW-2026-00124', type:'CS', loc:'Tangki BBM C · MH 1',        init:'Joko Pranoto',   spv:'Hadi W.',     so:'Sari H.',  state:'active',    risk:'high', from:'06:00', to:'10:00', dur:'4j',     workers:5, lat:62, lng:38, mandatorySO:true },
  { id:'PTW-2026-00125', type:'WH', loc:'Workshop Bahana · Atap',     init:'Bagas R.',        spv:'Andi P.',     so:'Sari H.',  state:'active',    risk:'med',  from:'09:00', to:'15:00', dur:'6j',     workers:2, lat:48, lng:70 },
  { id:'PTW-2026-00126', type:'IS', loc:'Substation A · Panel 4',     init:'Eko Saputra',     spv:'Andi P.',     so:'Yusuf K.', state:'active',    risk:'high', from:'14:00', to:'18:00', dur:'4j',     workers:4, lat:30, lng:42 },
  { id:'PTW-2026-00127', type:'EX', loc:'Hauling Rd · KM 42',          init:'Surya P.',        spv:'Rian D.',     so:'Yusuf K.', state:'active',    risk:'med',  from:'07:00', to:'19:00', dur:'12j',    workers:6, lat:72, lng:25 },
  { id:'PTW-2026-00128', type:'HW', loc:'PIT Bahana · Maint Yard',     init:'Adi Wibowo',      spv:'Rian D.',     so:'-',        state:'pending',   risk:'high', from:'10:00', to:'14:00', dur:'4j',     workers:2, sla:'breach' },
  { id:'PTW-2026-00131', type:'GE', loc:'Coal Pad Agra · Inspeksi',   init:'Lina Marbun',     spv:'Hadi W.',     so:'-',        state:'pending',   risk:'low',  from:'13:00', to:'17:00', dur:'4j',     workers:2 },
  { id:'PTW-2026-00133', type:'WH', loc:'Conveyor C-04',                init:'Henny S.',        spv:'Andi P.',     so:'Sari H.',  state:'suspended', risk:'med',  from:'09:00', to:'17:00', dur:'8j',     workers:3 },
  { id:'PTW-2026-00120', type:'CS', loc:'Tangki BBM A · MH 2',         init:'Topan W.',        spv:'Hadi W.',     so:'Sari H.',  state:'closed',    risk:'high', from:'06:00', to:'10:00', dur:'4j',     workers:5 },
];

// ============================================================
// W1 — SO Dashboard
// ============================================================
function W1_Dashboard({ onPickRow }) {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="dashboard" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="PTW Dashboard — Selasa, 19 Mei 2026" sub="HSE · Safety" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="circle-play"    label="PTW active sekarang" value="12"   tone="success" sub="5 lokasi · 3 type" delta="+2" />
              <KPICard icon="clock"          label="Pending approval"     value="5"   tone="warning" sub="1 SLA breach" delta="+1" />
              <KPICard icon="check-circle-2" label="Closed today"          value="18"  tone="brand"   sub="Avg duration 5j 12m" />
              <KPICard icon="shield-check"   label="Compliance rate"        value="97%" tone="success" sub="Mei 2026 · target ≥95%" delta="+1.4%" />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar" tone="danger">19 Mei 2026</FilterChip>
              <FilterChip icon="clipboard-list">Semua type</FilterChip>
              <FilterChip icon="map-pin" dot>3 lokasi</FilterChip>
              <FilterChip icon="alert-triangle">Semua risk</FilterChip>
              <FilterChip icon="circle-play">Active + Pending</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="download">Export CSV</Btn>
              <Btn variant="primary" size="sm" icon="plus">New PTW</Btn>
            </div>

            {/* Map + sidebar */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
              <div className="surface rounded-xl overflow-hidden">
                <div className="px-5 h-12 flex items-center gap-3 border-b border-token">
                  <Icon name="map" size={16} className="text-danger-600" />
                  <div className="text-[13px] font-bold tracking-tight">Site map · 12 PTW active</div>
                  <div className="flex-1" />
                  <div className="flex items-center gap-2 text-[10.5px]">
                    {Object.values(PERMIT_TYPES).map(t => (
                      <span key={t.code} className="inline-flex items-center gap-1"><span className={`w-2.5 h-2.5 rounded-sm bg-${t.tone}-500`} /> {t.code}</span>
                    ))}
                  </div>
                </div>
                <div className="relative h-[460px]" style={{ background:'linear-gradient(180deg, #EAF1F8 0%, #FEF4E5 100%)' }}>
                  <svg viewBox="0 0 1000 460" className="absolute inset-0 w-full h-full">
                    {/* topo lines */}
                    <path d="M0,180 Q200,160 400,180 T800,170 T1000,200" stroke="#9EBCDA" strokeWidth="1.2" fill="none" opacity="0.5" strokeDasharray="6 6" />
                    <path d="M0,260 Q220,220 440,250 T820,230 T1000,260" stroke="#9EBCDA" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="4 4" />
                    <path d="M0,340 Q180,320 380,340 T780,330 T1000,360" stroke="#9EBCDA" strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="4 4" />
                    {/* labels */}
                    <text x="35" y="55" fontSize="10" fill="#5b6472" fontWeight="700">SITE BAHANA · 19 Mei 2026 · 11:48 WITA</text>
                    <text x="100" y="220" fontSize="9" fill="#5b6472" fontWeight="600" opacity="0.5">PIT BAHANA</text>
                    <text x="420" y="380" fontSize="9" fill="#5b6472" fontWeight="600" opacity="0.5">COAL PAD AGRA</text>
                    <text x="700" y="160" fontSize="9" fill="#5b6472" fontWeight="600" opacity="0.5">WORKSHOP BAHANA</text>
                    <text x="850" y="320" fontSize="9" fill="#5b6472" fontWeight="600" opacity="0.5">HAULING ROAD</text>
                  </svg>
                  {/* PTW pins */}
                  {WEB_PTW.filter(p => p.state==='active' && p.lat && p.lng).map(p => {
                    const t = PERMIT_TYPES[p.type];
                    return (
                      <button key={p.id}
                        onClick={() => onPickRow && onPickRow(p)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left:`${p.lng}%`, top:`${p.lat}%` }}>
                        <div className={`relative w-9 h-9 rounded-full bg-${t.tone}-500 text-white flex items-center justify-center border-2 border-white shadow-lg`}>
                          <Icon name={t.icon} size={16} />
                          <span className={`absolute -inset-1 rounded-full bg-${t.tone}-500/30 pulse-dot`} />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-brand-700 text-white text-[10px] font-bold shadow">
                          {p.id} · {t.code}
                        </div>
                      </button>
                    );
                  })}
                  {/* Bottom mini stats */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-lg p-2 flex items-center gap-4 text-[11px]">
                    {Object.entries({ HW:3, CS:2, WH:2, IS:1, EX:1, GE:3 }).map(([k,v]) => {
                      const t = PERMIT_TYPES[k];
                      return (
                        <div key={k} className="flex items-center gap-1.5">
                          <span className={`w-3 h-3 rounded bg-${t.tone}-500`} />
                          <span className="font-bold mono">{v}</span>
                          <span className="text-muted">{t.code}</span>
                        </div>
                      );
                    })}
                    <span className="text-subtle ml-auto mono">refreshed 11:48:32</span>
                  </div>
                </div>
              </div>

              {/* PTW list */}
              <div className="surface rounded-xl overflow-hidden flex flex-col">
                <div className="px-4 h-11 border-b border-token flex items-center gap-2 shrink-0">
                  <Icon name="list" size={15} className="text-danger-600" />
                  <div className="text-[12px] font-bold uppercase tracking-wider">Quick list</div>
                  <span className="ml-auto inline-flex items-center gap-1 px-1.5 h-5 rounded bg-success-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Live
                  </span>
                </div>
                <div className="overflow-y-auto p-2 space-y-1.5 max-h-[460px]">
                  {WEB_PTW.slice(0, 7).map(p => {
                    const t = PERMIT_TYPES[p.type];
                    return (
                      <button key={p.id} onClick={() => onPickRow && onPickRow(p)}
                        className="w-full text-left rounded-lg border border-token hover:border-danger-300 hover:bg-danger-50/30 p-2.5 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-6 h-6 rounded bg-${t.tone}-500 text-white flex items-center justify-center`}><Icon name={t.icon} size={11} /></span>
                          <span className="text-[11px] font-extrabold mono">{p.id}</span>
                          <span className="ml-auto"><PermitStatusBadge status={p.state} size="sm" blink={true} /></span>
                        </div>
                        <div className="text-[11.5px] font-semibold truncate">{p.loc}</div>
                        <div className="flex items-center gap-2 text-[10px] text-muted mt-0.5">
                          <Icon name="users" size={10} /> {p.workers}
                          <Icon name="clock" size={10} className="ml-1" /> {p.from}–{p.to}
                          {p.sla === 'breach' && <span className="ml-auto text-danger-700 font-bold">SLA</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pending approvals table */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-5 h-12 flex items-center gap-3 border-b border-token">
                <Icon name="clock" size={16} className="text-warning-600" />
                <div className="text-[13px] font-bold tracking-tight">Pending approval · 5</div>
                <div className="flex items-center gap-1 px-1.5 h-5 rounded bg-danger-50 text-danger-700 text-[10px] font-bold">
                  <Icon name="alert-triangle" size={11} /> 1 SLA breach
                </div>
                <div className="flex-1" />
                <Btn variant="ghost" size="sm" icon="filter">Filter</Btn>
              </div>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                    <th className="px-5 py-2.5">PTW · Type</th>
                    <th className="px-3 py-2.5">Lokasi</th>
                    <th className="px-3 py-2.5">Initiator</th>
                    <th className="px-3 py-2.5">Approver</th>
                    <th className="px-3 py-2.5">SLA</th>
                    <th className="px-3 py-2.5 w-32"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {WEB_PTW.filter(p => p.state==='pending').map(p => {
                    const t = PERMIT_TYPES[p.type];
                    return (
                      <tr key={p.id} className="hover:bg-elev cursor-pointer" onClick={() => onPickRow && onPickRow(p)}>
                        <td className="px-5 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className={`w-7 h-7 rounded bg-${t.tone}-500 text-white flex items-center justify-center`}><Icon name={t.icon} size={13} /></span>
                            <div>
                              <div className="text-[11px] font-extrabold mono">{p.id}</div>
                              <div className="text-[10px] text-muted">{t.code} · {t.label}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2.5"><span className="font-semibold">{p.loc}</span></td>
                        <td className="px-3 py-2.5"><span className="font-semibold">{p.init}</span></td>
                        <td className="px-3 py-2.5 text-muted">{p.spv} → {p.so || '—'}</td>
                        <td className="px-3 py-2.5">
                          {p.sla === 'breach'
                            ? <StatusPill tone="danger" size="sm" icon="alert-triangle">SLA breach</StatusPill>
                            : <StatusPill tone="warning" size="sm" icon="clock">On-time</StatusPill>}
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex gap-1 justify-end">
                            <button className="h-7 px-2 rounded border border-danger-200 text-danger-700 text-[10px] font-bold">Tolak</button>
                            <button className="h-7 px-2 rounded bg-success-500 text-white text-[10px] font-bold">Setujui</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W2 — PTW Detail (Web)
// ============================================================
function W2_Detail() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="dashboard" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="PTW-2026-00123 · Hot Work — Coal Pad Agra Sec 3" sub="HSE · Safety · Detail view" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6">
            {/* Header banner */}
            <div className="rounded-xl bg-hw-500 text-white p-4 flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Icon name="flame" size={28} /></div>
              <div className="flex-1">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-90">PTW-HW · Hot Work</div>
                <div className="text-[22px] font-extrabold tracking-tight">Pengelasan pipa header 4" stasiun pompa Coal Pad</div>
                <div className="text-[12px] opacity-85 mt-1">PTW-2026-00123 · diissue Pak Hadi W. · diapprove Bu Sari H.</div>
              </div>
              <div className="flex items-center gap-2">
                <PermitStatusBadge status="active" blink={true} size="lg" />
                <Btn variant="dark" size="sm" icon="printer" className="bg-white/15 hover:bg-white/25 border-white/30">Certificate PDF</Btn>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* Left: full info */}
              <div className="col-span-12 lg:col-span-4 space-y-4">
                <div className="surface rounded-xl p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Permit information</div>
                  {[
                    { l:'Permit number', v:'PTW-2026-00123', mono:true },
                    { l:'Type',          v:'HW · Hot Work' },
                    { l:'Status',        v:'Active', tone:'success' },
                    { l:'Risk',          v:'Tinggi · max 20 → residu 6', tone:'hw' },
                    { l:'Lokasi',        v:'Coal Pad Agra · Sec 3' },
                    { l:'Koordinat',     v:'-1.2340, 116.7890', mono:true },
                    { l:'Periode',       v:'20 Mei · 08:00 – 14:30', mono:true },
                    { l:'Durasi',        v:'6 jam 30 menit' },
                    { l:'Worker',        v:'3 orang · 1 fire watch' },
                    { l:'Equipment',     v:'2 unit (Welder, Grinder)' },
                  ].map((r,i) => (
                    <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-token last:border-b-0 text-[12px]">
                      <span className="text-subtle">{r.l}</span>
                      <span className={`font-bold text-right ${r.mono?'mono':''} ${r.tone==='success'?'text-success-700':r.tone==='hw'?'text-hw-700':''}`}>{r.v}</span>
                    </div>
                  ))}
                </div>
                <div className="surface rounded-xl p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Approver chain</div>
                  <div className="space-y-2.5">
                    {[
                      { role:'Initiator',    name:'Budi Santoso',    tone:'brand',  t:'08:00', state:'done' },
                      { role:'L1 · SPV',     name:'Pak Hadi Wijaya', tone:'safety', t:'08:15', state:'done' },
                      { role:'L2 · SO',      name:'Bu Sari Hartati', tone:'danger', t:'09:32', state:'done' },
                      { role:'Pre-job brief',name:'5 signatures',    tone:'success',t:'09:55', state:'done' },
                    ].map((p,i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <Avatar name={p.name} size={32} tone={p.tone} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{p.role}</div>
                          <div className="text-[12px] font-bold truncate">{p.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-subtle mono">{p.t}</div>
                          <Icon name="check-circle-2" size={14} className="text-success-500 ml-auto" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center: map + tabs */}
              <div className="col-span-12 lg:col-span-5 space-y-4">
                <div className="surface rounded-xl overflow-hidden">
                  <div className="relative h-[280px]" style={{ background:'linear-gradient(180deg, #CFDDEC 0%, #FEF4E5 100%)' }}>
                    <svg viewBox="0 0 600 280" className="absolute inset-0 w-full h-full">
                      <path d="M0,120 Q150,100 300,130 T600,140" stroke="#1F4E79" strokeWidth="1.5" fill="none" opacity="0.3" />
                      <rect x="80" y="40"   width="160" height="60" rx="3" fill="#1F4E79" opacity="0.18" />
                      <rect x="360" y="160" width="180" height="80" rx="3" fill="#1F4E79" opacity="0.18" />
                      <text x="100" y="75"  fontSize="11" fill="#143452" fontWeight="700">PIT BAHANA</text>
                      <text x="380" y="200" fontSize="11" fill="#143452" fontWeight="700">COAL PAD AGRA</text>
                    </svg>
                    <div className="absolute" style={{ left:'68%', top:'68%', transform:'translate(-50%,-50%)' }}>
                      <div className="relative w-14 h-14 rounded-full bg-hw-500 text-white flex items-center justify-center border-2 border-white shadow-2xl">
                        <Icon name="flame" size={26} />
                        <span className="absolute -inset-2 rounded-full bg-hw-500/30 pulse-dot" />
                      </div>
                      <div className="text-[10px] mono mt-1 text-center bg-white/90 px-1.5 py-0.5 rounded font-bold">-1.234, 116.789</div>
                    </div>
                    {/* Buffer ring */}
                    <div className="absolute pointer-events-none" style={{ left:'68%', top:'68%', transform:'translate(-50%,-50%)' }}>
                      <div className="w-32 h-32 rounded-full border-2 border-dashed border-hw-500/40" />
                    </div>
                    <div className="absolute top-3 left-3 px-2 py-1 rounded bg-white/90 backdrop-blur text-[10px] font-bold inline-flex items-center gap-1.5">
                      <Icon name="map-pin" size={11} className="text-hw-500" /> Buffer 50m · 1 PTW di area
                    </div>
                  </div>
                  <div className="px-4 h-11 border-b border-token flex items-center gap-1">
                    {['Documents','Hazard register','Gas log','Signature','Audit log'].map((t,i) => (
                      <button key={t} className={`px-3 h-9 text-[12px] font-bold ${i===1?'text-hw-700 border-b-2 border-hw-500 -mb-px':'text-muted hover:text-[color:var(--text)]'}`}>{t}</button>
                    ))}
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted mb-2">Hazard register · 4 hazard · max residu 6</div>
                    <div className="space-y-1.5 text-[11.5px]">
                      {[
                        { l:'Percikan api / kebakaran',  s:5, p:4, score:20, residu:6, ctl:'Fire watch · extinguisher 2 · blanket' },
                        { l:'Asap & gas berbahaya',      s:4, p:3, score:12, residu:4, ctl:'Ventilation · masker P2 · cek angin' },
                        { l:'Luka bakar pekerja',         s:4, p:2, score:8,  residu:3, ctl:'Fire-resist suit · safety glass' },
                        { l:'Ledakan gas terjebak',       s:5, p:2, score:10, residu:2, ctl:'Gas test before · isolasi area · LEL ≤10%' },
                      ].map((h,i) => (
                        <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center px-2 py-1.5 rounded bg-elev">
                          <div>
                            <div className="font-bold">{h.l}</div>
                            <div className="text-[10px] text-subtle">{h.ctl}</div>
                          </div>
                          <span className={`mono font-extrabold rounded px-1.5 h-5 text-[10px] inline-flex items-center ${h.score>=15?'sev-5':h.score>=10?'sev-4':h.score>=6?'sev-3':'sev-2'}`}>
                            {h.score}
                          </span>
                          <span className="mono font-extrabold rounded px-1.5 h-5 text-[10px] inline-flex items-center bg-success-50 text-success-700">
                            → {h.residu}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: timeline + actions */}
              <div className="col-span-12 lg:col-span-3 space-y-4">
                <div className="surface rounded-xl p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Action panel</div>
                  <div className="space-y-2">
                    <Btn variant="success" full icon="check-circle-2">Approve</Btn>
                    <Btn variant="outlineDanger" full icon="x">Reject</Btn>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button className="h-10 rounded-lg bg-white border border-token-strong text-warning-700 text-[11px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="pause-circle" size={13} /> Suspend</button>
                      <button className="h-10 rounded-lg bg-white border border-token-strong text-brand-700 text-[11px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="clock" size={13} /> Extend</button>
                    </div>
                    <button className="h-10 w-full rounded-lg bg-danger-500 text-white text-[11px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="alert-octagon" size={13} /> Force close (emergency)</button>
                  </div>
                </div>

                <div className="surface rounded-xl p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Comments</div>
                  <div className="space-y-2 text-[11.5px]">
                    {[
                      { who:'Hadi W.',  msg:'Approved. Fire ext 2 unit di-stage.',          t:'08:15', tone:'safety' },
                      { who:'Budi S.',  msg:'Siap, sudah disiapkan.',                        t:'08:32', tone:'brand' },
                      { who:'Sari H.',  msg:'Approved. Pastikan briefing on-time 07:45.',    t:'09:32', tone:'danger' },
                    ].map((c,i) => (
                      <div key={i} className="flex gap-2">
                        <Avatar name={c.who} size={24} tone={c.tone} />
                        <div className="flex-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-[10.5px]">{c.who}</span>
                            <span className="text-[9px] text-subtle mono ml-auto">{c.t}</span>
                          </div>
                          <div className="text-[11px]">{c.msg}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W3 — Compliance Report
// ============================================================
function W3_Compliance() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="compliance" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="PTW Compliance Report — Mei 2026" sub="HSE · Safety" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* period & export */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar" tone="danger">Mei 2026</FilterChip>
              <FilterChip icon="layers">Semua type</FilterChip>
              <FilterChip icon="map-pin">Semua area</FilterChip>
              <FilterChip icon="truck">Semua kontraktor</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="file-text">Audit trail</Btn>
              <Btn variant="primary" size="sm" icon="download">Export PDF (regulator)</Btn>
            </div>

            {/* KPI compliance */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
              <KPICard icon="clipboard-list" label="Total PTW issued"      value="384"   tone="brand"   sub="vs 312 bulan lalu"  delta="+23%" />
              <KPICard icon="check-circle-2" label="Approved"               value="362"   tone="success" sub="94.3% rate" />
              <KPICard icon="x-circle"       label="Rejected"               value="22"    tone="danger"  sub="5.7% · turun -1.2%" />
              <KPICard icon="timer"          label="Avg approval time"      value="22m"   tone="warning" sub="target ≤30m" delta="-4m" />
              <KPICard icon="rotate-cw"      label="Extension rate"          value="8.4%"  tone="warning" sub="vs target ≤10%" />
              <KPICard icon="pause-circle"   label="Suspended / cancelled"   value="11"    tone="danger"  sub="2.9% · 4 weather" />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              {/* Donut: PTW by type */}
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">PTW by type · Mei 2026</div>
                <div className="flex items-center gap-6">
                  <Donut values={[{c:'#E24B4A',v:88,l:'HW'},{c:'#378ADD',v:64,l:'CS'},{c:'#F39800',v:72,l:'WH'},{c:'#EF9F27',v:58,l:'IS'},{c:'#8B5A2B',v:42,l:'EX'},{c:'#5b6472',v:60,l:'GE'}]} total={384} />
                  <div className="flex-1 space-y-1.5 text-[12px]">
                    {[
                      { l:'HW Hot Work', n:88, pct:23, c:'hw' },
                      { l:'CS Confined Space', n:64, pct:17, c:'cs' },
                      { l:'WH Work at Height', n:72, pct:19, c:'wh' },
                      { l:'IS Isolation', n:58, pct:15, c:'is' },
                      { l:'EX Excavation', n:42, pct:11, c:'ex' },
                      { l:'GE General', n:60, pct:16, c:'ge' },
                    ].map(r => (
                      <div key={r.l} className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-sm bg-${r.c}-500`} />
                        <span className="flex-1 font-semibold">{r.l}</span>
                        <span className="mono font-bold">{r.n}</span>
                        <span className="mono text-subtle w-12 text-right">{r.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trend 12 bulan */}
              <div className="surface rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[13px] font-bold tracking-tight">Trend 12 bulan</div>
                  <div className="flex items-center gap-3 text-[10.5px]">
                    <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-500" /> Issued</span>
                    <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-success-500" /> Approved</span>
                  </div>
                </div>
                <TrendLine />
              </div>
            </div>

            {/* Area heatmap + contractor */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">PTW by area · heatmap</div>
                <AreaHeatmap />
              </div>
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">By contractor · cost & compliance</div>
                <div className="space-y-2.5">
                  {[
                    { n:'Nusaraya Internal',   ptw:248, rate:'97.2%', tone:'success' },
                    { n:'PT KNC Hauling',      ptw:78,  rate:'94.8%', tone:'success' },
                    { n:'PT Surya Maintenance',ptw:34,  rate:'88.2%', tone:'warning' },
                    { n:'PT Bahana Welding',   ptw:24,  rate:'91.6%', tone:'success' },
                  ].map((c,i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-token bg-white">
                      <Icon name="truck" size={16} className="text-subtle" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-bold">{c.n}</div>
                        <div className="text-[10.5px] text-muted">{c.ptw} PTW · compliance {c.rate}</div>
                      </div>
                      <div className="w-24 h-2 rounded-full bg-elev overflow-hidden">
                        <div className={`h-full bg-${c.tone}-500`} style={{ width:c.rate }} />
                      </div>
                      <StatusPill tone={c.tone} size="sm">{c.tone==='success'?'On target':'Watch'}</StatusPill>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audit trail */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                <Icon name="file-check-2" size={16} className="text-danger-600" />
                <div className="text-[13px] font-bold tracking-tight">Audit trail · immutable log</div>
                <span className="text-[10px] mono text-subtle">last 4 dari 1,284 entries</span>
                <div className="flex-1" />
                <Btn variant="ghost" size="sm" icon="download">CSV</Btn>
              </div>
              <table className="w-full text-[11.5px]">
                <thead>
                  <tr className="text-left text-[9.5px] font-bold uppercase tracking-wider text-subtle bg-elev">
                    <th className="px-5 py-2">Timestamp</th>
                    <th className="px-3 py-2">Actor</th>
                    <th className="px-3 py-2">Action</th>
                    <th className="px-3 py-2">Target</th>
                    <th className="px-3 py-2">Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {[
                    { t:'11:42:18', a:'Sari Hartati',  act:'PTW Approved',     tgt:'PTW-2026-00125', h:'a8f3...c92b' },
                    { t:'11:38:02', a:'System',         act:'SLA breach alert', tgt:'PTW-2026-00128', h:'7e22...f481' },
                    { t:'11:32:48', a:'Hadi Wijaya',    act:'PTW Approved',     tgt:'PTW-2026-00131', h:'5c19...a3d7' },
                    { t:'11:28:11', a:'System',         act:'Gas test PASS',    tgt:'PTW-2026-00124', h:'9b40...e2f5' },
                  ].map((r,i) => (
                    <tr key={i} className="hover:bg-elev">
                      <td className="px-5 py-2 mono text-[10.5px]">{r.t}</td>
                      <td className="px-3 py-2 font-semibold">{r.a}</td>
                      <td className="px-3 py-2">{r.act}</td>
                      <td className="px-3 py-2 mono">{r.tgt}</td>
                      <td className="px-3 py-2 mono text-[10px] text-subtle">{r.h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== Donut chart ===================
function Donut({ values, total }) {
  const sum = values.reduce((a,b)=>a+b.v,0);
  let acc = 0;
  return (
    <svg viewBox="0 0 100 100" width="180" height="180">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#F5F6F8" strokeWidth="14" />
      {values.map((seg,i) => {
        const frac = seg.v/sum;
        const a0 = acc * 2 * Math.PI - Math.PI/2;
        const a1 = (acc+frac) * 2 * Math.PI - Math.PI/2;
        const x0 = 50 + 40*Math.cos(a0), y0 = 50 + 40*Math.sin(a0);
        const x1 = 50 + 40*Math.cos(a1), y1 = 50 + 40*Math.sin(a1);
        const large = frac>0.5?1:0;
        acc += frac;
        return (
          <path key={i}
            d={`M ${x0} ${y0} A 40 40 0 ${large} 1 ${x1} ${y1}`}
            fill="none" stroke={seg.c} strokeWidth="14" />
        );
      })}
      <text x="50" y="48" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="JetBrains Mono">{total}</text>
      <text x="50" y="60" textAnchor="middle" fontSize="6" fill="#8b94a2" fontWeight="700">TOTAL PTW</text>
    </svg>
  );
}

// =================== Trend line chart ===================
function TrendLine() {
  const issued   = [248, 268, 285, 270, 295, 312, 328, 318, 342, 358, 372, 384];
  const approved = [232, 252, 268, 254, 278, 296, 308, 302, 322, 339, 351, 362];
  const labels   = ['Jun','Jul','Agu','Sep','Okt','Nov','Des','Jan','Feb','Mar','Apr','Mei'];
  const w = 600, h = 200;
  const max = 420;
  const xs = i => 30 + (i/(issued.length-1))*(w-40);
  const ys = v => h - 22 - (v/max)*(h-30);
  const path = arr => arr.map((v,i)=>`${i?'L':'M'}${xs(i)} ${ys(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: 220 }}>
      {[0, 100, 200, 300, 400].map((p,i) => (
        <g key={i}>
          <line x1="30" x2={w} y1={ys(p)} y2={ys(p)} stroke="#E6E8EC" />
          <text x="2" y={ys(p)+3} fontSize="9" fill="#8b94a2" fontFamily="JetBrains Mono">{p}</text>
        </g>
      ))}
      <path d={path(issued)} stroke="#1F4E79" strokeWidth="2" fill="none" />
      <path d={path(approved)} stroke="#1D9E75" strokeWidth="2" fill="none" />
      {labels.map((l,i) => <text key={i} x={xs(i)} y={h-6} fontSize="9" fill="#5b6472" textAnchor="middle">{l}</text>)}
      <circle cx={xs(issued.length-1)} cy={ys(issued[issued.length-1])} r="3" fill="#1F4E79" />
      <circle cx={xs(approved.length-1)} cy={ys(approved[approved.length-1])} r="3" fill="#1D9E75" />
    </svg>
  );
}

// =================== Area heatmap ===================
function AreaHeatmap() {
  const areas = ['PIT Bahana','Coal Pad Agra','Workshop','Substation A','Hauling Rd','Tangki BBM','Crusher','Office'];
  const months = ['Jun','Jul','Agu','Sep','Okt','Nov','Des','Jan','Feb','Mar','Apr','Mei'];
  const rng = (a,m) => {
    const v = ((a*7+m*13+a*m)%100)/100 * 0.7 + 0.1;
    if (a===0 && m>=8) return 0.92;
    if (a===1 && m===11) return 0.85;
    if (a===4 && m===4) return 0.78;
    return v;
  };
  return (
    <div>
      <div className="grid" style={{ gridTemplateColumns:`110px repeat(${months.length}, 1fr)` }}>
        <div />
        {months.map(m => <div key={m} className="text-center text-[9.5px] font-bold text-subtle pb-1">{m}</div>)}
        {areas.map((a,ai) => (
          <React.Fragment key={a}>
            <div className="text-[11px] font-bold flex items-center pr-2 truncate">{a}</div>
            {months.map((_,mi) => {
              const v = rng(ai, mi);
              return <div key={mi} className="aspect-square m-0.5 rounded relative flex items-center justify-center"
                          style={{ background: `rgba(226,75,74,${v.toFixed(2)})` }}>
                {v>0.8 && <span className="text-[8px] font-extrabold text-white mono">!</span>}
              </div>;
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 text-[10px] text-subtle">
        <span>Low</span>
        <div className="flex">
          {[0.15,0.3,0.5,0.7,0.9].map(v => <span key={v} className="w-5 h-3" style={{ background:`rgba(226,75,74,${v})` }} />)}
        </div>
        <span>High</span>
      </div>
    </div>
  );
}

// ============================================================
// W4 — PTW Library / Template
// ============================================================
function W4_Library() {
  const templates = [
    { n:'Routine welding maintenance Coal Pad', type:'HW', used:23, last:'12 Mei', tags:['routine','coal pad'] },
    { n:'Daily confined space tank BBM',         type:'CS', used:45, last:'19 Mei', tags:['daily','BBM tank'] },
    { n:'Conveyor maintenance @ atap',           type:'WH', used:18, last:'15 Mei', tags:['conveyor'] },
    { n:'Electrical LOTO panel substation A',    type:'IS', used:32, last:'17 Mei', tags:['LOTO','panel'] },
    { n:'Pipa culvert excavation hauling road',  type:'EX', used:14, last:'08 Mei', tags:['drainage'] },
    { n:'General inspeksi rutin equipment',      type:'GE', used:67, last:'19 Mei', tags:['inspection'] },
  ];
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="library" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="PTW Templates" sub="HSE · Safety · Library" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-elev rounded-md px-3 h-10 flex-1 max-w-[480px] border border-token">
                <Icon name="search" size={15} className="text-subtle" />
                <input placeholder="Cari template..." className="flex-1 bg-transparent outline-none text-[13px]" />
              </div>
              <FilterChip icon="clipboard-list">Semua type</FilterChip>
              <FilterChip icon="trending-up">Most used</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="upload">Import</Btn>
              <Btn variant="primary" size="sm" icon="plus">New template</Btn>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="library"        label="Total templates" value="42" tone="brand" sub="6 type · semua aktif" />
              <KPICard icon="trending-up"    label="Used this month" value="218" tone="success" sub="dari 384 PTW · 57%" />
              <KPICard icon="zap"            label="Avg speed-up"     value="68%" tone="safety" sub="vs new PTW from scratch" />
              <KPICard icon="shield-check"   label="Pre-validated"     value="100%" tone="success" sub="reviewed by HSE Lead" />
            </div>

            {/* Templates grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {templates.map(t => {
                const tt = PERMIT_TYPES[t.type];
                return (
                  <div key={t.n} className="surface rounded-xl p-4 hover:border-danger-200 transition-colors group">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-${tt.tone}-500 text-white flex items-center justify-center`}>
                        <Icon name={tt.icon} size={22} />
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-subtle font-bold uppercase tracking-wider">Used</div>
                        <div className="text-[20px] font-extrabold mono text-brand-700 leading-none">{t.used}<span className="text-[11px] font-bold text-subtle">×</span></div>
                      </div>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-subtle mono">{tt.code}</div>
                    <div className="text-[14px] font-extrabold leading-tight" style={{ textWrap:'balance' }}>{t.n}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {t.tags.map(tag => <span key={tag} className="px-1.5 h-5 rounded bg-elev text-[10px] font-semibold text-muted">{tag}</span>)}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10.5px]">
                      <span className="text-muted">Terakhir dipakai {t.last}</span>
                      <button className="font-bold text-brand-700 inline-flex items-center gap-1"><Icon name="copy" size={11} /> Use template</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.W1_Dashboard  = W1_Dashboard;
window.W2_Detail     = W2_Detail;
window.W3_Compliance = W3_Compliance;
window.W4_Library    = W4_Library;
