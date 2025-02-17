import {Page, Locator} from "@playwright/test";

const fs = require('fs');

export class UploadFile {
    private file: Locator;

    constructor(page: Page, selector: string) {
        this.file = page.locator(selector);
    }

    async uploadFile(filePath: string) {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        await this.file.setInputFiles(filePath);
    }
}