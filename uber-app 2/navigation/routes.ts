/**
 * Configuration des routes de l'application
 */

export const ROUTES = {
  // Routes d'authentification
  AUTH: {
    WELCOME: "Welcome",
    LOGIN: "Login",
    REGISTER: "Register",
    REGISTER_CLIENT: "RegisterClient",
    REGISTER_DRIVER: "RegisterDriver",
    VERIFY: "Verify",
    FORGOT_PASSWORD: "ForgotPassword",
    RESET_PASSWORD: "ResetPassword",
  },

  // Routes principales
  MAIN: {
    HOME: "Home",
    SEARCH: "Search",
    NOTIFICATIONS: "Notifications",
    PROFILE: "Profile",
  },

  // Routes de service
  SERVICE: {
    VTC: "VTC",
    CARPOOL: "Carpool",
    DELIVERY: "Delivery",
    RENTAL: "Rental",
  },

  // Routes de réservation
  BOOKING: {
    RIDE_DETAILS: "RideDetails",
    DRIVER_SELECTION: "DriverSelection",
    RIDE_TRACKING: "RideTracking",
    PAYMENT: "Payment",
    RATING: "Rating",
  },

  // Routes de profil
  PROFILE: {
    PERSONAL_INFO: "PersonalInfo",
    PAYMENT_METHODS: "PaymentMethods",
    RIDE_HISTORY: "RideHistory",
    SUBSCRIPTION: "Subscription",
    SETTINGS: "Settings",
    HELP: "Help",
  },

  // Routes chauffeur
  DRIVER: {
    DASHBOARD: "DriverDashboard",
    RIDE_REQUESTS: "DriverRideRequests",
    EARNINGS: "DriverEarnings",
    TRAINING: "DriverTraining",
    VEHICLE_MANAGEMENT: "VehicleManagement",
  },

  // Routes administrateur
  ADMIN: {
    DASHBOARD: "AdminDashboard",
    USER_MANAGEMENT: "UserManagement",
    RIDE_MANAGEMENT: "RideManagement",
    ANALYTICS: "Analytics",
    SETTINGS: "AdminSettings",
  },
}

// Types pour la navigation typée
export type RootStackParamList = {
  [ROUTES.AUTH.WELCOME]: undefined
  [ROUTES.AUTH.LOGIN]: undefined
  [ROUTES.AUTH.REGISTER]: undefined
  [ROUTES.AUTH.REGISTER_CLIENT]: undefined
  [ROUTES.AUTH.REGISTER_DRIVER]: undefined
  [ROUTES.AUTH.VERIFY]: { phone: string; userType: "client" | "driver" }
  [ROUTES.AUTH.FORGOT_PASSWORD]: undefined
  [ROUTES.AUTH.RESET_PASSWORD]: { token: string }

  [ROUTES.MAIN.HOME]: undefined
  [ROUTES.MAIN.SEARCH]: undefined
  [ROUTES.MAIN.NOTIFICATIONS]: undefined
  [ROUTES.MAIN.PROFILE]: undefined

  [ROUTES.SERVICE.VTC]: undefined
  [ROUTES.SERVICE.CARPOOL]: undefined
  [ROUTES.SERVICE.DELIVERY]: undefined
  [ROUTES.SERVICE.RENTAL]: undefined

  [ROUTES.BOOKING.RIDE_DETAILS]: { serviceType: "vtc" | "carpool" | "delivery" | "rental" }
  [ROUTES.BOOKING.DRIVER_SELECTION]: { rideId: string }
  [ROUTES.BOOKING.RIDE_TRACKING]: { rideId: string }
  [ROUTES.BOOKING.PAYMENT]: { rideId: string; amount: number }
  [ROUTES.BOOKING.RATING]: { rideId: string; driverId: string }

  [ROUTES.PROFILE.PERSONAL_INFO]: undefined
  [ROUTES.PROFILE.PAYMENT_METHODS]: undefined
  [ROUTES.PROFILE.RIDE_HISTORY]: undefined
  [ROUTES.PROFILE.SUBSCRIPTION]: undefined
  [ROUTES.PROFILE.SETTINGS]: undefined
  [ROUTES.PROFILE.HELP]: undefined

  [ROUTES.DRIVER.DASHBOARD]: undefined
  [ROUTES.DRIVER.RIDE_REQUESTS]: undefined
  [ROUTES.DRIVER.EARNINGS]: undefined
  [ROUTES.DRIVER.TRAINING]: undefined
  [ROUTES.DRIVER.VEHICLE_MANAGEMENT]: undefined

  [ROUTES.ADMIN.DASHBOARD]: undefined
  [ROUTES.ADMIN.USER_MANAGEMENT]: undefined
  [ROUTES.ADMIN.RIDE_MANAGEMENT]: undefined
  [ROUTES.ADMIN.ANALYTICS]: undefined
  [ROUTES.ADMIN.SETTINGS]: undefined
}
