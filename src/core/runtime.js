/**
 * runtime.js - 단일 단행본 뷰어 런타임
 *
 * "신서아를 위한 AI 에이전트 업무 사용 입문편"
 * 7개의 권을 대단원 Chapter 1~7로 통합하여 단 한 권의 매끄러운 책으로 구동합니다.
 */

const book = document.getElementById("book");
const KEY = "cesco-ai-playbook-single";
let PAGES = [], cur = 0, finishTurn = null;

// 단행본 메인 데이터 구성
const CHAPTERS = BOOKS; // 1~7개 대단원
const MAIN_COVER = typeof BOOK_COVER !== "undefined" ? BOOK_COVER : {
  title: "신서아를 위한 AI 에이전트 업무 사용 입문편",
  kicker: "CESCO LAB AI PLAYBOOK",
  subtitle: "세스코 식품안전·이물 분석 연구원 신서아 님을 위한 맞춤 실전 가이드.<br>코딩 한 줄 없이, 실험실 이야기로 AI 원리부터 실무 에이전트까지 한 권으로 끝내요.",
  tag: "신서아 연구원 맞춤 실전 플레이북",
  color: { accent: "#0f9b8e", ink: "#0a6b62", soft: "#e3f6f3" },
  scene(api) {
    const s = api.svg();
    api.n("circle", { cx: 200, cy: 150, r: 50, fill: api.accent }, s);
    api.t("AI", { x: 200, y: 158, "text-anchor": "middle", "font-size": 24, "font-weight": 800, fill: "#fff" }, s);
  }
};

// 책 전체의 평탄화된 쪽 목록(PAGES) 생성
function buildPages() {
  PAGES = [];
  // 0쪽: 책 메인 표지
  PAGES.push({ type: "main-cover" });

  // 각 Chapter별 페이지 전개
  CHAPTERS.forEach((ch, ci) => {
    // 챕터 도입 간지 표지
    PAGES.push({ type: "chap-intro", ci, ch });
    // 각 절 (소단원)
    ch.chapters.forEach((sec, si) => {
      PAGES.push({ type: "section", ci, si, ch, sec });
    });
    // 챕터 정리
    PAGES.push({ type: "chap-recap", ci, ch });
  });

  // 마지막: 단행본 완독 축하 에필로그
  PAGES.push({ type: "book-outro" });
}

buildPages();

// 챕터 이름 도우미
const chapName = (ch) => `Chapter ${ch.no}`;

// 좌측 목차 패널 렌더링
function renderShelf() {
  const shelf = document.getElementById("shelf");
  if (!shelf) return;

  // 표지 바로가기 버튼 + 7개 챕터 목차 버튼
  let html = `<div class="shelf-title">📖 책 목차</div>`;
  html += `<button class="spine cover-spine" data-page="0" style="--c:#0f9b8e;--ci:#0a6b62;--cs:#e3f6f3" aria-label="책 표지"><span class="no">⌂</span><span class="tt">책 표지</span><span class="prog"><span class="bar"><i style="width:100%"></i></span><span class="pn">시작</span></span></button>`;

  CHAPTERS.forEach((ch, ci) => {
    // 해당 챕터의 시작 페이지 인덱스 찾기
    const startPage = PAGES.findIndex(p => p.type === "chap-intro" && p.ci === ci);
    html += `<button class="spine" style="--c:${ch.color.accent};--ci:${ch.color.ink};--cs:${ch.color.soft}" data-page="${startPage}" data-ci="${ci}" aria-label="Chapter ${ch.no} ${ch.title}"><span class="no">${ch.badge || ch.no}</span><span class="tt">${ch.title}</span><span class="prog"><span class="bar"><i></i></span><span class="pn"></span></span></button>`;
  });

  shelf.innerHTML = html;
  shelf.querySelectorAll(".spine").forEach(b => {
    b.onclick = () => go(+b.dataset.page);
  });
  showProgress();
}

