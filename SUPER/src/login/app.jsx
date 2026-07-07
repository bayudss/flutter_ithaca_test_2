// Main app — tabs to switch between Mobile / Web / Tablet showcases.

const TABS = [
  { id: 'mobile', label: 'Mobile View',  icon: 'smartphone', sub: '7 screens · iPhone frame' },
  { id: 'web',    label: 'Web View',     icon: 'monitor',    sub: 'HR Portal · Desktop' },
  { id: 'tablet', label: 'Tablet View',  icon: 'tablet',     sub: 'Command Center · Live' },
];

function TopBar({ active, setActive }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} ring={false} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">Primacom - SuperApps</div>
            <div className="text-[10px] text-subtle">Login & Onboarding Flow</div>
          </div>
        </a>
        <div className="flex-1" />
        <a href="Design System.html" className="hidden md:inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-[color:var(--text)] h-9 px-3 rounded-md hover:bg-elev">
          <Icon name="arrow-left" size={14} />
          Design System
        </a>
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-elev text-[11px] mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          v1.0
        </div>
      </div>

      {/* Tabs */}
      <nav className="px-4 md:px-8 flex items-end gap-1 border-t border-token bg-white -mt-px">
        {TABS.map(t => (
          <button key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`relative flex items-center gap-2 px-3 h-12 text-[13px] font-semibold transition-colors
                    ${active === t.id ? 'tab-active' : 'text-muted hover:text-[color:var(--text)]'}`}>
            <Icon name={t.icon} size={15} />
            <span>{t.label}</span>
            <span className="hidden md:inline text-[10px] font-normal text-subtle ml-1">· {t.sub}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}

function SectionHeader({ eyebrow, title, description, right }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500 mb-1.5">{eyebrow}</div>}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ letterSpacing: '-0.02em' }}>{title}</h2>
        {description && <p className="mt-1.5 text-[14px] text-muted max-w-2xl">{description}</p>}
      </div>
      {right}
    </div>
  );
}

// ============================== Mobile Tab ==============================
const MOBILE_SCREENS = [
  { id: '1.1', label: '1.1 — Splash',       comp: 'Screen_Splash',      desc: 'Brand reveal · loading' },
  { id: '1.2', label: '1.2 — Welcome',      comp: 'Screen_Welcome',     desc: 'First-time entry · pilih jalur' },
  { id: '1.3', label: '1.3 — Login (SSO)',  comp: 'Screen_Login',       desc: 'Keycloak OIDC embedded' },
  { id: '1.4', label: '1.4 — MFA',          comp: 'Screen_MFA',         desc: 'OTP 6 digit · 60s' },
  { id: '1.5', label: '1.5 — Biometric',    comp: 'Screen_Biometric',   desc: 'Setup Touch / Face ID' },
  { id: '1.6', label: '1.6 — Permissions',  comp: 'Screen_Permissions', desc: 'GPS · Kamera · Notifikasi' },
  { id: '1.7', label: '1.7 — Home',         comp: 'Screen_Home',        desc: 'Dashboard pekerja' },
];

