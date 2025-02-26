import {Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {NavigationHeader} from "../components/mail-navigation-header-component";
import {NavigationSideBar} from "../components/mail-navigation-sideBar-component";
import {EmailsList} from "../components/mail-email-list-component";
import {EmailPreviewArea} from "../components/mail-email-preview-area-component";
import {MessagesActionsTopBar} from "../components/mail-messages-actions-top-bar-component";
import {MessageNewMailForm} from "../components/message-new-mail-form-component";
import {DocumentDialog} from "../components/document-dialog-component";

export class MailCreate extends BasePage {
    private navigateSidebarButtons: NavigationSideBar
    private navigateHeaderButtons: NavigationHeader
    private emailDetails: EmailPreviewArea
    private messageActionsBar: MessagesActionsTopBar
    private newMailForm: MessageNewMailForm
    private emailList: EmailsList
    private documentDialog: DocumentDialog

    constructor(page: Page, subjectRandom: string) {
        super(page);
        this.navigateSidebarButtons = new NavigationSideBar(page)
        this.navigateHeaderButtons = new NavigationHeader(page)
        this.emailDetails = new EmailPreviewArea(page)
        this.messageActionsBar = new MessagesActionsTopBar(page)
        this.newMailForm = new MessageNewMailForm(page)
        this.emailList = new EmailsList(page, subjectRandom)
        this.documentDialog = new DocumentDialog(page)
    }

    async goToMessage(){
        await this.navigateHeaderButtons.messageIcon.click()
    }

    async createFillSendMail(mailtext: string, subject: string, file: string): Promise<void> {
        await this.messageActionsBar.newMail.click()
        await this.newMailForm.fillMessage(mailtext, subject, file)
        await this.newMailForm.sendButton.click()
    }

    async goToEmailList(){
        await this.navigateSidebarButtons.inbox.click()
    }

    async refreshMessages(): Promise<void> {
        await this.messageActionsBar.refreshButton.click()
    }

    async findMessagesAndDocumentSave(): Promise<void> {

        let counter = 0;

        while (counter < 10) {
            try {
                await this.emailList.emailFind()
                break;
            } catch (e) {
                counter++;
                console.log('Element not found, reloading page...');
                await this.messageActionsBar.refreshButton.click()
            }

        }
        if (counter === 10) {
            throw new Error('Email not found after 10 attempts.');
        }

        await this.emailDetails.saveTypeButton.click({button: 'right'})
        await this.emailDetails.saveInDocument.click()
        await this.documentDialog.documentFolderSelectButton.click()
        await this.documentDialog.moveDocument()
    }
}