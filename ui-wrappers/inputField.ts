import {Page, Locator} from "@playwright/test";

export class InputField {
    private inputField: Locator

    constructor(page: Page, selector: string) {
        this.inputField = page.locator(selector)
    }

    async fillInputField(data: string) {
        await this.inputField.fill(data)
    }
}