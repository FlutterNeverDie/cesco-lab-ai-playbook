export default {
      title: "토큰: AI는 글을 조각내서 읽어요",
      tag: "예시로 나눈 조각이에요. 실제로는 모델마다 조금씩 다르게 잘라요",
      lead: "AI는 글을 글자 그대로 읽지 않아요. '토큰'이라는 작은 조각으로 자른 뒤, 조각마다 붙은 번호로 바꿔서 읽어요.",
      body: `
<h3>AI가 글을 읽는 순서</h3>
<ol class="steps">
  <li>문장을 <b>자주 쓰이는 조각</b>으로 잘라요.<small>이 조각을 토큰이라고 불러요.</small></li>
  <li>조각마다 AI 사전에 정해진 <b>번호</b>로 바꿔요.</li>
  <li>AI 안에서는 글이 아니라 <b>번호의 줄</b>이 오가요.</li>
</ol>
<h3>토큰을 알아야 하는 이유</h3>
<div class="cards">
  <div class="card"><b>요금</b>AI 서비스 요금은 토큰 수로 계산해요.</div>
  <div class="card"><b>한 번에 넣을 수 있는 양</b>AI가 한 번에 볼 수 있는 분량도 토큰으로 세요. 2권에서 자세히 봐요.</div>
  <div class="card"><b>한국어는 더 잘게</b>같은 내용이어도 한국어는 영어보다 조각이 많이 나오는 편이에요.</div>
</div>`,
      lab: "<b>시료 전처리</b>와 같아요. 큰 시료를 그대로 장비에 넣지 않고, 분석할 수 있는 크기로 자른 뒤 조각마다 <b>번호 라벨</b>을 붙이잖아요. AI도 글을 잘라 번호를 붙여야 분석을 시작할 수 있어요.",
      quiz: {
        q: "AI가 글을 처리하는 기본 단위를 무엇이라고 부를까요?",
        options: ["픽셀", "토큰", "바이트"],
        answer: 1,
        explain: "글을 자른 조각이 토큰이에요. 요금도, 한 번에 넣을 수 있는 양도 토큰으로 세요.",
      },
      scene(api) {
        const s = api.svg();
        const pieces = ["이물", "분석", "결과", "머리", "카락", "으로", "추정", "됩니다"];
        const spaceBefore = [false, true, true, true, false, false, true, false];
        const ids = [48213, 9021, 30117, 15502, 7764, 2210, 41876, 12093];
        const palette = ["#ede6ff", "#ffe9d6", "#dff3ea", "#fde2e7", "#e1edff", "#fff3c4", "#e8e3f7", "#d9f2f5"];
        const cw = 15;
        // 문장 상태 위치
        let x = 0; const sent = pieces.map((p, i) => { if (spaceBefore[i]) x += 7; const px = x; x += p.length * cw; return px; });
        const sw = x, sx0 = 200 - sw / 2;
        // 조각 상태 위치 (두 줄)
        const rows = [pieces.slice(0, 4), pieces.slice(4)];
        const blk = [];
        rows.forEach((row, ri) => {
          const ws = row.map(p => p.length * cw + 20), tot = ws.reduce((a, b) => a + b, 0) + (row.length - 1) * 12;
          let bx = 200 - tot / 2;
          row.forEach((p, k) => { blk.push({ x: bx, y: ri === 0 ? 120 : 200, w: ws[k] }); bx += ws[k] + 12; });
        });
        const title = api.t("AI에 들어온 문장", { x: 200, y: 40, "text-anchor": "middle", "font-size": 13, fill: "#6b7280" }, s);
        const sentBox = api.n("rect", { x: sx0 - 14, y: 62, width: sw + 28, height: 40, rx: 10, fill: "#fff", stroke: "#d8d4c9" }, s);
        const gs = pieces.map((p, i) => {
          const g = api.n("g", {}, s);
          const r = api.n("rect", { x: 0, y: -17, width: blk[i].w, height: 34, rx: 8, fill: palette[i], stroke: api.accent, "stroke-opacity": 0 }, g);
          const tx = api.t(p, { x: 10, y: 6, "font-size": 16, "font-weight": 600, fill: "#23272f" }, g);
          const num = api.t(String(ids[i]), { x: blk[i].w / 2, y: 36, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: api.accent }, g);
          return { g, r, tx, num };
        });
        api.loop(t => {
          t = t % 10;
          const split = seg(t, 1.6, 3.0), nums = seg(t, 3.6, 4.6), out = 1 - seg(t, 9.2, 9.9);
          title.textContent = t < 3.3 ? "AI에 들어온 문장" : t < 4.2 ? "토큰으로 자르기" : "조각마다 번호로 바꾸기";
          sentBox.setAttribute("opacity", (1 - split) * out);
          gs.forEach(({ g, r, tx, num }, i) => {
            const fx = sx0 + sent[i] - 10, fy = 82;
            const px = fx + (blk[i].x - fx) * split, py = fy + (blk[i].y - fy) * split;
            g.setAttribute("transform", `translate(${px},${py})`);
            g.setAttribute("opacity", out);
            r.setAttribute("fill-opacity", split);
            r.setAttribute("stroke-opacity", split * .5);
            num.setAttribute("opacity", nums);
          });
        }, 6);
      },
    };
