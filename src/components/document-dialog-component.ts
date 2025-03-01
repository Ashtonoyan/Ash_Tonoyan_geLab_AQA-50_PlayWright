import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";
import {test} from "playwright/test";

export class DocumentDialog extends BaseComponent {
    public static documentFolderSelectButton = () => new ButtonElement(getPage().locator('div[hidefocus="true"] div.treeItemLabel:not(#doc_tree_trash)'));
    public static trashFolderButton = () => new ButtonElement(getPage().locator('div[hidefocus="true"] div#doc_tree_trash:not(#treeItemLabel)'));
    public static confirmButton = () => new ButtonElement(getPage().locator('#dialBtn_YES'));
    private static moveToFolder = () => new ButtonElement(getPage().locator('#dialBtn_OK'), 'buttonOk');


    static async confirmMoveToFolder(): Promise<void> {
        await test.step("Confirm move to folder", async () => {
            await this.moveToFolder().toAttached()
            await this.moveToFolder().toHaveCSS()
            await this.moveToFolder().click();
        })

    }
}