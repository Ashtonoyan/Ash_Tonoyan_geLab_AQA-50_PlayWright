import {Page, Locator} from "@playwright/test";
import {test} from "@playwright/test";

export class InputFieldWrapper {
    private inputField: Locator
    private name: string

    constructor(page: Page, name: string, selector: string) {
        this.inputField = page.locator(selector)
        this.name = name
    }

    async fillInputField(data: string) {
        await test.step(`Fill ${this.name} field`, async () => {
            await this.inputField.fill(data)
        })

    }
}