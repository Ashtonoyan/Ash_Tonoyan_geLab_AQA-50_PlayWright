import {test as base} from "playwright-bdd";
import {setPage} from "../utils/page-utils";
import {TestOptions} from "./page-fixture";

export const test = base.extend<TestOptions>({
    testHooks: [
        async ({page}, use) => {
            setPage(page);
            await use('');
        },
        {auto: true},
    ],


});