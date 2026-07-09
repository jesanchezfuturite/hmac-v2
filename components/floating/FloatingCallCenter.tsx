"use client";

import React from "react";
import { Phone } from "lucide-react";

export default function FloatingCallCenter() {
  return (
    <a
      href="tel:8006220800"
      className="fixed bottom-8 left-8 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-mac-danger text-white shadow-[0_4px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.55)] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
      title="Llamar al Call Center — 800 622 0800"
      aria-label="Call Center Hospitales MAC"
    >
      <Phone className="w-6 h-6 group-hover:animate-pulse" />
    </a>
  );
}
