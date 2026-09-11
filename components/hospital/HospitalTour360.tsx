import React from "react";
import { Compass } from "lucide-react";

/**
 * Recorrido 360° — doc 16
 *
 * Módulo independiente de la galería: la galería muestra cómo es el hospital, el
 * recorrido permite explorarlo antes de visitarlo. Solo aparece en las sedes que
 * lo tienen disponible; en las demás no se muestra "Próximamente".
 */
interface HospitalTour360Props {
  tourUrl: string;
}

export default function HospitalTour360({ tourUrl }: HospitalTour360Props) {
  return (
    <section className="bg-white py-14 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-6 bg-[#F8FAFB] border border-gray-200 rounded-2xl p-8">
        <div className="w-12 h-12 rounded-xl bg-mac-primary-tint text-mac-primary flex items-center justify-center shrink-0">
          <Compass className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-h2 font-medium text-mac-carbon">
            Conoce el hospital antes de llegar
          </h2>
          <p className="text-body font-normal text-gray-500 mt-2">
            Explora nuestras instalaciones con un recorrido virtual 360°.
          </p>
        </div>
        <a
          href={tourUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-mac-primary hover:bg-mac-primary-dark text-white font-medium text-body px-6 py-3 rounded-lg transition-colors duration-200 select-none shrink-0"
        >
          Explorar recorrido 360°
        </a>
      </div>
    </section>
  );
}
