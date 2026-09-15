# Checklist de ejecución — Hospitales MAC

Vista accionable del documento del 19-08-2026. El detalle decisión por decisión está en
[REVISION-2026-08.md](REVISION-2026-08.md); esto es el orden en que conviene atacarlo.

**Dónde estamos: 166 decisiones · 129 cerradas · 37 abiertas.**

De esas 37, solo 10 dependen de terceros de verdad. El resto es trabajo que podemos empezar
hoy.

| Lote | Abiertas | Depende de |
|---|---|---|
| A · Decisiones de criterio | ~~3~~ **0** | Cerradas el 15-09-2026 |
| B · Rutas que faltan | 9 | Nadie: es construir |
| C · CMS | 15 | Construirlo: Laravel + Filament |
| D · Herramientas externas | 6 | CRM, agendamiento, Google |
| E · Datos del cliente | 4 | Un solo paquete de información |
| F · Se cierran solas | 3 | Consecuencia de B y C |
| G · Migración del sitio actual | nuevo | El sitio nuevo reemplaza al del proveedor |

---

## A · Decisiones de criterio — cerradas el 15-09-2026

- [x] **Especialidades fuera de la Home.** Se respeta la validación de Legal que el propio
      documento cita. La Home queda con el recorrido exacto del documento.
- [x] **Reseñas de ejemplo: se mantienen con el aviso de vista previa** hasta que exista la
      integración con Google. Permite presentar el diseño final sin presentar testimonios como
      reales.
- [x] **Cédula profesional: campo opcional**, visible solo si viene cargada. No bloquea
      publicar a un médico. Va a Legal como consulta *(punto 14 del correo)*.

### Decisiones de proyecto tomadas el mismo día

- [x] **CMS: Laravel + Filament, construido por Futurite.** El proveedor actual trabaja en
      Laravel, y es el stack que el equipo ya opera. Ver [CMS-ESPECIFICACION.md](CMS-ESPECIFICACION.md).
- [x] **Alcance v1 del CMS: Hospitales + Directorio Médico**, que es lo que el documento marca
      como prioritario.
- [x] **Operación: Futurite en la v1**, MAC asume después. Es transitorio y contradice un
      requisito del documento: ver la deuda abierta en la especificación.
- [x] **El sitio nuevo reemplaza al actual** → abre el lote G.
- [x] **Las 25 sedes: compilamos un borrador y el cliente valida**, en vez de esperar al correo.

---

## B · Rutas que faltan (25 decisiones)

Aquí está el grueso. Ninguna depende de terceros: es construir, y cada ruta cierra varias
decisiones de golpe. Ordenadas por lo que desbloquean.

### B1 · `/hospitales` — el directorio  ·  **hecho el 15-09-2026**

- [x] Encabezado "Encuentra tu Hospital MAC" + cobertura
- [x] Buscador por código postal, ciudad o estado (sin mezclar servicios ni médicos)
- [x] Las tarjetas visibles sin obligar a buscar, en orden alfabético
- [x] Próximas aperturas con distintivo "PRÓXIMAMENTE" y sin acciones de sede operativa
- [x] Mapa complementario sincronizado con la búsqueda
- [x] Enlazar el menú, el footer, el Hero y el CTA del localizador a la ruta nueva
- [ ] **Fotografía por sede** — único campo de la tarjeta que falta. Mientras no haya fotos
      reales se usa un marcador neutro: el documento prohíbe stock o fotos de otras unidades.

> La cobertura se deriva de los datos (24 hospitales en 13 estados) en lugar de publicar
> "25 hospitales en 18 ciudades", que no cuadra con las sedes cargadas. Ver SEDES-BORRADOR.md.

### B2 · Geolocalización — una pieza, tres usos  ·  **hecha el 15-09-2026**

- [x] Coordenadas por sede — geocodificadas con su nivel de precisión. 16 de 25 son
      aproximadas y el cliente debe corregirlas, pero no bloquean el desarrollo.
- [x] Cálculo de distancia y permiso de ubicación del navegador — `lib/geo.ts` y
      `lib/useUserLocation.ts`, compartidos por las tres pantallas
