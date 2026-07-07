// PJA — Web screens W1-W5 (SPV admin).

// ============================================================
// W1 — SPV Dashboard
// ============================================================
function W1_SPVDashboard() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="pja" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Tim saya hari ini — Shift Pagi 06–14" sub="Ops · SPV portal" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
              <KPICard icon="users"          label="Worker shift" value="24" tone="brand"   sub="22 active · 2 leave" />
              <KPICard icon="inbox"          label="PJA assigned" value="18" tone="info"    sub="Mei rata-rata 16" />
              <KPICard icon="play-circle"    label="In progress"  value="5"  tone="warning" />
              <KPICard icon="check-circle-2" label="Done"          value="8"  tone="success" sub="44% rate" delta="+6%" />
              <KPICard icon="alert-octagon"   label="Blocked"       value="2"  tone="danger"  sub="1 equip · 1 PTW" />
              <KPICard icon="hourglass"       label="Overdue risk"  value="3"  tone="danger"  sub="<2 jam ke deadline" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
              {/* Map */}
              <div className="surface rounded-xl overflow-hidden">
                <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                  <Icon name="map" size={16} className="text-brand-500" />
                  <div className="text-[13px] font-bold tracking-tight">Worker positions · privacy aware</div>
                  <span className="ml-auto inline-flex items-center gap-1 px-1.5 h-5 rounded bg-success-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Live
                  </span>
                </div>
                <div className="relative h-[420px]" style={{ background:'linear-gradient(180deg, #EAF1F8 0%, #FEF4E5 100%)' }}>
                  <svg viewBox="0 0 1000 420" className="absolute inset-0 w-full h-full">
                    <path d="M0,180 Q200,160 400,180 T800,170 T1000,200" stroke="#9EBCDA" strokeWidth="1.2" fill="none" strokeDasharray="6 6" opacity="0.5" />
                    <path d="M0,280 Q220,250 440,280 T820,260 T1000,290" stroke="#9EBCDA" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.4" />
                    <rect x="120" y="180" width="160" height="100" rx="3" fill="#1F4E79" opacity="0.15" />
                    <rect x="420" y="240" width="200" height="100" rx="3" fill="#1F4E79" opacity="0.15" />
                    <rect x="720" y="170" width="180" height="100" rx="3" fill="#1F4E79" opacity="0.15" />
                    <text x="155" y="235" fontSize="11" fill="#143452" fontWeight="700">PIT BAHANA</text>
                    <text x="455" y="295" fontSize="11" fill="#143452" fontWeight="700">COAL PAD AGRA</text>
                    <text x="755" y="225" fontSize="11" fill="#143452" fontWeight="700">WORKSHOP</text>
                  </svg>
                  {[
                    { x:'18%', y:'52%', n:'Budi', tone:'warning', stat:'In prog' },
                    { x:'24%', y:'60%', n:'Anton', tone:'warning', stat:'In prog' },
                    { x:'50%', y:'68%', n:'Asep', tone:'success', stat:'Done' },
                    { x:'56%', y:'64%', n:'Rina', tone:'success', stat:'Done' },
                    { x:'80%', y:'45%', n:'Eko',  tone:'danger',  stat:'Blocked' },
                    { x:'82%', y:'55%', n:'Cipto', tone:'info',   stat:'Assigned' },
                    { x:'30%', y:'30%', n:'Joko',  tone:'success',stat:'Done' },
                    { x:'66%', y:'30%', n:'Bagas', tone:'warning',stat:'In prog' },
                  ].map((p,i) => (
                    <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left:p.x, top:p.y }}>
                      <Avatar name={p.n} size={32} tone={p.tone==='danger'?'danger':p.tone==='warning'?'warning':p.tone==='success'?'success':'info'} />
                      <div className="mt-1 px-1.5 py-0.5 rounded bg-white/95 backdrop-blur text-[9px] font-bold whitespace-nowrap text-center mono shadow-sm">
                        {p.n}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worker list */}
              <div className="surface rounded-xl overflow-hidden flex flex-col">
                <div className="px-4 h-11 border-b border-token flex items-center gap-2">
                  <Icon name="users" size={15} className="text-brand-500" />
                  <div className="text-[12px] font-bold uppercase tracking-wider">Tim · 8 worker</div>
                  <div className="flex-1" />
                  <Btn variant="primary" size="sm" icon="plus">Assign PJA</Btn>
                </div>
                <div className="overflow-y-auto p-2 space-y-1.5 max-h-[420px]">
                  {[
                    { n:'Budi Santoso',  task:'Inspeksi conveyor C-04', stat:'in_progress', dur:'1j 08m' },
                    { n:'Anton Wijaya',  task:'Inspeksi conveyor C-04 (co)', stat:'in_progress', dur:'1j 08m' },
                    { n:'Asep Hidayat',  task:'Housekeeping ruang kontrol', stat:'done', dur:'52m' },
                    { n:'Rina Wati',     task:'Inventory bahan baku',  stat:'done', dur:'1j 15m' },
                    { n:'Eko Saputra',   task:'Install rambu Workshop A',stat:'blocked', dur:'-' },
                    { n:'Cipto Hartono', task:'Cek kebocoran hydrant',  stat:'assigned', dur:'-' },
                    { n:'Joko Pranoto',  task:'Inspeksi tank BBM A',    stat:'done', dur:'1j 32m' },
                    { n:'Bagas R.',       task:'Service AC kantor',      stat:'in_progress', dur:'42m' },
                  ].map((r,i) => (
                    <div key={i} className="rounded-lg border border-token bg-white p-2.5 flex items-center gap-2.5">
                      <Avatar name={r.n} size={32} tone={r.stat==='done'?'success':r.stat==='blocked'?'gray':r.stat==='in_progress'?'warning':'info'} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11.5px] font-extrabold">{r.n}</div>
                        <div className="text-[10px] text-muted truncate">{r.task}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <StatusBadge status={r.stat} size="sm" />
                        <div className="text-[10px] text-subtle mono mt-0.5">{r.dur}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Today PJA table */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                <Icon name="clipboard-check" size={16} className="text-brand-500" />
                <div className="text-[13px] font-bold tracking-tight">PJA hari ini · 18</div>
                <div className="flex-1" />
                <FilterChip icon="filter">All status</FilterChip>
              </div>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                    <th className="px-5 py-2.5">PJA</th>
                    <th className="px-3 py-2.5">Worker</th>
                    <th className="px-3 py-2.5">Lokasi</th>
                    <th className="px-3 py-2.5">Priority</th>
                    <th className="px-3 py-2.5">Deadline</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="px-3 py-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {SAMPLE_PJA.map(p => (
                    <tr key={p.id} className="hover:bg-elev cursor-pointer">
                      <td className="px-5 py-2.5">
                        <div className="text-[11px] mono text-subtle">{p.id}</div>
                        <div className="font-extrabold">{p.t}</div>
                      </td>
                      <td className="px-3 py-2.5"><div className="flex items-center gap-2"><Avatar name="Budi S." size={26} tone="brand" /><span className="font-semibold">Budi S. +1</span></div></td>
                      <td className="px-3 py-2.5 text-muted">{p.loc}</td>
                      <td className="px-3 py-2.5"><PriorityBadge priority={p.prio} size="sm" /></td>
                      <td className="px-3 py-2.5 mono text-muted">{p.due}</td>
                      <td className="px-3 py-2.5"><StatusBadge status={p.stat} size="sm" /></td>
                      <td className="px-3 py-2.5"><Icon name="chevron-right" size={14} className="text-subtle" /></td>
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
// W2 — Create PJA (SPV)
// ============================================================
function W2_CreatePJA() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="pja" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Assign PJA baru" sub="Ops · SPV portal" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
            {/* Left: form */}
            <div className="surface rounded-xl p-6 space-y-5">
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Detail pekerjaan</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Title</div>
                    <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2">
                      <Icon name="type" size={16} className="text-subtle" />
                      <div className="flex-1 text-[14px] font-bold">Cek kebocoran pipa hydrant H-04</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Deskripsi</div>
                    <div className="rounded-xl border border-token-strong bg-white p-3">
                      <textarea rows="2" defaultValue="Inspeksi visual hydrant H-04 di area Coal Pad — laporan worker shift malam terlihat tetesan air di sekitar manifold. Cek titik kebocoran, sambungan, dan tekanan."
                        className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Category</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="search" size={16} className="text-warning-600" /><span className="text-[13px] font-bold flex-1">Inspection</span><Icon name="chevron-down" size={13} className="text-subtle" /></div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Priority</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="alert-triangle" size={16} className="text-danger-600" /><span className="text-[13px] font-bold flex-1">High</span><Icon name="chevron-down" size={13} className="text-subtle" /></div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Lokasi</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="map-pin" size={16} className="text-subtle" /><span className="text-[13px] font-bold flex-1">Coal Pad Agra · Sec 3</span></div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Estimasi durasi</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="hourglass" size={16} className="text-subtle" /><span className="text-[13px] font-bold flex-1">1 jam 30 menit</span></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Deadline</div>
                    <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="calendar" size={16} className="text-subtle" /><span className="text-[13px] font-bold flex-1 mono">19 Mei 2026 · 17:00</span></div>
                  </div>
                </div>
              </div>

              <div className="border-t border-token pt-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Equipment &amp; safety</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Equipment needed</div>
                    <div className="flex items-center flex-wrap gap-1.5">
                      {['Senter LED','Kunci pas','Tester tekanan','Kamera'].map(e => (
                        <span key={e} className="inline-flex items-center gap-1 px-2 h-7 rounded-md border border-brand-200 bg-brand-50 text-brand-700 text-[11px] font-semibold">{e} <Icon name="x" size={11} /></span>
                      ))}
                      <button className="inline-flex items-center gap-1 px-2 h-7 rounded-md border border-dashed border-token-strong text-muted text-[11px] font-semibold"><Icon name="plus" size={11} /> Add</button>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">SOP reference</div>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-info-50 border border-info-500/20">
                      <Icon name="file-text" size={15} className="text-info-600" />
                      <div className="flex-1 text-[12px] font-bold">SOP-HYDRANT-INSP-004 v1.3</div>
                      <Icon name="external-link" size={13} className="text-info-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Hazard awareness</div>
                    <div className="flex flex-wrap gap-1">
                      {['Air bertekanan','Permukaan licin','Bahan kimia'].map(h => (
                        <span key={h} className="inline-flex items-center gap-1 px-1.5 h-5 rounded bg-danger-50 text-danger-700 border border-danger-500/20 text-[10px] font-bold"><Icon name="alert-triangle" size={10} /> {h}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">APD wajib</div>
                    <div className="flex flex-wrap gap-1">
                      {['Helm','Safety shoes','Sarung tangan karet','Safety glass'].map(a => (
                        <span key={a} className="inline-flex items-center gap-1 px-1.5 h-5 rounded bg-success-50 text-success-700 border border-success-500/20 text-[10px] font-bold"><Icon name="check" size={9} strokeWidth={3} /> {a}</span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-elev p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-danger-500 text-white flex items-center justify-center"><Icon name="clipboard-list" size={16} /></div>
                    <div className="flex-1">
                      <div className="text-[12px] font-bold">PTW required?</div>
                      <div className="text-[10.5px] text-muted">High-risk · sistem cross-check PTW aktif sebelum worker mulai</div>
                    </div>
                    <div className="w-11 h-6 rounded-full bg-success-500 p-0.5">
                      <div className="w-5 h-5 rounded-full bg-white shadow translate-x-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Worker pool */}
              <div className="border-t border-token pt-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Assign worker</div>
                  <div className="flex items-center gap-1.5">
                    <FilterChip icon="users">Shift pagi (24)</FilterChip>
                    <FilterChip icon="shield-check">Cert match</FilterChip>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { n:'Cipto Hartono', role:'Inspector', cert:true,  busy:false, sel:true,  match:'95%' },
                    { n:'Henny Sari',    role:'Maintenance',cert:true, busy:false, match:'88%' },
                    { n:'Eko Saputra',   role:'Welder',     cert:true, busy:true,  match:'52%' },
                    { n:'Surya Pradana', role:'Operator',   cert:false,busy:false, match:'30%' },
                  ].map(w => (
                    <button key={w.n} className={`text-left rounded-xl border p-3 flex items-center gap-2.5 ${w.sel?'bg-brand-50 border-brand-300':w.busy?'opacity-60 bg-white border-token':'bg-white border-token'}`}>
                      <Avatar name={w.n} size={36} tone={w.cert?'brand':'gray'} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-extrabold flex items-center gap-1.5">{w.n}{w.sel && <Icon name="check-circle-2" size={12} className="text-brand-500" />}</div>
                        <div className="text-[10px] text-muted flex items-center gap-1.5">
                          {w.role} · <span className={`font-extrabold ${w.match>='80%'?'text-success-700':w.match>='50%'?'text-warning-700':'text-danger-700'}`}>match {w.match}</span>
                        </div>
                      </div>
                      {w.busy && <StatusPill tone="gray" size="sm">busy</StatusPill>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: preview + cross-module */}
            <div className="space-y-3">
              <div className="surface rounded-xl p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Preview</div>
                <div className="rounded-xl bg-elev p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-subtle mono">PJA-2026-08422 (TBD)</div>
                  <div className="text-[13px] font-extrabold leading-tight mt-0.5">Cek kebocoran pipa hydrant H-04</div>
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <PriorityBadge priority="high" size="sm" />
                    <StatusPill tone="warning" size="sm" icon="search">Inspection</StatusPill>
                  </div>
                  <div className="mt-2 text-[10.5px] text-muted">Coal Pad Agra · 1j 30m · deadline 17:00</div>
                </div>
              </div>

              <XModule icon="building-2" label="Contractor Mgmt · cert check">
                <span>Cipto Hartono cert valid (K3 + Inspector); akan auto-validate sebelum assignment dikirim.</span>
              </XModule>
              <XModule icon="clipboard-list" label="PTW required">
                <span>High-risk inspeksi air bertekanan — wajib PTW-GE General Permit aktif sebelum check-in geo-fence.</span>
              </XModule>

              <div className="surface rounded-xl p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Template library</div>
                <button className="w-full h-10 rounded-lg bg-white border border-token text-[12px] font-bold inline-flex items-center justify-center gap-1.5">
                  <Icon name="save" size={13} /> Save as PJA template
                </button>
                <div className="mt-2 text-[10px] text-muted">8 template tersedia — used 142×</div>
              </div>

              <div className="space-y-1.5">
                <Btn variant="ghost" full>Save draft</Btn>
                <Btn variant="primary" full icon="send">Assign &amp; push notif</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W3 — PJA Monitoring (live)
// ============================================================
function W3_Monitor() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="pja" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="PJA Monitor — Live" sub="Ops · SPV portal" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="users">Worker · all</FilterChip>
              <FilterChip icon="map-pin">Lokasi · all</FilterChip>
              <FilterChip icon="circle">Status · all</FilterChip>
              <div className="flex-1" />
              <span className="inline-flex items-center gap-1 px-2 h-6 rounded-md bg-success-500 text-white text-[10px] font-bold uppercase tracking-wider">
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Live · refresh 5s
              </span>
            </div>

            {/* Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {[
                { tone:'danger',  ic:'hourglass',  t:'2 PJA approaching deadline',  d:'PJA-08412 conveyor (24m sisa) · PJA-08421 hydrant (1j 15m)', act:'Push reminder' },
                { tone:'warning', ic:'alert-triangle',t:'1 worker idle 30m',          d:'Eko Saputra · PJA-08405 blocked, belum di-handle SPV',     act:'Reassign' },
                { tone:'info',    ic:'trending-up',t:'1 PJA overrun estimasi 60%',d:'PJA-08412 estim 2j actual 3j 12m · review SOP timing',     act:'Review' },
              ].map((a,i) => (
                <div key={i} className={`rounded-xl p-4 border bg-${a.tone}-50 border-${a.tone}-500/30`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-9 h-9 rounded-lg bg-${a.tone}-500 text-white flex items-center justify-center`}><Icon name={a.ic} size={16} /></div>
                    <div className={`text-[12px] font-extrabold text-${a.tone}-700`}>{a.t}</div>
                  </div>
                  <div className={`text-[11px] text-${a.tone}-700/85 leading-relaxed`}>{a.d}</div>
                  <button className={`mt-2 text-[11px] font-bold text-${a.tone}-700 underline`}>{a.act} →</button>
                </div>
              ))}
            </div>

            {/* Timeline view */}
            <div className="surface rounded-xl p-5">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Timeline · 19 Mei 2026 · 06–14 shift</div>
              <div className="space-y-1.5">
                {[
                  { w:'Budi S.',        bars:[{ s:6, e:9, tone:'success', l:'PJA-08410 inspeksi tank' },{ s:9.7, e:14, tone:'warning', l:'PJA-08412 conveyor' }] },
                  { w:'Anton W.',       bars:[{ s:9.7, e:14, tone:'warning', l:'PJA-08412 co-worker' }] },
                  { w:'Asep H.',        bars:[{ s:6, e:9.5, tone:'success', l:'PJA-08415 attendance' },{ s:10, e:11.5, tone:'success', l:'PJA-08418 housekeep' }] },
                  { w:'Rina W.',        bars:[{ s:6, e:7.5, tone:'success', l:'PJA-08402' },{ s:8, e:11, tone:'success', l:'Inventory' }] },
                  { w:'Eko S.',         bars:[{ s:7, e:8.5, tone:'success', l:'Setup tool' },{ s:9, e:14, tone:'danger', l:'BLOCK · PJA-08405' }] },
                  { w:'Cipto H.',       bars:[{ s:6, e:8, tone:'success', l:'Briefing' },{ s:11, e:14, tone:'info', l:'PJA-08421 assigned' }] },
                ].map((row,i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-24 text-[11px] font-extrabold truncate">{row.w}</div>
                    <div className="flex-1 relative h-7 rounded bg-elev">
                      {[6,7,8,9,10,11,12,13,14].map(h => (
                        <div key={h} className="absolute top-0 bottom-0 w-px bg-token" style={{ left:`${((h-6)/8)*100}%` }} />
                      ))}
                      {row.bars.map((b,bi) => {
                        const left = ((b.s-6)/8)*100, w = ((b.e-b.s)/8)*100;
                        return (
                          <div key={bi}
                            className={`absolute top-1 bottom-1 rounded-md flex items-center px-2 text-[10px] font-bold text-white truncate bg-${b.tone}-500`}
                            style={{ left:`${left}%`, width:`${w}%` }}>
                            {b.l}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {/* Hour ruler */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-24" />
                  <div className="flex-1 flex justify-between text-[9px] text-subtle mono">
                    {[6,7,8,9,10,11,12,13,14].map(h => <span key={h}>{h}:00</span>)}
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
// W4 — Approval & Review
// ============================================================
function W4_Approval() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="pja" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="PJA Approval Inbox" sub="Ops · SPV portal" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-4">
            {/* Inbox list */}
            <div className="surface rounded-xl overflow-hidden flex flex-col">
              <div className="px-4 h-11 border-b border-token flex items-center gap-2">
                <Icon name="inbox" size={15} className="text-brand-500" />
                <div className="text-[12px] font-bold uppercase tracking-wider">Pending · 8</div>
                <div className="flex-1" />
                <Btn variant="ghost" size="sm" icon="check-check">Bulk approve</Btn>
              </div>
              <div className="overflow-y-auto p-2 space-y-1.5 max-h-[640px]">
                {[
                  { id:'PJA-2026-08412', t:'Inspeksi conveyor C-04', w:'Budi S. + 1', dur:'1j 52m', sel:true },
                  { id:'PJA-2026-08418', t:'Housekeeping ruang kontrol', w:'Asep H.', dur:'52m' },
                  { id:'PJA-2026-08402', t:'Inventory bahan baku',       w:'Rina W.', dur:'1j 15m' },
                  { id:'PJA-2026-08410', t:'Inspeksi tank BBM A',        w:'Joko P.', dur:'1j 32m' },
                  { id:'PJA-2026-08415', t:'Briefing attendance',         w:'Asep H.', dur:'35m' },
                ].map(p => (
                  <button key={p.id} className={`w-full text-left rounded-lg border p-2.5 ${p.sel?'bg-brand-50 border-brand-300':'border-token bg-white'}`}>
                    <div className="text-[10px] mono text-subtle font-bold">{p.id}</div>
                    <div className="text-[12px] font-extrabold leading-tight">{p.t}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-muted">
                      <Avatar name={p.w} size={20} tone="brand" />
                      <span className="font-semibold flex-1">{p.w}</span>
                      <span className="mono">{p.dur}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Review panel */}
            <div className="surface rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-warning-50 text-warning-600 flex items-center justify-center"><Icon name="search" size={22} /></div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mono">PJA-2026-08412</div>
                  <div className="text-[18px] font-extrabold tracking-tight">Inspeksi rutin conveyor C-04</div>
                </div>
                <StatusBadge status="review" />
              </div>

              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { l:'Durasi aktual', v:'1j 52m', sub:'estim 2j · -8m', tone:'success' },
                  { l:'Foto',           v:'5',      sub:'EXIF + GPS ok',     tone:'success' },
                  { l:'SOP step',       v:'5/5',     sub:'semua selesai',      tone:'success' },
                  { l:'Hazard obs',     v:'1',      sub:'idler vibration',    tone:'warning' },
                ].map(s => (
                  <div key={s.l} className={`rounded-xl bg-${s.tone}-50 p-3 border border-${s.tone}-500/25`}>
                    <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">{s.l}</div>
                    <div className={`text-[24px] font-extrabold mono text-${s.tone}-700`}>{s.v}</div>
                    <div className="text-[10px] text-muted">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Photo evidence grid */}
              <div className="mb-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Photo evidence</div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { l:'Before · APD', },
                    { l:'LOTO ok' },
                    { l:'Belt inspect' },
                    { l:'Bolt tightness' },
                    { l:'After · clean' },
                  ].map((p,i) => (
                    <div key={i} className="aspect-square rounded-lg bg-success-50 border border-success-500/25 text-success-700 relative overflow-hidden flex flex-col items-center justify-center gap-1">
                      <Icon name="image" size={24} />
                      <div className="text-[9.5px] font-extrabold text-center px-1">{p.l}</div>
                      <div className="absolute bottom-1 left-1 right-1 text-center text-[8.5px] mono bg-black/40 backdrop-blur text-white rounded px-1">10:{42+i*8}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOP completion */}
              <div className="mb-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">SOP completion</div>
                <div className="space-y-1.5">
                  {[
                    'Persiapan APD lengkap',
                    'Inspeksi area pra-kerja · LOTO conveyor',
                    'Eksekusi pekerjaan inspeksi belt',
                    'Cek tightness baut sambungan',
                    'Pembersihan area + dokumentasi akhir',
                  ].map((s,i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px]">
                      <Icon name="check-circle-2" size={14} className="text-success-500" />
                      <span className="font-semibold flex-1">{s}</span>
                      <span className="mono text-[10.5px] text-muted">10:{42+i*8}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-1.5">Worker notes</div>
                <div className="rounded-lg bg-elev p-3 text-[12.5px] leading-relaxed">
                  "Inspeksi tuntas sesuai SOP. Temuan: idler ke-3 ada getaran ringan — sudah saya flag sebagai hazard observation, perlu follow-up tim maintenance untuk preventive."
                </div>
              </div>

              {/* Action panel */}
              <div className="border-t border-token pt-4 flex items-center gap-2">
                <Btn variant="ghost" size="sm" icon="message-square">Request info</Btn>
                <Btn variant="outlineDanger" size="sm" icon="x">Reject (kembali ke worker)</Btn>
                <div className="flex-1" />
                <Btn variant="success" size="sm" icon="check-circle-2">Approve · mark Completed</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W5 — Performance Analytics
// ============================================================
function W5_Analytics() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="reports" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="PJA Performance Analytics — Mei 2026" sub="Ops · Reports" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="clipboard-check" label="Total PJA"       value="412"   tone="brand"   sub="bulan ini" delta="+18%" />
              <KPICard icon="check-circle-2"  label="Completion rate" value="94.2%" tone="success" delta="+2.4%" />
              <KPICard icon="timer"            label="Avg duration"    value="1j 32m" tone="warning" sub="vs estim 1j 38m" delta="-6m" />
              <KPICard icon="clock"            label="On-time rate"    value="86%"   tone="success" delta="+4%" />
              <KPICard icon="star"             label="Quality score"   value="4.6 ★" tone="safety" sub="approval rate" />
            </div>

            {/* Per worker */}
            <div className="surface rounded-xl p-5">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Top performers · bulan ini</div>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                    <th className="px-3 py-2.5">Worker</th>
                    <th className="px-3 py-2.5">PJA done</th>
                    <th className="px-3 py-2.5 w-32">Completion</th>
                    <th className="px-3 py-2.5">Avg duration</th>
                    <th className="px-3 py-2.5">On-time</th>
                    <th className="px-3 py-2.5">Quality</th>
                    <th className="px-3 py-2.5">Best at</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {[
                    { n:'Budi Santoso',  d:38, cr:98, avg:'1j 24m', ot:92, q:4.8, best:'Inspection' },
                    { n:'Asep Hidayat',  d:42, cr:96, avg:'1j 18m', ot:90, q:4.7, best:'Housekeeping' },
                    { n:'Rina Wati',     d:34, cr:94, avg:'1j 32m', ot:88, q:4.6, best:'Inventory' },
                    { n:'Joko Pranoto',  d:28, cr:96, avg:'2j 12m', ot:86, q:4.5, best:'Tank inspection' },
                    { n:'Bagas Rinaldi', d:30, cr:90, avg:'1j 48m', ot:80, q:4.4, best:'AC maintenance' },
                    { n:'Eko Saputra',   d:24, cr:82, avg:'2j 04m', ot:72, q:4.0, best:'Welding · slow at inspection' },
                  ].map((r,i) => (
                    <tr key={i} className="hover:bg-elev">
                      <td className="px-3 py-2.5"><div className="flex items-center gap-2"><Avatar name={r.n} size={28} tone="brand" /><span className="font-extrabold">{r.n}</span></div></td>
                      <td className="px-3 py-2.5 mono font-extrabold">{r.d}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 rounded-full bg-elev overflow-hidden">
                            <div className={`h-full bg-${r.cr>=95?'success':r.cr>=85?'warning':'danger'}-500`} style={{ width:`${r.cr}%` }} />
                          </div>
                          <span className={`mono font-bold ${r.cr>=95?'text-success-700':r.cr>=85?'text-warning-700':'text-danger-700'}`}>{r.cr}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 mono">{r.avg}</td>
                      <td className="px-3 py-2.5 mono font-bold">{r.ot}%</td>
                      <td className="px-3 py-2.5"><span className="inline-flex items-center gap-1 font-bold"><Icon name="star" size={12} className="text-safety-500" /> {r.q.toFixed(1)}</span></td>
                      <td className="px-3 py-2.5 text-muted">{r.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Per category */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              <div className="surface rounded-xl p-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Volume by category</div>
                <div className="space-y-2.5">
                  {[
                    { l:'Inspection',     v:142, dur:'1j 38m', tone:'warning' },
                    { l:'Cleaning',        v:118, dur:'52m',     tone:'success' },
                    { l:'Maintenance',     v:88,  dur:'2j 12m', tone:'info' },
                    { l:'Installation',    v:42,  dur:'2j 24m', tone:'safety' },
                    { l:'Other',           v:22,  dur:'1j 18m', tone:'gray' },
                  ].map(r => (
                    <div key={r.l}>
                      <div className="flex items-center justify-between text-[11.5px] mb-1">
                        <span className="font-extrabold">{r.l}</span>
                        <span className="mono"><span className="font-bold">{r.v}</span> PJA · avg {r.dur}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-elev overflow-hidden">
                        <div className={`h-full bg-${r.tone}-500`} style={{ width:`${(r.v/142)*100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI recommendations */}
              <div className="surface rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center"><Icon name="sparkles" size={14} /></div>
                  <div className="text-[13px] font-bold tracking-tight">AI insights · actionable</div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { ic:'trending-up', tone:'success', t:'Asep Hidayat consistently fast at cleaning', d:'18m faster than team avg. Pertimbangkan rotasi peran sebagai cleaning lead.', cf:'94%' },
                    { ic:'alert-triangle', tone:'warning', t:'PJA "AC Maintenance" overrun 32%', d:'Estimasi 1j 30m tapi rata-rata 2j. Update SOP timing atau split scope.', cf:'87%' },
                    { ic:'trending-down', tone:'danger', t:'Eko Saputra slow at inspection', d:'Quality 4.0 di inspection (avg 4.6). Coaching atau hindari assignment inspection.', cf:'82%' },
                  ].map((r,i) => (
                    <div key={i} className={`rounded-xl p-3 border bg-${r.tone}-50 border-${r.tone}-500/25`}>
                      <div className="flex items-center gap-2">
                        <Icon name={r.ic} size={14} className={`text-${r.tone}-600`} />
                        <div className={`text-[12px] font-extrabold text-${r.tone}-700 flex-1`}>{r.t}</div>
                        <span className="text-[9px] mono font-bold bg-white px-1.5 py-0.5 rounded border border-token">{r.cf}</span>
                      </div>
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

window.W1_SPVDashboard = W1_SPVDashboard;
window.W2_CreatePJA    = W2_CreatePJA;
window.W3_Monitor      = W3_Monitor;
window.W4_Approval     = W4_Approval;
window.W5_Analytics    = W5_Analytics;
