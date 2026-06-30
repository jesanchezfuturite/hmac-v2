"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, MapPin, Search } from "lucide-react";
import CTAButton from "../shared/CTAButton";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (location) params.append("l", location);
    router.push(`/directorio-medico?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    if (tag === "Urgencias") {
      window.location.href = "tel:911";
      return;
    }
    router.push(`/directorio-medico?q=${encodeURIComponent(tag)}`);
  };

  const metrics = [
    { value: "25+", label: "Hospitales en México" },
    { value: "+500", label: "Médicos especializados" },
    { value: "24/7", label: "Urgencias disponibles" },
    { value: "30+", label: "Años de experiencia" },
  ];

  return (
    <section className="bg-mac-primary-dark text-white py-12 lg:py-20 px-4 relative overflow-hidden flex items-center">
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

      {/* Dark Green Gradient Overlay (Stripe/Linear style) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-mac-primary-dark/65 to-mac-primary-dark/95 z-10" />

      {/* Spotlight Reflector Backdrop (glow effect behind text) */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[350px] h-[350px] bg-mac-primary-light/20 rounded-full blur-[100px] pointer-events-none z-10 hidden lg:block" />

      {/* Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-between w-full relative z-20">
        
        {/* Left Column (55% width) - Text and Search */}
        <div className="w-full lg:w-[55%] flex flex-col items-start text-left space-y-6">

          {/* Heading Redesigned with custom drop-shadow, font-display, and weight 500 */}
          <h1 className="font-display text-[36px] font-medium text-white leading-[1.1] tracking-[-0.02em] max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Encuentra al especialista que necesitas
          </h1>

          {/* Subtitle (14px) with display font, drop-shadow and font-medium (500) for better contrast */}
          <p className="font-display text-body font-medium text-mac-primary-light max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            Alta especialidad médica accesible en tu ciudad
          </p>

          {/* Search Engine Form (Floating Capsule design with sutil shadow) */}
          <form
            onSubmit={handleSearch}
            className="w-full bg-white rounded-2xl p-4 md:p-3 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.16)] flex flex-col md:flex-row gap-3 text-mac-carbon mt-2"
          >
            {/* Input 1: Specialty or Doctor */}
            <div className="flex-grow flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <Stethoscope className="w-5 h-5 text-mac-primary mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Especialidad o nombre del médico"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="font-display w-full bg-transparent border-none focus:outline-none text-body text-mac-carbon placeholder-gray-400"
              />
            </div>

            {/* Input 2: Hospital or City */}
            <div className="flex-grow flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <MapPin className="w-5 h-5 text-mac-primary mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Hospital o ciudad"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="font-display w-full bg-transparent border-none focus:outline-none text-body text-mac-carbon placeholder-gray-400"
              />
            </div>

            {/* Search Button */}
            <CTAButton
              variant="primary"
              size="md"
              className="font-display w-full md:w-auto shrink-0 font-medium"
              icon={<Search className="w-4.5 h-4.5" />}
            >
              Buscar
            </CTAButton>
          </form>

          {/* Frequent searches tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-caption">
            <span className="font-display text-white/70 font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Búsquedas frecuentes:</span>
            {["Ginecología", "Laboratorio", "Urgencias", "Cardiología", "Imagenología"].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="font-display bg-[#95c124] hover:bg-[#95c124]/90 text-white px-3 py-1 rounded-full transition-all duration-200 font-medium text-caption select-none cursor-pointer border-none active:scale-[0.97]"
                >
                  {tag}
                </button>
              )
            )}
          </div>

        </div>

        {/* Right Column (45% width) - 2x2 Metrics Grid */}
        <div className="w-full lg:w-[45%]">
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-mac-primary-light/5 backdrop-blur-[1px] border border-white/10 rounded-xl p-5 md:p-6 flex flex-col justify-center space-y-1 hover:bg-mac-primary-light/10 transition-all duration-200"
              >
                <span className="font-display text-[32px] font-medium text-white leading-none drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.4)]">
                  {metric.value}
                </span>
                <span className="font-display text-body font-normal text-mac-primary-light leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
