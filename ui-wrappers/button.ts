import {Page, Locator, expect} from "@playwright/test";

export class Button {
    private button: Locator;

    constructor(page: Page, selector: string) {
        this.button = page.locator(selector);
    }

    async click() {
        await this.button.click();
    }

    async toAttached() {
        await this.button
            .waitFor({state: 'attached'});
    }

    async toHaveCSS() {
        await expect(this.button).toHaveCSS('cursor', 'pointer');
    }


}