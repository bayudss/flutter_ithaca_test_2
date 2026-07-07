// Lucide icon wrapper. Reads <Icon name="..." size={20} className="..." />
// We render the SVG path data from window.lucide.icons (UMD build).
function Icon({ name, size = 20, strokeWidth = 2, className = '', style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const lib = window.lucide;
    if (!lib || !lib.icons) return;
    // Lucide UMD exposes icons in PascalCase keyed by name e.g. "ArrowRight"
    const pascal = name
      .split(/[-_]/)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');
    const data = lib.icons[pascal] || lib.icons[name];
    if (!data) {
      ref.current.innerHTML = '';
      return;
    }
    // data is [tagName, attrs, children] tuples in new versions, or a node spec.
    // We just call createIcons after mount instead — simpler.
  }, [name]);

  // Use lucide.createIcons() declarative approach via data attributes.
  return (
    <i
      ref={ref}
      data-lucide={name}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    />
  );
}

// Re-run lucide.createIcons whenever the component tree updates.
function useLucideRefresh(dep) {
  React.useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons({
        attrs: { 'stroke-width': 2 }
      });
    }
  });
}

window.Icon = Icon;
window.useLucideRefresh = useLucideRefresh;
