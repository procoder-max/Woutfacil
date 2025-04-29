import { ArrowLeft, CreditCard, Smartphone, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopupMobileForm from "@/components/payment/topup-mobile-form"
import TopupCardForm from "@/components/payment/topup-card-form"

export default function TopupPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Recharger mon compte</h1>
      </div>

      {/* Balance Card */}
      <div className="p-4">
        <div className="bg-zinc-800 rounded-xl p-4 flex items-center">
          <div className="w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center mr-4">
            <Wallet className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Solde actuel</p>
            <p className="text-2xl font-bold">3,500 HTG</p>
          </div>
        </div>
      </div>

      {/* Topup Methods */}
      <div className="p-4 flex-1">
        <Tabs defaultValue="mobile" className="w-full">
          <TabsList className="grid grid-cols-2 bg-zinc-800 mb-6">
            <TabsTrigger value="mobile" className="flex items-center">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="card" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Carte
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mobile" className="mt-0">
            <TopupMobileForm />
          </TabsContent>

          <TabsContent value="card" className="mt-0">
            <TopupCardForm />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
