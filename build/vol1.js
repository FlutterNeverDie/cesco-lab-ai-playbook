BOOKS.push({
  no: 1,
  series: "연구원을 위한 AI 그림책",
  kicker: "HOW AI TALKS",
  title: "AI는 어떻게 말을 할까",
  subtitle: "AI를 한 번도 배워 본 적 없어도 괜찮아요.<br>실험실 이야기로 AI의 작동 원리를 5장에 걸쳐 풀어 볼게요.",
  color: { accent: "#6d4ae0", ink: "#3f2a9e", soft: "#f1ecff" },
  coverTag: "AI 안에서 일어나는 일들",
  recapTag: "1권에서 배운 것",

  coverScene(api) {
    const s = api.svg();
    const words = ["토큰", "확률", "학습", "신경망", "LLM", "환각", "머신러닝", "다음 단어"];
    api.n("circle", { cx: 200, cy: 150, r: 62, fill: api.accent, opacity: .12 }, s);
    const core = api.n("circle", { cx: 200, cy: 150, r: 44, fill: api.accent }, s);
    api.t("AI", { x: 200, y: 162, "text-anchor": "middle", "font-size": 34, "font-weight": 800, fill: "#fff" }, s);
    const chips = words.map(w => {
      const g = api.n("g", {}, s);
      const wdt = w.length * 14 + 22;
      api.n("rect", { x: -wdt / 2, y: -15, width: wdt, height: 30, rx: 15, fill: "#fff", stroke: api.accent, "stroke-width": 1.5 }, g);
      api.t(w, { x: 0, y: 5, "text-anchor": "middle", "font-size": 13, "font-weight": 600, fill: "#3f2a9e" }, g);
      return g;
    });
    api.loop(t => {
      core.setAttribute("r", 44 + Math.sin(t * 2) * 3);
      chips.forEach((g, i) => {
        const a = t * 0.35 + (i / chips.length) * Math.PI * 2;
        const x = 200 + Math.cos(a) * 150, y = 150 + Math.sin(a) * 105;
        g.setAttribute("transform", `translate(${x},${y})`);
      });
    }, 0);
  },

  chapters: [
    {
      title: "AI, 머신러닝, LLM은 어떤 관계일까요?",
      tag: "큰 동그라미 안에 작은 동그라미가 들어 있어요",
      lead: "AI는 가장 큰 동그라미예요. 그 안에 머신러닝, 그 안에 딥러닝, 가장 안쪽에 우리가 매일 쓰는 LLM이 있어요.",
      body: `
<h3>네 개의 동그라미</h3>
<div class="cards">
  <div class="card"><b>AI 인공지능</b>사람처럼 판단하는 프로그램을 모두 부르는 이름이에요.</div>
  <div class="card"><b>머신러닝</b>규칙 대신 예시를 잔뜩 보여 주면, AI가 스스로 규칙을 찾아요.</div>
  <div class="card"><b>딥러닝</b>뇌의 신경세포를 흉내 낸 신경망을 깊게 쌓은 머신러닝이에요. 4장에서 3D로 봐요.</div>
  <div class="card"><b>LLM 대규모 언어 모델</b>글을 엄청나게 많이 읽은 딥러닝 모델이에요. ChatGPT, Claude, Gemini가 여기 있어요.</div>
</div>
<h3>옛날 AI와 지금 AI</h3>
<p>옛날에는 사람이 규칙을 직접 적었어요.<br>"크기가 2mm보다 크면 경고"처럼요.</p>
<p>지금은 사진 수천 장을 보여 주면,<br>AI가 <b>"머리카락은 이렇게 생겼구나"</b>를 스스로 익혀요.</p>
<h3>생성형 AI는요?</h3>
<p>글이나 그림을 <b>새로 만들어 내는</b> AI를 부르는 말이에요.<br>LLM이 대표적인 생성형 AI예요.</p>`,
      lab: "옛날 AI는 <b>판정 기준표</b>예요. 표에 적힌 기준만 따라가요. 머신러닝은 <b>숙련 연구원</b>이에요. 시료 수천 개를 직접 보면서 기준표에 없는 감까지 익혀요.",
      quiz: {
        q: "ChatGPT나 Claude는 그림의 어느 동그라미에 들어갈까요?",
        options: ["가장 바깥, 규칙을 사람이 적어 준 AI", "가장 안쪽, LLM", "AI가 아니라 그냥 검색 엔진"],
        answer: 1,
        explain: "글을 엄청나게 읽은 딥러닝 모델, 즉 LLM이에요. LLM도 결국 AI의 한 종류라서 바깥 동그라미들 안에 함께 들어 있어요.",
      },
      scene(api) {
        const s = api.svg(), cx = 165, cy = 150;
        const rings = [
          { r: 132, label: "AI 인공지능", op: .10 },
          { r: 100, label: "머신러닝", op: .16 },
          { r: 68, label: "딥러닝", op: .24 },
          { r: 36, label: "LLM", op: 1 },
        ].map((d, i) => {
          const g = api.n("g", {}, s);
          api.n("circle", { cx, cy, r: d.r, fill: api.accent, "fill-opacity": d.op, stroke: api.accent, "stroke-opacity": .5 }, g);
          api.t(d.label, { x: cx, y: i === 3 ? cy + 5 : cy - d.r + 20, "text-anchor": "middle", "font-size": i === 3 ? 15 : 13, "font-weight": 700, fill: i === 3 ? "#fff" : "#3f2a9e" }, g);
          return g;
        });
        const names = ["ChatGPT", "Claude", "Gemini"];
        const chips = names.map((nm, i) => {
          const g = api.n("g", {}, s);
          const y = 95 + i * 55;
          const line = api.n("line", { x1: 318, y1: y, x2: cx + 30, y2: cy, stroke: api.accent, "stroke-width": 1.2, "stroke-dasharray": "3 3" }, g);
          api.n("rect", { x: 318, y: y - 15, width: 74, height: 30, rx: 8, fill: "#fff", stroke: api.accent }, g);
          api.t(nm, { x: 355, y: y + 5, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "#23272f" }, g);
          return { g, line };
        });
        api.loop(t => {
          t = t % 11;
          const out = 1 - seg(t, 10, 10.8);
          rings.forEach((g, i) => {
            const p = seg(t, 0.3 + i * 0.9, 1.1 + i * 0.9);
            g.setAttribute("opacity", p * out);
            g.setAttribute("transform", `translate(${cx},${cy}) scale(${0.85 + 0.15 * p}) translate(${-cx},${-cy})`);
          });
          chips.forEach(({ g }, i) => {
            const p = seg(t, 4.8 + i * 0.6, 5.6 + i * 0.6);
            g.setAttribute("opacity", p * out);
            g.setAttribute("transform", `translate(${(1 - p) * 40},0)`);
          });
        }, 9);
      },
    },
    {
      title: "토큰: AI는 글을 조각내서 읽어요",
      tag: "예시로 나눈 조각이에요. 실제로는 모델마다 조금씩 다르게 잘라요",
      lead: "AI는 글을 글자 그대로 읽지 않아요. '토큰'이라는 작은 조각으로 자른 뒤, 조각마다 붙은 번호로 바꿔서 읽어요.",
      body: `
<h3>AI가 글을 읽는 순서</h3>
<ol class="steps">
  <li>문장을 <b>자주 쓰이는 조각</b>으로 잘라요.<small>이 조각을 토큰이라고 불러요.</small></li>
  <li>조각마다 AI 사전에 정해진 <b>번호</b>로 바꿔요.</li>
  <li>AI 안에서는 글이 아니라 <b>번호의 줄</b>이 오가요.</li>
</ol>
<h3>토큰을 알아야 하는 이유</h3>
<div class="cards">
  <div class="card"><b>요금</b>AI 서비스 요금은 토큰 수로 계산해요.</div>
  <div class="card"><b>한 번에 넣을 수 있는 양</b>AI가 한 번에 볼 수 있는 분량도 토큰으로 세요. 2권에서 자세히 봐요.</div>
  <div class="card"><b>한국어는 더 잘게</b>같은 내용이어도 한국어는 영어보다 조각이 많이 나오는 편이에요.</div>
</div>`,
      lab: "<b>시료 전처리</b>와 같아요. 큰 시료를 그대로 장비에 넣지 않고, 분석할 수 있는 크기로 자른 뒤 조각마다 <b>번호 라벨</b>을 붙이잖아요. AI도 글을 잘라 번호를 붙여야 분석을 시작할 수 있어요.",
      quiz: {
        q: "AI가 글을 처리하는 기본 단위를 무엇이라고 부를까요?",
        options: ["픽셀", "토큰", "바이트"],
        answer: 1,
        explain: "글을 자른 조각이 토큰이에요. 요금도, 한 번에 넣을 수 있는 양도 토큰으로 세요.",
      },
      scene(api) {
        const s = api.svg();
        const pieces = ["이물", "분석", "결과", "머리", "카락", "으로", "추정", "됩니다"];
        const spaceBefore = [false, true, true, true, false, false, true, false];
        const ids = [48213, 9021, 30117, 15502, 7764, 2210, 41876, 12093];
        const palette = ["#ede6ff", "#ffe9d6", "#dff3ea", "#fde2e7", "#e1edff", "#fff3c4", "#e8e3f7", "#d9f2f5"];
        const cw = 15;
        // 문장 상태 위치
        let x = 0; const sent = pieces.map((p, i) => { if (spaceBefore[i]) x += 7; const px = x; x += p.length * cw; return px; });
        const sw = x, sx0 = 200 - sw / 2;
        // 조각 상태 위치 (두 줄)
        const rows = [pieces.slice(0, 4), pieces.slice(4)];
        const blk = [];
        rows.forEach((row, ri) => {
          const ws = row.map(p => p.length * cw + 20), tot = ws.reduce((a, b) => a + b, 0) + (row.length - 1) * 12;
          let bx = 200 - tot / 2;
          row.forEach((p, k) => { blk.push({ x: bx, y: ri === 0 ? 120 : 200, w: ws[k] }); bx += ws[k] + 12; });
        });
        const title = api.t("AI에 들어온 문장", { x: 200, y: 40, "text-anchor": "middle", "font-size": 13, fill: "#6b7280" }, s);
        const sentBox = api.n("rect", { x: sx0 - 14, y: 62, width: sw + 28, height: 40, rx: 10, fill: "#fff", stroke: "#d8d4c9" }, s);
        const gs = pieces.map((p, i) => {
          const g = api.n("g", {}, s);
          const r = api.n("rect", { x: 0, y: -17, width: blk[i].w, height: 34, rx: 8, fill: palette[i], stroke: api.accent, "stroke-opacity": 0 }, g);
          const tx = api.t(p, { x: 10, y: 6, "font-size": 16, "font-weight": 600, fill: "#23272f" }, g);
          const num = api.t(String(ids[i]), { x: blk[i].w / 2, y: 36, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: api.accent }, g);
          return { g, r, tx, num };
        });
        api.loop(t => {
          t = t % 10;
          const split = seg(t, 1.6, 3.0), nums = seg(t, 3.6, 4.6), out = 1 - seg(t, 9.2, 9.9);
          title.textContent = t < 3.3 ? "AI에 들어온 문장" : t < 4.2 ? "토큰으로 자르기" : "조각마다 번호로 바꾸기";
          sentBox.setAttribute("opacity", (1 - split) * out);
          gs.forEach(({ g, r, tx, num }, i) => {
            const fx = sx0 + sent[i] - 10, fy = 82;
            const px = fx + (blk[i].x - fx) * split, py = fy + (blk[i].y - fy) * split;
            g.setAttribute("transform", `translate(${px},${py})`);
            g.setAttribute("opacity", out);
            r.setAttribute("fill-opacity", split);
            r.setAttribute("stroke-opacity", split * .5);
            num.setAttribute("opacity", nums);
          });
        }, 6);
      },
    },
    {
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
    },
    {
      title: "학습: 빈칸 채우기를 수조 번",
      tag: "드래그해서 돌려 보세요 · 보라색은 계산, 빨간색은 고치기",
      lead: "LLM은 책과 인터넷의 엄청난 글로 '다음 조각 맞히기' 문제를 수조 번 풀면서 만들어져요. 틀릴 때마다 속의 다이얼을 조금씩 돌려요.",
      body: `
<h3>다이얼이 달린 그물</h3>
<p>왼쪽 그림이 <b>신경망</b>이에요.<br>선마다 <b>다이얼</b>이 하나씩 달려 있다고 생각해 보세요.</p>
<p>이 다이얼을 <b>매개변수(파라미터)</b>라고 불러요.<br>요즘 LLM에는 수십억에서 수조 개가 있어요.</p>
<h3>학습은 이렇게 돌아가요</h3>
<ol class="steps">
  <li>글 앞부분을 넣고 <b>다음 조각을 맞혀 봐요.</b><small>그림의 보라색 신호</small></li>
  <li>틀린 만큼 다이얼을 <b>정답 쪽으로 조금</b> 돌려요.<small>그림의 빨간색 신호</small></li>
  <li>엄청난 양의 글로 반복해요.<small>이 단계를 사전 학습이라고 해요.</small></li>
  <li>사람이 좋은 답을 보여 주며 <b>대화를 다듬어요.</b></li>
</ol>
<h3>학습이 끝나면</h3>
<p>다이얼이 <b>고정</b>돼요.<br>그래서 AI는 학습 이후에 생긴 일은 몰라요.</p>
<p>이 경계를 <b>지식 기준일</b>이라고 불러요.</p>`,
      lab: "<b>검량선 만들기</b>와 닮았어요. 표준 시료를 여러 번 측정하면서 장비를 보정하고, 보정이 끝나면 그 검량선을 고정해서 써요. 보정 이후에 새로 나온 물질은 검량선에 없으니 정확히 못 재죠. AI도 학습 이후의 일은 몰라요.",
      quiz: {
        q: "학습이 끝난 AI가 어제 나온 뉴스를 모르는 이유는요?",
        options: ["학습이 끝나면 다이얼이 고정되기 때문에", "AI가 뉴스를 싫어해서", "뉴스는 토큰이 아니라서"],
        answer: 0,
        explain: "학습이 끝나면 매개변수가 고정돼서 그 뒤의 일은 배우지 못해요. 최신 정보가 필요하면 자료를 같이 넣어 줘야 해요(2권).",
      },
      scene(api) {
        const k = makeThree(api, { distance: 13, tilt: 0.25 });
        if (!k) return;
        const { THREE, world, label } = k;
        const layers = [4, 6, 6, 3], xs = [-3.6, -1.2, 1.2, 3.6];
        const accent = new THREE.Color(api.accent), red = new THREE.Color("#e2483d"), gray = new THREE.Color("#b9b4a8");
        const nodes = layers.map((n, li) => Array.from({ length: n }, (_, i) => {
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .5 }));
          m.position.set(xs[li], (i - (n - 1) / 2) * 0.95, 0);
          world.add(m); return m;
        }));
        const lineMat = new THREE.LineBasicMaterial({ color: gray, transparent: true, opacity: .45 });
        for (let li = 0; li < layers.length - 1; li++)
          nodes[li].forEach(a => nodes[li + 1].forEach(b => {
            world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a.position, b.position]), lineMat));
          }));
        // 신호가 지나갈 경로 (층마다 노드 하나)
        let seed = 7; const rnd = n => { seed = (seed * 16807) % 2147483647; return seed % n; };
        const paths = Array.from({ length: 9 }, () => layers.map(n => rnd(n)));
        const pulses = paths.map(() => {
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8), new THREE.MeshBasicMaterial({ color: accent }));
          world.add(m); return m;
        });
        const inL = label("입력: 앞부분 글", { size: .42, color: "#3f2a9e" }); inL.position.set(-2.6, 3.4, 0); world.add(inL);
        const outL = label("출력: 다음 조각", { size: .42, color: "#3f2a9e" }); outL.position.set(2.6, 2.6, 0); world.add(outL);
        const fixL = label("틀린 만큼 다이얼 조정", { size: .45, color: "#e2483d", bg: "rgba(255,255,255,.9)" }); fixL.position.set(0, -3.6, 0); world.add(fixL);
        let last = performance.now();
        api.loop(t => {
          const now = performance.now(), dt = (now - last) / 1000; last = now;
          const P = 6, c = t % P, fwd = c < 2.8, back = c > 3.2 && c < 5.6;
          const p = fwd ? c / 2.8 : back ? 1 - (c - 3.2) / 2.4 : -1;
          nodes.flat().forEach(m => m.material.color.lerp(new THREE.Color(0xffffff), 0.08));
          pulses.forEach((m, i) => {
            if (p < 0) { m.visible = false; return; }
            m.visible = true;
            const f = clamp(p) * 3, s0 = Math.min(2, Math.floor(f)), u = f - s0;
            const a = nodes[s0][paths[i][s0]].position, b = nodes[s0 + 1][paths[i][s0 + 1]].position;
            m.position.lerpVectors(a, b, u);
            m.material.color.copy(fwd ? accent : red);
            const hit = u > 0.9 ? nodes[s0 + 1][paths[i][s0 + 1]] : u < 0.1 ? nodes[s0][paths[i][s0]] : null;
            if (hit) hit.material.color.copy(fwd ? accent : red);
          });
          fixL.material.opacity = back ? 1 : 0.15;
          k.draw(dt);
        }, 1.4);
      },
    },
    {
      title: "AI가 그럴듯하게 틀리는 이유",
      tag: "왼쪽은 자료 없이, 오른쪽은 자료를 함께 줬을 때예요",
      lead: "LLM은 '사실'을 찾아오는 게 아니라 '그럴듯한 다음 조각'을 골라요. 그래서 모르는 것도 자신 있게 지어낼 수 있어요. 이걸 환각이라고 불러요.",
      body: `
<h3>그럴듯한 것과 사실은 달라요</h3>
<p>LLM은 <b>그럴듯한 말</b>을 이어 붙여요. (3장)<br>그런데 그럴듯하다고 사실인 건 아니에요.</p>
<p>그래서 없는 논문 제목이나 틀린 규격 번호를<br>아주 자연스럽게 말할 때가 있어요.</p>
<p>이걸 <b>환각(hallucination)</b>이라고 해요.<br>말투가 자신 있어도 틀릴 수 있어요.</p>
<h3>환각을 줄이는 네 가지</h3>
<div class="cards">
  <div class="card"><b>자료를 같이 주기</b>2권에서 자세히 배워요.<q>이 보고서를 보고 답해 줘</q></div>
  <div class="card"><b>출처를 달라고 하기</b><q>몇 쪽에 있는지도 알려 줘</q></div>
  <div class="card"><b>모르면 모른다고 하게 하기</b><q>자료에 없으면 없다고 해 줘</q></div>
  <div class="card"><b>중요한 숫자는 원본으로 확인하기</b>4권에서 자세히 봐요.</div>
</div>`,
      lab: "측정을 하지 않고 <b>'이 정도 나왔을 거야'</b>라고 성적서를 쓰는 것과 같아요. 문장은 그럴듯해도 원 데이터가 없죠. 성적서에 원 데이터를 붙이듯, AI 답에도 <b>근거</b>를 붙이게 해야 해요.",
      quiz: {
        q: "환각을 줄이는 데 가장 도움이 되는 방법은요?",
        options: ["더 자신 있게 대답하라고 하기", "근거 자료를 함께 주고, 출처를 확인하기", "같은 질문을 크게 여러 번 하기"],
        answer: 1,
        explain: "자료를 함께 주면 AI가 그 안에서 답을 찾고, 출처가 있으면 사람이 바로 확인할 수 있어요.",
      },
      scene(api) {
        const s = api.svg();
        const panel = (x0, title, good) => {
          const g = api.n("g", {}, s);
          api.n("rect", { x: x0, y: 14, width: 180, height: 272, rx: 12, fill: "#fff", stroke: "#e4e1d8" }, g);
          api.t(title, { x: x0 + 90, y: 36, "text-anchor": "middle", "font-size": 12.5, "font-weight": 700, fill: good ? "#1f8a5b" : "#c2410c" }, g);
          // 질문 말풍선
          api.n("rect", { x: x0 + 12, y: 50, width: 156, height: 46, rx: 10, fill: "#f1ecff" }, g);
          api.t("작년 이물 신고는", { x: x0 + 22, y: 69, "font-size": 12.5, fill: "#3f2a9e" }, g);
          api.t("몇 건이었어?", { x: x0 + 22, y: 86, "font-size": 12.5, fill: "#3f2a9e" }, g);
          // AI 동그라미
          api.n("circle", { cx: x0 + 90, cy: 136, r: 20, fill: api.accent }, g);
          api.t("AI", { x: x0 + 90, y: 141, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#fff" }, g);
          const doc = api.n("g", {}, g);
          if (good) {
            api.n("rect", { x: -16, y: -20, width: 32, height: 40, rx: 4, fill: "#fff", stroke: "#1f8a5b", "stroke-width": 1.5 }, doc);
            [-10, -3, 4, 11].forEach(y => api.n("line", { x1: -10, x2: 10, y1: y, y2: y, stroke: "#9fd6bd", "stroke-width": 2 }, doc));
            api.t("보고서", { x: 0, y: 34, "text-anchor": "middle", "font-size": 10.5, fill: "#1f8a5b" }, doc);
          }
          // 답 말풍선
          const ans = api.n("g", {}, g);
          api.n("rect", { x: x0 + 12, y: 172, width: 156, height: 54, rx: 10, fill: "#f6f4ee", stroke: "#e4e1d8" }, ans);
          api.t(good ? "1,187건이에요." : "약 1,240건이에요.", { x: x0 + 22, y: 194, "font-size": 13.5, "font-weight": 700, fill: "#23272f" }, ans);
          api.t(good ? "(보고서 3쪽 표 2)" : "(어디서 나온 숫자인지 없음)", { x: x0 + 22, y: 213, "font-size": 11, fill: "#6b7280" }, ans);
          // 도장
          const stamp = api.n("g", {}, g);
          api.n("rect", { x: -52, y: -16, width: 104, height: 32, rx: 6, fill: "none", stroke: good ? "#1f8a5b" : "#c2410c", "stroke-width": 2.5 }, stamp);
          api.t(good ? "근거 있음 ✓" : "확인 불가 ✗", { x: 0, y: 6, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: good ? "#1f8a5b" : "#c2410c" }, stamp);
          return { doc, ans, stamp, x0 };
        };
        const L = panel(12, "자료 없이 물어보면", false), R = panel(208, "자료를 같이 주면", true);
        api.loop(t => {
          t = t % 10;
          const out = 1 - seg(t, 9.2, 9.9);
          // 오른쪽: 보고서가 AI로 들어감
          const d = seg(t, 0.6, 1.8);
          R.doc.setAttribute("transform", `translate(${R.x0 + 150 - 60 * d},${120 + 16 * d}) scale(${1 - 0.5 * d})`);
          R.doc.setAttribute("opacity", (1 - seg(t, 1.8, 2.2)) * out);
          [L, R].forEach((P, i) => {
            const a = seg(t, 2.2 + i * 0.5, 3.0 + i * 0.5);
            P.ans.setAttribute("opacity", a * out);
            P.ans.setAttribute("transform", `translate(0,${(1 - a) * 10})`);
            const st = seg(t, 4.2 + i * 0.8, 4.6 + i * 0.8);
            P.stamp.setAttribute("opacity", st * out);
            P.stamp.setAttribute("transform", `translate(${P.x0 + 90},256) rotate(-8) scale(${1.6 - 0.6 * st})`);
          });
        }, 6);
      },
    },
  ],

  recap: {
    title: "1권에서 배운 것",
    points: [
      "<b>LLM</b>은 AI 안의 머신러닝 안의 딥러닝 안에 있는, 글을 엄청나게 읽은 모델이에요.",
      "AI는 글을 <b>토큰</b>이라는 조각으로 잘라 번호로 바꿔 읽어요. 요금과 분량도 토큰으로 세요.",
      "LLM은 <b>다음 조각을 확률로 골라</b> 한 조각씩 이어 붙여요.",
      "<b>학습</b>은 빈칸 맞히기를 수조 번 하며 다이얼을 맞추는 일이고, 끝나면 고정돼요.",
      "그럴듯한 말과 사실은 달라서 <b>환각</b>이 생겨요. 근거 자료와 출처로 줄여요.",
    ],
    nextLabel: "2권 예고 · AI와 대화 잘하기",
    next: "AI가 한 번에 볼 수 있는 양은 정해져 있고, AI는 사실 대화를 기억하지 못해요. 그럼 어떻게 긴 자료를 주고, 어떻게 부탁해야 잘 알아들을까요? FT-IR 스펙트럼 검색과 꼭 닮은 'AI의 자료 찾기'도 2권에서 만나요.",
  },

  recapScene(api) {
    const s = api.svg();
    const items = ["AI 지도", "토큰", "다음 조각", "학습", "환각"];
    const cards = items.map((w, i) => {
      const g = api.n("g", {}, s);
      api.n("rect", { x: 0, y: 0, width: 200, height: 36, rx: 10, fill: "#fff", stroke: "#e4e1d8" }, g);
      api.t(`${i + 1}`, { x: 18, y: 23, "font-size": 13, "font-weight": 800, fill: api.accent }, g);
      api.t(w, { x: 38, y: 23, "font-size": 14, "font-weight": 600, fill: "#23272f" }, g);
      const ck = api.t("✓", { x: 178, y: 24, "font-size": 16, "font-weight": 800, fill: "#1f8a5b" }, g);
      return { g, ck };
    });
    const next = api.n("g", {}, s);
    api.n("rect", { x: 0, y: 0, width: 92, height: 120, rx: 8, fill: "#0f9b8e" }, next);
    api.n("rect", { x: 6, y: 0, width: 4, height: 120, fill: "rgba(255,255,255,.35)" }, next);
    api.t("2권", { x: 50, y: 52, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#fff" }, next);
    api.t("대화 잘하기", { x: 50, y: 76, "text-anchor": "middle", "font-size": 11.5, fill: "#fff" }, next);
    api.loop(t => {
      t = t % 9;
      cards.forEach(({ g, ck }, i) => {
        const a = seg(t, 0.2 + i * 0.5, 0.7 + i * 0.5);
        g.setAttribute("transform", `translate(${30 + (1 - a) * -20},${40 + i * 46})`);
        g.setAttribute("opacity", a);
        ck.setAttribute("opacity", seg(t, 3 + i * 0.3, 3.3 + i * 0.3));
      });
      const b = seg(t, 5, 6);
      next.setAttribute("transform", `translate(${280 + (1 - b) * 60},${90}) rotate(${(1 - b) * 12})`);
      next.setAttribute("opacity", b);
    }, 8);
  },
});
