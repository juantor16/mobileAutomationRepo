# 📮 Curso "Postman desde Cero" — Análisis Completo

> Repo: https://github.com/Atenea-Conocimientos/Postman_Desde_Cero
> Analizado por Hephaestus AI · 2026-02-26

---

## 🏆 Estado Real: MUCHO más completo de lo esperado

El repo tiene una app Next.js **completamente funcional** con slides, ejercicios, quiz y descarga de recursos.

---

## ✅ Lo que YA EXISTE y funciona

### App Next.js
| Página | Estado | Descripción |
|--------|--------|-------------|
| `/` | ✅ Completo | Index con los 10 módulos |
| `/slides/[01-10]` | ✅ Completo | Presentación interactiva con teclado, progress bar |
| `/exercises` | ✅ Completo | 9 ejercicios con checkboxes |
| `/quiz` | ✅ Completo | 15 preguntas en 3 secciones con corrección automática |
| `/downloads` | ⚠️ Parcial | UI lista, faltan algunos archivos |

### Contenido
| Componente | Estado |
|-----------|--------|
| Scripts de video (10/10) | ✅ Todos escritos |
| Contenido MDX (10/10) | ✅ Todos escritos |
| Slides en código (10/10) | ✅ Todos codificados |
| Ejercicios (9/10) | ✅ Todos escritos |
| Quiz (15 preguntas) | ✅ Completo |
| `collections/jsonplaceholder-collection.json` | ✅ Existe |

---

## ❌ Lo que FALTA

### 1. Videos grabados (solo 3 de 10)
Juan grabó los primeros 3 módulos. Falta grabar:
- [ ] `04_headers_auth.md`
- [ ] `05_variables_environments.md`
- [ ] `06_collections.md`
- [ ] `07_tests_automatizados.md`
- [ ] `08_newman_cli.md`
- [ ] `09_proyecto_final.md`
- [ ] `10_qa_lab_caza_bugs.md`

### 2. Integración de videos en la app
Los slides existen pero **no tienen player de video embebido**. Hay que agregar en cada módulo de `slidesData`:
```typescript
// Agregar al inicio de cada módulo en page.tsx
videoUrl: 'https://youtube.com/...', // o Vimeo/Loom
```
Y renderizarlo en el componente title/slide.

### 3. Archivos de descarga faltantes
El `/downloads` referencia archivos que no existen:
- [ ] `collections/reqres-collection.json` (collection Reqres con auth + tests)
- [ ] `collections/development-environment.json`
- [ ] `cheatsheets/http-methods.pdf`
- [ ] `cheatsheets/status-codes.pdf`
- [ ] `cheatsheets/postman-tests.pdf`
- [ ] `cheatsheets/newman-cli.pdf`

### 4. QA Lab (módulo 10)
El módulo 10 "QA Lab: Caza de Bugs" referencia un repo externo:
```
git clone https://github.com/Atenea-Conocimientos/qa-api-lab.git
```
**Este repo no existe todavía.** Hay que crearlo (API bugueada con 15 bugs).

---

## 🛠️ Plan de Completición (en orden de prioridad)

### Prioridad Alta
1. **Grabar videos 04-10** → Usar los scripts en `scripts/` como guión
2. **Agregar videoUrl a los módulos** → 2 líneas de código por módulo grabado

### Prioridad Media
3. **Crear reqres-collection.json** → Colección con auth + CRUD + tests (tiene TODO el contenido en los slides)
4. **Crear development-environment.json** → 5 minutos de trabajo

### Prioridad Baja
5. **Cheatsheets PDF** → Se pueden generar de los slides existentes
6. **qa-api-lab repo** → La API bugueada del módulo 10 (requiere más desarrollo)

---

## 💡 Cómo agregar video al slide player

En `src/app/slides/[id]/page.tsx`, agregar a `slidesData`:

```typescript
'01': {
  videoUrl: 'https://www.youtube.com/embed/XXXX', // agregar cuando esté grabado
  slides: [...]
}
```

Y en el componente, mostrar el video en la primera slide (type: 'title'):

```tsx
{slide.type === 'title' && videoUrl && (
  <iframe 
    src={videoUrl} 
    className="w-full aspect-video rounded-2xl mb-6"
    allowFullScreen
  />
)}
```

---

## 📁 Estructura del repo

```
Postman_Desde_Cero/
├── src/
│   └── app/
│       ├── page.tsx           ✅ Index + slides data completo
│       ├── slides/[id]/       ✅ Slide viewer interactivo
│       ├── exercises/         ✅ 9 ejercicios
│       ├── quiz/              ✅ 15 preguntas
│       └── downloads/         ⚠️ UI lista, archivos faltantes
├── content/postman-course/    ✅ 10 MDX files
├── scripts/                   ✅ 10 guiones de video
├── collections/               ⚠️ Solo jsonplaceholder (falta reqres)
└── package.json               ✅ Next.js 14
```
