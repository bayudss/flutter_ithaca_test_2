// Shared — Contractor Management module.

// =============== Classifications ===============
const CLASS = {
  hauling:   { label:'Hauling',          icon:'truck',     tone:'info' },
  mining:    { label:'Mining services',  icon:'pickaxe',   tone:'safety' },
  support:   { label:'Support services', icon:'wrench',    tone:'success' },
  catering:  { label:'Catering',         icon:'utensils',  tone:'warning' },
  security:  { label:'Security',         icon:'shield',    tone:'danger' },
  other:     { label:'Other',            icon:'package',   tone:'gray' },
};
window.CLASS = CLASS;

// =============== Sample contractors ===============
const CONTRACTORS = [
  { id:'CTR-001', name:'PT Karya Nusantara Cipta',  short:'PT KNC',     cls:'hauling',  workers:412, score:96, period:'Jan 2024 – Des 2026', progress:62, status:'active',    npwp:'01.234.567.8-901.000' },
  { id:'CTR-002', name:'PT Surya Mining Service',    short:'PT SMS',     cls:'mining',   workers:280, score:91, period:'Mar 2024 – Feb 2027',  progress:58, status:'active',    npwp:'02.345.678.9-012.000' },
  { id:'CTR-003', name:'PT Bahari Boga Mandiri',     short:'Bahari',     cls:'catering', workers:42,  score:94, period:'Jan – Des 2026',        progress:42, status:'active',    npwp:'03.456.789.0-123.000' },
  { id:'CTR-004', name:'PT Bahana Welding Services', short:'PT BWS',     cls:'support',  workers:68,  score:78, score_warn:true, period:'Apr – Sep 2026', progress:65, status:'active', npwp:'04.567.890.1-234.000' },
  { id:'CTR-005', name:'PT Aman Lestari Security',    short:'PT ALS',     cls:'security', workers:96,  score:99, period:'Jan 2025 – Des 2027',   progress:35, status:'active',    npwp:'05.678.901.2-345.000' },
  { id:'CTR-006', name:'PT Nuansa Catering',          short:'Nuansa',     cls:'catering', workers:28,  score:88, period:'Jan – Jun 2026',         progress:78, status:'expiring', npwp:'06.789.012.3-456.000' },
  { id:'CTR-007', name:'CV Tirta Hauling',            short:'CV Tirta',   cls:'hauling',  workers:18,  score:62, score_warn:true, period:'Sep 2024 – Aug 2026', progress:88, status:'suspended', npwp:'07.890.123.4-567.000' },
  { id:'CTR-008', name:'PT Pondok Lestari',           short:'Pondok',     cls:'catering', workers:14,  score:81, period:'Standby',                progress:0,  status:'standby',  npwp:'08.901.234.5-678.000' },
];
window.CONTRACTORS = CONTRACTORS;

