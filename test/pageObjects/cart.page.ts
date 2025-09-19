
export class CartPage{
    //Selectores
    private get cartIcon() {return $('#cartTV')}
    private get cartBadge() {return $('#cartIV')}
    private get cartItemsList() {return $$('//android.widget.TextView[contains(@resource-id, "titleTV")]')}

    public async irAlCarrito(){
        await this.cartBadge.click()
    }
    // Métodos
    public async verificarNumeroDeItemsEnElCarrito(numeroEsperado: number){
        const cartAmount = await this.cartIcon.getText()
        expect(parseInt(cartAmount)).toBe(numeroEsperado)
    }

    public async obtenerListaDeProductosEnElCarrito(): Promise<string[]> {
        const items = await this.cartItemsList
        const nombres: string[] = []

        for(const item of items){
            nombres.push(await item.getText())
        }
        return nombres
    }
        

    public async verificarProductoEnCarrito(nombreProducto: string){
        const productos = await this.obtenerListaDeProductosEnElCarrito()
        expect(productos).toContain(nombreProducto)
    }
    
}