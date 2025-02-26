import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class DocumentDialog extends BaseComponent {
    public documentFolderSelectButton: ButtonElement;
    public trashFolderButton: ButtonElement;
    public confirmButton: ButtonElement;
    private moveToFolder: ButtonElement;

    constructor(page: Page) {
        super();
        this.documentFolderSelectButton = new ButtonElement(page.locator('div[hidefocus="true"] div.treeItemLabel:not(#doc_tree_trash)'));
        this.trashFolderButton = new ButtonElement(page.locator('div[hidefocus="true"] div#doc_tree_trash:not(#treeItemLabel)'));
        this.moveToFolder = new ButtonElement(page.locator('#dialBtn_OK'), 'buttonOk')
        this.confirmButton = new ButtonElement(page.locator('#dialBtn_YES'))
    }

    async moveDocument(): Promise<void> {
        await this.moveToFolder.toAttached()
        await this.moveToFolder.toHaveCSS()
        await this.moveToFolder.click();
    }
}