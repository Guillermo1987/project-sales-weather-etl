// FEATURED DEMOS — InteractiveChurn, InteractiveDashboard, InteractivePricing
const { useState, useEffect } = React;

// ── InteractiveChurn ─────────────────────────────────────────────────────────
function InteractiveChurn() {
  const [tickets, setTickets] = useState(5);
  const [contract, setContract] = useState(6);
  const [charges, setCharges] = useState(80);

  const prob = (() => {
    const tZ = (tickets - 4.2) / 3.1;
    const cZ  = (contract - 12.5) / 8.3;
    const chZ = (charges - 65.0) / 28.5;
    const logit = -0.15 + tZ*0.223 + cZ*(-0.023) + chZ*0.009 + 0.08;
    return Math.max(0.04, Math.min(0.96, 1/(1+Math.exp(-logit*2.8))));
  })();
  const pct = Math.round(prob*100);
  const risk = pct < 30
    ? {clr:'#4ade80', lbl:'BAJO RIESGO'}
    : pct < 60
    ? {clr:'#fbbf24', lbl:'RIESGO MEDIO'}
    : {clr:'#f87171', lbl:'ALTO RIESGO'};

  const rng = {width:'100%',cursor:'pointer',accentColor:'#3B82F6',display:'block',marginTop:'5px'};

  return (
    <div style={{padding:'4px 0',fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:'#94A3B8'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px',marginBottom:'14px'}}>
        {[
          {label:'Tickets/mes',val:tickets,set:setTickets,min:0,max:15},
          {label:'Contrato (mo)',val:contract,set:setContract,min:1,max:24},
          {label:'Cargo mensual $',val:charges,set:setCharges,min:20,max:200},
        ].map(({label,val,set,min,max})=>(
          <div key={label}>
            <div style={{marginBottom:'2px'}}>{label}: <span style={{color:'#f1f5f9'}}>{val}</span></div>
            <input type="range" min={min} max={max} value={val} onChange={e=>set(+e.target.value)} style={rng}/>
          </div>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'8px'}}>
        <div style={{flex:1,height:'9px',borderRadius:'5px',background:'#1E2533',overflow:'hidden'}}>
          <div style={{height:'100%',width:pct+'%',background:risk.clr,borderRadius:'5px',transition:'all 0.35s'}}/>
        </div>
        <span style={{fontSize:'22px',fontWeight:'700',color:risk.clr,minWidth:'50px',textAlign:'right',fontFamily:'Poppins,sans-serif',transition:'color 0.3s'}}>{pct}%</span>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
        <span style={{color:risk.clr,fontWeight:'600',letterSpacing:'0.06em'}}>{risk.lbl}</span>
        <span style={{color:'#475569',fontSize:'10px'}}>Accuracy 68% · AUC 0.881 · Recall 50.8%</span>
      </div>
      <svg viewBox="0 0 220 56" width="100%" style={{opacity:.8}}>
        <line x1="20" y1="48" x2="205" y2="48" stroke="#1E293B" strokeWidth="1"/>
        <line x1="20" y1="6"  x2="20"  y2="48" stroke="#1E293B" strokeWidth="1"/>
        <line x1="20" y1="48" x2="205" y2="6"  stroke="#334155" strokeWidth="1" strokeDasharray="3 2" opacity=".5"/>
        <path d="M20,48 C45,30 60,12 90,9 S160,7 205,7" fill="none" stroke="#3B82F6" strokeWidth="1.8"/>
        <path d="M20,48 C45,30 60,12 90,9 S160,7 205,7 L205,48 Z" fill="#3B82F6" fillOpacity=".06"/>
        <text x="118" y="26" fill="#3B82F6" fontSize="7.5" fontFamily="JetBrains Mono,monospace" textAnchor="middle">AUC = 0.881</text>
        <text x="13"  y="52" fill="#334155" fontSize="7" textAnchor="end">0</text>
        <text x="209" y="52" fill="#334155" fontSize="7">1</text>
        <text x="13"  y="10" fill="#334155" fontSize="7" textAnchor="end">1</text>
        <text x="4"   y="30" fill="#475569" fontSize="6.5" style={{writingMode:'vertical-lr',transform:'rotate(180deg)'}}>TPR</text>
        <text x="102" y="56" fill="#475569" fontSize="6.5" textAnchor="middle">FPR</text>
      </svg>
    </div>
  );
}

// ── InteractiveDashboard ──────────────────────────────────────────────────────
function InteractiveDashboard() {
  const [month, setMonth] = useState(18);

  const N = 36;
  const linspace = (s,e,n)=>Array.from({length:n},(_,i)=>s+(e-s)*i/(n-1));
  const seasonal  = (amp,i)=>amp*Math.sin(2*Math.PI*i/12 - Math.PI/2);

  const revenue = linspace(480000,920000,N).map((v,i)=>v+seasonal(45000,i));
  const margin  = linspace(52,59,N).map((v,i)=>v+seasonal(1.5,i));
  const nrr     = linspace(108,118,N).map((v,i)=>v+seasonal(2,i));
  const winRate = linspace(22,31,N).map((v,i)=>v+seasonal(2,i));
  const churn   = linspace(8,4,N).map((v,i)=>Math.max(1,v+seasonal(0.8,i)));
  const ltvcac  = linspace(3.2,4.2,N).map((v,i)=>v+seasonal(0.2,i));

  const mLabels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const yearLabels = Array.from({length:N},(_,i)=>`${mLabels[i%12]} ${2022+Math.floor(i/12)}`);
  const idx = month-1;

  const kpis = [
    {label:'MRR',         val:`$${(revenue[idx]/1000).toFixed(0)}K`, color:'#3B82F6'},
    {label:'Gross Margin',val:`${margin[idx].toFixed(1)}%`,           color:'#4ade80'},
    {label:'NRR',         val:`${nrr[idx].toFixed(0)}%`,              color:'#a78bfa'},
    {label:'Win Rate',    val:`${winRate[idx].toFixed(1)}%`,           color:'#60a5fa'},
    {label:'Churn Rate',  val:`${churn[idx].toFixed(1)}%`,             color:churn[idx]>5?'#f87171':'#fbbf24'},
    {label:'LTV:CAC',     val:`${ltvcac[idx].toFixed(1)}x`,            color:'#34d399'},
  ];

  const spark = revenue.slice(Math.max(0,idx-5),idx+1);
  const sMin = Math.min(...spark), sMax = Math.max(...spark);
  const sparkPts = spark.map((v,i)=>{
    const x = 8+i*(184/(Math.max(spark.length-1,1)));
    const y = 36-((v-sMin)/(sMax-sMin||1))*28;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#94A3B8'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}}>
        <span style={{whiteSpace:'nowrap',fontSize:'11px'}}>Mes: <span style={{color:'#f1f5f9'}}>{yearLabels[idx]}</span></span>
        <input type="range" min="1" max="36" value={month} onChange={e=>setMonth(+e.target.value)} style={{flex:1,cursor:'pointer',accentColor:'#3B82F6'}}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px',marginBottom:'10px'}}>
        {kpis.map(k=>(
          <div key={k.label} style={{background:'rgba(255,255,255,.03)',border:'1px solid #1E293B',borderRadius:'6px',padding:'6px'}}>
            <div style={{color:'#475569',fontSize:'9px',marginBottom:'2px'}}>{k.label}</div>
            <div style={{color:k.color,fontSize:'15px',fontWeight:'700',fontFamily:'Poppins,sans-serif',transition:'all 0.3s'}}>{k.val}</div>
          </div>
        ))}
      </div>
      {spark.length>1 && (
        <div>
          <div style={{color:'#475569',fontSize:'9px',marginBottom:'3px'}}>MRR últimos {spark.length} meses</div>
          <svg viewBox="0 0 200 44" width="100%" style={{opacity:.9}}>
            <rect width="200" height="44" fill="rgba(0,0,0,.2)" rx="4"/>
            <polyline points={sparkPts} fill="none" stroke="#3B82F6" strokeWidth="1.6"/>
          </svg>
        </div>
      )}
    </div>
  );
}

// ── InteractivePricing ────────────────────────────────────────────────────────
function InteractivePricing() {
  const [room,setRoom]   = useState('Standard');
  const [occ,setOcc]     = useState(65);
  const [lead,setLead]   = useState(30);

  const BASE = {Standard:120,Deluxe:185,Suite:320};
  const SEA  = {1:.72,2:.78,3:.88,4:.95,5:1.05,6:1.22,7:1.35,8:1.30,9:1.10,10:1.00,11:.82,12:1.15};
  const DOW  = {0:.92,1:.90,2:.93,3:.97,4:1.12,5:1.25,6:1.18};
  const EVENTS = {'7-4':1.45,'12-24':1.50,'12-31':1.55,'11-28':1.35,'1-1':1.40,'2-14':1.20,'8-15':1.30};

  const now = new Date();
  const month = now.getMonth()+1;

  const leadF = d=>1.0+Math.max(0,(30-d)/100);
  const occF  = o=>o>85?1.10:o<60?0.92:1.0;
  const calcPrice = (r,m,d,ld,o)=>{
    const key=`${m}-${now.getDate()}`;
    let p=BASE[r]*SEA[m]*DOW[d]*leadF(ld)*occF(o)*(EVENTS[key]||1.0);
    return Math.round(Math.max(BASE[r]*.7,Math.min(BASE[r]*2.2,p)));
  };

  const price = calcPrice(room,month,now.getDay(),lead,occ);
  const seaM  = SEA[month].toFixed(2);
  const occM  = occF(occ).toFixed(2);

  const spark14 = Array.from({length:14},(_,i)=>{
    const d=new Date(now); d.setDate(d.getDate()+i);
    return calcPrice(room,d.getMonth()+1,d.getDay(),Math.max(1,lead-i),occ);
  });
  const sMin=Math.min(...spark14),sMax=Math.max(...spark14);
  const pts=spark14.map((v,i)=>{
    const x=6+i*(188/13);
    const y=34-((v-sMin)/(sMax-sMin||1))*26;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:'#94A3B8'}}>
      <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'10px',flexWrap:'wrap'}}>
        {['Standard','Deluxe','Suite'].map(r=>(
          <button key={r} onClick={()=>setRoom(r)} style={{
            padding:'4px 12px',borderRadius:'6px',border:'1px solid',cursor:'pointer',fontSize:'11px',
            fontFamily:'JetBrains Mono,monospace',transition:'all 0.2s',
            borderColor:room===r?'#3B82F6':'#1E293B',
            background:room===r?'rgba(59,130,246,.15)':'rgba(255,255,255,.02)',
            color:room===r?'#93c5fd':'#94A3B8'
          }}>{r}</button>
        ))}
        <span style={{marginLeft:'auto',fontSize:'30px',fontWeight:'700',fontFamily:'Poppins,sans-serif',color:'#3B82F6',transition:'all 0.3s'}}>${price}</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'8px'}}>
        <div>
          <div style={{marginBottom:'3px'}}>Ocupación: <span style={{color:'#f1f5f9'}}>{occ}%</span></div>
          <input type="range" min="30" max="100" value={occ} onChange={e=>setOcc(+e.target.value)} style={{width:'100%',cursor:'pointer',accentColor:'#3B82F6'}}/>
        </div>
        <div>
          <div style={{marginBottom:'3px'}}>Anticipación: <span style={{color:'#f1f5f9'}}>{lead}d</span></div>
          <input type="range" min="1" max="90" value={lead} onChange={e=>setLead(+e.target.value)} style={{width:'100%',cursor:'pointer',accentColor:'#8B5CF6'}}/>
        </div>
      </div>
      <div style={{fontSize:'10px',color:'#475569',marginBottom:'8px'}}>
        Base ${BASE[room]} · Temporada ×{seaM} · Ocupación ×{occM} · <span style={{color:'#3B82F6'}}>Final: ${price}</span>
      </div>
      <svg viewBox="0 0 200 42" width="100%" style={{opacity:.85}}>
        <rect width="200" height="42" fill="rgba(0,0,0,.2)" rx="4"/>
        <polyline points={pts} fill="none" stroke="#8B5CF6" strokeWidth="1.6"/>
        <path d={`M6,34 ${pts} L${(6+13*(188/13)).toFixed(1)},34 Z`} fill="#8B5CF6" fillOpacity=".07"/>
        <text x="4"   y="41" fill="#334155" fontSize="7">Hoy</text>
        <text x="158" y="41" fill="#334155" fontSize="7">+14 días</text>
      </svg>
    </div>
  );
}

Object.assign(window, { InteractiveChurn, InteractiveDashboard, InteractivePricing });
