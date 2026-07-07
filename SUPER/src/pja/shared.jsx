// Shared — PJA module.

// =============== Status & Priority ===============
const PJA_STATUS = {
  assigned:  { label:'Assigned',   tone:'info',    icon:'inbox' },
  in_progress:{ label:'In Progress',tone:'warning',icon:'play-circle' },
  paused:    { label:'Paused',     tone:'gray',    icon:'pause-circle' },
  blocked:   { label:'Blocked',    tone:'danger',  icon:'alert-octagon' },
  review:    { label:'Review',     tone:'info',    icon:'eye' },
  done:      { label:'Done',       tone:'success', icon:'check-circle-2' },
};
window.PJA_STATUS = PJA_STATUS;

const PRIORITY = {
  high:   { label:'High',   tone:'danger',  icon:'alert-triangle' },
  medium: { label:'Medium', tone:'warning', icon:'circle-dot' },
  low:    { label:'Low',    tone:'gray',    icon:'circle' },
};
window.PRIORITY = PRIORITY;

const CATEGORY = {
  maintenance:  { label:'Maintenance',  icon:'wrench',         tone:'info' },
  cleaning:     { label:'Cleaning',      icon:'brush',          tone:'success' },
  inspection:   { label:'Inspection',    icon:'search',         tone:'warning' },
  installation: { label:'Installation',  icon:'hammer',         tone:'safety' },
  other:        { label:'Other',         icon:'package',        tone:'gray' },
};
window.CATEGORY = CATEGORY;

// Sample assignments
const SAMPLE_PJA = [
  { id:'PJA-2026-08412', t:'Inspeksi rutin conveyor C-04',     loc:'Workshop Bahana · Sec B', dist:'120m',  due:'Hari ini · 16:00', prio:'high',   stat:'in_progress',cat:'inspection', ptw:'PTW-2026-00125' },
  { id:'PJA-2026-08418', t:'Housekeeping ruang kontrol PIT',    loc:'PIT Bahana · Control Room', dist:'200m', due:'Hari ini · 12:00', prio:'medium', stat:'done',       cat:'cleaning' },
  { id:'PJA-2026-08421', t:'Cek kebocoran pipa hydrant H-04',  loc:'Coal Pad Agra',           dist:'450m', due:'Hari ini · 17:00', prio:'high',   stat:'assigned',   cat:'inspection' },
  { id:'PJA-2026-08405', t:'Install rambu safety Workshop A',  loc:'Workshop · Pintu 1',      dist:'80m',  due:'Hari ini · 14:00', prio:'low',    stat:'blocked',    cat:'installation', block:'Equipment belum siap (ladder)' },
];
window.SAMPLE_PJA = SAMPLE_PJA;

// =============== Status bar (phone) ===============
function StatusBar({ dark=false }) {
  return (
    <div className="iphone-statusbar" style={{ color: dark?'#fff':'#0f1115' }}>
      <div className="mono">09:42</div>
      <div className="flex items-center gap-1.5">
        <Icon name="signal" size={15} />
        <Icon name="wifi" size={15} />
        <div className="flex items-center gap-0.5">
          <div className="mono text-[11px] font-bold">68</div>
          <div className="relative w-[24px] h-[12px] rounded-[3px]"
               style={{ border: `1.5px solid ${dark?'#fff':'#0f1115'}` }}>
            <div className="absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px]"
                 style={{ width:'68%', background: dark?'#fff':'#0f1115' }} />
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
        {anno && (
          <div className="anno">
            <span className="lab">{anno.lab}</span>
            <div>{anno.text}</div>
          </div>
        )}
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
          <span className="w-3 h-3 rounded-full bg-[#ED6A5E]" />
          <span className="w-3 h-3 rounded-full bg-[#F5BF4F]" />
          <span className="w-3 h-3 rounded-full bg-[#62C455]" />
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
    gray:   'bg-elev text-muted border-token',
    dark:   'bg-brand-700 text-white border-brand-800',
  };
  const sizes = { sm:'px-1.5 h-5 text-[10px] gap-1', md:'px-2 h-6 text-[11px] gap-1.5', lg:'px-2.5 h-7 text-[12px] gap-1.5' };
  return (
    <span className={`inline-flex items-center font-bold border rounded-md ${map[tone]} ${sizes[size]}`}>
      {icon && <Icon name={icon} size={size==='lg'?13:size==='sm'?10:12} />}
      {children}
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
      {icon && <Icon name={icon} size={size==='lg'?20:16} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={size==='lg'?20:16} />}
    </button>
  );
}

