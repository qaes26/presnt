(function(){
  var D=[
    {name:'قيس الجازي',title:'المقدمة — قصة نجاح مايكروسوفت'},
    {name:'رهف مصطفى',title:'لماذا تهيمن مايكروسوفت؟'},
    {name:'عهد الخليف',title:'مايكروسوفت ضد آبل — مقارنة استراتيجية'},
    {name:'عهد الخليف',title:'الخلاصة الجوهرية'},
    {name:'بدر بني حسن',title:'كيف نجح بيل غيتس؟'},
    {name:'بدر بني حسن',title:'الصفقة التي غيّرت كل شيء'},
    {name:'قيس الجازي',title:'الخاتمة — النجاح ليس ضربة حظ'},
    {name:'فريق العمل',title:'شكراً لاستماعكم'}
  ];

  var sls=document.querySelectorAll('.slide');
  var dts=document.querySelectorAll('.dt');
  var prog=document.getElementById('prog');
  var trans=document.getElementById('transition');
  var tNum=document.getElementById('tNum');
  var bName=document.getElementById('bName');
  var bTitle=document.getElementById('bTitle');
  var planeGroup=document.getElementById('planeGroup');
  var N=sls.length,cur=0,busy=false;

  // ══ Stars ══
  var sc=document.getElementById('stars'),sx=sc.getContext('2d');
  sc.width=innerWidth;sc.height=innerHeight;
  var pts=[];
  for(var i=0;i<50;i++) pts.push({
    x:Math.random()*sc.width,
    y:Math.random()*sc.height,
    r:Math.random()*1.3+0.3,
    s:Math.random()*0.25+0.08,
    a:Math.random()*6.28
  });
  function drawS(){
    sx.clearRect(0,0,sc.width,sc.height);
    for(var i=0;i<pts.length;i++){
      var p=pts[i];
      p.y-=p.s;p.a+=0.004;
      if(p.y<-5){p.y=sc.height+5;p.x=Math.random()*sc.width}
      sx.beginPath();sx.arc(p.x,p.y,p.r,0,6.28);
      sx.fillStyle='rgba(255,255,255,'+(0.12+Math.sin(p.a)*0.08)+')';
      sx.fill();
    }
    requestAnimationFrame(drawS);
  }
  drawS();
  window.addEventListener('resize',function(){sc.width=innerWidth;sc.height=innerHeight});

  // ══ Typewriter on banner ══
  var twTmr=null;
  function typewrite(text,el,cb){
    clearInterval(twTmr);
    var idx=0;el.textContent='';
    twTmr=setInterval(function(){
      if(idx<text.length){
        el.textContent=text.substring(0,idx+1);
        idx++;
      }else{
        clearInterval(twTmr);
        if(cb) setTimeout(cb,800);
      }
    },55);
  }

  // ══ Transition ══
  function showTransition(idx,cb){
    tNum.textContent='SLIDE '+(idx+1)+' / '+N;
    bName.innerHTML='إعداد: <span>'+D[idx].name+'</span>';
    bTitle.textContent='';

    // Reset airplane animation
    planeGroup.style.animation='none';
    planeGroup.offsetHeight; // trigger reflow
    planeGroup.style.animation='';

    trans.classList.add('show');

    // Start typewriter after plane arrives mid-screen
    setTimeout(function(){
      typewrite(D[idx].title, bTitle, cb);
    },1200);
  }

  function hideTransition(){
    trans.classList.remove('show');
  }

  // ══ Navigation ══
  function goTo(idx){
    if(busy||idx===cur||idx<0||idx>=N) return;
    busy=true;
    sls[cur].classList.remove('active');

    showTransition(idx,function(){
      hideTransition();
      setTimeout(function(){
        sls[idx].classList.add('active');
        cur=idx;
        for(var d=0;d<dts.length;d++) dts[d].classList.remove('on');
        dts[idx].classList.add('on');
        prog.style.width=((idx+1)/N*100)+'%';
        busy=false;
      },500);
    });
  }

  // Controls
  document.getElementById('pv').onclick=function(){goTo(cur-1)};
  document.getElementById('nx').onclick=function(){goTo(cur+1)};

  document.onkeydown=function(e){
    if(e.key==='ArrowRight'||e.key==='ArrowUp') goTo(cur-1);
    if(e.key==='ArrowLeft'||e.key==='ArrowDown') goTo(cur+1);
  };

  for(var di=0;di<dts.length;di++){
    (function(i){dts[i].onclick=function(){goTo(i)}})(di);
  }

  var tx=0;
  document.ontouchstart=function(e){tx=e.changedTouches[0].screenX};
  document.ontouchend=function(e){
    var d=tx-e.changedTouches[0].screenX;
    if(Math.abs(d)>50){d<0?goTo(cur-1):goTo(cur+1)}
  };

  // ══ Init ══
  sls[0].classList.add('active');
  dts[0].classList.add('on');
  prog.style.width=(1/N*100)+'%';
})();
