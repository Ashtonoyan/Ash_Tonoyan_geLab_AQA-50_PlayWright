import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class DocumentNavigationHeader extends BaseComponent {
    private documentNavigateButton: ButtonElement;

    constructor(page: Page) {
        super();
        this.documentNavigateButton = new ButtonElement(page.locator('.icon24-Documents.toolImg'))
    }

    async moveToDocumentFolder() {
        await this.documentNavigateButton.click()
    }
}