(() => {
// 실전 편: 특강(6권)의 지침·스킬·검증을 실제 이물 분석 업무에 녹이기. 색은 6권과 같게 맞춘다
const HOOK = "#3462c9", GUIDE = "#1f8a5b", HARN = "#d9622b", BAD = "#d64545";
const INK = "#23272f", MUTED = "#6b7280", LINE = "#e4e1d8", PAPER = "#f6f4ee";

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
const pill = (api, p, x, y, text, c, fs = 10.5) => {
  const g = api.n("g", {}, p);
  const w = [...text].length * fs * 0.92 + 18;
  api.n("rect", { x: x - w / 2, y: y - 12, width: w, height: 24, rx: 12, fill: "#fff", stroke: c, "stroke-width": 1.5 }, g);
  g.label = api.t(text, { x, y: y + fs * 0.36, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: c }, g);
  return g;
};
// 줄 몇 개 그어진 종이
const paper = (api, p, x, y, w, h, c, title) => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("rect", { x: 0, y: 0, width: w, height: h, rx: 6, fill: "#fff", stroke: c, "stroke-width": 1.6 }, g);
  if (title) api.t(title, { x: 10, y: 18, "font-size": 10.5, "font-weight": 800, fill: c }, g);
  for (let yy = title ? 30 : 14; yy < h - 8; yy += 12) api.n("rect", { x: 10, y: yy, width: (w - 20) * (yy % 24 ? 0.7 : 1), height: 4, rx: 2, fill: LINE }, g);
  return g;
};
const lerp = (a, b, p) => a + (b - a) * p;

BOOKS.push({
  no: 7,
  badge: "실",
  volName: "실전",
  series: "연구원을 위한 AI 그림책",
  kicker: "IN PRACTICE",
  title: "세스코 업무에 녹이기",
  subtitle: "PC로 하는 일은 대부분 AI에게 맡길 수 있어요.<br>입력 양식, 3개 안, 10분 뒤 고르기. 빠르면 3일이면 내 일이 알아서 돌아가요.",
  color: { accent: "#0e7490", ink: "#0b4f63", soft: "#e3f4f8" },
  coverTag: "넣고, 고르고, 적어 두고, 다시",
  recapTag: "실전 편에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    const A = api.accent;
    const STEPS = ["양식 넣기", "3개 안", "고르기", "고칠 점", "스킬에 적기"];
    const R = 102, CX = 200, CY = 150;
    api.n("circle", { cx: CX, cy: CY, r: R, fill: "none", stroke: LINE, "stroke-width": 5 }, s);
    const dot = api.n("circle", { r: 7, fill: A }, s);
    const nodes = STEPS.map((w, i) => {
      const a = -Math.PI / 2 + i * (Math.PI * 2 / 5);
      const x = CX + Math.cos(a) * R, y = CY + Math.sin(a) * R;
      const g = api.n("g", {}, s);
      const bw = [...w].length * 11 + 20;
      const box = api.n("rect", { x: x - bw / 2, y: y - 14, width: bw, height: 28, rx: 14, fill: "#fff", stroke: A, "stroke-width": 1.8 }, g);
      api.t(w, { x, y: y + 4, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: INK }, g);
      return { a, box };
    });
    const day = api.t("1일차", { x: CX, y: CY - 2, "text-anchor": "middle", "font-size": 24, "font-weight": 800, fill: A }, s);
    const sub = api.t("고칠 것 많음", { x: CX, y: CY + 22, "text-anchor": "middle", "font-size": 11, fill: MUTED }, s);
    const SUB = ["고칠 것 많음", "고칠 것 조금", "입력만 넣으면 끝 ✓"];

    api.loop(t => {
      t = t % 10;
      const lap = Math.min(2, Math.floor(t / 3)), lt = t - lap * 3;
      const a = -Math.PI / 2 + Math.PI * 2 * clamp(lt / 2.6) + (lap === 2 && lt > 2.6 ? 0 : 0);
      dot.setAttribute("cx", CX + Math.cos(a) * R);
      dot.setAttribute("cy", CY + Math.sin(a) * R);
      dot.setAttribute("opacity", t < 9.4 ? 1 : 0);
      const k = Math.min(4, Math.floor(clamp(lt / 2.6) * 5 + 0.05));
      nodes.forEach((n, i) => n.box.setAttribute("fill", i === k && lt < 2.7 ? "#e3f4f8" : "#fff"));
      day.textContent = `${lap + 1}일차`;
      sub.textContent = SUB[lap];
      sub.setAttribute("fill", lap === 2 ? GUIDE : MUTED);
      sub.setAttribute("font-weight", lap === 2 ? 800 : 400);
    }, 9);
  },