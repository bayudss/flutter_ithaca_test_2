// Contractor — Worker detail drawer (C7) with tabs (C8, C9, C10).

// ============================================================
// C7 — Worker Detail Drawer (with multi-tab)
// ============================================================
function C7_WorkerDrawer({ worker, onClose }) {
  const w = worker || WORKERS[0];
  const [tab, setTab] = React.useState('certs');

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="w-[920px] max-w-full bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Hero header */}
        <div className="px-5 py-4 border-b border-token bg-gradient-to-r from-brand-700 to-brand-500 text-white shrink-0">
          <div className="flex items-start gap-4">
            <button onClick={onClose} className="w-9 h-9 rounded-md bg-white/15 hover:bg-white/25 flex items-center justify-center"><Icon name="x" size={18} /></button>
            <Avatar name={w.name} size={64} tone={w.tone} />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-80">{w.id}</div>
              <div className="text-[24px] font-extrabold tracking-tight leading-tight">{w.name}</div>
              <div className="text-[12px] opacity-85 mt-0.5">{w.pos} · {w.ctr} · joined {w.joined}</div>
              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                {w.status==='active'    && <StatusPill tone="success" icon="check-circle-2">Active</StatusPill>}
                {w.status==='expiring'  && <StatusPill tone="warning" icon="alert-triangle">Expiring</StatusPill>}
                {w.status==='suspended' && <StatusPill tone="danger"  icon="ban">Suspended</StatusPill>}
                <StatusPill tone="dark" icon="badge">QR ID ready</StatusPill>
                <StatusPill tone="dark" icon="map-pin">{w.areas.length} area authorized</StatusPill>
                {w.flag && <span className="px-2 h-6 rounded bg-danger-500 text-white text-[10px] font-extrabold inline-flex items-center gap-1"><Icon name="alert-triangle" size={11} /> {w.flag}</span>}
              </div>
            </div>
            {/* QR */}
            <div className="bg-white rounded-lg p-1.5 shrink-0">
              <QRCode size={84} accent="#0F273E" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3 border-b border-token shrink-0 overflow-x-auto">
          <div className="flex items-center min-w-max">
            {[
              { id:'info',   l:'Personal info',  ic:'user' },
              { id:'certs',  l:'Certifications', ic:'award', n:w.certs.length },
              { id:'mcu',    l:'MCU',            ic:'heart-pulse' },
              { id:'simper', l:'SIMPER',          ic:'car' },
              { id:'insurance',l:'Insurance',     ic:'shield-check' },
              { id:'access', l:'Access',          ic:'key-round' },
              { id:'activity',l:'Activity',        ic:'activity' },
              { id:'docs',   l:'Documents',        ic:'file-text' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`relative px-3 h-11 text-[12px] font-bold inline-flex items-center gap-1.5 whitespace-nowrap
                  ${tab===t.id ? 'text-brand-700' : 'text-muted hover:text-[color:var(--text)]'}`}>
                <Icon name={t.ic} size={13} /> {t.l}
                {t.n && <span className={`px-1.5 h-4 rounded text-[9px] font-bold ${tab===t.id?'bg-brand-50 text-brand-700':'bg-elev text-muted'}`}>{t.n}</span>}
                {tab===t.id && <span className="absolute left-2 right-2 -bottom-px h-[2px] rounded bg-brand-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 bg-elev/40">
          {tab === 'info'      && <Tab_PersonalInfo w={w} />}
          {tab === 'certs'     && <Tab_Certifications w={w} />}
          {tab === 'mcu'       && <Tab_MCU w={w} />}
          {tab === 'simper'    && <Tab_SIMPER w={w} />}
          {tab === 'insurance' && <Tab_Insurance w={w} />}
          {tab === 'access'    && <Tab_AccessAuth w={w} />}
          {tab === 'activity'  && <Tab_Activity w={w} />}
          {tab === 'docs'      && <Tab_Documents w={w} />}
        </div>

        {/* Footer actions */}
        <div className="h-14 px-5 border-t border-token bg-white flex items-center gap-2 shrink-0">
          <Btn variant="ghost" size="sm" icon="printer">Print ID card</Btn>
          <Btn variant="ghost" size="sm" icon="download">Export profile</Btn>
          <div className="flex-1" />
          {w.status==='suspended'
            ? <Btn variant="success" size="sm" icon="unlock">Lift suspension</Btn>
            : <Btn variant="outlineDanger" size="sm" icon="ban">Suspend access</Btn>}
          <Btn variant="primary" size="sm" icon="edit-3">Edit worker</Btn>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Personal info tab
// ============================================================
function Tab_PersonalInfo({ w }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="surface rounded-xl p-5 col-span-2">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Identitas</div>
        <div className="grid grid-cols-3 gap-y-3 gap-x-4">
          {[
            { l:'Nama lengkap', v:w.name, ic:'user' },
            { l:'KTP',            v:'32012345678 90001', ic:'id-card', mono:true },
            { l:'Tanggal lahir',  v:`14 Mar 19${100-w.age+26}`, ic:'cake' },
            { l:'Jenis kelamin',  v:w.name.includes('Lina')||w.name.includes('Rina')||w.name.includes('Henny')?'Perempuan':'Laki-laki', ic:'user' },
            { l:'Worker ID',      v:w.id, ic:'badge', mono:true },
            { l:'Tanggal masuk',  v:w.joined, ic:'calendar' },
          ].map((r,i) => (
            <div key={i}>
              <div className="text-[10px] uppercase tracking-wider text-subtle font-bold flex items-center gap-1.5"><Icon name={r.ic} size={11} /> {r.l}</div>
              <div className={`text-[14px] font-extrabold mt-0.5 ${r.mono?'mono':''}`}>{r.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-token">
          <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Alamat domisili</div>
          <div className="text-[13px]">Jl. Mayjend Sutoyo No. 42, RT 04 RW 02, Kelurahan Sungai Pinang Dalam, Kecamatan Sungai Pinang, Kota Samarinda, Kalimantan Timur 75116</div>
        </div>
      </div>
      <div className="surface rounded-xl p-5">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Employment</div>
        <div className="space-y-2.5 text-[12.5px]">
          <div className="flex items-center justify-between"><span className="text-muted">Contractor</span><span className="font-bold">{w.ctr}</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">Department</span><span className="font-bold">{w.dept}</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">Position</span><span className="font-bold">{w.pos}</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">Supervisor</span><span className="font-bold">Hadi Wijaya</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">Worker type</span><span className="font-bold">Kontraktor permanent</span></div>
        </div>
      </div>
      <div className="surface rounded-xl p-5">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Emergency contact</div>
        <div className="flex items-center gap-3">
          <Avatar name="Siti Wahyu" size={40} tone="warning" />
          <div className="flex-1">
            <div className="text-[13px] font-bold">Siti Wahyu</div>
            <div className="text-[11px] text-muted">Istri · 0812-3456-7890</div>
          </div>
          <button className="w-9 h-9 rounded-md bg-elev hover:bg-white border border-token text-brand-700 flex items-center justify-center"><Icon name="phone" size={16} /></button>
        </div>
        <div className="mt-4 pt-4 border-t border-token space-y-2 text-[11.5px]">
          <div className="flex items-center justify-between"><span className="text-muted inline-flex items-center gap-1.5"><Icon name="droplet" size={11} /> Golongan darah</span><span className="font-bold">O+</span></div>
          <div className="flex items-center justify-between"><span className="text-muted inline-flex items-center gap-1.5"><Icon name="alert-circle" size={11} /> Alergi</span><span className="font-bold">Tidak ada</span></div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// C8 — Certifications tab
// ============================================================
function Tab_Certifications({ w }) {
  const certs = [
    { name:'Welder Class 3G SMAW',    type:'Technical', issuer:'PT Tridaya Wira Training', issued:'14 Apr 2025', valid:'14 Apr 2027', days:42, doc:'WELD-3G-2025-0142.pdf' },
    { name:'K3 Pertambangan Madya',   type:'Mandatory', issuer:'BNSP Kemnaker',             issued:'08 Aug 2024', valid:'08 Aug 2026', days:88, doc:'K3-MADYA-2024-3018.pdf' },
    { name:'MCU Pre-employment',      type:'Health',     issuer:'Klinik Mitra Bahari',       issued:'12 Mar 2024', valid:'15 Mar 2027', days:296, doc:'MCU-PE-2024-1234.pdf' },
    { name:'First Aid & CPR',          type:'Optional',   issuer:'PMI Cabang Samarinda',      issued:'22 Sep 2025', valid:'22 Sep 2027', days:185, doc:'FA-CPR-2025-0892.pdf' },
    { name:'Confined Space Entry',     type:'Technical',  issuer:'PT Tridaya Wira Training', issued:'18 Feb 2025', valid:'18 Feb 2026', days:-90, doc:'CS-ENT-2025-0421.pdf', expired:true },
    { name:'Defensive Driving',         type:'Optional',   issuer:'PT Safety Indonesia',       issued:'10 Jan 2025', valid:'10 Jan 2027', days:235, doc:'DD-2025-0118.pdf' },
  ];
  return (
    <div className="space-y-4">
      {/* Top action */}
      <div className="flex items-center gap-2">
        <div className="text-[12px] text-muted"><span className="font-extrabold text-[color:var(--text)]">{certs.length}</span> sertifikat · {certs.filter(c=>c.days>0&&c.days<30).length} expiring · {certs.filter(c=>c.expired).length} expired</div>
        <div className="flex-1" />
        <Btn variant="ghost" size="sm" icon="upload-cloud">OCR auto-fill</Btn>
        <Btn variant="primary" size="sm" icon="plus">Add certification</Btn>
      </div>

      {/* Cert cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {certs.map((c,i) => {
          const tone = c.days < 0 ? 'danger' : c.days < 30 ? 'warning' : 'success';
          const typeColor = { Technical:'safety', Mandatory:'info', Health:'success', Optional:'gray' }[c.type];
          return (
            <div key={i} className={`surface rounded-xl p-4 ${c.expired?'opacity-90 ring-1 ring-danger-500/30':''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${tone}-50 text-${tone}-700 flex items-center justify-center`}>
                  <Icon name={c.expired?'x-circle':c.days<30?'alert-triangle':'shield-check'} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    <StatusPill tone={typeColor} size="sm">{c.type}</StatusPill>
                  </div>
                  <div className="text-[14px] font-extrabold tracking-tight leading-tight">{c.name}</div>
                  <div className="text-[10.5px] text-muted">{c.issuer}</div>
                </div>
                <button className="w-7 h-7 rounded hover:bg-elev flex items-center justify-center"><Icon name="more-horizontal" size={14} className="text-subtle" /></button>
              </div>

              <div className="mt-3">
                <CertProgress days={c.days} size="sm" />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[10.5px]">
                <div>
                  <div className="text-subtle uppercase tracking-wider font-bold">Issued</div>
                  <div className="font-bold mono">{c.issued}</div>
                </div>
                <div>
                  <div className="text-subtle uppercase tracking-wider font-bold">Valid until</div>
                  <div className="font-bold mono">{c.valid}</div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-token flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-2 h-7 rounded bg-elev text-[10.5px] font-bold text-brand-700"><Icon name="file-text" size={11} /> {c.doc}</button>
                <div className="flex-1" />
                {c.expired && <Btn variant="danger" size="sm" icon="rotate-cw">Renew</Btn>}
                {!c.expired && c.days < 30 && <Btn variant="secondary" size="sm" icon="calendar-plus">Schedule renew</Btn>}
              </div>
            </div>
          );
        })}
      </div>

      {/* OCR add card */}
      <div className="rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/30 p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-brand-500 text-white flex items-center justify-center"><Icon name="sparkles" size={22} /></div>
          <div className="flex-1">
            <div className="text-[14px] font-extrabold">Add via OCR auto-fill <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-warning-500 text-white ml-1">Phase 3</span></div>
            <div className="text-[12px] text-muted">Upload scan sertifikat — sistem auto-detect cert type, issuer, tanggal issued, dan valid until.</div>
          </div>
          <Btn variant="primary" size="sm" icon="upload">Upload scan</Btn>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// C9 — MCU tab
// ============================================================
function Tab_MCU({ w }) {
  const expired = w.mcuDays < 0;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Current MCU hero */}
      <div className={`lg:col-span-2 rounded-2xl p-5 ${expired?'bg-danger-50 border border-danger-500/30':'bg-success-50 border border-success-500/30'}`}>
        <div className="flex items-center gap-2 mb-2">
          <Icon name="heart-pulse" size={18} className={expired?'text-danger-600':'text-success-600'} />
          <div className={`text-[11px] font-extrabold uppercase tracking-[0.16em] ${expired?'text-danger-700':'text-success-700'}`}>Status MCU saat ini</div>
        </div>
        <div className={`text-[36px] font-extrabold tracking-tight leading-none ${expired?'text-danger-700':'text-success-700'}`}>
          {expired ? 'EXPIRED · BLOCK ACCESS' : 'FIT FOR WORK'}
        </div>
        <div className={`text-[13px] mt-1 ${expired?'text-danger-700':'text-success-700'}`}>
          {expired ? `MCU expired ${Math.abs(w.mcuDays)} hari yang lalu — worker harus segera scheduled` : `Valid sampai ${w.mcuValid} (${w.mcuDays} hari tersisa)`}
        </div>
        <div className="mt-4">
          <CertProgress days={w.mcuDays} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-token text-[11.5px]">
          <div>
            <div className="text-subtle uppercase tracking-wider font-bold text-[10px]">Tanggal MCU terakhir</div>
            <div className="font-bold mono mt-0.5">15 Mar 2026</div>
          </div>
          <div>
            <div className="text-subtle uppercase tracking-wider font-bold text-[10px]">Klinik</div>
            <div className="font-bold mt-0.5">Klinik Mitra Bahari</div>
          </div>
          <div>
            <div className="text-subtle uppercase tracking-wider font-bold text-[10px]">Tipe</div>
            <div className="font-bold mt-0.5">Periodic annual</div>
          </div>
        </div>

        {/* Restrictions */}
        <div className="mt-4 rounded-xl bg-warning-50 border border-warning-500/30 p-3 flex items-start gap-3">
          <Icon name="alert-triangle" size={18} className="text-warning-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-[11.5px] text-warning-700">
            <div className="font-extrabold">Restrictions:</div>
            <div>No working at height &gt; 6m · auto-flag untuk PTW-WH (Work at Height) di approval flow.</div>
          </div>
        </div>
      </div>

      {/* Schedule next */}
      <div className="surface rounded-xl p-5">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Schedule MCU berikutnya</div>
        <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2 mb-2">
          <Icon name="calendar" size={16} className="text-subtle" />
          <div className="flex-1 text-[13px] font-semibold mono">12 Mar 2027</div>
        </div>
        <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2 mb-2">
          <Icon name="building-2" size={16} className="text-subtle" />
          <div className="flex-1 text-[13px] font-semibold">Klinik Mitra Bahari</div>
        </div>
        <div className="text-[10.5px] text-muted mb-3">Worker akan dapat email + push notif H-30, H-14, H-7, H-1.</div>
        <Btn variant="primary" size="sm" full icon="calendar-plus">Jadwalkan + kirim invite</Btn>

        <div className="mt-5 pt-4 border-t border-token">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Integration <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-warning-500 text-white">Phase 3</span></div>
          <div className="text-[11px] text-muted">Sync otomatis dengan vendor MCU via API — Klinik Mitra Bahari sudah connected.</div>
        </div>
      </div>

      {/* History */}
      <div className="lg:col-span-3 surface rounded-xl overflow-hidden">
        <div className="px-5 h-11 border-b border-token flex items-center gap-3">
          <Icon name="history" size={16} className="text-brand-500" />
          <div className="text-[13px] font-bold tracking-tight">MCU history · {w.name}</div>
          <div className="flex-1" />
          <Btn variant="ghost" size="sm" icon="download">Export PDF</Btn>
        </div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
              <th className="px-5 py-2.5">Tanggal MCU</th>
              <th className="px-3 py-2.5">Tipe</th>
              <th className="px-3 py-2.5">Klinik</th>
              <th className="px-3 py-2.5">Result</th>
              <th className="px-3 py-2.5">Valid until</th>
              <th className="px-3 py-2.5">Document</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--border)]">
            {[
              { d:'15 Mar 2026', t:'Periodic annual',   c:'Klinik Mitra Bahari', r:'FIT',          v:'15 Mar 2027', doc:'MCU-2026-0421.pdf', tone:'success' },
              { d:'12 Mar 2025', t:'Periodic annual',   c:'Klinik Mitra Bahari', r:'FIT (restrict)',v:'15 Mar 2026', doc:'MCU-2025-0318.pdf', tone:'warning' },
              { d:'18 Aug 2024', t:'Post-incident',     c:'RS Site Bahana',     r:'FIT',          v:'-',           doc:'MCU-2024-0892.pdf', tone:'success' },
              { d:'12 Mar 2024', t:'Pre-employment',     c:'Klinik Mitra Bahari', r:'FIT',          v:'15 Mar 2025', doc:'MCU-PE-2024.pdf',   tone:'success' },
            ].map((r,i) => (
              <tr key={i} className="hover:bg-elev">
                <td className="px-5 py-2.5 mono font-bold">{r.d}</td>
                <td className="px-3 py-2.5">{r.t}</td>
                <td className="px-3 py-2.5">{r.c}</td>
                <td className="px-3 py-2.5"><StatusPill tone={r.tone} size="sm" icon={r.tone==='success'?'check-circle-2':'alert-triangle'}>{r.r}</StatusPill></td>
                <td className="px-3 py-2.5 mono">{r.v}</td>
                <td className="px-3 py-2.5"><button className="text-brand-700 font-bold text-[10.5px] inline-flex items-center gap-1"><Icon name="file-text" size={11} /> {r.doc}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// SIMPER tab
// ============================================================
function Tab_SIMPER({ w }) {
  if (w.simperClass === '-') {
    return (
      <div className="surface rounded-xl p-8 text-center">
        <Icon name="car" size={40} className="text-subtle mx-auto mb-3" />
        <div className="text-[14px] font-bold text-muted">Worker ini tidak memiliki SIMPER</div>
        <div className="text-[11.5px] text-subtle mt-1">SIMPER hanya untuk operator equipment / driver.</div>
        <Btn variant="primary" size="sm" icon="plus" className="mt-4">Add SIMPER</Btn>
      </div>
    );
  }
  const classes = [
    { k:'A', label:'Excavator, Bulldozer', has:w.simperClass==='A' },
    { k:'B', label:'Dump Truck, Hauling',  has:w.simperClass==='B' },
    { k:'C', label:'Crane, Forklift',       has:w.simperClass==='C' },
    { k:'D', label:'Light Vehicle',         has:w.simperClass==='D' },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="surface rounded-xl overflow-hidden">
        {/* SIMPER card mock */}
        <div className="p-5 text-white relative overflow-hidden" style={{ background:'linear-gradient(135deg, #1F4E79 0%, #143452 100%)' }}>
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="car" size={14} className="text-safety-300" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-safety-300">SIMPER Class {w.simperClass}</span>
            </div>
            <div className="text-[20px] font-extrabold tracking-tight">{w.name}</div>
            <div className="text-[12px] opacity-80 mono">SMP-2024-NSR-{w.id.slice(-5)}</div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <div className="opacity-70 uppercase tracking-wider font-bold text-[9px]">Issued</div>
                <div className="font-bold mono">14 Aug 2024</div>
              </div>
              <div>
                <div className="opacity-70 uppercase tracking-wider font-bold text-[9px]">Valid until</div>
                <div className="font-bold mono">{w.simperValid}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Issuer</div>
          <div className="text-[13px] font-bold mb-3">Departemen K3LL · Nusaraya Mining</div>
          <div className="grid grid-cols-2 gap-2">
            <Btn variant="secondary" size="sm" icon="file-text">Lihat sertifikat</Btn>
            <Btn variant="ghost" size="sm" icon="printer">Print kartu</Btn>
          </div>
        </div>
      </div>
      <div className="surface rounded-xl p-5">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Klasifikasi SIMPER</div>
        <div className="space-y-2">
          {classes.map(c => (
            <div key={c.k} className={`rounded-lg p-3 flex items-center gap-3 ${c.has?'bg-success-50 border border-success-500/25':'bg-elev border border-token'}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-[16px] ${c.has?'bg-success-500 text-white':'bg-white border border-token-strong text-muted'}`}>{c.k}</div>
              <div className="flex-1">
                <div className="text-[13px] font-bold">Class {c.k} — {c.label}</div>
                {c.has && <div className="text-[10.5px] text-success-700 font-bold">Authorized</div>}
              </div>
              {c.has ? <Icon name="check-circle-2" size={18} className="text-success-500" /> : <span className="text-[10px] text-subtle font-bold">Tidak ada</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Insurance tab
// ============================================================
function Tab_Insurance({ w }) {
  const items = [
    { l:'BPJS Ketenagakerjaan', no:'01-7821-9087-1234', valid:'31 Des 2026', class:'Pekerja kontrak', cov:['JKK','JKM','JHT','JP'], tone:'success' },
    { l:'BPJS Kesehatan',         no:'00012345678901',    valid:'-',           class:'PBPU Kelas 2',     cov:['Rawat jalan','Rawat inap','Obat'], tone:'success' },
    { l:'Asuransi tambahan',      no:'PASR-2024-NSR-09281', valid:'31 Des 2026', class:'PT Asuransi Sentral', cov:['Kecelakaan kerja','Disability'], tone:'success' },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {items.map((it,i) => (
        <div key={i} className="surface rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg bg-${it.tone}-50 text-${it.tone}-700 flex items-center justify-center`}><Icon name="shield-check" size={18} /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-extrabold">{it.l}</div>
              <div className="text-[10px] text-muted mono truncate">{it.no}</div>
            </div>
            <StatusPill tone={it.tone} size="sm" icon="check-circle-2">Active</StatusPill>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10.5px] mb-3">
            <div>
              <div className="text-subtle uppercase tracking-wider font-bold">Kelas</div>
              <div className="font-bold mt-0.5">{it.class}</div>
            </div>
            <div>
              <div className="text-subtle uppercase tracking-wider font-bold">Valid until</div>
              <div className="font-bold mono mt-0.5">{it.valid}</div>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Coverage</div>
          <div className="flex flex-wrap gap-1">
            {it.cov.map(c => <span key={c} className={`px-1.5 h-5 rounded bg-${it.tone}-50 text-${it.tone}-700 text-[10px] font-bold inline-flex items-center`}>{c}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// C10 — Access Authorization tab
// ============================================================
function Tab_AccessAuth({ w }) {
  const areas = [
    { l:'PIT Bahana',       auth:w.areas.includes('PIT'),     note:'Shift pagi/siang/malam' },
    { l:'PIT Nagari',       auth:false,                        note:'Required additional training' },
    { l:'Coal Pad Agra',    auth:w.areas.includes('PIT'),     note:'-' },
    { l:'OLC (Overland Conveyor)', auth:w.areas.includes('OLC'), note:'-' },
    { l:'Port Bahana',      auth:false,                        note:'Restricted area · auth khusus' },
    { l:'Workshop',         auth:w.areas.includes('Workshop'), note:'-' },
    { l:'Mess Griya Praja', auth:w.areas.includes('Mess'),    note:'-' },
    { l:'Office Block A',   auth:true,                         note:'-' },
    { l:'Tangki BBM',       auth:w.areas.includes('Tank BBM'), note:'CS entry required' },
  ];
  const equips = [
    { l:'Excavator',    req:'SIMPER A', auth:w.simperClass==='A' },
    { l:'Dump Truck',   req:'SIMPER B', auth:w.simperClass==='B' },
    { l:'Crane',         req:'SIMPER C', auth:w.simperClass==='C' },
    { l:'Forklift',      req:'SIMPER C', auth:w.simperClass==='C' },
    { l:'Light Vehicle', req:'SIMPER D', auth:w.simperClass==='D' },
  ];
  return (
    <div className="space-y-4">
      {/* Areas matrix */}
      <div className="surface rounded-xl overflow-hidden">
        <div className="px-5 h-11 border-b border-token flex items-center gap-3">
          <Icon name="map-pin" size={16} className="text-brand-500" />
          <div className="text-[13px] font-bold tracking-tight">Access per area</div>
          <div className="flex-1" />
          <Btn variant="ghost" size="sm" icon="edit-3">Edit access</Btn>
        </div>
        <div className="grid grid-cols-3">
          {areas.map((a,i) => (
            <div key={i} className={`p-4 border-r border-b border-token last:border-r-0 ${a.auth?'':'opacity-70'}`}>
              <div className="flex items-center gap-2 mb-1">
                {a.auth ? <Icon name="check-circle-2" size={16} className="text-success-500" /> : <Icon name="x-circle" size={16} className="text-danger-500" />}
                <span className="text-[13px] font-extrabold flex-1">{a.l}</span>
              </div>
              <div className="text-[10.5px] text-muted ml-6">{a.note}</div>
              {!a.auth && a.note.includes('training') && (
                <button className="ml-6 mt-1 text-[10px] font-bold text-brand-700 underline">Schedule training →</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Equipment access */}
      <div className="surface rounded-xl overflow-hidden">
        <div className="px-5 h-11 border-b border-token flex items-center gap-3">
          <Icon name="truck" size={16} className="text-safety-600" />
          <div className="text-[13px] font-bold tracking-tight">Authorized equipment</div>
        </div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
              <th className="px-5 py-2.5">Equipment</th>
              <th className="px-3 py-2.5">Required cert</th>
              <th className="px-3 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--border)]">
            {equips.map((e,i) => (
              <tr key={i}>
                <td className="px-5 py-2.5 font-bold">{e.l}</td>
                <td className="px-3 py-2.5 mono">{e.req}</td>
                <td className="px-3 py-2.5">
                  {e.auth
                    ? <StatusPill tone="success" size="sm" icon="check-circle-2">Authorized</StatusPill>
                    : <StatusPill tone="gray"    size="sm" icon="ban">No training</StatusPill>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditional rules */}
      <div className="surface rounded-xl p-5">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Conditional access rules</div>
        <div className="space-y-2 text-[12.5px]">
          {[
            'Boleh masuk PIT hanya saat shift pagi (06:00–14:00) dengan SPV',
            'Crane operation hanya jika MCU restriction tidak include "no working at height"',
            'Tank BBM access wajib gas test PASS dalam 1 jam terakhir',
          ].map((r,i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-elev p-3">
              <Icon name="info" size={14} className="text-info-600 mt-0.5 shrink-0" />
              <div className="flex-1">{r}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit log */}
      <div className="surface rounded-xl overflow-hidden">
        <div className="px-5 h-11 border-b border-token flex items-center gap-3">
          <Icon name="history" size={16} className="text-brand-500" />
          <div className="text-[13px] font-bold tracking-tight">Audit log access change</div>
        </div>
        <div className="divide-y divide-[color:var(--border)]">
          {[
            { t:'12 Mei 2026 14:32', who:'Maya Saputri',   act:'Granted access', tgt:'OLC area',                tone:'success' },
            { t:'02 Apr 2026 09:18', who:'System',          act:'Auto-revoke',    tgt:'PIT Nagari (CS expired)', tone:'danger' },
            { t:'15 Feb 2026 11:42', who:'Yusuf Kurniawan',act:'Conditional',    tgt:'PIT Bahana (shift only)', tone:'warning' },
          ].map((r,i) => (
            <div key={i} className="px-5 py-2.5 flex items-center gap-3 text-[11.5px]">
              <span className={`w-2 h-2 rounded-full bg-${r.tone}-500`} />
              <span className="mono text-subtle w-36">{r.t}</span>
              <span className="font-bold">{r.who}</span>
              <span className="text-muted">{r.act}</span>
              <span className="font-bold text-muted">→</span>
              <span className="font-semibold">{r.tgt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Activity log tab
// ============================================================
function Tab_Activity({ w }) {
  return (
    <div className="surface rounded-xl overflow-hidden">
      <div className="px-5 h-11 border-b border-token flex items-center gap-3">
        <Icon name="activity" size={16} className="text-brand-500" />
        <div className="text-[13px] font-bold tracking-tight">Activity log · 30 hari terakhir</div>
        <div className="flex-1" />
        <FilterChip icon="filter">Semua type</FilterChip>
      </div>
      <div className="divide-y divide-[color:var(--border)]">
        {[
          { t:'19 Mei · 08:14', ic:'check-circle-2', tone:'success', a:'Clock-in attendance', d:'Gate A · PIT Bahana · QR scan' },
          { t:'19 Mei · 07:48', ic:'shield',         tone:'safety',  a:'PTW briefing signed',  d:'PTW-2026-00123 · Hot Work' },
          { t:'18 Mei · 16:42', ic:'check-circle-2', tone:'success', a:'Clock-out attendance', d:'Gate A · 8j 12m durasi' },
          { t:'18 Mei · 08:02', ic:'check-circle-2', tone:'success', a:'Clock-in attendance', d:'Gate A · PIT Bahana' },
          { t:'15 Mei · 14:18', ic:'graduation-cap', tone:'info',    a:'Training attended',     d:'K3 Pertambangan refresh' },
          { t:'12 Mei · 09:00', ic:'heart-pulse',    tone:'warning', a:'MCU renewal',           d:'Klinik Mitra Bahari · FIT' },
          { t:'05 Mei · 10:32', ic:'shield',         tone:'safety',  a:'PTW participated',       d:'PTW-2026-00098 · Confined Space' },
          { t:'03 Mei · 08:15', ic:'check-circle-2', tone:'success', a:'Clock-in attendance', d:'Gate A · PIT Bahana' },
        ].map((r,i) => (
          <div key={i} className="px-5 py-3 flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg bg-${r.tone}-50 text-${r.tone}-600 flex items-center justify-center shrink-0`}><Icon name={r.ic} size={14} /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-bold">{r.a}</div>
              <div className="text-[10.5px] text-muted">{r.d}</div>
            </div>
            <div className="text-[10px] mono text-subtle">{r.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tab_Documents({ w }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {[
        { ic:'id-card',     n:'Scan KTP',                upd:'12 Jan 2024', sz:'1.2 MB' },
        { ic:'image',       n:'Pas photo 4×6',           upd:'12 Jan 2024', sz:'420 KB' },
        { ic:'file-text',   n:'Kontrak kerja',           upd:'12 Jan 2024', sz:'2.4 MB' },
        { ic:'shield-check',n:'BPJS Ketenagakerjaan',    upd:'12 Jan 2024', sz:'380 KB' },
        { ic:'shield-check',n:'BPJS Kesehatan',          upd:'12 Jan 2024', sz:'320 KB' },
        { ic:'heart-pulse', n:'MCU sertifikat',          upd:'15 Mar 2026', sz:'1.8 MB' },
        { ic:'award',       n:'Welder 3G certificate',   upd:'14 Apr 2025', sz:'920 KB' },
        { ic:'car',         n:'SIMPER B card',           upd:'14 Aug 2024', sz:'180 KB' },
        { ic:'graduation-cap',n:'K3L induction',          upd:'08 Aug 2024', sz:'1.1 MB' },
      ].map((d,i) => (
        <div key={i} className="surface rounded-xl p-4 flex items-center gap-3 hover:border-brand-200">
          <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name={d.ic} size={17} /></div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-extrabold truncate">{d.n}</div>
            <div className="text-[10px] text-muted">{d.sz} · {d.upd}</div>
          </div>
          <button className="w-7 h-7 rounded hover:bg-elev flex items-center justify-center"><Icon name="download" size={13} className="text-subtle" /></button>
        </div>
      ))}
    </div>
  );
}

window.C7_WorkerDrawer = C7_WorkerDrawer;
