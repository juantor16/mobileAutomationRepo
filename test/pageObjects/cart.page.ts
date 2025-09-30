import { step } from '../utils/allureSteps';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    //Selectores
    private get cartIcon() {return $('#cartTV')}
    private get cartBadge() {return $('#cartIV')}
    private get cartItemsList() {return $$('//android.widget.TextView[contains(@resource-id, "titleTV")]')}

    public async irAlCarrito(){
        await this.tap(this.cartBadge, 'Abrir carrito')
    }
    // Métodos
    public async verificarNumeroDeItemsEnElCarrito(numeroEsperado: number){
        await step('Verificar cantidad de items en el carrito', async () => {
            await this.cartIcon.waitForDisplayed({ timeout: 10000 })
            const cartAmount = await this.cartIcon.getText()
            expect(parseInt(cartAmount)).toBe(numeroEsperado)
        })
    }

    public async obtenerListaDeProductosEnElCarrito(): Promise<string[]> {
        return await step('Obtener listado de productos en el carrito', async () => {
            const items = await this.cartItemsList
            const nombres: string[] = []

            for(const item of items){
                nombres.push(await item.getText())
            }
            return nombres
        })
    }
        

    public async verificarProductoEnCarrito(nombreProducto: string){
        await step(`Verificar que el producto "${nombreProducto}" esté en el carrito`, async () => {
            const productos = await this.obtenerListaDeProductosEnElCarrito()
            expect(productos).toContain(nombreProducto)
        })
    }
    
}
