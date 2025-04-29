import { ArrowLeft, Check, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SubscriptionPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Abonnements</h1>
      </div>

      {/* Subscription Types */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Choisissez votre abonnement</h2>

        <div className="grid gap-4">
          {/* Standard Plan */}
          <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">Standard</h3>
                <p className="text-sm text-zinc-400">Pour les utilisateurs réguliers</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">1 000 HTG</p>
                <p className="text-xs text-zinc-400">par mois</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {[
                "10% de réduction sur toutes les courses",
                "2 courses gratuites par mois",
                "Support client prioritaire",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Souscrire</Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg p-4 border border-emerald-600 relative overflow-hidden">
            <div className="absolute top-0 right-0">
              <div className="bg-emerald-600 text-xs font-bold py-1 px-3 rounded-bl-lg">POPULAIRE</div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">Premium</h3>
                <p className="text-sm text-zinc-400">Pour les utilisateurs exigeants</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">3 000 HTG</p>
                <p className="text-xs text-zinc-400">par mois</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {[
                "20% de réduction sur toutes les courses",
                "5 courses gratuites par mois",
                "Accès prioritaire aux chauffeurs Premium",
                "Support client VIP 24/7",
                "Annulations gratuites",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Souscrire</Button>
          </div>
        </div>
      </div>

      {/* Driver Subscription */}
      <div>
        <h2 className="text-lg font-medium mb-4">Pour les chauffeurs</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Pro Plan */}
          <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
            <div className="flex items-center justify-center mb-3">
              <Shield className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-center text-lg font-medium mb-1">Pro</h3>
            <p className="text-center text-xl font-bold mb-1">1 500 HTG</p>
            <p className="text-center text-xs text-zinc-400 mb-3">par mois</p>

            <div className="space-y-2 mb-4">
              {["Commission réduite à 13%", "Support prioritaire", "Formations avancées"].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-3 h-3 text-emerald-500 mr-1 flex-shrink-0" />
                  <span className="text-xs">{feature}</span>
                </div>
              ))}
            </div>

            <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs">
              Souscrire
            </Button>
          </div>

          {/* Elite Plan */}
          <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
            <div className="flex items-center justify-center mb-3">
              <Star className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-center text-lg font-medium mb-1">Elite</h3>
            <p className="text-center text-xl font-bold mb-1">3 000 HTG</p>
            <p className="text-center text-xs text-zinc-400 mb-3">par mois</p>

            <div className="space-y-2 mb-4">
              {["Commission réduite à 10%", "Accès clients Premium", "Leasing préférentiel", "Support VIP 24/7"].map(
                (feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-3 h-3 text-emerald-500 mr-1 flex-shrink-0" />
                    <span className="text-xs">{feature}</span>
                  </div>
                ),
              )}
            </div>

            <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs">
              Souscrire
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
