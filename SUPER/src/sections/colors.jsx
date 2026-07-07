// Colors section — brand, semantic, neutrals, status.

function Swatch({ name, hex, token, textOn = 'light', big = false }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(hex); setCopied(true); setTimeout(()=>setCopied(false), 1200); } catch(e) {}
  };
  const textColor = textOn === 'dark' ? '#0f1115' : '#ffffff';
  return (
    <button
      onClick={onCopy}
      className="group text-left rounded-xl overflow-hidden surface focus-ring transition-shadow hover:shadow-sm"
    >
      <div
        className="relative px-4 flex items-end"
        style={{ background: hex, height: big ? 132 : 84, color: textColor }}
      >
        {big && <div className="absolute top-3 left-4 text-[11px] font-medium opacity-80 mono uppercase tracking-wider">{name}</div>}
        <div className="pb-3 w-full flex items-end justify-between">
          <span className="mono text-[12px] font-medium opacity-95">{hex.toUpperCase()}</span>
          <span className="text-[10px] mono uppercase tracking-wider opacity-70 group-hover:opacity-100">
            {copied ? 'Copied' : 'Copy'}
          </span>
        </div>
      </div>
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div>
          {!big && <div className="text-[13px] font-medium">{name}</div>}
          {token && <div className="text-[11px] text-subtle mono">{token}</div>}
        </div>
      </div>
    </button>
  );
}

function Scale({ label, prefix, shades }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <div className="text-[13px] font-semibold">{label}</div>
        <div className="text-[11px] mono text-subtle">{prefix}-50 → {prefix}-900</div>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-0 rounded-lg overflow-hidden border border-token">
        {shades.map(s => (
          <div key={s.step} className="aspect-[1/1] sm:aspect-[1/1.1] flex flex-col items-start justify-between p-2"
               style={{ background: s.hex, color: s.step >= 400 ? '#fff' : '#0f1115' }}>
            <span className="text-[10px] font-semibold opacity-80">{s.step}</span>
            <span className="text-[9px] mono opacity-70 hidden sm:block">{s.hex.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const BRAND_PRIMARY = [
  { step: 50,  hex: '#EAF1F8' }, { step: 100, hex: '#CFDDEC' }, { step: 200, hex: '#9EBCDA' },
  { step: 300, hex: '#6E9BC7' }, { step: 400, hex: '#4179AE' }, { step: 500, hex: '#1F4E79' },
  { step: 600, hex: '#1A4267' }, { step: 700, hex: '#143452' }, { step: 800, hex: '#0F273E' },
  { step: 900, hex: '#0A1A29' },
];
const BRAND_SAFETY = [
  { step: 50,  hex: '#FEF4E5' }, { step: 100, hex: '#FCE3BC' }, { step: 200, hex: '#FACB87' },
  { step: 300, hex: '#F7B354' }, { step: 400, hex: '#F5A529' }, { step: 500, hex: '#F39800' },
  { step: 600, hex: '#CC7F00' }, { step: 700, hex: '#A36500' }, { step: 800, hex: '#7A4C00' },
  { step: 900, hex: '#523300' },
];
const NEUTRAL = [
  { step: 50,  hex: '#FAFAFA' }, { step: 100, hex: '#F2F3F5' }, { step: 200, hex: '#E6E8EC' },
  { step: 300, hex: '#D0D4DC' }, { step: 400, hex: '#A8AEBB' }, { step: 500, hex: '#7C8493' },
  { step: 600, hex: '#5B6472' }, { step: 700, hex: '#414854' }, { step: 800, hex: '#272C36' },
  { step: 900, hex: '#13161D' },
];

function ColorsSection() {
  return (
    <Section
      id="colors"
      eyebrow="01 — Foundation"
      title="Color"
      description="Palette dibangun untuk kondisi tambang: kontras tinggi di sinar matahari langsung, tetap legible di low-light shift malam. Brand primary tegas seperti seragam corporate, safety orange dipakai hemat untuk aksi penting dan peringatan."
    >
      <Subsection title="Brand" hint="Dua warna identitas. Primary untuk navigasi & header, safety orange hanya untuk aksi prominent.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Swatch name="Mining Blue" hex="#1F4E79" token="brand-500" big />
          <Swatch name="Safety Orange" hex="#F39800" token="safety-500" big />
        </div>
      </Subsection>

      <Subsection title="Semantic — Status" hint="Setiap status selalu dipasangkan dengan icon + text label. Warna saja tidak cukup di lapangan.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Swatch name="Success" hex="#1D9E75" token="success-500" />
          <Swatch name="Warning" hex="#EF9F27" token="warning-500" />
          <Swatch name="Danger"  hex="#E24B4A" token="danger-500"  />
          <Swatch name="Info"    hex="#378ADD" token="info-500"    />
        </div>
      </Subsection>

      <Subsection title="Scales" hint="Setiap warna punya 10 step. Step 500 adalah base, 50–100 untuk background, 600–900 untuk text & emphasis.">
        <div className="space-y-6">
          <Scale label="Brand · Mining Blue" prefix="brand"  shades={BRAND_PRIMARY} />
          <Scale label="Brand · Safety Orange" prefix="safety" shades={BRAND_SAFETY} />
          <Scale label="Neutral · Gray" prefix="gray" shades={NEUTRAL} />
        </div>
      </Subsection>

      <Subsection title="Status Tokens — Workforce" hint="Mapping warna ke status pekerjaan, izin, dan shift yang sering muncul di aplikasi.">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x lg:divide-y-0 lg:divide-x divide-[color:var(--border)]">
            {[
              { dot: '#EF9F27', name: 'Pending Approval', use: 'Pengajuan izin, lembur, claim BBM' },
              { dot: '#1D9E75', name: 'Approved / Active', use: 'Shift aktif, izin disetujui' },
              { dot: '#E24B4A', name: 'Rejected / Expired', use: 'Tolak HR, SIM expired, SIO habis' },
              { dot: '#378ADD', name: 'In Progress',     use: 'Maintenance, inspeksi berjalan' },
              { dot: '#7C8493', name: 'Draft / Idle',    use: 'Belum disubmit, equipment idle' },
              { dot: '#1F4E79', name: 'Scheduled',       use: 'Shift terjadwal, training booked' },
            ].map((s) => (
              <div key={s.name} className="p-4 flex items-start gap-3">
                <span className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.dot }} />
                <div>
                  <div className="text-[13px] font-semibold">{s.name}</div>
                  <div className="text-[12px] text-subtle mt-0.5">{s.use}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Subsection>
    </Section>
  );
}

window.ColorsSection = ColorsSection;
