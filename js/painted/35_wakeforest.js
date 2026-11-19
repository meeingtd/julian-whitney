/* Wake Forest, a summer evening on Hearn Plaza: the striped quad runs up to Wait Chapel (brick, a white six-column portico, the clock tower,
   the white belfry and the copper spire), Georgian brick halls with slate roofs down both sides behind rows of willow oaks, lamps along the
   brick walks. Painted from the aerial, chapel and Calloway photos. The camera opens close among the near oaks and pulls back up the quad.
   Live: clouds drift, the lamps and the belfry come on as the light goes, fireflies over the lawn, students on the walks.
   Everything stays at z < 2.5 so the camera (which opens at z 3.6) never has the scene behind it. */
(()=>{
const G=-2,ZF=-13.3,ZT=-14.6,LAMPS=[];[1,-2,-5,-8,-11].forEach(z=>[-3.75,3.75].forEach(x=>LAMPS.push([x,z])));
const OAKS=[];for(let z=1.6;z>-12;z-=2.5)[-4.7,4.7].forEach((x,i)=>OAKS.push([x+(i?.15:-.1)*Math.sin(z),z,1.15+.15*Math.sin(z*1.7+i)]));
const CHAPEL=[0,4.85,ZT];
let bell=-9; /* touch: the tower answers, the swifts scatter and come back */
/* a willow-oak canopy: dark mass first, then lit clumps on the sun side (left), then a few bright leaf flecks */
function oak(c,e,r,x,z,R){const{P}=e,u=e.u(z),t=P(x,G,z),top=P(x,G+1.55,z);
  PAINT.helpers.shadow(c,t[0]+u*.25,t[1],u*.9,u*.16,.5,"14,20,10");
  c.strokeStyle="#2a1f18";c.lineCap="round";c.lineWidth=Math.max(1,u*.16);c.beginPath();c.moveTo(t[0],t[1]);c.lineTo(top[0],top[1]);c.stroke();
  c.lineWidth=Math.max(.7,u*.07);[-1,1].forEach(s=>{c.beginPath();c.moveTo(top[0],top[1]+u*.25);c.lineTo(top[0]+s*u*.6,top[1]-u*.35);c.stroke();});
  const cx=top[0],cy=top[1]-u*R*.55;
  for(let pass=0;pass<3;pass++)for(let i=0;i<(pass===2?70:pass?30:36);i++){const a=r()*6.28,d=Math.sqrt(r())*R*u,bx=cx+Math.cos(a)*d*1.15,by=cy+Math.sin(a)*d*.78,br=u*R*(pass?.22:.36)*(.6+r()*.6);
    const side=(cx-bx)/(R*u)+(cy-by)/(R*u)*.6;if(pass&&side<-.1+pass*.25)continue;
    c.fillStyle=pass===0?`rgb(${28+r()*10|0},${44+r()*12|0},${26+r()*8|0})`:pass===1?`rgb(${70+r()*25|0},${92+r()*22|0},${40+r()*12|0})`:`rgba(${170+r()*40|0},${160+r()*30|0},${80+r()*20|0},.7)`;
    if(pass===2){c.beginPath();c.arc(bx,by,Math.max(.6,br*.12),0,7);c.fill();continue;}
    c.beginPath();for(let j=0;j<7;j++){const a2=j/7*6.283+r(),d2=br*(.35+r()*.3);c.moveTo(bx+Math.cos(a2)*d2+br*.5,by+Math.sin(a2)*d2*.85);c.arc(bx+Math.cos(a2)*d2,by+Math.sin(a2)*d2*.85,br*(.42+r()*.2),0,7);}c.fill();
    /* leaf edges: small dark and lit leaves breaking the clump's outline */
    for(let j=0;j<5;j++){const a2=r()*6.283,lx=bx+Math.cos(a2)*br*1.05,ly=by+Math.sin(a2)*br*.9;c.beginPath();c.ellipse(lx,ly,Math.max(.6,br*.12),Math.max(.4,br*.06),a2,0,7);c.fill();}}
}
/* a Georgian hall facing the lawn: brick front on the plane x = X, white cornice, three floors of sash windows, slate roof with dormers */
function hall(c,e,r,X,z0,z1,end){const{P}=e,poly=PAINT.helpers.poly,d=Math.sign(X),eave=.7,ridge=1.7;
  const q=(x,y,z)=>P(x,y,z);
  poly(c,[q(X,G,z0),q(X,eave,z0),q(X,eave,z1),q(X,G,z1)]);const a=q(X,G,z0),b=q(X,G,z1);
  {const q2=c.createLinearGradient(0,a[1]-e.u(z0)*.02,0,a[1]+e.u(z0)*.25);q2.addColorStop(0,"rgba(16,20,10,.45)");q2.addColorStop(1,"rgba(16,20,10,0)");c.fillStyle=q2;poly(c,[q(X,G,z0),q(X,G,z1),q(X-d*.7,G,z1),q(X-d*.7,G,z0)]);c.fill();}
  poly(c,[q(X,G,z0),q(X,eave,z0),q(X,eave,z1),q(X,G,z1)]);
  let gr=c.createLinearGradient(a[0],0,b[0],0);gr.addColorStop(0,d<0?"#b8623e":"#8a4630");gr.addColorStop(1,d<0?"#7a3c28":"#5c2e22");c.fillStyle=gr;c.fill();
  c.save();poly(c,[q(X,G,z0),q(X,eave,z0),q(X,eave,z1),q(X,G,z1)]);c.clip();c.lineWidth=Math.max(.4,e.u(z0)*.006);
    for(let y=G;y<eave;y+=.09){c.strokeStyle=`rgba(${r()<.5?"60,24,14":"230,190,160"},.12)`;c.beginPath();c.moveTo(...q(X,y,z0));c.lineTo(...q(X,y,z1));c.stroke();}
    for(let k=0;k<260;k++){const y=G+r()*(eave-G),z=z0+r()*(z1-z0),p=q(X,y,z),uu=e.u(z);c.fillStyle=r()<.5?"rgba(70,26,14,.22)":"rgba(220,150,110,.16)";c.fillRect(p[0],p[1],uu*.08,uu*.035);}c.restore();
  poly(c,[q(X,eave,z0),q(X,eave,z1),q(X+d*.95,ridge,z1),q(X+d*.95,ridge,z0)]);c.fillStyle="#3b4148";c.fill();
  c.save();c.clip();c.lineWidth=Math.max(.4,e.u(z0)*.008);for(let t=.08;t<1;t+=.1){c.strokeStyle="rgba(20,24,30,.3)";c.beginPath();c.moveTo(...q(X+d*.95*t,eave+(ridge-eave)*t,z0));c.lineTo(...q(X+d*.95*t,eave+(ridge-eave)*t,z1));c.stroke();}
    const sh=c.createLinearGradient(...q(X,eave,z0),...q(X+d*.95,ridge,z0));sh.addColorStop(0,"rgba(0,0,0,.2)");sh.addColorStop(1,d<0?"rgba(255,200,150,.18)":"rgba(140,160,190,.1)");c.fillStyle=sh;c.fillRect(-1e4,-1e4,3e4,3e4);c.restore();
  c.strokeStyle="#e9e2d2";c.lineWidth=Math.max(1,e.u((z0+z1)/2)*.06);c.beginPath();c.moveTo(...q(X,eave,z0));c.lineTo(...q(X,eave,z1));c.stroke();
  for(let z=z0-.45;z>z1+.3;z-=.62){[-1.55,-.8,-.05].forEach(y=>{const p0=q(X,y,z),p1=q(X,y+.42,z-.26);c.fillStyle="#efe8da";c.fillRect(p0[0]-1,p1[1]-1,p1[0]-p0[0]+2,p0[1]-p1[1]+2);
      c.fillStyle=r()<.3?"rgba(255,214,150,.95)":"#2b3038";c.fillRect(p0[0],p1[1],p1[0]-p0[0],p0[1]-p1[1]);});
    const dm=q(X+d*.35,1.0,z-.13),u=e.u(z);c.fillStyle="#2f353c";c.beginPath();c.moveTo(dm[0]-u*.13,dm[1]-u*.2);c.lineTo(dm[0],dm[1]-u*.32);c.lineTo(dm[0]+u*.13,dm[1]-u*.2);c.fill();c.fillStyle="#bfb8a8";c.fillRect(dm[0]-u*.1,dm[1]-u*.2,u*.2,u*.2);c.fillStyle=r()<.25?"rgba(255,214,150,.9)":"#262b31";c.fillRect(dm[0]-u*.06,dm[1]-u*.16,u*.12,u*.14);}
  [z0-.2,z1+.2].forEach(z=>{const p=q(X+d*.5,ridge+.35,z),u=e.u(z);c.fillStyle="#6e3426";c.fillRect(p[0]-u*.12,p[1],u*.24,u*.5);});
  /* the near end: a brick gable with white raking trim, a fanlight window, so the building reads whole inside the frame */
  if(end){const D=1.9,u=e.u(z0);poly(c,[q(X,G,z0),q(X,eave,z0),q(X+d*.95,ridge,z0),q(X+d*D,eave,z0),q(X+d*D,G,z0)]);c.fillStyle=d<0?"#9a4e32":"#6e3626";c.fill();
    c.strokeStyle="#ece5d6";c.lineWidth=Math.max(1,u*.06);c.beginPath();c.moveTo(...q(X,eave,z0));c.lineTo(...q(X+d*.95,ridge,z0));c.lineTo(...q(X+d*D,eave,z0));c.stroke();
    [-1.55,-.8,-.05].forEach(y=>{const p0=q(X+d*.75,y,z0),p1=q(X+d*1.15,y+.42,z0);c.fillStyle="#efe8da";c.fillRect(Math.min(p0[0],p1[0])-1,p1[1]-1,Math.abs(p1[0]-p0[0])+2,p0[1]-p1[1]+2);c.fillStyle=r()<.4?"rgba(255,214,150,.95)":"#2b3038";c.fillRect(Math.min(p0[0],p1[0]),p1[1],Math.abs(p1[0]-p0[0]),p0[1]-p1[1]);});
    const fl=q(X+d*.95,1.05,z0);c.fillStyle="#efe8da";c.beginPath();c.arc(fl[0],fl[1],u*.18,Math.PI,0);c.fill();c.fillStyle="#2b3038";c.beginPath();c.arc(fl[0],fl[1],u*.13,Math.PI,0);c.fill();}
}
PAINT.scene({id:"p-wfu",win:CUTW("wfu"),s:[.662,.75],refZ:-6,
  /* one light: the evening sun low to the left; shadows run right across the lawn; the chapel end of the quad sits in warm haze */
  air:{rgb:"236,196,160",k:.26,z0:-2},
  look(e,H){const s=e.P(-30,1,-60),d=H.sm(.3,1,e.lp);return{bloom:.26,sun:[s[0]/e.W,s[1]/e.H,"255,206,150",.16*(1-d*.5),.8],grade:`rgba(255,${H.lerp(180,150,d)|0},${H.lerp(120,150,d)|0},.15)`,vig:0,grain:.05};},
  sky(g,e,H){const{P,T,lp}=e,poly=H.poly,hz=P(0,G,-400)[1];
    let gr=g.createLinearGradient(0,0,0,hz);gr.addColorStop(0,"#2f4a78");gr.addColorStop(.45,"#7f7fa0");gr.addColorStop(.8,"#e2a98a");gr.addColorStop(1,"#f6c98e");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    const sun=P(-30,1,-60);gr=g.createRadialGradient(sun[0],sun[1],0,sun[0],sun[1],e.W*.7);gr.addColorStop(0,"rgba(255,226,170,.7)");gr.addColorStop(1,"rgba(255,210,160,0)");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    /* high cloud drifting, lit from below */
    for(let i=0;i<7;i++){const x=((i*173+T*6)%(e.W*1.6))-e.W*.3,y=hz*(.12+.11*(i%4)),w=e.W*(.18+.05*(i%3));g.save();g.translate(x,y);g.scale(1,.12);const cg=g.createRadialGradient(0,0,0,0,0,w);cg.addColorStop(0,"rgba(255,206,190,.32)");cg.addColorStop(1,"rgba(255,206,190,0)");g.fillStyle=cg;g.fillRect(-w,-w,2*w,2*w);g.restore();}
    g.fillStyle="#24331f";g.fillRect(0,hz,e.W,e.H-hz);
    /* the lawn: mown in stripes that run up to the chapel; brick walks either side and a plaza at the foot of the steps */
    const zn=e.cam.z-.6,Q=(x,z)=>P(x,G,z);
    poly(g,[Q(-30,zn),Q(30,zn),Q(30,ZF-1.2),Q(-30,ZF-1.2)]);g.fillStyle="#34481f";g.fill();
    for(let i=0;i<12;i++){const x0=-3.5+i*7/12,x1=x0+7/12;poly(g,[Q(x0,zn),Q(x1,zn),Q(x1,ZF+.6),Q(x0,ZF+.6)]);g.fillStyle=i%2?"#5d7a2c":"#7b953a";g.fill();}
    [-3.75,3.75].forEach(x=>{poly(g,[Q(x-.25,zn),Q(x+.25,zn),Q(x+.25,ZF+.6),Q(x-.25,ZF+.6)]);g.fillStyle="#a56a4c";g.fill();});
    poly(g,[Q(-4.6,ZF+.6),Q(4.6,ZF+.6),Q(4.6,ZF-.4),Q(-4.6,ZF-.4)]);g.fillStyle="#9a6248";g.fill();
    /* long evening shadows of the oaks, thrown right across the grass */
    g.fillStyle="rgba(18,26,14,.38)";OAKS.forEach(([x,z,R])=>{if(z>zn)return;const pts=[];for(let k=0;k<16;k++){const a=k/16*6.28;pts.push(Q(x+1.7+Math.cos(a)*R*1.9,Math.min(zn,z+Math.sin(a)*R*.7)));}poly(g,pts);g.fill();});
    gr=g.createLinearGradient(0,hz,0,e.H);gr.addColorStop(0,"rgba(255,190,110,.18)");gr.addColorStop(1,"rgba(255,190,110,0)");g.fillStyle=gr;g.fillRect(0,hz,e.W,e.H-hz);
  },
  layers:[
    {z:-15,draw(c,e,r){const{P}=e,poly=PAINT.helpers.poly,u=e.u(ZT);
      /* woods behind the chapel */
      for(let i=0;i<60;i++){const x=-14+r()*28,p=P(x,G+.6+r()*1.4,-20),rr=e.u(-20)*(.9+r()*.9);c.fillStyle=`rgb(${26+r()*14|0},${40+r()*14|0},${28+r()*8|0})`;c.beginPath();c.arc(p[0],p[1],rr,0,7);c.fill();}
      const box=(x0,x1,y0,y1,z,top,bot)=>{const a=P(x0,y1,z),b=P(x1,y0,z),q=c.createLinearGradient(a[0],0,b[0],0);q.addColorStop(0,top);q.addColorStop(1,bot);c.fillStyle=q;c.fillRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);};
      /* side wings under their copper roofs */
      [-1,1].forEach(s=>{box(s<0?-4.4:2.5,s<0?-2.5:4.4,G,-.4,ZT+.2,"#b05a3a","#7c3c28");const a=P(s*2.5,-.4,ZT+.2),b=P(s*4.4,-.4,ZT+.2),t=P(s*3.2,.35,ZT+.2);poly(c,[a,b,[b[0],b[1]],[t[0]+s*u*.6,t[1]],[t[0]-s*u*.4,t[1]]]);c.fillStyle=s<0?"#6f9c87":"#466e60";c.fill();});
      /* the nave front and its gable */
      box(-2.5,2.5,G,.35,ZT,"#c2683f","#83402a");poly(c,[P(-2.5,.35,ZT),P(0,1.25,ZT),P(2.5,.35,ZT)]);c.fillStyle="#9a4a30";c.fill();
      /* the tower: brick, an arched window, the clock, a white cornice */
      box(-.62,.62,.9,4.3,ZT-.4,"#c66b40","#8a442c");
      {const a=P(-.2,2.4,ZT-.4),b=P(.2,3.25,ZT-.4);c.fillStyle="#eae3d4";c.fillRect(a[0]-u*.04,b[1]-u*.04,b[0]-a[0]+u*.08,a[1]-b[1]+u*.04);c.fillStyle="#2c323a";c.fillRect(a[0],b[1]+u*.1,b[0]-a[0],a[1]-b[1]-u*.1);c.beginPath();c.arc((a[0]+b[0])/2,b[1]+u*.1,(b[0]-a[0])/2,Math.PI,0);c.fill();}
      {const m=P(0,3.75,ZT-.39);c.fillStyle="#f2ede2";c.beginPath();c.arc(m[0],m[1],u*.3,0,7);c.fill();c.strokeStyle="#1d2228";c.lineWidth=Math.max(1,u*.035);c.beginPath();c.moveTo(m[0],m[1]);c.lineTo(m[0]+u*.04,m[1]-u*.2);c.moveTo(m[0],m[1]);c.lineTo(m[0]+u*.15,m[1]+u*.05);c.stroke();}
      box(-.7,.7,4.3,4.42,ZT-.4,"#f4efe4","#c9c0b0");
      /* the belfry: white, arched openings, corner columns, urns; then the lantern and the copper spire */
      box(-.52,.52,4.42,5.35,ZT-.4,"#f6f1e6","#bdb4a4");
      [-.24,.24].forEach(x=>{const a=P(x-.13,4.55,ZT-.39),b=P(x+.13,5.1,ZT-.39);c.fillStyle="#3a3630";c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);c.beginPath();c.arc((a[0]+b[0])/2,b[1],(b[0]-a[0])/2,Math.PI,0);c.fill();});
      [-.5,.5].forEach(x=>{const p=P(x,5.42,ZT-.4);c.fillStyle="#ece6da";c.beginPath();c.arc(p[0],p[1],u*.06,0,7);c.fill();});
      box(-.6,.6,5.35,5.45,ZT-.4,"#f4efe4","#c9c0b0");box(-.32,.32,5.45,5.9,ZT-.4,"#f6f1e6","#b9b0a0");
      {const a=P(-.3,5.9,ZT-.4),b=P(.3,5.9,ZT-.4),t=P(0,9.3,ZT-.4),m=P(0,5.9,ZT-.4);poly(c,[a,t,m]);c.fillStyle="#86b5a0";c.fill();poly(c,[m,t,b]);c.fillStyle="#4c7a68";c.fill();c.strokeStyle="#e8e2d6";c.lineWidth=Math.max(.6,u*.02);c.beginPath();c.moveTo(t[0],t[1]);c.lineTo(t[0],t[1]-u*.3);c.stroke();}
      /* the portico: steps, six columns, entablature, pediment, all white and catching the low sun */
      box(-2,2,G,-1.75,ZF+.25,"#e8e0d0","#b8ae9c");box(-1.9,1.9,-1.75,.45,ZF-.35,"#3a2c26","#241b17");
      [-1.5,-.9,-.3,.3,.9,1.5].forEach(x=>{const a=P(x-.11,-1.75,ZF),b=P(x+.11,.45,ZF),q=c.createLinearGradient(a[0],0,b[0],0);q.addColorStop(0,"#fff8ea");q.addColorStop(.5,"#e6dcc8");q.addColorStop(1,"#9c9384");c.fillStyle=q;c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);
        const k=P(x-.15,.45,ZF);c.fillStyle="#f2ebde";c.fillRect(k[0],k[1]-u*.05,u*.3,u*.08);});
      box(-1.85,1.85,.45,.72,ZF,"#fbf5ea","#cfc6b6");
      poly(c,[P(-1.95,.72,ZF),P(0,1.5,ZF),P(1.95,.72,ZF)]);c.fillStyle="#f3ede1";c.fill();poly(c,[P(-1.6,.78,ZF+.01),P(0,1.36,ZF+.01),P(1.6,.78,ZF+.01)]);c.fillStyle="#d9d0c0";c.fill();
      /* the senior banner hung across the columns: black and old gold */
      {const a=P(-1.3,.4,ZF+.12),b=P(1.3,-.32,ZF+.12);c.fillStyle="rgba(0,0,0,.25)";c.fillRect(a[0]+u*.04,a[1]+u*.05,b[0]-a[0],b[1]-a[1]);c.fillStyle="#141414";c.fillRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);
        c.fillStyle="#9e7e38";c.fillRect(a[0],a[1]+u*.04,b[0]-a[0],u*.03);c.fillRect(a[0],b[1]-u*.07,b[0]-a[0],u*.03);
        c.fillStyle="#cfae5c";c.font=`700 ${Math.max(5,u*.3).toFixed(1)}px Georgia,serif`;c.textAlign="center";c.textBaseline="middle";c.fillText("CLASS OF 2026",(a[0]+b[0])/2,(a[1]+b[1])/2+u*.01);
        c.strokeStyle="#e8e0d0";c.lineWidth=Math.max(.5,u*.015);[[a[0],a[1]],[b[0],a[1]]].forEach(([x,y])=>{c.beginPath();c.moveTo(x,y);c.lineTo(x,P(0,.45,ZF)[1]);c.stroke();});}
    }},
    {z:-8.5,draw(c,e,r){hall(c,e,r,-6.2,-5.6,-11.6);hall(c,e,r,6.2,-5.6,-11.6);
      OAKS.filter(o=>o[1]<-5.5).forEach(([x,z,R])=>oak(c,e,r,x,z,R));
      LAMPS.filter(l=>l[1]<-5.5).forEach(([x,z])=>post(c,e,x,z));}},
    {z:-2.5,draw(c,e,r){hall(c,e,r,-6.2,-1.4,-5.6,1);hall(c,e,r,6.2,-1.4,-5.6,1);
      OAKS.filter(o=>o[1]>=-5.5).forEach(([x,z,R])=>oak(c,e,r,x,z,R));
      LAMPS.filter(l=>l[1]>=-5.5).forEach(([x,z])=>post(c,e,x,z));}},
  ],
  cue:"the chapel tower",
  poke(e){bell=e.T;return true;},
  hot(x,y,e){const a=e.P(-1,6.8,ZT),b=e.P(1,1,ZT);return x>a[0]&&x<b[0]&&y>a[1]&&y<b[1];},
  tap(x,y,e){if(!this.hot(x,y,e))return false;bell=e.T;return true;},
  live(g,e,H,i){const{P,T,lp}=e,bk=T>=bell?Math.exp(-(T-bell)/1.5):0;
    if(i===0){/* chimney swifts circling the chapel tower at dusk */{const b=P(0,4.2,ZT);H.flock(g,e,12,b[0]/e.W,b[1]/e.H-.05*bk,.06*(1+3*bk),.04*(1+2.5*bk),2.6*e.dpr,"rgba(30,26,30,.8)",1.6,5);}
      /* the belfry lights come on */const b=P(...CHAPEL),u=e.u(ZT);H.glow(g,"255,214,150",b[0],b[1],u*(.6+.9*bk),Math.min(1,.35+.45*H.sm(.2,.7,lp)+.6*bk));}
    if(i===1||i===2){/* students on the walks */
      for(let k=0;k<6;k++){const side=k%2?3.95:-3.55,dir=k%3?1:-1,span=i===1?[-11.5,-5.5]:[-5.5,1.5],z=span[0]+((k*2.3+T*.16*dir)%6+6)%6,zz=Math.min(span[1],Math.max(span[0],z));
        if(zz>e.cam.z-1)continue;const f=P(side,G,zz),u=e.u(zz),h=u*.3,bob=Math.sin(T*6+k)*u*.008;H.cast(g,f[0],f[1],h*.18,h,1.6,.08,.3,"14,20,10");g.fillStyle="rgba(28,22,20,.85)";g.fillRect(f[0]-h*.11,f[1]-h*.86+bob,h*.22,h*.6);g.beginPath();g.arc(f[0],f[1]-h*.94+bob,h*.09,0,7);g.fill();
        const st=Math.sin(T*6+k)*h*.08;g.fillRect(f[0]-h*.08+st,f[1]-h*.3,h*.06,h*.3);g.fillRect(f[0]+h*.02-st,f[1]-h*.3,h*.06,h*.3);}}
    if(i===1||i===2){/* the quad is rolled: toilet paper thrown over the oaks, hanging in long swaying strips, and lying on the grass */
      OAKS.filter(o=>i===1?o[1]<-5.5:o[1]>=-5.5).forEach(([x,z,R],k)=>{if(z>e.cam.z-1.5)return;const u=e.u(z),top=P(x,G+1.55,z),cy=top[1]-u*R*.55;
        const hs=n=>{const v=Math.sin((k*13.7+n*7.1)*12.9898)*43758.5;return v-Math.floor(v);};
        /* a few strips draped over the crown, from one side across the top to the other */
        for(let s=0;s<2;s++){const a0=-1.2+hs(s)*1.1,a1=.2+hs(s+5)*1.1,p0=[top[0]+Math.sin(a0)*u*R*1.1,cy+u*R*.2],p1=[top[0]+Math.sin(a1)*u*R*1.1,cy+u*R*.15],sw=Math.sin(T*.9+s+k)*u*.03;
          g.strokeStyle="rgba(244,240,230,.5)";g.lineWidth=Math.max(.5,u*.022);g.beginPath();g.moveTo(p0[0],p0[1]);g.quadraticCurveTo((p0[0]+p1[0])/2+sw,cy-u*R*(.9+hs(s+9)*.3),p1[0],p1[1]);g.stroke();}
        /* and strips hanging free, all different lengths, moving in the evening air */
        for(let s=0;s<4;s++){const a=(hs(s+2)-.5)*2.2,sx=top[0]+Math.sin(a)*u*R*1.05,sy=cy+u*R*(.2+.3*hs(s+3)),L=u*(.35+hs(s+4)*1.2),sw=Math.sin(T*(1+hs(s)*.6)+s+k)*u*.08;
          g.strokeStyle="rgba(246,242,232,.72)";g.lineWidth=Math.max(.5,u*.026);g.beginPath();g.moveTo(sx,sy);g.bezierCurveTo(sx+sw*.3,sy+L*.35,sx-sw*.4,sy+L*.7,sx+sw,sy+L);g.stroke();}});
      if(i===2)for(let k=0;k<18;k++){const x=-3+((k*.618)%1)*6,z=-9+((k*.371)%1)*10;if(z>e.cam.z-1.2)continue;const p=P(x,G,z),u=e.u(z);g.fillStyle="rgba(248,246,238,.85)";g.beginPath();g.ellipse(p[0],p[1],u*.09,u*.05,0,0,7);g.fill();
        g.strokeStyle="rgba(248,246,238,.6)";g.lineWidth=Math.max(.5,u*.03);g.beginPath();g.moveTo(p[0],p[1]);g.quadraticCurveTo(p[0]+u*.3,p[1]+u*.04,p[0]+u*.6*(k%2?1:-1),p[1]-u*.02);g.stroke();}}
    if(i===2){/* lamps and fireflies */
      LAMPS.forEach(([x,z])=>{if(z>e.cam.z-1)return;const p=P(x,G+.62,z),u=e.u(z);{const f=P(x,G,z);g.save();g.translate(f[0],f[1]);g.scale(1,.25);g.globalCompositeOperation="lighter";H.glow(g,"255,200,130",0,0,u*1.4,.25*H.sm(.2,.8,lp));g.restore();}H.glow(g,"255,206,140",p[0],p[1],u*.5,.25+.6*H.sm(.1,.6,lp));});
      for(let k=0;k<70;k++){const x=-3.4+((k*.618)%1)*6.8,z=-11+((k*.377)%1)*12.5;if(z>e.cam.z-1)continue;const y=G+.15+.5*(.5+.5*Math.sin(T*.6+k*1.3)),p=P(x+.2*Math.sin(T*.4+k),y,z),bl=Math.max(0,Math.sin(T*1.3+k*2.1));
        H.glow(g,"214,255,120",p[0],p[1],e.u(z)*.09+2,bl*bl*.9*H.sm(.05,.4,lp));}}
  },
  grade(g,e){let gr=g.createLinearGradient(0,0,e.W,0);gr.addColorStop(0,"rgba(255,180,100,.16)");gr.addColorStop(.6,"rgba(255,180,100,0)");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    gr=g.createRadialGradient(e.W/2,e.H*.45,e.H*.3,e.W/2,e.H*.5,e.H*.95);gr.addColorStop(0,"rgba(10,12,16,0)");gr.addColorStop(1,"rgba(10,12,16,.45)");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);}
});
function post(c,e,x,z){const{P}=e,a=P(x,G,z),b=P(x,G+.62,z),u=e.u(z);c.strokeStyle="#16191c";c.lineWidth=Math.max(.8,u*.035);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();
  c.fillStyle="#16191c";c.fillRect(b[0]-u*.06,b[1]-u*.11,u*.12,u*.12);c.fillStyle="rgba(255,226,170,.9)";c.fillRect(b[0]-u*.04,b[1]-u*.09,u*.08,u*.08);}
})();
