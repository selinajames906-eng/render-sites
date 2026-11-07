// synevraultraliftserum.onrender.com: reveal-on-scroll (progressive enhancement), "Where to?" panel, ingredient tiles, habit planner, sticky order bar.
(function () {
  var root = document.documentElement;
  var els = [].slice.call(document.querySelectorAll(".syn-rise,.syn-perday2,.syn-rater,.syn-dial2,.syn-chartx,.syn-dose,.syn-donutx"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el) { el.classList.add("is-in"); }
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); }
  else {
    root.classList.add("syn-live2");
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

  var btn = document.querySelector(".syn-menubtn"), panel = document.getElementById("syn-megamenu");
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

  var tiles = [].slice.call(document.querySelectorAll(".syn-chip6"));
  if (tiles.length) {
    var stories = [].slice.call(document.querySelectorAll(".syn-focus"));
    tiles.forEach(function (t) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("data-s");
        tiles.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        stories.forEach(function (s) { s.hidden = s.id !== id; });
      });
    });
  }

  var moments = [].slice.call(document.querySelectorAll(".syn-whenb")), label = document.getElementById("syn-moment");
  moments.forEach(function (m) {
    m.addEventListener("click", function () {
      moments.forEach(function (x) { x.setAttribute("aria-pressed", x === m ? "true" : "false"); });
      if (label) label.textContent = m.textContent.toLowerCase();
    });
  });
  [].slice.call(document.querySelectorAll(".syn-daysbtn")).forEach(function (d) {
    d.addEventListener("click", function () { d.setAttribute("aria-pressed", d.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
  });

  var bar = document.querySelector(".syn-sticky2"), foot = document.querySelector(".syn-base2");
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

/* hero skin canvas: a wrinkled surface line smoothing out, hydration droplets rising through a connected lattice */
(function(){var c=document.getElementById('syn-flow');if(!c||!c.getContext)return;var x=c.getContext('2d'),W=c.width,H=c.height,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,t=0,run=true,i,k,j,drops=[],cols=14,rows=4,lat=[];
for(j=0;j<rows;j++)for(i=0;i<cols;i++)lat.push([30+i*(W-60)/(cols-1)+(j%2?10:0),95+j*32]);
for(i=0;i<34;i++)drops.push({x:Math.random()*W,y:100+Math.random()*130,v:0.3+Math.random()*0.7});
function frame(){t+=0.016;x.clearRect(0,0,W,H);
var cyc=(Math.sin(t*0.9)+1)/2,amp=reduce?4:16*(1-cyc)+1.5;
x.fillStyle='rgba(122,79,196,.08)';x.beginPath();x.moveTo(0,H);for(i=0;i<=W;i+=6){x.lineTo(i,60+Math.sin(i*0.07+1)*amp+Math.sin(i*0.19)*amp*0.4)}x.lineTo(W,H);x.closePath();x.fill();
x.strokeStyle='rgba(122,79,196,.85)';x.lineWidth=3;x.beginPath();for(i=0;i<=W;i+=4){var yy=60+Math.sin(i*0.07+1)*amp+Math.sin(i*0.19)*amp*0.4;if(i)x.lineTo(i,yy);else x.moveTo(i,yy)}x.stroke();
for(k=0;k<lat.length;k++){var n=lat[k];for(j=k+1;j<Math.min(k+cols+2,lat.length);j++){var m=lat[j];if(Math.hypot(n[0]-m[0],n[1]-m[1])<44){x.beginPath();x.moveTo(n[0],n[1]);x.lineTo(m[0],m[1]);x.strokeStyle='rgba(122,79,196,.2)';x.lineWidth=1;x.stroke()}}}
for(k=0;k<lat.length;k++){var n2=lat[k],g=0.5+0.5*Math.sin(t*2-n2[0]*0.02-n2[1]*0.05);x.beginPath();x.arc(n2[0],n2[1],2.6+1.6*g*(1-cyc),0,6.283);x.fillStyle=k%3?'rgba(122,79,196,.8)':'rgba(217,130,74,.95)';x.fill()}
for(i=0;i<drops.length;i++){var p=drops[i];if(!reduce){p.y-=p.v;if(p.y<72){p.y=H-4;p.x=Math.random()*W}}x.beginPath();x.arc(p.x,p.y,2,0,6.283);x.fillStyle='rgba(217,130,74,'+(0.2+0.6*((p.y-72)/(H-72)))+')';x.fill()}
if(run&&!reduce)requestAnimationFrame(frame)}
frame();
if('IntersectionObserver' in window){new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run&&!reduce){run=true;frame()}else if(!v){run=false}},{threshold:0}).observe(c)}
})();
