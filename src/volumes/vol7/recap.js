recap: {
    title: "실전 편에서 배운 것",
    points: [
      "PC로 하는 일은 대부분 AI에게 맡길 수 있어요. 먼저 <b>내 업무를 소개</b>해요.",
      "<b>입력 양식</b>을 정해 두면, 넣기만 해도 지침과 스킬대로 끝까지 만들어요.",
      "스킬에 <b>3개 안</b>을 적어 두고, 10분쯤 뒤 와서 고르고 고칠 점만 말해요.",
      "마음에 든 점은 스킬과 검증에 적고, 이상하면 <b>\"왜 그렇게 했어?\"</b>로 입력값과 예시를 점검해요.",
      "매일 다듬으면 <b>빠르면 3일</b> 만에 입력만 넣으면 되는 수준이 돼요. 판정과 보내기는 끝까지 내 몫이에요.",
    ],
    nextLabel: "마치며",
    next: "오늘 내 자리에서 하나만 골라 시작해 보세요. 업무 소개 한 단락, 입력 양식 하나, 스킬 한 장. 3일 뒤에는 성적서 초안을 기다리며 현미경을 보고 있을 거예요.",
  },

  recapScene(api) {
    const s = api.svg();
    const A = api.accent;
    // 왼쪽: AI가 PC 일을 해 두고, 오른쪽: 나는 현미경
    const mon = api.n("g", {}, s);
    api.n("rect", { x: 30, y: 60, width: 170, height: 120, rx: 10, fill: "#fff", stroke: INK, "stroke-width": 2 }, mon);
    api.n("rect", { x: 100, y: 180, width: 30, height: 16, fill: INK }, mon);
    api.n("rect", { x: 80, y: 196, width: 70, height: 6, rx: 3, fill: INK }, mon);
    const TODO = ["성적서 초안", "회신 메일", "업무일지"];
    const rows = TODO.map((w, i) => {
      api.t(w, { x: 48, y: 96 + i * 28, "font-size": 11, "font-weight": 700, fill: INK }, s);
      return api.t("✓", { x: 176, y: 96 + i * 28, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: GUIDE }, s);
    });
    bot(api, s, 200, 60, 16);
    // 현미경
    const mic = api.n("g", { transform: "translate(300, 130)" }, s);
    api.n("rect", { x: -34, y: 50, width: 68, height: 10, rx: 3, fill: MUTED }, mic);
    api.n("rect", { x: 14, y: -30, width: 10, height: 82, rx: 3, fill: MUTED }, mic);
    api.n("rect", { x: -4, y: -62, width: 14, height: 46, rx: 4, fill: INK, transform: "rotate(-25 3 -39)" }, mic);
    api.n("rect", { x: 4, y: -20, width: 8, height: 12, rx: 2, fill: INK }, mic);
    api.n("rect", { x: -26, y: 22, width: 46, height: 6, rx: 2, fill: MUTED }, mic);
    person(api, s, 344, 152, A, "");
    api.t("나는 나만 할 일을", { x: 300, y: 222, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: A }, s);
    api.t("AI는 PC 일을", { x: 115, y: 228, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: INK }, s);
    api.loop(t => {
      t = t % 6;
      const out = 1 - seg(t, 5.5, 5.9);
      rows.forEach((r, i) => r.setAttribute("opacity", seg(t, 0.6 + i * 0.8, 0.9 + i * 0.8) * out));
    }, 4);
  },
});
})();