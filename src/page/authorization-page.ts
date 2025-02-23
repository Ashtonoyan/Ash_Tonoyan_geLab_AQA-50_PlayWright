import {Page, Locator} from "@playwright/test";
import {BasePage} from "./base-page";
import {LoginForm} from "../components/login-form-component";

export class AuthorizaionPage extends BasePage {
    private loginForm: LoginForm;

    constructor(page: Page) {
        super(page);
        this.loginForm = new LoginForm(page);
    }

    async login(email: string, password: string): Promise<void> {
        await this.loginForm.login(email, password)
    }

}