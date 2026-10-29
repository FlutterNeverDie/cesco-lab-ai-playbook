export default {
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
    };
