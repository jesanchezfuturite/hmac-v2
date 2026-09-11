import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { CALL_CENTER, PENDING_ROUTE } from "@/lib/site";

/**
 * Franja superior / Utility Bar — doc 3.1
 *
 * Accesos de alta relevancia por grupo de interés. "Soy paciente" y "Soy médico"
 * no son enlaces de menú: deben conducir a un hub de servicios por perfil.
 */
export default function TopBar() {
  // TODO: apuntar a los hubs /soy-paciente y /soy-medico cuando existan (doc 3.1.2 y 3.1.3)
  const profileLinks = [
    { label: "Soy paciente", href: PENDING_ROUTE },
    { label: "Soy médico", href: PENDING_ROUTE },
    { label: "Trabaja con nosotros", href: PENDING_ROUTE },
  ];

  return (
    <div className="w-full bg-mac-primary-dark text-white text-caption font-normal py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-6">
        {/* Call Center Nacional — mismo número en todo el sitio */}
        <a
          href={`tel:${CALL_CENTER.tel}`}
          className="flex items-center text-white hover:text-mac-primary-light transition-colors"
        >
          <Phone className="w-3.5 h-3.5 mr-1.5 text-mac-primary-light" />
          <span className="font-medium">{CALL_CENTER.display}</span>
          <span className="hidden sm:inline text-white/70 ml-1.5">
            · {CALL_CENTER.label}
          </span>
        </a>

        {/* Accesos por perfil */}
        <div className="hidden md:flex items-center space-x-6">
          {profileLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white hover:text-mac-primary-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
