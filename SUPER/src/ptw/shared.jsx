// Shared components and data for PTW module.

// =============== Permit types (color-coded) ===============
const PERMIT_TYPES = {
  HW: { code:'HW', label:'Hot Work',       desc:'Pengelasan, gerinda, pemotongan, soldering',  icon:'flame',           tone:'hw',  risk:'Tinggi' },
  CS: { code:'CS', label:'Confined Space', desc:'Tangki BBM, ruang tertutup, manhole',          icon:'container',       tone:'cs',  risk:'Sangat tinggi', mandatorySO:true },
  WH: { code:'WH', label:'Work at Height', desc:'Pekerjaan > 1.8m dari permukaan tanah',        icon:'arrow-up-from-line', tone:'wh',  risk:'Tinggi' },
  IS: { code:'IS', label:'Isolation / LOTO', desc:'Lock Out Tag Out energy isolation',          icon:'lock',            tone:'is',  risk:'Tinggi' },
  EX: { code:'EX', label:'Excavation',     desc:'Penggalian > 30 cm di area utility',           icon:'shovel',          tone:'ex',  risk:'Tinggi' },
  GE: { code:'GE', label:'General Permit', desc:'Pekerjaan rutin dengan pengawasan',            icon:'clipboard-list',  tone:'ge',  risk:'Rendah' },
};
window.PERMIT_TYPES = PERMIT_TYPES;

// =============== Permit status ===============
const PERMIT_STATUS = {
  draft:    { label:'Draft',     tone:'gray',    icon:'edit-3' },
  pending:  { label:'Pending',   tone:'warning', icon:'clock' },
  approved: { label:'Approved',  tone:'info',    icon:'check-circle-2' },
  active:   { label:'Active',    tone:'success', icon:'circle-play' },
  suspended:{ label:'Suspended', tone:'warning', icon:'pause-circle' },
  closed:   { label:'Closed',    tone:'gray',    icon:'check' },
  rejected: { label:'Rejected',  tone:'danger',  icon:'x-circle' },
};
window.PERMIT_STATUS = PERMIT_STATUS;

// =============== Status bar (phone) ===============
function StatusBar({ dark = false }) {
  return (
    <div className="iphone-statusbar" style={{ color: dark ? '#fff' : '#0f1115' }}>
      <div className="mono">08:47</div>
      <div className="flex items-center gap-1.5">
        <Icon name="signal" size={15} />
        <Icon name="wifi" size={15} />
        <div className="flex items-center gap-0.5">
          <div className="mono text-[11px] font-bold">76</div>
          <div className="relative w-[24px] h-[12px] rounded-[3px]"
               style={{ border: `1.5px solid ${dark ? '#fff' : '#0f1115'}` }}>
            <div className="absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px]"
                 style={{ width: '76%', background: dark ? '#fff' : '#0f1115' }} />
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
    <div
      className="rounded-[28%] flex items-center justify-center font-extrabold text-white"
      style={{
        width: size, height: size,
        background: 'linear-gradient(135deg, #4179AE 0%, #1F4E79 60%, #F39800 140%)',
        boxShadow: '0 6px 16px -8px rgba(31,78,121,0.6)',
        fontSize: size * 0.55, letterSpacing: '-0.05em',
      }}
    >N</div>
  );
}

