// Shared — Analytics & Dashboard module. Lightweight SVG chart library + chrome.

// =============== Chrome ===============
function StatusBar({ dark=false }) {
  return (
    <div className="iphone-statusbar" style={{ color: dark?'#fff':'#0f1115' }}>
      <div className="mono">07:30</div>
      <div className="flex items-center gap-1.5"><Icon name="signal" size={15} /><Icon name="wifi" size={15} />
        <div className="flex items-center gap-0.5"><div className="mono text-[11px] font-bold">90</div>
          <div className="relative w-[24px] h-[12px] rounded-[3px]" style={{ border:`1.5px solid ${dark?'#fff':'#0f1115'}` }}><div className="absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px]" style={{ width:'90%', background: dark?'#fff':'#0f1115' }} /></div>
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ label, sub, anno, children, dark=false }) {
  return (
    <div className="relative flex flex-col items-center gap-3 shrink-0">
      <div className="iphone-frame"><div className="iphone-notch" />
        <div className={`iphone-screen ${dark?'on-dark':''}`}><StatusBar dark={dark} /><div className="flex-1 flex flex-col min-h-0">{children}</div></div>
        <div className="iphone-home" style={{ background: dark?'rgba(255,255,255,0.7)':'rgba(0,0,0,0.35)' }} />
        {anno && (<div className="anno"><span className="lab">{anno.lab}</span><div>{anno.text}</div></div>)}
      </div>
      <div className="text-center"><div className="text-[12px] font-bold tracking-tight">{label}</div>{sub && <div className="text-[11px] text-subtle mt-0.5">{sub}</div>}</div>
    </div>
  );
}

function BrowserChrome({ url, children, height=720 }) {
  return (
    <div className="rounded-xl border border-token overflow-hidden shadow-xl bg-white" style={{ height }}>
      <div className="h-9 bg-elev border-b border-token flex items-center px-3 gap-2">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ED6A5E]" /><span className="w-3 h-3 rounded-full bg-[#F5BF4F]" /><span className="w-3 h-3 rounded-full bg-[#62C455]" /></div>
        <div className="flex-1 flex justify-center"><div className="bg-white border border-token rounded-md h-6 px-3 text-[11px] mono text-subtle inline-flex items-center gap-1.5 min-w-[320px] justify-center"><Icon name="lock" size={11} /> {url}</div></div>
        <div className="w-12" />
      </div>
      <div className="h-[calc(100%-36px)] overflow-hidden">{children}</div>
    </div>
  );
}

function BrandMark({ size=40 }) {
  return <div className="rounded-[28%] flex items-center justify-center font-extrabold text-white" style={{ width:size, height:size, background:'linear-gradient(135deg, #4179AE 0%, #1F4E79 60%, #F39800 140%)', boxShadow:'0 6px 16px -8px rgba(31,78,121,0.6)', fontSize:size*0.55, letterSpacing:'-0.05em' }}>N</div>;
}

function StatusPill({ tone='gray', icon, children, size='md' }) {
  const map = { success:'bg-success-50 text-success-700 border-success-500/25', warning:'bg-warning-50 text-warning-700 border-warning-500/25', danger:'bg-danger-50 text-danger-700 border-danger-500/25', info:'bg-info-50 text-info-700 border-info-500/25', safety:'bg-safety-50 text-safety-700 border-safety-500/25', brand:'bg-brand-50 text-brand-700 border-brand-500/25', gray:'bg-elev text-muted border-token', dark:'bg-brand-700 text-white border-brand-800' };
  const sizes = { sm:'px-1.5 h-5 text-[10px] gap-1', md:'px-2 h-6 text-[11px] gap-1.5', lg:'px-2.5 h-7 text-[12px] gap-1.5' };
  return <span className={`inline-flex items-center font-bold border rounded-md ${map[tone]} ${sizes[size]}`}>{icon && <Icon name={icon} size={size==='lg'?13:size==='sm'?10:12} />}{children}</span>;
}

