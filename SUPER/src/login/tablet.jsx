// Tablet view — Command Center live monitoring.

function CommandCenter() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = (n) => String(n).padStart(2,'0');
  const time = `${fmt(now.getHours())}:${fmt(now.getMinutes())}:${fmt(now.getSeconds())}`;

  return (
    <div className="h-full w-full flex flex-col text-white" style={{ background: '#0A0F18' }}>
      {/* Sticky alert bar */}
      <div className="bg-danger-500 text-white px-5 h-10 flex items-center gap-3 shrink-0">
        <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-white text-white pulse-dot" />
        <div className="font-bold text-[12px] uppercase tracking-wider alert-blink">SOS Aktif · 2 incident</div>
        <div className="h-4 w-px bg-white/30" />
        <div className="text-[12px] flex-1 truncate">
          <span className="font-semibold">PIT-B · NSR-004812 (Hartono)</span>
          <span className="opacity-80 ml-2">— jatuh dari unit · 47s yang lalu</span>
        </div>
        <button className="h-7 px-3 bg-white text-danger-700 rounded text-[11px] font-extrabold uppercase tracking-wider">Respond</button>
      </div>

      {/* Header */}
      <header className="h-14 border-b shrink-0 px-5 flex items-center gap-4" style={{ borderColor: '#1a2333' }}>
        <div className="flex items-center gap-2.5">
          <BrandMark size={28} ring={false} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">Command Center</div>
            <div className="text-[10px] text-white/55 uppercase tracking-wider">Live Operations · Bukit Sangatta</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 ml-4 px-2.5 h-7 rounded-md text-[11px] font-semibold" style={{ background: '#11192680', color: '#9EBCDA' }}>
          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-500 pulse-dot text-success-500" />
          All systems online
        </div>

        <div className="flex-1" />

        {/* Counters */}
        <div className="flex items-center gap-2">
          <CounterChip icon="alert-octagon" label="SOS" value="2" tone="danger" />
          <CounterChip icon="alert-triangle" label="Alert" value="7" tone="warning" />
          <CounterChip icon="file-clock"     label="PTW" value="14" tone="info" />
          <CounterChip icon="bus"            label="Shuttle" value="8/9" tone="success" />
        </div>

        <div className="h-8 w-px mx-2" style={{ background: '#1a2333' }} />

        {/* Clock */}
        <div className="text-right">
          <div className="mono text-[20px] font-extrabold tracking-tight tabular-nums">{time}</div>
          <div className="text-[10px] text-white/55 uppercase tracking-wider">{now.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'short',year:'numeric'})} · WITA</div>
        </div>

        <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center text-[11px] font-bold ml-2">CC</div>
      </header>

      {/* Grid 2x2 */}
      <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-3 p-3">
        <Panel
          title="Site Map — Live"
          subtitle="Bukit Sangatta · Pit A/B/C · 12 unit aktif"
          icon="map"
          right={<MapControls />}
        >
          <MapView />
        </Panel>

        <Panel
          title="SOS Aktif"
          subtitle="2 incident open · MTTR rata-rata 4m 28s"
          icon="alert-octagon"
          tone="danger"
          right={<button className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white">Refresh</button>}
        >
          <SOSList />
        </Panel>

        <Panel
          title="Shuttle GPS Tracking"
          subtitle="8 dari 9 unit on-route · ETA real-time"
          icon="bus"
          right={<button className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white">Lihat rute</button>}
        >
          <ShuttleList />
        </Panel>

        <Panel
          title="Active Permit to Work"
          subtitle="14 PTW aktif · 3 perlu perpanjangan"
          icon="file-check-2"
          right={<button className="h-7 px-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15">+ New PTW</button>}
        >
          <PTWList />
        </Panel>
      </div>
    </div>
  );
}

function CounterChip({ icon, label, value, tone }) {
  const tones = {
    danger:  'bg-danger-500/15 text-danger-500 border-danger-500/30',
    warning: 'bg-warning-500/15 text-warning-500 border-warning-500/30',
    info:    'bg-info-500/15 text-info-500 border-info-500/30',
    success: 'bg-success-500/15 text-success-500 border-success-500/30',
  };
  return (
    <div className={`flex items-center gap-1.5 h-9 px-2.5 rounded-md border ${tones[tone]}`}>
      <Icon name={icon} size={14} />
      <div className="text-[9px] font-bold uppercase tracking-wider">{label}</div>
      <div className="text-[14px] font-extrabold mono tabular-nums">{value}</div>
    </div>
  );
}

