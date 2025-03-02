import {test as setup} from '../../src/core/fixtures/page-fixture';
import { expect } from '@playwright/test';
import path from 'path';
import {getPage} from "../../src/core/utils/page-utils";
import {LoginPage} from "../../src/page/login-page";
import {MessagesActionsTopBar} from "../../src/components/mail-messages-actions-top-bar-component";

const authFile = path.join(__dirname, '../../.auth/user.json');
console.log('Auth file path:', authFile);  // Выводим путь к файлу

setup('Authenticate', async () => {
    const page = getPage();
    await page.goto(process.env.MAILFENCE_LOGIN_URL!)
    await LoginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
    await MessagesActionsTopBar.newMail().toBeVisible();

    await page.context().storageState({ path: authFile });

})