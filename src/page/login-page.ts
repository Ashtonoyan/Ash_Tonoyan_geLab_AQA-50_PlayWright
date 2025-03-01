import {BasePage} from "./base-page";
import {InputField} from "../ui-wrappers/input-field-element";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";
import {test} from "playwright/test";

export class LoginPage extends BasePage {
    private static emailInput = () => new InputField(getPage().locator('#UserID'), 'Email field')
    private static passwordInput = () => new InputField(getPage().locator('#Password'), 'Password')
    private static loginButton = () => new ButtonElement(getPage().locator('input.btn[type="submit"]'))


    static async login(email: string, password: string): Promise<void> {
        await test.step(`Login as user ${email}`, async () => {
            await this.emailInput().fill(email)
            await this.passwordInput().fill(password)
            await this.loginButton().click()
        })


    }

}