function StatusBadge({ status, size='md' }) {
  const s = PJA_STATUS[status];
  if (!s) return null;
  return <StatusPill tone={s.tone} icon={s.icon} size={size}>{s.label}</StatusPill>;
}

function PriorityBadge({ priority, size='md' }) {
  const p = PRIORITY[priority];
  if (!p) return null;
  return <StatusPill tone={p.tone} icon={p.icon} size={size}>{p.label}</StatusPill>;
}

// Avatar
function Avatar({ name, size=32, tone='brand' }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = { brand:'bg-brand-500', safety:'bg-safety-500', danger:'bg-danger-500', info:'bg-info-500', success:'bg-success-500', warning:'bg-warning-500', gray:'bg-[#5b6472]' };
  return (
    <div className={`rounded-full text-white flex items-center justify-center font-bold shrink-0 ${tones[tone]}`}
         style={{ width: size, height: size, fontSize: size*0.36 }}>
      {initials}
    </div>
  );
}

// QR Code mock
function QRCode({ size=180, accent='#0f1115' }) {
  const rng = (i) => ((i*9301+49297)%233280)/233280;
  const cells = 25;
  const skip = (r,c) => (r<8&&c<8)||(r<8&&c>cells-9)||(r>cells-9&&c<8);
  return (
    <svg viewBox={`0 0 ${cells} ${cells}`} width={size} height={size} style={{ display:'block' }}>
      <rect x="0" y="0" width={cells} height={cells} fill="#fff" />
      {Array.from({length:cells*cells}).map((_,i) => {
        const r=Math.floor(i/cells), c=i%cells;
        if (skip(r,c)) return null;
        const v = rng(i*13 + r*7 + c*3);
        if (v < 0.46) return <rect key={i} x={c} y={r} width="1" height="1" fill={accent} />;
        return null;
      })}
      {[[0,0],[0,cells-7],[cells-7,0]].map(([r,c],i) => (
        <g key={i}>
          <rect x={c} y={r} width="7" height="7" fill={accent} />
          <rect x={c+1} y={r+1} width="5" height="5" fill="#fff" />
          <rect x={c+2} y={r+2} width="3" height="3" fill={accent} />
        </g>
      ))}
    </svg>
  );
}

// Cross-module callout
function XModule({ icon, label, children }) {
  return (
    <div className="xmodule rounded-xl p-3 flex items-start gap-2.5">
      <div className="w-8 h-8 rounded-md bg-white text-brand-700 flex items-center justify-center shrink-0 border border-brand-200"><Icon name={icon} size={15} /></div>
      <div className="flex-1 text-[11px]">
        <div className="font-extrabold text-brand-700 uppercase tracking-wider text-[9.5px]">{label}</div>
        <div className="text-brand-700/85 mt-0.5">{children}</div>
      </div>
    </div>
  );
}

