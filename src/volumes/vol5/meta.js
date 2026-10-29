BOOKS.push({
  no: 5,
  series: "연구원을 위한 AI 그림책",
  kicker: "AI AND THE FUTURE LAB",
  title: "AI가 보는 세상과 앞으로",
  subtitle: "AI는 이제 글뿐 아니라 현미경 사진도 함께 봐요.<br>변화하는 시대 속에서 연구원이 가질 진짜 무기를 이야기해요.",
  color: { accent: "#3462c9", ink: "#1f3f8a", soft: "#e8eefb" },
  coverTag: "AI의 눈과 연구원의 미래",
  recapTag: "5권에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    // 중앙 AI 코어
    api.n("circle", { cx: 200, cy: 150, r: 64, fill: api.accent, opacity: 0.12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 44, fill: api.accent }, s);
    api.t("미래", { x: 200, y: 158, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, s);

    // 주변 키워드들 (멀티모달, 사진 판독, 모델 선택, 연구원의 책임, 지휘자)
    const keywords = ["멀티모달", "현미경 사진", "체급별 모델", "연구원의 책임", "지휘자 연구원"];
    const chips = keywords.map(w => {
      const g = api.n("g", {}, s);
      const wdt = w.length * 13 + 22;
      api.n("rect", { x: -wdt / 2, y: -14, width: wdt, height: 28, rx: 14, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, g);
      api.t(w, { x: 0, y: 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "#1f3f8a" }, g);
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