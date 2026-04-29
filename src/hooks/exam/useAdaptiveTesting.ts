import { useState } from 'react'
import { api } from '@/lib/api'

interface AdaptiveQuestion {
  id: string
  difficulty: 'easy' | 'medium' | 'hard'
  text: string
  options: Array<{
    id: string
    text: string
  }>
}

export function useAdaptiveTesting(sessionId: string, enabled: boolean = false) {
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [adaptiveQuestions, setAdaptiveQuestions] = useState<AdaptiveQuestion[]>([])

  const adjustDifficulty = async (isCorrect: boolean) => {
    if (!enabled) return

    let newDifficulty = currentDifficulty

    if (isCorrect && currentDifficulty === 'easy') {
      newDifficulty = 'medium'
    } else if (isCorrect && currentDifficulty === 'medium') {
      newDifficulty = 'hard'
    } else if (!isCorrect && currentDifficulty === 'hard') {
      newDifficulty = 'medium'
    } else if (!isCorrect && currentDifficulty === 'medium') {
      newDifficulty = 'easy'
    }

    if (newDifficulty !== currentDifficulty) {
      setCurrentDifficulty(newDifficulty)
      
      try {
        const response = await api.post(`/sessions/${sessionId}/adaptive/next`, {
          difficulty: newDifficulty,
        })
        setAdaptiveQuestions(response.data.questions)
      } catch (error) {
        console.error('Failed to fetch adaptive questions:', error)
      }
    }
  }

  return {
    currentDifficulty,
    adaptiveQuestions,
    adjustDifficulty,
  }
}
