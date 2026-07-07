// All sections for the Dev Reference page.

// ============================================================
// 1. COLORS
// ============================================================
const TAILWIND_CONFIG = `// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#EAF1F8', 100: '#CFDDEC', 200: '#9EBCDA',
          300: '#6E9BC7', 400: '#4179AE', 500: '#1F4E79', // base
          600: '#1A4267', 700: '#143452', 800: '#0F273E', 900: '#0A1A29',
        },
        safety: {
          50:  '#FEF4E5', 100: '#FCE3BC', 200: '#FACB87',
          300: '#F7B354', 400: '#F5A529', 500: '#F39800', // base
          600: '#CC7F00', 700: '#A36500', 800: '#7A4C00', 900: '#523300',
        },
        success: { 50:'#E8F6F0', 500:'#1D9E75', 600:'#178060', 700:'#11624A' },
        warning: { 50:'#FEF4DE', 500:'#EF9F27', 600:'#C8821A', 700:'#946011' },
        danger:  { 50:'#FBE8E8', 500:'#E24B4A', 600:'#BE3A39', 700:'#8E2A29' },
        info:    { 50:'#E6F0FB', 500:'#378ADD', 600:'#2A6FB8', 700:'#1F548B' },
      },
    },
  },
} satisfies Config;`;

const CSS_VARS = `/* src/styles/tokens.css */
:root {
  /* Surfaces */
  --bg:           #f5f6f8;
  --bg-elev:      #fafafa;
  --surface:      #ffffff;
  --border:       #e6e8ec;
  --border-strong:#d0d4dc;

  /* Text */
  --text:         #0f1115;
  --text-muted:   #5b6472;
  --text-subtle:  #8b94a2;

  /* Focus / interaction */
  --ring:         rgba(31, 78, 121, 0.35);
  --radius-md:    8px;
  --radius-lg:    12px;
  --radius-xl:    16px;
}

.dark {
  --bg:           #0b0d12;
  --bg-elev:      #11141b;
  --surface:      #141821;
  --border:       #232938;
  --border-strong:#2f3648;
  --text:         #e8ecf3;
  --text-muted:   #98a1b2;
  --text-subtle:  #6c7589;
  --ring:         rgba(110, 155, 199, 0.45);
}`;

const STATUS_MAP = `// src/lib/status-color.ts
export type Status =
  | 'pending' | 'approved' | 'rejected'
  | 'in-progress' | 'expired' | 'draft' | 'scheduled';

export const statusColor: Record<Status, {
  bg: string; text: string; border: string; icon: string;
}> = {
  pending:     { bg:'bg-warning-50', text:'text-warning-700', border:'border-warning-500/25', icon:'Clock' },
  approved:    { bg:'bg-success-50', text:'text-success-700', border:'border-success-500/20', icon:'CheckCircle2' },
  rejected:    { bg:'bg-danger-50',  text:'text-danger-700',  border:'border-danger-500/20',  icon:'XCircle' },
  'in-progress': { bg:'bg-info-50', text:'text-info-700',   border:'border-info-500/20',    icon:'Activity' },
  expired:     { bg:'bg-gray-50',    text:'text-gray-700',    border:'border-gray-500/20',    icon:'CalendarX' },
  draft:       { bg:'bg-gray-50',    text:'text-gray-700',    border:'border-gray-500/20',    icon:'File' },
  scheduled:   { bg:'bg-brand-50',   text:'text-brand-700',   border:'border-brand-500/20',   icon:'Calendar' },
};`;

