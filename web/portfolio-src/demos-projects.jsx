// PROJECT DEMOS — ETL, SQL, RevMgmt, SIEM, Scanner, Licita, JobPilot
const { useState, useEffect } = React;

// ── InteractiveETL ────────────────────────────────────────────────────────────
function InteractiveETL() {
  const [stage, setStage]   = useState('idle');
  const [sales, setSales]   = useState(0);
  const [weather, setWeather] = useState(0);
  const [ops, setOps]       = useState([]);
  const [loads, setLoads]   = useState([]);

  const run = () => {
    if(stage==='extracting'||stage==='transforming'||stage==='loading') return;
    setStage('extracting'); setSales(0); setWeather(0); setOps([]); setLoads([]);
    let s=0,w=0,tick=0;
    const iv = setInterval(()=>{
      tick++; s=Math.min(9800,s+490); w=Math.min(2900000,w+145000);
      setSales(s); setWeather(w);
      if(tick>=20){
        clearInterval(iv);
        setStage('transforming');
        ['✓ Fahrenheit → Celsius','✓ City join (LEFT JOIN on city+date)','✓ Features: temp_bucket, is_weekend, revenue_per_unit']
          .forEach((op,i)=>setTimeout(()=>setOps(p=>[...p,op]),(i+1)*700));
        setTimeout(()=>{
          setStage('loading');
          ['✓ warehouse.csv generado','✓ 6 JSON files exportados']
            .forEach((l,i)=>setTimeout(()=>setLoads(p=>[...p,l]),(i+1)*500));
          setTimeout(()=>setStage('done'),1800);
        },2600);
      }
    },100);
  };

  const stageIdx = {idle:-1,extracting:0,transforming:1,loading:2,done:2}[stage];
  const stageClr = {idle:'#475569',extracting:'#3B82F6',transforming:'#8B5CF6',loading:'#14b8a6',done:'#4ade80'};

  return (
    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#94A3B8'}}>
      <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'8px'}}>
        {['EXTRACT','TRANSFORM','LOAD'].map((s,i)=>(
          <React.Fragment key={s}>
            <div style={{flex:1,padding:'4px',borderRadius:'5px',textAlign:'center',fontSize:'9px',border:`1px solid ${i===stageIdx?stageClr[stage]:'#1E293B'}`,background:i===stageIdx?'rgba(59,130,246,.08)':'rgba(255,255,255,.02)',color:i<=stageIdx?'#f1f5f9':'#475569',transition:'all 0.4s'}}>{s}</div>
            {i<2&&<span style={{color:'#334155',fontSize:'9px'}}>›</span>}
          </React.Fragment>
        ))}
        <button onClick={run} style={{padding:'3px 8px',borderRadius:'4px',border:`1px solid ${stage==='done'?'#4ade80':'#3B82F6'}`,background:stage==='done'?'rgba(74,222,128,.08)':'rgba(59,130,246,.08)',color:stage==='done'?'#4ade80':'#93c5fd',cursor:'pointer',fontSize:'9px',fontFamily:'JetBrains Mono,monospace'}}>
          {stage==='idle'||stage==='done'?'▶ Run':'···'}
        </button>
      </div>
      <div style={{height:'82px',background:'rgba(0,0,0,.3)',borderRadius:'6px',padding:'7px',overflowY:'auto'}}>
        {stage==='idle'&&<span style={{color:'#334155'}}>Esperando ejecución del pipeline...</span>}
        {sales>0&&<div style={{marginBottom:'3px'}}><span style={{color:'#3B82F6'}}>EXTRACT </span><span style={{color:'#f1f5f9'}}>{sales.toLocaleString()} ventas · {(weather/1000).toFixed(0)}K climate rows</span></div>}
        {ops.map((o,i)=><div key={i} style={{color:'#a78bfa',marginBottom:'2px'}}>{o}</div>)}
        {loads.map((l,i)=><div key={i} style={{color:'#5eead4',marginBottom:'2px'}}>{l}</div>)}
        {stage==='done'&&<div style={{marginTop:'5px',padding:'3px 8px',background:'rgba(74,222,128,.06)',border:'1px solid rgba(74,222,128,.2)',borderRadius:'4px',color:'#4ade80'}}>9,800 ventas · 2.9M clima · 6 JSONs exportados</div>}
      </div>
    </div>
  );
}

