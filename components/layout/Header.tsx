"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, CalendarPlus, Menu, X } from "lucide-react";

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

        {/* Central Nav (hidden on mobile) */}
        <nav className="hidden lg:flex items-center space-x-6 text-body font-normal text-mac-carbon">
          <Link href="#" className="relative py-1 hover:text-mac-primary transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-mac-primary after:transition-all after:duration-300 hover:after:w-full">
            Somos
          </Link>
          <Link href="/hospitales/celaya" className="relative py-1 hover:text-mac-primary transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-mac-primary after:transition-all after:duration-300 hover:after:w-full">
            Hospitales
          </Link>
          <Link href="/directorio-medico" className="relative py-1 hover:text-mac-primary transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-mac-primary after:transition-all after:duration-300 hover:after:w-full">
            Directorio médico
          </Link>
          <Link href="#" className="relative py-1 hover:text-mac-primary transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-mac-primary after:transition-all after:duration-300 hover:after:w-full">
            Servicios
          </Link>
          <Link href="/maternidad" className="relative py-1 text-mac-primary font-medium hover:text-mac-primary-dark transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-mac-primary-dark after:transition-all after:duration-300 hover:after:w-full">
            Maternidad
          </Link>
          <Link href="/blog" className="relative py-1 hover:text-mac-primary transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-mac-primary after:transition-all after:duration-300 hover:after:w-full">
            Blog
          </Link>
        </nav>

        {/* CTAs & Hamburger Toggle */}
        <div className="flex items-center space-x-3">
          {/* Urgent button (always visible) */}
          <a
            href="tel:911"
            className="flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-mac-danger text-white rounded-lg border border-red-700/20 shadow-[0_2px_8px_rgba(220,38,38,0.2)] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] transition-all duration-300 ease-in-out text-[13px] sm:text-body font-medium"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Urgencias 24/7</span>
          </a>

          {/* Book Appointment (hidden on mobile) */}
          <Link
            href="/directorio-medico"
            className="hidden sm:flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-mac-primary text-white rounded-lg border border-emerald-800/10 shadow-[0_2px_8px_rgba(26,107,60,0.15)] hover:bg-mac-primary-dark hover:shadow-[0_4px_16px_rgba(26,107,60,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-in-out text-body font-medium"
          >
            <CalendarPlus className="w-4 h-4 shrink-0" />
            <span>Agendar cita</span>
          </Link>

          {/* Hamburger Icon Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú"
            className="lg:hidden p-2 rounded-lg text-mac-carbon hover:bg-gray-100 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      {isOpen && (
        <div className="lg:hidden absolute top-24 left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-xl z-50 py-4 px-6 flex flex-col space-y-3 font-display font-medium text-mac-carbon animate-in fade-in slide-in-from-top-4 duration-200 ease-out">
          <Link 
            href="#" 
            className="py-2.5 border-b border-gray-100 hover:text-mac-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Somos
          </Link>
          <Link 
            href="/hospitales/celaya" 
            className="py-2.5 border-b border-gray-100 hover:text-mac-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Hospitales
          </Link>
          <Link 
            href="/directorio-medico" 
            className="py-2.5 border-b border-gray-100 hover:text-mac-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Directorio médico
          </Link>
          <Link 
            href="#" 
            className="py-2.5 border-b border-gray-100 hover:text-mac-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Servicios
          </Link>
          <Link
            href="/maternidad"
            className="py-2.5 text-mac-primary hover:text-mac-primary-dark transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Maternidad
          </Link>
          <Link
            href="/blog"
            className="py-2.5 border-b border-gray-100 hover:text-mac-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>

          {/* Mobile-only CTA */}
          <Link
            href="/directorio-medico"
            className="sm:hidden flex items-center justify-center space-x-1.5 px-4 py-3 bg-mac-primary text-white rounded-lg font-medium text-center w-full shadow-sm hover:bg-mac-primary-dark active:scale-[0.98] transition-all duration-200 mt-2"
            onClick={() => setIsOpen(false)}
          >
            <CalendarPlus className="w-4 h-4 shrink-0" />
            <span>Agendar cita</span>
          </Link>
        </div>
      )}
    </header>
  );
}
