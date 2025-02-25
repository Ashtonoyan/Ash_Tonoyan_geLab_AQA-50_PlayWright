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
    private navigateSibar: NavigationSideBar
    private navigateHeader: NavigationHeader
    private emailPreview: EmailPreviewArea
    private topBar: MessagesActionsTopBar
    private mailText1: MessageNewMailForm
    private emailList: EmailsList
    private documentFolder: DocumentDialog

    constructor(page: Page, subjectRandom: string) {
        super(page);
        this.navigateSibar = new NavigationSideBar(page)
        this.navigateHeader = new NavigationHeader(page)
        this.emailPreview = new EmailPreviewArea(page)
        this.topBar = new MessagesActionsTopBar(page)
        this.mailText1 = new MessageNewMailForm(page)
        this.navigateSibar = new NavigationSideBar(page)
        this.navigateHeader = new NavigationHeader(page)
        this.emailList = new EmailsList(page, subjectRandom)
        this.emailPreview = new EmailPreviewArea(page)
        this.topBar = new MessagesActionsTopBar(page)
        this.documentFolder = new DocumentDialog(page)
    }

    async createMail(mailtext: string, subject: string, file: string): Promise<void> {
        await this.navigateHeader.moveToMessage()
        await this.topBar.createMail()
        await this.mailText1.createMessage(mailtext, subject, file)
    }

    async documentProcess(): Promise<void> {
        await this.navigateSibar.moveToInbox()
        await this.topBar.refresh()

        let counter = 0;

        while (counter < 10) {
            try {
                await this.emailList.emailFind()
                break;
            } catch (e) {
                counter++;
                console.log('Element not found, reloading page...');
                await this.topBar.refresh()
            }

        }
        if (counter === 10) {
            throw new Error('Email not found after 10 attempts.');
        }

        await this.emailPreview.saveChoose()
        await this.emailPreview.chooseSaveInDocument()
        await this.documentFolder.clickDocumentFolder()
        await this.documentFolder.moveDocument()
    }
}