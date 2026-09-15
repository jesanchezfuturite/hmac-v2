"use client";

import { useCallback, useEffect, useState } from "react";
import type { Coords } from "./geo";

/**
 * Ubicación del usuario — doc 3.6.2 y 3.2.3
 *
 * Nunca bloquea la experiencia: si el usuario no da permiso, o el navegador no
 * lo soporta, la pantalla sigue funcionando con el orden por defecto.
 *
 * `auto` pide la ubicación al montar. Se usa en Urgencias, donde el documento
 * pide reducir los pasos al mínimo; en el resto se solicita con un botón.
 */
export type LocationStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unavailable";

export function useUserLocation({ auto = false } = {}) {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [coords, setCoords] = useState<Coords | null>(null);

  const request = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }

    setStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  }, []);

  useEffect(() => {
    if (!auto) return;
    // Se difiere un tick: pedir la ubicación en el propio efecto encadena un
    // render extra al montar
    const timer = window.setTimeout(request, 0);
    return () => window.clearTimeout(timer);
  }, [auto, request]);

  return { status, coords, request };
}
