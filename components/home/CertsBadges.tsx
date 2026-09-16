"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Calidad que nos respalda — doc 3.10
 *
 * Evidencia externa de estándares. El concepto deja de ser "Calidad Certificada"
 * porque no todos los elementos son certificaciones: hay acreditaciones,
 * distintivos y reconocimientos, y cada uno debe comunicarse según su alcance
 * real.
 *
 * Reglas aplicadas a las descripciones: sin "máximos estándares", "certificación
 * obligatoria", "garantiza la calidad" ni "certificado para toda la red". El
 * texto definitivo de cada reconocimiento debe ser proporcionado y/o validado
 * por Hospitales MAC.
 *
 * TODO: administrar desde CMS (tipo, organismo, vigencia, estatus y hospitales a
 * los que aplica) para que cada sede muestre automáticamente los suyos en su
 * landing, con una sola fuente de información (doc 3.10.4 y 3.10.6).
 */
export default function CertsBadges() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Contenido pendiente de validación institucional (doc 3.10.3)
  const certs = [
    {
      name: "Consejo de Salubridad General",
      type: "Certificación",
      issuer: "Consejo de Salubridad General",
      desc: "Certificación de establecimientos de atención médica dentro del Sistema Nacional de Certificación.",
      img: "/img/certificacion/consejo-salubridad-general.png",
    },
    {
      name: "ISQua",
      type: "Acreditación",
      issuer: "International Society for Quality in Health Care",
      desc: "Organismo internacional que acredita estándares de calidad aplicados a servicios de salud.",
      img: "/img/certificacion/isqua.png",
    },
    {
      name: "Distintivo H",
      type: "Distintivo",
      issuer: "Secretaría de Turismo",
      desc: "Distintivo al manejo higiénico de alimentos y bebidas.",
      img: "/img/certificacion/distintivo-h-logo-png_seeklogo-250457.png",
    },
    {
      name: "Best Practices Hospital",
      type: "Reconocimiento",
      issuer: "Pendiente de confirmar",
      desc: "Reconocimiento a la implementación de prácticas clínicas y operativas documentadas.",
      img: "/img/certificacion/best-practices.png",
    },
    {
      name: "Norma Oficial Mexicana",
      type: "Certificación",
      issuer: "Secretaría de Salud",
      desc: "Cumplimiento de las normas oficiales mexicanas aplicables a la operación hospitalaria.",
      img: "/img/certificacion/images.png",
    },
  ];

  // Autostart vertical slider cycling every 4 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, certs.length]);

  // Prevent out-of-bounds indices during hot-reloads or list changes
  useEffect(() => {
    if (activeIndex >= certs.length) {
      setActiveIndex(0);
    }
  }, [certs.length, activeIndex]);

  const safeIndex = activeIndex >= certs.length ? 0 : activeIndex;

  return (
    <section className="relative text-mac-carbon py-24 px-4 border-b border-gray-150 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/certificaciones.mp4" type="video/mp4" />
      </video>

      {/* Light Theme Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100/70 via-gray-50/60 to-white/75 backdrop-blur-[1px] z-10" />

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Split Layout Container */}
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center">
          <div className="col-span-12 lg:col-span-6 h-auto lg:h-[400px] flex flex-col justify-center text-center lg:text-left py-6 lg:py-0">
            <h2 className="font-display text-3xl font-medium tracking-tight text-mac-carbon mb-6">
              Calidad que nos respalda
            </h2>

            
            <AnimatePresence mode="wait">
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-center lg:items-start"
              >
                <span className="text-caption font-medium tracking-wider text-mac-primary uppercase">
                  {certs[safeIndex].type}
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-medium text-mac-carbon tracking-tight mt-2 leading-tight">
                  {certs[safeIndex].name}
                </h3>

                <p className="text-caption font-normal text-gray-500 mt-1">
                  Otorga: {certs[safeIndex].issuer}
                </p>

                <p className="text-body sm:text-base font-normal text-gray-600 leading-relaxed mt-4 max-w-lg">
                  {certs[safeIndex].desc}
                </p>

                {/* No todas las certificaciones aplican a todas las sedes */}
                <p className="text-caption font-normal text-gray-400 mt-4 max-w-lg">
                  Cada reconocimiento aplica a las sedes que lo tienen vigente.
                  Consulta el detalle en la página de cada hospital.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column (40% width on large screens): Vertical Autostart Thumbnail Slider */}
          <div 
            className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Viewport container with sharp corners, no borders, no margins */}
            <div className="w-full max-w-[320px] sm:max-w-[420px] h-[400px] relative overflow-hidden flex flex-col items-center">
              
              {/* Top and Bottom shadow masks for fading scroll effect */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-100 to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

              {/* Slider vertical rail */}
              <div
                className="w-full transition-transform duration-500 ease-in-out absolute top-0 left-0 right-0 flex flex-col items-center"
                style={{
                  transform: `translateY(${-safeIndex * 200 + 100}px)`,
                }}
              >
                {certs.map((cert, idx) => {
                  const isActive = idx === safeIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className="h-[200px] w-full flex items-center justify-center shrink-0 cursor-pointer select-none transition-all duration-300"
                    >
                      {/* Logo container: transparent background, scaling transition */}
                      <div 
                        className={`w-full max-w-[260px] sm:max-w-[360px] h-[150px] sm:h-[180px] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
                          isActive
                            ? "opacity-100 scale-105"
                            : "opacity-45 scale-95"
                        }`}
                      >
                        <img
                          src={cert.img}
                          alt={cert.name}
                          className={`max-w-full max-h-full object-contain pointer-events-none transition-all duration-300 ${
                            isActive ? "filter-none" : "filter grayscale"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
