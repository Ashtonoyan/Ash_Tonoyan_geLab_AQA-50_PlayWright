import {Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {DocumentDialog} from "../components/document-dialog-component";
import {DocumentSidebar} from "../components/document-navigation-sidebar-component";
import {DocumentNavigationHeader} from "../components/document-navigation-header-component";
import {DocumentActionTopBar} from "../components/document-action-topbar-component";
import {DocumentList} from "../components/document-list-component";

export class DocumentProcessing extends BasePage {
    private documentFolderButton: DocumentNavigationHeader;
    private documentChooseButton: DocumentList;
    private documentAction1: DocumentActionTopBar
    private documentDialog: DocumentDialog
    private trashFolder: DocumentSidebar

    constructor(page: Page) {
        super(page);
        this.documentFolderButton = new DocumentNavigationHeader(page);
        this.documentChooseButton = new DocumentList(page)
        this.documentAction1 = new DocumentActionTopBar(page);
        this.documentDialog = new DocumentDialog(page);
        this.trashFolder = new DocumentSidebar(page);
    }

    async documentProcess(): Promise<void> {
        await this.documentFolderButton.moveToDocumentFolder()
        await this.documentAction1.refresh()

        await this.documentChooseButton.chooseDocument()
        await this.documentAction1.documentMove()
        await this.documentDialog.clicktrashFolder()
        await this.documentDialog.moveDocument()
        await this.documentDialog.clickConfirm()
        await this.trashFolder.moveToTrash()
        await new ButtonElement(this.page.locator('div.GCSDBRWBOBC')).toBeVisible()
    }
}