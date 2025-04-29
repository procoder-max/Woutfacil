import { ArrowLeft, CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddCardForm from "@/components/payment/add-card-form"
import AddMobileForm from "@/components/payment/add-mobile-form"

export default function AddPaymentMethodPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Ajouter un moyen de paiement</h1>
      </div>

      {/* Payment Method Tabs */}
      <div className="p-4 flex-1">
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid grid-cols-2 bg-zinc-800 mb-6">
            <TabsTrigger value="card" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Carte
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="mt-0">
            <AddCardForm />
          </TabsContent>

          <TabsContent value="mobile" className="mt-0">
            <AddMobileForm />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
