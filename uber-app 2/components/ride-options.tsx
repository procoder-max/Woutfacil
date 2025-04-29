"use client"

import { useState } from "react"
import { Car, Clock } from "lucide-react"

const rideOptions = [
  {
    id: "economy",
    name: "Economy",
    price: "$12.50",
    time: "3 min",
    image: "/placeholder.svg?height=50&width=50",
    seats: 4,
  },
  {
    id: "comfort",
    name: "Comfort",
    price: "$18.75",
    time: "5 min",
    image: "/placeholder.svg?height=50&width=50",
    seats: 4,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$25.00",
    time: "8 min",
    image: "/placeholder.svg?height=50&width=50",
    seats: 4,
  },
]

export default function RideOptions() {
  const [selectedRide, setSelectedRide] = useState("economy")

  return (
    <div className="space-y-3">
      {rideOptions.map((option) => (
        <div
          key={option.id}
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
            selectedRide === option.id ? "bg-zinc-800 border border-zinc-700" : "bg-zinc-900"
          }`}
          onClick={() => setSelectedRide(option.id)}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 mr-3 flex-shrink-0">
              <Car className="w-full h-full text-zinc-400" />
            </div>
            <div>
              <p className="font-medium">{option.name}</p>
              <div className="flex items-center text-sm text-zinc-400">
                <Clock className="w-3 h-3 mr-1" />
                <span>{option.time} away</span>
                <span className="mx-2">•</span>
                <span>{option.seats} seats</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{option.price}</p>
            <p className="text-sm text-zinc-400">Price estimate</p>
          </div>
        </div>
      ))}
    </div>
  )
}
