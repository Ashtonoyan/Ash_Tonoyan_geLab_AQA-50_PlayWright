import {test as setup} from '../../src/core/fixtures/page-fixture';
import path from 'path';
import {getPage} from "../../src/core/utils/page-utils";
import {LoginPage} from "../../src/page/login-page";

const authFile = path.join(__dirname, '../../playwright/.auth/user.json' as string);

setup('Authenticate', async () => {
    const page = getPage();
    await page.goto(process.env.MAILFENCE_LOGIN_URL!)
    await LoginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)

    await page.context().storageState({ path: authFile });

})