// Mobile top bar
function MobileTopBar({ title, sub, back=true, right, dark=false }) {
  return (
    <div className={`${dark?'bg-brand-700 text-white':'bg-white border-b border-token'} px-5 pt-1 pb-3 flex items-center gap-3 shrink-0`}>
      {back && (
        <button className={`-ml-2 w-10 h-10 rounded-full flex items-center justify-center ${dark?'hover:bg-white/10':'hover:bg-elev'}`}>
          <Icon name="arrow-left" size={22} />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-bold tracking-tight truncate">{title}</div>
        {sub && <div className={`text-[11px] truncate ${dark?'text-white/70':'text-subtle'}`}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// Web sidebar
function WebSidebar({ current='pja' }) {
  const items = [
    { id:'dashboard', name:'Dashboard',        icon:'layout-dashboard' },
    { id:'pja',        name:'PJA Management',    icon:'clipboard-check', active:true },
    { id:'ptw',        name:'PTW',                icon:'clipboard-list' },
    { id:'timesheet',  name:'Timesheet',          icon:'clock' },
    { id:'fuel',       name:'Fuel Management',    icon:'fuel' },
    { id:'maintenance',name:'Maintenance · SAP',  icon:'wrench' },
    { id:'reports',    name:'Reports',             icon:'bar-chart-3' },
  ];
  return (
    <aside className="w-60 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 px-4 border-b border-token flex items-center gap-2.5">
        <BrandMark size={30} />
        <div className="leading-tight">
          <div className="text-[12px] font-bold tracking-tight">Nusaraya</div>
          <div className="text-[9px] uppercase tracking-wider text-brand-700 font-bold">Ops · SPV portal</div>
        </div>
      </div>
      <div className="px-3 py-4 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Modules</div>
        <nav className="space-y-0.5">
          {items.map(i => {
            const active = i.id === current;
            return (
              <a key={i.id} className={`flex items-center gap-2.5 px-3 h-9 rounded-md text-[12.5px] font-medium transition-colors
                  ${active?'bg-brand-50 text-brand-700':'text-muted hover:bg-elev'}`}>
                <Icon name={i.icon} size={15} />
                <span>{i.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
      <div className="p-3 border-t border-token">
        <div className="rounded-lg bg-elev p-3">
          <div className="text-[10px] uppercase tracking-wider text-brand-700 font-bold">Operator</div>
          <div className="text-[12px] font-bold mt-0.5">Pak Hadi Wijaya</div>
          <div className="text-[10px] text-muted">SPV Shift Pagi · PIT Bahana</div>
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
        <span>Cari PJA, worker, lokasi…</span>
        <span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span>
      </div>
      <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative">
        <Icon name="bell" size={17} />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" />
      </button>
      <div className="h-6 w-px bg-[color:var(--border)]" />
      <div className="flex items-center gap-2">
        <Avatar name="Hadi Wijaya" size={32} tone="safety" />
        <div className="hidden lg:block leading-tight">
          <div className="text-[12px] font-bold">Hadi Wijaya</div>
          <div className="text-[10px] text-subtle">SPV Shift Pagi</div>
        </div>
        <Icon name="chevron-down" size={14} className="text-subtle" />
      </div>
    </header>
  );
}

function KPICard({ icon, label, value, sub, tone='brand', delta }) {
  const tones = { brand:'bg-brand-50 text-brand-600', success:'bg-success-50 text-success-600', warning:'bg-warning-50 text-warning-600', danger:'bg-danger-50 text-danger-500', safety:'bg-safety-50 text-safety-600', info:'bg-info-50 text-info-600' };
  return (
    <div className="surface rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tones[tone]}`}><Icon name={icon} size={17} /></div>
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

function FilterChip({ icon, children, dot, active }) {
  return (
    <button className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-[12px] font-semibold hover:border-brand-300 hover:bg-brand-50/40
      ${active?'bg-brand-50 border border-brand-300 text-brand-700':'border border-token bg-white'}`}>
      {icon && <Icon name={icon} size={13} className="text-subtle" />}
      <span>{children}</span>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 -ml-0.5" />}
      <Icon name="chevron-down" size={13} className="text-subtle" />
    </button>
  );
}

window.PhoneFrame = PhoneFrame;
window.BrowserChrome = BrowserChrome;
window.BrandMark = BrandMark;
window.StatusPill = StatusPill;
window.StatusBadge = StatusBadge;
window.PriorityBadge = PriorityBadge;
window.Btn = Btn;
window.Avatar = Avatar;
window.QRCode = QRCode;
window.XModule = XModule;
window.MobileTopBar = MobileTopBar;
window.WebSidebar = WebSidebar;
window.WebTopBar = WebTopBar;
window.KPICard = KPICard;
window.FilterChip = FilterChip;
