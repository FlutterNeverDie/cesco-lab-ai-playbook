export default {
      title: "앞으로의 연구원, 그리고 시리즈 정리",
      tag: "질문을 던지고 판정하는 진짜 주인공은 연구원이에요",
      lead: "AI가 발전할수록 좋은 질문을 던지고 결과를 검증하는 인간 연구원의 가치는 더욱 빛나요. 연구실의 지휘자가 되어 보세요.",
      body: `
<h3>AI가 잘하는 것과 사람이 잘하는 것</h3>
<div class="cards">
  <div class="card"><b>AI가 잘하는 일</b>긴 문헌 빨리 읽기, 데이터 서식 정리, 초안 작성</div>
  <div class="card"><b>사람 연구원이 잘하는 일</b>현장의 미세한 이상 신호 포착, 창의적인 가설과 질문 설계, 손끝의 시험 감각, 그리고 최종 판정</div>
</div>

<h3>AI는 보조원, 나는 책임자</h3>
<p>AI는 연구원의 자리를 빼앗는 적이 아니에요.<br>귀찮고 번거로운 작업을 대신 맡아 주는 <b>지치지 않는 든든한 실험 보조원</b>이에요.</p>

<h3>내일부터 연구실에서 시도할 3가지</h3>
<ol class="steps">
  <li><b>사소한 호기심부터 물어보세요.</b><small>성적서 한 문장 다듬기부터 가볍게 시작해요.</small></li>
  <li><b>AI에게 반론과 검증을 요구하세요.</b><small>"틀린 부분이 없는지 다시 짚어 줘"라고 점검시켜요.</small></li>
  <li><b>비판적인 연구자의 눈을 유지하세요.</b><small>결과의 주인공이자 책임자는 언제나 연구원 자신이에요.</small></li>
</ol>`,
      lab: "<b>신형 전자동 분석 장비의 도입</b>과 같아요. 자동 시료 주입기와 컴퓨터가 달린 신형 장비가 들어와도, 어떤 시료를 어떤 조건으로 분석할지 기획하고 피크의 진짜 의미를 해석하는 주인공은 언제나 연구원인 것과 같아요.",
      quiz: {
        q: "AI 기술이 고도화될수록 이물 분석 연구원에게 더욱 중요해지는 핵심 역량은 무엇일까요?",
        options: ["하루 종일 엑셀 수식을 손으로 베껴 쓰는 능력","명확한 가설과 질문을 던지고, AI의 결과를 비판적으로 검증하여 최종 판정하는 전문성","모든 컴퓨터의 사용을 거부하는 고집"], answer: 1,
        explain: "단순 반복 업무는 AI가 돕더라도, 실험 설계와 현장 감각, 결과에 대한 비판적 검증과 판정은 인간 연구원만의 고유한 강점이에요.",
      },
      scene(api) {
        const s = api.svg();
        // 1~5권의 상징 심볼들이 모여 별자리 네트워크를 이룸
        const symbols = [
          { name: "1권: 원리", x: 70, y: 70 },
          { name: "2권: 대화", x: 330, y: 70 },
          { name: "3권: 도구", x: 60, y: 190 },
          { name: "4권: 실무", x: 340, y: 190 },
          { name: "5권: 미래", x: 200, y: 230 },
        ];

        // 연결 네트워크 선들
        symbols.forEach((a, i) => {
          symbols.forEach((b, j) => {
            if (i < j) {
              api.n("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: "#3462c9", "stroke-width": 1.2, "stroke-dasharray": "3 3", opacity: 0.35 }, s);
            }
          });
        });

        // 중앙의 연구원 코어
        api.n("circle", { cx: 200, cy: 130, r: 42, fill: api.accent }, s);
        api.t("지휘자", { x: 200, y: 126, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: "#fff" }, s);
        api.t("연구원", { x: 200, y: 144, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: "#e8eefb" }, s);

        // 주변 노드들
        const nodeEls = symbols.map(sym => {
          const g = api.n("g", { transform: `translate(${sym.x}, ${sym.y})` }, s);
          api.n("circle", { cx: 0, cy: 0, r: 24, fill: "#fff", stroke: api.accent, "stroke-width": 2 }, g);
          api.t(sym.name.split(":")[0], { x: 0, y: -2, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: "#1f3f8a" }, g);
          api.t(sym.name.split(":")[1], { x: 0, y: 11, "text-anchor": "middle", "font-size": 9.5, "font-weight": 600, fill: "#23272f" }, g);
          return g;
        });

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          nodeEls.forEach((g, i) => {
            const a = seg(t, 0.4 + i * 0.4, 0.9 + i * 0.4);
            g.setAttribute("opacity", a * out);
          });
        }, 5);
      },
    };