function Btn({ variant='primary', size='md', icon, iconRight, children, full, disabled, onClick, className='' }) {
  const sizes = { sm:'h-9 px-3 text-[13px] gap-1.5', md:'h-11 px-4 text-[14px] gap-2', lg:'h-14 px-5 text-[15px] gap-2.5' };
  const variants = { primary:'bg-brand-500 text-white hover:bg-brand-600 shadow-sm', secondary:'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50', ghost:'text-brand-700 hover:bg-brand-50', success:'bg-success-500 text-white hover:bg-success-600', danger:'bg-danger-500 text-white hover:bg-danger-600', safety:'bg-safety-500 text-white hover:bg-safety-600', dark:'bg-brand-700 text-white hover:bg-brand-800' };
  return <button onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all focus-ring ${sizes[size]} ${variants[variant]} ${full?'w-full':''} ${disabled?'opacity-40 cursor-not-allowed':''} ${className}`}>{icon && <Icon name={icon} size={size==='lg'?20:16} />}<span>{children}</span>{iconRight && <Icon name={iconRight} size={size==='lg'?20:16} />}</button>;
}

function Avatar({ name, size=32, tone='brand', photo }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = { brand:'bg-brand-500', safety:'bg-safety-500', danger:'bg-danger-500', info:'bg-info-500', success:'bg-success-500', warning:'bg-warning-500', gray:'bg-[#5b6472]' };
  if (photo) return <div className="rounded-full overflow-hidden shrink-0 relative" style={{ width:size, height:size, background:'linear-gradient(160deg, #4179AE, #143452)' }}><div className="absolute inset-0 flex items-center justify-center text-white/85"><Icon name="user" size={size*0.5} /></div></div>;
  return <div className={`rounded-full text-white flex items-center justify-center font-bold shrink-0 ${tones[tone]}`} style={{ width:size, height:size, fontSize:size*0.36 }}>{initials}</div>;
}

function FilterChip({ icon, children, dot, active }) {
  return <button className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-[12px] font-semibold hover:border-brand-300 hover:bg-brand-50/40 ${active?'bg-brand-50 border border-brand-300 text-brand-700':'border border-token bg-white'}`}>{icon && <Icon name={icon} size={13} className="text-subtle" />}<span>{children}</span>{dot && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 -ml-0.5" />}<Icon name="chevron-down" size={13} className="text-subtle" /></button>;
}

// Period selector
function PeriodSelector({ active='month' }) {
  const opts = [{id:'today',l:'Today'},{id:'week',l:'Week'},{id:'month',l:'Month'},{id:'quarter',l:'Quarter'},{id:'custom',l:'Custom'}];
  return (
    <div className="inline-flex bg-white rounded-md border border-token p-0.5">
      {opts.map(o => <button key={o.id} className={`px-3 h-8 rounded text-[12px] font-bold ${active===o.id?'bg-brand-500 text-white':'text-muted hover:bg-elev'}`}>{o.l}</button>)}
    </div>
  );
}

// =============== Hero KPI (big numbers) ===============
function HeroKPI({ icon, label, value, unit, sub, tone='brand', delta, target }) {
  const tones = { brand:'from-brand-500 to-brand-700', success:'from-success-500 to-success-700', danger:'from-danger-500 to-danger-700', safety:'from-safety-500 to-safety-700', info:'from-info-500 to-brand-600' };
  return (
    <div className="surface rounded-2xl p-5 relative overflow-hidden">
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${tones[tone]} opacity-[0.07]`} />
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tones[tone]} text-white flex items-center justify-center`}><Icon name={icon} size={22} /></div>
        {delta && <div className={`text-[12px] font-bold ${delta.startsWith('+')?'text-success-600':delta.startsWith('-')&&tone==='danger'?'text-success-600':delta.startsWith('-')?'text-danger-600':'text-success-600'} inline-flex items-center gap-1`}><Icon name={delta.startsWith('+')?'trending-up':'trending-down'} size={13} /> {delta}</div>}
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-wider text-subtle font-bold">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5 count-up">
        <span className="text-[34px] font-extrabold tracking-tight mono leading-none">{value}</span>
        {unit && <span className="text-[15px] font-bold text-muted">{unit}</span>}
      </div>
      {(sub||target) && <div className="mt-1.5 flex items-center gap-2 text-[11px]">{sub && <span className="text-subtle">{sub}</span>}{target && <StatusPill tone={target.ok?'success':'danger'} size="sm" icon="target">{target.label}</StatusPill>}</div>}
    </div>
  );
}

