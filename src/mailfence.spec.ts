import {test, expect, chromium} from "playwright/test";


test.describe("MailFence Tests", () => {

    test("Send and process email", async ({page}) => {

        await page.goto(process.env.MAILFENCE_LOGIN_URL!)
        // Authorization process
        await page.fill('#UserID', process.env.USER_EMAIL!);
        await page.fill('#Password', process.env.USER_PASSWORD!);
        await page.click('input.btn[type="submit"]');
        await expect(page).toHaveURL("https://mailfence.com/flatx/index.jsp?v=2.8.028");



        // Sending a letter
        //Click on the "Message" icon and wait for the desired page
        await page.click('.icon24-Message.toolImg')

        await page.waitForURL(/https:\/\/mailfence\.com\/flatx\/index\.jsp\?v=2\.8\.028#tool=mail&folderoid=\d+/);

        //Wait and click on the "Create" button
        const test = await page.waitForSelector('#mailNewBtn', {state: 'visible'});
        await page.click('#mailNewBtn');

        //Here we write the recipient of the letter
        await page.fill('input.GCSDBRWBPL[type="text"]', process.env.MAIL_TEXT!)

        //To insert text into the letter field, we need to process the frame
        const iframeElement = await page.waitForSelector('iframe.editable');


        const frame = await iframeElement.contentFrame();

        if (frame !== null) {
            await frame.fill('#gwt-uid-32', 'ashtonoyan@mailfence.com');
        } else {
            console.error('Unable to access iframe content');
            throw new Error('Error: iframe is not available or not loaded');

        }

        //This part of the code is responsible for loading the file.
        //Also I created a file check. If the file does not exist, an error will appear.

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

        //We wait for the file to download and send the letter.
        await page.waitForSelector('.GCSDBRWBJRB')

        await page.click('#mailSend')

        await page.click('#dialBtn_YES')


        // Saving a document
        await page.reload();

        await page.click('#treeInbox')

        // Refresh button
        await page.locator('div.tbBtnText').nth(1).click();

        //This part of code is responsible for finding a new letter.
        //First, we wait for the messages to load, then we wait for the first unread one.
        //If there is no new letter, we refresh the page and check again.
        //This cycle can last up to 10 seconds. If there no letter, we get an error message.

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

        //This is the process of saving a letter.
        //Right-click on the file, select the folder and save the file.
        await page.click('a.GCSDBRWBJRB', {button: 'right'});

        await page.locator('span.GCSDBRWBGR').nth(2).click();

        await page.locator('div.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX').nth(2).click();

        //We wait until the button becomes clickable and then save
        await page.locator('#dialBtn_OK').waitFor({state: 'attached'});
        await expect(page.locator('#dialBtn_OK')).toHaveCSS('cursor', 'pointer');


        await page.click('#dialBtn_OK')

        //Processing a document
        //Select the file and click on "Move"
        await page.click('.icon24-Documents.toolImg')

        await page.waitForSelector(".GCSDBRWBPJB");

        await page.click('.GCSDBRWBPJB')


        await page.locator('div.tbBtnText').nth(3).click();

        //We have a block of code that is covering the Trash folder, so we make it visible and then delete it.
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

        //We wait until the button becomes clickable and then save
        await page.locator('#dialBtn_OK')
            .waitFor({state: 'attached'});


        await expect(page.locator('#dialBtn_OK')).toHaveCSS('cursor', 'pointer');


        await page.locator('#dialBtn_OK').click();

        await page.locator('#dialBtn_YES').click();

        //Go to the Trash page.
        const trashButton = page.locator('#doc_tree_trash').first();
        await trashButton.click();

        await expect(page).toHaveURL(/https:\/\/mailfence\.com\/flatx\/index\.jsp\?v=2\.8\.028#tool=docs&folderoid=\d+/);


    })


})