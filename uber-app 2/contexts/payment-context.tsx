"use client"

/**
 * Contexte de paiement de l'application
 */

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

// Types pour le contexte de paiement
type PaymentMethod = {
  id: string
  type: "card" | "mobile" | "wallet"
  name: string
  details: string
  isDefault: boolean
}

type PaymentContextType = {
  paymentMethods: PaymentMethod[]
  selectedMethod: PaymentMethod | null
  balance: number
  isLoading: boolean
  error: string | null
  fetchPaymentMethods: () => Promise<void>
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => Promise<void>
  selectPaymentMethod: (methodId: string) => void
  setDefaultMethod: (methodId: string) => Promise<void>
  deletePaymentMethod: (methodId: string) => Promise<void>
  processPayment: (amount: number, description: string) => Promise<boolean>
  topUpBalance: (amount: number, methodId: string) => Promise<boolean>
}

// Création du contexte
const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const usePayment = () => {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error("usePayment doit être utilisé à l'intérieur d'un PaymentProvider")
  }
  return context
}

// Provider du contexte
export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [balance, setBalance] = useState<number>(3500) // Solde en HTG
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Récupérer les méthodes de paiement au chargement
  useEffect(() => {
    fetchPaymentMethods()
  }, [])

  // Fonction pour récupérer les méthodes de paiement
  const fetchPaymentMethods = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      const methods: PaymentMethod[] = [
        {
          id: "1",
          type: "mobile",
          name: "MonCash",
          details: "+509 4756 2390",
          isDefault: true,
        },
        {
          id: "2",
          type: "card",
          name: "Visa",
          details: "**** 5678",
          isDefault: false,
        },
        {
          id: "3",
          type: "wallet",
          name: "Solde MobiTout",
          details: "3,500 HTG",
          isDefault: false,
        },
      ]

      setPaymentMethods(methods)

      // Sélectionner la méthode par défaut
      const defaultMethod = methods.find((method) => method.isDefault)
      if (defaultMethod) {
        setSelectedMethod(defaultMethod)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des méthodes de paiement", error)
      setError("Impossible de récupérer les méthodes de paiement. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour ajouter une méthode de paiement
  const addPaymentMethod = async (method: Omit<PaymentMethod, "id">) => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      const newMethod: PaymentMethod = {
        ...method,
        id: `${paymentMethods.length + 1}`,
      }

      // Si la nouvelle méthode est définie comme par défaut, mettre à jour les autres méthodes
      if (method.isDefault) {
        setPaymentMethods((prevMethods) =>
          prevMethods.map((m) => ({
            ...m,
            isDefault: false,
          })),
        )
      }

      setPaymentMethods((prevMethods) => [...prevMethods, newMethod])

      // Si c'est la méthode par défaut ou s'il n'y a pas de méthode sélectionnée, la sélectionner
      if (method.isDefault || !selectedMethod) {
        setSelectedMethod(newMethod)
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la méthode de paiement", error)
      setError("Impossible d'ajouter la méthode de paiement. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour sélectionner une méthode de paiement
  const selectPaymentMethod = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId)
    if (method) {
      setSelectedMethod(method)
    }
  }

  // Fonction pour définir une méthode de paiement par défaut
  const setDefaultMethod = async (methodId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setPaymentMethods((prevMethods) =>
        prevMethods.map((method) => ({
          ...method,
          isDefault: method.id === methodId,
        })),
      )

      // Mettre à jour la méthode sélectionnée si nécessaire
      const method = paymentMethods.find((m) => m.id === methodId)
      if (method) {
        setSelectedMethod(method)
      }
    } catch (error) {
      console.error("Erreur lors de la définition de la méthode de paiement par défaut", error)
      setError("Impossible de définir la méthode de paiement par défaut. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour supprimer une méthode de paiement
  const deletePaymentMethod = async (methodId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      const methodToDelete = paymentMethods.find((m) => m.id === methodId)

      setPaymentMethods((prevMethods) => prevMethods.filter((method) => method.id !== methodId))

      // Si la méthode supprimée était sélectionnée, sélectionner une autre méthode
      if (selectedMethod && selectedMethod.id === methodId) {
        const remainingMethods = paymentMethods.filter((method) => method.id !== methodId)
        const defaultMethod = remainingMethods.find((method) => method.isDefault)
        setSelectedMethod(defaultMethod || remainingMethods[0] || null)
      }

      // Si la méthode supprimée était par défaut, définir une autre méthode comme par défaut
      if (methodToDelete && methodToDelete.isDefault) {
        const remainingMethods = paymentMethods.filter((method) => method.id !== methodId)
        if (remainingMethods.length > 0) {
          setPaymentMethods((prevMethods) =>
            prevMethods.map((method, index) => ({
              ...method,
              isDefault: index === 0,
            })),
          )
        }
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la méthode de paiement", error)
      setError("Impossible de supprimer la méthode de paiement. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour traiter un paiement
  const processPayment = async (amount: number, description: string): Promise<boolean> => {
    if (!selectedMethod) {
      setError("Veuillez sélectionner une méthode de paiement")
      return false
    }

    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse

      // Si le paiement est effectué avec le solde, vérifier s'il est suffisant
      if (selectedMethod.type === "wallet") {
        if (balance < amount) {
          setError("Solde insuffisant. Veuillez recharger votre compte ou choisir une autre méthode de paiement.")
          return false
        }

        // Mettre à jour le solde
        setBalance((prevBalance) => prevBalance - amount)
      }

      return true
    } catch (error) {
      console.error("Erreur lors du traitement du paiement", error)
      setError("Impossible de traiter le paiement. Veuillez réessayer.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour recharger le solde
  const topUpBalance = async (amount: number, methodId: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse

      // Mettre à jour le solde
      setBalance((prevBalance) => prevBalance + amount)

      return true
    } catch (error) {
      console.error("Erreur lors de la recharge du solde", error)
      setError("Impossible de recharger le solde. Veuillez réessayer.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Valeur du contexte
  const value = {
    paymentMethods,
    selectedMethod,
    balance,
    isLoading,
    error,
    fetchPaymentMethods,
    addPaymentMethod,
    selectPaymentMethod,
    setDefaultMethod,
    deletePaymentMethod,
    processPayment,
    topUpBalance,
  }

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
}
