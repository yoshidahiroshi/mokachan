// dog-wander.js
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("dog");
  if (!img) return;

  let x = window.innerWidth * 0.5;
  let y = window.innerHeight * 0.6;
  let tx = x, ty = y;

  const speed = 120;        // px/sec
  const pad = 20;
  const changeMs = 900;

  let w = img.offsetWidth;
  let h = img.offsetHeight;

  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
  function rand(a, b){ return a + Math.random() * (b - a); }

  function updateSize(){
    const r = img.getBoundingClientRect();
    w = r.width; h = r.height;
  }

  function pickTarget(){
    const minX = pad + w/2;
    const maxX = window.innerWidth  - pad - w/2;
    const minY = pad + h/2;
    const maxY = window.innerHeight - pad - h/2;
    tx = rand(minX, maxX);
    ty = rand(minY, maxY);
  }

  window.addEventListener("resize", () => {
    updateSize();
    x = clamp(x, pad + w/2, window.innerWidth  - pad - w/2);
    y = clamp(y, pad + h/2, window.innerHeight - pad - h/2);
  });

  setInterval(pickTarget, changeMs);
  pickTarget();

  let last = performance.now();
  function tick(now){
    const dt = (now - last) / 1000;
    last = now;

    const dx = tx - x;
    const dy = ty - y;
    const dist = Math.hypot(dx, dy);

    if (dist > 1) {
      const step = Math.min(dist, speed * dt);
      x += (dx / dist) * step;
      y += (dy / dist) * step;

      const flip = dx < 0 ? 1 : -1;
      const bob = Math.sin(now / 140) * 3;

      img.style.transform =
        `translate(${x - w/2}px, ${y - h/2 + bob}px) scaleX(${flip})`;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
});

