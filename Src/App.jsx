import { useState, useEffect } from "react";

const DAYS = ["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"];
const BADGE_META = {
  glutenvrij:   { emoji:"🌾", label:"GV",     color:"#d4a96a" },
  pescetarisch: { emoji:"🐟", label:"Vis",    color:"#5a8fa3" },
  snel:         { emoji:"⚡", label:"Snel",   color:"#b5a642" },
  batch:        { emoji:"🥡", label:"Batch",  color:"#7a9e7e" },
  vegetarisch:  { emoji:"🥦", label:"Veggie", color:"#5e8c5e" },
};

const INITIAL_PANTRY = [
  {id:"p1",name:"Glutenvrije wrap tortillas",qty:5,unit:"st",cat:"Wraps & brood"},
  {id:"p2",name:"Glutenvrij brood (oven)",qty:3,unit:"st",cat:"Wraps & brood"},
  {id:"p3",name:"Glutenvrij toast",qty:2,unit:"st",cat:"Wraps & brood"},
  {id:"p4",name:"Sojameelk",qty:1,unit:"pak",cat:"Melk"},
  {id:"p5",name:"Sojameelk barista",qty:1,unit:"pak",cat:"Melk"},
  {id:"p6",name:"Havermelk barista",qty:1,unit:"pak",cat:"Melk"},
  {id:"p7",name:"Glutenvrije pasta (Barilla)",qty:5,unit:"pak",cat:"Granen & pasta"},
  {id:"p8",name:"Rijstnoedels",qty:5,unit:"pak",cat:"Granen & pasta"},
  {id:"p9",name:"Udon noedels",qty:2,unit:"pak",cat:"Granen & pasta"},
  {id:"p10",name:"Soba noedels",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p11",name:"Lasagnebladen",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p12",name:"Spaghetti La Molisana",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p13",name:"Gewone spaghetti",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p14",name:"Volkoren fusilli",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p15",name:"Witte rijst",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p16",name:"Glutenvrij broodkruim",qty:3,unit:"pak",cat:"Granen & pasta"},
  {id:"p17",name:"Glutenvrij meel",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p18",name:"Glutenvrije granola",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p19",name:"Gewone granola",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p20",name:"Havermout",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p21",name:"Havermoutkoekjes",qty:1,unit:"pak",cat:"Granen & pasta"},
  {id:"p22",name:"Glutenvrije havermout",qty:2,unit:"pak",cat:"Granen & pasta"},
  {id:"p23",name:"Gepelde tomaten",qty:5,unit:"blik",cat:"Blikken — tomaat"},
  {id:"p24",name:"Tomatenpuree",qty:5,unit:"blik",cat:"Blikken — tomaat"},
  {id:"p25",name:"Tomato frito",qty:3,unit:"blik",cat:"Blikken — tomaat"},
  {id:"p26",name:"Kikkererwten",qty:3,unit:"blik",cat:"Blikken — peulvruchten"},
  {id:"p27",name:"Linzen",qty:2,unit:"blik",cat:"Blikken — peulvruchten"},
  {id:"p28",name:"Kidney bonen",qty:2,unit:"blik",cat:"Blikken — peulvruchten"},
  {id:"p29",name:"Cannellini bonen",qty:2,unit:"blik",cat:"Blikken — peulvruchten"},
  {id:"p30",name:"Tonijn",qty:3,unit:"blik",cat:"Blikken — vis"},
  {id:"p31",name:"Ansjovis",qty:2,unit:"blik",cat:"Blikken — vis"},
  {id:"p32",name:"Champignons",qty:1,unit:"blik",cat:"Blikken — vis"},
  {id:"p33",name:"Patak's curry saus",qty:3,unit:"pot",cat:"Sauzen"},
  {id:"p34",name:"Rode currypasta",qty:4,unit:"pot",cat:"Sauzen"},
  {id:"p35",name:"Gele currypasta",qty:2,unit:"pot",cat:"Sauzen"},
  {id:"p36",name:"Kikkoman sojasaus",qty:2,unit:"fles",cat:"Sauzen"},
  {id:"p37",name:"Pizzasaus Barilla",qty:1,unit:"pot",cat:"Sauzen"},
  {id:"p38",name:"Pesto alla genovese Barilla",qty:1,unit:"pot",cat:"Sauzen"},
  {id:"p39",name:"Pesto alla genovese huismerk",qty:1,unit:"pot",cat:"Sauzen"},
  {id:"p40",name:"Tahini",qty:1,unit:"pot",cat:"Sauzen"},
  {id:"p41",name:"IKEA mosterd-dillsaus",qty:2,unit:"pot",cat:"Sauzen"},
  {id:"p42",name:"Graanmosterd",qty:1,unit:"pot",cat:"Sauzen"},
  {id:"p43",name:"Rijstwijn",qty:1,unit:"fles",cat:"Sauzen"},
  {id:"p44",name:"Kappertjes",qty:1,unit:"pot",cat:"Sauzen"},
  {id:"p45",name:"Appelmos",qty:1,unit:"pot",cat:"Sauzen"},
  {id:"p46",name:"Augurken",qty:2,unit:"pot",cat:"Sauzen"},
  {id:"p47",name:"Mayonaise",qty:1,unit:"pot",cat:"Sauzen"},
  {id:"p48",name:"Pure chocolade",qty:1,unit:"st",cat:"Zoet & bakken"},
  {id:"p49",name:"Cacaopoeder",qty:1,unit:"pak",cat:"Zoet & bakken"},
  {id:"p50",name:"Aardbeienconfiture",qty:1,unit:"pot",cat:"Zoet & bakken"},
  {id:"p51",name:"Lingonberry jam IKEA",qty:1,unit:"pot",cat:"Zoet & bakken"},
  {id:"p52",name:"Pecannoten",qty:1,unit:"pak",cat:"Noten & zaden"},
  {id:"p53",name:"Pijnboompitten",qty:1,unit:"pak",cat:"Noten & zaden"},
  {id:"p54",name:"Chiazaad",qty:1,unit:"pak",cat:"Noten & zaden"},
  {id:"p55",name:"Babysnacks puffs",qty:1,unit:"pak",cat:"Baby"},
  {id:"p56",name:"Bambi appel-banaan-framboos",qty:1,unit:"st",cat:"Baby"},
  {id:"p57",name:"Groentenhapjes",qty:8,unit:"st",cat:"Baby"},
  {id:"p58",name:"Fruitpap",qty:2,unit:"st",cat:"Baby"},
];

