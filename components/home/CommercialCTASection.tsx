"use client";

import React from "react";
import { Calculator, CalendarPlus, Phone, MessageSquare } from "lucide-react";
import CTAButton from "../shared/CTAButton";
import { CALL_CENTER, EXTERNAL, PENDING_ROUTE } from "@/lib/site";

/**
 * ¿Cómo podemos ayudarte? — doc 3.5
 *
 * Cuatro caminos de alta intención. "Encuentra tu hospital" sale de aquí porque
 * ya se resuelve en el Hero, en el localizador y en el CTA de Urgencias.
 *
 * Los textos de beneficio que traía cada tarjeta ("Presupuesto gratis",
 * "Precios competitivos", "Respuesta en 24 horas", "Orientación médica
 * confiable", "Atención instantánea", ...) quedan fuera hasta que Comercial,
 * Operaciones y/o Legal validen que corresponden al alcance real del servicio.
 */
interface HelpOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  href?: string;
  action?: () => void;
}

export default function CommercialCTASection() {
  const options: HelpOption[] = [
    {
      id: "cotizacion",
      icon: <Calculator className="w-6 h-6" />,
      title: "Cotiza tu cirugía",
      description:
        "Solicita una cotización personalizada para tu procedimiento y recibe orientación sobre los siguientes pasos.",
      buttonLabel: "Solicitar cotización",
      // TODO: el flujo debe registrar los datos y entregarlos al CRM cuando se libere (doc 3.5.1)
      href: PENDING_ROUTE,
    },
    {
      id: "agenda",
      icon: <CalendarPlus className="w-6 h-6" />,
      title: "Agenda tu estudio",
      description:
        "Programa en línea tus estudios de Imagenología disponibles y elige la opción que mejor se adapte a tus necesidades.",
      buttonLabel: "Agendar estudio",
      href: EXTERNAL.agendaEstudios,
    },
    {
      id: "call-center",
      icon: <Phone className="w-6 h-6" />,
      title: "Llama a nuestro Call Center",
      description:
        "Habla con nuestro equipo para resolver dudas sobre hospitales, servicios, médicos y procesos de atención.",
      // El número es el dato destacado de la tarjeta y va dentro del CTA: es la
      // acción misma, y en móvil el botón inicia la llamada (doc 3.5.3)
      buttonLabel: `Llamar al ${CALL_CENTER.display}`,
      href: `tel:${CALL_CENTER.tel}`,
    },
    {
      id: "asistente",
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Consulta con nuestro asistente IA",
      description:
        "Encuentra información sobre nuestros hospitales, servicios y opciones de atención de forma rápida y sencilla.",
      buttonLabel: "Iniciar chat",
      action: () => window.dispatchEvent(new CustomEvent("mac:open-chat")),
    },
  ];

  return (
    <section
      id="como-podemos-ayudarte"
      className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 border-b border-gray-150 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-mac-carbon">
            ¿Cómo podemos ayudarte?
          </h2>
          <p className="text-body font-normal text-gray-500 mt-3 max-w-2xl mx-auto">
            Elige el camino que corresponde a lo que necesitas resolver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option) => (
            <div
              key={option.id}
              className="group flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-mac-primary hover:shadow-[0_12px_40px_rgba(26,107,60,0.15)] transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-mac-primary-tint text-mac-primary group-hover:bg-mac-primary group-hover:text-white transition-colors duration-300 mb-5">
                {option.icon}
              </div>

              <h3 className="font-display text-h3 font-medium text-mac-carbon leading-tight">
                {option.title}
              </h3>
              <p className="text-caption font-normal text-gray-500 leading-relaxed mt-2">
                {option.description}
              </p>

              {/* El CTA se ancla abajo para que las cuatro tarjetas cierren igual */}
              <div className="mt-auto pt-6">
                <CTAButton
                  variant="outline"
                  size="lg"
                  className="w-full text-center"
                  href={option.href}
                  onClick={option.action}
                >
                  {option.buttonLabel}
                </CTAButton>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
