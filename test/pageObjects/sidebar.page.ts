import { BasePage } from './base.page';

export class SidebarPage extends BasePage {
    
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
        await this.tap(this.botonMenu, 'Abrir menú lateral')
    }

    public async clickearBotonDeLogin(){
        await this.tap(this.botonLogin, 'Ir a la pantalla de login')
    }

    public async clickearBotonDeLogout(){
        await this.tap(this.botonLogout, 'Cerrar sesión desde el menú')
    }

}
