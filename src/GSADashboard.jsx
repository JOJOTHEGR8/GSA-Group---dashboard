import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, ComposedChart, Area, AreaChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell, ReferenceLine, LabelList
} from "recharts";

// ─── PHOTOS (base64 embedded) ────────────────────────
const PHOTOS = {
  georges: "data:image/jpeg;base64,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",
  pierre: "data:image/jpeg;base64,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",
  salma: "data:image/jpeg;base64,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",
  sakina: "data:image/jpeg;base64,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",
  aminata: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAB4AHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiikoAKM0hNJmgB2aM03NQX12llYXF3J9yCJpG+gGaAPC/FuoS+LfFd3OzsLG1cwQjttU9vqcn8qTTtHsSygW6g54JqtqDf2dZWsSyPC4UtLiPcNzHJz+YH4Vc0S7kuXe32/PCSWYDHT61x1pStdbHoYeEE7S3LOreEreS1a6iPlS4zleh+tM+F+vXGieLV0uZj9nvm8p0zwJP4WH8vxq7HrLXsEltHAZVH8QkAxWGbCaz8b6QYlIe4niYDvkOKqjN35WTiacbc0T6EpabmjNdRwjqKTNLQAUUUUAJSE0E02gApM0E0maAFzVHWw76FfIilme3dQo7kgirmabIqyRtG4JVgQQDjj60nsNbniV1JBNcss0YJjJxxV/wAOXWmiC4czKs8jeX5bDaWPUjnv/Os7xbpk+l63PbBmUbtyMozlTyP0p2k3MlrEZLS9LvxmO4t2T/x4cV584b6nrU6l9kakPhnSopDqMMpUsQQnIYc5xj61s6Do323xZZX5TcLGMszMRgZBxgeuSPwzWTY3cmqXMMHy+bIwBA6A5r0Hw/p39nw3HEn7yZipkxuKjgHjt6A1dJSlK7IxEoQhyrqbOaUGmZpc13HmDwadmowacDQIfRSA0UAMpCaUmmmgBCaQmgmmk0xi5pGdUUszBVUZJJwAPWuQ8QfEzw9oRaJJjqFyuf3dsQVB9C/QfhmvIvFfj7XPFG+CWb7NYt0tYDhT/vHq348e1ArnUfE6+MfinzbaRJI3t487WDKevcVjWGt6jeQG1ihTb/ecnArDhj2WEBVB5arggdj3/wAa39MURAOsZ2sM8VxVWtz0aCltc1/DJt9L1y2vdSu0jhiYvJI/CLgH+uK9N0nxZoGuTNBpmrW1zKnVFbDfgDjP4V5eIXu/l8vCAZOR2rz+9WKHUrj7KojQSfIF7fSroTvdGWKhytNH1PmlzXz1o/xG8T6QqRrqLXEK9I7keYMemTyPzr0PQvi5pV+yxapbvp8h481T5kWffuPyNdJx3PQ804GoIZo7iFJoZEkicZV0YMrD1BFSigY8GikFFACE0hNBppoEU9X1FNJ0i71GRdy2sLSFc43YHA/E4rwfxB4913X90dzdGC3bj7Pbkon492/E16t8Tb4WXge8T+K6KwLz6nJ/RTXgDNuHXrTEx8gHBqBjUm4kbTUbNg8igR0+hbLvTQDGHKZRx/I11mn2CQWQi3LKhGQw/h9vrXEeEb2O31X7PIR5d0NoJPRu3+H413UFssEkjxxhWf7zeuK86urSaPZwr5oJr0F1aT7Foc0xcR4U/KBXle4scnqTk12fjG+kazWAt99sYHpXFmt8NG0bnJjZ3mo9gLVJGSEz6CoDnNTKcIFP8XX6V1HCeh/CbWpLLxAumySnyL5CNhPAkAypHvwR+Ne0g181+GJZh4o0toM+YLuLaPfcK+k+5x0zQUh4opAaKQAaaaUmmmmM8w+Nd5t0/TLIHl5HlP4AAfzNeOs3zCvTfjRNv12whz/q7Un83P8AhXl0xA5BoJZMHIIz0pSQeD0qCKcNwalPPTpQIbho2DIxBByCO1d0vjqyfR40mZ0uymJAIyRn1z71w2aZIPlJ9KznTjO1zalWlSvy9TW1PV01R0ZN2EGDuGOaoE1DD8sQ9+akFVGKirIznJyd2LjLCklcLKU7gAVLCuXBPSqpJa7kDf3jzVEmvoNw1pqtreZwIJkcfgwNfToYN8y9DyPpXy1EccD0r6V0Gb7R4f06XOd9rEc+vyigaNIGimiigoUmmk0E00nigDwf4sTSSeOblScrHDEqj0G3P8ya4SbkdK7L4myZ8d6l6hkH/ji1x0jZoJK8X3+anViDjtW9pHhm31DwbrOuSXEkU2myIEULlZA3Y+nJHNc9n3pATA0E0xWp3Ug0xCqenGKetMUcU4ZHBoAsxkDrVQkfapTn+KpieCOzA8+lUUU0AaduC0gr6J8EXIufBmlSD+GAIfqpK/0r51tSETGea95+GMhfwPagn7ksq/8Aj2f60DR14opAaKChCaYTQTVe9nNvZXE6nDRRO4PuFJFAHgPxDuUuvG+qOjBgJtmR/sgL/SuWap7hjLK0ssjPI53MfUnk1WY56ZoJPS9A054fghrs5+X7W7SrkdVQoP5g15j06V6Dea//AGf8GtO0pT+/1GWUY9IlkJJ/E4H51wFAMaBmnLwetGKXbyPSgRInY1LjNQxcDiphQBPZLuvbdOMNKg56feFVrySNtVu5I1CxtO5VR2G44p7dDj0qlHIhbDAg56g0AXEZCR2r334YW7weBrTd/wAtZJJB9C2B/KvBIY9zgDmvpLwxDHbeGNMhj+6trHj8Rk/qTQNGuKKQGigojJqKXyzE4mwYyp356bcc/pmiigD5jujD9plEK/ud58vI/hzx+lVZV+XK4+lFFBBLqOoHUJLZFyIbW3SCJT2AGSfxYsfxqtRRQMCKKKKBEidBUooooAXtVFAC/TvRRQBq2S7pVr6O8P8AHh7TR/06x/8AoIoooGjSBooooKP/2Q==",
};

const LOGO = "data:image/png;base64,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";

