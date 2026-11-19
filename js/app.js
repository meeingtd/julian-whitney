/* Portfolio v2: the page. The desk scene (desk.js) and the painted scenes (painted/*.js) are layers under it; this file decides what they show.
   Views: home (the desk), about (the globe followed along its line), place (a painted scene at this minute), work (rows).
   One curve, three durations: 200ms exits, 500ms entries, 900ms for the camera. */
const $=s=>document.querySelector(s),el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),lerp=(a,b,t)=>a+(b-a)*t,sstep=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
const ease=t=>1-Math.pow(1-clamp(t),4);
const D2R=Math.PI/180;

/* ---------- the present ---------- */
/* ?t=2026-11-18T23:10:00Z fakes the clock, for checking noon, dusk and night */
const FAKE=new URLSearchParams(location.search).get("t"),T0=FAKE?Date.parse(FAKE)-performance.now():0;
const now=()=>FAKE?new Date(T0+performance.now()):new Date();
const clock=(tz,d=now())=>new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit",timeZone:tz}).format(d).toLowerCase().replace(/ /g," ");
/* where the sun is overhead right now (NOAA's short formulas): [latitude, longitude] in degrees */
function subsolar(d=now()){
  const start=Date.UTC(d.getUTCFullYear(),0,1),h=d.getUTCHours()+d.getUTCMinutes()/60+d.getUTCSeconds()/3600,doy=Math.floor((d-start)/864e5);
  const g=2*Math.PI/365*(doy+(h-12)/24);
  const eq=229.18*(.000075+.001868*Math.cos(g)-.032077*Math.sin(g)-.014615*Math.cos(2*g)-.040849*Math.sin(2*g));
  const dec=.006918-.399912*Math.cos(g)+.070257*Math.sin(g)-.006758*Math.cos(2*g)+.000907*Math.sin(2*g)-.002697*Math.cos(3*g)+.00148*Math.sin(3*g);
  let lon=-15*(h-12+eq/60);lon=((lon+540)%360)-180;return[dec/D2R,lon];
}
/* how high the sun stands at a place, in degrees (below zero is night) */
function sunHeight([lat,lon],[sl,so]=subsolar()){return Math.asin(Math.sin(lat*D2R)*Math.sin(sl*D2R)+Math.cos(lat*D2R)*Math.cos(sl*D2R)*Math.cos((lon-so)*D2R))/D2R;}

/* ---------- content: Julian's own lines, as approved (JULIAN.md). Names, times and notes are plain labels. ---------- */
const GEO={concord:[42.46,-71.35],doha:[25.29,51.53],wake:[36.13,-80.28],barcelona:[41.39,2.17],boston:[42.36,-71.06],stamford:[41.05,-73.54],newyork:[40.71,-74.01],miami:[25.76,-80.19]};
const TZ={concord:"America/New_York",doha:"Asia/Qatar",wake:"America/New_York",barcelona:"Europe/Madrid",boston:"America/New_York",stamford:"America/New_York",newyork:"America/New_York",miami:"America/New_York"};
/* painted scenes, in the order their files load. s: the scene's own clock; z: how far back the camera stands (from iteration 1's camera path) */
const SCENES={
  walden:{i:0,s:[.18,.222],z:[10,8.6],night:.5},tennis:{i:1,s:[.222,.2885],z:[8.6,7.4]},gate:{i:2,s:[.42,.46],z:[11,9.4]},
  dunes:{i:3,s:[.485,.56],path:[[0,.35,17],[0,-.5,3],[0,.55,1],[0,-.3,-13]],night:.75},
  wfu:{i:4,s:[.68,.73],z:[10.5,8.6],night:.6},bcn:{i:5,s:[.8,.84],z:[10.5,9]},boston:{i:6,s:[.296,.345],z:[9.4,8.4],night:.3},ny:{i:7,s:[.917,.958],z:[10,9.5],night:.3}};
