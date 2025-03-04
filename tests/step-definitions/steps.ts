import {Given, When, Then} from '@cucumber/cucumber';
import {MessagesPage} from "../../src/page/message-page";
import {DocumentsPage} from "../../src/page/document-page";
import {expect} from "playwright/test";
import {getPage} from "../../src/core/utils/page-utils";


Given('I am logging into the site using an existing account', async () => {

})

When('I navigate to the Messages page', async () => {
    await MessagesPage.goToMessagesPage()
})

When('I create new message with random subject, fill and send to myself', async ({subjectRandom, filePath}) => {
    await MessagesPage.createAndFillMessage(process.env.MAIL_TEXT!, subjectRandom, filePath)
})

When('', async()=>{
    await MessagesPage.sendMessageToSelf()
})


When('I navigate to Email list', async () => {
    await MessagesPage.goToEmailList()
})

When('I refresh Email list', async () => {
    await MessagesPage.refreshMessages()
})

Then('I should see the sent email in my inbox', async (subjectRandom) => {
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
    await DocumentsPage.moveFileToTrash()
})

When('I go to Trash folder', async () => {
    await DocumentsPage.goToTrash()
})

Then('I should see the file in folder', async ({fileName}) => {
    await expect(getPage().locator(`[title="${fileName}"]`)).toBeVisible();
})



