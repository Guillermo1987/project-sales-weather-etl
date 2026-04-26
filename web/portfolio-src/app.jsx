// app.jsx — Full React application v2

const LangCtx = React.createContext('es');
const useLang  = ()=>React.useContext(LangCtx);
function T({es,en}){ const l=useLang(); return l==='es'?es:en; }

function Reveal({children,delay=0,style={}}){
  const ref=React.useRef(null);
  const [vis,setVis]=React.useState(false);
  React.useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:0.08,rootMargin:'0px 0px -20px 0px'});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return <div ref={ref} style={{opacity:vis?1:0,transform:vis?'none':'translateY(22px)',transition:`opacity .6s ${delay}s ease,transform .6s ${delay}s ease`,...style}}>{children}</div>;
}

// ── ProjectModal ──────────────────────────────────────────────────────────────
function ProjectModal({story, lang, onClose}){
  React.useEffect(()=>{
    const h=e=>e.key==='Escape'&&onClose();
    document.addEventListener('keydown',h);
    document.body.style.overflow='hidden';
    return ()=>{ document.removeEventListener('keydown',h); document.body.style.overflow=''; };
  },[]);

  const t=(es,en)=>lang==='es'?es:en;

  const sections=[
    {icon:'💡', label:t('El problema','The problem'),   text:story.problem},
    {icon:'🔧', label:t('La solución','The solution'),  text:story.solution},
  ];

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:'fixed',inset:0,background:'rgba(0,0,0,.78)',backdropFilter:'blur(10px)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{background:'#111827',border:'1px solid #1E293B',borderRadius:'18px',width:'100%',maxWidth:'660px',maxHeight:'88vh',overflowY:'auto',padding:'28px',position:'relative',boxShadow:'0 24px 80px rgba(0,0,0,.6)'}}>
        {/* Close */}
        <button onClick={onClose} style={{position:'absolute',top:'16px',right:'16px',background:'rgba(255,255,255,.06)',border:'1px solid #1E293B',borderRadius:'8px',color:'#94A3B8',cursor:'pointer',width:'32px',height:'32px',fontSize:'16px',display:'flex',alignItems:'center',justifyContent:'center',transition:'background .2s'}} aria-label="Cerrar">✕</button>

        {/* Header */}
        <div style={{marginBottom:'24px',paddingRight:'40px'}}>
          <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:'#3B82F6',letterSpacing:'.06em',textTransform:'uppercase',display:'block',marginBottom:'6px'}}>{story.tag}</span>
          <h2 style={{fontFamily:'Poppins,sans-serif',fontWeight:'700',fontSize:'22px',lineHeight:'1.2',color:'#F1F5F9'}}>{story.title}</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'10px'}}>
            {story.stack.map(s=><span key={s} style={{padding:'2px 8px',borderRadius:'5px',background:'rgba(59,130,246,.08)',border:'1px solid rgba(59,130,246,.15)',fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:'#93c5fd'}}>{s}</span>)}
          </div>
        </div>

        {/* Problem + Solution */}
        {sections.map(sec=>(
          <div key={sec.label} style={{marginBottom:'20px',padding:'16px',background:'rgba(255,255,255,.02)',borderRadius:'10px',border:'1px solid #1E293B'}}>
            <div style={{fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'13px',color:'#F1F5F9',marginBottom:'8px'}}>{sec.icon} {sec.label}</div>
            <p style={{fontSize:'14px',color:'#94A3B8',lineHeight:'1.7'}}>{sec.text}</p>
          </div>
        ))}

        {/* Demo interactiva */}
        <div style={{marginBottom:'20px'}}>
          <div style={{fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'13px',color:'#F1F5F9',marginBottom:'6px'}}>▶ {t('Demo interactiva','Interactive demo')}</div>
          <p style={{fontSize:'12px',color:'#64748b',marginBottom:'10px',fontFamily:'JetBrains Mono,monospace'}}>{story.hint}</p>
          <div style={{background:'rgba(0,0,0,.3)',borderRadius:'10px',padding:'16px',border:'1px solid #1E293B'}}>
            {story.Demo && <story.Demo/>}
          </div>
        </div>

        {/* Impacto */}
        <div style={{padding:'14px 16px',background:'rgba(74,222,128,.04)',borderRadius:'10px',border:'1px solid rgba(74,222,128,.15)'}}>
          <div style={{fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'13px',color:'#4ade80',marginBottom:'6px'}}>📊 {t('Impacto','Impact')}</div>
          <p style={{fontSize:'13px',color:'#94A3B8',fontFamily:'JetBrains Mono,monospace',lineHeight:'1.6'}}>{story.impact}</p>
        </div>
      </div>
    </div>
  );
}

