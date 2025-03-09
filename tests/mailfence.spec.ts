import {faker} from '@faker-js/faker';
import {MessagesPage} from "../src/page/message-page";
import {DocumentsPage} from "../src/page/document-page";
import {test} from '../src/core/fixtures/page-fixture';
import {getPage} from '../src/core/utils/page-utils';
import {expect} from "playwright/test";
import {generateFile, deleteGenerateFile} from "../src/core/utils/work-with-file";


test.describe("MailFence Tests", () => {

    test("Send and process email", async () => {
        const subjectRandom = 'AT_C2256_' + faker.string.alphanumeric(10).toUpperCase();
        const {fileName, filePath} = await generateFile()
        await MessagesPage.goToMessagesPage()
        await MessagesPage.createAndFillMessage(subjectRandom, filePath)
        await deleteGenerateFile(filePath)
        await MessagesPage.sendMessageToSelf(process.env.MAIL_TO!)
        await MessagesPage.goToEmailList()
        await MessagesPage.refreshMessages()
        await MessagesPage.findAndOpenMessage(subjectRandom)
        await MessagesPage.saveFileInDocumentsFolder()

        await DocumentsPage.goToDocumentsPage()
        await DocumentsPage.refreshDocumentList()
        await DocumentsPage.moveFileToTrash(fileName)
        await DocumentsPage.goToTrash()
        await expect(getPage().locator(`[title="${fileName}"]`)).toBeVisible();

    })

    test("COPIED VERSION:Send and process email ", async () => {
        const subjectRandom = 'AT_C2256_' + faker.string.alphanumeric(10).toUpperCase();
        const {fileName, filePath} = await generateFile()
        await MessagesPage.goToMessagesPage()
        await MessagesPage.createAndFillMessage(subjectRandom, filePath)
        await deleteGenerateFile(filePath)
        await MessagesPage.sendMessageToSelf(process.env.MAIL_TO!)
        await MessagesPage.goToEmailList()
        await MessagesPage.findAndOpenMessage(subjectRandom)
        await MessagesPage.saveFileInDocumentsFolder()

        await DocumentsPage.goToDocumentsPage()
        await DocumentsPage.moveFileToTrash(fileName)
        await DocumentsPage.goToTrash()
        await expect(getPage().locator(`[title="${fileName}"]`)).toBeVisible();

    })


})
