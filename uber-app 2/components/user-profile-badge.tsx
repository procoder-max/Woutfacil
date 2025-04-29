"use client"

import { CreditCard, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function UserProfileBadge() {
  const router = useRouter()

  const navigateToProfile = () => {
    router.push("/profile")
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={navigateToProfile}>
      <Avatar className="h-8 w-8 mr-2 border border-emerald-600">
        <AvatarImage src="/placeholder.svg?height=100&width=100&text=U" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center">
          <p className="text-sm font-medium mr-1">Jean Dupont</p>
          <Badge className="bg-emerald-600 text-[10px]">Premium</Badge>
          <ChevronDown className="w-4 h-4 text-zinc-400 ml-1" />
        </div>
        <div className="flex items-center text-xs text-zinc-400">
          <CreditCard className="w-3 h-3 mr-1" />
          <span>3 000 HTG</span>
        </div>
      </div>
    </div>
  )
}
