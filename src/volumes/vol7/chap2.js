export default {
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
    };