const TEAM = [
  { name: "Aminata Touré", role: "Présidente & VP R&D", email: "aminata.toure@hec.ca", photo: PHOTOS.aminata },
  { name: "Georges Khalil", role: "VP Finances", email: "georges-elias.khalil@hec.ca", photo: PHOTOS.georges },
  { name: "Sakina Diawara", role: "VP Marketing & Ventes", email: "sakina-ryssalat.diawara@hec.ca", photo: PHOTOS.sakina },
  { name: "Pierre Robergeau", role: "VP Production", email: "pierre.robergeau@hec.ca", photo: PHOTOS.pierre },
  { name: "Salma Mejda", role: "VP Ressources Humaines", email: "salma.mejda@hec.ca", photo: PHOTOS.salma },
];

// ─── COLORS ──────────────────────────────────────────
const C = {
  gsa:"#2563eb",gsaL:"#93bbfd",acc:"#f59e0b",red:"#ef4444",grn:"#10b981",
  pur:"#8b5cf6",slate:"#64748b",dark:"#0f172a",bg:"#f8fafc",card:"#fff",
  brd:"#e2e8f0",txt:"#1e293b",txtS:"#64748b",
};

// ─── DATA ────────────────────────────────────────────
const svEvolution = [
  {p:"P0",ABC:150,Bloom:150,Cobalt:150,Delta:150,ETH:150,F:150,GSA:150,H:150,IGHALI:150},
  {p:"P1",ABC:168,Bloom:160,Cobalt:158,Delta:165,ETH:162,F:152,GSA:155,H:155,IGHALI:148},
  {p:"P2",ABC:185,Bloom:175,Cobalt:170,Delta:182,ETH:178,F:155,GSA:168,H:158,IGHALI:152},
  {p:"P3",ABC:220,Bloom:215,Cobalt:198,Delta:230,ETH:205,F:165,GSA:205,H:165,IGHALI:162},
  {p:"P4",ABC:245,Bloom:235,Cobalt:215,Delta:262,ETH:225,F:172,GSA:215,H:160,IGHALI:172},
  {p:"P5",ABC:265,Bloom:248,Cobalt:235,Delta:285,ETH:255,F:195,GSA:262,H:155,IGHALI:198},
  {p:"P6",ABC:289,Bloom:258,Cobalt:263,Delta:321,ETH:285,F:240,GSA:320,H:153,IGHALI:245},
];

const caNetData = [
  {p:"P0",ca:30000,net:2250,roce:15},{p:"P1",ca:34739,net:2022,roce:11.7},
  {p:"P2",ca:40929,net:1894,roce:9.8},{p:"P3",ca:49344,net:3620,roce:13.6},
  {p:"P4",ca:56934,net:1693,roce:6.8},{p:"P5",ca:86839,net:5871,roce:20},
  {p:"P6",ca:108343,net:6132,roce:21},
];

const svData = [
  {n:"Delta",base:281,bonus:40,total:321,tbl:4},{n:"GSA",base:280,bonus:40,total:320,tbl:4},
  {n:"ABC",base:269,bonus:20,total:289,tbl:2},{n:"ETH",base:275,bonus:10,total:285,tbl:1},
  {n:"Cobalt",base:243,bonus:20,total:263,tbl:2},{n:"Bloom",base:238,bonus:20,total:258,tbl:2},
  {n:"IGHALI",base:215,bonus:30,total:245,tbl:3},{n:"F",base:210,bonus:30,total:240,tbl:3},
  {n:"H",base:153,bonus:0,total:153,tbl:0},
];

const roceData = [
  {n:"ETH",v:34},{n:"F",v:26.5},{n:"Delta",v:24.6},{n:"IGHALI",v:22.6},
  {n:"GSA",v:21},{n:"ABC",v:18.6},{n:"Cobalt",v:14},{n:"Bloom",v:13.6},{n:"H",v:-3.1},
];

const compTable = [
  {l:"CA (K$)",v:["114 454","57 079","72 451","86 191","114 906","45 835","108 343","54 278","87 439"]},
  {l:"Résultat net",v:["7 754","1 776","2 876","7 005","11 236","3 598","6 132","-11 350","6 254"]},
  {l:"ROCE",v:["18,6%","13,6%","14,0%","24,6%","34,0%","26,5%","21,0%","-3,1%","22,6%"]},
  {l:"Volume",v:["91 130","29 321","35 347","44 447","86 606","22 868","52 516","21 901","57 981"]},
  {l:"EBITDA",v:["15 943","6 764","9 322","14 028","20 786","7 882","13 156","-1 246","12 678"]},
  {l:"Qualité",v:["101","303","279","280","103","304","288","295","111"]},
  {l:"RSE",v:["176","210","217","204","172","210","226","229","176"]},
  {l:"Productivité",v:["128","110","119","124","128","118","109","121","108"]},
  {l:"TBL",v:["Niv.2","Niv.2","Niv.2","Niv.4","Niv.1","Niv.3","Niv.4","0","Niv.3"]},
  {l:"Share Value",v:["289","258","263","321","285","240","320","153","245"]},
  {l:"DPS ($)",v:["63,0","17,0","9,9","13,3","46,7","0,0","39,1","0,0","16,3"]},
  {l:"Dividendes",v:["9 500","2 555","1 480","2 000","7 000","0","5 871","0","2 500"]},
];
const compHeaders = ["ABC","Bloom","Cobalt","Delta","ETH","F","GSA","H","IGHALI"];

const pdmEnt = [
  {p:"P1",gsa:36,delta:39,h:28},{p:"P2",gsa:38,delta:42,h:25},
  {p:"P3",gsa:36,delta:40,h:22},{p:"P4",gsa:35,delta:36,h:28},
  {p:"P5",gsa:35,delta:36,h:28},{p:"P6",gsa:30,delta:29,h:23},
];

const productMix = [
  {p:"P0",t:100,tc:0,tsc:0,tsci:0},{p:"P1",t:60,tc:40,tsc:0,tsci:0},
  {p:"P2",t:30,tc:50,tsc:20,tsci:0},{p:"P3",t:10,tc:30,tsc:40,tsci:20},
  {p:"P4",t:5,tc:20,tsc:30,tsci:45},{p:"P5",t:2,tc:15,tsc:20,tsci:63},
  {p:"P6",t:0,tc:7,tsc:25,tsci:68},
];

const marginP6 = [
  {prod:"T-C",cout:1595,prix:1754,marge:159,pct:9.0},
  {prod:"T-SC",cout:1805,prix:1936,marge:132,pct:6.8},
  {prod:"T-SCI",cout:2015,prix:2187,marge:173,pct:7.9},
];

