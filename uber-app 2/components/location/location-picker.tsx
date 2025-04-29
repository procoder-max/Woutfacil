"use client"

import { useState, useEffect } from "react"
import { MapPin, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"

interface LocationPickerProps {
  onLocationSelect?: (location: { address: string; latitude: number; longitude: number }) => void
  className?: string
}

export default function LocationPicker({ onLocationSelect, className = "" }: LocationPickerProps) {
  const { latitude, longitude, accuracy, error, loading, address, requestGeolocation } = useGeolocation()
  const [locationSelected, setLocationSelected] = useState(false)

  useEffect(() => {
    if (address && latitude && longitude && !locationSelected) {
      // Si nous avons une adresse et des coordonnées, nous pouvons les utiliser
      if (onLocationSelect) {
        onLocationSelect({
          address,
          latitude,
          longitude,
        })
        setLocationSelected(true)
      }
    }
  }, [address, latitude, longitude, onLocationSelect, locationSelected])

  const handleRequestLocation = () => {
    setLocationSelected(false)
    requestGeolocation()
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center">
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center text-zinc-400">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              <span>Détermination de votre position...</span>
            </div>
          ) : error ? (
            <div className="flex items-center text-red-400">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>{error}</span>
            </div>
          ) : address ? (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
              <span>{address}</span>
              {accuracy && <span className="text-xs text-zinc-400 ml-2">(±{Math.round(accuracy)}m)</span>}
            </div>
          ) : (
            <div className="flex items-center text-zinc-400">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Position non disponible</span>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="ml-2 border-emerald-600 text-emerald-500"
          onClick={handleRequestLocation}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
