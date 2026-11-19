/* The dunes, at 8: the family's 4x4 climbing through the sand at sunset, the sun low ahead over the last ridge. The terrain is painted live
   every frame from the same height field as the old line scene, row by row from the horizon toward the camera, each facet lit by the sun, so
   the camera can fly through it. The far ridge at z -36 is the crest the gate's outline turns into. Sand blows off the crests, the car throws
   dust and leaves its tracks. It drives past an oasis (a pool in a hollow, date palms, camels drinking and grazing, birds over the water);
   a caravan walks a far ridge and Arabian oryx graze on a dune to the left. */
(()=>{
let CARP=null,rev=-9; /* touch: the car answers with a burst of throttle (brake lights, a kick, more dust) */
const Hb=(x,z)=>-1.6+.55*Math.sin(.33*x+.2*z)+.32*Math.sin(.7*z-.3*x+1)+.12*Math.sin(1.6*x+.9*z);
const pathX=z=>2.4*Math.sin(z*.28);
/* the oasis: a hollow pressed into the dunes beside the track (the car passes it two thirds of the way through), holding a pool */
const OZ=1.5,OX=pathX(OZ)+3.6,bowl=(x,z)=>Math.exp(-((x-OX)*(x-OX)/5.5+(z-OZ)*(z-OZ)/2.6));
const Hf=(x,z)=>Hb(x,z)-.75*bowl(x,z);
const LEVEL=Hf(OX,OZ)+.34,inPool=(x,z)=>bowl(x,z)>.25&&Hf(x,z)<LEVEL;
const SUN=[2,1.2,-34];
/* light from the low sun ahead and a little right, so faces toward us sit in warm shadow and every crest is rimmed */
const L=(()=>{const v=[.25,.42,-1];const n=Math.hypot(...v);return v.map(a=>a/n);})();
const lit=[246,178,98],shade=[118,52,30],far=[244,190,130];
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
PAINT.scene({id:"p-dunes",win:CUTW("dunes"),s:[.485,.56],refZ:0,layers:[],
  cue(e){return CARP&&CARP[0]>e.W*.08&&CARP[0]<e.W*.92&&CARP[1]<e.H*.8?"the car":"";},
  hot(x,y){return!!CARP&&Math.abs(x-CARP[0])<CARP[2]*.6&&y>CARP[1]-CARP[2]*.85&&y<CARP[1]+CARP[2]*.25;},
  tap(x,y,e){if(!this.hot(x,y))return false;rev=e.T;return true;},
  poke(e){rev=e.T;return true;},
  /* one light: the sun low ahead over the last ridge; everything is backlit, shadows run toward us */
  look(e){const s=e.P(SUN[0],SUN[1]-1.4*e.lp,SUN[2]);return{bloom:.3,sun:[s[0]/e.W,s[1]/e.H,"255,200,130",.2,.7],grade:"rgba(255,150,90,.16)",shade:["rgba(255,255,255,1)","rgba(235,215,230,1)"],vig:.4,grain:.05};},
  sky(g,e){
    const gr=g.createLinearGradient(0,0,0,e.H*.62);gr.addColorStop(0,"#3a3f5c");gr.addColorStop(.4,"#8c6a72");gr.addColorStop(.75,"#e79a62");gr.addColorStop(1,"#f8c98a");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    const s=e.P(SUN[0],SUN[1]-1.4*e.lp,SUN[2]),R=e.u(SUN[2])*3.4;
    const gl=g.createRadialGradient(s[0],s[1],0,s[0],s[1],R*8);gl.addColorStop(0,"rgba(255,236,190,.85)");gl.addColorStop(.12,"rgba(255,200,130,.45)");gl.addColorStop(1,"rgba(255,170,100,0)");g.fillStyle=gl;g.fillRect(0,0,e.W,e.H);
    g.fillStyle="#fff1cf";g.beginPath();g.arc(s[0],s[1],R,0,7);g.fill();
    /* thin cloud lit from below */
    const r=e.H;for(let i=0;i<5;i++){const y=r*(.14+i*.06),x=e.W*(.15+((i*.37)%1)*.7)+e.T*3*e.dpr,w=e.W*(.18+i*.04);const cg=g.createLinearGradient(0,y-4,0,y+6);cg.addColorStop(0,"rgba(255,190,140,0)");cg.addColorStop(.5,"rgba(255,180,140,.35)");cg.addColorStop(1,"rgba(255,180,140,0)");g.fillStyle=cg;g.beginPath();g.ellipse(x%(e.W*1.2),y,w/2,5*e.dpr,0,0,7);g.fill();}
  },
  grade(g,e,H){const{P,T}=e,cz=e.cam?e.cam.z:10;
    /* rows from far to near; columns across; each facet shaded by its normal against the sun, then hazed by distance */
    const zFar=-70,zNear=cz-.7,X0=-40,X1=40;
    e._sunX=P(SUN[0],SUN[1]-1.4*e.lp,SUN[2])[0];PROPS.sort((a,b)=>a.z(T)-b.z(T));e._pi=0;e._pool=0;
    const rows=[];for(let z=zFar;z<zNear;){rows.push(z);const d=cz-z;z+=Math.max(.18,d*.045);}rows.push(zNear);
    const cols=128,dx=(X1-X0)/cols;
    let prev=null;
    for(const z of rows){const d=cz-z,xs=[];const w=Math.min(X1,Math.max(8,d*1.3));const x0=-w,x1=w,ddx=(x1-x0)/cols;
      for(let i=0;i<=cols;i++){const x=x0+i*ddx;xs.push([x,Hf(x,z)]);}
      const pts=xs.map(([x,y])=>P(x,y,z));
      if(prev){
        /* one fill per row, its colour running smoothly through every column's shade, so the sand reads as one surface with no facets or lines */
        const cs=[];for(let i=0;i<=cols;i++){const[xa]=xs[i],xl=xs[Math.max(0,i-1)],xr=xs[Math.min(cols,i+1)],ny=1,nx=-(xr[1]-xl[1])/((xr[0]-xl[0])||1),nz=-(Hf(xa,z+.05)-Hf(xa,z-.05))/.1;const n=Math.hypot(nx,ny,nz);let k=(nx*L[0]+ny*L[1]+nz*L[2])/n;k=Math.max(0,Math.min(1,k*1.25));
          const fog=Math.min(1,Math.max(0,(d-6)/60));let col=mix(mix(shade,lit,Math.pow(k,1.4)),far,fog*.85);
          if(bowl(xa,z)>.2&&Hf(xa,z)<LEVEL+.09)col=mix(col,[88,54,34],.55*Math.max(0,1-(Hf(xa,z)-LEVEL)/.09));cs.push(col);}
        const xa0=pts[0][0],xa1=pts[cols][0],span=(xa1-xa0)||1,gr=g.createLinearGradient(xa0,0,xa1,0);
        for(let i=0;i<=cols;i++){const c=cs[i];gr.addColorStop(Math.min(1,Math.max(0,(pts[i][0]-xa0)/span)),`rgb(${c[0]|0},${c[1]|0},${c[2]|0})`);}
        g.fillStyle=gr;g.beginPath();g.moveTo(pts[0][0]-2,e.H+40);pts.forEach(q=>g.lineTo(q[0],q[1]));g.lineTo(pts[cols][0]+2,e.H+40);g.closePath();g.fill();
        /* (no stroke along the rows: the sand is one continuous surface; light on the facets alone shows the crests) */}
      prev=pts;
      /* the tyre tracks behind the car, drawn as each row reaches them */
      const carZ=cz-5.5;if(z>carZ-.3&&z<cz-.8){const tp=[-.34,.34].map(o=>{const x=pathX(z)+o;return P(x,Hf(x,z)+.02,z);});if(e._tp){tp.forEach((p,k)=>{const q=e._tp[k];g.strokeStyle="rgba(96,42,20,.5)";g.lineWidth=Math.max(1,e.u(z)*.11);g.beginPath();g.moveTo(q[0],q[1]);g.lineTo(p[0],p[1]);g.stroke();});}e._tp=tp;}
      /* palms, scrub and animals stand on the row they are rooted in, so nearer dunes hide them properly */
      if(!e._pool&&z>=SHORE.z1){e._pool=1;pool(g,e,H);
        /* everything that waited for the water (props in its depth, and the car if it is beside it), far to near */
        const wait=[];while(e._pi<PROPS.length&&PROPS[e._pi].z(T)<=z){const P0=PROPS[e._pi];wait.push([P0.z(T),()=>P0.draw(g,e,H)]);e._pi++;}
        if(e._carWait){const cz0=e._carWait;wait.push([cz0,()=>drawCar(g,e,H,cz0)]);e._carWait=0;}
        wait.sort((a,b)=>a[0]-b[0]).forEach(w=>w[1]());}
      while(e._pi<PROPS.length&&PROPS[e._pi].z(T)<=z&&(e._pool||PROPS[e._pi].z(T)<SHORE.z0)){PROPS[e._pi].draw(g,e,H);e._pi++;}
      /* the car itself sits between the rows around it */
      if(Math.abs(z-carZ)<Math.max(.18,(cz-z)*.045)*.6&&!e._car){e._car=1;if(e._pool||carZ<SHORE.z0)drawCar(g,e,H,carZ);else e._carWait=carZ;}
    }
    if(e._carWait){drawCar(g,e,H,e._carWait);e._carWait=0;}
    e._car=0;e._tp=null;
    birds(g,e,H);
    /* spindrift: sand streaming off the near crests in the wind */
    g.globalCompositeOperation="lighter";const r=H.rng(12);
    for(let k=0;k<260;k++){const z=cz-2-r()*22,x=-10+r()*20+((T*1.2+k)%6)-3,y=Hf(x,z)+.05+r()*.3,p=P(x,y,z),a=(.08+r()*.15)*(1-(cz-z)/24);g.fillStyle=`rgba(255,214,160,${a.toFixed(3)})`;g.fillRect(p[0],p[1],e.u(z)*.06+1,1);}
    g.globalCompositeOperation="source-over";
    /* warm air and a dark edge */
    const v=g.createRadialGradient(e.W/2,e.H*.45,e.H*.3,e.W/2,e.H*.45,e.H*1.1);v.addColorStop(0,"rgba(0,0,0,0)");v.addColorStop(1,"rgba(40,10,0,.45)");g.fillStyle=v;g.fillRect(0,0,e.W,e.H);
  }
});
/* The pool: its shoreline traced once along the hollow's real contour (where the sand rises above the water), so it holds still in the world
   as the camera flies in. Drawn as one surface: the sky reflected (the horizon's glow far off, dusk overhead near us), the sun's glint in a
   column under it, ripples fixed on the water and drifting, and a dark band of wet sand round the edge. */
const SHORE=(()=>{const pts=[];for(let i=0;i<96;i++){const a=i/96*Math.PI*2,cx=Math.cos(a)*2.35,cz=Math.sin(a)*1.6;let t=0;while(t<1.6&&Hf(OX+cx*t,OZ+cz*t)<LEVEL)t+=.01;pts.push([OX+cx*t,OZ+cz*t]);}
  return{pts,z0:Math.min(...pts.map(p=>p[1])),z1:Math.max(...pts.map(p=>p[1]))};})();
function pool(g,e,H){const{P,T}=e,sp=SHORE.pts.map(([x,z])=>P(x,LEVEL,z));let y0=1e9,y1=-1e9,x0=1e9,x1=-1e9;sp.forEach(p=>{y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1]);x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);});
  if(x1<0||x0>e.W||y0>e.H)return;
  g.save();H.poly(g,sp);g.clip();
  const gr=g.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,"#f2b27a");gr.addColorStop(.35,"#c98a86");gr.addColorStop(1,"#6e5a7e");g.fillStyle=gr;g.fillRect(x0,y0,x1-x0,y1-y0);
  /* the glint under the sun */
  const sx=e._sunX,gw=Math.max(6,(x1-x0)*.12),gg=g.createLinearGradient(sx-gw,0,sx+gw,0);gg.addColorStop(0,"rgba(255,232,190,0)");gg.addColorStop(.5,"rgba(255,236,200,.55)");gg.addColorStop(1,"rgba(255,232,190,0)");g.fillStyle=gg;g.fillRect(sx-gw,y0,gw*2,y1-y0);
  /* ripples: short dashes along lines of the water itself, so they keep their place and scale as we come closer */
  for(let k=0;k<26;k++){const z=SHORE.z0+(k+.5)/26*(SHORE.z1-SHORE.z0);for(let j=0;j<7;j++){const x=OX-2.4+(j/6)*4.8+Math.sin(T*.4+k*1.7+j)*.25,L=.18+.12*Math.sin(k*3.1+j),a=.5+.5*Math.sin(T*1.3+k*.9+j*2.3);
      if(a<.35)continue;const p=P(x,LEVEL,z),q=P(x+L,LEVEL,z),near=Math.abs((p[0]+q[0])/2-sx)<gw*1.6;g.strokeStyle=near?`rgba(255,240,210,${(.7*a).toFixed(3)})`:`rgba(255,214,180,${(.22*a).toFixed(3)})`;g.lineWidth=Math.max(.8,e.u(z)*.02);g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1]);g.stroke();}}
  /* the shore darkens the water's edge a little, and the far bank's reflection lies along it */
  g.lineWidth=Math.max(1.5,e.u(OZ)*.08);g.strokeStyle="rgba(60,34,26,.35)";H.poly(g,sp);g.stroke();
  g.restore();
  g.lineWidth=Math.max(1,e.u(OZ)*.03);g.strokeStyle="rgba(84,48,30,.6)";H.poly(g,sp);g.stroke();}
