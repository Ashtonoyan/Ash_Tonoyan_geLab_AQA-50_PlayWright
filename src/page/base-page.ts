import {Page, Locator} from "@playwright/test";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {MailMenuComponent} from "../components/mail-menu-component";
import {ModalComponent} from "../components/modal-component";
import {HeaderMenuComponent} from "../components/header-menu-component";

export class BasePage {
    protected page: Page;
    protected headerMenu: HeaderMenuComponent;
    protected mailMenu: MailMenuComponent;
    protected modal: ModalComponent;

    constructor(page: Page) {
        this.page = page;
        this.headerMenu = new HeaderMenuComponent(page);
        this.mailMenu = new MailMenuComponent(page);
        this.modal = new ModalComponent(page);
    }

    async waitFor(locator: Locator, options?: { timeout?: number }): Promise<void> {
        await new ButtonElement(locator).waitForSelector(options);

    }

    async waitForElement(locator: Locator): Promise<void> {
        const button = await new ButtonElement(locator);
        await button.waitForElement()
    }


}