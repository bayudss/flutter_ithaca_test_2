// Command Center — W6 (live dashboard) + W7 (SOS detail drawer).

const SOS_LIST = [
  { id:'SOS-04219', name:'Hartono S.',  nik:'NSR-004812', loc:'PIT B · Bench 4', desc:'Jatuh dari unit. Sadar.',   age: 47,  sev:'CRITICAL', state:'in-progress', responder:'Hadi W.' },
  { id:'SOS-04218', name:'Yanto P.',    nik:'KNC-002104', loc:'PIT C · Loading', desc:'Trauma kepala ringan',      age: 252, sev:'HIGH',     state:'acknowledged', responder:'Surya P.' },
];

function CommandCenter({ onSOSClick, focusedSosId, onCloseDrawer }) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = (n) => String(n).padStart(2,'0');
  const time = `${fmt(now.getHours())}:${fmt(now.getMinutes())}:${fmt(now.getSeconds())}`;
  const dateStr = now.toLocaleDateString('id-ID',{ weekday:'long', day:'numeric', month:'short', year:'numeric' });

  return (
    <div className="h-full w-full flex flex-col text-white relative" style={{ background: '#0A0F18' }}>
      {/* Sticky alert bar */}
      <div className="bg-danger-500 text-white px-5 h-10 flex items-center gap-3 shrink-0">
        <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-white pulse-dot text-white" />
        <div className="font-extrabold text-[12px] uppercase tracking-wider alert-blink">SOS Aktif · 2 incident</div>
        <div className="h-4 w-px bg-white/30" />
        <div className="text-[12px] flex-1 truncate">
          <span className="font-bold">PIT-B · NSR-004812 (Hartono)</span>
          <span className="opacity-80 ml-2">— jatuh dari unit · 47s yang lalu</span>
        </div>
        <button className="h-7 px-3 bg-white text-danger-700 rounded text-[11px] font-extrabold uppercase tracking-wider">Open</button>
      </div>

      {/* Header */}
      <header className="h-14 border-b shrink-0 px-5 flex items-center gap-4" style={{ borderColor: '#1a2333' }}>
        <div className="flex items-center gap-2.5">
          <BrandMark size={28} />
          <div className="leading-tight">
            <div className="text-[13px] font-extrabold tracking-tight">Command Center · Nusaraya</div>
            <div className="text-[10px] text-white/55 uppercase tracking-wider">Live Operations · Bukit Sangatta</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 ml-4 px-2.5 h-7 rounded-md text-[11px] font-semibold" style={{ background: '#11192680', color: '#A6C6F5' }}>
          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-500 pulse-dot text-success-500" />
          All systems operational
        </div>

        <div className="flex-1" />

        {/* Counters */}
        <CCChip icon="alert-octagon"  label="SOS"     value="2"   tone="danger" />
        <CCChip icon="alert-triangle" label="Alert"   value="7"   tone="warning" />
        <CCChip icon="file-check-2"   label="PTW"     value="12"  tone="info" />
        <CCChip icon="bus"            label="Shuttle" value="8/9" tone="success" />
        <CCChip icon="users"          label="On-shift" value="2,381" tone="info" />

        <div className="h-8 w-px mx-2" style={{ background: '#1a2333' }} />

        {/* Clock */}
        <div className="text-right">
          <div className="mono text-[20px] font-extrabold tracking-tight tabular-nums">{time}</div>
          <div className="text-[10px] text-white/55 uppercase tracking-wider">{dateStr} · WITA</div>
        </div>

        <button className="w-9 h-9 rounded-md hover:bg-white/5 flex items-center justify-center text-white/70 ml-2">
          <Icon name="maximize" size={16} />
        </button>

        <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center text-[11px] font-bold">CC</div>
      </header>

      {/* Grid 2x2 */}
      <div className="flex-1 min-h-0 grid grid-cols-12 grid-rows-2 gap-3 p-3">
        {/* P1: Map (large) */}
        <Panel
          className="col-span-8 row-span-1"
          title="Site Map — Live"
          subtitle="Bukit Sangatta · 3 pit · 12 unit aktif · 47 worker on-pit"
          icon="map"
          right={<MapFilters />}
        >
          <MapView onPinClick={onSOSClick} focusedSosId={focusedSosId} />
        </Panel>

        {/* P2: SOS Active */}
        <Panel
          className="col-span-4 row-span-1"
          title="SOS Aktif"
          subtitle={`${SOS_LIST.length} incident open · MTTR 4m 28s`}
          icon="alert-octagon"
          tone="danger"
          right={<button className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white">↻ Refresh</button>}
        >
          <SOSPanel onItemClick={onSOSClick} focusedSosId={focusedSosId} />
        </Panel>

        {/* P3: Live activity */}
        <Panel
          className="col-span-7 row-span-1"
          title="Live Activity Feed"
          subtitle="Auto-update · all event types"
          icon="activity"
          right={<FeedFilters />}
        >
          <ActivityFeed />
        </Panel>

        {/* P4: KPI live */}
        <Panel
          className="col-span-5 row-span-1"
          title="Live KPI"
          subtitle="Tap untuk drill-down"
          icon="bar-chart-3"
        >
          <KPIWidgets />
        </Panel>
      </div>

      {/* W7 — SOS Detail Drawer */}
      {focusedSosId && <SOSDetailDrawer id={focusedSosId} onClose={onCloseDrawer} />}
    </div>
  );
}

