"use client"

import { Search, MapPin, Package, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DeliveryBooking() {
  return (
    <div className="space-y-4">
      {/* Pickup and Delivery Locations */}
      <div className="space-y-2">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
          <Input
            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            placeholder="Adresse de ramassage"
            defaultValue="Position actuelle"
          />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
          <Input className="pl-10 bg-zinc-800 border-zinc-700 text-white" placeholder="Adresse de livraison" />
        </div>
      </div>

      {/* Package Details */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Détails du colis</h3>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Select>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Type de colis" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                <SelectItem value="small">Petit</SelectItem>
                <SelectItem value="medium">Moyen</SelectItem>
                <SelectItem value="large">Grand</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Urgence" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="priority">Prioritaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative">
          <Package className="absolute left-3 top-3 text-emerald-500 h-4 w-4" />
          <Textarea
            className="pl-10 bg-zinc-800 border-zinc-700 text-white resize-none"
            placeholder="Description du colis"
            rows={3}
          />
        </div>
      </div>

      {/* Delivery Options */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Options de livraison</h3>

        <div className="space-y-2">
          {[
            { id: "standard", name: "Standard", price: "200 HTG", time: "45-60 min" },
            { id: "express", name: "Express", price: "350 HTG", time: "20-30 min" },
            { id: "priority", name: "Prioritaire", price: "500 HTG", time: "10-15 min" },
          ].map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-800 border border-transparent hover:border-emerald-600 cursor-pointer"
            >
              <div>
                <p className="font-medium">{option.name}</p>
                <p className="text-xs text-zinc-400">{option.time}</p>
              </div>
              <p className="font-medium">{option.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-zinc-800 p-3 rounded-lg flex items-start">
        <Info className="text-emerald-500 h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-xs text-zinc-300">
          Les colis sont assurés jusqu'à 5 000 HTG. Pour une valeur supérieure, veuillez souscrire à une assurance
          complémentaire.
        </p>
      </div>

      {/* Action Button */}
      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Commander une livraison</Button>
    </div>
  )
}
