import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../utils/page-utils";

export class DocumentList extends BaseComponent {
    public static documentChooseButton = () => new ButtonElement(getPage().locator('.GCSDBRWBPJB').first());

}