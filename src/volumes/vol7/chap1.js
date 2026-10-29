export default {
      title: "내 일을 AI에게 소개하기",
      tag: "PC 안에서 끝나는 일은 대부분 AI에게, 눈과 손과 판정은 나에게",
      lead: "새로 온 동료에게 하듯, 먼저 AI에게 내 업무를 소개해요. 그러면 PC로 하는 일은 대부분 맡길 수 있다는 게 보여요.",
      body: `
<h3>업무 소개서부터</h3>
<p>내가 누구고, 무슨 일을 하고, 결과물이 어떤 모양인지 적어요.<br>이 소개서가 특강에서 본 <b>지침(System prompt)</b>의 첫 단락이 돼요.</p>
<div class="card"><b>업무 소개서 예시</b><q>나는 식품 이물 분석 연구원이야. 고객사가 보낸 이물을 현미경과 FT-IR로 분석하고, 결과를 성적서로 써서 회신해. 성적서는 우리 팀 양식을 따르고, 판정은 내가 해.</q></div>

<h3>PC로 하는 일은 맡길 수 있어요</h3>
<p>메일 읽고 정리하기, 엑셀 접수표, 성적서 쓰기, 회신 메일, 주간 보고.<br><b>화면 안에서 끝나는 일</b>은 거의 다 AI가 할 수 있어요.</p>

<h3>내가 쥐고 있을 일</h3>
<p>현미경과 기기로 <b>직접 보는 일</b>, 그리고 <b>판정과 서명</b>은 내 몫이에요.<br>AI가 쓴 걸 읽고 고르는 일도요.</p>
<p>물론 나중에 전자동 현미경에 AI와 <b>MCP(도구 연결 규격)</b> 같은 제어 프로그램이 붙으면 관찰 과정도 자동화할 수 있어요.<br>실제로 대학이나 첨단 연구소에서는 분자나 나노 단위 관찰을 밤새 AI에게 시켜 두고, 아침에 출근해서 요약 보고를 확인하는 방식으로 이미 많이 연구하고 있거든요.</p>`,
      lab: "<b>새로 온 파견 연구원의 첫날</b>과 같아요. \"우리 팀은 이런 의뢰를 받고, 이런 순서로 분석하고, 이런 양식으로 회신해요.\" 이 설명을 들어야 무엇을 맡길 수 있는지 서로 알 수 있죠.",
      quiz: {
        q: "다음 중 AI에게 맡기기 가장 어려운 일은?",
        options: ["접수 메일 내용을 엑셀 접수표에 옮기기", "현미경으로 이물을 직접 관찰하기", "분석 메모로 성적서 문장 초안 쓰기"], answer: 1,
        explain: "AI는 화면 안의 일을 잘해요. 현미경으로 직접 보고, 판정하고 서명하는 일은 연구원이 해요.",
      },
      scene(api) {
        const s = api.svg();
        const A = api.accent;
        api.t("내가", { x: 90, y: 30, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: MUTED }, s);
        api.t("AI에게", { x: 310, y: 30, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: A }, s);
        api.n("line", { x1: 200, y1: 40, x2: 200, y2: 262, stroke: LINE, "stroke-width": 2, "stroke-dasharray": "5 5" }, s);
        const JOBS = [["접수 메일 정리", 1], ["엑셀 접수표", 1], ["현미경 · FT-IR", 0], ["성적서 쓰기", 1], ["이물 판정 · 서명", 0], ["회신 메일 · 주간 보고", 1]];
        const cards = JOBS.map(([w, pc], i) => {
          const g = api.n("g", {}, s);
          const box = api.n("rect", { x: -78, y: -13, width: 156, height: 26, rx: 8, fill: "#fff", stroke: "#cfcabe", "stroke-width": 1.5 }, g);
          api.t(w, { x: -6, y: 4, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: INK }, g);
          // PC 일이면 작은 모니터 표시
          const icon = api.n("g", { transform: "translate(64, 0)" }, g);
          if (pc) { api.n("rect", { x: -7, y: -6, width: 14, height: 10, rx: 2, fill: "none", stroke: A, "stroke-width": 1.5 }, icon); api.n("line", { x1: -4, y1: 7, x2: 4, y2: 7, stroke: A, "stroke-width": 1.5 }, icon); }
          return { g, box, pc, y: 58 + i * 34 };
        });
        const cap = api.t("PC 안에서 끝나는 일은 AI에게", { x: 200, y: 284, "text-anchor": "middle", "font-size": 11.5, "font-weight": 800, fill: A }, s);
        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          cards.forEach((c, i) => {
            const show = seg(t, 0.2 + i * 0.25, 0.5 + i * 0.25);
            const mv = seg(t, 2.4 + i * 0.3, 3.0 + i * 0.3);
            const x = lerp(200, c.pc ? 316 : 84, mv);
            c.g.setAttribute("transform", `translate(${x}, ${c.y})`);
            c.g.setAttribute("opacity", show * out);
            c.box.setAttribute("stroke", mv > 0.5 ? (c.pc ? A : "#9ca3af") : "#cfcabe");
            c.box.setAttribute("fill", mv > 0.5 && c.pc ? "#e3f4f8" : "#fff");
          });
          cap.setAttribute("opacity", seg(t, 5.0, 5.4) * out);
        }, 6.2);
      },
    };
