import {Page} from "@playwright/test";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {BaseComponent} from "./base-components";
import {BasePage} from "../page/base-page";
import {HeaderMenuComponent} from "./header-menu-component";
import {MailGeneralComponent} from "./mail-general-component";

export class DocumentRemoveComponent extends BaseComponent{
    private documentFolderButton: HeaderMenuComponent;
    private documentChooseButton: ButtonElement;
    private documentMoveButton: ButtonElement;
    private trashButton: ButtonElement;
    private refreshedButton: MailGeneralComponent;

    constructor(page: Page) {
        super();
        this.documentFolderButton = new HeaderMenuComponent(page)
        this.documentChooseButton = new ButtonElement(page.locator('.GCSDBRWBPJB').first())
        this.documentMoveButton = new ButtonElement(page.locator('.icon.icon16-Move'))
        this.trashButton = new ButtonElement(page.locator('#doc_tree_trash').first())
        this.refreshedButton = new MailGeneralComponent(page);
    }

    async clickDocumentFolder(): Promise<void> {
        await this.documentFolderButton.goToDocument()
    }
    async chooseDocument(): Promise<void> {
        await this.documentChooseButton.click();
    }
    async moveToTrash(){
        await this.documentMoveButton.click();
    }
    async goToTrash(){
        await this.trashButton.click();
    }

    async refreshAction(): Promise<void> {
        await this.refreshedButton.goToRefresh()
    }
}