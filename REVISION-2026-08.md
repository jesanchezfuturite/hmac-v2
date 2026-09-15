# Revisión de arquitectura — Hospitales MAC (documento del 19-08-2026)

Backlog de trabajo derivado de *"Documento de arquitectura y observaciones · Sitio Web 2026 —
Definiciones consolidadas de Home, Hospitales y Directorio Médico"*.

Cada decisión del documento queda aquí como una línea trazable: qué pide, dónde vive en el
repo y en qué estado está. El documento original sigue siendo la fuente; este archivo es el
mapa para ejecutarlo.

| Estado | Significado |
|---|---|
| ✅ | Aplicado en código y verificado |
| ◐ | Estructura aplicada, falta la funcionalidad real detrás |
| ⬜ | Pendiente: se puede hacer sin depender de terceros |
| 🔒 | Bloqueado por una dependencia externa (CMS, CRM, API, validación del cliente) |

---

## 0. Decisiones de criterio

### Confirmadas

**El teléfono es 55 4169 8514.** Confirmado por el cliente el 11-09-2026. Sustituye al
800 622 0800 que se había registrado en julio de 2026 como "canal oficial". Está aplicado y
centralizado en [lib/site.ts](lib/site.ts): franja superior, "¿Cómo podemos ayudarte?",
footer, botón flotante, asistente IA y blog toman el valor de ahí, así que un solo cambio lo
propaga a todo el sitio.

### Pendientes de tu confirmación

**1. Quité la sección de especialidades de la Home.**
`ServicesSection` mostraba 9 especialidades (Cardiología, Pediatría, Neurología…) bajo el
título "Servicios de alta especialidad". El documento, citando validación de Legal, prohíbe
exactamente eso: las especialidades son atributo del médico, no catálogo que MAC promocione, y
menciona por nombre los módulos "Especialidades disponibles" y "Servicios de alta
especialidad". Además el recorrido de Home que define el documento no incluye esa sección.
Está en el historial de git por si el cliente la quiere de vuelta en otra forma.

**2. Las reseñas de ejemplo siguen visibles, con aviso.**
El documento prohíbe testimonios ficticios. Como todavía no hay integración con Google, dejé
las tarjetas de ejemplo pero con un aviso visible de que es una vista previa. La alternativa
es esconder la sección hasta tener la API. **Tu decisión según a quién se le presente.**

**3. La cédula profesional quedó como campo opcional.**
No aparece en la lista de información obligatoria de la tarjeta de médico del documento, pero
tampoco pide quitarla y puede tener implicaciones en publicidad sanitaria. La dejé como campo
opcional que solo se muestra si viene cargado. **Confirmar con Legal.**

---

## 1. Principios transversales (doc §2)

| # | Decisión | Estado | Dónde |
|---|---|---|---|
| 2.1 | Información útil, concreta y accionable | ✅ | Copys reescritos en toda la Home |
| 2.2 | Mostrar funcionalidades solo cuando estén habilitadas | ◐ | CTAs sin destino apuntan a `PENDING_ROUTE` y están marcados con `TODO`; [lib/site.ts](lib/site.ts) |
| 2.3 | Distinguir contenido nacional del local de cada hospital | ◐ | [lib/hospitals.ts](lib/hospitals.ts) separa servicio maestro de información por sede |
| 2.4 | CMS que permita administrar por hospital sin desarrollo | 🔒 | No hay CMS. Las estructuras de datos ya tienen la forma que debe replicar |
| 2.5 | Arquitectura preparada para nuevas herramientas y aperturas | ◐ | `HospitalFeatures` y `HospitalStatus` en [lib/hospitals.ts](lib/hospitals.ts) |
| 2.6 | Mantener contexto entre Home, Hospitales, Servicios y Directorio | ✅ | Hospital → Directorio Médico filtrado por sede |
| 2.7 | No hacer promesas ni claims sin validar | ✅ | Ver §3.5 y §3.10 |

---

## 2. HOME

### 3.1 Franja superior / Utility Bar — [components/layout/TopBar.tsx](components/layout/TopBar.tsx)

