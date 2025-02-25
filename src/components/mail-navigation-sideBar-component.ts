import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class NavigationSideBar extends BaseComponent {
    private inbox: ButtonElement;
    private trash: ButtonElement;

    constructor(page: Page) {
        super();
        this.inbox = new ButtonElement(page.locator('#treeInbox'), 'Inbox Mail Create Button')
        this.trash = new ButtonElement(page.locator('#doc_tree_trash').first(), 'Trash Button')
    }

    async moveToInbox(): Promise<void> {
        await this.inbox.click();
    }

    async moveToTrash(): Promise<void> {
        await this.trash.click();
    }
}