import {BasePage} from "./base-page";
import {DocumentDialog} from "../components/document-dialog-component";
import {DocumentSidebar} from "../components/document-navigation-sidebar-component";
import {DocumentNavigationHeader} from "../components/document-navigation-header-component";
import {DocumentActionTopBar} from "../components/document-action-topbar-component";
import {DocumentList} from "../components/document-list-component";


export class DocumentPage extends BasePage {

    static async moveToDocument() {
        await DocumentNavigationHeader.openDocumentsButton().click();
    }

    static async refreshDocumentLists() {
        await DocumentActionTopBar.refreshButton().click()
    }

    static async documentProcess(): Promise<void> {
        await DocumentList.documentChooseButton().click()
        await DocumentActionTopBar.moveButton().click()
        await DocumentDialog.trashFolderButton().click()
        await DocumentDialog.confirmMoveToFolder()
        await DocumentDialog.confirmButton().click()
        await DocumentSidebar.trashButton().click()
    }
}