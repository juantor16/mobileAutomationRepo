# Mapa del Curso: Taller de Automatización Móvil con WebDriverIO + Appium

## Estado: En construcción
Fecha de análisis: 2026-02-26

---

## ✅ CONTENIDO DISPONIBLE

### MÓDULO 1 – Introducción + Setup completo

| # | Título | Tipo | URL |
|---|--------|------|-----|
| 1 | KickOff inciial - conocemos la estructura de nuestro proyecto | 🎥 Video (live session) | `Modulo 1/clase en vivo.mp4` |
| 2 | Instalación de herramientas para mobile automation | 📄 PDF | `Modulo 1/guia para setear ambiente mobile automation.pdf` |
| 3 | Inicializando nuestro repo | 🎥 Video | `Modulo 1/inicializando el proyecto mobile-1.mp4` |

### Módulo 2 – Localizar elementos

| # | Título | Tipo | URL |
|---|--------|------|-----|
| 4 | Conociendo el Appium Inspector | 🎥 Video | `Modulo 1/2. Conociendo el appium inspector.mp4` |
| 5 | Guía completa Appium Inspector | 📄 PDF | `Modulo 1/2.1 Guia completa Appium inspector.pdf` |
| 6 | Inspeccionando objetos y conociendo los diferentes localizadores | 🎥 Video | `Modulo 2/3. inspeccionando objetos y conociendo los diferentes localizadores..mp4` |
| 7 | Estrategias de localizadores | 📄 PDF | `Modulo 2/3.1Estrategias de localizadores.pdf` |
| 8 | Mejores prácticas para Appium Inspector con SauceLabs | 📄 PDF | `Modulo 2/3.2Mejores Practicas para Appium Inspector con SauceLabs App.pdf` |
| 9 | Desarrollamos nuestro primer escenario de login | 🎥 Video | `Modulo 2/4. Desarrollamos nuestro primer escenario de login.mp4` |

### Módulo 3: Buenas prácticas + POM

| # | Título | Tipo | URL |
|---|--------|------|-----|
| 10 | Clase en vivo 3 (live session) | 🎥 Video | `Modulo 3/Clase en vivo 3.mp4` |
| 11+ | Resto del módulo | 🔒 BLOQUEADO | — |

---

## 🔒 CONTENIDO PENDIENTE DE CREAR

### Módulo 3: Buenas prácticas + POM (parcialmente bloqueado)
Temas que faltan según el repo:
- Page Object Model (POM) — el repo ya tiene `test/pageObjects/` con base.page.ts, login.page.ts, etc.
- Refactoring con herencia (BasePage)
- Organización de tests con describe/it

### Módulo 4 – Reportes y expansión de escenarios
Lecciones planeadas (bloqueadas):
1. Instalación y seteo de reportes Allure
2. Guía para implementar Allure en tus proyectos
3. Conteo y scroll de productos - Cómo validarlos
4. Guía - Scroll vertical y conteo de productos

### Ejecuciones remotas – SauceLabs & Browserstack
Lecciones planeadas (bloqueadas):
1. Seteo de Saucelabs en nuestro proyecto
2. Documento guía Saucelabs
3. Seteo de Browserstacks en nuestro proyecto
4. Documento guía Browserstack

### iOS – Cómo ejecutar pruebas sobre dispositivos Apple
Estado: **SIN LECCIONES** — solo existe el objetivo del módulo:
> "Preparar el entorno y los comandos necesarios para levantar las pruebas del proyecto en iOS."
Lecciones pendientes de crear desde cero.

---

## 📁 REPO ANALIZADO: juantor16/mobileAutomationRepo

### Estructura actual
```
test/
  pageObjects/
    base.page.ts      ✅ Implementado (scrollVertical, tap, type, assertVisible, readText)
    login.page.ts     ✅ Implementado
    products.page.ts  ✅ Implementado
    product.page.ts   ✅ Implementado
    cart.page.ts      ✅ Implementado
    sidebar.page.ts   ✅ Implementado
  specs/
    login.test.ts           ✅ Implementado (2 tests)
    cart.test.ts            ✅ Implementado (1 test)
    products-scroll.test.ts ⚠️  Pendiente de completar
    test.e2e.ts             ⚠️  Pendiente de completar
  utils/
    allureSteps.ts    ✅ Implementado

data/
  mda-2.2.0-25.apk   ✅ App Android de Sauce Labs
  SauceLabs-Demo-App.ipa ✅ App iOS

wdio.conf.ts              ✅ Config local (specs[] vacío - necesita llenarse)
wdio.sauce.android.conf.ts ✅ Config SauceLabs
wdio.browserstack.android.conf.ts ✅ Config Browserstack
```

### Lo que falta en el repo
1. `products-scroll.test.ts` — test de scroll de productos (implementar)
2. `test.e2e.ts` — test E2E completo (implementar)
3. `wdio.conf.ts` — agregar specs a la config
4. `.env` — credenciales para SauceLabs/Browserstack

---

## 💡 PLAN SUGERIDO PARA COMPLETAR EL CURSO

### Videos a grabar (Módulos 3, 4, SauceLabs, iOS):

**Módulo 3 – Buenas prácticas + POM:**
1. ¿Qué es el Page Object Model? (teoría + demo)
2. Creando BasePage — métodos reutilizables
3. Aplicando POM al escenario de login
4. Extendiendo el framework: ProductsPage y CartPage

**Módulo 4 – Reportes:**
1. Configurando Allure Reporter
2. Usando `step()` en nuestros tests
3. Generando y leyendo reportes

**SauceLabs & Browserstack:**
1. Configurando credenciales en .env
2. Ejecutando tests en Android real con SauceLabs
3. Dashboard de resultados

**iOS:**
1. Capabilites iOS en Appium
2. Diferencias vs Android
3. Ejecutando el primer test en iOS

---

Base URL de videos: `https://osxrfvsebozgrlgxzueb.supabase.co/storage/v1/object/public/mobile-automation/`
