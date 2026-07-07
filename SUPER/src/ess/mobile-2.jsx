// Mobile ESS screens B6-B10.

// ============================================================
// B6 — Leave Confirmation
// ============================================================
function Screen_LeaveConfirm() {
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <ScreenHeader title="Ajukan Cuti" sub="Step 3 dari 3 · Confirm" onBack={false} />
      <div className="px-4 pt-4">
        <StepIndicator steps={['Detail','Approval','Confirm']} current={2} />
      </div>

      <div className="flex-1 flex flex-col px-5 pt-6 overflow-y-auto pb-24">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full ring-expand" style={{ background: '#1D9E75' }} />
            <div className="relative w-24 h-24 rounded-full check-pop flex items-center justify-center text-white bg-success-500" style={{ boxShadow: '0 16px 36px -10px rgba(29,158,117,0.55)' }}>
              <Icon name="check" size={48} strokeWidth={3} />
            </div>
          </div>
        </div>
        <div className="mt-6 text-[24px] font-extrabold tracking-tight text-center">Pengajuan terkirim!</div>
        <div className="text-[13px] text-muted mt-1 text-center">No. pengajuan <span className="mono font-bold text-[color:var(--text)]">LV-2026-04891</span></div>

        {/* Status card */}
        <div className="mt-5 rounded-xl bg-warning-50 border border-warning-500/30 p-3 flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-warning-500 text-white flex items-center justify-center shrink-0">
            <Icon name="clock" size={16} />
          </div>
          <div className="flex-1">
            <div className="text-[12px] font-extrabold text-warning-700">Menunggu approval SPV</div>
            <div className="text-[11px] text-warning-700/90 mt-0.5">Notifikasi akan dikirim ke Pak Hadi Wijaya dalam beberapa menit.</div>
          </div>
        </div>

        {/* Detail */}
        <div className="mt-4 surface rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-token flex items-center gap-2">
            <Icon name="file-text" size={15} className="text-brand-500" />
            <div className="text-[12px] font-bold uppercase tracking-wider">Detail pengajuan</div>
          </div>
          <div className="divide-y divide-[color:var(--border)]">
            {[
              { l:'Jenis',    v:'Cuti Tahunan' },
              { l:'Periode',  v:'22 – 26 Mei 2026', mono: true },
              { l:'Hari kerja', v:'3 hari', mono: true },
              { l:'Saldo setelah', v:'7 / 12 hari', mono: true },
              { l:'Kontak darurat', v:'+62 812-3456-7891', mono: true },
            ].map(d => (
              <div key={d.l} className="px-4 py-2.5 flex items-center justify-between">
                <div className="text-[12px] text-subtle">{d.l}</div>
                <div className={`text-[13px] font-semibold text-right ${d.mono ? 'mono' : ''}`}>{d.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-[12px] text-subtle text-center">
          Pengajuan dapat dibatalkan selama belum approved.
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-token grid grid-cols-2 gap-2">
        <button className="h-12 rounded-xl border border-token-strong text-[13px] font-bold text-muted">Ke ESS</button>
        <Btn variant="primary" iconRight="arrow-right">Lihat status</Btn>
      </div>
    </div>
  );
}

// ============================================================
// B7 — Leave Status List
// ============================================================
const LEAVE_REQUESTS = [
  { id:'LV-2026-04891', type:'Cuti Tahunan',   from:'22 Mei', to:'26 Mei', days:3, tone:'warning', status:'Pending SPV', step:1 },
  { id:'LV-2026-04880', type:'Sakit',          from:'14 Mei', to:'14 Mei', days:1, tone:'success', status:'Approved',    step:2, evidence: true },
  { id:'LV-2026-04702', type:'Cuti Tahunan',   from:'02 Apr', to:'05 Apr', days:2, tone:'success', status:'Approved',    step:2 },
  { id:'LV-2026-04501', type:'Cuti Khusus',    from:'18 Feb', to:'18 Feb', days:1, tone:'danger',  status:'Rejected',    step:1, reason:'Bukti tidak lengkap' },
  { id:'LV-2026-04302', type:'Sakit',          from:'05 Jan', to:'06 Jan', days:2, tone:'success', status:'Approved',    step:2 },
];

function Screen_LeaveStatus() {
  const [filter, setFilter] = React.useState('all');
  const filtered = LEAVE_REQUESTS.filter(l =>
    filter === 'all' ? true :
    filter === 'pending' ? l.tone === 'warning' :
    filter === 'approved' ? l.tone === 'success' :
    l.tone === 'danger'
  );
  const counts = {
    all: LEAVE_REQUESTS.length,
    pending: LEAVE_REQUESTS.filter(l=>l.tone==='warning').length,
    approved: LEAVE_REQUESTS.filter(l=>l.tone==='success').length,
    rejected: LEAVE_REQUESTS.filter(l=>l.tone==='danger').length,
  };
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <ScreenHeader title="Status Cuti" sub={`${LEAVE_REQUESTS.length} pengajuan tahun ini`}
        right={<button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="filter" size={18} className="text-subtle" /></button>}
      />

      {/* Filter chips */}
      <div className="px-4 pt-3 flex items-center gap-1.5 overflow-x-auto">
        {[
          { k:'all',      l:'Semua' },
          { k:'pending',  l:'Pending', tone:'warning' },
          { k:'approved', l:'Approved', tone:'success' },
          { k:'rejected', l:'Rejected', tone:'danger' },
        ].map(t => {
          const isActive = filter === t.k;
          return (
            <button key={t.k} onClick={() => setFilter(t.k)}
              className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[12px] font-semibold whitespace-nowrap border
                ${isActive ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-muted border-token'}`}>
              {t.l}
              <span className={`px-1.5 rounded-full text-[10px] font-extrabold ${isActive ? 'bg-white/20' : 'bg-elev'}`}>
                {counts[t.k]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-3">
        {filtered.length === 0 ? (
          <div className="surface rounded-2xl p-10 text-center mt-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-elev flex items-center justify-center text-subtle">
              <Icon name="inbox" size={24} />
            </div>
            <div className="mt-3 text-[14px] font-bold">Tidak ada pengajuan</div>
            <div className="text-[12px] text-subtle mt-1">Coba filter lain atau ajukan cuti baru.</div>
          </div>
        ) : filtered.map(r => (
          <div key={r.id} className="surface rounded-2xl p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[14px] font-extrabold tracking-tight">{r.type}</div>
                <div className="text-[12px] text-muted mono">{r.from} – {r.to} · <span className="font-bold">{r.days} hari kerja</span></div>
              </div>
              <StatusPill tone={r.tone} icon={r.tone==='warning'?'clock':r.tone==='success'?'check-circle-2':'x-circle'}>
                {r.status}
              </StatusPill>
            </div>

            {/* Mini timeline */}
            <div className="mt-3 flex items-center gap-1.5">
              <MiniStep done label="Diajukan" />
              <MiniDivider done />
              <MiniStep done={r.step>=1 && r.tone!=='danger'} active={r.tone==='warning' && r.step===1} reject={r.tone==='danger'} label="SPV" />
              <MiniDivider done={r.step>=2 && r.tone==='success'} />
              <MiniStep done={r.step>=2 && r.tone==='success'} active={r.tone==='warning' && r.step===2} dim={r.tone==='danger' || r.step<2} label="HR" />
            </div>

            {r.reason && (
              <div className="mt-3 px-3 py-2 rounded-lg bg-danger-50 text-danger-700 text-[11px]">
                <span className="font-bold">Alasan tolak: </span>{r.reason}
              </div>
            )}
            <div className="mt-3 flex items-center justify-between">
              <div className="text-[10px] text-subtle mono">{r.id}</div>
              <button className="text-[12px] font-bold text-brand-700 inline-flex items-center gap-1">
                Detail <Icon name="chevron-right" size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStep({ done, active, dim, reject, label }) {
  const bg = reject ? 'bg-danger-500 text-white' :
             done ? 'bg-success-500 text-white' :
             active ? 'bg-warning-500 text-white' :
             dim ? 'bg-elev text-subtle border border-token' :
             'bg-elev text-subtle border border-token';
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${bg}`}>
        {reject ? <Icon name="x" size={11} /> : done ? <Icon name="check" size={11} /> : active ? <span className="w-1.5 h-1.5 rounded-full bg-white" /> : ''}
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-wider ${reject?'text-danger-700':done?'text-success-700':active?'text-warning-700':'text-subtle'}`}>{label}</span>
    </div>
  );
}
function MiniDivider({ done }) {
  return <div className={`flex-1 h-0.5 rounded-full mt-[-12px] ${done ? 'bg-success-500' : 'bg-[color:var(--border-strong)]'}`} />;
}

// ============================================================
// B8 — Approval Inbox SPV (mobile)
// ============================================================
const SPV_PENDING = [
  { id:'LV-2026-04891', kind:'Cuti',    icon:'calendar-days', name:'Budi Santoso',  nik:'NSR-009281', detail:'Cuti tahunan · 22–26 Mei · 3 hari', reason:'Acara pernikahan saudara di Surabaya.', time:'2j', prio:'normal' },
  { id:'KOR-04891',     kind:'Koreksi', icon:'edit-3',         name:'Siti Rahayu',   nik:'NSR-007123', detail:'Lupa clock-out · 18 Mei', reason:'Dispatch darurat ke Pit C bantu maintenance.', time:'3j', prio:'high', evidence: true },
  { id:'OT-04891',      kind:'Lembur',  icon:'clock-3',        name:'Joko Pranoto',  nik:'KNC-002104', detail:'Overtime 2j · 18 Mei (14–16)', reason:'Finishing report shift pagi sebelum hand-over.', time:'5j' },
  { id:'KOR-04890',     kind:'Koreksi', icon:'edit-3',         name:'Eko Saputra',   nik:'NSR-005412', detail:'Lupa clock-in · 17 Mei', reason:'Sistem QR hang, sudah lapor pos jaga.', time:'1 hari', evidence: true },
  { id:'CLAIM-04891',   kind:'Klaim',   icon:'receipt',        name:'Dewi Anggraini',nik:'NSR-001029', detail:'Reimburse medical · Rp 450.000', reason:'Cek-up rutin tahunan di RS Pertamina.', time:'1 hari', evidence: true },
];

function Screen_ApprovalInboxSPV() {
  const [filter, setFilter] = React.useState('all');
  const filtered = SPV_PENDING.filter(p => filter === 'all' || p.kind.toLowerCase() === filter);
  const counts = {
    all: SPV_PENDING.length,
    cuti: SPV_PENDING.filter(p=>p.kind==='Cuti').length,
    klaim: SPV_PENDING.filter(p=>p.kind==='Klaim').length,
    lembur: SPV_PENDING.filter(p=>p.kind==='Lembur').length,
    koreksi: SPV_PENDING.filter(p=>p.kind==='Koreksi').length,
  };
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <ScreenHeader title="Approval Inbox" sub={`${SPV_PENDING.length} menunggu · Anda sebagai SPV`} />

      {/* Filter chips */}
      <div className="px-4 pt-3 flex items-center gap-1.5 overflow-x-auto">
        {[
          { k:'all',    l:'Semua' },
          { k:'cuti',   l:'Cuti' },
          { k:'klaim',  l:'Klaim' },
          { k:'lembur', l:'Lembur' },
          { k:'koreksi',l:'Koreksi' },
        ].map(t => {
          const isActive = filter === t.k;
          return (
            <button key={t.k} onClick={() => setFilter(t.k)}
              className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[12px] font-semibold whitespace-nowrap border
                ${isActive ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-muted border-token'}`}>
              {t.l}
              <span className={`px-1.5 rounded-full text-[10px] font-extrabold ${isActive ? 'bg-white/20' : 'bg-elev'}`}>
                {counts[t.k]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Hint */}
      <div className="px-4 pt-3">
        <div className="rounded-lg bg-info-50 text-info-700 px-3 h-8 flex items-center gap-2 text-[11px] font-semibold">
          <Icon name="hand" size={13} />
          Swipe kanan untuk Approve · kiri untuk Tolak
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-2">
        {filtered.map(p => (
          <div key={p.id} className="relative overflow-hidden rounded-2xl">
            {/* Swipe action hints behind the card */}
            <div className="absolute inset-y-0 left-0 w-16 bg-success-500 flex items-center justify-center text-white">
              <Icon name="check" size={20} />
            </div>
            <div className="absolute inset-y-0 right-0 w-16 bg-danger-500 flex items-center justify-center text-white">
              <Icon name="x" size={20} />
            </div>
            <div className="relative surface p-3.5 flex items-start gap-3" style={{ transform: 'translateX(0)' }}>
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                {p.name.split(' ').map(x=>x[0]).slice(0,2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-1.5 h-5 rounded text-[10px] font-extrabold uppercase tracking-wider
                    ${p.kind==='Cuti' ? 'bg-info-50 text-info-700' :
                      p.kind==='Klaim' ? 'bg-success-50 text-success-700' :
                      p.kind==='Lembur' ? 'bg-warning-50 text-warning-700' :
                      'bg-brand-50 text-brand-700'}`}>
                    <Icon name={p.icon} size={9} /> {p.kind}
                  </span>
                  {p.prio === 'high' && (
                    <span className="inline-flex items-center gap-1 px-1.5 h-5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-danger-50 text-danger-700">
                      <Icon name="flag" size={9} /> Urgent
                    </span>
                  )}
                  <span className="text-[11px] text-subtle ml-auto">{p.time}</span>
                </div>
                <div className="text-[13px] font-bold mt-1 leading-tight">{p.name} <span className="font-normal text-subtle">· {p.detail}</span></div>
                <div className="text-[11px] text-muted line-clamp-2 mt-0.5">{p.reason}</div>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-subtle">
                  <span className="mono">{p.nik}</span>
                  {p.evidence && <span className="inline-flex items-center gap-1 text-brand-700 font-semibold"><Icon name="paperclip" size={10} /> Bukti</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// B9 — Approval Detail SPV
// ============================================================
function Screen_ApprovalDetail() {
  const [showRejectComment, setShowRejectComment] = React.useState(false);
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <ScreenHeader title="Detail Approval" sub="LV-2026-04891 · Cuti Tahunan"
        right={<button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="more-horizontal" size={18} className="text-subtle" /></button>}
      />

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Requester */}
        <div className="px-4 pt-4">
          <div className="surface rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-500 text-white text-[14px] font-bold flex items-center justify-center">BS</div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-extrabold tracking-tight">Budi Santoso</div>
              <div className="text-[11px] text-subtle">Operator Excavator · Mining Ops</div>
              <div className="text-[11px] text-subtle mono">NSR-009281 · Sejak 04 Jan 2018</div>
            </div>
            <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center">
              <Icon name="message-circle" size={16} className="text-brand-600" />
            </button>
          </div>
        </div>

        {/* Request detail */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-token flex items-center justify-between">
              <div className="text-[12px] font-bold uppercase tracking-wider text-muted">Pengajuan</div>
              <StatusPill tone="warning" icon="clock">Pending Anda</StatusPill>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Jenis</div>
                  <div className="text-[13px] font-bold mt-0.5">Cuti Tahunan</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Total hari kerja</div>
                  <div className="text-[13px] font-bold mt-0.5">3 hari · 22–26 Mei</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Alasan</div>
                <div className="text-[13px] mt-1 leading-relaxed">Acara pernikahan saudara di Surabaya. Sudah koordinasi handover ke Pak Eko dan Pak Joko sebagai backup.</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Bukti</div>
                <div className="mt-1.5 flex gap-2">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #CFDDEC, #9EBCDA)' }}>
                    <Icon name="image" size={22} className="text-brand-700" />
                  </div>
                  <div className="text-[11px] text-muted self-end pb-1">undangan-rsvp.jpg</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="px-4 mt-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-subtle mb-2 px-1">Konteks</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="surface rounded-xl p-3">
              <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Saldo cuti</div>
              <div className="text-[18px] mono font-extrabold mt-0.5">10<span className="text-[11px] text-subtle font-normal ml-0.5">/12</span></div>
              <div className="text-[10px] text-success-600 font-semibold">Cukup</div>
            </div>
            <div className="surface rounded-xl p-3">
              <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Cuti tahun ini</div>
              <div className="text-[18px] mono font-extrabold mt-0.5">2x</div>
              <div className="text-[10px] text-subtle">Total 3 hari</div>
            </div>
            <div className="surface rounded-xl p-3">
              <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Attendance</div>
              <div className="text-[18px] mono font-extrabold mt-0.5">96.7%</div>
              <div className="text-[10px] text-success-600 font-semibold">On-time</div>
            </div>
          </div>
        </div>

        {/* Reject comment (collapsible) */}
        {showRejectComment && (
          <div className="px-4 mt-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-danger-700 mb-1.5">Alasan penolakan <span className="text-danger-500">(wajib)</span></div>
            <div className="rounded-xl border-2 border-danger-500/50 bg-white p-3">
              <textarea rows="3" placeholder="Berikan alasan jelas yang akan dilihat pekerja…" className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-token grid grid-cols-2 gap-2">
        <button
          onClick={() => setShowRejectComment(s => !s)}
          className={`h-12 rounded-xl text-[14px] font-bold inline-flex items-center justify-center gap-2 ${showRejectComment ? 'bg-danger-500 text-white' : 'border border-danger-500/40 text-danger-700 bg-white'}`}>
          <Icon name="x" size={18} /> {showRejectComment ? 'Konfirmasi tolak' : 'Tolak'}
        </button>
        <Btn variant="success" icon="check" size="md">Setujui</Btn>
      </div>
    </div>
  );
}

// ============================================================
// B10 — Profile View
// ============================================================
function Screen_Profile() {
  const [tab, setTab] = React.useState('info');
  const [error, setError] = React.useState(true); // demo invalid email field
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <ScreenHeader title="Profile Saya"
        right={<button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="settings" size={18} className="text-subtle" /></button>}
      />
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header card */}
        <div className="px-4 pt-4">
          <div className="surface rounded-2xl p-5 flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-brand-500 text-white text-[22px] font-extrabold flex items-center justify-center">BS</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-token-strong flex items-center justify-center">
                <Icon name="camera" size={13} className="text-brand-700" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[17px] font-extrabold tracking-tight">Budi Santoso</div>
              <div className="text-[12px] text-muted">Operator Excavator</div>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 h-5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-success-50 text-success-700">
                <span className="w-1.5 h-1.5 rounded-full bg-success-500" /> Aktif · Organic
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl">
            <div className="flex border-b border-token">
              {[
                { k:'info',     l:'Info pribadi' },
                { k:'contract', l:'Kontrak' },
                { k:'docs',     l:'Dokumen' },
              ].map(t => (
                <button key={t.k} onClick={() => setTab(t.k)}
                  className={`relative flex-1 h-11 text-[12px] font-bold ${tab===t.k ? 'text-brand-700' : 'text-muted'}`}>
                  {t.l}
                  {tab===t.k && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-brand-500 rounded-t" />}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-3">
              {tab === 'info' && (
                <>
                  <Field lab="NIK" v="NSR-009281" readOnly mono />
                  <Field lab="Tanggal lahir" v="12 Agustus 1989" readOnly />
                  <Field lab="Alamat" v="Jl. Merdeka No. 42, Sangatta Utara" editable />
                  <Field lab="Nomor HP" v="+62 812-3456-7890" editable mono />
                  <Field lab="Email" v="budi.s@invalid" editable
                         error={error ? "Format email tidak valid" : null} />
                  <Field lab="Kontak darurat" v="Siti Aminah (Istri) · +62 812-3456-7891" editable />
                  <Field lab="Status pernikahan" v="Menikah · 2 anak" editable />
                  {/* Children list */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Anak</div>
                    <div className="space-y-1.5">
                      {[
                        { n:'Adi Santoso',  age:'12 thn' },
                        { n:'Sari Santoso', age:'8 thn' },
                      ].map(c => (
                        <div key={c.n} className="flex items-center gap-2 rounded-xl bg-elev p-2.5">
                          <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center"><Icon name="user" size={14} /></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-bold">{c.n}</div>
                            <div className="text-[11px] text-subtle">{c.age}</div>
                          </div>
                          <button className="w-7 h-7 rounded-md hover:bg-white flex items-center justify-center"><Icon name="edit-3" size={13} className="text-subtle" /></button>
                        </div>
                      ))}
                      <button className="w-full h-10 rounded-xl border-2 border-dashed border-token-strong text-subtle hover:text-brand-600 hover:border-brand-300 text-[12px] font-bold inline-flex items-center justify-center gap-1.5">
                        <Icon name="plus" size={14} /> Tambah anak
                      </button>
                    </div>
                  </div>
                </>
              )}
              {tab === 'contract' && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l:'Tipe', v:'Permanent' },
                    { l:'Posisi', v:'Operator Excavator' },
                    { l:'Departemen', v:'Mining Ops' },
                    { l:'Bergabung', v:'04 Jan 2018' },
                    { l:'Masa kerja', v:'8 thn 4 bln' },
                    { l:'Site', v:'Bukit Sangatta' },
                  ].map(f => (
                    <div key={f.l} className="rounded-xl bg-elev p-3">
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{f.l}</div>
                      <div className="text-[13px] font-bold mt-0.5">{f.v}</div>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'docs' && (
                <div className="space-y-2">
                  {[
                    { l:'KTP',          n:'NIK-3201xxx', s:'Aktif',  tone:'success' },
                    { l:'SIM B2',       n:'B2-xxx',      s:'Berlaku · 21 bln',  tone:'success' },
                    { l:'SIO Excavator',n:'SIO-2023-002',s:'Habis 23 Mei',  tone:'warning' },
                    { l:'BPJS Kes',     n:'001234567',   s:'Aktif',  tone:'success' },
                  ].map(d => (
                    <div key={d.l} className="rounded-xl bg-elev p-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-brand-600">
                        <Icon name="file-badge" size={17} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold">{d.l}</div>
                        <div className="text-[11px] text-subtle mono truncate">{d.n}</div>
                      </div>
                      <StatusPill tone={d.tone} size="sm">{d.s}</StatusPill>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-token">
        <Btn variant="primary" size="lg" full icon="save" disabled={error}>Simpan perubahan</Btn>
      </div>
    </div>
  );
}

function Field({ lab, v, readOnly, editable, error, mono }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">{lab}</div>
      <div className={`h-11 rounded-xl px-3 flex items-center gap-2
        ${error ? 'bg-white border-2 border-danger-500' : readOnly ? 'bg-elev' : 'bg-white border border-token-strong'}`}>
        <span className={`flex-1 text-[13px] font-semibold ${mono ? 'mono' : ''} ${readOnly ? 'text-muted' : ''}`}>{v}</span>
        {editable && <Icon name="edit-3" size={14} className="text-subtle" />}
        {readOnly && <Icon name="lock" size={13} className="text-subtle" />}
        {error && <Icon name="alert-circle" size={16} className="text-danger-500" />}
      </div>
      {error && <div className="text-[11px] text-danger-600 mt-1 inline-flex items-center gap-1"><Icon name="alert-circle" size={11} /> {error}</div>}
    </div>
  );
}

window.Screen_LeaveConfirm        = Screen_LeaveConfirm;
window.Screen_LeaveStatus         = Screen_LeaveStatus;
window.Screen_ApprovalInboxSPV    = Screen_ApprovalInboxSPV;
window.Screen_ApprovalDetail      = Screen_ApprovalDetail;
window.Screen_Profile             = Screen_Profile;
