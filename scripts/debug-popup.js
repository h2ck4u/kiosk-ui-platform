const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.resolve(__dirname, '../docs/08-ui-resources/downloads');

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

  // 다운로드 이벤트 감지
  context.on('download', async (download) => {
    console.log(`\n🔔 다운로드 이벤트 발생!`);
    console.log(`   URL: ${download.url()}`);
    console.log(`   파일명: ${download.suggestedFilename()}`);
    const savePath = path.join(DOWNLOAD_DIR, download.suggestedFilename());
    await download.saveAs(savePath);
    console.log(`   저장: ${savePath}`);
  });

  const page = await context.newPage();

  // 팝업 URL로 바로 이동 (첫 번째 버튼)
  const popupUrl = 'https://www.kioskui.or.kr/index.do?menu_id=00001310&content_layout_view=Popup&rspns_path_dcd=KIOSK_0035_02&rsrc_id=KIOSK_UI_RSRC_00000000000000000001&cpnt_id=KIOSK_UI_RSRC_CPNT_00000000000000000099';

  console.log('팝업 페이지 로드 중...');
  await page.goto(popupUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
  console.log('DOM 로드 완료');

  // 추가 네트워크 활동 대기 (최대 5초)
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/tmp/debug_step1_loaded.png' });
  console.log('스크린샷: /tmp/debug_step1_loaded.png');

  // Q1: 제조업체
  await page.check('input[name="ansList[0].ansChcList[0].qitem_id"]');
  console.log('Q1 선택 완료 (제조업체)');

  // Q2: 회사명
  await page.fill('input[name="ansList[1].ans_cn"]', '테스트회사');
  console.log('Q2 입력 완료 (테스트회사)');

  // Q3: 50명 이하
  await page.check('input[name="ansList[2].ansChcList[1].qitem_id"]');
  console.log('Q3 선택 완료 (50명 이하)');

  // Q4: 체크박스
  await page.check('input[name="ansList[3].ansChcList[0].qitem_id"]');
  await page.check('input[name="ansList[3].ansChcList[2].qitem_id"]');
  console.log('Q4 선택 완료 (이미지 사용, UI 가이드 확인)');

  await page.screenshot({ path: '/tmp/debug_step2_filled.png' });
  console.log('스크린샷: /tmp/debug_step2_filled.png');

  // com.confirm 오버라이드
  await page.evaluate(() => {
    if (window.com) {
      console.log('com 객체 발견, confirm 오버라이드');
      window.com.confirm = () => Promise.resolve(true);
      window.com.alert = () => Promise.resolve();
    }
    window.confirm = () => true;
    window.alert = () => {};
  });

  // dialog 처리
  page.on('dialog', async (dialog) => {
    console.log(`Dialog [${dialog.type()}]: ${dialog.message()}`);
    await dialog.accept();
  });

  // 네트워크 요청 모니터링
  page.on('request', req => {
    if (req.url().includes('download') || req.url().includes('insert')) {
      console.log(`📤 요청: ${req.method()} ${req.url()}`);
    }
  });
  page.on('response', res => {
    const ct = res.headers()['content-type'] || '';
    if (res.url().includes('insert') || ct.includes('application') || ct.includes('zip')) {
      console.log(`📥 응답: ${res.status()} ${res.url()}`);
      console.log(`   Content-Type: ${ct}`);
    }
  });

  console.log('\n제출 버튼 클릭...');
  try {
    await page.click('a.button.blue.lg');
    console.log('클릭 완료');
  } catch (e) {
    console.log(`클릭 오류: ${e.message}`);
  }

  // 결과 대기
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '/tmp/debug_step3_after_submit.png' });
  console.log('스크린샷: /tmp/debug_step3_after_submit.png');
  console.log(`현재 URL: ${page.url()}`);

  // 10초 더 대기
  await page.waitForTimeout(10000);

  const savedFiles = fs.readdirSync(DOWNLOAD_DIR);
  console.log(`\n저장된 파일: ${savedFiles.length}개`);
  savedFiles.forEach(f => console.log(`  - ${f}`));

  await browser.close();
})();
