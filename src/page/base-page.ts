import {Page, Locator} from "@playwright/test";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}