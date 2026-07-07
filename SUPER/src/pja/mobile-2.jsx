// PJA — Mobile screens J6-J10.

// ============================================================
// J6 — Close-out (Selesai PJA)
// ============================================================
function J6_CloseOut() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Selesai PJA" sub="PJA-2026-08412 · Conveyor C-04" />
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hero check */}
        <div className="mx-4 mt-3 rounded-2xl bg-success-50 border border-success-500/30 p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-success-500 text-white flex items-center justify-center"><Icon name="check" size={24} strokeWidth={3} /></div>
          <div className="flex-1">
            <div className="text-[14px] font-extrabold text-success-700">Pekerjaan siap di-close</div>
            <div className="text-[11px] text-success-700/85 mt-0.5">Semua step SOP selesai · 5 foto diunggah</div>
          </div>
        </div>

        {/* Verification checklist */}
        <div className="px-4 mt-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Verifikasi close-out</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { l:'5 SOP step selesai',                 done:true },
              { l:'Before-after photo uploaded (5)',     done:true },
              { l:'Equipment dikembalikan ke gudang',    done:true },
              { l:'Area dibersihkan',                     done:true },
              { l:'LOTO removed · conveyor running',     done:true },
              { l:'Hazard observation di-submit (1)',    done:true },
            ].map((c,i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${c.done?'bg-success-500 text-white':'bg-elev border border-token-strong'}`}>
                  {c.done && <Icon name="check" size={14} strokeWidth={3} />}
                </div>
                <div className="flex-1 text-[12.5px] font-semibold">{c.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="px-4 mt-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Ringkasan</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { l:'Durasi aktual', v:'1j 52m',  sub:'vs estim 2j · -8m', tone:'success' },
              { l:'Foto evidence', v:'5',        sub:'EXIF + GPS ok',     tone:'brand' },
              { l:'SOP steps',      v:'5/5',      sub:'semua selesai',     tone:'success' },
              { l:'Hazard obs',     v:'1',        sub:'idler vibration',   tone:'warning' },
            ].map(s => (
              <div key={s.l} className={`rounded-xl bg-${s.tone}-50 border border-${s.tone}-500/25 p-3`}>
                <div className={`text-[9.5px] uppercase tracking-wider font-bold text-${s.tone}-700/80`}>{s.l}</div>
                <div className={`text-[20px] font-extrabold mono text-${s.tone}-700`}>{s.v}</div>
                <div className="text-[10px] text-muted">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Self-rating */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl p-4">
            <div className="text-[12px] font-extrabold mb-2">Bagaimana pengerjaan tadi?</div>
            <div className="flex items-center justify-between gap-2">
              {[
                { ic:'frown',  tone:'danger',  l:'Buruk' },
                { ic:'meh',    tone:'warning', l:'Biasa' },
                { ic:'smile',  tone:'info',    l:'Bagus' },
                { ic:'star',   tone:'success', l:'Mantap', on:true },
              ].map(r => (
                <button key={r.l} className={`flex-1 rounded-xl border p-3 ${r.on?`bg-${r.tone}-50 border-${r.tone}-500/40`:'border-token'}`}>
                  <Icon name={r.ic} size={20} className={r.on?`text-${r.tone}-600 mx-auto`:'text-subtle mx-auto'} />
                  <div className={`text-[10px] font-bold mt-1 text-center ${r.on?`text-${r.tone}-700`:'text-muted'}`}>{r.l}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Final notes */}
        <div className="px-4 mt-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-1.5">Catatan final · untuk SPV</div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="3" defaultValue="Inspeksi tuntas sesuai SOP. Temuan: idler ke-3 ada getaran ringan — sudah saya flag sebagai hazard observation, perlu follow-up tim maintenance untuk preventive."
              className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>

        {/* Cross-module summary */}
        <div className="px-4 mt-3 space-y-2">
          <XModule icon="clock" label="Timesheet · 1j 52m">
            <span>Waktu kerja akan ter-feed ke modul Timesheet · approval SPV otomatis ter-trigger.</span>
          </XModule>
          <XModule icon="wrench" label="SAP PM trigger · idler vibration">
            <span>Hazard obs idler vibration auto-create WO SAP PM (low severity · 7 hari).</span>
          </XModule>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <Btn variant="success" size="lg" full icon="check-circle-2">Submit · selesai PJA</Btn>
      </div>
    </div>
  );
}

// ============================================================
// J7 — Fuel Request
// ============================================================
function J7_FuelRequest() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Request BBM" sub="Untuk unit HV-001" />
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Driver + unit auto-detect */}
        <div className="mx-4 mt-3 surface rounded-2xl p-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Auto-detect</div>
          <div className="flex items-center gap-3">
            <Avatar name="Budi Santoso" size={42} tone="brand" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-extrabold">Budi Santoso</div>
              <div className="text-[10.5px] text-subtle mono">NSR-009281 · Driver Hauling</div>
            </div>
            <StatusPill tone="success" size="sm" icon="check-circle-2">SIMPER B ✓</StatusPill>
          </div>
          <div className="mt-3 pt-3 border-t border-token flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-safety-50 text-safety-700 flex items-center justify-center"><Icon name="truck" size={18} /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-extrabold">HV-001 · Dump Truck</div>
              <div className="text-[10.5px] text-subtle">Capacity 200L · last refill 142L · 2 hari lalu</div>
            </div>
            <StatusPill tone="success" size="sm">Aktif</StatusPill>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 mt-3 space-y-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Lokasi dispensing</div>
            <div className="flex items-center h-12 rounded-xl border border-token-strong bg-white px-3 gap-2">
              <Icon name="map-pin" size={16} className="text-subtle" />
              <div className="flex-1 text-[13px] font-semibold">Fuel MS Askara</div>
              <Icon name="chevron-down" size={14} className="text-subtle" />
            </div>
            <div className="mt-1 text-[10.5px] text-subtle">Alternatif: Rest Area-2 (KM 78)</div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Volume request</div>
            <div className="flex items-center h-12 rounded-xl border border-token-strong bg-white px-3 gap-2">
              <Icon name="fuel" size={16} className="text-subtle" />
              <input defaultValue="160" className="flex-1 text-[20px] font-extrabold mono outline-none bg-transparent" />
              <span className="text-[12px] font-bold text-muted">liter</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[10.5px]">
              <span className="text-success-700 font-bold">≤ 200L capacity</span>
              <span className="text-muted">·</span>
              <span className="text-muted">Suggested top-up berdasarkan trip ahead: 160L</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Trip purpose</div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { ic:'truck',  l:'Hauling',    on:true },
                { ic:'search', l:'Inspection' },
                { ic:'package',l:'Other' },
              ].map(p => (
                <button key={p.l} className={`h-11 rounded-xl border text-[11.5px] font-bold inline-flex items-center justify-center gap-1.5
                  ${p.on?'bg-brand-50 border-brand-300 text-brand-700':'bg-white border-token text-muted'}`}>
                  <Icon name={p.ic} size={13} /> {p.l}
                </button>
              ))}
            </div>
          </div>

          {/* Quota indicator */}
          <div className="surface rounded-xl p-3.5">
            <div className="flex items-baseline justify-between mb-1.5">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">Fuel quota bulan ini</div>
              <div className="text-[11px] font-bold mono">3,840 / 5,200 L</div>
            </div>
            <div className="h-2.5 rounded-full bg-elev overflow-hidden">
              <div className="h-full rounded-full bg-safety-500" style={{ width:'74%' }} />
            </div>
            <div className="mt-1.5 text-[10.5px] text-muted">Setelah refill 160L → 4,000 / 5,200 L (77%)</div>
          </div>

          <XModule icon="building-2" label="Validasi via Contractor Mgmt">
            <span>SIMPER B Budi valid sampai 14 Aug 2026 · cleared untuk Dump Truck.</span>
          </XModule>
          <XModule icon="fuel" label="Fuel Management System">
            <span>Voucher akan generated dengan QR · expire 4 jam · 1 dispensing only.</span>
          </XModule>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <Btn variant="safety" size="lg" full icon="qr-code">Request voucher BBM</Btn>
      </div>
    </div>
  );
}

// ============================================================
// J8 — Fuel Voucher (QR display)
// ============================================================
function J8_FuelVoucher() {
  return (
    <div className="flex-1 flex flex-col" style={{ background:'linear-gradient(180deg, #523300 0%, #A36500 40%, #FEF4E5 100%)' }}>
      <div className="px-5 pt-1 pb-3 flex items-center gap-3 shrink-0 text-white">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
        <div className="flex-1">
          <div className="text-[15px] font-bold tracking-tight">Voucher BBM</div>
          <div className="text-[11px] opacity-80">Tunjukkan ke operator dispenser</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6">
        {/* Voucher card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top stripe */}
          <div className="bg-safety-500 px-4 py-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="fuel" size={18} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.18em]">Fuel voucher</span>
            </div>
            <span className="px-2 h-6 rounded bg-white/20 text-[10px] font-extrabold mono inline-flex items-center">FV-2026-08412</span>
          </div>

          {/* QR section */}
          <div className="px-5 py-5 flex flex-col items-center relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[color:var(--bg)]" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[color:var(--bg)]" />
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-safety-700 mb-3">Scan untuk dispense</div>
            <div className="p-3 rounded-2xl bg-safety-50 border-2 border-safety-500/30">
              <QRCode size={180} accent="#523300" />
            </div>
            <div className="mt-3 inline-flex items-center gap-2 px-3 h-8 rounded-full bg-warning-50 text-warning-700 text-[11px] font-bold">
              <Icon name="clock" size={13} />
              Valid sampai <span className="mono">13:42</span> · 3j 47m lagi
            </div>
          </div>

          {/* Detail */}
          <div className="border-t border-dashed border-token mx-4" />
          <div className="px-5 py-4 grid grid-cols-2 gap-y-3 gap-x-3 text-[11.5px]">
            <div>
              <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Driver</div>
              <div className="font-extrabold">Budi Santoso</div>
            </div>
            <div>
              <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">NIK</div>
              <div className="font-extrabold mono">NSR-009281</div>
            </div>
            <div>
              <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Unit</div>
              <div className="font-extrabold">HV-001 · Dump Truck</div>
            </div>
            <div>
              <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Volume</div>
              <div className="font-extrabold mono text-[16px]">160 L</div>
            </div>
            <div>
              <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Lokasi</div>
              <div className="font-extrabold">Fuel MS Askara</div>
            </div>
            <div>
              <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Purpose</div>
              <div className="font-extrabold">Hauling</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 rounded-xl bg-white/85 backdrop-blur p-3 flex items-start gap-2.5">
          <Icon name="info" size={16} className="text-safety-700 mt-0.5 shrink-0" />
          <div className="text-[11.5px] text-safety-700">
            <span className="font-extrabold">Cara dispense:</span> tunjukkan QR ke operator pompa di Fuel MS Askara, lalu foto meter reading setelah selesai.
          </div>
        </div>

        {/* Status */}
        <div className="mt-3 bg-white rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-warning-50 text-warning-600 flex items-center justify-center">
            <Icon name="loader-2" size={18} className="spinner" />
          </div>
          <div className="flex-1">
            <div className="text-[12px] font-bold">Menunggu dispense...</div>
            <div className="text-[10.5px] text-muted">Status akan update otomatis saat dispenser scan QR.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// J9 — Maintenance Request (Light WO Housing)
// ============================================================
function J9_MaintenanceRequest() {
  const sev = 'high'; // low / medium / high / critical
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Lapor maintenance" sub="Housing maintenance · Mess A" />
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-4 pt-3 space-y-3">
          {/* Category */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Kategori</div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { ic:'snowflake', l:'AC',        on:true },
                { ic:'zap',       l:'Listrik' },
                { ic:'droplet',   l:'Air / pipa' },
                { ic:'armchair',  l:'Furniture' },
                { ic:'wifi',       l:'Internet' },
                { ic:'more-horizontal', l:'Lainnya' },
              ].map(c => (
                <button key={c.l} className={`h-16 rounded-xl border flex flex-col items-center justify-center gap-0.5 ${c.on?'bg-brand-50 border-brand-300 text-brand-700':'bg-white border-token text-muted'}`}>
                  <Icon name={c.ic} size={18} />
                  <span className="text-[10px] font-bold">{c.l}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Severity */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Severity</div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { l:'Low',      sub:'Besok',  tone:'gray' },
                { l:'Medium',   sub:'Hari ini',tone:'warning' },
                { l:'High',     sub:'< 1 jam', tone:'safety', on:true },
                { l:'Critical', sub:'Urgent',  tone:'danger' },
              ].map(s => (
                <button key={s.l} className={`rounded-xl p-2.5 border text-center ${s.on?`bg-${s.tone}-50 border-${s.tone}-500/40`:'bg-white border-token'}`}>
                  <div className={`text-[12px] font-extrabold ${s.on?`text-${s.tone}-700`:''}`}>{s.l}</div>
                  <div className={`text-[9.5px] mt-0.5 ${s.on?`text-${s.tone}-700/80`:'text-subtle'}`}>{s.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location auto-detect */}
          <div className="surface rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info-50 text-info-600 flex items-center justify-center"><Icon name="home" size={17} /></div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-wider text-muted font-bold">Lokasi · auto-detect</div>
              <div className="text-[13px] font-extrabold">Mess Griya Praja · Kamar B-204</div>
              <div className="text-[10.5px] text-subtle">Dari booking attendance · 18 Mei</div>
            </div>
            <Icon name="check-circle-2" size={16} className="text-success-500" />
          </div>

          {/* Description */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Deskripsi masalah</div>
            <div className="rounded-xl border border-token-strong bg-white p-3">
              <textarea rows="3" defaultValue="AC kamar tidak dingin sejak tadi malam. Suara compressor seperti nyala-mati tidak stabil. Suhu kamar saat ini 32°C."
                className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
            </div>
          </div>

          {/* Photos */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Foto bukti</div>
            <div className="grid grid-cols-4 gap-2">
              {[true, true, false, false].map((on,i) => (
                <button key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 ${on?'bg-success-50 border border-success-500/30 text-success-700':'border-2 border-dashed border-token-strong text-subtle'}`}>
                  <Icon name={on?'image':'camera'} size={20} />
                  {on && <span className="text-[9px] font-bold">Foto {i+1}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* SAP PM auto-trigger banner */}
          {sev === 'high' || sev === 'critical' ? (
            <XModule icon="wrench" label="SAP PM auto-escalate">
              <span>Severity {sev} akan otomatis di-create sebagai WO di SAP PM module · technician di-dispatch dalam &lt;1 jam.</span>
            </XModule>
          ) : null}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <Btn variant="primary" size="lg" full icon="send">Submit request · est. &lt; 1 jam</Btn>
      </div>
    </div>
  );
}

