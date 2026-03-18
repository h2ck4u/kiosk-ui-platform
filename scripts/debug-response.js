const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  const popupUrl = 'https://www.kioskui.or.kr/index.do?menu_id=00001310&content_layout_view=Popup&rspns_path_dcd=KIOSK_0035_02&rsrc_id=KIOSK_UI_RSRC_00000000000000000001&cpnt_id=KIOSK_UI_RSRC_CPNT_00000000000000000099';
  await page.goto(popupUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // 폼 작성
  await page.check('input[name="ansList[0].ansChcList[0].qitem_id"]');
  await page.fill('input[name="ansList[1].ans_cn"]', '테스트회사');
  await page.check('input[name="ansList[2].ansChcList[1].qitem_id"]');
  await page.check('input[name="ansList[3].ansChcList[0].qitem_id"]');
  await page.check('input[name="ansList[3].ansChcList[2].qitem_id"]');

  // com.confirm 오버라이드
  await page.evaluate(() => {
    if (window.com) window.com.confirm = () => Promise.resolve(true);
    window.confirm = () => true;
  });

  page.on('dialog', async (d) => { await d.accept(); });

  // 모든 네트워크 요청 모니터링
  const requests = [];
  page.on('request', req => requests.push({ method: req.method(), url: req.url() }));
  page.on('response', async res => {
    const ct = res.headers()['content-type'] || '';
    console.log(`응답: [${res.status()}] ${res.url()}`);
    console.log(`  Content-Type: ${ct}`);
    if (ct.includes('text/html') && res.url().includes('insert')) {
      const body = await res.text().catch(() => '');
      console.log(`  Body (500자): ${body.substring(0, 500)}`);
    }
  });

  // 제출
  await page.click('a.button.blue.lg').catch(() => {});
  await page.waitForTimeout(8000);

  console.log('\n현재 URL:', page.url());
  const content = await page.content();
  console.log('현재 페이지 HTML (1000자):', content.substring(0, 1000));

  await browser.close();
})();
