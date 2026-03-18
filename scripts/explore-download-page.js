const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.kioskui.or.kr/index.do?menu_id=00000950', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/kiosk-page.png', fullPage: true });

  // 다운로드 버튼 탐색
  const buttons = await page.evaluate(() => {
    const allElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"]');
    const result = [];
    allElements.forEach((el, idx) => {
      const text = el.textContent?.trim() || el.value?.trim() || '';
      const href = el.href || '';
      const onclick = el.getAttribute('onclick') || '';
      if (
        text.includes('다운로드') ||
        text.includes('Download') ||
        text.includes('download') ||
        href.includes('download') ||
        onclick.includes('download') ||
        onclick.includes('Download')
      ) {
        result.push({
          idx,
          tag: el.tagName,
          text,
          href,
          onclick,
          className: el.className,
          id: el.id,
        });
      }
    });
    return result;
  });

  console.log('=== 다운로드 관련 요소 ===');
  console.log(JSON.stringify(buttons, null, 2));

  // 팝업 관련 요소 탐색
  const popupTriggers = await page.evaluate(() => {
    const allElements = document.querySelectorAll('[onclick*="popup"], [onclick*="Popup"], [onclick*="modal"], [onclick*="Modal"], [onclick*="layer"], [onclick*="Layer"]');
    const result = [];
    allElements.forEach((el, idx) => {
      result.push({
        idx,
        tag: el.tagName,
        text: el.textContent?.trim() || '',
        onclick: el.getAttribute('onclick'),
        className: el.className,
      });
    });
    return result;
  });

  console.log('\n=== 팝업 트리거 요소 ===');
  console.log(JSON.stringify(popupTriggers, null, 2));

  // 페이지 전체 구조 파악
  const pageInfo = await page.evaluate(() => {
    return {
      title: document.title,
      url: location.href,
      forms: Array.from(document.forms).map(f => ({
        id: f.id,
        action: f.action,
        fields: Array.from(f.elements).map(e => ({
          name: e.name,
          type: e.type,
          id: e.id,
          placeholder: e.placeholder,
        }))
      }))
    };
  });

  console.log('\n=== 페이지 정보 ===');
  console.log(JSON.stringify(pageInfo, null, 2));

  await browser.close();
})();
