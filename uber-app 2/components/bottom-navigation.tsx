"use client"

import { Home, Search, Bell, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateTo = (path) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-800 py-2 px-4 z-50">
      <div className="flex items-center justify-around">
        {[
          { icon: Home, label: "Accueil", path: "/", active: pathname === "/" },
          { icon: Search, label: "Recherche", path: "/search", active: pathname === "/search" },
          { icon: Bell, label: "Notifications", path: "/notifications", active: pathname === "/notifications" },
          { icon: User, label: "Profil", path: "/profile", active: pathname === "/profile" },
        ].map((item) => {
          const Icon = item.icon
          return (
            <button key={item.label} className="flex flex-col items-center" onClick={() => navigateTo(item.path)}>
              <Icon className={`w-6 h-6 ${item.active ? "text-emerald-500" : "text-zinc-400"}`} />
              <span className={`text-xs mt-1 ${item.active ? "text-emerald-500" : "text-zinc-400"}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
