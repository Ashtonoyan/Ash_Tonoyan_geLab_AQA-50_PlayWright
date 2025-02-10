import {test, expect, chromium, Page, Browser} from "playwright/test";
import * as dotenv from "dotenv";

let browser: Browser;
let page: Page;
dotenv.config();

const baseUrl =  process.env.MAILFENCE_URL;
const loginUrl = process.env.MAILFENCE_LOGIN_URL;
const username = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;
const mailText = process.env.MAIL_TEXT!

if (!username || !password) {
    throw new Error("❌ Environment variables not loaded! Check your .env file.");
}

if (!baseUrl || !loginUrl) {
    throw new Error("❌ Environment variables not loaded! Check your .env file.");
}


test.beforeAll(async () => {

    browser = await chromium.launch({headless: false});
    console.log("Start");


});

test.afterAll(async () => {

    await browser.close();
});


test.describe("MailFence Tests", () => {


    test.beforeEach("Authorization", async () => {

        page = await browser.newPage();


        await page.goto(baseUrl)
        await page.click('#signin')


        await page.waitForURL(loginUrl)

        await page.fill('#UserID', username);
        await page.fill('#Password', password);
        await page.click('input.btn[type="submit"]');
        await expect(page).toHaveURL("https://mailfence.com/flatx/index.jsp?v=2.8.028");
    })

    test("Send email", async () => {

        await page.goto('https://mailfence.com/flatx/index.jsp?v=2.8.028')
        await page.click('.icon24-Message.toolImg')
        await page.waitForTimeout(1000);
        await page.waitForURL('https://mailfence.com/flatx/index.jsp?v=2.8.028#tool=mail&folderoid=639842178')

        const test = await page.waitForSelector('#mailNewBtn', {state: 'visible'});
        if (test) {
            console.log("Is visible");
            await page.click('#mailNewBtn');
        } else {
            console.log("Is hidden");
        }

        await page.fill('input.GCSDBRWBPL[type="text"]', mailText)
        await page.waitForTimeout(5000);

        const iframeElement = await page.waitForSelector('iframe.editable');


        const frame = await iframeElement.contentFrame();

        if (frame !== null) {
            await frame.fill('#gwt-uid-32', 'ashtonoyan@mailfence.com');
        } else {
            console.error('Не удалось получить доступ к содержимому iframe');
        }

        await page.click('a.GCSDBRWBISB.GCSDBRWBJSB')

        await page.waitForTimeout(2000);

        const element = await page.locator('span.GCSDBRWBGR >> text="С вашего компьютера"');
        await element.scrollIntoViewIfNeeded();


        const fileInput = await page.locator('input[type="file"]');

        await fileInput.setInputFiles('C:/Users/atv00/Downloads/Mailfence e2e UI test case - TestRail (1) (2).pdf');
        await page.waitForTimeout(1000);

        await page.click('#mailSend')

        await page.click('#dialBtn_YES')


    })

    test("Processting Letters", async () => {
        await page.goto('https://mailfence.com/flatx/index.jsp?v=2.8.028')
        await page.waitForTimeout(10000);
        await page.click('#treeInbox')
        await page.waitForTimeout(3000);
        const messages = await page.locator('div.listSubject:has-text("[Без темы]")');
        await messages.first().click();
        await page.waitForTimeout(3000);
        await page.click('a.GCSDBRWBJRB', {button: 'right'});
        await page.waitForTimeout(1000);
        await page.click('span.GCSDBRWBGR >> text="Сохранить в документах"');
        await page.waitForTimeout(1000);
        await page.click('div.treeItemLabel >> text="Мои документы"');
        await page.waitForTimeout(1000);
        await page.click('#dialBtn_OK')
        await page.waitForTimeout(1000);
    })

    test("Processting Documents", async () => {
        await page.goto('https://mailfence.com/flatx/index.jsp?v=2.8.028')

        await page.click('.icon24-Documents.toolImg')
        await page.waitForTimeout(1000)

        await page.click('.GCSDBRWBPJB')
        await page.waitForTimeout(1000)

        await page.waitForTimeout(1000)

        await page.click('div.tbBtnText >> text="Переместить"');


        await page.locator('div.GCSDBRWBED.GCSDBRWBO').evaluate(el => {
            el.style.display = 'block';
        });

        await page.waitForTimeout(5000)
        await page.evaluate(() => {
            const overlay = document.querySelector('.GCSDBRWBED.GCSDBRWBO');
            if (overlay) {
                overlay.remove();  // Remove the overlay from the DOM
            }
        });

        await page.locator('div.treeItemLabel:has-text("Trash")').nth(1).click();


        await page.waitForTimeout(1000)
        await page.locator('div.btnCtn div:has-text("Переместить")').click();
        await page.waitForTimeout(1000)
        await page.locator('div.btnCtn div:has-text("Да")').click();

        await page.locator('div.treeItemLabel:has-text("Trash")').first().click();


    })

    test.afterEach(async () => {
        await page.close();
    })


})