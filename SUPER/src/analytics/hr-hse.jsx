// Analytics — A3 HR, A4 HSE.

// ============================================================
// A3 — HR Dashboard
// ============================================================
function A3_HR() {
  return (
    <div className="h-full flex bg-elev">
      <AnalyticsSidebar current="hr" />
      <div className="flex-1 flex flex-col min-w-0">
        <AnalyticsTopBar title="HR Dashboard — Mei 2026" sub="HR Head · workforce KPI" period="month" refresh="6h" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="users" label="Total workforce" value="5,142" tone="brand" sub="3,012 organik · 2,130 kontraktor" />
              <KPICard icon="check-circle-2" label="Attendance" value="93.5%" tone="success" delta="+1.4%" />
              <KPICard icon="user-minus" label="Turnover rate" value="2.1%" tone="warning" sub="bulan ini · annualized 8%" delta="-0.3%" />
              <KPICard icon="clock" label="Overtime" value="6.8%" tone="warning" sub="dari total jam" delta="+0.5%" />
              <KPICard icon="palmtree" label="Leave balance avg" value="8.2" tone="info" sub="hari per karyawan" />
            </div>

            {/* Attendance heatmap */}
            <ChartCard title="Attendance heatmap · 30 hari × jam" sub="intensitas clock-in per jam (warna gelap = peak)">
              <Heatmap
                rows={['00–04','04–08','08–12','12–16','16–20','20–24']}
                cols={Array.from({length:30}).map((_,i)=>`${i+1}`)}
                colorBase="31,78,121"
                value={(ri,ci) => { let v=0.08+((ri*7+ci*3)%10)/40; if(ri===1) v=Math.max(v,0.85); if(ri===4) v=Math.max(v,0.75); if((ci+1)%7===0||(ci)%7===6) v*=0.4; return Math.min(1,v); }}
              />
              <div className="mt-3 flex items-center gap-2 text-[10px] text-subtle"><span>Quiet</span><div className="flex">{[0.1,0.3,0.5,0.7,0.9].map(v=><span key={v} className="w-5 h-3" style={{ background:`rgba(31,78,121,${v})` }} />)}</div><span>Peak · shift change 04–08 &amp; 16–20</span></div>
            </ChartCard>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              {/* Distribution */}
              <ChartCard title="Distribution by department" legend={[{label:'Organik',color:'#1F4E79'},{label:'Kontraktor',color:'#F39800'}]}>
                <GroupBars labels={['Mining','Hauling','Plant','Workshop','HSE','Support']}
                  series={[{ color:'#1F4E79', data:[820,340,410,280,190,972] },{ color:'#F39800', data:[640,880,120,310,40,140] }]} />
              </ChartCard>

              {/* Top frequent late */}
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">Top 10 frequent late</div>
                <div className="space-y-1.5">
                  {[
                    { n:'Eko Saputra', ctr:'PT BWS', n2:8 },
                    { n:'Henny Sari', ctr:'PT KNC', n2:6 },
                    { n:'Joko Pranoto', ctr:'PT KNC', n2:5 },
                    { n:'Bagas R.', ctr:'PT BWS', n2:5 },
                    { n:'Surya P.', ctr:'PT SMS', n2:4 },
                  ].map((r,i) => (
                    <div key={i} className="flex items-center gap-2.5 py-1">
                      <span className="w-5 text-[11px] mono text-subtle font-bold">#{i+1}</span>
                      <Avatar name={r.n} size={28} photo />
                      <div className="flex-1 min-w-0"><div className="text-[12px] font-bold truncate">{r.n}</div><div className="text-[10px] text-subtle">{r.ctr}</div></div>
                      <StatusPill tone={r.n2>=6?'danger':'warning'} size="sm" icon="clock">{r.n2}× telat</StatusPill>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
              {/* Leave forecast */}
              <ChartCard title="Leave forecast · 30 hari ke depan" sub="anticipated absence per minggu" legend={[{label:'Planned leave',color:'#378ADD'}]}>
                <ColumnChart color="#378ADD" max={120}
                  data={[42,68,95,54]}
                  labels={['Minggu 1','Minggu 2 (Idul Adha)','Minggu 3','Minggu 4']} highlightLast={false} />
                <div className="mt-2 text-[11px] text-warning-700 font-semibold flex items-center gap-1.5"><Icon name="alert-triangle" size={13} /> Minggu 2 spike (Idul Adha) — 95 cuti, perlu antisipasi shuttle &amp; catering.</div>
              </ChartCard>
              {/* Action items */}
              <div className="surface rounded-xl p-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Action items HR</div>
                <div className="space-y-2 text-[11.5px]">
                  {[
                    { ic:'user-plus', t:'Hiring plan capacity', tone:'warning' },
                    { ic:'calendar-x', t:'Antisipasi cuti Idul Adha', tone:'danger' },
                    { ic:'graduation-cap', t:'23 worker MCU expiring', tone:'warning' },
                    { ic:'trending-up', t:'Review OT spike Hauling', tone:'info' },
                  ].map((a,i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-elev"><div className={`w-7 h-7 rounded-md bg-${a.tone}-50 text-${a.tone}-600 flex items-center justify-center`}><Icon name={a.ic} size={14} /></div><span className="flex-1 font-semibold">{a.t}</span><Icon name="chevron-right" size={14} className="text-subtle" /></div>
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

// ============================================================
// A4 — HSE Dashboard
// ============================================================
function A4_HSE() {
  return (
    <div className="h-full flex bg-elev">
      <AnalyticsSidebar current="hse" />
      <div className="flex-1 flex flex-col min-w-0">
        <AnalyticsTopBar title="HSE Dashboard — Mei 2026" sub="Safety Head · safety KPI" period="month" refresh="real-time" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
              <KPICard icon="activity" label="LTIR" value="0.42" tone="success" sub="per 200K hrs" delta="-0.08" />
              <KPICard icon="alert-octagon" label="LTI count" value="2" tone="danger" sub="YTD" />
              <KPICard icon="trending-down" label="TRIR" value="1.18" tone="success" delta="-0.2" />
              <KPICard icon="eye" label="Near-miss" value="142" tone="info" sub="reported · good" delta="+18" />
              <KPICard icon="clipboard-list" label="PTW issued" value="384" tone="brand" sub="bulan ini" />
              <KPICard icon="check-check" label="Obs closure" value="92%" tone="success" delta="+4%" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              {/* Pareto incident by category */}
              <ChartCard title="Incident Pareto · by category" sub="bar + cumulative % (80/20)">
                <Pareto data={[
                  { lbl:'Slip/trip', v:38, color:'#E24B4A' },
                  { lbl:'Vehicle', v:24, color:'#EF9F27' },
                  { lbl:'Equipment', v:18, color:'#F39800' },
                  { lbl:'Manual handling', v:12, color:'#FACB87' },
                  { lbl:'Electrical', v:6, color:'#FCE3BC' },
                  { lbl:'Other', v:4, color:'#E6E8EC' },
                ]} />
                <div className="mt-2 text-[11px] text-muted">Slip/trip + vehicle = 62% incident. Fokus intervensi di 2 kategori ini.</div>
              </ChartCard>

              {/* Incident location heatmap */}
              <ChartCard title="Incident by location" sub="map heat · 6 area">
                <div className="relative h-[200px] rounded-lg overflow-hidden" style={{ background:'linear-gradient(180deg, #EAF1F8 0%, #FEF4E5 100%)' }}>
                  <svg viewBox="0 0 600 200" className="absolute inset-0 w-full h-full"><path d="M0,120 Q150,100 300,120 T600,110" stroke="#c3d3e6" strokeWidth="10" fill="none" /></svg>
                  {[
                    { x:'18%', y:'40%', n:'PIT Bahana', c:8, tone:'danger' },
                    { x:'46%', y:'66%', n:'Hauling Rd', c:6, tone:'danger' },
                    { x:'72%', y:'34%', n:'Workshop', c:3, tone:'warning' },
                    { x:'86%', y:'62%', n:'Coal Pad', c:2, tone:'warning' },
                    { x:'30%', y:'78%', n:'Plant', c:1, tone:'success' },
                  ].map((s,i) => (
                    <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left:s.x, top:s.y }}>
                      <div className={`rounded-full bg-${s.tone}-500/30 border-2 border-${s.tone}-500 flex items-center justify-center`} style={{ width:24+s.c*4, height:24+s.c*4 }}><span className={`text-[11px] font-extrabold text-${s.tone}-700 mono`}>{s.c}</span></div>
                      <div className="mt-1 text-[9px] font-bold text-center whitespace-nowrap">{s.n}</div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              {/* PTW dashboard */}
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">PTW dashboard</div>
                <div className="flex items-center gap-5">
                  <Donut size={140} total="12" totalLabel="ACTIVE" values={[
                    { c:'#E24B4A', v:3 },{ c:'#378ADD', v:2 },{ c:'#F39800', v:3 },{ c:'#EF9F27', v:2 },{ c:'#8B5A2B', v:1 },{ c:'#5b6472', v:1 },
                  ]} />
                  <div className="flex-1 space-y-1.5 text-[11.5px]">
                    {[
                      { l:'Hot Work', n:3, c:'#E24B4A' },{ l:'Confined Space', n:2, c:'#378ADD' },{ l:'Work at Height', n:3, c:'#F39800' },{ l:'Isolation', n:2, c:'#EF9F27' },{ l:'Excavation', n:1, c:'#8B5A2B' },{ l:'General', n:1, c:'#5b6472' },
                    ].map(r => <div key={r.l} className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{ background:r.c }} /><span className="flex-1 font-semibold">{r.l}</span><span className="mono font-bold">{r.n}</span></div>)}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-success-50 p-3"><div className="text-[10px] uppercase tracking-wider text-success-700/80 font-bold">Compliance rate</div><div className="text-[20px] font-extrabold mono text-success-700">97%</div></div>
                  <div className="rounded-lg bg-warning-50 p-3"><div className="text-[10px] uppercase tracking-wider text-warning-700/80 font-bold">Avg approval time</div><div className="text-[20px] font-extrabold mono text-warning-700">22m</div></div>
                </div>
              </div>

              {/* Observation trend + behavioral */}
              <ChartCard title="Safety observation submission trend" sub="harian · 30 hari · behavioral analytics" legend={[{label:'Observations',color:'#1D9E75'}]}>
                <LineChart color="#1D9E75" max={60}
                  data={[28,34,31,42,38,45,40,48,44,52,49,46,51,48,42,38,44,50,47,53,49,45,51,48,52,46,50,54,49,47]}
                  labels={Array.from({length:30}).map((_,i)=>`${i+1}`)} />
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-elev p-2"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Unsafe condition</div><div className="text-[14px] font-extrabold mono text-warning-700">628</div></div>
                  <div className="rounded-lg bg-elev p-2"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Unsafe act</div><div className="text-[14px] font-extrabold mono text-danger-700">412</div></div>
                  <div className="rounded-lg bg-elev p-2"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Positive</div><div className="text-[14px] font-extrabold mono text-success-700">284</div></div>
                </div>
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.A3_HR = A3_HR;
window.A4_HSE = A4_HSE;
