import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class EmailPreviewArea extends BaseComponent {
    public saveTypeButton: ButtonElement;
    public saveInDocument: ButtonElement;

    constructor(page: Page) {
        super()
        this.saveTypeButton = new ButtonElement(page.locator('a.GCSDBRWBJRB'))
        this.saveInDocument = new ButtonElement(page.locator('//body/div[5]/div/ul/li[3]/a/span'))
    }

}