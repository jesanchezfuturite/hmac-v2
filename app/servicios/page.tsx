import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, hospitalsWithService, type ServiceCategory } from "@/lib/hospitals";

/**
 * Directorio nacional de servicios — doc 5.2.2
 *
 * Responde "¿qué servicios ofrece Hospitales MAC?". Es el catálogo completo, a
 * diferencia del escaparate de la Home, que solo destaca algunos.
 *
 * Los servicios se agrupan por su naturaleza, porque no todos responden a la
 * misma intención del usuario (doc 3.4.6). Y no se comunican especialidades
 * médicas: esas son un atributo del médico en el Directorio Médico.
 */
export const metadata = {
  title: "Servicios · Hospitales MAC",
  description:
    "Servicios de Hospitales MAC y las sedes donde está disponible cada uno.",
};

const CATEGORIES: ServiceCategory[] = [
  "Servicio de atención",
  "Servicio diagnóstico",
  "Procedimiento / alta especialidad",
];

export default function Servicios() {
  return (
    <div className="w-full bg-[#F8FAFB] min-h-screen">

      <section className="bg-white border-b border-gray-200 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-h1 font-medium text-mac-carbon">Servicios</h1>
          <p className="text-body font-normal text-gray-500 mt-2 max-w-2xl">
            Lo que puedes resolver en Hospitales MAC y en qué sedes está disponible
            cada servicio.
          </p>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {CATEGORIES.map((category) => {
            const services = SERVICES.filter(
              (service) => service.category === category
            );
            if (services.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-h2 font-medium text-mac-carbon mb-6">
                  {category}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => {
                    const sedes = hospitalsWithService(service.slug);
                    return (
                      <Link
                        key={service.slug}
                        href={`/servicios/${service.slug}`}
                        className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-6 hover:border-mac-primary hover:shadow-[0_12px_32px_rgba(26,107,60,0.08)] transition-all duration-300"
                      >
                        <h3 className="text-h3 font-medium text-mac-carbon leading-tight">
                          {service.name}
                        </h3>
                        <p className="text-caption font-normal text-gray-500 leading-relaxed mt-2">
                          {service.summary}
                        </p>

                        {/* Disponibilidad real, no una promesa de red completa */}
                        <p className="text-caption font-medium text-mac-primary mt-4">
                          Disponible en {sedes.length}{" "}
                          {sedes.length === 1 ? "hospital" : "hospitales"}
                        </p>

                        <span className="inline-flex items-center gap-1.5 text-caption font-medium text-mac-carbon mt-auto pt-5 group-hover:text-mac-primary transition-colors">
                          Conocer servicio
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Maternidad ya tiene su propia experiencia: no se duplica aquí */}
          <div>
            <h2 className="text-h2 font-medium text-mac-carbon mb-6">
              Otras líneas de atención
            </h2>
            <Link
              href="/maternidad"
              className="group flex flex-col md:flex-row md:items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:border-mac-primary transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-h3 font-medium text-mac-carbon">Maternidad</h3>
                <p className="text-caption font-normal text-gray-500 mt-2">
                  Acompañamiento durante el embarazo, el parto y los primeros días.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-caption font-medium text-mac-primary shrink-0">
                Ver Maternidad
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            {/* TODO: ninguna ficha de sede publica Maternidad; falta saber en qué
                hospitales está disponible para integrarla al catálogo (SEDES-BORRADOR.md) */}
          </div>
        </div>
      </section>
    </div>
  );
}