// ── HeroTerminal ──────────────────────────────────────────────────────────────
function HeroTerminal(){
  const lines=[
    {cmd:'career.start()', out:'"SDR → SalesOps → RevOps → P&G · 10 años"'},
    {cmd:'impact.top()',   out:'"+18% market share · 64%→82% forecast · $2M+ P&L"'},
    {cmd:'stack.current()',out:'"Python · SQL · Power BI · Scikit-learn · Claude AI"'},
    {cmd:'status()',       out:'"Open to remote roles · Barcelona 🌐"'},
  ];
  const [n,setN]=React.useState(0);
  React.useEffect(()=>{
    if(n>=lines.length) return;
    const t=setTimeout(()=>setN(v=>v+1),650);
    return ()=>clearTimeout(t);
  },[n]);
  return (
    <div style={{background:'rgba(0,0,0,.48)',border:'1px solid #1E293B',borderRadius:'10px',padding:'16px 18px',fontFamily:'JetBrains Mono,monospace',fontSize:'12px',textAlign:'left',maxWidth:'540px',margin:'0 auto 28px'}}>
      <div style={{display:'flex',gap:'6px',marginBottom:'12px'}}>
        <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#ef4444'}}/>
        <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#f59e0b'}}/>
        <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#22c55e'}}/>
      </div>
      {lines.slice(0,n).map((l,i)=>(
        <div key={i} style={{marginBottom:'8px'}}>
          <div><span style={{color:'#3B82F6'}}>› </span><span style={{color:'#f1f5f9'}}>{l.cmd}</span></div>
          <div style={{color:'#4ade80',paddingLeft:'14px'}}>{l.out}</div>
        </div>
      ))}
      {n<lines.length&&<span style={{color:'#3B82F6'}}>› <span style={{display:'inline-block',width:'6px',height:'13px',background:'#3B82F6',verticalAlign:'middle',animation:'blink 1s step-end infinite'}}></span></span>}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({lang,setLang}){
  const links=[
    {href:'#projects',es:'Proyectos',en:'Projects'},
    {href:'#stack',   es:'Stack',    en:'Stack'},
    {href:'#timeline',es:'Trayectoria',en:'Journey'},
    {href:'#about',   es:'Sobre mí', en:'About'},
    {href:'#contact', es:'Contacto', en:'Contact'},
  ];
  return (
    <nav id="navbar">
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" aria-label="Inicio">
          <div className="logo-mark">GU</div>
          <span className="logo-name">Mindset & Code</span>
        </a>
        <ul className="nav-links" role="list">
          {links.map(l=><li key={l.href}><a href={l.href}>{lang==='es'?l.es:l.en}</a></li>)}
        </ul>
        <div className="nav-right">
          <button className="lang-toggle" onClick={()=>setLang(l=>l==='es'?'en':'es')} aria-label="Cambiar idioma">{lang==='es'?'EN':'ES'}</button>
          <a href="#" className="nav-cta">{lang==='es'?'Descargar CV':'Download CV'}</a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero(){
  const stats=[
    {num:'10+', es:'Años en ops comerciales',       en:'Years commercial ops'},
    {num:'$2M+',es:'P&L gestionado en P&G',          en:'P&L managed at P&G'},
    {num:'82%', es:'Forecast precision (desde 64%)', en:'Forecast accuracy (from 64%)'},
    {num:'4',   es:'Años reconversión técnica',       en:'Years technical retraining'},
  ];
  return (
    <section className="hero" id="hero">
      <div className="hero-grid" aria-hidden="true"/>
      <div className="hero-glow"  aria-hidden="true"/>
      <div className="hero-content">
        <div className="avail-badge">
          <span className="dot-green" aria-hidden="true"/>
          <T es="Disponible para roles remotos · Barcelona" en="Available for remote roles · Barcelona"/>
        </div>
        <h1>Mindset & Code<br/><span className="grad-text">Mindset & Code</span></h1>
        <p className="hero-sub"><T es="AI Engineer · Data Analyst · Revenue Operations" en="AI Engineer · Data Analyst · Revenue Operations"/></p>
        <p className="hero-desc">
          <T
            es="Comencé como SDR expandiendo rutas de Agrosuper +60% en 6 meses. Diez años después lideraba 100 personas en P&G con $2M+ de presupuesto y mejoré el forecasting del 64% al 82%. Hoy construyo sistemas de datos e IA que hacen lo que antes me tomaba semanas."
            en="I started as an SDR expanding Agrosuper routes +60% in 6 months. Ten years later I was leading 100 people at P&G with a $2M+ budget and improved forecasting from 64% to 82%. Today I build data and AI systems that do in minutes what used to take weeks."
          />
        </p>
        <HeroTerminal/>
        <div className="pills" aria-label="Roles objetivo">
          {['Senior Data Analyst','BI Analyst','Revenue Analytics','Cybersecurity Analyst'].map(r=>(
            <span key={r} className="pill" style={{borderColor:'rgba(59,130,246,.35)',color:'#93c5fd'}}>{r}</span>
          ))}
        </div>
        <div className="ctas">
          <a href="#projects" className="btn-primary"><T es="Ver proyectos" en="View projects"/></a>
          <a href="#" className="btn-outline"><T es="Descargar CV" en="Download CV"/></a>
        </div>
        <div className="stats">
          {stats.map(s=>(
            <div key={s.num} className="stat">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label"><T es={s.es} en={s.en}/></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Digox SVG ─────────────────────────────────────────────────────────────────
function DigoxViz(){
  return (
    <svg viewBox="0 0 480 200" width="100%" height="100%" aria-hidden="true">
      <rect width="480" height="200" fill="rgba(0,0,0,.18)"/>
      <circle cx="240" cy="100" r="32" fill="rgba(139,92,246,.18)" stroke="#8B5CF6" strokeWidth="1.5"/>
      <text x="240" y="96"  textAnchor="middle" fill="#c4b5fd" fontSize="9"  fontFamily="JetBrains Mono,monospace" fontWeight="500">ORCHESTRATOR</text>
      <text x="240" y="110" textAnchor="middle" fill="#8B5CF6" fontSize="8"  fontFamily="JetBrains Mono,monospace">Claude AI</text>
      {[{cx:100,cy:60,lbl:'CEO'},{cx:100,cy:150,lbl:'CTO'}].map(n=>(
        <g key={n.lbl}>
          <circle cx={n.cx} cy={n.cy} r="24" fill="rgba(59,130,246,.14)" stroke="#3B82F6" strokeWidth="1"/>
          <text x={n.cx} y={n.cy-3} textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="JetBrains Mono,monospace">{n.lbl}</text>
          <text x={n.cx} y={n.cy+9} textAnchor="middle" fill="#60a5fa" fontSize="7" fontFamily="JetBrains Mono,monospace">Agent</text>
          <line x1={n.cx+24} y1={n.cy} x2="210" y2="100" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 3" opacity=".5"/>
        </g>
      ))}
      {[{cx:380,cy:60,lbl:'CMO',c:'#8B5CF6',tc:'#c4b5fd'},{cx:380,cy:150,lbl:'n8n',c:'#14b8a6',tc:'#5eead4'}].map(n=>(
        <g key={n.lbl}>
          <circle cx={n.cx} cy={n.cy} r="24" fill={`${n.c}22`} stroke={n.c} strokeWidth="1"/>
          <text x={n.cx} y={n.cy-3} textAnchor="middle" fill={n.tc} fontSize="8" fontFamily="JetBrains Mono,monospace">{n.lbl}</text>
          <text x={n.cx} y={n.cy+9} textAnchor="middle" fill={n.c}  fontSize="7" fontFamily="JetBrains Mono,monospace">Agent</text>
          <line x1={n.cx-24} y1={n.cy} x2="270" y2="100" stroke={n.c} strokeWidth="1" strokeDasharray="4 3" opacity=".5"/>
        </g>
      ))}
      <rect x="16" y="16" width="100" height="22" rx="11" fill="rgba(34,197,94,.1)" stroke="rgba(34,197,94,.3)"/>
      <circle cx="28" cy="27" r="4" fill="#22c55e"/>
      <text x="38" y="31" fill="#4ade80" fontSize="9" fontFamily="JetBrains Mono,monospace">OPERATIVO</text>
    </svg>
  );
}

// ── Story data ────────────────────────────────────────────────────────────────
const FEAT_STORIES = [
  {
    tag:'AI · 49 Agentes autónomos', title:'IA Digox Services — Autonomous AI Agency',
    stack:['Claude AI','n8n','React','Firebase'],
    problem:{es:'Las pymes latinoamericanas necesitan estrategia de IA pero no pueden pagar un equipo completo de consultores. La brecha entre necesidad y acceso es enorme.',en:'Latin American SMBs need AI strategy but can\'t afford a full consulting team. The gap between need and access is enormous.'},
    solution:{es:'Construí una agencia de consultoría IA autónoma donde agentes Claude actúan como CEO, CTO y CMO coordinados por workflows n8n. Cada agente tiene rol, contexto y herramientas específicas.',en:'I built an autonomous AI consulting agency where Claude agents act as CEO, CTO and CMO, coordinated by n8n workflows. Each agent has a specific role, context and toolset.'},
    hint:{es:'El diagrama muestra el pipeline de agentes en tiempo real. CEO delega, CTO ejecuta, CMO comunica.',en:'The diagram shows the real-time agent pipeline. CEO delegates, CTO executes, CMO communicates.'},
    impact:{es:'49 agentes construidos · 5 workflows activos · Primer sistema multi-agente productivizado en portafolio independiente de consultoría en Chile.',en:'49 agents built · 5 active workflows · First productized multi-agent system in an independent consulting portfolio in Chile.'},
    Demo: DigoxViz,
  },
  {
    tag:'ML · Logistic Regression', title:'Churn Analysis — XGBoost Predictor',
    stack:['Python','XGBoost','Scikit-learn','Tableau'],
    problem:{es:'Una empresa SaaS no sabía qué clientes iban a cancelar hasta que ya era demasiado tarde. El equipo de retención actuaba reactivamente, sin datos.',en:'A SaaS company didn\'t know which customers were going to cancel until it was too late. The retention team acted reactively, without data.'},
    solution:{es:'Entrené un modelo de regresión logística con 40+ features de comportamiento. El número de tickets de soporte resultó ser el predictor más fuerte (coef +0.223). Con más de 5 tickets/mes y contrato corto, el riesgo de churn supera el 70%.',en:'I trained a logistic regression model with 40+ behavioral features. Support ticket count turned out to be the strongest predictor (coef +0.223). With 5+ tickets/month and a short contract, churn risk exceeds 70%.'},
    hint:{es:'Mueve los sliders: más tickets + contrato corto + cargo alto = mayor probabilidad de churn. La curva ROC muestra el rendimiento real del modelo.',en:'Move the sliders: more tickets + short contract + high charge = higher churn probability. The ROC curve shows the model\'s real performance.'},
    impact:{es:'AUC 0.881 · Accuracy 68% · Recall 50.8% · $2.3M LTV protegido estimado · Reducción de churn del 20% con intervención temprana.',en:'AUC 0.881 · Accuracy 68% · Recall 50.8% · $2.3M estimated protected LTV · 20% churn reduction with early intervention.'},
    Demo: InteractiveChurn,
  },
  {
    tag:'BI · 36 meses datos', title:'Executive Finance Dashboard — 36-Month KPIs',
    stack:['React','Power BI','DAX','Chart.js'],
    problem:{es:'El equipo directivo recibía reportes mensuales en Excel. Sin visibilidad en tiempo real, las decisiones se tomaban sobre datos de hace 30 días.',en:'The executive team received monthly Excel reports. Without real-time visibility, decisions were made on 30-day-old data.'},
    solution:{es:'Dashboard ejecutivo con 36 meses de datos sintéticos, 6 KPIs clave y tendencia lineal + estacionalidad senoidal. Embebible en Power BI o como webapp standalone.',en:'Executive dashboard with 36 months of synthetic data, 6 key KPIs, and linear trend + sinusoidal seasonality. Embeddable in Power BI or as a standalone webapp.'},
    hint:{es:'Mueve el slider de mes para ver cómo evolucionan MRR, NRR, churn rate y win rate a lo largo de 3 años. El sparkline muestra la tendencia de los últimos 6 meses.',en:'Move the month slider to see how MRR, NRR, churn rate and win rate evolve over 3 years. The sparkline shows the last 6-month trend.'},
    impact:{es:'Revenue $480K→$920K en 36 meses · Churn 8%→4% (tendencia positiva) · NRR 108%→118% · 6 KPIs actualizados en tiempo real.',en:'Revenue $480K→$920K over 36 months · Churn 8%→4% (positive trend) · NRR 108%→118% · 6 KPIs updated in real time.'},
    Demo: InteractiveDashboard,
  },
  {
    tag:'ML · Dynamic Pricing', title:'Hotel Revenue Management Engine',
    stack:['Python','NumPy','Pandas','Revenue Mgmt'],
    problem:{es:'Un hotel cobraba el mismo precio base todo el año, dejando dinero sobre la mesa en temporada alta y perdiendo ocupación en temporada baja.',en:'A hotel charged the same base price all year, leaving money on the table in high season and losing occupancy in low season.'},
    solution:{es:'Motor de pricing con 6 factores multiplicativos: temporada del mes, día de la semana, días de anticipación, ocupación actual y eventos especiales. El precio se ajusta automáticamente entre 0.7× y 2.2× del precio base.',en:'Pricing engine with 6 multiplicative factors: month seasonality, day of week, lead days, current occupancy and special events. Price auto-adjusts between 0.7× and 2.2× of base price.'},
    hint:{es:'Selecciona el tipo de habitación y ajusta ocupación y anticipación. Alta ocupación con poca anticipación dispara el precio. El sparkline muestra los próximos 14 días.',en:'Select room type and adjust occupancy and lead days. High occupancy with little lead time drives up the price. The sparkline shows the next 14 days.'},
    impact:{es:'Suite en agosto (alta temporada, 90% ocupación, 1 día anticipación) → $704/noche vs base $320. Incremento de revenue del 120%.',en:'Suite in August (high season, 90% occupancy, 1 day lead) → $704/night vs $320 base. 120% revenue increase.'},
    Demo: InteractivePricing,
  },
];

const ALL_STORIES = [
  {
    tag:'ETL · APIs', title:'Sales & Weather ETL Pipeline',
    stack:['Python','Pandas','SQL','Jupyter'],
    problem:{es:'Los datos de ventas y clima vivían en silos separados. No había forma de analizar si las condiciones meteorológicas afectaban las ventas por región.',en:'Sales and weather data lived in separate silos. There was no way to analyze if weather conditions affected regional sales.'},
    solution:{es:'Pipeline ETL que extrae 9.800 transacciones de ventas + 2.9M registros climáticos de APIs externas, aplica feature engineering automático (temp_bucket, is_weekend, revenue_per_unit) y exporta a 6 JSONs para dashboards.',en:'ETL pipeline extracting 9,800 sales transactions + 2.9M weather records from external APIs, applying automatic feature engineering (temp_bucket, is_weekend, revenue_per_unit) and exporting to 6 JSONs for dashboards.'},
    hint:{es:'Presiona "Run" para ver el pipeline completo: EXTRACT (contadores animados) → TRANSFORM (3 operaciones) → LOAD (archivos generados).',en:'Press "Run" to see the full pipeline: EXTRACT (animated counters) → TRANSFORM (3 operations) → LOAD (generated files).'},
    impact:{es:'9.800 ventas procesadas · 2.9M registros climáticos integrados · 6 JSON files exportados · Feature engineering automático en producción.',en:'9,800 sales processed · 2.9M weather records integrated · 6 JSON files exported · Automatic feature engineering in production.'},
    Demo: InteractiveETL,
  },
  {
    tag:'SQL · Analytics', title:'Sales Optimization — 5 Analytical Queries',
    stack:['SQL','PostgreSQL','Analytics'],
    problem:{es:'El equipo de analytics perdía horas escribiendo queries ad-hoc sin estructura. Sin templates reutilizables, cada análisis empezaba desde cero.',en:'The analytics team wasted hours writing ad-hoc queries without structure. Without reusable templates, every analysis started from scratch.'},
    solution:{es:'5 queries optimizadas que cubren los análisis más frecuentes: márgenes por región, top vendedores por año, producto × segmento, tendencia mensual y detección de bajo margen.',en:'5 optimized queries covering the most frequent analyses: margins by region, top sellers by year, product × segment, monthly trend and low-margin detection.'},
    hint:{es:'Selecciona cualquier query para ver el SQL real con syntax highlighting y los resultados simulados. Keywords en azul, strings en violeta, números en amarillo.',en:'Select any query to see the real SQL with syntax highlighting and simulated results. Keywords in blue, strings in purple, numbers in yellow.'},
    impact:{es:'West region: $725K revenue · 18.2% margen. Top seller SP-007: $312K. Furniture detectado como categoría de bajo margen (< $40K profit).',en:'West region: $725K revenue · 18.2% margin. Top seller SP-007: $312K. Furniture detected as low-margin category (< $40K profit).'},
    Demo: InteractiveSQL,
  },
  {
    tag:'Revenue · Hospitality', title:'Revenue Management Dashboard',
    stack:['Python','Revenue Mgmt','Pandas'],
    problem:{es:'El hotel fijaba precios manualmente sin considerar la demanda del mercado. El RevPAR (revenue por habitación disponible) era subóptimo en todas las temporadas.',en:'The hotel set prices manually without considering market demand. RevPAR (revenue per available room) was suboptimal across all seasons.'},
    solution:{es:'Simulador con calcRevenue() que calcula ADR, RevPAR, habitaciones reservadas y revenue diario en tiempo real según los parámetros de ocupación y multiplicador de demanda.',en:'Simulator with calcRevenue() that calculates ADR, RevPAR, booked rooms and daily revenue in real time based on occupancy and demand multiplier parameters.'},
    hint:{es:'Sube la demanda a 1.5× y la ocupación al 90%: el RevPAR y el revenue diario se disparan. Bájala a 0.7× con 40% ocupación para ver el impacto negativo.',en:'Raise demand to 1.5× and occupancy to 90%: RevPAR and daily revenue spike. Lower to 0.7× with 40% occupancy to see the negative impact.'},
    impact:{es:'Ocupación 75% + demanda 1.0× → RevPAR $112 · Daily Rev $11.2K. Al 90% + 1.5× → RevPAR $202 · Daily Rev $20.2K (+80%).',en:'75% occupancy + 1.0× demand → RevPAR $112 · Daily Rev $11.2K. At 90% + 1.5× → RevPAR $202 · Daily Rev $20.2K (+80%).'},
    Demo: InteractiveRevMgmt,
  },
  {
    tag:'Cybersecurity · SIEM', title:'Security Log Analysis — SIEM',
    stack:['Python','SIEM','ISC2 CC'],
    problem:{es:'Un equipo de seguridad recibía miles de logs por minuto. Detectar ataques de fuerza bruta manualmente era imposible. Los incidentes se detectaban horas después de ocurridos.',en:'A security team received thousands of logs per minute. Manually detecting brute force attacks was impossible. Incidents were detected hours after they occurred.'},
    solution:{es:'Sistema de análisis de logs en tiempo real que clasifica eventos por tipo (LOGIN_SUCCESS, ACCESS_DENIED, PORT_SCAN, BRUTE_FORCE) y dispara alerta automática al superar el umbral de 5 intentos fallidos.',en:'Real-time log analysis system that classifies events by type (LOGIN_SUCCESS, ACCESS_DENIED, PORT_SCAN, BRUTE_FORCE) and auto-triggers an alert when the 5 failed attempts threshold is exceeded.'},
    hint:{es:'Presiona "Analizar Logs" y observa cómo los eventos aparecen en tiempo real. Verde = legítimo, amarillo = sospechoso, rojo = ataque confirmado.',en:'Press "Analizar Logs" and watch events appear in real time. Green = legitimate, yellow = suspicious, red = confirmed attack.'},
    impact:{es:'IP 10.0.0.99 detectada: PORT_SCAN + 4 LOGIN_FAILED + BRUTE_FORCE en 47 segundos. Alerta generada y IP bloqueada automáticamente.',en:'IP 10.0.0.99 detected: PORT_SCAN + 4 LOGIN_FAILED + BRUTE_FORCE in 47 seconds. Alert generated and IP automatically blocked.'},
    Demo: InteractiveSIEM,
  },
  {
    tag:'Cybersecurity · Scanning', title:'Vulnerability Scanner',
    stack:['Python','Networking','Security'],
    problem:{es:'Un sysadmin necesitaba auditar la superficie de ataque de sus servidores regularmente, pero las herramientas disponibles eran complejas o costosas.',en:'A sysadmin needed to regularly audit the attack surface of their servers, but available tools were complex or expensive.'},
    solution:{es:'Scanner de puertos con clasificación automática de severidad: CRÍTICA (Telnet/texto plano), ALTA (FTP/RDP), MEDIA (HTTP sin cifrado/SMTP). Incluye recomendación de remediación específica por vulnerabilidad.',en:'Port scanner with automatic severity classification: CRITICAL (Telnet/plain text), HIGH (FTP/RDP), MEDIUM (HTTP without encryption/SMTP). Includes specific remediation recommendation per vulnerability.'},
    hint:{es:'Ingresa cualquier IP y presiona "Scan". Los puertos aparecen uno a uno con su estado. Los OPEN muestran su nivel de riesgo y qué hacer para remediarlo.',en:'Enter any IP and press "Scan". Ports appear one by one with their status. OPEN ports show their risk level and what to do to remediate.'},
    impact:{es:'Puerto 23 (Telnet): severidad CRÍTICA detectada. Recomendación: migrar a SSH. Puerto 3389 (RDP): ALTA — restringir acceso. Reporte automático en segundos.',en:'Port 23 (Telnet): CRITICAL severity detected. Recommendation: migrate to SSH. Port 3389 (RDP): HIGH — restrict access. Automatic report in seconds.'},
    Demo: InteractiveScanner,
  },
  {
    tag:'AI · Procurement', title:'LicitaBot — Public Procurement AI',
    stack:['Python','Claude AI','APIs'],
    problem:{es:'Las empresas perdían licitaciones públicas millonarias por no enterarse a tiempo o por no poder filtrar las relevantes entre cientos de publicaciones diarias.',en:'Companies missed multi-million public tenders by not finding out in time or failing to filter relevant ones from hundreds of daily publications.'},
    solution:{es:'Dashboard de licitaciones con match scoring por IA. Filtra por organismo o descripción en tiempo real. Las licitaciones con match >90% reciben badge "TOP MATCH" para priorización inmediata.',en:'Procurement dashboard with AI match scoring. Filters by entity or description in real time. Tenders with >90% match receive a "TOP MATCH" badge for immediate prioritization.'},
    hint:{es:'Busca "Salud" o "BI" en el input para filtrar en tiempo real. Las licitaciones con match >90% tienen badge verde. MINEDUC (BI para métricas) tiene 95% de match.',en:'Search "Salud" or "BI" in the input to filter in real time. Tenders with >90% match have a green badge. MINEDUC (BI for metrics) has 95% match.'},
    impact:{es:'5 licitaciones monitoreadas · $890K–$12.1M rango de valores · Match scoring automático · MINEDUC Plataforma BI: 95% match, $6.8M, estado CERRADA (oportunidad perdida que el sistema habría capturado).',en:'5 tenders monitored · $890K–$12.1M value range · Automatic match scoring · MINEDUC BI Platform: 95% match, $6.8M, CLOSED status (missed opportunity the system would have captured).'},
    Demo: InteractiveLicita,
  },
  {
    tag:'AI · Job Search', title:'JobPilot — AI Job Tracker',
    stack:['Python','n8n','Claude AI'],
    problem:{es:'Buscar trabajo en múltiples portales era caótico: tabs abiertas, hojas de cálculo manuales y sin visibilidad del estado real de cada candidatura.',en:'Job hunting across multiple portals was chaotic: open tabs, manual spreadsheets and no visibility into the actual status of each application.'},
    solution:{es:'Pipeline automatizado que hace scraping de Indeed, Adzuna y Remotive, filtra por relevancia con IA y organiza las candidaturas en un kanban visual con 4 etapas: Aplicado → Revisión → Entrevista → Oferta.',en:'Automated pipeline that scrapes Indeed, Adzuna and Remotive, filters by AI relevance and organizes applications in a visual kanban with 4 stages: Applied → Review → Interview → Offer.'},
    hint:{es:'Tab "Búsqueda": 3 ofertas de Stripe, Airbnb y Booking.com con salarios, portales y skills requeridas. Tab "Pipeline": kanban con 12 aplicaciones activas y 1 oferta en proceso.',en:'Tab "Búsqueda": 3 offers from Stripe, Airbnb and Booking.com with salaries, portals and required skills. Tab "Pipeline": kanban with 12 active applications and 1 offer in progress.'},
    impact:{es:'3 portales integrados · 12 aplicaciones en seguimiento · 1 oferta activa · Stripe Senior Data Analyst $95K–$130K en pipeline de entrevistas.',en:'3 portals integrated · 12 applications tracked · 1 active offer · Stripe Senior Data Analyst $95K–$130K in interview pipeline.'},
    Demo: InteractiveJobPilot,
  },
];

// ── GH/Demo link icon ─────────────────────────────────────────────────────────
function CardLink({href,label}){
  return (
    <a href={href} target="_blank" rel="noopener" className="card-link">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-label={label}>
        {label==='GitHub'
          ? <path fill="currentColor" stroke="none" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          : <><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/></>
        }
      </svg>
      {label}
    </a>
  );
}

// ── FeaturedProjects ──────────────────────────────────────────────────────────
const FEAT_BADGES=['badge-ai','badge-ml','badge-bi','badge-etl'];
const FEAT_GH=[
  'https://github.com/mindset-code/ia-digox-services',
  'https://github.com/mindset-code/project-churn-analysis',
  'https://github.com/mindset-code/project-executive-dashboard-data',
  'https://github.com/mindset-code/project-hotel-pricing-engine',
];
const FEAT_DEMO=[
  'https://ia-digox-services.web.app',
  '/churn',
  '/dashboard',
  '/hotel',
];
const ALL_GH=[
  'https://github.com/mindset-code/project-sales-weather-etl',
  'https://github.com/mindset-code/project-sales-optimization-sql',
  'https://github.com/mindset-code/project-revenue-management-web',
  'https://github.com/mindset-code/project-security-log-analysis',
  'https://github.com/mindset-code/project-vulnerability-scanner',
  'https://github.com/mindset-code/Proyecto-Licitaciones-Publicas-automatizadas',
  'https://github.com/mindset-code/Busqueda_empleo',
];
const ALL_DEMO=['/etl','/sql','/revenue','/siem','/scanner','/licita','/jobpilot'];

function FeaturedProjects({lang}){
  const [openStory,setOpenStory]=React.useState(null);
  const l=lang;
  const t=(s)=>l==='es'?s.es:s.en;

  return (
    <section id="projects">
      {openStory&&<ProjectModal story={{...openStory,problem:t(openStory.problem),solution:t(openStory.solution),hint:t(openStory.hint),impact:t(openStory.impact)}} lang={lang} onClose={()=>setOpenStory(null)}/>}
      <div className="section-inner">
        <Reveal><p className="section-label"><T es="Trabajo selecto" en="Selected work"/></p></Reveal>
        <Reveal delay={0.05}><h2 className="section-title"><T es="Proyectos Destacados" en="Featured Projects"/></h2></Reveal>
        <Reveal delay={0.1}><p className="section-desc"><T es="Sistemas de datos de producción, modelos ML y productos IA — con impacto medible." en="Production data systems, ML models and AI products — with measurable impact."/></p></Reveal>
        <div className="bento">
          {FEAT_STORIES.map((s,i)=>(
            <Reveal key={s.tag} delay={i*0.06} style={{height:'100%'}}>
              <div className={`bento-card ${i===0?'bento-hero':''}`} style={{height:'100%'}}>
                <span className={`card-badge ${FEAT_BADGES[i]}`}>{s.tag}</span>
                <div className="card-vis" style={{height:i===0?'200px':'220px',padding:'12px',overflow:'auto'}}>
                  <s.Demo/>
                </div>
                <span className="card-tag">{s.tag}</span>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-desc">{t(s.problem).split('.')[0]}.</p>
                <div className="card-stack">{s.stack.map(sk=><span key={sk} className="stack-pill">{sk}</span>)}</div>
                <div className="card-impact">{t(s.impact).split('·')[0].trim()}</div>
                <div className="card-links">
                  <CardLink href={FEAT_GH[i]} label="GitHub"/>
                  <CardLink href={FEAT_DEMO[i]} label="Live Demo"/>
                  <button onClick={()=>setOpenStory(s)} style={{display:'inline-flex',alignItems:'center',gap:'5px',padding:'6px 12px',borderRadius:'7px',background:'rgba(59,130,246,.1)',border:'1px solid rgba(59,130,246,.3)',fontSize:'12px',color:'#93c5fd',cursor:'pointer',fontFamily:'Inter,sans-serif',transition:'all .2s'}} onMouseOver={e=>{e.currentTarget.style.background='rgba(59,130,246,.2)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(59,130,246,.1)'}}>
                    ▶ Historia
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TechStack ─────────────────────────────────────────────────────────────────
const STACK_CATS=[
  {n:'01',es:'AI Engineering',        en:'AI Engineering',
   items:[
     {t:'Claude API',c:'#8B5CF6'},{t:'LangChain',c:'#a78bfa'},{t:'LlamaIndex',c:'#c4b5fd'},
     {t:'RAG Systems',c:'#a78bfa'},{t:'Prompt Engineering',c:'#ddd6fe'},
     {t:'Multi-agent',c:'#8B5CF6'},{t:'MCP',c:'#c4b5fd'},{t:'n8n',c:'#a78bfa'},
     {t:'OpenAI API',c:'#c4b5fd'},{t:'Hugging Face',c:'#f59e0b'},
   ]},
  {n:'02',es:'Data Engineering',      en:'Data Engineering',
   items:[
     {t:'Python',c:'#3B82F6'},{t:'SQL',c:'#3B82F6'},{t:'Pandas',c:'#60a5fa'},
     {t:'NumPy',c:'#60a5fa'},{t:'dbt',c:'#f97316'},{t:'Airflow',c:'#60a5fa'},
     {t:'Scikit-learn',c:'#93c5fd'},{t:'XGBoost',c:'#93c5fd'},
     {t:'PostgreSQL',c:'#3B82F6'},{t:'BigQuery',c:'#4ade80'},{t:'Snowflake',c:'#22d3ee'},
   ]},
  {n:'03',es:'BI & Visualización',    en:'BI & Visualization',
   items:[
     {t:'Power BI',c:'#f59e0b'},{t:'DAX',c:'#f59e0b'},{t:'RLS',c:'#fbbf24'},
     {t:'Tableau',c:'#fbbf24'},{t:'Looker Studio',c:'#4ade80'},
     {t:'Metabase',c:'#60a5fa'},{t:'Chart.js',c:'#93c5fd'},{t:'D3.js',c:'#60a5fa'},
   ]},
  {n:'04',es:'Fullstack & APIs',      en:'Fullstack & APIs',
   items:[
     {t:'React',c:'#60a5fa'},{t:'TypeScript',c:'#3B82F6'},{t:'FastAPI',c:'#4ade80'},
     {t:'Node.js',c:'#4ade80'},{t:'REST',c:'#93c5fd'},{t:'GraphQL',c:'#f87171'},
     {t:'HTML5',c:'#f97316'},{t:'CSS3',c:'#60a5fa'},{t:'Vite',c:'#8B5CF6'},
   ]},
  {n:'05',es:'Cloud, DevOps & Seguridad', en:'Cloud, DevOps & Security',
   items:[
     {t:'GCP',c:'#4ade80'},{t:'AWS',c:'#fbbf24'},{t:'Azure',c:'#60a5fa'},
     {t:'Firebase',c:'#f97316'},{t:'Vercel',c:'#f1f5f9'},{t:'Docker',c:'#22d3ee'},
     {t:'Git',c:'#34d399'},{t:'CI/CD',c:'#34d399'},{t:'ISC2 CC',c:'#f87171'},
     {t:'OWASP',c:'#f87171'},
   ]},
];
function TechStack(){
  return (
    <section id="stack" style={{background:'linear-gradient(180deg,transparent,rgba(59,130,246,.03),transparent)'}}>
      <div className="section-inner">
        <Reveal><p className="section-label"><T es="Herramientas" en="Tools"/></p></Reveal>
        <Reveal delay={0.05}><h2 className="section-title"><T es="Stack Técnico" en="Tech Stack"/></h2></Reveal>
        <Reveal delay={0.1}><p className="section-desc"><T es="Stack completo desde la ingesta de datos hasta el producto IA en producción." en="Full stack from data ingestion to production AI products."/></p></Reveal>
        <div className="stack-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))'}}>
          {STACK_CATS.map((cat,i)=>(
            <Reveal key={cat.n} delay={i*0.07} style={{height:'100%'}}>
              <div className="stack-cat" style={{height:'100%'}}>
                <div><div className="stack-cat-label">{cat.n}</div><div className="stack-cat-title"><T es={cat.es} en={cat.en}/></div></div>
                <div className="stack-items">{cat.items.map(it=><span key={it.t} className="stack-item"><span className="si-dot" style={{background:it.c}}/>{it.t}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Timeline (descending — most recent first) ─────────────────────────────────
const TL=[
  {y:'2011–2012',es:'Marketing & Eventos',en:'Marketing & Events',org:'Agrosuper, Viña del Mar',ach:{es:'Logística y lanzamientos de producto',en:'Logistics and product launches'},tags:['Marketing'],acc:false},
  {y:'2012–2014',es:'Sales Development Representative',en:'SDR',org:'Agrosuper, Viña del Mar',ach:{es:'+60% ventas en 6 meses · +35% expansión de rutas',en:'+60% sales in 6 months · +35% route expansion'},tags:['SDR','B2B'],acc:false},
  {y:'2015',es:'SalesOps Manager',en:'SalesOps Manager',org:'Squadrito SA, Viña del Mar',ach:{es:'Equipo de 80 personas · Revenue Operations',en:'80-person team · Revenue Operations'},tags:['SalesOps','80 personas'],acc:false},
  {y:'2015–2020',es:'RevOps Manager',en:'RevOps Manager',org:'El Mercurio, Viña del Mar',ach:{es:'Lanzamiento e-commerce · +2% revenue incremental',en:'E-commerce launch · +2% incremental revenue'},tags:['RevOps','E-commerce'],acc:false},
  {y:'2020–2022',es:'Regional SalesOps Manager',en:'Regional SalesOps Manager',org:'Procter & Gamble (BGR)',ach:{es:'+18% market share · $2M+ P&L · 100 personas · Forecast 64%→82%',en:'+18% market share · $2M+ P&L · 100-person team · Forecast 64%→82%'},tags:['P&G','$2M+ P&L','100 personas'],acc:false},
  {y:'2022–2023',es:'MBA + Graduate Certificate Analytics',en:'MBA + Graduate Certificate Analytics',org:'Indiana Institute of Technology',ach:{es:'Posgrado completado con especialización en Analytics',en:'Graduate degree with Analytics specialization'},tags:['MBA','Business Analytics'],acc:false},
  {y:'2022–2024',es:'Reconversión Técnica',en:'Technical Retraining',org:'IBM Coursera · ISC2',ach:{es:'IBM Data Science · IBM Full Stack · ISC2 Certified in Cybersecurity',en:'IBM Data Science · IBM Full Stack · ISC2 CC'},tags:['Python','SQL','BI','ISC2 CC'],acc:false},
  {y:'2024–Hoy',es:'AI Engineer & Data Analyst',en:'AI Engineer & Data Analyst',org:'IA Digox Services · Freelance · Barcelona',ach:{es:'14 proyectos · 49 agentes IA · Agencia autónoma operativa',en:'14 projects · 49 AI agents · Autonomous agency operational'},tags:['Claude AI','n8n','MCP','14 proyectos'],acc:true},
];
function Timeline(){
  const reversed=[...TL].reverse();
  return (
    <section id="timeline">
      <div className="section-inner">
        <Reveal><p className="section-label"><T es="Recorrido" en="Journey"/></p></Reveal>
        <Reveal delay={0.05}><h2 className="section-title"><T es="Trayectoria Profesional" en="Professional Journey"/></h2></Reveal>
        <Reveal delay={0.1}><p className="section-desc"><T es="De liderar equipos comerciales a construir sistemas de IA — una reconversión intencional, no accidental." en="From leading commercial teams to building AI systems — an intentional reinvention, not accidental."/></p></Reveal>
        <div className="timeline">
          <div className="tl-line" aria-hidden="true"/>
          <div className="tl-items">
            {reversed.map((item,i)=>(
              <Reveal key={item.y} delay={i*0.035}>
                <div className="tl-item">
                  <div className="tl-dot" aria-hidden="true">
                    <div className="tl-dot-inner" style={item.acc?{background:'linear-gradient(135deg,#8B5CF6,#3B82F6)'}:{}}/>
                  </div>
                  <div className="tl-content">
                    <div className="tl-period" style={item.acc?{color:'#8B5CF6'}:{}}>{item.y}</div>
                    <div className="tl-title"><T es={item.es} en={item.en}/></div>
                    <div style={{fontSize:'12px',color:'#3B82F6',marginBottom:'6px',fontFamily:'var(--font-mono)',fontWeight:'500'}}>{item.org}</div>
                    <div className="tl-desc"><T es={item.ach.es} en={item.ach.en}/></div>
                    <div className="tl-tags">
                      {item.tags.map(t=>(
                        <span key={t} className="tl-tag" style={item.acc?{borderColor:'rgba(139,92,246,.4)',color:'#c4b5fd',background:'rgba(139,92,246,.1)'}:{}}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Cert icon components (Lucide-style SVGs) ─────────────────────────────────
const IcoGradCap  = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const IcoBarChart = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IcoShield   = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IcoCode     = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>;
const IcoLayers   = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IcoAward    = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>;
const IcoBook     = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const IcoTrend    = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;

// ── Certifications ────────────────────────────────────────────────────────────
const CERTS=[
  {Ico:IcoGradCap,  bg:'rgba(59,130,246,.12)', bc:'rgba(59,130,246,.3)', ic:'#93c5fd', name:'MBA',                                          issuer:'Indiana Institute of Technology',   year:'2022–2023'},
  {Ico:IcoBarChart, bg:'rgba(139,92,246,.1)',  bc:'rgba(139,92,246,.3)', ic:'#a78bfa', name:'Graduate Certificate Business Analytics',      issuer:'Indiana Institute of Technology',   year:'2022–2023'},
  {Ico:IcoShield,   bg:'rgba(45,184,75,.1)',   bc:'rgba(45,184,75,.3)',  ic:'#4ade80', name:'ISC2 Certified in Cybersecurity (CC)',          issuer:'ISC2',                              year:'2024'},
  {Ico:IcoCode,     bg:'rgba(59,130,246,.1)',  bc:'rgba(59,130,246,.3)', ic:'#60a5fa', name:'IBM Data Science Professional Certificate',    issuer:'IBM / Coursera',                    year:'2024'},
  {Ico:IcoLayers,   bg:'rgba(20,184,166,.1)',  bc:'rgba(20,184,166,.3)', ic:'#5eead4', name:'IBM Full Stack Software Developer',            issuer:'IBM / Coursera',                    year:'2024'},
  {Ico:IcoGradCap,  bg:'rgba(59,130,246,.12)', bc:'rgba(59,130,246,.3)', ic:'#93c5fd', name:'Master Big Data & Business Intelligence', issuer:'Universidad Isabel I', year:'2021–2022'},
  {Ico:IcoAward,    bg:'rgba(245,158,11,.1)',  bc:'rgba(245,158,11,.3)', ic:'#fbbf24', name:'Diplomado Dirección de Ventas',                issuer:'Pontificia Universidad Católica',   year:'2020'},
  {Ico:IcoBook,     bg:'rgba(239,68,68,.1)',   bc:'rgba(239,68,68,.3)',  ic:'#f87171', name:'Diplomado Gestión y Planificación Tributaria', issuer:'UDLA',                              year:'2022'},
  {Ico:IcoTrend,    bg:'rgba(139,92,246,.1)',  bc:'rgba(139,92,246,.3)', ic:'#c4b5fd', name:'Diplomado Control de Gestión',                 issuer:'UAI',                               year:'2022'},
];
function Certifications(){
  return (
    <section id="certifications" style={{background:'linear-gradient(180deg,transparent,rgba(139,92,246,.03),transparent)'}}>
      <div className="section-inner">
        <Reveal><p className="section-label"><T es="Formación" en="Education"/></p></Reveal>
        <Reveal delay={0.05}><h2 className="section-title"><T es="Certificaciones & Educación" en="Certifications & Education"/></h2></Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'14px',alignItems:'stretch',marginTop:'8px'}}>
          {CERTS.map((c,i)=>{
            const CIcon = c.Ico;
            return (
              <Reveal key={c.name} delay={i*0.04} style={{height:'100%'}}>
                <div className="cert-card" style={{height:'100%',boxSizing:'border-box'}}>
                  <div className="cert-icon" style={{background:c.bg,border:`1px solid ${c.bc}`,color:c.ic,flexShrink:0}}>
                    <CIcon/>
                  </div>
                  <div className="cert-body">
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-issuer">{c.issuer} · {c.year}</div>
                    <a href="#" className="cert-verify" style={{color:c.ic}}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      <T es="Credencial verificada" en="Verified credential"/>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── AdditionalProjects ────────────────────────────────────────────────────────
function AdditionalProjects({lang}){
  const [openStory,setOpenStory]=React.useState(null);
  const l=lang;
  const t=(s)=>l==='es'?s.es:s.en;
  return (
    <section id="more-projects">
      {openStory&&<ProjectModal story={{...openStory,problem:t(openStory.problem),solution:t(openStory.solution),hint:t(openStory.hint),impact:t(openStory.impact)}} lang={lang} onClose={()=>setOpenStory(null)}/>}
      <div className="section-inner">
        <Reveal><p className="section-label"><T es="Más trabajo" en="More work"/></p></Reveal>
        <Reveal delay={0.05}><h2 className="section-title"><T es="Proyectos Adicionales" en="Additional Projects"/></h2></Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:'16px'}}>
          {ALL_STORIES.map((s,i)=>(
            <Reveal key={s.title} delay={i*0.05} style={{height:'100%'}}>
              <div className="bento-card" style={{height:'100%',gap:'12px'}}>
                <div className="card-vis" style={{height:'160px',padding:'10px',overflowY:'auto',overflowX:'hidden'}}>
                  <s.Demo/>
                </div>
                <span className="card-tag">{s.tag}</span>
                <h3 className="card-title" style={{fontSize:'16px'}}>{s.title}</h3>
                <p className="card-desc" style={{fontSize:'13px'}}>{t(s.problem).split('.')[0]}.</p>
                <div className="card-stack">{s.stack.map(sk=><span key={sk} className="stack-pill">{sk}</span>)}</div>
                <div className="card-links">
                  <CardLink href={ALL_GH[i]} label="GitHub"/>
                  <CardLink href={ALL_DEMO[i]} label="Live Demo"/>
                  <button onClick={()=>setOpenStory(s)} style={{display:'inline-flex',alignItems:'center',gap:'5px',padding:'6px 12px',borderRadius:'7px',background:'rgba(59,130,246,.1)',border:'1px solid rgba(59,130,246,.3)',fontSize:'12px',color:'#93c5fd',cursor:'pointer',fontFamily:'Inter,sans-serif',transition:'all .2s'}} onMouseOver={e=>{e.currentTarget.style.background='rgba(59,130,246,.2)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(59,130,246,.1)'}}>
                    ▶ Historia
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About(){
  return (
    <section id="about" style={{background:'linear-gradient(180deg,transparent,rgba(59,130,246,.03),transparent)'}}>
      <div className="section-inner">
        <Reveal><p className="section-label"><T es="Sobre mí" en="About me"/></p></Reveal>
        <div className="about-grid">
          <Reveal><div className="about-avatar" aria-label="Mindset & Code">GU</div></Reveal>
          <div className="about-text">
            <Reveal><h3><T es="De la operación comercial al dato, del dato a la IA." en="From commercial ops to data, from data to AI."/></h3></Reveal>
            <Reveal delay={0.05}><p><T es="Mi carrera empezó en ventas de campo en Agrosuper — aprendí que la diferencia entre cerrar o perder un cliente muchas veces es el dato correcto en el momento correcto. Eso me llevó a liderar Revenue Operations en El Mercurio y luego en Procter & Gamble, donde co-diseñé un sistema de forecasting que pasó del 64% al 82% de precisión y redujo el error de inventario un 35%. Gestioné un equipo de 100 personas y un P&L de USD 2M+." en="My career started in field sales at Agrosuper — I learned early that winning or losing a deal often comes down to having the right data at the right moment. That led me to lead Revenue Operations at El Mercurio and then Procter & Gamble, where I co-designed a forecasting system that went from 64% to 82% accuracy and cut inventory error by 35%. I managed a 100-person team and a $2M+ P&L."/></p></Reveal>
            <Reveal delay={0.1}><p><T es="En 2022 dejé el management para reconvertirme técnicamente: MBA en Business Analytics (Indiana Tech), certificaciones IBM en Data Science y Full Stack, ISC2 CC en ciberseguridad. Los últimos 4 años construí el stack que siempre quise tener: pipelines ETL reales, modelos ML en producción, dashboards ejecutivos, y una agencia IA autónoma operada por agentes Claude." en="In 2022 I left management to retrain technically: MBA in Business Analytics (Indiana Tech), IBM certifications in Data Science and Full Stack, ISC2 CC in cybersecurity. The past 4 years I built the stack I always wanted: real ETL pipelines, ML models in production, executive dashboards, and an autonomous AI agency operated by Claude agents."/></p></Reveal>
            <Reveal delay={0.15}>
              <div className="about-badges">
                {['Remote-native','Bilingüe ES/EN','Business + Technical','Barcelona 🇪🇸'].map(b=><span key={b} className="about-badge">{b}</span>)}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{marginTop:'20px'}}>
                <a href="https://linkedin.com/company/mindset-code" target="_blank" rel="noopener" className="card-link" style={{display:'inline-flex'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact(){
  return (
    <section id="contact" className="contact-section">
      <div className="section-inner">
        <div className="contact-inner">
          <Reveal>
            <h2><T es="¿Hablamos sobre tu próximo proyecto de datos?" en="Let's talk about your next data project."/></h2>
            <p><T es="Disponible para roles full-time o project-based, 100% remoto global. Prioridad a empresas de tecnología, scale-ups o cualquier organización con ambición real de datos." en="Available for full-time or project-based roles, 100% remote globally. Priority to tech companies, scale-ups, or organizations with real data ambition."/></p>
            <a href="mailto:contacto@mindset-code.com" className="contact-email">contacto@mindset-code.com</a>
            <div className="contact-btns">
              <a href="https://linkedin.com/company/mindset-code" target="_blank" rel="noopener" className="btn-primary">LinkedIn</a>
              <a href="https://github.com/mindset-code" target="_blank" rel="noopener" className="btn-outline">GitHub</a>
              <a href="#" className="btn-outline"><T es="Descargar CV" en="Download CV"/></a>
            </div>
            <p className="contact-avail"><T es="Disponible para entrevistas — respondo en menos de 24h" en="Available for interviews — I reply within 24h"/></p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App(){
  const [lang,setLang]=React.useState('es');
  return (
    <LangCtx.Provider value={lang}>
      <Navbar lang={lang} setLang={setLang}/>
      <Hero/>
      <FeaturedProjects lang={lang}/>
      <TechStack/>
      <Timeline/>
      <Certifications/>
      <AdditionalProjects lang={lang}/>
      <About/>
      <Contact/>
      <footer style={{padding:'32px',textAlign:'center',color:'var(--muted)',fontSize:'13px',borderTop:'1px solid var(--border)'}}>
        <p>Mindset & Code ·{' '}
          <span style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',fontWeight:'600'}}>
            AI Engineer · Data Analyst · Revenue Operations
          </span>{' '}· 2025
        </p>
      </footer>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
