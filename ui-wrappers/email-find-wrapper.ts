import {Page, Locator} from "@playwright/test";
import {ButtonsWrapper} from "./buttons-wrapper";
import {test} from "playwright/test";


export class EmailFindWrapper {
    private page: Page;
    private name: string;

    constructor(page: Page, name: string) {
        this.page = page;
        this.name = name;
    }

    async find(subjectRandom: string) {
        await test.step(`Find our email in ${this.name}`, async () => {
            let counter = 0;
            const buttonRefresh = new ButtonsWrapper(this.page, 'Refresh button for Email find', 'div.icon.icon16-Refresh')

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
        })


    }
}