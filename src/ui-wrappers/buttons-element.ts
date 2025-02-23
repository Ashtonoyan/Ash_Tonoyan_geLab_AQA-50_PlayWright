import {Locator, expect} from "@playwright/test";
import {test} from "playwright/test";
import {BaseElement} from "./base-element";

export class ButtonElement extends BaseElement {

    constructor(locator: Locator, name?: string) {
        super(locator, name);
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

    async hover() {
        await test.step(`To hover ${this.name}`, async () => {
            await this.locator.hover()
        })
    }


}