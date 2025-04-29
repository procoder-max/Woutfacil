"use client"

import { Search } from "lucide-react"
import { useState } from "react"

export default function DestinationInput() {
  const [destination, setDestination] = useState("")

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full bg-zinc-900 text-white py-3 pl-12 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700"
      />
      {destination && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
          onClick={() => setDestination("")}
        >
          <span className="sr-only">Clear</span>
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="block w-3 h-0.5 bg-current rotate-45"></span>
            <span className="block w-3 h-0.5 bg-current -rotate-45 absolute"></span>
          </div>
        </button>
      )}
    </div>
  )
}
