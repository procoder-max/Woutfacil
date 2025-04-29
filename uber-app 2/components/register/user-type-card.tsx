import { ArrowRight, Check, User, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface UserTypeCardProps {
  title: string
  description: string
  icon: "user" | "driver"
  benefits: string[]
  href: string
}

export default function UserTypeCard({ title, description, icon, benefits, href }: UserTypeCardProps) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-emerald-600 transition-colors">
      <div className="flex items-start mb-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
            icon === "user" ? "bg-emerald-900" : "bg-purple-900"
          }`}
        >
          {icon === "user" ? (
            <User className="h-6 w-6 text-emerald-400" />
          ) : (
            <Car className="h-6 w-6 text-purple-400" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start">
            <Check
              className={`h-4 w-4 mt-0.5 mr-2 flex-shrink-0 ${
                icon === "user" ? "text-emerald-500" : "text-purple-500"
              }`}
            />
            <span className="text-sm">{benefit}</span>
          </div>
        ))}
      </div>

      <Button
        asChild
        className={`w-full ${
          icon === "user" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        <Link href={href}>
          S'inscrire en tant que {title.toLowerCase()}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
