// Main app shell — ESS Module.

const TABS = [
  { id: 'mobile', label: 'Mobile View', icon: 'smartphone', sub: '10 screens · iPhone' },
  { id: 'web',    label: 'Web View',    icon: 'monitor',    sub: 'HR Leave + Profile' },
];

function TopBar({ active, setActive, dark, setDark }) {
  return (
    <header className="sticky top-0 z-40 bg-[color:var(--surface)] border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[10px] text-subtle">ESS Module · PoC #2</div>
          </div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html"      className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design System</a>
          <a href="Login %26 Onboarding.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="log-in" size={13} /> Login</a>
          <a href="Attendance Module.html"  className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="clock" size={13} /> Attendance</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-brand-50 dark:bg-brand-900/40 dark:text-brand-200 text-brand-700 font-semibold"><Icon name="briefcase" size={13} /> ESS</span>
        </nav>
        <button onClick={() => setDark(!dark)} className="h-9 w-9 rounded-md border border-token hover:bg-elev flex items-center justify-center" aria-label="Toggle dark mode">
          <Icon name={dark ? 'sun' : 'moon'} size={15} />
        </button>
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-elev text-[11px] mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          v1.0
        </div>
      </div>
      <nav className="px-4 md:px-8 flex items-end gap-1 border-t border-token bg-[color:var(--surface)] -mt-px">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
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
    <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
      <div>
        {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500 dark:text-brand-300 mb-1.5">{eyebrow}</div>}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ letterSpacing: '-0.02em' }}>{title}</h2>
        {description && <p className="mt-1.5 text-[14px] text-muted max-w-2xl">{description}</p>}
      </div>
      {right}
    </div>
  );
}

// ============================================================
// Mobile Tab
// ============================================================
function MobileTab() {
  const [salaryRevealed, setSalaryRevealed] = React.useState(false);

  const screens = [
    { id:'B1', label:'B1 — ESS Home',          sub:'Hub layanan + saldo cuti',
      anno:{ lab:'Toggle interaktif', text:'Tap "Tampilkan" untuk reveal salary di B1 & B2 sekaligus.' },
      render: () => <Screen_ESSHome salaryRevealed={salaryRevealed} setSalaryRevealed={setSalaryRevealed} /> },
    { id:'B2', label:'B2 — Payslip List',      sub:'12 bulan · YTD chip',
      anno:{ lab:'Privacy', text:'Net salary di-blur per default. Toggle global dengan icon eye di header.' },
      render: () => <Screen_PayslipList salaryRevealed={salaryRevealed} setSalaryRevealed={setSalaryRevealed} /> },
    { id:'B3', label:'B3 — Payslip Detail',    sub:'Pendapatan · Potongan · Net',
      anno:{ lab:'Net pay prominent', text:'Take Home Pay card hijau besar dengan info transfer.' },
      render: () => <Screen_PayslipDetail /> },
    { id:'B4', label:'B4 — Leave Form',        sub:'Step 1 · Detail',
      anno:{ lab:'Saldo visual', text:'Progress bar saldo + mini calendar preview dengan weekend di-strikethrough.' },
      render: () => <Screen_LeaveForm /> },
    { id:'B5', label:'B5 — Approval Preview',  sub:'Step 2 · Approval flow',
      anno:{ lab:'Approval chain', text:'Visualisasi who-approves-what dengan timeline vertical.' },
      render: () => <Screen_ApprovalPreview /> },
    { id:'B6', label:'B6 — Confirmation',      sub:'Step 3 · Success animation',
      anno:{ lab:'Submission ID', text:'Generate ID otomatis. Status awal "Pending SPV".' },
      render: () => <Screen_LeaveConfirm /> },
    { id:'B7', label:'B7 — Leave Status',      sub:'Filter · timeline mini',
      anno:{ lab:'Filter interaktif', text:'Tap Semua/Pending/Approved/Rejected — list update otomatis dengan counter.' },
      render: () => <Screen_LeaveStatus /> },
    { id:'B8', label:'B8 — Approval Inbox SPV',sub:'Filter · swipe hints',
      anno:{ lab:'Swipe action', text:'Latar hijau/merah di balik card menunjukkan affordance swipe approve/reject.' },
      render: () => <Screen_ApprovalInboxSPV /> },
    { id:'B9', label:'B9 — Approval Detail',   sub:'Konteks + komen reject',
      anno:{ lab:'Stateful', text:'Tap "Tolak" buka textarea wajib. Tap lagi untuk konfirmasi. Setujui = primary CTA.' },
      render: () => <Screen_ApprovalDetail /> },
    { id:'B10',label:'B10 — Profile',          sub:'Tabs · validation · CRUD',
      anno:{ lab:'Form validation', text:'Email invalid → border merah + helper text. Button "Simpan" disabled selama ada error.' },
      render: () => <Screen_Profile /> },
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 1 — Mobile"
        title="ESS — Mobile flow"
        description="10 screen mulai dari home ESS, lihat payslip dengan privacy blur, request cuti 3-step dengan calendar picker, approval inbox SPV, hingga profile management dengan validation."
        right={
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-subtle">
            <Icon name="mouse-pointer-click" size={14} /> B1, B2, B7, B10 interaktif
          </div>
        }
      />

      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {screens.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#scr-${s.id}`}
               className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-token bg-[color:var(--surface)] text-[11px] font-semibold whitespace-nowrap hover:border-brand-300">
              <span className="mono text-subtle">{s.id}</span>
              {s.label.split('—')[1]}
            </a>
            {i < screens.length - 1 && <Icon name="chevron-right" size={12} className="text-subtle shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid gap-x-[260px] gap-y-14" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, max-content))' }}>
        {screens.map(s => (
          <div key={s.id} id={`scr-${s.id}`} className="scroll-mt-32">
            <PhoneFrame label={s.label} sub={s.sub} anno={s.anno}>
              {s.render()}
            </PhoneFrame>
          </div>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl">
        {[
          { icon:'tree-palm',  title:'Leave workflow',  desc:'3-step submission · approval chain SPV → HR · cuti tahunan / sakit / khusus / unpaid · saldo visual.' },
          { icon:'receipt',    title:'Payslip privacy', desc:'Net salary blur per default. Reveal via toggle. PDF download password-protected dengan tanggal lahir.' },
          { icon:'inbox',      title:'Approval inbox',  desc:'SPV view 5 kind (Cuti/Klaim/Lembur/Koreksi). Swipe action + bulk + detail dengan context (saldo, attendance).' },
          { icon:'user-cog',   title:'Self-service',    desc:'Profile dengan field editable & read-only. Validation real-time. Audit log untuk perubahan yang dilakukan HR.' },
        ].map(n => (
          <div key={n.title} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-200 flex items-center justify-center">
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

// ============================================================
// Web Tab
// ============================================================
function WebTab() {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 2 — Web · HR"
        title="ESS — Web flow"
        description="HR Leave Management Dashboard dan Employee Profile master view. 87 pengajuan bulan ini, calendar Gantt 14 hari, dan 7-tab profile detail."
      />

      <div className="space-y-12">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W4</span>
            <h3 className="text-[15px] font-bold tracking-tight">HR Leave Management Dashboard</h3>
            <span className="text-[11px] text-subtle">— filter · KPI · Gantt · table inline approve/reject</span>
          </div>
          <BrowserChrome url="https://app.nusaraya.id/hr/leave" height={900}>
            <W4_LeaveDashboard />
          </BrowserChrome>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W5</span>
            <h3 className="text-[15px] font-bold tracking-tight">Employee Profile · HR perspective</h3>
            <span className="text-[11px] text-subtle">— 7 tab · audit log · export PDF · klik tab untuk navigasi</span>
          </div>
          <BrowserChrome url="https://app.nusaraya.id/hr/karyawan/NSR-009281" height={900}>
            <W5_EmployeeProfile />
          </BrowserChrome>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon:'calendar-range', title:'Calendar Gantt', desc:'14-hari forecast siapa cuti kapan, dengan visual conflict warning saat banyak overlap. Color-coded per jenis cuti.' },
          { icon:'columns-3',      title:'Master profile',  desc:'7 tab terpisah: Personal, Employment, Compensation, Leave History, Attendance, Performance, Documents. Restricted access per role.' },
          { icon:'history',        title:'Audit log',       desc:'Setiap edit HR tercatat (siapa, apa, kapan) untuk compliance. Export PDF tersedia.' },
        ].map(n => (
          <div key={n.title} className="surface rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-200 flex items-center justify-center">
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

function App() {
  const [active, setActive] = React.useState(() => {
    const h = (window.location.hash || '').replace('#','');
    return h === 'web' || h === 'mobile' ? h : 'mobile';
  });
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  React.useEffect(() => {
    if (!window.location.hash.startsWith('#scr-')) {
      window.history.replaceState(null, '', `#${active}`);
    }
  }, [active]);

  React.useEffect(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } });
  });

  return (
    <div className="min-h-screen">
      <TopBar active={active} setActive={setActive} dark={dark} setDark={setDark} />
      {active === 'mobile' && <MobileTab />}
      {active === 'web'    && <WebTab />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1600px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · ESS Module · PoC #2</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">React · Tailwind · Lucide · shadcn/ui</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
