// Command Center — dark shared library (live data, map, widgets, charts).

// =============== Live data hook (mock WebSocket via setInterval) ===============
function useClock() {
  const [t, setT] = React.useState(new Date(2026,4,29,14,32,8));
  React.useEffect(() => { const id = setInterval(() => setT(p => new Date(p.getTime()+1000)), 1000); return () => clearInterval(id); }, []);
  return t;
}
function fmtClock(d) { const p=n=>String(n).padStart(2,'0'); return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; }
function useTicker(start, fn, ms=3000) {
  const [v, setV] = React.useState(start);
  React.useEffect(() => { const id = setInterval(() => setV(fn), ms); return () => clearInterval(id); }, []);
  return v;
}
window.useClock = useClock; window.fmtClock = fmtClock; window.useTicker = useTicker;

// Live "since" counter
function SinceTimer({ from=92, className='', big=false }) {
  const [s, setS] = React.useState(from);
  React.useEffect(() => { const id = setInterval(() => setS(p=>p+1), 1000); return () => clearInterval(id); }, []);
  const mm = String(Math.floor(s/60)).padStart(2,'0'), ss = String(s%60).padStart(2,'0');
  return <span className={`mono tabular-nums ${className}`}>{mm}:{ss}</span>;
}
window.SinceTimer = SinceTimer;

// =============== Brand ===============
function BrandMark({ size=40 }) {
  return <div className="rounded-[28%] flex items-center justify-center font-extrabold text-white" style={{ width:size, height:size, background:'linear-gradient(135deg, #4179AE 0%, #1F4E79 60%, #F39800 140%)', boxShadow:'0 6px 16px -8px rgba(31,78,121,0.6)', fontSize:size*0.55, letterSpacing:'-0.05em' }}>N</div>;
}

// Dark pill
function Pill({ tone='gray', icon, children, size='md', flash }) {
  const map = {
    success:'bg-success-500/15 text-success-400 border-success-500/30',
    warning:'bg-warning-500/15 text-warning-400 border-warning-500/30',
    danger: 'bg-danger-500/18 text-danger-400 border-danger-500/40',
    info:   'bg-info-500/15 text-info-400 border-info-500/30',
    safety: 'bg-safety-500/15 text-safety-400 border-safety-500/30',
    brand:  'bg-brand-400/15 text-brand-200 border-brand-400/30',
    gray:   'bg-white/[0.06] text-[color:var(--cc-muted)] border-white/10',
  };
  const sizes = { sm:'px-1.5 h-5 text-[10px] gap-1', md:'px-2 h-6 text-[11px] gap-1.5', lg:'px-2.5 h-7 text-[12px] gap-1.5' };
  return <span className={`inline-flex items-center font-bold border rounded-md ${map[tone]} ${sizes[size]} ${flash?'sos-flash':''}`}>{icon && <Icon name={icon} size={size==='lg'?13:size==='sm'?10:12} />}{children}</span>;
}

