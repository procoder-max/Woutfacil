"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileInfo from "@/components/profile/profile-info"
import PaymentMethods from "@/components/profile/payment-methods"
import RideHistory from "@/components/profile/ride-history"
import ProfileSettings from "@/components/profile/profile-settings"
import AuthRequired from "@/components/auth/auth-required"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BottomNavigation from "@/components/bottom-navigation"

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simuler une vérification d'authentification
  useEffect(() => {
    // Dans une application réelle, vous vérifieriez l'état d'authentification via un contexte ou une API
    const checkAuth = async () => {
      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Pour la démonstration, nous utilisons localStorage
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-zinc-400">Chargement du profil...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthRequired />
  }

  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Mon Profil</h1>
      </div>

      {/* Profile Content */}
      <div className="flex-1 p-4">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid grid-cols-4 bg-zinc-800 mb-6">
            <TabsTrigger value="info">Profil</TabsTrigger>
            <TabsTrigger value="payment">Paiement</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-0">
            <ProfileInfo />
          </TabsContent>

          <TabsContent value="payment" className="mt-0">
            <PaymentMethods />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <RideHistory />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <ProfileSettings
              onLogout={() => {
                localStorage.removeItem("isLoggedIn")
                setIsAuthenticated(false)
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}
