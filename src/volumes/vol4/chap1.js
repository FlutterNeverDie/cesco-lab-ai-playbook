export default {
      title: "오늘 바로 쓰는 AI와 보안 신호등",
      tag: "자료의 성격에 따라 초록, 노랑, 빨강 신호등을 지켜요",
      lead: "사외 일반 AI 서비스에 넣어도 되는 자료와 절대 넣으면 안 되는 자료가 있어요. 보안 신호등 원칙을 먼저 세워요.",
      body: `
<h3>일반 서비스와 사내 승인 도구의 차이</h3>
<p>인터넷에서 바로 쓰는 무료 AI 서비스들은<br>서비스와 설정에 따라 입력한 내용이 <b>AI 학습이나 서비스 개선</b>에 쓰일 수 있어요.</p>
<p>그래서 회사마다 보안 규정이 다르고, <b>회사가 승인한 전용 도구</b>가 따로 있기도 해요. 먼저 회사의 보안 규정을 확인하는 것이 안전해요.</p>

<h3>연구원을 위한 보안 신호등</h3>
<div class="cards">
  <div class="card"><b>초록불 (안전)</b>교과서나 논문에 나오는 일반 과학 지식, 영문 번역, 엑셀 함수 사용법 질문</div>
  <div class="card"><b>노랑불 (주의)</b>고객사명과 시료 번호를 가명 처리한 사내 문서 (회사가 승인한 도구에서만)</div>
  <div class="card"><b>빨간불 (금지)</b>고객사 이름, 미공개 이물 분석 성적서, 원본 검사 데이터, 개인정보</div>
</div>

<h3>가명 처리(마스킹)하는 습관</h3>
<p>AI에게 질문할 때는 고유한 정보를 지우거나 바꾸어 넣어요.<br>"OO식품 안성공장 라인 3" 대신 <b>"식품 제조사 A공장"</b>으로 바꾸는 식이에요.</p>`,
      lab: "<b>시료 외부 반출 규정</b>과 똑같아요. 정밀 분석을 위해 시료를 외부 분석 기관에 보낼 때도 결재를 거치고, 용기 라벨에서 고객사 정보를 지우거나 가명 기호를 쓰잖아요. 사외 AI도 외부 시험 기관처럼 신중하게 다루어야 해요.",
      quiz: {
        q: "사외 일반 AI 서비스에 질문할 때 바로 입력해도 안전한 자료는 무엇일까요?",
        options: ["특정 고객사 납품 이물 분석 성적서 원본 전문","동료 연구원의 이름과 주민등록번호가 적힌 명부","일반적인 플라스틱 재질의 분자 구조와 열분해 특성에 대한 질문"], answer: 2,
        explain: "공개된 과학 지식(초록불)은 안전하지만, 고객사 정보나 미공개 성적서 원문(빨간불)은 사외 AI에 그대로 넣으면 안 돼요.",
      },
      scene(api) {
        const s = api.svg();
        // 신호등 기둥 및 케이스
        api.n("rect", { x: 50, y: 30, width: 70, height: 220, rx: 35, fill: "#23272f" }, s);

        const lights = [
          { color: "#e2483d", label: "빨강: 기밀 · 고객 정보 (금지)", y: 70 },
          { color: "#d9a21b", label: "노랑: 가명 처리 문서 (주의)", y: 140 },
          { color: "#2f9e5b", label: "초록: 일반 과학 지식 (안전)", y: 210 },
        ];

        const lightCircles = lights.map(l => {
          const c = api.n("circle", { cx: 85, cy: l.y, r: 24, fill: l.color, opacity: 0.25 }, s);
          return { c, ...l };
        });

        // 오른쪽 설명 카드들
        const descCards = lights.map((l, idx) => {
          const g = api.n("g", { transform: `translate(145, ${l.y - 20})` }, s);
          api.n("rect", { x: 0, y: 0, width: 235, height: 40, rx: 8, fill: "#fff", stroke: "#e4e1d8" }, g);
          api.n("circle", { cx: 16, cy: 20, r: 6, fill: l.color }, g);
          api.t(l.label.split(":")[0], { x: 30, y: 17, "font-size": 11, "font-weight": 700, fill: "#23272f" }, g);
          api.t(l.label.split(":")[1], { x: 30, y: 31, "font-size": 10, fill: "#6b7280" }, g);
          return g;
        });

        // 떨어지는 시료 카드 애니메이션
        const paper = api.n("g", {}, s);
        api.n("rect", { x: -35, y: -16, width: 70, height: 32, rx: 5, fill: "#fff", stroke: "#23272f", "stroke-width": 1.5 }, paper);
        const paperText = api.t("일반 화학 지식", { x: 0, y: 4, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: "#23272f" }, paper);

        api.loop(t => {
          t = t % 7.5;
          const out = 1 - seg(t, 7.0, 7.4);

          // 순차적으로 신호등 불 켜짐
          const activeIdx = t < 2.5 ? 0 : t < 5.0 ? 1 : 2;
          lightCircles.forEach((lc, idx) => {
            lc.c.setAttribute("opacity", idx === activeIdx ? 1 : 0.25);
          });

          // 카드 이동
          if (activeIdx === 0) {
            paperText.textContent = "고객사 성적서";
            paper.setAttribute("transform", `translate(${260}, ${70})`);
          } else if (activeIdx === 1) {
            paperText.textContent = "가명 처리 시료";
            paper.setAttribute("transform", `translate(${260}, ${140})`);
          } else {
            paperText.textContent = "일반 화학 지식";
            paper.setAttribute("transform", `translate(${260}, ${210})`);
          }
          paper.setAttribute("opacity", out);
        }, 6);
      },
    };
