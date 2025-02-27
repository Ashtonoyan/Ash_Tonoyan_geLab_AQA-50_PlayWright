import {Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {DocumentDialog} from "../components/document-dialog-component";
import {DocumentSidebar} from "../components/document-navigation-sidebar-component";
import {DocumentNavigationHeader} from "../components/document-navigation-header-component";
import {DocumentActionTopBar} from "../components/document-action-topbar-component";
import {DocumentList} from "../components/document-list-component";

export class DocumentPage extends BasePage {
    private documentNavigationHeader: DocumentNavigationHeader;
    private documentList: DocumentList;
    private documentAction: DocumentActionTopBar
    private documentDialog: DocumentDialog
    private documentSidebar: DocumentSidebar

    constructor(page: Page) {
        super(page);
        this.documentNavigationHeader = new DocumentNavigationHeader(page);
        this.documentList = new DocumentList(page)
        this.documentAction = new DocumentActionTopBar(page);
        this.documentDialog = new DocumentDialog(page);
        this.documentSidebar = new DocumentSidebar(page);
    }

    async moveToDocument() {
        await this.documentNavigationHeader.openDocumentsButton.click()
    }

    async refreshDocumentLists() {
        await this.documentAction.refreshButton.click()

    }

    async documentProcess(): Promise<void> {
        await this.documentList.documentChooseButton.click()
        await this.documentAction.moveButton.click()
        await this.documentDialog.trashFolderButton.click()
        await this.documentDialog.confirmMoveToFolder()
        await this.documentDialog.confirmButton.click()
        await this.documentSidebar.trashButton.click()
    }
}