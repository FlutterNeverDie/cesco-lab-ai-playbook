export default {
      title: "AI는 기억이 없어요",
      tag: "매번 지금까지의 대화를 편지에 통째로 담아 보내요",
      lead: "AI는 어제의 대화를 기억하지 못해요. 우리가 새 말을 걸 때마다, 대화 앱이 지금까지의 이야기를 봉투에 전부 다시 담아 보내 주기 때문이에요.",
      body: `
<h3>매번 백지가 되는 AI</h3>
<p>AI 모델 자체는 대화를 저장하지 않아요.<br>답을 한 번 쓰고 나면 머릿속이 <b>하얗게 백지</b>로 돌아가요.</p>
<p>그래서 새 대화창을 열면, 방금 전까지 이야기했던 사람이라는 것도 전혀 알지 못해요.</p>

<h3>점점 두꺼워지는 편지 봉투</h3>
<p>대화가 계속 이어지는 것처럼 느껴지는 비밀은 <b>대화 앱</b>에 있어요.</p>
<ol class="steps">
  <li>내가 질문을 입력하면, 앱이 <b>이전 질문과 답들을 모두 모아요.</b></li>
  <li>이 모든 내용을 <b>하나의 두꺼운 편지 봉투</b>에 담아 보내면, AI는 <b>마치 기억하는 것처럼</b> 답해요.</li>
</ol>

<h3>학습과 대화는 완전히 달라요</h3>
<div class="cards">
  <div class="card"><b>학습 (1권 4장)</b>신경망의 다이얼을 영구적으로 돌려 맞추는 일이에요.</div>
  <div class="card"><b>대화</b>편지 봉투를 읽고 답장만 쓰는 일이에요. 다이얼은 하나도 변하지 않아요.</div>
  <div class="card"><b>서비스의 메모리 기능</b>AI가 기억하는 게 아니라, 앱이 따로 수첩에 적어 두었다가 새 편지 봉투에 자동으로 끼워 넣는 거예요.</div>
</div>`,
      lab: "<b>교대 근무 인수인계 노트</b>와 똑같아요. 다음 날 출근한 교대 연구원은 내 머릿속을 직접 들여다볼 수 없죠. 인수인계 노트에 적힌 글만 보고 시험을 이어가요. 새 대화창을 여는 것은 아무것도 적히지 않은 새 노트를 건네는 것과 같아요.",
      quiz: {
        q: "어제 대화창에서 시료 번호를 알려 주었는데, 오늘 새 대화창을 열고 '어제 그 시료 번호 뭐였지?'라고 물으면 AI는 어떻게 반응할까요?",
        options: ["어제 일을 잘 기억해서 바로 알려준다","새 대화창에는 이전 대화가 들어있지 않아 알지 못한다","연구원의 이름을 검색해서 찾아낸다"], answer: 1,
        explain: "AI 자체는 대화를 저장하지 않아요. 새 대화창은 이전 편지가 들어가지 않은 백지 상태라서 어제 나눈 이야기를 모른답니다.",
      },
      scene(api) {
        const s = api.svg();
        // 사람 아이콘 (왼쪽)
        const userG = api.n("g", { transform: "translate(70, 150)" }, s);
        api.n("circle", { cx: 0, cy: -20, r: 18, fill: "#cfcabe" }, userG);
        api.n("path", { d: "M -26 24 C -26 -4, 26 -4, 26 24 Z", fill: "#cfcabe" }, userG);
        api.t("연구원", { x: 0, y: 44, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "#23272f" }, userG);

        // AI 아이콘 (오른쪽)
        const aiG = api.n("g", { transform: "translate(330, 150)" }, s);
        const aiCircle = api.n("circle", { cx: 0, cy: 0, r: 28, fill: api.accent }, aiG);
        api.t("AI", { x: 0, y: 7, "text-anchor": "middle", "font-size": 17, "font-weight": 800, fill: "#fff" }, aiG);
        api.t("머릿속 백지", { x: 0, y: 44, "text-anchor": "middle", "font-size": 11, fill: "#6b7280" }, aiG);

        // 편지 봉투
        const env = api.n("g", {}, s);
        const envBody = api.n("rect", { x: -24, y: -16, width: 48, height: 32, rx: 6, fill: "#fff", stroke: "#0a6b62", "stroke-width": 2 }, env);
        api.n("path", { d: "M -24 -16 L 0 4 L 24 -16", fill: "none", stroke: "#0a6b62", "stroke-width": 1.5 }, env);
        const envLabel = api.t("1차 편지", { x: 0, y: 26, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#0a6b62" }, env);

        // AI 머릿속 리셋 물결 효과
        const flash = api.n("circle", { cx: 330, cy: 150, r: 38, fill: "none", stroke: "#0f9b8e", "stroke-width": 3, opacity: 0 }, s);

        api.loop(t => {
          t = t % 9;
          const round1 = t < 4.2;
          const out = 1 - seg(t, 8.4, 8.9);

          if (round1) {
            // 1회차: 얇은 편지 이동
            const p = seg(t, 0.4, 2.0);
            const ret = seg(t, 2.4, 3.8);
            envBody.setAttribute("width", 48);
            envBody.setAttribute("x", -24);
            envLabel.textContent = "1차 대화";

            if (ret === 0) {
              env.setAttribute("transform", `translate(${70 + (330 - 70) * p}, 130)`);
              env.setAttribute("opacity", (1 - seg(t, 1.9, 2.2)) * out);
            } else {
              env.setAttribute("transform", `translate(${330 - (330 - 70) * ret}, 170)`);
              env.setAttribute("opacity", (1 - seg(t, 3.6, 4.0)) * out);
            }

            // AI가 답하고 머릿속 비워짐
            const fl = seg(t, 2.0, 2.5);
            flash.setAttribute("opacity", Math.sin(fl * Math.PI) * out);
            flash.setAttribute("r", 30 + fl * 20);
          } else {
            // 2회차: 누적되어 두꺼워진 편지 이동
            const p2 = seg(t, 4.5, 6.2);
            envBody.setAttribute("width", 64);
            envBody.setAttribute("x", -32);
            envLabel.textContent = "누적된 대화 전체!";

            env.setAttribute("transform", `translate(${70 + (330 - 70) * p2}, 140)`);
            env.setAttribute("opacity", (1 - seg(t, 6.1, 6.5)) * out);

            const fl2 = seg(t, 6.3, 6.8);
            flash.setAttribute("opacity", Math.sin(fl2 * Math.PI) * out);
            flash.setAttribute("r", 30 + fl2 * 20);
          }
        }, 1.8);
      },
    };