const STOPS=[
  {id:"concord",name:"Concord, Massachusetts",at:["concord"],scenes:[["walden","Walden Pond","I was born in Concord, Massachusetts. I love my roots here, and we moved all around the state."]]},
  {id:"doha",name:"Doha, Qatar",at:["doha"],work:["games"],scenes:[
    ["gate","Lycée Bonaparte","Around 7, we moved to Doha, Qatar, for four years. There was a lot of traveling, and I got to see the world. School was Lycée Bonaparte, fully French, every day. I’m still fluent."],
    ["dunes","The dunes","We would take the cars out into the dunes a lot, and I started driving super young out there."]]},
  {id:"concord-again",name:"Concord, again",at:["concord"],scenes:[["tennis","The tennis court","At 11, I came back to Concord. People were a little different, and I had to get used to it."]]},
  {id:"wake-forest",name:"Wake Forest, North Carolina",at:["wake"],work:["validation"],scenes:[["wfu","Wake Forest","Then four years in North Carolina at Wake Forest: economics, with a minor in entrepreneurship."]]},
  {id:"barcelona",name:"Barcelona",at:["barcelona"],work:["hexcel"],scenes:[["bcn","Barcelona","In fall 2024 I spent a semester abroad in Barcelona, studying international finance and marketing."]]},
  {id:"boston",name:"Boston",at:["boston"],work:["scoreboard","usage","motion"],note:"Davis Square Capital.",scenes:[["boston","Boston",""]]},
  {id:"stamford",name:"Stamford, Connecticut",at:["stamford"],work:["homebase"],note:"Third of 12 at the AI Collective Vibe2Pitch on 21 October 2026, with Home Base.",scenes:[]},
  {id:"next",name:"Next: New York, Boston or Miami",at:["newyork","boston","miami"],work:["homebase"],note:"Not decided.",scenes:[["ny","New York",""]]}];
const SHORT={concord:"Concord",doha:"Doha",wake:"Wake Forest",barcelona:"Barcelona",boston:"Boston",stamford:"Stamford",newyork:"New York",miami:"Miami"};
const PROJECTS=[
  {id:"homebase",title:"Home Base",line:"3rd place, AI Collective hackathon. A 90-day relocation program and app, for people moving to Stamford, especially the partner who moves for someone else’s job. A chief-of-staff agent and seven specialists.",video:"homebase"},
  {id:"scoreboard",title:"Recruiting Scoreboard",line:"A personal operating system for a job search, kept current by six scheduled AI agents.",video:"scoreboard"},
  {id:"hexcel",title:"Hexcel (NYSE: HXL) research suite",line:"An industry deep dive, an integrated model and a 20-page initiation, all making one call.",video:"hexcel"},
  {id:"validation",title:"Idea Validation",line:"A repeatable process that tests any business idea against real customer evidence before anything gets built."},
  {id:"usage",title:"Claude Usage Tracker",line:"A local dashboard of Claude Code token use by project and day.",video:"usage"},
  {id:"motion",title:"Motion Studio",line:"A render studio where Claude writes motion graphics as code, then grades its own frames until they pass.",video:"motion"},
  {id:"games",title:"Three browser games",line:"Three small games, each a single page that runs in the browser with nothing to install.",links:[["Capital Quest","games/capital-quest/"],["Sky Hopper","games/sky-hopper/"],["Tank Battle","games/tank-battle/"]]}];
const stopBy=id=>STOPS.find(s=>s.id===id),projBy=id=>PROJECTS.find(p=>p.id===id);

/* ---------- build the lists ---------- */
const workLinks=s=>(s.work||[]).map(id=>`<a class="go" href="#/work/${id}">${projBy(id).title}</a>`).join("");
STOPS.forEach(s=>{
  const li=el("li");li.id="stop-"+s.id;li.dataset.id=s.id;
  const lines=s.scenes.map(c=>c[2]).filter(Boolean).map(t=>`<p>${t}</p>`).join("")+(s.note?`<p>${s.note}</p>`:"");
  const enter=s.scenes.length?`<a class="go" href="#/place/${s.id}">Step into ${s.scenes[0][1].replace(/^The /,"the ")}</a>`:"";
  li.innerHTML=`<h2><a href="#/about/${s.id}">${s.name}</a></h2><p class="when"></p>${lines}<p class="ways">${enter}${workLinks(s)}</p>`;
  $("#stops").append(li);});
