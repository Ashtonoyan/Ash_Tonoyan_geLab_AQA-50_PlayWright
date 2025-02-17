import {Page, Locator} from "@playwright/test";
import {Button} from "./button";


export class EmailFind {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async find(subjectRandom: string) {
        let counter = 0;
        const buttonRefresh = new Button(this.page, 'div.icon.icon16-Refresh')

        while (counter < 10) {
            try {
                await this.page.waitForSelector(`div.listSubject[title="${subjectRandom}"]`, {timeout: 1000});
                const email = await this.page.locator(`div.listSubject[title="${subjectRandom}"]`);
                await email.click();
                break;
            } catch (e) {
                counter++;
                console.log('Element not found, reloading page...');
                await buttonRefresh.click()
            }

        }
        if (counter === 10) {
            throw new Error('Email not found after 10 attempts.');
        }
    }
}