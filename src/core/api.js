// ---------- 장면 도구 ----------
const NS = "http://www.w3.org/2000/svg";
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = x => { x = clamp(x); return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };
// 구간 [a, b] 안에서 0→1
const seg = (t, a, b) => ease((t - a) / (b - a));

function makeApi(el) {
  const offs = [];
  const api = {
    el, reduced: REDUCED,
    accent: getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(),
    svg(w = 400, h = 300) {
      const s = document.createElementNS(NS, "svg");
      s.setAttribute("viewBox", `0 0 ${w} ${h}`);
      s.setAttribute("preserveAspectRatio", "xMidYMid meet");
      s.style.fontFamily = "inherit";
      el.appendChild(s); return s;
    },
    n(tag, attrs = {}, parent) {
      const e = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
      if (parent) parent.appendChild(e);
      return e;
    },
    t(text, attrs = {}, parent) { const e = api.n("text", attrs, parent); e.textContent = text; return e; },
    set(e, attrs) { for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); },
    // fn(초)를 매 프레임 호출. 움직임 줄이기면 still 시점 한 장면만 그린다.
    loop(fn, still = 0) {
      if (REDUCED) { fn(still); return; }
      let id, t0 = performance.now();
      const step = now => { fn((now - t0) / 1000); id = requestAnimationFrame(step); };
      id = requestAnimationFrame(step);
      offs.push(() => cancelAnimationFrame(id));
    },
    on(target, ev, fn, opt) { target.addEventListener(ev, fn, opt); offs.push(() => target.removeEventListener(ev, fn, opt)); },
    cleanup(fn) { offs.push(fn); },
    dispose() { offs.splice(0).forEach(f => { try { f(); } catch (e) {} }); el.innerHTML = ""; },
  };
  return api;
}

// three.js 장면 공통: 렌더러·카메라·드래그 회전·크기 맞춤
function makeThree(api, { distance = 9, tilt = 0.35 } = {}) {
  if (!window.THREE) { api.el.textContent = "3D를 불러오지 못했어요."; return null; }
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio));
  api.el.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const dl = new THREE.DirectionalLight(0xffffff, 0.6); dl.position.set(4, 6, 5); scene.add(dl);
  const world = new THREE.Group(); scene.add(world);
  const view = { yaw: -0.5, pitch: tilt, auto: true, dist: distance };
  const fit = () => {
    const w = api.el.clientWidth || 400, h = api.el.clientHeight || 300;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    view.dist = distance / Math.min(1, camera.aspect * 1.15);
  };
  fit();
  const ro = new ResizeObserver(fit); ro.observe(api.el); api.cleanup(() => ro.disconnect());
  let drag = null;
  api.on(renderer.domElement, "pointerdown", e => { drag = { x: e.clientX, y: e.clientY, yaw: view.yaw, pitch: view.pitch }; view.auto = false; renderer.domElement.setPointerCapture(e.pointerId); });
  api.on(renderer.domElement, "pointermove", e => {
    if (!drag) return;
    view.yaw = drag.yaw + (e.clientX - drag.x) * 0.01;
    view.pitch = clamp(drag.pitch + (e.clientY - drag.y) * 0.01, -1.2, 1.2);
  });
  api.on(renderer.domElement, "pointerup", () => { drag = null; });
  api.cleanup(() => { renderer.dispose(); });
  const draw = dt => {
    if (view.auto && !REDUCED) view.yaw += dt * 0.15;
    const d = view.dist;
    camera.position.set(Math.sin(view.yaw) * Math.cos(view.pitch) * d, Math.sin(view.pitch) * d, Math.cos(view.yaw) * Math.cos(view.pitch) * d);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };
  // 글자 라벨을 3D 공간에 붙이기 (캔버스 텍스처 스프라이트)
  const label = (text, { color = "#23272f", size = 0.5, bg = null } = {}) => {
    const c = document.createElement("canvas"), x = c.getContext("2d");
    const font = "600 48px -apple-system, 'Apple SD Gothic Neo', sans-serif";
    x.font = font; const w = Math.ceil(x.measureText(text).width) + 32;
    c.width = w; c.height = 72; x.font = font;
    if (bg) { x.fillStyle = bg; x.beginPath(); x.roundRect ? x.roundRect(0, 0, w, 72, 18) : x.rect(0, 0, w, 72); x.fill(); }
    x.fillStyle = color; x.textBaseline = "middle"; x.fillText(text, 16, 38);
    const tex = new THREE.CanvasTexture(c);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
    s.scale.set(size * w / 72, size, 1);
    return s;
  };
  return { THREE, renderer, scene, camera, world, draw, label, view };
}

// ---------- 책 ----------
const BOOKS = [];