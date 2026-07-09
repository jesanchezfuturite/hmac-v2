import React from "react";
import { Coffee, Wifi, Accessibility, Zap, Utensils, Car } from "lucide-react";

interface ComplementaryService {
  name: string;
  desc: string;
  icon: React.ReactNode;
}

interface HospitalComplementaryServicesProps {
  services: ComplementaryService[];
}

export default function HospitalComplementaryServices({
  services,
}: HospitalComplementaryServicesProps) {
  return (
    <section className="bg-gray-50 py-14 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-10">
          <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
            Comodidades
          </span>
          <h2 className="text-h2 font-medium text-mac-carbon mt-1">
            Servicios complementarios
          </h2>
          <p className="text-body font-normal text-gray-500 mt-2 max-w-xl">
            Contamos con todas las comodidades para que tu experiencia en nuestro hospital sea cómoda y agradable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-mac-primary hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-mac-primary-tint text-mac-primary flex items-center justify-center shrink-0">
                {service.icon}
              </div>
              <div>
                <h3 className="text-h3 font-medium text-mac-carbon mb-1">
                  {service.name}
                </h3>
                <p className="text-caption font-normal text-gray-500">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
