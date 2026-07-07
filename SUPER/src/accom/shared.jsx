// Shared — Accommodation module.

// =============== Room status & types ===============
const ROOM_STATUS = {
  dirty:     { label:'Dirty',     tone:'danger',  icon:'trash-2' },
  cleaning:  { label:'Cleaning',  tone:'warning', icon:'spray-can' },
  clean:     { label:'Clean',     tone:'info',    icon:'sparkles' },
  inspected: { label:'Inspected', tone:'success', icon:'badge-check' },
  occupied:  { label:'Occupied',  tone:'brand',   icon:'user' },
  oos:       { label:'Out of svc', tone:'gray',   icon:'wrench' },
  vacant:    { label:'Vacant',    tone:'gray',    icon:'door-open' },
};
window.ROOM_STATUS = ROOM_STATUS;

const ROOM_TYPE = {
  dormitory: { label:'Dormitory', icon:'bunk-bed', cap:'4-6 bed', tone:'info' },
  private:   { label:'Private',   icon:'bed-single', cap:'single', tone:'brand' },
  vip:       { label:'VIP',        icon:'bed-double', cap:'visitor', tone:'safety' },
};
window.ROOM_TYPE = ROOM_TYPE;

const CAMPS = ['Griya Praja','Simpang Perdau','Rest Area KM-78','Rest Area KM-126'];
window.CAMPS = CAMPS;

// =============== Status bar (phone) ===============
function StatusBar({ dark=false }) {
  return (
    <div className="iphone-statusbar" style={{ color: dark?'#fff':'#0f1115' }}>
      <div className="mono">20:14</div>
      <div className="flex items-center gap-1.5"><Icon name="signal" size={15} /><Icon name="wifi" size={15} />
        <div className="flex items-center gap-0.5"><div className="mono text-[11px] font-bold">76</div>
          <div className="relative w-[24px] h-[12px] rounded-[3px]" style={{ border:`1.5px solid ${dark?'#fff':'#0f1115'}` }}><div className="absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px]" style={{ width:'76%', background: dark?'#fff':'#0f1115' }} /></div>
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ label, sub, anno, children, dark=false }) {
  return (
    <div className="relative flex flex-col items-center gap-3 shrink-0">
      <div className="iphone-frame"><div className="iphone-notch" />
        <div className={`iphone-screen ${dark?'on-dark':''}`}><StatusBar dark={dark} /><div className="flex-1 flex flex-col min-h-0">{children}</div></div>
        <div className="iphone-home" style={{ background: dark?'rgba(255,255,255,0.7)':'rgba(0,0,0,0.35)' }} />
        {anno && (<div className="anno"><span className="lab">{anno.lab}</span><div>{anno.text}</div></div>)}
      </div>
      <div className="text-center"><div className="text-[12px] font-bold tracking-tight">{label}</div>{sub && <div className="text-[11px] text-subtle mt-0.5">{sub}</div>}</div>
    </div>
  );
}

function BrowserChrome({ url, children, height=720 }) {
  return (
    <div className="rounded-xl border border-token overflow-hidden shadow-xl bg-white" style={{ height }}>
      <div className="h-9 bg-elev border-b border-token flex items-center px-3 gap-2">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ED6A5E]" /><span className="w-3 h-3 rounded-full bg-[#F5BF4F]" /><span className="w-3 h-3 rounded-full bg-[#62C455]" /></div>
        <div className="flex-1 flex justify-center"><div className="bg-white border border-token rounded-md h-6 px-3 text-[11px] mono text-subtle inline-flex items-center gap-1.5 min-w-[320px] justify-center"><Icon name="lock" size={11} /> {url}</div></div>
        <div className="w-12" />
      </div>
      <div className="h-[calc(100%-36px)] overflow-hidden">{children}</div>
    </div>
  );
}

