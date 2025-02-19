import {Page, Locator} from "@playwright/test";
import {test} from "@playwright/test";
import {BaseElement} from "./base-element";

export class InputField extends BaseElement {
    constructor(page: Page, selector: string, name?: string) {
        super(page, selector, name);
    }

    async fillInputField(data: string) {
        await test.step(`Fill ${this.name} field`, async () => {
            await this.locator.fill(data)
        })

    }


}