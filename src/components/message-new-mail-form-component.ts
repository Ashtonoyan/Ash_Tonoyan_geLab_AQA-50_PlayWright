import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {Frame} from "../ui-wrappers/frame-element";
import {InputField} from "../ui-wrappers/input-field-element";
import {UploadFile} from "../ui-wrappers/upload-file-element";
import {getPage} from "../core/utils/page-utils";
import {test} from "playwright/test";

export class MessageNewMailForm extends BaseComponent {
    private static mailTo = () => new InputField(getPage().locator('input[tabindex="1"]'), 'Mail text field');
    private static subjectField = () => new InputField(getPage().locator('#mailSubject'), 'Subject field');
    private static frameField = () => new Frame(getPage().frameLocator('iframe.editable'));
    private static fileButton = () => new ButtonElement(getPage().locator('a.GCSDBRWBISB.GCSDBRWBJSB').first());
    private static fileField = () => new UploadFile(getPage().locator('input[type="file"]'), 'Field for file');
    private static scroolView = () => new ButtonElement(getPage().locator('div.GCSDBRWBOQ.menu > div > ul > li:nth-child(1) > a'));
    private static loadingWait = () => new ButtonElement(getPage().locator('.GCSDBRWBJRB'))
    public static sendButton = () => new ButtonElement(getPage().locator('#mailSend'));


    static async fillMessage(mailtext: string, subject: string, file: string) {
        await test.step('Sending message to mail text', async () => {
            await this.mailTo().fill(mailtext)
            await this.subjectField().fill(subject)
            await this.frameField().fill(this.frameField().findLocator('body.editable[role="textbox"]'), 'ashtonoyan@mailfence.com')
            await this.fileButton().click();
            await this.scroolView().scroolViewIfNeeded();
            await this.fileField().uploadFile(file)
            await this.loadingWait().waitForElement()

        });

    }

}
