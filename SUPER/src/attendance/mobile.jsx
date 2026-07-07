// Mobile attendance screens A1–A8.

// Primacom-blue gradient system — same as Login 1.7 home dashboard.
const AT_HEADER_GRAD = 'linear-gradient(158deg, #2E9BE6 0%, #1670C4 46%, #0E4F9E 100%)';
const AT_CTA_GRAD    = 'linear-gradient(135deg, #1C8BE0 0%, #1466BE 55%, #0E4F9E 100%)';
const AT_OUT_GRAD    = 'linear-gradient(135deg, #16B26A 0%, #12A05C 55%, #0E7C47 100%)';

const AT_QA_TONES = {
  blue:   { bg:'#E7F0FE', fg:'#1670C4' },
  indigo: { bg:'#EBEBFE', fg:'#4F53D6' },
  green:  { bg:'#E3F7EE', fg:'#12A05C' },
  orange: { bg:'#FFF0DE', fg:'#E7860B' },
  red:    { bg:'#FEEAEA', fg:'#E24B4A' },
  gray:   { bg:'#EDF1F6', fg:'#5B6472' },
};

// ============================================================
// A1 — Attendance Home (interactive: belum / sudah clock-in)
// ============================================================
function MobileBottomNav({ active = 1 }) {
  const left  = [{ name:'Home', icon:'home' }, { name:'Attendance', icon:'clock' }];
  const right = [{ name:'Safety', icon:'shield' }, { name:'Profile', icon:'user' }];
  const Tab = ({ t, i }) => (
    <button className="flex flex-col items-center gap-1 py-1 flex-1">
      <Icon name={t.icon} size={22} className={i === active ? 'text-[#1670C4]' : 'text-subtle'} />
      <span className={`text-[10px] font-semibold ${i === active ? 'text-[#1670C4]' : 'text-subtle'}`}>{t.name}</span>
    </button>
  );
  return (
    <div className="relative bg-white border-t border-token px-2 pt-1.5 pb-1.5"
         style={{ boxShadow:'0 -8px 24px -16px rgba(15,23,42,0.35)' }}>
      <div className="flex items-stretch">
        {left.map((t, i) => <Tab key={t.name} t={t} i={i} />)}
        <div className="w-16 shrink-0" />
        {right.map((t, i) => <Tab key={t.name} t={t} i={i + 3} />)}
      </div>
      {/* Center raised FAB — Clock In / Scan */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-6 flex flex-col items-center">
        <button className="w-14 h-14 rounded-full text-white flex items-center justify-center"
                style={{ background: AT_CTA_GRAD, boxShadow:'0 10px 22px -6px rgba(20,102,190,0.6)', border:'4px solid #fff' }}>
          <Icon name="scan-line" size={24} />
        </button>
        <span className="text-[10px] font-bold text-[#1670C4] mt-0.5">Clock In</span>
      </div>
    </div>
  );
}

function LiveClock({ light = false }) {
  const [t, setT] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = (n) => String(n).padStart(2, '0');
  return (
    <div className={`mono text-[42px] font-extrabold tracking-tight tabular-nums leading-none ${light ? 'text-white' : ''}`}>
      {fmt(t.getHours())}<span className="opacity-60">:</span>{fmt(t.getMinutes())}<span className="text-[24px] opacity-50">:{fmt(t.getSeconds())}</span>
    </div>
  );
}

function AtQuickAction({ icon, label, tone='blue' }) {
  const t = AT_QA_TONES[tone] || AT_QA_TONES.blue;
  return (
    <button className="flex flex-col items-center gap-2 py-1.5">
      <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center" style={{ background: t.bg, color: t.fg }}>
        <Icon name={icon} size={23} />
      </div>
      <div className="text-[11px] font-semibold text-center leading-tight max-w-[74px]" style={{ color:'#3a4250' }}>{label}</div>
    </button>
  );
}

function Screen_Home({ clockedIn, setClockedIn }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col relative" style={{ background:'#F2F5FA' }}>
      {/* Scroll body — gradient header scrolls with content (same as Login 1.7) */}
      <div className="no-scrollbar flex-1 min-h-0 overflow-y-auto -mt-[54px] pb-28 text-[#0f1115]" style={{ scrollbarWidth:'none' }}>
        {/* Gradient header (extends under status bar) */}
        <div className="relative px-5 pt-[62px] pb-14 text-white overflow-hidden" style={{ background: AT_HEADER_GRAD }}>
          {/* Brand-echo concentric arcs */}
          <div className="absolute -right-10 -top-16 w-48 h-48 rounded-full border border-white/15" />
          <div className="absolute -right-4 -top-10 w-32 h-32 rounded-full border border-white/15" />
          <div className="absolute right-6 -top-4 w-16 h-16 rounded-full border border-white/15" />

          <div className="relative flex items-center gap-3">
            <button className="-ml-1 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Icon name="arrow-left" size={20} />
            </button>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-bold leading-tight">Attendance</div>
              <div className="text-[12px] text-white/80">Selasa, 19 Mei 2026</div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Icon name="info" size={19} />
            </button>
          </div>

          <div className="relative mt-4">
            <LiveClock light />
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-white/15 text-[11px] font-semibold">
                <Icon name="globe" size={13} /> WITA · GMT+8
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-white/15 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" /> Tersinkron 07:58
              </span>
            </div>
          </div>
        </div>

        {/* Hero status / clock-in card */}
        <div className="relative z-10 px-5 -mt-9">
          <div className="rounded-[24px] bg-white p-4" style={{ boxShadow:'0 20px 40px -20px rgba(14,79,158,0.5)' }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-subtle">Status hari ini</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${clockedIn ? 'bg-success-500' : 'bg-safety-500'}`} />
                  <span className="text-[17px] font-extrabold tracking-tight">{clockedIn ? 'Sedang Bertugas' : 'Belum Clock In'}</span>
                  {clockedIn && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success-600">
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-success-500 pulse-dot text-success-500" /> LIVE
                    </span>
                  )}
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 h-6 rounded-full text-[11px] font-bold" style={{ background:'#E7F0FE', color:'#1670C4' }}>
                <Icon name="sunrise" size={13} /> Shift Pagi
              </span>
            </div>

            {/* shift detail row */}
            {!clockedIn ? (
              <div className="mt-3 flex items-center gap-3 rounded-2xl p-3" style={{ background:'#F3F6FB' }}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0" style={{ color:'#1670C4' }}>
                  <Icon name="clock" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold leading-tight">06:00 – 14:00</div>
                  <div className="text-[11px] text-muted flex items-center gap-1 mt-0.5 truncate">
                    <Icon name="map-pin" size={12} /> PIT Bahana · Bukit Sangatta
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-subtle">Mulai dalam</div>
                  <div className="text-[13px] font-extrabold mono" style={{ color:'#1670C4' }}>-00:07</div>
                </div>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-3 gap-2 text-center rounded-2xl p-3" style={{ background:'#F3F6FB' }}>
                {[
                  { l:'Clock-in', v:'05:58' },
                  { l:'Durasi',   v:'2j 04m' },
                  { l:'Lokasi',   v:'PIT Bahana', small: true },
                ].map((s, i) => (
                  <div key={s.l} className={i > 0 ? 'border-l border-token' : ''}>
                    <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{s.l}</div>
                    <div className={`font-extrabold tracking-tight mt-0.5 ${s.small ? 'text-[12px] leading-tight' : 'text-[16px] mono'}`} style={{ color:'#0E4F9E' }}>{s.v}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {!clockedIn ? (
              <button onClick={() => setClockedIn(true)}
                      className="mt-3 w-full h-[52px] rounded-2xl text-white font-bold text-[15px] inline-flex items-center justify-center gap-2"
                      style={{ background: AT_CTA_GRAD, boxShadow:'0 12px 22px -10px rgba(20,102,190,0.7)' }}>
                <Icon name="fingerprint" size={20} /> Clock In Sekarang
              </button>
            ) : (
              <button onClick={() => setClockedIn(false)}
                      className="mt-3 w-full h-[52px] rounded-2xl text-white font-bold text-[15px] inline-flex items-center justify-center gap-2"
                      style={{ background: AT_OUT_GRAD, boxShadow:'0 12px 22px -10px rgba(18,160,92,0.6)' }}>
                <Icon name="log-out" size={20} /> Clock Out
              </button>
            )}

            {/* mini stats */}
            <div className="mt-4 grid grid-cols-3 text-center">
              {[
                { v:'22', l:'Hadir bln ini' },
                { v:'1',  l:'Telat' },
                { v:'168j', l:'Total jam' },
              ].map((s, i) => (
                <div key={s.l} className={`flex flex-col ${i>0 ? 'border-l border-token' : ''}`}>
                  <div className="text-[16px] font-extrabold tracking-tight" style={{ color:'#0E4F9E' }}>{s.v}</div>
                  <div className="text-[10px] text-subtle">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* belum clock-out kemarin alert */}
        <div className="px-5 mt-3">
          <div className="rounded-2xl p-3 flex items-center gap-2.5" style={{ background:'#FFF4E2', border:'1px solid rgba(243,152,0,0.3)' }}>
            <div className="w-8 h-8 rounded-lg bg-white text-warning-600 flex items-center justify-center shrink-0">
              <Icon name="alert-triangle" size={16} />
            </div>
            <div className="flex-1 min-w-0 text-[12px]">
              <span className="font-bold">Belum clock-out kemarin.</span>
              <span className="text-muted"> Shift Senin 18 Mei.</span>
            </div>
            <button className="text-[12px] font-bold px-2.5 h-8 rounded-lg" style={{ color:'#1670C4' }}>Koreksi</button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-5 mt-4">
          <div className="rounded-[22px] bg-white p-3.5" style={{ boxShadow:'0 10px 30px -22px rgba(15,23,42,0.4)' }}>
            <div className="grid grid-cols-4">
              <AtQuickAction icon="history"       label="Riwayat"    tone="blue" />
              <AtQuickAction icon="edit-3"        label="Koreksi"    tone="orange" />
              <AtQuickAction icon="calendar-days" label="Jadwal Shift" tone="indigo" />
              <AtQuickAction icon="receipt"       label="Slip Kerja" tone="green" />
            </div>
          </div>
        </div>

        {/* Shift hari ini */}
        <div className="px-5 mt-5">
          <div className="text-[13px] font-extrabold tracking-tight mb-2">Shift hari ini</div>
          <div className="rounded-[22px] bg-white p-4" style={{ boxShadow:'0 10px 30px -22px rgba(15,23,42,0.4)' }}>
            <div className="space-y-3">
              {[
                { icon:'sunrise',    bg:'#FFF0DE', fg:'#E7860B', t:'Shift Pagi', m:'06:00 – 14:00 · istirahat 12:00' },
                { icon:'map-pin',    bg:'#E7F0FE', fg:'#1670C4', t:'PIT Bahana', m:'Bukit Sangatta · geofence 100m' },
                { icon:'user-check', bg:'#E3F7EE', fg:'#12A05C', t:'Hadi Wijaya', m:'Supervisor · Tim Excavator B (14 orang)' },
              ].map(r => (
                <div key={r.t} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:r.bg, color:r.fg }}>
                    <Icon name={r.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold leading-tight">{r.t}</div>
                    <div className="text-[11px] text-subtle truncate">{r.m}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Aktivitas hari ini — timeline */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[13px] font-extrabold tracking-tight">Aktivitas hari ini</div>
            <a className="text-[12px] font-semibold" style={{ color:'#1670C4' }}>Lihat semua</a>
          </div>
          <div className="rounded-[22px] bg-white p-4" style={{ boxShadow:'0 10px 30px -22px rgba(15,23,42,0.4)' }}>
            {[
              { t:'05:58', title:'Clock-in', meta:'QR Code · PIT Bahana · 12m dari titik', done:true },
              { t:'07:15', title:'Pre-shift briefing selesai', meta:'Tanda tangan SPV', done:true },
              { t:'08:42', title:'Break — sedang berjalan', meta:'Pengingat balik kerja 09:00', now:true },
              { t:'14:00', title:'Shift selesai', meta:'Clock out', last:true },
            ].map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full mt-1" style={{ background: a.now ? '#1670C4' : a.done ? '#12A05C' : '#CBD5E1', boxShadow: a.now ? '0 0 0 4px rgba(22,112,196,0.18)' : 'none' }} />
                  {!a.last && <div className="w-[2px] flex-1 my-1" style={{ background:'#E6E8EC' }} />}
                </div>
                <div className={`flex-1 min-w-0 ${a.last ? '' : 'pb-3'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-extrabold mono" style={{ color: a.now ? '#1670C4' : '#3a4250' }}>{a.t}</span>
                    {a.now && <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background:'#E7F0FE', color:'#1670C4' }}>Sekarang</span>}
                    {a.done && <Icon name="check" size={13} className="text-success-600" />}
                  </div>
                  <div className="text-[13px] font-semibold leading-tight">{a.title}</div>
                  <div className="text-[11px] text-subtle">{a.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 pb-[18px] z-30 bg-white">
        <MobileBottomNav active={1} />
      </div>
    </div>
  );
}

// ============================================================
// A2 — Method selection
// ============================================================
function Screen_Method() {
  const opts = [
    { key:'qr',  icon:'qr-code',    title:'Scan QR Code',  desc:'Scan QR di pos jaga area kerja.',     primary: true, badge:'Direkomendasikan' },
    { key:'rfid',icon:'nfc',        title:'Tap Kartu RFID',desc:'Tempelkan kartu ID ke reader.',        primary: true },
    { key:'gps', icon:'map-pin',    title:'GPS Only',      desc:'Gunakan lokasi GPS — hanya jika QR / RFID tidak tersedia.', primary: false },
  ];
  return (
    <div className="flex-1 flex flex-col" style={{ background:'#F2F5FA' }}>
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="arrow-left" size={22} />
        </button>
        <div className="flex-1">
          <div className="text-[15px] font-bold tracking-tight">Pilih metode clock-in</div>
          <div className="text-[11px] text-subtle">Shift Pagi · 06:00 – 14:00</div>
        </div>
      </div>
      <div className="px-5 pt-5 flex-1 overflow-y-auto">
        <div className="text-[13px] text-muted leading-relaxed">
          Geofence aktif — Anda <span className="font-semibold">dalam radius 100m</span> dari PIT Bahana. Pilih metode untuk melanjutkan.
        </div>
        <div className="mt-5 space-y-3">
          {opts.map(o => (
            <button key={o.key}
              className={`w-full text-left rounded-2xl p-4 border-2 transition-all
                ${o.primary ? 'bg-white border-token hover:border-brand-500 hover:bg-brand-50/30' : 'bg-elev border-dashed border-token-strong hover:bg-white'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                  ${o.primary ? 'bg-brand-500 text-white' : 'bg-elev text-muted border border-token-strong'}`}>
                  <Icon name={o.icon} size={26} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-[15px] font-bold tracking-tight">{o.title}</div>
                    {o.badge && <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-safety-50 text-safety-700">{o.badge}</span>}
                  </div>
                  <div className="text-[12px] text-muted mt-0.5 leading-snug">{o.desc}</div>
                </div>
                <Icon name="chevron-right" size={18} className="text-subtle shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-3 rounded-xl bg-info-50 text-info-700 text-[12px] flex gap-2">
          <Icon name="info" size={14} className="mt-0.5 shrink-0" />
          <div>Phase 2 akan menambahkan <span className="font-semibold">Face Recognition</span> untuk lokasi tanpa pos jaga.</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// A2b — Geofence error (di luar radius)
// ============================================================
function Screen_Geofence() {
  return (
    <div className="flex-1 flex flex-col" style={{ background:'#F2F5FA' }}>
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="arrow-left" size={22} />
        </button>
        <div className="flex-1">
          <div className="text-[15px] font-bold tracking-tight">Verifikasi lokasi</div>
          <div className="text-[11px] text-subtle">Shift Pagi · 06:00 – 14:00</div>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="refresh-cw" size={18} className="text-subtle" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
        {/* Geofence visual */}
        <div className="rounded-[22px] bg-white p-4" style={{ boxShadow:'0 10px 30px -22px rgba(15,23,42,0.4)' }}>
          <div className="relative h-[200px] rounded-2xl overflow-hidden" style={{ background:'#E8EEF6' }}>
            {/* geofence rings */}
            <div className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full" style={{ background:'rgba(22,112,196,0.10)', border:'2px dashed rgba(22,112,196,0.45)' }} />
            <div className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ background:'#1670C4', boxShadow:'0 0 0 4px rgba(22,112,196,0.25)' }} />
            <div className="absolute left-[30%] top-[26%] -translate-x-1/2 px-2 h-6 rounded-full bg-white text-[10px] font-bold inline-flex items-center gap-1" style={{ color:'#1670C4' }}>
              <Icon name="map-pin" size={11} /> PIT Bahana · 100m
            </div>
            {/* user outside */}
            <div className="absolute right-[14%] bottom-[24%] flex flex-col items-center">
              <div className="relative w-4 h-4 rounded-full bg-danger-500 pulse-dot text-danger-500 border-2 border-white" />
              <div className="mt-1 px-2 h-6 rounded-full bg-danger-500 text-white text-[10px] font-bold inline-flex items-center">Anda · 460m</div>
            </div>
            {/* connector */}
            <div className="absolute left-[38%] right-[24%] top-[54%] h-[2px]" style={{ background:'repeating-linear-gradient(90deg, #E24B4A 0 6px, transparent 6px 12px)' }} />
          </div>

          <div className="mt-3 rounded-2xl p-3 flex items-start gap-2.5" style={{ background:'#FEEAEA', border:'1px solid rgba(226,75,74,0.3)' }}>
            <div className="w-8 h-8 rounded-lg bg-white text-danger-500 flex items-center justify-center shrink-0">
              <Icon name="map-pin-off" size={16} />
            </div>
            <div className="flex-1 text-[12px]">
              <span className="font-bold text-danger-700">Di luar area kerja.</span>
              <span className="text-muted"> Anda <span className="mono font-semibold">460m</span> dari titik PIT Bahana — clock-in butuh radius ≤100m. Akurasi GPS <span className="mono">±8m</span>.</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-2.5">
          <button className="w-full h-[52px] rounded-2xl text-white font-bold text-[15px] inline-flex items-center justify-center gap-2"
                  style={{ background: AT_CTA_GRAD, boxShadow:'0 12px 22px -10px rgba(20,102,190,0.7)' }}>
            <Icon name="locate-fixed" size={20} /> Perbarui lokasi
          </button>
          <button className="w-full h-12 rounded-2xl bg-white border border-token-strong text-[13px] font-bold inline-flex items-center justify-center gap-2" style={{ color:'#1670C4' }}>
            <Icon name="edit-3" size={16} /> Ajukan clock-in manual
          </button>
          <button className="w-full h-11 rounded-2xl text-[13px] font-semibold text-muted inline-flex items-center justify-center gap-2">
            <Icon name="phone" size={15} /> Hubungi supervisor — Hadi Wijaya
          </button>
        </div>

        <div className="mt-5 p-3 rounded-xl bg-info-50 text-info-700 text-[12px] flex gap-2">
          <Icon name="info" size={14} className="mt-0.5 shrink-0" />
          <div>Clock-in manual dikirim sebagai <span className="font-semibold">koreksi</span> — butuh persetujuan supervisor dan tercatat di audit trail.</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// A3 — QR Scanner
// ============================================================
function Screen_Scanner() {
  return (
    <div className="flex-1 flex flex-col relative" style={{ background: '#0a0d12' }}>
      {/* Camera viewfinder mock */}
      <div className="absolute inset-0">
        {/* dark gradient + faint pattern to simulate camera view */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(120% 80% at 50% 30%, #1a2333 0%, #0a0d12 70%)',
        }} />
        {/* faux scene shapes */}
        <svg viewBox="0 0 390 844" className="absolute inset-0 w-full h-full opacity-30">
          <rect x="40" y="180" width="310" height="220" rx="6" fill="none" stroke="#A6C6F5" strokeWidth="1" strokeDasharray="2 6" />
          <path d="M0,650 L100,580 L180,600 L260,560 L390,610 L390,844 L0,844 Z" fill="#1a2333" />
          <text x="195" y="320" textAnchor="middle" fill="#3D85E0" fontSize="80" fontWeight="800" opacity="0.15" fontFamily="Inter">QR</text>
        </svg>
      </div>

      {/* Top bar */}
      <div className="relative z-10 px-5 pt-1 flex items-center justify-between text-white">
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
          <Icon name="x" size={20} />
        </button>
        <div className="text-[14px] font-bold">Scan QR Code</div>
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
          <Icon name="zap-off" size={18} />
        </button>
      </div>

      {/* Scanner box */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pb-32">
        <div className="text-white text-center text-[14px] font-semibold mb-6">Arahkan kamera ke QR code di pos jaga</div>
        <div className="relative w-[240px] h-[240px]">
          {/* Corners */}
          {['tl','tr','bl','br'].map(c => (
            <div key={c}
                 className={`absolute w-8 h-8 border-white ${c.includes('t')?'top-0 border-t-4':'bottom-0 border-b-4'} ${c.includes('l')?'left-0 border-l-4':'right-0 border-r-4'}`}
                 style={{ borderColor: '#F39800', borderRadius: c==='tl'?'8px 0 0 0':c==='tr'?'0 8px 0 0':c==='bl'?'0 0 0 8px':'0 0 8px 0' }} />
          ))}
          {/* Scan line */}
          <div className="absolute left-2 right-2 h-[3px] rounded-full scan-line"
               style={{ background: 'linear-gradient(90deg, transparent, #F39800, transparent)', boxShadow: '0 0 16px #F39800' }} />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 bg-black/55 backdrop-blur text-white px-3 h-9 rounded-full text-[12px] font-semibold">
          <Icon name="loader-2" size={14} className="spinner" />
          Mencari QR…
        </div>
      </div>

      {/* GPS indicator */}
      <div className="absolute left-4 right-4 bottom-[100px] z-10">
        <div className="bg-success-500/95 backdrop-blur text-white rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
            <Icon name="map-pin" size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-extrabold flex items-center gap-1.5">
              <Icon name="check-circle-2" size={13} /> Lokasi terdeteksi
            </div>
            <div className="text-[11px] opacity-90 truncate">PIT Bahana · <span className="mono">12m</span> dari titik · akurasi <span className="mono">±4m</span></div>
          </div>
        </div>
      </div>

      {/* Cancel */}
      <div className="absolute left-4 right-4 bottom-6 z-10">
        <button className="w-full h-12 rounded-xl bg-white/15 backdrop-blur text-white border border-white/25 font-semibold text-[14px]">
          Batalkan
        </button>
      </div>
    </div>
  );
}

// ============================================================
// A4 — Success
// ============================================================
function Screen_Success({ offline = false }) {
  return (
    <div className="flex-1 flex flex-col" style={{ background:'#F2F5FA' }}>
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="x" size={20} />
        </button>
        <div className="flex-1 text-center text-[13px] font-bold">Clock-in</div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pt-7 overflow-y-auto pb-6">
        {/* Anim check */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full ring-expand" style={{ background: offline ? '#EF9F27' : '#1D9E75' }} />
          <div className={`relative w-28 h-28 rounded-full check-pop flex items-center justify-center text-white`}
               style={{ background: offline ? '#EF9F27' : '#1D9E75', boxShadow: offline ? '0 16px 36px -10px rgba(239,159,39,0.55)' : '0 16px 36px -10px rgba(29,158,117,0.55)' }}>
            <Icon name="check" size={56} strokeWidth={3} />
          </div>
        </div>
        <div className="mt-6 text-[24px] font-extrabold tracking-tight text-center">Clock-in berhasil!</div>
        <div className="text-[13px] text-muted mt-1">Selamat bertugas — tetap utamakan keselamatan.</div>

        {/* Offline banner */}
        {offline && (
          <div className="w-full mt-5 rounded-xl bg-warning-50 border border-warning-500/30 p-3 flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-warning-500 text-white flex items-center justify-center shrink-0">
              <Icon name="cloud-off" size={16} />
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-extrabold text-warning-700">Tersimpan offline</div>
              <div className="text-[11px] text-warning-700/90 mt-0.5">Data akan tersinkron otomatis saat koneksi kembali.</div>
            </div>
            <span className="px-1.5 h-5 rounded bg-warning-500 text-white text-[10px] font-extrabold mono inline-flex items-center">3 antri</span>
          </div>
        )}

        {/* Detail card */}
        <div className="w-full mt-5 surface rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-token flex items-center gap-2">
            <Icon name="receipt-text" size={16} className="text-brand-500" />
            <div className="text-[12px] font-bold uppercase tracking-wider">Detail</div>
          </div>
          <div className="divide-y divide-[color:var(--border)]">
            {[
              { lab:'Waktu',       val:'05:58 WITA · 19 Mei 2026', icon:'clock' },
              { lab:'Lokasi',      val:'PIT Bahana · Bukit Sangatta', icon:'map-pin', meta:'12m dari titik · akurasi ±4m' },
              { lab:'Shift',       val:'Pagi · 06:00 – 14:00',     icon:'sunrise' },
              { lab:'Method',      val:'QR Code · POS-A-04',       icon:'qr-code' },
              { lab:'Status',      val:'On-time',                  icon:'check-circle-2', tone:'success' },
            ].map(d => (
              <div key={d.lab} className="px-4 py-3 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${d.tone==='success' ? 'bg-success-50 text-success-600':'bg-brand-50 text-brand-600'} flex items-center justify-center shrink-0`}>
                  <Icon name={d.icon} size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{d.lab}</div>
                  <div className="text-[13px] font-semibold leading-tight">{d.val}</div>
                  {d.meta && <div className="text-[11px] text-subtle mt-0.5">{d.meta}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-4">
          <Btn variant="primary" size="lg" full iconRight="arrow-right">Lihat dashboard</Btn>
        </div>
        <button className="mt-2 text-[13px] font-semibold text-brand-700 h-11">Share bukti via WhatsApp</button>
      </div>
    </div>
  );
}

// ============================================================
// A6 — Riwayat (calendar heatmap)
// ============================================================
const MAY_DAYS = (() => {
  // Build 30-day status grid for May. Selasa 19 Mei is "today" (Tue)
  const out = [];
  // Pattern: weekends grey (libur), one late, two cuti, rest hadir on-time
  const lateOn = [12];          // May 12
  const cutiOn = [6, 7];        // May 6-7
  const absentOn = [23];        // May 23 not yet — keep for variety
  for (let d = 1; d <= 30; d++) {
    const day = new Date(2026, 4, d).getDay(); // 0=Sun,6=Sat
    let status = 'hadir';
    if (day === 0 || day === 6) status = 'libur';
    if (lateOn.includes(d)) status = 'telat';
    if (cutiOn.includes(d)) status = 'cuti';
    if (absentOn.includes(d)) status = 'absent';
    if (d > 19) status = 'future';
    out.push({ d, status });
  }
  return out;
})();

function Screen_Riwayat() {
  const colors = {
    hadir:  { bg:'#1D9E75', fg:'#fff', label:'Hadir on-time' },
    telat:  { bg:'#EF9F27', fg:'#fff', label:'Hadir terlambat' },
    absent: { bg:'#E24B4A', fg:'#fff', label:'Tidak hadir' },
    cuti:   { bg:'#378ADD', fg:'#fff', label:'Cuti / izin' },
    libur:  { bg:'#E6E8EC', fg:'#5b6472', label:'Hari libur' },
    future: { bg:'#fff',    fg:'#8b94a2', label:'—', border:'#E6E8EC' },
  };
  // Pad start: May 1 is Friday (day 5). So 5 leading empties for week starting Sunday.
  // Use Monday-first layout for ID common: pad = (1 - 1 + 7) % 7 where May 1 day = 5 → pad = 4
  const pad = 4;
  return (
    <div className="flex-1 flex flex-col" style={{ background:'#F2F5FA' }}>
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="arrow-left" size={22} />
        </button>
        <div className="flex-1 text-center">
          <div className="text-[15px] font-bold tracking-tight">Riwayat Attendance</div>
          <div className="text-[11px] text-subtle">Mei 2026</div>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="download" size={18} className="text-subtle" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="px-4 pt-3 flex items-center gap-2 overflow-x-auto">
          <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-white border border-token text-[12px] font-semibold whitespace-nowrap">
            <Icon name="calendar" size={14} /> Mei 2026 <Icon name="chevron-down" size={14} />
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-white border border-token text-[12px] font-semibold whitespace-nowrap">
            Semua status <Icon name="chevron-down" size={14} />
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-white border border-token text-[12px] font-semibold whitespace-nowrap">
            <Icon name="filter" size={14} />
          </button>
        </div>

        {/* Summary */}
        <div className="px-4 mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white border border-token p-3">
            <div className="text-[10px] uppercase tracking-wider font-bold text-success-700">Hadir</div>
            <div className="text-[20px] font-extrabold mono mt-0.5">22<span className="text-[12px] text-subtle font-normal ml-1">hari</span></div>
          </div>
          <div className="rounded-xl bg-white border border-token p-3">
            <div className="text-[10px] uppercase tracking-wider font-bold text-warning-700">Telat</div>
            <div className="text-[20px] font-extrabold mono mt-0.5">1<span className="text-[12px] text-subtle font-normal ml-1">×</span></div>
          </div>
          <div className="rounded-xl bg-white border border-token p-3">
            <div className="text-[10px] uppercase tracking-wider font-bold text-info-700">Cuti</div>
            <div className="text-[20px] font-extrabold mono mt-0.5">2<span className="text-[12px] text-subtle font-normal ml-1">hari</span></div>
          </div>
        </div>

        {/* Calendar */}
        <div className="px-4 mt-4">
          <div className="surface rounded-2xl p-4">
            <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-subtle mb-2">
              {['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({length: pad}).map((_,i) => <div key={'p'+i} />)}
              {MAY_DAYS.map(({d, status}) => {
                const c = colors[status];
                const isToday = d === 19;
                return (
                  <div key={d} className="aspect-square rounded-lg flex items-center justify-center text-[12px] font-bold relative"
                       style={{ background: c.bg, color: c.fg, border: c.border ? `1px solid ${c.border}` : 'none' }}>
                    {d}
                    {isToday && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white ring-1 ring-brand-500" />}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 gap-y-1.5 gap-x-3 text-[11px]">
              {['hadir','telat','absent','cuti','libur'].map(k => (
                <div key={k} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded" style={{ background: colors[k].bg, border: colors[k].border ? `1px solid ${colors[k].border}` : 'none' }} />
                  {colors[k].label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* List entries below */}
        <div className="px-4 mt-4 mb-6">
          <div className="text-[10px] uppercase tracking-wider font-bold text-subtle mb-2">Recent</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { d:'19 Mei', day:'Sel', in:'05:58', out:'—', dur:'2j 04m', status:'On-shift', tone:'info' },
              { d:'18 Mei', day:'Sen', in:'05:52', out:'14:05', dur:'8j 13m', status:'On-time', tone:'success' },
              { d:'17 Mei', day:'Min', in:'—', out:'—', dur:'—', status:'Libur', tone:'gray' },
              { d:'12 Mei', day:'Sel', in:'06:14', out:'14:01', dur:'7j 47m', status:'Terlambat 14m', tone:'warning' },
            ].map((e, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className="w-10 text-center">
                  <div className="text-[10px] text-subtle uppercase">{e.day}</div>
                  <div className="text-[13px] font-extrabold tracking-tight leading-none">{e.d.split(' ')[0]}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold mono">{e.in} → {e.out}</div>
                  <div className="text-[11px] text-subtle">Durasi {e.dur}</div>
                </div>
                <StatusPill tone={e.tone}>{e.status}</StatusPill>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// A7 — Detail (bottom sheet)
// ============================================================
function Screen_Detail() {
  return (
    <div className="flex-1 relative" style={{ background:'#F2F5FA' }}>
      {/* Calendar dim background */}
      <div className="absolute inset-0 bg-elev">
        <div className="px-5 pt-3">
          <div className="h-6 w-32 skeleton" />
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {Array.from({length: 35}).map((_,i) => (
              <div key={i} className="aspect-square rounded-lg skeleton" />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40" />

      {/* Bottom sheet */}
      <div className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl overflow-hidden" style={{ maxHeight: '85%' }}>
        <div className="pt-2 flex justify-center"><div className="w-10 h-1 rounded-full bg-[color:var(--border-strong)]" /></div>

        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-subtle font-bold uppercase tracking-wider">Senin · 18 Mei 2026</div>
            <div className="text-[17px] font-extrabold tracking-tight">Shift Pagi</div>
          </div>
          <StatusPill tone="success" icon="check-circle-2">On-time</StatusPill>
        </div>

        <div className="px-5 mt-2">
          <div className="rounded-2xl bg-elev p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Clock-in</div>
                <div className="text-[22px] font-extrabold mono tracking-tight mt-0.5">05:58</div>
                <div className="text-[10px] text-subtle">−2m dari shift</div>
              </div>
              <div className="border-x border-token">
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Clock-out</div>
                <div className="text-[22px] font-extrabold mono tracking-tight mt-0.5">14:05</div>
                <div className="text-[10px] text-subtle">+5m dari shift</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Durasi</div>
                <div className="text-[22px] font-extrabold mono tracking-tight mt-0.5">8j 07m</div>
                <div className="text-[10px] text-subtle">+7m OT</div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {[
              { ic:'log-in',    t:'Clock-in', meta:'05:58 · QR Code · POS-A-04', loc:'PIT Bahana · 12m' },
              { ic:'log-out',   t:'Clock-out', meta:'14:05 · QR Code · POS-A-04', loc:'PIT Bahana · 8m' },
            ].map((r,i) => (
              <div key={i} className="flex items-center gap-3 surface rounded-xl p-3">
                <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Icon name={r.ic} size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold">{r.t}</div>
                  <div className="text-[11px] text-subtle mono truncate">{r.meta}</div>
                </div>
                <Icon name="map-pin" size={14} className="text-success-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 mt-4 pb-6 grid grid-cols-2 gap-2">
          <button className="h-12 rounded-xl border border-token-strong bg-white text-brand-700 text-[13px] font-bold inline-flex items-center justify-center gap-2">
            <Icon name="file-text" size={16} /> Slip kerja
          </button>
          <Btn variant="primary" icon="edit-3">Ajukan koreksi</Btn>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// A8 — Correction form
// ============================================================
function Screen_Correction() {
  return (
    <div className="flex-1 flex flex-col" style={{ background:'#F2F5FA' }}>
      <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3">
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="arrow-left" size={22} />
        </button>
        <div className="flex-1">
          <div className="text-[15px] font-bold tracking-tight">Ajukan Koreksi</div>
          <div className="text-[11px] text-subtle">Senin · 18 Mei 2026</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
        <div className="rounded-xl bg-warning-50 border border-warning-500/30 p-3 flex items-start gap-2.5">
          <Icon name="info" size={16} className="text-warning-600 mt-0.5 shrink-0" />
          <div className="text-[11.5px] text-warning-700">
            Koreksi memerlukan persetujuan supervisor. Berikan alasan jelas dan bukti bila ada — proses 1×24 jam.
          </div>
        </div>

        <div className="mt-4 space-y-3.5">
          {/* Jenis */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Jenis koreksi</div>
            <button className="w-full h-12 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2 text-[14px]">
              <Icon name="edit-3" size={16} className="text-subtle" />
              <span className="flex-1 text-left font-semibold">Lupa clock-out</span>
              <Icon name="chevron-down" size={16} className="text-subtle" />
            </button>
          </div>

          {/* Tanggal */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Tanggal</div>
              <div className="h-12 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2 text-[14px]">
                <Icon name="calendar" size={16} className="text-subtle" />
                <span className="flex-1 font-semibold mono">18 Mei 2026</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Waktu sebenarnya</div>
              <div className="h-12 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2 text-[14px]">
                <Icon name="clock" size={16} className="text-subtle" />
                <span className="flex-1 font-semibold mono">14:00</span>
              </div>
            </div>
          </div>

          {/* Alasan */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted">Alasan</div>
              <div className="text-[10px] text-subtle mono">68/250</div>
            </div>
            <div className="rounded-xl border border-token-strong bg-white p-3">
              <textarea rows="4" defaultValue="Habis briefing langsung dispatch ke Pit C bantu maintenance darurat, lupa scan QR keluar. Saksi: Pak Hadi & tim B." className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
            </div>
          </div>

          {/* Bukti */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Bukti foto (opsional)</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-xl border border-token bg-white relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #CFE0FB, #A6C6F5)' }}>
                  <Icon name="image" size={24} className="text-brand-700" />
                </div>
                <button className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center">
                  <Icon name="x" size={12} />
                </button>
              </div>
              <button className="aspect-square rounded-xl border-2 border-dashed border-token-strong text-subtle flex flex-col items-center justify-center gap-1 hover:bg-white hover:text-brand-600 hover:border-brand-300">
                <Icon name="camera" size={20} />
                <span className="text-[10px] font-semibold">Foto</span>
              </button>
              <button className="aspect-square rounded-xl border-2 border-dashed border-token-strong text-subtle flex flex-col items-center justify-center gap-1 hover:bg-white hover:text-brand-600 hover:border-brand-300">
                <Icon name="image-plus" size={20} />
                <span className="text-[10px] font-semibold">Galeri</span>
              </button>
            </div>
          </div>

          {/* Supervisor */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Saksi / Supervisor</div>
            <div className="rounded-xl border border-token-strong bg-white px-3 h-14 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-[12px]">HW</div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold leading-tight">Hadi Wijaya</div>
                <div className="text-[11px] text-subtle">Supervisor PIT Bahana · NSR-001029</div>
              </div>
              <Icon name="chevron-down" size={16} className="text-subtle" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Btn variant="primary" size="lg" full icon="send">Ajukan koreksi</Btn>
        </div>
      </div>
    </div>
  );
}

// =================== Export ===================
window.Screen_Home        = Screen_Home;
window.Screen_Method      = Screen_Method;
window.Screen_Geofence    = Screen_Geofence;
window.Screen_Scanner     = Screen_Scanner;
window.Screen_Success     = Screen_Success;
window.Screen_Riwayat     = Screen_Riwayat;
window.Screen_Detail      = Screen_Detail;
window.Screen_Correction  = Screen_Correction;
