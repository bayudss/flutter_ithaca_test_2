// Accommodation — FAC web screens W1-W5.

// ============================================================
// W1 — Accommodation Dashboard
// ============================================================
function W1_Dashboard() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="dashboard" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Accommodation Dashboard — Jumat, 29 Mei 2026" sub="FAC · Accommodation" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="bed-double" label="Bed occupied" value="2,178" tone="brand" sub="dari 2,500 bed" />
              <KPICard icon="percent" label="Occupancy rate" value="87%" tone="success" delta="+2%" />
              <KPICard icon="spray-can" label="Housekeeping done" value="92%" tone="success" sub="hari ini" delta="+4%" />
              <KPICard icon="wrench" label="Maintenance open" value="7" tone="warning" sub="2 high priority" />
              <KPICard icon="door-open" label="Out of service" value="14" tone="danger" sub="rooms" />
            </div>

            {/* Occupancy heatmap */}
            <div className="surface rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div><div className="text-[13px] font-bold tracking-tight">Occupancy heat map · 30 hari</div><div className="text-[10.5px] text-subtle mt-0.5">per camp · warna gelap = penuh</div></div>
                <FilterChip icon="calendar" active>Mei 2026</FilterChip>
              </div>
              <OccHeatmap rows={[
                { name:'Griya Praja', base:0.78 },
                { name:'Simpang Perdau', base:0.68 },
                { name:'Rest Area KM-78', base:0.42 },
                { name:'Rest Area KM-126', base:0.38 },
              ]} />
              <div className="mt-3 flex items-center gap-2 text-[10px] text-subtle"><span>Kosong</span><div className="flex">{[0.2,0.4,0.6,0.8,0.99].map(v=><span key={v} className="w-5 h-3" style={{ background:`rgba(29,158,117,${v})` }} />)}</div><span>Penuh · spike minggu 2 (Idul Adha)</span></div>
            </div>

            {/* Per camp breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">Per camp breakdown</div>
                <div className="space-y-3">
                  {[
                    { c:'Griya Praja', occ:1180, cap:1300, tone:'success' },
                    { c:'Simpang Perdau', occ:780, cap:950, tone:'success' },
                    { c:'Rest Area KM-78', occ:120, cap:140, tone:'warning' },
                    { c:'Rest Area KM-126', occ:98, cap:110, tone:'warning' },
                  ].map(r => { const pct=Math.round(r.occ/r.cap*100); return (
                    <div key={r.c}>
                      <div className="flex items-center justify-between text-[11.5px] mb-1"><span className="font-bold">{r.c}</span><span className="mono"><span className="font-bold">{r.occ}</span><span className="text-subtle">/{r.cap} · {pct}%</span></span></div>
                      <div className="h-2.5 rounded-full bg-elev overflow-hidden"><div className={`h-full bg-${pct>=90?'danger':pct>=80?'warning':'success'}-500`} style={{ width:`${pct}%` }} /></div>
                    </div>
                  ); })}
                </div>
              </div>

              {/* Maintenance + alerts */}
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">Alerts &amp; edge cases</div>
                <div className="space-y-2">
                  {[
                    { ic:'users', tone:'danger', t:'Overbooking Griya Praja Bldg B', d:'3 booking lebih dari kapasitas — 3 worker masuk waitlist', act:'Resolve waitlist' },
                    { ic:'wrench', tone:'warning', t:'14 rooms out of service', d:'AC maintenance Bldg C lt.3 · auto-excluded dari allocation', act:'View schedule' },
                    { ic:'clock', tone:'info', t:'5 late check-in grace period', d:'Auto-extend +2 jam aktif · shift malam delay', act:'Monitor' },
                  ].map((a,i) => (
                    <div key={i} className={`rounded-xl p-3 border bg-${a.tone}-50 border-${a.tone}-500/25`}>
                      <div className="flex items-center gap-2"><Icon name={a.ic} size={14} className={`text-${a.tone}-600`} /><div className={`text-[12px] font-extrabold flex-1 text-${a.tone}-700`}>{a.t}</div></div>
                      <div className={`text-[11px] mt-0.5 text-${a.tone}-700/85`}>{a.d}</div>
                      <button className={`mt-1.5 text-[11px] font-bold text-${a.tone}-700 underline`}>{a.act} →</button>
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

// ============================================================
// W2 — Room Allocation Master
// ============================================================
function W2_Allocation() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="allocation" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Room Allocation Master — Griya Praja" sub="FAC · Accommodation" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex bg-white rounded-md border border-token p-0.5">{['Bldg A','Bldg B','Bldg C'].map((b,i)=><button key={b} className={`px-3 h-8 rounded text-[12px] font-bold ${i===1?'bg-brand-500 text-white':'text-muted'}`}>{b}</button>)}</div>
              <FilterChip icon="layers">Lantai 2</FilterChip>
              <FilterChip icon="circle-dot">Semua status</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="users">Bulk allocation (shift)</Btn>
              <Btn variant="primary" size="sm" icon="shield">VIP override</Btn>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
              {/* Floor plan large */}
              <div className="surface rounded-xl p-5">
                <div className="flex items-center justify-between mb-3"><div className="text-[13px] font-bold tracking-tight">Building B · Lantai 2 · 24 rooms</div><RoomLegend /></div>
                <FloorPlan cols={8} rooms={[
                  ...SAMPLE_FLOOR,
                  { no:'213', status:'inspected', type:'private' },{ no:'214', status:'occupied', type:'private' },{ no:'215', status:'vacant', type:'private' },{ no:'216', status:'cleaning', type:'dormitory' },
                  { no:'217', status:'occupied', type:'dormitory' },{ no:'218', status:'inspected', type:'dormitory' },{ no:'219', status:'dirty', type:'dormitory' },{ no:'220', status:'occupied', type:'dormitory' },
                  { no:'221', status:'occupied', type:'private' },{ no:'222', status:'oos', type:'private' },{ no:'223', status:'inspected', type:'private' },{ no:'224', status:'occupied', type:'private' },
                ]} />
              </div>

              {/* Room detail panel */}
              <div className="surface rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3"><div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center"><Icon name="bed-single" size={18} /></div><div><div className="text-[15px] font-extrabold">Room 201</div><div className="text-[10.5px] text-muted">Private · Building B · Lt.2</div></div></div>
                <RoomStatusBadge status="occupied" />
                <div className="mt-3 pt-3 border-t border-token">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Occupant</div>
                  <div className="flex items-center gap-2.5"><Avatar name="Hadi Wijaya" size={40} photo /><div className="flex-1 min-w-0"><div className="text-[12.5px] font-extrabold">Hadi Wijaya</div><div className="text-[10px] text-muted">SPV · NSR-001234 · senior</div></div></div>
                  <div className="mt-3 space-y-1.5 text-[11.5px]">
                    <div className="flex items-center justify-between"><span className="text-muted">Check-in</span><span className="font-bold mono">12 Mei 2026</span></div>
                    <div className="flex items-center justify-between"><span className="text-muted">Check-out</span><span className="font-bold mono">12 Jun 2026</span></div>
                    <div className="flex items-center justify-between"><span className="text-muted">Allocation</span><StatusPill tone="info" size="sm" icon="calendar-check">Roster-based</StatusPill></div>
                    <div className="flex items-center justify-between"><span className="text-muted">Last cleaned</span><span className="font-bold mono">29 Mei 08:14</span></div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-token grid grid-cols-2 gap-2">
                  <Btn variant="secondary" size="sm" icon="repeat">Reassign</Btn>
                  <Btn variant="ghost" size="sm" icon="history">History</Btn>
                </div>
                {/* conflict detection */}
                <div className="mt-3 rounded-lg bg-success-50 border border-success-500/25 p-2.5 text-[11px] text-success-700 flex items-center gap-2"><Icon name="shield-check" size={13} /> <span>No conflict · gender + seniority match.</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W3 — Housekeeping Schedule
// ============================================================
function W3_Housekeeping() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="housekeeping" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Housekeeping Schedule — Live" sub="FAC · Accommodation" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="check-circle-2" label="Cleaned" value="284" tone="success" sub="dari 412 hari ini" />
              <KPICard icon="spray-can" label="In progress" value="38" tone="warning" />
              <KPICard icon="clock" label="Pending" value="90" tone="info" />
              <KPICard icon="badge-check" label="Inspected" value="248" tone="success" delta="+12" />
              <KPICard icon="alert-triangle" label="Issues" value="6" tone="danger" sub="escalated" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
              {/* Schedule per building */}
              <div className="surface rounded-xl overflow-hidden">
                <div className="px-5 h-12 border-b border-token flex items-center gap-3"><Icon name="list-checks" size={16} className="text-brand-500" /><div className="text-[13px] font-bold tracking-tight">Schedule · Building B</div><div className="flex-1" /><FilterChip icon="user">Crew: PT Bersih Jaya</FilterChip></div>
                <table className="w-full text-[12px]">
                  <thead><tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev"><th className="px-5 py-2.5">Room</th><th className="px-3 py-2.5">Crew</th><th className="px-3 py-2.5">Linen</th><th className="px-3 py-2.5">Cleaned</th><th className="px-3 py-2.5">Status</th></tr></thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {[
                      { r:'201', crew:'Wati S.', linen:true, t:'08:14', st:'inspected' },
                      { r:'204', crew:'Wati S.', linen:false, t:'08:32', st:'clean' },
                      { r:'205', crew:'Yuni A.', linen:true, t:'—', st:'cleaning' },
                      { r:'206', crew:'Yuni A.', linen:true, t:'—', st:'dirty' },
                      { r:'210', crew:'—', linen:false, t:'—', st:'oos' },
                      { r:'219', crew:'Budi K.', linen:true, t:'—', st:'dirty' },
                    ].map((r,i) => (
                      <tr key={i} className="hover:bg-elev">
                        <td className="px-5 py-2.5"><span className="font-extrabold mono">{r.r}</span></td>
                        <td className="px-3 py-2.5">{r.crew==='—'?<span className="text-subtle">—</span>:<div className="flex items-center gap-1.5"><Avatar name={r.crew} size={22} tone="info" /><span className="font-semibold">{r.crew}</span></div>}</td>
                        <td className="px-3 py-2.5">{r.linen?<StatusPill tone="success" size="sm" icon="check">Weekly</StatusPill>:<span className="text-subtle text-[10.5px]">—</span>}</td>
                        <td className="px-3 py-2.5 mono text-muted">{r.t}</td>
                        <td className="px-3 py-2.5"><RoomStatusBadge status={r.st} size="sm" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Issues escalation */}
              <div className="space-y-3">
                <div className="surface rounded-xl p-5">
                  <div className="text-[13px] font-bold tracking-tight mb-3">Crew progress</div>
                  <div className="space-y-2.5">
                    {[
                      { n:'Wati S.', done:18, total:22, tone:'success' },
                      { n:'Yuni A.', done:12, total:20, tone:'warning' },
                      { n:'Budi K.', done:9, total:18, tone:'warning' },
                    ].map(c => (
                      <div key={c.n}>
                        <div className="flex items-center justify-between text-[11.5px] mb-1"><div className="flex items-center gap-1.5"><Avatar name={c.n} size={22} tone="info" /><span className="font-bold">{c.n}</span></div><span className="mono">{c.done}/{c.total}</span></div>
                        <div className="h-2 rounded-full bg-elev overflow-hidden"><div className={`h-full bg-${c.tone}-500`} style={{ width:`${c.done/c.total*100}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="surface rounded-xl p-5">
                  <div className="text-[13px] font-bold tracking-tight mb-3">Issue escalation</div>
                  <div className="space-y-2">
                    {[
                      { r:'Room 206', t:'AC rusak — perlu teknisi', tone:'danger' },
                      { r:'Room 318', t:'Kebocoran kamar mandi', tone:'danger' },
                      { r:'Room 415', t:'Furniture rusak', tone:'warning' },
                    ].map((s,i) => (
                      <div key={i} className={`rounded-lg p-2.5 border bg-${s.tone}-50 border-${s.tone}-500/25 flex items-center gap-2`}><Icon name="alert-triangle" size={13} className={`text-${s.tone}-600`} /><div className="flex-1 min-w-0"><div className="text-[11.5px] font-extrabold">{s.r}</div><div className="text-[10px] text-muted truncate">{s.t}</div></div><button className="text-[10px] font-bold text-brand-700">→ SAP PM</button></div>
                    ))}
                  </div>
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
// W4 — Meeting Room Manager
// ============================================================
function W4_MeetingManager() {
  const hours = ['08','09','10','11','12','13','14','15','16','17'];
  const rooms = [
    { n:'Borneo', cap:20, bookings:[{s:1,e:3,t:'Shift coord',tone:'brand'},{s:5,e:7,t:'Vendor review',tone:'info'}] },
    { n:'Mahakam', cap:12, bookings:[{s:0,e:2,t:'Safety brief',tone:'success'},{s:4,e:5,t:'1:1',tone:'safety'},{s:8,e:9,t:'Training',tone:'brand'}] },
    { n:'Kutai', cap:8, bookings:[{s:2,e:4,t:'Interview',tone:'info'}] },
    { n:'Sangatta', cap:16, bookings:[{s:0,e:1,t:'Standup',tone:'success'},{s:6,e:9,t:'Audit (OOS)',tone:'gray',oos:true}] },
  ];
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="meeting" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Meeting Room Manager — Griya Praja" sub="FAC · Accommodation" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex bg-white rounded-md border border-token p-0.5">{['Day','Week'].map((v,i)=><button key={v} className={`px-3 h-8 rounded text-[12px] font-bold ${i===0?'bg-brand-500 text-white':'text-muted'}`}>{v}</button>)}</div>
              <FilterChip icon="calendar" active>Jumat 29 Mei</FilterChip>
              <div className="flex-1" />
              <span className="text-[11px] text-muted">Density: 8 booking · 62% utilization</span>
              <Btn variant="primary" size="sm" icon="plus">Book room</Btn>
            </div>

            {/* Gantt-style timeline */}
            <div className="surface rounded-xl p-5 overflow-x-auto">
              <div className="min-w-[640px]">
                {/* Hour ruler */}
                <div className="grid mb-2" style={{ gridTemplateColumns:'120px repeat(10, 1fr)' }}>
                  <div />
                  {hours.map(h => <div key={h} className="text-[10px] font-bold text-subtle text-center mono">{h}:00</div>)}
                </div>
                {rooms.map(r => (
                  <div key={r.n} className="grid items-center mb-2" style={{ gridTemplateColumns:'120px repeat(10, 1fr)' }}>
                    <div className="pr-2"><div className="text-[12px] font-extrabold">{r.n}</div><div className="text-[9.5px] text-subtle inline-flex items-center gap-1"><Icon name="users" size={10} /> {r.cap}</div></div>
                    <div className="col-span-10 relative h-9 rounded-lg bg-elev">
                      {hours.map((_,i) => <div key={i} className="absolute top-0 bottom-0 w-px bg-white/60" style={{ left:`${(i/10)*100}%` }} />)}
                      {r.bookings.map((b,bi) => (
                        <div key={bi} className={`absolute top-1 bottom-1 rounded-md flex items-center px-2 text-[10px] font-bold truncate ${b.oos?'bg-[#9aa3b2] text-white':`bg-${b.tone}-500 text-white`}`} style={{ left:`${(b.s/10)*100}%`, width:`${((b.e-b.s)/10)*100}%` }}>
                          {b.oos && <Icon name="wrench" size={10} className="mr-1 shrink-0" />}{b.t}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room equipment + maintenance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">Equipment availability</div>
                <table className="w-full text-[11.5px]">
                  <thead><tr className="text-left text-[9.5px] font-bold uppercase tracking-wider text-subtle border-b border-token"><th className="pb-2">Room</th><th className="pb-2">Projector</th><th className="pb-2">Video conf</th><th className="pb-2">Whiteboard</th><th className="pb-2">AC</th></tr></thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {[
                      { n:'Borneo', p:true, v:true, w:false, a:true },
                      { n:'Mahakam', p:true, v:false, w:true, a:true },
                      { n:'Kutai', p:false, v:false, w:true, a:true },
                      { n:'Sangatta', p:true, v:true, w:true, a:false },
                    ].map((r,i) => (
                      <tr key={i}><td className="py-2 font-bold">{r.n}</td>
                        {[r.p,r.v,r.w,r.a].map((x,j) => <td key={j} className="py-2"><Icon name={x?'check-circle-2':'minus-circle'} size={15} className={x?'text-success-500':'text-[color:var(--border-strong)]'} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="surface rounded-xl p-5">
                <div className="text-[13px] font-bold tracking-tight mb-3">Maintenance schedule</div>
                <div className="space-y-2">
                  <div className="rounded-lg bg-gray-50 border border-token p-3 flex items-center gap-2.5" style={{ background:'#fafafa' }}><div className="w-9 h-9 rounded-lg bg-[#9aa3b2] text-white flex items-center justify-center"><Icon name="wrench" size={16} /></div><div className="flex-1"><div className="text-[12px] font-extrabold">Sangatta Room · AC service</div><div className="text-[10px] text-muted">Out of service · 13:00–16:00 hari ini</div></div><StatusPill tone="gray" size="sm">OOS</StatusPill></div>
                  <div className="rounded-lg bg-warning-50 border border-warning-500/25 p-3 flex items-center gap-2.5"><div className="w-9 h-9 rounded-lg bg-warning-500 text-white flex items-center justify-center"><Icon name="calendar-clock" size={16} /></div><div className="flex-1"><div className="text-[12px] font-extrabold">Kutai Room · projector ganti</div><div className="text-[10px] text-muted">Dijadwalkan · besok 09:00</div></div><StatusPill tone="warning" size="sm">Scheduled</StatusPill></div>
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
// W5 — Vehicle Pool Management
// ============================================================
function W5_VehiclePool() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="vehicle" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Vehicle Pool Management — Internal" sub="FAC · Accommodation" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="car" label="Pool vehicles" value="14" tone="brand" sub="8 Hilux · 3 Fortuner · 3 motor" />
              <KPICard icon="check-circle-2" label="Available" value="9" tone="success" />
              <KPICard icon="key-round" label="In use" value="4" tone="warning" />
              <KPICard icon="alert-triangle" label="Doc expiring" value="2" tone="danger" sub="STNK/KIR 30 hari" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="car">Semua tipe</FilterChip>
              <FilterChip icon="circle-dot">Semua status</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="clipboard-check">Inspection log</Btn>
              <Btn variant="primary" size="sm" icon="plus">Add vehicle</Btn>
            </div>

            <div className="surface rounded-xl overflow-hidden">
              <table className="w-full text-[12px]">
                <thead><tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev"><th className="px-5 py-2.5">Vehicle</th><th className="px-3 py-2.5">Driver/booker</th><th className="px-3 py-2.5">Fuel</th><th className="px-3 py-2.5">Next service</th><th className="px-3 py-2.5">STNK</th><th className="px-3 py-2.5">KIR</th><th className="px-3 py-2.5">Status</th></tr></thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {[
                    { n:'Toyota Hilux', plate:'KT 8821 PA', t:'Pickup 4x4', ic:'truck', driver:'Budi S. (self)', fuel:78, svc:'12 Jul', stnk:'14 Aug 2026', kir:'20 Sep 2026', st:'inuse' },
                    { n:'Toyota Fortuner', plate:'KT 4410 PB', t:'SUV 7-seat', ic:'truck', driver:'—', fuel:92, svc:'08 Jun', stnk:'30 Nov 2026', kir:'18 Jul 2026', st:'avail' },
                    { n:'Toyota Hilux', plate:'KT 5567 PC', t:'Pickup 4x4', ic:'truck', driver:'Rina W. (driver)', fuel:45, svc:'02 Aug', stnk:'15 Jan 2027', kir:'10 Sep 2026', st:'inuse' },
                    { n:'Honda CRF', plate:'KT 1102 PM', t:'Motorbike', ic:'bike', driver:'—', fuel:60, svc:'overdue', stnk:'02 Jun 2026', stnkWarn:true, kir:'22 Jun 2026', kirWarn:true, st:'maint' },
                    { n:'Toyota Fortuner', plate:'KT 7789 PD', t:'SUV 7-seat', ic:'truck', driver:'—', fuel:88, svc:'19 Jul', stnk:'08 Mar 2027', kir:'22 Oct 2026', st:'avail' },
                  ].map((v,i) => (
                    <tr key={i} className="hover:bg-elev cursor-pointer">
                      <td className="px-5 py-3"><div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center"><Icon name={v.ic} size={16} /></div><div><div className="font-extrabold">{v.n}</div><div className="text-[10px] text-subtle mono">{v.plate} · {v.t}</div></div></div></td>
                      <td className="px-3 py-3 font-semibold">{v.driver}</td>
                      <td className="px-3 py-3"><div className="flex items-center gap-1.5"><div className="w-12 h-2 rounded-full bg-elev overflow-hidden"><div className={`h-full bg-${v.fuel<50?'warning':'success'}-500`} style={{ width:`${v.fuel}%` }} /></div><span className="mono text-[10.5px] font-bold">{v.fuel}%</span></div></td>
                      <td className="px-3 py-3"><span className={`mono ${v.svc==='overdue'?'text-danger-700 font-bold':''}`}>{v.svc}</span></td>
                      <td className="px-3 py-3"><span className={`mono ${v.stnkWarn?'text-danger-700 font-bold':''}`}>{v.stnk}{v.stnkWarn&&' ⚠'}</span></td>
                      <td className="px-3 py-3"><span className={`mono ${v.kirWarn?'text-danger-700 font-bold':''}`}>{v.kir}{v.kirWarn&&' ⚠'}</span></td>
                      <td className="px-3 py-3">{v.st==='avail'?<StatusPill tone="success" size="sm" icon="check-circle-2">Available</StatusPill>:v.st==='inuse'?<StatusPill tone="warning" size="sm" icon="key-round">In use</StatusPill>:<StatusPill tone="gray" size="sm" icon="wrench">Maintenance</StatusPill>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inspection checklist sample */}
            <div className="surface rounded-xl p-5">
              <div className="text-[13px] font-bold tracking-tight mb-3">Pre/post inspection checklist · KT 8821 PA</div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {['Body & cat','Ban & tekanan','Lampu & sein','Rem','BBM level','APAR','P3K kit','Dokumen'].map((c,i) => (
                  <div key={c} className="flex items-center gap-2 rounded-lg bg-elev p-2.5"><Icon name={i<6?'check-circle-2':'circle'} size={15} className={i<6?'text-success-500':'text-subtle'} /><span className="text-[11.5px] font-semibold">{c}</span></div>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-muted flex items-center gap-1.5"><Icon name="info" size={13} /> Checklist wajib pre &amp; post setiap booking · foto kondisi tersimpan untuk audit.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.W1_Dashboard = W1_Dashboard;
window.W2_Allocation = W2_Allocation;
window.W3_Housekeeping = W3_Housekeeping;
window.W4_MeetingManager = W4_MeetingManager;
window.W5_VehiclePool = W5_VehiclePool;