// =============== Common UI ===============
function StatusPill({ tone='gray', icon, children, size='md', blink, square }) {
  const map = {
    success: 'bg-success-50 text-success-700 border-success-500/25',
    warning: 'bg-warning-50 text-warning-700 border-warning-500/25',
    danger:  'bg-danger-50 text-danger-700 border-danger-500/25',
    info:    'bg-info-50 text-info-700 border-info-500/25',
    gray:    'bg-elev text-muted border-token',
    hw:      'bg-hw-50 text-hw-700 border-hw-500/25',
    cs:      'bg-cs-50 text-cs-700 border-cs-500/25',
    wh:      'bg-wh-50 text-wh-700 border-wh-500/25',
    is:      'bg-is-50 text-is-700 border-is-500/25',
    ex:      'bg-ex-50 text-ex-700 border-ex-500/25',
    ge:      'bg-ge-50 text-ge-700 border-ge-500/25',
    dark:    'bg-brand-700 text-white border-brand-800',
  };
  const sizes = {
    sm: 'px-1.5 h-5 text-[10px] gap-1',
    md: 'px-2 h-6 text-[11px] gap-1.5',
    lg: 'px-2.5 h-7 text-[12px] gap-1.5',
  };
  return (
    <span className={`inline-flex items-center font-bold border ${square?'rounded':'rounded-md'} ${map[tone]} ${sizes[size]} ${blink?'active-blink':''}`}>
      {icon && <Icon name={icon} size={size==='lg'?13:size==='sm'?10:12} />}
      {children}
    </span>
  );
}

