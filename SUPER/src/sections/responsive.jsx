// Responsive breakpoints section.

const BREAKPOINTS = [
  { name: 'sm', label: 'Mobile',  range: '< 640px',    cols: 4,  cont: 'Full width, 16px gutter',  cls: 'bg-brand-500' },
  { name: 'md', label: 'Tablet',  range: '640–1024px', cols: 8,  cont: 'Max 720px, 24px gutter',    cls: 'bg-brand-400' },
  { name: 'lg', label: 'Desktop', range: '> 1024px',   cols: 12, cont: 'Max 1280px, 32px gutter',   cls: 'bg-brand-300' },
];

function MiniFrame({ label, width, children }) {
  return (
    <div className="rounded-xl border border-token overflow-hidden">
      <div className="bg-elev px-4 h-9 flex items-center justify-between border-b border-token">
        <div className="text-[11px] font-semibold">{label}</div>
        <div className="text-[10px] mono text-subtle">{width}</div>
      </div>
      <div className="p-5 bg-[color:var(--surface)]" style={{ minHeight: 220 }}>
        {children}
      </div>
    </div>
  );
}

function MockCard({ tall=false, title='Card' }) {
  return (
    <div className="surface border border-token rounded-md p-3">
      <div className="text-[10px] font-semibold text-brand-500">{title}</div>
      <div className="mt-1.5 skeleton h-2 w-2/3" style={{ animation: 'none' }} />
      <div className="mt-1.5 skeleton h-2 w-1/2" style={{ animation: 'none' }} />
      {tall && <div className="mt-2 skeleton h-10 w-full" style={{ animation: 'none' }} />}
    </div>
  );
}

function ResponsiveSection() {
  return (
    <Section
      id="responsive"
      eyebrow="05 — Layout"
      title="Responsive breakpoints"
      description="Mobile-first. Tablet command center untuk safety officer di lapangan, desktop untuk supervisor & management di kantor."
    >
      <Subsection title="Breakpoints" hint="Tailwind defaults dengan label kontekstual.">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[color:var(--border)]">
            {BREAKPOINTS.map(b => (
              <div key={b.name} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-[13px] font-semibold">{b.label}</div>
                  <Code>{b.name}</Code>
                </div>
                <div className="text-[11px] mono text-subtle mt-1">{b.range}</div>
                <div className={`mt-4 h-1.5 rounded-full ${b.cls}`} />
                <div className="mt-3 text-[11px] text-muted">{b.cols} kolom · {b.cont}</div>
              </div>
            ))}
          </div>
        </Card>
      </Subsection>

      <Subsection title="Layout pattern — Approval list" hint="Konten yang sama, layout adapt sesuai breakpoint.">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MiniFrame label="Mobile · Single column" width="360pt">
            <div className="space-y-2">
              <MockCard title="Pending · 12" />
              <MockCard title="Approved · 3" />
              <MockCard title="Rejected · 1" />
            </div>
          </MiniFrame>
          <MiniFrame label="Tablet · Two columns" width="768pt">
            <div className="grid grid-cols-2 gap-2">
              <MockCard title="Pending" />
              <MockCard title="Approved" />
              <MockCard title="Rejected" />
              <MockCard title="Expired" />
            </div>
          </MiniFrame>
          <MiniFrame label="Desktop · Sidebar + main" width="1280pt">
            <div className="grid grid-cols-[80px_1fr] gap-2 h-full">
              <div className="bg-elev rounded-md p-2 space-y-2">
                <div className="w-full aspect-square bg-brand-500 rounded" />
                <div className="w-full h-2 bg-border-strong rounded" />
                <div className="w-full h-2 bg-border-strong rounded" />
                <div className="w-full h-2 bg-border-strong rounded" />
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <MockCard title="KPI" />
                  <MockCard title="KPI" />
                  <MockCard title="KPI" />
                </div>
                <MockCard tall title="Approval Table" />
              </div>
            </div>
          </MiniFrame>
        </div>
      </Subsection>

      <Subsection title="Grid example — 12 column" hint="Standar grid untuk web. Container max 1280px dengan 24–32px gutter.">
        <Card className="p-4 overflow-hidden">
          <div className="grid grid-cols-12 gap-2">
            {Array.from({length:12}).map((_,i) => (
              <div key={i} className="h-12 bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 rounded text-[10px] mono text-brand-700 dark:text-brand-300 flex items-center justify-center">
                {i+1}
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-12 gap-2">
            <div className="col-span-3 h-12 bg-brand-500 rounded text-white text-[11px] mono flex items-center justify-center">col-3 · sidebar</div>
            <div className="col-span-9 h-12 bg-brand-200 dark:bg-brand-700 rounded text-brand-900 dark:text-white text-[11px] mono flex items-center justify-center">col-9 · main</div>
          </div>
          <div className="mt-2 grid grid-cols-12 gap-2">
            <div className="col-span-4 h-12 bg-safety-500 rounded text-white text-[11px] mono flex items-center justify-center">col-4</div>
            <div className="col-span-4 h-12 bg-safety-500 rounded text-white text-[11px] mono flex items-center justify-center">col-4</div>
            <div className="col-span-4 h-12 bg-safety-500 rounded text-white text-[11px] mono flex items-center justify-center">col-4</div>
          </div>
        </Card>
      </Subsection>
    </Section>
  );
}

window.ResponsiveSection = ResponsiveSection;
