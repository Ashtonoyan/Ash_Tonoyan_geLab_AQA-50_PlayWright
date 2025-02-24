import {Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {DashboardPage} from "./dashboard-page";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {ModalComponent} from "../components/modal-component";
import {DocumentRemoveComponent} from "../components/document-remove-component";

export class DocumentProcessing extends BasePage {
    private modalButton: ModalComponent;
    private documentAction: DocumentRemoveComponent;

    constructor(page: Page) {
        super(page);
        this.modalButton = new ModalComponent(page);
        this.documentAction = new DocumentRemoveComponent(page);
    }

    async documentProcess(): Promise<void> {
        await this.documentAction.clickDocumentFolder()

        await this.documentAction.refreshAction()
        await this.documentAction.chooseDocument()
        await this.documentAction.moveToTrash()
        await this.modalButton.trashButtonClick()
        await this.modalButton.okButtonClick()
        await this.modalButton.confirmButtonClick()

        await this.documentAction.goToTrash()
        await new ButtonElement(this.page.locator('div.GCSDBRWBOBC')).toBeVisible()


    }
}