| # | Decisión | Estado |
|---|---|---|
| 1 | Call Center Nacional 55 4169 8514 a la izquierda, clickeable en móvil | ✅ |
| 2 | "Portal de pacientes" → "Soy paciente" | ✅ |
| 3 | Incorporar "Soy médico" | ✅ |
| 4 | Mantener "Trabaja con nosotros" | ✅ |
| 5 | Eliminar "Facturación" | ✅ |
| 6 | Retirar "25 hospitales en México" | ✅ |
| 7 | "Soy paciente" y "Soy médico" deben llevar a un hub por perfil, no ser enlaces sueltos | ⬜ Faltan las rutas `/soy-paciente` y `/soy-medico` |

### 3.2 Barra de navegación — [components/layout/Header.tsx](components/layout/Header.tsx)

| # | Decisión | Estado |
|---|---|---|
| — | Estructura: Somos, Hospitales, Directorio médico, Servicios, Maternidad, Pre-registro | ✅ |
| 1 | Pre-registro como CTA destacado dentro de la navegación | ◐ Falta conectar con el flujo de pre-registro actual |
| 2 | "Agendar cita" → "Agenda tu estudio" | ✅ |
| 2b | El flujo debe aclarar que el agendamiento en línea es de Imagenología | 🔒 Depende de la herramienta en lanzamiento |
| 3 | "Urgencias 24/7" debe llevar a una experiencia accionable, no informativa | ✅ [/urgencias](app/urgencias/page.tsx): sede más cercana, distancia, llamar, cómo llegar y "¿Prefieres otro hospital?" |
| 4 | Retirar Blog de la navegación principal | ✅ La página `/blog` sigue existiendo; falta definir su ubicación |
| 5 | Separar navegación de CTAs permanentes | ✅ |

### 3.3 Hero — [components/home/HeroSearch.tsx](components/home/HeroSearch.tsx)

| # | Decisión | Estado |
|---|---|---|
| 1 | Eliminar "Red nacional de salud" | ✅ |
| 2 | H1: "Atención médica de alta especialidad, cerca de ti." | ✅ |
| 3 | Texto secundario nuevo, sin prometer agenda con especialistas | ✅ |
| 4 | Buscador unificado "¿Qué necesitas?" como acción principal | ◐ El campo existe y funciona; hoy resuelve al Directorio Médico. Falta que interprete hospital / especialista / servicio / estudio |
| 5 | Mantener "Buscar especialista" y "Buscar hospital" como accesos secundarios | ✅ Ahora con jerarquía visual menor que el buscador |
| 6 | Eliminar "Búsquedas frecuentes" | ✅ |
| 7 | Tres indicadores de confianza: 25 hospitales / 18 ciudades · Urgencias 24/7 · +3,000 médicos | ✅ Cifras pendientes de validación institucional |
| 8 | No agregar más elementos al Hero | ✅ |

### 3.4 Soluciones integrales para tu salud — [components/home/ServiceGrid.tsx](components/home/ServiceGrid.tsx)

| # | Decisión | Estado |
|---|---|---|
| 1 | Mantener el concepto y el título | ✅ |
| 2 | 1 servicio destacado + 2 secundarios, rotables | ✅ Estructura lista; la rotación necesita CMS |
| 3 | Rotación administrable (destacado, prioridad, vigencia, imagen, copy, CTA, URL) | 🔒 CMS |
| 4 | CTA contextual por servicio, no "Conoce más" | ✅ Maternidad → Agenda tu recorrido · Laboratorio → Conoce nuestros estudios · Imagenología → Agenda tu estudio |
| 5 | CTA final "Ver todos los servicios" al catálogo | ◐ Existe; falta la ruta `/servicios` |
| 6 | Distinguir atención / diagnóstico / procedimiento | ✅ Reemplacé los badges de claim ("Tecnología de punta") por la categoría del servicio |
| 7 | No confundir servicios con especialidades médicas | ✅ Ver decisión 2 del §0 |
| 8 | Jerarquía por intención y oportunidad, no por peso institucional | 🔒 CMS |

### 3.5 ¿Cómo podemos ayudarte? — [components/home/CommercialCTASection.tsx](components/home/CommercialCTASection.tsx)

