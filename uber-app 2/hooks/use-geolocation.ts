"use client"

import { useState, useEffect } from "react"

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  error: string | null
  loading: boolean
  timestamp: number | null
  address: string | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: true,
    timestamp: null,
    address: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "La géolocalisation n'est pas prise en charge par votre navigateur",
        loading: false,
      }))
      return
    }

    const geoWatchId = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
          timestamp: position.timestamp,
          address: null,
        })

        // Essayer de faire une géocodage inverse pour obtenir l'adresse
        fetchAddress(position.coords.latitude, position.coords.longitude)
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          error: getGeolocationErrorMessage(error),
          loading: false,
        }))
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )

    return () => {
      navigator.geolocation.clearWatch(geoWatchId)
    }
  }, [])

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      // Dans une application réelle, vous utiliseriez une API de géocodage comme Google Maps, Mapbox, etc.
      // Pour cette démo, nous simulons une réponse
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          address: "Pétion-Ville, Rue Faubert",
        }))
      }, 1000)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'adresse:", error)
    }
  }

  const getGeolocationErrorMessage = (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "L'utilisateur a refusé la demande de géolocalisation"
      case error.POSITION_UNAVAILABLE:
        return "Les informations de localisation ne sont pas disponibles"
      case error.TIMEOUT:
        return "La demande de localisation a expiré"
      default:
        return "Une erreur inconnue s'est produite"
    }
  }

  const requestGeolocation = () => {
    setState((prev) => ({ ...prev, loading: true }))
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
          timestamp: position.timestamp,
          address: null,
        })
        fetchAddress(position.coords.latitude, position.coords.longitude)
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          error: getGeolocationErrorMessage(error),
          loading: false,
        }))
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    )
  }

  return { ...state, requestGeolocation }
}
