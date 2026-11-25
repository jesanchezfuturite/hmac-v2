# Segunda entrega de contenido — 17-11-2026

Documento *"Revisión web 17:11:26.docx"*, de Ana Robles (Hospitales MAC), recibido el 18-11-2026
vía Verónica Picón.

**No son cambios a lo construido: es contenido para dos páginas que seguían pendientes.**
Ambas estaban en el menú y el footer apuntando a `#`.

| Entrega | Resultado |
|---|---|
| SOMOS | Construida en [app/somos/page.tsx](app/somos/page.tsx) |
| EMPRESAS | Construida en [app/empresas/page.tsx](app/empresas/page.tsx) |
| "Soy paciente – en desarrollo" | Sigue pendiente, ahora confirmado por el cliente |
| "Soy médico – en desarrollo" | Sigue pendiente, ahora confirmado por el cliente |

## Qué se construyó

**`/somos`** — propósito, misión, visión, los siete comportamientos con su descripción y la
semblanza de Miguel Khoury como Fundador y Presidente. Texto transcrito tal cual, con una
excepción: ver la observación 1.

**`/empresas`** — la landing completa que entregó el cliente: titular y CTA, los tres problemas
que hoy enfrenta la empresa, el caso de estudio financiero con sus cifras, el comparativo sin
alianza / en alianza, el bloque antes-después, las tres razones y el cierre.

Quedan enlazadas desde el menú principal, el footer y el bloque de Empresas de la Home.

## Tres observaciones para consultar con Ana

**1. ~~Aparece un tercer conteo de cobertura.~~ RESUELTO el 25-11-2026.**

Ana definió la cifra oficial: **25 hospitales en 19 ciudades**. Sustituye a las "18 ciudades"
del documento de agosto y a las "21 ciudades" de la semblanza. Ya está aplicada en el Hero, el
directorio de hospitales y la semblanza, desde `NETWORK` en [lib/site.ts](lib/site.ts).

Los 25 incluyen Santa Fe, que todavía no abre, así que el directorio sigue mostrando 24 sedes
operativas más la próxima apertura: 24 + 1 = 25, sin contradicción. Por lo mismo se omitió la
palabra "operando" del texto original de la semblanza, que afirmaba que las 25 ya operan.

**2. El CTA pedido no tenía funcionalidad detrás.** *(En revisión: el 25-11-2026 Ana respondió
que lo está viendo con el equipo de empresas, junto con el punto 3.)* El documento pide *"Agendar reunión de 30
minutos"*, pero no existe herramienta de agenda comercial. Siguiendo la regla del documento de
arquitectura —no publicar CTAs que el usuario no pueda completar— el botón abre un correo a
`empresas@hospitalesmac.com` con asunto, para que el equipo comercial sepa de dónde viene.
Si se contrata una herramienta de agenda, se sustituye en `lib/site.ts`.

**3. Las cifras del caso de estudio necesitan respaldo por escrito.** *(En revisión con el
equipo de empresas desde el 25-11-2026.)* La landing publica
$24,502,450 de masa salarial, $245,024 de sobrecuota por prima de riesgo, $312,154 de pérdida
total estimada, 93% de ahorro y 70% de reducción en tiempos de espera; más los claims de
"calidad hospitalaria certificada" y "más de 50 especialidades". Vienen del cliente, así que se
asumen validados, pero son las afirmaciones más expuestas de todo el sitio y el documento de
agosto fue explícito en no publicar nada sin sustento. **Conviene dejar por escrito quién las
respalda.**

## Nota de transcripción

El documento marca "3 tiles" en el caso de estudio pero solo entrega dos pares de cifra y
etiqueta; el tercer texto es la conclusión sobre el accidente laboral. Se renderizan los dos
indicadores y la conclusión como nota destacada debajo.
