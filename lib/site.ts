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
 * Destinos que ya existen y funcionan en el ecosistema actual de Hospitales MAC.
 * Compilados desde hospitalesmac.com el 15-09-2026.
 *
 * Los tres de `servicios-old` viven dentro del sitio que este proyecto
 * reemplaza: al migrar hay que sustituirlos por rutas propias. Ver el lote G
 * de CHECKLIST.md.
 */
export const EXTERNAL = {
  preRegistro: "https://preregistro.hospitalesmac.com/",
  bolsaTrabajo: "https://bolsatrabajo.hospitalesmac.com/",
  inversionistas: "https://inversionistas.hospitalesmac.com/",
  portalMedicos: "https://medportal.hospitalesmac.app/login",
  agendaEstudios:
    "https://hospitalesmac.com/servicios-old/imagenologia/servicio/agenda-tus-estudios",
  resultadosEnLinea:
    "https://hospitalesmac.com/servicios-old/imagenologia/servicio/resultados-en-linea",
  referenciaPago:
    "https://hospitalesmac.com/servicios-old/financieros/servicio/generacion-referencia-bancaria",
  contactoEmpresas: "mailto:empresas@hospitalesmac.com",
  contactoMedicos: "mailto:doctores@hospitalesmac.com",
} as const;

/**
 * Perfiles vigentes según el sitio actual. El documento mencionaba también
 * Facebook y TikTok, que hoy no existen: pendiente de confirmar con el cliente.
 */
export const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/hospitalesmac_oficial/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/hospitales-mac" },
  { label: "X", href: "https://x.com/hospitalesmac" },
  { label: "YouTube", href: "https://www.youtube.com/user/HospitalesMAC" },
] as const;

/**
 * Rutas que el documento define pero que todavía no existen en el sitio.
 * Se centralizan aquí para que, al construirlas, no haya que buscar enlaces
 * sueltos por los componentes. Ver REVISION-2026-08.md.
 */
export const PENDING_ROUTE = "#";
