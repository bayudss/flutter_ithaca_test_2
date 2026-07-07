// Catering — Management Analytics (W12).

function MgmtSidebar({ current='catering' }) {
  const items = [
    { id:'overview',   name:'Overview',     icon:'layout-dashboard' },
    { id:'attendance', name:'Attendance',   icon:'clock' },
    { id:'safety',     name:'Safety',       icon:'shield' },
    { id:'catering',   name:'Catering',     icon:'utensils' },
    { id:'finance',    name:'Finance',      icon:'wallet' },
    { id:'productivity',name:'Productivity', icon:'trending-up' },
  ];
  return (
    <aside className="w-60 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 px-4 border-b border-token flex items-center gap-2.5">
        <BrandMark size={30} />
        <div className="leading-tight">
          <div className="text-[12px] font-bold tracking-tight">Nusaraya</div>
          <div className="text-[9px] uppercase tracking-wider text-brand-700 font-bold">Management portal</div>
        </div>
      </div>
      <div className="px-3 py-4 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Modules</div>
        <nav className="space-y-0.5">
          {items.map(i => {
            const active = i.id === current;
            return (
              <a key={i.id}
                 className={`flex items-center gap-2.5 px-3 h-9 rounded-md text-[12.5px] font-medium transition-colors
                   ${active?'bg-cater-50 text-cater-700':'text-muted hover:bg-elev'}`}>
                <Icon name={i.icon} size={15} />
                <span>{i.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

// Stacked area trend
function TrendChart({ data, color='#E68506', fillFrom='#FDE6C0', label, max=100, fmt=(v)=>v }) {
  const w = 360, h = 130;
  const pad = 8;
  const xs = (i) => pad + (i/(data.length-1))*(w-pad*2);
  const ys = (v) => h - 10 - (v/max)*(h-22);
  const path = data.map((v,i)=>`${i?'L':'M'}${xs(i)} ${ys(v)}`).join(' ');
  const area = path + ` L${xs(data.length-1)} ${h-10} L${xs(0)} ${h-10} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id={`g-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g-${color.replace('#','')})`} />
      <path d={path} stroke={color} strokeWidth="2" fill="none" />
      {data.map((v,i) => i===data.length-1 && <circle key={i} cx={xs(i)} cy={ys(v)} r="3" fill={color} />)}
    </svg>
  );
}

function HBars({ items, max }) {
  return (
    <div className="space-y-2">
      {items.map((it,i) => {
        const pct = (it.v/max)*100;
        return (
          <div key={i}>
            <div className="flex items-center justify-between text-[11.5px] mb-1">
              <span className="font-bold">{it.lbl}</span>
              <span className="mono">{it.fmt}</span>
            </div>
            <div className="h-2.5 rounded-full bg-cream overflow-hidden">
              <div className="h-full rounded-full" style={{ width:`${pct}%`, background: it.color || '#E68506' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Heatmap by hour x day-of-week
function Heatmap() {
  const days = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
  const hours = ['05','07','09','11','13','15','17','19','21'];
  // generate intensities
  const rng = (i) => ((i*9301+49297)%233280)/233280;
  const peakAt = { 6:0.95, 12:0.98, 19:0.92 };
  const cell = (di, hi) => {
    const hour = +hours[hi];
    let v = 0.15 + rng(di*11+hi*7)*0.2;
    Object.keys(peakAt).forEach(p => {
      const dist = Math.abs(hour-+p);
      if (dist<=2) v = Math.max(v, peakAt[p] * (1 - dist*0.18));
    });
    if (di===6 && hour===12) v *= 0.85; // sunday lunch lower
    if (di===4 && hour===12) v *= 0.88; // friday slight dip
    return Math.min(1, v);
  };
  return (
    <div>
      <div className="grid" style={{ gridTemplateColumns:`60px repeat(${hours.length}, 1fr)` }}>
        <div />
        {hours.map(h => <div key={h} className="text-center text-[9.5px] text-subtle font-bold pb-1">{h}:00</div>)}
        {days.map((d,di) => (
          <React.Fragment key={d}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-subtle flex items-center">{d}</div>
            {hours.map((h,hi) => {
              const v = cell(di,hi);
              const isPeak = v > 0.85;
              return (
                <div key={h} className="aspect-square rounded-md m-0.5 flex items-center justify-center relative"
                     style={{ background:`rgba(243,152,0,${v.toFixed(2)})` }}>
                  {isPeak && <span className="text-[9px] font-extrabold text-white mono">{Math.round(v*100)}%</span>}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-subtle">
        <span>Quiet</span>
        <div className="flex">
          {[0.15,0.3,0.5,0.7,0.9].map(v => <span key={v} className="w-5 h-3" style={{ background:`rgba(243,152,0,${v})` }} />)}
        </div>
        <span>Peak</span>
      </div>
    </div>
  );
}

function ManagementAnalytics() {
  const [period, setPeriod] = React.useState('month');
  return (
    <div className="h-full flex bg-elev">
      <MgmtSidebar current="catering" />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
          <div>
            <div className="text-[10px] text-subtle uppercase tracking-wider">Catering analytics</div>
            <div className="text-[14px] font-bold tracking-tight">Operational intelligence · Mei 2026</div>
          </div>
          <div className="flex-1" />
          <div className="inline-flex bg-elev rounded-md p-0.5 border border-token">
            {[
              { id:'today', l:'Today' },
              { id:'week',  l:'Week' },
              { id:'month', l:'Month' },
              { id:'q',     l:'Quarter' },
            ].map(p => (
              <button key={p.id} onClick={() => setPeriod(p.id)}
                className={`px-3 h-8 rounded text-[12px] font-bold ${period===p.id?'bg-white shadow text-brand-700':'text-muted'}`}>
                {p.l}
              </button>
            ))}
          </div>
          <Btn variant="secondary" size="sm" icon="download">Export PDF</Btn>
          <Btn variant="cater" size="sm" icon="share-2">Share board</Btn>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Top KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="utensils-crossed" label="Total portions"  value="354,210" tone="cater"   sub="bulan ini" delta="+4.2%" />
              <KPICard icon="banknote"         label="Cost / portion"  value="Rp 38.5K" tone="brand"  sub="vs target Rp 40K" delta="-3.1%" />
              <KPICard icon="wallet"           label="Total cost"      value="Rp 13.6M" tone="warning" sub="dari budget 14.0M" delta="-2.8%" />
              <KPICard icon="trash-2"          label="Waste rate"      value="4.2%"   tone="danger"  sub="target <5%"     delta="-0.5%" />
              <KPICard icon="heart"            label="Satisfaction"    value="4.3 ★"  tone="herb"    sub="target ≥4.0"    delta="+0.1" />
            </div>

            {/* Trend charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
              <Card padding="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[11px] uppercase tracking-wider text-subtle font-bold">Cost / portion</div>
                  <span className="text-[10px] text-success-700 font-bold inline-flex items-center gap-1"><Icon name="trending-down" size={11} /> -3.1%</span>
                </div>
                <div className="text-[18px] font-extrabold mono tracking-tight">Rp 38.5K</div>
                <div className="text-[10px] text-subtle">trend 12 bulan</div>
                <TrendChart data={[42,41.5,41,40.6,40.2,39.8,39.4,39.1,38.9,38.7,38.6,38.5]} max={45} color="#1F4E79" />
              </Card>
              <Card padding="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[11px] uppercase tracking-wider text-subtle font-bold">Waste rate</div>
                  <span className="text-[10px] text-success-700 font-bold inline-flex items-center gap-1"><Icon name="trending-down" size={11} /> -0.5%</span>
                </div>
                <div className="text-[18px] font-extrabold mono tracking-tight">4.2%</div>
                <div className="text-[10px] text-subtle">trend 12 bulan</div>
                <TrendChart data={[6.4,6.1,5.8,5.5,5.2,5.0,4.9,4.7,4.5,4.4,4.3,4.2]} max={8} color="#E24B4A" />
              </Card>
              <Card padding="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[11px] uppercase tracking-wider text-subtle font-bold">Satisfaction</div>
                  <span className="text-[10px] text-success-700 font-bold inline-flex items-center gap-1"><Icon name="trending-up" size={11} /> +0.1</span>
                </div>
                <div className="text-[18px] font-extrabold mono tracking-tight">4.3 ★</div>
                <div className="text-[10px] text-subtle">trend 12 bulan</div>
                <TrendChart data={[3.8,3.9,3.95,4.0,4.1,4.15,4.2,4.22,4.25,4.28,4.3,4.3]} max={5} color="#1D9E75" />
              </Card>
              <Card padding="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[11px] uppercase tracking-wider text-subtle font-bold">Total cost</div>
                  <span className="text-[10px] text-success-700 font-bold inline-flex items-center gap-1"><Icon name="trending-up" size={11} /> +4.2%</span>
                </div>
                <div className="text-[18px] font-extrabold mono tracking-tight">Rp 13.6 M</div>
                <div className="text-[10px] text-subtle">trend 12 bulan</div>
                <TrendChart data={[11.8,12.0,12.2,12.4,12.6,12.7,12.9,13.0,13.2,13.4,13.5,13.6]} max={16} color="#E68506" />
              </Card>
            </div>

            {/* Vendor comparison + heatmap */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              <Card title="Vendor performance comparison" right={<span className="text-[11px] text-subtle">Mei 2026 · YTD</span>} padding="p-5">
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Cost per portion · lower = better</div>
                    <HBars max={45} items={[
                      { lbl:'Catering Bahari',  v:36.5, fmt:'Rp 36,500', color:'#1D9E75' },
                      { lbl:'Sari Boga Mandiri',v:38.8, fmt:'Rp 38,800', color:'#E68506' },
                      { lbl:'Nuansa Catering',  v:41.2, fmt:'Rp 41,200', color:'#E24B4A' },
                    ]} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Satisfaction</div>
                    <HBars max={5} items={[
                      { lbl:'Catering Bahari',  v:4.6, fmt:'★ 4.6', color:'#1D9E75' },
                      { lbl:'Sari Boga Mandiri',v:4.2, fmt:'★ 4.2', color:'#E68506' },
                      { lbl:'Nuansa Catering',  v:4.0, fmt:'★ 4.0', color:'#1F4E79' },
                    ]} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Volume share</div>
                    <HBars max={100} items={[
                      { lbl:'Catering Bahari',  v:42, fmt:'42% · 148.7K porsi', color:'#E68506' },
                      { lbl:'Sari Boga Mandiri',v:32, fmt:'32% · 113.3K porsi', color:'#F39800' },
                      { lbl:'Nuansa Catering',  v:18, fmt:'18% · 63.7K porsi',  color:'#FACB87' },
                      { lbl:'Pondok Lestari',   v:8,  fmt:'8% · 28.3K porsi',   color:'#F5EDDF' },
                    ]} />
                  </div>
                </div>
              </Card>

              <Card title="Redemption pattern · jam × hari" right={<span className="text-[11px] text-subtle">All slots · last 30 days</span>} padding="p-5">
                <Heatmap />
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { lbl:'Peak time',      v:'12:00 – 12:30', tone:'cater' },
                    { lbl:'Quietest',       v:'Min 12:00',     tone:'gray',  sub:'-12% avg' },
                    { lbl:'Friday lunch',   v:'-8% vs target', tone:'warning' },
                  ].map(s => (
                    <div key={s.lbl} className="rounded-lg bg-cream p-2.5">
                      <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">{s.lbl}</div>
                      <div className={`text-[12.5px] font-extrabold mt-0.5 text-${s.tone}-700`}>{s.v}</div>
                      {s.sub && <div className="text-[10px] text-muted">{s.sub}</div>}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* AI insights */}
            <Card padding="p-0">
              <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cater-500 to-cater-700 text-white flex items-center justify-center">
                  <Icon name="sparkles" size={14} />
                </div>
                <div className="text-[13px] font-bold tracking-tight">AI Insights · auto-generated</div>
                <span className="text-[10px] text-subtle mono">model · run 06:00 WIB</span>
                <div className="flex-1" />
                <button className="text-[11px] font-bold text-cater-700 inline-flex items-center gap-1">
                  <Icon name="thumbs-up" size={12} /> Mark useful
                </button>
              </div>
              <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
                <InsightCard
                  tone="cater"
                  icon="award"
                  title="Increase Bahari share"
                  body="Vendor Bahari konsisten 12% lower cost dengan satisfaction setara (4.6 vs 4.2 SB). Realokasi 8% share dari Nuansa diestimasi menghemat Rp 380 juta/bulan tanpa drop satisfaction."
                  action="Lihat skenario alokasi"
                  confidence="92%"
                />
                <InsightCard
                  tone="warning"
                  icon="trending-down"
                  title="Friday lunch redemption rendah"
                  body="Setiap Jumat slot Siang turun ~8% dibanding weekday avg. Pola konsisten 6 minggu — mungkin terkait sholat Jumat. Pertimbangkan slot adjustment 12:45 – 13:45 untuk Jumat saja."
                  action="Drill-down per lokasi"
                  confidence="87%"
                />
                <InsightCard
                  tone="danger"
                  icon="trash-2"
                  title="Rest Area-2 waste over budget"
                  body="Waste rate 12% (target 5%). Possible cause: forecast 18% over actual headcount selama 14 hari terakhir. Recommend trim forecast atau reduce frequency."
                  action="Adjust forecast rule"
                  confidence="95%"
                />
              </div>
            </Card>

            {/* Cost breakdown waterfall */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
              <Card title="Cost breakdown · Mei 2026" right={<span className="text-[11px] text-subtle">Rp 13.6 M total</span>} padding="p-5">
                <div className="grid grid-cols-5 gap-2 items-end" style={{ minHeight: 220 }}>
                  {[
                    { lbl:'Raw material',  v:8.1, color:'#E68506' },
                    { lbl:'Labor',         v:2.3, color:'#F39800' },
                    { lbl:'Logistik',      v:1.4, color:'#FACB87' },
                    { lbl:'Overhead',      v:1.1, color:'#FDE6C0' },
                    { lbl:'Waste',         v:0.7, color:'#E24B4A' },
                  ].map((c,i) => {
                    const max = 9;
                    return (
                      <div key={i} className="flex flex-col items-center justify-end gap-2">
                        <div className="text-[12px] font-extrabold mono">Rp {c.v.toFixed(1)}M</div>
                        <div className="w-full rounded-t-lg" style={{ height: `${(c.v/max)*180}px`, background: c.color }} />
                        <div className="text-[10.5px] text-muted text-center">{c.lbl}</div>
                        <div className="text-[10px] text-subtle mono">{Math.round((c.v/13.6)*100)}%</div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Drill-down filters" padding="p-5">
                <div className="space-y-3 text-[12px]">
                  {[
                    { ic:'map-pin', l:'Per lokasi', v:'5 mess locations' },
                    { ic:'truck',   l:'Per vendor', v:'4 vendor' },
                    { ic:'utensils-crossed', l:'Per meal slot', v:'3 slots' },
                    { ic:'leaf',    l:'Per kategori diet', v:'5 kategori' },
                    { ic:'building',l:'Per department', v:'12 dept · organic + 3 kontraktor' },
                  ].map(f => (
                    <button key={f.l} className="w-full flex items-center gap-3 px-3 h-11 rounded-lg border border-token hover:border-cater-300 hover:bg-cater-50/30 text-left">
                      <div className="w-8 h-8 rounded-lg bg-cream text-cater-700 flex items-center justify-center">
                        <Icon name={f.ic} size={15} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[12.5px] font-bold">{f.l}</div>
                        <div className="text-[10.5px] text-subtle">{f.v}</div>
                      </div>
                      <Icon name="chevron-right" size={14} className="text-subtle" />
                    </button>
                  ))}
                </div>
                <Btn variant="secondary" full icon="download" className="mt-4">Excel · raw data</Btn>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ tone, icon, title, body, action, confidence }) {
  const toneMap = {
    cater:   'border-cater-200 bg-cater-50/40',
    warning: 'border-warning-500/30 bg-warning-50/50',
    danger:  'border-danger-500/30 bg-danger-50/50',
  };
  const iconMap = {
    cater:   'bg-cater-500 text-white',
    warning: 'bg-warning-500 text-white',
    danger:  'bg-danger-500 text-white',
  };
  return (
    <div className={`rounded-xl border p-4 ${toneMap[tone]}`}>
      <div className="flex items-center gap-2">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconMap[tone]}`}>
          <Icon name={icon} size={17} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-extrabold tracking-tight leading-tight">{title}</div>
        </div>
        <span className="text-[9px] mono font-bold text-muted bg-white px-1.5 py-0.5 rounded border border-token">{confidence}</span>
      </div>
      <div className="mt-2 text-[11.5px] leading-relaxed text-[color:var(--text)]/85">{body}</div>
      <button className="mt-3 text-[11.5px] font-bold text-cater-700 inline-flex items-center gap-1 hover:underline">{action} →</button>
    </div>
  );
}

window.ManagementAnalytics = ManagementAnalytics;
