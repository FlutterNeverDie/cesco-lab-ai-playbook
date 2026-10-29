export default {
      title: "모델 고르기: 크고 작고, 빠르고 깊고",
      tag: "단순 정리는 가벼운 모델, 복잡한 추론은 깊은 모델을 골라요",
      lead: "모든 일에 가장 크고 비싼 모델을 쓸 필요는 없어요. 업무의 성격에 맞춰 빠르고 가벼운 모델과 깊이 생각하는 모델을 골라 써요.",
      body: `
<h3>모델의 체급과 개성</h3>
<p>AI 모델은 하나의 종류만 있는 게 아니에요.<br>크기와 쓰임새에 따라 <b>다양한 체급</b>이 마련되어 있어요.</p>

<div class="cards">
  <div class="card"><b>가볍고 빠른 소형 모델</b>단어 분류, 맞춤법 교정, 엑셀 서식 통일 등 규칙적인 단순 작업에 적합해요. 속도가 번개처럼 빠르고 비용이 매우 적게 들어요.</div>
  <div class="card"><b>균형 잡힌 중대형 모델</b>보고서 초안 작성, 사내 규정 요약, 기술 문서 번역 등 일상적인 연구실 업무 대부분을 훌륭히 해내요.</div>
  <div class="card"><b>오래 생각하는 추론 모델</b>복잡한 과학적 계산이나 논리적 검증에 강해요. 답을 내놓기 전에 스스로 여러 번 검토하므로 시간이 조금 더 걸려요.</div>
</div>

<h3>일에 맞는 도구를 고르는 안목</h3>
<p>특정 제품 이름이나 가격은 금방 바뀌어요.<br><b>"가벼운 일에는 빠른 모델, 복잡한 생각에는 깊은 모델"</b>이라는 기준만 기억하면 돼요.</p>`,
      lab: "<b>분석 장비 선택</b>과 똑같아요. 단순한 액체 시료의 산도를 잴 때는 간이 pH 시험지나 포터블 측정기를 쓰면 충분하죠. 모든 시료에 초고가 정밀 질량분석기(HR-MS)를 돌리지 않듯이, AI 모델도 업무에 맞게 배정해야 효율적이에요.",
      quiz: {
        q: "수천 건의 이물 접수 제목에서 '금속', '섬유' 같은 단순 키워드를 분류하는 작업에 가장 알맞은 모델은?",
        options: ["답변이 1분 이상 걸리는 가장 비싼 초거대 추론 모델","음악 작곡 전용 모델","가볍고 응답 속도가 빠른 소형 모델"], answer: 2,
        explain: "단순 분류나 형식 정리는 가볍고 빠른 모델을 쓰는 것이 비용과 시간 면에서 훨씬 효율적이에요.",
      },
      scene(api) {
        const s = api.svg();
        // 세 가지 모델 카드 비교
        const models = [
          { name: "소형 경량 모델", sub: "빠름 · 저렴", speed: "100%", cost: "낮음", color: "#2f9e5b", x: 25 },
          { name: "범용 대형 모델", sub: "다재다능", speed: "65%", cost: "보통", color: "#3462c9", x: 145 },
          { name: "심층 추론 모델", sub: "깊은 사고", speed: "30%", cost: "높음", color: "#9a4d0b", x: 265 },
        ];

        const cards = models.map(m => {
          const g = api.n("g", { transform: `translate(${m.x}, 50)` }, s);
          api.n("rect", { x: 0, y: 0, width: 110, height: 160, rx: 8, fill: "#fff", stroke: m.color, "stroke-width": 1.5 }, g);
          api.t(m.name, { x: 55, y: 24, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#23272f" }, g);
          api.t(m.sub, { x: 55, y: 38, "text-anchor": "middle", "font-size": 9.5, fill: "#6b7280" }, g);

          // 속도 게이지
          api.t("속도", { x: 12, y: 65, "font-size": 9, fill: "#6b7280" }, g);
          api.n("rect", { x: 12, y: 72, width: 86, height: 10, rx: 5, fill: "#ece9e1" }, g);
          const bar = api.n("rect", { x: 12, y: 72, width: (86 * parseInt(m.speed)) / 100, height: 10, rx: 5, fill: m.color }, g);

          // 비용 표시
          api.t(`비용: ${m.cost}`, { x: 55, y: 110, "text-anchor": "middle", "font-size": 10, "font-weight": 600, fill: "#23272f" }, g);
          return { g, bar };
        });

        api.t("적재적소: 업무의 복잡도에 맞춰 모델을 선택해요", { x: 200, y: 245, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "#1f3f8a" }, s);

        api.loop(t => {
          t = t % 6;
          const out = 1 - seg(t, 5.4, 5.8);
          cards.forEach((c, idx) => {
            const p = seg(t, 0.4 + idx * 0.4, 0.9 + idx * 0.4);
            c.g.setAttribute("opacity", p * out);
          });
        }, 4);
      },
    };
