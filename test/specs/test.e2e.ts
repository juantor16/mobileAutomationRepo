
describe('Test de smoke basico', () => {
    it('deberia permitirnos iniciar sesion', async () => {
        console.log(' la app esta abierta')
        
        // Hacemos click en el boton de Menu usamos Accesibility ID
        const botonMenu = $('~View menu')

        // Verificar que el menu este visible
        const menuVisible = await botonMenu.isDisplayed()
        expect(menuVisible).toBe(true)

        // Hacemos click en el boton de Menu
        await botonMenu.click()

        // Verificamos que el boton de login este visible
        const botonLogin = $('~Login Menu Item')

        // Verificamos que el boton de login este visible
        const botonLoginVisible = await botonLogin.isDisplayed()
        expect(botonLoginVisible).toBe(true)

        // Hacemos click en el boton de login
        await botonLogin.click()

        // Verificamos que los inputs esten visibles
        const inputEmail = $('#nameET')
        const inputPassword = $('#passwordET')

        // Verificamos que los inputs esten visibles
        expect( await inputEmail.isDisplayed()).toBe(true)
        expect( await inputPassword.isDisplayed()).toBe(true)

        await inputEmail.setValue('bod@example.com')
        await inputPassword.setValue('10203040')

        const botonLoginDashboard = $('~Tap to login with given credentials')
        await botonLoginDashboard.click()

        const tituloDeProductos = $('#productTV')
        expect(await tituloDeProductos.isDisplayed()).toBe(true)
    })
})
