import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-mac-primary-dark to-black text-white pt-12 pb-6 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
        {/* Column 1 - Brand */}
        <div className="flex flex-col space-y-4 lg:col-span-2">
          <Link href="/" className="flex items-center">
            <img
              src="/img/hospitales-mac.svg"
              alt="Hospitales MAC Logo"
              className="h-28 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-caption font-normal text-white/90 max-w-xs leading-relaxed">
            Red nacional de hospitales de alta especialidad. 25 unidades en México.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2 - Servicios */}
        <div className="flex flex-col space-y-3">
          <span className="text-body font-medium text-mac-primary-light uppercase tracking-wider">
            Servicios
          </span>
          <nav className="flex flex-col space-y-2 text-body font-normal text-white/95">
            <Link href="/maternidad" className="hover:text-mac-primary-light transition-colors">
              Maternidad
            </Link>
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Laboratorio
            </Link>
            <a href="tel:911" className="hover:text-mac-primary-light transition-colors">
              Urgencias 24/7
            </a>
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Imagenología
            </Link>
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Quirófanos
            </Link>
          </nav>
        </div>

        {/* Column 3 - Empresas */}
        <div className="flex flex-col space-y-3">
          <span className="text-body font-medium text-mac-primary-light uppercase tracking-wider">
            Empresas
          </span>
          <nav className="flex flex-col space-y-2 text-body font-normal text-white/95">
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Check-ups corporativos
            </Link>
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Medicina del trabajo
            </Link>
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Convenios empresa
            </Link>
          </nav>
        </div>

        {/* Column 4 - Médicos */}
        <div className="flex flex-col space-y-3">
          <span className="text-body font-medium text-mac-primary-light uppercase tracking-wider">
            Médicos
          </span>
          <nav className="flex flex-col space-y-2 text-body font-normal text-white/95">
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Consultorios
            </Link>
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Credencialización
            </Link>
          </nav>
        </div>

        {/* Column 5 - Pacientes */}
        <div className="flex flex-col space-y-3">
          <span className="text-body font-medium text-mac-primary-light uppercase tracking-wider">
            Pacientes
          </span>
          <nav className="flex flex-col space-y-2 text-body font-normal text-white/95">
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Resultados en línea
            </Link>
            <Link href="#" className="hover:text-mac-primary-light transition-colors">
              Referencia de pago
            </Link>
          </nav>
        </div>
      </div>

      {/* Institutional links */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-8 border-t border-white/10 text-body font-normal text-white/95">
        <Link href="#" className="hover:text-mac-primary-light transition-colors">
          Fundación Hospitales MAC
        </Link>
        <span className="text-white/30">·</span>
        <Link href="#" className="hover:text-mac-primary-light transition-colors">
          Inversionistas
        </Link>
        <span className="text-white/30">·</span>
        <Link href="#" className="hover:text-mac-primary-light transition-colors">
          Código de Ética
        </Link>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-caption font-normal text-white/60 space-y-4 md:space-y-0">
        <div>
          <span>© 2026 Hospitales MAC · Todos los derechos reservados</span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition-colors">
            Aviso de privacidad
          </a>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors">
            Términos de uso
          </a>
        </div>
      </div>
    </footer>
  );
}
