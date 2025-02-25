import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class MessagesActionsTopBar extends BaseComponent {
    private createMailButton: ButtonElement
    private refreshButton: ButtonElement

    constructor(page: Page) {
        super();
        this.createMailButton = new ButtonElement(page.locator('#mailNewBtn'), 'Mail Create Button')
        this.refreshButton = new ButtonElement(page.locator('div.icon.icon16-Refresh'), 'Refresh Button')
    }

    async createMail(): Promise<void> {
        await this.createMailButton.click()
    }

    async refresh() {
        await this.refreshButton.click()
    }
}