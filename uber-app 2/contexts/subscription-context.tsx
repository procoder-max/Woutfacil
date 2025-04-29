"use client"

/**
 * Contexte d'abonnement de l'application
 */

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

// Types pour le contexte d'abonnement
type SubscriptionPlan = {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: "month" | "year"
  features: string[]
  isPopular?: boolean
}

type SubscriptionStatus = {
  isActive: boolean
  plan: SubscriptionPlan | null
  startDate: string | null
  endDate: string | null
  autoRenew: boolean
}

type SubscriptionContextType = {
  plans: SubscriptionPlan[]
  status: SubscriptionStatus
  isLoading: boolean
  error: string | null
  fetchPlans: () => Promise<void>
  fetchStatus: () => Promise<void>
  subscribe: (planId: string, paymentMethodId: string) => Promise<boolean>
  cancelSubscription: () => Promise<boolean>
  toggleAutoRenew: () => Promise<void>
}

// Création du contexte
const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription doit être utilisé à l'intérieur d'un SubscriptionProvider")
  }
  return context
}

// Provider du contexte
export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [status, setStatus] = useState<SubscriptionStatus>({
    isActive: false,
    plan: null,
    startDate: null,
    endDate: null,
    autoRenew: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Récupérer les plans et le statut au chargement
  useEffect(() => {
    fetchPlans()
    fetchStatus()
  }, [])

  // Fonction pour récupérer les plans d'abonnement
  const fetchPlans = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      const mockPlans: SubscriptionPlan[] = [
        {
          id: "standard",
          name: "Standard",
          description: "Pour les utilisateurs réguliers",
          price: 1000,
          currency: "HTG",
          interval: "month",
          features: [
            "10% de réduction sur toutes les courses",
            "2 courses gratuites par mois",
            "Support client prioritaire",
          ],
        },
        {
          id: "premium",
          name: "Premium",
          description: "Pour les utilisateurs exigeants",
          price: 3000,
          currency: "HTG",
          interval: "month",
          features: [
            "20% de réduction sur toutes les courses",
            "5 courses gratuites par mois",
            "Accès prioritaire aux chauffeurs Premium",
            "Support client VIP 24/7",
            "Annulations gratuites",
          ],
          isPopular: true,
        },
      ]

      setPlans(mockPlans)
    } catch (error) {
      console.error("Erreur lors de la récupération des plans d'abonnement", error)
      setError("Impossible de récupérer les plans d'abonnement. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour récupérer le statut de l'abonnement
  const fetchStatus = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      const mockStatus: SubscriptionStatus = {
        isActive: true,
        plan: {
          id: "premium",
          name: "Premium",
          description: "Pour les utilisateurs exigeants",
          price: 3000,
          currency: "HTG",
          interval: "month",
          features: [
            "20% de réduction sur toutes les courses",
            "5 courses gratuites par mois",
            "Accès prioritaire aux chauffeurs Premium",
            "Support client VIP 24/7",
            "Annulations gratuites",
          ],
          isPopular: true,
        },
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 15 jours
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // Dans 15 jours
        autoRenew: true,
      }

      setStatus(mockStatus)
    } catch (error) {
      console.error("Erreur lors de la récupération du statut de l'abonnement", error)
      setError("Impossible de récupérer le statut de l'abonnement. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour s'abonner à un plan
  const subscribe = async (planId: string, paymentMethodId: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      const plan = plans.find((p) => p.id === planId)

      if (!plan) {
        throw new Error("Plan d'abonnement introuvable")
      }

      const now = new Date()
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1)

      const newStatus: SubscriptionStatus = {
        isActive: true,
        plan,
        startDate: now.toISOString(),
        endDate: endDate.toISOString(),
        autoRenew: true,
      }

      setStatus(newStatus)
      return true
    } catch (error) {
      console.error("Erreur lors de l'abonnement", error)
      setError("Impossible de s'abonner. Veuillez réessayer.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour annuler un abonnement
  const cancelSubscription = async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setStatus((prevStatus) => ({
        ...prevStatus,
        autoRenew: false,
      }))

      return true
    } catch (error) {
      console.error("Erreur lors de l'annulation de l'abonnement", error)
      setError("Impossible d'annuler l'abonnement. Veuillez réessayer.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour activer/désactiver le renouvellement automatique
  const toggleAutoRenew = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setStatus((prevStatus) => ({
        ...prevStatus,
        autoRenew: !prevStatus.autoRenew,
      }))
    } catch (error) {
      console.error("Erreur lors du basculement du renouvellement automatique", error)
      setError("Impossible de modifier le renouvellement automatique. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Valeur du contexte
  const value = {
    plans,
    status,
    isLoading,
    error,
    fetchPlans,
    fetchStatus,
    subscribe,
    cancelSubscription,
    toggleAutoRenew,
  }

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
}
