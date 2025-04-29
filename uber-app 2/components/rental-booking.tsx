"use client"

import { Calendar, Clock, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function RentalBooking() {
  return (
    <div className="space-y-4">
      {/* Date and Time Selection */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Période de location</h3>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
              <Input className="pl-10 bg-zinc-800 border-zinc-700 text-white" placeholder="Date de début" type="date" />
            </div>

            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
              <Input
                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                placeholder="Heure de début"
                type="time"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
              <Input className="pl-10 bg-zinc-800 border-zinc-700 text-white" placeholder="Date de fin" type="date" />
            </div>

            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
              <Input className="pl-10 bg-zinc-800 border-zinc-700 text-white" placeholder="Heure de fin" type="time" />
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Type de véhicule</h3>

        <Select>
          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
            <SelectValue placeholder="Sélectionner un véhicule" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
            <SelectItem value="economy">Économique</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="sedan">Berline</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Available Vehicles */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-zinc-400">Véhicules disponibles</h3>

        {[
          {
            id: "car1",
            name: "Toyota Corolla",
            price: "2 500 HTG/jour",
            image: "/placeholder.svg?height=80&width=120&text=Corolla",
          },
          {
            id: "car2",
            name: "Hyundai Tucson",
            price: "3 500 HTG/jour",
            image: "/placeholder.svg?height=80&width=120&text=Tucson",
          },
          {
            id: "car3",
            name: "Honda Civic",
            price: "2 800 HTG/jour",
            image: "/placeholder.svg?height=80&width=120&text=Civic",
          },
        ].map((vehicle) => (
          <div key={vehicle.id} className="bg-zinc-800 rounded-lg p-3 flex">
            <div className="w-24 h-16 bg-zinc-700 rounded mr-3 overflow-hidden">
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="font-medium">{vehicle.name}</p>
                <p className="text-xs text-zinc-400">Disponible immédiatement</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-emerald-500">{vehicle.price}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-emerald-600 text-emerald-500 hover:bg-emerald-600 hover:text-white"
                >
                  Sélectionner
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Options */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Options supplémentaires</h3>

        <div className="space-y-2">
          {[
            { id: "insurance", label: "Assurance tous risques", price: "+500 HTG/jour" },
            { id: "gps", label: "GPS", price: "+200 HTG/jour" },
            { id: "childSeat", label: "Siège enfant", price: "+150 HTG/jour" },
          ].map((option) => (
            <div key={option.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800">
              <div className="flex items-center">
                <Checkbox id={option.id} className="mr-3 border-zinc-600 data-[state=checked]:bg-emerald-600" />
                <label htmlFor={option.id} className="text-sm cursor-pointer">
                  {option.label}
                </label>
              </div>
              <p className="text-sm">{option.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Méthode de paiement</h3>

        <div className="bg-zinc-800 p-3 rounded-lg">
          <div className="flex items-center mb-3">
            <CreditCard className="text-emerald-500 h-4 w-4 mr-2" />
            <p className="text-sm font-medium">Carte de crédit / débit</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input className="bg-zinc-700 border-zinc-600 text-white" placeholder="Numéro de carte" />
            <div className="grid grid-cols-2 gap-2">
              <Input className="bg-zinc-700 border-zinc-600 text-white" placeholder="MM/AA" />
              <Input className="bg-zinc-700 border-zinc-600 text-white" placeholder="CVC" />
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-2">
        <Checkbox id="terms" className="mt-1 border-zinc-600 data-[state=checked]:bg-emerald-600" />
        <label htmlFor="terms" className="text-xs text-zinc-300">
          J'accepte les conditions générales de location et confirme avoir plus de 21 ans avec un permis valide depuis
          plus de 2 ans.
        </label>
      </div>

      {/* Action Button */}
      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Réserver ce véhicule</Button>
    </div>
  )
}
