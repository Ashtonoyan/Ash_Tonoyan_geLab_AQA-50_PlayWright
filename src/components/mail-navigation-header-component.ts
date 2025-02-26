import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class NavigationHeader extends BaseComponent {
    public messageIcon: ButtonElement;
    protected documentIcon: ButtonElement;

    constructor(page: Page) {
        super()
        this.messageIcon = new ButtonElement(page.locator('.icon24-Message.toolImg'))
        this.documentIcon = new ButtonElement(page.locator('.icon24-Documents.toolImg'))
    }

}