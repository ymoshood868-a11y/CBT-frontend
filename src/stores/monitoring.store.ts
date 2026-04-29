import { create } from 'zustand'

interface MonitoringStore {
  alerts: string[]
  addAlert: (alert: string) => void
  clearAlerts: () => void
}

export const useMonitoringStore = create<MonitoringStore>((set) => ({
  alerts: [],

  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),

  clearAlerts: () => set({ alerts: [] }),
}))