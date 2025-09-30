import { BasePage } from './base.page';

export class ProductsPage extends BasePage {

    private get tituloDeProductos() { return $('#productTV') }
    public async verificarTituloDeProductos() {
        await this.assertVisible(this.tituloDeProductos, 'Verificar que se muestre el título de productos')
    }

    public async clickearPrimerProducto(){
        const primerProducto = $('(//android.widget.ImageView[@content-desc="Product Image"])[1]')
        if (!(await primerProducto.isExisting())) {
            throw new Error('No se encontraron productos disponibles para seleccionar')
        }
        await this.tap(primerProducto, 'Seleccionar el primer producto del listado')
    }
}
