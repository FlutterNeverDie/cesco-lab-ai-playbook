(() => {
// 6권(특강) 공통 색: 지침은 파랑, 스킬은 초록, 검증은 주황 - 모든 그림에서 같은 색
const HOOK = "#3462c9", GUIDE = "#1f8a5b", HARN = "#d9622b", BAD = "#d64545";
const INK = "#23272f", MUTED = "#6b7280", LINE = "#e4e1d8", PAPER = "#f6f4ee";

// 그림 부품
const bot = (api, p, x, y, r = 22, fill = api.accent) => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("circle", { r, fill }, g);
  api.t("AI", { y: r * 0.24, "text-anchor": "middle", "font-size": r * 0.6, "font-weight": 800, fill: "#fff" }, g);
  return g;
};
const person = (api, p, x, y, c = MUTED, label = "나") => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("circle", { cy: -24, r: 10, fill: c }, g);
  api.n("rect", { x: -15, y: -11, width: 30, height: 30, rx: 12, fill: c }, g);
  if (label) api.t(label, { y: 36, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: INK }, g);
  return g;
};
const pill = (api, p, x, y, text, c, fs = 10.5, fill = "#fff") => {
  const g = api.n("g", {}, p);
  const w = [...text].length * fs * 0.92 + 18;
  api.n("rect", { x: x - w / 2, y: y - 12, width: w, height: 24, rx: 12, fill, stroke: c, "stroke-width": 1.5 }, g);
  const tx = api.t(text, { x, y: y + fs * 0.36, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: fill === "#fff" ? c : "#fff" }, g);
  g.label = tx;
  return g;
};
const lerp = (a, b, p) => a + (b - a) * p;

BOOKS.push({
  no: 6,
  badge: "특",
  volName: "특강",
  series: "연구원을 위한 AI 그림책",
  kicker: "SPECIAL LECTURE",
  title: "AI 에이전트 사용에 중요한 3가지",
  subtitle: "요즘은 AI를 다시 가르치지 않아도 돼요.<br>지침, 스킬, 검증. 글로 쓴 세 가지 규칙이면 우리 팀 방식대로 일해요.",
  color: { accent: "#b23a6b", ink: "#7d1f47", soft: "#fbe8f0" },
  coverTag: "시작할 때, 하는 중에, 돌려주기 전에",
  recapTag: "특강에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    api.t("모델은 그대로, 규칙은 우리 팀 것으로", { x: 200, y: 44, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: api.accent }, s);
    api.n("line", { x1: 30, y1: 190, x2: 370, y2: 190, stroke: LINE, "stroke-width": 6, "stroke-linecap": "round" }, s);
    api.t("일 맡김", { x: 30, y: 222, "text-anchor": "middle", "font-size": 10.5, fill: MUTED }, s);
    api.t("결과", { x: 370, y: 222, "text-anchor": "middle", "font-size": 10.5, fill: MUTED }, s);
    const gates = [[110, "지침", "System prompt", "일 시작할 때", HOOK], [200, "스킬", "Skill", "일하는 중", GUIDE], [290, "검증", "Harness", "돌려주기 전", HARN]].map(([x, name, en, when, c]) => {
      const card = api.n("g", {}, s);
      api.n("rect", { x: x - 42, y: 80, width: 84, height: 64, rx: 10, fill: "#fff", stroke: c, "stroke-width": 2 }, card);
      api.t(name, { x, y: 104, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: c }, card);
      api.t(en, { x, y: 119, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: c }, card);
      api.t(when, { x, y: 135, "text-anchor": "middle", "font-size": 10, fill: MUTED }, card);
      api.n("line", { x1: x, y1: 144, x2: x, y2: 176, stroke: c, "stroke-width": 2, "stroke-dasharray": "3 3" }, s);
      const ring = api.n("circle", { cx: x, cy: 190, r: 12, fill: "#fff", stroke: c, "stroke-width": 3 }, s);
      return { card, ring, c };
    });
    const ai = bot(api, s, 30, 190, 15);
    const done = pill(api, s, 200, 262, "✓ 우리 팀 방식으로 끝!", api.accent, 11.5);

    const ARRIVE = [1.1, 2.4, 3.7];
    api.loop(t => {
      t = t % 7;
      const out = 1 - seg(t, 6.5, 6.9);
      const x = 30 + 80 * seg(t, 0.3, 1.1) + 90 * seg(t, 1.8, 2.4) + 90 * seg(t, 3.1, 3.7) + 80 * seg(t, 4.4, 5.0);
      ai.setAttribute("transform", `translate(${x}, 190)`);
      ai.setAttribute("opacity", out);
      gates.forEach((g, i) => {
        const lit = seg(t, ARRIVE[i], ARRIVE[i] + 0.2) * out;
        g.ring.setAttribute("fill", lit > 0.5 ? g.c : "#fff");
        g.card.setAttribute("opacity", 0.45 + 0.55 * lit);
      });
      done.setAttribute("opacity", seg(t, 5.0, 5.4) * out);
    }, 5.6);
  },