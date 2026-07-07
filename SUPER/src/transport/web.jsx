// Transportation — FAC web screens W1-W5.

// ============================================================
// W1 — Transportation Dashboard
// ============================================================
function W1_Dashboard() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="transport" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Transportation Dashboard — Jumat, 29 Mei 2026" sub="FAC · Dispatch" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="bus"           label="Vehicles active" value="12 / 18" tone="brand"   sub="6 standby/maintenance" />
              <KPICard icon="route"         label="Trips today"     value="47"      tone="info"    sub="32 done · 15 upcoming" />
              <KPICard icon="users"          label="Passenger today" value="1,234"   tone="success" delta="+8%" />
              <KPICard icon="clock"          label="On-time rate"    value="94%"     tone="success" sub="target ≥90%" delta="+2%" />
              <KPICard icon="fuel"           label="Fuel efficiency" value="3.8"     tone="safety"  sub="km/L avg fleet" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
              {/* Live map */}
              <div className="surface rounded-xl overflow-hidden">
                <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                  <Icon name="map" size={16} className="text-brand-500" />
                  <div className="text-[13px] font-bold tracking-tight">Live fleet position</div>
                  <span className="ml-auto inline-flex items-center gap-1 px-1.5 h-5 rounded bg-success-500 text-white text-[10px] font-bold uppercase tracking-wider"><span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Live · 15s</span>
                </div>
                <div className="h-[420px]">
                  <SiteMap route height="100%" vehicles={[
                    { x:'42%', y:'62%', heading:-25, label:'SHT-04' },
                    { x:'58%', y:'42%', heading:-40, label:'SHT-07' },
                    { x:'12%', y:'84%', heading:0,   label:'SHT-02' },
                    { x:'72%', y:'30%', heading:-30, label:'SHT-11' },
                    { x:'80%', y:'52%', heading:60,  label:'SHT-09', alert:true },
                  ]} />
                </div>
              </div>

              {/* Upcoming trips */}
              <div className="surface rounded-xl overflow-hidden flex flex-col">
                <div className="px-4 h-11 border-b border-token flex items-center gap-2"><Icon name="calendar-clock" size={15} className="text-brand-500" /><div className="text-[12px] font-bold uppercase tracking-wider">Upcoming trips</div></div>
                <div className="overflow-y-auto p-2 space-y-1.5 max-h-[420px]">
                  {[
                    { t:'06:30', r:'Mess → PIT Bahana', v:'SHT-04', d:'Sumarno', seats:'28/30' },
                    { t:'07:00', r:'Mess → Coal Pad', v:'SHT-02', d:'Hendra W.', seats:'30/30', full:true },
                    { t:'08:30', r:'PIT → Mess', v:'SHT-09', d:'Anto P.', seats:'18/30' },
                    { t:'09:40', r:'Airport BPN pickup', v:'SHT-11', d:'Rudi S.', seats:'3/7', airport:true },
                    { t:'10:00', r:'Mess → Askara', v:'SHT-07', d:'Joko Tri', seats:'8/12' },
                    { t:'13:30', r:'Coal Pad → Mess', v:'SHT-02', d:'Hendra W.', seats:'12/30' },
                  ].map((t,i) => (
                    <div key={i} className="rounded-lg border border-token bg-white p-2.5 flex items-center gap-2.5">
                      <div className="text-[13px] font-extrabold mono w-12">{t.t}</div>
                      <div className="flex-1 min-w-0"><div className="text-[11.5px] font-bold truncate flex items-center gap-1">{t.airport && <Icon name="plane" size={11} className="text-info-500" />}{t.r}</div><div className="text-[10px] text-subtle">{t.v} · {t.d}</div></div>
                      <span className={`text-[10px] font-bold mono ${t.full?'text-danger-700':'text-success-700'}`}>{t.seats}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active vehicles table */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                <Icon name="bus" size={16} className="text-brand-500" /><div className="text-[13px] font-bold tracking-tight">Active vehicles · 12</div>
                <div className="flex items-center gap-2 ml-3"><FilterChip icon="route" active>Semua rute</FilterChip><FilterChip icon="bus">Semua tipe</FilterChip></div>
              </div>
              <table className="w-full text-[12px]">
                <thead><tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                  <th className="px-5 py-2.5">Vehicle</th><th className="px-3 py-2.5">Route</th><th className="px-3 py-2.5">Driver</th><th className="px-3 py-2.5">Capacity</th><th className="px-3 py-2.5">Speed</th><th className="px-3 py-2.5">ETA</th><th className="px-3 py-2.5">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {SHUTTLES.map(s => {
                    const v = VEHICLE[s.type];
                    return (
                      <tr key={s.id} className={`hover:bg-elev cursor-pointer ${s.alert?'bg-danger-50/30':''}`}>
                        <td className="px-5 py-2.5"><div className="flex items-center gap-2"><div className={`w-8 h-8 rounded-lg bg-${v.tone}-50 text-${v.tone}-700 flex items-center justify-center`}><Icon name={v.icon} size={15} /></div><div><div className="font-extrabold mono">{s.id}</div><div className="text-[10px] text-subtle">{s.plate}</div></div></div></td>
                        <td className="px-3 py-2.5 font-semibold">{s.route}</td>
                        <td className="px-3 py-2.5">{s.driver}</td>
                        <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className="w-14 h-2 rounded-full bg-elev overflow-hidden"><div className={`h-full ${s.onboard===s.cap?'bg-danger-500':'bg-success-500'}`} style={{ width:`${(s.onboard/s.cap)*100}%` }} /></div><span className="mono font-bold text-[11px]">{s.onboard}/{s.cap}</span></div></td>
                        <td className="px-3 py-2.5 mono font-bold">{s.spd} <span className="text-subtle text-[10px]">km/h</span></td>
                        <td className="px-3 py-2.5 mono">{s.eta}</td>
                        <td className="px-3 py-2.5">
                          {s.status==='moving'   && <StatusPill tone="success" size="sm" icon="navigation">Moving</StatusPill>}
                          {s.status==='boarding' && <StatusPill tone="warning" size="sm" icon="users">Boarding</StatusPill>}
                          {s.status==='offroute' && <StatusPill tone="danger" size="sm" icon="alert-triangle">Off-route</StatusPill>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W2 — Schedule Management
// ============================================================
function W2_Schedule() {
  const slots = {
    '05:30':[{r:'R1',v:'SHT-04',cap:'30',res:18,tone:'brand'}],
    '06:00':[{r:'R1',v:'SHT-04',cap:'30',res:30,tone:'brand',full:true},{r:'R2',v:'SHT-02',cap:'30',res:24,tone:'info'}],
    '06:30':[{r:'R1',v:'SHT-04',cap:'30',res:12,tone:'brand'},{r:'R3',v:'SHT-07',cap:'12',res:8,tone:'success'}],
    '07:00':[{r:'R2',v:'SHT-02',cap:'30',res:20,tone:'info'}],
    '13:30':[{r:'R1',v:'SHT-09',cap:'30',res:14,tone:'brand'},{r:'R2',v:'SHT-02',cap:'30',res:10,tone:'info'}],
    '14:00':[{r:'R1',v:'SHT-04',cap:'30',res:22,tone:'brand'}],
  };
  const times = Object.keys(slots);
  const days = ['Sen 26','Sel 27','Rab 28','Kam 29','Jum 30','Sab 31','Min 01'];
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="schedule" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Schedule Management — Minggu 26 Mei – 1 Jun" sub="FAC · Dispatch" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex bg-white rounded-md border border-token p-0.5">{['Day','Week','Month'].map((v,i)=><button key={v} className={`px-3 h-8 rounded text-[12px] font-bold ${i===1?'bg-brand-500 text-white':'text-muted'}`}>{v}</button>)}</div>
              <FilterChip icon="route">Semua rute</FilterChip>
              <FilterChip icon="bus">Semua vehicle</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="repeat">Set recurrence</Btn>
              <Btn variant="secondary" size="sm" icon="calendar-x">Public holiday</Btn>
              <Btn variant="primary" size="sm" icon="plus">Add slot</Btn>
            </div>

            <div className="rounded-xl bg-info-50 border border-info-500/25 p-3 flex items-center gap-2.5">
              <Icon name="move" size={16} className="text-info-600" />
              <div className="flex-1 text-[12px] text-info-700"><span className="font-extrabold">Drag-drop</span> untuk reassign vehicle/driver antar slot. Konflik (driver double-book, vehicle maintenance) auto-flagged merah.</div>
            </div>

            {/* Calendar grid */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="grid border-b border-token bg-elev/60" style={{ gridTemplateColumns:'70px repeat(7, 1fr)' }}>
                <div className="px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-subtle">Time</div>
                {days.map((d,i) => <div key={d} className={`px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-center border-l border-token ${i===4?'text-brand-700':'text-subtle'}`}>{d}{i===4 && <span className="block text-[8px] text-brand-500">today</span>}</div>)}
              </div>
              {times.map(t => (
                <div key={t} className="grid border-b border-token last:border-b-0" style={{ gridTemplateColumns:'70px repeat(7, 1fr)' }}>
                  <div className="px-2 py-2 text-[12px] font-extrabold mono text-muted flex items-start">{t}</div>
                  {days.map((d,di) => (
                    <div key={di} className={`border-l border-token p-1.5 min-h-[68px] space-y-1 ${di===4?'bg-brand-50/30':''}`}>
                      {(di===4||di===1||di===2) && slots[t] && slots[t].map((s,si) => (
                        <div key={si} className={`rounded-md border px-1.5 py-1 cursor-grab bg-${s.tone}-50 border-${s.tone}-500/30`}>
                          <div className="flex items-center gap-1"><Icon name="grip-vertical" size={9} className="text-subtle" /><span className="text-[9.5px] font-extrabold mono">{s.v}</span>{s.full && <Icon name="alert-triangle" size={9} className="text-danger-500 ml-auto" />}</div>
                          <div className="text-[9px] text-muted mt-0.5">{ROUTES.find(r=>r.id===s.r)?.to.split(' ')[0]} · {s.res}/{s.cap}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W3 — Vehicle Master
// ============================================================
function W3_VehicleMaster() {
  const vehicles = [
    { id:'SHT-04', type:'bus',     plate:'KT 7821 AB', cap:30, fuel:'Solar', driver:'Sumarno',   status:'active',      service:'12 Apr', next:'12 Jul', ins:'31 Des 2026', kir:'14 Aug 2026' },
    { id:'SHT-02', type:'bus',     plate:'KT 9087 EF', cap:30, fuel:'Solar', driver:'Hendra W.', status:'active',      service:'08 Mar', next:'08 Jun', ins:'30 Nov 2026', kir:'20 Jun 2026', kirWarn:true },
    { id:'SHT-07', type:'minibus', plate:'KT 4410 CD', cap:12, fuel:'Solar', driver:'Joko Tri',  status:'active',      service:'02 Mei', next:'02 Aug', ins:'15 Jan 2027', kir:'10 Sep 2026' },
    { id:'SHT-11', type:'mpv',     plate:'KT 1234 GH', cap:7,  fuel:'Pertalite',driver:'Rudi S.', status:'active',      service:'19 Apr', next:'19 Jul', ins:'08 Mar 2027', kir:'22 Oct 2026' },
    { id:'SHT-15', type:'bus',     plate:'KT 3344 KL', cap:30, fuel:'Solar', driver:'—',         status:'maintenance', service:'25 Mei', next:'in shop', ins:'31 Des 2026', kir:'18 Jul 2026' },
    { id:'SHT-18', type:'minibus', plate:'KT 5566 MN', cap:12, fuel:'Solar', driver:'—',         status:'oos',         service:'10 Jan', next:'overdue', ins:'02 Feb 2026', insExp:true, kir:'expired', kirWarn:true },
  ];
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="vehicles" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Vehicle Master — 18 units" sub="FAC · Dispatch" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="bus" label="Total fleet" value="18" tone="brand" sub="8 bus · 6 mini · 4 MPV" />
              <KPICard icon="check-circle-2" label="Active" value="12" tone="success" />
              <KPICard icon="wrench" label="Maintenance" value="4" tone="warning" />
              <KPICard icon="alert-triangle" label="Doc expiring" value="3" tone="danger" sub="KIR/insurance 30 hari" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="bus">Semua tipe</FilterChip>
              <FilterChip icon="circle-dot">Semua status</FilterChip>
              <FilterChip icon="alert-triangle">Doc expiring</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="download">Export</Btn>
              <Btn variant="primary" size="sm" icon="plus">Add vehicle</Btn>
            </div>

            <div className="surface rounded-xl overflow-hidden">
              <table className="w-full text-[12px]">
                <thead><tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                  <th className="px-5 py-2.5">Vehicle</th><th className="px-3 py-2.5">Cap</th><th className="px-3 py-2.5">Fuel</th><th className="px-3 py-2.5">Driver</th><th className="px-3 py-2.5">Next service</th><th className="px-3 py-2.5">Insurance</th><th className="px-3 py-2.5">KIR</th><th className="px-3 py-2.5">Status</th><th className="px-3 py-2.5 w-8"></th>
                </tr></thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {vehicles.map(v => {
                    const vt = VEHICLE[v.type];
                    return (
                      <tr key={v.id} className="hover:bg-elev cursor-pointer group">
                        <td className="px-5 py-3"><div className="flex items-center gap-2.5"><div className={`w-9 h-9 rounded-lg bg-${vt.tone}-50 text-${vt.tone}-700 flex items-center justify-center`}><Icon name={vt.icon} size={16} /></div><div><div className="font-extrabold mono">{v.id}</div><div className="text-[10px] text-subtle">{v.plate} · {vt.label}</div></div></div></td>
                        <td className="px-3 py-3 mono font-bold">{v.cap}</td>
                        <td className="px-3 py-3 text-muted">{v.fuel}</td>
                        <td className="px-3 py-3 font-semibold">{v.driver}</td>
                        <td className="px-3 py-3"><span className={`mono ${v.next==='overdue'?'text-danger-700 font-bold':v.next==='in shop'?'text-warning-700 font-bold':''}`}>{v.next}</span></td>
                        <td className="px-3 py-3"><span className={`mono ${v.insExp?'text-danger-700 font-bold':''}`}>{v.ins}{v.insExp && ' ⚠'}</span></td>
                        <td className="px-3 py-3"><span className={`mono ${v.kirWarn?'text-danger-700 font-bold':''}`}>{v.kir}{v.kirWarn && ' ⚠'}</span></td>
                        <td className="px-3 py-3">
                          {v.status==='active'      && <StatusPill tone="success" size="sm" icon="check-circle-2">Active</StatusPill>}
                          {v.status==='maintenance' && <StatusPill tone="warning" size="sm" icon="wrench">Maintenance</StatusPill>}
                          {v.status==='oos'         && <StatusPill tone="danger" size="sm" icon="ban">Out of service</StatusPill>}
                        </td>
                        <td className="px-3 py-3"><Icon name="chevron-right" size={14} className="text-subtle group-hover:text-brand-500" /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W4 — Driver Master
// ============================================================
function W4_DriverMaster() {
  const drivers = [
    { n:'Sumarno',   sim:'B1 Umum', simExp:'14 Aug 2027', simper:'B', simperExp:'14 Aug 2026', dd:true, rating:4.8, veh:'SHT-04', status:'active' },
    { n:'Hendra W.', sim:'B1 Umum', simExp:'22 Nov 2026', simper:'B', simperExp:'22 Nov 2026', dd:true, rating:4.6, veh:'SHT-02', status:'active' },
    { n:'Joko Tri',  sim:'B1 Umum', simExp:'09 Jan 2027', simper:'B', simperExp:'09 Jan 2027', dd:true, rating:4.7, veh:'SHT-07', status:'active' },
    { n:'Rudi S.',   sim:'A Umum',  simExp:'30 Sep 2026', simper:'D', simperExp:'30 Sep 2026', dd:true, rating:4.9, veh:'SHT-11', status:'active' },
    { n:'Anto P.',   sim:'B1 Umum', simExp:'12 Apr 2026', simExpWarn:true, simper:'B', simperExp:'12 Apr 2027', dd:false, rating:4.3, veh:'SHT-09', status:'active' },
    { n:'Bambang',   sim:'B1 Umum', simExp:'18 Des 2026', simper:'B', simperExp:'18 Des 2026', dd:true, rating:4.5, veh:'—', status:'leave' },
  ];
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="drivers" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Driver Master — 22 drivers" sub="FAC · Dispatch" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="users" label="Total drivers" value="22" tone="brand" sub="3rd party contractor" />
              <KPICard icon="steering-wheel" label="On duty" value="14" tone="success" />
              <KPICard icon="star" label="Avg rating" value="4.6" tone="safety" />
              <KPICard icon="alert-triangle" label="SIM/cert expiring" value="2" tone="danger" sub="30 hari" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="circle-dot">Semua status</FilterChip>
              <FilterChip icon="star">Rating ≥ 4.0</FilterChip>
              <FilterChip icon="alert-triangle">Cert expiring</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="calendar-plus">Bulk schedule</Btn>
              <Btn variant="primary" size="sm" icon="user-plus">Add driver</Btn>
            </div>

            <div className="surface rounded-xl overflow-hidden">
              <table className="w-full text-[12px]">
                <thead><tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                  <th className="px-5 py-2.5">Driver</th><th className="px-3 py-2.5">SIM</th><th className="px-3 py-2.5">SIMPER</th><th className="px-3 py-2.5">Defensive driving</th><th className="px-3 py-2.5">Rating</th><th className="px-3 py-2.5">Vehicle</th><th className="px-3 py-2.5">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {drivers.map((d,i) => (
                    <tr key={i} className="hover:bg-elev cursor-pointer">
                      <td className="px-5 py-3"><div className="flex items-center gap-2.5"><Avatar name={d.n} size={34} photo /><div className="font-extrabold">{d.n}</div></div></td>
                      <td className="px-3 py-3"><div className="font-semibold">{d.sim}</div><div className={`text-[10px] mono ${d.simExpWarn?'text-danger-700 font-bold':'text-subtle'}`}>{d.simExp}{d.simExpWarn && ' ⚠'}</div></td>
                      <td className="px-3 py-3"><StatusPill tone="info" size="sm">Class {d.simper}</StatusPill><div className="text-[10px] mono text-subtle mt-0.5">{d.simperExp}</div></td>
                      <td className="px-3 py-3">{d.dd ? <StatusPill tone="success" size="sm" icon="check-circle-2">Valid</StatusPill> : <StatusPill tone="warning" size="sm" icon="alert-triangle">Expired</StatusPill>}</td>
                      <td className="px-3 py-3"><span className="inline-flex items-center gap-1 font-bold"><Icon name="star" size={12} className="text-safety-500" /> {d.rating}</span></td>
                      <td className="px-3 py-3 mono font-semibold">{d.veh}</td>
                      <td className="px-3 py-3">{d.status==='active'?<StatusPill tone="success" size="sm">Active</StatusPill>:<StatusPill tone="info" size="sm" icon="palmtree">On leave</StatusPill>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W5 — Trip Request Inbox
// ============================================================
function W5_RequestInbox() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="requests" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Trip Request Inbox" sub="FAC · Dispatch" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-4">
            {/* Inbox */}
            <div className="surface rounded-xl overflow-hidden flex flex-col">
              <div className="px-4 h-11 border-b border-token flex items-center gap-2"><Icon name="inbox" size={15} className="text-brand-500" /><div className="text-[12px] font-bold uppercase tracking-wider">Pending · 6</div></div>
              <div className="overflow-y-auto p-2 space-y-1.5 max-h-[640px]">
                {[
                  { id:'TR-0892', emp:'Andi Wijaya', r:'Camp → Disnaker Samarinda', when:'30 Mei · 08:00', pax:3, sel:true, spvOk:true },
                  { id:'TR-0894', emp:'Sari Hartati', r:'Camp → Airport BPN', when:'31 Mei · 05:00', pax:2, spvOk:true },
                  { id:'TR-0896', emp:'Budi Hartono', r:'Multi-stop · 3 lokasi', when:'01 Jun · 09:00', pax:5, spvOk:false },
                  { id:'TR-0898', emp:'Maya Saputri', r:'Camp → RS Samarinda', when:'30 Mei · 14:00', pax:1, urgent:true, spvOk:true },
                ].map(t => (
                  <button key={t.id} className={`w-full text-left rounded-lg border p-2.5 ${t.sel?'bg-brand-50 border-brand-300':'border-token bg-white'}`}>
                    <div className="flex items-center gap-2 mb-1"><span className="text-[10px] mono text-subtle font-bold flex-1">{t.id}</span>{t.urgent && <StatusPill tone="danger" size="sm" icon="zap">Urgent</StatusPill>}</div>
                    <div className="text-[12.5px] font-extrabold leading-tight">{t.r}</div>
                    <div className="text-[10.5px] text-muted mt-0.5">{t.emp} · {t.when} · {t.pax} pax</div>
                    <div className="mt-1">{t.spvOk ? <StatusPill tone="success" size="sm" icon="check">SPV approved</StatusPill> : <StatusPill tone="warning" size="sm" icon="clock">Waiting SPV</StatusPill>}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail + auto-assign */}
            <div className="surface rounded-xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center"><Icon name="car" size={22} /></div>
                <div className="flex-1"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mono">TR-0892</div><div className="text-[18px] font-extrabold tracking-tight">Camp Bahana → Kantor Disnaker Samarinda</div><div className="mt-1 flex items-center gap-1.5"><StatusPill tone="success" size="sm" icon="check">SPV approved · Hadi W.</StatusPill></div></div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                {[{l:'Requester',v:'Andi Wijaya',sub:'CSR'},{l:'Tanggal',v:'30 Mei',sub:'08:00'},{l:'Passenger',v:'3 orang',sub:'one-way'},{l:'Jarak',v:'45 km',sub:'~70 min'}].map(s => (
                  <div key={s.l} className="rounded-xl bg-elev p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{s.l}</div><div className="text-[14px] font-extrabold">{s.v}</div><div className="text-[10px] text-muted">{s.sub}</div></div>
                ))}
              </div>

              {/* Auto-assignment */}
              <div className="rounded-xl bg-brand-50 border border-brand-200 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3"><Icon name="sparkles" size={16} className="text-brand-600" /><div className="text-[12.5px] font-extrabold text-brand-700">Auto-assignment suggestion</div><span className="ml-auto text-[10px] mono text-brand-600">based on availability</span></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white p-3 flex items-center gap-2.5"><div className="w-10 h-10 rounded-lg bg-success-50 text-success-600 flex items-center justify-center"><Icon name="car" size={18} /></div><div className="flex-1"><div className="text-[12.5px] font-extrabold">MPV-03</div><div className="text-[10px] text-muted">7-seat · available · KIR ok</div></div></div>
                  <div className="rounded-lg bg-white p-3 flex items-center gap-2.5"><Avatar name="Rudi Santoso" size={36} photo /><div className="flex-1"><div className="text-[12.5px] font-extrabold">Rudi S.</div><div className="text-[10px] text-muted">⭐ 4.9 · fatigue 2h · SIM A ok</div></div></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Btn variant="ghost" size="sm" icon="shuffle">Ganti assignment</Btn>
                <div className="flex-1" />
                <Btn variant="outlineDanger" size="md" icon="x">Reject</Btn>
                <Btn variant="success" size="md" icon="check-circle-2">Approve &amp; dispatch</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.W1_Dashboard = W1_Dashboard;
window.W2_Schedule = W2_Schedule;
window.W3_VehicleMaster = W3_VehicleMaster;
window.W4_DriverMaster = W4_DriverMaster;
window.W5_RequestInbox = W5_RequestInbox;
