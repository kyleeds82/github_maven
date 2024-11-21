const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium'
    //executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' // Chrome 설치 경로
  });

  const page = await browser.newPage();
  await page.goto('http://jenkins:8080/login');

  // 사용자 이름 입력
  await page.click('input[name="j_username"]');
  await page.type('input[name="j_username"]', 'admin'); // 아이디 필드에 'admin' 입력

  // 비밀번호 입력
  await page.click('input[name="j_password"]');
  await page.type('input[name="j_password"]', 'qaqa'); // 비밀번호 필드에 'qaqa' 입력

  // 로그인 버튼 클릭 (XPath 사용)
  await page.click('#main-panel > div > form > button');

  await new Promise((page) => setTimeout(page, 5000));

  // 쿠키 저장
  const cookies = await page.cookies();
  fs.writeFileSync('./cookies.json', JSON.stringify(cookies, null, 2));

  // 전체 페이지 스크린샷 저장
  await page.screenshot({ path: 'example.png', fullPage: true });
  await browser.close();
})();
