"use client"

/**
 * Contexte principal de l'application
 */

import type React from "react"
import { createContext, useState, useContext } from "react"

// Types pour le contexte principal
type AppContextType = {
  isDarkMode: boolean
  language: string
  isOfflineMode: boolean
  toggleDarkMode: () => void
  setLanguage: (lang: string) => void
  toggleOfflineMode: () => void
}

// Création du contexte
const AppContext = createContext<AppContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp doit être utilisé à l'intérieur d'un AppProvider")
  }
  return context
}

// Provider du contexte
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [language, setLanguage] = useState("fr")
  const [isOfflineMode, setIsOfflineMode] = useState(false)

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  // Fonction pour basculer le mode hors ligne
  const toggleOfflineMode = () => {
    setIsOfflineMode((prev) => !prev)
  }

  // Valeur du contexte
  const value = {
    isDarkMode,
    language,
    isOfflineMode,
    toggleDarkMode,
    setLanguage,
    toggleOfflineMode,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
