// Mobile Safety screens C1–C8.

// Primacom-blue gradient system — same as Login 1.7 home dashboard.
const SF_HEADER_GRAD = 'linear-gradient(158deg, #2E9BE6 0%, #1670C4 46%, #0E4F9E 100%)';

const SF_QA_TONES = {
  blue:   { bg:'#E7F0FE', fg:'#1670C4' },
  green:  { bg:'#E3F7EE', fg:'#12A05C' },
  orange: { bg:'#FFF0DE', fg:'#E7860B' },
  red:    { bg:'#FEEAEA', fg:'#E24B4A' },
};

function SfQuickAction({ icon, label, tone='blue' }) {
  const t = SF_QA_TONES[tone] || SF_QA_TONES.blue;
  return (
    <button className="flex flex-col items-center gap-2 py-1.5">
      <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center" style={{ background: t.bg, color: t.fg }}>
        <Icon name={icon} size={23} />
      </div>
      <div className="text-[11px] font-semibold text-center leading-tight max-w-[74px]" style={{ color:'#3a4250' }}>{label}</div>
    </button>
  );
}

// ============================================================
// C1 — Floating SOS over Home (context)
// ============================================================
function Screen_FloatingSOS({ onTrigger }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col relative" style={{ background:'#F2F5FA' }}>
      {/* Scroll body — gradient header scrolls with content (same as Login 1.7) */}
      <div className="flex-1 min-h-0 overflow-y-auto -mt-[54px] pb-28 text-[#0f1115]" style={{ scrollbarWidth:'none' }}>
        {/* Gradient header (extends under status bar) */}
        <div className="relative px-5 pt-[62px] pb-16 text-white overflow-hidden" style={{ background: SF_HEADER_GRAD }}>
          <div className="absolute -right-10 -top-16 w-48 h-48 rounded-full border border-white/15" />
          <div className="absolute -right-4 -top-10 w-32 h-32 rounded-full border border-white/15" />
          <div className="absolute right-6 -top-4 w-16 h-16 rounded-full border border-white/15" />

          <div className="relative flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur flex items-center justify-center font-bold text-[15px] ring-2 ring-white/40">BS</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-white/80">Selamat malam 👋</div>
              <div className="text-[16px] font-bold leading-tight truncate">Budi Santoso</div>
            </div>
            <button className="relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Icon name="bell" size={19} />
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-safety-500 text-white text-[9px] font-bold flex items-center justify-center border border-white/60">3</span>
            </button>
          </div>

          <div className="relative mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-white/15 text-[11px] font-semibold">
              <Icon name="moon" size={13} /> Shift Malam aktif
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-white/15 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" /> Tersinkron 19:30
            </span>
          </div>
        </div>

        {/* Hero shift card */}
        <div className="relative z-10 px-5 -mt-10">
          <div className="rounded-[24px] bg-white p-4" style={{ boxShadow:'0 20px 40px -20px rgba(14,79,158,0.5)' }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-subtle">Shift Anda</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-safety-500" />
                  <span className="text-[17px] font-extrabold tracking-tight">Belum Clock In</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 h-6 rounded-full text-[11px] font-bold" style={{ background:'#E7F0FE', color:'#1670C4' }}>
                <Icon name="moon" size={13} /> Shift Malam
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-2xl p-3" style={{ background:'#F3F6FB' }}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0" style={{ color:'#1670C4' }}>
                <Icon name="clock" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold leading-tight">22:00 – 06:00</div>
                <div className="text-[11px] text-muted flex items-center gap-1 mt-0.5 truncate">
                  <Icon name="map-pin" size={12} /> PIT Bahana · Bukit Sangatta
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-subtle">Mulai dalam</div>
                <div className="text-[13px] font-extrabold mono" style={{ color:'#1670C4' }}>-02:26</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-5 mt-4">
          <div className="rounded-[22px] bg-white p-3.5" style={{ boxShadow:'0 10px 30px -22px rgba(15,23,42,0.4)' }}>
            <div className="grid grid-cols-4">
              <SfQuickAction icon="fingerprint"    label="Clock In"  tone="blue" />
              <SfQuickAction icon="qr-code"        label="Scan QR"   tone="orange" />
              <SfQuickAction icon="edit-3"         label="Observasi" tone="green" />
              <SfQuickAction icon="alert-triangle" label="Lapor"     tone="red" />
            </div>
          </div>
        </div>

        {/* Reminders */}
        <div className="px-5 mt-5">
          <div className="text-[13px] font-extrabold tracking-tight mb-2">Malam ini</div>
          <div className="rounded-[22px] bg-white divide-y divide-[color:var(--border)]" style={{ boxShadow:'0 10px 30px -22px rgba(15,23,42,0.4)' }}>
            {[
              { icon:'megaphone',  bg:'#E7F0FE', fg:'#1670C4', t:'Pengingat pre-shift briefing', m:'21:45 · Ruang muster' },
              { icon:'clipboard-list', bg:'#FFF0DE', fg:'#E7860B', t:'Form inspeksi malam', m:'Open · due sebelum shift' },
              { icon:'badge-check', bg:'#E3F7EE', fg:'#12A05C', t:'SIO Anda berlaku 21 bulan', m:'Tidak ada tindakan' },
            ].map((r, i) => (
              <div key={i} className="p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:r.bg, color:r.fg }}>
                  <Icon name={r.icon} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold truncate">{r.t}</div>
                  <div className="text-[11px] text-subtle truncate">{r.m}</div>
                </div>
                <Icon name="chevron-right" size={16} className="text-subtle" />
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 mt-4">
          <div className="rounded-2xl bg-info-50 text-info-700 p-3 flex items-start gap-2 text-[12px]">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            <div><span className="font-bold">SOS button selalu accessible.</span> Tap dan tahan 3 detik untuk panggil bantuan darurat dari mana saja di dalam app.</div>
          </div>
        </div>
      </div>

      {/* Floating SOS */}
      <div className="absolute right-4 bottom-[104px] z-30">
        <button
          onClick={onTrigger}
          className="relative w-[78px] h-[78px] rounded-full flex items-center justify-center text-white font-extrabold sos-pulse focus-ring"
          style={{ background: 'radial-gradient(circle at 30% 25%, #FF7271 0%, #E24B4A 40%, #8E2A29 100%)' }}>
          <div className="breathe flex flex-col items-center leading-none">
            <Icon name="alert-octagon" size={26} />
            <div className="mt-1 text-[12px] font-extrabold tracking-wider">SOS</div>
          </div>
        </button>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 pb-[18px] z-30 bg-white">
        <MobileBottomNav active={3} />
      </div>
    </div>
  );
}

// ============================================================
// C2 — Hold to Activate (interactive)
// ============================================================
function Screen_SOSHold({ progress, holding, onMouseDown, onMouseUp }) {
  // progress 0-100
  const sec = Math.max(0, Math.ceil(3 - (progress / 100) * 3));
  return (
    <div className="flex-1 relative" style={{ background: 'radial-gradient(circle at 50% 30%, #8E2A29 0%, #4a1414 70%, #2a0a0a 100%)' }}>
      {/* Background pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full border-2 border-white/10 emerg-pulse" />
        <div className="absolute w-96 h-96 rounded-full border-2 border-white/5 emerg-pulse" style={{ animationDelay: '0.3s' }} />
      </div>

      <div className="relative h-full flex flex-col text-white px-6 pt-2 pb-6">
        <div className="flex items-center justify-between">
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
            <Icon name="x" size={18} />
          </button>
          <div className="text-[11px] mono font-bold tracking-wider opacity-70">EMERGENCY · DARURAT</div>
          <div className="w-10" />
        </div>

        <div className="mt-6 text-center">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/70">Panggil bantuan darurat</div>
          <h1 className="mt-2 text-[26px] font-extrabold tracking-tight leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Tahan tombol 3 detik
          </h1>
          <p className="mt-2 text-[13px] text-white/75 max-w-[280px] mx-auto leading-relaxed">
            Lokasi dan informasi Anda akan dikirim ke Command Center & Safety Officer terdekat.
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <button
            onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
            onTouchStart={onMouseDown} onTouchEnd={onMouseUp}
            className={`relative w-56 h-56 rounded-full flex items-center justify-center text-white font-extrabold select-none transition-transform ${holding ? 'scale-95' : ''}`}
            style={{ background: 'radial-gradient(circle at 30% 25%, #FF7271 0%, #E24B4A 45%, #8E2A29 100%)', boxShadow: '0 0 0 6px rgba(255,255,255,0.06), 0 20px 60px -10px rgba(226,75,74,0.6)' }}>
            {/* Progress ring */}
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="3"
                      strokeDasharray={`${(progress/100)*289} 289`} strokeLinecap="round" />
            </svg>
            <div className="relative flex flex-col items-center leading-none">
              {progress > 0 ? (
                <>
                  <div className="text-[64px] font-extrabold mono tracking-tight">{sec}</div>
                  <div className="text-[12px] uppercase tracking-wider opacity-80 mt-1">Tahan terus…</div>
                </>
              ) : (
                <>
                  <Icon name="alert-octagon" size={56} strokeWidth={2.2} />
                  <div className="text-[18px] mt-2 font-extrabold tracking-wider">SOS</div>
                </>
              )}
            </div>
          </button>
        </div>

        <div className="text-center mt-4">
          <button className="text-[14px] font-bold text-white/80 underline underline-offset-4 decoration-white/30 h-11 px-4">
            Batalkan
          </button>
          <div className="mt-2 text-[11px] text-white/55">Lepaskan untuk batal · jangan trigger jika tidak darurat</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// C3 — Sending
// ============================================================
function Screen_SOSSending() {
  return (
    <div className="flex-1 relative text-white" style={{ background: 'radial-gradient(circle at 50% 40%, #8E2A29 0%, #4a1414 70%, #2a0a0a 100%)' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-white/5 emerg-pulse" />
      </div>
      <div className="relative h-full flex flex-col px-6 pt-2 pb-8">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-white/15 backdrop-blur text-[11px] font-extrabold tracking-wider">
            <span className="relative inline-flex w-2 h-2 rounded-full bg-white pulse-dot text-white" />
            EMERGENCY ACTIVE
          </div>
          <div className="flex items-center gap-2 text-[11px] mono opacity-80">
            <span className="inline-flex items-center gap-1"><Icon name="signal" size={13} /> 4G</span>
            <span className="inline-flex items-center gap-1"><Icon name="battery" size={13} /> 82%</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Icon name="loader-2" size={48} className="spinner inline-block opacity-90" />
          <div className="mt-4 text-[24px] font-extrabold tracking-tight">Mengirim sinyal darurat…</div>
          <div className="mt-1 text-[13px] text-white/70">Mohon tunggu — tetap tenang.</div>
        </div>

        {/* Status checklist */}
        <div className="mt-8 space-y-2">
          {[
            { ic:'map-pin',     t:'Lokasi GPS terdeteksi',          meta:'-1.234567, 116.789012 · ±4m',   state:'done' },
            { ic:'shield-alert',t:'Notifikasi ke Command Center',    meta:'CC · Bukit Sangatta',          state:'done' },
            { ic:'user-check',  t:'Notifikasi ke Safety Officer',    meta:'Hadi Wijaya · ~340m dari Anda',state:'done' },
            { ic:'message-square', t:'Mengirim SMS backup',          meta:'+62 800-NUS-SOS',              state:'pending' },
          ].map((s,i) => (
            <div key={i} className="rounded-xl bg-white/8 backdrop-blur border border-white/10 p-3 flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                ${s.state==='done' ? 'bg-success-500 text-white' : 'bg-white/15 text-white'}`}>
                {s.state==='done' ? <Icon name="check" size={18} strokeWidth={3} /> : <Icon name="loader-2" size={16} className="spinner" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <div className="text-[13px] font-bold">{s.t}</div>
                  {s.state==='done' && <span className="text-[9px] font-extrabold uppercase tracking-wider px-1 py-0.5 rounded bg-success-500 text-white">Done</span>}
                </div>
                <div className="text-[11px] text-white/65 mono mt-0.5">{s.meta}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1" />
        <div className="text-center text-[11px] text-white/60">
          Total waktu: <span className="mono font-bold text-white">00:00:04</span> · ID <span className="mono">SOS-04219</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// C4 — SOS Active (waiting response)
// ============================================================
function Screen_SOSActive({ onCancel }) {
  const [elapsed, setElapsed] = React.useState(38);
  React.useEffect(() => {
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(elapsed/60)).padStart(2,'0');
  const ss = String(elapsed%60).padStart(2,'0');
  return (
    <div className="flex-1 flex flex-col text-white relative" style={{ background: '#0b0d12' }}>
      {/* Top status bar */}
      <div className="px-4 pt-1 pb-3 border-b border-white/10 bg-danger-700">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-white pulse-dot text-white" />
            <div className="text-[11px] font-extrabold uppercase tracking-wider">SOS ACTIVE · {mm}:{ss}</div>
          </div>
          <div className="text-[10px] mono opacity-70">SOS-04219</div>
        </div>
        <div className="mt-3 text-[22px] font-extrabold tracking-tight leading-tight">BANTUAN DALAM PERJALANAN</div>
        <div className="mt-0.5 text-[12px] text-white/80">Tetap di lokasi dan tetap tenang.</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-32">
        {/* Status timeline */}
        <div className="surface bg-white text-[color:var(--text)] rounded-2xl p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-subtle">Status</div>
          <div className="mt-3 flex items-center gap-1.5">
            <StatusStep done label="Sent"      time="19:34:12" />
            <StatusBar2 done />
            <StatusStep done label="ACK"       time="19:35:01" />
            <StatusBar2 done active />
            <StatusStep active label="En-route" time="ETA ~3m" />
            <StatusBar2 />
            <StatusStep label="Arrived" />
          </div>
        </div>

        {/* Responder */}
        <div className="mt-3 surface bg-white text-[color:var(--text)] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-brand-500 text-white text-[14px] font-bold flex items-center justify-center">HW</div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success-500 ring-2 ring-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <div className="text-[14px] font-extrabold">Hadi Wijaya</div>
                <StatusPill tone="success" size="sm" icon="check">Online · Responder</StatusPill>
              </div>
              <div className="text-[11px] text-subtle">Safety Officer · ~340m dari Anda</div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="h-11 rounded-xl bg-success-500 text-white text-[13px] font-bold inline-flex items-center justify-center gap-2">
              <Icon name="phone" size={16} /> Telepon
            </button>
            <button className="h-11 rounded-xl bg-white border border-token-strong text-[13px] font-bold text-brand-700 inline-flex items-center justify-center gap-2">
              <Icon name="message-circle" size={16} /> Chat
            </button>
          </div>
        </div>

        {/* Lokasi mini map */}
        <div className="mt-3 surface bg-white text-[color:var(--text)] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-token">
            <div className="text-[10px] font-bold uppercase tracking-wider text-subtle">Lokasi Anda</div>
            <div className="text-[13px] font-bold mono mt-0.5">-1.234567, 116.789012</div>
            <div className="text-[11px] text-muted">Rest Area-2 · PIT Bahana · akurasi ±4m</div>
          </div>
          <MiniMap />
        </div>

        {/* Chat preview */}
        <div className="mt-3 surface bg-white text-[color:var(--text)] rounded-2xl overflow-hidden">
          <div className="px-4 py-2.5 border-b border-token flex items-center gap-2">
            <Icon name="message-circle" size={14} className="text-brand-500" />
            <div className="text-[12px] font-bold">Chat dengan responder</div>
            <span className="ml-auto text-[10px] text-subtle">2 pesan</span>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">HW</div>
              <div className="rounded-2xl bg-elev px-3 py-2 max-w-[230px]">
                <div className="text-[12.5px]">Sudah lihat lokasi Anda. Saya menuju kesana, 3 menit sampai.</div>
                <div className="text-[10px] text-subtle mt-0.5">19:35</div>
              </div>
            </div>
            <div className="flex items-start gap-2 justify-end">
              <div className="rounded-2xl bg-brand-500 text-white px-3 py-2 max-w-[230px]">
                <div className="text-[12.5px]">Saya OK, cuma kaki terkilir. Bisa jalan pelan.</div>
                <div className="text-[10px] opacity-75 mt-0.5">19:35</div>
              </div>
            </div>
          </div>
          <div className="p-2 border-t border-token flex items-center gap-2">
            <div className="flex-1 rounded-full bg-elev px-3 h-9 flex items-center text-[12px] text-subtle">Ketik pesan…</div>
            <button className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center"><Icon name="send" size={15} /></button>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-danger-700 border-t border-white/10 grid grid-cols-2 gap-2">
        <button className="h-12 rounded-xl bg-white/15 backdrop-blur text-white text-[13px] font-bold inline-flex items-center justify-center gap-2 border border-white/20">
          <Icon name="plus" size={16} /> Tambah info
        </button>
        <button onClick={onCancel} className="h-12 rounded-xl bg-white text-danger-700 text-[13px] font-extrabold inline-flex items-center justify-center gap-2">
          <Icon name="x" size={16} /> Batalkan SOS
        </button>
      </div>
    </div>
  );
}

function StatusStep({ done, active, label, time }) {
  const bg = done ? 'bg-success-500 text-white' :
             active ? 'bg-warning-500 text-white' :
             'bg-elev text-subtle border border-token';
  return (
    <div className="flex flex-col items-center gap-0.5 shrink-0">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${bg}`}>
        {done ? <Icon name="check" size={14} /> : active ? <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> : ''}
      </div>
      <span className={`text-[9px] font-extrabold uppercase tracking-wider ${done?'text-success-700':active?'text-warning-700':'text-subtle'}`}>{label}</span>
      {time && <span className="text-[9px] mono text-subtle">{time}</span>}
    </div>
  );
}
function StatusBar2({ done, active }) {
  return <div className={`flex-1 h-0.5 rounded-full mt-[-20px] ${done ? 'bg-success-500' : active ? 'bg-gradient-to-r from-success-500 to-warning-500' : 'bg-[color:var(--border-strong)]'}`} />;
}

function MiniMap() {
  return (
    <div className="relative" style={{ background: '#0F1623', height: 130 }}>
      <svg viewBox="0 0 400 130" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid2" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1a2333" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="130" fill="url(#grid2)" />
        {/* contours */}
        <ellipse cx="200" cy="65" rx="120" ry="40" fill="none" stroke="#1670C4" strokeWidth="0.8" opacity="0.5" />
        <ellipse cx="200" cy="65" rx="90" ry="32" fill="none" stroke="#1670C4" strokeWidth="0.8" opacity="0.5" />
        <ellipse cx="200" cy="65" rx="60" ry="22" fill="none" stroke="#1670C4" strokeWidth="0.8" opacity="0.6" />
        {/* road */}
        <path d="M 0 90 Q 100 75 200 65 Q 300 55 400 75" stroke="#3D85E0" strokeWidth="2" fill="none" strokeDasharray="6 4" opacity="0.6" />
        <text x="200" y="20" textAnchor="middle" fill="#A6C6F5" fontSize="9" fontWeight="700">PIT BAHANA</text>
      </svg>
      {/* responder */}
      <div className="absolute" style={{ left: '32%', top: '55%' }}>
        <div className="relative flex flex-col items-center">
          <svg width="20" height="26" viewBox="0 0 22 28"><path d="M11 0 C 4 0 0 5 0 11 C 0 19 11 28 11 28 C 11 28 22 19 22 11 C 22 5 18 0 11 0 Z" fill="#378ADD" stroke="#0a121e" strokeWidth="1.5" /><circle cx="11" cy="11" r="4" fill="#fff" /></svg>
          <div className="text-[8px] mt-0.5 font-bold whitespace-nowrap text-info-300">Responder</div>
        </div>
      </div>
      {/* you */}
      <div className="absolute" style={{ left: '60%', top: '38%' }}>
        <div className="relative flex flex-col items-center">
          <span className="absolute w-4 h-4 rounded-full pulse-dot text-danger-500" />
          <svg width="22" height="28" viewBox="0 0 22 28"><path d="M11 0 C 4 0 0 5 0 11 C 0 19 11 28 11 28 C 11 28 22 19 22 11 C 22 5 18 0 11 0 Z" fill="#E24B4A" stroke="#fff" strokeWidth="2" /><circle cx="11" cy="11" r="4" fill="#fff" /></svg>
          <div className="text-[8px] mt-0.5 font-extrabold whitespace-nowrap text-white bg-danger-500 px-1 rounded">Anda</div>
        </div>
      </div>
      {/* path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M 128 72 Q 180 60 240 50" stroke="#F39800" strokeWidth="2" fill="none" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

// ============================================================
// C4b — Cancel SOS (konfirmasi 2×)
// ============================================================
function Screen_SOSCancel() {
  return (
    <div className="flex-1 flex flex-col text-white relative" style={{ background: '#0b0d12' }}>
      {/* Dimmed C4 behind */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="px-4 pt-1 pb-3 bg-danger-700">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              <div className="text-[11px] font-extrabold uppercase tracking-wider">SOS ACTIVE · 04:12</div>
            </div>
            <div className="text-[10px] mono opacity-70">SOS-04219</div>
          </div>
          <div className="mt-3 text-[22px] font-extrabold tracking-tight leading-tight">BANTUAN DALAM PERJALANAN</div>
        </div>
        <div className="px-4 pt-4 space-y-3">
          <div className="h-24 rounded-2xl bg-white/90" />
          <div className="h-32 rounded-2xl bg-white/90" />
          <div className="h-24 rounded-2xl bg-white/90" />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Confirmation sheet */}
      <div className="absolute left-0 right-0 bottom-0 bg-white text-[#0f1115] rounded-t-3xl px-5 pt-3 pb-8 z-10">
        <div className="flex justify-center"><div className="w-10 h-1 rounded-full bg-[color:var(--border-strong)]" /></div>

        <div className="mt-4 flex items-start gap-3">
          <div className="w-11 h-11 rounded-full bg-danger-50 text-danger-500 flex items-center justify-center shrink-0">
            <Icon name="alert-triangle" size={22} />
          </div>
          <div>
            <div className="text-[17px] font-extrabold tracking-tight">Batalkan SOS?</div>
            <div className="text-[12px] text-muted mt-0.5 leading-relaxed">Responder <span className="font-semibold">Hadi Wijaya</span> sedang menuju lokasi Anda (ETA ~3m). Command Center akan diberi tahu.</div>
          </div>
        </div>

        {/* Alasan — wajib pilih */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Alasan pembatalan <span className="text-danger-500">*</span></div>
          <div className="space-y-2">
            {[
              { k:'safe',    l:'Saya sudah aman — tidak butuh bantuan', sel:true },
              { k:'accident',l:'Tombol tertekan tidak sengaja', sel:false },
              { k:'other',   l:'Alasan lain…', sel:false },
            ].map(o => (
              <button key={o.k} className={`w-full text-left rounded-xl p-3 border-2 flex items-center gap-2.5 text-[13px] font-semibold
                ${o.sel ? 'border-danger-500 bg-danger-50 text-danger-700' : 'border-token bg-white text-muted'}`}>
                <span className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${o.sel ? 'border-danger-500' : 'border-token-strong'}`}>
                  {o.sel && <span className="w-2 h-2 rounded-full bg-danger-500" />}
                </span>
                {o.l}
              </button>
            ))}
          </div>
        </div>

        {/* Konfirmasi 2× */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="h-12 rounded-xl text-white text-[14px] font-extrabold inline-flex items-center justify-center gap-2"
                  style={{ background:'linear-gradient(135deg, #1C8BE0 0%, #1466BE 55%, #0E4F9E 100%)', boxShadow:'0 10px 20px -10px rgba(20,102,190,0.7)' }}>
            <Icon name="shield" size={16} /> Tetap aktif
          </button>
          <button className="h-12 rounded-xl border-2 border-danger-500 text-danger-700 bg-white text-[13px] font-extrabold inline-flex items-center justify-center gap-1.5">
            Konfirmasi batal · 2/2
          </button>
        </div>
        <div className="mt-2 text-center text-[11px] text-subtle">Tap sekali lagi dalam 5 detik untuk membatalkan — mencegah accidental cancel.</div>
      </div>
    </div>
  );
}

// ============================================================
// C5 — SOS Resolved
// ============================================================
function Screen_SOSResolved() {
  return (
    <div className="flex-1 flex flex-col relative" style={{ background: 'linear-gradient(180deg, #178060 0%, #0d4734 50%, #0b0d12 100%)' }}>
      <div className="px-5 pt-1 flex items-center justify-between text-white">
        <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-white/15 text-[11px] font-extrabold tracking-wider"><Icon name="check-circle-2" size={12} /> RESOLVED</div>
        <div className="text-[10px] mono opacity-70">SOS-04219</div>
      </div>

      <div className="flex flex-col items-center pt-6 px-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full ring-expand" style={{ background: '#1D9E75' }} />
          <div className="relative w-24 h-24 rounded-full check-pop flex items-center justify-center text-white bg-success-500"
               style={{ boxShadow: '0 16px 40px -10px rgba(29,158,117,0.7)' }}>
            <Icon name="check" size={48} strokeWidth={3} />
          </div>
        </div>
        <div className="mt-5 text-[24px] font-extrabold tracking-tight text-white text-center">SOS telah ditangani</div>
        <div className="text-[12px] text-white/70 mt-1">Total respons time: <span className="font-bold mono text-white">8m 12s</span></div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[color:var(--bg)] rounded-t-3xl -mt-1 mt-6 px-4 pt-5 pb-24">
        {/* Timeline */}
        <div className="surface rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-token flex items-center gap-2">
            <Icon name="history" size={14} className="text-brand-500" />
            <div className="text-[12px] font-bold uppercase tracking-wider">Ringkasan respons</div>
          </div>
          <div className="divide-y divide-[color:var(--border)]">
            {[
              { l:'SOS trigger',   v:'19:34', tone:'danger' },
              { l:'Acknowledged',  v:'19:35 · +1m', tone:'warning' },
              { l:'Responder tiba',v:'19:38 · +4m', tone:'info' },
              { l:'Resolved',      v:'19:42 · +8m', tone:'success' },
              { l:'Responder',     v:'Hadi Wijaya · Safety Officer' },
            ].map(d => (
              <div key={d.l} className="px-4 py-2.5 flex items-center justify-between">
                <div className="text-[12px] text-muted">{d.l}</div>
                <div className="text-[13px] font-semibold mono flex items-center gap-2">
                  {d.tone && <span className={`w-1.5 h-1.5 rounded-full bg-${d.tone}-500`} />}
                  {d.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responder note */}
        <div className="mt-3 surface rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <Icon name="clipboard-edit" size={14} className="text-brand-500" />
            <div className="text-[12px] font-bold uppercase tracking-wider">Catatan responder</div>
          </div>
          <div className="mt-2 text-[13px] leading-relaxed text-[color:var(--text)] italic">
            "Pekerja terkilir kaki kanan di rest area-2. Sudah dievakuasi ke klinik camp, kondisi sadar, tidak ada cedera serius. First aid sudah diberikan, follow-up MCU besok pagi."
          </div>
          <div className="mt-2 text-[11px] text-subtle">— Hadi Wijaya · 19:42</div>
        </div>

        {/* Follow up */}
        <div className="mt-3 surface rounded-2xl p-4">
          <div className="text-[12px] font-bold uppercase tracking-wider">Konfirmasi Anda</div>
          <FollowQ q="Apakah Anda sehat sekarang?" />
          <FollowQ q="Butuh tindakan medis lanjutan?" selected="no" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-token">
        <Btn variant="success" size="lg" full icon="check">Selesai</Btn>
      </div>
    </div>
  );
}

function FollowQ({ q, selected = 'yes' }) {
  return (
    <div className="mt-3">
      <div className="text-[13px] font-semibold mb-2">{q}</div>
      <div className="grid grid-cols-2 gap-2">
        {['yes','no'].map(k => (
          <button key={k}
            className={`h-11 rounded-xl border-2 text-[13px] font-bold inline-flex items-center justify-center gap-1.5
              ${selected===k ? (k==='yes' ? 'bg-success-50 border-success-500 text-success-700' : 'bg-danger-50 border-danger-500 text-danger-700') : 'bg-white border-token text-muted'}`}>
            <Icon name={k==='yes'?'check':'x'} size={14} /> {k==='yes' ? 'Ya' : 'Tidak'}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// C6 — Incident Report
// ============================================================
function Screen_IncidentReport() {
  const [severity, setSeverity] = React.useState(3);
  const cats = [
    { k:'near-miss', l:'Near miss', ic:'alert-triangle', tone:'warning' },
    { k:'first-aid', l:'First aid', ic:'bandage', tone:'info' },
    { k:'medical',   l:'Medical treatment', ic:'heart-pulse', tone:'warning' },
    { k:'lti',       l:'Lost time injury', ic:'user-x', tone:'danger' },
    { k:'property',  l:'Property damage', ic:'wrench', tone:'safety' },
    { k:'env',       l:'Environmental', ic:'leaf', tone:'success' },
  ];
  return (
    <div className="flex-1 flex flex-col relative" style={{ background:'#F2F5FA' }}>
      <ScreenHeader title="Lapor Insiden" sub="Non-emergency · 1×24 jam"
        right={<button className="text-[12px] font-bold text-brand-700 px-3 h-9 rounded-md hover:bg-elev">Draft</button>}
      />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Kategori */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Kategori</div>
          <div className="grid grid-cols-3 gap-2">
            {cats.map((c,i) => {
              const active = c.k === 'near-miss';
              const tones = {
                warning: 'bg-warning-50 text-warning-700 border-warning-500',
                info:    'bg-info-50 text-info-700 border-info-500',
                danger:  'bg-danger-50 text-danger-700 border-danger-500',
                safety:  'bg-safety-50 text-safety-700 border-safety-500',
                success: 'bg-success-50 text-success-700 border-success-500',
              };
              return (
                <button key={c.k} className={`rounded-xl p-2.5 text-left border-2
                  ${active ? tones[c.tone] : 'border-token bg-white'}`}>
                  <Icon name={c.ic} size={18} className={active ? '' : 'text-subtle'} />
                  <div className="text-[11px] font-bold mt-1.5 leading-tight">{c.l}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Severity */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted">Severity</div>
            <span className="text-[11px] mono text-subtle">Skala 1–5</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[1,2,3,4,5].map(n => {
              const colors = ['#1D9E75','#86C26B','#EF9F27','#E27040','#E24B4A'];
              const labels = ['Trivial','Minor','Moderate','Major','Critical'];
              const isActive = n <= severity;
              return (
                <button key={n} onClick={() => setSeverity(n)}
                  className={`rounded-xl h-16 flex flex-col items-center justify-center font-extrabold border-2 transition-all
                    ${n === severity ? 'border-[color:var(--text)] scale-105' : 'border-transparent opacity-80'}`}
                  style={{ background: isActive ? colors[n-1] : '#f2f3f5', color: isActive ? '#fff' : '#5b6472' }}>
                  <div className="text-[20px] mono">{n}</div>
                  <div className="text-[9px] uppercase tracking-wider mt-0.5">{labels[n-1]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tanggal/lokasi */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Tanggal & waktu</div>
            <div className="h-12 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2"><Icon name="calendar-clock" size={16} className="text-subtle" /><span className="flex-1 text-[13px] font-bold mono">19 Mei · 14:22</span></div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Lokasi</div>
            <div className="h-12 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2"><Icon name="map-pin" size={16} className="text-success-500" /><span className="flex-1 text-[13px] font-bold truncate">PIT Bahana · B-4</span></div>
          </div>
        </div>

        {/* Foto */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Foto bukti <span className="text-subtle">(maks 5)</span></div>
          <div className="grid grid-cols-5 gap-2">
            {[1,2].map(n => (
              <div key={n} className="aspect-square rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #CFE0FB, #A6C6F5)' }}>
                  <Icon name="image" size={20} className="text-brand-700" />
                </div>
                <button className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center">
                  <Icon name="x" size={10} />
                </button>
              </div>
            ))}
            <button className="aspect-square rounded-xl border-2 border-dashed border-token-strong text-subtle hover:text-brand-600 hover:border-brand-300 flex flex-col items-center justify-center gap-0.5">
              <Icon name="camera" size={20} />
              <span className="text-[9px] font-bold">Foto</span>
            </button>
            <button className="aspect-square rounded-xl border-2 border-dashed border-token-strong text-subtle hover:text-brand-600 hover:border-brand-300 flex flex-col items-center justify-center gap-0.5">
              <Icon name="image-plus" size={20} />
              <span className="text-[9px] font-bold">Galeri</span>
            </button>
            <div className="aspect-square rounded-xl border border-token bg-elev flex items-center justify-center text-subtle text-[10px] font-bold mono">2/5</div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted">Deskripsi kejadian</div>
            <span className="text-[10px] mono text-subtle">142/500</span>
          </div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="4" defaultValue="Saat manuver mundur unit HD-204 di bench 4, hampir menabrak Light Vehicle yang parkir di blind spot. Operator sempat mendengar klakson dan menghentikan unit ±2m dari LV. Tidak ada korban / kerusakan." className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>

        {/* Korban */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Korban</div>
          <div className="rounded-xl border border-token bg-white p-3 text-center text-[12px] text-subtle">
            Tidak ada korban
            <button className="ml-2 text-brand-700 font-bold inline-flex items-center gap-1">+ Tambah</button>
          </div>
        </div>

        {/* Tindakan & Saksi */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Tindakan sementara</div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="2" defaultValue="LV dipindahkan ke parking area. Stop work, briefing ulang blind-spot dengan operator dan spotter." className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Saksi</div>
          <div className="surface rounded-xl divide-y divide-[color:var(--border)]">
            {[
              { n:'Joko Pranoto', r:'Spotter · NSR-005412', i:'JP' },
              { n:'Pak Hadi',     r:'Supervisor · NSR-001029', i:'HW' },
            ].map(s => (
              <div key={s.n} className="p-2.5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">{s.i}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-bold leading-tight">{s.n}</div>
                  <div className="text-[10px] text-subtle">{s.r}</div>
                </div>
                <button className="w-7 h-7 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="x" size={13} className="text-subtle" /></button>
              </div>
            ))}
            <button className="w-full p-2.5 text-[12px] font-bold text-brand-700 inline-flex items-center justify-center gap-1">
              <Icon name="user-plus" size={13} /> Tambah saksi
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-token grid grid-cols-2 gap-2">
        <button className="h-12 rounded-xl border border-token-strong text-[13px] font-bold text-muted inline-flex items-center justify-center gap-1.5">
          <Icon name="save" size={15} /> Simpan draft
        </button>
        <Btn variant="primary" icon="send">Submit laporan</Btn>
      </div>
    </div>
  );
}

// ============================================================
// C7 — Safety Observation (BBS)
// ============================================================
function Screen_BBSObservation() {
  const [type, setType] = React.useState('unsafe-cond');
  const [sev, setSev] = React.useState('medium');
  const [anon, setAnon] = React.useState(false);
  return (
    <div className="flex-1 flex flex-col relative" style={{ background:'#F2F5FA' }}>
      <ScreenHeader title="Observasi Keselamatan" sub="BBS · Behavior Based Safety" />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Type */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Tipe observasi</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { k:'unsafe-cond', l:'Unsafe Condition',  ic:'alert-triangle', tone:'warning' },
              { k:'unsafe-act',  l:'Unsafe Act',         ic:'user-x',         tone:'danger' },
              { k:'positive',    l:'Positive Obs',       ic:'thumbs-up',     tone:'success' },
            ].map(o => {
              const active = type === o.k;
              const colors = active ? (o.tone==='warning'?'bg-warning-50 text-warning-700 border-warning-500':o.tone==='danger'?'bg-danger-50 text-danger-700 border-danger-500':'bg-success-50 text-success-700 border-success-500') : 'bg-white border-token text-muted';
              return (
                <button key={o.k} onClick={() => setType(o.k)} className={`rounded-xl p-3 text-left border-2 ${colors}`}>
                  <Icon name={o.ic} size={20} />
                  <div className="text-[11px] font-bold mt-2 leading-tight">{o.l}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Foto required */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted">Foto bukti</div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-danger-50 text-danger-700">Wajib</span>
          </div>
          <button className="w-full h-32 rounded-xl border-2 border-dashed border-token-strong bg-white text-subtle hover:text-brand-600 hover:border-brand-300 flex flex-col items-center justify-center gap-1.5">
            <Icon name="camera" size={28} />
            <div className="text-[12px] font-bold">Ambil foto sekarang</div>
            <div className="text-[10px]">Wajib untuk validasi observasi</div>
          </button>
        </div>

        {/* Lokasi */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Lokasi</div>
          <div className="h-12 rounded-xl border border-token-strong bg-white px-3 flex items-center gap-2">
            <Icon name="map-pin" size={16} className="text-success-500" />
            <span className="flex-1 text-[13px] font-bold">PIT Bahana · Bench 4 · Jalan tambang utara</span>
            <span className="inline-flex items-center gap-1 text-[10px] mono text-success-600 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-success-500" />GPS OK</span>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted">Deskripsi pendek</div>
            <span className="text-[10px] mono text-subtle">76/200</span>
          </div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="3" defaultValue="Genangan oli di jalan tambang utara dekat parking unit. Berpotensi slip / unit kehilangan traksi." className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>

        {/* Rekomendasi */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Rekomendasi tindakan</div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="2" defaultValue="Pasang absorbent + sign hazard. Periksa sumber kebocoran di unit terdekat." className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>

        {/* Severity */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Severity</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { k:'low',    l:'Low',    c:'bg-success-500' },
              { k:'medium', l:'Medium', c:'bg-warning-500' },
              { k:'high',   l:'High',   c:'bg-danger-500' },
            ].map(s => (
              <button key={s.k} onClick={() => setSev(s.k)}
                className={`h-12 rounded-xl text-[13px] font-extrabold border-2 transition-all
                  ${sev===s.k ? `${s.c} text-white border-[color:var(--text)] scale-[1.02]` : 'bg-white text-muted border-token'}`}>
                {s.l}
              </button>
            ))}
          </div>
        </div>

        {/* Anonymous toggle */}
        <div className="mt-4 rounded-xl bg-white border border-token p-3 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center
            ${anon ? 'bg-brand-50 text-brand-600' : 'bg-elev text-muted'}`}>
            <Icon name={anon ? 'incognito' : 'user'} size={18} />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold">Laporan anonim</div>
            <div className="text-[11px] text-subtle">Nama Anda tidak ditampilkan ke responder.</div>
          </div>
          <button onClick={() => setAnon(a => !a)}
                  className={`shrink-0 w-11 h-6 rounded-full relative transition-colors ${anon ? 'bg-brand-500' : 'bg-[color:var(--border-strong)]'}`}>
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${anon ? 'translate-x-5' : ''}`} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-token">
        <Btn variant="primary" size="lg" full icon="send">Kirim observasi</Btn>
      </div>
    </div>
  );
}

// ============================================================
// C8 — My Safety History
// ============================================================
const HIST = {
  sos: [
    { id:'SOS-04219', title:'Terkilir di Rest Area-2', t:'19 Mei · 19:34', meta:'Resolved 8m', tone:'success', ic:'check-circle-2' },
    { id:'SOS-04188', title:'Tes tombol bulanan',      t:'02 Mei · 10:00', meta:'Drill · resolved', tone:'gray', ic:'check' },
  ],
  insiden: [
    { id:'INC-2026-04201', title:'Near miss · LV blind-spot', t:'19 Mei · 14:22', meta:'Diproses HSE',     tone:'warning', ic:'alert-triangle' },
    { id:'INC-2026-04019', title:'First aid · luka jari',     t:'04 Apr · 09:14', meta:'Closed',            tone:'success', ic:'check-circle-2' },
    { id:'INC-2025-09812', title:'Property damage · cermin',  t:'18 Des · 16:02', meta:'Closed · Rp 1.2 jt', tone:'success', ic:'check-circle-2' },
  ],
  observasi: [
    { id:'BBS-04891', title:'Genangan oli jalan tambang', t:'19 Mei · 16:48', meta:'In-progress', tone:'info', ic:'activity' },
    { id:'BBS-04702', title:'Positive obs · 5R rapih',    t:'15 Mei · 11:20', meta:'Closed',      tone:'success', ic:'check-circle-2' },
    { id:'BBS-04601', title:'Unsafe act · tanpa helm',    t:'10 Mei · 13:55', meta:'Closed',      tone:'success', ic:'check-circle-2' },
    { id:'BBS-04509', title:'Unsafe condition · railing', t:'04 Mei · 09:30', meta:'Closed',      tone:'success', ic:'check-circle-2' },
  ],
};

function Screen_SafetyHistory() {
  const [tab, setTab] = React.useState('sos');
  const list = HIST[tab];
  return (
    <div className="flex-1 flex flex-col" style={{ background:'#F2F5FA' }}>
      <ScreenHeader title="Safety History" sub={`${HIST.sos.length + HIST.insiden.length + HIST.observasi.length} entri tahun ini`}
        right={<button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="filter" size={18} className="text-subtle" /></button>}
      />

      <div className="bg-white border-b border-token flex">
        {[
          { k:'sos',       l:'SOS',       c: HIST.sos.length },
          { k:'insiden',   l:'Insiden',   c: HIST.insiden.length },
          { k:'observasi', l:'Observasi', c: HIST.observasi.length },
        ].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)}
            className={`relative flex-1 h-12 text-[13px] font-bold ${tab===t.k ? 'text-brand-700':'text-muted'}`}>
            {t.l} <span className="ml-1 text-[10px] font-extrabold opacity-70 mono">{t.c}</span>
            {tab===t.k && <span className="absolute left-6 right-6 -bottom-px h-0.5 bg-brand-500 rounded-t" />}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="px-4 pt-3 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-white border border-token p-3">
          <div className="text-[10px] uppercase tracking-wider font-bold text-success-700">Closed</div>
          <div className="text-[20px] mono font-extrabold mt-0.5">{list.filter(l=>l.tone==='success' || l.tone==='gray').length}</div>
        </div>
        <div className="rounded-xl bg-white border border-token p-3">
          <div className="text-[10px] uppercase tracking-wider font-bold text-info-700">In-progress</div>
          <div className="text-[20px] mono font-extrabold mt-0.5">{list.filter(l=>l.tone==='info' || l.tone==='warning').length}</div>
        </div>
        <div className="rounded-xl bg-white border border-token p-3">
          <div className="text-[10px] uppercase tracking-wider font-bold text-danger-700">Open</div>
          <div className="text-[20px] mono font-extrabold mt-0.5">0</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-2">
        {list.map(h => (
          <div key={h.id} className="surface rounded-2xl p-3.5 flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
              ${h.tone==='success'?'bg-success-50 text-success-600':
                h.tone==='warning'?'bg-warning-50 text-warning-600':
                h.tone==='info'?'bg-info-50 text-info-600':
                'bg-elev text-muted'}`}>
              <Icon name={h.ic} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold leading-tight">{h.title}</div>
              <div className="text-[11px] text-subtle mt-0.5">{h.t}</div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[10px] mono text-subtle">{h.id}</span>
                <StatusPill tone={h.tone === 'gray' ? 'gray' : h.tone} size="sm">{h.meta}</StatusPill>
              </div>
            </div>
            <Icon name="chevron-right" size={16} className="text-subtle mt-2.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

window.Screen_FloatingSOS    = Screen_FloatingSOS;
window.Screen_SOSHold        = Screen_SOSHold;
window.Screen_SOSSending     = Screen_SOSSending;
window.Screen_SOSActive      = Screen_SOSActive;
window.Screen_SOSCancel      = Screen_SOSCancel;
window.Screen_SOSResolved    = Screen_SOSResolved;
window.Screen_IncidentReport = Screen_IncidentReport;
window.Screen_BBSObservation = Screen_BBSObservation;
window.Screen_SafetyHistory  = Screen_SafetyHistory;
