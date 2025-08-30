import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class TestDataHelper {
    private static testData: any;

    static loadTestData() {
        if (!this.testData) {
            const dataPath = path.join(__dirname, '../fixtures/testData.json');
            const rawData = fs.readFileSync(dataPath, 'utf-8');
            this.testData = JSON.parse(rawData);
        }
        return this.testData;
    }

    static getUser(userType: string) {
        const data = this.loadTestData();
        return data.users[userType];
    }

    static getProduct(productName: string) {
        const data = this.loadTestData();
        return data.products[productName];
    }

    static getErrorMessage(errorType: string) {
        const data = this.loadTestData();
        return data.messages.errors[errorType];
    }

    static getSuccessMessage(messageType: string) {
        const data = this.loadTestData();
        return data.messages.success[messageType];
    }

    static getCheckoutInfo(infoType: string) {
        const data = this.loadTestData();
        return data.checkout[infoType];
    }

    static getTestOrder(orderType: string) {
        const data = this.loadTestData();
        return data.testOrders[orderType];
    }

    // Método para obtener credenciales del .env
    static getEnvCredentials() {
        return {
            email: process.env.TEST_USER_EMAIL || 'bod@example.com',
            password: process.env.TEST_USER_PASSWORD || '10203040',
            invalidEmail: process.env.INVALID_USER_EMAIL || 'invalid@test.com',
            invalidPassword: process.env.INVALID_PASSWORD || 'wrongpassword'
        };
    }
}