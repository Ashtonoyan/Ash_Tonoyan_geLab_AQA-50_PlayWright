import {test as base} from '@playwright/test';
import {setPage} from '../utils/page-utils';
import path from 'path';
import {faker} from '@faker-js/faker'

export type TestOptions = {
    testHooks: string;
};
export type Ctx = {
    subjectRandom: string;
    filePath: string;
    fileName: string;
};

export const test = base.extend<TestOptions & Ctx>({
    testHooks: [
        async ({page}, use) => {
            setPage(page);
            await use('');
        },
        {auto: true},
    ],
    subjectRandom: [
        async ({}, use) => {
            const subjectRandom = 'AT_C2256_' + faker.string.alphanumeric(10).toUpperCase();
            await use(subjectRandom);
        },
        {scope: 'test'},
    ],
    filePath: [
        async ({}, use) => {
            const filePath = path.resolve(__dirname, '..', '..', process.env.TEST_FILE_PATH as string);
            await use(filePath);
        },
        {scope: 'test'},
    ],
    fileName: [
        async ({}, use) => {
            const fileName = process.env.FILE_NAME!;
            await use(fileName);
        },
        {scope: 'test'}
    ],
});
