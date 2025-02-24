// fixtures/page-fixture.ts
import { test as base, Page, Browser, BrowserContext } from '@playwright/test';
import { setPage } from '../utils/page-utils';

const test = base.extend<{
    page: Page;
}>({
    page: async ({ browser }, use) => {
        const context: BrowserContext = await browser.newContext();
        const page: Page = await context.newPage();

        // Set the page instance before the test starts
        setPage(page);

        await use(page);  // Provide the page to the test

        // Clean up after the test
        await page.close();
    }
});

export { test };
