# 🎬 GUIÓN – Módulo 3: Buenas prácticas + Page Object Model

> **Objetivo:** El alumno entiende qué es POM, por qué existe, y cómo aplicarlo.
> **Duración estimada por video:** 10-15 min
> **Prerequisito:** Módulo 2 completo

---

## 📹 VIDEO 1: ¿Qué problema resuelve el Page Object Model?

### Hook (0:00–0:45)
> "¿Qué pasa cuando cambia un selector en tu app y tenés 10 tests que lo usan?
> Sin POM, tenés que cambiarlo en 10 lugares. Con POM, en uno solo."

### Contenido (0:45–8:00)

**El problema: tests acoplados**
```typescript
// ❌ Sin POM — todo mezclado en el test
it('deberia hacer login', async () => {
    await $('#nameET').setValue('bod@example.com')
    await $('#passwordET').setValue('10203040')
    await $('~Tap to login with given credentials').click()
    expect(await $('#productTV').isDisplayed()).toBe(true)
})
```

**La solución: separar responsabilidades**
```
tests/
  specs/        → QUÉ queremos verificar (intención del negocio)
  pageObjects/  → CÓMO interactuamos con la pantalla (implementación)
```

**Mostrar la estructura del repo en vivo:**
- Abrir VS Code con `mobileAutomationRepo`
- Mostrar `test/pageObjects/` vs `test/specs/`

### Cierre (8:00–10:00)
> "En el próximo video, creamos nuestra BasePage — la clase de la que todas las demás van a heredar."

---

## 📹 VIDEO 2: BasePage — la base reutilizable

### Hook (0:00–0:30)
> "La BasePage es como el kit de herramientas que todos tus page objects comparten."

### Contenido (0:30–12:00)

**Abrir `test/pageObjects/base.page.ts` y explicar cada método:**

```typescript
// 1. tap() — espera + click (nunca click directo)
protected async tap(element, description) {
    await step(description, async () => {
        await element.waitForDisplayed({ timeout: this.defaultTimeout })
        await element.click()
    })
}
```
> "¿Por qué waitForDisplayed antes de click? Porque mobile es lento. Si clickeamos antes de que el elemento cargue, el test falla de forma flaky (a veces sí, a veces no)."

```typescript
// 2. scrollVertical() — scroll nativo para Android
protected async scrollVertical(direction: 'up' | 'down', percent: number) {
    const { width, height } = await driver.getWindowSize()
    // ...
    const canScroll = await driver.execute('mobile: scrollGesture', gestureConfig)
}
```
> "Esto usa el API de Appium para hacer scroll como si fuera un dedo real en la pantalla."

```typescript
// 3. type() — para campos de texto
// 4. assertVisible() — verificación encapsulada
// 5. readText() — leer texto con Allure step
```

**Mostrar herencia en LoginPage:**
```typescript
export class LoginPage extends BasePage {
    // Solo tiene los selectores de Login y las acciones específicas
    // Los métodos base los heredó de BasePage
}
```

### Cierre
> "En el próximo video, vemos cómo LoginPage usa la herencia para ser limpia y corta."

---

## 📹 VIDEO 3: LoginPage — POM en acción

### Hook (0:00–0:30)
> "Una regla de oro: si tenés más lógica en tus specs que en tus page objects, algo está mal."

### Contenido

**Abrir `test/pageObjects/login.page.ts`**

**Mostrar la estructura:**
1. **Selectores privados** — nadie los toca desde afuera
```typescript
private get inputEmail(){ return $('#nameET') }
private get inputPassword(){ return $('#passwordET') }
```
> "¿Por qué `private`? Porque el test no debería saber cómo se llama el campo. Solo sabe que puede hacer login."

2. **Acciones públicas** — la interfaz del page object
```typescript
public async completarLoginExitoso(email: string, password: string) {
    await this.ingresarCredenciales(email, password)
    await this.hacerClickEnBotonLogin()
}
```

3. **Comparar el spec con y sin POM:**
```typescript
// Con POM — limpio, intención clara
it('deberia hacer login con credenciales válidas', async () => {
    await sidebarPage.irALogin()
    await loginPage.completarLoginExitoso('bod@example.com', '10203040')
    await productsPage.verificarTituloDeProductos()
})
```

**Demo en vivo:** Abrir la app en el emulador y correr el test de login.

---

## 📹 VIDEO 4: ProductsPage — POM con scroll y colección de datos

### Hook (0:00–0:30)
> "Este es el page object más complejo del curso. Tiene scroll, colección de datos, y manejo de estado interno."

### Contenido

**Abrir `test/pageObjects/products.page.ts` y explicar:**

1. **Estado interno del page object:**
```typescript
private footerVisibleEnUltimoRecorridoFlag = false
```
> "A veces necesitamos guardar estado entre llamadas. Esto es válido en un PO."

2. **El algoritmo de scroll completo:**
```typescript
public async obtenerListadoCompletoDeProductos(): Promise<string[]> {
    await this.irAlComienzoDeLaLista()  // scrolleamos al inicio
    const nombres = new Set<string>()  // Set para evitar duplicados
    
    while (true) {
        if (await this.footerVisibleEnPantalla()) break  // llegamos al final
        await this.scrollVertical('down')
        await this.recolectarProductosVisibles(nombres, 'Tras scroll')
    }
    return Array.from(nombres)
}
```

3. **Mostrar el test que lo usa:**
```typescript
it('deberia contar los 24 productos llegando al footer', async () => {
    const listadoCompleto = await productsPage.obtenerListadoCompletoDeProductos()
    expect(listadoCompleto.length).toBe(24)
    expect(footerVisible).toBe(true)
})
```

**Demo en vivo:** Correr `products-scroll.test.ts` y ver el scroll en acción.

---

## 📹 VIDEO 5 (Bonus): CartPage — flujo E2E completo

### Contenido

**Mostrar el flujo completo:**
```
Login → Ver productos → Seleccionar producto → Agregar al carrito → Verificar carrito
```

**Abrir `test/specs/cart.test.ts` y correrlo en vivo.**

**Mostrar el reporte Allure** (intro para el Módulo 4):
```bash
npm run wdio
npm run allure:generate
npm run allure:open
```

---

## 📝 RECURSOS PARA SUBIR A LA PLATAFORMA

- Código del módulo: `test/pageObjects/` (todo el directorio)
- Specs de ejemplo: `test/specs/login.test.ts`, `cart.test.ts`, `products-scroll.test.ts`
- Repo completo: https://github.com/juantor16/mobileAutomationRepo
