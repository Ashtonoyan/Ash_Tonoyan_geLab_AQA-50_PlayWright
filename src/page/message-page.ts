import {BasePage} from "./base-page";
import {NavigationHeader} from "../components/mail-navigation-header-component";
import {NavigationSideBar} from "../components/mail-navigation-sideBar-component";
import {EmailsList} from "../components/mail-email-list-component";
import {EmailPreviewArea} from "../components/mail-email-preview-area-component";
import {MessagesActionsTopBar} from "../components/mail-messages-actions-top-bar-component";
import {MessageNewMailForm} from "../components/message-new-mail-form-component";
import {DocumentDialog} from "../components/document-dialog-component";
import {test} from "playwright/test";

export class MessagesPage extends BasePage {
    static async goToMessage() {
        await test.step('Go to Message', async () => {
            await NavigationHeader.messageIcon().click()

        })
    }

    static async createFillSendMail(mailtext: string, subject: string, file: string): Promise<void> {
        await test.step("Create and fill message", async () => {
            await MessagesActionsTopBar.newMail().click()
            await MessageNewMailForm.fillMessage(mailtext, subject, file)
            await MessageNewMailForm.sendButton().click()
        })

    }

    static async goToEmailList() {
        await test.step('Go to Email List', async () => {
            await NavigationSideBar.inbox().click()
        })

    }

    static async refreshMessages(): Promise<void> {
        await test.step('Refresh messages', async () => {
            await MessagesActionsTopBar.refreshButton().click()
        })

    }

    static async findMessages(subjectRandom: string): Promise<void> {
        await test.step('Find messages', async () => {
            let counter = 0;

            while (counter < 10) {
                try {
                    await EmailsList.emailFindBySubject(subjectRandom);
                    break;
                } catch (e) {
                    counter++;
                    console.log('Element not found, reloading page...');
                    await this.refreshMessages()
                }

            }
            if (counter === 10) {
                throw new Error('Email not found after 10 attempts.');
            }
        })

    }

    static async saveDocument() {
        await test.step('Save document', async () => {
            await EmailPreviewArea.saveTypeButton().click({button: 'right'})
            await EmailPreviewArea.saveInDocument().click()
            await DocumentDialog.documentFolderSelectButton().click()
            await DocumentDialog.confirmMoveToFolder()
        })

    }
}