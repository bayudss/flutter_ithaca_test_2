// Shared — Visitor Management + Mine Permit module.

// =============== Visitor types ===============
const VISITOR_TYPE = {
  business:  { label:'Business vendor', icon:'briefcase',   tone:'info' },
  regulator: { label:'Regulator',        icon:'landmark',    tone:'danger', vip:true },
  auditor:   { label:'Auditor',           icon:'clipboard-check', tone:'safety' },
  family:    { label:'Family visit',      icon:'users',       tone:'success' },
  media:     { label:'Media',             icon:'camera',      tone:'warning' },
  internal:  { label:'Internal group',    icon:'building-2',  tone:'brand' },
};
window.VISITOR_TYPE = VISITOR_TYPE;

// =============== Visit status ===============
const VISIT_STATUS = {
  draft:     { label:'Draft',          tone:'gray',    icon:'edit-3' },
  pending_so:{ label:'Pending SO',     tone:'warning', icon:'clock' },
  approved:  { label:'Approved',       tone:'info',    icon:'check-circle-2' },
  prearrival:{ label:'Pre-arrival',    tone:'warning', icon:'hourglass' },
  active:    { label:'Active',         tone:'success', icon:'circle-play' },
  overstay:  { label:'Overstay',       tone:'danger',  icon:'alert-octagon' },
  closed:    { label:'Closed',         tone:'gray',    icon:'check' },
  rejected:  { label:'Rejected',       tone:'danger',  icon:'x-circle' },
};
window.VISIT_STATUS = VISIT_STATUS;

// Sample visits
const VISITS = [
  { id:'VIS-2026-0421', org:'PT Trakindo Utama',    type:'business',  visitors:2, host:'Budi Hartono', dept:'Operations', date:'29 Mei 2026', time:'09:00–17:00', status:'active',     prep:100, areas:['Office','Mess','PIT*'] },
  { id:'VIS-2026-0419', org:'Kementerian ESDM',      type:'regulator', visitors:4, host:'Maya Saputri',  dept:'HSE',        date:'29 Mei 2026', time:'08:00–16:00', status:'active',     prep:100, areas:['Office','PIT*','Coal Pad*'], vip:true },
  { id:'VIS-2026-0424', org:'PT SGS Indonesia (ISO)',type:'auditor',   visitors:3, host:'Sari Hartati',  dept:'HSE',        date:'30 Mei 2026', time:'09:00–15:00', status:'prearrival', prep:67,  areas:['Office','Workshop'] },
  { id:'VIS-2026-0426', org:'Universitas Mulawarman', type:'internal', visitors:40,host:'Andi Wijaya',   dept:'CSR',        date:'02 Jun 2026', time:'10:00–14:00', status:'pending_so', prep:20,  areas:['Office','Mess'], group:true },
  { id:'VIS-2026-0428', org:'PT Bukit Makmur',        type:'business',  visitors:1, host:'Budi Hartono', dept:'Procurement',date:'30 Mei 2026', time:'13:00–16:00', status:'approved',   prep:50,  areas:['Office'] },
  { id:'VIS-2026-0415', org:'Disnaker Kaltim',        type:'regulator', visitors:2, host:'Sari Hartati',  dept:'HR',         date:'28 Mei 2026', time:'09:00–12:00', status:'closed',     prep:100, areas:['Office','Mess'] },
];
window.VISITS = VISITS;

