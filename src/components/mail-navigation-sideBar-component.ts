import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";

export class NavigationSideBar extends BaseComponent {
    public static inbox = () => new ButtonElement(getPage().locator('#treeInbox'), 'Inbox Mail Create Button');

}