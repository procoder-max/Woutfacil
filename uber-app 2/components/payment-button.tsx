"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wallet, CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PaymentButtonProps {
  amount: string
  label?: string
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline" | "secondary"
  className?: string
}

export default function PaymentButton({
  amount,
  label = "Payer",
  size = "default",
  variant = "default",
  className = "",
}: PaymentButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = (method: string) => {
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      router.push("/payment/checkout")
    }, 500)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`${className} ${variant === "default" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
          variant={variant}
          size={size}
          disabled={isLoading}
        >
          {isLoading ? "Traitement..." : `${label} ${amount}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-800 border-zinc-700 text-white">
        <DropdownMenuItem
          className="flex items-center cursor-pointer hover:bg-zinc-700"
          onClick={() => handlePayment("wallet")}
        >
          <Wallet className="mr-2 h-4 w-4 text-emerald-500" />
          <span>Solde MobiTout (3,500 HTG)</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center cursor-pointer hover:bg-zinc-700"
          onClick={() => handlePayment("mobile")}
        >
          <Smartphone className="mr-2 h-4 w-4 text-purple-500" />
          <span>MonCash (+509 4756 2390)</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center cursor-pointer hover:bg-zinc-700"
          onClick={() => handlePayment("card")}
        >
          <CreditCard className="mr-2 h-4 w-4 text-blue-500" />
          <span>Visa (**** 5678)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
