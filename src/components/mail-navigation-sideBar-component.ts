import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class NavigationSideBar extends BaseComponent {
    public inbox: ButtonElement;

    constructor(page: Page) {
        super();
        this.inbox = new ButtonElement(page.locator('#treeInbox'), 'Inbox Mail Create Button')
    }

}