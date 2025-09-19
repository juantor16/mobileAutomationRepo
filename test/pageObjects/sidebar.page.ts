export class SidebarPage{
    
    // Localizadores
    private get botonMenu(){ return $('~View menu')}
    private get botonLogin(){ return $('~Login Menu Item')}
    private get botonLogout(){ return $('~Logout Menu Item')}

    // Acciones
    public async irALogin(){
        await this.clickearBotonDeMenu()
        await this.clickearBotonDeLogin()
    }

    public async desloguear(){
        await this.clickearBotonDeMenu()
        await this.clickearBotonDeLogout()
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
}
