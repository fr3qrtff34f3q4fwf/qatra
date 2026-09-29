const LOGO='images/logo-full.png';
const $=(s,r=document)=>r.querySelector(s), fmt=n=>n.toLocaleString('ru-RU').replace(/\u00a0/g,' ');

// mobile menu
const mb=$('#menuBtn'),mn=$('#mnav');
mb.onclick=()=>{const o=mn.classList.toggle('hidden');mn.classList.toggle('flex',!o);mb.setAttribute('aria-expanded',!o)};
mn.onclick=e=>{if(e.target.tagName==='A'){mn.classList.add('hidden');mn.classList.remove('flex')}};

// impact calculator
const r=$('#range');
const upd=()=>{const v=+r.value;$('#profit').textContent=fmt(v)+' сом';$('#donation').textContent=fmt(Math.round(v*.15))+' сом'};
r.oninput=upd;upd();

// products
const S={hoodie:'<path d="M60 40l30-14c6 12 34 12 40 0l30 14 28 26-16 22-14-8v100H62V80l-14 8-16-22z"/><path d="M90 26c0 22 40 22 40 0"/><path d="M110 62v40"/>',
tee:'<path d="M70 34c10 14 70 14 80 0l52 26-18 34-20-8v104H56V86l-20 8L18 60z"/>',
jacket:'<path d="M66 36l20-10h48l20 10 30 28-14 26-14-6v100H64V84l-14 6L36 64z"/><path d="M110 26v174"/><path d="M76 120h24M120 120h24"/>',
pants:'<path d="M70 30h80l12 176h-40l-12-96-12 96H58z"/><path d="M70 50h80"/>'};
/* Фото товара: положите файл в images/products/ под именем из 5-го поля (hoodie.jpg и т.д.) */
const P=[['Худи Drop','Плотный хлопок, свободный крой',3500,'hoodie'],['Футболка Base','Хлопок 240 г/м², прямой крой',1500,'tee'],['Куртка Shell','Лёгкая ветрозащита',6500,'jacket'],['Брюки Line','Прямой силуэт, плотный твил',2900,'pants']];
let cart=0;
$('#grid').innerHTML=P.map(([n,d,p,k],i)=>`<article class="card flex flex-col">
<div class="ph bg1 aspect-[4/5] grid place-items-center border-b line" data-photo="images/products/${k}.jpg" data-alt="${n}"><svg viewBox="0 0 220 240" class="w-[72%]" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round">${S[k]}</svg></div>
<div class="p-5 flex-1 flex flex-col"><h3 class="font-medium">${n}</h3><p class="text-sm text-black/60 mt-1">${d}</p>
<p class="mt-4 text-lg font-light">${fmt(p)} сом</p>
<button class="add btn btn-l !h-11 mt-5 w-full !text-xs" data-i="${i}">В КОРЗИНУ</button></div></article>`).join('');
document.querySelectorAll('.ph[data-photo]').forEach(el=>{const im=new Image();im.onload=()=>{im.alt=el.dataset.alt;im.className='w-full h-full object-cover';el.replaceChildren(im)};im.src=el.dataset.photo});
$('#grid').onclick=e=>{const b=e.target.closest('.add');if(!b)return;
 cart++;const c=$('#cartCount');c.textContent=cart;c.style.opacity=1;
 b.textContent='ДОБАВЛЕНО';b.classList.add('done');setTimeout(()=>{b.textContent='В КОРЗИНУ';b.classList.remove('done')},1400)};
$('#cartBtn').onclick=()=>alert(cart?`В корзине товаров: ${cart}`:'Корзина пока пуста');

// documents
const D=[['Платёжное поручение','12 января 2026','«Помогать легко»','120 000','№ 0114'],['Сертификат фонда','28 февраля 2026','Красный Полумесяц Кыргызстана','',''],['Платёжное поручение','15 марта 2026','«Умут Шамы»','210 000','№ 0342'],['Платёжное поручение','10 мая 2026','Oasis Кыргызстан','185 000','№ 0517'],['Сертификат фонда','30 июня 2026','«Добро KG»','',''],['Платёжное поручение','14 августа 2026','«Помогать легко»','725 000','№ 0821']];
const doc=(d,big)=>{const cert=!d[3],s=big?'p-8 md:p-10':'p-4 md:p-6';
return `<div class="bg-white border line ${s} text-left ${big?'':'h-full'}"><img src="${LOGO}" alt="" class="${big?'w-14':'w-9'} h-auto">
<p class="${big?'mt-8 text-2xl':'mt-4 text-sm md:text-base'} font-medium leading-snug">${d[0]}</p>
<p class="${big?'text-sm':'text-xs'} text-black/60 mt-1">${d[4]?d[4]+' · ':''}${d[1]}</p>
<div class="${big?'mt-8 pt-6':'mt-4 pt-3'} border-t line ${big?'text-sm':'text-xs'} space-y-2">
<div class="flex justify-between gap-3"><span class="text-black/50">${cert?'Выдан':'Получатель'}</span><span class="text-right">${d[2]}</span></div>
${cert?`<div class="flex justify-between gap-3"><span class="text-black/50">Основание</span><span class="text-right">Благодарность за помощь</span></div>`:`<div class="flex justify-between gap-3"><span class="text-black/50">Сумма</span><span class="font-medium">${d[3]} сом</span></div>`}
<div class="flex justify-between gap-3"><span class="text-black/50">Статус</span><span>${cert?'Подтверждён':'Исполнено'}</span></div></div>
${big?'':''}</div>`};
$('#docs').innerHTML=D.map((d,i)=>`<button class="text-left transition hover:-translate-y-0.5" data-i="${i}" aria-label="Открыть: ${d[0]}, ${d[1]}">${doc(d)}</button>`).join('');

// lightbox
const lb=$('#lb');let cur=0,last;
/* Скан документа: images/docs/doc-1.jpg ... doc-6.jpg (по порядку в списке D) */
const show=i=>{cur=(i+D.length)%D.length;$('#lbBody').innerHTML=doc(D[cur],true);
 const im=new Image(),ph=$('#scan'),n=cur+1;im.onload=()=>{im.className='w-full h-auto border line';im.alt='Скан документа';$('#lbBody').replaceChildren(im)};im.src='images/docs/doc-'+n+'.jpg'};
const open=i=>{last=document.activeElement;show(i);lb.classList.add('open');document.body.style.overflow='hidden';$('#lbClose').focus()};
const close=()=>{lb.classList.remove('open');document.body.style.overflow='';last&&last.focus()};
$('#docs').onclick=e=>{const b=e.target.closest('button');if(b)open(+b.dataset.i)};
$('#lbClose').onclick=close;$('#lbPrev').onclick=()=>show(cur-1);$('#lbNext').onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target===lb)close()};
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;
 if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});

// counter
const t=$('#total'),to=+t.dataset.to;
new IntersectionObserver((en,o)=>{if(!en[0].isIntersecting)return;o.disconnect();
 const st=performance.now();(function f(n){const k=Math.min(1,(n-st)/1400);t.textContent=fmt(Math.round(to*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(f)})(st)}).observe(t);

// subscribe
$('#sub').onsubmit=e=>{e.preventDefault();const v=$('#email').value.trim(),m=$('#subMsg');
 m.textContent=/^\S+@\S+\.\S+$/.test(v)?'Спасибо, вы подписались.':'Введите почту в формате name@mail.com'};
