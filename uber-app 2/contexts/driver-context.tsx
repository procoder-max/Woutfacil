"use client"

/**
 * Contexte chauffeur de l'application
 */

import type React from "react"
import { createContext, useState, useContext } from "react"
import { useLocation } from "./location-context"

// Types pour le contexte chauffeur
type DriverStatus = "offline" | "online" | "busy"

type RideRequest = {
  id: string
  pickup: {
    address: string
    latitude: number
    longitude: number
  }
  destination: {
    address: string
    latitude: number
    longitude: number
  }
  passenger: {
    name: string
    rating: number
    photo?: string
  }
  estimatedDistance: number
  estimatedDuration: number
  estimatedFare: number
  createdAt: string
}

type ActiveRide = {
  id: string
  status: "accepted" | "arrived" | "in_progress" | "completed"
  pickup: {
    address: string
    latitude: number
    longitude: number
  }
  destination: {
    address: string
    latitude: number
    longitude: number
  }
  passenger: {
    name: string
    rating: number
    photo?: string
    phone?: string
  }
  estimatedDistance: number
  estimatedDuration: number
  fare: number
  startedAt?: string
  completedAt?: string
}

type Earnings = {
  today: number
  week: number
  month: number
  total: number
  currency: string
}

type DriverContextType = {
  status: DriverStatus
  isAvailable: boolean
  activeRide: ActiveRide | null
  rideRequests: RideRequest[]
  earnings: Earnings
  isLoading: boolean
  error: string | null
  toggleAvailability: () => Promise<void>
  acceptRideRequest: (requestId: string) => Promise<void>
  rejectRideRequest: (requestId: string) => Promise<void>
  arriveAtPickup: () => Promise<void>
  startRide: () => Promise<void>
  completeRide: () => Promise<void>
  cancelRide: (reason: string) => Promise<void>
  fetchEarnings: (period: "day" | "week" | "month" | "all") => Promise<void>
}

// Création du contexte
const DriverContext = createContext<DriverContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useDriver = () => {
  const context = useContext(DriverContext)
  if (context === undefined) {
    throw new Error("useDriver doit être utilisé à l'intérieur d'un DriverProvider")
  }
  return context
}

// Provider du contexte
export const DriverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentLocation } = useLocation()

  const [status, setStatus] = useState<DriverStatus>("offline")
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null)
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([])
  const [earnings, setEarnings] = useState<Earnings>({
    today: 1250,
    week: 8500,
    month: 35000,
    total: 120000,
    currency: "HTG",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculer si le chauffeur est disponible
  const isAvailable = status === "online" && !activeRide

  // Fonction pour basculer la disponibilité
  const toggleAvailability = async () => {
    if (!currentLocation) {
      setError("Impossible de déterminer votre position. Veuillez activer la géolocalisation.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      const newStatus = status === "offline" ? "online" : "offline"
      setStatus(newStatus)

      // Si le chauffeur passe en ligne, simuler des demandes de course
      if (newStatus === "online") {
        setTimeout(() => {
          const mockRequest: RideRequest = {
            id: `request-${Date.now()}`,
            pickup: {
              address: "Pétion-Ville, Rue Faubert",
              latitude: 18.5142,
              longitude: -72.2858,
            },
            destination: {
              address: "Port-au-Prince, Boulevard Toussaint",
              latitude: 18.5425,
              longitude: -72.3386,
            },
            passenger: {
              name: "Marie Client",
              rating: 4.8,
              photo: "/placeholder.svg?height=100&width=100&text=MC",
            },
            estimatedDistance: 7.5,
            estimatedDuration: 25,
            estimatedFare: 350,
            createdAt: new Date().toISOString(),
          }

          setRideRequests([mockRequest])
        }, 5000)
      } else {
        // Si le chauffeur passe hors ligne, vider les demandes de course
        setRideRequests([])
      }
    } catch (error) {
      console.error("Erreur lors du basculement de la disponibilité", error)
      setError("Impossible de mettre à jour votre disponibilité. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour accepter une demande de course
  const acceptRideRequest = async (requestId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      const request = rideRequests.find((req) => req.id === requestId)

      if (!request) {
        throw new Error("Demande de course introuvable")
      }

      // Créer une course active à partir de la demande
      const newActiveRide: ActiveRide = {
        id: request.id,
        status: "accepted",
        pickup: request.pickup,
        destination: request.destination,
        passenger: {
          ...request.passenger,
          phone: "+509 4756 2390",
        },
        estimatedDistance: request.estimatedDistance,
        estimatedDuration: request.estimatedDuration,
        fare: request.estimatedFare,
      }

      setActiveRide(newActiveRide)
      setStatus("busy")

      // Supprimer la demande de la liste
      setRideRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId))
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la demande de course", error)
      setError("Impossible d'accepter la demande de course. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour rejeter une demande de course
  const rejectRideRequest = async (requestId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setRideRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId))
    } catch (error) {
      console.error("Erreur lors du rejet de la demande de course", error)
      setError("Impossible de rejeter la demande de course. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour indiquer l'arrivée au point de ramassage
  const arriveAtPickup = async () => {
    if (!activeRide) {
      setError("Aucune course active")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setActiveRide((prevRide) => {
        if (!prevRide) return null
        return {
          ...prevRide,
          status: "arrived",
        }
      })
    } catch (error) {
      console.error("Erreur lors de l'indication de l'arrivée au point de ramassage", error)
      setError("Impossible d'indiquer l'arrivée au point de ramassage. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour démarrer une course
  const startRide = async () => {
    if (!activeRide) {
      setError("Aucune course active")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setActiveRide((prevRide) => {
        if (!prevRide) return null
        return {
          ...prevRide,
          status: "in_progress",
          startedAt: new Date().toISOString(),
        }
      })
    } catch (error) {
      console.error("Erreur lors du démarrage de la course", error)
      setError("Impossible de démarrer la course. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour terminer une course
  const completeRide = async () => {
    if (!activeRide) {
      setError("Aucune course active")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      const completedAt = new Date().toISOString()

      setActiveRide((prevRide) => {
        if (!prevRide) return null
        return {
          ...prevRide,
          status: "completed",
          completedAt,
        }
      })

      // Mettre à jour les gains
      setEarnings((prevEarnings) => ({
        ...prevEarnings,
        today: prevEarnings.today + (activeRide.fare || 0),
        week: prevEarnings.week + (activeRide.fare || 0),
        month: prevEarnings.month + (activeRide.fare || 0),
        total: prevEarnings.total + (activeRide.fare || 0),
      }))

      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setActiveRide(null)
        setStatus("online")
      }, 3000)
    } catch (error) {
      console.error("Erreur lors de la terminaison de la course", error)
      setError("Impossible de terminer la course. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour annuler une course
  const cancelRide = async (reason: string) => {
    if (!activeRide) {
      setError("Aucune course active")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setActiveRide(null)
      setStatus("online")
    } catch (error) {
      console.error("Erreur lors de l'annulation de la course", error)
      setError("Impossible d'annuler la course. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour récupérer les gains
  const fetchEarnings = async (period: "day" | "week" | "month" | "all") => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      // Les gains sont déjà définis dans l'état
    } catch (error) {
      console.error("Erreur lors de la récupération des gains", error)
      setError("Impossible de récupérer les gains. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Valeur du contexte
  const value = {
    status,
    isAvailable,
    activeRide,
    rideRequests,
    earnings,
    isLoading,
    error,
    toggleAvailability,
    acceptRideRequest,
    rejectRideRequest,
    arriveAtPickup,
    startRide,
    completeRide,
    cancelRide,
    fetchEarnings,
  }

  return <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
}
