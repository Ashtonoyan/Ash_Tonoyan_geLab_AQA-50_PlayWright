import {faker} from '@faker-js/faker';
import {MessagesPage} from "../src/page/message-page";
import {DocumentsPage} from "../src/page/document-page";
import {test} from '../src/core/fixtures/page-fixture';
import {getPage} from '../src/core/utils/page-utils';


test.describe("MailFence Tests", () => {

    test("Send and process email", async ({subjectRandom, filePath, fileName}) => {

        const page = getPage();

        await page.goto(process.env.MAILFENCE_MAIN_URL!)
        console.log(subjectRandom);
        console.log(filePath);
        console.log(fileName);

        await MessagesPage.goToMessage()
        await MessagesPage.createFillSendMail(process.env.MAIL_TEXT!, subjectRandom, filePath)
        await page.reload();
        await MessagesPage.goToEmailList()
        await MessagesPage.refreshMessages()

        await MessagesPage.findMessages(subjectRandom)
        await MessagesPage.saveDocument()
        await DocumentsPage.moveToDocument()
        await DocumentsPage.refreshDocumentLists()
        await DocumentsPage.documentProcess()
        await DocumentsPage.goToTrash()
        await DocumentsPage.waitDocument(fileName)


    })

    test("COPIED VERSION:Send and process email ", async ({subjectRandom, filePath, fileName}) => {

        const page = getPage();
        await page.goto(process.env.MAILFENCE_MAIN_URL!)

        await MessagesPage.goToMessage()
        await MessagesPage.createFillSendMail(process.env.MAIL_TEXT!, subjectRandom, filePath)
        await MessagesPage.goToEmailList()
        await MessagesPage.refreshMessages()

        await MessagesPage.findMessages(subjectRandom)
        await MessagesPage.saveDocument()
        await DocumentsPage.moveToDocument()
        await DocumentsPage.refreshDocumentLists()
        await DocumentsPage.documentProcess()
        await DocumentsPage.goToTrash()
        await DocumentsPage.waitDocument(fileName)

    })


})
