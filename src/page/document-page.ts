import {BasePage} from "./base-page";
import {DocumentDialog} from "../components/document-dialog-component";
import {DocumentSidebar} from "../components/document-navigation-sidebar-component";
import {DocumentNavigationHeader} from "../components/document-navigation-header-component";
import {DocumentActionTopBar} from "../components/document-action-topbar-component";
import {DocumentList} from "../components/document-list-component";
import {test, expect} from "playwright/test";
import {getPage} from "../core/utils/page-utils";


export class DocumentsPage extends BasePage {

    static async moveToDocument() {
        await test.step('Move document page', async () => {
            await DocumentNavigationHeader.openDocumentsButton().click();
        })
    }

    static async refreshDocumentLists() {
        await test.step('Refresh document lists', async () => {
            await DocumentActionTopBar.refreshButton().click()
        })
    }

    static async documentProcess(): Promise<void> {
        await DocumentList.documentChooseButton().click()
        await DocumentActionTopBar.moveButton().click()
        await DocumentDialog.trashFolderButton().click()
        await DocumentDialog.confirmMoveToFolder()
        await DocumentDialog.confirmButton().click()
    }

    static async goToTrash(){
        await DocumentSidebar.trashButton().click()
    }

    static async waitDocument(fileName: string): Promise<void> {
        const locator = getPage().locator(`[title="${fileName}"]`);

        await expect(locator).toBeVisible();
    }
}