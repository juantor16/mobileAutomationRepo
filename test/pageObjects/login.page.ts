
// Page object model para la pantalla de login

export class LoginPage{
    // Localizadores (Selectors)
    // Agrupamos los sleectores en un solo lugar centralizado

    private get inputEmail(){ return $('#nameET')}
    private get inputPassword(){ return $('#passwordET')}
    private get botonLoginDashboard(){ return $('~Tap to login with given credentials')}

    // Acciones
    public async ingresarCredenciales(email: string, password: string){
        await this.ingresarEmail(email)
        await this.ingresarPassword(password)
    }

    public async ingresarEmail(email: string){
        await this.inputEmail.setValue(email)
    }

    public async ingresarPassword(password: string){
        await this.inputPassword.setValue(password)
    }

    public async hacerClickEnBotonLogin(){
        await this.botonLoginDashboard.click()
    }

    public async completarLoginExitoso(email: string, password: string){
        await this.ingresarCredenciales(email, password)
        await this.hacerClickEnBotonLogin()
    }
}