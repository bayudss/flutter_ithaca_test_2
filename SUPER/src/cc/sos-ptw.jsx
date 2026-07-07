// Command Center — CC2 SOS Active Response, CC3 PTW Live Monitor.

// ============================================================
// CC2 — SOS Active Response Mode (full takeover)
// ============================================================
function CC2_SOSResponse() {
  const [dispatched, setDispatched] = React.useState(false);
  return (
    <div className="h-full relative overflow-hidden" style={{ background:'radial-gradient(120% 90% at 50% 0%, rgba(142,42,41,0.28) 0%, rgba(7,11,18,1) 65%)' }}>
      {/* alarm bar */}
      <div className="h-10 bg-danger-500 flex items-center px-4 gap-3 sos-flash">
        <Icon name="siren" size={18} className="text-white" />
        <span className="text-[13px] font-extrabold uppercase tracking-[0.2em] text-white">SOS Active · Medical Emergency</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-white text-[12px] font-bold"><Icon name="volume-2" size={14} /> Alarm ON</span>
        <button className="text-white/80 hover:text-white"><Icon name="volume-x" size={16} /></button>
      </div>

      <div className="p-4 grid grid-cols-12 gap-3 h-[calc(100%-40px)] min-h-0">
        {/* Left — worker info */}
        <div className="col-span-4 flex flex-col gap-3 min-h-0">
          <div className="cc-panel rounded-xl p-4 sos-glow border-danger-500/40">
            <div className="flex items-center gap-3">
              <Avatar name="Budi Santoso" size={64} tone="danger" photo />
              <div className="flex-1 min-w-0">
                <div className="text-[18px] font-extrabold tracking-tight">Budi Santoso</div>
                <div className="text-[11px] cc-muted">NSR-009281 · Driver Hauling</div>
                <div className="mt-1.5"><Pill tone="danger" size="sm" icon="siren" flash>SOS TRIGGERED</Pill></div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg cc-panel-2 p-2.5"><div className="text-[9px] uppercase tracking-wider cc-subtle font-bold">Triggered</div><div className="text-[13px] font-extrabold mono">14:34:02</div></div>
              <div className="rounded-lg bg-danger-500/15 border border-danger-500/30 p-2.5"><div className="text-[9px] uppercase tracking-wider text-danger-400/80 font-bold">Elapsed</div><div className="text-[18px] font-extrabold mono text-danger-400 leading-none mt-0.5"><SinceTimer from={138} /></div></div>
            </div>
          </div>

          {/* Medical info */}
          <div className="cc-panel rounded-xl p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider cc-muted mb-2.5 flex items-center gap-1.5"><Icon name="heart-pulse" size={13} className="text-danger-400" /> Medical info</div>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div className="rounded-lg cc-panel-2 p-2.5"><div className="text-[9px] uppercase tracking-wider cc-subtle font-bold">Gol. darah</div><div className="text-[16px] font-extrabold text-danger-400">O+</div></div>
              <div className="rounded-lg cc-panel-2 p-2.5"><div className="text-[9px] uppercase tracking-wider cc-subtle font-bold">Berat/tinggi</div><div className="text-[14px] font-extrabold">72kg · 170cm</div></div>
            </div>
            <div className="mt-2 space-y-1.5 text-[11.5px]">
              <div className="flex items-start gap-2"><Icon name="alert-circle" size={13} className="text-warning-400 mt-0.5 shrink-0" /><span><span className="cc-subtle">Alergi:</span> <b>Penisilin</b></span></div>
              <div className="flex items-start gap-2"><Icon name="activity" size={13} className="text-warning-400 mt-0.5 shrink-0" /><span><span className="cc-subtle">Kondisi:</span> Hipertensi (terkontrol)</span></div>
              <div className="flex items-start gap-2"><Icon name="phone" size={13} className="cc-subtle mt-0.5 shrink-0" /><span><span className="cc-subtle">Emergency:</span> Siti (istri) · 0812-3344-5566</span></div>
            </div>
          </div>

          {/* Comm thread */}
          <div className="cc-panel rounded-xl flex-1 min-h-0 flex flex-col">
            <div className="px-3.5 h-9 border-b cc-line flex items-center gap-2"><Icon name="messages-square" size={13} className="cc-muted" /><span className="text-[11px] font-bold uppercase tracking-wider">Response thread</span></div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <div className="text-[10px] cc-subtle text-center">— 14:34 SOS auto-broadcast —</div>
              <div className="rounded-lg cc-panel-2 p-2 text-[11px]"><b className="text-brand-200">System:</b> SOS triggered, location locked GPS ±4m.</div>
              <div className="rounded-lg cc-panel-2 p-2 text-[11px]"><b className="text-success-400">Operator Rizki:</b> Acknowledged. Dispatching medical.</div>
              {dispatched && <div className="rounded-lg bg-success-500/12 border border-success-500/30 p-2 text-[11px]"><b className="text-success-400">Klinik Bahana:</b> Ambulans berangkat. ETA 3 menit.</div>}
            </div>
          </div>
        </div>

        {/* Center — map */}
        <div className="col-span-5 min-h-0">
          <div className="cc-panel rounded-xl h-full overflow-hidden flex flex-col">
            <div className="px-3.5 h-9 border-b cc-line flex items-center gap-2"><Icon name="map-pin" size={13} className="text-danger-400" /><span className="text-[11px] font-bold uppercase tracking-wider">Location · Coal Pad Agra</span><span className="ml-auto text-[10px] mono cc-muted">-1.2340, 116.7890</span></div>
            <div className="relative flex-1">
              <SiteMap height="100%" pins={[{ x:84, y:34, tone:'danger', icon:'siren', sos:true, label:'Budi · SOS' }, { x:52, y:30, tone:'success', icon:'ambulance', heading:35, label:'Ambulans · 3m' }]} />
              <div className="absolute bottom-2.5 left-2.5 glass rounded-lg border border-white/10 p-2.5">
                <div className="text-[9px] uppercase tracking-wider cc-subtle font-bold mb-1">Nearest landmark</div>
                <div className="text-[12px] font-bold">Coal Pad Agra · Sec 3 loading bay</div>
                <div className="text-[10px] cc-muted mt-0.5">Klinik Bahana 4.2 km · Security post 1.1 km</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — action panel */}
        <div className="col-span-3 flex flex-col gap-3 min-h-0">
          <div className="cc-panel rounded-xl p-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider cc-muted mb-2.5">Response actions</div>
            <div className="space-y-2">
              <Btn variant="success" full size="lg" icon="check-circle-2">Acknowledge</Btn>
              <div className="rounded-lg cc-panel-2 p-2.5">
                <div className="text-[10px] uppercase tracking-wider cc-subtle font-bold mb-1.5">Dispatch team</div>
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  {[{l:'Medical',ic:'ambulance',on:true},{l:'Security',ic:'shield',on:true},{l:'Fire',ic:'flame'},{l:'Combo',ic:'layers'}].map(t => (
                    <button key={t.l} className={`h-9 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1.5 ${t.on?'bg-brand-500/20 border-brand-400/40 text-brand-200':'border-white/10 cc-muted'}`}><Icon name={t.ic} size={13} /> {t.l}</button>
                  ))}
                </div>
                <Btn variant="danger" full icon="send" onClick={() => setDispatched(true)}>{dispatched?'Team dispatched ✓':'Dispatch · confirm to worker'}</Btn>
              </div>
              <Btn variant="outline" full icon="phone-call">Call worker (VoIP)</Btn>
              <Btn variant="warning" full icon="flag">Mark resolved</Btn>
            </div>
          </div>

          {dispatched && (
            <div className="cc-panel rounded-xl p-3.5 border-success-500/30">
              <div className="text-[11px] font-bold uppercase tracking-wider text-success-400 mb-2 flex items-center gap-1.5"><Icon name="ambulance" size={13} /> Team en-route</div>
              <div className="flex items-center justify-between text-[12px]"><span className="cc-muted">Medical · Klinik Bahana</span><span className="font-extrabold mono text-success-400">ETA 3m</span></div>
              <div className="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-success-400" style={{ width:'40%' }} /></div>
            </div>
          )}

          <div className="cc-panel rounded-xl p-3.5 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-wider cc-muted mb-2">Post-resolution</div>
            <div className="rounded-lg cc-panel-2 p-3 text-[11px] cc-muted flex items-start gap-2"><Icon name="file-text" size={14} className="mt-0.5 shrink-0 text-warning-400" /><span>Incident report <b className="text-white">wajib</b> diisi setelah SOS resolved — auto-template terbuka dengan timeline lengkap.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CC3 — PTW Live Monitor
// ============================================================
function CC3_PTWMonitor() {
  const ptws = [
    { id:'PTW-00131', type:'Confined Space', loc:'Askara tank', tone:'danger', icon:'box', timer:'gas test +5m', status:'alert', x:24, y:54 },
    { id:'PTW-00125', type:'Hot Work', loc:'PIT Bahana', tone:'warning', icon:'flame', timer:'expires 28m', status:'expiring', x:52, y:30 },
    { id:'PTW-00128', type:'Work at Height', loc:'Workshop A', tone:'safety', icon:'arrow-up', timer:'2h 14m left', status:'active', x:70, y:54 },
    { id:'PTW-00122', type:'Hot Work', loc:'Coal Pad', tone:'warning', icon:'flame', timer:'briefing', status:'briefing', x:84, y:34 },
    { id:'PTW-00119', type:'Excavation', loc:'Hauling KM-78', tone:'info', icon:'shovel', timer:'4h 02m left', status:'active', x:46, y:44 },
  ];
  return (
    <div className="h-full flex min-h-0">
      {/* Map */}
      <div className="flex-1 relative min-h-0">
        <SiteMap height="100%" pins={ptws.map(p => ({ x:p.x, y:p.y, tone:p.tone, icon:p.icon, label:p.id }))} />
        <div className="absolute top-3 left-3"><ScreenHeadInline icon="clipboard-list" title="PTW Live Monitor" sub="12 active permits · color-coded by type" /></div>
        {/* alert banner */}
        <div className="absolute top-3 right-3 w-72 space-y-2">
          <div className="glass rounded-xl border border-danger-500/40 p-3 sos-glow">
            <div className="flex items-center gap-2 mb-0.5"><Icon name="wind" size={14} className="text-danger-400 sos-flash" /><div className="text-[12px] font-extrabold text-danger-400 flex-1">Gas test overdue</div></div>
            <div className="text-[11px] cc-muted">PTW-00131 Confined Space · Askara · <b className="text-danger-400">+5 min</b></div>
            <div className="mt-2 flex gap-1.5"><Btn variant="danger" size="sm" icon="phone">Contact holder</Btn><Btn variant="outline" size="sm" icon="arrow-up">Escalate SO</Btn></div>
          </div>
          <div className="glass rounded-xl border border-warning-500/30 p-3">
            <div className="flex items-center gap-2 mb-0.5"><Icon name="clock" size={14} className="text-warning-400" /><div className="text-[12px] font-extrabold text-warning-400 flex-1">Approaching expiry</div></div>
            <div className="text-[11px] cc-muted">PTW-00125 Hot Work · PIT · <b className="text-warning-400">28 min</b></div>
          </div>
        </div>
      </div>

      {/* Sidebar list */}
      <div className="w-80 border-l cc-line flex flex-col min-h-0" style={{ background:'var(--cc-panel)' }}>
        <div className="px-4 h-11 border-b cc-line flex items-center gap-2 shrink-0"><Icon name="list" size={14} className="cc-muted" /><span className="text-[12px] font-bold uppercase tracking-wider">Active PTW · {ptws.length} shown</span></div>
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
          {ptws.map(p => (
            <div key={p.id} className={`rounded-xl border p-3 ${p.status==='alert'?'bg-danger-500/12 border-danger-500/40':p.status==='expiring'?'bg-warning-500/10 border-warning-500/30':'cc-panel-2 border-white/8'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white bg-${p.tone}-500`}><Icon name={p.icon} size={15} /></div>
                <div className="flex-1 min-w-0"><div className="text-[12px] font-extrabold mono">{p.id}</div><div className="text-[10px] cc-muted truncate">{p.type}</div></div>
                {p.status==='alert' && <Pill tone="danger" size="sm" flash>!</Pill>}
              </div>
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="cc-muted inline-flex items-center gap-1"><Icon name="map-pin" size={11} /> {p.loc}</span>
                <span className={`font-bold mono ${p.status==='alert'?'text-danger-400':p.status==='expiring'?'text-warning-400':p.status==='briefing'?'text-info-400':'text-success-400'}`}>{p.timer}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2.5 border-t cc-line shrink-0"><Btn variant="outline" full size="sm" icon="external-link">Buka PTW module</Btn></div>
      </div>
    </div>
  );
}

function ScreenHeadInline({ icon, title, sub }) {
  return (
    <div className="glass rounded-xl border border-white/10 px-3.5 py-2.5 flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-lg cc-panel-2 border cc-line flex items-center justify-center text-brand-200"><Icon name={icon} size={18} /></div>
      <div><div className="text-[15px] font-extrabold tracking-tight">{title}</div>{sub && <div className="text-[10.5px] cc-muted">{sub}</div>}</div>
    </div>
  );
}

window.CC2_SOSResponse = CC2_SOSResponse;
window.CC3_PTWMonitor = CC3_PTWMonitor;
window.ScreenHeadInline = ScreenHeadInline;