// Compact KPI
function KPICard({ icon, label, value, sub, tone='brand', delta }) {
  const tones = { brand:'bg-brand-50 text-brand-600', success:'bg-success-50 text-success-600', warning:'bg-warning-50 text-warning-600', danger:'bg-danger-50 text-danger-500', safety:'bg-safety-50 text-safety-600', info:'bg-info-50 text-info-600' };
  return (
    <div className="surface rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tones[tone]}`}><Icon name={icon} size={17} /></div>
        {delta && <div className={`text-[11px] font-semibold ${delta.startsWith('+')?'text-success-600':'text-danger-600'} inline-flex items-center gap-1`}><Icon name={delta.startsWith('+')?'trending-up':'trending-down'} size={12} /> {delta}</div>}
      </div>
      <div className="mt-3 text-[10.5px] uppercase tracking-wider text-subtle font-semibold">{label}</div>
      <div className="mt-0.5 text-[22px] font-extrabold tracking-tight mono">{value}</div>
      {sub && <div className="text-[10.5px] text-subtle mt-0.5">{sub}</div>}
    </div>
  );
}

// =============== CHART LIBRARY ===============

// Line chart with optional target line + area fill
function LineChart({ data, labels, target, color='#1F4E79', max, height=180, fill=true, dark=false }) {
  const w = 520, h = height;
  const pad = { l:38, r:12, t:14, b:24 };
  const mx = max || Math.max(...data, target||0) * 1.15;
  const xs = i => pad.l + (i/(data.length-1))*(w-pad.l-pad.r);
  const ys = v => h - pad.b - (v/mx)*(h-pad.t-pad.b);
  const path = data.map((v,i)=>`${i?'L':'M'}${xs(i)} ${ys(v)}`).join(' ');
  const area = path + ` L${xs(data.length-1)} ${h-pad.b} L${xs(0)} ${h-pad.b} Z`;
  const grid = dark ? '#1e2a3d' : '#E6E8EC';
  const txt = dark ? '#5b7494' : '#8b94a2';
  const gid = 'lg'+color.replace('#','');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: height+10 }}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.22" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      {[0,0.25,0.5,0.75,1].map((p,i) => <g key={i}><line x1={pad.l} x2={w-pad.r} y1={ys(p*mx)} y2={ys(p*mx)} stroke={grid} /><text x="2" y={ys(p*mx)+3} fontSize="9" fill={txt} fontFamily="JetBrains Mono">{Math.round(p*mx)}</text></g>)}
      {target && <line x1={pad.l} x2={w-pad.r} y1={ys(target)} y2={ys(target)} stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="5 3" />}
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={path} stroke={color} strokeWidth="2.5" fill="none" />
      {data.map((v,i)=><circle key={i} cx={xs(i)} cy={ys(v)} r={i===data.length-1?4:0} fill={color} />)}
      {labels && labels.map((l,i)=> (i%Math.ceil(labels.length/12)===0||i===labels.length-1) && <text key={i} x={xs(i)} y={h-8} fontSize="9" fill={txt} textAnchor="middle">{l}</text>)}
    </svg>
  );
}

// Column chart with target threshold
function ColumnChart({ data, labels, target, color='#1F4E79', max, height=180, highlightLast=true }) {
  const w = 520, h = height;
  const pad = { l:34, r:12, t:14, b:24 };
  const mx = max || Math.max(...data, target||0)*1.2;
  const bw = (w-pad.l-pad.r)/data.length * 0.6;
  const gap = (w-pad.l-pad.r)/data.length;
  const ys = v => h - pad.b - (v/mx)*(h-pad.t-pad.b);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: height+10 }}>
      {[0,0.5,1].map((p,i) => <g key={i}><line x1={pad.l} x2={w-pad.r} y1={ys(p*mx)} y2={ys(p*mx)} stroke="#E6E8EC" /><text x="2" y={ys(p*mx)+3} fontSize="9" fill="#8b94a2" fontFamily="JetBrains Mono">{Math.round(p*mx)}</text></g>)}
      {target && <line x1={pad.l} x2={w-pad.r} y1={ys(target)} y2={ys(target)} stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="5 3" />}
      {data.map((v,i) => { const x = pad.l + i*gap + (gap-bw)/2; const over = target && v>target; return (
        <g key={i}><rect x={x} y={ys(v)} width={bw} height={h-pad.b-ys(v)} rx="3" fill={over?'#E24B4A':color} opacity={highlightLast&&i===data.length-1?1:0.82} />
        {labels && <text x={x+bw/2} y={h-8} fontSize="9" fill="#8b94a2" textAnchor="middle">{labels[i]}</text>}</g>
      ); })}
    </svg>
  );
}