function Panel({ title, subtitle, icon, tone, right, children }) {
  const toneBar = tone === 'danger' ? 'bg-danger-500' : 'bg-brand-500';
  return (
    <div className="rounded-xl border flex flex-col min-h-0 overflow-hidden" style={{ background: '#0F1623', borderColor: '#1a2333' }}>
      <div className="h-12 px-4 flex items-center gap-3 border-b shrink-0" style={{ borderColor: '#1a2333' }}>
        <div className={`w-1 h-5 rounded-full ${toneBar}`} />
        <Icon name={icon} size={16} className="text-white/70" />
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-bold tracking-tight leading-tight">{title}</div>
          <div className="text-[10px] text-white/55 truncate">{subtitle}</div>
        </div>
        {right}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

function MapControls() {
  return (
    <div className="flex items-center gap-1">
      {['layers','navigation','plus','minus'].map(i => (
        <button key={i} className="w-7 h-7 rounded-md hover:bg-white/10 flex items-center justify-center text-white/70">
          <Icon name={i} size={13} />
        </button>
      ))}
    </div>
  );
}

function MapView() {
  // Stylized topographic map of mining area
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0a121e' }}>
      <svg viewBox="0 0 600 360" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a2333" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="pit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#143452" />
            <stop offset="1" stopColor="#0F273E" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#grid)" />
        {/* Topographic contours */}
        {[80,120,160,200,240].map((r,i) => (
          <ellipse key={i} cx="200" cy="180" rx={r} ry={r * 0.6} fill="none" stroke="#1F4E79" strokeWidth={i===2 ? 1.2 : 0.5} opacity={0.5} />
        ))}
        {[60,100,140,180].map((r,i) => (
          <ellipse key={i} cx="460" cy="120" rx={r} ry={r * 0.55} fill="none" stroke="#1F4E79" strokeWidth={i===1 ? 1.2 : 0.5} opacity={0.45} />
        ))}
        {/* Pit areas (filled) */}
        <ellipse cx="200" cy="180" rx="50" ry="32" fill="url(#pit)" opacity="0.85" />
        <ellipse cx="460" cy="120" rx="38" ry="24" fill="url(#pit)" opacity="0.85" />
        <ellipse cx="340" cy="270" rx="44" ry="28" fill="url(#pit)" opacity="0.85" />
        {/* Roads */}
        <path d="M 30 320 Q 150 280 200 180 Q 260 100 340 120 Q 400 130 460 120" stroke="#4179AE" strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.6" />
        <path d="M 200 180 Q 280 220 340 270 Q 420 320 560 340" stroke="#4179AE" strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.6" />
        {/* labels */}
        <text x="200" y="184" textAnchor="middle" fill="#9EBCDA" fontSize="11" fontWeight="700" fontFamily="Inter">PIT A</text>
        <text x="460" y="124" textAnchor="middle" fill="#9EBCDA" fontSize="11" fontWeight="700" fontFamily="Inter">PIT B</text>
        <text x="340" y="274" textAnchor="middle" fill="#9EBCDA" fontSize="11" fontWeight="700" fontFamily="Inter">PIT C</text>
      </svg>

      {/* Pins */}
      <Pin x="62%" y="35%" tone="danger" pulse label="SOS · Hartono" />
      <Pin x="55%" y="72%" tone="danger" pulse label="SOS · Yanto" />
      <Pin x="32%" y="50%" tone="warning" label="Near-miss" />
      <Pin x="48%" y="40%" tone="info" label="Shuttle 04" />
      <Pin x="72%" y="60%" tone="info" label="Shuttle 07" />
      <Pin x="22%" y="68%" tone="info" label="Shuttle 02" />
      <Pin x="80%" y="30%" tone="success" label="HD-204" />
      <Pin x="40%" y="22%" tone="success" label="DT-118" />

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur rounded-md px-3 py-2 border border-white/10 text-[10px] flex flex-col gap-1">
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-danger-500" /> SOS Aktif</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warning-500" /> Alert / Near-miss</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-info-500" /> Shuttle</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success-500" /> Equipment OK</div>
      </div>

      {/* Coords overlay */}
      <div className="absolute top-3 right-3 bg-black/55 backdrop-blur rounded-md px-2.5 py-1.5 border border-white/10 mono text-[10px] text-white/80">
        -0.5124°, 117.5942° · zoom 14
      </div>
    </div>
  );
}

function Pin({ x, y, tone='info', pulse, label }) {
  const colors = {
    danger:  '#E24B4A',
    warning: '#EF9F27',
    info:    '#378ADD',
    success: '#1D9E75',
  };
  return (
    <div className="absolute" style={{ left: x, top: y, transform: 'translate(-50%, -100%)' }}>
      <div className="relative flex flex-col items-center">
        {pulse && (
          <span className="absolute top-2 w-3 h-3 rounded-full pulse-dot" style={{ color: colors[tone] }} />
        )}
        <svg width="22" height="28" viewBox="0 0 22 28">
          <path d="M11 0 C 4 0 0 5 0 11 C 0 19 11 28 11 28 C 11 28 22 19 22 11 C 22 5 18 0 11 0 Z"
                fill={colors[tone]} stroke="#0a121e" strokeWidth="1.5" />
          <circle cx="11" cy="11" r="4" fill="#fff" />
        </svg>
        {label && (
          <div className="absolute top-7 whitespace-nowrap bg-black/70 backdrop-blur text-[9px] px-1.5 py-0.5 rounded font-semibold mt-0.5" style={{ color: colors[tone] }}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

function SOSList() {
  const items = [
    { id:'SOS-04219', name:'Hartono S.',  nik:'NSR-004812', loc:'PIT B · Bench 4', desc:'Jatuh dari unit. Status sadar.', time:'47s', sev:'Critical', team:'Tim Medis B' },
    { id:'SOS-04218', name:'Yanto P.',    nik:'KNC-002104', loc:'PIT C · Loading',  desc:'Trauma kepala ringan',             time:'4m 12s', sev:'High',     team:'Safety C' },
  ];
  return (
    <div className="divide-y" style={{ borderColor: '#1a2333' }}>
      {items.map(s => (
        <div key={s.id} className="px-4 py-3" style={{ borderColor: '#1a2333' }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-danger-500/20 text-danger-500 flex items-center justify-center shrink-0">
              <Icon name="alert-octagon" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-[13px] font-bold leading-tight">{s.name}</div>
                <span className="text-[9px] mono text-white/55">{s.nik}</span>
                <span className={`inline-flex items-center gap-1 px-1.5 h-5 rounded text-[9px] font-bold uppercase tracking-wider ${s.sev==='Critical' ? 'bg-danger-500 text-white' : 'bg-warning-500 text-white'}`}>
                  {s.sev}
                </span>
              </div>
              <div className="mt-0.5 text-[11px] text-white/65">{s.desc}</div>
              <div className="mt-1 flex items-center gap-3 text-[10px] text-white/55">
                <span className="inline-flex items-center gap-1"><Icon name="map-pin" size={11} /> {s.loc}</span>
                <span className="inline-flex items-center gap-1"><Icon name="users" size={11} /> Dispatch: {s.team}</span>
                <span className="inline-flex items-center gap-1"><Icon name="clock" size={11} /> {s.time}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <button className="h-7 px-2.5 rounded-md bg-danger-500 text-white text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1"><Icon name="phone" size={11} /> Call</button>
              <button className="h-7 px-2.5 rounded-md bg-white/10 hover:bg-white/15 text-white text-[10px] font-bold inline-flex items-center gap-1"><Icon name="map" size={11} /> Track</button>
            </div>
          </div>
        </div>
      ))}
      <div className="px-4 py-3 text-[11px] text-white/45 flex items-center gap-2">
        <Icon name="history" size={13} />
        2 incident resolved hari ini · MTTR rata-rata 4m 28s
      </div>
    </div>
  );
}

function ShuttleList() {
  const shuttles = [
    { id:'SHTL-04', driver:'Adi P.',     route:'Camp → PIT B',     eta:'8m', occ:'18/22', speed:32, status:'on-route', tone:'info' },
    { id:'SHTL-07', driver:'Rini W.',    route:'PIT C → Workshop', eta:'2m', occ:'14/22', speed:24, status:'arriving', tone:'success' },
    { id:'SHTL-02', driver:'Joko T.',    route:'Camp → PIT A',     eta:'14m', occ:'21/22', speed:38, status:'on-route', tone:'info' },
    { id:'SHTL-09', driver:'—',          route:'Workshop',         eta:'—',  occ:'0/22',  speed:0,  status:'maintenance', tone:'warning' },
  ];
  const statusTone = {
    info:    'text-info-500 bg-info-500/15',
    success: 'text-success-500 bg-success-500/15',
    warning: 'text-warning-500 bg-warning-500/15',
  };
  return (
    <div className="divide-y" style={{ borderColor: '#1a2333' }}>
      {shuttles.map(s => (
        <div key={s.id} className="px-4 py-2.5 flex items-center gap-3" style={{ borderColor: '#1a2333' }}>
          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-info-500">
            <Icon name="bus" size={17} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="text-[12px] font-bold mono">{s.id}</div>
              <span className={`inline-flex items-center px-1.5 h-4 rounded text-[9px] font-bold uppercase tracking-wider ${statusTone[s.tone]}`}>
                {s.status}
              </span>
            </div>
            <div className="text-[11px] text-white/65 truncate">{s.route}</div>
            <div className="text-[10px] text-white/45">Driver: {s.driver}</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-right shrink-0">
            <div>
              <div className="text-[14px] font-extrabold mono tabular-nums">{s.eta}</div>
              <div className="text-[9px] uppercase tracking-wider text-white/45">ETA</div>
            </div>
            <div>
              <div className="text-[14px] font-extrabold mono tabular-nums">{s.occ}</div>
              <div className="text-[9px] uppercase tracking-wider text-white/45">Pax</div>
            </div>
            <div>
              <div className="text-[14px] font-extrabold mono tabular-nums">{s.speed}</div>
              <div className="text-[9px] uppercase tracking-wider text-white/45">km/h</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PTWList() {
  const items = [
    { id:'PTW-04891', type:'Hot work',   loc:'Workshop · Bay 3', exp:'2j',  iss:'Surya P.',  status:'active',    tone:'success' },
    { id:'PTW-04890', type:'Confined',   loc:'Tank Farm · T-04', exp:'45m', iss:'Dewi A.',   status:'expiring',  tone:'warning' },
    { id:'PTW-04889', type:'Working at height', loc:'Tower · WP-2', exp:'3j 20m', iss:'Bagas R.', status:'active', tone:'success' },
    { id:'PTW-04887', type:'Excavation', loc:'PIT A · Bench 2',  exp:'25m', iss:'Henny S.',  status:'expiring',  tone:'warning' },
    { id:'PTW-04885', type:'Cold work',  loc:'Conveyor C-12',    exp:'5j',  iss:'Topan W.',  status:'active',    tone:'success' },
  ];
  const tone = {
    success: 'text-success-500 bg-success-500/15',
    warning: 'text-warning-500 bg-warning-500/15',
  };
  return (
    <div className="divide-y overflow-y-auto h-full" style={{ borderColor: '#1a2333' }}>
      {items.map(p => (
        <div key={p.id} className="px-4 py-2.5 flex items-center gap-3" style={{ borderColor: '#1a2333' }}>
          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-success-500">
            <Icon name="file-check-2" size={17} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="text-[12px] font-bold mono">{p.id}</div>
              <span className={`inline-flex items-center px-1.5 h-4 rounded text-[9px] font-bold uppercase tracking-wider ${tone[p.tone]}`}>{p.status}</span>
            </div>
            <div className="text-[11px] text-white/65 truncate">{p.type} — {p.loc}</div>
            <div className="text-[10px] text-white/45">Issued: {p.iss}</div>
          </div>
          <div className="text-right shrink-0">
            <div className={`text-[14px] font-extrabold mono tabular-nums ${p.tone==='warning' ? 'text-warning-500' : 'text-white'}`}>{p.exp}</div>
            <div className="text-[9px] uppercase tracking-wider text-white/45">expires</div>
          </div>
        </div>
      ))}
    </div>
  );
}

window.CommandCenter = CommandCenter;
