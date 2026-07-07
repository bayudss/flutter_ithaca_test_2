// Analytics — A5 FAC, A6 Command Center.

// ============================================================
// A5 — FAC Dashboard
// ============================================================
function A5_FAC() {
  return (
    <div className="h-full flex bg-elev">
      <AnalyticsSidebar current="fac" />
      <div className="flex-1 flex flex-col min-w-0">
        <AnalyticsTopBar title="Facility Dashboard — Mei 2026" sub="FAC Head · occupancy · catering · transport" period="month" refresh="1h" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="bed-double" label="Occupancy" value="87%" tone="success" sub="4,210 / 4,840 bed" delta="+2%" />
              <KPICard icon="utensils" label="Mess utilization" value="91%" tone="success" delta="+3%" />
              <KPICard icon="bus" label="Shuttle utilization" value="72%" tone="warning" sub="fleet avg" />
              <KPICard icon="trash-2" label="Catering waste" value="4.2%" tone="success" sub="target <5%" delta="-0.5%" />
              <KPICard icon="wrench" label="Maint. closure" value="88%" tone="warning" sub="WO closed on-time" delta="+2%" />
            </div>

            {/* Camp occupancy heatmap */}
            <ChartCard title="Camp occupancy heat map" sub="per camp × building · % terisi">
              <Heatmap
                rows={['Griya Praja','Simpang Perdau','Askara','Rest Area']}
                cols={['Blk A','Blk B','Blk C','Blk D','Blk E','Blk F','Blk G','Blk H']}
                colorBase="29,158,117"
                cellNote={(ri,ci)=>{ const v=0.5+((ri*5+ci*3)%10)/20; return Math.round(Math.min(1,v)*100); }}
                value={(ri,ci)=>{ let v=0.5+((ri*5+ci*3)%10)/20; if(ri===0) v=Math.max(v,0.9); if(ri===3) v*=0.5; return Math.min(1,v); }}
              />
              <div className="mt-3 flex items-center gap-2 text-[10px] text-subtle"><span>Empty</span><div className="flex">{[0.2,0.4,0.6,0.8,1].map(v=><span key={v} className="w-5 h-3" style={{ background:`rgba(29,158,117,${v})` }} />)}</div><span>Full · Griya Praja near capacity</span></div>
            </ChartCard>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              {/* Meal consumption + forecast accuracy */}
              <ChartCard title="Meal consumption · forecast accuracy" sub="actual vs forecast porsi · 7 hari" legend={[{label:'Actual',color:'#1D9E75'},{label:'Forecast',color:'#E24B4A'}]}>
                <LineChart color="#1D9E75" target={12450} max={14000}
                  data={[12100,12340,11980,12450,12200,11800,12380]}
                  labels={['Sen','Sel','Rab','Kam','Jum','Sab','Min']} />
                <div className="mt-2 text-[11px] text-success-700 font-semibold flex items-center gap-1.5"><Icon name="target" size={13} /> Forecast accuracy ±3.2% · dalam target ±5%.</div>
              </ChartCard>

              {/* Shuttle on-time */}
              <ChartCard title="Shuttle on-time performance" sub="% on-time per rute" legend={[{label:'On-time %',color:'#1F4E79'},{label:'Target 90%',color:'#E24B4A'}]}>
                <ColumnChart color="#1F4E79" target={90} max={100}
                  data={[96,88,94,82,91]}
                  labels={['R1 PIT','R2 Coal','R3 Askara','R4 Airport','R5 Port']} />
              </ChartCard>
            </div>

            {/* Cost dashboard */}
            <ChartCard title="Facility cost dashboard · Mei 2026" sub="breakdown biaya operasional">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Catering</div><HBars max={15} items={[
                  { lbl:'Bahari', v:5.8, fmt:'Rp 5.8M', color:'#1D9E75' },{ lbl:'Sari Boga', v:4.2, fmt:'Rp 4.2M', color:'#F39800' },{ lbl:'Nuansa', v:3.6, fmt:'Rp 3.6M', color:'#378ADD' },
                ]} /></div>
                <div><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Housekeeping</div><HBars max={8} items={[
                  { lbl:'Cleaning', v:4.2, fmt:'Rp 4.2M', color:'#1F4E79' },{ lbl:'Laundry', v:2.8, fmt:'Rp 2.8M', color:'#4179AE' },{ lbl:'Supplies', v:1.4, fmt:'Rp 1.4M', color:'#9EBCDA' },
                ]} /></div>
                <div><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Maintenance</div><HBars max={6} items={[
                  { lbl:'AC/Electrical', v:3.1, fmt:'Rp 3.1M', color:'#EF9F27' },{ lbl:'Plumbing', v:1.8, fmt:'Rp 1.8M', color:'#F7B354' },{ lbl:'Civil', v:2.4, fmt:'Rp 2.4M', color:'#FACB87' },
                ]} /></div>
              </div>
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// A6 — Command Center Live (dark, multi-panel)
// ============================================================
function A6_CommandCenter() {
  return (
    <div className="h-full w-full flex flex-col" style={{ background:'#0d1520', color:'#fff' }}>
      {/* Top bar */}
      <div className="h-12 px-5 border-b border-white/10 flex items-center gap-4 text-[12px] shrink-0">
        <div className="flex items-center gap-2"><BrandMark size={22} /><div className="text-[11px] font-bold tracking-wider uppercase">Command Center · Nusaraya Ops</div></div>
        <div className="flex-1" />
        <div className="text-white/70 mono tabular-nums">14:32:08 · 29 Mei 2026</div>
        <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-danger-500/20 text-danger-400 text-[10px] font-bold uppercase tracking-wider alert-blink"><Icon name="alert-octagon" size={11} /> 1 SOS active</span>
        <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-success-500/20 text-success-400 text-[10px] font-bold uppercase tracking-wider"><span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-500 pulse-dot text-success-500" /> All systems</span>
      </div>

      {/* Multi-panel grid */}
      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-2 p-2">
        {/* SOS panel */}
        <div className="rounded-xl bg-danger-500/10 border border-danger-500/40 p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2"><Icon name="alert-octagon" size={15} className="text-danger-400" /><div className="text-[11px] font-extrabold uppercase tracking-wider text-danger-400">SOS Active</div><span className="ml-auto text-[9px] mono text-danger-400 alert-blink">● REC</span></div>
          <div className="flex-1 rounded-lg bg-danger-500/15 p-3">
            <div className="flex items-center gap-2.5"><Avatar name="Joko Pranoto" size={36} tone="danger" /><div className="flex-1"><div className="text-[13px] font-extrabold">Joko Pranoto</div><div className="text-[10px] text-white/60">PIT Bahana · Sec 3</div></div></div>
            <div className="mt-2 text-[11px] text-white/80">Medical emergency · triggered 14:30:42</div>
            <div className="mt-2 flex items-center gap-1.5"><StatusPill tone="danger" size="sm" icon="ambulance">Responder en-route</StatusPill><span className="text-[10px] mono text-white/60">ETA 3m</span></div>
          </div>
        </div>

        {/* PTW active map */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2"><Icon name="clipboard-list" size={15} className="text-safety-400" /><div className="text-[11px] font-extrabold uppercase tracking-wider">PTW Active · 12</div></div>
          <div className="flex-1 relative map-dark rounded-lg overflow-hidden">
            <svg viewBox="0 0 300 160" className="absolute inset-0 w-full h-full"><path d="M20,120 Q90,90 160,110 T290,80" stroke="#2a3a52" strokeWidth="6" fill="none" /></svg>
            {[{x:'25%',y:'60%',c:'#E24B4A'},{x:'50%',y:'45%',c:'#378ADD'},{x:'70%',y:'62%',c:'#F39800'},{x:'85%',y:'40%',c:'#EF9F27'}].map((p,i)=>(
              <div key={i} className="absolute w-6 h-6 rounded-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2" style={{ left:p.x, top:p.y, background:p.c }}><Icon name="clipboard-list" size={12} className="text-white" /></div>
            ))}
          </div>
        </div>

        {/* Production live */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1 self-start"><Icon name="mountain" size={15} className="text-success-400" /><div className="text-[11px] font-extrabold uppercase tracking-wider">Production (FMS)</div></div>
          <div className="flex-1 flex items-center"><Gauge value={68} max={100} label="of target" size={130} tone="success" /></div>
          <div className="text-[11px] mono text-white/70">42,180 / 62,000 t · 2,940 t/h</div>
        </div>

        {/* Shuttle live */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2"><Icon name="bus" size={15} className="text-info-400" /><div className="text-[11px] font-extrabold uppercase tracking-wider">Shuttle · 12 active</div></div>
          <div className="flex-1 relative map-dark rounded-lg overflow-hidden">
            <svg viewBox="0 0 300 160" className="absolute inset-0 w-full h-full"><path d="M20,110 Q100,80 180,100 T290,70" stroke="#2a3a52" strokeWidth="6" fill="none" /></svg>
            {[{x:'30%',y:'58%'},{x:'55%',y:'48%'},{x:'78%',y:'44%'}].map((p,i)=>(
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left:p.x, top:p.y }}><div className="w-6 h-6 rounded-lg bg-brand-500 flex items-center justify-center"><Icon name="bus" size={12} className="text-white" /></div></div>
            ))}
            <div className="absolute bottom-1.5 left-1.5 text-[9px] mono text-white/60">on-time 94%</div>
          </div>
        </div>

        {/* Weather */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2"><Icon name="cloud-sun" size={15} className="text-safety-400" /><div className="text-[11px] font-extrabold uppercase tracking-wider">Weather · Site</div></div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3"><Icon name="cloud-sun" size={44} className="text-safety-400" /><div><div className="text-[28px] font-extrabold mono leading-none">31°C</div><div className="text-[11px] text-white/60">Berawan · humid</div></div></div>
            <div className="mt-3 grid grid-cols-2 gap-1.5 text-[10.5px]">
              <div className="rounded bg-white/5 p-1.5"><span className="text-white/55">Hujan</span> <span className="font-bold float-right">20%</span></div>
              <div className="rounded bg-white/5 p-1.5"><span className="text-white/55">Angin</span> <span className="font-bold float-right">12 km/h</span></div>
              <div className="rounded bg-white/5 p-1.5"><span className="text-white/55">Jarak pandang</span> <span className="font-bold float-right">8 km</span></div>
              <div className="rounded bg-white/5 p-1.5"><span className="text-white/55">Status ops</span> <span className="font-bold text-success-400 float-right">Normal</span></div>
            </div>
          </div>
        </div>

        {/* System health */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2"><Icon name="server" size={15} className="text-success-400" /><div className="text-[11px] font-extrabold uppercase tracking-wider">System Health</div></div>
          <div className="flex-1 space-y-1.5">
            {[
              { s:'SuperApps API', u:'99.98%', ok:true },
              { s:'SAP S/4HANA', u:'99.9%', ok:true },
              { s:'FMS PrimaMine', u:'99.7%', ok:true },
              { s:'Toledo weighbridge', u:'98.2%', ok:true },
              { s:'GPS/telemetry', u:'97.1%', warn:true },
            ].map((r,i) => (
              <div key={i} className="flex items-center gap-2 text-[11px]"><span className={`w-2 h-2 rounded-full ${r.warn?'bg-warning-500':'bg-success-500'}`} /><span className="flex-1 text-white/80">{r.s}</span><span className={`mono font-bold ${r.warn?'text-warning-400':'text-success-400'}`}>{r.u}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI ticker */}
      <div className="h-9 border-t border-white/10 bg-black/30 flex items-center overflow-hidden shrink-0">
        <div className="px-3 h-full flex items-center bg-brand-700 text-[10px] font-extrabold uppercase tracking-wider shrink-0">Live KPI</div>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker flex items-center gap-8 whitespace-nowrap text-[11px] mono absolute" style={{ width:'max-content' }}>
            {[...Array(2)].map((_,k) => (
              <React.Fragment key={k}>
                <span className="text-white/80">Production <span className="text-success-400 font-bold">42,180 t (68%)</span></span>
                <span className="text-white/80">Workforce <span className="text-info-400 font-bold">5,142 active</span></span>
                <span className="text-white/80">Attendance <span className="text-success-400 font-bold">93.5%</span></span>
                <span className="text-white/80">PTW active <span className="text-safety-400 font-bold">12</span></span>
                <span className="text-white/80">Safety incidents MTD <span className="text-danger-400 font-bold">2</span></span>
                <span className="text-white/80">Shuttle on-time <span className="text-success-400 font-bold">94%</span></span>
                <span className="text-white/80">Mess utilization <span className="text-success-400 font-bold">91%</span></span>
                <span className="text-white/80">Compliance <span className="text-success-400 font-bold">97%</span></span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="px-3 h-full flex items-center gap-1.5 text-[10px] text-white/50 shrink-0 border-l border-white/10"><Icon name="settings" size={12} /> Configurable</div>
      </div>
    </div>
  );
}

window.A5_FAC = A5_FAC;
window.A6_CommandCenter = A6_CommandCenter;
