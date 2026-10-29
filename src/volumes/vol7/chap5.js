export default {
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
    };
