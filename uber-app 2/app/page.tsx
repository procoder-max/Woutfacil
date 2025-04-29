import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ServiceSelector from "@/components/service-selector"
import RideBooking from "@/components/ride-booking"
import DeliveryBooking from "@/components/delivery-booking"
import CarpoolBooking from "@/components/carpool-booking"
import RentalBooking from "@/components/rental-booking"
import BottomNavigation from "@/components/bottom-navigation"
import UserProfileBadge from "@/components/user-profile-badge"
import LocationPicker from "@/components/location/location-picker"
import { MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <main className="flex flex-col h-[100dvh] bg-zinc-900 text-white">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-zinc-800 opacity-70">
          <img
            src="/placeholder.svg?height=800&width=400"
            alt="Map Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 px-4 py-3 flex items-center justify-between bg-zinc-900/80 backdrop-blur-sm">
        <UserProfileBadge />
        <button className="bg-zinc-800 p-2 rounded-full">
          <MapPin className="w-5 h-5 text-emerald-500" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Service Selector */}
        <div className="px-4 py-2">
          <ServiceSelector />
        </div>

        {/* Location Picker */}
        <div className="px-4 py-2">
          <LocationPicker />
        </div>

        {/* Booking Panel */}
        <div className="mt-auto bg-zinc-900 rounded-t-3xl flex-1 max-h-[70%] overflow-hidden flex flex-col">
          <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto my-3"></div>

          <Tabs defaultValue="ride" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-4 bg-zinc-800 mx-4 mb-4">
              <TabsTrigger value="ride">VTC</TabsTrigger>
              <TabsTrigger value="carpool">Covoiturage</TabsTrigger>
              <TabsTrigger value="delivery">Livraison</TabsTrigger>
              <TabsTrigger value="rental">Location</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-auto px-4 pb-20">
              <TabsContent value="ride" className="mt-0">
                <RideBooking />
              </TabsContent>

              <TabsContent value="carpool" className="mt-0">
                <CarpoolBooking />
              </TabsContent>

              <TabsContent value="delivery" className="mt-0">
                <DeliveryBooking />
              </TabsContent>

              <TabsContent value="rental" className="mt-0">
                <RentalBooking />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}
