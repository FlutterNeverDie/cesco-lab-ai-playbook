/**
 * components.js - 6권, 7권 및 공통 UI 드로잉 컴포넌트
 */

// 6~7권 공통 색상
export const HOOK = "#3462c9";
export const GUIDE = "#1f8a5b";
export const HARN = "#d9622b";
export const BAD = "#d64545";
export const INK = "#23272f";
export const MUTED = "#6b7280";
export const LINE = "#e4e1d8";
export const PAPER = "#f6f4ee";

// 그림 컴포넌트
export const bot = (api, p, x, y, r = 22, fill = api.accent) => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("circle", { r, fill }, g);
  api.t("AI", { y: r * 0.24, "text-anchor": "middle", "font-size": r * 0.6, "font-weight": 800, fill: "#fff" }, g);
  return g;
};

export const person = (api, p, x, y, c = MUTED, label = "나") => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("circle", { cy: -24, r: 10, fill: c }, g);
  api.n("rect", { x: -15, y: -11, width: 30, height: 30, rx: 12, fill: c }, g);
  if (label) api.t(label, { y: 36, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: INK }, g);
  return g;
};

export const pill = (api, p, x, y, text, c, fs = 10.5, fill = "#fff") => {
  const g = api.n("g", {}, p);
  const w = [...text].length * fs * 0.92 + 18;
  api.n("rect", { x: x - w / 2, y: y - 12, width: w, height: 24, rx: 12, fill, stroke: c, "stroke-width": 1.5 }, g);
  const tx = api.t(text, { x, y: y + fs * 0.36, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: fill === "#fff" ? c : "#fff" }, g);
  g.label = tx;
  return g;
};

export const lerp = (a, b, p) => a + (b - a) * p;
