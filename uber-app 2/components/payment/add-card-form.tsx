"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Calendar, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddCardForm() {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [name, setName] = useState("")
  const [saveCard, setSaveCard] = useState(true)
  const [isDefault, setIsDefault] = useState(false)

  const formatCardNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "")

    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ")

    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
    }

    return digits
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value))
  }

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Numéro de carte</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input
                id="card-number"
                className="pl-10 bg-zinc-700 border-zinc-600 text-white"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry-date">Date d'expiration</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input
                  id="expiry-date"
                  className="pl-10 bg-zinc-700 border-zinc-600 text-white"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength={5}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input
                  id="cvv"
                  className="pl-10 bg-zinc-700 border-zinc-600 text-white"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom sur la carte</Label>
            <Input
              id="name"
              className="bg-zinc-700 border-zinc-600 text-white"
              placeholder="JEAN DUPONT"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="save-card"
            checked={saveCard}
            onCheckedChange={(checked) => setSaveCard(checked as boolean)}
            className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
          />
          <Label htmlFor="save-card" className="text-sm">
            Enregistrer cette carte pour les paiements futurs
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="default-card"
            checked={isDefault}
            onCheckedChange={(checked) => setIsDefault(checked as boolean)}
            className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
          />
          <Label htmlFor="default-card" className="text-sm">
            Définir comme moyen de paiement par défaut
          </Label>
        </div>
      </div>

      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lock className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-400">
            Vos informations de paiement sont chiffrées et sécurisées. Nous ne stockons pas les détails complets de
            votre carte.
          </p>
        </div>
      </div>

      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Ajouter la carte</Button>
    </div>
  )
}
