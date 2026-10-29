(() => {
// 6권(특강) 공통 색: 지침은 파랑, 스킬은 초록, 검증은 주황 - 모든 그림에서 같은 색
const HOOK = "#3462c9", GUIDE = "#1f8a5b", HARN = "#d9622b", BAD = "#d64545";
const INK = "#23272f", MUTED = "#6b7280", LINE = "#e4e1d8", PAPER = "#f6f4ee";

// 그림 부품
const bot = (api, p, x, y, r = 22, fill = api.accent) => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("circle", { r, fill }, g);
  api.t("AI", { y: r * 0.24, "text-anchor": "middle", "font-size": r * 0.6, "font-weight": 800, fill: "#fff" }, g);
  return g;
};
const person = (api, p, x, y, c = MUTED, label = "나") => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("circle", { cy: -24, r: 10, fill: c }, g);
  api.n("rect", { x: -15, y: -11, width: 30, height: 30, rx: 12, fill: c }, g);
  if (label) api.t(label, { y: 36, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: INK }, g);
  return g;
};
const pill = (api, p, x, y, text, c, fs = 10.5, fill = "#fff") => {
  const g = api.n("g", {}, p);
  const w = [...text].length * fs * 0.92 + 18;
  api.n("rect", { x: x - w / 2, y: y - 12, width: w, height: 24, rx: 12, fill, stroke: c, "stroke-width": 1.5 }, g);
  const tx = api.t(text, { x, y: y + fs * 0.36, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: fill === "#fff" ? c : "#fff" }, g);
  g.label = tx;
  return g;
};
const lerp = (a, b, p) => a + (b - a) * p;

