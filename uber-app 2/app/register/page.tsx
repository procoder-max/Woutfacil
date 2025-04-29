import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserTypeCard from "@/components/register/user-type-card"

export default function RegisterPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">Créer un compte</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Rejoignez MobiTout</h2>
          <p className="text-zinc-400 text-sm">
            Sélectionnez votre profil pour commencer votre inscription et accéder à tous nos services de mobilité.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <UserTypeCard
            title="Client"
            description="Réservez des courses, des livraisons et plus encore"
            icon="user"
            benefits={[
              "Accès à toutes les options de transport",
              "Paiements sécurisés",
              "Suivi en temps réel",
              "Programme de fidélité",
            ]}
            href="/register/client"
          />

          <UserTypeCard
            title="Chauffeur"
            description="Rejoignez notre flotte et gagnez de l'argent"
            icon="driver"
            benefits={["Horaires flexibles", "Paiements rapides", "Bonus de performance", "Support dédié 24/7"]}
            href="/register/driver"
          />
        </div>

        <div className="mt-auto text-center">
          <p className="text-zinc-400 text-sm mb-4">Vous avez déjà un compte ?</p>
          <Button asChild variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
            <Link href="/login">
              Se connecter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
