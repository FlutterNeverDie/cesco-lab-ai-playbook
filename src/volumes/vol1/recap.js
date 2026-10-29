recap: {
    title: "1권에서 배운 것",
    points: [
      "<b>LLM</b>은 AI 안의 머신러닝 안의 딥러닝 안에 있는, 글을 엄청나게 읽은 모델이에요.",
      "AI는 글을 <b>토큰</b>이라는 조각으로 잘라 번호로 바꿔 읽어요. 요금과 분량도 토큰으로 세요.",
      "LLM은 <b>다음 조각을 확률로 골라</b> 한 조각씩 이어 붙여요.",
      "<b>학습</b>은 빈칸 맞히기를 수조 번 하며 다이얼을 맞추는 일이고, 끝나면 고정돼요.",
      "그럴듯한 말과 사실은 달라서 <b>환각</b>이 생겨요. 근거 자료와 출처로 줄여요.",
    ],
    nextLabel: "2권 예고 · AI와 대화 잘하기",
    next: "AI가 한 번에 볼 수 있는 양은 정해져 있고, AI는 사실 대화를 기억하지 못해요. 그럼 어떻게 긴 자료를 주고, 어떻게 부탁해야 잘 알아들을까요? FT-IR 스펙트럼 검색과 꼭 닮은 'AI의 자료 찾기'도 2권에서 만나요.",
  },

  recapScene(api) {
    const s = api.svg();
    const items = ["AI 지도", "토큰", "다음 조각", "학습", "환각"];
    const cards = items.map((w, i) => {
      const g = api.n("g", {}, s);
      api.n("rect", { x: 0, y: 0, width: 200, height: 36, rx: 10, fill: "#fff", stroke: "#e4e1d8" }, g);
      api.t(`${i + 1}`, { x: 18, y: 23, "font-size": 13, "font-weight": 800, fill: api.accent }, g);
      api.t(w, { x: 38, y: 23, "font-size": 14, "font-weight": 600, fill: "#23272f" }, g);
      const ck = api.t("✓", { x: 178, y: 24, "font-size": 16, "font-weight": 800, fill: "#1f8a5b" }, g);
      return { g, ck };
    });
    const next = api.n("g", {}, s);
    api.n("rect", { x: 0, y: 0, width: 92, height: 120, rx: 8, fill: "#0f9b8e" }, next);
    api.n("rect", { x: 6, y: 0, width: 4, height: 120, fill: "rgba(255,255,255,.35)" }, next);
    api.t("2권", { x: 50, y: 52, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, next);
    api.t("대화 잘하기", { x: 50, y: 76, "text-anchor": "middle", "font-size": 11.5, fill: "#fff" }, next);
    api.loop(t => {
      t = t % 9;
      cards.forEach(({ g, ck }, i) => {
        const a = seg(t, 0.2 + i * 0.5, 0.7 + i * 0.5);
        g.setAttribute("transform", `translate(${30 + (1 - a) * -20},${40 + i * 46})`);
        g.setAttribute("opacity", a);
        ck.setAttribute("opacity", seg(t, 3 + i * 0.3, 3.3 + i * 0.3));
      });
      const b = seg(t, 5, 6);
      next.setAttribute("transform", `translate(${280 + (1 - b) * 60},${90}) rotate(${(1 - b) * 12})`);
      next.setAttribute("opacity", b);
    }, 8);
  },
});