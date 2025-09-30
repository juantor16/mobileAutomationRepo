import { step } from '../utils/allureSteps';
import type { ChainablePromiseElement } from 'webdriverio';

export class BasePage {
    private readonly defaultTimeout = 10000;

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
