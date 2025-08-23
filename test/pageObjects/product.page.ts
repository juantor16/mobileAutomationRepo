export class ProductPage{
    private get title(){ return $('#productTV')}
    private get fotoDelProducto(){ return $('~Displays selected product')}
    private get precioDelProducto(){ return $('#priceTV')}
    private get contenedorRating(){ return $('#rattingV')}
    private get listaDeEstrellas(){ return $$("//android.widget.ImageView[contains(@resource-id, 'start')]")}
    private get listaDeColoresDisponibles(){ return $('~Displays available colors of selected product')}
    private get botonDeMenos(){ return $('#minusIV')}
    private get botonDeMas(){ return $('#plusIV')}
    private get cantidad(){ return $('#noTV')}
    private get botonAgregarAlCarrito(){ return $('#cartBt')}
    
    public async verificarTituloDelProducto(){
        expect(await this.title.isDisplayed()).toBe(true)
    }

    public async verificarFotoDelProducto(){
        expect(await this.fotoDelProducto.isDisplayed()).toBe(true)
    }

    public async verificarPrecioDelProducto(){
        expect(await this.precioDelProducto.isDisplayed()).toBe(true)
    }

    public async verificarContenedorRating(){
        expect(await this.contenedorRating.isDisplayed()).toBe(true)
    }

    public async verificarListaDeEstrellas(){
        expect(await this.listaDeEstrellas.length).toBe(5)
    }

    public async verificarListaDeColoresDisponibles(){
        expect(await this.listaDeColoresDisponibles.isDisplayed()).toBe(true)
    }

    public async verificarBotonDeMenos(){
        expect(await this.botonDeMenos.isDisplayed()).toBe(true)
    }

    public async verificarBotonDeMas(){
        expect(await this.botonDeMas.isDisplayed()).toBe(true)
    }

    public async verificarCantidad(){
        expect(await this.cantidad.isDisplayed()).toBe(true)
    }

    public async verificarBotonAgregarAlCarrito(){
        expect(await this.botonAgregarAlCarrito.isDisplayed()).toBe(true)
    }

    public async verificarQueTodosLosElementosEstenPresentes(){
        await this.verificarTituloDelProducto()
        await this.verificarFotoDelProducto()
        await this.verificarPrecioDelProducto()
        await this.verificarContenedorRating()
        await this.verificarListaDeEstrellas()
        await this.verificarListaDeColoresDisponibles()
        await this.verificarBotonDeMenos()
        await this.verificarBotonDeMas()
        await this.verificarCantidad()
        await this.verificarBotonAgregarAlCarrito()
    }
}
