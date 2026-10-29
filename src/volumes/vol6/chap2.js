export default {
      title: "지침(System prompt): 일하기 전에 꼭 보는 쪽지",
      tag: "무엇을 시키든, 먼저 이 쪽지를 읽고 시작해요",
      lead: "지침(System prompt)은 AI가 일을 시작할 때마다 먼저 보는 규칙이에요. 출근하면 모니터에 붙어 있는 쪽지 같은 거예요.",
      body: `
<h3>매번, 일하기 전에</h3>
<p>무엇을 시키든 AI는 먼저 지침을 봐요.<br>"아, 이렇게 해야 하는구나" 하고 알고 나서 일을 시작해요. 내가 매번 말하지 않아도 돼요.</p>

<h3>이런 걸 적어요</h3>
<div class="cards">
  <div class="card"><b>말투와 언어</b><q>답은 꼭 한국어로 해 줘.</q></div>
  <div class="card"><b>답하는 순서</b><q>결론부터 말하고, 이유는 그다음에.</q></div>
  <div class="card"><b>일하는 방식</b><q>큰일은 바로 하지 말고, 계획부터 보여 줘.</q></div>
  <div class="card"><b>근거</b><q>공식 문서에 있는 내용으로만 해. 모르면 모른다고 해.</q></div>
</div>

<div class="card"><b>훅(Hooks)이라고도 해요</b>정해진 순간에 자동으로 실행되는 장치를 훅이라고 해요. 일을 시작할 때마다 이 지침을 자동으로 넣어 주도록 훅으로 걸어 두기도 해요.</div>

<h3>짧게, 늘 지킬 것만</h3>
<p>지침에는 <b>어떤 일에든 해당하는 것</b>만 적어요.<br>성적서 쓰는 요령처럼 특정 일에만 필요한 건 다음 장의 스킬로 보내요.</p>`,
      lab: "<b>실험실 문 앞 안내판</b>과 같아요. \"가운, 장갑, 보안경 착용.\" 어떤 실험을 하든 들어갈 때마다 먼저 보고 지키죠. 실험 방법은 거기에 적지 않아요.",
      quiz: {
        q: "다음 중 지침에 적기에 가장 알맞은 것은?",
        options: ["FT-IR 스펙트럼을 읽는 자세한 요령", "이번 달 접수된 성적서 목록", "답은 한국어로, 결론부터 말하기"], answer: 2,
        explain: "지침은 어떤 일을 시키든 늘 지킬 짧은 규칙이에요. 특정 일의 요령은 스킬에, 그때그때 자료는 대화에 넣어요.",
      },
      scene(api) {
        const s = api.svg();
        person(api, s, 62, 214);
        const ask = pill(api, s, 96, 150, "보고서 정리해 줘", INK, 11);
        const ai = bot(api, s, 300, 212, 24);

        // 위에서 떨어지는 쪽지 (지침)
        const note = api.n("g", {}, s);
        api.n("rect", { x: 188, y: 30, width: 196, height: 128, rx: 6, fill: "#fff8d6", stroke: "#e6c84f", "stroke-width": 1.5 }, note);
        api.n("circle", { cx: 286, cy: 30, r: 6, fill: HOOK }, note);
        api.t("지침 · 시작 전 쪽지", { x: 202, y: 54, "font-size": 12, "font-weight": 800, fill: HOOK }, note);
        const ITEMS = ["한국어로 답하기", "결론부터 말하기", "큰일은 계획부터", "공식 문서로만"];
        const checks = ITEMS.map((w, i) => {
          const y = 78 + i * 22;
          api.n("rect", { x: 202, y: y - 11, width: 13, height: 13, rx: 3, fill: "#fff", stroke: HOOK, "stroke-width": 1.5 }, note);
          const ck = api.n("path", { d: `M ${204} ${y - 4} l 3.5 4 l 6 -8`, fill: "none", stroke: HOOK, "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round" }, note);
          api.t(w, { x: 224, y, "font-size": 11, fill: INK }, note);
          return ck;
        });
        const arrow = api.n("path", { d: "M 292 162 L 296 182", stroke: HOOK, "stroke-width": 2, "stroke-dasharray": "3 3", fill: "none" }, s);
        const reply = pill(api, s, 292, 262, "계획부터 보여 드릴게요", HOOK, 11);
        api.t("매번 말 안 해도 돼요", { x: 62, y: 282, "text-anchor": "middle", "font-size": 10, fill: MUTED }, s);

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          ask.setAttribute("opacity", seg(t, 0.3, 0.7) * out);
          const drop = seg(t, 1.3, 1.9);
          note.setAttribute("transform", `translate(0, ${-170 * (1 - drop)})`);
          note.setAttribute("opacity", drop * out);
          arrow.setAttribute("opacity", seg(t, 1.9, 2.1) * out);
          checks.forEach((c, i) => c.setAttribute("opacity", seg(t, 2.3 + i * 0.6, 2.5 + i * 0.6)));
          ai.setAttribute("transform", `translate(300, 212) scale(${1 + 0.06 * Math.sin(seg(t, 4.6, 5.0) * Math.PI)})`);
          reply.setAttribute("opacity", seg(t, 5.0, 5.4) * out);
        }, 6.5);
      },
    };
