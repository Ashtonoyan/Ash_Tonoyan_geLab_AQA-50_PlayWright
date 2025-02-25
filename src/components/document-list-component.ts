import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class DocumentList extends BaseComponent {
    private documentChooseButton: ButtonElement;

    constructor(page: Page) {
        super();
        this.documentChooseButton = new ButtonElement(page.locator('.GCSDBRWBPJB').first())
    }

    async chooseDocument() {
        await this.documentChooseButton.click();
    }
}