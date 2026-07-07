// Components showcase.

// =========================== Demo wrapper ===========================
function Demo({ title, hint, children, dark, full }) {
  return (
    <div>
      {(title || hint) && (
        <div className="mb-3">
          {title && <div className="text-[13px] font-semibold">{title}</div>}
          {hint && <div className="text-[12px] text-subtle mt-0.5">{hint}</div>}
        </div>
      )}
      <div
        className={`rounded-xl border border-token p-6 ${full ? '' : 'flex flex-wrap items-center gap-3'}`}
        style={{ background: dark ? '#0f273e' : 'var(--bg-elev)' }}
      >
        {children}
      </div>
    </div>
  );
}

// =========================== Buttons ===========================
function Btn({ variant='primary', size='md', icon, iconRight, children, disabled, danger, full }) {
  const sizes = {
    sm: 'h-9 px-3 text-[13px] gap-1.5',
    md: 'h-11 px-4 text-[14px] gap-2',
    lg: 'h-14 px-6 text-[15px] gap-2.5',
  };
  const base = `inline-flex items-center justify-center font-semibold rounded-lg transition-all focus-ring select-none ${sizes[size]} ${full ? 'w-full' : ''}`;
  const variants = {
    primary:   'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm',
    secondary: 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50 dark:bg-transparent dark:text-brand-200 dark:border-brand-700 dark:hover:bg-brand-900/30',
    ghost:     'text-[color:var(--text)] hover:bg-[color:var(--bg-elev)]',
    danger:    'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 shadow-sm',
    safety:    'bg-safety-500 text-white hover:bg-safety-600 active:bg-safety-700 shadow-sm',
  };
  const cls = `${base} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`;
  return (
    <button className={cls} disabled={disabled}>
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 16} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 20 : 16} />}
    </button>
  );
}

function ButtonsBlock() {
  return (
    <Subsection title="Buttons" hint="Tinggi 44pt minimum (size md = 44px). Primary di brand blue, danger merah, safety orange untuk peringatan & confirm hazard.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Demo title="Variants" hint="Primary / Secondary / Ghost / Danger / Safety">
          <Btn variant="primary" icon="check">Approve</Btn>
          <Btn variant="secondary" icon="download">Export</Btn>
          <Btn variant="ghost">Cancel</Btn>
          <Btn variant="danger" icon="x">Reject</Btn>
          <Btn variant="safety" icon="alert-triangle">Hazard</Btn>
        </Demo>
        <Demo title="Sizes" hint="sm 36 / md 44 / lg 56">
          <Btn variant="primary" size="sm">Small</Btn>
          <Btn variant="primary" size="md">Medium</Btn>
          <Btn variant="primary" size="lg" icon="shield-check">Large · Gloved-friendly</Btn>
        </Demo>
        <Demo title="With icons" hint="Icon kiri untuk aksi, kanan untuk arah.">
          <Btn variant="secondary" icon="filter">Filter</Btn>
          <Btn variant="primary" iconRight="arrow-right">Next Step</Btn>
          <Btn variant="ghost" icon="more-horizontal">More</Btn>
        </Demo>
        <Demo title="States" hint="Disabled, loading, full width">
          <Btn variant="primary" disabled>Disabled</Btn>
          <button className="inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-brand-500 text-white font-semibold text-[14px]">
            <Icon name="loader-2" size={16} className="spinner" />
            Submitting…
          </button>
          <div className="w-full"><Btn variant="primary" full icon="log-in">Sign in dengan NIK</Btn></div>
        </Demo>
      </div>
    </Subsection>
  );
}

// =========================== Inputs ===========================
function Input({ label, type='text', value, placeholder, hint, error, icon, suffix, disabled }) {
  const [v, setV] = React.useState(value || '');
  return (
    <label className="block">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">{label}</div>
      <div className={`flex items-center h-11 rounded-lg border bg-[color:var(--surface)] px-3 gap-2 transition-shadow focus-within:shadow-[0_0_0_3px_var(--ring)]
        ${error ? 'border-danger-500' : 'border-token-strong'}
        ${disabled ? 'opacity-50' : ''}`}>
        {icon && <Icon name={icon} size={16} className="text-subtle" />}
        <input
          type={type}
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-[14px]"
        />
        {suffix && <span className="text-[12px] text-subtle mono">{suffix}</span>}
      </div>
      {(hint || error) && (
        <div className={`text-[11px] mt-1 ${error ? 'text-danger-600' : 'text-subtle'}`}>
          {error || hint}
        </div>
      )}
    </label>
  );
}