function BrandMark({ size=40 }) {
  return <div className="rounded-[28%] flex items-center justify-center font-extrabold text-white" style={{ width:size, height:size, background:'linear-gradient(135deg, #4179AE 0%, #1F4E79 60%, #F39800 140%)', boxShadow:'0 6px 16px -8px rgba(31,78,121,0.6)', fontSize:size*0.55, letterSpacing:'-0.05em' }}>N</div>;
}

function StatusPill({ tone='gray', icon, children, size='md' }) {
  const map = { success:'bg-success-50 text-success-700 border-success-500/25', warning:'bg-warning-50 text-warning-700 border-warning-500/25', danger:'bg-danger-50 text-danger-700 border-danger-500/25', info:'bg-info-50 text-info-700 border-info-500/25', safety:'bg-safety-50 text-safety-700 border-safety-500/25', brand:'bg-brand-50 text-brand-700 border-brand-500/25', gray:'bg-elev text-muted border-token', dark:'bg-brand-700 text-white border-brand-800' };
  const sizes = { sm:'px-1.5 h-5 text-[10px] gap-1', md:'px-2 h-6 text-[11px] gap-1.5', lg:'px-2.5 h-7 text-[12px] gap-1.5' };
  return <span className={`inline-flex items-center font-bold border rounded-md ${map[tone]} ${sizes[size]}`}>{icon && <Icon name={icon} size={size==='lg'?13:size==='sm'?10:12} />}{children}</span>;
}

function RoomStatusBadge({ status, size='md' }) { const s=ROOM_STATUS[status]; if(!s) return null; return <StatusPill tone={s.tone} icon={s.icon} size={size}>{s.label}</StatusPill>; }

function Btn({ variant='primary', size='md', icon, iconRight, children, full, disabled, onClick, className='' }) {
  const sizes = { sm:'h-9 px-3 text-[13px] gap-1.5', md:'h-11 px-4 text-[14px] gap-2', lg:'h-14 px-5 text-[15px] gap-2.5' };
  const variants = { primary:'bg-brand-500 text-white hover:bg-brand-600 shadow-sm', secondary:'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50', ghost:'text-brand-700 hover:bg-brand-50', success:'bg-success-500 text-white hover:bg-success-600', danger:'bg-danger-500 text-white hover:bg-danger-600', safety:'bg-safety-500 text-white hover:bg-safety-600', outlineDanger:'border border-danger-500/40 text-danger-700 bg-white hover:bg-danger-50', dark:'bg-brand-700 text-white hover:bg-brand-800' };
  return <button onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all focus-ring ${sizes[size]} ${variants[variant]} ${full?'w-full':''} ${disabled?'opacity-40 cursor-not-allowed':''} ${className}`}>{icon && <Icon name={icon} size={size==='lg'?20:16} />}<span>{children}</span>{iconRight && <Icon name={iconRight} size={size==='lg'?20:16} />}</button>;
}

function Avatar({ name, size=32, tone='brand', photo }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = { brand:'bg-brand-500', safety:'bg-safety-500', danger:'bg-danger-500', info:'bg-info-500', success:'bg-success-500', warning:'bg-warning-500', gray:'bg-[#5b6472]' };
  if (photo) return <div className="rounded-full overflow-hidden shrink-0 relative" style={{ width:size, height:size, background:'linear-gradient(160deg, #4179AE, #143452)' }}><div className="absolute inset-0 flex items-center justify-center text-white/85"><Icon name="user" size={size*0.5} /></div></div>;
  return <div className={`rounded-full text-white flex items-center justify-center font-bold shrink-0 ${tones[tone]}`} style={{ width:size, height:size, fontSize:size*0.36 }}>{initials}</div>;
}

function QRCode({ size=180, accent='#0f1115' }) {
  const rng = (i) => ((i*9301+49297)%233280)/233280; const cells = 25;
  const skip = (r,c) => (r<8&&c<8)||(r<8&&c>cells-9)||(r>cells-9&&c<8);
  return (
    <svg viewBox={`0 0 ${cells} ${cells}`} width={size} height={size} style={{ display:'block' }}>
      <rect x="0" y="0" width={cells} height={cells} fill="#fff" />
      {Array.from({length:cells*cells}).map((_,i) => { const r=Math.floor(i/cells), c=i%cells; if(skip(r,c))return null; const v=rng(i*13+r*7+c*3); if(v<0.46) return <rect key={i} x={c} y={r} width="1" height="1" fill={accent} />; return null; })}
      {[[0,0],[0,cells-7],[cells-7,0]].map(([r,c],i) => (<g key={i}><rect x={c} y={r} width="7" height="7" fill={accent} /><rect x={c+1} y={r+1} width="5" height="5" fill="#fff" /><rect x={c+2} y={r+2} width="3" height="3" fill={accent} /></g>))}
    </svg>
  );
}

function KPICard({ icon, label, value, sub, tone='brand', delta }) {
  const tones = { brand:'bg-brand-50 text-brand-600', success:'bg-success-50 text-success-600', warning:'bg-warning-50 text-warning-600', danger:'bg-danger-50 text-danger-500', safety:'bg-safety-50 text-safety-600', info:'bg-info-50 text-info-600' };
  return (
    <div className="surface rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tones[tone]}`}><Icon name={icon} size={17} /></div>
        {delta && <div className={`text-[11px] font-semibold ${delta.startsWith('+')?'text-success-600':'text-danger-600'} inline-flex items-center gap-1`}><Icon name={delta.startsWith('+')?'trending-up':'trending-down'} size={12} /> {delta}</div>}
      </div>
      <div className="mt-3 text-[10.5px] uppercase tracking-wider text-subtle font-semibold">{label}</div>
      <div className="mt-0.5 text-[22px] font-extrabold tracking-tight mono">{value}</div>
      {sub && <div className="text-[10.5px] text-subtle mt-0.5">{sub}</div>}
    </div>
  );
}

