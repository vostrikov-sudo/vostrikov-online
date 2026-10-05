const S=Object.assign({name:'Игрок',coins:0,best:{run:0,bat:0},games:0,own:{},skin:''},JSON.parse(localStorage.getItem('vg')||'{}'));
const save=()=>localStorage.setItem('vg',JSON.stringify(S));
const ITEMS=[
{id:'life',n:'Запасная жизнь',d:'Раннер: 4 жизни вместо 3',p:150},
{id:'jump',n:'Пружинные ботинки',d:'Раннер: прыжок выше на 8%',p:200},
{id:'armor',n:'Усиленная броня',d:'Бой: 150 здоровья вместо 100',p:250},
{id:'drone',n:'Батарея дрона',d:'Бой: дрон работает 25 секунд',p:200},
{id:'fire',n:'Огненный герой',d:'Скин: тёплые цвета',p:300,skin:'hue-rotate(150deg)'},
{id:'forest',n:'Лесной герой',d:'Скин: зелёные цвета',p:300,skin:'hue-rotate(-90deg)'}];
const skinF=()=>(ITEMS.find(i=>i.id==S.skin)||{}).skin||'none';
function earn(g,score){S.coins+=Math.floor(score/10);S.best[g]=Math.max(S.best[g]||0,score);S.games++;save();ui()}
function ui(){
 document.querySelectorAll('.coins').forEach(e=>e.textContent=S.coins);
 pn.value=S.name;pr.textContent=S.best.run;pb.textContent=S.best.bat;pg.textContent=S.games;pq.textContent=[5,6,7,8,9].map(g=>g+' кл: '+(S.best['q'+g]||0)).join(', ');
 shop.innerHTML=ITEMS.map(i=>{const o=S.own[i.id];
  return `<div class="it"><h4>${i.n}</h4><p>${i.d}</p><button class="btn s" data-i="${i.id}" ${o&&!i.skin?'disabled':''}>${
  !o?'Купить за '+i.p:i.skin?(S.skin==i.id?'Снять':'Надеть'):'Куплено'}</button></div>`}).join('');
 document.getElementById('hp').style.filter=skinF();
}
pn.oninput=()=>{S.name=pn.value.slice(0,16);save()};
shop.onclick=e=>{const id=e.target.dataset.i;if(!id)return;const i=ITEMS.find(v=>v.id==id);
 if(!S.own[id]){if(S.coins<i.p){alert('Не хватает монет. Играй и копи!');return}S.coins-=i.p;S.own[id]=1}
 else if(i.skin)S.skin=S.skin==id?'':id;
 save();ui()};
ui();
