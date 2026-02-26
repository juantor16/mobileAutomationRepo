# 🎬 Curso Postman con Videos — Plan de Completición

> Estado: 3 videos grabados, curso sin terminar
> Fecha: 2026-02-26

---

## 📌 Lo que tenemos (por confirmar con repo)

- 3 videos grabados (contenido por revisar una vez que Athenix comparta el repo)
- Scripts de Postman
- HTML index

---

## 🗺️ Estructura sugerida del curso

### Sección 1 – Fundamentos (puede usar los 3 videos existentes)
1. **¿Qué es Postman y para qué sirve?**
   - Interfaz, colecciones, environments
   - Primer request GET
2. **Métodos HTTP en Postman**
   - GET, POST, PUT, PATCH, DELETE
   - Headers y body
3. **Variables y entornos**
   - Variables de collection vs environment
   - Cómo no hardcodear la base URL

### Sección 2 – Testing con Postman (por grabar)
4. **Tests automáticos en Postman**
   - pm.test() y assertions
   - Status codes, response body
5. **Pre-request scripts**
   - Generar datos dinámicos
   - Autenticación automática
6. **Colecciones y flows**
   - Ordenar requests en una colección
   - Collection runner

### Sección 3 – Newman y CI/CD (por grabar)
7. **Exportar colección y correr con Newman**
   ```bash
   npm install -g newman
   newman run collection.json -e environment.json
   ```
8. **Integrar con GitHub Actions**
9. **Reportes con Newman HTML Reporter**
   ```bash
   npm install -g newman-reporter-htmlextra
   newman run collection.json --reporters htmlextra
   ```

---

## 📋 TODO (actualizar cuando llegue el repo)

- [ ] Revisar los 3 videos grabados y mapear qué cubren
- [ ] Ver el HTML index para entender la estructura del curso
- [ ] Revisar los scripts del repo
- [ ] Identificar qué falta grabar
- [ ] Decidir si mergear con el Postman Quest o mantenerlos separados

---

## 💡 Relación con Postman Quest

El **Postman Quest** (gamificado) y este **curso de videos** son complementarios:
- Quest → aprendizaje interactivo, misiones cortas
- Videos → explicaciones profundas, contexto teórico

Podrían estar linkeados en la plataforma (terminar el video → ir a hacer la misión).
