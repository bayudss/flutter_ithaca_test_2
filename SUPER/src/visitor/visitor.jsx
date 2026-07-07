// Visitor — External flow V9-V12 + Escort mobile M1.

// ============================================================
// V9 — Invitation Email (web, rendered email)
// ============================================================
function V9_Email() {
  return (
    <div className="h-full w-full bg-elev overflow-y-auto p-8">
      <div className="max-w-[640px] mx-auto">
        {/* Email client chrome */}
        <div className="rounded-t-xl bg-white border border-token px-5 py-3 flex items-center gap-3">
          <Avatar name="Nusaraya Mining" size={36} tone="brand" />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-extrabold">PT Nusaraya Mining · Visitor Management</div>
            <div className="text-[11px] text-muted">no-reply@nusaraya.id · ke: anton.wijaya@trakindo.co.id</div>
          </div>
          <span className="text-[10px] text-subtle mono">28 Mei · 15:02</span>
        </div>

        {/* Email body */}
        <div className="bg-white border-x border-b border-token rounded-b-xl overflow-hidden">
          {/* Hero */}
          <div className="bg-brand-700 text-white px-6 py-6 text-center">
            <BrandMark size={48} />
            <div className="mt-3 text-[20px] font-extrabold tracking-tight">Anda diundang berkunjung ke<br/>PT Nusaraya Mining</div>
          </div>

          <div className="p-6">
            <div className="text-[13px] leading-relaxed mb-4">
              Halo <span className="font-bold">Bapak Anton Wijaya</span>,<br/>
              Anda dijadwalkan berkunjung ke site Bahana atas undangan <span className="font-bold">Budi Hartono (Operations)</span>.
            </div>

            {/* Visit details card */}
            <div className="rounded-xl bg-elev p-4 mb-5">
              <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Detail kunjungan</div>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-[12px]">
                <div className="flex items-center gap-1.5"><Icon name="calendar" size={13} className="text-brand-500" /><span className="text-muted">Tanggal</span></div>
                <div className="font-bold text-right">29 Mei 2026</div>
                <div className="flex items-center gap-1.5"><Icon name="clock" size={13} className="text-brand-500" /><span className="text-muted">Waktu</span></div>
                <div className="font-bold text-right mono">09:00 – 17:00</div>
                <div className="flex items-center gap-1.5"><Icon name="map-pin" size={13} className="text-brand-500" /><span className="text-muted">Lokasi</span></div>
                <div className="font-bold text-right">Site Bahana · Office</div>
                <div className="flex items-center gap-1.5"><Icon name="user-check" size={13} className="text-brand-500" /><span className="text-muted">Host</span></div>
                <div className="font-bold text-right">Budi Hartono</div>
              </div>
            </div>

            {/* Preparation tasks */}
            <div className="text-[13px] font-extrabold mb-1">Sebelum berkunjung, mohon lengkapi:</div>
            <div className="text-[11px] text-muted mb-3">Wajib selesai sebelum tanggal kunjungan untuk dapat Mine Permit.</div>
            <div className="space-y-2 mb-5">
              {[
                { ic:'shield-check', l:'Mulai K3L Induction Online', sub:'45 menit · wajib lulus quiz 80%', tone:'safety' },
                { ic:'stethoscope',  l:'Submit MCU Declaration',      sub:'Self-declaration riwayat kesehatan', tone:'info' },
                { ic:'file-signature',l:'Sign NDA',                    sub:'Non-disclosure agreement', tone:'brand' },
              ].map((t,i) => (
                <div key={i} className="rounded-xl border border-token p-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-${t.tone}-50 text-${t.tone}-600 flex items-center justify-center`}><Icon name={t.ic} size={18} /></div>
                  <div className="flex-1 min-w-0"><div className="text-[12.5px] font-extrabold">{t.l}</div><div className="text-[10.5px] text-muted">{t.sub}</div></div>
                  <div className={`h-8 px-3 rounded-md bg-${t.tone}-500 text-white text-[11px] font-bold inline-flex items-center gap-1`}>Mulai <Icon name="arrow-right" size={12} /></div>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-warning-50 border border-warning-500/25 p-3 text-[11px] text-warning-700 flex items-start gap-2">
              <Icon name="clock" size={13} className="mt-0.5 shrink-0" />
              <span>Link valid sampai <span className="font-bold">29 Mei 2026</span>. Mohon selesaikan minimal H-1.</span>
            </div>
          </div>

          <div className="bg-elev px-6 py-3 text-center text-[10px] text-subtle border-t border-token">
            PT Nusaraya Mining · Compliance Kepmen ESDM 1827/2018 · Pertanyaan? hubungi host Anda
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// V10 — Online K3L Induction (web, visitor side)
// ============================================================
function V10_Induction() {
  return (
    <div className="h-full w-full bg-elev overflow-y-auto">
      {/* Header */}
      <div className="bg-brand-700 text-white px-6 py-3 flex items-center gap-3 sticky top-0 z-10">
        <BrandMark size={28} />
        <div className="flex-1"><div className="text-[13px] font-extrabold">K3L Induction Online</div><div className="text-[10px] opacity-80">PT Nusaraya Mining · untuk Anton Wijaya</div></div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center relative">
            <Icon name="camera" size={16} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-danger-500 alert-blink" />
          </div>
          <div className="text-[10px] leading-tight"><div className="font-bold">Anti-cheat</div><div className="opacity-70">selfie aktif</div></div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto p-6">
        {/* Progress */}
        <div className="surface rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[12px] font-extrabold">Module progress</div>
            <div className="text-[11px] font-bold mono">6 / 8 slides · 32 menit</div>
          </div>
          <div className="h-2.5 rounded-full bg-elev overflow-hidden"><div className="h-full rounded-full bg-brand-500" style={{ width:'75%' }} /></div>
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto">
            {['Intro Nusaraya','Hazard tambang','APD','Emergency','Do & don\'t','Traffic mgmt','Environment','Quiz'].map((s,i) => (
              <div key={i} className={`px-2.5 h-7 rounded-md text-[10.5px] font-bold whitespace-nowrap inline-flex items-center gap-1 ${i<6?'bg-success-50 text-success-700':i===6?'bg-brand-50 text-brand-700 border border-brand-300':'bg-elev text-subtle'}`}>
                {i<6 && <Icon name="check" size={10} strokeWidth={3} />}{s}
              </div>
            ))}
          </div>
        </div>

        {/* Slide content */}
        <div className="surface rounded-xl overflow-hidden mb-4">
          <div className="aspect-[16/8] relative flex items-center justify-center" style={{ background:'linear-gradient(135deg, #143452 0%, #1F4E79 100%)' }}>
            <div className="text-center text-white">
              <div className="w-16 h-16 rounded-2xl bg-safety-500 flex items-center justify-center mx-auto mb-3"><Icon name="hard-hat" size={32} /></div>
              <div className="text-[22px] font-extrabold tracking-tight">Slide 7 — Environment Awareness</div>
              <div className="text-[13px] opacity-80 mt-1">Pengelolaan limbah, water management, rehabilitasi tambang</div>
            </div>
            {/* Selfie monitor PIP */}
            <div className="absolute bottom-3 right-3 w-24 h-32 rounded-lg overflow-hidden border-2 border-white/40" style={{ background:'linear-gradient(160deg, #4179AE, #143452)' }}>
              <div className="absolute inset-0 flex items-center justify-center"><Icon name="user" size={40} className="text-white/70" /></div>
              <div className="absolute bottom-1 left-1 right-1 text-center text-[7.5px] mono text-white bg-black/45 rounded px-1">REC · face ok</div>
            </div>
            {/* Nav */}
            <button className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center"><Icon name="chevron-left" size={20} /></button>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-brand-700 flex items-center justify-center"><Icon name="chevron-right" size={20} /></button>
          </div>
          <div className="px-5 py-3 flex items-center gap-3">
            <Icon name="volume-2" size={16} className="text-brand-500" />
            <div className="flex-1 h-1.5 rounded-full bg-elev overflow-hidden"><div className="h-full bg-brand-500" style={{ width:'45%' }} /></div>
            <span className="text-[11px] mono text-subtle">02:14 / 04:50</span>
          </div>
        </div>

        {/* Quiz preview */}
        <div className="surface rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="help-circle" size={16} className="text-brand-500" />
            <div className="text-[13px] font-extrabold">Quiz · question 1 / 10</div>
            <span className="ml-auto text-[10.5px] text-muted">Pass score 80% · retry allowed</span>
          </div>
          <div className="text-[14px] font-bold mb-3">Apa yang harus dilakukan saat mendengar sirine emergency 3× panjang di area tambang?</div>
          <div className="space-y-2">
            {[
              { l:'Lanjut bekerja sampai selesai', sel:false },
              { l:'Segera menuju muster point terdekat dan tunggu instruksi', sel:true, correct:true },
              { l:'Pulang ke mess', sel:false },
              { l:'Telepon keluarga dulu', sel:false },
            ].map((o,i) => (
              <button key={i} className={`w-full text-left rounded-xl border p-3 flex items-center gap-3 ${o.sel?'bg-success-50 border-success-500/40':'bg-white border-token hover:border-brand-200'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold ${o.sel?'bg-success-500 text-white':'border border-token-strong text-subtle'}`}>{String.fromCharCode(65+i)}</div>
                <span className="flex-1 text-[12.5px] font-semibold">{o.l}</span>
                {o.sel && <Icon name="check-circle-2" size={16} className="text-success-500" />}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="text-[11px] text-muted">Selesaikan semua slide untuk unlock quiz penuh</div>
            <div className="flex-1" />
            <Btn variant="primary" size="sm" iconRight="arrow-right">Next question</Btn>
          </div>
        </div>

        {/* Cert on pass */}
        <div className="mt-4 rounded-xl audit-note p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white text-safety-700 flex items-center justify-center border border-safety-500/30"><Icon name="award" size={20} /></div>
          <div className="flex-1">
            <div className="text-[12.5px] font-extrabold text-safety-700">Certificate auto-generated saat lulus</div>
            <div className="text-[11px] text-safety-700/85">K3L Induction certificate (valid untuk visit ini) langsung masuk pre-arrival hub host + audit trail.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// V11 — MCU Declaration Form (web, visitor side)
// ============================================================
function V11_MCU() {
  return (
    <div className="h-full w-full bg-elev overflow-y-auto">
      <div className="bg-info-600 text-white px-6 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Icon name="stethoscope" size={20} />
        <div className="flex-1"><div className="text-[13px] font-extrabold">MCU Self-Declaration</div><div className="text-[10px] opacity-80">PT Nusaraya · untuk Anton Wijaya</div></div>
        <StatusPill tone="dark" size="sm" icon="lock">Confidential</StatusPill>
      </div>

      <div className="max-w-[760px] mx-auto p-6 space-y-4">
        <div className="rounded-xl bg-info-50 border border-info-500/25 p-3 flex items-start gap-2.5">
          <Icon name="info" size={16} className="text-info-600 mt-0.5 shrink-0" />
          <div className="text-[11.5px] text-info-700">Declaration ini untuk menentukan kelayakan akses area tambang. Data kesehatan bersifat <span className="font-bold">confidential</span> — hanya diakses SO untuk risk assessment.</div>
        </div>

        {/* Riwayat penyakit */}
        <div className="surface rounded-xl p-5">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Riwayat penyakit</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { l:'Jantung / kardiovaskular', sel:false },
              { l:'Hipertensi', sel:true },
              { l:'Diabetes', sel:false },
              { l:'Asma / pernapasan', sel:false },
              { l:'Epilepsi / kejang', sel:false },
              { l:'Vertigo / gangguan keseimbangan', sel:false },
            ].map((c,i) => (
              <button key={i} className={`flex items-center gap-2 px-3 h-10 rounded-lg border text-left ${c.sel?'bg-warning-50 border-warning-400 text-warning-700':'bg-white border-token'}`}>
                <div className={`w-4 h-4 rounded ${c.sel?'bg-warning-500':'border border-token-strong bg-white'} flex items-center justify-center`}>{c.sel && <Icon name="check" size={11} className="text-white" strokeWidth={3} />}</div>
                <span className="text-[12px] font-semibold flex-1">{c.l}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Obat + alergi */}
        <div className="grid grid-cols-2 gap-4">
          <div className="surface rounded-xl p-5">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Obat dikonsumsi</div>
            <div className="rounded-lg border border-token-strong bg-white p-2.5"><textarea rows="2" defaultValue="Amlodipine 5mg (tekanan darah), 1× sehari" className="w-full bg-transparent outline-none text-[12.5px] resize-none" /></div>
          </div>
          <div className="surface rounded-xl p-5">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Alergi</div>
            <div className="rounded-lg border border-token-strong bg-white p-2.5"><textarea rows="2" defaultValue="Tidak ada alergi obat/makanan yang diketahui" className="w-full bg-transparent outline-none text-[12.5px] resize-none" /></div>
          </div>
        </div>

        {/* Kondisi fisik */}
        <div className="surface rounded-xl p-5">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Kondisi fisik · kemampuan</div>
          <div className="space-y-2">
            {[
              { l:'Bisa naik/turun tangga tanpa bantuan', yes:true },
              { l:'Bisa memakai APD lengkap (helm, vest, safety shoes)', yes:true },
              { l:'Bisa berjalan di medan tidak rata', yes:true },
              { l:'Sedang hamil (jika perempuan)', yes:false, na:true },
              { l:'Riwayat cidera serius 6 bulan terakhir', yes:false },
            ].map((q,i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-elev">
                <span className="flex-1 text-[12.5px] font-semibold">{q.l}</span>
                <div className="flex items-center gap-1.5">
                  <button className={`px-3 h-8 rounded-md text-[11px] font-bold ${q.yes&&!q.na?'bg-success-500 text-white':'bg-white border border-token text-muted'}`}>Ya</button>
                  <button className={`px-3 h-8 rounded-md text-[11px] font-bold ${!q.yes&&!q.na?'bg-brand-500 text-white':q.na?'bg-elev border border-token text-subtle':'bg-white border border-token text-muted'}`}>{q.na?'N/A':'Tidak'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-flag warning */}
        <div className="rounded-xl bg-warning-50 border border-warning-500/30 p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-warning-500 text-white flex items-center justify-center shrink-0"><Icon name="alert-triangle" size={18} /></div>
          <div className="flex-1">
            <div className="text-[12.5px] font-extrabold text-warning-700">Auto-flag: Hipertensi declared</div>
            <div className="text-[11px] text-warning-700/85 mt-0.5">Kondisi ini akan di-review SO. Kemungkinan <span className="font-bold">restricted access</span> untuk area high-altitude / physically demanding (PIT, Coal Pad). Office tetap diizinkan.</div>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="surface rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded bg-brand-500 text-white flex items-center justify-center shrink-0 mt-0.5"><Icon name="check" size={14} strokeWidth={3} /></div>
            <div className="flex-1 text-[12.5px] leading-relaxed"><span className="font-bold">Saya, Anton Wijaya, menyatakan</span> bahwa informasi kesehatan di atas benar dan lengkap. Saya memahami bahwa informasi tidak benar dapat membahayakan keselamatan saya dan membatalkan akses kunjungan.</div>
          </div>
          <div className="mt-3 sig-line h-12 flex items-end pb-1"><span className="text-[13px] mono italic text-brand-700">~ Anton Wijaya ~</span></div>
          <div className="text-[10px] text-subtle mt-1">28 Mei 2026 · 16:08 · IP logged untuk audit</div>
        </div>

        <Btn variant="primary" size="lg" full icon="send">Submit MCU declaration</Btn>
      </div>
    </div>
  );
}

// ============================================================
// V12 — Mine Permit Wallet (visitor mobile)
// ============================================================
function V12_Wallet() {
  return (
    <div className="flex-1 flex flex-col" style={{ background:'linear-gradient(180deg, #0A1A29 0%, #143452 45%, #f5f6f8 90%)' }}>
      <div className="px-5 pt-1 pb-3 flex items-center gap-3 shrink-0 text-white">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
        <div className="flex-1"><div className="text-[15px] font-bold tracking-tight">Mine Permit</div><div className="text-[11px] opacity-80">Digital wallet</div></div>
        <button className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="share-2" size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6">
        {/* Permit card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-brand-700 text-white px-4 py-3 flex items-center gap-2.5">
            <BrandMark size={32} />
            <div className="flex-1"><div className="text-[8px] uppercase tracking-[0.2em] opacity-80 font-bold">PT Nusaraya Mining</div><div className="text-[15px] font-extrabold tracking-tight leading-none">MINE PERMIT</div></div>
            <StatusPill tone="dark" size="sm" icon="circle-play">Active</StatusPill>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar name="Anton Wijaya" size={56} photo />
              <div className="flex-1"><div className="text-[16px] font-extrabold tracking-tight">Anton Wijaya</div><div className="text-[11px] text-muted">PT Trakindo Utama</div><div className="text-[9.5px] text-subtle mono mt-0.5">MP-2026-0421</div></div>
            </div>
            <div className="rounded-lg bg-brand-50 border border-brand-200 px-3 py-2 mb-3">
              <div className="text-[9px] uppercase tracking-wider text-brand-700 font-bold">Valid</div>
              <div className="text-[12px] font-extrabold mono text-brand-700">29 Mei 2026 · 09:00 — 17:00</div>
            </div>
            {/* QR */}
            <div className="flex justify-center py-2">
              <div className="p-2.5 rounded-xl bg-white border-2 border-brand-100"><QRCode size={150} accent="#143452" /></div>
            </div>
            <div className="text-center text-[10px] text-subtle font-bold uppercase tracking-wider">Scan di area gate</div>
          </div>
        </div>

        {/* Areas */}
        <div className="mt-3 bg-white rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Area authorized</div>
          <div className="space-y-1.5">
            <AreaAccess name="Office area" allowed={true} />
            <AreaAccess name="Mess Griya Praja" allowed={true} />
            <AreaAccess name="PIT Bahana" allowed={true} escort={true} risk="high" />
            <AreaAccess name="Coal Pad" allowed={false} />
          </div>
        </div>

        {/* Escort */}
        <div className="mt-3 bg-white rounded-2xl p-4 flex items-center gap-3">
          <Avatar name="Budi Hartono" size={42} tone="brand" />
          <div className="flex-1"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Escort Anda</div><div className="text-[13px] font-extrabold">Budi Hartono</div><div className="text-[10.5px] text-muted">Operations · SIMPER B</div></div>
          <button className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name="phone" size={18} /></button>
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="rounded-2xl bg-danger-500 text-white p-3.5 flex flex-col items-center gap-1.5"><Icon name="phone-call" size={22} /><span className="text-[12px] font-extrabold">Emergency hotline</span></button>
          <button className="rounded-2xl bg-white border border-token p-3.5 flex flex-col items-center gap-1.5"><Icon name="flag" size={22} className="text-warning-600" /><span className="text-[12px] font-extrabold">Lapor masalah</span></button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M1 — Escort Duty (Nusaraya employee mobile)
// ============================================================
function M1_EscortDuty() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Tugas Escort" sub="Active escort duty" dark={true} />
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Active escort card */}
        <div className="mx-4 mt-3 rounded-2xl bg-white border border-token overflow-hidden shadow-sm">
          <div className="bg-brand-700 text-white px-4 py-2.5 flex items-center gap-2">
            <span className="relative inline-flex w-2 h-2 rounded-full bg-success-400 pulse-dot text-success-400" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Active escort</span>
            <span className="ml-auto text-[10px] mono opacity-80">since 09:15</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Avatar name="Anton Wijaya" size={56} photo />
              <div className="flex-1"><div className="text-[16px] font-extrabold tracking-tight">Anton Wijaya</div><div className="text-[11px] text-muted">PT Trakindo Utama</div><div className="text-[9.5px] text-subtle mono mt-0.5">MP-2026-0421</div></div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-elev p-2.5"><div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Hari ini</div><div className="text-[13px] font-extrabold mono">09:00 – 17:00</div></div>
              <div className="rounded-lg bg-elev p-2.5"><div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Lokasi now</div><div className="text-[13px] font-extrabold">Office area</div></div>
            </div>
          </div>
        </div>

        {/* Area authorized */}
        <div className="px-4 mt-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Area authorized visitor</div>
          <div className="surface rounded-2xl p-3 space-y-1.5">
            <AreaAccess name="Office area" allowed={true} />
            <AreaAccess name="Mess Griya Praja" allowed={true} />
            <AreaAccess name="PIT Bahana" allowed={true} escort={true} risk="high" />
            <AreaAccess name="Coal Pad" allowed={false} />
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-4 mt-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Quick action</div>
          <div className="space-y-2">
            <button className="w-full surface rounded-2xl p-3.5 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name="map-pin" size={18} /></div>
              <div className="flex-1"><div className="text-[13px] font-extrabold">Lapor lokasi sekarang</div><div className="text-[10.5px] text-muted">Untuk audit trail · GPS check-in</div></div>
              <Icon name="chevron-right" size={16} className="text-subtle" />
            </button>

            {/* Check authorization */}
            <button className="w-full surface rounded-2xl p-3.5 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-warning-50 text-warning-600 flex items-center justify-center"><Icon name="search-check" size={18} /></div>
              <div className="flex-1"><div className="text-[13px] font-extrabold">Visitor ingin ke area X</div><div className="text-[10.5px] text-muted">Cek authorization sebelum masuk</div></div>
              <Icon name="chevron-right" size={16} className="text-subtle" />
            </button>

            {/* Authorization check result example */}
            <div className="rounded-2xl bg-danger-50 border border-danger-500/25 p-3.5">
              <div className="flex items-center gap-2 mb-1.5"><Icon name="x-circle" size={16} className="text-danger-500" /><span className="text-[12.5px] font-extrabold text-danger-700">Coal Pad — NOT authorized</span></div>
              <div className="text-[11px] text-danger-700/85">Visitor tidak punya akses ke Coal Pad di permit ini. Jangan izinkan masuk. Hubungi SO untuk eskalasi bila perlu.</div>
            </div>

            <button className="w-full surface rounded-2xl p-3.5 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-elev text-muted flex items-center justify-center"><Icon name="log-out" size={18} /></div>
              <div className="flex-1"><div className="text-[13px] font-extrabold">End escort</div><div className="text-[10.5px] text-muted">Bila visit selesai lebih awal</div></div>
              <Icon name="chevron-right" size={16} className="text-subtle" />
            </button>
          </div>
        </div>

        <AuditNote by="Escort duty · Budi Hartono">Setiap lokasi report + authorization check tercatat untuk audit. Escort wajib dengan visitor selama di area restricted.</AuditNote>
        <div className="px-4 mt-2" />
      </div>

      {/* SOS bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <button className="w-full h-14 rounded-xl bg-danger-500 hover:bg-danger-600 text-white font-extrabold text-[15px] inline-flex items-center justify-center gap-2 green-pulse" style={{ animation:'none' }}>
          <Icon name="alert-octagon" size={22} /> EMERGENCY · trigger SOS
        </button>
      </div>
    </div>
  );
}

window.V9_Email     = V9_Email;
window.V10_Induction= V10_Induction;
window.V11_MCU      = V11_MCU;
window.V12_Wallet   = V12_Wallet;
window.M1_EscortDuty= M1_EscortDuty;