PROJECTS.forEach(p=>{
  const li=el("li");li.id="project-"+p.id;
  const still=`<img src="media/stills/${p.id}-1.jpg" alt="${p.title}, a still from the demo" width="960" height="600" loading="lazy" decoding="async">`;
  const media=p.video?`<button type="button" class="media" data-video="media/${p.video}.mp4" aria-label="Play the ${p.title} demo">${still}</button>`:`<div class="media">${still}</div>`;
  const links=p.links?`<p class="ways">${p.links.map(([t,h])=>`<a class="go" href="${h}">Play ${t}</a>`).join("")}</p>`:p.video?`<p class="ways"><button type="button" class="go" data-play>Play the demo</button></p>`:"";
  li.innerHTML=`${media}<div class="text"><h2>${p.title}</h2><p>${p.line}</p>${links}</div>`;
  const play=()=>{const m=li.querySelector(".media[data-video]");if(!m)return;const v=el("video","media");v.src=m.dataset.video;v.controls=true;v.playsInline=true;v.setAttribute("aria-label",p.title+" demo");m.replaceWith(v);v.play().catch(()=>{});v.focus();li.querySelector("[data-play]")?.closest(".ways").remove();};
  li.querySelectorAll(".media[data-video],[data-play]").forEach(b=>b.addEventListener("click",play));
  $("#projects").append(li);});

/* marks on the globe: one per point on Earth */
const MARKS=Object.keys(GEO).map(k=>{
  const stops=STOPS.filter(s=>s.at.includes(k)).map(s=>s.id),home=["concord","doha","wake","barcelona","miami"].includes(k);
  const b=el("a","mark"+(["wake","miami"].includes(k)?" l":""),`<i></i><b>${SHORT[k]}</b><span></span>`);b.href="#/about/"+(k==="miami"?"next":stops[0]);
  $("#marks").append(b);return{k,ll:GEO[k],tz:TZ[k],stops,home,b,left:b.classList.contains("l"),time:b.querySelector("span")};});

/* a mark's width is read here, once a minute and on resize, never inside the frame loop */
const measure=()=>MARKS.forEach(m=>{m.w=m.b.offsetWidth;});
addEventListener("resize",measure);document.fonts?.ready.then(measure);

