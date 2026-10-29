BOOKS.push({
  no: 5,
  series: "연구원을 위한 AI 그림책",
  kicker: "AI AND THE FUTURE LAB",
  title: "AI가 보는 세상과 앞으로",
  subtitle: "AI는 이제 글뿐 아니라 현미경 사진도 함께 봐요.<br>변화하는 시대 속에서 연구원이 가질 진짜 무기를 이야기해요.",
  color: { accent: "#3462c9", ink: "#1f3f8a", soft: "#e8eefb" },
  coverTag: "AI의 눈과 연구원의 미래",
  recapTag: "5권에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    // 중앙 AI 코어
    api.n("circle", { cx: 200, cy: 150, r: 64, fill: api.accent, opacity: 0.12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 44, fill: api.accent }, s);
    api.t("미래", { x: 200, y: 158, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, s);

    // 주변 키워드들 (멀티모달, 사진 판독, 모델 선택, 연구원의 책임, 지휘자)
    const keywords = ["멀티모달", "현미경 사진", "체급별 모델", "연구원의 책임", "지휘자 연구원"];
    const chips = keywords.map(w => {
      const g = api.n("g", {}, s);
      const wdt = w.length * 13 + 22;
      api.n("rect", { x: -wdt / 2, y: -14, width: wdt, height: 28, rx: 14, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, g);
      api.t(w, { x: 0, y: 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "#1f3f8a" }, g);
      return g;
    });

    api.loop(t => {
      core.setAttribute("r", 44 + Math.sin(t * 2) * 3);
      chips.forEach((g, i) => {
        const a = t * 0.35 + (i / chips.length) * Math.PI * 2;
        const x = 200 + Math.cos(a) * 145;
        const y = 150 + Math.sin(a) * 100;
        g.setAttribute("transform", `translate(${x},${y})`);
      });
    }, 0);
  },

  chapters: [
    {
      title: "멀티모달: AI가 사진을 보는 법",
      tag: "사진도 작은 격자 조각으로 잘라 숫자 토큰처럼 읽어요",
      lead: "요즘 AI는 글자뿐 아니라 현미경 사진, 도표, 그래프까지 함께 이해해요. 이런 능력을 '멀티모달'이라고 불러요.",
      body: `
<h3>눈과 귀가 생긴 AI</h3>
<p>글자만 읽던 언어 모델에 시각 능력이 더해졌어요.<br>사진이나 음성처럼 여러 형태의 정보를 한꺼번에 받아들이는 기술을 <b>멀티모달(Multimodal)</b>이라고 해요.</p>

<h3>사진을 숫자로 바꾸는 순서</h3>
<ol class="steps">
  <li>사진을 바둑판 모양의 <b>작은 격자 조각(패치)</b>으로 잘라요.</li>
  <li>조각마다 색상과 명암을 <b>숫자 묶음</b>으로 바꿔요.</li>
  <li>이 숫자 묶음을 1권 2장에서 배운 <b>토큰</b>처럼 글자와 한 줄에 세워 함께 읽어요.</li>
</ol>

<h3>연구실에서 이런 일을 도울 수 있어요</h3>
<div class="cards">
  <div class="card"><b>현미경 관찰 기록 묘사</b>사진 속 이물의 형태와 색상, 대략적인 특징을 글로 설명해 줘요.</div>
  <div class="card"><b>시험 그래프와 표 판독</b>측정 장비 화면이나 논문 속 그래프의 추세를 읽어 줘요.</div>
  <div class="card"><b>사진 속 글자 추출</b>성적서 스캔본이나 라벨 사진에서 글자를 읽어 텍스트로 바꿔 줘요.</div>
</div>`,
      lab: "<b>현미경 관찰 시 육안 소견 기록</b>과 같아요. 연구원이 접안렌즈로 시료를 보고 '무색투명한 선형 섬유, 직경 약 15μm'라고 실험 노트에 스케치하고 글로 적잖아요. AI도 사진의 격자 조각들을 보고 특징을 텍스트로 묘사해 내는 거예요.",
      quiz: {
        q: "멀티모달 AI가 현미경 사진을 이해하는 기본 원리는 무엇일까요?",
        options: ["컴퓨터 화면 안에 작은 돋보기 렌즈가 들어있어서","사진을 작은 바둑판 격자 조각으로 잘라 숫자 토큰처럼 처리한다","사진을 인화해서 종이 무게를 측정한다"], answer: 1,
        explain: "AI는 사진도 작은 격자 조각(패치)들로 쪼갠 뒤 숫자로 변환하여 글자 토큰과 비슷한 방식으로 처리해요.",
      },
      scene(api) {
        const s = api.svg();
        // 1. 현미경 사진 원형 프레임 (왼쪽)
        const photoG = api.n("g", { transform: "translate(40, 50)" }, s);
        api.n("circle", { cx: 60, cy: 60, r: 58, fill: "#fdfcf9", stroke: "#cfcabe", "stroke-width": 2 }, photoG);
        // 섬유 이물 그림 (곡선 라인)
        api.n("path", { d: "M 25 35 Q 60 40 70 85 T 100 95", fill: "none", stroke: "#3462c9", "stroke-width": 4, "stroke-linecap": "round" }, photoG);
        api.t("현미경 시야", { x: 60, y: 135, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#6b7280" }, photoG);

        // 2. 바둑판 격자 분할선
        const gridG = api.n("g", { transform: "translate(40, 50)", opacity: 0 }, s);
        for (let i = 1; i < 4; i++) {
          api.n("line", { x1: i * 30, y1: 0, x2: i * 30, y2: 120, stroke: "#3462c9", "stroke-width": 1, "stroke-dasharray": "2 2" }, gridG);
          api.n("line", { x1: 0, y1: i * 30, x2: 120, y2: i * 30, stroke: "#3462c9", "stroke-width": 1, "stroke-dasharray": "2 2" }, gridG);
        }

        // 3. 날아가는 이미지 토큰 조각들
        const patches = Array.from({ length: 4 }).map((_, i) => {
          const g = api.n("g", {}, s);
          api.n("rect", { x: -14, y: -14, width: 28, height: 28, rx: 4, fill: "#e8eefb", stroke: "#3462c9", "stroke-width": 1.5 }, g);
          api.t(`P${i + 1}`, { x: 0, y: 5, "text-anchor": "middle", "font-size": 10, "font-weight": 700, fill: "#1f3f8a" }, g);
          return g;
        });

        // 4. 오른쪽 AI 입력 큐 (토큰 줄)
        const qG = api.n("g", { transform: "translate(240, 60)" }, s);
        api.n("rect", { x: 0, y: 0, width: 140, height: 160, rx: 10, fill: "#fff", stroke: "#3462c9", "stroke-width": 1.5 }, qG);
        api.t("AI 입력 토큰 줄", { x: 70, y: 24, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#1f3f8a" }, qG);
        api.n("rect", { x: 15, y: 40, width: 110, height: 24, rx: 4, fill: "#f1ecff" }, qG);
        api.t("글자: “이 사진은”", { x: 70, y: 56, "text-anchor": "middle", "font-size": 10, fill: "#3f2a9e" }, qG);

        api.loop(t => {
          t = t % 7.5;
          const out = 1 - seg(t, 7.0, 7.4);

          // 격자 켜짐
          const pGrid = seg(t, 0.8, 1.8);
          gridG.setAttribute("opacity", pGrid * out);

          // 조각들이 오른쪽으로 날아감
          patches.forEach((p, idx) => {
            const pFly = seg(t, 2.0 + idx * 0.4, 3.2 + idx * 0.4);
            const sx = 100, sy = 110;
            const tx = 270, ty = 145 + (idx % 2) * 35;
            p.setAttribute("transform", `translate(${sx + (tx - sx) * pFly}, ${sy + (ty - sy) * pFly})`);
            p.setAttribute("opacity", (pFly > 0 ? 1 : 0) * out);
          });
        }, 5);
      },
    },
    {
      title: "이물 사진 판독에 쓰기, 그리고 한계",
      tag: "겉모습은 좋은 가설이지만, 확정은 정밀 기기 분석으로 해요",
      lead: "AI는 사진만 보고 성분을 100% 확정할 수 없어요. 시각적 환각이 존재하므로 FT-IR 같은 화학적 기기 분석이 반드시 필요해요.",
      body: `
<h3>AI 사진 판독을 쓰기 좋은 곳</h3>
<p>과거에 쌓인 수만 장의 현미경 사진 중에서<br><b>"지금 이 시료와 가장 닮은 과거 사례"</b>를 검색할 때 아주 유용해요.</p>
<p>관찰 소견서의 초안을 빠르게 잡거나, 1차 의심 물질 후보군을 추릴 때 좋은 도우미가 될 수 있어요.</p>

<h3>하지만 치명적인 한계가 있어요</h3>
<div class="cards">
  <div class="card"><b>시각적 환각</b>나일론 섬유와 동물 털처럼 겉모습이 비슷한 물질을 엉뚱하게 단정할 수 있어요.</div>
  <div class="card"><b>질감과 물리적 성질 부재</b>사진만으로는 시료의 탄성, 경도, 끈적임, 굴절률을 전혀 알 수 없어요.</div>
  <div class="card"><b>배율 오인</b>스케일 바(크기 막대)를 잘못 읽어 크기 수치를 지어낼 위험이 있어요.</div>
</div>

<h3>기기 분석을 대체할 수 없어요</h3>
<p>겉모습은 <b>'가설'</b>일 뿐이에요. 최종 성적서에는 반드시 <b>FT-IR 적외선 분광 분석이나 SEM-EDS 성분 분석</b>을 거쳐 물질명을 확정해야 해요.</p>`,
      lab: "<b>육안 관찰과 기기 분석의 차이</b>와 같아요. 현미경으로 보고 '포장 비닐 조각 같네'라고 추정할 수는 있어도, 그것이 PE인지 PP인지 PVC인지는 FT-IR 스펙트럼 피크를 찍어봐야만 알 수 있잖아요. AI의 눈도 훌륭한 육안 관찰일 뿐, 기기 분석을 대신할 수 없어요.",
      quiz: {
        q: "AI가 현미경 사진을 보고 '이 시료는 99% 폴리에스터 섬유입니다'라고 판독했을 때, 연구원의 올바른 대응은?",
        options: ["AI가 99%라고 확신했으니 기기 분석 없이 그대로 성적서를 발행한다","사진 파일을 삭제한다","참고 가설로만 삼고, FT-IR 등 정밀 기기 분석을 통해 실제 성분을 확정한다"], answer: 2,
        explain: "사진 겉모습만으로는 화학 성분을 확정할 수 없으며 시각적 환각이 존재하므로, 기기 분석을 통한 검증이 반드시 필요해요.",
      },
      scene(api) {
        const s = api.svg();
        // 1. AI 판독 추정 (왼쪽)
        const leftG = api.n("g", { transform: "translate(30, 45)" }, s);
        api.n("rect", { x: 0, y: 0, width: 155, height: 160, rx: 8, fill: "#fff", stroke: "#cfcabe" }, leftG);
        api.t("AI 사진 간이 판독", { x: 77, y: 24, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#6b7280" }, leftG);

        api.n("rect", { x: 12, y: 40, width: 131, height: 40, rx: 5, fill: "#e8eefb" }, leftG);
        api.t("추정: 나일론 섬유", { x: 20, y: 58, "font-size": 11, "font-weight": 700, fill: "#1f3f8a" }, leftG);
        api.t("확신도 98% (겉모양)", { x: 20, y: 72, "font-size": 9.5, fill: "#3462c9" }, leftG);

        const warnMsg = api.t("⚠ 시각적 환각 주의!", { x: 77, y: 115, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: "#c2410c" }, leftG);
        api.t("(겉모습만으로 확정 불가)", { x: 77, y: 130, "text-anchor": "middle", "font-size": 9.5, fill: "#6b7280" }, leftG);

        // 2. FT-IR 기기 분석 확정 (오른쪽)
        const rightG = api.n("g", { transform: "translate(215, 45)" }, s);
        api.n("rect", { x: 0, y: 0, width: 155, height: 160, rx: 8, fill: "#fff", stroke: "#1f8a5b", "stroke-width": 1.5 }, rightG);
        api.t("FT-IR 스펙트럼 분석", { x: 77, y: 24, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#1f8a5b" }, rightG);

        // 스펙트럼 파형 그래프
        api.n("path", { d: "M 15 90 L 40 90 L 50 55 L 60 90 L 85 90 L 95 40 L 105 90 L 140 90", fill: "none", stroke: "#1f8a5b", "stroke-width": 2 }, rightG);
        api.t("화학 성분 지문 일치율 99%", { x: 77, y: 115, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: "#1f8a5b" }, rightG);

        // 최종 성적서 확정 도장
        const stamp = api.n("g", { transform: "translate(77, 142)" }, rightG);
        api.n("rect", { x: -50, y: -10, width: 100, height: 20, rx: 4, fill: "#e3f5ec", stroke: "#1f8a5b" }, stamp);
        api.t("성분 최종 확정 ✓", { x: 0, y: 4, "text-anchor": "middle", "font-size": 10, "font-weight": 800, fill: "#1f8a5b" }, stamp);

        api.loop(t => {
          t = t % 7;
          const out = 1 - seg(t, 6.4, 6.9);
          const pR = seg(t, 1.8, 3.2);
          rightG.setAttribute("opacity", pR * out);
          rightG.setAttribute("transform", `translate(215, ${45 + (1 - pR) * 12})`);
        }, 4);
      },
    },
    {
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
    },
    {
      title: "AI와 책임: 저작권, 개인정보, 최종 판단",
      tag: "장비가 측정해도 성적서의 최종 책임은 연구원에게 있어요",
      lead: "AI가 만든 결과물이라도 책임을 AI에게 돌릴 수는 없어요. 도구는 쓰되, 확인과 서명은 내가 해요.",
      body: `
<h3>결과물의 책임은 사람의 몫</h3>
<p>AI는 법적인 인격이나 자격증을 가진 주체가 아니에요.<br>AI가 쓴 보고서에 오류가 있어 고객사에 잘못 나갔다면, "AI가 그랬어요"는 변명이 되지 않아요. <b>검토하고 승인해 내보낸 쪽</b>이 책임져요.</p>

<h3>연구실에서 지켜야 할 세 가지 관문</h3>
<ol class="steps">
  <li><b>개인정보와 기밀 점검</b><small>고객사명, 공장 주소, 미공개 시료 번호가 밖으로 나가지 않게 마스킹해요. (4권 1장)</small></li>
  <li><b>출처와 저작권 확인</b><small>AI가 만든 글 속에 다른 사람의 논문이나 규격 문장이 그대로 베껴져 있지 않은지 확인해요.</small></li>
  <li><b>연구원의 최종 서명 날인</b><small>수치와 단위, 결론 문장을 직접 꼼꼼히 검증한 뒤 내 이름을 걸고 서명해요.</small></li>
</ol>

<h3>AI 사용 표기</h3>
<p>회사 규정이나 학회 지침에 따라 <b>"이 보고서의 초안은 AI의 도움을 받아 작성되었습니다"</b>라는 사실을 투명하게 밝히는 규칙이 늘어나고 있어요. 사내 지침을 꼭 확인하세요.</p>`,
      lab: "<b>공인 시험 성적서 서명 날인</b>과 같아요. 자동 분석기가 스펙트럼과 수치를 아무리 정밀하게 뽑아주어도, 성적서 하단에 인쇄되는 책임은 결재란에 도장을 쾅 찍은 주 연구원의 서명에서 나오잖아요.",
      quiz: {
        q: "AI가 작성해 준 분석 보고서 요약에 잘못된 수치가 있어 고객사로부터 클레임이 제기되었다면, 책임은 어디에 있을까요?",
        options: ["결과물을 검토하고 승인해서 내보낸 연구원과 회사","AI 프로그램을 개발한 해외 기업","사무실 인터넷 통신사"], answer: 0,
        explain: "AI는 보조 도구라서 책임을 질 수 없어요. 결과물을 검토하고 내보낸 연구원과, 그 성적서를 낸 회사가 책임을 져요.",
      },
      scene(api) {
        const s = api.svg();
        // 3단계 보안 관문 파이프라인
        const gates = [
          { name: "1. 기밀 마스킹", ok: "확인 ✓", x: 30 },
          { name: "2. 출처·저작권", ok: "확인 ✓", x: 145 },
          { name: "3. 연구원 날인", ok: "서명 완료 ✓", x: 260 },
        ];

        const gateEls = gates.map(g => {
          const grp = api.n("g", { transform: `translate(${g.x}, 65)` }, s);
          api.n("rect", { x: 0, y: 0, width: 105, height: 130, rx: 8, fill: "#fff", stroke: "#cfcabe" }, grp);
          api.t(g.name, { x: 52, y: 28, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#23272f" }, grp);

          const seal = api.n("rect", { x: 12, y: 55, width: 81, height: 32, rx: 6, fill: "#e3f5ec", stroke: "#1f8a5b" }, grp);
          const sealText = api.t(g.ok, { x: 52, y: 76, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: "#1f8a5b" }, grp);
          return { grp, seal, sealText };
        });

        // 최종 고객사 발송 허가
        const passMsg = api.t("공식 성적서 안전 발송 승인 ✉", { x: 200, y: 235, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#1f8a5b", opacity: 0 }, s);

        api.loop(t => {
          t = t % 7.5;
          const out = 1 - seg(t, 7.0, 7.4);
          gateEls.forEach((gt, idx) => {
            const p = seg(t, 0.5 + idx * 0.9, 1.2 + idx * 0.9);
            gt.grp.setAttribute("opacity", p * out);
          });

          const pPass = seg(t, 3.8, 4.8);
          passMsg.setAttribute("opacity", pPass * out);
        }, 5);
      },
    },
    {
      title: "앞으로의 연구원, 그리고 시리즈 정리",
      tag: "질문을 던지고 판정하는 진짜 주인공은 연구원이에요",
      lead: "AI가 발전할수록 좋은 질문을 던지고 결과를 검증하는 인간 연구원의 가치는 더욱 빛나요. 연구실의 지휘자가 되어 보세요.",
      body: `
<h3>AI가 잘하는 것과 사람이 잘하는 것</h3>
<div class="cards">
  <div class="card"><b>AI가 잘하는 일</b>긴 문헌 빨리 읽기, 데이터 서식 정리, 초안 작성</div>
  <div class="card"><b>사람 연구원이 잘하는 일</b>현장의 미세한 이상 신호 포착, 창의적인 가설과 질문 설계, 손끝의 시험 감각, 그리고 최종 판정</div>
</div>

<h3>AI는 보조원, 나는 책임자</h3>
<p>AI는 연구원의 자리를 빼앗는 적이 아니에요.<br>귀찮고 번거로운 작업을 대신 맡아 주는 <b>지치지 않는 든든한 실험 보조원</b>이에요.</p>

<h3>내일부터 연구실에서 시도할 3가지</h3>
<ol class="steps">
  <li><b>사소한 호기심부터 물어보세요.</b><small>성적서 한 문장 다듬기부터 가볍게 시작해요.</small></li>
  <li><b>AI에게 반론과 검증을 요구하세요.</b><small>"틀린 부분이 없는지 다시 짚어 줘"라고 점검시켜요.</small></li>
  <li><b>비판적인 연구자의 눈을 유지하세요.</b><small>결과의 주인공이자 책임자는 언제나 연구원 자신이에요.</small></li>
</ol>`,
      lab: "<b>신형 전자동 분석 장비의 도입</b>과 같아요. 자동 시료 주입기와 컴퓨터가 달린 신형 장비가 들어와도, 어떤 시료를 어떤 조건으로 분석할지 기획하고 피크의 진짜 의미를 해석하는 주인공은 언제나 연구원인 것과 같아요.",
      quiz: {
        q: "AI 기술이 고도화될수록 이물 분석 연구원에게 더욱 중요해지는 핵심 역량은 무엇일까요?",
        options: ["하루 종일 엑셀 수식을 손으로 베껴 쓰는 능력","명확한 가설과 질문을 던지고, AI의 결과를 비판적으로 검증하여 최종 판정하는 전문성","모든 컴퓨터의 사용을 거부하는 고집"], answer: 1,
        explain: "단순 반복 업무는 AI가 돕더라도, 실험 설계와 현장 감각, 결과에 대한 비판적 검증과 판정은 인간 연구원만의 고유한 강점이에요.",
      },
      scene(api) {
        const s = api.svg();
        // 1~5권의 상징 심볼들이 모여 별자리 네트워크를 이룸
        const symbols = [
          { name: "1권: 원리", x: 70, y: 70 },
          { name: "2권: 대화", x: 330, y: 70 },
          { name: "3권: 도구", x: 60, y: 190 },
          { name: "4권: 실무", x: 340, y: 190 },
          { name: "5권: 미래", x: 200, y: 230 },
        ];

        // 연결 네트워크 선들
        symbols.forEach((a, i) => {
          symbols.forEach((b, j) => {
            if (i < j) {
              api.n("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: "#3462c9", "stroke-width": 1.2, "stroke-dasharray": "3 3", opacity: 0.35 }, s);
            }
          });
        });

        // 중앙의 연구원 코어
        api.n("circle", { cx: 200, cy: 130, r: 42, fill: api.accent }, s);
        api.t("지휘자", { x: 200, y: 126, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: "#fff" }, s);
        api.t("연구원", { x: 200, y: 144, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: "#e8eefb" }, s);

        // 주변 노드들
        const nodeEls = symbols.map(sym => {
          const g = api.n("g", { transform: `translate(${sym.x}, ${sym.y})` }, s);
          api.n("circle", { cx: 0, cy: 0, r: 24, fill: "#fff", stroke: api.accent, "stroke-width": 2 }, g);
          api.t(sym.name.split(":")[0], { x: 0, y: -2, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: "#1f3f8a" }, g);
          api.t(sym.name.split(":")[1], { x: 0, y: 11, "text-anchor": "middle", "font-size": 9.5, "font-weight": 600, fill: "#23272f" }, g);
          return g;
        });

        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          nodeEls.forEach((g, i) => {
            const a = seg(t, 0.4 + i * 0.4, 0.9 + i * 0.4);
            g.setAttribute("opacity", a * out);
          });
        }, 5);
      },
    },
  ],

  recap: {
    title: "5권에서 배운 것",
    points: [
      "<b>멀티모달 AI</b>는 사진도 격자 조각으로 잘라 숫자 토큰처럼 처리해요.",
      "사진 판독은 좋은 가설을 주지만, <b>화학 성분 확정은 FT-IR 기기 분석</b>으로 해요.",
      "업무의 성격에 따라 <b>빠른 경량 모델과 깊이 생각하는 모델</b>을 골라 써요.",
      "AI가 만든 결과물이라도 책임은 <b>검토하고 서명한 사람</b>에게 있어요.",
      "AI는 경쟁자가 아니라 지치지 않는 조수이며, <b>진짜 질문과 판정은 연구원의 몫</b>이에요.",
    ],
    nextLabel: "다음은 특강",
    next: "1권부터 5권까지 AI의 원리, 대화법, 도구, 실무, 앞으로의 모습까지 둘러봤어요. 마지막으로 이상훈 특강에서, AI를 우리 팀 방식대로 일하게 만드는 세 가지 규칙을 알려 드릴게요.",
  },

  recapScene(api) {
    const s = api.svg();
    // 5권의 책이 책장에 꽂히는 모습
    const books = [
      { no: 1, c: "#6d4ae0", t: "원리" },
      { no: 2, c: "#0f9b8e", t: "대화" },
      { no: 3, c: "#e07a1f", t: "도구" },
      { no: 4, c: "#3a9a4a", t: "실무" },
      { no: 5, c: "#3462c9", t: "미래" },
    ];

    // 책장 선반
    api.n("rect", { x: 30, y: 220, width: 340, height: 14, rx: 4, fill: "#b9b4a8" }, s);

    const bookSpines = books.map((b, i) => {
      const g = api.n("g", { transform: `translate(${60 + i * 58}, 220)` }, s);
      api.n("rect", { x: 0, y: -130, width: 44, height: 130, rx: 6, fill: b.c }, g);
      api.n("rect", { x: 4, y: -130, width: 3, height: 130, fill: "rgba(255,255,255,0.3)" }, g);
      api.t(`${b.no}권`, { x: 22, y: -95, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#fff" }, g);
      api.t(b.t, { x: 22, y: -45, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "#fff" }, g);
      return g;
    });

    // 완결 축하 라벨
    const finishLabel = api.t("✦ 5권까지 완독! 다음은 특강이에요 ✦", { x: 200, y: 45, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: "#3462c9", opacity: 0 }, s);

    api.loop(t => {
      t = t % 8;
      bookSpines.forEach((g, idx) => {
        const p = seg(t, 0.3 + idx * 0.4, 0.8 + idx * 0.4);
        g.setAttribute("opacity", p);
        g.setAttribute("transform", `translate(${60 + idx * 58}, ${220}) scale(${0.8 + 0.2 * p}) translate(0, ${(1 - p) * -30})`);
      });

      const pFin = seg(t, 3.2, 4.2);
      finishLabel.setAttribute("opacity", pFin);
    }, 6);
  },
});