function InputsBlock() {
  return (
    <Subsection title="Input fields" hint="Tinggi field 44pt, label uppercase tipis, error state merah dengan helper text.">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Input label="NIK Pekerja" placeholder="NSR-000000" icon="user" hint="Format: NSR diikuti 6 digit" />
          <Input label="Tonase Muatan" type="number" placeholder="0" suffix="ton" icon="weight" />
          <Input label="Password" type="password" value="••••••••" icon="lock" />
          <Input label="Cari pekerja" type="search" placeholder="Nama, NIK, atau divisi…" icon="search" />
          <Input label="Email" value="supir.invalid" icon="mail" error="Format email tidak valid" />
          <Input label="Site (read-only)" value="Bukit Sangatta — Pit B" icon="map-pin" disabled />
        </div>
      </Card>
    </Subsection>
  );
}

// =========================== Badges ===========================
function Badge({ tone, icon, children, soft=true }) {
  const tones = {
    pending:  { c:'warning', icon:'clock' },
    approved: { c:'success', icon:'check-circle-2' },
    rejected: { c:'danger',  icon:'x-circle' },
    active:   { c:'info',    icon:'activity' },
    expired:  { c:'gray',    icon:'calendar-x' },
    draft:    { c:'gray',    icon:'file' },
  };
  const map = {
    success: soft ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500 border-success-500/20' : 'bg-success-500 text-white',
    warning: soft ? 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500 border-warning-500/25' : 'bg-warning-500 text-white',
    danger:  soft ? 'bg-danger-50 text-danger-700 dark:bg-danger-500/15 dark:text-danger-500 border-danger-500/20'      : 'bg-danger-500 text-white',
    info:    soft ? 'bg-info-50 text-info-700 dark:bg-info-500/15 dark:text-info-500 border-info-500/20'                 : 'bg-info-500 text-white',
    gray:    soft ? 'bg-elev text-muted border-token' : 'bg-gray-500 text-white',
  };
  const conf = tones[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[12px] font-semibold border ${map[conf.c]}`}>
      <Icon name={icon || conf.icon} size={13} />
      {children}
    </span>
  );
}

function BadgesBlock() {
  return (
    <Subsection title="Status badges" hint="Selalu pasangan warna + icon + text. Buta warna safe.">
      <Demo>
        <Badge tone="pending">Pending Approval</Badge>
        <Badge tone="approved">Approved</Badge>
        <Badge tone="rejected">Rejected</Badge>
        <Badge tone="active">In Progress</Badge>
        <Badge tone="expired">Expired</Badge>
        <Badge tone="draft">Draft</Badge>
      </Demo>
    </Subsection>
  );
}

// =========================== Cards ===========================
function CardsBlock() {
  return (
    <Subsection title="Cards" hint="Basic, with header, interactive (hover/press).">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-wider text-subtle">Tonase Hari Ini</div>
          <div className="mt-2 text-[32px] font-bold tracking-tight mono">12,847<span className="text-base text-muted font-normal ml-1">t</span></div>
          <div className="mt-1 text-[12px] text-success-600 font-medium flex items-center gap-1">
            <Icon name="trending-up" size={12} /> +4.2% vs kemarin
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="px-5 py-3 border-b border-token flex items-center justify-between">
            <div className="text-[13px] font-semibold">Pre-Shift Briefing</div>
            <Badge tone="active">Berjalan</Badge>
          </div>
          <div className="p-5">
            <div className="text-[14px]">Pit B — 47 dari 52 pekerja sudah check-in.</div>
            <div className="mt-3 h-1.5 rounded-full bg-elev overflow-hidden">
              <div className="h-full bg-brand-500" style={{ width: '90%' }} />
            </div>
            <div className="mt-2 text-[11px] text-subtle mono">90% · 5 belum hadir</div>
          </div>
        </Card>

        <button className="text-left rounded-xl border border-token-strong p-5 surface hover:shadow-md hover:-translate-y-0.5 transition-all focus-ring">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-safety-50 dark:bg-safety-500/15 flex items-center justify-center text-safety-600 dark:text-safety-500">
              <Icon name="alert-triangle" size={20} />
            </div>
            <Icon name="arrow-up-right" size={16} className="text-subtle" />
          </div>
          <div className="mt-4 text-[15px] font-semibold">Lapor Unsafe Condition</div>
          <div className="text-[12px] text-muted mt-1">Tap untuk submit temuan di area kerja.</div>
        </button>
      </div>
    </Subsection>
  );
}

// =========================== List items ===========================
function ListItemsBlock() {
  return (
    <Subsection title="List items" hint="Basic, with avatar, with action. Tinggi minimum 56px untuk gloved hands.">
      <Card className="overflow-hidden">
        <div className="divide-y divide-[color:var(--border)]">
          {/* basic */}
          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-[14px] font-medium">Form Inspeksi Harian</div>
              <div className="text-[12px] text-subtle">Equipment HD785-7 · 06:42</div>
            </div>
            <Icon name="chevron-right" size={18} className="text-subtle" />
          </div>

          {/* with avatar */}
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold">BS</div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium truncate">Budi Santoso</div>
              <div className="text-[12px] text-subtle truncate">Operator Excavator · Shift Pagi · NSR-009281</div>
            </div>
            <Badge tone="approved">On-shift</Badge>
          </div>

          {/* with multiple metadata */}
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-safety-500 text-white flex items-center justify-center font-bold">SR</div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium truncate">Siti Rahayu</div>
              <div className="text-[12px] text-subtle truncate">Permohonan izin sakit · 2 hari</div>
            </div>
            <Badge tone="pending">Pending</Badge>
          </div>

          {/* with action */}
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-danger-50 dark:bg-danger-500/15 text-danger-600 dark:text-danger-500 flex items-center justify-center">
              <Icon name="wrench" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium">DT-204 Maintenance Overdue</div>
              <div className="text-[12px] text-subtle">Service interval terlewat 412 jam · Pit C</div>
            </div>
            <Btn variant="secondary" size="sm">Tindak</Btn>
          </div>
        </div>
      </Card>
    </Subsection>
  );
}

// =========================== Top app bar ===========================
function TopBarBlock() {
  return (
    <Subsection title="Top app bar" hint="Mobile dengan back + title + actions. Web dengan logo + nav + utilities.">
      <div className="space-y-4">
        {/* Mobile */}
        <div>
          <div className="text-[11px] text-subtle mb-2 mono">MOBILE · 360pt</div>
          <div className="rounded-xl border border-token overflow-hidden bg-elev p-4 flex justify-center">
            <div className="w-[360px] rounded-[28px] overflow-hidden border border-token-strong shadow-lg bg-white dark:bg-[#141821]">
              <div className="bg-brand-500 text-white px-4 h-14 flex items-center gap-3">
                <Icon name="arrow-left" size={22} />
                <div className="flex-1">
                  <div className="text-[15px] font-semibold leading-tight">Approval Center</div>
                  <div className="text-[11px] opacity-80 leading-tight">12 pending</div>
                </div>
                <Icon name="bell" size={20} />
                <Icon name="more-vertical" size={20} />
              </div>
              <div className="h-20 flex items-center justify-center text-subtle text-[12px]">— content —</div>
            </div>
          </div>
        </div>
        {/* Web */}
        <div>
          <div className="text-[11px] text-subtle mb-2 mono">WEB · ≥ 1024px</div>
          <div className="rounded-xl border border-token overflow-hidden">
            <div className="bg-white dark:bg-[#141821] border-b border-token h-16 flex items-center px-6 gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-extrabold text-[13px]">N</div>
                <div className="font-bold tracking-tight">Nusaraya</div>
              </div>
              <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium">
                {['Dashboard', 'Approvals', 'Workforce', 'Safety', 'Reports'].map((n,i) => (
                  <a key={n} className={`px-3 py-2 rounded-md ${i===1 ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200' : 'text-muted hover:text-[color:var(--text)]'}`}>{n}</a>
                ))}
              </nav>
              <div className="flex-1" />
              <div className="hidden md:flex items-center gap-2 text-[12px] text-subtle bg-elev rounded-md px-3 h-9">
                <Icon name="search" size={14} />
                <span>Cari NIK, equipment…</span>
                <Code className="ml-3">⌘K</Code>
              </div>
              <button className="relative w-10 h-10 rounded-md hover:bg-elev flex items-center justify-center">
                <Icon name="bell" size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center text-[12px] font-bold">AW</div>
            </div>
            <div className="h-16 flex items-center justify-center text-subtle text-[12px]">— content —</div>
          </div>
        </div>
      </div>
    </Subsection>
  );
}