/* ---------- right now ---------- */
function minute(){
  window.SUN_LL=subsolar();
  $("#now-time").textContent=clock("America/New_York")+" Eastern time";
  MARKS.forEach(m=>{m.time.textContent=clock(m.tz);m.b.setAttribute("aria-label",`${SHORT[m.k]}, ${clock(m.tz)} there now. Show on the line.`);});
  STOPS.forEach(s=>{$("#stop-"+s.id+" .when").textContent=s.at.length>1?s.at.map(k=>`${SHORT[k]} ${clock(TZ[k])}`).join(", "):clock(TZ[s.at[0]])+" there now";});
  measure();if(view==="place")placeNow();
}
fetch("now.json").then(r=>r.json()).then(n=>{
  $("#now-song").textContent=`${n.listening.title}, ${n.listening.by}`;$("#now-book").textContent=`${n.reading.title}, ${n.reading.by}`;
  if(n.updated)$("#now").title="Updated "+new Date(n.updated+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
}).catch(()=>{$("#now-song").parentNode.hidden=$("#now-book").parentNode.hidden=true;});

/* ---------- the way in: 2003 to this year ---------- */
const BORN=2003,cover=$("#cover"),count=$("#count");
const IN={shown:0,done:false,t0:performance.now()};
function lift(){if(IN.done)return;IN.done=true;cover.classList.add("out");try{sessionStorage.setItem("jw-in","1");}catch(e){}setTimeout(()=>cover.remove(),600);
  removeEventListener("keydown",lift);removeEventListener("pointerdown",lift);}
{let seen=false;try{seen=sessionStorage.getItem("jw-in")==="1";}catch(e){}
  const Y=now().getFullYear();IN.fast=seen||RM;if(IN.fast)count.textContent=Y;IN.Y=Y;
  addEventListener("keydown",lift);addEventListener("pointerdown",lift);}
/* the heavy parts arrive after the first paint: the Earth data (1 MB, counted byte by byte), then the bricks, then the desk */
const LOAD={p:.04};
(async()=>{try{
  const r=await fetch("js/earth_data.js"),rd=r.body.getReader(),parts=[];let n=0;
  for(;;){const{done,value}=await rd.read();if(done)break;parts.push(value);n+=value.length;LOAD.p=.04+.56*Math.min(1,n/1055643);}
  const s=document.createElement("script");s.text=await new Blob(parts).text();document.head.append(s);
  LOAD.p=.62;await import("./kit.js");LOAD.p=.72;await import("./desk.js");LOAD.p=.9;
}catch(e){window.DESK_FAIL=String(e&&e.message||e);console.error("load:",e);}})();
function countStep(dt,t){
  if(IN.done)return;
  /* what has really arrived */
  const real=window.DESK_FAIL||view==="work"?1:window.DESK&&DESK.ready?1:LOAD.p;
  IN.shown=Math.min(real,IN.shown+dt/1.8);
  if(!IN.fast)count.textContent=BORN+Math.round(IN.shown*(IN.Y-BORN));
  if(IN.shown>=1){if(!IN.hold)IN.hold=t;if(IN.fast||t-IN.hold>450)lift();}
  if(t-IN.t0>15000)lift();
}

/* ---------- the camera on the desk ---------- */
const U={v:0,from:0,to:0,t0:0,ms:1};
const tweenU=(to,ms)=>{U.from=U.v;U.to=to;U.t0=performance.now();U.ms=RM?1:ms;};
const P={cx:.5,cy:.5,r:.4,lat:18,lon:-40},PT={...P}; /* where the globe sits (fractions of the window) and which place faces us */
const quat=(lat,lon)=>{const a=lat*D2R/2,b=-lon*D2R/2,sa=Math.sin(a),ca=Math.cos(a),sb=Math.sin(b),cb=Math.cos(b);return[sa*cb,ca*sb,sa*sb,ca*cb];};
let view="home",stop=STOPS[0],sceneN=0,ptr={x:0,y:0};
const WIDE=matchMedia("(min-width:48rem)"),wide=()=>WIDE.matches,homeLon=()=>wide()?-38:-50;
function aim(){
  const s=stop,g=s.at.map(k=>GEO[k]),lat=g.reduce((a,q)=>a+q[0],0)/g.length,lon=g.reduce((a,q)=>a+q[1],0)/g.length;
  if(view==="about"){
    /* wide: the globe takes the space right of the text column; narrow: it sits above the list */
    const W=innerWidth,H=innerHeight,m=Math.min(W,H),col=$("#about .col").getBoundingClientRect().right||W*.46,room=W-col;
    Object.assign(PT,wide()?{cx:(col+room*.52)/W,cy:.5,r:Math.min(.34,room*.46/m)}:{cx:.5,cy:.27,r:.36},{lat:lat-4,lon});}
  if(view==="place"){Object.assign(PT,{cx:.5,cy:.5,r:1.15*Math.max(innerWidth,innerHeight)/Math.min(innerWidth,innerHeight),lat,lon});}
}
addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;ptr.x=e.clientX/innerWidth*2-1;ptr.y=e.clientY/innerHeight*2-1;
  /* the pointer in the top half never lifts the camera: that would slide the wall's mementos up behind his statement */
  if(view==="home"&&window.DESK?.look&&!RM){DESK.look(ptr.x,Math.max(0,ptr.y));DESK.face(homeLon()-ptr.x*52);}},{passive:true});

