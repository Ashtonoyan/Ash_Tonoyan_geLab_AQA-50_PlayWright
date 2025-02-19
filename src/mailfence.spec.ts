import {test, expect, chromium} from "playwright/test";
import {faker} from '@faker-js/faker';
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {InputField} from "../ui-wrappers/input-field-element";
import {Frame} from "../ui-wrappers/frame-element";
import {UploadFile} from "../ui-wrappers/upload-file-element";
import {EmailFind} from "../ui-wrappers/email-find-element";
import {BaseElement} from "../ui-wrappers/base-element";


const subjectRandom = "AT_C2256_" + faker.string.alphanumeric(10).toUpperCase();


test.describe("MailFence Tests", () => {

    test("Send and process email", async ({page}) => {

        await page.goto(process.env.MAILFENCE_LOGIN_URL!)
        // Authorization process
        const inputEmail = new InputField(page, '#UserID')
        await inputEmail.fillInputField(process.env.USER_EMAIL!)
        const inputPassword = new InputField(page, '#Password', 'Password Field')
        await inputPassword.fillInputField(process.env.USER_PASSWORD!)
        await new ButtonElement(page, 'input.btn[type="submit"]').click();


        // Sending a letter
        //Click on the "Message" icon and wait for the desired page
        await new ButtonElement(page, '.icon24-Message.toolImg').click()

        //Wait and click on the "Create" button
        await new ButtonElement(page, '#mailNewBtn').click();

        //Here we write the recipient of the letter
        const mailText = new InputField(page, 'input[tabindex="1"]', 'Mail text field')
        await mailText.fillInputField(process.env.MAIL_TEXT!)
        const mailSubject = new InputField(page, '#mailSubject', 'Subject field')
        await mailSubject.fillInputField(subjectRandom)

        //To insert text into the letter field, we need to process the frame

        const frameElement = new Frame(page, 'iframe.editable');
        await frameElement.fillFrame('body.editable[role="textbox"]', 'ashtonoyan@mailfence.com')

        await new ButtonElement(page, 'a.GCSDBRWBISB.GCSDBRWBJSB').locator.first().click();

        await new ButtonElement(page, 'div.GCSDBRWBOQ.menu > div > ul > li:nth-child(1) > a').scroolViewIfNeeded()

        const fileInput = new UploadFile(page, 'input[type="file"]')

        const testFilePath = process.env.TEST_FILE_PATH!;
        fileInput.uploadFile(testFilePath);


        //We wait for the file to download and send the letter.
        await new ButtonElement(page, '.GCSDBRWBJRB').waitForElement()
        await new ButtonElement(page, '#mailSend').click()
        // Saving a document
        await page.reload();
        await new ButtonElement(page, '#treeInbox').click()
        // Refresh button
        const buttonRefresh = new ButtonElement(page, 'div.icon.icon16-Refresh', "ButtonRefresh")
        await buttonRefresh.click()
        //This part of code is responsible for finding a new letter.
        const emailFind = new EmailFind(page, 'Search for sent letter')
        await emailFind.find(subjectRandom)
        //This is the process of saving a letter.
        //Right-click on the file, select the folder and save the file.
        await new ButtonElement(page, 'a.GCSDBRWBJRB').click({button: 'right'});

        //There was no point in changing it, it was the third item from the list with the same names
        await new ButtonElement(page, '//body/div[5]/div/ul/li[3]/a/span').click();

        const myDocumentFolder = new ButtonElement(page, 'div[hidefocus="true"] div.treeItemLabel:not(#doc_tree_trash)');
        await myDocumentFolder.click();

        //We wait until the button becomes clickable and then save
        const buttonOk = new ButtonElement(page, '#dialBtn_OK', 'buttonOk')
        await buttonOk.toAttached()
        await buttonOk.toHaveCSS()
        await buttonOk.click()
        //Processing a document
        //Select the file and click on "Move"
        await new ButtonElement(page, '.icon24-Documents.toolImg').click()
        await new ButtonElement(page, '.GCSDBRWBPJB').locator.first().click();
        await buttonRefresh.click();

        await new ButtonElement(page, '.icon.icon16-Move').click()
        await new ButtonElement(page, 'div[hidefocus="true"] div#doc_tree_trash:not(#treeItemLabel)').scroolViewIfNeeded()
        const clickOnTrash = page.locator('div[hidefocus="true"] div#doc_tree_trash:not(#treeItemLabel)');
        await clickOnTrash.click();
        await clickOnTrash.hover();
        await clickOnTrash.click({force: true});

        //We wait until the button becomes clickable and then save
        await buttonOk.toAttached()
        await buttonOk.toHaveCSS()
        await buttonOk.click()

        await new ButtonElement(page, '#dialBtn_YES').click();

        //Go to the Trash page.
        await new ButtonElement(page, '#doc_tree_trash').locator.first().click();
        await expect(page.locator("div.GCSDBRWBOBC")).toBeVisible()
    })


})
