export default {
      title: "좋은 건 적어 두고, 이상하면 \"왜?\"",
      tag: "고른 이유는 스킬과 검증에, 이상한 결과는 원인을 물어서",
      lead: "고른 이유와 고친 점을 그냥 흘려보내지 마세요. 적어 두면 다음 일이 그만큼 좋아져요. 결과가 이상하면 AI에게 왜 그렇게 했는지 물어보세요.",
      body: `
<h3>마음에 든 점은 적어 두기</h3>
<div class="cards">
  <div class="card"><b>B를 고른 이유</b>결론이 첫 줄에 있어서 → 스킬에 "소견 첫 줄에 결론" 한 줄.</div>
  <div class="card"><b>다시 나오면 안 될 것</b>"유입 경로를 짐작해서 씀" → 검증(Harness) 목록에 한 줄.</div>
</div>

<h3>이상하면 "왜 그렇게 했어?"</h3>
<div class="say"><small>나</small>유입 경로를 왜 '제조 공정'이라고 썼어?</div>
<div class="say"><small>AI</small>스킬에 넣어 둔 예시 성적서에 그렇게 적혀 있어서 따라 썼어요.</div>
<p>예시만 고치면 끝나요. AI는 <b>이유를 말해 줘요.</b></p>

<h3>원인은 대개 셋 중 하나</h3>
<ol class="steps">
  <li><b>입력값</b><small>양식에 빈칸이 있거나 애매하게 넣지 않았나?</small></li>
  <li><b>예시</b><small>스킬에 넣은 예시가 잘못돼 있지 않나?</small></li>
  <li><b>규칙</b><small>지침과 스킬의 말이 서로 부딪히지 않나?</small></li>
</ol>`,
      lab: "<b>분석값이 튈 때의 원인 찾기</b>와 같아요. 기기 탓을 하기 전에 시료, 표준물질, 분석 조건을 하나씩 점검하잖아요. AI 결과도 입력, 예시, 규칙을 하나씩 봐요.",
      quiz: {
        q: "AI 결과가 이상할 때 가장 먼저 할 일은?",
        options: ["다른 AI로 바로 바꾼다", "왜 그렇게 했는지 묻고, 입력값과 예시를 점검한다", "스킬을 전부 지우고 처음부터 쓴다"], answer: 1,
        explain: "AI에게 이유를 물으면 원인이 바로 보이는 경우가 많아요. 대개 입력값, 예시, 규칙 중 하나예요.",
      },
      scene(api) {
        const s = api.svg();
        const A = api.accent;
        person(api, s, 40, 66);
        const ai = bot(api, s, 362, 54, 22);
        const ask = pill(api, s, 150, 34, "왜 그렇게 했어?", INK, 11);
        const ans = pill(api, s, 252, 100, "예시에 그렇게 있었어요", A, 10.5);
        // 용의자 셋
        const SUS = ["입력값", "예시", "규칙"];
        const sus = SUS.map((w, i) => {
          const x = 72 + i * 128;
          const g = api.n("g", {}, s);
          const box = api.n("rect", { x: x - 52, y: 140, width: 104, height: 44, rx: 10, fill: "#fff", stroke: "#cfcabe", "stroke-width": 1.8 }, g);
          api.t(w, { x, y: 167, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: INK }, g);
          const mk = api.t("", { x: x + 38, y: 156, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: GUIDE }, g);
          return { box, mk, x };
        });
        const lens = api.n("g", {}, s);
        api.n("circle", { r: 11, fill: "rgba(255,255,255,.6)", stroke: INK, "stroke-width": 2.2 }, lens);
        api.n("line", { x1: 8, y1: 8, x2: 16, y2: 16, stroke: INK, "stroke-width": 3, "stroke-linecap": "round" }, lens);
        // 결과 줄
        const resBox = api.n("rect", { x: 70, y: 220, width: 260, height: 34, rx: 8, fill: "#fff", stroke: BAD, "stroke-width": 2 }, s);
        const res = api.t("유입 경로: 제조 공정 ?", { x: 200, y: 242, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: BAD }, s);
        api.t("결과물", { x: 70, y: 212, "font-size": 9.5, fill: MUTED }, s);
        api.loop(t => {
          t = t % 10;
          const out = 1 - seg(t, 9.4, 9.9);
          ask.setAttribute("opacity", seg(t, 0.6, 1.0) * out);
          ans.setAttribute("opacity", seg(t, 1.8, 2.2) * out);
          ai.setAttribute("transform", `translate(362, 54) rotate(${t > 1.4 && t < 1.9 ? Math.sin(t * 20) * 6 : 0})`);
          // 돋보기: 입력값 → 예시 → 규칙 차례로, 예시에서 빨간불
          const k = t < 3.6 ? 0 : t < 4.8 ? 1 : 2;
          lens.setAttribute("transform", `translate(${sus[k].x + 30 + Math.sin(t * 6) * 3}, 196)`);
          lens.setAttribute("opacity", t > 2.6 && t < 6.0 ? out : 0);
          sus.forEach((sv, i) => {
            const checked = t > 3.4 + i * 1.2;
            const bad = i === 1 && checked && t < 6.4;
            sv.mk.textContent = !checked ? "" : bad ? "✗" : "✓";
            sv.mk.setAttribute("fill", bad ? BAD : GUIDE);
            sv.box.setAttribute("stroke", bad ? BAD : checked ? GUIDE : "#cfcabe");
          });
          const fixed = t > 6.6;
          res.textContent = fixed ? "유입 경로: 확인 불가 ✓" : "유입 경로: 제조 공정 ?";
          res.setAttribute("fill", fixed ? GUIDE : BAD);
          resBox.setAttribute("stroke", fixed ? GUIDE : BAD);
          res.setAttribute("opacity", out); resBox.setAttribute("opacity", out);
        }, 7.6);
      },
    };
