// Slides app — wraps Safety & Emergency Module screens as 1920×1080 slides.

const slideMeta = [
  { id:'cover', kind:'cover' },

  { id:'mobile-overview', kind:'overview', tab:'Mobile · SOS + BBS', sub:'8 screens · safety-critical',
    color:{ bg:'#FBE8E8', accent:'#BE3A39' },
    features:[
      { ic:'shield-alert',  t:'Fool-proof activate', d:'SOS button selalu visible. Hold 3 detik + progress ring untuk activate — mencegah trigger tidak sengaja.' },
      { ic:'radio-tower',   t:'Multi-channel',       d:'Push + SMS backup + lokasi GPS dikirim parallel untuk redundancy di area sinyal lemah.' },
      { ic:'eye',           t:'State transparency',  d:'User selalu tahu status: sent → ACK → en-route → resolved. Plus follow-up form medical.' },
    ]},

  { id:'C1', kind:'phone', title:'Floating SOS',     comp:'Screen_FloatingSOS',
    caption:'SOS button render sebagai overlay di setiap screen. Pulse subtle + breathing untuk attention tanpa anxiety. Tap untuk masuk hold-screen.',
    spec:[
      { lbl:'Visibility',   val:'Selalu visible · overlay' },
      { lbl:'Animasi',      val:'Pulse + breathing' },
      { lbl:'Hit target',   val:'72px (gloved)' },
      { lbl:'Context',      val:'Home + 4 modul utama' },
    ]},
  { id:'C2', kind:'phone', title:'Hold to Activate', comp:'Screen_SOSHold', dark:true,
    holdProgress:66, holding:true,
    caption:'Tahan tombol merah besar untuk lihat countdown 3→2→1 dan progress ring. Lepas untuk batal — design pattern fool-proof.',
    spec:[
      { lbl:'Duration',     val:'3 detik hold' },
      { lbl:'Feedback',     val:'Progress ring + countdown' },
      { lbl:'Cancel',       val:'Lepas untuk batal' },
      { lbl:'Haptic',       val:'Vibration tiap detik' },
    ]},
  { id:'C3', kind:'phone', title:'Sending',          comp:'Screen_SOSSending', dark:true,
    caption:'Checklist transparan apa yang terkirim: GPS, push CC, push SO, SMS backup. Battery & network indicator visible.',
    spec:[
      { lbl:'Channel',      val:'Push · SMS backup · GPS' },
      { lbl:'Target',       val:'CC + 2 SO terdekat' },
      { lbl:'Network',      val:'Status visible' },
      { lbl:'Fallback',     val:'SMS jika data fail' },
    ]},
  { id:'C4', kind:'phone', title:'SOS Active',       comp:'Screen_SOSActive', dark:true,
    caption:'Bottom bar merah persistent, "Batalkan" require konfirmasi 2x. Timer count-up real-time. Chat dengan responder live.',
    spec:[
      { lbl:'Timer',        val:'Count-up real-time' },
      { lbl:'Chat',         val:'Live · responder' },
      { lbl:'Cancel',       val:'2-step confirmation' },
      { lbl:'Map',          val:'Responder ETA live' },
    ]},
  { id:'C5', kind:'phone', title:'SOS Resolved',     comp:'Screen_SOSResolved', dark:true,
    caption:'Background hijau. Summary respons time + responder note. Form follow-up (sehat? medis lanjutan?) sebelum close.',
    spec:[
      { lbl:'Response',     val:'Time-to-ACK + total' },
      { lbl:'Note',         val:'Responder + tindakan' },
      { lbl:'Follow-up',    val:'Medical check form' },
      { lbl:'Audit',        val:'Tersimpan permanen' },
    ]},
  { id:'C6', kind:'phone', title:'Incident Report',  comp:'Screen_IncidentReport',
    caption:'Form non-emergency lengkap. 7 kategori (Near miss → LTI), severity scale color-coded, foto evidence, korban, saksi.',
    spec:[
      { lbl:'Kategori',     val:'Near miss · FAI · MTC · LTI' },
      { lbl:'Severity',     val:'1-5 color-coded' },
      { lbl:'Evidence',     val:'Multi-photo + lokasi' },
      { lbl:'Saksi',        val:'Tag rekan kerja' },
    ]},
  { id:'C7', kind:'phone', title:'BBS Observation',  comp:'Screen_BBSObservation',
    caption:'Behavior Based Safety. Unsafe Cond / Act / Positive recognition. Foto wajib. Bisa anonim untuk encourage reporting tanpa fear of retaliation.',
    spec:[
      { lbl:'Tipe',         val:'Cond · Act · Positive' },
      { lbl:'Foto',         val:'Wajib · GPS-tagged' },
      { lbl:'Anonymous',    val:'Toggle opsional' },
      { lbl:'Reward',       val:'Positive recog. poin' },
    ]},
  { id:'C8', kind:'phone', title:'Safety History',   comp:'Screen_SafetyHistory',
    caption:'3-tab dengan counter: SOS, Insiden, Observasi. Stats Closed / In-progress / Open di atas. Tap card untuk detail.',
    spec:[
      { lbl:'Tab',          val:'3 kategori · counter' },
      { lbl:'Filter',       val:'Status · tanggal' },
      { lbl:'Stats',        val:'Closed · WIP · Open' },
      { lbl:'Tap row',      val:'Detail + timeline' },
    ]},

  { id:'cc-overview', kind:'overview', tab:'Command Center', sub:'Live ops · dark theme',
    color:{ bg:'#0A0F18', accent:'#F39800', dark:true },
    features:[
      { ic:'map',           t:'Live site map',       d:'Topographic SVG dengan pin SOS / Alert / PTW / Shuttle / Equipment. Filter toggle per kategori.' },
      { ic:'alert-octagon', t:'SOS stage tracking',  d:'Stage indicator real-time: Sent → ACK → En-route → Done. Elapsed timer counting up per case.' },
      { ic:'activity',      t:'Event stream',        d:'Live activity feed semua modul: SOS, PTW, Shuttle, HR. Color-coded by event type.' },
    ]},
  { id:'W6', kind:'cc', title:'Command Center Live · Site Map + SOS Drawer', comp:'CommandCenter_Demo',
    caption:'Mission-control style. Map kiri, panel SOS kanan, KPI strip atas, activity feed bawah. Klik SOS card untuk buka detail drawer (W7).' },

  { id:'incident-overview', kind:'overview', tab:'Incident Dashboard', sub:'SO & HR · analytics',
    color:{ bg:'#EAF2FE', accent:'#1670C4' },
    features:[
      { ic:'trending-down', t:'Trend chart',         d:'Line chart 12 bulan dengan target line ≤10 incident/bulan. Highlight bulan terakhir prominent.' },
      { ic:'bar-chart-2',   t:'Pareto analysis',     d:'Bar + cumulative line. Reveals 80/20 — kategori mana yang paling worth diatasi dulu.' },
      { ic:'grid-3x3',      t:'Location heatmap',    d:'Lokasi × bulan matrix. Color intensity = jumlah incident. Spot hotspots geografis & temporal.' },
    ]},
  { id:'W8', kind:'web', title:'Incident Analytics & Investigation', comp:'IncidentDashboard',
    url:'https://app.nusaraya.id/safety/incidents',
    caption:'Untuk Safety Officer dan HR. KPI safety lengkap, trend 12 bulan, Pareto by category, heatmap lokasi×bulan, table investigasi.' },

  { id:'closing', kind:'closing' },
];

