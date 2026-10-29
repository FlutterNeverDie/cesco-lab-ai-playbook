export default {
      title: "AI 답 검증하기 (재현성 시험)",
      tag: "같은 질문을 다시 묻고 원본 문서와 크로스 체크해요",
      lead: "1권 3장에서 배운 '온도' 때문에 AI는 같은 질문에도 답이 조금씩 달라져요. 중요한 수치는 반드시 재현되는지 검증해야 해요.",
      body: `
<h3>답이 매번 조금씩 달라지는 이유</h3>
<p>AI는 단어를 확률로 골라 이어 붙이기 때문에(1권 3장),<br>같은 질문을 던져도 표현이나 숫자가 조금씩 달라질 수 있어요.</p>
<p>한 번 그럴듯하게 대답했다고 해서 <b>곧바로 참이라고 믿으면 안 돼요.</b></p>

<h3>재현성을 확인하는 세 가지 방법</h3>
<ol class="steps">
  <li><b>출처 확인하기</b><small>"그 숫자가 원본 보고서 몇 쪽 몇 번째 줄에 나와 있어?"</small></li>
  <li><b>새 대화창에서 다시 묻기</b><small>새 창(2권 2장)에서 같은 질문을 던져도 일치하는지 비교해요.</small></li>
  <li><b>AI에게 스스로 비판하게 하기</b><small>"네가 방금 쓴 답변에서 틀렸을 가능성이 있는 부분을 짚어 줘."</small></li>
</ol>

<h3>실제로 해 보면</h3>
<div class="say"><small>물어보기</small>"이 성적서에서 이물 길이가 얼마야?" → "12mm예요."</div>
<div class="say"><small>출처 묻기</small>"원문 어디에 있어?" → "첫 문단, '길이 12mm'예요." 원문을 열어 같은지 봐요.</div>
<div class="say"><small>답이 갈리면</small>새 창에서는 "25mm"라고 한다면? AI 말 대신 원본을 직접 열어 확인해요.</div>

<h3>다른 AI와의 교차 검증</h3>
<p>매우 중요한 분석 결론이라면, 다른 AI 모델에 같은 질문을 넣어 답이 일치하는지 <b>교차 검증(Cross-check)</b>하는 것도 좋은 방법이에요.</p>`,
      lab: "<b>분석 화학의 재현성 시험(Repeatability)</b>과 꼭 닮았어요. 분석 기기에서 한 번 나온 피크 면적값은 결과가 아니죠. 최소 3회 이상 반복 측정하여 상대표준편차(RSD)를 확인하듯, AI 답변도 재현성을 시험해 보아야 신뢰할 수 있어요.",
      quiz: {
        q: "중요한 이물 판정 규격 수치를 AI에게 세 번 물었는데, 세 번 모두 다른 숫자를 말했어요. 어떻게 해야 할까요?",
        options: ["세 숫자의 평균값을 대충 계산해서 적는다","가장 그럴듯해 보이는 숫자를 감으로 고른다","AI 답변을 믿지 말고 공인 원본 규격집을 직접 펼쳐 확인한다"], answer: 2,
        explain: "세 번의 답변이 갈린다는 것은 AI가 확신 없이 환각을 일으키고 있다는 강한 신호예요. 원본 규격집을 사람이 직접 확인해야 해요.",
      },
      scene(api) {
        const s = api.svg();
        // 3개의 시험관 형태 답변 비교
        const runs = [
          { no: "1회차 질문", val: "길이 12mm", ok: true },
          { no: "2회차 질문", val: "길이 12mm", ok: true },
          { no: "3회차 질문", val: "길이 25mm ✗", ok: false },
        ];

        const cards = runs.map((r, i) => {
          const g = api.n("g", { transform: `translate(${30 + i * 120}, 50)` }, s);
          api.n("rect", { x: 0, y: 0, width: 100, height: 120, rx: 8, fill: "#fff", stroke: r.ok ? "#3a9a4a" : "#c2410c", "stroke-width": 1.5 }, g);
          api.t(r.no, { x: 50, y: 26, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#6b7280" }, g);
          api.n("rect", { x: 10, y: 45, width: 80, height: 35, rx: 5, fill: r.ok ? "#e8f5e9" : "#fdeee6" }, g);
          api.t(r.val, { x: 50, y: 67, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: r.ok ? "#24692f" : "#c2410c" }, g);
          const badge = api.t(r.ok ? "일치 ✓" : "불일치 경고!", { x: 50, y: 104, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: r.ok ? "#24692f" : "#c2410c" }, g);
          return { g, badge };
        });

        // 하단 원본 대조 돋보기 창
        const checkBar = api.n("g", { transform: "translate(30, 200)" }, s);
        api.n("rect", { x: 0, y: 0, width: 340, height: 45, rx: 8, fill: "#fdf0e3", stroke: "#e07a1f", "stroke-width": 1.5 }, checkBar);
        api.t("🔍 원본 성적서 재대조: 실제 규격은 '12mm'로 확인", { x: 170, y: 28, "text-anchor": "middle", "font-size": 11.5, "font-weight": 800, fill: "#9a4d0b" }, checkBar);

        api.loop(t => {
          t = t % 7.5;
          const out = 1 - seg(t, 7.0, 7.4);
          cards.forEach((c, idx) => {
            const p = seg(t, 0.5 + idx * 0.8, 1.2 + idx * 0.8);
            c.g.setAttribute("opacity", p * out);
            c.g.setAttribute("transform", `translate(${30 + idx * 120}, ${50 + (1 - p) * 15})`);
          });

          const pBar = seg(t, 3.6, 4.6);
          checkBar.setAttribute("opacity", pBar * out);
        }, 5);
      },
    };
