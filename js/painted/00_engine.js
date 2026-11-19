/* Painted scenes: the engine shared by every story scene after Concord's statue (which keeps its own file, concord.js).
   A scene is a few painted layers at world depths, each baked once into a screen-sized bitmap through the live 3D camera, then moved every frame
   by the similarity that carries its two reference points (at the layer's depth) to where the camera now puts them. Sky, light and anything that
   moves (snow, flags, headlights, people, water) are drawn live. A scene shows inside its story window; its bitmaps are freed when it is gone.
   Never use ctx.filter blur here: on many strokes it hangs GPU Chrome and drops the WebGL context. Nothing here reads input. */
window.PAINT=(()=>{
  const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
  const sm=(a,b,t)=>{t=clamp((t-a)/(b-a));return t*t*(3-2*t);};
  const lerp=(a,b,t)=>a+(b-a)*t;
  const rng=seed=>()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  const still=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sprites={};
  function sprite(rgb){if(sprites[rgb])return sprites[rgb];const c=document.createElement("canvas");c.width=c.height=128;const q=c.getContext("2d"),gr=q.createRadialGradient(64,64,0,64,64,64);
    gr.addColorStop(0,`rgba(${rgb},1)`);gr.addColorStop(.07,`rgba(${rgb},.95)`);gr.addColorStop(.2,`rgba(${rgb},.34)`);gr.addColorStop(.5,`rgba(${rgb},.08)`);gr.addColorStop(1,`rgba(${rgb},0)`);q.fillStyle=gr;q.fillRect(0,0,128,128);return sprites[rgb]=c;}
  /* helpers handed to every scene */
  const H={clamp,sm,lerp,rng,
    glow(c,rgb,x,y,r,a){if(a<=.004||r<=0)return;const o=c.globalAlpha;c.globalAlpha=Math.min(1,a);c.drawImage(sprite(rgb),x-r,y-r,r*2,r*2);c.globalAlpha=o;},
    poly(c,pts){c.beginPath();pts.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.closePath();},
    line(c,pts){c.beginPath();pts.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));},
    grain(c,r,x0,y0,x1,y1,n,a,col){for(let i=0;i<n;i++){c.fillStyle=`rgba(${col},${(r()*a).toFixed(3)})`;c.fillRect(x0+r()*(x1-x0),y0+r()*(y1-y0),1+r()*1.5,1);}},
    vgrad(c,y0,y1,stops){const g=c.createLinearGradient(0,y0,0,y1);stops.forEach(([t,col])=>g.addColorStop(t,col));return g;},
    /* contact shadow: a soft dark ellipse under anything that stands on the ground */
    shadow(c,x,y,rx,ry,a=.45,rgb="10,12,16"){if(rx<=0||ry<=0)return;c.save();c.translate(x,y);c.scale(1,ry/rx);const gr=c.createRadialGradient(0,0,0,0,0,rx);gr.addColorStop(0,`rgba(${rgb},${a})`);gr.addColorStop(.55,`rgba(${rgb},${a*.45})`);gr.addColorStop(1,`rgba(${rgb},0)`);c.fillStyle=gr;c.beginPath();c.arc(0,0,rx,0,7);c.fill();c.restore();},
    /* cast shadow: an object's footprint stretched away from the light along the ground (dx,dy = shadow direction per unit height) */
    cast(c,x,y,w,h,dx,dy,a=.3,rgb="10,12,16"){const gr=c.createLinearGradient(x,y,x+dx*h,y+dy*h);gr.addColorStop(0,`rgba(${rgb},${a})`);gr.addColorStop(1,`rgba(${rgb},0)`);c.fillStyle=gr;c.beginPath();c.moveTo(x-w/2,y);c.lineTo(x+w/2,y);c.lineTo(x+w/2+dx*h,y+dy*h);c.lineTo(x-w/2+dx*h,y+dy*h);c.closePath();c.fill();},
    /* rim light: a thin bright edge on the lit side of a silhouette path already on c */
    rim(c,rgb,a,w){c.save();c.strokeStyle=`rgba(${rgb},${a})`;c.lineWidth=w;c.stroke();c.restore();},
    /* a date palm (Phoenix dactylifera), sun from the right: leaf-base trunk, stiff blue-green fronds, dry fronds, dates */
    datePalm(c,r,x,y,h){
  const tw=h*.05,lean=(r()-.5)*h*.06,tx=x+lean,ty=y-h*.78;
  const tp=t=>[x+(tx-x)*t,y+(ty-y)*t],wd=t=>tw*(1.15-.35*t);
  c.fillStyle="#6a5844";c.beginPath();for(let i=0;i<=12;i++){const p=tp(i/12);c.lineTo(p[0]-wd(i/12),p[1]);}for(let i=12;i>=0;i--){const p=tp(i/12);c.lineTo(p[0]+wd(i/12),p[1]);}c.fill();
  const lit=c.createLinearGradient(x-tw,0,x+tw,0);lit.addColorStop(0,"rgba(30,20,10,.35)");lit.addColorStop(.6,"rgba(0,0,0,0)");lit.addColorStop(1,"rgba(255,214,150,.45)");c.fillStyle=lit;c.fill();
  /* leaf bases: a criss-cross of short diagonal ledges, each catching light on top */
  for(let i=1;i<40;i++){const t=i/40,p=tp(t),w=wd(t),s=(i%2?1:-1);c.strokeStyle="rgba(40,28,18,.3)";c.lineWidth=Math.max(.5,h*.004);c.beginPath();c.moveTo(p[0]-w,p[1]+w*.3*s);c.lineTo(p[0]+w,p[1]-w*.3*s);c.stroke();
    c.strokeStyle="rgba(230,196,140,.2)";c.beginPath();c.moveTo(p[0]-w*.2,p[1]-w*.05);c.lineTo(p[0]+w,p[1]-w*.3*s-w*.05);c.stroke();}
  /* dry fronds hanging under the crown */
  for(let f=0;f<9;f++){const a=Math.PI/2+(f/8-.5)*1.6,L=h*(.22+r()*.08);c.strokeStyle=`rgba(${120+r()*30|0},${92+r()*20|0},${58+r()*14|0},.9)`;c.lineWidth=Math.max(.6,h*.008);c.beginPath();c.moveTo(tx,ty+h*.02);c.quadraticCurveTo(tx+Math.cos(a)*L*.5,ty+L*.2,tx+Math.cos(a)*L*.6,ty+L*.9);c.stroke();}
  /* date clusters */
  for(let k=0;k<4;k++){const a=(k-1.5)*.6,dx=Math.sin(a)*h*.06,dy=h*.05;for(let n=0;n<16;n++){c.fillStyle=n%3?"#d98a2c":"#f0b24a";c.beginPath();c.arc(tx+dx+(r()-.5)*h*.035,ty+dy+r()*h*.06,h*.007,0,7);c.fill();}}
  /* green fronds, back to front: a curved midrib with stiff leaflets in a V */
  const fr=[];for(let f=0;f<34;f++){const a=-Math.PI/2+(r()-.5)*3.4,rise=Math.max(-.3,Math.cos((a+Math.PI/2)*.9));fr.push([a,rise,r()]);}
  fr.sort((p,q)=>Math.sin(p[0])-Math.sin(q[0]));
  fr.forEach(([a,rise,k])=>{const L=h*(.36+k*.14),droop=.25+(1-rise)*.7,pts=[];for(let i=0;i<=14;i++){const t=i/14;pts.push([tx+Math.cos(a)*L*t,ty+Math.sin(a)*L*t*.55-L*.25*rise*t+L*droop*t*t*.6]);}
    const sun=Math.cos(a)>0,base=sun?[118,140,98]:[72,92,72];
    c.strokeStyle=`rgb(${base[0]-20},${base[1]-20},${base[2]-16})`;c.lineWidth=Math.max(.6,h*.007);PAINT.helpers.line(c,pts);c.stroke();
    for(let i=2;i<14;i++){const[p0,p1]=[pts[i],pts[i+1]],dx=p1[0]-p0[0],dy=p1[1]-p0[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,len=h*.07*(1-i/18);
      [1,-1].forEach(sd=>{const v=.4+r()*.25;c.strokeStyle=`rgba(${base[0]+(r()*16|0)},${base[1]+(r()*16|0)},${base[2]+(r()*12|0)},.92)`;c.lineWidth=Math.max(.5,h*.004);c.beginPath();c.moveTo(p0[0],p0[1]);c.lineTo(p0[0]+(nx*sd+dx/l*v)*len,p0[1]+(ny*sd+dy/l*v)*len-len*.25);c.stroke();});}
    if(sun){c.strokeStyle="rgba(255,226,160,.45)";c.lineWidth=Math.max(.5,h*.004);PAINT.helpers.line(c,pts.slice(0,9));c.stroke();}});
},
    /* a loose flock in screen space: n birds wheeling round (cx,cy) by fractions of the frame, wings beating; s = bird size in px */
    flock(g,e,n,cx,cy,rx,ry,s,col,speed=1,seed=1){const T=e.T*speed;g.strokeStyle=col;g.lineCap="round";for(let k=0;k<n;k++){const ph=k*2.399+seed,a=T*.18+ph*.11,x=e.W*(cx+rx*Math.sin(a)+.03*Math.sin(ph*3+T*.5)),y=e.H*(cy+ry*Math.sin(a*1.6+ph)+.015*Math.cos(ph*5+T*.7)),f=Math.sin(T*(8+k%3)+ph)*s*.7,ss=s*(.7+.3*((k*.37)%1));
      g.lineWidth=Math.max(1,ss*.22);g.beginPath();g.moveTo(x-ss*1.5,y-f*.6);g.quadraticCurveTo(x-ss*.5,y-ss*.3-f*.2,x,y);g.quadraticCurveTo(x+ss*.5,y-ss*.3-f*.2,x+ss*1.5,y-f*.6);g.stroke();}},
    /* a bare tree in screen space */
    tree(c,r,x,y,h,col,w0,depth=6,bud){const limb=(x,y,a,len,w,d)=>{const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;c.strokeStyle=col;c.lineWidth=Math.max(.35,w);c.beginPath();c.moveTo(x,y);c.quadraticCurveTo((x+x2)/2+(r()-.5)*len*.18,(y+y2)/2+(r()-.5)*len*.12,x2,y2);c.stroke();
        if(d<=0||len<2){if(bud&&r()<.5){c.fillStyle=bud;c.fillRect(x2-.6,y2-.6,1.2,1.2);}return;}const n=r()<.35?3:2;for(let i=0;i<n;i++)limb(x2,y2,a+(i-(n-1)/2)*(.28+r()*.42)*1.4+(r()-.5)*.25-.04,len*(.66+r()*.16),w*.66,d-1);};
      const th=h*(.3+r()*.1);c.lineCap="round";c.strokeStyle=col;c.lineWidth=w0;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-th);c.stroke();const k=3+Math.floor(r()*2);for(let i=0;i<k;i++)limb(x,y-th*(.85+r()*.15),-Math.PI/2+(i-(k-1)/2)*.42+(r()-.5)*.3,h*(.26+r()*.1),w0*.62,depth);},
    /* a date palm in screen space: trunk rings and drooping fronds */
    palm(c,r,x,y,h,col,lit){const tx=x+(r()-.5)*h*.15,ty=y-h;c.strokeStyle=col;c.lineCap="round";for(let i=0;i<14;i++){const t0=i/14,t1=(i+1)/14;c.lineWidth=h*.05*(1-t0*.35);c.beginPath();c.moveTo(lerp(x,tx,t0*t0),lerp(y,ty,t0));c.lineTo(lerp(x,tx,t1*t1),lerp(y,ty,t1));c.stroke();}
      for(let f=0;f<15;f++){const a=-Math.PI/2+(f/14-.5)*Math.PI*1.7+(r()-.5)*.2,L=h*(.38+r()*.16),droop=.55+r()*.3;let px=tx,py=ty;c.lineWidth=Math.max(.6,h*.012);c.beginPath();c.moveTo(px,py);const pts=[];for(let k=1;k<=10;k++){const t=k/10,ang=a+droop*t*t*Math.sign(Math.cos(a)||1)*1.2;px=tx+Math.cos(a)*L*t;py=ty+Math.sin(a)*L*t+L*droop*t*t*.9;pts.push([px,py]);c.lineTo(px,py);}c.strokeStyle=col;c.stroke();
        pts.forEach(([qx,qy],k)=>{if(k<1)return;const l=h*.07*(1-k/12);c.lineWidth=Math.max(.4,h*.006);c.beginPath();c.moveTo(qx,qy);c.lineTo(qx-l*.4,qy+l);c.moveTo(qx,qy);c.lineTo(qx+l*.4,qy+l);c.stroke();});
        if(lit&&Math.cos(a)>0){c.strokeStyle=lit;c.lineWidth=Math.max(.4,h*.005);H.line(c,pts.slice(0,6));c.stroke();c.strokeStyle=col;}}}
  };

  /* texture tiles: fine speckle (single pixels, light and dark) and a soft large-scale mottle (a coarse random grid smoothed up) */
  let TT=null;
  function texTiles(c){if(TT)return TT;const r=rng(311);
    const f=document.createElement("canvas");f.width=f.height=128;const q=f.getContext("2d");for(let i=0;i<2600;i++){const v=r();q.fillStyle=v<.5?`rgba(0,0,0,${(.05+r()*.12).toFixed(3)})`:`rgba(255,255,255,${(.04+r()*.08).toFixed(3)})`;q.fillRect(r()*128|0,r()*128|0,1,1);}
    const s0=document.createElement("canvas");s0.width=s0.height=12;const q0=s0.getContext("2d");for(let y=0;y<12;y++)for(let x=0;x<12;x++){const v=r();q0.fillStyle=v<.5?`rgba(0,0,0,${(v*.22).toFixed(3)})`:`rgba(255,255,255,${((v-.5)*.14).toFixed(3)})`;q0.fillRect(x,y,1,1);}
    const m=document.createElement("canvas");m.width=m.height=300;const qm=m.getContext("2d");qm.imageSmoothingEnabled=true;qm.imageSmoothingQuality="high";qm.drawImage(s0,0,0,300,300);
    return TT={fine:c.createPattern(f,"repeat"),mottle:c.createPattern(m,"repeat")};}
  const list=[],acts=[];
  /* Touch: the page hands over a tap or the pointer's place (CSS px); the scene on screen answers through its own tap(x,y,env,H) and
     hot(x,y,env,H), both in canvas px. The engine itself still listens to nothing. */
  const ask=(fn,x,y)=>{for(const a of acts){const e=a.env();if(e&&a.def[fn]){const v=a.def[fn](x*e.dpr,y*e.dpr,e,H)||false;if(v&&fn==="tap")a.def._used=1;return v;}}return false;};
  const cue=()=>{for(const a of acts){const e=a.env();if(e){const c=a.def._used?"":typeof a.def.cue==="function"?a.def.cue(e):a.def.cue;return c||"";}}return "";};
  function scene(def){
    let box=null,cv,g,W=0,H2=0,dpr=1,t0=0,bakes=null,key="",cur=null;acts.push({def,env:()=>cur});
    const ensure=()=>{if(box)return;box=document.createElement("div");box.id=def.id;box.setAttribute("aria-hidden","true");box.style.cssText="display:none;position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;background:#0E1214";
      const m=document.getElementById("morph");m.parentNode.insertBefore(box,m);cv=document.createElement("canvas");cv.style.cssText="position:absolute;inset:0;width:100%;height:100%";box.appendChild(cv);g=cv.getContext("2d");t0=performance.now();};
    function size(){W=innerWidth;H2=innerHeight;dpr=Math.min(1.5,devicePixelRatio||1);cv.width=Math.round(W*dpr);cv.height=Math.round(H2*dpr);}
    /* bake one layer: its own bitmap with a margin, drawn through the projector at this moment */
    /* Blender plates (blender/src/<scene>.py): a layer with a plate draws that render instead of its painting, once loaded. A plate set
       (land: desktop, port: phones) says where its camera stood (C) and which world rectangle its images cover at depth zr; at a layer's own
       depth the rectangle scales about C. Until a plate loads the layer paints as before, then the scene re-bakes. */
    const PL={};
    function plateKey(){return innerWidth>=innerHeight?"land":"port";}
    function loadPlates(){const k=plateKey(),set=def.plates&&def.plates[k];if(!set||PL[k])return;PL[k]={};let n=0;const need=Object.keys(set.src).length;
      for(const[lay,src]of Object.entries(set.src)){const im=new Image();im.decoding="async";im.onload=()=>{PL[k][lay]=im;if(++n===need)def._dirty=1;};im.onerror=()=>console.warn("plate",src);im.src=src;}}
    function plate(L){const k=plateKey(),set=def.plates&&def.plates[k],im=L.plate&&PL[k]&&PL[k][L.plate];if(!im||Object.keys(PL[k]).length<Object.keys(set.src).length)return null;return{im,set};}
    function bake(L,proj){
      const m=.18,bw=Math.round(cv.width*(1+2*m)),bh=Math.round(cv.height*(1+2*m)),ox=cv.width*m,oy=cv.height*m;
      const bmp=document.createElement("canvas");bmp.width=bw;bmp.height=bh;const c=bmp.getContext("2d");c.lineCap="round";c.lineJoin="round";
      const P=(x,y,z)=>{const q=proj(x,y,z);return[q[0]*dpr+ox,q[1]*dpr+oy];};
      const env={W:bw,H:bh,dpr,ox,oy,P,u:(z)=>{const a=P(0,-2,z),b=P(1,-2,z);return Math.hypot(b[0]-a[0],b[1]-a[1]);}};
      const pt=plate(L);
      if(pt){const{C,zr,rect}=pt.set,k=(C[2]-L.z)/(C[2]-zr),X=x=>C[0]+(x-C[0])*k,Y=y=>C[1]+(y-C[1])*k,a=P(X(rect[0]),Y(rect[3]),L.z),b=P(X(rect[2]),Y(rect[1]),L.z);
        c.imageSmoothingQuality="high";c.drawImage(pt.im,a[0],a[1],b[0]-a[0],b[1]-a[1]);}
      else L.draw(c,env,rng(1+def.id.length*31+L.z*7|0));
      /* material: every painted surface gets fine grain and broad mottling (only where the layer painted), so no fill reads flat */
      {const m=pt?0:def.tex??.5;if(m>0){const T=texTiles(c);c.globalCompositeOperation="source-atop";c.globalAlpha=m;
        c.fillStyle=T.mottle;c.save();c.scale(bw/900,bw/900);c.fillRect(0,0,900,bh*900/bw);c.restore();c.fillStyle=T.fine;c.fillRect(0,0,bw,bh);c.globalAlpha=1;c.globalCompositeOperation="source-over";}}
      /* aerial perspective: farther layers take on the scene's air colour (tints only what the layer painted) */
      if(!pt&&def.air&&L.z<(def.air.z0||0)){const z0=def.air.z0||0,zmin=Math.min(...def.layers.map(l=>l.z)),f=clamp((z0-L.z)/((z0-zmin)||1));
        if(f>0){c.globalCompositeOperation="source-atop";const hg=c.createLinearGradient(0,0,0,bh);hg.addColorStop(0,`rgba(${def.air.rgb},${(def.air.k*f*1.15).toFixed(3)})`);hg.addColorStop(1,`rgba(${def.air.rgb},${(def.air.k*f*.75).toFixed(3)})`);c.fillStyle=hg;c.fillRect(0,0,bw,bh);c.globalCompositeOperation="source-over";}}
      const A=proj(0,-2,L.z),B=proj(1,-2,L.z);return{bmp,ox,oy,A,B};
    }
    function set(s,proj,cam){
      const [i0,i1,o0,o1]=def.win,a=sm(i0,i1,s)*(1-sm(o0,o1,s));
      if(def.plates&&s>i0-.08&&s<o1+.02)loadPlates();
      if(def._dirty){def._dirty=0;bakes=null;}
      if(a<=.002||!proj){cur=null;if(box){box.style.display="none";if(bakes&&(s<i0-.02||s>o1+.02)){bakes=null;key="";}}return;}
      ensure();if(cv.width!==Math.round(innerWidth*Math.min(1.5,devicePixelRatio||1))||W!==innerWidth||H2!==innerHeight){size();bakes=null;}
      box.style.display="block";box.style.opacity=a.toFixed(3);
      /* re-bake when the camera has moved far enough that the stretch would show */
      const r0=proj(0,-2,def.refZ||0),r1=proj(1,-2,def.refZ||0),k=Math.round(Math.log(Math.hypot(r1[0]-r0[0],r1[1]-r0[1]))*10);
      if(!bakes||k!==key){key=k;bakes=def.layers.map(L=>bake(L,proj));}
      const T=still?0:(performance.now()-t0)/1000,lp=clamp((s-def.s[0])/(def.s[1]-def.s[0]));
      const P=(x,y,z)=>{const q=proj(x,y,z);return[q[0]*dpr,q[1]*dpr];};
      const env={W:cv.width,H:cv.height,dpr,T,lp,s,P,cam,u:(z)=>{const a=P(0,-2,z),b=P(1,-2,z);return Math.hypot(b[0]-a[0],b[1]-a[1]);}};
      cur=a>.9?env:null;
      g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation="source-over";
      def.sky(g,env,H);
      def.layers.forEach((L,i)=>{const b=bakes[i],A=proj(0,-2,L.z),B=proj(1,-2,L.z);
        /* similarity from the baked reference pair to the live pair */
        const vx0=b.B[0]-b.A[0],vy0=b.B[1]-b.A[1],vx1=B[0]-A[0],vy1=B[1]-A[1],d0=vx0*vx0+vy0*vy0||1;
        const sc=(vx1*vx0+vy1*vy0)/d0,rot=(vy1*vx0-vx1*vy0)/d0;
        /* map baked pixel p -> live pixel: live = A*dpr + R*(p - (b.A*dpr + o)) */
        const ax=b.A[0]*dpr+b.ox,ay=b.A[1]*dpr+b.oy;
        g.setTransform(sc,rot,-rot,sc,A[0]*dpr-(sc*ax-rot*ay),A[1]*dpr-(rot*ax+sc*ay));
        g.drawImage(b.bmp,0,0);
        g.setTransform(1,0,0,1,0,0);
        if(def.live)def.live(g,env,H,i);
      });
      if(def.grade)def.grade(g,env,H);
      post(g,env);
      /* keep the chapter line readable */
      g.setTransform(1,0,0,1,0,0);const gr=g.createLinearGradient(0,cv.height*.6,0,cv.height);gr.addColorStop(0,"rgba(14,18,20,0)");gr.addColorStop(1,"rgba(14,18,20,.75)");g.fillStyle=gr;g.fillRect(0,cv.height*.6,cv.width,cv.height*.4);
    }
    /* shared finish for every scene: bloom from a blurred copy of the frame, a wash of light from the scene's sun or moon,
       a colour grade, vignette and fine film grain. Values per scene in def.look; all cheap (downscaled copies, no ctx.filter). */
    let bl1,bl2,gt;
    function post(g,e){const L=(typeof def.look=="function"?def.look(e,H):def.look)||{},w=e.W,h=e.H;g.setTransform(1,0,0,1,0,0);
      if(!bl1){bl1=document.createElement("canvas");bl2=document.createElement("canvas");}
      const b=(L.bloom??.22)*2;if(b>0){const w1=Math.max(8,w>>3),h1=Math.max(8,h>>3),w2=Math.max(4,w>>5),h2=Math.max(4,h>>5);
        if(bl1.width!==w1){bl1.width=w1;bl1.height=h1;bl2.width=w2;bl2.height=h2;}
        const q1=bl1.getContext("2d"),q2=bl2.getContext("2d");q1.globalCompositeOperation="copy";q1.drawImage(cvRef(),0,0,w1,h1);
        /* keep only the highlights: multiply the copy by itself twice (v^4), so lights bloom and mid-tones stay put */
        q1.globalCompositeOperation="multiply";q1.drawImage(bl1,0,0);q1.drawImage(bl1,0,0);q2.globalCompositeOperation="copy";q2.drawImage(bl1,0,0,w2,h2);q1.drawImage(bl2,0,0,w1,h1);
        g.globalCompositeOperation="screen";g.globalAlpha=b;g.imageSmoothingQuality="high";g.drawImage(bl1,0,0,w,h);g.globalAlpha=b*.6;g.drawImage(bl2,0,0,w,h);g.globalAlpha=1;}
      if(L.sun){const [sx,sy,rgb,a,rr]=L.sun,x=sx*w,y=sy*h,R=(rr||1)*Math.max(w,h);const gr=g.createRadialGradient(x,y,0,x,y,R);gr.addColorStop(0,`rgba(${rgb},${a})`);gr.addColorStop(.35,`rgba(${rgb},${a*.35})`);gr.addColorStop(1,`rgba(${rgb},0)`);g.globalCompositeOperation="screen";g.fillStyle=gr;g.fillRect(0,0,w,h);}
      if(L.grade){g.globalCompositeOperation="soft-light";g.fillStyle=L.grade;g.fillRect(0,0,w,h);}
      if(L.shade){g.globalCompositeOperation="multiply";const sg=g.createLinearGradient(0,0,0,h);sg.addColorStop(0,L.shade[0]);sg.addColorStop(1,L.shade[1]);g.fillStyle=sg;g.fillRect(0,0,w,h);}
      g.globalCompositeOperation="source-over";
      const v=L.vig??.42;if(v>0){const vg=g.createRadialGradient(w/2,h*.48,Math.min(w,h)*.35,w/2,h*.48,Math.hypot(w,h)*.62);vg.addColorStop(0,"rgba(8,10,14,0)");vg.addColorStop(1,`rgba(8,10,14,${v})`);g.fillStyle=vg;g.fillRect(0,0,w,h);}
      const n=L.grain??.05;if(n>0){if(!gt){const t=document.createElement("canvas");t.width=t.height=160;const q=t.getContext("2d"),id=q.createImageData(160,160),r=rng(97);for(let i=0;i<id.data.length;i+=4){const k=r()*255|0;id.data[i]=id.data[i+1]=id.data[i+2]=k;id.data[i+3]=255;}q.putImageData(id,0,0);gt=g.createPattern(t,"repeat");}
        g.globalCompositeOperation="overlay";g.globalAlpha=n;const ox=still?0:(Math.random()*160|0),oy=still?0:(Math.random()*160|0);g.translate(-ox,-oy);g.fillStyle=gt;g.fillRect(ox,oy,w,h);g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation="source-over";}
    }
    const cvRef=()=>cv;
    list.push(set);return set;
  }
  return{scene,helpers:H,list,poke:()=>{for(const a of acts){const e=a.env();if(e&&a.def.poke){a.def._used=1;return a.def.poke(e,H)||false;}}return false;},tap:(x,y)=>ask("tap",x,y),hot:(x,y)=>ask("hot",x,y),cue};
})();
window.PAINTED=PAINT.list;
