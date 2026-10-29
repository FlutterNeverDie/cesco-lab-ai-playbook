export default {
      title: "3개 안 받고, 10분 뒤 고르기",
      tag: "시켜 놓고 내 일 하다가, 돌아와서 고르고 고칠 점만 말해요",
      lead: "한 번에 딱 마음에 드는 결과가 나오기는 어려워요. 그래서 스킬에 \"3개씩 만들어\"라고 적어 둬요. 쓰는 것보다 고르는 게 훨씬 빨라요.",
      body: `
<h3>스킬에 적어 둘 한 줄</h3>
<div class="card"><b>성적서 스킬 중</b><q>소견 문장은 3개 안으로 만들어. A는 간결하게, B는 자세하게, C는 고객 눈높이로.</q></div>

<h3>일하는 순서</h3>
<ol class="steps">
  <li><b>넣고 시켜 놓기</b><small>양식을 넣고, 나는 현미경 보러 가요.</small></li>
  <li><b>10분쯤 뒤 돌아오기</b><small>A, B, C 세 안이 기다리고 있어요.</small></li>
  <li><b>하나 고르기</b><small>"B가 제일 낫네."</small></li>
  <li><b>고칠 점 말하기</b><small>"B로 가되, 둘째 문장은 A처럼 짧게."</small></li>
</ol>

<h3>기다리는 동안은 내 일</h3>
<p>AI가 쓰는 동안 나는 <b>나만 할 수 있는 일</b>을 해요.<br>돌아와서는 읽고, 고르고, 한마디만 하면 돼요.</p>`,
      lab: "<b>전처리 조건을 세 가지로 걸어 두는 것</b>과 같아요. 조건을 바꾼 시료 세 개를 동시에 돌려 두고 다른 일을 하다가, 돌아와서 가장 깨끗한 결과를 고르잖아요.",
      quiz: {
        q: "AI 결과가 한 번에 마음에 드는 일이 드물다면, 스킬에 무엇을 적으면 좋을까요?",
        options: ["한 번에 완벽하게 써 달라고 적는다", "마음에 안 들면 처음부터 다시 쓰라고 적는다", "방향을 달리한 3개 안을 만들라고 적는다"], answer: 2,
        explain: "세 안을 받아 고르면, 하나를 여러 번 고치는 것보다 빨리 마음에 드는 결과에 닿아요.",
      },
      scene(api) {
        const s = api.svg();
        const A = api.accent;
        // 10분 시계
        const ck = api.n("g", { transform: "translate(52, 62)" }, s);
        api.n("circle", { r: 26, fill: "#fff", stroke: MUTED, "stroke-width": 2 }, ck);
        const arc = api.n("path", { d: "", fill: A, opacity: 0.25 }, ck);
        api.t("10분", { y: 46, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: MUTED }, ck);
        const ai = bot(api, s, 200, 62, 24);
        const me = person(api, s, 350, 74);
        const away = api.t("현미경 보러 가요", { x: 350, y: 130, "text-anchor": "middle", "font-size": 10, fill: MUTED }, s);
        // A B C 세 안
        const drafts = ["A", "B", "C"].map((k, i) => {
          const g = api.n("g", {}, s);
          const box = api.n("rect", { x: -46, y: -50, width: 92, height: 100, rx: 8, fill: "#fff", stroke: "#cfcabe", "stroke-width": 1.8 }, g);
          api.t(`${k}안`, { x: -34, y: -30, "font-size": 12, "font-weight": 800, fill: INK }, g);
          [[-16, 1], [-4, 0.8], [8, [0.5, 1, 0.7][i]], [20, [0.3, 0.9, 0.6][i]]].forEach(([y, w]) => api.n("rect", { x: -34, y, width: 68 * w, height: 5, rx: 2.5, fill: LINE }, g));
          return { g, box, x: 80 + i * 120 };
        });
        const pick = api.t("✓ 이걸로", { x: 200, y: 126, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: GUIDE }, s);
        const say = pill(api, s, 200, 272, "B로, 둘째 문장만 짧게", A, 11);
        api.loop(t => {
          t = t % 10;
          const out = 1 - seg(t, 9.4, 9.9);
          // 시계: 1~5초 동안 한 바퀴 (10분)
          const p = clamp((t - 1) / 4), ang = p * Math.PI * 2 - Math.PI / 2;
          arc.setAttribute("d", p <= 0 ? "" : `M 0 0 L 0 -24 A 24 24 0 ${p > 0.5 ? 1 : 0} 1 ${Math.cos(ang) * 24} ${Math.sin(ang) * 24} Z`);
          // 사람: 1초에 나갔다가 5초에 돌아옴
          const gone = seg(t, 0.8, 1.3) * (1 - seg(t, 5.0, 5.5));
          me.setAttribute("opacity", 1 - gone);
          away.setAttribute("opacity", gone);
          ai.setAttribute("transform", `translate(200, 62) rotate(${t > 1.2 && t < 4.8 ? Math.sin(t * 9) * 6 : 0})`);
          drafts.forEach((d, i) => {
            const a = seg(t, 1.6 + i * 1.0, 2.2 + i * 1.0);
            const chosen = i === 1 ? seg(t, 6.0, 6.4) : 0;
            d.g.setAttribute("transform", `translate(${d.x}, ${200 - 12 * chosen})`);
            d.g.setAttribute("opacity", a * out * (i !== 1 && t > 6.2 ? 0.45 : 1));
            d.box.setAttribute("stroke", chosen > 0.5 ? GUIDE : "#cfcabe");
          });
          pick.setAttribute("opacity", seg(t, 6.2, 6.6) * out);
          say.setAttribute("opacity", seg(t, 7.2, 7.6) * out);
        }, 8.4);
      },
    };
