import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class DocumentSidebar extends BaseComponent {
    public trashButton: ButtonElement

    constructor(page: Page) {
        super();
        this.trashButton = new ButtonElement(page.locator('#doc_tree_trash').first(), 'Trash Button');
    }

}