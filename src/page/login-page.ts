import {Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {InputField} from "../ui-wrappers/input-field-element";
import {ButtonElement} from "../ui-wrappers/buttons-element";

export class LoginPage extends BasePage {
    private emailInput: InputField;
    private passwordInput: InputField;
    private loginButton: ButtonElement;

    constructor(page: Page) {
        super(page);
        this.emailInput = new InputField(page.locator('#UserID'), 'Email field')
        this.passwordInput = new InputField(page.locator('#Password'), 'Password field')
        this.loginButton = new ButtonElement(page.locator('input.btn[type="submit"]'))
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

}