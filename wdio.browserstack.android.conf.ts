import allure from '@wdio/allure-reporter';

const BROWSERSTACK_APP = process.env.BROWSERSTACK_APP_ID ?? 'bs://93ca8c156919fee6eecd2032e9aa4ec77b72ac12';

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: ['browserstack'],
    specs: ['./test/specs/**/*.ts'],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Google Pixel 7',
        'appium:platformVersion': '13.0',
        'appium:app': BROWSERSTACK_APP,
        'appium:noReset': true,
        'bstack:options': {
            projectName: 'Clase Android en BrowserStack',
            buildName: `Android-BS-${new Date().toISOString()}`,
            sessionName: 'Demo flujo Android',
            appiumVersion: '2.0.0',
        },
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 30000,
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
};
