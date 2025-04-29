"use client"

/**
 * Contexte d'authentification de l'application
 */

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { authService } from "../api/services"

// Types pour le contexte d'authentification
type User = {
  id: string
  name: string
  email: string
  phone: string
  role: "client" | "driver" | "admin"
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  verifyCode: (code: string, phone: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}

// Provider du contexte
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await localStorage.getItem("authToken")

        if (token) {
          // Récupérer les informations de l'utilisateur
          const response = await authService.getProfile()
          setUser(response.data.user)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification", error)
        // Supprimer le token en cas d'erreur
        await localStorage.removeItem("authToken")
        await localStorage.removeItem("refreshToken")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const response = await authService.login({ email, password })
      const { token, refreshToken, user } = response.data

      // Stocker les tokens
      await localStorage.setItem("authToken", token)
      await localStorage.setItem("refreshToken", refreshToken)

      // Mettre à jour l'état
      setUser(user)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Erreur lors de la connexion", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction d'inscription
  const register = async (userData: any) => {
    setIsLoading(true)

    try {
      await authService.register(userData)
      // Note: Généralement, l'inscription ne connecte pas automatiquement l'utilisateur
      // Il doit vérifier son compte d'abord
    } catch (error) {
      console.error("Erreur lors de l'inscription", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de déconnexion
  const logout = async () => {
    setIsLoading(true)

    try {
      // Supprimer les tokens
      await localStorage.removeItem("authToken")
      await localStorage.removeItem("refreshToken")

      // Réinitialiser l'état
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de vérification de code
  const verifyCode = async (code: string, phone: string) => {
    setIsLoading(true)

    try {
      const response = await authService.verify({ code, phone })
      const { token, refreshToken, user } = response.data

      // Stocker les tokens
      await localStorage.setItem("authToken", token)
      await localStorage.setItem("refreshToken", refreshToken)

      // Mettre à jour l'état
      setUser(user)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Erreur lors de la vérification du code", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de récupération de mot de passe
  const forgotPassword = async (email: string) => {
    setIsLoading(true)

    try {
      await authService.forgotPassword(email)
    } catch (error) {
      console.error("Erreur lors de la récupération du mot de passe", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de réinitialisation de mot de passe
  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true)

    try {
      await authService.resetPassword({ token, password })
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Valeur du contexte
  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    verifyCode,
    forgotPassword,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
