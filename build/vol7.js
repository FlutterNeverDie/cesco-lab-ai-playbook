(() => {
// 실전 편: 특강(6권)의 지침·스킬·검증을 실제 이물 분석 업무에 녹이기. 색은 6권과 같게 맞춘다
const HOOK = "#3462c9", GUIDE = "#1f8a5b", HARN = "#d9622b", BAD = "#d64545";
const INK = "#23272f", MUTED = "#6b7280", LINE = "#e4e1d8", PAPER = "#f6f4ee";

const bot = (api, p, x, y, r = 22, fill = api.accent) => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("circle", { r, fill }, g);
  api.t("AI", { y: r * 0.24, "text-anchor": "middle", "font-size": r * 0.6, "font-weight": 800, fill: "#fff" }, g);
  return g;
};
const person = (api, p, x, y, c = MUTED, label = "나") => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("circle", { cy: -24, r: 10, fill: c }, g);
  api.n("rect", { x: -15, y: -11, width: 30, height: 30, rx: 12, fill: c }, g);
  if (label) api.t(label, { y: 36, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: INK }, g);
  return g;
};
const pill = (api, p, x, y, text, c, fs = 10.5) => {
  const g = api.n("g", {}, p);
  const w = [...text].length * fs * 0.92 + 18;
  api.n("rect", { x: x - w / 2, y: y - 12, width: w, height: 24, rx: 12, fill: "#fff", stroke: c, "stroke-width": 1.5 }, g);
  g.label = api.t(text, { x, y: y + fs * 0.36, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: c }, g);
  return g;
};
// 줄 몇 개 그어진 종이
const paper = (api, p, x, y, w, h, c, title) => {
  const g = api.n("g", { transform: `translate(${x}, ${y})` }, p);
  api.n("rect", { x: 0, y: 0, width: w, height: h, rx: 6, fill: "#fff", stroke: c, "stroke-width": 1.6 }, g);
  if (title) api.t(title, { x: 10, y: 18, "font-size": 10.5, "font-weight": 800, fill: c }, g);
  for (let yy = title ? 30 : 14; yy < h - 8; yy += 12) api.n("rect", { x: 10, y: yy, width: (w - 20) * (yy % 24 ? 0.7 : 1), height: 4, rx: 2, fill: LINE }, g);
  return g;
};
const lerp = (a, b, p) => a + (b - a) * p;

