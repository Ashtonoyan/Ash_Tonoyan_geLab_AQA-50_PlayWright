import {Page, expect} from "@playwright/test";
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

    async toBeVisible() {
        await test.step(`To be Visible ${this.name}`, async () => {
            await expect(this.locator).toBeVisible()
        })
    }

    async hover(){
        await test.step(`To hover ${this.name}`, async () => {
            await this.locator.hover()
        })
    }


}