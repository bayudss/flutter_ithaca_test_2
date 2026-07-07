// Transportation — main app shell.

const TABS = [
  { id:'passenger', label:'Passenger Mobile', icon:'smartphone', sub:'T1-T8 · 8 screens' },
  { id:'driver',    label:'Driver Mobile',    icon:'steering-wheel', sub:'D1-D4 · manifest + fatigue' },
  { id:'fac',       label:'FAC Web',          icon:'sliders',    sub:'W1-W5 · dispatch' },
  { id:'liveops',   label:'Live Ops',         icon:'radar',      sub:'W6-W7 · real-time' },
];

function TopBar({ active, setActive, showAnno, setShowAnno }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight"><div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div><div className="text-[10px] text-subtle">Transportation · shuttle + GPS tracking</div></div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design</a>
          <a href="PJA Module.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="clipboard-check" size={13} /> PJA</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 font-semibold"><Icon name="bus" size={13} /> Transport</span>
        </nav>
        <button onClick={() => setShowAnno(s => !s)}
          className={`inline-flex items-center gap-1.5 px-2.5 h-8 rounded-md border text-[11.5px] font-bold transition-colors ${showAnno?'bg-brand-500 border-brand-500 text-white':'bg-white border-token text-muted hover:border-brand-300'}`}>
          <Icon name={showAnno?'eye':'eye-off'} size={13} />{showAnno?'Annotations on':'Annotations off'}
        </button>
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-elev text-[11px] mono text-muted"><span className="w-1.5 h-1.5 rounded-full bg-success-500" /> v1.0</div>
      </div>
      <nav className="px-4 md:px-8 flex items-end gap-1 border-t border-token bg-white -mt-px overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`relative flex items-center gap-2 px-3 h-12 text-[13px] font-semibold transition-colors whitespace-nowrap ${active === t.id ? 'tab-active' : 'text-muted hover:text-[color:var(--text)]'}`}>
            <Icon name={t.icon} size={15} /><span>{t.label}</span><span className="hidden lg:inline text-[10px] font-normal text-subtle ml-1">· {t.sub}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-6 md:mb-8">
      {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500 mb-1.5">{eyebrow}</div>}
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ letterSpacing:'-0.02em' }}>{title}</h2>
      {description && <p className="mt-1.5 text-[14px] text-muted max-w-3xl">{description}</p>}
    </div>
  );
}

function PhoneStack({ screens, showAnno }) {
  return (
    <>
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {screens.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#scr-${s.id}`} className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-token bg-white text-[11px] font-semibold whitespace-nowrap hover:bg-elev hover:border-brand-200">
              <span className="mono text-subtle">{s.id}</span>{s.label}
            </a>
            {i < screens.length-1 && <Icon name="chevron-right" size={12} className="text-subtle shrink-0" />}
          </React.Fragment>
        ))}
      </div>
      <div className="grid gap-x-[260px] gap-y-14" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(390px, max-content))' }}>
        {screens.map(s => (
          <div key={s.id} id={`scr-${s.id}`} className="scroll-mt-32">
            <PhoneFrame label={`${s.id} — ${s.label}`} sub={s.sub} dark={s.dark} anno={showAnno?s.anno:null}>{s.render()}</PhoneFrame>
          </div>
        ))}
      </div>
    </>
  );
}