| # | Decisión | Estado |
|---|---|---|
| — | Título "¿Cómo podemos ayudarte?" (antes "Tus opciones de servicio") | ✅ |
| — | Eliminar la tarjeta "Encuentra tu hospital" | ✅ |
| 1 | Cotiza tu cirugía: título, descripción y CTA textuales del documento | ✅ |
| 1b | Integración con CRM: solicitud → registro → CRM → seguimiento | 🔒 CRM sin liberar |
| 2 | Agenda tu estudio, comunicando que hoy es solo Imagenología | ◐ Copy aplicado; falta la herramienta |
| 3 | Call Center con el número nacional visible y clickeable | ✅ |
| 4 | Asistente IA como orientación, no sustituto de valoración médica | ✅ El CTA ahora abre el asistente en lugar de mostrar un `alert` |
| 5 | Eliminar "Todos nuestros canales están disponibles 24/7" | ✅ |
| — | **Claims retirados** hasta validación de Comercial / Operaciones / Legal | ✅ "Presupuesto gratis", "Precios competitivos", "Respuesta en 24 horas", "Conexión con especialistas", "Propuesta sin compromiso", "Orientación médica confiable", "Resolución inmediata de dudas", "Personal altamente capacitado", "Atención instantánea", "Soporte informativo completo" |

### 3.6 Encuentra tu Hospital MAC más cercano — [components/home/HospitalMap.tsx](components/home/HospitalMap.tsx)

| # | Decisión | Estado |
|---|---|---|
| 6.1 | Mantener estructura listado + mapa | ✅ |
| 1 | Eliminar la etiqueta "RED NACIONAL" | ✅ |
| 2 | "Más cercano" debe basarse en geolocalización, como recomendación no como restricción | ✅ Botón para ordenar por cercanía; sin permiso la sección sigue funcionando |
| 3 | Mantener "Cómo llegar" y que funcione igual en todo el sitio | ✅ Antes era un `alert`; ahora abre indicaciones reales. Lógica compartida en `directionsUrl()` |
| 4 | "Ver detalles" → landing completa del hospital | ✅ Renombrado a "Ver hospital" |
| 5 | Mantener "Ver todos los hospitales" | ✅ Lleva al directorio |
| — | Reutilizar esta misma lógica en Urgencias 24/7 | ✅ Una sola pieza en [lib/geo.ts](lib/geo.ts) y [lib/useUserLocation.ts](lib/useUserLocation.ts) |

### 3.7 Promociones — [components/home/PromotionsSlider.tsx](components/home/PromotionsSlider.tsx)

| # | Decisión | Estado |
|---|---|---|
| 7.1 | Mantener destacada + carrusel | ✅ |
| 1 | "Prepárate para cuidar de ti" → "Beneficios para cuidar tu salud" | ✅ |
| 2 | Retirar "aprovecha los mejores precios" | ✅ |
| 3 | "Solicitar información" → "Ver promoción" | ✅ |
| 4 | Plantilla de landing de promoción administrable | 🔒 Falta `/promociones/[slug]` + CMS |
| 5 | CTA contextual según la naturaleza de cada promoción | ◐ El campo `cta` ya es por promoción; hoy todas usan "Ver promoción" |
| 6 | Acceso al asistente IA desde la landing de promoción | ⬜ Depende de la landing |
| 7 | Call Center como canal de apoyo en la landing | ⬜ Depende de la landing |
| 8 | Nombre, vigencia y hospitales como texto, no dentro de la imagen | ✅ Las tarjetas del carrusel ya llevan nombre y CTA en texto |
| 9 | Promoción destacada administrable, no por fecha de creación | 🔒 CMS |

### 3.8 Lo que dicen nuestros pacientes — [components/home/GoogleReviewsSection.tsx](components/home/GoogleReviewsSection.tsx)

