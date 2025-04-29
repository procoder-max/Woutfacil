"use client"

import { useState } from "react"
import { Search, MapPin, Clock, Star, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useGeolocation } from "@/hooks/use-geolocation"

// Modifier la fonction pour utiliser le hook useGeolocation
export default function RideBooking() {
  const [selectedVehicle, setSelectedVehicle] = useState("standard")
  const [showDrivers, setShowDrivers] = useState(false)
  const { address, loading } = useGeolocation()

  const vehicleTypes = [
    { id: "standard", name: "Standard", price: "250 HTG", time: "3 min" },
    { id: "premium", name: "Premium", price: "450 HTG", time: "5 min", badge: "Abonnés" },
    { id: "moto", name: "Moto", price: "150 HTG", time: "2 min" },
  ]

  return (
    <div className="space-y-4">
      {/* Destination Input */}
      <div className="space-y-2">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
          <Input
            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            placeholder="Votre position"
            value={loading ? "Détermination de votre position..." : address || "Position actuelle"}
            readOnly
          />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
          <Input className="pl-10 bg-zinc-800 border-zinc-700 text-white" placeholder="Destination" />
        </div>
      </div>

      {/* Le reste du composant reste inchangé */}
      {/* Vehicle Selection */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Type de véhicule</h3>
        <div className="space-y-2">
          {vehicleTypes.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                selectedVehicle === vehicle.id
                  ? "bg-zinc-800 border border-emerald-600"
                  : "bg-zinc-800 border border-transparent"
              }`}
              onClick={() => setSelectedVehicle(vehicle.id)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center mr-3">
                  {vehicle.id === "standard" && <Car className="w-5 h-5 text-emerald-500" />}
                  {vehicle.id === "premium" && <Shield className="w-5 h-5 text-emerald-500" />}
                  {vehicle.id === "moto" && <Motorcycle className="w-5 h-5 text-emerald-500" />}
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">{vehicle.name}</p>
                    {vehicle.badge && <Badge className="ml-2 bg-emerald-600 text-[10px]">{vehicle.badge}</Badge>}
                  </div>
                  <div className="flex items-center text-xs text-zinc-400">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{vehicle.time}</span>
                  </div>
                </div>
              </div>
              <p className="font-medium">{vehicle.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <Button
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        onClick={() => setShowDrivers(!showDrivers)}
      >
        Rechercher un chauffeur
      </Button>

      {/* Driver Selection (conditionally shown) */}
      {showDrivers && (
        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-medium text-zinc-400">Chauffeurs disponibles</h3>

          {[1, 2].map((driver) => (
            <div key={driver} className="bg-zinc-800 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3 border border-emerald-600">
                    <AvatarImage src={`/placeholder.svg?height=100&width=100&text=D${driver}`} />
                    <AvatarFallback>D{driver}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jean {driver === 1 ? "Premium" : "Standard"}</p>
                    <div className="flex items-center text-xs text-zinc-400">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{driver === 1 ? "4.9" : "4.7"}</span>
                      <span className="mx-1">•</span>
                      <span>Toyota Corolla</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Choisir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Car(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}

function Motorcycle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="5" cy="16" r="3" />
      <circle cx="19" cy="16" r="3" />
      <path d="M7.5 14h5l4-6h-8.5l-.5 2" />
      <path d="M13 14V8" />
      <path d="m5 16 1.5-5" />
      <path d="m19 16-1-5h-4l2 5" />
    </svg>
  )
}
