import { useEffect, useState } from 'react'
import { set, get, del } from 'idb-keyval'
import { api } from '@/lib/api'
import { useExamStore } from '@/stores/exam.store'

export function useOfflineSync(sessionId: string) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true)
      await syncOfflineData()
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [sessionId])

  // Save answers to IndexedDB when offline
  useEffect(() => {
    if (!isOnline) {
      const answers = useExamStore.getState().answers
      set(`exam-${sessionId}-answers`, answers).catch(console.error)
    }
  }, [isOnline, sessionId])

  const syncOfflineData = async () => {
    setIsSyncing(true)
    try {
      const offlineAnswers = await get<Record<string, string[]>>(`exam-${sessionId}-answers`)
      
      if (offlineAnswers && Object.keys(offlineAnswers).length > 0) {
        await api.put(`/sessions/${sessionId}/answers/bulk`, {
          answers: Object.entries(offlineAnswers).map(([question_id, selected_ids]) => ({
            question_id,
            selected_ids,
          })),
        })

        // Clear offline data after successful sync
        await del(`exam-${sessionId}-answers`)
      }
    } catch (error) {
      console.error('Failed to sync offline data:', error)
    } finally {
      setIsSyncing(false)
    }
  }

  return { isOnline, isSyncing }
}
