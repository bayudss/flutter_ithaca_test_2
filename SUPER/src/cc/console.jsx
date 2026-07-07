// Command Center — CC1 Main Operator Console.

function CC1_Console() {
  const [drawer, setDrawer] = React.useState(null);
  const [tab, setTab] = React.useState('all');
  const [layers, setLayers] = React.useState({ sos:true, ptw:true, shuttle:true, truck:true, worker:false, weather:false });
  const toggle = k => setLayers(l => ({ ...l, [k]:!l[k] }));

  // Live map pins
  const pins = [
    layers.sos && { x:84, y:34, tone:'danger', icon:'siren', sos:true, label:'SOS · Budi', kind:'sos', name:'Budi Santoso', loc:'Coal Pad Agra' },
    layers.ptw && { x:52, y:30, tone:'warning', icon:'flame', label:'PTW Hot Work', kind:'ptw' },
    layers.ptw && { x:24, y:54, tone:'info', icon:'box', label:'PTW Confined', kind:'ptw' },
    layers.ptw && { x:70, y:54, tone:'safety', icon:'arrow-up', label:'PTW Height', kind:'ptw' },
    layers.shuttle && { x:34, y:62, tone:'brand', icon:'bus', heading:-20, label:'SHT-04', kind:'shuttle' },
    layers.shuttle && { x:60, y:40, tone:'brand', icon:'bus', heading:-35, label:'SHT-07', kind:'shuttle' },
    layers.truck && { x:46, y:44, tone:'success', icon:'truck', heading:-15, kind:'truck' },
    layers.truck && { x:64, y:36, tone:'success', icon:'truck', heading:-30, kind:'truck' },
    layers.truck && { x:76, y:44, tone:'success', icon:'truck', heading:40, kind:'truck' },
    layers.worker && { x:50, y:30, tone:'info', icon:'users', label:'~120 workers', kind:'worker' },
  ].filter(Boolean);

  const layerDefs = [
    { k:'sos', l:'SOS', ic:'siren', tone:'text-danger-400' },
    { k:'ptw', l:'PTW', ic:'clipboard-list', tone:'text-warning-400' },
    { k:'shuttle', l:'Shuttle', ic:'bus', tone:'text-brand-200' },
    { k:'truck', l:'Hauling', ic:'truck', tone:'text-success-400' },
    { k:'worker', l:'Workers', ic:'users', tone:'text-info-400' },
    { k:'weather', l:'Weather', ic:'cloud-rain', tone:'text-info-400' },
  ];

  return (
    <div className="h-full flex flex-col gap-2.5 p-2.5 min-h-0">
      {/* Main grid: map + alerts + comm log */}
      <div className="flex-1 min-h-0 grid grid-cols-12 grid-rows-1 gap-2.5">
        {/* Widget A — Live Map */}
        <div className="col-span-7 row-span-1 min-h-0">
          <Widget title="Live Map · Nusaraya Area" icon="map" live accent="#F39800" pad={false} className="h-full"
            right={<Btn variant="ghost" size="sm" icon="expand">Detach</Btn>}>
            <div className="relative h-full">
              <SiteMap height="100%" layers={layers} pins={pins} onPin={setDrawer} />
              {/* Layer toggles */}
              <div className="absolute top-2.5 left-2.5 glass rounded-lg border border-white/10 p-1.5 flex flex-col gap-1">
                <div className="text-[8.5px] font-bold uppercase tracking-wider cc-subtle px-1 mb-0.5">Layers</div>
                {layerDefs.map(d => (
                  <button key={d.k} onClick={() => toggle(d.k)} className={`flex items-center gap-1.5 px-1.5 h-6 rounded text-[10px] font-bold transition-colors ${layers[d.k]?'bg-white/10':''}`}>
                    <Icon name={d.ic} size={11} className={layers[d.k]?d.tone:'cc-subtle'} />
                    <span className={layers[d.k]?'':'cc-subtle'}>{d.l}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${layers[d.k]?'bg-success-400':'bg-white/15'}`} />
                  </button>
                ))}
              </div>
              {/* Scale + coords */}
              <div className="absolute bottom-2.5 left-2.5 glass rounded px-2 py-1 text-[8.5px] mono cc-muted border border-white/5">Hauling Road 126 KM · zoom 12</div>
              {drawer && (
                <div className="absolute top-0 right-0 bottom-0 w-64 glass border-l border-white/10 p-3.5 flex flex-col">
                  <div className="flex items-center justify-between mb-2"><div className="text-[11px] font-bold uppercase tracking-wider cc-muted">{drawer.kind} detail</div><button onClick={() => setDrawer(null)} className="cc-muted hover:text-white"><Icon name="x" size={16} /></button></div>
                  {drawer.kind==='sos' ? (
                    <div className="space-y-3">
                      <div className="rounded-lg bg-danger-500/15 border border-danger-500/40 p-3 sos-glow">
                        <div className="flex items-center gap-2.5"><Avatar name={drawer.name} size={40} tone="danger" /><div><div className="text-[13px] font-extrabold">{drawer.name}</div><div className="text-[10px] cc-muted">{drawer.loc}</div></div></div>
                        <div className="mt-2 flex items-center justify-between"><Pill tone="danger" size="sm" icon="siren" flash>SOS</Pill><span className="text-[11px] cc-muted">since <SinceTimer from={138} className="text-danger-400 font-bold" /></span></div>
                      </div>
                      <Btn variant="danger" full icon="siren">Open SOS response</Btn>
                    </div>
                  ) : (
                    <div className="space-y-2 text-[11px]">
                      <div className="rounded-lg cc-panel-2 p-2.5"><div className="cc-subtle uppercase text-[9px] font-bold tracking-wider">{drawer.label||drawer.kind}</div><div className="font-bold mt-0.5">Tap pin di map untuk detail</div></div>
                      <Btn variant="outline" full size="sm" icon="external-link">Buka modul detail</Btn>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Widget>
        </div>

        {/* Widget B — Active Alerts */}
        <div className="col-span-3 min-h-0">
          <Widget title="Active Alerts" icon="bell-ring" accent="#E24B4A" className="h-full" pad={false}>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-1 px-2 py-2 border-b cc-line shrink-0">
                {[{id:'all',l:'All'},{id:'sos',l:'SOS'},{id:'ptw',l:'PTW'},{id:'sys',l:'System'}].map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)} className={`px-2.5 h-7 rounded text-[11px] font-bold ${tab===t.id?'bg-white/10 text-white':'cc-muted'}`}>{t.l}</button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
                {/* SOS top priority */}
                <div className="rounded-lg bg-danger-500/15 border border-danger-500/40 p-2.5 sos-glow">
                  <div className="flex items-center gap-2 mb-1"><Icon name="siren" size={14} className="text-danger-400 sos-flash" /><div className="text-[11.5px] font-extrabold text-danger-400 flex-1">SOS · Medical</div><SinceTimer from={138} className="text-danger-400 text-[11px] font-bold" /></div>
                  <div className="flex items-center gap-2"><Avatar name="Budi Santoso" size={26} tone="danger" /><div className="min-w-0"><div className="text-[11px] font-bold truncate">Budi Santoso</div><div className="text-[9.5px] cc-muted">Coal Pad Agra · responder en-route</div></div></div>
                </div>
                {/* PTW expiring */}
                {['ptw','all'].includes(tab) && [
                  { t:'PTW-00131 gas test overdue', d:'Confined Space · Askara · +5m', tone:'danger', ic:'wind' },
                  { t:'PTW-00125 expiring 28m', d:'Hot Work · PIT Bahana', tone:'warning', ic:'clock' },
                ].map((a,i) => (
                  <div key={i} className={`rounded-lg p-2.5 border bg-${a.tone}-500/12 border-${a.tone}-500/30`}>
                    <div className="flex items-center gap-2"><Icon name={a.ic} size={13} className={`text-${a.tone}-400`} /><div className={`text-[11px] font-bold text-${a.tone}-400 flex-1`}>{a.t}</div></div>
                    <div className="text-[9.5px] cc-muted mt-0.5">{a.d}</div>
                  </div>
                ))}
                {/* System anomaly */}
                {['sys','all'].includes(tab) && (
                  <div className="rounded-lg p-2.5 border bg-warning-500/12 border-warning-500/30">
                    <div className="flex items-center gap-2"><Icon name="server" size={13} className="text-warning-400" /><div className="text-[11px] font-bold text-warning-400 flex-1">SAP integration latency high</div></div>
                    <div className="text-[9.5px] cc-muted mt-0.5">avg 4.2s · threshold 2s · degraded</div>
                  </div>
                )}
                {tab==='sos' && <div className="text-center py-3 text-[10.5px] cc-subtle">1 SOS shown above</div>}
              </div>
            </div>
          </Widget>
        </div>

        {/* Widget D — Comm Log */}
        <div className="col-span-2 min-h-0">
          <Widget title="Comm Log" icon="radio" live className="h-full" pad={false}>
            <div className="h-full overflow-y-auto px-3 py-1">
              <LogEntry time="14:34" sev="critical" icon="siren">SOS from <b className="text-white">Pak Budi</b> at Coal Pad Agra</LogEntry>
              <LogEntry time="14:32" sev="success" icon="check-circle-2">PTW-00125 closed by SPV Hadi</LogEntry>
              <LogEntry time="14:30" sev="info" icon="bus">Shuttle SHT-04 departed Mess → PIT</LogEntry>
              <LogEntry time="14:28" sev="warning" icon="server">SAP latency warning triggered</LogEntry>
              <LogEntry time="14:25" sev="info" icon="clipboard-list">PTW-00131 gas test reminder sent</LogEntry>
              <LogEntry time="14:22" sev="success" icon="scale">Weighbridge WB-02 · truck #187</LogEntry>
              <LogEntry time="14:18" sev="info" icon="user-check">Visitor VIS-0419 entered PIT (escort)</LogEntry>
              <LogEntry time="14:15" sev="caution" icon="cloud-rain">Light rain detected · hauling advisory</LogEntry>
              <LogEntry time="14:10" sev="success" icon="bus">SHT-09 completed PIT → Mess</LogEntry>
              <LogEntry time="14:04" sev="info" icon="radio">Radio check · all sectors clear</LogEntry>
            </div>
          </Widget>
        </div>
      </div>

      {/* Widget C — KPI Tickers */}
      <KPITickerRow />
    </div>
  );
}

function KPITickerRow() {
  const prod = useTicker(4234, () => 4234 + Math.floor(Math.random()*40), 4000);
  const workers = useTicker(4234, () => 4220 + Math.floor(Math.random()*30), 6000);
  const items = [
    { ic:'users', l:'Worker active', v:workers.toLocaleString(), spark:[4180,4200,4215,4225,4234,4228,workers/1], tone:'#5BA3E8' },
    { ic:'clipboard-list', l:'PTW active', v:'12', spark:[8,10,9,11,12,12,12], tone:'#F5B73D' },
    { ic:'bus', l:'Shuttle ops', v:'8 / 12', spark:[6,7,8,7,8,8,8], tone:'#4179AE' },
    { ic:'mountain', l:'Production', v:prod.toLocaleString()+' t', sub:'/ 5,000 target', spark:[3200,3600,3900,4050,4180,4234,prod/1], tone:'#34C088' },
    { ic:'scale', l:'Weighbridge', v:'187', sub:'trucks', spark:[120,140,158,170,180,187,187], tone:'#34C088' },
    { ic:'shield-check', l:'Incident today', v:'0', tone:'#34C088', big:true },
    { ic:'cloud-rain', l:'Weather', v:'28°C', sub:'light rain · 12 km/h', tone:'#5BA3E8' },
  ];
  return (
    <div className="cc-panel rounded-xl shrink-0">
      <div className="grid grid-cols-7 divide-x divide-[color:var(--cc-line)]">
        {items.map((k,i) => (
          <div key={i} className="px-3.5 py-2.5 flex flex-col justify-between min-h-[68px]">
            <div className="flex items-center gap-1.5"><Icon name={k.ic} size={12} className="cc-subtle" /><span className="text-[9.5px] font-bold uppercase tracking-wider cc-subtle truncate">{k.l}</span></div>
            <div className="flex items-end justify-between gap-1 mt-1">
              <div><span className={`text-[19px] font-extrabold mono leading-none ${k.l==='Incident today'?'text-success-400':''}`}>{k.v}</span>{k.sub && <span className="text-[9px] cc-subtle ml-1">{k.sub}</span>}</div>
              {k.spark && <Spark data={k.spark} color={k.tone} w={56} h={22} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.CC1_Console = CC1_Console;