const INITIAL_RECIPES = [
  { id:"r1", name:"Banaan-skyr pannenkoeken", tags:["vegetarisch","glutenvrij","snel","batch"], prepTime:10, cookTime:20, servings:4, description:"Luchtige ontbijtpannenkoeken zonder gluten.", ingredients:["4 middelgrote rijpe bananen","190g glutenvrije havermout","400g skyr 0%","3 eieren","1.5 el chiazaad","1.5 tl bakpoeder","1.5 tl vanille-extract","Snuf zout"], steps:["Prak de bananen fijn.","Voeg skyr, eieren en vanille-extract toe.","Voeg havermout, chiazaad, bakpoeder en zout toe.","Laat 5 min rusten.","Bak 2-3 min per kant."], notes:"Restjes bewaar je in koelkast (3 dagen) of vriezer." },
  { id:"r2", name:"Tiktokpasta met feta", tags:["vegetarisch","snel"], prepTime:10, cookTime:35, servings:2, description:"Geroosterde feta met cherrytomaatjes, courgette en paprika.", ingredients:["200g glutenvrije pasta","200g feta","300g cherrytomaatjes","1 courgette","1 paprika","2 handenvol spinazie","3 el olijfolie","Chili naar smaak","2 el cottage cheese (optioneel)"], steps:["Verwarm oven op 200°C.","Leg feta in ovenschaal met tomaten, courgette, paprika en olijfolie.","Rooster 30-35 min.","Kook pasta. Prak feta met tomaten, roer spinazie erdoor.","Meng met pasta."], notes:"Courgetti werkt ook als alternatief." },
  { id:"r3", name:"Wok met tofu en rijstnoedels", tags:["vegetarisch","glutenvrij","snel"], prepTime:15, cookTime:20, servings:2, description:"Knapperige geglazuurde tofu met wokgroenten.", ingredients:["300g stevige tofu","200g rijstnoedels of rijst","Wokgroenten (paprika, wortel, paksoi, broccoli)","3 el tamari","1 el sesamolie","1 el hoisinsaus","1 tl gember","2 teentjes knoflook","1 el maizena"], steps:["Dep tofu droog, bestrooi met maizena, bak krokant.","Meng tamari, sesamolie, hoisin, gember tot glazuur.","Giet over tofu, bak 2 min.","Wok groenten met knoflook.","Meng met noedels en tofu."], notes:"Hoe droger de tofu, hoe krokanter." },
  { id:"r4", name:"Pimped pizza margherita", tags:["snel"], prepTime:10, cookTime:15, servings:2, description:"Margherita met burrata, ansjovis en kappertjes.", ingredients:["2 glutenvrije pizzabodems","4 el tomatensaus","150g cherrytomaatjes","1 bol burrata","6-8 ansjovisfilets","2 el kappertjes","Basilicum","Olijfolie"], steps:["Oven op 220°C.","Bestrijk bodems met saus en tomaten.","Bak 12-15 min.","Beleg met burrata, ansjovis en kappertjes.","Werk af met basilicum."], notes:"Serveer direct." },
  { id:"r5", name:"Wraps met fajitakip en salade", tags:["snel"], prepTime:15, cookTime:15, servings:2, description:"Wraps met gekruide kip of vegakip.", ingredients:["4 wraps","300g kipfilet of vegakip","1 paprika","1 ui","2 el fajitakruiden","Sla, cherrytomaatjes, komkommer","Olijfolie"], steps:["Kip in reepjes, bestrooi met fajitakruiden.","Bak in olijfolie 5-6 min, voeg paprika en ui toe.","Maak de salade.","Warm wraps op, vul en serveer."], notes:"Vegakip apart bereiden in dezelfde pan." },
  { id:"r6", name:"Madras curry (pakket)", tags:["glutenvrij","snel","batch"], prepTime:5, cookTime:25, servings:2, description:"Snelle curry van pakket.", ingredients:["1 pakket Madras curry (Lehazen)","Vlees, tofu of kikkererwten","Basmatirijst"], steps:["Bereid curry volgens pakket.","Serveer met rijst."], notes:"Snel voor drukke avonden." },
  { id:"r7", name:"Tray bake met vis", tags:["pescetarisch","glutenvrij","batch"], prepTime:15, cookTime:35, servings:2, description:"Alles op één bakplaat met vis en groenten.", ingredients:["2 visfilets (witvis of zalm)","300g krieltjes","200g cherrytomaatjes","1 courgette","100g spinazie","80g kalamata-olijven","2 el kappertjes","Zachte kaas","3 el olijfolie","Zout, peper, oregano"], steps:["Oven 200°C. Krieltjes 15 min roosteren.","Voeg tomaten, courgette, olijven, kappertjes toe. Nog 10 min.","Vis en spinazie erbij, 12-15 min."], notes:"Varieer met seizoensvis." },
  { id:"r8", name:"Zalm in romige tomatensaus", tags:["pescetarisch","glutenvrij","snel"], prepTime:10, cookTime:20, servings:2, description:"Zalmfilets in romige tomatensaus.", ingredients:["2 zalmfilets","400g gepelde tomaten","1 sjalot","2 teentjes knoflook","100ml kookroom of kokosroom","Verse kruiden","Rijst of pasta"], steps:["Sjalot en knoflook fruiten.","Tomaten toevoegen, 10 min sudderen. Room toevoegen.","Zalm erin, 8-10 min op laag vuur.","Afwerken met kruiden."], notes:"Kokosroom maakt het glutenvrij." },
  { id:"r9", name:"Pasta met gerookte zalm, broccoli en mascarpone", tags:["pescetarisch","snel"], prepTime:10, cookTime:15, servings:2, description:"Romige pasta met gerookte zalm en mosterd.", ingredients:["200g glutenvrije pasta","150g gerookte zalm","200g broccoli","150g mascarpone","1 el mosterd met zaden","Sap van halve citroen","Verse dille"], steps:["Pasta koken, broccoli laatste 3 min mee.","Mascarpone en mosterd door warme pasta.","Zalm en citroen toevoegen.","Afwerken met dille."], notes:"Mosterdzaadjes geven textuur." },
  { id:"r10", name:"Pasta alla Norma", tags:["vegetarisch","snel"], prepTime:10, cookTime:25, servings:2, description:"Siciliaans met aubergine en ricotta salata.", ingredients:["200g glutenvrije pasta","1 aubergine","400g gepelde tomaten","2 teentjes knoflook","Basilicum","50g ricotta salata of feta","Olijfolie","Chilivlokken"], steps:["Aubergine zouten, 10 min laten staan, bakken.","Knoflook en tomaten 15 min sudderen.","Pasta koken, mengen met saus en aubergine."], notes:"Feta is goede vervanger voor ricotta salata." },
  { id:"r11", name:"Pasta met zalm, courgette, citroen en dille", tags:["pescetarisch","glutenvrij","snel"], prepTime:10, cookTime:15, servings:2, description:"Frisse pasta met zalm en citroen.", ingredients:["200g glutenvrije pasta","2 zalmfilets of 150g gerookte zalm","1 courgette","Rasp en sap van 1 citroen","Verse dille","1 teentje knoflook","Olijfolie"], steps:["Pasta koken.","Knoflook en courgette bakken.","Zalm toevoegen.","Mengen met pasta en citroen.","Afwerken met dille."], notes:"Met gerookte zalm klaar in 15 min." },
  { id:"r12", name:"Curry met zoete aardappel, kikkererwten en spinazie", tags:["vegetarisch","glutenvrij","batch"], prepTime:15, cookTime:30, servings:4, description:"Volle curry met kokosmelk.", ingredients:["2 zoete aardappelen","400g kikkererwten","200g spinazie","400ml kokosmelk","2 el rode currypasta","1 ui","3 teentjes knoflook","1 tl gember","Rijst","Verse koriander"], steps:["Ui, knoflook, gember fruiten.","Currypasta meebakken.","Zoete aardappel en kokosmelk erbij, 20 min.","Kikkererwten erbij, 5 min.","Spinazie erdoor."], notes:"Vriest uitstekend in." },
  { id:"r13", name:"Salade geitenkaas met spek en appel", tags:["snel"], prepTime:15, cookTime:10, servings:2, description:"Warme geitenkaas op frisse salade met appel en spek.", ingredients:["2 plakjes rollade geitenkaas","1 appel","100g spek of vegaspek","Gemengde sla","Cherrytomaatjes","Komkommer","2 el pijnboompitten","Honing","Oregano","Dressing: olijfolie, witte wijnazijn, mosterd"], steps:["Oven 180°C grilstand. Geitenkaas met honing en oregano, 8-10 min.","Spek knapperig bakken.","Sla, tomaat, komkommer, appel mengen met dressing.","Serveren met warme geitenkaas en spek."], notes:"Vegaspek apart bereiden." },
];

const INITIAL_WEEKS = {
  "2025-06-23": { Maandag:{text:"Wok met tofu",recipeId:"r3"}, Dinsdag:{text:"Salade geitenkaas",recipeId:"r13"}, Woensdag:{text:"Wok met tofu",recipeId:"r3"}, Donderdag:{text:"K&K Charlotte",recipeId:null}, Vrijdag:{text:"Pimped pizzas",recipeId:"r4"}, Zaterdag:{text:"NVT",recipeId:null}, Zondag:{text:"Salade geitenkaas",recipeId:"r13"} },
  "2025-06-30": { Maandag:{text:"Tiktokpasta met feta",recipeId:"r2"}, Dinsdag:{text:"VOORRAAD",recipeId:null}, Woensdag:{text:"VOORRAAD",recipeId:null}, Donderdag:{text:"Tiktokpasta met feta",recipeId:"r2"}, Vrijdag:{text:"NVT",recipeId:null}, Zaterdag:{text:"Wraps met fajitakip",recipeId:"r5"}, Zondag:{text:"VOORRAAD",recipeId:null} },
};

const genId = () => Math.random().toString(36).slice(2,10);
const EMPTY_WEEK = () => Object.fromEntries(DAYS.map(d=>[d,{text:"",recipeId:null}]));

function getMondayOf(date) {
  const d=new Date(date); const day=d.getDay();
  d.setDate(d.getDate()+(day===0?-6:1-day)); d.setHours(0,0,0,0); return d;
}
function weekKey(m) { return m.toISOString().slice(0,10); }
function formatWeek(m) {
  const e=new Date(m); e.setDate(e.getDate()+6);
  return `${m.getDate()}/${m.getMonth()+1} - ${e.getDate()}/${e.getMonth()+1}`;
}

// ── Pantry helpers ────────────────────────────────────────────────────────────
function pantryMatch(ingredientStr, pantry) {
  const s = ingredientStr.toLowerCase();
  return pantry.filter(p => {
    const n = p.name.toLowerCase();
    const words = n.split(" ").filter(w=>w.length>3);
    return words.some(w=>s.includes(w)) || s.includes(n);
  });
}

