"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Share2, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import LocationMap from "@/components/location/location-map"
import Link from "next/link"

export default function LocationPage() {
  const { latitude, longitude, accuracy, error, loading, address, requestGeolocation } = useGeolocation()
  const [formattedCoords, setFormattedCoords] = useState<string | null>(null)

  useEffect(() => {
    if (latitude && longitude) {
      setFormattedCoords(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
    } else {
      setFormattedCoords(null)
    }
  }, [latitude, longitude])

  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Ma position</h1>
      </div>

      {/* Map */}
      <div className="p-4">
        <LocationMap
          latitude={latitude}
          longitude={longitude}
          loading={loading}
          error={error}
          className="w-full h-64"
        />
      </div>

      {/* Location Info */}
      <div className="p-4 flex-1">
        <div className="bg-zinc-800 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-emerald-500 mr-2" />
            <h2 className="font-medium">Position actuelle</h2>
          </div>

          {loading ? (
            <p className="text-zinc-400">Détermination de votre position...</p>
          ) : error ? (
            <div>
              <p className="text-red-400 mb-2">{error}</p>
              <Button variant="outline" className="border-emerald-600 text-emerald-500" onClick={requestGeolocation}>
                Réessayer
              </Button>
            </div>
          ) : (
            <>
              <p className="font-medium mb-1">{address || "Adresse inconnue"}</p>
              {formattedCoords && <p className="text-sm text-zinc-400 mb-2">Coordonnées: {formattedCoords}</p>}
              {accuracy && <p className="text-xs text-zinc-500">Précision: ±{Math.round(accuracy)} mètres</p>}
            </>
          )}
        </div>

        <div className="flex space-x-2 mb-4">
          <Button
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={requestGeolocation}
            disabled={loading}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-zinc-700 text-white hover:bg-zinc-800"
            disabled={!formattedCoords}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>

        <div className="bg-zinc-800 rounded-lg p-4">
          <h3 className="font-medium mb-2">À propos de la géolocalisation</h3>
          <p className="text-sm text-zinc-400">
            La géolocalisation utilise le GPS, le Wi-Fi et les réseaux mobiles pour déterminer votre position. La
            précision peut varier en fonction de votre appareil et de votre environnement.
          </p>
        </div>
      </div>
    </main>
  )
}
