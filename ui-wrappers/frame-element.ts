import {Page, Locator} from "@playwright/test";
import {test} from "@playwright/test";
import {BaseElement} from "./base-element";

export class Frame extends BaseElement {
    private frameLocator: Locator;

    constructor(page: Page, selector: string, name?: string,) {
        super(page, selector, name);
        this.frameLocator = page.locator(selector);
    }

    async fillFrame(selector: string, data: string) {
        await test.step(`Fill frame input: ${selector} with data: ${data}`, async () => {
            const iframeElement = await this.frameLocator.elementHandle();

            if (!iframeElement) {
                throw new Error('Iframe element not found or not loaded');
            }
            const frame = await iframeElement.contentFrame();

            if (frame) {
                const frameElement = frame.locator(selector);
                await frameElement.fill(data);
            } else {
                throw new Error('Iframe not loaded or content not available');
            }

        });
    }
}
