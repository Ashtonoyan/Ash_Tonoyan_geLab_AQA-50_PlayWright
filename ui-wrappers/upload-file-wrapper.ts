import {Page, Locator} from "@playwright/test";
import {test} from "playwright/test";

const fs = require('fs');

export class UploadFile {
    private file: Locator;
    private name: string;

    constructor(page: Page, name: string, selector: string) {
        this.file = page.locator(selector);
        this.name = name;
    }

    async uploadFile(filePath: string) {
        await test.step(`Upload file in ${this.name}`, async () => {
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }
            await this.file.setInputFiles(filePath);
        })

    }
}