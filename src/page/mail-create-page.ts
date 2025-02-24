import {Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {DashboardPage} from "./dashboard-page";
import {InputField} from "../ui-wrappers/input-field-element";
import {Frame} from "../ui-wrappers/frame-element";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {UploadFile} from "../ui-wrappers/upload-file-element";
import {CreateMailComponent} from "../components/mail-create-component";

export class MailCreate extends BasePage {
    private headermenu: DashboardPage
    private mailText: InputField;
    private mailSubject: InputField;
    private frameText: Frame
    private textFile: UploadFile
    private mailButton: CreateMailComponent


    constructor(page: Page) {
        super(page);
        this.headermenu = new DashboardPage(page);
        this.mailButton = new CreateMailComponent(page)
        this.mailText = new InputField(page.locator('input[tabindex="1"]'), 'Mail text field');
        this.mailSubject = new InputField(page.locator('#mailSubject'), 'Subject field')
        this.frameText = new Frame(page.frameLocator('iframe.editable'));
        this.textFile = new UploadFile(page.locator('input[type="file"]'), 'Field for file')


    }

    async createMail(mailtext: string, subject: string, file: string): Promise<void> {
        await this.headermenu.goToMail()
        await this.headermenu.createMail()
        await this.mailText.fill(mailtext)
        await this.mailSubject.fill(subject)
        await this.frameText.fill(this.frameText.findLocator('body.editable[role="textbox"]'), 'ashtonoyan@mailfence.com');
        await this.mailButton.documentButtonClicked()
        await this.mailButton.scroolViewClicked()
        await this.textFile.uploadFile(file)
        await new BasePage(this.page).waitForElement(this.page.locator('.GCSDBRWBJRB'))
        await this.mailButton.sendMail()

    }
}