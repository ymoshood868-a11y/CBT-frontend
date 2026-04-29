import { create } from 'zustand'

interface ExamStore {
  currentIndex: number
  answers: Record<string, string[]>
  flagged: Record<string, boolean>

  setAnswer: (questionId: string, answer: string[]) => void
  toggleFlag: (questionId: string) => void

  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export const useExamStore = create<ExamStore>((set) => ({
  currentIndex: 0,
  answers: {},
  flagged: {},

  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),

  toggleFlag: (questionId) =>
    set((state) => ({
      flagged: {
        ...state.flagged,
        [questionId]: !state.flagged[questionId],
      },
    })),

  next: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),

  prev: () =>
    set((state) => ({ currentIndex: Math.max(0, state.currentIndex - 1) })),

  goTo: (index) => set({ currentIndex: index }),
}))