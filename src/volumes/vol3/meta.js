BOOKS.push({
  no: 3,
  series: "연구원을 위한 AI 그림책",
  kicker: "AI AT WORK",
  title: "AI가 일을 하게 하기",
  subtitle: "말만 하던 AI가 계산기를 두드리고 엑셀을 연다면?<br>도구 사용과 에이전트, MCP의 원리를 파헤쳐 봐요.",
  color: { accent: "#e07a1f", ink: "#9a4d0b", soft: "#fdf0e3" },
  coverTag: "AI가 도구를 쥐고 일하는 법",
  recapTag: "3권에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    // 중앙 AI 코어
    api.n("circle", { cx: 200, cy: 150, r: 64, fill: api.accent, opacity: 0.12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 44, fill: api.accent }, s);
    api.t("도구", { x: 200, y: 158, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, s);

    // 주변 도구 아이콘들 (계산기, 돋보기, 파일, 로봇 팔, 자물쇠)
    const tools = ["계산기 도구", "에이전트 자료실", "MCP 플러그", "사람 승인", "안전 자물쇠"];
    const chips = tools.map(w => {
      const g = api.n("g", {}, s);
      const wdt = w.length * 13 + 22;
      api.n("rect", { x: -wdt / 2, y: -14, width: wdt, height: 28, rx: 14, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, g);
      api.t(w, { x: 0, y: 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "#9a4d0b" }, g);
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