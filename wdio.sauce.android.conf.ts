import allure from '@wdio/allure-reporter';

const SAUCE_APP = process.env.SAUCE_STORAGE_APP ?? 'storage:app-android-demo.apk';

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us',
    services: ['sauce'],
    specs: ['./test/specs/**/*.ts'],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Google Pixel 7 GoogleAPI Emulator',
        'appium:platformVersion': '13.0',
        'appium:app': SAUCE_APP,
        'appium:noReset': true,
        'sauce:options': {
            build: `Android-Sauce-${new Date().toISOString()}`,
            appiumVersion: '2.0.0',
        },
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableMochaHooks: true,
            disableWebdriverStepsReporting: true,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    beforeSuite: async function(suite){
        const jobName = suite.title ?? 'Android Sauce BDD';
        await browser.execute('sauce:job-name=' + jobName);
    },

    afterTest:async function(_test,_context, {passed}){
        await browser.execute('sauce:job-result=' + (passed ? 'passed' : 'failed'));
    },
};
