import React from "react";
import { Calendar, MapPin } from "lucide-react";
import CTAButton from "./CTAButton";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  initials: string;
  cedula?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBook?: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between h-full hover:border-mac-primary transition-colors">
      <div>
        {/* Doctor Header: Initials Avatar + Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-mac-primary-tint text-mac-primary flex items-center justify-center font-medium text-body shrink-0">
            {doctor.initials}
          </div>
          <div>
            <h3 className="text-h3 font-medium text-mac-carbon leading-tight">
              {doctor.name}
            </h3>
            <p className="text-caption font-normal text-mac-primary mt-0.5">
              {doctor.specialty}
            </p>
          </div>
        </div>

        {/* Doctor Meta */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-caption font-normal text-gray-500">
            <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary" />
            <span>{doctor.hospital}</span>
          </div>
          {doctor.cedula && (
            <div className="text-caption font-normal text-gray-400 pl-5">
              Cédula Prof: {doctor.cedula}
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <CTAButton
        variant="primary"
        size="sm"
        className="w-full text-center"
        onClick={() => onBook?.(doctor)}
        icon={<Calendar className="w-3.5 h-3.5" />}
      >
        Agendar cita
      </CTAButton>
    </div>
  );
}
