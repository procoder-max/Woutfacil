"use client"

/**
 * Contexte USSD de l'application
 */

import type React from "react"
import { createContext, useState, useContext } from "react"

// Types pour le contexte USSD
type USSDRequest = {
  phone: string
  code: string
  session: string
}

type USSDResponse = {
  message: string
  status: "pending" | "completed" | "failed"
  requestId?: string
}

type USSDContextType = {
  isLoading: boolean
  error: string | null
  lastResponse: USSDResponse | null
  processUSSDRequest: (request: USSDRequest) => Promise<USSDResponse>
  checkUSSDStatus: (requestId: string) => Promise<USSDResponse>
}

// Création du contexte
const USSDContext = createContext<USSDContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useUSSD = () => {
  const context = useContext(USSDContext)
  if (context === undefined) {
    throw new Error("useUSSD doit être utilisé à l'intérieur d'un USSDProvider")
  }
  return context
}

// Provider du contexte
export const USSDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastResponse, setLastResponse] = useState<USSDResponse | null>(null)

  // Fonction pour traiter une requête USSD
  const processUSSDRequest = async (request: USSDRequest): Promise<USSDResponse> => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      const response: USSDResponse = {
        message: "Votre demande de course a été reçue. Un chauffeur vous contactera bientôt.",
        status: "pending",
        requestId: `ussd-${Date.now()}`,
      }

      setLastResponse(response)
      return response
    } catch (error) {
      console.error("Erreur lors du traitement de la requête USSD", error)
      const errorResponse: USSDResponse = {
        message: "Impossible de traiter votre demande. Veuillez réessayer.",
        status: "failed",
      }
      setError(errorResponse.message)
      setLastResponse(errorResponse)
      return errorResponse
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour vérifier le statut d'une requête USSD
  const checkUSSDStatus = async (requestId: string): Promise<USSDResponse> => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      const response: USSDResponse = {
        message: "Votre chauffeur Jean Premium est en route. Arrivée estimée dans 5 minutes.",
        status: "completed",
        requestId,
      }

      setLastResponse(response)
      return response
    } catch (error) {
      console.error("Erreur lors de la vérification du statut USSD", error)
      const errorResponse: USSDResponse = {
        message: "Impossible de vérifier le statut de votre demande. Veuillez réessayer.",
        status: "failed",
        requestId,
      }
      setError(errorResponse.message)
      setLastResponse(errorResponse)
      return errorResponse
    } finally {
      setIsLoading(false)
    }
  }

  // Valeur du contexte
  const value = {
    isLoading,
    error,
    lastResponse,
    processUSSDRequest,
    checkUSSDStatus,
  }

  return <USSDContext.Provider value={value}>{children}</USSDContext.Provider>
}
