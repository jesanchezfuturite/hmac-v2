import type { Doctor } from "@/components/shared/DoctorCard";

/**
 * Directorio Médico — datos de ejemplo con la estructura definida en doc 16.19
 *
 * Entidad Médico + Relación Médico-Hospital + catálogos maestros. El médico no
 * se duplica: consulta en una o varias sedes y cada relación guarda su propio
 * consultorio y teléfono.
 *
 * TODO: administrar desde CMS con alta individual y carga masiva por archivo
 * (Excel/CSV) que permita actualizar registros existentes mediante el ID único,
 * sin depender de desarrollo (doc 16.17 y 16.18).
 */
export const DOCTORS: Doctor[] = [
  {
    id: "MAC-0001",
    name: "Dr. Alejandro Gómez Estrada",
    specialty: "Ginecología",
    subspecialty: "Medicina materno-fetal",
    attends: ["Embarazo de alto riesgo", "Control prenatal"],
    redMac360: true,
    initials: "AG",
    hospitals: [
      {
        hospital: "Hospital MAC Celaya",
        slug: "celaya",
        isPrimary: true,
        office: "204",
        phone: "461 618 0820",
      },
      {
        hospital: "Hospital MAC Querétaro",
        slug: "queretaro",
        office: "118",
        phone: "442 123 2210",
      },
    ],
  },
  {
    id: "MAC-0002",
    name: "Dra. Sofía Ramírez Nieto",
    specialty: "Pediatría",
    subspecialty: "Neonatología",
    attends: ["Recién nacido", "Control del niño sano", "Vacunación"],
    initials: "SR",
    hospitals: [
      {
        hospital: "Hospital MAC Puebla",
        slug: "puebla",
        isPrimary: true,
        office: "112",
        phone: "222 123 7710",
      },
    ],
  },
  {
    id: "MAC-0003",
    name: "Dr. Carlos Mendoza Santos",
    specialty: "Cardiología",
    subspecialty: "Cardiología intervencionista",
    attends: ["Arritmias", "Hipertensión", "Insuficiencia cardíaca"],
    redMac360: true,
    initials: "CM",
    hospitals: [
      {
        hospital: "Hospital MAC León",
        slug: "leon",
        isPrimary: true,
        office: "308",
        phone: "477 123 1110",
      },
    ],
  },
  {
    id: "MAC-0004",
    name: "Dra. Laura Herrera Lozano",
    specialty: "Imagenología",
    initials: "LH",
    hospitals: [
      {
        hospital: "Hospital MAC Aguascalientes Norte",
        slug: "aguascalientes-norte",
        isPrimary: true,
        office: "015",
        phone: "449 123 4590",
      },
    ],
  },
  {
    id: "MAC-0005",
    name: "Dr. Javier Peralta Torres",
    specialty: "Ginecología",
    attends: ["Colposcopía", "Menopausia"],
    initials: "JP",
    hospitals: [
      {
        hospital: "Hospital MAC Celaya",
        slug: "celaya",
        isPrimary: true,
        office: "206",
        phone: "461 618 0821",
      },
    ],
  },
  {
    id: "MAC-0006",
    name: "Dra. Elena Ruiz Valadéz",
    specialty: "Cardiología",
    subspecialty: "Ecocardiografía",
    attends: ["Insuficiencia cardíaca"],
    initials: "ER",
    hospitals: [
      {
        hospital: "Hospital MAC Celaya",
        slug: "celaya",
        isPrimary: true,
        office: "310",
        phone: "461 618 0822",
      },
    ],
  },
  {
    id: "MAC-0007",
    name: "Dr. Andrés Muñoz Rizo",
    specialty: "Pediatría",
    initials: "AM",
    hospitals: [
      {
        hospital: "Hospital MAC Celaya",
        slug: "celaya",
        isPrimary: true,
        office: "108",
        phone: "461 618 0823",
      },
    ],
  },
  {
    id: "MAC-0008",
    name: "Dra. Mariana Ortega Lira",
    specialty: "Medicina Interna",
    attends: ["Diabetes", "Hipertensión"],
    initials: "MO",
    hospitals: [
      {
        hospital: "Hospital MAC Irapuato",
        slug: "irapuato",
        isPrimary: true,
        office: "221",
      },
    ],
  },
];

/** Médicos publicables asociados a una sede, en el orden administrado por CMS */
export function doctorsByHospital(slug: string): Doctor[] {
  return DOCTORS.filter((doctor) =>
    doctor.hospitals.some((location) => location.slug === slug)
  );
}
