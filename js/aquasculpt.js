// aquasculpt.onrender.com: reveal-on-scroll (progressive enhancement), "Where to?" panel, ingredient tiles, habit planner, sticky order bar.
(function () {
  var root = document.documentElement;
  var els = [].slice.call(document.querySelectorAll(".aqs-rise,.aqs-perday2,.aqs-rater,.aqs-dial2,.aqs-chartx,.aqs-dose,.aqs-donutx"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el) { el.classList.add("is-in"); }
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); }
  else {
    root.classList.add("aqs-live2");
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "200px 0px -5% 0px", threshold: 0 });
    els.forEach(function (el) { io.observe(el); });
    var sweep = function () {
      var vh = innerHeight;
      els.forEach(function (el) { if (!el.classList.contains("is-in") && el.getBoundingClientRect().top < vh * 0.92) show(el); });
    };
    addEventListener("scroll", sweep, { passive: true });
    addEventListener("load", function () { sweep(); [400, 1200, 2500].forEach(function (t) { setTimeout(sweep, t); }); });
    sweep();
    setTimeout(function () { els.forEach(show); }, 3500);
  }

  var btn = document.querySelector(".aqs-menubtn"), panel = document.getElementById("aqs-megamenu");
  if (btn && panel) {
    var set = function (on) {
      if (on) panel.setAttribute("data-open", ""); else panel.removeAttribute("data-open");
      btn.setAttribute("aria-expanded", on ? "true" : "false");
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); set(!panel.hasAttribute("data-open")); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); e.stopPropagation(); });
    document.addEventListener("click", function () { set(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  var tiles = [].slice.call(document.querySelectorAll(".aqs-chip6"));
  if (tiles.length) {
    var stories = [].slice.call(document.querySelectorAll(".aqs-focus"));
    tiles.forEach(function (t) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("data-s");
        tiles.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        stories.forEach(function (s) { s.hidden = s.id !== id; });
      });
    });
  }

  var moments = [].slice.call(document.querySelectorAll(".aqs-whenb")), label = document.getElementById("aqs-moment");
  moments.forEach(function (m) {
    m.addEventListener("click", function () {
      moments.forEach(function (x) { x.setAttribute("aria-pressed", x === m ? "true" : "false"); });
      if (label) label.textContent = m.textContent.toLowerCase();
    });
  });
  [].slice.call(document.querySelectorAll(".aqs-daysbtn")).forEach(function (d) {
    d.addEventListener("click", function () { d.setAttribute("aria-pressed", d.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
  });

  var bar = document.querySelector(".aqs-sticky2"), foot = document.querySelector(".aqs-base2");
  if (bar) {
    var upd = function () {
      if (scrollY > 620) bar.setAttribute("data-up", ""); else bar.removeAttribute("data-up");
      var hide = false;
      if (foot) hide = foot.getBoundingClientRect().top < innerHeight - 40;
      if (hide) bar.setAttribute("data-hide", ""); else bar.removeAttribute("data-hide");
    };
    addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd();
  }
})();

/* hero water canvas: droplets landing in water, spreading ripples across a connected node network */
(function(){var c=document.getElementById('aqs-flow');if(!c||!c.getContext)return;var x=c.getContext('2d'),W=c.width,H=c.height,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,t=0,run=true,i,k,ripples=[],drops=[],nodes=[],wy=H*0.62;
for(i=0;i<22;i++){nodes.push([20+i*(W-40)/21,wy+10+Math.sin(i*1.7)*14+((i%3)*10)])}
function spawn(){drops.push({x:60+Math.random()*(W-120),y:-6,v:2.2+Math.random()*1.6})}
for(i=0;i<3;i++)spawn();
function frame(){t+=0.016;x.clearRect(0,0,W,H);
x.fillStyle='rgba(39,180,201,.14)';x.fillRect(0,wy,W,H-wy);
x.strokeStyle='rgba(70,99,209,.5)';x.lineWidth=2;x.beginPath();for(i=0;i<=W;i+=6){var yy=wy+Math.sin(i*0.03+t*2)*3;if(i)x.lineTo(i,yy);else x.moveTo(i,yy)}x.stroke();
for(i=0;i<ripples.length;i++){var r=ripples[i];r.r+=reduce?0:1.4;r.a-=0.008;x.beginPath();x.ellipse(r.x,wy,r.r,r.r*0.22,0,0,6.283);x.strokeStyle='rgba(39,180,201,'+Math.max(0,r.a)+')';x.lineWidth=2;x.stroke()}
ripples=ripples.filter(function(r){return r.a>0});
for(i=0;i<nodes.length;i++){var n=nodes[i],near=0;for(k=0;k<ripples.length;k++){var d=Math.abs(ripples[k].r-Math.abs(n[0]-ripples[k].x));if(d<14)near=Math.max(near,ripples[k].a)}
if(i){x.beginPath();x.moveTo(nodes[i-1][0],nodes[i-1][1]);x.lineTo(n[0],n[1]);x.strokeStyle='rgba(70,99,209,.25)';x.lineWidth=1;x.stroke()}
x.beginPath();x.arc(n[0],n[1],3+4*near,0,6.283);x.fillStyle=near>0.05?'rgba(39,180,201,.95)':'rgba(70,99,209,.85)';x.fill()}
for(i=0;i<drops.length;i++){var p=drops[i];if(!reduce)p.y+=p.v;x.beginPath();x.moveTo(p.x,p.y-8);x.quadraticCurveTo(p.x+5,p.y+2,p.x,p.y+5);x.quadraticCurveTo(p.x-5,p.y+2,p.x,p.y-8);x.fillStyle='rgba(70,99,209,.9)';x.fill();if(p.y>=wy){ripples.push({x:p.x,r:4,a:0.7});p.y=-6;p.x=60+Math.random()*(W-120);p.v=2.2+Math.random()*1.6}}
if(reduce&&ripples.length==0){ripples.push({x:W*0.5,r:40,a:0.4},{x:W*0.5,r:80,a:0.25})}
if(run&&!reduce)requestAnimationFrame(frame)}
frame();
if('IntersectionObserver' in window){new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run&&!reduce){run=true;frame()}else if(!v){run=false}},{threshold:0}).observe(c)}
})();