// Multi-series grouped bars
function GroupBars({ series, labels, height=180 }) {
  const w = 520, h = height, pad={l:34,r:12,t:14,b:24};
  const max = Math.max(...series.flatMap(s=>s.data))*1.15;
  const groups = labels.length;
  const gw = (w-pad.l-pad.r)/groups;
  const bw = gw*0.7/series.length;
  const ys = v => h-pad.b-(v/max)*(h-pad.t-pad.b);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: height+10 }}>
      {[0,0.5,1].map((p,i)=><line key={i} x1={pad.l} x2={w-pad.r} y1={ys(p*max)} y2={ys(p*max)} stroke="#E6E8EC" />)}
      {labels.map((l,gi) => (<g key={gi}>
        {series.map((s,si) => { const x = pad.l + gi*gw + gw*0.15 + si*bw; return <rect key={si} x={x} y={ys(s.data[gi])} width={bw-2} height={h-pad.b-ys(s.data[gi])} rx="2" fill={s.color} />; })}
        <text x={pad.l+gi*gw+gw/2} y={h-8} fontSize="9" fill="#8b94a2" textAnchor="middle">{l}</text>
      </g>))}
    </svg>
  );
}

// Donut chart
function Donut({ values, total, totalLabel='TOTAL', size=160, thickness=16 }) {
  const sum = values.reduce((a,b)=>a+b.v,0); let acc=0; const r=50;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="50" r={r} fill="none" stroke="#F1F3F6" strokeWidth={thickness/10} />
      {values.map((seg,i) => { const frac=seg.v/sum; const a0=acc*2*Math.PI-Math.PI/2; const a1=(acc+frac)*2*Math.PI-Math.PI/2; const x0=50+r*Math.cos(a0),y0=50+r*Math.sin(a0); const x1=50+r*Math.cos(a1),y1=50+r*Math.sin(a1); const large=frac>0.5?1:0; acc+=frac; return <path key={i} d={`M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`} fill="none" stroke={seg.c} strokeWidth={thickness/10} strokeLinecap="butt" />; })}
      <text x="50" y="48" textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="JetBrains Mono">{total}</text>
      <text x="50" y="60" textAnchor="middle" fontSize="5.5" fill="#8b94a2" fontWeight="700">{totalLabel}</text>
    </svg>
  );
}

// Radial gauge (OEE/production)
function Gauge({ value, max=100, label, unit='%', size=160, tone }) {
  const pct = Math.min(1, value/max);
  const t = tone || (pct>=0.85?'success':pct>=0.6?'warning':'danger');
  const color = { success:'#1D9E75', warning:'#EF9F27', danger:'#E24B4A' }[t];
  const r=44, circ=2*Math.PI*r, arc=0.75, off=circ*(1-pct*arc);
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="#E6E8EC" strokeWidth="11" strokeDasharray={`${circ*arc} ${circ}`} transform="rotate(135 60 60)" strokeLinecap="round" />
      <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="11" strokeDasharray={`${circ*arc} ${circ}`} strokeDashoffset={off} transform="rotate(135 60 60)" strokeLinecap="round" />
      <text x="60" y="56" textAnchor="middle" fontSize="26" fontWeight="800" fontFamily="JetBrains Mono" fill={color}>{value}<tspan fontSize="13">{unit}</tspan></text>
      {label && <text x="60" y="74" textAnchor="middle" fontSize="9" fill="#8b94a2" fontWeight="700">{label}</text>}
    </svg>
  );
}

// Horizontal bars
function HBars({ items, max, height }) {
  return (
    <div className="space-y-2.5">
      {items.map((it,i) => { const pct=(it.v/(max||Math.max(...items.map(x=>x.v))))*100; return (
        <div key={i}>
          <div className="flex items-center justify-between text-[11.5px] mb-1"><span className="font-bold">{it.lbl}</span><span className="mono">{it.fmt||it.v}</span></div>
          <div className="h-2.5 rounded-full bg-elev overflow-hidden"><div className="h-full rounded-full" style={{ width:`${pct}%`, background: it.color||'#1F4E79' }} /></div>
        </div>
      ); })}
    </div>
  );
}