/* Life in the dunes. Everything is lit from behind by the low sun ahead: dark bodies with a warm rim on their top edges, each standing on a
   soft contact shadow that falls toward us. Sizes are real against the car (about 1.9 m wide, .62 units): a unit is about 3 m, so M scales the drawings, which are in metres. */
const M=.33;
function shadow(g,x,y,rx,ry,a){for(let k=0;k<4;k++){g.fillStyle=`rgba(70,26,8,${(a*.32).toFixed(3)})`;g.beginPath();g.ellipse(x,y+ry*.35*k,rx*(1-.16*k),ry*(1-.1*k),0,0,7);g.fill();}}
/* a camel in profile. dir 1 faces right. pose: "walk" (pacing, both legs on a side together), "drink" (neck down to the water), "graze" */
function camel(g,e,H,x,z,dir,ph,pose,rider,alpha=1){const{P}=e,u=e.u(z)*M,y=Hf(x,z),b=P(x,y,z);if(alpha<=.01)return;
  shadow(g,b[0],b[1]+u*.06,u*1.25,u*.16,.9*alpha);
  g.save();g.globalAlpha=alpha;g.translate(b[0],b[1]);g.scale(dir*u,-u);g.lineCap="round";g.lineJoin="round";
  const body="#3b2417",far="#24150c",rim="rgba(255,206,146,.85)",sw=pose==="walk"?Math.sin(ph)*.3:0;
  /* a camel leg: thick thigh to a knobbly knee, a thin cannon bone, a broad pad of a foot */
  const leg=(hx,a,col,w)=>{const kx=hx+Math.sin(a)*.62,ky=.72,fx=kx+Math.sin(a)*.3;g.fillStyle=col;g.strokeStyle=col;
    g.beginPath();g.moveTo(hx-w*1.2,1.36);g.lineTo(hx+w*1.2,1.36);g.lineTo(kx+w*.5,ky);g.lineTo(kx-w*.5,ky);g.fill();
    g.beginPath();g.arc(kx,ky,w*.62,0,7);g.fill();g.lineWidth=w*.8;g.beginPath();g.moveTo(kx,ky);g.lineTo(fx,.05);g.stroke();
    g.beginPath();g.ellipse(fx+.05,.04,w*1.1,.045,0,0,7);g.fill();};
  leg(.62,-sw,far,.1);leg(-.72,-sw,far,.11);
  g.strokeStyle=body;g.lineWidth=.06;g.beginPath();g.moveTo(-1.02,1.62);g.quadraticCurveTo(-1.12,1.42,-1.06,1.2);g.stroke();
  /* barrel and the single hump */
  g.fillStyle=body;g.beginPath();g.moveTo(-1.04,1.56);g.bezierCurveTo(-1.04,1.78,-.84,1.84,-.64,1.84);g.bezierCurveTo(-.44,2.18,.16,2.2,.36,1.9);g.bezierCurveTo(.6,1.86,.88,1.84,.96,1.64);
  g.bezierCurveTo(.96,1.38,.6,1.3,0,1.3);g.bezierCurveTo(-.6,1.3,-1.02,1.32,-1.04,1.56);g.fill();
  /* neck: rises from the chest, arches forward, and for drinking or grazing dips to the ground ahead of the forefeet */
  const nk=pose==="drink"?[[.9,1.66],[1.45,1.86],[1.85,1.2],[1.9,.34]]:pose==="graze"?[[.9,1.66],[1.42,1.82],[1.8,1.25],[1.86,.62]]:[[.9,1.66],[1.25,1.42],[1.38,1.92],[1.6,2.1]];
  g.strokeStyle=body;g.lineCap="round";g.lineWidth=.2;g.beginPath();g.moveTo(nk[0][0]-.08,nk[0][1]-.06);g.bezierCurveTo(nk[1][0],nk[1][1]-.1,nk[2][0],nk[2][1],nk[3][0],nk[3][1]);g.stroke();
  g.lineWidth=.13;g.beginPath();g.moveTo(nk[0][0],nk[0][1]+.06);g.bezierCurveTo(nk[1][0],nk[1][1],nk[2][0],nk[2][1],nk[3][0],nk[3][1]);g.stroke();
  /* head: a long muzzle, the brow and a small ear */
  const hd=nk[3],ha=pose==="walk"?-.18:pose==="graze"?-1.15:-1.4;g.save();g.translate(hd[0],hd[1]);g.rotate(ha);g.fillStyle=body;
  g.beginPath();g.moveTo(-.08,.08);g.quadraticCurveTo(.16,.12,.36,.02);g.quadraticCurveTo(.38,-.06,.3,-.08);g.quadraticCurveTo(.1,-.1,-.08,-.07);g.closePath();g.fill();
  g.beginPath();g.ellipse(-.06,.12,.035,.06,-.5,0,7);g.fill();g.restore();
  leg(.56,sw,body,.11);leg(-.78,sw,body,.12);
  /* the rider on the lead camel: dark thobe in shadow, the white ghutra catching the sun */
  if(rider){g.fillStyle="#1f1712";g.beginPath();g.moveTo(-.26,2.1);g.lineTo(0,2.1);g.lineTo(-.02,2.66);g.lineTo(-.2,2.66);g.fill();g.strokeStyle="#1f1712";g.lineWidth=.08;g.beginPath();g.moveTo(.05,2.2);g.lineTo(.18,1.85);g.stroke();
    g.fillStyle="#efe4d0";g.beginPath();g.arc(-.1,2.78,.12,0,7);g.fill();g.beginPath();g.moveTo(-.22,2.78);g.lineTo(-.28,2.5);g.lineTo(-.14,2.56);g.fill();}
  /* the rim the sun puts on the hump, back and neck */
  g.strokeStyle=rim;g.lineWidth=.045;g.beginPath();g.moveTo(-1.02,1.62);g.bezierCurveTo(-1,1.8,-.84,1.84,-.64,1.84);g.bezierCurveTo(-.44,2.18,.16,2.2,.36,1.9);g.bezierCurveTo(.6,1.86,.8,1.84,.9,1.74);g.stroke();
  g.lineWidth=.035;g.beginPath();g.moveTo(nk[0][0],nk[0][1]+.14);g.bezierCurveTo(nk[1][0],nk[1][1]+.08,nk[2][0]+.06,nk[2][1],nk[3][0]+.05,nk[3][1]+.04);g.stroke();
  g.restore();}
