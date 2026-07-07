// Accommodation — main app shell.

const TABS = [
  { id:'worker', label:'Worker Mobile', icon:'smartphone', sub:'A1-A6 · 6 screens' },
  { id:'fac',    label:'FAC Web',       icon:'sliders',    sub:'W1-W5 · admin' },
];

function TopBar({ active, setActive, showAnno, setShowAnno }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-token">
      <div className="px-4 md:px-8 h-14 flex items-center gap-4">
        <a href="Design System.html" className="flex items-center gap-2.5 group">
          <BrandMark size={30} />
          <div className="leading-tight"><div className="text-[13px] font-bold tracking-tight">SuperApps Nusaraya</div><div className="text-[10px] text-subtle">Accommodation · room · housekeeping · meeting · vehicle</div></div>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-1 text-[12px]">
          <a href="Design System.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="palette" size={13} /> Design</a>
          <a href="Catering Module.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="utensils" size={13} /> Catering</a>
          <a href="Visitor Management Module.html" className="px-3 h-9 rounded-md hover:bg-elev inline-flex items-center gap-1.5 text-muted hover:text-[color:var(--text)]"><Icon name="id-card" size={13} /> Visitor</a>
          <span className="px-3 h-9 rounded-md inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 font-semibold"><Icon name="bed-double" size={13} /> Accommodation</span>
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

function WorkerTab({ showAnno }) {
  const screens = [
    { id:'A1', label:'Accommodation Home', sub:'quick action + current booking', anno:{ lab:'Home', text:'Current booking card dengan QR akses kamar, quick action grid 4 (room/meeting/vehicle/maintenance), stats nights bulan ini.' }, render:() => <A1_Home /> },
    { id:'A2', label:'Book Room', sub:'visual floor plan', anno:{ lab:'Room booking', text:'Camp + tanggal, tipe (dormitory/private/share), building+floor selector, floor plan visual top-down dengan available highlighted, gender separation otomatis.' }, render:() => <A2_BookRoom /> },
    { id:'A3', label:'My Bookings', sub:'QR + roommate', anno:{ lab:'Bookings', text:'Active dengan QR akses kamar + extend/cancel/roommate change. Upcoming dormitory dengan roommate preview. Cancellation 6 jam free.' }, render:() => <A3_MyBookings /> },
    { id:'A4', label:'Meeting Room', sub:'15-min slot + conflict', anno:{ lab:'Meeting', text:'Room list dengan capacity + equipment tags. Time slot picker 15-min, conflict warning (overlap rejected). Attendees multi-select, recurrence, auto-invite.' }, render:() => <A4_MeetingRoom /> },
    { id:'A5', label:'Vehicle Booking', sub:'pool + SIM validation', anno:{ lab:'Vehicle internal', text:'Pool list (Hilux/Fortuner/motor). SIM + defensive driving validation untuk self-drive. Max 8 jam. QR key dispenser.' }, render:() => <A5_VehicleBooking /> },
    { id:'A6', label:'Housekeeping Req', sub:'kategori + SAP PM', anno:{ lab:'Maintenance', text:'Kategori kebersihan/perbaikan/complaint, sub-detail, lokasi auto-detect dari booking, foto. Auto-WO SAP PM cross-module.' }, render:() => <A6_Housekeeping /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px]">
      <SectionHeader eyebrow="Tab 1 — Worker Mobile" title="Worker accommodation self-service"
        description="6 screen untuk worker: home dengan booking aktif, book room dengan floor plan visual top-down, my bookings dengan QR akses, meeting room dengan slot 15-menit, vehicle booking internal dengan validasi SIM, dan housekeeping request." />
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {screens.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#scr-${s.id}`} className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-token bg-white text-[11px] font-semibold whitespace-nowrap hover:bg-elev hover:border-brand-200"><span className="mono text-subtle">{s.id}</span>{s.label}</a>
            {i < screens.length-1 && <Icon name="chevron-right" size={12} className="text-subtle shrink-0" />}
          </React.Fragment>
        ))}
      </div>
      <div className="grid gap-x-[260px] gap-y-14" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(390px, max-content))' }}>
        {screens.map(s => (
          <div key={s.id} id={`scr-${s.id}`} className="scroll-mt-32">
            <PhoneFrame label={`${s.id} — ${s.label}`} sub={s.sub} anno={showAnno?s.anno:null}>{s.render()}</PhoneFrame>
          </div>
        ))}
      </div>
    </div>
  );
}

