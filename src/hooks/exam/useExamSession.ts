import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

interface Option {
  id: string
  text: string
  image_url?: string
}

interface Question {
  id: string
  text: string
  type: 'single' | 'multiple'
  options: Option[]
  passage_part_key?: string
  passage_title?: string
  passage_content?: string
  image_url?: string
}

interface ExamSession {
  id: string
  exam_id: string
  exam_name: string
  student_id: string
  status: 'IN_PROGRESS' | 'PAUSED' | 'SUBMITTED' | 'EXPIRED'
  started_at: string
  ends_at: string
  remaining_seconds: number
  questions: Question[]
  answers: Record<string, string[]>
}

export function useExamSession(sessionId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['exam-session', sessionId],
    queryFn: async () => {
      const response = await api.get(`/sessions/${sessionId}`)
      return response as unknown as ExamSession
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
  })

  return {
    session: data,
    isLoading,
    error,
    refetch,
    examName: data?.exam_name || '',
    questions: data?.questions || [],
    remainingSeconds: data?.remaining_seconds || 0,
    status: data?.status || 'IN_PROGRESS',
  }
}