// ── Export / Import ───────────────────────────────────────────────────────────
function SaveStatus({status, persistent}) {
  if(!status) return null;
  const colors = {saving:"#b5a642", saved:"#7a9e7e", error:"#e07a5f"};
  const labels = {
    saving:"Opslaan...",
    saved: persistent ? "✓ Permanent opgeslagen" : "✓ Opgeslagen (tijdelijk)",
    error:"⚠ Tijdelijke opslag"
  };
  return <span style={{fontSize:"12px",color:colors[status],fontWeight:600}}>{labels[status]}</span>;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function Badge({tag}) {
  const m=BADGE_META[tag]||{emoji:"",label:tag,color:"#999"};
  return <span style={{display:"inline-flex",alignItems:"center",gap:"3px",background:m.color+"22",color:m.color,border:`1px solid ${m.color}55`,borderRadius:"20px",fontSize:"11px",fontWeight:600,padding:"2px 8px",whiteSpace:"nowrap"}}>{m.emoji} {m.label}</span>;
}
function TagToggle({tag,selected,onToggle}) {
  const m=BADGE_META[tag]||{emoji:"",label:tag,color:"#999"};
  return <button onClick={()=>onToggle(tag)} style={{display:"inline-flex",alignItems:"center",gap:"4px",background:selected?m.color:"transparent",color:selected?"#fff":m.color,border:`1.5px solid ${m.color}`,borderRadius:"20px",fontSize:"12px",fontWeight:600,padding:"4px 12px",cursor:"pointer"}}>{m.emoji} {m.label}</button>;
}
function ConfirmModal({message,onConfirm,onCancel}) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.4)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{background:"#fff",borderRadius:"14px",padding:"24px",maxWidth:"320px",width:"100%"}}>
        <p style={{margin:"0 0 20px",fontSize:"15px",color:"#2d2a26",lineHeight:1.5}}>{message}</p>
        <div style={{display:"flex",gap:"10px",justifyContent:"flex-end"}}>
          <button onClick={onCancel} style={{background:"none",border:"1.5px solid #ddd8d0",borderRadius:"8px",padding:"8px 18px",cursor:"pointer",fontSize:"14px",color:"#7a6f65"}}>Annuleren</button>
          <button onClick={onConfirm} style={{background:"#e07a5f",border:"none",borderRadius:"8px",padding:"8px 18px",cursor:"pointer",fontSize:"14px",fontWeight:700,color:"#fff"}}>Verwijderen</button>
        </div>
      </div>
    </div>
  );
}

// ── Ingredient panel ──────────────────────────────────────────────────────────
function parseIngredient(str) {
  const m=str.match(/^(\d+(?:[.,]\d+)?)\s*([a-zA-Z]*)\s+(.*)/);
  if(!m)return{qty:null,unit:"",rest:str};
  return{qty:parseFloat(m[1].replace(",",".")),unit:m[2],rest:m[3]};
}
function scaleIngredient(str,from,to) {
  if(!from||from===to)return str;
  const{qty,unit,rest}=parseIngredient(str);
  if(qty===null)return str;
  const s=(qty*to)/from;
  const nice=s%1===0?s:Math.round(s*10)/10;
  return `${nice}${unit?unit+" ":""}${rest}`;
}
function IngredientPanel({recipe,pantry,onClose,onOpenRecipe}) {
  const base=recipe.servings||2;
  const [portions,setPortions]=useState(4);
  return (
    <div style={{borderTop:"1px solid #e0ede6",background:"#f4faf6",padding:"14px 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
        <button onClick={onOpenRecipe} style={{background:"none",border:"none",color:"#2d4a3e",cursor:"pointer",fontWeight:700,fontSize:"13px",padding:0,textDecoration:"underline",textDecorationStyle:"dotted"}}>📖 Volledig recept</button>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"12px",color:"#7a6f65"}}>Porties:</span>
          <button onClick={()=>setPortions(p=>Math.max(1,p-1))} style={{background:"#ddeee6",border:"none",borderRadius:"6px",width:"26px",height:"26px",cursor:"pointer",fontWeight:700,color:"#2d4a3e",fontSize:"16px",lineHeight:1}}>-</button>
          <span style={{fontWeight:700,fontSize:"15px",color:"#2d2a26",minWidth:"20px",textAlign:"center"}}>{portions}</span>
          <button onClick={()=>setPortions(p=>p+1)} style={{background:"#ddeee6",border:"none",borderRadius:"6px",width:"26px",height:"26px",cursor:"pointer",fontWeight:700,color:"#2d4a3e",fontSize:"16px",lineHeight:1}}>+</button>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#b0a89e",cursor:"pointer",fontSize:"20px",marginLeft:"4px",lineHeight:1}}>×</button>
        </div>
      </div>
      {recipe.ingredients?.filter(Boolean).length>0
        ?<ul style={{margin:0,paddingLeft:"18px",color:"#3a4a3e",fontSize:"13px",lineHeight:2.1}}>
          {recipe.ingredients.filter(Boolean).map((ing,i)=>{
            const matches=pantryMatch(ing,pantry);
            const inStock=matches.length>0;
            return <li key={i} style={{color:inStock?"#7a9e7e":"#3a4a3e"}}>
              {scaleIngredient(ing,base,portions)}
              {inStock&&<span style={{fontSize:"11px",marginLeft:"6px",background:"#e8f4f0",color:"#2d4a3e",borderRadius:"10px",padding:"1px 7px",fontWeight:600}}>✓ voorraad</span>}
            </li>;
          })}
        </ul>
        :<p style={{margin:0,fontSize:"13px",color:"#b0a89e",fontStyle:"italic"}}>Nog geen ingredienten.</p>
      }
    </div>
  );
}

