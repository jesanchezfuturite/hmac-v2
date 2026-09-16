import React from "react";
import Link from "next/link";
import { Building2, Hospital, Search, ShieldAlert, Stethoscope } from "lucide-react";
import { NETWORK } from "@/lib/site";

/**
 * Hero / Header principal — doc 3.3
 *
 * Secuencia definida: Posicionamiento → Necesidad → Búsqueda → Acción → Confianza.
 * No se agregan más indicadores, botones o mensajes en esta etapa.
 */
export default function HeroSearch() {
  // Indicadores de confianza (cobertura + disponibilidad + capacidad médica).
  // Cifras pendientes de validación institucional — doc 3.3.7
  const stats = [
    {
      value: String(NETWORK.hospitals),
      label: "Hospitales",
      detail: `${NETWORK.cities} ciudades`,
      icon: <Hospital className="w-5 h-5" />,
    },
    {
      value: "24/7",
      label: "Urgencias",
      detail: "Atención médica cuando la necesitas",
      icon: <ShieldAlert className="w-5 h-5" />,
    },
    {
      value: NETWORK.doctors,
      label: "Médicos",
      detail: "Especialistas en nuestra red",
      icon: <Stethoscope className="w-5 h-5" />,
    },
  ];

  return (
    <section className="bg-mac-primary-dark text-white py-16 lg:py-24 px-4 relative overflow-hidden flex items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-mac-primary-dark/65 to-mac-primary-dark/95 z-10" />
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[350px] h-[350px] bg-mac-primary-light/20 rounded-full blur-[100px] pointer-events-none z-10 hidden lg:block" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-between w-full relative z-20">

        {/* Columna izquierda — posicionamiento, necesidad y búsqueda */}
        <div className="w-full lg:w-[58%] flex flex-col items-start text-left space-y-6">

          {/* Mensaje principal */}
          <h1 className="font-display text-[34px] sm:text-[42px] font-medium text-white leading-[1.08] tracking-[-0.02em] max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Atención médica de alta especialidad, cerca de ti.
          </h1>

          {/* Mensaje secundario */}
          <p className="font-display text-body sm:text-base font-medium text-mac-primary-light max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            Encuentra la atención médica que necesitas en el Hospital MAC más cercano a ti.
          </p>

          {/* Acción principal: buscador unificado */}
          {/* TODO: hoy resuelve al Directorio Médico. El buscador unificado debe interpretar
              la necesidad y resolver hospital / especialista / servicio / estudio (doc 3.3.4) */}
          <div className="w-full max-w-xl space-y-2 pt-1">
            <label
              htmlFor="hero-search"
              className="font-display block text-body font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
              ¿Qué necesitas?
            </label>
            <form action="/directorio-medico" method="get" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
              <input
                id="hero-search"
                type="search"
                name="q"
                placeholder="Buscar hospital, especialista, servicio o estudio"
                className="w-full bg-white text-mac-carbon placeholder:text-gray-400 rounded-lg pl-11 pr-28 py-3.5 text-body shadow-[0_4px_14px_rgba(0,0,0,0.18)] focus:outline-none focus:ring-2 focus:ring-mac-primary-light"
              />
              <button
                type="submit"
                className="font-display absolute right-1.5 top-1/2 -translate-y-1/2 bg-mac-primary hover:bg-mac-primary-dark text-white font-medium text-body px-5 py-2.5 rounded-md transition-colors duration-200 select-none"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Acciones secundarias: accesos rápidos para quien ya sabe qué necesita */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-body">
            <Link
              href="/directorio-medico"
              className="font-display inline-flex items-center gap-2 text-white font-medium underline-offset-4 hover:underline hover:text-mac-primary-light transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
              <Stethoscope className="w-4 h-4" />
              Buscar especialista
            </Link>
            <span className="text-white/30">|</span>
            <Link
              href="/hospitales"
              className="font-display inline-flex items-center gap-2 text-white font-medium underline-offset-4 hover:underline hover:text-mac-primary-light transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
              <Building2 className="w-4 h-4" />
              Buscar hospital
            </Link>
          </div>

        </div>

        {/* Columna derecha — indicadores de confianza */}
        <div className="w-full lg:w-[42%]">
          <div className="flex flex-col gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-mac-primary-light/5 backdrop-blur-[1px] border border-white/10 rounded-xl p-5 md:p-6 flex items-center gap-5 hover:bg-mac-primary-light/10 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-white/10 text-mac-primary-light flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[32px] font-medium text-white leading-none drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.4)]">
                    {stat.value}{" "}
                    <span className="text-body font-normal text-white/90">
                      {stat.label}
                    </span>
                  </span>
                  <span className="font-display text-body font-normal text-mac-primary-light leading-snug mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    {stat.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
