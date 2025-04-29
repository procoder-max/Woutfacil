import { Plus, CreditCard, Smartphone, Wallet, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PaymentMethodCard from "@/components/payment/payment-method-card"
import TransactionHistory from "@/components/payment/transaction-history"
import BackButton from "@/components/ui/back-button"

export default function PaymentPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <BackButton className="mr-2" />
        <h1 className="text-xl font-bold">Paiement</h1>
      </div>

      {/* Balance Card */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-xl p-4">
          <p className="text-sm text-emerald-100 mb-1">Solde disponible</p>
          <p className="text-3xl font-bold mb-4">3,500 HTG</p>

          <div className="flex space-x-2">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1">
              Recharger
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-300 text-emerald-100 hover:bg-emerald-800 flex-1"
            >
              Transférer
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Moyens de paiement</h2>
          <Button variant="ghost" size="sm" className="text-emerald-500 hover:text-emerald-400">
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>

        <div className="space-y-3">
          <PaymentMethodCard type="mobile" name="MonCash" details="+509 4756 2390" icon={Smartphone} isDefault={true} />

          <PaymentMethodCard type="card" name="Visa" details="**** 5678" icon={CreditCard} isDefault={false} />

          <PaymentMethodCard type="wallet" name="Solde MobiTout" details="3,500 HTG" icon={Wallet} isDefault={false} />
        </div>
      </div>

      {/* Transactions */}
      <div className="flex-1 p-4">
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid grid-cols-2 bg-zinc-800 mb-4">
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-0">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            <div className="bg-zinc-800 rounded-lg p-4 flex items-center">
              <Clock className="h-10 w-10 text-zinc-500 mr-4" />
              <div className="flex-1">
                <p className="text-zinc-400">Aucun paiement programmé</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
