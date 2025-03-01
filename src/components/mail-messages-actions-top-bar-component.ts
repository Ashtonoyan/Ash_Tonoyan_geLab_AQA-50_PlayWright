import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../utils/page-utils";

export class MessagesActionsTopBar extends BaseComponent {
    public static newMail = () => new ButtonElement(getPage().locator('#mailNewBtn'), 'Mail Create Button')
    public static refreshButton = () => new ButtonElement(getPage().locator('div.icon.icon16-Refresh'), 'Refresh Button')

}