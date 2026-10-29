BOOKS.push({
  no: 4,
  series: "연구원을 위한 AI 그림책",
  kicker: "AI IN MY LAB",
  title: "내 일에 AI 쓰기",
  subtitle: "코딩 한 줄 몰라도 괜찮아요.<br>내일 출근해서 연구실 업무에 안전하게 써먹는 실전 안내서예요.",
  color: { accent: "#3a9a4a", ink: "#24692f", soft: "#e8f5e9" },
  coverTag: "연구실 업무에 바로 쓰는 AI",
  recapTag: "4권에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    // 중앙 AI 코어
    api.n("circle", { cx: 200, cy: 150, r: 64, fill: api.accent, opacity: 0.12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 44, fill: api.accent }, s);
    api.t("실전", { x: 200, y: 158, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, s);

    // 주변 실무 키워드들 (보안 신호등, 보고서 요약, 엑셀 정리, 재현성 검증, 업무 분담)
    const keywords = ["보안 신호등", "보고서 요약", "엑셀 정리", "답변 검증", "업무 분담"];
    const chips = keywords.map(w => {
      const g = api.n("g", {}, s);
      const wdt = w.length * 13 + 22;
      api.n("rect", { x: -wdt / 2, y: -14, width: wdt, height: 28, rx: 14, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, g);
      api.t(w, { x: 0, y: 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "#24692f" }, g);
      return g;
    });

    api.loop(t => {
      core.setAttribute("r", 44 + Math.sin(t * 2) * 3);
      chips.forEach((g, i) => {
        const a = t * 0.35 + (i / chips.length) * Math.PI * 2;
        const x = 200 + Math.cos(a) * 145;
        const y = 150 + Math.sin(a) * 100;
        g.setAttribute("transform", `translate(${x},${y})`);
      });
    }, 0);
  },