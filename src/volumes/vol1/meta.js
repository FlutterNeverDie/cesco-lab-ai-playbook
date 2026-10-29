BOOKS.push({
  no: 1,
  series: "연구원을 위한 AI 그림책",
  kicker: "HOW AI TALKS",
  title: "AI는 어떻게 말을 할까",
  subtitle: "AI를 한 번도 배워 본 적 없어도 괜찮아요.<br>실험실 이야기로 AI의 작동 원리를 5장에 걸쳐 풀어 볼게요.",
  color: { accent: "#6d4ae0", ink: "#3f2a9e", soft: "#f1ecff" },
  coverTag: "AI 안에서 일어나는 일들",
  recapTag: "1권에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    const words = ["토큰", "확률", "학습", "신경망", "LLM", "환각", "머신러닝", "다음 단어"];
    api.n("circle", { cx: 200, cy: 150, r: 62, fill: api.accent, opacity: .12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 44, fill: api.accent }, s);
    api.t("AI", { x: 200, y: 162, "text-anchor": "middle", "font-size": 34, "font-weight": 800, fill: "#fff" }, s);
    const chips = words.map(w => {
      const g = api.n("g", {}, s);
      const wdt = w.length * 14 + 22;
      api.n("rect", { x: -wdt / 2, y: -15, width: wdt, height: 30, rx: 15, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, g);
      api.t(w, { x: 0, y: 5, "text-anchor": "middle", "font-size": 13, "font-weight": 600, fill: "#3f2a9e" }, g);
      return g;
    });
    api.loop(t => {
      core.setAttribute("r", 44 + Math.sin(t * 2) * 3);
      chips.forEach((g, i) => {
        const a = t * 0.35 + (i / chips.length) * Math.PI * 2;
        const x = 200 + Math.cos(a) * 150, y = 150 + Math.sin(a) * 105;
        g.setAttribute("transform", `translate(${x},${y})`);
      });
    }, 0);
  },