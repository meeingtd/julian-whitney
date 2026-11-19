/* Barcelona, fall 2024: the first coffee of the morning on a balcony in the Eixample, and across the roofs the Sagrada Familia, still being
   built, its cranes turning. Its towers stand on the outline the globe's limb turns into (SIL.sagrada: towers at x -2.25, -.8, 0, .8, 2.25).
   Live: the cranes slew, swifts cut across the sky, steam rises off the cup, the morning light warms. */
(()=>{
const CR=[[-1.3,6.2,-2,.4],[1.9,5.6,-2.5,-.3]],slew=[0,0],want=[0,0];let lt=0; /* touch: a crane swings round */
const TOWERS=[[-2.25,3.4,1,.56],[-1.55,2.6,1.2,.46],[-.8,3.9,1,.58],[0,4.7,-1,.8],[.8,3.9,1,.58],[1.55,2.6,1.2,.46],[2.25,3.4,1,.56]];
PAINT.scene({id:"p-bcn",win:CUTW("bcn"),s:[.803,.85],refZ:0,
  /* one light: the morning sun low to the left; shadows fall right; the basilica and the hills sit back in sea haze */
  air:{rgb:"206,214,226",k:.3,z0:5},
  look(e){const s=e.P(-12,2.5+1.5*e.lp,-30);return{bloom:.22,sun:[s[0]/e.W,s[1]/e.H,"255,226,180",.08,.6],grade:"rgba(255,214,170,.12)",vig:.3,grain:.045};},
  sky(g,e){const gr=g.createLinearGradient(0,0,0,e.H*.75);gr.addColorStop(0,"#5f8fc0");gr.addColorStop(.5,"#9cc0dd");gr.addColorStop(.85,"#e8d9c4");gr.addColorStop(1,"#f3dcc0");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    const s=e.P(-12,2.5+1.5*e.lp,-30),gl=g.createRadialGradient(s[0],s[1],0,s[0],s[1],e.H*.7);gl.addColorStop(0,"rgba(255,244,214,.9)");gl.addColorStop(.12,"rgba(255,228,180,.4)");gl.addColorStop(1,"rgba(255,220,170,0)");g.fillStyle=gl;g.fillRect(0,0,e.W,e.H);},
  layers:[
    {z:-1,draw(c,e,r){const{P}=e,poly=PAINT.helpers.poly;
      /* far city and the Collserola hills in morning haze */
      c.fillStyle="#9fb0c0";c.beginPath();c.moveTo(0,e.H);for(let x=-30;x<=30;x+=.5){const p=P(x,-.8+.9*Math.sin(x*.21)+.4*Math.sin(x*.53),-28);c.lineTo(p[0],p[1]);}c.lineTo(e.W,e.H);c.fill();
      for(let i=0;i<220;i++){const x=-22+r()*44,h=.2+r()*.7,w=.3+r()*.6,a=P(x,-2,-14),b=P(x+w,h-1.6,-14);c.fillStyle=`rgba(${200+r()*30|0},${190+r()*25|0},${175+r()*25|0},.9)`;c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);}
      /* the Sagrada Familia in fall 2024, seen from the Eixample on the Nativity side. Sandstone lit from the left (morning, east). */
      const B=-.4;
      /* one of Gaudi's towers: a tall parabola, banded with spiral openings, ending in a mosaic pinnacle (bishop's mitre, cross and balls) */
      const tower=(x,h,z,w,o)=>{const u=e.u(z),base=P(x,B,z),top=P(x,h,z),bw=w*u,N=30,shape=t=>1-Math.pow(t,1.9)*.84,L=[],R=[];
        for(let i=0;i<=N;i++){const t=i/N,y=base[1]+(top[1]-base[1])*t;L.push([base[0]-bw/2*shape(t),y]);R.push([base[0]+bw/2*shape(t),y]);}
        const out=[...L,...R.slice().reverse()],gr=c.createLinearGradient(base[0]-bw/2,0,base[0]+bw/2,0);
        gr.addColorStop(0,o.pale?"#f4ece0":"#f2dcba");gr.addColorStop(.42,o.pale?"#e4dccd":"#dcbf98");gr.addColorStop(1,o.pale?"#a8a092":"#957760");c.fillStyle=gr;poly(c,out);c.fill();
        if(o.soot){const sg=c.createLinearGradient(0,top[1],0,base[1]);sg.addColorStop(0,"rgba(60,45,35,0)");sg.addColorStop(1,"rgba(60,45,35,.35)");c.fillStyle=sg;poly(c,out);c.fill();}
        c.save();poly(c,out);c.clip();
        /* the spiral of louvred openings winding up the tower */
        for(let i=3;i<N-6;i++){const t=i/N,y=base[1]+(top[1]-base[1])*t,ww=bw*shape(t),off=(i*.37)%1;
          for(let k=0;k<4;k++){const f=((k+off)/4)%1,xx=base[0]-ww/2+ww*(.12+f*.76),sc=Math.sin(f*Math.PI);c.fillStyle=`rgba(50,34,26,${(.35+.35*sc).toFixed(2)})`;c.fillRect(xx-ww*.035*sc,y-u*.05,Math.max(.6,ww*.07*sc),u*.08);}}
        /* rope-like ridges down the shaft */
        c.strokeStyle="rgba(255,240,215,.22)";c.lineWidth=Math.max(.5,u*.012);[-.25,.15].forEach(f=>{c.beginPath();for(let i=0;i<=N;i++){const t=i/N,y=base[1]+(top[1]-base[1])*t;c.lineTo(base[0]+bw*shape(t)*f,y);}c.stroke();});
        c.restore();
        const f=top,s=u*w*.42;
        if(o.mitre){/* the pinnacle: a faceted mitre in Venetian glass, white balls on its edges, a cross on top, red and gold below */
          c.fillStyle="#c13a2a";poly(c,[[f[0]-s*.55,f[1]+s*.5],[f[0]-s*.45,f[1]-s*.2],[f[0]+s*.45,f[1]-s*.2],[f[0]+s*.55,f[1]+s*.5]]);c.fill();
          c.fillStyle="#e2b52e";poly(c,[[f[0]-s*.45,f[1]-s*.2],[f[0],f[1]-s*1.5],[f[0]+s*.45,f[1]-s*.2]]);c.fill();
          c.fillStyle="#f6f2ea";poly(c,[[f[0]-s*.12,f[1]-s*.2],[f[0],f[1]-s*1.5],[f[0]+s*.12,f[1]-s*.2]]);c.fill();
          c.fillStyle="#f4f0e8";for(let k=0;k<7;k++){const t=k/6,xx=f[0]+(t-.5)*s*1.1;c.beginPath();c.arc(xx,f[1]-s*.22,s*.09,0,7);c.fill();}
          c.fillStyle="#f6f2ea";c.fillRect(f[0]-s*.05,f[1]-s*2.1,s*.1,s*.62);c.fillRect(f[0]-s*.22,f[1]-s*1.9,s*.44,s*.09);[[-.22,-1.86],[.22,-1.86],[0,-2.1]].forEach(([dx,dy])=>{c.beginPath();c.arc(f[0]+dx*s,f[1]+dy*s,s*.08,0,7);c.fill();});}
        if(o.star){/* the Virgin Mary tower's twelve-pointed glass star */c.fillStyle="#eef2f6";c.beginPath();for(let k=0;k<24;k++){const a=k/24*6.283-Math.PI/2,rr=k%2?s*.45:s*1.05;c.lineTo(f[0]+Math.cos(a)*rr,f[1]-s*1.1+Math.sin(a)*rr);}c.closePath();c.fill();c.fillStyle="rgba(150,180,210,.6)";c.beginPath();c.arc(f[0]+s*.15,f[1]-s*1.2,s*.3,0,7);c.fill();}
        if(o.symbol){/* evangelist towers: a white ceramic crown and the figure on top */c.fillStyle="#eef0f0";c.beginPath();c.ellipse(f[0],f[1]-s*.3,s*.55,s*.4,0,0,7);c.fill();c.fillStyle="#d8dcdc";c.beginPath();c.arc(f[0],f[1]-s*.9,s*.38,0,7);c.fill();c.fillStyle="rgba(150,160,170,.5)";c.beginPath();c.arc(f[0]+s*.12,f[1]-s*.85,s*.22,0,7);c.fill();}
        if(o.open){/* the Jesus tower is still going up in 2024: its top is open and wrapped in scaffold */
          const a=P(x-w*.32,h-.9,z),b=P(x+w*.32,h+.15,z);c.strokeStyle="rgba(70,70,80,.6)";c.lineWidth=Math.max(.5,u*.012);for(let y=a[1];y>b[1];y-=u*.1){c.beginPath();c.moveTo(a[0],y);c.lineTo(b[0],y);c.stroke();}for(let xx=a[0];xx<=b[0];xx+=u*.1){c.beginPath();c.moveTo(xx,a[1]);c.lineTo(xx,b[1]);c.stroke();}}
      };
      /* back to front: Passion towers (newer, paler stone) behind, the Virgin Mary and the Evangelists, the unfinished Jesus tower, then the nave and apse */
      [[-1.9,3.5],[-.75,3.95],[.75,3.95],[1.9,3.5]].forEach(([x,h])=>tower(x,h,-4.5,.42,{pale:1,mitre:1}));
      tower(-1.25,4.75,-2.6,.6,{star:1});
      [[-.75,4.5,-1.6],[.75,4.5,-1.6],[-.45,4.35,-3],[.45,4.35,-3]].forEach(([x,h,z])=>tower(x,h,z,.52,{symbol:1}));
      tower(0,5.3,-2.2,.82,{open:1});
      {const u=e.u(-1);c.fillStyle="#d4b68e";poly(c,[P(-2.7,B,-1),P(-2.7,1.2,-1),P(2.7,1.2,-1),P(2.7,B,-1)]);c.fill();
        for(let k=0;k<11;k++){const x=-2.5+k*.5,p=P(x,1.2,-1);c.fillStyle="#dcc19c";c.beginPath();c.moveTo(p[0]-u*.12,p[1]);c.quadraticCurveTo(p[0],p[1]-u*.9,p[0]+u*.12,p[1]);c.fill();c.fillStyle="#c9452f";c.beginPath();c.arc(p[0],p[1]-u*.62,u*.05,0,7);c.fill();}}
      /* the Nativity facade's four bell towers, the inner pair taller, stone darkened toward the base */
      [[-1.65,3.35],[-.6,3.95],[.6,3.95],[1.65,3.35]].forEach(([x,h])=>tower(x,h,1,.62,{mitre:1,soot:1}));
      /* the Nativity facade: three portals under steep gables, the stone carved and dripping like a cave, the green cypress of the
         Tree of Life over the middle portal with white doves on it */
      {const z=1.25,u=e.u(z);
        [[-1.15,.55,1.3],[0,.85,2.1],[1.15,.55,1.3]].forEach(([x,hw,ht])=>{const pts=[P(x-hw,B-1.6,z),P(x-hw,B+ht*.45,z),P(x,B+ht,z),P(x+hw,B+ht*.45,z),P(x+hw,B-1.6,z)];
          const gr=c.createLinearGradient(0,P(0,B+ht,z)[1],0,P(0,B-1.6,z)[1]);gr.addColorStop(0,"#e6cba4");gr.addColorStop(1,"#8c7058");c.fillStyle=gr;poly(c,pts);c.fill();
          c.save();poly(c,pts);c.clip();for(let k=0;k<420;k++){const px=x+(r()-.5)*hw*2,py=B-1.6+r()*(ht+1.6),p=P(px,py,z),rr=u*(.015+r()*.035);c.fillStyle=r()<.5?"rgba(70,50,36,.16)":"rgba(255,236,205,.14)";c.beginPath();c.ellipse(p[0],p[1],rr,rr*1.6,0,0,7);c.fill();}
          for(let k=0;k<14;k++){const px=x+(r()-.5)*hw*1.8,p=P(px,B+ht*.3*r(),z),l=u*(.15+r()*.35);c.strokeStyle="rgba(80,60,45,.35)";c.lineWidth=Math.max(.6,u*.03);c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(p[0],p[1]+l);c.stroke();}c.restore();
          const d0=P(x-hw*.45,B-1.6,z),d1=P(x+hw*.45,B-.1,z);c.fillStyle="#3a2c26";c.beginPath();c.moveTo(d0[0],d0[1]);c.lineTo(d0[0],d1[1]+u*.3);c.quadraticCurveTo((d0[0]+d1[0])/2,d1[1]-u*.4,d1[0],d1[1]+u*.3);c.lineTo(d1[0],d0[1]);c.fill();});
        const cy=P(0,B+1.6,z+.02);c.fillStyle="#3f6e46";c.beginPath();c.moveTo(cy[0],cy[1]-u*1.05);c.quadraticCurveTo(cy[0]+u*.36,cy[1]-u*.2,cy[0]+u*.2,cy[1]+u*.35);c.lineTo(cy[0]-u*.2,cy[1]+u*.35);c.quadraticCurveTo(cy[0]-u*.36,cy[1]-u*.2,cy[0],cy[1]-u*1.05);c.fill();
        c.fillStyle="rgba(160,200,150,.45)";c.beginPath();c.ellipse(cy[0]-u*.08,cy[1]-u*.3,u*.07,u*.4,0,0,7);c.fill();
        c.fillStyle="#f4f2ee";for(let k=0;k<9;k++){const p=[cy[0]+(r()-.5)*u*.4,cy[1]-u*.8+r()*u*1.05];c.beginPath();c.ellipse(p[0],p[1],u*.04,u*.025,r(),0,7);c.fill();}
        c.fillRect(cy[0]-u*.02,cy[1]-u*1.3,u*.04,u*.26);c.fillRect(cy[0]-u*.08,cy[1]-u*1.24,u*.16,u*.035);}
    }},
    {z:3.5,draw(c,e,r){const{P}=e,poly=PAINT.helpers.poly;
      /* Eixample rooftops: chamfered blocks, terracotta, roof terraces with water tanks, antennas, a few palms in the courtyards */
      for(let k=0;k<70;k++){const x=-14+r()*28,z=2+r()*3,w=.8+r()*1.6,h=-1.1+r()*.5,a=P(x,-2,z),b=P(x+w,h,z),u=e.u(z);
        const col=["#d8b48e","#cfa07a","#e6cfb0","#c98f6a","#efe3cf"][Math.floor(r()*5)];c.fillStyle=col;c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);
        /* the Eixample's cut corner (xamfrà): a narrower face set at 45 degrees on the block's end, catching the light differently */
        if(r()<.55){const ch=(b[0]-a[0])*.22,side=r()<.5;const x0=side?a[0]:b[0]-ch;c.fillStyle=side?"rgba(255,240,215,.28)":"rgba(80,55,40,.22)";c.fillRect(x0,b[1],ch,a[1]-b[1]);c.fillStyle="rgba(60,40,30,.35)";c.fillRect(side?a[0]+ch:b[0]-ch,b[1],Math.max(1,u*.012),a[1]-b[1]);
          for(let y=b[1]+u*.14;y<a[1]-u*.1;y+=u*.22){c.fillStyle="rgba(40,36,36,.8)";c.fillRect(x0+ch*.3,y,ch*.4,u*.12);c.fillStyle="#2a2624";c.fillRect(x0+ch*.15,y+u*.12,ch*.7,u*.02);}}
        c.fillStyle="rgba(90,60,40,.18)";c.fillRect(a[0]+(b[0]-a[0])*.65,b[1],(b[0]-a[0])*.35,a[1]-b[1]);
        for(let y=b[1]+u*.12;y<a[1]-u*.08;y+=u*.22)for(let xx=a[0]+u*.1;xx<b[0]-u*.12;xx+=u*.2){c.fillStyle=r()<.2?"#3d3a3a":"rgba(70,55,50,.75)";c.fillRect(xx,y,u*.08,u*.12);c.fillStyle="rgba(30,30,30,.6)";c.fillRect(xx-u*.01,y+u*.12,u*.1,u*.012);}
        c.fillStyle="#b56a45";c.fillRect(a[0],b[1]-u*.04,b[0]-a[0],u*.05);for(let xx=a[0];xx<b[0];xx+=Math.max(1.5,u*.035)){c.fillStyle="rgba(120,50,30,.35)";c.fillRect(xx,b[1]-u*.04,Math.max(.5,u*.008),u*.05);}c.fillStyle="rgba(255,226,190,.35)";c.fillRect(a[0],b[1]-u*.045,b[0]-a[0],Math.max(.6,u*.008));c.fillStyle="rgba(60,40,30,.22)";c.fillRect(a[0],b[1]+u*.01,b[0]-a[0],u*.05);
        if(r()<.5){const t=P(x+w*.3,h,z);c.fillStyle="#e4ddd2";c.fillRect(t[0],t[1]-u*.14,u*.16,u*.14);}
        if(r()<.35){const t=P(x+w*.7,h,z);c.strokeStyle="#4a4646";c.lineWidth=1;c.beginPath();c.moveTo(t[0],t[1]);c.lineTo(t[0],t[1]-u*.3);c.moveTo(t[0]-u*.08,t[1]-u*.22);c.lineTo(t[0]+u*.08,t[1]-u*.22);c.stroke();}}
    }},
    {z:7.4,draw(c,e,r){const{P}=e,u=e.u(7.4);
      /* the balcony: a stone ledge, a wrought-iron railing with scrolls, geraniums in a pot, and the coffee */
      const l0=P(-6,-0.53,7.4),l1=P(6,-0.53,7.4);c.fillStyle="#d9c7ad";c.fillRect(l0[0],l0[1],l1[0]-l0[0],u*.12);c.fillStyle="rgba(255,240,215,.6)";c.fillRect(l0[0],l0[1],l1[0]-l0[0],u*.02);
      c.fillStyle="#b8a588";c.fillRect(l0[0],l0[1]+u*.12,l1[0]-l0[0],e.H);
      c.strokeStyle="#1d1c1e";c.lineWidth=Math.max(1,u*.025);const t0=P(-6,0.12,7.6),t1=P(6,0.12,7.6);c.beginPath();c.moveTo(t0[0],t0[1]);c.lineTo(t1[0],t1[1]);c.stroke();{const q0=P(-6,0.15,7.3),q1=P(6,0.15,7.3);c.fillStyle="#2a2624";c.fillRect(q0[0],q0[1],q1[0]-q0[0],u*.07);c.fillStyle="rgba(255,230,190,.55)";c.fillRect(q0[0],q0[1],q1[0]-q0[0],Math.max(1,u*.012));}
      for(let x=-6;x<6;x+=.32){const a=P(x,0.12,7.6),b=P(x,-1.4,7.6);c.lineWidth=Math.max(1,u*.018);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();
        const m=P(x+.16,-.35,7.6);c.lineWidth=Math.max(.8,u*.012);c.beginPath();c.arc(m[0]-u*.05,m[1],u*.06,-1.5,2.5);c.stroke();c.beginPath();c.arc(m[0]+u*.05,m[1]+u*.1,u*.06,1.6,5.6);c.stroke();}
      /* geraniums */
      const pp=P(-1.9,0.15,7.3);PAINT.helpers.shadow(c,pp[0]+u*.12,pp[1],u*.3,u*.05,.4,"60,40,30");c.fillStyle="#b4532f";c.beginPath();c.moveTo(pp[0]-u*.2,pp[1]);c.lineTo(pp[0]-u*.16,pp[1]-u*.28);c.lineTo(pp[0]+u*.16,pp[1]-u*.28);c.lineTo(pp[0]+u*.2,pp[1]);c.fill();
      for(let k=0;k<70;k++){const a=r()*6.28,rr=r()*u*.3;c.fillStyle=r()<.35?"#d8283a":r()<.7?"#3f6b2c":"#2d5222";c.beginPath();c.arc(pp[0]+Math.cos(a)*rr,pp[1]-u*.42+Math.sin(a)*rr*.6,u*(.03+r()*.03),0,7);c.fill();}
      /* the cup and saucer, morning light on the rim */
      const cp=P(1.25,0.15,7.25);c.fillStyle="rgba(60,40,30,.25)";c.beginPath();c.ellipse(cp[0]+u*.08,cp[1]+u*.01,u*.22,u*.04,0,0,7);c.fill();
      c.fillStyle="#f4f1ea";c.beginPath();c.ellipse(cp[0],cp[1]-u*.01,u*.2,u*.045,0,0,7);c.fill();
      c.fillStyle="#f8f6f0";c.beginPath();c.moveTo(cp[0]-u*.1,cp[1]-u*.18);c.quadraticCurveTo(cp[0]-u*.1,cp[1]-u*.02,cp[0],cp[1]-u*.02);c.quadraticCurveTo(cp[0]+u*.1,cp[1]-u*.02,cp[0]+u*.1,cp[1]-u*.18);c.fill();
      c.fillStyle="#5a3520";c.beginPath();c.ellipse(cp[0],cp[1]-u*.18,u*.1,u*.025,0,0,7);c.fill();c.fillStyle="rgba(210,160,110,.6)";c.beginPath();c.ellipse(cp[0]-u*.02,cp[1]-u*.185,u*.05,u*.01,0,0,7);c.fill();
      c.strokeStyle="#f4f1ea";c.lineWidth=Math.max(1,u*.02);c.beginPath();c.arc(cp[0]+u*.12,cp[1]-u*.11,u*.04,-1.4,1.4);c.stroke();
      c.fillStyle="rgba(255,236,200,.7)";c.fillRect(cp[0]-u*.09,cp[1]-u*.17,u*.02,u*.12);
    }}
  ],
  cue:"a crane",
  poke(e){want[0]+=2.1;if(e.T===0)slew[0]=want[0];return true;},
  hot(x,y,e){return CR.findIndex(([cx,h,z])=>{const b=e.P(cx,-.4,z),t=e.P(cx,h,z),u=e.u(z);return x>t[0]-u*2.6&&x<t[0]+u*2.6&&y>t[1]-u*.7&&y<b[1]&&(Math.abs(x-t[0])<u*.5||y<t[1]+u*1.7);})+1;},
  tap(x,y,e){const k=this.hot(x,y,e);if(!k)return false;want[k-1]+=2.1;if(e.T===0)slew[k-1]=want[k-1];return true;},
  live(g,e,H,i){const{P,T}=e;
    if(i===0){/* tower cranes beside the basilica, slewing slowly, a load on the hook */
      const d=Math.min(.05,Math.max(0,T-lt));lt=T;
      CR.forEach(([x,h,z,ph],k)=>{slew[k]+=(want[k]-slew[k])*(1-Math.exp(-d*1.6));const b=P(x,-.4,z),t=P(x,h,z),u=e.u(z),ang=Math.sin(T*.07+ph)*1.0+slew[k],jib=u*2.4*Math.cos(ang),cj=-u*.8*Math.cos(ang);
        g.strokeStyle="#c9a227";g.lineWidth=Math.max(1,u*.05);g.beginPath();g.moveTo(b[0],b[1]);g.lineTo(t[0],t[1]);g.stroke();
        g.lineWidth=Math.max(.6,u*.015);for(let y=b[1];y>t[1];y-=u*.18){g.beginPath();g.moveTo(b[0]-u*.06,y);g.lineTo(b[0]+u*.06,y-u*.18);g.stroke();}
        g.lineWidth=Math.max(1,u*.04);g.beginPath();g.moveTo(t[0]+cj,t[1]);g.lineTo(t[0]+jib,t[1]);g.stroke();g.fillStyle="#6b6a66";g.fillRect(t[0]+cj-u*.1,t[1],u*.2,u*.12);
        g.beginPath();g.moveTo(t[0],t[1]);g.lineTo(t[0],t[1]-u*.4);g.lineTo(t[0]+jib*.9,t[1]);g.moveTo(t[0],t[1]-u*.4);g.lineTo(t[0]+cj,t[1]);g.lineWidth=Math.max(.5,u*.01);g.stroke();
        const hx=t[0]+jib*.6,hy=t[1]+u*(1.2+.3*Math.sin(T*.2+k));g.strokeStyle="rgba(40,40,40,.7)";g.beginPath();g.moveTo(hx,t[1]);g.lineTo(hx,hy);g.stroke();g.fillStyle="#7a6a5a";g.fillRect(hx-u*.08,hy,u*.16,u*.1);
        H.glow(g,"255,60,40",t[0]+jib,t[1],u*.1,.5+.5*Math.sin(T*3+k));});}
    if(i===1){/* swifts wheeling over the roofs */
      g.strokeStyle="rgba(30,30,40,.85)";g.lineWidth=1.6*e.dpr;
      for(let k=0;k<9;k++){const ph=k*1.7,x=e.W*(.5+.42*Math.sin(T*.23+ph)),y=e.H*(.18+.12*Math.sin(T*.31+ph*1.3)),f=Math.sin(T*14+k)*4*e.dpr,s=5*e.dpr;g.beginPath();g.moveTo(x-s*1.4,y+f*.4);g.quadraticCurveTo(x-s*.5,y-f*.6,x,y);g.quadraticCurveTo(x+s*.5,y-f*.6,x+s*1.4,y+f*.4);g.stroke();}}
    if(i===1){/* laundry on a line across a roof terrace, moving in the sea breeze */
      const a=P(-5.2,-1.05,3.2),b=P(-3.4,-1.0,3.2),u=e.u(3.2);g.strokeStyle="rgba(60,50,46,.6)";g.lineWidth=1;g.beginPath();g.moveTo(a[0],a[1]);g.quadraticCurveTo((a[0]+b[0])/2,a[1]+u*.08,b[0],b[1]);g.stroke();
      ["#f3efe6","#3d6aa8","#e9d7a8","#c8484a","#f3efe6"].forEach((col,k)=>{const t=(k+.6)/5.4,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t+u*.08*4*t*(1-t),sw=Math.sin(T*1.8+k)*u*.04;g.fillStyle=col;g.beginPath();g.moveTo(x-u*.07,y);g.lineTo(x+u*.07,y);g.lineTo(x+u*.07+sw,y+u*.16);g.lineTo(x-u*.07+sw,y+u*.16);g.fill();});}
    if(i===2){/* a pigeon on the railing, bobbing and turning its head */
      {const p=P(3.4,0.2,7.3),u=e.u(7.3),bob=Math.abs(Math.sin(T*1.3))<.15?u*.02:0,tn=Math.sin(T*.6)>0?1:-1;g.fillStyle="#7d8088";g.beginPath();g.ellipse(p[0],p[1]-u*.1+bob,u*.13,u*.07,0,0,7);g.fill();g.fillStyle="#5d616a";g.beginPath();g.ellipse(p[0]-tn*u*.13,p[1]-u*.08+bob,u*.07,u*.035,0,0,7);g.fill();
        g.fillStyle="#6a6e78";g.beginPath();g.arc(p[0]+tn*u*.12,p[1]-u*.2+bob,u*.05,0,7);g.fill();g.fillStyle="rgba(120,160,130,.6)";g.fillRect(p[0]+tn*u*.07,p[1]-u*.17+bob,u*.06,u*.03);g.fillStyle="#d8a04a";g.fillRect(p[0]+tn*u*.16,p[1]-u*.2+bob,tn*u*.04,u*.012);
        g.strokeStyle="#c87a6a";g.lineWidth=Math.max(1,u*.012);g.beginPath();g.moveTo(p[0]-u*.03,p[1]-u*.04+bob);g.lineTo(p[0]-u*.03,p[1]);g.moveTo(p[0]+u*.03,p[1]-u*.04+bob);g.lineTo(p[0]+u*.03,p[1]);g.stroke();}
      /* steam off the coffee */
      const cp=P(1.25,0.36,7.25),u=e.u(7.25);
      for(let k=0;k<8;k++){const t=((T*.35+k/8)%1),x=cp[0]+Math.sin(T*1.3+k*1.7+t*4)*u*.06*t*2,y=cp[1]-t*u*.7,rr=u*(.04+t*.12);const gr=g.createRadialGradient(x,y,0,x,y,rr);gr.addColorStop(0,`rgba(255,255,255,${(.32*(1-t)*Math.min(1,t*5)).toFixed(3)})`);gr.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=gr;g.fillRect(x-rr,y-rr,rr*2,rr*2);}}
  },
  grade(g,e){const gr=g.createLinearGradient(0,0,e.W,0);gr.addColorStop(0,"rgba(255,200,130,.16)");gr.addColorStop(.6,"rgba(255,200,130,0)");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);}
});
})();
