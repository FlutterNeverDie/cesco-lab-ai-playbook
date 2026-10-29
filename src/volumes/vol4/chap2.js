export default {
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
    };
