const book = document.getElementById("book");
const KEY = "ai-picture-books";
let VOL, PAGES, curV = 0, cur = 0, finishTurn = null;

// 지금 펼친 권을 바꾼다 (색, 쪽 목록, 점, 책장 표시)
function useVolume(vi) {
  curV = vi; VOL = BOOKS[vi];
  PAGES = [{ type: "cover" }, ...VOL.chapters.map((c, i) => ({ type: "chap", i })), { type: "recap" }];
  const root = document.documentElement.style;
  root.setProperty("--accent", VOL.color.accent);
  root.setProperty("--accent-ink", VOL.color.ink);
  root.setProperty("--accent-soft", VOL.color.soft);
  const dots = document.getElementById("dots");
  dots.innerHTML = "";
  PAGES.forEach((_, i) => { const d = document.createElement("button"); d.setAttribute("aria-label", `${i + 1}쪽으로`); d.onclick = () => go(i); dots.appendChild(d); });
  document.querySelectorAll(".spine").forEach((b, i) => { b.classList.toggle("cur", i === vi); b.setAttribute("aria-current", i === vi ? "true" : "false"); });
  const cv = document.querySelectorAll(".spine")[vi]; if (cv && innerWidth <= 900) cv.scrollIntoView({ block: "nearest", inline: "nearest" });
}

// 권 이름: 보통 "N권", 특강처럼 따로 정한 이름이 있으면 그것
const volName = b => b.volName || `${b.no}권`;

function renderShelf() {
  const shelf = document.getElementById("shelf");
  shelf.innerHTML = `<div class="shelf-title">책장 · ${BOOKS.length}권</div>` + BOOKS.map((b, i) =>
    `<button class="spine" style="--c:${b.color.accent};--ci:${b.color.ink};--cs:${b.color.soft}" data-v="${i}" aria-label="${volName(b)} ${b.title}"><span class="no">${b.badge || b.no}</span><span class="tt">${b.title}</span><span class="prog"><span class="bar"><i></i></span><span class="pn"></span></span></button>`).join("");
  shelf.querySelectorAll(".spine").forEach(b => b.onclick = () => go(0, +b.dataset.v));
  showProgress();
}
// 권마다 어디까지 읽었는지 (가장 멀리 간 쪽) - 책장 카드의 진행 막대
const PKEY = KEY + "-progress";
let PROG = {};
try { PROG = JSON.parse(localStorage.getItem(PKEY) || "{}"); } catch (e) {}
function showProgress() {
  document.querySelectorAll(".spine").forEach((el, i) => {
    const b = BOOKS[i], total = b.chapters.length + 2, seen = Math.min(total, (PROG[b.no] || 0));
    el.querySelector(".bar i").style.width = `${Math.round(seen / total * 100)}%`;
    el.querySelector(".pn").textContent = seen >= total ? "다 읽음" : seen ? `${seen}/${total}쪽` : "아직 안 읽음";
  });
}
function markRead() {
  const n = VOL.no, reached = cur + 1;
  if ((PROG[n] || 0) < reached) { PROG[n] = reached; try { localStorage.setItem(PKEY, JSON.stringify(PROG)); } catch (e) {} showProgress(); }
}

function pageHTML(p, idx) {
  const head = left => `<div class="runhead"><span>${left}</span><span>${volName(VOL)} · ${VOL.title}</span></div>`;
  const foot = `<div class="folio"><span>${VOL.series}</span><span>${idx + 1} / ${PAGES.length}</span></div>`;
  const stage = tag => `<div class="stage"><div class="scene"></div>${tag ? `<span class="tag">${tag}</span>` : ""}<button class="replay" type="button">↻ 다시 보기</button></div>`;
  if (p.type === "cover") return head(VOL.series) + `
    <div class="spread">${stage(VOL.coverTag)}
      <div class="text cover">
        <div class="kicker">${VOL.kicker}</div>
        <span class="vol">${volName(VOL)}</span>
        <h1>${VOL.title}</h1>
        <div class="sub">${VOL.subtitle}</div>
        <div class="toc">${VOL.chapters.map((c, i) => `<button data-go="${i + 1}"><span class="n">${i + 1}</span>${c.title}</button>`).join("")}</div>
      </div>
    </div>` + foot;
  if (p.type === "recap") return head("이번 권 정리") + `
    <div class="spread">${stage(VOL.recapTag)}
      <div class="text recap">
        <div class="chap">RECAP</div>
        <h2>${VOL.recap.title}</h2>
        <ol>${VOL.recap.points.map(x => `<li>${x}</li>`).join("")}</ol>
        ${VOL.recap.extra || ""}
        <div class="next"><span class="lbl">${VOL.recap.nextLabel}</span>${VOL.recap.next}</div>
        ${BOOKS[curV + 1] ? `<button class="btn open-next" data-vol="${curV + 1}">${volName(BOOKS[curV + 1])} 펼치기 →</button>` : ""}
      </div>
    </div>` + foot;
  const c = VOL.chapters[p.i], n = p.i + 1;
  return head(`${n}장 · ${c.title}`) + `
    <div class="spread">${stage(c.tag)}
      <div class="text">
        <div class="chap">CHAPTER ${String(n).padStart(2, "0")}</div>
        <h2>${c.title}</h2>
        <p class="lead">${c.lead}</p>
        ${c.body}
        <div class="lab"><span class="lbl">실험실로 바꾸면</span>${c.lab}</div>
        <div class="quiz"><b>확인 퀴즈</b><p>${c.quiz.q}</p>
          <div class="opts">${c.quiz.options.map((o, k) => `<button type="button" data-k="${k}">${o}</button>`).join("")}</div>
          <p class="ans" hidden></p>
        </div>
      </div>
    </div>` + foot;
}

