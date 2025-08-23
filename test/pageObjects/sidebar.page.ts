export class SidebarPage{
    
    // Localizadores
    private get botonMenu(){ return $('~View menu')}
    private get botonLogin(){ return $('~Login Menu Item')}

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

}