/* ---------- marks and the line ---------- */
function drawMarks(){
  const ok=window.DESK?.at&&DESK.ready&&(view==="home"||view==="about")&&IN.done;
  for(const m of MARKS){
    const on=ok&&(view==="home"?m.home&&U.v<.05:m.stops.includes(stop.id)&&U.v>.5&&U.v<.7);let p;
    if(on&&(p=DESK.at(m.ll[0],m.ll[1]))[2]>.14){const w=m.w;m.b.classList.toggle("l",m.left?p[0]-w+12>0:p[0]+w-12>innerWidth);m.b.style.transform=`translate(${p[0].toFixed(1)}px,${p[1].toFixed(1)}px)`;m.b.classList.add("show");}
    else m.b.classList.remove("show");}
}
const vec=([lat,lon])=>[Math.cos(lat*D2R)*Math.sin(lon*D2R),Math.sin(lat*D2R),Math.cos(lat*D2R)*Math.cos(lon*D2R)];
const LINE=(()=>{const order=["concord","doha","concord","wake","barcelona","boston","stamford"],pts=[];
  for(let i=0;i<order.length-1;i++){const a=vec(GEO[order[i]]),b=vec(GEO[order[i+1]]),w=Math.acos(clamp(a[0]*b[0]+a[1]*b[1]+a[2]*b[2],-1,1)),n=Math.max(6,Math.round(w/D2R/3));
    for(let j=0;j<=n;j++){const t=j/n,ka=Math.sin((1-t)*w)/Math.sin(w),kb=Math.sin(t*w)/Math.sin(w),v=[0,1,2].map(q=>a[q]*ka+b[q]*kb);
      pts.push([Math.asin(v[1])/D2R,Math.atan2(v[0],v[2])/D2R,1.03+.02*w*Math.sin(Math.PI*t)]);}
    pts.push(null);}
  return pts;})();
const routeEl=$("#route path");
function drawRoute(){
  if(!(window.DESK?.at&&DESK.ready&&view==="about"&&U.v>.5&&U.v<.7)){if(routeEl.getAttribute("d"))routeEl.setAttribute("d","");return;}
  let d="",pen=false;for(const q of LINE){if(!q){pen=false;continue;}const p=DESK.at(q[0],q[1],q[2]);if(p[2]<.28){pen=false;continue;}d+=(pen?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1);pen=true;}
  routeEl.setAttribute("d",d);
}

