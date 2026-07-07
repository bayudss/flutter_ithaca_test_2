// Contractor — Admin web screens C1-C6.

// ============================================================
// C1 — Contractor Dashboard (entry)
// ============================================================
function C1_Dashboard({ onTabChange, tab='companies', onPickContractor, onPickWorker }) {
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar current="contractor" />
      <div className="flex-1 flex flex-col min-w-0">
        <HRTopBar title="Contractor Management — Selasa, 19 Mei 2026" sub="HR · Compliance" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="building-2"    label="Contractors active" value="26"    tone="brand"   sub="6 klasifikasi" />
              <KPICard icon="users"          label="Workers active"     value="3,142" tone="success" sub="organic + KNC + dll" delta="+38" />
              <KPICard icon="alert-triangle" label="Expiring 30 hari"   value="87"    tone="warning" sub="docs · 23 worker affected" delta="-12" />
              <KPICard icon="shield-check"   label="Compliance rate"     value="94%"   tone="success" sub="target ≥95%" delta="+1.4%" />
              <KPICard icon="ban"            label="Access suspended"    value="12"    tone="danger"  sub="resolusi pending" delta="+3" />
            </div>

            {/* Tabs */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-3 border-b border-token flex items-center">
                {[
                  { id:'companies',  l:'Companies',  n:26, ic:'building-2' },
                  { id:'workers',    l:'Workers',    n:3142, ic:'users' },
                  { id:'compliance', l:'Compliance', n:87, ic:'shield-check', tone:'warning' },
                ].map(t => (
                  <button key={t.id} onClick={() => onTabChange && onTabChange(t.id)}
                    className={`relative px-4 h-11 text-[12.5px] font-bold inline-flex items-center gap-2
                      ${tab===t.id ? 'text-brand-700' : 'text-muted hover:text-[color:var(--text)]'}`}>
                    <Icon name={t.ic} size={14} /> {t.l}
                    <span className={`px-1.5 h-5 rounded text-[10px] font-bold ${t.tone==='warning'?'bg-warning-500 text-white':tab===t.id?'bg-brand-50 text-brand-700':'bg-elev text-muted'}`}>{t.n.toLocaleString('id')}</span>
                    {tab===t.id && <span className="absolute left-2 right-2 -bottom-px h-[2px] rounded bg-brand-500" />}
                  </button>
                ))}
                <div className="flex-1" />
                <FilterChip icon="filter">More filters</FilterChip>
                <Btn variant="primary" size="sm" icon="plus" className="ml-2">Tambah contractor</Btn>
              </div>

              {/* Inline filters */}
              <div className="px-5 py-3 flex items-center gap-2 flex-wrap bg-elev/40">
                <FilterChip icon="layers" active>Semua klasifikasi</FilterChip>
                <FilterChip icon="check-circle-2">Active + Expiring</FilterChip>
                <FilterChip icon="map-pin">Semua area</FilterChip>
                <FilterChip icon="trending-up">Score: all</FilterChip>
                <div className="flex-1" />
                <div className="flex items-center gap-2 text-[11px] text-subtle">
                  <Btn variant="ghost" size="sm" icon="download">Export</Btn>
                  <Btn variant="ghost" size="sm" icon="columns-3">Columns</Btn>
                </div>
              </div>

              {tab === 'companies'  && <C2_Companies onPickContractor={onPickContractor} />}
              {tab === 'workers'    && <WorkerTable rows={WORKERS} onPick={onPickWorker} />}
              {tab === 'compliance' && <ComplianceQuickView />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// C2 — Contractor Entity List (used as table inside C1)
// ============================================================
function C2_Companies({ onPickContractor }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
            <th className="px-5 py-2.5">Contractor</th>
            <th className="px-3 py-2.5">Klasifikasi</th>
            <th className="px-3 py-2.5">Workers</th>
            <th className="px-3 py-2.5 w-[220px]">Periode kontrak</th>
            <th className="px-3 py-2.5">Compliance</th>
            <th className="px-3 py-2.5">Status</th>
            <th className="px-3 py-2.5 w-24"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:var(--border)]">
          {CONTRACTORS.map(c => {
            const cls = CLASS[c.cls];
            const scoreTone = c.score>=90?'success':c.score>=75?'warning':'danger';
            return (
              <tr key={c.id} className="hover:bg-elev cursor-pointer" onClick={() => onPickContractor && onPickContractor(c)}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-[12px] bg-${cls.tone}-50 text-${cls.tone}-700 border border-${cls.tone}-500/20`}>
                      {c.short.split(' ').filter(s=>s!=='PT'&&s!=='CV').map(s=>s[0]).slice(0,2).join('')}
                    </div>
                    <div>
                      <div className="font-extrabold">{c.name}</div>
                      <div className="text-[10px] text-subtle mono">{c.id} · NPWP {c.npwp.slice(0,6)}…</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3"><StatusPill tone={cls.tone} icon={cls.icon}>{cls.label}</StatusPill></td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    <Icon name="users" size={13} className="text-subtle" />
                    <span className="font-extrabold mono text-[13px]">{c.workers}</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="text-[10.5px] text-muted mb-1">{c.period}</div>
                  <div className="h-1.5 rounded-full bg-elev overflow-hidden">
                    <div className={`h-full ${c.progress>=85?'bg-warning-500':'bg-brand-500'}`} style={{ width:`${c.progress||5}%` }} />
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`mono font-extrabold text-[14px] text-${scoreTone}-700`}>{c.score}%</span>
                    <div className="flex items-center gap-px">
                      {[1,2,3,4,5].map(s => (
                        <Icon key={s} name="star" size={11} className={s<=Math.round(c.score/20)?`text-${scoreTone}-500`:'text-[color:var(--border-strong)]'} />
                      ))}
                    </div>
                    {c.score_warn && <Icon name="alert-triangle" size={13} className="text-warning-500" />}
                  </div>
                </td>
                <td className="px-3 py-3">
                  {c.status==='active'    && <StatusPill tone="success" size="sm" icon="check-circle-2">Active</StatusPill>}
                  {c.status==='expiring'  && <StatusPill tone="warning" size="sm" icon="alert-triangle">Expiring</StatusPill>}
                  {c.status==='suspended' && <StatusPill tone="danger"  size="sm" icon="ban">Suspended</StatusPill>}
                  {c.status==='standby'   && <StatusPill tone="gray"    size="sm" icon="pause">Standby</StatusPill>}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button className="w-7 h-7 rounded hover:bg-white border border-token flex items-center justify-center"><Icon name="eye" size={12} /></button>
                    <button className="w-7 h-7 rounded hover:bg-white border border-token flex items-center justify-center"><Icon name="edit-3" size={12} /></button>
                    <button className="w-7 h-7 rounded hover:bg-white border border-token flex items-center justify-center"><Icon name="user-plus" size={12} /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Worker table (shared inside dashboard tab)
function WorkerTable({ rows, onPick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
            <th className="px-5 py-2.5"><input type="checkbox" className="accent-brand-500" /></th>
            <th className="px-3 py-2.5">Worker</th>
            <th className="px-3 py-2.5">Position</th>
            <th className="px-3 py-2.5">Contractor</th>
            <th className="px-3 py-2.5 w-[280px]">Cert status</th>
            <th className="px-3 py-2.5">Areas</th>
            <th className="px-3 py-2.5">Status</th>
            <th className="px-3 py-2.5 w-8"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:var(--border)]">
          {rows.map(w => (
            <tr key={w.id} className="hover:bg-elev cursor-pointer group" onClick={() => onPick && onPick(w)}>
              <td className="px-5 py-2.5"><input type="checkbox" className="accent-brand-500" onClick={e=>e.stopPropagation()} /></td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <Avatar name={w.name} size={32} tone={w.tone} />
                  <div>
                    <div className="font-extrabold flex items-center gap-1.5">{w.name}
                      {w.flag && <Icon name="alert-triangle" size={11} className="text-danger-500" />}
                    </div>
                    <div className="text-[10px] text-subtle mono">{w.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2.5 text-muted">{w.pos}</td>
              <td className="px-3 py-2.5 font-semibold">{w.ctr}</td>
              <td className="px-3 py-2.5">
                <div className="flex flex-wrap gap-1">
                  {w.certs.slice(0,3).map((c,i) => <CertBadge key={i} name={c.n} days={c.d} />)}
                  {w.certs.length>3 && <span className="text-[10px] text-subtle font-bold">+{w.certs.length-3}</span>}
                </div>
              </td>
              <td className="px-3 py-2.5">
                <div className="flex flex-wrap gap-1">
                  {w.areas.slice(0,2).map(a => <span key={a} className="px-1.5 h-5 rounded bg-info-50 text-info-700 text-[10px] font-bold inline-flex items-center">{a}</span>)}
                  {w.areas.length>2 && <span className="text-[10px] text-subtle font-bold">+{w.areas.length-2}</span>}
                </div>
              </td>
              <td className="px-3 py-2.5">
                {w.status==='active'    && <StatusPill tone="success" size="sm" icon="check-circle-2">Active</StatusPill>}
                {w.status==='expiring'  && <StatusPill tone="warning" size="sm" icon="alert-triangle">Expiring</StatusPill>}
                {w.status==='suspended' && <StatusPill tone="danger"  size="sm" icon="ban">Suspended</StatusPill>}
                {w.status==='leave'     && <StatusPill tone="info"    size="sm" icon="palmtree">On leave</StatusPill>}
              </td>
              <td className="px-3 py-2.5"><Icon name="chevron-right" size={14} className="text-subtle group-hover:text-brand-500" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComplianceQuickView() {
  // Quick preview of compliance tab — full version is C11
  const expiring = [
    { w:'Eko Saputra',     ctr:'PT BWS',     cert:'Welder 3G SMAW', days:8,   risk:'critical' },
    { w:'Bagas Rinaldi',   ctr:'PT BWS',     cert:'SIMPER C',        days:-5,  risk:'expired' },
    { w:'Lina Marbun',     ctr:'PT BWS',     cert:'MCU',             days:-17, risk:'expired' },
    { w:'Rina Wati',       ctr:'Bahari',     cert:'Food handler',    days:21,  risk:'warning' },
    { w:'Asep Hidayat',    ctr:'PT SMS',     cert:'K3L',             days:24,  risk:'warning' },
    { w:'Henny Sari',      ctr:'PT KNC',     cert:'MCU',             days:29,  risk:'warning' },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
            <th className="px-5 py-2.5">Worker</th>
            <th className="px-3 py-2.5">Contractor</th>
            <th className="px-3 py-2.5">Sertifikat</th>
            <th className="px-3 py-2.5 w-[200px]">Expiry</th>
            <th className="px-3 py-2.5">Risk</th>
            <th className="px-3 py-2.5 w-32"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:var(--border)]">
          {expiring.map((r,i) => (
            <tr key={i} className="hover:bg-elev">
              <td className="px-5 py-2.5"><div className="flex items-center gap-2.5"><Avatar name={r.w} size={28} tone="brand" /><span className="font-extrabold">{r.w}</span></div></td>
              <td className="px-3 py-2.5 font-semibold">{r.ctr}</td>
              <td className="px-3 py-2.5">{r.cert}</td>
              <td className="px-3 py-2.5"><CertProgress days={r.days} size="sm" /></td>
              <td className="px-3 py-2.5">
                {r.risk==='critical'&&<StatusPill tone="danger" size="sm" icon="alert-triangle">Critical</StatusPill>}
                {r.risk==='expired' &&<StatusPill tone="danger" size="sm" icon="x-circle">Expired</StatusPill>}
                {r.risk==='warning' &&<StatusPill tone="warning" size="sm" icon="clock">Warning</StatusPill>}
              </td>
              <td className="px-3 py-2.5">
                <div className="flex gap-1 justify-end">
                  <button className="h-7 px-2 rounded border border-warning-300 text-warning-700 text-[10px] font-bold">Remind</button>
                  <button className="h-7 px-2 rounded bg-brand-500 text-white text-[10px] font-bold">Renew</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// C3 — Add Contractor (Modal overlay)
// ============================================================
function C3_AddContractor({ onClose }) {
  return (
    <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl w-full max-w-[820px] max-h-[90%] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="h-14 px-5 border-b border-token flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-brand-500 text-white flex items-center justify-center"><Icon name="building-2" size={18} /></div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">New contractor</div>
            <div className="text-[14px] font-extrabold tracking-tight">Tambah entitas kontraktor</div>
          </div>
          <div className="flex-1" />
          <button onClick={onClose} className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="x" size={18} /></button>
        </div>

        {/* Step dots */}
        <div className="px-5 py-3 border-b border-token shrink-0 flex items-center gap-2 bg-elev/40">
          {['Company','Kontrak & PIC','Documents','Review'].map((s,i) => (
            <div key={s} className="flex items-center gap-2 text-[11.5px] font-bold">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${i===0?'bg-brand-500 text-white':'bg-white border border-token-strong text-subtle'}`}>{i+1}</div>
              <span className={i===0?'text-brand-700':'text-subtle'}>{s}</span>
              {i<3 && <Icon name="chevron-right" size={12} className="text-subtle ml-1" />}
            </div>
          ))}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-5">
          {/* Company section */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Identitas perusahaan</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { ic:'building-2',  l:'Nama perusahaan',          v:'PT Lestari Mining Service' },
                { ic:'hash',         l:'NPWP',                       v:'02.345.678.9-012.000', mono:true },
                { ic:'file-text',    l:'NIB',                        v:'1218001234567', mono:true },
                { ic:'layers',       l:'Klasifikasi',                v:'Mining services' },
                { ic:'map-pin',      l:'Alamat',                     v:'Jl. Industri Raya 12, Samarinda', col:2 },
              ].map((f,i) => (
                <div key={i} className={f.col===2?'col-span-2':''}>
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">{f.l}</div>
                  <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2">
                    <Icon name={f.ic} size={16} className="text-subtle" />
                    <div className={`flex-1 text-[13px] font-semibold ${f.mono?'mono':''}`}>{f.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contract */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Kontrak &amp; PIC</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Kontrak number</div>
                <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2">
                  <Icon name="file-text" size={16} className="text-subtle" />
                  <div className="flex-1 text-[13px] font-semibold mono">CTR-NUS-2026-0042</div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Scope pekerjaan</div>
                <div className="rounded-xl border border-token-strong bg-white p-3">
                  <textarea rows="2" defaultValue="Penyediaan jasa operator excavator dan dump truck untuk operasi mining PIT Bahana, periode 24 bulan dengan SLA availability 95%."
                    className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Periode mulai</div>
                <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2">
                  <Icon name="calendar" size={16} className="text-subtle" />
                  <div className="flex-1 text-[13px] font-semibold mono">01 Juni 2026</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Periode selesai</div>
                <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2">
                  <Icon name="calendar" size={16} className="text-subtle" />
                  <div className="flex-1 text-[13px] font-semibold mono">31 Mei 2028</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">PIC Kontraktor</div>
                <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2">
                  <Avatar name="Hery Pratama" size={22} tone="info" />
                  <div className="flex-1 text-[13px] font-semibold">Hery Pratama · 0812-345-6789</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">PIC Nusaraya</div>
                <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2">
                  <Avatar name="Maya Saputri" size={22} tone="brand" />
                  <div className="flex-1 text-[13px] font-semibold">Maya Saputri · HR Lead</div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Dokumen wajib</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { ic:'file-text', n:'Kontrak utama',         st:'uploaded', sz:'2.4 MB' },
                { ic:'building-2',n:'Company profile',        st:'uploaded', sz:'1.1 MB' },
                { ic:'shield-check', n:'BPJS TK certificate', st:'uploaded', sz:'380 KB' },
                { ic:'upload',    n:'Halal cert (catering)', st:'optional', sz:'-' },
              ].map((d,i) => (
                <div key={i} className={`rounded-xl p-3 flex items-center gap-3 ${d.st==='uploaded'?'bg-success-50/50 border border-success-500/25':d.st==='optional'?'bg-elev border border-dashed border-token-strong':'bg-white border border-token-strong'}`}>
                  <Icon name={d.ic} size={16} className={d.st==='uploaded'?'text-success-600':'text-subtle'} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-bold truncate">{d.n}</div>
                    <div className="text-[10px] text-muted">{d.sz}</div>
                  </div>
                  {d.st==='uploaded' ? <Icon name="check-circle-2" size={16} className="text-success-500" /> : <Icon name="upload" size={16} className="text-subtle" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 h-16 border-t border-token flex items-center gap-3 shrink-0 bg-elev/40">
          <div className="text-[11px] text-muted flex items-center gap-1.5">
            <Icon name="save" size={13} /> Auto-saved 14:32
          </div>
          <div className="flex-1" />
          <Btn variant="ghost" size="sm" onClick={onClose}>Batal</Btn>
          <Btn variant="secondary" size="sm">Save draft</Btn>
          <Btn variant="primary" size="sm" iconRight="arrow-right">Save &amp; tambah worker</Btn>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// C4 — Contractor Detail (full page with tabs)
// ============================================================
function C4_ContractorDetail({ contractor, onClose }) {
  const c = contractor || CONTRACTORS[0];
  const cls = CLASS[c.cls];
  const [tab, setTab] = React.useState('overview');
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar current="contractor" />
      <div className="flex-1 flex flex-col min-w-0">
        <HRTopBar title={`${c.name}`} sub="Contractor detail" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[11.5px] text-muted">
              <button onClick={onClose} className="hover:underline">Contractors</button>
              <Icon name="chevron-right" size={11} />
              <span className="font-bold text-[color:var(--text)]">{c.short}</span>
            </div>

            {/* Hero */}
            <div className={`rounded-2xl p-5 bg-${cls.tone}-50 border border-${cls.tone}-500/20 flex items-center gap-5`}>
              <div className={`w-20 h-20 rounded-2xl bg-${cls.tone}-500 text-white flex items-center justify-center font-extrabold text-[24px]`}>
                {c.short.split(' ').filter(s=>s!=='PT'&&s!=='CV').map(s=>s[0]).slice(0,2).join('')}
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.16em] text-subtle font-bold mono">{c.id} · NPWP {c.npwp}</div>
                <div className="text-[24px] font-extrabold tracking-tight">{c.name}</div>
                <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                  <StatusPill tone={cls.tone} icon={cls.icon}>{cls.label}</StatusPill>
                  {c.status==='active'&&<StatusPill tone="success" icon="check-circle-2">Active</StatusPill>}
                  <StatusPill tone="info" icon="calendar">{c.period}</StatusPill>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Compliance score</div>
                <div className="text-[36px] font-extrabold mono text-success-700 leading-none">{c.score}%</div>
                <div className="flex items-center gap-px justify-end mt-1">
                  {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={13} className={s<=Math.round(c.score/20)?'text-cater-500 text-warning-500':'text-[color:var(--border-strong)]'} />)}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="surface rounded-xl">
              <div className="px-3 border-b border-token flex items-center overflow-x-auto">
                {[
                  { id:'overview',    l:'Overview',      ic:'layout-dashboard' },
                  { id:'workers',     l:'Workers',        ic:'users', n:c.workers },
                  { id:'documents',   l:'Documents',      ic:'file-text' },
                  { id:'compliance',  l:'Compliance',     ic:'shield-check' },
                  { id:'performance', l:'Performance',    ic:'trending-up' },
                  { id:'billing',     l:'Billing & SAP',  ic:'wallet' },
                ].map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`relative px-4 h-11 text-[12.5px] font-bold inline-flex items-center gap-2 whitespace-nowrap
                      ${tab===t.id ? 'text-brand-700' : 'text-muted hover:text-[color:var(--text)]'}`}>
                    <Icon name={t.ic} size={14} /> {t.l}
                    {t.n && <span className={`px-1.5 h-5 rounded text-[10px] font-bold ${tab===t.id?'bg-brand-50 text-brand-700':'bg-elev text-muted'}`}>{t.n}</span>}
                    {tab===t.id && <span className="absolute left-2 right-2 -bottom-px h-[2px] rounded bg-brand-500" />}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {tab === 'overview'   && <OverviewTab c={c} />}
                {tab === 'workers'    && <C5_WorkerListInContractor c={c} />}
                {tab === 'documents'  && <DocumentsTab c={c} />}
                {tab === 'compliance' && <ComplianceTabPerContractor c={c} />}
                {tab === 'performance'&& <PerformanceTab c={c} />}
                {tab === 'billing'    && <BillingTab c={c} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ c }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Scope kontrak</div>
          <div className="rounded-xl bg-elev p-4 text-[13px] leading-relaxed">
            Penyediaan jasa hauling batubara dari ROM stockpile ke Coal Pad Agra dengan rata-rata <span className="font-bold">1,200 ton/hari</span>. Kontraktor menyediakan <span className="font-bold">40 unit DT 30T</span> + crew lengkap (driver, mekanik, fuel). SLA availability ≥95%, MTBF target ≥48 jam.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { l:'Klasifikasi', v:CLASS[c.cls].label, ic:'layers' },
            { l:'Worker active',   v:c.workers.toString(), ic:'users' },
            { l:'Compliance rate', v:`${c.score}%`,         ic:'shield-check' },
            { l:'Kontrak periode', v:c.period,              ic:'calendar' },
            { l:'PIC Kontraktor',  v:'Hery Pratama',         ic:'user' },
            { l:'PIC Nusaraya',     v:'Maya Saputri',          ic:'user-check' },
          ].map((r,i) => (
            <div key={i} className="surface rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name={r.ic} size={16} /></div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{r.l}</div>
                <div className="text-[13px] font-extrabold">{r.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="surface rounded-xl p-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Recent activity</div>
          <div className="space-y-2 text-[11.5px]">
            {[
              { ic:'user-plus',     t:'12 worker baru di-onboard',         tm:'2 hari lalu', tone:'success' },
              { ic:'alert-triangle',t:'8 MCU akan expire dalam 30 hari',  tm:'kemarin',     tone:'warning' },
              { ic:'shield-check',  t:'Audit compliance Q1 selesai · 96%', tm:'5 hari lalu', tone:'success' },
              { ic:'file-text',     t:'Kontrak diperpanjang +12 bulan',    tm:'15 hari lalu',tone:'info' },
            ].map((r,i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Icon name={r.ic} size={14} className={`mt-0.5 text-${r.tone}-600`} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold leading-tight">{r.t}</div>
                  <div className="text-[10px] text-subtle">{r.tm}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// C5 — Worker List per Contractor (inside Detail tab)
// ============================================================
function C5_WorkerListInContractor({ c }) {
  const filtered = WORKERS.filter(w => w.ctr.includes(c.short.replace('PT ','').replace('CV ','')) || (c.short === 'PT KNC' && w.ctr === 'PT KNC') || (c.short === 'PT BWS' && w.ctr === 'PT BWS'));
  const stats = {
    active:  filtered.filter(w => w.status==='active').length,
    leave:   0,
    susp:    filtered.filter(w => w.status==='suspended').length,
    expiring:filtered.filter(w => w.status==='expiring').length,
  };
  return (
    <div className="space-y-4">
      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { l:'Active',     v:stats.active,    tone:'success' },
          { l:'Expiring',    v:stats.expiring,  tone:'warning' },
          { l:'Suspended',   v:stats.susp,      tone:'danger' },
          { l:'On leave',     v:stats.leave,     tone:'info' },
        ].map(s => (
          <div key={s.l} className="rounded-xl bg-elev p-3">
            <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{s.l}</div>
            <div className={`text-[22px] font-extrabold mono text-${s.tone}-700`}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Bulk action toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-brand-700 px-3 h-9 rounded-md bg-brand-50 border border-brand-200">
          <Icon name="check-square" size={13} /> 0 dipilih
        </div>
        <Btn variant="secondary" size="sm" icon="upload">Bulk add (CSV)</Btn>
        <Btn variant="secondary" size="sm" icon="calendar-plus">Schedule MCU</Btn>
        <Btn variant="secondary" size="sm" icon="graduation-cap">Schedule induction</Btn>
        <Btn variant="secondary" size="sm" icon="rotate-cw">Bulk extend access</Btn>
        <div className="flex-1" />
        <FilterChip icon="filter">Status</FilterChip>
        <Btn variant="primary" size="sm" icon="user-plus">Add worker</Btn>
      </div>

      <div className="surface rounded-xl overflow-hidden">
        <WorkerTable rows={filtered.length > 0 ? filtered : WORKERS} onPick={() => {}} />
      </div>
    </div>
  );
}

function DocumentsTab({ c }) {
  const docs = [
    { ic:'file-text',  n:'Master Service Agreement', sz:'2.4 MB · PDF', upd:'15 Jan 2024', tone:'success' },
    { ic:'file-text',  n:'Addendum 1 · Extension',    sz:'480 KB · PDF', upd:'12 Mei 2026', tone:'success' },
    { ic:'shield-check',n:'BPJS TK certificate',      sz:'380 KB · PDF', upd:'02 Jan 2026', tone:'success', expiry:'31 Des 2026' },
    { ic:'shield-check',n:'BPJS Kesehatan',           sz:'320 KB · PDF', upd:'02 Jan 2026', tone:'success', expiry:'31 Des 2026' },
    { ic:'building-2', n:'Company profile 2026',     sz:'1.1 MB · PDF', upd:'08 Feb 2026', tone:'success' },
    { ic:'badge',      n:'Halal cert (vendor)',      sz:'180 KB · PDF', upd:'14 Apr 2026', tone:'warning', expiry:'14 Sep 2026' },
    { ic:'file-text',  n:'Insurance liability',       sz:'520 KB · PDF', upd:'01 Mar 2026', tone:'success', expiry:'01 Mar 2027' },
    { ic:'file-text',  n:'Tax clearance certificate', sz:'240 KB · PDF', upd:'18 Apr 2026', tone:'warning' },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-[12px] text-muted">{docs.length} documents · 5.2 MB total</div>
        <Btn variant="primary" size="sm" icon="upload">Upload document</Btn>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {docs.map((d,i) => (
          <div key={i} className="surface rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg bg-${d.tone}-50 text-${d.tone}-600 flex items-center justify-center`}><Icon name={d.ic} size={18} /></div>
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-extrabold truncate">{d.n}</div>
                <div className="text-[10px] text-subtle">{d.sz} · {d.upd}</div>
              </div>
              <button className="w-7 h-7 rounded hover:bg-elev flex items-center justify-center"><Icon name="more-horizontal" size={14} className="text-subtle" /></button>
            </div>
            {d.expiry && (
              <div className="mt-2 flex items-center gap-1.5 text-[10.5px]">
                <Icon name="calendar" size={11} className="text-subtle" />
                <span className="text-muted">Valid until</span>
                <span className="font-bold mono">{d.expiry}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceTabPerContractor({ c }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 space-y-3">
        <div className="surface rounded-xl p-5 text-center">
          <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Compliance score</div>
          <div className="text-[64px] font-extrabold mono text-success-700 leading-none my-2">{c.score}%</div>
          <div className="text-[12px] text-muted">target ≥95%</div>
        </div>
        {[
          { l:'MCU compliance', v:'98%', tone:'success' },
          { l:'Training cert',   v:'92%', tone:'warning' },
          { l:'SIMPER',           v:'97%', tone:'success' },
          { l:'BPJS',              v:'100%', tone:'success' },
        ].map(r => (
          <div key={r.l} className="surface rounded-xl p-3 flex items-center justify-between">
            <div className="text-[12px] font-bold">{r.l}</div>
            <div className={`text-[14px] font-extrabold mono text-${r.tone}-700`}>{r.v}</div>
          </div>
        ))}
      </div>
      <div className="lg:col-span-2">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Audit findings · last 12 months</div>
        <div className="surface rounded-xl divide-y divide-[color:var(--border)]">
          {[
            { d:'12 Mar 2026', f:'Documentation incomplete — 3 worker tanpa MCU update', sev:'medium', closed:true },
            { d:'08 Jan 2026', f:'2 worker access tanpa training induction valid', sev:'high', closed:true },
            { d:'15 Nov 2025', f:'Reporting delay BPJS · 14 hari',                 sev:'low', closed:true },
            { d:'02 Sep 2025', f:'1 incident reported · no LTI',                    sev:'medium', closed:true },
          ].map((f,i) => (
            <div key={i} className="px-4 py-3 flex items-start gap-3">
              <Icon name="alert-circle" size={16} className={`mt-0.5 ${f.sev==='high'?'text-danger-500':f.sev==='medium'?'text-warning-500':'text-info-500'}`} />
              <div className="flex-1">
                <div className="text-[12.5px] font-bold">{f.f}</div>
                <div className="text-[10.5px] text-muted">{f.d}</div>
              </div>
              <StatusPill tone={f.closed?'success':'warning'} size="sm" icon={f.closed?'check-circle-2':'clock'}>{f.closed?'Closed':'Open'}</StatusPill>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformanceTab({ c }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l:'SLA availability', v:'96.4%',   t:'target ≥95%', tone:'success', d:'+0.6%' },
          { l:'MTBF',              v:'52j',     t:'target ≥48j', tone:'success', d:'+4j' },
          { l:'Incident rate',     v:'0.8',      t:'per 100K hrs',tone:'success', d:'-0.2' },
          { l:'On-time delivery',  v:'94.2%',   t:'120 trips',    tone:'success', d:'+1.8%' },
        ].map(s => (
          <div key={s.l} className="surface rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{s.l}</div>
            <div className={`text-[26px] font-extrabold mono text-${s.tone}-700`}>{s.v}</div>
            <div className="flex items-center justify-between text-[10.5px] mt-1">
              <span className="text-muted">{s.t}</span>
              <span className="text-success-700 font-bold">{s.d}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="surface rounded-xl p-5">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Performance trend · 12 bulan</div>
        <div className="h-32 flex items-end gap-1.5">
          {[88,90,91,93,92,94,95,93,96,94,96,96].map((v,i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t bg-brand-500" style={{ height:`${v*1.1}px`, opacity: i===11?1:0.65 }} />
              <div className="text-[9px] text-subtle">{['J','F','M','A','M','J','J','A','S','O','N','D'][(i+5)%12]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillingTab({ c }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-info-50 border border-info-500/25 p-3 flex items-center gap-3">
        <Icon name="info" size={18} className="text-info-600" />
        <div className="flex-1 text-[12px] text-info-700">
          <span className="font-extrabold">Read-only mirror</span> dari SAP FI module · sync setiap 6 jam.
        </div>
        <Btn variant="ghost" size="sm" icon="external-link">Buka SAP FI</Btn>
      </div>
      <div className="surface rounded-xl overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
              <th className="px-5 py-2.5">Invoice</th>
              <th className="px-3 py-2.5">Periode</th>
              <th className="px-3 py-2.5">Amount</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--border)]">
            {[
              { i:'INV-2026-0421', p:'Apr 2026',  amt:'Rp 1,284,500,000', s:'paid',     t:'12 Mei 2026' },
              { i:'INV-2026-0388', p:'Mar 2026',  amt:'Rp 1,198,200,000', s:'paid',     t:'14 Apr 2026' },
              { i:'INV-2026-0335', p:'Feb 2026',  amt:'Rp 1,142,800,000', s:'paid',     t:'13 Mar 2026' },
              { i:'INV-2026-0312', p:'Jan 2026',  amt:'Rp 1,068,400,000', s:'paid',     t:'15 Feb 2026' },
              { i:'INV-2026-0461', p:'Mei 2026',  amt:'Rp 1,310,000,000', s:'pending',  t:'pending'    },
            ].map((r,i) => (
              <tr key={i} className="hover:bg-elev">
                <td className="px-5 py-2.5 mono font-bold">{r.i}</td>
                <td className="px-3 py-2.5">{r.p}</td>
                <td className="px-3 py-2.5 mono font-bold">{r.amt}</td>
                <td className="px-3 py-2.5"><StatusPill tone={r.s==='paid'?'success':'warning'} size="sm" icon={r.s==='paid'?'check-circle-2':'clock'}>{r.s==='paid'?'Paid':'Pending'}</StatusPill></td>
                <td className="px-3 py-2.5 text-muted">{r.t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// C6 — Bulk Upload Workers (CSV)
// ============================================================
function C6_BulkUpload({ onClose }) {
  const preview = [
    { row:1,   ktp:'3201234567890001', name:'Andi Wijaya',     pos:'Driver DT',   cert:'SIMPER B · 12-08-2027',  status:'valid' },
    { row:2,   ktp:'3201234567890002', name:'Bambang Hartono',  pos:'Operator',    cert:'SIMPER A · 22-11-2026',  status:'valid' },
    { row:3,   ktp:'3201234567890003', name:'Chandra Kusuma',   pos:'Mekanik',     cert:'K3L · 30-06-2026',        status:'warn',   note:'MCU expiring 12 hari' },
    { row:4,   ktp:'3201234567890004', name:'Dewi Permata',     pos:'Admin',       cert:'-',                        status:'valid' },
    { row:5,   ktp:'320123456789---',  name:'Eko Saputra',      pos:'Welder',      cert:'Welder 3G',                status:'error',  note:'KTP format salah' },
    { row:6,   ktp:'3201234567890001', name:'Andi W. (dup)',     pos:'Driver',      cert:'-',                        status:'error',  note:'Duplicate KTP' },
    { row:7,   ktp:'3201234567890007', name:'Gita Saraswati',   pos:'Cook',        cert:'Food Handler · 18-04-2026',status:'warn',   note:'Cert expired 28 hari lalu' },
  ];
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar current="contractor" />
      <div className="flex-1 flex flex-col min-w-0">
        <HRTopBar title="Bulk upload workers" sub="PT KNC · Hauling" />
        <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11.5px] text-muted">
            <button onClick={onClose} className="hover:underline">Contractors</button>
            <Icon name="chevron-right" size={11} />
            <button onClick={onClose} className="hover:underline">PT KNC</button>
            <Icon name="chevron-right" size={11} />
            <span className="font-bold text-[color:var(--text)]">Bulk upload</span>
          </div>

          {/* Step 1: Upload */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
            <div className="surface rounded-xl p-5">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">1. Upload CSV / Excel</div>
              <div className="rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/40 p-8 text-center">
                <Icon name="upload-cloud" size={40} className="text-brand-500 mx-auto" />
                <div className="mt-3 text-[14px] font-extrabold">Drop file di sini atau klik untuk pilih</div>
                <div className="text-[11px] text-muted mt-1">.xlsx atau .csv · max 5 MB · sampai 5,000 rows</div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-white border border-token text-[12px] font-bold text-brand-700">
                  <Icon name="file-text" size={14} /> KNC-workers-Mei-2026.xlsx (412 KB)
                </div>
              </div>
              {/* Summary */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[
                  { l:'Total rows', v:'1,250', tone:'brand' },
                  { l:'Valid',       v:'1,180', tone:'success' },
                  { l:'Warnings',    v:'50',     tone:'warning' },
                  { l:'Errors',      v:'20',     tone:'danger' },
                ].map(s => (
                  <div key={s.l} className="rounded-xl bg-elev p-3 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{s.l}</div>
                    <div className={`text-[22px] font-extrabold mono text-${s.tone}-700`}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="surface rounded-xl p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Download template</div>
                <div className="text-[12px] text-muted mb-3">Pakai template Excel kami agar mapping field otomatis.</div>
                <Btn variant="secondary" size="sm" full icon="download">Excel template (kosong)</Btn>
                <Btn variant="ghost" size="sm" full icon="download" className="mt-1">Template dengan contoh</Btn>
              </div>
              <div className="surface rounded-xl p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Required fields</div>
                <ul className="text-[11.5px] space-y-1">
                  {['KTP (16 digit unik)','Nama lengkap','Posisi','Tanggal lahir','Kontraktor parent','Tanggal masuk'].map(f =>
                    <li key={f} className="flex items-center gap-1.5"><Icon name="check" size={11} className="text-success-500" /> {f}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="surface rounded-xl overflow-hidden">
            <div className="px-5 h-12 border-b border-token flex items-center gap-3">
              <Icon name="table" size={16} className="text-brand-500" />
              <div className="text-[13px] font-bold tracking-tight">2. Preview · 1,250 rows</div>
              <div className="flex items-center gap-2 ml-3">
                <FilterChip icon="filter" active>Semua</FilterChip>
                <FilterChip icon="check-circle-2">Valid (1,180)</FilterChip>
                <FilterChip icon="alert-triangle">Warnings (50)</FilterChip>
                <FilterChip icon="x-circle">Errors (20)</FilterChip>
              </div>
              <div className="flex-1" />
              <span className="text-[10px] text-subtle mono">menampilkan 7 dari 1,250</span>
            </div>
            <table className="w-full text-[11.5px]">
              <thead>
                <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev/60">
                  <th className="px-5 py-2 w-12">Row</th>
                  <th className="px-3 py-2">KTP</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Position</th>
                  <th className="px-3 py-2">Cert</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border)]">
                {preview.map((r,i) => {
                  const bg = r.status==='error'?'bg-danger-50/50':r.status==='warn'?'bg-warning-50/50':'';
                  return (
                    <tr key={i} className={bg}>
                      <td className="px-5 py-2 mono text-subtle">{r.row}</td>
                      <td className="px-3 py-2 mono">{r.ktp}</td>
                      <td className="px-3 py-2 font-bold">{r.name}</td>
                      <td className="px-3 py-2">{r.pos}</td>
                      <td className="px-3 py-2 mono">{r.cert}</td>
                      <td className="px-3 py-2">
                        {r.status==='valid' && <StatusPill tone="success" size="sm" icon="check-circle-2">Valid</StatusPill>}
                        {r.status==='warn'  && <span className="inline-flex items-center gap-1.5"><StatusPill tone="warning" size="sm" icon="alert-triangle">Warning</StatusPill><span className="text-[10px] text-warning-700">{r.note}</span></span>}
                        {r.status==='error' && <span className="inline-flex items-center gap-1.5"><StatusPill tone="danger" size="sm" icon="x-circle">Error</StatusPill><span className="text-[10px] text-danger-700">{r.note}</span></span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-5 h-14 border-t border-token bg-elev/40 flex items-center gap-2">
              <div className="text-[11.5px] text-muted">
                <span className="font-extrabold text-success-700">1,180 valid</span> akan di-import.
                <span className="font-extrabold text-warning-700 ml-2">50 warning</span> akan di-import dengan flag.
                <span className="font-extrabold text-danger-700 ml-2">20 error</span> akan di-skip.
              </div>
              <div className="flex-1" />
              <Btn variant="ghost" size="sm" icon="download">Error report</Btn>
              <Btn variant="primary" size="sm" icon="check">Import 1,230 rows</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.C1_Dashboard       = C1_Dashboard;
window.C3_AddContractor   = C3_AddContractor;
window.C4_ContractorDetail= C4_ContractorDetail;
window.C6_BulkUpload      = C6_BulkUpload;
window.WorkerTable        = WorkerTable;
