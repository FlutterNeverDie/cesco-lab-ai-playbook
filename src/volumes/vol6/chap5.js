export default {
      title: "검증(Harness): 돌려주기 전 마지막 검사대",
      tag: "자주 하는 실수를 적어 두고, 넘기기 전에 걸러요",
      lead: "검증(Harness)은 AI가 결과물을 나에게 주기 전에 한 번 더 검사하는 단계예요. 자주 나온 실수 목록을 보고, 빠뜨린 게 없는지 걸러 내요.",
      body: `
<div class="card"><b>왜 하네스(Harness)일까요?</b>하네스는 원래 말에 채우는 마구예요. AI에 채워서 엇나가지 않게 잡아 주는 장치라서, 검증 장치를 이렇게 부르기도 해요.</div>

<h3>실수 목록이 곧 검사표</h3>
<p>AI도 같은 실수를 되풀이해요.<br>볼 때마다 한 줄씩 적어 두면 그게 <b>검사표</b>가 돼요.</p>
<div class="cards">
  <div class="card"><b>고객 정보가 그대로 들어갔나?</b>이름, 연락처는 가려서 넘겨요.</div>
  <div class="card"><b>회사 이름과 양식이 맞나?</b>세스코 이름과 우리 팀 공식 양식으로 썼는지 봐요.</div>
  <div class="card"><b>숫자와 단위가 원본과 같나?</b>옮기다 바뀐 숫자가 없는지 맞춰 봐요.</div>
  <div class="card"><b>확인 안 된 걸 사실처럼 썼나?</b>추측이면 추측이라고 적어요.</div>
</div>

<h3>걸리면 고쳐서 다시</h3>
<p>검사에 걸린 건 AI가 고친 뒤 <b>다시 검사</b>해요.<br>통과한 것만 나에게 와요.</p>

<h3>마지막은 여전히 나</h3>
<p>검증은 실수를 크게 줄여 주지만 전부 잡지는 못해요.<br>5권에서 본 것처럼, 마지막 확인과 책임은 사람에게 있어요.</p>`,
      lab: "<b>성적서 발행 전 이중 확인</b>과 같아요. 검토자가 체크리스트를 보며 하나씩 짚고 나서야 서명하죠. 검증은 AI 쪽의 첫 번째 검토자예요.",
      quiz: {
        q: "AI가 보고서에 고객 연락처를 자꾸 그대로 넣어요. 어떻게 하면 좋을까요?",
        options: ["매번 내가 눈으로 찾아 지우는 수밖에 없다", "AI가 알아서 고칠 때까지 기다린다", "검증 목록에 '고객 정보 가리기'를 적어 넘기기 전에 걸러 낸다"], answer: 2,
        explain: "되풀이되는 실수는 검사표에 적어 두면, 넘기기 전에 매번 걸러져요. 그래도 마지막 확인은 내가 해요.",
      },
      scene(api) {
        const s = api.svg();
        // 검사표
        api.n("rect", { x: 104, y: 12, width: 192, height: 76, rx: 8, fill: "#fff", stroke: HARN, "stroke-width": 1.5 }, s);
        const ITEMS = ["고객 정보 가렸나", "회사 이름 · 양식", "숫자 · 단위 원본과 같나"];
        const marks = ITEMS.map((w, i) => {
          const y = 34 + i * 21;
          const m = api.t("□", { x: 118, y, "font-size": 12, "font-weight": 800, fill: MUTED }, s);
          api.t(w, { x: 136, y, "font-size": 10.5, fill: INK }, s);
          return m;
        });
        // 검사대 문 + 벨트
        api.n("rect", { x: 10, y: 200, width: 380, height: 12, rx: 6, fill: "#cfcabe" }, s);
        [40, 100, 160, 240, 300, 360].forEach(x => api.n("circle", { cx: x, cy: 206, r: 3, fill: "#fff" }, s));
        const beam = api.n("rect", { x: 172, y: 116, width: 56, height: 84, fill: HARN, opacity: 0 }, s);
        api.t("검증 (Harness)", { x: 200, y: 106, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: HARN }, s);
        bot(api, s, 36, 160, 20);
        person(api, s, 370, 152);

        // 결과물 문서
        const d = api.n("g", {}, s);
        api.n("rect", { x: -38, y: -40, width: 76, height: 80, rx: 5, fill: "#fff", stroke: INK, "stroke-width": 1.5 }, d);
        const r1 = api.t("고객 홍길동", { x: -30, y: -18, "font-size": 9.5, "font-weight": 700, fill: INK }, d);
        const r2 = api.t("회사명 (빈칸)", { x: -30, y: 2, "font-size": 9.5, "font-weight": 700, fill: INK }, d);
        api.t("이물 2.1mm", { x: -30, y: 22, "font-size": 9.5, fill: INK }, d);
        const f1 = api.n("rect", { x: -34, y: -30, width: 68, height: 17, rx: 3, fill: "none", stroke: BAD, "stroke-width": 2 }, d);
        const f2 = api.n("rect", { x: -34, y: -10, width: 68, height: 17, rx: 3, fill: "none", stroke: BAD, "stroke-width": 2 }, d);
        // 문 기둥은 문서 위에 그려야 '통과'하는 느낌
        api.n("rect", { x: 166, y: 112, width: 8, height: 90, rx: 2, fill: HARN }, s);
        api.n("rect", { x: 226, y: 112, width: 8, height: 90, rx: 2, fill: HARN }, s);
        api.n("rect", { x: 166, y: 112, width: 68, height: 8, rx: 2, fill: HARN }, s);

        const st1 = pill(api, s, 200, 244, "걸렸어요 2건", BAD, 11);
        const st2 = pill(api, s, 200, 244, "고쳐서 다시 검사", HARN, 11);
        const st3 = pill(api, s, 200, 244, "통과 ✓ 이제 나에게", GUIDE, 11);
        api.t("자주 하는 실수를 적어 두고 걸러요", { x: 200, y: 284, "text-anchor": "middle", "font-size": 10.5, fill: MUTED }, s);

        const mark = (m, ch, c) => { m.textContent = ch; m.setAttribute("fill", c); };
        api.loop(t => {
          t = t % 9;
          const out = 1 - seg(t, 8.4, 8.9);
          const x = t < 3 ? lerp(70, 200, seg(t, 0.6, 1.8)) : lerp(200, 296, seg(t, 5.8, 6.8));
          d.setAttribute("transform", `translate(${x}, 160)`);
          d.setAttribute("opacity", seg(t, 0.2, 0.6) * out);
          beam.setAttribute("opacity", (t > 1.8 && t < 5.8 ? 0.12 + 0.12 * Math.sin(t * 8) : 0));
          const caught = t > 2.8, fixed1 = t > 4.2, fixed2 = t > 4.8;
          r1.textContent = fixed1 ? "고객 ●●●" : "고객 홍길동";
          r2.textContent = fixed2 ? "세스코" : "회사명 (빈칸)";
          f1.setAttribute("opacity", caught && !fixed1 ? 1 : 0);
          f2.setAttribute("opacity", caught && !fixed2 ? 1 : 0);
          if (!caught) marks.forEach(m => mark(m, "□", MUTED));
          else {
            mark(marks[0], fixed1 ? "✓" : "✗", fixed1 ? GUIDE : BAD);
            mark(marks[1], fixed2 ? "✓" : "✗", fixed2 ? GUIDE : BAD);
            mark(marks[2], "✓", GUIDE);
          }
          st1.setAttribute("opacity", (t > 2.9 && t < 3.9 ? 1 : 0) * out);
          st2.setAttribute("opacity", (t >= 3.9 && t < 5.6 ? 1 : 0) * out);
          st3.setAttribute("opacity", (t >= 5.6 ? 1 : 0) * out);
        }, 7.6);
      },
    };
