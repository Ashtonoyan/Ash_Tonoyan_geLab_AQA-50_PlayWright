import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class DocumentNavigationHeader extends BaseComponent {
    public openDocumentsButton: ButtonElement;

    constructor(page: Page) {
        super();
        this.openDocumentsButton = new ButtonElement(page.locator('.icon24-Documents.toolImg'))
    }

}