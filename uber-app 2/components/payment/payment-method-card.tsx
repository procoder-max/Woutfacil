import type React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaymentMethodCardProps {
  type: "mobile" | "card" | "wallet"
  name: string
  details: string
  icon: React.ComponentType<{ className?: string }>
  isDefault?: boolean
}

export default function PaymentMethodCard({
  type,
  name,
  details,
  icon: Icon,
  isDefault = false,
}: PaymentMethodCardProps) {
  return (
    <div className="bg-zinc-800 rounded-lg p-3 flex items-center">
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center mr-3",
          type === "mobile" && "bg-purple-900",
          type === "card" && "bg-blue-900",
          type === "wallet" && "bg-emerald-900",
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5",
            type === "mobile" && "text-purple-400",
            type === "card" && "text-blue-400",
            type === "wallet" && "text-emerald-400",
          )}
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center">
          <p className="font-medium">{name}</p>
          {isDefault && (
            <span className="ml-2 text-xs bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full">Par défaut</span>
          )}
        </div>
        <p className="text-xs text-zinc-400">{details}</p>
      </div>

      <ChevronRight className="h-5 w-5 text-zinc-500" />
    </div>
  )
}
