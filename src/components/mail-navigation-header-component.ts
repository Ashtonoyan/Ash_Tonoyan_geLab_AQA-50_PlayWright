import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";

export class NavigationHeader extends BaseComponent {
    public static messageIcon = () => new ButtonElement(getPage().locator('.icon24-Message.toolImg'));
}