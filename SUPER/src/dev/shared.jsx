// Shared components for Dev Reference.

// ============================================================
// CodeBlock — code with copy button + simple syntax highlight
// ============================================================
function CodeBlock({ lang = 'tsx', filename, code, copyText }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText ?? code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {}
  };
  return (
    <div className="rounded-xl overflow-hidden border border-token">
      <div className="bg-elev px-3 h-10 flex items-center gap-3 border-b border-token">
        <div className="flex items-center gap-1.5">
          <Icon name="terminal" size={13} className="text-subtle" />
          <span className="text-[11px] font-bold mono text-subtle uppercase tracking-wider">{lang}</span>
        </div>
        {filename && <span className="text-[12px] mono text-muted truncate">{filename}</span>}
        <div className="flex-1" />
        <button
          onClick={onCopy}
          className={`h-7 px-2.5 rounded text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors ${copied ? 'bg-success-500 text-white' : 'bg-white border border-token hover:bg-elev text-[color:var(--text)]'}`}>
          <Icon name={copied ? 'check' : 'copy'} size={12} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code px-4 py-3.5">
        <code dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} />
      </pre>
    </div>
  );
}

// Tiny regex-based highlighter — purely cosmetic. Returns escaped+spanned HTML.
function highlight(src, lang) {
  // Escape first
  let s = src
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (lang === 'tsx' || lang === 'jsx' || lang === 'ts' || lang === 'js') {
    // comments
    s = s.replace(/(\/\/[^\n]*)/g, '<span class="c">$1</span>');
    s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="c">$1</span>');
    // strings
    s = s.replace(/(&quot;[^&]*?&quot;|'[^'\n]*?'|`[^`]*?`)/g, '<span class="s">$1</span>');
    // JSX-ish tags (very loose)
    s = s.replace(/(&lt;\/?)([A-Za-z][A-Za-z0-9._]*)/g, '$1<span class="t">$2</span>');
    // attributes inside JSX (e.g. ` foo={`)
    s = s.replace(/(\s)([a-zA-Z_][a-zA-Z0-9_-]*)=/g, '$1<span class="a">$2</span>=');
    // keywords
    s = s.replace(/\b(const|let|var|function|return|import|from|export|default|if|else|for|while|switch|case|break|continue|new|class|extends|interface|type|enum|async|await|true|false|null|undefined)\b/g, '<span class="k">$1</span>');
    // numbers
    s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="n">$1</span>');
  } else if (lang === 'css') {
    s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="c">$1</span>');
    s = s.replace(/(--[a-zA-Z0-9-]+)/g, '<span class="v">$1</span>');
    s = s.replace(/(#[0-9a-fA-F]{3,8})/g, '<span class="n">$1</span>');
    s = s.replace(/([a-zA-Z-]+)(\s*:)/g, '<span class="a">$1</span>$2');
  } else if (lang === 'bash' || lang === 'sh') {
    s = s.replace(/(#[^\n]*)/g, '<span class="c">$1</span>');
    s = s.replace(/(^|\n)\$\s/g, '$1<span class="o">$</span> ');
  }
  return s;
}

// ============================================================
// Section primitives
// ============================================================
function Section({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="py-14 border-b border-token">
      <div className="max-w-4xl">
        {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500 mb-2">{eyebrow}</div>}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ letterSpacing: '-0.02em' }}>{title}</h2>
        {description && <p className="mt-3 text-[15px] text-muted leading-relaxed max-w-2xl">{description}</p>}
        <div className="mt-8 space-y-10">{children}</div>
      </div>
    </section>
  );
}

function Subsection({ title, hint, right, children }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-3">
        <div>
          <h3 className="text-[16px] font-bold tracking-tight">{title}</h3>
          {hint && <p className="text-[12px] text-subtle mt-0.5">{hint}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function BrandMark({ size = 40 }) {
  return (
    <div className="rounded-[28%] flex items-center justify-center font-extrabold text-white"
      style={{ width: size, height: size, background: 'linear-gradient(135deg, #4179AE 0%, #1F4E79 60%, #F39800 140%)', boxShadow: '0 6px 16px -8px rgba(31,78,121,0.6)', fontSize: size * 0.55, letterSpacing: '-0.05em' }}>N</div>
  );
}

// Two-column preview + code (preview top, code bottom on mobile; side-by-side on desktop)
function Preview({ children, code, lang='tsx', minH=180 }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
      <div className="lg:col-span-2 surface rounded-xl p-5 bg-elev flex items-center justify-center" style={{ minHeight: minH }}>
        <div className="w-full">{children}</div>
      </div>
      <div className="lg:col-span-3">
        <CodeBlock lang={lang} code={code} />
      </div>
    </div>
  );
}

// Inline code chip
function IC({ children }) {
  return <code className="mono text-[12px] px-1.5 py-0.5 rounded-md bg-elev text-muted border border-token whitespace-nowrap">{children}</code>;
}

// Note / callout
function Callout({ tone = 'info', icon = 'info', title, children }) {
  const map = {
    info:    { bg:'bg-info-50',    text:'text-info-700',    border:'border-info-500/30' },
    warning: { bg:'bg-warning-50', text:'text-warning-700', border:'border-warning-500/30' },
    success: { bg:'bg-success-50', text:'text-success-700', border:'border-success-500/30' },
    danger:  { bg:'bg-danger-50',  text:'text-danger-700',  border:'border-danger-500/30' },
  };
  const c = map[tone];
  return (
    <div className={`rounded-xl border ${c.bg} ${c.border} p-4 flex gap-3`}>
      <Icon name={icon} size={18} className={`${c.text} mt-0.5 shrink-0`} />
      <div className={`${c.text} text-[13px] leading-relaxed`}>
        {title && <div className="font-bold mb-0.5">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}

window.CodeBlock = CodeBlock;
window.Section = Section;
window.Subsection = Subsection;
window.BrandMark = BrandMark;
window.Preview = Preview;
window.IC = IC;
window.Callout = Callout;