// ── InteractiveSQL ────────────────────────────────────────────────────────────
const SQL_Q = {
  'Margen/Región':{sql:`SELECT region,\n  SUM(sales_amount) AS revenue,\n  ROUND(AVG(margin_pct),1) AS margin\nFROM sales\nGROUP BY region\nORDER BY revenue DESC`,cols:['Region','Revenue','Margin'],rows:[['West','$725K','18.2%'],['East','$612K','15.8%'],['Central','$398K','12.1%']]},
  'Top Vendedores':{sql:`SELECT salesperson_id,\n  SUM(amount) AS total\nFROM sales\nWHERE YEAR(date)=2024\nGROUP BY salesperson_id\nORDER BY total DESC LIMIT 5`,cols:['ID','Total'],rows:[['SP-007','$312K'],['SP-023','$287K'],['SP-041','$245K']]},
  'Prod×Cliente':{sql:`SELECT category, segment,\n  COUNT(*) AS deals\nFROM sales s\nJOIN products p ON s.product_id=p.id\nGROUP BY category, segment\nORDER BY deals DESC`,cols:['Category','Segment','Deals'],rows:[['Technology','Corporate','145'],['Technology','Consumer','98'],['Furniture','Corporate','87']]},
  'Tendencia Mes':{sql:`SELECT DATE_FORMAT(date,'%Y-%m') AS month,\n  SUM(amount) AS revenue\nFROM sales\nGROUP BY month\nORDER BY month ASC`,cols:['Mes','Revenue'],rows:[['2024-01','$45K'],['2024-02','$52K'],['2024-03','$61K']]},
  'Bajo Margen':{sql:`SELECT category,\n  SUM(revenue) AS rev,\n  SUM(profit) AS profit\nFROM sales\nHAVING margin_pct < 15\nORDER BY profit ASC`,cols:['Categoría','Rev','Profit'],rows:[['Furniture','$420K','$40K'],['Office Sup','$180K','$25K']]},
};