// ============================================================
// J10 — Handover Shift (SPV)
// ============================================================
function J10_HandoverShift() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Handover shift" sub="SPV Pagi → SPV Sore" />
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Header card */}
        <div className="mx-4 mt-3 rounded-2xl text-white p-4 relative overflow-hidden"
             style={{ background:'linear-gradient(135deg, #1F4E79 0%, #143452 100%)' }}>
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.18em] font-extrabold opacity-85">Handover · 19 Mei 2026 · 14:00</div>
            <div className="mt-2 flex items-center gap-3">
              <Avatar name="Hadi Wijaya" size={40} tone="safety" />
              <Icon name="arrow-right" size={20} className="opacity-75" />
              <Avatar name="Yusuf Kurniawan" size={40} tone="info" />
            </div>
            <div className="mt-2 text-[14px] font-extrabold">Pak Hadi → Pak Yusuf</div>
            <div className="text-[11px] opacity-85">Shift Pagi (06–14) → Shift Sore (14–22)</div>
          </div>
        </div>

        {/* PJA in-progress */}
        <div className="px-4 mt-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">PJA in-progress · lanjut ke sore</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { id:'PJA-2026-08412', t:'Inspeksi conveyor C-04',     w:'Budi S. + 1', prog:'60%' },
              { id:'PJA-2026-08421', t:'Cek kebocoran hydrant H-04', w:'Asep H. + 2', prog:'25%' },
              { id:'PJA-2026-08405', t:'Install rambu Workshop A',    w:'Eko S.',      prog:'BLOCK · ladder' },
            ].map((r,i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-warning-50 text-warning-700 flex items-center justify-center"><Icon name="play-circle" size={16} /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-bold truncate">{r.t}</div>
                  <div className="text-[10.5px] text-muted">{r.id} · {r.w}</div>
                </div>
                <span className="text-[11px] font-extrabold mono text-warning-700">{r.prog}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hazard + PTW + Equipment */}
        <div className="px-4 mt-3 grid grid-cols-2 gap-2">
          <div className="surface rounded-xl p-3">
            <div className="text-[9.5px] uppercase tracking-wider text-danger-700 font-bold mb-1.5">Hazard reported (3)</div>
            <ul className="space-y-1 text-[10.5px] text-muted">
              <li className="flex items-start gap-1"><Icon name="dot" size={11} className="text-danger-500 mt-0.5" /><span>Idler vibration C-04</span></li>
              <li className="flex items-start gap-1"><Icon name="dot" size={11} className="text-danger-500 mt-0.5" /><span>Genangan oli Workshop B</span></li>
              <li className="flex items-start gap-1"><Icon name="dot" size={11} className="text-danger-500 mt-0.5" /><span>Lampu redup Mess B</span></li>
            </ul>
          </div>
          <div className="surface rounded-xl p-3">
            <div className="text-[9.5px] uppercase tracking-wider text-success-700 font-bold mb-1.5">PTW active (5)</div>
            <ul className="space-y-1 text-[10.5px] text-muted">
              <li className="flex items-start gap-1"><Icon name="dot" size={11} className="text-success-500 mt-0.5" /><span>PTW-00123 HW · Coal Pad</span></li>
              <li className="flex items-start gap-1"><Icon name="dot" size={11} className="text-success-500 mt-0.5" /><span>PTW-00125 WH · Workshop</span></li>
              <li className="flex items-start gap-1"><Icon name="dot" size={11} className="text-success-500 mt-0.5" /><span>+ 3 lainnya</span></li>
            </ul>
          </div>
          <div className="surface rounded-xl p-3 col-span-2">
            <div className="text-[9.5px] uppercase tracking-wider text-warning-700 font-bold mb-1.5">Equipment issues (2)</div>
            <ul className="space-y-1 text-[10.5px] text-muted">
              <li className="flex items-start gap-1"><Icon name="dot" size={11} className="text-warning-500 mt-0.5" /><span>Ladder 6m masih dipakai PT BWS · estimasi return 15:00</span></li>
              <li className="flex items-start gap-1"><Icon name="dot" size={11} className="text-warning-500 mt-0.5" /><span>Welder set NSR-EQ-0431 service dijadwalkan besok pagi</span></li>
            </ul>
          </div>
        </div>

        {/* Notes from morning SPV */}
        <div className="px-4 mt-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-1.5">Catatan dari SPV pagi</div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="3" defaultValue="Tim Hauling B siap operasi sore. Briefing K3 sudah saya kasih jam 13:30. Pak Yusuf, mohon awasi PJA install rambu Workshop A — ladder baru tersedia 15:00, jangan paksa worker mulai sebelum itu."
              className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>

        {/* Signatures */}
        <div className="px-4 mt-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Digital signature</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="surface rounded-xl p-3 ring-2 ring-success-500/30">
              <div className="text-[10px] uppercase tracking-wider text-success-700 font-bold flex items-center gap-1"><Icon name="check-circle-2" size={11} /> SPV pagi</div>
              <Avatar name="Hadi Wijaya" size={36} tone="safety" className="mx-auto mt-2" />
              <div className="text-center text-[12px] font-bold mt-1.5">Pak Hadi</div>
              <div className="sig-line h-7 mt-1 flex items-end pb-0.5"><span className="text-[10px] mono italic text-success-700">~ signed 13:58</span></div>
            </div>
            <div className="surface rounded-xl p-3 ring-2 ring-warning-500/30">
              <div className="text-[10px] uppercase tracking-wider text-warning-700 font-bold flex items-center gap-1"><Icon name="clock" size={11} /> SPV sore</div>
              <Avatar name="Yusuf Kurniawan" size={36} tone="info" className="mx-auto mt-2" />
              <div className="text-center text-[12px] font-bold mt-1.5">Pak Yusuf</div>
              <button className="w-full mt-1.5 h-7 rounded bg-warning-500 text-white text-[10px] font-extrabold">Tap untuk sign</button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <Btn variant="primary" size="lg" full icon="send">Kirim handover · tunggu SPV sore</Btn>
      </div>
    </div>
  );
}

window.J6_CloseOut          = J6_CloseOut;
window.J7_FuelRequest        = J7_FuelRequest;
window.J8_FuelVoucher        = J8_FuelVoucher;
window.J9_MaintenanceRequest = J9_MaintenanceRequest;
window.J10_HandoverShift     = J10_HandoverShift;
