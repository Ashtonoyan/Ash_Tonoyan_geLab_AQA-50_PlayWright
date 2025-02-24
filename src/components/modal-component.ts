import {Page} from "@playwright/test";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {BaseComponent} from "./base-components";


export class ModalComponent extends BaseComponent {
    private okButton: ButtonElement;
    private confirmButton: ButtonElement;
    private clickOnTrash: ButtonElement;

    constructor(page: Page) {
        super()
        this.okButton = new ButtonElement(page.locator('#dialBtn_OK'), 'buttonOk')
        this.confirmButton = new ButtonElement(page.locator('#dialBtn_YES'))
        this.clickOnTrash = new ButtonElement(page.locator('div[hidefocus="true"] div#doc_tree_trash:not(#treeItemLabel)'));
    }

    async okButtonClick(): Promise<void> {
        await this.okButton.toAttached()
        await this.okButton.toHaveCSS()
        await this.okButton.click()
    }

    async confirmButtonClick(): Promise<void> {
        await this.confirmButton.click()
    }

    async trashButtonClick(): Promise<void> {
        await this.clickOnTrash.scroolViewIfNeeded()
        await this.clickOnTrash.click();
        await this.clickOnTrash.hover();
        await this.clickOnTrash.click({force: true});
    }
}