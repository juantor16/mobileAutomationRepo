# 📱 Guía de Clase: Evolución de Tests con Appium + WebdriverIO

## 🎯 Objetivo de la Clase
Transformar un proyecto básico de automatización móvil en un framework profesional y escalable.

---

## 📋 Punto de Partida
**Branch inicial:** Solo tenemos 2 tests básicos
- Un test de login exitoso
- Un test de visualización de producto

**Pregunta para los estudiantes:** 
> "¿Qué problemas ven con tener solo estos 2 tests? ¿Qué más deberíamos probar?"

---

## 🚀 PARTE 1: Expandiendo la Cobertura de Tests (30 min)

### 1.1 Creando Tests de Login Completos

**Explicar:** "Vamos a aplicar el principio de **testing negativo** - no solo probamos el camino feliz"

#### Paso 1: Crear archivo de tests de login
```bash
# Crear nuevo archivo
touch test/specs/login.test.ts
```

**Código a escribir:**
```typescript
import {SidebarPage} from "../pageObjects/sidebar.page";
import {LoginPage} from "../pageObjects/login.page";
import {ProductsPage} from "../pageObjects/products.page";

describe('Tests de Login', () => {
    let sidebarPage: SidebarPage
    let loginPage: LoginPage
    let productsPage: ProductsPage

    beforeEach(async () => {
        sidebarPage = new SidebarPage()
        loginPage = new LoginPage()
        productsPage = new ProductsPage()
    })

    it('deberia permitirnos iniciar sesion con credenciales validas', async () => {
        await sidebarPage.irALogin()
        await loginPage.completarLoginExitoso('bod@example.com', '10203040')
        await productsPage.verificarTituloDeProductos()
    })

    it('deberia mostrar error con email invalido', async () => {
        await sidebarPage.irALogin()
        await loginPage.ingresarCredenciales('email_invalido@test.com', '10203040')
        await loginPage.hacerClickEnBotonLogin()
        
        // Verificar mensaje de error - ajustar selector segun la app
        const errorMessage = await $('~Provided credentials do not match any user in this service.')
        await expect(errorMessage).toBeDisplayed()
    })
    
    // Agregar más casos...
})
```

**Explicar conceptos:**
- ✅ **beforeEach**: Setup consistente para cada test
- ✅ **Selectores por accessibility id** (~): Mejor práctica para apps móviles
- ✅ **Tests negativos**: Validar comportamiento con datos incorrectos

### 1.2 Mejorando los Page Objects

**Explicar:** "Los Page Objects deben evolucionar con nuestras necesidades"

#### Paso 2: Actualizar ProductPage con métodos de interacción
```typescript
// En test/pageObjects/product.page.ts
// Agregar después de los métodos de verificación:

    // Métodos de interacción
    public async aumentarCantidad(){
        await this.botonDeMas.click()
    }

    public async disminuirCantidad(){
        await this.botonDeMenos.click()
    }

    public async obtenerCantidadActual(): Promise<string>{
        return await this.cantidad.getText()
    }

    public async agregarAlCarrito(){
        await this.botonAgregarAlCarrito.click()
    }

    public async establecerCantidad(cantidadDeseada: number){
        const cantidadActual = parseInt(await this.obtenerCantidadActual())
        
        if(cantidadActual < cantidadDeseada){
            for(let i = cantidadActual; i < cantidadDeseada; i++){
                await this.aumentarCantidad()
            }
        } else if(cantidadActual > cantidadDeseada){
            for(let i = cantidadActual; i > cantidadDeseada; i--){
                await this.disminuirCantidad()
            }
        }
    }
```

**Conceptos clave:**
- 🎯 **Métodos reutilizables**: No repetir lógica en los tests
- 🎯 **Promesas tipadas**: Promise<string> para type safety
- 🎯 **Lógica de negocio**: establecerCantidad() maneja la complejidad

### 1.3 Creando el Page Object del Carrito

#### Paso 3: Crear CartPage
```bash
touch test/pageObjects/cart.page.ts
```

**Explicar:** "Cada pantalla/componente importante merece su propio Page Object"

```typescript
export class CartPage {
    // Selectores
    private get cartIcon() { return $('~Displays number of items in your cart') }
    private get cartBadge() { return $('#cartIV') }
    private get cartItemsList() { return $$('//android.widget.TextView[@resource-id="titleTV"]') }
    
    // Métodos...
    public async verificarNumeroDeItemsEnCarrito(numeroEsperado: number) {
        const badge = await this.cartBadge.getText()
        expect(parseInt(badge)).toBe(numeroEsperado)
    }
    
    // Más métodos...
}
```

**Puntos importantes:**
- 📦 **$$ para múltiples elementos**: Cuando esperamos listas
- 📦 **XPath cuando necesario**: Para relaciones complejas entre elementos

### 1.4 Tests del Carrito

#### Paso 4: Crear tests del carrito
```bash
touch test/specs/cart.test.ts
```

