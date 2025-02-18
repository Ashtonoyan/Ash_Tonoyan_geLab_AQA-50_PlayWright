import {Page, FrameLocator} from "@playwright/test";
import {test} from "@playwright/test";

export class FrameClass {
    private frame: FrameLocator;
    private name: string;

    constructor(page: Page, name: string, selector: string) {
        this.frame = page.frameLocator(selector)
        this.name = name;

    }

    async fillFrame(selector: string, data: string) {
        await test.step(`Fill frame input: ${selector} with data: ${data}`, async () => {
            const frameElement = this.frame.locator(selector)
            if (frameElement !== null) {
                await frameElement.fill(data)
            } else {
                throw new Error('Error: iframe is not available or not loaded');
            }
        });
    }
}