/* an Arabian oryx: white coat, dark legs and face marks, long straight horns; grazing, the head lifting now and then */
function oryx(g,e,H,x,z,dir,ph,T){const{P}=e,u=e.u(z)*M,b=P(x,Hf(x,z),z);shadow(g,b[0],b[1]+u*.04,u*.7,u*.09,.8);
  g.save();g.translate(b[0],b[1]);g.scale(dir*u,-u);g.lineCap="round";
  const up=Math.max(0,Math.sin(T*.35+ph*3))>.85?1:0,hx=.78,hy=up?1.25:.32;
  const leg=(lx,col)=>{g.strokeStyle=col;g.lineWidth=.07;g.beginPath();g.moveTo(lx,.78);g.lineTo(lx+.02,.36);g.lineTo(lx,0);g.stroke();};
  leg(.42,"#6e5f55");leg(-.44,"#6e5f55");
  /* body: white back, the dark flank stripe, pale belly */
  g.fillStyle="#f3ebdc";g.beginPath();g.moveTo(-.6,.92);g.bezierCurveTo(-.6,1.1,.5,1.12,.58,.98);g.bezierCurveTo(.66,.8,.5,.66,0,.66);g.bezierCurveTo(-.5,.66,-.62,.74,-.6,.92);g.fill();
  g.fillStyle="#7a5a44";g.beginPath();g.moveTo(-.58,.8);g.bezierCurveTo(-.2,.86,.2,.86,.6,.84);g.lineTo(.56,.76);g.bezierCurveTo(.2,.74,-.2,.74,-.56,.72);g.fill();
  g.strokeStyle="#ece2d0";g.lineWidth=.07;g.beginPath();g.moveTo(-.6,.95);g.lineTo(-.68,.62);g.stroke();
  /* neck and head with its black face mask, then the horns, nearly straight and swept back */
  g.strokeStyle="#efe6d6";g.lineWidth=.16;g.beginPath();g.moveTo(.48,.96);g.quadraticCurveTo(.72,up?1.1:.7,hx,hy+.06);g.stroke();
  g.fillStyle="#efe6d6";g.beginPath();g.ellipse(hx+.06,hy,.13,.07,up?-.2:-1.25,0,7);g.fill();g.fillStyle="#2c241f";g.beginPath();g.ellipse(hx+.09,hy-.03,.07,.045,up?-.2:-1.25,0,7);g.fill();
  g.strokeStyle="#2a221d";g.lineWidth=.03;const ha=up?[-.3,.72]:[-.52,.4];g.beginPath();g.moveTo(hx,hy+.05);g.lineTo(hx+ha[0],hy+ha[1]);g.moveTo(hx+.04,hy+.05);g.lineTo(hx+ha[0]+.06,hy+ha[1]+.02);g.stroke();
  leg(.36,"#4f433b");leg(-.5,"#4f433b");
  g.strokeStyle="rgba(255,226,180,.9)";g.lineWidth=.035;g.beginPath();g.moveTo(-.6,.94);g.bezierCurveTo(-.6,1.1,.5,1.12,.58,.98);g.stroke();
  g.restore();}
