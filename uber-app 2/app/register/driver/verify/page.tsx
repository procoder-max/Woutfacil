"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DriverVerifyPage() {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const inputRefs = useRef([])

  useEffect(() => {
    if (countdown > 0 && !isVerified) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, isVerified])

  const handleInputChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newCode = [...verificationCode]
    newCode[index] = value

    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleVerify = () => {
    const code = verificationCode.join("")
    if (code.length !== 4) return

    setIsVerifying(true)

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)

      // Redirect after successful verification
      setTimeout(() => {
        router.push("/driver-onboarding")
      }, 2000)
    }, 1500)
  }

  const handleResendCode = () => {
    setCountdown(30)
    // Simulate resending code
  }

  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href="/register/driver">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Vérification</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        {isVerified ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-purple-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Compte vérifié !</h2>
            <p className="text-zinc-400 mb-6">Votre compte a été créé avec succès.</p>
            <p className="text-sm text-zinc-400">Redirection vers l'onboarding chauffeur...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8 max-w-md">
              <h2 className="text-xl font-bold mb-2">Vérifiez votre numéro</h2>
              <p className="text-zinc-400">
                Nous avons envoyé un code de vérification à votre numéro de téléphone. Veuillez entrer ce code
                ci-dessous.
              </p>
            </div>

            <div className="w-full max-w-xs mb-8">
              <div className="flex justify-between gap-2 mb-6">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={verificationCode[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 text-center text-xl font-bold bg-zinc-800 border border-zinc-700 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  />
                ))}
              </div>

              <Button
                onClick={handleVerify}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={verificationCode.join("").length !== 4 || isVerifying}
              >
                {isVerifying ? "Vérification..." : "Vérifier"}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-zinc-400 mb-2">Vous n'avez pas reçu de code ?</p>
              <Button
                variant="link"
                className="text-purple-500 p-0 h-auto"
                onClick={handleResendCode}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Renvoyer le code (${countdown}s)` : "Renvoyer le code"}
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