function CCChip({ icon, label, value, tone }) {
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

function Panel({ title, subtitle, icon, tone, right, children, className='' }) {
  const toneBar = tone === 'danger' ? 'bg-danger-500' : 'bg-brand-500';
  return (
    <div className={`rounded-xl border flex flex-col min-h-0 overflow-hidden ${className}`} style={{ background: '#0F1623', borderColor: '#1a2333' }}>
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

function MapFilters() {
  const [active, setActive] = React.useState(new Set(['sos','ptw','shuttle','worker']));
  const toggle = (k) => setActive(p => { const n = new Set(p); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  const items = [
    { k:'sos',     l:'SOS',     c:'#E24B4A' },
    { k:'ptw',     l:'PTW',     c:'#378ADD' },
    { k:'shuttle', l:'Shuttle', c:'#1D9E75' },
    { k:'worker',  l:'Worker',  c:'#F39800' },
  ];
  return (
    <div className="flex items-center gap-1">
      {items.map(i => {
        const on = active.has(i.k);
        return (
          <button key={i.k} onClick={() => toggle(i.k)}
            className={`flex items-center gap-1.5 px-2 h-7 rounded text-[10px] font-bold transition-opacity ${on ? '' : 'opacity-40'}`}
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: i.c }} />
            {i.l}
          </button>
        );
      })}
      <div className="w-px h-5 mx-1 bg-white/10" />
      <button className="w-7 h-7 rounded hover:bg-white/5 flex items-center justify-center"><Icon name="layers" size={13} /></button>
      <button className="w-7 h-7 rounded hover:bg-white/5 flex items-center justify-center"><Icon name="navigation" size={13} /></button>
    </div>
  );
}

function MapView({ onPinClick, focusedSosId }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0a121e' }}>
      {/* Topographic map */}
      <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid3" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1a2333" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="pit2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0C3C6E" />
            <stop offset="1" stopColor="#0A2E54" />
          </linearGradient>
        </defs>
        <rect width="1000" height="600" fill="url(#grid3)" />

        {/* Topographic contours */}
        {[120,180,240,300,360,420].map((r,i) => (
          <ellipse key={'a'+i} cx="320" cy="280" rx={r} ry={r * 0.6} fill="none" stroke="#1670C4" strokeWidth={i===3 ? 1.2 : 0.5} opacity={0.4} />
        ))}
        {[80,140,200,260].map((r,i) => (
          <ellipse key={'b'+i} cx="730" cy="180" rx={r} ry={r * 0.55} fill="none" stroke="#1670C4" strokeWidth={i===1 ? 1.2 : 0.5} opacity={0.4} />
        ))}
        {[60,100,140,180].map((r,i) => (
          <ellipse key={'c'+i} cx="580" cy="460" rx={r} ry={r * 0.55} fill="none" stroke="#1670C4" strokeWidth={i===1 ? 1.2 : 0.5} opacity={0.4} />
        ))}

        {/* Pit areas */}
        <ellipse cx="320" cy="280" rx="80" ry="50" fill="url(#pit2)" />
        <ellipse cx="730" cy="180" rx="60" ry="38" fill="url(#pit2)" />
        <ellipse cx="580" cy="460" rx="68" ry="42" fill="url(#pit2)" />

        {/* Roads */}
        <path d="M 50 540 Q 200 460 320 280 Q 450 130 580 180 Q 660 200 730 180" stroke="#3D85E0" strokeWidth="3" fill="none" strokeDasharray="8 5" opacity="0.6" />
        <path d="M 320 280 Q 450 380 580 460 Q 720 540 950 560" stroke="#3D85E0" strokeWidth="3" fill="none" strokeDasharray="8 5" opacity="0.6" />
        <path d="M 730 180 Q 700 320 580 460" stroke="#3D85E0" strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.45" />

        {/* Labels */}
        <text x="320" y="285" textAnchor="middle" fill="#A6C6F5" fontSize="14" fontWeight="800" fontFamily="Inter">PIT A</text>
        <text x="730" y="185" textAnchor="middle" fill="#A6C6F5" fontSize="14" fontWeight="800" fontFamily="Inter">PIT B</text>
        <text x="580" y="465" textAnchor="middle" fill="#A6C6F5" fontSize="14" fontWeight="800" fontFamily="Inter">PIT C</text>

        {/* Camp + Workshop labels */}
        <text x="100" y="450" fill="#6FA3EC" fontSize="10" fontWeight="600" opacity="0.7" fontFamily="Inter">CAMP A</text>
        <circle cx="90" cy="460" r="4" fill="#6FA3EC" opacity="0.7" />
        <text x="880" y="320" fill="#6FA3EC" fontSize="10" fontWeight="600" opacity="0.7" fontFamily="Inter">WORKSHOP</text>
        <circle cx="900" cy="332" r="4" fill="#6FA3EC" opacity="0.7" />
      </svg>

      {/* Pins */}
      <CCPin x="73%" y="30%" tone="danger" pulse label="SOS · Hartono" sub="00:47" onClick={() => onPinClick('SOS-04219')} focused={focusedSosId==='SOS-04219'} />
      <CCPin x="58%" y="77%" tone="danger" pulse label="SOS · Yanto" sub="04:12" onClick={() => onPinClick('SOS-04218')} focused={focusedSosId==='SOS-04218'} />
      <CCPin x="32%" y="45%" tone="warning" label="Alert · LV blind-spot" />
      <CCPin x="48%" y="38%" tone="info" label="PTW · Cold work" />
      <CCPin x="65%" y="22%" tone="info" label="PTW · Confined" />
      <CCPin x="80%" y="48%" tone="info" label="PTW · Excavation" />
      <CCPin x="45%" y="62%" tone="success" label="SHT-04 · 18/22" sub="32 km/h" />
      <CCPin x="72%" y="62%" tone="success" label="SHT-07 · arriving" sub="ETA 2m" />
      <CCPin x="22%" y="70%" tone="success" label="SHT-02 · 21/22" sub="38 km/h" />
      <CCPin x="35%" y="32%" tone="safety" small />
      <CCPin x="42%" y="28%" tone="safety" small />
      <CCPin x="38%" y="26%" tone="safety" small />
      <CCPin x="62%" y="42%" tone="safety" small />
      <CCPin x="76%" y="18%" tone="safety" small />
      <CCPin x="84%" y="22%" tone="safety" small />

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur rounded-md px-3 py-2 border border-white/10 text-[10px] flex flex-col gap-1">
        {[
          { c:'#E24B4A', l:'SOS Aktif' },
          { c:'#EF9F27', l:'Alert / Near-miss' },
          { c:'#378ADD', l:'PTW Aktif' },
          { c:'#1D9E75', l:'Shuttle' },
          { c:'#F39800', l:'Worker · Equipment' },
        ].map(l => (
          <div key={l.l} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: l.c }} /> {l.l}</div>
        ))}
      </div>

      {/* Mini map (overview) */}
      <div className="absolute top-3 right-3 w-32 h-20 bg-black/60 backdrop-blur rounded-md border border-white/15 overflow-hidden">
        <svg viewBox="0 0 128 80" className="w-full h-full">
          <rect width="128" height="80" fill="#0a121e" />
          <ellipse cx="40" cy="38" rx="14" ry="9" fill="#1670C4" opacity="0.7" />
          <ellipse cx="92" cy="22" rx="10" ry="6" fill="#1670C4" opacity="0.7" />
          <ellipse cx="72" cy="60" rx="12" ry="7" fill="#1670C4" opacity="0.7" />
          <rect x="32" y="30" width="36" height="20" fill="#fff" fillOpacity="0.04" stroke="#F39800" strokeWidth="1" />
          <text x="64" y="14" textAnchor="middle" fill="#A6C6F5" fontSize="7" fontWeight="700" fontFamily="Inter">OVERVIEW</text>
        </svg>
      </div>

      {/* Coords */}
      <div className="absolute top-3 left-3 bg-black/55 backdrop-blur rounded-md px-2.5 py-1.5 border border-white/10 mono text-[10px] text-white/80">
        -0.5124°, 117.5942° · zoom 13
      </div>
    </div>
  );
}

