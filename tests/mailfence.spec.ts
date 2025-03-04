import {faker} from '@faker-js/faker';
import {MessagesPage} from "../src/page/message-page";
import {DocumentsPage} from "../src/page/document-page";
import {test} from '../src/core/fixtures/page-fixture';
import {getPage} from '../src/core/utils/page-utils';
import {expect} from "playwright/test";
import path from "path";

const filePath = path.resolve(__dirname, process.env.TEST_FILE_PATH as string);
const fileName = process.env.FILE_NAME!;

test.describe("MailFence Tests", () => {

    test("Send and process email", async () => {
        const subjectRandom = 'AT_C2256_' + faker.string.alphanumeric(10).toUpperCase();
        await MessagesPage.goToMessagesPage()
        await MessagesPage.createAndFillMessage(process.env.MAIL_TEXT!, subjectRandom, filePath)
        await MessagesPage.sendMessageToSelf()
        await MessagesPage.goToEmailList()
        await MessagesPage.refreshMessages()
        await MessagesPage.findAndOpenMessage(subjectRandom)
        await MessagesPage.saveFileInDocumentsFolder()

        await DocumentsPage.goToDocumentsPage()
        await DocumentsPage.refreshDocumentList()
        await DocumentsPage.moveFileToTrash()
        await DocumentsPage.goToTrash()
        await expect(getPage().locator(`[title="${fileName}"]`)).toBeVisible();
    })

    test("COPIED VERSION:Send and process email ", async () => {
        const subjectRandom = 'AT_C2256_' + faker.string.alphanumeric(10).toUpperCase();
        await MessagesPage.goToMessagesPage()
        await MessagesPage.createAndFillMessage(process.env.MAIL_TEXT!, subjectRandom, filePath)
        await MessagesPage.sendMessageToSelf()
        await MessagesPage.goToEmailList()
        await MessagesPage.refreshMessages()
        await MessagesPage.findAndOpenMessage(subjectRandom)
        await MessagesPage.saveFileInDocumentsFolder()

        await DocumentsPage.goToDocumentsPage()
        await DocumentsPage.refreshDocumentList()
        await DocumentsPage.moveFileToTrash()
        await DocumentsPage.goToTrash()
        await expect(getPage().locator(`[title="${fileName}"]`)).toBeVisible();
    })


})
