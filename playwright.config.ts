import {defineConfig} from '@playwright/test';
import * as dotenv from 'dotenv';
import {devices} from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';


dotenv.config();

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    expect: {
        timeout: 15_000
    },
    workers: 4,
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: [
        ['list'],
        ['./src/core/custom-reporter.ts'],
        ['allure-playwright'],
    ],
    use: {
        headless: false,
        viewport: {width: 1280, height: 720},
        actionTimeout: 10_000,
        trace: 'on',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {name: 'setup', testMatch: /.*\.setup\.ts/},

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: '.auth/user.json',
            },
            dependencies: ['setup'],

        },
/*
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                storageState: '.auth/user.json',
            },
        },

 */
        {
            name: 'bdd',
            use: {
                browserName: 'chromium',
                storageState: '.auth/user.json',
            },
            testDir: defineBddConfig({
                features: './tests/features/*.feature',
                steps: './tests/step-definitions/*.ts',
                importTestFrom: "./src/core/fixtures/bdd-fixture.ts",
            }),
            dependencies: ['setup'],
        },


    ],




});
