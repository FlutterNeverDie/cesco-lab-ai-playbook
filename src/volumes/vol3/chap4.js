export default {
      title: "여러 에이전트와 사람의 확인",
      tag: "되돌리기 어려운 중요한 결정은 사람이 승인해요",
      lead: "복잡한 업무는 여러 에이전트가 역할을 나누어 함께 처리해요. 그리고 되돌리기 어려운 결정 앞에는 반드시 사람의 승인 관문을 두어요.",
      body: `
<h3>혼자 하지 않고 팀을 이뤄요</h3>
<p>한 AI에게 너무 많은 일을 한꺼번에 맡기면 실수가 잦아져요.<br>그래서 요즘은 <b>역할을 나눈 여러 에이전트</b>가 협력해요.</p>
<div class="cards">
  <div class="card"><b>팀장 에이전트</b>업무를 쪼개어 적절한 담당자에게 나누어 줘요.</div>
  <div class="card"><b>조사 · 분석 에이전트</b>성적서를 검색하고 데이터를 표로 정리해요.</div>
  <div class="card"><b>검토 에이전트</b>작성된 초안에 누락이나 오차가 없는지 꼼꼼히 검증해요.</div>
</div>

<h3>사람의 승인 관문 (Human in the loop)</h3>
<p>이메일 외부 발송, 파일 영구 삭제, 성적서 최종 발송처럼 <b>되돌릴 수 없는 중요한 행동</b>은 AI가 마음대로 실행하지 못하게 막아요.</p>
<p>AI는 초안만 올려두고 대기하며, <b>연구원이 내용을 검토한 뒤 도장을 쾅 찍어야만</b> 다음 단계로 넘어가도록 설계해요.</p>`,
      lab: "<b>시험 성적서 다단계 결재 라인</b>과 똑같아요. 분석 담당 연구원이 성적서 초안을 쓰고 선임 연구원이 재검토하죠. 하지만 고객사에 나가기 전에는 반드시 <b>부서장의 최종 서명 날인</b>이 있어야만 성적서가 밖으로 나갈 수 있잖아요.",
      quiz: {
        q: "에이전트 시스템을 설계할 때 반드시 사람의 승인 관문을 두어야 하는 작업은?",
        options: ["사내 규정 문서에서 특정 단어를 검색할 때","고객사로 공식 성적서 메일을 발송하거나 원본 데이터를 지울 때","보고서 글자 크기를 조절할 때"], answer: 1,
        explain: "되돌릴 수 없거나 법적, 사업적으로 중요한 결정은 반드시 사람의 최종 확인과 승인을 거치게 해야 안전해요.",
      },
      scene(api) {
        const s = api.svg();
        // 1. 팀장 에이전트 (위)
        const leadG = api.n("g", { transform: "translate(200, 36)" }, s);
        api.n("circle", { cx: 0, cy: 0, r: 22, fill: api.accent }, leadG);
        api.t("팀장", { x: 0, y: 5, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#fff" }, leadG);

        // 2. 하위 팀원 에이전트 3명
        const roles = ["자료 조사", "데이터 정리", "초안 검토"];
        const subs = roles.map((r, i) => {
          const x = 70 + i * 130;
          const g = api.n("g", { transform: `translate(${x}, 115)` }, s);
          api.n("circle", { cx: 0, cy: 0, r: 18, fill: "#fdf0e3", stroke: api.accent, "stroke-width": 1.5 }, g);
          api.t(r, { x: 0, y: 4, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: "#9a4d0b" }, g);
          // 연결선
          api.n("line", { x1: 200, y1: 58, x2: x, y2: 97, stroke: "#d8d4c9", "stroke-width": 1.5, "stroke-dasharray": "3 3" }, s);
          return g;
        });

        // 3. 서류 합쳐짐
        const report = api.n("g", { transform: "translate(200, 185)" }, s);
        api.n("rect", { x: -50, y: -16, width: 100, height: 32, rx: 6, fill: "#fff", stroke: "#cfcabe" }, report);
        api.t("성적서 초안", { x: 0, y: 4, "text-anchor": "middle", "font-size": 11.5, "font-weight": 700, fill: "#23272f" }, report);

        // 4. 사람 승인 관문 (도장)
        const gate = api.n("g", { transform: "translate(200, 245)" }, s);
        api.n("rect", { x: -80, y: -18, width: 160, height: 36, rx: 8, fill: "#e3f5ec", stroke: "#1f8a5b", "stroke-width": 2 }, gate);
        const stamp = api.t("사람 승인 완료 ✓ (발송)", { x: 0, y: 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 800, fill: "#1f8a5b" }, gate);

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          // 업무 하달
          const pSub = seg(t, 0.5, 1.8);
          subs.forEach((g, idx) => {
            g.setAttribute("opacity", pSub * out);
          });

          // 보고서 초안으로 합쳐짐
          const pRep = seg(t, 2.2, 3.4);
          report.setAttribute("opacity", pRep * out);
          report.setAttribute("transform", `translate(200, ${160 + pRep * 25})`);

          // 사람 승인 도장 쾅
          const pStamp = seg(t, 4.0, 4.8);
          gate.setAttribute("opacity", pStamp * out);
          gate.setAttribute("transform", `translate(200, 245) scale(${1.4 - 0.4 * pStamp})`);
        }, 5);
      },
    };