/* ---------- a place: its painted scene, at this minute ---------- */
const SC={key:null,t0:0,ox:0,oy:0};
function sceneFrame(t){
  const want=view==="place"&&stop.scenes[sceneN]&&U.v>.6?stop.scenes[sceneN][0]:null;
  if(SC.key&&SC.key!==want){window.PAINTED?.[SCENES[SC.key].i](99,null);SC.key=null;}
  if(!want||!window.PAINTED)return;
  if(SC.key!==want){SC.key=want;SC.t0=t;}
  const c=SCENES[want],W=innerWidth,H=innerHeight,port=W<H,q=RM?.5:.5*ease((t-SC.t0)/900);
  SC.ox+=(ptr.x*.3-SC.ox)*.06;SC.oy+=(-ptr.y*.1-SC.oy)*.06;
  let pos,look;if(c.path){pos=c.path[0].map((v,i)=>lerp(v,c.path[2][i],q));look=c.path[1].map((v,i)=>lerp(v,c.path[3][i],q));}
  else{pos=[0,.5,lerp(c.z[0],c.z[1],q)];look=[0,.6,0];if(port)pos[2]*=1.5;}
  if(!RM){pos[0]+=SC.ox;pos[1]+=SC.oy;}
  /* a plain pinhole camera: the same view iteration 1's camera gave these scenes */
  const f=[look[0]-pos[0],look[1]-pos[1],look[2]-pos[2]],fl=Math.hypot(...f);f[0]/=fl;f[1]/=fl;f[2]/=fl;
  const r=[-f[2],0,f[0]],rl=Math.hypot(r[0],r[2])||1;r[0]/=rl;r[2]/=rl;const u=[r[1]*f[2]-r[2]*f[1],r[2]*f[0]-r[0]*f[2],r[0]*f[1]-r[1]*f[0]];
  const th=Math.tan((port?68:50)*D2R/2),asp=W/H;
  const proj=(x,y,z)=>{const dx=x-pos[0],dy=y-pos[1],dz=z-pos[2],zc=Math.max(.02,dx*f[0]+dy*f[1]+dz*f[2]);
    return[(1+(dx*r[0]+dy*r[1]+dz*r[2])/(zc*th*asp))/2*W,(1-(dx*u[0]+dy*u[1]+dz*u[2])/(zc*th))/2*H];};
  PAINTED[c.i](lerp(c.s[0],c.s[1],q),proj,{x:pos[0],y:pos[1],z:pos[2]});
}
/* the light of this minute, laid over the painting: none by day, warm as the sun goes down, blue at night */
function placeNow(){
  const sc=stop.scenes[sceneN];if(!sc)return;const keys=stop.at,k=sc[0]==="ny"?"newyork":keys[0],h=sunHeight(GEO[k]);
  let n=sstep(5,-9,h);n*=SCENES[sc[0]].night??1; /* scenes painted at dusk or dawn already carry part of the dark */
  $("#grade").style.background=`rgb(${Math.round(lerp(255,74,n*n))},${Math.round(lerp(255,90,n))},${Math.round(lerp(255,150,Math.pow(n,1.4)))})`;
  $("#h-place").textContent=sc[1];$("#place-time").textContent=`${clock(TZ[k])} there now`;
}
function placeFill(){
  const sc=stop.scenes[sceneN];$("#place-line").textContent=sc[2]||(stop.id==="next"?"New York, Boston or Miami. Not decided.":stop.note)||"";$("#place-line").hidden=!(sc[2]||stop.note);
  const other=stop.scenes.map((c,i)=>i!==sceneN?`<a class="go" href="#/place/${stop.id}/${i}">${c[1]}</a>`:"").join("");
  $("#place-ways").innerHTML=other+workLinks(stop);placeNow();
}
$("#place").addEventListener("pointerdown",e=>{if(e.target.closest("a,button"))return;window.PAINT?.tap(e.clientX,e.clientY);});
$("#place").addEventListener("pointermove",e=>{if(e.pointerType==="mouse")$("#place").style.cursor=window.PAINT?.hot(e.clientX,e.clientY)?"pointer":"";},{passive:true});