/* a date palm rooted in the sand: the same Phoenix dactylifera as Doha (PAINT.helpers.datePalm), painted once into a sprite per seed and
   darkened for the backlight, since the sun is low ahead; a warm rim is left where the fronds face the sun */
const PALMS={};
function palmSprite(seed){if(PALMS[seed])return PALMS[seed];const h=360,c=document.createElement("canvas");c.width=480;c.height=460;const q=c.getContext("2d");q.lineCap="round";
  PAINT.helpers.datePalm(q,PAINT.helpers.rng(seed),240,448,h);
  q.globalCompositeOperation="source-atop";const g=q.createLinearGradient(0,0,480,0);g.addColorStop(0,"rgba(40,22,14,.55)");g.addColorStop(.7,"rgba(40,22,14,.42)");g.addColorStop(1,"rgba(255,170,90,.12)");q.fillStyle=g;q.fillRect(0,0,480,460);
  return PALMS[seed]={c,h};}
function palmAt(g,e,H,x,z,h,seed){const{P}=e,u=e.u(z)*M*1.6,b=P(x,Hf(x,z),z);shadow(g,b[0],b[1]+u*.05,u*.9,u*.12,.7);H.cast(g,b[0],b[1],u*.12,u*h*.5,(b[0]-(e._sunX||b[0]))/(e.W||1)*.8,.35,.3,"80,30,10");
  const S=palmSprite(seed),k=h*u*1.15/S.h;g.drawImage(S.c,b[0]-240*k,b[1]-448*k,480*k,460*k);}
