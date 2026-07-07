// Catering — FAC Forecast, Live Monitor, Feedback (W7-W9).

// ============================================================
// W7 — Headcount Forecast (CRITICAL TOOL)
// ============================================================
function FacForecast() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [slot, setSlot] = React.useState('siang');
  return (
    <div className="h-full flex bg-elev">
      <FacSidebar collapsed={collapsed} setCollapsed={setCollapsed} current="forecast" />
      <div className="flex-1 flex flex-col min-w-0">
        <FacTopBar title="Headcount Forecast — Rabu, 20 Mei 2026" sub="Catering · FAC" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Top tools */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar" tone="cater">20 Mei 2026 (H+1)</FilterChip>
              <div className="inline-flex bg-white rounded-md border border-token p-0.5">
                {[{id:'sarapan',ic:'sunrise',l:'Sarapan'},{id:'siang',ic:'sun',l:'Siang'},{id:'malam',ic:'moon',l:'Malam'}].map(m => (
                  <button key={m.id} onClick={() => setSlot(m.id)}
                    className={`px-3 h-8 rounded text-[12px] font-bold inline-flex items-center gap-1.5 ${slot===m.id?'bg-cater-500 text-white':'text-muted hover:bg-elev'}`}>
                    <Icon name={m.ic} size={13} /> {m.l}
                  </button>
                ))}
              </div>
              <div className="flex-1" />
              <div className="inline-flex items-center gap-2 px-3 h-9 rounded-md bg-warning-50 border border-warning-500/30 text-warning-700 text-[11px] font-bold">
                <Icon name="clock" size={13} /> Auto-lock dalam <span className="mono">2j 12m</span>
              </div>
              <Btn variant="secondary" size="sm" icon="rotate-ccw">Reset auto</Btn>
              <Btn variant="cater" size="sm" icon="lock">Lock &amp; kirim ke dapur</Btn>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4">
              {/* Left: forecast builder */}
              <div className="space-y-4">
                <Card title="Forecast builder — sumber data" padding="p-0">
                  <div className="divide-y divide-[color:var(--border)]">
                    <ForecastRow icon="users"        tone="brand"   label="Base: roster shift hari itu" value={3200} sign="+" source="HRIS · sync 14:50" />
                    <ForecastRow icon="user-plus"    tone="info"    label="Visitor (mine permit aktif)" value={45}   sign="+" source="Permit system" />
                    <ForecastRow icon="clock"        tone="warning" label="Overtime workers (historical avg)" value={120} sign="+" source="ML model · 87% conf" />
                    <ForecastRow icon="palmtree"     tone="herb"    label="On leave / izin"               value={80} sign="-" source="Leave module · 23 leave + 57 prediksi" />
                    <ForecastRow icon="briefcase"    tone="gray"    label="Off-site (training, meeting)"  value={25} sign="-" source="Calendar sync" />
                    <div className="bg-cream px-5 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cater-500 text-white flex items-center justify-center">
                        <Icon name="calculator" size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] uppercase tracking-wider text-subtle font-bold">Total forecast porsi</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <div className="text-[30px] font-extrabold mono tracking-tight">3,260</div>
                          <div className="text-[12px] text-success-700 font-bold inline-flex items-center gap-1"><Icon name="trending-up" size={12} /> +60 vs hari ini</div>
                        </div>
                      </div>
                      <button className="h-9 px-3 rounded-md bg-white border border-token text-[12px] font-bold inline-flex items-center gap-1.5">
                        <Icon name="edit-3" size={13} /> Override total
                      </button>
                    </div>
                  </div>
                </Card>

                {/* Per location breakdown */}
                <Card title="Distribusi per lokasi" right={<button className="text-[11px] font-bold text-cater-700">Balance auto</button>} padding="p-0">
                  <div className="divide-y divide-[color:var(--border)]">
                    {[
                      { loc:'Mess Griya Praja',    cap:2200, est:1800, pct:55, tone:'cater' },
                      { loc:'Mess Simpang Perdau', cap:1400, est:1200, pct:37, tone:'herb' },
                      { loc:'Rest Area-1 (KM 42)', cap:120,  est:80,   pct:2.5,tone:'brand' },
                      { loc:'Rest Area-2 (KM 78)', cap:150,  est:100,  pct:3.0,tone:'brand' },
                      { loc:'Rest Area-3 (KM 110)',cap:120,  est:80,   pct:2.5,tone:'brand' },
                    ].map(l => (
                      <div key={l.loc} className="px-5 py-3 flex items-center gap-4">
                        <Icon name="map-pin" size={16} className="text-cater-500" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold">{l.loc}</div>
                          <div className="text-[10.5px] text-muted">Kapasitas {l.cap.toLocaleString('id')} porsi</div>
                        </div>
                        <div className="w-48 h-2 rounded-full bg-cream overflow-hidden">
                          <div className="h-full rounded-full bg-cater-500" style={{ width:`${(l.est/l.cap)*100}%` }} />
                        </div>
                        <div className="w-24 text-right">
                          <div className="text-[15px] font-extrabold mono">{l.est.toLocaleString('id')}</div>
                          <div className="text-[10px] text-subtle">{l.pct.toFixed(1)}% total</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Manual adjustment slider */}
                <Card title="Adjustment manual" padding="p-5">
                  <div className="text-[11.5px] text-muted">Slider untuk override per kategori. Setiap perubahan butuh alasan dan tercatat di audit log.</div>
                  <div className="mt-4 space-y-4">
                    {[
                      { lbl:'Roster base',     v:0,    min:-200, max:200 },
                      { lbl:'Overtime buffer', v:+15,  min:-50,  max:100 },
                      { lbl:'Visitor reserve', v:+5,   min:0,    max:50 },
                    ].map(s => {
                      const pct = ((s.v - s.min) / (s.max - s.min))*100;
                      return (
                        <div key={s.lbl}>
                          <div className="flex items-center justify-between text-[12px]">
                            <span className="font-bold">{s.lbl}</span>
                            <span className={`mono font-bold ${s.v>0?'text-success-700':s.v<0?'text-danger-700':'text-muted'}`}>{s.v>0?'+':''}{s.v} porsi</span>
                          </div>
                          <div className="relative h-2 rounded-full bg-cream mt-2">
                            <div className="absolute top-0 bottom-0 bg-cater-500/30 rounded-full" style={{ left:`${Math.min(50, pct)}%`, right:`${100-Math.max(50, pct)}%` }} />
                            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cater-500 ring-2 ring-white shadow" style={{ left:`calc(${pct}% - 8px)` }} />
                            <div className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-[color:var(--border-strong)]" style={{ left:'50%' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>

              {/* Right: special diet + lock */}
              <div className="space-y-4">
                <Card title="Special diet count" padding="p-0">
                  <div className="divide-y divide-[color:var(--border)]">
                    {[
                      { ic:'badge-check',  lbl:'Halal certified',     v:3260, tone:'herb',    note:'Semua default' },
                      { ic:'leaf',         lbl:'Vegetarian',          v:25,   tone:'success', note:'Menu khusus disiapkan' },
                      { ic:'ban',          lbl:'Tidak makan babi (tambahan)', v:2400, tone:'gray', note:'~74% tenaga kerja' },
                      { ic:'wheat-off',    lbl:'Gluten-free',         v:5,    tone:'warning', note:'Konfirmasi vendor' },
                      { ic:'alert-circle', lbl:'Alergi spesifik',     v:12,   tone:'danger',  note:'Lihat daftar nama →', link:true },
                    ].map((r,i) => (
                      <div key={i} className="px-4 py-3 flex items-center gap-3">
                        <Icon name={r.ic} size={16} className={`text-${r.tone}-600`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[12.5px] font-bold">{r.lbl}</div>
                          <div className={`text-[10.5px] ${r.link?'text-cater-700 font-bold':'text-muted'}`}>{r.note}</div>
                        </div>
                        <div className="text-[16px] font-extrabold mono">{r.v.toLocaleString('id')}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card padding="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="lock-keyhole" size={16} className="text-cater-600" />
                    <div className="text-[13px] font-bold tracking-tight">Status forecast</div>
                  </div>
                  <div className="flex items-center justify-between text-[12px] mb-1.5"><span className="text-muted">Draft</span><span className="font-bold">Maya · 14:32</span></div>
                  <div className="flex items-center justify-between text-[12px] mb-1.5"><span className="text-muted">Reviewed</span><span className="font-bold text-success-700">Yuni FAC · 14:48</span></div>
                  <div className="flex items-center justify-between text-[12px] mb-3"><span className="text-muted">Locked</span><span className="text-warning-700 font-bold inline-flex items-center gap-1"><Icon name="clock" size={12} /> Auto 15:00</span></div>
                  <div className="rounded-lg bg-warning-50 border border-warning-500/20 p-3 flex items-start gap-2 text-[11px] text-warning-700">
                    <Icon name="info" size={14} className="mt-0.5 shrink-0" />
                    <div>Setelah lock, perubahan butuh approval Lead FAC. Forecast accuracy target ±5% dari actual.</div>
                  </div>
                  <Btn variant="cater" size="lg" full icon="lock" className="mt-4">Lock forecast sekarang</Btn>
                </Card>

                <Card padding="p-5">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Akurasi 7 hari terakhir</div>
                  <div className="space-y-2">
                    {[
                      { d:'Sen 18', f:13000, a:12950, off:-0.4 },
                      { d:'Sel 19', f:12450, a:8234, off:0,  inprogress:true },
                      { d:'Sab 17', f:12100, a:12340, off:+2.0 },
                      { d:'Jum 16', f:12800, a:12200, off:-4.7 },
                    ].map(r => (
                      <div key={r.d} className="flex items-center gap-2 text-[11.5px]">
                        <div className="w-14 text-muted font-semibold">{r.d}</div>
                        <div className="flex-1 mono">{r.f.toLocaleString('id')} → <span className="font-bold">{r.a.toLocaleString('id')}</span></div>
                        {r.inprogress ? (
                          <StatusPill tone="cater" size="sm">Live</StatusPill>
                        ) : (
                          <span className={`mono font-bold ${Math.abs(r.off)<=5?'text-success-700':'text-warning-700'}`}>
                            {r.off>0?'+':''}{r.off.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForecastRow({ icon, tone, label, value, sign, source }) {
  const tones = {
    brand:'bg-brand-50 text-brand-600',
    info:'bg-info-50 text-info-600',
    warning:'bg-warning-50 text-warning-600',
    herb:'bg-herb-50 text-herb-600',
    gray:'bg-elev text-muted',
  };
  const signColor = sign==='+'?'text-success-700':'text-danger-700';
  return (
    <div className="px-5 py-3 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tones[tone]}`}>
        <Icon name={icon} size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-bold">{label}</div>
        <div className="text-[10.5px] text-subtle">{source}</div>
      </div>
      <div className={`text-[18px] font-extrabold mono ${signColor}`}>{sign}{value.toLocaleString('id')}</div>
      <button className="w-7 h-7 rounded hover:bg-elev flex items-center justify-center"><Icon name="more-horizontal" size={14} className="text-subtle" /></button>
    </div>
  );
}

// ============================================================
// W8 — Live Redemption Monitor
// ============================================================
function FacMonitor() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="h-full flex bg-elev">
      <FacSidebar collapsed={collapsed} setCollapsed={setCollapsed} current="monitor" />
      <div className="flex-1 flex flex-col min-w-0">
        <FacTopBar title="Live Redemption Monitor — Slot Siang aktif" sub="Catering · FAC" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
            {/* Map + velocity */}
            <div className="space-y-4">
              <Card padding="p-0">
                <div className="px-5 h-12 flex items-center gap-3 border-b border-token">
                  <Icon name="map" size={16} className="text-cater-600" />
                  <div className="text-[13px] font-bold tracking-tight">Mess locations · live counter</div>
                  <span className="inline-flex items-center gap-1 px-1.5 h-5 rounded bg-cater-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Live
                  </span>
                  <div className="flex-1" />
                  <span className="text-[10px] text-subtle mono">refreshed 12:48:32</span>
                </div>
                <div className="relative h-[340px]" style={{ background:'linear-gradient(180deg, #EAF1F8 0%, #F5EDDF 100%)' }}>
                  {/* roads */}
                  <svg viewBox="0 0 1000 340" className="absolute inset-0 w-full h-full">
                    <path d="M40,200 Q200,170 350,220 T700,180 T960,250" stroke="#9EBCDA" strokeWidth="3" fill="none" strokeDasharray="6 6" />
                    <path d="M120,80 Q280,150 420,90 T720,140" stroke="#9EBCDA" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                    <text x="50" y="50" fontSize="10" fill="#5b6472" fontWeight="700">HAULING ROAD · 126 KM</text>
                  </svg>
                  {/* Mess pins */}
                  {[
                    { x:'15%', y:'48%', name:'Griya Praja',     ratio:1843, fc:2200, big:true,  hot:true },
                    { x:'38%', y:'68%', name:'Simpang Perdau',  ratio:1124, fc:1400, big:true },
                    { x:'58%', y:'30%', name:'Rest Area-1',     ratio:62,   fc:80 },
                    { x:'76%', y:'58%', name:'Rest Area-2',     ratio:88,   fc:100 },
                    { x:'90%', y:'40%', name:'Rest Area-3',     ratio:76,   fc:80 },
                  ].map((p,i) => {
                    const pct = (p.ratio/p.fc)*100;
                    const size = p.big ? 70 : 44;
                    return (
                      <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                           style={{ left:p.x, top:p.y }}>
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full pulse-dot" style={{ color:'#F39800' }} />
                          <div className="relative rounded-full bg-white border-2 border-cater-500 flex flex-col items-center justify-center font-extrabold text-cater-700"
                               style={{ width:size, height:size }}>
                            <div className="mono leading-none" style={{ fontSize: p.big?16:13 }}>{p.ratio.toLocaleString('id')}</div>
                            <div className="text-[8px] text-subtle leading-none mt-0.5">/{p.fc.toLocaleString('id')}</div>
                          </div>
                        </div>
                        <div className="mt-1.5 px-2 py-0.5 rounded bg-white border border-token text-[10px] font-bold whitespace-nowrap shadow-sm">
                          {p.name}
                        </div>
                        {p.hot && <span className="mt-1 inline-flex items-center gap-1 px-1.5 h-4 rounded text-[9px] font-bold bg-danger-500 text-white"><Icon name="flame" size={8} /> peak</span>}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Velocity vs expected */}
              <Card title="Redemption velocity vs expected"
                    right={<div className="flex items-center gap-2 text-[10px]"><span className="inline-flex items-center gap-1"><span className="w-2.5 h-px bg-cater-500" />Actual</span><span className="inline-flex items-center gap-1"><span className="w-2.5 h-px border-t border-dashed border-brand-500" />Expected</span></div>}
                    padding="p-4">
                <BigVelocityChart />
              </Card>
            </div>

            {/* Right: live stream + anomalies */}
            <div className="space-y-4">
              <Card padding="p-0">
                <div className="px-4 h-11 border-b border-token flex items-center gap-2">
                  <Icon name="activity" size={15} className="text-cater-600" />
                  <div className="text-[12px] font-bold uppercase tracking-wider">Stream redemption</div>
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-success-700 font-bold">
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-500 pulse-dot text-success-500" />
                    142/min
                  </span>
                </div>
                <div className="p-3 space-y-1.5 max-h-[280px] overflow-y-auto text-[12px]">
                  {[
                    { n:'Pak Budi Santoso', m:'Ayam bakar', loc:'Griya Praja', t:'12:48:18', new:true },
                    { n:'Rina Wati',        m:'Ayam bakar', loc:'Griya Praja', t:'12:48:11' },
                    { n:'Pak Hadi W.',      m:'Veg lodeh',  loc:'Simpang Perdau', t:'12:48:03', diet:'veg' },
                    { n:'Asep Hidayat',     m:'Ayam bakar', loc:'Rest A-2',    t:'12:47:58' },
                    { n:'Dewi Anggraini',   m:'Ayam bakar', loc:'Griya Praja', t:'12:47:42' },
                    { n:'Joko Pranoto',     m:'Ayam bakar', loc:'Simpang Perdau', t:'12:47:31' },
                    { n:'Lina Marbun',      m:'Bubur ayam', loc:'Griya Praja', t:'12:47:18', diet:'sick' },
                    { n:'Bagas R.',         m:'Ayam bakar', loc:'Rest A-1',    t:'12:47:02' },
                  ].map((r,i) => (
                    <div key={i} className={`flex items-center gap-2 py-1 ${r.new?'bg-cater-50 -mx-3 px-3 rounded':''}`}>
                      <Avatar name={r.n} size={26} tone={r.new?'cater':'gray'} />
                      <div className="flex-1 min-w-0">
                        <div className="truncate"><span className="font-bold">{r.n}</span><span className="text-muted"> just claimed at </span><span className="font-semibold">{r.loc}</span></div>
                      </div>
                      {r.diet === 'veg' && <StatusPill tone="herb" size="sm" icon="leaf">veg</StatusPill>}
                      {r.diet === 'sick' && <StatusPill tone="info" size="sm" icon="heart-pulse">sakit</StatusPill>}
                      <span className="mono text-[10px] text-subtle">{r.t}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Anomalies */}
              <Card title="Anomaly detector" padding="p-0">
                <div className="divide-y divide-[color:var(--border)]">
                  <AnomalyItem tone="warning" icon="trending-down" title="Rest Area-1 below curve"
                    desc="32% slower than expected. Mungkin worker telat sampai lokasi." action="Push reminder" />
                  <AnomalyItem tone="info" icon="trending-up" title="Griya Praja spike"
                    desc="Velocity +18% di 12:30. Tim B shift selesai bareng — natural cluster." />
                  <AnomalyItem tone="danger" icon="alert-triangle" title="13 invalid scans (4 menit)"
                    desc="Voucher expired. Investigate kalau ada pekerja shift atypical." action="Lihat list" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnomalyItem({ tone, icon, title, desc, action }) {
  const toneMap = {
    warning: 'text-warning-600 bg-warning-50',
    info:    'text-info-600 bg-info-50',
    danger:  'text-danger-600 bg-danger-50',
  };
  return (
    <div className="px-4 py-3 flex items-start gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${toneMap[tone]}`}>
        <Icon name={icon} size={17} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-bold">{title}</div>
        <div className="text-[11px] text-muted leading-relaxed">{desc}</div>
        {action && <button className="mt-1.5 text-[11px] font-bold text-cater-700 hover:underline">{action} →</button>}
      </div>
    </div>
  );
}

function BigVelocityChart() {
  const expected = [0,8,28,55,72,80,84,86,88,90,92,93,94,95];
  const actual   = [0,5,22,48,70,82,87,90,92, null,null,null,null,null];
  const labels   = ['11:30','11:40','11:50','12:00','12:10','12:20','12:30','12:40','12:50','13:00','13:10','13:20','13:30'];
  const w = 760, h = 200;
  const xs = i => 24 + (i/(expected.length-1))*(w-30);
  const ys = v => h - 10 - (v/100)*(h-30);
  const pathOf = (arr) => arr.filter(v=>v!==null).map((v,i)=>`${i?'L':'M'}${xs(i)} ${ys(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h+22}`} className="w-full" style={{ maxHeight: 240 }}>
      {[0,0.25,0.5,0.75,1].map((p,i) => (
        <line key={i} x1="24" x2={w} y1={ys(p*100)} y2={ys(p*100)} stroke="#E6E8EC" />
      ))}
      <path d={pathOf(expected)} stroke="#1F4E79" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.7" />
      <path d={pathOf(actual)} stroke="#E68506" strokeWidth="2.5" fill="none" />
      <circle cx={xs(actual.filter(v=>v!==null).length-1)} cy={ys(actual.filter(v=>v!==null).slice(-1)[0])} r="5" fill="#E68506" />
      {labels.map((l,i) => i%2===0 && <text key={i} x={xs(i)} y={h+15} fontSize="9" fill="#8b94a2" textAnchor="middle">{l}</text>)}
    </svg>
  );
}

// ============================================================
// W9 — Complaint / Feedback Management
// ============================================================
function FacFeedback() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [tab, setTab] = React.useState('open');
  const tabs = [
    { id:'recent', label:'Recent feedback', count:1284 },
    { id:'open',   label:'Open complaints', count:4, alert:true },
    { id:'resolved', label:'Resolved', count:38 },
  ];
  const cards = [
    { name:'Asep Hidayat', dept:'Mining', slot:'siang', t:'30m lalu', rating:2, vendor:'Sari Boga', sentiment:'negative',
      txt:'Ayam bakar agak kering, sayur lodeh asin. Tolong vendor SB diperhatikan, sudah 2x kejadian minggu ini.',
      photo:'ayam-bakar', status:'open' },
    { name:'Rina Wati', dept:'KNC Hauling', slot:'sarapan', t:'1h lalu', rating:5, vendor:'Bahari', sentiment:'positive',
      txt:'Bubur ayam Bahari enak banget, hangatnya pas. Pertahankan kualitasnya!', status:'positive' },
    { name:'Bagas Rinaldi', dept:'Workshop', slot:'siang', t:'1h lalu', rating:3, vendor:'Bahari', sentiment:'neutral',
      txt:'Porsi nasi kekecilan untuk shift lapangan. Mungkin bisa opsi extra rice.', status:'open' },
    { name:'Lina Marbun', dept:'Mining', slot:'malam', t:'kemarin', rating:1, vendor:'Nuansa', sentiment:'negative',
      txt:'Nemu rambut di nasi goreng kemarin malam. Higienis Nuansa perlu di-audit ulang.',
      status:'escalated', escalated:'Nuansa Catering · vendor performance review' },
  ];

  return (
    <div className="h-full flex bg-elev">
      <FacSidebar collapsed={collapsed} setCollapsed={setCollapsed} current="feedback" />
      <div className="flex-1 flex flex-col min-w-0">
        <FacTopBar title="Feedback &amp; Complaints" sub="Catering · FAC" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Sentiment KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="heart"          label="Sentiment positive" value="78%"  tone="herb"   sub="dari 1,284 rating" delta="+2%" />
              <KPICard icon="meh"            label="Sentiment neutral"  value="14%"  tone="warning" sub="≥3 ★" />
              <KPICard icon="frown"          label="Sentiment negative" value="8%"   tone="danger" sub="103 review" delta="-1%" />
              <KPICard icon="message-square" label="Avg response time"  value="2.4h" tone="brand"  sub="Target ≤4h" />
            </div>

            {/* Tabs */}
            <Card padding="p-0">
              <div className="px-2 border-b border-token flex items-center gap-1">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`relative px-4 h-11 text-[12.5px] font-bold inline-flex items-center gap-2
                      ${tab===t.id ? 'text-cater-700' : 'text-muted hover:text-[color:var(--text)]'}`}>
                    {t.label}
                    <span className={`px-1.5 h-5 rounded text-[10px] font-bold ${t.alert?'bg-danger-500 text-white':'bg-elev text-muted'}`}>{t.count}</span>
                    {tab===t.id && <span className="absolute left-2 right-2 -bottom-px h-[2px] rounded bg-cater-500" />}
                  </button>
                ))}
                <div className="flex-1" />
                <div className="flex items-center gap-2 pr-3">
                  <FilterChip icon="truck">Vendor</FilterChip>
                  <FilterChip icon="star">Rating</FilterChip>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
                {cards.map((c,i) => (
                  <div key={i} className="rounded-xl border border-token bg-white p-4 hover:border-cater-200 transition-colors">
                    <div className="flex items-start gap-3">
                      <Avatar name={c.name} size={40} tone={c.sentiment==='positive'?'herb':c.sentiment==='negative'?'gray':'cater'} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="font-bold text-[13px]">{c.name}</div>
                          <span className="text-[10px] text-subtle">·</span>
                          <div className="text-[11px] text-muted">{c.dept}</div>
                          <span className="text-[10px] text-subtle">·</span>
                          <div className="text-[11px] text-muted">{c.t}</div>
                          <div className="ml-auto flex items-center gap-1">
                            {[1,2,3,4,5].map(s => (
                              <Icon key={s} name="star" size={11} className={s<=c.rating?'text-cater-500':'text-[color:var(--border-strong)]'} />
                            ))}
                          </div>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                          <StatusPill tone="cater" size="sm" icon={ {sarapan:'sunrise', siang:'sun', malam:'moon'}[c.slot] }>{c.slot}</StatusPill>
                          <StatusPill tone="gray" size="sm" icon="chef-hat">{c.vendor}</StatusPill>
                          {c.sentiment==='negative' && <StatusPill tone="danger" size="sm" icon="frown">negative</StatusPill>}
                          {c.sentiment==='positive' && <StatusPill tone="herb"   size="sm" icon="heart">positive</StatusPill>}
                          {c.sentiment==='neutral'  && <StatusPill tone="warning"size="sm" icon="meh">neutral</StatusPill>}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-[12.5px] leading-relaxed">{c.txt}</div>
                    {c.photo && (
                      <div className="mt-3"><FoodImage kind={c.photo} ratio="16/8" /></div>
                    )}
                    {c.escalated && (
                      <div className="mt-3 rounded-lg bg-danger-50 border border-danger-500/20 p-2.5 text-[11px] text-danger-700 flex items-start gap-2">
                        <Icon name="arrow-up-circle" size={14} className="mt-0.5 shrink-0" />
                        <div><span className="font-bold">Escalated:</span> {c.escalated}</div>
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-2">
                      {c.status==='open' && <>
                        <Btn variant="cater" size="sm" icon="message-square">Respond</Btn>
                        <Btn variant="secondary" size="sm" icon="arrow-up-circle">Escalate</Btn>
                        <Btn variant="ghost" size="sm" icon="check">Mark resolved</Btn>
                      </>}
                      {c.status==='positive' && <>
                        <Btn variant="ghost" size="sm" icon="heart">Like (thank)</Btn>
                        <Btn variant="ghost" size="sm" icon="share-2">Share to vendor</Btn>
                      </>}
                      {c.status==='escalated' && <>
                        <Btn variant="secondary" size="sm" icon="external-link">Lihat case</Btn>
                        <Btn variant="ghost" size="sm" icon="message-square">Update worker</Btn>
                      </>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

window.FacForecast = FacForecast;
window.FacMonitor = FacMonitor;
window.FacFeedback = FacFeedback;
