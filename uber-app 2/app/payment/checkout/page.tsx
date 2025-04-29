import { ArrowLeft, CreditCard, Smartphone, Wallet, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function CheckoutPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Paiement</h1>
      </div>

      {/* Ride Summary */}
      <div className="p-4">
        <div className="bg-zinc-800 rounded-lg p-4">
          <h2 className="font-medium mb-3">Résumé de la course</h2>

          <div className="flex items-start mb-3">
            <div className="flex flex-col items-center mr-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <div className="w-0.5 h-10 bg-zinc-600"></div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Départ</p>
                <p className="text-xs text-zinc-400">Pétion-Ville, Rue Faubert</p>
              </div>

              <div>
                <p className="text-sm font-medium">Destination</p>
                <p className="text-xs text-zinc-400">Port-au-Prince, Boulevard Toussaint</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-zinc-400 mr-1" />
              <span>15 min</span>
            </div>
            <div>
              <span className="font-medium">VTC Confort</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-4">
        <h2 className="font-medium mb-3">Méthode de paiement</h2>

        <RadioGroup defaultValue="mobile">
          <div className="space-y-3">
            <div className="bg-zinc-800 rounded-lg p-3 flex items-center">
              <RadioGroupItem value="mobile" id="mobile" className="mr-3 border-zinc-600 text-emerald-500" />
              <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mr-3">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              <Label htmlFor="mobile" className="flex-1 cursor-pointer">
                <div>
                  <p className="font-medium">MonCash</p>
                  <p className="text-xs text-zinc-400">+509 4756 2390</p>
                </div>
              </Label>
            </div>

            <div className="bg-zinc-800 rounded-lg p-3 flex items-center">
              <RadioGroupItem value="card" id="card" className="mr-3 border-zinc-600 text-emerald-500" />
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center mr-3">
                <CreditCard className="w-5 h-5 text-blue-400" />
              </div>
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                <div>
                  <p className="font-medium">Visa</p>
                  <p className="text-xs text-zinc-400">**** 5678</p>
                </div>
              </Label>
            </div>

            <div className="bg-zinc-800 rounded-lg p-3 flex items-center">
              <RadioGroupItem value="wallet" id="wallet" className="mr-3 border-zinc-600 text-emerald-500" />
              <div className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center mr-3">
                <Wallet className="w-5 h-5 text-emerald-400" />
              </div>
              <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                <div>
                  <p className="font-medium">Solde MobiTout</p>
                  <p className="text-xs text-zinc-400">3,500 HTG disponible</p>
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>

        <Button variant="link" className="text-emerald-500 p-0 h-auto mt-2">
          + Ajouter un moyen de paiement
        </Button>
      </div>

      {/* Price Details */}
      <div className="p-4 mt-auto">
        <div className="bg-zinc-800 rounded-lg p-4">
          <div className="space-y-2 mb-3">
            <div className="flex justify-between">
              <p className="text-sm">Tarif de base</p>
              <p>350 HTG</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Distance (12 km)</p>
              <p>120 HTG</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Durée (15 min)</p>
              <p>30 HTG</p>
            </div>
            <div className="flex justify-between text-emerald-500">
              <p className="text-sm">Réduction abonné Premium (-20%)</p>
              <p>-100 HTG</p>
            </div>
          </div>

          <div className="border-t border-zinc-700 pt-3 flex justify-between items-center">
            <p className="font-medium">Total</p>
            <p className="text-xl font-bold">400 HTG</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6">Payer 400 HTG</Button>
      </div>
    </main>
  )
}
