// Shared building blocks for the design system page.

function Section({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="py-14 md:py-20 border-b border-token">
      <div className="max-w-5xl">
        {eyebrow && (
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-500 dark:text-brand-300 mb-3">
            {eyebrow}
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base md:text-[17px] leading-relaxed text-muted max-w-3xl">
            {description}
          </p>
        )}
        <div className="mt-10 space-y-12">{children}</div>
      </div>
    </section>
  );
}

function Subsection({ title, hint, children, right }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
          {hint && <p className="text-[13px] text-subtle mt-0.5">{hint}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Card({ className = '', children, style }) {
  return (
    <div className={`surface rounded-xl ${className}`} style={style}>
      {children}
    </div>
  );
}

function Code({ children, className = '' }) {
  return (
    <code className={`mono text-[12px] px-1.5 py-0.5 rounded-md bg-code text-muted border border-token ${className}`}>
      {children}
    </code>
  );
}

function Pill({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-elev text-muted border-token',
    brand: 'bg-brand-50 text-brand-700 border-brand-100 dark:bg-brand-900/40 dark:text-brand-200 dark:border-brand-700',
    success: 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${tones[tone]}`}>
      {children}
    </span>
  );
}

window.Section = Section;
window.Subsection = Subsection;
window.Card = Card;
window.Code = Code;
window.Pill = Pill;