// CommandCenter wrapper — pre-focused on a SOS to show drawer
function CommandCenter_Demo() {
  return <CommandCenter focusedSosId={'SOS-04219'} onSOSClick={() => {}} onCloseDrawer={() => {}} />;
}
window.CommandCenter_Demo = CommandCenter_Demo;

// ============================== Slide shells ==============================

function SlideShell({ children, label, idx, total, darkFooter }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white relative flex" data-screen-label={label}>
      {children}
      <div className={`absolute bottom-8 left-12 right-12 flex items-end justify-between text-[14px] pointer-events-none ${darkFooter?'text-white/70':'text-subtle'}`}>
        <div className="flex items-center gap-3">
          <BrandMark size={28} />
          <div>
            <div className={`font-bold tracking-tight ${darkFooter?'text-white':'text-[color:var(--text)]'}`}>SuperApps Nusaraya</div>
            <div className="text-[12px]">Safety &amp; Emergency · Mission-critical</div>
          </div>
        </div>
        <div className="mono text-[12px]">{String(idx).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
      </div>
    </section>
  );
}

function SlideCover({ idx, total }) {
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} Cover`} idx={idx} total={total} darkFooter>
      <div className="relative flex-1 overflow-hidden"
           style={{ background:`
            radial-gradient(120% 80% at 20% 10%, rgba(226,75,74,0.45) 0%, transparent 55%),
            radial-gradient(140% 80% at 90% 100%, rgba(243,152,0,0.20) 0%, transparent 60%),
            linear-gradient(180deg, #0A2E54 0%, #0C3C6E 38%, #1670C4 62%, #3D85E0 96%)`}}>
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-25"
             style={{ background:'radial-gradient(circle, #E24B4A 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full opacity-15"
             style={{ background:'radial-gradient(circle, #F39800 0%, transparent 70%)' }} />

        <div className="absolute inset-0 flex flex-col justify-center px-32 text-white">
          <div className="inline-flex items-center gap-3 mb-10">
            <BrandMark size={88} />
            <div className="leading-tight">
              <div className="text-[16px] font-semibold tracking-[0.18em] uppercase text-white/70">SuperApps Nusaraya</div>
              <div className="text-[52px] font-extrabold tracking-tight">Module · Safety &amp; Emergency</div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded bg-danger-500 text-white text-[14px] font-extrabold uppercase tracking-[0.18em]">Mission-critical</span>
            <span className="text-[24px] font-semibold text-white/70 tracking-wide uppercase" style={{ letterSpacing:'0.14em' }}>PoC review</span>
          </div>
          <h1 className="text-[92px] font-extrabold tracking-tight leading-[0.95] mt-3" style={{ letterSpacing:'-0.025em', textWrap:'balance', maxWidth:1300 }}>
            SOS · Incident<br/>· BBS · Command Center
          </h1>
          <p className="mt-8 text-[24px] text-white/80 max-w-[1200px] leading-relaxed">
            10 screen across 3 channel — mobile untuk pekerja, Command Center untuk operator, dan dashboard analitik untuk Safety Officer &amp; HR.
          </p>

          <div className="mt-14 flex items-center gap-10 text-[14px]">
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Prepared by</div>
              <div className="text-[18px] font-semibold">Product Design · IR Team</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Reviewer</div>
              <div className="text-[18px] font-semibold">HSE · Command Center · IT Sec</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Tanggal</div>
              <div className="text-[18px] font-semibold mono">25 Mei 2026</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function SlideOverview({ idx, total, tab, sub, color, features }) {
  const dark = color.dark;
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${tab}`} idx={idx} total={total} darkFooter={dark}>
      <div className="flex-1 flex flex-col justify-center px-32" style={{ background: color.bg }}>
        <div className="text-[20px] font-bold uppercase tracking-[0.22em]" style={{ color: color.accent }}>
          Section
        </div>
        <h2 className="text-[112px] font-extrabold tracking-tight leading-none mt-4" style={{ letterSpacing:'-0.03em', color: dark?'#fff':'#0f1115' }}>
          {tab}
        </h2>
        <div className="mt-6 text-[28px] font-semibold" style={{ color: dark?'rgba(255,255,255,0.7)':'#5b6472' }}>{sub}</div>

        <div className="mt-14 grid grid-cols-3 gap-8 max-w-[1500px]">
          {features.map(f => (
            <div key={f.t} className="p-7 rounded-2xl"
                 style={{ background: dark?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.7)',
                          border: dark?'1px solid rgba(255,255,255,0.1)':'1px solid rgba(0,0,0,0.05)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white" style={{ background: color.accent }}>
                <Icon name={f.ic} size={26} />
              </div>
              <div className="text-[24px] font-extrabold tracking-tight" style={{ color: dark?'#fff':'#0f1115' }}>{f.t}</div>
              <div className="text-[17px] mt-2 leading-relaxed" style={{ color: dark?'rgba(255,255,255,0.7)':'#5b6472' }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function SlidePhone({ idx, total, title, comp, dark, caption, spec, screenNum, holdProgress, holding }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total}>
      <div className="flex-1 grid grid-cols-[820px_1fr] bg-elev">
        <div className="relative flex items-center justify-center overflow-hidden" style={{ background:'linear-gradient(160deg, #FBE8E8 0%, #F4C7C6 100%)' }}>
          <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full"
               style={{ background:'radial-gradient(circle, rgba(226,75,74,0.20) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full"
               style={{ background:'radial-gradient(circle, rgba(22,112,196,0.18) 0%, transparent 70%)' }} />
          <div style={{ transform:'scale(1.05)' }}>
            <PhoneFrame label="" sub="" dark={dark}>
              {comp === 'Screen_SOSHold' && <Comp progress={holdProgress} holding={!!holding} onMouseDown={() => {}} onMouseUp={() => {}} />}
              {comp === 'Screen_FloatingSOS' && <Comp onTrigger={() => {}} />}
              {comp !== 'Screen_SOSHold' && comp !== 'Screen_FloatingSOS' && Comp && <Comp />}
            </PhoneFrame>
          </div>
        </div>

        <div className="flex flex-col justify-center px-20">
          <div className="text-[20px] font-bold uppercase tracking-[0.22em] text-danger-600">
            Mobile · {screenNum}
          </div>
          <h2 className="text-[88px] font-extrabold tracking-tight leading-[0.95] mt-4" style={{ letterSpacing:'-0.025em' }}>{title}</h2>
          <p className="mt-8 text-[26px] text-muted leading-relaxed max-w-[760px]" style={{ textWrap:'balance' }}>{caption}</p>

          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-7 max-w-[780px]">
            {spec.map(d => (
              <div key={d.lbl}>
                <div className="text-[14px] font-bold uppercase tracking-[0.16em] text-subtle mb-1">{d.lbl}</div>
                <div className="text-[20px] font-bold leading-snug">{d.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function SlideCC({ idx, total, title, comp, caption }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total} darkFooter>
      <div className="flex-1 flex flex-col px-16 pt-16 pb-28" style={{ background:'#0A0F18', color:'#fff' }}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[18px] font-bold uppercase tracking-[0.22em] text-safety-400">Command Center · Live</div>
            <h2 className="text-[58px] font-extrabold tracking-tight leading-none mt-3" style={{ letterSpacing:'-0.025em' }}>{title}</h2>
          </div>
          <div className="text-[18px] text-white/70 max-w-[820px] text-right leading-relaxed">{caption}</div>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-0">
          {Comp ? <Comp /> : <div className="p-8 text-white/50">component missing</div>}
        </div>
      </div>
    </SlideShell>
  );
}

function SlideWeb({ idx, total, title, comp, url, caption }) {
  const Comp = window[comp];
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} ${title}`} idx={idx} total={total}>
      <div className="flex-1 flex flex-col bg-elev px-16 pt-16 pb-28">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[18px] font-bold uppercase tracking-[0.22em] text-brand-500">Incident Dashboard · Web</div>
            <h2 className="text-[58px] font-extrabold tracking-tight leading-none mt-3" style={{ letterSpacing:'-0.025em' }}>{title}</h2>
          </div>
          <div className="text-[18px] text-muted max-w-[820px] text-right leading-relaxed">{caption}</div>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden border border-token shadow-2xl bg-white flex flex-col min-h-0">
          <div className="h-10 bg-elev border-b border-token flex items-center px-4 gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ED6A5E]" />
              <span className="w-3 h-3 rounded-full bg-[#F5BF4F]" />
              <span className="w-3 h-3 rounded-full bg-[#62C455]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white border border-token rounded-md h-7 px-3 text-[12px] mono text-subtle inline-flex items-center gap-1.5 min-w-[420px] justify-center">
                <Icon name="lock" size={12} /> {url}
              </div>
            </div>
            <div className="w-12" />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            {Comp ? <Comp /> : <div className="p-8 text-subtle">component missing</div>}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function SlideClosing({ idx, total }) {
  return (
    <SlideShell label={`${String(idx).padStart(2,'0')} Q&A`} idx={idx} total={total} darkFooter>
      <div className="relative flex-1 overflow-hidden flex flex-col items-center justify-center text-white px-32"
           style={{ background:`
            radial-gradient(120% 80% at 20% 10%, rgba(226,75,74,0.45) 0%, transparent 55%),
            radial-gradient(140% 80% at 90% 100%, rgba(243,152,0,0.20) 0%, transparent 60%),
            linear-gradient(180deg, #0A2E54 0%, #0C3C6E 38%, #1670C4 62%, #3D85E0 96%)`}}>
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-25"
             style={{ background:'radial-gradient(circle, #E24B4A 0%, transparent 70%)' }} />

        <BrandMark size={120} />
        <div className="mt-12 text-[28px] font-bold uppercase tracking-[0.22em] text-safety-300">Diskusi &amp; Q&amp;A</div>
        <h2 className="mt-6 text-[120px] font-extrabold tracking-tight leading-[0.95] text-center" style={{ letterSpacing:'-0.025em' }}>
          Terima kasih.
        </h2>
        <p className="mt-10 text-[24px] text-white/75 text-center max-w-[1200px] leading-relaxed">
          Validasi business rule dari tim HSE, Command Center, dan IT Security — terutama SLA response, escalation matrix, dan integrasi dengan emergency services external.
        </p>

        <div className="mt-16 flex items-center gap-16 text-[16px]">
          <div className="text-center">
            <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Tabletop drill</div>
            <div className="text-[20px] font-semibold">30 Mei 2026</div>
          </div>
          <div className="w-px h-14 bg-white/20" />
          <div className="text-center">
            <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Sprint kick-off</div>
            <div className="text-[20px] font-semibold mono">02 Juni 2026</div>
          </div>
          <div className="w-px h-14 bg-white/20" />
          <div className="text-center">
            <div className="text-white/60 font-bold uppercase tracking-[0.18em] mb-1.5">Channel</div>
            <div className="text-[20px] font-semibold">#superapps-safety</div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ============================== App ==============================
function App() {
  React.useEffect(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } });
  });

  const total = slideMeta.length;
  let mob=0;
  slideMeta.forEach(s => { if (s.kind === 'phone') { mob++; s.__num = `${mob}/8`; } });

  return (
    <deck-stage>
      {slideMeta.map((s, i) => {
        const idx = i + 1;
        const props = { idx, total };
        if (s.kind === 'cover')    return <SlideCover    key={s.id} {...props} />;
        if (s.kind === 'overview') return <SlideOverview key={s.id} {...props} tab={s.tab} sub={s.sub} color={s.color} features={s.features} />;
        if (s.kind === 'phone')    return <SlidePhone    key={s.id} {...props} title={s.title} comp={s.comp} dark={s.dark} caption={s.caption} spec={s.spec} screenNum={s.__num} holdProgress={s.holdProgress} holding={s.holding} />;
        if (s.kind === 'cc')       return <SlideCC       key={s.id} {...props} title={s.title} comp={s.comp} caption={s.caption} />;
        if (s.kind === 'web')      return <SlideWeb      key={s.id} {...props} title={s.title} comp={s.comp} url={s.url} caption={s.caption} />;
        if (s.kind === 'closing')  return <SlideClosing  key={s.id} {...props} />;
        return null;
      })}
    </deck-stage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
