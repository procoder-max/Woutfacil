"use client"

import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DriverCard() {
  return (
    <div className="bg-zinc-900 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-3 border-2 border-zinc-700">
            <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Driver" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">John Driver</p>
            <div className="flex items-center text-sm text-zinc-400">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>4.9</span>
              <span className="mx-1">•</span>
              <span>Toyota Camry</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-800 px-3 py-1 rounded-full text-sm">ABC 123</div>
      </div>
    </div>
  )
}
