import { EXTERNAL } from "./site";

/**
 * Fuente única de información de hospitales — doc 4.1.9 y 5.2.12
 *
 * El hospital es una entidad única del sistema: la misma ficha alimenta el
 * localizador de la Home, el directorio de hospitales, el landing individual y
 * la experiencia de Urgencias 24/7. Esta estructura es la forma que debe
 * replicar el CMS; hoy vive en código como datos de trabajo.
 *
 * BORRADOR compilado el 15-09-2026 desde hospitalesmac.com (directorio de sedes
 * y ficha de cada hospital). Pendiente de validación por el cliente: ver las
 * observaciones en SEDES-BORRADOR.md.
 */

/** Funcionalidades digitales realmente habilitadas en la sede — doc 5.1.6.
 *  Nunca debe mostrarse un CTA cuya funcionalidad no esté activa para ese hospital. */
export interface HospitalFeatures {
  /** Cotización de cirugía con integración a CRM */
  quote: boolean;
  /** Agendamiento en línea de estudios de Imagenología */
  studyScheduling: boolean;
}

export interface HospitalService {
  /** Enlaza con la página nacional del servicio */
  slug: string;
  name: string;
  /** Resumen local: qué hay disponible aquí, no la descripción nacional del servicio */
  desc: string;
}

/** Naturaleza del servicio, con las tres categorías del documento (doc 3.4.6) */
export type ServiceCategory =
  | "Servicio de atención"
  | "Servicio diagnóstico"
  | "Procedimiento / alta especialidad";

export interface HospitalFacility {
  name: string;
  desc: string;
  /** Cuando la facilidad tiene una acción real, se aprovecha — doc 17.4 */
  cta?: { label: string; href: string };
}

export type HospitalStatus = "activo" | "proximamente";

export interface Hospital {
  slug: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  status: HospitalStatus;
  features: HospitalFeatures;
  /** Servicios destacados para la tarjeta del directorio */
  highlights: string[];
  services: HospitalService[];
  facilities: HospitalFacility[];
  /** Recorrido 360° de Google Street View; existe en ~13 de 25 sedes */
  tour360Url?: string;
  /** Fotografía representativa de la sede — doc 4.1.5. Pendiente del cliente:
   *  mientras no exista, la tarjeta usa un marcador neutro en vez de stock. */
  image?: string;
  /** Coordenadas para ordenar por cercanía y para /urgencias */
  geo?: Geo;
}

/**
 * Qué tan fina es la coordenada:
 *   exacta    — el geocodificador ubicó el número de la dirección
 *   calle     — solo la vialidad o la zona; puede desviarse cientos de metros
 *   localidad — únicamente el municipio; sirve para ordenar entre ciudades,
 *               no para distinguir sedes dentro de la misma
 */
export type GeoPrecision = "exacta" | "calle" | "localidad";

export interface Geo {
  lat: number;
  lng: number;
  precision: GeoPrecision;
}

/**
 * Catálogo maestro de servicios — doc 5.2.
 *
 * El contenido general del servicio se escribe una vez y se reutiliza; lo que
 * cambia por sede es la disponibilidad y, cuando exista CMS, la información
 * local (horarios, estudios, equipamiento, requisitos).
 */
