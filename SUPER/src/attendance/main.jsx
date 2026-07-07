// App shell — tabs (Mobile / Web) and screen index for Attendance Module.

const TABS = [
  { id: 'mobile', label: 'Mobile View', icon: 'smartphone', sub: '9 screens · iPhone' },
  { id: 'web',    label: 'Web View',    icon: 'monitor',    sub: 'HR Admin + SPV' },
];

function TopBar({ active, setActive }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div>
            <div className="text-[10px] text-subtle">Attendance Module · PoC #1</div>
          </div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html"      className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design System</a>
          <a href="Login %26 Onboarding.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="log-in" size={13} /> Login</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 font-semibold"><Icon name="clock" size={13} /> Attendance</span>
        </nav>
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-elev text-[11px] mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          v1.0
        </div>
      </div>
      <nav className="px-4 md:px-8 flex items-end gap-1 border-t border-token bg-white -mt-px">
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
        {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500 mb-1.5">{eyebrow}</div>}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ letterSpacing: '-0.02em' }}>{title}</h2>
        {description && <p className="mt-1.5 text-[14px] text-muted max-w-2xl">{description}</p>}
      </div>
      {right}
    </div>
  );
}

// ===================== Mobile Tab =====================
function MobileTab() {
  const [clockedIn, setClockedIn] = React.useState(false);

  // Each entry: render function. We pass interactive state to Home only.
  const screens = [
    { id:'A1', label:'A1 — Home',        sub: clockedIn ? 'State: sudah clock-in' : 'State: belum clock-in', dark: true,
      anno: { lab: 'Toggle interaktif', text: 'Tap tombol Clock In / Out untuk lihat dua state. Design mengikuti home dashboard 1.7 (Login module).' },
      render: () => <Screen_Home clockedIn={clockedIn} setClockedIn={setClockedIn} />
    },
    { id:'A2', label:'A2 — Pilih metode',sub:'QR / RFID / GPS',
      anno: { lab:'Geofence guard', text:'Verifikasi 100m radius sebelum user dapat pilih metode. GPS = fallback.' },
      render: () => <Screen_Method /> },
    { id:'A2b', label:'A2b — Di luar geofence', sub:'Error state · 460m dari titik',
      anno: { lab:'Error state', text:'User di luar radius 100m. Opsi: perbarui lokasi, clock-in manual (via koreksi), atau hubungi SPV.' },
      render: () => <Screen_Geofence /> },
    { id:'A3', label:'A3 — QR Scanner', sub:'Full screen camera · GPS valid', dark: true,
      anno: { lab:'Scanner', text:'Frame korner aktif + scan line. GPS banner hijau = geofence valid.' },
      render: () => <Screen_Scanner /> },
    { id:'A4', label:'A4 — Success',     sub:'Detail clock-in lengkap',
      anno: { lab:'Animated check', text:'Ring expand + scale pop saat berhasil. Detail card tunjukkan method & lokasi.' },
      render: () => <Screen_Success offline={false} /> },
    { id:'A5', label:'A5 — Offline Success', sub:'Banner kuning · antrian sync',
      anno: { lab:'Offline-first', text:'Sama dengan A4, tapi banner offline + counter "3 antri".' },
      render: () => <Screen_Success offline={true} /> },
    { id:'A6', label:'A6 — Riwayat', sub:'Calendar heatmap 30 hari',
      anno: { lab:'Status by color', text:'Hijau on-time · kuning telat · merah absent · biru cuti · abu libur.' },
      render: () => <Screen_Riwayat /> },
    { id:'A7', label:'A7 — Detail', sub:'Bottom sheet dari kalender',
      anno: { lab:'Detail per hari', text:'Tap tanggal di A6 buka sheet ini. Stats clock-in/out + entries.' },
      render: () => <Screen_Detail /> },
    { id:'A8', label:'A8 — Koreksi', sub:'Form pengajuan',
      anno: { lab:'Form lengkap', text:'Jenis koreksi · tanggal · waktu · alasan · bukti foto · supervisor.' },
      render: () => <Screen_Correction /> },
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 1 — Mobile"
        title="Attendance — Mobile flow"
        description="9 screen dari home, clock-in dengan 3 method (QR/RFID/GPS), geofence 100m + error state di luar radius, offline-first sync, riwayat heatmap, hingga koreksi request."
        right={
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-subtle">
            <Icon name="mouse-pointer-click" size={14} /> A1 interaktif — toggle Clock In / Out
          </div>
        }
      />

      {/* Flow strip */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {screens.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#scr-${s.id}`}
               className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-token bg-white text-[11px] font-semibold whitespace-nowrap hover:bg-elev hover:border-brand-200">
              <span className="mono text-subtle">{s.id}</span>
              {s.label.split('—')[1]}
            </a>
            {i < screens.length - 1 && <Icon name="chevron-right" size={12} className="text-subtle shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      {/* Grid - vertical wrap, leave room for right-side annotations */}
      <div className="grid gap-x-[260px] gap-y-14" style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(390px, max-content))',
      }}>
        {screens.map(s => (
          <div key={s.id} id={`scr-${s.id}`} className="scroll-mt-32">
            <PhoneFrame label={s.label} sub={s.sub} dark={s.dark} anno={s.anno}>
              {s.render()}
            </PhoneFrame>
          </div>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon:'qr-code',  title:'Multi-method', desc:'QR Code (primary), RFID (kartu ID), GPS-only (fallback). Phase 2: Face Recognition di lokasi tanpa pos jaga.' },
          { icon:'map-pin',  title:'Geofence 100m', desc:'Validasi koordinat sebelum scan QR. Toleransi akurasi GPS ±10m otomatis disesuaikan.' },
          { icon:'cloud-off',title:'Offline-first', desc:'Data clock-in tersimpan lokal SQLite. Sync otomatis saat reconnect dengan idempotency key.' },
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

// ===================== Web Tab =====================
function WebTab() {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [drawerRow, setDrawerRow] = React.useState({ name:'Budi Santoso', nik:'NSR-009281', dept:'Mining Ops' });

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader
        eyebrow="Tab 2 — Web · HR Admin & SPV"
        title="Attendance — Web flow"
        description="Untuk HR dan supervisor. Live monitoring 2,547 karyawan, drawer detail dengan heatmap 90 hari, dan approval inbox dengan bulk action."
      />

      <div className="space-y-12">
        {/* W1 */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W1</span>
            <h3 className="text-[15px] font-bold tracking-tight">HR Attendance Dashboard — Live</h3>
            <span className="text-[11px] text-subtle">— klik baris untuk buka drawer W2</span>
          </div>
          <BrowserChrome url="https://app.nusaraya.id/hr/attendance" height={820}>
            <div className="relative h-full">
              <HRDashboard onPickRow={(r) => { setDrawerRow(r); setDrawerOpen(true); }} />
              {drawerOpen && <DetailDrawer row={drawerRow} onClose={() => setDrawerOpen(false)} />}
            </div>
          </BrowserChrome>
          <div className="mt-2 text-[11px] text-subtle">
            {drawerOpen
              ? <>Drawer terbuka untuk <span className="font-semibold">{drawerRow.name}</span> — klik area gelap atau ✕ untuk tutup, lalu klik baris lain untuk lihat detail karyawan tersebut.</>
              : <>Drawer tertutup. Klik baris karyawan untuk membuka detail (W2).</>}
          </div>
        </div>

        {/* W3 */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W3</span>
            <h3 className="text-[15px] font-bold tracking-tight">Supervisor Approval Inbox</h3>
            <span className="text-[11px] text-subtle">— bulk select + approve/reject inline</span>
          </div>
          <BrowserChrome url="https://app.nusaraya.id/spv/inbox" height={820}>
            <ApprovalInbox />
          </BrowserChrome>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon:'filter',         title:'Filter komprehensif',  desc:'Tanggal range, department, lokasi, shift, kontraktor. Saved filter untuk monitoring rutin.' },
          { icon:'sidebar',        title:'Drawer detail',         desc:'Klik baris → drawer kanan dengan 4 tab: Profile, Attendance (90-day heatmap), Leave, Performance.' },
          { icon:'check-check',    title:'Bulk approval',         desc:'SPV bisa pilih banyak request sekaligus. Setiap aksi punya audit trail untuk compliance.' },
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

// ===================== App =====================
function App() {
  const [active, setActive] = React.useState(() => {
    const h = (window.location.hash || '').replace('#','');
    return h === 'web' || h === 'mobile' ? h : 'mobile';
  });
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
      <TopBar active={active} setActive={setActive} />
      {active === 'mobile' && <MobileTab />}
      {active === 'web'    && <WebTab />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1600px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · Attendance Module · PoC #1</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">React · Tailwind · Lucide · shadcn/ui</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
