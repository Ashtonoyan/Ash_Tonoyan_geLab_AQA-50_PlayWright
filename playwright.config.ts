import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { devices } from '@playwright/test';


dotenv.config();

export default defineConfig({
    testDir: './tests',
    timeout: 30_1000,
    reporter: 'html',
    workers: process.env.CI ? 1 : 4,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        //baseURL: process.env.MAILFENCE_LOGIN_URL!,
        actionTimeout: 10_1000,
        trace: 'on',
        video: 'off',
        screenshot: 'only-on-failure',
    },
    projects: [
        { name: 'setup', testMatch: /.*\.setup\.ts/ },

        {
            name: 'default',
            use: {
                storageState: '.auth/user.json',
            },
            dependencies: ['setup'],
        },

    ]

});
