import { step } from '../utils/allureSteps';
import type { ChainablePromiseElement } from 'webdriverio';

export class BasePage {
    private readonly defaultTimeout = 10000;

    protected async scrollVertical(direction: 'up' | 'down', percent: number = 0.85): Promise<boolean> {
        const { width, height } = await driver.getWindowSize();
        const gestureConfig = {
            left: 0,
            top: Math.floor(height * 0.2),
            width,
            height: Math.floor(height * 0.6),
            direction,
            percent,
        };

        const canScroll = await driver.execute('mobile: scrollGesture', gestureConfig);
        return Boolean(canScroll);
    }

    protected async tap(element: ChainablePromiseElement, description: string): Promise<void> {
        await step(description, async () => {
            await element.waitForDisplayed({ timeout: this.defaultTimeout });
            await element.click();
        });
    }

    protected async type(element: ChainablePromiseElement, value: string, description: string): Promise<void> {
        await step(description, async () => {
            await element.waitForDisplayed({ timeout: this.defaultTimeout });
            await element.setValue(value);
        });
    }

    protected async assertVisible(element: ChainablePromiseElement, description: string): Promise<void> {
        await step(description, async () => {
            await element.waitForDisplayed({ timeout: this.defaultTimeout });
            expect(await element.isDisplayed()).toBe(true);
        });
    }

    protected async readText(element: ChainablePromiseElement, description: string): Promise<string> {
        return await step(description, async () => {
            await element.waitForDisplayed({ timeout: this.defaultTimeout });
            return element.getText();
        });
    }
}
