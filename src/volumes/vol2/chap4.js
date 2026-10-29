export default {
      title: "임베딩: 뜻을 좌표로",
      tag: "드래그해서 돌려 보세요 · 뜻이 비슷한 문장은 가까이 모여요",
      lead: "임베딩은 문장을 여러 개의 숫자로 된 좌표로 바꾸는 기술이에요. 글자가 달라도 뜻이 비슷하면 가까운 자리에 놓여요.",
      body: `
<h3>문장을 공간 위의 점으로 바꾸기</h3>
<p>AI는 글의 뜻을 숫자의 위치(좌표)로 이해해요.<br>이 과정을 <b>임베딩(embedding)</b>이라고 불러요.</p>
<p><b>"머리카락 발견"</b>과 <b>"모발 이물 혼입"</b>은 글자가 전혀 다르지만, 뜻이 거의 같아서 3차원 공간에서 <b>서로 아주 가까운 자리</b>에 점이 찍혀요.</p>

<h3>뜻으로 찾는 검색의 비밀</h3>
<p>단어가 글자 그대로 일치하지 않아도, 의미가 통하는 문서를 찾아낼 수 있는 이유가 바로 이 좌표 덕분이에요.</p>
<p>실제 AI는 3차원이 아니라 수백에서 수천 차원의 공간을 쓰지만, <b>"가까운 점을 찾는다"</b>는 원리는 완전히 같아요.</p>

<h3>이 기술이 왜 중요할까요?</h3>
<p>바로 다음 장에서 배울 <b>AI의 자료 찾기(RAG)</b>의 핵심 기술이 되기 때문이에요.</p>`,
      lab: "<b>FT-IR 적외선 분광 스펙트럼 라이브러리 검색</b>과 꼭 닮았어요. 미지의 이물을 측정해 고유한 스펙트럼 파형(지문)을 얻은 뒤, 수만 개의 표준 물질 데이터베이스에서 파형이 가장 닮은 물질을 찾잖아요. 임베딩도 문장을 숫자 지문으로 바꿔서 가장 닮은 문서를 찾아내요.",
      quiz: {
        q: "검색창에 '모발 이물'을 입력했는데 글자가 다른 '머리카락 혼입' 문서가 가장 먼저 검색되었어요. 어떤 원리일까요?",
        options: ["컴퓨터가 오타를 냈기 때문에","두 단어의 글자 수가 우연히 같아서","AI가 문장의 뜻을 좌표로 바꿔 거리를 재는 임베딩 기술 덕분에"], answer: 2,
        explain: "임베딩은 글자가 달라도 의미가 비슷하면 공간에서 가까운 좌표로 만들어 주기 때문에 '뜻'으로 검색할 수 있어요.",
      },
      scene(api) {
        const k = makeThree(api, { distance: 13, tilt: 0.28 });
        if (!k) return;
        const { THREE, world, label } = k;

        // 세 가지 군집 데이터: 모발/섬유(청록), 비닐/플라스틱(주황), 금속(회색)
        const clusters = [
          {
            name: "모발 · 섬유 군집",
            color: 0x0f9b8e,
            center: [-2.6, 1.2, -0.5],
            items: ["머리카락 발견", "모발 혼입 의심", "미세 섬유 조각", "동물 털 추정"],
          },
          {
            name: "비닐 · 플라스틱 군집",
            color: 0xe07a1f,
            center: [2.5, 1.5, 0.4],
            items: ["포장용 비닐", "투명 PE 필름", "플라스틱 파편"],
          },
          {
            name: "금속 군집",
            color: 0x7a828e,
            center: [0.2, -2.2, -0.6],
            items: ["스테인리스 파편", "알루미늄 칩"],
          },
        ];

        // 군집별 구체 노드 및 라벨 배치
        const clusterNodes = [];
        clusters.forEach(c => {
          const mat = new THREE.MeshStandardMaterial({ color: c.color, roughness: 0.4 });
          c.items.forEach((item, idx) => {
            const m = new THREE.Mesh(new THREE.SphereGeometry(0.25, 20, 16), mat);
            const ox = (idx % 2 === 0 ? 0.7 : -0.7) * (idx > 1 ? 0.8 : 1);
            const oy = (idx > 1 ? 0.7 : -0.6);
            const oz = (idx % 3 === 0 ? 0.6 : -0.6);
            m.position.set(c.center[0] + ox, c.center[1] + oy, c.center[2] + oz);
            world.add(m);
            clusterNodes.push({ mesh: m, cluster: c });
          });
          const clb = label(c.name, { size: 0.38, color: "#fff", bg: "rgba(35,39,47,0.75)" });
          clb.position.set(c.center[0], c.center[1] + 1.4, c.center[2]);
          world.add(clb);
        });

        // 새로운 검색 질문 점 (노란색/금색)
        const qMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.32, 24, 20),
          new THREE.MeshStandardMaterial({ color: 0xd9a21b, roughness: 0.2, emissive: 0x664400 })
        );
        world.add(qMesh);
        const qLabel = label("검색어: 검은 털 시료", { size: 0.42, color: "#9a6a00", bg: "rgba(255,246,217,0.95)" });
        world.add(qLabel);

        // 검색어와 모발 군집을 잇는 점선 라인
        const lineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        const matchLine = new THREE.Line(
          lineGeom,
          new THREE.LineDashedMaterial({ color: 0xd9a21b, dashSize: 0.2, gapSize: 0.15, linewidth: 2 })
        );
        matchLine.computeLineDistances();
        world.add(matchLine);

        let last = performance.now();
        api.loop(t => {
          const now = performance.now(), dt = (now - last) / 1000;
          last = now;
          const cycle = t % 7;
          // 검색어 점이 바깥에서 모발 군집 근처로 진입
          const flyP = seg(cycle, 0.5, 2.5);
          const startPos = new THREE.Vector3(0, 3.8, 3.0);
          const targetPos = new THREE.Vector3(-1.8, 0.8, -0.2);
          qMesh.position.lerpVectors(startPos, targetPos, flyP);
          qLabel.position.set(qMesh.position.x, qMesh.position.y - 0.7, qMesh.position.z); // 공 아래에 - 위에 두면 모발 군집 라벨과 겹침

          // 모발 군집 점 하나와 매칭 선 연결
          const hairNode = clusterNodes[0].mesh.position;
          lineGeom.setFromPoints([qMesh.position, hairNode]);
          matchLine.computeLineDistances();
          matchLine.visible = flyP > 0.8;

          k.draw(dt);
        }, 2.5);
      },
    };