// 읽기 진도율 계산 및 표시
const PKEY = KEY + "-progress";
let PROG = 0;
try { PROG = parseInt(localStorage.getItem(PKEY) || "0", 10); } catch (e) {}

function showProgress() {
  const shelf = document.getElementById("shelf");
  if (!shelf) return;
  const currentReached = Math.max(cur, PROG);

  CHAPTERS.forEach((ch, ci) => {
    const el = shelf.querySelector(`.spine[data-ci="${ci}"]`);
    if (!el) return;
    const startP = PAGES.findIndex(p => p.type === "chap-intro" && p.ci === ci);
    const endP = PAGES.findIndex(p => p.type === "chap-recap" && p.ci === ci);
    const total = endP - startP + 1;
    let seen = 0;
    if (currentReached >= endP) seen = total;
    else if (currentReached >= startP) seen = currentReached - startP + 1;

    const pct = Math.round((seen / total) * 100);
    const bar = el.querySelector(".bar i");
    const pn = el.querySelector(".pn");
    if (bar) bar.style.width = `${pct}%`;
    if (pn) pn.textContent = seen >= total ? "완독 ✓" : seen ? `${seen}/${total}쪽` : "미독";
  });
}

function markRead() {
  if (cur > PROG) {
    PROG = cur;
    try { localStorage.setItem(PKEY, String(PROG)); } catch (e) {}
    showProgress();
  }
}