function Btn({ variant='primary', size='md', icon, iconRight, children, full, disabled, onClick, className='' }) {
  const sizes = { sm:'h-8 px-3 text-[12px] gap-1.5', md:'h-10 px-4 text-[13px] gap-2', lg:'h-12 px-5 text-[14px] gap-2.5' };
  const variants = {
    primary:'bg-brand-500 text-white hover:bg-brand-400',
    danger:'bg-danger-500 text-white hover:bg-danger-400',
    success:'bg-success-500 text-white hover:bg-success-400',
    warning:'bg-warning-500 text-[#1a1300] hover:bg-warning-400',
    ghost:'text-[color:var(--cc-muted)] hover:bg-white/[0.06] hover:text-[color:var(--cc-text)]',
    outline:'border border-white/15 text-[color:var(--cc-text)] hover:bg-white/[0.06]',
    glass:'glass border border-white/10 text-[color:var(--cc-text)] hover:bg-white/[0.08]',
  };
  return <button onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center font-bold rounded-lg transition-all ${sizes[size]} ${variants[variant]} ${full?'w-full':''} ${disabled?'opacity-40 cursor-not-allowed':''} ${className}`}>{icon && <Icon name={icon} size={size==='lg'?19:16} />}<span>{children}</span>{iconRight && <Icon name={iconRight} size={size==='lg'?19:16} />}</button>;
}

function Avatar({ name, size=32, tone='brand', photo }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = { brand:'bg-brand-500', safety:'bg-safety-500', danger:'bg-danger-500', info:'bg-info-500', success:'bg-success-500', warning:'bg-warning-500', gray:'bg-[#3a4a66]' };
  if (photo) return <div className="rounded-lg overflow-hidden shrink-0 relative" style={{ width:size, height:size, background:'linear-gradient(160deg, #2a4a72, #0f2236)' }}><div className="absolute inset-0 flex items-center justify-center text-white/70"><Icon name="user" size={size*0.5} /></div></div>;
  return <div className={`rounded-lg text-white flex items-center justify-center font-bold shrink-0 ${tones[tone]}`} style={{ width:size, height:size, fontSize:size*0.36 }}>{initials}</div>;
}

// Widget panel shell
function Widget({ title, icon, right, children, className='', accent, live, pad=true }) {
  return (
    <div className={`cc-panel rounded-xl overflow-hidden flex flex-col ${className}`}>
      {title && (
        <div className="h-10 px-3.5 flex items-center gap-2 border-b cc-line shrink-0">
          {accent && <span className="w-1 h-4 rounded-full" style={{ background:accent }} />}
          {icon && <Icon name={icon} size={14} className="cc-muted" />}
          <div className="text-[11.5px] font-bold uppercase tracking-wider">{title}</div>
          <div className="flex-1" />
          {live && <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-success-400"><span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-400 pulse-dot text-success-400" /> Live</span>}
          {right}
        </div>
      )}
      <div className={`flex-1 min-h-0 ${pad?'p-3.5':''}`}>{children}</div>
    </div>
  );
}

// =============== SITE MAP (dark, full Nusaraya area) ===============
const SITES = [
  { id:'mess',   name:'Mess Griya',   x:10, y:82, tone:'success', icon:'home' },
  { id:'askara', name:'Askara',        x:24, y:54, tone:'info',    icon:'building' },
  { id:'pit',    name:'PIT Bahana',   x:52, y:30, tone:'danger',  icon:'mountain' },
  { id:'nagari', name:'PIT Nagari',   x:70, y:54, tone:'warning', icon:'mountain' },
  { id:'coal',   name:'Coal Pad Agra',x:84, y:34, tone:'safety',  icon:'warehouse' },
  { id:'olc',    name:'OLC',           x:88, y:64, tone:'info',    icon:'conveyor-belt' },
  { id:'port',   name:'Port',          x:92, y:84, tone:'brand',   icon:'anchor' },
];
window.SITES = SITES;

function SiteMap({ height='100%', layers={}, pins=[], routes=true, onPin, className='' }) {
  const toneHex = { success:'#1D9E75', info:'#378ADD', danger:'#E24B4A', warning:'#EF9F27', safety:'#F39800', brand:'#4179AE' };
  return (
    <div className={`relative w-full map-grid overflow-hidden ${className}`} style={{ height }}>
      <svg viewBox="0 0 1000 560" className="absolute inset-0 w-full h-full">
        {/* hauling road 126 KM main artery */}
        <path d="M100,460 Q240,400 340,360 T560,250 Q650,200 740,210 T900,300 L920,470" fill="none" stroke="#16243c" strokeWidth="16" strokeLinecap="round" />
        <path d="M100,460 Q240,400 340,360 T560,250 Q650,200 740,210 T900,300 L920,470" fill="none" stroke="#1f3458" strokeWidth="9" strokeLinecap="round" />
        {routes && <path d="M100,460 Q240,400 340,360 T560,250 Q650,200 740,210 T900,300 L920,470" fill="none" stroke="#F39800" strokeWidth="2.5" opacity="0.55" className="route-flow" />}
        {/* branch roads */}
        <path d="M240,300 Q300,360 340,360" fill="none" stroke="#1f3458" strokeWidth="7" strokeLinecap="round" />
        <path d="M840,360 L880,460" fill="none" stroke="#1f3458" strokeWidth="7" strokeLinecap="round" />
        {/* zone circles */}
        {SITES.map(s => <circle key={s.id} cx={s.x*10} cy={s.y*5.6} r="34" fill={toneHex[s.tone]} opacity="0.06" stroke={toneHex[s.tone]} strokeWidth="1" strokeDasharray="3 4" />)}
        {/* weather overlay */}
        {layers.weather && <g opacity="0.5"><rect x="560" y="40" width="380" height="220" rx="20" fill="#378ADD" opacity="0.08" /><text x="750" y="60" fontSize="11" fill="#5BA3E8" textAnchor="middle" fontFamily="JetBrains Mono">RAIN CELL · moving E</text></g>}
      </svg>

      {/* site labels */}
      {SITES.map(s => (
        <div key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ left:`${s.x}%`, top:`${s.y}%` }}>
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-lg glass border border-white/10 flex items-center justify-center" style={{ color: toneHex[s.tone] }}><Icon name={s.icon} size={14} /></div>
            <div className="px-1.5 py-0.5 rounded glass text-[8.5px] font-bold mono whitespace-nowrap border border-white/5">{s.name}</div>
          </div>
        </div>
      ))}

      {/* dynamic pins */}
      {pins.map((p,i) => {
        const hex = toneHex[p.tone] || '#378ADD';
        return (
          <button key={i} onClick={() => onPin && onPin(p)} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left:`${p.x}%`, top:`${p.y}%`, zIndex: p.sos?20:10 }}>
            <div className="relative" style={{ color:hex }}>
              {p.sos && <span className="absolute inset-[-6px] rounded-full ping-ring" />}
              <div className={`rounded-lg flex items-center justify-center text-white shadow-lg ${p.sos?'sos-flash':''}`} style={{ width:p.sos?32:26, height:p.sos?32:26, background:hex, transform:p.heading?`rotate(${p.heading}deg)`:'' }}>
                <Icon name={p.icon||'circle'} size={p.sos?16:13} style={p.heading?{ transform:`rotate(${-p.heading}deg)` }:{}} />
              </div>
              {p.label && <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded glass text-[8.5px] font-bold mono whitespace-nowrap border border-white/5">{p.label}</div>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
window.SiteMap = SiteMap;

// =============== Charts (dark) ===============
function Spark({ data, color='#34C088', w=88, h=26, fill=true }) {
  const max=Math.max(...data), min=Math.min(...data), rng=(max-min)||1;
  const xs=i=>(i/(data.length-1))*w, ys=v=>h-((v-min)/rng)*(h-4)-2;
  const path=data.map((v,i)=>`${i?'L':'M'}${xs(i).toFixed(1)} ${ys(v).toFixed(1)}`).join(' ');
  return <svg width={w} height={h} className="overflow-visible">{fill&&<path d={`${path} L${w} ${h} L0 ${h} Z`} fill={color} opacity="0.12" />}<path d={path} stroke={color} strokeWidth="1.6" fill="none" /><circle cx={xs(data.length-1)} cy={ys(data[data.length-1])} r="2" fill={color} /></svg>;
}
window.Spark = Spark;

function LineChartD({ data, labels, color='#378ADD', target, max, height=160 }) {
  const w=520, h=height, pad={l:36,r:12,t:14,b:22};
  const mx=max||Math.max(...data,target||0)*1.15;
  const xs=i=>pad.l+(i/(data.length-1))*(w-pad.l-pad.r), ys=v=>h-pad.b-(v/mx)*(h-pad.t-pad.b);
  const path=data.map((v,i)=>`${i?'L':'M'}${xs(i)} ${ys(v)}`).join(' ');
  const gid='ccg'+color.replace('#','');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight:height+8 }}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.28" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      {[0,0.5,1].map((p,i)=><g key={i}><line x1={pad.l} x2={w-pad.r} y1={ys(p*mx)} y2={ys(p*mx)} stroke="#1d2a42" /><text x="2" y={ys(p*mx)+3} fontSize="9" fill="#5a6b87" fontFamily="JetBrains Mono">{Math.round(p*mx)}</text></g>)}
      {target&&<line x1={pad.l} x2={w-pad.r} y1={ys(target)} y2={ys(target)} stroke="#EF9F27" strokeWidth="1.5" strokeDasharray="5 3" />}
      <path d={`${path} L${xs(data.length-1)} ${h-pad.b} L${xs(0)} ${h-pad.b} Z`} fill={`url(#${gid})`} />
      <path d={path} stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx={xs(data.length-1)} cy={ys(data[data.length-1])} r="3.5" fill={color} />
      {labels&&labels.map((l,i)=>(i%Math.ceil(labels.length/10)===0)&&<text key={i} x={xs(i)} y={h-6} fontSize="8.5" fill="#5a6b87" textAnchor="middle">{l}</text>)}
    </svg>
  );
}
window.LineChartD = LineChartD;