export const SERVICE_CATALOG = {
  urgencias: {
    slug: "urgencias",
    name: "Urgencias 24/7",
    category: "Servicio de atención",
    desc: "Atención de urgencias las 24 horas, todos los días del año.",
    summary:
      "Atención médica de urgencia las 24 horas del día, todos los días del año, en las sedes que cuentan con el servicio.",
    includes: [],
    cta: { label: "Ver la sede más cercana", href: "/urgencias" },
  },
  imagenologia: {
    slug: "imagenologia",
    name: "Imagenología",
    category: "Servicio diagnóstico",
    desc: "Estudios de diagnóstico por imagen disponibles en esta sede.",
    summary:
      "Estudios de diagnóstico por imagen. Es el servicio para el que está disponible el agendamiento en línea.",
    includes: [
      "Mastografía",
      "Rayos X",
      "Resonancia magnética",
      "Tomografía",
      "Ultrasonido",
    ],
    cta: { label: "Agenda tu estudio", href: EXTERNAL.agendaEstudios },
  },
  laboratorio: {
    slug: "laboratorio-clinico",
    name: "Laboratorio Clínico",
    category: "Servicio diagnóstico",
    desc: "Análisis clínicos con entrega de resultados en línea.",
    summary:
      "Análisis clínicos con entrega de resultados en línea.",
    includes: [],
    cta: { label: "Consulta tus resultados", href: EXTERNAL.resultadosEnLinea },
  },
  medicinaNuclear: {
    slug: "medicina-nuclear",
    name: "Medicina Nuclear",
    category: "Servicio diagnóstico",
    desc: "Estudios de medicina nuclear disponibles en esta sede.",
    summary:
      "Estudios diagnósticos de medicina nuclear, disponibles en las sedes que cuentan con el servicio.",
    includes: ["Gammagrafía", "PET-CT"],
    cta: { label: "Encuentra tu hospital", href: "/hospitales" },
  },
  hospitalizacion: {
    slug: "hospitalizacion",
    name: "Hospitalización",
    category: "Servicio de atención",
    desc: "Áreas de hospitalización y cuidados intensivos.",
    summary:
      "Áreas de hospitalización y unidades de cuidados intensivos para adultos y recién nacidos.",
    includes: [
      "Hospitalización",
      "Cunero",
      "Cuidados intensivos para adultos",
      "Cuidados intermedios para adultos",
      "Cuidados intensivos neonatales",
      "Cuidados intermedios neonatales",
    ],
    cta: { label: "Encuentra tu hospital", href: "/hospitales" },
  },
  quirofanos: {
    slug: "quirofanos",
    name: "Quirófanos",
    category: "Procedimiento / alta especialidad",
    desc: "Salas de operaciones para procedimientos programados y de urgencia.",
    summary:
      "Salas para procedimientos quirúrgicos programados y de urgencia.",
    includes: [
      "Quirófanos",
      "Sala para procedimientos ambulatorios",
      "Salas de expulsión",
      "Salas de hemodinamia",
    ],
    cta: { label: "Encuentra tu hospital", href: "/hospitales" },
  },
  trasplantes: {
    slug: "trasplantes",
    name: "Trasplantes",
    category: "Procedimiento / alta especialidad",
    desc: "Programa de trasplantes en esta sede.",
    summary:
      "Programa de trasplantes, disponible en las sedes autorizadas para realizarlos.",
    includes: ["Córnea", "Hepático", "Renal"],
    cta: { label: "Encuentra tu hospital", href: "/hospitales" },
  },
  procuracionOrganos: {
    slug: "procuracion-de-organos",
    name: "Procuración de Órganos",
    category: "Procedimiento / alta especialidad",
    desc: "Programa de procuración de órganos.",
    summary: "Programa de procuración de órganos.",
    includes: [],
    cta: { label: "Encuentra tu hospital", href: "/hospitales" },
  },
  bancoSangre: {
    slug: "banco-de-sangre",
    name: "Banco de Sangre",
    category: "Procedimiento / alta especialidad",
    desc: "Banco de sangre disponible en esta sede.",
    summary: "Banco de sangre, disponible en las sedes que cuentan con el servicio.",
    includes: [],
    cta: { label: "Encuentra tu hospital", href: "/hospitales" },
  },
} as const;

export type ServiceKey = keyof typeof SERVICE_CATALOG;

/** Orden de preferencia para los servicios destacados de la tarjeta */
const HIGHLIGHT_ORDER: ServiceKey[] = [
  "urgencias",
  "imagenologia",
  "laboratorio",
  "quirofanos",
];

// Ninguna sede tiene todavía cotización con CRM ni agendamiento en línea.
const NO_DIGITAL_TOOLS: HospitalFeatures = { quote: false, studyScheduling: false };

interface HospitalSeed {
  slug: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  status?: HospitalStatus;
  services: ServiceKey[];
  geo: Geo;
}

/**
 * Las 25 sedes. Orden alfabético por nombre, como pide el documento (4.1.4).
 *
 * `services` refleja lo que cada ficha publica hoy: no todas las sedes ofrecen
 * lo mismo, y el documento es explícito en no homogeneizarlas.
 */
