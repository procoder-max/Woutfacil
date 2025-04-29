"use client"

import { useState } from "react"
import { Plus, CreditCard, Smartphone, Wallet, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "mobile",
      name: "MonCash",
      details: "+509 4756 2390",
      icon: Smartphone,
      iconBg: "bg-purple-900",
      iconColor: "text-purple-400",
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      name: "Visa",
      details: "**** 5678",
      icon: CreditCard,
      iconBg: "bg-blue-900",
      iconColor: "text-blue-400",
      isDefault: false,
    },
    {
      id: "3",
      type: "wallet",
      name: "Solde MobiTout",
      details: "3,500 HTG",
      icon: Wallet,
      iconBg: "bg-emerald-900",
      iconColor: "text-emerald-400",
      isDefault: false,
    },
  ])

  const [isAddingPayment, setIsAddingPayment] = useState(false)
  const [newPaymentType, setNewPaymentType] = useState("card")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newCardData, setNewCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    setAsDefault: false,
  })

  const [newMobileData, setNewMobileData] = useState({
    provider: "moncash",
    phoneNumber: "+509 ",
    setAsDefault: false,
  })

  const handleSetDefault = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleDeletePayment = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const handleAddCard = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'ajout d'une carte
    setTimeout(() => {
      const newId = (paymentMethods.length + 1).toString()
      const newCard = {
        id: newId,
        type: "card",
        name: "Visa",
        details: `**** ${newCardData.cardNumber.slice(-4)}`,
        icon: CreditCard,
        iconBg: "bg-blue-900",
        iconColor: "text-blue-400",
        isDefault: newCardData.setAsDefault,
      }

      if (newCardData.setAsDefault) {
        setPaymentMethods([newCard, ...paymentMethods.map((method) => ({ ...method, isDefault: false }))])
      } else {
        setPaymentMethods([...paymentMethods, newCard])
      }

      setNewCardData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        name: "",
        setAsDefault: false,
      })
      setIsSubmitting(false)
      setIsAddingPayment(false)
    }, 1500)
  }

  const handleAddMobile = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'ajout d'un paiement mobile
    setTimeout(() => {
      const newId = (paymentMethods.length + 1).toString()
      const newMobile = {
        id: newId,
        type: "mobile",
        name: newMobileData.provider === "moncash" ? "MonCash" : "LajanCash",
        details: newMobileData.phoneNumber,
        icon: Smartphone,
        iconBg: newMobileData.provider === "moncash" ? "bg-purple-900" : "bg-blue-900",
        iconColor: newMobileData.provider === "moncash" ? "text-purple-400" : "text-blue-400",
        isDefault: newMobileData.setAsDefault,
      }

      if (newMobileData.setAsDefault) {
        setPaymentMethods([newMobile, ...paymentMethods.map((method) => ({ ...method, isDefault: false }))])
      } else {
        setPaymentMethods([...paymentMethods, newMobile])
      }

      setNewMobileData({
        provider: "moncash",
        phoneNumber: "+509 ",
        setAsDefault: false,
      })
      setIsSubmitting(false)
      setIsAddingPayment(false)
    }, 1500)
  }

  const formatCardNumber = (value) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "")

    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ")

    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
    }

    return digits
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

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-xl p-4">
        <p className="text-sm text-emerald-100 mb-1">Solde disponible</p>
        <p className="text-3xl font-bold mb-4">3,500 HTG</p>

        <div className="flex space-x-2">
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
            onClick={() => (window.location.href = "/payment/topup")}
          >
            Recharger
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-emerald-300 text-emerald-100 hover:bg-emerald-800 flex-1"
            onClick={() => alert("Fonctionnalité de transfert à venir")}
          >
            Transférer
          </Button>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Moyens de paiement</h2>
          <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-emerald-500 hover:text-emerald-400">
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
              <DialogHeader>
                <DialogTitle>Ajouter un moyen de paiement</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="card" className="w-full" onValueChange={setNewPaymentType}>
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
                  <form onSubmit={handleAddCard} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Numéro de carte</Label>
                      <Input
                        id="card-number"
                        className="bg-zinc-800 border-zinc-700 text-white"
                        placeholder="1234 5678 9012 3456"
                        value={newCardData.cardNumber}
                        onChange={(e) =>
                          setNewCardData({ ...newCardData, cardNumber: formatCardNumber(e.target.value) })
                        }
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-date">Date d'expiration</Label>
                        <Input
                          id="expiry-date"
                          className="bg-zinc-800 border-zinc-700 text-white"
                          placeholder="MM/YY"
                          value={newCardData.expiryDate}
                          onChange={(e) =>
                            setNewCardData({ ...newCardData, expiryDate: formatExpiryDate(e.target.value) })
                          }
                          maxLength={5}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          className="bg-zinc-800 border-zinc-700 text-white"
                          placeholder="123"
                          value={newCardData.cvv}
                          onChange={(e) =>
                            setNewCardData({ ...newCardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })
                          }
                          maxLength={3}
                          type="password"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nom sur la carte</Label>
                      <Input
                        id="name"
                        className="bg-zinc-800 border-zinc-700 text-white"
                        placeholder="JEAN DUPONT"
                        value={newCardData.name}
                        onChange={(e) => setNewCardData({ ...newCardData, name: e.target.value.toUpperCase() })}
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="default-card"
                        checked={newCardData.setAsDefault}
                        onCheckedChange={(checked) => setNewCardData({ ...newCardData, setAsDefault: checked })}
                      />
                      <Label htmlFor="default-card">Définir comme moyen de paiement par défaut</Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Ajout en cours..." : "Ajouter la carte"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="mobile" className="mt-0">
                  <form onSubmit={handleAddMobile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Fournisseur</Label>
                      <select
                        id="provider"
                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md p-2"
                        value={newMobileData.provider}
                        onChange={(e) => setNewMobileData({ ...newMobileData, provider: e.target.value })}
                        required
                      >
                        <option value="moncash">MonCash</option>
                        <option value="lajancash">LajanCash</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Numéro de téléphone</Label>
                      <Input
                        id="phone-number"
                        className="bg-zinc-800 border-zinc-700 text-white"
                        placeholder="+509 XXXX XXXX"
                        value={newMobileData.phoneNumber}
                        onChange={(e) =>
                          setNewMobileData({ ...newMobileData, phoneNumber: formatPhoneNumber(e.target.value) })
                        }
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="default-mobile"
                        checked={newMobileData.setAsDefault}
                        onCheckedChange={(checked) => setNewMobileData({ ...newMobileData, setAsDefault: checked })}
                      />
                      <Label htmlFor="default-mobile">Définir comme moyen de paiement par défaut</Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Ajout en cours..." : "Ajouter le paiement mobile"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <div key={method.id} className="bg-zinc-800 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${method.iconBg}`}>
                      <Icon className={`w-5 h-5 ${method.iconColor}`} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{method.name}</p>
                        {method.isDefault && (
                          <span className="ml-2 text-xs bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full">
                            Par défaut
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400">{method.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {!method.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2 text-emerald-500 hover:text-emerald-400"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-400"
                      onClick={() => handleDeletePayment(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Payment History */}
      <div>
        <h2 className="text-lg font-medium mb-4">Historique des paiements</h2>
        <div className="bg-zinc-800 rounded-lg p-4">
          <div className="space-y-3">
            {[
              {
                id: "tx1",
                title: "Course VTC",
                amount: "-250 HTG",
                date: "Aujourd'hui, 14:30",
                method: "MonCash",
              },
              {
                id: "tx2",
                title: "Recharge",
                amount: "+1,000 HTG",
                date: "Hier, 10:15",
                method: "Visa ****5678",
              },
              {
                id: "tx3",
                title: "Livraison Express",
                amount: "-350 HTG",
                date: "22 Avr, 16:45",
                method: "Solde MobiTout",
              },
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-zinc-400">
                    {transaction.date} • {transaction.method}
                  </p>
                </div>
                <p className={transaction.amount.startsWith("+") ? "text-emerald-500" : "text-white"}>
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
          <Button
            variant="link"
            className="w-full text-emerald-500 mt-2"
            onClick={() => (window.location.href = "/payment")}
          >
            Voir tout l'historique
          </Button>
        </div>
      </div>
    </div>
  )
}
