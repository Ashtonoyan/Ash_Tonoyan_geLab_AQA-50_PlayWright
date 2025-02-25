import {Page} from "@playwright/test";
import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {Frame} from "../ui-wrappers/frame-element";
import {InputField} from "../ui-wrappers/input-field-element";
import {UploadFile} from "../ui-wrappers/upload-file-element";

export class MessageNewMailForm extends BaseComponent {
    private mailTo: InputField;
    private subjectField: InputField;
    private frameField: Frame
    private fileButton: ButtonElement;
    private fileField: UploadFile;
    private sendButton: ButtonElement;
    private scroolView: ButtonElement;
    private loadingWait: ButtonElement

    constructor(page: Page) {
        super();
        this.mailTo = new InputField(page.locator('input[tabindex="1"]'), 'Mail text field')
        this.subjectField = new InputField(page.locator('#mailSubject'), 'Subject field');
        this.frameField = new Frame(page.frameLocator('iframe.editable'));
        this.fileField = new UploadFile(page.locator('input[type="file"]'), 'Field for file')
        this.fileButton = new ButtonElement(page.locator('a.GCSDBRWBISB.GCSDBRWBJSB').first())
        this.scroolView = new ButtonElement(page.locator('div.GCSDBRWBOQ.menu > div > ul > li:nth-child(1) > a'))
        this.sendButton = new ButtonElement(page.locator('#mailSend'))
        this.loadingWait = new ButtonElement(page.locator('.GCSDBRWBJRB'))

    }

    async createMessage(mailtext: string, subject: string, file: string) {
        await this.mailTo.fill(mailtext)
        await this.subjectField.fill(subject)
        await this.frameField.fill(this.frameField.findLocator('body.editable[role="textbox"]'), 'ashtonoyan@mailfence.com')
        await this.fileButton.click();
        await this.scroolView.scroolViewIfNeeded();
        await this.fileField.uploadFile(file)
        await this.loadingWait.waitForElement()
        await this.sendButton.click()

    }
}