function scrub(g,e,H,x,z,seed){const{P}=e,u=e.u(z)*M*1.4,b=P(x,Hf(x,z),z),r=H.rng(seed);shadow(g,b[0],b[1],u*.5,u*.07,.5);
  for(let k=0;k<7;k++){const dx=(r()-.5)*u*.7,rr=u*(.12+r()*.16);g.fillStyle=k%2?"#3c4a26":"#4c5a2c";g.beginPath();g.ellipse(b[0]+dx,b[1]-rr*.6,rr,rr*.7,0,0,7);g.fill();}
  g.strokeStyle="rgba(230,214,140,.55)";g.lineWidth=Math.max(.6,u*.02);g.beginPath();g.ellipse(b[0],b[1]-u*.22,u*.3,u*.14,0,Math.PI*1.1,Math.PI*1.9);g.stroke();}
/* a few birds wheeling over the water */
function birds(g,e,H){const{P,T}=e;for(let k=0;k<7;k++){const a=T*.35+k*.9,x=OX+Math.cos(a)*(1.4+k*.15),z=OZ+Math.sin(a)*.9-1,y=LEVEL+2.2+Math.sin(T*.7+k)*.3,p=P(x,y,z),u=e.u(z)*.45,f=Math.sin(T*9+k*1.7)*.5;
  g.strokeStyle="rgba(40,24,22,.85)";g.lineWidth=Math.max(.8,u*.045);g.beginPath();g.moveTo(p[0]-u*.28,p[1]-u*.12*f);g.quadraticCurveTo(p[0]-u*.1,p[1]-u*.06,p[0],p[1]);g.quadraticCurveTo(p[0]+u*.1,p[1]-u*.06,p[0]+u*.28,p[1]-u*.12*f);g.stroke();}}
