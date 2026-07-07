// PTW — Mobile worker screens P1-P7.

// Sample PTW data
const SAMPLE_PTW = [
  { id:'PTW-2026-00123', type:'HW', loc:'Coal Pad Agra · Section 3', from:'08:00', to:'20:00', workers:3, status:'active', countdown:'7j 13m' },
  { id:'PTW-2026-00118', type:'WH', loc:'Workshop Bahana · Atap',     from:'09:00', to:'15:00', workers:2, status:'active', countdown:'2j 13m' },
  { id:'PTW-2026-00114', type:'IS', loc:'Substation A · Panel 4',     from:'14:00', to:'18:00', workers:4, status:'pending', countdown:'menunggu SO' },
  { id:'PTW-2026-00109', type:'CS', loc:'Tangki BBM B · Manhole 2',   from:'06:00', to:'10:00', workers:5, status:'closed', countdown:'Closed 09:42' },
  { id:'PTW-2026-00103', type:'EX', loc:'Hauling Rd · KM 42',         from:'07:00', to:'19:00', workers:6, status:'draft', countdown:'Draft' },
];

// ============================================================
// P1 — PTW Home
// ============================================================
function P1_Home() {
  const [tab, setTab] = React.useState('mine');
  const [filter, setFilter] = React.useState('active');

  const visible = SAMPLE_PTW.filter(p => filter === 'all' ? true : p.status === filter);

  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <div className="bg-white px-5 pt-1 pb-2 border-b border-token shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1">
            <div className="text-[15px] font-bold tracking-tight">Permit to Work</div>
            <div className="text-[11px] text-subtle">Selasa, 19 Mei 2026</div>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center relative">
            <Icon name="bell" size={20} className="text-subtle" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-danger-500" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1 border-b border-transparent">
          <button onClick={() => setTab('mine')}
            className={`relative pb-2 px-2 text-[13px] font-bold ${tab==='mine'?'text-brand-700':'text-muted'}`}>
            PTW saya
            {tab==='mine' && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-brand-500 rounded" />}
          </button>
          <button onClick={() => setTab('approver')}
            className={`relative pb-2 px-2 text-[13px] font-bold inline-flex items-center gap-1.5 ${tab==='approver'?'text-brand-700':'text-muted'}`}>
            Sebagai approver
            <span className="px-1.5 h-4 rounded-full bg-warning-500 text-white text-[9px] font-extrabold inline-flex items-center">3</span>
            {tab==='approver' && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-brand-500 rounded" />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Filters */}
        <div className="px-4 pt-3 flex items-center gap-1.5 overflow-x-auto pb-2">
          {[
            { id:'all',     l:'Semua',    n:SAMPLE_PTW.length },
            { id:'active',  l:'Active',   n:2, hot:true },
            { id:'pending', l:'Pending',  n:1 },
            { id:'draft',   l:'Draft',    n:1 },
            { id:'closed',  l:'Closed',   n:1 },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`px-3 h-9 rounded-full text-[12px] font-bold inline-flex items-center gap-1.5 whitespace-nowrap border
                ${filter===f.id ? (f.hot?'bg-success-500 text-white border-success-500':'bg-brand-500 text-white border-brand-500')
                                : 'bg-white border-token text-muted'}`}>
              {f.l}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${filter===f.id?'bg-white/25':'bg-elev'}`}>{f.n}</span>
            </button>
          ))}
        </div>

        {/* PTW cards */}
        <div className="px-4 mt-2 space-y-3">
          {visible.map(p => {
            const t = PERMIT_TYPES[p.type];
            const isActive = p.status === 'active';
            return (
              <div key={p.id} className={`rounded-2xl border bg-white p-4 ${isActive?'border-success-500/40 ring-1 ring-success-500/20':'border-token'}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">Permit number</div>
                    <div className="text-[16px] font-extrabold mono tracking-tight">{p.id}</div>
                  </div>
                  <PermitStatusBadge status={p.status} blink={true} size="md" />
                </div>
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <PermitTypeBadge type={p.type} />
                  {isActive && p.type==='HW' && <StatusPill tone="danger" size="sm" icon="alert-triangle">Risiko tinggi</StatusPill>}
                </div>
                <div className="space-y-1.5 text-[12.5px]">
                  <div className="flex items-center gap-2"><Icon name="map-pin" size={14} className="text-subtle shrink-0" /><span className="font-semibold truncate">{p.loc}</span></div>
                  <div className="flex items-center gap-2"><Icon name="clock" size={14} className="text-subtle shrink-0" />
                    <span className="font-semibold mono">{p.from} – {p.to}</span>
                    <span className="text-subtle">·</span>
                    <span className={`font-bold ${isActive?'text-success-700':'text-muted'}`}>{p.countdown}</span>
                  </div>
                  <div className="flex items-center gap-2"><Icon name="users" size={14} className="text-subtle shrink-0" /><span className="font-semibold">{p.workers} pekerja ditugaskan</span></div>
                </div>
              </div>
            );
          })}
          {visible.length===0 && (
            <div className="rounded-2xl border border-dashed border-token-strong bg-white p-8 text-center text-[12px] text-subtle">
              <Icon name="clipboard-x" size={28} className="text-subtle mx-auto mb-2" />
              Tidak ada PTW dengan status ini.
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <div className="absolute bottom-[78px] right-4 z-10">
        <button className="h-14 px-5 rounded-full bg-brand-500 text-white font-extrabold text-[14px] inline-flex items-center gap-2 shadow-lg hover:bg-brand-600">
          <Icon name="plus" size={20} /> Ajukan PTW baru
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-[18px]">
        <MobileBottomNav active={4} />
      </div>
    </div>
  );
}

