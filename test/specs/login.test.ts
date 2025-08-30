import {SidebarPage} from "../pageObjects/sidebar.page";
import {LoginPage} from "../pageObjects/login.page";
import {ProductsPage} from "../pageObjects/products.page";
import {TestDataHelper} from "../helpers/testDataHelper";

describe('Tests de Login', () => {
    let sidebarPage: SidebarPage
    let loginPage: LoginPage
    let productsPage: ProductsPage
    const validUser = TestDataHelper.getUser('validUser')
    const invalidUser = TestDataHelper.getUser('invalidUser')

    beforeEach(async () => {
        sidebarPage = new SidebarPage()
        loginPage = new LoginPage()
        productsPage = new ProductsPage()
    })

    it('deberia permitirnos iniciar sesion con credenciales validas', async () => {
        await sidebarPage.irALogin()
        await loginPage.completarLoginExitoso(validUser.email, validUser.password)
        await productsPage.verificarTituloDeProductos()
    })

    it('deberia mostrar error con email invalido', async () => {
        await sidebarPage.irALogin()
        await loginPage.ingresarCredenciales('email_invalido@test.com', '10203040')
        await loginPage.hacerClickEnBotonLogin()
        
        // Verificar mensaje de error - ajustar selector segun la app
        const errorMessage = await $('~Provided credentials do not match any user in this service.')
        await expect(errorMessage).toBeDisplayed()
    })

    it('deberia mostrar error con password incorrecto', async () => {
        await sidebarPage.irALogin()
        await loginPage.ingresarCredenciales('bod@example.com', 'password_incorrecto')
        await loginPage.hacerClickEnBotonLogin()
        
        // Verificar mensaje de error
        const errorMessage = await $('~Provided credentials do not match any user in this service.')
        await expect(errorMessage).toBeDisplayed()
    })

    it('deberia mostrar error cuando el email esta vacio', async () => {
        await sidebarPage.irALogin()
        await loginPage.ingresarPassword('10203040')
        await loginPage.hacerClickEnBotonLogin()
        
        // Verificar que no navega a productos
        const loginButton = await $('~Tap to login with given credentials')
        await expect(loginButton).toBeDisplayed()
    })

    it('deberia mostrar error cuando el password esta vacio', async () => {
        await sidebarPage.irALogin()
        await loginPage.ingresarEmail('bod@example.com')
        await loginPage.hacerClickEnBotonLogin()
        
        // Verificar que no navega a productos
        const loginButton = await $('~Tap to login with given credentials')
        await expect(loginButton).toBeDisplayed()
    })
})