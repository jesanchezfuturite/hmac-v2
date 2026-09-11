"use client";

import React, { useState } from "react";
import { DoorOpen, MapPin, Phone, Stethoscope } from "lucide-react";

/**
 * Tarjeta de médico — doc 16
 *
 * La tarjeta es la unidad principal de información del médico: debe bastar para
 * decidir si contactarlo, sin entrar a un perfil adicional. No se construyen
 * fichas curriculares (semblanzas, formación, trayectoria, reconocimientos):
 * ese nivel de levantamiento no es sostenible de mantener.
 *
 * Prioridad: información concreta + contacto + ubicación.
 */

/** La relación médico-hospital es muchos a muchos; el consultorio y el teléfono
 *  pertenecen a la relación con cada sede, no al médico (doc 16.5.1) */
export interface DoctorHospital {
  hospital: string;
  slug?: string;
  /** Cuando existe hospital principal, se muestra primero */
  isPrimary?: boolean;
  office?: string;
  /** Línea contratada por el médico para ese consultorio */
  phone?: string;
}

export interface Doctor {
  /** ID único del médico, base de la carga masiva y la actualización (doc 16.18) */
  id: string;
  name: string;
  /** Una única especialidad principal, del catálogo maestro */
  specialty: string;
  /** Cero o una subespecialidad */
  subspecialty?: string;
  /** Hasta 3 etiquetas del catálogo "Qué atiende" (doc 16.10) */
  attends?: string[];
  /** Participación en el programa empresarial (doc 16.12) */
  redMac360?: boolean;
  /** La fotografía no es requisito para publicar (doc 16.4) */
  initials: string;
  /** Pendiente de confirmar con Legal si debe mostrarse */
  license?: string;
  hospitals: DoctorHospital[];
}

interface DoctorCardProps {
  doctor: Doctor;
}

/** Orden: hospital principal primero, después el resto */
function sortHospitals(hospitals: DoctorHospital[]): DoctorHospital[] {
  return [...hospitals].sort(
    (a, b) => Number(Boolean(b.isPrimary)) - Number(Boolean(a.isPrimary))
  );
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [showAllHospitals, setShowAllHospitals] = useState(false);

  const hospitals = sortHospitals(doctor.hospitals);
  const primary = hospitals[0];
  const extraCount = hospitals.length - 1;
  const visibleHospitals = showAllHospitals ? hospitals : hospitals.slice(0, 1);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between h-full hover:border-mac-primary transition-colors">
      <div>
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-mac-primary-tint text-mac-primary flex items-center justify-center font-medium text-body shrink-0">
            {doctor.initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-h3 font-medium text-mac-carbon leading-tight">
              {doctor.name}
            </h3>
            <p className="text-caption font-normal text-mac-primary mt-0.5">
              {doctor.specialty}
              {doctor.subspecialty && (
                <span className="text-gray-400"> · {doctor.subspecialty}</span>
              )}
            </p>
          </div>
        </div>

        {/* Distintivo visible, sin competir con nombre ni contacto */}
        {doctor.redMac360 && (
          <span
            className="inline-block mb-3 px-2.5 py-0.5 text-[10px] font-medium text-mac-primary bg-mac-primary-tint border border-mac-primary/20 rounded-full"
            title="Médico participante en el programa empresarial MAC 360°. Las condiciones de atención están sujetas al convenio correspondiente."
          >
            Red MAC 360°
          </span>
        )}

        {/* Qué atiende: taxonomía independiente de la especialidad */}
        {doctor.attends && doctor.attends.length > 0 && (
          <div className="mb-4">
            <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase flex items-center mb-2">
              <Stethoscope className="w-3 h-3 mr-1 text-mac-primary" />
              Atiende
            </span>
            <div className="flex flex-wrap gap-1.5">
              {doctor.attends.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 text-[11px] font-normal text-mac-primary bg-mac-primary-tint rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sedes donde consulta. Si falta consultorio o teléfono no se muestra el
            campo vacío ni se sustituye por el teléfono general del hospital */}
        <div className="space-y-3 mb-4">
          {visibleHospitals.map((location) => (
            <div key={location.hospital} className="space-y-1.5">
              <div className="flex items-start text-caption font-normal text-gray-600">
                <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary mt-0.5" />
                <span>{location.hospital}</span>
              </div>
              {location.office && (
                <div className="flex items-center text-caption font-normal text-gray-500">
                  <DoorOpen className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary" />
                  <span>Consultorio {location.office}</span>
                </div>
              )}
              {location.phone && (
                <div className="flex items-center text-caption font-normal text-gray-500">
                  <Phone className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary" />
                  <span>{location.phone}</span>
                </div>
              )}
            </div>
          ))}

          {extraCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAllHospitals(!showAllHospitals)}
              className="text-caption font-medium text-mac-primary hover:text-mac-primary-dark transition-colors"
            >
              {showAllHospitals
                ? "Ver menos"
                : `+ ${extraCount} hospital${extraCount > 1 ? "es" : ""} · Ver más`}
            </button>
          )}
        </div>

        {doctor.license && (
          <p className="text-caption font-normal text-gray-400 mb-4">
            Cédula profesional: {doctor.license}
          </p>
        )}
      </div>

      {/* No se promete agenda médica mientras no exista la herramienta (doc 18.6) */}
      {primary?.phone ? (
        <a
          href={`tel:${primary.phone.replace(/[^\d+]/g, "")}`}
          className="inline-flex items-center justify-center w-full gap-2 border border-mac-primary text-mac-primary hover:bg-mac-primary-tint font-medium text-caption px-4 py-2 rounded-lg transition-colors select-none"
        >
          <Phone className="w-3.5 h-3.5" />
          Llamar al consultorio
        </a>
      ) : (
        <span className="inline-flex items-center justify-center w-full text-caption font-normal text-gray-400 px-4 py-2">
          Contacto disponible en la sede
        </span>
      )}
    </div>
  );
}
