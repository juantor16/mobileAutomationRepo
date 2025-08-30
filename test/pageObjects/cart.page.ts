export class CartPage {
    // Selectores
    private get cartIcon() { return $('~Displays number of items in your cart') }
    private get cartBadge() { return $('#cartIV') }
    private get cartItemsList() { return $$('//android.widget.TextView[@resource-id="titleTV"]') }
    private get totalPrice() { return $('#totalPriceTV') }
    private get checkoutButton() { return $('~Confirms products for checkout') }
    private get emptyCartMessage() { return $('~No items in your cart') }
    
    // Métodos de verificación
    public async verificarNumeroDeItemsEnCarrito(numeroEsperado: number) {
        const badge = await this.cartBadge.getText()
        expect(parseInt(badge)).toBe(numeroEsperado)
    }

    public async irAlCarrito() {
        await this.cartIcon.click()
    }

    public async obtenerListaDeProductosEnCarrito(): Promise<string[]> {
        const items = await this.cartItemsList
        const nombres: string[] = []
        
        for (const item of items) {
            nombres.push(await item.getText())
        }
        
        return nombres
    }

    public async verificarProductoEnCarrito(nombreProducto: string) {
        const productos = await this.obtenerListaDeProductosEnCarrito()
        expect(productos).toContain(nombreProducto)
    }

    public async verificarPrecioTotal() {
        await expect(this.totalPrice).toBeDisplayed()
    }

    public async obtenerPrecioTotal(): Promise<string> {
        return await this.totalPrice.getText()
    }

    public async procederAlCheckout() {
        await this.checkoutButton.click()
    }

    public async verificarCarritoVacio() {
        await expect(this.emptyCartMessage).toBeDisplayed()
    }

    public async eliminarProductoDelCarrito(nombreProducto: string) {
        // Buscar el botón de eliminar para el producto específico
        const deleteButton = await $(`//android.widget.TextView[@text="${nombreProducto}"]/following-sibling::android.widget.ImageView[@resource-id="deleteIV"]`)
        await deleteButton.click()
    }

    public async vaciarCarrito() {
        const items = await this.cartItemsList
        
        for (const item of items) {
            const deleteButton = await item.$('..//android.widget.ImageView[@resource-id="deleteIV"]')
            await deleteButton.click()
        }
    }
}