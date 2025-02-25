import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class EmailPreviewArea extends BaseComponent {
    private saveButon: ButtonElement;
    private saveInDocument: ButtonElement;

    constructor(page: Page) {
        super()
        this.saveButon = new ButtonElement(page.locator('a.GCSDBRWBJRB'))
        this.saveInDocument = new ButtonElement(page.locator('//body/div[5]/div/ul/li[3]/a/span'))
    }

    async saveChoose(): Promise<void> {
        await this.saveButon.click({button: 'right'});
    }

    async chooseSaveInDocument(): Promise<void> {
        await this.saveInDocument.click()
    }
}