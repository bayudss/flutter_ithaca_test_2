// Transportation — Driver mobile screens D1-D4.

// ============================================================
// D1 — Driver Home
// ============================================================
function D1_Home() {
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <div className="bg-brand-700 text-white px-5 pt-1 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Avatar name="Sumarno" size={44} photo />
          <div className="flex-1"><div className="text-[15px] font-bold tracking-tight">Sumarno</div><div className="text-[11px] opacity-80">Driver SHT-04 · KT 7821 AB</div></div>
          {/* Duty toggle */}
          <div className="flex items-center gap-2 bg-white/15 rounded-full p-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2">On Duty</span>
            <div className="w-10 h-5 rounded-full bg-success-400 p-0.5"><div className="w-4 h-4 rounded-full bg-white translate-x-5" /></div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-white/15"><Icon name="sunrise" size={12} /> Shift Pagi · 05:00–14:00</span>
          <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-white/15"><Icon name="bus" size={12} /> Bus 30-seat</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Active trip */}
        <div className="px-4 pt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Active trip</div>
          <div className="surface rounded-2xl p-4 border-l-4 border-l-brand-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] mono text-subtle font-bold">TRIP-260529-04</div>
              <StatusPill tone="warning" size="sm" icon="play-circle">Boarding</StatusPill>
            </div>
            <div className="text-[15px] font-extrabold tracking-tight">Mess Griya → PIT Bahana</div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-elev p-2"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Berangkat</div><div className="text-[13px] font-extrabold mono">06:00</div></div>
              <div className="rounded-lg bg-elev p-2"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Manifest</div><div className="text-[13px] font-extrabold mono">22 / 30</div></div>
              <div className="rounded-lg bg-elev p-2"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Boarded</div><div className="text-[13px] font-extrabold mono text-success-700">18</div></div>
            </div>
            <Btn variant="primary" size="md" full icon="play" className="mt-3">Continue trip · scan boarding</Btn>
          </div>
        </div>

        {/* Fatigue indicator */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Fatigue management</div>
          <div className="surface rounded-2xl p-4 flex items-center gap-4">
            <FatigueGauge hours={4.5} limit={10} size={110} />
            <div className="flex-1 space-y-2">
              <div><div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Drive time hari ini</div><div className="text-[16px] font-extrabold mono">4j 30m <span className="text-[11px] text-subtle">/ 10j</span></div></div>
              <div className="flex items-center gap-1.5 text-[11.5px]"><Icon name="coffee" size={13} className="text-success-600" /><span className="text-muted">Last rest 2 jam lalu · 45m</span></div>
              <StatusPill tone="success" size="sm" icon="check-circle-2">Aman · 5j 30m tersisa</StatusPill>
            </div>
          </div>
        </div>

        {/* Upcoming trips */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Trip berikutnya</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { t:'08:30', r:'PIT Bahana → Mess', cap:'12 reserved' },
              { t:'10:00', r:'Mess → Coal Pad Agra', cap:'24 reserved' },
              { t:'13:30', r:'Coal Pad → Mess', cap:'8 reserved' },
            ].map((t,i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className="text-[14px] font-extrabold mono w-14">{t.t}</div>
                <div className="flex-1 min-w-0"><div className="text-[12.5px] font-bold truncate">{t.r}</div><div className="text-[10.5px] text-subtle">{t.cap}</div></div>
                <Icon name="chevron-right" size={15} className="text-subtle" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-[18px]"><MobileBottomNav active={0} role="driver" /></div>
    </div>
  );
}

// ============================================================
// D2 — Driver Trip Execution
// ============================================================
function D2_TripExecution() {
  const manifest = [
    { n:'Budi Santoso',  nik:'NSR-009281', seat:12, status:'boarded' },
    { n:'Siti Rahayu',   nik:'NSR-007123', seat:14, status:'boarded' },
    { n:'Joko Pranoto',  nik:'KNC-002104', seat:5,  status:'boarded' },
    { n:'Lina Marbun',   nik:'NSR-008092', seat:8,  status:'reserved' },
    { n:'Eko Saputra',   nik:'NSR-005412', seat:21, status:'noshow' },
  ];
  return (
    <div className="flex-1 flex flex-col bg-elev">
      {/* Sticky header */}
      <div className="bg-brand-700 text-white px-5 pt-1 pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1 min-w-0"><div className="text-[10px] uppercase tracking-wider opacity-80 font-bold mono">TRIP-260529-04</div><div className="text-[14px] font-extrabold tracking-tight truncate">Mess → PIT Bahana · 06:00</div></div>
          <div className="text-right"><div className="text-[10px] opacity-80">Speed</div><div className="text-[18px] font-extrabold mono leading-none">42</div></div>
        </div>
      </div>

      {/* Map embed */}
      <div className="relative h-40 shrink-0">
        <SiteMap route vehicles={[{ x:'42%', y:'58%', heading:-25, label:'You' }]} height="100%" />
        {/* speed limit warning */}
        <div className="absolute top-2 right-2 inline-flex items-center gap-1.5 px-2 h-7 rounded-lg bg-white/95 shadow text-[11px] font-bold">
          <span className="w-5 h-5 rounded-full border-2 border-danger-500 text-danger-600 flex items-center justify-center text-[8px] font-extrabold">60</span>
          <span className="text-success-700">42 km/h ✓</span>
        </div>
        <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 px-2 h-6 rounded bg-success-500 text-white text-[10px] font-bold"><span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> GPS tracking · 15s</div>
      </div>

      {/* Manifest */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-28">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">Passenger manifest</div>
          <div className="text-[11px] font-bold"><span className="text-success-700">3 boarded</span> · <span className="text-subtle">1 pending</span> · <span className="text-danger-700">1 no-show</span></div>
        </div>
        <div className="space-y-2">
          {manifest.map((p,i) => (
            <div key={i} className={`surface rounded-xl p-3 flex items-center gap-3 ${p.status==='noshow'?'opacity-70':''}`}>
              <Avatar name={p.n} size={38} photo />
              <div className="flex-1 min-w-0"><div className="text-[12.5px] font-extrabold truncate">{p.n}</div><div className="text-[10px] text-subtle mono">{p.nik} · seat {p.seat}</div></div>
              {p.status==='boarded'  && <StatusPill tone="success" size="sm" icon="check-circle-2">Boarded</StatusPill>}
              {p.status==='reserved' && <button className="h-8 px-2.5 rounded-md bg-brand-500 text-white text-[10.5px] font-bold inline-flex items-center gap-1"><Icon name="qr-code" size={12} /> Scan</button>}
              {p.status==='noshow'   && <StatusPill tone="danger" size="sm" icon="user-x">No-show</StatusPill>}
            </div>
          ))}
        </div>

        {/* Mark no-show hint */}
        <div className="mt-3 rounded-xl bg-warning-50 border border-warning-500/25 p-3 flex items-start gap-2.5">
          <Icon name="info" size={15} className="text-warning-600 mt-0.5 shrink-0" />
          <div className="text-[11px] text-warning-700">1 passenger belum boarding. Tandai <span className="font-bold">no-show</span> bila tidak hadir agar bisa start trip &amp; close manifest.</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3 flex gap-2">
        <button className="w-12 h-12 rounded-xl bg-danger-500 text-white flex items-center justify-center"><Icon name="alert-octagon" size={20} /></button>
        <button className="h-12 px-3 rounded-xl border border-token-strong bg-white text-brand-700 text-[12px] font-bold inline-flex items-center gap-1.5"><Icon name="map-pin" size={15} /> Mark stop</button>
        <Btn variant="success" full icon="play-circle">Start trip · close manifest</Btn>
      </div>
    </div>
  );
}

// ============================================================
// D3 — Boarding Scanner
// ============================================================
function D3_BoardingScanner() {
  return (
    <div className="flex-1 flex flex-col relative" style={{ background:'#0a0d12' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background:'radial-gradient(circle at 50% 40%, #1a2333 0%, #0a0d12 80%)' }} />
      </div>
      {/* Top */}
      <div className="relative z-10 px-5 pt-1 flex items-center justify-between text-white">
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center"><Icon name="x" size={20} /></button>
        <div className="text-[13px] font-bold">Scan Boarding QR</div>
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center"><Icon name="zap-off" size={18} /></button>
      </div>

      {/* Scanner frame */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pb-4">
        <div className="relative w-[230px] h-[230px]">
          {['tl','tr','bl','br'].map(c => (
            <div key={c} className={`absolute w-10 h-10 ${c.includes('t')?'top-0 border-t-4':'bottom-0 border-b-4'} ${c.includes('l')?'left-0 border-l-4':'right-0 border-r-4'}`} style={{ borderColor:'#1D9E75', borderRadius: c==='tl'?'10px 0 0 0':c==='tr'?'0 10px 0 0':c==='bl'?'0 0 0 10px':'0 0 10px 0' }} />
          ))}
        </div>
        {/* Success result */}
        <div className="mt-5 w-[300px] rounded-2xl bg-white p-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-success-500 text-white flex items-center justify-center"><Icon name="check" size={26} strokeWidth={3} /></div>
            <div className="flex-1"><div className="text-[14px] font-extrabold">Budi Santoso</div><div className="text-[11px] text-muted">Seat 12 · Mess → PIT Bahana</div></div>
          </div>
          <div className="mt-3 rounded-lg bg-success-50 border border-success-500/25 p-2.5 text-[11.5px] text-success-700 flex items-center gap-2"><Icon name="check-circle-2" size={14} /> Valid · seat &amp; trip match</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button className="h-10 rounded-xl border border-danger-500/30 text-danger-700 text-[12px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="x" size={14} /> Reject</button>
            <Btn variant="success" size="sm" icon="check">Confirm boarding</Btn>
          </div>
        </div>
      </div>

      {/* Bottom counter */}
      <div className="relative z-10 bg-white/10 backdrop-blur border-t border-white/10 px-5 py-3 flex items-center gap-4 text-white">
        <div className="flex-1">
          <div className="flex items-center justify-between text-[11px] mb-1.5"><span className="font-bold">Boarded</span><span className="mono font-bold">19 / 22 reserved</span></div>
          <div className="h-2 rounded-full bg-white/20 overflow-hidden"><div className="h-full bg-success-500" style={{ width:'86%' }} /></div>
        </div>
        <Btn variant="success" size="sm" icon="play-circle">Start · all boarded</Btn>
      </div>
    </div>
  );
}

// ============================================================
// D4 — Driver Fatigue Management (force rest scenario)
// ============================================================
function D4_Fatigue({ forceRest=true }) {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Fatigue Management" sub="Compliance · max 10 jam" dark={forceRest} />
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Big gauge */}
        <div className={`px-4 pt-5 pb-4 ${forceRest?'bg-danger-500 text-white':''}`} style={forceRest?{ background:'linear-gradient(180deg, #8E2A29 0%, #E24B4A 100%)' }:{}}>
          <div className="flex flex-col items-center">
            <div className="relative">
              <FatigueGauge hours={forceRest?9.5:7} limit={10} size={170} />
            </div>
            {forceRest ? (
              <>
                <div className="mt-3 text-[20px] font-extrabold tracking-tight text-center">Mendekati limit!</div>
                <div className="text-[12.5px] opacity-90 text-center mt-1">Istirahat segera setelah trip ini. Dispatch baru di-lock.</div>
              </>
            ) : (
              <>
                <div className="mt-3 text-[20px] font-extrabold tracking-tight text-center">Kondisi aman</div>
                <div className="text-[12.5px] text-muted text-center mt-1">3 jam tersisa sebelum limit</div>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 mt-4 grid grid-cols-2 gap-2">
          {[
            { l:'Drive time hari ini', v:forceRest?'9j 30m':'7j 00m', ic:'clock', tone:forceRest?'danger':'warning' },
            { l:'Trips selesai', v:'3', ic:'route', tone:'brand' },
            { l:'Last rest ended', v:'4 jam lalu', ic:'coffee', tone:'gray' },
            { l:'Rest duration', v:'1 jam', ic:'bed', tone:'gray' },
          ].map(s => (
            <div key={s.l} className="surface rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-subtle font-bold"><Icon name={s.ic} size={11} /> {s.l}</div>
              <div className={`text-[18px] font-extrabold mono mt-0.5 text-${s.tone}-700`}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Force rest lock */}
        {forceRest && (
          <div className="px-4 mt-4">
            <div className="rounded-2xl bg-danger-50 border-2 border-danger-500/30 p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-danger-500 text-white flex items-center justify-center"><Icon name="lock" size={20} /></div>
                <div className="flex-1"><div className="text-[13px] font-extrabold text-danger-700">Trip dispatch locked</div><div className="text-[10.5px] text-danger-700/85">Wajib istirahat 8 jam sebelum drive lagi</div></div>
              </div>
              <div className="rounded-lg bg-white p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-info-50 text-info-600 flex items-center justify-center"><Icon name="map-pin" size={17} /></div>
                <div className="flex-1"><div className="text-[12px] font-bold">Rest stop terdekat</div><div className="text-[10.5px] text-muted">Pos Istirahat Askara · 2.4 km · ada kantin</div></div>
                <button className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name="navigation" size={16} /></button>
              </div>
            </div>
          </div>
        )}

        {/* Drive log today */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Log mengemudi hari ini</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { t:'05:00–07:30', d:'Trip 1 · Mess → PIT', dur:'2j 30m', tone:'success' },
              { t:'07:30–08:30', d:'Rest', dur:'1j 00m', tone:'info', rest:true },
              { t:'08:30–11:00', d:'Trip 2 · PIT → Mess → Coal Pad', dur:'2j 30m', tone:'success' },
              { t:'11:00–14:30', d:'Trip 3 · Coal Pad → Mess', dur:'3j 30m', tone:'warning' },
            ].map((l,i) => (
              <div key={i} className="px-4 py-2.5 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${l.rest?'bg-info-500':'bg-success-500'}`} />
                <div className="text-[11px] mono text-subtle w-24">{l.t}</div>
                <div className="flex-1 text-[12px] font-semibold">{l.d}</div>
                <div className={`text-[11px] font-bold mono ${l.rest?'text-info-700':''}`}>{l.dur}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.D1_Home = D1_Home;
window.D2_TripExecution = D2_TripExecution;
window.D3_BoardingScanner = D3_BoardingScanner;
window.D4_Fatigue = D4_Fatigue;
