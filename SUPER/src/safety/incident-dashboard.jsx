// W8 — Incident Management Dashboard (HR / SO).

function HRSidebar({ collapsed, setCollapsed }) {
  const items = [
    { name: 'Dashboard',  icon: 'layout-dashboard' },
    { name: 'Karyawan',   icon: 'users' },
    { name: 'Attendance', icon: 'clock' },
    { name: 'Leave',      icon: 'calendar-days' },
    { name: 'Payroll',    icon: 'wallet' },
    { name: 'Safety',     icon: 'shield', active: true },
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
            <div className="text-[9px] text-subtle uppercase tracking-wider">Safety Portal</div>
          </div>
        )}
      </div>
      <div className="px-3 py-4 flex-1">
        {!collapsed && <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Menu</div>}
        <nav className="space-y-0.5">
          {items.map(i => (
            <a key={i.name}
               className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : 'px-3'} h-9 rounded-md text-[12.5px] font-medium transition-colors
                 ${i.active ? 'bg-danger-50 text-danger-700' : 'text-muted hover:bg-elev hover:text-[color:var(--text)]'}`}>
              <Icon name={i.icon} size={15} />
              {!collapsed && <span className="flex-1">{i.name}</span>}
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
    <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md bg-white border border-token text-[12px] font-semibold hover:border-danger-300 hover:bg-danger-50/30">
      {icon && <Icon name={icon} size={13} className="text-subtle" />}
      <span>{children}</span>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-danger-500 -ml-0.5" />}
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
    info:    'bg-info-50 text-info-600',
  };
  return (
    <div className="surface rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tones[tone]}`}>
          <Icon name={icon} size={17} />
        </div>
        {delta && <div className={`text-[11px] font-semibold ${delta.startsWith('+') ? 'text-danger-600' : 'text-success-600'} inline-flex items-center gap-1`}>
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
// Trend Line Chart
// ============================================================
const TREND_12 = [
  { m:'Jun \'25', t: 8 }, { m:'Jul', t:11 }, { m:'Agu', t:7  }, { m:'Sep', t:9  },
  { m:'Okt',      t:10}, { m:'Nov', t:6  }, { m:'Des', t:12 }, { m:'Jan \'26', t:14 },
  { m:'Feb',      t:9 }, { m:'Mar', t:7  }, { m:'Apr', t:5  }, { m:'Mei', t:13 },
];

function TrendChart() {
  const w = 720, h = 220, pad = { l: 40, r: 16, t: 12, b: 28 };
  const max = 16;
  const xStep = (w - pad.l - pad.r) / (TREND_12.length - 1);
  const yScale = (v) => h - pad.b - (v / max) * (h - pad.t - pad.b);
  const points = TREND_12.map((d, i) => [pad.l + i * xStep, yScale(d.t)]);
  const line = points.map(p => p.join(',')).join(' ');
  const area = `${pad.l},${h - pad.b} ${line} ${pad.l + (TREND_12.length-1)*xStep},${h - pad.b}`;
  return (
    <div className="surface rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[13px] font-bold tracking-tight">Incident trend — 12 bulan terakhir</div>
          <div className="text-[11px] text-subtle">Termasuk near-miss, first-aid, MTI, LTI, property damage</div>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-danger-500" /> Total</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm border-2 border-warning-500" /> Target ≤ 10</span>
        </div>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44">
          {/* Gridlines */}
          {[0, 4, 8, 12, 16].map(v => (
            <g key={v}>
              <line x1={pad.l} x2={w - pad.r} y1={yScale(v)} y2={yScale(v)} stroke="#e6e8ec" strokeDasharray="2 4" />
              <text x={pad.l - 8} y={yScale(v) + 4} fontSize="10" fill="#8b94a2" textAnchor="end" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}
          {/* Target line */}
          <line x1={pad.l} x2={w - pad.r} y1={yScale(10)} y2={yScale(10)} stroke="#EF9F27" strokeWidth="1.5" strokeDasharray="6 4" />
          {/* Area */}
          <polygon points={area} fill="#E24B4A" opacity="0.10" />
          {/* Line */}
          <polyline points={line} fill="none" stroke="#E24B4A" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p[0]} cy={p[1]} r="4" fill="#fff" stroke="#E24B4A" strokeWidth="2" />
              <text x={p[0]} y={h - 8} fontSize="10" fill="#5b6472" textAnchor="middle" fontFamily="Inter" fontWeight="600">{TREND_12[i].m}</text>
            </g>
          ))}
          {/* Highlighted current */}
          <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="7" fill="#E24B4A" />
          <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="11" fill="none" stroke="#E24B4A" strokeWidth="2" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
}

// ============================================================
// Pareto / Category bar chart
// ============================================================
const CATEGORIES = [
  { c:'Near miss',          n:42, color:'#EF9F27' },
  { c:'First aid',          n:21, color:'#378ADD' },
  { c:'Property damage',    n:14, color:'#F39800' },
  { c:'Medical treatment',  n:9,  color:'#E27040' },
  { c:'Environmental',      n:6,  color:'#1D9E75' },
  { c:'Lost time injury',   n:3,  color:'#E24B4A' },
  { c:'Other',              n:2,  color:'#5b6472' },
];

function CategoryChart() {
  const max = Math.max(...CATEGORIES.map(c => c.n));
  const total = CATEGORIES.reduce((s, c) => s + c.n, 0);
  // Cumulative %
  let cum = 0;
  const cumPct = CATEGORIES.map(c => { cum += c.n; return (cum / total) * 100; });
  const w = 540, h = 240, pad = { l: 16, r: 36, t: 12, b: 28 };
  const barW = (w - pad.l - pad.r) / CATEGORIES.length;
  const xCenter = (i) => pad.l + barW * (i + 0.5);
  const yCum = (pct) => pad.t + (1 - pct / 100) * (h - pad.t - pad.b);
  const linePts = cumPct.map((p, i) => `${xCenter(i)},${yCum(p)}`).join(' ');
  return (
    <div className="surface rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[13px] font-bold tracking-tight">Pareto by category — 12 bulan</div>
          <div className="text-[11px] text-subtle">Bar = jumlah · garis = cumulative % (80/20 rule)</div>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-52">
        {/* Y axis ticks */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={pad.l} x2={w - pad.r} y1={yCum(v)} y2={yCum(v)} stroke="#e6e8ec" strokeDasharray="2 4" />
            <text x={w - pad.r + 4} y={yCum(v) + 4} fontSize="9" fill="#8b94a2" fontFamily="JetBrains Mono">{v}%</text>
          </g>
        ))}
        {/* 80% reference */}
        <line x1={pad.l} x2={w - pad.r} y1={yCum(80)} y2={yCum(80)} stroke="#EF9F27" strokeWidth="1.5" strokeDasharray="6 4" />

        {/* Bars */}
        {CATEGORIES.map((c, i) => {
          const bh = (c.n / max) * (h - pad.t - pad.b) * 0.85;
          const x = pad.l + barW * i + 6;
          const bw = barW - 12;
          return (
            <g key={c.c}>
              <rect x={x} y={h - pad.b - bh} width={bw} height={bh} rx="3" fill={c.color} opacity="0.85" />
              <text x={x + bw/2} y={h - pad.b - bh - 6} fontSize="10" fill="#0f1115" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="700">{c.n}</text>
              <text x={x + bw/2} y={h - 10} fontSize="9" fill="#5b6472" fontFamily="Inter" fontWeight="600" textAnchor="middle">{c.c.split(' ')[0]}</text>
            </g>
          );
        })}

        {/* Pareto line */}
        <polyline points={linePts} fill="none" stroke="#E24B4A" strokeWidth="2" />
        {cumPct.map((p, i) => (
          <circle key={i} cx={xCenter(i)} cy={yCum(p)} r="3.5" fill="#fff" stroke="#E24B4A" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
}

// ============================================================
// Location heatmap
// ============================================================
const LOC_MATRIX = [
  // rows: PIT A, PIT B, PIT C, Workshop, Camp, Plant
  // cols: Jun..Mei (12 months)
  { loc:'PIT A',     d:[2,3,1,2,4,1,3,4,2,1,1,5] },
  { loc:'PIT B',     d:[3,4,2,3,2,2,4,5,3,2,1,4] },
  { loc:'PIT C',     d:[1,2,1,2,1,1,2,3,1,2,1,2] },
  { loc:'Workshop',  d:[1,1,2,1,2,1,2,1,2,1,1,1] },
  { loc:'Camp',      d:[0,0,1,0,0,0,0,0,0,0,0,0] },
  { loc:'Plant',     d:[1,1,0,1,1,1,1,1,1,1,1,1] },
];
const MONTHS = ['Jun','Jul','Agu','Sep','Okt','Nov','Des','Jan','Feb','Mar','Apr','Mei'];

function LocationHeatmap() {
  const max = Math.max(...LOC_MATRIX.flatMap(r => r.d));
  const color = (v) => {
    if (v === 0) return '#f2f3f5';
    const t = v / max;
    // Interpolate from #FEF4DE → #EF9F27 → #E24B4A
    if (t < 0.5) {
      const k = t * 2;
      return mixColor('#FEF4DE','#EF9F27', k);
    }
    return mixColor('#EF9F27','#E24B4A', (t - 0.5) * 2);
  };
  return (
    <div className="surface rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[13px] font-bold tracking-tight">Heatmap — Incident by location & month</div>
          <div className="text-[11px] text-subtle">Mei 2026 sebagian besar terkonsentrasi di PIT A & B</div>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-subtle">Less</span>
          {[0, 1, 2, 3, 4, 5].map(v => <span key={v} className="w-4 h-4 rounded" style={{ background: color(v) }} />)}
          <span className="text-subtle">More</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse text-[10px]">
          <thead>
            <tr>
              <th className="w-20 px-2 text-left text-[10px] font-bold uppercase tracking-wider text-subtle"></th>
              {MONTHS.map(m => <th key={m} className="px-1 text-[9px] font-bold uppercase tracking-wider text-subtle">{m}</th>)}
              <th className="pl-3 text-[9px] font-bold uppercase tracking-wider text-subtle">Total</th>
            </tr>
          </thead>
          <tbody>
            {LOC_MATRIX.map(row => {
              const total = row.d.reduce((s,v)=>s+v,0);
              return (
                <tr key={row.loc}>
                  <td className="text-[11px] font-bold py-1 pr-2">{row.loc}</td>
                  {row.d.map((v, i) => (
                    <td key={i} className="p-0.5">
                      <div className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold mono" style={{ background: color(v), color: v >= max * 0.6 ? '#fff' : '#0f1115' }}>
                        {v || ''}
                      </div>
                    </td>
                  ))}
                  <td className="pl-3 mono font-extrabold text-[12px]">{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function mixColor(a, b, t) {
  const ah = parseInt(a.slice(1), 16), bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const r = Math.round(ar + (br - ar) * t), g = Math.round(ag + (bg - ag) * t), bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

// ============================================================
// Incident table
// ============================================================
const INCIDENTS = [
  { id:'INC-2026-04891', cat:'Near miss',         sev:3, loc:'PIT B · Bench 4',   rep:'Budi Santoso',   nik:'NSR-009281', date:'19 Mei · 14:22', status:'Investigating',  tone:'warning', cause:'Blind spot LV' },
  { id:'INC-2026-04880', cat:'First aid',         sev:2, loc:'Workshop',           rep:'Siti Rahayu',    nik:'NSR-007123', date:'18 Mei · 09:12', status:'Closed',         tone:'success', cause:'Cut · jari' },
  { id:'INC-2026-04872', cat:'Property damage',   sev:3, loc:'Conveyor C-12',      rep:'Joko Pranoto',   nik:'KNC-002104', date:'17 Mei · 16:48', status:'Investigating',  tone:'warning', cause:'Belt rip' },
  { id:'INC-2026-04802', cat:'Medical treatment', sev:4, loc:'PIT A · Bench 2',    rep:'Lina Marbun',    nik:'NSR-008092', date:'15 Mei · 11:34', status:'In-progress',    tone:'info',    cause:'Heat exhaustion' },
  { id:'INC-2026-04701', cat:'Environmental',     sev:2, loc:'Tank Farm',          rep:'Eko Saputra',    nik:'NSR-005412', date:'12 Mei · 08:02', status:'Closed',         tone:'success', cause:'Spill kecil' },
  { id:'INC-2026-04612', cat:'LTI',               sev:5, loc:'PIT B · Loading',    rep:'Hartono S.',     nik:'NSR-004812', date:'05 Mei · 19:34', status:'Closed',         tone:'danger',  cause:'Jatuh dari unit' },
];

function SevPill({ n }) {
  const colors = ['#1D9E75','#86C26B','#EF9F27','#E27040','#E24B4A'];
  const labels = ['Trivial','Minor','Moderate','Major','Critical'];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-5 h-5 rounded text-[10px] mono font-extrabold text-white flex items-center justify-center" style={{ background: colors[n-1] }}>{n}</span>
      <span className="text-[11px] font-semibold">{labels[n-1]}</span>
    </span>
  );
}

function IncidentDashboard() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
          <div>
            <div className="text-[10px] text-subtle uppercase tracking-wider">Safety · Incident Management</div>
            <div className="text-[14px] font-bold tracking-tight">97 incident · 12 bulan · 5 bulan ini</div>
          </div>
          <div className="flex-1" />
          <div className="bg-elev rounded-md px-3 h-9 flex items-center gap-2 text-[12px] text-subtle min-w-[260px]">
            <Icon name="search" size={14} />
            <span>Cari incident ID, lokasi, atau pelapor…</span>
            <span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span>
          </div>
          <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative">
            <Icon name="bell" size={17} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" />
          </button>
          <div className="h-6 w-px bg-[color:var(--border)]" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-danger-500 text-white flex items-center justify-center text-[11px] font-bold">SO</div>
            <div className="hidden lg:block leading-tight">
              <div className="text-[12px] font-bold">Dewi Anggraini</div>
              <div className="text-[10px] text-subtle">Safety Officer</div>
            </div>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar">Jun '25 – Mei '26</FilterChip>
              <FilterChip icon="layers">Semua kategori</FilterChip>
              <FilterChip icon="bar-chart-3" dot>Severity ≥ 3</FilterChip>
              <FilterChip icon="check-circle-2">Semua status</FilterChip>
              <FilterChip icon="map-pin">3 lokasi</FilterChip>
              <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-[12px] font-semibold text-subtle hover:bg-elev">
                <Icon name="x" size={12} /> Reset
              </button>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="download">Export</Btn>
              <Btn variant="danger" size="sm" icon="plus">+ Quick add incident</Btn>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="alert-triangle" label="Total bulan ini"     value="5"   tone="danger" delta="-8" sub="vs 13 bulan lalu" />
              <KPICard icon="circle-alert"   label="Severity ≥ 4"        value="1"   tone="warning"          sub="LTI bulan ini · 0" />
              <KPICard icon="hard-hat"       label="Hari sejak LTI"      value="14"  tone="success"          sub="Reset 05 Mei" />
              <KPICard icon="users"          label="Personnel terlibat"  value="9"   tone="info"             sub="3 mengikuti CAPA" />
              <KPICard icon="check-circle-2" label="Closed rate"         value="78%" tone="success" delta="+6%" sub="76 dari 97" />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 lg:col-span-7"><TrendChart /></div>
              <div className="col-span-12 lg:col-span-5"><CategoryChart /></div>
            </div>

            <LocationHeatmap />

            {/* Table */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-5 h-12 flex items-center justify-between border-b border-token">
                <div className="text-[13px] font-bold tracking-tight">Recent incidents — {INCIDENTS.length} dari 97</div>
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
                      <th className="px-5 py-2.5 w-10"><input type="checkbox" className="accent-danger-500" /></th>
                      <th className="px-3 py-2.5 font-bold">Incident ID</th>
                      <th className="px-3 py-2.5 font-bold">Kategori</th>
                      <th className="px-3 py-2.5 font-bold">Severity</th>
                      <th className="px-3 py-2.5 font-bold">Lokasi</th>
                      <th className="px-3 py-2.5 font-bold">Pelapor</th>
                      <th className="px-3 py-2.5 font-bold">Tanggal</th>
                      <th className="px-3 py-2.5 font-bold">Cause</th>
                      <th className="px-3 py-2.5 font-bold">Status</th>
                      <th className="px-3 py-2.5 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {INCIDENTS.map(r => (
                      <tr key={r.id} className="hover:bg-elev cursor-pointer">
                        <td className="px-5 py-2.5"><input type="checkbox" className="accent-danger-500" /></td>
                        <td className="px-3 py-2.5 mono font-bold">{r.id}</td>
                        <td className="px-3 py-2.5"><span className="inline-flex items-center px-2 h-5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-elev">{r.cat}</span></td>
                        <td className="px-3 py-2.5"><SevPill n={r.sev} /></td>
                        <td className="px-3 py-2.5 text-muted">{r.loc}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">{r.rep.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                            <div>
                              <div className="font-semibold">{r.rep}</div>
                              <div className="text-[10px] text-subtle mono">{r.nik}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 mono">{r.date}</td>
                        <td className="px-3 py-2.5 text-muted">{r.cause}</td>
                        <td className="px-3 py-2.5"><StatusPill tone={r.tone} icon={r.tone==='warning'?'clock':r.tone==='success'?'check':r.tone==='danger'?'x':'activity'}>{r.status}</StatusPill></td>
                        <td className="px-3 py-2.5"><Icon name="chevron-right" size={14} className="text-subtle" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 h-12 border-t border-token flex items-center justify-between text-[12px]">
                <div className="text-subtle">Menampilkan 1–{INCIDENTS.length} dari 97</div>
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

window.IncidentDashboard = IncidentDashboard;
