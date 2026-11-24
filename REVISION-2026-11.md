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

**1. Aparece un tercer conteo de cobertura.** La semblanza dice *"25 hospitales operando en 21
ciudades"*. El documento de agosto decía 18 ciudades, y de las sedes cargadas salen 24
operativas en 23 municipios de 13 estados — Santa Fe todavía no abre. Para no contradecir al
resto del sitio, la página usa la cifra derivada de los datos (`COVERAGE`), igual que el
directorio de hospitales. **En cuanto el cliente confirme el número bueno, se cambia en un solo
lugar.**

**2. El CTA pedido no tenía funcionalidad detrás.** El documento pide *"Agendar reunión de 30
minutos"*, pero no existe herramienta de agenda comercial. Siguiendo la regla del documento de
arquitectura —no publicar CTAs que el usuario no pueda completar— el botón abre un correo a
`empresas@hospitalesmac.com` con asunto, para que el equipo comercial sepa de dónde viene.
Si se contrata una herramienta de agenda, se sustituye en `lib/site.ts`.

**3. Las cifras del caso de estudio necesitan respaldo por escrito.** La landing publica
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