function FilterChip({ icon, children, dot, active }) {
  return <button className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-[12px] font-semibold hover:border-brand-300 hover:bg-brand-50/40 ${active?'bg-brand-50 border border-brand-300 text-brand-700':'border border-token bg-white'}`}>{icon && <Icon name={icon} size={13} className="text-subtle" />}<span>{children}</span>{dot && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 -ml-0.5" />}<Icon name="chevron-down" size={13} className="text-subtle" /></button>;
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

function MobileBottomNav({ active=2 }) {
  const tabs = [{ name:'Home', icon:'home' },{ name:'Attendance', icon:'clock' },{ name:'Accom', icon:'bed-double' },{ name:'Transport', icon:'bus' },{ name:'Profile', icon:'user' }];
  return (
    <div className="border-t border-token bg-white grid grid-cols-5 px-2 pt-1.5 pb-1.5">
      {tabs.map((t,i) => (
        <button key={t.name} className="flex flex-col items-center gap-0.5 py-1"><Icon name={t.icon} size={22} className={i===active?'text-brand-500':'text-subtle'} /><span className={`text-[10px] font-semibold ${i===active?'text-brand-500':'text-subtle'}`}>{t.name}</span></button>
      ))}
    </div>
  );
}

// =============== Room visual layout (top-down) ===============
// A room cell in the floor plan
function RoomCell({ no, status, type, selected, onClick, sm }) {
  const s = ROOM_STATUS[status] || ROOM_STATUS.vacant;
  const toneBg = {
    danger:'bg-danger-50 border-danger-500/40 text-danger-700',
    warning:'bg-warning-50 border-warning-500/40 text-warning-700',
    info:'bg-info-50 border-info-500/40 text-info-700',
    success:'bg-success-50 border-success-500/40 text-success-700',
    brand:'bg-brand-100 border-brand-400 text-brand-700',
    gray:'bg-elev border-token text-subtle',
  }[s.tone];
  const avail = status==='inspected'||status==='vacant'||status==='clean';
  return (
    <button onClick={onClick}
      className={`relative rounded-lg border-2 flex flex-col items-center justify-center transition-all ${sm?'h-12':'h-16'} ${selected?'bg-brand-500 border-brand-600 text-white ring-2 ring-brand-300':toneBg} ${avail?'hover:scale-105 cursor-pointer':'cursor-default'}`}>
      <span className={`font-extrabold mono ${sm?'text-[10px]':'text-[12px]'}`}>{no}</span>
      {!sm && type && <Icon name={ROOM_TYPE[type].icon} size={12} className="mt-0.5 opacity-70" />}
      {selected && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-brand-600 flex items-center justify-center"><Icon name="check" size={10} strokeWidth={3} /></span>}
    </button>
  );
}

// Floor plan generator
function FloorPlan({ rooms, selected, onSelect, sm, cols=6 }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns:`repeat(${cols}, 1fr)` }}>
      {rooms.map(r => <RoomCell key={r.no} no={r.no} status={r.status} type={r.type} sm={sm} selected={selected===r.no} onClick={() => { const avail=r.status==='inspected'||r.status==='vacant'||r.status==='clean'; if(avail&&onSelect) onSelect(r.no); }} />)}
    </div>
  );
}

function RoomLegend({ items }) {
  const def = items || [
    { tone:'success', l:'Available' },
    { tone:'brand',   l:'Occupied' },
    { tone:'warning', l:'Cleaning' },
    { tone:'danger',  l:'Dirty' },
    { tone:'gray',    l:'Out of svc' },
  ];
  const dot = { success:'bg-success-500', brand:'bg-brand-500', warning:'bg-warning-500', danger:'bg-danger-500', info:'bg-info-500', gray:'bg-[#9aa3b2]' };
  return (
    <div className="flex items-center gap-3 flex-wrap text-[10.5px]">
      {def.map(d => <span key={d.l} className="inline-flex items-center gap-1.5 font-semibold"><span className={`w-3 h-3 rounded ${dot[d.tone]}`} /> {d.l}</span>)}
    </div>
  );
}

// =============== Web sidebar ===============
function WebSidebar({ current='dashboard' }) {
  const items = [
    { id:'dashboard',    name:'Dashboard',         icon:'layout-dashboard' },
    { id:'allocation',   name:'Room Allocation',    icon:'bed-double' },
    { id:'housekeeping', name:'Housekeeping',       icon:'spray-can' },
    { id:'meeting',      name:'Meeting Rooms',      icon:'presentation' },
    { id:'vehicle',      name:'Vehicle Pool',       icon:'car' },
    { id:'maintenance',  name:'Maintenance',         icon:'wrench', badge:'7' },
    { id:'reports',      name:'Reports',             icon:'bar-chart-3' },
  ];
  return (
    <aside className="w-60 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 px-4 border-b border-token flex items-center gap-2.5">
        <BrandMark size={30} />
        <div className="leading-tight"><div className="text-[12px] font-bold tracking-tight">Nusaraya</div><div className="text-[9px] uppercase tracking-wider text-brand-700 font-bold">FAC · Accommodation</div></div>
      </div>
      <div className="px-3 py-4 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Modules</div>
        <nav className="space-y-0.5">
          {items.map(i => (
            <a key={i.id} className={`flex items-center gap-2.5 px-3 h-9 rounded-md text-[12.5px] font-medium transition-colors ${i.id===current?'bg-brand-50 text-brand-700':'text-muted hover:bg-elev'}`}>
              <Icon name={i.icon} size={15} /><span className="flex-1">{i.name}</span>{i.badge && <span className="text-[9px] font-bold px-1.5 rounded-full bg-danger-500 text-white">{i.badge}</span>}
            </a>
          ))}
        </nav>
      </div>
      <div className="p-3 border-t border-token">
        <div className="rounded-lg bg-elev p-3"><div className="text-[10px] uppercase tracking-wider text-brand-700 font-bold">FAC Admin</div><div className="text-[12px] font-bold mt-0.5">Dewi Lestari</div><div className="text-[10px] text-muted">Accommodation Lead</div></div>
      </div>
    </aside>
  );
}

function WebTopBar({ title, sub }) {
  return (
    <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
      <div><div className="text-[10px] text-subtle uppercase tracking-wider">{sub}</div><div className="text-[14px] font-bold tracking-tight">{title}</div></div>
      <div className="flex-1" />
      <div className="bg-elev rounded-md px-3 h-9 flex items-center gap-2 text-[12px] text-subtle min-w-[300px]"><Icon name="search" size={14} /><span>Cari kamar, occupant, booking…</span><span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span></div>
      <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative"><Icon name="bell" size={17} /><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" /></button>
      <div className="h-6 w-px bg-[color:var(--border)]" />
      <div className="flex items-center gap-2"><Avatar name="Dewi Lestari" size={32} tone="brand" /><div className="hidden lg:block leading-tight"><div className="text-[12px] font-bold">Dewi Lestari</div><div className="text-[10px] text-subtle">FAC Accommodation</div></div><Icon name="chevron-down" size={14} className="text-subtle" /></div>
    </header>
  );
}

// Occupancy heatmap (camp x day)
function OccHeatmap({ rows, days=30 }) {
  return (
    <div>
      <div className="grid gap-0.5" style={{ gridTemplateColumns:`110px repeat(${days}, 1fr)` }}>
        <div />
        {Array.from({length:days}).map((_,i) => <div key={i} className="text-center text-[7px] text-subtle font-bold">{(i%5===0)?i+1:''}</div>)}
        {rows.map((r,ri) => (
          <React.Fragment key={ri}>
            <div className="text-[10.5px] font-bold text-muted flex items-center pr-1 truncate">{r.name}</div>
            {Array.from({length:days}).map((_,ci) => { let v=r.base+((ri*3+ci*7)%10)/30; if(ci>=12&&ci<=16) v=Math.min(0.99,v+0.15); v=Math.min(0.99,v); return <div key={ci} className="aspect-square rounded-[2px]" style={{ background:`rgba(29,158,117,${v.toFixed(2)})` }} title={`${Math.round(v*100)}%`} />; })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

window.PhoneFrame = PhoneFrame;
window.BrowserChrome = BrowserChrome;
window.BrandMark = BrandMark;
window.StatusPill = StatusPill;
window.RoomStatusBadge = RoomStatusBadge;
window.Btn = Btn;
window.Avatar = Avatar;
window.QRCode = QRCode;
window.KPICard = KPICard;
window.FilterChip = FilterChip;
window.MobileTopBar = MobileTopBar;
window.MobileBottomNav = MobileBottomNav;
window.RoomCell = RoomCell;
window.FloorPlan = FloorPlan;
window.RoomLegend = RoomLegend;
window.WebSidebar = WebSidebar;
window.WebTopBar = WebTopBar;
window.OccHeatmap = OccHeatmap;

// Sample floor plans
window.SAMPLE_FLOOR = [
  { no:'201', status:'occupied', type:'private' },{ no:'202', status:'inspected', type:'private' },{ no:'203', status:'occupied', type:'private' },
  { no:'204', status:'inspected', type:'private' },{ no:'205', status:'cleaning', type:'private' },{ no:'206', status:'dirty', type:'private' },
  { no:'207', status:'occupied', type:'dormitory' },{ no:'208', status:'inspected', type:'dormitory' },{ no:'209', status:'occupied', type:'dormitory' },
  { no:'210', status:'oos', type:'dormitory' },{ no:'211', status:'clean', type:'dormitory' },{ no:'212', status:'inspected', type:'dormitory' },
];