function WebStack({ screens, showAnno, urlBase }) {
  return (
    <div className="space-y-10">
      {screens.map(s => (
        <div key={s.id}>
          <div className="mb-3 flex items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span><h3 className="text-[15px] font-bold tracking-tight">{s.label}</h3></div>
          <BrowserChrome url={`${urlBase}/${s.id.toLowerCase()}`} height={s.height||840}>{s.render()}</BrowserChrome>
          {showAnno && <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2"><Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>{s.anno}</div></div>}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Passenger tab
// ============================================================
function PassengerTab({ showAnno }) {
  const screens = [
    { id:'T1', label:'Transport Home', sub:'active booking + quick action', anno:{ lab:'Home', text:'Active booking card dengan boarding QR shortcut + live track. Quick action grid 4. Recent trips.' }, render:() => <T1_Home /> },
    { id:'T2', label:'Schedule Today', sub:'time-table per rute', anno:{ lab:'Schedule', text:'Tab hari ini/besok/custom. Per rute: time slot dengan seat availability + FULL/waitlist state.' }, render:() => <T2_Schedule /> },
    { id:'T3', label:'Seat Selection', sub:'bus layout 2-2', anno:{ lab:'Seat map', text:'Visual top-down bus, 2-2 seating. Green available, abu reserved, merah taken. Driver area + pintu.' }, render:() => <T3_SeatSelect /> },
    { id:'T4', label:'Boarding QR', sub:'countdown + wallet', anno:{ lab:'Boarding pass', text:'Full QR, countdown ke keberangkatan, brightness max. Add to calendar/wallet.' }, render:() => <T4_BoardingQR /> },
    { id:'T5', label:'Live Tracking', sub:'shuttle position live', anno:{ lab:'Real-time', text:'Map shuttle + posisi saya + route line. ETA banner "2 menit lagi". Driver card + contact. Cancel policy 6 jam.' }, render:() => <T5_LiveTracking /> },
    { id:'T6', label:'Trip Request', sub:'ad-hoc + approval', anno:{ lab:'Ad-hoc', text:'One-way/round/multi-stop. From→To location master. Vehicle preference. Approval SPV → FAC.' }, render:() => <T6_TripRequest /> },
    { id:'T7', label:'Airport Pickup', sub:'flight auto-pull ETA', anno:{ lab:'Airport', text:'Flight number → auto-pull ETA dari flight API. Passenger list, bagasi, sign service.' }, render:() => <T7_AirportPickup /> },
    { id:'T8', label:'Trip History', sub:'stats + rating', anno:{ lab:'History', text:'List trip selesai dengan rating + receipt. Stats: total trips, km, fuel cross-bill.' }, render:() => <T8_History /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader eyebrow="Tab 1 — Passenger Mobile" title="Employee shuttle experience"
        description="8 screen untuk passenger: home dengan active booking, schedule + seat selection visual, boarding QR, live GPS tracking dengan ETA, trip request ad-hoc, airport pickup dengan flight auto-pull, dan history." />
      <PhoneStack screens={screens} showAnno={showAnno} />
    </div>
  );
}

// ============================================================
// Driver tab
// ============================================================
function DriverTab({ showAnno }) {
  const screens = [
    { id:'D1', label:'Driver Home', sub:'duty toggle + fatigue', anno:{ lab:'Home', text:'On/Off duty toggle, active trip card, fatigue gauge (4.5/10h), upcoming trips.' }, render:() => <D1_Home /> },
    { id:'D2', label:'Trip Execution', sub:'manifest + GPS', anno:{ lab:'Manifest', text:'Sticky header speed. Passenger manifest dengan boarded/reserved/no-show. Map GPS 15s. Speed limit warning. SOS.' }, render:() => <D2_TripExecution /> },
    { id:'D3', label:'Boarding Scanner', sub:'QR scan + count', dark:true, anno:{ lab:'Scanner', text:'QR scan → passenger info + seat match validation. Boarded counter. Start trip — all boarded.' }, render:() => <D3_BoardingScanner /> },
    { id:'D4', label:'Fatigue · Force Rest', sub:'9.5/10h · dispatch locked', anno:{ lab:'Compliance', text:'Gauge mendekati limit 10h. Force rest mode: dispatch locked, rest stop terdekat. Drive log harian.' }, render:() => <D4_Fatigue forceRest={true} /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader eyebrow="Tab 2 — Driver Mobile" title="Driver operations &amp; fatigue management"
        description="4 screen untuk driver: home dengan duty toggle, trip execution dengan manifest + GPS tracking, boarding scanner, dan fatigue management dengan force-rest mode saat mendekati limit 10 jam (compliance driver fatigue)." />
      <PhoneStack screens={screens} showAnno={showAnno} />
    </div>
  );
}

// ============================================================
// FAC Web tab
// ============================================================
function FACTab({ showAnno }) {
  const screens = [
    { id:'W1', label:'Transportation Dashboard', anno:'KPI fleet + live map semua vehicle + upcoming trips + active vehicles table.', render:() => <W1_Dashboard /> },
    { id:'W2', label:'Schedule Management', anno:'Calendar weekly drag-drop reassign. Recurrence + public holiday. Konflik auto-flag.', render:() => <W2_Schedule /> },
    { id:'W3', label:'Vehicle Master', anno:'Table: type, plate, capacity, fuel, driver, service due, insurance, KIR. Doc expiring flag.', render:() => <W3_VehicleMaster /> },
    { id:'W4', label:'Driver Master', anno:'Table: SIM/SIMPER/defensive driving cert, rating, vehicle. Cert expiring flag.', render:() => <W4_DriverMaster /> },
    { id:'W5', label:'Trip Request Inbox', anno:'Pending requests + detail review. Auto-assignment driver+vehicle based on availability + fatigue.', render:() => <W5_RequestInbox /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader eyebrow="Tab 3 — FAC Web · Dispatch" title="Fleet &amp; dispatch management"
        description="5 screen untuk FAC dispatcher: dashboard dengan live fleet map, schedule management drag-drop, vehicle master (KIR/insurance tracking), driver master (SIM/SIMPER), dan trip request inbox dengan auto-assignment." />
      <WebStack screens={screens} showAnno={showAnno} urlBase="https://app.nusaraya.id/transport" />
    </div>
  );
}

// ============================================================
// Live Ops tab
// ============================================================
function LiveOpsTab({ showAnno }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader eyebrow="Tab 4 — Live Ops" title="Real-time operations &amp; analytics"
        description="Mission-control untuk live monitoring semua trip + analytics. Off-route alert (geofence 500m), vehicle stuck, driver fatigue, SOS — dengan quick backup dispatch. Plus analytics utilization, cost, route optimization AI." />
      <div className="space-y-10">
        <div>
          <div className="mb-3 flex items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W6</span><h3 className="text-[15px] font-bold tracking-tight">Live Operations (dark · mission control)</h3></div>
          <BrowserChrome url="https://app.nusaraya.id/transport/liveops" height={860}><W6_LiveOps /></BrowserChrome>
          {showAnno && <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2"><Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>Dark map semua active trip. Alert panel: off-route (geofence 500m), stuck &gt;15min, fatigue. SOS prominent. Backup driver quick dispatch. Event stream live.</div></div>}
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">W7</span><h3 className="text-[15px] font-bold tracking-tight">Analytics</h3></div>
          <BrowserChrome url="https://app.nusaraya.id/transport/analytics" height={840}><W7_Analytics /></BrowserChrome>
          {showAnno && <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2"><Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>Utilization per vehicle, driver performance, cost per trip trend, route optimization AI (merge runs, shift timing, demand-driven slots).</div></div>}
        </div>
      </div>

      {/* Edge cases */}
      <div className="mt-12 surface rounded-xl p-6 border-l-4 border-l-safety-500 max-w-5xl">
        <div className="flex items-start gap-3">
          <Icon name="git-branch" size={22} className="text-safety-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[15px] font-extrabold tracking-tight">Edge cases tercakup</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-[12px]">
              {[
                ['Driver no-show','Backup driver dispatch dari Live Ops W6 (available pool dengan fatigue + jarak).'],
                ['Vehicle breakdown','Off-route/stuck alert → dispatch backup + passenger transfer protokol.'],
                ['Bad weather route change','Geofence alert + dispatcher bisa re-route via schedule W2.'],
                ['Group reservation (30)','Bulk seat di T3 + group slot di schedule W2.'],
                ['Cross-route transfer','Multi-stop trip request T6 + midpoint handling di manifest.'],
                ['Driver fatigue limit','Force-rest mode D4 lock dispatch + W6 fatigue alert + backup.'],
                ['Vehicle doc expired','KIR/insurance flag di W3 vehicle master, auto-block assignment.'],
                ['Flight delay','Airport pickup T7 auto-pull live ETA, dispatcher adjust.'],
              ].map(([t,d]) => (
                <div key={t} className="flex items-start gap-2"><Icon name="check" size={13} className="text-success-500 mt-0.5 shrink-0" /><span><span className="font-bold">{t}:</span> {d}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// App
// ============================================================
function App() {
  const [active, setActive] = React.useState(() => {
    const h = (window.location.hash || '').replace('#','');
    return ['passenger','driver','fac','liveops'].includes(h) ? h : 'passenger';
  });
  const [showAnno, setShowAnno] = React.useState(true);

  React.useEffect(() => { if (!window.location.hash.startsWith('#scr-')) window.history.replaceState(null, '', `#${active}`); }, [active]);
  React.useEffect(() => { if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } }); });

  return (
    <div className="min-h-screen">
      <TopBar active={active} setActive={setActive} showAnno={showAnno} setShowAnno={setShowAnno} />
      {active === 'passenger' && <PassengerTab showAnno={showAnno} />}
      {active === 'driver'    && <DriverTab    showAnno={showAnno} />}
      {active === 'fac'       && <FACTab       showAnno={showAnno} />}
      {active === 'liveops'   && <LiveOpsTab   showAnno={showAnno} />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1700px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · Transportation · shuttle + GPS tracking + driver fatigue management</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">React · Leaflet · real-time WebSocket</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
