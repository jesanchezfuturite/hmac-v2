"use client";

import React from "react";
import { Bot, MessageSquare } from "lucide-react";
import CTAButton from "../shared/CTAButton";

export default function ChatbotBanner() {
  return (
    <section className="bg-white py-12 px-4 border-b border-gray-150">
      <div className="max-w-7xl mx-auto border border-gray-100 bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.04)] hover:border-mac-primary/30 transition-all duration-300">
        
        {/* Left and Center Container */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-5 text-center md:text-left">
          {/* Bot Avatar with premium gradient */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-mac-primary-dark to-mac-primary-light text-white flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(15,110,86,0.15)]">
            <Bot className="w-7 h-7 animate-pulse" style={{ animationDuration: "3s" }} />
          </div>
          
          {/* Text block */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <h3 className="text-h3 font-medium text-mac-carbon tracking-tight">Asistente Virtual MAC</h3>
              <span className="inline-block px-2 py-0.5 text-[9px] font-medium text-mac-primary bg-mac-primary-tint rounded-full uppercase tracking-wider">
                IA
              </span>
            </div>
            <p className="text-caption font-normal text-gray-500 mt-2 max-w-2xl leading-relaxed">
              ¿Tienes dudas sobre ubicaciones, horarios, especialidades o directorios? Nuestro asistente institucional puede guiarte en segundos.
              <span className="block font-medium text-mac-primary-dark mt-1">
                *Nota: Este canal es puramente informativo y de orientación general; no brinda diagnósticos, consultas médicas ni atención de urgencias.
              </span>
            </p>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="shrink-0 w-full md:w-auto">
          <CTAButton
            variant="primary"
            size="lg"
            className="w-full md:w-auto shadow-[0_4px_14px_rgba(26,107,60,0.15)] hover:shadow-[0_6px_20px_rgba(26,107,60,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 px-6 py-3.5"
            icon={<MessageSquare className="w-5 h-5" />}
            onClick={() => alert("Asistente virtual de orientación. ¡Próximamente disponible!")}
          >
            Iniciar chat
          </CTAButton>
        </div>

      </div>
    </section>
  );
}
