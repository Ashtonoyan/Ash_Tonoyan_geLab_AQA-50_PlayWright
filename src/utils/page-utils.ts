// utils/page-utils.ts
import { Page } from 'playwright';

let pageInstance: Page | null = null;

export const setPage = (page: Page) => {
    pageInstance = page;
};

export const getPage = (): Page => {
    if (!pageInstance) {
        throw new Error('Page instance is not set. Ensure the fixture is properly initialized.');
    }
    return pageInstance;
};