/* what stands in the scene, rooted at a depth z (a function of time for the walkers) */
const PROPS=[];
{const r=PAINT.helpers.rng(41);
  /* palms round the pool, tallest at the back */
  [[-2.4,-.9,4.2],[-1.7,-1.5,3.4],[-.6,-1.9,4.6],[.9,-1.7,3.8],[2.3,-1.1,4.4],[2.9,.2,3.1],[-2.9,.4,3.6],[2.1,1.3,2.6]].forEach(([dx,dz,h],i)=>{const x=OX+dx,z=OZ+dz;PROPS.push({z:()=>z,draw:(g,e,H)=>palmAt(g,e,H,x,z,h,90+i)});});
  for(let i=0;i<9;i++){const a=r()*6.28,x=OX+Math.cos(a)*(2.1+r()*.6),z=OZ+Math.sin(a)*(1.3+r()*.4);PROPS.push({z:()=>z,draw:(g,e,H)=>scrub(g,e,H,x,z,200+i)});}
  /* two camels at the water: one drinking at the far shore, one grazing on the right bank */
  PROPS.push({z:()=>OZ-.95,draw:(g,e,H)=>camel(g,e,H,OX-1.55,OZ-.95,1,0,"drink",false)});
  PROPS.push({z:()=>OZ+.3,draw:(g,e,H)=>camel(g,e,H,OX+2.1,OZ+.3,-1,0,"graze",false)});
  /* a caravan of four along a far ridge, walking left, the lead camel ridden; they fade in and out at the ends of their walk */
  const cx=(T,k)=>9-((T*.08)%24)+k*1.1,cz=k=>-13.5+k*.12;
  for(let k=0;k<4;k++)PROPS.push({z:()=>cz(k),draw:(g,e,H)=>{const x=cx(e.T,k),al=Math.min(1,Math.max(0,(x+12)/3),Math.max(0,(13-x)/3));camel(g,e,H,x,cz(k),-1,e.T*1.15+k*1.3,"walk",k===0,al);}});
  /* three oryx grazing on the dune to the left */
  [[-5.4,-3.6,1,0],[-4.7,-4.1,-1,1],[-6.1,-4.4,1,2]].forEach(([x,z,d,ph])=>PROPS.push({z:()=>z,draw:(g,e,H)=>oryx(g,e,H,x,z,d,ph,e.T)}));}
