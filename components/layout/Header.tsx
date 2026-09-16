"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, CalendarPlus, Menu, X } from "lucide-react";
import { EXTERNAL, PENDING_ROUTE } from "@/lib/site";

/**
 * Barra de navegación principal — doc 3.2
 *
 * Distingue navegación (secciones del sitio) de CTA (acciones que queremos que
 * el usuario realice). Blog sale del menú: su ubicación definitiva se define en
 * la revisión de arquitectura de contenidos.
 */

const NAV_LINKS = [
  { label: "Somos", href: PENDING_ROUTE },
  { label: "Hospitales", href: "/hospitales" },
  { label: "Directorio médico", href: "/directorio-medico" },
  { label: "Servicios", href: "/servicios" },
  { label: "Maternidad", href: "/maternidad" },
];

const navLinkClass =
  "relative py-1 hover:text-mac-primary transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-mac-primary after:transition-all after:duration-300 hover:after:w-full";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/img/hospitales-mac.svg"
            alt="Hospitales MAC Logo"
            className="h-14 sm:h-18 w-auto"
          />
        </Link>

        {/* Navegación (oculta en mobile) */}
        <nav className="hidden lg:flex items-center space-x-6 text-body font-normal text-mac-carbon">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}

          {/* Pre-registro: acción de alta intención, destacada dentro de la navegación */}
          <Link
            href={EXTERNAL.preRegistro}
            className="px-3 py-1.5 rounded-lg border border-mac-primary text-mac-primary font-medium hover:bg-mac-primary-tint transition-colors duration-200"
          >
            Pre-registro
          </Link>
        </nav>

        {/* CTAs permanentes */}
        <div className="flex items-center space-x-3">
          {/* Urgencias 24/7 — debe llevar a una experiencia orientada a la acción */}
          <Link
            href="/urgencias"
            className="flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-mac-danger text-white rounded-lg border border-red-700/20 shadow-[0_2px_8px_rgba(220,38,38,0.2)] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] transition-all duration-300 ease-in-out text-[13px] sm:text-body font-medium"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Urgencias 24/7</span>
          </Link>

          {/* Agenda tu estudio — hoy resuelve al agendamiento de Imagenología del
              sitio actual, que es la única herramienta disponible (doc 3.2.2) */}
          <Link
            href={EXTERNAL.agendaEstudios}
            className="hidden sm:flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-mac-primary text-white rounded-lg border border-emerald-800/10 shadow-[0_2px_8px_rgba(26,107,60,0.15)] hover:bg-mac-primary-dark hover:shadow-[0_4px_16px_rgba(26,107,60,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-in-out text-body font-medium"
          >
            <CalendarPlus className="w-4 h-4 shrink-0" />
            <span>Agenda tu estudio</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú"
            className="lg:hidden p-2 rounded-lg text-mac-carbon hover:bg-gray-100 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Panel de navegación mobile */}
      {isOpen && (
        <div className="lg:hidden absolute top-24 left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-xl z-50 py-4 px-6 flex flex-col space-y-3 font-display font-medium text-mac-carbon animate-in fade-in slide-in-from-top-4 duration-200 ease-out">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-2.5 border-b border-gray-100 hover:text-mac-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={EXTERNAL.preRegistro}
            className="py-2.5 text-mac-primary hover:text-mac-primary-dark transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Pre-registro
          </Link>

          <Link
            href={EXTERNAL.agendaEstudios}
            className="sm:hidden flex items-center justify-center space-x-1.5 px-4 py-3 bg-mac-primary text-white rounded-lg font-medium text-center w-full shadow-sm hover:bg-mac-primary-dark active:scale-[0.98] transition-all duration-200 mt-2"
            onClick={() => setIsOpen(false)}
          >
            <CalendarPlus className="w-4 h-4 shrink-0" />
            <span>Agenda tu estudio</span>
          </Link>
        </div>
      )}
    </header>
  );
}
