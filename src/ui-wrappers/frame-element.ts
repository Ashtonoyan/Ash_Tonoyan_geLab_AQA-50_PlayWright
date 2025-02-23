import {Page, FrameLocator} from "@playwright/test";
import {test} from "@playwright/test";
import {BaseElement} from "./base-element";

export class Frame extends BaseElement {
    private frameLocator: FrameLocator;

    constructor(frameLocator: FrameLocator, name?: string,) {
        super(frameLocator.locator(''), name);
        this.frameLocator = frameLocator;
    }

    async fill(fieldSelector: string, data: string) {
        await test.step(`Fill ${this.name} with data`, async () => {
            const fieldLocator = this.frameLocator.locator(fieldSelector);
            await fieldLocator.fill(data);
        });
    }
}
