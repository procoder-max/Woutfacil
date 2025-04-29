"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  href?: string
  className?: string
}

export default function BackButton({ href = "/", className = "" }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button variant="ghost" size="icon" className={`${className}`} onClick={handleBack}>
      <ArrowLeft className="h-5 w-5" />
    </Button>
  )
}
