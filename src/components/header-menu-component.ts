import {Page} from "@playwright/test";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {BaseComponent} from "./base-components";

export class HeaderMenuComponent extends BaseComponent {
    private mailButton: ButtonElement;
    private documentButton: ButtonElement;

    constructor(page: Page) {
        super()
        this.mailButton = new ButtonElement(page.locator('.icon24-Message.toolImg'))
        this.documentButton = new ButtonElement(page.locator('.icon24-Documents.toolImg'))
    }

    async goToMail() {
        await this.mailButton.click()
    }

    async goToDocument() {
        await this.documentButton.click()
    }
}