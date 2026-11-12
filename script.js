(function(){
  var root=document.documentElement;
  var es=document.getElementById('b-es'), en=document.getElementById('b-en');
  function set(l){
    root.lang=l;
    if(es){es.setAttribute('aria-pressed',String(l==='es'));}
    if(en){en.setAttribute('aria-pressed',String(l==='en'));}
    document.querySelectorAll('[data-ph-es]').forEach(function(el){el.placeholder=el.getAttribute('data-ph-'+l)||'';});
    var lf=document.getElementById('f-lang'); if(lf){lf.value=l;}
    try{localStorage.setItem('sd-lang',l);}catch(e){}
  }
  var saved=null; try{saved=localStorage.getItem('sd-lang');}catch(e){}
  set(saved || ((navigator.language||'es').slice(0,2)==='es'?'es':'en'));
  if(es){es.addEventListener('click',function(){set('es');});}
  if(en){en.addEventListener('click',function(){set('en');});}

  document.querySelectorAll('.gal').forEach(function(g){
    var bar=g.nextElementSibling; if(!bar){return;}
    var c=bar.querySelector('.count'), n=g.children.length;
    function idx(){return Math.round(g.scrollLeft/g.clientWidth);}
    function upd(){c.textContent=(idx()+1)+' / '+n;}
    g.addEventListener('scroll',function(){window.requestAnimationFrame(upd);},{passive:true});
    bar.querySelector('.prev').addEventListener('click',function(){g.scrollTo({left:Math.max(0,idx()-1)*g.clientWidth,behavior:'smooth'});});
    bar.querySelector('.next').addEventListener('click',function(){var i=idx()+1; if(i>=n){i=0;} g.scrollTo({left:i*g.clientWidth,behavior:'smooth'});});
  });
})();
