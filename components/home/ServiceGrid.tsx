import React from "react";
import Link from "next/link";
import { EXTERNAL, PENDING_ROUTE } from "@/lib/site";

/**
 * Soluciones integrales para tu salud — doc 3.4
 *
 * Escaparate dinámico: 1 servicio destacado + 2 secundarios. La selección, el
 * orden y el periodo de publicación deben administrarse desde CMS; esta lista
 * es la forma que debe tener ese contenido.
 *
 * Cada servicio lleva un CTA contextual (no "Conoce más" genérico) y se
 * clasifica según su naturaleza: atención, diagnóstico o procedimiento.
 */
interface FeaturedService {
  name: string;
  category: "Servicio de atención" | "Servicio diagnóstico" | "Procedimiento";
  desc: string;
  image: string;
  cta: { label: string; href: string };
}

const FEATURED: FeaturedService = {
  name: "Maternidad MAC",
  category: "Servicio de atención",
  desc: "Acompañamiento durante el embarazo, el parto y los primeros días, con habitaciones para ti y tu acompañante.",
  image: "/img/maternidad.jpeg",
  // TODO: conectar con el flujo de solicitud de recorrido (doc 3.4.4)
  cta: { label: "Agenda tu recorrido", href: "/maternidad" },
};

const SECONDARY: FeaturedService[] = [
  {
    name: "Laboratorio Clínico",
    category: "Servicio diagnóstico",
    desc: "Análisis clínicos con entrega de resultados en línea.",
    image: "/img/laboratorio.png",
    // TODO: página nacional del servicio (doc 5.2.3)
    cta: { label: "Conoce nuestros estudios", href: PENDING_ROUTE },
  },
  {
    name: "Imagenología",
    category: "Servicio diagnóstico",
    desc: "Estudios de diagnóstico por imagen: resonancia magnética, tomografía y ultrasonido.",
    image: "/img/imageneologia.png",
    cta: { label: "Agenda tu estudio", href: EXTERNAL.agendaEstudios },
  },
];

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="inline-flex bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1 rounded-full text-[10px] font-medium tracking-widest text-white uppercase select-none self-end">
      {label}
    </span>
  );
}

export default function ServiceGrid() {
  return (
    <section className="bg-[#F8FAFB] py-20 px-4 border-b border-gray-150">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12 text-left">
          <h2 className="font-display text-3xl font-medium tracking-tight text-mac-carbon">
            Soluciones integrales para tu salud
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6 items-stretch">

          {/* Servicio destacado */}
          <div className="col-span-12 lg:col-span-6 relative rounded-2xl overflow-hidden h-[500px] group shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <img
              src={FEATURED.image}
              alt={FEATURED.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

            <div className="relative z-20 flex flex-col justify-between h-full p-8 text-white">
              <CategoryTag label={FEATURED.category} />

              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-[26px] font-medium leading-tight tracking-tight">
                    {FEATURED.name}
                  </h3>
                  <p className="text-body font-normal text-white/90 mt-1 max-w-md leading-relaxed">
                    {FEATURED.desc}
                  </p>
                </div>
                <Link
                  href={FEATURED.cta.href}
                  className="inline-block bg-white text-mac-carbon hover:bg-white/90 px-6 py-2.5 rounded-full text-caption font-medium tracking-wide transition-all duration-200 select-none shadow-sm hover:shadow active:scale-[0.98]"
                >
                  {FEATURED.cta.label}
                </Link>
              </div>
            </div>
          </div>

          {/* Servicios secundarios */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 justify-between">
            {SECONDARY.map((service) => (
              <div
                key={service.name}
                className="relative rounded-2xl overflow-hidden h-[238px] group shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                <div className="relative z-20 flex flex-col justify-between h-full p-6 text-white">
                  <CategoryTag label={service.category} />

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-display text-xl font-medium leading-tight tracking-tight">
                        {service.name}
                      </h3>
                      <p className="text-caption font-normal text-white/80 mt-0.5 max-w-sm">
                        {service.desc}
                      </p>
                    </div>
                    <Link
                      href={service.cta.href}
                      className="inline-block bg-white text-mac-carbon hover:bg-white/90 px-5 py-2 rounded-full text-caption font-medium tracking-wide transition-all duration-200 select-none shadow-sm active:scale-[0.98]"
                    >
                      {service.cta.label}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* El escaparate de Home no sustituye al catálogo completo — doc 3.4.5 */}
        {/* TODO: apuntar al directorio nacional de servicios /servicios (doc 5.2.2) */}
        <div className="mt-10 flex justify-center">
          <Link
            href={PENDING_ROUTE}
            className="inline-flex items-center justify-center border border-mac-primary text-mac-primary hover:bg-mac-primary-tint font-medium text-body px-6 py-3 rounded-lg transition-colors duration-200 select-none"
          >
            Ver todos los servicios
          </Link>
        </div>

      </div>
    </section>
  );
}
