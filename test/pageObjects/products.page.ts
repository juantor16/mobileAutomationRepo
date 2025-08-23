export class ProductsPage {

    private get tituloDeProductos() { return $('#productTV') }
    private getListaDeProductos(){ return $$('(//android.widget.ImageView[@content-desc="Product Image"])')}

    public async verificarTituloDeProductos() {
        expect(await this.tituloDeProductos.isDisplayed()).toBe(true)
    }

    public async clickearPrimerProducto(){
        await this.getListaDeProductos()[0].click()
    }
}
