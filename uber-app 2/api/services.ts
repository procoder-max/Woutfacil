/**
 * Services API de l'application
 */

import axios from "axios"
import { BASE_URL, API_ENDPOINTS, API_TIMEOUT, DEFAULT_HEADERS } from "./config"

// Création d'une instance axios avec la configuration de base
const api = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
  headers: DEFAULT_HEADERS,
})

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  async (config) => {
    // Récupérer le token depuis le stockage local
    const token = await localStorage.getItem("authToken")

    // Si le token existe, l'ajouter aux headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Si l'erreur est 401 (non autorisé) et que ce n'est pas déjà une tentative de refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Tenter de rafraîchir le token
        const refreshToken = await localStorage.getItem("refreshToken")
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, { refreshToken })

        // Stocker le nouveau token
        const { token } = response.data
        await localStorage.setItem("authToken", token)

        // Mettre à jour le header et réessayer la requête
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        return api(originalRequest)
      } catch (refreshError) {
        // Si le refresh échoue, rediriger vers la page de connexion
        // Ici, vous devriez implémenter une logique pour déconnecter l'utilisateur
        console.error("Échec du rafraîchissement du token", refreshError)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

// Services d'authentification
export const authService = {
  register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  verify: (verificationData) => api.post(API_ENDPOINTS.AUTH.VERIFY, verificationData),
  forgotPassword: (email) => api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),
  resetPassword: (resetData) => api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData),
}

// Services utilisateur
export const userService = {
  getProfile: () => api.get(API_ENDPOINTS.USER.PROFILE),
  updateProfile: (profileData) => api.put(API_ENDPOINTS.USER.UPDATE_PROFILE, profileData),
  uploadAvatar: (formData) => {
    return api.post(API_ENDPOINTS.USER.UPLOAD_AVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
}

// Services chauffeur
export const driverService = {
  register: (driverData) => api.post(API_ENDPOINTS.DRIVER.REGISTER, driverData),
  uploadDocuments: (formData) => {
    return api.post(API_ENDPOINTS.DRIVER.UPLOAD_DOCUMENTS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  getAvailable: (location) =>
    api.get(`${API_ENDPOINTS.DRIVER.AVAILABLE}?lat=${location.latitude}&lng=${location.longitude}`),
  toggleAvailability: (isAvailable) => api.post(API_ENDPOINTS.DRIVER.TOGGLE_AVAILABILITY, { isAvailable }),
  getEarnings: (period) => api.get(`${API_ENDPOINTS.DRIVER.EARNINGS}?period=${period}`),
}

// Services de course
export const rideService = {
  requestRide: (rideData) => api.post(API_ENDPOINTS.RIDE.REQUEST, rideData),
  estimateRide: (rideData) => api.post(API_ENDPOINTS.RIDE.ESTIMATE, rideData),
  acceptRide: (rideId) => api.post(`${API_ENDPOINTS.RIDE.ACCEPT}/${rideId}`),
  cancelRide: (rideId, reason) => api.post(`${API_ENDPOINTS.RIDE.CANCEL}/${rideId}`, { reason }),
  startRide: (rideId) => api.post(`${API_ENDPOINTS.RIDE.START}/${rideId}`),
  completeRide: (rideId) => api.post(`${API_ENDPOINTS.RIDE.COMPLETE}/${rideId}`),
  getRideStatus: (rideId) => api.get(`${API_ENDPOINTS.RIDE.STATUS}/${rideId}`),
  getRideHistory: (page = 1, limit = 10) => api.get(`${API_ENDPOINTS.RIDE.HISTORY}?page=${page}&limit=${limit}`),
}

// Services de paiement
export const paymentService = {
  getMethods: () => api.get(API_ENDPOINTS.PAYMENT.METHODS),
  addMethod: (paymentData) => api.post(API_ENDPOINTS.PAYMENT.ADD_METHOD, paymentData),
  charge: (paymentData) => api.post(API_ENDPOINTS.PAYMENT.CHARGE, paymentData),
  getHistory: (page = 1, limit = 10) => api.get(`${API_ENDPOINTS.PAYMENT.HISTORY}?page=${page}&limit=${limit}`),
}

// Services d'abonnement
export const subscriptionService = {
  getPlans: () => api.get(API_ENDPOINTS.SUBSCRIPTION.PLANS),
  subscribe: (planId, paymentMethodId) => api.post(API_ENDPOINTS.SUBSCRIPTION.SUBSCRIBE, { planId, paymentMethodId }),
  cancel: () => api.post(API_ENDPOINTS.SUBSCRIPTION.CANCEL),
  getStatus: () => api.get(API_ENDPOINTS.SUBSCRIPTION.STATUS),
}

// Services d'évaluation
export const ratingService = {
  submitRating: (ratingData) => api.post(API_ENDPOINTS.RATING.SUBMIT, ratingData),
  getUserRatings: (userId) => api.get(`${API_ENDPOINTS.RATING.USER_RATINGS}/${userId}`),
  getDriverRatings: (driverId) => api.get(`${API_ENDPOINTS.RATING.DRIVER_RATINGS}/${driverId}`),
}

// Services de notification
export const notificationService = {
  getNotifications: (page = 1, limit = 20) => api.get(`${API_ENDPOINTS.NOTIFICATION.LIST}?page=${page}&limit=${limit}`),
  markAsRead: (notificationId) => api.post(`${API_ENDPOINTS.NOTIFICATION.READ}/${notificationId}`),
  updateSettings: (settings) => api.put(API_ENDPOINTS.NOTIFICATION.SETTINGS, settings),
}

// Services USSD
export const ussdService = {
  requestRide: (ussdData) => api.post(API_ENDPOINTS.USSD.REQUEST_RIDE, ussdData),
  checkStatus: (requestId) => api.get(`${API_ENDPOINTS.USSD.CHECK_STATUS}/${requestId}`),
}

// Export de l'instance API pour une utilisation personnalisée
export default api
