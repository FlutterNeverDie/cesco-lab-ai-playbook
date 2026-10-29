recap: {
    title: "특강에서 배운 것",
    points: [
      "요즘은 모델을 다시 학습시키는 <b>파인튜닝</b> 대신, 글로 규칙을 쥐여 주는 <b>커스텀</b>이면 대부분 충분해요.",
      "<b>지침(System prompt)</b>은 일을 시작할 때마다 먼저 보는 쪽지예요. 한국어로, 결론부터, 계획 먼저 같은 늘 지킬 규칙을 적어요. 훅(Hooks)으로 자동으로 넣기도 해요.",
      "<b>스킬(Skill)</b>은 그 일을 할 때 펴 보는 선배 노트예요. 현장 센스와 노션 일지, 메일 초안 같은 마무리까지 적어요.",
      "<b>검증(Harness)</b>은 돌려주기 전 검사대예요. 고객 정보, 회사 이름처럼 자주 하는 실수를 걸러요.",
      "걸린 실수를 다시 적을수록 AI는 <b>연차 쌓인 직원</b>처럼 일해요. 마지막 확인은 여전히 내 몫이에요.",
    ],
    nextLabel: "다음은 실전",
    next: "이제 이 세 가지를 실제 이물 분석 업무에 녹여 볼 차례예요. 실전 편에서 입력 양식, 3개 안, 10분 뒤 고르기로 빠르면 3일 만에 내 일을 자동으로 돌리는 순서를 보여 드릴게요.",
  },

  recapScene(api) {
    const s = api.svg();
    const A = api.accent;
    // 세 장의 쪽지가 '우리 팀 AI 설명서'로 묶여요
    const binder = api.n("g", {}, s);
    api.n("rect", { x: 110, y: 96, width: 120, height: 156, rx: 10, fill: A }, binder);
    api.n("rect", { x: 110, y: 96, width: 14, height: 156, rx: 4, fill: "rgba(0,0,0,.15)" }, binder);
    [124, 174, 224].forEach(y => api.n("circle", { cx: 117, cy: y, r: 4, fill: "#fff" }, binder));
    api.t("우리 팀", { x: 176, y: 158, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: "#fff" }, binder);
    api.t("AI 설명서", { x: 176, y: 180, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: "#fff" }, binder);
    const bands = [["지침", HOOK], ["스킬", GUIDE], ["검증", HARN]].map(([name, c], i) => {
      const g = api.n("g", {}, s);
      api.n("rect", { x: -30, y: -15, width: 60, height: 30, rx: 6, fill: "#fff", stroke: c, "stroke-width": 2 }, g);
      api.t(name, { y: 5, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: c }, g);
      return { g, from: [70 + i * 130, 46], to: [262, 120 + i * 44] };
    });
    const done = pill(api, s, 200, 278, "✓ 이제 우리 팀 사람", GUIDE, 12);
    api.loop(t => {
      t = t % 7;
      const out = 1 - seg(t, 6.5, 6.9);
      binder.setAttribute("opacity", seg(t, 0.1, 0.5) * out);
      bands.forEach((b, i) => {
        const p = seg(t, 0.8 + i * 0.7, 1.6 + i * 0.7);
        b.g.setAttribute("transform", `translate(${lerp(b.from[0], b.to[0], p)}, ${lerp(b.from[1], b.to[1], p)})`);
        b.g.setAttribute("opacity", seg(t, 0.4 + i * 0.7, 0.8 + i * 0.7) * out);
      });
      done.setAttribute("opacity", seg(t, 3.6, 4.0) * out);
    }, 5);
  },
});
})();