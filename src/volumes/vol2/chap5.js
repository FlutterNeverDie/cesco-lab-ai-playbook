export default {
      title: "RAG: 자료를 찾아서 같이 넣기",
      tag: "자료를 검색해 실험대에 올려놓고 답을 쓰게 해요",
      lead: "RAG(검색 증강 생성)는 AI가 사내 문서나 전문 자료를 먼저 검색한 뒤, 그 내용을 실험대에 함께 올려놓고 답변하게 만드는 기술이에요.",
      body: `
<h3>RAG의 세 단계 순서</h3>
<ol class="steps">
  <li><b>검색 (Retrieve)</b><small>사내 규정이나 과거 성적서 중에서 질문과 뜻이 가장 가까운 문서 조각을 찾아요. (4장 임베딩)</small></li>
  <li><b>보강 (Augment)</b><small>찾아낸 문서 조각들을 질문과 함께 AI의 실험대에 올려놓아요. (1장 컨텍스트 창)</small></li>
  <li><b>생성 (Generate)</b><small>AI가 올려진 자료를 꼼꼼히 읽고, 출처 번호를 달아 답을 써요.</small></li>
</ol>

<h3>RAG를 쓰면 무엇이 좋을까요?</h3>
<div class="cards">
  <div class="card"><b>학습 이후의 최신 자료 반영</b>학습 기준일(1권 4장) 이후의 규정도 바로 반영할 수 있어요.</div>
  <div class="card"><b>지어내기(환각)가 줄어요</b>주어진 문서를 보고 답해서 꾸며낼 일이 크게 줄어요. 그래도 0은 아니에요.</div>
  <div class="card"><b>정확한 출처 확인</b><q>성적서 4쪽 표 2에 따라 모발 이물로 추정됩니다. [1]</q>처럼 연구원이 눈으로 검증할 수 있어요.</div>
</div>

<h3>주의할 점도 있어요</h3>
<p>엉뚱한 조각을 찾아오면 답도 틀려요.<br>그래서 <b>출처를 눌러 원본을 확인하는 습관</b>이 중요해요.</p>`,
      lab: "<b>참고문헌을 펼쳐 두고 보고서 쓰기</b>와 같아요. 내 기억에만 의존해 쓰면 규격 번호나 수치가 헷갈릴 수 있죠. 최신 공정 시험기준 문헌을 책상 위에 펴 두고 인용 부호 [1], [2]를 달며 작성하면 성적서의 신뢰도가 훨씬 높아져요.",
      quiz: {
        q: "RAG 방식으로 나온 AI의 답변이 이상할 때, 연구원이 가장 먼저 확인해야 할 곳은 어디일까요?",
        options: ["모니터 전원 플러그","AI가 답변에 인용한 출처 문서 조각이 올바른 내용인지","연구소 의자 높이"], answer: 1,
        explain: "RAG는 찾아온 문서 조각을 읽고 답을 쓰므로, 검색된 출처 조각이 엉뚱하거나 부족하지 않은지 먼저 확인해야 해요.",
      },
      scene(api) {
        const s = api.svg();
        // 1. 질문 카드 (위)
        const qBox = api.n("g", { transform: "translate(20, 20)" }, s);
        api.n("rect", { x: 0, y: 0, width: 160, height: 42, rx: 8, fill: "#fff", stroke: "#0f9b8e", "stroke-width": 1.5 }, qBox);
        api.t("질문: 섬유 이물 판정 기준?", { x: 12, y: 26, "font-size": 11.5, "font-weight": 700, fill: "#0a6b62" }, qBox);

        // 2. 사내 문서함 (오른쪽 위)
        const dbBox = api.n("g", { transform: "translate(240, 20)" }, s);
        api.n("rect", { x: 0, y: 0, width: 140, height: 80, rx: 8, fill: "#f6f4ee", stroke: "#cfcabe" }, dbBox);
        api.t("사내 시험 규격 DB", { x: 70, y: 22, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#6b7280" }, dbBox);
        [-6, 12].forEach(y => {
          api.n("rect", { x: 15, y: y + 36, width: 110, height: 14, rx: 3, fill: "#fff", stroke: "#e4e1d8" }, dbBox);
        });

        // 날아오는 관련 조각 2개
        const docPiece1 = api.n("g", {}, s);
        api.n("rect", { x: -40, y: -12, width: 80, height: 24, rx: 5, fill: "#e3f5ec", stroke: "#1f8a5b", "stroke-width": 1.5 }, docPiece1);
        api.t("문서조각 [1]", { x: 0, y: 4, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#1f8a5b" }, docPiece1);

        const docPiece2 = api.n("g", {}, s);
        api.n("rect", { x: -40, y: -12, width: 80, height: 24, rx: 5, fill: "#e3f5ec", stroke: "#1f8a5b", "stroke-width": 1.5 }, docPiece2);
        api.t("문서조각 [2]", { x: 0, y: 4, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#1f8a5b" }, docPiece2);

        // 3. AI 실험대 (가운데)
        const desk = api.n("g", { transform: "translate(20, 120)" }, s);
        api.n("rect", { x: 0, y: 0, width: 360, height: 60, rx: 10, fill: "#e3f6f3", stroke: "#0f9b8e", "stroke-dasharray": "4 3" }, desk);
        api.t("AI 실험대 (질문 + 검색된 조각이 함께 올라옴)", { x: 180, y: 22, "text-anchor": "middle", "font-size": 11.5, "font-weight": 700, fill: "#0a6b62" }, desk);

        // 4. 최종 답변 카드 (아래)
        const ansBox = api.n("g", { transform: "translate(20, 205)" }, s);
        api.n("rect", { x: 0, y: 0, width: 360, height: 75, rx: 10, fill: "#fff", stroke: "#0f9b8e", "stroke-width": 1.8 }, ansBox);
        api.t("답변: 천연 섬유 혼입으로 판정됩니다.", { x: 16, y: 32, "font-size": 13, "font-weight": 700, fill: "#23272f" }, ansBox);
        // 출처 뱃지
        const b1 = api.n("rect", { x: 16, y: 44, width: 90, height: 20, rx: 4, fill: "#e3f5ec" }, ansBox);
        api.t("[1] 시험규격 p.12", { x: 61, y: 58, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#1f8a5b" }, ansBox);
        const b2 = api.n("rect", { x: 115, y: 44, width: 90, height: 20, rx: 4, fill: "#e3f5ec" }, ansBox);
        api.t("[2] 과거성적서 표3", { x: 160, y: 58, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#1f8a5b" }, ansBox);
        // 문서조각은 실험대·답변 카드보다 위에 그림 (먼저 그리면 실험대 상자 뒤로 숨음)
        s.appendChild(docPiece1);
        s.appendChild(docPiece2);

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          // 조각 검색 및 이동
          const pDoc = seg(t, 1.2, 2.8);
          // 두 조각은 문서함의 서로 다른 줄에서 출발해 실험대 양쪽에 내려앉고, 답변이 나올 때까지 남아 있음 (겹치지 않게)
          const p2 = seg(t, 1.6, 3.2);
          docPiece1.setAttribute("transform", `translate(${300 - 180 * pDoc}, ${44 + 121 * pDoc})`);
          docPiece1.setAttribute("opacity", seg(t, 0.8, 1.2) * out);
          docPiece2.setAttribute("transform", `translate(${320 - 40 * p2}, ${76 + 89 * p2})`);
          docPiece2.setAttribute("opacity", seg(t, 1.2, 1.6) * out);

          // 최종 답변 등장
          const pAns = seg(t, 3.4, 4.4);
          ansBox.setAttribute("opacity", pAns * out);
          ansBox.setAttribute("transform", `translate(20, ${205 + (1 - pAns) * 12})`);
        }, 5);
      },
    };
