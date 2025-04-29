"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Calendar, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfileInfo() {
  const [userData, setUserData] = useState({
    name: "",
    email: "jean.dupont@example.com",
    phone: "+509 4756 2390",
    address: "Pétion-Ville, Rue Faubert",
    memberSince: "Avril 2023",
    type: "client",
    subscription: "Premium",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
  })

  useEffect(() => {
    // Dans une application réelle, vous récupéreriez ces données depuis une API
    const userName = localStorage.getItem("userName") || "Jean Dupont"
    const userType = localStorage.getItem("userType") || "client"

    setUserData((prev) => ({
      ...prev,
      name: userName,
      type: userType,
    }))
  }, [])

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-emerald-600">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
            <AvatarFallback>
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 bg-emerald-600 rounded-full p-1">
            <Edit2 className="h-3 w-3 text-white" />
          </button>
        </div>
        <div className="ml-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <Badge className="ml-2 bg-emerald-600">{userData.subscription}</Badge>
          </div>
          <p className="text-zinc-400 text-sm">
            {userData.type === "client" ? "Client" : "Chauffeur"} • Membre depuis {userData.memberSince}
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Informations personnelles</h3>

        <div className="space-y-3">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-emerald-500 mr-3" />
            <div>
              <p className="text-sm text-zinc-400">Email</p>
              <p>{userData.email}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Phone className="h-5 w-5 text-emerald-500 mr-3" />
            <div>
              <p className="text-sm text-zinc-400">Téléphone</p>
              <p>{userData.phone}</p>
            </div>
          </div>

          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-emerald-500 mr-3" />
            <div>
              <p className="text-sm text-zinc-400">Adresse</p>
              <p>{userData.address}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-emerald-500 mr-3" />
            <div>
              <p className="text-sm text-zinc-400">Membre depuis</p>
              <p>{userData.memberSince}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-medium">Abonnement {userData.subscription}</h3>
            <p className="text-sm text-zinc-400">Prochain renouvellement: 15 mai 2023</p>
          </div>
          <Badge className="bg-emerald-600">Actif</Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
            <p className="text-sm">20% de réduction sur toutes les courses</p>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
            <p className="text-sm">5 courses gratuites par mois</p>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
            <p className="text-sm">Support client prioritaire</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-emerald-600 text-emerald-500 hover:bg-emerald-900/20"
          onClick={() => (window.location.href = "/subscription")}
        >
          Gérer mon abonnement
        </Button>
      </div>

      {/* Edit Profile Button */}
      <Button
        className="w-full bg-emerald-600 hover:bg-emerald-700"
        onClick={() => alert("Fonctionnalité de modification du profil à venir")}
      >
        Modifier mon profil
      </Button>
    </div>
  )
}
