// Main app — sidebar nav, top bar, scrollspy, dark-mode toggle.

const NAV = [
  { id: 'overview',    label: 'Overview',     icon: 'compass' },
  { id: 'colors',      label: 'Color',        icon: 'palette' },
  { id: 'typography',  label: 'Typography',   icon: 'type' },
  { id: 'spacing',     label: 'Spacing',      icon: 'ruler' },
  { id: 'components',  label: 'Components',   icon: 'component' },
  { id: 'responsive',  label: 'Responsive',   icon: 'layout' },
];

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        // pick the first one in view, prefer higher on page
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join('|')]);
  return active;
}

function Sidebar({ active }) {
  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-token h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <nav className="p-4 pt-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle px-3 mb-2">Foundation</div>
        <div className="space-y-0.5">
          {NAV.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link flex items-center gap-2.5 px-3 h-9 rounded-md text-[13px] transition-colors ${active === item.id ? 'active' : ''}`}
            >
              <Icon name={item.icon} size={15} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle px-3 mt-8 mb-2">Reference</div>
        <div className="space-y-0.5 px-3 py-2 text-[12px] text-subtle leading-relaxed">
          <div>v0.1.0 · Foundation</div>
          <div>Updated 19 May 2026</div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
            <span>Approved by Brand & PMO</span>
          </div>
        </div>
      </nav>
    </aside>
  );
}

function TopBar({ dark, setDark }) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-token surface flex items-center px-4 md:px-8">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-brand-500 text-white flex items-center justify-center font-extrabold">N</div>
        <div className="leading-tight">
          <div className="text-[14px] font-bold tracking-tight">SuperApps Nusaraya</div>
          <div className="text-[11px] text-subtle">Design System · Foundation</div>
        </div>
      </div>
      <div className="flex-1" />
      <div className="hidden md:flex items-center gap-2">
        <a href="#components" className="text-[12px] text-muted hover:text-[color:var(--text)] px-3 h-9 rounded-md hover:bg-elev inline-flex items-center">Components</a>
        <a href="#" className="text-[12px] text-muted hover:text-[color:var(--text)] px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5">
          <Icon name="github" size={14} /> Source
        </a>
        <a href="#" className="text-[12px] text-muted hover:text-[color:var(--text)] px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5">
          <Icon name="book-open" size={14} /> Changelog
        </a>
        <div className="w-px h-6 bg-[color:var(--border)] mx-1" />
        <button
          onClick={() => setDark(!dark)}
          className="h-9 w-9 rounded-md border border-token hover:bg-elev flex items-center justify-center"
          aria-label="Toggle dark mode"
        >
          <Icon name={dark ? 'sun' : 'moon'} size={16} />
        </button>
        <span className="ml-2 inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-elev text-[11px] mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          v0.1.0
        </span>
      </div>
      <button
        onClick={() => setDark(!dark)}
        className="md:hidden h-9 w-9 rounded-md border border-token hover:bg-elev flex items-center justify-center"
        aria-label="Toggle dark mode"
      >
        <Icon name={dark ? 'sun' : 'moon'} size={16} />
      </button>
    </header>
  );
}

function OverviewSection() {
  return (
    <section id="overview" className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-token">
      <div className="max-w-5xl">
        <div className="flex items-center gap-2 mb-4">
          <Pill tone="brand">Foundation v0.1.0</Pill>
          <Pill>Mobile · Web · Tablet</Pill>
          <Pill>Bahasa Indonesia 🇮🇩</Pill>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]" style={{ letterSpacing: '-0.03em' }}>
          Design system untuk{' '}
          <span className="text-brand-500 dark:text-brand-300">workforce management</span>{' '}
          industri tambang batubara.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted max-w-3xl leading-relaxed">
          Dibangun untuk pekerja tambang, kontraktor, supervisor, HR, safety officer, dan command center.
          Optimal di Android low-end sampai tablet rugged. Outdoor sampai shift malam.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: 'sun',         label: 'Clarity over decoration', desc: 'Readable di sinar matahari & low-light.' },
            { icon: 'hand',        label: 'Touch-friendly',          desc: 'Min 44pt, ideal 48–56pt untuk sarung tangan.' },
            { icon: 'circle-dot',  label: 'Status-driven',           desc: 'Warna + icon + text untuk setiap state.' },
            { icon: 'cloud-off',   label: 'Offline-aware',           desc: 'Sync indicator selalu visible.' },
          ].map(p => (
            <div key={p.label} className="surface rounded-xl p-4 border-token">
              <Icon name={p.icon} size={18} className="text-brand-500" />
              <div className="mt-3 text-[13px] font-semibold leading-tight">{p.label}</div>
              <div className="text-[12px] text-subtle mt-1 leading-snug">{p.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 surface rounded-xl p-5 border-l-4 border-l-safety-500" style={{ borderLeftColor: '#F39800' }}>
          <div className="flex items-start gap-3">
            <Icon name="shield-alert" size={20} className="text-safety-600 mt-0.5" />
            <div>
              <div className="text-[14px] font-semibold">Safety-first</div>
              <div className="text-[13px] text-muted mt-1">
                SOS button selalu accessible di setiap screen. Aksi emergency punya treatment visual yang berbeda — tidak boleh ada ambiguitas saat kondisi kritis.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-[12px] text-subtle">
          <span>Tech:</span>
          {['React 18','TypeScript','Vite','Tailwind CSS','shadcn/ui','Lucide','Recharts'].map(t => (
            <Code key={t}>{t}</Code>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-[12px] text-subtle">
      <div className="max-w-5xl flex flex-wrap items-center gap-x-6 gap-y-2">
        <div>SuperApps Nusaraya · Design System v0.1.0</div>
        <div className="mono">© 2026 PT Nusaraya Mining</div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          Status: stable
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const active = useScrollSpy(NAV.map(n => n.id));

  // Re-init lucide icons whenever the page (re)renders or dark mode toggles
  useLucideRefresh();
  React.useEffect(() => {
    // small delay so refs paint first
    const t = setTimeout(() => {
      if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } });
    }, 0);
    return () => clearTimeout(t);
  });

  return (
    <div className="min-h-screen">
      <TopBar dark={dark} setDark={setDark} />
      <div className="flex">
        <Sidebar active={active} />
        <main className="flex-1 min-w-0 px-5 md:px-10 lg:px-14">
          <OverviewSection />
          <ColorsSection />
          <TypographySection />
          <SpacingSection />
          <ComponentsSection />
          <ResponsiveSection />
          <Footer />
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
