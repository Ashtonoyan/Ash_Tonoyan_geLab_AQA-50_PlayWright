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
        await LoginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)

        await MessagePage.goToMessage()
        await MessagePage.createFillSendMail(process.env.MAIL_TEXT!, subjectRandom, filePath)
        await page.reload();
        await MessagePage.goToEmailList()
        await MessagePage.refreshMessages()

        await MessagePage.findMessages(subjectRandom)
        await MessagePage.saveDocument()
        await DocumentPage.moveToDocument()
        await DocumentPage.refreshDocumentLists()
        await DocumentPage.documentProcess()


    })


})
