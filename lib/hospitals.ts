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
  name: string;
  /** Resumen local: qué hay disponible aquí, no la descripción nacional del servicio */
  desc: string;
}

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
  /** Necesarias para ordenar por cercanía y para /urgencias. Pendientes. */
  lat?: number;
  lng?: number;
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
    name: "Urgencias 24/7",
    desc: "Atención de urgencias las 24 horas, todos los días del año.",
  },
  imagenologia: {
    name: "Imagenología",
    desc: "Estudios de diagnóstico por imagen disponibles en esta sede.",
  },
  laboratorio: {
    name: "Laboratorio Clínico",
    desc: "Análisis clínicos con entrega de resultados en línea.",
  },
  quirofanos: {
    name: "Quirófanos",
    desc: "Salas de operaciones para procedimientos programados y de urgencia.",
  },
  hospitalizacion: {
    name: "Hospitalización",
    desc: "Áreas de hospitalización y cuidados intensivos.",
  },
  medicinaNuclear: {
    name: "Medicina Nuclear",
    desc: "Estudios de medicina nuclear disponibles en esta sede.",
  },
  trasplantes: {
    name: "Trasplantes",
    desc: "Programa de trasplantes en esta sede.",
  },
  procuracionOrganos: {
    name: "Procuración de Órganos",
    desc: "Programa de procuración de órganos.",
  },
  bancoSangre: {
    name: "Banco de Sangre",
    desc: "Banco de sangre disponible en esta sede.",
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
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "medicinaNuclear"],
  },
  {
    slug: "aguascalientes-sur",
    name: "Hospital MAC Aguascalientes Sur",
    city: "Aguascalientes",
    state: "Aguascalientes",
    address: "República del Perú No. 102, Col. Las Américas, C.P. 20230, Aguascalientes, Ags.",
    phone: "+52 449 910 6120",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "boca-del-rio",
    name: "Hospital MAC Boca del Río",
    city: "Boca del Río",
    state: "Veracruz",
    address: "Calzada Juan Pablo II No. 1728, Col. Urban Center, C.P. 94294, Boca del Río, Ver.",
    phone: "+52 229 271 7000",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "cdmx-perisur",
    name: "Hospital MAC CDMX Periférico Sur",
    city: "Coyoacán",
    state: "Ciudad de México",
    address: "Periférico Sur No. 5246, Col. Pedregal de Carrasco, C.P. 04700, Coyoacán, CDMX",
    phone: "+52 55 8000 7300",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "celaya",
    name: "Hospital MAC Celaya",
    city: "Celaya",
    state: "Guanajuato",
    address: "Av. Ferrocarril Central No. 709, Int. Local C, Col. Los Laureles 1a Sección, C.P. 38020, Celaya, Gto.",
    phone: "+52 461 192 0900",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "medicinaNuclear", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "cuemanco",
    name: "Hospital MAC Cuemanco",
    city: "Tlalpan",
    state: "Ciudad de México",
    address: "Pabellón Cuemanco, Cañaverales No. 222, Col. Granjas Coapa, C.P. 14330, Tlalpan, CDMX",
    phone: "+52 55 8978 3400",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "ecatepec",
    name: "Hospital MAC Ecatepec",
    city: "Ecatepec",
    state: "Estado de México",
    address: "Av. Insurgentes No. 20, Fracc. Las Américas, C.P. 55075, Ecatepec, Edo. Méx.",
    phone: "+52 55 8311 9400",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "guadalajara",
    name: "Hospital MAC Guadalajara",
    city: "Guadalajara",
    state: "Jalisco",
    address: "Av. Miguel Hidalgo y Costilla No. 930, Col. Centro, C.P. 44100, Guadalajara, Jal.",
    phone: "+52 33 3825 4365",
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
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "interlomas",
    name: "Hospital MAC Interlomas",
    city: "Huixquilucan",
    state: "Estado de México",
    address: "Pasaje Interlomas No. 16, Col. Centro Urbano San Fernando La Herradura, C.P. 52760, Huixquilucan, Edo. Méx.",
    phone: "+52 55 5225 0556",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "irapuato",
    name: "Hospital MAC Irapuato",
    city: "Irapuato",
    state: "Guanajuato",
    address: "Dr. Javier Castellanos Coutiño No. 516, Col. San Pedro, C.P. 36520, Irapuato, Gto.",
    phone: "+52 462 622 8400",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "la-viga",
    name: "Hospital MAC La Viga",
    city: "Iztapalapa",
    state: "Ciudad de México",
    address: "Av. Calzada La Viga No. 1174, Col. El Triunfo, C.P. 09430, Iztapalapa, CDMX",
    phone: "+52 55 8978 3450",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "leon",
    name: "Hospital MAC León",
    city: "León",
    state: "Guanajuato",
    address: "Blvd. Aeropuerto No. 101, Col. Villas Santa Julia, C.P. 37530, León, Gto.",
    phone: "+52 477 500 9500",
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
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "bancoSangre"],
  },
  {
    slug: "los-mochis",
    name: "Hospital MAC Los Mochis",
    city: "Los Mochis",
    state: "Sinaloa",
    address: "Blvd. Pioneros del Valle No. 1505 Poniente, Col. Ejido Benito Juárez, C.P. 81379, Los Mochis, Sin.",
    phone: "+52 668 500 4200",
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
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "mexicali",
    name: "Hospital MAC Mexicali",
    city: "Mexicali",
    state: "Baja California",
    address: "Av. Circuito Brasil No. 86-C, Col. Parque Industrial Álamo, C.P. 21210, Mexicali, B.C.",
    phone: "+52 686 565 7555",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "puebla",
    name: "Hospital MAC Puebla",
    city: "San Andrés Cholula",
    state: "Puebla",
    address: "Av. Periférico Ecológico No. 3507, Col. Reserva Territorial Atlixcáyotl, C.P. 72820, Tlaxcalancingo, Pue.",
    phone: "+52 222 214 1660",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "medicinaNuclear", "trasplantes", "procuracionOrganos"],
  },
  {
    slug: "queretaro",
    name: "Hospital MAC Querétaro",
    city: "Querétaro",
    state: "Querétaro",
    address: "Priv. Ignacio Zaragoza No. 16, Col. Centro, C.P. 76000, Querétaro, Qro.",
    phone: "+52 442 477 2222",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "bancoSangre"],
  },
  {
    slug: "san-miguel-de-allende",
    name: "Hospital MAC San Miguel de Allende",
    city: "San Miguel de Allende",
    state: "Guanajuato",
    address: "Camino a Alcocer No. 12, Col. Saltito de Guadalupe, C.P. 37745, San Miguel de Allende, Gto.",
    phone: "+52 415 150 3900",
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
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion"],
  },
  {
    slug: "tampico",
    name: "Hospital MAC Tampico",
    city: "Tampico",
    state: "Tamaulipas",
    address: "Av. Miguel Hidalgo No. 1900, Col. Altavista, C.P. 89240, Tampico, Tamps.",
    phone: "+52 833 213 0201",
    services: ["urgencias", "imagenologia", "laboratorio", "quirofanos", "hospitalizacion", "bancoSangre"],
  },
  {
    slug: "tijuana",
    name: "Hospital MAC Tijuana",
    city: "Tijuana",
    state: "Baja California",
    address: "Vía Rápida Oriente No. 15000, Int. H-01, Col. Chapultepec Alamar, C.P. 22110, Tijuana, B.C.",
    phone: "+52 664 478 3850",
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
  features: NO_DIGITAL_TOOLS,
  highlights: HIGHLIGHT_ORDER.filter((key) => seed.services.includes(key)).map(
    (key) => SERVICE_CATALOG[key].name
  ),
  services: seed.services.map((key) => ({ ...SERVICE_CATALOG[key] })),
  // Pendiente: las facilidades no están publicadas en el sitio actual. La sección
  // se oculta mientras no haya datos por sede, en vez de inventar tarjetas.
  facilities: [],
}));

/** Sedes operativas. Una sede "próximamente" no debe aparecer con acciones que
 *  impliquen que ya recibe pacientes — doc 4.1.6 */
export const ACTIVE_HOSPITALS = HOSPITALS.filter((h) => h.status === "activo");

export const UPCOMING_HOSPITALS = HOSPITALS.filter((h) => h.status === "proximamente");

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
