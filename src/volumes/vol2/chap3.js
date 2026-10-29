export default {
      title: "프롬프트는 실험 지시서(SOP)처럼",
      tag: "목적과 조건이 채워진 지시서가 정확한 답을 만들어요",
      lead: "AI에게 보내는 질문 문장을 '프롬프트'라고 해요. 표준 작업 지침서(SOP)처럼 구체적으로 지시할수록 엉뚱한 답이 줄어들어요.",
      body: `
<h3>좋은 부탁을 만드는 다섯 가지 항목</h3>
<p>SOP처럼 <b>다섯 가지</b>를 짚어 주면 답이 확 달라져요.</p>
<ol class="steps">
  <li><b>누구로서 (역할)</b><small>"너는 10년 차 식품 이물 분석 전문가야."</small></li>
  <li><b>무엇을 위해 (목적)</b><small>"제조사 품질팀에 전달할 보고서 요약을 쓰려고 해."</small></li>
  <li><b>무엇을 보고 (참고 자료)</b><small>"아래 첨부한 현미경 관찰 기록을 바탕으로 해 줘."</small></li>
  <li><b>어떤 모양으로 (형식)</b><small>"이물 종류, 추정 유입처, 권고 사항을 표로 작성해 줘."</small></li>
  <li><b>꼭 지킬 것 (조건)</b><small>"자료에 없는 내용은 추측하지 말고 모른다고 명시해 줘."</small></li>
</ol>

<h3>대충 한 부탁과 꼼꼼한 부탁</h3>
<div class="cards">
  <div class="card"><b>아쉬운 부탁</b><q>이물 보고서 내용 좀 다듬어 줘.</q>어디에 쓸지 몰라 뜬구름 잡는 글이 나오기 쉬워요.</div>
  <div class="card"><b>좋은 부탁</b><q>식품 제조사에 보낼 성적서야. 검출된 섬유의 재질과 추정 유입 경로를 번호 매겨 3줄로 깔끔하게 요약해 줘.</q></div>
</div>`,
      lab: "<b>SOP (표준 작업 지침서)</b>를 떠올려 보세요. '시료 적당히 녹여서 재 봐'라고 적힌 SOP는 없잖아요. '시료 0.5g을 정밀히 달아 10mL 용매에 녹인 뒤 3회 반복 측정'처럼 구체적이어야 누가 시험해도 재현성 높은 결과가 나와요.",
      quiz: {
        q: "AI에게 지어내기(환각) 없이 정확한 분석 보고서 요약을 요청할 때 가장 좋은 방법은?",
        options: ["역할, 목적, 원본 자료를 제공하고 '자료에 없으면 모른다고 하라'고 적기","최대한 짧고 단순하게 질문하기","답변이 나올 때까지 같은 질문을 계속 연타하기"], answer: 0,
        explain: "SOP처럼 구체적인 조건과 원본 자료를 주고, 없는 내용은 쓰지 말라고 적으면 환각이 크게 줄어요.",
      },
      scene(api) {
        const s = api.svg();
        // 왼쪽 패널: 대충 쓴 지시서
        const lp = api.n("g", { transform: "translate(15, 20)" }, s);
        api.n("rect", { x: 0, y: 0, width: 175, height: 250, rx: 10, fill: "#fff", stroke: "#e4e1d8" }, lp);
        api.t("대충 쓴 지시서", { x: 88, y: 28, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: "#c2410c" }, lp);
        api.n("rect", { x: 12, y: 44, width: 151, height: 38, rx: 6, fill: "#fdeee6" }, lp);
        api.t("“보고서 다듬어 줘”", { x: 20, y: 68, "font-size": 12, fill: "#c2410c" }, lp);

        const badResult = api.n("g", { transform: "translate(12, 100)" }, lp);
        api.n("rect", { x: 0, y: 0, width: 151, height: 130, rx: 6, fill: "#f6f4ee" }, badResult);
        [-8, 12, 32, 52, 72].forEach(y => {
          api.n("line", { x1: 15, y1: y + 25, x2: 136, y2: y + 25, stroke: "#d8d4c9", "stroke-width": 3, "stroke-linecap": "round" }, badResult);
        });
        const badStamp = api.t("원인 모호 · 분량 장황 ✗", { x: 75, y: 115, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#c2410c" }, badResult);

        // 오른쪽 패널: 꼼꼼한 SOP형 지시서
        const rp = api.n("g", { transform: "translate(210, 20)" }, s);
        api.n("rect", { x: 0, y: 0, width: 175, height: 250, rx: 10, fill: "#fff", stroke: "#e4e1d8" }, rp);
        api.t("SOP형 5가지 지시서", { x: 88, y: 28, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: "#0a6b62" }, rp);

        const items = ["1. 역할 부여", "2. 명확한 목적", "3. 근거 자료 첨부", "4. 표 형식 지정", "5. 지어내기 금지"];
        const checks = items.map((it, idx) => {
          const g = api.n("g", { transform: `translate(16, ${50 + idx * 24})` }, rp);
          const box = api.n("rect", { x: 0, y: -12, width: 14, height: 14, rx: 3, fill: "#e3f6f3", stroke: "#0f9b8e" }, g);
          const mark = api.t("✓", { x: 7, y: 0, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: "#0f9b8e", opacity: 0 }, g);
          api.t(it, { x: 22, y: 0, "font-size": 11.5, "font-weight": 600, fill: "#23272f" }, g);
          return { mark };
        });

        const goodResult = api.n("g", { transform: "translate(12, 180)" }, rp);
        api.n("rect", { x: 0, y: 0, width: 151, height: 56, rx: 6, fill: "#e3f5ec", stroke: "#1f8a5b" }, goodResult);
        api.t("깔끔한 3줄 요약 표 완성 ✓", { x: 75, y: 32, "text-anchor": "middle", "font-size": 11.5, "font-weight": 700, fill: "#1f8a5b" }, goodResult);

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          // 체크마크가 하나씩 켜짐
          checks.forEach((c, i) => {
            const chkP = seg(t, 0.5 + i * 0.4, 0.8 + i * 0.4);
            c.mark.setAttribute("opacity", chkP * out);
          });
          const goodP = seg(t, 3.0, 3.8);
          goodResult.setAttribute("opacity", goodP * out);
          goodResult.setAttribute("transform", `translate(12, ${180 + (1 - goodP) * 10})`);
        }, 4);
      },
    };
