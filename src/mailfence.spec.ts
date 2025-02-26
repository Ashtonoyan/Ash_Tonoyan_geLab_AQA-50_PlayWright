import {faker} from '@faker-js/faker';
import {LoginPage} from "./page/login-page";
import {MailCreate} from "./page/message-page";
import {DocumentPage} from "./page/document-page";
import { test } from './fixtures/page-fixture';
import { getPage } from './utils/page-utils';


const subjectRandom = "AT_C2256_" + faker.string.alphanumeric(10).toUpperCase();


test.describe("MailFence Tests", () => {


    test("Send and process email", async () => {
        const page = getPage();
        await page.goto(process.env.MAILFENCE_LOGIN_URL!)
        const emailPage = new LoginPage(page)
        await emailPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)

        const sendMail = new MailCreate(page, subjectRandom)
        await sendMail.goToMessage()
        await sendMail.createFillSendMail(process.env.MAIL_TEXT!, subjectRandom, process.env.TEST_FILE_PATH!)
        await page.reload();
        await sendMail.goToEmailList()
        await sendMail.refreshMessages()
        await sendMail.findMessagesAndDocumentSave()
        const processDocument = new DocumentPage(page)
        await processDocument.moveToDocument()
        await processDocument.refreshDocumentLists()
        await processDocument.documentProcess()

    })


})
