import {Page, Locator, expect} from "@playwright/test";
import {test} from "playwright/test";

export class ButtonsWrapper {
    private button: Locator;
    private name: string;

    constructor(page: Page, name: string, selector: string ) {
        this.button = page.locator(selector);
        this.name = name
    }

    async click() {
        await test.step(`Click ${this.name}`, async()=>{
            await this.button.click();
    });
    }

    async toAttached() {
        await test.step(`To be Attached ${this.name}`, async()=>{
            await this.button
                .waitFor({state: 'attached'});
        })

    }

    async toHaveCSS() {
        await test.step(`To have CSS ${this.name}`, async()=>{
            await expect(this.button).toHaveCSS('cursor', 'pointer');
        })

    }


}