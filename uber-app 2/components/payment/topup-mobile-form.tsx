"use client"

import type React from "react"

import { useState } from "react"
import { Smartphone } from "lucide-react"
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

export default function TopupMobileForm() {
  const [provider, setProvider] = useState("moncash")
  const [amount, setAmount] = useState("1000")
  const [customAmount, setCustomAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("+509 4756 2390")

  const formatPhoneNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format as +509 XXXX XXXX
    if (digits.length > 4) {
      return `+509 ${digits.slice(0, 4)} ${digits.slice(4, 8)}`
    } else if (digits.length > 0) {
      return `+509 ${digits.slice(0, 4)}`
    }

    return "+509 "
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value))
  }

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Fournisseur de service</Label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                <SelectValue placeholder="Sélectionner un fournisseur" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                <SelectItem value="moncash">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
                    MonCash
                  </div>
                </SelectItem>
                <SelectItem value="lajancash">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                    LajanCash
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone-number">Numéro de téléphone</Label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input
                id="phone-number"
                className="pl-10 bg-zinc-700 border-zinc-600 text-white"
                placeholder="+509 XXXX XXXX"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
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
        <p className="text-sm font-medium mb-2">Instructions :</p>
        <ol className="text-xs text-zinc-400 space-y-2 list-decimal pl-4">
          <li>Sélectionnez votre fournisseur de paiement mobile.</li>
          <li>Entrez le numéro de téléphone associé à votre compte.</li>
          <li>Choisissez ou entrez le montant que vous souhaitez recharger.</li>
          <li>Après avoir cliqué sur "Recharger", vous recevrez une notification sur votre téléphone.</li>
          <li>Confirmez la transaction en entrant votre code PIN sur votre téléphone.</li>
        </ol>
      </div>

      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Recharger maintenant</Button>
    </div>
  )
}
