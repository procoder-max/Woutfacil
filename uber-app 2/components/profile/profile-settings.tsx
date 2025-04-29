"use client"

import { useState } from "react"
import { Bell, Globe, Moon, Shield, LogOut, ToggleLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"

interface ProfileSettingsProps {
  onLogout: () => void
}

export default function ProfileSettings({ onLogout }: ProfileSettingsProps) {
  const [notifications, setNotifications] = useState({
    rides: true,
    promotions: false,
    payments: true,
    news: false,
  })

  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState("fr")
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleLogout = () => {
    setShowLogoutDialog(false)
    onLogout()
  }

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-emerald-500 mr-2" />
          <h3 className="font-medium">Notifications</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="rides-notif" className="flex-1">
              Mises à jour des courses
            </Label>
            <Switch
              id="rides-notif"
              checked={notifications.rides}
              onCheckedChange={(checked) => handleNotificationChange("rides", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="promo-notif" className="flex-1">
              Promotions et offres
            </Label>
            <Switch
              id="promo-notif"
              checked={notifications.promotions}
              onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="payment-notif" className="flex-1">
              Confirmations de paiement
            </Label>
            <Switch
              id="payment-notif"
              checked={notifications.payments}
              onCheckedChange={(checked) => handleNotificationChange("payments", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="news-notif" className="flex-1">
              Actualités et mises à jour
            </Label>
            <Switch
              id="news-notif"
              checked={notifications.news}
              onCheckedChange={(checked) => handleNotificationChange("news", checked)}
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Moon className="h-5 w-5 text-emerald-500 mr-2" />
          <h3 className="font-medium">Apparence</h3>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="flex-1">
            Mode sombre
          </Label>
          <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      {/* Language */}
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-emerald-500 mr-2" />
            <h3 className="font-medium">Langue</h3>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">
              {language === "fr" ? "Français" : language === "en" ? "English" : "Kreyòl Ayisyen"}
            </span>
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <Shield className="h-5 w-5 text-emerald-500 mr-2" />
          <h3 className="font-medium">Sécurité</h3>
        </div>

        <Button variant="link" className="text-emerald-500 p-0 h-auto">
          Changer le mot de passe
        </Button>
      </div>

      {/* Privacy */}
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ToggleLeft className="h-5 w-5 text-emerald-500 mr-2" />
            <h3 className="font-medium">Confidentialité</h3>
          </div>
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        </div>
      </div>

      {/* Logout */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirmer la déconnexion</DialogTitle>
          </DialogHeader>
          <p className="py-4">Êtes-vous sûr de vouloir vous déconnecter de votre compte ?</p>
          <DialogFooter>
            <Button variant="outline" className="border-zinc-700" onClick={() => setShowLogoutDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Déconnexion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
