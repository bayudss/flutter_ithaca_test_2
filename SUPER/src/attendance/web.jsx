// Web attendance screens W1–W3.

// ============================================================
// HR Sidebar (shared between W screens)
// ============================================================
function HRSidebar({ collapsed, setCollapsed }) {
  const items = [
    { name: 'Dashboard',  icon: 'layout-dashboard' },
    { name: 'Karyawan',   icon: 'users' },
    { name: 'Attendance', icon: 'clock', active: true },
    { name: 'Leave',      icon: 'calendar-days', badge: '12' },
    { name: 'Payroll',    icon: 'wallet' },
    { name: 'Kontraktor', icon: 'truck' },
    { name: 'Laporan',    icon: 'bar-chart-3' },
    { name: 'Pengaturan', icon: 'settings' },
  ];
  return (
    <aside className={`shrink-0 border-r border-token bg-white flex flex-col transition-all duration-200 ${collapsed ? 'w-[68px]' : 'w-60'}`}>
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-token">
        <BrandMark size={30} />
        {!collapsed && (
          <div className="leading-tight">
            <div className="text-[12px] font-bold tracking-tight">Nusaraya</div>
            <div className="text-[9px] text-subtle uppercase tracking-wider">HR Portal</div>
          </div>
        )}
      </div>
      <div className="px-3 py-4 flex-1">
        {!collapsed && <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Menu</div>}
        <nav className="space-y-0.5">
          {items.map(i => (
            <a key={i.name}
               className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : 'px-3'} h-9 rounded-md text-[12.5px] font-medium transition-colors
                 ${i.active ? 'bg-brand-50 text-brand-700' : 'text-muted hover:bg-elev hover:text-[color:var(--text)]'}`}>
              <Icon name={i.icon} size={15} />
              {!collapsed && <span className="flex-1">{i.name}</span>}
              {!collapsed && i.badge && <span className="text-[9px] font-bold bg-danger-500 text-white px-1.5 rounded-full">{i.badge}</span>}
            </a>
          ))}
        </nav>
      </div>
      <button onClick={() => setCollapsed(c => !c)} className="border-t border-token h-10 text-[11px] font-semibold text-subtle hover:bg-elev inline-flex items-center justify-center gap-1.5">
        <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} size={14} />
        {!collapsed && 'Collapse'}
      </button>
    </aside>
  );
}

// ============================================================
// W1 — HR Attendance Dashboard
// ============================================================
const ROWS = [
  { name:'Budi Santoso',   nik:'NSR-009281', dept:'Mining Ops',     shift:'Pagi',  ci:'05:58', co:'—',     dur:'2j 04m', status:'On-shift',   tone:'info',    loc:'PIT Bahana', method:'QR' },
  { name:'Siti Rahayu',    nik:'NSR-007123', dept:'Mining Ops',     shift:'Pagi',  ci:'06:14', co:'—',     dur:'1j 48m', status:'Terlambat 14m', tone:'warning', loc:'PIT Bahana', method:'QR' },
  { name:'Joko Pranoto',   nik:'KNC-002104', dept:'Hauling (KNC)',  shift:'Pagi',  ci:'05:50', co:'—',     dur:'2j 12m', status:'On-shift',   tone:'info',    loc:'PIT C',     method:'RFID' },
  { name:'Lina Marbun',    nik:'NSR-008092', dept:'Workshop',       shift:'Pagi',  ci:'—',     co:'—',     dur:'—',      status:'Tidak hadir',tone:'danger',  loc:'—',         method:'—' },
  { name:'Eko Saputra',    nik:'NSR-005412', dept:'Mining Ops',     shift:'Malam', ci:'21:55', co:'06:05', dur:'8j 10m', status:'On-time',    tone:'success', loc:'PIT Bahana', method:'QR' },
  { name:'Dewi Anggraini', nik:'NSR-001029', dept:'Safety',         shift:'Pagi',  ci:'05:48', co:'—',     dur:'2j 14m', status:'On-time',    tone:'success', loc:'PIT A',     method:'GPS' },
  { name:'Bagas Rinaldi',  nik:'NSR-006671', dept:'Workshop',       shift:'Pagi',  ci:'05:59', co:'—',     dur:'2j 03m', status:'On-time',    tone:'success', loc:'Workshop',  method:'QR' },
  { name:'Henny Sari',     nik:'KNC-003012', dept:'Hauling (KNC)',  shift:'Pagi',  ci:'06:32', co:'—',     dur:'1j 30m', status:'Terlambat 32m', tone:'warning', loc:'PIT C',     method:'QR' },
  { name:'Topan Wibowo',   nik:'NSR-004812', dept:'Mining Ops',     shift:'Pagi',  ci:'05:52', co:'—',     dur:'2j 10m', status:'On-time',    tone:'success', loc:'PIT B',     method:'QR' },
  { name:'Surya Pradana',  nik:'NSR-003345', dept:'Plant',          shift:'Pagi',  ci:'—',     co:'—',     dur:'—',      status:'Cuti sakit',  tone:'info',    loc:'—',         method:'—' },
];

function KPICard({ icon, label, value, sub, tone='brand', delta }) {
  const tones = {
    brand:   'bg-brand-50 text-brand-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger:  'bg-danger-50 text-danger-500',
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
      <div className="mt-0.5 text-[26px] font-extrabold tracking-tight mono">{value}</div>
      {sub && <div className="text-[11px] text-subtle mt-0.5">{sub}</div>}
    </div>
  );
}

function FilterChip({ icon, children, dot }) {
  return (
    <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md bg-white border border-token text-[12px] font-semibold hover:border-brand-300 hover:bg-brand-50/30">
      {icon && <Icon name={icon} size={13} className="text-subtle" />}
      <span>{children}</span>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 -ml-0.5" />}
      <Icon name="chevron-down" size={13} className="text-subtle" />
    </button>
  );
}

function StatusCell({ tone, children }) {
  const map = {
    success: 'bg-success-50 text-success-700 border-success-500/20',
    warning: 'bg-warning-50 text-warning-700 border-warning-500/25',
    danger:  'bg-danger-50 text-danger-700 border-danger-500/20',
    info:    'bg-info-50 text-info-700 border-info-500/20',
    gray:    'bg-elev text-muted border-token',
  };
  const dot = { success:'bg-success-500', warning:'bg-warning-500', danger:'bg-danger-500', info:'bg-info-500', gray:'bg-gray-400' }[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 h-6 rounded-md text-[11px] font-semibold border ${map[tone]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

function MethodPill({ m }) {
  if (m === '—') return <span className="text-subtle text-[11px]">—</span>;
  const map = {
    QR:    { ic:'qr-code',  c:'text-brand-700 bg-brand-50' },
    RFID:  { ic:'nfc',      c:'text-info-700 bg-info-50' },
    GPS:   { ic:'map-pin',  c:'text-safety-700 bg-safety-50' },
  };
  const v = map[m];
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 h-5 rounded text-[10px] font-bold ${v.c}`}>
      <Icon name={v.ic} size={10} /> {m}
    </span>
  );
}

function HRDashboard({ onPickRow }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [selected, setSelected] = React.useState(new Set());
  const toggleSel = (nik) => {
    setSelected(prev => {
      const n = new Set(prev);
      if (n.has(nik)) n.delete(nik); else n.add(nik);
      return n;
    });
  };
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
          <div>
            <div className="text-[10px] text-subtle uppercase tracking-wider">Attendance</div>
            <div className="text-[14px] font-bold tracking-tight">Live · Selasa, 19 Mei 2026</div>
          </div>
          <div className="flex-1" />
          <div className="bg-elev rounded-md px-3 h-9 flex items-center gap-2 text-[12px] text-subtle min-w-[260px]">
            <Icon name="search" size={14} />
            <span>Cari NIK, nama, atau lokasi…</span>
            <span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span>
          </div>
          <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative">
            <Icon name="bell" size={17} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" />
          </button>
          <div className="h-6 w-px bg-[color:var(--border)]" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-[11px] font-bold">AW</div>
            <div className="hidden lg:block leading-tight">
              <div className="text-[12px] font-bold">Andi Wijaya</div>
              <div className="text-[10px] text-subtle">HR Lead</div>
            </div>
            <Icon name="chevron-down" size={14} className="text-subtle" />
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Filters row */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar">19 Mei 2026</FilterChip>
              <FilterChip icon="layers">Semua department</FilterChip>
              <FilterChip icon="map-pin" dot>2 lokasi</FilterChip>
              <FilterChip icon="sunrise">Shift Pagi</FilterChip>
              <FilterChip icon="truck">Semua kontraktor</FilterChip>
              <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-[12px] font-semibold text-subtle hover:bg-elev">
                <Icon name="x" size={12} /> Reset
              </button>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="download">Export</Btn>
              <Btn variant="primary" size="sm" icon="plus">Bulk import</Btn>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="users"           label="Karyawan aktif"  value="2,547" tone="brand"   sub="Organic + kontraktor" />
              <KPICard icon="check-circle-2"  label="Hadir hari ini"  value="2,381" tone="success" sub="93.5%" delta="+1.4%" />
              <KPICard icon="alert-triangle"  label="Terlambat"       value="87"    tone="warning" sub="3.4% dari total" delta="-12" />
              <KPICard icon="x-circle"        label="Tidak hadir"     value="79"    tone="danger"  sub="2 tanpa keterangan" delta="+3" />
            </div>

            {/* Table */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-5 h-12 flex items-center gap-3 border-b border-token">
                <div className="text-[13px] font-bold tracking-tight">Daily attendance — {ROWS.length} dari 2,547</div>
                {selected.size > 0 && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="px-2 h-6 rounded bg-brand-50 text-brand-700 inline-flex items-center font-semibold">{selected.size} terpilih</span>
                    <button className="font-semibold text-brand-700 hover:underline">Approve OT</button>
                    <span className="text-subtle">·</span>
                    <button className="font-semibold text-brand-700 hover:underline">Export</button>
                  </div>
                )}
                <div className="flex-1" />
                <div className="flex items-center gap-1 text-[11px] text-subtle">
                  <button className="h-8 px-2.5 rounded-md hover:bg-elev inline-flex items-center gap-1.5 font-semibold">
                    <Icon name="filter" size={13} /> Filter
                  </button>
                  <button className="h-8 px-2.5 rounded-md hover:bg-elev inline-flex items-center gap-1.5 font-semibold">
                    <Icon name="columns-3" size={13} /> Columns
                  </button>
                  <button className="h-8 w-8 rounded-md hover:bg-elev inline-flex items-center justify-center">
                    <Icon name="refresh-cw" size={13} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                      <th className="px-5 py-2.5 w-10"><input type="checkbox" className="accent-brand-500" /></th>
                      <th className="px-3 py-2.5 font-bold">Karyawan</th>
                      <th className="px-3 py-2.5 font-bold">Department</th>
                      <th className="px-3 py-2.5 font-bold">Shift</th>
                      <th className="px-3 py-2.5 font-bold">Clock-in</th>
                      <th className="px-3 py-2.5 font-bold">Clock-out</th>
                      <th className="px-3 py-2.5 font-bold">Durasi</th>
                      <th className="px-3 py-2.5 font-bold">Status</th>
                      <th className="px-3 py-2.5 font-bold">Lokasi</th>
                      <th className="px-3 py-2.5 font-bold">Method</th>
                      <th className="px-3 py-2.5 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {ROWS.map((r, i) => (
                      <tr key={r.nik} className="hover:bg-elev cursor-pointer group" onClick={() => onPickRow && onPickRow(r)}>
                        <td className="px-5 py-2.5" onClick={e => e.stopPropagation()}>
                          <input type="checkbox" checked={selected.has(r.nik)} onChange={() => toggleSel(r.nik)} className="accent-brand-500" />
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">{r.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                            <div>
                              <div className="font-bold">{r.name}</div>
                              <div className="text-[10px] text-subtle mono">{r.nik}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-muted">{r.dept}</td>
                        <td className="px-3 py-2.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                            <Icon name={r.shift==='Pagi'?'sunrise':r.shift==='Siang'?'sun':'moon'} size={12} className="text-safety-500" />
                            {r.shift}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 mono font-semibold">{r.ci}</td>
                        <td className="px-3 py-2.5 mono font-semibold">{r.co}</td>
                        <td className="px-3 py-2.5 mono text-muted">{r.dur}</td>
                        <td className="px-3 py-2.5"><StatusCell tone={r.tone}>{r.status}</StatusCell></td>
                        <td className="px-3 py-2.5 text-muted">{r.loc}</td>
                        <td className="px-3 py-2.5"><MethodPill m={r.method} /></td>
                        <td className="px-3 py-2.5"><Icon name="chevron-right" size={14} className="text-subtle group-hover:text-brand-500" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="px-5 h-12 border-t border-token flex items-center justify-between text-[12px]">
                <div className="text-subtle">Menampilkan 1–{ROWS.length} dari 2,547</div>
                <div className="flex items-center gap-1">
                  <button className="h-8 w-8 rounded-md border border-token hover:bg-elev flex items-center justify-center"><Icon name="chevron-left" size={14} /></button>
                  <button className="h-8 w-8 rounded-md bg-brand-500 text-white text-[12px] font-bold">1</button>
                  <button className="h-8 w-8 rounded-md hover:bg-elev text-[12px] font-semibold">2</button>
                  <button className="h-8 w-8 rounded-md hover:bg-elev text-[12px] font-semibold">3</button>
                  <span className="text-subtle">…</span>
                  <button className="h-8 w-8 rounded-md hover:bg-elev text-[12px] font-semibold">255</button>
                  <button className="h-8 w-8 rounded-md border border-token hover:bg-elev flex items-center justify-center"><Icon name="chevron-right" size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W2 — Drawer detail (tabs: Profile, Attendance, Leave, Performance)
// ============================================================
const HEATMAP_DAYS = (() => {
  // Build 90 days, recent on the right. Use deterministic pattern.
  const arr = [];
  const today = new Date(2026, 4, 19);
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dow = d.getDay();
    let s = 'hadir';
    if (dow === 0 || dow === 6) s = 'libur';
    if (i % 17 === 5) s = 'telat';
    if (i % 23 === 7 || i % 23 === 8) s = 'cuti';
    if (i === 11) s = 'absent';
    arr.push({ date: d, status: s });
  }
  return arr;
})();

function HeatmapCalendar() {
  const colors = {
    hadir:  '#1D9E75',
    telat:  '#EF9F27',
    absent: '#E24B4A',
    cuti:   '#378ADD',
    libur:  '#E6E8EC',
  };
  // group into 13 weeks × 7 days
  const weeks = Array.from({length: 13}, (_, w) => HEATMAP_DAYS.slice(w*7, w*7+7));
  return (
    <div>
      <div className="flex items-end gap-1">
        <div className="grid grid-rows-7 gap-1 mr-1 text-[9px] text-subtle">
          {['Sen','','Rab','','Jum','',''].map((d,i) => <div key={i} className="h-3 leading-3">{d}</div>)}
        </div>
        {weeks.map((wk, wi) => (
          <div key={wi} className="grid grid-rows-7 gap-1">
            {wk.map((d, di) => (
              <div key={di} className="w-3 h-3 rounded-[3px]"
                   title={`${d.date.toLocaleDateString('id-ID')} · ${d.status}`}
                   style={{ background: colors[d.status] }} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 text-[10px] text-subtle flex-wrap">
        {Object.entries(colors).map(([k,c]) => (
          <div key={k} className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: c }} /> {k}</div>
        ))}
      </div>
    </div>
  );
}

function DetailDrawer({ row, onClose }) {
  const [tab, setTab] = React.useState('attendance');
  return (
    <div className="absolute inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[520px] max-w-[90%] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-token">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-500 text-white text-[14px] font-bold flex items-center justify-center">{row.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
              <div>
                <div className="text-[16px] font-extrabold tracking-tight">{row.name}</div>
                <div className="text-[11px] text-subtle">{row.dept} · <span className="mono">{row.nik}</span></div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="message-circle" size={15} /></button>
              <button className="w-8 h-8 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="more-horizontal" size={15} /></button>
              <button onClick={onClose} className="w-8 h-8 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="x" size={16} /></button>
            </div>
          </div>
          {/* Tabs */}
          <div className="mt-5 flex items-center gap-1 -mb-4 border-b border-token">
            {[
              {k:'profile', l:'Profile'},
              {k:'attendance', l:'Attendance History'},
              {k:'leave', l:'Leave'},
              {k:'performance', l:'Performance'},
            ].map(t => (
              <button key={t.k} onClick={() => setTab(t.k)}
                className={`relative h-10 px-3 text-[12.5px] font-semibold ${tab===t.k ? 'text-brand-700' : 'text-muted hover:text-[color:var(--text)]'}`}>
                {t.l}
                {tab===t.k && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-brand-500 rounded-t" />}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {tab === 'attendance' && (
            <div className="p-6 space-y-5">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-elev p-3">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Attendance rate</div>
                  <div className="text-[20px] font-extrabold mono mt-0.5">96.7%</div>
                  <div className="text-[10px] text-success-600 font-semibold">↑ 2.1% vs bulan lalu</div>
                </div>
                <div className="rounded-xl bg-elev p-3">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Avg clock-in</div>
                  <div className="text-[20px] font-extrabold mono mt-0.5">05:56</div>
                  <div className="text-[10px] text-subtle">−4m dari shift</div>
                </div>
                <div className="rounded-xl bg-elev p-3">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Overtime</div>
                  <div className="text-[20px] font-extrabold mono mt-0.5">14j</div>
                  <div className="text-[10px] text-subtle">90 hari terakhir</div>
                </div>
              </div>

              {/* Heatmap */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[12px] font-bold tracking-tight">Calendar heatmap — 90 hari</div>
                  <button className="text-[11px] text-brand-700 font-semibold inline-flex items-center gap-1">Detail <Icon name="external-link" size={11} /></button>
                </div>
                <HeatmapCalendar />
              </div>

              {/* Pending koreksi */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[12px] font-bold tracking-tight">Koreksi pending approval</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-warning-50 text-warning-700">2 menunggu</span>
                </div>
                <div className="rounded-xl border border-token divide-y divide-[color:var(--border)]">
                  {[
                    { date:'18 Mei', type:'Lupa clock-out', reason:'Dispatch darurat ke Pit C', time:'3j' },
                    { date:'14 Mei', type:'Salah waktu',    reason:'Sistem hang saat scan',     time:'5 hari' },
                  ].map((c,i) => (
                    <div key={i} className="p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-warning-50 text-warning-600 flex items-center justify-center shrink-0"><Icon name="edit-3" size={14} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-[12px] font-bold">{c.type}</div>
                          <span className="text-[10px] text-subtle">· {c.date}</span>
                        </div>
                        <div className="text-[11px] text-subtle truncate">{c.reason}</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button className="h-7 px-2 rounded-md bg-success-500 text-white text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1"><Icon name="check" size={11} /> OK</button>
                        <button className="h-7 px-2 rounded-md border border-token text-[10px] font-bold text-muted hover:bg-elev">Tolak</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === 'profile' && (
            <div className="p-6 grid grid-cols-2 gap-x-4 gap-y-3 text-[12.5px]">
              {[
                { l:'Tanggal lahir', v:'12 Aug 1989' },
                { l:'Bergabung',     v:'04 Jan 2018 · 8 thn' },
                { l:'Posisi',        v:'Operator Excavator' },
                { l:'Tipe karyawan', v:'Organic · Permanent' },
                { l:'Lokasi base',   v:'Bukit Sangatta — Camp B' },
                { l:'Supervisor',    v:'Hadi Wijaya' },
                { l:'Telepon',       v:'+62 812-3456-7890' },
                { l:'Email',         v:'budi.s@nusaraya.id' },
              ].map(f => (
                <div key={f.l} className="rounded-lg bg-elev p-3">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{f.l}</div>
                  <div className="font-semibold mt-0.5">{f.v}</div>
                </div>
              ))}
            </div>
          )}
          {tab === 'leave' && (
            <div className="p-6">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-elev p-3"><div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Cuti tahunan</div><div className="text-[20px] font-extrabold mono mt-0.5">9<span className="text-[12px] text-subtle font-normal ml-1">/ 12</span></div></div>
                <div className="rounded-xl bg-elev p-3"><div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Sakit</div><div className="text-[20px] font-extrabold mono mt-0.5">2</div></div>
                <div className="rounded-xl bg-elev p-3"><div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Izin</div><div className="text-[20px] font-extrabold mono mt-0.5">1</div></div>
              </div>
              <div className="mt-5 text-[12px] text-subtle">Riwayat leave tahun 2026 — empty state placeholder.</div>
            </div>
          )}
          {tab === 'performance' && (
            <div className="p-6 text-[12px] text-subtle">Performance metrics terhubung ke modul KPI — coming soon.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W3 — SPV Approval Inbox
// ============================================================
const APPROVALS = [
  { id:'KOR-04891', kind:'Koreksi', type:'Lupa clock-out', name:'Budi Santoso',  nik:'NSR-009281', date:'18 Mei', time:'14:00', reason:'Dispatch darurat ke Pit C bantu maintenance, lupa scan QR keluar.', photo:true,  prio:'normal' },
  { id:'OT-04891',  kind:'OT',      type:'Overtime 2 jam', name:'Siti Rahayu',   nik:'NSR-007123', date:'18 Mei', time:'14:00–16:00', reason:'Bantu finishing report shift pagi sebelum hand-over.', photo:false, prio:'high' },
  { id:'KOR-04890', kind:'Koreksi', type:'Lupa clock-in',  name:'Joko Pranoto',  nik:'KNC-002104', date:'17 Mei', time:'05:55', reason:'Sistem QR hang, sudah lapor pos jaga.', photo:true, prio:'normal' },
  { id:'OT-04890',  kind:'OT',      type:'Overtime 3 jam', name:'Eko Saputra',   nik:'NSR-005412', date:'18 Mei', time:'06:00–09:00', reason:'Extend shift malam karena hand-over delay.', photo:false, prio:'normal' },
  { id:'KOR-04889', kind:'Koreksi', type:'Salah waktu',    name:'Dewi Anggraini',nik:'NSR-001029', date:'17 Mei', time:'13:45', reason:'Clock-out tercatat 14:30, sebenarnya 13:45.', photo:false, prio:'normal' },
  { id:'KOR-04888', kind:'Koreksi', type:'Lupa clock-in',  name:'Lina Marbun',   nik:'NSR-008092', date:'15 Mei', time:'05:50', reason:'Lupa scan setelah briefing langsung ke unit.', photo:true,  prio:'high' },
];

function ApprovalInbox() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [sel, setSel] = React.useState(new Set([APPROVALS[0].id, APPROVALS[1].id]));
  const allSel = sel.size === APPROVALS.length;
  const toggle = (id) => setSel(prev => {
    const n = new Set(prev);
    if (n.has(id)) n.delete(id); else n.add(id);
    return n;
  });
  const toggleAll = () => setSel(allSel ? new Set() : new Set(APPROVALS.map(a => a.id)));

  return (
    <div className="h-full flex bg-elev">
      <HRSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
          <div>
            <div className="text-[10px] text-subtle uppercase tracking-wider">Supervisor Inbox</div>
            <div className="text-[14px] font-bold tracking-tight">Approval pending — Pak Hadi Wijaya</div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-[12px]">
            <span className="px-2 h-7 rounded-md bg-warning-50 text-warning-700 font-bold inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-warning-500" /> 6 menunggu</span>
            <span className="px-2 h-7 rounded-md bg-elev text-muted font-semibold">SLA 1×24 jam</span>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Filter tabs */}
            <div className="flex items-center gap-1 border-b border-token">
              {[
                { k:'all', l:'Semua', c: APPROVALS.length },
                { k:'kor', l:'Koreksi', c: APPROVALS.filter(a=>a.kind==='Koreksi').length },
                { k:'ot',  l:'Overtime', c: APPROVALS.filter(a=>a.kind==='OT').length },
                { k:'leave', l:'Leave', c: 0 },
              ].map((t,i) => (
                <button key={t.k} className={`relative h-10 px-3 text-[12.5px] font-semibold ${i===0 ? 'text-brand-700':'text-muted hover:text-[color:var(--text)]'}`}>
                  {t.l} <span className="ml-1 text-[10px] font-bold opacity-70">{t.c}</span>
                  {i===0 && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-brand-500 rounded-t" />}
                </button>
              ))}
              <div className="flex-1" />
              <div className="flex items-center gap-2 pb-2">
                <FilterChip icon="calendar">7 hari terakhir</FilterChip>
                <FilterChip icon="users">Tim Anda</FilterChip>
              </div>
            </div>

            {/* Bulk bar */}
            <div className="surface rounded-xl flex items-center gap-3 px-4 h-12">
              <label className="flex items-center gap-2 text-[12px] font-semibold cursor-pointer">
                <input type="checkbox" checked={allSel} onChange={toggleAll} className="accent-brand-500" />
                Pilih semua
              </label>
              {sel.size > 0 && <span className="text-[12px] text-muted">{sel.size} dipilih</span>}
              <div className="flex-1" />
              {sel.size > 0 ? (
                <>
                  <Btn variant="success" size="sm" icon="check">Bulk approve ({sel.size})</Btn>
                  <Btn variant="outlineDanger" size="sm" icon="x">Tolak</Btn>
                </>
              ) : (
                <div className="text-[11px] text-subtle">Pilih item untuk bulk action</div>
              )}
            </div>

            {/* Rows */}
            <div className="surface rounded-xl divide-y divide-[color:var(--border)]">
              {APPROVALS.map(a => (
                <div key={a.id} className="px-4 py-3.5 flex items-start gap-3 hover:bg-elev/60">
                  <input type="checkbox" checked={sel.has(a.id)} onChange={() => toggle(a.id)} className="accent-brand-500 mt-3.5" />
                  <div className="w-10 h-10 rounded-full bg-brand-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {a.name.split(' ').map(x=>x[0]).slice(0,2).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center px-1.5 h-5 rounded text-[10px] font-extrabold uppercase tracking-wider
                        ${a.kind==='Koreksi' ? 'bg-info-50 text-info-700' : 'bg-warning-50 text-warning-700'}`}>{a.kind}</span>
                      <div className="text-[13px] font-bold tracking-tight">{a.type}</div>
                      <span className="text-[11px] text-muted">·</span>
                      <div className="text-[12px] text-muted">{a.name} <span className="mono text-subtle">({a.nik})</span></div>
                      {a.prio === 'high' && (
                        <span className="inline-flex items-center gap-1 px-1.5 h-5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-danger-50 text-danger-700">
                          <Icon name="flag" size={9} /> Urgent
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[12.5px] text-[color:var(--text)] leading-relaxed">{a.reason}</div>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-subtle">
                      <span className="inline-flex items-center gap-1"><Icon name="calendar" size={11} /> {a.date}</span>
                      <span className="inline-flex items-center gap-1 mono"><Icon name="clock" size={11} /> {a.time}</span>
                      {a.photo && (
                        <span className="inline-flex items-center gap-1 text-brand-700 font-semibold">
                          <Icon name="paperclip" size={11} /> Foto bukti
                        </span>
                      )}
                      <span className="mono opacity-60">{a.id}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button className="h-8 px-3 rounded-md bg-success-500 text-white text-[11px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5"><Icon name="check" size={12} /> Approve</button>
                    <button className="h-8 px-3 rounded-md border border-token text-[11px] font-bold text-muted hover:bg-white hover:text-danger-700 hover:border-danger-500/40">Tolak</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.HRDashboard    = HRDashboard;
window.DetailDrawer   = DetailDrawer;
window.ApprovalInbox  = ApprovalInbox;
