import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class MessagesActionsTopBar extends BaseComponent {
    public newMail: ButtonElement
    public refreshButton: ButtonElement

    constructor(page: Page) {
        super();
        this.newMail = new ButtonElement(page.locator('#mailNewBtn'), 'Mail Create Button')
        this.refreshButton = new ButtonElement(page.locator('div.icon.icon16-Refresh'), 'Refresh Button')
    }
}