// ── Typeahead ─────────────────────────────────────────────────────────────────
function MealInput({value,onChange,recipes,onSelectRecipe}) {
  const [open,setOpen]=useState(false);
  const q=value.toLowerCase().trim();
  const suggestions=q.length>0?recipes.filter(r=>r.name.toLowerCase().includes(q)).slice(0,6):[];
  return (
    <div style={{position:"relative",marginBottom:"10px"}}>
      <input value={value} onChange={e=>{onChange(e.target.value);setOpen(true);}} onFocus={()=>setOpen(true)}
        placeholder="Typ een maaltijd..."
        style={{width:"100%",padding:"8px 11px",borderRadius:"8px",border:"1.5px solid #ddd8d0",fontSize:"14px",boxSizing:"border-box",outline:"none"}} />
      {open&&suggestions.length>0&&(
        <div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #ddd8d0",borderRadius:"8px",boxShadow:"0 4px 16px rgba(0,0,0,.12)",zIndex:50,marginTop:"3px",overflow:"hidden"}}>
          {suggestions.map(r=>(
            <div key={r.id} onClick={()=>{onSelectRecipe(r);setOpen(false);}}
              style={{padding:"9px 13px",cursor:"pointer",fontSize:"14px",color:"#2d2a26",display:"flex",alignItems:"center",gap:"8px",borderBottom:"1px solid #f0ece6"}}
              onMouseEnter={e=>e.currentTarget.style.background="#f4faf6"}
              onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
              <span>📖</span><span style={{flex:1,fontWeight:500}}>{r.name}</span>
              <span style={{display:"flex",gap:"3px"}}>{r.tags.slice(0,2).map(t=><Badge key={t} tag={t}/>)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── StringListEditor ──────────────────────────────────────────────────────────
function StringListEditor({label,values,onChange}) {
  return (
    <div style={{marginBottom:"16px"}}>
      <label style={{display:"block",fontWeight:600,color:"#4a4037",fontSize:"13px",marginBottom:"6px"}}>{label}</label>
      {values.map((v,i)=>(
        <div key={i} style={{display:"flex",gap:"6px",marginBottom:"6px"}}>
          <input value={v} onChange={e=>{const a=[...values];a[i]=e.target.value;onChange(a);}} style={{flex:1,padding:"7px 10px",borderRadius:"8px",border:"1.5px solid #ddd8d0",fontSize:"14px",outline:"none"}} />
          <button onClick={()=>onChange(values.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:"#c0a99a",cursor:"pointer",fontSize:"18px",padding:"0 6px"}}>×</button>
        </div>
      ))}
      <button onClick={()=>onChange([...values,""])} style={{fontSize:"13px",color:"#7a9e7e",background:"none",border:"1.5px dashed #7a9e7e88",borderRadius:"8px",padding:"5px 14px",cursor:"pointer"}}>+ Toevoegen</button>
    </div>
  );
}

// ── RecipeForm ────────────────────────────────────────────────────────────────
function RecipeForm({initial,onSave,onCancel}) {
  const [form,setForm]=useState(initial||{name:"",tags:[],prepTime:"",cookTime:"",servings:2,description:"",ingredients:[""],steps:[""],notes:""});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const valid=form.name.trim().length>0;
  return (
    <div style={{maxWidth:"680px",margin:"0 auto"}}>
      <button onClick={onCancel} style={{background:"none",border:"none",color:"#7a9e7e",cursor:"pointer",fontSize:"14px",fontWeight:600,padding:"0 0 16px"}}>← Annuleren</button>
      <div style={{background:"#fff",borderRadius:"16px",padding:"28px",border:"1.5px solid #e8e2d9"}}>
        <h2 style={{margin:"0 0 20px",fontFamily:"'Playfair Display',Georgia,serif",color:"#2d2a26"}}>{initial?.id?"Recept bewerken":"Nieuw recept"}</h2>
        {initial?._autoCreated&&<div style={{background:"#fff8e1",border:"1px solid #ffe082",borderRadius:"8px",padding:"10px 14px",marginBottom:"16px",fontSize:"13px",color:"#7a5c00"}}>Automatisch aangemaakt — voeg ingredienten en stappen toe!</div>}
        <label style={{display:"block",fontWeight:600,color:"#4a4037",fontSize:"13px",marginBottom:"6px"}}>Naam *</label>
        <input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="bijv. Tiktokpasta" style={{width:"100%",padding:"9px 12px",borderRadius:"9px",border:"1.5px solid #ddd8d0",fontSize:"15px",marginBottom:"16px",boxSizing:"border-box"}} />
        <label style={{display:"block",fontWeight:600,color:"#4a4037",fontSize:"13px",marginBottom:"8px"}}>Labels</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"16px"}}>{Object.keys(BADGE_META).map(t=><TagToggle key={t} tag={t} selected={form.tags.includes(t)} onToggle={tag=>set("tags",form.tags.includes(tag)?form.tags.filter(x=>x!==tag):[...form.tags,tag])} />)}</div>
        <label style={{display:"block",fontWeight:600,color:"#4a4037",fontSize:"13px",marginBottom:"6px"}}>Korte omschrijving</label>
        <input value={form.description} onChange={e=>set("description",e.target.value)} style={{width:"100%",padding:"9px 12px",borderRadius:"9px",border:"1.5px solid #ddd8d0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box"}} />
        <div style={{display:"flex",gap:"12px",marginBottom:"16px"}}>
          {[["Voorbereiding (min)","prepTime"],["Kooktijd (min)","cookTime"],["Porties","servings"]].map(([l,k])=>(
            <div key={k} style={{flex:1}}>
              <label style={{display:"block",fontWeight:600,color:"#4a4037",fontSize:"13px",marginBottom:"6px"}}>{l}</label>
              <input type="number" value={form[k]} onChange={e=>set(k,Number(e.target.value))} min={0} style={{width:"100%",padding:"7px 10px",borderRadius:"8px",border:"1.5px solid #ddd8d0",fontSize:"14px",boxSizing:"border-box"}} />
            </div>
          ))}
        </div>
        <StringListEditor label="Ingredienten" values={form.ingredients.length?form.ingredients:[""]} onChange={v=>set("ingredients",v)} />
        <StringListEditor label="Stappen" values={form.steps.length?form.steps:[""]} onChange={v=>set("steps",v)} />
        <label style={{display:"block",fontWeight:600,color:"#4a4037",fontSize:"13px",marginBottom:"6px"}}>Notities & tips</label>
        <textarea value={form.notes} onChange={e=>set("notes",e.target.value)} rows={3} style={{width:"100%",padding:"9px 12px",borderRadius:"9px",border:"1.5px solid #ddd8d0",fontSize:"14px",resize:"vertical",boxSizing:"border-box",marginBottom:"20px"}} />
        <div style={{display:"flex",gap:"10px"}}>
          <button onClick={()=>valid&&onSave({...form,id:form.id||genId()})} disabled={!valid} style={{background:valid?"#7a9e7e":"#ccc",color:"#fff",border:"none",borderRadius:"10px",padding:"10px 28px",fontSize:"15px",fontWeight:700,cursor:valid?"pointer":"default"}}>Recept opslaan</button>
          <button onClick={onCancel} style={{background:"none",border:"1.5px solid #ddd8d0",borderRadius:"10px",padding:"10px 20px",fontSize:"15px",cursor:"pointer",color:"#7a6f65"}}>Annuleren</button>
        </div>
      </div>
    </div>
  );
}

// ── RecipeDetail ──────────────────────────────────────────────────────────────
function RecipeDetail({recipe,onEdit,onDelete,onBack}) {
  return (
    <div style={{maxWidth:"680px",margin:"0 auto"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:"#7a9e7e",cursor:"pointer",fontSize:"14px",fontWeight:600,padding:"0 0 16px"}}>← Terug</button>
      <div style={{background:"#fff",borderRadius:"16px",padding:"28px",border:"1.5px solid #e8e2d9"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
          <h2 style={{margin:0,fontFamily:"'Playfair Display',Georgia,serif",fontSize:"22px",color:"#2d2a26",flex:1,marginRight:"12px"}}>{recipe.name}</h2>
          <div style={{display:"flex",gap:"8px",flexShrink:0}}>
            <button onClick={onEdit} style={{background:"#7a9e7e22",color:"#7a9e7e",border:"1.5px solid #7a9e7e55",borderRadius:"8px",padding:"6px 14px",cursor:"pointer",fontSize:"13px",fontWeight:600}}>Bewerken</button>
            <button onClick={onDelete} style={{background:"#e07a5f22",color:"#e07a5f",border:"1.5px solid #e07a5f55",borderRadius:"8px",padding:"6px 14px",cursor:"pointer",fontSize:"13px",fontWeight:600}}>Verwijderen</button>
          </div>
        </div>
        {recipe.description&&<p style={{margin:"0 0 14px",color:"#7a6f65",lineHeight:1.6}}>{recipe.description}</p>}
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"18px"}}>{recipe.tags.map(t=><Badge key={t} tag={t}/>)}</div>
        <div style={{display:"flex",gap:"20px",marginBottom:"20px",padding:"12px 16px",background:"#f7f4ef",borderRadius:"10px"}}>
          {recipe.prepTime>0&&<div><div style={{fontSize:"11px",color:"#9b8f82",fontWeight:600,textTransform:"uppercase"}}>Voorbereiding</div><div style={{fontWeight:700,color:"#2d2a26"}}>{recipe.prepTime} min</div></div>}
          {recipe.cookTime>0&&<div><div style={{fontSize:"11px",color:"#9b8f82",fontWeight:600,textTransform:"uppercase"}}>Kooktijd</div><div style={{fontWeight:700,color:"#2d2a26"}}>{recipe.cookTime} min</div></div>}
          {recipe.servings&&<div><div style={{fontSize:"11px",color:"#9b8f82",fontWeight:600,textTransform:"uppercase"}}>Porties</div><div style={{fontWeight:700,color:"#2d2a26"}}>{recipe.servings}</div></div>}
        </div>
        {recipe.ingredients?.filter(Boolean).length>0&&<><h4 style={{margin:"0 0 8px",fontFamily:"'Playfair Display',Georgia,serif",color:"#2d2a26"}}>Ingredienten</h4><ul style={{margin:"0 0 20px",paddingLeft:"20px",color:"#4a4037",lineHeight:1.9}}>{recipe.ingredients.filter(Boolean).map((x,i)=><li key={i} style={{fontSize:"15px"}}>{x}</li>)}</ul></>}
        {recipe.steps?.filter(Boolean).length>0&&<><h4 style={{margin:"0 0 8px",fontFamily:"'Playfair Display',Georgia,serif",color:"#2d2a26"}}>Stappen</h4><ol style={{margin:"0 0 20px",paddingLeft:"20px",color:"#4a4037",lineHeight:1.9}}>{recipe.steps.filter(Boolean).map((x,i)=><li key={i} style={{fontSize:"15px",marginBottom:"6px"}}>{x}</li>)}</ol></>}
        {recipe.notes&&<><h4 style={{margin:"0 0 6px",fontFamily:"'Playfair Display',Georgia,serif",color:"#2d2a26"}}>Notities</h4><p style={{margin:0,color:"#7a6f65",fontStyle:"italic",fontSize:"14px",lineHeight:1.6}}>{recipe.notes}</p></>}
      </div>
    </div>
  );
}

// ── RecipesTab ────────────────────────────────────────────────────────────────
function RecipesTab({recipes,setRecipes,openRecipeId,setOpenRecipeId}) {
  const [view,setView]=useState("list");
  const [selected,setSelected]=useState(null);
  const [editTarget,setEditTarget]=useState(null);
  const [search,setSearch]=useState("");
  const [activeFilters,setActiveFilters]=useState([]);
  const [deleteTarget,setDeleteTarget]=useState(null);

  useEffect(()=>{ if(openRecipeId){setSelected(openRecipeId);setView("detail");setOpenRecipeId(null);} },[openRecipeId]);

  const filtered=recipes.filter(r=>{
    const q=search.toLowerCase();
    const ms=!q||r.name.toLowerCase().includes(q)||r.ingredients?.some(i=>i.toLowerCase().includes(q))||r.description?.toLowerCase().includes(q);
    const mt=activeFilters.length===0||activeFilters.every(t=>r.tags.includes(t));
    return ms&&mt;
  });
  const handleSave=(recipe)=>{ setRecipes(prev=>prev.some(r=>r.id===recipe.id)?prev.map(r=>r.id===recipe.id?recipe:r):[...prev,recipe]); setView("list"); };
  const handleDelete=(id)=>{ setRecipes(p=>p.filter(x=>x.id!==id)); setDeleteTarget(null); setView("list"); };

  if(view==="detail") {
    const r=recipes.find(r=>r.id===selected); if(!r){setView("list");return null;}
    return <>{deleteTarget&&<ConfirmModal message={`"${r.name}" verwijderen?`} onConfirm={()=>handleDelete(r.id)} onCancel={()=>setDeleteTarget(null)} />}
      <RecipeDetail recipe={r} onBack={()=>setView("list")} onEdit={()=>{setEditTarget(r);setView("form");}} onDelete={()=>setDeleteTarget(r.id)} /></>;
  }
  if(view==="form") return <RecipeForm initial={editTarget} onSave={handleSave} onCancel={()=>setView("list")} />;

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"16px"}}>
        <div>
          <h2 style={{margin:0,fontFamily:"'Playfair Display',Georgia,serif",fontSize:"24px",color:"#2d2a26"}}>Receptenboek</h2>
          <p style={{margin:"3px 0 0",color:"#9b8f82",fontSize:"13px"}}>{recipes.length} recepten</p>
        </div>
        <button onClick={()=>{setEditTarget(null);setView("form");}} style={{background:"#7a9e7e",color:"#fff",border:"none",borderRadius:"10px",padding:"9px 18px",fontSize:"14px",fontWeight:700,cursor:"pointer"}}>+ Nieuw</button>
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Zoek op naam of ingredient..." style={{width:"100%",padding:"10px 14px",borderRadius:"12px",border:"1.5px solid #ddd8d0",fontSize:"14px",background:"#fff",marginBottom:"10px",boxSizing:"border-box",outline:"none"}} />
      <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"16px"}}>
        {Object.keys(BADGE_META).map(t=><TagToggle key={t} tag={t} selected={activeFilters.includes(t)} onToggle={tag=>setActiveFilters(f=>f.includes(tag)?f.filter(x=>x!==tag):[...f,tag])} />)}
        {activeFilters.length>0&&<button onClick={()=>setActiveFilters([])} style={{fontSize:"12px",color:"#9b8f82",background:"none",border:"1.5px solid #ddd8d0",borderRadius:"20px",padding:"4px 12px",cursor:"pointer"}}>Wis filters</button>}
      </div>
      {filtered.length>0
        ?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"12px"}}>
          {filtered.map(r=>(
            <div key={r.id} onClick={()=>{setSelected(r.id);setView("detail");}} style={{background:"#fff",borderRadius:"14px",padding:"18px",cursor:"pointer",border:"1.5px solid #e8e2d9",boxShadow:"0 2px 8px rgba(0,0,0,.04)",transition:"box-shadow .15s,transform .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.10)";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.04)";e.currentTarget.style.transform="none";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"6px"}}>
                <h3 style={{margin:0,fontSize:"15px",fontFamily:"'Playfair Display',Georgia,serif",color:"#2d2a26",lineHeight:1.3,flex:1}}>{r.name}</h3>
                {(r.prepTime||0)+(r.cookTime||0)>0&&<span style={{fontSize:"11px",color:"#9b8f82",whiteSpace:"nowrap",marginLeft:"8px"}}>⏱ {(r.prepTime||0)+(r.cookTime||0)} min</span>}
              </div>
              {r.description&&<p style={{margin:"0 0 10px",fontSize:"12px",color:"#7a6f65",lineHeight:1.5}}>{r.description}</p>}
              <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{r.tags.map(t=><Badge key={t} tag={t}/>)}{r._autoCreated&&<span style={{fontSize:"10px",color:"#b5a642",background:"#fff8e1",border:"1px solid #ffe082",borderRadius:"20px",padding:"2px 7px",fontWeight:600}}>nieuw</span>}</div>
            </div>
          ))}
        </div>
        :<div style={{textAlign:"center",padding:"60px 0",color:"#9b8f82"}}><div style={{fontSize:"36px",marginBottom:"12px"}}>🍽</div><p>Geen recepten gevonden.</p></div>
      }
    </div>
  );
}

