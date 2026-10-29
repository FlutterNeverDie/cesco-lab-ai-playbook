export default {
      title: "AI가 그럴듯하게 틀리는 이유",
      tag: "왼쪽은 자료 없이, 오른쪽은 자료를 함께 줬을 때예요",
      lead: "LLM은 '사실'을 찾아오는 게 아니라 '그럴듯한 다음 조각'을 골라요. 그래서 모르는 것도 자신 있게 지어낼 수 있어요. 이걸 환각이라고 불러요.",
      body: `
<h3>그럴듯한 것과 사실은 달라요</h3>
<p>LLM은 <b>그럴듯한 말</b>을 이어 붙여요. (3장)<br>그런데 그럴듯하다고 사실인 건 아니에요.</p>
<p>그래서 없는 논문 제목이나 틀린 규격 번호를<br>아주 자연스럽게 말할 때가 있어요.</p>
<p>이걸 <b>환각(hallucination)</b>이라고 해요.<br>말투가 자신 있어도 틀릴 수 있어요.</p>
<h3>환각을 줄이는 네 가지</h3>
<div class="cards">
  <div class="card"><b>자료를 같이 주기</b>2권에서 자세히 배워요.<q>이 보고서를 보고 답해 줘</q></div>
  <div class="card"><b>출처를 달라고 하기</b><q>몇 쪽에 있는지도 알려 줘</q></div>
  <div class="card"><b>모르면 모른다고 하게 하기</b><q>자료에 없으면 없다고 해 줘</q></div>
  <div class="card"><b>중요한 숫자는 원본으로 확인하기</b>4권에서 자세히 봐요.</div>
</div>`,
      lab: "측정을 하지 않고 <b>'이 정도 나왔을 거야'</b>라고 성적서를 쓰는 것과 같아요. 문장은 그럴듯해도 원 데이터가 없죠. 성적서에 원 데이터를 붙이듯, AI 답에도 <b>근거</b>를 붙이게 해야 해요.",
      quiz: {
        q: "환각을 줄이는 데 가장 도움이 되는 방법은요?",
        options: ["더 자신 있게 대답하라고 하기", "근거 자료를 함께 주고, 출처를 확인하기", "같은 질문을 크게 여러 번 하기"],
        answer: 1,
        explain: "자료를 함께 주면 AI가 그 안에서 답을 찾고, 출처가 있으면 사람이 바로 확인할 수 있어요.",
      },
      scene(api) {
        const s = api.svg();
        const panel = (x0, title, good) => {
          const g = api.n("g", {}, s);
          api.n("rect", { x: x0, y: 14, width: 180, height: 272, rx: 12, fill: "#fff", stroke: "#e4e1d8" }, g);
          api.t(title, { x: x0 + 90, y: 36, "text-anchor": "middle", "font-size": 12.5, "font-weight": 700, fill: good ? "#1f8a5b" : "#c2410c" }, g);
          // 질문 말풍선
          api.n("rect", { x: x0 + 12, y: 50, width: 156, height: 46, rx: 10, fill: "#f1ecff" }, g);
          api.t("작년 이물 신고는", { x: x0 + 22, y: 69, "font-size": 12.5, fill: "#3f2a9e" }, g);
          api.t("몇 건이었어?", { x: x0 + 22, y: 86, "font-size": 12.5, fill: "#3f2a9e" }, g);
          // AI 동그라미
          api.n("circle", { cx: x0 + 90, cy: 136, r: 20, fill: api.accent }, g);
          api.t("AI", { x: x0 + 90, y: 141, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#fff" }, g);
          const doc = api.n("g", {}, g);
          if (good) {
            api.n("rect", { x: -16, y: -20, width: 32, height: 40, rx: 4, fill: "#fff", stroke: "#1f8a5b", "stroke-width": 1.5 }, doc);
            [-10, -3, 4, 11].forEach(y => api.n("line", { x1: -10, x2: 10, y1: y, y2: y, stroke: "#9fd6bd", "stroke-width": 2 }, doc));
            api.t("보고서", { x: 0, y: 34, "text-anchor": "middle", "font-size": 10.5, fill: "#1f8a5b" }, doc);
          }
          // 답 말풍선
          const ans = api.n("g", {}, g);
          api.n("rect", { x: x0 + 12, y: 172, width: 156, height: 54, rx: 10, fill: "#f6f4ee", stroke: "#e4e1d8" }, ans);
          api.t(good ? "1,187건이에요." : "약 1,240건이에요.", { x: x0 + 22, y: 194, "font-size": 13.5, "font-weight": 700, fill: "#23272f" }, ans);
          api.t(good ? "(보고서 3쪽 표 2)" : "(어디서 나온 숫자인지 없음)", { x: x0 + 22, y: 213, "font-size": 11, fill: "#6b7280" }, ans);
          // 도장
          const stamp = api.n("g", {}, g);
          api.n("rect", { x: -52, y: -16, width: 104, height: 32, rx: 6, fill: "none", stroke: good ? "#1f8a5b" : "#c2410c", "stroke-width": 2.5 }, stamp);
          api.t(good ? "근거 있음 ✓" : "확인 불가 ✗", { x: 0, y: 6, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: good ? "#1f8a5b" : "#c2410c" }, stamp);
          return { doc, ans, stamp, x0 };
        };
        const L = panel(12, "자료 없이 물어보면", false), R = panel(208, "자료를 같이 주면", true);
        api.loop(t => {
          t = t % 10;
          const out = 1 - seg(t, 9.2, 9.9);
          // 오른쪽: 보고서가 AI로 들어감
          const d = seg(t, 0.6, 1.8);
          R.doc.setAttribute("transform", `translate(${R.x0 + 150 - 60 * d},${120 + 16 * d}) scale(${1 - 0.5 * d})`);
          R.doc.setAttribute("opacity", (1 - seg(t, 1.8, 2.2)) * out);
          [L, R].forEach((P, i) => {
            const a = seg(t, 2.2 + i * 0.5, 3.0 + i * 0.5);
            P.ans.setAttribute("opacity", a * out);
            P.ans.setAttribute("transform", `translate(0,${(1 - a) * 10})`);
            const st = seg(t, 4.2 + i * 0.8, 4.6 + i * 0.8);
            P.stamp.setAttribute("opacity", st * out);
            P.stamp.setAttribute("transform", `translate(${P.x0 + 90},256) rotate(-8) scale(${1.6 - 0.6 * st})`);
          });
        }, 6);
      },
    };
