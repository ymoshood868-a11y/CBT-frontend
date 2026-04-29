import { useState } from 'react'

export function usePassageOverlay() {
  const [passageOpen, setPassageOpen] = useState(false)

  const openPassage = () => setPassageOpen(true)
  const closePassage = () => setPassageOpen(false)
  const togglePassage = () => setPassageOpen(prev => !prev)

  return { 
    passageOpen, 
    openPassage, 
    closePassage, 
    togglePassage 
  }
}
