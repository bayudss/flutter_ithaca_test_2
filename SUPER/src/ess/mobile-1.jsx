// Mobile ESS screens B1-B5.

// ============================================================
// B1 — ESS Home
// ============================================================
function Screen_ESSHome({ salaryRevealed, setSalaryRevealed }) {
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <ScreenHeader title="Self Service" sub="Budi Santoso · NSR-009281"
        right={<div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-[12px]">BS</div>}
        onBack={false}
      />

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Saldo Cuti */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-5 text-white relative overflow-hidden"
               style={{ background: 'linear-gradient(135deg, #1F4E79 0%, #143452 100%)' }}>
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -right-12 -bottom-12 w-36 h-36 rounded-full bg-safety-500/15" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold uppercase tracking-wider opacity-85">Saldo Cuti Tersisa</div>
                <Icon name="tree-palm" size={18} className="opacity-70" />
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <div className="text-[44px] font-extrabold tracking-tight leading-none mono">12</div>
                <div className="text-[14px] opacity-80">hari · dari 14</div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="h-2 rounded-full bg-white/15 overflow-hidden flex gap-0.5">
                  <div className="bg-white" style={{ width: `${(10/14)*100}%` }} />
                  <div className="bg-safety-400" style={{ width: `${(2/14)*100}%` }} />
                </div>
                <div className="mt-2 flex items-center gap-3 text-[11px]">
                  <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-white" /> Tahunan <span className="font-extrabold mono">10</span></span>
                  <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-safety-400" /> Sakit <span className="font-extrabold mono">2</span></span>
                  <span className="inline-flex items-center gap-1.5 opacity-60"><span className="w-2 h-2 rounded-sm bg-white/30" /> Khusus <span className="font-extrabold mono">0</span></span>
                </div>
              </div>

              <button className="mt-4 w-full h-12 rounded-xl bg-safety-500 hover:bg-safety-600 text-white text-[14px] font-extrabold inline-flex items-center justify-center gap-2 shadow-lg">
                <Icon name="calendar-plus" size={18} /> Ajukan Cuti
              </button>
            </div>
          </div>
        </div>

        {/* Payslip terakhir */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-subtle">Payslip terakhir</div>
                <div className="text-[15px] font-extrabold tracking-tight mt-0.5">April 2026</div>
                <div className="text-[11px] text-muted">Final · dirilis 28 Apr 2026</div>
              </div>
              <StatusPill tone="success" icon="check-circle-2">Final</StatusPill>
            </div>

            <div className="mt-4 rounded-xl bg-elev p-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Net salary</div>
                <div className={`text-[22px] font-extrabold mono tracking-tight mt-0.5 ${salaryRevealed ? '' : 'salary-blur'}`}>
                  {rp(8500000)}
                </div>
              </div>
              <button
                onClick={() => setSalaryRevealed(!salaryRevealed)}
                className="h-9 px-3 rounded-lg bg-white border border-token-strong text-[12px] font-bold inline-flex items-center gap-1.5">
                <Icon name={salaryRevealed ? 'eye-off' : 'eye'} size={14} />
                {salaryRevealed ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="h-11 rounded-xl bg-white border border-token-strong text-[13px] font-bold text-brand-700 inline-flex items-center justify-center gap-2">
                <Icon name="file-text" size={16} /> Detail
              </button>
              <button className="h-11 rounded-xl bg-white border border-token-strong text-[13px] font-bold text-brand-700 inline-flex items-center justify-center gap-2">
                <Icon name="download" size={16} /> PDF
              </button>
            </div>
          </div>
        </div>

        {/* Menu grid 2x2 */}
        <div className="px-4 mt-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-subtle mb-2 px-1">Layanan</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon:'user-cog',     title:'Profile Saya',  desc:'Data pribadi & kontak',  tone:'brand' },
              { icon:'receipt',      title:'Klaim',          desc:'Reimburse · medical', tone:'success' },
              { icon:'plane',        title:'Travel Request', desc:'Dinas luar lokasi',   tone:'info' },
              { icon:'inbox',        title:'Approval Inbox', desc:'6 menunggu · SPV',    tone:'safety', badge: 6 },
            ].map(m => (
              <button key={m.title} className="surface rounded-2xl p-3.5 text-left hover:border-brand-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                    ${m.tone==='brand'?'bg-brand-50 text-brand-600':
                      m.tone==='success'?'bg-success-50 text-success-600':
                      m.tone==='info'?'bg-info-50 text-info-600':
                      'bg-safety-50 text-safety-600'}`}>
                    <Icon name={m.icon} size={20} />
                  </div>
                  {m.badge && <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-danger-500 text-white text-[10px] font-extrabold flex items-center justify-center">{m.badge}</span>}
                </div>
                <div className="mt-2.5 text-[13px] font-bold tracking-tight">{m.title}</div>
                <div className="text-[11px] text-subtle leading-tight">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="px-4 mt-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-subtle mb-2 px-1">Riwayat</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { icon:'calendar-check', tone:'success', t:'Cuti tahunan disetujui', s:'17 Mei · 2 hari', d:'kemarin' },
              { icon:'receipt', tone:'info', t:'Payslip April terbit', s:rp(8500000), d:'21 hari' },
              { icon:'edit-3', tone:'warning', t:'Koreksi attendance', s:'Menunggu SPV', d:'2 jam' },
            ].map((a, i) => (
              <div key={i} className="p-3.5 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center
                  ${a.tone==='success'?'bg-success-50 text-success-600':
                    a.tone==='info'?'bg-info-50 text-info-600':'bg-warning-50 text-warning-600'}`}>
                  <Icon name={a.icon} size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold leading-tight">{a.t}</div>
                  <div className="text-[11px] text-subtle truncate">{a.s}</div>
                </div>
                <div className="text-[11px] text-subtle whitespace-nowrap">{a.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-[18px]">
        <MobileBottomNav active={2} />
      </div>
    </div>
  );
}

// ============================================================
// B2 — Payslip List
// ============================================================
const PAYSLIPS = [
  { m:'April 2026',     amt: 8500000, status:'Final', tone:'success', overtime: true },
  { m:'Maret 2026',     amt: 8350000, status:'Final', tone:'success' },
  { m:'Februari 2026',  amt: 8200000, status:'Final', tone:'success' },
  { m:'Januari 2026',   amt: 9100000, status:'Final', tone:'success', bonus: true },
  { m:'Desember 2025',  amt: 11200000,status:'Final', tone:'success', thr: true },
  { m:'November 2025',  amt: 8200000, status:'Final', tone:'success' },
  { m:'Oktober 2025',   amt: 8200000, status:'Final', tone:'success' },
  { m:'September 2025', amt: 8400000, status:'Final', tone:'success', overtime: true },
  { m:'Agustus 2025',   amt: 8200000, status:'Final', tone:'success' },
  { m:'Juli 2025',      amt: 8200000, status:'Final', tone:'success' },
];

function Screen_PayslipList({ salaryRevealed, setSalaryRevealed }) {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <ScreenHeader title="Slip Gaji" sub="12 bulan terakhir"
        right={
          <button onClick={() => setSalaryRevealed(!salaryRevealed)} className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
            <Icon name={salaryRevealed ? 'eye-off' : 'eye'} size={18} className="text-subtle" />
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto">
        {/* Filter */}
        <div className="px-4 pt-3 flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-white border border-token text-[12px] font-semibold">
            <Icon name="calendar" size={14} /> 2026 <Icon name="chevron-down" size={14} />
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-white border border-token text-[12px] font-semibold">
            Semua tipe <Icon name="chevron-down" size={14} />
          </button>
          <div className="flex-1" />
          <button className="w-9 h-9 rounded-full hover:bg-elev flex items-center justify-center">
            <Icon name="download" size={16} className="text-subtle" />
          </button>
        </div>

        {/* YTD card */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Icon name="trending-up" size={22} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-wider font-bold text-subtle">YTD Net Income · 2026</div>
              <div className={`text-[18px] font-extrabold mono tracking-tight ${salaryRevealed ? '' : 'salary-blur'}`}>
                {rp(34150000)}
              </div>
              <div className="text-[11px] text-success-600 font-semibold">+8.2% vs YTD 2025</div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="px-4 mt-4 mb-6 space-y-2">
          {PAYSLIPS.map((p, i) => (
            <div key={i} className="surface rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-bold tracking-tight">{p.m}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusPill tone={p.tone} size="sm" icon="check">{p.status}</StatusPill>
                    {p.overtime && <StatusPill tone="info" size="sm">+ OT</StatusPill>}
                    {p.bonus && <StatusPill tone="warning" size="sm">+ Bonus</StatusPill>}
                    {p.thr && <StatusPill tone="brand" size="sm">+ THR</StatusPill>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Net</div>
                  <div className={`text-[16px] font-extrabold mono ${salaryRevealed ? '' : 'salary-blur'}`}>{rp(p.amt)}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 h-9 rounded-lg bg-elev text-[12px] font-bold text-brand-700 inline-flex items-center justify-center gap-1.5">
                  <Icon name="file-text" size={13} /> Detail
                </button>
                <button className="flex-1 h-9 rounded-lg bg-elev text-[12px] font-bold text-brand-700 inline-flex items-center justify-center gap-1.5">
                  <Icon name="download" size={13} /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// B3 — Payslip Detail
// ============================================================
function Screen_PayslipDetail() {
  const earnings = [
    { lab:'Gaji pokok',         v: 6000000 },
    { lab:'Tunjangan jabatan',  v: 1500000 },
    { lab:'Tunjangan lokasi',   v: 1000000 },
    { lab:'Lembur (12j)',       v: 800000 },
  ];
  const deductions = [
    { lab:'BPJS Kesehatan',      v: 100000 },
    { lab:'BPJS Ketenagakerjaan',v: 200000 },
    { lab:'PPh 21',              v: 300000 },
    { lab:'Pinjaman koperasi',   v: 200000 },
  ];
  const totalE = earnings.reduce((s,e)=>s+e.v,0);
  const totalD = deductions.reduce((s,e)=>s+e.v,0);
  const net = totalE - totalD;

  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <ScreenHeader title="Slip Gaji April 2026" sub="Periode 1–30 April · Final"
        right={<button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="share-2" size={18} className="text-subtle" /></button>}
      />
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header info */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1F4E79 0%, #143452 100%)' }}>
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
            <div className="relative grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-70 font-bold">NIK</div>
                <div className="text-[13px] font-bold mono">NSR-009281</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-70 font-bold">Departemen</div>
                <div className="text-[13px] font-bold">Mining Operations</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-70 font-bold">Posisi</div>
                <div className="text-[13px] font-bold">Operator Excavator</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-70 font-bold">Lokasi</div>
                <div className="text-[13px] font-bold">PIT Bahana</div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-token bg-success-50 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-success-500 text-white flex items-center justify-center"><Icon name="plus" size={14} /></div>
              <div className="text-[12px] font-extrabold uppercase tracking-wider text-success-700">Pendapatan</div>
            </div>
            <div className="divide-y divide-[color:var(--border)]">
              {earnings.map(e => (
                <div key={e.lab} className="px-4 py-2.5 flex items-center justify-between">
                  <div className="text-[13px]">{e.lab}</div>
                  <div className="text-[13px] mono font-bold">{rp(e.v)}</div>
                </div>
              ))}
              <div className="px-4 py-3 flex items-center justify-between bg-elev">
                <div className="text-[12px] font-extrabold uppercase tracking-wider text-success-700">Total Pendapatan</div>
                <div className="text-[16px] mono font-extrabold text-success-700">{rp(totalE)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-token bg-danger-50 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-danger-500 text-white flex items-center justify-center"><Icon name="minus" size={14} /></div>
              <div className="text-[12px] font-extrabold uppercase tracking-wider text-danger-700">Potongan</div>
            </div>
            <div className="divide-y divide-[color:var(--border)]">
              {deductions.map(e => (
                <div key={e.lab} className="px-4 py-2.5 flex items-center justify-between">
                  <div className="text-[13px]">{e.lab}</div>
                  <div className="text-[13px] mono font-bold">−{rp(e.v)}</div>
                </div>
              ))}
              <div className="px-4 py-3 flex items-center justify-between bg-elev">
                <div className="text-[12px] font-extrabold uppercase tracking-wider text-danger-700">Total Potongan</div>
                <div className="text-[16px] mono font-extrabold text-danger-700">−{rp(totalD)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Net pay */}
        <div className="px-4 mt-3">
          <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1D9E75 0%, #11624A 100%)' }}>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative">
              <div className="text-[11px] uppercase tracking-wider opacity-85 font-bold">Take Home Pay</div>
              <div className="text-[36px] font-extrabold tracking-tight mono mt-1">{rp(net)}</div>
              <div className="text-[12px] opacity-85 mt-1">Ditransfer ke BCA •••• 4892 pada 28 Apr 2026 · 14:02</div>
            </div>
          </div>
        </div>

        {/* Security note */}
        <div className="px-4 mt-3">
          <div className="rounded-xl bg-warning-50 border border-warning-500/30 p-3 flex items-start gap-2.5">
            <Icon name="lock" size={16} className="text-warning-600 mt-0.5 shrink-0" />
            <div className="text-[11.5px] text-warning-700 leading-relaxed">
              <span className="font-bold">Slip gaji bersifat rahasia.</span> Jangan dibagikan ke pihak ketiga. PDF yang diunduh akan dipassword dengan tanggal lahir Anda.
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-token">
        <Btn variant="primary" size="lg" full icon="download">Download PDF</Btn>
      </div>
    </div>
  );
}

// ============================================================
// B4 — Leave Request Form (step 1)
// ============================================================
function Screen_LeaveForm() {
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <ScreenHeader title="Ajukan Cuti" sub="Step 1 dari 3 · Detail" />
      <div className="px-4 pt-4">
        <StepIndicator steps={['Detail','Approval','Confirm']} current={0} />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24">
        {/* Jenis cuti */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Jenis cuti</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k:'tahunan', l:'Tahunan', avail: 10, max: 12, active: true },
              { k:'sakit',   l:'Sakit',   avail: 2,  max: 2  },
              { k:'khusus',  l:'Khusus',  avail: 0,  max: 3  },
              { k:'unpaid',  l:'Tanpa bayar', avail: '∞' },
            ].map(o => (
              <button key={o.k}
                className={`rounded-xl p-3 text-left border-2 ${o.active ? 'border-brand-500 bg-brand-50/40' : 'border-token bg-white'}`}>
                <div className="text-[13px] font-bold tracking-tight">{o.l}</div>
                <div className="text-[11px] text-subtle mt-0.5">
                  Saldo <span className={`mono font-extrabold ${o.avail === 0 ? 'text-danger-600' : 'text-success-600'}`}>{o.avail}</span>{o.max && o.max !== '∞' && <span> / {o.max}</span>} hari
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Saldo visual */}
        <div className="mt-4 rounded-xl bg-elev p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-muted">Saldo tahunan tersedia</span>
            <span className="mono font-extrabold">10 / 12 hari</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white overflow-hidden">
            <div className="h-full bg-success-500" style={{ width: `${(10/12)*100}%` }} />
          </div>
        </div>

        {/* Tanggal range */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Mulai</div>
            <div className="h-12 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2">
              <Icon name="calendar" size={16} className="text-subtle" />
              <span className="flex-1 text-[14px] font-semibold mono">22 Mei</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Selesai</div>
            <div className="h-12 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2">
              <Icon name="calendar" size={16} className="text-subtle" />
              <span className="flex-1 text-[14px] font-semibold mono">26 Mei</span>
            </div>
          </div>
        </div>

        {/* Mini calendar preview */}
        <div className="mt-2 rounded-xl bg-white border border-token p-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-subtle mb-2">Mei 2026</div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-subtle">
            {['S','S','R','K','J','S','M'].map((d,i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-1">
            {Array.from({length: 4}).map((_,i) => <div key={'p'+i} />)}
            {Array.from({length: 31}, (_,i) => i+1).map(d => {
              const dow = new Date(2026, 4, d).getDay();
              const isWeekend = dow === 0 || dow === 6;
              const inRange = d >= 22 && d <= 26;
              const isStart = d === 22;
              const isEnd = d === 26;
              return (
                <div key={d}
                  className={`aspect-square flex items-center justify-center text-[11px] font-semibold rounded-md
                    ${isStart || isEnd ? 'bg-brand-500 text-white' :
                      inRange && !isWeekend ? 'bg-brand-100 text-brand-700' :
                      inRange && isWeekend ? 'bg-elev text-subtle line-through' :
                      isWeekend ? 'text-subtle' : ''}`}>
                  {d}
                </div>
              );
            })}
          </div>
        </div>

        {/* Total hari kerja */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-info-50 border border-info-500/20 p-3 text-info-700">
          <Icon name="calculator" size={16} />
          <div className="flex-1 text-[12px]"><span className="font-bold">3 hari kerja</span> · 5 hari kalender (excl. Sab/Min)</div>
        </div>

        {/* Alasan */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted">Alasan</div>
            <div className="text-[10px] mono text-subtle">82/250</div>
          </div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="3" defaultValue="Acara pernikahan saudara di Surabaya. Sudah koordinasi handover ke Pak Eko dan Pak Joko sebagai backup." className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>

        {/* Bukti */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Bukti (opsional untuk cuti tahunan)</div>
          <button className="w-full h-14 rounded-xl border-2 border-dashed border-token-strong bg-white text-subtle hover:text-brand-600 hover:border-brand-300 flex items-center justify-center gap-2 text-[13px] font-semibold">
            <Icon name="paperclip" size={18} />
            Upload undangan / surat
          </button>
        </div>

        {/* Kontak darurat */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Kontak darurat saat cuti</div>
          <div className="h-12 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2">
            <Icon name="phone" size={16} className="text-subtle" />
            <span className="flex-1 text-[14px] font-semibold mono">+62 812-3456-7891</span>
          </div>
          <div className="text-[11px] text-subtle mt-1">Akan dihubungi jika ada emergency tim.</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-token grid grid-cols-2 gap-2">
        <button className="h-12 rounded-xl border border-token-strong text-[13px] font-bold text-muted">Batal</button>
        <Btn variant="primary" iconRight="arrow-right">Lanjutkan</Btn>
      </div>
    </div>
  );
}

// ============================================================
// B5 — Leave Step 2: Approval Preview
// ============================================================
function Screen_ApprovalPreview() {
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <ScreenHeader title="Ajukan Cuti" sub="Step 2 dari 3 · Approval" />
      <div className="px-4 pt-4">
        <StepIndicator steps={['Detail','Approval','Confirm']} current={1} />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24">
        {/* Summary */}
        <div className="surface rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-wider font-bold text-subtle">Pengajuan Anda</div>
            <StatusPill tone="info" icon="calendar-days">Cuti Tahunan</StatusPill>
          </div>
          <div className="mt-2 text-[17px] font-extrabold tracking-tight">22 – 26 Mei 2026</div>
          <div className="text-[12px] text-muted">3 hari kerja · 5 hari kalender</div>
        </div>

        {/* Approval flow */}
        <div className="mt-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-subtle mb-2 px-1">Akan disetujui oleh</div>
          <div className="surface rounded-2xl p-4">
            <ApprovalFlow />
          </div>
        </div>

        {/* Estimate */}
        <div className="mt-4 rounded-xl bg-info-50 border border-info-500/20 p-3 flex items-start gap-2.5">
          <Icon name="clock" size={16} className="text-info-600 mt-0.5 shrink-0" />
          <div className="text-[12px] text-info-700 leading-relaxed">
            Estimasi waktu approval: <span className="font-extrabold">1–2 hari kerja</span>. Anda akan mendapat notifikasi push & email setiap tahapan.
          </div>
        </div>

        {/* Coverage */}
        <div className="mt-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-subtle mb-2 px-1">Cover during leave</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { n:'Eko Saputra', r:'Backup Pit B', i:'ES' },
              { n:'Joko Pranoto', r:'Backup loading', i:'JP' },
            ].map(c => (
              <div key={c.n} className="p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500 text-white text-[11px] font-bold flex items-center justify-center">{c.i}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold">{c.n}</div>
                  <div className="text-[11px] text-subtle">{c.r}</div>
                </div>
                <StatusPill tone="success" size="sm" icon="check">Konfirmasi</StatusPill>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-token grid grid-cols-2 gap-2">
        <button className="h-12 rounded-xl border border-token-strong text-[13px] font-bold text-muted inline-flex items-center justify-center gap-1.5">
          <Icon name="arrow-left" size={16} /> Kembali
        </button>
        <Btn variant="primary" icon="send">Ajukan Cuti</Btn>
      </div>
    </div>
  );
}

function ApprovalFlow() {
  return (
    <div className="space-y-3">
      {[
        { ic:'user', tone:'success', name:'Anda',          role:'Pengaju', state:'done',   meta:'Submitted otomatis' },
        { ic:'user-check', tone:'brand',  name:'Hadi Wijaya',   role:'Supervisor PIT Bahana', state:'active', meta:'Step 1 · NSR-001029' },
        { ic:'shield-check', tone:'gray', name:'Andi Wijaya',   role:'HR Lead',           state:'pending',meta:'Step 2 · Verifikasi final' },
      ].map((s, i, arr) => {
        const ring = s.state === 'active' ? 'ring-4 ring-brand-100' : '';
        const bg = s.state==='done' ? 'bg-success-500 text-white' :
                   s.state==='active' ? 'bg-brand-500 text-white' :
                   'bg-elev text-subtle border border-token-strong';
        const line = i < arr.length-1 && (arr[i].state==='done' ? 'bg-success-500' : 'bg-[color:var(--border-strong)]');
        return (
          <div key={s.name} className="flex items-start gap-3 relative">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bg} ${ring}`}>
                {s.state === 'done' ? <Icon name="check" size={18} /> : <Icon name={s.ic} size={18} />}
              </div>
              {i < arr.length-1 && (
                <div className={`absolute left-1/2 -translate-x-1/2 top-12 w-0.5 h-6 ${line}`} />
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-bold">{s.name}</div>
                {s.state==='done' && <StatusPill tone="success" size="sm" icon="check">Done</StatusPill>}
                {s.state==='active' && <StatusPill tone="brand" size="sm"><span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-brand-700 pulse-dot text-brand-700" /> Akan review</StatusPill>}
                {s.state==='pending' && <StatusPill tone="gray" size="sm">Menunggu</StatusPill>}
              </div>
              <div className="text-[11px] text-subtle">{s.role}</div>
              <div className="text-[10px] text-subtle mt-0.5">{s.meta}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

window.Screen_ESSHome         = Screen_ESSHome;
window.Screen_PayslipList     = Screen_PayslipList;
window.Screen_PayslipDetail   = Screen_PayslipDetail;
window.Screen_LeaveForm       = Screen_LeaveForm;
window.Screen_ApprovalPreview = Screen_ApprovalPreview;
window.ApprovalFlow           = ApprovalFlow;
