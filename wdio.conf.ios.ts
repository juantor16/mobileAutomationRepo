import { config as baseConfig } from './wdio.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ===========================
    // iOS Local Configuration
    // ===========================
    // Requires: Appium + XCUITest driver + Mac with Xcode

    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 14',        // Change to your simulator/device name
        'appium:platformVersion': '16.0',         // Change to your iOS version
        'appium:automationName': 'XCUITest',
        'appium:app': `${process.cwd()}/data/SauceLabs-Demo-App.ipa`,
        'appium:autoAcceptAlerts': true,
        'appium:newCommandTimeout': 240,
    }],

    // Para listar simuladores disponibles:
    // xcrun simctl list devices
    // Para abrir un simulador específico:
    // xcrun simctl boot "iPhone 14"
};
