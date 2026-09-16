# CMS — Especificación v1

Decisiones tomadas el 15-09-2026, tras la entrevista con el proveedor actual.

| Decisión | Resultado |
|---|---|
| Stack | **Laravel + Filament**, construido por Futurite |
| Alcance v1 | **Hospitales + Directorio Médico** |
| Quién opera | Futurite en v1; MAC asume la operación después *(ver deuda abierta)* |
| Relación con el sitio actual | El front Next.js **reemplaza** al sitio del proveedor |

## Por qué Laravel + Filament

El proveedor actual trabaja sobre un stack Laravel tradicional, así que un CMS en Laravel evita
una discusión de infraestructura con su área de TI. Además es el stack que Futurite ya opera en
producción, y Filament resuelve de fábrica justo lo que el documento exige:

- Relaciones muchos a muchos **con campos en el pivote** — es literalmente el caso
  Médico↔Hospital, donde consultorio y teléfono pertenecen a la relación y no al médico.
- **Importación CSV/Excel con actualización por identificador único**, que el documento marca
  como requisito funcional prioritario.
- Catálogos maestros con altas y bajas sin desarrollo.
- Roles y permisos, para cuando MAC asuma la operación.

El front en Next.js consume una API REST de solo lectura. Hoy lee de `lib/hospitals.ts` y
`lib/doctors.ts`, que se escribieron con la forma que tendrá esa API: migrar es sustituir esas
funciones por `fetch`, sin tocar componentes.

---

## Entidades

### `hospitals`

| Campo | Tipo | Nota |
|---|---|---|
| `slug` | string único | Llave pública: `/hospitales/{slug}` |
| `name`, `city`, `state`, `address`, `phone` | string | |
| `lat`, `lng` | decimal | Necesarios para el orden por cercanía y `/urgencias` |
| `status` | enum | `activo` · `proximamente` · `cerrado` |
| `opening_date` | date, nullable | Solo si está autorizado publicarla |
| `tour_360_url` | string, nullable | El módulo 360° aparece solo si tiene valor |
| `quote_enabled` | bool | Habilita el CTA "Cotiza tu cirugía" en esa sede |
| `study_scheduling_enabled` | bool | Habilita "Agenda tus estudios" en esa sede |
| `highlights` | json | Servicios destacados de la tarjeta del directorio |
| `published` | bool | |

Las dos banderas `*_enabled` son las que hacen cumplir la regla de funcionalidad real: el front
ya decide con ellas qué CTA muestra, y una sede sin herramientas cae al buscador contextual.

### `doctors`

| Campo | Tipo | Nota |
|---|---|---|
| `external_id` | string único | `MAC-0001`. Llave de la carga masiva |
| `name` | string | |
| `specialty_id` | FK | Una sola especialidad principal |
| `subspecialty_id` | FK, nullable | Cero o una |
| `red_mac_360` | bool | ≈300 médicos al lanzamiento |
| `license` | string, nullable | Cédula profesional, opcional *(pendiente de Legal)* |
| `photo` | media, nullable | **No es requisito para publicar** |
| `status` | enum | |

### `doctor_hospital` — pivote con campos

| Campo | Nota |
|---|---|
| `doctor_id`, `hospital_id` | |
| `is_primary` | Máximo uno por médico. Se muestra primero |
| `office` | Nullable |
| `phone` | Nullable. Línea del consultorio, **no** del hospital |
| `status` | Permite dar de baja una sede sin borrar al médico |

### Catálogos maestros

- `specialties` — con `parent_id` para subespecialidades. Altas y bajas sin desarrollo.
- `conditions` — el catálogo "Qué atiende", términos normalizados. Evita que convivan
  "Hipertensión", "Hipertensión arterial" y "Presión alta".
- `condition_doctor` — pivote, **máximo 3 por médico**.

---

## Reglas que viven en el modelo, no en el front