function CCPin({ x, y, tone='info', pulse, label, sub, small, onClick, focused }) {
  const colors = { danger:'#E24B4A', warning:'#EF9F27', info:'#378ADD', success:'#1D9E75', safety:'#F39800' };
  const size = small ? 10 : 18;
  return (
    <div className="absolute" style={{ left: x, top: y, transform: 'translate(-50%, -100%)', zIndex: pulse ? 30 : 20 }}>
      <button onClick={onClick} className="relative flex flex-col items-center group">
        {pulse && (<span className="absolute top-2 w-3 h-3 rounded-full pulse-dot" style={{ color: colors[tone] }} />)}
        {small ? (
          <span className="block w-2.5 h-2.5 rounded-full" style={{ background: colors[tone], boxShadow: '0 0 0 2px #0a121e' }} />
        ) : (
          <svg width={size+4} height={size+10} viewBox="0 0 22 28">
            <path d="M11 0 C 4 0 0 5 0 11 C 0 19 11 28 11 28 C 11 28 22 19 22 11 C 22 5 18 0 11 0 Z"
                  fill={colors[tone]} stroke={focused ? '#fff' : '#0a121e'} strokeWidth={focused ? 2.5 : 1.5} />
            <circle cx="11" cy="11" r="4" fill="#fff" />
          </svg>
        )}
        {label && (
          <div className={`absolute top-7 whitespace-nowrap bg-black/80 backdrop-blur text-[9px] px-1.5 py-0.5 rounded font-bold mt-0.5 ${focused ? 'ring-1 ring-white/40' : ''}`}
               style={{ color: colors[tone] }}>
            {label}
            {sub && <span className="ml-1 mono opacity-70">· {sub}</span>}
          </div>
        )}
      </button>
    </div>
  );
}

