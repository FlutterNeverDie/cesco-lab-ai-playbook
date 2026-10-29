export default {
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
    };