function ColumnD({ data, labels, color='#378ADD', target, max, height=160 }) {
  const w=520,h=height,pad={l:30,r:12,t:14,b:22};
  const mx=max||Math.max(...data,target||0)*1.2;
  const gap=(w-pad.l-pad.r)/data.length, bw=gap*0.6;
  const ys=v=>h-pad.b-(v/mx)*(h-pad.t-pad.b);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight:height+8 }}>
      {[0,0.5,1].map((p,i)=><line key={i} x1={pad.l} x2={w-pad.r} y1={ys(p*mx)} y2={ys(p*mx)} stroke="#1d2a42" />)}
      {target&&<line x1={pad.l} x2={w-pad.r} y1={ys(target)} y2={ys(target)} stroke="#EF9F27" strokeWidth="1.5" strokeDasharray="5 3" />}
      {data.map((v,i)=>{const x=pad.l+i*gap+(gap-bw)/2;return <g key={i}><rect x={x} y={ys(v)} width={bw} height={h-pad.b-ys(v)} rx="2.5" fill={color} opacity={i===data.length-1?1:0.65} />{labels&&<text x={x+bw/2} y={h-6} fontSize="8.5" fill="#5a6b87" textAnchor="middle">{labels[i]}</text>}</g>;})}
    </svg>
  );
}
window.ColumnD = ColumnD;

