/* ═══════════════════════════════════════════════════════════════
   index.js — scripts específicos da home (index.html)

   1. Hero split — imagem desliza para o lado, título sobe (dirigido por scroll)
   2. Reveal on scroll — fades escopados ao #sobre
   3. Logo escuro sobre seções claras
   4. 02 Tecnologia (#tech-scroll) — camadas 3D dirigidas por scroll
   5. Madeiras — piso 3D interativo
   ═══════════════════════════════════════════════════════════════ */

/* Hero split — progresso 0→1 conforme rola dentro do runway do #hero-viewport. */
(function(){
  const vp = document.getElementById('hero-viewport');
  const sticky = document.getElementById('hero-sticky');
  if (!vp || !sticky || !vp.classList.contains('hero-split')) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced){ sticky.style.setProperty('--hp','1'); return; }

  let ticking = false;
  function update(){
    ticking = false;
    const vh = window.innerHeight;
    const runway = vp.offsetHeight - vh;                 // distância de pin (px)
    if (runway <= 0){ sticky.style.setProperty('--hp','0'); return; }
    const scrolled = Math.max(0, -vp.getBoundingClientRect().top);
    /* completa a transição em ~80% do runway e segura o restante */
    const p = Math.min(scrolled / (runway * 0.8), 1);
    sticky.style.setProperty('--hp', p.toFixed(4));
  }
  const onScroll = () => { if (!ticking){ requestAnimationFrame(update); ticking = true; } };

  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();
    } else {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    }
  }, { rootMargin: '100px 0px' });
  io.observe(vp);
  update();
})();

/* Logo vira preto quando a navbar está sobre uma seção clara (fundo branco) */
(function(){
  const logo = document.querySelector('.topbar-logo');
  if (!logo) return;
  const light = [...document.querySelectorAll('#sobre, .texturas-scroll, #madeiras-tipos')];
  if (!light.length) return;

  const activeSet = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) activeSet.add(e.target);
      else activeSet.delete(e.target);
    });
    logo.classList.toggle('is-dark', activeSet.size > 0);
  }, { rootMargin: '-26px 0px -95% 0px' });

  light.forEach(s => io.observe(s));
})();

/* reveal on scroll (escopado ao #sobre) */
(function(){
  const io = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('#sobre .fade').forEach((el, i) => {
    el.style.transitionDelay = (i % 3 * 0.08) + 's';
    io.observe(el);
  });
})();

/* Tecnologia — camadas 3D dirigidas por scroll (seção #tech-scroll) */
(function(){
  const sec = document.getElementById('tech-scroll');
  if (!sec) return;
  const planks = Array.from(sec.querySelectorAll('[data-plank]'));
  const shadow = sec.querySelector('[data-plank-shadow]');
  const labels = Array.from(sec.querySelectorAll('[data-tech-label]'));
  const clamp = (v) => Math.max(0, Math.min(1, v));

  let ticking = false;
  const update = () => {
    ticking = false;
    const r = sec.getBoundingClientRect();
    const total = sec.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const p = clamp(-r.top / total);
    const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const spread = window.innerWidth <= 768 ? 62 : 120;
    const gap = 10 + eased * spread;
    const n = planks.length;
    planks.forEach((el, i) => {
      el.style.transform = `translateZ(${((i - (n - 1) / 2) * gap).toFixed(1)}px)`;
    });
    if (shadow) {
      shadow.style.transform = `scale(${(1 + eased * 0.25).toFixed(3)})`;
      shadow.style.opacity = (0.7 - eased * 0.3).toFixed(2);
    }
    const step = 0.85 / (labels.length + 1);
    labels.forEach((el, i) => {
      const on = p > step * (i + 1);
      el.style.opacity = on ? '1' : '0';
      el.style.transform = on ? 'none' : 'translateY(14px)';
    });
  };

  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      update();
    } else {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }, { rootMargin: '100px 0px' });
  io.observe(sec);
})();

/* Madeiras — piso 3D fechado, girável com o mouse/toque (seção #madeiras-tipos) */
(function(){
  const stage = document.querySelector('#madeiras-tipos [data-floor3d]');
  const stack = document.querySelector('#madeiras-tipos [data-floor3d-stack]');
  if (!stage || !stack) return;

  let rotX = 58, rotZ = -38;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  let raf = 0;
  const render = () => {
    raf = 0;
    stack.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };

  let dragging = false, lastX = 0, lastY = 0;

  const move = (x, y) => {
    if (!dragging) return;
    rotZ -= (x - lastX) * 0.4;
    rotX = clamp(rotX - (y - lastY) * 0.4, 8, 88);
    lastX = x; lastY = y;
    schedule();
  };

  const onMouseMove = (e) => move(e.clientX, e.clientY);
  const onMouseUp = () => end();
  const onTouchMove = (e) => {
    if (!dragging) return;
    const t = e.touches[0];
    if (e.cancelable) e.preventDefault();
    move(t.clientX, t.clientY);
  };
  const onTouchEnd = () => end();

  const start = (x, y) => {
    dragging = true;
    lastX = x;
    lastY = y;
    stage.classList.add('is-grabbing');
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  };

  const end = () => {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('is-grabbing');
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  stage.addEventListener('mousedown', (e) => { e.preventDefault(); start(e.clientX, e.clientY); });
  stage.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    start(t.clientX, t.clientY);
  }, { passive: true });

  render();
})();

