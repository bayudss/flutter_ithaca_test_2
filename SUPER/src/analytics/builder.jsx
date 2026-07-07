// Analytics — A7 Report Builder, A8 Drill-down Explorer, M1/M2 mobile.

// ============================================================
// A7 — Custom Report Builder
// ============================================================
function A7_Builder() {
  return (
    <div className="h-full flex bg-elev">
      <AnalyticsSidebar current="builder" />
      <div className="flex-1 flex flex-col min-w-0">
        <AnalyticsTopBar title="Custom Report Builder" sub="drag-drop dashboard" period="month" refresh="manual" />
        <div className="flex-1 min-h-0 overflow-hidden grid grid-cols-[260px_1fr_240px]">
          {/* Metric library */}
          <div className="border-r border-token bg-white overflow-y-auto p-3">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Metric library</div>
            <div className="bg-elev rounded-md px-2.5 h-8 flex items-center gap-2 text-[11px] text-subtle mb-3"><Icon name="search" size={13} /> Cari metric…</div>
            {[
              { mod:'Attendance', items:['Attendance %','Late count','OT hours'] },
              { mod:'Production', items:['Tonnage','OEE','Cycle time'] },
              { mod:'HSE', items:['LTIR','Incidents','PTW active'] },
              { mod:'FAC', items:['Occupancy','Meal consumption','Shuttle on-time'] },
            ].map(g => (
              <div key={g.mod} className="mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-subtle mb-1.5 px-1">{g.mod}</div>
                <div className="space-y-1">
                  {g.items.map(it => (
                    <div key={it} className="flex items-center gap-2 px-2.5 h-9 rounded-lg border border-token bg-white hover:border-brand-300 cursor-grab text-[11.5px] font-semibold"><Icon name="grip-vertical" size={12} className="text-subtle" /><Icon name="bar-chart-3" size={13} className="text-brand-500" /><span className="flex-1">{it}</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Canvas */}
          <div className="overflow-y-auto p-5 bg-elev">
            <div className="flex items-center gap-2 mb-3">
              <input defaultValue="Ops Weekly Review" className="text-[16px] font-extrabold tracking-tight bg-transparent outline-none border-b border-dashed border-token focus:border-brand-300" />
              <StatusPill tone="gray" size="sm" icon="save">Auto-saved</StatusPill>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="eye">Preview</Btn>
              <Btn variant="primary" size="sm" icon="share-2">Share</Btn>
            </div>
            {/* Grid of dropped widgets */}
            <div className="grid grid-cols-2 gap-3">
              <div className="surface rounded-xl p-4"><div className="flex items-center justify-between mb-2"><div className="text-[12px] font-bold">Production trend</div><Icon name="grip-vertical" size={13} className="text-subtle" /></div><LineChart color="#1D9E75" height={120} data={[1080,1150,1180,1140,1210,1240]} labels={['J','F','M','A','M','J']} /></div>
              <div className="surface rounded-xl p-4"><div className="flex items-center justify-between mb-2"><div className="text-[12px] font-bold">Attendance %</div><Icon name="grip-vertical" size={13} className="text-subtle" /></div><div className="flex items-center justify-center py-2"><Gauge value={94} max={100} label="this month" size={120} /></div></div>
              <div className="surface rounded-xl p-4"><div className="flex items-center justify-between mb-2"><div className="text-[12px] font-bold">PTW by type</div><Icon name="grip-vertical" size={13} className="text-subtle" /></div><div className="flex items-center justify-center"><Donut size={120} total="12" totalLabel="PTW" values={[{c:'#E24B4A',v:3},{c:'#378ADD',v:2},{c:'#F39800',v:3},{c:'#EF9F27',v:4}]} /></div></div>
              {/* Drop zone */}
              <div className="rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/30 flex flex-col items-center justify-center min-h-[170px] text-center p-4"><Icon name="plus-circle" size={28} className="text-brand-400" /><div className="text-[12px] font-bold text-brand-700 mt-2">Drop metric di sini</div><div className="text-[10.5px] text-muted">lalu pilih visualisasi</div></div>
            </div>
          </div>

          {/* Config panel */}
          <div className="border-l border-token bg-white overflow-y-auto p-3">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-2">Widget config</div>
            <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Visualization</div>
            <div className="grid grid-cols-3 gap-1.5 mb-4">
              {[{ic:'bar-chart-3',l:'Bar'},{ic:'line-chart',l:'Line',on:true},{ic:'pie-chart',l:'Pie'},{ic:'table',l:'Table'},{ic:'map',l:'Map'},{ic:'square',l:'KPI'}].map(v => (
                <button key={v.l} className={`h-14 rounded-lg border inline-flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold ${v.on?'bg-brand-50 border-brand-300 text-brand-700':'bg-white border-token text-muted'}`}><Icon name={v.ic} size={16} /> {v.l}</button>
              ))}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Filters</div>
            <div className="space-y-1.5 mb-4">
              {['Period: Last 6 months','Area: All','Shift: All'].map(f => <div key={f} className="flex items-center gap-2 px-2.5 h-9 rounded-lg bg-elev text-[11.5px] font-semibold"><Icon name="filter" size={12} className="text-subtle" /><span className="flex-1">{f}</span><Icon name="x" size={12} className="text-subtle" /></div>)}
              <button className="w-full h-9 rounded-lg border border-dashed border-token-strong text-[11px] font-bold text-brand-700 inline-flex items-center justify-center gap-1.5"><Icon name="plus" size={12} /> Add filter</button>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Share with</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 px-2.5 h-9 rounded-lg bg-elev text-[11.5px]"><Icon name="users" size={13} className="text-brand-500" /><span className="flex-1 font-semibold">Role: Operations</span></div>
              <div className="flex items-center gap-2 px-2.5 h-9 rounded-lg bg-elev text-[11.5px]"><Avatar name="Dewi L." size={20} tone="brand" /><span className="flex-1 font-semibold">Dewi Lestari</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// A8 — Drill-Down Explorer
// ============================================================
function A8_Explorer() {
  return (
    <div className="h-full flex bg-elev">
      <AnalyticsSidebar current="explorer" />
      <div className="flex-1 flex flex-col min-w-0">
        <AnalyticsTopBar title="Drill-Down Explorer" sub="multi-level breakdown" period="month" refresh="manual" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[12px]">
              <button className="px-2.5 h-8 rounded-md bg-white border border-token font-bold text-muted hover:text-[color:var(--text)]">Workforce</button>
              <Icon name="chevron-right" size={13} className="text-subtle" />
              <button className="px-2.5 h-8 rounded-md bg-white border border-token font-bold text-muted hover:text-[color:var(--text)]">by Contractor</button>
              <Icon name="chevron-right" size={13} className="text-subtle" />
              <span className="px-2.5 h-8 rounded-md bg-brand-500 text-white font-bold inline-flex items-center">PT KNC · by Worker</span>
              <div className="flex-1" />
              <Btn variant="secondary" size="sm" icon="download">Export this level</Btn>
            </div>

            {/* 3-level visual */}
            <div className="grid grid-cols-3 gap-4">
              {/* Level 1 */}
              <div className="surface rounded-xl p-4 opacity-60">
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Level 1 · Workforce</div>
                <div className="text-[28px] font-extrabold mono">5,142</div>
                <div className="text-[11px] text-muted mb-3">total aktif</div>
                <div className="space-y-1.5">
                  {[{l:'Organik',v:'3,012',pct:59},{l:'Kontraktor',v:'2,130',pct:41}].map(r => (
                    <div key={r.l}><div className="flex justify-between text-[11px] mb-0.5"><span className="font-semibold">{r.l}</span><span className="mono">{r.v}</span></div><div className="h-2 rounded-full bg-elev overflow-hidden"><div className="h-full bg-brand-500" style={{ width:`${r.pct}%` }} /></div></div>
                  ))}
                </div>
              </div>

              {/* Level 2 */}
              <div className="surface rounded-xl p-4 opacity-80">
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Level 2 · by Contractor</div>
                <div className="text-[28px] font-extrabold mono">2,130</div>
                <div className="text-[11px] text-muted mb-3">kontraktor</div>
                <div className="space-y-1">
                  {[{l:'PT KNC',v:412,sel:true},{l:'PT SMS',v:280},{l:'PT BWS',v:68},{l:'PT ALS',v:96},{l:'Others',v:1274}].map(r => (
                    <button key={r.l} className={`w-full flex items-center justify-between px-2.5 h-8 rounded-lg text-[11.5px] ${r.sel?'bg-brand-50 border border-brand-300 font-extrabold text-brand-700':'hover:bg-elev font-semibold'}`}><span>{r.l}</span><span className="mono inline-flex items-center gap-1">{r.v}{r.sel && <Icon name="chevron-right" size={12} />}</span></button>
                  ))}
                </div>
              </div>

              {/* Level 3 */}
              <div className="surface rounded-xl p-4 ring-2 ring-brand-500/30">
                <div className="text-[10px] uppercase tracking-wider text-brand-600 font-bold mb-2">Level 3 · PT KNC workers</div>
                <div className="text-[28px] font-extrabold mono">412</div>
                <div className="text-[11px] text-muted mb-3">tap worker untuk profil lengkap</div>
                <div className="space-y-1 max-h-[180px] overflow-y-auto">
                  {[
                    { n:'Budi Santoso', r:'Driver', att:'100%' },
                    { n:'Joko Pranoto', r:'CS Entry', att:'96%' },
                    { n:'Henny Sari', r:'Driver LV', att:'94%' },
                    { n:'Topan W.', r:'Operator', att:'98%' },
                    { n:'Slamet R.', r:'Mekanik', att:'92%' },
                  ].map((w,i) => (
                    <button key={i} className="w-full flex items-center gap-2 px-2 h-9 rounded-lg hover:bg-elev"><Avatar name={w.n} size={24} photo /><div className="flex-1 min-w-0 text-left"><div className="text-[11.5px] font-bold truncate">{w.n}</div></div><span className="text-[10px] text-muted">{w.r}</span><StatusPill tone="success" size="sm">{w.att}</StatusPill></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Alt drill-down example */}
            <div className="surface rounded-xl p-5">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted mb-3">Contoh drill-down lain</div>
              <div className="flex items-center gap-2 flex-wrap text-[12px]">
                <span className="px-2.5 h-8 rounded-md bg-elev font-bold inline-flex items-center gap-1.5"><Icon name="shield-alert" size={13} className="text-danger-500" /> Incident (68)</span>
                <Icon name="arrow-right" size={14} className="text-subtle" />
                <span className="px-2.5 h-8 rounded-md bg-elev font-bold inline-flex items-center gap-1.5">by Category → Slip/trip (38)</span>
                <Icon name="arrow-right" size={14} className="text-subtle" />
                <span className="px-2.5 h-8 rounded-md bg-brand-50 border border-brand-300 text-brand-700 font-bold inline-flex items-center gap-1.5">Specific incident detail · INC-2026-0142</span>
              </div>
              <div className="mt-3 rounded-lg bg-elev p-3 text-[11.5px] text-muted"><span className="font-bold text-[color:var(--text)]">Lazy load:</span> deep drill-down di-fetch on-demand untuk dashboard load &lt;3 detik. Setiap level bisa di-export. Breadcrumb untuk navigasi balik.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M1 — My Team Performance (SPV mobile)
// ============================================================
function M1_TeamPerformance() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <div className="bg-brand-700 text-white px-5 pt-1 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1"><div className="text-[15px] font-bold tracking-tight">Tim saya</div><div className="text-[11px] opacity-80">Pak Hadi · SPV Shift Pagi · Mei 2026</div></div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[{l:'Attendance avg',v:'94%',d:'+2%'},{l:'PJA completion',v:'91%',d:'+5%'}].map(s => (
            <div key={s.l} className="bg-white/12 rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider opacity-80 font-bold">{s.l}</div><div className="text-[22px] font-extrabold mono mt-0.5">{s.v}</div><div className="text-[10px] opacity-80">{s.d} vs bulan lalu</div></div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        <div className="px-4 pt-4 grid grid-cols-2 gap-2">
          <div className="surface rounded-xl p-3"><div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-subtle font-bold"><Icon name="eye" size={11} /> Safety obs</div><div className="text-[20px] font-extrabold mono mt-0.5">38</div><div className="text-[10px] text-success-700 font-bold">+8 submitted</div></div>
          <div className="surface rounded-xl p-3"><div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-subtle font-bold"><Icon name="badge-check" size={11} /> Compliance</div><div className="text-[20px] font-extrabold mono mt-0.5">96%</div><div className="text-[10px] text-success-700 font-bold">all cert valid</div></div>
        </div>

        <div className="px-4 mt-4">
          <div className="flex items-center justify-between mb-2"><div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">Member · 14 orang</div><button className="text-[11px] font-bold text-brand-700">Lihat semua</button></div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { n:'Budi Santoso', att:'100%', pja:'18/18', tone:'success' },
              { n:'Asep Hidayat', att:'96%', pja:'16/17', tone:'success' },
              { n:'Rina Wati', att:'94%', pja:'14/15', tone:'success' },
              { n:'Eko Saputra', att:'82%', pja:'10/14', tone:'warning', flag:true },
            ].map((m,i) => (
              <button key={i} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-elev text-left">
                <Avatar name={m.n} size={36} photo />
                <div className="flex-1 min-w-0"><div className="text-[12.5px] font-extrabold flex items-center gap-1.5">{m.n}{m.flag && <Icon name="alert-triangle" size={11} className="text-warning-500" />}</div><div className="text-[10.5px] text-muted">Att {m.att} · PJA {m.pja}</div></div>
                <Icon name="chevron-right" size={15} className="text-subtle" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M2 — Personal Insights (worker mobile)
// ============================================================
function M2_PersonalInsights() {
  return (
    <div className="flex-1 flex flex-col" style={{ background:'linear-gradient(180deg, #11624A 0%, #1D9E75 55%, #f5f6f8 92%)' }}>
      <div className="px-5 pt-1 pb-3 flex items-center gap-3 shrink-0 text-white">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
        <div className="flex-1"><div className="text-[15px] font-bold tracking-tight">Stats saya</div><div className="text-[11px] opacity-80">Budi Santoso · Mei 2026</div></div>
        <button className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="share-2" size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Streak hero */}
        <div className="px-6 pt-2 text-white text-center">
          <div className="text-[52px] leading-none">🏆</div>
          <div className="text-[18px] font-extrabold tracking-tight mt-2">27 hari berturut tanpa absen</div>
          <div className="text-[12px] opacity-85">Top 5% di department Mining Ops</div>
        </div>

        {/* Stats cards */}
        <div className="px-4 mt-5 grid grid-cols-2 gap-2.5">
          {[
            { ic:'check-circle-2', l:'Attendance', v:'22 hari', s:'100%', tone:'success' },
            { ic:'clipboard-check', l:'PJA', v:'18 done', s:'95% on-time', tone:'brand' },
            { ic:'eye', l:'Safety obs', v:'3', s:'submitted', tone:'safety' },
            { ic:'flame', l:'Streak', v:'27 hari', s:'personal best', tone:'danger' },
          ].map(c => (
            <div key={c.l} className="bg-white rounded-2xl p-4 shadow-sm"><div className={`w-10 h-10 rounded-xl bg-${c.tone}-50 text-${c.tone}-600 flex items-center justify-center`}><Icon name={c.ic} size={20} /></div><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mt-2.5">{c.l}</div><div className="text-[18px] font-extrabold mono">{c.v}</div><div className="text-[10.5px] text-muted">{c.s}</div></div>
          ))}
        </div>

        {/* Comparison vs team */}
        <div className="px-4 mt-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-[12px] font-extrabold mb-3">Saya vs rata-rata tim</div>
            <div className="space-y-3">
              {[
                { l:'Attendance', me:100, team:94 },
                { l:'PJA on-time', me:95, team:88 },
                { l:'Safety obs', me:3, team:2.7, unit:'' },
              ].map(r => (
                <div key={r.l}>
                  <div className="flex items-center justify-between text-[11px] mb-1"><span className="font-bold">{r.l}</span><span className="mono"><span className="text-success-700 font-bold">{r.me}{r.unit??'%'}</span> <span className="text-subtle">vs {r.team}{r.unit??'%'}</span></span></div>
                  <div className="relative h-2.5 rounded-full bg-elev overflow-hidden"><div className="absolute h-full rounded-full bg-success-500" style={{ width:`${typeof r.me==='number'&&r.me<=10?r.me/5*100:r.me}%` }} /><div className="absolute top-0 bottom-0 w-0.5 bg-brand-700" style={{ left:`${typeof r.team==='number'&&r.team<=10?r.team/5*100:r.team}%` }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[10.5px] text-muted flex items-center gap-1.5"><span className="w-3 h-0.5 bg-brand-700 inline-block" /> garis = rata-rata tim</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.A7_Builder = A7_Builder;
window.A8_Explorer = A8_Explorer;
window.M1_TeamPerformance = M1_TeamPerformance;
window.M2_PersonalInsights = M2_PersonalInsights;
