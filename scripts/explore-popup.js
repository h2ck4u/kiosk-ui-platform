const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 팝업 URL 직접 방문해서 폼 구조 파악
  const popupUrl = 'https://www.kioskui.or.kr/index.do?menu_id=00001310&content_layout_view=Popup&rspns_path_dcd=KIOSK_0035_02&rsrc_id=KIOSK_UI_RSRC_00000000000000000001&cpnt_id=KIOSK_UI_RSRC_CPNT_00000000000000000099';

  await page.goto(popupUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/kiosk-popup.png', fullPage: true });

  const formInfo = await page.evaluate(() => {
    const result = {
      title: document.title,
      inputs: [],
      selects: [],
      textareas: [],
      buttons: [],
      html: document.body.innerHTML.substring(0, 3000),
    };

    document.querySelectorAll('input').forEach(el => {
      result.inputs.push({
        name: el.name,
        id: el.id,
        type: el.type,
        placeholder: el.placeholder,
        value: el.value,
        required: el.required,
        label: document.querySelector(`label[for="${el.id}"]`)?.textContent?.trim(),
      });
    });

    document.querySelectorAll('select').forEach(el => {
      result.selects.push({
        name: el.name,
        id: el.id,
        options: Array.from(el.options).map(o => ({ value: o.value, text: o.text })),
        label: document.querySelector(`label[for="${el.id}"]`)?.textContent?.trim(),
      });
    });

    document.querySelectorAll('textarea').forEach(el => {
      result.textareas.push({
        name: el.name,
        id: el.id,
        placeholder: el.placeholder,
        label: document.querySelector(`label[for="${el.id}"]`)?.textContent?.trim(),
      });
    });

    document.querySelectorAll('button, input[type="submit"], input[type="button"], a.button, a.btn').forEach(el => {
      result.buttons.push({
        tag: el.tagName,
        text: el.textContent?.trim() || el.value,
        type: el.type,
        onclick: el.getAttribute('onclick'),
        className: el.className,
      });
    });

    return result;
  });

  console.log('=== 팝업 폼 구조 ===');
  console.log(JSON.stringify(formInfo, null, 2));

  await browser.close();
})();
