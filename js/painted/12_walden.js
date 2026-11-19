/* Concord: Walden Pond on a winter afternoon going to dusk, seen from out on the frozen pond. The far shore is the main beach under a snowy
   hill of white pine, hemlock and bare oak; the low sun sets behind the ridge; the ice is snow-covered with patches of clear black ice that
   hold the sky. Two skaters loop far out, crows cross, a little snow drifts. At the end the family car on the shore road turns its headlights
   on toward us, and the cut goes into those lights (CUTX .222). World: ice at y -2 from z 3 back to the shore at z -30; ridge to z -60. */
(()=>{
const SHORE=-30,CAR=[1.5,-1.86,-27.5];
const stones=[]; /* touch: a stone skimmed out across the ice */
function iceAt(x,y,e){let a=SHORE+1,b=Math.min(3,e.cam.z-2.5);if(y<=e.P(0,-2,a)[1])return null;for(let k=0;k<26;k++){const m=(a+b)/2;if(e.P(0,-2,m)[1]<y)a=m;else b=m;}const p0=e.P(0,-2,a)[0],p1=e.P(1,-2,a)[0];return[(x-p0)/((p1-p0)||1),a];}
const ridge=(x,k)=>Math.sin(x*.11+k)*1.1+Math.sin(x*.27+k*2)*.5+Math.sin(x*.05+k*3)*1.6;
/* a white pine or hemlock in screen space: tiers of soft-edged boughs, dark green, snow lying on each tier */
function pine(c,r,x,y,h,dark,snow){
  const w=h*.34,n=6+Math.floor(r()*3);
  c.fillStyle=dark;c.fillRect(x-h*.012,y-h*.15,h*.024,h*.15);
  for(let i=0;i<n;i++){const t=i/n,ty=y-h*(.12+t*.86),tw=w*(1-t*.82)*(.8+r()*.4),th=h*.2;
    c.fillStyle=dark;c.beginPath();c.moveTo(x-tw,ty);for(let k=0;k<=6;k++){const f=k/6;c.lineTo(x-tw+f*tw*2,ty-(k%2?th*.12:0)+(r()-.5)*th*.08);}c.lineTo(x,ty-th);c.closePath();c.fill();
    {c.fillStyle="rgba(255,196,160,.16)";c.beginPath();c.moveTo(x-tw,ty);c.lineTo(x-tw*.55,ty-th*.1);c.lineTo(x-tw*.05,ty-th*.92);c.lineTo(x,ty-th);c.closePath();c.fill();
      c.fillStyle="rgba(10,16,30,.22)";c.beginPath();c.moveTo(x+tw,ty);c.lineTo(x+tw*.4,ty-th*.15);c.lineTo(x,ty-th);c.lineTo(x+tw*.1,ty-th*.5);c.closePath();c.fill();}
    if(snow){c.fillStyle=snow;c.beginPath();c.moveTo(x-tw*.85,ty-th*.18);c.quadraticCurveTo(x,ty-th*.5,x+tw*.7,ty-th*.2);c.quadraticCurveTo(x,ty-th*.36,x-tw*.85,ty-th*.18);c.fill();}}
}
PAINT.scene({id:"p-walden",win:CUTW("walden"),s:[.16,.222],refZ:-12,
  /* Blender plates (blender/src/walden.py): each layer below draws its render once loaded; the painting is the fallback */
  plates:{land:{C:[0.0, 0.5, 9.3],zr:-32,rect:[-56.1278, -22.8871, 56.1278, 23.8861],src:{far:"media/plates/walden/land_far.webp",shore:"media/plates/walden/land_shore.webp",ice:"media/plates/walden/land_ice.webp",near:"media/plates/walden/land_near.webp"}},
    port:{C:[0.0, 0.45, 14.0],zr:-32,rect:[-37.4227, -36.9727, 37.4227, 37.8727],src:{far:"media/plates/walden/port_far.webp",shore:"media/plates/walden/port_shore.webp",ice:"media/plates/walden/port_ice.webp",near:"media/plates/walden/port_near.webp"}}},
  /* one light: the low sun behind the ridge, left of centre; everything casts long blue shadows toward camera right */
  air:{rgb:"178,168,200",k:.42,z0:-20},
  look(e,H){const d=H.sm(.3,1,e.lp),sp=e.P(-11,H.lerp(1.6,-.4,e.lp),-70);return{bloom:.26,sun:[sp[0]/e.W,sp[1]/e.H,"255,196,150",.22*(1-d*.7),.7],grade:`rgba(${H.lerp(255,120,d)|0},${H.lerp(180,130,d)|0},${H.lerp(150,190,d)|0},.22)`,vig:.38,grain:.05};},
  sky(g,e,H){
    const{W,H:Hh,lp,T}=e,dusk=H.sm(.3,1,lp);
    const q=g.createLinearGradient(0,0,0,Hh*.62);
    q.addColorStop(0,`rgb(${H.lerp(54,22,dusk)|0},${H.lerp(78,34,dusk)|0},${H.lerp(120,70,dusk)|0})`);
    q.addColorStop(.55,`rgb(${H.lerp(150,98,dusk)|0},${H.lerp(140,92,dusk)|0},${H.lerp(170,128,dusk)|0})`);
    q.addColorStop(.85,`rgb(${H.lerp(236,214,dusk)|0},${H.lerp(170,126,dusk)|0},${H.lerp(140,112,dusk)|0})`);
    q.addColorStop(1,`rgb(${H.lerp(250,232,dusk)|0},${H.lerp(198,150,dusk)|0},${H.lerp(150,120,dusk)|0})`);
    g.fillStyle=q;g.fillRect(0,0,W,Hh);
    /* the low sun, sinking behind the ridge to the left; thin cloud streaks lit underneath */
    const sp=e.P(-11,H.lerp(1.6,-.4,lp),-70),sr=e.u(-70)*1.1;
    g.globalCompositeOperation="lighter";H.glow(g,"255,190,130",sp[0],sp[1],sr*14,.55*(1-dusk*.6));H.glow(g,"255,236,200",sp[0],sp[1],sr*2.2,.95*(1-dusk*.5));g.globalCompositeOperation="source-over";
    for(let i=0;i<6;i++){const y=Hh*(.16+i*.07),x=W*(.1+((i*.37)%1)*.7);g.fillStyle=`rgba(${255-i*8},${170+i*6},${150+i*8},${(.14*(1-dusk*.5)).toFixed(3)})`;g.beginPath();g.ellipse(x+Math.sin(T*.02+i)*W*.01,y,W*(.16+i*.02),Hh*.008,0,0,7);g.fill();}
  },
  layers:[
    /* the far ridge, beyond the pond: hazy, violet, a fringe of pines along its top */
    {z:-60,plate:"far",draw(c,e,r){const{P}=e,u=e.u(-60);
      c.fillStyle="#8b85a6";c.beginPath();let a=P(-80,-2,-60);c.moveTo(a[0],a[1]+u*4);for(let x=-80;x<=80;x+=1){const p=P(x,-.4+ridge(x,1)*.8,-60);c.lineTo(p[0],p[1]);}a=P(80,-2,-60);c.lineTo(a[0],a[1]+u*4);c.fill();
      for(let x=-80;x<=80;x+=.6){const p=P(x,-.4+ridge(x,1)*.8,-60);const h=u*(.6+r()*.7);c.fillStyle="rgba(110,104,136,.9)";c.beginPath();c.moveTo(p[0]-h*.22,p[1]+1);c.lineTo(p[0],p[1]-h);c.lineTo(p[0]+h*.22,p[1]+1);c.fill();}
    }},
    /* the shore: a snowy hill of pines and bare oaks, the beach below it, the road along the beach, the bathhouse */
    {z:-32,plate:"shore",draw(c,e,r){const{P}=e,u=e.u(-32),poly=PAINT.helpers.poly;
      const top=x=>-2+2.6+Math.max(0,ridge(x,3))*1.3+(Math.abs(x)>10?Math.min(3.4,(Math.abs(x)-10)*.16):0);
      /* the hillside: snow under the trees, shaded blue away from the sun */
      let q=c.createLinearGradient(0,P(0,2.5,-34)[1],0,P(0,-2,-31)[1]);q.addColorStop(0,"#b9b3c8");q.addColorStop(1,"#dcd6e2");c.fillStyle=q;
      c.beginPath();let a=P(-70,-2,-31);c.moveTo(a[0],a[1]);for(let x=-70;x<=70;x+=.5){const p=P(x,top(x),-34);c.lineTo(p[0],p[1]);}a=P(70,-2,-31);c.lineTo(a[0],a[1]);c.fill();
      /* the woods: bare oaks behind, then pines in front, denser away from the beach */
      for(let i=0;i<110;i++){const x=-70+r()*140,b=P(x,top(x)-.3-r()*.6,-34-r()*3);PAINT.helpers.tree(c,r,b[0],b[1],u*(3.4+r()*2.2),"rgba(84,70,78,.85)",u*.06,5);}
      for(let i=0;i<260;i++){const x=-70+r()*140;if(Math.abs(x-2)<5&&r()<.85)continue;const y=top(x)-.2-r()*Math.max(.2,top(x)+1.6)*.9,b=P(x,y,-33.5+r()*2);
        const sh=Math.abs(x+11)<20?.9:.75;{const hh=u*(2.4+r()*2.6)*.5;PAINT.helpers.shadow(c,b[0]+hh*.5,b[1]+u*.06,hh*.7,u*.12,.32,"90,92,140");}pine(c,r,b[0],b[1],u*(2.4+r()*2.6),`rgba(${24*sh|0},${40*sh|0},${36*sh|0},.96)`,"rgba(236,232,240,.85)");}
      /* the beach: sand under snow, a gentle bank, the road above it and the bathhouse with one lit window */
      q=c.createLinearGradient(0,P(0,-1.5,-31)[1],0,P(0,-2,-30)[1]);q.addColorStop(0,"#ece6ee");q.addColorStop(1,"#f6eef0");c.fillStyle=q;
      poly(c,[P(-6,-2,-30),P(-5,-1.55,-31),P(10,-1.55,-31),P(12,-2,-30)]);c.fill();
      c.fillStyle="rgba(120,110,130,.45)";poly(c,[P(-5,-1.6,-31),P(10,-1.6,-31),P(10,-1.52,-31.4),P(-5,-1.52,-31.4)]);c.fill();
      {const b0=P(6,-1.55,-31.6),b1=P(8.6,-.6,-31.6);PAINT.helpers.cast(c,(b0[0]+b1[0])/2,b0[1],b1[0]-b0[0],(b0[1]-b1[1]),1.1,.12,.35,"80,84,130");c.fillStyle="#7a6a64";c.fillRect(b0[0],b1[1],b1[0]-b0[0],b0[1]-b1[1]);
        c.fillStyle="#e8e2ea";poly(c,[P(5.8,-.6,-31.6),P(7.3,-.15,-31.6),P(8.8,-.6,-31.6)]);c.fill();
        const w0=P(6.5,-1.25,-31.5),w1=P(7,-.9,-31.5);c.fillStyle="#ffcf88";c.fillRect(w0[0],w1[1],w1[0]-w0[0],w0[1]-w1[1]);}
      /* the shoreline itself: a soft blue shadow where the bank meets the ice, no hard edge */
      a=P(-70,-2,-30);const b=P(70,-2,-30);q=c.createLinearGradient(0,a[1]-u*.25,0,a[1]+u*.25);q.addColorStop(0,"rgba(150,150,180,0)");q.addColorStop(.5,"rgba(150,150,180,.35)");q.addColorStop(1,"rgba(150,150,180,0)");c.fillStyle=q;c.fillRect(Math.min(a[0],b[0]),a[1]-u*.25,Math.abs(b[0]-a[0]),u*.5);
    }},
    /* the ice: wind-packed snow over the pond, clear black ice in patches holding the sky, skate tracks, a pressure ridge */
    {z:-6,plate:"ice",draw(c,e,r){const{P}=e,poly=PAINT.helpers.poly;
      const n0=P(-90,-2,SHORE),n1=P(-90,-2,3);
      let q=c.createLinearGradient(0,n0[1],0,n1[1]);q.addColorStop(0,"#e6d4d8");q.addColorStop(.25,"#d8d2e0");q.addColorStop(1,"#c9d2e2");c.fillStyle=q;
      poly(c,[P(-90,-2,SHORE),P(90,-2,SHORE),P(90,-2,3),P(-90,-2,3)]);c.fill();
      /* clear ice: dark, glossy, the warm sky in it */
      for(let i=0;i<16;i++){const x=-24+r()*48,z=-26+r()*24,rx=1+r()*4,rz=.5+r()*1.6,pts=[];for(let k=0;k<16;k++){const a=k/16*6.283,w=1+.25*Math.sin(a*3+i);pts.push(P(x+Math.cos(a)*rx*w,-2,z+Math.sin(a)*rz*w));}
        const ys=pts.map(p=>p[1]),y0=Math.min(...ys),y1=Math.max(...ys);q=c.createLinearGradient(0,y0,0,y1);q.addColorStop(0,"rgba(90,80,110,.3)");q.addColorStop(.5,"rgba(196,150,150,.24)");q.addColorStop(1,"rgba(70,76,100,.28)");c.fillStyle=q;poly(c,pts);c.fill();}
      /* wind drifts, long and soft across the pond */
      for(let i=0;i<70;i++){const x=-40+r()*80,z=-28+r()*28,l=1.5+r()*6,pts=[];for(let k=0;k<12;k++){const a=k/12*6.283;pts.push(P(x+Math.cos(a)*l,-2,z+Math.sin(a)*.18));}c.fillStyle=`rgba(250,246,250,${(.18+r()*.2).toFixed(2)})`;poly(c,pts);c.fill();}
      /* skate tracks: faint looping curves, cut into the snow and shadowed blue */
      c.lineWidth=1;for(let i=0;i<26;i++){const x=-14+r()*28,z=-22+r()*14,R=1+r()*4,a0=r()*6.28;c.strokeStyle=`rgba(120,128,160,${(.12+r()*.12).toFixed(2)})`;c.beginPath();for(let k=0;k<=24;k++){const a=a0+k/24*3.6,p=P(x+Math.cos(a)*R*1.6,-2,z+Math.sin(a)*R*.5);k?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);}c.stroke();}
      /* wind-packed snow has a crust that glitters: tiny bright points, denser near us */
      for(let k=0;k<900;k++){const z=-28+Math.pow(r(),.6)*30,p=P(-30+r()*60,-2,z);c.fillStyle=`rgba(255,250,244,${(.25+r()*.5).toFixed(2)})`;const s=Math.max(.6,e.u(z)*.012);c.fillRect(p[0],p[1],s,s);}
      /* footprints out from the beach to where we stand */
      for(let k=0;k<40;k++){const t=k/40,x=H0(t),z=lerp0(-29,1.5,t),p=P(x+(k%2?.12:-.12),-2,z),s=e.u(z)*.06;c.fillStyle="rgba(110,118,150,.4)";c.beginPath();c.ellipse(p[0],p[1],s*1.3,s*.45,0,0,7);c.fill();}
    }},
    /* near: a white pine bough hanging into the top left of the frame, snow on it, and the edge of a drift at our feet */
    {z:1,plate:"near",draw(c,e,r){const{P}=e,u=e.u(1);
      const base=P(-6.4,4.6,1);c.strokeStyle="#1c2620";c.lineCap="round";
      const bough=(x,y,a,l,w,d)=>{if(d>3)return;const x2=x+Math.cos(a)*l,y2=y+Math.sin(a)*l;c.lineWidth=w;c.strokeStyle="#241d18";c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();
        /* needles in bunches of five, long and soft, and snow resting on top */
        for(let k=0;k<22;k++){const t=k/22,px=x+(x2-x)*t,py=y+(y2-y)*t;for(let n=0;n<9;n++){const na=a+(n-3)*.32+Math.PI/2*(k%2?1:-1)*.4,nl=u*(.16+r()*.1);c.strokeStyle=`rgba(${30+r()*20|0},${52+r()*20|0},${44+r()*14|0},.9)`;c.lineWidth=Math.max(.5,u*.012);c.beginPath();c.moveTo(px,py);c.lineTo(px+Math.cos(na)*nl,py+Math.sin(na)*nl);c.stroke();}
          if(r()<.35){c.fillStyle="rgba(242,240,246,.8)";c.beginPath();c.ellipse(px+(r()-.5)*u*.1,py-u*.04,u*(.04+r()*.05),u*.022,a,0,7);c.fill();}}
        bough(x2,y2,a+.5,l*.62,w*.6,d+1);bough(x2,y2,a-.45,l*.55,w*.55,d+1);};
      bough(base[0],base[1],.3,u*1.5,u*.05,0);
      const d0=P(-9,-2,2.4),d1=P(9,-2,2.4);const q=c.createLinearGradient(0,d0[1]-u*.4,0,d0[1]+u*.6);q.addColorStop(0,"rgba(240,240,248,0)");q.addColorStop(.4,"rgba(236,238,248,.95)");q.addColorStop(1,"#cfd6e6");
      c.fillStyle=q;c.beginPath();c.moveTo(d0[0]-200,e.H);c.lineTo(d0[0]-200,d0[1]+u*.2);for(let x=-9;x<=9;x+=.25){const p=P(x,-2+.25+.12*Math.sin(x*1.3)+.08*Math.sin(x*3.1),2.4);c.lineTo(p[0],p[1]);}c.lineTo(d1[0]+200,d1[1]+u*.2);c.lineTo(d1[0]+200,e.H);c.fill();
    }}
  ],
  cue:"the ice to skim a stone",
  poke(e){const p=e.P(-3+6*((e.T*7)%1),-2,-14);return this.tap(p[0],p[1],e);},
  hot(x,y,e){return!!iceAt(x,y,e);},
  tap(x,y,e){const t=iceAt(x,y,e);if(!t)return false;const z0=Math.min(3,e.cam.z-2.6);stones.push({x0:t[0]*.3,z0,x1:t[0]+(t[0]-t[0]*.3)*.3,z1:Math.max(SHORE+1.2,t[1]+(t[1]-z0)*.3),t0:e.T===0?-99:e.T});if(stones.length>8)stones.shift();return true;},
  live(g,e,H,i){
    const{P,T,lp}=e;
    if(i===2)stones.forEach(s=>{const a=T-s.t0,k=1-Math.exp(-a*1.5),x=s.x0+(s.x1-s.x0)*k,z=s.z0+(s.z1-s.z0)*k,p=P(x,-2,z),u=e.u(z),q=P(s.x0,-2,s.z0),fa=Math.max(0,1-a/6);
      if(fa>0){const lg=g.createLinearGradient(q[0],q[1],p[0],p[1]);lg.addColorStop(0,"rgba(84,90,136,0)");lg.addColorStop(1,`rgba(84,90,136,${(.4*fa).toFixed(3)})`);g.strokeStyle=lg;g.lineWidth=Math.max(1,u*.03);g.beginPath();g.moveTo(q[0],q[1]);g.lineTo(p[0],p[1]);g.stroke();}
      H.shadow(g,p[0]+u*.05,p[1],u*.12,u*.04,.5,"40,44,80");g.fillStyle="#3c3a40";g.beginPath();g.ellipse(p[0],p[1]-u*.025,Math.max(1.6*e.dpr,u*.07),Math.max(1.1*e.dpr,u*.04),0,0,7);g.fill();g.fillStyle="rgba(230,226,240,.5)";g.beginPath();g.ellipse(p[0]-u*.015,p[1]-u*.04,Math.max(1,u*.035),Math.max(.6,u*.015),0,0,7);g.fill();});
    if(i===1){
      /* the car on the shore road: parked facing the pond, its headlights come on and reach out across the ice */
      const on=H.sm(.55,.75,lp),p=P(...CAR),u=e.u(CAR[2]);
      H.shadow(g,p[0]+u*.2,p[1]-u*.08,u*1.3,u*.2,.55,"40,44,70");g.fillStyle="#2b3038";g.fillRect(p[0]-u*.9,p[1]-u*.55,u*1.8,u*.45);g.fillStyle="#3a404c";g.fillRect(p[0]-u*.65,p[1]-u*.85,u*1.3,u*.32);g.fillStyle="rgba(240,236,244,.9)";g.fillRect(p[0]-u*.66,p[1]-u*.9,u*1.32,u*.08);
      if(on>0){g.globalCompositeOperation="lighter";[-1,1].forEach(sd=>{H.glow(g,"255,246,226",p[0]+sd*u*.6,p[1]-u*.32,u*(1.2+on*1.8),.95*on);H.glow(g,"255,252,246",p[0]+sd*u*.6,p[1]-u*.32,u*.35,on);});
        /* beams laid on the ice, long and widening toward us */
        g.save();g.globalAlpha=.22*on;const f0=P(CAR[0],-2,CAR[2]+1),f1=P(CAR[0],-2,CAR[2]+16),uu=e.u(CAR[2]+16);const q=g.createLinearGradient(0,f0[1],0,f1[1]);q.addColorStop(0,"rgba(255,240,214,1)");q.addColorStop(1,"rgba(255,240,214,0)");g.fillStyle=q;
        g.beginPath();g.moveTo(f0[0]-u*.8,f0[1]);g.lineTo(f0[0]+u*.8,f0[1]);g.lineTo(f1[0]+uu*3.5,f1[1]);g.lineTo(f1[0]-uu*3.5,f1[1]);g.fill();g.restore();g.globalCompositeOperation="source-over";}
      /* crows crossing over the woods */
      for(let k=0;k<4;k++){const t=((T*.025+k*.13)%1),x=e.W*(1.1-t*1.3),y=e.H*(.28+k*.03)+Math.sin(T*2+k)*e.H*.006,s=e.H*.006,fl=Math.sin(T*9+k*2)*s;g.strokeStyle="rgba(20,18,26,.85)";g.lineWidth=Math.max(1,s*.35);g.beginPath();g.moveTo(x-s*1.6,y-fl);g.quadraticCurveTo(x-s*.6,y-s*.4,x,y);g.quadraticCurveTo(x+s*.6,y-s*.4,x+s*1.6,y-fl);g.stroke();}
    }
    if(i===2){
      /* two skaters looping out on the pond, a long shadow each from the low sun */
      [[-6,-17,3.2,.31,"#5a2a2a"],[4,-20,2.4,-.24,"#22344e"]].forEach(([cx,cz,R,w,col],k)=>{const a=T*w+k*2,x=cx+Math.cos(a)*R*1.4,z=cz+Math.sin(a)*R*.6,p=P(x,-2,z),u=e.u(z),lean=Math.sin(a)*.25*Math.sign(w);
        H.shadow(g,p[0],p[1],u*.22,u*.07,.5,"60,64,100");H.cast(g,p[0],p[1],u*.16,u*1.4,1.3*(1+H.sm(.2,.8,lp)),.03,.32,"80,86,130");
        const k2=.62,sw=Math.sin(a*3)*.12;g.save();g.translate(p[0],p[1]);g.rotate(lean);g.scale(k2,k2);g.lineCap="round";
        g.strokeStyle="#1b1c24";g.lineWidth=u*.07;g.beginPath();g.moveTo(-u*.04,-u*.78);g.lineTo(-u*.1-sw*u,0);g.moveTo(u*.04,-u*.78);g.lineTo(u*.12+sw*u,-u*.02);g.stroke();
        g.fillStyle=col;g.beginPath();g.moveTo(-u*.13,-u*.8);g.lineTo(-u*.11,-u*1.32);g.lineTo(u*.11,-u*1.32);g.lineTo(u*.14,-u*.8);g.fill();
        g.strokeStyle=col;g.lineWidth=u*.06;g.beginPath();g.moveTo(-u*.1,-u*1.26);g.lineTo(-u*.32,-u*.95+sw*u);g.moveTo(u*.1,-u*1.26);g.lineTo(u*.3,-u*1.0-sw*u);g.stroke();
        g.fillStyle="#d8c4b4";g.beginPath();g.arc(0,-u*1.43,u*.09,0,7);g.fill();g.fillStyle="#8a2a2a";g.beginPath();g.arc(0,-u*1.47,u*.095,Math.PI,0);g.fill();g.restore();});
      /* spindrift: loose snow running low over the ice in the wind */
      for(let k=0;k<26;k++){const z=-26+((k*.618)%1)*25,x=((k*7.3+T*(1.2+(k%4)*.4))%50)-25,p=P(x,-2,z),u=e.u(z),L=u*(1.2+(k%3)*.8);const q=g.createLinearGradient(p[0]-L,0,p[0],0);q.addColorStop(0,"rgba(250,248,255,0)");q.addColorStop(1,"rgba(250,248,255,.28)");g.fillStyle=q;g.fillRect(p[0]-L,p[1]-u*.05,L,u*.05);}
      /* a dog loping after the first skater */
      {const a=T*.31-.5,x=-6+Math.cos(a)*3.2*1.4,z=-17+Math.sin(a)*3.2*.6,p=P(x,-2,z),u=e.u(z)*.62,st=Math.sin(T*9)*u*.08;H.shadow(g,p[0],p[1],u*.4,u*.06,.4,"60,64,100");g.fillStyle="#3a2a20";g.beginPath();g.ellipse(p[0],p[1]-u*.32,u*.28,u*.1,0,0,7);g.fill();g.beginPath();g.arc(p[0]-u*.28,p[1]-u*.42,u*.08,0,7);g.fill();
        g.lineWidth=Math.max(1,u*.05);g.strokeStyle="#3a2a20";g.beginPath();g.moveTo(p[0]-u*.18,p[1]-u*.26);g.lineTo(p[0]-u*.18+st,p[1]);g.moveTo(p[0]+u*.18,p[1]-u*.26);g.lineTo(p[0]+u*.18-st,p[1]);g.moveTo(p[0]+u*.27,p[1]-u*.34);g.lineTo(p[0]+u*.42,p[1]-u*.44+st*.5);g.stroke();}
      /* the sun's glint sliding on the clear ice */
      g.globalCompositeOperation="lighter";const gp=P(-8+Math.sin(T*.3)*.6,-2,-24);H.glow(g,"255,206,160",gp[0],gp[1],e.u(-24)*(2.2+.4*Math.sin(T*1.7)),.35*(1-H.sm(.4,.9,lp)));g.globalCompositeOperation="source-over";
    }
    if(i===3){
      /* a little snow on the air, drifting across */
      g.fillStyle="#fbfaff";for(let k=0;k<90;k++){const d=((k*.618)%1),x=((k*97.3+T*(8+d*26))%e.W),y=((k*53.1+T*(14+d*40))%e.H);g.globalAlpha=.25+.5*d;g.beginPath();g.arc(x,y,.6+d*d*2.2,0,7);g.fill();}g.globalAlpha=1;
    }
  },
  grade(g,e,H){
    /* dusk comes on through the scene: cooler and darker, warmth only where the sun still is */
    const d=H.sm(.35,1,e.lp);if(d>0){g.fillStyle=`rgba(26,30,60,${(.38*d).toFixed(3)})`;g.fillRect(0,0,e.W,e.H);}
  }
});
function H0(t){return 1.5+Math.sin(t*5)*.4-t*1.5;}
function lerp0(a,b,t){return a+(b-a)*t;}
})();
