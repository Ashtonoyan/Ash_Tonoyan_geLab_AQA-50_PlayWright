import {Locator} from "@playwright/test";
import {test} from "playwright/test";

export class BaseElement {

    locator: Locator;
    name: string | undefined;


    constructor(locator: Locator, name?: string) {

        this.locator = locator;
        this.name = name;
    }

    async click(options?: Parameters<Locator["click"]>[0]) {
        await test.step(`Click ${this.name}`, async () => {
            await this.locator.click(options);
        });
    }



    async toAttached() {
        await test.step(`To be Attached ${this.name}`, async () => {
            await this.locator.waitFor({state: 'attached'});
        })

    }

    async scroolViewIfNeeded() {
        await test.step(`Scrool view for ${this.name}`, async () => {
            await (this.locator).scrollIntoViewIfNeeded()
        })
    }

    async waitForElement() {
        await test.step(`Wait for ${this.name} to appear`, async () => {
            await this.locator.waitFor();
        });
    }

    async waitForSelector(options: { timeout?: number } = {}) {
        await test.step(`Wait for ${this.name} to appear`, async () => {
            await this.locator.waitFor({
                timeout: options.timeout || 30000,
            });
        });
    }
}