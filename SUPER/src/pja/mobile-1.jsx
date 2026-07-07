// PJA — Mobile worker screens J1-J5.

// ============================================================
// J1 — PJA Home
// ============================================================
function J1_Home() {
  const [tab, setTab] = React.useState('today');
  const stats = {
    total: SAMPLE_PJA.length,
    done: SAMPLE_PJA.filter(p => p.stat==='done').length,
    progress: SAMPLE_PJA.filter(p => p.stat==='in_progress').length,
    pending: SAMPLE_PJA.filter(p => p.stat==='assigned').length,
    blocked: SAMPLE_PJA.filter(p => p.stat==='blocked').length,
  };
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1">
            <div className="text-[15px] font-bold tracking-tight">Tugas saya hari ini</div>
            <div className="text-[11px] text-subtle">Selasa, 19 Mei · Shift Pagi 06–14</div>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center relative">
            <Icon name="bell" size={20} className="text-subtle" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-danger-500" />
          </button>
        </div>

        {/* Stats strip */}
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {[
            { l:'Done',     v:stats.done,     tone:'success' },
            { l:'Progress', v:stats.progress, tone:'warning' },
            { l:'Pending',  v:stats.pending,  tone:'info' },
            { l:'Blocked',  v:stats.blocked,  tone:'danger' },
          ].map(s => (
            <div key={s.l} className={`rounded-lg p-2 border bg-${s.tone}-50 border-${s.tone}-500/25 text-center`}>
              <div className={`text-[18px] font-extrabold mono leading-none text-${s.tone}-700`}>{s.v}</div>
              <div className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 text-${s.tone}-700/80`}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-2.5 flex items-center gap-1 border-b border-transparent">
          {[
            { id:'today',    l:'Hari ini',  n:stats.total },
            { id:'upcoming', l:'Mendatang', n:5 },
            { id:'history',  l:'Riwayat',    n:48 },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`relative pb-2 px-2 text-[13px] font-bold inline-flex items-center gap-1.5 ${tab===t.id?'text-brand-700':'text-muted'}`}>
              {t.l} <span className={`px-1.5 h-4 rounded-full text-[9px] font-bold ${tab===t.id?'bg-brand-50 text-brand-700':'bg-elev text-muted'}`}>{t.n}</span>
              {tab===t.id && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-brand-500 rounded" />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 pb-32 space-y-2.5">
        {SAMPLE_PJA.map(p => {
          const stat = PJA_STATUS[p.stat];
          const prio = PRIORITY[p.prio];
          const cat = CATEGORY[p.cat];
          return (
            <div key={p.id} className={`rounded-2xl bg-white border p-4 ${p.stat==='in_progress'?'border-warning-500/40 ring-1 ring-warning-500/20':p.stat==='blocked'?'border-danger-500/30':'border-token'}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle mono">{p.id}</div>
                <StatusBadge status={p.stat} />
              </div>
              <div className="text-[14px] font-extrabold leading-tight" style={{ textWrap:'balance' }}>{p.t}</div>
              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                <PriorityBadge priority={p.prio} size="sm" />
                <StatusPill tone={cat.tone} size="sm" icon={cat.icon}>{cat.label}</StatusPill>
                {p.ptw && <StatusPill tone="danger" size="sm" icon="clipboard-list">{p.ptw}</StatusPill>}
              </div>
              <div className="mt-3 space-y-1 text-[12px]">
                <div className="flex items-center gap-1.5"><Icon name="map-pin" size={13} className="text-subtle" /><span className="font-semibold flex-1 truncate">{p.loc}</span><span className="text-muted mono">{p.dist}</span></div>
                <div className="flex items-center gap-1.5"><Icon name="clock" size={13} className="text-subtle" /><span className={`font-semibold ${p.prio==='high'?'text-danger-700':'text-muted'}`}>Deadline {p.due}</span></div>
              </div>

              {p.block && (
                <div className="mt-2.5 rounded-lg bg-danger-50 border border-danger-500/25 p-2.5 text-[11px] text-danger-700 flex items-start gap-2">
                  <Icon name="alert-octagon" size={13} className="mt-0.5 shrink-0" />
                  <span><span className="font-extrabold">Blocker:</span> {p.block}</span>
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <button className="flex-1 h-10 rounded-xl border border-token bg-white text-brand-700 text-[12px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="info" size={13} /> Detail</button>
                {p.stat === 'in_progress' && <Btn variant="warning" size="sm" icon="play-circle" className="flex-1 bg-warning-500 hover:bg-warning-600 text-white">Lanjut</Btn>}
                {p.stat === 'assigned'   && <Btn variant="primary" size="sm" icon="play" className="flex-1">Mulai</Btn>}
                {p.stat === 'done'       && <Btn variant="success" size="sm" icon="check-circle-2" className="flex-1">Selesai</Btn>}
                {p.stat === 'blocked'    && <Btn variant="danger"  size="sm" icon="refresh-cw" className="flex-1">Re-check</Btn>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <button className="h-14 px-5 rounded-full bg-danger-500 hover:bg-danger-600 text-white font-extrabold text-[14px] inline-flex items-center gap-2 shadow-lg">
          <Icon name="flag" size={18} /> Lapor masalah
        </button>
      </div>
    </div>
  );
}

// ============================================================
// J2 — PJA Detail
// ============================================================
function J2_Detail() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-subtle mono">PJA-2026-08412</div>
            <div className="text-[14px] font-extrabold tracking-tight truncate">Inspeksi rutin conveyor C-04</div>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="more-vertical" size={20} className="text-subtle" /></button>
        </div>
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          <StatusBadge status="assigned" />
          <PriorityBadge priority="high" size="sm" />
          <StatusPill tone="warning" size="sm" icon="search">Inspection</StatusPill>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Map preview */}
        <div className="relative h-44 mx-4 mt-3 rounded-2xl overflow-hidden" style={{ background:'linear-gradient(135deg, #CFDDEC 0%, #9EBCDA 100%)' }}>
          <svg viewBox="0 0 360 180" className="absolute inset-0 w-full h-full">
            <path d="M0 100 Q90 80 180 110 T360 90" stroke="#1F4E79" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.4" />
            <rect x="60" y="40"  width="60" height="40" rx="3" fill="#1F4E79" opacity="0.18" />
            <rect x="240" y="70" width="80" height="50" rx="3" fill="#1F4E79" opacity="0.18" />
            <text x="64"  y="60" fontSize="9" fill="#143452" fontWeight="700">WORKSHOP BAHANA</text>
            <text x="244" y="92" fontSize="9" fill="#143452" fontWeight="700">PIT BAHANA</text>
          </svg>
          {/* Target pin */}
          <div className="absolute" style={{ left:'30%', top:'45%', transform:'translate(-50%,-100%)' }}>
            <div className="w-9 h-9 rounded-full bg-danger-500 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
              <Icon name="map-pin" size={16} />
            </div>
          </div>
          <div className="absolute top-3 left-3 px-2 h-6 rounded bg-white/90 backdrop-blur text-[10px] font-bold inline-flex items-center gap-1.5">
            <Icon name="navigation" size={11} className="text-brand-500" />
            120m dari posisi Anda
          </div>
          <div className="absolute bottom-3 right-3">
            <Btn variant="dark" size="sm" icon="map">Buka peta</Btn>
          </div>
        </div>

        {/* Info */}
        <div className="px-4 mt-3 space-y-3">
          <div className="surface rounded-2xl p-4">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Detail pekerjaan</div>
            <div className="text-[13px] leading-relaxed mb-3">
              Inspeksi visual rutin conveyor batubara C-04 di Workshop Bahana Sec B. Cek belt alignment, idler condition, scrapper kondisi, dan tightness baut sambungan. Catat temuan via foto + checklist SOP.
            </div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[11.5px]">
              <div className="flex items-center gap-1.5"><Icon name="map-pin" size={12} className="text-subtle" /><span className="text-muted">Lokasi</span></div>
              <div className="font-bold text-right">Workshop · Sec B</div>
              <div className="flex items-center gap-1.5"><Icon name="navigation" size={12} className="text-subtle" /><span className="text-muted">Koordinat</span></div>
              <div className="font-bold mono text-right text-[10.5px]">-1.234, 116.789</div>
              <div className="flex items-center gap-1.5"><Icon name="hourglass" size={12} className="text-subtle" /><span className="text-muted">Estimasi</span></div>
              <div className="font-bold text-right">2 jam</div>
              <div className="flex items-center gap-1.5"><Icon name="clock" size={12} className="text-subtle" /><span className="text-muted">Deadline</span></div>
              <div className="font-bold text-right text-danger-700">Hari ini · 16:00</div>
              <div className="flex items-center gap-1.5"><Icon name="user-check" size={12} className="text-subtle" /><span className="text-muted">SPV</span></div>
              <div className="font-bold text-right">Pak Hadi Wijaya</div>
            </div>
          </div>

          {/* PTW link (cross-module) */}
          <XModule icon="clipboard-list" label="Linked PTW · safety-critical">
            <div className="font-bold mono">PTW-2026-00125 · Work at Height</div>
            <div className="mt-1 flex items-center gap-1.5">
              <StatusPill tone="success" size="sm" icon="check-circle-2">ACTIVE</StatusPill>
              <span>· Mulai bekerja diperbolehkan.</span>
            </div>
          </XModule>

          {/* Tools */}
          <div className="surface rounded-2xl p-4">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Tools &amp; equipment</div>
            <div className="grid grid-cols-2 gap-2 text-[11.5px]">
              {[
                { ic:'flashlight', l:'Senter LED' },
                { ic:'ruler',      l:'Caliper digital' },
                { ic:'camera',     l:'Kamera ATEX (optional)' },
                { ic:'wrench',     l:'Kunci pas set' },
              ].map(t => (
                <div key={t.l} className="flex items-center gap-2 rounded-lg bg-elev p-2">
                  <Icon name={t.ic} size={14} className="text-brand-500" />
                  <span className="font-semibold flex-1">{t.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SOP */}
          <div className="surface rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">SOP reference</div>
              <button className="text-[11px] font-bold text-brand-700 inline-flex items-center gap-1"><Icon name="external-link" size={11} /> Buka full</button>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-info-50 border border-info-500/20">
              <Icon name="file-text" size={16} className="text-info-600" />
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-bold truncate">SOP-CONV-INSP-007 v2.1</div>
                <div className="text-[10.5px] text-muted">5 step · 12 checklist items · PDF 480 KB</div>
              </div>
              <Icon name="chevron-right" size={14} className="text-subtle" />
            </div>
          </div>

          {/* Hazard */}
          <div className="surface rounded-2xl p-4 border-l-4 border-danger-500">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-danger-700 mb-2 flex items-center gap-1.5">
              <Icon name="alert-triangle" size={13} /> Hazard awareness
            </div>
            <div className="space-y-1.5 text-[12px]">
              {['Conveyor running parts — pastikan LOTO sebelum touch','Jatuh dari ketinggian (>2m) — wajib body harness','Debu batubara — masker P2 + safety glass'].map((h,i) => (
                <div key={i} className="flex items-start gap-2"><Icon name="dot" size={14} className="text-danger-500 mt-0.5" /><span>{h}</span></div>
              ))}
            </div>
            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-muted">APD wajib</div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {['Helm','Safety shoes','Safety glass','Body harness','Masker P2','Sarung tangan'].map(a => (
                <span key={a} className="px-1.5 h-5 rounded bg-success-50 text-success-700 border border-success-500/20 text-[10px] font-bold inline-flex items-center gap-1"><Icon name="check" size={9} strokeWidth={3} /> {a}</span>
              ))}
            </div>
          </div>

          {/* Co-workers */}
          <div className="surface rounded-2xl p-4">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Worker assigned · 2 orang</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Avatar name="Budi Santoso" size={36} tone="brand" />
                <div className="flex-1">
                  <div className="text-[12.5px] font-bold flex items-center gap-1.5">Budi Santoso <StatusPill tone="info" size="sm">Anda</StatusPill></div>
                  <div className="text-[10.5px] text-muted">Lead worker · NSR-009281</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Avatar name="Anton Wijaya" size={36} tone="success" />
                <div className="flex-1">
                  <div className="text-[12.5px] font-bold">Anton Wijaya</div>
                  <div className="text-[10.5px] text-muted">Co-worker · NSR-005412</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3 flex gap-2">
        <button className="h-12 px-3 rounded-xl border border-token-strong bg-white text-muted text-[12px] font-bold inline-flex items-center gap-1.5"><Icon name="flag" size={14} /> Tolak</button>
        <Btn variant="primary" full icon="play" iconRight="navigation">Mulai · cek geo-fence</Btn>
      </div>
    </div>
  );
}

// ============================================================
// J3 — Check-In Geofence
// ============================================================
function J3_CheckIn({ inside=false }) {
  return (
    <div className="flex-1 flex flex-col relative bg-elev">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3 shrink-0 z-10">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
        <div className="flex-1">
          <div className="text-[15px] font-bold tracking-tight">Check-in geo-fence</div>
          <div className="text-[11px] text-subtle">PJA-2026-08412 · Conveyor C-04</div>
        </div>
      </div>

      {/* Map */}
      <div className="relative flex-1" style={{ background:'linear-gradient(180deg, #EAF1F8 0%, #CFDDEC 100%)' }}>
        <svg viewBox="0 0 390 600" className="absolute inset-0 w-full h-full">
          {/* roads */}
          <path d="M0,300 Q120,260 200,290 T390,280" stroke="#9EBCDA" strokeWidth="2" fill="none" strokeDasharray="6 6" opacity="0.5" />
          <path d="M0,400 Q140,380 220,410 T390,390" stroke="#9EBCDA" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.4" />
          {/* buildings */}
          <rect x="60" y="180" width="120" height="80" rx="4" fill="#1F4E79" opacity="0.15" />
          <rect x="220" y="320" width="120" height="90" rx="4" fill="#1F4E79" opacity="0.15" />
          <text x="80"  y="220" fontSize="11" fill="#143452" fontWeight="700">WORKSHOP A</text>
          <text x="234" y="370" fontSize="11" fill="#143452" fontWeight="700">WORKSHOP B</text>
        </svg>

        {/* Target with geo-fence circle */}
        <div className="absolute" style={{ left:'66%', top:'62%', transform:'translate(-50%,-50%)' }}>
          {/* geo-fence */}
          <div className="absolute" style={{ left:'50%', top:'50%', transform:'translate(-50%,-50%)' }}>
            <div className="w-44 h-44 rounded-full bg-brand-500/15 border-2 border-brand-500/40 gf-pulse" />
          </div>
          {/* target pin */}
          <div className="relative w-11 h-11 rounded-full bg-danger-500 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
            <Icon name="map-pin" size={20} />
          </div>
          <div className="mt-1 text-center text-[10px] mono font-bold bg-white/90 px-1.5 py-0.5 rounded">Target</div>
        </div>

        {/* Worker position */}
        <div className="absolute" style={{ left: inside?'62%':'42%', top: inside?'60%':'45%', transform:'translate(-50%,-50%)' }}>
          <div className="w-9 h-9 rounded-full bg-success-500 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
            <Icon name="user" size={16} />
          </div>
          <div className="absolute inset-0 -m-1 rounded-full bg-success-500/30 pulse-dot" />
          <div className="mt-1 text-center text-[10px] mono font-bold bg-white/90 px-1.5 py-0.5 rounded">Anda</div>
        </div>

        {/* Distance line */}
        <svg viewBox="0 0 390 600" className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1={inside?'242':'164'} y1={inside?'360':'270'} x2="258" y2="372"
                stroke={inside?'#1D9E75':'#EF9F27'} strokeWidth="2" strokeDasharray="5 3" />
        </svg>

        {/* Top status banner */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className={`rounded-xl p-3.5 flex items-center gap-3 shadow-lg ${inside?'bg-success-500 text-white':'bg-warning-500 text-white'}`}>
            <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Icon name={inside?'check-circle-2':'alert-triangle'} size={22} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] font-extrabold opacity-90">{inside?'Dalam area':'Di luar area'}</div>
              <div className="text-[15px] font-extrabold leading-tight">{inside?'Siap check-in':'Jalan menuju lokasi'}</div>
            </div>
            <div className="text-right">
              <div className="text-[24px] font-extrabold mono leading-none">{inside?'12m':'88m'}</div>
              <div className="text-[10px] opacity-90 mt-0.5">{inside?'dalam 50m':'menuju target'}</div>
            </div>
          </div>
        </div>

        {/* GPS info */}
        <div className="absolute bottom-32 left-4 right-4 z-10">
          <div className="bg-white/95 backdrop-blur rounded-xl p-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Akurasi GPS</div>
              <div className="text-[14px] font-extrabold mono">±4m</div>
            </div>
            <div className="border-x border-token">
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Geo-fence</div>
              <div className="text-[14px] font-extrabold mono">50m</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Update</div>
              <div className="text-[14px] font-extrabold mono">live</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="bg-white border-t border-token p-3 space-y-2 shrink-0">
        <Btn variant={inside?'success':'primary'} size="lg" full icon={inside?'check-circle-2':'navigation'} disabled={!inside}>
          {inside ? 'Check-in & mulai bekerja' : 'Tunggu Anda dalam radius'}
        </Btn>
        <button className="w-full h-9 text-[11.5px] font-bold text-warning-700 hover:underline inline-flex items-center justify-center gap-1.5">
          <Icon name="alert-triangle" size={13} /> Manual override · butuh alasan + audit log
        </button>
      </div>
    </div>
  );
}

// ============================================================
// J4 — Eksekusi (active state)
// ============================================================
function J4_Execute() {
  const steps = [
    { l:'Persiapan APD lengkap',                   done:true, photo:true,  t:'09:42' },
    { l:'Inspeksi area pra-kerja · LOTO conveyor', done:true, photo:true,  t:'09:48' },
    { l:'Eksekusi pekerjaan inspeksi belt',         done:false, current:true, photo:false, t:'-' },
    { l:'Cek tightness baut sambungan',             done:false, photo:false },
    { l:'Pembersihan area + dokumentasi akhir',     done:false, photo:false },
  ];
  return (
    <div className="flex-1 flex flex-col bg-elev">
      {/* Sticky header with timer */}
      <div className="bg-warning-500 text-white px-5 pt-1 pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-wider opacity-85 font-bold mono">PJA-2026-08412 · in progress</div>
            <div className="text-[14px] font-extrabold tracking-tight truncate">Inspeksi rutin conveyor C-04</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] opacity-80 font-bold uppercase tracking-wider">Timer</div>
            <div className="text-[20px] font-extrabold mono leading-none tabular-nums">01:08<span className="timer-tick">:</span><span className="opacity-80">23</span></div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 h-9 rounded-lg bg-white/15 hover:bg-white/25 text-[11.5px] font-extrabold inline-flex items-center justify-center gap-1.5"><Icon name="pause" size={13} /> Pause</button>
          <button className="flex-1 h-9 rounded-lg bg-white/15 hover:bg-white/25 text-[11.5px] font-extrabold inline-flex items-center justify-center gap-1.5"><Icon name="alert-octagon" size={13} /> Ada masalah</button>
          <button className="flex-1 h-9 rounded-lg bg-white text-warning-700 text-[11.5px] font-extrabold inline-flex items-center justify-center gap-1.5"><Icon name="alert-triangle" size={13} /> Hazard obs</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 pb-28">
        {/* SOP checklist */}
        <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">SOP checklist · 2/5 selesai</div>
        <div className="surface rounded-2xl divide-y divide-[color:var(--border)] overflow-hidden">
          {steps.map((s,i) => (
            <div key={i} className={`p-3 ${s.current?'bg-warning-50/60':''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${s.done?'bg-success-500 text-white':s.current?'bg-warning-500 text-white':'bg-elev border border-token-strong'}`}>
                  {s.done && <Icon name="check" size={14} strokeWidth={3} />}
                  {s.current && <span className="text-[11px] font-extrabold mono">{i+1}</span>}
                  {!s.done && !s.current && <span className="text-[11px] font-bold text-subtle mono">{i+1}</span>}
                </div>
                <div className="flex-1">
                  <div className={`text-[13px] font-bold ${s.done?'line-through text-muted':''}`}>{s.l}</div>
                  {s.done && <div className="text-[10.5px] text-success-700 font-bold mt-0.5 mono">Selesai {s.t}</div>}
                </div>
                {s.photo && <Icon name="image" size={14} className="text-success-500 mt-0.5" />}
              </div>
              {s.current && (
                <div className="mt-2.5 ml-10 flex items-center gap-2">
                  <button className="flex-1 h-9 rounded-lg border border-warning-500 bg-warning-50 text-warning-700 text-[11px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="camera" size={13} /> Attach foto</button>
                  <Btn variant="success" size="sm" icon="check" className="flex-1">Tandai selesai</Btn>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-1.5">Catatan</div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="3" defaultValue="Belt alignment masih dalam toleransi. Idler ke-3 ada vibration kecil — sudah ditandai untuk follow-up."
              className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>

        {/* Photo evidence */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">Photo evidence · 4 foto</div>
            <span className="text-[10px] text-subtle">EXIF + GPS verified</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { ic:'image', tone:'success', label:'Pra-kerja' },
              { ic:'image', tone:'success', label:'LOTO ok' },
              { ic:'image', tone:'info',    label:'Inspeksi' },
              { ic:'plus',  tone:'gray' },
            ].map((p,i) => (
              <button key={i} className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-1 ${p.ic==='plus'?'border-2 border-dashed border-token-strong text-subtle':`bg-${p.tone}-50 text-${p.tone}-700 border border-${p.tone}-500/25`}`}>
                <Icon name={p.ic} size={20} />
                {p.label && <span className="text-[9px] font-bold">{p.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Cross-module */}
        <div className="mt-4 space-y-2">
          <XModule icon="clock" label="Timesheet · auto-log">
            <span>Waktu kerja otomatis tercatat ke modul Timesheet · sudah 1j 08m.</span>
          </XModule>
          <XModule icon="shield-check" label="PTW status · ACTIVE">
            <span>PTW-2026-00125 valid sampai 14:30 — pastikan close-out sebelum jam itu.</span>
          </XModule>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <Btn variant="success" size="lg" full icon="check-circle-2" disabled={true}>
          Selesai · tunggu 3 step selesai
        </Btn>
      </div>
    </div>
  );
}

// ============================================================
// J5 — Photo Evidence Capture
// ============================================================
function J5_PhotoCapture() {
  return (
    <div className="flex-1 flex flex-col relative" style={{ background:'#0a0d12' }}>
      {/* Camera viewfinder mock */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background:'radial-gradient(circle at 50% 45%, #1a2333 0%, #0a0d12 80%)' }} />
        <svg viewBox="0 0 390 700" className="absolute inset-0 w-full h-full opacity-25">
          <rect x="40" y="180" width="310" height="280" rx="6" fill="none" stroke="#9EBCDA" strokeWidth="1" strokeDasharray="4 6" />
          <path d="M0,520 L120,470 L200,490 L280,460 L390,500 L390,700 L0,700 Z" fill="#1a2333" />
          <text x="195" y="320" textAnchor="middle" fill="#4179AE" fontSize="64" fontWeight="800" opacity="0.18" fontFamily="Inter">CONVEYOR</text>
        </svg>
        {/* Composition grid */}
        <svg viewBox="0 0 390 700" className="absolute inset-0 w-full h-full opacity-25 pointer-events-none">
          <line x1="130" y1="100" x2="130" y2="600" stroke="#fff" strokeWidth="1" />
          <line x1="260" y1="100" x2="260" y2="600" stroke="#fff" strokeWidth="1" />
          <line x1="40"  y1="266" x2="350" y2="266" stroke="#fff" strokeWidth="1" />
          <line x1="40"  y1="433" x2="350" y2="433" stroke="#fff" strokeWidth="1" />
        </svg>
      </div>

      {/* Top bar */}
      <div className="relative z-10 px-5 pt-1 flex items-center justify-between text-white">
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center"><Icon name="x" size={20} /></button>
        <div className="text-[13px] font-bold">Foto Step 3 · Inspeksi belt</div>
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center"><Icon name="rotate-cw" size={18} /></button>
      </div>

      {/* Center frame guide */}
      <div className="relative z-10 flex-1 flex items-center justify-center pb-40">
        <div className="text-center text-white">
          <div className="text-[12px] font-bold opacity-90 mb-1.5">Posisi conveyor dalam frame</div>
          <div className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-black/50 backdrop-blur text-[11.5px] font-bold">
            <Icon name="navigation" size={13} className="text-success-500" />
            GPS lock · ±4m · timestamp aktif
          </div>
        </div>
      </div>

      {/* Bottom: shutter + thumbnails */}
      <div className="relative z-10 px-4 pb-6 flex flex-col gap-3">
        {/* GPS + timestamp overlay (will be burned into photo) */}
        <div className="rounded-lg bg-black/60 backdrop-blur p-2 mx-auto max-w-fit">
          <div className="grid grid-cols-3 gap-3 text-white text-center">
            <div>
              <div className="text-[9px] opacity-70 uppercase tracking-wider font-bold">Lat</div>
              <div className="text-[11px] font-extrabold mono">-1.2340</div>
            </div>
            <div className="border-x border-white/20 px-3">
              <div className="text-[9px] opacity-70 uppercase tracking-wider font-bold">Long</div>
              <div className="text-[11px] font-extrabold mono">116.7890</div>
            </div>
            <div>
              <div className="text-[9px] opacity-70 uppercase tracking-wider font-bold">Time</div>
              <div className="text-[11px] font-extrabold mono">10:50:18</div>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[1,2].map(n => (
              <div key={n} className="w-12 h-12 rounded-lg bg-success-500/30 border border-success-500/50 flex items-center justify-center text-white">
                <Icon name="image" size={18} />
              </div>
            ))}
            <span className="ml-1 text-[10px] text-white/70 font-bold mono">2 photos · step 1-2 ✓</span>
          </div>
          <div className="text-[10px] text-white/70 font-bold">Min: before + after</div>
        </div>

        {/* Shutter */}
        <div className="flex items-center justify-center gap-8 pt-2">
          <button className="w-10 h-10 rounded-full bg-white/15 backdrop-blur text-white flex items-center justify-center"><Icon name="zap-off" size={20} /></button>
          <button className="w-20 h-20 rounded-full bg-white text-brand-700 ring-4 ring-white/30 shadow-2xl flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white border-4 border-brand-500" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/15 backdrop-blur text-white flex items-center justify-center"><Icon name="image-plus" size={20} /></button>
        </div>

        {/* Reject hint */}
        <div className="text-center text-[10px] text-white/55">
          Foto akan ditolak jika: blur, tidak ada GPS, atau lebih lama dari 30 detik
        </div>
      </div>
    </div>
  );
}

window.J1_Home         = J1_Home;
window.J2_Detail       = J2_Detail;
window.J3_CheckIn      = J3_CheckIn;
window.J4_Execute      = J4_Execute;
window.J5_PhotoCapture = J5_PhotoCapture;
