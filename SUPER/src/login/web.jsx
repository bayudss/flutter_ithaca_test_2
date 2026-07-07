// Web screens — 2.1 Login (split), 2.2 HR Dashboard.

function BrowserChrome({ url, children, height = 720 }) {
  return (
    <div className="rounded-xl border border-token overflow-hidden shadow-xl bg-white" style={{ height }}>
      <div className="h-9 bg-elev border-b border-token flex items-center px-3 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ED6A5E]" />
          <span className="w-3 h-3 rounded-full bg-[#F5BF4F]" />
          <span className="w-3 h-3 rounded-full bg-[#62C455]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-token rounded-md h-6 px-3 text-[11px] mono text-subtle inline-flex items-center gap-1.5 min-w-[260px] justify-center">
            <Icon name="lock" size={11} />
            {url}
          </div>
        </div>
        <div className="w-12" />
      </div>
      <div className="h-[calc(100%-36px)]">{children}</div>
    </div>
  );
}

// =================== 2.1 Login (split) ===================
function WebLogin() {
  const [showPw, setShowPw] = React.useState(false);
  return (
    <div className="grid grid-cols-2 h-full">
      {/* LEFT — branding */}
      <div className="relative overflow-hidden text-white p-12 flex flex-col"
           style={{
             background: 'linear-gradient(160deg, #0A2E54 0%, #0C3C6E 40%, #1670C4 90%)',
           }}>
        {/* Subtle topo lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 600 720" preserveAspectRatio="none">
          {Array.from({length: 14}).map((_,i) => (
            <path key={i} d={`M -50,${120 + i*40} C 100,${100 + i*40 - 30} 250,${180 + i*40 - 15} 400,${130 + i*40} S 700,${160 + i*40} 800,${120 + i*40}`}
                  fill="none" stroke="#fff" strokeWidth="1" />
          ))}
        </svg>
        {/* Mountain silhouette bottom */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 600 200" preserveAspectRatio="none" style={{ height: 200 }}>
          <path d="M0,200 L0,120 L80,60 L150,100 L240,40 L320,80 L420,30 L500,70 L600,40 L600,200 Z" fill="rgba(0,0,0,0.4)" />
          <path d="M0,200 L0,150 L60,110 L130,140 L210,90 L290,120 L380,80 L470,110 L560,90 L600,100 L600,200 Z" fill="rgba(0,0,0,0.55)" />
        </svg>
        {/* Big safety orange sun */}
        <div className="absolute -right-12 top-16 w-56 h-56 rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(243,152,0,0.55), rgba(243,152,0,0) 65%)' }} />

        <div className="relative flex items-center gap-3">
          <BrandMark size={42} ring={false} />
          <div>
            <div className="text-[16px] font-bold tracking-tight leading-tight">Primacom - SuperApps</div>
            <div className="text-[11px] text-white/70">Smart Workforce & Operations</div>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col justify-center max-w-md mt-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-safety-300">HR · Admin · Safety Officer</div>
          <h2 className="mt-3 text-[36px] font-extrabold tracking-tight leading-[1.1]" style={{ letterSpacing: '-0.025em' }}>
            Satu portal untuk seluruh{' '}
            <span className="text-safety-400">operasional</span>{' '}tambang.
          </h2>
          <p className="mt-4 text-[14px] text-white/75 leading-relaxed">
            Kelola attendance, payroll, permit-to-work, dan emergency response untuk pekerja organic dan kontraktor — di satu tempat.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              { num: '4,820', label: 'Pekerja aktif' },
              { num: '127',   label: 'Kontraktor' },
              { num: '99.4%', label: 'Uptime SLA' },
            ].map(s => (
              <div key={s.label} className="bg-white/8 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
                <div className="text-[20px] font-extrabold tracking-tight mono">{s.num}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-between text-[11px] text-white/60">
          <div>© 2026 PT Primacom</div>
          <div className="flex items-center gap-1.5">
            <Icon name="shield-check" size={12} />
            ISO 27001 · SMK3 Sertifikat
          </div>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-sm">
          <div className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-info-50 text-info-700 text-[10px] font-bold mb-5">
            <Icon name="shield-check" size={11} />
            KEYCLOAK SSO · keycloak.primacom.co.id
          </div>
          <h1 className="text-[28px] font-extrabold tracking-tight leading-tight">Masuk ke akun Anda</h1>
          <p className="text-[13px] text-muted mt-1.5">Gunakan kredensial korporat Primacom.</p>

          <div className="mt-7 space-y-3.5">
            <TextField label="NIK / Employee ID" icon="user" placeholder="NSR-000000" value="HR-001029" onChange={()=>{}} />
            <TextField
              label="Password"
              type={showPw ? 'text' : 'password'}
              icon="lock"
              value="••••••••••"
              onChange={()=>{}}
              suffix={
                <button onClick={()=>setShowPw(s=>!s)} className="text-subtle hover:text-[color:var(--text)] w-8 h-8 -mr-1 flex items-center justify-center">
                  <Icon name={showPw ? 'eye-off' : 'eye'} size={16} />
                </button>
              }
            />

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <span className="w-5 h-5 rounded-md bg-brand-500 flex items-center justify-center">
                  <Icon name="check" size={14} className="text-white" />
                </span>
                <span>Ingat saya 30 hari</span>
              </label>
              <a className="text-brand-700 font-semibold">Lupa password?</a>
            </div>

            <PrimaryBtn icon="log-in" size="lg">Masuk</PrimaryBtn>

            <div className="flex items-center gap-3 text-[11px] text-subtle py-1">
              <div className="flex-1 h-px bg-[color:var(--border)]" />
              ATAU
              <div className="flex-1 h-px bg-[color:var(--border)]" />
            </div>

            <button className="w-full h-12 rounded-xl border border-token-strong bg-white text-[13px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-elev">
              <Icon name="building-2" size={18} className="text-safety-600" />
              Login Kontraktor (Tenant berbeda)
            </button>
          </div>

          <div className="mt-6 text-[11px] text-subtle flex items-center justify-between">
            <span>Butuh bantuan?</span>
            <a className="text-brand-700 font-semibold inline-flex items-center gap-1">
              <Icon name="life-buoy" size={12} /> Hubungi IT Helpdesk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== 2.2 HR Dashboard ===================
function HRSidebar() {
  const items = [
    { name: 'Dashboard',  icon: 'layout-dashboard', active: true },
    { name: 'Karyawan',   icon: 'users' },
    { name: 'Attendance', icon: 'clock' },
    { name: 'Leave',      icon: 'calendar-days', badge: '12' },
    { name: 'Payroll',    icon: 'wallet' },
    { name: 'Kontraktor', icon: 'truck' },
    { name: 'Laporan',    icon: 'bar-chart-3' },
    { name: 'Pengaturan', icon: 'settings' },
  ];
  return (
    <aside className="w-60 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-token">
        <BrandMark size={30} ring={false} />
        <div className="leading-tight">
          <div className="text-[12px] font-bold tracking-tight">Primacom</div>
          <div className="text-[9px] text-subtle uppercase tracking-wider">HR Portal</div>
        </div>
      </div>
      <div className="px-3 py-4 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Menu</div>
        <nav className="space-y-0.5">
          {items.map(i => (
            <a key={i.name}
               className={`flex items-center gap-2.5 px-3 h-9 rounded-md text-[12.5px] font-medium transition-colors
                 ${i.active ? 'bg-brand-50 text-brand-700' : 'text-muted hover:bg-elev hover:text-[color:var(--text)]'}`}>
              <Icon name={i.icon} size={15} />
              <span className="flex-1">{i.name}</span>
              {i.badge && <span className="text-[9px] font-bold bg-danger-500 text-white px-1.5 rounded-full">{i.badge}</span>}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-token p-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-[12px]">AW</div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold truncate">Andi Wijaya</div>
            <div className="text-[10px] text-subtle truncate">HR Lead · Kantor Pusat</div>
          </div>
          <Icon name="chevron-up" size={14} className="text-subtle" />
        </div>
      </div>
    </aside>
  );
}

function KPICard({ icon, label, value, delta, deltaTone='success', sub }) {
  const deltaColor = deltaTone === 'success' ? 'text-success-600' : deltaTone === 'danger' ? 'text-danger-600' : 'text-warning-600';
  const deltaIcon  = deltaTone === 'success' ? 'trending-up' : 'trending-down';
  return (
    <div className="surface rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
          <Icon name={icon} size={17} />
        </div>
        <Icon name="more-horizontal" size={16} className="text-subtle" />
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-wider text-subtle font-semibold">{label}</div>
      <div className="mt-0.5 text-[26px] font-extrabold tracking-tight mono">{value}</div>
      <div className="mt-1 flex items-center justify-between">
        <div className={`text-[11px] font-semibold inline-flex items-center gap-1 ${deltaColor}`}>
          <Icon name={deltaIcon} size={12} /> {delta}
        </div>
        {sub && <div className="text-[11px] text-subtle">{sub}</div>}
      </div>
    </div>
  );
}

function AttendanceChart() {
  const days = [
    { d: 'Sen', present: 92, late: 5 },
    { d: 'Sel', present: 95, late: 3 },
    { d: 'Rab', present: 88, late: 7 },
    { d: 'Kam', present: 94, late: 4 },
    { d: 'Jum', present: 91, late: 6 },
    { d: 'Sab', present: 86, late: 9 },
    { d: 'Min', present: 90, late: 5 },
  ];
  return (
    <div className="surface rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[14px] font-bold tracking-tight">Attendance — 7 hari terakhir</div>
          <div className="text-[11px] text-subtle mt-0.5">Hadir tepat waktu vs terlambat (% dari total karyawan aktif)</div>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-500" /> Hadir</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-warning-500" /> Terlambat</div>
        </div>
      </div>
      <div className="mt-5 flex items-stretch gap-3 h-48">
        {days.map((d, i) => {
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[10px] mono font-bold text-muted">{d.present}%</div>
              <div className="flex-1 w-full flex flex-col justify-end gap-0.5 min-h-0">
                <div className="bar bg-warning-500 rounded-t" style={{ height: `${d.late * 0.9}%` }} />
                <div className="bar bg-brand-500 rounded-b" style={{ height: `${d.present * 0.9}%` }} />
              </div>
              <div className="text-[11px] text-subtle font-semibold">{d.d}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityFeed() {
  const items = [
    { icon:'user-plus', tone:'success', title:'2 karyawan baru onboarded', meta:'PT KNC · Operator', time:'12m' },
    { icon:'calendar-x', tone:'warning', title:'SIO operator akan habis (3)', meta:'Perpanjangan dibutuhkan', time:'1j' },
    { icon:'check-circle-2', tone:'success', title:'Payroll April rilis', meta:'4,820 karyawan · IDR 38.4 M', time:'2j' },
    { icon:'alert-octagon', tone:'danger', title:'Incident dilaporkan', meta:'Pit C · Near-miss · open', time:'3j' },
    { icon:'clock', tone:'info', title:'Shift Pagi check-in 96%', meta:'5 belum hadir', time:'5j' },
    { icon:'shield-check', tone:'brand', title:'PTW disetujui', meta:'Cold work · ID#PTW-04891', time:'6j' },
  ];
  const map = {
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger:  'bg-danger-50 text-danger-500',
    info:    'bg-info-50 text-info-600',
    brand:   'bg-brand-50 text-brand-600',
  };
  return (
    <div className="surface rounded-xl">
      <div className="px-4 h-12 flex items-center justify-between border-b border-token">
        <div className="text-[13px] font-bold tracking-tight">Recent activity</div>
        <a className="text-[11px] font-semibold text-brand-700">Lihat semua</a>
      </div>
      <div className="divide-y divide-[color:var(--border)] max-h-[440px] overflow-y-auto">
        {items.map((a, i) => (
          <div key={i} className="px-4 py-3 flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${map[a.tone]}`}>
              <Icon name={a.icon} size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold leading-tight">{a.title}</div>
              <div className="text-[11px] text-subtle truncate">{a.meta}</div>
            </div>
            <div className="text-[10px] text-subtle whitespace-nowrap">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HRDashboard() {
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
          <div>
            <div className="text-[10px] text-subtle uppercase tracking-wider">Dashboard</div>
            <div className="text-[14px] font-bold tracking-tight">Selamat datang kembali, Andi</div>
          </div>
          <div className="flex-1" />
          <div className="bg-elev rounded-md px-3 h-9 flex items-center gap-2 text-[12px] text-subtle min-w-[280px]">
            <Icon name="search" size={14} />
            <span>Cari NIK, nama, dept…</span>
            <span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span>
          </div>
          <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative">
            <Icon name="bell" size={17} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" />
          </button>
          <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center">
            <Icon name="help-circle" size={17} />
          </button>
          <div className="h-6 w-px bg-[color:var(--border)]" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-[11px] font-bold">AW</div>
            <Icon name="chevron-down" size={14} className="text-subtle" />
          </div>
        </header>

        {/* Main body */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-12 gap-5 p-6">
            {/* KPIs */}
            <div className="col-span-12 lg:col-span-9 space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <KPICard icon="users"           label="Karyawan aktif"   value="4,820" delta="+12 bln ini" sub="Organic + kontraktor" />
                <KPICard icon="clock"           label="Attendance hari ini" value="94.2%" delta="+1.4% vs kemarin" />
                <KPICard icon="file-clock"      label="Pending leave"     value="12"    delta="-3 hari ini" deltaTone="danger" sub="Approval HR" />
                <KPICard icon="alert-octagon"   label="Open incident"     value="3"     delta="+1 hari ini"      deltaTone="warning" sub="2 near-miss, 1 LTI" />
              </div>

              <AttendanceChart />

              {/* Pending approvals table */}
              <div className="surface rounded-xl overflow-hidden">
                <div className="px-5 h-12 flex items-center justify-between border-b border-token">
                  <div className="text-[13px] font-bold tracking-tight">Pending leave approvals</div>
                  <div className="flex items-center gap-2">
                    <button className="text-[11px] h-8 px-2.5 rounded-md hover:bg-elev inline-flex items-center gap-1.5"><Icon name="filter" size={13} /> Filter</button>
                    <button className="text-[11px] h-8 px-2.5 rounded-md hover:bg-elev inline-flex items-center gap-1.5"><Icon name="download" size={13} /> Export</button>
                  </div>
                </div>
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                      <th className="px-5 py-2.5 font-bold">Karyawan</th>
                      <th className="px-3 py-2.5 font-bold">Tipe</th>
                      <th className="px-3 py-2.5 font-bold">Periode</th>
                      <th className="px-3 py-2.5 font-bold">Diajukan</th>
                      <th className="px-3 py-2.5 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {[
                      { n:'Siti Rahayu',   nik:'NSR-009281', t:'Sakit',   p:'19–20 Mei', d:'2j', tone:'warning' },
                      { n:'Joko Pranoto',  nik:'KNC-002104', t:'Tahunan', p:'22–24 Mei', d:'5j', tone:'info' },
                      { n:'Lina Marbun',   nik:'NSR-007123', t:'Cuti besar', p:'1–14 Jun', d:'1 hari', tone:'brand' },
                      { n:'Eko Saputra',   nik:'NSR-008092', t:'Sakit',   p:'19 Mei',    d:'4j', tone:'warning' },
                    ].map((r,i) => (
                      <tr key={i} className="hover:bg-elev">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-brand-500 text-white text-[11px] font-bold flex items-center justify-center">{r.n.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                            <div>
                              <div className="font-semibold">{r.n}</div>
                              <div className="text-[10px] text-subtle mono">{r.nik}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex items-center px-2 h-6 rounded-md text-[11px] font-semibold
                            ${r.tone==='warning' ? 'bg-warning-50 text-warning-700' : r.tone==='info' ? 'bg-info-50 text-info-700' : 'bg-brand-50 text-brand-700'}`}>{r.t}</span>
                        </td>
                        <td className="px-3 py-3 text-muted">{r.p}</td>
                        <td className="px-3 py-3 text-subtle">{r.d}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5 justify-end">
                            <button className="h-8 px-2.5 rounded-md text-[11px] font-semibold bg-success-500 text-white inline-flex items-center gap-1"><Icon name="check" size={12} /> Setujui</button>
                            <button className="h-8 px-2.5 rounded-md text-[11px] font-semibold border border-token text-muted hover:bg-elev">Tolak</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right rail */}
            <div className="col-span-12 lg:col-span-3 space-y-5">
              <ActivityFeed />
              {/* Quick stats card */}
              <div className="rounded-xl p-5 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1670C4 0%, #0F4C8A 100%)' }}>
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-safety-500/30" />
                <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-safety-500/15" />
                <div className="relative">
                  <Icon name="shield-check" size={20} className="text-safety-300" />
                  <div className="mt-3 text-[20px] font-extrabold tracking-tight leading-tight">421 hari tanpa LTI</div>
                  <div className="text-[11px] text-white/75 mt-1">Lost-time injury · sejak 25 Mar 2025</div>
                  <button className="mt-4 text-[11px] font-bold bg-white/15 hover:bg-white/25 h-8 px-3 rounded-md inline-flex items-center gap-1.5">
                    <Icon name="bar-chart-3" size={13} /> Lihat safety report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.BrowserChrome = BrowserChrome;
window.WebLogin = WebLogin;
window.HRDashboard = HRDashboard;
