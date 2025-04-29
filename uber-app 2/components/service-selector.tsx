"use client"

import { useState } from "react"
import { Car, Users, Package, Calendar } from "lucide-react"

const services = [
  {
    id: "ride",
    name: "VTC",
    icon: Car,
    description: "Voiture ou moto",
  },
  {
    id: "carpool",
    name: "Covoiturage",
    icon: Users,
    description: "Trajets partagés",
  },
  {
    id: "delivery",
    name: "Livraison",
    icon: Package,
    description: "Colis express",
  },
  {
    id: "rental",
    name: "Location",
    icon: Calendar,
    description: "Courte durée",
  },
]

export default function ServiceSelector() {
  const [selectedService, setSelectedService] = useState("ride")

  return (
    <div className="grid grid-cols-4 gap-2">
      {services.map((service) => {
        const Icon = service.icon
        const isSelected = selectedService === service.id

        return (
          <button
            key={service.id}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
              isSelected ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
            onClick={() => setSelectedService(service.id)}
          >
            <Icon className={`w-6 h-6 mb-1 ${isSelected ? "text-white" : "text-emerald-500"}`} />
            <span className="text-xs font-medium">{service.name}</span>
          </button>
        )
      })}
    </div>
  )
}
