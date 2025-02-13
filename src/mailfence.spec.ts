import {test, expect, chromium} from "playwright/test";
import {faker} from '@faker-js/faker';

const subjectRandom = faker.number.int({min: 1000000000, max: 9999999999}).toString();


test.describe("MailFence Tests", () => {

    test("Send and process email", async ({page}) => {

        await page.goto(process.env.MAILFENCE_LOGIN_URL!)
        // Authorization process
        await page.fill('#UserID', process.env.USER_EMAIL!);
        await page.fill('#Password', process.env.USER_PASSWORD!);
        await page.click('input.btn[type="submit"]');


        // Sending a letter
        //Click on the "Message" icon and wait for the desired page
        await page.click('.icon24-Message.toolImg')


        //Wait and click on the "Create" button
        const test = await page.waitForSelector('#mailNewBtn', {state: 'visible'});
        await page.click('#mailNewBtn');

        //Here we write the recipient of the letter
        await page.fill('input.GCSDBRWBPL[type="text"]', process.env.MAIL_TEXT!)
        await page.fill('#mailSubject', subjectRandom)

        //To insert text into the letter field, we need to process the frame

        const frameForText = page.frameLocator('iframe.editable');


        if (frameForText !== null) {
            await frameForText.locator('#gwt-uid-32').fill('ashtonoyan@mailfence.com');
        } else {
            throw new Error('Error: iframe is not available or not loaded');

        }

        //This part of the code is responsible for loading the file.
        //Also I created a file check. If the file does not exist, an error will appear.

        await page.click('a.GCSDBRWBISB.GCSDBRWBJSB')


        const uploadFromPC = page.locator('body > div.GCSDBRWBOQ.menu > div > ul > li:nth-child(1) > a')
        await uploadFromPC.scrollIntoViewIfNeeded()


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


        // Saving a document
        await page.reload();

        await page.click('#treeInbox')

        // Refresh button
        //await page.locator('div.tbBtnText').nth(1).click();
        await page.locator('div.icon.icon16-Refresh').click();

        //This part of code is responsible for finding a new letter.
        //First, we wait for the messages to load, then we wait for the first unread one.
        //If there is no new letter, we refresh the page and check again.
        //This cycle can last up to 10 seconds. If there no letter, we get an error message.


        const timeout = Date.now() + 10000;


        while (Date.now() < timeout) {
            try {
                await page.waitForSelector(`div.listSubject[title="${subjectRandom}"]`, {timeout: 3000});
            } catch (e) {
                console.log('Element not found, reloading page...');
                await page.reload();
                continue;
            }

            const email = await page.locator(`div.listSubject[title="${subjectRandom}"]`);


            await email.click();
            break;
        }

        if (Date.now() >= timeout) {
            console.error('Failed to find unread email within the 10-second timeout.');
        }


        //This is the process of saving a letter.
        //Right-click on the file, select the folder and save the file.
        await page.click('a.GCSDBRWBJRB', {button: 'right'});

        //await page.locator('span.GCSDBRWBGR').nth(2).click();
        await page.locator('//body/div[5]/div/ul/li[3]/a/span').click();


        //await page.locator('div.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX').nth(2).click();
        await page.locator('xpath=/html/body/div[5]/div[2]/div/div[2]/div/div/div/div/div[1]/div[2]').click();


        //We wait until the button becomes clickable and then save
        await page.locator('#dialBtn_OK').waitFor({state: 'attached'});
        await expect(page.locator('#dialBtn_OK')).toHaveCSS('cursor', 'pointer');


        await page.click('#dialBtn_OK')

        //Processing a document
        //Select the file and click on "Move"
        await page.click('.icon24-Documents.toolImg')

        await page.waitForSelector(".GCSDBRWBPJB");
        await page.locator('.GCSDBRWBPJB').first().click();


        await page.locator('.icon.icon16-Move').click();


        await page.locator('//body/div[5]/div[2]/div/div[2]/div/div/div/div/div[2]/div/div/div[2]').scrollIntoViewIfNeeded();
        const clickOnTrash = page.locator('//body/div[5]/div[2]/div/div[2]/div/div/div/div/div[2]/div/div/div[2]');
        await clickOnTrash.hover();  // Hover the cursor
        await clickOnTrash.click({force: true});


        //We wait until the button becomes clickable and then save
        await page.locator('#dialBtn_OK')
            .waitFor({state: 'attached'});


        await expect(page.locator('#dialBtn_OK')).toHaveCSS('cursor', 'pointer');


        await page.locator('#dialBtn_OK').click();

        await page.locator('#dialBtn_YES').click();

        //Go to the Trash page.
        const trashButton = page.locator('#doc_tree_trash').first();
        await trashButton.click();
        await expect(page.locator("div.GCSDBRWBOBC")).toBeVisible()

    })


})