// Pareto (bars + cumulative line)
function Pareto({ data, height=200 }) {
  const w=520, h=height, pad={l:34,r:34,t:14,b:30};
  const total = data.reduce((a,b)=>a+b.v,0);
  const max = Math.max(...data.map(d=>d.v))*1.15;
  const gw = (w-pad.l-pad.r)/data.length;
  const bw = gw*0.6;
  const ys = v => h-pad.b-(v/max)*(h-pad.t-pad.b);
  const ysCum = p => h-pad.b-(p/100)*(h-pad.t-pad.b);
  let cum=0; const cumPts = data.map(d => { cum+=d.v; return cum/total*100; });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: height+10 }}>
      {[0,0.5,1].map((p,i)=><line key={i} x1={pad.l} x2={w-pad.r} y1={ys(p*max)} y2={ys(p*max)} stroke="#E6E8EC" />)}
      {data.map((d,i) => { const x=pad.l+i*gw+(gw-bw)/2; return (<g key={i}><rect x={x} y={ys(d.v)} width={bw} height={h-pad.b-ys(d.v)} rx="2" fill={d.color||'#E24B4A'} opacity="0.85" /><text x={x+bw/2} y={h-8} fontSize="8.5" fill="#8b94a2" textAnchor="middle">{d.lbl}</text></g>); })}
      <path d={cumPts.map((p,i)=>`${i?'L':'M'}${pad.l+i*gw+gw/2} ${ysCum(p)}`).join(' ')} stroke="#1F4E79" strokeWidth="2" fill="none" />
      {cumPts.map((p,i)=><circle key={i} cx={pad.l+i*gw+gw/2} cy={ysCum(p)} r="2.5" fill="#1F4E79" />)}
      {[0,50,100].map((p,i)=><text key={i} x={w-pad.r+4} y={ysCum(p)+3} fontSize="8.5" fill="#1F4E79" fontFamily="JetBrains Mono">{p}%</text>)}
    </svg>
  );
}

