// Visitor — SO web screens V3 (pre-approval), V7 (active monitoring).

// ============================================================
// V3 — SO Pre-Approval
// ============================================================
function V3_SOApproval() {
  const [picked, setPicked] = React.useState(0);
  const inbox = [
    { id:'VIS-2026-0426', org:'Universitas Mulawarman', type:'internal',  visitors:40, host:'Andi Wijaya', when:'02 Jun · 10:00', sla:'2 hari', group:true },
    { id:'VIS-2026-0424', org:'PT SGS Indonesia',        type:'auditor',   visitors:3,  host:'Sari Hartati', when:'30 Mei · 09:00', sla:'1 hari', sel:true },
    { id:'VIS-2026-0428', org:'PT Bukit Makmur',         type:'business',  visitors:1,  host:'Budi Hartono', when:'30 Mei · 13:00', sla:'1 hari' },
    { id:'VIS-2026-0430', org:'Kementerian ESDM',         type:'regulator', visitors:5,  host:'Maya Saputri', when:'03 Jun · 08:00', sla:'4 hari', vip:true, fast:true },
  ];
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="visitor" role="so" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Visit Pre-Approval Inbox" sub="HSE · Safety Officer" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-4">
            {/* Inbox */}
            <div className="surface rounded-xl overflow-hidden flex flex-col">
              <div className="px-4 h-11 border-b border-token flex items-center gap-2">
                <Icon name="inbox" size={15} className="text-brand-500" />
                <div className="text-[12px] font-bold uppercase tracking-wider">Pending · {inbox.length}</div>
              </div>
              <div className="overflow-y-auto p-2 space-y-1.5 max-h-[640px]">
                {inbox.map((v,i) => {
                  const t = VISITOR_TYPE[v.type];
                  return (
                    <button key={v.id} onClick={() => setPicked(i)}
                      className={`w-full text-left rounded-lg border p-2.5 ${i===picked?'bg-brand-50 border-brand-300':'border-token bg-white'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-6 h-6 rounded bg-${t.tone}-50 text-${t.tone}-700 flex items-center justify-center`}><Icon name={t.icon} size={12} /></span>
                        <span className="text-[10px] mono text-subtle font-bold flex-1">{v.id}</span>
                        {v.fast && <StatusPill tone="danger" size="sm" icon="zap">Fast-track</StatusPill>}
                      </div>
                      <div className="text-[12.5px] font-extrabold leading-tight flex items-center gap-1.5">{v.org}{v.vip && <Icon name="star" size={11} className="text-danger-500" />}</div>
                      <div className="text-[10.5px] text-muted mt-0.5 flex items-center gap-1.5">
                        <Icon name="users" size={10} /> {v.visitors}{v.group && ' (group)'} · {v.when}
                      </div>
                      <div className="mt-1 text-[10px] font-bold text-warning-700 inline-flex items-center gap-1"><Icon name="clock" size={10} /> SLA {v.sla}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail */}
            <div className="surface rounded-xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-safety-50 text-safety-600 flex items-center justify-center"><Icon name="clipboard-check" size={22} /></div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mono">VIS-2026-0424</div>
                  <div className="text-[20px] font-extrabold tracking-tight">PT SGS Indonesia — ISO 45001 Surveillance Audit</div>
                  <div className="mt-1 flex items-center gap-1.5"><VisitorTypeBadge type="auditor" size="sm" /><StatusPill tone="warning" size="sm" icon="clock">Pending SO</StatusPill></div>
                </div>
                <div className="text-right text-[11px]">
                  <div className="text-subtle uppercase tracking-wider font-bold">Requested by</div>
                  <div className="font-bold">Sari Hartati</div>
                  <div className="text-subtle">28 Mei · 14:32</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { l:'Jadwal', v:'30 Mei 2026', sub:'09:00 – 15:00' },
                  { l:'Visitor', v:'3 orang', sub:'auditor team' },
                  { l:'Durasi', v:'1 hari', sub:'single visit' },
                ].map(s => (
                  <div key={s.l} className="rounded-xl bg-elev p-3">
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{s.l}</div>
                    <div className="text-[15px] font-extrabold">{s.v}</div>
                    <div className="text-[10px] text-muted">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Visitor list */}
              <div className="mb-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Visitor list</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { n:'Dimas Prakoso', r:'Lead Auditor' },
                    { n:'Rina Anggita',   r:'Auditor' },
                    { n:'James Tan',      r:'Technical Expert' },
                  ].map((v,i) => (
                    <div key={i} className="rounded-lg border border-token bg-white p-2.5 flex items-center gap-2">
                      <Avatar name={v.n} size={32} photo />
                      <div className="min-w-0"><div className="text-[12px] font-bold truncate">{v.n}</div><div className="text-[10px] text-muted truncate">{v.r}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Area access requested */}
              <div className="mb-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Area access requested</div>
                <div className="grid grid-cols-2 gap-2">
                  <AreaAccess name="Office area" allowed={true} />
                  <AreaAccess name="Workshop" allowed={true} risk="medium" />
                  <AreaAccess name="PIT Bahana" allowed={true} escort={true} risk="high" />
                  <AreaAccess name="Coal Pad" allowed={false} />
                </div>
              </div>

              {/* SO decision */}
              <div className="rounded-xl bg-elev p-4 mb-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">SO decision</div>
                <div className="flex items-center gap-2 mb-3">
                  <button className="flex-1 h-10 rounded-lg bg-success-500 text-white text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="check" size={14} /> Approve full</button>
                  <button className="flex-1 h-10 rounded-lg bg-warning-500 text-white text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="check-circle-2" size={14} /> Conditional</button>
                  <button className="flex-1 h-10 rounded-lg border border-danger-500/40 bg-white text-danger-700 text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="x" size={14} /> Reject</button>
                </div>
                {/* Conditional approval active */}
                <div className="rounded-lg bg-warning-50 border border-warning-500/30 p-3">
                  <div className="text-[11px] font-extrabold text-warning-700 mb-1.5 flex items-center gap-1.5"><Icon name="check-circle-2" size={12} /> Conditional approval aktif</div>
                  <div className="text-[11.5px] text-warning-700">Approved <span className="font-bold">hanya Office + Workshop</span>. PIT Bahana <span className="font-bold">ditolak</span> — auditor belum complete K3L PIT-specific. Re-request bila induction lengkap.</div>
                </div>
                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Comment untuk host</div>
                  <div className="rounded-lg border border-token-strong bg-white p-2.5">
                    <textarea rows="2" defaultValue="Approved untuk audit area Office + Workshop. PIT visit perlu K3L PIT module dulu — koordinasi dengan saya kalau perlu masuk PIT."
                      className="w-full bg-transparent outline-none text-[12.5px] resize-none" />
                  </div>
                </div>
              </div>

              <AuditNote by="Sari Hartati · SO" time="akan tercatat saat submit">
                Keputusan SO + alasan tercatat immutable. Untuk visit regulator/auditor, audit trail ini bagian dari compliance record yang bisa diminta saat inspeksi.
              </AuditNote>

              <div className="mt-4 flex items-center gap-2">
                <Btn variant="ghost" size="sm" icon="message-square">Request info</Btn>
                <div className="flex-1" />
                <Btn variant="warning" size="md" icon="check-circle-2" className="bg-warning-500 hover:bg-warning-600 text-white">Submit conditional approval</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// V7 — Active Visit Monitoring
// ============================================================
function V7_Monitoring() {
  const active = [
    { n:'Anton Wijaya',   org:'PT Trakindo',     loc:'Office area',     escort:'Budi Hartono', online:true,  tin:'09:15', tout:'17:00', status:'ok' },
    { n:'Sarah Lim',       org:'PT Trakindo',     loc:'PIT Bahana',     escort:'Budi Hartono', online:true,  tin:'09:15', tout:'17:00', status:'ok', escortNote:'with escort ✓' },
    { n:'Dimas Prakoso',   org:'Kementerian ESDM',loc:'Coal Pad',       escort:'Maya Saputri', online:true,  tin:'08:10', tout:'16:00', status:'unauthorized', alert:'Entered Coal Pad — not in permit!' },
    { n:'Rina Anggita',    org:'Kementerian ESDM',loc:'Office area',     escort:'Maya Saputri', online:false, tin:'08:10', tout:'16:00', status:'escort_lost', alert:'Escort disconnected 12m' },
    { n:'James Tan',       org:'PT SGS',          loc:'Mess Griya Praja',escort:'Sari Hartati', online:true,  tin:'07:45', tout:'12:00', status:'overstay', alert:'Passed exit time +18m' },
  ];
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="visitor" role="so" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Active Visit Monitoring — Live" sub="HSE · Safety Officer" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
            {/* Map + list */}
            <div className="space-y-4">
              {/* Alert bar */}
              <div className="rounded-xl bg-danger-50 border border-danger-500/30 p-3 flex items-center gap-3 alert-blink">
                <div className="w-10 h-10 rounded-lg bg-danger-500 text-white flex items-center justify-center"><Icon name="alert-octagon" size={20} /></div>
                <div className="flex-1">
                  <div className="text-[12.5px] font-extrabold text-danger-700">3 alert aktif memerlukan perhatian</div>
                  <div className="text-[11px] text-danger-700/85">1 unauthorized area · 1 escort lost · 1 overstay</div>
                </div>
                <Btn variant="danger" size="sm" icon="bell-ring">Notify escorts</Btn>
              </div>

              {/* Site map */}
              <div className="surface rounded-xl overflow-hidden">
                <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                  <Icon name="map" size={16} className="text-brand-500" />
                  <div className="text-[13px] font-bold tracking-tight">Visitor positions · last gate scan</div>
                  <span className="ml-auto inline-flex items-center gap-1 px-1.5 h-5 rounded bg-success-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Live
                  </span>
                </div>
                <div className="relative h-[340px]" style={{ background:'linear-gradient(180deg, #EAF1F8 0%, #FEF4E5 100%)' }}>
                  <svg viewBox="0 0 1000 340" className="absolute inset-0 w-full h-full">
                    <path d="M0,160 Q200,140 400,160 T800,150 T1000,180" stroke="#9EBCDA" strokeWidth="1.2" fill="none" strokeDasharray="6 6" opacity="0.5" />
                    <rect x="80"  y="80"  width="150" height="80" rx="3" fill="#1D9E75" opacity="0.12" />
                    <rect x="420" y="180" width="170" height="90" rx="3" fill="#E24B4A" opacity="0.12" />
                    <rect x="720" y="90"  width="170" height="80" rx="3" fill="#E24B4A" opacity="0.12" />
                    <text x="100" y="125" fontSize="11" fill="#11624A" fontWeight="700">OFFICE (allowed)</text>
                    <text x="440" y="230" fontSize="11" fill="#8E2A29" fontWeight="700">PIT BAHANA (escort)</text>
                    <text x="740" y="135" fontSize="11" fill="#8E2A29" fontWeight="700">COAL PAD (restricted)</text>
                  </svg>
                  {[
                    { x:'15%', y:'40%', n:'Anton', tone:'success' },
                    { x:'50%', y:'68%', n:'Sarah', tone:'warning' },
                    { x:'80%', y:'42%', n:'Dimas', tone:'danger', alert:true },
                    { x:'20%', y:'42%', n:'Rina',  tone:'gray', alert:true },
                    { x:'30%', y:'78%', n:'James', tone:'danger', alert:true },
                  ].map((p,i) => (
                    <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left:p.x, top:p.y }}>
                      <div className="relative">
                        <Avatar name={p.n} size={34} tone={p.tone==='gray'?'gray':p.tone} />
                        {p.alert && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger-500 text-white flex items-center justify-center text-[8px] font-extrabold border-2 border-white alert-blink">!</span>}
                      </div>
                      <div className="mt-1 px-1.5 py-0.5 rounded bg-white/95 text-[9px] font-bold mono text-center shadow-sm">{p.n}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active visitor list */}
              <div className="surface rounded-xl overflow-hidden">
                <div className="px-5 h-11 border-b border-token flex items-center gap-3">
                  <Icon name="users" size={15} className="text-brand-500" />
                  <div className="text-[12px] font-bold uppercase tracking-wider">Active visitors · {active.length}</div>
                </div>
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                      <th className="px-5 py-2.5">Visitor</th>
                      <th className="px-3 py-2.5">Lokasi</th>
                      <th className="px-3 py-2.5">Escort</th>
                      <th className="px-3 py-2.5">Time</th>
                      <th className="px-3 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {active.map((v,i) => (
                      <tr key={i} className={`hover:bg-elev ${v.status!=='ok'?'bg-danger-50/30':''}`}>
                        <td className="px-5 py-2.5"><div className="flex items-center gap-2.5"><Avatar name={v.n} size={30} photo /><div><div className="font-extrabold">{v.n}</div><div className="text-[10px] text-subtle">{v.org}</div></div></div></td>
                        <td className="px-3 py-2.5"><span className={`font-semibold ${v.status==='unauthorized'?'text-danger-700':''}`}>{v.loc}</span></td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${v.online?'bg-success-500':'bg-danger-500'}`} />
                            <span className="font-semibold">{v.escort}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 mono text-[11px]"><span className="text-success-700">{v.tin}</span> → <span className="text-muted">{v.tout}</span></td>
                        <td className="px-3 py-2.5">
                          {v.status==='ok'           && <StatusPill tone="success" size="sm" icon="check-circle-2">OK</StatusPill>}
                          {v.status==='unauthorized' && <StatusPill tone="danger" size="sm" icon="map-pin-off">Unauthorized</StatusPill>}
                          {v.status==='escort_lost'  && <StatusPill tone="danger" size="sm" icon="user-x">Escort lost</StatusPill>}
                          {v.status==='overstay'     && <StatusPill tone="danger" size="sm" icon="clock">Overstay</StatusPill>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: alerts feed */}
            <div className="space-y-3">
              <div className="surface rounded-xl overflow-hidden">
                <div className="px-4 h-11 border-b border-token flex items-center gap-2">
                  <Icon name="alert-triangle" size={15} className="text-danger-500" />
                  <div className="text-[12px] font-bold uppercase tracking-wider">Alert feed</div>
                </div>
                <div className="divide-y divide-[color:var(--border)]">
                  {[
                    { ic:'map-pin-off', tone:'danger', t:'Unauthorized area', d:'Dimas Prakoso entered Coal Pad — not in permit VIS-0419', tm:'2m lalu', act:'Call escort' },
                    { ic:'user-x',      tone:'danger', t:'Escort disconnected', d:'Rina Anggita — escort Maya offline 12m', tm:'12m lalu', act:'Reassign escort' },
                    { ic:'clock',       tone:'warning',t:'Overstay', d:'James Tan passed exit 12:00 +18m', tm:'18m lalu', act:'Extend or escort out' },
                  ].map((a,i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={a.ic} size={14} className={`text-${a.tone}-600`} />
                        <div className={`text-[12px] font-extrabold text-${a.tone}-700 flex-1`}>{a.t}</div>
                        <span className="text-[9.5px] text-subtle mono">{a.tm}</span>
                      </div>
                      <div className="text-[11px] text-muted">{a.d}</div>
                      <button className={`mt-1.5 text-[11px] font-bold text-${a.tone}-700 underline`}>{a.act} →</button>
                    </div>
                  ))}
                </div>
              </div>

              <AuditNote>Setiap alert + resolusi tercatat di audit log. Unauthorized area entry adalah finding serius untuk audit regulator — wajib root-cause + corrective action.</AuditNote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.V3_SOApproval = V3_SOApproval;
window.V7_Monitoring = V7_Monitoring;
