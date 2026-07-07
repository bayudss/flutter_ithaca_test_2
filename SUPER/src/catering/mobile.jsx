// Catering — Mobile (Worker) screens M1-M7.

// ============================================================
// Bottom nav
// ============================================================
function MobileBottomNav({ active = 2 }) {
  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Attendance', icon: 'clock' },
    { name: 'Catering', icon: 'utensils' },
    { name: 'Safety', icon: 'shield' },
    { name: 'Profile', icon: 'user' },
  ];
  return (
    <div className="border-t border-token bg-white grid grid-cols-5 px-2 pt-1.5 pb-1.5">
      {tabs.map((t, i) => (
        <button key={t.name} className="flex flex-col items-center gap-0.5 py-1">
          <Icon name={t.icon} size={22} className={i === active ? 'text-cater-500' : 'text-subtle'} />
          <span className={`text-[10px] font-semibold ${i === active ? 'text-cater-500' : 'text-subtle'}`}>{t.name}</span>
        </button>
      ))}
    </div>
  );
}

// Section header inside phone screens
function MobileTopBar({ title, sub, back=true, right }) {
  return (
    <div className="bg-white px-5 pt-1 pb-3 border-b border-token flex items-center gap-3 shrink-0">
      {back && (
        <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="arrow-left" size={22} />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-bold tracking-tight truncate">{title}</div>
        {sub && <div className="text-[11px] text-subtle truncate">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// ============================================================
// M1 — Catering Home
// ============================================================
function MealSlotCard({ slot, status, time, menu, timeRange, remaining, onClick, accent }) {
  const isClaimed = status === 'claimed';
  const isActive  = status === 'active';
  const isLocked  = status === 'locked';

  const slotLabel = { sarapan:'SARAPAN', siang:'SIANG', malam:'MALAM' }[slot];
  const food = { sarapan:'nasi-uduk', siang:'ayam-bakar', malam:'nasi-goreng' }[slot];

  return (
    <div className={`shrink-0 w-[290px] rounded-2xl overflow-hidden border ${isActive ? 'border-cater-500 ring-2 ring-cater-500/15' : 'border-token'} bg-white relative`}>
      {/* hero */}
      <div className="relative">
        <FoodImage kind={food} ratio="3/2" rounded="rounded-none" />
        {isLocked && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-1">
              <Icon name="lock" size={22} />
            </div>
            <div className="text-[12px] font-bold">Tersedia {time}</div>
          </div>
        )}
        {isClaimed && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 h-7 rounded-full bg-success-500 text-white text-[11px] font-bold">
            <Icon name="check" size={13} /> Sudah diklaim
          </div>
        )}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 h-6 rounded-full bg-black/45 backdrop-blur text-white text-[10px] font-bold tracking-wider">
          <MealIcon slot={slot} size={11} /> {slotLabel}
        </div>
        {isActive && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 h-6 rounded-full bg-cater-500 text-white text-[10px] font-bold uppercase tracking-wider">
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Slot aktif
          </div>
        )}
      </div>
      {/* body */}
      <div className="p-4">
        <div className="text-[10px] text-subtle font-bold uppercase tracking-wider">{timeRange}</div>
        <div className="mt-1 text-[14px] font-bold leading-tight" style={{ textWrap:'balance' }}>{menu}</div>

        {isClaimed && (
          <div className="mt-3 flex items-center gap-1.5 text-[12px] text-success-700">
            <Icon name="check-circle-2" size={14} /> <span className="font-semibold">Diklaim {time}</span> · Mess Griya Praja
          </div>
        )}
        {isActive && (
          <div className="mt-3">
            <button onClick={onClick} className="w-full h-12 rounded-xl bg-cater-500 hover:bg-cater-600 text-white font-extrabold text-[14px] inline-flex items-center justify-center gap-2 shadow-sm">
              <Icon name="qr-code" size={18} /> Klaim sekarang
            </button>
            <div className="mt-2 text-[11px] text-subtle flex items-center gap-1.5">
              <Icon name="clock" size={12} /> Sisa <span className="font-bold text-cater-700">{remaining}</span> dari slot
            </div>
          </div>
        )}
        {isLocked && (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-subtle">
            <Icon name="clock" size={13} /> Tersedia mulai <span className="font-bold mono text-[color:var(--text)]">{time}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Screen_Home() {
  return (
    <div className="flex-1 flex flex-col bg-cream relative">
      {/* Header */}
      <div className="bg-white px-5 pt-1 pb-4 border-b border-token">
        <div className="flex items-center gap-3">
          <button className="-ml-2 w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
            <Icon name="arrow-left" size={22} />
          </button>
          <div className="flex-1">
            <div className="text-[15px] font-bold tracking-tight">Mess &amp; Kantin</div>
            <div className="text-[11px] text-subtle">Selamat siang, Budi 👋</div>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center relative">
            <Icon name="bell" size={20} className="text-subtle" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-danger-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hero menu hari ini */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl overflow-hidden surface relative">
            <FoodImage kind="ayam-bakar" ratio="16/9" rounded="rounded-none" />
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
              <div className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md bg-black/55 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider">
                <Icon name="calendar" size={11} /> Sel · 19 Mei 2026
              </div>
              <div className="inline-flex items-center gap-1 px-2 h-6 rounded-md bg-herb-500 text-white text-[10px] font-bold">
                <Icon name="badge-check" size={11} /> Halal
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/85 via-black/55 to-transparent text-white">
              <div className="text-[10px] uppercase tracking-wider opacity-80 font-bold">Menu hari ini</div>
              <div className="text-[16px] font-extrabold leading-tight">Ayam Bakar Kecap &amp; Sayur Asem</div>
              <div className="mt-1 text-[11px] opacity-90 flex items-center gap-1.5">
                <Icon name="chef-hat" size={12} /> by <span className="font-semibold">Catering Bahari</span>
                <span className="opacity-70">·</span>
                <Icon name="star" size={11} className="text-cater-300" /> 4.6
              </div>
            </div>
          </div>
        </div>

        {/* Today's meal slots */}
        <div className="px-4 mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[13px] font-extrabold tracking-tight">Voucher hari ini</div>
            <div className="text-[11px] text-subtle">Geser →</div>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2" style={{ scrollSnapType:'x mandatory' }}>
            <div style={{ scrollSnapAlign:'start' }}>
              <MealSlotCard slot="sarapan" status="claimed" time="06:15"
                timeRange="05:00 – 07:30 · Sarapan"
                menu="Nasi uduk, telur balado, tempe goreng, kerupuk" />
            </div>
            <div style={{ scrollSnapAlign:'start' }}>
              <MealSlotCard slot="siang" status="active" time="13:30"
                timeRange="11:30 – 13:30 · Siang"
                menu="Nasi putih, ayam bakar, sayur asem, pisang"
                remaining="1j 45m" />
            </div>
            <div style={{ scrollSnapAlign:'start' }}>
              <MealSlotCard slot="malam" status="locked" time="18:00"
                timeRange="18:00 – 20:00 · Malam"
                menu="Nasi goreng spesial, kerupuk, buah potong" />
            </div>
          </div>
        </div>

        {/* Location card */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl p-4 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl relative overflow-hidden shrink-0"
                 style={{ background: 'linear-gradient(135deg, #CDEADC, #9EBCDA)' }}>
              {/* mini map mock */}
              <svg viewBox="0 0 60 60" className="absolute inset-0 w-full h-full">
                <path d="M0 24 Q15 18 30 30 T60 38" stroke="#1F4E79" strokeWidth="1.2" fill="none" opacity="0.45" />
                <path d="M0 42 Q20 50 35 40 T60 18" stroke="#1F4E79" strokeWidth="1" fill="none" opacity="0.3" />
                <circle cx="30" cy="32" r="6" fill="#F39800" />
                <circle cx="30" cy="32" r="2.5" fill="#fff" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Mess terdekat</div>
              <div className="text-[14px] font-extrabold tracking-tight leading-tight">Mess Griya Praja</div>
              <div className="text-[11px] text-muted">200m · Buka 05:00 – 22:00 WIB</div>
            </div>
            <Icon name="navigation" size={18} className="text-cater-600" />
          </div>
        </div>

        {/* Special diet link */}
        <div className="px-4 mt-3">
          <button className="w-full surface rounded-2xl p-3 flex items-center gap-3 hover:bg-elev text-left">
            <div className="w-10 h-10 rounded-lg bg-herb-50 text-herb-600 flex items-center justify-center shrink-0">
              <Icon name="leaf" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold">Saya punya diet khusus</div>
              <div className="text-[11px] text-muted">Vegetarian, alergi, halal — beri tahu dapur</div>
            </div>
            <Icon name="chevron-right" size={16} className="text-subtle" />
          </button>
        </div>

        {/* Gamification stats */}
        <div className="px-4 mt-3">
          <div className="rounded-2xl p-4 text-white relative overflow-hidden"
               style={{ background: 'linear-gradient(135deg, #E68506 0%, #BA6A05 100%)' }}>
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
            <div className="relative">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider opacity-90">
                <Icon name="trophy" size={13} /> Mei 2026
              </div>
              <div className="mt-2 text-[22px] font-extrabold tracking-tight leading-none mono">52 <span className="text-[14px] opacity-80 font-bold">/ 57</span></div>
              <div className="text-[12px] opacity-90">voucher diklaim · streak 14 hari 🔥</div>
              <div className="mt-3 h-2 rounded-full bg-white/25 overflow-hidden">
                <div className="h-full rounded-full bg-white" style={{ width: '91%' }} />
              </div>
              <div className="mt-1.5 text-[10px] opacity-80">91% claim rate · target tim 88%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-[18px]">
        <MobileBottomNav active={2} />
      </div>
    </div>
  );
}

// ============================================================
// M2 — Detail Menu
// ============================================================
function Screen_Detail() {
  return (
    <div className="flex-1 flex flex-col bg-cream">
      {/* Hero image */}
      <div className="relative shrink-0">
        <FoodImage kind="ayam-bakar" ratio="4/3" rounded="rounded-none" />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center">
            <Icon name="arrow-left" size={20} />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center">
              <Icon name="heart" size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center">
              <Icon name="share-2" size={18} />
            </button>
          </div>
        </div>
        {/* dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {[0,1,2,3].map(i => (
            <span key={i} className={`h-1.5 rounded-full ${i===0?'w-5 bg-white':'w-1.5 bg-white/50'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto -mt-5 rounded-t-3xl bg-cream relative z-10">
        <div className="px-5 pt-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-cater-600">Menu Siang · 19 Mei 2026</div>
          <h1 className="text-[22px] font-extrabold tracking-tight leading-tight mt-1">Ayam Bakar Kecap &amp; Sayur Asem</h1>

          {/* tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <StatusPill tone="herb" icon="badge-check">Halal</StatusPill>
            <StatusPill tone="success" icon="scale">Balanced</StatusPill>
            <StatusPill tone="warning" icon="flame">Mild spicy</StatusPill>
            <StatusPill tone="gray" icon="utensils">~650 kcal</StatusPill>
          </div>

          {/* Vendor */}
          <div className="mt-4 surface rounded-2xl p-3 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-cater-50 text-cater-600 flex items-center justify-center">
              <Icon name="chef-hat" size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Vendor catering</div>
              <div className="text-[14px] font-bold">Catering Bahari</div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-[13px] font-bold">
                <Icon name="star" size={14} className="text-cater-500" /> 4.6
              </div>
              <div className="text-[10px] text-subtle">142 review</div>
            </div>
          </div>
        </div>

        {/* Composition */}
        <div className="px-5 mt-4">
          <div className="text-[13px] font-extrabold tracking-tight mb-2">Komposisi porsi</div>
          <div className="surface rounded-2xl overflow-hidden divide-y divide-[color:var(--border)]">
            {[
              { ic:'wheat',  cat:'Karbohidrat', it:'Nasi putih · 200g', kcal:'260 kcal' },
              { ic:'drumstick',cat:'Protein',   it:'Ayam bakar kecap · 1 paha', kcal:'280 kcal' },
              { ic:'leaf',   cat:'Sayur',       it:'Sayur asem · 150g', kcal:'60 kcal' },
              { ic:'apple',  cat:'Buah',        it:'Pisang ambon · 1 buah', kcal:'90 kcal' },
              { ic:'glass-water',cat:'Minum',   it:'Air mineral 600ml', kcal:'—' },
            ].map((r,i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cream text-cater-700 flex items-center justify-center border border-cater-100">
                  <Icon name={r.ic} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{r.cat}</div>
                  <div className="text-[13px] font-semibold leading-tight">{r.it}</div>
                </div>
                <div className="text-[11px] text-muted mono">{r.kcal}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Allergens */}
        <div className="px-5 mt-4">
          <div className="rounded-2xl bg-danger-50 border border-danger-500/20 p-3 flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-danger-500 text-white flex items-center justify-center shrink-0">
              <Icon name="alert-circle" size={16} />
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-extrabold text-danger-700">Mengandung alergen</div>
              <div className="text-[11px] text-danger-700/90 mt-0.5">Kacang tanah, kedelai (kecap). Sambal dapat ditambahkan terpisah.</div>
            </div>
          </div>
        </div>

        {/* Special note */}
        <div className="px-5 mt-3">
          <div className="rounded-2xl bg-herb-50 border border-herb-500/20 p-3 flex items-start gap-2.5">
            <Icon name="info" size={16} className="text-herb-600 mt-0.5 shrink-0" />
            <div className="text-[11.5px] text-herb-700">
              <span className="font-bold">Catatan dapur:</span> Tersedia <span className="font-bold">bubur ayam</span> untuk yang sakit — sampaikan ke petugas saat klaim.
            </div>
          </div>
        </div>

        {/* Rate yesterday */}
        <div className="px-5 mt-4 pb-6">
          <div className="text-[13px] font-extrabold tracking-tight mb-2">Beri rating menu kemarin</div>
          <div className="surface rounded-2xl p-4">
            <div className="text-[12px] text-muted">Senin · Nasi uduk lengkap</div>
            <div className="mt-3 flex items-center justify-center gap-2">
              {[1,2,3,4,5].map(s => (
                <Icon key={s} name="star" size={32} className={s<=4?'text-cater-500':'text-[color:var(--border-strong)]'} />
              ))}
            </div>
            <div className="mt-2 text-center text-[12px] text-muted">Tap untuk beri bintang · komentar opsional</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M3 — Claim Voucher (QR Mode)
// ============================================================
function Screen_ClaimQR() {
  return (
    <div className="flex-1 flex flex-col bg-cream">
      <MobileTopBar title="Klaim Voucher Siang" sub="Tap RFID / scan QR di reader" />

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
        {/* Worker chip */}
        <div className="surface rounded-2xl p-4 flex items-center gap-3">
          <Avatar name="Budi Santoso" size={48} tone="cater" />
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-bold tracking-tight leading-tight">Budi Santoso</div>
            <div className="text-[11px] text-subtle mono">NUS-2024-1234 · Operasional PIT</div>
          </div>
          <StatusPill tone="herb" size="sm" icon="badge-check">Aktif</StatusPill>
        </div>

        {/* QR */}
        <div className="mt-5 surface rounded-3xl p-5 flex flex-col items-center"
             style={{ boxShadow:'0 12px 30px -16px rgba(31,78,121,0.25)' }}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-cater-600 mb-1">Voucher voucher slot SIANG</div>
          <div className="text-[12px] text-muted mb-3">Tunjukkan ke petugas atau arahkan ke reader</div>

          <div className="relative p-3 bg-white rounded-2xl border-2 border-cater-100 qr-pulse">
            <QRCode size={220} accent="#0F273E" />
            {/* Logo overlay */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white p-1.5 shadow-md">
              <BrandMark size={36} />
            </div>
          </div>

          <div className="mt-4 w-full grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-cream p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Voucher ID</div>
              <div className="text-[11px] font-bold mono mt-0.5">VC-260519-1234</div>
            </div>
            <div className="rounded-xl bg-cream p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Berlaku sampai</div>
              <div className="text-[11px] font-bold mono mt-0.5">13:30 hari ini</div>
            </div>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 px-3 h-8 rounded-full bg-warning-50 text-warning-700 text-[11px] font-bold">
            <span className="relative inline-flex w-2 h-2 rounded-full bg-warning-500 pulse-dot text-warning-500" />
            Belum diklaim · menunggu reader
          </div>
        </div>

        {/* Alternative */}
        <div className="mt-4">
          <div className="text-[11px] uppercase tracking-wider text-subtle font-bold mb-2">Atau gunakan kartu</div>
          <button className="w-full surface rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info-50 text-info-600 flex items-center justify-center">
              <Icon name="credit-card" size={20} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-[13px] font-bold">Tap kartu RFID Anda</div>
              <div className="text-[11px] text-muted">Smart Card · Phase 3</div>
            </div>
            <StatusPill tone="gray" size="sm">Beta</StatusPill>
          </button>
        </div>

        {/* Brightness hint */}
        <div className="mt-3 rounded-xl bg-brand-50 text-brand-700 p-3 flex items-start gap-2.5">
          <Icon name="sun" size={16} className="mt-0.5 shrink-0" />
          <div className="text-[11.5px]">
            <span className="font-bold">Brightness auto-maks</span> agar reader dapat memindai di area outdoor.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M4 — Claim Success
// ============================================================
function Screen_Success() {
  return (
    <div className="flex-1 flex flex-col bg-cream relative overflow-hidden">
      {/* confetti */}
      {[
        { left:'12%', d:'.0s', c:'#E68506' },
        { left:'25%', d:'.3s', c:'#1D9E75' },
        { left:'40%', d:'.5s', c:'#F39800' },
        { left:'55%', d:'.2s', c:'#1F4E79' },
        { left:'70%', d:'.6s', c:'#5C8C44' },
        { left:'85%', d:'.4s', c:'#E68506' },
      ].map((c,i) => (
        <span key={i} className="confetti absolute top-12" style={{ left:c.left, animationDelay:c.d, width:8, height:14, background:c.c, borderRadius:2 }} />
      ))}

      <div className="px-5 pt-3 flex items-center justify-between">
        <div className="w-10 h-10" />
        <div className="text-[13px] font-bold">Voucher Siang</div>
        <button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center">
          <Icon name="x" size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 flex flex-col items-center">
        {/* Animated check */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full ring-expand" style={{ background:'#1D9E75' }} />
          <div className="relative w-28 h-28 rounded-full check-pop flex items-center justify-center text-white"
               style={{ background:'#1D9E75', boxShadow:'0 16px 36px -10px rgba(29,158,117,0.55)' }}>
            <Icon name="check" size={56} strokeWidth={3} />
          </div>
        </div>

        <div className="mt-5 text-[22px] font-extrabold tracking-tight text-center">Voucher berhasil diklaim!</div>
        <div className="text-[12.5px] text-muted text-center mt-1">Selamat menikmati makan siang, Budi 🍽️</div>

        {/* Receipt card */}
        <div className="w-full mt-5 rounded-2xl bg-white border border-token relative overflow-hidden">
          {/* ticket edges */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-cream rounded-r-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-cream rounded-l-full" />

          <div className="p-4 border-b border-dashed border-token">
            <FoodImage kind="ayam-bakar" ratio="16/8" />
            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-cater-600">Menu siang</div>
            <div className="text-[15px] font-extrabold tracking-tight">Ayam Bakar Kecap &amp; Sayur Asem</div>
            <div className="text-[11.5px] text-muted">Pisang · Air mineral · ~650 kcal</div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-y-3 gap-x-3 text-[12px]">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Diklaim</div>
              <div className="font-bold mono">12:15 WIB</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Voucher ID</div>
              <div className="font-bold mono">VC-260519-1234</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Lokasi</div>
              <div className="font-semibold">Mess Griya Praja</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtle font-bold">Vendor</div>
              <div className="font-semibold">Catering Bahari</div>
            </div>
          </div>
        </div>

        {/* Quick rate */}
        <div className="w-full mt-4 surface rounded-2xl p-4">
          <div className="text-[12px] font-bold">Bagaimana menu hari ini?</div>
          <div className="mt-2 flex items-center justify-between">
            {[1,2,3,4,5].map(s => (
              <button key={s}>
                <Icon name="star" size={30} className={s<=4?'text-cater-500':'text-[color:var(--border-strong)]'} />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full mt-4 grid grid-cols-2 gap-2">
          <button className="h-12 rounded-xl border border-token-strong bg-white text-brand-700 text-[13px] font-bold inline-flex items-center justify-center gap-2">
            <MealIcon slot="malam" size={16} /> Menu malam
          </button>
          <Btn variant="cater" icon="check">Selesai</Btn>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M5 — Riwayat Klaim
// ============================================================
function Screen_Riwayat() {
  // Build 30-day grid for May 2026 with three meal-slot dots
  const days = [];
  for (let d = 1; d <= 30; d++) {
    const dow = new Date(2026, 4, d).getDay();
    let s = ['c','c','c']; // claimed
    // weekends day-off (some workers may have varying); we'll simulate sundays sarapan only
    if (dow === 0) s = ['c','m','m']; // missed siang+malam
    if (d === 7) s = ['c','c','m'];
    if (d === 12) s = ['c','m','c'];
    if (d === 14) s = ['m','c','c'];
    if (d >= 20) s = ['f','f','f']; // future
    if (d === 19) s = ['c','p','f']; // today: sarapan done, siang pending
    days.push({ d, s });
  }
  const pad = 4; // May 1 = Fri

  const dotColor = (k) => k==='c' ? '#1D9E75' : k==='m' ? '#E24B4A' : k==='p' ? '#EF9F27' : '#E6E8EC';

  return (
    <div className="flex-1 flex flex-col bg-cream">
      <MobileTopBar title="Riwayat Voucher" sub="Mei 2026"
        right={<button className="w-10 h-10 rounded-full hover:bg-elev flex items-center justify-center"><Icon name="download" size={18} className="text-subtle" /></button>}
      />

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Filter tabs */}
        <div className="px-4 pt-3 flex items-center gap-1.5 overflow-x-auto">
          {['7 hari','30 hari','Custom'].map((t,i) => (
            <button key={t} className={`px-3 h-9 rounded-full text-[12px] font-semibold whitespace-nowrap border ${i===1?'bg-cater-500 text-white border-cater-500':'bg-white border-token text-muted'}`}>{t}</button>
          ))}
        </div>

        {/* Summary */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl p-4">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-subtle font-bold">Bulan ini</div>
                <div className="mt-0.5">
                  <span className="text-[28px] font-extrabold mono tracking-tight">78</span>
                  <span className="text-[14px] text-muted font-bold"> / 90</span>
                  <span className="text-[12px] text-muted font-semibold ml-1">voucher</span>
                </div>
              </div>
              <StatusPill tone="herb" icon="trending-up">87% claim rate</StatusPill>
            </div>
            <div className="mt-3 h-2.5 rounded-full bg-cream overflow-hidden flex">
              <div className="h-full bg-cater-500" style={{ width:'31%' }} />
              <div className="h-full bg-herb-500" style={{ width:'33%' }} />
              <div className="h-full bg-brand-500" style={{ width:'22%' }} />
              <div className="h-full bg-[color:var(--border)]" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                { ic:'sunrise', lbl:'Sarapan', val:'28/30', tone:'text-cater-700' },
                { ic:'sun',     lbl:'Siang',   val:'30/30', tone:'text-herb-700' },
                { ic:'moon',    lbl:'Malam',   val:'20/30', tone:'text-brand-700' },
              ].map(s => (
                <div key={s.lbl} className="rounded-lg bg-cream p-2">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-subtle">
                    <Icon name={s.ic} size={11} /> {s.lbl}
                  </div>
                  <div className={`text-[14px] font-extrabold mono mt-0.5 ${s.tone}`}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar heatmap with 3 dots per day */}
        <div className="px-4 mt-3">
          <div className="surface rounded-2xl p-4">
            <div className="grid grid-cols-7 gap-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-subtle mb-2">
              {['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({length:pad}).map((_,i) => <div key={'p'+i} />)}
              {days.map(({d,s}) => {
                const isToday = d===19;
                return (
                  <div key={d} className={`aspect-square rounded-lg flex flex-col items-center justify-center pt-1 pb-1.5 ${isToday?'bg-cater-50 border-2 border-cater-500':'border border-token'}`}>
                    <div className={`text-[11px] font-bold ${isToday?'text-cater-700':''}`}>{d}</div>
                    <div className="flex items-center gap-[3px] mt-0.5">
                      {s.map((k,i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor(k) }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-3 text-[10px] text-muted flex-wrap">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background:'#1D9E75' }} />Claimed</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background:'#EF9F27' }} />Pending</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background:'#E24B4A' }} />Missed</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background:'#E6E8EC' }} />Belum</span>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="px-4 mt-4">
          <div className="text-[10px] uppercase tracking-wider font-bold text-subtle mb-2">Hari ini</div>
          <div className="surface rounded-2xl divide-y divide-[color:var(--border)]">
            {[
              { slot:'sarapan', menu:'Nasi uduk, telur balado', t:'06:15', status:'Diklaim', tone:'success', rating:5 },
              { slot:'siang',   menu:'Ayam bakar, sayur asem',  t:'pending', status:'Slot aktif', tone:'cater', rating:null },
              { slot:'malam',   menu:'Nasi goreng spesial',     t:'18:00',   status:'Tersedia 18:00', tone:'gray', rating:null },
            ].map((e,i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center text-cater-700">
                  <MealIcon slot={e.slot} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold capitalize">{e.slot}</div>
                  <div className="text-[12.5px] font-semibold leading-tight truncate">{e.menu}</div>
                  {e.rating && (
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Icon key={s} name="star" size={10} className={s<=e.rating?'text-cater-500':'text-[color:var(--border-strong)]'} />
                      ))}
                    </div>
                  )}
                </div>
                <StatusPill tone={e.tone} size="sm">{e.status}</StatusPill>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M6 — Special Diet Setup
// ============================================================
function Toggle({ on=false, label, desc, icon, tone='cater', defaultOn }) {
  const [v, setV] = React.useState(defaultOn ?? on);
  return (
    <button onClick={() => setV(!v)} className="w-full text-left flex items-start gap-3 py-3">
      {icon && (
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${v?'bg-herb-50 text-herb-600':'bg-elev text-subtle'}`}>
          <Icon name={icon} size={18} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-bold">{label}</div>
        {desc && <div className="text-[11px] text-muted">{desc}</div>}
      </div>
      <div className={`w-12 h-7 rounded-full p-0.5 transition-all shrink-0 ${v?'bg-herb-500':'bg-[color:var(--border-strong)]'}`}>
        <div className={`w-6 h-6 rounded-full bg-white shadow transition-all ${v?'translate-x-5':''}`} />
      </div>
    </button>
  );
}

function Screen_Diet() {
  const allergies = [
    { id:'peanut', label:'Kacang tanah', sel:true },
    { id:'seafood', label:'Seafood', sel:false },
    { id:'egg', label:'Telur', sel:false },
    { id:'milk', label:'Susu / dairy', sel:false },
    { id:'shellfish', label:'Kerang', sel:false },
    { id:'gluten', label:'Gluten', sel:false },
  ];

  return (
    <div className="flex-1 flex flex-col bg-cream">
      <MobileTopBar title="Diet khusus saya" sub="Berlaku H+1 untuk dapur" />

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
        <div className="rounded-xl bg-cater-50 border border-cater-200 p-3 flex items-start gap-2.5">
          <Icon name="info" size={16} className="text-cater-600 mt-0.5 shrink-0" />
          <div className="text-[11.5px] text-cater-700">
            Perubahan akan berlaku <span className="font-bold">H+1</span> untuk forecast dapur. Untuk hari ini, beri tahu petugas langsung.
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-subtle mb-1">Preferensi</div>
          <div className="surface rounded-2xl px-4 divide-y divide-[color:var(--border)]">
            <Toggle icon="leaf"  label="Vegetarian" desc="Tidak makan daging dan ikan" />
            <Toggle icon="ban"   label="Tidak makan daging sapi" />
            <Toggle icon="ban"   label="Tidak makan daging babi" desc="Default aktif untuk pekerja muslim" defaultOn={true} />
            <Toggle icon="wheat" label="Bebas gluten" />
            <Toggle icon="moon"  label="Sedang puasa" desc="Auto-detect periode Ramadan" />
          </div>
        </div>

        {/* Allergies */}
        <div className="mt-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-subtle mb-1.5">Alergi makanan</div>
          <div className="flex flex-wrap gap-1.5">
            {allergies.map(a => (
              <button key={a.id}
                className={`px-3 h-9 rounded-full border text-[12px] font-semibold inline-flex items-center gap-1.5
                  ${a.sel?'bg-danger-50 border-danger-500/30 text-danger-700':'bg-white border-token text-muted'}`}>
                {a.sel && <Icon name="check" size={12} />}
                {a.label}
              </button>
            ))}
            <button className="px-3 h-9 rounded-full border border-dashed border-token-strong text-muted text-[12px] font-semibold inline-flex items-center gap-1.5">
              <Icon name="plus" size={12} /> Lainnya
            </button>
          </div>
        </div>

        {/* Note for kitchen */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-subtle">Catatan untuk dapur</div>
            <div className="text-[10px] text-subtle mono">42/200</div>
          </div>
          <div className="rounded-xl border border-token-strong bg-white p-3">
            <textarea rows="3" defaultValue="Tolong pisahkan sambal — saya sensitif kacang." className="w-full bg-transparent outline-none text-[13px] resize-none leading-relaxed" />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 rounded-xl bg-danger-50 border border-danger-500/20 p-3 flex items-start gap-2.5">
          <Icon name="alert-circle" size={16} className="text-danger-600 mt-0.5 shrink-0" />
          <div className="text-[11px] text-danger-700">
            <span className="font-bold">Penting:</span> Untuk alergi serius (anafilaksis), lapor langsung ke petugas saat klaim — kami siapkan menu pengganti aman.
          </div>
        </div>

        <div className="mt-5">
          <Btn variant="cater" size="lg" full icon="save">Simpan preferensi</Btn>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// M7 — Walk-in mode (no app)
// ============================================================
function Screen_Walkin() {
  return (
    <div className="flex-1 flex flex-col text-white"
         style={{ background: 'linear-gradient(160deg, #143452 0%, #0F273E 60%, #0A1A29 100%)' }}>
      <div className="px-5 pt-1 flex items-center justify-between">
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
          <Icon name="arrow-left" size={20} />
        </button>
        <div className="text-[14px] font-bold">Klaim tanpa app</div>
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
          <Icon name="help-circle" size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className="text-[12px] font-bold uppercase tracking-[0.18em] opacity-70 mb-2">Mode walk-in</div>
        <div className="text-center text-[22px] font-extrabold tracking-tight leading-tight mb-2">Tap kartu RFID Anda<br/>di reader kantin</div>
        <div className="text-center text-[12.5px] opacity-75 max-w-[280px]">Reader akan otomatis mendeteksi NIK Anda dan klaim voucher slot aktif.</div>

        {/* RFID tap animation */}
        <div className="relative mt-10 w-[200px] h-[160px]">
          {/* reader */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160px] h-[80px] rounded-2xl bg-cater-500/15 border-2 border-cater-500/50 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-cater-500/25 flex items-center justify-center">
              <Icon name="wifi" size={26} className="text-cater-300" />
            </div>
            <div className="absolute -top-1.5 left-3 inline-flex items-center gap-1 px-1.5 h-5 rounded bg-cater-500 text-white text-[9px] font-extrabold uppercase tracking-wider">
              Reader
            </div>
          </div>
          {/* card */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 rotate-[-8deg]" style={{ animation:'qrPulse 2.4s ease-in-out infinite' }}>
            <div className="w-[120px] h-[78px] rounded-xl p-2.5 text-white relative overflow-hidden"
                 style={{ background:'linear-gradient(135deg, #1F4E79 0%, #143452 100%)', boxShadow:'0 10px 24px -10px rgba(0,0,0,0.6)' }}>
              <div className="absolute top-2 right-2 w-5 h-3.5 rounded-sm bg-cater-500/80" />
              <div className="text-[8px] uppercase tracking-wider opacity-70 font-bold">Nusaraya Mining</div>
              <div className="mt-3 mono text-[9px] tracking-wider">NUS-2024-1234</div>
              <div className="text-[10px] font-bold mt-0.5">BUDI SANTOSO</div>
              <Icon name="nfc" size={14} className="absolute bottom-2 right-2 text-cater-300" />
            </div>
          </div>
          {/* tap waves */}
          <div className="absolute bottom-[78px] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-cater-400/60 ring-expand" />
        </div>

        {/* OR */}
        <div className="mt-10 flex items-center gap-3 w-full max-w-[280px]">
          <div className="flex-1 h-px bg-white/20" />
          <div className="text-[11px] uppercase tracking-wider opacity-60 font-bold">Atau</div>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        <div className="mt-4 text-center text-[12.5px] opacity-80 max-w-[280px]">
          Berikan <span className="font-bold mono text-cater-300">NIK Anda</span> ke petugas kantin untuk klaim manual.
        </div>
      </div>
    </div>
  );
}

window.M_Home    = Screen_Home;
window.M_Detail  = Screen_Detail;
window.M_ClaimQR = Screen_ClaimQR;
window.M_Success = Screen_Success;
window.M_Riwayat = Screen_Riwayat;
window.M_Diet    = Screen_Diet;
window.M_Walkin  = Screen_Walkin;
