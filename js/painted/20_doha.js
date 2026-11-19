/* Doha, around age 7: the Lycée Bonaparte gate in late-afternoon heat, the West Bay towers gold in the haze behind it, a minaret and a dome to
   the right, date palms, the French and Qatari flags moving in the hot wind, and a child pulling a roller backpack toward the gate. The far
   layer wavers with heat shimmer and dust hangs in the light. Drawing space is the old line scene's (DX, DY): gate at x 162-345, ground y 368, z .4. */
(()=>{
const DX=x=>(x-253)*.0175,DY=y=>(368-y)*.0175-2;
/* a date palm (Phoenix dactylifera) in screen space: a straight trunk patterned by the old leaf bases, a crown of stiff blue-green fronds
   (upper ones raised, lower ones arching out and down), dry brown fronds hanging under the crown, orange date clusters. Sun from the right. */
const datePalm=PAINT.helpers.datePalm;
let gust=-9; /* touch: a gust takes the flags */
const FLAGS=[115,405];
PAINT.scene({id:"p-doha",win:CUTW("doha"),s:[.42,.463],refZ:0,
  /* one light: the low sun right of the towers; every shadow falls left and toward us; dust haze takes the far towers */
  air:{rgb:"236,206,160",k:.16,z0:-1},
  look(e){const s=e.P(9.5,4.2-1.2*e.lp,-30);return{bloom:.14,sun:[s[0]/e.W,s[1]/e.H,"255,214,150",.07,.6],grade:"rgba(255,196,120,.16)",vig:.3,grain:.05};},
  sky(g,e){
    const gr=g.createLinearGradient(0,0,0,e.H*.75);gr.addColorStop(0,"#7f93a6");gr.addColorStop(.45,"#c7b49a");gr.addColorStop(.8,"#e9c99a");gr.addColorStop(1,"#f1d6aa");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    /* the sun low in the haze, right of the towers */
    const s=e.P(9.5,4.2-1.2*e.lp,-30),gl=g.createRadialGradient(s[0],s[1],0,s[0],s[1],e.H*.6);gl.addColorStop(0,"rgba(255,246,220,.95)");gl.addColorStop(.05,"rgba(255,232,180,.75)");gl.addColorStop(.25,"rgba(255,206,140,.25)");gl.addColorStop(1,"rgba(255,190,120,0)");g.fillStyle=gl;g.fillRect(0,0,e.W,e.H);
  },
  layers:[
    {z:-7,draw(c,e,r){const{P}=e,poly=PAINT.helpers.poly;
      /* West Bay behind the school, close and tall: the real landmarks, then glass towers filling between them, cranes over the
         building sites, all gold on the sun side and blue-grey in shade, the haze thickening toward the ground */
      const Z=-8,u=e.u(Z),G=(x,y)=>P(x,y-2,Z);
      for(let i=0;i<90;i++){const x=-16+r()*32,w=.3+r()*.9,h=.4+r()*1.6,a=G(x,0),b=G(x+w,h);c.fillStyle=`rgba(${196+r()*20|0},${176+r()*16|0},${150+r()*16|0},.85)`;c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);}
      const skin=(pts,x0,x1,glass)=>{const a=G(x0,0),b=G(x1,0),q=c.createLinearGradient(a[0],0,b[0],0);
        q.addColorStop(0,glass[0]);q.addColorStop(.55,glass[1]);q.addColorStop(.8,"#e6c48e");q.addColorStop(1,"#f6deae");c.fillStyle=q;poly(c,pts);c.fill();};
      const haze=(x0,x1,h)=>{const t=G(0,h)[1],b=G(0,0)[1],q=c.createLinearGradient(0,t,0,b);q.addColorStop(0,"rgba(240,214,170,0)");q.addColorStop(1,"rgba(232,204,160,.6)");c.fillStyle=q;const a=G(x0-.2,0),d=G(x1+.2,0);c.fillRect(a[0],t,d[0]-a[0],b-t);};
      const floors=(x0,x1,h,step,col)=>{c.strokeStyle=col;c.lineWidth=Math.max(.5,u*.012);for(let y=step;y<h;y+=step){const a=G(x0,y),b=G(x1,y);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}};
      const box=(x,w,h,glass,step)=>{const pts=[G(x-w/2,0),G(x-w/2,h),G(x+w/2,h),G(x+w/2,0)];skin(pts,x-w/2,x+w/2,glass);c.save();poly(c,pts);c.clip();floors(x-w/2,x+w/2,h,step||.16,"rgba(30,40,60,.3)");
        for(let k=1;k<w/.14;k++){const a=G(x-w/2+k*.14,0),b=G(x-w/2+k*.14,h);c.strokeStyle="rgba(255,236,200,.1)";c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}haze(x-w/2,x+w/2,h);c.restore();};
      const BLUE=["#4c6078","#7d8a98"],SILV=["#6d7480","#a7a9ab"],BRNZ=["#5c4a3c","#9a8064"],DARK=["#2e3846","#5c6670"];
      /* filler towers first, behind and between */
      [[-13.5,1.1,4.6,SILV],[-11.6,.9,5.6,BLUE],[-9.8,1.2,4.2,BRNZ],[-6.9,.8,6.4,SILV],[-4.4,1,5,BLUE],[-1.2,.9,6.1,BRNZ],[2.6,.8,5.4,SILV],[5.4,1.1,6.6,BLUE],[8.6,.9,5.2,BRNZ],[10.4,1.2,6,SILV],[12.8,1,4.4,BLUE],[14.6,1.2,3.6,SILV]].forEach(([x,w,h,gl])=>box(x,w,h,gl));
      /* Palm Towers: two slim towers with tall glass pyramids on top */
      [[-8.5,0],[-7.7,.4]].forEach(([x,dh])=>{const w=.62,h=7.6+dh;box(x,w,h,BLUE,.14);const t=G(x,h);c.fillStyle="#9fb2c4";poly(c,[G(x-w/2,h),G(x,h+1.6),G(x+w/2,h)]);c.fill();c.fillStyle="rgba(255,226,170,.55)";poly(c,[G(x,h),G(x,h+1.6),G(x+w/2,h)]);c.fill();
        c.strokeStyle="#c8ccd0";c.lineWidth=Math.max(.6,u*.02);const s=G(x,h+1.6),s2=G(x,h+2.2);c.beginPath();c.moveTo(s[0],s[1]);c.lineTo(s2[0],s2[1]);c.stroke();});
      /* Al Bidda: a dark slab with an angled crown */
      {const x=-5.6,w=1,h=7.2;box(x,w,h,DARK,.15);c.fillStyle="#3a4654";poly(c,[G(x-w/2,h),G(x-w/2,h+.9),G(x+w/2,h+.4),G(x+w/2,h)]);c.fill();c.fillStyle="rgba(255,220,160,.4)";poly(c,[G(x,h),G(x,h+.65),G(x+w/2,h+.4),G(x+w/2,h)]);c.fill();}
      /* Burj Qatar: a cylinder under a white lattice of Islamic geometry, a dome and a spike */
      {const x=-2.6,w=1.5,h=8.4,pts=[G(x-w/2,0),G(x-w/2,h),G(x+w/2,h),G(x+w/2,0)];
        const a=G(x-w/2,0),b=G(x+w/2,0),q=c.createLinearGradient(a[0],0,b[0],0);q.addColorStop(0,"#3e5068");q.addColorStop(.35,"#6a7d94");q.addColorStop(.7,"#d8c29a");q.addColorStop(.9,"#f2dcb0");q.addColorStop(1,"#a89880");c.fillStyle=q;poly(c,pts);c.fill();
        c.save();poly(c,pts);c.clip();c.strokeStyle="rgba(236,232,222,.55)";c.lineWidth=Math.max(.5,u*.014);
        for(let y=.1;y<h;y+=.22)for(let k=0;k<10;k++){const f0=k/10,f1=(k+1)/10,X=f=>x-w/2*Math.cos(Math.PI*f);const p1=G(X(f0),y),p2=G(X((f0+f1)/2),y+.11),p3=G(X(f1),y),p4=G(X((f0+f1)/2),y-.11);c.beginPath();c.moveTo(p1[0],p1[1]);c.lineTo(p2[0],p2[1]);c.lineTo(p3[0],p3[1]);c.lineTo(p4[0],p4[1]);c.closePath();c.stroke();}
        haze(x-w/2,x+w/2,h);c.restore();
        const t=G(x,h),rx=w/2*u;c.fillStyle="#b9b4aa";c.beginPath();c.ellipse(t[0],t[1],rx,rx*.85,0,Math.PI,0);c.fill();c.fillStyle="rgba(255,236,200,.5)";c.beginPath();c.ellipse(t[0]+rx*.35,t[1]-rx*.35,rx*.3,rx*.4,.4,0,7);c.fill();
        c.strokeStyle="#c9c4ba";c.lineWidth=Math.max(.8,u*.04);c.beginPath();c.moveTo(t[0],t[1]-rx*.85);c.lineTo(t[0],t[1]-u*1.5);c.stroke();}
      /* Tornado Tower: the hourglass in a diagonal grid */
      {const x=.9,w=1.5,h=7.4,k=t=>1-.3*Math.sin(Math.PI*t),L=[],R=[];for(let i=0;i<=24;i++){const t=i/24;L.push(G(x-w/2*k(t),t*h));R.push(G(x+w/2*k(t),t*h));}const pts=[...L,...R.reverse()];skin(pts,x-w/2,x+w/2,["#3c4656","#6c7684"]);
        c.save();poly(c,pts);c.clip();c.strokeStyle="rgba(214,210,200,.45)";c.lineWidth=Math.max(.5,u*.016);for(let d=-h;d<h*1.5;d+=.45){const a=G(x-w/2,d),b=G(x+w/2,d+w*.9),a2=G(x-w/2,d+w*.9),b2=G(x+w/2,d);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.moveTo(a2[0],a2[1]);c.lineTo(b2[0],b2[1]);c.stroke();}haze(x-w/2,x+w/2,h);c.restore();}
      /* the Kempinski pair with their sloped tops */
      [[3.9,8,1],[4.9,7.4,-1]].forEach(([x,h,s])=>{const w=.8;skin([G(x-w/2,0),G(x-w/2,h+(s>0?.6:0)),G(x+w/2,h+(s>0?0:.6)),G(x+w/2,0)],x-w/2,x+w/2,SILV);c.save();poly(c,[G(x-w/2,0),G(x-w/2,h+.6),G(x+w/2,h+.6),G(x+w/2,0)]);c.clip();floors(x-w/2,x+w/2,h,.14,"rgba(30,40,60,.28)");haze(x-w/2,x+w/2,h);c.restore();});
      /* tall glass on the right, and the Sheraton's stepped pyramid low by the water */
      box(7.2,1.1,7.8,BLUE,.15);box(9.6,.8,6.8,BRNZ,.15);
      {const x=11.6,b=G(x,0);for(let k=0;k<6;k++){const w=3.6-k*.5,h0=k*.42;c.fillStyle=k%2?"#d6c09a":"#e2cca4";poly(c,[G(x-w/2,h0),G(x-w/2+.25,h0+.42),G(x+w/2-.25,h0+.42),G(x+w/2,h0)]);c.fill();c.fillStyle="rgba(120,90,60,.25)";poly(c,[G(x-w/2,h0),G(x-w/2+.25,h0+.42),G(x-w/2+.6,h0+.42),G(x-w/2+.4,h0)]);c.fill();}}
      /* tower cranes over the sites */
      [[-10.6,7.2,.6],[6.3,8.6,-.4],[13.4,6.4,.3]].forEach(([x,h,a])=>{c.strokeStyle="rgba(120,100,80,.85)";c.lineWidth=Math.max(.6,u*.03);const b=G(x,0),t=G(x,h);c.beginPath();c.moveTo(b[0],b[1]);c.lineTo(t[0],t[1]);c.stroke();
        const j=G(x+3.2*Math.cos(a),h+.1),k=G(x-1*Math.cos(a),h);c.beginPath();c.moveTo(k[0],k[1]);c.lineTo(j[0],j[1]);c.stroke();const top=G(x,h+.6);c.beginPath();c.moveTo(top[0],top[1]);c.lineTo(j[0],j[1]);c.moveTo(top[0],top[1]);c.lineTo(k[0],k[1]);c.moveTo(t[0],t[1]);c.lineTo(top[0],top[1]);c.stroke();
        const hk=G(x+2.4*Math.cos(a),h-1.4);c.lineWidth=Math.max(.4,u*.012);c.beginPath();c.moveTo(G(x+2.4*Math.cos(a),h)[0],G(0,h)[1]);c.lineTo(hk[0],hk[1]);c.stroke();});
      /* the mosque, lower and nearer on the right: a dome and its minaret */
      const d=P(7.6,-.6,-3),uu=e.u(-3);c.fillStyle="#e2cfae";c.fillRect(d[0]-uu*1.1,d[1],uu*2.2,P(7.6,-2,-3)[1]-d[1]);c.fillStyle="#d4bc94";c.beginPath();c.ellipse(d[0],d[1],uu*.95,uu*1,0,Math.PI,0);c.fill();c.fillStyle="rgba(255,236,190,.6)";c.beginPath();c.ellipse(d[0]+uu*.35,d[1]-uu*.4,uu*.3,uu*.5,.3,0,7);c.fill();
      const m0=P(9.4,-2,-3),m1=P(9.4,2.6,-3);c.fillStyle="#e6d3b2";c.fillRect(m0[0]-uu*.2,m1[1],uu*.4,m0[1]-m1[1]);c.fillStyle="rgba(150,120,90,.45)";c.fillRect(m0[0]-uu*.2,m1[1],uu*.13,m0[1]-m1[1]);
      c.fillStyle="#d8c29c";c.fillRect(m1[0]-uu*.4,m1[1]-uu*.12,uu*.8,uu*.14);c.fillRect(m1[0]-uu*.13,m1[1]-uu*.8,uu*.26,uu*.7);c.beginPath();c.moveTo(m1[0]-uu*.16,m1[1]-uu*.8);c.lineTo(m1[0],m1[1]-uu*1.5);c.lineTo(m1[0]+uu*.16,m1[1]-uu*.8);c.fill();
      c.strokeStyle="#c9a24c";c.lineWidth=Math.max(1,uu*.04);c.beginPath();c.arc(m1[0],m1[1]-uu*1.62,uu*.08,.6,5.7);c.stroke();
    }},
    {z:0,draw(c,e,r){const{P}=e,poly=PAINT.helpers.poly,Q=(x,y,z=.4)=>P(DX(x),DY(y),z),u=e.u(.4),K=.0175*u;
      /* plaza: pale paving with sand drifted in the joints, long shadows thrown toward us */
      const p0=P(-14,-2,-2),p1=P(14,-2,6);const pg=c.createLinearGradient(0,p0[1],0,p1[1]);pg.addColorStop(0,"#d8bf98");pg.addColorStop(1,"#b8996f");c.fillStyle=pg;poly(c,[P(-16,-2,-2),P(16,-2,-2),P(16,-2,8),P(-16,-2,8)]);c.fill();
      c.strokeStyle="rgba(120,90,60,.25)";c.lineWidth=1;for(let z=-2;z<8;z+=.5){const a=P(-16,-2,z),b=P(16,-2,z);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}for(let x=-16;x<16;x+=.5){const a=P(x,-2,-2),b=P(x,-2,8);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}
      PAINT.helpers.grain(c,r,0,p0[1],e.W,e.H,6000,.25,"90,60,30");
      /* wings: low walls with arched windows, a lattice in each arch, a band of diamonds above */
      const stone=(pts,lit)=>{poly(c,pts);c.fillStyle=lit?"#ead8b6":"#d6c09a";c.fill();};
      [[-200,162],[345,720]].forEach(([a,b])=>{stone([Q(a,368,-.2),Q(a,215,-.2),Q(b,215,-.2),Q(b,368,-.2)],true);
        const top=c.createLinearGradient(0,Q(0,215,-.2)[1],0,Q(0,368,-.2)[1]);top.addColorStop(0,"rgba(255,230,190,.25)");top.addColorStop(1,"rgba(120,80,40,.18)");c.fillStyle=top;poly(c,[Q(a,368,-.2),Q(a,215,-.2),Q(b,215,-.2),Q(b,368,-.2)]);c.fill();
        c.fillStyle="#cbc5b8";poly(c,[Q(a,215,-.2),Q(b,215,-.2),Q(b,225,-.2),Q(a,225,-.2)]);c.fill();
        for(let x=a+6;x<b-6;x+=22){const p=Q(x,206,-.2),q=Q(x+12,215,-.2);c.fillStyle="#f3f0ea";c.fillRect(p[0],p[1],q[0]-p[0],q[1]-p[1]);}});
      [65,-40,-130,445,540,640].forEach(x=>{const cx=Q(x,290,-.15),bt=Q(x,368,-.15),R=28*K,ri=20*K;
        /* a pointed arch: two arcs meeting at the crown */
        const arch=(Rr)=>{c.beginPath();c.moveTo(cx[0]-Rr,bt[1]);c.lineTo(cx[0]-Rr,cx[1]);c.quadraticCurveTo(cx[0]-Rr,cx[1]-Rr*1.1,cx[0],cx[1]-Rr*1.55);c.quadraticCurveTo(cx[0]+Rr,cx[1]-Rr*1.1,cx[0]+Rr,cx[1]);c.lineTo(cx[0]+Rr,bt[1]);c.closePath();};
        c.fillStyle="#c9b088";arch(R);c.fill();
        const wg=c.createLinearGradient(0,cx[1]-ri*1.5,0,bt[1]);wg.addColorStop(0,"#3a3a44");wg.addColorStop(1,"#5c4c3c");c.fillStyle=wg;arch(ri);c.fill();
        c.save();c.clip();c.strokeStyle="rgba(214,190,150,.75)";c.lineWidth=Math.max(.6,K*1.6);const st=K*7;for(let d=-ri*3;d<ri*3;d+=st){c.beginPath();c.moveTo(cx[0]+d,cx[1]-ri);c.lineTo(cx[0]+d+ri*2.5,bt[1]);c.moveTo(cx[0]+d,cx[1]-ri);c.lineTo(cx[0]+d-ri*2.5,bt[1]);c.stroke();}c.restore();
        for(let k=0;k<7;k++){const q=Q(x-44+k*14+7,238,-.15),s=6*K;c.fillStyle="#bba27a";c.beginPath();for(let j=0;j<6;j++){const a=j/6*6.283+Math.PI/6;c.lineTo(q[0]+Math.cos(a)*s,q[1]+Math.sin(a)*s);}c.closePath();c.fill();c.fillStyle="rgba(40,70,110,.55)";c.beginPath();c.arc(q[0],q[1],s*.4,0,7);c.fill();}});
      /* the gate: two pillars and the lintel under a crenellated crest, the school's name in the band, the courtyard in shade beyond */
      const op=[Q(178,352,-1),Q(332,352,-1),Q(332,250,-1),Q(178,250,-1)];const og=c.createLinearGradient(0,op[2][1],0,op[0][1]);og.addColorStop(0,"#3b3029");og.addColorStop(.7,"#6a5440");og.addColorStop(1,"#c2a070");c.fillStyle=og;poly(c,op);c.fill();
      for(let k=0;k<6;k++){const a=Q(185+k*28,352,-.95),b=Q(185+k*28,320,-.95);c.strokeStyle="#2a2018";c.lineWidth=Math.max(1,K*2.4);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}
      {const a=Q(190,352,-.8),b=Q(320,340,-.8);c.fillStyle="#2a2018";c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);}
      const crest=[Q(162,368),Q(162,186)];for(let i=0;i<=8;i++)crest.push(Q(162+i*183/8,i%2?186:176));crest.push(Q(345,186),Q(345,368),Q(332,368),Q(332,250),Q(178,250),Q(178,368));
      poly(c,crest);const gg=c.createLinearGradient(Q(162,0)[0],0,Q(345,0)[0],0);gg.addColorStop(0,"#d4bf98");gg.addColorStop(.6,"#ecdcbc");gg.addColorStop(1,"#f6ead0");c.fillStyle=gg;c.fill();
      c.strokeStyle="rgba(120,90,60,.35)";c.lineWidth=1;for(let y=190;y<368;y+=9){const a=Q(162,y),b=Q(178,y),a2=Q(332,y),b2=Q(345,y);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.moveTo(a2[0],a2[1]);c.lineTo(b2[0],b2[1]);c.stroke();}
      for(let k=0;k<16;k++){const x=166+k*11.8,a=Q(x,225),b=Q(x+6,235),d=Q(x+12,225);c.fillStyle="#c4baa6";poly(c,[a,b,d]);c.fill();}
      {const a=Q(162,245),b=Q(345,245);c.strokeStyle="#a88a60";c.lineWidth=Math.max(1,K*2);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}
      {const m=Q(255,206);c.fillStyle="#7b5c2e";c.font=`600 ${Math.max(6,K*13).toFixed(1)}px Georgia,serif`;c.textAlign="center";c.textBaseline="middle";c.fillText("LYCÉE BONAPARTE",m[0],m[1]);c.fillStyle="rgba(255,236,190,.55)";c.fillText("LYCÉE BONAPARTE",m[0]-K*.6,m[1]-K*.6);}
      /* ambient occlusion where the walls meet the paving, and the gate's shadow thrown left across the plaza */
      [[-200,162],[345,720]].forEach(([a,b])=>{const p0=Q(a,368,-.2),p1=Q(b,368,-.2),q=c.createLinearGradient(0,p0[1]-u*.05,0,p0[1]+u*.35);q.addColorStop(0,"rgba(80,50,25,.38)");q.addColorStop(1,"rgba(80,50,25,0)");c.fillStyle=q;c.fillRect(p0[0],p0[1]-u*.05,p1[0]-p0[0],u*.4);});
      {const g0=Q(162,368,.5),g1=Q(345,368,.5);PAINT.helpers.cast(c,(g0[0]+g1[0])/2,g0[1],g1[0]-g0[0],u*2.2,-.9,.25,.22,"90,55,25");}
      /* steps */
      for(let k=0;k<3;k++){const a=Q(176-k*4,362+k*2,.6+k*.2),b=Q(334+k*4,368+k*2,.6+k*.2);c.fillStyle=k%2?"#cfb288":"#e0c59a";c.fillRect(a[0],a[1],b[0]-a[0],Math.max(2,b[1]-a[1]));}
      /* planters with olive trees, and long shadows from everything tall */
      c.fillStyle="rgba(70,45,25,.28)";[[95,1.4],[418,1.4]].forEach(([x])=>{const b=Q(x,368,.8),t=P(DX(x)-3.4,-2,3.5);c.beginPath();c.moveTo(b[0]-2,b[1]);c.lineTo(t[0]-6,t[1]);c.lineTo(t[0]+6,t[1]);c.lineTo(b[0]+2,b[1]);c.fill();});
      [[100,370],[405,370]].forEach(([x,y])=>{const b=Q(x,y,1.2),R=.65*u;c.fillStyle="#b39066";c.beginPath();c.ellipse(b[0],b[1]-.45*u,R,.32*u,0,0,7);c.fill();c.fillStyle="#8a6c48";c.beginPath();c.ellipse(b[0],b[1]-.5*u,R*.9,.24*u,0,0,7);c.fill();
        for(let k=0;k<50;k++){const a=r()*6.28,rr=r()*.5*u;c.fillStyle=r()<.5?"#6f7a4a":"#4f5a34";c.beginPath();c.ellipse(b[0]+Math.cos(a)*rr,b[1]-1.1*u+Math.sin(a)*rr*.5,u*.09,u*.05,a,0,7);c.fill();}});
      /* date palms */
      [[-9.2,-1.6,4.6],[-7.4,-1.1,4],[-5.9,-1.4,4.4],[6.2,-1.2,4.2],[7.8,-.8,4.8],[9.6,-1.5,4.3]].forEach(([x,z,hh])=>{const b=P(x,-2,z),uu=e.u(z);c.fillStyle="rgba(70,45,25,.25)";c.beginPath();c.ellipse(b[0]-uu*1.8,b[1]+uu*.1,uu*1.9,uu*.14,0,0,7);c.fill();datePalm(c,r,b[0],b[1],uu*hh);});
      /* wind towers (barjeel) rising over each wing: open on four sides near the top, slots in shade, a stepped cap */
      [-70,575].forEach(x=>{const b=Q(x,215,-.25),t=Q(x,120,-.25),w=34*K;c.fillStyle="#e2cda6";c.fillRect(b[0]-w/2,t[1],w,b[1]-t[1]);c.fillStyle="rgba(120,90,60,.22)";c.fillRect(b[0]-w/2,t[1],w*.28,b[1]-t[1]);
        for(let k=0;k<3;k++){c.fillStyle="#3c3128";c.fillRect(b[0]-w/2+w*(.14+k*.28),t[1]+w*.25,w*.14,w*.9);}
        c.fillStyle="#d4bc94";c.fillRect(b[0]-w*.6,t[1]-K*4,w*1.2,K*5);for(let k=0;k<5;k++){const xx=b[0]-w*.55+k*w*.27;c.beginPath();c.moveTo(xx,t[1]-K*4);c.lineTo(xx+w*.12,t[1]-K*11);c.lineTo(xx+w*.24,t[1]-K*4);c.fill();}});
      /* the family 4x4 at the kerb, dark, dusty, side on: it is the car that drives out into the dunes */
      {const b=P(4.5,-2,1.2),v=e.u(1.2)*.6,R=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(b[0]+x*v,b[1]+y*v,w*v,h*v);};
        c.fillStyle="rgba(60,40,20,.35)";c.beginPath();c.ellipse(b[0]-v*.4,b[1]+v*.05,v*2.6,v*.18,0,0,7);c.fill();
        const body=c.createLinearGradient(0,b[1]-v*1.5,0,b[1]-v*.3);body.addColorStop(0,"#3a2a20");body.addColorStop(.5,"#2b1d17");body.addColorStop(1,"#1a120e");c.fillStyle=body;
        PAINT.helpers.poly(c,[[b[0]-v*2.3,b[1]-v*.35],[b[0]-v*2.35,b[1]-v*.95],[b[0]-v*1.95,b[1]-v*1.05],[b[0]-v*1.4,b[1]-v*1.65],[b[0]+v*1.55,b[1]-v*1.7],[b[0]+v*1.75,b[1]-v*1.0],[b[0]+v*1.8,b[1]-v*.35]]);c.fill();
        {const rf=c.createLinearGradient(0,b[1]-v*1.05,0,b[1]-v*.35);rf.addColorStop(0,"rgba(255,226,180,.22)");rf.addColorStop(.35,"rgba(120,110,100,.06)");rf.addColorStop(.5,"rgba(0,0,0,.18)");rf.addColorStop(1,"rgba(200,160,110,.16)");c.fillStyle=rf;c.fillRect(b[0]-v*2.35,b[1]-v*1.05,v*4.15,v*.7);}
        c.fillStyle="#1c2430";PAINT.helpers.poly(c,[[b[0]-v*1.85,b[1]-v*1.08],[b[0]-v*1.32,b[1]-v*1.58],[b[0]-v*.2,b[1]-v*1.6],[b[0]-v*.2,b[1]-v*1.08]]);c.fill();PAINT.helpers.poly(c,[[b[0]-v*.08,b[1]-v*1.08],[b[0]-v*.08,b[1]-v*1.6],[b[0]+v*1.42,b[1]-v*1.62],[b[0]+v*1.6,b[1]-v*1.08]]);c.fill();
        c.fillStyle="rgba(255,226,170,.35)";PAINT.helpers.poly(c,[[b[0]-v*1.7,b[1]-v*1.12],[b[0]-v*1.3,b[1]-v*1.5],[b[0]-v*1.1,b[1]-v*1.5],[b[0]-v*1.5,b[1]-v*1.12]]);c.fill();
        c.fillStyle="rgba(255,214,150,.5)";c.fillRect(b[0]-v*2.3,b[1]-v*1.0,v*4.05,v*.04);R(-2.36,-.62,.18,.1,"#f4ead2");R(1.66,-.66,.12,.12,"#a02020");
        c.fillStyle="#d8c6a4";c.globalAlpha=.35;c.fillRect(b[0]-v*2.2,b[1]-v*.6,v*3.9,v*.25);c.globalAlpha=1;
        [-1.45,1.05].forEach(x=>{const w=P(4.4+x*.0,-2,1.6);c.fillStyle="#0c0a08";c.beginPath();c.arc(b[0]+x*v,b[1]-v*.3,v*.42,0,7);c.fill();c.fillStyle="#8a8478";c.beginPath();c.arc(b[0]+x*v,b[1]-v*.3,v*.2,0,7);c.fill();c.fillStyle="rgba(255,226,170,.5)";c.beginPath();c.arc(b[0]+x*v+v*.05,b[1]-v*.34,v*.08,0,7);c.fill();});
        R(1.2,-1.78,.1,.1,"#141010");R(-1.2,-1.78,2.4,.05,"#141010");}
      /* flag poles (the flags themselves move, so they are live) */
      [[95,115],[418,405]].forEach(([x0,x1])=>{const a=Q(x0,368,.8),b=Q(x1,35,.8);c.strokeStyle="#e6e3dc";c.lineWidth=Math.max(2,K*4.5);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();c.fillStyle="#c9a24c";c.beginPath();c.arc(b[0],b[1]-K*2,K*3,0,7);c.fill();});
      /* a parent and a child with a roller backpack, walking to the gate, long shadows */
      const person=(x,z,h,kid)=>{const b=P(x,-2,z),uu=e.u(z),H=h*uu;c.fillStyle="rgba(70,45,25,.3)";c.beginPath();c.moveTo(b[0]-H*.08,b[1]);c.lineTo(b[0]-H*1.6,b[1]+H*.18);c.lineTo(b[0]-H*1.5,b[1]+H*.26);c.lineTo(b[0]+H*.08,b[1]);c.fill();
        /* seen from behind, the sun on their right: the child in the school's white shirt and navy shorts (the same boy as on the court in Concord) */
        const top=kid?["#ffffff","#c9cfdb"]:["#cfdcec","#8e9cb4"],low=kid?"#22304a":"#b8a482",skin="#c9997a";
        c.strokeStyle=kid?skin:low;c.lineCap="round";c.lineWidth=H*.07;[-.045,.045].forEach(o=>{c.beginPath();c.moveTo(b[0]+o*H,b[1]-H*.44);c.lineTo(b[0]+o*H*1.2,b[1]-H*.03);c.stroke();});
        c.fillStyle="#efe9dc";[-.054,.054].forEach(o=>{c.beginPath();c.ellipse(b[0]+o*H,b[1]-H*.015,H*.05,H*.028,0,0,7);c.fill();});
        if(kid){c.fillStyle=low;c.fillRect(b[0]-H*.1,b[1]-H*.5,H*.2,H*.16);}
        {const tg=c.createLinearGradient(b[0]-H*.12,0,b[0]+H*.12,0);tg.addColorStop(0,top[1]);tg.addColorStop(.6,top[0]);tg.addColorStop(1,"#fff2d6");c.fillStyle=tg;c.beginPath();c.moveTo(b[0]-H*.1,b[1]-H*.46);c.lineTo(b[0]-H*.12,b[1]-H*.76);c.quadraticCurveTo(b[0],b[1]-H*.83,b[0]+H*.12,b[1]-H*.76);c.lineTo(b[0]+H*.1,b[1]-H*.46);c.closePath();c.fill();}
        c.strokeStyle=skin;c.lineWidth=H*.045;c.beginPath();c.moveTo(b[0]-H*.12,b[1]-H*.74);c.lineTo(b[0]-H*.14,b[1]-H*.48);c.moveTo(b[0]+H*.12,b[1]-H*.74);c.lineTo(b[0]+H*.13,b[1]-H*.5);c.stroke();
        c.fillStyle=skin;c.fillRect(b[0]-H*.028,b[1]-H*.85,H*.056,H*.06);c.fillStyle="#3e2c20";c.beginPath();c.arc(b[0],b[1]-H*.91,H*.078,0,7);c.fill();c.fillStyle="rgba(255,214,150,.4)";c.beginPath();c.arc(b[0]+H*.03,b[1]-H*.93,H*.045,0,7);c.fill();
        if(kid){c.strokeStyle="#2e2620";c.lineWidth=Math.max(1,H*.02);c.beginPath();c.moveTo(b[0]+H*.1,b[1]-H*.5);c.lineTo(b[0]+H*.45,b[1]-H*.2);c.stroke();c.fillStyle="#7a2a2a";c.fillRect(b[0]+H*.36,b[1]-H*.32,H*.24,H*.3);c.fillStyle="#1a1410";c.beginPath();c.arc(b[0]+H*.42,b[1],H*.03,0,7);c.arc(b[0]+H*.56,b[1],H*.03,0,7);c.fill();}};
      person(-.5,.9,1.2,false);person(.1,.9,.8,true);
    }}
  ],
  cue:"a flag",
  poke(e){gust=e.T;return true;},
  hot(x,y,e){const u=e.u(.8);return FLAGS.some(fx=>{const o=e.P(DX(fx),DY(35),.8);return x>o[0]-u*.25&&x<o[0]+u*1.35&&y>o[1]-u*.3&&y<o[1]+u*1.1;});},
  tap(x,y,e){if(!this.hot(x,y,e))return false;gust=e.T;return true;},
  live(g,e,H,i){const{P,T}=e,gk=1+2.4*(T>=gust?Math.exp(-(T-gust)/1.2):0);
    if(i===0){/* heat shimmer over the far layer: the lowest band wavers */return;}
    if(i!==1)return;
    /* the flags: French tricolour and the Qatari maroon with its serrated white band */
    const Q=(x,y,z)=>P(DX(x),DY(y),z),u=e.u(.8);
    const flag=(x1,y1,kind)=>{const o=Q(x1,y1,.8),w=1.1*u,h=.7*u,N=16,top=[],bot=[];
      for(let k=0;k<=N;k++){const t=k/N,wave=(Math.sin(t*5-T*5.5)*u*.06*t+Math.sin(t*9-T*8)*u*.02*t)*gk;top.push([o[0]+t*w,o[1]+wave]);bot.push([o[0]+t*w,o[1]+h+wave+t*u*.03]);}
      const band=(t0,t1,col)=>{g.fillStyle=col;g.beginPath();for(let k=0;k<=N;k++){const t=k/N;if(t<t0-1e-6||t>t1+1e-6)continue;const p=top[k];g.lineTo(p[0],p[1]);}for(let k=N;k>=0;k--){const t=k/N;if(t<t0-1e-6||t>t1+1e-6)continue;const p=bot[k];g.lineTo(p[0],p[1]);}g.closePath();g.fill();};
      if(kind==="fr"){band(0,1/3+.01,"#1f3c8a");band(1/3,2/3+.01,"#f2efe8");band(2/3,1,"#c8262f");}
      else{band(0,1,"#7a1430");g.fillStyle="#f2efe8";g.beginPath();g.moveTo(top[0][0],top[0][1]);const n=9;for(let k=0;k<=5;k++)g.lineTo(top[k][0],top[k][1]);for(let j=0;j<=n*2;j++){const y=j/(n*2),k=5,tx=top[k][0]+(j%2?u*.07:0),ty=top[k][1]+(bot[k][1]-top[k][1])*y;g.lineTo(tx,ty);}for(let k=5;k>=0;k--)g.lineTo(bot[k][0],bot[k][1]);g.closePath();g.fill();}
      /* folds: light and shade running down the cloth */
      for(let k=0;k<N;k++){const s=Math.cos((k/N)*5-T*5.5);g.fillStyle=s>0?`rgba(255,240,210,${(s*.18).toFixed(3)})`:`rgba(0,0,0,${(-s*.22).toFixed(3)})`;g.beginPath();g.moveTo(top[k][0],top[k][1]);g.lineTo(top[k+1][0],top[k+1][1]);g.lineTo(bot[k+1][0],bot[k+1][1]);g.lineTo(bot[k][0],bot[k][1]);g.fill();}};
    flag(115,35,"fr");flag(405,35,"qa");
    /* rock doves wheeling over the gate in the heat */
    H.flock(g,e,7,.5,.2,.18,.05,4*e.dpr,"rgba(70,56,48,.8)",.8,3);
    /* dust hanging in the low sun */
    g.globalCompositeOperation="lighter";const r=H.rng(8);
    for(let k=0;k<140;k++){const x=(r()*e.W+T*(6+r()*14)*e.dpr)%e.W,y=r()*e.H*.85+Math.sin(T*.5+k)*8*e.dpr,a=.1+r()*.25;g.fillStyle=`rgba(255,226,170,${a.toFixed(2)})`;g.fillRect(x,y,1.4*e.dpr,1.4*e.dpr);}
    /* the heat itself: a warm veil low over everything */
    g.globalCompositeOperation="source-over";const hz=g.createLinearGradient(0,e.H*.35,0,e.H*.75);hz.addColorStop(0,"rgba(255,220,170,0)");hz.addColorStop(.6,"rgba(255,214,160,.16)");hz.addColorStop(1,"rgba(255,214,160,0)");g.fillStyle=hz;g.fillRect(0,e.H*.35,e.W,e.H*.4);
  },
  grade(g,e){const gr=g.createLinearGradient(e.W,0,0,0);gr.addColorStop(0,"rgba(255,190,110,.14)");gr.addColorStop(.7,"rgba(255,190,110,0)");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    const v=g.createRadialGradient(e.W/2,e.H*.45,e.H*.35,e.W/2,e.H*.45,e.H*1.1);v.addColorStop(0,"rgba(0,0,0,0)");v.addColorStop(1,"rgba(40,20,0,.4)");g.fillStyle=v;g.fillRect(0,0,e.W,e.H);}
});
})();