| # | Decisión | Estado |
|---|---|---|
| 1 | Eliminar el título "Recomendaciones" | ✅ |
| 2 | Reseñas reales de Google mediante integración oficial, con atribución | 🔒 Falta Google Business Profile / Places. Estructura y atribución ya puestas |
| 3 | Solo 4 y 5 estrellas, comunicado con transparencia | ✅ Copy aplicado; el filtro real depende de la API |
| 4 | Rotación nacional entre las 25 sedes | 🔒 Depende de la API |
| 5 | Mostrar el hospital de origen de cada reseña | ✅ |
| 6 | "¿Tuviste una experiencia positiva?" → "Cuéntanos sobre tu experiencia" | ✅ Con "Tu opinión nos ayuda a seguir mejorando" y CTA "Compartir mi experiencia" |
| 7 | El flujo debe identificar el hospital antes de enviar a Google | ✅ Selector de sede implementado; falta el `place_id` de cada ficha |
| 8 | Documentar fuente, método, actualización, límites de API | ⬜ Entregable de Futurite |
| 9 | No desalentar reseñas negativas | ✅ La invitación es neutral |

### 3.9 Beneficios y convenios — [components/home/InsurersGrid.tsx](components/home/InsurersGrid.tsx)

| # | Decisión | Estado |
|---|---|---|
| 1 | Unificar aseguradoras y empresas en un espacio, sin fusionarlas | ✅ |
| 2 | Concepto paraguas "Más opciones para cuidar tu salud" | ✅ |
| 3 | Bloque Aseguradoras con "Amplia cobertura nacional e internacional" y selección de logos | ✅ Home muestra 12 de 62 |
| 4 | "Ver todas las aseguradoras" debe llevar a un directorio, no expandir la Home | ◐ Hoy expande. Falta la ruta `/aseguradoras` con búsqueda |
| 4b | Leyenda legal: convenio ≠ cobertura garantizada | ✅ |
| 5 | Bloque Empresas con CTA "Conoce tus beneficios" | ✅ Sin logos: no hay material |
| 6 | Landing de beneficios para empresas | 🔒 Falta `/empresas` + CMS |
| 7 | No mezclar visualmente ambas experiencias | ✅ |
| 8 | Consistencia con "Soy paciente" | ⬜ Depende del hub |

### 3.10 Calidad que nos respalda — [components/home/CertsBadges.tsx](components/home/CertsBadges.tsx)

| # | Decisión | Estado |
|---|---|---|
| 1 | "Calidad Certificada" → "Calidad que nos respalda" | ✅ |
| 2 | Mantener estructura visual y carrusel, sin CTAs | ✅ |
| 3 | Contenido validado, sin "máximos estándares" / "obligatoria" / "garantiza" / "toda la red" | ✅ Descripciones reescritas. **Pendiente que MAC valide el texto final** |
| 4 | Administración por CMS con tipo, organismo, vigencia, estatus y hospitales | ◐ Ya se muestran tipo y organismo; falta CMS |
| 5 | Que cada landing de hospital muestre automáticamente los suyos | 🔒 CMS |
| 6 | Una sola fuente de información por reconocimiento | 🔒 CMS |
| 8 | No crear landing nacional de certificaciones | ✅ No se creó |

### 3.11 Footer — [components/layout/Footer.tsx](components/layout/Footer.tsx)

| # | Decisión | Estado |
|---|---|---|
| 1 | Cuatro columnas: Hospitales MAC · Soy paciente · Soy médico · Empresas | ✅ |
| 2 | Zona de contacto visible "¿Necesitas ayuda?" con el número nacional y "Llamar ahora" | ✅ |
| 3 | Descripción de marca alineada al lenguaje del sitio; agregar LinkedIn | ✅ Falta confirmar el perfil de TikTok |
| 4 | Zona institucional: Fundación, Inversionistas, Código de Ética, Trabaja con nosotros, Sala de prensa | ✅ |
| 5 | Línea legal: aviso de privacidad, términos, cookies, derechos reservados | ✅ Faltan los documentos |
| 6 | No convertirlo en un segundo menú principal | ✅ |
| 7 | Footer global, igual en todas las páginas | ✅ Ya lo era |
| 8 | No incluir Facturación ni herramientas no disponibles | ✅ |

### 3.12 Elementos flotantes — [components/floating/](components/floating/)

