BOOKS.push({
  no: 4,
  series: "연구원을 위한 AI 그림책",
  kicker: "AI IN MY LAB",
  title: "내 일에 AI 쓰기",
  subtitle: "코딩 한 줄 몰라도 괜찮아요.<br>내일 출근해서 연구실 업무에 안전하게 써먹는 실전 안내서예요.",
  color: { accent: "#3a9a4a", ink: "#24692f", soft: "#e8f5e9" },
  coverTag: "연구실 업무에 바로 쓰는 AI",
  recapTag: "4권에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    // 중앙 AI 코어
    api.n("circle", { cx: 200, cy: 150, r: 64, fill: api.accent, opacity: 0.12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 44, fill: api.accent }, s);
    api.t("실전", { x: 200, y: 158, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, s);

    // 주변 실무 키워드들 (보안 신호등, 보고서 요약, 엑셀 정리, 재현성 검증, 업무 분담)
    const keywords = ["보안 신호등", "보고서 요약", "엑셀 정리", "답변 검증", "업무 분담"];
    const chips = keywords.map(w => {
      const g = api.n("g", {}, s);
      const wdt = w.length * 13 + 22;
      api.n("rect", { x: -wdt / 2, y: -14, width: wdt, height: 28, rx: 14, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, g);
      api.t(w, { x: 0, y: 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "#24692f" }, g);
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
      title: "오늘 바로 쓰는 AI와 보안 신호등",
      tag: "자료의 성격에 따라 초록, 노랑, 빨강 신호등을 지켜요",
      lead: "사외 일반 AI 서비스에 넣어도 되는 자료와 절대 넣으면 안 되는 자료가 있어요. 보안 신호등 원칙을 먼저 세워요.",
      body: `
<h3>일반 서비스와 사내 승인 도구의 차이</h3>
<p>인터넷에서 바로 쓰는 무료 AI 서비스들은<br>서비스와 설정에 따라 입력한 내용이 <b>AI 학습이나 서비스 개선</b>에 쓰일 수 있어요.</p>
<p>그래서 회사마다 보안 규정이 다르고, <b>회사가 승인한 전용 도구</b>가 따로 있기도 해요. 먼저 회사의 보안 규정을 확인하는 것이 안전해요.</p>

<h3>연구원을 위한 보안 신호등</h3>
<div class="cards">
  <div class="card"><b>초록불 (안전)</b>교과서나 논문에 나오는 일반 과학 지식, 영문 번역, 엑셀 함수 사용법 질문</div>
  <div class="card"><b>노랑불 (주의)</b>고객사명과 시료 번호를 가명 처리한 사내 문서 (회사가 승인한 도구에서만)</div>
  <div class="card"><b>빨간불 (금지)</b>고객사 이름, 미공개 이물 분석 성적서, 원본 검사 데이터, 개인정보</div>
</div>

<h3>가명 처리(마스킹)하는 습관</h3>
<p>AI에게 질문할 때는 고유한 정보를 지우거나 바꾸어 넣어요.<br>"OO식품 안성공장 라인 3" 대신 <b>"식품 제조사 A공장"</b>으로 바꾸는 식이에요.</p>`,
      lab: "<b>시료 외부 반출 규정</b>과 똑같아요. 정밀 분석을 위해 시료를 외부 분석 기관에 보낼 때도 결재를 거치고, 용기 라벨에서 고객사 정보를 지우거나 가명 기호를 쓰잖아요. 사외 AI도 외부 시험 기관처럼 신중하게 다루어야 해요.",
      quiz: {
        q: "사외 일반 AI 서비스에 질문할 때 바로 입력해도 안전한 자료는 무엇일까요?",
        options: ["특정 고객사 납품 이물 분석 성적서 원본 전문","동료 연구원의 이름과 주민등록번호가 적힌 명부","일반적인 플라스틱 재질의 분자 구조와 열분해 특성에 대한 질문"], answer: 2,
        explain: "공개된 과학 지식(초록불)은 안전하지만, 고객사 정보나 미공개 성적서 원문(빨간불)은 사외 AI에 그대로 넣으면 안 돼요.",
      },
      scene(api) {
        const s = api.svg();
        // 신호등 기둥 및 케이스
        api.n("rect", { x: 50, y: 30, width: 70, height: 220, rx: 35, fill: "#23272f" }, s);

        const lights = [
          { color: "#e2483d", label: "빨강: 기밀 · 고객 정보 (금지)", y: 70 },
          { color: "#d9a21b", label: "노랑: 가명 처리 문서 (주의)", y: 140 },
          { color: "#2f9e5b", label: "초록: 일반 과학 지식 (안전)", y: 210 },
        ];

        const lightCircles = lights.map(l => {
          const c = api.n("circle", { cx: 85, cy: l.y, r: 24, fill: l.color, opacity: 0.25 }, s);
          return { c, ...l };
        });

        // 오른쪽 설명 카드들
        const descCards = lights.map((l, idx) => {
          const g = api.n("g", { transform: `translate(145, ${l.y - 20})` }, s);
          api.n("rect", { x: 0, y: 0, width: 235, height: 40, rx: 8, fill: "#fff", stroke: "#e4e1d8" }, g);
          api.n("circle", { cx: 16, cy: 20, r: 6, fill: l.color }, g);
          api.t(l.label.split(":")[0], { x: 30, y: 17, "font-size": 11, "font-weight": 700, fill: "#23272f" }, g);
          api.t(l.label.split(":")[1], { x: 30, y: 31, "font-size": 10, fill: "#6b7280" }, g);
          return g;
        });

        // 떨어지는 시료 카드 애니메이션
        const paper = api.n("g", {}, s);
        api.n("rect", { x: -35, y: -16, width: 70, height: 32, rx: 5, fill: "#fff", stroke: "#23272f", "stroke-width": 1.5 }, paper);
        const paperText = api.t("일반 화학 지식", { x: 0, y: 4, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: "#23272f" }, paper);

        api.loop(t => {
          t = t % 7.5;
          const out = 1 - seg(t, 7.0, 7.4);

          // 순차적으로 신호등 불 켜짐
          const activeIdx = t < 2.5 ? 0 : t < 5.0 ? 1 : 2;
          lightCircles.forEach((lc, idx) => {
            lc.c.setAttribute("opacity", idx === activeIdx ? 1 : 0.25);
          });

          // 카드 이동
          if (activeIdx === 0) {
            paperText.textContent = "고객사 성적서";
            paper.setAttribute("transform", `translate(${260}, ${70})`);
          } else if (activeIdx === 1) {
            paperText.textContent = "가명 처리 시료";
            paper.setAttribute("transform", `translate(${260}, ${140})`);
          } else {
            paperText.textContent = "일반 화학 지식";
            paper.setAttribute("transform", `translate(${260}, ${210})`);
          }
          paper.setAttribute("opacity", out);
        }, 6);
      },
    },
    {
      title: "이물 분석 보고서 요약 맡기기",
      tag: "요약 틀을 정해 주고 원문에 없는 말은 쓰지 말라고 해요",
      lead: "긴 성적서나 시험 일지를 간결한 요약 보고서로 다듬는 일은 AI가 가장 잘하는 분야예요. 요약의 틀과 조건을 단단히 걸어 주세요.",
      body: `
<h3>보고서 요약 부탁의 세 가지 원칙</h3>
<ol class="steps">
  <li><b>보고받는 대상 밝히기</b><small>연구소 내부용인지, 제조사 품질팀용인지에 따라 어조와 설명 수준이 달라져요.</small></li>
  <li><b>결과 표 칸 정해 주기</b><small>이물 분류, 크기, 추정 유입 경로, 권고 사항처럼 칸을 지정해 줘요.</small></li>
  <li><b>지어내기 방지 문구 필수</b><small>"원문에 없는 내용은 절대로 추측하지 말고 모른다고 명시해 줘."</small></li>
</ol>

<h3>추천하는 프롬프트 예시</h3>
<div class="cards">
  <div class="card"><b>이물 분석 보고서 요약 지침</b>
    <q>너는 식품 이물 분석 연구원이야. 아래 첨부한 이물 분석 결과 원문을 읽고, 제조사 품질팀에 전달할 수 있도록 3줄 표 형태로 정리해 줘. 원문에 적히지 않은 유입 경로는 절대 상상해서 쓰지 말고 '확인 불가'로 적어 줘.</q>
  </div>
</div>

<h3>실제로 해 보면</h3>
<div class="say"><small>넣은 원문 (일부)</small>봉지 과자 안에서 나온 검은색 실 모양 이물, 길이 약 5mm. 실체현미경으로 보면 섬유 형태. FT-IR 결과 폴리에스터 표준 스펙트럼과 잘 맞음. 유입 경로는 이번 분석으로 특정할 수 없음.</div>
<div class="say"><small>AI가 돌려준 표</small>이물 분류: 합성 섬유(폴리에스터 계열)<br>크기: 약 5mm<br>유입 경로: 확인 불가</div>

<h3>받은 뒤에는 반드시 1:1 대조</h3>
<p>표의 <b>"약 5mm"</b>가 원문의 숫자, 단위와 같은지, <b>"확인 불가"</b>가 원문과 맞는지 눈으로 짚어요.<br>이물 종류, 크기, 단위(mm, μm)는 꼭 사람이 맞춰 봐요.</p>`,
      lab: "<b>원 데이터에서 요약 성적서 작성</b>과 같아요. GC-MS나 현미경 원본 데이터에서 핵심 결과만 뽑아 요약본을 쓰는 일은 보조 연구원에게 맡길 수 있죠. 하지만 성적서에 도장을 찍고 최종 책임을 지는 것은 언제나 주 연구원의 몫이에요.",
      quiz: {
        q: "AI가 작성해 준 이물 분석 보고서 요약본을 받았을 때 가장 먼저 해야 할 일은 무엇일까요?",
        options: ["이물 종류, 수치, 단위가 원문과 맞는지 직접 대조하기","읽어보지도 않고 바로 고객사에 전송하기","깔끔해 보이니 그대로 내부 보고서에 붙여 넣기"], answer: 0,
        explain: "AI는 그럴듯하게 숫자를 지어내거나 바꿀 수 있으므로, 핵심 수치와 물질명은 사람이 원본과 대조해야 해요.",
      },
      scene(api) {
        const s = api.svg();
        // 1. 긴 보고서 원본 (왼쪽)
        const docG = api.n("g", { transform: "translate(30, 40)" }, s);
        api.n("rect", { x: 0, y: 0, width: 110, height: 160, rx: 8, fill: "#fff", stroke: "#cfcabe", "stroke-width": 1.5 }, docG);
        api.t("분석 원본 일지", { x: 55, y: 24, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#6b7280" }, docG);
        [42, 60, 78, 96, 114, 132].forEach(y => {
          api.n("line", { x1: 15, y1: y, x2: 95, y2: y, stroke: "#e4e1d8", "stroke-width": 3, "stroke-linecap": "round" }, docG);
        });

        // 2. 가운데 AI 깔때기 요약기
        const funnel = api.n("g", { transform: "translate(185, 120)" }, s);
        api.n("path", { d: "M -28 -35 L 28 -35 L 12 10 L 12 35 L -12 35 L -12 10 Z", fill: api.accent }, funnel);
        api.t("AI 요약", { x: 0, y: -10, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: "#fff" }, funnel);

        // 3. 오른쪽 정돈된 3칸 요약 표
        const tableG = api.n("g", { transform: "translate(240, 40)" }, s);
        api.n("rect", { x: 0, y: 0, width: 135, height: 160, rx: 8, fill: "#fff", stroke: "#3a9a4a", "stroke-width": 1.5 }, tableG);
        api.t("요약 성적서 표", { x: 67, y: 24, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#24692f" }, tableG);

        const rows = [
          { k: "이물 종류", v: "모발 (추정)" },
          { k: "크기 수치", v: "길이 12mm" },
          { k: "권고 조치", v: "작업장 위생모" },
        ];
        rows.forEach((r, idx) => {
          const ry = 42 + idx * 36;
          api.n("rect", { x: 10, y: ry, width: 115, height: 28, rx: 4, fill: "#e8f5e9" }, tableG);
          api.t(r.k, { x: 16, y: ry + 18, "font-size": 9.5, "font-weight": 700, fill: "#24692f" }, tableG);
          api.t(r.v, { x: 120, y: ry + 18, "text-anchor": "end", "font-size": 9.5, fill: "#23272f" }, tableG);
        });

        // 대조 확인 돋보기
        const checkStamp = api.n("g", { transform: "translate(200, 235)" }, s);
        api.n("rect", { x: -80, y: -15, width: 160, height: 30, rx: 6, fill: "#e3f5ec", stroke: "#1f8a5b", "stroke-width": 1.8 }, checkStamp);
        api.t("수치 · 단위 원본 대조 완료 ✓", { x: 0, y: 5, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: "#1f8a5b" }, checkStamp);

        api.loop(t => {
          t = t % 7.5;
          const out = 1 - seg(t, 7.0, 7.4);
          // 문서가 깔때기로 흡수됨
          const pDoc = seg(t, 0.6, 2.2);
          docG.setAttribute("transform", `translate(${30 + 110 * pDoc}, ${40 + 40 * pDoc}) scale(${1 - 0.5 * pDoc})`);
          docG.setAttribute("opacity", (1 - seg(t, 2.0, 2.4)) * out);

          // 요약표 등장
          const pTable = seg(t, 2.6, 3.8);
          tableG.setAttribute("opacity", pTable * out);
          tableG.setAttribute("transform", `translate(240, ${40 + (1 - pTable) * 15})`);

          // 대조 완료 스탬프
          const pChk = seg(t, 4.4, 5.2);
          checkStamp.setAttribute("opacity", pChk * out);
        }, 5);
      },
    },
    {
      title: "엑셀 실험 데이터 정리를 말로 시키기",
      tag: "단위 통일과 중복 찾기를 말로 시키고 사본으로 작업해요",
      lead: "복잡한 엑셀 수식을 몰라도 괜찮아요. 일상적인 말로 지시하면 AI가 단위를 맞추고 결측치를 찾아 깔끔하게 정돈해 줘요.",
      body: `
<h3>엑셀 작업에서 AI가 잘하는 것들</h3>
<div class="cards">
  <div class="card"><b>단위 통일하기</b><q>무게 열에 mg과 g이 뒤섞여 있어. 모두 g 단위로 환산해서 새 열을 만들어 줘.</q></div>
  <div class="card"><b>날짜 서식 맞추기</b><q>2026.05.01, 5/1 등으로 제각각인 날짜 표기를 모두 YYYY-MM-DD 형태로 통일해 줘.</q></div>
  <div class="card"><b>중복과 빈칸 찾기</b><q>시료 접수 번호가 중복된 행을 찾고, 측정 수치가 빈칸인 행 목록을 뽑아 줘.</q></div>
</div>

<h3>실제로 해 보면</h3>
<div class="say"><small>정리 전 (무게 열)</small>0.5 g · 320mg · 1.2g · (빈칸) · 45 mg</div>
<div class="say"><small>"g으로 맞추고, 빈칸은 표시해 줘" 하고 난 뒤</small>0.5 · 0.32 · 1.2 · <b>빈칸 확인 필요</b> · 0.045</div>

<h3>수식을 몰라도 물어보면 돼요</h3>
<p>"이런 계산을 하려면 엑셀에서 어떤 수식을 써야 해?"라고 물으면<br>함수 이름과 사용법을 친절히 설명해 줘요.</p>

<h3>가장 중요한 규칙: 원본은 건드리지 않기!</h3>
<p>AI가 데이터를 정리하는 과정에서 뜻하지 않게 행이 누락될 수 있어요.<br><b>원본 파일은 안전하게 보존하고, 반드시 복사본 파일로 작업</b>하세요.</p>`,
      lab: "<b>실험 노트 정서(사본 작성)</b>와 같아요. 펜으로 기록한 연구원의 원본 실험 노트는 절대 지우거나 버리지 않고 영구 보존하죠. 보고서용으로 표를 다듬거나 정리할 때는 사본 시트를 새로 만들어 작업하는 것과 같은 원칙이에요.",
      quiz: {
        q: "AI에게 엑셀 파일 정리를 맡기기 전에 연구원이 반드시 취해야 할 가장 안전한 행동은?",
        options: ["AI가 알아서 하니 원본 파일에 바로 작업시키기","원본 데이터 파일을 안전하게 백업해 두고 복사본으로 작업하기","정리 결과를 확인하지 않고 바로 보고서에 쓰기"], answer: 1,
        explain: "AI가 데이터를 재정렬하는 과정에서 수치 누락이 생길 수 있으므로, 원본 백업과 복사본 작업은 필수 철칙이에요.",
      },
      scene(api) {
        const s = api.svg();
        // 왼쪽 엉망인 원본 표
        const rawG = api.n("g", { transform: "translate(20, 40)" }, s);
        api.n("rect", { x: 0, y: 0, width: 155, height: 180, rx: 8, fill: "#fff", stroke: "#e4e1d8" }, rawG);
        api.t("정리 전 데이터 (단위 혼재)", { x: 77, y: 22, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#c2410c" }, rawG);

        const rawRows = [
          { d: "2026.5.1", v: "120 mg", c: "#fdeee6" },
          { d: "05/02", v: "0.15 g", c: "#fdeee6" },
          { d: "2026-05-03", v: "85 mg", c: "#fdeee6" },
          { d: "5월 4일", v: "빈칸 누락", c: "#fdeee6" },
        ];
        rawRows.forEach((r, idx) => {
          const ry = 36 + idx * 32;
          api.n("rect", { x: 10, y: ry, width: 135, height: 26, rx: 4, fill: r.c }, rawG);
          api.t(r.d, { x: 16, y: ry + 17, "font-size": 10, fill: "#23272f" }, rawG);
          api.t(r.v, { x: 138, y: ry + 17, "text-anchor": "end", "font-size": 10, "font-weight": 600, fill: "#c2410c" }, rawG);
        });

        // 오른쪽 정리된 표
        const cleanG = api.n("g", { transform: "translate(225, 40)" }, s);
        api.n("rect", { x: 0, y: 0, width: 155, height: 180, rx: 8, fill: "#fff", stroke: "#3a9a4a" }, cleanG);
        api.t("정리 후 데이터 (g 단위 통일)", { x: 77, y: 22, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#24692f" }, cleanG);

        const cleanRows = [
          { d: "2026-05-01", v: "0.120 g" },
          { d: "2026-05-02", v: "0.150 g" },
          { d: "2026-05-03", v: "0.085 g" },
          { d: "2026-05-04", v: "재측정 필요" },
        ];
        cleanRows.forEach((r, idx) => {
          const ry = 36 + idx * 32;
          api.n("rect", { x: 10, y: ry, width: 135, height: 26, rx: 4, fill: "#e8f5e9" }, cleanG);
          api.t(r.d, { x: 16, y: ry + 17, "font-size": 10, fill: "#23272f" }, cleanG);
          api.t(r.v, { x: 138, y: ry + 17, "text-anchor": "end", "font-size": 10, "font-weight": 700, fill: "#24692f" }, cleanG);
        });

        // 백업 보존 라벨
        api.t("★ 원본 백업 보존 필수!", { x: 200, y: 250, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: "#0a6b62" }, s);

        api.loop(t => {
          t = t % 7;
          const out = 1 - seg(t, 6.4, 6.9);
          const p = seg(t, 1.2, 2.8);
          cleanG.setAttribute("opacity", p * out);
          cleanG.setAttribute("transform", `translate(225, ${40 + (1 - p) * 15})`);
        }, 4);
      },
    },
    {
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
    },
    {
      title: "내 업무에서 AI 붙일 곳 찾기",
      tag: "판정과 승인은 연구원이 지키고, 초안과 정리는 AI에게 맡겨요",
      lead: "하루 업무 중에서 AI를 붙였을 때 효과가 가장 큰 일과, 연구원이 직접 쥐고 있어야 하는 일을 똑똑하게 구분해요.",
      body: `
<h3>연구원의 하루에 붙여 보면</h3>
<div class="cards">
  <div class="card"><b>09:00 접수 메일 확인 → AI</b>메일 내용을 접수표 한 줄로 정리해 줘요.</div>
  <div class="card"><b>10:00 현미경 · FT-IR 분석 → 나</b>직접 보고 측정해요.</div>
  <div class="card"><b>13:30 분석 메모 → AI</b>메모를 성적서 문장 초안으로 다듬어요.</div>
  <div class="card"><b>15:00 판정 · 성적서 검토 → 나</b>이물 종류를 확정하고 서명해요.</div>
  <div class="card"><b>16:30 회신 메일 · 일지 → AI 초안, 보내기는 나</b>초안을 읽고 내가 보내요.</div>
</div>

<h3>작게 시작하는 3단계 실천법</h3>
<ol class="steps">
  <li><b>일주일에 딱 한 가지 일만 골라요.</b><small>예: 성적서 요약 문장 다듬기부터 시작해요.</small></li>
  <li><b>성공한 부탁(프롬프트)은 메모장에 저장해 둬요.</b><small>다음에 그대로 복사해 쓸 수 있어요.</small></li>
  <li><b>항상 검토자로서의 눈을 유지해요.</b><small>AI는 똑똑한 실험 보조원이고, 연구 책임자는 나 자신이에요.</small></li>
</ol>`,
      lab: "<b>실험실 자동화 장비 도입</b>과 같아요. 시료를 흔들어 섞는 볼텍싱이나 원심분리는 기계에 맡겨도, 피크를 관찰하고 미지의 이물이 무엇인지 최종 확정하는 지적 판단은 연구원의 고유 영역이잖아요.",
      quiz: {
        q: "다음 중 연구실 일상 업무에서 AI에게 가장 먼저 맡기기에 적합한 일은?",
        options: ["고객사 클레임에 대한 최종 판정과 책임 서명 날인","이물 분석 성적서에 들어갈 소견 문장의 맞춤법 검사와 초안 다듬기","현미경으로 이물을 직접 관찰하는 일"], answer: 1,
        explain: "문장 다듬기나 초안 작성처럼 사람이 최종적으로 검토하고 승인할 수 있는 반복적인 보조 업무가 AI 도입의 첫걸음으로 가장 안전해요.",
      },
      scene(api) {
        const s = api.svg();
        // 타임라인 업무 파이프라인
        const steps = [
          { name: "시료 접수", who: "사람", ai: false, y: 35 },
          { name: "현미경 관찰", who: "사람", ai: false, y: 80 },
          { name: "데이터 정리", who: "AI 보조", ai: true, y: 125 },
          { name: "보고서 초안", who: "AI 보조", ai: true, y: 170 },
          { name: "최종 판정 · 서명", who: "연구원 전담", ai: false, y: 215 },
        ];

        // 연결선
        api.n("line", { x1: 60, y1: 45, x2: 60, y2: 225, stroke: "#d8d4c9", "stroke-width": 3 }, s);

        const nodes = steps.map(st => {
          const g = api.n("g", { transform: `translate(60, ${st.y})` }, s);
          // 상태 점
          api.n("circle", { cx: 0, cy: 0, r: 8, fill: st.ai ? api.accent : "#23272f" }, g);
          // 카드 박스
          const box = api.n("rect", { x: 24, y: -16, width: 280, height: 32, rx: 6, fill: "#fff", stroke: st.ai ? api.accent : "#cfcabe", "stroke-width": st.ai ? 1.8 : 1 }, g);
          api.t(st.name, { x: 38, y: 4, "font-size": 12, "font-weight": 700, fill: "#23272f" }, g);

          const badge = api.n("rect", { x: 200, y: -10, width: 90, height: 20, rx: 4, fill: st.ai ? "#e8f5e9" : "#f6f4ee" }, g);
          api.t(st.who, { x: 245, y: 4, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: st.ai ? "#24692f" : "#6b7280" }, g);
          return { g, st };
        });

        api.loop(t => {
          t = t % 7;
          const out = 1 - seg(t, 6.4, 6.9);
          nodes.forEach((nd, idx) => {
            const p = seg(t, 0.4 + idx * 0.7, 0.9 + idx * 0.7);
            nd.g.setAttribute("opacity", p * out);
          });
        }, 5);
      },
    },
  ],

  recap: {
    title: "4권에서 배운 것",
    points: [
      "보안 신호등을 기억하고, 사외 AI에는 <b>기밀과 고객사 정보</b>를 절대 넣지 않아요.",
      "보고서 요약 시 <b>'자료에 없는 내용은 지어내지 말라'</b>는 조건을 꼭 붙여요.",
      "엑셀 작업을 시킬 때는 <b>원본 백업</b>을 남기고 사본 파일로 작업해요.",
      "분석 시험의 재현성처럼, 중요한 답은 <b>원본 대조와 교차 검증</b>을 거쳐요.",
      "판정과 서명은 연구원이 지키고, <b>초안과 정리 업무부터 작게</b> 시작해요.",
    ],
    nextLabel: "5권 예고 · AI가 보는 세상과 앞으로",
    next: "AI는 이제 글뿐 아니라 현미경 사진도 함께 봐요. 사진을 격자로 읽는 멀티모달 기술과, AI 시대에 이물 연구원이 가질 대체 불가능한 전문성을 5권에서 만나요.",
  },

  recapScene(api) {
    const s = api.svg();
    const items = ["보안 신호등", "보고서 요약", "엑셀 정리", "재현성 검증", "업무 분담"];
    const cards = items.map((w, i) => {
      const g = api.n("g", {}, s);
      api.n("rect", { x: 0, y: 0, width: 200, height: 36, rx: 10, fill: "#fff", stroke: "#e4e1d8" }, g);
      api.t(`${i + 1}`, { x: 18, y: 23, "font-size": 13, "font-weight": 800, fill: api.accent }, g);
      api.t(w, { x: 38, y: 23, "font-size": 14, "font-weight": 600, fill: "#23272f" }, g);
      const ck = api.t("✓", { x: 178, y: 24, "font-size": 16, "font-weight": 800, fill: "#24692f" }, g);
      return { g, ck };
    });

    // 5권 예고 책 표지 (남색)
    const nextBook = api.n("g", {}, s);
    api.n("rect", { x: 0, y: 0, width: 92, height: 120, rx: 8, fill: "#3462c9" }, nextBook);
    api.n("rect", { x: 6, y: 0, width: 4, height: 120, fill: "rgba(255,255,255,.35)" }, nextBook);
    api.t("5권", { x: 50, y: 52, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, nextBook);
    api.t("세상과 미래", { x: 50, y: 76, "text-anchor": "middle", "font-size": 11.5, fill: "#fff" }, nextBook);

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
