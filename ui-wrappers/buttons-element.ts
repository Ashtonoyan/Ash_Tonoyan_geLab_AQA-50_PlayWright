import {Page, Locator, expect} from "@playwright/test";
import {test} from "playwright/test";
import {BaseElement} from "./base-element";

export class ButtonElement extends BaseElement {

    constructor(page: Page, selector: string, name?: string) {
        super(page, selector, name);
    }

    async toHaveCSS() {
        await test.step(`To have CSS ${this.name}`, async () => {
            await expect(this.locator).toHaveCSS('cursor', 'pointer');
        })

    }


}