// =========================== Bottom nav ===========================
function BottomNavBlock() {
  const [active, setActive] = React.useState(2);
  const tabs = [
    { name: 'Home',     icon: 'home' },
    { name: 'Approvals',icon: 'inbox' },
    { name: 'Lapor',    icon: 'plus-circle', big: true },
    { name: 'Shift',    icon: 'calendar' },
    { name: 'Akun',     icon: 'user' },
  ];
  return (
    <Subsection title="Bottom navigation" hint="5 tab, tengah lebih prominent untuk aksi cepat (lapor temuan).">
      <div className="rounded-xl border border-token overflow-hidden bg-elev p-4 flex justify-center">
        <div className="w-[360px] rounded-[28px] overflow-hidden border border-token-strong shadow-lg bg-white dark:bg-[#141821]">
          <div className="h-44 flex items-center justify-center text-subtle text-[12px]">— content —</div>
          <div className="border-t border-token grid grid-cols-5 bg-white dark:bg-[#141821]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            {tabs.map((t, i) => {
              const isActive = i === active;
              if (t.big) {
                return (
                  <button key={t.name} onClick={() => setActive(i)} className="flex items-center justify-center pt-1">
                    <div className="w-14 h-14 -mt-7 rounded-full bg-safety-500 text-white shadow-lg flex items-center justify-center ring-4 ring-[color:var(--surface)]">
                      <Icon name={t.icon} size={26} />
                    </div>
                  </button>
                );
              }
              return (
                <button key={t.name} onClick={() => setActive(i)} className="flex flex-col items-center justify-center gap-1 py-2.5">
                  <Icon name={t.icon} size={22} className={isActive ? 'text-brand-500' : 'text-subtle'} />
                  <span className={`text-[10px] font-semibold ${isActive ? 'text-brand-500' : 'text-subtle'}`}>{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Subsection>
  );
}

// =========================== Modal ===========================
function ModalBlock() {
  const [open, setOpen] = React.useState(true);
  return (
    <Subsection title="Modal / dialog" hint="Centered overlay, max 480px. Tombol primer di kanan, cancel di kiri.">
      <div className="rounded-xl border border-token bg-elev p-6 relative overflow-hidden" style={{ minHeight: 360 }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="surface rounded-2xl w-full max-w-[440px] overflow-hidden" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
            <div className="p-6">
              <div className="w-10 h-10 rounded-full bg-danger-50 dark:bg-danger-500/15 text-danger-600 dark:text-danger-500 flex items-center justify-center mb-4">
                <Icon name="alert-octagon" size={22} />
              </div>
              <div className="text-[18px] font-bold tracking-tight">Tolak permohonan izin?</div>
              <div className="mt-2 text-[14px] text-muted">
                Siti Rahayu (NSR-009281) — izin sakit 2 hari. Pekerja akan menerima notifikasi penolakan beserta alasan yang Anda berikan.
              </div>
              <div className="mt-5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Alasan penolakan</label>
                <textarea rows="3" className="mt-1.5 w-full bg-[color:var(--surface)] border border-token-strong rounded-lg px-3 py-2 text-[14px] outline-none focus-ring resize-none" placeholder="Wajib diisi…" />
              </div>
            </div>
            <div className="px-6 py-4 bg-elev flex items-center justify-end gap-2 border-t border-token">
              <Btn variant="ghost">Batal</Btn>
              <Btn variant="danger" icon="x">Tolak Permohonan</Btn>
            </div>
          </div>
        </div>
      </div>
    </Subsection>
  );
}

// =========================== Toasts ===========================
function ToastsBlock() {
  const toasts = [
    { tone: 'success', icon: 'check-circle-2', title: 'Approval terkirim',          msg: 'Permohonan lembur Budi S. telah disetujui.' },
    { tone: 'danger',  icon: 'alert-octagon',   title: 'Sinkronisasi gagal',         msg: 'Periksa koneksi. Data tersimpan offline.' },
    { tone: 'warning', icon: 'alert-triangle',  title: 'SIO operator hampir habis',  msg: 'Berlaku sampai 23 Mei 2026. Perpanjang sekarang?' },
  ];
  const map = {
    success: 'bg-success-500',
    danger:  'bg-danger-500',
    warning: 'bg-warning-500',
  };
  return (
    <Subsection title="Toast notifications" hint="Muncul di atas, dismiss otomatis 4s, atau persistent untuk error sinkronisasi.">
      <div className="space-y-3">
        {toasts.map(t => (
          <div key={t.title} className="toast-in flex items-start gap-3 surface border border-token-strong rounded-xl pl-4 pr-3 py-3 shadow-md max-w-2xl">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white ${map[t.tone]}`}>
              <Icon name={t.icon} size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold">{t.title}</div>
              <div className="text-[12px] text-muted">{t.msg}</div>
            </div>
            <button className="text-subtle hover:text-[color:var(--text)] w-8 h-8 rounded-md flex items-center justify-center">
              <Icon name="x" size={16} />
            </button>
          </div>
        ))}
      </div>
    </Subsection>
  );
}

// =========================== Loading ===========================
function LoadingBlock() {
  return (
    <Subsection title="Loading states" hint="Skeleton untuk konten, spinner untuk aksi singkat.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-wider text-subtle mb-3">Skeleton</div>
          <div className="flex items-center gap-3">
            <div className="skeleton w-11 h-11 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-3 w-2/3" />
              <div className="skeleton h-2.5 w-1/2" />
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-5/6" />
            <div className="skeleton h-3 w-3/4" />
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-wider text-subtle mb-3">Spinner</div>
          <div className="flex items-center gap-6">
            <Icon name="loader-2" size={20} className="spinner text-brand-500" />
            <Icon name="loader-2" size={28} className="spinner text-brand-500" />
            <Icon name="loader-2" size={40} className="spinner text-brand-500" />
            <div className="text-[12px] text-subtle">Sinkronisasi data offline…</div>
          </div>
          <div className="mt-6">
            <div className="text-[12px] text-subtle mb-2 mono">Progress · 64%</div>
            <div className="h-2 bg-elev rounded-full overflow-hidden">
              <div className="h-full bg-brand-500" style={{ width: '64%' }} />
            </div>
          </div>
        </Card>
      </div>
    </Subsection>
  );
}

// =========================== Empty states ===========================
function EmptyBlock() {
  return (
    <Subsection title="Empty states" hint="Selalu kasih next action — bukan cuma 'tidak ada data'.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-8 text-center pattern-dots">
          <div className="w-16 h-16 mx-auto rounded-2xl surface flex items-center justify-center text-brand-500 shadow-sm">
            <Icon name="inbox" size={28} />
          </div>
          <div className="mt-4 text-[16px] font-semibold">Tidak ada approval pending</div>
          <div className="text-[13px] text-muted mt-1 max-w-xs mx-auto">Semua permohonan sudah ditindaklanjuti. Mantap! 🎉</div>
          <div className="mt-5 inline-block"><Btn variant="secondary" size="sm" icon="history">Lihat riwayat</Btn></div>
        </Card>
        <Card className="p-8 text-center pattern-dots">
          <div className="w-16 h-16 mx-auto rounded-2xl surface flex items-center justify-center text-danger-500 shadow-sm">
            <Icon name="wifi-off" size={28} />
          </div>
          <div className="mt-4 text-[16px] font-semibold">Gagal memuat data</div>
          <div className="text-[13px] text-muted mt-1 max-w-xs mx-auto">Tidak ada sinyal di lokasi ini. Coba lagi setelah pindah ke area yang lebih terbuka.</div>
          <div className="mt-5 inline-block"><Btn variant="primary" size="sm" icon="refresh-cw">Coba lagi</Btn></div>
        </Card>
      </div>
    </Subsection>
  );
}

// =========================== SOS Button ===========================
function SOSBlock() {
  const [hold, setHold] = React.useState(0);
  const timerRef = React.useRef(null);
  const start = () => {
    setHold(0);
    timerRef.current = setInterval(() => {
      setHold(h => {
        if (h >= 100) { clearInterval(timerRef.current); return 100; }
        return h + 4;
      });
    }, 60);
  };
  const stop = () => {
    clearInterval(timerRef.current);
    if (hold < 100) setHold(0);
  };
  return (
    <Subsection title="SOS button" hint="Floating, selalu accessible. Hold 1.5s untuk konfirmasi — mencegah trigger tidak sengaja.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 relative" style={{ minHeight: 240 }}>
          <div className="text-[12px] text-subtle">Floating · bottom-right · semua screen</div>
          <div className="text-[12px] text-muted mt-1">Hover/tap untuk preview. Hold lama untuk trigger.</div>
          <div className="absolute bottom-6 right-6">
            <button
              onMouseDown={start} onMouseUp={stop} onMouseLeave={stop}
              onTouchStart={start} onTouchEnd={stop}
              className="relative w-20 h-20 rounded-full bg-danger-500 text-white font-extrabold text-[18px] flex items-center justify-center sos-pulse focus-ring select-none"
            >
              {hold >= 100 ? <Icon name="check" size={32} /> : 'SOS'}
              {hold > 0 && hold < 100 && (
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="6" strokeDasharray={`${(hold/100)*289} 289`} strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-[13px] font-semibold">Saat trigger</div>
          <ul className="mt-3 space-y-2 text-[13px] text-muted">
            <li className="flex gap-2"><Icon name="map-pin" size={16} className="text-danger-500 mt-0.5" /> Kirim koordinat GPS ke command center</li>
            <li className="flex gap-2"><Icon name="phone" size={16} className="text-danger-500 mt-0.5" /> Buka voice call ke nomor emergency</li>
            <li className="flex gap-2"><Icon name="users" size={16} className="text-danger-500 mt-0.5" /> Broadcast ke supervisor & safety officer terdekat</li>
            <li className="flex gap-2"><Icon name="database" size={16} className="text-danger-500 mt-0.5" /> Log incident — bekerja offline, sync saat sinyal kembali</li>
          </ul>
          <div className="mt-5 p-3 rounded-lg bg-danger-50 dark:bg-danger-500/10 text-[12px] text-danger-700 dark:text-danger-500 flex gap-2 items-start">
            <Icon name="info" size={14} className="mt-0.5" />
            <span>Long-press 1.5 detik wajib. Visual countdown mencegah pemicu tidak sengaja saat menggunakan sarung tangan.</span>
          </div>
        </Card>
      </div>
    </Subsection>
  );
}

// =========================== Sync indicator ===========================
function SyncBlock() {
  return (
    <Subsection title="Offline sync indicator" hint="Selalu visible di atas screen. Memberi tahu user data tersimpan lokal, sinkron saat sinyal kembali.">
      <div className="space-y-2.5">
        {[
          { tone: 'success', icon: 'cloud-check', text: 'Tersinkron — terakhir 12:42',           bg: 'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500' },
          { tone: 'info',    icon: 'cloud-upload', text: 'Sedang sinkronisasi — 4 dari 12 item',  bg: 'bg-info-50 dark:bg-info-500/15 text-info-700 dark:text-info-500' },
          { tone: 'warning', icon: 'cloud-off',    text: 'Offline — 12 perubahan menunggu sinkron', bg: 'bg-warning-50 dark:bg-warning-500/15 text-warning-700 dark:text-warning-500' },
        ].map(s => (
          <div key={s.text} className={`flex items-center gap-2 px-3 h-10 rounded-lg ${s.bg} text-[13px] font-medium`}>
            <Icon name={s.icon} size={16} />
            {s.text}
          </div>
        ))}
      </div>
    </Subsection>
  );
}

// =========================== Section wrapper ===========================
function ComponentsSection() {
  return (
    <Section
      id="components"
      eyebrow="04 — Components"
      title="Components"
      description="Komponen inti aplikasi. Setiap komponen dirancang untuk berfungsi di tiga kondisi: outdoor bright sunlight, indoor office neon, low-light shift malam."
    >
      <ButtonsBlock />
      <InputsBlock />
      <CardsBlock />
      <BadgesBlock />
      <ListItemsBlock />
      <TopBarBlock />
      <BottomNavBlock />
      <SyncBlock />
      <ModalBlock />
      <ToastsBlock />
      <LoadingBlock />
      <EmptyBlock />
      <SOSBlock />
    </Section>
  );
}

window.ComponentsSection = ComponentsSection;
