export default {
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
    };
