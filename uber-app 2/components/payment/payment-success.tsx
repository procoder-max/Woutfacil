"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentSuccessProps {
  amount: string
  transactionId: string
  date: string
  paymentMethod: string
  onClose: () => void
}

export default function PaymentSuccess({ amount, transactionId, date, paymentMethod, onClose }: PaymentSuccessProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg max-w-md w-full p-6 animate-in fade-in slide-in-from-bottom-10 duration-300">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold">Paiement réussi !</h2>
          <p className="text-zinc-400 text-sm text-center mt-1">Votre paiement a été traité avec succès</p>
        </div>

        <div className="bg-zinc-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-zinc-400">Montant</p>
            <p className="text-lg font-bold">{amount}</p>
          </div>

          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-zinc-400">Transaction ID</p>
            <p className="text-sm">{transactionId}</p>
          </div>

          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-zinc-400">Date</p>
            <p className="text-sm">{date}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-zinc-400">Méthode</p>
            <p className="text-sm">{paymentMethod}</p>
          </div>
        </div>

        <div className="flex space-x-3 mb-6">
          <Button variant="outline" className="flex-1 border-zinc-700 text-white hover:bg-zinc-800">
            <Download className="h-4 w-4 mr-2" />
            Reçu
          </Button>
          <Button variant="outline" className="flex-1 border-zinc-700 text-white hover:bg-zinc-800">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>

        <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={onClose}>
          {countdown > 0 ? `Fermer (${countdown})` : "Fermer"}
        </Button>
      </div>
    </div>
  )
}
