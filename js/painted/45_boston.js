/* Boston, working for Davis Square Capital: the end of a working day at a desk by the glass, looking across the Charles at the Back Bay
   in the blue hour. 200 Clarendon holds the last of the sky, the Prudential and One Dalton behind it, Beacon Hill and the State House dome
   to the left, the Longfellow Bridge beyond with a Red Line train crossing. On the desk: the laptop with the work on it, a notebook, a lamp.
   Touch: the lamp switches off and on; the laptop steps through three screens. Live: the train, windows coming on, the weather beacon.
   One light outside (the afterglow low in the south-west, behind the towers), one inside (the lamp). Ground (the river) is y -2. */
(()=>{
const G=-2,ZI=4,ZF=-34;
let lampOn=true,lampT=-9,screen=0,screenT=-9,LAY=null;
/* where the desk things stand, from the frame's own width so the picture holds on a phone and on a wide monitor */
function lay(e){const u=e.u(ZI),hw=(e.W-2*(e.ox||0))/2/u,hh=(e.H-2*(e.oy||0))/2/u,port=hw<hh,yd=.55-.5*hh;
  return{hw,hh,port,yd,lap:port?.42:hw*.16,lamp:port?-hw+.5:hw*.7,dir:port?1:-1};}
function tower(c,e,r,t){const{P}=e,u=e.u(t.z),a=P(t.x-t.w/2,G,t.z),b=P(t.x+t.w/2,G+t.h,t.z),x0=a[0],x1=b[0],y0=b[1],y1=a[1],w=x1-x0,H=PAINT.helpers;
  let gr=c.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,t.col||"#2c3854");gr.addColorStop(1,"#131a2a");c.fillStyle=gr;
  if(t.kind==="hancock"){/* a knife of blue glass: the broad face mirrors the sky, the thin end face is in shade */
    gr=c.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,"#9db4d6");gr.addColorStop(.35,"#56719c");gr.addColorStop(.8,"#2a3a5c");gr.addColorStop(1,"#1a2438");c.fillStyle=gr;H.poly(c,[[x0,y1],[x0,y0+u*.12],[x0+w*.74,y0],[x0+w*.74,y1]]);c.fill();
    c.fillStyle="#182236";H.poly(c,[[x0+w*.74,y1],[x0+w*.74,y0],[x1,y0+u*.22],[x1,y1]]);c.fill();
    c.strokeStyle="rgba(12,18,32,.55)";c.lineWidth=Math.max(1,u*.04);c.beginPath();c.moveTo(x0+w*.37,y0+u*.06);c.lineTo(x0+w*.37,y1);c.stroke();
    c.strokeStyle="rgba(220,232,250,.08)";c.lineWidth=1;for(let y=y0+u*.2;y<y1;y+=Math.max(2.5,u*.15)){c.beginPath();c.moveTo(x0,y);c.lineTo(x0+w*.74,y);c.stroke();}
    for(let i=0;i<46;i++){const xx=x0+r()*w*.7,yy=y0+u*.4+r()*(y1-y0-u*.6);c.fillStyle=`rgba(255,${214+r()*20|0},160,${(.35+r()*.4).toFixed(2)})`;c.fillRect(xx,yy,Math.max(1.5,u*.07),Math.max(1.2,u*.06));}
    c.fillStyle="rgba(255,176,120,.2)";H.poly(c,[[x0,y1],[x0,y0+u*.12],[x0+w*.06,y0+u*.11],[x0+w*.06,y1]]);c.fill();return;}
  if(t.kind==="dalton"){const rr=w*.42;c.beginPath();c.moveTo(x0,y1);c.lineTo(x0,y0+rr);c.quadraticCurveTo(x0,y0,x0+rr,y0);c.lineTo(x1-rr,y0);c.quadraticCurveTo(x1,y0,x1,y0+rr);c.lineTo(x1,y1);c.closePath();
    gr=c.createLinearGradient(x0,0,x1,0);gr.addColorStop(0,"#7088ae");gr.addColorStop(.5,"#3a4a6c");gr.addColorStop(1,"#1a2236");c.fillStyle=gr;c.fill();}
  else c.fillRect(x0,y0,w,y1-y0);
  const fh=Math.max(2.2,u*.15),cw=Math.max(1.6,u*.085),top=y0+fh*(t.kind==="dalton"?2:.8);
  for(let y=top;y<y1-fh*.5;y+=fh)for(let x=x0+cw*.5;x<x1-cw*.9;x+=cw*1.5){if(r()>t.lit*.62)continue;const v=r();c.fillStyle=v<.74?`rgba(255,${208+r()*24|0},${146+r()*36|0},${(.5+r()*.42).toFixed(2)})`:`rgba(206,${224+r()*18|0},255,${(.4+r()*.35).toFixed(2)})`;c.fillRect(x,y,cw*.78,fh*.52);}
  /* the afterglow catches the west edge; the top floors still hold some sky */
  c.fillStyle="rgba(255,170,116,.16)";c.fillRect(x1-Math.max(1,w*.07),y0,Math.max(1,w*.07),y1-y0);
  const sg=c.createLinearGradient(0,y0,0,y1);sg.addColorStop(0,"rgba(150,176,220,.22)");sg.addColorStop(.4,"rgba(0,0,0,0)");c.fillStyle=sg;c.fillRect(x0,y0,w,y1-y0);
  if(t.kind==="pru"){c.fillStyle="#1c2436";c.fillRect(x0-w*.03,y0-u*.34,w*1.06,u*.4);c.fillStyle="rgba(255,236,206,.8)";c.fillRect(x0,y0+u*.1,w,u*.1);
    c.strokeStyle="rgba(14,20,34,.5)";c.lineWidth=Math.max(1,u*.03);for(let x=x0+w/7;x<x1-1;x+=w/7){c.beginPath();c.moveTo(x,y0+u*.3);c.lineTo(x,y1);c.stroke();}
    c.strokeStyle="#8f9ab0";c.lineWidth=Math.max(1,u*.05);c.beginPath();c.moveTo(x0+w*.6,y0-u*.34);c.lineTo(x0+w*.6,y0-u*2.1);c.stroke();}
  if(t.kind==="hunt"){/* 111 Huntington: the open crown, lit from inside */const cx=(x0+x1)/2;c.strokeStyle="#c9d2e2";c.lineWidth=Math.max(1,u*.04);for(let k=-2;k<=2;k++){c.beginPath();c.moveTo(cx+k*w*.22,y0);c.quadraticCurveTo(cx+k*w*.16,y0-u*.8,cx,y0-u*1.05);c.stroke();}
    c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y0);c.stroke();H.glow(c,"255,236,200",cx,y0-u*.35,u*.9,.5);}
}
PAINT.scene({id:"p-boston",win:CUTW("boston"),s:[.293,.347],refZ:-12,tex:.4,
  air:{rgb:"120,112,150",k:.2,z0:-10},
  look(){const k=lampOn?1:0;return{bloom:.34,sun:[.6,.5,"255,168,112",.13,.6],grade:`rgba(${150+60*k|0},${160+10*k|0},${240-70*k|0},.09)`,vig:.34,grain:.06};},
  sky(g,e){const hz=e.P(0,G,-400)[1],gr=g.createLinearGradient(0,0,0,hz);gr.addColorStop(0,"#0c1630");gr.addColorStop(.42,"#24407a");gr.addColorStop(.72,"#6a6a98");gr.addColorStop(.9,"#d78c78");gr.addColorStop(1,"#f6b47a");g.fillStyle=gr;g.fillRect(0,0,e.W,e.H);
    const r=PAINT.helpers.rng(4);g.fillStyle="#fff";for(let i=0;i<60;i++){g.globalAlpha=.12+r()*.4;g.fillRect(r()*e.W,r()*hz*.42,e.dpr,e.dpr);}g.globalAlpha=1;
    /* long bars of cloud, lit from underneath */
    for(let i=0;i<6;i++){const x=e.W*(.1+r()*.9),y=hz*(.52+r()*.36),w=e.W*(.14+r()*.22),cg=g.createLinearGradient(x-w,0,x+w,0);cg.addColorStop(0,"rgba(255,170,130,0)");cg.addColorStop(.5,`rgba(255,${150+r()*40|0},130,${(.16+r()*.16).toFixed(2)})`);cg.addColorStop(1,"rgba(255,170,130,0)");g.fillStyle=cg;g.fillRect(x-w,y,w*2,hz*(.008+r()*.012));}},
  layers:[
    {z:ZF,draw(c,e,r){const{P}=e,H=PAINT.helpers;
      const T=[];for(let i=0;i<34;i++)T.push({x:-40+r()*26,z:-44-r()*8,w:1.6+r()*2.2,h:4+Math.pow(r(),1.5)*9,lit:.28+r()*.25,col:"#2a3450"});
      for(let i=0;i<26;i++){const x=-12+r()*52;T.push({x,z:-44-r()*8,w:1.5+r()*2,h:2.6+Math.pow(r(),1.6)*5,lit:.25+r()*.25,col:"#2b3652"});}
      T.push({x:11.6,z:-46,w:2.2,h:9.4,lit:.38,kind:"hunt",col:"#33405e"},{x:8.4,z:-44,w:3,h:11.6,lit:.42,kind:"pru",col:"#2a3248"},{x:13.6,z:-42,w:1.9,h:12.4,lit:.3,kind:"dalton"},{x:3.4,z:-40,w:3.3,h:13,lit:.1,kind:"hancock"},
        {x:-.8,z:-41,w:2.2,h:7.4,lit:.4,col:"#3a4058"},{x:-21,z:-43,w:2.4,h:12,lit:.35,col:"#2c3a58"},{x:-26.5,z:-44,w:2.8,h:10.4,lit:.4,col:"#27324c"},{x:-17.4,z:-42,w:1.8,h:9,lit:.3,col:"#3a4666"});
      T.sort((a,b)=>a.z-b.z).forEach(t=>tower(c,e,r,t));
      /* Beacon Hill: brick rows climbing to the State House, its dome gilded */
      for(let i=0;i<40;i++){const x=-15+r()*10,z=-38-r()*3,hh=1.2+(1-Math.abs(x+10)/6)*1.6+r()*.6,a=P(x-.5,G,z),b=P(x+.5,G+hh,z);c.fillStyle=["#5a3a34","#4a3230","#6a443a"][i%3];c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);
        for(let k=0;k<5;k++){if(r()<.5)continue;c.fillStyle="rgba(255,214,150,.75)";c.fillRect(a[0]+(b[0]-a[0])*(.15+r()*.6),b[1]+(a[1]-b[1])*(.12+r()*.6),Math.max(1.4,e.u(z)*.07),Math.max(1.6,e.u(z)*.1));}}
      {const z=-38,u=e.u(z),m=P(-10,G+3.5,z);c.fillStyle="#d9d2c4";c.fillRect(m[0]-u*.8,m[1],u*1.6,u*.7);c.fillStyle="#e8b64a";c.beginPath();c.arc(m[0],m[1],u*.5,Math.PI,0);c.fill();c.fillStyle="rgba(255,236,170,.7)";c.beginPath();c.arc(m[0]+u*.14,m[1]-u*.1,u*.3,Math.PI*1.1,Math.PI*1.9);c.fill();c.strokeStyle="#e8b64a";c.lineWidth=Math.max(1,u*.05);c.beginPath();c.moveTo(m[0],m[1]-u*.5);c.lineTo(m[0],m[1]-u*.8);c.stroke();H.glow(c,"255,214,140",m[0],m[1]-u*.2,u*1.1,.35);}
      /* the Back Bay along the water: four and five storeys of brick, lamps on Storrow Drive, the Esplanade's trees */
      for(let x=-4;x<40;x+=.95){const z=ZF-1,hh=1.3+r()*.5,a=P(x,G,z),b=P(x+.9,G+hh,z);c.fillStyle=["#4a302c","#3c2a2a","#553830","#33262a"][(r()*4)|0];c.fillRect(a[0],b[1],b[0]-a[0],a[1]-b[1]);
        for(let k=0;k<6;k++){if(r()<.45)continue;c.fillStyle="rgba(255,210,146,.8)";c.fillRect(a[0]+(b[0]-a[0])*(.12+(k%3)*.3),b[1]+(a[1]-b[1])*(.15+((k/3)|0)*.36),Math.max(1.4,e.u(z)*.09),Math.max(1.8,e.u(z)*.14));}}
      for(let i=0;i<150;i++){const x=-44+r()*90,p=P(x,G+.25+r()*.5,ZF);c.fillStyle=r()<.5?"#16241f":"#1c2c24";c.beginPath();c.arc(p[0],p[1],e.u(ZF)*(.35+r()*.4),0,7);c.fill();}
      for(let x=-44;x<46;x+=1.4){const p=P(x,G+.5,ZF+.2);H.glow(c,"255,206,140",p[0],p[1],e.u(ZF)*.22,.75);}
      /* the Longfellow: granite arches, the four salt-and-pepper towers */
      {const z=ZF+2,u=e.u(z),dk=G+1;c.fillStyle="#3a3e4e";const a=P(-46,dk,z),b=P(-13,dk,z);c.fillRect(a[0],a[1]-u*.16,b[0]-a[0],u*.22);
        for(let x=-44;x<-14;x+=3.4){const p=P(x,dk,z),q=P(x+3.4,G,z);c.fillStyle="#2c3040";c.fillRect(p[0]-u*.22,p[1],u*.44,q[1]-p[1]);c.strokeStyle="#343848";c.lineWidth=Math.max(1,u*.16);c.beginPath();c.moveTo(p[0],p[1]+u*.5);c.quadraticCurveTo((p[0]+q[0])/2,p[1]-u*.02,q[0],p[1]+u*.5);c.stroke();}
        [-30.6,-27.2].forEach(x=>{const p=P(x,dk,z);const sg=c.createLinearGradient(p[0]-u*.4,0,p[0]+u*.4,0);sg.addColorStop(0,"#8a8478");sg.addColorStop(1,"#4a4850");c.fillStyle=sg;c.fillRect(p[0]-u*.36,p[1]-u*1.5,u*.72,u*1.5);c.beginPath();c.moveTo(p[0]-u*.42,p[1]-u*1.5);c.lineTo(p[0],p[1]-u*2.2);c.lineTo(p[0]+u*.42,p[1]-u*1.5);c.fill();H.glow(c,"255,214,150",p[0],p[1]-u*.9,u*.5,.4);});
        for(let x=-45;x<-13;x+=1.1){const p=P(x,dk+.3,z);H.glow(c,"255,214,150",p[0],p[1],u*.16,.8);}}
    }},
    {z:-12,draw(c,e,r){const{P}=e;
      /* the Charles: the sky lying on it, every light on the far bank drawn down into the water */
      const y0=P(0,G,ZF+.3)[1],wg=c.createLinearGradient(0,y0,0,e.H);wg.addColorStop(0,"#c98a7c");wg.addColorStop(.12,"#6c6690");wg.addColorStop(.4,"#2c3c66");wg.addColorStop(1,"#101a30");c.fillStyle=wg;c.fillRect(0,y0,e.W,e.H-y0);
      for(let i=0;i<620;i++){const x=-44+r()*90,p=P(x,G,ZF+.4),len=e.H*(.02+r()*r()*.2),a=.06+r()*.2,col=r()<.78?"255,204,140":"200,220,255";const sg=c.createLinearGradient(0,p[1],0,p[1]+len);sg.addColorStop(0,`rgba(${col},${a.toFixed(2)})`);sg.addColorStop(1,`rgba(${col},0)`);c.fillStyle=sg;c.fillRect(p[0],p[1]+r()*4,1+r()*2.4,len);}
      /* wind lanes */
      for(let i=0;i<70;i++){const z=ZF+2+r()*26,x=-40+r()*80,p=P(x,G,z),u=e.u(z);c.fillStyle=`rgba(190,206,240,${(.03+r()*.06).toFixed(3)})`;c.fillRect(p[0],p[1],u*(1+r()*4),Math.max(1,u*.02));}
      /* sailboats on their moorings off the boathouse, sails down */
      for(let i=0;i<7;i++){const x=-9+i*2.1+r(),z=-20-r()*4,p=P(x,G,z),u=e.u(z);c.fillStyle="#e4e0d6";c.beginPath();c.moveTo(p[0]-u*.5,p[1]-u*.1);c.lineTo(p[0]+u*.55,p[1]-u*.1);c.lineTo(p[0]+u*.4,p[1]+u*.05);c.lineTo(p[0]-u*.4,p[1]+u*.05);c.fill();c.strokeStyle="#cfd4de";c.lineWidth=Math.max(1,u*.03);c.beginPath();c.moveTo(p[0],p[1]-u*.1);c.lineTo(p[0]+u*.03,p[1]-u*1.5);c.stroke();
        c.strokeStyle="rgba(228,224,214,.25)";c.beginPath();c.moveTo(p[0],p[1]+u*.06);c.lineTo(p[0],p[1]+u*.9);c.stroke();}
    }},
    {z:ZI,draw(c,e,r){const{P}=e,H=PAINT.helpers,L=LAY=lay(e),{hw,hh,yd}=L,I=(x,y)=>P(x,y,ZI),u=e.u(ZI);
      /* the glass: a faint sheen, then the mullions and the sill */
      c.save();c.globalAlpha=.035;c.fillStyle="#fff";[[-.7,.2],[.05,.12],[.5,.3]].forEach(([f,w])=>{const a=I(f*hw,yd+hh*2.4),b=I(f*hw-hh*.9,yd);H.poly(c,[a,[a[0]+w*hw*u,a[1]],[b[0]+w*hw*u,b[1]],b]);c.fill();});c.restore();
      [-.36,.36,-1.02,1.02].forEach(f=>{const a=I(f*hw,yd),w=u*(Math.abs(f)>1?.5:.085);const mg=c.createLinearGradient(a[0]-w,0,a[0]+w,0);mg.addColorStop(0,"#090b10");mg.addColorStop(.5,"#1c2029");mg.addColorStop(1,"#0c0e14");c.fillStyle=mg;c.fillRect(a[0]-w/2,-10,w,a[1]+10);});
      {const a=I(-hw*1.5,yd+.2),b=I(hw*1.5,yd-.02);const sg=c.createLinearGradient(0,a[1],0,b[1]);sg.addColorStop(0,"#262a34");sg.addColorStop(.25,"#15181f");sg.addColorStop(1,"#0b0d12");c.fillStyle=sg;c.fillRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);c.fillStyle="rgba(170,190,230,.22)";c.fillRect(a[0],a[1],b[0]-a[0],Math.max(1,u*.012));}
      /* the desk: dark walnut, the evening lying along its grain */
      {const a=I(-hw*1.5,yd),dg=c.createLinearGradient(0,a[1],0,e.H);dg.addColorStop(0,"#3c281c");dg.addColorStop(.3,"#2a1b13");dg.addColorStop(1,"#170e0a");c.fillStyle=dg;c.fillRect(0,a[1],e.W,e.H-a[1]);
        for(let i=0;i<260;i++){const y=a[1]+r()*r()*(e.H-a[1]),x=r()*e.W,w=e.W*(.04+r()*.2);c.fillStyle=r()<.5?`rgba(0,0,0,${(.04+r()*.1).toFixed(3)})`:`rgba(196,140,96,${(.02+r()*.05).toFixed(3)})`;c.fillRect(x,y,w,Math.max(1,e.dpr*(.6+r())));}
        const rg=c.createLinearGradient(0,a[1],0,a[1]+u*.9);rg.addColorStop(0,"rgba(120,150,220,.2)");rg.addColorStop(1,"rgba(120,150,220,0)");c.fillStyle=rg;c.fillRect(0,a[1],e.W,u*.9);
        c.fillStyle="rgba(214,170,130,.3)";c.fillRect(0,a[1],e.W,Math.max(1,u*.01));}
      /* notebook and pen */
      {const x=L.lap-L.dir*1.55,p=I(x,yd-.28);c.save();c.translate(p[0],p[1]);c.transform(1,0,-.28*L.dir,1,0,0);c.fillStyle="rgba(0,0,0,.35)";c.fillRect(-u*.4,u*.02,u*.84,u*.24);c.fillStyle="#d9d4c6";c.fillRect(-u*.42,-u*.02,u*.84,u*.24);c.fillStyle="rgba(40,50,80,.25)";for(let k=1;k<6;k++)c.fillRect(-u*.36,-u*.02+k*u*.036,u*.5+((k*37)%20)/100*u,Math.max(1,u*.006));c.restore();
        c.strokeStyle="#12151c";c.lineCap="round";c.lineWidth=Math.max(2,u*.028);c.beginPath();c.moveTo(p[0]+u*.2,p[1]-u*.03);c.lineTo(p[0]+u*.62,p[1]+u*.2);c.stroke();}
      /* laptop: the lid toward us is its screen (drawn live), the deck lies on the desk in front */
      {const x=L.lap,a=I(x-.78,yd+.98),b=I(x+.78,yd-.06);H.shadow(c,(a[0]+b[0])/2,b[1]+u*.3,u*1.15,u*.2,.5);
        c.fillStyle="#0a0c10";c.beginPath();c.roundRect(a[0],a[1],b[0]-a[0],b[1]-a[1],u*.04);c.fill();c.strokeStyle="rgba(170,180,200,.3)";c.lineWidth=Math.max(1,u*.008);c.stroke();
        const d0=I(x-.78,yd-.06),d1=I(x+.78,yd-.06),d2=I(x+.93,yd-.42),d3=I(x-.93,yd-.42);const dg=c.createLinearGradient(0,d0[1],0,d2[1]);dg.addColorStop(0,"#565b66");dg.addColorStop(1,"#30343c");c.fillStyle=dg;H.poly(c,[d0,d1,d2,d3]);c.fill();
        c.fillStyle="#17191e";H.poly(c,[I(x-.7,yd-.1),I(x+.7,yd-.1),I(x+.77,yd-.27),I(x-.77,yd-.27)]);c.fill();c.fillStyle="#3e424b";H.poly(c,[I(x-.24,yd-.3),I(x+.24,yd-.3),I(x+.26,yd-.39),I(x-.26,yd-.39)]);c.fill();
        c.fillStyle="rgba(200,206,220,.5)";c.fillRect(d3[0],d3[1],d2[0]-d3[0],Math.max(1,u*.012));}
      /* the lamp: weighted base, stem, arm, a shade aimed at the work */
      {const x=L.lamp,d=L.dir,b=I(x,yd-.2),s=I(x,yd+1.25),hd=I(x+d*.62,yd+1.5);H.shadow(c,b[0],b[1]+u*.03,u*.36,u*.08,.55);
        c.fillStyle="#1a1c22";c.beginPath();c.ellipse(b[0],b[1],u*.26,u*.07,0,0,7);c.fill();c.fillStyle="rgba(190,200,220,.25)";c.beginPath();c.ellipse(b[0],b[1]-u*.012,u*.24,u*.05,0,Math.PI,0);c.fill();
        c.strokeStyle="#20232a";c.lineCap="round";c.lineWidth=Math.max(2,u*.035);c.beginPath();c.moveTo(b[0],b[1]);c.lineTo(s[0],s[1]);c.lineTo(hd[0],hd[1]);c.stroke();c.strokeStyle="rgba(190,200,220,.25)";c.lineWidth=Math.max(1,u*.008);c.beginPath();c.moveTo(b[0]-u*.012,b[1]);c.lineTo(s[0]-u*.012,s[1]);c.stroke();
        c.fillStyle="#b08a4a";c.beginPath();c.arc(s[0],s[1],u*.035,0,7);c.fill();
        c.fillStyle="#1c1f26";H.poly(c,[[hd[0]-u*.1,hd[1]-u*.12],[hd[0]+u*.1,hd[1]-u*.12],[hd[0]+u*.27,hd[1]+u*.2],[hd[0]-u*.27,hd[1]+u*.2]]);c.fill();c.fillStyle="rgba(190,200,220,.18)";H.poly(c,[[hd[0]-u*.1,hd[1]-u*.12],[hd[0]-u*.04,hd[1]-u*.12],[hd[0]-u*.18,hd[1]+u*.2],[hd[0]-u*.27,hd[1]+u*.2]]);c.fill();}
    }}
  ],
  cue:"the lamp or the laptop",
  poke(e){lampOn=!lampOn;lampT=e.T;return true;},
  hot(x,y,e){return!!hit(x,y,e);},
  tap(x,y,e){const h=hit(x,y,e);if(h==="lamp"){lampOn=!lampOn;lampT=e.T;}else if(h==="lap"){screen=(screen+1)%3;screenT=e.T;}return!!h;},
  live(g,e,H,i){const{P,T}=e;
    if(i===0){/* offices coming on as it gets dark; the Prudential's mast; 200 Clarendon's beacon steady blue (clear view) */
      const r=H.rng(23);for(let k=0;k<60;k++){const x=-38+r()*76,z=-41-r()*8,y=G+1.6+r()*7,p=P(x,y,z),u=e.u(z);if(Math.sin(T*.22+k*1.7)>.15+.5*(1-e.lp)){g.fillStyle="rgba(255,214,150,.85)";g.fillRect(p[0],p[1],Math.max(1.5,u*.08),Math.max(1.3,u*.07));}}
      const m=P(8.7,G+13.7,-44),bl=Math.exp(-(T%1.6)/.16);H.glow(g,"255,70,56",m[0],m[1],e.u(-44)*(.3+.3*bl),.5+.5*bl);
      const hb=P(2.6,G+13.2,-40);H.glow(g,"120,170,255",hb[0],hb[1],e.u(-40)*.5,.8);}
    if(i===1){/* a Red Line train over the Longfellow, its windows a row of light on the water side */
      const z=ZF+2,u=e.u(z),ph=(T*.03)%1.5,x0=-46+ph*34;if(ph<1.06)for(let k=0;k<24;k++){const x=x0-k*.26;if(x<-45.5||x>-13.4)continue;const p=P(x,G+1.24,z);g.fillStyle=k%6===5?"rgba(40,44,60,.9)":"rgba(255,232,190,.95)";g.fillRect(p[0],p[1]-u*.12,u*.2,u*.12);}
      g.globalCompositeOperation="lighter";const r=H.rng(41);for(let k=0;k<110;k++){const x=-30+r()*60,z2=ZF+1+r()*24,p=P(x,G,z2),v=.5+.5*Math.sin(T*1.4+k);g.fillStyle=`rgba(255,206,150,${(v*.12).toFixed(3)})`;g.fillRect(p[0]+Math.sin(T*.5+k)*3,p[1],e.u(z2)*.4,1);}g.globalCompositeOperation="source-over";}
    if(i===2&&LAY){const L=LAY,{yd}=L,I=(x,y)=>P(x,y,ZI),u=e.u(ZI),k=H.clamp((T-lampT)/.18),on=lampOn?k:1-k;
      /* the screen */
      {const x=L.lap,a=I(x-.72,yd+.92),b=I(x+.72,yd+.02),w=b[0]-a[0],h=b[1]-a[1],f=H.clamp((T-screenT)/.25);g.save();g.beginPath();g.rect(a[0],a[1],w,h);g.clip();g.fillStyle="#0e1420";g.fillRect(a[0],a[1],w,h);g.globalAlpha=f;
        const X=t=>a[0]+w*t,Y=t=>a[1]+h*t;
        if(screen===0){/* a price line over volume: where the day's question started */
          g.fillStyle="rgba(140,160,200,.2)";for(let k2=0;k2<22;k2++){const v=.08+.14*Math.abs(Math.sin(k2*2.7));g.fillRect(X(.08+k2*.039),Y(.9-v),w*.024,h*v);}
          g.strokeStyle="rgba(150,170,210,.14)";g.lineWidth=1;for(let k2=1;k2<4;k2++){g.beginPath();g.moveTo(X(.08),Y(.16+k2*.14));g.lineTo(X(.94),Y(.16+k2*.14));g.stroke();}
          const n=Math.round(40*H.clamp(.35+e.lp*.9));g.strokeStyle="#7fd6c2";g.lineWidth=Math.max(1.5,u*.014);g.lineJoin="round";g.beginPath();for(let k2=0;k2<=n;k2++){const t=k2/40,v=.62-.36*t+.07*Math.sin(t*19)+.05*Math.sin(t*7+1);k2?g.lineTo(X(.08+t*.86),Y(v)):g.moveTo(X(.08+t*.86),Y(v));}g.stroke();
          const t=n/40,v=.62-.36*t+.07*Math.sin(t*19)+.05*Math.sin(t*7+1);H.glow(g,"127,214,194",X(.08+t*.86),Y(v),u*.09,.9);}
        else if(screen===1){/* the model: rows and columns, one column the case being tested */
          g.fillStyle="rgba(127,214,194,.14)";g.fillRect(X(.58),Y(.1),w*.12,h*.82);for(let rw=0;rw<9;rw++){g.fillStyle=rw?"rgba(170,186,220,.5)":"rgba(220,228,244,.85)";g.fillRect(X(.07),Y(.13+rw*.09),w*(.14+((rw*7)%5)*.02),h*.03);for(let cl=0;cl<5;cl++){g.fillStyle=cl===2?"rgba(127,214,194,.85)":"rgba(170,186,220,.34)";g.fillRect(X(.34+cl*.123),Y(.13+rw*.09),w*(.05+((rw+cl)%3)*.014),h*.03);}}}
        else{/* the list of names to call, worked down from the top */
          for(let rw=0;rw<6;rw++){const done=rw<2+Math.round(e.lp*2);g.fillStyle="rgba(170,186,220,.1)";g.fillRect(X(.07),Y(.11+rw*.14),w*.86,h*.1);g.fillStyle=done?"#7fd6c2":"rgba(170,186,220,.4)";g.beginPath();g.arc(X(.12),Y(.16+rw*.14),h*.024,0,7);g.fill();g.fillStyle="rgba(220,228,244,.7)";g.fillRect(X(.17),Y(.14+rw*.14),w*(.2+((rw*5)%4)*.04),h*.028);g.fillStyle="rgba(170,186,220,.35)";g.fillRect(X(.62),Y(.14+rw*.14),w*(.12+((rw*3)%3)*.05),h*.028);}}
        g.globalAlpha=1;const sh=g.createLinearGradient(a[0],a[1],b[0],b[1]);sh.addColorStop(0,"rgba(190,210,255,.1)");sh.addColorStop(.5,"rgba(190,210,255,0)");g.fillStyle=sh;g.fillRect(a[0],a[1],w,h);g.restore();
        /* the screen's light on the keys */const kb=I(x,yd-.18);g.save();g.translate(kb[0],kb[1]);g.scale(1,.22);H.glow(g,"150,190,230",0,0,u*.95,.3);g.restore();}
      /* the lamp's light: under the shade, pooled on the wood, and ghosted in the glass */
      if(on>.01){const hd=I(L.lamp+L.dir*.62,yd+1.5),pool=I(L.lamp+L.dir*.75,yd-.24);g.globalCompositeOperation="lighter";
        const cone=g.createLinearGradient(0,hd[1]+u*.2,0,pool[1]);cone.addColorStop(0,`rgba(255,206,140,${.07*on})`);cone.addColorStop(1,"rgba(255,206,140,0)");g.fillStyle=cone;H.poly(g,[[hd[0]-u*.27,hd[1]+u*.2],[hd[0]+u*.27,hd[1]+u*.2],[pool[0]+u*1.3,pool[1]],[pool[0]-u*1.3,pool[1]]]);g.fill();
        g.save();g.translate(pool[0],pool[1]);g.scale(1,.2);H.glow(g,"255,196,120",0,0,u*2.5,.85*on);g.restore();
        H.glow(g,"255,226,170",hd[0],hd[1]+u*.2,u*.34,.95*on);H.glow(g,"255,206,140",hd[0],hd[1]+u*.2,u*1.1,.3*on);
        const gh=I(L.lamp+L.dir*.62-L.dir*.5,yd+1.95);H.glow(g,"255,206,140",gh[0],gh[1],u*.5,.1*on);g.globalCompositeOperation="source-over";}
      else{g.fillStyle="rgba(8,10,20,.18)";const a=I(0,yd);g.fillRect(0,a[1],e.W,e.H-a[1]);}
    }
  }
});
function hit(x,y,e){if(!LAY)return null;const L=LAY,I=(px,py)=>e.P(px,py,ZI),u=e.u(ZI),hd=I(L.lamp+L.dir*.3,L.yd+.7),a=I(L.lap-.8,L.yd+1),b=I(L.lap+.95,L.yd-.45);
  if(Math.abs(x-hd[0])<u*.6&&Math.abs(y-hd[1])<u*1.05)return"lamp";if(x>a[0]&&x<b[0]&&y>a[1]&&y<b[1])return"lap";return null;}
})();
