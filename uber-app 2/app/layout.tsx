import type React from "react"
import { Providers } from "./providers"
import "./globals.css"

export const metadata = {
  title: "MobiTout - Application de mobilité tout-en-un",
  description: "VTC, covoiturage, livraison express et location de véhicules",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
