// Visitor — Host web screens V1, V2, V4.

// ============================================================
// V1 — Visitor Dashboard
// ============================================================
function V1_Dashboard({ onPick }) {
  const [tab, setTab] = React.useState('active');
  const tabs = [
    { id:'upcoming', l:'Upcoming', n:VISITS.filter(v=>['approved','prearrival','pending_so'].includes(v.status)).length },
    { id:'active',   l:'Active',   n:VISITS.filter(v=>v.status==='active').length },
    { id:'completed',l:'Completed',n:VISITS.filter(v=>v.status==='closed').length },
    { id:'all',      l:'All registry', n:VISITS.length },
  ];
  const filtered = VISITS.filter(v => {
    if (tab==='upcoming') return ['approved','prearrival','pending_so'].includes(v.status);
    if (tab==='active')   return v.status==='active';
    if (tab==='completed')return v.status==='closed';
    return true;
  });

  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="visitor" role="host" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Visitor Management — Jumat, 29 Mei 2026" sub="Accommodation · HR" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="users"          label="Visitor minggu ini" value="23"  tone="brand"   sub="6 organisasi" delta="+5" />
              <KPICard icon="id-card"        label="Active permit today" value="7"   tone="success" sub="2 regulator · 1 audit" />
              <KPICard icon="hourglass"      label="Pending induction"   value="4"   tone="warning" sub="reminder terkirim" />
              <KPICard icon="shield-check"   label="Compliance score"     value="98%" tone="success" sub="audit-ready" delta="+1%" />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar" active>29 Mei – 5 Jun</FilterChip>
              <FilterChip icon="briefcase">Semua tipe</FilterChip>
              <FilterChip icon="circle-dot">Semua status</FilterChip>
              <FilterChip icon="map-pin">Semua area</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="download">Export registry</Btn>
              <Btn variant="primary" size="sm" icon="user-plus">Daftarkan kunjungan</Btn>
            </div>

            {/* Tabs + table */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-3 border-b border-token flex items-center">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`relative px-4 h-11 text-[12.5px] font-bold inline-flex items-center gap-2 ${tab===t.id?'text-brand-700':'text-muted hover:text-[color:var(--text)]'}`}>
                    {t.l} <span className={`px-1.5 h-5 rounded text-[10px] font-bold ${tab===t.id?'bg-brand-50 text-brand-700':'bg-elev text-muted'}`}>{t.n}</span>
                    {tab===t.id && <span className="absolute left-2 right-2 -bottom-px h-[2px] rounded bg-brand-500" />}
                  </button>
                ))}
              </div>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                    <th className="px-5 py-2.5">Visit · organisasi</th>
                    <th className="px-3 py-2.5">Tipe</th>
                    <th className="px-3 py-2.5">Visitor</th>
                    <th className="px-3 py-2.5">Host</th>
                    <th className="px-3 py-2.5">Jadwal</th>
                    <th className="px-3 py-2.5 w-[200px]">Pre-arrival</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="px-3 py-2.5 w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {filtered.map(v => {
                    const t = VISITOR_TYPE[v.type];
                    return (
                      <tr key={v.id} className="hover:bg-elev cursor-pointer group" onClick={() => onPick && onPick(v)}>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-9 h-9 rounded-lg bg-${t.tone}-50 text-${t.tone}-700 flex items-center justify-center border border-${t.tone}-500/20`}><Icon name={t.icon} size={16} /></div>
                            <div>
                              <div className="font-extrabold flex items-center gap-1.5">{v.org}{v.vip && <StatusPill tone="danger" size="sm" icon="star">VIP</StatusPill>}{v.group && <StatusPill tone="info" size="sm" icon="users">Group {v.visitors}</StatusPill>}</div>
                              <div className="text-[10px] text-subtle mono">{v.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3"><VisitorTypeBadge type={v.type} size="sm" /></td>
                        <td className="px-3 py-3"><span className="inline-flex items-center gap-1 font-bold"><Icon name="user" size={12} className="text-subtle" /> {v.visitors}</span></td>
                        <td className="px-3 py-3 font-semibold">{v.host}</td>
                        <td className="px-3 py-3"><div className="font-semibold">{v.date}</div><div className="text-[10px] text-subtle mono">{v.time}</div></td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-elev overflow-hidden">
                              <div className={`h-full ${v.prep===100?'bg-success-500':v.prep>=50?'bg-warning-500':'bg-danger-500'}`} style={{ width:`${v.prep}%` }} />
                            </div>
                            <span className="mono font-bold text-[11px]">{v.prep}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-3"><VisitStatusBadge status={v.status} size="sm" /></td>
                        <td className="px-3 py-3"><Icon name="chevron-right" size={14} className="text-subtle group-hover:text-brand-500" /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Compliance footer */}
            <AuditNote by="System · auto-snapshot" time="29 Mei 2026 · 06:00 WITA">
              Registry ini immutable &amp; audit-ready sesuai <span className="font-bold">Kepmen ESDM 1827/2018</span> — setiap visit log, induction record, dan permit issuance tercatat dengan timestamp + actor untuk inspeksi regulator.
            </AuditNote>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// V2 — Register New Visit (3-step)
// ============================================================
function V2_Register() {
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="visitor" role="host" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Daftarkan kunjungan baru" sub="Accommodation · HR" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-5">
              {['Visit info','Visitor list','Preparations'].map((s,i) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-2 text-[12px] font-bold">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${i===0?'bg-brand-500 text-white':'bg-white border border-token-strong text-subtle'}`}>{i+1}</div>
                    <span className={i===0?'text-brand-700':'text-subtle'}>{s}</span>
                  </div>
                  {i<2 && <div className="flex-1 h-px bg-token max-w-24" />}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
              {/* Step 1 form */}
              <div className="space-y-4">
                <div className="surface rounded-xl p-5">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Step 1 — Visit info</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Purpose kunjungan</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="briefcase" size={16} className="text-subtle" /><span className="text-[13px] font-bold flex-1">Business meeting — supplier review</span><Icon name="chevron-down" size={14} className="text-subtle" /></div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Sponsor / host</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Avatar name="Budi Hartono" size={22} tone="brand" /><span className="text-[13px] font-semibold flex-1">Budi Hartono</span><StatusPill tone="gray" size="sm">auto</StatusPill></div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Department</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="building" size={16} className="text-subtle" /><span className="text-[13px] font-semibold flex-1">Operations</span></div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Expected arrival</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="calendar" size={16} className="text-subtle" /><span className="text-[13px] font-semibold flex-1 mono">30 Mei 2026 · 09:00</span></div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Duration</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="clock" size={16} className="text-subtle" /><span className="text-[13px] font-semibold flex-1">1 hari (s/d 17:00)</span></div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Vehicles bringing</div>
                      <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2"><Icon name="car" size={16} className="text-subtle" /><span className="text-[13px] font-semibold flex-1">1 kendaraan · B 1234 XYZ (akan diverifikasi di gate)</span></div>
                    </div>
                  </div>

                  {/* Area multi-select with risk */}
                  <div className="mt-4">
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Areas to be visited <span className="text-subtle font-normal normal-case">· risk indicator</span></div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { l:'Office area',     sel:true,  risk:'low' },
                        { l:'Mess Griya Praja', sel:true,  risk:'low' },
                        { l:'PIT Bahana',       sel:true,  risk:'high', escort:true },
                        { l:'Workshop',         sel:false, risk:'medium' },
                        { l:'Coal Pad',         sel:false, risk:'high' },
                        { l:'Hauling Road',     sel:false, risk:'high' },
                      ].map(a => (
                        <button key={a.l} className={`flex items-center gap-2 px-3 h-11 rounded-xl border text-left ${a.sel?'bg-brand-50 border-brand-300':'bg-white border-token'}`}>
                          <div className={`w-4 h-4 rounded ${a.sel?'bg-brand-500':'border border-token-strong bg-white'} flex items-center justify-center`}>{a.sel && <Icon name="check" size={11} className="text-white" strokeWidth={3} />}</div>
                          <span className="text-[12.5px] font-bold flex-1">{a.l}</span>
                          {a.risk==='high'   && <StatusPill tone="danger" size="sm">High</StatusPill>}
                          {a.risk==='medium' && <StatusPill tone="warning" size="sm">Med</StatusPill>}
                          {a.escort && <Icon name="user-check" size={13} className="text-warning-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 2 preview */}
                <div className="surface rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Step 2 — Visitor list</div>
                    <div className="flex items-center gap-1.5">
                      <Btn variant="ghost" size="sm" icon="upload">Bulk add (group)</Btn>
                      <Btn variant="secondary" size="sm" icon="user-plus">Add visitor</Btn>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { n:'Anton Wijaya',    org:'PT Trakindo Utama', role:'Account Manager', id:'KTP · 3201...8821' },
                      { n:'Sarah Lim',        org:'PT Trakindo Utama', role:'Technical Lead',  id:'Passport · A12345' },
                    ].map((v,i) => (
                      <div key={i} className="rounded-xl border border-token bg-white p-3 flex items-center gap-3">
                        <Avatar name={v.n} size={40} photo />
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-extrabold">{v.n}</div>
                          <div className="text-[10.5px] text-muted">{v.role} · {v.org}</div>
                          <div className="text-[10px] text-subtle mono mt-0.5">{v.id}</div>
                        </div>
                        <button className="w-8 h-8 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="edit-3" size={14} className="text-subtle" /></button>
                        <button className="w-8 h-8 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="trash-2" size={14} className="text-subtle" /></button>
                      </div>
                    ))}
                    <button className="w-full h-11 rounded-xl border border-dashed border-token-strong text-[12.5px] font-bold text-brand-700 inline-flex items-center justify-center gap-1.5"><Icon name="plus" size={14} /> Tambah visitor (photo capture saat check-in)</button>
                  </div>
                </div>

                {/* Step 3 preparations */}
                <div className="surface rounded-xl p-5">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Step 3 — Required preparations</div>
                  <div className="space-y-2">
                    {[
                      { ic:'shield-check', l:'K3L Induction', d:'Online module 45 menit · atau in-person briefing', act:'Schedule slot', tone:'safety' },
                      { ic:'stethoscope',  l:'MCU Declaration', d:'Self-declaration riwayat kesehatan · link via email', act:'Send link', tone:'info' },
                      { ic:'file-signature',l:'NDA Signing',     d:'Non-disclosure agreement · e-signature', act:'Send link', tone:'brand' },
                    ].map((p,i) => (
                      <div key={i} className="rounded-xl bg-elev p-3 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${p.tone}-50 text-${p.tone}-600 flex items-center justify-center`}><Icon name={p.ic} size={18} /></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-extrabold">{p.l}</div>
                          <div className="text-[10.5px] text-muted">{p.d}</div>
                        </div>
                        <Btn variant="secondary" size="sm">{p.act}</Btn>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: summary + submit */}
              <div className="space-y-3">
                <div className="surface rounded-xl p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Ringkasan</div>
                  <div className="space-y-2 text-[12px]">
                    <div className="flex justify-between"><span className="text-muted">Organisasi</span><span className="font-bold">PT Trakindo</span></div>
                    <div className="flex justify-between"><span className="text-muted">Tipe</span><span className="font-bold">Business</span></div>
                    <div className="flex justify-between"><span className="text-muted">Visitor</span><span className="font-bold">2 orang</span></div>
                    <div className="flex justify-between"><span className="text-muted">Tanggal</span><span className="font-bold mono">30 Mei 2026</span></div>
                    <div className="flex justify-between"><span className="text-muted">Area</span><span className="font-bold">3 area (1 high)</span></div>
                  </div>
                </div>

                <div className="rounded-xl bg-info-50 border border-info-500/25 p-3 flex items-start gap-2.5">
                  <Icon name="info" size={16} className="text-info-600 mt-0.5 shrink-0" />
                  <div className="text-[11.5px] text-info-700">
                    <span className="font-extrabold">Pre-registration H-3.</span> Visit ke <span className="font-bold">PIT Bahana (high-risk)</span> wajib approval Safety Officer sebelum permit di-issue.
                  </div>
                </div>

                <AuditNote>Saat submit, request masuk antrian SO pre-approval. Semua field tercatat di audit log dengan timestamp.</AuditNote>

                <div className="space-y-1.5">
                  <Btn variant="ghost" full>Save draft</Btn>
                  <Btn variant="primary" full icon="send">Submit → SO pre-approval</Btn>
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
// V4 — Visitor Pre-Arrival Hub
// ============================================================
function V4_PreArrival() {
  const visitors = [
    { n:'Anton Wijaya', org:'PT Trakindo', k3l:true,  mcu:true,  nda:true,  photo:true,  pct:100 },
    { n:'Sarah Lim',     org:'PT Trakindo', k3l:true,  mcu:true,  nda:false, photo:false, pct:50 },
    { n:'Dimas Prakoso', org:'PT SGS',      k3l:true,  mcu:false, nda:true,  photo:false, pct:50 },
    { n:'Rina Anggita',  org:'PT SGS',      k3l:false, mcu:false, nda:false, photo:false, pct:0,  flag:true },
  ];
  return (
    <div className="h-full flex bg-elev">
      <WebSidebar current="visitor" role="host" />
      <div className="flex-1 flex flex-col min-w-0">
        <WebTopBar title="Pre-Arrival Hub" sub="Accommodation · HR" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar" active>Visit aktif + upcoming</FilterChip>
              <FilterChip icon="alert-triangle">Pending only</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="mail">Bulk reminder (3)</Btn>
              <Btn variant="primary" size="sm" icon="refresh-cw">Refresh status</Btn>
            </div>

            {/* Overall progress */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPICard icon="shield-check"   label="K3L done"  value="3 / 4" tone="success" />
              <KPICard icon="stethoscope"    label="MCU done"   value="2 / 4" tone="warning" />
              <KPICard icon="file-signature" label="NDA signed" value="2 / 4" tone="warning" />
              <KPICard icon="image"          label="Photo ID"   value="1 / 4" tone="danger" />
            </div>

            {/* Per-visitor cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {visitors.map((v,i) => (
                <div key={i} className={`surface rounded-xl p-4 ${v.flag?'ring-1 ring-danger-500/30':''}`}>
                  <div className="flex items-start gap-3">
                    <Avatar name={v.n} size={48} photo={v.photo} tone="gray" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-extrabold flex items-center gap-1.5">{v.n}{v.flag && <StatusPill tone="danger" size="sm" icon="alert-triangle">Reminder sent 3×</StatusPill>}</div>
                      <div className="text-[11px] text-muted">{v.org}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-[22px] font-extrabold mono ${v.pct===100?'text-success-700':v.pct>0?'text-warning-700':'text-danger-700'}`}>{v.pct}%</div>
                      <div className="text-[9.5px] text-subtle uppercase tracking-wider font-bold">complete</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {[
                      { l:'K3L Induction', ic:'shield-check', done:v.k3l },
                      { l:'MCU Declaration', ic:'stethoscope', done:v.mcu },
                      { l:'NDA Signing', ic:'file-signature', done:v.nda },
                      { l:'Photo ID', ic:'image', done:v.photo },
                    ].map(s => (
                      <div key={s.l} className="flex items-center gap-2.5 text-[12px]">
                        <Icon name={s.done?'check-circle-2':'circle'} size={15} className={s.done?'text-success-500':'text-subtle'} />
                        <Icon name={s.ic} size={13} className="text-muted" />
                        <span className={`flex-1 font-semibold ${s.done?'':'text-muted'}`}>{s.l}</span>
                        {s.done ? <StatusPill tone="success" size="sm">Done</StatusPill> : <button className="text-[10.5px] font-bold text-brand-700">Send reminder</button>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <AuditNote by="Email automation engine" time="reminder H-3, H-1, H-0">
              Sistem otomatis kirim reminder email untuk preparation yang pending. Visitor tidak bisa di-issue Mine Permit di gate sebelum 100% complete (kecuali emergency dengan SO override).
            </AuditNote>
          </div>
        </div>
      </div>
    </div>
  );
}

window.V1_Dashboard = V1_Dashboard;
window.V2_Register  = V2_Register;
window.V4_PreArrival= V4_PreArrival;
