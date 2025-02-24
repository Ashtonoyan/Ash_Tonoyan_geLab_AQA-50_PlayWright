//import {test} from "playwright/test";
import {faker} from '@faker-js/faker';
import {AuthorizaionPage} from "./page/authorization-page";
import {MailCreate} from "./page/mail-create-page";
import {DocumentSaving} from "./page/document-saving-page";
import {DocumentProcessing} from "./page/document-processing-page";
import { test } from './fixtures/page-fixture';
import { getPage } from './utils/page-utils';



const subjectRandom = "AT_C2256_" + faker.string.alphanumeric(10).toUpperCase();


test.describe("MailFence Tests", () => {

    /*
    test.beforeEach(async ({ browser }) => {
        const page = await browser.newPage();
        setPage(page);  // Устанавливаем страницу в глобальное хранилище
    });

    test.afterEach(async () => {
        const page = getPage();  // Получаем страницу из глобального хранилища
        await page.close();  // Закрываем страницу после теста
    });

     */

    test("Send and process email", async ({page}) => {
        //const page = getPage(); // Получаем страницу из глобального хранилища
        await page.goto(process.env.MAILFENCE_LOGIN_URL!)
        // Authorization process
        const emailPage = new AuthorizaionPage(page)
        await emailPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)

        const sendMail = new MailCreate(page)
        await sendMail.createMail(process.env.MAIL_TEXT!, subjectRandom, process.env.TEST_FILE_PATH!)
        // Saving a document
        await page.reload();
        const saveDocument = new DocumentSaving(page)
        await saveDocument.documentSaving(subjectRandom)
        //Processing a document
        //Select the file and click on "Move"
        const processDocument = new DocumentProcessing(page)
        await processDocument.documentProcess()


    })


})
