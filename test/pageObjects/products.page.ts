import { step } from '../utils/allureSteps';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {

    private footerVisibleEnUltimoRecorridoFlag = false;

    private get tituloDeProductos() { return $('#productTV') }
    private get listaDeProductos() { return $$('//android.widget.TextView[contains(@resource-id, "titleTV")]') }
    private get footerDeProductos() { return $('#socialLL') }

    private async footerVisibleEnPantalla(): Promise<boolean> {
        const footer = this.footerDeProductos;
        if (!(await footer.isExisting())) {
            return false;
        }
        return footer.isDisplayed();
    }

    private async recolectarProductosVisibles(destino: Set<string>, contexto: string): Promise<void> {
        const productos = await this.listaDeProductos;
        for (const producto of productos) {
            const nombre = (await producto.getText()).trim();
            if (nombre.length > 0) {
                destino.add(nombre);
            }
        }
        console.log(`[ProductsPage] ${contexto}:`, Array.from(destino));
    }

    private async irAlComienzoDeLaLista(): Promise<void> {
        let puedeSeguir = true;
        let intentos = 0;

        while (puedeSeguir && intentos < 10) {
            puedeSeguir = await this.scrollVertical('up');
            if (puedeSeguir) {
                await driver.pause(300);
            }
            intentos++;
        }
    }

    public async verificarTituloDeProductos() {
        await this.assertVisible(this.tituloDeProductos, 'Verificar que se muestre el título de productos')
    }

    public async obtenerCantidadDeProductosVisibles(): Promise<number> {
        return await step('Obtener cantidad de productos visibles', async () => {
            const productos = await this.listaDeProductos;
            let visibles = 0;

            for (const producto of productos) {
                if (await producto.isDisplayed()) {
                    visibles++;
                }
            }

            return visibles;
        });
    }

    public async obtenerListadoCompletoDeProductos(): Promise<string[]> {
        return await step('Obtener listado completo de productos', async () => {
            await this.irAlComienzoDeLaLista();
            const nombres = new Set<string>();
            let footerVisible = false;

            this.footerVisibleEnUltimoRecorridoFlag = false;

            await this.recolectarProductosVisibles(nombres, 'Visibles iniciales');

            while (true) {
                footerVisible = await this.footerVisibleEnPantalla();
                if (footerVisible) {
                    break;
                }

                const pudoSeguir = await this.scrollVertical('down');
                await driver.pause(500);
                await this.recolectarProductosVisibles(nombres, pudoSeguir ? 'Tras scroll' : 'Intento final');

                if (!pudoSeguir) {
                    footerVisible = await this.footerVisibleEnPantalla();
                    break;
                }
            }

            this.footerVisibleEnUltimoRecorridoFlag = await this.footerVisibleEnPantalla();
            const listadoFinal = Array.from(nombres);
            console.log('[ProductsPage] Listado final de productos:', listadoFinal);
            await this.irAlComienzoDeLaLista();
            return listadoFinal;
        });
    }

    public async clickearPrimerProducto(){
        const primerProducto = $('(//android.widget.ImageView[@content-desc="Product Image"])[1]')
        if (!(await primerProducto.isExisting())) {
            throw new Error('No se encontraron productos disponibles para seleccionar')
        }
        await this.tap(primerProducto, 'Seleccionar el primer producto del listado')
    }

    public async obtenerCantidadTotalDeProductos(): Promise<number> {
        return await step('Obtener cantidad total de productos', async () => {
            const productos = await this.obtenerListadoCompletoDeProductos();
            return productos.length;
        });
    }

    public footerVisibleEnUltimoRecorrido(): boolean {
        return this.footerVisibleEnUltimoRecorridoFlag;
    }
}
