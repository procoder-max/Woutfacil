"use client"

import { useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"

interface LocationMapProps {
  latitude: number | null
  longitude: number | null
  loading?: boolean
  error?: string | null
  className?: string
}

export default function LocationMap({
  latitude,
  longitude,
  loading = false,
  error = null,
  className = "",
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || loading || error || !latitude || !longitude) return

    // Dans une application réelle, vous utiliseriez une bibliothèque de cartographie comme Mapbox, Google Maps, Leaflet, etc.
    // Pour cette démo, nous affichons simplement une image statique avec les coordonnées

    const mapElement = mapRef.current
    mapElement.innerHTML = ""

    const mapImage = document.createElement("img")
    mapImage.src = `/placeholder.svg?height=300&width=400&text=Map:${latitude.toFixed(4)},${longitude.toFixed(4)}`
    mapImage.alt = "Carte de localisation"
    mapImage.className = "w-full h-full object-cover"

    // Ajouter un marqueur
    const marker = document.createElement("div")
    marker.className =
      "absolute w-6 h-6 bg-emerald-500 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2"
    marker.style.top = "50%"
    marker.style.left = "50%"

    // Ajouter un effet de pulsation
    const pulse = document.createElement("div")
    pulse.className =
      "absolute w-12 h-12 bg-emerald-500 rounded-full opacity-30 animate-ping transform -translate-x-1/2 -translate-y-1/2"
    pulse.style.top = "50%"
    pulse.style.left = "50%"

    mapElement.appendChild(mapImage)
    mapElement.appendChild(pulse)
    mapElement.appendChild(marker)
  }, [latitude, longitude, loading, error])

  if (loading) {
    return (
      <div
        className={`bg-zinc-800 rounded-lg flex items-center justify-center ${className}`}
        style={{ minHeight: "200px" }}
      >
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`bg-zinc-800 rounded-lg flex items-center justify-center p-4 ${className}`}
        style={{ minHeight: "200px" }}
      >
        <p className="text-red-400 text-center">{error}</p>
      </div>
    )
  }

  if (!latitude || !longitude) {
    return (
      <div
        className={`bg-zinc-800 rounded-lg flex items-center justify-center p-4 ${className}`}
        style={{ minHeight: "200px" }}
      >
        <p className="text-zinc-400 text-center">Position non disponible</p>
      </div>
    )
  }

  return (
    <div
      ref={mapRef}
      className={`bg-zinc-800 rounded-lg relative overflow-hidden ${className}`}
      style={{ minHeight: "200px" }}
    />
  )
}
