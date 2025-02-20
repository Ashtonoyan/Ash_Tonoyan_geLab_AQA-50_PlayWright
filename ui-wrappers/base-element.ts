import {Page, Locator} from "@playwright/test";
import {test} from "playwright/test";

export class BaseElement {

    locator: Locator;
    name: string | undefined;


    constructor(pageOrLocator: Page | Locator, selector?: string, name?: string) {
        if (selector) {
            this.locator = (pageOrLocator as Page).locator(selector);
        } else {
            this.locator = pageOrLocator as Locator;
        }
        this.name = name;
    }

    async click(options?: Parameters<Locator["click"]>[0]) {
        await test.step(`Click ${this.name}`, async () => {
            await this.locator.click(options);
        });
    }
    first(): BaseElement {
        return new BaseElement(this.locator.first(), '', `${this.name} (first)`);
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
            // Using the provided selector and options (timeout)
            await this.locator.waitFor({
                timeout: options.timeout || 30000,
            });
        });
    }
}