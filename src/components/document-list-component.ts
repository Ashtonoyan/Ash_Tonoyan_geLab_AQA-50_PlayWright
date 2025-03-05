import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";

export class DocumentList extends BaseComponent {
    public static documentChooseButton = (fileName: string) => new ButtonElement(getPage().locator(`[title="${fileName}"]`))
}