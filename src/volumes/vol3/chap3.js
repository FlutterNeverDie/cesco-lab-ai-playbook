export default {
      title: "MCP: AI를 위한 USB-C 포트",
      tag: "드래그해서 돌려 보세요 · 규격이 같으면 어떤 도구도 쉽게 꽂혀요",
      lead: "MCP(모델 컨텍스트 프로토콜)는 AI와 다양한 도구, 데이터베이스를 하나로 연결해 주는 개방형 공통 규격이에요.",
      body: `
<h3>충전기가 제각각이던 시절을 기억하나요?</h3>
<p>스마트폰마다 충전기 단자가 달라서 케이블을 몇 개씩 들고 다녔던 적이 있었죠.<br>예전의 AI도 똑같았어요. 프로그램마다 연결 방식이 제각각이었거든요.</p>

<h3>공통 표준 규격, MCP의 등장</h3>
<p><b>MCP(Model Context Protocol)</b>는 컴퓨터의 <b>USB-C 포트</b>와 같아요.</p>
<ol class="steps">
  <li>도구 쪽(MCP 서버)은 <b>"나는 이런 능력이 있어요"</b>라는 목록을 알려 줘요.</li>
  <li>AI 앱은 같은 규격의 플러그로 도구에 바로 접속해요.</li>
  <li><b>MCP를 지원하는 AI 앱</b>이라면, 같은 도구를 다시 만들지 않고 바로 꽂아 쓸 수 있어요.</li>
</ol>

<h3>연구원이 직접 만들 필요는 없어요</h3>
<p>기술을 개발할 필요는 전혀 없어요.<br><b>"지금 내 AI에 어떤 도구가 연결되어 있는가"</b>만 확인하면 충분해요.</p>`,
      lab: "<b>표준 규격 조인트 초자 기구</b>와 같아요. 24/40 같은 표준 테이퍼 조인트 규격이 있으면 어느 제조사의 둥근 바닥 플라스크에도 냉각기나 분액 깔때기를 쏙 끼울 수 있잖아요. MCP도 AI에 도구를 끼우는 공통 조인트예요.",
      quiz: {
        q: "MCP(Model Context Protocol)가 도입되면서 가장 편리해진 점은 무엇일까요?",
        options: ["하나의 공통 표준 규격으로 여러 도구와 데이터를 손쉽게 AI에 연결할 수 있다","AI의 응답 글씨 색상이 화려해진다","마우스 클릭 속도가 두 배 빨라진다"], answer: 0,
        explain: "MCP는 USB-C 단자처럼 AI와 도구 사이를 잇는 개방형 표준 규격이라, 호환성과 연결성을 획기적으로 높여 줘요.",
      },
      scene(api) {
        const k = makeThree(api, { distance: 13, tilt: 0.32 });
        if (!k) return;
        const { THREE, world, label } = k;

        // 중앙 AI 허브 박스 (주황색 메인 본체)
        const hubMat = new THREE.MeshStandardMaterial({ color: 0xe07a1f, roughness: 0.3, metalness: 0.2 });
        const hubGeom = new THREE.BoxGeometry(2.2, 2.2, 2.2);
        const hub = new THREE.Mesh(hubGeom, hubMat);
        world.add(hub);

        const hubLabel = label("AI 코어 허브", { size: 0.45, color: "#fff", bg: "rgba(154,77,11,0.9)" });
        hubLabel.position.set(0, 1.8, 0);
        world.add(hubLabel);

        // 4개의 MCP 연결 도구 플러그 블록들 (엑셀, 사내DB, 이메일, 계산기)
        const plugsData = [
          { name: "엑셀 시트", color: 0x24692f, dir: [-1, 0, 0] },
          { name: "사내 성적서 DB", color: 0x3462c9, dir: [1, 0, 0] },
          { name: "계산기", color: 0xd9a21b, dir: [0, 0, -1] },
          { name: "이메일 알림", color: 0x9c27b0, dir: [0, 0, 1] },
        ];

        const plugs = plugsData.map(pd => {
          const group = new THREE.Group();
          // 도구 본체
          const bMat = new THREE.MeshStandardMaterial({ color: pd.color, roughness: 0.4 });
          const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.8), bMat);
          group.add(body);

          // USB-C 모양 금색 플러그
          const pMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });
          const pin = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.4), pMat);
          pin.position.set(-pd.dir[0] * 0.7, -pd.dir[1] * 0.7, -pd.dir[2] * 0.7);
          group.add(pin);

          const lb = label(pd.name, { size: 0.35, color: "#23272f", bg: "rgba(255,255,255,0.9)" });
          lb.position.set(0, 0.7, 0);
          group.add(lb);

          world.add(group);
          return { group, dir: pd.dir };
        });

        let last = performance.now();
        api.loop(t => {
          const now = performance.now(), dt = (now - last) / 1000;
          last = now;

          const cycle = t % 6;
          // 플러그가 멀어졌다가 허브에 착 꽂히는 모션
          const plugP = seg(cycle, 0.8, 2.6);
          plugs.forEach(p => {
            const dist = 3.6 - 1.9 * plugP;
            p.group.position.set(p.dir[0] * dist, p.dir[1] * dist, p.dir[2] * dist);
          });

          hub.rotation.y += dt * 0.2;
          k.draw(dt);
        }, 2.5);
      },
    };