function MobileTab() {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 1 — Mobile"
        title="Login & Onboarding flow — Mobile"
        description="7 screen, dari splash sampai dashboard. Diukur di iPhone 14 (390×844). Bahasa Indonesia · gloved-friendly tap targets · offline-aware."
        right={
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-subtle">
            <Icon name="info" size={14} />
            Scroll horizontal untuk melihat semua screen
          </div>
        }
      />

      {/* Flow strip */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {MOBILE_SCREENS.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#screen-${s.id}`}
               className="inline-flex items-center gap-2 px-3 h-8 rounded-full border border-token bg-white text-[11px] font-semibold whitespace-nowrap hover:bg-elev hover:border-brand-200">
              <span className="mono text-subtle">{s.id}</span>
              {s.label.split('—')[1]}
            </a>
            {i < MOBILE_SCREENS.length - 1 && (
              <Icon name="chevron-right" size={14} className="text-subtle shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Phone grid - horizontal scroll on mobile, wrap on desktop */}
      <div className="flex flex-wrap gap-x-8 gap-y-12 justify-start">
        {MOBILE_SCREENS.map(s => {
          const Comp = window[s.comp];
          return (
            <div key={s.id} id={`screen-${s.id}`} className="flex flex-col items-center scroll-mt-24">
              <PhoneFrame label={s.label} dark={s.id === '1.1' || s.id === '1.7'}>
                <Comp />
              </PhoneFrame>
              <div className="text-[11px] text-subtle mt-1">{s.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Flow notes */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon:'shield-check', title:'Keycloak SSO + MFA', desc:'Embedded WebView ke keycloak.primacom.co.id. MFA wajib untuk role privileged (SPV, HR, SO, Mgmt, Command Center).' },
          { icon:'fingerprint',  title:'Biometric app-lock', desc:'Touch / Face ID setelah first login. Token refresh tetap melalui Keycloak; biometric hanya membuka local session.' },
          { icon:'truck',        title:'Multi-tenant',       desc:'Pekerja organik Primacom & kontraktor (PT KNC, hauling, dll) login lewat realm Keycloak terpisah dengan UI yang sama.' },
        ].map(n => (
          <div key={n.title} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <Icon name={n.icon} size={18} />
            </div>
            <div className="mt-3 text-[13px] font-bold tracking-tight">{n.title}</div>
            <div className="text-[12px] text-muted mt-1 leading-relaxed">{n.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================== Web Tab ==============================
function WebTab() {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 2 — Web"
        title="Login & Dashboard — Web"
        description="Desktop view untuk HR, Admin, Safety Officer, dan Management. Split-screen login dengan kontekstual branding, dashboard 12-col grid."
      />

      <div className="space-y-12">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">2.1</span>
            <h3 className="text-[15px] font-bold tracking-tight">Login page — Web (split screen)</h3>
          </div>
          <BrowserChrome url="https://app.primacom.co.id/login" height={720}>
            <WebLogin />
          </BrowserChrome>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">2.2</span>
            <h3 className="text-[15px] font-bold tracking-tight">HR Dashboard — setelah login</h3>
          </div>
          <BrowserChrome url="https://app.primacom.co.id/hr/dashboard" height={820}>
            <HRDashboard />
          </BrowserChrome>
        </div>
      </div>
    </div>
  );
}

// ============================== Tablet Tab ==============================
function TabletTab() {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 3 — Tablet · Command Center"
        title="Command Center — Live Monitoring"
        description="Dark theme · landscape · 1280×800. Untuk operator command center yang memantau seluruh site secara real-time. Sticky alert bar untuk SOS aktif."
        right={
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-subtle">
            <Icon name="lightbulb" size={14} />
            Klok berjalan real-time
          </div>
        }
      />

      <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#0A0F18]" style={{ aspectRatio: '16/10', maxHeight: 820 }}>
        <CommandCenter />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { icon:'map', title:'Site map', desc:'Pin SOS aktif, alert, shuttle, dan equipment. Topographic style untuk konteks medan tambang.' },
          { icon:'alert-octagon', title:'SOS panel', desc:'Severity (Critical/High), dispatch team, MTTR. Tombol Call + Track satu-tap.' },
          { icon:'bus', title:'Shuttle tracking', desc:'ETA real-time, okupansi, kecepatan, status maintenance.' },
          { icon:'file-check-2', title:'PTW list', desc:'Permit aktif & expiring. Auto-highlight permit yang perlu perpanjangan.' },
        ].map(n => (
          <div key={n.title} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <Icon name={n.icon} size={17} />
            </div>
            <div className="mt-3 text-[13px] font-bold tracking-tight">{n.title}</div>
            <div className="text-[12px] text-muted mt-1 leading-relaxed">{n.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================== App ==============================
function App() {
  // Persist active tab in URL hash so refresh keeps position
  const [active, setActive] = React.useState(() => {
    const h = (window.location.hash || '').replace('#', '');
    return ['mobile','web','tablet'].includes(h) ? h : 'mobile';
  });
  React.useEffect(() => {
    if (active === 'mobile') {
      // Keep deeper anchor hashes for mobile screens working
      if (!window.location.hash.startsWith('#screen-')) {
        window.history.replaceState(null, '', `#${active}`);
      }
    } else {
      window.history.replaceState(null, '', `#${active}`);
    }
  }, [active]);

  // Re-init Lucide icons on every render
  React.useEffect(() => {
    if (window.lucide?.createIcons) {
      window.lucide.createIcons({ attrs: { 'stroke-width': 2 } });
    }
  });

  return (
    <div className="min-h-screen">
      <TopBar active={active} setActive={setActive} />
      {active === 'mobile' && <MobileTab />}
      {active === 'web'    && <WebTab />}
      {active === 'tablet' && <TabletTab />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1600px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>Primacom - SuperApps · Login & Onboarding · v1.0</div>
          <div className="mono">© 2026 PT Primacom</div>
          <div className="ml-auto">Built with React · Tailwind · Lucide</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
