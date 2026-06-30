import React from "react";
import Link from "next/link";

export default function ServiceGrid() {
  return (
    <section className="bg-[#F8FAFB] py-20 px-4 border-b border-gray-150">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <h2 className="font-display text-3xl font-medium tracking-tight text-mac-carbon">
            Soluciones integrales para tu salud
          </h2>
        </div>

        {/* Nike-Style Full-Bleed Grid Layout */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          
          {/* Maternidad Card - Left Column (Spans 6 cols on desktop) */}
          <div className="col-span-12 lg:col-span-6 relative rounded-2xl overflow-hidden h-[500px] group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            {/* Background Image */}
            <img
              src="/img/maternidad.jpeg"
              alt="Maternidad MAC"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

            {/* Overlaid Content */}
            <div className="relative z-20 flex flex-col justify-between h-full p-8 text-white">
              {/* Top Tag */}
              <span className="inline-flex bg-[#95c124] px-3 py-1 rounded-full text-[10px] font-medium tracking-widest text-white uppercase select-none self-end">
                Alta Especialidad
              </span>
              
              {/* Bottom Info and Pill Button */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-[26px] font-medium leading-tight tracking-tight">
                    Maternidad MAC
                  </h3>
                  <p className="text-body font-normal text-white/90 mt-1 max-w-md leading-relaxed">
                    Paquetes de parto y cesárea diseñados para darte la mayor seguridad, calidez y confort en el momento más importante.
                  </p>
                </div>
                <Link
                  href="/maternidad"
                  className="inline-block bg-white text-mac-carbon hover:bg-white/90 px-6 py-2.5 rounded-full text-caption font-medium tracking-wide transition-all duration-200 select-none shadow-sm hover:shadow active:scale-[0.98]"
                >
                  Descubrir
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (Spans 6 cols on desktop) - Laboratorio & Imagenología stacked */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 justify-between">
            
            {/* Laboratorio Card */}
            <div className="relative rounded-2xl overflow-hidden h-[238px] group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              {/* Background Image */}
              <img
                src="/img/laboratorio.png"
                alt="Laboratorio MAC"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

              {/* Overlaid Content */}
              <div className="relative z-20 flex flex-col justify-between h-full p-6 text-white">
                <span className="inline-flex bg-[#95c124] px-3 py-1 rounded-full text-[10px] font-medium tracking-widest text-white uppercase select-none self-end">
                  Diagnóstico Rápido
                </span>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display text-xl font-medium leading-tight tracking-tight">
                      Laboratorio Clínico
                    </h3>
                    <p className="text-caption font-normal text-white/80 mt-0.5 max-w-sm">
                      Análisis clínicos rápidos y precisos con entrega de resultados en línea.
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="inline-block bg-white text-mac-carbon hover:bg-white/90 px-5 py-2 rounded-full text-caption font-medium tracking-wide transition-all duration-200 select-none shadow-sm active:scale-[0.98]"
                  >
                    Ver Estudios
                  </Link>
                </div>
              </div>
            </div>

            {/* Imagenología Card */}
            <div className="relative rounded-2xl overflow-hidden h-[238px] group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              {/* Background Image */}
              <img
                src="/img/imageneologia.png"
                alt="Imagenología MAC"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

              {/* Overlaid Content */}
              <div className="relative z-20 flex flex-col justify-between h-full p-6 text-white">
                <span className="inline-flex bg-[#95c124] px-3 py-1 rounded-full text-[10px] font-medium tracking-widest text-white uppercase select-none self-end">
                  Tecnología de Punta
                </span>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display text-xl font-medium leading-tight tracking-tight">
                      Imagenología
                    </h3>
                    <p className="text-caption font-normal text-white/80 mt-0.5 max-w-sm">
                      Estudios de resonancia magnética, tomografía y ultrasonidos avanzados.
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="inline-block bg-white text-mac-carbon hover:bg-white/90 px-5 py-2 rounded-full text-caption font-medium tracking-wide transition-all duration-200 select-none shadow-sm active:scale-[0.98]"
                  >
                    Ver Estudios
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
