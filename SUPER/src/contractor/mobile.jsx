// Contractor — Mobile worker screens M1-M4.

// ============================================================
// M1 — Digital ID Card
// ============================================================
function M1_IDCard() {
  // Card background based on overall compliance status (green=all valid, yellow=expiring, red=issue)
  const status = 'green'; // green | yellow | red
  const gradients = {
    green:  'linear-gradient(135deg, #11624A 0%, #1D9E75 60%, #1F4E79 130%)',
    yellow: 'linear-gradient(135deg, #946011 0%, #EF9F27 60%, #1F4E79 130%)',
    red:    'linear-gradient(135deg, #8E2A29 0%, #E24B4A 60%, #1F4E79 130%)',
  };
  return (
    <div className="flex-1 flex flex-col bg-[color:var(--bg)] overflow-hidden">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3 shrink-0">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
        <div className="flex-1">
          <div className="text-[15px] font-bold tracking-tight">Kartu ID Digital</div>
          <div className="text-[11px] text-subtle">Selalu accessible · offline cached</div>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="rotate-3d" size={20} className="text-subtle" /></button>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col">
        {/* Card */}
        <div className="rounded-3xl overflow-hidden text-white relative shadow-2xl mx-auto" style={{ background: gradients[status], width: '100%', aspectRatio:'1.58/1' }}>
          {/* Holographic stripe */}
          <div className="absolute inset-0 id-holo pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-white/10" />
          <div className="absolute -left-12 -bottom-16 w-48 h-48 rounded-full bg-white/5" />

          <div className="relative h-full flex flex-col p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrandMark size={28} />
                <div className="leading-tight">
                  <div className="text-[8px] font-extrabold uppercase tracking-[0.18em] opacity-75">Mining Site Bahana</div>
                  <div className="text-[12px] font-extrabold tracking-tight">SuperApps Nusaraya</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[7px] font-extrabold uppercase tracking-[0.18em] opacity-75">Contractor</div>
                <div className="text-[10px] font-extrabold">PT KNC</div>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 mt-3">
              {/* Photo */}
              <div className="relative shrink-0">
                <div className="w-24 h-32 rounded-xl bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/40 flex items-center justify-center relative overflow-hidden">
                  <Icon name="user" size={56} className="text-white/85" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/30 blur-sm" />
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-1.5 h-4 rounded bg-white/90 text-brand-700 text-[8px] font-extrabold tracking-wider inline-flex items-center">PHOTO</div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[8px] font-bold uppercase tracking-[0.18em] opacity-75">Nama</div>
                <div className="text-[16px] font-extrabold tracking-tight leading-tight">Budi Santoso</div>
                <div className="text-[8px] font-bold uppercase tracking-[0.18em] opacity-75 mt-1.5">Worker ID</div>
                <div className="text-[11px] font-extrabold mono">W-12041</div>
                <div className="text-[8px] font-bold uppercase tracking-[0.18em] opacity-75 mt-1.5">Position</div>
                <div className="text-[10px] font-extrabold leading-tight">Driver Hauling · Unit B</div>
              </div>
            </div>

            <div className="flex items-end justify-between mt-2">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.18em] opacity-75">Valid until</div>
                <div className="text-[12px] font-extrabold mono">14 Aug 2026</div>
                <div className="mt-1 inline-flex items-center gap-1 px-1.5 h-5 rounded bg-success-500 text-white text-[9px] font-extrabold uppercase tracking-wider">
                  <Icon name="shield-check" size={10} /> All valid · compliant
                </div>
              </div>
              {/* QR */}
              <div className="bg-white rounded-lg p-1">
                <QRCode size={72} accent="#0F273E" />
              </div>
            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="text-center text-[11px] text-muted mt-4 inline-flex items-center justify-center gap-1.5">
          <Icon name="rotate-3d" size={12} /> Tap untuk flip lihat emergency info
        </div>

        {/* Quick info chips */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white border border-token p-2.5 text-center">
            <Icon name="droplet" size={14} className="text-danger-500 mx-auto" />
            <div className="text-[9px] uppercase tracking-wider text-subtle font-bold mt-1">Darah</div>
            <div className="text-[14px] font-extrabold mono">O+</div>
          </div>
          <div className="rounded-xl bg-white border border-token p-2.5 text-center">
            <Icon name="phone" size={14} className="text-brand-500 mx-auto" />
            <div className="text-[9px] uppercase tracking-wider text-subtle font-bold mt-1">Emergency</div>
            <div className="text-[11px] font-extrabold mono">081234567890</div>
          </div>
          <div className="rounded-xl bg-white border border-token p-2.5 text-center">
            <Icon name="alert-circle" size={14} className="text-warning-500 mx-auto" />
            <div className="text-[9px] uppercase tracking-wider text-subtle font-bold mt-1">Alergi</div>
            <div className="text-[11px] font-extrabold">Tidak ada</div>
          </div>
        </div>

        <div className="mt-4">
          <Btn variant="primary" size="lg" full icon="share-2">Tampilkan di gate scanner</Btn>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10.5px] text-subtle">
          <Icon name="wifi-off" size={11} /> Cached untuk offline · last sync 08:14
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M2 — My Certifications (Worker)
// ============================================================
function M2_MyCerts() {
  const certs = [
    { name:'SIMPER B',                 days:88,  issued:'14 Aug 2024', expires:'14 Aug 2026', icon:'car',           tone:'success' },
    { name:'K3 Pertambangan Madya',    days:120, issued:'08 Aug 2024', expires:'08 Aug 2026', icon:'shield-check', tone:'success' },
    { name:'MCU annual',                days:296, issued:'15 Mar 2026', expires:'15 Mar 2027', icon:'heart-pulse',   tone:'success' },
    { name:'Defensive Driving',         days:185, issued:'10 Jan 2025', expires:'10 Jan 2027', icon:'shield',        tone:'success' },
    { name:'First Aid & CPR',           days:22,  issued:'22 Sep 2024', expires:'22 Sep 2026', icon:'heart',         tone:'warning' },
  ];
  const expiringCount = certs.filter(c => c.days < 30).length;
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3 shrink-0">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
        <div className="flex-1">
          <div className="text-[15px] font-bold tracking-tight">Sertifikasi saya</div>
          <div className="text-[11px] text-subtle">{certs.length} sertifikat aktif</div>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="filter" size={18} className="text-subtle" /></button>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Renewal banner */}
        {expiringCount > 0 && (
          <div className="mx-4 mt-3 rounded-xl bg-warning-50 border border-warning-500/30 p-3 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-warning-500 text-white flex items-center justify-center shrink-0"><Icon name="alert-triangle" size={17} /></div>
            <div className="flex-1">
              <div className="text-[12.5px] font-extrabold text-warning-700">{expiringCount} sertifikat mendekati expiry</div>
              <div className="text-[11px] text-warning-700/85 mt-0.5">Schedule renewal via HR sekarang untuk hindari gap akses.</div>
              <button className="mt-1.5 text-[11.5px] font-bold text-warning-700 underline">Jadwalkan renewal →</button>
            </div>
          </div>
        )}

        {/* Certs */}
        <div className="px-4 mt-3 space-y-2.5">
          {certs.map((c,i) => {
            const days = c.days;
            const tone = days < 0 ? 'danger' : days < 30 ? 'warning' : 'success';
            return (
              <div key={i} className="surface rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-${tone}-50 text-${tone}-700 flex items-center justify-center shrink-0`}><Icon name={c.icon} size={20} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-extrabold leading-tight">{c.name}</div>
                    <div className="text-[10.5px] text-muted mt-0.5">Issued {c.issued}</div>
                  </div>
                  <Icon name="chevron-right" size={16} className="text-subtle" />
                </div>
                <div className="mt-3">
                  <CertProgress days={days} size="sm" label={`Valid sampai ${c.expires}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M3 — Compliance Score (gamification)
// ============================================================
function M3_ComplianceScore() {
  return (
    <div className="flex-1 flex flex-col" style={{ background:'linear-gradient(180deg, #11624A 0%, #1D9E75 60%, #f5f6f8 100%)' }}>
      <div className="px-5 pt-1 pb-3 flex items-center gap-3 shrink-0 text-white">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
        <div className="flex-1">
          <div className="text-[15px] font-bold tracking-tight">Compliance saya</div>
          <div className="text-[11px] opacity-80">Status sertifikasi & streak</div>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="share-2" size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Hero score */}
        <div className="px-6 pt-3 text-white text-center">
          <div className="text-[12px] font-bold uppercase tracking-[0.18em] opacity-85">Compliance score</div>
          <div className="text-[80px] font-extrabold mono leading-none mt-2">100<span className="text-[36px]">%</span></div>
          <div className="text-[14px] font-extrabold mt-1">🏆 Anda compliance 100%!</div>
          <div className="text-[11.5px] opacity-85 mt-1">Semua sertifikat valid · tidak ada warning</div>
        </div>

        {/* Streak card */}
        <div className="mx-4 mt-5">
          <div className="rounded-2xl bg-white p-4 shadow-xl flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-safety-500 text-white flex items-center justify-center shrink-0 text-[28px]">🔥</div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Compliance streak</div>
              <div className="text-[24px] font-extrabold mono tracking-tight leading-none">243<span className="text-[14px] font-bold text-muted"> hari</span></div>
              <div className="text-[11px] text-muted">Berturut-turut sertifikat lengkap</div>
            </div>
          </div>
        </div>

        {/* Upcoming reminders */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Reminder upcoming</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { ic:'heart-pulse', l:'MCU annual', sub:'Expire 87 hari lagi', tone:'success', act:'Schedule renewal' },
              { ic:'shield-check',l:'K3L refresh', sub:'Expire 120 hari lagi', tone:'success', act:'Schedule renewal' },
              { ic:'heart',       l:'First Aid & CPR', sub:'Expire 22 hari lagi · perlu segera', tone:'warning', act:'Daftar sesi' },
            ].map((r,i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${r.tone}-50 text-${r.tone}-700 flex items-center justify-center`}><Icon name={r.ic} size={17} /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold">{r.l}</div>
                  <div className={`text-[10.5px] ${r.tone==='warning'?'text-warning-700 font-bold':'text-muted'}`}>{r.sub}</div>
                </div>
                <button className={`h-8 px-3 rounded-md text-[10.5px] font-extrabold ${r.tone==='warning'?'bg-warning-500 text-white':'bg-elev text-brand-700 border border-token'}`}>{r.act}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Achievements</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { ic:'shield-check', t:'No miss',       sub:'2 tahun' },
              { ic:'graduation-cap',t:'Top trainee', sub:'Q1 2026' },
              { ic:'award',         t:'Welder elite', sub:'Class 3G' },
            ].map((a,i) => (
              <div key={i} className="rounded-xl bg-white border border-token p-3 text-center">
                <div className="w-10 h-10 rounded-full bg-cater-50 text-cater-700 bg-warning-50 text-warning-700 flex items-center justify-center mx-auto"><Icon name={a.ic} size={18} /></div>
                <div className="text-[11px] font-extrabold mt-2 leading-tight">{a.t}</div>
                <div className="text-[10px] text-subtle">{a.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M4 — Access Status
// ============================================================
function M4_AccessStatus() {
  const areas = [
    { l:'PIT Bahana',       auth:true,  req:'-',               cond:'Shift pagi/siang/malam' },
    { l:'PIT Nagari',       auth:false, req:'CS Entry cert' },
    { l:'Coal Pad Agra',    auth:true,  req:'-',               cond:'-' },
    { l:'OLC',               auth:true,  req:'-',               cond:'-' },
    { l:'Port Bahana',      auth:false, req:'Additional training (Port induction)' },
    { l:'Workshop',         auth:true,  req:'-' },
    { l:'Mess Griya Praja', auth:true,  req:'-' },
    { l:'Tangki BBM',       auth:false, req:'Confined Space valid + gas test' },
  ];
  const equips = [
    { l:'Excavator',     auth:false, req:'SIMPER A' },
    { l:'Dump Truck',    auth:true,  req:'SIMPER B · valid' },
    { l:'Crane',          auth:false, req:'SIMPER C + training' },
    { l:'Light Vehicle', auth:false, req:'SIMPER D' },
  ];
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3 shrink-0">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
        <div className="flex-1">
          <div className="text-[15px] font-bold tracking-tight">Akses saya</div>
          <div className="text-[11px] text-subtle">5 area + 1 equipment authorized</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Areas */}
        <div className="px-4 mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="map-pin" size={14} className="text-brand-500" />
            <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">Akses area</div>
          </div>
          <div className="space-y-2">
            {areas.map((a,i) => (
              <div key={i} className={`surface rounded-2xl p-3 flex items-start gap-3 ${a.auth?'':'opacity-95'}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${a.auth?'bg-success-50 text-success-600':'bg-danger-50 text-danger-500'}`}>
                  <Icon name={a.auth?'check-circle-2':'x-circle'} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-extrabold">{a.l}</span>
                    {a.auth ? <StatusPill tone="success" size="sm">Authorized</StatusPill> : <StatusPill tone="danger" size="sm">Not authorized</StatusPill>}
                  </div>
                  {a.cond && a.cond !== '-' && <div className="text-[10.5px] text-muted mt-0.5">Conditional: {a.cond}</div>}
                  {!a.auth && a.req && <div className="text-[10.5px] text-danger-700 font-bold mt-0.5">Required: {a.req}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div className="px-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="truck" size={14} className="text-safety-600" />
            <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">Akses equipment</div>
          </div>
          <div className="space-y-2">
            {equips.map((e,i) => (
              <div key={i} className="surface rounded-2xl p-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${e.auth?'bg-success-50 text-success-600':'bg-elev text-subtle'}`}>
                  <Icon name={e.auth?'check-circle-2':'lock'} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-extrabold">{e.l}</div>
                  <div className="text-[10.5px] text-muted">Req: {e.req}</div>
                </div>
                {e.auth
                  ? <StatusPill tone="success" size="sm" icon="check-circle-2">OK</StatusPill>
                  : <StatusPill tone="gray" size="sm" icon="ban">Blocked</StatusPill>}
              </div>
            ))}
          </div>
        </div>

        {/* Request more access */}
        <div className="px-4 mt-4">
          <button className="w-full surface rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-elev">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name="plus-circle" size={20} /></div>
            <div className="flex-1">
              <div className="text-[13px] font-extrabold">Request akses tambahan</div>
              <div className="text-[11px] text-muted">Submit ke HR · approval SO untuk area restricted</div>
            </div>
            <Icon name="chevron-right" size={16} className="text-subtle" />
          </button>
        </div>
      </div>
    </div>
  );
}

window.M1_IDCard          = M1_IDCard;
window.M2_MyCerts         = M2_MyCerts;
window.M3_ComplianceScore = M3_ComplianceScore;
window.M4_AccessStatus    = M4_AccessStatus;
