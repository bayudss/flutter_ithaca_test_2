// Catering — Scanner Operator (W1-W3) — tablet/desktop in dark mode.

// ============================================================
// W1 — Scanner Console (full tablet view, dark)
// ============================================================
function ScannerScanResult({ name, nik, slot, status, time }) {
  const ok = status === 'valid';
  return (
    <div className={`rounded-xl p-3 border ${ok?'bg-white/[0.04] border-success-500/40':'bg-danger-500/15 border-danger-500/40'} flex items-center gap-2.5`}>
      <Avatar name={name} size={36} tone={ok?'herb':'gray'} />
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-bold text-white truncate">{name}</div>
        <div className="text-[10px] text-white/60 mono truncate">{nik} · {slot}</div>
      </div>
      <div className="text-right">
        <div className={`inline-flex items-center gap-1 text-[11px] font-bold ${ok?'text-success-500':'text-danger-500'}`}>
          <Icon name={ok?'check-circle-2':'x-circle'} size={13} />
          {ok?'Valid':'Invalid'}
        </div>
        <div className="text-[10px] text-white/50 mono">{time}</div>
      </div>
    </div>
  );
}

function ScannerConsole({ showInvalidModal }) {
  return (
    <div className="h-full w-full text-white relative" style={{ background:'#0a0d12' }}>
      {/* Top bar */}
      <div className="h-12 px-5 border-b border-white/10 flex items-center gap-4 text-[12px]">
        <div className="flex items-center gap-2">
          <BrandMark size={22} />
          <div className="text-[11px] font-bold tracking-wider uppercase">Scanner Console</div>
        </div>
        <div className="h-5 w-px bg-white/15" />
        <div className="inline-flex items-center gap-1.5 text-white/80">
          <Icon name="map-pin" size={13} className="text-cater-400" />
          <span className="font-semibold">Mess Griya Praja · Pintu A</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-white/80">
          <MealIcon slot="siang" size={13} className="text-cater-400" />
          <span className="font-semibold">Slot SIANG</span>
          <span className="inline-flex items-center gap-1 px-1.5 h-5 rounded bg-cater-500/20 text-cater-300 text-[10px] font-bold mono">11:30 – 13:30</span>
        </div>
        <div className="flex-1" />
        <div className="text-white/70 mono text-[12px] tabular-nums">12:48:32 WIB</div>
        <div className="h-5 w-px bg-white/15" />
        <div className="inline-flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-info-500 text-white flex items-center justify-center text-[10px] font-bold">RS</div>
          <div className="leading-tight">
            <div className="text-[11.5px] font-bold">Rudi Suryanto</div>
            <div className="text-[9px] uppercase tracking-wider text-white/50">Doorkeeper</div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="h-[calc(100%-48px-72px)] flex">
        {/* Scanner viewfinder */}
        <div className="flex-1 relative flex flex-col items-center justify-center">
          {/* mock camera bg */}
          <div className="absolute inset-0" style={{
            background:'radial-gradient(70% 60% at 50% 45%, #1a2333 0%, #0a0d12 80%)',
          }} />
          <svg viewBox="0 0 600 500" className="absolute inset-0 w-full h-full opacity-15">
            <text x="300" y="280" textAnchor="middle" fill="#4179AE" fontSize="160" fontWeight="800" fontFamily="Inter">QR</text>
            <path d="M0,450 L120,420 L240,440 L360,400 L480,430 L600,410 L600,500 L0,500 Z" fill="#0F273E" />
          </svg>

          {/* mode switcher (top) */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 flex bg-black/50 backdrop-blur rounded-xl p-1 border border-white/10">
            {[
              { id:'qr', ic:'qr-code', label:'QR Mode', active:true },
              { id:'rf', ic:'credit-card', label:'RFID Mode' },
              { id:'mn', ic:'keyboard', label:'Manual' },
            ].map(m => (
              <button key={m.id} className={`px-3 h-9 rounded-lg text-[12px] font-bold inline-flex items-center gap-1.5
                ${m.active?'bg-cater-500 text-white shadow':'text-white/70 hover:text-white'}`}>
                <Icon name={m.ic} size={14} /> {m.label}
              </button>
            ))}
          </div>

          {/* Crosshair box */}
          <div className="relative w-[360px] h-[360px]">
            {['tl','tr','bl','br'].map(c => (
              <div key={c}
                   className={`absolute w-14 h-14 ${c.includes('t')?'top-0 border-t-[5px]':'bottom-0 border-b-[5px]'} ${c.includes('l')?'left-0 border-l-[5px]':'right-0 border-r-[5px]'}`}
                   style={{ borderColor:'#F39800',
                     borderRadius: c==='tl'?'12px 0 0 0':c==='tr'?'0 12px 0 0':c==='bl'?'0 0 0 12px':'0 0 12px 0' }} />
            ))}
            <div className="absolute left-2 right-2 h-[3px] rounded-full scan-line"
                 style={{ background:'linear-gradient(90deg, transparent, #F39800, transparent)', boxShadow:'0 0 18px #F39800' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[14px] font-extrabold tracking-tight">Arahkan QR ke kamera</div>
                <div className="mt-1 text-[12px] text-white/60">Atau tap kartu RFID di reader</div>
              </div>
            </div>
          </div>

          {/* Status banner */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 h-10 rounded-full bg-success-500/15 border border-success-500/35 text-success-500 text-[12px] font-bold">
            <Icon name="loader-2" size={14} className="spinner" /> Reader siap · menunggu scan
          </div>

          {/* Override / help buttons */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button className="h-10 px-3 rounded-lg bg-white/[0.06] hover:bg-white/[0.10] border border-white/15 text-[12px] font-bold inline-flex items-center gap-2">
              <Icon name="volume-2" size={14} /> Suara on
            </button>
            <button className="h-10 px-3 rounded-lg bg-white/[0.06] hover:bg-white/[0.10] border border-white/15 text-[12px] font-bold inline-flex items-center gap-2">
              <Icon name="sun" size={14} /> Brightness
            </button>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button onClick={showInvalidModal} className="h-10 px-3 rounded-lg bg-danger-500/20 hover:bg-danger-500/30 border border-danger-500/40 text-danger-500 text-[12px] font-bold inline-flex items-center gap-2">
              <Icon name="alert-circle" size={14} /> Simulasi: tampilkan W3
            </button>
          </div>
        </div>

        {/* Right rail */}
        <div className="w-[320px] shrink-0 border-l border-white/10 flex flex-col">
          <div className="px-4 h-11 border-b border-white/10 flex items-center gap-2">
            <Icon name="activity" size={15} className="text-cater-400" />
            <div className="text-[12px] font-bold uppercase tracking-wider">5 scan terakhir</div>
            <span className="inline-flex items-center gap-1 ml-auto px-1.5 h-5 rounded bg-success-500/20 text-success-500 text-[10px] font-bold">
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-500 pulse-dot text-success-500" />
              Live
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <ScannerScanResult name="Asep Hidayat" nik="NUS-2024-3344"  slot="SIANG" status="valid"   time="12:48:18" />
            <ScannerScanResult name="Rina Wati"    nik="KNC-002-7811"   slot="SIANG" status="valid"   time="12:48:02" />
            <ScannerScanResult name="Joko P."      nik="NUS-2024-1102"  slot="SARAPAN" status="invalid" time="12:47:54" />
            <ScannerScanResult name="Dewi A."      nik="NUS-2024-9921"  slot="SIANG" status="valid"   time="12:47:31" />
            <ScannerScanResult name="Bagas R."     nik="NUS-2024-4488"  slot="SIANG" status="valid"   time="12:47:09" />
          </div>
        </div>
      </div>

      {/* Bottom counter */}
      <div className="h-[72px] border-t border-white/10 px-5 flex items-center gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold">Slot Siang</div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-[26px] font-extrabold mono tracking-tight">1,234</span>
            <span className="text-[13px] text-white/60 font-bold mono">/ 1,450 forecast</span>
          </div>
        </div>
        <div className="flex-1 max-w-[640px]">
          <div className="flex items-center justify-between text-[10px] text-white/60 mb-1.5">
            <span className="font-bold mono">85% scanned</span>
            <span>1h 23m sisa slot</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full" style={{ width:'85%', background:'linear-gradient(90deg, #F39800, #E68506)' }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center ml-auto">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold">Valid</div>
            <div className="text-[18px] font-extrabold mono text-success-500">1,221</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold">Invalid</div>
            <div className="text-[18px] font-extrabold mono text-danger-500">13</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold">Walk-in</div>
            <div className="text-[18px] font-extrabold mono text-cater-400">28</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// W2 — Manual Entry / Override (panel inside scanner)
// ============================================================
function ScannerManualEntry() {
  const results = [
    { name:'Budi Santoso', nik:'NUS-2024-1234', dept:'Operasional PIT', status:'eligible' },
    { name:'Budi Hartanto', nik:'KNC-002-9981', dept:'Hauling', status:'leave' },
    { name:'Budi Rahman',   nik:'NUS-2024-6622', dept:'Workshop',  status:'eligible' },
  ];
  return (
    <div className="h-full w-full text-white" style={{ background:'#0a0d12' }}>
      {/* Top bar */}
      <div className="h-12 px-5 border-b border-white/10 flex items-center gap-4 text-[12px]">
        <button className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-semibold">
          <Icon name="arrow-left" size={14} /> Kembali ke scanner
        </button>
        <div className="h-5 w-px bg-white/15" />
        <div className="inline-flex items-center gap-1.5">
          <Icon name="keyboard" size={14} className="text-cater-400" />
          <span className="font-bold text-[12.5px]">Manual entry · override</span>
        </div>
        <div className="flex-1" />
        <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-warning-500/20 text-warning-500 text-[10px] font-bold uppercase tracking-wider">
          <Icon name="shield-alert" size={11} /> Audit-logged
        </span>
      </div>

      <div className="grid grid-cols-[1fr_360px] h-[calc(100%-48px)]">
        {/* Left: search */}
        <div className="p-6 overflow-y-auto">
          <div className="text-[20px] font-extrabold tracking-tight">Cari pekerja secara manual</div>
          <div className="text-[12.5px] text-white/60 mt-1">Untuk pekerja yang tidak bawa kartu atau HP. Pastikan identitas valid sebelum approve.</div>

          {/* search bar */}
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/15 px-4 h-14">
            <Icon name="search" size={20} className="text-white/50" />
            <input defaultValue="Budi" className="flex-1 bg-transparent outline-none text-[16px] placeholder:text-white/40" placeholder="NIK atau nama lengkap…" />
            <span className="px-2 py-1 rounded bg-white/10 text-[10px] mono">3 hasil</span>
          </div>

          {/* Results */}
          <div className="mt-4 space-y-2">
            {results.map((r,i) => {
              const eligible = r.status === 'eligible';
              return (
                <div key={r.nik}
                  className={`rounded-xl p-3.5 border flex items-center gap-3 ${i===0?'bg-cater-500/15 border-cater-500/50':'bg-white/[0.04] border-white/10'}`}>
                  <Avatar name={r.name} size={48} tone={i===0?'cater':'gray'} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-[14px] font-bold">{r.name}</div>
                      {i===0 && <span className="inline-flex items-center gap-1 px-1.5 h-5 rounded bg-cater-500 text-white text-[9px] font-extrabold uppercase tracking-wider">Selected</span>}
                    </div>
                    <div className="text-[11.5px] text-white/60 mono">{r.nik} · {r.dept}</div>
                  </div>
                  {eligible ? (
                    <span className="inline-flex items-center gap-1 px-2 h-6 rounded-md bg-success-500/20 text-success-500 text-[11px] font-bold">
                      <Icon name="check-circle-2" size={12} /> Eligible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 h-6 rounded-md bg-danger-500/20 text-danger-500 text-[11px] font-bold">
                      <Icon name="x-circle" size={12} /> Sedang cuti
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl bg-white/[0.04] border border-white/10 p-4">
            <div className="text-[11px] uppercase tracking-wider text-white/60 font-bold">Alasan walk-in</div>
            <textarea rows="2" defaultValue="Pekerja kehilangan kartu RFID — sudah lapor ke FAC, dalam proses cetak ulang."
              className="mt-2 w-full bg-transparent text-[13px] outline-none resize-none text-white" />
          </div>
        </div>

        {/* Right: selected detail */}
        <aside className="border-l border-white/10 p-5 overflow-y-auto">
          <div className="text-[11px] uppercase tracking-wider text-white/60 font-bold">Verifikasi identitas</div>
          <div className="mt-3 rounded-xl bg-white/[0.06] border border-white/10 p-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 relative"
                 style={{ background:'linear-gradient(160deg, #4179AE, #143452)' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Avatar name="Budi Santoso" size={92} tone="cater" />
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-[10px] mono text-white/70 bg-black/40 backdrop-blur px-2 py-1 rounded">
                Photo on file · upd 02 Mar 2026
              </div>
            </div>
            <div className="text-[15px] font-extrabold tracking-tight">Budi Santoso</div>
            <div className="text-[11px] text-white/60 mono">NUS-2024-1234</div>

            <div className="mt-3 space-y-1.5 text-[12px]">
              <div className="flex justify-between"><span className="text-white/60">Department</span><span className="font-semibold">Operasional PIT</span></div>
              <div className="flex justify-between"><span className="text-white/60">Shift</span><span className="font-semibold">Pagi · 06–14</span></div>
              <div className="flex justify-between"><span className="text-white/60">Slot</span><span className="font-semibold">SIANG · belum klaim</span></div>
              <div className="flex justify-between"><span className="text-white/60">Diet</span><span className="font-semibold">Halal · alergi kacang</span></div>
            </div>
          </div>

          <Btn variant="cater" size="lg" full icon="check-circle-2" className="mt-4">Approve walk-in claim</Btn>
          <button className="mt-2 w-full h-11 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/15 text-[13px] font-bold">
            Batalkan
          </button>
        </aside>
      </div>
    </div>
  );
}

// ============================================================
// W3 — Invalid Modal (overlay on console)
// ============================================================
function ScannerInvalidModal({ onClose, reason='claimed' }) {
  const reasons = {
    claimed:  { ic:'check-circle-2', tone:'danger', title:'Voucher sudah diklaim', sub:'Voucher ini sudah diredeem 11:42 di Mess Griya Praja' },
    early:    { ic:'clock',          tone:'warning',title:'Voucher belum aktif',   sub:'Slot SIANG aktif 11:30 — coba lagi nanti' },
    leave:    { ic:'palmtree',       tone:'info',   title:'Pekerja sedang cuti',   sub:'Cuti tahunan 18–22 Mei · voucher di-disable otomatis' },
    wrongSlot:{ ic:'shuffle',        tone:'warning',title:'Salah meal slot',       sub:'QR ini untuk slot SARAPAN — slot aktif sekarang SIANG' },
  };
  const r = reasons[reason];
  const toneMap = {
    danger:'bg-danger-500',
    warning:'bg-warning-500',
    info:'bg-info-500',
  };
  return (
    <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-8">
      <div className="w-[480px] rounded-2xl bg-[#15191f] border border-white/10 text-white overflow-hidden shadow-2xl">
        <div className={`h-2 ${toneMap[r.tone]}`} />
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl ${toneMap[r.tone]} flex items-center justify-center`}>
              <Icon name="x" size={28} strokeWidth={3} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">Scan ditolak</div>
              <div className="text-[18px] font-extrabold tracking-tight">{r.title}</div>
            </div>
          </div>
          <div className="mt-3 text-[12.5px] text-white/70">{r.sub}</div>

          {/* Worker info */}
          <div className="mt-4 rounded-xl bg-white/[0.06] p-3 flex items-center gap-3">
            <Avatar name="Joko Pranoto" size={44} tone="gray" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold">Joko Pranoto</div>
              <div className="text-[11px] text-white/60 mono">NUS-2024-1102 · Hauling KNC</div>
            </div>
            <div className="text-right text-[10px] text-white/60">
              <div className="mono">12:47:54</div>
              <div>QR scan</div>
            </div>
          </div>

          {/* Reason breakdown */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { ic:'check-circle-2', lbl:'Voucher sudah diklaim',   active:true,  tone:'danger' },
              { ic:'clock',          lbl:'Voucher belum aktif',     tone:'gray' },
              { ic:'palmtree',       lbl:'Pekerja sedang cuti',     tone:'gray' },
              { ic:'shuffle',        lbl:'Salah meal slot',         tone:'gray' },
            ].map((x,i) => (
              <div key={i} className={`rounded-lg p-2.5 border flex items-center gap-2 ${x.active?'bg-danger-500/15 border-danger-500/40':'bg-white/[0.03] border-white/10'}`}>
                <Icon name={x.ic} size={14} className={x.active?'text-danger-500':'text-white/40'} />
                <div className={`text-[10.5px] font-bold ${x.active?'text-white':'text-white/50'}`}>{x.lbl}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            <button className="flex-1 h-11 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/15 text-[13px] font-bold inline-flex items-center justify-center gap-2">
              <Icon name="phone" size={14} /> Override (call FAC)
            </button>
            <button onClick={onClose} className="flex-1 h-11 rounded-xl bg-cater-500 hover:bg-cater-600 text-white text-[13px] font-bold inline-flex items-center justify-center gap-2">
              <Icon name="check" size={14} /> Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ScannerConsole = ScannerConsole;
window.ScannerManualEntry = ScannerManualEntry;
window.ScannerInvalidModal = ScannerInvalidModal;