/* ---------- views ---------- */
const VIEWS=["home","about","place","work"];let first=true,hideT={};
function show(v,o={}){
  const from=view,sameStop=o.stop===stop&&o.scene===sceneN;
  /* inside a place: one scene to another goes through the veil */
  if(v==="place"&&from==="place"&&!sameStop&&!first){$("#veil").classList.add("on");setTimeout(()=>{stop=o.stop;sceneN=o.scene;placeFill();aim();setTimeout(()=>$("#veil").classList.remove("on"),80);},RM?0:200);return;}
  view=v;if(o.stop)stop=o.stop;sceneN=o.scene||0;document.body.dataset.view=v;
  VIEWS.forEach(n=>{const s=$("#"+n);clearTimeout(hideT[n]);if(n===v){s.hidden=false;requestAnimationFrame(()=>requestAnimationFrame(()=>s.classList.add("on")));}
    else{s.classList.remove("on");hideT[n]=setTimeout(()=>{s.hidden=true;},first?0:220);}});
  MARKS.forEach(m=>{m.b.tabIndex=v==="home"?0:-1;}); /* past Home a dot opens nothing, so the keyboard skips it */
  document.querySelectorAll("#nav a").forEach(l=>{l.dataset.v===v?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");if(l.dataset.v==="about")l.href=v==="place"?"#/about/"+stop.id:"#/about";});
  /* the camera: going deeper moves forward (900ms), coming back retraces it sooner (500ms) */
  const depth={home:0,about:.62,place:1,work:U.v}[v],ms=first?1:depth>U.v?900:500;if(v!=="work")tweenU(depth,ms);
  aim();if(first&&v!=="home"){Object.assign(P,PT);}
  if(v==="home"&&window.DESK?.face)DESK.face(homeLon(),true);
  if(v==="about"){document.querySelectorAll("#stops li").forEach(li=>li.classList.toggle("active",li.dataset.id===stop.id));
    if(o.scroll){const top=stop===STOPS[0],how=RM||first?"auto":"smooth";requestAnimationFrame(()=>top?$("#about").scrollTo({top:0,behavior:how}):$("#stop-"+stop.id).scrollIntoView({block:"start",behavior:how}));}}
  if(v==="place")placeFill();
  if(v==="work"&&o.project)requestAnimationFrame(()=>$("#project-"+o.project)?.scrollIntoView({block:"start"}));
  if(!first){const h=$("#"+v+" h1");h.tabIndex=-1;h.focus({preventScroll:true});}
  document.title=v==="home"?"Julian Whitney":`${v==="work"?"The work":v==="about"?"Where I’ve been":stop.scenes[sceneN]?.[1]||stop.name}, Julian Whitney`;
  first=false;
}
function route(){
  const[,a,b,c]=location.hash.replace(/^#/,"").split("/");
  if(a==="work")show("work",{project:b});
  else if(a==="about")show("about",{stop:stopBy(b)||(view==="about"?stop:STOPS[0]),scroll:!!stopBy(b)&&!scrolling});
  else if(a==="place"&&stopBy(b)?.scenes.length)show("place",{stop:stopBy(b),scene:clamp(+c||0,0,stopBy(b).scenes.length-1)});
  else show("home");
}
addEventListener("hashchange",route);
addEventListener("keydown",e=>{if(e.key!=="Escape"||view==="home")return;location.hash=view==="place"?"#/about/"+stop.id:"#/";});
/* about: scrolling down the list moves along the line */
let scrolling=false,tick=false;
$("#about").addEventListener("scroll",()=>{if(tick||view!=="about")return;tick=true;requestAnimationFrame(()=>{tick=false;
  const mid=innerHeight*(wide()?.42:.66);let best=null,bd=1e9;document.querySelectorAll("#stops li").forEach(li=>{const r=li.getBoundingClientRect(),d=Math.abs(r.top+Math.min(r.height,10*16)/2-mid);if(d<bd){bd=d;best=li;}});
  if(best&&best.dataset.id!==stop.id){stop=stopBy(best.dataset.id);document.querySelectorAll("#stops li").forEach(li=>li.classList.toggle("active",li===best));aim();
    scrolling=true;history.replaceState(null,"","#/about/"+stop.id);scrolling=false;}});},{passive:true});
addEventListener("resize",aim);

/* ---------- every frame ---------- */
let last=performance.now();
function frame(t){
  const dt=Math.min(.05,(t-last)/1000);last=t;
  U.v=lerp(U.from,U.to,ease((t-U.t0)/U.ms));
  const k=RM?1:1-Math.exp(-dt*4.5);P.cx+=(PT.cx-P.cx)*k;P.cy+=(PT.cy-P.cy)*k;P.r+=(PT.r-P.r)*k;P.lat+=(PT.lat-P.lat)*k;P.lon+=(((PT.lon-P.lon+540)%360)-180)*k;
  if(window.DESK?.set){const W=innerWidth,H=innerHeight;DESK.set(U.v,view!=="work",{cx:P.cx*W,cy:P.cy*H,r:P.r*Math.min(W,H),q:quat(P.lat,P.lon)});
    if(!frame.faced&&DESK.face){frame.faced=true;DESK.face(homeLon(),true);}}
  countStep(dt,t);drawMarks();drawRoute();sceneFrame(t);
  requestAnimationFrame(frame);
}
minute();setInterval(minute,FAKE?5000:20000);
route();requestAnimationFrame(frame);