// =============== Sample workers ===============
const WORKERS = [
  { id:'W-12041', name:'Budi Santoso',     pos:'Driver Hauling',   ctr:'PT KNC',     dept:'Hauling Unit B',  joined:'12 Jan 2024', age:34, mcuValid:'15 Mar 2027', mcuDays:296, simperValid:'14 Aug 2026', simperClass:'B', certs:[{n:'SIMPER B',d:88},{n:'K3L',d:120},{n:'MCU',d:296}], areas:['PIT','Hauling','Mess'], status:'active', tone:'brand' },
  { id:'W-08092', name:'Lina Marbun',       pos:'Welder 3G SMAW',   ctr:'PT BWS',     dept:'Workshop',         joined:'04 Jun 2024', age:29, mcuValid:'02 Mei 2026', mcuDays:-17, simperValid:'-',           simperClass:'-', certs:[{n:'Welder 3G',d:42},{n:'K3L',d:88},{n:'MCU',d:-17}], areas:['Workshop'], status:'suspended', tone:'gray', flag:'MCU expired' },
  { id:'W-19341', name:'Asep Hidayat',      pos:'Operator Excav',   ctr:'PT SMS',     dept:'Mining Pit B',     joined:'21 Apr 2024', age:38, mcuValid:'10 Jul 2026', mcuDays:52,  simperValid:'30 Sep 2026', simperClass:'A', certs:[{n:'SIMPER A',d:134},{n:'K3L',d:48},{n:'MCU',d:52}], areas:['PIT','OLC'], status:'active', tone:'safety' },
  { id:'W-26618', name:'Rina Wati',         pos:'Cook · Bahari',     ctr:'Bahari',     dept:'Mess Griya Praja', joined:'15 Sep 2024', age:31, mcuValid:'28 Jun 2026', mcuDays:40,  simperValid:'-',           simperClass:'-', certs:[{n:'Food handler',d:40},{n:'K3L',d:42},{n:'MCU',d:40}], areas:['Mess'], status:'active', tone:'warning' },
  { id:'W-14411', name:'Eko Saputra',       pos:'Welder',            ctr:'PT BWS',     dept:'Workshop',         joined:'02 Feb 2024', age:36, mcuValid:'12 Apr 2027', mcuDays:324, simperValid:'-',           simperClass:'-', certs:[{n:'Welder 3G',d:8},{n:'K3L',d:128},{n:'MCU',d:324}], areas:['Workshop'], status:'expiring', tone:'safety', flag:'Welder cert <14h' },
  { id:'W-31022', name:'Joko Pranoto',      pos:'Confined Space',    ctr:'PT KNC',     dept:'Tank Maintenance', joined:'08 Mar 2024', age:42, mcuValid:'20 Mar 2027', mcuDays:301, simperValid:'-',           simperClass:'-', certs:[{n:'CS Entry',d:78},{n:'Rescue',d:78},{n:'K3L',d:152},{n:'MCU',d:301}], areas:['Tank BBM','PIT'], status:'active', tone:'brand' },
  { id:'W-22041', name:'Bagas Rinaldi',     pos:'Mekanik Crane',     ctr:'PT BWS',     dept:'Workshop',         joined:'10 Jul 2024', age:28, mcuValid:'05 Mei 2027', mcuDays:347, simperValid:'14 Mei 2026', simperClass:'C', certs:[{n:'SIMPER C',d:-5},{n:'K3L',d:62},{n:'MCU',d:347}], areas:['Workshop'], status:'suspended', tone:'gray', flag:'SIMPER expired' },
  { id:'W-30015', name:'Henny Sari',        pos:'Driver Light Veh',  ctr:'PT KNC',     dept:'Light Vehicle',    joined:'25 Aug 2024', age:33, mcuValid:'18 Sep 2026', mcuDays:122, simperValid:'22 Oct 2026', simperClass:'D', certs:[{n:'SIMPER D',d:156},{n:'K3L',d:98},{n:'MCU',d:122}], areas:['Hauling','OLC'], status:'active', tone:'success' },
];
window.WORKERS = WORKERS;

