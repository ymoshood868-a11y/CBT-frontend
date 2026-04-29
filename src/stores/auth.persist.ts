import { useAuthStore } from "./auth.store"

// Load from localStorage on init
const stored = localStorage.getItem('auth')
if (stored) {
  try {
    const { user, accessToken, refreshToken } = JSON.parse(stored)
    if (user && accessToken) {
      useAuthStore.getState().setAuth(user, accessToken, refreshToken || accessToken)
    }
  } catch (error) {
    console.error('Failed to load auth from storage:', error)
    localStorage.removeItem('auth')
  }
}

// Subscribe to changes and save
useAuthStore.subscribe((state) => {
  if (state.user && state.accessToken) {
    localStorage.setItem('auth', JSON.stringify({
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
    }))
  } else {
    localStorage.removeItem('auth')
  }
})

export function saveAuthToStorage() {
  const state = useAuthStore.getState()
  if (state.user && state.accessToken) {
    localStorage.setItem("auth", JSON.stringify({
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
    }))
  }
}

export function loadAuthFromStorage() {
  const data = localStorage.getItem("auth")
  if (!data) return

  try {
    const parsed = JSON.parse(data)
    if (parsed.user && parsed.accessToken) {
      useAuthStore.getState().setAuth(
        parsed.user, 
        parsed.accessToken, 
        parsed.refreshToken || parsed.accessToken
      )
    }
  } catch (error) {
    console.error('Failed to load auth from storage:', error)
    localStorage.removeItem('auth')
  }
}

export function clearAuthFromStorage() {
  localStorage.removeItem('auth')
}