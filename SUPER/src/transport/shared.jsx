// Shared — Transportation module.

// =============== Vehicle types ===============
const VEHICLE = {
  bus:     { label:'Bus 30-seat', icon:'bus',       cap:30, tone:'brand' },
  minibus: { label:'Mini-bus 12', icon:'bus',       cap:12, tone:'info' },
  mpv:     { label:'MPV',          icon:'car',       cap:7,  tone:'success' },
  car:     { label:'Car',          icon:'car',       cap:4,  tone:'gray' },
};
window.VEHICLE = VEHICLE;

// =============== Routes ===============
const ROUTES = [
  { id:'R1', from:'Mess Griya Praja', to:'PIT Bahana',     km:12, mins:25 },
  { id:'R2', from:'Mess Griya Praja', to:'Coal Pad Agra',  km:18, mins:35 },
  { id:'R3', from:'Mess Griya Praja', to:'Askara',          km:8,  mins:15 },
  { id:'R4', from:'Airport BPN',       to:'Camp Bahana',     km:120, mins:150 },
];
window.ROUTES = ROUTES;

// Sample shuttles
const SHUTTLES = [
  { id:'SHT-04', type:'bus',     route:'Mess → PIT Bahana',     driver:'Sumarno',    plate:'KT 7821 AB', cap:30, onboard:22, status:'moving',  eta:'06:00', spd:42 },
  { id:'SHT-07', type:'minibus', route:'Mess → Askara',          driver:'Joko Tri',   plate:'KT 4410 CD', cap:12, onboard:8,  status:'moving',  eta:'06:10', spd:38 },
  { id:'SHT-02', type:'bus',     route:'Mess → Coal Pad Agra',   driver:'Hendra W.',  plate:'KT 9087 EF', cap:30, onboard:30, status:'boarding',eta:'06:30', spd:0 },
  { id:'SHT-11', type:'mpv',     route:'Airport pickup BPN',     driver:'Rudi S.',    plate:'KT 1234 GH', cap:7,  onboard:3,  status:'moving',  eta:'09:40', spd:78 },
  { id:'SHT-09', type:'bus',     route:'PIT Bahana → Mess',      driver:'Anto P.',    plate:'KT 5566 IJ', cap:30, onboard:18, status:'offroute',eta:'14:15', spd:34, alert:true },
];
window.SHUTTLES = SHUTTLES;

