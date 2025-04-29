"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Mail, Phone, User, Lock, Car, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DriverRegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    vehicleType: "",
    licenseNumber: "",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/register/driver/verify")
    }, 1500)
  }

  const formatPhoneNumber = (value) => {
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

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formattedPhone }))
  }

  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href="/register">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Inscription Chauffeur</h1>
      </div>

      {/* Form */}
      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                  <Input
                    id="firstName"
                    name="firstName"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                    placeholder="Jean"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                  <Input
                    id="lastName"
                    name="lastName"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                    placeholder="Dupont"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                  placeholder="jean.dupont@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input
                  id="phone"
                  name="phone"
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                  placeholder="+509 XXXX XXXX"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Type de véhicule</Label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4 z-10" />
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => handleSelectChange("vehicleType", value)}
                >
                  <SelectTrigger className="pl-10 bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Sélectionnez un type de véhicule" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="car">Voiture</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="motorcycle">Moto</SelectItem>
                    <SelectItem value="van">Fourgonnette</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Numéro de permis de conduire</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                  placeholder="XXXXXXXX"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10 bg-zinc-800 border-zinc-700 text-white"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-1">Le mot de passe doit contenir au moins 8 caractères</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={handleCheckboxChange}
              className="mt-1 border-zinc-600 data-[state=checked]:bg-purple-600"
            />
            <Label htmlFor="terms" className="text-sm text-zinc-300">
              J'accepte les{" "}
              <Link href="/terms" className="text-purple-500 hover:underline">
                conditions générales
              </Link>{" "}
              et la{" "}
              <Link href="/privacy" className="text-purple-500 hover:underline">
                politique de confidentialité
              </Link>
            </Label>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4">
            <p className="text-sm mb-2">En vous inscrivant en tant que chauffeur, vous devrez :</p>
            <ul className="text-xs text-zinc-400 space-y-1 list-disc pl-4">
              <li>Fournir des documents supplémentaires (carte grise, assurance, etc.)</li>
              <li>Passer une vérification d'identité</li>
              <li>Compléter une formation en ligne</li>
              <li>Accepter les conditions spécifiques aux chauffeurs</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={!formData.agreeTerms || isLoading}
          >
            {isLoading ? "Création du compte..." : "Créer mon compte chauffeur"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-purple-500 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
