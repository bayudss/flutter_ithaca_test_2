// Dev Reference — main app shell with sticky sidebar + scrollspy.

const NAV = [
  { id: 'overview',    label: 'Overview',          icon: 'compass' },
  { id: 'colors',      label: 'Colors',            icon: 'palette' },
  { id: 'spacing',     label: 'Spacing',           icon: 'ruler' },
  { id: 'components',  label: 'Components',        icon: 'component' },
  { id: 'breakpoints', label: 'Responsive',        icon: 'layout' },
  { id: 'icons',       label: 'Icons',             icon: 'shapes' },
  { id: 'forms',       label: 'Form patterns',     icon: 'clipboard-list' },
  { id: 'a11y',        label: 'Accessibility',     icon: 'accessibility' },
];

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids.join('|')]);
  return active;
}

function Sidebar({ active }) {
  return (
    <aside className="hidden lg:block w-60 shrink-0 border-r border-token h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <nav className="p-4 pt-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle px-3 mb-2">Reference</div>
        <div className="space-y-0.5">
          {NAV.map((item, i) => (
            <a key={item.id} href={`#${item.id}`}
               className={`nav-link flex items-center gap-2.5 px-3 h-9 rounded-md text-[13px] transition-colors ${active === item.id ? 'active' : ''}`}>
              <span className="text-[10px] font-bold mono opacity-50 w-5">{String(i).padStart(2,'0')}</span>
              <Icon name={item.icon} size={15} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle px-3 mt-8 mb-2">Related</div>
        <div className="space-y-0.5">
          {[
            { href:'Design System.html',     label:'Design System', icon:'palette' },
            { href:'Login %26 Onboarding.html', label:'Login flow',   icon:'log-in' },
            { href:'Attendance Module.html', label:'Attendance',    icon:'clock' },
            { href:'ESS Module.html',        label:'ESS',           icon:'briefcase' },
            { href:'Safety Module.html',     label:'Safety',        icon:'shield' },
          ].map(l => (
            <a key={l.label} href={l.href}
               className="nav-link flex items-center gap-2.5 px-3 h-8 rounded-md text-[12px] transition-colors">
              <span className="w-5" />
              <Icon name={l.icon} size={13} />
              <span>{l.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-8 px-3 py-3 rounded-lg bg-elev text-[11px] text-muted leading-relaxed">
          <div className="font-bold text-[color:var(--text)]">Tech stack</div>
          <div className="mt-1 mono text-[10px]">React 18 · Vite · TS · Tailwind · shadcn/ui · Lucide</div>
        </div>
      </nav>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-token bg-white flex items-center px-4 md:px-8">
      <a href="Design System.html" className="flex items-center gap-3">
        <BrandMark size={36} />
        <div className="leading-tight">
          <div className="text-[14px] font-bold tracking-tight">SuperApps Nusaraya</div>
          <div className="text-[11px] text-subtle">Developer Reference · Cheat sheet</div>
        </div>
      </a>
      <div className="flex-1" />
      <div className="hidden md:flex items-center gap-2">
        <a href="#" className="text-[12px] text-muted hover:text-[color:var(--text)] px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5">
          <Icon name="code-2" size={14} /> Repo
        </a>
        <a href="#" className="text-[12px] text-muted hover:text-[color:var(--text)] px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5">
          <Icon name="book-open" size={14} /> Changelog
        </a>
        <button className="h-9 w-9 rounded-md border border-token hover:bg-elev flex items-center justify-center" aria-label="Search">
          <Icon name="search" size={15} />
        </button>
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-elev text-[11px] mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          v1.0
        </div>
      </div>
    </header>
  );
}

function OverviewSection() {
  return (
    <section id="overview" className="pt-12 pb-14">
      <div className="max-w-4xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-brand-50 text-brand-700 text-[11px] font-bold border border-brand-100">
            <Icon name="bookmark" size={11} /> Bookmark page
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-elev text-muted text-[11px] font-semibold border border-token">v1.0 · 19 Mei 2026</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]" style={{ letterSpacing: '-0.03em' }}>
          Developer reference
        </h1>
        <p className="mt-5 text-[16px] md:text-[17px] text-muted max-w-2xl leading-relaxed">
          Cheat sheet untuk developer SuperApps Nusaraya. Token, komponen, pattern, dan icon yang paling sering dipakai — semua dengan <strong>copy button</strong> di setiap code block.
        </p>
        <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { ic:'palette',         l:'Colors',     n:'01' },
            { ic:'ruler',           l:'Spacing',    n:'02' },
            { ic:'component',       l:'Components', n:'03' },
            { ic:'layout',          l:'Responsive', n:'04' },
            { ic:'shapes',          l:'Icons',      n:'05' },
            { ic:'clipboard-list',  l:'Forms',      n:'06' },
            { ic:'accessibility',   l:'A11y',       n:'07' },
            { ic:'check-circle-2',  l:'…ready to ship', n:'✓' },
          ].map(c => (
            <a key={c.l} href={c.n.startsWith('0')?`#${c.l.toLowerCase().replace('a11y','a11y').replace('forms','forms')}`:'#a11y'}
               className="surface rounded-xl p-3.5 hover:border-brand-300 transition-colors">
              <div className="flex items-center justify-between">
                <Icon name={c.ic} size={16} className="text-brand-500" />
                <span className="text-[10px] mono font-bold text-subtle">{c.n}</span>
              </div>
              <div className="mt-2 text-[13px] font-bold">{c.l}</div>
            </a>
          ))}
        </div>

        <div className="mt-7 surface rounded-xl p-4 flex items-start gap-3 border-l-4" style={{ borderLeftColor: '#1F4E79' }}>
          <Icon name="lightbulb" size={18} className="text-brand-500 mt-0.5 shrink-0" />
          <div className="text-[13px] leading-relaxed">
            <div className="font-bold">Cara pakai</div>
            <div className="text-muted mt-0.5">
              Klik <IC>Copy</IC> di pojok kanan atas setiap code block. Paste langsung ke file proyek — semua sudah TypeScript-ready dan compatible dengan shadcn/ui setup.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-[11px] text-subtle border-t border-token mt-6">
      <div className="max-w-4xl flex flex-wrap items-center gap-x-6 gap-y-1">
        <div>SuperApps Nusaraya · Developer Reference · v1.0</div>
        <div className="mono">© 2026 PT Nusaraya Mining</div>
        <div className="ml-auto">React 18 · Vite · TS · Tailwind</div>
      </div>
    </footer>
  );
}

function App() {
  const active = useScrollSpy(NAV.map(n => n.id));

  React.useEffect(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } });
  });

  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="flex">
        <Sidebar active={active} />
        <main className="flex-1 min-w-0 px-5 md:px-10 lg:px-14">
          <OverviewSection />
          <ColorsSection />
          <SpacingSection />
          <ComponentsSection />
          <BreakpointsSection />
          <IconsSection />
          <FormsSection />
          <A11ySection />
          <Footer />
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