const SEED: HospitalSeed[] = [
  {
    slug: "aguascalientes-norte",
    name: "Hospital MAC Aguascalientes Norte",
    city: "Aguascalientes",
    state: "Aguascalientes",
    address: "Blvd. Luis Donaldo Colosio Murrieta No. 106, Col. Lomas del Campestre II, C.P. 20119, Aguascalientes, Ags.",
    phone: "+52 449 478 9000",
    geo: { lat: 21.92462, lng: -102.31636, precision: "exacta" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "medicinaNuclear"],
  },
  {
    slug: "aguascalientes-sur",
    name: "Hospital MAC Aguascalientes Sur",
    city: "Aguascalientes",
    state: "Aguascalientes",
    address: "República del Perú No. 102, Col. Las Américas, C.P. 20230, Aguascalientes, Ags.",
    phone: "+52 449 910 6120",
    geo: { lat: 21.8634, lng: -102.29813, precision: "exacta" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "boca-del-rio",
    name: "Hospital MAC Boca del Río",
    city: "Boca del Río",
    state: "Veracruz",
    address: "Calzada Juan Pablo II No. 1728, Col. Urban Center, C.P. 94294, Boca del Río, Ver.",
    phone: "+52 229 271 7000",
    geo: { lat: 19.1615, lng: -96.12236, precision: "calle" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "cdmx-perisur",
    name: "Hospital MAC CDMX Periférico Sur",
    city: "Coyoacán",
    state: "Ciudad de México",
    address: "Periférico Sur No. 5246, Col. Pedregal de Carrasco, C.P. 04700, Coyoacán, CDMX",
    phone: "+52 55 8000 7300",
    geo: { lat: 19.30288, lng: -99.17343, precision: "calle" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "celaya",
    name: "Hospital MAC Celaya",
    city: "Celaya",
    state: "Guanajuato",
    address: "Av. Ferrocarril Central No. 709, Int. Local C, Col. Los Laureles 1a Sección, C.P. 38020, Celaya, Gto.",
    phone: "+52 461 192 0900",
    geo: { lat: 20.52979, lng: -100.82993, precision: "exacta" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "medicinaNuclear", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "cuemanco",
    name: "Hospital MAC Cuemanco",
    city: "Tlalpan",
    state: "Ciudad de México",
    address: "Pabellón Cuemanco, Cañaverales No. 222, Col. Granjas Coapa, C.P. 14330, Tlalpan, CDMX",
    phone: "+52 55 8978 3400",
    geo: { lat: 19.28806, lng: -99.16697, precision: "localidad" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "ecatepec",
    name: "Hospital MAC Ecatepec",
    city: "Ecatepec",
    state: "Estado de México",
    address: "Av. Insurgentes No. 20, Fracc. Las Américas, C.P. 55075, Ecatepec, Edo. Méx.",
    phone: "+52 55 8311 9400",
    geo: { lat: 19.58652, lng: -98.99763, precision: "calle" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "guadalajara",
    name: "Hospital MAC Guadalajara",
    city: "Guadalajara",
    state: "Jalisco",
    address: "Av. Miguel Hidalgo y Costilla No. 930, Col. Centro, C.P. 44100, Guadalajara, Jal.",
    phone: "+52 33 3825 4365",
    geo: { lat: 20.67694, lng: -103.36528, precision: "calle" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "guanajuato",
    name: "Hospital MAC Guanajuato",
    city: "Guanajuato",
    state: "Guanajuato",
    // TODO: el sitio actual publica C.P. 99999, que no es un código postal real
    address: "Carretera Guanajuato - Juventino Rosas, Yerbabuena No. 139, Col. Yerbabuena, Guanajuato, Gto.",
    phone: "+52 473 176 0100",
    geo: { lat: 20.97033, lng: -101.28354, precision: "localidad" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "interlomas",
    name: "Hospital MAC Interlomas",
    city: "Huixquilucan",
    state: "Estado de México",
    address: "Pasaje Interlomas No. 16, Col. Centro Urbano San Fernando La Herradura, C.P. 52760, Huixquilucan, Edo. Méx.",
    phone: "+52 55 5225 0556",
    geo: { lat: 19.37722, lng: -99.29598, precision: "calle" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "irapuato",
    name: "Hospital MAC Irapuato",
    city: "Irapuato",
    state: "Guanajuato",
    address: "Dr. Javier Castellanos Coutiño No. 516, Col. San Pedro, C.P. 36520, Irapuato, Gto.",
    phone: "+52 462 622 8400",
    geo: { lat: 20.67609, lng: -101.37154, precision: "exacta" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "la-viga",
    name: "Hospital MAC La Viga",
    city: "Iztapalapa",
    state: "Ciudad de México",
    address: "Av. Calzada La Viga No. 1174, Col. El Triunfo, C.P. 09430, Iztapalapa, CDMX",
    phone: "+52 55 8978 3450",
    geo: { lat: 19.36055, lng: -99.12224, precision: "calle" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "leon",
    name: "Hospital MAC León",
    city: "León",
    state: "Guanajuato",
    address: "Blvd. Aeropuerto No. 101, Col. Villas Santa Julia, C.P. 37530, León, Gto.",
    phone: "+52 477 500 9500",
    geo: { lat: 21.08441, lng: -101.61374, precision: "exacta" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "lomas-verdes",
    name: "Hospital MAC Lomas Verdes",
    city: "Naucalpan de Juárez",
    state: "Estado de México",
    address: "Alexander Von Humboldt No. 88, Col. Lomas Verdes 3a Sección, C.P. 53125, Naucalpan de Juárez, Edo. Méx.",
    // TODO: el sitio actual publica aquí el número del Call Center Nacional
    phone: "+52 55 4169 8514",
    geo: { lat: 19.51439, lng: -99.2615, precision: "exacta" },
    // TODO: solo publica Imagenología. Confirmar si es unidad de imagen y no hospital
    services: ["imagenologia"],
  },
  {
    slug: "los-cabos",
    name: "Hospital MAC Los Cabos",
    city: "San José del Cabo",
    state: "Baja California Sur",
    address: "Plaza Koral Center, Carr. Transpeninsular Km 24.5, Col. Cerro Colorado, C.P. 23405, San José del Cabo, B.C.S.",
    phone: "+52 624 104 9300",
    geo: { lat: 23.00249, lng: -109.7321, precision: "calle" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "bancoSangre"],
  },
  {
    slug: "los-mochis",
    name: "Hospital MAC Los Mochis",
    city: "Los Mochis",
    state: "Sinaloa",
    address: "Blvd. Pioneros del Valle No. 1505 Poniente, Col. Ejido Benito Juárez, C.P. 81379, Los Mochis, Sin.",
    phone: "+52 668 500 4200",
    geo: { lat: 25.78366, lng: -108.97093, precision: "calle" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "merida",
    name: "Hospital MAC Mérida",
    city: "Mérida",
    state: "Yucatán",
    // TODO: el sitio actual publica "Col. Sin Nombre de Col 3"; falta la colonia real
    address: "Av. Correa Rachó No. 34, C.P. 97130, Mérida, Yuc.",
    phone: "+52 999 478 7100",
    geo: { lat: 21.01213, lng: -89.58256, precision: "exacta" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "mexicali",
    name: "Hospital MAC Mexicali",
    city: "Mexicali",
    state: "Baja California",
    address: "Av. Circuito Brasil No. 86-C, Col. Parque Industrial Álamo, C.P. 21210, Mexicali, B.C.",
    phone: "+52 686 565 7555",
    geo: { lat: 32.62453, lng: -115.4526, precision: "localidad" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "puebla",
    name: "Hospital MAC Puebla",
    city: "San Andrés Cholula",
    state: "Puebla",
    address: "Av. Periférico Ecológico No. 3507, Col. Reserva Territorial Atlixcáyotl, C.P. 72820, Tlaxcalancingo, Pue.",
    phone: "+52 222 214 1660",
    geo: { lat: 19.02032, lng: -98.26479, precision: "exacta" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "medicinaNuclear", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "queretaro",
    name: "Hospital MAC Querétaro",
    city: "Querétaro",
    state: "Querétaro",
    address: "Priv. Ignacio Zaragoza No. 16, Col. Centro, C.P. 76000, Querétaro, Qro.",
    phone: "+52 442 477 2222",
    geo: { lat: 20.58407, lng: -100.40025, precision: "exacta" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "bancoSangre"],
  },
  {
    slug: "san-miguel-de-allende",
    name: "Hospital MAC San Miguel de Allende",
    city: "San Miguel de Allende",
    state: "Guanajuato",
    address: "Camino a Alcocer No. 12, Col. Saltito de Guadalupe, C.P. 37745, San Miguel de Allende, Gto.",
    phone: "+52 415 150 3900",
    geo: { lat: 20.91305, lng: -100.73566, precision: "localidad" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "santa-fe",
    name: "Hospital MAC Santa Fe",
    city: "Cuajimalpa de Morelos",
    state: "Ciudad de México",
    address: "Vasco de Quiroga No. 4973, Col. La Ponderosa, C.P. 05370, Cuajimalpa de Morelos, CDMX",
    // El sitio actual publica aquí el número del Call Center Nacional
    phone: "+52 55 4169 8514",
    // El sitio actual la anuncia como PRÓXIMA GRAN APERTURA
    status: "proximamente",
    geo: { lat: 19.35443, lng: -99.2797, precision: "calle" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "tampico",
    name: "Hospital MAC Tampico",
    city: "Tampico",
    state: "Tamaulipas",
    address: "Av. Miguel Hidalgo No. 1900, Col. Altavista, C.P. 89240, Tampico, Tamps.",
    phone: "+52 833 213 0201",
    geo: { lat: 22.27011, lng: -97.89487, precision: "localidad" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "bancoSangre"],
  },
  {
    slug: "tijuana",
    name: "Hospital MAC Tijuana",
    city: "Tijuana",
    state: "Baja California",
    address: "Vía Rápida Oriente No. 15000, Int. H-01, Col. Chapultepec Alamar, C.P. 22110, Tijuana, B.C.",
    phone: "+52 664 478 3850",
    geo: { lat: 32.53648, lng: -117.03712, precision: "localidad" },
    // TODO: solo publica Imagenología. Confirmar si es unidad de imagen y no hospital
    services: ["imagenologia"],
  },
  {
    slug: "tlalnepantla",
    name: "Hospital MAC Tlalnepantla",
    city: "Tlalnepantla",
    state: "Estado de México",
    address: "Av. Dr. Gustavo Baz No. 309-TR A1, Col. La Loma, C.P. 54060, Tlalnepantla, Edo. Méx.",
    phone: "+52 55 8977 5100",
    geo: { lat: 19.54649, lng: -99.18994, precision: "localidad" },
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
];

export const HOSPITALS: Hospital[] = SEED.map((seed) => ({
  slug: seed.slug,
  name: seed.name,
  city: seed.city,
  state: seed.state,
  address: seed.address,
  phone: seed.phone,
  status: seed.status ?? "activo",
  geo: seed.geo,
  features: NO_DIGITAL_TOOLS,
  highlights: HIGHLIGHT_ORDER.filter((key) => seed.services.includes(key)).map(
    (key) => SERVICE_CATALOG[key].name
  ),
  services: seed.services.map((key) => ({
    slug: SERVICE_CATALOG[key].slug,
    name: SERVICE_CATALOG[key].name,
    desc: SERVICE_CATALOG[key].desc,
  })),
  // Pendiente: las facilidades no están publicadas en el sitio actual. La sección
  // se oculta mientras no haya datos por sede, en vez de inventar tarjetas.
  facilities: [],
}));

/** Sedes operativas. Una sede "próximamente" no debe aparecer con acciones que
 *  impliquen que ya recibe pacientes — doc 4.1.6 */
export const ACTIVE_HOSPITALS = HOSPITALS.filter((h) => h.status === "activo");

export const UPCOMING_HOSPITALS = HOSPITALS.filter((h) => h.status === "proximamente");

export type ServiceDefinition = (typeof SERVICE_CATALOG)[ServiceKey];

export const SERVICES: ServiceDefinition[] = Object.values(SERVICE_CATALOG);

export function getService(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

/** Sedes operativas donde el servicio está realmente disponible — doc 5.2.4 */
export function hospitalsWithService(slug: string): Hospital[] {
  return ACTIVE_HOSPITALS.filter((hospital) =>
    hospital.services.some((service) => service.slug === slug)
  );
}

/** Cobertura real derivada de los datos, para no publicar cifras sin sustento.
 *  TODO: el documento pide "25 hospitales en 18 ciudades"; con las sedes cargadas
 *  son 24 operativas en 23 municipios de 13 estados. Pendiente de validación
 *  del cliente (ver SEDES-BORRADOR.md). */
export const COVERAGE = {
  hospitals: ACTIVE_HOSPITALS.length,
  states: new Set(ACTIVE_HOSPITALS.map((h) => h.state)).size,
};

/** Búsqueda por ubicación del directorio — doc 4.1.2.
 *  Solo ubicación: no mezcla servicios, especialidades ni médicos. */
export function matchesLocation(hospital: Hospital, term: string): boolean {
  const normalize = (value: string) =>
    value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const needle = normalize(term.trim());
  if (!needle) return true;
  return normalize(
    `${hospital.name} ${hospital.city} ${hospital.state} ${hospital.address}`
  ).includes(needle);
}

export function getHospital(slug: string): Hospital | undefined {
  return HOSPITALS.find((hospital) => hospital.slug === slug);
}

/** Indicaciones de navegación hacia la sede. Misma lógica en localizador,
 *  Urgencias 24/7 y landing individual — doc 3.6.3 */
export function directionsUrl(hospital: Pick<Hospital, "name" | "address">) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${hospital.name} ${hospital.address}`
  )}`;
}
