import {Page, Locator} from "@playwright/test";
import {BasePage} from "./base-page";

export class DashboardPage extends BasePage {

    async goToMail() {
        await this.headerMenu.goToMail()
    }

    async goToDocument() {
        await this.headerMenu.goToDocument()
    }

    async createMail() {
        await this.mailMenu.gotoCreateMail()
    }

    async refresh() {
        await this.mailMenu.goToRefresh()
    }

    async inboxMail() {
        await this.mailMenu.goToInbox()
    }

    async trash() {
        await this.mailMenu.goToTrash()
    }
}