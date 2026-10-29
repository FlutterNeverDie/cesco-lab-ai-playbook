export default {
      title: "이물 사진 판독에 쓰기, 그리고 한계",
      tag: "겉모습은 좋은 가설이지만, 확정은 정밀 기기 분석으로 해요",
      lead: "AI는 사진만 보고 성분을 100% 확정할 수 없어요. 시각적 환각이 존재하므로 FT-IR 같은 화학적 기기 분석이 반드시 필요해요.",
      body: `
<h3>AI 사진 판독을 쓰기 좋은 곳</h3>
<p>과거에 쌓인 수만 장의 현미경 사진 중에서<br><b>"지금 이 시료와 가장 닮은 과거 사례"</b>를 검색할 때 아주 유용해요.</p>
<p>관찰 소견서의 초안을 빠르게 잡거나, 1차 의심 물질 후보군을 추릴 때 좋은 도우미가 될 수 있어요.</p>

<h3>하지만 치명적인 한계가 있어요</h3>
<div class="cards">
  <div class="card"><b>시각적 환각</b>나일론 섬유와 동물 털처럼 겉모습이 비슷한 물질을 엉뚱하게 단정할 수 있어요.</div>
  <div class="card"><b>질감과 물리적 성질 부재</b>사진만으로는 시료의 탄성, 경도, 끈적임, 굴절률을 전혀 알 수 없어요.</div>
  <div class="card"><b>배율 오인</b>스케일 바(크기 막대)를 잘못 읽어 크기 수치를 지어낼 위험이 있어요.</div>
</div>

<h3>기기 분석을 대체할 수 없어요</h3>
<p>겉모습은 <b>'가설'</b>일 뿐이에요. 최종 성적서에는 반드시 <b>FT-IR 적외선 분광 분석이나 SEM-EDS 성분 분석</b>을 거쳐 물질명을 확정해야 해요.</p>`,
      lab: "<b>육안 관찰과 기기 분석의 차이</b>와 같아요. 현미경으로 보고 '포장 비닐 조각 같네'라고 추정할 수는 있어도, 그것이 PE인지 PP인지 PVC인지는 FT-IR 스펙트럼 피크를 찍어봐야만 알 수 있잖아요. AI의 눈도 훌륭한 육안 관찰일 뿐, 기기 분석을 대신할 수 없어요.",
      quiz: {
        q: "AI가 현미경 사진을 보고 '이 시료는 99% 폴리에스터 섬유입니다'라고 판독했을 때, 연구원의 올바른 대응은?",
        options: ["AI가 99%라고 확신했으니 기기 분석 없이 그대로 성적서를 발행한다","사진 파일을 삭제한다","참고 가설로만 삼고, FT-IR 등 정밀 기기 분석을 통해 실제 성분을 확정한다"], answer: 2,
        explain: "사진 겉모습만으로는 화학 성분을 확정할 수 없으며 시각적 환각이 존재하므로, 기기 분석을 통한 검증이 반드시 필요해요.",
      },
      scene(api) {
        const s = api.svg();
        // 1. AI 판독 추정 (왼쪽)
        const leftG = api.n("g", { transform: "translate(30, 45)" }, s);
        api.n("rect", { x: 0, y: 0, width: 155, height: 160, rx: 8, fill: "#fff", stroke: "#cfcabe" }, leftG);
        api.t("AI 사진 간이 판독", { x: 77, y: 24, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#6b7280" }, leftG);

        api.n("rect", { x: 12, y: 40, width: 131, height: 40, rx: 5, fill: "#e8eefb" }, leftG);
        api.t("추정: 나일론 섬유", { x: 20, y: 58, "font-size": 11, "font-weight": 700, fill: "#1f3f8a" }, leftG);
        api.t("확신도 98% (겉모양)", { x: 20, y: 72, "font-size": 9.5, fill: "#3462c9" }, leftG);

        const warnMsg = api.t("⚠ 시각적 환각 주의!", { x: 77, y: 115, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#c2410c" }, leftG);
        api.t("(겉모습만으로 확정 불가)", { x: 77, y: 130, "text-anchor": "middle", "font-size": 9.5, fill: "#6b7280" }, leftG);

        // 2. FT-IR 기기 분석 확정 (오른쪽)
        const rightG = api.n("g", { transform: "translate(215, 45)" }, s);
        api.n("rect", { x: 0, y: 0, width: 155, height: 160, rx: 8, fill: "#fff", stroke: "#1f8a5b", "stroke-width": 1.5 }, rightG);
        api.t("FT-IR 스펙트럼 분석", { x: 77, y: 24, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#1f8a5b" }, rightG);

        // 스펙트럼 파형 그래프
        api.n("path", { d: "M 15 90 L 40 90 L 50 55 L 60 90 L 85 90 L 95 40 L 105 90 L 140 90", fill: "none", stroke: "#1f8a5b", "stroke-width": 2 }, rightG);
        api.t("화학 성분 지문 일치율 99%", { x: 77, y: 115, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: "#1f8a5b" }, rightG);

        // 최종 성적서 확정 도장
        const stamp = api.n("g", { transform: "translate(77, 142)" }, rightG);
        api.n("rect", { x: -50, y: -10, width: 100, height: 20, rx: 4, fill: "#e3f5ec", stroke: "#1f8a5b" }, stamp);
        api.t("성분 최종 확정 ✓", { x: 0, y: 4, "text-anchor": "middle", "font-size": 10, "font-weight": 800, fill: "#1f8a5b" }, stamp);

        api.loop(t => {
          t = t % 7;
          const out = 1 - seg(t, 6.4, 6.9);
          const pR = seg(t, 1.8, 3.2);
          rightG.setAttribute("opacity", pR * out);
          rightG.setAttribute("transform", `translate(215, ${45 + (1 - pR) * 12})`);
        }, 4);
      },
    };
