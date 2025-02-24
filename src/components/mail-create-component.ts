import {Page} from "@playwright/test";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {BaseComponent} from "./base-components";

export class CreateMailComponent extends BaseComponent{
    private mailSend: ButtonElement
    private documentButton:  ButtonElement
    private scroolView: ButtonElement

    constructor(page: Page) {
        super();
        this.mailSend = new ButtonElement(page.locator('#mailSend'))
        this.documentButton = new ButtonElement(page.locator('a.GCSDBRWBISB.GCSDBRWBJSB').first())
        this.scroolView = new ButtonElement(page.locator('div.GCSDBRWBOQ.menu > div > ul > li:nth-child(1) > a'))
    }

    async sendMail() {
        await this.mailSend.click()
    }

    async documentButtonClicked() {
        await this.documentButton.click()
    }

    async scroolViewClicked() {
        await this.scroolView.scroolViewIfNeeded()
    }

}