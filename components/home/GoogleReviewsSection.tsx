"use client";

import React from "react";
import { Star, MessageCircle } from "lucide-react";
import CTAButton from "../shared/CTAButton";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  hospital: string;
  date: string;
}

export default function GoogleReviewsSection() {
  // Datos de ejemplo — estas reseñas serían curadas y actualizadas por MAC
  const reviews: Review[] = [
    {
      id: "1",
      author: "María González",
      rating: 5,
      text: "Excelente experiencia en el parto. El equipo médico fue muy profesional, las instalaciones impecables y la atención humanizada. Recomiendo ampliamente Hospitales MAC.",
      hospital: "Hospital MAC Celaya",
      date: "Hace 2 meses",
    },
    {
      id: "2",
      author: "Carlos Mendoza",
      rating: 5,
      text: "Muy satisfecho con la atención recibida en cardiología. El cardiólogo fue muy atento, explicó todo con claridad y el seguimiento ha sido excelente. Gracias MAC.",
      hospital: "Hospital MAC Guadalajara",
      date: "Hace 1 mes",
    },
    {
      id: "3",
      author: "Laura Rodríguez",
      rating: 5,
      text: "Llevé a mi hijo al pediatra y fue una experiencia fantástica. Personal amable, consulta completa y las instalaciones muy limpias. Volveremos sin dudarlo.",
      hospital: "Hospital MAC CDMX",
      date: "Hace 3 semanas",
    },
    {
      id: "4",
      author: "Juan Pérez",
      rating: 5,
      text: "Urgencias 24/7 realmente funciona. Llegué en la madrugada, me atendieron de inmediato y el diagnóstico fue rápido y preciso. Muy profesionales.",
      hospital: "Hospital MAC Aguascalientes",
      date: "Hace 10 días",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 border-b border-gray-150">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="inline-flex bg-[#95c124] px-3 py-1 rounded-full text-[10px] font-medium tracking-widest text-white uppercase select-none mb-4 w-fit mx-auto">
            Recomendaciones
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-mac-carbon">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="text-body font-normal text-gray-500 mt-3 max-w-2xl mx-auto">
            Historias reales de pacientes que confiaron en Hospitales MAC para su salud y la de sus familias.
          </p>
        </div>

        {/* Reviews Grid: 2 columns on desktop, 1 on tablet/mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:border-mac-primary hover:shadow-[0_12px_32px_rgba(26,107,60,0.08)] transition-all duration-300"
            >
              {/* Header: Rating + Hospital */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-caption font-normal text-gray-400">
                    {review.date}
                  </span>
                </div>
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-medium text-mac-primary bg-mac-primary-tint rounded-full">
                  {review.hospital}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-body font-normal text-gray-700 leading-relaxed mb-4 line-clamp-4">
                {review.text}
              </p>

              {/* Author + Icon */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-caption font-medium text-mac-carbon">
                  {review.author}
                </span>
                <MessageCircle className="w-4 h-4 text-mac-primary-light" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 text-center flex flex-col items-center gap-6">
          <div>
            <h3 className="font-display text-2xl font-medium text-mac-carbon mb-2">
              ¿Tuviste una experiencia positiva?
            </h3>
            <p className="text-body font-normal text-gray-500 max-w-md">
              Comparte tu historia en Google. Tu reseña ayuda a otros a confiar en Hospitales MAC.
            </p>
          </div>
          <CTAButton
            variant="primary"
            size="lg"
            href="#"
            onClick={() => alert("Redirección a dejar reseña en Google (setup pendiente)")}
          >
            Dejar reseña en Google
          </CTAButton>
        </div>

      </div>
    </section>
  );
}
