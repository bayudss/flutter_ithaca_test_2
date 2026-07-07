// Typography section.

const TYPE_SCALE = [
  { name: 'Display / H1', size: 48, lh: 56, weight: 800, sample: 'Command Center Tambang Bukit Sangatta', use: 'Hero halaman, judul dashboard utama' },
  { name: 'H2',           size: 32, lh: 40, weight: 700, sample: 'Production Report — Shift Pagi',           use: 'Section header, judul halaman web' },
  { name: 'H3',           size: 24, lh: 32, weight: 700, sample: 'Daily Pre-Shift Safety Briefing',          use: 'Card title, modal header' },
  { name: 'H4',           size: 20, lh: 28, weight: 600, sample: 'Equipment Status Overview',                use: 'Sub-section header' },
  { name: 'H5',           size: 16, lh: 24, weight: 600, sample: 'Approval Pending — 3 items',               use: 'Mobile screen title, list group' },
  { name: 'H6 / Overline',size: 12, lh: 16, weight: 600, sample: 'PRODUCTION KPI',                           use: 'Eyebrow, table header', upper: true, track: '0.08em' },
  { name: 'Body Large',   size: 17, lh: 26, weight: 400, sample: 'Pekerja wajib melapor sebelum memasuki area tambang sesuai SOP K3.', use: 'Body utama di web, paragraf panjang' },
  { name: 'Body',         size: 15, lh: 22, weight: 400, sample: 'Tap untuk lapor temuan unsafe condition di area pit.',                use: 'Body default mobile + web' },
  { name: 'Body Small',   size: 13, lh: 18, weight: 400, sample: 'Sinkronisasi terakhir 2 menit yang lalu.',                            use: 'Secondary text, metadata' },
  { name: 'Caption',      size: 12, lh: 16, weight: 500, sample: 'Required · Min. 8 karakter',                                          use: 'Form helper, timestamp' },
  { name: 'Label',        size: 11, lh: 14, weight: 600, sample: 'NIK PEKERJA',                                                         use: 'Form label, status chip', upper: true, track: '0.06em' },
];

function TypeRow({ row }) {
  const style = {
    fontSize: row.size + 'px',
    lineHeight: row.lh + 'px',
    fontWeight: row.weight,
    letterSpacing: row.size >= 32 ? '-0.02em' : (row.track || (row.size >= 20 ? '-0.01em' : '0')),
    textTransform: row.upper ? 'uppercase' : 'none',
  };
  return (
    <div className="grid grid-cols-12 gap-4 items-baseline py-5 border-b border-token last:border-b-0">
      <div className="col-span-12 md:col-span-3">
        <div className="text-[13px] font-semibold">{row.name}</div>
        <div className="text-[11px] text-subtle mono mt-0.5">{row.size}/{row.lh} · {row.weight}</div>
        <div className="text-[11px] text-subtle mt-1">{row.use}</div>
      </div>
      <div className="col-span-12 md:col-span-9 text-[color:var(--text)] truncate" style={style}>
        {row.sample}
      </div>
    </div>
  );
}

function TypographySection() {
  return (
    <Section
      id="typography"
      eyebrow="02 — Foundation"
      title="Typography"
      description="Inter dipilih karena legibility tinggi di ukuran kecil dan dukungan diakritik Bahasa Indonesia yang baik. Skala konservatif — tidak terlalu banyak ukuran agar konsisten antara aplikasi mobile, web, dan command center."
    >
      <Subsection title="Type scale" hint="Semua ukuran kelipatan dari base 16px. Letter-spacing diketatkan untuk judul, diregangkan untuk overline.">
        <Card className="p-2 md:p-6">
          {TYPE_SCALE.map(r => <TypeRow key={r.name} row={r} />)}
        </Card>
      </Subsection>

      <Subsection title="Font family" hint="Hanya satu typeface — Inter. Monospace JetBrains Mono untuk kode dan angka tabular.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="text-[11px] uppercase tracking-wider text-subtle mb-2">Sans</div>
            <div className="text-[40px] leading-none font-bold tracking-tight">Inter</div>
            <div className="text-[13px] text-muted mt-3">400 Regular · 500 Medium · 600 Semibold · 700 Bold · 800 Extrabold</div>
            <div className="mt-4 grid grid-cols-5 gap-2 text-center">
              {[400,500,600,700,800].map(w => (
                <div key={w} className="border border-token rounded-md py-2">
                  <div style={{ fontWeight: w }} className="text-lg">Aa</div>
                  <div className="text-[10px] text-subtle mono mt-0.5">{w}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-[11px] uppercase tracking-wider text-subtle mb-2">Mono — Tabular</div>
            <div className="text-[40px] leading-none font-bold tracking-tight mono">123,456</div>
            <div className="text-[13px] text-muted mt-3">JetBrains Mono · untuk angka tonase, koordinat GPS, code IDs</div>
            <div className="mt-4 grid grid-cols-3 gap-2 mono text-[13px]">
              <div className="border border-token rounded-md py-2 px-3"><div className="text-subtle text-[10px]">TONNAGE</div>12,847 t</div>
              <div className="border border-token rounded-md py-2 px-3"><div className="text-subtle text-[10px]">NIK</div>NSR-009281</div>
              <div className="border border-token rounded-md py-2 px-3"><div className="text-subtle text-[10px]">COORD</div>-0.512, 117.594</div>
            </div>
          </Card>
        </div>
      </Subsection>
    </Section>
  );
}

window.TypographySection = TypographySection;
