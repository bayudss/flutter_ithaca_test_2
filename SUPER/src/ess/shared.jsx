// Shared building blocks for ESS Module.

function StatusBar({ dark = false, time = '09:24' }) {
  return (
    <div className="iphone-statusbar" style={{ color: dark ? '#fff' : '#0f1115' }}>
      <div className="mono">{time}</div>
      <div className="flex items-center gap-1.5">
        <Icon name="signal" size={15} />
        <Icon name="wifi" size={15} />
        <div className="flex items-center gap-0.5">
          <div className="mono text-[11px] font-bold">82</div>
          <div className="relative w-[24px] h-[12px] rounded-[3px]"
               style={{ border: `1.5px solid ${dark ? '#fff' : '#0f1115'}` }}>
            <div className="absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px]"
                 style={{ width: '82%', background: dark ? '#fff' : '#0f1115' }} />
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
        <div className="iphone-screen" style={dark ? { color: '#fff' } : null}>
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
          <div className="bg-white border border-token rounded-md h-6 px-3 text-[11px] mono text-subtle inline-flex items-center gap-1.5 min-w-[300px] justify-center">
            <Icon name="lock" size={11} /> {url}
          </div>
        </div>
        <div className="w-12" />
      </div>
      <div className="h-[calc(100%-36px)]">{children}</div>
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

function StatusPill({ tone, icon, children, size='md' }) {
  const map = {
    success: 'bg-success-50 text-success-700 border-success-500/20',
    warning: 'bg-warning-50 text-warning-700 border-warning-500/25',
    danger:  'bg-danger-50 text-danger-700 border-danger-500/20',
    info:    'bg-info-50 text-info-700 border-info-500/20',
    brand:   'bg-brand-50 text-brand-700 border-brand-500/20',
    gray:    'bg-elev text-muted border-token',
  };
  const sz = size === 'sm' ? 'h-5 px-1.5 text-[10px]' : 'h-6 px-2 text-[11px]';
  return (
    <span className={`inline-flex items-center gap-1.5 ${sz} rounded-md font-semibold border ${map[tone]}`}>
      {icon && <Icon name={icon} size={size==='sm'?10:12} />}
      {children}
    </span>
  );
}

function Btn({ variant='primary', size='md', icon, iconRight, children, full, disabled, onClick, className='' }) {
  const sizes = { sm: 'h-9 px-3 text-[13px] gap-1.5', md: 'h-11 px-4 text-[14px] gap-2', lg: 'h-14 px-5 text-[15px] gap-2.5' };
  const variants = {
    primary:   'bg-brand-500 text-white hover:bg-brand-600 shadow-sm',
    secondary: 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50',
    ghost:     'text-brand-700 hover:bg-brand-50',
    success:   'bg-success-500 text-white hover:bg-success-600',
    danger:    'bg-danger-500 text-white hover:bg-danger-600',
    safety:    'bg-safety-500 text-white hover:bg-safety-600',
    outlineDanger: 'border border-danger-500/40 text-danger-700 bg-white hover:bg-danger-50',
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all focus-ring ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}>
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 16} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 20 : 16} />}
    </button>
  );
}

function MobileBottomNav({ active = 2 }) {
  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Attendance', icon: 'clock' },
    { name: 'ESS', icon: 'briefcase' },
    { name: 'Safety', icon: 'shield' },
    { name: 'Profile', icon: 'user' },
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

// Format IDR currency
function rp(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

// Mobile screen header (back + title)
function ScreenHeader({ title, sub, right, onBack = true }) {
  return (
    <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3 shrink-0">
      {onBack && (
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="arrow-left" size={22} />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-bold tracking-tight">{title}</div>
        {sub && <div className="text-[11px] text-subtle truncate">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// Step indicator
function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((s, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold
                ${isActive ? 'bg-brand-500 text-white ring-4 ring-brand-100' :
                  isDone ? 'bg-success-500 text-white' : 'bg-elev text-subtle border border-token'}`}>
                {isDone ? <Icon name="check" size={14} /> : i + 1}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-brand-700' : isDone ? 'text-success-700' : 'text-subtle'}`}>{s}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 rounded-full mb-5 ${i < current ? 'bg-success-500' : 'bg-[color:var(--border-strong)]'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

window.PhoneFrame = PhoneFrame;
window.BrowserChrome = BrowserChrome;
window.BrandMark = BrandMark;
window.StatusPill = StatusPill;
window.Btn = Btn;
window.MobileBottomNav = MobileBottomNav;
window.ScreenHeader = ScreenHeader;
window.StepIndicator = StepIndicator;
window.rp = rp;
