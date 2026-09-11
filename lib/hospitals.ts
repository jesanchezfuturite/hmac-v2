/**
 * Fuente única de información de hospitales — doc 4.1.9 y 5.2.12
 *
 * El hospital es una entidad única del sistema: la misma ficha alimenta el
 * localizador de la Home, el directorio de hospitales, el landing individual y
 * la experiencia de Urgencias 24/7. Esta estructura es la forma que debe
 * replicar el CMS; hoy vive en código como datos de ejemplo.
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
}

// Ninguna sede tiene todavía cotización con CRM ni agendamiento en línea.
const NO_DIGITAL_TOOLS: HospitalFeatures = { quote: false, studyScheduling: false };

const COMMON_SERVICES: HospitalService[] = [
  { name: "Urgencias 24/7", desc: "Atención de urgencias todos los días del año." },
  { name: "Quirófanos", desc: "Procedimientos quirúrgicos programados y de urgencia." },
  { name: "Consulta Externa", desc: "Consultorios de médicos especialistas dentro del hospital." },
  { name: "Imagenología", desc: "Estudios de diagnóstico por imagen disponibles en esta sede." },
];

const COMMON_FACILITIES: HospitalFacility[] = [
  { name: "Cafetería", desc: "Servicio de alimentos y bebidas para pacientes y acompañantes." },
  { name: "Wi-Fi", desc: "Conexión disponible para pacientes y acompañantes." },
  { name: "Accesibilidad", desc: "Accesos adaptados para personas con movilidad reducida." },
  { name: "Estacionamiento", desc: "Estacionamiento para pacientes y visitantes." },
  { name: "Salas de espera", desc: "Áreas de espera para familiares y acompañantes." },
];

/** TODO: cargar las 25 sedes y las próximas aperturas desde CMS (doc 4.1.6) */
export const HOSPITALS: Hospital[] = [
  {
    slug: "aguascalientes-norte",
    name: "Hospital MAC Aguascalientes Norte",
    city: "Aguascalientes",
    state: "Aguascalientes",
    address: "Av. Universidad 1001, Col. San José del Arenal, Aguascalientes, Ags.",
    phone: "449 123 4567",
    status: "activo",
    features: NO_DIGITAL_TOOLS,
    highlights: ["Urgencias 24/7", "Imagenología", "Laboratorio"],
    services: COMMON_SERVICES,
    facilities: COMMON_FACILITIES,
  },
  {
    slug: "celaya",
    name: "Hospital MAC Celaya",
    city: "Celaya",
    state: "Guanajuato",
    address: "Av. Luis Donaldo Colosio 101, Col. Valle Hermoso, C.P. 38010, Celaya, Gto.",
    phone: "461 618 0800",
    status: "activo",
    features: NO_DIGITAL_TOOLS,
    highlights: ["Urgencias 24/7", "Imagenología", "Laboratorio", "Quirófanos"],
    services: [
      ...COMMON_SERVICES,
      { name: "Maternidad", desc: "Atención del embarazo, parto y recién nacido." },
      { name: "Terapia Intensiva", desc: "Cuidados intensivos para adultos y neonatales." },
    ],
    facilities: [
      ...COMMON_FACILITIES,
      { name: "Cajero automático", desc: "Ubicado en el área de recepción." },
    ],
  },
  {
    slug: "irapuato",
    name: "Hospital MAC Irapuato",
    city: "Irapuato",
    state: "Guanajuato",
    address: "Av. Reforma 3102, Col. Militar, Irapuato, Gto.",
    phone: "462 123 8900",
    status: "activo",
    features: NO_DIGITAL_TOOLS,
    highlights: ["Urgencias 24/7", "Laboratorio"],
    services: COMMON_SERVICES,
    facilities: COMMON_FACILITIES,
  },
  {
    slug: "puebla",
    name: "Hospital MAC Puebla",
    city: "Puebla",
    state: "Puebla",
    address: "Periférico Ecológico 3507, San Andrés Cholula, Pue.",
    phone: "222 123 7700",
    status: "activo",
    features: NO_DIGITAL_TOOLS,
    highlights: ["Urgencias 24/7", "Imagenología", "Quirófanos"],
    services: COMMON_SERVICES,
    facilities: COMMON_FACILITIES,
  },
  {
    slug: "leon",
    name: "Hospital MAC León",
    city: "León",
    state: "Guanajuato",
    address: "Blvd. Aeropuerto 1002, Col. Predio Santa Julia, León, Gto.",
    phone: "477 123 1100",
    status: "activo",
    features: NO_DIGITAL_TOOLS,
    highlights: ["Urgencias 24/7", "Imagenología", "Laboratorio"],
    services: COMMON_SERVICES,
    facilities: COMMON_FACILITIES,
  },
  {
    slug: "queretaro",
    name: "Hospital MAC Querétaro",
    city: "Querétaro",
    state: "Querétaro",
    address: "Blvd. Bernardo Quintana 2901, Col. Centro Sur, Querétaro, Qro.",
    phone: "442 123 2200",
    status: "activo",
    features: NO_DIGITAL_TOOLS,
    highlights: ["Urgencias 24/7", "Imagenología", "Quirófanos"],
    services: COMMON_SERVICES,
    facilities: COMMON_FACILITIES,
  },
];

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
