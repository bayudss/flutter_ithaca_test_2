// Catering — Kitchen Production (W10) and Service Operations (W11).

function KitchenSidebar({ current='production' }) {
  const items = [
    { id:'production', name:'Production sheet', icon:'clipboard-list' },
    { id:'service',    name:'Service ops',      icon:'utensils-crossed' },
    { id:'inventory',  name:'Inventory',        icon:'shopping-basket' },
    { id:'staff',      name:'Tim dapur',        icon:'users' },
    { id:'reports',    name:'Laporan',          icon:'bar-chart-3' },
  ];
  return (
    <aside className="w-60 shrink-0 border-r border-token bg-white flex flex-col">
      <div className="h-14 px-4 border-b border-token flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-cater-500 text-white flex items-center justify-center">
          <Icon name="chef-hat" size={20} />
        </div>
        <div className="leading-tight">
          <div className="text-[12px] font-bold tracking-tight">Catering Bahari</div>
          <div className="text-[9px] uppercase tracking-wider text-cater-600 font-bold">Kitchen ops</div>
        </div>
      </div>
      <div className="px-3 py-4 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-subtle px-3 mb-2">Menu</div>
        <nav className="space-y-0.5">
          {items.map(i => {
            const active = i.id === current;
            return (
              <a key={i.id}
                 className={`flex items-center gap-2.5 px-3 h-9 rounded-md text-[12.5px] font-medium transition-colors
                   ${active?'bg-cater-50 text-cater-700':'text-muted hover:bg-elev'}`}>
                <Icon name={i.icon} size={15} />
                <span>{i.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
      <div className="p-3 border-t border-token">
        <div className="rounded-lg bg-cream p-3">
          <div className="text-[10px] uppercase tracking-wider text-cater-700 font-bold">Operator</div>
          <div className="text-[12px] font-bold mt-0.5">Pak Wirya</div>
          <div className="text-[10px] text-muted">Head Chef · shift siang</div>
        </div>
      </div>
    </aside>
  );
}

function KitchenTopBar({ title, status }) {
  return (
    <header className="h-14 bg-white border-b border-token flex items-center px-6 gap-4 shrink-0">
      <div>
        <div className="text-[10px] text-subtle uppercase tracking-wider">Kitchen — Mess Griya Praja</div>
        <div className="text-[14px] font-bold tracking-tight">{title}</div>
      </div>
      <div className="flex-1" />
      {status}
      <button className="w-9 h-9 rounded-md hover:bg-elev flex items-center justify-center"><Icon name="bell" size={17} /></button>
    </header>
  );
}

// ============================================================
// W10 — Production Sheet
// ============================================================
function KitchenProduction() {
  return (
    <div className="h-full flex bg-elev">
      <KitchenSidebar current="production" />
      <div className="flex-1 flex flex-col min-w-0">
        <KitchenTopBar
          title="Production Sheet — 19 Mei 2026 · Siang"
          status={<>
            <StatusPill tone="info" icon="lock">Forecast locked H-1</StatusPill>
            <Btn variant="cater" size="sm" icon="play">Status report</Btn>
          </>}
        />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Forecast snapshot */}
            <div className="rounded-xl p-4 bg-white border border-cater-200 grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-cater-600 font-bold">Forecast porsi</div>
                <div className="text-[28px] font-extrabold mono tracking-tight">1,800</div>
                <div className="text-[10.5px] text-muted">Locked oleh FAC · 18 Mei 14:58</div>
              </div>
              {[
                { lbl:'Vegetarian', v:25,  ic:'leaf',     tone:'success' },
                { lbl:'Gluten-free', v:5,  ic:'wheat-off',tone:'warning' },
                { lbl:'Allergen-free', v:12, ic:'alert-circle', tone:'danger', link:true },
                { lbl:'Halal default', v:1758, ic:'badge-check', tone:'herb' },
              ].map(s => (
                <div key={s.lbl} className="border-l border-token pl-4">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold flex items-center gap-1">
                    <Icon name={s.ic} size={11} className={`text-${s.tone}-600`} /> {s.lbl}
                  </div>
                  <div className={`text-[20px] font-extrabold mono ${s.link?'text-danger-700 cursor-pointer underline decoration-dotted':''}`}>{s.v}</div>
                  {s.link && <div className="text-[10px] text-cater-700 font-bold">Lihat 12 nama →</div>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
              <div className="space-y-4">
                {/* Recipe quantities */}
                <Card title="Resep &amp; bahan baku" right={<button className="text-[11px] font-bold text-cater-700 inline-flex items-center gap-1"><Icon name="calculator" size={12} /> Re-calc untuk 1,800</button>} padding="p-0">
                  <div className="divide-y divide-[color:var(--border)]">
                    <RecipeRow ic="drumstick" name="Ayam bakar kecap" perPortion="1 paha + 50ml kecap" total="1,800 paha · 90 L kecap" status="received" />
                    <RecipeRow ic="wheat"     name="Nasi putih"        perPortion="200g beras matang" total="360 kg beras" status="received" />
                    <RecipeRow ic="leaf"      name="Sayur asem"        perPortion="150g sayuran"      total="270 kg sayur · 15 kg asem" status="prep" />
                    <RecipeRow ic="apple"     name="Pisang ambon"      perPortion="1 buah"            total="1,800 buah" status="received" />
                    <RecipeRow ic="glass-water" name="Air mineral"     perPortion="600ml"             total="1,080 L (1,800 botol)" status="dispatched" />
                    <RecipeRow ic="leaf"      name="Veg menu (capcay)" perPortion="200g + tahu"       total="25 porsi (vegetarian)" status="prep" extra />
                  </div>
                </Card>

                {/* Checklist */}
                <Card title="Production checklist" right={<span className="text-[11px] text-muted">3 dari 7 selesai</span>} padding="p-0">
                  <div className="divide-y divide-[color:var(--border)]">
                    {[
                      { t:'07:30', l:'Bahan baku diterima dari supplier', done:true, by:'Pak Wirya' },
                      { t:'08:00', l:'Quality check sample (5 sampel acak)', done:true, by:'Pak Wirya' },
                      { t:'09:00', l:'Pre-cook prep (potong, marinate, washing)', done:true, by:'Tim A' },
                      { t:'10:00', l:'Cooking dimulai (ayam bakar batch 1-3)', done:false, active:true, by:'Tim B · live' },
                      { t:'11:00', l:'Plating &amp; portioning', done:false, by:'Tim C' },
                      { t:'11:15', l:'Quality check final (suhu, presentasi)', done:false, by:'Head chef' },
                      { t:'11:25', l:'Hot box dispatched ke 5 lokasi mess', done:false, by:'Logistik' },
                    ].map((r,i) => (
                      <div key={i} className="px-5 py-3 flex items-center gap-3">
                        <div className="w-12 text-center">
                          <div className="text-[14px] font-extrabold mono">{r.t}</div>
                        </div>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${r.done?'bg-success-500 text-white':r.active?'bg-cater-500 text-white':'bg-elev border border-token-strong'}`}>
                          {r.done && <Icon name="check" size={14} strokeWidth={3} />}
                          {r.active && <Icon name="loader-2" size={12} className="spinner" />}
                        </div>
                        <div className="flex-1">
                          <div className={`text-[13px] font-semibold ${r.done?'line-through text-muted':''}`} dangerouslySetInnerHTML={{__html: r.l}} />
                          <div className="text-[10.5px] text-subtle">{r.by}</div>
                        </div>
                        {r.active && <StatusPill tone="cater" size="sm">In progress</StatusPill>}
                        {r.done && <StatusPill tone="success" size="sm" icon="check-circle-2">Selesai</StatusPill>}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                {/* Allergen list */}
                <Card title="Allergen-aware list" right={<span className="text-[10px] text-danger-700 font-bold">12 nama</span>} padding="p-0">
                  <div className="divide-y divide-[color:var(--border)] max-h-[280px] overflow-y-auto">
                    {[
                      { n:'Asep Hidayat',    nik:'NUS-2024-3344', a:'kacang' },
                      { n:'Rini Sutanto',    nik:'KNC-002-1198',  a:'seafood' },
                      { n:'Pak Hadi W.',     nik:'NUS-2024-9821', a:'gluten' },
                      { n:'Lina Marbun',     nik:'NUS-2024-8092', a:'telur' },
                      { n:'Surya P.',        nik:'NUS-2024-3345', a:'kacang' },
                      { n:'Bagas R.',        nik:'NUS-2024-6671', a:'susu' },
                    ].map(r => (
                      <div key={r.nik} className="px-4 py-2.5 flex items-center gap-2">
                        <Avatar name={r.n} size={28} tone="cater" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-bold truncate">{r.n}</div>
                          <div className="text-[10px] text-subtle mono truncate">{r.nik}</div>
                        </div>
                        <span className="px-1.5 h-5 rounded bg-danger-50 text-danger-700 text-[10px] font-bold inline-flex items-center gap-1">
                          <Icon name="alert-circle" size={10} /> {r.a}
                        </span>
                      </div>
                    ))}
                    <div className="px-4 py-2 text-center text-[10px] text-subtle">+ 6 lainnya</div>
                  </div>
                </Card>

                {/* Timeline */}
                <Card title="Service window" padding="p-5">
                  <div className="relative pl-5">
                    <div className="absolute left-1.5 top-2 bottom-2 w-px bg-token" />
                    {[
                      { t:'09:00', l:'Mulai prep', done:true },
                      { t:'11:00', l:'Cook completed', done:true },
                      { t:'11:25', l:'Dispatch ke mess', upcoming:true },
                      { t:'11:30', l:'Service open', upcoming:true },
                      { t:'13:30', l:'Service close' },
                    ].map((r,i) => (
                      <div key={i} className="relative pl-3 pb-3 last:pb-0">
                        <div className={`absolute -left-[10px] top-1 w-3 h-3 rounded-full ring-2 ring-white ${r.done?'bg-success-500':r.upcoming?'bg-cater-500':'bg-[color:var(--border-strong)]'}`} />
                        <div className="text-[12px] font-bold">{r.l}</div>
                        <div className="text-[10.5px] text-subtle mono">{r.t}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Substitute vendor banner */}
                <Card padding="p-4" className="bg-warning-50 border-warning-500/30">
                  <div className="flex items-start gap-2.5">
                    <Icon name="alert-triangle" size={18} className="text-warning-600 mt-0.5" />
                    <div className="text-[11.5px] text-warning-700">
                      <span className="font-extrabold">Vendor pengganti besok:</span> Nuansa Catering belum konfirmasi quality grade — backup ke Sari Boga. FAC sudah notified.
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeRow({ ic, name, perPortion, total, status, extra }) {
  const stMap = {
    received:   { lbl:'Bahan baku diterima', tone:'success', ic:'check-circle-2' },
    prep:       { lbl:'Sedang prep',          tone:'cater',   ic:'loader-2' },
    dispatched: { lbl:'Dispatched',           tone:'info',    ic:'truck' },
  };
  const s = stMap[status];
  return (
    <div className={`px-5 py-3 flex items-center gap-3 ${extra?'bg-herb-50/60':''}`}>
      <div className={`w-10 h-10 rounded-lg ${extra?'bg-herb-50 text-herb-600':'bg-cater-50 text-cater-600'} flex items-center justify-center`}>
        <Icon name={ic} size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold">{name} {extra && <span className="text-[10px] font-normal text-herb-700 ml-1">· vegetarian</span>}</div>
        <div className="text-[10.5px] text-muted">{perPortion} <span className="text-subtle">per porsi</span></div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-[13px] font-extrabold mono">{total}</div>
        <span className={`inline-flex items-center gap-1 mt-0.5 px-1.5 h-5 rounded text-[10px] font-bold bg-${s.tone}-50 text-${s.tone}-700`}>
          <Icon name={s.ic} size={10} className={s.ic==='loader-2'?'spinner':''} /> {s.lbl}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// W11 — Service Operations
// ============================================================
function KitchenService() {
  return (
    <div className="h-full flex bg-elev">
      <KitchenSidebar current="service" />
      <div className="flex-1 flex flex-col min-w-0">
        <KitchenTopBar
          title="Service Operations — Live · Siang"
          status={<>
            <span className="inline-flex items-center gap-1 px-2 h-6 rounded-md bg-cater-500 text-white text-[10px] font-bold uppercase tracking-wider">
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white" /> Service live
            </span>
            <Btn variant="secondary" size="sm" icon="camera">Foto kualitas</Btn>
          </>}
        />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Inventory live counter */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card padding="p-5" className="lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-cater-600 font-bold">Porsi disiapkan</div>
                    <div className="text-[18px] font-extrabold tracking-tight">Ayam Bakar Kecap &amp; Sayur Asem</div>
                  </div>
                  <StatusPill tone="cater" icon="utensils-crossed">Slot Siang</StatusPill>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { lbl:'Prepared', v:'1,800', tone:'text-brand-700' },
                    { lbl:'Served',   v:'945',   tone:'text-success-700' },
                    { lbl:'Remaining',v:'855',   tone:'text-cater-700' },
                  ].map(b => (
                    <div key={b.lbl} className="rounded-lg bg-cream p-4 text-center">
                      <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">{b.lbl}</div>
                      <div className={`text-[28px] font-extrabold mono mt-0.5 ${b.tone}`}>{b.v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-muted mb-1.5">
                    <span className="font-bold mono">52.5% served</span>
                    <span>1h 23m sisa slot</span>
                  </div>
                  <div className="h-3 rounded-full bg-cream overflow-hidden">
                    <div className="h-full rounded-full" style={{ width:'52.5%', background:'linear-gradient(90deg, #F39800, #E68506)' }} />
                  </div>
                </div>
              </Card>

              {/* Low stock alert */}
              <Card padding="p-5" className="bg-warning-50 border-warning-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-warning-500 text-white flex items-center justify-center">
                    <Icon name="alert-triangle" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-warning-700">Alert remaining</div>
                    <div className="text-[14px] font-extrabold tracking-tight">Rest Area-2: 9% stock</div>
                  </div>
                </div>
                <div className="mt-3 text-[11.5px] text-warning-700">Forecast tersisa kurang dari 10% sebelum slot selesai. Kirim batch tambahan atau cap walk-in di lokasi.</div>
                <div className="mt-3 flex gap-2">
                  <Btn variant="cater" size="sm" icon="truck">Kirim batch</Btn>
                  <Btn variant="secondary" size="sm">Notify FAC</Btn>
                </div>
              </Card>
            </div>

            {/* Hot box temperature */}
            <Card title="Hot box monitoring — food safety" right={<StatusPill tone="success" icon="thermometer">All safe (≥60°C)</StatusPill>} padding="p-0">
              <div className="divide-y divide-[color:var(--border)]">
                {[
                  { loc:'Mess Griya Praja',    temp:68, opened:'12:30', remaining:540, status:'ok' },
                  { loc:'Mess Simpang Perdau', temp:65, opened:'12:35', remaining:380, status:'ok' },
                  { loc:'Rest Area-1',         temp:62, opened:'12:42', remaining:80,  status:'warn' },
                  { loc:'Rest Area-2',         temp:58, opened:'12:45', remaining:18,  status:'alert' },
                  { loc:'Rest Area-3',         temp:64, opened:'12:50', remaining:62,  status:'ok' },
                ].map(r => {
                  const toneMap = {
                    ok:    { c:'text-success-700', dot:'bg-success-500', label:'Aman' },
                    warn:  { c:'text-warning-700', dot:'bg-warning-500', label:'Watch' },
                    alert: { c:'text-danger-700',  dot:'bg-danger-500',  label:'Alert' },
                  };
                  const t = toneMap[r.status];
                  return (
                    <div key={r.loc} className="px-5 py-3 flex items-center gap-4">
                      <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} />
                      <Icon name="map-pin" size={16} className="text-subtle" />
                      <div className="flex-1">
                        <div className="text-[13px] font-bold">{r.loc}</div>
                        <div className="text-[10.5px] text-muted">Dibuka {r.opened} · sisa {r.remaining} porsi</div>
                      </div>
                      {/* temp gauge */}
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 rounded-full bg-cream overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:`${(r.temp/80)*100}%`, background: r.status==='alert' ? '#E24B4A' : r.status==='warn' ? '#EF9F27' : '#1D9E75' }} />
                        </div>
                        <div className={`text-[18px] font-extrabold mono w-16 text-right ${t.c}`}>{r.temp}°C</div>
                        <StatusPill tone={r.status==='alert'?'danger':r.status==='warn'?'warning':'success'} size="sm">{t.label}</StatusPill>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Adjustments log + photo upload */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Card title="Inventory adjustments" right={<Btn variant="ghost" size="sm" icon="plus">Catat</Btn>} padding="p-0">
                <div className="divide-y divide-[color:var(--border)] text-[12px]">
                  {[
                    { t:'12:42', m:'+30 porsi extra dikirim ke Griya Praja (over-redemption velocity)', tone:'success' },
                    { t:'12:18', m:'−5 porsi dikembalikan dari Rest Area-3 (worker tidak datang)', tone:'warning' },
                    { t:'11:50', m:'Substitusi pisang ambon → kepok untuk Simpang Perdau (stock supplier)', tone:'info' },
                    { t:'11:30', m:'Service dimulai · semua hot box dispatched on-time', tone:'success' },
                  ].map((r,i) => (
                    <div key={i} className="px-5 py-3 flex items-start gap-3">
                      <span className={`w-2 h-2 rounded-full mt-1.5 bg-${r.tone}-500`} />
                      <div className="flex-1">
                        <div className="leading-relaxed">{r.m}</div>
                        <div className="text-[10px] text-subtle mono mt-0.5">{r.t} WIB · Pak Wirya</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Photo quality check · real-time" right={<Btn variant="cater" size="sm" icon="camera">Upload foto</Btn>} padding="p-4">
                <div className="grid grid-cols-3 gap-2">
                  {['ayam-bakar','nasi-uduk','ayam-bakar','nasi-goreng','bubur','buah'].map((k,i) => (
                    <div key={i} className="relative">
                      <FoodImage kind={k} ratio="1/1" />
                      <div className="absolute bottom-1 left-1 text-[9px] mono text-white bg-black/55 backdrop-blur px-1.5 py-0.5 rounded">12:{30+i*3}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11px] text-muted">Foto kualitas per 30 menit untuk audit FAC &amp; food safety report end-of-day.</div>
              </Card>
            </div>

            {/* End-of-slot waste estimation */}
            <Card padding="p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-danger-50 text-danger-600 flex items-center justify-center">
                  <Icon name="trash-2" size={22} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-subtle font-bold">Wastage prediction · end of slot</div>
                  <div className="text-[18px] font-extrabold tracking-tight">~62 porsi waste (3.4%)</div>
                  <div className="text-[11px] text-muted">Di bawah target 5% — vendor SLA tercapai. Catat di laporan harian saat slot tutup.</div>
                </div>
                <Btn variant="secondary" size="sm" icon="file-text">Catat sekarang</Btn>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

window.KitchenProduction = KitchenProduction;
window.KitchenService = KitchenService;
