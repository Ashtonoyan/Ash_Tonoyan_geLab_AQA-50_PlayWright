import {Page, FrameLocator} from "@playwright/test";

export class FrameClass {
    private frame: FrameLocator;

    constructor(page: Page, selector: string) {
        this.frame = page.frameLocator(selector)

    }

    async fillFrame(selector: string, data: string) {
        const frameElement = this.frame.locator(selector)
        if (frameElement !== null) {
            await frameElement.fill(data)
        } else {
            throw new Error('Error: iframe is not available or not loaded');
        }
    }
}
