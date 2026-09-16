import React from "react";
import { Phone } from "lucide-react";
import { CALL_CENTER } from "@/lib/site";

/**
 * Botón flotante de Call Center — doc 3.12
 *
 * Sustituye al botón rojo de teléfono, cuyo tratamiento visual se asociaba a una
 * emergencia y duplicaba el CTA de Urgencias 24/7. Va en verde del sistema
 * visual MAC para diferenciarlo claramente.
 *
 * Los tres accesos persistentes tienen funciones distintas:
 *   Urgencias 24/7 → necesito atención inmediata.
 *   Call Center    → quiero hablar con una persona.
 *   Asistente IA   → quiero resolver una duda.
 */
export default function FloatingCallCenter() {
  return (
    <a
      href={`tel:${CALL_CENTER.tel}`}
      className="group fixed bottom-8 left-8 z-40 flex items-center h-14 rounded-full bg-mac-primary text-white shadow-[0_4px_20px_rgba(26,107,60,0.35)] hover:shadow-[0_6px_28px_rgba(26,107,60,0.5)] active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
      title={`${CALL_CENTER.label} — ${CALL_CENTER.display}`}
      aria-label={`Llamar al ${CALL_CENTER.label}, ${CALL_CENTER.display}`}
    >
      <span className="w-14 h-14 flex items-center justify-center shrink-0">
        <Phone className="w-6 h-6" />
      </span>

      {/* En desktop el número se revela al interactuar con el botón; en mobile
          el toque inicia directamente la llamada */}
      <span className="hidden sm:block max-w-0 group-hover:max-w-[220px] group-focus-visible:max-w-[220px] transition-all duration-300 ease-out whitespace-nowrap">
        <span className="block pr-5 text-body font-medium">
          {CALL_CENTER.display}
        </span>
      </span>
    </a>
  );
}
