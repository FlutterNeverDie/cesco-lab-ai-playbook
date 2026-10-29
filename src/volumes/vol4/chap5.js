export default {
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
    };
