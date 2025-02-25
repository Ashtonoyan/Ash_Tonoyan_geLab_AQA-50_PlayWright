import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class MessageNavigationHeader extends BaseComponent {
    private messageIcon: ButtonElement;
    private documentIcon: ButtonElement;

    constructor(page: Page) {
        super()
        this.messageIcon = new ButtonElement(page.locator('.icon24-Message.toolImg'))
        this.documentIcon = new ButtonElement(page.locator('.icon24-Documents.toolImg'))
    }

    async moveToMessage(): Promise<void> {
        await this.messageIcon.click()
    }

    async moveToDocument(): Promise<void> {
        await this.documentIcon.click()
    }
}