BOOKS.push({
  no: 7,
  badge: "실",
  volName: "실전",
  series: "연구원을 위한 AI 그림책",
  kicker: "IN PRACTICE",
  title: "세스코 업무에 녹이기",
  subtitle: "PC로 하는 일은 대부분 AI에게 맡길 수 있어요.<br>입력 양식, 3개 안, 10분 뒤 고르기. 빠르면 3일이면 내 일이 알아서 돌아가요.",
  color: { accent: "#0e7490", ink: "#0b4f63", soft: "#e3f4f8" },
  coverTag: "넣고, 고르고, 적어 두고, 다시",
  recapTag: "실전 편에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    const A = api.accent;
    const STEPS = ["양식 넣기", "3개 안", "고르기", "고칠 점", "스킬에 적기"];
    const R = 102, CX = 200, CY = 150;
    api.n("circle", { cx: CX, cy: CY, r: R, fill: "none", stroke: LINE, "stroke-width": 5 }, s);
    const dot = api.n("circle", { r: 7, fill: A }, s);
    const nodes = STEPS.map((w, i) => {
      const a = -Math.PI / 2 + i * (Math.PI * 2 / 5);
      const x = CX + Math.cos(a) * R, y = CY + Math.sin(a) * R;
      const g = api.n("g", {}, s);
      const bw = [...w].length * 11 + 20;
      const box = api.n("rect", { x: x - bw / 2, y: y - 14, width: bw, height: 28, rx: 14, fill: "#fff", stroke: A, "stroke-width": 1.8 }, g);
      api.t(w, { x, y: y + 4, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: INK }, g);
      return { a, box };
    });
    const day = api.t("1일차", { x: CX, y: CY - 2, "text-anchor": "middle", "font-size": 24, "font-weight": 800, fill: A }, s);
    const sub = api.t("고칠 것 많음", { x: CX, y: CY + 22, "text-anchor": "middle", "font-size": 11, fill: MUTED }, s);
    const SUB = ["고칠 것 많음", "고칠 것 조금", "입력만 넣으면 끝 ✓"];

    api.loop(t => {
      t = t % 10;
      const lap = Math.min(2, Math.floor(t / 3)), lt = t - lap * 3;
      const a = -Math.PI / 2 + Math.PI * 2 * clamp(lt / 2.6) + (lap === 2 && lt > 2.6 ? 0 : 0);
      dot.setAttribute("cx", CX + Math.cos(a) * R);
      dot.setAttribute("cy", CY + Math.sin(a) * R);
      dot.setAttribute("opacity", t < 9.4 ? 1 : 0);
      const k = Math.min(4, Math.floor(clamp(lt / 2.6) * 5 + 0.05));
      nodes.forEach((n, i) => n.box.setAttribute("fill", i === k && lt < 2.7 ? "#e3f4f8" : "#fff"));
      day.textContent = `${lap + 1}일차`;
      sub.textContent = SUB[lap];
      sub.setAttribute("fill", lap === 2 ? GUIDE : MUTED);
      sub.setAttribute("font-weight", lap === 2 ? 800 : 400);
    }, 9);
  },

  chapters: [
    {
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
    },
    {
      title: "입력 양식 하나로 시작하기",
      tag: "넣을 것의 모양만 정해 두면, 넣기만 해도 끝까지 만들어요",
      lead: "매번 길게 설명하지 마세요. 넣을 것의 모양, 곧 입력 양식만 정해 두면 돼요. 양식대로 넣으면 AI가 정해 둔 지침과 스킬을 불러 끝까지 만들어요.",
      body: `
<h3>입력 양식 예시</h3>
<div class="say"><small>내가 넣는 것 (이것만 채우면 돼요)</small>접수번호: 1029-03<br>제품: 봉지 과자<br>관찰: 검은 실 모양, 약 5mm<br>FT-IR: 폴리에스터 계열과 일치<br>사진: 사진 폴더 1029-03</div>

<h3>넣으면 나오는 것</h3>
<ol class="steps">
  <li><b>성적서 초안</b><small>우리 팀 양식 그대로, 소견 문장까지.</small></li>
  <li><b>고객사 회신 메일 초안</b><small>메일함에 넣어 두기만, 보내기는 내가.</small></li>
  <li><b>업무일지 한 줄</b><small>노션 일지에 "1029-03 성적서 초안 완료".</small></li>
</ol>

<h3>부르는 말은 한 줄</h3>
<div class="card"><b>이렇게만 말해요</b><q>성적서 스킬로 이거 처리해 줘.</q></div>
<p>무엇을 어떤 순서로 할지는 이미 <b>스킬(Skill)</b>에 적혀 있어요.<br>그래서 넣는 사람은 양식만 채우면 돼요.</p>`,
      lab: "<b>시험 의뢰서 양식</b>과 같아요. 의뢰서 칸이 정해져 있으니, 누가 받아도 같은 순서로 분석하고 같은 모양의 성적서가 나오죠.",
      quiz: {
        q: "입력 양식을 정해 두면 가장 좋은 점은?",
        options: ["매번 설명 없이 넣기만 해도 같은 모양으로 결과가 나온다", "AI가 이물 판정까지 대신 내려 준다", "결과를 확인하지 않아도 된다"], answer: 0,
        explain: "양식과 스킬이 정해져 있으면 넣는 것만으로 늘 같은 모양의 결과가 나와요. 판정과 확인은 여전히 내가 해요.",
      },
      scene(api) {
        const s = api.svg();
        const A = api.accent;
        // 입력 양식
        api.n("rect", { x: 12, y: 40, width: 150, height: 176, rx: 8, fill: "#fff", stroke: INK, "stroke-width": 1.5 }, s);
        api.t("입력 양식", { x: 24, y: 62, "font-size": 12, "font-weight": 800, fill: INK }, s);
        const FIELDS = [["접수번호", "1029-03"], ["제품", "봉지 과자"], ["관찰", "검은 실, 5mm"], ["FT-IR", "폴리에스터"], ["사진", "1029-03 폴더"]];
        const vals = FIELDS.map(([k, v], i) => {
          const y = 88 + i * 26;
          api.t(k, { x: 24, y, "font-size": 9.5, fill: MUTED }, s);
          api.n("line", { x1: 72, y1: y + 4, x2: 152, y2: y + 4, stroke: LINE }, s);
          return { el: api.t("", { x: 74, y, "font-size": 9.5, "font-weight": 700, fill: INK }, s), v };
        });
        // AI + 지침·스킬 꼬리표
        const ai = bot(api, s, 214, 128, 26);
        pill(api, s, 214, 80, "지침", HOOK, 10);
        pill(api, s, 214, 176, "스킬", GUIDE, 10);
        const arrow = api.n("path", { d: "M 166 128 H 182", stroke: MUTED, "stroke-width": 2 }, s);
        const pk = api.n("circle", { r: 5, fill: A }, s);
        // 결과물 세 장
        const outs = [["성적서 초안", A, 30], ["회신 메일", HARN, 104], ["업무일지", GUIDE, 178]].map(([w, c, y]) => paper(api, s, 262, y, 128, 60, c, w));
        const cap = api.t("양식만 채우면 끝까지", { x: 200, y: 268, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: A }, s);
        api.loop(t => {
          t = t % 9;
          const out = 1 - seg(t, 8.4, 8.9);
          vals.forEach((f, i) => {
            const p = clamp((t - 0.3 - i * 0.5) / 0.45);
            f.el.textContent = [...f.v].slice(0, Math.round([...f.v].length * p)).join("");
            f.el.setAttribute("opacity", out);
          });
          const go = t > 3.0 && t < 3.6;
          pk.setAttribute("opacity", go ? 1 : 0);
          pk.setAttribute("cx", lerp(162, 186, clamp((t - 3.0) / 0.6))); pk.setAttribute("cy", 128);
          ai.setAttribute("transform", `translate(214, 128) rotate(${t > 3.6 && t < 4.6 ? Math.sin(t * 10) * 7 : 0})`);
          outs.forEach((o, i) => {
            const p = seg(t, 4.6 + i * 0.6, 5.1 + i * 0.6);
            o.setAttribute("opacity", p * out);
            o.setAttribute("transform", `translate(${262 + 20 * (1 - p)}, ${[30, 104, 178][i]})`);
          });
          cap.setAttribute("opacity", seg(t, 6.6, 7.0) * out);
        }, 7.6);
      },
    },
    {
      title: "3개 안 받고, 10분 뒤 고르기",
      tag: "시켜 놓고 내 일 하다가, 돌아와서 고르고 고칠 점만 말해요",
      lead: "한 번에 딱 마음에 드는 결과가 나오기는 어려워요. 그래서 스킬에 \"3개씩 만들어\"라고 적어 둬요. 쓰는 것보다 고르는 게 훨씬 빨라요.",
      body: `
<h3>스킬에 적어 둘 한 줄</h3>
<div class="card"><b>성적서 스킬 중</b><q>소견 문장은 3개 안으로 만들어. A는 간결하게, B는 자세하게, C는 고객 눈높이로.</q></div>

<h3>일하는 순서</h3>
<ol class="steps">
  <li><b>넣고 시켜 놓기</b><small>양식을 넣고, 나는 현미경 보러 가요.</small></li>
  <li><b>10분쯤 뒤 돌아오기</b><small>A, B, C 세 안이 기다리고 있어요.</small></li>
  <li><b>하나 고르기</b><small>"B가 제일 낫네."</small></li>
  <li><b>고칠 점 말하기</b><small>"B로 가되, 둘째 문장은 A처럼 짧게."</small></li>
</ol>

<h3>기다리는 동안은 내 일</h3>
<p>AI가 쓰는 동안 나는 <b>나만 할 수 있는 일</b>을 해요.<br>돌아와서는 읽고, 고르고, 한마디만 하면 돼요.</p>`,
      lab: "<b>전처리 조건을 세 가지로 걸어 두는 것</b>과 같아요. 조건을 바꾼 시료 세 개를 동시에 돌려 두고 다른 일을 하다가, 돌아와서 가장 깨끗한 결과를 고르잖아요.",
      quiz: {
        q: "AI 결과가 한 번에 마음에 드는 일이 드물다면, 스킬에 무엇을 적으면 좋을까요?",
        options: ["한 번에 완벽하게 써 달라고 적는다", "마음에 안 들면 처음부터 다시 쓰라고 적는다", "방향을 달리한 3개 안을 만들라고 적는다"], answer: 2,
        explain: "세 안을 받아 고르면, 하나를 여러 번 고치는 것보다 빨리 마음에 드는 결과에 닿아요.",
      },
      scene(api) {
        const s = api.svg();
        const A = api.accent;
        // 10분 시계
        const ck = api.n("g", { transform: "translate(52, 62)" }, s);
        api.n("circle", { r: 26, fill: "#fff", stroke: MUTED, "stroke-width": 2 }, ck);
        const arc = api.n("path", { d: "", fill: A, opacity: 0.25 }, ck);
        api.t("10분", { y: 46, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: MUTED }, ck);
        const ai = bot(api, s, 200, 62, 24);
        const me = person(api, s, 350, 74);
        const away = api.t("현미경 보러 가요", { x: 350, y: 130, "text-anchor": "middle", "font-size": 10, fill: MUTED }, s);
        // A B C 세 안
        const drafts = ["A", "B", "C"].map((k, i) => {
          const g = api.n("g", {}, s);
          const box = api.n("rect", { x: -46, y: -50, width: 92, height: 100, rx: 8, fill: "#fff", stroke: "#cfcabe", "stroke-width": 1.8 }, g);
          api.t(`${k}안`, { x: -34, y: -30, "font-size": 12, "font-weight": 800, fill: INK }, g);
          [[-16, 1], [-4, 0.8], [8, [0.5, 1, 0.7][i]], [20, [0.3, 0.9, 0.6][i]]].forEach(([y, w]) => api.n("rect", { x: -34, y, width: 68 * w, height: 5, rx: 2.5, fill: LINE }, g));
          return { g, box, x: 80 + i * 120 };
        });
        const pick = api.t("✓ 이걸로", { x: 200, y: 126, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: GUIDE }, s);
        const say = pill(api, s, 200, 272, "B로, 둘째 문장만 짧게", A, 11);
        api.loop(t => {
          t = t % 10;
          const out = 1 - seg(t, 9.4, 9.9);
          // 시계: 1~5초 동안 한 바퀴 (10분)
          const p = clamp((t - 1) / 4), ang = p * Math.PI * 2 - Math.PI / 2;
          arc.setAttribute("d", p <= 0 ? "" : `M 0 0 L 0 -24 A 24 24 0 ${p > 0.5 ? 1 : 0} 1 ${Math.cos(ang) * 24} ${Math.sin(ang) * 24} Z`);
          // 사람: 1초에 나갔다가 5초에 돌아옴
          const gone = seg(t, 0.8, 1.3) * (1 - seg(t, 5.0, 5.5));
          me.setAttribute("opacity", 1 - gone);
          away.setAttribute("opacity", gone);
          ai.setAttribute("transform", `translate(200, 62) rotate(${t > 1.2 && t < 4.8 ? Math.sin(t * 9) * 6 : 0})`);
          drafts.forEach((d, i) => {
            const a = seg(t, 1.6 + i * 1.0, 2.2 + i * 1.0);
            const chosen = i === 1 ? seg(t, 6.0, 6.4) : 0;
            d.g.setAttribute("transform", `translate(${d.x}, ${200 - 12 * chosen})`);
            d.g.setAttribute("opacity", a * out * (i !== 1 && t > 6.2 ? 0.45 : 1));
            d.box.setAttribute("stroke", chosen > 0.5 ? GUIDE : "#cfcabe");
          });
          pick.setAttribute("opacity", seg(t, 6.2, 6.6) * out);
          say.setAttribute("opacity", seg(t, 7.2, 7.6) * out);
        }, 8.4);
      },
    },
    {
      title: "좋은 건 적어 두고, 이상하면 \"왜?\"",
      tag: "고른 이유는 스킬과 검증에, 이상한 결과는 원인을 물어서",
      lead: "고른 이유와 고친 점을 그냥 흘려보내지 마세요. 적어 두면 다음 일이 그만큼 좋아져요. 결과가 이상하면 AI에게 왜 그렇게 했는지 물어보세요.",
      body: `
<h3>마음에 든 점은 적어 두기</h3>
<div class="cards">
  <div class="card"><b>B를 고른 이유</b>결론이 첫 줄에 있어서 → 스킬에 "소견 첫 줄에 결론" 한 줄.</div>
  <div class="card"><b>다시 나오면 안 될 것</b>"유입 경로를 짐작해서 씀" → 검증(Harness) 목록에 한 줄.</div>
</div>

<h3>이상하면 "왜 그렇게 했어?"</h3>
<div class="say"><small>나</small>유입 경로를 왜 '제조 공정'이라고 썼어?</div>
<div class="say"><small>AI</small>스킬에 넣어 둔 예시 성적서에 그렇게 적혀 있어서 따라 썼어요.</div>
<p>예시만 고치면 끝나요. AI는 <b>이유를 말해 줘요.</b></p>

<h3>원인은 대개 셋 중 하나</h3>
<ol class="steps">
  <li><b>입력값</b><small>양식에 빈칸이 있거나 애매하게 넣지 않았나?</small></li>
  <li><b>예시</b><small>스킬에 넣은 예시가 잘못돼 있지 않나?</small></li>
  <li><b>규칙</b><small>지침과 스킬의 말이 서로 부딪히지 않나?</small></li>
</ol>`,
      lab: "<b>분석값이 튈 때의 원인 찾기</b>와 같아요. 기기 탓을 하기 전에 시료, 표준물질, 분석 조건을 하나씩 점검하잖아요. AI 결과도 입력, 예시, 규칙을 하나씩 봐요.",
      quiz: {
        q: "AI 결과가 이상할 때 가장 먼저 할 일은?",
        options: ["다른 AI로 바로 바꾼다", "왜 그렇게 했는지 묻고, 입력값과 예시를 점검한다", "스킬을 전부 지우고 처음부터 쓴다"], answer: 1,
        explain: "AI에게 이유를 물으면 원인이 바로 보이는 경우가 많아요. 대개 입력값, 예시, 규칙 중 하나예요.",
      },
      scene(api) {
        const s = api.svg();
        const A = api.accent;
        person(api, s, 40, 66);
        const ai = bot(api, s, 362, 54, 22);
        const ask = pill(api, s, 150, 34, "왜 그렇게 했어?", INK, 11);
        const ans = pill(api, s, 252, 100, "예시에 그렇게 있었어요", A, 10.5);
        // 용의자 셋
        const SUS = ["입력값", "예시", "규칙"];
        const sus = SUS.map((w, i) => {
          const x = 72 + i * 128;
          const g = api.n("g", {}, s);
          const box = api.n("rect", { x: x - 52, y: 140, width: 104, height: 44, rx: 10, fill: "#fff", stroke: "#cfcabe", "stroke-width": 1.8 }, g);
          api.t(w, { x, y: 167, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: INK }, g);
          const mk = api.t("", { x: x + 38, y: 156, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: GUIDE }, g);
          return { box, mk, x };
        });
        const lens = api.n("g", {}, s);
        api.n("circle", { r: 11, fill: "rgba(255,255,255,.6)", stroke: INK, "stroke-width": 2.2 }, lens);
        api.n("line", { x1: 8, y1: 8, x2: 16, y2: 16, stroke: INK, "stroke-width": 3, "stroke-linecap": "round" }, lens);
        // 결과 줄
        const resBox = api.n("rect", { x: 70, y: 220, width: 260, height: 34, rx: 8, fill: "#fff", stroke: BAD, "stroke-width": 2 }, s);
        const res = api.t("유입 경로: 제조 공정 ?", { x: 200, y: 242, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: BAD }, s);
        api.t("결과물", { x: 70, y: 212, "font-size": 9.5, fill: MUTED }, s);
        api.loop(t => {
          t = t % 10;
          const out = 1 - seg(t, 9.4, 9.9);
          ask.setAttribute("opacity", seg(t, 0.6, 1.0) * out);
          ans.setAttribute("opacity", seg(t, 1.8, 2.2) * out);
          ai.setAttribute("transform", `translate(362, 54) rotate(${t > 1.4 && t < 1.9 ? Math.sin(t * 20) * 6 : 0})`);
          // 돋보기: 입력값 → 예시 → 규칙 차례로, 예시에서 빨간불
          const k = t < 3.6 ? 0 : t < 4.8 ? 1 : 2;
          lens.setAttribute("transform", `translate(${sus[k].x + 30 + Math.sin(t * 6) * 3}, 196)`);
          lens.setAttribute("opacity", t > 2.6 && t < 6.0 ? out : 0);
          sus.forEach((sv, i) => {
            const checked = t > 3.4 + i * 1.2;
            const bad = i === 1 && checked && t < 6.4;
            sv.mk.textContent = !checked ? "" : bad ? "✗" : "✓";
            sv.mk.setAttribute("fill", bad ? BAD : GUIDE);
            sv.box.setAttribute("stroke", bad ? BAD : checked ? GUIDE : "#cfcabe");
          });
          const fixed = t > 6.6;
          res.textContent = fixed ? "유입 경로: 확인 불가 ✓" : "유입 경로: 제조 공정 ?";
          res.setAttribute("fill", fixed ? GUIDE : BAD);
          resBox.setAttribute("stroke", fixed ? GUIDE : BAD);
          res.setAttribute("opacity", out); resBox.setAttribute("opacity", out);
        }, 7.6);
      },
    },
    {
      title: "빠르면 3일, 입력만 넣으면 되는 날",
      tag: "쓸 때마다 조금씩 다듬으면, 고칠 게 하루하루 줄어요",
      lead: "넣고, 고르고, 적어 두고, 이상하면 묻기. 이걸 매일 반복하며 내가 쓰는 AI 에이전트를 다듬으면, 빠르면 3일 안에 입력만 넣으면 되는 수준까지 와요.",
      body: `
<h3>3일 계획</h3>
<ol class="steps">
  <li><b>1일차: 만들기</b><small>업무 소개, 입력 양식, 첫 스킬. 3개 안을 받아 고르고 고칠 점을 말해요. 고칠 게 많아요.</small></li>
  <li><b>2일차: 적어 두기</b><small>고른 이유와 고친 점을 스킬과 검증에. 이상한 결과는 "왜?"로 원인을 찾아 고쳐요.</small></li>
  <li><b>3일차: 맡기기</b><small>고칠 게 거의 없어져요. 양식을 넣고, 읽고, 보내기만 해요.</small></li>
</ol>

<h3>기억을 잃지 않는 에이전트</h3>
<p>2권에서는 대화형 AI가 창을 닫으면 기억을 잃는다고 했죠.<br>하지만 <b>에이전트</b>는 전혀 달라요.</p>
<p>기존에 한 업무와 나와 나눈 대화, 새로 배운 규칙을 <b>지침(훅)과 스킬 파일에 계속해서 기록하고 업데이트</b>하거든요.<br>경험이 차곡차곡 쌓이기 때문에, 시간이 지날수록 일을 배운 사람 동료와 다를 게 없어져요.</p>

<h3>웬만한 시니어보다 똑똑한 인력</h3>
<p>이렇게 사흘 정도 쓰면서 <b>훅과 스킬, 하네스(검증 장치)</b>가 다듬어지면,<br>내 업무 방식과 규정을 완벽히 꿰고 있는 <b>웬만한 시니어보다 똑똑한 전담 인력</b>이 하나 생기는 것과 똑같아요.</p>

<h3>그래도 마지막은 나</h3>
<p>에이전트가 아무리 똑똑해져도 <b>판정, 서명, 보내기 버튼</b>은 내가 쥐어요.<br>그 대신 직접 쓰느라 고생하던 시간이 여유롭게 읽고 검토하는 시간으로 바뀌어요.</p>`,
      lab: "<b>새 분석법을 자리 잡게 하는 과정</b>과 같아요. 처음 며칠은 조건을 여러 번 맞추지만, 한 번 잡히고 나면 시료만 넣으면 매번 같은 결과가 나오죠.",
      quiz: {
        q: "3일 안에 \"입력만 넣으면 되는\" 수준으로 가는 데 가장 중요한 습관은?",
        options: ["고른 이유와 이상했던 원인을 스킬과 검증에 계속 적는다", "첫날 완벽한 지침을 한 번에 다 써 둔다", "결과가 이상하면 그날은 AI를 쓰지 않는다"], answer: 0,
        explain: "쓸 때마다 배운 걸 적어 두는 게 곧 AI를 가르치는 거예요. 그래서 하루하루 고칠 게 줄어요.",
      },
      scene(api) {
        const s = api.svg();
        const A = api.accent;
        api.t("내가 고친 것", { x: 24, y: 34, "font-size": 11, "font-weight": 800, fill: MUTED }, s);
        api.n("line", { x1: 24, y1: 224, x2: 376, y2: 224, stroke: "#cfcabe", "stroke-width": 2 }, s);
        const DAYS = [["1일차", 150, HARN, "많이"], ["2일차", 72, "#c9a227", "조금"], ["3일차", 16, GUIDE, "거의 없음"]];
        const bars = DAYS.map(([d, h, c, w], i) => {
          const x = 76 + i * 124;
          api.t(d, { x, y: 246, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: INK }, s);
          const bar = api.n("rect", { x: x - 30, y: 224, width: 60, height: 0, rx: 6, fill: c }, s);
          const lb = api.t(w, { x, y: 0, "text-anchor": "middle", "font-size": 10.5, "font-weight": 700, fill: c }, s);
          return { bar, lb, h, x };
        });
        const auto = pill(api, s, 324, 120, "입력만 넣으면 끝 ✓", GUIDE, 11);
        const cap = api.t("쓸 때마다 한 줄씩 적어 두면", { x: 200, y: 282, "text-anchor": "middle", "font-size": 11.5, "font-weight": 800, fill: A }, s);
        api.loop(t => {
          t = t % 8;
          const out = 1 - seg(t, 7.4, 7.9);
          bars.forEach((b, i) => {
            const p = seg(t, 0.4 + i * 1.1, 1.2 + i * 1.1);
            const h = b.h * p;
            b.bar.setAttribute("y", 224 - h); b.bar.setAttribute("height", h);
            b.bar.setAttribute("opacity", out);
            b.lb.setAttribute("y", 216 - h);
            b.lb.setAttribute("opacity", seg(t, 1.0 + i * 1.1, 1.3 + i * 1.1) * out);
          });
          auto.setAttribute("opacity", seg(t, 4.2, 4.6) * out);
          cap.setAttribute("opacity", seg(t, 4.6, 5.0) * out);
        }, 6);
      },
    },
  ],

  recap: {
    title: "실전 편에서 배운 것",
    points: [
      "PC로 하는 일은 대부분 AI에게 맡길 수 있어요. 먼저 <b>내 업무를 소개</b>해요.",
      "<b>입력 양식</b>을 정해 두면, 넣기만 해도 지침과 스킬대로 끝까지 만들어요.",
      "스킬에 <b>3개 안</b>을 적어 두고, 10분쯤 뒤 와서 고르고 고칠 점만 말해요.",
      "마음에 든 점은 스킬과 검증에 적고, 이상하면 <b>\"왜 그렇게 했어?\"</b>로 입력값과 예시를 점검해요.",
      "매일 다듬으면 <b>빠르면 3일</b> 만에 입력만 넣으면 되는 수준이 돼요. 판정과 보내기는 끝까지 내 몫이에요.",
    ],
    nextLabel: "마치며",
    next: "오늘 내 자리에서 하나만 골라 시작해 보세요. 업무 소개 한 단락, 입력 양식 하나, 스킬 한 장. 3일 뒤에는 성적서 초안을 기다리며 현미경을 보고 있을 거예요.",
  },

  recapScene(api) {
    const s = api.svg();
    const A = api.accent;
    // 왼쪽: AI가 PC 일을 해 두고, 오른쪽: 나는 현미경
    const mon = api.n("g", {}, s);
    api.n("rect", { x: 30, y: 60, width: 170, height: 120, rx: 10, fill: "#fff", stroke: INK, "stroke-width": 2 }, mon);
    api.n("rect", { x: 100, y: 180, width: 30, height: 16, fill: INK }, mon);
    api.n("rect", { x: 80, y: 196, width: 70, height: 6, rx: 3, fill: INK }, mon);
    const TODO = ["성적서 초안", "회신 메일", "업무일지"];
    const rows = TODO.map((w, i) => {
      api.t(w, { x: 48, y: 96 + i * 28, "font-size": 11, "font-weight": 700, fill: INK }, s);
      return api.t("✓", { x: 176, y: 96 + i * 28, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: GUIDE }, s);
    });
    bot(api, s, 200, 60, 16);
    // 현미경
    const mic = api.n("g", { transform: "translate(300, 130)" }, s);
    api.n("rect", { x: -34, y: 50, width: 68, height: 10, rx: 3, fill: MUTED }, mic);
    api.n("rect", { x: 14, y: -30, width: 10, height: 82, rx: 3, fill: MUTED }, mic);
    api.n("rect", { x: -4, y: -62, width: 14, height: 46, rx: 4, fill: INK, transform: "rotate(-25 3 -39)" }, mic);
    api.n("rect", { x: 4, y: -20, width: 8, height: 12, rx: 2, fill: INK }, mic);
    api.n("rect", { x: -26, y: 22, width: 46, height: 6, rx: 2, fill: MUTED }, mic);
    person(api, s, 344, 152, A, "");
    api.t("나는 나만 할 일을", { x: 300, y: 222, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: A }, s);
    api.t("AI는 PC 일을", { x: 115, y: 228, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: INK }, s);
    api.loop(t => {
      t = t % 6;
      const out = 1 - seg(t, 5.5, 5.9);
      rows.forEach((r, i) => r.setAttribute("opacity", seg(t, 0.6 + i * 0.8, 0.9 + i * 0.8) * out));
    }, 4);
  },
});
})();
