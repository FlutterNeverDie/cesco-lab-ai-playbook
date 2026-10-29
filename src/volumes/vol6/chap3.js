export default {
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
    };