- [x] Ordenar el localizador de la Home por cercanía
- [x] `/urgencias`: hospital más cercano, distancia, Llamar, Cómo llegar y "¿Prefieres otro
      hospital?" para cambiar de sede
- [x] Ordenar el directorio de hospitales por cercanía
- [ ] Orden por cercanía en el Directorio Médico, respetando el hospital principal — el
      documento lo plantea como opcional; falta llevar las coordenadas a la tarjeta de médico

> Ninguna pantalla se bloquea sin permiso de ubicación: sin él conservan su orden por defecto
> y todas las acciones siguen disponibles.

> El documento pide explícitamente no construir dos experiencias de localización separadas.

### B3 · `/servicios` y `/servicios/[slug]`  ·  **hecho el 15-09-2026**

- [x] Directorio nacional de servicios (menú "Servicios"), agrupado por naturaleza
- [x] Página nacional por servicio, con "Qué incluye" y las sedes donde está disponible
- [x] Entidad Servicio + relación Servicio↔Hospital: el contenido general se escribe una vez
      y cada sede solo declara qué ofrece
- [x] Conservar el contexto de la sede al entrar a un servicio desde un hospital
- [x] Enlazar el CTA "Ver todos los servicios" de la Home
- [ ] **Maternidad, Consulta Externa, Hemodinamia y Hemodiálisis** están en la oferta del
      documento pero ninguna ficha de sede las publica. Falta saber en qué hospitales están
      disponibles para incorporarlas al catálogo.
- [ ] Información local por sede —horario, estudios, equipamiento, requisitos— cuando exista CMS

### B4 · Hubs y landings  ·  desbloquea 7 decisiones

- [ ] `/soy-paciente` — hub de servicios digitales del paciente
- [ ] `/soy-medico` — hub de recursos para médicos
- [ ] `/promociones/[slug]` — landing con vigencia, sedes, condiciones, asistente IA y Call Center
- [ ] `/aseguradoras` — directorio con búsqueda (hoy el botón expande la lista en la Home)
- [ ] `/empresas` — beneficios para colaboradores por convenio

### B5 · Pendientes sueltos

- [ ] Buscador unificado del Hero: que interprete hospital / especialista / servicio / estudio
      (hoy resuelve todo al Directorio Médico)
- [ ] QA responsive de los tres accesos persistentes: posición, distancia entre botones, que
      no tapen CTAs, teclado y área táctil

---

## C · CMS (15 decisiones)

**Decidido: Laravel + Filament, construido por Futurite. La v1 cubre Hospitales y Directorio
Médico.** El modelado completo está en [CMS-ESPECIFICACION.md](CMS-ESPECIFICACION.md).

- [x] Decidir el CMS
- [x] Definir alcance v1 y modelo de datos
- [ ] Construir entidades v1: Hospital · Médico · relación Médico↔Hospital · catálogos de
      especialidades y de "Qué atiende"
- [ ] Modelar v2: Servicio · relación Servicio↔Hospital · Promoción · Reconocimiento · Facilidad
- [ ] Catálogos maestros: especialidades, subespecialidades, "Qué atiende"
- [ ] Carga masiva de médicos por Excel/CSV que **actualice** por ID único, no solo cree
- [ ] Rotación administrable de servicios destacados y promoción destacada
- [ ] Reconocimientos asociados a sedes, con una sola fuente para Home y landings
- [ ] Funcionalidades habilitadas por sede (cotización, agendamiento) que controlen qué CTA se
      muestra

> **No bloquea el lote B.** Las estructuras en `lib/` ya tienen la forma que debe replicar el
> CMS; cambiar la fuente de datos después es sustituir el import. Construir las rutas contra
> `lib/` y migrar luego es más rápido que esperar.

---

## D · Herramientas externas (6 decisiones)

Nada que podamos acelerar desde código. Conviene saber la fecha de cada una.

- [ ] **CRM** → "Cotiza tu cirugía" de punta a punta
- [ ] **Agendamiento de Imagenología** → "Agenda tu estudio" en menú, Home, servicios y sedes
- [ ] **Google Business Profile / Places** → reseñas reales, rotación entre sedes y `place_id`
      por hospital para "Compartir mi experiencia"
