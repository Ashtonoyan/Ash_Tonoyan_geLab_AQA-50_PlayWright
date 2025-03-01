import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";

export class DocumentActionTopBar extends BaseComponent {
    public static refreshButton = () => new ButtonElement(getPage().locator('div.icon.icon16-Refresh'), 'Refresh Button');
    public static moveButton = () => new ButtonElement(getPage().locator('.icon.icon16-Move'))
}