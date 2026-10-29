#!/usr/bin/env node
/**
 * build.js
 *
 * 1장 1파일 소스(src/volumes/)와 공통 모듈(src/core/)을 조립하여
 * 1) GitHub Pages 배포용 루트 index.html
 * 2) 연구원을_위한_AI_그림책.html
 * 단일 오프라인 배포본을 한 번에 생성합니다.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

console.log('1. 하네스(Harness) 사전 검증 실행...');
try {
  execSync('node scripts/harness.js', { stdio: 'inherit', cwd: ROOT });
} catch (e) {
  console.error('\n❌ 하네스 검증 실패로 빌드를 중단합니다.');
  process.exit(1);
}

console.log('2. 1장 1파일 소스 조립 및 HTML 번들링 시작...');

const TITLE = "신서아를 위한 AI 에이전트 업무 사용 입문편";
const VISIBLE = [1, 2, 3, 4, 5, 6, 7]; // 표시할 권 목록

// 공통 자원 로드
const css = fs.readFileSync(path.join(ROOT, 'src', 'core', 'styles.css'), 'utf8');
const apiJs = fs.readFileSync(path.join(ROOT, 'src', 'core', 'api.js'), 'utf8');
const componentsJs = fs.readFileSync(path.join(ROOT, 'src', 'core', 'components.js'), 'utf8')
  .replace(/export\s+const\s+/g, 'const ');
const bookCoverJs = fs.readFileSync(path.join(ROOT, 'src', 'core', 'book_cover.js'), 'utf8')
  .replace(/export\s+const\s+/g, 'const ');
const runtimeJs = fs.readFileSync(path.join(ROOT, 'src', 'core', 'runtime.js'), 'utf8');
const threeJs = fs.readFileSync(path.join(ROOT, 'build', 'vendor', 'three.min.js'), 'utf8')
  .replace(/<\/script/g, '<\\/script');

// 각 권 소스 조립
const volumesCode = VISIBLE.map(v => {
  const vDir = path.join(ROOT, 'src', 'volumes', `vol${v}`);
  const meta = fs.readFileSync(path.join(vDir, 'meta.js'), 'utf8');
  const recap = fs.readFileSync(path.join(vDir, 'recap.js'), 'utf8');

  let chapIdx = 1;
  const chaps = [];
  while (fs.existsSync(path.join(vDir, `chap${chapIdx}.js`))) {
    const raw = fs.readFileSync(path.join(vDir, `chap${chapIdx}.js`), 'utf8')
      .replace(/^export default\s*/, '')
      .replace(/;\s*$/, '');
    chaps.push(raw);
    chapIdx++;
  }

  return `${meta}\n  chapters: [\n${chaps.join(',\n')}\n  ],\n  ${recap}`;
}).join('\n\n');

// 단일 독립 실행 HTML 생성
const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${TITLE}</title>
<style>
${css}
</style>
</head>
<body>
<div class="shell">
  <nav class="shelf" id="shelf" aria-label="권 고르기"></nav>
  <div class="book" id="book" aria-live="polite"></div>
  <div class="nav">
    <button class="btn" id="home">⌂ 표지</button>
    <button class="btn" id="prev">← 이전</button>
    <div class="dots" id="dots"></div>
    <span class="count" id="count"></span>
    <button class="btn" id="next">다음 →</button>
  </div>
</div>
<script>${threeJs}</script>
<script>
${apiJs}
${componentsJs}
${bookCoverJs}
${volumesCode}
${runtimeJs}
</script>
</body>
</html>`;

// 1) GitHub Pages 배포용 index.html
const indexOut = path.join(ROOT, 'index.html');
fs.writeFileSync(indexOut, html, 'utf8');

// 2) 연구원을_위한_AI_그림책.html (로컬/오프라인 공유용)
const legacyOut = path.join(ROOT, '연구원을_위한_AI_그림책.html');
fs.writeFileSync(legacyOut, html, 'utf8');

console.log(`\n✨ 빌드 완료!`);
console.log(`- [GitHub Pages]: ${indexOut} (${Math.round(html.length / 1024)}KB)`);
console.log(`- [로컬 단일파일]: ${legacyOut} (${Math.round(html.length / 1024)}KB)`);
