/**
 * Fuente única de los datos institucionales del sitio.
 *
 * El documento de arquitectura (19-08-2026) exige que el Call Center Nacional
 * sea el mismo número en franja superior, "¿Cómo podemos ayudarte?", footer,
 * botón flotante y landings de promoción. Cualquier cambio se hace aquí.
 *
 * El número vigente es 55 4169 8514, confirmado por el cliente el 11-09-2026.
 * Sustituye al 800 622 0800 que se había registrado en julio de 2026.
 */
export const CALL_CENTER = {
  /** Formato de lectura para pantalla */
  display: "55 4169 8514",
  /** Formato marcable (href tel:) */
  tel: "+525541698514",
  label: "Call Center Nacional",
} as const;

/**
 * Indicadores de confianza del Hero y del Directorio de Hospitales.
 * Cifras pendientes de validación contra la información institucional oficial.
 */
export const NETWORK = {
  hospitals: 25,
  cities: 18,
  doctors: "+3,000",
} as const;

/**
 * Rutas que el documento define pero que todavía no existen en el sitio.
 * Se centralizan aquí para que, al construirlas, no haya que buscar enlaces
 * sueltos por los componentes. Ver REVISION-2026-08.md.
 */
export const PENDING_ROUTE = "#";
