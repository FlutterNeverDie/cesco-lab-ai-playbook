export default {
      title: "다음 조각 맞히기",
      tag: "막대 길이는 설명을 위한 예시 확률이에요",
      lead: "LLM이 하는 일은 사실 하나뿐이에요. 지금까지의 글을 보고 '다음에 올 조각'을 확률로 골라 이어 붙이는 거예요.",
      body: `
<h3>다음 말 맞히기</h3>
<p>"세스코 연구소에서" 다음에 올 말은 뭘까요?</p>
<p>"이물을"은 자주 나올 것 같고,<br>"고양이가"는 거의 안 나올 것 같죠.</p>
<p>LLM도 똑같이 <b>후보마다 확률</b>을 매겨요.</p>
<h3>긴 답은 이렇게 만들어져요</h3>
<ol class="steps">
  <li>후보 중 하나를 골라 <b>문장 끝에 붙여요.</b></li>
  <li>늘어난 문장을 보고 <b>다시 다음 조각</b>을 골라요.</li>
  <li>이걸 <b>수백 번</b> 반복하면 긴 답이 돼요.<small>답이 타이핑되듯 한 글자씩 나오는 이유예요.</small></li>
</ol>
<h3>같은 질문, 조금 다른 답</h3>
<p>매번 1등만 고르면 말투가 딱딱해져요.<br>그래서 <b>조금은 무작위로</b> 골라요.</p>
<p>이 무작위 정도를 <b>온도(temperature)</b>라고 불러요.</p>`,
      lab: "<b>적정</b>을 떠올려 보세요. 한 번에 다 붓지 않고 한 방울씩 떨어뜨리면서, 지금 색을 보고 다음 방울을 정하죠. LLM도 답을 한 번에 만들지 않고, <b>지금까지 쓴 글을 보며 한 조각씩</b> 떨어뜨려요.",
      quiz: {
        q: "같은 질문을 두 번 했는데 답이 조금 달라요. 왜 그럴까요?",
        options: ["AI가 고장 나서", "다음 조각을 확률에 따라 조금 무작위로 고르기 때문에", "인터넷이 느려서"],
        answer: 1,
        explain: "확률이 높은 후보 중에서 조금씩 다르게 고르기 때문이에요. 이 정도를 정하는 값이 온도예요.",
      },
      scene(api) {
        const s = api.svg();
        const base = ["세스코", "연구소에서"];
        const rounds = [
          { cands: [["이물을", .62], ["오늘", .21], ["고양이가", .04]] },
          { cands: [["분석했어요", .55], ["발견했어요", .30], ["먹었어요", .02]] },
        ];
        api.t("지금까지의 글", { x: 24, y: 30, "font-size": 12, fill: "#6b7280" }, s);
        api.n("rect", { x: 16, y: 40, width: 368, height: 44, rx: 10, fill: "#fff", stroke: "#d8d4c9" }, s);
        const words = [...base, rounds[0].cands[0][0], rounds[1].cands[0][0]];
        let wx = 30;
        const wEls = words.map(w => {
          const e = api.t(w, { x: wx, y: 68, "font-size": 16, "font-weight": 600, fill: "#23272f" }, s);
          const len = e.getComputedTextLength ? e.getComputedTextLength() || w.length * 16 : w.length * 16;
          const px = wx; wx += len + 8; return { e, x: px };
        });
        const cursor = api.n("rect", { x: 0, y: 54, width: 2, height: 20, fill: api.accent }, s);
        const head = api.t("다음 조각 후보", { x: 24, y: 118, "font-size": 12, fill: "#6b7280" }, s);
        const rowsY = [148, 192, 236];
        const rows = rowsY.map(y => {
          const lab = api.t("", { x: 24, y: y + 5, "font-size": 14, "font-weight": 600, fill: "#23272f" }, s);
          const bg = api.n("rect", { x: 110, y: y - 12, width: 220, height: 24, rx: 6, fill: "#ece9e1" }, s);
          const bar = api.n("rect", { x: 110, y: y - 12, width: 0, height: 24, rx: 6, fill: api.accent, "fill-opacity": .35 }, s);
          const pct = api.t("", { x: 340, y: y + 5, "font-size": 13, "font-weight": 700, fill: "#6b7280" }, s);
          return { lab, bg, bar, pct };
        });
        const fly = api.t("", { "font-size": 16, "font-weight": 700, fill: api.accent }, s);
        const R = 4.2;
        api.loop(t => {
          t = t % (R * 2 + 2);
          const ri = Math.min(1, Math.floor(t / R)), lt = t - ri * R, done = t >= R * 2;
          const r = rounds[ri];
          // 문장 단어 보이기
          wEls.forEach((w, i) => {
            const shown = i < 2 || (i === 2 && (ri > 0 || lt > 3.2)) || (i === 3 && (done || (ri === 1 && lt > 3.2)));
            w.e.setAttribute("opacity", shown ? 1 : 0);
          });
          const lastShown = [...wEls].reverse().find(w => w.e.getAttribute("opacity") === "1");
          const endX = lastShown.x + (lastShown.e.getComputedTextLength() || 40) + 4;
          cursor.setAttribute("x", endX); cursor.setAttribute("opacity", Math.sin(t * 6) > 0 ? 1 : 0);
          const vis = done ? 0 : 1;
          head.setAttribute("opacity", vis);
          rows.forEach((row, k) => {
            const [w, p] = r.cands[k];
            row.lab.textContent = w;
            const g = seg(lt, 0.2 + k * 0.15, 1.4 + k * 0.15);
            row.bar.setAttribute("width", 220 * p * g);
            row.pct.textContent = Math.round(p * 100 * g) + "%";
            const pick = k === 0 && lt > 1.9;
            row.bar.setAttribute("fill-opacity", pick ? .9 : .35);
            row.lab.setAttribute("fill", pick ? api.accent : "#23272f");
            row.lab.setAttribute("fill-opacity", k === 0 && lt > 2.3 && lt < 3.2 ? 0 : 1);
            [row.lab, row.bg, row.bar, row.pct].forEach(e => e.setAttribute("opacity", vis));
          });
          // 1등 단어가 문장으로 날아감
          const f = seg(lt, 2.3, 3.2);
          if (!done && lt > 2.3 && lt < 3.2) {
            const target = wEls[2 + ri];
            fly.textContent = r.cands[0][0];
            fly.setAttribute("x", 24 + (target.x - 24) * f);
            fly.setAttribute("y", rowsY[0] + 5 + (68 - rowsY[0] - 5) * f);
            fly.setAttribute("opacity", 1);
          } else fly.setAttribute("opacity", 0);
        }, 2.5);
      },
    };