// Radial gauge dark
function GaugeD({ value, max=100, label, unit='%', size=150, tone }) {
  const pct=Math.min(1,value/max);
  const t=tone||(pct>=0.85?'success':pct>=0.6?'warning':'danger');
  const color={success:'#34C088',warning:'#F5B73D',danger:'#EC6463'}[t];
  const r=44,circ=2*Math.PI*r,arc=0.75,off=circ*(1-pct*arc);
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="#16243c" strokeWidth="11" strokeDasharray={`${circ*arc} ${circ}`} transform="rotate(135 60 60)" strokeLinecap="round" />
      <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="11" strokeDasharray={`${circ*arc} ${circ}`} strokeDashoffset={off} transform="rotate(135 60 60)" strokeLinecap="round" />
      <text x="60" y="56" textAnchor="middle" fontSize="25" fontWeight="800" fontFamily="JetBrains Mono" fill={color}>{value}<tspan fontSize="12">{unit}</tspan></text>
      {label&&<text x="60" y="74" textAnchor="middle" fontSize="8.5" fill="#5a6b87" fontWeight="700">{label}</text>}
    </svg>
  );
}
window.GaugeD = GaugeD;

// Severity color util
const SEV = { critical:{c:'danger',l:'Critical'}, warning:{c:'warning',l:'Warning'}, caution:{c:'safety',l:'Caution'}, normal:{c:'success',l:'Normal'}, info:{c:'info',l:'Info'} };
window.SEV = SEV;

// Comm log entry
function LogEntry({ time, sev='info', icon, children }) {
  const c = SEV[sev]?.c || 'info';
  const map = { danger:'text-danger-400', warning:'text-warning-400', safety:'text-safety-400', success:'text-success-400', info:'text-info-400' };
  return (
    <div className="flex items-start gap-2 py-1.5 border-b cc-line/50 last:border-0">
      <span className="text-[9.5px] mono cc-subtle pt-0.5 shrink-0 w-9">{time}</span>
      <Icon name={icon||'circle-dot'} size={12} className={`${map[c]} mt-0.5 shrink-0`} />
      <span className="text-[11px] leading-snug flex-1 cc-muted">{children}</span>
    </div>
  );
}
window.LogEntry = LogEntry;

