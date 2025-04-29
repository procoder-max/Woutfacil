"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("client")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Connexion</h1>
      </div>

      {/* Form */}
      <div className="flex-1 p-4 flex flex-col">
        <Tabs defaultValue="client" className="w-full mb-6" onValueChange={setUserType}>
          <TabsList className="grid grid-cols-2 bg-zinc-800">
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="driver">Chauffeur</TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
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

          <Button
            type="submit"
            className={`w-full ${
              userType === "client" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="mt-auto text-center">
          <p className="text-zinc-400 text-sm mb-4">Vous n'avez pas encore de compte ?</p>
          <Button asChild variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
            <Link href="/register">Créer un compte</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
