export default {
      title: "AI와 책임: 저작권, 개인정보, 최종 판단",
      tag: "장비가 측정해도 성적서의 최종 책임은 연구원에게 있어요",
      lead: "AI가 만든 결과물이라도 책임을 AI에게 돌릴 수는 없어요. 도구는 쓰되, 확인과 서명은 내가 해요.",
      body: `
<h3>결과물의 책임은 사람의 몫</h3>
<p>AI는 법적인 인격이나 자격증을 가진 주체가 아니에요.<br>AI가 쓴 보고서에 오류가 있어 고객사에 잘못 나갔다면, "AI가 그랬어요"는 변명이 되지 않아요. <b>검토하고 승인해 내보낸 쪽</b>이 책임져요.</p>

<h3>연구실에서 지켜야 할 세 가지 관문</h3>
<ol class="steps">
  <li><b>개인정보와 기밀 점검</b><small>고객사명, 공장 주소, 미공개 시료 번호가 밖으로 나가지 않게 마스킹해요. (4권 1장)</small></li>
  <li><b>출처와 저작권 확인</b><small>AI가 만든 글 속에 다른 사람의 논문이나 규격 문장이 그대로 베껴져 있지 않은지 확인해요.</small></li>
  <li><b>연구원의 최종 서명 날인</b><small>수치와 단위, 결론 문장을 직접 꼼꼼히 검증한 뒤 내 이름을 걸고 서명해요.</small></li>
</ol>

<h3>AI 사용 표기</h3>
<p>회사 규정이나 학회 지침에 따라 <b>"이 보고서의 초안은 AI의 도움을 받아 작성되었습니다"</b>라는 사실을 투명하게 밝히는 규칙이 늘어나고 있어요. 사내 지침을 꼭 확인하세요.</p>`,
      lab: "<b>공인 시험 성적서 서명 날인</b>과 같아요. 자동 분석기가 스펙트럼과 수치를 아무리 정밀하게 뽑아주어도, 성적서 하단에 인쇄되는 책임은 결재란에 도장을 쾅 찍은 주 연구원의 서명에서 나오잖아요.",
      quiz: {
        q: "AI가 작성해 준 분석 보고서 요약에 잘못된 수치가 있어 고객사로부터 클레임이 제기되었다면, 책임은 어디에 있을까요?",
        options: ["결과물을 검토하고 승인해서 내보낸 연구원과 회사","AI 프로그램을 개발한 해외 기업","사무실 인터넷 통신사"], answer: 0,
        explain: "AI는 보조 도구라서 책임을 질 수 없어요. 결과물을 검토하고 내보낸 연구원과, 그 성적서를 낸 회사가 책임을 져요.",
      },
      scene(api) {
        const s = api.svg();
        // 3단계 보안 관문 파이프라인
        const gates = [
          { name: "1. 기밀 마스킹", ok: "확인 ✓", x: 30 },
          { name: "2. 출처·저작권", ok: "확인 ✓", x: 145 },
          { name: "3. 연구원 날인", ok: "서명 완료 ✓", x: 260 },
        ];

        const gateEls = gates.map(g => {
          const grp = api.n("g", { transform: `translate(${g.x}, 65)` }, s);
          api.n("rect", { x: 0, y: 0, width: 105, height: 130, rx: 8, fill: "#fff", stroke: "#cfcabe" }, grp);
          api.t(g.name, { x: 52, y: 28, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#23272f" }, grp);

          const seal = api.n("rect", { x: 12, y: 55, width: 81, height: 32, rx: 6, fill: "#e3f5ec", stroke: "#1f8a5b" }, grp);
          const sealText = api.t(g.ok, { x: 52, y: 76, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: "#1f8a5b" }, grp);
          return { grp, seal, sealText };
        });

        // 최종 고객사 발송 허가
        const passMsg = api.t("공식 성적서 안전 발송 승인 ✉", { x: 200, y: 235, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#1f8a5b", opacity: 0 }, s);

        api.loop(t => {
          t = t % 7.5;
          const out = 1 - seg(t, 7.0, 7.4);
          gateEls.forEach((gt, idx) => {
            const p = seg(t, 0.5 + idx * 0.9, 1.2 + idx * 0.9);
            gt.grp.setAttribute("opacity", p * out);
          });

          const pPass = seg(t, 3.8, 4.8);
          passMsg.setAttribute("opacity", pPass * out);
        }, 5);
      },
    };