| # | Decisión | Estado |
|---|---|---|
| 1 | Eliminar el botón rojo de teléfono | ✅ |
| 2 | Sustituirlo por Call Center en verde, con el número nacional | ✅ En desktop revela el número al pasar el cursor; en móvil marca directo |
| 3 | Mantener el asistente IA | ✅ |
| 4 | Tres accesos con funciones diferenciadas: Urgencias / Call Center / Asistente | ✅ |
| 6 | Validar posición, distancia, accesibilidad por teclado y área táctil en todas las resoluciones | ⬜ Falta una pasada de QA responsive dedicada |

---

## 3. Directorio de Hospitales (doc §4)

**Construida el 15-09-2026** en [app/hospitales/page.tsx](app/hospitales/page.tsx), con las 24
sedes operativas, búsqueda por ubicación, mapa sincronizado y las próximas aperturas en su
propia sección. El menú, el footer, el Hero y el CTA del localizador ya apuntan aquí.

| # | Decisión | Estado |
|---|---|---|
| 1 | Encabezado "Encuentra tu Hospital MAC" + cobertura | ✅ La cifra se deriva de los datos: 24 hospitales en 13 estados, hasta que el cliente valide "25 en 18 ciudades" |
| 2 | Buscador por código postal, ciudad o estado, sin mezclar servicios ni médicos | ✅ |
| 3 | Las tarjetas visibles sin obligar a buscar | ✅ 24 operativas, más las próximas aperturas en su propia sección |
| 4 | Orden alfabético inicial | ✅ |
| 5 | Tarjeta con imagen, nombre, ciudad, dirección, servicios destacados, teléfono, "Ver hospital" y "Cómo llegar" | ◐ Todo salvo la fotografía: sin fotos reales se usa un marcador neutro, no stock |
| 6 | Próximas aperturas con identificador "PRÓXIMAMENTE" y sin acciones de sede operativa | ✅ Santa Fe, sin "Cómo llegar" ni "Ver hospital" |
| 8 | Mapa complementario sincronizado con la búsqueda | ✅ |
| 9 | Una sola fuente de información que alimente Home, directorio, landing y Urgencias | ✅ [lib/hospitals.ts](lib/hospitals.ts); migrar a CMS |

---

## 4. Landing individual de hospital (doc §5, 15-20) — [app/hospitales/[slug]/page.tsx](app/hospitales/[slug]/page.tsx)

### 5.1 Header

| # | Decisión | Estado |
|---|---|---|
| 1 | Eliminar la etiqueta "Sede hospitalaria" | ✅ |
| 2 | Dirección clickeable que abre navegación; sin botón "Cómo llegar" aparte | ✅ |
| 3 | Eliminar el CTA de Call Center del header | ✅ |
| 4 | CTAs dinámicos según funcionalidades de la sede (4 casos del documento) | ✅ `headerCtas()` implementa los cuatro |
| 4b | El buscador contextual debe ser funcionalidad real | ✅ [HospitalContextSearch.tsx](components/hospital/HospitalContextSearch.tsx) busca en servicios, facilidades y médicos de esa sede |
| 5 | Prioridad conversión → información → exploración | ✅ |
| 6 | Disponibilidad de CTAs administrable por hospital | ◐ `HospitalFeatures` en código; falta CMS |
| 7 | Nunca mostrar un CTA cuya funcionalidad no esté habilitada | ✅ Todas las sedes están hoy en "sin herramientas", por eso muestran el buscador |

### 5.2 Servicios: nacional vs. hospital

| # | Decisión | Estado |
|---|---|---|
| 1 | Diferenciar Servicios de Especialidades (validación de Legal) | ✅ Ver decisión 2 del §0 |
| 2 | "Servicios" del menú → directorio nacional de servicios | ⬜ Falta `/servicios` |
| 3 | Página nacional por servicio, reutilizable | ⬜ Falta `/servicios/[slug]` |
| 4 | Asociar cada servicio con los hospitales donde está disponible | ◐ Hoy la relación vive en el hospital; falta la entidad Servicio |
| 5 | "Servicios locales" → "Servicios disponibles en este hospital" | ✅ |
| 6 | Tarjetas locales con resumen + acción, no la descripción nacional completa | ✅ |
| 7 | No duplicar contenido entre hospital y servicio | ◐ Se respeta; se consolida al crear la entidad Servicio |
| 8-9 | Información y equipamiento específicos por sede | 🔒 CMS |
| 10 | Conservar el contexto de la sede al entrar a un servicio | ⬜ |
| 12 | Estructura CMS: Servicio, Hospital y relación Servicio↔Hospital | 🔒 CMS |