const previsions = [
  {p:"P6",base:108343,opti:108343,pessi:108343,nB:6132,nO:6132,nP:6132},
  {p:"P7",base:125000,opti:132000,pessi:112000,nB:9000,nO:11000,nP:5500},
  {p:"P8",base:138000,opti:150000,pessi:115000,nB:12000,nO:15500,nP:5000},
  {p:"P9",base:148000,opti:165000,pessi:118000,nB:15000,nO:19000,nP:4800},
];

const tblEvol = [
  {p:"P0",profit:0,people:0,planet:0,tbl:0},{p:"P1",profit:0,people:0,planet:0,tbl:0},
  {p:"P2",profit:0,people:1,planet:1,tbl:0},{p:"P3",profit:1,people:1,planet:1,tbl:1},
  {p:"P4",profit:0,people:1,planet:2,tbl:0},{p:"P5",profit:2,people:2,planet:2,tbl:2},
  {p:"P6",profit:3,people:4,planet:4,tbl:4},
];

const radarData = [
  {d:"CA",gsa:85,delta:68,eth:90},{d:"Rentabilité",gsa:62,delta:72,eth:100},
  {d:"Qualité",gsa:95,delta:92,eth:34},{d:"RSE",gsa:93,delta:84,eth:71},
  {d:"TBL",gsa:100,delta:100,eth:25},{d:"Innovation",gsa:90,delta:75,eth:60},
  {d:"Diversif. Géo",gsa:85,delta:55,eth:70},
];

const recapRows = [
  {l:"CA (K$)",v:["30 000","34 739","40 929","49 344","56 934","86 839","108 343"],d:"+261%"},
  {l:"Résultat Net (K$)",v:["2 250","2 022","1 894","3 620","1 693","5 871","6 132"],d:"+172%"},
  {l:"ROCE (%)",v:["15,0","11,7","9,8","13,6","6,8","20,0","21,0"],d:"+6 pts"},
  {l:"Prix moyen ($)",v:["1 000","1 158","1 278","1 334","1 539","1 868","2 063"],d:"+106%"},
  {l:"Qualité (indice)",v:["125","125","150","175","218","253","288"],d:"+130%"},
  {l:"RSE (indice)",v:["100","110","120","140","153","191","226"],d:"+126%"},
  {l:"ISO 9000",v:["9001","9001","9001","9002","9002","9004","9004"],d:"Max"},
  {l:"ISO 14000",v:["—","14001","14001","14001","14002","14002","14004"],d:"Max"},
  {l:"TBL (niveau)",v:["0","0","0","1","0","2","4"],d:"0→Max"},
  {l:"Bonus TBL",v:["0","0","0","+10","0","+20","+40"],d:"+40"},
  {l:"Share Value",v:["150","155","168","205","215","262","320"],d:"+113%"},
];

// ─── MARKET VEILLE DATA (P7-P9) ──────────────────────
const veilleEntreprises = {
  headers: ["","Amériques P7","Amériques P8","Amériques P9","EMEA P7","EMEA P8","EMEA P9","Asie P7","Asie P8","Asie P9"],
  rows: [
    {l:"Volume marché",v:["50 000","53 200","55 200","48 000","49 600","51 600","51 200","52 000","54 000"]},
    {l:"Sensib. Prix",v:["130","130","135","114","116","121","120","120","125"]},
    {l:"Sensib. Qualité",v:["200","200","205","200","200","205","160","160","155"]},
    {l:"Attrait Techno C",v:["220","200","200","200","200","195","200","200","195"]},
    {l:"Sensib. Service",v:["150","150","155","150","150","150","170","170","175"]},
  ]
};

// ─── PRESENCE MAP (SVG) ──────────────────────────────
const regions = [
  { id:"amer", label:"AMÉRIQUES", agences:5, ventes:"27 034", ca:"48 682K$", pdm:"30% Ent.", color:"#2563eb", glow:"#3b82f6", light:"#93c5fd", cx:155, cy:135, since:"P0" },
  { id:"emea", label:"EMEA", agences:1, ventes:"6 829", ca:"7 686K$", pdm:"15% Ent.", color:"#f59e0b", glow:"#fbbf24", light:"#fde68a", cx:340, cy:115, since:"P5" },
  { id:"asia", label:"ASIE-AUSTRALIE", agences:1, ventes:"8 897", ca:"30 471K$", pdm:"18% Ent.", color:"#10b981", glow:"#34d399", light:"#6ee7b7", cx:530, cy:130, since:"P4" },
];

