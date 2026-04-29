import { create } from "zustand"

export type Role =
  | "super_admin"
  | "school_admin"
  | "teacher"
  | "invigilator"
  | "student"

interface School {
  id: string
  name: string
  logo_url?: string
  primary_color: string
  accent_color: string
}

interface User {
  id: string
  user_code: string
  role: Role
  school_id: string
  must_change_password: boolean
  first_name: string
  last_name: string
  email?: string
  school?: School
  name?: string // Computed property for backward compatibility
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean

  setAuth: (user: User, access: string, refresh: string) => void
  setTokens: (access: string, refresh: string) => void
  clearAuth: () => void
  login: (user: User, token: string) => void
  logout: () => void
}

// Helper function to convert hex to HSL
function hexToHSL(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '')
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

function applySchoolTheme(school?: School) {
  if (!school) return
  
  try {
    const primaryHSL = hexToHSL(school.primary_color)
    const accentHSL = hexToHSL(school.accent_color)
    
    document.documentElement.style.setProperty('--primary', primaryHSL)
    document.documentElement.style.setProperty('--accent', accentHSL)
  } catch (error) {
    console.error('Failed to apply school theme:', error)
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  setAuth: (user, accessToken, refreshToken) => {
    set({ user, accessToken, refreshToken, isAuthenticated: true })
    applySchoolTheme(user.school)
  },

  setTokens: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken })
  },

  clearAuth: () => {
    set({ 
      user: null, 
      accessToken: null, 
      refreshToken: null, 
      isAuthenticated: false 
    })
  },

  // Legacy methods for backward compatibility
  login: (user, token) => {
    set({
      user,
      accessToken: token,
      refreshToken: token,
      isAuthenticated: true,
    })
    applySchoolTheme(user.school)
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  },
}))