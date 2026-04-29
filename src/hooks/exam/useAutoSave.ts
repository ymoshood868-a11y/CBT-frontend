import { useEffect, useState, useCallback } from 'react'
import { api } from '@/lib/api'
import { useExamStore } from '@/stores/exam.store'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function useAutoSave(sessionId: string) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [status, setStatus] = useState<SaveStatus>('idle')
  const [saveTimeout, setSaveTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

  // Debounced save for individual answers
  const saveAnswer = useCallback(async (questionId: string, answer: string[]) => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    const timeout = setTimeout(async () => {
      setStatus('saving')
      try {
        await api.put(`/sessions/${sessionId}/answers`, {
          question_id: questionId,
          selected_ids: answer,
        })
        setLastSaved(new Date())
        setStatus('saved')
      } catch (error) {
        console.error('Failed to save answer:', error)
        setStatus('error')
      }
    }, 500)

    setSaveTimeout(timeout)
  }, [sessionId, saveTimeout])

  // Bulk save every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const answers = useExamStore.getState().answers
      if (Object.keys(answers).length === 0) return

      setStatus('saving')
      try {
        await api.put(`/sessions/${sessionId}/answers/bulk`, {
          answers: Object.entries(answers).map(([question_id, selected_ids]) => ({
            question_id,
            selected_ids,
          })),
        })
        setLastSaved(new Date())
        setStatus('saved')
      } catch (error) {
        console.error('Failed to bulk save answers:', error)
        setStatus('error')
      }
    }, 30_000) // 30 seconds

    return () => clearInterval(interval)
  }, [sessionId])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }
    }
  }, [saveTimeout])

  return { saveAnswer, lastSaved, status }
}
