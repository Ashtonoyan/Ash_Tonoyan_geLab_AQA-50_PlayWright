import {FrameLocator, Locator} from "@playwright/test";
import {test} from "@playwright/test";
import {BaseElement} from "./base-element";

export class Frame extends BaseElement {
    private frameLocator: FrameLocator;

    constructor(frameLocator: FrameLocator, name?: string,) {
        super(frameLocator.locator(''), name);
        this.frameLocator = frameLocator;
    }

    findLocator(selector: string): Locator {
        return this.frameLocator.locator(selector);
    }

    async fill(fieldLocator: Locator, data: string) {
        await test.step(`Fill ${this.name} with data`, async () => {
            await fieldLocator.fill(data);
        });
    }
}
