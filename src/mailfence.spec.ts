import {faker} from '@faker-js/faker';
import {AuthorizaionPage} from "./page/login-page";
import {MailCreate} from "./page/message-page";
import {DocumentProcessing} from "./page/document-page";
import {test} from './fixtures/page-fixture';


const subjectRandom = "AT_C2256_" + faker.string.alphanumeric(10).toUpperCase();


test.describe("MailFence Tests", () => {


    test("Send and process email", async ({page}) => {
        await page.goto(process.env.MAILFENCE_LOGIN_URL!)
        const emailPage = new AuthorizaionPage(page)
        await emailPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)

        const sendMail = new MailCreate(page, subjectRandom)
        await sendMail.createMail(process.env.MAIL_TEXT!, subjectRandom, process.env.TEST_FILE_PATH!)
        await page.reload();
        await sendMail.documentProcess()
        const processDocument = new DocumentProcessing(page)
        await processDocument.documentProcess()


    })


})
