import { SidebarPage } from "../pageObjects/sidebar.page";
import { LoginPage } from "../pageObjects/login.page";
import { ProductsPage } from "../pageObjects/products.page";
import type { ChainablePromiseElement } from 'webdriverio';

type EscenarioNegativo = {
    nombre: string;
    email: string;
    password: string;
    getMensajeDeError: (loginPage: LoginPage) => ChainablePromiseElement;
};

// Package name de la app — necesario para reiniciarla entre tests y asegurar aislamiento.
const APP_PACKAGE = 'com.saucelabs.mydemoapp.android';

describe('Test de login', () => {
    let sidebarPage: SidebarPage
    let loginPage: LoginPage
    let productsPage: ProductsPage

    beforeEach(async () => {
        sidebarPage = new SidebarPage()
        loginPage = new LoginPage()
        productsPage = new ProductsPage()

        // Reset al estado inicial: matamos y relanzamos la app para que cada test
        // arranque desde la pantalla de productos sin estado de sesiones previas.
        try {
            await driver.terminateApp(APP_PACKAGE)
        } catch {
            // La app no estaba corriendo, no es un error real.
        }
        await driver.activateApp(APP_PACKAGE)
    })

    it('deberia permitirnos iniciar sesion con credenciales validas', async () => {
        await sidebarPage.irALogin()
        await loginPage.completarLoginExitoso('bod@example.com', '10203040')
        await productsPage.verificarTituloDeProductos()
        await sidebarPage.desloguear()
    })

    // Nota didáctica: la app demo de Sauce Labs reusa el mismo TextView (`passwordErrorTV`)
    // para mostrar distintos mensajes de error (password requerido, usuario bloqueado, etc.).
    // El element locator es el mismo; lo que cambia es el texto adentro. En una app real
    // con validación de "credenciales no coinciden" tendríamos un cuarto escenario apuntando
    // al mismo o a otro locator. Acá nos quedamos con los tres que la app efectivamente
    // soporta.
    const escenariosNegativos: EscenarioNegativo[] = [
        {
            nombre: 'campos vacios',
            email: '',
            password: '',
            getMensajeDeError: (lp) => lp.mensajeDeErrorDeUsername,
        },
        {
            nombre: 'password vacio',
            email: 'bod@example.com',
            password: '',
            getMensajeDeError: (lp) => lp.mensajeDeErrorDePassword,
        },
        {
            nombre: 'usuario bloqueado',
            email: 'alice@example.com',
            password: '10203040',
            getMensajeDeError: (lp) => lp.mensajeDeErrorDePassword,
        },
    ];

    escenariosNegativos.forEach((escenario) => {
        it(`deberia mostrar error con ${escenario.nombre}`, async () => {
            await sidebarPage.irALogin()

            if (escenario.email !== '') {
                await loginPage.ingresarEmail(escenario.email)
            }
            if (escenario.password !== '') {
                await loginPage.ingresarPassword(escenario.password)
            }
            await loginPage.hacerClickEnBotonLogin()

            await expect(escenario.getMensajeDeError(loginPage)).toBeDisplayed()
        });
    });
})
