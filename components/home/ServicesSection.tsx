"use client";

import React from "react";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      name: "Urgencias 24/7",
      desc: "Atención inmediata para emergencias médicas, con equipamiento de punta y médicos urgenciólogos certificados.",
      image: "/img/urgencias.webp",
      badge: "Siempre disponible",
    },
    {
      id: 3,
      name: "Cardiología",
      desc: "Diagnóstico, tratamiento y seguimiento de enfermedades cardiovasculares con cardiólogos de alta especialidad.",
      image: "/img/cardiologia.webp",
    },
    {
      id: 4,
      name: "Pediatría",
      desc: "Atención integral del niño sano y enfermo, desde recién nacidos hasta adolescentes con equipamiento pediátrico.",
      image: "/img/pediatria.webp",
    },
    {
      id: 7,
      name: "Cirugía General",
      desc: "Procedimientos quirúrgicos generales y especializados con quirófanos de alta complejidad y equipamiento avanzado.",
      image: "/img/cirugia.webp",
    },
    {
      id: 8,
      name: "Ortopedia",
      desc: "Tratamiento de lesiones, fracturas y enfermedades del sistema musculoesquelético con traumatólogos certificados.",
      image: "/img/ortopedia.webp",
    },
    {
      id: 9,
      name: "Medicina Interna",
      desc: "Diagnóstico y tratamiento de enfermedades crónicas del adulto con internistas de amplia experiencia clínica.",
      image: "/img/medicina-interna.webp",
    },
    {
      id: 10,
      name: "Neurología",
      desc: "Atención especializada de trastornos neurológicos, epilepsia, demencia y enfermedades del sistema nervioso.",
      image: "/img/neurologia.webp",
    },
    {
      id: 11,
      name: "Oncología",
      desc: "Diagnóstico y tratamiento integral de cáncer con oncólogos certificados y protocolos de precisión.",
      image: "/img/oncologia.webp",
    },
    {
      id: 12,
      name: "Neumología",
      desc: "Especialidad en enfermedades respiratorias, asma, EPOC y cuidado pulmonar de alta complejidad.",
      image: "/img/neumologia.webp",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 border-b border-gray-150">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="inline-flex bg-[#95c124] px-3 py-1 rounded-full text-[10px] font-medium tracking-widest text-white uppercase select-none mb-4 w-fit mx-auto">
            Especialidades
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-mac-carbon mt-1">
            Servicios de alta especialidad
          </h2>
          <p className="text-body font-normal text-gray-500 mt-3 max-w-2xl mx-auto">
            Acceso a más de 25 especialidades médicas en nuestras unidades. Encuentra el servicio que necesitas y agenda tu cita con los mejores especialistas.
          </p>
        </div>

        {/* Services Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative rounded-2xl overflow-hidden h-[280px] group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(26,107,60,0.12)] transition-all duration-500"
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

              {/* Badge (if any) */}
              {service.badge && (
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex bg-[#95c124] px-3 py-1 rounded-full text-[10px] font-medium tracking-widest text-white uppercase select-none">
                    {service.badge}
                  </span>
                </div>
              )}

              {/* Content - positioned at bottom */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                <div />

                {/* Bottom Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display text-xl font-medium leading-tight tracking-tight text-white mb-1">
                      {service.name}
                    </h3>
                    <p className="text-caption font-normal text-white/90 line-clamp-2 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  <Link
                    href="/directorio-medico"
                    className="inline-block bg-white text-mac-carbon hover:bg-white/90 px-5 py-2 rounded-full text-caption font-medium tracking-wide transition-all duration-200 select-none shadow-sm hover:shadow active:scale-[0.98]"
                  >
                    Ver especialistas
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
