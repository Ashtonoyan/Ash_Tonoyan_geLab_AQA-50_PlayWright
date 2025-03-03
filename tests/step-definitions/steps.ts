import {Given, When, Then} from '@cucumber/cucumber';
import {MessagesPage} from "../../src/page/message-page";
import {DocumentsPage} from "../../src/page/document-page";


Given('I am logging into the site using an existing account', async () => {

})

When('I navigate to the Messages page', async () => {
    await MessagesPage.goToMessage()
})

When('I create new message with random subject, fill and send to myself', async ({subjectRandom, filePath}) => {
    MessagesPage.createFillSendMail(process.env.MAIL_TEXT!, subjectRandom, filePath)
})


When('I navigate to Email list', async () => {
    await MessagesPage.goToEmailList()
})

When('I refresh Email list', async () => {
    await MessagesPage.refreshMessages()
})

Then('I should see the sent email in my inbox', async (subjectRandom) => {
    await MessagesPage.findMessages(subjectRandom)
})

When('I open new email and save the file from the message to the "My Documents" folder', async () => {
    await MessagesPage.saveDocument()
})

When('I navigate to the My Documents page', async () => {
    await DocumentsPage.moveToDocument()
})

When('I refresh Document lists', async () => {
    await DocumentsPage.refreshDocumentLists()
})

When('I move the file to the Trash folder.', async () => {
    await DocumentsPage.documentProcess()
})

When('I go to Trash folder', async () => {
    await DocumentsPage.goToTrash()
})

Then('I should see the file in folder', async ({fileName}) => {
    await DocumentsPage.waitDocument(fileName)
})



