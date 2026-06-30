import React from "react";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import CTAButton from "./CTAButton";

export interface Hospital {
  slug: string;
  name: string;
  address: string;
  phone: string;
  city: string;
}

interface HospitalCardProps {
  hospital: Hospital;
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between h-full hover:border-mac-primary transition-colors">
      <div>
        {/* City Badge */}
        <div className="mb-3">
          <span className="inline-block px-2.5 py-0.5 text-caption font-medium text-mac-primary bg-mac-primary-tint rounded-full">
            {hospital.city}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-h3 font-medium text-mac-carbon mb-2 leading-tight">
          {hospital.name}
        </h3>

        {/* Info list */}
        <div className="space-y-2 mb-6">
          <div className="flex items-start text-caption font-normal text-gray-500">
            <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary mt-0.5" />
            <span className="leading-tight">{hospital.address}</span>
          </div>
          <div className="flex items-center text-caption font-normal text-gray-500">
            <Phone className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary" />
            <span>{hospital.phone}</span>
          </div>
        </div>
      </div>

      {/* Action links */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <a
          href={`tel:${hospital.phone.replace(/\s+/g, "")}`}
          className="text-caption font-medium text-gray-500 hover:text-mac-primary transition-colors"
        >
          Llamar
        </a>
        <Link
          href={`/hospitales/${hospital.slug}`}
          className="inline-flex items-center text-caption font-medium text-mac-primary hover:text-mac-primary-dark transition-colors"
        >
          Ver sede <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
}
