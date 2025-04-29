/**
 * Configuration des API de l'application
 */

// Configuration de l'environnement
const ENV = {
  DEV: "development",
  STAGING: "staging",
  PROD: "production",
}

// Environnement actuel (à changer selon l'environnement)
const CURRENT_ENV = ENV.DEV

// URLs de base selon l'environnement
const BASE_URLS = {
  [ENV.DEV]: "http://localhost:3000/api",
  [ENV.STAGING]: "https://staging-api.mobitout.com/api",
  [ENV.PROD]: "https://api.mobitout.com/api",
}

// URL de base actuelle
export const BASE_URL = BASE_URLS[CURRENT_ENV]

// Endpoints de l'API
export const API_ENDPOINTS = {
  // Authentification
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    VERIFY: "/auth/verify",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Utilisateurs
  USER: {
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    UPLOAD_AVATAR: "/users/avatar",
  },

  // Chauffeurs
  DRIVER: {
    REGISTER: "/drivers/register",
    UPLOAD_DOCUMENTS: "/drivers/documents",
    AVAILABLE: "/drivers/available",
    TOGGLE_AVAILABILITY: "/drivers/availability",
    EARNINGS: "/drivers/earnings",
  },

  // Véhicules
  VEHICLE: {
    REGISTER: "/vehicles/register",
    UPDATE: "/vehicles/update",
    LIST: "/vehicles/list",
  },

  // Courses
  RIDE: {
    REQUEST: "/rides/request",
    ESTIMATE: "/rides/estimate",
    ACCEPT: "/rides/accept",
    CANCEL: "/rides/cancel",
    START: "/rides/start",
    COMPLETE: "/rides/complete",
    STATUS: "/rides/status",
    HISTORY: "/rides/history",
  },

  // Paiements
  PAYMENT: {
    METHODS: "/payments/methods",
    ADD_METHOD: "/payments/methods",
    CHARGE: "/payments/charge",
    HISTORY: "/payments/history",
  },

  // Abonnements
  SUBSCRIPTION: {
    PLANS: "/subscriptions/plans",
    SUBSCRIBE: "/subscriptions/subscribe",
    CANCEL: "/subscriptions/cancel",
    STATUS: "/subscriptions/status",
  },

  // Évaluations
  RATING: {
    SUBMIT: "/ratings/submit",
    USER_RATINGS: "/ratings/user",
    DRIVER_RATINGS: "/ratings/driver",
  },

  // Notifications
  NOTIFICATION: {
    LIST: "/notifications/list",
    READ: "/notifications/read",
    SETTINGS: "/notifications/settings",
  },

  // USSD
  USSD: {
    REQUEST_RIDE: "/ussd/request-ride",
    CHECK_STATUS: "/ussd/status",
  },
}

// Timeout pour les requêtes API (en millisecondes)
export const API_TIMEOUT = 30000

// Headers par défaut pour les requêtes API
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
}

// Configuration pour les requêtes avec upload de fichiers
export const UPLOAD_HEADERS = {
  "Content-Type": "multipart/form-data",
}
