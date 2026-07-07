// Analytics — A1 Executive, A2 Operational.

// ============================================================
// A1 — Executive Dashboard
// ============================================================
function A1_Executive() {
  return (
    <div className="h-full flex bg-elev">
      <AnalyticsSidebar current="executive" />
      <div className="flex-1 flex flex-col min-w-0">
        <AnalyticsTopBar title="Executive Dashboard — Mei 2026" sub="CEO · COO · strategic view" period="month" refresh="5m" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Hero KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <HeroKPI icon="users"         label="Workforce active" value="5,142" sub="organic + kontraktor" tone="brand"   delta="+1.2%" />
              <HeroKPI icon="mountain"      label="Production (Mt)"  value="1.24"  unit="Mt" sub="batu bara · bulan ini" tone="success" delta="+8%" target={{ ok:true, label:'+8% vs target' }} />
              <HeroKPI icon="shield-alert"  label="Safety incidents" value="2"     sub="bulan ini" tone="danger"  delta="-1" target={{ ok:true, label:'target <5' }} />
              <HeroKPI icon="badge-check"   label="Compliance score" value="97"    unit="%" sub="aggregate semua modul" tone="info" delta="+1%" />
            </div>

            {/* Trend grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard title="Production trend · 12 bulan" sub="ribu ton · vs target line" legend={[{label:'Actual',color:'#1D9E75'},{label:'Target',color:'#E24B4A'}]}>
                <LineChart color="#1D9E75" target={1150} max={1400}
                  data={[980,1020,1060,1010,1090,1120,1080,1150,1180,1140,1210,1240]}
                  labels={['Jun','Jul','Agu','Sep','Okt','Nov','Des','Jan','Feb','Mar','Apr','Mei']} />
              </ChartCard>
              <ChartCard title="Workforce headcount trend" sub="total tenaga kerja aktif" legend={[{label:'Headcount',color:'#1F4E79'}]}>
                <LineChart color="#1F4E79" max={5500}
                  data={[4680,4720,4810,4850,4920,4980,5010,5050,5080,5100,5120,5142]}
                  labels={['Jun','Jul','Agu','Sep','Okt','Nov','Des','Jan','Feb','Mar','Apr','Mei']} />
              </ChartCard>
              <ChartCard title="Safety incident trend" sub="kolom · threshold target merah" legend={[{label:'Incidents',color:'#1F4E79'},{label:'Over target',color:'#E24B4A'}]}>
                <ColumnChart color="#1F4E79" target={5} max={10}
                  data={[3,4,2,6,3,5,4,3,2,4,3,2]}
                  labels={['Jun','Jul','Agu','Sep','Okt','Nov','Des','Jan','Feb','Mar','Apr','Mei']} />
              </ChartCard>
              <ChartCard title="Operational cost per ton" sub="USD/ton · turun = lebih baik" legend={[{label:'Cost/ton',color:'#F39800'}]}>
                <LineChart color="#F39800" max={40}
                  data={[34.2,33.8,33.1,33.5,32.8,32.2,31.9,31.4,31.1,30.8,30.5,30.1]}
                  labels={['Jun','Jul','Agu','Sep','Okt','Nov','Des','Jan','Feb','Mar','Apr','Mei']} />
              </ChartCard>
            </div>

            {/* AI Insights + data sources */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
              <div className="surface rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center"><Icon name="sparkles" size={14} /></div>
                  <div className="text-[13px] font-bold tracking-tight">AI Strategic Insights</div>
                  <span className="ml-auto text-[10px] mono text-subtle">generated 06:00 · Azure ML</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <AIInsight tone="success" icon="trending-up" title="Production exceeded target 8%" body="1.24 Mt vs target 1.15 Mt. Driver utama: OEE PIT Bahana naik ke 82% setelah preventive maintenance program Q1." cf="96%" action="Drill production" />
                  <AIInsight tone="warning" icon="alert-triangle" title="Capacity risk: workforce lag" body="Production tumbuh +8% tapi workforce hanya +1.2%. Per-capita output naik — sustainable 2-3 bulan, lalu butuh hiring." cf="88%" action="HR capacity plan" />
                  <AIInsight tone="danger" icon="shield-alert" title="2 safety incidents — investigate" body="Keduanya di shift malam area hauling. Pola fatigue-related. Recommend review jadwal shift + fatigue management driver." cf="91%" action="HSE root-cause" />
                </div>
              </div>
              <div className="surface rounded-xl p-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Data freshness</div>
                <div className="space-y-2 text-[11.5px]">
                  {[
                    { s:'SuperApps modules', t:'real-time', ok:true },
                    { s:'SAP S/4HANA (HR/FI)', t:'sync 6 jam · 06:00', ok:true },
                    { s:'FMS PrimaMine (produksi)', t:'real-time', ok:true },
                    { s:'Toledo weighbridge', t:'15 min', ok:true },
                    { s:'Azure Data Lake', t:'sync 04:00', ok:true },
                  ].map((d,i) => (
                    <div key={i} className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-success-500" /><div className="flex-1"><div className="font-bold">{d.s}</div><div className="text-[10px] text-subtle">{d.t}</div></div><Icon name="check-circle-2" size={14} className="text-success-500" /></div>
                  ))}
                </div>
                <Btn variant="secondary" size="sm" full icon="file-text" className="mt-4">Monthly board report</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// A2 — Operational Dashboard
// ============================================================
function A2_Operational() {
  return (
    <div className="h-full flex bg-elev">
      <AnalyticsSidebar current="operational" />
      <div className="flex-1 flex flex-col min-w-0">
        <AnalyticsTopBar title="Operational Dashboard — Live" sub="Operations Manager · throughput" period="today" refresh="30s" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="bus" label="Equipment availability" value="91%" tone="success" sub="42/46 units" delta="+2%" />
              <KPICard icon="gauge" label="OEE" value="82%" tone="success" sub="target 80%" delta="+3%" />
              <KPICard icon="timer" label="Hauling cycle time" value="24m" tone="warning" sub="target ≤22m" delta="-1m" />
              <KPICard icon="scale" label="Weighbridge throughput" value="384" tone="brand" sub="trucks today" delta="+18" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-4">
              {/* Real-time production gauge */}
              <div className="surface rounded-xl p-5 flex flex-col items-center">
                <div className="text-[13px] font-bold tracking-tight self-start mb-2">Production live (FMS)</div>
                <Gauge value={68} max={100} label="of daily target" size={190} tone="success" />
                <div className="text-center mt-1"><div className="text-[20px] font-extrabold mono">42,180 <span className="text-[12px] text-subtle">/ 62,000 t</span></div><div className="text-[11px] text-muted">target hari ini · 14:30 WITA</div></div>
                <div className="mt-3 w-full grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg bg-elev p-2"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Rate</div><div className="text-[13px] font-extrabold mono">2,940 t/h</div></div>
                  <div className="rounded-lg bg-elev p-2"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">ETA target</div><div className="text-[13px] font-extrabold mono">21:10</div></div>
                </div>
              </div>

              {/* Map production sites */}
              <ChartCard title="Production sites · status" right={<span className="inline-flex items-center gap-1 px-1.5 h-5 rounded bg-success-500 text-white text-[10px] font-bold uppercase tracking-wider"><span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Live</span>}>
                <div className="relative h-[230px] rounded-lg overflow-hidden" style={{ background:'linear-gradient(180deg, #EAF1F8 0%, #FEF4E5 100%)' }}>
                  <svg viewBox="0 0 600 230" className="absolute inset-0 w-full h-full">
                    <path d="M0,140 Q150,120 300,140 T600,130" stroke="#c3d3e6" strokeWidth="10" fill="none" />
                    <circle cx="120" cy="90" r="50" fill="#1d9e7515" stroke="#1D9E75" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="380" cy="150" r="46" fill="#ef9f2715" stroke="#EF9F27" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="510" cy="80" r="38" fill="#e24b4a15" stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="4 4" />
                  </svg>
                  {[
                    { x:'20%', y:'39%', n:'PIT Bahana', oee:'82%', tone:'success' },
                    { x:'63%', y:'65%', n:'PIT Nagari', oee:'71%', tone:'warning' },
                    { x:'85%', y:'35%', n:'Coal Pad', oee:'58%', tone:'danger' },
                  ].map((s,i) => (
                    <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left:s.x, top:s.y }}>
                      <div className={`w-10 h-10 rounded-xl bg-${s.tone}-500 text-white flex items-center justify-center shadow-lg`}><Icon name="mountain" size={18} /></div>
                      <div className="mt-1 px-1.5 py-0.5 rounded bg-white/95 text-[9px] font-bold mono text-center shadow-sm whitespace-nowrap">{s.n} · {s.oee}</div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              <ChartCard title="Hauling efficiency by route" sub="cycle time menit · target ≤22m" legend={[{label:'Cycle time',color:'#1F4E79'},{label:'Target',color:'#E24B4A'}]}>
                <ColumnChart color="#1F4E79" target={22} max={32}
                  data={[20,24,28,21,26,19]}
                  labels={['R1','R2','R3','R4','R5','R6']} />
              </ChartCard>
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">Bottleneck identification</div>
                <div className="space-y-2">
                  {[
                    { t:'Weighbridge WB-02 antrian', d:'Avg wait 12 min · 8 truck queue saat peak 13:00-15:00', sev:'high', act:'Buka WB-03 backup' },
                    { t:'Coal Pad loading lambat', d:'OEE 58% · 2 excavator maintenance', sev:'high', act:'Reassign unit' },
                    { t:'Route R3 cycle over target', d:'28m vs 22m · jalan rusak KM 8', sev:'medium', act:'Road maintenance WO' },
                  ].map((b,i) => (
                    <div key={i} className={`rounded-xl p-3 border ${b.sev==='high'?'bg-danger-50 border-danger-500/25':'bg-warning-50 border-warning-500/25'}`}>
                      <div className="flex items-center gap-2"><Icon name="alert-triangle" size={14} className={b.sev==='high'?'text-danger-600':'text-warning-600'} /><div className={`text-[12.5px] font-extrabold flex-1 ${b.sev==='high'?'text-danger-700':'text-warning-700'}`}>{b.t}</div></div>
                      <div className={`text-[11px] mt-0.5 ${b.sev==='high'?'text-danger-700/85':'text-warning-700/85'}`}>{b.d}</div>
                      <button className={`mt-1.5 text-[11px] font-bold ${b.sev==='high'?'text-danger-700':'text-warning-700'} underline`}>{b.act} →</button>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-muted"><Icon name="git-fork" size={13} /> Drill-down per shift · per area tersedia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.A1_Executive = A1_Executive;
window.A2_Operational = A2_Operational;
