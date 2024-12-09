const { chromium } = require('playwright');  // Playwright 모듈 가져오기
const fs = require('fs');

(async () => {
  // Playwright 브라우저 인스턴스 생성
  const browser = await chromium.launch({
    headless: false,  // 브라우저 GUI가 표시됨
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'  // Chrome 설치 경로
  });

  // 새로운 페이지 열기
  const page = await browser.newPage();
  await page.goto('http://localhost:18080/login');  // 로그인 페이지로 이동

  // 사용자 이름 입력
  await page.fill('input[name="j_username"]', 'admin');  // 아이디 필드에 'admin' 입력

  // 비밀번호 입력
  await page.fill('input[name="j_password"]', 'qaqa');  // 비밀번호 필드에 'qaqa' 입력

  // 로그인 버튼 클릭 (CSS 선택자 사용)
  await page.click('#main-panel > div > form > button');

  // 로그인 후 대기 (5초)
  await page.waitForTimeout(5000);

  // 쿠키 저장
  const cookies = await page.context().cookies();
  fs.writeFileSync('./cookies.json', JSON.stringify(cookies, null, 2));

  // 스크린샷 저장
  await page.screenshot({ path: 'example_playwright.png', fullPage: true });
  await browser.close();
})();
