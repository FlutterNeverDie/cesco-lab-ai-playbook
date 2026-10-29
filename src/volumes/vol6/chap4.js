export default {
      title: "스킬과 도구를 이으면: 일지와 메일 초안",
      tag: "끝나면 노션에 일지, 메일함에 초안까지",
      lead: "3권의 MCP 기억나요? AI에 도구를 꽂는 공통 포트였죠. 노션, 지메일을 MCP로 이어 두고 스킬에 \"끝나면 이 도구로 이렇게 해\"라고 적어 두면, 일의 마무리까지 맡길 수 있어요.",
      body: `
<h3>예를 들면 이런 스킬</h3>
<div class="card"><b>분석 마무리 스킬</b><q>분석이 끝나면 노션 '업무일지'에 오늘 한 일을 세 줄로 남겨. 그다음 보고 메일 초안을 써서 내 메일함에 넣어 둬. 보내지는 마.</q></div>
<div class="fig"><svg viewBox="0 0 360 64" role="img" aria-label="스킬, 노션 업무일지, 메일 초안, 내가 보내기 순서">
  <defs><marker id="v6arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${MUTED}"/></marker></defs>
  <rect x="4" y="12" width="74" height="40" rx="8" fill="#eaf6ef" stroke="${GUIDE}" stroke-width="1.5"/>
  <text x="41" y="37" text-anchor="middle" font-size="11.5" font-weight="800" fill="${GUIDE}">스킬</text>
  <rect x="96" y="12" width="74" height="40" rx="8" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
  <text x="133" y="30" text-anchor="middle" font-size="11" font-weight="800" fill="${INK}">노션</text>
  <text x="133" y="45" text-anchor="middle" font-size="9.5" fill="${MUTED}">업무일지</text>
  <rect x="188" y="12" width="74" height="40" rx="8" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
  <text x="225" y="30" text-anchor="middle" font-size="11" font-weight="800" fill="${INK}">지메일</text>
  <text x="225" y="45" text-anchor="middle" font-size="9.5" fill="${MUTED}">초안만</text>
  <rect x="280" y="12" width="76" height="40" rx="8" fill="#fbe8f0" stroke="#b23a6b" stroke-width="1.5"/>
  <text x="318" y="37" text-anchor="middle" font-size="11" font-weight="800" fill="#7d1f47">내가 보내기</text>
  <path d="M78 32 H94" stroke="${MUTED}" stroke-width="1.6" marker-end="url(#v6arr)"/>
  <path d="M170 32 H186" stroke="${MUTED}" stroke-width="1.6" marker-end="url(#v6arr)"/>
  <path d="M262 32 H278" stroke="${MUTED}" stroke-width="1.6" marker-end="url(#v6arr)"/>
</svg></div>

<p>도구 연결(MCP)은 <b>설정에서 한 번</b> 해 둬요. 스킬에는 <b>언제, 어떻게 쓸지</b>를 적어요.</p>

<h3>이런 것도 돼요</h3>
<div class="cards">
  <div class="card"><b>금요일 주간 보고</b>한 주의 노션 일지를 모아 주간 보고 초안을 써요.</div>
  <div class="card"><b>회의록 정리</b>메모를 우리 팀 노션 회의록 양식에 맞춰 옮겨요.</div>
  <div class="card"><b>접수 메일 정리</b>새 접수 메일을 읽고 접수표에 한 줄씩 채워요.</div>
</div>

<h3>보내기 버튼은 사람이</h3>
<p>AI에게는 <b>초안까지만</b> 맡겨요. 밖으로 나가는 건 내가 읽고 눌러요.</p>`,
      lab: "<b>막내 연구원의 인수인계서</b>와 같아요. \"분석 끝나면 장비 일지 쓰고, 팀장님께 보낼 메일은 초안으로 올려 둘 것.\" 순서를 적어 두면 누가 맡아도 마무리가 같아요.",
      quiz: {
        q: "스킬에 메일 쓰는 순서를 적을 때 가장 안전한 방법은?",
        options: ["AI가 고객사에 바로 메일을 보내게 한다", "초안까지만 쓰게 하고, 내가 읽고 보낸다", "메일은 위험하니 노션 일지에도 아무것도 남기지 않는다"], answer: 1,
        explain: "기록과 초안은 AI에게 맡기고, 밖으로 나가는 마지막 버튼은 사람이 눌러요. 그래야 실수가 밖으로 새지 않아요.",
      },
      scene(api) {
        const s = api.svg();
        // 스킬 문서
        api.n("rect", { x: 16, y: 20, width: 156, height: 108, rx: 8, fill: "#eaf6ef", stroke: GUIDE, "stroke-width": 1.5 }, s);
        api.t("분석 스킬.md", { x: 30, y: 43, "font-size": 12, "font-weight": 800, fill: GUIDE }, s);
        const hls = [0, 1, 2].map(i => api.n("rect", { x: 22, y: 54 + i * 22, width: 144, height: 19, rx: 4, fill: GUIDE, opacity: 0 }, s));
        ["1. 분석 정리하기", "2. 노션에 업무일지", "3. 메일은 초안만"].forEach((w, i) => api.t(w, { x: 30, y: 68 + i * 22, "font-size": 10.5, fill: INK }, s));
        const ai = bot(api, s, 278, 72, 26);
        api.n("path", { d: "M 172 74 H 248", stroke: GUIDE, "stroke-width": 2, "stroke-dasharray": "3 4" }, s);

        // 연결선 + MCP 꼬리표
        const P1 = [[278, 98], [104, 162]], P2 = [[278, 98], [296, 162]];
        [P1, P2].forEach(([a, b]) => api.n("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: "#cfcabe", "stroke-width": 2.5 }, s));
        pill(api, s, 186, 130, "MCP", MUTED, 9.5);
        pill(api, s, 290, 130, "MCP", MUTED, 9.5);

        // 노션 업무일지
        api.n("rect", { x: 14, y: 162, width: 180, height: 108, rx: 10, fill: "#fff", stroke: INK, "stroke-width": 1.5 }, s);
        api.t("노션 · 업무일지", { x: 28, y: 184, "font-size": 11.5, "font-weight": 800, fill: INK }, s);
        api.t("어제 · 성적서 검토", { x: 28, y: 208, "font-size": 10, fill: MUTED }, s);
        api.n("line", { x1: 24, y1: 216, x2: 184, y2: 216, stroke: LINE }, s);
        const newRowBg = api.n("rect", { x: 22, y: 222, width: 164, height: 22, rx: 4, fill: "#fff6d6", opacity: 0 }, s);
        const newRow = api.t("", { x: 28, y: 237, "font-size": 10, "font-weight": 700, fill: INK }, s);
        const ROW = "오늘 · 이물 분석 3건 정리";

        // 지메일 임시보관함
        api.n("rect", { x: 206, y: 162, width: 180, height: 108, rx: 10, fill: "#fff", stroke: INK, "stroke-width": 1.5 }, s);
        api.t("지메일 · 임시보관함", { x: 220, y: 184, "font-size": 11.5, "font-weight": 800, fill: INK }, s);
        const mail = api.n("g", {}, s);
        api.n("rect", { x: 220, y: 200, width: 34, height: 24, rx: 3, fill: "#fff", stroke: api.accent, "stroke-width": 1.6 }, mail);
        api.n("path", { d: "M 220 201 L 237 214 L 254 201", fill: "none", stroke: api.accent, "stroke-width": 1.6 }, mail);
        api.t("분석 결과 보고", { x: 264, y: 211, "font-size": 10, "font-weight": 700, fill: INK }, mail);
        api.t("초안 · 보내지 않음", { x: 264, y: 227, "font-size": 9, fill: MUTED }, mail);
        const sendBtn = pill(api, s, 330, 252, "내가 보내기", api.accent, 9.5);

        const pk = api.n("circle", { r: 6, fill: api.accent }, s);
        const cap = api.t("초안까지는 AI, 보내기는 나", { x: 200, y: 292, "text-anchor": "middle", "font-size": 11.5, "font-weight": 800, fill: api.accent }, s);

        api.loop(t => {
          t = t % 9;
          const out = 1 - seg(t, 8.4, 8.9);
          hls.forEach((h, i) => { const a = [0.4, 1.8, 4.2][i]; h.setAttribute("opacity", 0.22 * seg(t, a, a + 0.3) * (1 - seg(t, a + 1.4, a + 1.7))); });
          ai.setAttribute("transform", `translate(278, 72) rotate(${t < 1.6 ? Math.sin(t * 9) * 6 : 0})`);
          // 꾸러미: AI → 노션, AI → 메일
          let pos = null;
          if (t > 1.9 && t < 2.7) { const p = seg(t, 1.9, 2.7); pos = [lerp(P1[0][0], P1[1][0], p), lerp(P1[0][1], P1[1][1], p)]; }
          if (t > 4.4 && t < 5.2) { const p = seg(t, 4.4, 5.2); pos = [lerp(P2[0][0], P2[1][0], p), lerp(P2[0][1], P2[1][1], p)]; }
          pk.setAttribute("opacity", pos ? 1 : 0);
          if (pos) { pk.setAttribute("cx", pos[0]); pk.setAttribute("cy", pos[1]); }
          const typed = Math.floor([...ROW].length * clamp((t - 2.7) / 1.2));
          newRow.textContent = [...ROW].slice(0, typed).join("");
          newRow.setAttribute("opacity", out);
          newRowBg.setAttribute("opacity", seg(t, 2.6, 2.9) * out);
          mail.setAttribute("opacity", seg(t, 5.1, 5.5) * out);
          mail.setAttribute("transform", `translate(0, ${8 * (1 - seg(t, 5.1, 5.5))})`);
          sendBtn.setAttribute("opacity", seg(t, 6.0, 6.4) * out);
          cap.setAttribute("opacity", seg(t, 6.4, 6.8) * out);
        }, 7.5);
      },
    };