BOOKS.push({
  no: 6,
  badge: "특",
  volName: "특강",
  series: "연구원을 위한 AI 그림책",
  kicker: "SPECIAL LECTURE",
  title: "이상훈 특강: AI를 우리 팀 사람으로",
  subtitle: "요즘은 AI를 다시 가르치지 않아도 돼요.<br>지침, 스킬, 검증. 글로 쓴 세 가지 규칙이면 우리 팀 방식대로 일해요.",
  color: { accent: "#b23a6b", ink: "#7d1f47", soft: "#fbe8f0" },
  coverTag: "시작할 때, 하는 중에, 돌려주기 전에",
  recapTag: "특강에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    api.t("모델은 그대로, 규칙은 우리 팀 것으로", { x: 200, y: 44, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: api.accent }, s);
    api.n("line", { x1: 30, y1: 190, x2: 370, y2: 190, stroke: LINE, "stroke-width": 6, "stroke-linecap": "round" }, s);
    api.t("일 맡김", { x: 30, y: 222, "text-anchor": "middle", "font-size": 10.5, fill: MUTED }, s);
    api.t("결과", { x: 370, y: 222, "text-anchor": "middle", "font-size": 10.5, fill: MUTED }, s);
    const gates = [[110, "지침", "System prompt", "일 시작할 때", HOOK], [200, "스킬", "Skill", "일하는 중", GUIDE], [290, "검증", "Harness", "돌려주기 전", HARN]].map(([x, name, en, when, c]) => {
      const card = api.n("g", {}, s);
      api.n("rect", { x: x - 42, y: 80, width: 84, height: 64, rx: 10, fill: "#fff", stroke: c, "stroke-width": 2 }, card);
      api.t(name, { x, y: 104, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: c }, card);
      api.t(en, { x, y: 119, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: c }, card);
      api.t(when, { x, y: 135, "text-anchor": "middle", "font-size": 10, fill: MUTED }, card);
      api.n("line", { x1: x, y1: 144, x2: x, y2: 176, stroke: c, "stroke-width": 2, "stroke-dasharray": "3 3" }, s);
      const ring = api.n("circle", { cx: x, cy: 190, r: 12, fill: "#fff", stroke: c, "stroke-width": 3 }, s);
      return { card, ring, c };
    });
    const ai = bot(api, s, 30, 190, 15);
    const done = pill(api, s, 200, 262, "✓ 우리 팀 방식으로 끝!", api.accent, 11.5);

    const ARRIVE = [1.1, 2.4, 3.7];
    api.loop(t => {
      t = t % 7;
      const out = 1 - seg(t, 6.5, 6.9);
      const x = 30 + 80 * seg(t, 0.3, 1.1) + 90 * seg(t, 1.8, 2.4) + 90 * seg(t, 3.1, 3.7) + 80 * seg(t, 4.4, 5.0);
      ai.setAttribute("transform", `translate(${x}, 190)`);
      ai.setAttribute("opacity", out);
      gates.forEach((g, i) => {
        const lit = seg(t, ARRIVE[i], ARRIVE[i] + 0.2) * out;
        g.ring.setAttribute("fill", lit > 0.5 ? g.c : "#fff");
        g.card.setAttribute("opacity", 0.45 + 0.55 * lit);
      });
      done.setAttribute("opacity", seg(t, 5.0, 5.4) * out);
    }, 5.6);
  },

  chapters: [
    {
      title: "파인튜닝 말고 커스텀",
      tag: "다시 가르치지 않고, 글로 규칙을 쥐여 줘요",
      lead: "AI를 우리 회사에 맞추는 방법은 두 가지예요. 모델 자체를 다시 가르치거나, 똑똑한 모델에게 우리 규칙을 글로 쥐여 주거나요. 요즘은 대부분 두 번째면 충분해요.",
      body: `
<h3>파인튜닝: 모델을 다시 가르치기</h3>
<p>우리 자료로 AI를 한 번 더 학습시키는 걸 <b>파인튜닝(fine-tuning)</b>이라고 해요.<br>자료를 많이 모아야 하고, 전문가와 시간과 돈이 들어요.</p>

<h3>커스텀: 글로 규칙 쥐여 주기</h3>
<p>요즘 모델은 이미 아주 똑똑해요.<br>그래서 다시 가르치기보다, <b>우리 팀 규칙을 글로 적어 주는 것</b>만으로 업무에 맞게 일해요. 이걸 커스텀이라고 불러요.</p>

<h3>규칙은 세 군데에 적어요</h3>
<div class="fig"><svg viewBox="0 0 360 110" role="img" aria-label="일 시작할 때 지침, 일하는 중 스킬, 돌려주기 전 검증">
  <line x1="16" y1="86" x2="344" y2="86" stroke="#d8d3c7" stroke-width="4" stroke-linecap="round"/>
  <rect x="10" y="6" width="100" height="60" rx="9" fill="#fff" stroke="${HOOK}" stroke-width="2"/>
  <text x="60" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="${HOOK}">지침</text>
  <text x="60" y="41" text-anchor="middle" font-size="10" font-weight="700" fill="${HOOK}">System prompt</text>
  <text x="60" y="57" text-anchor="middle" font-size="10.5" fill="${MUTED}">일 시작할 때</text>
  <circle cx="60" cy="86" r="8" fill="${HOOK}"/>
  <rect x="130" y="6" width="100" height="60" rx="9" fill="#fff" stroke="${GUIDE}" stroke-width="2"/>
  <text x="180" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="${GUIDE}">스킬</text>
  <text x="180" y="41" text-anchor="middle" font-size="10" font-weight="700" fill="${GUIDE}">Skill</text>
  <text x="180" y="57" text-anchor="middle" font-size="10.5" fill="${MUTED}">일하는 중</text>
  <circle cx="180" cy="86" r="8" fill="${GUIDE}"/>
  <rect x="250" y="6" width="100" height="60" rx="9" fill="#fff" stroke="${HARN}" stroke-width="2"/>
  <text x="300" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="${HARN}">검증</text>
  <text x="300" y="41" text-anchor="middle" font-size="10" font-weight="700" fill="${HARN}">Harness</text>
  <text x="300" y="57" text-anchor="middle" font-size="10.5" fill="${MUTED}">돌려주기 전</text>
  <circle cx="300" cy="86" r="8" fill="${HARN}"/>
  <text x="16" y="106" font-size="10" fill="${MUTED}">일 맡김</text>
  <text x="344" y="106" text-anchor="end" font-size="10" fill="${MUTED}">결과</text>
</svg></div>
<p>셋 다 <b>AI를 쓰는 사람이 정한 규칙</b>이에요. 다른 점은 AI가 언제 그 규칙을 보느냐예요.<br><small style="color:var(--muted)">도구마다 부르는 이름은 조금씩 달라요. 영어 이름을 알아 두면 다른 자료를 볼 때 바로 찾을 수 있어요.</small></p>`,
      lab: "<b>머리 좋은 신입 연구원</b>이 왔을 때, 대학원에 다시 보내지는 않죠. 대신 출입 규칙을 알려 주고, 선배 노트를 건네고, 성적서 내기 전 검토표를 보여 줘요. 커스텀이 바로 그거예요.",
      quiz: {
        q: "새로 쓰는 AI가 우리 팀 보고서 양식을 따르게 하고 싶어요. 요즘 가장 먼저 해 볼 방법은?",
        options: ["우리 자료로 모델을 처음부터 다시 학습시킨다", "양식과 규칙을 글로 적어 AI에게 쥐여 준다", "AI가 스스로 눈치챌 때까지 계속 써 본다"], answer: 1,
        explain: "요즘 모델은 이미 똑똑해서, 규칙을 글로 적어 주면 대부분 그대로 따라요. 파인튜닝은 그걸로 정말 안 될 때 생각해요.",
      },
      scene(api) {
        const s = api.svg();
        const A = api.accent;
        api.t("파인튜닝", { x: 100, y: 24, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: MUTED }, s);
        api.t("커스텀", { x: 300, y: 24, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: A }, s);
        api.n("line", { x1: 200, y1: 36, x2: 200, y2: 284, stroke: LINE, "stroke-width": 2, "stroke-dasharray": "5 5" }, s);

        // 왼쪽: 모델을 다시 가르치는 중 - 톱니가 돌고, 시계가 돌고, 막대는 느리게
        bot(api, s, 92, 124, 28, "#9ca3af");
        const gear = api.n("g", {}, s);
        api.n("circle", { r: 11, fill: "none", stroke: MUTED, "stroke-width": 4 }, gear);
        for (let i = 0; i < 8; i++) api.n("rect", { x: -3, y: -17, width: 6, height: 7, rx: 1, fill: MUTED, transform: `rotate(${i * 45})` }, gear);
        const clock = api.n("g", { transform: "translate(40, 66)" }, s);
        api.n("circle", { r: 15, fill: "#fff", stroke: MUTED, "stroke-width": 2 }, clock);
        const hand = api.n("line", { x1: 0, y1: 0, x2: 0, y2: -10, stroke: INK, "stroke-width": 2, "stroke-linecap": "round" }, clock);
        [["자료 모으기", 44], ["학습", 100], ["다시 검증", 156]].forEach(([w, x]) => api.t(w, { x, y: 186, "text-anchor": "middle", "font-size": 9, fill: MUTED }, s));
        api.n("rect", { x: 26, y: 196, width: 148, height: 10, rx: 5, fill: LINE }, s);
        const bar = api.n("rect", { x: 26, y: 196, width: 0, height: 10, rx: 5, fill: "#9ca3af" }, s);
        api.t("모델을 다시 가르쳐요", { x: 100, y: 248, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: MUTED }, s);
        api.t("시간, 돈, 전문가가 필요해요", { x: 100, y: 266, "text-anchor": "middle", "font-size": 9.5, fill: "#9ca3af" }, s);

        // 오른쪽: 똑똑한 모델에 규칙 쪽지 세 장
        const me = bot(api, s, 300, 150, 28);
        const notes = [["지침", HOOK, 244, 92], ["스킬", GUIDE, 300, 76], ["검증", HARN, 356, 92]].map(([name, c, x, y]) => {
          const g = api.n("g", {}, s);
          api.n("rect", { x: -26, y: -14, width: 52, height: 28, rx: 5, fill: "#fff", stroke: c, "stroke-width": 2 }, g);
          api.t(name, { y: 4, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: c }, g);
          return { g, x, y };
        });
        const badge = pill(api, s, 300, 208, "우리 팀 사람 ✓", GUIDE, 11);
        api.t("글로 규칙을 쥐여 줘요", { x: 300, y: 248, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: A }, s);
        api.t("오늘 바로 할 수 있어요", { x: 300, y: 266, "text-anchor": "middle", "font-size": 9.5, fill: MUTED }, s);

        api.loop(t => {
          const T = t % 8, out = 1 - seg(T, 7.4, 7.9);
          gear.setAttribute("transform", `translate(132, 98) rotate(${t * 80})`);
          hand.setAttribute("transform", `rotate(${t * 140})`);
          bar.setAttribute("width", 148 * 0.32 * clamp(T / 7.2));
          notes.forEach((n, i) => {
            const p = seg(T, 0.6 + i * 0.7, 1.3 + i * 0.7);
            n.g.setAttribute("transform", `translate(${n.x}, ${lerp(-30, n.y, p)})`);
            n.g.setAttribute("opacity", p * out);
          });
          const glow = seg(T, 3.4, 3.9);
          me.setAttribute("transform", `translate(300, 150) scale(${1 + 0.08 * Math.sin(clamp((T - 3.4) / 0.6) * Math.PI)})`);
          badge.setAttribute("opacity", glow * out);
        }, 6.5);
      },
    },
    {
      title: "지침(System prompt): 일하기 전에 꼭 보는 쪽지",
      tag: "무엇을 시키든, 먼저 이 쪽지를 읽고 시작해요",
      lead: "지침(System prompt)은 AI가 일을 시작할 때마다 먼저 보는 규칙이에요. 출근하면 모니터에 붙어 있는 쪽지 같은 거예요.",
      body: `
<h3>매번, 일하기 전에</h3>
<p>무엇을 시키든 AI는 먼저 지침을 봐요.<br>"아, 이렇게 해야 하는구나" 하고 알고 나서 일을 시작해요. 내가 매번 말하지 않아도 돼요.</p>

<h3>이런 걸 적어요</h3>
<div class="cards">
  <div class="card"><b>말투와 언어</b><q>답은 꼭 한국어로 해 줘.</q></div>
  <div class="card"><b>답하는 순서</b><q>결론부터 말하고, 이유는 그다음에.</q></div>
  <div class="card"><b>일하는 방식</b><q>큰일은 바로 하지 말고, 계획부터 보여 줘.</q></div>
  <div class="card"><b>근거</b><q>공식 문서에 있는 내용으로만 해. 모르면 모른다고 해.</q></div>
</div>

<div class="card"><b>훅(Hooks)이라고도 해요</b>정해진 순간에 자동으로 실행되는 장치를 훅이라고 해요. 일을 시작할 때마다 이 지침을 자동으로 넣어 주도록 훅으로 걸어 두기도 해요.</div>

<h3>짧게, 늘 지킬 것만</h3>
<p>지침에는 <b>어떤 일에든 해당하는 것</b>만 적어요.<br>성적서 쓰는 요령처럼 특정 일에만 필요한 건 다음 장의 스킬로 보내요.</p>`,
      lab: "<b>실험실 문 앞 안내판</b>과 같아요. \"가운, 장갑, 보안경 착용.\" 어떤 실험을 하든 들어갈 때마다 먼저 보고 지키죠. 실험 방법은 거기에 적지 않아요.",
      quiz: {
        q: "다음 중 지침에 적기에 가장 알맞은 것은?",
        options: ["FT-IR 스펙트럼을 읽는 자세한 요령", "이번 달 접수된 성적서 목록", "답은 한국어로, 결론부터 말하기"], answer: 2,
        explain: "지침은 어떤 일을 시키든 늘 지킬 짧은 규칙이에요. 특정 일의 요령은 스킬에, 그때그때 자료는 대화에 넣어요.",
      },
      scene(api) {
        const s = api.svg();
        person(api, s, 62, 214);
        const ask = pill(api, s, 96, 150, "보고서 정리해 줘", INK, 11);
        const ai = bot(api, s, 300, 212, 24);

        // 위에서 떨어지는 쪽지 (지침)
        const note = api.n("g", {}, s);
        api.n("rect", { x: 188, y: 30, width: 196, height: 128, rx: 6, fill: "#fff8d6", stroke: "#e6c84f", "stroke-width": 1.5 }, note);
        api.n("circle", { cx: 286, cy: 30, r: 6, fill: HOOK }, note);
        api.t("지침 · 시작 전 쪽지", { x: 202, y: 54, "font-size": 12, "font-weight": 800, fill: HOOK }, note);
        const ITEMS = ["한국어로 답하기", "결론부터 말하기", "큰일은 계획부터", "공식 문서로만"];
        const checks = ITEMS.map((w, i) => {
          const y = 78 + i * 22;
          api.n("rect", { x: 202, y: y - 11, width: 13, height: 13, rx: 3, fill: "#fff", stroke: HOOK, "stroke-width": 1.5 }, note);
          const ck = api.n("path", { d: `M ${204} ${y - 4} l 3.5 4 l 6 -8`, fill: "none", stroke: HOOK, "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round" }, note);
          api.t(w, { x: 224, y, "font-size": 11, fill: INK }, note);
          return ck;
        });
        const arrow = api.n("path", { d: "M 292 162 L 296 182", stroke: HOOK, "stroke-width": 2, "stroke-dasharray": "3 3", fill: "none" }, s);
        const reply = pill(api, s, 292, 262, "계획부터 보여 드릴게요", HOOK, 11);
        api.t("매번 말 안 해도 돼요", { x: 62, y: 282, "text-anchor": "middle", "font-size": 10, fill: MUTED }, s);

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          ask.setAttribute("opacity", seg(t, 0.3, 0.7) * out);
          const drop = seg(t, 1.3, 1.9);
          note.setAttribute("transform", `translate(0, ${-170 * (1 - drop)})`);
          note.setAttribute("opacity", drop * out);
          arrow.setAttribute("opacity", seg(t, 1.9, 2.1) * out);
          checks.forEach((c, i) => c.setAttribute("opacity", seg(t, 2.3 + i * 0.6, 2.5 + i * 0.6)));
          ai.setAttribute("transform", `translate(300, 212) scale(${1 + 0.06 * Math.sin(seg(t, 4.6, 5.0) * Math.PI)})`);
          reply.setAttribute("opacity", seg(t, 5.0, 5.4) * out);
        }, 6.5);
      },
    },
    {
      title: "스킬(Skill): 일하다 펴 보는 선배 노트",
      tag: "교과서엔 없는 현장 센스를 적어 둬요",
      lead: "스킬(Skill)은 특정 일을 할 때 펴 보는 안내서예요. 메모장 같은 글 파일(md)에 적어 두면, AI가 그 일을 할 때 꺼내 읽어요.",
      body: `
<h3>교과서엔 없는 센스</h3>
<p>운전하는 AI가 있다고 해 봐요. 교통 법규는 AI도 이미 알아요.<br>그런데 <b>"느리게 갈 땐 살짝 비켜서 뒤차를 먼저 보내 준다"</b> 같은 건 법규에 없어요. 길에서 배우는 센스죠.</p>

<h3>회사 일도 그래요</h3>
<p>연차가 쌓여야 아는 것, 우리 팀만 아는 것을 적어요.</p>
<div class="cards">
  <div class="card"><b>성적서 스킬</b><q>고객사가 '벌레'라고 접수해도, 확인 전에는 '이물'이라고 써.</q></div>
  <div class="card"><b>사진 스킬</b><q>이물 사진에는 꼭 눈금자를 같이 넣어.</q></div>
  <div class="card"><b>막힐 때</b><q>판단이 애매하면 멈추고 나에게 물어봐.</q></div>
</div>

<h3>일마다 한 장씩</h3>
<p>지침은 모든 일에, 스킬은 <b>그 일을 할 때만</b> 펴 봐요.<br>AI가 같은 데서 또 막히면 한 줄씩 보태요. 노트가 두꺼워질수록 AI는 연차 높은 직원처럼 일해요.</p>`,
      lab: "<b>장비 옆에 붙은 손때 묻은 메모</b>와 같아요. \"이 장비는 켜고 잠깐 기다려야 값이 안정돼요.\" 설명서엔 없지만 결과를 바꾸는 선배의 한 줄이에요.",
      quiz: {
        q: "다음 중 스킬에 적기에 가장 좋은 것은?",
        options: ["우리 팀만 아는 \"이물 사진엔 눈금자 넣기\" 같은 현장 요령", "어느 교과서에나 나오는 교통 법규", "어떤 일에든 지킬 \"한국어로 답하기\""], answer: 0,
        explain: "스킬은 그 일을 할 때 필요한 현장 센스를 적는 곳이에요. 교과서 내용은 AI가 이미 알고, 모든 일에 지킬 규칙은 지침에 적어요.",
      },
      scene(api) {
        const s = api.svg();
        // 위: 교과서(AI도 앎) vs 선배 노트(현장 센스)
        api.n("rect", { x: 14, y: 22, width: 156, height: 96, rx: 8, fill: PAPER, stroke: "#cfcabe" }, s);
        api.t("교통 법규", { x: 28, y: 46, "font-size": 12, "font-weight": 800, fill: MUTED }, s);
        api.t("신호 지키기", { x: 28, y: 70, "font-size": 10.5, fill: INK }, s);
        api.t("제한 속도 60", { x: 28, y: 90, "font-size": 10.5, fill: INK }, s);
        api.t("AI도 이미 알아요", { x: 28, y: 110, "font-size": 9.5, fill: MUTED }, s);
        api.n("rect", { x: 182, y: 22, width: 204, height: 96, rx: 8, fill: "#eaf6ef", stroke: GUIDE, "stroke-width": 1.5 }, s);
        api.t("스킬 · 현장 센스", { x: 196, y: 46, "font-size": 12, "font-weight": 800, fill: GUIDE }, s);
        const hl = api.n("rect", { x: 190, y: 56, width: 188, height: 20, rx: 4, fill: GUIDE, opacity: 0 }, s);
        api.t("뒤차가 빠르면 살짝 비켜 주기", { x: 196, y: 70, "font-size": 10.5, "font-weight": 700, fill: INK }, s);
        api.t("골목에선 넓은 쪽이 기다리기", { x: 196, y: 92, "font-size": 10.5, fill: MUTED }, s);
        api.t("선배들만 아는 것", { x: 196, y: 110, "font-size": 9.5, fill: MUTED }, s);

        // 아래: 도로 (차선 + 갓길)
        api.n("rect", { x: 0, y: 158, width: 400, height: 68, fill: "#5b5f66" }, s);
        api.n("rect", { x: 0, y: 226, width: 400, height: 22, fill: "#a3a8ae" }, s);
        api.n("line", { x1: 0, y1: 160, x2: 400, y2: 160, stroke: "#f2c94c", "stroke-width": 3 }, s);
        const dash = api.n("line", { x1: 0, y1: 226, x2: 400, y2: 226, stroke: "#fff", "stroke-width": 2.5, "stroke-dasharray": "18 14" }, s);
        const car = (fill, label) => {
          const g = api.n("g", {}, s);
          api.n("rect", { x: -24, y: -12, width: 48, height: 24, rx: 6, fill }, g);
          api.n("rect", { x: 4, y: -9, width: 12, height: 18, rx: 3, fill: "rgba(255,255,255,.55)" }, g);
          if (label) api.t(label, { x: -8, y: 4, "text-anchor": "middle", "font-size": 10, "font-weight": 800, fill: "#fff" }, g);
          return g;
        };
        const link = api.n("path", { d: "M 284 118 L 246 176", stroke: GUIDE, "stroke-width": 2, "stroke-dasharray": "3 3", fill: "none" }, s);
        const back = car("#9ca3af", "");
        const me = car(api.accent, "AI");
        const ok = pill(api, s, 230, 272, "✓ 센스 있게 양보했어요", GUIDE, 11);

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          dash.setAttribute("stroke-dashoffset", t * 60);
          const side = seg(t, 1.6, 2.3) * (1 - seg(t, 4.8, 5.5));
          me.setAttribute("transform", `translate(230, ${193 + 24 * side})`);
          const bx = t < 2.2 ? lerp(-40, 150, seg(t, 0.2, 2.2)) : lerp(150, 460, clamp((t - 2.4) / 2.4));
          back.setAttribute("transform", `translate(${bx}, 193)`);
          back.setAttribute("opacity", out);
          const sense = seg(t, 1.2, 1.6) * (1 - seg(t, 5.2, 5.6));
          hl.setAttribute("opacity", 0.2 * sense);
          link.setAttribute("opacity", sense);
          ok.setAttribute("opacity", seg(t, 3.4, 3.8) * out);
        }, 3.6);
      },
    },
    {
      title: "스킬과 도구를 이으면: 일지와 메일 초안",
      tag: "끝나면 노션에 일지, 메일함에 초안까지",
      lead: "3권의 MCP 기억나요? AI에 도구를 꽂는 공통 포트였죠. 노션, 지메일을 MCP로 이어 두고 스킬에 \"끝나면 이 도구로 이렇게 해\"라고 적어 두면, 일의 마무리까지 맡길 수 있어요.",
      body: `
<h3>예를 들면 이런 스킬</h3>
<div class="card"><b>분석 마무리 스킬</b><q>분석이 끝나면 노션 '업무일지'에 오늘 한 일을 세 줄로 남겨. 그다음 보고 메일 초안을 써서 내 메일함에 넣어 둬. 보내지는 마.</q></div>
<div class="fig"><svg viewBox="0 0 360 64" role="img" aria-label="스킬, 노션 업무일지, 메일 초안, 내가 보내기 순서">
  <defs><marker id="v6arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${MUTED}"/></marker></defs>
  <rect x="4" y="12" width="74" height="40" rx="8" fill="#eaf6ef" stroke="${GUIDE}" stroke-width="1.5"/>
  <text x="41" y="37" text-anchor="middle" font-size="11.5" font-weight="800" fill="${GUIDE}">스킬</text>
  <rect x="96" y="12" width="74" height="40" rx="8" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
  <text x="133" y="30" text-anchor="middle" font-size="11" font-weight="800" fill="${INK}">노션</text>
  <text x="133" y="45" text-anchor="middle" font-size="9.5" fill="${MUTED}">업무일지</text>
  <rect x="188" y="12" width="74" height="40" rx="8" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
  <text x="225" y="30" text-anchor="middle" font-size="11" font-weight="800" fill="${INK}">지메일</text>
  <text x="225" y="45" text-anchor="middle" font-size="9.5" fill="${MUTED}">초안만</text>
  <rect x="280" y="12" width="76" height="40" rx="8" fill="#fbe8f0" stroke="#b23a6b" stroke-width="1.5"/>
  <text x="318" y="37" text-anchor="middle" font-size="11" font-weight="800" fill="#7d1f47">내가 보내기</text>
  <path d="M78 32 H94" stroke="${MUTED}" stroke-width="1.6" marker-end="url(#v6arr)"/>
  <path d="M170 32 H186" stroke="${MUTED}" stroke-width="1.6" marker-end="url(#v6arr)"/>
  <path d="M262 32 H278" stroke="${MUTED}" stroke-width="1.6" marker-end="url(#v6arr)"/>
</svg></div>

<p>도구 연결(MCP)은 <b>설정에서 한 번</b> 해 둬요. 스킬에는 <b>언제, 어떻게 쓸지</b>를 적어요.</p>

<h3>이런 것도 돼요</h3>
<div class="cards">
  <div class="card"><b>금요일 주간 보고</b>한 주의 노션 일지를 모아 주간 보고 초안을 써요.</div>
  <div class="card"><b>회의록 정리</b>메모를 우리 팀 노션 회의록 양식에 맞춰 옮겨요.</div>
  <div class="card"><b>접수 메일 정리</b>새 접수 메일을 읽고 접수표에 한 줄씩 채워요.</div>
</div>

<h3>보내기 버튼은 사람이</h3>
<p>AI에게는 <b>초안까지만</b> 맡겨요. 밖으로 나가는 건 내가 읽고 눌러요.</p>`,
      lab: "<b>막내 연구원의 인수인계서</b>와 같아요. \"분석 끝나면 장비 일지 쓰고, 팀장님께 보낼 메일은 초안으로 올려 둘 것.\" 순서를 적어 두면 누가 맡아도 마무리가 같아요.",
      quiz: {
        q: "스킬에 메일 쓰는 순서를 적을 때 가장 안전한 방법은?",
        options: ["AI가 고객사에 바로 메일을 보내게 한다", "초안까지만 쓰게 하고, 내가 읽고 보낸다", "메일은 위험하니 노션 일지에도 아무것도 남기지 않는다"], answer: 1,
        explain: "기록과 초안은 AI에게 맡기고, 밖으로 나가는 마지막 버튼은 사람이 눌러요. 그래야 실수가 밖으로 새지 않아요.",
      },
      scene(api) {
        const s = api.svg();
        // 스킬 문서
        api.n("rect", { x: 16, y: 20, width: 156, height: 108, rx: 8, fill: "#eaf6ef", stroke: GUIDE, "stroke-width": 1.5 }, s);
        api.t("분석 스킬.md", { x: 30, y: 43, "font-size": 12, "font-weight": 800, fill: GUIDE }, s);
        const hls = [0, 1, 2].map(i => api.n("rect", { x: 22, y: 54 + i * 22, width: 144, height: 19, rx: 4, fill: GUIDE, opacity: 0 }, s));
        ["1. 분석 정리하기", "2. 노션에 업무일지", "3. 메일은 초안만"].forEach((w, i) => api.t(w, { x: 30, y: 68 + i * 22, "font-size": 10.5, fill: INK }, s));
        const ai = bot(api, s, 278, 72, 26);
        api.n("path", { d: "M 172 74 H 248", stroke: GUIDE, "stroke-width": 2, "stroke-dasharray": "3 4" }, s);

        // 연결선 + MCP 꼬리표
        const P1 = [[278, 98], [104, 162]], P2 = [[278, 98], [296, 162]];
        [P1, P2].forEach(([a, b]) => api.n("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: "#cfcabe", "stroke-width": 2.5 }, s));
        pill(api, s, 186, 130, "MCP", MUTED, 9.5);
        pill(api, s, 290, 130, "MCP", MUTED, 9.5);

        // 노션 업무일지
        api.n("rect", { x: 14, y: 162, width: 180, height: 108, rx: 10, fill: "#fff", stroke: INK, "stroke-width": 1.5 }, s);
        api.t("노션 · 업무일지", { x: 28, y: 184, "font-size": 11.5, "font-weight": 800, fill: INK }, s);
        api.t("어제 · 성적서 검토", { x: 28, y: 208, "font-size": 10, fill: MUTED }, s);
        api.n("line", { x1: 24, y1: 216, x2: 184, y2: 216, stroke: LINE }, s);
        const newRowBg = api.n("rect", { x: 22, y: 222, width: 164, height: 22, rx: 4, fill: "#fff6d6", opacity: 0 }, s);
        const newRow = api.t("", { x: 28, y: 237, "font-size": 10, "font-weight": 700, fill: INK }, s);
        const ROW = "오늘 · 이물 분석 3건 정리";

        // 지메일 임시보관함
        api.n("rect", { x: 206, y: 162, width: 180, height: 108, rx: 10, fill: "#fff", stroke: INK, "stroke-width": 1.5 }, s);
        api.t("지메일 · 임시보관함", { x: 220, y: 184, "font-size": 11.5, "font-weight": 800, fill: INK }, s);
        const mail = api.n("g", {}, s);
        api.n("rect", { x: 220, y: 200, width: 34, height: 24, rx: 3, fill: "#fff", stroke: api.accent, "stroke-width": 1.6 }, mail);
        api.n("path", { d: "M 220 201 L 237 214 L 254 201", fill: "none", stroke: api.accent, "stroke-width": 1.6 }, mail);
        api.t("분석 결과 보고", { x: 264, y: 211, "font-size": 10, "font-weight": 700, fill: INK }, mail);
        api.t("초안 · 보내지 않음", { x: 264, y: 227, "font-size": 9, fill: MUTED }, mail);
        const sendBtn = pill(api, s, 330, 252, "내가 보내기", api.accent, 9.5);

        const pk = api.n("circle", { r: 6, fill: api.accent }, s);
        const cap = api.t("초안까지는 AI, 보내기는 나", { x: 200, y: 292, "text-anchor": "middle", "font-size": 11.5, "font-weight": 800, fill: api.accent }, s);

        api.loop(t => {
          t = t % 9;
          const out = 1 - seg(t, 8.4, 8.9);
          hls.forEach((h, i) => { const a = [0.4, 1.8, 4.2][i]; h.setAttribute("opacity", 0.22 * seg(t, a, a + 0.3) * (1 - seg(t, a + 1.4, a + 1.7))); });
          ai.setAttribute("transform", `translate(278, 72) rotate(${t < 1.6 ? Math.sin(t * 9) * 6 : 0})`);
          // 꾸러미: AI → 노션, AI → 메일
          let pos = null;
          if (t > 1.9 && t < 2.7) { const p = seg(t, 1.9, 2.7); pos = [lerp(P1[0][0], P1[1][0], p), lerp(P1[0][1], P1[1][1], p)]; }
          if (t > 4.4 && t < 5.2) { const p = seg(t, 4.4, 5.2); pos = [lerp(P2[0][0], P2[1][0], p), lerp(P2[0][1], P2[1][1], p)]; }
          pk.setAttribute("opacity", pos ? 1 : 0);
          if (pos) { pk.setAttribute("cx", pos[0]); pk.setAttribute("cy", pos[1]); }
          const typed = Math.floor([...ROW].length * clamp((t - 2.7) / 1.2));
          newRow.textContent = [...ROW].slice(0, typed).join("");
          newRow.setAttribute("opacity", out);
          newRowBg.setAttribute("opacity", seg(t, 2.6, 2.9) * out);
          mail.setAttribute("opacity", seg(t, 5.1, 5.5) * out);
          mail.setAttribute("transform", `translate(0, ${8 * (1 - seg(t, 5.1, 5.5))})`);
          sendBtn.setAttribute("opacity", seg(t, 6.0, 6.4) * out);
          cap.setAttribute("opacity", seg(t, 6.4, 6.8) * out);
        }, 7.5);
      },
    },
    {
      title: "검증(Harness): 돌려주기 전 마지막 검사대",
      tag: "자주 하는 실수를 적어 두고, 넘기기 전에 걸러요",
      lead: "검증(Harness)은 AI가 결과물을 나에게 주기 전에 한 번 더 검사하는 단계예요. 자주 나온 실수 목록을 보고, 빠뜨린 게 없는지 걸러 내요.",
      body: `
<div class="card"><b>왜 하네스(Harness)일까요?</b>하네스는 원래 말에 채우는 마구예요. AI에 채워서 엇나가지 않게 잡아 주는 장치라서, 검증 장치를 이렇게 부르기도 해요.</div>

<h3>실수 목록이 곧 검사표</h3>
<p>AI도 같은 실수를 되풀이해요.<br>볼 때마다 한 줄씩 적어 두면 그게 <b>검사표</b>가 돼요.</p>
<div class="cards">
  <div class="card"><b>고객 정보가 그대로 들어갔나?</b>이름, 연락처는 가려서 넘겨요.</div>
  <div class="card"><b>회사 이름과 양식이 맞나?</b>세스코 이름과 우리 팀 공식 양식으로 썼는지 봐요.</div>
  <div class="card"><b>숫자와 단위가 원본과 같나?</b>옮기다 바뀐 숫자가 없는지 맞춰 봐요.</div>
  <div class="card"><b>확인 안 된 걸 사실처럼 썼나?</b>추측이면 추측이라고 적어요.</div>
</div>

<h3>걸리면 고쳐서 다시</h3>
<p>검사에 걸린 건 AI가 고친 뒤 <b>다시 검사</b>해요.<br>통과한 것만 나에게 와요.</p>

<h3>마지막은 여전히 나</h3>
<p>검증은 실수를 크게 줄여 주지만 전부 잡지는 못해요.<br>5권에서 본 것처럼, 마지막 확인과 책임은 사람에게 있어요.</p>`,
      lab: "<b>성적서 발행 전 이중 확인</b>과 같아요. 검토자가 체크리스트를 보며 하나씩 짚고 나서야 서명하죠. 검증은 AI 쪽의 첫 번째 검토자예요.",
      quiz: {
        q: "AI가 보고서에 고객 연락처를 자꾸 그대로 넣어요. 어떻게 하면 좋을까요?",
        options: ["매번 내가 눈으로 찾아 지우는 수밖에 없다", "AI가 알아서 고칠 때까지 기다린다", "검증 목록에 '고객 정보 가리기'를 적어 넘기기 전에 걸러 낸다"], answer: 2,
        explain: "되풀이되는 실수는 검사표에 적어 두면, 넘기기 전에 매번 걸러져요. 그래도 마지막 확인은 내가 해요.",
      },
      scene(api) {
        const s = api.svg();
        // 검사표
        api.n("rect", { x: 104, y: 12, width: 192, height: 76, rx: 8, fill: "#fff", stroke: HARN, "stroke-width": 1.5 }, s);
        const ITEMS = ["고객 정보 가렸나", "회사 이름 · 양식", "숫자 · 단위 원본과 같나"];
        const marks = ITEMS.map((w, i) => {
          const y = 34 + i * 21;
          const m = api.t("□", { x: 118, y, "font-size": 12, "font-weight": 800, fill: MUTED }, s);
          api.t(w, { x: 136, y, "font-size": 10.5, fill: INK }, s);
          return m;
        });
        // 검사대 문 + 벨트
        api.n("rect", { x: 10, y: 200, width: 380, height: 12, rx: 6, fill: "#cfcabe" }, s);
        [40, 100, 160, 240, 300, 360].forEach(x => api.n("circle", { cx: x, cy: 206, r: 3, fill: "#fff" }, s));
        const beam = api.n("rect", { x: 172, y: 116, width: 56, height: 84, fill: HARN, opacity: 0 }, s);
        api.t("검증 (Harness)", { x: 200, y: 106, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: HARN }, s);
        bot(api, s, 36, 160, 20);
        person(api, s, 370, 152);

        // 결과물 문서
        const d = api.n("g", {}, s);
        api.n("rect", { x: -38, y: -40, width: 76, height: 80, rx: 5, fill: "#fff", stroke: INK, "stroke-width": 1.5 }, d);
        const r1 = api.t("고객 홍길동", { x: -30, y: -18, "font-size": 9.5, "font-weight": 700, fill: INK }, d);
        const r2 = api.t("회사명 (빈칸)", { x: -30, y: 2, "font-size": 9.5, "font-weight": 700, fill: INK }, d);
        api.t("이물 2.1mm", { x: -30, y: 22, "font-size": 9.5, fill: INK }, d);
        const f1 = api.n("rect", { x: -34, y: -30, width: 68, height: 17, rx: 3, fill: "none", stroke: BAD, "stroke-width": 2 }, d);
        const f2 = api.n("rect", { x: -34, y: -10, width: 68, height: 17, rx: 3, fill: "none", stroke: BAD, "stroke-width": 2 }, d);
        // 문 기둥은 문서 위에 그려야 '통과'하는 느낌
        api.n("rect", { x: 166, y: 112, width: 8, height: 90, rx: 2, fill: HARN }, s);
        api.n("rect", { x: 226, y: 112, width: 8, height: 90, rx: 2, fill: HARN }, s);
        api.n("rect", { x: 166, y: 112, width: 68, height: 8, rx: 2, fill: HARN }, s);

        const st1 = pill(api, s, 200, 244, "걸렸어요 2건", BAD, 11);
        const st2 = pill(api, s, 200, 244, "고쳐서 다시 검사", HARN, 11);
        const st3 = pill(api, s, 200, 244, "통과 ✓ 이제 나에게", GUIDE, 11);
        api.t("자주 하는 실수를 적어 두고 걸러요", { x: 200, y: 284, "text-anchor": "middle", "font-size": 10.5, fill: MUTED }, s);

        const mark = (m, ch, c) => { m.textContent = ch; m.setAttribute("fill", c); };
        api.loop(t => {
          t = t % 9;
          const out = 1 - seg(t, 8.4, 8.9);
          const x = t < 3 ? lerp(70, 200, seg(t, 0.6, 1.8)) : lerp(200, 296, seg(t, 5.8, 6.8));
          d.setAttribute("transform", `translate(${x}, 160)`);
          d.setAttribute("opacity", seg(t, 0.2, 0.6) * out);
          beam.setAttribute("opacity", (t > 1.8 && t < 5.8 ? 0.12 + 0.12 * Math.sin(t * 8) : 0));
          const caught = t > 2.8, fixed1 = t > 4.2, fixed2 = t > 4.8;
          r1.textContent = fixed1 ? "고객 ●●●" : "고객 홍길동";
          r2.textContent = fixed2 ? "세스코" : "회사명 (빈칸)";
          f1.setAttribute("opacity", caught && !fixed1 ? 1 : 0);
          f2.setAttribute("opacity", caught && !fixed2 ? 1 : 0);
          if (!caught) marks.forEach(m => mark(m, "□", MUTED));
          else {
            mark(marks[0], fixed1 ? "✓" : "✗", fixed1 ? GUIDE : BAD);
            mark(marks[1], fixed2 ? "✓" : "✗", fixed2 ? GUIDE : BAD);
            mark(marks[2], "✓", GUIDE);
          }
          st1.setAttribute("opacity", (t > 2.9 && t < 3.9 ? 1 : 0) * out);
          st2.setAttribute("opacity", (t >= 3.9 && t < 5.6 ? 1 : 0) * out);
          st3.setAttribute("opacity", (t >= 5.6 ? 1 : 0) * out);
        }, 7.6);
      },
    },
    {
      title: "세 가지를 한 번에: 연차가 쌓이는 AI",
      tag: "걸린 실수를 다시 적을수록 AI가 일을 더 잘해요",
      lead: "세 가지를 하루 일로 이어 보면 이래요. 그리고 검증에 걸린 실수를 다시 적어 둘수록, AI는 연차 쌓인 직원처럼 일해요.",
      body: `
<h3>하루 일로 이어 보면</h3>
<ol class="steps">
  <li><b>지침</b><small>"성적서 정리해 줘." 쪽지부터 봐요. 한국어로, 결론부터, 계획 먼저.</small></li>
  <li><b>스킬</b><small>성적서 스킬을 펴요. '벌레' 대신 '이물', 사진엔 눈금자. 끝나면 노션 일지와 메일 초안.</small></li>
  <li><b>검증</b><small>넘기기 전 검사. 고객 정보 가렸나, 세스코 양식인가.</small></li>
  <li><b>나</b><small>읽고 판단하고, 보내기 버튼을 눌러요.</small></li>
</ol>

<h3>고칠수록 단단해져요</h3>
<div class="cards">
  <div class="card"><b>한 번 걸린 실수</b>검증 목록에 한 줄.</div>
  <div class="card"><b>그 일에서 자꾸 나는 실수</b>스킬에 "이렇게 해" 한 줄.</div>
  <div class="card"><b>어떤 일에서든 나는 실수</b>지침으로 올려요.</div>
</div>

<h3>내일 해 볼 세 줄</h3>
<p>처음부터 길게 쓰지 않아도 돼요. <b>지침 한 줄, 스킬 한 장, 검증 항목 한 줄</b>이면 시작이에요.<br>쓰다가 거슬리는 게 생길 때마다 한 줄씩 보태요.</p>`,
      lab: "<b>신입이 3년 차가 되는 과정</b>과 같아요. 첫날엔 출입 규칙, 일하며 선배 노트, 실수할 때마다 검토표. 다른 점은 AI는 적어 둔 걸 매번 처음부터 다시 읽는다는 거예요. 그래서 적어 두는 게 곧 가르치는 거예요.",
      quiz: {
        q: "AI가 결과물을 넘기기 직전에, 자주 하는 실수를 걸러 내는 것은 어느 것일까요?",
        options: ["검증", "지침", "스킬"], answer: 0,
        explain: "지침은 일을 시작할 때, 스킬은 일하는 중에, 검증은 돌려주기 직전에 봐요.",
      },
      scene(api) {
        const s = api.svg();
        const NODES = [["지침", HOOK, 54], ["스킬", GUIDE, 154], ["검증", HARN, 254], ["나", api.accent, 350]];
        NODES.forEach(([name, c, x], i) => {
          api.n("rect", { x: x - 36, y: 40, width: 72, height: 34, rx: 9, fill: "#fff", stroke: c, "stroke-width": 2 }, s);
          api.t(name, { x, y: 62, "text-anchor": "middle", "font-size": 12.5, "font-weight": 800, fill: c }, s);
          if (i < 3) api.n("path", { d: `M ${x + 38} 57 H ${NODES[i + 1][2] - 40}`, stroke: "#cfcabe", "stroke-width": 2 }, s);
        });
        // 되돌림 곡선: 검증 → 스킬 노트
        api.n("path", { d: "M 254 76 Q 250 132 150 168", fill: "none", stroke: BAD, "stroke-width": 1.8, "stroke-dasharray": "4 4" }, s);
        api.t("걸린 실수 → 한 줄 보태기", { x: 254, y: 122, "font-size": 9.5, "font-weight": 700, fill: BAD }, s);

        // 스킬 노트 (줄이 늘어남)
        api.n("rect", { x: 22, y: 168, width: 156, height: 104, rx: 8, fill: "#eaf6ef", stroke: GUIDE, "stroke-width": 1.5 }, s);
        api.t("스킬 노트", { x: 36, y: 190, "font-size": 11.5, "font-weight": 800, fill: GUIDE }, s);
        api.n("rect", { x: 36, y: 202, width: 120, height: 7, rx: 3, fill: "#b9dcc8" }, s);
        const added = [0, 1].map(i => api.n("rect", { x: 36, y: 220 + i * 18, width: 100 - i * 18, height: 7, rx: 3, fill: GUIDE }, s));
        const plus = api.t("+1줄", { x: 150, y: 248, "font-size": 11, "font-weight": 800, fill: GUIDE }, s);

        // 연차
        api.n("rect", { x: 214, y: 168, width: 166, height: 104, rx: 8, fill: "#fff", stroke: LINE, "stroke-width": 1.5 }, s);
        api.t("AI 연차", { x: 228, y: 190, "font-size": 11.5, "font-weight": 800, fill: INK }, s);
        const year = api.t("1년 차", { x: 297, y: 232, "text-anchor": "middle", "font-size": 24, "font-weight": 800, fill: api.accent }, s);
        const segs = [0, 1, 2].map(i => api.n("rect", { x: 230 + i * 46, y: 248, width: 42, height: 8, rx: 4, fill: LINE }, s));

        const dot = bot(api, s, 54, 100, 11);
        const x_ = api.t("✗", { x: 254, y: 30, "text-anchor": "middle", "font-size": 16, "font-weight": 800, fill: BAD }, s);
        const ok = api.t("✓", { x: 350, y: 30, "text-anchor": "middle", "font-size": 16, "font-weight": 800, fill: GUIDE }, s);

        api.loop(t => {
          t = t % 9.6;
          const out = 1 - seg(t, 9.1, 9.5);
          const pass = Math.min(2, Math.floor(t / 3)), lt = t - pass * 3;
          let x = 54 + 100 * seg(lt, 0.2, 0.8) + 100 * seg(lt, 0.9, 1.5);
          const clean = pass === 2;
          if (clean) x += 96 * seg(lt, 1.7, 2.3);
          dot.setAttribute("transform", `translate(${x}, 100)`);
          dot.setAttribute("opacity", out);
          x_.setAttribute("opacity", !clean && lt > 1.5 && lt < 2.6 ? 1 : 0);
          ok.setAttribute("opacity", clean && lt > 2.3 ? out : 0);
          const lines = pass + (!clean && lt > 2.4 ? 1 : 0); // 지금까지 보탠 줄
          added.forEach((a, i) => a.setAttribute("opacity", i < lines ? out : 0));
          plus.setAttribute("opacity", !clean && lt > 2.4 && lt < 3 ? 1 : 0);
          plus.setAttribute("y", 220 + Math.min(1, pass) * 18 + 7);
          year.textContent = `${1 + Math.min(2, lines)}년 차`;
          year.setAttribute("opacity", out);
          segs.forEach((g, i) => g.setAttribute("fill", i <= lines ? api.accent : LINE));
        }, 8.6);
      },
    },
  ],

  recap: {
    title: "특강에서 배운 것",
    points: [
      "요즘은 모델을 다시 학습시키는 <b>파인튜닝</b> 대신, 글로 규칙을 쥐여 주는 <b>커스텀</b>이면 대부분 충분해요.",
      "<b>지침(System prompt)</b>은 일을 시작할 때마다 먼저 보는 쪽지예요. 한국어로, 결론부터, 계획 먼저 같은 늘 지킬 규칙을 적어요. 훅(Hooks)으로 자동으로 넣기도 해요.",
      "<b>스킬(Skill)</b>은 그 일을 할 때 펴 보는 선배 노트예요. 현장 센스와 노션 일지, 메일 초안 같은 마무리까지 적어요.",
      "<b>검증(Harness)</b>은 돌려주기 전 검사대예요. 고객 정보, 회사 이름처럼 자주 하는 실수를 걸러요.",
      "걸린 실수를 다시 적을수록 AI는 <b>연차 쌓인 직원</b>처럼 일해요. 마지막 확인은 여전히 내 몫이에요.",
    ],
    nextLabel: "다음은 실전",
    next: "이제 이 세 가지를 실제 이물 분석 업무에 녹여 볼 차례예요. 실전 편에서 입력 양식, 3개 안, 10분 뒤 고르기로 빠르면 3일 만에 내 일을 자동으로 돌리는 순서를 보여 드릴게요.",
  },

  recapScene(api) {
    const s = api.svg();
    const A = api.accent;
    // 세 장의 쪽지가 '우리 팀 AI 설명서'로 묶여요
    const binder = api.n("g", {}, s);
    api.n("rect", { x: 110, y: 96, width: 120, height: 156, rx: 10, fill: A }, binder);
    api.n("rect", { x: 110, y: 96, width: 14, height: 156, rx: 4, fill: "rgba(0,0,0,.15)" }, binder);
    [124, 174, 224].forEach(y => api.n("circle", { cx: 117, cy: y, r: 4, fill: "#fff" }, binder));
    api.t("우리 팀", { x: 176, y: 158, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: "#fff" }, binder);
    api.t("AI 설명서", { x: 176, y: 180, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: "#fff" }, binder);
    const bands = [["지침", HOOK], ["스킬", GUIDE], ["검증", HARN]].map(([name, c], i) => {
      const g = api.n("g", {}, s);
      api.n("rect", { x: -30, y: -15, width: 60, height: 30, rx: 6, fill: "#fff", stroke: c, "stroke-width": 2 }, g);
      api.t(name, { y: 5, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: c }, g);
      return { g, from: [70 + i * 130, 46], to: [262, 120 + i * 44] };
    });
    const done = pill(api, s, 200, 278, "✓ 이제 우리 팀 사람", GUIDE, 12);
    api.loop(t => {
      t = t % 7;
      const out = 1 - seg(t, 6.5, 6.9);
      binder.setAttribute("opacity", seg(t, 0.1, 0.5) * out);
      bands.forEach((b, i) => {
        const p = seg(t, 0.8 + i * 0.7, 1.6 + i * 0.7);
        b.g.setAttribute("transform", `translate(${lerp(b.from[0], b.to[0], p)}, ${lerp(b.from[1], b.to[1], p)})`);
        b.g.setAttribute("opacity", seg(t, 0.4 + i * 0.7, 0.8 + i * 0.7) * out);
      });
      done.setAttribute("opacity", seg(t, 3.6, 4.0) * out);
    }, 5);
  },
});
})();
