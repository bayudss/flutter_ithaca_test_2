// Catering — FAC Admin (W4-W9).

// ============================================================
// Shared FAC sidebar
// ============================================================
function FacSidebar({ collapsed, setCollapsed, current='dashboard' }) {
  const groups = [
    { title:'OPERATIONS', items:[
      { id:'dashboard', name:'Dashboard',  icon:'layout-dashboard' },
      { id:'monitor',   name:'Live monitor',icon:'radar' },
      { id:'forecast',  name:'Forecast',    icon:'line-chart', badge:'!' },
    ]},
    { title:'PLANNING', items:[
      { id:'menu',      name:'Menu planning',icon:'calendar-range' },
      { id:'vendor',    name:'Vendor',       icon:'truck' },
    ]},
    { title:'INSIGHTS', items:[
      { id:'feedback',  name:'Feedback',  icon:'message-square', badge:'4' },
      { id:'reports',   name:'Laporan',   icon:'bar-chart-3' },
    ]},
  ];
  return (
    <aside className={`shrink-0 border-r border-token bg-white flex flex-col transition-all duration-200 ${collapsed?'w-[68px]':'w-60'}`}>
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-token">
        <BrandMark size={30} />
        {!collapsed && (
          <div className="leading-tight">
            <div className="text-[12px] font-bold tracking-tight">Nusaraya</div>
            <div className="text-[9px] text-cater-600 uppercase tracking-wider font-bold">FAC · Catering</div>
          </div>
        )}
      </div>
      <div className="px-3 py-3 flex-1 overflow-y-auto">
        {groups.map(g => (
          <div key={g.title} className="mb-4">
            {!collapsed && <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-1.5">{g.title}</div>}
            <nav className="space-y-0.5">
              {g.items.map(i => {
                const active = i.id === current;
                return (
                  <a key={i.name}
                     className={`flex items-center gap-2.5 ${collapsed?'justify-center':'px-3'} h-9 rounded-md text-[12.5px] font-medium transition-colors
                       ${active?'bg-cater-50 text-cater-700':'text-muted hover:bg-elev hover:text-[color:var(--text)]'}`}>
                    <Icon name={i.icon} size={15} />
                    {!collapsed && <span className="flex-1">{i.name}</span>}
                    {!collapsed && i.badge && (
                      <span className={`text-[9px] font-bold px-1.5 rounded-full ${i.badge==='!'?'bg-warning-500 text-white':'bg-danger-500 text-white'}`}>{i.badge}</span>
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
      <button onClick={() => setCollapsed(c=>!c)} className="border-t border-token h-10 text-[11px] font-semibold text-subtle hover:bg-elev inline-flex items-center justify-center gap-1.5">
        <Icon name={collapsed?'chevron-right':'chevron-left'} size={14} />
        {!collapsed && 'Collapse'}
      </button>
    </aside>
  );
}

function FacTopBar({ title, sub }) {
  return (
    <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
      <div>
        <div className="text-[10px] text-subtle uppercase tracking-wider">{sub}</div>
        <div className="text-[14px] font-bold tracking-tight">{title}</div>
      </div>
      <div className="flex-1" />
      <div className="bg-elev rounded-md px-3 h-9 flex items-center gap-2 text-[12px] text-subtle min-w-[260px]">
        <Icon name="search" size={14} />
        <span>Cari menu, vendor, pekerja…</span>
        <span className="ml-auto px-1.5 py-0.5 bg-white border border-token rounded text-[10px] mono">⌘K</span>
      </div>
      <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center relative">
        <Icon name="bell" size={17} />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500" />
      </button>
      <div className="h-6 w-px bg-[color:var(--border)]" />
      <div className="flex items-center gap-2">
        <Avatar name="Maya Saputri" size={32} tone="cater" />
        <div className="hidden lg:block leading-tight">
          <div className="text-[12px] font-bold">Maya Saputri</div>
          <div className="text-[10px] text-subtle">FAC Lead</div>
        </div>
        <Icon name="chevron-down" size={14} className="text-subtle" />
      </div>
    </header>
  );
}

function FilterChip({ icon, children, dot, tone }) {
  const t = tone==='cater'?'border-cater-300 bg-cater-50 text-cater-700':'border-token bg-white';
  return (
    <button className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-md ${t} text-[12px] font-semibold hover:border-cater-300 hover:bg-cater-50/40`}>
      {icon && <Icon name={icon} size={13} className="text-subtle" />}
      <span>{children}</span>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-cater-500 -ml-0.5" />}
      <Icon name="chevron-down" size={13} className="text-subtle" />
    </button>
  );
}

// ============================================================
// W4 — Catering Dashboard
// ============================================================
function FacDashboard() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="h-full flex bg-elev">
      <FacSidebar collapsed={collapsed} setCollapsed={setCollapsed} current="dashboard" />
      <div className="flex-1 flex flex-col min-w-0">
        <FacTopBar title="Dashboard Catering — Selasa, 19 Mei 2026" sub="Catering · FAC" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Banner */}
            <div className="rounded-xl p-4 flex items-center gap-4 text-white relative overflow-hidden"
                 style={{ background:'linear-gradient(120deg, #E68506 0%, #BA6A05 100%)' }}>
              <div className="absolute -right-8 -top-12 w-40 h-40 rounded-full bg-white/10" />
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Icon name="sun" size={22} />
              </div>
              <div className="relative flex-1">
                <div className="text-[11px] font-bold uppercase tracking-wider opacity-90">Slot Siang aktif</div>
                <div className="text-[18px] font-extrabold tracking-tight">11:30 – 13:30 · 1h 23m tersisa</div>
              </div>
              <div className="relative flex items-center gap-6 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-wider opacity-80 font-bold">Velocity</div>
                  <div className="text-[18px] font-extrabold mono">142 <span className="text-[11px] opacity-80 font-bold">/ min</span></div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider opacity-80 font-bold">vs expected</div>
                  <div className="text-[18px] font-extrabold mono inline-flex items-center gap-1"><Icon name="trending-up" size={16} /> +3.4%</div>
                </div>
                <button className="h-10 px-4 rounded-lg bg-white text-cater-700 text-[12px] font-extrabold inline-flex items-center gap-1.5">
                  <Icon name="bell-ring" size={14} /> Notify kitchen
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar" tone="cater">19 Mei 2026</FilterChip>
              <FilterChip icon="map-pin" dot>Semua mess</FilterChip>
              <FilterChip icon="truck">Semua vendor</FilterChip>
              <FilterChip icon="users">Organik + KNC</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="download">Export</Btn>
              <Btn variant="cater" size="sm" icon="sliders">Adjust forecast</Btn>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="ticket"          label="Voucher hari ini" value="12,450" tone="cater"   sub="3 slot · 5 lokasi" />
              <KPICard icon="check-circle-2"  label="Sudah diklaim"     value="8,234"  tone="success" sub="66.1% dari total" delta="+1.2%" />
              <KPICard icon="x-circle"        label="No-show rate"      value="8.0%"   tone="warning" sub="Target <10%"     delta="-0.6%" />
              <KPICard icon="heart"           label="Avg satisfaction"  value="4.3"    tone="herb"    sub="dari 1,284 rating" delta="+0.1" />
            </div>

            {/* 3 slot status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* Sarapan */}
              <Card padding="p-5" title={null}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-cater-50 text-cater-600 flex items-center justify-center"><Icon name="sunrise" size={18} /></div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Sarapan</div>
                      <div className="text-[14px] font-extrabold tracking-tight">05:00 – 07:30</div>
                    </div>
                  </div>
                  <StatusPill tone="success" icon="check-circle-2">Concluded</StatusPill>
                </div>
                {/* Pie */}
                <div className="mt-4 flex items-center gap-4">
                  <PieChart claimed={3782} noshow={418} total={4200} />
                  <div className="flex-1 space-y-1.5 text-[11.5px]">
                    <div className="flex justify-between"><span className="text-muted">Forecast</span><span className="mono font-bold">4,200</span></div>
                    <div className="flex justify-between"><span className="text-success-700">Claimed</span><span className="mono font-bold text-success-700">3,782 (90%)</span></div>
                    <div className="flex justify-between"><span className="text-danger-700">No-show</span><span className="mono font-bold text-danger-700">418 (10%)</span></div>
                    <div className="flex justify-between"><span className="text-muted">Waste estim.</span><span className="mono font-bold">3.8%</span></div>
                  </div>
                </div>
              </Card>

              {/* Siang */}
              <Card padding="p-5" title={null} className="ring-2 ring-cater-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-cater-500 text-white flex items-center justify-center"><Icon name="sun" size={18} /></div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-cater-600 font-bold">Siang · live</div>
                      <div className="text-[14px] font-extrabold tracking-tight">11:30 – 13:30</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 h-6 rounded-md bg-cater-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Live
                  </span>
                </div>
                {/* Live counter */}
                <div className="mt-4">
                  <div className="text-[28px] font-extrabold mono tracking-tight">
                    2,891 <span className="text-[14px] text-subtle font-bold">/ 4,250</span>
                  </div>
                  <div className="text-[11px] text-muted">68% diklaim · 1h 23m sisa</div>
                  <div className="mt-2.5 h-2.5 rounded-full bg-cream overflow-hidden">
                    <div className="h-full rounded-full" style={{ width:'68%', background:'linear-gradient(90deg,#F39800,#E68506)' }} />
                  </div>
                  {/* mini velocity line */}
                  <div className="mt-3 h-12">
                    <VelocityChart />
                  </div>
                </div>
              </Card>

              {/* Malam */}
              <Card padding="p-5" title={null}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name="moon" size={18} /></div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Malam</div>
                      <div className="text-[14px] font-extrabold tracking-tight">18:00 – 20:00</div>
                    </div>
                  </div>
                  <StatusPill tone="gray" icon="lock">Locked H-1</StatusPill>
                </div>
                <div className="mt-4 space-y-1.5 text-[11.5px]">
                  <div className="flex justify-between"><span className="text-muted">Roster malam</span><span className="mono font-bold">3,820</span></div>
                  <div className="flex justify-between"><span className="text-muted">+ Overnight shift</span><span className="mono font-bold">+ 245</span></div>
                  <div className="flex justify-between"><span className="text-muted">− Cuti/off-site</span><span className="mono font-bold">− 65</span></div>
                  <div className="flex justify-between border-t border-token pt-1.5 mt-1.5">
                    <span className="font-bold">Forecast total</span>
                    <span className="mono font-extrabold text-cater-700">4,000</span>
                  </div>
                  <div className="mt-3 rounded-lg bg-cream p-2 flex items-center gap-2">
                    <Icon name="chef-hat" size={14} className="text-cater-600" />
                    <span className="text-[11px] text-muted">Dapur sudah konfirmasi · prep dimulai 16:00</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 7-day chart */}
            <Card title="Redemption rate · 7 hari terakhir"
              right={
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-cater-500" /> Claimed</span>
                  <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-danger-500/70" /> No-show</span>
                  <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm border border-dashed border-brand-500" /> Forecast</span>
                </div>
              }
              padding="p-4">
              <SevenDayChart />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Charts ===========================
function PieChart({ claimed, noshow, total }) {
  const c = claimed/total, n = noshow/total;
  const arc = (frac, start) => {
    const a0 = start * 2 * Math.PI - Math.PI/2;
    const a1 = (start + frac) * 2 * Math.PI - Math.PI/2;
    const x0 = 50 + 40 * Math.cos(a0), y0 = 50 + 40 * Math.sin(a0);
    const x1 = 50 + 40 * Math.cos(a1), y1 = 50 + 40 * Math.sin(a1);
    const large = frac > 0.5 ? 1 : 0;
    return `M50 50 L${x0} ${y0} A40 40 0 ${large} 1 ${x1} ${y1} Z`;
  };
  return (
    <svg viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="40" fill="#F5EDDF" />
      <path d={arc(c, 0)} fill="#1D9E75" />
      <path d={arc(n, c)} fill="#E24B4A" />
      <circle cx="50" cy="50" r="22" fill="white" />
      <text x="50" y="48" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="JetBrains Mono">{Math.round(c*100)}%</text>
      <text x="50" y="60" textAnchor="middle" fontSize="6" fill="#8b94a2" fontWeight="700">CLAIMED</text>
    </svg>
  );
}

function VelocityChart() {
  // Live velocity vs expected curve (mini)
  const expected = [12,18,32,46,58,66,72,77,80,82];
  const actual   = [14,22,35,48,62,68,75,80,84,87];
  const w = 280, h = 48;
  const xs = i => (i/(actual.length-1))*w;
  const ys = v => h - (v/100)*h;
  const path = (arr) => arr.map((v,i)=>`${i?'L':'M'}${xs(i)} ${ys(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <path d={path(expected)} stroke="#9EBCDA" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
      <path d={path(actual)} stroke="#E68506" strokeWidth="2" fill="none" />
      <circle cx={xs(actual.length-1)} cy={ys(actual[actual.length-1])} r="3" fill="#E68506" />
    </svg>
  );
}

function SevenDayChart() {
  // bar chart with forecast line
  const data = [
    { d:'Rab 13', cl:11820, ns:1130, fc:13100 },
    { d:'Kam 14', cl:11960, ns:1010, fc:13100 },
    { d:'Jum 15', cl:11320, ns:1280, fc:12800 },
    { d:'Sab 16', cl:10980, ns:1420, fc:12400 },
    { d:'Min 17', cl:10840, ns:1260, fc:12100 },
    { d:'Sen 18', cl:11710, ns:1240, fc:13000 },
    { d:'Sel 19', cl:8234,  ns:712,  fc:12450, today:true },
  ];
  const max = 14000;
  const w = 760, h = 220, gap = 18;
  const bw = (w - gap*(data.length-1) - 30) / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h+24}`} className="w-full" style={{ maxHeight: 240 }}>
      {/* y gridlines */}
      {[0,0.25,0.5,0.75,1].map((p,i) => {
        const y = h - p*h + 4;
        return (
          <g key={i}>
            <line x1="30" x2={w} y1={y} y2={y} stroke="#E6E8EC" strokeWidth="1" />
            <text x="0" y={y+3} fontSize="9" fill="#8b94a2" fontFamily="JetBrains Mono">{Math.round(p*max/1000)}K</text>
          </g>
        );
      })}
      {data.map((d,i) => {
        const x = 30 + i*(bw+gap);
        const clH = (d.cl/max)*h;
        const nsH = (d.ns/max)*h;
        return (
          <g key={i}>
            <rect x={x} y={h+4-clH} width={bw} height={clH} fill="#E68506" rx="3" opacity={d.today?1:0.85} />
            <rect x={x} y={h+4-clH-nsH} width={bw} height={nsH} fill="#E24B4A" rx="3" opacity="0.75" />
            {/* forecast tick */}
            <line x1={x-2} x2={x+bw+2} y1={h+4-(d.fc/max)*h} y2={h+4-(d.fc/max)*h} stroke="#1F4E79" strokeWidth="2" strokeDasharray="3 2" />
            <text x={x+bw/2} y={h+18} fontSize="10" fill={d.today?'#E68506':'#5b6472'} fontWeight={d.today?'700':'500'} textAnchor="middle">{d.d}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================
// W5 — Menu Planning
// ============================================================
function FacMenuPlanning() {
  const [collapsed, setCollapsed] = React.useState(false);

  // Generate 21-day grid (3 weeks) with menus
  const weeks = [
    { start: 13, label:'Minggu lalu · 12–18 Mei' },
    { start: 20, label:'Minggu ini · 19–25 Mei', highlight: 19 },
    { start: 27, label:'Minggu depan · 26 Mei – 1 Jun' },
  ];
  const menuPool = [
    { v:'Bahari', m:'Ayam bakar · sayur asem', tag:'halal' },
    { v:'Sari Boga', m:'Rendang sapi · sayur lodeh', tag:'halal' },
    { v:'Nuansa', m:'Ikan asam manis · cap cay', tag:'halal' },
    { v:'Bahari', m:'Nasi goreng special · acar', tag:'halal' },
    { v:'Sari Boga', m:'Soto ayam · kerupuk', tag:'halal' },
  ];

  return (
    <div className="h-full flex bg-elev">
      <FacSidebar collapsed={collapsed} setCollapsed={setCollapsed} current="menu" />
      <div className="flex-1 flex flex-col min-w-0">
        <FacTopBar title="Menu Planning · Mei 2026" sub="Catering · FAC" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Toolbar */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex bg-white rounded-md border border-token p-0.5">
                {['Day','Week','Month'].map((v,i)=>(
                  <button key={v} className={`px-3 h-8 rounded text-[12px] font-bold ${i===1?'bg-cater-500 text-white':'text-muted'}`}>{v}</button>
                ))}
              </div>
              <FilterChip icon="calendar" tone="cater">Mei 2026</FilterChip>
              <FilterChip icon="truck">Semua vendor</FilterChip>
              <FilterChip icon="leaf">Halal default</FilterChip>
              <div className="flex-1" />
              <button className="h-9 px-3 rounded-md bg-white border border-token text-[12px] font-bold inline-flex items-center gap-1.5">
                <Icon name="layers" size={13} /> Menu library
              </button>
              <Btn variant="secondary" size="sm" icon="copy">Duplicate week</Btn>
              <Btn variant="cater" size="sm" icon="plus">Tambah menu</Btn>
            </div>

            {/* Validation alert */}
            <div className="rounded-xl bg-warning-50 border border-warning-500/30 p-3 flex items-start gap-3">
              <Icon name="alert-triangle" size={18} className="text-warning-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-[12px] text-warning-700">
                <span className="font-extrabold">2 hari membutuhkan revisi:</span> Selasa 20 Mei punya <span className="font-bold">protein sama</span> dengan hari sebelumnya (ayam bakar). Min 21 Mei <span className="font-bold">vendor belum ditugaskan</span>.
              </div>
              <button className="text-[12px] font-bold text-warning-700 hover:underline">Lihat detail</button>
            </div>

            {/* Week schedule */}
            {weeks.map(week => (
              <Card key={week.start}
                title={week.label}
                right={
                  <button className="text-[11px] text-cater-700 font-bold inline-flex items-center gap-1 hover:underline">
                    <Icon name="copy" size={12} /> Copy ke minggu depan
                  </button>
                }
                padding="p-0">
                <div className="grid grid-cols-7">
                  {['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map((dn,di) => {
                    const date = week.start - 6 + di;
                    const isToday = week.highlight === date;
                    const menu = menuPool[(di + week.start) % menuPool.length];
                    const menu2 = menuPool[(di + week.start + 2) % menuPool.length];
                    return (
                      <div key={di} className={`border-r border-b border-token last:border-r-0 p-2.5 min-h-[160px] flex flex-col gap-1.5 ${isToday?'bg-cater-50/40':''}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className={`text-[10px] uppercase tracking-wider font-bold ${isToday?'text-cater-600':'text-subtle'}`}>{dn}</div>
                            <div className={`text-[14px] font-extrabold ${isToday?'text-cater-700':''}`}>{date}</div>
                          </div>
                          {isToday && <span className="px-1.5 py-0.5 rounded bg-cater-500 text-white text-[9px] font-bold uppercase tracking-wider">Today</span>}
                        </div>
                        {/* meal slots */}
                        <MenuSlotCell slot="sarapan" vendor="Bahari" menu="Nasi uduk · telur" />
                        <MenuSlotCell slot="siang"   vendor={menu.v} menu={menu.m} active={isToday} />
                        <MenuSlotCell slot="malam"   vendor={menu2.v} menu={menu2.m} />
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuSlotCell({ slot, vendor, menu, active }) {
  const color = { sarapan:'cater', siang:'herb', malam:'brand' }[slot];
  const cMap = { cater:'bg-cater-50 text-cater-700 border-cater-200', herb:'bg-herb-50 text-herb-700 border-herb-200', brand:'bg-brand-50 text-brand-700 border-brand-200' };
  return (
    <div className={`rounded-md border ${cMap[color]} px-2 py-1.5 ${active?'ring-2 ring-cater-500/30':''}`}>
      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold opacity-80">
        <MealIcon slot={slot} size={10} /> {slot}
        <span className="ml-auto opacity-60 font-normal">{vendor}</span>
      </div>
      <div className="text-[10.5px] font-semibold leading-tight mt-0.5 line-clamp-2">{menu}</div>
    </div>
  );
}

// ============================================================
// W6 — Vendor Management
// ============================================================
function FacVendor() {
  const [collapsed, setCollapsed] = React.useState(false);
  const vendors = [
    { n:'Catering Bahari',  c:'CB', contract:'Jan – Des 2026', rating:4.6, cost:'Rp 36,500', ontime:98.2, waste:3.4, status:'active', share:42, complaints:3 },
    { n:'Sari Boga Mandiri',c:'SB', contract:'Apr – Sep 2026', rating:4.2, cost:'Rp 38,800', ontime:96.5, waste:4.1, status:'active', share:32, complaints:8 },
    { n:'Nuansa Catering',  c:'NC', contract:'Jan – Jun 2026', rating:4.0, cost:'Rp 41,200', ontime:94.8, waste:5.2, status:'review', share:18, complaints:11 },
    { n:'Pondok Lestari',   c:'PL', contract:'Standby',         rating:3.8, cost:'Rp 39,000', ontime:91.0, waste:4.8, status:'standby', share:8,  complaints:4 },
  ];
  return (
    <div className="h-full flex bg-elev">
      <FacSidebar collapsed={collapsed} setCollapsed={setCollapsed} current="vendor" />
      <div className="flex-1 flex flex-col min-w-0">
        <FacTopBar title="Vendor Management" sub="Catering · FAC" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="filter">Status: semua</FilterChip>
              <FilterChip icon="star">Rating ≥ 3.5</FilterChip>
              <FilterChip icon="calendar">Kontrak aktif</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="file-text">Kontrak template</Btn>
              <Btn variant="cater" size="sm" icon="plus">Tambah vendor</Btn>
            </div>

            <Card title={`Vendor catering — ${vendors.length} aktif`} padding="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                      <th className="px-5 py-2.5">Vendor</th>
                      <th className="px-3 py-2.5">Kontrak</th>
                      <th className="px-3 py-2.5">Share</th>
                      <th className="px-3 py-2.5">Rating</th>
                      <th className="px-3 py-2.5">Avg cost / porsi</th>
                      <th className="px-3 py-2.5">SLA on-time</th>
                      <th className="px-3 py-2.5">Waste rate</th>
                      <th className="px-3 py-2.5">Komplain</th>
                      <th className="px-3 py-2.5">Status</th>
                      <th className="px-3 py-2.5 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {vendors.map((v,i) => (
                      <tr key={v.n} className={`hover:bg-elev cursor-pointer ${i===0?'bg-cater-50/30':''}`}>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-cater-500 text-white font-extrabold flex items-center justify-center text-[11px]">{v.c}</div>
                            <div>
                              <div className="font-bold flex items-center gap-1.5">{v.n} {i===0 && <Icon name="award" size={13} className="text-cater-500" />}</div>
                              <div className="text-[10px] text-subtle mono">VND-{1000+i*7}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-muted">{v.contract}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-cream overflow-hidden">
                              <div className="h-full rounded-full bg-cater-500" style={{ width:`${v.share}%` }} />
                            </div>
                            <span className="mono font-semibold text-[11px]">{v.share}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="inline-flex items-center gap-1 font-bold">
                            <Icon name="star" size={12} className="text-cater-500" /> {v.rating.toFixed(1)}
                          </div>
                        </td>
                        <td className="px-3 py-3 mono font-semibold">{v.cost}</td>
                        <td className="px-3 py-3">
                          <span className={`font-bold mono ${v.ontime>=97?'text-success-600':v.ontime>=95?'text-warning-600':'text-danger-600'}`}>{v.ontime.toFixed(1)}%</span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`font-bold mono ${v.waste<=4?'text-success-600':v.waste<=5?'text-warning-600':'text-danger-600'}`}>{v.waste.toFixed(1)}%</span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex items-center gap-1 font-bold ${v.complaints>=10?'text-danger-600':'text-muted'}`}>
                            <Icon name="message-square" size={12} /> {v.complaints}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          {v.status==='active'   && <StatusPill tone="success" icon="check-circle-2">Active</StatusPill>}
                          {v.status==='review'   && <StatusPill tone="warning" icon="alert-circle">Review</StatusPill>}
                          {v.status==='standby'  && <StatusPill tone="gray"    icon="pause">Standby</StatusPill>}
                        </td>
                        <td className="px-3 py-3"><Icon name="chevron-right" size={14} className="text-subtle" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Vendor of the week */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card padding="p-5" className="lg:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cater-500 text-white font-extrabold flex items-center justify-center text-[15px]">CB</div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-cater-600 font-bold">Top performer minggu ini</div>
                    <div className="text-[18px] font-extrabold tracking-tight">Catering Bahari</div>
                  </div>
                  <Btn variant="secondary" size="sm" icon="external-link">Detail</Btn>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3 text-center">
                  {[
                    { lbl:'Rating', val:'4.6', sub:'+0.2 vs last wk', tone:'text-cater-700' },
                    { lbl:'On-time', val:'98.2%', sub:'SLA terbaik',     tone:'text-success-700' },
                    { lbl:'Waste',   val:'3.4%',  sub:'di bawah target', tone:'text-success-700' },
                    { lbl:'Komplain',val:'3',     sub:'2 resolved',      tone:'text-muted' },
                  ].map(m => (
                    <div key={m.lbl} className="rounded-lg bg-cream p-3">
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{m.lbl}</div>
                      <div className={`text-[20px] font-extrabold mono mt-0.5 ${m.tone}`}>{m.val}</div>
                      <div className="text-[10px] text-subtle">{m.sub}</div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card padding="p-5">
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Compliance</div>
                <div className="text-[14px] font-extrabold tracking-tight">Sertifikat &amp; dokumen</div>
                <div className="mt-3 space-y-1.5">
                  {[
                    { lbl:'Halal MUI',         exp:'08 Sep 2026', tone:'success' },
                    { lbl:'Food safety BPOM',   exp:'12 Nov 2026', tone:'success' },
                    { lbl:'Hygiene grade A',    exp:'19 Jun 2026', tone:'warning' },
                    { lbl:'Kontrak induk',      exp:'31 Des 2026', tone:'success' },
                  ].map(d => (
                    <div key={d.lbl} className="flex items-center gap-2 text-[11.5px]">
                      <Icon name={d.tone==='success'?'shield-check':'shield-alert'} size={14}
                            className={d.tone==='success'?'text-success-600':'text-warning-600'} />
                      <div className="flex-1 font-semibold">{d.lbl}</div>
                      <div className="text-muted mono">{d.exp}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.FacDashboard = FacDashboard;
window.FacMenuPlanning = FacMenuPlanning;
window.FacVendor = FacVendor;
window.FacSidebar = FacSidebar;
window.FacTopBar = FacTopBar;
window.FilterChip = FilterChip;
