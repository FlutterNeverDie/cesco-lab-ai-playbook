export default {
      title: "멀티모달: AI가 사진을 보는 법",
      tag: "사진도 작은 격자 조각으로 잘라 숫자 토큰처럼 읽어요",
      lead: "요즘 AI는 글자뿐 아니라 현미경 사진, 도표, 그래프까지 함께 이해해요. 이런 능력을 '멀티모달'이라고 불러요.",
      body: `
<h3>눈과 귀가 생긴 AI</h3>
<p>글자만 읽던 언어 모델에 시각 능력이 더해졌어요.<br>사진이나 음성처럼 여러 형태의 정보를 한꺼번에 받아들이는 기술을 <b>멀티모달(Multimodal)</b>이라고 해요.</p>

<h3>사진을 숫자로 바꾸는 순서</h3>
<ol class="steps">
  <li>사진을 바둑판 모양의 <b>작은 격자 조각(패치)</b>으로 잘라요.</li>
  <li>조각마다 색상과 명암을 <b>숫자 묶음</b>으로 바꿔요.</li>
  <li>이 숫자 묶음을 1권 2장에서 배운 <b>토큰</b>처럼 글자와 한 줄에 세워 함께 읽어요.</li>
</ol>

<h3>연구실에서 이런 일을 도울 수 있어요</h3>
<div class="cards">
  <div class="card"><b>현미경 관찰 기록 묘사</b>사진 속 이물의 형태와 색상, 대략적인 특징을 글로 설명해 줘요.</div>
  <div class="card"><b>시험 그래프와 표 판독</b>측정 장비 화면이나 논문 속 그래프의 추세를 읽어 줘요.</div>
  <div class="card"><b>사진 속 글자 추출</b>성적서 스캔본이나 라벨 사진에서 글자를 읽어 텍스트로 바꿔 줘요.</div>
</div>`,
      lab: "<b>현미경 관찰 시 육안 소견 기록</b>과 같아요. 연구원이 접안렌즈로 시료를 보고 '무색투명한 선형 섬유, 직경 약 15μm'라고 실험 노트에 스케치하고 글로 적잖아요. AI도 사진의 격자 조각들을 보고 특징을 텍스트로 묘사해 내는 거예요.",
      quiz: {
        q: "멀티모달 AI가 현미경 사진을 이해하는 기본 원리는 무엇일까요?",
        options: ["컴퓨터 화면 안에 작은 돋보기 렌즈가 들어있어서","사진을 작은 바둑판 격자 조각으로 잘라 숫자 토큰처럼 처리한다","사진을 인화해서 종이 무게를 측정한다"], answer: 1,
        explain: "AI는 사진도 작은 격자 조각(패치)들로 쪼갠 뒤 숫자로 변환하여 글자 토큰과 비슷한 방식으로 처리해요.",
      },
      scene(api) {
        const s = api.svg();
        // 1. 현미경 사진 원형 프레임 (왼쪽)
        const photoG = api.n("g", { transform: "translate(40, 50)" }, s);
        api.n("circle", { cx: 60, cy: 60, r: 58, fill: "#fdfcf9", stroke: "#cfcabe", "stroke-width": 2 }, photoG);
        // 섬유 이물 그림 (곡선 라인)
        api.n("path", { d: "M 25 35 Q 60 40 70 85 T 100 95", fill: "none", stroke: "#3462c9", "stroke-width": 4, "stroke-linecap": "round" }, photoG);
        api.t("현미경 시야", { x: 60, y: 135, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#6b7280" }, photoG);

        // 2. 바둑판 격자 분할선
        const gridG = api.n("g", { transform: "translate(40, 50)", opacity: 0 }, s);
        for (let i = 1; i < 4; i++) {
          api.n("line", { x1: i * 30, y1: 0, x2: i * 30, y2: 120, stroke: "#3462c9", "stroke-width": 1, "stroke-dasharray": "2 2" }, gridG);
          api.n("line", { x1: 0, y1: i * 30, x2: 120, y2: i * 30, stroke: "#3462c9", "stroke-width": 1, "stroke-dasharray": "2 2" }, gridG);
        }

        // 3. 날아가는 이미지 토큰 조각들
        const patches = Array.from({ length: 4 }).map((_, i) => {
          const g = api.n("g", {}, s);
          api.n("rect", { x: -14, y: -14, width: 28, height: 28, rx: 4, fill: "#e8eefb", stroke: "#3462c9", "stroke-width": 1.5 }, g);
          api.t(`P${i + 1}`, { x: 0, y: 5, "text-anchor": "middle", "font-size": 10, "font-weight": 700, fill: "#1f3f8a" }, g);
          return g;
        });

        // 4. 오른쪽 AI 입력 큐 (토큰 줄)
        const qG = api.n("g", { transform: "translate(240, 60)" }, s);
        api.n("rect", { x: 0, y: 0, width: 140, height: 160, rx: 10, fill: "#fff", stroke: "#3462c9", "stroke-width": 1.5 }, qG);
        api.t("AI 입력 토큰 줄", { x: 70, y: 24, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#1f3f8a" }, qG);
        api.n("rect", { x: 15, y: 40, width: 110, height: 24, rx: 4, fill: "#f1ecff" }, qG);
        api.t("글자: “이 사진은”", { x: 70, y: 56, "text-anchor": "middle", "font-size": 10, fill: "#3f2a9e" }, qG);

        api.loop(t => {
          t = t % 7.5;
          const out = 1 - seg(t, 7.0, 7.4);

          // 격자 켜짐
          const pGrid = seg(t, 0.8, 1.8);
          gridG.setAttribute("opacity", pGrid * out);

          // 조각들이 오른쪽으로 날아감
          patches.forEach((p, idx) => {
            const pFly = seg(t, 2.0 + idx * 0.4, 3.2 + idx * 0.4);
            const sx = 100, sy = 110;
            const tx = 270, ty = 145 + (idx % 2) * 35;
            p.setAttribute("transform", `translate(${sx + (tx - sx) * pFly}, ${sy + (ty - sy) * pFly})`);
            p.setAttribute("opacity", (pFly > 0 ? 1 : 0) * out);
          });
        }, 5);
      },
    };
