import {test as base} from '@playwright/test';
import {setPage} from '../utils/page-utils';

export type TestOptions = {
    testHooks: string;
};


export const test = base.extend<TestOptions>({
    testHooks: [
        async ({page}, use) => {
            setPage(page);
            await use('');
        },
        {auto: true},
    ],


});