**Explicar el patrón AAA:**
```typescript
it('deberia agregar un producto al carrito', async () => {
    // ARRANGE - Preparar
    await productsPage.clickearPrimerProducto()
    const nombreProducto = await productPage.obtenerNombreDelProducto()
    
    // ACT - Actuar
    await productPage.agregarAlCarrito()
    await cartPage.irAlCarrito()
    
    // ASSERT - Afirmar
    await cartPage.verificarProductoEnCarrito(nombreProducto)
    await cartPage.verificarNumeroDeItemsEnCarrito(1)
})
```

### 1.5 Implementando Logout

#### Paso 5: Actualizar SidebarPage
```typescript
// Agregar en sidebar.page.ts:
private get botonLogout(){ return $('~Logout Menu Item')}
private get confirmLogoutButton(){ return $('android:id/button1')}

public async hacerLogout(){
    await this.clickearBotonDeMenu()
    await this.clickearBotonDeLogout()
    await this.confirmarLogout()
}

public async verificarQueEstaLogueado(){
    await this.clickearBotonDeMenu()
    await expect(this.botonLogout).toBeDisplayed()
    await browser.back() // Cerrar menu
}
```

**Concepto:** Dialogs nativos de Android usan `android:id`

---

## 📊 PARTE 2: Reportes Profesionales con Allure (30 min)

### 2.1 Instalación de Allure

#### Paso 6: Instalar dependencias
```bash
npm install --save-dev @wdio/allure-reporter allure-commandline
```

**Explicar:** 
> "Allure nos da reportes visuales, históricos, screenshots, y más. Es lo que usan empresas grandes."

### 2.2 Configuración en wdio.conf.ts

#### Paso 7: Configurar reporters
```typescript
// En wdio.conf.ts, reemplazar:
reporters: ['spec'],

// Por:
reporters: [
    'spec',
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: false,
        addConsoleLogs: true,
    }]
],
```

**Beneficios de cada opción:**
- `outputDir`: Dónde guardar resultados
- `disableWebdriverScreenshotsReporting: false`: Screenshots en el reporte
- `addConsoleLogs`: Logs de consola en el reporte

### 2.3 Screenshots Automáticos en Fallos

#### Paso 8: Configurar hook afterTest
```typescript
// En wdio.conf.ts:
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    // Tomar screenshot si el test falla
    if (!passed && error) {
        await browser.takeScreenshot()
    }
},
```

**Explicar:** "Esto es crítico para debugging - ver exactamente qué pasó"

### 2.4 Scripts de NPM

#### Paso 9: Actualizar package.json
```json
"scripts": {
    "wdio": "wdio run ./wdio.conf.ts",
    "allure:generate": "allure generate allure-results --clean",
    "allure:open": "allure open",
    "test:report": "npm run wdio && npm run allure:generate && npm run allure:open"
}
```

**Demo en vivo:**
```bash
# Ejecutar tests y ver reporte
npm run test:report
```

**Mostrar en el reporte:**
- Timeline de ejecución
- Screenshots de fallos
- Pasos detallados
- Gráficos de resultados

---

## 🔐 PARTE 3: Manejo Profesional de Datos (20 min)

### 3.1 Variables de Entorno

#### Paso 10: Instalar dotenv
```bash
npm install --save-dev dotenv
```

#### Paso 11: Crear .env
```bash
touch .env
```

```env
# Credenciales de la aplicación
TEST_USER_EMAIL=bod@example.com
TEST_USER_PASSWORD=10203040

# Credenciales de SauceLabs
SAUCE_USERNAME=tu_usuario
SAUCE_ACCESS_KEY=tu_key

# Configuración del dispositivo
DEVICE_NAME=Pixel_6
PLATFORM_VERSION=16.0
```

**⚠️ IMPORTANTE:** "NUNCA subir .env a Git"

#### Paso 12: Crear .env.example
```bash
cp .env .env.example
# Luego editar .env.example con valores genéricos
```

### 3.2 Actualizar wdio.conf.ts

#### Paso 13: Importar y usar dotenv
```typescript
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Usar en capabilities:
capabilities: [{
    platformName: 'Android',
    'appium:deviceName': process.env.DEVICE_NAME || 'Pixel_6',
    'appium:platformVersion': process.env.PLATFORM_VERSION || '16.0',
    // ...
}]
```

**Explicar:** "Fallback values con || para desarrollo local"

### 3.3 Fixtures de Datos

#### Paso 14: Crear estructura de fixtures
```bash
mkdir -p test/fixtures
touch test/fixtures/testData.json
```

```json
{
  "users": {
    "validUser": {
      "email": "bod@example.com",
      "password": "10203040"
    },
    "invalidUser": {
      "email": "invalid@test.com",
      "password": "wrongpassword"
    }
  },
  "messages": {
    "errors": {
      "invalidCredentials": "Provided credentials do not match any user in this service."
    }
  }
}
```

### 3.4 Helper para Datos

#### Paso 15: Crear TestDataHelper
```bash
mkdir -p test/helpers
touch test/helpers/testDataHelper.ts
```