// =============== Sidebar nav ===============
const NAV = [
  { id:'cc1', name:'Live Overview', icon:'layout-dashboard', short:'Overview' },
  { id:'cc2', name:'SOS Response',  icon:'siren', short:'SOS', alert:1 },
  { id:'cc3', name:'PTW Monitor',   icon:'clipboard-list', short:'PTW' },
  { id:'cc4', name:'Shuttle Ops',   icon:'bus', short:'Shuttle' },
  { id:'cc5', name:'Production',     icon:'mountain', short:'Production' },
  { id:'cc6', name:'Weather',        icon:'cloud-rain-wind', short:'Weather' },
  { id:'cc7', name:'Incident Resp.', icon:'shield-alert', short:'Incident' },
  { id:'cc8', name:'System Health',  icon:'server', short:'System' },
  { id:'cc9', name:'Handover',        icon:'arrow-left-right', short:'Handover' },
  { id:'cc10',name:'Reports',         icon:'bar-chart-3', short:'Reports' },
];
window.NAV = NAV;

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <aside className={`${collapsed?'w-14':'w-52'} shrink-0 border-r cc-line flex flex-col transition-all duration-200`} style={{ background:'var(--cc-panel)' }}>
      <div className="h-12 px-3 border-b cc-line flex items-center gap-2 shrink-0">
        <BrandMark size={26} />
        {!collapsed && <div className="leading-tight min-w-0"><div className="text-[11px] font-extrabold tracking-tight truncate">Command Center</div><div className="text-[8.5px] uppercase tracking-wider text-success-400 font-bold">24/7 Live</div></div>}
      </div>
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {NAV.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)}
            className={`w-full flex items-center gap-2.5 px-2.5 h-9 rounded-lg text-[12px] font-semibold transition-colors relative ${active===n.id?'bg-brand-500/20 text-white':'cc-muted hover:bg-white/[0.05]'}`}>
            <Icon name={n.icon} size={16} className={active===n.id?'text-brand-200':''} />
            {!collapsed && <span className="flex-1 text-left truncate">{n.name}</span>}
            {n.alert && <span className={`${collapsed?'absolute top-1 right-1':''} w-4 h-4 rounded-full bg-danger-500 text-white text-[9px] font-bold flex items-center justify-center sos-flash`}>{n.alert}</span>}
            {active===n.id && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-brand-300" />}
          </button>
        ))}
      </nav>
      <button onClick={() => setCollapsed(c=>!c)} className="h-10 border-t cc-line flex items-center justify-center cc-muted hover:bg-white/[0.05] shrink-0">
        <Icon name={collapsed?'chevron-right':'chevron-left'} size={16} />
      </button>
    </aside>
  );
}
window.Sidebar = Sidebar;

// Top bar
function CCTopBar({ alerts=1 }) {
  const t = useClock();
  return (
    <header className="h-12 border-b cc-line flex items-center px-4 gap-4 shrink-0" style={{ background:'var(--cc-panel)' }}>
      <div className="text-[12px] font-bold tracking-wide uppercase cc-muted hidden md:block">Nusaraya Mining · Site Bahana</div>
      <div className="h-5 w-px bg-[color:var(--cc-line)] hidden md:block" />
      {alerts>0 ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md bg-danger-500/18 text-danger-400 border border-danger-500/40 text-[11px] font-bold sos-flash"><Icon name="siren" size={13} /> {alerts} SOS ACTIVE</span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md bg-success-500/15 text-success-400 border border-success-500/30 text-[11px] font-bold"><Icon name="shield-check" size={13} /> All systems operational</span>
      )}
      <div className="flex-1" />
      <div className="text-center hidden lg:block">
        <div className="text-[20px] font-extrabold mono tabular-nums leading-none tracking-tight">{fmtClock(t)}</div>
        <div className="text-[9px] cc-subtle uppercase tracking-wider mono">Jum 29 Mei 2026 · WITA</div>
      </div>
      <div className="flex-1 hidden lg:block" />
      <button className="w-9 h-9 rounded-lg hover:bg-white/[0.06] flex items-center justify-center relative cc-muted"><Icon name="bell" size={17} /><span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-danger-500 text-white text-[9px] font-bold flex items-center justify-center">3</span></button>
      <button className="w-9 h-9 rounded-lg hover:bg-white/[0.06] flex items-center justify-center cc-muted"><Icon name="maximize" size={16} /></button>
      <div className="h-6 w-px bg-[color:var(--cc-line)]" />
      <div className="flex items-center gap-2">
        <Avatar name="Rizki Operator" size={30} tone="brand" />
        <div className="hidden xl:block leading-tight"><div className="text-[12px] font-bold">Rizki Pratama</div><div className="text-[9.5px] cc-subtle">Operator · Shift 2 (14–22)</div></div>
      </div>
    </header>
  );
}
window.CCTopBar = CCTopBar;

// Section header for drill-down screens
function ScreenHead({ icon, title, sub, right }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl cc-panel-2 border cc-line flex items-center justify-center text-brand-200"><Icon name={icon} size={20} /></div>
      <div className="flex-1"><div className="text-[18px] font-extrabold tracking-tight">{title}</div>{sub && <div className="text-[11px] cc-muted">{sub}</div>}</div>
      {right}
    </div>
  );
}
window.ScreenHead = ScreenHead;
