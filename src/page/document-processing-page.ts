import {Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {DashboardPage} from "./dashboard-page";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {ModalComponent} from "../components/modal-component";

export class DocumentProcessing extends BasePage {
    private navigate: DashboardPage;
    private modalButton: ModalComponent;

    constructor(page: Page) {
        super(page);
        this.navigate = new DashboardPage(page);
        this.modalButton = new ModalComponent(page);
    }

    async documentProcess(): Promise<void> {
        await this.navigate.goToDocument()
        await new ButtonElement(this.page.locator('.GCSDBRWBPJB')).first().click();
        await this.navigate.refresh();
        await new ButtonElement(this.page.locator('.icon.icon16-Move')).click()
        await new ButtonElement(this.page.locator('div[hidefocus="true"] div#doc_tree_trash:not(#treeItemLabel)')).scroolViewIfNeeded()
        await this.modalButton.trashButtonClick()
        await this.modalButton.okButtonClick()
        await this.modalButton.confirmButtonClick()

        await new ButtonElement(this.page.locator('#doc_tree_trash')).first().click();
        await new ButtonElement(this.page.locator('div.GCSDBRWBOBC')).toBeVisible()


    }
}