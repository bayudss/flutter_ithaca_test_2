// Shared building blocks for Catering Module.

function StatusBar({ dark = false }) {
  const time = '11:48';
  return (
    <div className="iphone-statusbar" style={{ color: dark ? '#fff' : '#0f1115' }}>
      <div className="mono">{time}</div>
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

function BrowserChrome({ url, children, height = 720, sub }) {
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
      <div className="h-[calc(100%-36px)] overflow-hidden">{children}</div>
    </div>
  );
}

function TabletFrame({ children, label, sub }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="tablet-frame">
        <div className="tablet-screen">{children}</div>
      </div>
      {label && (
        <div className="text-center">
          <div className="text-[12px] font-bold tracking-tight">{label}</div>
          {sub && <div className="text-[11px] text-subtle mt-0.5">{sub}</div>}
        </div>
      )}
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
    >
      N
    </div>
  );
}

// =================== Food placeholder ===================
// `kind` maps to a CSS class with food-toned radial gradients.
function FoodImage({ kind = 'nasi-uduk', className = '', children, ratio = '16/10', rounded = 'rounded-xl' }) {
  return (
    <div className={`relative overflow-hidden ${rounded} food-${kind} ${className}`} style={{ aspectRatio: ratio }}>
      {/* plate rim */}
      <div className="absolute inset-3 rounded-full border border-white/15" />
      {/* tiny garnish glints */}
      <div className="absolute top-3 right-4 w-3 h-3 rounded-full bg-white/30" />
      <div className="absolute bottom-4 left-5 w-2 h-2 rounded-full bg-white/20" />
      {children}
    </div>
  );
}

// =================== Common UI bits ===================
function StatusPill({ tone, icon, children, size='md' }) {
  const map = {
    success: 'bg-success-50 text-success-700 border-success-500/20',
    warning: 'bg-warning-50 text-warning-700 border-warning-500/25',
    danger:  'bg-danger-50 text-danger-700 border-danger-500/20',
    info:    'bg-info-50 text-info-700 border-info-500/20',
    cater:   'bg-cater-50 text-cater-700 border-cater-500/25',
    herb:    'bg-herb-50 text-herb-700 border-herb-500/25',
    gray:    'bg-elev text-muted border-token',
    dark:    'bg-brand-700 text-white border-brand-800',
  };
  const sizes = {
    sm: 'px-1.5 h-5 text-[10px] gap-1',
    md: 'px-2 h-6 text-[11px] gap-1.5',
  };
  return (
    <span className={`inline-flex items-center rounded-md font-semibold border ${map[tone]} ${sizes[size]}`}>
      {icon && <Icon name={icon} size={size==='sm'?10:12} />}
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
    cater:     'bg-cater-500 text-white hover:bg-cater-600 shadow-sm',
    secondary: 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50',
    ghost:     'text-brand-700 hover:bg-brand-50',
    success:   'bg-success-500 text-white hover:bg-success-600',
    danger:    'bg-danger-500 text-white hover:bg-danger-600',
    outlineDanger: 'border border-danger-500/40 text-danger-700 bg-white hover:bg-danger-50',
    outlineLight: 'border border-white/30 text-white bg-transparent hover:bg-white/10',
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

// Meal slot pill — used on cards
function MealIcon({ slot, size=20, className='' }) {
  const map = {
    sarapan: 'sunrise',
    siang:   'sun',
    malam:   'moon',
  };
  return <Icon name={map[slot] || 'utensils'} size={size} className={className} />;
}

// Avatar with initials
function Avatar({ name, size=36, tone='brand' }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = {
    brand: 'bg-brand-500',
    cater: 'bg-cater-500',
    herb:  'bg-herb-500',
    gray:  'bg-[#5b6472]',
  };
  return (
    <div className={`rounded-full text-white flex items-center justify-center font-bold ${tones[tone]}`}
         style={{ width: size, height: size, fontSize: size*0.36 }}>
      {initials}
    </div>
  );
}

// Section card wrapper (web)
function Card({ title, right, children, padding='p-5', className='' }) {
  return (
    <div className={`surface rounded-xl ${className}`}>
      {title && (
        <div className="px-5 h-12 border-b border-token flex items-center gap-3">
          <div className="text-[13px] font-bold tracking-tight">{title}</div>
          <div className="flex-1" />
          {right}
        </div>
      )}
      <div className={padding}>{children}</div>
    </div>
  );
}

// KPI card (web dashboards)
function KPICard({ icon, label, value, sub, tone='brand', delta }) {
  const tones = {
    brand:   'bg-brand-50 text-brand-600',
    cater:   'bg-cater-50 text-cater-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger:  'bg-danger-50 text-danger-500',
    herb:    'bg-herb-50 text-herb-600',
  };
  return (
    <div className="surface rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tones[tone]}`}>
          <Icon name={icon} size={17} />
        </div>
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

// QR Code visual (SVG mock)
function QRCode({ size=220, accent='#0f1115' }) {
  // Generate a deterministic pattern of squares that *looks* like a QR.
  const rng = (i) => ((i * 9301 + 49297) % 233280) / 233280;
  const cells = 25;
  const skip = (r,c) => {
    // Reserve finder patterns
    const inFinder = (r < 8 && c < 8) || (r < 8 && c > cells-9) || (r > cells-9 && c < 8);
    return inFinder;
  };
  return (
    <svg viewBox={`0 0 ${cells} ${cells}`} width={size} height={size} style={{ display:'block' }}>
      <rect x="0" y="0" width={cells} height={cells} fill="#fff" />
      {Array.from({length: cells*cells}).map((_,i) => {
        const r = Math.floor(i/cells), c = i%cells;
        if (skip(r,c)) return null;
        const v = rng(i*13 + r*7 + c*3);
        if (v < 0.46) return <rect key={i} x={c} y={r} width="1" height="1" fill={accent} />;
        return null;
      })}
      {/* Finder patterns */}
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

window.PhoneFrame = PhoneFrame;
window.BrowserChrome = BrowserChrome;
window.TabletFrame = TabletFrame;
window.BrandMark = BrandMark;
window.StatusPill = StatusPill;
window.Btn = Btn;
window.MealIcon = MealIcon;
window.Avatar = Avatar;
window.Card = Card;
window.KPICard = KPICard;
window.QRCode = QRCode;
window.FoodImage = FoodImage;
