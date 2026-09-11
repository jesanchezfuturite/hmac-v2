"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import CTAButton from "../shared/CTAButton";

/**
 * Lo que dicen nuestros pacientes — doc 3.8
 *
 * Prueba social real. Las reseñas deben provenir de las fichas públicas de
 * Google de cada sede mediante una integración oficial (Google Business Profile
 * / Places), conservando calificación, hospital, fecha y atribución a Google.
 *
 * Reglas que quedan fijadas en este componente:
 * - Solo reseñas de 4 y 5 estrellas, comunicando que son opiniones seleccionadas.
 * - Rotación nacional: evitar repetir sede hasta dar oportunidad a las demás.
 * - Cada reseña identifica el hospital de origen.
 * - La invitación a opinar es neutral y no presupone una experiencia positiva.
 */
interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  hospital: string;
  date: string;
}

// TODO: sustituir por la respuesta de la integración oficial con Google.
// Futurite debe documentar: fuente, método, actualización automática, atribución,
// manejo de reseñas eliminadas y límites de API/licenciamiento (doc 3.8.8).
const SAMPLE_REVIEWS: Review[] = [
  {
    id: "1",
    author: "María G.",
    rating: 5,
    text: "Excelente experiencia en el parto. El equipo médico fue muy profesional y la atención humanizada.",
    hospital: "Hospital MAC Celaya",
    date: "Hace 2 meses",
  },
  {
    id: "2",
    author: "Carlos M.",
    rating: 5,
    text: "Muy satisfecho con la atención recibida. El médico explicó todo con claridad y el seguimiento ha sido puntual.",
    hospital: "Hospital MAC Querétaro",
    date: "Hace 1 mes",
  },
  {
    id: "3",
    author: "Laura R.",
    rating: 4,
    text: "Llevé a mi hijo a consulta. Personal amable y las instalaciones muy limpias. Volveremos.",
    hospital: "Hospital MAC Irapuato",
    date: "Hace 3 semanas",
  },
  {
    id: "4",
    author: "Juan P.",
    rating: 5,
    text: "Llegué de madrugada a urgencias, me atendieron pronto y el diagnóstico fue claro.",
    hospital: "Hospital MAC Aguascalientes Norte",
    date: "Hace 10 días",
  },
];

// Sedes disponibles para el flujo "¿En qué Hospital MAC recibiste atención?"
const HOSPITALS = [
  "Hospital MAC Aguascalientes Norte",
  "Hospital MAC Celaya",
  "Hospital MAC Irapuato",
  "Hospital MAC León",
  "Hospital MAC Puebla",
  "Hospital MAC Querétaro",
];

export default function GoogleReviewsSection() {
  const [selectedHospital, setSelectedHospital] = useState("");

  // TODO: usar el place_id de cada sede para abrir directamente el formulario de
  // reseña de su ficha de Google (doc 3.8.7)
  const reviewUrl = selectedHospital
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHospital)}`
    : undefined;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 border-b border-gray-150">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-mac-carbon">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="text-body font-normal text-gray-500 mt-3 max-w-2xl mx-auto">
            Opiniones publicadas por pacientes en Google. Seleccionamos para este
            espacio reseñas de 4 y 5 estrellas de las distintas sedes de la red.
          </p>
        </div>

        {/* Aviso de estado: el contenido definitivo llega de la integración con Google */}
        <div className="mb-10 mx-auto max-w-2xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-caption font-normal text-amber-900 text-center">
          Vista previa con contenido de ejemplo. Al conectar Google Business
          Profile se mostrarán reseñas reales con rotación entre las 25 sedes.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {SAMPLE_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:border-mac-primary hover:shadow-[0_12px_32px_rgba(26,107,60,0.08)] transition-all duration-300"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`Calificación: ${review.rating} de 5`}
                  >
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
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

              <p className="text-body font-normal text-gray-700 leading-relaxed mb-4">
                {review.text}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-caption font-medium text-mac-carbon">
                  {review.author}
                </span>
                {/* Atribución obligatoria: la opinión es de Google, no un
                    testimonio propio de Hospitales MAC */}
                <span className="text-caption font-normal text-gray-400">
                  Reseña publicada en Google
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Invitación neutral a compartir experiencia */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 text-center flex flex-col items-center gap-6">
          <div>
            <h3 className="font-display text-2xl font-medium text-mac-carbon mb-2">
              Cuéntanos sobre tu experiencia
            </h3>
            <p className="text-body font-normal text-gray-500 max-w-md">
              Tu opinión nos ayuda a seguir mejorando.
            </p>
          </div>

          {/* Desde la Home hay que saber en qué sede fue la atención; dentro de
              la página de un hospital este paso se omite (doc 3.8.7) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xl">
            <label htmlFor="review-hospital" className="sr-only">
              ¿En qué Hospital MAC recibiste atención?
            </label>
            <select
              id="review-hospital"
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-body text-mac-carbon bg-white focus:outline-none focus:border-mac-primary"
            >
              <option value="">¿En qué Hospital MAC recibiste atención?</option>
              {HOSPITALS.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>

            {reviewUrl ? (
              <CTAButton variant="primary" size="lg" href={reviewUrl}>
                Compartir mi experiencia
              </CTAButton>
            ) : (
              <span className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-100 text-gray-400 text-body font-medium select-none">
                Compartir mi experiencia
              </span>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