const WorldMap = () => {
  const [hover, setHover] = useState(null);
  return (
  <div>
    <p style={{fontSize:15,fontWeight:500,margin:"0 0 4px",color:C.txt}}>Présence mondiale GSA Group — fin P6</p>
    <p style={{fontSize:12,margin:"0 0 10px",color:C.txtS}}>3 continents · 7 agences · T-SCI sur tous les marchés · JV IGHALI</p>
    <svg viewBox="0 0 680 420" style={{width:"100%",height:"auto",background:"#070d1a",borderRadius:10}}>
      <defs>
        <radialGradient id="gAmer" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#2563eb" stopOpacity=".18"/><stop offset="100%" stopColor="#2563eb" stopOpacity="0"/></radialGradient>
        <radialGradient id="gEmea" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#f59e0b" stopOpacity=".18"/><stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/></radialGradient>
        <radialGradient id="gAsia" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#10b981" stopOpacity=".18"/><stop offset="100%" stopColor="#10b981" stopOpacity="0"/></radialGradient>
      </defs>

      {/* Grid dots */}
      {Array.from({length:17}).map((_,xi)=>Array.from({length:10}).map((_,yi)=>(
        <circle key={`${xi}-${yi}`} cx={xi*42+10} cy={yi*42+10} r=".6" fill="#1e293b"/>
      )))}

      {/* Graticule lines */}
      {[85,170,255,340,425,510,595].map(x=><line key={`vl${x}`} x1={x} y1={15} x2={x} y2={385} stroke="#0f1d32" strokeWidth=".5"/>)}
      {[80,160,240,320].map(y=><line key={`hl${y}`} x1={15} y1={y} x2={665} y2={y} stroke="#0f1d32" strokeWidth=".5"/>)}

      {/* North America */}
      <path d="M60,42 L72,38 L90,36 L105,34 L120,38 L138,36 L155,40 L168,46 L178,52 L184,60 L190,72 L194,82 L196,95 L195,108 L190,118 L182,124 L175,126 L168,130 L160,138 L155,135 L150,128 L148,118 L140,115 L130,118 L120,120 L112,115 L100,110 L90,105 L78,98 L68,88 L60,78 L55,65 L56,52 Z"
        fill={hover==="amer"?"#1a3460":"#0f2340"} stroke="#1e3a5f" strokeWidth=".8" onMouseEnter={()=>setHover("amer")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* Central America */}
      <path d="M148,118 L155,135 L160,138 L162,148 L158,156 L152,162 L148,168 L144,172 L140,165 L138,158 L135,150 L137,140 L140,130 L144,122 Z"
        fill={hover==="amer"?"#1a3460":"#0f2340"} stroke="#1e3a5f" strokeWidth=".8" onMouseEnter={()=>setHover("amer")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* South America */}
      <path d="M140,175 L148,168 L155,172 L164,178 L172,185 L180,198 L184,212 L186,228 L184,248 L180,265 L174,280 L168,295 L162,308 L155,318 L148,325 L142,322 L138,312 L135,298 L132,282 L130,265 L128,248 L126,230 L125,215 L126,200 L130,188 L135,180 Z"
        fill={hover==="amer"?"#1a3460":"#0f2340"} stroke="#1e3a5f" strokeWidth=".8" onMouseEnter={()=>setHover("amer")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* Greenland */}
      <path d="M128,22 L148,18 L158,22 L160,32 L155,38 L145,40 L135,38 L128,32 Z"
        fill="#0f2340" stroke="#1e3a5f" strokeWidth=".5"/>

      {/* Europe */}
      <path d="M290,38 L298,36 L310,38 L320,42 L335,44 L345,48 L355,52 L362,58 L368,66 L370,78 L368,88 L362,96 L355,100 L348,104 L340,108 L335,112 L328,108 L320,100 L312,96 L305,92 L298,88 L292,82 L288,72 L285,62 L286,50 Z"
        fill={hover==="emea"?"#2a2410":"#1a1608"} stroke="#3d2e0a" strokeWidth=".8" onMouseEnter={()=>setHover("emea")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* Scandinavia */}
      <path d="M310,25 L318,22 L325,24 L330,30 L332,38 L330,44 L325,42 L318,38 L312,34 L310,28 Z"
        fill={hover==="emea"?"#2a2410":"#1a1608"} stroke="#3d2e0a" strokeWidth=".5" onMouseEnter={()=>setHover("emea")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* UK/Ireland */}
      <path d="M278,52 L286,50 L288,56 L285,62 L280,60 Z" fill={hover==="emea"?"#2a2410":"#1a1608"} stroke="#3d2e0a" strokeWidth=".5"/>
      {/* Africa */}
      <path d="M295,120 L305,115 L318,112 L330,115 L342,118 L355,122 L365,130 L372,142 L376,158 L378,175 L376,195 L372,215 L366,232 L358,248 L348,262 L338,275 L328,282 L320,285 L312,280 L305,270 L298,258 L292,242 L288,225 L285,208 L284,190 L285,172 L286,155 L288,140 L290,130 Z"
        fill={hover==="emea"?"#2a2410":"#1a1608"} stroke="#3d2e0a" strokeWidth=".8" onMouseEnter={()=>setHover("emea")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* Madagascar */}
      <path d="M385,230 L390,225 L394,232 L392,245 L388,250 L384,242 Z" fill="#1a1608" stroke="#3d2e0a" strokeWidth=".4"/>

      {/* Asia - Russia/Central/South */}
      <path d="M370,28 L395,24 L420,22 L450,20 L480,22 L510,26 L535,30 L555,36 L575,42 L590,50 L598,60 L600,72 L595,84 L585,92 L572,98 L558,102 L545,108 L535,115 L528,124 L520,132 L512,138 L500,142 L488,144 L475,142 L462,138 L450,132 L440,124 L432,115 L425,105 L418,95 L412,85 L405,75 L398,65 L390,56 L382,48 L375,40 Z"
        fill={hover==="asia"?"#0a2820":"#061a14"} stroke="#0f3d2e" strokeWidth=".8" onMouseEnter={()=>setHover("asia")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* India */}
      <path d="M450,132 L462,138 L468,148 L472,162 L474,178 L472,195 L468,208 L462,218 L455,225 L448,218 L442,208 L438,195 L436,178 L435,162 L438,148 L442,138 Z"
        fill={hover==="asia"?"#0a2820":"#061a14"} stroke="#0f3d2e" strokeWidth=".8" onMouseEnter={()=>setHover("asia")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* Southeast Asia / Indonesia */}
      <path d="M500,148 L515,145 L530,150 L545,155 L555,162 L560,172 L558,182 L550,188 L540,190 L528,188 L518,184 L508,178 L502,168 L498,158 Z"
        fill={hover==="asia"?"#0a2820":"#061a14"} stroke="#0f3d2e" strokeWidth=".8" onMouseEnter={()=>setHover("asia")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* Japan */}
      <path d="M580,68 L588,62 L594,66 L596,76 L592,86 L586,90 L580,85 L578,76 Z"
        fill={hover==="asia"?"#0a2820":"#061a14"} stroke="#0f3d2e" strokeWidth=".5"/>
      {/* Australia */}
      <path d="M520,240 L542,232 L558,228 L572,230 L585,238 L592,248 L596,262 L594,278 L588,292 L578,302 L565,308 L550,310 L535,306 L522,298 L514,286 L510,272 L512,258 L516,248 Z"
        fill={hover==="asia"?"#0a2820":"#061a14"} stroke="#0f3d2e" strokeWidth=".8" onMouseEnter={()=>setHover("asia")} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer",transition:"fill .3s"}}/>
      {/* New Zealand */}
      <path d="M608,295 L614,290 L618,296 L616,306 L612,312 L608,306 Z" fill="#061a14" stroke="#0f3d2e" strokeWidth=".4"/>

      {/* Glow circles behind markers */}
      <circle cx={155} cy={135} r="55" fill="url(#gAmer)"/>
      <circle cx={340} cy={115} r="55" fill="url(#gEmea)"/>
      <circle cx={530} cy={130} r="55" fill="url(#gAsia)"/>

      {/* Pulse animation circles */}
      {regions.map(r=>(
        <g key={r.id}>
          <circle cx={r.cx} cy={r.cy} r="14" fill="none" stroke={r.color} strokeWidth=".8" opacity=".4">
            <animate attributeName="r" from="14" to="28" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from=".4" to="0" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx={r.cx} cy={r.cy} r="14" fill="none" stroke={r.color} strokeWidth=".5" opacity=".3">
            <animate attributeName="r" from="14" to="36" dur="2.5s" begin=".8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from=".3" to="0" dur="2.5s" begin=".8s" repeatCount="indefinite"/>
          </circle>
        </g>
      ))}

      {/* Markers */}
      {regions.map(r=>(
        <g key={`m-${r.id}`} onMouseEnter={()=>setHover(r.id)} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer"}}>
          <circle cx={r.cx} cy={r.cy} r="7" fill={r.color} stroke="#fff" strokeWidth="2"/>
          <circle cx={r.cx} cy={r.cy} r="3" fill="#fff"/>
        </g>
      ))}

      {/* Connection lines (dashed) */}
      <line x1={162} y1={135} x2={333} y2={115} stroke="#1e3a5f" strokeWidth=".5" strokeDasharray="4 3"/>
      <line x1={347} y1={115} x2={523} y2={130} stroke="#1e3a5f" strokeWidth=".5" strokeDasharray="4 3"/>

      {/* Info cards */}
      {regions.map((r,i)=>{
        const cardX = i===0?30:i===1?270:460;
        const cardY = i===0?340:i===1?340:340;
        const isH = hover===r.id;
        return (
        <g key={`c-${r.id}`} opacity={isH?1:.85} style={{transition:"opacity .3s"}}>
          <rect x={cardX} y={cardY} width={i===2?200:180} height={62} rx="6" fill={isH?"#111827":"#0c1322"} stroke={r.color} strokeWidth={isH?"1.2":".5"} strokeOpacity={isH?1:.4}/>
          <circle cx={cardX+14} cy={cardY+14} r="4" fill={r.color}/>
          <text x={cardX+24} y={cardY+18} fill="#fff" fontSize="11" fontWeight="600">{r.label}</text>
          <text x={cardX+14} y={cardY+34} fill={r.light} fontSize="10">{r.agences} agence{r.agences>1?"s":""} · {r.ventes} ventes</text>
          <text x={cardX+14} y={cardY+48} fill="#64748b" fontSize="9">CA {r.ca} · PdM {r.pdm} · depuis {r.since}</text>
        </g>
        );
      })}

      {/* JV IGHALI badge */}
      <rect x={420} y={195} width={130} height={22} rx="11" fill="#1c1917" stroke="#ef4444" strokeWidth=".6" strokeOpacity=".5"/>
      <text x={485} y={209} textAnchor="middle" fill="#fca5a5" fontSize="8.5" fontWeight="500">JV IGHALI · Exclusivité T-SCI</text>

    </svg>
  </div>
  );
};

