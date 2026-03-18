const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.resolve(__dirname, '../docs/08-ui-resources/downloads');
const MAIN_URL = 'https://www.kioskui.or.kr/index.do?menu_id=00000950';

(async () => {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  const context = await browser.newContext({
    acceptDownloads: true,
    downloadsPath: DOWNLOAD_DIR,
  });

  const mainPage = await context.newPage();
  await mainPage.goto(MAIN_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await mainPage.waitForTimeout(2000);

  const btnCount = await mainPage.locator('a.button.ico.download').count();
  console.log(`총 ${btnCount}개 다운로드 버튼 발견\n`);

  const results = [];

  for (let i = 0; i < btnCount; i++) {
    const btn = mainPage.locator('a.button.ico.download').nth(i);
    const btnText = (await btn.textContent()).trim();
    console.log(`[${i + 1}/${btnCount}] ${btnText}`);

    try {
      // 1. 다운로드 이벤트 리스너 설정 (팝업이 opener를 통해 다운로드 유발)
      const downloadPromise = mainPage.waitForEvent('download', { timeout: 30000 });

      // 2. 팝업 열기 대기 + 버튼 클릭
      const [popup] = await Promise.all([
        context.waitForEvent('page', { timeout: 10000 }),
        btn.click(),
      ]);

      console.log(`  팝업 열림`);

      // 3. 팝업 DOM 로드 대기
      await popup.waitForLoadState('domcontentloaded');
      await popup.waitForTimeout(1500);

      // 4. com.confirm 오버라이드 (폼 제출 전에)
      await popup.evaluate(() => {
        if (window.com) {
          window.com.confirm = () => Promise.resolve(true);
          window.com.alert = () => Promise.resolve();
        }
        window.confirm = () => true;
        window.alert = () => {};
      });

      // 5. dialog 처리
      popup.on('dialog', async (d) => {
        console.log(`  Dialog: ${d.message()}`);
        await d.accept();
      });

      // 6. 폼 작성
      await popup.check('input[name="ansList[0].ansChcList[0].qitem_id"]'); // 제조업체
      await popup.fill('input[name="ansList[1].ans_cn"]', '테스트회사');   // 회사명
      await popup.check('input[name="ansList[2].ansChcList[1].qitem_id"]'); // 50명 이하
      await popup.check('input[name="ansList[3].ansChcList[0].qitem_id"]'); // 이미지 사용
      await popup.check('input[name="ansList[3].ansChcList[2].qitem_id"]'); // UI 가이드 확인
      console.log(`  폼 작성 완료`);

      // 7. 제출 버튼 클릭 (팝업이 자동으로 닫힐 수 있으므로 에러 무시)
      await popup.click('a.button.blue.lg').catch(() => {});
      console.log(`  제출 클릭`);

      // 8. 다운로드 대기 (팝업이 opener.location.replace로 메인 페이지 이동 → 다운로드 발생)
      const download = await downloadPromise;
      const filename = download.suggestedFilename() || `component_${String(i + 1).padStart(2, '0')}.zip`;
      const savePath = path.join(DOWNLOAD_DIR, filename);
      await download.saveAs(savePath);
      const size = Math.round(fs.statSync(savePath).size / 1024);
      console.log(`  ✓ 저장: ${filename} (${size}KB)`);
      results.push({ idx: i + 1, text: btnText, file: filename, status: 'success' });

      // 9. 팝업 정리 및 메인 페이지 복구
      if (!popup.isClosed()) await popup.close().catch(() => {});
      // 메인 페이지가 이동했을 수 있으므로 원래 URL로 복구
      if (mainPage.url() !== MAIN_URL) {
        await mainPage.goto(MAIN_URL, { waitUntil: 'networkidle', timeout: 30000 });
        await mainPage.waitForTimeout(1000);
      }

    } catch (err) {
      console.error(`  ✗ 오류: ${err.message}`);
      results.push({ idx: i + 1, text: btnText, status: 'error', error: err.message });

      // 오류 시 메인 페이지 복구
      try {
        if (mainPage.url() !== MAIN_URL) {
          await mainPage.goto(MAIN_URL, { waitUntil: 'networkidle', timeout: 20000 });
          await mainPage.waitForTimeout(1000);
        }
      } catch (_) {}
    }
  }

  // 결과 요약
  console.log('\n========== 결과 요약 ==========');
  const success = results.filter(r => r.status === 'success');
  const errors = results.filter(r => r.status === 'error');
  console.log(`✓ 성공: ${success.length}/${results.length}`);
  if (errors.length > 0) {
    console.log('✗ 실패:');
    errors.forEach(r => console.log(`  [${r.idx}] ${r.text} → ${r.error}`));
  }

  const savedFiles = fs.readdirSync(DOWNLOAD_DIR);
  console.log(`\n저장 경로: ${DOWNLOAD_DIR}`);
  console.log(`저장 파일 (${savedFiles.length}개):`);
  savedFiles.forEach(f => {
    const size = Math.round(fs.statSync(path.join(DOWNLOAD_DIR, f)).size / 1024);
    console.log(`  - ${f} (${size}KB)`);
  });

  await browser.close();
})();
