# Borrador de correo al cliente — información pendiente

> Documento de trabajo. Revisar y ajustar tono antes de enviar.
> Está agrupado por área para que cada punto llegue a quien puede resolverlo; si se envía en un
> solo correo, conviene poner en copia a los responsables de cada bloque.

---

**Asunto:** Hospitales MAC · Información requerida para continuar con el sitio web

Estimado [nombre]:

Ya incorporamos al sitio las definiciones del documento de arquitectura del 19 de agosto. De
las 166 decisiones que contiene, 113 quedaron aplicadas y verificadas; el resto depende de
información o validaciones que necesitamos de ustedes.

Las agrupamos por área para facilitar su atención. Cada bloque está ordenado por impacto: los
primeros puntos son los que hoy detienen trabajo.

---

## Marketing y Comunicación

**1. Directorio de sedes — adjunto para validación.** Armamos el borrador de las 25 sedes
—nombre, ciudad, dirección, teléfono y servicios— a partir de la información publicada hoy en
hospitalesmac.com. Solo necesitamos que lo validen y corrijan. Con eso construimos la página de
Hospitales, que es la principal pieza faltante de la navegación.

Al compilarlo surgieron varios puntos que requieren su confirmación:

- **Hospital MAC Santa Fe aparece como próxima apertura.** Lo cargamos con ese estatus y lo
  dejamos fuera del localizador, para no presentarlo como una sede que ya recibe pacientes.
- **Lomas Verdes y Tijuana publican únicamente el servicio de Imagenología**, sin urgencias,
  hospitalización ni quirófanos. ¿Son unidades de imagen y no hospitales? Cambia cómo se
  presentan y si cuentan dentro de la cifra de 25 hospitales.
- **Maternidad no aparece en ninguna ficha de sede**, aunque forma parte de la oferta. ¿En qué
  hospitales está disponible?
- **Datos por corregir:** Guanajuato publica el código postal 99999 y Mérida una colonia sin
  nombre. Lomas Verdes y Santa Fe muestran como teléfono el número del Call Center Nacional en
  lugar de una línea local.
- **Nombre comercial contra municipio.** Varias sedes llevan el nombre de la zona y no el del
  municipio: Puebla está en Tlaxcalancingo, Interlomas en Huixquilucan, Los Cabos en San José
  del Cabo. Necesitamos saber cuál prefieren mostrar al usuario.

**2. Próximas aperturas.** Qué sedes están por abrir y qué información es publicable de cada
una: ciudad, dirección, fecha estimada y servicios. El documento pide que convivan en el mismo
directorio con el distintivo "PRÓXIMAMENTE", y la arquitectura ya lo contempla.

**3. Fotografías por sede.** El documento establece que cada hospital debe mostrar fotografías
reales y actuales de esa unidad, sin imágenes de stock ni de otras sedes. Hoy la galería opera
con imágenes genéricas. Necesitamos fachada, lobby, habitaciones, áreas de atención y los
espacios que consideren relevantes.

**4. Recorridos 360°.** Las URLs de los recorridos existentes. Entendemos que están disponibles
en aproximadamente 13 de las 25 sedes; el módulo solo aparece en las que lo tengan.

**5. Logotipos de empresas con convenio.** Para el bloque de Empresas de la página principal.

**6. Redes sociales.** El sitio actual enlaza Instagram, LinkedIn, X y YouTube. El documento
mencionaba también Facebook y TikTok, que no aparecen hoy. Necesitamos confirmar cuáles perfiles
están vigentes para reflejarlos en el pie de página.

**7. Coordenadas de cada sede.** Latitud y longitud, o simplemente la ubicación exacta en Google
Maps de cada hospital. Son indispensables para ordenar los hospitales por cercanía y para la
experiencia de Urgencias, que debe identificar la sede más próxima al usuario.

---

## Comercial y Operaciones

**8. Validación de textos.** El documento pide no comunicar promesas que no correspondan al
alcance real del servicio. Retiramos del sitio las siguientes, y necesitamos saber cuáles
pueden reincorporarse y con qué redacción:

