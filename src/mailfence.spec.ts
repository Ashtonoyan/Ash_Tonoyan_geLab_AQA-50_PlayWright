import {faker} from '@faker-js/faker';
import {LoginPage} from "./page/login-page";
import {MessagePage} from "./page/message-page";
import {DocumentPage} from "./page/document-page";
import {test} from './fixtures/page-fixture';
import {getPage} from './utils/page-utils';
import path from 'path';


const subjectRandom = "AT_C2256_" + faker.string.alphanumeric(10).toUpperCase();
const filePath = path.resolve(__dirname, process.env.TEST_FILE_PATH as string);


test.describe("MailFence Tests", () => {

    test("Send and process email", async () => {
        const page = getPage();
        await page.goto(process.env.MAILFENCE_LOGIN_URL!)
        const emailPage = new LoginPage(page)
        await emailPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)

        const sendMail = new MessagePage(page, subjectRandom)
        await sendMail.goToMessage()
        await sendMail.createFillSendMail(process.env.MAIL_TEXT!, subjectRandom, filePath)
        await page.reload();
        await sendMail.goToEmailList()
        await sendMail.refreshMessages()
        await sendMail.findMessages()
        await sendMail.saveDocument()
        const processDocument = new DocumentPage(page)
        await processDocument.moveToDocument()
        await processDocument.refreshDocumentLists()
        await processDocument.documentProcess()

    })


})
