# 🎬 GUIÓN – Ejecuciones Remotas: SauceLabs & Browserstack

> **Objetivo:** El alumno puede ejecutar sus tests en dispositivos reales en la nube.
> **Prerequisito:** Tests funcionando localmente

---

## 📹 VIDEO 1: Seteo de SauceLabs

### Hook (0:00–0:45)
> "Corriste tus tests en un emulador. Ahora los vas a correr en un Samsung Galaxy real, en los servidores de SauceLabs, sin tener el dispositivo físico."

### Contenido

**1. Crear cuenta en SauceLabs (mostrar en vivo)**
- https://saucelabs.com → Sign up → Free trial (2 minutos gratis/mes)
- Dashboard → User Settings → Access Key → copiar username y access key

**2. Subir la APK a SauceLabs:**
```bash
# Con curl (mostrar en terminal)
curl -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY" \
  -X POST "https://api.us-west-1.saucelabs.com/v1/storage/upload" \
  -F "payload=@./data/mda-2.2.0-25.apk" \
  -F "name=mda-2.2.0-25.apk"
# Guardar el "storage_id" que devuelve (formato: storage:xxxx)
```

**3. Configurar `.env`:**
```bash
cp .env.example .env
```
```env
SAUCE_USERNAME=tu_usuario
SAUCE_ACCESS_KEY=tu_access_key
SAUCE_STORAGE_APP=storage:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

**4. Explicar `wdio.sauce.android.conf.ts`:**
```typescript
capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '12',
    'sauce:options': {
        build: 'Mobile Automation Course',
        name: 'Android Tests',
    }
}]
```

**5. Ejecutar:**
```bash
# Cargar .env y correr
npx dotenv -e .env -- npx wdio run ./wdio.sauce.android.conf.ts
```

**6. Mostrar resultados en SauceLabs Dashboard:**
- Video de la ejecución en el dispositivo real
- Screenshots automáticos
- Logs de Appium

---

## 📹 VIDEO 2: Guía SauceLabs (PDF complementario)
> Subir PDF con los pasos visuales de la configuración.

---

## 📹 VIDEO 3: Seteo de Browserstack

### Hook (0:00–0:30)
> "Browserstack es la alternativa más popular a SauceLabs. Veamos cómo es el setup — es muy similar."

### Contenido

**1. Crear cuenta en Browserstack**
- https://browserstack.com → Sign Up → Free trial
- App Automate → Keys → copiar username y access key

**2. Subir la APK:**
```bash
curl -u "$BS_USERNAME:$BS_ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@./data/mda-2.2.0-25.apk"
# Guardar el "app_url" (bs://xxxxxx)
```

**3. `.env`:**
```env
BROWSERSTACK_USERNAME=tu_usuario
BROWSERSTACK_ACCESS_KEY=tu_access_key
BROWSERSTACK_APP_ID=bs://XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**4. Explicar `wdio.browserstack.android.conf.ts`:**
```typescript
capabilities: [{
    platformName: 'android',
    'appium:deviceName': 'Samsung Galaxy S22',
    'appium:platformVersion': '12.0',
    'bstack:options': {
        projectName: 'Mobile Automation Course',
        buildName: 'Android Tests',
        sessionName: 'Smoke Test',
    }
}]
```

**5. Ejecutar:**
```bash
npx dotenv -e .env -- npx wdio run ./wdio.browserstack.android.conf.ts
```

**6. Mostrar dashboard de Browserstack App Automate**

---

## 📹 VIDEO 4: Guía Browserstack (PDF complementario)
> Subir PDF con los pasos visuales.

---

## 💡 SauceLabs vs Browserstack — Cuándo usar cada uno

| | SauceLabs | Browserstack |
|--|-----------|--------------|
| Free tier | ✅ 2 min/mes | ✅ 100 min/mes |
| Dispositivos | Amplio catálogo | Más dispositivos reales |
| Integración CI | ✅ GitHub Actions, Jenkins | ✅ Igual |
| UX Dashboard | Muy buena | Excelente |
| Precio | Mayor | Menor para startups |

---

## 📝 RECURSOS

- `wdio.sauce.android.conf.ts`
- `wdio.browserstack.android.conf.ts`
- `.env.example`
- SauceLabs docs: https://docs.saucelabs.com/mobile-apps/
- Browserstack docs: https://www.browserstack.com/docs/app-automate/appium/