/* The 4x4: a boxy body in silhouette with a sunlit roof edge, roof rack, spare wheel on the back, tail lights, a plume of dust behind. */
function drawCar(g,e,H,z){const{P,T}=e,x=pathX(z),y=Hf(x,z)+.06,u=e.u(z),b=P(x,y,z),tilt=(Hf(x,z-.5)-Hf(x,z+.5))*.6,yaw=Math.cos(z*.28)*.3;
  const rk=Math.exp(-Math.max(0,T-rev)/.9)*(T>=rev?1:0),bob=Math.sin(T*9)*u*.01-rk*u*.05*Math.abs(Math.sin((T-rev)*9));CARP=[b[0],b[1],u];
  g.save();g.translate(b[0],b[1]+bob);g.rotate(-yaw*.25);
  /* dust behind and around the wheels */
  for(let k=0;k<14;k++){const t=((T*.8+k/14)%1),dx=(Math.sin(k*2.1)*.4+t*.3*Math.sign(Math.sin(k)))*u,dy=-t*u*.5,rr=u*(.2+t*.9)*(1+1.5*rk);const gr=g.createRadialGradient(dx,dy,0,dx,dy,rr);gr.addColorStop(0,`rgba(232,178,120,${Math.min(.9,.32*(1-t)*(1+1.6*rk)).toFixed(3)})`);gr.addColorStop(1,"rgba(232,178,120,0)");g.fillStyle=gr;g.fillRect(dx-rr,dy-rr,rr*2,rr*2);}
  const w=.62*u,h=.36*u;
  g.fillStyle="#2b1d17";g.fillRect(-w/2,-h,w,h*.62);                      /* lower body */
  g.fillStyle="#24180f";g.beginPath();g.moveTo(-w*.44,-h*.98);g.lineTo(-w*.4,-h*1.55);g.lineTo(w*.4,-h*1.55);g.lineTo(w*.44,-h*.98);g.fill();   /* cabin */
  g.fillStyle="rgba(255,206,150,.35)";g.fillRect(-w*.36,-h*1.48,w*.72,h*.36);                                        /* rear window, sun through it */
  g.fillStyle="#1a110c";g.fillRect(-w*.46,-h*1.68,w*.92,h*.07);for(let k=0;k<5;k++)g.fillRect(-w*.42+k*w*.21,-h*1.68,w*.03,h*.13);   /* roof rack */
  g.strokeStyle="rgba(255,214,150,.7)";g.lineWidth=Math.max(.8,u*.02);g.beginPath();g.moveTo(-w*.46,-h*1.69);g.lineTo(w*.46,-h*1.69);g.stroke();
  g.fillStyle="#140d09";g.beginPath();g.arc(0,-h*.7,h*.26,0,7);g.fill();g.strokeStyle="rgba(255,214,150,.35)";g.beginPath();g.arc(0,-h*.7,h*.26,-1.2,.2);g.stroke();   /* spare wheel */
  H.glow(g,"255,60,40",-w*.42,-h*.62,u*.12*(1+2.2*rk),.9);H.glow(g,"255,60,40",w*.42,-h*.62,u*.12*(1+2.2*rk),.9);
  g.fillStyle="rgba(60,20,8,.45)";g.beginPath();g.ellipse(0,0,w*.7,h*.12,0,0,7);g.fill();
  g.fillStyle="#0e0907";[-w*.4,w*.4].forEach(o=>{g.beginPath();g.ellipse(o,-h*.14,w*.11,h*.2,0,0,7);g.fill();});
  g.restore();}
})();
