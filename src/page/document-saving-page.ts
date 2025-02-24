import {Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {DashboardPage} from "./dashboard-page";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {ModalComponent} from "../components/modal-component";
import {DocumentMailProcessComponent} from "../components/document-mail-process-component";

export class DocumentSaving extends BasePage {
    private navigate: DocumentMailProcessComponent;
    private modalButton: ModalComponent;

    constructor(page: Page) {
        super(page);
        this.navigate = new DocumentMailProcessComponent(page);
        this.modalButton = new ModalComponent(page);
    }

    async documentSaving(subjectRandom: string): Promise<void> {
        await this.navigate.goToInbox()
        await this.navigate.goToRefresh()

        let counter = 0;

        while (counter < 10) {
            try {
                await new BasePage(this.page).waitFor(this.page.locator(`div.listSubject[title="${subjectRandom}"]`), ({timeout: 1000}))
                //await new ButtonElement(this.page.locator(`div.listSubject[title="${subjectRandom}"]`)).
                //waitForSelector({ timeout: 1000 })
                const email = new ButtonElement(this.page.locator(`div.listSubject[title="${subjectRandom}"]`))
                await email.click()
                break;
            } catch (e) {
                counter++;
                console.log('Element not found, reloading page...');
                await this.navigate.goToRefresh()
            }

        }
        if (counter === 10) {
            throw new Error('Email not found after 10 attempts.');
        }
        //await new ButtonElement(this.page.locator('a.GCSDBRWBJRB')).click({button: 'right'});
        await this.navigate.chooseSaveOption()
        await this.navigate.chooseSaveInDocument()
        await this.navigate.chooseSaveInFolder()

        //There was no point in changing it, it was the third item from the list with the same names
        //await new ButtonElement(this.page.locator('//body/div[5]/div/ul/li[3]/a/span')).click();

        //const myDocumentFolder = new ButtonElement(this.page.locator('div[hidefocus="true"] div.treeItemLabel:not(#doc_tree_trash)'));
        //await myDocumentFolder.click();

        await this.modalButton.okButtonClick()

    }
}