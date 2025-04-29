"use client"

/**
 * Contexte de localisation de l'application
 */

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

// Types pour le contexte de localisation
type Location = {
  latitude: number
  longitude: number
  accuracy?: number
  address?: string
}

type LocationContextType = {
  currentLocation: Location | null
  isLoading: boolean
  error: string | null
  updateLocation: () => Promise<void>

  getAddressFromCoordinates: (latitude: number, longitude: number) => Promise<string>
  watchLocation: () => void
  stopWatchingLocation: () => void
}

// Création du contexte
const LocationContext = createContext<LocationContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useLocation = () => {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation doit être utilisé à l'intérieur d'un LocationProvider")
  }
  return context
}

// Provider du contexte
export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [watchId, setWatchId] = useState<number | null>(null)

  // Fonction pour obtenir la position actuelle
  const updateLocation = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        })
      })

      const { latitude, longitude, accuracy } = position.coords

      // Obtenir l'adresse à partir des coordonnées
      const address = await getAddressFromCoordinates(latitude, longitude)

      setCurrentLocation({
        latitude,
        longitude,
        accuracy,
        address,
      })
    } catch (error) {
      setError(getGeolocationErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour obtenir l'adresse à partir des coordonnées
  const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
      // Dans une application réelle, vous utiliseriez une API de géocodage comme Google Maps, Mapbox, etc.
      // Pour cette démo, nous simulons une réponse
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Pétion-Ville, Rue Faubert")
        }, 1000)
      })
    } catch (error) {
      console.error("Erreur lors de la récupération de l'adresse:", error)
      return "Adresse inconnue"
    }
  }

  // Fonction pour surveiller la position
  const watchLocation = () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords

          // Obtenir l'adresse à partir des coordonnées
          const address = await getAddressFromCoordinates(latitude, longitude)

          setCurrentLocation({
            latitude,
            longitude,
            accuracy,
            address,
          })

          setIsLoading(false)
          setError(null)
        },
        (error) => {
          setError(getGeolocationErrorMessage(error))
          setIsLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      )

      setWatchId(id)
    } else {
      setError("La géolocalisation n'est pas prise en charge par votre navigateur")
      setIsLoading(false)
    }
  }

  // Fonction pour arrêter la surveillance de la position
  const stopWatchingLocation = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }
  }

  // Fonction pour obtenir un message d'erreur lisible
  const getGeolocationErrorMessage = (error: any): string => {
    if (error.code) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          return "L'utilisateur a refusé la demande de géolocalisation"
        case error.POSITION_UNAVAILABLE:
          return "Les informations de localisation ne sont pas disponibles"
        case error.TIMEOUT:
          return "La demande de localisation a expiré"
        default:
          return "Une erreur inconnue s'est produite"
      }
    }

    return "Une erreur s'est produite lors de la géolocalisation"
  }

  // Obtenir la position au chargement
  useEffect(() => {
    updateLocation()

    return () => {
      stopWatchingLocation()
    }
  }, [])

  // Valeur du contexte
  const value = {
    currentLocation,
    isLoading,
    error,
    updateLocation,
    getAddressFromCoordinates,
    watchLocation,
    stopWatchingLocation,
  }

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}
