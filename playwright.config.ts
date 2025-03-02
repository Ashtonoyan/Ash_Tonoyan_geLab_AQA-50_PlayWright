import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { devices } from '@playwright/test';


dotenv.config();

export default defineConfig({
    testDir: './tests',
    timeout: 40_1000,
    expect: {
        timeout: 10_1000
    },
    workers: 4,
    fullyParallel: true,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10_1000,
        trace: 'on',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        { name: 'setup', testMatch: /.*\.setup\.ts/ },

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: '.auth/user.json',
            },
            dependencies: ['setup'],
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                storageState: '.auth/user.json',
            },
        },

    ],
    retries: 2,
    reporter: [
        ['json', { outputFile: 'test-results/results.json' }],
        ['html', { open: 'never' }],
    ],

});
