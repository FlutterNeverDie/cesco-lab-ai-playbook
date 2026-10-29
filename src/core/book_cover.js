/**
 * book_cover.js - 전체 단행본 표지 데이터 및 애니메이션
 *
 * "신서아를 위한 AI 에이전트 업무 사용 입문편"
 */

export const BOOK_COVER = {
  title: "신서아를 위한 AI 에이전트 업무 사용 입문편",
  kicker: "CESCO LAB AI PLAYBOOK",
  subtitle: "세스코 식품안전·이물 분석 연구원 신서아 님을 위한 맞춤 실전 가이드.<br>코딩 한 줄 없이, 실험실 이야기로 AI 원리부터 실무 에이전트까지 한 권으로 끝내요.",
  tag: "신서아 연구원 맞춤 실전 플레이북",
  color: { accent: "#0f9b8e", ink: "#0a6b62", soft: "#e3f6f3" },

  scene(api) {
    const s = api.svg();
    // 중앙 빛나는 AI 에이전트 코어
    api.n("circle", { cx: 200, cy: 150, r: 68, fill: api.accent, opacity: 0.12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 46, fill: api.accent }, s);
    api.t("CESCO", { x: 200, y: 144, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "rgba(255,255,255,0.85)", "letter-spacing": "0.1em" }, s);
    api.t("AI", { x: 200, y: 168, "text-anchor": "middle", "font-size": 22, "font-weight": 900, fill: "#fff" }, s);

    // 연구원과 업무 상징 키워드들
    const items = [
      { text: "신서아 연구원", c: "#0a6b62", bg: "#e3f6f3" },
      { text: "이물 분석 · FT-IR", c: "#1f3f8a", bg: "#e8eefb" },
      { text: "성적서 요약", c: "#24692f", bg: "#e8f5e9" },
      { text: "엑셀 정리", c: "#9a4d0b", bg: "#fdf0e3" },
      { text: "스킬 & 하네스", c: "#7d1f47", bg: "#fbe8f0" },
      { text: "업무 에이전트", c: "#0a6b62", bg: "#e3f6f3" },
    ];

    const chips = items.map(it => {
      const g = api.n("g", {}, s);
      const wdt = it.text.length * 13 + 26;
      api.n("rect", { x: -wdt / 2, y: -15, width: wdt, height: 30, rx: 15, fill: it.bg, stroke: it.c, "stroke-width": 1.5 }, g);
      api.t(it.text, { x: 0, y: 5, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: it.c }, g);
      return g;
    });

    api.loop(t => {
      core.setAttribute("r", 46 + Math.sin(t * 2) * 3);
      chips.forEach((g, i) => {
        const a = t * 0.35 + (i / chips.length) * Math.PI * 2;
        const x = 200 + Math.cos(a) * 145;
        const y = 150 + Math.sin(a) * 105;
        g.setAttribute("transform", `translate(${x},${y})`);
      });
    }, 0);
  }
};
