import {Page} from "@playwright/test";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {BaseComponent} from "./base-components";
import {BasePage} from "../page/base-page";

export class DocumentMailProcessComponent extends BaseComponent {
    private inboxButton: ButtonElement;
    private refreshButton: ButtonElement;
    private trashButton: ButtonElement;
    private saveChoose: ButtonElement;
    private saveInDocument: ButtonElement;
    private folderForDocument: ButtonElement;

    constructor(page: Page) {
        super();
        this.refreshButton = new ButtonElement(page.locator('div.icon.icon16-Refresh'), 'Refresh Button')
        this.inboxButton = new ButtonElement(page.locator('#treeInbox'), 'Inbox Mail Create Button')
        this.trashButton = new ButtonElement(page.locator('#doc_tree_trash').first(), 'Trash Button')
        this.saveChoose = new ButtonElement(page.locator('a.GCSDBRWBJRB'))
        this.saveInDocument = new ButtonElement(page.locator('//body/div[5]/div/ul/li[3]/a/span'))
        this.folderForDocument = new ButtonElement(page.locator('div[hidefocus="true"] div.treeItemLabel:not(#doc_tree_trash)'));


    }


    async goToRefresh(): Promise<void> {
        await this.refreshButton.click()
    }

    async goToInbox(): Promise<void> {
        await this.inboxButton.click()
    }

    async goToTrash(): Promise<void> {
        await this.trashButton.click()
    }

    async chooseSaveOption(): Promise<void> {
        await this.saveChoose.click({button: 'right'});
    }

    async chooseSaveInDocument(): Promise<void> {
        await this.saveInDocument.click()
    }

    async chooseSaveInFolder(): Promise<void> {
        await this.folderForDocument.click()
    }

}