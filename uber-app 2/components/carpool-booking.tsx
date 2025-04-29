"use client"

import { Search, MapPin, Clock, Calendar, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CarpoolBooking() {
  return (
    <div className="space-y-4">
      {/* Destination Input */}
      <div className="space-y-2">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
          <Input
            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            placeholder="Départ"
            defaultValue="Position actuelle"
          />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
          <Input className="pl-10 bg-zinc-800 border-zinc-700 text-white" placeholder="Destination" />
        </div>
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
          <Input
            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            placeholder="Date"
            defaultValue="Aujourd'hui"
          />
        </div>

        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
          <Input
            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            placeholder="Heure"
            defaultValue="Maintenant"
          />
        </div>
      </div>

      {/* Passengers */}
      <div className="relative">
        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
        <Input
          className="pl-10 bg-zinc-800 border-zinc-700 text-white"
          placeholder="Nombre de passagers"
          defaultValue="1"
          type="number"
          min="1"
          max="4"
        />
      </div>

      {/* Available Carpools */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-zinc-400">Covoiturages disponibles</h3>

        {[1, 2, 3].map((ride) => (
          <div key={ride} className="bg-zinc-800 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={`/placeholder.svg?height=100&width=100&text=C${ride}`} />
                  <AvatarFallback>C{ride}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Pierre D.</p>
                  <div className="flex items-center text-xs text-zinc-400">
                    <span>Peugeot 308</span>
                    <span className="mx-1">•</span>
                    <span>{3 - ride} places</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{100 + ride * 50} HTG</p>
                <p className="text-xs text-zinc-400">Départ dans {5 + ride * 5} min</p>
              </div>
            </div>

            <div className="flex items-center text-xs text-zinc-300 mb-3">
              <div className="flex flex-col items-center mr-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="w-0.5 h-6 bg-zinc-600"></div>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
              <div className="space-y-1">
                <p>Pétion-Ville, Rue Faubert</p>
                <p>Port-au-Prince, Boulevard Toussaint</p>
              </div>
            </div>

            <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Réserver
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
