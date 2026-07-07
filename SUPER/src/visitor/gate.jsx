// Visitor — Gate Security screens V5 (check-in), V6 (permit card), V8 (exit).

// ============================================================
// Gate top bar (tablet)
// ============================================================
function GateTopBar({ title }) {
  return (
    <div className="h-12 px-5 border-b border-token bg-brand-700 text-white flex items-center gap-4 text-[12px]">
      <div className="flex items-center gap-2">
        <BrandMark size={22} />
        <div className="text-[11px] font-bold tracking-wider uppercase">{title}</div>
      </div>
      <div className="h-5 w-px bg-white/20" />
      <div className="inline-flex items-center gap-1.5"><Icon name="map-pin" size={13} className="text-safety-300" /><span className="font-semibold">Gate Utama · Pos Security 01</span></div>
      <div className="flex-1" />
      <div className="text-white/80 mono tabular-nums">09:15:42 · 29 Mei 2026</div>
      <div className="h-5 w-px bg-white/20" />
      <div className="inline-flex items-center gap-2"><Icon name="user-check" size={14} /><span className="font-semibold">Operator: Yono S.</span></div>
    </div>
  );
}

// ============================================================
// V5 — Visitor Check-In (Gate, tablet)
// ============================================================
function V5_CheckIn() {
  return (
    <div className="h-full w-full bg-elev flex flex-col">
      <GateTopBar title="Visitor Check-In" />
      <div className="flex-1 grid grid-cols-[380px_1fr] min-h-0">
        {/* Search panel */}
        <div className="border-r border-token bg-white p-5 flex flex-col">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Cari visitor</div>
          <div className="flex items-center h-12 rounded-xl border-2 border-brand-300 bg-white px-3 gap-2 mb-3">
            <Icon name="search" size={18} className="text-brand-500" />
            <input defaultValue="Anton" className="flex-1 text-[15px] font-semibold outline-none bg-transparent" placeholder="Nama / KTP / scan QR" />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Btn variant="secondary" size="sm" icon="qr-code">Scan QR</Btn>
            <Btn variant="secondary" size="sm" icon="credit-card">Scan KTP</Btn>
          </div>

          <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Hasil · 1 match</div>
          <div className="rounded-xl border-2 border-brand-300 bg-brand-50 p-3 flex items-center gap-3">
            <Avatar name="Anton Wijaya" size={44} photo />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-extrabold">Anton Wijaya</div>
              <div className="text-[10.5px] text-muted">PT Trakindo Utama</div>
            </div>
            <Icon name="check-circle-2" size={18} className="text-brand-500" />
          </div>

          {/* Walk-in fallback */}
          <div className="mt-auto pt-4 border-t border-token">
            <div className="rounded-xl bg-warning-50 border border-warning-500/30 p-3">
              <div className="text-[11px] font-extrabold text-warning-700 flex items-center gap-1.5 mb-1"><Icon name="user-plus" size={13} /> Walk-in visitor?</div>
              <div className="text-[10.5px] text-warning-700/85 mb-2">Tidak ada pre-registration. Perlu emergency flow + SO approval.</div>
              <Btn variant="secondary" size="sm" full icon="zap">Mulai emergency walk-in</Btn>
            </div>
          </div>
        </div>

        {/* Visitor detail + verification */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-[300px_1fr] gap-5">
            {/* Photo + identity */}
            <div>
              <div className="rounded-2xl overflow-hidden border border-token bg-white">
                <div className="aspect-[3/4] relative" style={{ background:'linear-gradient(160deg, #4179AE, #143452)' }}>
                  <div className="absolute inset-0 flex items-center justify-center"><Icon name="user" size={110} className="text-white/80" /></div>
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/45 backdrop-blur text-white text-[10px] mono">Pre-reg photo · on file</div>
                </div>
                <div className="p-3 text-center">
                  <div className="text-[16px] font-extrabold tracking-tight">Anton Wijaya</div>
                  <div className="text-[11px] text-muted">Account Manager · PT Trakindo</div>
                </div>
              </div>
              {/* Pre-arrival all green */}
              <div className="mt-3 rounded-xl bg-success-50 border border-success-500/30 p-3">
                <div className="text-[11px] font-extrabold text-success-700 mb-2 flex items-center gap-1.5"><Icon name="shield-check" size={13} /> Pre-arrival · all green</div>
                <PrepSteps k3l={true} mcu={true} nda={true} photo={true} size="sm" />
              </div>
            </div>

            {/* Info + verification */}
            <div className="space-y-4">
              <div className="surface rounded-xl p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Visit detail</div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[12px]">
                  <div><div className="text-[10px] text-subtle uppercase tracking-wider font-bold">Permit number</div><div className="font-extrabold mono">VIS-2026-0421</div></div>
                  <div><div className="text-[10px] text-subtle uppercase tracking-wider font-bold">Sponsor</div><div className="font-extrabold">Pak Budi (Operations)</div></div>
                  <div><div className="text-[10px] text-subtle uppercase tracking-wider font-bold">Expected visit</div><div className="font-extrabold">Hari ini · 09:00–17:00</div></div>
                  <div><div className="text-[10px] text-subtle uppercase tracking-wider font-bold">KTP</div><div className="font-extrabold mono">3201...8821</div></div>
                </div>
                <div className="mt-3 pt-3 border-t border-token">
                  <div className="text-[10px] text-subtle uppercase tracking-wider font-bold mb-1.5">Area authorized</div>
                  <div className="flex flex-wrap gap-1.5">
                    <StatusPill tone="success" size="sm" icon="check">Office</StatusPill>
                    <StatusPill tone="success" size="sm" icon="check">Mess Griya Praja</StatusPill>
                    <StatusPill tone="warning" size="sm" icon="user-check">PIT (escort only)</StatusPill>
                  </div>
                </div>
              </div>

              {/* Verification steps */}
              <div className="surface rounded-xl p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Verifikasi di gate</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-success-50/60">
                    <Icon name="check-circle-2" size={18} className="text-success-500" />
                    <span className="flex-1 text-[12.5px] font-bold">Check ID document (KTP visible)</span>
                    <StatusPill tone="success" size="sm">Verified</StatusPill>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-brand-50/60 border border-brand-200">
                    <Icon name="camera" size={18} className="text-brand-600" />
                    <span className="flex-1 text-[12.5px] font-bold">Live photo capture (untuk record)</span>
                    <Btn variant="primary" size="sm" icon="camera">Capture</Btn>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-elev">
                    <Icon name="car" size={18} className="text-subtle" />
                    <span className="flex-1 text-[12.5px] font-bold">Vehicle plate · B 1234 XYZ</span>
                    <StatusPill tone="gray" size="sm" icon="check">Logged</StatusPill>
                  </div>
                </div>
              </div>

              {/* Issue permit + escort */}
              <div className="grid grid-cols-2 gap-3">
                <div className="surface rounded-xl p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Issue Mine Permit</div>
                  <Btn variant="primary" size="sm" full icon="printer">Print QR card</Btn>
                  <Btn variant="secondary" size="sm" full icon="smartphone" className="mt-1.5">Digital permit (QR)</Btn>
                </div>
                <div className="surface rounded-xl p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Assign escort</div>
                  <div className="flex items-center gap-2 rounded-lg bg-elev p-2 mb-1.5">
                    <Avatar name="Budi Hartono" size={28} tone="brand" />
                    <div className="flex-1 min-w-0"><div className="text-[11.5px] font-bold truncate">Budi Hartono</div><div className="text-[9.5px] text-subtle">SIMPER ✓ K3L ✓</div></div>
                  </div>
                  <Btn variant="secondary" size="sm" full icon="bell">Notify escort</Btn>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <AuditNote by="Will log: check-in time, photo, operator" time="">Gate check-in tercatat dengan foto live + timestamp untuk audit trail.</AuditNote>
              </div>

              <Btn variant="success" size="lg" full icon="log-in">Confirm check-in · activate permit</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// V6 — Mine Permit Card (printable)
// ============================================================
function V6_PermitCard() {
  return (
    <div className="h-full w-full bg-elev flex items-center justify-center p-8 overflow-y-auto">
      <div className="flex gap-6 items-start">
        {/* The card */}
        <div className="permit-bg rounded-2xl shadow-2xl overflow-hidden border-2 border-brand-700" style={{ width: 560 }}>
          {/* Letterhead */}
          <div className="bg-brand-700 text-white px-6 py-4 flex items-center gap-3">
            <BrandMark size={44} />
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-bold">PT Nusaraya Mining</div>
              <div className="text-[22px] font-extrabold tracking-tight leading-none">MINE PERMIT</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] uppercase tracking-wider opacity-75 font-bold">Permit No.</div>
              <div className="text-[14px] font-extrabold mono">MP-2026-0421</div>
            </div>
          </div>

          <div className="p-6">
            {/* Photo + identity */}
            <div className="flex gap-4 mb-4">
              <div className="w-28 h-36 rounded-lg overflow-hidden border-2 border-brand-200 shrink-0 relative" style={{ background:'linear-gradient(160deg, #4179AE, #143452)' }}>
                <div className="absolute inset-0 flex items-center justify-center"><Icon name="user" size={56} className="text-white/80" /></div>
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Visitor</div>
                <div className="text-[22px] font-extrabold tracking-tight leading-tight">Anton Wijaya</div>
                <div className="text-[13px] text-muted font-semibold">PT Trakindo Utama</div>
                <div className="mt-2 inline-flex items-center gap-1.5"><VisitorTypeBadge type="business" size="sm" /></div>
                <div className="mt-3 rounded-lg bg-brand-50 border border-brand-200 px-3 py-2">
                  <div className="text-[9px] uppercase tracking-wider text-brand-700 font-bold">Valid</div>
                  <div className="text-[13px] font-extrabold mono text-brand-700">29 Mei 2026 · 09:00 — 17:00</div>
                </div>
              </div>
            </div>

            {/* Areas authorized */}
            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Areas authorized</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { l:'Office area', ok:true },
                  { l:'Mess Griya Praja', ok:true },
                  { l:'PIT Bahana', ok:true, escort:true },
                  { l:'Coal Pad', ok:false },
                  { l:'Hauling Road', ok:false },
                  { l:'Workshop', ok:false },
                ].map(a => (
                  <div key={a.l} className="flex items-center gap-1.5 text-[11.5px]">
                    <Icon name={a.ok?'check-circle-2':'x-circle'} size={14} className={a.ok?'text-success-500':'text-danger-400'} />
                    <span className={`font-bold ${a.ok?'':'text-muted line-through'}`}>{a.l}</span>
                    {a.escort && <span className="text-[9px] font-extrabold text-warning-700">(escort)</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Escort + QR */}
            <div className="flex items-end justify-between gap-4 pt-4 border-t border-token">
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Escort</div>
                <div className="flex items-center gap-2">
                  <Avatar name="Budi Hartono" size={36} tone="brand" />
                  <div><div className="text-[12px] font-extrabold">Budi Hartono</div><div className="text-[9.5px] text-muted mono">NSR-009281 · SIMPER B</div></div>
                </div>
                <div className="mt-3 text-[10px] text-muted"><span className="font-bold">Emergency:</span> 0800-1-NUSARAYA</div>
                {/* Signatures */}
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div><div className="sig-line h-7 flex items-end pb-0.5"><span className="text-[10px] mono italic text-brand-700">~ Sari H.</span></div><div className="text-[8.5px] text-subtle mt-0.5">SO · Safety Officer</div></div>
                  <div><div className="sig-line h-7 flex items-end pb-0.5"><span className="text-[10px] mono italic text-brand-700">~ A. Wijaya</span></div><div className="text-[8.5px] text-subtle mt-0.5">Visitor</div></div>
                </div>
              </div>
              <div className="text-center">
                <div className="p-2 rounded-lg bg-white border border-token">
                  <QRCode size={110} accent="#143452" />
                </div>
                <div className="text-[8.5px] text-subtle mt-1 font-bold uppercase tracking-wider">Scan di area gate</div>
              </div>
            </div>
          </div>

          {/* Footer compliance strip */}
          <div className="bg-elev px-6 py-2 border-t border-token flex items-center gap-2 text-[9px] text-subtle">
            <Icon name="shield-check" size={11} className="text-brand-500" />
            <span className="font-bold">Compliance Kepmen ESDM 1827/2018</span>
            <span className="ml-auto mono">Issued 29 Mei 2026 · 09:15 WITA</span>
          </div>
        </div>

        {/* Side actions */}
        <div className="w-64 space-y-3">
          <div className="surface rounded-xl p-4">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Permit actions</div>
            <Btn variant="primary" size="sm" full icon="printer">Print besar (A6 card)</Btn>
            <Btn variant="secondary" size="sm" full icon="smartphone" className="mt-1.5">Push ke digital wallet</Btn>
            <Btn variant="ghost" size="sm" full icon="download" className="mt-1.5">Download PDF</Btn>
          </div>

          {/* Lost card re-issue */}
          <div className="rounded-xl bg-warning-50 border border-warning-500/30 p-4">
            <div className="text-[11px] font-extrabold text-warning-700 flex items-center gap-1.5 mb-1"><Icon name="alert-triangle" size={13} /> Lost card?</div>
            <div className="text-[10.5px] text-warning-700/85 mb-2">Re-issue dengan permit number baru. Card lama auto-revoked di semua gate.</div>
            <Btn variant="secondary" size="sm" full icon="refresh-cw">Re-issue (audit logged)</Btn>
          </div>

          <AuditNote by="Issued by Yono S. · Gate 01" time="29 Mei · 09:15">Permit issuance, SO approval, dan K3L induction record ter-link di audit trail.</AuditNote>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// V8 — Visitor Exit (Gate)
// ============================================================
function V8_Exit() {
  return (
    <div className="h-full w-full bg-elev flex flex-col">
      <GateTopBar title="Visitor Exit" />
      <div className="flex-1 grid grid-cols-[380px_1fr] min-h-0">
        {/* Scan panel */}
        <div className="border-r border-token bg-white p-5 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3"><Icon name="qr-code" size={32} /></div>
          <div className="text-[15px] font-extrabold">Scan QR Mine Permit</div>
          <div className="text-[11.5px] text-muted mt-1 mb-4">Arahkan QR card ke reader untuk exit</div>
          <div className="w-full p-3 rounded-xl bg-success-50 border border-success-500/30 flex items-center gap-2.5">
            <Icon name="check-circle-2" size={18} className="text-success-500" />
            <div className="flex-1 text-left"><div className="text-[12px] font-extrabold text-success-700">MP-2026-0421 scanned</div><div className="text-[10px] text-success-700/85">Anton Wijaya · valid</div></div>
          </div>
        </div>

        {/* Exit form */}
        <div className="p-6 overflow-y-auto">
          <div className="max-w-2xl">
            {/* Visit summary */}
            <div className="surface rounded-xl p-5 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar name="Anton Wijaya" size={48} photo />
                <div className="flex-1">
                  <div className="text-[16px] font-extrabold tracking-tight">Anton Wijaya</div>
                  <div className="text-[11px] text-muted">PT Trakindo · MP-2026-0421</div>
                </div>
                <VisitStatusBadge status="active" />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { l:'Time in',  v:'09:15', sub:'on-time' },
                  { l:'Time out', v:'16:42', sub:'auto', tone:'success' },
                  { l:'Duration', v:'7j 27m', sub:'within plan' },
                  { l:'Areas',     v:'3', sub:'all authorized' },
                ].map(s => (
                  <div key={s.l} className="rounded-lg bg-elev p-2.5">
                    <div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">{s.l}</div>
                    <div className={`text-[16px] font-extrabold mono ${s.tone==='success'?'text-success-700':''}`}>{s.v}</div>
                    <div className="text-[9.5px] text-muted">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Returned items checklist */}
            <div className="surface rounded-xl p-5 mb-4">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Returned items checklist</div>
              <div className="space-y-2">
                {[
                  { l:'Mine permit card (QR)', done:true },
                  { l:'Visitor pass lanyard',   done:true },
                  { l:'Vehicle pass · B 1234 XYZ', done:true },
                  { l:'Borrowed PPE (helm + vest)', done:false },
                ].map((it,i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-elev">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${it.done?'bg-success-500 text-white':'border border-token-strong bg-white'}`}>{it.done && <Icon name="check" size={14} strokeWidth={3} />}</div>
                    <span className={`flex-1 text-[12.5px] font-bold ${it.done?'':'text-muted'}`}>{it.l}</span>
                    {!it.done && <StatusPill tone="warning" size="sm" icon="alert-triangle">Belum kembali</StatusPill>}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Feedback rating */}
              <div className="surface rounded-xl p-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Visitor feedback</div>
                <div className="flex items-center gap-1.5 justify-center py-2">
                  {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={28} className={s<=4?'text-safety-500':'text-[color:var(--border-strong)]'} />)}
                </div>
                <div className="text-center text-[11px] text-muted">Rating pengalaman kunjungan</div>
              </div>
              {/* Signature */}
              <div className="surface rounded-xl p-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Exit signature</div>
                <div className="sig-line h-14 flex items-end pb-1"><span className="text-[14px] mono italic text-brand-700">~ Anton Wijaya ~</span></div>
                <div className="text-[10px] text-subtle mt-1">Ditandatangani 16:42 · 29 Mei 2026</div>
              </div>
            </div>

            <AuditNote by="Gate exit · Yono S." time="29 Mei · 16:42 WITA">
              Setelah exit confirmed, status visit jadi <span className="font-bold">Closed</span> dan audit log difinalisasi: full timeline check-in → area scans → exit. Record immutable untuk regulator.
            </AuditNote>

            <div className="mt-4 flex items-center gap-2">
              <Btn variant="outlineDanger" size="md" icon="alert-triangle">Flag issue (PPE belum kembali)</Btn>
              <div className="flex-1" />
              <Btn variant="success" size="lg" icon="log-out">Confirm exit · close visit</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.V5_CheckIn   = V5_CheckIn;
window.V6_PermitCard= V6_PermitCard;
window.V8_Exit      = V8_Exit;
