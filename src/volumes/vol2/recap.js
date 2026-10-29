recap: {
    title: "2권에서 배운 것",
    points: [
      "AI가 한 번에 다룰 수 있는 글의 분량은 <b>컨텍스트 창(실험대)</b>으로 정해져 있어요.",
      "AI는 대화를 기억하지 않아요. 매번 <b>지금까지의 대화를 통째로</b> 다시 보내는 거예요.",
      "프롬프트는 <b>실험 지시서(SOP)</b>처럼 역할, 목적, 자료, 형식, 조건을 명확히 적어야 해요.",
      "<b>임베딩</b>은 문장의 뜻을 좌표로 바꿔, FT-IR 스펙트럼 검색처럼 뜻으로 찾게 해 줘요.",
      "<b>RAG</b>는 자료를 먼저 검색해 실험대에 올린 뒤 출처를 달아 답변하게 하는 기술이에요.",
    ],
    nextLabel: "3권 예고 · AI가 일을 하게 하기",
    next: "지금까지 AI는 묻는 말에 답만 하는 '상담원'이었어요. 그런데 AI에게 계산기나 엑셀, 사내 검색 엔진 같은 도구를 직접 쥐여주면 어떻게 될까요? AI가 스스로 계획하고 실행하는 '에이전트'의 세계를 3권에서 만나요.",
  },

  recapScene(api) {
    const s = api.svg();
    const items = ["컨텍스트 창", "기억의 비밀", "SOP 지시서", "임베딩 좌표", "RAG 출처"];
    const cards = items.map((w, i) => {
      const g = api.n("g", {}, s);
      api.n("rect", { x: 0, y: 0, width: 200, height: 36, rx: 10, fill: "#fff", stroke: "#e4e1d8" }, g);
      api.t(`${i + 1}`, { x: 18, y: 23, "font-size": 13, "font-weight": 800, fill: api.accent }, g);
      api.t(w, { x: 38, y: 23, "font-size": 14, "font-weight": 600, fill: "#23272f" }, g);
      const ck = api.t("✓", { x: 178, y: 24, "font-size": 16, "font-weight": 800, fill: "#0f9b8e" }, g);
      return { g, ck };
    });

    // 3권 예고 책 표지 (주황색)
    const nextBook = api.n("g", {}, s);
    api.n("rect", { x: 0, y: 0, width: 92, height: 120, rx: 8, fill: "#e07a1f" }, nextBook);
    api.n("rect", { x: 6, y: 0, width: 4, height: 120, fill: "rgba(255,255,255,.35)" }, nextBook);
    api.t("3권", { x: 50, y: 52, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, nextBook);
    api.t("일하게 하기", { x: 50, y: 76, "text-anchor": "middle", "font-size": 11.5, fill: "#fff" }, nextBook);

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