### 15-20 Resto de la página

| # | Decisión | Estado |
|---|---|---|
| 15.1 | Eliminar el eyebrow "GALERÍA" | ✅ |
| 15.3 | Solo fotografías reales y actuales de esa sede | 🔒 Faltan las fotos; hoy hay imágenes genéricas |
| 15.5 | Títulos descriptivos sin claims | ✅ "Suites privadas con tecnología de punta" → "Habitaciones privadas"; "Quirófanos de última generación" → "Quirófanos" |
| 15.6-7 | Galería administrable y visor con navegación | ◐ El visor ya existe; falta CMS |
| 16 | Recorrido 360° como módulo independiente, solo donde exista | ✅ [HospitalTour360.tsx](components/hospital/HospitalTour360.tsx), se muestra solo si la sede tiene `tour360Url`. Faltan las URLs (≈13 de 25) |
| 17.1 | "Servicios complementarios" → "Facilidades para tu estancia" | ✅ [HospitalFacilities.tsx](components/hospital/HospitalFacilities.tsx) |
| 17.3 | Modular: no homogeneizar sedes ni rellenar plantilla | ✅ La sección se oculta si la sede no tiene facilidades |
| 17.4 | CTA solo donde hay acción real (ver menú, ver canales, ver ubicación) | ✅ Campo `cta` opcional por facilidad |
| 17.5 | Entretenimiento en habitación como facilidad específica | ⬜ Falta el dato por sede |
| 18.1 | "Especialistas disponibles en X" → "Médicos en Hospital MAC X" | ✅ |
| 18.2 | Cuatro médicos como muestra | ✅ |
| 18.4 | "Ver todos los médicos de la sede" → "Ver médicos de este hospital", con el directorio ya filtrado | ✅ Verificado |
| 18.5 | No mostrar la sección si no hay médicos publicables | ✅ |
| 18.6 | No prometer agenda médica | ✅ |
| 19 | Ubicación como sección independiente al final, con mapa, dirección y teléfono | ✅ |
| 20 | Orden: header → servicios → instalaciones → 360° → facilidades → médicos → ubicación | ✅ |
| 11 | Plantilla dinámica, no páginas independientes | ✅ |

---

## 5. Directorio Médico (doc §16) — [app/directorio-medico/page.tsx](app/directorio-medico/page.tsx) · [DoctorCard.tsx](components/shared/DoctorCard.tsx)

| # | Decisión | Estado |
|---|---|---|
| 1 | Mantener el nombre "Directorio Médico" | ✅ |
| 2 | Tarjeta completa: nombre, especialidad, subespecialidad, hospitales, consultorio, teléfono, Red MAC 360°, hasta 3 etiquetas | ✅ |
| 2b | CTA "Llamar al consultorio" que marca directo | ✅ |
| 3 | No crear perfiles médicos extensos | ✅ Se eliminaron semblanza y campos editoriales |
| 4 | La fotografía no es requisito para publicar | ✅ La tarjeta funciona con iniciales |
| 5 | Relación médico↔hospital muchos a muchos | ✅ `DoctorHospital[]` |
| 5.1 | Consultorio y teléfono pertenecen a la relación, no al médico | ✅ |
| 5.2 | Hospital principal se muestra primero | ✅ |
| 5.3 | Orden por cercanía respetando el hospital principal | ⬜ La pieza de geolocalización ya existe; falta llevarla a la tarjeta de médico. El documento lo plantea como opcional |
| 5.4 | "Ver más hospitales" sin alargar la tarjeta | ✅ |
| 5.5 | Campos opcionales: no mostrar vacíos ni sustituir por el teléfono del hospital | ✅ |
| 6 | 1 especialidad principal + 0/1 subespecialidad | ✅ |
| 7 | Catálogos maestros de especialidades administrables | 🔒 CMS |
| 8-10 | "Qué atiende" como taxonomía independiente, catálogo controlado, máximo 3 etiquetas | ✅ en la tarjeta · 🔒 el catálogo |
| 11 | Preparar búsqueda futura por "Qué atiende" | ✅ El dato ya está estructurado |
| 12 | Red MAC 360°: atributo, badge, filtro y explicación contextual | ✅ Verificado. **Texto pendiente de validar con Comercial y Legal** |
| 13 | Filtros: nombre, especialidad, hospital, Red MAC 360° | ✅ |
| 14 | Filtros combinables con lógica AND | ✅ |
| 15 | Filtros dinámicos que no ofrezcan combinaciones vacías | ✅ La especialidad se limita a la sede seleccionada |
| 16 | Navegación con contexto entre hospital y directorio | ✅ |
| 17-18 | CMS con alta individual y carga masiva por Excel/CSV que actualice por ID único | 🔒 Requisito funcional prioritario. El `id` (`MAC-0001`) ya es la llave |
| 19 | Estructura de datos: Médico, Hospital, relación, catálogos | ✅ [lib/doctors.ts](lib/doctors.ts) |