// 현재 페이지의 테마 색상 설정
function applyTheme(p) {
  const root = document.documentElement.style;
  let color = MAIN_COVER.color;
  if (p.ch && p.ch.color) {
    color = p.ch.color;
  }
  root.setProperty("--accent", color.accent);
  root.setProperty("--accent-ink", color.ink);
  root.setProperty("--accent-soft", color.soft);

  // 목차 패널 활성화 표시
  document.querySelectorAll(".spine").forEach(b => {
    let isCur = false;
    if (p.type === "main-cover" && b.classList.contains("cover-spine")) isCur = true;
    else if (p.ci !== undefined && +b.dataset.ci === p.ci) isCur = true;
    b.classList.toggle("cur", isCur);
    b.setAttribute("aria-current", isCur ? "true" : "false");
  });

  const activeSpine = document.querySelector(".spine.cur");
  if (activeSpine && innerWidth <= 900) {
    activeSpine.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

// HTML 페이지 템플릿 렌더링
function pageHTML(p, idx) {
  const head = (left, right) => `<div class="runhead"><span>${left}</span><span>${right}</span></div>`;
  const foot = `<div class="folio"><span>신서아를 위한 AI 에이전트 업무 사용 입문편</span><span>${idx + 1} / ${PAGES.length}</span></div>`;
  const stage = (tag) => `<div class="stage"><div class="scene"></div>${tag ? `<span class="tag">${tag}</span>` : ""}<button class="replay" type="button">↻ 다시 보기</button></div>`;

  // 1. 단행본 메인 표지
  if (p.type === "main-cover") {
    return head("세스코 식품안전연구소 · 맞춤 실전 가이드", "신서아 연구원 전용 플레이북") + `
    <div class="spread">${stage(MAIN_COVER.tag)}
      <div class="text cover">
        <div class="kicker">${MAIN_COVER.kicker}</div>
        <span class="vol">단행본 종합본</span>
        <h1 style="font-size: 32px; line-height: 1.25; margin: 8px 0 12px;">${MAIN_COVER.title}</h1>
        <div class="sub" style="font-size: 15.5px; line-height: 1.7;">${MAIN_COVER.subtitle}</div>
        <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--line);">
          <b style="font-size: 13.5px; color: var(--accent); letter-spacing: 0.05em;">전체 대단원 목차</b>
          <div class="toc" style="margin-top: 8px;">
            ${CHAPTERS.map((ch, i) => {
              const targetP = PAGES.findIndex(page => page.type === "chap-intro" && page.ci === i);
              return `<button data-go="${targetP}"><span class="n" style="width: 24px;">${i + 1}장</span>${ch.title}</button>`;
            }).join("")}
          </div>
        </div>
      </div>
    </div>` + foot;
  }

  // 2. 챕터 도입 간지 표지
  if (p.type === "chap-intro") {
    const ch = p.ch;
    return head("신서아를 위한 실전 AI 플레이북", `Chapter ${ch.no} · ${ch.title}`) + `
    <div class="spread">${stage(ch.coverTag)}
      <div class="text cover">
        <div class="kicker">${ch.kicker}</div>
        <span class="vol">Chapter ${ch.no}</span>
        <h1>${ch.title}</h1>
        <div class="sub">${ch.subtitle}</div>
        <div class="toc">
          ${ch.chapters.map((c, i) => {
            const targetP = PAGES.findIndex(page => page.type === "section" && page.ci === p.ci && page.si === i);
            return `<button data-go="${targetP}"><span class="n" style="width: 32px;">${ch.no}.${i + 1}</span>${c.title}</button>`;
          }).join("")}
        </div>
      </div>
    </div>` + foot;
  }

  // 3. 본문 절 (소단원)
  if (p.type === "section") {
    const ch = p.ch, sec = p.sec, n = p.si + 1;
    return head(`${ch.no}.${n}절 · ${sec.title}`, `Chapter ${ch.no} · ${ch.title}`) + `
    <div class="spread">${stage(sec.tag)}
      <div class="text">
        <div class="chap">CHAPTER 0${ch.no} · SECTION 0${n}</div>
        <h2>${sec.title}</h2>
        <p class="lead">${sec.lead}</p>
        ${sec.body}
        <div class="lab"><span class="lbl">실험실로 바꾸면</span>${sec.lab}</div>
        <div class="quiz"><b>확인 퀴즈</b><p>${sec.quiz.q}</p>
          <div class="opts">${sec.quiz.options.map((o, k) => `<button type="button" data-k="${k}">${o}</button>`).join("")}</div>
          <p class="ans" hidden></p>
        </div>
      </div>
    </div>` + foot;
  }

  // 4. 챕터 정리 (Recap)
  if (p.type === "chap-recap") {
    const ch = p.ch;
    const nextChap = CHAPTERS[p.ci + 1];
    const nextChapPage = nextChap ? PAGES.findIndex(page => page.type === "chap-intro" && page.ci === p.ci + 1) : null;

    return head(`Chapter ${ch.no} 정리`, `Chapter ${ch.no} · ${ch.title}`) + `
    <div class="spread">${stage(ch.recapTag)}
      <div class="text recap">
        <div class="chap">CHAPTER 0${ch.no} RECAP</div>
        <h2>${ch.recap.title}</h2>
        <ol>${ch.recap.points.map(x => `<li>${x}</li>`).join("")}</ol>
        ${ch.recap.extra || ""}
        <div class="next"><span class="lbl">${ch.recap.nextLabel}</span>${ch.recap.next}</div>
        ${nextChapPage !== null ? `<button class="btn open-next" data-go="${nextChapPage}" style="margin-top: 14px; font-weight: 700;">다음 Chapter ${nextChap.no} 펼치기 →</button>` : ""}
      </div>
    </div>` + foot;
  }

  // 5. 단행본 완결 에필로그
  if (p.type === "book-outro") {
    return head("단행본 완독을 축하합니다!", "신서아를 위한 실전 AI 플레이북") + `
    <div class="spread">${stage("5부작 + 특강 + 세스코 실전 완독")}
      <div class="text recap">
        <div class="chap">EPILOGUE</div>
        <h2>축하합니다! 신서아 연구원님, 전 과정을 마쳤어요</h2>
        <p style="font-size: 16px; line-height: 1.8; color: var(--body);">
          AI의 가장 밑바닥 원리부터 시작해서 프롬프트 SOP 지시서, 도구 사용과 에이전트 루프, 현미경 멀티모달의 한계, 
          그리고 <b>지침(Hook), 스킬(Skill), 검증(Harness)</b>으로 나만의 맞춤 에이전트를 조련하는 방법까지 한 권으로 모두 둘러보았습니다.
        </p>
        <div class="card" style="margin: 16px 0;">
          <b>연구원의 무기</b>
          <q>지루하고 반복적인 문서 정리와 초안 작성은 AI에게 맡기고, 신서아 연구원님은 현미경 관찰의 손끝 감각과 최종 판정의 날인에 집중하세요.</q>
        </div>
        <p style="font-size: 15.5px; line-height: 1.8;">
          이제 연구실 컴퓨터를 켜고 가벼운 마음으로 첫 번째 입력 양식을 던져 보세요.<br>
          3일 뒤면 든든한 시니어 조수 한 명이 연구원님 옆에서 일하고 있을 거예요!
        </p>
        <button class="btn open-next" data-go="0" style="margin-top: 20px; font-weight: 800;">⌂ 첫 표지로 돌아가기</button>
      </div>
    </div>` + foot;
  }
}

// 각 쪽의 장면 함수 추출
function sceneFor(p) {
  if (p.type === "main-cover") return MAIN_COVER.scene;
  if (p.type === "chap-intro") return p.ch.coverScene;
  if (p.type === "section") return p.sec.scene;
  if (p.type === "chap-recap") return p.ch.recapScene;
  if (p.type === "book-outro") {
    return typeof p.ch?.recapScene === "function" ? p.ch.recapScene : MAIN_COVER.scene;
  }
  return null;
}

// 페이지 DOM 요소 생성
function makePage(idx) {
  const p = PAGES[idx];
  applyTheme(p);

  const el = document.createElement("section");
  el.className = "page";
  el.innerHTML = pageHTML(p, idx);

  // 내부 이동 링크 연결
  el.querySelectorAll("[data-go]").forEach(b => {
    b.onclick = () => go(+b.dataset.go);
  });

  // 퀴즈 채점 기능
  if (p.type === "section") {
    const q = p.sec.quiz, ans = el.querySelector(".ans");
    el.querySelectorAll(".opts button").forEach(b => {
      b.onclick = () => {
        const k = +b.dataset.k;
        el.querySelectorAll(".opts button").forEach(x => {
          x.disabled = true;
          if (+x.dataset.k === q.answer) x.classList.add("right");
        });
        if (k !== q.answer) b.classList.add("wrong");
        ans.innerHTML = (k === q.answer ? "<b>맞았어요!</b> " : "<b>아쉬워요.</b> ") + q.explain;
        ans.hidden = false;
      };
    });
  }

  return el;
}

// 장면 애니메이션 실행 및 정리
function startScene(el, idx) {
  const box = el.querySelector(".scene"), fn = sceneFor(PAGES[idx]);
  if (!box || !fn) return;
  const run = () => {
    if (el._api) el._api.dispose();
    el._api = makeApi(box);
    try {
      fn(el._api);
    } catch (e) {
      console.error(e);
      box.textContent = "그림을 그리지 못했어요.";
    }
  };
  run();
  const replayBtn = el.querySelector(".replay");
  if (replayBtn) replayBtn.onclick = run;
}

function stopScene(el) {
  if (el && el._api) {
    el._api.dispose();
    el._api = null;
  }
}

// 페이지 넘김 전환 함수
function go(to) {
  if (finishTurn) finishTurn();
  to = Math.max(0, Math.min(PAGES.length - 1, to));
  if (to === cur && book.children.length > 0) return;

  const forward = to >= cur;
  const old = book.querySelector(".page");
  const next = makePage(to);

  if (old) {
    stopScene(old);
    const done = () => {
      old.remove();
      next.classList.remove("turn-in");
      if (finishTurn === done) finishTurn = null;
    };
    finishTurn = done;

    if (forward) {
      book.insertBefore(next, old);
      startScene(next, to);
      old.classList.add("turn-out");
      old.addEventListener("animationend", done, { once: true });
    } else {
      book.appendChild(next);
      next.classList.add("turn-in");
      startScene(next, to);
      next.addEventListener("animationend", done, { once: true });
    }
  } else {
    book.appendChild(next);
    startScene(next, to);
  }

  cur = to;
  sync();
  markRead();

  if (innerWidth <= 900) {
    window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
  }

  // URL 해시 및 위치 저장
  history.replaceState(null, "", `#p${cur + 1}`);
  try { localStorage.setItem(KEY, String(cur)); } catch (e) {}
}

function sync() {
  const countEl = document.getElementById("count");
  if (countEl) countEl.textContent = `${cur + 1} / ${PAGES.length}`;

  const prevBtn = document.getElementById("prev");
  if (prevBtn) prevBtn.disabled = cur === 0;

  const homeBtn = document.getElementById("home");
  if (homeBtn) homeBtn.disabled = cur === 0;

  const nextBtn = document.getElementById("next");
  if (nextBtn) nextBtn.disabled = cur === PAGES.length - 1;

  // 하단 점 네비게이션 생성/동기화 (페이지가 많으므로 주요 챕터 전환점으로 요약)
  const dots = document.getElementById("dots");
  if (dots && dots.children.length === 0) {
    // 챕터별 주요 거점 점들 생성
    const milestonePages = [0];
    CHAPTERS.forEach((ch, ci) => {
      const pIdx = PAGES.findIndex(p => p.type === "chap-intro" && p.ci === ci);
      if (pIdx > 0) milestonePages.push(pIdx);
    });
    milestonePages.push(PAGES.length - 1);

    dots.innerHTML = "";
    milestonePages.forEach(pIdx => {
      const d = document.createElement("button");
      d.setAttribute("aria-label", `${pIdx + 1}쪽으로`);
      d.onclick = () => go(pIdx);
      dots.appendChild(d);
    });
  }

  if (dots) {
    const buttons = dots.children;
    const milestonePages = [0];
    CHAPTERS.forEach((ch, ci) => {
      const pIdx = PAGES.findIndex(p => p.type === "chap-intro" && p.ci === ci);
      if (pIdx > 0) milestonePages.push(pIdx);
    });
    milestonePages.push(PAGES.length - 1);

    for (let i = 0; i < milestonePages.length; i++) {
      const nextM = milestonePages[i + 1] !== undefined ? milestonePages[i + 1] : Infinity;
      const isCur = cur >= milestonePages[i] && cur < nextM;
      if (buttons[i]) buttons[i].classList.toggle("cur", isCur);
    }
  }
}

// 이벤트 핸들러 바인딩
const homeBtn = document.getElementById("home");
if (homeBtn) homeBtn.onclick = () => go(0);

const prevBtn = document.getElementById("prev");
if (prevBtn) prevBtn.onclick = () => go(cur - 1);

const nextBtn = document.getElementById("next");
if (nextBtn) nextBtn.onclick = () => go(cur + 1);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === "PageDown") go(cur + 1);
  if (e.key === "ArrowLeft" || e.key === "PageUp") go(cur - 1);
});

let touchStartX = null;
book.addEventListener("touchstart", e => {
  touchStartX = e.target.closest("canvas") ? null : e.touches[0].clientX;
}, { passive: true });

book.addEventListener("touchend", e => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 70) go(cur + (dx < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

// 시작 위치 복원: URL 해시(#p15) > localStorage > 0(표지)
let startPage = 0;
try {
  const saved = localStorage.getItem(KEY);
  if (saved !== null) startPage = parseInt(saved, 10) || 0;
} catch (e) {}

const hashMatch = location.hash.match(/^#p(\d+)$/);
if (hashMatch) {
  startPage = parseInt(hashMatch[1], 10) - 1;
}

renderShelf();
go(Math.max(0, Math.min(PAGES.length - 1, startPage)));
