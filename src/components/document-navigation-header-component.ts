import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";

export class DocumentNavigationHeader extends BaseComponent {
    public static openDocumentsButton= ()=> new ButtonElement(getPage().locator('.icon24-Documents.toolImg'));

}