"use client";

import React from "react";
import { Baby, Check, Heart, ShieldAlert, Sparkles, Map, Calendar } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";

export default function Maternidad() {
  const packages = [
    {
      name: "Parto Natural",
      price: "$19,500",
      period: "MXN Pago Único",
      desc: "Nuestra experiencia de parto humanizado y respetuoso en salas de primer nivel.",
      features: [
        "1 noche de hospitalización en Suite estándar",
        "Honorarios médicos del Pediatra y Ginecólogo",
        "Sala de labor y recuperación equipada",
        "Monitoreo fetal continuo",
        "Medicamentos e insumos básicos de parto",
        "Atención inmediata al recién nacido (cuna)",
      ],
      badge: null,
      color: "border-gray-200",
    },
    {
      name: "Cesárea Planificada",
      price: "$27,000",
      period: "MXN Pago Único",
      desc: "Seguridad y calidez para ti y tu bebé con el respaldo de quirófanos especializados.",
      features: [
        "2 noches de hospitalización en Suite estándar",
        "Honorarios médicos completos (Cirujano, Ayudante, Anestesiólogo, Pediatra)",
        "Quirófano equipado para cesárea",
        "Sala de recuperación post-operatoria",
        "Anestesia y medicamentos del cuadro básico",
        "Atención integral del neonato en cuna",
      ],
      badge: "Más Solicitado",
      color: "border-mac-primary shadow-none",
    },
    {
      name: "Maternidad Premium",
      price: "$39,500",
      period: "MXN Pago Único",
      desc: "El máximo confort y amenidades exclusivas para este momento tan especial.",
      features: [
        "2 noches de hospitalización en Master Suite",
        "Honorarios de equipo médico completo con especialista certificado",
        "Sala LDR de parto humanizado o Quirófano VIP",
        "Sesión fotográfica profesional de recién nacido",
        "Check-up preventivo neonatal ampliado (Tamiz)",
        "Cena de gala de celebración para papás",
        "Kit de bienvenida de maternidad MAC",
      ],
      badge: "Premium",
      color: "border-mac-primary-light",
    },
  ];

  const handleBookingTour = () => {
    alert("Solicitud de recorrido registrada. Nos pondremos en contacto contigo para agendar tu visita a los cuneros y suites de maternidad MAC.");
  };

  const handleQuote = (pkgName: string) => {
    alert(`Cotización solicitada para el paquete: ${pkgName}. Te enviaremos el desglose completo al correo.`);
  };

  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-mac-primary-dark text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-mac-primary-light mb-2">
            <Baby className="w-6 h-6" />
          </div>
          <h1 className="text-h1 font-medium text-white leading-tight">
            Bienvenida a tu experiencia de maternidad MAC
          </h1>
          <p className="text-body font-normal text-mac-primary-light max-w-lg leading-relaxed">
            Instalaciones equipadas con tecnología de punta y personal de alta especialidad para recibir al nuevo miembro de tu familia con total seguridad y calidez.
          </p>
          <div className="pt-2">
            <CTAButton
              variant="secondary"
              size="lg"
              onClick={() => {
                const section = document.getElementById("paquetes-maternidad");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Cotizar mi paquete
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="paquetes-maternidad" className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
              Planes de maternidad
            </span>
            <h2 className="text-h2 font-medium text-mac-carbon mt-1">
              Paquetes diseñados para tu bienestar
            </h2>
            <p className="text-caption font-normal text-gray-400 mt-2">
              Precios transparentes y cerrados para evitar cobros sorpresa.
            </p>
          </div>

          {/* Cards Grid: 1 col on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => {
              const isPreferred = pkg.badge === "Más Solicitado";
              return (
                <div
                  key={idx}
                  className={`bg-white border rounded-xl p-6 flex flex-col justify-between hover:border-mac-primary transition-all relative ${pkg.color}`}
                >
                  {/* Top Badge */}
                  {pkg.badge && (
                    <span className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-caption font-medium text-white ${
                      isPreferred ? "bg-mac-primary" : "bg-mac-primary-dark"
                    }`}>
                      {pkg.badge}
                    </span>
                  )}

                  {/* Plan details */}
                  <div>
                    <h3 className="text-h2 font-medium text-mac-carbon mb-2 pt-2">
                      {pkg.name}
                    </h3>
                    <p className="text-caption font-normal text-gray-500 mb-6 min-h-[40px]">
                      {pkg.desc}
                    </p>
                    
                    {/* Pricing */}
                    <div className="mb-6 flex items-baseline">
                      <span className="text-h1 font-medium text-mac-primary tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-caption font-normal text-gray-400 ml-2">
                        {pkg.period}
                      </span>
                    </div>

                    {/* Features list */}
                    <div className="border-t border-gray-100 pt-6 mb-8">
                      <span className="text-caption font-medium text-mac-carbon uppercase block mb-4">
                        Inclusiones del paquete:
                      </span>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start text-body font-normal text-gray-600">
                            <Check className="w-4 h-4 text-mac-primary mr-2.5 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Package CTA */}
                  <CTAButton
                    variant={isPreferred ? "primary" : "outline"}
                    size="md"
                    className="w-full text-center"
                    onClick={() => handleQuote(pkg.name)}
                  >
                    Cotizar paquete
                  </CTAButton>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="bg-gray-50 py-16 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-center mb-8">
            <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
              Recorrido virtual
            </span>
            <h2 className="text-h2 font-medium text-mac-carbon mt-1">
              Conoce nuestras áreas de Maternidad
            </h2>
            <p className="text-body font-normal text-gray-500 mt-2 max-w-md">
              Explora las suites, la sala de parto humanizado y los cuneros fisiológicos desde la comodidad de tu hogar.
            </p>
          </div>

          {/* Virtual Tour Placeholder */}
          <div className="w-full bg-white border border-gray-200 rounded-xl p-8 h-[240px] flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-mac-primary-tint text-mac-primary flex items-center justify-center mb-4">
              <Map className="w-7 h-7" />
            </div>
            <p className="text-body font-medium text-mac-carbon">
              Visita Guiada en 360°
            </p>
            <p className="text-caption font-normal text-gray-400 mt-1">
              Interactúa con el plano tridimensional de nuestras salas LDR (Labor, Delivery, Recovery)
            </p>
            <button
              onClick={() => alert("Cargando visor interactivo 360°...")}
              className="text-caption font-medium text-mac-primary hover:text-mac-primary-dark mt-4 underline"
            >
              Iniciar recorrido virtual 360°
            </button>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="bg-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-mac-primary-tint text-mac-primary flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-h2 font-medium text-mac-carbon">
            ¿Prefieres conocernos en persona?
          </h2>
          <p className="text-body font-normal text-gray-500 max-w-md">
            Agendamos visitas guiadas individuales para que experimentes de primera mano el confort y seguridad de nuestras áreas obstétricas.
          </p>
          <div className="pt-2">
            <CTAButton
              variant="primary"
              size="lg"
              icon={<Calendar className="w-4.5 h-4.5" />}
              onClick={handleBookingTour}
            >
              Agenda tu recorrido por nuestros cuneros
            </CTAButton>
          </div>
        </div>
      </section>

    </div>
  );
}