- En cotización de cirugía: "Presupuesto gratis", "Precios competitivos", "Respuesta en 24
  horas", "Conexión con especialistas", "Propuesta sin compromiso".
- En Call Center: "Orientación médica confiable", "Resolución inmediata de dudas", "Personal
  altamente capacitado".
- En el asistente de IA: "Atención instantánea", "Orientación médica", "Respuestas a cualquier
  pregunta".

**9. Alcance real del Call Center.** En particular, si su función es brindar información sobre
los servicios de Hospitales MAC o si incluye algún tipo de orientación médica. De ello depende
cómo se comunica en el sitio.

**10. Descripciones de certificaciones y reconocimientos.** El documento indica que deben ser
proporcionadas o validadas por Hospitales MAC. Redactamos versiones neutrales para cada una
—evitando afirmaciones como "máximos estándares" o "garantiza la calidad"— pero requieren su
validación, incluyendo el organismo que otorga cada reconocimiento y a qué sedes aplica.

**11. Red MAC 360°.** El texto con el que se explicará el distintivo a los usuarios que no
conozcan el programa, considerando que las condiciones de atención están sujetas al convenio
correspondiente.

**12. Cifras institucionales.** Los indicadores de la página principal dicen 25 hospitales,
18 ciudades y más de 3,000 médicos especialistas. Al cargar las sedes encontramos dos
diferencias que conviene resolver antes de publicarlos:

- Si Santa Fe todavía no abre, las sedes en operación son 24.
- Las 25 sedes se ubican en 24 municipios de 13 estados. La cifra de 18 ciudades solo funciona
  agrupando la zona metropolitana del Valle de México como una sola, y aun así requiere
  verificación.

---

## Legal

**13. Documentos legales.** Aviso de privacidad, términos de uso y política de cookies, para
enlazarlos desde el pie de página.

**14. Cédula profesional en el directorio médico.** La dejamos como campo opcional, visible
solo cuando esté cargada. Necesitamos saber si debe mostrarse siempre por requisitos de
publicidad sanitaria, ya que en ese caso un médico sin cédula registrada no podría publicarse.

**15. Leyenda de cobertura de aseguradoras.** Incorporamos la siguiente, sujeta a su revisión:
*"La cobertura y condiciones de atención dependen de las condiciones particulares de cada
póliza y de la autorización correspondiente de la aseguradora."*

---

## Sistemas y proveedores

**16. Herramienta de agendamiento de Imagenología.** Fecha estimada de liberación y forma de
integración. El sitio ya comunica "Agenda tu estudio" con la aclaración de que corresponde a
Imagenología, pero el botón no puede conectarse hasta contar con la herramienta.

**17. CRM.** Fecha estimada y responsable de la integración, para el flujo de cotización de
cirugía.

**18. Google Business Profile.** Autorización y accesos para integrar las reseñas públicas de
las fichas de cada hospital mediante la vía oficial. El documento descarta la extracción manual
de las fichas, por lo que requerimos el acceso correspondiente.

**19. Sitio actual.** Confirmación de que el sitio nuevo reemplaza al actual y acceso a su
inventario de URLs. Es indispensable para preparar el mapa de redirecciones y no perder el
posicionamiento que el dominio ya tiene.

---

## Qué destraba cada bloque

| Lo que recibimos | Lo que podemos construir |
|---|---|
| Validación del directorio de sedes | Página de Hospitales y búsqueda por ubicación |
| Coordenadas de cada sede | Orden por cercanía y experiencia de Urgencias 24/7 |
| Fotografías y recorridos 360° | Galerías reales en las 25 landings de sede |
| Validación de textos | Reincorporación de mensajes comerciales retirados |
| Accesos de Google | Reseñas reales con rotación entre sedes |
| Inventario de URLs | Mapa de redirecciones para conservar posicionamiento |

Quedamos atentos a sus comentarios.

Saludos cordiales,

[firma]
