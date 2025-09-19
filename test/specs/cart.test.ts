import { SidebarPage } from "../pageObjects/sidebar.page"
import { LoginPage } from "../pageObjects/login.page"
import { ProductsPage } from "../pageObjects/products.page"
import { ProductPage } from "../pageObjects/product.page"
import { CartPage } from "../pageObjects/cart.page"


describe('Tests del carrito de compras', () => {
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

    it('deberia permitirnos agregar un producto al carrito', async () => {
        // Seleccionar el primero producto
        await productsPage.clickearPrimerProducto();

        // Obtenemos nombre del producto para veriricar despues
        const nombreDelProducto = await productPage.obtenerNombreDelProducto();

        // Agregamos el producto al carrito
        await productPage.agregarAlCarrito();

        // Ir al carrito
        await cartPage.irAlCarrito();

        // Verificar que el producto este en el carrito
        await cartPage.verificarProductoEnCarrito(nombreDelProducto);
        await cartPage.verificarNumeroDeItemsEnElCarrito(1);

    })
})