```typescript
import * as fs from 'fs';
import * as path from 'path';

export class TestDataHelper {
    private static testData: any;

    static loadTestData() {
        if (!this.testData) {
            const dataPath = path.join(__dirname, '../fixtures/testData.json');
            const rawData = fs.readFileSync(dataPath, 'utf-8');
            this.testData = JSON.parse(rawData);
        }
        return this.testData;
    }

    static getUser(userType: string) {
        const data = this.loadTestData();
        return data.users[userType];
    }
}
```

**Ventajas:**
- 📁 Centralización de datos
- 🔄 Fácil mantenimiento
- 🌍 Soporte para múltiples ambientes

---

## 🎣 PARTE 4: Hooks y Mejoras (10 min)

### 4.1 Hooks Informativos

#### Paso 16: Configurar hooks en wdio.conf.ts
```typescript
beforeSuite: async function (suite) {
    console.log(`\n🚀 Iniciando suite: ${suite.title}`)
    console.log(`📋 Total tests: ${suite.tests.length}`)
},

beforeTest: async function (test, context) {
    console.log(`\n🧪 Ejecutando: ${test.title}`)
},

afterSuite: async function (suite) {
    const passed = suite.tests.filter(test => test.state === 'passed').length
    const failed = suite.tests.filter(test => test.state === 'failed').length
    console.log(`\n✅ Pasados: ${passed}`)
    console.log(`❌ Fallidos: ${failed}`)
}
```

### 4.2 Actualizar .gitignore

#### Paso 17: Proteger archivos sensibles
```bash
# Agregar a .gitignore:
.env
allure-results/
allure-report/
*.log
```

---

## 🎬 DEMO FINAL (10 min)

### Ejecutar Suite Completa
```bash
# Limpiar resultados anteriores
rm -rf allure-results

# Ejecutar todos los tests
npm run wdio

# Ver solo tests de login
npm run wdio -- --spec ./test/specs/login.test.ts

# Generar y abrir reporte
npm run allure:generate && npm run allure:open
```

### Mostrar en el Reporte:
1. **Timeline**: Paralelización de tests
2. **Suites**: Organización de tests
3. **Gráficos**: Estadísticas de ejecución
4. **Screenshots**: En tests fallidos
5. **History**: Tendencias (si hay ejecuciones previas)

---

## 💡 Conceptos Clave para Reforzar

### Arquitectura del Proyecto
```
📂 test/
  📂 specs/        → Tests organizados por funcionalidad
  📂 pageObjects/  → Abstracción de páginas
  📂 fixtures/     → Datos de prueba
  📂 helpers/      → Utilidades reutilizables
📄 .env           → Configuración sensible
📄 wdio.conf.ts   → Configuración central
```

### Mejores Prácticas Aplicadas
1. **Page Object Model**: Separación de concerns
2. **Data-Driven Testing**: Datos externos a los tests
3. **Environment Variables**: Configuración flexible
4. **Comprehensive Reporting**: Visibilidad total
5. **Git Security**: No exponer credenciales

---

## 🎯 Tareas para los Estudiantes

### Básico:
- Agregar 2 tests más de productos
- Implementar test de búsqueda

### Intermedio:
- Crear test E2E completo (login → agregar → checkout)
- Agregar tags de Allure (@smoke, @regression)

### Avanzado:
- Implementar retry logic para tests flaky
- Agregar integración con CI/CD

---

## 🚀 Próxima Clase: 
- **Ejecución en la nube** (SauceLabs/BrowserStack)
- **Tests en iOS** (configuración y diferencias)
- **CI/CD** con GitHub Actions

---

## 📝 Notas para el Instructor

### Tiempos Sugeridos:
- **5 min**: Introducción y contexto
- **30 min**: Parte 1 (Tests)
- **30 min**: Parte 2 (Allure)
- **20 min**: Parte 3 (Datos)
- **10 min**: Parte 4 (Hooks)
- **10 min**: Demo y Q&A
- **15 min**: Buffer para preguntas

### Problemas Comunes:
1. **Appium no conecta**: Verificar que el emulador esté corriendo
2. **Selectores no funcionan**: Usar Appium Inspector
3. **Allure no abre**: Verificar que Java esté instalado
4. **Tests flaky**: Agregar waits explícitos

### Tips de Presentación:
- Hacer commits después de cada sección
- Tener el emulador ya abierto
- Preparar un backup branch por si algo falla
- Mostrar el inspector de Appium para explicar selectores

---

## 🎊 Cierre

"Hemos transformado un proyecto básico en un framework profesional. Ahora tienen:
- ✅ Tests comprehensivos
- ✅ Reportes visuales
- ✅ Manejo seguro de datos
- ✅ Arquitectura escalable

¡Esto es lo que se usa en la industria real!"

**Recursos adicionales:**
- [WebdriverIO Docs](https://webdriver.io/)
- [Allure Documentation](https://docs.qameta.io/allure/)
- [Appium Pro Tips](https://appiumpro.com/)