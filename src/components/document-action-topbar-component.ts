import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class DocumentActionTopBar extends BaseComponent {
    public refreshButton: ButtonElement;
    public moveButton: ButtonElement

    constructor(page: Page) {
        super();
        this.refreshButton = new ButtonElement(page.locator('div.icon.icon16-Refresh'), 'Refresh Button')
        this.moveButton = new ButtonElement(page.locator('.icon.icon16-Move'))
    }

}