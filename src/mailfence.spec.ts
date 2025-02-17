import {test, expect, chromium} from "playwright/test";
import {faker} from '@faker-js/faker';
import {Button} from "../ui-wrappers/button";
import {InputField} from "../ui-wrappers/inputField";
import {FrameClass} from "../ui-wrappers/frame";
import {UploadFile} from "../ui-wrappers/uploadile";
import {EmailFind} from "../ui-wrappers/emailFind";


const subjectRandom = "AT_C2256_" + faker.string.alphanumeric(10).toUpperCase();


test.describe("MailFence Tests", () => {

    test("Send and process email", async ({page}) => {

        await page.goto(process.env.MAILFENCE_LOGIN_URL!)
        // Authorization process
        const inputEmail = new InputField(page, '#UserID')
        await inputEmail.fillInputField(process.env.USER_EMAIL!)
        const inputPassword = new InputField(page, '#Password')
        await inputPassword.fillInputField(process.env.USER_PASSWORD!)
        await page.click('input.btn[type="submit"]');


        // Sending a letter
        //Click on the "Message" icon and wait for the desired page
        await page.click('.icon24-Message.toolImg')


        //Wait and click on the "Create" button
        //const test = await page.waitForSelector('#mailNewBtn', {state: 'visible'});
        await page.click('#mailNewBtn');

        //Here we write the recipient of the letter
        const mailText = new InputField(page, 'input[tabindex="1"]')
        await mailText.fillInputField(process.env.MAIL_TEXT!)
        const mailSubject = new InputField(page, '#mailSubject')
        await mailSubject.fillInputField(subjectRandom)

        //To insert text into the letter field, we need to process the frame

        const frameElement = new FrameClass(page, 'iframe.editable')
        await frameElement.fillFrame('#gwt-uid-32', 'ashtonoyan@mailfence.com')


        //This part of the code is responsible for loading the file.
        //Also I created a file check. If the file does not exist, an error will appear.

        await page.click('a.GCSDBRWBISB.GCSDBRWBJSB')


        const uploadFromPC = page.locator('body > div.GCSDBRWBOQ.menu > div > ul > li:nth-child(1) > a')
        await uploadFromPC.scrollIntoViewIfNeeded()

        const fileInput = new UploadFile(page, 'input[type="file"]')

        const testFilePath = process.env.TEST_FILE_PATH!;
        fileInput.uploadFile(testFilePath);


        //We wait for the file to download and send the letter.
        await page.waitForSelector('.GCSDBRWBJRB')


        await page.click('#mailSend')


        // Saving a document
        await page.reload();

        await page.click('#treeInbox')

        // Refresh button
        const buttonRefresh = new Button(page, 'div.icon.icon16-Refresh')

        await buttonRefresh.click()

        //This part of code is responsible for finding a new letter.
        const emailFind = new EmailFind(page)
        await emailFind.find(subjectRandom)


        //This is the process of saving a letter.
        //Right-click on the file, select the folder and save the file.
        await page.click('a.GCSDBRWBJRB', {button: 'right'});

        //There was no point in changing it, it was the third item from the list with the same names
        await page.locator('//body/div[5]/div/ul/li[3]/a/span').click();

        const myDocumentFolder = page.locator('div[hidefocus="true"] div.treeItemLabel:not(#doc_tree_trash)');
        await myDocumentFolder.click();

        //We wait until the button becomes clickable and then save
        const buttonOk = new Button(page, '#dialBtn_OK')
        await buttonOk.toAttached()
        await buttonOk.toHaveCSS()
        await buttonOk.click()

        //Processing a document
        //Select the file and click on "Move"
        await page.click('.icon24-Documents.toolImg')

        await page.waitForSelector(".GCSDBRWBPJB");
        await page.locator('.GCSDBRWBPJB').first().click();

        await page.locator('.icon.icon16-Move').click();

        await page.locator('div[hidefocus="true"] div#doc_tree_trash:not(#treeItemLabel)').scrollIntoViewIfNeeded();
        const clickOnTrash = page.locator('div[hidefocus="true"] div#doc_tree_trash:not(#treeItemLabel)');
        await clickOnTrash.click();
        await clickOnTrash.hover();  // Hover the cursor
        await clickOnTrash.click({force: true});

        //We wait until the button becomes clickable and then save
        await buttonOk.toAttached()
        await buttonOk.toHaveCSS()
        await buttonOk.click()

        await page.locator('#dialBtn_YES').click();

        //Go to the Trash page.
        const trashButton = page.locator('#doc_tree_trash').first();
        await trashButton.click();
        await expect(page.locator("div.GCSDBRWBOBC")).toBeVisible()

    })


})
