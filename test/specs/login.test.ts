import { SidebarPage } from "../pageObjects/sidebar.page";
import { LoginPage } from "../pageObjects/login.page";
import { ProductsPage } from "../pageObjects/products.page";

describe('Test de login', () => {
    let sidebarPage: SidebarPage
    let loginPage: LoginPage
    let productsPage: ProductsPage

    beforeEach(async () => {
        sidebarPage = new SidebarPage()
        loginPage = new LoginPage()
        productsPage = new ProductsPage()
    })

    it('deberia permitirnos iniciar sesion con credenciales validas', async () => {
        await sidebarPage.irALogin()
        await loginPage.completarLoginExitoso('bod@example.com', '10203040')
        await productsPage.verificarTituloDeProductos()
        await sidebarPage.desloguear()
    })

    it('deberia mostrar un mensaje de error cuando no ingresamos contraseña', async () => {
        await sidebarPage.irALogin()
        await loginPage.ingresarEmail('email_invalido@example.com')
        await loginPage.hacerClickEnBotonLogin()

        //verificamos el mensaje de error
         expect( await loginPage.mensajeDeErrorDePassword).toBeDisplayed()
    })
})