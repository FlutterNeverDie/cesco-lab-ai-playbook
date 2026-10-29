BOOKS.push({
  no: 2,
  series: "연구원을 위한 AI 그림책",
  kicker: "TALKING WITH AI",
  title: "AI와 대화 잘하기",
  subtitle: "AI는 한 번에 얼마나 볼 수 있고, 무엇을 기억할까요?<br>실험실 이야기로 컨텍스트와 검색의 비밀을 알아봐요.",
  color: { accent: "#0f9b8e", ink: "#0a6b62", soft: "#e3f6f3" },
  coverTag: "AI의 실험대와 기억의 비밀",
  recapTag: "2권에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    // 중앙 AI 작업대 원형 코어
    api.n("circle", { cx: 200, cy: 150, r: 64, fill: api.accent, opacity: 0.12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 44, fill: api.accent }, s);
    api.t("대화", { x: 200, y: 158, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, s);

    // 주변을 도는 핵심 키워드 말풍선들
    const words = ["컨텍스트 창", "기억의 한계", "SOP 프롬프트", "임베딩 좌표", "FT-IR 검색", "RAG 출처"];
    const chips = words.map(w => {
      const g = api.n("g", {}, s);
      const wdt = w.length * 13 + 22;
      api.n("rect", { x: -wdt / 2, y: -14, width: wdt, height: 28, rx: 14, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, g);
      api.t(w, { x: 0, y: 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "#0a6b62" }, g);
      return g;
    });

    api.loop(t => {
      core.setAttribute("r", 44 + Math.sin(t * 2) * 3);
      chips.forEach((g, i) => {
        const a = t * 0.3 + (i / chips.length) * Math.PI * 2;
        const x = 200 + Math.cos(a) * 145;
        const y = 150 + Math.sin(a) * 100;
        g.setAttribute("transform", `translate(${x},${y})`);
      });
    }, 0);
  },

  chapters: [
    {
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
    },
    {
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
    },
    {
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
    },
    {
      title: "임베딩: 뜻을 좌표로",
      tag: "드래그해서 돌려 보세요 · 뜻이 비슷한 문장은 가까이 모여요",
      lead: "임베딩은 문장을 여러 개의 숫자로 된 좌표로 바꾸는 기술이에요. 글자가 달라도 뜻이 비슷하면 가까운 자리에 놓여요.",
      body: `
<h3>문장을 공간 위의 점으로 바꾸기</h3>
<p>AI는 글의 뜻을 숫자의 위치(좌표)로 이해해요.<br>이 과정을 <b>임베딩(embedding)</b>이라고 불러요.</p>
<p><b>"머리카락 발견"</b>과 <b>"모발 이물 혼입"</b>은 글자가 전혀 다르지만, 뜻이 거의 같아서 3차원 공간에서 <b>서로 아주 가까운 자리</b>에 점이 찍혀요.</p>

<h3>뜻으로 찾는 검색의 비밀</h3>
<p>단어가 글자 그대로 일치하지 않아도, 의미가 통하는 문서를 찾아낼 수 있는 이유가 바로 이 좌표 덕분이에요.</p>
<p>실제 AI는 3차원이 아니라 수백에서 수천 차원의 공간을 쓰지만, <b>"가까운 점을 찾는다"</b>는 원리는 완전히 같아요.</p>

<h3>이 기술이 왜 중요할까요?</h3>
<p>바로 다음 장에서 배울 <b>AI의 자료 찾기(RAG)</b>의 핵심 기술이 되기 때문이에요.</p>`,
      lab: "<b>FT-IR 적외선 분광 스펙트럼 라이브러리 검색</b>과 꼭 닮았어요. 미지의 이물을 측정해 고유한 스펙트럼 파형(지문)을 얻은 뒤, 수만 개의 표준 물질 데이터베이스에서 파형이 가장 닮은 물질을 찾잖아요. 임베딩도 문장을 숫자 지문으로 바꿔서 가장 닮은 문서를 찾아내요.",
      quiz: {
        q: "검색창에 '모발 이물'을 입력했는데 글자가 다른 '머리카락 혼입' 문서가 가장 먼저 검색되었어요. 어떤 원리일까요?",
        options: ["컴퓨터가 오타를 냈기 때문에","두 단어의 글자 수가 우연히 같아서","AI가 문장의 뜻을 좌표로 바꿔 거리를 재는 임베딩 기술 덕분에"], answer: 2,
        explain: "임베딩은 글자가 달라도 의미가 비슷하면 공간에서 가까운 좌표로 만들어 주기 때문에 '뜻'으로 검색할 수 있어요.",
      },
      scene(api) {
        const k = makeThree(api, { distance: 13, tilt: 0.28 });
        if (!k) return;
        const { THREE, world, label } = k;

        // 세 가지 군집 데이터: 모발/섬유(청록), 비닐/플라스틱(주황), 금속(회색)
        const clusters = [
          {
            name: "모발 · 섬유 군집",
            color: 0x0f9b8e,
            center: [-2.6, 1.2, -0.5],
            items: ["머리카락 발견", "모발 혼입 의심", "미세 섬유 조각", "동물 털 추정"],
          },
          {
            name: "비닐 · 플라스틱 군집",
            color: 0xe07a1f,
            center: [2.5, 1.5, 0.4],
            items: ["포장용 비닐", "투명 PE 필름", "플라스틱 파편"],
          },
          {
            name: "금속 군집",
            color: 0x7a828e,
            center: [0.2, -2.2, -0.6],
            items: ["스테인리스 파편", "알루미늄 칩"],
          },
        ];

        // 군집별 구체 노드 및 라벨 배치
        const clusterNodes = [];
        clusters.forEach(c => {
          const mat = new THREE.MeshStandardMaterial({ color: c.color, roughness: 0.4 });
          c.items.forEach((item, idx) => {
            const m = new THREE.Mesh(new THREE.SphereGeometry(0.25, 20, 16), mat);
            const ox = (idx % 2 === 0 ? 0.7 : -0.7) * (idx > 1 ? 0.8 : 1);
            const oy = (idx > 1 ? 0.7 : -0.6);
            const oz = (idx % 3 === 0 ? 0.6 : -0.6);
            m.position.set(c.center[0] + ox, c.center[1] + oy, c.center[2] + oz);
            world.add(m);
            clusterNodes.push({ mesh: m, cluster: c });
          });
          const clb = label(c.name, { size: 0.38, color: "#fff", bg: "rgba(35,39,47,0.75)" });
          clb.position.set(c.center[0], c.center[1] + 1.4, c.center[2]);
          world.add(clb);
        });

        // 새로운 검색 질문 점 (노란색/금색)
        const qMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.32, 24, 20),
          new THREE.MeshStandardMaterial({ color: 0xd9a21b, roughness: 0.2, emissive: 0x664400 })
        );
        world.add(qMesh);
        const qLabel = label("검색어: 검은 털 시료", { size: 0.42, color: "#9a6a00", bg: "rgba(255,246,217,0.95)" });
        world.add(qLabel);

        // 검색어와 모발 군집을 잇는 점선 라인
        const lineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        const matchLine = new THREE.Line(
          lineGeom,
          new THREE.LineDashedMaterial({ color: 0xd9a21b, dashSize: 0.2, gapSize: 0.15, linewidth: 2 })
        );
        matchLine.computeLineDistances();
        world.add(matchLine);

        let last = performance.now();
        api.loop(t => {
          const now = performance.now(), dt = (now - last) / 1000;
          last = now;
          const cycle = t % 7;
          // 검색어 점이 바깥에서 모발 군집 근처로 진입
          const flyP = seg(cycle, 0.5, 2.5);
          const startPos = new THREE.Vector3(0, 3.8, 3.0);
          const targetPos = new THREE.Vector3(-1.8, 0.8, -0.2);
          qMesh.position.lerpVectors(startPos, targetPos, flyP);
          qLabel.position.set(qMesh.position.x, qMesh.position.y - 0.7, qMesh.position.z); // 공 아래에 - 위에 두면 모발 군집 라벨과 겹침

          // 모발 군집 점 하나와 매칭 선 연결
          const hairNode = clusterNodes[0].mesh.position;
          lineGeom.setFromPoints([qMesh.position, hairNode]);
          matchLine.computeLineDistances();
          matchLine.visible = flyP > 0.8;

          k.draw(dt);
        }, 2.5);
      },
    },
    {
      title: "RAG: 자료를 찾아서 같이 넣기",
      tag: "자료를 검색해 실험대에 올려놓고 답을 쓰게 해요",
      lead: "RAG(검색 증강 생성)는 AI가 사내 문서나 전문 자료를 먼저 검색한 뒤, 그 내용을 실험대에 함께 올려놓고 답변하게 만드는 기술이에요.",
      body: `
<h3>RAG의 세 단계 순서</h3>
<ol class="steps">
  <li><b>검색 (Retrieve)</b><small>사내 규정이나 과거 성적서 중에서 질문과 뜻이 가장 가까운 문서 조각을 찾아요. (4장 임베딩)</small></li>
  <li><b>보강 (Augment)</b><small>찾아낸 문서 조각들을 질문과 함께 AI의 실험대에 올려놓아요. (1장 컨텍스트 창)</small></li>
  <li><b>생성 (Generate)</b><small>AI가 올려진 자료를 꼼꼼히 읽고, 출처 번호를 달아 답을 써요.</small></li>
</ol>

<h3>RAG를 쓰면 무엇이 좋을까요?</h3>
<div class="cards">
  <div class="card"><b>학습 이후의 최신 자료 반영</b>학습 기준일(1권 4장) 이후의 규정도 바로 반영할 수 있어요.</div>
  <div class="card"><b>지어내기(환각)가 줄어요</b>주어진 문서를 보고 답해서 꾸며낼 일이 크게 줄어요. 그래도 0은 아니에요.</div>
  <div class="card"><b>정확한 출처 확인</b><q>성적서 4쪽 표 2에 따라 모발 이물로 추정됩니다. [1]</q>처럼 연구원이 눈으로 검증할 수 있어요.</div>
</div>

<h3>주의할 점도 있어요</h3>
<p>엉뚱한 조각을 찾아오면 답도 틀려요.<br>그래서 <b>출처를 눌러 원본을 확인하는 습관</b>이 중요해요.</p>`,
      lab: "<b>참고문헌을 펼쳐 두고 보고서 쓰기</b>와 같아요. 내 기억에만 의존해 쓰면 규격 번호나 수치가 헷갈릴 수 있죠. 최신 공정 시험기준 문헌을 책상 위에 펴 두고 인용 부호 [1], [2]를 달며 작성하면 성적서의 신뢰도가 훨씬 높아져요.",
      quiz: {
        q: "RAG 방식으로 나온 AI의 답변이 이상할 때, 연구원이 가장 먼저 확인해야 할 곳은 어디일까요?",
        options: ["모니터 전원 플러그","AI가 답변에 인용한 출처 문서 조각이 올바른 내용인지","연구소 의자 높이"], answer: 1,
        explain: "RAG는 찾아온 문서 조각을 읽고 답을 쓰므로, 검색된 출처 조각이 엉뚱하거나 부족하지 않은지 먼저 확인해야 해요.",
      },
      scene(api) {
        const s = api.svg();
        // 1. 질문 카드 (위)
        const qBox = api.n("g", { transform: "translate(20, 20)" }, s);
        api.n("rect", { x: 0, y: 0, width: 160, height: 42, rx: 8, fill: "#fff", stroke: "#0f9b8e", "stroke-width": 1.5 }, qBox);
        api.t("질문: 섬유 이물 판정 기준?", { x: 12, y: 26, "font-size": 11.5, "font-weight": 700, fill: "#0a6b62" }, qBox);

        // 2. 사내 문서함 (오른쪽 위)
        const dbBox = api.n("g", { transform: "translate(240, 20)" }, s);
        api.n("rect", { x: 0, y: 0, width: 140, height: 80, rx: 8, fill: "#f6f4ee", stroke: "#cfcabe" }, dbBox);
        api.t("사내 시험 규격 DB", { x: 70, y: 22, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#6b7280" }, dbBox);
        [-6, 12].forEach(y => {
          api.n("rect", { x: 15, y: y + 36, width: 110, height: 14, rx: 3, fill: "#fff", stroke: "#e4e1d8" }, dbBox);
        });

        // 날아오는 관련 조각 2개
        const docPiece1 = api.n("g", {}, s);
        api.n("rect", { x: -40, y: -12, width: 80, height: 24, rx: 5, fill: "#e3f5ec", stroke: "#1f8a5b", "stroke-width": 1.5 }, docPiece1);
        api.t("문서조각 [1]", { x: 0, y: 4, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#1f8a5b" }, docPiece1);

        const docPiece2 = api.n("g", {}, s);
        api.n("rect", { x: -40, y: -12, width: 80, height: 24, rx: 5, fill: "#e3f5ec", stroke: "#1f8a5b", "stroke-width": 1.5 }, docPiece2);
        api.t("문서조각 [2]", { x: 0, y: 4, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#1f8a5b" }, docPiece2);

        // 3. AI 실험대 (가운데)
        const desk = api.n("g", { transform: "translate(20, 120)" }, s);
        api.n("rect", { x: 0, y: 0, width: 360, height: 60, rx: 10, fill: "#e3f6f3", stroke: "#0f9b8e", "stroke-dasharray": "4 3" }, desk);
        api.t("AI 실험대 (질문 + 검색된 조각이 함께 올라옴)", { x: 180, y: 22, "text-anchor": "middle", "font-size": 11.5, "font-weight": 700, fill: "#0a6b62" }, desk);

        // 4. 최종 답변 카드 (아래)
        const ansBox = api.n("g", { transform: "translate(20, 205)" }, s);
        api.n("rect", { x: 0, y: 0, width: 360, height: 75, rx: 10, fill: "#fff", stroke: "#0f9b8e", "stroke-width": 1.8 }, ansBox);
        api.t("답변: 천연 섬유 혼입으로 판정됩니다.", { x: 16, y: 32, "font-size": 13, "font-weight": 700, fill: "#23272f" }, ansBox);
        // 출처 뱃지
        const b1 = api.n("rect", { x: 16, y: 44, width: 90, height: 20, rx: 4, fill: "#e3f5ec" }, ansBox);
        api.t("[1] 시험규격 p.12", { x: 61, y: 58, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#1f8a5b" }, ansBox);
        const b2 = api.n("rect", { x: 115, y: 44, width: 90, height: 20, rx: 4, fill: "#e3f5ec" }, ansBox);
        api.t("[2] 과거성적서 표3", { x: 160, y: 58, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#1f8a5b" }, ansBox);
        // 문서조각은 실험대·답변 카드보다 위에 그림 (먼저 그리면 실험대 상자 뒤로 숨음)
        s.appendChild(docPiece1);
        s.appendChild(docPiece2);

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          // 조각 검색 및 이동
          const pDoc = seg(t, 1.2, 2.8);
          // 두 조각은 문서함의 서로 다른 줄에서 출발해 실험대 양쪽에 내려앉고, 답변이 나올 때까지 남아 있음 (겹치지 않게)
          const p2 = seg(t, 1.6, 3.2);
          docPiece1.setAttribute("transform", `translate(${300 - 180 * pDoc}, ${44 + 121 * pDoc})`);
          docPiece1.setAttribute("opacity", seg(t, 0.8, 1.2) * out);
          docPiece2.setAttribute("transform", `translate(${320 - 40 * p2}, ${76 + 89 * p2})`);
          docPiece2.setAttribute("opacity", seg(t, 1.2, 1.6) * out);

          // 최종 답변 등장
          const pAns = seg(t, 3.4, 4.4);
          ansBox.setAttribute("opacity", pAns * out);
          ansBox.setAttribute("transform", `translate(20, ${205 + (1 - pAns) * 12})`);
        }, 5);
      },
    },
  ],

  recap: {
    title: "2권에서 배운 것",
    points: [
      "AI가 한 번에 다룰 수 있는 글의 분량은 <b>컨텍스트 창(실험대)</b>으로 정해져 있어요.",
      "AI는 대화를 기억하지 않아요. 매번 <b>지금까지의 대화를 통째로</b> 다시 보내는 거예요.",
      "프롬프트는 <b>실험 지시서(SOP)</b>처럼 역할, 목적, 자료, 형식, 조건을 명확히 적어야 해요.",
      "<b>임베딩</b>은 문장의 뜻을 좌표로 바꿔, FT-IR 스펙트럼 검색처럼 뜻으로 찾게 해 줘요.",
      "<b>RAG</b>는 자료를 먼저 검색해 실험대에 올린 뒤 출처를 달아 답변하게 하는 기술이에요.",
    ],
    nextLabel: "3권 예고 · AI가 일을 하게 하기",
    next: "지금까지 AI는 묻는 말에 답만 하는 '상담원'이었어요. 그런데 AI에게 계산기나 엑셀, 사내 검색 엔진 같은 도구를 직접 쥐여주면 어떻게 될까요? AI가 스스로 계획하고 실행하는 '에이전트'의 세계를 3권에서 만나요.",
  },

  recapScene(api) {
    const s = api.svg();
    const items = ["컨텍스트 창", "기억의 비밀", "SOP 지시서", "임베딩 좌표", "RAG 출처"];
    const cards = items.map((w, i) => {
      const g = api.n("g", {}, s);
      api.n("rect", { x: 0, y: 0, width: 200, height: 36, rx: 10, fill: "#fff", stroke: "#e4e1d8" }, g);
      api.t(`${i + 1}`, { x: 18, y: 23, "font-size": 13, "font-weight": 800, fill: api.accent }, g);
      api.t(w, { x: 38, y: 23, "font-size": 14, "font-weight": 600, fill: "#23272f" }, g);
      const ck = api.t("✓", { x: 178, y: 24, "font-size": 16, "font-weight": 800, fill: "#0f9b8e" }, g);
      return { g, ck };
    });

    // 3권 예고 책 표지 (주황색)
    const nextBook = api.n("g", {}, s);
    api.n("rect", { x: 0, y: 0, width: 92, height: 120, rx: 8, fill: "#e07a1f" }, nextBook);
    api.n("rect", { x: 6, y: 0, width: 4, height: 120, fill: "rgba(255,255,255,.35)" }, nextBook);
    api.t("3권", { x: 50, y: 52, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, nextBook);
    api.t("일하게 하기", { x: 50, y: 76, "text-anchor": "middle", "font-size": 11.5, fill: "#fff" }, nextBook);

    api.loop(t => {
      t = t % 9;
      cards.forEach(({ g, ck }, i) => {
        const a = seg(t, 0.2 + i * 0.5, 0.7 + i * 0.5);
        g.setAttribute("transform", `translate(${30 + (1 - a) * -20},${40 + i * 46})`);
        g.setAttribute("opacity", a);
        ck.setAttribute("opacity", seg(t, 3 + i * 0.3, 3.3 + i * 0.3));
      });
      const b = seg(t, 5, 6);
      nextBook.setAttribute("transform", `translate(${280 + (1 - b) * 60},${90}) rotate(${(1 - b) * 12})`);
      nextBook.setAttribute("opacity", b);
    }, 8);
  },
});
