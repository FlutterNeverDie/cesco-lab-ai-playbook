BOOKS.push({
  no: 2,
  series: "연구원을 위한 AI 그림책",
  kicker: "TALKING WITH AI",
  title: "AI와 대화 잘하기",
  subtitle: "AI는 한 번에 얼마나 볼 수 있고, 무엇을 기억할까요?<br>실험실 이야기로 컨텍스트와 검색의 비밀을 알아봐요.",
  color: { accent: "#0f9b8e", ink: "#0a6b62", soft: "#e3f6f3" },
  coverTag: "AI의 실험대와 기억의 비밀",
  recapTag: "2권에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    // 중앙 AI 작업대 원형 코어
    api.n("circle", { cx: 200, cy: 150, r: 64, fill: api.accent, opacity: 0.12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 44, fill: api.accent }, s);
    api.t("대화", { x: 200, y: 158, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, s);

    // 주변을 도는 핵심 키워드 말풍선들
    const words = ["컨텍스트 창", "기억의 한계", "SOP 프롬프트", "임베딩 좌표", "FT-IR 검색", "RAG 출처"];
    const chips = words.map(w => {
      const g = api.n("g", {}, s);
      const wdt = w.length * 13 + 22;
      api.n("rect", { x: -wdt / 2, y: -14, width: wdt, height: 28, rx: 14, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, g);
      api.t(w, { x: 0, y: 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "#0a6b62" }, g);
      return g;
    });

    api.loop(t => {
      core.setAttribute("r", 44 + Math.sin(t * 2) * 3);
      chips.forEach((g, i) => {
        const a = t * 0.3 + (i / chips.length) * Math.PI * 2;
        const x = 200 + Math.cos(a) * 145;
        const y = 150 + Math.sin(a) * 100;
        g.setAttribute("transform", `translate(${x},${y})`);
      });
    }, 0);
  },