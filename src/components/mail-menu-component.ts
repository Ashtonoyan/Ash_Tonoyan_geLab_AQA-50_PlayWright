import {Page} from "@playwright/test";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {BaseComponent} from "./base-components";


export class MailMenuComponent extends BaseComponent {
    private createMail: ButtonElement;
    private refresh: ButtonElement;
    private inboxMail: ButtonElement;
    private trash: ButtonElement;

    constructor(page: Page) {
        super()
        this.createMail = new ButtonElement(page.locator('#mailNewBtn'), 'Mail Create Button')
        this.refresh = new ButtonElement(page.locator('div.icon.icon16-Refresh'), 'Refresh Button')
        this.inboxMail = new ButtonElement(page.locator('#treeInbox'), 'Inbox Mail Create Button')
        this.trash = new ButtonElement(page.locator('#doc_tree_trash'), 'Trash Button')
    }

    async gotoCreateMail(): Promise<void> {
        await this.createMail.click()
    }

    async goToRefresh(): Promise<void> {
        await this.refresh.click()
    }

    async goToInbox(): Promise<void> {
        await this.inboxMail.click()
    }

    async goToTrash(): Promise<void> {
        await this.trash.first().click()
    }
}