// =============== Status bar (phone) ===============
function StatusBar({ dark=false }) {
  return (
    <div className="iphone-statusbar" style={{ color: dark?'#fff':'#0f1115' }}>
      <div className="mono">09:15</div>
      <div className="flex items-center gap-1.5">
        <Icon name="signal" size={15} />
        <Icon name="wifi" size={15} />
        <div className="flex items-center gap-0.5">
          <div className="mono text-[11px] font-bold">84</div>
          <div className="relative w-[24px] h-[12px] rounded-[3px]" style={{ border:`1.5px solid ${dark?'#fff':'#0f1115'}` }}>
            <div className="absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px]" style={{ width:'84%', background: dark?'#fff':'#0f1115' }} />
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

function TabletFrame({ children }) {
  return (
    <div className="rounded-[22px] bg-[#0b0d12] p-3 shadow-2xl" style={{ width: 1180, height: 800 }}>
      <div className="w-full h-full rounded-[14px] overflow-hidden bg-white">{children}</div>
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

function VisitStatusBadge({ status, size='md' }) {
  const s = VISIT_STATUS[status]; if (!s) return null;
  return <StatusPill tone={s.tone} icon={s.icon} size={size}>{s.label}</StatusPill>;
}
function VisitorTypeBadge({ type, size='md' }) {
  const t = VISITOR_TYPE[type]; if (!t) return null;
  return <StatusPill tone={t.tone} icon={t.icon} size={size}>{t.label}</StatusPill>;
}

// Avatar (visitor photo placeholder)
function Avatar({ name, size=32, tone='brand', photo }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = { brand:'bg-brand-500', safety:'bg-safety-500', danger:'bg-danger-500', info:'bg-info-500', success:'bg-success-500', warning:'bg-warning-500', gray:'bg-[#5b6472]' };
  if (photo) {
    return (
      <div className="rounded-lg overflow-hidden shrink-0 relative" style={{ width: size, height: size, background:'linear-gradient(160deg, #4179AE, #143452)' }}>
        <div className="absolute inset-0 flex items-center justify-center text-white/85"><Icon name="user" size={size*0.5} /></div>
      </div>
    );
  }
  return (
    <div className={`rounded-full text-white flex items-center justify-center font-bold shrink-0 ${tones[tone]}`}
         style={{ width: size, height: size, fontSize: size*0.36 }}>{initials}</div>
  );
}

// QR code mock
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

// Prep step indicator (4 items: K3L, MCU, NDA, Photo)
function PrepSteps({ k3l, mcu, nda, photo, size='md' }) {
  const items = [
    { l:'K3L', ic:'shield-check', done:k3l },
    { l:'MCU', ic:'stethoscope',  done:mcu },
    { l:'NDA', ic:'file-signature', done:nda },
    { l:'Foto',ic:'image',         done:photo },
  ];
  return (
    <div className="flex items-center gap-1.5">
      {items.map(it => (
        <div key={it.l} className={`inline-flex items-center gap-1 px-1.5 rounded ${size==='sm'?'h-5 text-[9.5px]':'h-6 text-[10.5px]'} font-bold border ${it.done?'bg-success-50 text-success-700 border-success-500/25':'bg-elev text-subtle border-token'}`}>
          <Icon name={it.done?'check':it.ic} size={size==='sm'?9:10} strokeWidth={it.done?3:2} /> {it.l}
        </div>
      ))}
    </div>
  );
}

// Audit log entry callout
function AuditNote({ children, by, time }) {
  return (
    <div className="audit-note rounded-xl p-2.5 flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-md bg-white text-safety-700 flex items-center justify-center shrink-0 border border-safety-500/30"><Icon name="file-lock-2" size={14} /></div>
      <div className="flex-1 text-[11px]">
        <div className="font-extrabold text-safety-700 uppercase tracking-wider text-[9px]">Audit log · regulator trail</div>
        <div className="text-safety-700/90 mt-0.5">{children}</div>
        {(by||time) && <div className="text-safety-700/70 mt-1 mono text-[9.5px]">{by} · {time}</div>}
      </div>
    </div>
  );
}

// Mobile top bar
function MobileTopBar({ title, sub, back=true, right, dark=false }) {
  return (
    <div className={`${dark?'bg-brand-700 text-white':'bg-white border-b border-token'} px-5 pt-1 pb-3 flex items-center gap-3 shrink-0`}>
      {back && <button className={`-ml-2 w-10 h-10 rounded-full flex items-center justify-center ${dark?'hover:bg-white/10':'hover:bg-elev'}`}><Icon name="arrow-left" size={22} /></button>}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-bold tracking-tight truncate">{title}</div>
        {sub && <div className={`text-[11px] truncate ${dark?'text-white/70':'text-subtle'}`}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// Web sidebar
function WebSidebar({ current='visitor', role='host' }) {
  const items = role === 'so' ? [
    { id:'dashboard', name:'HSE Dashboard',  icon:'layout-dashboard' },
    { id:'ptw',        name:'PTW',             icon:'clipboard-list' },
    { id:'visitor',    name:'Visitor Permit',  icon:'id-card', active:true },
    { id:'incidents',  name:'Incidents',        icon:'shield-alert' },
    { id:'audit',      name:'Audit & Compliance',icon:'file-check-2' },
  ] : [
    { id:'dashboard', name:'Dashboard',       icon:'layout-dashboard' },
    { id:'visitor',    name:'Visitor Mgmt',    icon:'id-card', active:true },
    { id:'accommodation',name:'Accommodation', icon:'bed-double' },
    { id:'rooms',      name:'Room booking',    icon:'door-closed' },
    { id:'reports',    name:'Reports',          icon:'bar-chart-3' },
  ];
  return (
    <aside className="w-60 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 px-4 border-b border-token flex items-center gap-2.5">
        <BrandMark size={30} />
        <div className="leading-tight">
          <div className="text-[12px] font-bold tracking-tight">Nusaraya</div>
          <div className="text-[9px] uppercase tracking-wider text-brand-700 font-bold">{role==='so'?'HSE · Safety':'Accommodation · HR'}</div>
        </div>
      </div>
      <div className="px-3 py-4 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Modules</div>
        <nav className="space-y-0.5">
          {items.map(i => (
            <a key={i.id} className={`flex items-center gap-2.5 px-3 h-9 rounded-md text-[12.5px] font-medium transition-colors
                ${i.active?'bg-brand-50 text-brand-700':'text-muted hover:bg-elev'}`}>
              <Icon name={i.icon} size={15} /><span>{i.name}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="p-3 border-t border-token">
        <div className="rounded-lg bg-elev p-3">
          <div className="text-[10px] uppercase tracking-wider text-brand-700 font-bold">{role==='so'?'Safety Officer':'Host'}</div>
          <div className="text-[12px] font-bold mt-0.5">{role==='so'?'Sari Hartati':'Budi Hartono'}</div>
          <div className="text-[10px] text-muted">{role==='so'?'HSE Lead':'Operations · Sponsor'}</div>
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
        <span>Cari visitor, permit, organisasi…</span>
        <span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span>
      </div>
      <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative">
        <Icon name="bell" size={17} /><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" />
      </button>
      <div className="h-6 w-px bg-[color:var(--border)]" />
      <div className="flex items-center gap-2">
        <Avatar name="Budi Hartono" size={32} tone="brand" />
        <div className="hidden lg:block leading-tight">
          <div className="text-[12px] font-bold">Budi Hartono</div>
          <div className="text-[10px] text-subtle">Operations</div>
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

// Area access row (authorized/restricted with escort flag)
function AreaAccess({ name, allowed, escort, risk }) {
  return (
    <div className={`flex items-center gap-2.5 px-3 h-10 rounded-lg ${allowed?'bg-success-50/60':'bg-danger-50/40'}`}>
      <Icon name={allowed?'check-circle-2':'x-circle'} size={16} className={allowed?'text-success-600':'text-danger-500'} />
      <span className={`flex-1 text-[12.5px] font-bold ${allowed?'':'text-muted line-through'}`}>{name}</span>
      {allowed && escort && <StatusPill tone="warning" size="sm" icon="user-check">Escort only</StatusPill>}
      {allowed && risk==='high' && <StatusPill tone="danger" size="sm" icon="alert-triangle">High risk</StatusPill>}
    </div>
  );
}

window.PhoneFrame = PhoneFrame;
window.BrowserChrome = BrowserChrome;
window.TabletFrame = TabletFrame;
window.BrandMark = BrandMark;
window.StatusPill = StatusPill;
window.Btn = Btn;
window.VisitStatusBadge = VisitStatusBadge;
window.VisitorTypeBadge = VisitorTypeBadge;
window.Avatar = Avatar;
window.QRCode = QRCode;
window.PrepSteps = PrepSteps;
window.AuditNote = AuditNote;
window.MobileTopBar = MobileTopBar;
window.WebSidebar = WebSidebar;
window.WebTopBar = WebTopBar;
window.KPICard = KPICard;
window.FilterChip = FilterChip;
window.AreaAccess = AreaAccess;
