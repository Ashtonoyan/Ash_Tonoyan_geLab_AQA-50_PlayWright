import {test, expect, chromium} from "playwright/test";


test.describe("MailFence Tests", () => {

    test("Send and process email", async ({page}) => {

        await page.goto(process.env.MAILFENCE_LOGIN_URL!)

        await page.fill('#UserID', process.env.USER_EMAIL!);
        await page.fill('#Password', process.env.USER_PASSWORD!);
        await page.click('input.btn[type="submit"]');
        await expect(page).toHaveURL("https://mailfence.com/flatx/index.jsp?v=2.8.028");



        // Sending a letter
        await page.click('.icon24-Message.toolImg')

        await page.waitForURL(/https:\/\/mailfence\.com\/flatx\/index\.jsp\?v=2\.8\.028#tool=mail&folderoid=\d+/);


        const test = await page.waitForSelector('#mailNewBtn', {state: 'visible'});
        await page.click('#mailNewBtn');

        await page.fill('input.GCSDBRWBPL[type="text"]', process.env.MAIL_TEXT!)


        const iframeElement = await page.waitForSelector('iframe.editable');


        const frame = await iframeElement.contentFrame();

        if (frame !== null) {
            await frame.fill('#gwt-uid-32', 'ashtonoyan@mailfence.com');
        } else {
            console.error('Unable to access iframe content');
            throw new Error('Error: iframe is not available or not loaded');

        }

        await page.click('a.GCSDBRWBISB.GCSDBRWBJSB')


        const element = page.locator('span.GCSDBRWBGR').first();
        await element.scrollIntoViewIfNeeded();


        const fileInput = page.locator('input[type="file"]');

        const testFilePath = process.env.TEST_FILE_PATH!;

        const fs = require('fs');
        if (!fs.existsSync(testFilePath)) {
            throw new Error(`File not found: ${testFilePath}`);
        }

        await fileInput.setInputFiles(testFilePath);

        await page.waitForSelector('.GCSDBRWBJRB')

        await page.click('#mailSend')

        await page.click('#dialBtn_YES')


        // Saving a document
        await page.reload();

        await page.click('#treeInbox')
        await page.reload();
        await page.locator('div.tbBtnText').nth(1).click();

        const timeout = Date.now() + 10000;

        while (Date.now() < timeout) {
            await page.waitForSelector('div.listSubject')
            const firstUnreadEmail = page.locator('tr.listUnread').first();

            if (await firstUnreadEmail.count() > 0) {
                await firstUnreadEmail.waitFor();
                await firstUnreadEmail.click();
                break;
            }

            await page.reload();

        }

        if (Date.now() >= timeout) {
            console.error('Failed to find unread email within the 10-second timeout.');
        }

        await page.click('a.GCSDBRWBJRB', {button: 'right'});

        await page.locator('span.GCSDBRWBGR').nth(2).click();

        await page.locator('div.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX').nth(2).click();


        await page.locator('#dialBtn_OK').waitFor({state: 'attached'});
        await expect(page.locator('#dialBtn_OK')).toHaveCSS('cursor', 'pointer');


        await page.click('#dialBtn_OK')

        //Processing a document
        await page.click('.icon24-Documents.toolImg')

        await page.waitForSelector(".GCSDBRWBPJB");

        await page.click('.GCSDBRWBPJB')


        await page.locator('div.tbBtnText').nth(3).click();


        await page.locator('div.GCSDBRWBED.GCSDBRWBO').evaluate(el => {
            el.style.display = 'block';
        });


        await page.evaluate(() => {
            const overlay = document.querySelector('.GCSDBRWBED.GCSDBRWBO');
            if (overlay) {
                overlay.remove();
            }
        });

        page.locator('#doc_tree_trash').nth(1).click();


        await page.locator('#dialBtn_OK')
            .waitFor({state: 'attached'});


        await expect(page.locator('#dialBtn_OK')).toHaveCSS('cursor', 'pointer');


        await page.locator('#dialBtn_OK').click();

        await page.locator('#dialBtn_YES').click();


        const trashButton = page.locator('#doc_tree_trash').first();
        await trashButton.click();

        await expect(page).toHaveURL(/https:\/\/mailfence\.com\/flatx\/index\.jsp\?v=2\.8\.028#tool=docs&folderoid=\d+/);


    })


})