function InteractiveSQL() {
  const keys = Object.keys(SQL_Q);
  const [sel, setSel] = useState(keys[0]);
  const q = SQL_Q[sel];

  const hl = sql => sql
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|JOIN|ON|HAVING|LIMIT|SUM|ROUND|AVG|COUNT|DATE_FORMAT|AS|BY|DESC|ASC|YEAR|AND|DISTINCT|LEFT|INNER)\b/g,'<span style="color:#60a5fa">$1</span>')
    .replace(/'[^']*'/g,s=>`<span style="color:#a78bfa">${s}</span>`)
    .replace(/\b(\d+)\b/g,'<span style="color:#fbbf24">$1</span>');

  return (
    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#94A3B8'}}>
      <div style={{display:'flex',flexWrap:'wrap',gap:'4px',marginBottom:'7px'}}>
        {keys.map(k=>(
          <button key={k} onClick={()=>setSel(k)} style={{padding:'2px 8px',borderRadius:'4px',border:`1px solid ${sel===k?'#3B82F6':'#1E293B'}`,background:sel===k?'rgba(59,130,246,.15)':'rgba(255,255,255,.02)',color:sel===k?'#93c5fd':'#475569',cursor:'pointer',fontSize:'9px',fontFamily:'JetBrains Mono,monospace'}}>{k}</button>
        ))}
      </div>
      <div style={{background:'rgba(0,0,0,.35)',borderRadius:'5px',padding:'7px',marginBottom:'7px',fontSize:'9px',lineHeight:'1.65',whiteSpace:'pre',overflowX:'auto'}} dangerouslySetInnerHTML={{__html:hl(q.sql)}}/>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'9px'}}>
        <thead><tr>{q.cols.map(c=><th key={c} style={{textAlign:'left',padding:'2px 6px',color:'#475569',borderBottom:'1px solid #1E293B'}}>{c}</th>)}</tr></thead>
        <tbody>{q.rows.map((r,i)=><tr key={i}>{r.map((cell,j)=><td key={j} style={{padding:'2px 6px',color:j>0?'#4ade80':'#f1f5f9'}}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

// ── InteractiveRevMgmt ────────────────────────────────────────────────────────
function InteractiveRevMgmt() {
  const [occ,setOcc] = useState(75);
  const [dem,setDem] = useState(10); // ×0.1

  const rooms=100, base=150;
  const effP  = base*(dem/10);
  const booked= Math.round(rooms*(occ/100));
  const daily = booked*effP;
  const revpar= daily/rooms;

  const kpis=[
    {label:'ADR',      val:`$${effP.toFixed(0)}`,        color:'#3B82F6'},
    {label:'Occupancy',val:`${occ}%`,                    color:'#4ade80'},
    {label:'RevPAR',   val:`$${revpar.toFixed(0)}`,      color:'#a78bfa'},
    {label:'Daily Rev',val:`$${(daily/1000).toFixed(1)}K`,color:'#fbbf24'},
  ];

  return (
    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#94A3B8'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'10px'}}>
        <div>
          <div style={{marginBottom:'3px'}}>Ocupación: <span style={{color:'#f1f5f9'}}>{occ}%</span></div>
          <input type="range" min="30" max="100" value={occ} onChange={e=>setOcc(+e.target.value)} style={{width:'100%',cursor:'pointer',accentColor:'#3B82F6'}}/>
        </div>
        <div>
          <div style={{marginBottom:'3px'}}>Demanda: <span style={{color:'#f1f5f9'}}>{(dem/10).toFixed(1)}×</span></div>
          <input type="range" min="5" max="20" value={dem} onChange={e=>setDem(+e.target.value)} style={{width:'100%',cursor:'pointer',accentColor:'#8B5CF6'}}/>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px'}}>
        {kpis.map(k=>(
          <div key={k.label} style={{background:'rgba(255,255,255,.03)',border:'1px solid #1E293B',borderRadius:'6px',padding:'7px',textAlign:'center'}}>
            <div style={{color:'#475569',fontSize:'8px',marginBottom:'3px'}}>{k.label}</div>
            <div style={{color:k.color,fontSize:'14px',fontWeight:'700',fontFamily:'Poppins,sans-serif',transition:'all 0.25s'}}>{k.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── InteractiveSIEM ───────────────────────────────────────────────────────────
const LOGS=[
  {time:'08:14:22',ip:'192.168.1.5', type:'LOGIN_SUCCESS', msg:'User admin authenticated',         color:'#4ade80'},
  {time:'08:14:45',ip:'10.0.0.99',   type:'ACCESS_DENIED', msg:'Unauthorized resource /admin',      color:'#fbbf24'},
  {time:'08:15:01',ip:'10.0.0.99',   type:'PORT_SCAN',     msg:'Detected port scanning activity',   color:'#fbbf24'},
  {time:'08:15:03',ip:'10.0.0.99',   type:'LOGIN_FAILED',  msg:'Invalid credentials (attempt 1)',   color:'#f87171'},
  {time:'08:15:05',ip:'10.0.0.99',   type:'LOGIN_FAILED',  msg:'Invalid credentials (attempt 2)',   color:'#f87171'},
  {time:'08:15:07',ip:'10.0.0.99',   type:'LOGIN_FAILED',  msg:'Invalid credentials (attempt 3)',   color:'#f87171'},
  {time:'08:15:08',ip:'10.0.0.99',   type:'LOGIN_FAILED',  msg:'Invalid credentials (attempt 4)',   color:'#f87171'},
  {time:'08:15:09',ip:'10.0.0.99',   type:'BRUTE_FORCE',   msg:'⚠ Threshold exceeded (>5 attempts)',color:'#ef4444'},
];

function InteractiveSIEM() {
  const [visible,setVisible]=useState([]);
  const [done,setDone]=useState(false);
  const [running,setRunning]=useState(false);

  const scan=()=>{
    if(running) return;
    setVisible([]); setDone(false); setRunning(true);
    LOGS.forEach((l,i)=>setTimeout(()=>{
      setVisible(p=>[...p,l]);
      if(i===LOGS.length-1) setTimeout(()=>{setDone(true);setRunning(false);},500);
    },i*220));
  };

  return (
    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#94A3B8'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
        <span style={{color:'#3B82F6',fontSize:'10px',fontWeight:'500'}}>SIEM — Log Analysis</span>
        <button onClick={scan} style={{padding:'3px 10px',borderRadius:'4px',border:'1px solid #3B82F6',background:'rgba(59,130,246,.1)',color:'#93c5fd',cursor:'pointer',fontSize:'9px',fontFamily:'JetBrains Mono,monospace'}}>
          {running?'Scanning...':'▶ Analizar Logs'}
        </button>
      </div>
      <div style={{height:'90px',overflowY:'auto',background:'rgba(0,0,0,.32)',borderRadius:'5px',padding:'6px'}}>
        {visible.length===0&&<span style={{color:'#334155'}}>Esperando ejecución...</span>}
        {visible.map((l,i)=>(
          <div key={i} style={{marginBottom:'2px',display:'flex',gap:'5px',lineHeight:'1.5',fontSize:'8.5px'}}>
            <span style={{color:'#475569',flexShrink:0}}>{l.time}</span>
            <span style={{color:'#64748b',flexShrink:0,minWidth:'72px'}}>{l.ip}</span>
            <span style={{color:l.color,flexShrink:0,minWidth:'86px'}}>[{l.type}]</span>
            <span style={{color:'#94A3B8'}}>{l.msg}</span>
          </div>
        ))}
      </div>
      {done&&<div style={{marginTop:'5px',padding:'4px 8px',background:'rgba(59,130,246,.05)',border:'1px solid rgba(59,130,246,.2)',borderRadius:'4px',color:'#93c5fd',fontSize:'8.5px'}}>🛡 Análisis completado · 1 IP sospechosa detectada · <span style={{color:'#f87171'}}>10.0.0.99 bloqueada</span></div>}
    </div>
  );
}

// ── InteractiveScanner ────────────────────────────────────────────────────────
const PORT_MAP={21:'FTP',22:'SSH',23:'Telnet',25:'SMTP',80:'HTTP',443:'HTTPS',3389:'RDP',8080:'HTTP Proxy'};
const SEV={23:{sev:'CRÍTICA',clr:'#ef4444',msg:'Texto plano — migrar a SSH'},21:{sev:'ALTA',clr:'#f97316',msg:'Creds expuestas — usar SFTP'},3389:{sev:'ALTA',clr:'#f97316',msg:'RDP expuesto — restringir'},80:{sev:'MEDIA',clr:'#fbbf24',msg:'Sin cifrado — usar HTTPS'},25:{sev:'MEDIA',clr:'#fbbf24',msg:'SMTP abierto — revisar relay'}};

function InteractiveScanner() {
  const [ip,setIp]=useState('192.168.1.1');
  const [results,setResults]=useState([]);
  const [scanning,setScanning]=useState(false);
  const [done,setDone]=useState(false);

  const scan=()=>{
    if(scanning) return;
    setResults([]); setDone(false); setScanning(true);
    const ports=Object.keys(PORT_MAP).map(Number);
    ports.forEach((port,i)=>setTimeout(()=>{
      const open=Math.random()<0.4||[21,23,80,443].includes(port);
      setResults(p=>[...p,{port,name:PORT_MAP[port],open}]);
      if(i===ports.length-1) setTimeout(()=>{setDone(true);setScanning(false);},400);
    },i*180));
  };

  const vulns=results.filter(r=>r.open&&SEV[r.port]);

  return (
    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#94A3B8'}}>
      <div style={{display:'flex',gap:'6px',marginBottom:'7px'}}>
        <input value={ip} onChange={e=>setIp(e.target.value)} style={{flex:1,background:'rgba(0,0,0,.3)',border:'1px solid #1E293B',borderRadius:'4px',padding:'4px 8px',color:'#f1f5f9',fontFamily:'JetBrains Mono,monospace',fontSize:'10px',outline:'none'}}/>
        <button onClick={scan} style={{padding:'4px 10px',borderRadius:'4px',border:'1px solid #3B82F6',background:'rgba(59,130,246,.1)',color:'#93c5fd',cursor:'pointer',fontSize:'9px',fontFamily:'JetBrains Mono,monospace'}}>{scanning?'···':'▶ Scan'}</button>
      </div>
      <div style={{height:'60px',overflowY:'auto',background:'rgba(0,0,0,.3)',borderRadius:'5px',padding:'4px 6px',marginBottom:'6px'}}>
        {results.length===0&&<span style={{color:'#334155'}}>Ingresa IP y ejecuta el scan...</span>}
        {results.map(r=>(
          <div key={r.port} style={{display:'flex',gap:'6px',marginBottom:'1.5px',alignItems:'center',lineHeight:'1.5'}}>
            <span style={{color:'#475569',minWidth:'32px'}}>{r.port}</span>
            <span style={{color:'#64748b',minWidth:'62px'}}>{r.name}</span>
            {r.open?<span style={{color:SEV[r.port]?.clr||'#4ade80',fontWeight:'600'}}>OPEN {SEV[r.port]?`[${SEV[r.port].sev}]`:''}</span>:<span style={{color:'#334155'}}>CLOSED</span>}
          </div>
        ))}
      </div>
      {done&&vulns.length>0&&vulns.map(v=>(
        <div key={v.port} style={{display:'flex',gap:'6px',marginBottom:'2px',fontSize:'8px'}}>
          <span style={{color:SEV[v.port].clr,minWidth:'48px'}}>[{SEV[v.port].sev}]</span>
          <span style={{color:'#94A3B8'}}>{v.port}/{v.name}: {SEV[v.port].msg}</span>
        </div>
      ))}
    </div>
  );
}

// ── InteractiveLicita ─────────────────────────────────────────────────────────
const LICITAS=[
  {cod:'2024-0342',org:'Min. de Salud',      desc:'Servicios de Computación y Redes',           val:4.2,  estado:'NUEVA',  match:98,cierre:'15/05'},
  {cod:'2024-0341',org:'JUNAEB',             desc:'Suministro Material Educativo',              val:0.89, estado:'ACTIVA', match:87,cierre:'20/05'},
  {cod:'2024-0340',org:'Mun. Santiago',      desc:'Desarrollo Software Gestión Municipal',      val:2.1,  estado:'ACTIVA', match:92,cierre:'25/05'},
  {cod:'2024-0339',org:'MOP',                desc:'Consultoría Data Analytics Infraestructura', val:12.1, estado:'ACTIVA', match:75,cierre:'30/05'},
  {cod:'2024-0338',org:'MINEDUC',            desc:'Plataforma BI para métricas educativas',     val:6.8,  estado:'CERRADA',match:95,cierre:'01/05'},
];
const ESTADO_CLR={NUEVA:'#3B82F6',ACTIVA:'#4ade80',CERRADA:'#475569'};

function InteractiveLicita() {
  const [q,setQ]=useState('');
  const filtered=LICITAS.filter(l=>!q||l.org.toLowerCase().includes(q.toLowerCase())||l.desc.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#94A3B8'}}>
      <input placeholder="Buscar org. o descripción..." value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%',background:'rgba(0,0,0,.3)',border:'1px solid #1E293B',borderRadius:'4px',padding:'4px 8px',color:'#f1f5f9',fontFamily:'JetBrains Mono,monospace',fontSize:'9px',outline:'none',marginBottom:'6px'}}/>
      <div style={{height:'110px',overflowY:'auto'}}>
        {filtered.map(l=>(
          <div key={l.cod} style={{background:'rgba(255,255,255,.02)',border:'1px solid #1E293B',borderRadius:'5px',padding:'6px',marginBottom:'5px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'2px'}}>
              <span style={{color:'#f1f5f9',fontSize:'9px'}}>{l.org}</span>
              <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
                {l.match>=90&&<span style={{background:'rgba(74,222,128,.1)',border:'1px solid rgba(74,222,128,.3)',borderRadius:'3px',padding:'0 4px',color:'#4ade80',fontSize:'7px'}}>TOP</span>}
                <span style={{padding:'0 5px',borderRadius:'3px',fontSize:'7px',color:ESTADO_CLR[l.estado]}}>{l.estado}</span>
              </div>
            </div>
            <div style={{color:'#64748b',marginBottom:'3px',fontSize:'8px'}}>{l.desc}</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{color:'#3B82F6'}}>CLP ${l.val}M</span>
              <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
                <div style={{width:'44px',height:'3px',background:'#1E2533',borderRadius:'2px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:l.match+'%',background:l.match>=90?'#4ade80':'#3B82F6',borderRadius:'2px'}}/>
                </div>
                <span>{l.match}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── InteractiveJobPilot ───────────────────────────────────────────────────────
const JOBS=[
  {title:'Senior Data Analyst',  company:'Stripe',       loc:'Remote',           salary:'$95K–$130K', portal:'Indeed',   skills:['SQL','Python','Tableau','dbt']},
  {title:'BI Engineer',          company:'Airbnb',       loc:'Remote (US)',       salary:'$110K–$145K',portal:'Adzuna',   skills:['Python','Spark','Power BI','Looker']},
  {title:'Revenue Analytics Lead',company:'Booking.com', loc:'Amsterdam/Remote', salary:'€70K–€90K',  portal:'Remotive', skills:['SQL','Python','Tableau','RevOps']},
];
const KANBAN=[
  {col:'Aplicado',   count:12,cards:[{c:'Spotify',r:'Data Analyst'},{c:'Shopify',r:'BI Engineer'}]},
  {col:'En Revisión',count:5, cards:[]},
  {col:'Entrevista', count:3, cards:[{c:'Stripe',r:'Sr. Data Analyst',date:'28 May'}]},
  {col:'Oferta',     count:1, cards:[]},
];

function InteractiveJobPilot() {
  const [tab,setTab]=useState(0);
  return (
    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#94A3B8'}}>
      <div style={{display:'flex',gap:'4px',marginBottom:'7px'}}>
        {['Búsqueda','Pipeline'].map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{padding:'3px 10px',borderRadius:'4px',border:`1px solid ${tab===i?'#3B82F6':'#1E293B'}`,background:tab===i?'rgba(59,130,246,.12)':'transparent',color:tab===i?'#93c5fd':'#475569',cursor:'pointer',fontSize:'9px',fontFamily:'JetBrains Mono,monospace'}}>{t}</button>
        ))}
      </div>
      {tab===0&&(
        <div style={{height:'106px',overflowY:'auto'}}>
          {JOBS.map((j,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,.02)',border:'1px solid #1E293B',borderRadius:'5px',padding:'6px',marginBottom:'4px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'2px'}}>
                <span style={{color:'#f1f5f9',fontSize:'9.5px'}}>{j.title}</span>
                <span style={{color:'#4ade80'}}>{j.salary}</span>
              </div>
              <div style={{color:'#3B82F6',marginBottom:'3px'}}>{j.company} · {j.loc} · <span style={{color:'#8B5CF6'}}>{j.portal}</span></div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'3px'}}>
                {j.skills.map(s=><span key={s} style={{padding:'0 5px',background:'rgba(59,130,246,.08)',border:'1px solid rgba(59,130,246,.15)',borderRadius:'3px',color:'#93c5fd',fontSize:'8px'}}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
      {tab===1&&(
        <div style={{display:'flex',gap:'5px',height:'106px',overflowX:'auto'}}>
          {KANBAN.map(col=>(
            <div key={col.col} style={{flex:'0 0 80px',background:'rgba(0,0,0,.2)',borderRadius:'5px',padding:'5px'}}>
              <div style={{color:'#475569',marginBottom:'4px',fontSize:'8px'}}>{col.col} <span style={{color:'#f1f5f9'}}>{col.count}</span></div>
              {col.cards.map((c,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,.05)',borderRadius:'4px',padding:'4px',marginBottom:'3px',fontSize:'8px'}}>
                  <div style={{color:'#f1f5f9'}}>{c.c}</div>
                  <div style={{color:'#64748b'}}>{c.r}</div>
                  {c.date&&<div style={{color:'#4ade80',fontSize:'7px'}}>📅 {c.date}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { InteractiveETL, InteractiveSQL, InteractiveRevMgmt, InteractiveSIEM, InteractiveScanner, InteractiveLicita, InteractiveJobPilot });
