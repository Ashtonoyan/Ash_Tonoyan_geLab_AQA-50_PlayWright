import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();  // Load environment variables

export default defineConfig({
    testDir: './src',  // Directory where your tests are located
    timeout: 30 * 1000,  // Default timeout for each test
    reporter: 'html',  // Use HTML reporter for test results
    use: {
        headless: false,  // Run tests in headed mode (not headless)
        viewport: { width: 1280, height: 720 },  // Set the browser viewport size
        baseURL: process.env.MAILFENCE_LOGIN_URL!,  // Use the environment variable directly
        actionTimeout: 10 * 1000,  // Timeout for actions like click, fill, etc.
        trace: 'on',  // Keep trace on for debugging
        video: 'retain-on-failure',  // Record video only on failure
        screenshot: 'only-on-failure',  // Take screenshots only on failure
    },

});
