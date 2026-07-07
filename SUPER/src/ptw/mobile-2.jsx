// PTW — Mobile screens P8-P13 (status tracking, on-site, approval).

// ============================================================
// P8 — PTW Status Tracking
// ============================================================
function P8_StatusTracking() {
  const timeline = [
    { t:'08:00', who:'Budi Santoso',     act:'PTW dibuat & disubmit',    state:'done',  ic:'edit-3',         tone:'success' },
    { t:'08:15', who:'Pak Hadi Wijaya',  act:'L1 SPV approved',           state:'done',  ic:'check-circle-2', tone:'success', note:'Pre-job briefing sudah dijadwalkan 07:45.' },
    { t:'09:00', who:'Bu Sari Hartati',  act:'L2 Safety Officer review',  state:'live',  ic:'clock',          tone:'warning', note:'45 menit menunggu · SLA 30 menit' },
    { t:'—',     who:'Pre-job briefing', act:'Tunggu approval SO',        state:'wait',  ic:'users',          tone:'gray' },
    { t:'—',     who:'Status Active',    act:'Setelah briefing selesai',  state:'wait',  ic:'circle-play',    tone:'gray' },
    { t:'—',     who:'Close-out',        act:'Setelah pekerjaan selesai', state:'wait',  ic:'check',          tone:'gray' },
  ];
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-subtle">Permit number</div>
            <div className="text-[14px] font-extrabold mono">PTW-2026-00123</div>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="more-vertical" size={20} className="text-subtle" /></button>
        </div>
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          <PermitTypeBadge type="HW" />
          <PermitStatusBadge status="pending" />
          <span className="text-[10.5px] text-warning-700 font-bold inline-flex items-center gap-1 ml-auto"><Icon name="alert-triangle" size={11} /> SLA breach 15m</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24">
        {/* PTW summary */}
        <div className="surface rounded-2xl p-4">
          <div className="text-[14px] font-extrabold tracking-tight leading-tight">Pengelasan pipa header 4" stasiun pompa Coal Pad</div>
          <div className="mt-2 grid grid-cols-2 gap-y-1.5 text-[11.5px]">
            <div className="flex items-center gap-1.5 text-muted"><Icon name="map-pin" size={12} /> Coal Pad Agra · Sec 3</div>
            <div className="flex items-center gap-1.5 text-muted mono"><Icon name="clock" size={12} /> 08:00–14:30</div>
            <div className="flex items-center gap-1.5 text-muted"><Icon name="users" size={12} /> 3 worker</div>
            <div className="flex items-center gap-1.5 text-muted"><Icon name="shield-alert" size={12} /> 4 hazard</div>
          </div>
          <button className="mt-3 w-full h-9 rounded-lg border border-token bg-elev text-[12px] font-bold text-brand-700 inline-flex items-center justify-center gap-1.5">
            <Icon name="expand" size={13} /> Lihat detail lengkap
          </button>
        </div>

        {/* Timeline */}
        <div className="mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Approval timeline</div>
          <div className="surface rounded-2xl p-4">
            <div className="relative pl-7">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[color:var(--border-strong)]" />
              {timeline.map((s,i) => {
                const toneBg = { success:'bg-success-500', warning:'bg-warning-500', gray:'bg-[color:var(--border-strong)]' }[s.tone];
                return (
                  <div key={i} className="relative pb-4 last:pb-0">
                    <div className={`absolute -left-[19px] top-0.5 w-5 h-5 rounded-full ring-2 ring-white flex items-center justify-center text-white ${toneBg} ${s.state==='live'?'active-blink':''}`}>
                      <Icon name={s.ic} size={11} strokeWidth={2.5} />
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="text-[12.5px] font-bold leading-tight">{s.act}</div>
                      <div className={`text-[10.5px] mono shrink-0 ${s.state==='done'?'text-success-700':s.state==='live'?'text-warning-700 font-bold':'text-subtle'}`}>{s.t}</div>
                    </div>
                    <div className="text-[10.5px] text-muted">{s.who}</div>
                    {s.note && <div className={`text-[11px] mt-1.5 px-2 py-1 rounded-md ${s.state==='live'?'bg-warning-50 text-warning-700':'bg-elev text-muted'}`}>{s.note}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2 flex items-center gap-1.5">Komentar <span className="px-1.5 h-4 rounded-full bg-elev text-[9px] mono font-bold">3</span></div>
          <div className="space-y-2.5">
            {[
              { who:'Pak Hadi Wijaya', role:'SPV', tone:'safety', t:'08:15', msg:'Approved. Pastikan fire extinguisher 2 unit di-stage sebelum mulai. Briefing 07:45.' },
              { who:'Budi Santoso',    role:'Initiator', tone:'brand', t:'08:32', msg:'Siap pak, fire extinguisher sudah disiapkan. Saya tunggu approval Bu Sari.' },
              { who:'Bu Sari Hartati', role:'SO', tone:'danger', t:'09:00', msg:'Sedang review hazard register dan dokumentasi method statement. Akan respon dalam 15 menit.' },
            ].map((c,i) => (
              <div key={i} className="flex gap-2.5">
                <Avatar name={c.who} size={32} tone={c.tone} />
                <div className="flex-1 surface rounded-xl rounded-tl-sm p-2.5">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-[12px] font-extrabold">{c.who}</span>
                    <span className="text-[10px] text-subtle">· {c.role}</span>
                    <span className="text-[10px] text-subtle mono ml-auto">{c.t}</span>
                  </div>
                  <div className="text-[12px] mt-0.5 leading-relaxed">{c.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick reply */}
        <div className="mt-3 flex items-center gap-2 surface rounded-xl px-3 h-12">
          <Icon name="message-square" size={16} className="text-subtle" />
          <input placeholder="Tulis komentar..." className="flex-1 bg-transparent outline-none text-[12.5px]" />
          <button className="w-8 h-8 rounded-md bg-brand-500 text-white flex items-center justify-center"><Icon name="send" size={14} /></button>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3 flex gap-2">
        <button className="h-12 px-3 rounded-xl border border-token-strong bg-white text-muted text-[12.5px] font-bold inline-flex items-center gap-1.5"><Icon name="bell" size={14} /> Reminder SO</button>
        <button className="h-12 flex-1 rounded-xl border border-danger-500/30 bg-white text-danger-700 font-bold text-[13px] inline-flex items-center justify-center gap-1.5"><Icon name="x" size={15} /> Batalkan PTW</button>
      </div>
    </div>
  );
}

// ============================================================
// P9 — Pre-Job Briefing
// ============================================================
function P9_PreJobBriefing() {
  const sigs = [
    { n:'Pak Hadi Wijaya',  r:'SPV',     done:true,  t:'07:42' },
    { n:'Bu Sari Hartati',  r:'SO',      done:true,  t:'07:43' },
    { n:'Budi Santoso',     r:'Lead',    done:true,  t:'07:44' },
    { n:'Anton Wijaya',     r:'Welder',  done:true,  t:'07:45' },
    { n:'Cipto Hartono',    r:'Fire watch', done:false },
  ];
  const signedCount = sigs.filter(s=>s.done).length;
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Pre-Job Briefing" sub="PTW-2026-00123 · Hot Work" />
      <div className="flex-1 overflow-y-auto pb-28">
        {/* PTW reminder banner */}
        <div className="mx-4 mt-3 rounded-xl bg-hw-50 border border-hw-500/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="flame" size={16} className="text-hw-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-hw-700">Permit reminder</span>
          </div>
          <div className="text-[13px] font-extrabold leading-tight">Pengelasan pipa header 4" · Coal Pad Sec 3</div>
          <div className="text-[11px] text-muted mt-0.5 mono">08:00 – 14:30 · 3 worker · 4 hazard</div>
        </div>

        {/* Checklist */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Briefing checklist</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { l:'Hazard review dengan semua worker', done:true },
              { l:'Control measures dijelaskan',       done:true },
              { l:'Emergency procedure dijelaskan',    done:true },
              { l:'APD diverifikasi sudah dipakai',    done:true },
              { l:'Fire watch position confirmed',     done:true, hot:true },
              { l:'Radio komunikasi tested · ch-7',    done:true },
              { l:'Lokasi titik kumpul evakuasi',      done:false, current:true },
            ].map((c,i) => (
              <div key={i} className={`px-4 py-3 flex items-center gap-3 ${c.current?'bg-warning-50/60':''}`}>
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${c.done?'bg-success-500 text-white':c.current?'bg-warning-500 text-white':'bg-elev border border-token-strong'}`}>
                  {c.done && <Icon name="check" size={14} strokeWidth={3} />}
                  {c.current && <Icon name="more-horizontal" size={12} />}
                </div>
                <div className="flex-1 text-[12.5px] font-semibold">{c.l}</div>
                {c.hot && <StatusPill tone="hw" size="sm">HW</StatusPill>}
              </div>
            ))}
          </div>
        </div>

        {/* Group photo */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Foto group briefing</div>
          <div className="rounded-2xl bg-white border border-token overflow-hidden">
            <div className="aspect-[16/10] relative" style={{ background: 'linear-gradient(135deg, #4179AE 0%, #1F4E79 100%)' }}>
              {/* mock photo */}
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <div className="flex items-end gap-1">
                  {[60, 70, 65, 75, 68].map((h,i) => (
                    <div key={i} className="relative" style={{ width: 32 }}>
                      <div className="w-7 h-7 rounded-full bg-safety-300 mx-auto" />
                      <div className="rounded-t-xl mt-0.5 mx-auto" style={{ width: 24, height: h, background: '#F39800' }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 h-6 rounded bg-black/55 backdrop-blur text-white text-[10px] font-bold">
                <Icon name="camera" size={11} /> 07:45 · GPS verified
              </div>
              <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 h-6 rounded bg-success-500 text-white text-[10px] font-bold">
                <Icon name="check-circle-2" size={11} /> 5 face detected
              </div>
            </div>
            <div className="px-3 py-2 flex items-center justify-between text-[11px]">
              <span className="text-muted">briefing-2026-00123.jpg · 1.8 MB</span>
              <button className="font-bold text-brand-700">Re-shoot</button>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="px-4 mt-4">
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">Digital signature</div>
            <div className="text-[11px] font-bold text-warning-700 mono">{signedCount}/{sigs.length}</div>
          </div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {sigs.map((s,i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <Avatar name={s.n} size={32} tone={s.done?'success':'gray'} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-bold">{s.n}</div>
                  <div className="text-[10.5px] text-subtle">{s.r}</div>
                </div>
                {s.done ? (
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-[10px] text-subtle mono">{s.t}</div>
                      <div className="sig-line h-6 w-16 flex items-end pb-0.5"><span className="text-[9px] italic mono text-success-700">~ signed</span></div>
                    </div>
                    <Icon name="check-circle-2" size={18} className="text-success-500" />
                  </div>
                ) : (
                  <button className="h-9 px-3 rounded-md bg-warning-500 text-white text-[11px] font-extrabold inline-flex items-center gap-1.5">
                    <Icon name="edit-3" size={12} /> Tap untuk sign
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <Btn variant="success" size="lg" full icon="circle-play" disabled={signedCount<sigs.length}>
          {signedCount<sigs.length ? `Tunggu ${sigs.length-signedCount} signature` : 'Activate PTW'}
        </Btn>
      </div>
    </div>
  );
}

// ============================================================
// P10 — Gas Test Log (Confined Space)
// ============================================================
function P10_GasTest() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Gas Test Log" sub="PTW-2026-00124 · Confined Space" />
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hero: 3rd test of 6 */}
        <div className="mx-4 mt-3 rounded-2xl p-4 text-white relative overflow-hidden"
             style={{ background:'linear-gradient(135deg, #2A6FB8 0%, #1F548B 100%)' }}>
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
              <Icon name="wind" size={13} /> Gas test ke-3 dari 6
            </div>
            <div className="mt-2 text-[22px] font-extrabold tracking-tight">Test ulang dalam 3j 30m</div>
            <div className="mt-1 text-[12px] opacity-80">Last test 30 menit lalu · setiap 4 jam wajib</div>
            <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-white" style={{ width:'12%' }} />
            </div>
            <div className="text-[10px] opacity-80 mt-1 mono">12% menuju test berikut</div>
          </div>
        </div>

        {/* Input form */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Input pengukuran</div>
          <div className="grid grid-cols-2 gap-2">
            <GasGauge label="O₂"   value="20.8" unit="%"   safe={true}  range={[18, 24]} />
            <GasGauge label="LEL"  value="0"    unit="%"   safe={true}  range={[0, 15]} />
            <GasGauge label="H₂S"  value="0"    unit="ppm" safe={true}  range={[0, 15]} />
            <GasGauge label="CO"   value="3"    unit="ppm" safe={true}  range={[0, 30]} />
          </div>

          {/* PASS evaluation */}
          <div className="mt-3 rounded-xl bg-success-50 border border-success-500/30 p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success-500 text-white flex items-center justify-center check-pop"><Icon name="check" size={20} strokeWidth={3} /></div>
            <div className="flex-1">
              <div className="text-[12px] font-extrabold text-success-700">PASS · semua parameter dalam batas aman</div>
              <div className="text-[10.5px] text-success-700/85">Worker boleh lanjut bekerja · auto-record ke audit log</div>
            </div>
          </div>

          {/* Test info */}
          <div className="mt-3 surface rounded-xl p-3 space-y-2 text-[12px]">
            <div className="flex items-center gap-2"><Icon name="user" size={14} className="text-subtle" /><span className="text-muted">Tester</span><span className="ml-auto font-bold">Cipto Hartono (Fire watch)</span></div>
            <div className="flex items-center gap-2"><Icon name="clock" size={14} className="text-subtle" /><span className="text-muted">Waktu</span><span className="ml-auto font-bold mono">10:12 WIB · 19 Mei</span></div>
            <div className="flex items-center gap-2"><Icon name="hash" size={14} className="text-subtle" /><span className="text-muted">Detector S/N</span><span className="ml-auto font-bold mono">BW-MicroClip-X3</span></div>
          </div>

          {/* Photo of detector */}
          <div className="mt-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Foto detector reading</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-xl bg-info-50 border border-info-500/20 flex items-center justify-center text-info-700 relative overflow-hidden">
                <Icon name="image" size={24} />
                <div className="absolute bottom-1 left-1 text-[8px] mono bg-black/40 text-white px-1 rounded">10:12</div>
              </div>
              <button className="aspect-square rounded-xl border-2 border-dashed border-token-strong text-subtle inline-flex flex-col items-center justify-center gap-1">
                <Icon name="camera" size={20} />
                <span className="text-[10px] font-semibold">Foto</span>
              </button>
              <button className="aspect-square rounded-xl border-2 border-dashed border-token-strong text-subtle inline-flex flex-col items-center justify-center gap-1">
                <Icon name="image-plus" size={20} />
                <span className="text-[10px] font-semibold">Galeri</span>
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Riwayat test PTW ini</div>
          <div className="surface rounded-2xl overflow-hidden">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-left bg-elev text-[9.5px] uppercase tracking-wider text-subtle">
                  <th className="px-3 py-2 font-extrabold">Waktu</th>
                  <th className="px-3 py-2 font-extrabold">O₂</th>
                  <th className="px-3 py-2 font-extrabold">LEL</th>
                  <th className="px-3 py-2 font-extrabold">H₂S</th>
                  <th className="px-3 py-2 font-extrabold">CO</th>
                  <th className="px-3 py-2 font-extrabold">St</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border)]">
                {[
                  { t:'06:05', o:'20.9', lel:'0', h2s:'0', co:'2', ok:true },
                  { t:'10:12', o:'20.8', lel:'0', h2s:'0', co:'3', ok:true, current:true },
                  { t:'14:12', o:'—',    lel:'—', h2s:'—', co:'—', pending:true },
                ].map((r,i) => (
                  <tr key={i} className={r.current?'bg-success-50/40':r.pending?'opacity-50':''}>
                    <td className="px-3 py-2 mono font-bold">{r.t}</td>
                    <td className="px-3 py-2 mono">{r.o}</td>
                    <td className="px-3 py-2 mono">{r.lel}</td>
                    <td className="px-3 py-2 mono">{r.h2s}</td>
                    <td className="px-3 py-2 mono">{r.co}</td>
                    <td className="px-3 py-2">
                      {r.ok    && <Icon name="check-circle-2" size={14} className="text-success-500" />}
                      {r.pending && <Icon name="clock" size={14} className="text-subtle" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[10.5px] text-subtle">Jika FAIL: PTW auto-suspend · alert SO · worker harus pull-out segera.</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <Btn variant="success" size="lg" full icon="check-circle-2">Simpan & lanjut bekerja</Btn>
      </div>
    </div>
  );
}

// ============================================================
// P11 — Close-Out
// ============================================================
function P11_CloseOut() {
  const checks = [
    { l:'Pekerjaan selesai sesuai scope',     done:true },
    { l:'Area dibersihkan, debris dibuang',    done:true },
    { l:'Equipment dirapikan & dikembalikan', done:true },
    { l:'APD dilepas dengan benar',            done:true },
    { l:'Cooling-down 30 menit · no smoke, no heat', done:true, hw:true },
    { l:'Tidak ada incident · LTI 0',          done:true },
    { l:'Foto kondisi akhir area',              done:false, current:true },
  ];
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Close-out PTW" sub="PTW-2026-00123 · Hot Work" />
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Banner */}
        <div className="mx-4 mt-3 rounded-xl bg-success-50 border border-success-500/30 p-3 flex items-start gap-2.5">
          <Icon name="check-circle-2" size={18} className="text-success-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-[11.5px] text-success-700">
            <span className="font-extrabold">Pekerjaan menuju selesai.</span> Lengkapi checklist close-out, foto kondisi area, dan kumpulkan signature SPV + SO sebelum tutup.
          </div>
        </div>

        {/* Duration card */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl p-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Mulai</div>
              <div className="text-[15px] font-extrabold mono">08:00</div>
            </div>
            <div className="border-x border-token">
              <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Selesai</div>
              <div className="text-[15px] font-extrabold mono">13:42</div>
            </div>
            <div>
              <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Durasi</div>
              <div className="text-[15px] font-extrabold mono text-success-700">5j 42m</div>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Close-out checklist · 6/7 selesai</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {checks.map((c,i) => (
              <div key={i} className={`px-4 py-3 flex items-center gap-3 ${c.current?'bg-warning-50/60':''}`}>
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${c.done?'bg-success-500 text-white':c.current?'bg-warning-500 text-white':'bg-elev border border-token-strong'}`}>
                  {c.done && <Icon name="check" size={14} strokeWidth={3} />}
                </div>
                <div className="flex-1 text-[12.5px] font-semibold">{c.l}</div>
                {c.hw && <StatusPill tone="hw" size="sm">HW</StatusPill>}
              </div>
            ))}
          </div>
        </div>

        {/* Signatures */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Signature akhir</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { r:'Worker',  n:'Budi Santoso',     tone:'brand',   done:true,  t:'13:38' },
              { r:'SPV',     n:'Pak Hadi Wijaya',  tone:'safety',  done:true,  t:'13:40' },
              { r:'SO',      n:'Bu Sari Hartati',  tone:'danger',  done:false },
            ].map((s,i) => (
              <div key={i} className={`rounded-xl border ${s.done?'border-success-500/30 bg-success-50/30':'border-warning-500/30 bg-warning-50/30'} p-2.5 text-center`}>
                <div className="text-[9.5px] font-bold uppercase tracking-wider text-subtle">{s.r}</div>
                <Avatar name={s.n} size={28} tone={s.tone} className="mx-auto mt-1.5" />
                <div className="text-[10.5px] font-bold mt-1.5 leading-tight">{s.n.split(' ')[0]}</div>
                {s.done ? (
                  <>
                    <div className="text-[9px] mono text-subtle mt-0.5">{s.t}</div>
                    <Icon name="check-circle-2" size={14} className="text-success-500 mx-auto mt-1" />
                  </>
                ) : (
                  <button className="mt-1 w-full h-7 rounded bg-warning-500 text-white text-[10px] font-extrabold">Tap sign</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <Btn variant="success" size="lg" full icon="check" disabled={true}>Tutup PTW · tunggu signature SO</Btn>
      </div>
    </div>
  );
}

// ============================================================
// P12 — Approval Inbox (SPV/SO mobile)
// ============================================================
function P12_ApprovalInbox() {
  const items = [
    { id:'PTW-2026-00125', type:'CS', init:'Joko Pranoto',   role:'KNC Tank Maint', loc:'Tangki BBM C · Manhole 1', dur:'06:00–10:00', risk:'high', ago:'1h 30m', sla:'breach', mandatory:true },
    { id:'PTW-2026-00128', type:'WH', init:'Bagas Rinaldi',  role:'Workshop',       loc:'Workshop Bahana · Atap',   dur:'09:00–15:00', risk:'med',  ago:'45m',     sla:'ok' },
    { id:'PTW-2026-00131', type:'HW', init:'Surya Pradana',  role:'Mining Ops',     loc:'Coal Pad Agra · Sec 1',    dur:'10:00–14:00', risk:'high', ago:'22m',     sla:'ok' },
  ];
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="text-[15px] font-bold tracking-tight">Approval inbox</div>
              <span className="px-1.5 h-5 rounded-full bg-warning-500 text-white text-[10px] font-extrabold inline-flex items-center">3</span>
            </div>
            <div className="text-[11px] text-subtle">Bu Sari · Safety Officer</div>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="filter" size={20} className="text-subtle" /></button>
        </div>
        <div className="mt-2 flex items-center gap-1.5 overflow-x-auto">
          {[
            { l:'Semua', n:3, on:true },
            { l:'PTW',   n:3 },
            { l:'Cuti',  n:5 },
            { l:'OT',    n:2 },
          ].map(t => (
            <button key={t.l} className={`px-3 h-8 rounded-full text-[11.5px] font-bold whitespace-nowrap inline-flex items-center gap-1.5
              ${t.on?'bg-brand-500 text-white':'bg-elev text-muted border border-token'}`}>
              {t.l} <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${t.on?'bg-white/25':'bg-white'}`}>{t.n}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-3">
        {items.map(it => {
          const slaBreach = it.sla === 'breach';
          return (
            <div key={it.id} className="rounded-2xl bg-white border border-token p-4 relative overflow-hidden">
              {slaBreach && <div className="absolute left-0 top-0 bottom-0 w-1 bg-danger-500" />}
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-bold mono text-subtle uppercase tracking-wider">{it.id}</div>
                <div className={`text-[10.5px] font-bold inline-flex items-center gap-1 ${slaBreach?'text-danger-700':'text-muted'}`}>
                  <Icon name="clock" size={11} /> {it.ago} {slaBreach && '· SLA breach'}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                <PermitTypeBadge type={it.type} />
                {it.mandatory && <StatusPill tone="danger" size="sm" icon="shield-alert">SO wajib</StatusPill>}
                {it.risk==='high' && <StatusPill tone="warning" size="sm" icon="alert-triangle">High risk</StatusPill>}
              </div>
              <div className="flex items-center gap-2.5 mb-2">
                <Avatar name={it.init} size={32} tone="brand" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-extrabold truncate">{it.init}</div>
                  <div className="text-[10.5px] text-subtle truncate">{it.role}</div>
                </div>
              </div>
              <div className="space-y-1 text-[11.5px]">
                <div className="flex items-center gap-1.5 text-muted"><Icon name="map-pin" size={12} /> <span className="font-semibold truncate">{it.loc}</span></div>
                <div className="flex items-center gap-1.5 text-muted mono"><Icon name="clock" size={12} /> {it.dur}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 h-10 rounded-xl border border-danger-500/30 text-danger-700 bg-white text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="x" size={14} /> Tolak</button>
                <button className="flex-1 h-10 rounded-xl bg-success-500 text-white text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="check" size={14} /> Setujui</button>
              </div>
              <div className="mt-2 text-[10.5px] text-subtle text-center">↔ swipe untuk quick action · tap untuk detail</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// P13 — Approval Detail (SO mobile)
// ============================================================
function P13_ApprovalDetail() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-subtle">Review L2 · SO</div>
            <div className="text-[14px] font-extrabold mono">PTW-2026-00125</div>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="more-vertical" size={20} className="text-subtle" /></button>
        </div>
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          <PermitTypeBadge type="CS" />
          <StatusPill tone="danger" size="sm" icon="shield-alert">SO wajib</StatusPill>
          <span className="text-[10.5px] text-danger-700 font-bold inline-flex items-center gap-1 ml-auto"><Icon name="alert-triangle" size={11} /> SLA breach 30m</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="px-4 pt-3">
          <div className="text-[15px] font-extrabold tracking-tight leading-tight">Inspeksi internal tangki BBM C · masuk manhole 1</div>
          <div className="mt-1 text-[12px] text-muted">Tank wall thickness inspection · 4 jam · 5 worker</div>
        </div>

        {/* Initiator */}
        <div className="px-4 mt-3">
          <div className="surface rounded-xl p-3 flex items-center gap-3">
            <Avatar name="Joko Pranoto" size={40} tone="brand" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-extrabold">Joko Pranoto</div>
              <div className="text-[10.5px] text-subtle mono">KNC-002104 · KNC Tank Maintenance</div>
            </div>
            <button className="w-9 h-9 rounded-md bg-elev text-brand-700 flex items-center justify-center"><Icon name="phone" size={16} /></button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="px-4 mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { l:'Lokasi', v:'BBM C', sub:'Manhole 1' },
            { l:'Durasi', v:'4 jam', sub:'06:00–10:00' },
            { l:'Worker', v:'5', sub:'1 standby' },
          ].map(s => (
            <div key={s.l} className="surface rounded-xl p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">{s.l}</div>
              <div className="text-[15px] font-extrabold mono">{s.v}</div>
              <div className="text-[10px] text-muted">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Validation panel */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Pre-approval validation</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { l:'Sertifikasi worker (5/5)',              ok:true,  note:'CS training · MCU · K3L semua valid' },
              { l:'Hazard register lengkap',                ok:true,  note:'7 hazard · max score 20 → residu 4' },
              { l:'Method statement & rescue plan',          ok:true,  note:'Doc-RA-2026-0421 + RP-CS-019 linked' },
              { l:'Gas test plan · 6 test setiap 4 jam',     ok:true,  note:'Detector BW MicroClip X3 ready' },
              { l:'Standby attendant assigned',               ok:true,  note:'Cipto Hartono · radio ch-7' },
              { l:'Overlap conflict di area',                 ok:false, note:'PTW-2026-00126 (HW) di 50m radius — koordinasi' },
            ].map((v,i) => (
              <div key={i} className="px-4 py-3 flex items-start gap-3">
                <Icon name={v.ok?'check-circle-2':'alert-triangle'} size={17} className={v.ok?'text-success-500 mt-0.5':'text-warning-500 mt-0.5'} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-bold">{v.l}</div>
                  <div className="text-[10.5px] text-muted">{v.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Dokumen terlampir</div>
          <div className="grid grid-cols-2 gap-2 text-[11.5px]">
            {[
              { ic:'file-text', l:'RA-2026-0421',  sub:'Risk Assessment' },
              { ic:'file-text', l:'JSA-CS-019',     sub:'Method statement' },
              { ic:'file-text', l:'RP-CS-019',      sub:'Rescue plan' },
              { ic:'image',     l:'Sketch tank',    sub:'480 KB' },
            ].map((d,i) => (
              <button key={i} className="surface rounded-xl p-2.5 flex items-center gap-2 text-left">
                <Icon name={d.ic} size={16} className="text-brand-500" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate">{d.l}</div>
                  <div className="text-[10px] text-subtle">{d.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comment area */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Catatan untuk initiator</div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="2" defaultValue="Approved dengan catatan: pastikan PTW-00126 (HW di area sama) sudah selesai sebelum tank entry."
              className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3 space-y-2">
        <div className="flex gap-2">
          <button className="flex-1 h-11 rounded-xl border border-danger-500/30 text-danger-700 bg-white text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="x" size={14} /> Tolak</button>
          <button className="flex-1 h-11 rounded-xl border border-warning-500/30 text-warning-700 bg-white text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="alert-triangle" size={14} /> Dengan catatan</button>
        </div>
        <Btn variant="success" size="lg" full icon="check-circle-2">Setujui PTW</Btn>
      </div>
    </div>
  );
}

// =================== Export ===================
window.P8_StatusTracking  = P8_StatusTracking;
window.P9_PreJobBriefing  = P9_PreJobBriefing;
window.P10_GasTest        = P10_GasTest;
window.P11_CloseOut       = P11_CloseOut;
window.P12_ApprovalInbox  = P12_ApprovalInbox;
window.P13_ApprovalDetail = P13_ApprovalDetail;
