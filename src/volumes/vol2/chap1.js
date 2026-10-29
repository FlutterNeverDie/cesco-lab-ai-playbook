export default {
      title: "컨텍스트 창: AI의 실험대",
      tag: "실험대가 가득 차면 오래된 시약병부터 밀려나요",
      lead: "AI가 한 번에 올려놓고 볼 수 있는 글의 분량을 '컨텍스트 창'이라고 해요. 실험대 면적이 정해져 있는 것과 같아요.",
      body: `
<h3>정해진 크기의 실험대</h3>
<p>AI가 한 번에 읽고 생각할 수 있는 글의 양은 정해져 있어요.<br>이 분량도 1권 2장에서 배운 <b>토큰</b> 단위로 계산해요.</p>
<p>내 질문, 첨부한 보고서, 지금까지 나눈 대화, 그리고 AI가 쓸 답변까지 <b>모두 같은 실험대</b>에 함께 올라가요.</p>

<h3>실험대가 꽉 차면 어떻게 될까요?</h3>
<ol class="steps">
  <li>한도를 넘기면 앱에 따라 <b>오래된 대화를 잘라 내거나 줄여서</b> 담아요.</li>
  <li>긴 대화 중간에 AI가 처음 정했던 규칙을 <b>깜빡 잊는 이유</b>가 바로 이 때문이에요.</li>
</ol>

<h3>실험대를 깔끔하게 쓰는 요령</h3>
<div class="cards">
  <div class="card"><b>주제가 바뀌면 새 대화창 열기</b>실험대를 깨끗이 치우는 것과 같아요.</div>
  <div class="card"><b>중요한 조건은 다시 짚어 주기</b><q>앞서 말했듯이 이번에도 3줄 이내 표로 정리해 줘.</q></div>
  <div class="card"><b>필요한 자료만 추려 올리기</b>두꺼운 규정집 대신 필요한 쪽만 올려요.</div>
</div>`,
      lab: "<b>실험대 면적</b>과 똑같아요. 연구소 실험대 위에 온갖 시약병과 기구를 끝없이 올려둘 수는 없잖아요. 이번 이물 분석에 당장 쓸 시약과 도구만 골라 올려야 병이 쏟아지거나 실험이 엉키지 않아요.",
      quiz: {
        q: "긴 대화 도중에 AI가 처음에 부탁했던 규칙을 잊어버렸어요. 가장 그럴듯한 이유는요?",
        options: ["AI가 지쳐서 쉬고 싶어서","인터넷 선에 먼지가 쌓여서","실험대(컨텍스트 창)가 가득 차서 앞쪽 대화가 밀려났기 때문에"], answer: 2,
        explain: "컨텍스트 창 크기에는 한계가 있어서, 대화가 길어지면 앞쪽 내용이 밀려나 잊힐 수 있어요. 주제가 바뀌면 새 대화창을 여는 것이 좋아요.",
      },
      scene(api) {
        const s = api.svg();
        // 상단 컨텍스트 게이지
        api.t("실험대 여유 공간 (컨텍스트 창)", { x: 20, y: 30, "font-size": 12, fill: "#6b7280" }, s);
        api.n("rect", { x: 20, y: 40, width: 360, height: 18, rx: 9, fill: "#e2dfd7" }, s);
        const bar = api.n("rect", { x: 20, y: 40, width: 0, height: 18, rx: 9, fill: api.accent }, s);
        const gaugeText = api.t("0%", { x: 340, y: 32, "font-size": 12, "font-weight": 700, fill: "#0a6b62" }, s);

        // 하단 실험대 테이블
        api.n("rect", { x: 24, y: 220, width: 352, height: 14, rx: 4, fill: "#b9b4a8" }, s);
        api.n("rect", { x: 44, y: 234, width: 14, height: 44, fill: "#cfcabe" }, s);
        api.n("rect", { x: 342, y: 234, width: 14, height: 44, fill: "#cfcabe" }, s);

        // 시약병들 (오래된 대화 -> 최신 대화)
        const bottlesData = [
          { name: "첫 인사", color: "#88c2b9", h: 56, x: 50 },
          { name: "질문 1", color: "#5bb2a4", h: 70, x: 120 },
          { name: "보고서 첨부", color: "#2ea190", h: 90, x: 200 },
          { name: "새 질문", color: "#0f9b8e", h: 76, x: 280 },
        ];

        const bottles = bottlesData.map(d => {
          const g = api.n("g", {}, s);
          // 시약병 목과 뚜껑
          api.n("rect", { x: -8, y: -d.h - 14, width: 16, height: 14, rx: 3, fill: "#4d5b63" }, g);
          // 시약병 본체
          api.n("rect", { x: -24, y: -d.h, width: 48, height: d.h, rx: 10, fill: d.color }, g);
          // 라벨
          api.n("rect", { x: -19, y: -d.h + 12, width: 38, height: 26, rx: 4, fill: "#ffffff", opacity: 0.9 }, g);
          api.t(d.name, { x: 0, y: -d.h + 29, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: "#23272f" }, g);
          return { g, ...d };
        });

        // 밖으로 떨어지는 효과 알림
        const warn = api.t("맨 앞 내용 밀려남!", { x: 60, y: 110, "font-size": 12, "font-weight": 700, fill: "#e2483d", opacity: 0 }, s);

        api.loop(t => {
          t = t % 8;
          const p1 = seg(t, 0.4, 1.2);
          const p2 = seg(t, 1.6, 2.4);
          const p3 = seg(t, 2.8, 3.8);
          const p4 = seg(t, 4.2, 5.2);
          const drop = seg(t, 5.4, 6.2);
          const out = 1 - seg(t, 7.4, 7.9);

          // 게이지 채우기
          const gaugeVal = clamp(p1 * 0.25 + p2 * 0.25 + p3 * 0.35 + p4 * 0.35 - drop * 0.2);
          bar.setAttribute("width", 360 * gaugeVal);
          gaugeText.textContent = Math.round(gaugeVal * 100) + "%";

          // 시약병 1~4 올라오기
          const ps = [p1, p2, p3, p4];
          bottles.forEach((b, i) => {
            let by = 220;
            let bx = b.x;
            let op = ps[i] * out;

            if (i === 0 && drop > 0) {
              bx = b.x - drop * 40;
              by = 220 + drop * 60;
              op = (1 - drop) * out;
            }
            b.g.setAttribute("transform", `translate(${bx},${by - (1 - ps[i]) * 50})`);
            b.g.setAttribute("opacity", op);
          });

          warn.setAttribute("opacity", drop * (1 - seg(t, 6.6, 7.2)) * out);
        }, 5.5);
      },
    };
