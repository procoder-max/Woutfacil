"use client"

import type React from "react"

import { useState } from "react"
import { Smartphone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddMobileForm() {
  const [provider, setProvider] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isDefault, setIsDefault] = useState(false)

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
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="default-mobile"
          checked={isDefault}
          onCheckedChange={(checked) => setIsDefault(checked as boolean)}
          className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
        />
        <Label htmlFor="default-mobile" className="text-sm">
          Définir comme moyen de paiement par défaut
        </Label>
      </div>

      <div className="bg-zinc-800 rounded-lg p-4">
        <p className="text-sm font-medium mb-2">Comment ça marche :</p>
        <ol className="text-xs text-zinc-400 space-y-2 list-decimal pl-4">
          <li>Ajoutez votre numéro de téléphone associé à votre compte de paiement mobile.</li>
          <li>Lors du paiement, vous recevrez une notification sur votre téléphone.</li>
          <li>Confirmez le paiement en entrant votre code PIN sur votre téléphone.</li>
          <li>Une fois confirmé, votre course sera automatiquement validée.</li>
        </ol>
      </div>

      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Ajouter le paiement mobile</Button>
    </div>
  )
}
