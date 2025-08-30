import {SidebarPage} from "../pageObjects/sidebar.page";
import {LoginPage} from "../pageObjects/login.page";
import {ProductsPage} from "../pageObjects/products.page";
import {ProductPage} from "../pageObjects/product.page";
import {CartPage} from "../pageObjects/cart.page";

describe('Tests del Carrito de Compras', () => {
    let sidebarPage: SidebarPage
    let loginPage: LoginPage
    let productsPage: ProductsPage
    let productPage: ProductPage
    let cartPage: CartPage

    beforeEach(async () => {
        sidebarPage = new SidebarPage()
        loginPage = new LoginPage()
        productsPage = new ProductsPage()
        productPage = new ProductPage()
        cartPage = new CartPage()
        
        // Login antes de cada test
        await sidebarPage.irALogin()
        await loginPage.completarLoginExitoso('bod@example.com', '10203040')
    })

    it('deberia agregar un producto al carrito', async () => {
        // Seleccionar primer producto
        await productsPage.clickearPrimerProducto()
        
        // Obtener nombre del producto para verificar después
        const nombreProducto = await productPage.obtenerNombreDelProducto()
        
        // Agregar al carrito
        await productPage.agregarAlCarrito()
        
        // Ir al carrito
        await cartPage.irAlCarrito()
        
        // Verificar que el producto está en el carrito
        await cartPage.verificarProductoEnCarrito(nombreProducto)
        await cartPage.verificarNumeroDeItemsEnCarrito(1)
    })

    it('deberia agregar múltiples unidades del mismo producto', async () => {
        // Seleccionar primer producto
        await productsPage.clickearPrimerProducto()
        
        // Establecer cantidad a 3
        await productPage.establecerCantidad(3)
        
        // Verificar que la cantidad es correcta
        const cantidad = await productPage.obtenerCantidadActual()
        expect(parseInt(cantidad)).toBe(3)
        
        // Agregar al carrito
        await productPage.agregarAlCarrito()
        
        // Verificar badge del carrito
        await cartPage.verificarNumeroDeItemsEnCarrito(3)
    })

    it('deberia actualizar el precio total con múltiples productos', async () => {
        // Agregar primer producto
        await productsPage.clickearPrimerProducto()
        const precio1 = await productPage.obtenerPrecioDelProducto()
        await productPage.agregarAlCarrito()
        
        // Volver a productos
        await browser.back()
        
        // Agregar segundo producto si existe
        const productos = await $$('~Displays selected product from products list')
        if (productos.length > 1) {
            await productos[1].click()
            await productPage.agregarAlCarrito()
        }
        
        // Ir al carrito y verificar precio total
        await cartPage.irAlCarrito()
        await cartPage.verificarPrecioTotal()
    })

    it('deberia permitir eliminar un producto del carrito', async () => {
        // Agregar producto
        await productsPage.clickearPrimerProducto()
        const nombreProducto = await productPage.obtenerNombreDelProducto()
        await productPage.agregarAlCarrito()
        
        // Ir al carrito
        await cartPage.irAlCarrito()
        
        // Eliminar producto
        await cartPage.eliminarProductoDelCarrito(nombreProducto)
        
        // Verificar carrito vacío
        await cartPage.verificarCarritoVacio()
    })

    it('deberia mantener el carrito al navegar entre pantallas', async () => {
        // Agregar producto
        await productsPage.clickearPrimerProducto()
        const nombreProducto = await productPage.obtenerNombreDelProducto()
        await productPage.agregarAlCarrito()
        
        // Navegar de vuelta
        await browser.back()
        
        // Verificar que el badge del carrito aún muestra 1
        await cartPage.verificarNumeroDeItemsEnCarrito(1)
        
        // Ir al carrito y verificar producto
        await cartPage.irAlCarrito()
        await cartPage.verificarProductoEnCarrito(nombreProducto)
    })

    it('deberia proceder al checkout con productos en el carrito', async () => {
        // Agregar producto
        await productsPage.clickearPrimerProducto()
        await productPage.agregarAlCarrito()
        
        // Ir al carrito
        await cartPage.irAlCarrito()
        
        // Proceder al checkout
        await cartPage.procederAlCheckout()
        
        // Verificar que navega a la pantalla de checkout
        // Ajustar selector según la app
        const checkoutScreen = await $('~Checkout')
        await expect(checkoutScreen).toBeDisplayed()
    })
})