function sceneFor(p) {
  if (p.type === "cover") return VOL.coverScene;
  if (p.type === "recap") return VOL.recapScene;
  return VOL.chapters[p.i].scene;
}

function makePage(idx) {
  const el = document.createElement("section");
  el.className = "page"; el.innerHTML = pageHTML(PAGES[idx], idx);
  el.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(+b.dataset.go));
  el.querySelectorAll("[data-vol]").forEach(b => b.onclick = () => go(0, +b.dataset.vol));
  const p = PAGES[idx];
  if (p.type === "chap") {
    const q = VOL.chapters[p.i].quiz, ans = el.querySelector(".ans");
    el.querySelectorAll(".opts button").forEach(b => b.onclick = () => {
      const k = +b.dataset.k;
      el.querySelectorAll(".opts button").forEach(x => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add("right"); });
      if (k !== q.answer) b.classList.add("wrong");
      ans.innerHTML = (k === q.answer ? "<b>맞았어요!</b> " : "<b>아쉬워요.</b> ") + q.explain;
      ans.hidden = false;
    });
  }
  return el;
}

function startScene(el, idx) {
  const box = el.querySelector(".scene"), fn = sceneFor(PAGES[idx]);
  if (!box || !fn) return;
  const run = () => {
    if (el._api) el._api.dispose();
    el._api = makeApi(box);
    try { fn(el._api); } catch (e) { console.error(e); box.textContent = "그림을 그리지 못했어요."; }
  };
  run();
  el.querySelector(".replay").onclick = run;
}
function stopScene(el) { if (el._api) { el._api.dispose(); el._api = null; } }

function go(to, vi = curV) {
  if (finishTurn) finishTurn();  // 넘기는 중에 또 누르면 앞 넘김을 바로 끝낸다
  const sameVol = vi === curV;
  if (sameVol) { to = Math.max(0, Math.min(PAGES.length - 1, to)); if (to === cur) return; }
  const forward = sameVol ? to > cur : vi > curV;
  const old = book.querySelector(".page");
  if (!sameVol) useVolume(vi);
  const next = makePage(to);
  stopScene(old);
  const done = () => {
    old.remove(); next.classList.remove("turn-in");
    if (finishTurn === done) finishTurn = null;
  };
  finishTurn = done;
  if (forward) {
    book.insertBefore(next, old); startScene(next, to);
    old.classList.add("turn-out");
    old.addEventListener("animationend", done, { once: true });
  } else {
    book.appendChild(next); next.classList.add("turn-in"); startScene(next, to);
    next.addEventListener("animationend", done, { once: true });
  }
  cur = to; sync();
  if (innerWidth <= 900) window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
  history.replaceState(null, "", `#${VOL.no}-${cur + 1}`);
  try { localStorage.setItem(KEY, JSON.stringify({ v: curV, p: cur })); } catch (e) {}
  markRead();
}
function sync() {
  document.getElementById("count").textContent = `${cur + 1} / ${PAGES.length}`;
  document.getElementById("prev").disabled = cur === 0;
  document.getElementById("home").disabled = cur === 0;
  document.getElementById("next").disabled = cur === PAGES.length - 1;
  [...document.getElementById("dots").children].forEach((d, i) => d.classList.toggle("cur", i === cur));
}

document.getElementById("home").onclick = () => go(0);
document.getElementById("prev").onclick = () => go(cur - 1);
document.getElementById("next").onclick = () => go(cur + 1);
document.addEventListener("keydown", e => { if (e.key === "ArrowRight" || e.key === "PageDown") go(cur + 1); if (e.key === "ArrowLeft" || e.key === "PageUp") go(cur - 1); });
let sx = null;
book.addEventListener("touchstart", e => { sx = e.target.closest("canvas") ? null : e.touches[0].clientX; }, { passive: true });
book.addEventListener("touchend", e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 70) go(cur + (dx < 0 ? 1 : -1)); sx = null; });

// 시작 위치: 주소(#권-쪽) > 마지막으로 본 곳 > 1권 표지
let startV = 0, startP = 0;
try { const s = JSON.parse(localStorage.getItem(KEY) || "{}"); if (BOOKS[s.v]) { startV = s.v; startP = s.p || 0; } } catch (e) {}
const hm = location.hash.match(/^#(\d+)-(\d+)$/);
if (hm) { const vi = BOOKS.findIndex(b => b.no === +hm[1]); if (vi >= 0) { startV = vi; startP = +hm[2] - 1; } }
renderShelf(); useVolume(startV);
cur = Math.max(0, Math.min(PAGES.length - 1, startP));
const first = makePage(cur); book.appendChild(first); startScene(first, cur); sync(); markRead();