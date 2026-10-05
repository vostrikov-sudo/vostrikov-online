(()=>{
const c=document.getElementById('bc'),x=c.getContext('2d'),W=900,V=540,R=Math.random,
WP=[{n:'Пушка',cd:50,dmg:60,sp:9,r:5,spl:55,col:'#fc4'},{n:'Пулемёт',cd:7,dmg:8,sp:14,r:2.5,spl:0,col:'#fff'},{n:'Ракеты',cd:70,dmg:40,sp:6,r:4,spl:45,hm:1,col:'#f64'}];
let MH=100,P,B,E,F,O,PK,DR,sc,wave,left,wt,cd,sel,dc,st=0,mx=600,my=270,md=0;
const blk=(px,py,r)=>O.some(o=>px>o.x-r&&px<o.x+o.w+r&&py>o.y-r&&py<o.y+o.h+r);
function init(){
 MH=S.own.armor?150:100;P={x:450,y:300,a:0,t:0,hp:MH};B=[];E=[];F=[];PK=[];DR=null;dc=0;sc=0;wave=0;sel=0;cd=0;st=1;
 O=[[150,120],[650,100],[380,60],[200,380],[640,380],[780,250]].map(([a,b])=>({x:a,y:b,w:60+R()*40|0,h:50+R()*40|0}));next()}
function next(){wave++;left=3+wave*2;wt=0}
function shoot(px,py,a,w,own){B.push({x:px,y:py,vx:Math.cos(a)*w.sp,vy:Math.sin(a)*w.sp,dmg:w.dmg,r:w.r,spl:w.spl||0,hm:w.hm,own,col:w.col,life:120})}
function boom(px,py,r){F.push({x:px,y:py,r,t:12})}
function dmgE(e,d){e.hp-=d}
function mv(e,dx,dy,r){if(!blk(e.x+dx,e.y,r))e.x+=dx;if(!blk(e.x,e.y+dy,r))e.y+=dy}
function upd(){
 const dx=(K.KeyD||K.ArrowRight?1:0)-(K.KeyA||K.ArrowLeft?1:0),dy=(K.KeyS||K.ArrowDown?1:0)-(K.KeyW||K.ArrowUp?1:0);
 if(dx||dy){const l=Math.hypot(dx,dy);mv(P,dx/l*2.6,dy/l*2.6,16);P.x=Math.max(16,Math.min(W-16,P.x));P.y=Math.max(16,Math.min(V-16,P.y));P.a=Math.atan2(dy,dx)}
 P.t=Math.atan2(my-P.y,mx-P.x);
 for(let i=1;i<4;i++)if(K['Digit'+i])sel=i-1;
 if(--cd<=0&&md){shoot(P.x+Math.cos(P.t)*22,P.y+Math.sin(P.t)*22,P.t+(sel==1?(R()-.5)*.1:0),WP[sel],1);cd=WP[sel].cd}
 if(--dc<=0&&K.KeyQ&&!DR){DR={a:0,t:S.own.drone?1500:900,cd:0};dc=1500}
 if(DR){DR.a+=.05;DR.x=P.x+Math.cos(DR.a)*50;DR.y=P.y+Math.sin(DR.a)*50;
  if(--DR.cd<=0){const t=E.reduce((m,e)=>!m||Math.hypot(e.x-DR.x,e.y-DR.y)<Math.hypot(m.x-DR.x,m.y-DR.y)?e:m,null);
   if(t){shoot(DR.x,DR.y,Math.atan2(t.y-DR.y,t.x-DR.x),{sp:11,dmg:7,r:2,col:'#7ff'},1);DR.cd=18}}
  if(--DR.t<=0)DR=null}
 if(left>0&&++wt>80){wt=0;left--;const s=R()*4|0,px=s<2?R()*W:s==2?-20:W+20,py=s<2?(s?V+20:-20):R()*V,d=R()<.25+wave*.03;
  E.push({x:px,y:py,k:d?'d':'t',hp:d?15:50+wave*10,cd:60+R()*60})}
 for(const e of E){const a=Math.atan2(P.y-e.y,P.x-e.x),dist=Math.hypot(P.x-e.x,P.y-e.y);e.a=a;
  if(e.k=='d'){e.x+=Math.cos(a)*(2.4+wave*.05);e.y+=Math.sin(a)*(2.4+wave*.05);if(dist<24){P.hp-=15;e.hp=0;boom(e.x,e.y,40)}}
  else{if(dist>230)mv(e,Math.cos(a)*(1+wave*.04),Math.sin(a)*(1+wave*.04),16);
   if(--e.cd<=0){shoot(e.x,e.y,a+(R()-.5)*.25,{sp:5,dmg:10,r:4,col:'#f55'},0);e.cd=110}}}
 for(const b of B){b.x+=b.vx;b.y+=b.vy;b.life--;
  if(b.hm&&E.length){const t=E.reduce((m,e)=>!m||Math.hypot(e.x-b.x,e.y-b.y)<Math.hypot(m.x-b.x,m.y-b.y)?e:m,null),a=Math.atan2(t.y-b.y,t.x-b.x),v=Math.hypot(b.vx,b.vy);
   b.vx+=(Math.cos(a)*v-b.vx)*.08;b.vy+=(Math.sin(a)*v-b.vy)*.08}
  if(b.x<0||b.x>W||b.y<0||b.y>V||blk(b.x,b.y,0)){b.life=0}
  if(b.own){for(const e of E)if(b.life>0&&Math.hypot(e.x-b.x,e.y-b.y)<(e.k=='t'?16:10)){b.life=0;dmgE(e,b.dmg)}}
  else if(Math.hypot(P.x-b.x,P.y-b.y)<16){b.life=0;P.hp-=b.dmg}
  if(b.life<=0&&b.spl){boom(b.x,b.y,b.spl);for(const e of E)if(Math.hypot(e.x-b.x,e.y-b.y)<b.spl)dmgE(e,b.dmg/2)}}
 B=B.filter(b=>b.life>0);
 for(const e of E)if(e.hp<=0){sc+=e.k=='t'?100:50;boom(e.x,e.y,e.k=='t'?30:18);if(e.k=='t'&&R()<.3)PK.push({x:e.x,y:e.y})}
 E=E.filter(e=>e.hp>0);
 PK=PK.filter(k=>Math.hypot(k.x-P.x,k.y-P.y)>22||!(P.hp=Math.min(MH,P.hp+25)));
 F=F.filter(f=>--f.t>0);
 if(!left&&!E.length){next();P.hp=Math.min(MH,P.hp+20)}
 if(P.hp<=0){st=2;earn('bat',sc)}
}
const T=(s,y,f='bold 20px sans-serif',col='#fff')=>{x.font=f;x.fillStyle=col;x.textAlign='center';x.fillText(s,450,y);x.textAlign='left'};
function tank(e,body,tur){x.save();x.translate(e.x,e.y);x.rotate(e.a||0);x.fillStyle=body;x.fillRect(-16,-12,32,24);x.fillStyle='#222';x.fillRect(-16,-14,32,4);x.fillRect(-16,10,32,4);x.restore()}
function draw(){
 x.fillStyle='#2b3a2a';x.fillRect(0,0,W,V);x.strokeStyle='#33452f';for(let i=0;i<W;i+=60){x.beginPath();x.moveTo(i,0);x.lineTo(i,V);x.moveTo(0,i);x.lineTo(W,i);x.stroke()}
 x.fillStyle='#6d7380';for(const o of O)x.fillRect(o.x,o.y,o.w,o.h);
 for(const k of PK){x.fillStyle='#fff';x.fillRect(k.x-8,k.y-8,16,16);x.fillStyle='#e33';x.fillRect(k.x-2,k.y-7,4,14);x.fillRect(k.x-7,k.y-2,14,4)}
 for(const e of E){if(e.k=='t'){tank(e,'#a33');x.fillStyle='#722';x.beginPath();x.arc(e.x,e.y,8,0,7);x.fill();x.strokeStyle='#722';x.lineWidth=4;x.beginPath();x.moveTo(e.x,e.y);x.lineTo(e.x+Math.cos(e.a)*22,e.y+Math.sin(e.a)*22);x.stroke()}
  else{x.fillStyle='#222';x.beginPath();x.arc(e.x,e.y,9,0,7);x.fill();x.fillStyle='#f33';x.fillRect(e.x-3,e.y-3,6,6);x.fillRect(e.x-14,e.y-1,28,2)}}
 tank(P,'#3d7d3a');x.strokeStyle='#295a27';x.lineWidth=5;x.beginPath();x.moveTo(P.x,P.y);x.lineTo(P.x+Math.cos(P.t)*26,P.y+Math.sin(P.t)*26);x.stroke();x.lineWidth=1;
 x.save();x.beginPath();x.arc(P.x,P.y,10,0,7);x.clip();x.fillStyle='#4a8c45';x.fill();x.filter=skinF();x.drawImage(H,H.width*.35,0,H.width*.43,H.height*.21,P.x-10,P.y-10,20,20);x.restore();
 if(DR){x.fillStyle='#7ff';x.beginPath();x.arc(DR.x,DR.y,6,0,7);x.fill();x.fillRect(DR.x-12,DR.y-1,24,2)}
 for(const b of B){x.fillStyle=b.col;x.beginPath();x.arc(b.x,b.y,b.r,0,7);x.fill()}
 for(const f of F){x.fillStyle='rgba(255,170,40,'+f.t/12+')';x.beginPath();x.arc(f.x,f.y,f.r*(1.3-f.t/20),0,7);x.fill()}
 x.fillStyle='#000a';x.fillRect(10,10,160,16);x.fillStyle=P.hp>30?'#4c4':'#e44';x.fillRect(12,12,156*Math.max(P.hp,0)/MH,12);
 x.font='bold 16px sans-serif';x.fillStyle='#fff';x.fillText('Волна '+wave+'   Очки '+sc+'   Оружие: '+WP[sel].n+'   Дрон: '+(DR?'активен':dc>0?Math.ceil(dc/60)+' с':'готов (Q)'),180,24);
 if(st!=1){x.fillStyle='#000a';x.fillRect(0,0,W,V);T(st==0?'Нажми «Играть» под экраном':'Танк уничтожен',240,'bold 34px sans-serif');
  T(st?'Волна '+wave+', очки '+sc+'. Нажми R — заново':'WASD, мышь, ЛКМ, 1/2/3, Q',285)}
}
let acc=0,last=0;function loop(t){requestAnimationFrame(loop);acc+=Math.min(t-last,100);last=t;for(;acc>=16.7;acc-=16.7)if(A=='bat'){if(K.KeyR){K.KeyR=0;init()}if(st==1)upd()}draw()}
const pos=e=>{const r=c.getBoundingClientRect();mx=(e.clientX-r.left)*W/r.width;my=(e.clientY-r.top)*V/r.height};
c.onmousemove=pos;c.onmousedown=e=>{pos(e);md=1;e.preventDefault()};addEventListener('mouseup',()=>md=0);c.oncontextmenu=e=>e.preventDefault();
init();st=0;requestAnimationFrame(loop);
document.getElementById('bs').onclick=()=>{init();A='bat';c.scrollIntoView({block:'center'})};
})();
