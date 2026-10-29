export default {
      title: "엑셀 실험 데이터 정리를 말로 시키기",
      tag: "단위 통일과 중복 찾기를 말로 시키고 사본으로 작업해요",
      lead: "복잡한 엑셀 수식을 몰라도 괜찮아요. 일상적인 말로 지시하면 AI가 단위를 맞추고 결측치를 찾아 깔끔하게 정돈해 줘요.",
      body: `
<h3>엑셀 작업에서 AI가 잘하는 것들</h3>
<div class="cards">
  <div class="card"><b>단위 통일하기</b><q>무게 열에 mg과 g이 뒤섞여 있어. 모두 g 단위로 환산해서 새 열을 만들어 줘.</q></div>
  <div class="card"><b>날짜 서식 맞추기</b><q>2026.05.01, 5/1 등으로 제각각인 날짜 표기를 모두 YYYY-MM-DD 형태로 통일해 줘.</q></div>
  <div class="card"><b>중복과 빈칸 찾기</b><q>시료 접수 번호가 중복된 행을 찾고, 측정 수치가 빈칸인 행 목록을 뽑아 줘.</q></div>
</div>

<h3>실제로 해 보면</h3>
<div class="say"><small>정리 전 (무게 열)</small>0.5 g · 320mg · 1.2g · (빈칸) · 45 mg</div>
<div class="say"><small>"g으로 맞추고, 빈칸은 표시해 줘" 하고 난 뒤</small>0.5 · 0.32 · 1.2 · <b>빈칸 확인 필요</b> · 0.045</div>

<h3>수식을 몰라도 물어보면 돼요</h3>
<p>"이런 계산을 하려면 엑셀에서 어떤 수식을 써야 해?"라고 물으면<br>함수 이름과 사용법을 친절히 설명해 줘요.</p>

<h3>가장 중요한 규칙: 원본은 건드리지 않기!</h3>
<p>AI가 데이터를 정리하는 과정에서 뜻하지 않게 행이 누락될 수 있어요.<br><b>원본 파일은 안전하게 보존하고, 반드시 복사본 파일로 작업</b>하세요.</p>`,
      lab: "<b>실험 노트 정서(사본 작성)</b>와 같아요. 펜으로 기록한 연구원의 원본 실험 노트는 절대 지우거나 버리지 않고 영구 보존하죠. 보고서용으로 표를 다듬거나 정리할 때는 사본 시트를 새로 만들어 작업하는 것과 같은 원칙이에요.",
      quiz: {
        q: "AI에게 엑셀 파일 정리를 맡기기 전에 연구원이 반드시 취해야 할 가장 안전한 행동은?",
        options: ["AI가 알아서 하니 원본 파일에 바로 작업시키기","원본 데이터 파일을 안전하게 백업해 두고 복사본으로 작업하기","정리 결과를 확인하지 않고 바로 보고서에 쓰기"], answer: 1,
        explain: "AI가 데이터를 재정렬하는 과정에서 수치 누락이 생길 수 있으므로, 원본 백업과 복사본 작업은 필수 철칙이에요.",
      },
      scene(api) {
        const s = api.svg();
        // 왼쪽 엉망인 원본 표
        const rawG = api.n("g", { transform: "translate(20, 40)" }, s);
        api.n("rect", { x: 0, y: 0, width: 155, height: 180, rx: 8, fill: "#fff", stroke: "#e4e1d8" }, rawG);
        api.t("정리 전 데이터 (단위 혼재)", { x: 77, y: 22, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#c2410c" }, rawG);

        const rawRows = [
          { d: "2026.5.1", v: "120 mg", c: "#fdeee6" },
          { d: "05/02", v: "0.15 g", c: "#fdeee6" },
          { d: "2026-05-03", v: "85 mg", c: "#fdeee6" },
          { d: "5월 4일", v: "빈칸 누락", c: "#fdeee6" },
        ];
        rawRows.forEach((r, idx) => {
          const ry = 36 + idx * 32;
          api.n("rect", { x: 10, y: ry, width: 135, height: 26, rx: 4, fill: r.c }, rawG);
          api.t(r.d, { x: 16, y: ry + 17, "font-size": 10, fill: "#23272f" }, rawG);
          api.t(r.v, { x: 138, y: ry + 17, "text-anchor": "end", "font-size": 10, "font-weight": 600, fill: "#c2410c" }, rawG);
        });

        // 오른쪽 정리된 표
        const cleanG = api.n("g", { transform: "translate(225, 40)" }, s);
        api.n("rect", { x: 0, y: 0, width: 155, height: 180, rx: 8, fill: "#fff", stroke: "#3a9a4a" }, cleanG);
        api.t("정리 후 데이터 (g 단위 통일)", { x: 77, y: 22, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#24692f" }, cleanG);

        const cleanRows = [
          { d: "2026-05-01", v: "0.120 g" },
          { d: "2026-05-02", v: "0.150 g" },
          { d: "2026-05-03", v: "0.085 g" },
          { d: "2026-05-04", v: "재측정 필요" },
        ];
        cleanRows.forEach((r, idx) => {
          const ry = 36 + idx * 32;
          api.n("rect", { x: 10, y: ry, width: 135, height: 26, rx: 4, fill: "#e8f5e9" }, cleanG);
          api.t(r.d, { x: 16, y: ry + 17, "font-size": 10, fill: "#23272f" }, cleanG);
          api.t(r.v, { x: 138, y: ry + 17, "text-anchor": "end", "font-size": 10, "font-weight": 700, fill: "#24692f" }, cleanG);
        });

        // 백업 보존 라벨
        api.t("★ 원본 백업 보존 필수!", { x: 200, y: 250, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: "#0a6b62" }, s);

        api.loop(t => {
          t = t % 7;
          const out = 1 - seg(t, 6.4, 6.9);
          const p = seg(t, 1.2, 2.8);
          cleanG.setAttribute("opacity", p * out);
          cleanG.setAttribute("transform", `translate(225, ${40 + (1 - p) * 15})`);
        }, 4);
      },
    };