// Heatmap grid (rows x cols)
function Heatmap({ rows, cols, value, colorBase='31,78,121', cellNote, height }) {
  return (
    <div>
      <div className="grid gap-0.5" style={{ gridTemplateColumns:`60px repeat(${cols.length}, 1fr)` }}>
        <div />
        {cols.map((c,i) => <div key={i} className="text-center text-[8.5px] font-bold text-subtle pb-1">{c}</div>)}
        {rows.map((r,ri) => (
          <React.Fragment key={ri}>
            <div className="text-[10px] font-bold text-subtle flex items-center pr-1 truncate">{r}</div>
            {cols.map((c,ci) => { const v=value(ri,ci); return (
              <div key={ci} className="aspect-square rounded-[3px] relative group" style={{ background:`rgba(${colorBase},${v.toFixed(2)})` }}>
                {cellNote && v>0.75 && <span className="absolute inset-0 flex items-center justify-center text-[7px] font-extrabold text-white">{cellNote(ri,ci)}</span>}
              </div>
            ); })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// AI insight item
function AIInsight({ tone='brand', icon, title, body, cf, action }) {
  const tm = { brand:'border-brand-200 bg-brand-50/40', success:'border-success-500/25 bg-success-50/50', warning:'border-warning-500/30 bg-warning-50/50', danger:'border-danger-500/30 bg-danger-50/50' };
  const im = { brand:'bg-brand-500', success:'bg-success-500', warning:'bg-warning-500', danger:'bg-danger-500' };
  return (
    <div className={`rounded-xl border p-3.5 ${tm[tone]}`}>
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg ${im[tone]} text-white flex items-center justify-center shrink-0`}><Icon name={icon} size={15} /></div>
        <div className="text-[12.5px] font-extrabold tracking-tight flex-1 leading-tight">{title}</div>
        {cf && <span className="text-[9px] mono font-bold text-muted bg-white px-1.5 py-0.5 rounded border border-token shrink-0">{cf}</span>}
      </div>
      <div className="mt-2 text-[11.5px] leading-relaxed text-[color:var(--text)]/85">{body}</div>
      {action && <button className="mt-2 text-[11.5px] font-bold text-brand-700 inline-flex items-center gap-1 hover:underline">{action} →</button>}
    </div>
  );
}

// Chart card wrapper
function ChartCard({ title, sub, right, children, legend }) {
  return (
    <div className="surface rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div><div className="text-[13px] font-bold tracking-tight">{title}</div>{sub && <div className="text-[10.5px] text-subtle mt-0.5">{sub}</div>}</div>
        {right}
      </div>
      {children}
      {legend && <div className="mt-3 flex items-center gap-3 flex-wrap text-[10.5px]">{legend.map(l => <span key={l.label} className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background:l.color }} /> {l.label}</span>)}</div>}
    </div>
  );
}

// =============== Analytics sidebar ===============
function AnalyticsSidebar({ current='executive' }) {
  const items = [
    { id:'executive',  name:'Executive',     icon:'crown' },
    { id:'operational',name:'Operational',   icon:'activity' },
    { id:'hr',          name:'HR',             icon:'users' },
    { id:'hse',         name:'HSE',            icon:'shield-alert' },
    { id:'fac',         name:'Facility',       icon:'building-2' },
    { id:'command',     name:'Command Center', icon:'radar' },
    { id:'builder',     name:'Report Builder', icon:'layout-grid' },
    { id:'explorer',    name:'Drill-down',     icon:'git-fork' },
  ];
  return (
    <aside className="w-56 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 px-4 border-b border-token flex items-center gap-2.5">
        <BrandMark size={30} />
        <div className="leading-tight"><div className="text-[12px] font-bold tracking-tight">Nusaraya</div><div className="text-[9px] uppercase tracking-wider text-brand-700 font-bold">Analytics Hub</div></div>
      </div>
      <div className="px-3 py-4 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Dashboards</div>
        <nav className="space-y-0.5">
          {items.map(i => <a key={i.id} className={`flex items-center gap-2.5 px-3 h-9 rounded-md text-[12.5px] font-medium transition-colors ${i.id===current?'bg-brand-50 text-brand-700':'text-muted hover:bg-elev'}`}><Icon name={i.icon} size={15} /><span>{i.name}</span></a>)}
        </nav>
      </div>
      <div className="p-3 border-t border-token">
        <div className="rounded-lg bg-elev p-3 flex items-center gap-2"><Icon name="database" size={14} className="text-brand-500" /><div className="text-[10px] text-muted leading-tight">8 modules · SAP · FMS<br/>Toledo · Azure Lake</div></div>
      </div>
    </aside>
  );
}

function AnalyticsTopBar({ title, sub, period='month', refresh='15s' }) {
  return (
    <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
      <div><div className="text-[10px] text-subtle uppercase tracking-wider">{sub}</div><div className="text-[14px] font-bold tracking-tight">{title}</div></div>
      <div className="flex-1" />
      <PeriodSelector active={period} />
      <div className="inline-flex items-center gap-1.5 px-2.5 h-9 rounded-md bg-elev text-[11px] font-bold text-muted"><span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-500 pulse-dot text-success-500" /> Live · {refresh}</div>
      <Btn variant="secondary" size="sm" icon="download">Export PDF</Btn>
    </header>
  );
}

window.PhoneFrame = PhoneFrame;
window.BrowserChrome = BrowserChrome;
window.BrandMark = BrandMark;
window.StatusPill = StatusPill;
window.Btn = Btn;
window.Avatar = Avatar;
window.FilterChip = FilterChip;
window.PeriodSelector = PeriodSelector;
window.HeroKPI = HeroKPI;
window.KPICard = KPICard;
window.LineChart = LineChart;
window.ColumnChart = ColumnChart;
window.GroupBars = GroupBars;
window.Donut = Donut;
window.Gauge = Gauge;
window.HBars = HBars;
window.Pareto = Pareto;
window.Heatmap = Heatmap;
window.AIInsight = AIInsight;
window.ChartCard = ChartCard;
window.AnalyticsSidebar = AnalyticsSidebar;
window.AnalyticsTopBar = AnalyticsTopBar;
