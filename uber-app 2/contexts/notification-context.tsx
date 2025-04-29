"use client"

/**
 * Contexte de notification de l'application
 */

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

// Types pour le contexte de notification
type Notification = {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

type NotificationSettings = {
  rides: boolean
  promotions: boolean
  payments: boolean
  news: boolean
}

type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  settings: NotificationSettings
  isLoading: boolean
  error: string | null
  fetchNotifications: () => Promise<void>
  markAsRead: (notificationId: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  updateSettings: (settings: Partial<NotificationSettings>) => Promise<void>
  showToast: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
}

// Création du contexte
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification doit être utilisé à l'intérieur d'un NotificationProvider")
  }
  return context
}

// Provider du contexte
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [settings, setSettings] = useState<NotificationSettings>({
    rides: true,
    promotions: false,
    payments: true,
    news: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<Notification | null>(null)

  // Calculer le nombre de notifications non lues
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Récupérer les notifications au chargement
  useEffect(() => {
    fetchNotifications()
  }, [])

  // Fonction pour récupérer les notifications
  const fetchNotifications = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous simulons une réponse
      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "Course terminée",
          message: "Votre course avec Jean Premium est terminée. Montant: 250 HTG",
          type: "success",
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Promotion spéciale",
          message: "Profitez de 20% de réduction sur vos courses ce week-end!",
          type: "info",
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // Hier
        },
        {
          id: "3",
          title: "Paiement confirmé",
          message: "Votre paiement de 1,000 HTG a été confirmé",
          type: "success",
          read: true,
          createdAt: new Date(Date.now() - 172800000).toISOString(), // Avant-hier
        },
      ]

      setNotifications(mockNotifications)
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications", error)
      setError("Impossible de récupérer les notifications. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour marquer une notification comme lue
  const markAsRead = async (notificationId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      )
    } catch (error) {
      console.error("Erreur lors du marquage de la notification comme lue", error)
      setError("Impossible de marquer la notification comme lue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour marquer toutes les notifications comme lues
  const markAllAsRead = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      )
    } catch (error) {
      console.error("Erreur lors du marquage de toutes les notifications comme lues", error)
      setError("Impossible de marquer toutes les notifications comme lues. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour mettre à jour les paramètres de notification
  const updateSettings = async (newSettings: Partial<NotificationSettings>) => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une application réelle, vous feriez un appel API
      // Pour cette démo, nous mettons à jour l'état local
      setSettings((prevSettings) => ({
        ...prevSettings,
        ...newSettings,
      }))
    } catch (error) {
      console.error("Erreur lors de la mise à jour des paramètres de notification", error)
      setError("Impossible de mettre à jour les paramètres de notification. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour afficher un toast
  const showToast = (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: `toast-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    }

    setToast(newNotification)

    // Ajouter la notification à la liste
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications])

    // Masquer le toast après 3 secondes
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  // Valeur du contexte
  const value = {
    notifications,
    unreadCount,
    settings,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    updateSettings,
    showToast,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {toast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
                ? "bg-red-500"
                : toast.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
          } text-white`}
        >
          <h3 className="font-bold">{toast.title}</h3>
          <p>{toast.message}</p>
        </div>
      )}
    </NotificationContext.Provider>
  )
}
