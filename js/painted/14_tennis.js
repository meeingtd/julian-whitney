/* Concord at 11, just back from Qatar: a public hard court on a clear October afternoon. After the desert everything is cooler and sharper:
   blue court, long shadows, maples turning behind the fence. He is alone at the near baseline with a basket of balls. This was the outlet.
   Touch: tap the court and he hits a ball to that spot; it clears the net, bounces and rolls out. Live: leaves coming down, the balls.
   One light: a low sun behind and left of the camera's view, so shadows run right and toward us. Units are roughly metres; ground is y -2. */
(()=>{
const G=-2,NZ=-10,FZ=-20,BZ=0,FEN=-24,HW=4.6,SW=3.45,SV=5.4,KID=[1.5,.9];
const balls=[];let swing=-9,lastT=0,pend=null;
const REST=[[-2.1,-3.2],[3.3,-12.6],[-.6,-17.4],[4.2,-21.8],[-3.4,-23.2],[.4,-23.4],[2.2,2.1]];
function ground(x,y,e){const{P}=e;let a=FEN+.4,b=3.2;if(y<=P(0,G,a)[1])return[null,a];for(let k=0;k<26;k++){const m=(a+b)/2;if(P(0,G,m)[1]<y)a=m;else b=m;}
  const p0=P(0,G,a)[0],p1=P(1,G,a)[0];return[(x-p0)/((p1-p0)||1),a];}
function maple(c,r,x,y,h,pal){const w=h*.42;c.strokeStyle="#2b221d";c.lineCap="round";c.lineWidth=Math.max(1,h*.035);c.beginPath();c.moveTo(x,y);c.lineTo(x+(r()-.5)*h*.04,y-h*.5);c.stroke();
  const bl=[];for(let i=0;i<170;i++){const a=r()*6.283,d=Math.pow(r(),.6),lobe=1+.22*Math.sin(a*5+x),bx=x+Math.cos(a)*d*w*lobe,by=y-h*.62+Math.sin(a)*d*h*.36*lobe;bl.push([bx,by,h*(.03+r()*.04),(bx-x)/w*.5+(by-(y-h*.62))/(h*.36)*.5]);}
  bl.sort((p,q)=>q[3]-p[3]);bl.forEach(([bx,by,br,sh])=>{const col=pal[Math.min(pal.length-1,Math.max(0,Math.floor((1-(sh+1)/2)*pal.length+(r()-.5)*2.2)))];c.fillStyle=col;c.beginPath();c.arc(bx,by,br,0,7);c.fill();});}
PAINT.scene({id:"p-tennis",win:CUTW("tennis"),s:[.222,.29],refZ:-10,tex:.42,
  air:{rgb:"176,200,224",k:.13,z0:-12},
  look(){return{bloom:.2,sun:[.04,.4,"255,238,206",.2,.75],grade:"rgba(176,206,255,.08)",vig:.3,grain:.05};},
  sky(g,e){const gr=g.createLinearGradient(0,0,0,e.H*.56);gr.addColorStop(0,"#27548c");gr.addColorStop(.5,"#6b9bc8");gr.addColorStop(.88,"#cfdfe4");gr.addColorStop(1,"#efe6cf");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    /* high thin cloud, the kind a cold front leaves */
    const r=PAINT.helpers.rng(8);for(let i=0;i<7;i++){const x=r()*e.W,y=e.H*(.08+r()*.26),w=e.W*(.12+r()*.2),cg=g.createLinearGradient(x-w,0,x+w,0);cg.addColorStop(0,"rgba(255,255,255,0)");cg.addColorStop(.5,`rgba(255,255,255,${(.1+r()*.12).toFixed(3)})`);cg.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=cg;g.fillRect(x-w,y,w*2,e.H*(.004+r()*.006));}},
  layers:[
    {z:-34,draw(c,e,r){const{P}=e;
      /* the ridge behind: white pines dark among maples and oaks at the turn */
      const hz=P(0,G,-80)[1];
      for(let i=0;i<60;i++){const x=-60+r()*120,z=-62-r()*14,b=P(x,G,z),u=e.u(z),h=u*(9+r()*7);c.fillStyle=r()<.5?"#3d5148":"#4a5a4a";c.beginPath();c.moveTo(b[0]-h*.16,b[1]);c.lineTo(b[0],b[1]-h);c.lineTo(b[0]+h*.16,b[1]);c.fill();}
      const far=["#f0c060","#e3a046","#d77a36","#c2552e","#9a4030","#6c4a34"];
      for(let i=0;i<54;i++){const x=-52+i*1.95+r()*1.4,z=-50-r()*8,b=P(x,G,z),u=e.u(z);maple(c,r,b[0],b[1],u*(8+r()*6),r()<.25?["#dfe08a","#c7c35a","#9aa24a","#6f7a3c"]:far);}
      /* a white clapboard house through the trees, as there is beside every town court */
      {const z=-46,u=e.u(z),a=P(-15,G,z),w=u*9,h=u*4.6;const wg=c.createLinearGradient(a[0],0,a[0]+w,0);wg.addColorStop(0,"#f2efe6");wg.addColorStop(1,"#b9c2cc");c.fillStyle=wg;c.fillRect(a[0],a[1]-h,w,h);
        c.fillStyle="#3a3f48";c.beginPath();c.moveTo(a[0]-u*.4,a[1]-h);c.lineTo(a[0]+w*.5,a[1]-h-u*2.6);c.lineTo(a[0]+w+u*.4,a[1]-h);c.fill();
        c.fillStyle="#7a3a30";c.fillRect(a[0]+w*.68,a[1]-h-u*2.9,u*.9,u*1.9);
        c.fillStyle="#2c3440";for(let k=0;k<4;k++)for(let j=0;j<2;j++)c.fillRect(a[0]+w*(.1+k*.22),a[1]-h*(.82-j*.42),u*.8,u*1.2);
        c.strokeStyle="rgba(90,100,112,.35)";c.lineWidth=1;for(let y=a[1]-h;y<a[1];y+=u*.28){c.beginPath();c.moveTo(a[0],y);c.lineTo(a[0]+w,y);c.stroke();}}
      c.fillStyle="#55683f";c.fillRect(0,hz,e.W,e.H-hz);
      for(let i=0;i<22;i++){const x=-40+i*3.7+r()*2,z=-33-r()*5,b=P(x,G,z),u=e.u(z);if(Math.abs(x+10.5)<5.5)continue;maple(c,r,b[0],b[1],u*(9+r()*5),i%4===1?["#f8dc72","#efbd4c","#d99a36","#a8742a","#6e5226"]:i%5===2?["#a8b45a","#86983f","#5f7434","#3f5230"]:["#f7b24c","#ee8436","#d9562c","#b23a24","#7c2a20","#4e2420"]);}
    }},
    {z:-10,draw(c,e,r){const{P}=e,H=PAINT.helpers,q=(pts)=>H.poly(c,pts.map(p=>P(p[0],G,p[1])));
      /* grass, then the green apron, then the blue court */
      const hz=P(0,G,-34)[1];const gg=c.createLinearGradient(0,hz,0,e.H);gg.addColorStop(0,"#6f8048");gg.addColorStop(.3,"#5f7440");gg.addColorStop(1,"#3f5230");c.fillStyle=gg;c.fillRect(0,hz,e.W,e.H-hz);
      for(let i=0;i<900;i++){const x=-30+r()*60,z=-33+r()*40;if(Math.abs(x)<9.4&&z>FEN-.4)continue;const p=P(x,G,z),u=e.u(z);c.fillStyle=["#d98a3a","#c85a30","#e8b84e","#8a5a34"][i%4];c.globalAlpha=.75;c.beginPath();c.ellipse(p[0],p[1],u*.09,u*.04,r()*3,0,7);c.fill();}c.globalAlpha=1;
      const ap=c.createLinearGradient(0,P(0,G,FEN)[1],0,e.H);ap.addColorStop(0,"#5d8c6c");ap.addColorStop(1,"#3f6b52");c.fillStyle=ap;q([[-9,FEN],[9,FEN],[9,7],[-9,7]]);c.fill();
      const ct=c.createLinearGradient(0,P(0,G,FZ)[1],0,P(0,G,BZ)[1]);ct.addColorStop(0,"#5e8fc0");ct.addColorStop(1,"#35679e");c.fillStyle=ct;q([[-HW,FZ],[HW,FZ],[HW,BZ],[-HW,BZ]]);c.fill();
      /* wear: the paint goes pale where feet land, behind each baseline and at the T */
      [[0,BZ+.3,3,.9],[0,FZ-.3,3,.9],[0,NZ+SV,1.4,.7],[0,NZ-SV,1.4,.7]].forEach(([x,z,rx,rz])=>{const p=P(x,G,z),u=e.u(z);H.shadow(c,p[0],p[1],u*rx,u*rz*.28,.16,"230,240,250");});
      /* hairline cracks, patched and painted over */
      c.strokeStyle="rgba(20,40,60,.22)";c.lineWidth=1;for(let i=0;i<7;i++){let x=-8+r()*16,z=FEN+2+r()*26;c.beginPath();c.moveTo(...P(x,G,z));for(let k=0;k<7;k++){x+=(r()-.5)*1.3;z+=.5+r()*.9;c.lineTo(...P(x,G,z));}c.stroke();}
      /* lines: 5 cm of white paint, wider toward us */
      const ln=(x0,z0,x1,z1)=>{const a=P(x0,G,z0),b=P(x1,G,z1),wa=Math.max(1,e.u(z0)*.06),wb=Math.max(1,e.u(z1)*.06),dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;c.fillStyle="rgba(244,246,240,.94)";H.poly(c,[[a[0]-nx*wa/2,a[1]-ny*wa/2],[b[0]-nx*wb/2,b[1]-ny*wb/2],[b[0]+nx*wb/2,b[1]+ny*wb/2],[a[0]+nx*wa/2,a[1]+ny*wa/2]]);c.fill();};
      [[-HW,FZ,HW,FZ],[-HW,BZ,HW,BZ],[-HW,FZ,-HW,BZ],[HW,FZ,HW,BZ],[-SW,FZ,-SW,BZ],[SW,FZ,SW,BZ],[-SW,NZ-SV,SW,NZ-SV],[-SW,NZ+SV,SW,NZ+SV],[0,NZ-SV,0,NZ+SV],[0,BZ,0,BZ-.25],[0,FZ,0,FZ+.25]].forEach(a=>ln(...a));
      /* long shadows of the trees off the left, raking across the court */
      c.fillStyle="rgba(16,34,60,.2)";for(let i=0;i<6;i++){const z=FEN+3+i*4.6+r()*2,w=1.2+r()*1.6;q([[-9,z],[-9,z+w],[9,z+w+5.5+r()],[9,z+5+r()]]);c.fill();}
      /* back fence: posts, top rail, chain link, and the dark windscreen on its lower half */
      const fence=(x0,z0,x1,z1,h)=>{const a=P(x0,G,z0),b=P(x1,G,z1),at=P(x0,G+h,z0),bt=P(x1,G+h,z1),am=P(x0,G+h*.55,z0),bm=P(x1,G+h*.55,z1);
        c.fillStyle="rgba(22,48,40,.82)";H.poly(c,[a,b,bm,am]);c.fill();
        c.save();H.poly(c,[am,bm,bt,at]);c.clip();c.strokeStyle="rgba(210,220,226,.22)";c.lineWidth=Math.max(.5,e.dpr*.6);const x0p=Math.min(a[0],b[0])-40,x1p=Math.max(a[0],b[0])+40,y0p=Math.min(at[1],bt[1])-4,y1p=Math.max(a[1],b[1]),st=Math.max(3,Math.abs(at[1]-am[1])*.09),hh=y1p-y0p;
        c.beginPath();for(let x=x0p-hh;x<x1p+hh;x+=st){c.moveTo(x,y0p);c.lineTo(x+hh,y1p);c.moveTo(x,y0p);c.lineTo(x-hh,y1p);}c.stroke();c.restore();
        c.strokeStyle="#aab4ba";c.lineWidth=Math.max(1,e.u(z0)*.05);c.beginPath();c.moveTo(...at);c.lineTo(...bt);c.stroke();
        const n=Math.round(Math.hypot(x1-x0,z1-z0)/3);for(let k=0;k<=n;k++){const t=k/n,x=x0+(x1-x0)*t,z=z0+(z1-z0)*t,p=P(x,G,z),pt=P(x,G+h,z);c.strokeStyle="#8f9aa2";c.lineWidth=Math.max(1,e.u(z)*.07);c.beginPath();c.moveTo(...p);c.lineTo(...pt);c.stroke();}};
      fence(-9,FEN,9,FEN,3.2);fence(-9,FEN,-9,5,3.2);fence(9,FEN,9,5,3.2);
      /* the net: posts outside the doubles lines, white band, black mesh, centre strap, and its shadow thrown toward us */
      c.fillStyle="rgba(14,30,54,.3)";q([[-HW-.5,NZ],[HW+.5,NZ],[HW+1.3,NZ+1.3],[-HW+.3,NZ+1.3]]);c.fill();
      const nl=P(-HW-.5,G,NZ),nr=P(HW+.5,G,NZ),tl=P(-HW-.5,G+1.07,NZ),tr=P(HW+.5,G+1.07,NZ),tc=P(0,G+.914,NZ);
      c.save();c.beginPath();c.moveTo(...nl);c.lineTo(...tl);c.quadraticCurveTo(tc[0],tc[1]+(tc[1]-tl[1]),tr[0],tr[1]);c.lineTo(...nr);c.closePath();c.fillStyle="rgba(16,20,26,.34)";c.fill();c.clip();
      c.strokeStyle="rgba(10,12,16,.5)";c.lineWidth=Math.max(.5,e.dpr*.5);const ms=Math.max(2.5,(nl[1]-tl[1])*.075);c.beginPath();for(let x=nl[0];x<nr[0];x+=ms){c.moveTo(x,tl[1]-2);c.lineTo(x,nl[1]);}for(let y=tl[1];y<nl[1];y+=ms){c.moveTo(nl[0],y);c.lineTo(nr[0],y);}c.stroke();c.restore();
      c.strokeStyle="#f4f4ee";c.lineWidth=Math.max(1.5,e.u(NZ)*.07);c.beginPath();c.moveTo(...tl);c.quadraticCurveTo(tc[0],tc[1]+(tc[1]-tl[1]),tr[0],tr[1]);c.stroke();
      c.lineWidth=Math.max(1,e.u(NZ)*.05);c.beginPath();c.moveTo(...tc);c.lineTo(...P(0,G,NZ));c.stroke();
      [[nl,tl],[nr,tr]].forEach(([b,t])=>{c.strokeStyle="#22262c";c.lineWidth=Math.max(2,e.u(NZ)*.09);c.beginPath();c.moveTo(...b);c.lineTo(t[0],t[1]-e.u(NZ)*.06);c.stroke();});
      /* balls already hit, lying where they stopped */
      REST.slice(0,6).forEach(([x,z])=>ball(c,e,x,G+.05,z));
    }},
    {z:1,draw(c,e,r){const{P}=e,H=PAINT.helpers;
      /* the hopper beside him */
      {const[x,z]=[KID[0]+1.15,KID[1]+.25],b=P(x,G,z),u=e.u(z);H.cast(c,b[0],b[1],u*.36,u*.8,1.5,.14,.28,"12,28,52");
        c.strokeStyle="#2c3138";c.lineWidth=Math.max(1.5,u*.022);[-.17,.17].forEach(o=>{c.beginPath();c.moveTo(b[0]+o*u,b[1]);c.lineTo(b[0]+o*u*.9,b[1]-u*.42);c.stroke();});
        const y0=b[1]-u*.42,y1=b[1]-u*.72,w=u*.2;c.fillStyle="rgba(30,34,40,.35)";c.fillRect(b[0]-w,y1,w*2,y0-y1);
        for(let i=0;i<26;i++){const bx=b[0]-w*.82+r()*w*1.64,by=y1-u*.02+r()*(y0-y1)*.86;c.fillStyle=r()<.5?"#d6ea4c":"#c2d83e";c.beginPath();c.arc(bx,by,u*.036,0,7);c.fill();}
        c.strokeStyle="#3a4048";c.lineWidth=Math.max(1,u*.012);for(let k=0;k<=6;k++){c.beginPath();c.moveTo(b[0]-w+k*w/3,y1);c.lineTo(b[0]-w+k*w/3,y0);c.stroke();}for(let k=0;k<=3;k++){c.beginPath();c.moveTo(b[0]-w,y1+k*(y0-y1)/3);c.lineTo(b[0]+w,y1+k*(y0-y1)/3);c.stroke();}
        c.beginPath();c.moveTo(b[0]-w,y1);c.quadraticCurveTo(b[0],y1-u*.34,b[0]+w,y1);c.stroke();}
      ball(c,e,REST[6][0],G+.05,REST[6][1]);
      /* a maple leaning in over the corner of the frame, close enough to count the leaves */
      const lf=["#f6b24a","#ee8a36","#dd5a2c","#b83a26","#f8d36a"];c.strokeStyle="#2a201c";c.lineCap="round";
      const br=(x,y,a,len,w,d)=>{const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;c.strokeStyle="#2a201c";c.lineWidth=w;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo((x+x2)/2,(y+y2)/2+len*.08,x2,y2);c.stroke();
        if(d<3)for(let i=0;i<6;i++){const t=r(),lx=x+(x2-x)*t+(r()-.5)*len*.3,ly=y+(y2-y)*t+(r()-.2)*len*.3,s=e.H*(.011+r()*.01),ro=r()*6.3;c.save();c.translate(lx,ly);c.rotate(ro);c.fillStyle=lf[(r()*lf.length)|0];c.beginPath();c.moveTo(0,-s);c.lineTo(s*.45,-s*.3);c.lineTo(s*.95,-s*.35);c.lineTo(s*.5,.1*s);c.lineTo(s*.6,s*.8);c.lineTo(0,s*.45);c.lineTo(-s*.6,s*.8);c.lineTo(-s*.5,.1*s);c.lineTo(-s*.95,-s*.35);c.lineTo(-s*.45,-s*.3);c.closePath();c.fill();c.restore();}
        if(d>0)for(let i=0;i<2;i++)br(x2,y2,a+(i?.5:-.35)+(r()-.5)*.3,len*.66,w*.62,d-1);};
      {const S=Math.min(e.W,e.H*1.7);br(e.W*1.02,e.H*.06,Math.PI*.93,S*.2,e.H*.012,4);br(e.W*1.02,e.H*.2,Math.PI*.82,S*.13,e.H*.008,3);}
    }}
  ],
  cue:"the court to hit a ball",
  poke(e){const p=e.P(-1.5+3*((e.T*7)%1),G,-15);return this.tap(p[0],p[1],e);},
  hot(x,y,e){return y>e.P(0,G,FEN)[1];},
  tap(x,y,e){let[tx,tz]=ground(x,y,e);if(tx===null){tx=(x/e.W-.5)*8;tz=FZ-2;}tx=Math.max(-8.4,Math.min(8.4,tx));tz=Math.min(tz,KID[1]-1.5);
    swing=e.T;pend={at:e.T+.2,tx,tz};if(e.T===0){balls.push({x:tx,y:G+.05,z:tz,vx:0,vy:0,vz:0,rest:1});pend=null;}return true;},
  live(g,e,H,i){const{P,T}=e;if(i!==2)return;const dt=Math.min(.05,Math.max(0,T-lastT));lastT=T;
    /* a hit leaves the strings at the top of the swing */
    if(pend&&T>=pend.at){const x0=KID[0]+.75,y0=G+1,z0=KID[1]-.5,g2=13;let d=Math.max(.5,Math.min(1.15,Math.hypot(pend.tx-x0,pend.tz-z0)/17));
      for(let k=0;k<8;k++){const vy=(G+.05-y0+.5*g2*d*d)/d,tn=(NZ-z0)/((pend.tz-z0)/d);if(pend.tz>NZ||tn<=0||y0+vy*tn-.5*g2*tn*tn>G+1.35)break;d+=.12;}
      balls.push({x:x0,y:y0,z:z0,vx:(pend.tx-x0)/d,vz:(pend.tz-z0)/d,vy:(G+.05-y0+.5*13*d*d)/d,rest:0});if(balls.length>14)balls.shift();pend=null;}
    balls.forEach(b=>{if(b.rest)return;b.x+=b.vx*dt;b.z+=b.vz*dt;if(b.roll){const f=Math.exp(-1.5*dt);b.vx*=f;b.vz*=f;if(Math.hypot(b.vx,b.vz)<.08)b.rest=1;}
      else{b.vy-=13*dt;b.y+=b.vy*dt;if(b.y<G+.05){b.y=G+.05;b.vy=-b.vy*.6;b.vx*=.74;b.vz*=.74;if(b.vy<1.1){b.vy=0;b.roll=1;}}}
      if(b.z<FEN+.15){b.z=FEN+.15;b.vz=-b.vz*.25;b.vx*=.5;}if(Math.abs(b.x)>8.85){b.x=Math.sign(b.x)*8.85;b.vx=-b.vx*.25;}});
    const sw=H.clamp((T-swing)/.62);
    balls.filter(b=>b.z<=KID[1]).forEach(b=>ball(g,e,b.x,b.y,b.z));
    kid(g,e,H,sw);
    /* leaves letting go, a few at a time */
    for(let k=0;k<16;k++){const ph=k*1.618,cyc=((T*(.035+.012*(k%4))+ph)%1),x=e.W*(((ph*.37)%1)+.06*Math.sin(T*.9+ph*3)-.08*cyc),y=e.H*(-.05+cyc*.75),s=e.H*(.006+.004*(k%3));if(y>e.H*(.5+.2*((k*.31)%1)))continue;
      g.save();g.translate(x,y);g.rotate(T*(1.2+k%3)+ph);g.scale(1,.45+.5*Math.abs(Math.sin(T*2+ph)));g.fillStyle=["#f0a040","#de5e2c","#f6cf5e","#b83a26"][k%4];g.beginPath();g.ellipse(0,0,s,s*.7,0,0,7);g.fill();g.restore();}
  }
});
function ball(c,e,x,y,z){const p=e.P(x,y,z),u=e.u(z),r=Math.max(1.6*e.dpr,u*.05),h=y-G-.05,s=e.P(x+h*1.1,G,z+h*.35);
  PAINT.helpers.shadow(c,s[0],s[1],r*1.5,r*.55,.42/(1+h*.5),"10,26,50");
  c.fillStyle="#cfe544";c.beginPath();c.arc(p[0],p[1],r,0,7);c.fill();const gr=c.createRadialGradient(p[0]-r*.4,p[1]-r*.4,0,p[0],p[1],r);gr.addColorStop(0,"rgba(255,255,220,.75)");gr.addColorStop(.5,"rgba(255,255,220,0)");gr.addColorStop(1,"rgba(60,90,20,.4)");c.fillStyle=gr;c.fill();}
/* him, from behind, right-handed. sw 0..1 is one forehand: racquet back, through the ball, finish over the left shoulder, recover. */
function kid(g,e,H,sw){const{P}=e,f=P(KID[0],G,KID[1]),u=e.u(KID[1]),h=u*1.46,x=f[0],y=f[1];
  const k=sw<=0||sw>=1?0:Math.sin(Math.PI*Math.min(1,sw*1.25)),lean=k*h*.04,th=sw<=0||sw>=1?.95:sw<.18?H.lerp(.95,.35,sw/.18):sw<.5?H.lerp(.35,-2.5,H.sm(.18,.5,sw)):H.lerp(-2.5,.95,H.sm(.55,1,sw));
  H.cast(g,x,y,h*.26,h*.95,1.5,.14,.34,"12,28,52");
  const skin="#c9997a",skinS="#a9785c";
  /* legs and shoes: a split stance, weight going onto the front foot through the swing */
  [[-1,.1-k*.05],[1,.11+k*.03]].forEach(([sd,sp])=>{const fx=x+sd*h*sp,hx=x+sd*h*.055-lean;g.strokeStyle=sd<0?skin:skinS;g.lineCap="round";g.lineWidth=h*.062;g.beginPath();g.moveTo(hx,y-h*.46);g.quadraticCurveTo(hx+sd*h*.02,y-h*.25,fx,y-h*.045);g.stroke();
    g.fillStyle="#f1f1ec";g.fillRect(fx-h*.033,y-h*.12,h*.066,h*.06);g.fillStyle="#e9e9e4";g.beginPath();g.ellipse(fx,y-h*.025,h*.05,h*.03,0,0,7);g.fill();g.fillStyle="#3a4a66";g.fillRect(fx-h*.05,y-h*.012,h*.1,h*.012);});
  /* shorts, shirt lit from the left */
  g.fillStyle="#22304a";H.poly(g,[[x-h*.105-lean,y-h*.53],[x+h*.105-lean,y-h*.53],[x+h*.12-lean,y-h*.39],[x+h*.005-lean,y-h*.385],[x-lean,y-h*.42],[x-h*.005-lean,y-h*.385],[x-h*.12-lean,y-h*.39]]);g.fill();
  const sx=x-lean*1.6,sg=g.createLinearGradient(sx-h*.13,0,sx+h*.13,0);sg.addColorStop(0,"#ffffff");sg.addColorStop(.45,"#e9edf2");sg.addColorStop(1,"#b3bfd0");g.fillStyle=sg;
  g.beginPath();g.moveTo(sx-h*.1,y-h*.5);g.lineTo(sx-h*.125,y-h*.78);g.quadraticCurveTo(sx,y-h*.84,sx+h*.125,y-h*.78);g.lineTo(sx+h*.1,y-h*.5);g.closePath();g.fill();
  /* off arm, out for balance */
  g.strokeStyle=skin;g.lineWidth=h*.045;g.beginPath();g.moveTo(sx-h*.12,y-h*.765);g.quadraticCurveTo(sx-h*(.17+k*.05),y-h*.64,sx-h*(.15+k*.1),y-h*(.52+k*.12));g.stroke();
  /* neck, head, hair */
  g.fillStyle=skinS;g.fillRect(sx-h*.028,y-h*.86,h*.056,h*.06);g.fillStyle="#4a3526";g.beginPath();g.arc(sx,y-h*.925,h*.078,0,7);g.fill();g.fillStyle="rgba(255,226,180,.3)";g.beginPath();g.arc(sx-h*.025,y-h*.945,h*.05,0,7);g.fill();
  g.fillStyle=skin;g.beginPath();g.ellipse(sx-h*.076,y-h*.915,h*.014,h*.022,0,0,7);g.ellipse(sx+h*.076,y-h*.915,h*.014,h*.022,0,0,7);g.fill();
  /* hitting arm and racquet */
  const shx=sx+h*.12,shy=y-h*.765,ax=shx+Math.cos(th)*h*.27,ay=shy+Math.sin(th)*h*.27,rx=ax+Math.cos(th-.25)*h*.2,ry=ay+Math.sin(th-.25)*h*.2,cx=rx+Math.cos(th-.25)*h*.13,cy=ry+Math.sin(th-.25)*h*.13;
  g.strokeStyle=skinS;g.lineWidth=h*.045;g.beginPath();g.moveTo(shx,shy);g.lineTo(ax,ay);g.stroke();
  g.strokeStyle="#1e2228";g.lineWidth=h*.022;g.beginPath();g.moveTo(ax,ay);g.lineTo(rx,ry);g.stroke();
  g.save();g.translate(cx,cy);g.rotate(th-.25);g.fillStyle="rgba(240,244,250,.2)";g.strokeStyle="#c8392e";g.lineWidth=h*.018;g.beginPath();g.ellipse(0,0,h*.13,h*.095,0,0,7);g.fill();g.stroke();
  g.strokeStyle="rgba(240,244,250,.4)";g.lineWidth=Math.max(.5,h*.004);g.beginPath();for(let t=-3;t<=3;t++){g.moveTo(-h*.12,t*h*.024);g.lineTo(h*.12,t*h*.024);g.moveTo(t*h*.034,-h*.085);g.lineTo(t*h*.034,h*.085);}g.stroke();g.restore();}
})();
