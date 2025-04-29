/**
 * Providers de l'application
 */

import type React from "react"
import { AppProvider } from "@/contexts/app-context"
import { AuthProvider } from "@/contexts/auth-context"
import { LocationProvider } from "@/contexts/location-context"
import { BookingProvider } from "@/contexts/booking-context"
import { PaymentProvider } from "@/contexts/payment-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { USSDProvider } from "@/contexts/ussd-context"
import { DriverProvider } from "@/contexts/driver-context"
import { SubscriptionProvider } from "@/contexts/subscription-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>
        <LocationProvider>
          <BookingProvider>
            <PaymentProvider>
              <NotificationProvider>
                <USSDProvider>
                  <DriverProvider>
                    <SubscriptionProvider>{children}</SubscriptionProvider>
                  </DriverProvider>
                </USSDProvider>
              </NotificationProvider>
            </PaymentProvider>
          </BookingProvider>
        </LocationProvider>
      </AuthProvider>
    </AppProvider>
  )
}
