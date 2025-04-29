"use client"

import { useState } from "react"
import { Car, Package, Calendar, Users, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function RideHistory() {
  const [searchTerm, setSearchTerm] = useState("")

  const rides = [
    {
      id: "ride1",
      type: "vtc",
      icon: Car,
      from: "Pétion-Ville, Rue Faubert",
      to: "Port-au-Prince, Boulevard Toussaint",
      date: "Aujourd'hui, 14:30",
      price: "250 HTG",
      status: "completed",
      driver: "Jean Premium",
      rating: 5,
    },
    {
      id: "ride2",
      type: "delivery",
      icon: Package,
      from: "Delmas 33",
      to: "Tabarre",
      date: "Hier, 16:45",
      price: "350 HTG",
      status: "completed",
      driver: "Pierre Express",
      rating: 4,
    },
    {
      id: "ride3",
      type: "carpool",
      icon: Users,
      from: "Carrefour",
      to: "Cap-Haïtien",
      date: "20 Avr, 08:15",
      price: "1,200 HTG",
      status: "completed",
      driver: "Marie Covoiturage",
      rating: 5,
    },
    {
      id: "ride4",
      type: "rental",
      icon: Calendar,
      from: "Aéroport de Port-au-Prince",
      to: "Retour à l'aéroport",
      date: "15 Avr - 18 Avr",
      price: "7,500 HTG",
      status: "completed",
      driver: null,
      rating: 4,
    },
  ]

  const filteredRides = rides.filter(
    (ride) =>
      ride.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.date.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Input
          className="pl-10 bg-zinc-800 border-zinc-700 text-white"
          placeholder="Rechercher dans l'historique..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Ride History Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 bg-zinc-800 mb-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="vtc">VTC</TabsTrigger>
          <TabsTrigger value="delivery">Livraison</TabsTrigger>
          <TabsTrigger value="other">Autres</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="space-y-3">
            {filteredRides.length > 0 ? (
              filteredRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
            ) : (
              <div className="bg-zinc-800 rounded-lg p-4 text-center">
                <p className="text-zinc-400">Aucun trajet trouvé</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="vtc" className="mt-0">
          <div className="space-y-3">
            {filteredRides.filter((ride) => ride.type === "vtc").length > 0 ? (
              filteredRides.filter((ride) => ride.type === "vtc").map((ride) => <RideCard key={ride.id} ride={ride} />)
            ) : (
              <div className="bg-zinc-800 rounded-lg p-4 text-center">
                <p className="text-zinc-400">Aucun trajet VTC trouvé</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="delivery" className="mt-0">
          <div className="space-y-3">
            {filteredRides.filter((ride) => ride.type === "delivery").length > 0 ? (
              filteredRides
                .filter((ride) => ride.type === "delivery")
                .map((ride) => <RideCard key={ride.id} ride={ride} />)
            ) : (
              <div className="bg-zinc-800 rounded-lg p-4 text-center">
                <p className="text-zinc-400">Aucune livraison trouvée</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="other" className="mt-0">
          <div className="space-y-3">
            {filteredRides.filter((ride) => !["vtc", "delivery"].includes(ride.type)).length > 0 ? (
              filteredRides
                .filter((ride) => !["vtc", "delivery"].includes(ride.type))
                .map((ride) => <RideCard key={ride.id} ride={ride} />)
            ) : (
              <div className="bg-zinc-800 rounded-lg p-4 text-center">
                <p className="text-zinc-400">Aucun autre trajet trouvé</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Button variant="outline" className="w-full border-zinc-700 text-white hover:bg-zinc-800">
        Charger plus d'historique
      </Button>
    </div>
  )
}

function RideCard({ ride }) {
  const Icon = ride.icon

  return (
    <div className="bg-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 
            ${
              ride.type === "vtc"
                ? "bg-emerald-900"
                : ride.type === "delivery"
                  ? "bg-blue-900"
                  : ride.type === "carpool"
                    ? "bg-purple-900"
                    : "bg-amber-900"
            }`}
          >
            <Icon
              className={`w-5 h-5 
              ${
                ride.type === "vtc"
                  ? "text-emerald-400"
                  : ride.type === "delivery"
                    ? "text-blue-400"
                    : ride.type === "carpool"
                      ? "text-purple-400"
                      : "text-amber-400"
              }`}
            />
          </div>
          <div>
            <p className="font-medium">
              {ride.type === "vtc"
                ? "Course VTC"
                : ride.type === "delivery"
                  ? "Livraison"
                  : ride.type === "carpool"
                    ? "Covoiturage"
                    : "Location"}
            </p>
            <p className="text-xs text-zinc-400">{ride.date}</p>
          </div>
        </div>
        <p className="font-medium">{ride.price}</p>
      </div>

      <div className="flex items-start mb-3">
        <div className="flex flex-col items-center mr-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <div className="w-0.5 h-10 bg-zinc-600"></div>
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">Départ</p>
            <p className="text-xs text-zinc-400">{ride.from}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Destination</p>
            <p className="text-xs text-zinc-400">{ride.to}</p>
          </div>
        </div>
      </div>

      {ride.driver && (
        <div className="flex items-center justify-between text-sm border-t border-zinc-700 pt-3">
          <div className="flex items-center">
            <p className="text-zinc-400 mr-2">Chauffeur:</p>
            <p>{ride.driver}</p>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{ride.rating}</span>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-3">
        <Button variant="link" className="text-emerald-500 p-0 h-auto">
          Détails
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
