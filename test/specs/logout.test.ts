import {SidebarPage} from "../pageObjects/sidebar.page";
import {LoginPage} from "../pageObjects/login.page";
import {ProductsPage} from "../pageObjects/products.page";

describe('Tests de Logout', () => {
    let sidebarPage: SidebarPage
    let loginPage: LoginPage
    let productsPage: ProductsPage

    beforeEach(async () => {
        sidebarPage = new SidebarPage()
        loginPage = new LoginPage()
        productsPage = new ProductsPage()
        
        // Login antes de cada test de logout
        await sidebarPage.irALogin()
        await loginPage.completarLoginExitoso('bod@example.com', '10203040')
        await productsPage.verificarTituloDeProductos()
    })

    it('deberia permitir hacer logout exitosamente', async () => {
        // Verificar que está logueado
        await sidebarPage.verificarQueEstaLogueado()
        
        // Hacer logout
        await sidebarPage.hacerLogout()
        
        // Verificar que ya no está logueado
        await sidebarPage.verificarQueNoEstaLogueado()
    })

    it('deberia permitir cancelar el logout', async () => {
        // Abrir menu
        await sidebarPage.clickearBotonDeMenu()
        
        // Click en logout
        await sidebarPage.clickearBotonDeLogout()
        
        // Cancelar logout
        await sidebarPage.cancelarLogout()
        
        // Verificar que sigue logueado
        await sidebarPage.verificarQueEstaLogueado()
    })

    it('deberia redirigir a login después del logout', async () => {
        // Hacer logout
        await sidebarPage.hacerLogout()
        
        // Intentar ir a login nuevamente
        await sidebarPage.irALogin()
        
        // Verificar que está en la pantalla de login
        const loginButton = await $('~Tap to login with given credentials')
        await expect(loginButton).toBeDisplayed()
    })

    it('deberia limpiar el carrito después del logout', async () => {
        // Agregar producto al carrito primero
        await productsPage.clickearPrimerProducto()
        const addToCartButton = await $('#cartBt')
        await addToCartButton.click()
        
        // Verificar que hay items en el carrito
        const cartBadge = await $('#cartIV')
        const itemCount = await cartBadge.getText()
        expect(parseInt(itemCount)).toBeGreaterThan(0)
        
        // Hacer logout
        await browser.back() // Volver de la pantalla de producto
        await sidebarPage.hacerLogout()
        
        // Login nuevamente
        await sidebarPage.irALogin()
        await loginPage.completarLoginExitoso('bod@example.com', '10203040')
        
        // Verificar que el carrito está vacío
        const newCartBadge = await $('#cartIV')
        const newItemCount = await newCartBadge.getText()
        expect(parseInt(newItemCount || '0')).toBe(0)
    })

    it('deberia requerir login para acceder a funciones después del logout', async () => {
        // Hacer logout
        await sidebarPage.hacerLogout()
        
        // Intentar acceder a productos sin login
        await sidebarPage.clickearBotonDeMenu()
        
        // Verificar que solo muestra opción de login
        const loginMenuItem = await $('~Login Menu Item')
        await expect(loginMenuItem).toBeDisplayed()
        
        const logoutMenuItem = await $('~Logout Menu Item')
        await expect(logoutMenuItem).not.toBeDisplayed()
    })
})