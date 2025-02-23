import {Locator} from "@playwright/test";
import {test} from "playwright/test";
import {BaseElement} from "./base-element";

const fs = require('fs');

export class UploadFile extends BaseElement {
    constructor(locator: Locator, name?: string,) {
        super(locator, name);
    }

    async uploadFile(filePath: string) {
        await test.step(`Upload file in ${this.name}`, async () => {
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }
            await this.locator.setInputFiles(filePath);
        })

    }
}