import allure from '@wdio/allure-reporter';

export async function step<T>(title: string, action: () => Promise<T>): Promise<T> {
    allure.startStep(title);
    try {
        const result = await action();
        allure.endStep('passed');
        return result;
    } catch (error) {
        allure.endStep('failed');
        throw error;
    }
}
