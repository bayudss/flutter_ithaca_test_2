// Accommodation — Worker mobile screens A1-A6.

// ============================================================
// A1 — Accommodation Home
// ============================================================
function A1_Home() {
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1"><div className="text-[15px] font-bold tracking-tight">Akomodasi</div><div className="text-[11px] text-subtle">Selamat malam, Budi · Shift Pagi besok</div></div>
          <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center relative"><Icon name="bell" size={20} className="text-subtle" /><span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-danger-500" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Current booking */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl text-white p-4 relative overflow-hidden" style={{ background:'linear-gradient(135deg, #1F4E79 0%, #143452 100%)' }}>
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -right-12 -bottom-16 w-40 h-40 rounded-full bg-safety-500/15" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-white/15 text-[10px] font-bold uppercase tracking-wider"><Icon name="bed-single" size={12} /> Private room</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold"><span className="relative inline-flex w-2 h-2 rounded-full bg-success-400 pulse-dot text-success-400" /> Active</span>
              </div>
              <div className="mt-2.5 text-[20px] font-extrabold tracking-tight leading-tight">Room 204 · Building B</div>
              <div className="text-[12px] opacity-85">Mess Griya Praja · Lantai 2</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/12 rounded-lg p-2"><div className="text-[10px] uppercase tracking-wider opacity-80">Check-in</div><div className="text-[13px] font-extrabold mono">Malam ini</div></div>
                <div className="bg-white/12 rounded-lg p-2"><div className="text-[10px] uppercase tracking-wider opacity-80">Check-out</div><div className="text-[13px] font-extrabold mono">14 Jun</div></div>
                <div className="bg-white/12 rounded-lg p-2"><div className="text-[10px] uppercase tracking-wider opacity-80">Akses</div><div className="text-[13px] font-extrabold mono">QR</div></div>
              </div>
              <button className="mt-3 w-full h-11 rounded-xl bg-white text-brand-700 text-[13px] font-extrabold inline-flex items-center justify-center gap-2"><Icon name="qr-code" size={17} /> QR akses kamar</button>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Quick action</div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { ic:'bed-double', l:'Booking kamar', s:'dormitory / private', tone:'brand' },
              { ic:'presentation', l:'Meeting room', s:'8 ruang per camp', tone:'info' },
              { ic:'car', l:'Pinjam kendaraan', s:'pool internal', tone:'success' },
              { ic:'wrench', l:'Lapor maintenance', s:'housekeeping / WO', tone:'safety' },
            ].map(a => (
              <button key={a.l} className="surface rounded-2xl p-4 text-left hover:border-brand-200">
                <div className={`w-11 h-11 rounded-xl bg-${a.tone}-50 text-${a.tone}-600 flex items-center justify-center`}><Icon name={a.ic} size={22} /></div>
                <div className="text-[13px] font-extrabold mt-2.5">{a.l}</div>
                <div className="text-[10.5px] text-muted">{a.s}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 mt-4 grid grid-cols-3 gap-2">
          {[{l:'Nights ini bulan',v:'18',ic:'moon'},{l:'Meeting booked',v:'3',ic:'presentation'},{l:'Vehicle trips',v:'2',ic:'car'}].map(s => (
            <div key={s.l} className="surface rounded-xl p-3 text-center"><Icon name={s.ic} size={15} className="text-brand-500 mx-auto" /><div className="text-[18px] font-extrabold mono mt-1">{s.v}</div><div className="text-[9px] uppercase tracking-wider text-subtle font-bold leading-tight">{s.l}</div></div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-[18px]"><MobileBottomNav active={2} /></div>
    </div>
  );
}

// ============================================================
// A2 — Book Room
// ============================================================
function A2_BookRoom() {
  const [sel, setSel] = React.useState('204');
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Booking kamar" sub="Pilih tanggal & kamar" />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-28 space-y-3">
        {/* Camp + dates */}
        <div className="surface rounded-2xl p-3 space-y-2">
          <div className="h-11 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2"><Icon name="map-pin" size={15} className="text-subtle" /><span className="text-[10px] uppercase tracking-wider text-subtle font-bold">Camp</span><span className="text-[13px] font-bold flex-1 text-right">Griya Praja</span><Icon name="chevron-down" size={14} className="text-subtle" /></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-11 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2"><Icon name="calendar" size={15} className="text-subtle" /><div className="flex-1"><div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Check-in</div><div className="text-[12px] font-bold mono">Malam ini</div></div></div>
            <div className="h-11 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2"><Icon name="calendar" size={15} className="text-subtle" /><div className="flex-1"><div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Check-out</div><div className="text-[12px] font-bold mono">14 Jun</div></div></div>
          </div>
        </div>

        {/* Room type */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Tipe kamar</div>
          <div className="grid grid-cols-3 gap-1.5">
            {[{ic:'bunk-bed',l:'Dormitory',on:false},{ic:'bed-single',l:'Private',on:true},{ic:'users',l:'Share',on:false}].map(t => (
              <button key={t.l} className={`h-14 rounded-xl border inline-flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold ${t.on?'bg-brand-50 border-brand-300 text-brand-700':'bg-white border-token text-muted'}`}><Icon name={t.ic} size={18} /> {t.l}</button>
            ))}
          </div>
        </div>

        {/* Building & floor selector */}
        <div className="surface rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[12px] font-extrabold">Building B · Lantai 2</div>
            <div className="flex items-center gap-1">
              {['A','B','C'].map(b => <button key={b} className={`w-7 h-7 rounded-md text-[11px] font-bold ${b==='B'?'bg-brand-500 text-white':'bg-elev text-muted'}`}>{b}</button>)}
            </div>
          </div>
          {/* gender note */}
          <div className="mb-2.5 rounded-lg bg-info-50 border border-info-500/20 p-2 flex items-center gap-2 text-[10.5px] text-info-700"><Icon name="venus-mars" size={13} /> <span className="font-semibold">Building B — pria. Gender separation otomatis sesuai profil.</span></div>
          <FloorPlan rooms={SAMPLE_FLOOR} selected={sel} onSelect={setSel} cols={3} />
          <div className="mt-3 pt-3 border-t border-token"><RoomLegend /></div>
        </div>

        {/* Selected confirmation */}
        <div className="rounded-2xl bg-brand-50 border border-brand-200 p-3.5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center"><Icon name="bed-single" size={22} /></div>
          <div className="flex-1"><div className="text-[14px] font-extrabold text-brand-700">Room {sel} · Private</div><div className="text-[10.5px] text-brand-700/75">Building B · Lantai 2 · single occupancy</div></div>
          <StatusPill tone="success" size="sm" icon="check-circle-2">Available</StatusPill>
        </div>

        {/* Special request */}
        <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Special request</div><textarea rows="2" placeholder="Mis. dekat tangga, lantai bawah, dll" className="w-full bg-transparent outline-none text-[12.5px] resize-none" /></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3"><Btn variant="primary" size="lg" full icon="check-circle-2">Confirm · book room {sel}</Btn></div>
    </div>
  );
}

// ============================================================
// A3 — My Bookings
// ============================================================
function A3_MyBookings() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Booking saya" sub="Aktif & mendatang" />
      <div className="px-4 pt-3 flex items-center gap-1.5 shrink-0">{['Aktif','Mendatang','Riwayat'].map((t,i)=><button key={t} className={`px-3 h-9 rounded-full text-[12px] font-bold border ${i===0?'bg-brand-500 text-white border-brand-500':'bg-white border-token text-muted'}`}>{t}</button>)}</div>

      <div className="flex-1 overflow-y-auto px-4 py-3 pb-6 space-y-3">
        {/* Active w/ QR */}
        <div className="surface rounded-2xl overflow-hidden">
          <div className="bg-brand-700 text-white px-4 py-2.5 flex items-center justify-between"><div className="inline-flex items-center gap-1.5"><Icon name="bed-single" size={15} /><span className="text-[11px] font-extrabold uppercase tracking-wider">Active · Room 204</span></div><span className="px-2 h-6 rounded bg-white/20 text-[10px] font-extrabold mono inline-flex items-center">BK-260529-204</span></div>
          <div className="p-4 flex gap-4">
            <div className="p-2 rounded-xl bg-white border border-token shrink-0"><QRCode size={96} accent="#143452" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-extrabold">Building B · Griya Praja</div>
              <div className="text-[11px] text-muted mt-0.5">Private · Lantai 2</div>
              <div className="mt-2 space-y-1 text-[11.5px]">
                <div className="flex items-center gap-1.5"><Icon name="calendar" size={12} className="text-subtle" /><span className="font-semibold">29 Mei → 14 Jun</span></div>
                <div className="flex items-center gap-1.5"><Icon name="moon" size={12} className="text-subtle" /><span className="text-muted">16 malam</span></div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4 grid grid-cols-3 gap-2">
            <button className="h-9 rounded-lg border border-token bg-white text-[11.5px] font-bold inline-flex items-center justify-center gap-1"><Icon name="calendar-plus" size={13} /> Extend</button>
            <button className="h-9 rounded-lg border border-token bg-white text-[11.5px] font-bold inline-flex items-center justify-center gap-1"><Icon name="users" size={13} /> Roommate</button>
            <button className="h-9 rounded-lg border border-danger-500/30 bg-white text-danger-700 text-[11.5px] font-bold inline-flex items-center justify-center gap-1"><Icon name="x" size={13} /> Cancel</button>
          </div>
        </div>

        {/* Upcoming dormitory w/ roommate */}
        <div className="surface rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2"><div className="text-[10px] mono text-subtle font-bold">BK-260615-318</div><StatusPill tone="info" size="sm" icon="calendar">Mendatang</StatusPill></div>
          <div className="flex items-center gap-2 mb-2"><Icon name="bunk-bed" size={16} className="text-info-600" /><div className="text-[14px] font-extrabold">Room 318 · Dormitory</div></div>
          <div className="text-[11px] text-muted">Simpang Perdau · 15 Jun → 18 Jun · training batch</div>
          {/* Roommates */}
          <div className="mt-3 pt-3 border-t border-token">
            <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Roommate · 3 orang</div>
            <div className="flex items-center gap-2">
              {['Anton W.','Joko P.','Eko S.'].map(n => <div key={n} className="flex items-center gap-1.5 rounded-full bg-elev pl-1 pr-2.5 py-1"><Avatar name={n} size={22} photo /><span className="text-[10.5px] font-bold">{n}</span></div>)}
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-warning-50 border border-warning-500/25 p-2.5 text-[11px] text-warning-700 flex items-start gap-2"><Icon name="info" size={13} className="mt-0.5 shrink-0" /><span>Cancellation gratis sampai 6 jam sebelum check-in (15 Jun 08:00).</span></div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// A4 — Meeting Room Booking
// ============================================================
function A4_MeetingRoom() {
  const slots = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30'];
  const booked = ['09:00','09:30','10:00'];
  const sel = ['10:30','11:00'];
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Meeting room" sub="Griya Praja · 8 ruang" />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-28 space-y-3">
        {/* Room list */}
        <div className="space-y-2">
          {[
            { n:'Borneo Room', cap:20, eq:['projector','video-conf','ac'], sel:true },
            { n:'Mahakam Room', cap:12, eq:['projector','whiteboard','ac'] },
            { n:'Kutai Room', cap:8, eq:['tv','ac'] },
          ].map(r => (
            <div key={r.n} className={`surface rounded-2xl p-3.5 ${r.sel?'ring-2 ring-brand-500/30 border-brand-300':''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl ${r.sel?'bg-brand-500 text-white':'bg-elev text-brand-600'} flex items-center justify-center`}><Icon name="presentation" size={20} /></div>
                <div className="flex-1 min-w-0"><div className="text-[13.5px] font-extrabold">{r.n}</div><div className="text-[10.5px] text-muted inline-flex items-center gap-1"><Icon name="users" size={11} /> {r.cap} orang</div></div>
                {r.sel && <Icon name="check-circle-2" size={20} className="text-brand-500" />}
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                {r.eq.map(e => { const m={ 'projector':['projector','Projector'],'video-conf':['video','Video conf'],'whiteboard':['pen-tool','Whiteboard'],'ac':['wind','AC'],'tv':['tv','TV'] }[e]; return <StatusPill key={e} tone="gray" size="sm" icon={m[0]}>{m[1]}</StatusPill>; })}
              </div>
            </div>
          ))}
        </div>

        {/* Time slot picker */}
        <div className="surface rounded-2xl p-3.5">
          <div className="flex items-center justify-between mb-2.5"><div className="text-[12px] font-extrabold">Borneo Room · hari ini</div><span className="text-[10px] text-subtle">15-min granularity</span></div>
          <div className="grid grid-cols-4 gap-1.5">
            {slots.map(s => { const b=booked.includes(s); const sl=sel.includes(s); return (
              <button key={s} disabled={b} className={`h-10 rounded-lg text-[11.5px] font-bold mono ${sl?'bg-brand-500 text-white':b?'bg-danger-50 text-danger-400 border border-danger-200 cursor-not-allowed line-through':'bg-success-50 text-success-700 border border-success-500/30'}`}>{s}</button>
            ); })}
          </div>
          {/* Conflict warning */}
          <div className="mt-2.5 rounded-lg bg-success-50 border border-success-500/25 p-2.5 text-[11px] text-success-700 flex items-center gap-2"><Icon name="check-circle-2" size={13} /> <span>Slot 10:30–11:30 tersedia · no conflict.</span></div>
        </div>

        {/* Form */}
        <div className="surface rounded-xl p-3 space-y-2.5">
          <div><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Judul meeting</div><div className="h-10 rounded-lg border border-token-strong bg-white px-3 flex items-center text-[13px] font-semibold">Koordinasi shift change Juni</div></div>
          <div><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Attendees · 6</div><div className="flex items-center gap-1 flex-wrap">{['Hadi W.','Sari H.','Anton W.','+3'].map(n=><span key={n} className="px-2 h-6 rounded-md bg-elev text-[10.5px] font-bold inline-flex items-center gap-1">{n!=='+3'&&<Avatar name={n} size={16} photo />}{n}</span>)}<button className="px-2 h-6 rounded-md border border-dashed border-token-strong text-[10.5px] font-bold text-brand-700 inline-flex items-center gap-1"><Icon name="plus" size={11} /> Add</button></div></div>
          <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Icon name="repeat" size={14} className="text-subtle" /><span className="text-[12px] font-semibold">Recurring weekly</span></div><div className="w-10 h-5 rounded-full bg-elev p-0.5"><div className="w-4 h-4 rounded-full bg-white shadow" /></div></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3"><Btn variant="primary" size="lg" full icon="send">Book & kirim undangan</Btn></div>
    </div>
  );
}

// ============================================================
// A5 — Vehicle Booking Internal
// ============================================================
function A5_VehicleBooking() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Pinjam kendaraan" sub="Pool internal · intra-camp" />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-28 space-y-3">
        {/* SIM validation banner */}
        <div className="rounded-xl bg-success-50 border border-success-500/25 p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-success-500 text-white flex items-center justify-center"><Icon name="id-card" size={17} /></div>
          <div className="flex-1 text-[11.5px]"><div className="font-extrabold text-success-700">SIM A valid · defensive driving ✓</div><div className="text-success-700/80">Self-drive diizinkan · cert s/d 30 Sep 2026</div></div>
        </div>

        {/* Vehicle pool */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Available di pool</div>
          <div className="space-y-2">
            {[
              { n:'Toyota Hilux', plate:'KT 8821 PA', t:'Pickup 4x4', av:true, sel:true },
              { n:'Toyota Fortuner', plate:'KT 4410 PB', t:'SUV 7-seat', av:true },
              { n:'Honda CRF', plate:'KT 1102 PM', t:'Motorbike trail', av:false },
            ].map(v => (
              <div key={v.plate} className={`surface rounded-2xl p-3 flex items-center gap-3 ${v.sel?'ring-2 ring-brand-500/30 border-brand-300':''} ${!v.av?'opacity-60':''}`}>
                <div className="w-14 h-14 rounded-xl bg-elev flex items-center justify-center text-brand-600"><Icon name={v.t.includes('Motorbike')?'bike':'truck'} size={26} /></div>
                <div className="flex-1 min-w-0"><div className="text-[13.5px] font-extrabold">{v.n}</div><div className="text-[10.5px] text-muted mono">{v.plate} · {v.t}</div></div>
                {v.av ? (v.sel?<Icon name="check-circle-2" size={20} className="text-brand-500" />:<StatusPill tone="success" size="sm">Available</StatusPill>) : <StatusPill tone="gray" size="sm" icon="x">In use</StatusPill>}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="surface rounded-2xl p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="h-11 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2"><Icon name="clock" size={14} className="text-subtle" /><div className="flex-1"><div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Pickup</div><div className="text-[12px] font-bold mono">08:00</div></div></div>
            <div className="h-11 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2"><Icon name="clock" size={14} className="text-subtle" /><div className="flex-1"><div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Return</div><div className="text-[12px] font-bold mono">14:00</div></div></div>
          </div>
          <div className="h-11 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2"><Icon name="map-pin" size={14} className="text-subtle" /><span className="text-[10px] uppercase tracking-wider text-subtle font-bold">Tujuan</span><span className="text-[12.5px] font-bold flex-1 text-right">PIT Bahana · inspeksi</span></div>
          <div className="h-11 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2"><Icon name="users" size={14} className="text-subtle" /><span className="text-[10px] uppercase tracking-wider text-subtle font-bold">Penumpang</span><span className="text-[12.5px] font-bold flex-1 text-right">2 orang</span></div>
        </div>

        {/* Max duration warning */}
        <div className="rounded-xl bg-info-50 border border-info-500/25 p-3 flex items-start gap-2.5"><Icon name="info" size={15} className="text-info-600 mt-0.5 shrink-0" /><div className="text-[11.5px] text-info-700"><span className="font-extrabold">Durasi 6 jam.</span> Max 8 jam per booking. Inspection checklist wajib pre &amp; post penggunaan.</div></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3"><Btn variant="primary" size="lg" full icon="qr-code">Book · QR key dispenser</Btn></div>
    </div>
  );
}

// ============================================================
// A6 — Housekeeping Request
// ============================================================
function A6_Housekeeping() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Lapor maintenance" sub="Room 204 · Building B" />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-28 space-y-3">
        {/* Category */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Kategori</div>
          <div className="grid grid-cols-3 gap-1.5">
            {[{ic:'spray-can',l:'Kebersihan',on:false},{ic:'wrench',l:'Perbaikan',on:true},{ic:'message-square-warning',l:'Complaint',on:false}].map(c => (
              <button key={c.l} className={`h-16 rounded-xl border flex flex-col items-center justify-center gap-0.5 ${c.on?'bg-brand-50 border-brand-300 text-brand-700':'bg-white border-token text-muted'}`}><Icon name={c.ic} size={18} /><span className="text-[10px] font-bold">{c.l}</span></button>
            ))}
          </div>
        </div>

        {/* Sub category */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Detail masalah</div>
          <div className="grid grid-cols-3 gap-1.5">
            {[{ic:'snowflake',l:'AC'},{ic:'zap',l:'Listrik'},{ic:'droplet',l:'Air'},{ic:'lightbulb',l:'Lampu'},{ic:'armchair',l:'Furniture'},{ic:'more-horizontal',l:'Lainnya'}].map((c,i) => (
              <button key={c.l} className={`h-14 rounded-xl border flex flex-col items-center justify-center gap-0.5 ${i===0?'bg-brand-50 border-brand-300 text-brand-700':'bg-white border-token text-muted'}`}><Icon name={c.ic} size={17} /><span className="text-[10px] font-bold">{c.l}</span></button>
            ))}
          </div>
        </div>

        {/* Location auto */}
        <div className="surface rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-info-50 text-info-600 flex items-center justify-center"><Icon name="bed-single" size={17} /></div>
          <div className="flex-1"><div className="text-[10px] uppercase tracking-wider text-muted font-bold">Lokasi · auto-detect</div><div className="text-[13px] font-extrabold">Room 204 · Building B · Griya Praja</div></div>
          <Icon name="check-circle-2" size={16} className="text-success-500" />
        </div>

        {/* Description */}
        <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Deskripsi</div><textarea rows="3" defaultValue="AC tidak dingin sejak kemarin malam. Suara compressor nyala-mati tidak stabil." className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" /></div>

        {/* Photos */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Foto</div>
          <div className="grid grid-cols-4 gap-2">{[true,false,false,false].map((on,i)=><button key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 ${on?'bg-success-50 border border-success-500/30 text-success-700':'border-2 border-dashed border-token-strong text-subtle'}`}><Icon name={on?'image':'camera'} size={20} />{on&&<span className="text-[9px] font-bold">Foto 1</span>}</button>)}</div>
        </div>

        {/* Cross-module */}
        <div className="rounded-xl p-3 flex items-start gap-2.5" style={{ background:'linear-gradient(135deg, #EAF1F8 0%, #CFDDEC 100%)', border:'1px dashed #6E9BC7' }}>
          <div className="w-8 h-8 rounded-md bg-white text-brand-700 flex items-center justify-center shrink-0 border border-brand-200"><Icon name="wrench" size={15} /></div>
          <div className="flex-1 text-[11px]"><div className="font-extrabold text-brand-700 uppercase tracking-wider text-[9.5px]">SAP PM · auto-WO</div><div className="text-brand-700/85 mt-0.5">Request perbaikan auto-create Work Order di SAP PM · technician dispatch &lt; 2 jam.</div></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3"><Btn variant="primary" size="lg" full icon="send">Submit request</Btn></div>
    </div>
  );
}

window.A1_Home = A1_Home;
window.A2_BookRoom = A2_BookRoom;
window.A3_MyBookings = A3_MyBookings;
window.A4_MeetingRoom = A4_MeetingRoom;
window.A5_VehicleBooking = A5_VehicleBooking;
window.A6_Housekeeping = A6_Housekeeping;
