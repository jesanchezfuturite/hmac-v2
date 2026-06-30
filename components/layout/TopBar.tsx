import React from "react";
import { Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-mac-primary-dark text-white text-caption font-normal py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-6">
        {/* Left Side: Tel and Hospitals Count */}
        <div className="flex items-center space-x-3">
          <a
            href="tel:8006220800"
            className="flex items-center text-white hover:text-mac-primary-light transition-colors"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-mac-primary-light" />
            <span className="font-medium">800 MAC 0800</span>
          </a>
          <span className="text-white/40">|</span>
          <span className="text-white">25 hospitales en México</span>
        </div>

        {/* Right Side: Quick Links (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-white hover:text-mac-primary-light transition-colors">
            Portal de pacientes
          </a>
          <a href="#" className="text-white hover:text-mac-primary-light transition-colors">
            Facturación
          </a>
          <a href="#" className="text-white hover:text-mac-primary-light transition-colors">
            Trabaja con nosotros
          </a>
        </div>
      </div>
    </div>
  );
}
