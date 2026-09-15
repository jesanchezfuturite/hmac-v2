# Borrador de las 25 sedes — para validación del cliente

Compilado el 15-09-2026 desde `hospitalesmac.com`: el directorio de sedes y la ficha individual
de cada hospital. Cargado en [lib/hospitals.ts](lib/hospitals.ts).

Se tomó de cada sede: nombre, ciudad, estado, dirección, teléfono y los servicios que su propia
ficha publica hoy. **Todo requiere validación**, pero especialmente los diez puntos de abajo.

## Lo que sí quedó cargado

- Las 25 sedes, en orden alfabético como pide el documento.
- Dirección y teléfono de cada una.
- **Servicios reales por sede**, que varían entre hospitales — exactamente lo que el documento
  anticipa al pedir que no se homogeneicen las sedes. Van de 8 servicios (Celaya, Puebla) a
  uno solo (Lomas Verdes, Tijuana).

## Lo que no se pudo obtener del sitio actual

| Falta | Consecuencia |
|---|---|
| Coordenadas por sede | Sin ellas no hay orden por cercanía ni experiencia de Urgencias |
| Facilidades por sede | La sección "Facilidades para tu estancia" se oculta en vez de inventar tarjetas |
| URLs de recorridos 360° | El módulo no aparece en ninguna sede |
| Fotografías por sede | La galería sigue con imágenes genéricas |

---

## Diez cosas que hay que preguntarle al cliente

**1. Santa Fe no está operando.** El sitio actual la anuncia como *PRÓXIMA GRAN APERTURA*. La
cargamos con estatus `proximamente` y la sacamos del localizador de la Home, porque el
documento prohíbe que una sede por abrir aparezca con acciones de sede operativa.

**2. Entonces son 24 hospitales operando, no 25.** El Hero, el Directorio y el correo dicen
"25 hospitales". Si Santa Fe todavía no abre, la cifra incluye una sede no operativa. Hay que
decidir cómo se comunica.

**3. "18 ciudades" no cuadra con los datos.** Las 25 sedes están en 24 municipios distintos de
13 estados. El número 18 solo funciona agrupando la zona metropolitana del Valle de México
como una sola ciudad, y aun así hay que verificarlo. Es una cifra que aparece en el Hero y en
el encabezado del directorio.

**4. Lomas Verdes y Tijuana publican únicamente Imagenología.** Sin urgencias, hospitalización
ni quirófanos. ¿Son unidades de imagen y no hospitales? Cambia cómo se presentan y si deben
contar dentro de "25 hospitales".

**5. Guanajuato tiene C.P. 99999**, que no es un código postal real. Lo omitimos de la
dirección hasta tener el correcto.

**6. Mérida publica "Col. Sin Nombre de Col 3"**, claramente un residuo de captura. Omitimos
la colonia.

**7. Lomas Verdes y Santa Fe publican como teléfono el número del Call Center Nacional**
(55 4169 8514), no un número local. ¿Es correcto o falta el teléfono de la sede?

**8. Nombres de ciudad contra municipio.** Varias sedes llevan el nombre comercial de la zona y
no el del municipio: Puebla está en Tlaxcalancingo (San Andrés Cholula), Interlomas en
Huixquilucan, Los Cabos en San José del Cabo, Cuemanco en Tlalpan, La Viga en Iztapalapa,
CDMX Periférico Sur en Coyoacán. Hay que decidir qué se muestra al usuario en la tarjeta.

**9. Falta Maternidad como servicio.** Ninguna ficha del sitio actual la publica, aunque el
sitio nuevo tiene una landing de Maternidad y el documento la lista entre los servicios. ¿En
qué sedes está disponible?

**10. Los servicios se tomaron de la ficha pública.** Si una sede ofrece algo que su ficha no
lista, hoy no aparece. Conviene que cada dirección médica revise su lista.

---

## Hallazgo aparte: destinos reales para CTAs que hoy no llevan a ningún lado

El sitio actual ya expone URLs que el sitio nuevo tiene como pendientes:

| Destino | URL |
|---|---|
| Pre-registro | `https://preregistro.hospitalesmac.com/` |
| Trabaja con nosotros | `https://bolsatrabajo.hospitalesmac.com/` |
| Inversionistas | `https://inversionistas.hospitalesmac.com/` |
| Portal de médicos | `https://medportal.hospitalesmac.app/login` |
| Agenda tus estudios | `/servicios-old/imagenologia/servicio/agenda-tus-estudios` |
| Resultados en línea | `/servicios-old/imagenologia/servicio/resultados-en-linea` |
| Referencia de pago | `/servicios-old/financieros/servicio/generacion-referencia-bancaria` |
| Contacto empresas | `empresas@hospitalesmac.com` |
| Contacto médicos | `doctores@hospitalesmac.com` |

Las tres primeras son subdominios independientes y se pueden enlazar tal cual. Las tres de
`/servicios-old/` viven dentro del sitio que vamos a reemplazar, así que hay que decidir si se
migran o se enlazan temporalmente.

**Redes sociales:** el sitio actual tiene Instagram, LinkedIn, X y YouTube. **No tiene Facebook
ni TikTok**, que el documento daba por supuestos. El footer hay que ajustarlo a lo que existe.
