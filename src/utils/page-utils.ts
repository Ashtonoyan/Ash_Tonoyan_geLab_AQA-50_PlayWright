import {Page} from '@playwright/test';

let pageInstance: Page;

export function setPage(page: Page) {
    pageInstance = page;
}

export function getPage(): Page {
    if (!pageInstance) {
        throw new Error('Page instance is not set. Make sure the fixture is being used.');
    }
    return pageInstance;
}
