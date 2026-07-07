// Contractor — Compliance screens C11-C13.

// ============================================================
// C11 — Compliance Dashboard (SO view)
// ============================================================
function C11_Compliance() {
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar current="compliance" />
      <div className="flex-1 flex flex-col min-w-0">
        <HRTopBar title="Compliance Dashboard — Mei 2026" sub="Safety Officer · Audit-ready" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Top KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="shield-check"   label="Overall compliance" value="94.2%" tone="success" sub="target ≥95%" delta="+1.4%" />
              <KPICard icon="alert-triangle" label="Expiring 30 hari"   value="87"    tone="warning" sub="dari 6 kontraktor" delta="-12" />
              <KPICard icon="x-circle"        label="Expired"             value="11"    tone="danger"  sub="access auto-revoked" delta="+3" />
              <KPICard icon="ban"             label="Suspended"           value="12"    tone="danger"  sub="resolusi pending" />
              <KPICard icon="check-circle-2"  label="Audit findings open" value="4"     tone="warning" sub="dari 28 total · Q2" delta="-2" />
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="calendar" active>Mei 2026</FilterChip>
              <FilterChip icon="building-2">Semua kontraktor</FilterChip>
              <FilterChip icon="layers">Semua cert type</FilterChip>
              <FilterChip icon="alert-triangle">Risk: all</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="mail">Bulk reminder</Btn>
              <Btn variant="secondary" size="sm" icon="file-text">Audit export (PDF)</Btn>
              <Btn variant="primary" size="sm" icon="download">Export Excel</Btn>
            </div>

            {/* Per contractor ranking */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
              <div className="surface rounded-xl p-5">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="text-[13px] font-bold tracking-tight">Compliance score per contractor</div>
                  <button className="text-[11px] font-bold text-brand-700 inline-flex items-center gap-1">Sort by score <Icon name="chevron-down" size={11} /></button>
                </div>
                <div className="space-y-2.5">
                  {CONTRACTORS.filter(c => c.status !== 'standby').sort((a,b) => b.score-a.score).map((c,i) => {
                    const cls = CLASS[c.cls];
                    const tone = c.score >= 95 ? 'success' : c.score >= 85 ? 'safety' : c.score >= 75 ? 'warning' : 'danger';
                    return (
                      <div key={c.id} className="flex items-center gap-3">
                        <div className="w-6 text-[11px] text-subtle mono font-bold">#{i+1}</div>
                        <div className={`w-9 h-9 rounded-lg bg-${cls.tone}-50 text-${cls.tone}-700 flex items-center justify-center font-extrabold text-[11px] border border-${cls.tone}-500/20`}>
                          {c.short.split(' ').filter(s=>s!=='PT'&&s!=='CV').map(s=>s[0]).slice(0,2).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12.5px] font-extrabold truncate">{c.name}</div>
                          <div className="text-[10px] text-muted">{c.workers} workers · {cls.label}</div>
                        </div>
                        <div className="w-40 h-2 rounded-full bg-elev overflow-hidden">
                          <div className={`h-full bg-${tone}-500`} style={{ width:`${c.score}%` }} />
                        </div>
                        <div className={`text-[15px] font-extrabold mono text-${tone}-700 w-12 text-right`}>{c.score}%</div>
                        <div className="flex items-center gap-px w-16">
                          {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={11} className={s<=Math.round(c.score/20)?`text-${tone}-500`:'text-[color:var(--border-strong)]'} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expiry timeline */}
              <div className="surface rounded-xl p-5">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="text-[13px] font-bold tracking-tight">Expiry timeline · 90 hari ke depan</div>
                  <div className="text-[10px] text-muted">target spread, hindari bottleneck</div>
                </div>
                <ExpiryTimeline />
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-lg bg-danger-50 border border-danger-500/20 p-2.5">
                    <div className="text-[9px] uppercase tracking-wider text-danger-700 font-bold">7 hari</div>
                    <div className="text-[18px] font-extrabold mono text-danger-700">23 docs</div>
                  </div>
                  <div className="rounded-lg bg-warning-50 border border-warning-500/20 p-2.5">
                    <div className="text-[9px] uppercase tracking-wider text-warning-700 font-bold">30 hari</div>
                    <div className="text-[18px] font-extrabold mono text-warning-700">87 docs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk heat map */}
            <div className="surface rounded-xl p-5">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-[13px] font-bold tracking-tight">Risk heat map · contractor × cert type</div>
                <div className="text-[10.5px] text-muted">Color intensity = jumlah expiring + expired</div>
              </div>
              <RiskHeatmap />
            </div>

            {/* Anomaly + actions */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
              <div className="surface rounded-xl overflow-hidden">
                <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                  <Icon name="zap" size={16} className="text-warning-500" />
                  <div className="text-[13px] font-bold tracking-tight">Anomaly detection</div>
                  <span className="text-[10px] mono text-subtle">model · run 06:00</span>
                </div>
                <div className="divide-y divide-[color:var(--border)]">
                  {[
                    { sev:'high',   ic:'alert-triangle', t:'PT BWS bottleneck risk',
                      d:'23 worker MCU expire dalam minggu yang sama (8–14 Jun). Klinik Mitra Bahari kapasitas 8/hari — perlu spread atau alternatif klinik.',
                      act:'Bulk schedule MCU spread 2 minggu' },
                    { sev:'medium', ic:'trending-down', t:'PT SMS welder cert drop',
                      d:'4 dari 12 welder cert akan expire dalam 21 hari. Training schedule belum tersedia di kalender vendor.',
                      act:'Notify PT SMS HR + book training' },
                    { sev:'medium', ic:'palmtree', t:'Bahari catering K3L gap',
                      d:'12 cook punya cert food handler yang valid tapi K3L induction belum diperbarui sejak 2024. Audit Kemenkes 6 minggu lagi.',
                      act:'Schedule K3L refresh' },
                    { sev:'low',    ic:'shield-alert', t:'PT KNC sub-contractor unflagged',
                      d:'Detected 8 worker yang seharusnya sub-contractor PT KNC (dari CV Anugrah) tapi belum terdaftar di parent chain.',
                      act:'Review entity hierarchy' },
                  ].map((r,i) => (
                    <div key={i} className="px-5 py-3 flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        r.sev==='high' ? 'bg-danger-50 text-danger-600' :
                        r.sev==='medium'?'bg-warning-50 text-warning-600':
                        'bg-info-50 text-info-600'
                      }`}><Icon name={r.ic} size={17} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-[13px] font-extrabold">{r.t}</div>
                          <StatusPill tone={r.sev==='high'?'danger':r.sev==='medium'?'warning':'info'} size="sm">
                            {r.sev}
                          </StatusPill>
                        </div>
                        <div className="text-[11.5px] text-muted mt-0.5 leading-relaxed">{r.d}</div>
                        <button className="mt-1.5 text-[11.5px] font-bold text-brand-700 inline-flex items-center gap-1">{r.act} →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="space-y-3">
                <div className="surface rounded-xl p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Quick actions</div>
                  <div className="space-y-1.5">
                    <Btn variant="primary" full icon="calendar-plus">Bulk schedule MCU (23)</Btn>
                    <Btn variant="secondary" full icon="mail">Send reminder (87 docs)</Btn>
                    <Btn variant="outlineDanger" full icon="ban">Suspend expired (11)</Btn>
                    <Btn variant="ghost" full icon="graduation-cap">Open training session</Btn>
                  </div>
                </div>

                {/* Audit export ready */}
                <div className="rounded-xl bg-info-50 border border-info-500/25 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="file-check-2" size={16} className="text-info-600" />
                    <div className="text-[12px] font-extrabold text-info-700">Audit-ready export</div>
                  </div>
                  <div className="text-[11px] text-info-700/85 mb-3">
                    Snapshot kompilasi untuk submission ke Kemenaker / Direktorat Mineral &amp; Batubara.
                  </div>
                  <Btn variant="primary" size="sm" full icon="download">Generate audit PDF</Btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============== Expiry timeline (90 hari) ===============
function ExpiryTimeline() {
  const buckets = [
    { l:'7h',  v:23, color:'#E24B4A' },
    { l:'14h', v:31, color:'#EF9F27' },
    { l:'30h', v:33, color:'#F39800' },
    { l:'45h', v:42, color:'#F39800' },
    { l:'60h', v:51, color:'#1F4E79' },
    { l:'75h', v:38, color:'#1F4E79' },
    { l:'90h', v:29, color:'#4179AE' },
  ];
  const max = Math.max(...buckets.map(b=>b.v));
  const w = 480, h = 140;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: 160 }}>
      {/* baseline */}
      <line x1="20" x2={w} y1={h-30} y2={h-30} stroke="#E6E8EC" />
      {/* threshold lines */}
      <line x1="20" x2={w} y1={h-30-((max-7)/max)*(h-50)} y2={h-30-((max-7)/max)*(h-50)} stroke="#9EBCDA" strokeDasharray="3 3" opacity="0.5" />
      {buckets.map((b,i) => {
        const bw = (w - 40)/buckets.length - 4;
        const x = 20 + i*((w-40)/buckets.length) + 2;
        const bh = (b.v/max)*(h-50);
        return (
          <g key={i}>
            <rect x={x} y={h-30-bh} width={bw} height={bh} fill={b.color} rx="3" />
            <text x={x+bw/2} y={h-30-bh-6} fontSize="11" fontWeight="800" fontFamily="JetBrains Mono" fill={b.color} textAnchor="middle">{b.v}</text>
            <text x={x+bw/2} y={h-12} fontSize="10" fill="#5b6472" fontWeight="700" textAnchor="middle">{b.l}</text>
          </g>
        );
      })}
    </svg>
  );
}

// =============== Risk heatmap (contractor × cert type) ===============
function RiskHeatmap() {
  const ctrs = CONTRACTORS.filter(c => c.status !== 'standby').slice(0,7);
  const certTypes = ['MCU','K3L','SIMPER','Welder','CS Entry','First Aid','BPJS'];
  // Generate intensity per (ctr, certType) — biased so PT BWS has problems
  const cell = (ci, ti) => {
    const c = ctrs[ci];
    let v = 0.15 + ((ci*7+ti*13)%100)/100 * 0.25;
    if (c.short === 'PT BWS') v = Math.max(v, 0.65);
    if (c.short === 'PT BWS' && (certTypes[ti] === 'MCU' || certTypes[ti] === 'Welder')) v = 0.9;
    if (c.short === 'CV Tirta') v = Math.max(v, 0.5);
    if (c.short === 'PT KNC' && certTypes[ti] === 'MCU') v = 0.55;
    return v;
  };
  return (
    <div>
      <div className="grid" style={{ gridTemplateColumns:`200px repeat(${certTypes.length}, 1fr) 70px` }}>
        <div />
        {certTypes.map(t => <div key={t} className="text-center text-[10px] font-bold text-subtle pb-1.5">{t}</div>)}
        <div className="text-center text-[10px] font-bold text-subtle pb-1.5">Total</div>
        {ctrs.map((c,ci) => {
          const cls = CLASS[c.cls];
          let rowTotal = 0;
          return (
            <React.Fragment key={c.id}>
              <div className="flex items-center gap-2 pr-3">
                <div className={`w-7 h-7 rounded bg-${cls.tone}-50 text-${cls.tone}-700 flex items-center justify-center font-extrabold text-[10px]`}>
                  {c.short.split(' ').filter(s=>s!=='PT'&&s!=='CV').map(s=>s[0]).slice(0,2).join('')}
                </div>
                <div className="text-[11px] font-bold truncate">{c.short}</div>
              </div>
              {certTypes.map((_,ti) => {
                const v = cell(ci,ti);
                const count = Math.round(v * 12);
                rowTotal += count;
                const hi = v > 0.7;
                return (
                  <div key={ti} className="aspect-square m-0.5 rounded relative flex items-center justify-center"
                       style={{ background:`rgba(226,75,74,${v.toFixed(2)})` }}>
                    {hi && <span className="text-[10px] font-extrabold text-white mono">{count}</span>}
                  </div>
                );
              })}
              <div className="flex items-center justify-end pr-2 mono font-extrabold text-[12px] text-danger-700">{rowTotal}</div>
            </React.Fragment>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-subtle">
        <span>Low risk</span>
        <div className="flex">
          {[0.15,0.3,0.5,0.7,0.9].map(v => <span key={v} className="w-5 h-3" style={{ background:`rgba(226,75,74,${v})` }} />)}
        </div>
        <span>High risk · cell shows count</span>
      </div>
    </div>
  );
}

// ============================================================
// C12 — Induction & Training Scheduler
// ============================================================
function C12_TrainingScheduler() {
  // Generate a 14-day calendar starting Mon 18 Mei 2026
  const sessions = [
    { date:'19', day:'Sel', time:'08:00–12:00', topic:'K3L Pertambangan Madya', loc:'Training Center A', trainer:'Pak Wira',     cap:30, reg:24, tone:'success' },
    { date:'19', day:'Sel', time:'13:00–17:00', topic:'First Aid & CPR refresh',  loc:'Klinik Bahana',     trainer:'Bu Diana',      cap:20, reg:18, tone:'success' },
    { date:'20', day:'Rab', time:'08:00–17:00', topic:'Welder 3G SMAW refresh',   loc:'Workshop training',  trainer:'PT Tridaya',    cap:15, reg:15, tone:'warning', full:true },
    { date:'21', day:'Kam', time:'08:00–12:00', topic:'Confined Space Entry',     loc:'Tank yard A',        trainer:'PT Tridaya',    cap:12, reg:8,  tone:'success' },
    { date:'22', day:'Jum', time:'08:00–14:00', topic:'K3 Pertambangan Madya',    loc:'Training Center A', trainer:'BNSP Kemnaker',cap:40, reg:32, tone:'success' },
    { date:'25', day:'Sen', time:'08:00–17:00', topic:'SIMPER A renewal',          loc:'Test track',        trainer:'Dept K3LL',     cap:10, reg:7,  tone:'success' },
    { date:'26', day:'Sel', time:'08:00–12:00', topic:'Defensive Driving',         loc:'Training Center B', trainer:'PT Safety ID',  cap:20, reg:14, tone:'success' },
    { date:'27', day:'Rab', time:'08:00–12:00', topic:'Food Handler refresh',      loc:'Kitchen Bahari',     trainer:'Klinik Mitra',  cap:25, reg:22, tone:'success' },
    { date:'28', day:'Kam', time:'08:00–17:00', topic:'Welder 3G SMAW refresh',   loc:'Workshop training',  trainer:'PT Tridaya',    cap:15, reg:5,  tone:'info' },
  ];
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar current="training" />
      <div className="flex-1 flex flex-col min-w-0">
        <HRTopBar title="Training & Induction Scheduler — 14 hari ke depan" sub="HR · Compliance" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Toolbar */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex bg-white rounded-md border border-token p-0.5">
                {['Day','Week','2-week','Month'].map((v,i) => (
                  <button key={v} className={`px-3 h-8 rounded text-[12px] font-bold ${i===2?'bg-brand-500 text-white':'text-muted'}`}>{v}</button>
                ))}
              </div>
              <FilterChip icon="calendar">Mei 2026</FilterChip>
              <FilterChip icon="graduation-cap">Semua topic</FilterChip>
              <FilterChip icon="map-pin">Semua location</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="users">Bulk register from PT BWS</Btn>
              <Btn variant="primary" size="sm" icon="plus">Schedule session</Btn>
            </div>

            {/* Calendar grid */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="grid grid-cols-7 border-b border-token bg-elev/60">
                {['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'].map(d => (
                  <div key={d} className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-subtle text-center border-r border-token last:border-r-0">{d}</div>
                ))}
              </div>
              {/* 2 weeks */}
              {[0,1].map(wk => (
                <div key={wk} className="grid grid-cols-7">
                  {[18,19,20,21,22,23,24].map(d => d + wk*7).map((date,di) => {
                    const dayName = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'][di];
                    const dateSessions = sessions.filter(s => +s.date === date);
                    const isWeekend = di >= 5;
                    return (
                      <div key={date} className={`border-r border-b border-token last:border-r-0 p-2 min-h-[180px] ${isWeekend?'bg-elev/40':''}`}>
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <div className={`text-[10px] uppercase tracking-wider font-bold ${date===19?'text-brand-700':'text-subtle'}`}>{dayName}</div>
                          <div className={`text-[15px] font-extrabold ${date===19?'text-brand-700':''}`}>{date}</div>
                          {date===19 && <span className="ml-auto px-1.5 py-0.5 rounded bg-brand-500 text-white text-[9px] font-bold uppercase tracking-wider">Today</span>}
                        </div>
                        <div className="space-y-1.5">
                          {dateSessions.map((s,si) => {
                            const pct = (s.reg/s.cap)*100;
                            return (
                              <div key={si} className={`rounded-lg p-2 border ${s.full?'bg-warning-50/60 border-warning-500/30':'bg-white border-token'} cursor-pointer hover:border-brand-300`}>
                                <div className="text-[10px] font-bold mono text-subtle">{s.time}</div>
                                <div className="text-[11px] font-extrabold leading-tight" style={{ textWrap:'balance' }}>{s.topic}</div>
                                <div className="text-[9.5px] text-muted mt-0.5">{s.loc} · {s.trainer}</div>
                                <div className="mt-1 flex items-center gap-1.5">
                                  <div className="flex-1 h-1.5 rounded-full bg-elev overflow-hidden">
                                    <div className={`h-full ${pct>=100?'bg-warning-500':pct>=80?'bg-warning-500':'bg-success-500'}`} style={{ width:`${pct}%` }} />
                                  </div>
                                  <span className={`text-[9px] font-bold mono ${s.full?'text-warning-700':''}`}>{s.reg}/{s.cap}</span>
                                </div>
                                {s.full && <div className="text-[9px] mt-0.5 text-warning-700 font-bold inline-flex items-center gap-0.5"><Icon name="alert-triangle" size={9} /> Full</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Bulk register + attendance + cert auto-gen */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                { ic:'users',         t:'Bulk register',         d:'Pilih banyak worker dari kontraktor sekaligus untuk masukkan ke 1 session. Auto-check eligibility.' },
                { ic:'qr-code',       t:'Attendance tracking',    d:'Worker scan QR di awal session. Late-arrival flag · early-leave auto-mark.' },
                { ic:'award',         t:'Auto-generate cert',     d:'Post-session, sertifikat PDF auto-generate dengan signature trainer + masuk worker profile.' },
              ].map(f => (
                <div key={f.t} className="surface rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name={f.ic} size={18} /></div>
                  <div className="mt-3 text-[13px] font-extrabold">{f.t}</div>
                  <div className="text-[11.5px] text-muted mt-1 leading-relaxed">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// C13 — Access Suspension Management
// ============================================================
function C13_SuspensionMgmt() {
  const suspended = [
    { id:'W-08092', name:'Lina Marbun',     ctr:'PT BWS',   pos:'Welder 3G SMAW',  reason:'MCU expired (17 hari)',                  type:'mcu',         since:'02 Mei 2026', tone:'gray',     action:'Reschedule MCU' },
    { id:'W-22041', name:'Bagas Rinaldi',   ctr:'PT BWS',   pos:'Mekanik Crane',    reason:'SIMPER C expired (5 hari)',               type:'simper',      since:'14 Mei 2026', tone:'gray',     action:'Renew SIMPER C' },
    { id:'W-44011', name:'Anto Pratomo',    ctr:'CV Tirta', pos:'Driver',           reason:'K3L induction expired',                    type:'training',    since:'08 Mei 2026', tone:'gray',     action:'Schedule K3L' },
    { id:'W-39812', name:'Tono Sudirman',   ctr:'PT KNC',   pos:'Helper Hauling',   reason:'Disciplinary · attendance 5 absent',      type:'disciplinary',since:'12 Mei 2026', tone:'danger',   action:'Manager review' },
    { id:'W-50921', name:'Hartono',          ctr:'PT SMS',   pos:'Operator Excav',   reason:'CS Entry expired (90 hari)',              type:'training',    since:'02 Mar 2026', tone:'gray',     action:'Re-train CS' },
    { id:'W-12390', name:'Slamet Riyadi',    ctr:'PT KNC',   pos:'Mekanik',          reason:'BPJS TK lapsed · payment overdue',         type:'insurance',   since:'01 Mei 2026', tone:'warning',  action:'Contact PIC KNC' },
    { id:'W-77820', name:'Wahyu Setiawan',   ctr:'PT BWS',   pos:'Welder',           reason:'Welder cert expired (90 hari)',           type:'training',    since:'19 Feb 2026', tone:'gray',     action:'Re-train' },
  ];
  return (
    <div className="h-full flex bg-elev">
      <HRSidebar current="access" />
      <div className="flex-1 flex flex-col min-w-0">
        <HRTopBar title="Access Suspension Management" sub="HR · Compliance · 12 suspended" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <KPICard icon="ban"             label="Total suspended"  value="12" tone="danger"  sub="dari 3,142 worker" />
              <KPICard icon="heart-pulse"     label="MCU expired"      value="4"  tone="warning" />
              <KPICard icon="graduation-cap"   label="Training expired" value="5"  tone="warning" />
              <KPICard icon="car"              label="SIMPER expired"   value="1"  tone="warning" />
              <KPICard icon="alert-triangle"  label="Disciplinary"      value="2"  tone="danger" />
            </div>

            {/* Auto-suspend explanation */}
            <div className="rounded-xl bg-info-50 border border-info-500/25 p-4 flex items-start gap-3">
              <Icon name="info" size={20} className="text-info-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-[12.5px] text-info-700">
                <div className="font-extrabold mb-0.5">Auto-suspend rules</div>
                <div>Sistem otomatis suspend access saat sertifikat expired. Worker tidak bisa: clock-in via gate, di-assign ke PTW, akses area restricted, atau scan kartu di reader. Lift suspension hanya setelah compliance restored dan HR/SO approval.</div>
              </div>
              <Btn variant="ghost" size="sm" icon="settings">Edit rules</Btn>
            </div>

            {/* Filters + bulk */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip icon="filter" active>Semua reason</FilterChip>
              <FilterChip icon="building-2">Semua kontraktor</FilterChip>
              <FilterChip icon="calendar">Suspended sejak: all</FilterChip>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="mail">Notify supervisors</Btn>
              <Btn variant="primary" size="sm" icon="calendar-plus">Bulk schedule renewal</Btn>
            </div>

            <div className="surface rounded-xl overflow-hidden">
              <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                <Icon name="ban" size={16} className="text-danger-600" />
                <div className="text-[13px] font-bold tracking-tight">Currently suspended · {suspended.length}</div>
                <div className="flex-1" />
                <Btn variant="ghost" size="sm" icon="download">Export</Btn>
              </div>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-subtle bg-elev">
                    <th className="px-5 py-2.5">Worker</th>
                    <th className="px-3 py-2.5">Contractor</th>
                    <th className="px-3 py-2.5">Reason</th>
                    <th className="px-3 py-2.5">Type</th>
                    <th className="px-3 py-2.5">Suspended sejak</th>
                    <th className="px-3 py-2.5">Resolution required</th>
                    <th className="px-3 py-2.5 w-44"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--border)]">
                  {suspended.map(w => (
                    <tr key={w.id} className="hover:bg-elev">
                      <td className="px-5 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={w.name} size={32} tone="gray" />
                          <div>
                            <div className="font-extrabold flex items-center gap-1.5">{w.name}<Icon name="ban" size={11} className="text-danger-500" /></div>
                            <div className="text-[10px] text-subtle mono">{w.id} · {w.pos}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 font-semibold">{w.ctr}</td>
                      <td className="px-3 py-2.5">{w.reason}</td>
                      <td className="px-3 py-2.5">
                        {w.type==='mcu'         && <StatusPill tone="warning" size="sm" icon="heart-pulse">MCU</StatusPill>}
                        {w.type==='simper'      && <StatusPill tone="warning" size="sm" icon="car">SIMPER</StatusPill>}
                        {w.type==='training'    && <StatusPill tone="warning" size="sm" icon="graduation-cap">Training</StatusPill>}
                        {w.type==='insurance'   && <StatusPill tone="warning" size="sm" icon="shield-check">Insurance</StatusPill>}
                        {w.type==='disciplinary'&& <StatusPill tone="danger"  size="sm" icon="alert-triangle">Disciplinary</StatusPill>}
                      </td>
                      <td className="px-3 py-2.5 mono text-muted">{w.since}</td>
                      <td className="px-3 py-2.5 font-semibold">{w.action}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex gap-1 justify-end">
                          <button className="h-7 px-2 rounded border border-warning-300 bg-white text-warning-700 text-[10px] font-bold">Reschedule</button>
                          <button className="h-7 px-2 rounded bg-success-500 text-white text-[10px] font-bold">Lift</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Auto-suspend audit log */}
            <div className="surface rounded-xl overflow-hidden">
              <div className="px-5 h-12 border-b border-token flex items-center gap-3">
                <Icon name="history" size={16} className="text-brand-500" />
                <div className="text-[13px] font-bold tracking-tight">Auto-suspend audit log · immutable</div>
                <span className="text-[10px] text-subtle mono">last 5 dari 384 entries</span>
              </div>
              <div className="divide-y divide-[color:var(--border)] text-[11.5px]">
                {[
                  { t:'19 Mei 03:00', who:'System',         act:'Auto-suspend',           tgt:'Hartono · W-50921 (CS expired 90h)',     hash:'9a7c...b821' },
                  { t:'14 Mei 03:00', who:'System',         act:'Auto-suspend',           tgt:'Bagas Rinaldi · W-22041 (SIMPER 5h)',    hash:'7b22...f481' },
                  { t:'12 Mei 14:32', who:'Yusuf Kurniawan',act:'Manual suspend',         tgt:'Tono Sudirman · W-39812 (disciplinary)',  hash:'5c19...a3d7' },
                  { t:'08 Mei 03:00', who:'System',         act:'Auto-suspend',           tgt:'Anto Pratomo · W-44011 (K3L expired)',    hash:'3e40...c2f5' },
                  { t:'02 Mei 03:00', who:'System',         act:'Auto-suspend + cascade', tgt:'Lina M. · W-08092 (MCU) → PTW-00099 rejected', hash:'a8f3...c92b' },
                ].map((r,i) => (
                  <div key={i} className="px-5 py-2.5 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-danger-500" />
                    <span className="mono text-subtle w-32">{r.t}</span>
                    <span className="font-bold w-32 truncate">{r.who}</span>
                    <span className="text-muted w-32">{r.act}</span>
                    <span className="font-semibold flex-1 truncate">{r.tgt}</span>
                    <span className="mono text-[10px] text-subtle">{r.hash}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.C11_Compliance       = C11_Compliance;
window.C12_TrainingScheduler= C12_TrainingScheduler;
window.C13_SuspensionMgmt   = C13_SuspensionMgmt;
