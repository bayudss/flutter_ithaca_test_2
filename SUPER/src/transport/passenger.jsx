// Transportation — Passenger mobile screens T1-T8.

// ============================================================
// T1 — Transport Home
// ============================================================
function T1_Home() {
  return (
    <div className="flex-1 flex flex-col bg-elev relative">
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token shrink-0">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
          <div className="flex-1"><div className="text-[15px] font-bold tracking-tight">Shuttle &amp; Transport</div><div className="text-[11px] text-subtle">Selamat pagi, Budi · Shift Pagi</div></div>
          <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center relative"><Icon name="bell" size={20} className="text-subtle" /><span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-danger-500" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Active booking */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl text-white p-4 relative overflow-hidden" style={{ background:'linear-gradient(135deg, #1F4E79 0%, #143452 100%)' }}>
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -right-12 -bottom-16 w-40 h-40 rounded-full bg-safety-500/15" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-white/15 text-[10px] font-bold uppercase tracking-wider"><Icon name="bus" size={12} /> SHT-04 · Bus</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold"><span className="relative inline-flex w-2 h-2 rounded-full bg-success-400 pulse-dot text-success-400" /> Confirmed</span>
              </div>
              <div className="mt-2.5 text-[18px] font-extrabold tracking-tight leading-tight">Mess Griya → PIT Bahana</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/12 rounded-lg p-2"><div className="text-[10px] uppercase tracking-wider opacity-80">Berangkat</div><div className="text-[14px] font-extrabold mono">06:00</div></div>
                <div className="bg-white/12 rounded-lg p-2"><div className="text-[10px] uppercase tracking-wider opacity-80">Dalam</div><div className="text-[14px] font-extrabold mono">1j 20m</div></div>
                <div className="bg-white/12 rounded-lg p-2"><div className="text-[10px] uppercase tracking-wider opacity-80">Seat</div><div className="text-[14px] font-extrabold mono">12 · window</div></div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="h-11 rounded-xl bg-white text-brand-700 text-[13px] font-extrabold inline-flex items-center justify-center gap-2"><Icon name="qr-code" size={17} /> Boarding QR</button>
                <button className="h-11 rounded-xl bg-white/15 text-white text-[13px] font-bold inline-flex items-center justify-center gap-2"><Icon name="map-pin" size={16} /> Lacak shuttle</button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick action grid */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Quick action</div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { ic:'bus',         l:'Reserve shuttle', s:'rute reguler', tone:'brand' },
              { ic:'plane-landing',l:'Airport pickup', s:'jemput bandara', tone:'info' },
              { ic:'car',         l:'Kendaraan dinas', s:'trip ad-hoc', tone:'success' },
              { ic:'calendar-clock',l:'Jadwal shuttle', s:'hari ini', tone:'safety' },
            ].map(a => (
              <button key={a.l} className="surface rounded-2xl p-4 text-left hover:border-brand-200">
                <div className={`w-11 h-11 rounded-xl bg-${a.tone}-50 text-${a.tone}-600 flex items-center justify-center`}><Icon name={a.ic} size={22} /></div>
                <div className="text-[13px] font-extrabold mt-2.5">{a.l}</div>
                <div className="text-[10.5px] text-muted">{a.s}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent trips */}
        <div className="px-4 mt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted mb-2">Recent trips</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { r:'PIT Bahana → Mess', d:'28 Mei · 14:00', v:'SHT-09', rating:5 },
              { r:'Mess → PIT Bahana', d:'28 Mei · 06:00', v:'SHT-04', rating:4 },
              { r:'Mess → Askara',     d:'26 Mei · 08:30', v:'SHT-07', rating:5 },
            ].map((t,i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-elev flex items-center justify-center text-brand-600"><Icon name="bus" size={16} /></div>
                <div className="flex-1 min-w-0"><div className="text-[12.5px] font-bold truncate">{t.r}</div><div className="text-[10.5px] text-subtle">{t.d} · {t.v}</div></div>
                <div className="flex items-center gap-0.5">{[1,2,3,4,5].map(s => <Icon key={s} name="star" size={11} className={s<=t.rating?'text-safety-500':'text-[color:var(--border-strong)]'} />)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-[18px]"><MobileBottomNav active={2} /></div>
    </div>
  );
}

// ============================================================
// T2 — Schedule Today
// ============================================================
function T2_Schedule() {
  const slots = [
    { t:'05:30', avail:12, cap:30 },
    { t:'06:00', avail:0,  cap:30, waitlist:true },
    { t:'06:30', avail:28, cap:30 },
    { t:'07:00', avail:18, cap:30 },
  ];
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Jadwal Shuttle" sub="Jumat, 29 Mei 2026" />
      <div className="px-4 pt-3 flex items-center gap-1.5 shrink-0">
        {['Hari ini','Besok','Custom'].map((t,i) => (
          <button key={t} className={`px-3 h-9 rounded-full text-[12px] font-bold whitespace-nowrap border ${i===0?'bg-brand-500 text-white border-brand-500':'bg-white border-token text-muted'}`}>{t}</button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 pb-6 space-y-4">
        {/* Route 1 */}
        {[
          { route:'Mess Griya → PIT Bahana', km:'12 km · 25 min', icon:'mountain' },
          { route:'Mess Griya → Coal Pad Agra', km:'18 km · 35 min', icon:'warehouse' },
          { route:'Mess Griya → Askara', km:'8 km · 15 min', icon:'building' },
        ].map((r,ri) => (
          <div key={ri}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name={r.icon} size={15} /></div>
              <div className="flex-1"><div className="text-[13px] font-extrabold">{r.route}</div><div className="text-[10.5px] text-subtle">{r.km}</div></div>
            </div>
            <div className="space-y-1.5">
              {(ri===0?slots:slots.slice(0,3)).map((s,i) => (
                <button key={i} className={`w-full surface rounded-xl p-3 flex items-center gap-3 ${s.waitlist?'opacity-90':''} hover:border-brand-200`}>
                  <div className="text-[16px] font-extrabold mono w-16">{s.t}</div>
                  <div className="flex-1 text-left">
                    {s.waitlist
                      ? <StatusPill tone="danger" size="sm" icon="users">FULL · waitlist</StatusPill>
                      : <div className="flex items-center gap-1.5"><div className="flex-1 max-w-[120px] h-2 rounded-full bg-elev overflow-hidden"><div className={`h-full ${s.avail<=5?'bg-warning-500':'bg-success-500'}`} style={{ width:`${100-(s.avail/s.cap)*100}%` }} /></div><span className="text-[11px] font-bold text-success-700">{s.avail} seat</span></div>}
                  </div>
                  <Icon name="chevron-right" size={16} className="text-subtle" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Conditional route */}
        <div className="rounded-xl bg-elev border border-dashed border-token-strong p-3 flex items-center gap-2.5">
          <Icon name="info" size={15} className="text-subtle" />
          <div className="text-[11px] text-muted"><span className="font-bold">Mess → Port</span> hanya beroperasi di hari truck arrival. Hari ini tidak ada jadwal.</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// T3 — Seat Selection
// ============================================================
function T3_SeatSelect() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Pilih kursi" sub="Mess → PIT Bahana · 06:30" />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-28">
        {/* Trip info */}
        <div className="surface rounded-2xl p-3.5 flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name="bus" size={22} /></div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-extrabold">SHT-04 · Bus 30-seat</div>
            <div className="text-[10.5px] text-muted">Driver Sumarno · <span className="inline-flex items-center gap-0.5"><Icon name="star" size={10} className="text-safety-500" /> 4.8</span> · ETA stop 06:28</div>
          </div>
          <StatusPill tone="success" size="sm" icon="check-circle-2">28 free</StatusPill>
        </div>

        <SeatMap selected={12} />

        {/* Selected seat */}
        <div className="mt-3 rounded-2xl bg-brand-50 border border-brand-200 p-3.5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-brand-500 text-white flex items-center justify-center text-[15px] font-extrabold mono">12</div>
          <div className="flex-1"><div className="text-[13px] font-extrabold text-brand-700">Seat 12 · Window</div><div className="text-[10.5px] text-brand-700/75">Baris 3 · sisi kiri</div></div>
          <Icon name="check-circle-2" size={20} className="text-brand-500" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3">
        <Btn variant="primary" size="lg" full icon="armchair">Reserve seat 12</Btn>
      </div>
    </div>
  );
}

// ============================================================
// T4 — Boarding QR
// ============================================================
function T4_BoardingQR() {
  return (
    <div className="flex-1 flex flex-col" style={{ background:'linear-gradient(180deg, #143452 0%, #1F4E79 40%, #f5f6f8 85%)' }}>
      <div className="px-5 pt-1 pb-3 flex items-center gap-3 shrink-0 text-white">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="arrow-left" size={22} /></button>
        <div className="flex-1"><div className="text-[15px] font-bold tracking-tight">Boarding Pass</div><div className="text-[11px] opacity-80">Tunjukkan ke driver</div></div>
        <button className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="sun" size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-brand-700 text-white px-4 py-2.5 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5"><Icon name="bus" size={16} /><span className="text-[11px] font-extrabold uppercase tracking-wider">Boarding pass</span></div>
            <span className="px-2 h-6 rounded bg-white/20 text-[10px] font-extrabold mono inline-flex items-center">BP-260529-12</span>
          </div>
          <div className="p-5 flex flex-col items-center">
            <div className="text-[11px] font-bold uppercase tracking-wider text-brand-700 mb-1">Mess Griya → PIT Bahana</div>
            <div className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-safety-50 text-safety-700 text-[12px] font-bold mb-3"><Icon name="clock" size={13} /> Berangkat dalam <span className="mono">18:24</span></div>
            <div className="p-3 rounded-2xl bg-white border-2 border-brand-100"><QRCode size={190} accent="#143452" /></div>
            <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-elev p-2.5"><div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Vehicle</div><div className="text-[12px] font-extrabold mono">SHT-04</div></div>
              <div className="rounded-xl bg-elev p-2.5"><div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Seat</div><div className="text-[12px] font-extrabold mono">12</div></div>
              <div className="rounded-xl bg-elev p-2.5"><div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Boarding</div><div className="text-[12px] font-extrabold mono">06:00</div></div>
            </div>
          </div>
          <div className="border-t border-dashed border-token px-5 py-3 flex items-center gap-2 text-[11px] text-muted">
            <Icon name="info" size={13} /> Tunjukkan QR ini ke driver saat boarding di stop
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="h-11 rounded-xl bg-white border border-token text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="calendar-plus" size={15} /> Add to calendar</button>
          <button className="h-11 rounded-xl bg-white border border-token text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="wallet" size={15} /> Add to wallet</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// T5 — Live Tracking
// ============================================================
function T5_LiveTracking() {
  return (
    <div className="flex-1 flex flex-col relative bg-elev">
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/40 to-transparent px-5 pt-1 pb-6 flex items-center gap-3 text-white">
        <button className="-ml-2 w-10 h-10 rounded-full bg-black/30 backdrop-blur flex items-center justify-center"><Icon name="arrow-left" size={20} /></button>
        <div className="flex-1"><div className="text-[14px] font-bold tracking-tight">Lacak Shuttle SHT-04</div><div className="text-[11px] opacity-90">Mess → PIT Bahana</div></div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <SiteMap route vehicles={[{ x:'42%', y:'62%', heading:-25, label:'SHT-04' }]} you={{ x:'24%', y:'76%' }} height="100%" />
        {/* ETA banner */}
        <div className="absolute top-20 left-4 right-4 z-10">
          <div className="rounded-xl bg-success-500 text-white p-3 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center"><Icon name="bus" size={20} /></div>
            <div className="flex-1"><div className="text-[10px] uppercase tracking-wider opacity-90 font-bold">Shuttle menuju stop Anda</div><div className="text-[15px] font-extrabold">Tiba dalam 2 menit</div></div>
            <div className="text-[26px] font-extrabold mono">2m</div>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-3xl -mt-5 relative z-10 shadow-2xl shrink-0">
        <div className="pt-2 flex justify-center"><div className="w-10 h-1 rounded-full bg-[color:var(--border-strong)]" /></div>
        <div className="px-5 pt-3 pb-5">
          {/* Driver card */}
          <div className="flex items-center gap-3">
            <Avatar name="Sumarno" size={48} photo />
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-extrabold">Sumarno</div>
              <div className="text-[11px] text-muted">Driver SHT-04 · <span className="inline-flex items-center gap-0.5"><Icon name="star" size={11} className="text-safety-500" /> 4.8</span> · KT 7821 AB</div>
            </div>
            <button className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name="phone" size={18} /></button>
            <button className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name="message-circle" size={18} /></button>
          </div>

          {/* Live stats */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-elev p-2.5"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Kecepatan</div><div className="text-[14px] font-extrabold mono">42 <span className="text-[10px] text-subtle">km/h</span></div></div>
            <div className="rounded-xl bg-elev p-2.5"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">Jarak</div><div className="text-[14px] font-extrabold mono">1.2 <span className="text-[10px] text-subtle">km</span></div></div>
            <div className="rounded-xl bg-elev p-2.5"><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">ETA tiba PIT</div><div className="text-[14px] font-extrabold mono">06:25</div></div>
          </div>

          <button className="mt-3 w-full h-11 rounded-xl border border-danger-500/30 bg-white text-danger-700 text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5"><Icon name="x-circle" size={15} /> Batalkan booking</button>
          <div className="mt-1.5 text-center text-[10px] text-subtle">Gratis bila &gt; 6 jam sebelum keberangkatan</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// T6 — Trip Request Ad-Hoc
// ============================================================
function T6_TripRequest() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Request kendaraan" sub="Trip ad-hoc" />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-28 space-y-3">
        {/* Trip type */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Tipe trip</div>
          <div className="grid grid-cols-3 gap-1.5">
            {[{ic:'arrow-right',l:'One-way',on:true},{ic:'repeat',l:'Round-trip'},{ic:'git-fork',l:'Multi-stop'}].map(t => (
              <button key={t.l} className={`h-12 rounded-xl border text-[11.5px] font-bold inline-flex flex-col items-center justify-center gap-0.5 ${t.on?'bg-brand-50 border-brand-300 text-brand-700':'bg-white border-token text-muted'}`}><Icon name={t.ic} size={15} /> {t.l}</button>
            ))}
          </div>
        </div>

        {/* From → To */}
        <div className="surface rounded-2xl p-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center pt-1"><div className="w-2.5 h-2.5 rounded-full bg-success-500" /><div className="w-px h-8 bg-token" /><div className="w-2.5 h-2.5 rounded-full bg-danger-500" /></div>
            <div className="flex-1 space-y-2">
              <div className="h-10 rounded-lg border border-token-strong bg-white px-3 flex items-center gap-2"><span className="text-[10px] uppercase tracking-wider text-subtle font-bold w-8">Dari</span><span className="text-[13px] font-semibold flex-1">Mess Griya Praja</span></div>
              <div className="h-10 rounded-lg border border-token-strong bg-white px-3 flex items-center gap-2"><span className="text-[10px] uppercase tracking-wider text-subtle font-bold w-8">Ke</span><span className="text-[13px] font-semibold flex-1">Kantor Disnaker Samarinda</span></div>
            </div>
            <button className="w-9 h-9 rounded-lg bg-elev flex items-center justify-center"><Icon name="arrow-up-down" size={16} className="text-subtle" /></button>
          </div>
        </div>

        {/* Date/time + passenger */}
        <div className="grid grid-cols-2 gap-2">
          <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Tanggal &amp; waktu</div><div className="text-[13px] font-bold mono">30 Mei · 08:00</div></div>
          <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Penumpang</div><div className="flex items-center gap-2"><button className="w-7 h-7 rounded-md bg-elev flex items-center justify-center"><Icon name="minus" size={14} /></button><span className="text-[15px] font-extrabold mono flex-1 text-center">3</span><button className="w-7 h-7 rounded-md bg-brand-500 text-white flex items-center justify-center"><Icon name="plus" size={14} /></button></div></div>
        </div>

        {/* Vehicle preference */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1.5">Preferensi kendaraan</div>
          <div className="grid grid-cols-4 gap-1.5">
            {[{ic:'bus',l:'Bus'},{ic:'bus',l:'Mini'},{ic:'car',l:'MPV',on:true},{ic:'car',l:'Car'}].map(v => (
              <button key={v.l} className={`h-14 rounded-xl border inline-flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold ${v.on?'bg-brand-50 border-brand-300 text-brand-700':'bg-white border-token text-muted'}`}><Icon name={v.ic} size={18} /> {v.l}</button>
            ))}
          </div>
        </div>

        {/* Purpose + notes */}
        <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Purpose</div><div className="flex items-center gap-2 h-10"><Icon name="briefcase" size={15} className="text-subtle" /><span className="text-[13px] font-semibold flex-1">Meeting dengan regulator</span><Icon name="chevron-down" size={14} className="text-subtle" /></div></div>
        <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Catatan</div><textarea rows="2" defaultValue="Bawa dokumen audit, perlu kendaraan ber-AC. Pulang sekitar 15:00." className="w-full bg-transparent outline-none text-[12.5px] resize-none" /></div>

        {/* Approval flow note */}
        <div className="rounded-xl bg-info-50 border border-info-500/25 p-3 flex items-start gap-2.5">
          <Icon name="git-merge" size={16} className="text-info-600 mt-0.5 shrink-0" />
          <div className="text-[11.5px] text-info-700">Request akan melalui approval <span className="font-bold">SPV → FAC Dispatch</span>. Estimasi keputusan 2-4 jam jam kerja.</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3"><Btn variant="primary" size="lg" full icon="send">Submit request</Btn></div>
    </div>
  );
}

// ============================================================
// T7 — Airport Pickup Request
// ============================================================
function T7_AirportPickup() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Airport pickup" sub="Jemput bandara" />
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-28 space-y-3">
        {/* Flight number with auto-pull */}
        <div className="surface rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1.5">Flight number</div>
          <div className="flex items-center h-12 rounded-xl border-2 border-brand-300 bg-white px-3 gap-2 mb-2">
            <Icon name="plane" size={18} className="text-brand-500" />
            <input defaultValue="GA 540" className="flex-1 text-[16px] font-extrabold mono outline-none bg-transparent" />
            <StatusPill tone="success" size="sm" icon="check">Found</StatusPill>
          </div>
          {/* Auto-pulled flight info */}
          <div className="rounded-xl bg-info-50 border border-info-500/20 p-3">
            <div className="flex items-center gap-2 mb-2"><Icon name="radar" size={14} className="text-info-600" /><span className="text-[11px] font-extrabold text-info-700">Live flight data</span><span className="ml-auto text-[10px] text-info-600 mono">auto-pull</span></div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><div className="text-[9px] uppercase tracking-wider text-info-700/70 font-bold">Origin</div><div className="text-[13px] font-extrabold">CGK</div></div>
              <div><div className="text-[9px] uppercase tracking-wider text-info-700/70 font-bold">ETA BPN</div><div className="text-[13px] font-extrabold mono">09:25</div></div>
              <div><div className="text-[9px] uppercase tracking-wider text-info-700/70 font-bold">Status</div><div className="text-[12px] font-extrabold text-success-700">On-time</div></div>
            </div>
          </div>
        </div>

        {/* Airport + passenger */}
        <div className="grid grid-cols-2 gap-2">
          <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Airport</div><div className="flex items-center gap-1.5 h-9"><Icon name="plane-landing" size={15} className="text-subtle" /><span className="text-[13px] font-bold flex-1">BPN Balikpapan</span></div></div>
          <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Destination</div><div className="flex items-center gap-1.5 h-9"><Icon name="home" size={15} className="text-subtle" /><span className="text-[13px] font-bold flex-1">Camp Bahana</span></div></div>
        </div>

        {/* Passengers */}
        <div className="surface rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-2">Passenger(s)</div>
          <div className="space-y-2">
            {[{n:'Mr. James Whitfield',c:'+61 412 887 221',role:'Ithaca HQ'},{n:'Ms. Sarah Connor',c:'+61 433 192 008',role:'Ithaca HQ'}].map((p,i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-lg bg-elev p-2.5"><Avatar name={p.n} size={32} tone="info" /><div className="flex-1 min-w-0"><div className="text-[12.5px] font-bold truncate">{p.n}</div><div className="text-[10px] text-muted">{p.role} · {p.c}</div></div></div>
            ))}
            <button className="w-full h-10 rounded-xl border border-dashed border-token-strong text-[12px] font-bold text-brand-700 inline-flex items-center justify-center gap-1.5"><Icon name="plus" size={14} /> Tambah passenger</button>
          </div>
        </div>

        {/* Baggage + special service */}
        <div className="grid grid-cols-2 gap-2">
          <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Bagasi</div><div className="flex items-center gap-1.5 h-9"><Icon name="luggage" size={15} className="text-subtle" /><span className="text-[13px] font-bold">4 koper besar</span></div></div>
          <div className="surface rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Vehicle</div><div className="flex items-center gap-1.5 h-9"><Icon name="car" size={15} className="text-subtle" /><span className="text-[13px] font-bold">MPV (7-seat)</span></div></div>
        </div>

        {/* Special service */}
        <label className="surface rounded-xl p-3 flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-safety-50 text-safety-600 flex items-center justify-center"><Icon name="badge-info" size={18} /></div>
          <div className="flex-1"><div className="text-[12.5px] font-bold">Bawa sign identifikasi</div><div className="text-[10.5px] text-muted">Driver bawa papan nama untuk pickup</div></div>
          <div className="w-11 h-6 rounded-full bg-success-500 p-0.5"><div className="w-5 h-5 rounded-full bg-white shadow translate-x-5" /></div>
        </label>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-token p-3"><Btn variant="primary" size="lg" full icon="send">Request pickup · track dispatch</Btn></div>
    </div>
  );
}

// ============================================================
// T8 — Trip History
// ============================================================
function T8_History() {
  return (
    <div className="flex-1 flex flex-col bg-elev">
      <MobileTopBar title="Riwayat Trip" sub="Mei 2026" right={<button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="download" size={18} className="text-subtle" /></button>} />
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Stats */}
        <div className="px-4 pt-3 grid grid-cols-3 gap-2">
          {[{l:'Trips',v:'24',ic:'route'},{l:'Total km',v:'342',ic:'milestone'},{l:'Fuel cross-bill',v:'Rp 0',ic:'fuel'}].map(s => (
            <div key={s.l} className="surface rounded-xl p-3 text-center"><Icon name={s.ic} size={15} className="text-brand-500 mx-auto" /><div className="text-[18px] font-extrabold mono mt-1">{s.v}</div><div className="text-[9.5px] uppercase tracking-wider text-subtle font-bold">{s.l}</div></div>
          ))}
        </div>

        {/* List */}
        <div className="px-4 mt-3 space-y-2">
          {[
            { r:'PIT Bahana → Mess', d:'28 Mei 2026 · 14:00', v:'SHT-09 · Anto P.', km:'12 km', rating:5, type:'shuttle' },
            { r:'Mess → PIT Bahana', d:'28 Mei 2026 · 06:00', v:'SHT-04 · Sumarno', km:'12 km', rating:4, type:'shuttle' },
            { r:'Camp → Disnaker Samarinda', d:'26 Mei 2026 · 08:00', v:'MPV-03 · Rudi S.', km:'45 km', rating:5, type:'adhoc', billed:'Rp 0 (company)' },
            { r:'Airport BPN → Camp', d:'24 Mei 2026 · 10:30', v:'MPV-11 · Hadi', km:'120 km', rating:5, type:'airport' },
          ].map((t,i) => (
            <div key={i} className="surface rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.type==='airport'?'bg-info-50 text-info-600':t.type==='adhoc'?'bg-success-50 text-success-600':'bg-brand-50 text-brand-600'}`}><Icon name={t.type==='airport'?'plane':t.type==='adhoc'?'car':'bus'} size={18} /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-extrabold leading-tight">{t.r}</div>
                  <div className="text-[10.5px] text-muted mt-0.5">{t.d}</div>
                  <div className="text-[10.5px] text-subtle">{t.v} · {t.km}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-0.5">{[1,2,3,4,5].map(s => <Icon key={s} name="star" size={11} className={s<=t.rating?'text-safety-500':'text-[color:var(--border-strong)]'} />)}</div>
                  {t.billed && <div className="text-[10px] text-subtle mt-1 mono">{t.billed}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.T1_Home = T1_Home;
window.T2_Schedule = T2_Schedule;
window.T3_SeatSelect = T3_SeatSelect;
window.T4_BoardingQR = T4_BoardingQR;
window.T5_LiveTracking = T5_LiveTracking;
window.T6_TripRequest = T6_TripRequest;
window.T7_AirportPickup = T7_AirportPickup;
window.T8_History = T8_History;