function Btn({ variant='primary', size='md', icon, iconRight, children, full, disabled, onClick, className='' }) {
  const sizes = {
    sm: 'h-9 px-3 text-[13px] gap-1.5',
    md: 'h-11 px-4 text-[14px] gap-2',
    lg: 'h-14 px-5 text-[15px] gap-2.5',
  };
  const variants = {
    primary:   'bg-brand-500 text-white hover:bg-brand-600 shadow-sm',
    secondary: 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50',
    ghost:     'text-brand-700 hover:bg-brand-50',
    success:   'bg-success-500 text-white hover:bg-success-600',
    danger:    'bg-danger-500 text-white hover:bg-danger-600',
    outlineDanger: 'border border-danger-500/40 text-danger-700 bg-white hover:bg-danger-50',
    safety:    'bg-safety-500 text-white hover:bg-safety-600',
    dark:      'bg-brand-700 text-white hover:bg-brand-800',
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

// Permit type badge — used in many places.
function PermitTypeBadge({ type, size='md' }) {
  const t = PERMIT_TYPES[type];
  if (!t) return null;
  return <StatusPill tone={t.tone} icon={t.icon} size={size}>{t.code} · {t.label}</StatusPill>;
}

function PermitStatusBadge({ status, blink, size='md' }) {
  const s = PERMIT_STATUS[status];
  if (!s) return null;
  return <StatusPill tone={s.tone} icon={s.icon} size={size} blink={blink&&status==='active'}>{s.label}</StatusPill>;
}

// =============== Mobile chrome ===============
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

function MobileBottomNav({ active = 3 }) {
  const tabs = [
    { name:'Home', icon:'home' },
    { name:'Attendance', icon:'clock' },
    { name:'ESS', icon:'briefcase' },
    { name:'Safety', icon:'shield' },
    { name:'PTW', icon:'clipboard-list' },
  ];
  return (
    <div className="border-t border-token bg-white grid grid-cols-5 px-2 pt-1.5 pb-1.5">
      {tabs.map((t, i) => (
        <button key={t.name} className="flex flex-col items-center gap-0.5 py-1">
          <Icon name={t.icon} size={22} className={i === active ? 'text-brand-500' : 'text-subtle'} />
          <span className={`text-[10px] font-semibold ${i === active ? 'text-brand-500' : 'text-subtle'}`}>{t.name}</span>
        </button>
      ))}
    </div>
  );
}

// =============== Form helpers ===============
function StepDots({ current, total, labels }) {
  return (
    <div className="px-5 py-3 bg-white border-b border-token shrink-0">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] uppercase tracking-wider font-bold text-subtle">Step {current} dari {total}</div>
        <div className="text-[11px] font-bold text-brand-700">{labels[current-1]}</div>
      </div>
      <div className="flex items-center gap-1.5">
        {Array.from({length:total}).map((_,i) => {
          const done = i < current-1, active = i === current-1;
          return (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${done?'bg-brand-500':active?'bg-brand-500':'bg-[color:var(--border)]'}`}>
              {active && <div className="h-full w-1/2 bg-brand-700 rounded-full" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FormSection({ title, sub, children, optional }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <div className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-muted">{title}</div>
          {sub && <div className="text-[10.5px] text-subtle">{sub}</div>}
        </div>
        {optional && <span className="text-[10px] font-semibold text-subtle">opsional</span>}
      </div>
      {children}
    </div>
  );
}

function Field({ icon, value, placeholder, hint, error, mono, suffix }) {
  return (
    <div className={`flex items-center h-12 rounded-xl border bg-white px-3 gap-2 ${error?'border-danger-500':'border-token-strong'}`}>
      {icon && <Icon name={icon} size={18} className="text-subtle" />}
      <div className={`flex-1 text-[14px] min-w-0 truncate ${value?'':'text-subtle'} ${mono?'mono':''}`}>{value || placeholder}</div>
      {suffix}
    </div>
  );
}

function Toggle({ on, label, desc }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold">{label}</div>
        {desc && <div className="text-[11px] text-muted">{desc}</div>}
      </div>
      <div className={`w-11 h-6 rounded-full p-0.5 ${on?'bg-success-500':'bg-[color:var(--border-strong)]'}`}>
        <div className={`w-5 h-5 rounded-full bg-white shadow transition-all ${on?'translate-x-5':''}`} />
      </div>
    </div>
  );
}

// =============== Avatar ===============
function Avatar({ name, size=32, tone='brand' }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = { brand:'bg-brand-500', safety:'bg-safety-500', danger:'bg-danger-500', info:'bg-info-500', success:'bg-success-500', gray:'bg-[#5b6472]' };
  return (
    <div className={`rounded-full text-white flex items-center justify-center font-bold ${tones[tone]}`}
         style={{ width: size, height: size, fontSize: size*0.35 }}>
      {initials}
    </div>
  );
}

// =============== Gas test gauge ===============
function GasGauge({ label, value, unit, safe, range }) {
  // safe = boolean. range = [low, high] for visual scale
  const [lo, hi] = range;
  const pct = Math.min(100, Math.max(0, ((value - lo) / (hi - lo)) * 100));
  return (
    <div className="surface rounded-xl p-3">
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted">{label}</div>
        <div className={`text-[20px] font-extrabold mono leading-none ${safe?'text-success-700':'text-danger-700'}`}>{value}<span className="text-[11px] text-subtle font-bold ml-0.5">{unit}</span></div>
      </div>
      <div className="h-2 rounded-full bg-[color:var(--border)] overflow-hidden relative">
        <div className="absolute inset-y-0 rounded-full" style={{ left:`${pct}%`, width: 6, transform:'translateX(-3px)', background: safe?'#1D9E75':'#E24B4A' }} />
        <div className="absolute inset-y-0 left-0 right-0">
          <div className="h-full bg-gradient-to-r from-success-500/15 via-success-500/30 to-success-500/15" />
        </div>
      </div>
      <div className="flex justify-between text-[9.5px] text-subtle mono mt-1">
        <span>{lo}</span><span>{hi}</span>
      </div>
    </div>
  );
}

// =============== Exports ===============
window.PhoneFrame = PhoneFrame;
window.BrowserChrome = BrowserChrome;
window.TabletFrame = TabletFrame;
window.BrandMark = BrandMark;
window.StatusPill = StatusPill;
window.Btn = Btn;
window.PermitTypeBadge = PermitTypeBadge;
window.PermitStatusBadge = PermitStatusBadge;
window.MobileTopBar = MobileTopBar;
window.MobileBottomNav = MobileBottomNav;
window.StepDots = StepDots;
window.FormSection = FormSection;
window.Field = Field;
window.Toggle = Toggle;
window.Avatar = Avatar;
window.GasGauge = GasGauge;
