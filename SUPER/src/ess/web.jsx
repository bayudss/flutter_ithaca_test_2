// Web ESS screens W4 (HR Leave Dashboard) and W5 (Employee Profile).

function HRSidebar({ collapsed, setCollapsed, active = 'Leave' }) {
  const items = [
    { name: 'Dashboard',  icon: 'layout-dashboard' },
    { name: 'Karyawan',   icon: 'users' },
    { name: 'Attendance', icon: 'clock' },
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
                 ${active === i.name ? 'bg-brand-50 text-brand-700' : 'text-muted hover:bg-elev hover:text-[color:var(--text)]'}`}>
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

// ============================================================
// W4 — HR Leave Management Dashboard
// ============================================================
const LEAVE_TABLE = [
  { name:'Budi Santoso',   nik:'NSR-009281', dept:'Mining Ops', type:'Tahunan',  from:'22 Mei', to:'26 Mei', days:3, sub:'2j', status:'Pending SPV', tone:'warning' },
  { name:'Siti Rahayu',    nik:'NSR-007123', dept:'Mining Ops', type:'Sakit',    from:'14 Mei', to:'14 Mei', days:1, sub:'4 hari', status:'Approved',    tone:'success' },
  { name:'Joko Pranoto',   nik:'KNC-002104', dept:'Hauling',    type:'Tahunan',  from:'29 Mei', to:'31 Mei', days:1, sub:'1 hari', status:'Pending HR',  tone:'warning' },
  { name:'Lina Marbun',    nik:'NSR-008092', dept:'Workshop',   type:'Cuti besar',from:'01 Jun', to:'14 Jun', days:10,sub:'5 hari', status:'Pending HR',  tone:'warning' },
  { name:'Eko Saputra',    nik:'NSR-005412', dept:'Mining Ops', type:'Khusus',   from:'10 Mei', to:'10 Mei', days:1, sub:'10 hari',status:'Approved',    tone:'success' },
  { name:'Dewi Anggraini', nik:'NSR-001029', dept:'Safety',     type:'Tahunan',  from:'02 Apr', to:'05 Apr', days:2, sub:'1 bln',  status:'Approved',    tone:'success' },
  { name:'Bagas Rinaldi',  nik:'NSR-006671', dept:'Workshop',   type:'Sakit',    from:'15 Apr', to:'16 Apr', days:2, sub:'1 bln',  status:'Rejected',    tone:'danger' },
  { name:'Henny Sari',     nik:'KNC-003012', dept:'Hauling',    type:'Tahunan',  from:'20 Mei', to:'21 Mei', days:2, sub:'1 hari', status:'Pending SPV', tone:'warning' },
];

// Gantt-like calendar of leaves
function LeaveGantt() {
  // Show 14 days starting from May 15
  const days = Array.from({length: 14}, (_,i) => 15 + i);
  const rows = [
    { name:'Budi Santoso',   nik:'NSR-009281', type:'Tahunan', tone:'info',    from:22, to:26 },
    { name:'Joko Pranoto',   nik:'KNC-002104', type:'Tahunan', tone:'info',    from:29, to:31, overflow: true },
    { name:'Henny Sari',     nik:'KNC-003012', type:'Tahunan', tone:'info',    from:20, to:21 },
    { name:'Siti Rahayu',    nik:'NSR-007123', type:'Sakit',   tone:'success', from:15, to:15 },
    { name:'Andi Pratama',   nik:'NSR-004123', type:'Khusus',  tone:'brand',   from:18, to:18 },
    { name:'Lina Marbun',    nik:'NSR-008092', type:'Cuti besar', tone:'warning', from:'1jun', to:'14jun', overflow: true },
  ];
  const colMap = {
    info: 'bg-info-500',
    success: 'bg-success-500',
    brand: 'bg-brand-500',
    warning: 'bg-warning-500',
  };
  return (
    <div className="surface rounded-xl overflow-hidden">
      <div className="px-5 h-12 flex items-center justify-between border-b border-token">
        <div className="flex items-center gap-3">
          <div className="text-[13px] font-bold tracking-tight">Calendar — 14 hari ke depan</div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-info-50 text-info-700">6 staf cuti overlap</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          {[
            {t:'Tahunan', c:'bg-info-500'},
            {t:'Sakit', c:'bg-success-500'},
            {t:'Khusus', c:'bg-brand-500'},
            {t:'Cuti besar', c:'bg-warning-500'},
          ].map(l => (
            <div key={l.t} className="flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded ${l.c}`} /> {l.t}</div>
          ))}
        </div>
      </div>
      <div className="p-3 overflow-x-auto">
        {/* Header */}
        <div className="grid" style={{ gridTemplateColumns: '200px repeat(14, minmax(36px, 1fr))' }}>
          <div className="text-[10px] uppercase tracking-wider font-bold text-subtle px-2">Karyawan</div>
          {days.map(d => {
            const dow = new Date(2026, 4, d).getDay();
            const isWeekend = dow === 0 || dow === 6;
            const isToday = d === 19;
            return (
              <div key={d} className={`text-center text-[10px] font-bold ${isToday ? 'text-brand-700' : isWeekend ? 'text-subtle' : 'text-muted'}`}>
                <div className="uppercase tracking-wider">{['M','S','S','R','K','J','S'][dow]}</div>
                <div className={`text-[12px] mt-0.5 ${isToday ? 'text-brand-700 font-extrabold' : ''}`}>{d}</div>
              </div>
            );
          })}
        </div>

        {/* Rows */}
        <div className="mt-2 space-y-1">
          {rows.map(r => (
            <div key={r.nik} className="grid items-center" style={{ gridTemplateColumns: '200px repeat(14, minmax(36px, 1fr))' }}>
              <div className="px-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">{r.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                <div className="min-w-0">
                  <div className="text-[12px] font-bold truncate">{r.name}</div>
                  <div className="text-[10px] text-subtle mono">{r.nik}</div>
                </div>
              </div>
              {days.map(d => {
                const dow = new Date(2026, 4, d).getDay();
                const isWeekend = dow === 0 || dow === 6;
                let inRange = false;
                if (typeof r.from === 'number') {
                  inRange = d >= r.from && d <= r.to;
                }
                if (r.overflow && typeof r.from === 'string' && r.from.endsWith('jun')) {
                  // Only show last days bleeding from June (treat all days as not in May range)
                  inRange = false;
                }
                if (r.overflow && typeof r.from === 'number' && d === r.to) {
                  // already inRange via from-to
                }
                const isToday = d === 19;
                if (inRange) {
                  return (
                    <div key={d} className={`h-7 mx-0.5 rounded ${colMap[r.tone]} text-white text-[10px] font-bold flex items-center justify-center`}>
                      {d === r.from && <Icon name="chevron-left" size={11} className="opacity-60 mr-0.5" />}
                      {d === r.to && r.overflow && <Icon name="chevron-right" size={11} className="opacity-60 ml-0.5" />}
                    </div>
                  );
                }
                if (r.overflow && typeof r.from === 'string') {
                  // Lina: cuti besar 1-14 Jun, none in May range; show indicator chevron right at d=29 area
                  if (d === 28) {
                    return <div key={d} className={`h-7 mx-0.5 rounded-r-full ${colMap[r.tone]} text-white opacity-50 text-[9px] font-bold flex items-center justify-center`}>›</div>;
                  }
                }
                return <div key={d} className={`h-7 mx-0.5 rounded ${isWeekend ? 'bg-elev/60' : ''} ${isToday ? 'ring-1 ring-brand-300' : ''}`} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MethodTypePill({ t }) {
  const map = {
    'Tahunan': 'bg-info-50 text-info-700',
    'Sakit': 'bg-success-50 text-success-700',
    'Khusus': 'bg-brand-50 text-brand-700',
    'Cuti besar': 'bg-warning-50 text-warning-700',
  };
  return <span className={`inline-flex items-center px-2 h-5 rounded text-[10px] font-extrabold uppercase tracking-wider ${map[t] || 'bg-elev text-muted'}`}>{t}</span>;
}

function W4_LeaveDashboard() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar collapsed={collapsed} setCollapsed={setCollapsed} active="Leave" />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
          <div>
            <div className="text-[10px] text-subtle uppercase tracking-wider">Leave Management</div>
            <div className="text-[14px] font-bold tracking-tight">Mei 2026 · 87 pengajuan bulan ini</div>
          </div>
          <div className="flex-1" />
          <div className="bg-elev rounded-md px-3 h-9 flex items-center gap-2 text-[12px] text-subtle min-w-[260px]">
            <Icon name="search" size={14} />
            <span>Cari NIK atau nama…</span>
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
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar">Mei 2026</FilterChip>
              <FilterChip icon="tree-palm">Semua jenis</FilterChip>
              <FilterChip icon="layers">3 department</FilterChip>
              <FilterChip icon="check-circle-2" dot>Pending + Approved</FilterChip>
              <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-[12px] font-semibold text-subtle hover:bg-elev">
                <Icon name="x" size={12} /> Reset
              </button>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="download">Export CSV</Btn>
              <Btn variant="primary" size="sm" icon="plus">Ajukan untuk karyawan</Btn>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="file-plus"      label="Request bulan ini" value="87" tone="brand" delta="+12" sub="vs 75 bulan lalu" />
              <KPICard icon="clock"          label="Pending"            value="12" tone="warning" sub="5 SPV · 7 HR" />
              <KPICard icon="check-circle-2" label="Approved"           value="71" tone="success" delta="+18%" />
              <KPICard icon="x-circle"       label="Rejected"           value="4"  tone="danger"  sub="Bukti tidak lengkap" />
            </div>

            {/* Gantt */}
            <LeaveGantt />

            {/* Table */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-5 h-12 flex items-center justify-between border-b border-token">
                <div className="text-[13px] font-bold tracking-tight">All leave requests — {LEAVE_TABLE.length} dari 87</div>
                <div className="flex items-center gap-1 text-[11px]">
                  <button className="h-8 px-2.5 rounded-md hover:bg-elev inline-flex items-center gap-1.5 font-semibold">
                    <Icon name="filter" size={13} /> Filter
                  </button>
                  <button className="h-8 px-2.5 rounded-md hover:bg-elev inline-flex items-center gap-1.5 font-semibold">
                    <Icon name="columns-3" size={13} /> Columns
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
                      <th className="px-3 py-2.5 font-bold">Jenis</th>
                      <th className="px-3 py-2.5 font-bold">Periode</th>
                      <th className="px-3 py-2.5 font-bold">Hari</th>
                      <th className="px-3 py-2.5 font-bold">Diajukan</th>
                      <th className="px-3 py-2.5 font-bold">Status</th>
                      <th className="px-3 py-2.5 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {LEAVE_TABLE.map((r,i) => (
                      <tr key={r.nik+i} className="hover:bg-elev cursor-pointer">
                        <td className="px-5 py-2.5"><input type="checkbox" className="accent-brand-500" /></td>
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
                        <td className="px-3 py-2.5"><MethodTypePill t={r.type} /></td>
                        <td className="px-3 py-2.5 mono">{r.from} – {r.to}</td>
                        <td className="px-3 py-2.5 mono font-bold">{r.days}</td>
                        <td className="px-3 py-2.5 text-subtle">{r.sub} lalu</td>
                        <td className="px-3 py-2.5"><StatusPill tone={r.tone} icon={r.tone==='warning'?'clock':r.tone==='success'?'check':'x'}>{r.status}</StatusPill></td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1 justify-end">
                            {r.tone === 'warning' ? (
                              <>
                                <button className="h-7 px-2 rounded-md bg-success-500 text-white text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1"><Icon name="check" size={11} /> OK</button>
                                <button className="h-7 px-2 rounded-md border border-token text-[10px] font-bold text-muted hover:bg-white">Tolak</button>
                              </>
                            ) : (
                              <button className="h-7 px-2 rounded-md hover:bg-white text-muted"><Icon name="more-horizontal" size={14} /></button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 h-12 border-t border-token flex items-center justify-between text-[12px]">
                <div className="text-subtle">Menampilkan 1–{LEAVE_TABLE.length} dari 87</div>
                <div className="flex items-center gap-1">
                  <button className="h-8 w-8 rounded-md border border-token hover:bg-elev flex items-center justify-center"><Icon name="chevron-left" size={14} /></button>
                  <button className="h-8 w-8 rounded-md bg-brand-500 text-white text-[12px] font-bold">1</button>
                  <button className="h-8 w-8 rounded-md hover:bg-elev text-[12px] font-semibold">2</button>
                  <button className="h-8 w-8 rounded-md hover:bg-elev text-[12px] font-semibold">3</button>
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
// W5 — Employee Profile (HR perspective)
// ============================================================
const PROFILE_TABS = [
  { k:'personal',    l:'Personal' },
  { k:'employment',  l:'Employment' },
  { k:'compensation',l:'Compensation' },
  { k:'leave',       l:'Leave History' },
  { k:'attendance',  l:'Attendance' },
  { k:'performance', l:'Performance' },
  { k:'documents',   l:'Documents' },
];

function W5_EmployeeProfile() {
  const [collapsed, setCollapsed] = React.useState(true);
  const [tab, setTab] = React.useState('personal');
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar collapsed={collapsed} setCollapsed={setCollapsed} active="Karyawan" />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <a className="text-[11px] text-subtle hover:text-[color:var(--text)] inline-flex items-center gap-1">
              <Icon name="users" size={12} /> Karyawan
            </a>
            <Icon name="chevron-right" size={12} className="text-subtle" />
            <div className="text-[13px] font-bold">Budi Santoso</div>
          </div>
          <div className="flex-1" />
          <Btn variant="secondary" size="sm" icon="download">Export PDF</Btn>
          <Btn variant="secondary" size="sm" icon="history">Audit log</Btn>
          <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="more-horizontal" size={17} /></button>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Hero card */}
          <div className="px-6 pt-5">
            <div className="surface rounded-xl p-5 flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-brand-500 text-white text-[22px] font-extrabold flex items-center justify-center">BS</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="text-[20px] font-extrabold tracking-tight">Budi Santoso</div>
                  <StatusPill tone="success" icon="check-circle-2">Aktif</StatusPill>
                  <StatusPill tone="brand" size="sm">Organic · Permanent</StatusPill>
                </div>
                <div className="text-[13px] text-muted mt-1">Operator Excavator · Mining Operations · PIT Bahana</div>
                <div className="text-[12px] text-subtle mt-1 flex items-center gap-3">
                  <span className="mono">NSR-009281</span>
                  <span>· Sejak 04 Jan 2018 (8 thn 4 bln)</span>
                  <span>· Reports to <span className="font-semibold text-[color:var(--text)]">Hadi Wijaya</span></span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 shrink-0">
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Attendance</div>
                  <div className="text-[18px] font-extrabold mono">96.7%</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Cuti sisa</div>
                  <div className="text-[18px] font-extrabold mono">10<span className="text-[11px] text-subtle font-normal">/12</span></div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Tenure</div>
                  <div className="text-[18px] font-extrabold mono">8.4y</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-5 flex items-center gap-1 border-b border-token overflow-x-auto">
              {PROFILE_TABS.map(t => (
                <button key={t.k} onClick={() => setTab(t.k)}
                  className={`relative h-10 px-3 text-[12.5px] font-semibold whitespace-nowrap
                    ${tab===t.k ? 'text-brand-700' : 'text-muted hover:text-[color:var(--text)]'}`}>
                  {t.l}
                  {tab===t.k && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-brand-500 rounded-t" />}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-5">
            {tab === 'personal' && <PersonalPanel />}
            {tab === 'employment' && <EmploymentPanel />}
            {tab === 'compensation' && <CompensationPanel />}
            {tab === 'leave' && <LeaveHistoryPanel />}
            {tab === 'attendance' && <AttendancePanel />}
            {tab === 'performance' && <ComingSoon label="Performance metrics terhubung ke modul KPI" />}
            {tab === 'documents' && <DocumentsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ lab, v, locked, edited, mono }) {
  return (
    <div className="rounded-lg bg-white border border-token p-3 relative">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{lab}</div>
        {locked && <Icon name="lock" size={11} className="text-subtle" />}
        {edited && <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-info-50 text-info-700">Edited by HR</span>}
      </div>
      <div className={`text-[13px] font-semibold mt-0.5 ${mono ? 'mono' : ''}`}>{v}</div>
    </div>
  );
}

function PersonalPanel() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-8 surface rounded-xl p-5">
        <div className="text-[13px] font-bold tracking-tight mb-3">Data pribadi</div>
        <div className="grid grid-cols-2 gap-3">
          <ProfileField lab="NIK"           v="NSR-009281" locked mono />
          <ProfileField lab="Nama lengkap"  v="Budi Santoso" locked />
          <ProfileField lab="Tanggal lahir" v="12 Agustus 1989" locked />
          <ProfileField lab="Tempat lahir"  v="Tenggarong, Kaltim" locked />
          <ProfileField lab="Jenis kelamin" v="Laki-laki" locked />
          <ProfileField lab="Agama"         v="Islam" />
          <ProfileField lab="Status nikah"  v="Menikah · 2 anak" />
          <ProfileField lab="Golongan darah"v="O+" edited />
          <ProfileField lab="Alamat"        v="Jl. Merdeka No. 42, Sangatta Utara" />
          <ProfileField lab="Nomor HP"      v="+62 812-3456-7890" mono />
          <ProfileField lab="Email"         v="budi.s@nusaraya.id" />
          <ProfileField lab="Kontak darurat"v="Siti A. (Istri) · +62 812-3456-7891" />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <div className="surface rounded-xl p-5">
          <div className="text-[13px] font-bold tracking-tight">Audit log</div>
          <div className="mt-3 space-y-3">
            {[
              { who:'Andi Wijaya', what:'Edit "Golongan darah" → O+', when:'2 jam', tone:'info' },
              { who:'Andi Wijaya', what:'Approve cuti LV-2026-04702', when:'1 bln', tone:'success' },
              { who:'Sistem', what:'Update kontrak (renew)',         when:'3 bln', tone:'gray' },
              { who:'Andi Wijaya', what:'Tambah dokumen SIO',         when:'5 bln', tone:'gray' },
            ].map((a,i) => (
              <div key={i} className="flex items-start gap-2.5 text-[12px]">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                  ${a.tone==='success' ? 'bg-success-50 text-success-600' : a.tone==='info' ? 'bg-info-50 text-info-600' : 'bg-elev text-muted'}`}>
                  <Icon name={a.tone==='success'?'check':a.tone==='info'?'edit-3':'history'} size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold leading-tight">{a.what}</div>
                  <div className="text-[10px] text-subtle">{a.who} · {a.when} lalu</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full h-8 rounded-md hover:bg-elev text-[11px] font-semibold text-brand-700">Lihat semua aktivitas</button>
        </div>
      </div>
    </div>
  );
}

function EmploymentPanel() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-8 surface rounded-xl p-5">
        <div className="text-[13px] font-bold tracking-tight mb-3">Kontrak & Posisi</div>
        <div className="grid grid-cols-2 gap-3">
          <ProfileField lab="Tipe karyawan" v="Organic · Permanent" locked />
          <ProfileField lab="Posisi"        v="Operator Excavator" />
          <ProfileField lab="Department"    v="Mining Operations" />
          <ProfileField lab="Site"          v="Bukit Sangatta — PIT Bahana" />
          <ProfileField lab="Tgl bergabung" v="04 Jan 2018" locked />
          <ProfileField lab="Masa kerja"    v="8 thn 4 bln" locked />
          <ProfileField lab="Supervisor"    v="Hadi Wijaya · NSR-001029" />
          <ProfileField lab="Shift pattern" v="Pagi (06:00 – 14:00)" />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="surface rounded-xl p-5">
          <div className="text-[13px] font-bold tracking-tight">Career timeline</div>
          <div className="mt-3 space-y-3 text-[12px]">
            {[
              { y:'2024', t:'Operator Excavator Senior' },
              { y:'2021', t:'Operator Excavator' },
              { y:'2019', t:'Operator Heavy Equipment' },
              { y:'2018', t:'Trainee · Mining Ops' },
            ].map((c,i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-[10px] mono font-bold w-10 text-subtle">{c.y}</div>
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <div className="flex-1 font-semibold">{c.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompensationPanel() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-8 surface rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-bold tracking-tight">Compensation · 2026</div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-warning-50 text-warning-700">Restricted</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ProfileField lab="Gaji pokok"        v={rp(6000000)} mono />
          <ProfileField lab="Tunjangan jabatan" v={rp(1500000)} mono />
          <ProfileField lab="Tunjangan lokasi"  v={rp(1000000)} mono />
          <ProfileField lab="Tipe lembur"       v="Per jam · 1.5×" />
          <ProfileField lab="Bank"              v="BCA · 1234 5678 4892" mono />
          <ProfileField lab="NPWP"              v="12.345.678.9-012.345" mono />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 surface rounded-xl p-5">
        <div className="text-[13px] font-bold tracking-tight">YTD payroll</div>
        <div className="mt-3 text-[28px] font-extrabold mono tracking-tight">{rp(34150000)}</div>
        <div className="text-[11px] text-subtle">4 bulan · net</div>
        <div className="mt-3 text-[11px] text-success-600 font-semibold">↑ 8.2% vs YTD 2025</div>
      </div>
    </div>
  );
}

function LeaveHistoryPanel() {
  return (
    <div className="surface rounded-xl overflow-hidden">
      <div className="px-5 h-12 flex items-center justify-between border-b border-token">
        <div className="text-[13px] font-bold tracking-tight">Riwayat cuti 2026</div>
        <span className="text-[11px] text-subtle">5 pengajuan · 7 hari terpakai · 10 sisa</span>
      </div>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
            <th className="px-5 py-2.5">No</th>
            <th className="px-3 py-2.5">Jenis</th>
            <th className="px-3 py-2.5">Periode</th>
            <th className="px-3 py-2.5">Hari</th>
            <th className="px-3 py-2.5">Alasan</th>
            <th className="px-3 py-2.5">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:var(--border)]">
          {[
            { id:'LV-2026-04891', t:'Tahunan',     p:'22–26 Mei', d:3, r:'Acara pernikahan saudara', s:'Pending SPV', tone:'warning' },
            { id:'LV-2026-04880', t:'Sakit',       p:'14 Mei',    d:1, r:'Demam',                    s:'Approved',    tone:'success' },
            { id:'LV-2026-04702', t:'Tahunan',     p:'02–05 Apr', d:2, r:'Liburan keluarga',         s:'Approved',    tone:'success' },
            { id:'LV-2026-04501', t:'Khusus',      p:'18 Feb',    d:1, r:'Anak masuk SD',            s:'Rejected',    tone:'danger' },
            { id:'LV-2026-04302', t:'Sakit',       p:'05–06 Jan', d:2, r:'Flu berat',                s:'Approved',    tone:'success' },
          ].map((r,i) => (
            <tr key={r.id} className="hover:bg-elev">
              <td className="px-5 py-2.5 mono">{r.id}</td>
              <td className="px-3 py-2.5"><MethodTypePill t={r.t} /></td>
              <td className="px-3 py-2.5 mono">{r.p}</td>
              <td className="px-3 py-2.5 font-bold mono">{r.d}</td>
              <td className="px-3 py-2.5 text-muted">{r.r}</td>
              <td className="px-3 py-2.5"><StatusPill tone={r.tone} icon={r.tone==='warning'?'clock':r.tone==='success'?'check':'x'}>{r.s}</StatusPill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AttendancePanel() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="surface rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Rate 90 hari</div><div className="text-[26px] font-extrabold mono">96.7%</div><div className="text-[11px] text-success-600">↑ 2.1%</div></div>
      <div className="surface rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Avg clock-in</div><div className="text-[26px] font-extrabold mono">05:56</div><div className="text-[11px] text-subtle">−4m dari shift</div></div>
      <div className="surface rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Overtime</div><div className="text-[26px] font-extrabold mono">14j</div><div className="text-[11px] text-subtle">90 hari</div></div>
    </div>
  );
}

function DocumentsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {[
        { l:'KTP',          n:'NIK-3201xxx',  s:'Aktif',         tone:'success', exp:'—' },
        { l:'SIM B2',       n:'B2-xxx',       s:'Berlaku',       tone:'success', exp:'21 bln' },
        { l:'SIO Excavator',n:'SIO-2023-002', s:'Akan habis',    tone:'warning', exp:'4 hari' },
        { l:'BPJS Kesehatan',n:'001234567',   s:'Aktif',         tone:'success', exp:'—' },
        { l:'Sertifikat K3',n:'K3-2024-099',  s:'Berlaku',       tone:'success', exp:'18 bln' },
        { l:'Medical Check',n:'MCU-2025-Q4',  s:'Sehat',         tone:'success', exp:'7 bln' },
      ].map(d => (
        <div key={d.l} className="surface rounded-xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
            <Icon name="file-badge" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold">{d.l}</div>
            <div className="text-[11px] text-subtle mono truncate">{d.n}</div>
          </div>
          <div className="text-right">
            <StatusPill tone={d.tone}>{d.s}</StatusPill>
            <div className="text-[10px] text-subtle mt-1">Exp: {d.exp}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ComingSoon({ label }) {
  return (
    <div className="surface rounded-xl p-10 text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-elev flex items-center justify-center text-subtle">
        <Icon name="bar-chart-3" size={24} />
      </div>
      <div className="mt-3 text-[14px] font-bold">Coming soon</div>
      <div className="text-[12px] text-subtle mt-1">{label}</div>
    </div>
  );
}

window.W4_LeaveDashboard  = W4_LeaveDashboard;
window.W5_EmployeeProfile = W5_EmployeeProfile;
