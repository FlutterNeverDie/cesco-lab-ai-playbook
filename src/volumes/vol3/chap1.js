export default {
      title: "도구 사용: AI는 부탁하고 프로그램이 실행해요",
      tag: "AI는 요청 쪽지를 쓰고 실제 실행은 외부 도구가 해요",
      lead: "AI는 원래 글자만 만들 수 있어요. 복잡한 계산이나 파일 검색은 바깥에 있는 계산기나 검색 프로그램에 '부탁'해서 실행해요.",
      body: `
<h3>글만 쓰는 AI에게 손발 달아 주기</h3>
<p>언어 모델(LLM)은 글자의 확률만 다룰 뿐,<br>긴 계산은 틀리기 쉽고, 혼자서는 인터넷에 들어갈 수도 없어요.</p>
<p>대신 AI는 <b>"계산기 프로그램아, 0.52 곱하기 3을 계산해 줘"</b>라는 정교한 <b>요청 쪽지(함수 호출)</b>를 작성할 수 있어요.</p>

<h3>도구를 쓰는 세 단계 순서</h3>
<ol class="steps">
  <li><b>도구 필요성 판단</b><small>"이 수식은 내가 직접 풀지 말고 계산기 도구를 써야겠어."</small></li>
  <li><b>요청 쪽지 전달</b><small>바깥 프로그램에 필요한 숫자나 검색어를 정확한 형식으로 보내요.</small></li>
  <li><b>결과를 받아 답변 완성</b><small>도구가 돌려준 결괏값 "1.56"을 읽고 자연스러운 문장으로 답해요.</small></li>
</ol>

<h3>도구 목록은 어디서 알까요?</h3>
<p>AI가 쓸 수 있는 도구의 종류와 사용법은<br>대화가 시작될 때 <b>실험대(컨텍스트 창)</b>에 미리 적어 둔답니다.</p>`,
      lab: "<b>시험 장비 가동 의뢰서</b>와 같아요. 연구원이 복잡한 고분자 분자량을 머릿속으로 계산하거나 직접 장비 회로를 만지지 않죠. 표준 시험 의뢰서를 작성해 장비 컴퓨터에 넘겨주면, 실제 분석은 장비가 돌리고 결과 시트를 연구원에게 가져다주잖아요.",
      quiz: {
        q: "AI에게 '시료 15개의 평균 무게를 소수점 셋째 자리까지 구해 줘'라고 했을 때, 실제로 사칙연산을 수행하는 쪽은 어디일까요?",
        options: ["AI 모델 자체의 기억 장치","외부 계산기 프로그램이나 파이썬 연산기","모니터 화면의 화소들"], answer: 1,
        explain: "AI는 계산 요청 쪽지만 만들고, 오차 없는 실제 수학 계산은 연결된 외부 계산 도구가 처리해요.",
      },
      scene(api) {
        const s = api.svg();
        // 1. AI 아이콘 (왼쪽)
        const aiG = api.n("g", { transform: "translate(60, 150)" }, s);
        api.n("circle", { cx: 0, cy: 0, r: 26, fill: api.accent }, aiG);
        api.t("AI", { x: 0, y: 7, "text-anchor": "middle", "font-size": 16, "font-weight": 800, fill: "#fff" }, aiG);
        api.t("요청 쪽지 작성", { x: 0, y: 40, "text-anchor": "middle", "font-size": 11, fill: "#6b7280" }, aiG);

        // 2. 외부 계산 도구 (오른쪽)
        const calcG = api.n("g", { transform: "translate(320, 150)" }, s);
        api.n("rect", { x: -36, y: -44, width: 72, height: 88, rx: 8, fill: "#f6f4ee", stroke: "#cfcabe", "stroke-width": 2 }, calcG);
        // 계산기 화면
        api.n("rect", { x: -28, y: -36, width: 56, height: 22, rx: 4, fill: "#e3f5ec", stroke: "#9fd6bd" }, calcG);
        const calcScreen = api.t("1.56", { x: 22, y: -21, "text-anchor": "end", "font-size": 13, "font-weight": 800, fill: "#1f8a5b" }, calcG);
        // 계산기 버튼들
        [-4, 16].forEach(y => {
          [-18, 0, 18].forEach(x => {
            api.n("rect", { x: x - 6, y: y - 6, width: 12, height: 12, rx: 2, fill: "#e4e1d8" }, calcG);
          });
        });
        api.t("계산기 도구", { x: 0, y: 58, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#23272f" }, calcG);

        // 3. 오가는 요청 쪽지와 결과 쪽지
        const reqNote = api.n("g", {}, s);
        api.n("rect", { x: -45, y: -14, width: 90, height: 28, rx: 6, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, reqNote);
        api.t("0.52 × 3 = ?", { x: 0, y: 4, "text-anchor": "middle", "font-size": 11.5, "font-weight": 700, fill: api.accent }, reqNote);

        const resNote = api.n("g", {}, s);
        api.n("rect", { x: -45, y: -14, width: 90, height: 28, rx: 6, fill: "#e3f5ec", stroke: "#1f8a5b", "stroke-width": 1.5 }, resNote);
        api.t("결과: 1.56", { x: 0, y: 4, "text-anchor": "middle", "font-size": 11.5, "font-weight": 700, fill: "#1f8a5b" }, resNote);

        // 4. 최종 답변 말풍선 (위쪽)
        const finalAns = api.n("g", { transform: "translate(60, 50)" }, s);
        api.n("rect", { x: -10, y: 0, width: 200, height: 38, rx: 8, fill: "#fff", stroke: "#e4e1d8" }, finalAns);
        api.t("“계산 결과는 1.56g입니다.”", { x: 90, y: 24, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "#23272f" }, finalAns);

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);

          // 요청 쪽지 AI -> 계산기
          const p1 = seg(t, 0.6, 2.2);
          reqNote.setAttribute("transform", `translate(${60 + (320 - 60) * p1}, 125)`);
          reqNote.setAttribute("opacity", (1 - seg(t, 2.1, 2.4)) * out);

          // 계산기 번쩍임
          const pCalc = seg(t, 2.3, 3.2);
          calcScreen.setAttribute("opacity", pCalc * out);

          // 결과 쪽지 계산기 -> AI
          const p2 = seg(t, 3.2, 4.8);
          resNote.setAttribute("transform", `translate(${320 - (320 - 60) * p2}, 175)`);
          resNote.setAttribute("opacity", (p2 > 0 && p2 < 1 ? 1 : 0) * out);

          // 최종 문장 등장
          const pAns = seg(t, 5.0, 5.8);
          finalAns.setAttribute("opacity", pAns * out);
        }, 5);
      },
    };