// =============== Status bar (phone) ===============
function StatusBar({ dark=false }) {
  return (
    <div className="iphone-statusbar" style={{ color: dark?'#fff':'#0f1115' }}>
      <div className="mono">04:42</div>
      <div className="flex items-center gap-1.5">
        <Icon name="signal" size={15} /><Icon name="wifi" size={15} />
        <div className="flex items-center gap-0.5">
          <div className="mono text-[11px] font-bold">72</div>
          <div className="relative w-[24px] h-[12px] rounded-[3px]" style={{ border:`1.5px solid ${dark?'#fff':'#0f1115'}` }}>
            <div className="absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px]" style={{ width:'72%', background: dark?'#fff':'#0f1115' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ label, sub, anno, children, dark=false }) {
  return (
    <div className="relative flex flex-col items-center gap-3 shrink-0">
      <div className="iphone-frame">
        <div className="iphone-notch" />
        <div className={`iphone-screen ${dark?'on-dark':''}`}>
          <StatusBar dark={dark} />
          <div className="flex-1 flex flex-col min-h-0">{children}</div>
        </div>
        <div className="iphone-home" style={{ background: dark?'rgba(255,255,255,0.7)':'rgba(0,0,0,0.35)' }} />
        {anno && (<div className="anno"><span className="lab">{anno.lab}</span><div>{anno.text}</div></div>)}
      </div>
      <div className="text-center">
        <div className="text-[12px] font-bold tracking-tight">{label}</div>
        {sub && <div className="text-[11px] text-subtle mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function BrowserChrome({ url, children, height=720 }) {
  return (
    <div className="rounded-xl border border-token overflow-hidden shadow-xl bg-white" style={{ height }}>
      <div className="h-9 bg-elev border-b border-token flex items-center px-3 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ED6A5E]" /><span className="w-3 h-3 rounded-full bg-[#F5BF4F]" /><span className="w-3 h-3 rounded-full bg-[#62C455]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-token rounded-md h-6 px-3 text-[11px] mono text-subtle inline-flex items-center gap-1.5 min-w-[320px] justify-center">
            <Icon name="lock" size={11} /> {url}
          </div>
        </div>
        <div className="w-12" />
      </div>
      <div className="h-[calc(100%-36px)] overflow-hidden">{children}</div>
    </div>
  );
}

function BrandMark({ size=40 }) {
  return (
    <div className="rounded-[28%] flex items-center justify-center font-extrabold text-white"
      style={{ width: size, height: size, background:'linear-gradient(135deg, #4179AE 0%, #1F4E79 60%, #F39800 140%)', boxShadow:'0 6px 16px -8px rgba(31,78,121,0.6)', fontSize: size*0.55, letterSpacing:'-0.05em' }}>N</div>
  );
}

function StatusPill({ tone='gray', icon, children, size='md' }) {
  const map = {
    success:'bg-success-50 text-success-700 border-success-500/25',
    warning:'bg-warning-50 text-warning-700 border-warning-500/25',
    danger: 'bg-danger-50 text-danger-700 border-danger-500/25',
    info:   'bg-info-50 text-info-700 border-info-500/25',
    safety: 'bg-safety-50 text-safety-700 border-safety-500/25',
    brand:  'bg-brand-50 text-brand-700 border-brand-500/25',
    gray:   'bg-elev text-muted border-token',
    dark:   'bg-brand-700 text-white border-brand-800',
  };
  const sizes = { sm:'px-1.5 h-5 text-[10px] gap-1', md:'px-2 h-6 text-[11px] gap-1.5', lg:'px-2.5 h-7 text-[12px] gap-1.5' };
  return (
    <span className={`inline-flex items-center font-bold border rounded-md ${map[tone]} ${sizes[size]}`}>
      {icon && <Icon name={icon} size={size==='lg'?13:size==='sm'?10:12} />}{children}
    </span>
  );
}

function Btn({ variant='primary', size='md', icon, iconRight, children, full, disabled, onClick, className='' }) {
  const sizes = { sm:'h-9 px-3 text-[13px] gap-1.5', md:'h-11 px-4 text-[14px] gap-2', lg:'h-14 px-5 text-[15px] gap-2.5' };
  const variants = {
    primary:'bg-brand-500 text-white hover:bg-brand-600 shadow-sm',
    secondary:'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50',
    ghost:'text-brand-700 hover:bg-brand-50',
    success:'bg-success-500 text-white hover:bg-success-600',
    danger:'bg-danger-500 text-white hover:bg-danger-600',
    safety:'bg-safety-500 text-white hover:bg-safety-600',
    outlineDanger:'border border-danger-500/40 text-danger-700 bg-white hover:bg-danger-50',
    dark:'bg-brand-700 text-white hover:bg-brand-800',
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all focus-ring ${sizes[size]} ${variants[variant]} ${full?'w-full':''} ${disabled?'opacity-40 cursor-not-allowed':''} ${className}`}>
      {icon && <Icon name={icon} size={size==='lg'?20:16} />}<span>{children}</span>{iconRight && <Icon name={iconRight} size={size==='lg'?20:16} />}
    </button>
  );
}

function Avatar({ name, size=32, tone='brand', photo }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = { brand:'bg-brand-500', safety:'bg-safety-500', danger:'bg-danger-500', info:'bg-info-500', success:'bg-success-500', warning:'bg-warning-500', gray:'bg-[#5b6472]' };
  if (photo) return <div className="rounded-full overflow-hidden shrink-0 relative" style={{ width:size, height:size, background:'linear-gradient(160deg, #4179AE, #143452)' }}><div className="absolute inset-0 flex items-center justify-center text-white/85"><Icon name="user" size={size*0.5} /></div></div>;
  return <div className={`rounded-full text-white flex items-center justify-center font-bold shrink-0 ${tones[tone]}`} style={{ width:size, height:size, fontSize:size*0.36 }}>{initials}</div>;
}

function QRCode({ size=180, accent='#0f1115' }) {
  const rng = (i) => ((i*9301+49297)%233280)/233280;
  const cells = 25;
  const skip = (r,c) => (r<8&&c<8)||(r<8&&c>cells-9)||(r>cells-9&&c<8);
  return (
    <svg viewBox={`0 0 ${cells} ${cells}`} width={size} height={size} style={{ display:'block' }}>
      <rect x="0" y="0" width={cells} height={cells} fill="#fff" />
      {Array.from({length:cells*cells}).map((_,i) => { const r=Math.floor(i/cells), c=i%cells; if(skip(r,c))return null; const v=rng(i*13+r*7+c*3); if(v<0.46) return <rect key={i} x={c} y={r} width="1" height="1" fill={accent} />; return null; })}
      {[[0,0],[0,cells-7],[cells-7,0]].map(([r,c],i) => (<g key={i}><rect x={c} y={r} width="7" height="7" fill={accent} /><rect x={c+1} y={r+1} width="5" height="5" fill="#fff" /><rect x={c+2} y={r+2} width="3" height="3" fill={accent} /></g>))}
    </svg>
  );
}

// KPI card
function KPICard({ icon, label, value, sub, tone='brand', delta }) {
  const tones = { brand:'bg-brand-50 text-brand-600', success:'bg-success-50 text-success-600', warning:'bg-warning-50 text-warning-600', danger:'bg-danger-50 text-danger-500', safety:'bg-safety-50 text-safety-600', info:'bg-info-50 text-info-600' };
  return (
    <div className="surface rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tones[tone]}`}><Icon name={icon} size={17} /></div>
        {delta && <div className={`text-[11px] font-semibold ${delta.startsWith('+')?'text-success-600':'text-danger-600'} inline-flex items-center gap-1`}><Icon name={delta.startsWith('+')?'trending-up':'trending-down'} size={12} /> {delta}</div>}
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-wider text-subtle font-semibold">{label}</div>
      <div className="mt-0.5 text-[24px] font-extrabold tracking-tight mono">{value}</div>
      {sub && <div className="text-[11px] text-subtle mt-0.5">{sub}</div>}
    </div>
  );
}

function FilterChip({ icon, children, dot, active }) {
  return (
    <button className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-[12px] font-semibold hover:border-brand-300 hover:bg-brand-50/40 ${active?'bg-brand-50 border border-brand-300 text-brand-700':'border border-token bg-white'}`}>
      {icon && <Icon name={icon} size={13} className="text-subtle" />}<span>{children}</span>{dot && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 -ml-0.5" />}<Icon name="chevron-down" size={13} className="text-subtle" />
    </button>
  );
}

function MobileTopBar({ title, sub, back=true, right, dark=false }) {
  return (
    <div className={`${dark?'bg-brand-700 text-white':'bg-white border-b border-token'} px-5 pt-1 pb-3 flex items-center gap-3 shrink-0`}>
      {back && <button className={`-ml-2 w-10 h-10 rounded-full flex items-center justify-center ${dark?'hover:bg-white/10':'hover:bg-elev'}`}><Icon name="arrow-left" size={22} /></button>}
      <div className="flex-1 min-w-0"><div className="text-[15px] font-bold tracking-tight truncate">{title}</div>{sub && <div className={`text-[11px] truncate ${dark?'text-white/70':'text-subtle'}`}>{sub}</div>}</div>
      {right}
    </div>
  );
}

function MobileBottomNav({ active=2, role='passenger' }) {
  const tabs = role==='driver'
    ? [{ name:'Home', icon:'home' },{ name:'Trips', icon:'route' },{ name:'Scan', icon:'qr-code' },{ name:'Fatigue', icon:'gauge' },{ name:'Profile', icon:'user' }]
    : [{ name:'Home', icon:'home' },{ name:'Attendance', icon:'clock' },{ name:'Transport', icon:'bus' },{ name:'Safety', icon:'shield' },{ name:'Profile', icon:'user' }];
  return (
    <div className="border-t border-token bg-white grid grid-cols-5 px-2 pt-1.5 pb-1.5">
      {tabs.map((t,i) => (
        <button key={t.name} className="flex flex-col items-center gap-0.5 py-1">
          <Icon name={t.icon} size={22} className={i===active?'text-brand-500':'text-subtle'} />
          <span className={`text-[10px] font-semibold ${i===active?'text-brand-500':'text-subtle'}`}>{t.name}</span>
        </button>
      ))}
    </div>
  );
}

// =============== Map building blocks ===============
// A reusable site map with roads, stops, and vehicle pins.
function SiteMap({ dark=false, height='100%', vehicles=[], stops=[], route, you, className='' }) {
  return (
    <div className={`relative w-full ${dark?'map-dark':'map-bg'} ${className}`} style={{ height }}>
      <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full">
        {/* roads */}
        <path d="M80,520 Q260,440 420,460 T720,360 T940,260" fill="none" stroke={dark?'#2a3a52':'#c3d3e6'} strokeWidth="14" strokeLinecap="round" />
        <path d="M80,520 Q260,440 420,460 T720,360 T940,260" fill="none" stroke={dark?'#1a2740':'#dde7f2'} strokeWidth="8" strokeLinecap="round" />
        <path d="M420,460 Q480,300 560,200 T640,80" fill="none" stroke={dark?'#2a3a52':'#c3d3e6'} strokeWidth="12" strokeLinecap="round" />
        <path d="M420,460 Q480,300 560,200 T640,80" fill="none" stroke={dark?'#1a2740':'#dde7f2'} strokeWidth="7" strokeLinecap="round" />
        {/* zones */}
        <circle cx="80" cy="520" r="44" fill={dark?'#1d9e7522':'#1d9e7518'} stroke="#1D9E75" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="940" cy="260" r="44" fill={dark?'#e24b4a22':'#e24b4a18'} stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="640" cy="80"  r="40" fill={dark?'#37 8add22':'#378add18'} stroke="#378ADD" strokeWidth="1.5" strokeDasharray="4 4" />
        {/* route highlight */}
        {route && <path d="M80,520 Q260,440 420,460 T720,360 T940,260" fill="none" stroke="#F39800" strokeWidth="3" className="route-flow" />}
      </svg>

      {/* labels */}
      <div className="absolute" style={{ left:'8%', top:'87%', transform:'translate(-50%,-50%)' }}>
        <div className="px-2 h-6 rounded bg-white/90 border border-success-500/30 text-[10px] font-bold inline-flex items-center gap-1 text-success-700 shadow-sm"><Icon name="home" size={11} /> Mess Griya</div>
      </div>
      <div className="absolute" style={{ left:'94%', top:'43%', transform:'translate(-50%,-50%)' }}>
        <div className="px-2 h-6 rounded bg-white/90 border border-danger-500/30 text-[10px] font-bold inline-flex items-center gap-1 text-danger-700 shadow-sm"><Icon name="mountain" size={11} /> PIT Bahana</div>
      </div>
      <div className="absolute" style={{ left:'64%', top:'13%', transform:'translate(-50%,-50%)' }}>
        <div className="px-2 h-6 rounded bg-white/90 border border-info-500/30 text-[10px] font-bold inline-flex items-center gap-1 text-info-700 shadow-sm"><Icon name="warehouse" size={11} /> Coal Pad</div>
      </div>

      {/* vehicle pins */}
      {vehicles.map((v,i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left:v.x, top:v.y }}>
          <div className={`relative w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg ${v.alert?'bg-danger-500':'bg-brand-500'}`} style={{ transform:`rotate(${v.heading||0}deg)` }}>
            <Icon name="bus" size={17} style={{ transform:`rotate(${-(v.heading||0)}deg)` }} />
          </div>
          {!v.alert && <span className="absolute inset-0 rounded-xl text-brand-500 ping-ring" />}
          {v.alert && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger-500 text-white flex items-center justify-center text-[8px] font-extrabold border-2 border-white alert-blink">!</span>}
          {v.label && <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded bg-white/95 text-[9px] font-bold mono whitespace-nowrap shadow-sm">{v.label}</div>}
        </div>
      ))}

      {/* you pin */}
      {you && (
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left:you.x, top:you.y }}>
          <div className="relative w-5 h-5 rounded-full bg-info-500 border-2 border-white shadow-lg"><span className="absolute inset-0 rounded-full text-info-500 ping-ring" /></div>
        </div>
      )}
    </div>
  );
}

// Bus seat layout (top-down, 2-2)
function SeatMap({ selected=12, taken=[3,4,7,15,16,21,22], reserved=[1,2,9,10] }) {
  const rows = 8;
  const seatState = (n) => n===selected?'sel' : taken.includes(n)?'taken' : reserved.includes(n)?'reserved' : 'free';
  const cls = { sel:'bg-brand-500 text-white ring-2 ring-brand-300', taken:'bg-danger-100 text-danger-400 border border-danger-200', reserved:'bg-elev text-subtle border border-token', free:'bg-success-50 text-success-700 border border-success-500/30' };
  let n = 0;
  return (
    <div className="rounded-2xl bg-white border border-token p-4">
      {/* driver area */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-dashed border-token">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-muted"><Icon name="steering-wheel" size={15} /> Driver</div>
        <div className="inline-flex items-center gap-1.5 text-[11px] text-subtle"><Icon name="door-open" size={14} /> Pintu</div>
      </div>
      <div className="space-y-2">
        {Array.from({length:rows}).map((_,r) => (
          <div key={r} className="flex items-center justify-center gap-2">
            {[0,1].map(c => { n++; const s=n; const st=seatState(s); return (
              <button key={c} className={`w-9 h-9 rounded-lg text-[11px] font-bold mono flex items-center justify-center ${cls[st]}`}>{s}</button>
            ); })}
            <div className="w-6" />
            {[0,1].map(c => { n++; const s=n; const st=seatState(s); return (
              <button key={c+2} className={`w-9 h-9 rounded-lg text-[11px] font-bold mono flex items-center justify-center ${cls[st]}`}>{s}</button>
            ); })}
          </div>
        ))}
      </div>
      {/* legend */}
      <div className="mt-4 pt-3 border-t border-token flex items-center gap-3 text-[10px] flex-wrap">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-success-50 border border-success-500/30" /> Available</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-elev border border-token" /> Reserved</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-danger-100 border border-danger-200" /> Taken</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-brand-500" /> Anda</span>
      </div>
    </div>
  );
}

// Fatigue gauge
function FatigueGauge({ hours, limit=10, size=120 }) {
  const pct = Math.min(1, hours/limit);
  const tone = pct >= 0.9 ? 'danger' : pct >= 0.7 ? 'warning' : 'success';
  const color = { success:'#1D9E75', warning:'#EF9F27', danger:'#E24B4A' }[tone];
  const r = 50, circ = 2*Math.PI*r, off = circ*(1-pct*0.75);
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="#E6E8EC" strokeWidth="10" strokeDasharray={`${circ*0.75} ${circ}`} strokeDashoffset="0" transform="rotate(135 60 60)" strokeLinecap="round" />
      <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10" strokeDasharray={`${circ*0.75} ${circ}`} strokeDashoffset={off} transform="rotate(135 60 60)" strokeLinecap="round" />
      <text x="60" y="56" textAnchor="middle" fontSize="24" fontWeight="800" fontFamily="JetBrains Mono" fill={color}>{hours}h</text>
      <text x="60" y="74" textAnchor="middle" fontSize="10" fill="#8b94a2" fontWeight="700">/ {limit}h limit</text>
    </svg>
  );
}

// Web sidebar (FAC)
function WebSidebar({ current='transport' }) {
  const items = [
    { id:'dashboard', name:'Dashboard',     icon:'layout-dashboard' },
    { id:'transport', name:'Transportation', icon:'bus', active:true },
    { id:'schedule',  name:'Schedule',        icon:'calendar-days' },
    { id:'vehicles',  name:'Vehicle master',  icon:'truck' },
    { id:'drivers',   name:'Driver master',   icon:'id-card' },
    { id:'requests',  name:'Trip requests',   icon:'inbox', badge:'6' },
    { id:'liveops',   name:'Live operations',  icon:'radar' },
    { id:'analytics', name:'Analytics',         icon:'bar-chart-3' },
  ];
  return (
    <aside className="w-60 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 px-4 border-b border-token flex items-center gap-2.5">
        <BrandMark size={30} />
        <div className="leading-tight"><div className="text-[12px] font-bold tracking-tight">Nusaraya</div><div className="text-[9px] uppercase tracking-wider text-brand-700 font-bold">FAC · Dispatch</div></div>
      </div>
      <div className="px-3 py-4 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Modules</div>
        <nav className="space-y-0.5">
          {items.map(i => (
            <a key={i.id} className={`flex items-center gap-2.5 px-3 h-9 rounded-md text-[12.5px] font-medium transition-colors ${i.active?'bg-brand-50 text-brand-700':'text-muted hover:bg-elev'}`}>
              <Icon name={i.icon} size={15} /><span className="flex-1">{i.name}</span>{i.badge && <span className="text-[9px] font-bold px-1.5 rounded-full bg-danger-500 text-white">{i.badge}</span>}
            </a>
          ))}
        </nav>
      </div>
      <div className="p-3 border-t border-token">
        <div className="rounded-lg bg-elev p-3"><div className="text-[10px] uppercase tracking-wider text-brand-700 font-bold">Dispatcher</div><div className="text-[12px] font-bold mt-0.5">Dewi Lestari</div><div className="text-[10px] text-muted">FAC Transport Lead</div></div>
      </div>
    </aside>
  );
}

function WebTopBar({ title, sub }) {
  return (
    <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
      <div><div className="text-[10px] text-subtle uppercase tracking-wider">{sub}</div><div className="text-[14px] font-bold tracking-tight">{title}</div></div>
      <div className="flex-1" />
      <div className="bg-elev rounded-md px-3 h-9 flex items-center gap-2 text-[12px] text-subtle min-w-[300px]"><Icon name="search" size={14} /><span>Cari vehicle, driver, trip…</span><span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span></div>
      <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative"><Icon name="bell" size={17} /><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" /></button>
      <div className="h-6 w-px bg-[color:var(--border)]" />
      <div className="flex items-center gap-2"><Avatar name="Dewi Lestari" size={32} tone="brand" /><div className="hidden lg:block leading-tight"><div className="text-[12px] font-bold">Dewi Lestari</div><div className="text-[10px] text-subtle">FAC Transport</div></div><Icon name="chevron-down" size={14} className="text-subtle" /></div>
    </header>
  );
}

window.PhoneFrame = PhoneFrame;
window.BrowserChrome = BrowserChrome;
window.BrandMark = BrandMark;
window.StatusPill = StatusPill;
window.Btn = Btn;
window.Avatar = Avatar;
window.QRCode = QRCode;
window.KPICard = KPICard;
window.FilterChip = FilterChip;
window.MobileTopBar = MobileTopBar;
window.MobileBottomNav = MobileBottomNav;
window.SiteMap = SiteMap;
window.SeatMap = SeatMap;
window.FatigueGauge = FatigueGauge;
window.WebSidebar = WebSidebar;
window.WebTopBar = WebTopBar;