---

## 6. Dependencias externas

| Dependencia | Bloquea | Quién |
|---|---|---|
| CMS | Rotación de servicios, promociones, certificaciones por sede, galerías, facilidades, directorio médico, próximas aperturas | Definición conjunta |
| CRM | "Cotiza tu cirugía" de punta a punta | Cliente |
| Herramienta de agendamiento de Imagenología | "Agenda tu estudio" en nav, Home, servicios y landings | Cliente (en lanzamiento) |
| Google Business Profile / Places | Reseñas reales, rotación entre sedes, `place_id` para "Compartir mi experiencia" | Futurite documenta, cliente autoriza |
| Datos reales | 25 sedes, fotos por hospital, URLs de recorrido 360°, logos de empresas, listado de médicos | Cliente |
| Validación de claims | Descripciones de certificaciones, texto de Red MAC 360°, promesas de Call Center y asistente | Comercial / Operaciones / Legal |
| Documentos legales | Aviso de privacidad, términos, cookies | Cliente |

---

## 7. Rutas que el documento exige y todavía no existen

```
/hospitales              Directorio de las 25 sedes + buscador por ubicación + próximas aperturas
/servicios               Catálogo nacional de servicios
/servicios/[slug]        Página nacional por servicio, con hospitales donde está disponible
/urgencias               Hospital más cercano por geolocalización, con opción de cambiar de sede
/promociones/[slug]      Landing de promoción administrable
/soy-paciente            Hub de servicios digitales para pacientes
/soy-medico              Hub de recursos para médicos
/empresas                Beneficios para colaboradores por convenio
/aseguradoras            Directorio funcional de aseguradoras
```

Mientras no existan, sus CTAs apuntan a `PENDING_ROUTE` y están marcados con `TODO` en el
código, con la referencia al punto del documento que los pide.

---

## 8. Orden sugerido para lo que sigue

1. **Confirmar las tres decisiones pendientes del §0** (especialidades en Home, reseñas de
   ejemplo, cédula profesional).
2. **Definir el CMS.** Es la dependencia que bloquea más decisiones y la que el documento
   marca como requisito funcional prioritario en el Directorio Médico.
3. **Construir `/hospitales`** con las 25 sedes y las próximas aperturas: desbloquea la
   navegación principal, el CTA del localizador y el footer.
4. **Geolocalización**, una sola vez, reutilizada en el localizador, en `/urgencias` y en el
   orden por cercanía del Directorio Médico.
5. **`/servicios` y `/servicios/[slug]`**, que resuelven el modelo servicio maestro ↔ sede.
6. **Hubs `/soy-paciente` y `/soy-medico`** y la landing de promociones.
7. **Integración con Google** para las reseñas.

---

## Nota técnica

El build falla si `OPENAI_API_KEY` no está definida: [app/api/chat/route.ts](app/api/chat/route.ts)
instancia el cliente de OpenAI a nivel de módulo, y Next lo evalúa al recolectar las rutas.
Es un problema previo a esta revisión y no lo toqué, pero conviene inicializar el cliente
dentro del handler para que compilar no dependa de un secreto.