// ============================================================
// P2 — Pilih Jenis PTW
// ============================================================
function P2_TypePicker() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Jenis pekerjaan" sub="Pilih kategori PTW yang sesuai" />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
        <div className="rounded-xl bg-info-50 border border-info-500/20 p-3 flex items-start gap-2.5 mb-4">
          <Icon name="info" size={16} className="text-info-600 mt-0.5 shrink-0" />
          <div className="text-[11.5px] text-info-700">
            <span className="font-extrabold">Tidak yakin?</span> Lihat <button className="font-bold underline">panduan PTW Nusaraya</button> atau hubungi Safety Officer.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.values(PERMIT_TYPES).map(t => {
            const high = t.risk !== 'Rendah';
            return (
              <button key={t.code}
                className={`rounded-2xl bg-white border p-3.5 text-left transition-all hover:shadow-md ${high?`border-${t.tone}-500/30`:'border-token'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-${t.tone}-500`}>
                    <Icon name={t.icon} size={22} />
                  </div>
                  {high && <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-${t.tone}-50 text-${t.tone}-700`}>Risiko {t.risk.toLowerCase()}</span>}
                </div>
                <div className="text-[10px] font-bold text-subtle mono">{t.code}</div>
                <div className="text-[14px] font-extrabold tracking-tight leading-tight">{t.label}</div>
                <div className="text-[11px] text-muted mt-1 leading-snug">{t.desc}</div>
                {t.mandatorySO && <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-cs-700"><Icon name="shield-check" size={11} /> SO wajib</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// P3 — Form Step 1: Detail Pekerjaan
// ============================================================
function P3_FormStep1() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="PTW Baru — Hot Work" sub="Belum disimpan · auto-save aktif" />
      <StepDots current={1} total={5} labels={['Detail','Hazard','Worker','Review','Submit']} />
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4">
        {/* Type confirmed */}
        <div className="surface rounded-xl p-3 flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-hw-500 text-white flex items-center justify-center"><Icon name="flame" size={20} /></div>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-subtle">Jenis permit</div>
            <div className="text-[14px] font-extrabold">PTW-HW · Hot Work</div>
          </div>
          <button className="text-[12px] font-bold text-brand-700">Ubah</button>
        </div>

        <FormSection title="Deskripsi pekerjaan">
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="3" defaultValue="Pengelasan pipa header 4 inch di stasiun pompa Coal Pad — line tersumbat, perlu dipotong dan disambung ulang."
              className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
            <div className="text-right text-[10px] text-subtle mono mt-1">112 / 500</div>
          </div>
        </FormSection>

        <FormSection title="Lokasi pekerjaan">
          <Field icon="map-pin" value="Coal Pad Agra · Section 3" suffix={<Icon name="chevron-down" size={14} className="text-subtle" />} />
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
            <Field icon="navigation" value="-1.2340" mono />
            <Field icon="navigation" value="116.7890" mono />
          </div>
          {/* mini map */}
          <div className="mt-2 h-28 rounded-xl overflow-hidden border border-token relative" style={{ background:'linear-gradient(135deg, #CFDDEC 0%, #9EBCDA 100%)' }}>
            <svg viewBox="0 0 360 110" className="absolute inset-0 w-full h-full">
              <path d="M0,70 Q90,55 180,75 T360,60" stroke="#1F4E79" strokeWidth="2" fill="none" strokeDasharray="6 4" opacity="0.4" />
              <path d="M0,95 Q120,85 240,100 T360,90" stroke="#1F4E79" strokeWidth="1.5" fill="none" opacity="0.3" />
              <rect x="60" y="20" width="40" height="30" rx="2" fill="#1F4E79" opacity="0.3" />
              <rect x="250" y="40" width="60" height="20" rx="2" fill="#1F4E79" opacity="0.3" />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <div className="w-9 h-9 rounded-full bg-hw-500 text-white flex items-center justify-center shadow-lg ring-4 ring-white"><Icon name="flame" size={16} /></div>
              <div className="w-px h-3 bg-hw-500 mx-auto" />
            </div>
            <div className="absolute bottom-2 right-2 px-2 h-6 rounded bg-white/90 backdrop-blur text-[10px] font-bold inline-flex items-center gap-1">
              <Icon name="external-link" size={10} /> Buka peta
            </div>
          </div>
        </FormSection>

        <FormSection title="Area boundary & equipment">
          <Field icon="layers" value="Area: Coal Pad Agra (PIT Bahana)" suffix={<Icon name="chevron-down" size={14} className="text-subtle" />} />
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-2 h-10 rounded-xl border border-token bg-white px-3 text-[12.5px]">
              <Icon name="wrench" size={15} className="text-subtle" />
              <span className="font-semibold flex-1">Welding set · NSR-EQ-0431</span>
              <button><Icon name="x" size={14} className="text-subtle" /></button>
            </div>
            <div className="flex items-center gap-2 h-10 rounded-xl border border-token bg-white px-3 text-[12.5px]">
              <Icon name="wrench" size={15} className="text-subtle" />
              <span className="font-semibold flex-1">Grinder 5" · NSR-EQ-0892</span>
              <button><Icon name="x" size={14} className="text-subtle" /></button>
            </div>
            <button className="w-full h-10 rounded-xl border border-dashed border-token-strong text-[12px] font-bold text-brand-700 inline-flex items-center justify-center gap-1.5">
              <Icon name="plus" size={14} /> Tambah equipment
            </button>
          </div>
        </FormSection>

        <FormSection title="Periode pekerjaan">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1">Mulai</div>
              <Field icon="calendar" value="20 Mei · 08:00" mono />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1">Selesai</div>
              <Field icon="calendar" value="20 Mei · 14:30" mono />
            </div>
          </div>
          <div className="mt-2 text-[11px] text-success-700 font-semibold flex items-center gap-1">
            <Icon name="check-circle-2" size={13} /> Durasi 6 jam 30 menit · dalam batas 12 jam
          </div>
        </FormSection>

        {/* Conflict warning */}
        <div className="rounded-xl bg-warning-50 border border-warning-500/30 p-3 flex items-start gap-2.5">
          <Icon name="alert-triangle" size={18} className="text-warning-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-[11.5px] text-warning-700">
            <span className="font-extrabold">2 PTW lain aktif di area ini.</span> PTW-2026-00118 (WH atap) dan PTW-2026-00121 (GE inspeksi). Koordinasi pre-job briefing direkomendasikan.
            <button className="block mt-1 font-bold underline">Lihat overlap →</button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3 flex gap-2">
        <button className="w-12 h-12 rounded-xl border border-token-strong bg-white text-muted flex items-center justify-center"><Icon name="save" size={18} /></button>
        <Btn variant="primary" full iconRight="arrow-right">Lanjut · Hazard</Btn>
      </div>
    </div>
  );
}

// ============================================================
// P4 — Form Step 2: Hazard & Control
// ============================================================
function P4_FormStep2() {
  const hazards = [
    { name:'Percikan api / kebakaran', sev:5, prob:4, score:20, residual:6, controls:3 },
    { name:'Asap & gas berbahaya',     sev:4, prob:3, score:12, residual:4, controls:2 },
    { name:'Luka bakar pekerja',       sev:4, prob:2, score:8,  residual:3, controls:2 },
    { name:'Ledakan gas terjebak',     sev:5, prob:2, score:10, residual:2, controls:4 },
  ];
  const scoreColor = (s) => s>=15?'sev-5':s>=10?'sev-4':s>=6?'sev-3':s>=3?'sev-2':'sev-1';

  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Hazard & Control" sub="Step 2 — Hot Work" />
      <StepDots current={2} total={5} labels={['Detail','Hazard','Worker','Review','Submit']} />
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4">
        <FormSection title="Hazard teridentifikasi" sub="Auto-suggest untuk Hot Work · tap untuk edit kontrol">
          <div className="space-y-2">
            {hazards.map((h,i) => (
              <button key={i} className="w-full text-left surface rounded-xl p-3">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="text-[13px] font-bold leading-tight flex-1">{h.name}</div>
                  <Icon name="chevron-right" size={14} className="text-subtle shrink-0" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`mono font-extrabold rounded px-1.5 h-5 text-[10px] inline-flex items-center ${scoreColor(h.score)}`}>
                    S{h.sev}×P{h.prob}={h.score}
                  </span>
                  <Icon name="arrow-right" size={11} className="text-subtle" />
                  <span className={`mono font-extrabold rounded px-1.5 h-5 text-[10px] inline-flex items-center ${scoreColor(h.residual)}`}>
                    residu {h.residual}
                  </span>
                  <span className="text-[10.5px] text-muted ml-1">· {h.controls} kontrol</span>
                </div>
              </button>
            ))}
          </div>
          <button className="mt-2 w-full h-11 rounded-xl border border-dashed border-token-strong text-[12.5px] font-bold text-brand-700 inline-flex items-center justify-center gap-1.5">
            <Icon name="plus" size={14} /> Tambah hazard manual
          </button>
        </FormSection>

        <FormSection title="APD wajib" sub="Pilih semua yang berlaku">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { l:'Helm safety',      on:true },
              { l:'Safety shoes',     on:true },
              { l:'Safety glass',     on:true },
              { l:'Welding helmet',   on:true, special:true },
              { l:'Fire-resist suit', on:true, special:true },
              { l:'Sarung tangan kulit', on:true },
              { l:'Masker P2',        on:true },
              { l:'Earplug',          on:false },
            ].map(a => (
              <div key={a.l} className={`flex items-center gap-2 px-2.5 h-10 rounded-lg border ${a.on?(a.special?'border-hw-500/40 bg-hw-50':'border-success-500/30 bg-success-50/40'):'border-token bg-white'}`}>
                <div className={`w-4 h-4 rounded ${a.on?(a.special?'bg-hw-500':'bg-success-500'):'border border-token-strong bg-white'} flex items-center justify-center`}>
                  {a.on && <Icon name="check" size={11} className="text-white" strokeWidth={3} />}
                </div>
                <span className={`text-[12px] font-semibold flex-1 ${a.on?'':'text-muted'}`}>{a.l}</span>
              </div>
            ))}
          </div>
        </FormSection>

        <FormSection title="Equipment safety" sub="Untuk Hot Work">
          <div className="surface rounded-xl p-3 space-y-2.5 text-[12.5px]">
            <div className="flex items-center gap-2">
              <Icon name="flame" size={16} className="text-hw-500" />
              <span className="flex-1 font-semibold">Fire extinguisher</span>
              <span className="px-2 h-6 rounded bg-elev font-bold mono">2 unit</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="user-check" size={16} className="text-info-500" />
              <span className="flex-1 font-semibold">Fire watch personnel</span>
              <span className="px-2 h-6 rounded bg-elev font-bold mono">1 orang</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="layers" size={16} className="text-warning-500" />
              <span className="flex-1 font-semibold">Fire blanket + spark guard</span>
              <span className="px-2 h-6 rounded bg-success-50 text-success-700 font-bold">Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="droplet" size={16} className="text-info-500" />
              <span className="flex-1 font-semibold">Water source ≤ 30m</span>
              <span className="px-2 h-6 rounded bg-success-50 text-success-700 font-bold">Hydrant H-04</span>
            </div>
          </div>
        </FormSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3 flex gap-2">
        <button className="h-12 px-4 rounded-xl border border-token-strong bg-white text-muted font-bold text-[13px] inline-flex items-center gap-1.5"><Icon name="arrow-left" size={16} /> Kembali</button>
        <Btn variant="primary" full iconRight="arrow-right">Lanjut · Worker</Btn>
      </div>
    </div>
  );
}

// ============================================================
// P5 — Form Step 3: Worker Assignment
// ============================================================
function P5_FormStep3() {
  const workers = [
    { name:'Budi Santoso',   nik:'NSR-009281', role:'Lead worker', tone:'brand', valid:true,  certs:['Welder 3G','MCU 2026','K3L'] },
    { name:'Anton Wijaya',   nik:'NSR-005412', role:'Welder',      tone:'success', valid:true, certs:['Welder 3G','MCU 2026','K3L'] },
    { name:'Cipto Hartono',  nik:'KNC-002104', role:'Fire watch',  tone:'safety', valid:true,  certs:['Fire watch','MCU 2026'] },
    { name:'Eko Saputra',    nik:'NSR-006671', role:'-',           tone:'gray',   valid:false, reason:'CS training expired' },
  ];
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Worker assignment" sub="Step 3 — Hot Work" />
      <StepDots current={3} total={5} labels={['Detail','Hazard','Worker','Review','Submit']} />
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4">
        <FormSection title="Pekerja ditugaskan" sub="3 dari 5 max · drag untuk re-order">
          <div className="space-y-2">
            {workers.slice(0,3).map((w,i) => (
              <div key={w.nik} className="surface rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <Icon name="grip-vertical" size={14} className="text-subtle" />
                  <Avatar name={w.name} size={36} tone={w.tone} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[13px] font-extrabold truncate">{w.name}</span>
                      {i===0 && <StatusPill tone="info" size="sm" icon="star">Lead</StatusPill>}
                    </div>
                    <div className="text-[10.5px] text-subtle mono">{w.nik} · {w.role}</div>
                  </div>
                  <button className="w-8 h-8 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="x" size={14} className="text-subtle" /></button>
                </div>
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  {w.certs.map(c => (
                    <span key={c} className="inline-flex items-center gap-1 px-1.5 h-5 rounded bg-success-50 text-success-700 text-[10px] font-bold">
                      <Icon name="check" size={10} strokeWidth={3} /> {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FormSection>

        <FormSection title="Tambah pekerja">
          <div className="flex items-center h-12 rounded-xl border border-token-strong bg-white px-3 gap-2">
            <Icon name="search" size={18} className="text-subtle" />
            <input defaultValue="Eko" className="flex-1 bg-transparent outline-none text-[13.5px]" placeholder="NIK atau nama..." />
            <span className="text-[10px] mono text-subtle">1 hasil</span>
          </div>
          {/* Blocked result */}
          <div className="mt-2 rounded-xl border-2 border-danger-500/30 bg-danger-50/50 p-3">
            <div className="flex items-center gap-3">
              <Avatar name="Eko Saputra" size={32} tone="gray" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold truncate">Eko Saputra</div>
                <div className="text-[10.5px] text-subtle mono">NSR-005412 · Welder</div>
              </div>
              <StatusPill tone="danger" size="sm" icon="x-circle">Blocked</StatusPill>
            </div>
            <div className="mt-2.5 rounded-lg bg-danger-500/10 p-2 text-[11px] text-danger-700">
              <div className="font-extrabold mb-0.5 flex items-center gap-1"><Icon name="shield-x" size={12} /> Sertifikasi expired</div>
              <div>Confined Space training expired 12 Apr 2026. Tidak bisa di-assign untuk PTW Hot Work yang berdekatan dengan tangki.</div>
            </div>
          </div>
        </FormSection>

        <FormSection title="Approver flow">
          <div className="surface rounded-xl divide-y divide-[color:var(--border)]">
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-brand-100 text-brand-700 font-extrabold text-[12px] flex items-center justify-center">L1</div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-subtle">Supervisor area</div>
                <div className="text-[13px] font-bold">Pak Hadi Wijaya</div>
              </div>
              <Icon name="chevron-down" size={14} className="text-subtle" />
            </div>
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-hw-500 text-white font-extrabold text-[12px] flex items-center justify-center">L2</div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-hw-700">Safety Officer · wajib</div>
                <div className="text-[13px] font-bold">Bu Sari Hartati</div>
              </div>
              <Icon name="chevron-down" size={14} className="text-subtle" />
            </div>
          </div>
        </FormSection>

        <FormSection title="Pre-job briefing">
          <Field icon="calendar" value="20 Mei 2026 · 07:45 (15 menit sebelum mulai)" />
        </FormSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3 flex gap-2">
        <button className="h-12 px-4 rounded-xl border border-token-strong bg-white text-muted font-bold text-[13px] inline-flex items-center gap-1.5"><Icon name="arrow-left" size={16} /> Kembali</button>
        <Btn variant="primary" full iconRight="arrow-right">Lanjut · Review</Btn>
      </div>
    </div>
  );
}

// ============================================================
// P6 — Form Step 4: Review & Documents
// ============================================================
function P6_FormStep4() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Review & dokumen" sub="Step 4 — Hot Work" />
      <StepDots current={4} total={5} labels={['Detail','Hazard','Worker','Review','Submit']} />
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28 space-y-4">
        {/* Summary card */}
        <div className="surface rounded-2xl overflow-hidden">
          <div className="px-4 py-3 bg-hw-500 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="flame" size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]">PTW-HW · Hot Work</span>
            </div>
            <div className="text-[14px] font-extrabold">Pengelasan pipa header 4" · stasiun pompa Coal Pad</div>
          </div>
          <div className="px-4 py-3 grid grid-cols-2 gap-y-3 gap-x-3 text-[12px]">
            <div><div className="text-[10px] text-subtle font-bold uppercase tracking-wider">Lokasi</div><div className="font-bold">Coal Pad Agra · Sec 3</div></div>
            <div><div className="text-[10px] text-subtle font-bold uppercase tracking-wider">Durasi</div><div className="font-bold mono">08:00 – 14:30 (6j 30m)</div></div>
            <div><div className="text-[10px] text-subtle font-bold uppercase tracking-wider">Worker</div><div className="font-bold">3 orang · 4 hazard</div></div>
            <div><div className="text-[10px] text-subtle font-bold uppercase tracking-wider">Risk score</div><div className="font-bold text-hw-700 mono">Max 20 → residu 6</div></div>
          </div>
        </div>

        <FormSection title="Dokumen pendukung">
          <div className="space-y-2">
            {[
              { ic:'file-text',     n:'Risk Assessment · RA-2026-0421', sz:'Linked · Doc Master', ok:true },
              { ic:'file-text',     n:'Method Statement / JSA',          sz:'PDF · 1.2 MB',         ok:true },
              { ic:'image',         n:'Sketch & isolation drawing',      sz:'JPG · 480 KB',         ok:true },
              { ic:'link',          n:'Referensi PTW serupa PTW-2026-00087', sz:'Hot Work · Mar 2026', ok:true },
            ].map((d,i) => (
              <div key={i} className="surface rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name={d.ic} size={17} /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-bold truncate">{d.n}</div>
                  <div className="text-[10.5px] text-subtle">{d.sz}</div>
                </div>
                <Icon name="check-circle-2" size={16} className="text-success-500 shrink-0" />
              </div>
            ))}
            <button className="w-full h-11 rounded-xl border border-dashed border-token-strong text-[12px] font-bold text-brand-700 inline-flex items-center justify-center gap-1.5">
              <Icon name="upload" size={14} /> Tambah dokumen
            </button>
          </div>
        </FormSection>

        <FormSection title="Acknowledgment">
          <div className="rounded-xl bg-brand-50 border border-brand-200 p-3">
            <div className="text-[12px] text-brand-700 leading-relaxed">
              <span className="font-extrabold">Pernyataan saya:</span> Informasi di atas benar; saya memahami risiko Hot Work termasuk percikan, asap, dan kebakaran; saya akan mengikuti pre-job briefing dan menggunakan APD lengkap.
            </div>
            <div className="mt-3 sig-line h-12 flex items-end pb-1">
              <span className="text-[12px] mono italic text-brand-700">~ Budi Santoso ~</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-subtle">
              <span>NSR-009281 · ditandatangani 19 Mei 2026 14:32</span>
              <button className="font-bold text-brand-700">Ulang</button>
            </div>
          </div>
        </FormSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3 flex gap-2">
        <button className="h-12 px-4 rounded-xl border border-token-strong bg-white text-muted font-bold text-[13px] inline-flex items-center gap-1.5"><Icon name="arrow-left" size={16} /> Kembali</button>
        <Btn variant="primary" full iconRight="arrow-right">Lanjut · Submit</Btn>
      </div>
    </div>
  );
}

// ============================================================
// P7 — Form Step 5: Submit
// ============================================================
function P7_FormStep5() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Submit untuk approval" sub="Step 5 — Hot Work" />
      <StepDots current={5} total={5} labels={['Detail','Hazard','Worker','Review','Submit']} />
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28 space-y-4">
        <div className="rounded-2xl bg-white border-2 border-hw-500/40 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="flame" size={18} className="text-hw-500" />
            <PermitTypeBadge type="HW" />
            <span className="ml-auto text-[10px] font-bold text-subtle mono">Permit number · TBD</span>
          </div>
          <div className="text-[16px] font-extrabold tracking-tight leading-tight">Pengelasan pipa header 4" stasiun pompa Coal Pad</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11.5px]">
            <div className="flex items-center gap-1.5"><Icon name="map-pin" size={13} className="text-subtle" /> Coal Pad Agra</div>
            <div className="flex items-center gap-1.5 mono"><Icon name="clock" size={13} className="text-subtle" /> 08:00–14:30</div>
            <div className="flex items-center gap-1.5"><Icon name="users" size={13} className="text-subtle" /> 3 worker</div>
            <div className="flex items-center gap-1.5"><Icon name="check-circle-2" size={13} className="text-success-500" /> 2 approver</div>
          </div>
        </div>

        {/* Approval flow */}
        <FormSection title="Alur approval">
          <div className="surface rounded-2xl p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500 text-white font-extrabold text-[12px] flex items-center justify-center">BS</div>
                <div className="flex-1">
                  <div className="text-[12px] font-bold">Anda · Budi Santoso</div>
                  <div className="text-[10.5px] text-subtle">Initiator · sign 14:32</div>
                </div>
                <StatusPill tone="success" size="sm" icon="check-circle-2">Submitted</StatusPill>
              </div>
              <div className="ml-5 h-4 w-px bg-[color:var(--border-strong)]" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warning-500 text-white font-extrabold text-[12px] flex items-center justify-center">HW</div>
                <div className="flex-1">
                  <div className="text-[12px] font-bold">Pak Hadi Wijaya</div>
                  <div className="text-[10.5px] text-subtle">SPV Coal Pad · L1</div>
                </div>
                <StatusPill tone="warning" size="sm" icon="clock">Pending</StatusPill>
              </div>
              <div className="ml-5 h-4 w-px bg-[color:var(--border-strong)]" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-hw-500 text-white font-extrabold text-[12px] flex items-center justify-center">SH</div>
                <div className="flex-1">
                  <div className="text-[12px] font-bold">Bu Sari Hartati</div>
                  <div className="text-[10.5px] text-subtle">Safety Officer · L2 wajib</div>
                </div>
                <StatusPill tone="gray" size="sm" icon="clock">Queued</StatusPill>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-info-50 border border-info-500/20 p-2.5 text-[11px] text-info-700 flex items-start gap-2">
              <Icon name="info" size={13} className="mt-0.5 shrink-0" />
              <div>Estimasi approval <span className="font-bold">15–30 menit</span> selama jam kerja (06:00–18:00).</div>
            </div>
          </div>
        </FormSection>

        <div className="rounded-xl bg-warning-50 border border-warning-500/30 p-3 flex items-start gap-2.5">
          <Icon name="alert-triangle" size={18} className="text-warning-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-[11.5px] text-warning-700">
            <span className="font-extrabold">High-risk permit:</span> Hot Work memerlukan persetujuan SO. Anda tidak boleh memulai pekerjaan sebelum status <span className="font-extrabold">ACTIVE</span>.
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3 flex gap-2">
        <button className="h-12 px-4 rounded-xl border border-token-strong bg-white text-muted font-bold text-[13px] inline-flex items-center gap-1.5"><Icon name="arrow-left" size={16} /> Kembali</button>
        <Btn variant="success" full icon="send">Submit untuk approval</Btn>
      </div>
    </div>
  );
}

// =================== Export ===================
window.P1_Home       = P1_Home;
window.P2_TypePicker = P2_TypePicker;
window.P3_FormStep1  = P3_FormStep1;
window.P4_FormStep2  = P4_FormStep2;
window.P5_FormStep3  = P5_FormStep3;
window.P6_FormStep4  = P6_FormStep4;
window.P7_FormStep5  = P7_FormStep5;
window.SAMPLE_PTW    = SAMPLE_PTW;
