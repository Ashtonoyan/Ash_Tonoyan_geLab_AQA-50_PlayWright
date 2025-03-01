import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";

export class DocumentSidebar extends BaseComponent {
    public static trashButton = () => new ButtonElement(getPage().locator('#doc_tree_trash').first(), 'Trash Button')

}