import { useEffect, useState, useMemo } from 'react'
import { toast } from 'sonner'

export function useExamTimer(initialSeconds: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(initialSeconds)

  useEffect(() => {
    if (remaining <= 0) return

    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          onExpire()
          return 0
        }

        // Warning toasts at specific intervals
        if (prev === 1800) {
          toast.warning('30 minutes remaining', {
            description: 'You have 30 minutes left to complete the exam',
          })
        }
        if (prev === 600) {
          toast.warning('⚠️ 10 minutes remaining!', {
            description: 'Please review your answers',
          })
        }
        if (prev === 300) {
          toast.error('🚨 5 minutes remaining!', {
            description: 'The exam will auto-submit soon',
          })
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onExpire])

  const formatted = useMemo(() => {
    const h = Math.floor(remaining / 3600)
    const m = Math.floor((remaining % 3600) / 60)
    const s = remaining % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [remaining])

  return { remaining, formatted }
}
