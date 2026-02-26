# 🎬 GUIÓN – iOS: Cómo ejecutar pruebas sobre dispositivos Apple

> **Objetivo:** Preparar el entorno y ejecutar los mismos tests en iOS.
> **Nota:** Requiere Mac con Xcode instalado.

---

## 📹 VIDEO 1: Preparar el entorno iOS

### Hook (0:00–0:45)
> "Todo lo que aprendimos para Android... también funciona en iOS. Con un par de cambios en la configuración, los mismos tests corren en iPhone."

### Prerequisitos a mostrar (checklist)
```
[ ] Mac con macOS 12+
[ ] Xcode instalado (Mac App Store, gratuito)
[ ] Appium instalado globalmente: npm install -g appium
[ ] Driver XCUITest instalado: appium driver install xcuitest
```

**Verificar instalación:**
```bash
appium driver list --installed
# Debería mostrar:
# xcuitest  (1.x.x) [installed (npm)]
```

**Listar simuladores disponibles:**
```bash
xcrun simctl list devices | grep -E "(iPhone|iPad)" | grep Booted
# Si no hay ninguno booted:
xcrun simctl boot "iPhone 14"
```

---

## 📹 VIDEO 2: Configuración iOS en el proyecto

### Contenido

**Mostrar `wdio.conf.ios.ts` (ya creado en el repo):**
```typescript
capabilities: [{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 14',
    'appium:platformVersion': '16.0',
    'appium:automationName': 'XCUITest',     // ← diferencia clave vs Android
    'appium:app': `${process.cwd()}/data/SauceLabs-Demo-App.ipa`,
    'appium:autoAcceptAlerts': true,
}]
```

**Las diferencias Android → iOS:**

| Característica | Android | iOS |
|---|---|---|
| `automationName` | UiAutomator2 | XCUITest |
| Formato app | .apk | .ipa |
| Selectores | resource-id, content-desc | accessibility-id, name |
| Scroll | `mobile: scrollGesture` | `mobile: swipe` |
| Emulador | Android Studio AVD | Xcode Simulator |

**Ejecutar:**
```bash
npx wdio run ./wdio.conf.ios.ts
```

---

## 📹 VIDEO 3: Diferencias en los selectores iOS

### Contenido

**El Appium Inspector funciona igual para iOS:**
1. Conectar al simulador iOS
2. Inspeccionar la app con la misma herramienta

**Diferencias a mostrar:**

```typescript
// Android:
private get inputEmail(){ return $('#nameET') }
// iOS:
private get inputEmail(){ return $('~Email') }  // accessibility-id
```

**Tip: usar selectores multiplataforma:**
```typescript
private get inputEmail(){
    const isIOS = driver.isIOS
    return isIOS ? $('~Email') : $('#nameET')
}
```

---

## 📹 VIDEO 4 (Bonus): Ejecutar en iOS real con SauceLabs

### Contenido

**Subir el .ipa a SauceLabs:**
```bash
curl -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY" \
  -X POST "https://api.us-west-1.saucelabs.com/v1/storage/upload" \
  -F "payload=@./data/SauceLabs-Demo-App.ipa" \
  -F "name=SauceLabs-Demo-App.ipa"
```

**Crear `wdio.sauce.ios.conf.ts`:**
```typescript
import { config as baseConfig } from './wdio.sauce.android.conf.js'

export const config: WebdriverIO.Config = {
    ...baseConfig,
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 14 Simulator',
        'appium:platformVersion': '16',
        'appium:automationName': 'XCUITest',
        'appium:app': process.env.SAUCE_STORAGE_IOS,
        'sauce:options': {
            build: 'Mobile Automation Course - iOS',
        }
    }]
}
```

---

## 📝 RECURSOS

- `wdio.conf.ios.ts` (ya en el repo)
- `data/SauceLabs-Demo-App.ipa`
- Documentación XCUITest: https://appium.io/docs/en/latest/guides/xcuitest/
- Appium Capabilities: https://appium.io/docs/en/latest/guides/caps/