function FACTab({ showAnno }) {
  const screens = [
    { id:'W1', label:'Accommodation Dashboard', anno:'KPI bed/occupancy/housekeeping/maintenance. Occupancy heatmap 30 hari per camp. Per camp breakdown + alerts (overbooking, OOS, late check-in grace).', render:() => <W1_Dashboard /> },
    { id:'W2', label:'Room Allocation Master', anno:'Floor plan visual per building. Tap room → occupant detail. Bulk allocation shift change, VIP override, conflict detection (gender + seniority).', render:() => <W2_Allocation /> },
    { id:'W3', label:'Housekeeping Schedule', anno:'Daily schedule per building + crew assignment. Status tracking real-time (dirty→cleaning→clean→inspected). Crew progress, issue escalation → SAP PM.', render:() => <W3_Housekeeping /> },
    { id:'W4', label:'Meeting Room Manager', anno:'Gantt timeline all rooms, booking density. Equipment availability matrix. Maintenance schedule (room out of service).', render:() => <W4_MeetingManager /> },
    { id:'W5', label:'Vehicle Pool Management', anno:'Vehicle availability + driver assignment. Fuel + maintenance tracking. STNK/KIR status flag. Pre/post inspection checklist.', render:() => <W5_VehiclePool /> },
  ];
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1700px]">
      <SectionHeader eyebrow="Tab 2 — FAC Web · Admin" title="Facility accommodation management"
        description="5 screen untuk FAC admin: dashboard dengan occupancy heatmap, room allocation master dengan floor plan, housekeeping schedule real-time, meeting room manager dengan Gantt timeline, dan vehicle pool management." />
      <div className="space-y-10">
        {screens.map(s => (
          <div key={s.id}>
            <div className="mb-3 flex items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-subtle mono">{s.id}</span><h3 className="text-[15px] font-bold tracking-tight">{s.label}</h3></div>
            <BrowserChrome url={`https://app.nusaraya.id/accommodation/${s.id.toLowerCase()}`} height={820}>{s.render()}</BrowserChrome>
            {showAnno && <div className="mt-3 max-w-3xl rounded-lg bg-brand-700 text-white p-3 text-[12px] flex items-start gap-2"><Icon name="info" size={14} className="mt-0.5 shrink-0" /><div>{s.anno}</div></div>}
          </div>
        ))}
      </div>

      {/* Edge cases */}
      <div className="mt-12 surface rounded-xl p-6 border-l-4 border-l-safety-500 max-w-5xl">
        <div className="flex items-start gap-3">
          <Icon name="git-branch" size={22} className="text-safety-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[15px] font-extrabold tracking-tight">Edge cases &amp; cross-module</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-[12px]">
              {[
                ['Overbooking','Waitlist handling di W1 dashboard alert — auto-queue saat over kapasitas.'],
                ['Last-minute cancellation','Auto-reassign room ke waitlist berikutnya, notif worker.'],
                ['Late check-in','Auto-extend grace period +2 jam untuk shift malam delay (W1).'],
                ['VIP override','Manager bisa override allocation di W2 untuk visitor/tamu penting.'],
                ['Maintenance OOS','Room auto-excluded dari allocation pool (W2 + W4 meeting).'],
                ['Gender separation','Mandatory dormitory — otomatis filter building sesuai profil.'],
                ['Roster-based default','Allocation otomatis berdasarkan roster shift worker.'],
                ['SAP PM integration','Housekeeping issue + maintenance auto-create WO di SAP PM.'],
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

function App() {
  const [active, setActive] = React.useState(() => {
    const h = (window.location.hash || '').replace('#','');
    return ['worker','fac'].includes(h) ? h : 'worker';
  });
  const [showAnno, setShowAnno] = React.useState(true);

  React.useEffect(() => { if (!window.location.hash.startsWith('#scr-')) window.history.replaceState(null, '', `#${active}`); }, [active]);
  React.useEffect(() => { if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } }); });

  return (
    <div className="min-h-screen">
      <TopBar active={active} setActive={setActive} showAnno={showAnno} setShowAnno={setShowAnno} />
      {active === 'worker' && <WorkerTab showAnno={showAnno} />}
      {active === 'fac'    && <FACTab    showAnno={showAnno} />}
      <footer className="px-4 md:px-8 py-10 text-[11px] text-subtle border-t border-token mt-6">
        <div className="max-w-[1700px] flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>SuperApps Nusaraya · Accommodation · room booking · housekeeping · meeting room · vehicle pool</div>
          <div className="mono">© 2026 PT Nusaraya Mining</div>
          <div className="ml-auto">Catering &amp; Visitor di modul terpisah</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
