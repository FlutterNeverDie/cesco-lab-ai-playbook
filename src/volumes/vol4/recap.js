recap: {
    title: "4권에서 배운 것",
    points: [
      "보안 신호등을 기억하고, 사외 AI에는 <b>기밀과 고객사 정보</b>를 절대 넣지 않아요.",
      "보고서 요약 시 <b>'자료에 없는 내용은 지어내지 말라'</b>는 조건을 꼭 붙여요.",
      "엑셀 작업을 시킬 때는 <b>원본 백업</b>을 남기고 사본 파일로 작업해요.",
      "분석 시험의 재현성처럼, 중요한 답은 <b>원본 대조와 교차 검증</b>을 거쳐요.",
      "판정과 서명은 연구원이 지키고, <b>초안과 정리 업무부터 작게</b> 시작해요.",
    ],
    nextLabel: "5권 예고 · AI가 보는 세상과 앞으로",
    next: "AI는 이제 글뿐 아니라 현미경 사진도 함께 봐요. 사진을 격자로 읽는 멀티모달 기술과, AI 시대에 이물 연구원이 가질 대체 불가능한 전문성을 5권에서 만나요.",
  },

  recapScene(api) {
    const s = api.svg();
    const items = ["보안 신호등", "보고서 요약", "엑셀 정리", "재현성 검증", "업무 분담"];
    const cards = items.map((w, i) => {
      const g = api.n("g", {}, s);
      api.n("rect", { x: 0, y: 0, width: 200, height: 36, rx: 10, fill: "#fff", stroke: "#e4e1d8" }, g);
      api.t(`${i + 1}`, { x: 18, y: 23, "font-size": 13, "font-weight": 800, fill: api.accent }, g);
      api.t(w, { x: 38, y: 23, "font-size": 14, "font-weight": 600, fill: "#23272f" }, g);
      const ck = api.t("✓", { x: 178, y: 24, "font-size": 16, "font-weight": 800, fill: "#24692f" }, g);
      return { g, ck };
    });

    // 5권 예고 책 표지 (남색)
    const nextBook = api.n("g", {}, s);
    api.n("rect", { x: 0, y: 0, width: 92, height: 120, rx: 8, fill: "#3462c9" }, nextBook);
    api.n("rect", { x: 6, y: 0, width: 4, height: 120, fill: "rgba(255,255,255,.35)" }, nextBook);
    api.t("5권", { x: 50, y: 52, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, nextBook);
    api.t("세상과 미래", { x: 50, y: 76, "text-anchor": "middle", "font-size": 11.5, fill: "#fff" }, nextBook);

    api.loop(t => {
      t = t % 9;
      cards.forEach(({ g, ck }, i) => {
        const a = seg(t, 0.2 + i * 0.5, 0.7 + i * 0.5);
        g.setAttribute("transform", `translate(${30 + (1 - a) * -20},${40 + i * 46})`);
        g.setAttribute("opacity", a);
        ck.setAttribute("opacity", seg(t, 3 + i * 0.3, 3.3 + i * 0.3));
      });
      const b = seg(t, 5, 6);
      nextBook.setAttribute("transform", `translate(${280 + (1 - b) * 60},${90}) rotate(${(1 - b) * 12})`);
      nextBook.setAttribute("opacity", b);
    }, 8);
  },
});