(()=>{
const c=document.getElementById('rc'),x=c.getContext('2d'),G=400,
rnd=(r=>()=>(r=r*16807%2147483647)/2147483647)(7);
let wi=0,L,P,sc,li,dn,tk,st=0,msg='',mt=0,near=0;
const say=m=>{msg=m;mt=140};
const WD=[
{n:'Станция',sky:'#16233f',hill:'#223559',gr:'#4a3320',gs:'#3fa34d',gap:90,sp:.6,es:1.3,g:.62,j:13.5,f:.25},
{n:'Лавовый мир',sky:'#2b0d0d',hill:'#4a1a12',gr:'#3b1f1a',gs:'#e8590c',gap:115,sp:.9,es:1.9,g:.62,j:13.5,f:.25},
{n:'Ледяной мир',sky:'#4f7fa8',hill:'#7fb0d4',gr:'#5d8aa8',gs:'#e8f7ff',gap:95,sp:.5,es:1.4,g:.62,j:13.5,f:.07},
{n:'Космос',sky:'#0b0620',hill:'#241250',gr:'#2c2c4a',gs:'#8a5cff',gap:140,sp:.6,es:1.6,g:.4,j:12.5,f:.25}];
function wbtn(){document.getElementById('wl').innerHTML=WD.map((w,i)=>`<button class="btn s" data-w="${i}" ${i>(S.wu||0)?'disabled':''}>${i+1}. ${w.n}</button>`).join('')}
document.getElementById('wl').onclick=e=>{const w=e.target.dataset.w;if(w==null||e.target.disabled)return;wi=+w;init();A='run';c.scrollIntoView({block:'center'})};
function init(){
 L={s:[],p:[],c:[],e:[],t:[],k:[]};let px=0,i=0;
 while(px<7000){const w=350+rnd()*250|0;L.s.push({x:px,y:G,w,h:60});
  if(i){const y=G-95-rnd()*30|0;L.p.push({x:px+w*.3,y,w:110,h:16});L.c.push({x:px+w*.3+55,y:y-30});
   for(let k=0;k<3;k++)L.c.push({x:px+w*.65+k*30,y:G-40});
   if(i>1&&rnd()<WD[wi].sp)L.k.push({x:px+w*.15,w:36});
   if(w>400&&i>1)L.e.push({x:px+w*.7,y:G-34,a:px+20,b:px+w-50,d:1,on:1})}
  px+=w+WD[wi].gap+rnd()*30|0;i++}
 const l=L.s[L.s.length-1];L.end=l.x+l.w;L.fx=L.end-60;
 L.t=[3,6,9].map((n,k)=>({x:L.s[n].x+L.s[n].w*.5,k,done:0}));
 sc=0;li=3+(S.own.life?1:0);dn=0;tk=null;st=1;P={x:60,y:300,w:30,h:70,vx:0,vy:0,g:0,f:1,cp:60,inv:0,cy:0,jb:0,jh:0};
}
function hit(h){for(const s of L.s.concat(L.p))if(P.x<s.x+s.w&&P.x+P.w>s.x&&P.y<s.y+s.h&&P.y+P.h>s.y){
 if(h){P.x=P.vx>0?s.x-P.w:s.x+s.w;P.vx=0}else{if(P.vy>0){P.y=s.y-P.h;P.g=1}else P.y=s.y+s.h;P.vy=0}}}
function die(){if(--li<=0){st=2;earn('run',sc);return}P.inv=90;P.x=P.cp;P.y=200;P.vx=P.vy=0;say('Жизнь потеряна. Осталось: '+li)}
function fin(){tk.s.done=1;dn++;sc+=100;P.cp=tk.s.x;tk=null;say('Задание выполнено: '+dn+'/3')}
addEventListener('keydown',e=>{if(A!='run'||!tk||e.repeat)return;const t=tk;
 if(t.s.k==0){if(e.code==t.q[t.i]){if(++t.i>3)fin()}else if(/^Arrow/.test(e.code))t.i=0}
 if(t.s.k==2&&e.code=='Space'){if(t.m>38&&t.m<62)fin();else t.m=0}});
function upd(){
 if(tk){const t=tk;if(K.Escape){tk=null;K.Escape=0;return}
  if(t.s.k==1){K.KeyE?t.p+=.9:t.p=Math.max(0,t.p-1.8);if(t.p>=100)fin()}
  if(t.s.k==2){t.m+=t.v;if(t.m>100||t.m<0)t.v*=-1}return}
 const d=(K.ArrowRight||K.KeyD?1:0)-(K.ArrowLeft||K.KeyA?1:0);if(d)P.f=d;
 P.vx+=(d*4.6-P.vx)*WD[wi].f;
 P.cy=P.g?7:P.cy-1;const j=K.Space||K.ArrowUp||K.KeyW;if(j&&!P.jh)P.jb=7;P.jh=j;P.jb--;
 if(P.jb>0&&P.cy>0){P.vy=-WD[wi].j*(S.own.jump?1.08:1);P.jb=0;P.cy=0}if(!j&&P.vy<-4)P.vy*=.85;
 P.vy+=WD[wi].g;P.x+=P.vx;hit(1);P.y+=P.vy;P.g=0;hit(0);
 if(P.x<0)P.x=0;if(P.inv>0)P.inv--;if(P.y>520)return die();
 L.c=L.c.filter(k=>Math.hypot(k.x-P.x-15,k.y-P.y-35)>28||!(sc+=10));
 for(const e of L.e)if(e.on){e.x+=e.d*WD[wi].es;if(e.x<e.a||e.x>e.b)e.d*=-1;
  if(P.x<e.x+32&&P.x+P.w>e.x&&P.y<e.y+34&&P.y+P.h>e.y){
   if(P.vy>0&&P.y+P.h-P.vy<e.y+14){e.on=0;P.vy=-9;sc+=50}else if(!P.inv)return die()}}
 if(!P.inv&&L.k.some(k=>P.x+P.w>k.x+4&&P.x<k.x+k.w-4&&P.y+P.h>G-14))return die();
 near=0;for(const s of L.t)if(!s.done&&Math.abs(P.x+15-s.x)<45){near=1;
  if(K.KeyE){K.KeyE=0;tk={s,p:0,m:0,v:2,i:0,q:[0,0,0,0].map(()=>'Arrow'+['Up','Down','Left','Right'][rnd()*4|0])}}}
 if(P.x>L.fx-30){if(dn==3){st=3;if(wi<WD.length-1)S.wu=Math.max(S.wu||0,wi+1);earn('run',sc+wi*100);wbtn()}else if(mt<=0)say('Сначала выполни все задания: '+dn+'/3')}
}
const T=(s,y,f='bold 20px sans-serif',col='#fff')=>{x.font=f;x.fillStyle=col;x.textAlign='center';x.fillText(s,450,y);x.textAlign='left'};
function draw(){
 const cam=Math.max(0,Math.min(L.end-900,P.x-300));
 x.fillStyle=WD[wi].sky;x.fillRect(0,0,900,450);x.fillStyle=WD[wi].hill;
 for(let i=0;i<8;i++){const hx=((i*260-cam*.3)%2200+2200)%2200-300;x.beginPath();x.arc(hx,430,130+i%3*40,Math.PI,0);x.fill()}
 x.save();x.translate(-cam,0);
 x.fillStyle='#7a4f2a';for(const s of L.p)x.fillRect(s.x,s.y,s.w,s.h);
 for(const s of L.s){x.fillStyle=WD[wi].gr;x.fillRect(s.x,s.y,s.w,100);x.fillStyle=WD[wi].gs;x.fillRect(s.x,s.y,s.w,10)}
 x.fillStyle='#ffd23c';for(const k of L.c){x.beginPath();x.arc(k.x,k.y,7,0,7);x.fill()}
 for(const s of L.t){x.fillStyle=s.done?'#2ecc71':'#5b6b8c';x.fillRect(s.x-20,G-70,40,70);x.fillStyle=s.done?'#c9ffd9':'#4fd0ff';x.fillRect(s.x-14,G-62,28,20)}
 x.fillStyle='#ddd';x.fillRect(L.fx,G-170,6,170);x.fillStyle='#f2b705';x.beginPath();x.moveTo(L.fx+6,G-170);x.lineTo(L.fx+60,G-148);x.lineTo(L.fx+6,G-126);x.fill();
 x.fillStyle='#cfd6e4';for(const k of L.k)for(let q=0;q<3;q++){x.beginPath();x.moveTo(k.x+q*12,G);x.lineTo(k.x+q*12+6,G-16);x.lineTo(k.x+q*12+12,G);x.fill()}
 for(const e of L.e)if(e.on){x.fillStyle='#d62839';x.beginPath();x.roundRect(e.x,e.y,32,34,[14,14,4,4]);x.fill();x.fillStyle='#9fe8ff';x.fillRect(e.x+(e.d>0?14:2),e.y+6,16,10)}
 x.save();x.filter=skinF();if(P.inv%8>=4)x.globalAlpha=.4;if(P.f<0){x.translate(P.x+P.w,0);x.scale(-1,1);x.drawImage(H,0,P.y,P.w,P.h)}else x.drawImage(H,P.x,P.y,P.w,P.h);x.restore();
 x.restore();
 x.font='bold 18px sans-serif';x.fillStyle='#fff';x.fillText(WD[wi].n+'   Очки '+sc+'   Жизни '+'♥'.repeat(Math.max(li,0))+'   Задания '+dn+'/3',14,28);
 if(near&&!tk&&st==1)T('Нажми E — выполнить задание',120);
 if(mt>0){mt--;T(msg,70,'bold 20px sans-serif','#ffd23c')}
 if(tk){const t=tk,k=t.s.k;x.fillStyle='#0b1220ee';x.fillRect(200,110,500,230);x.strokeStyle='#4fd0ff';x.strokeRect(200,110,500,230);
  T(['Введи код стрелками','Удерживай E: идёт загрузка','Пробел — когда маркер в зелёной зоне'][k],150);
  if(k==0)T(t.q.map((a,i)=>(i<t.i?'✔':{ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→'}[a])).join('  '),240,'bold 44px sans-serif');
  else{x.fillStyle='#223';x.fillRect(250,220,400,28);if(k==2){x.fillStyle='#2ecc71';x.fillRect(250+400*.38,220,96,28);x.fillStyle='#fff';x.fillRect(248+4*t.m,214,5,40)}else{x.fillStyle='#4fd0ff';x.fillRect(250,220,4*t.p,28)}}
  T('Esc — закрыть',320,'14px sans-serif','#9fb0cc')}
 if(st!=1){x.fillStyle='#000a';x.fillRect(0,0,900,450);
  T(st==0?'Нажми «Играть» под экраном':st==2?'Игра окончена':'Победа! Все задания выполнены',210,'bold 34px sans-serif');
  if(st)T('Очки: '+sc+'. Нажми R — заново',255)}
}
let acc=0,last=0;function loop(t){requestAnimationFrame(loop);acc+=Math.min(t-last,100);last=t;for(;acc>=16.7;acc-=16.7)if(A=='run'){if(K.KeyR){K.KeyR=0;init()}if(st==1)upd()}draw()}
init();st=0;wbtn();requestAnimationFrame(loop);
document.getElementById('rs').onclick=()=>{init();A='run';c.scrollIntoView({block:'center'})};
})();