function SOSPanel({ onItemClick, focusedSosId }) {
  return (
    <div className="divide-y" style={{ borderColor: '#1a2333' }}>
      {SOS_LIST.map(s => (
        <button key={s.id} onClick={() => onItemClick(s.id)}
          className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${focusedSosId === s.id ? 'bg-white/8' : ''}`}
          style={{ borderColor: '#1a2333' }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-danger-500/20 text-danger-500 flex items-center justify-center shrink-0">
              <Icon name="alert-octagon" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-[13px] font-bold leading-tight">{s.name}</div>
                <span className={`inline-flex items-center px-1.5 h-5 rounded text-[9px] font-extrabold uppercase tracking-wider
                  ${s.sev === 'CRITICAL' ? 'bg-danger-500 text-white' : 'bg-warning-500 text-white'}`}>
                  {s.sev}
                </span>
              </div>
              <div className="mt-0.5 text-[11px] text-white/65">{s.desc}</div>
              <div className="mt-1 text-[10px] text-white/55 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1"><Icon name="map-pin" size={10} /> {s.loc}</span>
                <span>·</span>
                <span className="mono">{s.nik}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <Stage done label="Sent" />
                <ConnLine done />
                <Stage done label="ACK" />
                <ConnLine done={s.state==='in-progress'} active={s.state==='acknowledged'} />
                <Stage active={s.state==='in-progress'} dim={s.state==='acknowledged'} label="En-route" />
                <ConnLine />
                <Stage label="Done" />
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end shrink-0">
              <div className="mono text-[14px] font-extrabold tabular-nums">
                {s.id === 'SOS-04219' ? <CountUp from={47} /> : `4m ${(s.age - 240)}s`}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-white/55">elapsed</div>
            </div>
          </div>
        </button>
      ))}
      <div className="px-4 py-3 text-[10px] text-white/45 flex items-center gap-2" style={{ borderColor: '#1a2333' }}>
        <Icon name="history" size={12} />
        2 incident resolved hari ini · MTTR rata-rata <span className="mono font-bold text-white/70">4m 28s</span>
      </div>
    </div>
  );
}

function CountUp({ from }) {
  const [n, setN] = React.useState(from);
  React.useEffect(() => { const t = setInterval(() => setN(x => x + 1), 1000); return () => clearInterval(t); }, []);
  const mm = String(Math.floor(n/60)).padStart(2,'0');
  const ss = String(n%60).padStart(2,'0');
  return <span>{mm}:{ss}</span>;
}

function Stage({ done, active, dim, label }) {
  return (
    <div className="flex items-center">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px]
        ${done ? 'bg-success-500' : active ? 'bg-warning-500' : dim ? 'bg-white/10 text-white/50' : 'bg-white/10 text-white/40'}`}>
        {done ? <Icon name="check" size={9} /> : ''}
      </div>
    </div>
  );
}
function ConnLine({ done, active }) {
  return <div className={`w-3 h-0.5 ${done ? 'bg-success-500' : active ? 'bg-warning-500' : 'bg-white/10'}`} />;
}

function FeedFilters() {
  return (
    <div className="flex items-center gap-1">
      {['All','SOS','PTW','Shuttle','HR'].map((f,i) => (
        <button key={f} className={`h-7 px-2 rounded text-[10px] font-bold ${i===0 ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/5'}`}>{f}</button>
      ))}
    </div>
  );
}

const FEED = [
  { t:'19:34:48', ic:'alert-octagon',  tone:'danger',  text:'SOS triggered by Hartono S. di PIT B · Bench 4', meta:'NSR-004812 · ID SOS-04219' },
  { t:'19:34:14', ic:'send',            tone:'info',    text:'Notifikasi push terkirim ke Safety Officer Hadi',  meta:'~340m dari lokasi · 18 detik' },
  { t:'19:32:02', ic:'file-check-2',    tone:'info',    text:'PTW-2026-00123 activated at Coal Pad Agra',         meta:'Cold work · Surya P. · 5j' },
  { t:'19:30:48', ic:'bus',             tone:'success', text:'Shuttle SHT-04 berangkat Mess → PIT Bahana',        meta:'18/22 pax · Adi P. · ETA 14m' },
  { t:'19:28:12', ic:'edit-3',          tone:'warning', text:'Observasi BBS · genangan oli di jalan tambang',      meta:'Eko S. · severity medium · open' },
  { t:'19:25:00', ic:'check-circle-2',  tone:'success', text:'PTW-2026-00109 closed · Working at Height',          meta:'Bagas R. · durasi 3j 12m' },
  { t:'19:22:30', ic:'user-x',          tone:'warning', text:'Alert · LV blind-spot near miss di PIT A',            meta:'Joko T. · investigated' },
  { t:'19:20:14', ic:'log-in',          tone:'info',    text:'Shift Malam check-in 96% · 5 belum hadir',            meta:'Auto-report 22:00' },
  { t:'19:18:50', ic:'shield-check',    tone:'info',    text:'Pre-shift briefing PIT C selesai · 14 hadir',         meta:'Henny S. · OK' },
];

function ActivityFeed() {
  const map = {
    danger:  'bg-danger-500/20 text-danger-500',
    warning: 'bg-warning-500/20 text-warning-500',
    info:    'bg-info-500/20 text-info-500',
    success: 'bg-success-500/20 text-success-500',
  };
  return (
    <div className="overflow-y-auto h-full">
      <div className="divide-y" style={{ borderColor: '#1a2333' }}>
        {FEED.map((f, i) => (
          <div key={i} className="px-4 py-2.5 flex items-start gap-3" style={{ borderColor: '#1a2333' }}>
            <div className="mono text-[10px] text-white/45 mt-0.5 shrink-0 w-14">{f.t}</div>
            <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${map[f.tone]}`}>
              <Icon name={f.ic} size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold leading-tight">{f.text}</div>
              <div className="text-[10px] text-white/55 mt-0.5">{f.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KPIWidgets() {
  const items = [
    { ic:'users',          l:'Worker active',   v:'2,381', delta:'+1.4%', tone:'info',    spark:[60,65,62,70,68,72,75,80,82,78,82,85,90,88] },
    { ic:'file-check-2',   l:'PTW active',      v:'12',    delta:'+2',    tone:'success', spark:[8,9,10,11,10,11,12,12,11,12,12,13,12,12] },
    { ic:'bus',            l:'Shuttle on-route',v:'8/9',   delta:'1 mtc', tone:'warning', spark:[7,8,9,8,9,9,8,9,9,8,9,8,8,8] },
    { ic:'alert-octagon',  l:'Incident today',  v:'0',     delta:'OK',    tone:'success', spark:[0,1,0,0,1,0,0,0,1,0,0,0,0,0] },
  ];
  const tones = {
    info:    { bg:'bg-info-500/15',    text:'text-info-500',    sparkColor:'#378ADD' },
    success: { bg:'bg-success-500/15', text:'text-success-500', sparkColor:'#1D9E75' },
    warning: { bg:'bg-warning-500/15', text:'text-warning-500', sparkColor:'#EF9F27' },
    danger:  { bg:'bg-danger-500/15',  text:'text-danger-500',  sparkColor:'#E24B4A' },
  };
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 p-2 h-full">
      {items.map(it => {
        const t = tones[it.tone];
        return (
          <button key={it.l} className="text-left p-3 rounded-lg hover:bg-white/5 transition-colors" style={{ background: '#11192680' }}>
            <div className="flex items-center justify-between">
              <div className={`w-8 h-8 rounded-md ${t.bg} ${t.text} flex items-center justify-center`}>
                <Icon name={it.ic} size={15} />
              </div>
              <div className={`text-[10px] font-bold ${t.text}`}>{it.delta}</div>
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-wider text-white/55 font-bold">{it.l}</div>
            <div className="text-[24px] font-extrabold tracking-tight mono mt-0.5">{it.v}</div>
            <Sparkline data={it.spark} color={t.sparkColor} />
          </button>
        );
      })}
    </div>
  );
}

function Sparkline({ data, color }) {
  const max = Math.max(...data, 1);
  const w = 100, h = 24;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 2) - 1}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-6 mt-1.5">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      <polyline points={`${pts} ${w},${h} 0,${h}`} fill={color} opacity="0.18" />
    </svg>
  );
}

// ============================================================
// W7 — SOS Detail Drawer
// ============================================================
function SOSDetailDrawer({ id, onClose }) {
  const sos = SOS_LIST.find(s => s.id === id) || SOS_LIST[0];
  return (
    <div className="absolute inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[540px] max-w-[92%] shadow-2xl flex flex-col text-white" style={{ background: '#0F1623', borderLeft: '1px solid #1a2333' }}>
        {/* Banner */}
        <div className="bg-danger-500 px-5 py-3 flex items-center gap-3">
          <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-white pulse-dot text-white" />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-85">SOS Active · Critical</div>
            <div className="text-[18px] font-extrabold tracking-tight">{sos.name} <span className="opacity-85 font-bold">— {sos.desc}</span></div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-md bg-white/15 hover:bg-white/25 flex items-center justify-center"><Icon name="x" size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Worker info */}
          <div className="p-5 border-b" style={{ borderColor: '#1a2333' }}>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-brand-500 text-white text-[16px] font-bold flex items-center justify-center">{sos.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[16px] font-extrabold tracking-tight">{sos.name}</div>
                <div className="text-[11px] text-white/65 mono">{sos.nik}</div>
                <div className="text-[11px] text-white/65 mt-0.5">Operator Excavator · Mining Ops · PT KNC</div>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button className="h-9 px-3 rounded-md bg-success-500 text-white text-[11px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5"><Icon name="phone" size={12} /> Call worker</button>
                <button className="h-9 px-3 rounded-md bg-white/10 hover:bg-white/15 text-white text-[11px] font-bold inline-flex items-center gap-1.5"><Icon name="message-circle" size={12} /> Message</button>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="px-5 py-4 border-b" style={{ borderColor: '#1a2333' }}>
            <div className="text-[10px] uppercase tracking-wider font-bold text-white/55">Lokasi GPS</div>
            <div className="mt-1 mono text-[13px] font-bold">-1.234567, 116.789012</div>
            <div className="text-[11px] text-white/65">PIT B · Bench 4 · 480m dari Camp B · akurasi ±4m</div>
            <div className="mt-3 rounded-lg overflow-hidden border" style={{ borderColor: '#1a2333' }}>
              <MiniMap />
            </div>
          </div>

          {/* Timeline */}
          <div className="px-5 py-4 border-b" style={{ borderColor: '#1a2333' }}>
            <div className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-3">Timeline event</div>
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
              {[
                { t:'19:34:12', ic:'alert-octagon', tone:'danger',  title:'SOS triggered', meta:'Hartono S. · device iOS 17.2' },
                { t:'19:34:14', ic:'bell',          tone:'info',    title:'Push notif terkirim',  meta:'Safety Officer Hadi' },
                { t:'19:34:18', ic:'message-square',tone:'info',    title:'SMS backup terkirim',  meta:'+62 800-NUS-SOS' },
                { t:'19:35:01', ic:'check',         tone:'success', title:'Acknowledged by Hadi', meta:'47 detik · target SLA <60s ✓' },
                { t:'19:35:45', ic:'navigation',    tone:'warning', title:'En route to location', meta:'ETA ~3m · jarak 340m' },
              ].map((e,i) => {
                const c = { danger:'bg-danger-500', info:'bg-info-500', success:'bg-success-500', warning:'bg-warning-500' };
                return (
                  <div key={i} className="relative pl-1 pb-3 last:pb-0">
                    <div className={`absolute -left-[22px] top-0 w-4 h-4 rounded-full ${c[e.tone]} flex items-center justify-center text-white`}>
                      <Icon name={e.ic} size={9} />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <div className="text-[13px] font-bold">{e.title}</div>
                      <div className="text-[10px] mono text-white/55">{e.t}</div>
                    </div>
                    <div className="text-[11px] text-white/55">{e.meta}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Worker context */}
          <div className="px-5 py-4 border-b" style={{ borderColor: '#1a2333' }}>
            <div className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-2">Konteks medis & kontak</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg p-3" style={{ background: '#11192680' }}>
                <div className="text-[10px] uppercase tracking-wider font-bold text-white/55">MCU terakhir</div>
                <div className="text-[13px] font-bold mt-0.5">2 bulan lalu</div>
                <div className="text-[11px] text-success-500 font-semibold">Status: OK</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: '#11192680' }}>
                <div className="text-[10px] uppercase tracking-wider font-bold text-white/55">Alergi</div>
                <div className="text-[13px] font-bold mt-0.5">Tidak ada</div>
                <div className="text-[11px] text-white/55">Catatan kosong</div>
              </div>
              <div className="rounded-lg p-3 col-span-2" style={{ background: '#11192680' }}>
                <div className="text-[10px] uppercase tracking-wider font-bold text-white/55">Kontak darurat</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">SA</div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold">Siti A. (Istri)</div>
                    <div className="text-[11px] mono text-white/65">+62 812-3456-7891</div>
                  </div>
                  <button className="h-8 px-2.5 rounded-md bg-white/10 hover:bg-white/15 text-[11px] font-bold inline-flex items-center gap-1"><Icon name="phone" size={11} /> Hubungi</button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="px-5 py-4">
            <div className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-2">Chat dengan worker</div>
            <div className="rounded-lg p-3 space-y-2" style={{ background: '#11192680' }}>
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">HS</div>
                <div className="rounded-2xl bg-white/8 px-3 py-2 max-w-[300px]">
                  <div className="text-[12px]">Saya OK, cuma kaki kanan terkilir. Bisa jalan pelan.</div>
                  <div className="text-[10px] text-white/45 mt-0.5">19:35</div>
                </div>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <div className="rounded-2xl bg-brand-500 text-white px-3 py-2 max-w-[300px]">
                  <div className="text-[12px]">Stay put. Tim medis menuju ke arah Anda. Jangan banyak gerak.</div>
                  <div className="text-[10px] opacity-75 mt-0.5">19:36 · Hadi W.</div>
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 rounded-full px-3 h-9 flex items-center text-[12px] text-white/55" style={{ background: '#11192680' }}>Ketik pesan…</div>
              <button className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center"><Icon name="send" size={15} /></button>
            </div>
          </div>
        </div>

        {/* Sticky actions */}
        <div className="border-t p-3 grid grid-cols-4 gap-2" style={{ borderColor: '#1a2333', background: '#0a121e' }}>
          <button className="h-12 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-1.5"><Icon name="users" size={14} /> Send team</button>
          <button className="h-12 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-1.5"><Icon name="trending-up" size={14} /> Escalate</button>
          <button className="h-12 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-1.5"><Icon name="navigation" size={14} /> Navigate</button>
          <button className="h-12 rounded-lg bg-success-500 hover:bg-success-600 text-[11px] font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-1.5"><Icon name="check-circle-2" size={14} /> Mark resolved</button>
        </div>
      </div>
    </div>
  );
}

window.CommandCenter = CommandCenter;
window.SOSDetailDrawer = SOSDetailDrawer;