// ── PantryTab ─────────────────────────────────────────────────────────────────
function PantryTab({pantry,setPantry}) {
  const [search,setSearch]=useState("");
  const [editItem,setEditItem]=useState(null);
  const [newName,setNewName]=useState("");
  const [newQty,setNewQty]=useState(1);
  const [newUnit,setNewUnit]=useState("st");
  const [newCat,setNewCat]=useState("Overig");
  const [deleteTarget,setDeleteTarget]=useState(null);

  const cats=[...new Set(pantry.map(p=>p.cat))].sort();
  const filtered=search?pantry.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())):pantry;

  const updateQty=(id,delta)=>setPantry(prev=>prev.map(p=>p.id===id?{...p,qty:Math.max(0,p.qty+delta)}:p));
  const addItem=()=>{
    if(!newName.trim())return;
    setPantry(prev=>[...prev,{id:genId(),name:newName.trim(),qty:newQty,unit:newUnit,cat:newCat}]);
    setNewName(""); setNewQty(1);
  };
  const deleteItem=(id)=>{ setPantry(prev=>prev.filter(p=>p.id!==id)); setDeleteTarget(null); };

  const grouped=cats.reduce((acc,cat)=>{
    const items=filtered.filter(p=>p.cat===cat);
    if(items.length>0)acc[cat]=items;
    return acc;
  },{});
  if(search&&filtered.length>0)grouped["Zoekresultaten"]=filtered;

  return (
    <div>
      {deleteTarget&&<ConfirmModal message="Item verwijderen uit voorraad?" onConfirm={()=>deleteItem(deleteTarget)} onCancel={()=>setDeleteTarget(null)} />}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"16px"}}>
        <div>
          <h2 style={{margin:0,fontFamily:"'Playfair Display',Georgia,serif",fontSize:"24px",color:"#2d2a26"}}>Voorraadkast</h2>
          <p style={{margin:"3px 0 0",color:"#9b8f82",fontSize:"13px"}}>{pantry.length} items</p>
        </div>
      </div>

      {/* Add new item */}
      <div style={{background:"#fff",borderRadius:"12px",padding:"16px",marginBottom:"16px",border:"1.5px solid #e8e2d9"}}>
        <p style={{margin:"0 0 10px",fontWeight:600,fontSize:"13px",color:"#4a4037"}}>Item toevoegen</p>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
          <input value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addItem()} placeholder="Naam (bijv. Kokosmelk)"
            style={{flex:2,minWidth:"140px",padding:"7px 10px",borderRadius:"8px",border:"1.5px solid #ddd8d0",fontSize:"14px",outline:"none"}} />
          <input type="number" value={newQty} onChange={e=>setNewQty(Number(e.target.value))} min={0}
            style={{width:"60px",padding:"7px 10px",borderRadius:"8px",border:"1.5px solid #ddd8d0",fontSize:"14px",outline:"none"}} />
          <input value={newUnit} onChange={e=>setNewUnit(e.target.value)} placeholder="eenheid"
            style={{width:"70px",padding:"7px 10px",borderRadius:"8px",border:"1.5px solid #ddd8d0",fontSize:"14px",outline:"none"}} />
          <input value={newCat} onChange={e=>setNewCat(e.target.value)} placeholder="Categorie"
            style={{flex:1,minWidth:"100px",padding:"7px 10px",borderRadius:"8px",border:"1.5px solid #ddd8d0",fontSize:"14px",outline:"none"}} />
          <button onClick={addItem} style={{background:"#7a9e7e",color:"#fff",border:"none",borderRadius:"8px",padding:"7px 18px",fontSize:"14px",fontWeight:700,cursor:"pointer"}}>+</button>
        </div>
      </div>

      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Zoek in voorraad..."
        style={{width:"100%",padding:"10px 14px",borderRadius:"12px",border:"1.5px solid #ddd8d0",fontSize:"14px",background:"#fff",marginBottom:"14px",boxSizing:"border-box",outline:"none"}} />

      {(search?[{"Zoekresultaten":filtered}]:[{}]).map(()=>
        (search?[{cat:"Zoekresultaten",items:filtered}]:cats.map(cat=>({cat,items:pantry.filter(p=>p.cat===cat)}))).map(({cat,items})=>(
          items.length===0?null:
          <div key={cat} style={{marginBottom:"16px"}}>
            <h4 style={{margin:"0 0 8px",fontSize:"12px",fontWeight:700,color:"#9b8f82",textTransform:"uppercase",letterSpacing:".05em"}}>{cat}</h4>
            <div style={{background:"#fff",borderRadius:"12px",border:"1.5px solid #e8e2d9",overflow:"hidden"}}>
              {items.map((item,i)=>(
                <div key={item.id} style={{display:"flex",alignItems:"center",padding:"10px 14px",borderBottom:i<items.length-1?"1px solid #f5f0ea":"none",gap:"10px"}}>
                  <span style={{flex:1,fontSize:"14px",color:item.qty===0?"#c0b8b0":"#2d2a26",textDecoration:item.qty===0?"line-through":"none"}}>{item.name}</span>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                    <button onClick={()=>updateQty(item.id,-1)} style={{background:"#f0ece6",border:"none",borderRadius:"6px",width:"24px",height:"24px",cursor:"pointer",fontWeight:700,color:"#7a6f65",fontSize:"14px",lineHeight:1}}>-</button>
                    <span style={{fontSize:"13px",fontWeight:600,color:"#2d2a26",minWidth:"40px",textAlign:"center"}}>{item.qty} {item.unit}</span>
                    <button onClick={()=>updateQty(item.id,1)} style={{background:"#f0ece6",border:"none",borderRadius:"6px",width:"24px",height:"24px",cursor:"pointer",fontWeight:700,color:"#7a6f65",fontSize:"14px",lineHeight:1}}>+</button>
                  </div>
                  <button onClick={()=>setDeleteTarget(item.id)} style={{background:"none",border:"none",color:"#d4b8a0",cursor:"pointer",fontSize:"16px",padding:"0 2px",lineHeight:1}}>×</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ── Baby list ─────────────────────────────────────────────────────────────────
function BabyList({items,onChange}) {
  const [newItem,setNewItem]=useState("");
  const addItem=()=>{const t=newItem.trim();if(!t)return;onChange([...items,{id:genId(),text:t,done:false}]);setNewItem("");};
  const toggle=(id)=>onChange(items.map(i=>i.id===id?{...i,done:!i.done}:i));
  const remove=(id)=>onChange(items.filter(i=>i.id!==id));
  return (
    <div style={{background:"#fff",borderRadius:"14px",border:"1.5px solid #f5e6d3",padding:"16px",marginBottom:"14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}}>
        <span style={{fontSize:"18px"}}>👶</span>
        <h3 style={{margin:0,fontSize:"15px",fontWeight:700,color:"#8B5E3C",fontFamily:"'Playfair Display',Georgia,serif"}}>Louis — boodschappen</h3>
        <span style={{marginLeft:"auto",fontSize:"12px",color:"#b0a89e"}}>{items.filter(i=>i.done).length}/{items.length}</span>
      </div>
      {items.map(item=>(
        <div key={item.id} style={{display:"flex",alignItems:"center",gap:"8px",padding:"5px 0",borderBottom:"1px solid #fdf0e6"}}>
          <button onClick={()=>toggle(item.id)} style={{width:"20px",height:"20px",borderRadius:"50%",border:`2px solid ${item.done?"#c8a97a":"#ddd8d0"}`,background:item.done?"#c8a97a":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
            {item.done&&<span style={{color:"#fff",fontSize:"11px",fontWeight:700}}>✓</span>}
          </button>
          <span style={{flex:1,fontSize:"14px",color:item.done?"#b0a89e":"#3a3530",textDecoration:item.done?"line-through":"none"}}>{item.text}</span>
          <button onClick={()=>remove(item.id)} style={{background:"none",border:"none",color:"#d4b8a0",cursor:"pointer",fontSize:"16px",padding:"0 2px",lineHeight:1}}>×</button>
        </div>
      ))}
      <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
        <input value={newItem} onChange={e=>setNewItem(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addItem()} placeholder="Voeg item toe..."
          style={{flex:1,padding:"7px 10px",borderRadius:"8px",border:"1.5px solid #f0dcc8",fontSize:"13px",outline:"none",background:"#fffaf6"}} />
        <button onClick={addItem} style={{background:"#c8a97a",color:"#fff",border:"none",borderRadius:"8px",padding:"7px 14px",cursor:"pointer",fontSize:"13px",fontWeight:700}}>+</button>
      </div>
    </div>
  );
}

// ── Shopping view (inside planner) ────────────────────────────────────────────
function ShoppingPanel({week,recipes,pantry,setPantry,formatWeek,currentMonday}) {
  const items=[];
  DAYS.forEach(day=>{
    const meal=week[day]; if(!meal)return;
    if(meal.recipeId){
      const r=recipes.find(r=>r.id===meal.recipeId);
      if(r)r.ingredients?.filter(Boolean).forEach(ing=>{
        const matches=pantryMatch(ing,pantry);
        items.push({day,ing,inStock:matches.length>0,pantryMatches:matches,recipeId:r.id});
      });
    } else if(meal.text&&!["NVT","VOORRAAD",""].includes(meal.text.toUpperCase())) {
      items.push({day,ing:meal.text,inStock:false,pantryMatches:[],recipeId:null});
    }
  });

  const toShop=items.filter(i=>!i.inStock);
  const inStock=items.filter(i=>i.inStock);

  const usePantryItem=(pantryId)=>{
    setPantry(prev=>prev.map(p=>p.id===pantryId?{...p,qty:Math.max(0,p.qty-1)}:p));
  };

  return (
    <div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"14px",border:"1.5px solid #e0e8e4"}}>
      <h3 style={{margin:"0 0 16px",fontFamily:"'Playfair Display',Georgia,serif",color:"#2d2a26",fontSize:"18px"}}>🛒 Boodschappen — {formatWeek(currentMonday)}</h3>

      {items.length===0&&<p style={{color:"#9b8f82",fontStyle:"italic",fontSize:"14px"}}>Geen maaltijden met recepten gepland.</p>}

      {toShop.length>0&&<>
        <p style={{fontWeight:700,fontSize:"13px",color:"#e07a5f",marginBottom:"8px"}}>🛒 Nog te kopen ({toShop.length})</p>
        {toShop.map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderBottom:"1px solid #f5f0ea"}}>
            <span style={{fontSize:"13px",color:"#3a3530",flex:1}}>{item.ing}</span>
            <span style={{fontSize:"11px",color:"#b0a89e"}}>{item.day}</span>
          </div>
        ))}
      </>}

      {inStock.length>0&&<>
        <p style={{fontWeight:700,fontSize:"13px",color:"#7a9e7e",margin:"16px 0 8px"}}>✓ In voorraad ({inStock.length})</p>
        {inStock.map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderBottom:"1px solid #f5f0ea"}}>
            <span style={{fontSize:"13px",color:"#7a9e7e",flex:1}}>✓ {item.ing}</span>
            <span style={{fontSize:"11px",color:"#b0a89e"}}>{item.day}</span>
            <div style={{display:"flex",gap:"4px"}}>
              {item.pantryMatches.map(pm=>(
                <button key={pm.id} onClick={()=>usePantryItem(pm.id)}
                  style={{fontSize:"11px",padding:"2px 8px",borderRadius:"20px",cursor:"pointer",background:"#e8f4f0",border:"1px solid #7a9e7e55",color:"#2d4a3e",fontWeight:600}}>
                  -{pm.name} ({pm.qty} {pm.unit})
                </button>
              ))}
            </div>
          </div>
        ))}
        <p style={{fontSize:"11px",color:"#b0a89e",marginTop:"8px",fontStyle:"italic"}}>Tik op een voorraaditem om de hoeveelheid te verminderen.</p>
      </>}
    </div>
  );
}

// ── PlannerTab ────────────────────────────────────────────────────────────────
function PlannerTab({recipes,setRecipes,weeks,setWeeks,babyLists,setBabyLists,pantry,setPantry,onOpenRecipe}) {
  const [currentMonday,setCurrentMonday]=useState(()=>getMondayOf(new Date()));
  const [editDay,setEditDay]=useState(null);
  const [ingredientDay,setIngredientDay]=useState(null);
  const [copySource,setCopySource]=useState(null);
  const [showShopping,setShowShopping]=useState(false);
  const [showHistory,setShowHistory]=useState(false);
  const [pendingRecipe,setPendingRecipe]=useState(null);

  const key=weekKey(currentMonday);
  const week=weeks[key]||EMPTY_WEEK();
  const babyItems=babyLists[key]||[];
  const setBabyItems=(items)=>setBabyLists(prev=>({...prev,[key]:items}));

  const setMeal=(day,field,value)=>setWeeks(prev=>({...prev,[key]:{...(prev[key]||EMPTY_WEEK()),[day]:{...(prev[key]?.[day]||{text:"",recipeId:null}),[field]:value}}}));
  const applyMeal=(day,meal)=>setWeeks(prev=>({...prev,[key]:{...(prev[key]||EMPTY_WEEK()),[day]:meal}}));
  const goWeek=(d)=>{const m=new Date(currentMonday);m.setDate(m.getDate()+d*7);setCurrentMonday(m);};

  const handleCloseDay=(day)=>{
    const meal=week[day]||{text:"",recipeId:null};
    const text=meal.text.trim();
    if(text&&!meal.recipeId&&!["NVT","VOORRAAD",""].includes(text.toUpperCase())){
      const exists=recipes.find(r=>r.name.toLowerCase()===text.toLowerCase());
      if(!exists){setPendingRecipe({day,text});return;}
    }
    setEditDay(null);
  };

  const confirmAutoCreate=()=>{
    if(!pendingRecipe)return;
    const nr={id:genId(),name:pendingRecipe.text,tags:[],prepTime:"",cookTime:"",servings:2,description:"",ingredients:[""],steps:[""],notes:"",_autoCreated:true};
    setRecipes(prev=>[...prev,nr]);
    setMeal(pendingRecipe.day,"recipeId",nr.id);
    setPendingRecipe(null); setEditDay(null);
  };

  const allWeekKeys=Object.keys(weeks).sort().reverse();
  const isCurrentWeek=weekKey(getMondayOf(new Date()))===key;

  return (
    <div>
      <div style={{background:"#2d4a3e",borderRadius:"14px",padding:"16px 20px",marginBottom:"16px",color:"#fff"}}>
        <div style={{display:"flex",gap:"8px",marginBottom:"14px"}}>
          <button onClick={()=>{setShowHistory(!showHistory);setShowShopping(false);}} style={{background:showHistory?"#fff":"#ffffff22",color:showHistory?"#2d4a3e":"#fff",border:"none",borderRadius:"8px",padding:"5px 12px",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>📋 Geschiedenis</button>
          <button onClick={()=>{setShowShopping(!showShopping);setShowHistory(false);}} style={{background:showShopping?"#fff":"#ffffff22",color:showShopping?"#2d4a3e":"#fff",border:"none",borderRadius:"8px",padding:"5px 12px",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>🛒 Boodschappen</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <button onClick={()=>goWeek(-1)} style={{background:"#ffffff22",border:"none",color:"#fff",borderRadius:"8px",padding:"6px 14px",cursor:"pointer",fontSize:"18px"}}>&#8249;</button>
          <div style={{flex:1,textAlign:"center"}}>
            <div style={{fontWeight:700,fontSize:"16px"}}>{formatWeek(currentMonday)}</div>
            {isCurrentWeek&&<div style={{fontSize:"11px",opacity:.7,marginTop:"2px"}}>Deze week</div>}
          </div>
          <button onClick={()=>goWeek(1)} style={{background:"#ffffff22",border:"none",color:"#fff",borderRadius:"8px",padding:"6px 14px",cursor:"pointer",fontSize:"18px"}}>&#8250;</button>
          {!isCurrentWeek&&<button onClick={()=>setCurrentMonday(getMondayOf(new Date()))} style={{background:"#7a9e7e",border:"none",color:"#fff",borderRadius:"8px",padding:"6px 10px",cursor:"pointer",fontSize:"12px",fontWeight:600}}>Nu</button>}
        </div>
      </div>

      {pendingRecipe&&(
        <div style={{background:"#fff8e1",border:"1.5px solid #ffe082",borderRadius:"12px",padding:"16px 18px",marginBottom:"14px"}}>
          <p style={{margin:"0 0 12px",fontSize:"14px",color:"#5a4000"}}><strong>{pendingRecipe.text}</strong> staat nog niet in je receptenboek. Aanmaken?</p>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={confirmAutoCreate} style={{background:"#f6c90e",border:"none",borderRadius:"8px",padding:"7px 18px",fontWeight:700,fontSize:"13px",cursor:"pointer",color:"#3a2c00"}}>Ja, aanmaken</button>
            <button onClick={()=>{setPendingRecipe(null);setEditDay(null);}} style={{background:"none",border:"1.5px solid #ddd8d0",borderRadius:"8px",padding:"7px 14px",fontSize:"13px",cursor:"pointer",color:"#7a6f65"}}>Overslaan</button>
          </div>
        </div>
      )}

      {showShopping&&<ShoppingPanel week={week} recipes={recipes} pantry={pantry} setPantry={setPantry} formatWeek={formatWeek} currentMonday={currentMonday} />}

      {showHistory&&(
        <div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"14px",border:"1.5px solid #e0e8e4"}}>
          <h3 style={{margin:"0 0 14px",fontFamily:"'Playfair Display',Georgia,serif",color:"#2d2a26",fontSize:"18px"}}>📋 Wekenoverzicht</h3>
          {allWeekKeys.length===0&&<p style={{color:"#9b8f82",fontStyle:"italic",fontSize:"14px"}}>Nog geen weken.</p>}
          {allWeekKeys.map(wk=>{
            const mon=new Date(wk);
            const filled=Object.values(weeks[wk]||{}).filter(m=>m.text||m.recipeId).length;
            const isActive=wk===key;
            return <div key={wk} onClick={()=>{setCurrentMonday(mon);setShowHistory(false);}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",borderRadius:"9px",marginBottom:"5px",cursor:"pointer",background:isActive?"#2d4a3e11":"#f7f4ef",border:isActive?"1.5px solid #2d4a3e44":"1.5px solid transparent"}}>
              <span style={{fontWeight:isActive?700:500,color:"#2d2a26",fontSize:"14px"}}>{formatWeek(mon)}</span>
              <span style={{fontSize:"12px",color:"#9b8f82"}}>{filled}/7 dagen</span>
            </div>;
          })}
        </div>
      )}

      {copySource&&(
        <div style={{background:"#e8f4f0",border:"1.5px solid #7a9e7e",borderRadius:"12px",padding:"12px 16px",marginBottom:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:"13px",color:"#2d4a3e",fontWeight:600}}>{week[copySource.day]?.text||recipes.find(r=>r.id===week[copySource.day]?.recipeId)?.name||"?"} — tik dag om te plakken</span>
          <button onClick={()=>setCopySource(null)} style={{background:"none",border:"none",color:"#7a9e7e",cursor:"pointer",fontSize:"20px",lineHeight:1}}>×</button>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"}}>
        {DAYS.map((day,i)=>{
          const meal=week[day]||{text:"",recipeId:null};
          const isEditing=editDay===day;
          const showIngredients=ingredientDay===day;
          const linkedRecipe=recipes.find(r=>r.id===meal.recipeId);
          const dayDate=new Date(currentMonday); dayDate.setDate(dayDate.getDate()+i);
          const isToday=new Date().toDateString()===dayDate.toDateString();
          const isCopyTarget=copySource&&copySource.day!==day;
          const isCopySource=copySource?.day===day;
          const isSpecial=meal.text==="VOORRAAD"||meal.text==="NVT";
          const hasMeal=!!(meal.text||meal.recipeId);

          return (
            <div key={day} style={{background:"#fff",borderRadius:"12px",overflow:"hidden",border:isToday?"2px solid #2d4a3e":isCopySource?"2px solid #7a9e7e":"1.5px solid #e0e8e4"}}>
              <div style={{display:"flex",alignItems:"center",padding:"11px 14px",gap:"10px",cursor:isCopyTarget?"copy":"pointer",background:isCopyTarget?"#f0faf5":"#fff"}}
                onClick={()=>{
                  if(copySource){if(copySource.day!==day){applyMeal(day,{...(week[copySource.day]||{text:"",recipeId:null})});setCopySource(null);}return;}
                  if(!isEditing&&hasMeal&&!isSpecial){setIngredientDay(showIngredients?null:day);return;}
                  setIngredientDay(null); setEditDay(isEditing?null:day);
                }}>
                <div style={{minWidth:"84px"}}>
                  <div style={{fontWeight:700,fontSize:"13px",color:isToday?"#2d4a3e":"#2d2a26"}}>{day}</div>
                  <div style={{fontSize:"11px",color:"#b0a89e"}}>{dayDate.getDate()}/{dayDate.getMonth()+1}</div>
                </div>
                <div style={{flex:1,overflow:"hidden"}}>
                  {isCopyTarget
                    ?<span style={{fontSize:"13px",color:"#7a9e7e",fontStyle:"italic"}}>Tik om hier te plakken...</span>
                    :linkedRecipe
                      ?<div><span style={{fontSize:"14px",color:"#2d4a3e",fontWeight:600}}>📖 {linkedRecipe.name}</span>
                        <div style={{display:"flex",gap:"4px",marginTop:"3px",flexWrap:"wrap"}}>{linkedRecipe.tags.slice(0,3).map(t=><Badge key={t} tag={t}/>)}</div></div>
                      :meal.text
                        ?<span style={{fontSize:"14px",color:meal.text==="VOORRAAD"?"#5a8fa3":meal.text==="NVT"?"#b0a89e":"#3a3530"}}>{meal.text}</span>
                        :<span style={{fontSize:"13px",color:"#c0b8b0",fontStyle:"italic"}}>Nog niet ingevuld</span>
                  }
                </div>
                <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
                  {hasMeal&&!isCopyTarget&&<button onClick={e=>{e.stopPropagation();setCopySource(isCopySource?null:{weekKey:key,day});}} style={{background:isCopySource?"#7a9e7e":"#f0ece6",border:"none",borderRadius:"6px",padding:"3px 8px",cursor:"pointer",fontSize:"13px",color:isCopySource?"#fff":"#7a6f65"}}>📋</button>}
                  <button onClick={e=>{e.stopPropagation();setIngredientDay(null);setEditDay(isEditing?null:day);}} style={{background:isEditing?"#2d4a3e":"#f0ece6",border:"none",borderRadius:"6px",padding:"3px 8px",cursor:"pointer",fontSize:"13px",color:isEditing?"#fff":"#7a6f65"}}>✏️</button>
                </div>
              </div>

              {showIngredients&&linkedRecipe&&<IngredientPanel recipe={linkedRecipe} pantry={pantry} onClose={()=>setIngredientDay(null)} onOpenRecipe={()=>{setIngredientDay(null);onOpenRecipe(linkedRecipe.id);}} />}
              {showIngredients&&!linkedRecipe&&meal.text&&!isSpecial&&<div style={{borderTop:"1px solid #f0ece6",background:"#fafaf8",padding:"12px 16px"}}><p style={{margin:0,fontSize:"13px",color:"#b0a89e",fontStyle:"italic"}}>Koppel een recept om de ingredienten te zien.</p></div>}

              {isEditing&&(
                <div style={{borderTop:"1px solid #f0ece6",padding:"12px 14px",background:"#fafaf8"}}>
                  <MealInput value={meal.text} onChange={v=>setMeal(day,"text",v)} recipes={recipes} onSelectRecipe={r=>{setMeal(day,"recipeId",r.id);setMeal(day,"text",r.name);}} />
                  <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                    {["VOORRAAD","NVT"].map(s=>(
                      <button key={s} onClick={()=>{setMeal(day,"text",meal.text===s?"":s);setMeal(day,"recipeId",null);}}
                        style={{fontSize:"12px",padding:"4px 11px",borderRadius:"20px",cursor:"pointer",border:"1.5px solid #ddd8d0",background:meal.text===s?"#ddd8d0":"transparent",color:"#7a6f65",fontWeight:600}}>{s}</button>
                    ))}
                    <button onClick={()=>{setMeal(day,"text","");setMeal(day,"recipeId",null);}} style={{fontSize:"12px",padding:"4px 11px",borderRadius:"20px",cursor:"pointer",border:"1.5px solid #f0b8b0",background:"transparent",color:"#c07a70",fontWeight:600}}>Wissen</button>
                    <button onClick={()=>handleCloseDay(day)} style={{fontSize:"12px",padding:"4px 14px",borderRadius:"20px",cursor:"pointer",border:"none",background:"#2d4a3e",color:"#fff",fontWeight:600,marginLeft:"auto"}}>Opslaan</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <BabyList items={babyItems} onChange={setBabyItems} />
      <p style={{textAlign:"center",fontSize:"12px",color:"#c0b8b0",marginTop:"4px"}}>Tik op een maaltijd voor ingredienten · ✏️ bewerken · 📋 kopiëren</p>
    </div>
  );
}

// ── App shell ─────────────────────────────────────────────────────────────────
// Storage helpers — window.storage with sessionStorage fallback
const storage = {
  async get(key) {
    // Try window.storage (persistent across sessions)
    try {
      if(window.storage && typeof window.storage.get==="function") {
        const r = await window.storage.get(key);
        if(r && r.value) return r;
      }
    } catch(e){}
    // Fallback: sessionStorage (within tab)
    try {
      const v = sessionStorage.getItem(key);
      return v ? {value:v} : null;
    } catch(e){ return null; }
  },
  async set(key, value) {
    let persistent = false;
    // Try window.storage first
    try {
      if(window.storage && typeof window.storage.set==="function") {
        await window.storage.set(key, value);
        persistent = true;
      }
    } catch(e){}
    // Always also write to sessionStorage as backup
    try { sessionStorage.setItem(key, value); } catch(e){}
    return persistent;
  }
};

export default function App() {
  const [tab,setTab]=useState("planner");
  const [openRecipeId,setOpenRecipeId]=useState(null);
  const [loaded,setLoaded]=useState(false);
  const [saveStatus,setSaveStatus]=useState(null);
  const [recipes,setRecipes]=useState(INITIAL_RECIPES);
  const [weeks,setWeeks]=useState(INITIAL_WEEKS);
  const [babyLists,setBabyLists]=useState({});
  const [pantry,setPantry]=useState(INITIAL_PANTRY);

  // Load on mount
  useEffect(()=>{
    (async()=>{
      try {
        const r=await storage.get("app-data");
        if(r && r.value){
          const d=JSON.parse(r.value);
          if(d.recipes)setRecipes(d.recipes);
          if(d.weeks)setWeeks(d.weeks);
          if(d.babyLists)setBabyLists(d.babyLists);
          if(d.pantry)setPantry(d.pantry);
        }
      } catch(e){}
      setLoaded(true);
    })();
  },[]);

  // Auto-save with debounce
  const [persistent,setPersistent]=useState(false);
  useEffect(()=>{
    if(!loaded) return;
    setSaveStatus("saving");
    const t=setTimeout(async()=>{
      const ok=await storage.set("app-data", JSON.stringify({recipes,weeks,babyLists,pantry}));
      setPersistent(ok);
      setSaveStatus("saved");
      setTimeout(()=>setSaveStatus(null),3000);
    }, 800);
    return ()=>clearTimeout(t);
  },[recipes,weeks,babyLists,pantry,loaded]);

  if(!loaded) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f0f4f0",fontFamily:"'Inter',system-ui,sans-serif"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:"32px",marginBottom:"12px"}}>🍽</div>
        <p style={{fontSize:"14px",color:"#9b8f82"}}>Laden...</p>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#f0f4f0",fontFamily:"'Inter',system-ui,sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{background:"#fff",borderBottom:"1.5px solid #e8e2d9",position:"sticky",top:0,zIndex:10}}>
        <div style={{maxWidth:"760px",margin:"0 auto",display:"flex",alignItems:"center"}}>
          {[["planner","🗓"],["recepten","📖"],["voorraad","🏪"]].map(([t,label])=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"14px 0",fontSize:"20px",border:"none",background:"none",cursor:"pointer",color:tab===t?"#2d4a3e":"#9b8f82",borderBottom:tab===t?"3px solid #2d4a3e":"3px solid transparent",transition:"all .15s"}}>{label}</button>
          ))}
          <div style={{padding:"0 12px"}}><SaveStatus status={saveStatus} persistent={persistent}/></div>
        </div>
      </div>
      <div style={{maxWidth:"760px",margin:"0 auto",padding:"20px 16px"}}>
        {tab==="planner"&&<PlannerTab recipes={recipes} setRecipes={setRecipes} weeks={weeks} setWeeks={setWeeks} babyLists={babyLists} setBabyLists={setBabyLists} pantry={pantry} setPantry={setPantry} onOpenRecipe={(id)=>{setOpenRecipeId(id);setTab("recepten");}} />}
        {tab==="recepten"&&<RecipesTab recipes={recipes} setRecipes={setRecipes} openRecipeId={openRecipeId} setOpenRecipeId={setOpenRecipeId} />}
        {tab==="voorraad"&&<PantryTab pantry={pantry} setPantry={setPantry} />}
      </div>
    </div>
  );
}
