# 🎬 GUIÓN – Módulo 4: Reportes con Allure

> **Objetivo:** El alumno puede instalar Allure, integrar `step()` en sus tests, y generar reportes visuales.
> **Duración estimada:** 10-15 min por video

---

## 📹 VIDEO 1: Instalación y configuración de Allure

### Hook (0:00–0:45)
> "Los tests pasaron. ¿Pero cómo se lo explico a mi PM, mi tech lead, o el cliente?
> Con Allure, tenés un reporte visual hermoso que cualquiera puede leer."

### Contenido

**Mostrar que ya está en el repo:**
```bash
# Ya instalado — ver package.json
cat package.json | grep allure
```

**Explicar la configuración en `wdio.conf.ts`:**
```typescript
reporters: ['spec', ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
}]],
```

**Scripts disponibles:**
```bash
npm run wdio              # corre tests y genera allure-results/
npm run allure:generate   # genera allure-report/ a partir de allure-results/
npm run allure:open       # abre el reporte en el browser
```

**Demo en vivo:**
1. Correr `npm run wdio`
2. Mostrar la carpeta `allure-results/` generada
3. Correr `npm run allure:generate`
4. Correr `npm run allure:open`
5. Navegar el reporte: suites, casos, duración, screenshots

---

## 📹 VIDEO 2: Implementando Allure Steps

### Hook (0:00–0:30)
> "El reporte por defecto está bien, pero con `step()` podés tener el historial completo de cada acción."

### Contenido

**Abrir `test/utils/allureSteps.ts`:**
```typescript
import allure from '@wdio/allure-reporter'

export async function step<T>(title: string, action: () => Promise<T>): Promise<T> {
    allure.startStep(title)
    try {
        const result = await action()
        allure.endStep('passed')
        return result
    } catch (error) {
        allure.endStep('failed')
        throw error
    }
}
```
> "Es un wrapper simple. Wrappea cualquier acción con un nombre descriptivo que va a aparecer en el reporte."

**Mostrar usage en BasePage:**
```typescript
protected async tap(element, description) {
    await step(description, async () => {   // ← el step
        await element.waitForDisplayed(...)
        await element.click()
    })
}
```

**Mostrar en el reporte** el resultado de un test con steps:
- `Login` → `Abrir menú lateral` → `Ir a la pantalla de login` → `Ingresar email` → etc.

**Agregar un step personalizado en un test:**
```typescript
it('deberia hacer login', async () => {
    await step('Preparar: ir a login', async () => {
        await sidebarPage.irALogin()
    })
    await loginPage.completarLoginExitoso('bod@example.com', '10203040')
    await productsPage.verificarTituloDeProductos()
})
```

---

## 📹 VIDEO 3: Conteo y scroll de productos — Cómo validarlos (Demo)

### Contenido

**Correr `products-scroll.test.ts` en vivo con Allure.**

**Mostrar el reporte del test:**
- Cuántos productos se encontraron en cada scroll
- Si el footer fue visible
- Los console.log aparecen como attachments

**El test completo:**
```typescript
it('deberia contar los 24 productos llegando al footer', async () => {
    const visiblesIniciales = await productsPage.obtenerCantidadDeProductosVisibles()
    const listadoCompleto = await productsPage.obtenerListadoCompletoDeProductos()
    
    expect(visiblesIniciales).toBeGreaterThan(0)
    expect(listadoCompleto.length).toBe(24)
    expect(productsPage.footerVisibleEnUltimoRecorrido()).toBe(true)
})
```

> "¿Por qué 24? Porque la app SauceLabs Demo siempre tiene exactamente 24 productos. Si algún día cambia, el test nos avisa."

---

## 📝 RECURSOS

- `test/utils/allureSteps.ts`
- `package.json` (scripts de Allure)
- Documentación Allure: https://allurereport.org/docs/
- Docs WDIO Allure Reporter: https://webdriver.io/docs/allure-reporter/
