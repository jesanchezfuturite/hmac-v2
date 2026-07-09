import React from "react";
import Link from "next/link";
import { Building2, Hospital, ShieldAlert, Stethoscope } from "lucide-react";

export default function HeroSearch() {
  // Cifras oficiales confirmadas por el cliente (2026-07-09)
  const stats = [
    { value: "25", label: "Hospitales en México", icon: <Hospital className="w-5 h-5" /> },
    { value: "24/7", label: "Urgencias disponibles", icon: <ShieldAlert className="w-5 h-5" /> },
    { value: "+3,000", label: "Médicos especialistas", icon: <Stethoscope className="w-5 h-5" /> },
  ];

  const frequent = ["Ginecología", "Cardiología", "Pediatría", "Imagenología", "Laboratorio"];

  return (
    <section className="bg-mac-primary-dark text-white py-16 lg:py-24 px-4 relative overflow-hidden flex items-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-mac-primary-dark/65 to-mac-primary-dark/95 z-10" />

      {/* Spotlight Reflector Backdrop */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[350px] h-[350px] bg-mac-primary-light/20 rounded-full blur-[100px] pointer-events-none z-10 hidden lg:block" />

      {/* Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-between w-full relative z-20">

        {/* Left Column - Value proposition + CTAs */}
        <div className="w-full lg:w-[58%] flex flex-col items-start text-left space-y-6">

          {/* Eyebrow */}
          <span className="font-display inline-flex items-center gap-2 text-caption font-medium tracking-widest uppercase text-mac-primary-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#95c124]" />
            Red Nacional de Salud
          </span>

          {/* Headline (value proposition) */}
          <h1 className="font-display text-[34px] sm:text-[42px] font-medium text-white leading-[1.08] tracking-[-0.02em] max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Atención médica de alta especialidad cerca de ti
          </h1>

          {/* Subtitle */}
          <p className="font-display text-body sm:text-base font-medium text-mac-primary-light max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            Encuentra tu hospital MAC más cercano y agenda con el especialista que necesitas, con la confianza de una red presente en todo México.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-1">
            <Link
              href="/directorio-medico"
              className="font-display inline-flex items-center justify-center gap-2 bg-mac-primary hover:bg-mac-primary-dark text-white font-medium text-body px-6 py-3.5 rounded-lg shadow-[0_4px_14px_rgba(26,107,60,0.3)] hover:shadow-[0_6px_20px_rgba(26,107,60,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none"
            >
              <Stethoscope className="w-4.5 h-4.5" />
              Buscar especialista
            </Link>
            <Link
              href="#hospitales"
              className="font-display inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-mac-primary-dark font-medium text-body px-6 py-3.5 rounded-lg shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none"
            >
              <Building2 className="w-4.5 h-4.5" />
              Buscar hospital
            </Link>
          </div>

          {/* Frequent searches tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-caption">
            <span className="font-display text-white/70 font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
              Búsquedas frecuentes:
            </span>
            {frequent.map((tag) => (
              <Link
                key={tag}
                href={`/directorio-medico?q=${encodeURIComponent(tag)}`}
                className="font-display bg-[#95c124] hover:bg-[#95c124]/90 text-white px-3 py-1 rounded-full transition-all duration-200 font-medium text-caption select-none active:scale-[0.97]"
              >
                {tag}
              </Link>
            ))}
          </div>

        </div>

        {/* Right Column - Key figures */}
        <div className="w-full lg:w-[42%]">
          <div className="flex flex-col gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-mac-primary-light/5 backdrop-blur-[1px] border border-white/10 rounded-xl p-5 md:p-6 flex items-center gap-5 hover:bg-mac-primary-light/10 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-white/10 text-mac-primary-light flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[32px] font-medium text-white leading-none drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.4)]">
                    {stat.value}
                  </span>
                  <span className="font-display text-body font-normal text-mac-primary-light leading-snug mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    {stat.label}
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
