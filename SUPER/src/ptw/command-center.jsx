// PTW — Command Center tablet view (W5).

function W5_CommandCenter() {
  return (
    <div className="h-full w-full text-white relative flex flex-col" style={{ background:'#0A0F18' }}>
      {/* Top bar */}
      <div className="h-12 px-5 border-b border-white/10 flex items-center gap-4 text-[12px] shrink-0">
        <div className="flex items-center gap-2">
          <BrandMark size={22} />
          <div className="text-[11px] font-bold tracking-wider uppercase">Command Center · PTW Live</div>
        </div>
        <div className="h-5 w-px bg-white/15" />
        <div className="inline-flex items-center gap-1.5 text-white/80">
          <Icon name="radar" size={13} className="text-safety-400" />
          <span className="font-semibold">Site Bahana · Mining Ops</span>
        </div>
        <div className="flex-1" />
        <div className="text-white/70 mono text-[12px] tabular-nums">11:48:32 · 19 Mei</div>
        <div className="h-5 w-px bg-white/15" />
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-success-500/20 text-success-500 text-[10px] font-bold uppercase tracking-wider">
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-500 pulse-dot text-success-500" />
            12 Active
          </span>
          <Icon name="bell" size={16} className="text-white/70" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_360px] min-h-0">
        {/* Left: map */}
        <div className="relative">
          <svg viewBox="0 0 1000 700" className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="mapBg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#143452" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0A0F18" stopOpacity="1" />
              </radialGradient>
            </defs>
            <rect width="1000" height="700" fill="url(#mapBg)" />
            {/* topo */}
            <path d="M0,200 Q200,170 400,200 T800,180 T1000,220" stroke="#1F4E79" strokeWidth="1" fill="none" strokeDasharray="6 6" opacity="0.5" />
            <path d="M0,320 Q220,290 440,320 T820,300 T1000,340" stroke="#1F4E79" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.4" />
            <path d="M0,440 Q180,420 380,440 T780,430 T1000,460" stroke="#1F4E79" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.35" />
            <path d="M0,560 Q260,540 480,560 T860,550 T1000,580" stroke="#1F4E79" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.3" />

            {/* roads */}
            <path d="M50,650 L120,600 L220,580 L320,540 L460,500 L600,470 L740,440 L860,420 L960,400"
                  stroke="#F39800" strokeWidth="3" fill="none" opacity="0.4" />
            <path d="M50,650 L120,600 L220,580 L320,540 L460,500 L600,470 L740,440 L860,420 L960,400"
                  stroke="#F39800" strokeWidth="1" fill="none" strokeDasharray="3 6" />

            {/* zone polygons */}
            <polygon points="120,200 280,180 290,310 130,330" fill="#1F4E79" opacity="0.15" stroke="#4179AE" strokeWidth="1" strokeDasharray="4 4" />
            <text x="145" y="270" fontSize="11" fill="#9EBCDA" fontWeight="700" letterSpacing="1">PIT BAHANA</text>

            <polygon points="380,440 580,420 600,560 400,580" fill="#1F4E79" opacity="0.15" stroke="#4179AE" strokeWidth="1" strokeDasharray="4 4" />
            <text x="410" y="510" fontSize="11" fill="#9EBCDA" fontWeight="700" letterSpacing="1">COAL PAD AGRA</text>

            <polygon points="650,200 800,180 820,300 670,320" fill="#1F4E79" opacity="0.15" stroke="#4179AE" strokeWidth="1" strokeDasharray="4 4" />
            <text x="680" y="260" fontSize="11" fill="#9EBCDA" fontWeight="700" letterSpacing="1">WORKSHOP BAHANA</text>

            <polygon points="820,440 940,430 960,540 840,560" fill="#1F4E79" opacity="0.15" stroke="#4179AE" strokeWidth="1" strokeDasharray="4 4" />
            <text x="845" y="500" fontSize="10" fill="#9EBCDA" fontWeight="700" letterSpacing="1">TANGKI BBM</text>

            <text x="35" y="45" fontSize="11" fill="#5b6472" fontWeight="700" letterSpacing="1.5">SITE MAP · 19 MAY 2026 · 11:48:32 WITA</text>
            <text x="35" y="62" fontSize="10" fill="#5b6472" letterSpacing="0.5">Realtime · 12 PTW active · 3 SOS standby</text>
          </svg>

          {/* PTW pins on map */}
          {[
            { id:'PTW-2026-00123', type:'HW', x:'47%', y:'63%', state:'active' },
            { id:'PTW-2026-00124', type:'CS', x:'87%', y:'70%', state:'active', alert:'gas-test-due' },
            { id:'PTW-2026-00125', type:'WH', x:'72%', y:'30%', state:'active' },
            { id:'PTW-2026-00126', type:'IS', x:'24%', y:'46%', state:'active' },
            { id:'PTW-2026-00127', type:'EX', x:'88%', y:'82%', state:'active' },
            { id:'PTW-2026-00128', type:'HW', x:'19%', y:'28%', state:'active' },
            { id:'PTW-2026-00130', type:'WH', x:'52%', y:'48%', state:'active' },
            { id:'PTW-2026-00131', type:'GE', x:'42%', y:'78%', state:'active' },
            { id:'PTW-2026-00132', type:'CS', x:'63%', y:'58%', state:'active', alert:'expiring' },
            { id:'PTW-2026-00133', type:'WH', x:'34%', y:'76%', state:'suspended' },
            { id:'PTW-2026-00134', type:'IS', x:'78%', y:'48%', state:'active' },
            { id:'PTW-2026-00135', type:'GE', x:'14%', y:'68%', state:'active' },
          ].map(p => {
            const t = PERMIT_TYPES[p.type];
            const isAlert = !!p.alert;
            const suspended = p.state === 'suspended';
            return (
              <div key={p.id} className="absolute -translate-x-1/2 -translate-y-1/2"
                   style={{ left:p.x, top:p.y }}>
                <div className={`relative w-10 h-10 rounded-full bg-${t.tone}-500 text-white flex items-center justify-center border-2 border-white/30 shadow-2xl ${suspended?'opacity-50 saturate-50':''}`}>
                  <Icon name={t.icon} size={17} />
                  {!suspended && <span className={`absolute -inset-1.5 rounded-full bg-${t.tone}-500/35 pulse-dot`} />}
                  {isAlert && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger-500 text-white flex items-center justify-center text-[8px] font-extrabold border-2 border-[#0A0F18]">!</span>}
                </div>
              </div>
            );
          })}

          {/* Legend bottom-left */}
          <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur rounded-lg p-3 border border-white/10">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-white/60 mb-2">Permit type legend</div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10.5px]">
              {Object.values(PERMIT_TYPES).map(t => (
                <div key={t.code} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-full bg-${t.tone}-500 border border-white/40`} />
                  <span className="font-bold mono">{t.code}</span>
                  <span className="text-white/60">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini stats top-right */}
          <div className="absolute top-3 right-3 bg-black/55 backdrop-blur rounded-lg p-3 border border-white/10 text-[11px]">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-white/60 mb-1.5">Active by type</div>
            <div className="space-y-1">
              {[
                { c:'HW', n:3, alert:1 },
                { c:'CS', n:2, alert:1 },
                { c:'WH', n:3 },
                { c:'IS', n:2 },
                { c:'EX', n:1 },
                { c:'GE', n:1 },
              ].map(r => {
                const t = PERMIT_TYPES[r.c];
                return (
                  <div key={r.c} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded bg-${t.tone}-500`} />
                    <span className="font-bold mono w-6">{r.c}</span>
                    <span className="mono font-bold text-white tabular-nums">{r.n}</span>
                    {r.alert && <span className="ml-auto px-1 py-0.5 rounded bg-danger-500 text-white text-[9px] font-extrabold mono">{r.alert} alert</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: panels */}
        <div className="border-l border-white/10 flex flex-col min-h-0">
          {/* Alerts */}
          <div className="p-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="alert-triangle" size={14} className="text-danger-500" />
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-white">Alerts · 3</div>
              <span className="ml-auto inline-flex items-center gap-1 px-1.5 h-5 rounded bg-danger-500/20 text-danger-500 text-[9px] font-bold mono uppercase tracking-wider alert-blink">
                Live
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                { ic:'wind',          tone:'danger',  t:'Gas test overdue',       d:'PTW-00124 CS · BBM C MH1 · 12m terlambat' },
                { ic:'clock',         tone:'warning', t:'PTW expiring 1h',         d:'PTW-00125 WH · Workshop atap · 14:30' },
                { ic:'pause-circle',  tone:'warning', t:'PTW suspended weather',   d:'PTW-00133 WH · Conveyor C-04 · hujan' },
              ].map((a,i) => (
                <div key={i} className={`rounded-lg p-2.5 flex items-start gap-2.5 ${a.tone==='danger'?'bg-danger-500/15 border border-danger-500/40':'bg-warning-500/12 border border-warning-500/35'}`}>
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${a.tone==='danger'?'bg-danger-500 text-white':'bg-warning-500 text-white'}`}>
                    <Icon name={a.ic} size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11.5px] font-extrabold">{a.t}</div>
                    <div className="text-[10px] text-white/70">{a.d}</div>
                  </div>
                  <button className="text-[10px] font-bold text-white/80 hover:text-white">→</button>
                </div>
              ))}
            </div>
          </div>

          {/* PTW expiring soon */}
          <div className="p-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="clock" size={14} className="text-warning-500" />
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-white">Expiring &lt; 2 jam</div>
            </div>
            <div className="space-y-1.5">
              {[
                { id:'PTW-2026-00125', type:'WH', loc:'Workshop atap',  rem:'42m', urgent:true },
                { id:'PTW-2026-00132', type:'CS', loc:'Tangki BBM A',   rem:'1j 18m' },
                { id:'PTW-2026-00128', type:'HW', loc:'Maint Yard',     rem:'1j 52m' },
              ].map(p => {
                const t = PERMIT_TYPES[p.type];
                return (
                  <div key={p.id} className="rounded-lg bg-white/[0.04] border border-white/10 p-2 flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded bg-${t.tone}-500 text-white flex items-center justify-center`}><Icon name={t.icon} size={13} /></span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-extrabold mono">{p.id}</div>
                      <div className="text-[10px] text-white/65 truncate">{p.loc}</div>
                    </div>
                    <div className={`text-[11.5px] font-extrabold mono ${p.urgent?'text-warning-500':'text-white/80'}`}>{p.rem}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active PTW list */}
          <div className="p-3 flex-1 min-h-0 overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="activity" size={14} className="text-success-500" />
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-white">Active PTW · 12</div>
              <span className="ml-auto text-[9px] text-white/50 mono">refreshed 0s ago</span>
            </div>
            <div className="space-y-1.5">
              {[
                { id:'PTW-2026-00123', type:'HW', loc:'Coal Pad Agra Sec 3',  w:3, until:'14:30', state:'active' },
                { id:'PTW-2026-00124', type:'CS', loc:'Tangki BBM C · MH 1',    w:5, until:'10:00', state:'active', alert:true },
                { id:'PTW-2026-00125', type:'WH', loc:'Workshop · Atap',        w:2, until:'12:30', state:'active', expiring:true },
                { id:'PTW-2026-00126', type:'IS', loc:'Substation A · P4',     w:4, until:'18:00', state:'active' },
                { id:'PTW-2026-00127', type:'EX', loc:'Hauling KM 42',          w:6, until:'19:00', state:'active' },
                { id:'PTW-2026-00128', type:'HW', loc:'PIT Bahana · Maint',    w:2, until:'14:00', state:'active' },
                { id:'PTW-2026-00131', type:'GE', loc:'Coal Pad · Inspeksi',    w:2, until:'17:00', state:'active' },
              ].map(p => {
                const t = PERMIT_TYPES[p.type];
                return (
                  <button key={p.id} className="w-full text-left rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] p-2 flex items-center gap-2.5">
                    <span className={`w-8 h-8 rounded bg-${t.tone}-500 text-white flex items-center justify-center shrink-0`}><Icon name={t.icon} size={14} /></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-extrabold mono">{p.id}</span>
                        {p.alert && <span className="px-1 h-3.5 rounded bg-danger-500 text-white text-[8px] font-extrabold inline-flex items-center">!</span>}
                        {p.expiring && <span className="px-1 h-3.5 rounded bg-warning-500 text-white text-[8px] font-extrabold inline-flex items-center">EXP</span>}
                      </div>
                      <div className="text-[10px] text-white/65 truncate">{p.loc} · {p.w} worker · until {p.until}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom event stream */}
      <div className="h-[120px] border-t border-white/10 px-5 py-2.5 shrink-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Icon name="rss" size={13} className="text-safety-400" />
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-white">Event stream · live</div>
          <span className="ml-auto text-[9px] text-white/50 mono">23 events / hour</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[10.5px]">
          {[
            { t:'11:48:32', ic:'check-circle-2', tone:'success', m:'PTW-00125 · WH · Bagas R. close-out signed by SO' },
            { t:'11:46:18', ic:'wind',           tone:'danger',  m:'PTW-00124 · CS · Gas test reminder — 12m overdue' },
            { t:'11:42:01', ic:'circle-play',    tone:'success', m:'PTW-00131 · GE · activated after briefing 5/5 signed' },
            { t:'11:38:42', ic:'pause-circle',   tone:'warning', m:'PTW-00133 · WH · auto-suspend (weather alert: rain)' },
            { t:'11:32:18', ic:'edit-3',         tone:'info',    m:'PTW-00128 · HW · L1 SPV approved (Hadi W. · 14m)' },
            { t:'11:28:11', ic:'shield-check',   tone:'success', m:'PTW-00126 · IS · LOTO 4 points locked & verified' },
          ].map((e,i) => (
            <div key={i} className="flex items-start gap-2 rounded bg-white/[0.04] border border-white/10 p-1.5">
              <Icon name={e.ic} size={12} className={`text-${e.tone}-500 mt-0.5 shrink-0`} />
              <div className="flex-1 min-w-0">
                <span className="text-white/80 truncate">{e.m}</span>
              </div>
              <span className="text-white/50 mono text-[9.5px] shrink-0">{e.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.W5_CommandCenter = W5_CommandCenter;
