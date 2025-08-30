export class SidebarPage{
    
    // Localizadores
    private get botonMenu(){ return $('~View menu')}
    private get botonLogin(){ return $('~Login Menu Item')}
    private get botonLogout(){ return $('~Logout Menu Item')}
    private get confirmLogoutButton(){ return $('android:id/button1')} // Botón OK del dialog
    private get cancelLogoutButton(){ return $('android:id/button2')} // Botón Cancelar del dialog

    // Acciones
    public async irALogin(){
        await this.clickearBotonDeMenu()
        await this.clickearBotonDeLogin()
    }

    public async clickearBotonDeMenu(){
        await this.botonMenu.click()
    }

    public async clickearBotonDeLogin(){
        await this.botonLogin.click()
    }

    public async clickearBotonDeLogout(){
        await this.botonLogout.click()
    }

    public async confirmarLogout(){
        await this.confirmLogoutButton.click()
    }

    public async cancelarLogout(){
        await this.cancelLogoutButton.click()
    }

    public async hacerLogout(){
        await this.clickearBotonDeMenu()
        await this.clickearBotonDeLogout()
        await this.confirmarLogout()
    }

    public async verificarQueEstaLogueado(){
        await this.clickearBotonDeMenu()
        await expect(this.botonLogout).toBeDisplayed()
        // Cerrar menu
        await browser.back()
    }

    public async verificarQueNoEstaLogueado(){
        await this.clickearBotonDeMenu()
        await expect(this.botonLogin).toBeDisplayed()
        // Cerrar menu
        await browser.back()
    }
}
