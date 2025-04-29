"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AMOUNT_OPTIONS = [
  { value: "500", label: "500 HTG" },
  { value: "1000", label: "1,000 HTG" },
  { value: "2000", label: "2,000 HTG" },
  { value: "5000", label: "5,000 HTG" },
  { value: "custom", label: "Montant personnalisé" },
]

export default function TopupCardForm() {
  const [selectedCard, setSelectedCard] = useState("visa")
  const [amount, setAmount] = useState("1000")
  const [customAmount, setCustomAmount] = useState("")

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card">Carte bancaire</Label>
            <Select value={selectedCard} onValueChange={setSelectedCard}>
              <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                <SelectValue placeholder="Sélectionner une carte" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                <SelectItem value="visa">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                    Visa **** 5678
                  </div>
                </SelectItem>
                <SelectItem value="new">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-zinc-400" />
                    Ajouter une nouvelle carte
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Montant</Label>
            <div className="grid grid-cols-2 gap-2">
              {AMOUNT_OPTIONS.slice(0, 4).map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={amount === option.value ? "default" : "outline"}
                  className={
                    amount === option.value
                      ? "bg-emerald-600 hover:bg-emerald-700 border-transparent"
                      : "border-zinc-600 text-white hover:bg-zinc-700"
                  }
                  onClick={() => setAmount(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <Button
                type="button"
                variant={amount === "custom" ? "default" : "outline"}
                className={
                  amount === "custom"
                    ? "bg-emerald-600 hover:bg-emerald-700 border-transparent"
                    : "border-zinc-600 text-white hover:bg-zinc-700"
                }
                onClick={() => setAmount("custom")}
              >
                Personnalisé
              </Button>

              {amount === "custom" && (
                <Input
                  className="bg-zinc-700 border-zinc-600 text-white"
                  placeholder="Montant en HTG"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value.replace(/\D/g, ""))}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm">Montant</p>
          <p className="font-medium">{amount === "custom" ? customAmount || "0" : amount} HTG</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm">Frais de service (2%)</p>
          <p className="text-sm text-zinc-400">
            {amount === "custom"
              ? customAmount
                ? Math.round(Number.parseInt(customAmount) * 0.02)
                : "0"
              : Math.round(Number.parseInt(amount) * 0.02)}{" "}
            HTG
          </p>
        </div>
        <div className="border-t border-zinc-700 my-2"></div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Total</p>
          <p className="font-medium">
            {amount === "custom"
              ? customAmount
                ? Math.round(Number.parseInt(customAmount) * 1.02)
                : "0"
              : Math.round(Number.parseInt(amount) * 1.02)}{" "}
            HTG
          </p>
        </div>
      </div>

      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Recharger maintenant</Button>
    </div>
  )
}
