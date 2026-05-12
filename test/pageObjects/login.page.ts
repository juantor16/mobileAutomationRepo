
import { BasePage } from './base.page';

// Page object model para la pantalla de login

export class LoginPage extends BasePage {
    // Localizadores (Selectors)
    // Agrupamos los sleectores en un solo lugar centralizado

    private get inputEmail(){ return $('#nameET')}
    private get inputPassword(){ return $('#passwordET')}
    private get botonLoginDashboard(){ return $('~Tap to login with given credentials')}
    public get mensajeDeErrorDePassword(){ return $('#passwordErrorTV')}
    public get mensajeDeErrorDeUsername(){ return $('#nameErrorTV')}

    // Acciones
    public async ingresarCredenciales(email: string, password: string){
        await this.ingresarEmail(email)
        await this.ingresarPassword(password)
    }

    public async ingresarEmail(email: string){
        await this.type(this.inputEmail, email, 'Ingresar email')
    }

    public async ingresarPassword(password: string){
        await this.type(this.inputPassword, password, 'Ingresar contraseña')
    }

    public async hacerClickEnBotonLogin(){
        await this.tap(this.botonLoginDashboard, 'Enviar credenciales desde el dashboard')
    }

    public async completarLoginExitoso(email: string, password: string){
        await this.ingresarCredenciales(email, password)
        await this.hacerClickEnBotonLogin()
    }

}
