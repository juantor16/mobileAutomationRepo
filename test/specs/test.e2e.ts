import {SidebarPage} from "../pageObjects/sidebar.page";
import {LoginPage} from "../pageObjects/login.page";
import {ProductsPage} from "../pageObjects/products.page";
import {ProductPage} from "../pageObjects/product.page";

let sidebarPage: SidebarPage
let loginPage: LoginPage
let productsPage: ProductsPage
let productPage: ProductPage

describe('Test de smoke basico', () => {
    it('deberia permitirnos iniciar sesion', async () => {
        sidebarPage = new SidebarPage()
        loginPage = new LoginPage()
        productsPage = new ProductsPage()
        await sidebarPage.irALogin()
        await loginPage.completarLoginExitoso('bod@example.com', '10203040')
        await productsPage.verificarTituloDeProductos()
    })

    it('Deberia poder ver un producto en detalle', async () => {
        productsPage = new ProductsPage()
        await productsPage.clickearPrimerProducto()
        productPage = new ProductPage()
        await productPage.verificarQueTodosLosElementosEstenPresentes()
    })
})
