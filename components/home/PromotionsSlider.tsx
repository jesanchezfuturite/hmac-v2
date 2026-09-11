"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import CTAButton from "../shared/CTAButton";
import { PENDING_ROUTE } from "@/lib/site";

/**
 * Beneficios para cuidar tu salud — doc 3.7
 *
 * Módulo de conversión, no escaparate de descuentos. El recorrido esperado es
 * Promoción en Home → Ver promoción → información completa → acción.
 *
 * Estructura administrable desde CMS: promoción destacada, orden del carrusel,
 * vigencia, hospitales participantes, CTA contextual y URL de destino. La
 * información importante (nombre, vigencia, sedes) va como texto y no dentro de
 * la imagen, por accesibilidad, experiencia móvil y posicionamiento orgánico.
 */
interface Promotion {
  id: number;
  name: string;
  desc?: string;
  img: string;
  /** Vigencia visible cuando corresponda */
  validUntil?: string;
  /** Hospitales participantes cuando sea relevante */
  hospitals?: string;
  /** El CTA lo determina la naturaleza de la promoción (doc 3.7.5) */
  cta: { label: string; href: string };
  isFeatured?: boolean;
}

export default function PromotionsSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const { scrollLeft, clientWidth, scrollWidth } = container;
      const firstChild = container.firstElementChild as HTMLElement;
      const step = firstChild ? firstChild.clientWidth + 24 : 344;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({ left: scrollLeft + step, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const scrollTo = direction === "left"
        ? scrollLeft - scrollAmount
        : scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  // TODO: el destino de cada CTA es la landing de promoción /promociones/[slug],
  // administrable desde CMS (doc 3.7.4). Contenido de ejemplo hasta contar con
  // los datos reales de cada campaña.
  const promotions: Promotion[] = [
    {
      id: 1,
      name: "Urgencias Generales 2026",
      desc: "Atención de urgencias con médicos urgenciólogos, disponible las 24 horas en las sedes participantes.",
      img: "/img/promociones/MASTER_URGENCIAS_GENERAL2026_-_DIGITAL_500x500_dg2ipkoazuo8.png",
      cta: { label: "Ver promoción", href: PENDING_ROUTE },
      isFeatured: true,
    },
    {
      id: 2,
      name: "Check-Up Preventivo",
      img: "/img/promociones/Mobile_500x500_3qgpaqaxp5ick.png",
      cta: { label: "Ver promoción", href: PENDING_ROUTE },
    },
    {
      id: 3,
      name: "Paquetes Especiales Hospitalarios",
      img: "/img/promociones/Mobile_500x500_5.jpg",
      cta: { label: "Ver promoción", href: PENDING_ROUTE },
    },
    {
      id: 4,
      name: "Urgencias Abdominales",
      img: "/img/promociones/URGENCIAS_ABDOMINAL_MOBILE_500X500.jpg",
      cta: { label: "Ver promoción", href: PENDING_ROUTE },
    },
    {
      id: 5,
      name: "Urgencias Respiratorias",
      img: "/img/promociones/URGENCIAS_RESPIRATORIO_MOBILE_500X500.jpg",
      cta: { label: "Ver promoción", href: PENDING_ROUTE },
    },
    {
      id: 6,
      name: "Prueba Rápida de Antígeno Covid-19",
      img: "/img/promociones/WEB_PRUEBA_RAPIDA_ANTIGENO_COVID-19_MARZO.2026_500x500.jpg",
      cta: { label: "Ver promoción", href: PENDING_ROUTE },
    },
  ];

  const featuredPromo = promotions.find((p) => p.isFeatured);
  const otherPromos = promotions.filter((p) => !p.isFeatured);

  return (
    <section className="relative py-20 px-4 border-b border-gray-150 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/certificaciones.mp4" type="video/mp4" />
      </video>

      {/* Teal-to-Turquoise Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-mac-primary-dark/90 via-[#1d8c82]/85 to-[#3cbab0]/90 backdrop-blur-[1px] z-10" />

      <div className="max-w-7xl mx-auto relative z-20">

        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="inline-flex bg-[#95c124] px-3 py-1 rounded-full text-[10px] font-medium tracking-widest text-white uppercase select-none mb-3 w-fit">
            Promociones vigentes
          </span>
          <h2 className="font-display text-3xl font-medium tracking-tight text-white mt-1">
            Beneficios para cuidar tu salud
          </h2>
          <p className="text-caption font-normal text-mac-primary-light mt-2 max-w-lg">
            Conoce las oportunidades y condiciones especiales vigentes para atenderte en Hospitales MAC.
          </p>
        </div>

        {/* Featured Promotion Section */}
        {featuredPromo && (
          <div className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10">
            {/* Featured Image */}
            <div className="relative h-[300px] lg:h-[380px] rounded-2xl overflow-hidden group">
              <img
                src={featuredPromo.img}
                alt={featuredPromo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Featured Content */}
            <div className="text-white flex flex-col space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-[#95c124]" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#95c124]">
                    Destacada del mes
                  </span>
                </div>
                <h3 className="font-display text-3xl font-medium text-white leading-tight">
                  {featuredPromo.name}
                </h3>
              </div>

              {featuredPromo.desc && (
                <p className="text-body font-normal text-white/90 leading-relaxed max-w-md">
                  {featuredPromo.desc}
                </p>
              )}

              {featuredPromo.validUntil && (
                <p className="text-caption font-normal text-white/80">
                  Vigencia: {featuredPromo.validUntil}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <CTAButton
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  href={featuredPromo.cta.href}
                >
                  {featuredPromo.cta.label}
                </CTAButton>
              </div>
            </div>
          </div>
        )}

        {/* Carousel of Other Promotions */}
        {otherPromos.length > 0 && (
          <div>
            <h3 className="font-display text-xl font-medium text-white mb-6">
              Más promociones
            </h3>

            <div
              className="relative group/slider w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >

              {/* Left Arrow */}
              <button
                onClick={() => scroll("left")}
                aria-label="Anterior"
                className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-mac-carbon hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer border border-gray-150 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => scroll("right")}
                aria-label="Siguiente"
                className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-mac-carbon hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer border border-gray-150 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Scrollable Track */}
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-1 select-none no-scrollbar"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >

                {otherPromos.map((promo) => (
                  <div
                    key={promo.id}
                    className="snap-start shrink-0 w-[280px] sm:w-[320px] flex flex-col rounded-2xl overflow-hidden group border border-gray-200/50 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(26,107,60,0.12)] hover:border-mac-primary/20 transition-all duration-500 ease-out"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={promo.img}
                        alt={promo.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* El nombre, la vigencia y el CTA van como texto, no dentro
                        de la imagen (doc 3.7.8) */}
                    <div className="flex flex-col gap-2 p-4 flex-1">
                      <h4 className="text-body font-medium text-mac-carbon leading-snug">
                        {promo.name}
                      </h4>
                      {promo.validUntil && (
                        <p className="text-caption font-normal text-gray-500">
                          Vigencia: {promo.validUntil}
                        </p>
                      )}
                      {promo.hospitals && (
                        <p className="text-caption font-normal text-gray-500">
                          {promo.hospitals}
                        </p>
                      )}
                      <div className="mt-auto pt-2">
                        <CTAButton variant="outline" size="sm" href={promo.cta.href}>
                          {promo.cta.label}
                        </CTAButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
