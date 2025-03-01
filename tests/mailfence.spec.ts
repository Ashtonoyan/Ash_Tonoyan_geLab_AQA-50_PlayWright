import {faker} from '@faker-js/faker';
import {LoginPage} from "../src/page/login-page";
import {MessagesPage} from "../src/page/message-page";
import {DocumentsPage} from "../src/page/document-page";
import {test} from '../src/core/fixtures/page-fixture';
import {getPage} from '../src/core/utils/page-utils';
import path from 'path';


const subjectRandom = "AT_C2256_" + faker.string.alphanumeric(10).toUpperCase();
const filePath = path.resolve(__dirname, process.env.TEST_FILE_PATH as string);


test.describe("MailFence Tests", () => {

    test("Send and process email", async () => {
        const page = getPage();
        await page.goto(process.env.MAILFENCE_MAIN_URL!)
        //await LoginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)

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


    })

    test("COPIED VERSION:Send and process email ", async () => {
        const page = getPage();
        await page.goto(process.env.MAILFENCE_MAIN_URL!)
        //await LoginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)

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


    })


})
