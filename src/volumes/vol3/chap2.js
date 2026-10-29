export default {
      title: "에이전트: 자료실 열쇠를 받은 AI",
      tag: "채팅 AI는 받은 자료만 보고, 에이전트는 스스로 찾아서 읽어요",
      lead: "에이전트는 폴더 같은 자료실을 통째로 맡기면, 필요한 파일을 스스로 찾아 열어 보며 일을 끝까지 해내는 AI예요.",
      body: `
<h3>채팅 AI: 내가 자료를 골라 줘야 해요</h3>
<p>채팅 AI는 내가 붙여 넣은 글만 봐요.<br>어떤 파일을 줄지 고르는 건 <b>내 몫</b>이에요.</p>

<h3>에이전트: 자료실을 맡기면 스스로 찾아요</h3>
<p>에이전트(agent)에게는 <b>폴더 전체</b>를 열어 줄 수 있어요.<br>필요한 파일을 직접 열어 읽고, 모자라면 또 찾아요.</p>
<div class="card"><b>2권 RAG와 닮았어요</b>자료를 찾아 실험대에 올린 뒤 답하는 건 같아요. 다만 RAG는 시스템이 한 번 골라 주고, 에이전트는 AI가 직접 몇 번이고 다시 찾아요.</div>

<h3>이런 일을 맡겨요</h3>
<div class="card"><b>맡긴 일</b><q>9~10월 성적서 폴더를 보고, 이물 접수 건을 유형별로 세어 표로 만들어 줘.</q></div>
<ol class="steps">
  <li><b>찾기</b><small>폴더에서 9월, 10월 엑셀을 찾아 열어요.</small></li>
  <li><b>읽고 세기</b><small>"52건이네. 유형 칸이 빈 2건은 사진 폴더도 봐야겠다."</small></li>
  <li><b>다시 찾기</b><small>사진 폴더를 열어 확인하고 표를 채워요.</small></li>
  <li><b>물어보기</b><small>"애매한 1건은 확인해 주세요." 사람에게 넘겨요.</small></li>
</ol>`,
      lab: "<b>신입과 자료실 열쇠를 받은 연구원</b>의 차이와 같아요. 신입에게는 필요한 서류를 책상에 올려 줘야 일을 시작하죠. 열쇠를 받은 연구원은 스스로 캐비닛을 열어 지난 성적서를 찾아보고, 모자라면 또 찾아요. 그래서 열쇠를 어디까지 줄지(5장)가 중요해요.",
      quiz: {
        q: "9~10월 성적서 폴더 전체를 훑어 이물 유형별 건수를 세는 일에 더 알맞은 것은?",
        options: ["채팅 AI: 폴더 이름만 말하면 그 안의 파일을 알아서 읽는다", "어느 쪽이든 폴더 이름만 말하면 똑같이 해낸다", "에이전트: 폴더를 맡기면 파일을 스스로 찾아 열어 보며 센다"], answer: 2,
        explain: "채팅 AI는 붙여 넣은 글만 봐요. 폴더를 직접 열어 보고, 모자라면 다시 찾는 건 에이전트가 하는 일이에요.",
      },
      scene(api) {
        const s = api.svg();
        const INK = "#23272f", MUTED = "#6b7280", LINE = "#e4e1d8", A = api.accent;
        // 위 제목 + 가운데 칸막이
        api.t("채팅 AI", { x: 100, y: 22, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: MUTED }, s);
        api.t("에이전트", { x: 300, y: 22, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: A }, s);
        api.n("line", { x1: 200, y1: 34, x2: 200, y2: 272, stroke: LINE, "stroke-width": 2, "stroke-dasharray": "5 5" }, s);

        const doc = (parent, x, y, color, w = 22, h = 28) => {
          const g = api.n("g", { transform: `translate(${x}, ${y})` }, parent);
          api.n("rect", { x: -w / 2, y: -h / 2, width: w, height: h, rx: 3, fill: "#fff", stroke: color, "stroke-width": 1.6 }, g);
          [-6, 0, 6].forEach(dy => api.n("line", { x1: -w / 2 + 4, y1: dy, x2: w / 2 - 4, y2: dy, stroke: color, "stroke-width": 1.2, opacity: 0.6 }, g));
          return g;
        };

        // ---- 왼쪽: 채팅 AI - 사람이 골라 준 한 묶음만 봄, 나머지 파일은 못 봄 ----
        const L = api.n("g", {}, s);
        api.t("못 본 파일들", { x: 100, y: 52, "text-anchor": "middle", "font-size": 10, fill: "#9ca3af" }, L);
        [40, 80, 120, 160].forEach(x => { const d = doc(L, x, 76, "#cfcabe"); d.setAttribute("opacity", 0.55); });
        api.n("rect", { x: 20, y: 206, width: 160, height: 24, rx: 6, fill: "#f6f4ee", stroke: "#cfcabe" }, L);
        api.t("실험대", { x: 158, y: 222, "text-anchor": "middle", "font-size": 10, fill: MUTED }, L);
        const lAi = api.n("g", { transform: "translate(100, 140)" }, L);
        api.n("circle", { r: 20, fill: "#9ca3af" }, lAi);
        api.t("AI", { y: 5, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#fff" }, lAi);
        const hand = api.n("g", {}, L); // 사람이 올려 주는 서류 한 묶음
        doc(hand, -6, 0, "#6b7280"); doc(hand, 6, 4, "#6b7280");
        api.t("내가 고른 자료", { x: 18, y: 5, "text-anchor": "start", "font-size": 9.5, "font-weight": 700, fill: INK }, hand);
        const lAns = api.n("g", {}, L);
        api.n("rect", { x: 128, y: 120, width: 58, height: 24, rx: 12, fill: "#fff", stroke: "#9ca3af" }, lAns);
        api.t("답 1번", { x: 157, y: 136, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: INK }, lAns);
        api.t("받은 것만 봐요", { x: 100, y: 258, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: MUTED }, L);

        // ---- 오른쪽: 에이전트 - 자료실 캐비닛을 직접 열어 찾고, 모자라면 또 찾음 ----
        const R = api.n("g", {}, s);
        api.n("rect", { x: 214, y: 44, width: 80, height: 132, rx: 6, fill: "#f6f4ee", stroke: "#cfcabe" }, R);
        api.t("자료실", { x: 254, y: 190, "text-anchor": "middle", "font-size": 10, fill: MUTED }, R);
        const drawers = ["9월", "10월", "사진"].map((name, i) => {
          const g = api.n("g", {}, R);
          api.n("rect", { x: 220, y: 52 + i * 40, width: 68, height: 32, rx: 4, fill: "#fff", stroke: "#cfcabe" }, g);
          api.n("rect", { x: 247, y: 64 + i * 40, width: 14, height: 4, rx: 2, fill: "#cfcabe" }, g);
          api.t(name, { x: 232, y: 72 + i * 40, "font-size": 9.5, "font-weight": 700, fill: INK }, g);
          return g;
        });
        api.n("rect", { x: 214, y: 206, width: 176, height: 24, rx: 6, fill: "#fdf0e3", stroke: A }, R);
        api.t("실험대", { x: 372, y: 222, "text-anchor": "middle", "font-size": 10, fill: A }, R);
        const agent = api.n("g", { transform: "translate(352, 110)" }, R);
        api.n("circle", { r: 22, fill: A }, agent);
        api.t("AI", { y: 5, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#fff" }, agent);
        const lens = api.n("g", {}, R); // 돋보기: 서랍을 훑음
        api.n("circle", { r: 9, fill: "rgba(255,255,255,.6)", stroke: INK, "stroke-width": 2 }, lens);
        api.n("line", { x1: 6, y1: 6, x2: 13, y2: 13, stroke: INK, "stroke-width": 2.5, "stroke-linecap": "round" }, lens);
        const think = api.n("g", {}, R);
        const thinkBox = api.n("rect", { x: 300, y: 40, width: 96, height: 26, rx: 13, fill: "#fff", stroke: A }, think);
        const thinkT = api.t("", { x: 348, y: 57, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: INK }, think);
        const table = api.n("g", {}, R); // 완성된 표
        api.n("rect", { x: 318, y: 150, width: 70, height: 46, rx: 4, fill: "#fff", stroke: "#1f8a5b", "stroke-width": 1.6 }, table);
        [0, 1, 2].forEach(i => api.n("line", { x1: 318, y1: 162 + i * 11, x2: 388, y2: 162 + i * 11, stroke: "#1f8a5b", opacity: 0.5 }, table));
        api.n("line", { x1: 350, y1: 150, x2: 350, y2: 196, stroke: "#1f8a5b", opacity: 0.5 }, table);
        api.t("유형별 표 ✓", { x: 353, y: 145, "text-anchor": "middle", "font-size": 9.5, "font-weight": 800, fill: "#1f8a5b" }, table);
        api.t("스스로 찾아 읽어요", { x: 300, y: 258, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: A }, R);
        // 꺼낸 파일들 (마지막에 그려야 실험대 상자 위로 보임)
        const files = [0, 1, 2].map(() => doc(s, 0, 0, A, 18, 22));

        const THINK = [[0.6, "9월부터 볼까?"], [2.3, "10월도 봐야지"], [4.0, "2건이 빠졌네"], [5.7, "사진도 확인!"]];
        api.loop(t => {
          t = t % 10;
          const out = 1 - seg(t, 9.4, 9.9);
          // 왼쪽: 사람이 서류 묶음을 실험대에 올림 → AI가 한 번 답함
          const h = seg(t, 0.4, 1.4);
          hand.setAttribute("transform", `translate(100, ${120 - 300 * (1 - h) + 66 * h})`);
          hand.setAttribute("opacity", out);
          lAns.setAttribute("opacity", seg(t, 2.0, 2.4) * out);
          // 오른쪽: 서랍 i가 열리고 → 돋보기가 훑고 → 파일 하나가 실험대로
          drawers.forEach((d, i) => {
            const t0 = 1.0 + i * 1.7 + (i === 2 ? 0.6 : 0); // 사진 서랍은 "빠진 2건"을 보고 다시 찾음
            const open = seg(t, t0, t0 + 0.4) * (1 - seg(t, t0 + 1.2, t0 + 1.5));
            d.setAttribute("transform", `translate(${open * 16}, 0)`);
            const fly = seg(t, t0 + 0.6, t0 + 1.3);
            const fx = 262 + 16 + (240 + i * 26 - 278) * fly, fy = 68 + i * 40 + (218 - 68 - i * 40) * fly;
            files[i].setAttribute("transform", `translate(${fx}, ${fy})`);
            files[i].setAttribute("opacity", seg(t, t0 + 0.5, t0 + 0.7) * out);
          });
          // 돋보기는 지금 열린 서랍 앞으로
          const k = t < 2.7 ? 0 : t < 4.4 ? 1 : 2;
          lens.setAttribute("transform", `translate(${300 + Math.sin(t * 6) * 4}, ${68 + k * 40})`);
          lens.setAttribute("opacity", (t > 0.8 && t < 7.2 ? 1 : 0) * out);
          // 생각 말풍선
          let msg = ""; THINK.forEach(([at, m]) => { if (t >= at) msg = m; });
          thinkT.textContent = msg;
          think.setAttribute("opacity", (t > 0.6 && t < 7.2 ? 1 : 0) * out);
          // 다 모으면 표 완성
          table.setAttribute("opacity", seg(t, 7.2, 7.8) * out);
        }, 8);
      },
    };
