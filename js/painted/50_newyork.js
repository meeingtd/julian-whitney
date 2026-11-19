/* New York, where he is headed: Manhattan just before sunrise from the Brooklyn side, the towers still lit, the sky warming, the Brooklyn
   Bridge in front with its stone arches and web of cables, the East River holding every light. The skyline's peaks are the ones the outline
   lands on (SIL.ny). Live: headlights cross the bridge, windows go on and off, a ferry crosses, and a plane blinks across the dawn, the same
   kind of light the story started with. */
(()=>{
let esb=0,esbT=-9;const ESB=[null,["255,70,70","255,255,255","90,130,255"],["127,214,194","127,214,194","127,214,194"],["255,176,70","255,120,60","255,176,70"]]; /* touch: the Empire State Building changes its lights */
const LAND=[[-2.8,3.3,-1.2,"crown"],[0,4.1,-1,"empire"],[3.1,4.2,-1.2,"spire"]];
PAINT.scene({id:"p-ny",win:CUTW("ny"),s:[.917,.958],refZ:-1,
  /* one light: dawn coming up behind us in the east, warming the faces of the towers; river mist softens Manhattan behind the bridge */
  air:{rgb:"132,118,156",k:.26,z0:0},
  look(e){return{bloom:.34,sun:[.5,.68,"255,190,150",.1+.08*e.lp,.7],grade:"rgba(255,176,160,.1)",vig:0,grain:.06};},
  sky(g,e){const gr=g.createLinearGradient(0,0,0,e.H*.7);gr.addColorStop(0,"#1a2340");gr.addColorStop(.45,"#4a4f78");gr.addColorStop(.75,"#c78a8a");gr.addColorStop(1,"#f2b98a");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    const r=PAINT.helpers.rng(2);g.fillStyle="#fff";for(let i=0;i<50;i++){const x=r()*e.W,y=r()*e.H*.25;g.globalAlpha=(.15+r()*.4)*(1-e.lp*.6);g.fillRect(x,y,e.dpr,e.dpr);}g.globalAlpha=1;},
  layers:[
    {z:-2,draw(c,e,r){const{P}=e,poly=PAINT.helpers.poly;
      const tower=(x,w,h,z,col,kind)=>{const a=P(x-w/2,-2,z),b=P(x+w/2,h-2,z),u=e.u(z);
        const gr=c.createLinearGradient(a[0],0,b[0],0);gr.addColorStop(0,col);gr.addColorStop(1,"#141826");c.fillStyle=gr;c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);
        /* windows: a grid, most still lit warm before the sun is up */
        const cw=Math.max(1.4,u*.07),ch=Math.max(1.4,u*.08);for(let y=b[1]+ch;y<a[1]-ch;y+=ch*1.7)for(let xx=a[0]+cw*.6;xx<b[0]-cw;xx+=cw*1.6){const v=r();if(v<.42)continue;c.fillStyle=v<.85?"rgba(255,214,150,.85)":"rgba(200,226,255,.7)";c.fillRect(xx,y,cw*.8,ch*.7);}
        {const rg=c.createLinearGradient(0,b[1],0,a[1]);rg.addColorStop(0,"rgba(240,170,170,.16)");rg.addColorStop(.45,"rgba(0,0,0,0)");rg.addColorStop(1,"rgba(10,14,30,.25)");c.fillStyle=rg;c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);
          const sx=a[0]+(b[0]-a[0])*.62,sg=c.createLinearGradient(sx-u*.15,0,sx+u*.15,0);sg.addColorStop(0,"rgba(255,220,200,0)");sg.addColorStop(.5,"rgba(255,220,200,.08)");sg.addColorStop(1,"rgba(255,220,200,0)");c.fillStyle=sg;c.fillRect(sx-u*.15,b[1],u*.3,a[1]-b[1]);}
        /* the dawn on the east faces */
        c.fillStyle="rgba(255,180,140,.12)";c.fillRect(b[0]-(b[0]-a[0])*.25,b[1],(b[0]-a[0])*.25,a[1]-b[1]);
        if(kind==="spire"){c.fillStyle=col;poly(c,[[a[0],b[1]],[(a[0]+b[0])/2,b[1]-u*1.1],[b[0],b[1]]]);c.fill();c.strokeStyle="rgba(230,240,255,.8)";c.lineWidth=Math.max(1,u*.03);c.beginPath();c.moveTo((a[0]+b[0])/2,b[1]-u*1.1);c.lineTo((a[0]+b[0])/2,b[1]-u*1.6);c.stroke();}
        if(kind==="crown"){const cx=(a[0]+b[0])/2,wd=b[0]-a[0];for(let k=0;k<5;k++){c.fillStyle=k%2?"#cfd6e2":"#aab3c4";c.beginPath();c.arc(cx,b[1]+u*.05,wd/2*(1-k*.17),Math.PI,0);c.fill();c.fillStyle="rgba(255,226,170,.9)";for(let j=0;j<5;j++){const a2=Math.PI+(j+.5)/5*Math.PI;c.beginPath();c.moveTo(cx+Math.cos(a2)*wd/2*(1-k*.17)*.85,b[1]+Math.sin(a2)*wd/2*(1-k*.17)*.85);c.lineTo(cx+Math.cos(a2+.12)*wd/2*(1-k*.17)*.7,b[1]+Math.sin(a2+.12)*wd/2*(1-k*.17)*.7);c.lineTo(cx+Math.cos(a2-.12)*wd/2*(1-k*.17)*.7,b[1]+Math.sin(a2-.12)*wd/2*(1-k*.17)*.7);c.fill();}}
          c.strokeStyle="#dfe5ee";c.lineWidth=Math.max(1,u*.025);c.beginPath();c.moveTo(cx,b[1]-wd*.45);c.lineTo(cx,b[1]-u*1.3);c.stroke();}
        if(kind==="empire"){const cx=(a[0]+b[0])/2,wd=b[0]-a[0];[[.7,.35],[.5,.3],[.32,.28],[.18,.3]].reduce((y,[k,hh])=>{c.fillStyle="#2a2f45";c.fillRect(cx-wd*k/2,y-u*hh,wd*k,u*hh);c.fillStyle="rgba(255,226,170,.75)";c.fillRect(cx-wd*k/2,y-u*hh,wd*k,u*.03);return y-u*hh;},b[1]);
          const top=b[1]-u*1.23;c.strokeStyle="#e8ecf2";c.lineWidth=Math.max(1,u*.04);c.beginPath();c.moveTo(cx,top);c.lineTo(cx,top-u*.7);c.stroke();PAINT.helpers.glow(c,"255,236,200",cx,top+u*.3,u*.6,.6);}
      };
      {const y0=P(0,-2,-8)[1],y1=P(0,-1.85,-.6)[1];c.fillStyle="#161b2e";c.fillRect(0,y0,e.W,y1-y0+2);}
      /* back rows first, darker and hazier */
      for(let i=0;i<46;i++){const x=-11+r()*22,z=-5-r()*3,w=.4+r()*.7,h=1.4+Math.pow(r(),1.6)*3;tower(x,w,h,z,"#3b4260");}
      for(let i=0;i<36;i++){const x=-10+r()*20,z=-2.6-r()*1.5,w=.5+r()*.8,h=1+Math.pow(r(),1.8)*2.6;if(Math.abs(x)<.6||Math.abs(x+2.8)<.5||Math.abs(x-3.1)<.5)continue;tower(x,w,h,z,"#2c3350");}
      tower(-2.8,.8,3.3+2,-1.2,"#5a6380","crown");tower(0,1.05,4.1+.8,-1,"#454d6c","empire");tower(3.1,.9,4.2+1.4,-1.2,"#59627e","spire");
      /* the waterfront: piers and a low line of lights */
      /* the river under the waterfront, so the water layer in front never leaves a gap whatever the parallax */
      {const y0=P(0,-1.85,-.6)[1],wg=c.createLinearGradient(0,y0,0,e.H);wg.addColorStop(0,"#3c4466");wg.addColorStop(.25,"#232a44");wg.addColorStop(1,"#0e1222");c.fillStyle=wg;c.fillRect(0,y0,e.W,e.H-y0);}
      const w0=P(-14,-1.85,-.6),w1=P(14,-1.85,-.6);c.fillStyle="#141826";c.fillRect(w0[0],w0[1],w1[0]-w0[0],e.u(-.6)*.2);for(let x=-14;x<14;x+=.18){const p=P(x,-1.83,-.6);PAINT.helpers.glow(c,"255,214,150",p[0],p[1],e.u(-.6)*.06,.7);}
    }},
    {z:1.5,draw(c,e,r){const{P}=e,poly=PAINT.helpers.poly;
      /* the East River: dark, holding the skyline's lights as long streaks */
      const top=P(0,-2,-.5)[1];const wg=c.createLinearGradient(0,top,0,e.H);wg.addColorStop(0,"#3c4466");wg.addColorStop(.25,"#232a44");wg.addColorStop(1,"#0e1222");c.fillStyle=wg;c.fillRect(0,top,e.W,e.H-top);
      for(let i=0;i<500;i++){const x=-10+r()*20,p=P(x,-2,-.4),len=e.H*(.05+r()*.3),a=.05+r()*.18;const col=r()<.8?"255,206,140":"200,220,255";const sg=c.createLinearGradient(0,p[1],0,p[1]+len);sg.addColorStop(0,`rgba(${col},${a})`);sg.addColorStop(1,`rgba(${col},0)`);c.fillStyle=sg;c.fillRect(p[0],p[1]+r()*6,1+r()*2.5,len);}
      /* the near tower of the Brooklyn Bridge: granite, two pointed arches */
      const tx=-4.2,tz=1.5,u=e.u(tz),b=P(tx,-2,tz),t=P(tx,2.6,tz),hw=u*.95;
      const sg=c.createLinearGradient(b[0]-hw,0,b[0]+hw,0);sg.addColorStop(0,"#b49a86");sg.addColorStop(.6,"#8a7464");sg.addColorStop(1,"#5a4a42");c.fillStyle=sg;c.fillRect(b[0]-hw,t[1],hw*2,b[1]-t[1]);
      c.fillStyle="rgba(255,190,150,.18)";c.fillRect(b[0]+hw*.5,t[1],hw*.5,b[1]-t[1]);
      [-.42,.42].forEach(o=>{const cx=b[0]+o*hw,aw=hw*.3,ab=P(tx,-.6,tz)[1],at=P(tx,1.6,tz)[1];c.fillStyle="#3a4466";c.beginPath();c.moveTo(cx-aw,ab);c.lineTo(cx-aw,at+aw);c.quadraticCurveTo(cx-aw,at,cx,at-aw*.6);c.quadraticCurveTo(cx+aw,at,cx+aw,at+aw);c.lineTo(cx+aw,ab);c.fill();});
      c.strokeStyle="rgba(50,40,36,.4)";c.lineWidth=1;for(let y=t[1];y<b[1];y+=u*.14){c.beginPath();c.moveTo(b[0]-hw,y);c.lineTo(b[0]+hw,y);c.stroke();}
      c.fillStyle="#6e5c50";c.fillRect(b[0]-hw*1.05,t[1]-u*.12,hw*2.1,u*.14);
      /* deck */
      const d0=P(tx-6,-.6,tz),d1=P(14,-.6,tz-1);c.fillStyle="#1c2030";c.beginPath();c.moveTo(d0[0],d0[1]);c.lineTo(d1[0],d1[1]);c.lineTo(d1[0],d1[1]+u*.18);c.lineTo(d0[0],d0[1]+u*.22);c.fill();
      /* main cables, suspenders and the diagonal stays */
      const cab=(o)=>{const pts=[];for(let k=0;k<=40;k++){const s=k/40,x=tx+o+s*16,y=2.4-4.6*Math.sin(Math.PI*Math.min(1,s*1.1))*.62,z=tz-s*1;pts.push(P(x,Math.max(-.5,y),z));}return pts;};
      [-.5,.5].forEach(o=>{const pts=cab(o);c.strokeStyle="#c6c9d4";c.lineWidth=Math.max(1,u*.035);c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
        c.lineWidth=Math.max(.5,u*.008);c.strokeStyle="rgba(198,201,212,.6)";pts.forEach((p,i)=>{if(i%1)return;const s=i/40,dk=P(tx+o+s*16,-.6,tz-s);c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(dk[0],dk[1]);c.stroke();});
        const tt=P(tx+o,2.4,tz);for(let k=1;k<10;k++){const s=k/24,dk=P(tx+o+s*16,-.6,tz-s);c.beginPath();c.moveTo(tt[0],tt[1]);c.lineTo(dk[0],dk[1]);c.stroke();}});
      /* the cables going back down to the Brooklyn shore at the left */
      [-.5,.5].forEach(o=>{const a=P(tx+o,2.4,tz),z2=P(tx-7,-.6,tz+.5);c.strokeStyle="#c6c9d4";c.lineWidth=Math.max(1,u*.035);c.beginPath();c.moveTo(a[0],a[1]);c.quadraticCurveTo((a[0]+z2[0])/2,(a[1]+z2[1])/2+u*.5,z2[0],z2[1]);c.stroke();});
      /* lamps along the deck */
      for(let s=0;s<1;s+=.05){const p=P(tx+s*16,-.45,tz-s);PAINT.helpers.glow(c,"255,214,150",p[0],p[1],e.u(tz-s)*.18,.9);}
    }}
  ],
  cue:"the Empire State Building",
  poke(e){esb=(esb+1)%ESB.length;esbT=e.T;return true;},
  hot(x,y,e){const a=e.P(-.75,5.4,-1),b=e.P(.75,-.6,-1);return x>a[0]&&x<b[0]&&y>a[1]&&y<b[1];},
  tap(x,y,e){if(!this.hot(x,y,e))return false;esb=(esb+1)%ESB.length;esbT=e.T;return true;},
  live(g,e,H,i){const{P,T}=e;
    if(i===1&&ESB[esb]){const k=e.T===0?1:H.clamp((T-esbT)/.35),u=e.u(-1);g.globalCompositeOperation="lighter";ESB[esb].forEach((c,j)=>{const p=P(0,3.05+j*.36,-1);H.glow(g,c,p[0],p[1],u*(.62-j*.1),.8*k);});const tp=P(0,4.5,-1);H.glow(g,ESB[esb][2],tp[0],tp[1],u*.3,.9*k);g.globalCompositeOperation="source-over";}
    if(i===0){/* windows switching as the city wakes */const r=H.rng(31);for(let k=0;k<40;k++){const x=-8+r()*16,y=-1+r()*3.5,z=-2.6-r()*2,p=P(x,y,z),on=Math.sin(T*.3+k*2.1)>.3;if(on){g.fillStyle="rgba(255,214,150,.9)";g.fillRect(p[0],p[1],e.u(z)*.06,e.u(z)*.07);}}
      /* a plane crossing the dawn, its beacon blinking */const px=((T*.04)%1.4-.2)*e.W,py=e.H*(.16-.05*((T*.04)%1.4));const bl=Math.exp(-((T%1.05))/.11);H.glow(g,"255,70,56",px,py,6*e.dpr*(.6+.4*bl),bl);H.glow(g,"255,246,230",px+6*e.dpr,py,4*e.dpr,.6);}
    if(i===1){/* gulls working over the river at first light */H.flock(g,e,6,.62,.58,.2,.03,4.5*e.dpr,"rgba(230,226,236,.75)",.7,9);}
    if(i===1){/* headlights and tail lights crossing the bridge both ways */
      const tx=-4.2,tz=1.5;g.globalCompositeOperation="lighter";
      for(let k=0;k<14;k++){const dir=k%2?1:-1,s=((T*.035*(1+k%3*.2)+k/14)%1),ss=dir>0?s:1-s,p=P(tx+ss*16,-.52,tz-ss),u=e.u(tz-ss);H.glow(g,dir>0?"255,246,224":"255,60,40",p[0],p[1],u*.14,.85);}
      /* a ferry crossing, its wake catching the light */
      const fx=-8+((T*.18)%18),fp=P(fx,-1.95,-.2),u=e.u(-.2);g.globalCompositeOperation="source-over";g.fillStyle="#e8e2d6";g.fillRect(fp[0]-u*.5,fp[1]-u*.18,u*1,u*.14);g.fillStyle="#1e2436";g.fillRect(fp[0]-u*.5,fp[1]-u*.05,u*1,u*.06);
      g.fillStyle="rgba(255,226,170,.9)";for(let k=0;k<6;k++)g.fillRect(fp[0]-u*.4+k*u*.15,fp[1]-u*.14,u*.06,u*.04);
      g.strokeStyle="rgba(220,230,255,.35)";g.lineWidth=1;g.beginPath();g.moveTo(fp[0]-u*.5,fp[1]+u*.02);g.lineTo(fp[0]-u*2.2,fp[1]+u*.08);g.stroke();
      /* shimmer */g.globalCompositeOperation="lighter";const r=H.rng(41);for(let k=0;k<120;k++){const x=-10+r()*20,z=-.3+r()*6,p=P(x,-2,z),v=.5+.5*Math.sin(T*1.6+k);g.fillStyle=`rgba(255,214,160,${(v*.14).toFixed(3)})`;g.fillRect(p[0]+Math.sin(T*.5+k)*4,p[1],e.u(z)*.3,1);}
      g.globalCompositeOperation="source-over";}
  },
  grade(g,e){const v=g.createRadialGradient(e.W/2,e.H*.45,e.H*.3,e.W/2,e.H*.45,e.H*1.1);v.addColorStop(0,"rgba(0,0,0,0)");v.addColorStop(1,"rgba(5,8,20,.45)");g.fillStyle=v;g.fillRect(0,0,e.W,e.H);}
});
})();
