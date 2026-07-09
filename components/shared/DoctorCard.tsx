import React from "react";
import { MapPin, Phone, DoorOpen, Stethoscope } from "lucide-react";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  initials: string;
  cedula?: string;
  /** Subespecialidad, si aplica */
  subspecialty?: string;
  /** Número / identificador de consultorio */
  office?: string;
  /** Teléfono directo del consultorio */
  officePhone?: string;
  /** Breve reseña del médico (opcional) */
  bio?: string;
  /** Temas prioritarios que atiende (opcional) */
  priorityTopics?: string[];
}

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between h-full hover:border-mac-primary transition-colors">
      <div>
        {/* Doctor Header: Initials Avatar + Info */}
        <div className="flex items-center space-x-3 mb-4">
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

        {/* Doctor Meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-caption font-normal text-gray-500">
            <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary" />
            <span>{doctor.hospital}</span>
          </div>
          {doctor.office && (
            <div className="flex items-center text-caption font-normal text-gray-500">
              <DoorOpen className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary" />
              <span>Consultorio {doctor.office}</span>
            </div>
          )}
          {doctor.officePhone && (
            <div className="flex items-center text-caption font-normal text-gray-500">
              <Phone className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary" />
              <span>{doctor.officePhone}</span>
            </div>
          )}
          {doctor.cedula && (
            <div className="text-caption font-normal text-gray-400 pl-5">
              Cédula Prof: {doctor.cedula}
            </div>
          )}
        </div>

        {/* Optional short bio */}
        {doctor.bio && (
          <p className="text-caption font-normal text-gray-500 leading-relaxed mb-4 line-clamp-3">
            {doctor.bio}
          </p>
        )}

        {/* Optional priority topics */}
        {doctor.priorityTopics && doctor.priorityTopics.length > 0 && (
          <div className="mb-4">
            <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase flex items-center mb-2">
              <Stethoscope className="w-3 h-3 mr-1 text-mac-primary" />
              Atiende
            </span>
            <div className="flex flex-wrap gap-1.5">
              {doctor.priorityTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[11px] font-normal text-mac-primary bg-mac-primary-tint rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact action: llamar a consultorio (agendas no disponibles) */}
      {doctor.officePhone ? (
        <a
          href={`tel:${doctor.officePhone.replace(/[^\d+]/g, "")}`}
          className="inline-flex items-center justify-center w-full gap-2 border border-mac-primary text-mac-primary hover:bg-mac-primary-tint font-medium text-caption px-4 py-2 rounded-lg transition-colors select-none"
        >
          <Phone className="w-3.5 h-3.5" />
          Llamar a consultorio
        </a>
      ) : (
        <span className="inline-flex items-center justify-center w-full text-caption font-normal text-gray-400 px-4 py-2">
          Contacto disponible en la sede
        </span>
      )}
    </div>
  );
}
