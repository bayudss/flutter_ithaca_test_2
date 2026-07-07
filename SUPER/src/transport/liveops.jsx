// Transportation — Live Ops W6, Analytics W7.

// ============================================================
// W6 — Live Operations
// ============================================================
function W6_LiveOps() {
  return (
    <div className="h-full w-full flex flex-col" style={{ background:'#0d1520', color:'#fff' }}>
      {/* Top bar */}
      <div className="h-12 px-5 border-b border-white/10 flex items-center gap-4 text-[12px]">
        <div className="flex items-center gap-2"><BrandMark size={22} /><div className="text-[11px] font-bold tracking-wider uppercase">Live Operations · Transport</div></div>
        <div className="h-5 w-px bg-white/15" />
        <div className="inline-flex items-center gap-1.5 text-white/80"><Icon name="bus" size={13} className="text-safety-400" /><span className="font-semibold">12 active · 47 trips today</span></div>
        <div className="flex-1" />
        <div className="text-white/70 mono tabular-nums">06:18:32 · 29 Mei 2026</div>
        <div className="h-5 w-px bg-white/15" />
        <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-danger-500/20 text-danger-400 text-[10px] font-bold uppercase tracking-wider alert-blink"><Icon name="alert-triangle" size={11} /> 3 alerts</span>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_360px] min-h-0">
        {/* Map */}
        <div className="relative">
          <SiteMap dark route height="100%" vehicles={[
            { x:'42%', y:'62%', heading:-25, label:'SHT-04' },
            { x:'58%', y:'42%', heading:-40, label:'SHT-07' },
            { x:'12%', y:'84%', heading:0,   label:'SHT-02' },
            { x:'72%', y:'30%', heading:-30, label:'SHT-11' },
            { x:'80%', y:'52%', heading:60,  label:'SHT-09', alert:true },
            { x:'34%', y:'48%', heading:-15, label:'SHT-13' },
          ]} />
          {/* off-route alert callout on map */}
          <div className="absolute" style={{ left:'80%', top:'52%', transform:'translate(-50%, -120%)' }}>
            <div className="px-2 py-1 rounded-lg bg-danger-500 text-white text-[10px] font-bold shadow-lg whitespace-nowrap alert-blink">SHT-09 off-route 620m</div>
          </div>
          {/* Map legend */}
          <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur rounded-lg p-3 border border-white/10 text-[10.5px]">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-white/60 mb-1.5">Fleet status</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-brand-500" /><span className="text-white/80">Moving · 9</span></div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-warning-500" /><span className="text-white/80">Boarding · 2</span></div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-danger-500" /><span className="text-white/80">Alert · 1</span></div>
            </div>
          </div>
        </div>

        {/* Right: alerts */}
        <div className="border-l border-white/10 flex flex-col min-h-0">
          <div className="p-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 mb-2"><Icon name="alert-triangle" size={14} className="text-danger-500" /><div className="text-[11px] font-extrabold uppercase tracking-wider">Active alerts · 3</div></div>
            <div className="space-y-2">
              {[
                { ic:'route-off', tone:'danger', t:'Vehicle off-route', d:'SHT-09 · 620m dari rute · PIT → Mess', act:'Call driver', sub:'geofence 500m exceeded' },
                { ic:'timer-off', tone:'warning',t:'Vehicle stuck', d:'SHT-13 · idle 18 min di KM 6', act:'Check status', sub:'>15 min stationary' },
                { ic:'gauge',     tone:'warning',t:'Driver fatigue warning', d:'Hendra W. · SHT-02 · 9j 10m drive', act:'Dispatch backup', sub:'approaching 10h limit' },
              ].map((a,i) => (
                <div key={i} className={`rounded-lg p-2.5 border ${a.tone==='danger'?'bg-danger-500/15 border-danger-500/40':'bg-warning-500/12 border-warning-500/35'}`}>
                  <div className="flex items-center gap-2 mb-0.5"><Icon name={a.ic} size={13} className={`text-${a.tone}-400`} /><div className={`text-[11.5px] font-extrabold text-${a.tone}-400 flex-1`}>{a.t}</div></div>
                  <div className="text-[11px] text-white/80 font-semibold">{a.d}</div>
                  <div className="text-[9.5px] text-white/50 mt-0.5">{a.sub}</div>
                  <button className="mt-1.5 text-[10.5px] font-bold text-white/90 inline-flex items-center gap-1 hover:text-white">{a.act} →</button>
                </div>
              ))}
            </div>
          </div>

          {/* SOS section */}
          <div className="p-3 border-b border-white/10 shrink-0">
            <div className="rounded-lg bg-danger-500/15 border border-danger-500/40 p-3">
              <div className="flex items-center gap-2 mb-1.5"><div className="w-7 h-7 rounded-md bg-danger-500 text-white flex items-center justify-center alert-blink"><Icon name="alert-octagon" size={15} /></div><div className="text-[11.5px] font-extrabold text-danger-400">No SOS active</div></div>
              <div className="text-[10px] text-white/60">SOS dari driver akan muncul prominent di sini dengan lokasi + auto-dispatch protokol.</div>
            </div>
          </div>

          {/* Quick dispatch */}
          <div className="p-3 flex-1 min-h-0 overflow-y-auto">
            <div className="text-[11px] font-extrabold uppercase tracking-wider mb-2">Backup drivers available</div>
            <div className="space-y-1.5">
              {[
                { n:'Bambang', rating:4.5, fatigue:'0h', dist:'Camp · ready' },
                { n:'Slamet R.',rating:4.4, fatigue:'1h', dist:'Askara · 5 min' },
                { n:'Wahyu T.', rating:4.7, fatigue:'0h', dist:'Camp · ready' },
              ].map((d,i) => (
                <div key={i} className="rounded-lg bg-white/[0.04] border border-white/10 p-2 flex items-center gap-2.5">
                  <Avatar name={d.n} size={30} photo />
                  <div className="flex-1 min-w-0"><div className="text-[11.5px] font-bold">{d.n}</div><div className="text-[9.5px] text-white/55">⭐ {d.rating} · fatigue {d.fatigue} · {d.dist}</div></div>
                  <button className="h-7 px-2 rounded bg-brand-500 text-white text-[10px] font-bold">Dispatch</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom event stream */}
      <div className="h-[110px] border-t border-white/10 px-5 py-2.5 shrink-0">
        <div className="flex items-center gap-2 mb-1.5"><Icon name="rss" size={13} className="text-safety-400" /><div className="text-[10px] font-extrabold uppercase tracking-wider">Event stream · live</div></div>
        <div className="grid grid-cols-3 gap-2 text-[10.5px]">
          {[
            { t:'06:18:02', ic:'route-off', tone:'danger',  m:'SHT-09 geofence alert · off-route 620m' },
            { t:'06:17:41', ic:'check-circle-2', tone:'success', m:'SHT-04 manifest closed · 22 boarded, 1 no-show' },
            { t:'06:16:18', ic:'play-circle', tone:'success', m:'SHT-07 trip started · Mess → Askara' },
            { t:'06:14:02', ic:'users', tone:'info', m:'SHT-02 boarding · 30/30 full' },
            { t:'06:12:33', ic:'navigation', tone:'info', m:'SHT-11 dispatched · Airport BPN pickup' },
            { t:'06:10:08', ic:'gauge', tone:'warning', m:'Hendra W. fatigue warning · 9h logged' },
          ].map((e,i) => (
            <div key={i} className="flex items-start gap-2 rounded bg-white/[0.04] border border-white/10 p-1.5">
              <Icon name={e.ic} size={12} className={`text-${e.tone}-400 mt-0.5 shrink-0`} />
              <span className="flex-1 text-white/80 truncate">{e.m}</span>
              <span className="text-white/50 mono text-[9.5px] shrink-0">{e.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W7 — Analytics
// ============================================================
function W7_Analytics() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="analytics" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Transport Analytics — Mei 2026" sub="FAC · Reports" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="route" label="Total trips" value="1,284" tone="brand" delta="+12%" />
              <KPICard icon="users" label="Passenger" value="28.4K" tone="success" delta="+8%" />
              <KPICard icon="clock" label="On-time rate" value="94%" tone="success" delta="+2%" />
              <KPICard icon="fuel" label="Fuel cost" value="Rp 142M" tone="warning" delta="-4%" />
              <KPICard icon="gauge" label="Utilization" value="72%" tone="safety" sub="fleet avg" />
            </div>

            {/* Utilization per vehicle */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">Utilization per vehicle · % time in operation</div>
                <div className="space-y-2.5">
                  {[
                    { v:'SHT-04', pct:88, tone:'success' },
                    { v:'SHT-02', pct:82, tone:'success' },
                    { v:'SHT-07', pct:74, tone:'success' },
                    { v:'SHT-11', pct:64, tone:'warning' },
                    { v:'SHT-09', pct:58, tone:'warning' },
                    { v:'SHT-15', pct:22, tone:'danger', note:'maintenance' },
                  ].map(r => (
                    <div key={r.v} className="flex items-center gap-3">
                      <div className="w-16 text-[11.5px] font-extrabold mono">{r.v}</div>
                      <div className="flex-1 h-3 rounded-full bg-elev overflow-hidden"><div className={`h-full bg-${r.tone}-500`} style={{ width:`${r.pct}%` }} /></div>
                      <div className={`text-[12px] font-bold mono w-12 text-right text-${r.tone}-700`}>{r.pct}%</div>
                      {r.note && <span className="text-[9.5px] text-warning-700 font-bold w-20">{r.note}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver performance */}
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">Driver performance</div>
                <table className="w-full text-[11.5px]">
                  <thead><tr className="text-left text-[9.5px] font-bold uppercase tracking-wider text-subtle border-b border-token"><th className="pb-2">Driver</th><th className="pb-2">Trips</th><th className="pb-2">On-time</th><th className="pb-2">Rating</th></tr></thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {[
                      { n:'Rudi S.', trips:142, ot:'98%', r:4.9 },
                      { n:'Sumarno', trips:168, ot:'96%', r:4.8 },
                      { n:'Joko Tri',trips:134, ot:'94%', r:4.7 },
                      { n:'Hendra W.',trips:156, ot:'91%', r:4.6 },
                      { n:'Anto P.', trips:128, ot:'84%', r:4.3, low:true },
                    ].map((d,i) => (
                      <tr key={i}>
                        <td className="py-2"><div className="flex items-center gap-2"><Avatar name={d.n} size={24} photo /><span className="font-bold">{d.n}</span></div></td>
                        <td className="py-2 mono">{d.trips}</td>
                        <td className="py-2"><span className={`mono font-bold ${d.low?'text-warning-700':'text-success-700'}`}>{d.ot}</span></td>
                        <td className="py-2"><span className="inline-flex items-center gap-1 font-bold"><Icon name="star" size={11} className="text-safety-500" />{d.r}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cost per trip + route optimization */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">Cost per trip · trend 6 bulan</div>
                <svg viewBox="0 0 520 180" className="w-full" style={{ maxHeight:200 }}>
                  {[0,0.25,0.5,0.75,1].map((p,i) => <line key={i} x1="36" x2="520" y1={150-p*130} y2={150-p*130} stroke="#E6E8EC" />)}
                  {(() => { const data=[128,124,131,126,119,116]; const labels=['Des','Jan','Feb','Mar','Apr','Mei']; const xs=i=>50+(i/5)*450; const ys=v=>150-((v-100)/40)*130; const path=data.map((v,i)=>`${i?'L':'M'}${xs(i)} ${ys(v)}`).join(' '); const area=path+` L${xs(5)} 150 L${xs(0)} 150 Z`; return (<><defs><linearGradient id="cpt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1F4E79" stopOpacity="0.2" /><stop offset="100%" stopColor="#1F4E79" stopOpacity="0" /></linearGradient></defs><path d={area} fill="url(#cpt)" /><path d={path} stroke="#1F4E79" strokeWidth="2.5" fill="none" />{data.map((v,i)=><g key={i}><circle cx={xs(i)} cy={ys(v)} r={i===5?4:2.5} fill="#1F4E79" /><text x={xs(i)} y={168} fontSize="9" fill="#5b6472" textAnchor="middle">{labels[i]}</text></g>)}<text x="0" y={ys(116)+3} fontSize="9" fill="#8b94a2" fontFamily="JetBrains Mono">Rp116K</text></>); })()}
                </svg>
                <div className="text-[11px] text-muted mt-1">Avg cost per trip turun 9% sejak optimasi rute Q1.</div>
              </div>

              {/* Route optimization AI */}
              <div className="surface rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center"><Icon name="sparkles" size={14} /></div><div className="text-[13px] font-bold tracking-tight">Route optimization · AI</div></div>
                <div className="space-y-2.5">
                  {[
                    { ic:'merge', tone:'success', t:'Merge 06:00 & 06:30 Coal Pad runs', d:'Load factor rata-rata 62% — bisa konsolidasi jadi 1 bus 30-seat, hemat ~Rp 8.4jt/bulan.', cf:'91%' },
                    { ic:'clock', tone:'warning', t:'PIT return 14:00 sering telat', d:'On-time 78% vs avg 94%. Shift change PIT 13:45 bikin boarding lambat — geser ke 14:15.', cf:'86%' },
                    { ic:'trending-up', tone:'info', t:'Askara demand naik 22%', d:'Tambah 1 slot pagi (06:15) untuk Askara — waitlist konsisten 3 minggu terakhir.', cf:'88%' },
                  ].map((r,i) => (
                    <div key={i} className={`rounded-xl p-3 border bg-${r.tone}-50 border-${r.tone}-500/25`}>
                      <div className="flex items-center gap-2"><Icon name={r.ic} size={14} className={`text-${r.tone}-600`} /><div className={`text-[12px] font-extrabold text-${r.tone}-700 flex-1`}>{r.t}</div><span className="text-[9px] mono font-bold bg-white px-1.5 py-0.5 rounded border border-token">{r.cf}</span></div>
                      <div className={`text-[11px] text-${r.tone}-700/85 mt-1 leading-relaxed`}>{r.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.W6_LiveOps = W6_LiveOps;
window.W7_Analytics = W7_Analytics;
