recap: {
    title: "3권에서 배운 것",
    points: [
      "AI는 글만 쓰고, 실제 계산과 실행은 <b>외부 도구 프로그램</b>이 대신해 줘요.",
      "<b>에이전트</b>는 폴더를 맡기면 필요한 파일을 스스로 찾아 읽고, 모자라면 또 찾으며 일을 마쳐요.",
      "<b>MCP</b>는 USB-C처럼 AI와 온갖 도구를 하나로 잇는 표준 통신 규격이에요.",
      "되돌리기 어려운 중요한 결정 앞에는 반드시 <b>사람의 승인 관문</b>을 두어야 해요.",
      "안전을 위해 AI에게는 <b>최소 권한</b>만 주고, 문서 속 <b>숨은 지시</b>를 경계해요.",
    ],
    nextLabel: "4권 예고 · 내 일에 AI 쓰기",
    next: "원리는 충분히 배웠어요. 이제 내일 출근해서 내 자리에 앉아 실제로 써 볼 차례예요. 보안 규정을 지키며 보고서 요약과 엑셀 정리를 똑소리 나게 시키는 실전 비법을 4권에서 만나요.",
  },

  recapScene(api) {
    const s = api.svg();
    const items = ["도구 사용", "에이전트 루프", "MCP 표준", "사람 승인", "최소 권한 안전"];
    const cards = items.map((w, i) => {
      const g = api.n("g", {}, s);
      api.n("rect", { x: 0, y: 0, width: 200, height: 36, rx: 10, fill: "#fff", stroke: "#e4e1d8" }, g);
      api.t(`${i + 1}`, { x: 18, y: 23, "font-size": 13, "font-weight": 800, fill: api.accent }, g);
      api.t(w, { x: 38, y: 23, "font-size": 14, "font-weight": 600, fill: "#23272f" }, g);
      const ck = api.t("✓", { x: 178, y: 24, "font-size": 16, "font-weight": 800, fill: "#1f8a5b" }, g);
      return { g, ck };
    });

    // 4권 예고 책 표지 (초록색)
    const nextBook = api.n("g", {}, s);
    api.n("rect", { x: 0, y: 0, width: 92, height: 120, rx: 8, fill: "#3a9a4a" }, nextBook);
    api.n("rect", { x: 6, y: 0, width: 4, height: 120, fill: "rgba(255,255,255,.35)" }, nextBook);
    api.t("4권", { x: 50, y: 52, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, nextBook);
    api.t("내 일에 쓰기", { x: 50, y: 76, "text-anchor": "middle", "font-size": 11.5, fill: "#fff" }, nextBook);

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