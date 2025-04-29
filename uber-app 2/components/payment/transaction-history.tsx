import { ArrowDownLeft, Car, Package, Calendar, Users } from "lucide-react"

const transactions = [
  {
    id: "tx1",
    type: "ride",
    title: "Course VTC",
    amount: "-250 HTG",
    date: "Aujourd'hui, 14:30",
    status: "completed",
    icon: Car,
    isCredit: false,
  },
  {
    id: "tx2",
    type: "topup",
    title: "Recharge MonCash",
    amount: "+1,000 HTG",
    date: "Aujourd'hui, 10:15",
    status: "completed",
    icon: ArrowDownLeft,
    isCredit: true,
  },
  {
    id: "tx3",
    type: "delivery",
    title: "Livraison Express",
    amount: "-350 HTG",
    date: "Hier, 16:45",
    status: "completed",
    icon: Package,
    isCredit: false,
  },
  {
    id: "tx4",
    type: "rental",
    title: "Location 24h",
    amount: "-2,500 HTG",
    date: "22 Avr, 09:30",
    status: "completed",
    icon: Calendar,
    isCredit: false,
  },
  {
    id: "tx5",
    type: "carpool",
    title: "Covoiturage",
    amount: "-150 HTG",
    date: "20 Avr, 08:15",
    status: "completed",
    icon: Users,
    isCredit: false,
  },
]

export default function TransactionHistory() {
  return (
    <div className="space-y-3">
      {transactions.map((transaction) => {
        const Icon = transaction.icon

        return (
          <div key={transaction.id} className="bg-zinc-800 rounded-lg p-3 flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                transaction.isCredit ? "bg-emerald-900" : "bg-zinc-700"
              }`}
            >
              <Icon className={`w-5 h-5 ${transaction.isCredit ? "text-emerald-400" : "text-zinc-400"}`} />
            </div>

            <div className="flex-1">
              <p className="font-medium">{transaction.title}</p>
              <p className="text-xs text-zinc-400">{transaction.date}</p>
            </div>

            <p className={`font-medium ${transaction.isCredit ? "text-emerald-400" : "text-white"}`}>
              {transaction.amount}
            </p>
          </div>
        )
      })}
    </div>
  )
}
