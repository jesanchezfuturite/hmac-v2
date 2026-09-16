import React from "react";
import {
  Accessibility,
  Banknote,
  Car,
  Coffee,
  Sofa,
  Tv,
  Utensils,
  Wifi,
} from "lucide-react";
import type { HospitalFacility } from "@/lib/hospitals";

/**
 * Facilidades para tu estancia — doc 17
 *
 * No son servicios médicos: son las facilidades que hacen más práctica la
 * estancia del paciente o de su acompañante. "Estancia" cubre a ambos.
 *
 * La sección es modular: no todas las sedes tienen las mismas facilidades y no
 * se crean tarjetas solo para completar una plantilla. Si una facilidad tiene
 * una acción real (ver menú, ver canales, ver ubicación), se aprovecha.
 */
const ICONS: Record<string, React.ReactNode> = {
  Cafetería: <Coffee className="w-5 h-5" />,
  Restaurante: <Utensils className="w-5 h-5" />,
  "Wi-Fi": <Wifi className="w-5 h-5" />,
  Accesibilidad: <Accessibility className="w-5 h-5" />,
  Estacionamiento: <Car className="w-5 h-5" />,
  "Cajero automático": <Banknote className="w-5 h-5" />,
  "Salas de espera": <Sofa className="w-5 h-5" />,
  "Entretenimiento en habitación": <Tv className="w-5 h-5" />,
};

interface HospitalFacilitiesProps {
  facilities: HospitalFacility[];
}

export default function HospitalFacilities({ facilities }: HospitalFacilitiesProps) {
  // La sección no se muestra si la sede no tiene facilidades publicables
  if (facilities.length === 0) return null;

  return (
    <section className="bg-gray-50 py-14 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h2 className="text-h2 font-medium text-mac-carbon">
            Facilidades para tu estancia
          </h2>
          <p className="text-body font-normal text-gray-500 mt-2 max-w-xl">
            Lo que encontrarás durante tu visita o estancia en esta sede.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.name}
              className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-mac-primary hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-mac-primary-tint text-mac-primary flex items-center justify-center shrink-0">
                {ICONS[facility.name] ?? <Sofa className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-h3 font-medium text-mac-carbon mb-1">
                  {facility.name}
                </h3>
                <p className="text-caption font-normal text-gray-500">
                  {facility.desc}
                </p>
                {/* Las facilidades puramente informativas se quedan sin CTA */}
                {facility.cta && (
                  <a
                    href={facility.cta.href}
                    className="inline-block mt-3 text-caption font-medium text-mac-primary hover:text-mac-primary-dark transition-colors"
                  >
                    {facility.cta.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