function ColorsSection() {
  const brandStops = [
    { s: 50,  hex:'#EAF1F8' }, { s: 100, hex:'#CFDDEC' }, { s: 200, hex:'#9EBCDA' },
    { s: 300, hex:'#6E9BC7' }, { s: 400, hex:'#4179AE' }, { s: 500, hex:'#1F4E79' },
    { s: 600, hex:'#1A4267' }, { s: 700, hex:'#143452' }, { s: 800, hex:'#0F273E' }, { s: 900, hex:'#0A1A29' },
  ];
  return (
    <Section id="colors" eyebrow="01" title="Color tokens" description="Brand colors, semantic palette, dan status mapping. Copy tailwind.config + CSS variables langsung ke proyek.">
      <Subsection title="Brand swatches" hint="Mining Blue (primary) · Safety Orange (secondary)">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-0 rounded-lg overflow-hidden border border-token">
          {brandStops.map(b => (
            <div key={b.s} className="aspect-square flex flex-col items-start justify-between p-2"
                 style={{ background: b.hex, color: b.s >= 400 ? '#fff' : '#0f1115' }}>
              <span className="text-[10px] font-bold opacity-80">{b.s}</span>
              <span className="text-[9px] mono opacity-70 hidden sm:block">{b.hex}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[
            { name:'success', hex:'#1D9E75' },
            { name:'warning', hex:'#EF9F27' },
            { name:'danger',  hex:'#E24B4A' },
            { name:'info',    hex:'#378ADD' },
          ].map(s => (
            <div key={s.name} className="rounded-lg overflow-hidden border border-token">
              <div className="h-12" style={{ background: s.hex }} />
              <div className="px-2.5 py-1.5">
                <div className="text-[11px] font-bold">{s.name}</div>
                <div className="text-[10px] mono text-subtle">{s.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Tailwind config" hint="Extend palette di tailwind.config.ts">
        <CodeBlock lang="tsx" filename="tailwind.config.ts" code={TAILWIND_CONFIG} />
      </Subsection>

      <Subsection title="CSS variables" hint="Untuk theming runtime (light/dark)">
        <CodeBlock lang="css" filename="tokens.css" code={CSS_VARS} />
      </Subsection>

      <Subsection title="Status → color map" hint="Single source of truth — pakai di badge, indicator, dll">
        <CodeBlock lang="tsx" filename="lib/status-color.ts" code={STATUS_MAP} />
      </Subsection>
    </Section>
  );
}

// ============================================================
// 2. SPACING
// ============================================================
const SPACING_CONFIG = `// tailwind.config.ts (extend.spacing)
// Tailwind default scale (4px base): 0,1,2,3,4,5,6,8,10,12,16,20,24,32,…
// Tambahan custom Nusaraya:
spacing: {
  'tap':         '44px',   // min tap target — buttons, links
  'tap-glove':   '56px',   // gloved-friendly — primary actions
  'sos':         '78px',   // SOS button size
  'page-x':      '20px',   // mobile gutter
  'page-x-md':   '32px',   // tablet gutter
  'page-x-lg':   '48px',   // desktop gutter
  'card':        '20px',   // standard card padding
  'safe-bottom': 'env(safe-area-inset-bottom)', // iOS notch
},`;

const COMPONENT_SPACING = `// src/lib/spacing.ts
// Presets per component — pakai sebagai shortcut className
export const spacing = {
  page:        'px-page-x md:px-page-x-md lg:px-page-x-lg py-6',
  section:     'mt-12 md:mt-16',
  cardPadding: 'p-5',
  cardGap:     'space-y-3',
  formGap:     'space-y-4',
  rowGap:      'gap-3',
  tap:         'h-tap min-w-tap',
  primaryBtn:  'h-tap-glove px-5 text-[15px] font-extrabold',
} as const;`;

function SpacingSection() {
  const scale = [
    { t:'space-1',  px:4,  use:'Icon ↔ text gap' },
    { t:'space-2',  px:8,  use:'Chip padding' },
    { t:'space-3',  px:12, use:'Form internal' },
    { t:'space-4',  px:16, use:'Card padding, default' },
    { t:'space-5',  px:20, use:'card padding (preset)' },
    { t:'space-6',  px:24, use:'Section / between cards' },
    { t:'space-8',  px:32, use:'Section desktop' },
    { t:'space-12', px:48, use:'Page rhythm' },
    { t:'space-16', px:64, use:'Hero, landing' },
  ];
  return (
    <Section id="spacing" eyebrow="02" title="Spacing tokens" description="4px base. Tap-target minimum 44px, primary actions di gloved-friendly 56px.">
      <Subsection title="Scale visual">
        <div className="surface rounded-xl p-3">
          {scale.map(s => (
            <div key={s.t} className="grid grid-cols-12 items-center gap-3 px-3 py-2 border-b border-token last:border-b-0">
              <div className="col-span-4 sm:col-span-3"><IC>{s.t}</IC><span className="ml-2 mono text-[11px] text-subtle">{s.px}px</span></div>
              <div className="col-span-4 sm:col-span-5"><div className="bg-brand-500 h-2.5 rounded" style={{ width: s.px }} /></div>
              <div className="col-span-12 sm:col-span-4 text-[11px] text-muted">{s.use}</div>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Custom spacing extension" hint="Tap targets, page gutters, SOS button size — semua pakai token agar konsisten">
        <CodeBlock lang="tsx" filename="tailwind.config.ts (excerpt)" code={SPACING_CONFIG} />
      </Subsection>

      <Subsection title="Component spacing presets" hint="Hindari spacing magic-number di komponen — pakai preset">
        <CodeBlock lang="tsx" filename="lib/spacing.ts" code={COMPONENT_SPACING} />
      </Subsection>

      <Callout tone="warning" icon="hand" title="Gloved hands">
        Pekerja tambang sering pakai sarung tangan. <strong>Tap target minimum 44pt</strong>, ideal 48–56pt untuk aksi utama. SOS button 78pt.
      </Callout>
    </Section>
  );
}

// ============================================================
// 3. COMPONENTS
// ============================================================
const BUTTON_CODE = `// src/components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold ' +
  'transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 ' +
  'disabled:opacity-40 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:   'bg-brand-500 text-white hover:bg-brand-600 shadow-sm',
        secondary: 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50',
        ghost:     'text-brand-700 hover:bg-brand-50',
        danger:    'bg-danger-500 text-white hover:bg-danger-600 shadow-sm',
        safety:    'bg-safety-500 text-white hover:bg-safety-600 shadow-sm',
      },
      size: {
        sm: 'h-9 px-3 text-[13px]',
        md: 'h-11 px-4 text-[14px]',  // 44pt tap target
        lg: 'h-14 px-5 text-[15px]',  // gloved-friendly
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}`;

const CARD_CODE = `// src/components/ui/card.tsx
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-xl bg-white border border-[color:var(--border)] shadow-sm', className)} {...props} />;
}
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 py-3 border-b border-[color:var(--border)] flex items-center justify-between', className)} {...props} />;
}
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5', className)} {...props} />;
}
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 py-3 border-t border-[color:var(--border)] bg-[color:var(--bg-elev)]', className)} {...props} />;
}`;

const BADGE_CODE = `// src/components/ui/status-badge.tsx
import { statusColor, type Status } from '@/lib/status-color';
import * as Icons from 'lucide-react';

export function StatusBadge({ status, children }: { status: Status; children?: React.ReactNode }) {
  const c = statusColor[status];
  const IconCmp = (Icons as any)[c.icon];
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-[11px] font-semibold border',
      c.bg, c.text, c.border,
    )}>
      <IconCmp size={12} />
      {children ?? status}
    </span>
  );
}

// Usage:
// <StatusBadge status="pending">Pending SPV</StatusBadge>
// <StatusBadge status="approved">Approved</StatusBadge>`;

const AVATAR_CODE = `// src/components/ui/avatar.tsx
export function Avatar({
  src, name, size = 40,
}: { src?: string; name: string; size?: number }) {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  if (src) {
    return <img src={src} alt={name}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />;
  }
  return (
    <div
      className="rounded-full bg-brand-500 text-white flex items-center justify-center font-bold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}`;

function ComponentsSection() {
  // Preview helpers
  const btnRow = (
    <div className="flex flex-wrap items-center gap-2">
      <button className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-brand-500 text-white text-[14px] font-bold shadow-sm">Primary</button>
      <button className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white text-brand-700 border border-brand-200 text-[14px] font-bold">Secondary</button>
      <button className="inline-flex items-center gap-2 h-11 px-4 rounded-xl text-brand-700 text-[14px] font-bold hover:bg-brand-50">Ghost</button>
      <button className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-danger-500 text-white text-[14px] font-bold shadow-sm"><Icon name="x" size={16} />Danger</button>
      <button className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-safety-500 text-white text-[14px] font-bold shadow-sm"><Icon name="alert-triangle" size={16} />Safety</button>
    </div>
  );

  const cards = (
    <div className="space-y-2">
      <div className="surface rounded-xl p-4">
        <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Basic card</div>
        <div className="text-[14px] font-bold mt-0.5">Content goes here</div>
      </div>
      <div className="surface rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-token text-[12px] font-bold flex items-center justify-between">
          With header <span className="text-subtle font-normal">action</span>
        </div>
        <div className="p-4 text-[12px] text-muted">Body content</div>
      </div>
    </div>
  );

  const badges = (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-[11px] font-semibold border bg-warning-50 text-warning-700 border-warning-500/25"><Icon name="clock" size={12} />Pending</span>
      <span className="inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-[11px] font-semibold border bg-success-50 text-success-700 border-success-500/20"><Icon name="check-circle-2" size={12} />Approved</span>
      <span className="inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-[11px] font-semibold border bg-danger-50 text-danger-700 border-danger-500/20"><Icon name="x-circle" size={12} />Rejected</span>
      <span className="inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-[11px] font-semibold border bg-info-50 text-info-700 border-info-500/20"><Icon name="activity" size={12} />In progress</span>
    </div>
  );

  const avatars = (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-[11px]" style={{ width: 32, height: 32 }}>BS</div>
      <div className="rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-[14px]" style={{ width: 44, height: 44 }}>SR</div>
      <div className="rounded-full bg-safety-500 text-white flex items-center justify-center font-bold text-[18px]" style={{ width: 56, height: 56 }}>HW</div>
      <div className="text-[11px] text-subtle ml-2">Fallback initial = 2 huruf pertama</div>
    </div>
  );

  return (
    <Section id="components" eyebrow="03" title="Component variants" description="Resep komponen utama dengan cva (class-variance-authority). Plug ke shadcn/ui di proyek.">
      <Subsection title="Button" hint="5 varian × 3 ukuran · 44pt minimum">
        <Preview lang="tsx" code={BUTTON_CODE}>{btnRow}</Preview>
      </Subsection>
      <Subsection title="Card" hint="Basic · with header · footer">
        <Preview lang="tsx" code={CARD_CODE}>{cards}</Preview>
      </Subsection>
      <Subsection title="Status Badge" hint="Pakai mapping di section 01">
        <Preview lang="tsx" code={BADGE_CODE} minH={120}>{badges}</Preview>
      </Subsection>
      <Subsection title="Avatar with fallback" hint="Gambar gagal load → fallback ke inisial">
        <Preview lang="tsx" code={AVATAR_CODE} minH={140}>{avatars}</Preview>
      </Subsection>
    </Section>
  );
}

// ============================================================
// 4. BREAKPOINTS
// ============================================================
const BP_CODE = `// Tailwind default breakpoints (mobile-first):
// sm:  640px    — landscape phone, small tablet
// md:  768px    — tablet
// lg:  1024px   — small desktop, command center tablet
// xl:  1280px   — desktop
// 2xl: 1536px   — large desktop

// Pattern 1 — Show/hide
<nav className="md:flex hidden">Desktop nav</nav>
<button className="md:hidden">Mobile hamburger</button>

// Pattern 2 — Stack → row
<div className="flex flex-col md:flex-row gap-4">
  <Sidebar />
  <Main />
</div>

// Pattern 3 — Grid columns scale
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
  {kpis.map(k => <KPICard key={k.id} {...k} />)}
</div>

// Pattern 4 — Typography scale
<h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
  Production Report
</h1>

// Pattern 5 — Container width
<div className="max-w-screen-lg mx-auto px-4 md:px-8">
  {/* content */}
</div>`;

function BreakpointsSection() {
  return (
    <Section id="breakpoints" eyebrow="04" title="Responsive breakpoints" description="Mobile-first. Setiap breakpoint memetakan ke jenis device tertentu di lapangan.">
      <Subsection title="Device mapping">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { n:'sm', w:'640px', l:'Landscape phone', use:'KPI 2-col, list dense' },
            { n:'md', w:'768px', l:'Tablet portrait', use:'Sidebar collapsed, 2-col forms' },
            { n:'lg', w:'1024px', l:'Tablet landscape · CC', use:'Command center, sidebar expand' },
            { n:'xl', w:'1280px', l:'Desktop HR/Admin', use:'12-col grid, max-w-screen-xl' },
          ].map(bp => (
            <div key={bp.n} className="surface rounded-xl p-4">
              <div className="flex items-center justify-between">
                <IC>{bp.n}:</IC>
                <span className="mono text-[10px] text-subtle">≥ {bp.w}</span>
              </div>
              <div className="text-[12px] font-bold mt-2">{bp.l}</div>
              <div className="text-[11px] text-subtle mt-0.5">{bp.use}</div>
            </div>
          ))}
        </div>
      </Subsection>
      <Subsection title="Common patterns" hint="Mobile-first: default = small, prefix di breakpoint atas">
        <CodeBlock lang="tsx" code={BP_CODE} />
      </Subsection>
    </Section>
  );
}

// ============================================================
// 5. ICONS
// ============================================================
const ICON_IMPORT = `// Import per icon (tree-shake friendly)
import { ShieldCheck, AlertOctagon, MapPin, QrCode } from 'lucide-react';

<ShieldCheck size={20} strokeWidth={2} className="text-brand-500" />`;

const ICON_GROUPS = [
  { g:'Authentication', items: [
    { n:'user',         u:'Form NIK / profile' },
    { n:'lock',         u:'Password field' },
    { n:'key-round',    u:'Reset password' },
    { n:'shield-check', u:'SSO · MFA · keamanan' },
    { n:'fingerprint',  u:'Biometric login' },
    { n:'scan-face',    u:'Face ID setup' },
    { n:'log-in',       u:'Sign in button' },
    { n:'log-out',      u:'Clock-out, sign out' },
  ]},
  { g:'Attendance & Time', items: [
    { n:'clock',        u:'Default jam' },
    { n:'sunrise',      u:'Shift pagi' },
    { n:'sun',          u:'Shift siang' },
    { n:'moon',         u:'Shift malam' },
    { n:'map-pin',      u:'Lokasi GPS / geofence' },
    { n:'qr-code',      u:'Scan QR clock-in' },
    { n:'nfc',          u:'Tap kartu RFID' },
    { n:'calendar-clock',u:'Riwayat absen' },
  ]},
  { g:'Leave & ESS', items: [
    { n:'calendar',         u:'Date picker' },
    { n:'calendar-days',    u:'Cuti' },
    { n:'calendar-plus',    u:'Ajukan cuti' },
    { n:'clipboard-check',  u:'Approval done' },
    { n:'receipt',          u:'Payslip' },
    { n:'wallet',           u:'Payroll' },
    { n:'briefcase',        u:'ESS modul' },
    { n:'file-text',        u:'Detail · slip' },
  ]},
  { g:'Safety & Emergency', items: [
    { n:'alert-triangle',   u:'Warning' },
    { n:'alert-octagon',    u:'SOS · critical' },
    { n:'shield-alert',     u:'Safety priority' },
    { n:'siren',            u:'Emergency state' },
    { n:'fire-extinguisher',u:'K3 / fire safety' },
    { n:'hard-hat',         u:'Worker badge / PPE' },
    { n:'heart-pulse',      u:'Medical · MCU' },
    { n:'bandage',          u:'First aid' },
  ]},
  { g:'Navigation', items: [
    { n:'home',          u:'Bottom nav home' },
    { n:'bell',          u:'Notification' },
    { n:'settings',      u:'Settings' },
    { n:'menu',          u:'Hamburger' },
    { n:'search',        u:'Search bar' },
    { n:'chevron-right', u:'List affordance' },
    { n:'arrow-left',    u:'Back button' },
    { n:'more-horizontal',u:'Overflow menu' },
  ]},
  { g:'Action', items: [
    { n:'plus',          u:'Add item' },
    { n:'check',         u:'Confirm · done' },
    { n:'x',             u:'Cancel · close' },
    { n:'trash-2',       u:'Delete' },
    { n:'edit-3',        u:'Edit · koreksi' },
    { n:'download',      u:'Download PDF' },
    { n:'upload',        u:'Upload bukti' },
    { n:'send',          u:'Submit · kirim' },
  ]},
];

function IconsSection() {
  return (
    <Section id="icons" eyebrow="05" title="Icons library" description="Lucide React. 8.5k icons, tree-shake friendly. Berikut yang paling sering dipakai di SuperApps Nusaraya.">
      <Subsection title="Setup">
        <div className="space-y-2">
          <CodeBlock lang="bash" code={`$ npm install lucide-react`} />
          <CodeBlock lang="tsx" code={ICON_IMPORT} />
        </div>
      </Subsection>

      {ICON_GROUPS.map(g => (
        <Subsection key={g.g} title={g.g} hint={`${g.items.length} icons`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {g.items.map(it => (
              <div key={it.n} className="surface rounded-lg p-3 flex items-center gap-3 hover:border-brand-300 transition-colors">
                <div className="w-10 h-10 rounded-md bg-elev flex items-center justify-center text-brand-600 shrink-0">
                  <Icon name={it.n} size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-mono font-bold truncate">{it.n}</div>
                  <div className="text-[10px] text-subtle truncate">{it.u}</div>
                </div>
              </div>
            ))}
          </div>
        </Subsection>
      ))}
    </Section>
  );
}

// ============================================================
// 6. FORM PATTERNS
// ============================================================
const INPUT_CODE = `// src/components/ui/input-field.tsx
interface InputFieldProps {
  label: string;
  hint?: string;
  error?: string;
  icon?: LucideIcon;
  required?: boolean;
}

export function InputField({ label, hint, error, icon: IconCmp, required, ...rest }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--text-muted)] mb-1.5 inline-block">
        {label} {required && <span className="text-danger-500">*</span>}
      </label>
      <div className={cn(
        'flex items-center h-11 rounded-xl bg-white px-3 gap-2 transition-shadow',
        'focus-within:shadow-[0_0_0_3px_var(--ring)]',
        error ? 'border-2 border-danger-500' : 'border border-[color:var(--border-strong)]',
      )}>
        {IconCmp && <IconCmp size={16} className="text-[color:var(--text-subtle)]" />}
        <input id={id} aria-invalid={!!error}
               className="flex-1 bg-transparent outline-none text-[14px]" {...rest} />
      </div>
      {(hint || error) && (
        <div className={cn('text-[11px] mt-1', error ? 'text-danger-600' : 'text-[color:var(--text-subtle)]')}>
          {error || hint}
        </div>
      )}
    </div>
  );
}`;

const DATE_RANGE_CODE = `// src/components/ui/date-range-picker.tsx
// Pakai react-day-picker + popover dari shadcn
import { DateRange } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';

export function DateRangePicker({ value, onChange }: {
  value: DateRange | undefined;
  onChange: (r: DateRange | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="w-full justify-start">
          <CalendarIcon size={16} />
          {value?.from ? (
            value.to ? \`\${format(value.from)} – \${format(value.to)}\` : format(value.from)
          ) : 'Pilih tanggal'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <DayPicker mode="range" selected={value} onSelect={onChange}
                   numberOfMonths={2} weekStartsOn={1}
                   disabled={(d) => d < startOfToday()} />
      </PopoverContent>
    </Popover>
  );
}`;

const PHOTO_UPLOAD_CODE = `// src/components/ui/photo-upload.tsx
export function PhotoUpload({
  max = 5, value = [], onChange,
}: { max?: number; value?: File[]; onChange: (files: File[]) => void }) {
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const next = [...value, ...Array.from(e.dataTransfer.files)].slice(0, max);
    onChange(next);
  };
  return (
    <div className="grid grid-cols-5 gap-2" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
      {value.map((f, i) => (
        <Thumb key={i} file={f} onRemove={() => onChange(value.filter((_, j) => j !== i))} />
      ))}
      {value.length < max && (
        <label className="aspect-square rounded-xl border-2 border-dashed border-[color:var(--border-strong)]
                          flex flex-col items-center justify-center gap-1
                          text-[color:var(--text-subtle)] hover:text-brand-600 hover:border-brand-300 cursor-pointer">
          <Camera size={20} />
          <span className="text-[10px] font-bold">Foto</span>
          <input type="file" accept="image/*" capture="environment" className="hidden"
            onChange={(e) => e.target.files && onChange([...value, ...Array.from(e.target.files)].slice(0, max))} />
        </label>
      )}
    </div>
  );
}`;

const OTP_CODE = `// src/components/ui/otp-input.tsx
export function OTPInput({ length = 6, value, onChange }: {
  length?: number; value: string; onChange: (v: string) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handle = (i: number, v: string) => {
    if (!/^\\d?$/.test(v)) return;
    const next = value.split('');
    next[i] = v;
    const joined = next.join('').slice(0, length);
    onChange(joined);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };
  const onKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  return (
    <div className="flex gap-2 justify-between">
      {Array.from({ length }).map((_, i) => (
        <input key={i} ref={(el) => (refs.current[i] = el)}
               value={value[i] ?? ''} inputMode="numeric" maxLength={1}
               onChange={(e) => handle(i, e.target.value)}
               onKeyDown={(e) => onKey(i, e)}
               aria-label={\`Digit \${i + 1} dari \${length}\`}
               className="w-12 h-14 rounded-xl border-2 text-center text-[22px] font-bold font-mono
                          border-[color:var(--border-strong)] focus:border-brand-500 focus:bg-brand-50" />
      ))}
    </div>
  );
}`;

const DEBOUNCE_CODE = `// src/hooks/use-debounced-search.ts
import { useEffect, useState } from 'react';

export function useDebouncedSearch<T>(
  query: string,
  fetcher: (q: string) => Promise<T>,
  delay = 300,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!query.trim()) { setData(null); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const result = await fetcher(query);
        setData(result);
      } finally {
        setLoading(false);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [query, delay]);
  return { data, loading };
}

// Usage:
// const { data, loading } = useDebouncedSearch(q, searchEmployees);`;

function FormsSection() {
  const inputPreview = (
    <div className="space-y-3">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">NIK Pekerja <span className="text-danger-500">*</span></div>
        <div className="flex items-center h-11 rounded-xl border border-token-strong bg-white px-3 gap-2">
          <Icon name="user" size={16} className="text-subtle" />
          <input defaultValue="NSR-009281" className="flex-1 bg-transparent outline-none text-[13px] font-semibold" />
        </div>
        <div className="text-[11px] text-subtle mt-1">Format: NSR diikuti 6 digit</div>
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">Email <span className="text-danger-500">*</span></div>
        <div className="flex items-center h-11 rounded-xl border-2 border-danger-500 bg-white px-3 gap-2">
          <Icon name="mail" size={16} className="text-subtle" />
          <input defaultValue="invalid-email" className="flex-1 bg-transparent outline-none text-[13px] font-semibold" />
          <Icon name="alert-circle" size={16} className="text-danger-500" />
        </div>
        <div className="text-[11px] text-danger-600 mt-1 inline-flex items-center gap-1"><Icon name="alert-circle" size={11} /> Format email tidak valid</div>
      </div>
    </div>
  );

  const otpPreview = (
    <div className="flex gap-2 justify-between max-w-xs">
      {['9','2','4','8','',''].map((d, i) => (
        <div key={i} className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-[18px] font-bold mono
          ${d ? 'border-brand-500 bg-brand-50 text-brand-700' : i === 4 ? 'border-brand-500 bg-white' : 'border-token-strong bg-white text-subtle'}`}>
          {d || (i === 4 ? <span className="w-[2px] h-5 bg-brand-500 animate-pulse" /> : '')}
        </div>
      ))}
    </div>
  );

  return (
    <Section id="forms" eyebrow="06" title="Form patterns" description="Pattern form yang sering muncul. Semua dengan label uppercase + error state visual + a11y attrs.">
      <Subsection title="Text input dengan label / hint / error">
        <Preview lang="tsx" code={INPUT_CODE}>{inputPreview}</Preview>
      </Subsection>
      <Subsection title="Date range picker" hint="react-day-picker · weekStartsOn=1 (Senin) untuk konteks lokal">
        <CodeBlock lang="tsx" code={DATE_RANGE_CODE} />
      </Subsection>
      <Subsection title="Photo upload" hint="Capture environment · drag-drop · max 5">
        <CodeBlock lang="tsx" code={PHOTO_UPLOAD_CODE} />
      </Subsection>
      <Subsection title="OTP input" hint="Auto-advance, paste-friendly, keyboard nav">
        <Preview lang="tsx" code={OTP_CODE} minH={120}>{otpPreview}</Preview>
      </Subsection>
      <Subsection title="Debounced search hook" hint="300ms default. Pakai untuk search NIK, lokasi, kontraktor">
        <CodeBlock lang="tsx" code={DEBOUNCE_CODE} />
      </Subsection>
    </Section>
  );
}

// ============================================================
// 7. ACCESSIBILITY
// ============================================================
const A11Y_FOCUS_CODE = `/* Global focus style — visible saat keyboard nav, tidak terlihat saat mouse */
*:focus { outline: none; }
*:focus-visible {
  outline: 2px solid transparent;
  box-shadow: 0 0 0 3px var(--ring);
  border-radius: 6px;
}

/* Pakai sr-only untuk teks screen-reader-only */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}`;

const A11Y_LABELS_CODE = `// Pattern label untuk button icon-only
<button aria-label="Buka notifikasi" className="w-10 h-10 rounded-md hover:bg-elev">
  <Bell size={20} aria-hidden="true" />
  {hasUnread && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500"
                       aria-label="Ada notifikasi belum dibaca" />}
</button>

// Pattern live region untuk SOS status updates
<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  SOS status: {sosStatus}
</div>

// Pattern modal — wajib trap focus + aria-modal
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Tolak permohonan izin?</h2>
  …
</div>`;

function A11ySection() {
  const checks = [
    { t:'Tap target ≥ 44pt', d:'Mobile button & link minimum 44×44px (gloved: 48–56pt).', icon:'hand' },
    { t:'Color contrast WCAG AA', d:'Text ≥ 4.5:1 untuk body, ≥ 3:1 untuk large text & icon. Test di outdoor bright sunlight.', icon:'contrast' },
    { t:'Focus-visible', d:'Outline ring 3px brand-500 untuk semua focusable element. Hide saat mouse, show saat keyboard.', icon:'square-dashed-mouse-pointer' },
    { t:'Screen reader labels', d:'aria-label untuk icon-only button. aria-live untuk SOS status updates.', icon:'ear' },
    { t:'Keyboard navigation', d:'Tab order logis. Esc untuk close modal/drawer. Enter untuk submit. Arrow untuk OTP.', icon:'keyboard' },
    { t:'Bahasa Indonesia', d:'lang="id" di <html>. Label & error message dalam Bahasa Indonesia. Tanggal locale="id-ID".', icon:'languages' },
    { t:'Reduced motion', d:'Honor prefers-reduced-motion: SOS pulse jadi static dot, transition jadi instant.', icon:'wind' },
    { t:'Form validation', d:'aria-invalid + aria-describedby ke hint/error. Error focus pertama otomatis saat submit gagal.', icon:'circle-alert' },
  ];
  return (
    <Section id="a11y" eyebrow="07" title="Accessibility checklist" description="Mining environment + pekerja shift malam = a11y bukan optional. Checklist wajib di setiap PR.">
      <Subsection title="Checklist · 8 items">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {checks.map(c => (
            <div key={c.t} className="surface rounded-xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-success-50 text-success-600 flex items-center justify-center shrink-0">
                <Icon name={c.icon} size={17} />
              </div>
              <div>
                <div className="text-[13px] font-bold tracking-tight">{c.t}</div>
                <div className="text-[11.5px] text-muted leading-relaxed mt-0.5">{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Focus & sr-only styles">
        <CodeBlock lang="css" code={A11Y_FOCUS_CODE} />
      </Subsection>

      <Subsection title="aria-* patterns yang penting">
        <CodeBlock lang="tsx" code={A11Y_LABELS_CODE} />
      </Subsection>

      <Callout tone="danger" icon="shield-alert" title="Safety-critical (SOS)">
        Komponen SOS adalah <strong>tier-1 a11y</strong> — wajib screen reader friendly, support keyboard activation, dan <IC>aria-live="assertive"</IC> untuk status broadcasting. Test dengan VoiceOver / TalkBack sebelum rilis.
      </Callout>
    </Section>
  );
}

// Export
window.ColorsSection      = ColorsSection;
window.SpacingSection     = SpacingSection;
window.ComponentsSection  = ComponentsSection;
window.BreakpointsSection = BreakpointsSection;
window.IconsSection       = IconsSection;
window.FormsSection       = FormsSection;
window.A11ySection        = A11ySection;
