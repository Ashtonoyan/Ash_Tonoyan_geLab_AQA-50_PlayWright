import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class DocumentDialog extends BaseComponent {
    private documentFolderButton: ButtonElement;
    private trashFolderButton: ButtonElement;
    private moveToFolder: ButtonElement;
    private confirmButton: ButtonElement;

    constructor(page: Page) {
        super();
        this.documentFolderButton = new ButtonElement(page.locator('div[hidefocus="true"] div.treeItemLabel:not(#doc_tree_trash)'));
        this.trashFolderButton = new ButtonElement(page.locator('div[hidefocus="true"] div#doc_tree_trash:not(#treeItemLabel)'));
        this.moveToFolder = new ButtonElement(page.locator('#dialBtn_OK'), 'buttonOk')
        this.confirmButton = new ButtonElement(page.locator('#dialBtn_YES'))
    }

    async clickDocumentFolder(): Promise<void> {
        await this.documentFolderButton.click();
    }

    async clicktrashFolder(): Promise<void> {
        await this.trashFolderButton.click();
    }

    async moveDocument(): Promise<void> {
        await this.moveToFolder.toAttached()
        await this.moveToFolder.toHaveCSS()
        await this.moveToFolder.click();
    }

    async clickConfirm(): Promise<void> {
        await this.confirmButton.click();
    }

}