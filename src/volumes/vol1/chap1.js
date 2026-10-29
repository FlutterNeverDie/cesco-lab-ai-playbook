export default {
      title: "AI, 머신러닝, LLM은 어떤 관계일까요?",
      tag: "큰 동그라미 안에 작은 동그라미가 들어 있어요",
      lead: "AI는 가장 큰 동그라미예요. 그 안에 머신러닝, 그 안에 딥러닝, 가장 안쪽에 우리가 매일 쓰는 LLM이 있어요.",
      body: `
<h3>네 개의 동그라미</h3>
<div class="cards">
  <div class="card"><b>AI 인공지능</b>사람처럼 판단하는 프로그램을 모두 부르는 이름이에요.</div>
  <div class="card"><b>머신러닝</b>규칙 대신 예시를 잔뜩 보여 주면, AI가 스스로 규칙을 찾아요.</div>
  <div class="card"><b>딥러닝</b>뇌의 신경세포를 흉내 낸 신경망을 깊게 쌓은 머신러닝이에요. 4장에서 3D로 봐요.</div>
  <div class="card"><b>LLM 대규모 언어 모델</b>글을 엄청나게 많이 읽은 딥러닝 모델이에요. ChatGPT, Claude, Gemini가 여기 있어요.</div>
</div>
<h3>옛날 AI와 지금 AI</h3>
<p>옛날에는 사람이 규칙을 직접 적었어요.<br>"크기가 2mm보다 크면 경고"처럼요.</p>
<p>지금은 사진 수천 장을 보여 주면,<br>AI가 <b>"머리카락은 이렇게 생겼구나"</b>를 스스로 익혀요.</p>
<h3>생성형 AI는요?</h3>
<p>글이나 그림을 <b>새로 만들어 내는</b> AI를 부르는 말이에요.<br>LLM이 대표적인 생성형 AI예요.</p>`,
      lab: "옛날 AI는 <b>판정 기준표</b>예요. 표에 적힌 기준만 따라가요. 머신러닝은 <b>숙련 연구원</b>이에요. 시료 수천 개를 직접 보면서 기준표에 없는 감까지 익혀요.",
      quiz: {
        q: "ChatGPT나 Claude는 그림의 어느 동그라미에 들어갈까요?",
        options: ["가장 바깥, 규칙을 사람이 적어 준 AI", "가장 안쪽, LLM", "AI가 아니라 그냥 검색 엔진"],
        answer: 1,
        explain: "글을 엄청나게 읽은 딥러닝 모델, 즉 LLM이에요. LLM도 결국 AI의 한 종류라서 바깥 동그라미들 안에 함께 들어 있어요.",
      },
      scene(api) {
        const s = api.svg(), cx = 165, cy = 150;
        const rings = [
          { r: 132, label: "AI 인공지능", op: .10 },
          { r: 100, label: "머신러닝", op: .16 },
          { r: 68, label: "딥러닝", op: .24 },
          { r: 36, label: "LLM", op: 1 },
        ].map((d, i) => {
          const g = api.n("g", {}, s);
          api.n("circle", { cx, cy, r: d.r, fill: api.accent, "fill-opacity": d.op, stroke: api.accent, "stroke-opacity": .5 }, g);
          api.t(d.label, { x: cx, y: i === 3 ? cy + 5 : cy - d.r + 20, "text-anchor": "middle", "font-size": i === 3 ? 15 : 13, "font-weight": 700, fill: i === 3 ? "#fff" : "#3f2a9e" }, g);
          return g;
        });
        const names = ["ChatGPT", "Claude", "Gemini"];
        const chips = names.map((nm, i) => {
          const g = api.n("g", {}, s);
          const y = 95 + i * 55;
          const line = api.n("line", { x1: 318, y1: y, x2: cx + 30, y2: cy, stroke: api.accent, "stroke-width": 1.2, "stroke-dasharray": "3 3" }, g);
          api.n("rect", { x: 318, y: y - 15, width: 74, height: 30, rx: 8, fill: "#fff", stroke: api.accent }, g);
          api.t(nm, { x: 355, y: y + 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "#23272f" }, g);
          return { g, line };
        });
        api.loop(t => {
          t = t % 11;
          const out = 1 - seg(t, 10, 10.8);
          rings.forEach((g, i) => {
            const p = seg(t, 0.3 + i * 0.9, 1.1 + i * 0.9);
            g.setAttribute("opacity", p * out);
            g.setAttribute("transform", `translate(${cx},${cy}) scale(${0.85 + 0.15 * p}) translate(${-cx},${-cy})`);
          });
          chips.forEach(({ g }, i) => {
            const p = seg(t, 4.8 + i * 0.6, 5.6 + i * 0.6);
            g.setAttribute("opacity", p * out);
            g.setAttribute("transform", `translate(${(1 - p) * 40},0)`);
          });
        }, 9);
      },
    };
