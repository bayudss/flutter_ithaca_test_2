// Contractor — Gate Console W14 (tablet, security operator).

function W14_GateConsole({ mode='granted' }) {
  const grant = mode === 'granted';
  return (
    <div className="h-full w-full text-white relative" style={{ background: grant ? 'radial-gradient(circle at 50% 40%, #11624A 0%, #0A0F18 80%)' : 'radial-gradient(circle at 50% 40%, #8E2A29 0%, #0A0F18 80%)' }}>
      {/* Top bar */}
      <div className="h-12 px-5 border-b border-white/10 flex items-center gap-4 text-[12px]">
        <div className="flex items-center gap-2">
          <BrandMark size={22} />
          <div className="text-[11px] font-bold tracking-wider uppercase">Gate Access Console</div>
        </div>
        <div className="h-5 w-px bg-white/15" />
        <div className="inline-flex items-center gap-1.5 text-white/80">
          <Icon name="map-pin" size={13} className="text-safety-400" />
          <span className="font-semibold">Gate A · PIT Bahana · Main entrance</span>
        </div>
        <div className="h-5 w-px bg-white/15" />
        <div className="inline-flex items-center gap-1.5 text-white/80">
          <Icon name="user-check" size={13} />
          <span className="font-semibold">Operator: Yono Susanto</span>
        </div>
        <div className="flex-1" />
        <div className="text-white/70 mono text-[12px] tabular-nums">08:14:32 · 19 Mei 2026</div>
        <div className="h-5 w-px bg-white/15" />
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-success-500/20 text-success-500 text-[10px] font-bold uppercase tracking-wider">
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-500 pulse-dot text-success-500" />
            Online · 142 scans hari ini
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_360px] h-[calc(100%-48px)]">
        {/* Main scan area */}
        <div className="relative flex flex-col items-center justify-center p-8">
          {grant ? (
            <>
              {/* Big ACCESS GRANTED */}
              <div className="relative">
                <div className="w-44 h-44 rounded-full bg-success-500/15 border-4 border-success-500 flex items-center justify-center green-pulse">
                  <Icon name="check" size={88} strokeWidth={3} className="text-success-500" />
                </div>
              </div>
              <div className="mt-8 text-[64px] font-extrabold tracking-tight leading-none">ACCESS GRANTED</div>
              <div className="mt-3 text-[16px] text-white/75">Welcome, <span className="font-extrabold text-white">Budi Santoso</span></div>

              {/* Validation checklist */}
              <div className="mt-8 grid grid-cols-2 gap-2 max-w-[640px] w-full">
                {[
                  { l:'Identity verified',         d:'Photo match · 98% confidence' },
                  { l:'Access PIT Bahana',         d:'Shift pagi · authorized' },
                  { l:'All certs valid',           d:'SIMPER B · MCU · K3L · 5 certs' },
                  { l:'Not on suspended list',     d:'Compliance 100%' },
                ].map((v,i) => (
                  <div key={i} className="rounded-lg bg-success-500/10 border border-success-500/30 p-3 flex items-center gap-2.5">
                    <Icon name="check-circle-2" size={18} className="text-success-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-extrabold">{v.l}</div>
                      <div className="text-[10.5px] text-white/65">{v.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-[12px] text-white/65 px-3 h-9 rounded-full bg-white/10">
                <Icon name="volume-2" size={13} className="text-success-500" />
                Audio chime: "Access granted" · 08:14:18
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <div className="w-44 h-44 rounded-full bg-danger-500/15 border-4 border-danger-500 flex items-center justify-center red-pulse">
                  <Icon name="x" size={92} strokeWidth={3.5} className="text-danger-500" />
                </div>
              </div>
              <div className="mt-8 text-[64px] font-extrabold tracking-tight leading-none">ACCESS DENIED</div>
              <div className="mt-3 text-[16px] text-white/75">Reason: <span className="font-extrabold text-white">MCU expired 17 hari yang lalu</span></div>

              <div className="mt-8 rounded-xl bg-danger-500/15 border border-danger-500/40 p-4 max-w-[640px] w-full">
                <div className="text-[11px] uppercase tracking-[0.18em] text-danger-500 font-extrabold mb-2">Worker info</div>
                <div className="flex items-center gap-3">
                  <Avatar name="Lina Marbun" size={48} tone="gray" />
                  <div className="flex-1">
                    <div className="text-[16px] font-extrabold">Lina Marbun</div>
                    <div className="text-[11px] text-white/65 mono">W-08092 · PT BWS · Welder 3G SMAW</div>
                  </div>
                  <StatusPill tone="danger" icon="ban" size="lg">Suspended</StatusPill>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Btn variant="dark" size="sm" icon="phone" className="bg-white/15 border-white/30 hover:bg-white/25">Call HR</Btn>
                <Btn variant="dark" size="sm" icon="unlock" className="bg-warning-500 border-warning-500 hover:bg-warning-600">Supervisor override</Btn>
              </div>
            </>
          )}
        </div>

        {/* Right sidebar — last 10 scans */}
        <div className="border-l border-white/10 flex flex-col min-h-0">
          {/* Worker preview */}
          {grant && (
            <div className="p-4 border-b border-white/10 shrink-0">
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/55 font-extrabold mb-2.5">Worker on scan</div>
              <div className="rounded-xl bg-white/[0.06] border border-white/10 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name="Budi Santoso" size={48} tone="brand" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-extrabold">Budi Santoso</div>
                    <div className="text-[10.5px] text-white/65 mono">W-12041 · PT KNC</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
                  <div className="rounded bg-white/5 p-1.5">
                    <div className="text-white/55 uppercase tracking-wider font-bold text-[9px]">Position</div>
                    <div className="font-bold">Driver DT</div>
                  </div>
                  <div className="rounded bg-white/5 p-1.5">
                    <div className="text-white/55 uppercase tracking-wider font-bold text-[9px]">Time of entry</div>
                    <div className="font-bold mono">08:14:18</div>
                  </div>
                  <div className="rounded bg-white/5 p-1.5">
                    <div className="text-white/55 uppercase tracking-wider font-bold text-[9px]">Shift</div>
                    <div className="font-bold">Pagi · 06–14</div>
                  </div>
                  <div className="rounded bg-white/5 p-1.5">
                    <div className="text-white/55 uppercase tracking-wider font-bold text-[9px]">PTW today</div>
                    <div className="font-bold">2 active</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Last scans */}
          <div className="p-4 flex-1 min-h-0 overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="activity" size={14} className="text-safety-400" />
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-white">Last 10 scans · Gate A</div>
              <span className="ml-auto inline-flex items-center gap-1 px-1.5 h-5 rounded bg-success-500/20 text-success-500 text-[9px] font-bold mono uppercase tracking-wider">Live</span>
            </div>
            <div className="space-y-1.5">
              {[
                { t:'08:14:18', n:'Budi Santoso',  ctr:'PT KNC',  ok:true,  current:true },
                { t:'08:13:42', n:'Asep Hidayat',  ctr:'PT SMS',  ok:true },
                { t:'08:13:28', n:'Joko Pranoto',  ctr:'PT KNC',  ok:true },
                { t:'08:12:55', n:'Lina Marbun',   ctr:'PT BWS',  ok:false, reason:'MCU expired' },
                { t:'08:12:31', n:'Henny Sari',    ctr:'PT KNC',  ok:true },
                { t:'08:11:48', n:'Rina Wati',     ctr:'Bahari',  ok:true },
                { t:'08:11:18', n:'Bagas Rinaldi', ctr:'PT BWS',  ok:false, reason:'SIMPER expired' },
                { t:'08:10:42', n:'Surya Pradana', ctr:'PT SMS',  ok:true },
                { t:'08:10:18', n:'Eko Saputra',   ctr:'PT BWS',  ok:true, warn:true, reason:'Welder cert <14h' },
                { t:'08:09:55', n:'Topan Wibowo',  ctr:'PT KNC',  ok:true },
              ].map((s,i) => (
                <div key={i} className={`rounded-lg p-2 flex items-center gap-2.5 ${
                  s.current ? 'bg-success-500/15 border border-success-500/40' :
                  s.ok && !s.warn ? 'bg-white/[0.03] border border-white/5' :
                  s.warn ? 'bg-warning-500/10 border border-warning-500/30' :
                  'bg-danger-500/10 border border-danger-500/30'
                }`}>
                  <Avatar name={s.n} size={28} tone={s.ok && !s.warn ? 'success' : s.warn ? 'warning' : 'gray'} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11.5px] font-bold truncate">{s.n}</div>
                    <div className="text-[9.5px] text-white/60 truncate">{s.ctr}{s.reason && ` · ${s.reason}`}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <Icon name={s.ok && !s.warn ? 'check' : s.warn ? 'alert-triangle' : 'x'} size={14} className={s.ok && !s.warn ? 'text-success-500' : s.warn ? 'text-warning-500' : 'text-danger-500'} />
                    <div className="mono text-[9px] text-white/55 mt-0.5">{s.t.slice(0,5)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats footer */}
          <div className="p-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center shrink-0">
            <div className="rounded bg-white/5 p-2">
              <div className="text-[8.5px] text-white/55 uppercase tracking-wider font-bold">Granted</div>
              <div className="text-[16px] font-extrabold mono text-success-500">128</div>
            </div>
            <div className="rounded bg-white/5 p-2">
              <div className="text-[8.5px] text-white/55 uppercase tracking-wider font-bold">Denied</div>
              <div className="text-[16px] font-extrabold mono text-danger-500">12</div>
            </div>
            <div className="rounded bg-white/5 p-2">
              <div className="text-[8.5px] text-white/55 uppercase tracking-wider font-bold">Override</div>
              <div className="text-[16px] font-extrabold mono text-warning-500">2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.W14_GateConsole = W14_GateConsole;