El documento las pide explícitamente, y si no se validan en el CMS se rompen solas con el uso:

- Un médico tiene 1 especialidad principal y 0 o 1 subespecialidad.
- Un médico tiene como máximo 3 etiquetas de "Qué atiende", y solo del catálogo. **Nunca texto
  libre.**
- Un médico tiene como máximo un hospital principal.
- Consultorio y teléfono pertenecen a la relación con cada sede.
- Si no hay teléfono de consultorio, el campo se omite: no se sustituye por el teléfono general
  del hospital ni se inventa.
- Una sede en `proximamente` no puede exponer acciones de sede operativa.

---

## Carga masiva de médicos

Es el requisito prioritario del documento: altas, bajas y cambios de consultorio son
constantes, y deben resolverse sin desarrollo.

**Formato — una fila por relación médico-hospital.** Un médico que consulta en dos sedes ocupa
dos filas con el mismo `ID Médico`.

```
ID Médico | Nombre | Especialidad | Subespecialidad | Atiende 1..3 |
Red MAC 360 | Hospital | Consultorio | Teléfono | Principal | Estatus relación
```

**Comportamiento:**

- El médico se actualiza por `ID Médico`. Nunca se duplica.
- La relación se actualiza por (`ID Médico`, `Hospital`).
- Cambió el teléfono → se actualiza la relación.
- Empezó a consultar en otra sede → se agrega una relación.
- Dejó de consultar en una sede → se da de baja **por la columna `Estatus relación`**, no por
  ausencia en el archivo.

Esa última decisión es deliberada. El documento describe la baja por ausencia, pero eso
convierte cualquier archivo parcial en un borrado masivo accidental. La columna explícita
consigue el mismo resultado sin el riesgo. Si MAC prefiere el comportamiento de sincronización
total, se ofrece como modo alternativo al importar, con vista previa de lo que va a desactivar.

- Una especialidad o un término de "Qué atiende" que no exista en el catálogo **detiene la fila
  y se reporta**, en vez de crearse como texto libre.
- Cada importación deja registro: quién, cuándo, cuántos creados, actualizados, dados de baja y
  rechazados.

---

## API para el front

Solo lectura, pública, cacheada.

```
GET /api/v1/hospitals                      Directorio: activos + próximas aperturas
GET /api/v1/hospitals/{slug}               Landing de sede, con servicios y facilidades
GET /api/v1/doctors?hospital=&specialty=&red_mac_360=&q=
```

Los filtros del Directorio Médico son combinables con lógica AND y responden a datos reales:
si se filtra por sede, solo se ofrecen especialidades con médicos publicados ahí.

---

## Fuera del alcance v1

Servicios, Promociones, Certificaciones, Facilidades y Galerías siguen en código hasta la v2.
Las estructuras ya están modeladas en `lib/`, así que la migración es mecánica. Se dejaron
fuera a propósito: son las entidades donde todavía no hay contenido definitivo, y modelarlas a
ciegas garantiza rehacerlas.

---

## Deudas abiertas

**1. La operación es transitoria.** En la v1 opera Futurite y MAC pide cambios. El documento
es explícito en que MAC debe poder mantener el directorio *"durante los próximos años sin
depender de desarrollo para cada alta, baja, modificación o cambio de consultorio"*. Por eso la
carga masiva y los catálogos se construyen desde la v1 aunque los use Futurite: son lo que hace
posible el traspaso. Conviene ponerle fecha a esa capacitación.

**2. El sitio nuevo reemplaza al actual.** Eso abre un frente que el documento del cliente no
contempla y que no está en el backlog:

- Inventario de URLs del sitio actual
- Mapa de redirecciones 301 hacia la arquitectura nueva
- Revisión de qué contenido migra, se consolida o se poda
- Medición antes y después

No es un detalle técnico menor: un reemplazo de sitio sin mapa de redirecciones es la forma más
común de perder posicionamiento de golpe.
