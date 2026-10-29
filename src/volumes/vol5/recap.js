recap: {
    title: "5권에서 배운 것",
    points: [
      "<b>멀티모달 AI</b>는 사진도 격자 조각으로 잘라 숫자 토큰처럼 처리해요.",
      "사진 판독은 좋은 가설을 주지만, <b>화학 성분 확정은 FT-IR 기기 분석</b>으로 해요.",
      "업무의 성격에 따라 <b>빠른 경량 모델과 깊이 생각하는 모델</b>을 골라 써요.",
      "AI가 만든 결과물이라도 책임은 <b>검토하고 서명한 사람</b>에게 있어요.",
      "AI는 경쟁자가 아니라 지치지 않는 조수이며, <b>진짜 질문과 판정은 연구원의 몫</b>이에요.",
    ],
    nextLabel: "다음은 특강",
    next: "1권부터 5권까지 AI의 원리, 대화법, 도구, 실무, 앞으로의 모습까지 둘러봤어요. 이어지는 특강에서, AI 에이전트를 우리 팀 방식대로 일하게 만드는 중요한 세 가지 규칙을 알려 드릴게요.",
  },

  recapScene(api) {
    const s = api.svg();
    // 5권의 책이 책장에 꽂히는 모습
    const books = [
      { no: 1, c: "#6d4ae0", t: "원리" },
      { no: 2, c: "#0f9b8e", t: "대화" },
      { no: 3, c: "#e07a1f", t: "도구" },
      { no: 4, c: "#3a9a4a", t: "실무" },
      { no: 5, c: "#3462c9", t: "미래" },
    ];

    // 책장 선반
    api.n("rect", { x: 30, y: 220, width: 340, height: 14, rx: 4, fill: "#b9b4a8" }, s);

    const bookSpines = books.map((b, i) => {
      const g = api.n("g", { transform: `translate(${60 + i * 58}, 220)` }, s);
      api.n("rect", { x: 0, y: -130, width: 44, height: 130, rx: 6, fill: b.c }, g);
      api.n("rect", { x: 4, y: -130, width: 3, height: 130, fill: "rgba(255,255,255,0.3)" }, g);
      api.t(`${b.no}권`, { x: 22, y: -95, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#fff" }, g);
      api.t(b.t, { x: 22, y: -45, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "#fff" }, g);
      return g;
    });

    // 완결 축하 라벨
    const finishLabel = api.t("✦ 5권까지 완독! 다음은 특강이에요 ✦", { x: 200, y: 45, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: "#3462c9", opacity: 0 }, s);

    api.loop(t => {
      t = t % 8;
      bookSpines.forEach((g, idx) => {
        const p = seg(t, 0.3 + idx * 0.4, 0.8 + idx * 0.4);
        g.setAttribute("opacity", p);
        g.setAttribute("transform", `translate(${60 + idx * 58}, ${220}) scale(${0.8 + 0.2 * p}) translate(0, ${(1 - p) * -30})`);
      });

      const pFin = seg(t, 3.2, 4.2);
      finishLabel.setAttribute("opacity", pFin);
    }, 6);
  },
});