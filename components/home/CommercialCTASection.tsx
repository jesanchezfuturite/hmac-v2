"use client";

import React from "react";
import { Calculator, MapPin, Phone, MessageSquare, Check } from "lucide-react";
import CTAButton from "../shared/CTAButton";

export default function CommercialCTASection() {
  const services = [
    {
      id: 1,
      icon: <Calculator className="w-8 h-8" />,
      title: "Cotiza tu cirugía",
      description: "Obtén un presupuesto transparente y personalizado para tu procedimiento.",
      highlight: "Presupuesto Gratis",
      features: [
        "Conexión con especialistas",
        "Propuesta sin compromiso",
        "Precios competitivos",
        "Respuesta en 24 horas",
      ],
      buttonLabel: "Solicitar cotización",
      action: () => {
        const section = document.getElementById("cotizar-cirugia");
        section?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: 2,
      icon: <MapPin className="w-8 h-8" />,
      title: "Encuentra tu hospital",
      description: "Ubica la sede de Hospitales MAC más cercana a tu ubicación.",
      highlight: "Cerca de ti",
      features: [
        "Directorio completo de sedes",
        "Ubicaciones con GPS",
        "Conoce los servicios locales",
        "Información de horarios",
      ],
      buttonLabel: "Ver hospitales",
      action: () => {
        const section = document.getElementById("hospitales");
        section?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: 3,
      icon: <Phone className="w-8 h-8" />,
      title: "Llama a nuestro call center",
      description: "Comunícate directamente con nuestro equipo de soporte.",
      highlight: "800 622 0800",
      features: [
        "Asistencia 24/7",
        "Orientación médica confiable",
        "Resolución inmediata de dudas",
        "Personal altamente capacitado",
      ],
      buttonLabel: "Llamar ahora",
      href: "tel:8006220800",
    },
    {
      id: 4,
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Chat con asistente IA",
      description: "Obtén respuestas rápidas a tus preguntas sobre servicios.",
      highlight: "Atención Instantánea",
      features: [
        "Respuestas inmediatas",
        "Info de servicios 24/7",
        "Horarios y promociones",
        "Soporte informativo completo",
      ],
      buttonLabel: "Iniciar chat",
      action: () => alert("Abre el chat en la esquina inferior derecha"),
    },
  ];

  return (
    <section id="cotizar-cirugia" className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 border-b border-gray-150 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-mac-carbon">
            Tus opciones de servicio
          </h2>
          <p className="text-body font-normal text-gray-500 mt-3 max-w-2xl mx-auto">
            Elige el canal que prefieras para conectar con Hospitales MAC. Estamos aquí para ayudarte en cada paso.
          </p>
        </div>

        {/* Cards Row - 4 columns on desktop, responsive on smaller screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-4 hover:border-mac-primary hover:shadow-[0_12px_40px_rgba(26,107,60,0.15)] group"
            >
              {/* Icon Container - Top */}
              <div className="py-8 px-6 text-center bg-gray-50 group-hover:bg-gradient-to-b group-hover:from-mac-primary-tint group-hover:to-white transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 bg-mac-primary-tint text-mac-primary group-hover:bg-mac-primary group-hover:text-white">
                  {service.icon}
                </div>
              </div>

              {/* Content - Middle */}
              <div className="flex-1 px-6 py-6 flex flex-col">

                {/* Title */}
                <h3 className="font-display text-h3 font-medium text-mac-carbon mb-2 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-caption font-normal text-gray-500 mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Highlight Benefit */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <p className="text-2xl font-display font-medium text-mac-primary leading-tight">
                    {service.highlight}
                  </p>
                </div>

                {/* Features List */}
                <div className="flex-1">
                  <ul className="space-y-2.5">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-caption font-normal text-gray-600"
                      >
                        <Check className="w-4 h-4 text-mac-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button - Bottom */}
              <div className="px-6 py-6 border-t border-gray-100 bg-white">
                <CTAButton
                  variant="outline"
                  size="md"
                  className="w-full text-center"
                  href={service.href}
                  onClick={service.action}
                >
                  {service.buttonLabel}
                </CTAButton>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Subheader or trust badge */}
        <div className="text-center mt-12">
          <p className="text-caption font-normal text-gray-400">
            ✓ Todos nuestros canales están disponibles 24/7 para tu comodidad
          </p>
        </div>

      </div>
    </section>
  );
}
