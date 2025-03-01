import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";

export class EmailPreviewArea extends BaseComponent {
    public static saveTypeButton = () => new ButtonElement(getPage().locator('a.GCSDBRWBJRB'));
    public static saveInDocument = () => new ButtonElement(getPage().locator('//body/div[5]/div/ul/li[3]/a/span'));


}