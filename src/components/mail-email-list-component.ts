import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class EmailsList extends BaseComponent {
    private email: ButtonElement;

    constructor(page: Page, subjectRandom: string) {
        super();
        this.email = new ButtonElement(page.locator(`div.listSubject[title="${subjectRandom}"]`))
    }

    async emailFind() {
        await this.email.waitForSelector(({timeout: 1000}))
        await this.email.click()
    }
}