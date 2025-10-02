import { SidebarPage } from '../pageObjects/sidebar.page';
import { LoginPage } from '../pageObjects/login.page';
import { ProductsPage } from '../pageObjects/products.page';

describe('Listado de productos con scroll', () => {
    let sidebarPage: SidebarPage;
    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    beforeEach(async () => {
        sidebarPage = new SidebarPage();
        loginPage = new LoginPage();
        productsPage = new ProductsPage();

        await sidebarPage.irALogin();
        await loginPage.completarLoginExitoso('bod@example.com', '10203040');
        await productsPage.verificarTituloDeProductos();
    });

    it('deberia contar los 24 productos llegando al footer', async () => {
        const visiblesIniciales = await productsPage.obtenerCantidadDeProductosVisibles();
        const listadoCompleto = await productsPage.obtenerListadoCompletoDeProductos();
        const totalProductos = listadoCompleto.length;
        const footerVisible = productsPage.footerVisibleEnUltimoRecorrido();

        expect(visiblesIniciales).toBeGreaterThan(0);
        expect(totalProductos).toBe(24);
        expect(footerVisible).toBe(true);
    });
});
