"use client"

/**
 * Contexte de réservation de l'application
 */

import React, { createContext, useState, useContext } from "react"
import { rideService } from "../api/services"
import { useLocation } from "./location-context"

// Types pour le contexte de réservation
type ServiceType = "vtc" | "carpool" | "delivery" | "rental"

type Location = {
  latitude: number
  longitude: number
  address: string
}

type RideEstimate = {
  distance: number
  duration: number
  price: number
  currency: string
}

type Driver = {
  id: string
  name: string
  rating: number
  vehicle: {
    make: string
    model: string
    color: string
    plate: string
  }
  photo: string
  distance: number
  estimatedArrival: number
}

type BookingContextType = {
  serviceType: ServiceType
  origin: Location | null
  destination: Location | null
  estimate: RideEstimate | null
  selectedDriver: Driver | null
  isLoading: boolean
  error: string | null
  setServiceType: (type: ServiceType) => void
  setOrigin: (location: Location) => void
  setDestination: (location: Location) => void
  estimateRide: () => Promise<void>
  findDrivers: () => Promise<Driver[]>
  selectDriver: (driver: Driver) => void
  requestRide: () => Promise<string>
  cancelRide: (rideId: string, reason: string) => Promise<void>
  resetBooking: () => void
}

// Création du contexte
const BookingContext = createContext<BookingContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useBooking = () => {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking doit être utilisé à l'intérieur d'un BookingProvider")
  }
  return context
}

// Provider du contexte
export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentLocation } = useLocation()

  const [serviceType, setServiceType] = useState<ServiceType>("vtc")
  const [origin, setOrigin] = useState<Location | null>(null)
  const [destination, setDestination] = useState<Location | null>(null)
  const [estimate, setEstimate] = useState<RideEstimate | null>(null)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Utiliser la position actuelle comme origine par défaut
  React.useEffect(() => {
    if (currentLocation && !origin) {
      setOrigin({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        address: currentLocation.address || "Position actuelle",
      })
    }
  }, [currentLocation, origin])

  // Fonction pour estimer une course
  const estimateRide = async () => {
    if (!origin || !destination) {
      setError("Veuillez définir une origine et une destination")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await rideService.estimateRide({
        serviceType,
        origin: {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        destination: {
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
      })

      setEstimate(response.data)
    } catch (error) {
      console.error("Erreur lors de l'estimation de la course", error)
      setError("Impossible d'estimer la course. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour trouver des chauffeurs disponibles
  const findDrivers = async (): Promise<Driver[]> => {
    if (!origin) {
      setError("Veuillez définir une origine")
      return []
    }

    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: "driver1",
              name: "Jean Premium",
              rating: 4.9,
              vehicle: {
                make: "Toyota",
                model: "Corolla",
                color: "Blanc",
                plate: "ABC 123",
              },
              photo: "/placeholder.svg?height=100&width=100&text=D1",
              distance: 1.2,
              estimatedArrival: 3,
            },
            {
              id: "driver2",
              name: "Pierre Standard",
              rating: 4.7,
              vehicle: {
                make: "Honda",
                model: "Civic",
                color: "Noir",
                plate: "DEF 456",
              },
              photo: "/placeholder.svg?height=100&width=100&text=D2",
              distance: 2.5,
              estimatedArrival: 5,
            },
          ])
        }, 1500)
      })
    } catch (error) {
      console.error("Erreur lors de la recherche de chauffeurs", error)
      setError("Impossible de trouver des chauffeurs. Veuillez réessayer.")
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour sélectionner un chauffeur
  const selectDriver = (driver: Driver) => {
    setSelectedDriver(driver)
  }

  // Fonction pour demander une course
  const requestRide = async (): Promise<string> => {
    if (!origin || !destination || !selectedDriver) {
      setError("Informations manquantes pour la demande de course")
      return ""
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await rideService.requestRide({
        serviceType,
        origin: {
          latitude: origin.latitude,
          longitude: origin.longitude,
          address: origin.address,
        },
        destination: {
          latitude: destination.latitude,
          longitude: destination.longitude,
          address: destination.address,
        },
        driverId: selectedDriver.id,
      })

      return response.data.rideId
    } catch (error) {
      console.error("Erreur lors de la demande de course", error)
      setError("Impossible de demander la course. Veuillez réessayer.")
      return ""
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour annuler une course
  const cancelRide = async (rideId: string, reason: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await rideService.cancelRide(rideId, reason)
    } catch (error) {
      console.error("Erreur lors de l'annulation de la course", error)
      setError("Impossible d'annuler la course. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour réinitialiser la réservation
  const resetBooking = () => {
    setDestination(null)
    setEstimate(null)
    setSelectedDriver(null)
    setError(null)
  }

  // Valeur du contexte
  const value = {
    serviceType,
    origin,
    destination,
    estimate,
    selectedDriver,
    isLoading,
    error,
    setServiceType,
    setOrigin,
    setDestination,
    estimateRide,
    findDrivers,
    selectDriver,
    requestRide,
    cancelRide,
    resetBooking,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
