// Shared components for the Login & Onboarding mockup.

function StatusBar({ time = '06:42', dark = false }) {
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

function HomeIndicator({ dark = false }) {
  return (
    <div className="iphone-home" style={{ background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.35)' }} />
  );
}

function PhoneFrame({ label, children, dark = false }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="iphone-frame">
        <div className="iphone-notch" />
        <div className={`iphone-screen ${dark ? 'on-dark' : ''}`}>
          <StatusBar dark={dark} />
          <div className="flex-1 flex flex-col min-h-0">
            {children}
          </div>
        </div>
        <HomeIndicator dark={dark} />
      </div>
      <div className="text-[12px] font-semibold text-muted">{label}</div>
    </div>
  );
}

// Big rounded brand mark — used in splash & first screen.
function BrandMark({ size = 80, ring = true }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      {ring && (
        <div className="absolute inset-0 rounded-[28%] border-2 border-white/15"
             style={{ width: size * 1.35, height: size * 1.35, top: -size*0.175, left: -size*0.175 }} />
      )}
      <div
        className="rounded-[28%] flex items-center justify-center font-extrabold text-white"
        style={{
          width: size, height: size,
          background: 'linear-gradient(135deg, #2E9BE6 0%, #1670C4 55%, #0E4F8E 100%)',
          boxShadow: '0 12px 30px -10px rgba(22,112,196,0.45), 0 6px 16px -8px rgba(14,76,138,0.6)',
          fontSize: size * 0.55,
          letterSpacing: '-0.05em',
        }}
      >
        P
      </div>
    </div>
  );
}

// Worker illustration placeholder — uses safety colors so it doesn't look like AI slop.
// A geometric, badge-style illustration. Hard-hat silhouette.
function WorkerIllustration({ size = 200 }) {
  return (
    <svg viewBox="0 0 240 200" width={size} height={size * 200/240} aria-hidden="true">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF1F8" />
          <stop offset="1" stopColor="#CFDDEC" />
        </linearGradient>
        <linearGradient id="hatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5A529" />
          <stop offset="1" stopColor="#CC7F00" />
        </linearGradient>
      </defs>
      {/* sky/ground */}
      <rect x="0" y="0" width="240" height="200" rx="20" fill="url(#bgGrad)" />
      {/* mountain silhouettes */}
      <path d="M0,150 L60,90 L100,120 L150,70 L200,110 L240,90 L240,200 L0,200 Z" fill="#1670C4" opacity="0.85" />
      <path d="M0,170 L40,140 L90,160 L140,135 L190,155 L240,140 L240,200 L0,200 Z" fill="#0F4C8A" />
      {/* sun */}
      <circle cx="195" cy="55" r="22" fill="#F39800" opacity="0.9" />
      {/* worker bust */}
      <g transform="translate(120 200)">
        {/* shoulders / vest */}
        <path d="M -52,0 C -52,-30 -28,-50 0,-50 C 28,-50 52,-30 52,0 Z" fill="#F39800" />
        {/* reflective stripe */}
        <path d="M -42,-10 C -38,-22 -20,-30 0,-30 C 20,-30 38,-22 42,-10" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        {/* head */}
        <circle cx="0" cy="-62" r="22" fill="#E8C9A0" />
        {/* hard hat */}
        <path d="M -28,-66 C -28,-86 -16,-96 0,-96 C 16,-96 28,-86 28,-66 Z" fill="url(#hatGrad)" />
        <rect x="-30" y="-68" width="60" height="5" rx="2" fill="#A36500" />
        {/* hat strap line */}
        <path d="M -22,-70 L 22,-70" stroke="#7A4C00" strokeWidth="1.5" />
        {/* face */}
        <circle cx="-7" cy="-62" r="1.8" fill="#0f1115" />
        <circle cx="7" cy="-62" r="1.8" fill="#0f1115" />
        <path d="M -5,-54 Q 0,-50 5,-54" stroke="#0f1115" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function PrimaryBtn({ children, icon, iconRight, full = true, onClick, variant = 'primary', size = 'md' }) {
  const sizes = {
    md: 'h-12 px-4 text-[14px]',
    lg: 'h-14 px-5 text-[15px]',
  };
  const variants = {
    primary:   'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm',
    secondary: 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50',
    safety:    'bg-safety-500 text-white hover:bg-safety-600',
    outline:   'bg-transparent text-white border border-white/30 hover:bg-white/10',
    ghost:     'text-brand-700 hover:bg-brand-50',
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus-ring ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''}`}
    >
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={18} />}
    </button>
  );
}

function TextField({ label, type = 'text', value, onChange, placeholder, icon, hint, error, suffix }) {
  return (
    <label className="block">
      {label && <div className="text-[12px] font-semibold text-muted mb-1.5">{label}</div>}
      <div className={`flex items-center h-12 rounded-xl border bg-white px-3 gap-2 transition-shadow focus-within:shadow-[0_0_0_3px_var(--ring)] ${error ? 'border-danger-500' : 'border-token-strong'}`}>
        {icon && <Icon name={icon} size={18} className="text-subtle" />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-[14px] min-w-0"
        />
        {suffix}
      </div>
      {(hint || error) && (
        <div className={`text-[11px] mt-1 ${error ? 'text-danger-600' : 'text-subtle'}`}>{error || hint}</div>
      )}
    </label>
  );
}

window.PhoneFrame = PhoneFrame;
window.StatusBar = StatusBar;
window.BrandMark = BrandMark;
window.WorkerIllustration = WorkerIllustration;
window.PrimaryBtn = PrimaryBtn;
window.TextField = TextField;