// ─── SHARED COMPONENTS ───────────────────────────────
const KPI = ({label,value,sub,color=C.gsa}) => (
  <div style={{background:C.card,border:`1px solid ${C.brd}`,borderTop:`3px solid ${color}`,borderRadius:8,padding:"12px 14px",flex:1,minWidth:120}}>
    <div style={{fontSize:11,color:C.txtS,textTransform:"uppercase",letterSpacing:.8,fontWeight:600}}>{label}</div>
    <div style={{fontSize:22,fontWeight:700,color:C.txt,marginTop:2}}>{value}</div>
    {sub && <div style={{fontSize:12,color,fontWeight:600,marginTop:1}}>{sub}</div>}
  </div>
);

const Title = ({children,sub}) => (
  <div style={{marginBottom:12,marginTop:4}}>
    <h3 style={{fontSize:15,fontWeight:700,color:C.dark,margin:0}}>{children}</h3>
    {sub && <p style={{fontSize:11,color:C.txtS,margin:"2px 0 0"}}>{sub}</p>}
  </div>
);

const Card = ({children,style={}}) => (
  <div style={{background:C.card,border:`1px solid ${C.brd}`,borderRadius:10,padding:16,...style}}>{children}</div>
);

const Tip = ({active,payload,label}) => {
  if(!active||!payload) return null;
  return (<div style={{background:"#fff",border:`1px solid ${C.brd}`,borderRadius:6,padding:"6px 10px",fontSize:11,boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>
    <div style={{fontWeight:700,marginBottom:3}}>{label}</div>
    {payload.map((p,i)=>(<div key={i} style={{color:p.color}}>{p.name}: <strong>{typeof p.value==="number"?p.value.toLocaleString("fr-CA"):p.value}</strong></div>))}
  </div>);
};

const TBL = ({n})=>{const colors=["#94a3b8","#f59e0b","#10b981","#2563eb","#8b5cf6"]; return <span style={{color:colors[n]||C.txtS,fontWeight:600}}>Niv.{n}</span>};

// ─── TABLE COMPONENT ─────────────────────────────────
const DataTable = ({headers,rows,gsaIdx=6}) => (
  <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:600}}>
      <thead>
        <tr style={{background:C.dark,color:"#fff"}}>
          {headers.map((h,i)=>(
            <th key={i} style={{padding:"7px 6px",textAlign:i===0?"left":"center",fontWeight:500,fontSize:10,...(i===gsaIdx+1?{background:C.gsa}:{})}}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row,i)=>(
          <tr key={i} style={{background:i%2===0?"#f8fafc":"#fff",borderBottom:`0.5px solid ${C.brd}`}}>
            <td style={{padding:"6px 6px",fontWeight:600,color:C.dark,whiteSpace:"nowrap",fontSize:10}}>{row.l}</td>
            {row.v.map((v,j)=>(
              <td key={j} style={{padding:"6px 6px",textAlign:"center",fontVariantNumeric:"tabular-nums",color:C.txt,...(j===gsaIdx?{background:"#eff6ff",fontWeight:700,color:C.gsa}:{}),...(String(v).startsWith("-")?{color:C.red}:{})}}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── TAB: VUE D'ENSEMBLE ─────────────────────────────
const VueEnsemble = () => (
  <div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <KPI label="CA P6" value="108,3M$" sub="+261% vs P0" color={C.gsa}/>
      <KPI label="Résultat net" value="6 132K$" sub="+172% vs P0" color={C.grn}/>
      <KPI label="ROCE" value="21,0%" sub="TBL Niveau 4" color={C.acc}/>
      <KPI label="Share Value" value="320" sub="#2 mondial" color={C.pur}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
      <Card>
        <Title sub="K$ — P0 à P6">CA, résultat net & ROCE</Title>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={caNetData} margin={{top:5,right:15,bottom:5,left:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="p" tick={{fontSize:10,fill:C.txtS}}/>
            <YAxis yAxisId="l" tick={{fontSize:9,fill:C.txtS}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <YAxis yAxisId="r" orientation="right" tick={{fontSize:9,fill:C.txtS}} unit="%" domain={[0,25]}/>
            <Tooltip content={<Tip/>}/>
            <Area yAxisId="l" type="monotone" dataKey="ca" fill={C.gsaL} stroke={C.gsa} strokeWidth={2} fillOpacity={.3} name="CA"/>
            <Bar yAxisId="l" dataKey="net" radius={[3,3,0,0]} barSize={22} name="Net">
              {caNetData.map((e,i)=><Cell key={i} fill={e.net<2000?C.red:C.grn}/>)}
            </Bar>
            <Line yAxisId="r" type="monotone" dataKey="roce" stroke={C.acc} strokeWidth={2.5} dot={{r:3,fill:C.acc}} name="ROCE"/>
          </ComposedChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <Title sub="P0 à P6 — 4 dimensions">Progression TBL</Title>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={tblEvol} margin={{top:5,right:15,bottom:5,left:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="p" tick={{fontSize:10,fill:C.txtS}}/>
            <YAxis domain={[0,4]} ticks={[0,1,2,3,4]} tick={{fontSize:9,fill:C.txtS}}/>
            <Tooltip content={<Tip/>}/>
            <Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="profit" stroke={C.gsa} strokeWidth={2} dot={{r:3}} name="Profit"/>
            <Line type="monotone" dataKey="people" stroke={C.grn} strokeWidth={2} dot={{r:3}} name="People"/>
            <Line type="monotone" dataKey="planet" stroke={C.acc} strokeWidth={2} dot={{r:3}} name="Planet"/>
            <Line type="monotone" dataKey="tbl" stroke={C.pur} strokeWidth={3} dot={{r:4}} name="TBL"/>
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card style={{marginTop:14}}>
      <Title sub="Toutes les entreprises — P0 à P6">Évolution Share Value</Title>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={svEvolution} margin={{top:5,right:15,bottom:5,left:5}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
          <XAxis dataKey="p" tick={{fontSize:10,fill:C.txtS}}/>
          <YAxis domain={[120,340]} tick={{fontSize:9,fill:C.txtS}}/>
          <Tooltip content={<Tip/>}/>
          <Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
          <Line type="monotone" dataKey="GSA" stroke={C.gsa} strokeWidth={3} dot={{r:4,fill:C.gsa}} name="GSA"/>
          <Line type="monotone" dataKey="Delta" stroke="#dc2626" strokeWidth={2} dot={{r:3}} name="Delta"/>
          <Line type="monotone" dataKey="ETH" stroke="#d97706" strokeWidth={1.5} dot={{r:2}} name="ETH" strokeDasharray="5 3"/>
          <Line type="monotone" dataKey="ABC" stroke="#6366f1" strokeWidth={1.5} dot={{r:2}} name="ABC" strokeDasharray="5 3"/>
          <Line type="monotone" dataKey="Cobalt" stroke="#059669" strokeWidth={1.2} dot={{r:2}} name="Cobalt" strokeDasharray="3 3"/>
          <Line type="monotone" dataKey="Bloom" stroke="#8b5cf6" strokeWidth={1.2} dot={{r:2}} name="Bloom" strokeDasharray="3 3"/>
          <Line type="monotone" dataKey="IGHALI" stroke="#0891b2" strokeWidth={1.2} dot={{r:2}} name="IGHALI" strokeDasharray="3 3"/>
          <Line type="monotone" dataKey="F" stroke="#ec4899" strokeWidth={1} dot={{r:1.5}} name="F" strokeDasharray="2 3"/>
          <Line type="monotone" dataKey="H" stroke="#78716c" strokeWidth={1} dot={{r:1.5}} name="H" strokeDasharray="2 3"/>
        </LineChart>
      </ResponsiveContainer>
      <div style={{marginTop:8,padding:"8px 12px",background:"#eff6ff",borderRadius:6,fontSize:11,color:C.gsa,borderLeft:`3px solid ${C.gsa}`}}>
        <strong>GSA #2 à 1 point de Delta (320 vs 321)</strong> — plus grande progression du top 3 (+83 pts vs +63 pour Delta). Le TBL Niveau 4 (+40 bonus) a fait la différence.
      </div>
    </Card>
    <Card style={{marginTop:14}}>
      <Title>Tableau récapitulatif P0→P6</Title>
      <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:560}}>
          <thead><tr style={{background:C.dark,color:"#fff"}}>
            {["Indicateur","P0","P1","P2","P3","P4","P5","P6","Δ"].map(h=>(
              <th key={h} style={{padding:"7px 6px",textAlign:h==="Indicateur"?"left":"right",fontWeight:500,fontSize:10,...(h==="P6"?{background:C.gsa}:{})}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {recapRows.map((r,i)=>(
              <tr key={i} style={{background:i%2===0?"#f8fafc":"#fff",borderBottom:`0.5px solid ${C.brd}`}}>
                <td style={{padding:"6px 6px",fontWeight:600,color:C.dark,fontSize:10}}>{r.l}</td>
                {r.v.map((v,j)=>(
                  <td key={j} style={{padding:"6px 6px",textAlign:"right",color:C.txt,fontSize:10,...(j===6?{background:"#eff6ff",fontWeight:700,color:C.gsa}:{})}}>{v}</td>
                ))}
                <td style={{padding:"6px 6px",textAlign:"right",fontWeight:700,color:C.grn,fontSize:10}}>{r.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// ─── TAB: COMPÉTITEURS ───────────────────────────────
const Competiteurs = () => (
  <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
      <Card>
        <Title sub="Base + bonus TBL">Share Value P6</Title>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={svData} layout="vertical" margin={{top:5,right:60,bottom:5,left:45}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false}/>
            <XAxis type="number" domain={[0,350]} tick={{fontSize:9,fill:C.txtS}}/>
            <YAxis type="category" dataKey="n" tick={{fontSize:10,fill:C.txt,fontWeight:500}} width={50}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="base" stackId="a" fill="#cbd5e1" name="Base" barSize={18}>
              {svData.map((e,i)=><Cell key={i} fill={e.n==="GSA"?C.gsa:"#cbd5e1"}/>)}
            </Bar>
            <Bar dataKey="bonus" stackId="a" fill="#fbbf24" name="Bonus TBL" radius={[0,4,4,0]} barSize={18}>
              {svData.map((e,i)=><Cell key={i} fill={e.n==="GSA"?"#60a5fa":"#fbbf24"}/>)}
              <LabelList dataKey="total" position="right" style={{fontSize:10,fontWeight:600,fill:C.txt}} formatter={v=>v}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <Title sub="ROCE (%)">Classement rentabilité P6</Title>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roceData} layout="vertical" margin={{top:5,right:40,bottom:5,left:45}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false}/>
            <XAxis type="number" domain={[-5,40]} tick={{fontSize:9,fill:C.txtS}} unit="%"/>
            <YAxis type="category" dataKey="n" tick={{fontSize:10,fill:C.txt,fontWeight:500}} width={50}/>
            <Tooltip content={<Tip/>}/>
            <ReferenceLine x={20} stroke={C.acc} strokeDasharray="5 5"/>
            <Bar dataKey="v" name="ROCE" radius={[0,4,4,0]} barSize={18}>
              {roceData.map((e,i)=><Cell key={i} fill={e.n==="GSA"?C.gsa:e.v<0?C.red:e.v>=20?C.grn:"#94a3b8"}/>)}
              <LabelList dataKey="v" position="right" formatter={v=>`${v}%`} style={{fontSize:9,fontWeight:600,fill:C.txt}}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card style={{marginTop:14}}>
      <Title sub="GSA vs Delta vs ETH">Radar compétitif P6</Title>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#e2e8f0"/>
          <PolarAngleAxis dataKey="d" tick={{fontSize:10,fill:C.txt}}/>
          <PolarRadiusAxis angle={30} domain={[0,100]} tick={{fontSize:8,fill:C.txtS}}/>
          <Radar name="GSA" dataKey="gsa" stroke={C.gsa} fill={C.gsa} fillOpacity={.25} strokeWidth={2}/>
          <Radar name="Delta" dataKey="delta" stroke={C.red} fill={C.red} fillOpacity={.1} strokeWidth={2}/>
          <Radar name="ETH" dataKey="eth" stroke={C.acc} fill={C.acc} fillOpacity={.1} strokeWidth={2}/>
          <Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
        </RadarChart>
      </ResponsiveContainer>
    </Card>
    <Card style={{marginTop:14}}>
      <Title>Tableau comparatif complet P6</Title>
      <DataTable headers={[""].concat(compHeaders)} rows={compTable}/>
    </Card>
  </div>
);

// ─── TAB: PARTS DE MARCHÉ & CARTE ────────────────────
const PartsMarche = () => (
  <div>
    <Card>
      <WorldMap/>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14,marginTop:14}}>
      <Card>
        <Title sub="Segment le plus stratégique">PdM Entreprises Amériques</Title>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={pdmEnt} margin={{top:5,right:15,bottom:5,left:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="p" tick={{fontSize:10,fill:C.txtS}}/>
            <YAxis domain={[0,50]} tick={{fontSize:9,fill:C.txtS}} unit="%"/>
            <Tooltip content={<Tip/>}/>
            <Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="gsa" stroke={C.gsa} strokeWidth={3} dot={{r:4}} name="GSA"/>
            <Line type="monotone" dataKey="delta" stroke={C.red} strokeWidth={2} dot={{r:3}} name="Delta"/>
            <Line type="monotone" dataKey="h" stroke={C.slate} strokeWidth={1.5} dot={{r:2}} name="H" strokeDasharray="5 3"/>
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <Title>PdM GSA par segment P6</Title>
        <div style={{fontSize:12}}>
          {[
            {r:"Amériques",pme:"23%",ent:"30%",par:"0%",color:C.gsa},
            {r:"EMEA",pme:"—",ent:"15%",par:"—",color:C.acc},
            {r:"Asie",pme:"17%",ent:"18%",par:"—",color:C.grn},
          ].map(m=>(
            <div key={m.r} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 0",borderBottom:`0.5px solid ${C.brd}`}}>
              <div style={{width:8,height:8,borderRadius:2,background:m.color,flexShrink:0}}/>
              <div style={{flex:1,fontWeight:600,color:C.dark,fontSize:12}}>{m.r}</div>
              <div style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:10,color:C.txtS}}>PME</div>
                <div style={{fontWeight:600,fontSize:12}}>{m.pme}</div>
              </div>
              <div style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:10,color:C.txtS}}>Entrep.</div>
                <div style={{fontWeight:600,fontSize:12,color:C.gsa}}>{m.ent}</div>
              </div>
              <div style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:10,color:C.txtS}}>Partic.</div>
                <div style={{fontWeight:600,fontSize:12}}>{m.par}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// ─── TAB: ANALYSE PRODUITS ───────────────────────────
const AnalyseProduits = () => (
  <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
      <Card>
        <Title sub="% du volume total">Évolution mix produit</Title>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={productMix} margin={{top:5,right:15,bottom:5,left:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="p" tick={{fontSize:10,fill:C.txtS}}/>
            <YAxis domain={[0,100]} tick={{fontSize:9,fill:C.txtS}} unit="%"/>
            <Tooltip content={<Tip/>}/>
            <Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="tsci" stackId="1" fill={C.gsa} name="T-SCI" barSize={24}/>
            <Bar dataKey="tsc" stackId="1" fill={C.grn} name="T-SC" barSize={24}/>
            <Bar dataKey="tc" stackId="1" fill={C.acc} name="T-C" barSize={24}/>
            <Bar dataKey="t" stackId="1" fill="#cbd5e1" name="T" barSize={24}/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <Title sub="Coût, prix et marge unitaire ($)">Rentabilité par produit P6</Title>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={marginP6} margin={{top:20,right:15,bottom:5,left:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="prod" tick={{fontSize:11,fill:C.txtS}}/>
            <YAxis tick={{fontSize:9,fill:C.txtS}} unit="$"/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="cout" stackId="1" fill="#cbd5e1" name="Coût" barSize={36}/>
            <Bar dataKey="marge" stackId="1" fill={C.grn} name="Marge" radius={[4,4,0,0]} barSize={36}>
              <LabelList dataKey="pct" position="top" formatter={v=>`${v}%`} style={{fontSize:10,fontWeight:700,fill:C.grn}}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card style={{marginTop:14,background:"#fefce8",borderColor:"#fef08a"}}>
      <div style={{fontSize:12,color:"#92400e"}}>
        <strong>Pricing power sous-exploité :</strong> le T-SCI (68% du volume) a la marge % la plus faible (7,9%). Une hausse de 150$/unité ajouterait ~6,2M$ au résultat net.
      </div>
    </Card>
    <Card style={{marginTop:14}}>
      <Title sub="Données de veille P7-P9">Étude de marché Entreprises — perspectives</Title>
      <DataTable headers={veilleEntreprises.headers} rows={veilleEntreprises.rows} gsaIdx={-1}/>
    </Card>
  </div>
);

// ─── TAB: PRÉVISIONS ─────────────────────────────────
const Previsions = () => (
  <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
      <Card>
        <Title sub="3 scénarios (K$)">CA projeté P7-P9</Title>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={previsions} margin={{top:5,right:15,bottom:5,left:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="p" tick={{fontSize:10,fill:C.txtS}}/>
            <YAxis domain={[80000,180000]} tick={{fontSize:9,fill:C.txtS}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <Tooltip content={<Tip/>}/>
            <Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="opti" stroke={C.grn} strokeWidth={2} strokeDasharray="6 3" dot={{r:3}} name="Optimiste"/>
            <Line type="monotone" dataKey="base" stroke={C.gsa} strokeWidth={3} dot={{r:4}} name="Base"/>
            <Line type="monotone" dataKey="pessi" stroke={C.red} strokeWidth={2} strokeDasharray="6 3" dot={{r:3}} name="Pessimiste"/>
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <Title sub="3 scénarios (K$)">Résultat net projeté</Title>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={previsions} margin={{top:5,right:15,bottom:5,left:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="p" tick={{fontSize:10,fill:C.txtS}}/>
            <YAxis tick={{fontSize:9,fill:C.txtS}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <Tooltip content={<Tip/>}/>
            <Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="nO" fill={C.grn} name="Optimiste" radius={[3,3,0,0]} barSize={16} fillOpacity={.7}/>
            <Bar dataKey="nB" fill={C.gsa} name="Base" radius={[3,3,0,0]} barSize={16}/>
            <Bar dataKey="nP" fill={C.red} name="Pessimiste" radius={[3,3,0,0]} barSize={16} fillOpacity={.7}/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card style={{marginTop:14}}>
      <Title>Recommandations & KPI</Title>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
        <div>
          <p style={{fontSize:13,fontWeight:700,color:C.dark,margin:"0 0 10px",borderBottom:`2px solid ${C.gsa}`,paddingBottom:6}}>5 recommandations</p>
          {[
            {n:"01",t:"Monétiser l'avantage prix",d:"Hausser le T-SCI de 10-15%"},
            {n:"02",t:"Activer PME en EMEA",d:"48 000 unités non adressées"},
            {n:"03",t:"Investir en productivité",d:"Indice 98 = plus bas du marché"},
            {n:"04",t:"Protéger le TBL Niveau 4",d:"Vaut +40 pts de Share Value"},
            {n:"05",t:"Dividendes soutenus 60-70%",d:"Rendement actionnarial soutenu"},
          ].map(r=>(
            <div key={r.n} style={{display:"flex",gap:8,marginBottom:10}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:C.gsa,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{r.n}</div>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:C.dark}}>{r.t}</div>
                <div style={{fontSize:10,color:C.txtS}}>{r.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p style={{fontSize:13,fontWeight:700,color:C.dark,margin:"0 0 10px",borderBottom:`2px solid ${C.acc}`,paddingBottom:6}}>6 KPI critiques</p>
          {[
            {k:"Marge T-SCI",c:"> 250$",a:"173$",s:"warning"},
            {k:"PdM Ent. Amériques",c:"> 25%",a:"30%",s:"ok"},
            {k:"Productivité",c:"> 130",a:"98",s:"danger"},
            {k:"ROCE",c:"> 20%",a:"21%",s:"ok"},
            {k:"Cash",c:"> 3 000K",a:"4 764K",s:"ok"},
            {k:"PdM PME EMEA",c:"> 5%",a:"0%",s:"danger"},
          ].map((k,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",borderRadius:6,marginBottom:5,background:k.s==="ok"?"#f0fdf4":k.s==="warning"?"#fefce8":"#fef2f2",border:`0.5px solid ${k.s==="ok"?"#bbf7d0":k.s==="warning"?"#fef08a":"#fecaca"}`}}>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:C.dark}}>{k.k}</div>
                <div style={{fontSize:9,color:C.txtS}}>Cible : {k.c}</div>
              </div>
              <div style={{fontSize:13,fontWeight:700,color:k.s==="ok"?C.grn:k.s==="warning"?C.acc:C.red}}>{k.a}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

// ─── TAB: ABOUT US ───────────────────────────────────
const AboutUs = () => (
  <div>
    <div style={{textAlign:"center",marginBottom:24}}>
      <img src={LOGO} alt="GSA Group" style={{height:56,width:"auto",marginBottom:8}}/>
      <h2 style={{fontSize:20,fontWeight:700,color:C.dark,margin:"0 0 2px"}}>GSA Group</h2>
      <p style={{fontSize:12,color:C.txtS}}>Comité de direction — GlobStrat HEC Montréal 2026</p>
    </div>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:20}}>
      {TEAM.map(m=>(
        <div key={m.name} style={{width:150,textAlign:"center"}}>
          <div style={{width:100,height:100,borderRadius:"50%",overflow:"hidden",margin:"0 auto 10px",border:`3px solid ${C.gsa}`}}>
            <img src={m.photo} alt={m.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </div>
          <div style={{fontSize:14,fontWeight:700,color:C.dark}}>{m.name}</div>
          <div style={{fontSize:11,fontWeight:600,color:C.gsa,textTransform:"uppercase",letterSpacing:.5,marginTop:2}}>{m.role}</div>
          <div style={{fontSize:9,color:C.txtS,marginTop:4,wordBreak:"break-all"}}>{m.email}</div>
        </div>
      ))}
    </div>
    <Card style={{marginTop:24}}>
      <WorldMap/>
    </Card>
  </div>
);

// ─── MAIN ────────────────────────────────────────────
const tabs = ["Vue d'ensemble","Compétiteurs","Marchés & Carte","Produits","Prévisions","About Us"];
const panels = [VueEnsemble,Competiteurs,PartsMarche,AnalyseProduits,Previsions,AboutUs];

export default function GSADashboard() {
  const [tab,setTab] = useState(0);
  const Panel = panels[tab];

  return (
    <div style={{fontFamily:"'Segoe UI',-apple-system,sans-serif",background:C.bg,minHeight:"100vh",color:C.txt}}>
      <div style={{background:"linear-gradient(135deg,#0f172a,#1e3a5f)",padding:"16px 16px 10px",color:"#fff"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
         <img
  src={LOGO}
  alt="GSA Group"
  style={{
    height: 40,
    width: "auto",
    objectFit: "contain",
    borderRadius: 10   // 👈 arrondi ici
  }}
/>
          <div>
            <h1 style={{
  fontSize:16,
  fontWeight:700,
  margin:0,
  color: "#ffffff"   // 👈 ici
}}>
  GSA Group — Présentation Finale
</h1>
            <p style={{fontSize:10,margin:0,opacity:.7}}>MNGT 10430 — GlobStrat P0→P6</p>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:2,padding:"0 8px",background:"#1e293b",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
        {tabs.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",fontSize:11,fontWeight:tab===i?700:500,color:tab===i?"#fff":"#94a3b8",background:tab===i?C.gsa:"transparent",border:"none",cursor:"pointer",borderRadius:"6px 6px 0 0",whiteSpace:"nowrap",transition:"all .15s"}}>
            {t}
          </button>
        ))}
      </div>
      <div style={{padding:14,maxWidth:1000,margin:"0 auto"}}>
        <Panel/>
      </div>
      <div style={{textAlign:"center",padding:"12px 0 20px",fontSize:9,color:C.txtS}}>
        GSA Group · MNGT 10430 · Management stratégique · HEC Montréal · 2026
      </div>
    </div>
  );
}