"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function AuthRequired() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: false,
  })

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler une connexion
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", "client")
      localStorage.setItem("userName", "Jean Dupont")
      setIsLoading(false)
      router.refresh()
    }, 1500)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler une inscription
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", "client")
      localStorage.setItem("userName", `${registerData.firstName} ${registerData.lastName}`)
      setIsLoading(false)
      router.refresh()
    }, 1500)
  }

  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => (window.location.href = "/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Authentification requise</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-medium mb-2">Connectez-vous pour accéder à votre profil</h2>
          <p className="text-zinc-400 text-sm">
            Vous devez être connecté pour accéder à cette page et gérer vos informations personnelles.
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 bg-zinc-800 mb-6">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-0">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
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
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link href="/forgot-password" className="text-xs text-emerald-500 hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 bg-zinc-800 border-zinc-700 text-white"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-0">
            <form onSubmit={handleRegister} className="space-y-6">
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
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
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
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                    <Input
                      id="reg-email"
                      name="email"
                      type="email"
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                      placeholder="jean.dupont@example.com"
                      value={registerData.email}
                      onChange={handleRegisterChange}
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
                      value={registerData.phone}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                    <Input
                      id="reg-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 bg-zinc-800 border-zinc-700 text-white"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={handleRegisterChange}
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
                  checked={registerData.agreeTerms}
                  onCheckedChange={(checked) => setRegisterData((prev) => ({ ...prev, agreeTerms: checked === true }))}
                  className="mt-1 border-zinc-600 data-[state=checked]:bg-emerald-600"
                />
                <Label htmlFor="terms" className="text-sm text-zinc-300">
                  J'accepte les{" "}
                  <Link href="/terms" className="text-emerald-500 hover:underline">
                    conditions générales
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" className="text-emerald-500 hover:underline">
                    politique de confidentialité
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!registerData.agreeTerms || isLoading}
              >
                {isLoading ? "Création du compte..." : "Créer mon compte"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            {activeTab === "login" ? (
              <>
                Vous n'avez pas encore de compte ?{" "}
                <button className="text-emerald-500 hover:underline" onClick={() => setActiveTab("register")}>
                  Créer un compte
                </button>
              </>
            ) : (
              <>
                Vous avez déjà un compte ?{" "}
                <button className="text-emerald-500 hover:underline" onClick={() => setActiveTab("login")}>
                  Se connecter
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  )
}
