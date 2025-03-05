import {MessagesPage} from "../../src/page/message-page";
import {DocumentsPage} from "../../src/page/document-page";
import {getPage} from "../../src/core/utils/page-utils";
import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import {faker} from "@faker-js/faker";
import {generateFile} from "../../src/core/utils/work-with-file";

const { Given, When, Then } = createBdd();

const subjectRandom = 'AT_C2256_' + faker.string.alphanumeric(10).toUpperCase();
let fileName: string;
let filePath: string;

async function generateFileAndUseIt(): Promise<void> {
    const { fileName: generatedFileName, filePath: generatedFilePath } = await generateFile();
    fileName = generatedFileName;
    filePath = generatedFilePath;
}


Given('I am logging into the site using an existing account', async () => {

})

When('I navigate to the Messages page', async () => {
    await MessagesPage.goToMessagesPage()
})

When(/^I create new message with prexif (AT_C2256_), fill file with prefix (file_AT_C2256_)$/, async () => {
    await MessagesPage.createAndFillMessage(process.env.MAIL_TEXT!, subjectRandom, filePath)
})

When('I send to myself', async()=>{
    await MessagesPage.sendMessageToSelf()
})


When('I navigate to Email list', async () => {
    await MessagesPage.goToEmailList()
})

When('I refresh Email list', async () => {
    await MessagesPage.refreshMessages()
})

Then('I should see the sent email in my inbox', async () => {
    await MessagesPage.findAndOpenMessage(subjectRandom)
})

When('I open new email and save the file from the message to the "My Documents" folder', async () => {
    await MessagesPage.saveFileInDocumentsFolder()
})

When('I navigate to the My Documents page', async () => {
    await DocumentsPage.goToDocumentsPage()
})

When('I refresh Document lists', async () => {
    await DocumentsPage.refreshDocumentList()
})

When('I move the file to the Trash folder.', async () => {
    await DocumentsPage.moveFileToTrash(fileName)
})

When('I go to Trash folder', async () => {
    await DocumentsPage.goToTrash()
})

Then(/^I should see the file with prefix (file_AT_C2256_) in folder$/, async () => {
    await expect(getPage().locator(`[title="${fileName}"]`)).toBeVisible();
})



