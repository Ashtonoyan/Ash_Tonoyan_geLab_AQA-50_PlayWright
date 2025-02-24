import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './src',
    timeout: 30_1000,
    reporter: 'html',
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        //baseURL: process.env.MAILFENCE_LOGIN_URL!,
        actionTimeout: 10_1000,
        trace: 'on',
        video: 'off',
        screenshot: 'only-on-failure',
    },

});
