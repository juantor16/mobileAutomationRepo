import { step } from '../utils/allureSteps';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
    private get title() { return $('#productTV') }
    private get fotoDelProducto() { return $('~Displays selected product') }
    private get precioDelProducto() { return $('#priceTV') }
    private get contenedorRating() { return $('#rattingV') }
    private get listaDeEstrellas() { return $$("//android.widget.ImageView[contains(@resource-id, 'start')]") }
    private get listaDeColoresDisponibles() { return $('~Displays available colors of selected product') }
    private get botonDeMenos() { return $('#minusIV') }
    private get botonDeMas() { return $('#plusIV') }
    private get cantidad() { return $('#noTV') }
    private get botonAgregarAlCarrito() { return $('#cartBt') }

    public async verificarTituloDelProducto() {
        await this.assertVisible(this.title, 'Verificar título del producto')
    }

    public async verificarFotoDelProducto() {
        await this.assertVisible(this.fotoDelProducto, 'Verificar foto del producto')
    }

    public async verificarPrecioDelProducto() {
        await this.assertVisible(this.precioDelProducto, 'Verificar precio del producto')
    }

    public async verificarContenedorRating() {
        await this.assertVisible(this.contenedorRating, 'Verificar contenedor de rating')
    }

    public async verificarListaDeEstrellas() {
        await step('Verificar que se muestren cinco estrellas', async () => {
            const estrellas = await this.listaDeEstrellas
            expect(estrellas.length).toBe(5)
        })
    }

    public async verificarListaDeColoresDisponibles() {
        await this.assertVisible(this.listaDeColoresDisponibles, 'Verificar colores disponibles')
    }

    public async verificarBotonDeMenos() {
        await this.assertVisible(this.botonDeMenos, 'Verificar botón disminuir cantidad')
    }

    public async verificarBotonDeMas() {
        await this.assertVisible(this.botonDeMas, 'Verificar botón aumentar cantidad')
    }

    public async verificarCantidad() {
        await this.assertVisible(this.cantidad, 'Verificar campo de cantidad')
    }

    public async verificarBotonAgregarAlCarrito() {
        await this.assertVisible(this.botonAgregarAlCarrito, 'Verificar botón agregar al carrito')
    }

    public async verificarQueTodosLosElementosEstenPresentes() {
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

    public async aumentarCantidad() {
        await this.tap(this.botonDeMas, 'Incrementar cantidad')
    }

    public async disminuirCantidad() {
        await this.tap(this.botonDeMenos, 'Disminuir cantidad')
    }

    public async obtenerCantidad(): Promise<string> {
        return await this.readText(this.cantidad, 'Obtener cantidad seleccionada')
    }

    public async agregarAlCarrito() {
        await this.tap(this.botonAgregarAlCarrito, 'Agregar producto al carrito')
    }

    public async establecerCantidad(cantidadDeseada: number) {
        const cantidadActual = parseInt(await this.obtenerCantidad())

        if (cantidadActual < cantidadDeseada) {
            for (let i = cantidadActual; i < cantidadDeseada; i++) {
                await this.aumentarCantidad()
            }
        } else if (cantidadActual > cantidadDeseada) {
            for (let i = cantidadActual; i > cantidadDeseada; i--) {
                await this.disminuirCantidad()
            }
        }
    }

    public async obtenerNombreDelProducto(): Promise<string> {
        return await this.readText(this.title, 'Obtener nombre del producto')
    }

}