// =============== Status bar (phone) ===============
function StatusBar({ dark = false }) {
  return (
    <div className="iphone-statusbar" style={{ color: dark ? '#fff' : '#0f1115' }}>
      <div className="mono">08:14</div>
      <div className="flex items-center gap-1.5">
        <Icon name="signal" size={15} />
        <Icon name="wifi" size={15} />
        <div className="flex items-center gap-0.5">
          <div className="mono text-[11px] font-bold">88</div>
          <div className="relative w-[24px] h-[12px] rounded-[3px]"
               style={{ border: `1.5px solid ${dark ? '#fff' : '#0f1115'}` }}>
            <div className="absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px]"
                 style={{ width: '88%', background: dark ? '#fff' : '#0f1115' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ label, sub, anno, children, dark = false }) {
  return (
    <div className="relative flex flex-col items-center gap-3 shrink-0">
      <div className="iphone-frame">
        <div className="iphone-notch" />
        <div className={`iphone-screen ${dark ? 'on-dark' : ''}`}>
          <StatusBar dark={dark} />
          <div className="flex-1 flex flex-col min-h-0">{children}</div>
        </div>
        <div className="iphone-home" style={{ background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.35)' }} />
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

function BrowserChrome({ url, children, height = 720 }) {
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
    <div className="rounded-[22px] bg-[#0b0d12] p-3 shadow-2xl" style={{ width: 1280, height: 800 }}>
      <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#0A0F18]">{children}</div>
    </div>
  );
}

function BrandMark({ size = 40 }) {
  return (
    <div className="rounded-[28%] flex items-center justify-center font-extrabold text-white"
      style={{ width: size, height: size, background:'linear-gradient(135deg, #4179AE 0%, #1F4E79 60%, #F39800 140%)', boxShadow:'0 6px 16px -8px rgba(31,78,121,0.6)', fontSize: size*0.55, letterSpacing:'-0.05em' }}>N</div>
  );
}

function StatusPill({ tone='gray', icon, children, size='md', square }) {
  const map = {
    success: 'bg-success-50 text-success-700 border-success-500/25',
    warning: 'bg-warning-50 text-warning-700 border-warning-500/25',
    danger:  'bg-danger-50 text-danger-700 border-danger-500/25',
    info:    'bg-info-50 text-info-700 border-info-500/25',
    safety:  'bg-safety-50 text-safety-700 border-safety-500/25',
    gray:    'bg-elev text-muted border-token',
    dark:    'bg-brand-700 text-white border-brand-800',
  };
  const sizes = { sm:'px-1.5 h-5 text-[10px] gap-1', md:'px-2 h-6 text-[11px] gap-1.5', lg:'px-2.5 h-7 text-[12px] gap-1.5' };
  return (
    <span className={`inline-flex items-center font-bold border ${square?'rounded':'rounded-md'} ${map[tone]} ${sizes[size]}`}>
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
    outlineDanger:'border border-danger-500/40 text-danger-700 bg-white hover:bg-danger-50',
    safety:'bg-safety-500 text-white hover:bg-safety-600',
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

// Avatar with initials
function Avatar({ name, size=32, tone='brand', photo }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = { brand:'bg-brand-500', safety:'bg-safety-500', danger:'bg-danger-500', info:'bg-info-500', success:'bg-success-500', warning:'bg-warning-500', gray:'bg-[#5b6472]' };
  return (
    <div className={`rounded-full text-white flex items-center justify-center font-bold shrink-0 ${tones[tone]}`}
         style={{ width: size, height: size, fontSize: size*0.36 }}>
      {initials}
    </div>
  );
}

// Cert expiry progress bar (visual urgency)
function CertProgress({ days, label, size='md' }) {
  const tone = days < 0 ? 'expired' : days < 7 ? 'critical' : days < 30 ? 'warning' : 'safe';
  const color = { safe:'#1D9E75', warning:'#EF9F27', critical:'#E24B4A', expired:'#5b6472' }[tone];
  // Use max 365 days for visual fill (closer to expiry = less green)
  const pct = days < 0 ? 100 : Math.max(5, Math.min(100, 100 - (days/365)*100));
  return (
    <div className={size==='sm'?'space-y-1':'space-y-1.5'}>
      {label && (
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold">{label}</span>
          <span className="mono font-bold" style={{ color }}>{days < 0 ? `Expired ${Math.abs(days)}h lalu` : `${days}h tersisa`}</span>
        </div>
      )}
      <div className={`${size==='sm'?'h-1.5':'h-2'} rounded-full bg-[color:var(--border)] overflow-hidden`}>
        <div className="h-full rounded-full" style={{ width:`${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// Cert badge mini (in tables)
function CertBadge({ name, days }) {
  const tone = days < 0 ? 'danger' : days < 7 ? 'danger' : days < 30 ? 'warning' : 'success';
  const ic = days < 0 ? 'x-circle' : days < 30 ? 'alert-triangle' : 'shield-check';
  return <StatusPill tone={tone} icon={ic} size="sm">{name}</StatusPill>;
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
        const r = Math.floor(i/cells), c = i%cells;
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

// KPI card (web)
function KPICard({ icon, label, value, sub, tone='brand', delta }) {
  const tones = {
    brand:'bg-brand-50 text-brand-600',
    success:'bg-success-50 text-success-600',
    warning:'bg-warning-50 text-warning-600',
    danger:'bg-danger-50 text-danger-500',
    safety:'bg-safety-50 text-safety-600',
    info:'bg-info-50 text-info-600',
  };
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

// =============== Web sidebar (HR section) ===============
function HRSidebar({ current='contractor' }) {
  const items = [
    { id:'dashboard',  name:'HR Dashboard',  icon:'layout-dashboard' },
    { id:'employees',  name:'Karyawan',       icon:'users' },
    { id:'contractor', name:'Contractor Mgmt',icon:'building-2', active:true },
    { id:'compliance', name:'Compliance',     icon:'shield-check', badge:'87' },
    { id:'training',   name:'Training',       icon:'graduation-cap' },
    { id:'access',     name:'Access control', icon:'key-round' },
    { id:'reports',    name:'Laporan',        icon:'file-bar-chart' },
    { id:'settings',   name:'Pengaturan',     icon:'settings' },
  ];
  return (
    <aside className="w-60 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 px-4 border-b border-token flex items-center gap-2.5">
        <BrandMark size={30} />
        <div className="leading-tight">
          <div className="text-[12px] font-bold tracking-tight">Nusaraya</div>
          <div className="text-[9px] uppercase tracking-wider text-brand-700 font-bold">HR &amp; Compliance</div>
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
                   ${active?'bg-brand-50 text-brand-700':'text-muted hover:bg-elev'}`}>
                <Icon name={i.icon} size={15} />
                <span className="flex-1">{i.name}</span>
                {i.badge && <span className="text-[9px] font-bold px-1.5 rounded-full bg-warning-500 text-white">{i.badge}</span>}
              </a>
            );
          })}
        </nav>
      </div>
      <div className="p-3 border-t border-token">
        <div className="rounded-lg bg-elev p-3">
          <div className="text-[10px] uppercase tracking-wider text-brand-700 font-bold">Operator</div>
          <div className="text-[12px] font-bold mt-0.5">Maya Saputri</div>
          <div className="text-[10px] text-muted">HR Lead · Site Bahana</div>
        </div>
      </div>
    </aside>
  );
}

function HRTopBar({ title, sub }) {
  return (
    <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
      <div>
        <div className="text-[10px] text-subtle uppercase tracking-wider">{sub}</div>
        <div className="text-[14px] font-bold tracking-tight">{title}</div>
      </div>
      <div className="flex-1" />
      <div className="bg-elev rounded-md px-3 h-9 flex items-center gap-2 text-[12px] text-subtle min-w-[320px]">
        <Icon name="search" size={14} />
        <span>Cari NIK, nama worker, kontraktor…</span>
        <span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span>
      </div>
      <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative">
        <Icon name="bell" size={17} />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" />
      </button>
      <div className="h-6 w-px bg-[color:var(--border)]" />
      <div className="flex items-center gap-2">
        <Avatar name="Maya Saputri" size={32} tone="brand" />
        <div className="hidden lg:block leading-tight">
          <div className="text-[12px] font-bold">Maya Saputri</div>
          <div className="text-[10px] text-subtle">HR Lead</div>
        </div>
        <Icon name="chevron-down" size={14} className="text-subtle" />
      </div>
    </header>
  );
}

// Exports
window.PhoneFrame = PhoneFrame;
window.BrowserChrome = BrowserChrome;
window.TabletFrame = TabletFrame;
window.BrandMark = BrandMark;
window.StatusPill = StatusPill;
window.Btn = Btn;
window.Avatar = Avatar;
window.CertProgress = CertProgress;
window.CertBadge = CertBadge;
window.QRCode = QRCode;
window.KPICard = KPICard;
window.FilterChip = FilterChip;
window.HRSidebar = HRSidebar;
window.HRTopBar = HRTopBar;
