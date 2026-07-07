// Spacing section — 4px base.

const SPACE_SCALE = [
  { token: 'space-1',  px: 4,  use: 'Icon ↔ text gap, hairline padding' },
  { token: 'space-2',  px: 8,  use: 'Chip padding, tight group' },
  { token: 'space-3',  px: 12, use: 'Form field internal padding' },
  { token: 'space-4',  px: 16, use: 'Card padding, default gap' },
  { token: 'space-6',  px: 24, use: 'Section padding mobile, between cards' },
  { token: 'space-8',  px: 32, use: 'Section padding desktop' },
  { token: 'space-12', px: 48, use: 'Page section vertical rhythm' },
  { token: 'space-16', px: 64, use: 'Hero, large landing gaps' },
];

const RADIUS = [
  { name: 'sm',  px: 4,  use: 'Pill, tag' },
  { name: 'md',  px: 8,  use: 'Button, input' },
  { name: 'lg',  px: 12, use: 'Card' },
  { name: 'xl',  px: 16, use: 'Modal, sheet' },
  { name: 'full',px: 999,use: 'Avatar, FAB' },
];

const ELEVATION = [
  { name: 'sm', shadow: '0 1px 2px rgba(15,17,21,0.06)',                                    use: 'Card resting state' },
  { name: 'md', shadow: '0 4px 12px rgba(15,17,21,0.08), 0 1px 2px rgba(15,17,21,0.04)',     use: 'Dropdown, hover card' },
  { name: 'lg', shadow: '0 12px 32px rgba(15,17,21,0.12), 0 2px 6px rgba(15,17,21,0.06)',    use: 'Modal, popover' },
  { name: 'xl', shadow: '0 24px 48px rgba(15,17,21,0.18), 0 4px 12px rgba(15,17,21,0.08)',   use: 'Sheet, fullscreen overlay' },
];

function SpacingSection() {
  return (
    <Section
      id="spacing"
      eyebrow="03 — Foundation"
      title="Spacing, radius & elevation"
      description="Base 4px. Mayoritas spacing pakai kelipatan 4 atau 8. Touch target minimum 44px — kalau pekerja pakai sarung tangan, target idealnya 48–56px."
    >
      <Subsection title="Spacing scale" hint="4px base. Setiap step ≥2× lebih besar dari step kecil sebelumnya untuk hierarchy yang jelas.">
        <Card className="p-2 md:p-4">
          {SPACE_SCALE.map(s => (
            <div key={s.token} className="grid grid-cols-12 items-center gap-4 px-3 py-3 border-b border-token last:border-b-0">
              <div className="col-span-4 sm:col-span-3">
                <Code>{s.token}</Code>
                <span className="ml-2 mono text-[12px] text-subtle">{s.px}px</span>
              </div>
              <div className="col-span-8 sm:col-span-5 flex items-center">
                <div className="bg-brand-500 dark:bg-brand-400 rounded h-3" style={{ width: s.px }} />
              </div>
              <div className="hidden sm:block col-span-4 text-[12px] text-muted">{s.use}</div>
            </div>
          ))}
        </Card>
      </Subsection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Subsection title="Radius" hint="Border-radius scale, dari pill ke fully rounded.">
          <Card className="p-4">
            <div className="grid grid-cols-5 gap-3">
              {RADIUS.map(r => (
                <div key={r.name} className="text-center">
                  <div className="aspect-square border-2 border-brand-500 bg-brand-50 dark:bg-brand-900/30 dark:border-brand-400 mx-auto" style={{ borderRadius: r.px }} />
                  <div className="mt-2 text-[12px] font-semibold">{r.name}</div>
                  <div className="text-[10px] text-subtle mono">{r.px === 999 ? '∞' : r.px + 'px'}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-5 gap-3 text-center">
              {RADIUS.map(r => (
                <div key={r.name} className="text-[10px] text-subtle">{r.use}</div>
              ))}
            </div>
          </Card>
        </Subsection>

        <Subsection title="Elevation" hint="Shadow tokens. Dipakai hemat — tambang sering tampilan flat untuk hemat baterai OLED.">
          <Card className="p-4">
            <div className="grid grid-cols-4 gap-3">
              {ELEVATION.map(e => (
                <div key={e.name} className="text-center">
                  <div
                    className="aspect-square mx-auto rounded-lg bg-elev"
                    style={{ boxShadow: e.shadow, background: 'var(--surface)', width: '100%' }}
                  />
                  <div className="mt-2 text-[12px] font-semibold">elev-{e.name}</div>
                  <div className="text-[10px] text-subtle mt-0.5 leading-tight">{e.use}</div>
                </div>
              ))}
            </div>
          </Card>
        </Subsection>
      </div>

      <Subsection title="Touch targets" hint="Sarung tangan tambang = tap area besar. Selalu ≥44pt, prefer 48–56pt untuk aksi utama.">
        <Card className="p-6">
          <div className="flex flex-wrap items-end gap-4">
            {[
              { size: 32, label: '32 — Avoid', tone: 'danger' },
              { size: 44, label: '44 — Minimum', tone: 'warning' },
              { size: 48, label: '48 — Recommended', tone: 'success' },
              { size: 56, label: '56 — Primary', tone: 'brand' },
              { size: 72, label: '72 — Critical (SOS)', tone: 'danger' },
            ].map(t => {
              const bg = {
                danger:  '#E24B4A', warning: '#EF9F27', success: '#1D9E75', brand: '#1F4E79',
              }[t.tone];
              return (
                <div key={t.size} className="text-center">
                  <div className="rounded-full flex items-center justify-center text-white font-bold"
                       style={{ width: t.size, height: t.size, background: bg, fontSize: Math.min(t.size/3, 18) }}>
                    {t.size}
                  </div>
                  <div className="text-[11px] mt-2 text-muted">{t.label}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </Subsection>
    </Section>
  );
}

window.SpacingSection = SpacingSection;
