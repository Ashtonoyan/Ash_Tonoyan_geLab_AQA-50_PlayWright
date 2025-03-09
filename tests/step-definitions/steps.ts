import {MessagesPage} from "../../src/page/message-page";
import {DocumentsPage} from "../../src/page/document-page";
import {getPage, setPage} from "../../src/core/utils/page-utils";
import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import {faker} from "@faker-js/faker";
import {deleteGenerateFile, generateFile} from "../../src/core/utils/work-with-file";


const { Given, When, Then } = createBdd();
let subjectRandom: string
let workWithFile: { fileName: string, filePath: string };


Given('Login to mailfence', async () => {

})

When('Navigate to the Messages page', async () => {
    await MessagesPage.goToMessagesPage()
})

When('Compose new email with file attachment name {string}', async ({}, prefix: string) => {
    subjectRandom = `${prefix}_${faker.string.alphanumeric(10).toUpperCase()}`
    workWithFile = await generateFile()
    await MessagesPage.createAndFillMessage(subjectRandom, workWithFile.filePath)
    await deleteGenerateFile(workWithFile.filePath)
})

When('Send email to yourself', async()=>{
    await MessagesPage.sendMessageToSelf(process.env.MAIL_TO!)
})


When('Navigate to Email list', async () => {
    await MessagesPage.goToEmailList()
})


When('Open the received email', async () => {
    await MessagesPage.findAndOpenMessage(subjectRandom)
})

When('Move attached file to My Documents', async () => {
    await MessagesPage.saveFileInDocumentsFolder()
})

When('Navigate to the My Documents page', async () => {
    await DocumentsPage.goToDocumentsPage()
})

When('Move txt file to Trash by drag and drop', async () => {
    await DocumentsPage.moveFileToTrash(workWithFile.fileName)
})


Then('Verify that txt file is in the Trash', async () => {
    await DocumentsPage.goToTrash()
    await expect(getPage().locator(`[title="${workWithFile.fileName}"]`)).toBeVisible();
})