- [ ] Documentar la integración con Google: fuente, método, actualización, atribución, manejo
      de reseñas eliminadas y límites de licenciamiento *(entregable nuestro)*

---

## E · Lo que hay que pedirle al cliente

Cabe en un solo correo, y destraba los lotes B y E completos.

- [ ] Las 25 sedes: nombre, ciudad, estado, dirección, teléfono, servicios destacados
- [ ] Próximas aperturas: cuáles, con qué datos son publicables
- [ ] Fotografías reales y actuales por sede (el documento prohíbe stock y fotos de otras unidades)
- [ ] URLs de los recorridos 360° (existen en ~13 de 25)
- [ ] URL del flujo de pre-registro actual
- [ ] Logos de empresas con convenio
- [ ] Validación de textos: descripciones de certificaciones, explicación de Red MAC 360°,
      alcance real del Call Center y del asistente IA
- [ ] Documentos legales: aviso de privacidad, términos de uso, política de cookies
- [ ] Confirmar perfil de TikTok (LinkedIn ya se agregó)

---

## F · Se cierran solas

No requieren tarea propia: son consecuencia de terminar B y C.

- [ ] Mostrar funcionalidades solo cuando estén habilitadas
- [ ] Distinguir contenido nacional del local
- [ ] Arquitectura lista para nuevas herramientas y aperturas

---

## G · Migración del sitio actual (nuevo)

No está en el documento del cliente: aparece porque este sitio **reemplaza** al que opera hoy
el proveedor. Un reemplazo sin mapa de redirecciones es la forma más común de perder
posicionamiento de golpe.

- [ ] Inventario de URLs del sitio actual
- [ ] Mapa de redirecciones 301 hacia la arquitectura nueva
- [ ] **Sustituir los tres enlaces a `/servicios-old/`** — agenda de estudios, resultados en
      línea y referencia de pago viven en el sitio que vamos a reemplazar. Están enlazados de
      forma absoluta en `lib/site.ts` y dejan de funcionar el día del cambio.
- [ ] Decidir qué contenido migra, se consolida o se poda
- [ ] Medición antes y después del cambio

---

## El camino recomendado

**1. Esta semana, en paralelo:** ~~cerrar las tres decisiones del lote A~~ ✔, ~~mandar el correo
del lote E~~ (borrador listo en [CORREO-CLIENTE.md](CORREO-CLIENTE.md), falta enviarlo) y
~~arrancar la definición del CMS~~ ✔ ([CMS-ESPECIFICACION.md](CMS-ESPECIFICACION.md)).

**2. En cuanto lleguen las 25 sedes: `/hospitales`.** Es la ruta de mayor apalancamiento —
cierra 8 decisiones, arregla tres CTAs que hoy no llevan a ningún lado y completa la
navegación principal. Además obliga a dejar bien el modelo de datos del hospital, que es el
que después alimenta servicios, médicos, certificaciones y promociones.

**3. Geolocalización.** Es barata una vez que hay coordenadas y se reutiliza en tres lugares.
Cierra la brecha más incómoda que tiene hoy el sitio: prometer "más cercano" sin saber dónde
está el usuario.

**4. `/servicios`.** Es el que más contenido nuevo necesita, por eso va después: resuelve el
modelo servicio maestro ↔ información local que el documento describe con más detalle.

**5. Hubs y landings.** Al final, porque dependen de contenido que hoy no existe y su
arquitectura ya quedó definida.

### Qué no haría todavía

- **Esperar al CMS para construir rutas.** Retrasa todo sin ganar nada: los datos ya tienen la
  forma correcta en `lib/`.
- **Landing editorial de aseguradoras.** El documento dice explícitamente que no hay suficiente
  información diferenciada; basta el directorio funcional.
- **Landing nacional de certificaciones.** El documento la descarta por ahora.
- **Buscar reemplazos a las funciones que faltan.** La regla transversal es no mostrar
  funcionalidades que el usuario no puede completar: es preferible un CTA menos que uno que no
  lleva a ningún lado.
