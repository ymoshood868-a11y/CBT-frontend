import { useEffect } from 'react'
import { api } from '@/lib/api'
import { getSocket } from '@/lib/socket'

export function useAntiCheat(sessionId: string) {
  useEffect(() => {
    const socket = getSocket()

    // Tab switch detection
    const onVisibility = () => {
      if (document.hidden) {
        api.post(`/sessions/${sessionId}/events`, { 
          type: 'tab_switch',
          timestamp: new Date().toISOString(),
        }).catch(console.error)
        
        socket.emit('exam:violation', { 
          sessionId, 
          type: 'tab_switch',
          timestamp: new Date().toISOString(),
        })
      }
    }

    // Fullscreen exit detection
    const onFullscreen = () => {
      if (!document.fullscreenElement) {
        api.post(`/sessions/${sessionId}/events`, { 
          type: 'fullscreen_exit',
          timestamp: new Date().toISOString(),
        }).catch(console.error)
        
        socket.emit('exam:violation', { 
          sessionId, 
          type: 'fullscreen_exit',
          timestamp: new Date().toISOString(),
        })
      }
    }

    // Prevent copy/paste/cut
    const preventCopy = (e: Event) => {
      e.preventDefault()
      api.post(`/sessions/${sessionId}/events`, { 
        type: 'copy_attempt',
        timestamp: new Date().toISOString(),
      }).catch(console.error)
    }

    const preventPaste = (e: Event) => {
      e.preventDefault()
      api.post(`/sessions/${sessionId}/events`, { 
        type: 'paste_attempt',
        timestamp: new Date().toISOString(),
      }).catch(console.error)
    }

    const preventCut = (e: Event) => {
      e.preventDefault()
      api.post(`/sessions/${sessionId}/events`, { 
        type: 'cut_attempt',
        timestamp: new Date().toISOString(),
      }).catch(console.error)
    }

    // Prevent context menu
    const preventContextMenu = (e: Event) => {
      e.preventDefault()
      api.post(`/sessions/${sessionId}/events`, { 
        type: 'context_menu_attempt',
        timestamp: new Date().toISOString(),
      }).catch(console.error)
    }

    // Add event listeners
    document.addEventListener('visibilitychange', onVisibility)
    document.addEventListener('fullscreenchange', onFullscreen)
    document.addEventListener('copy', preventCopy)
    document.addEventListener('paste', preventPaste)
    document.addEventListener('cut', preventCut)
    document.addEventListener('contextmenu', preventContextMenu)

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('fullscreenchange', onFullscreen)
      document.removeEventListener('copy', preventCopy)
      document.removeEventListener('paste', preventPaste)
      document.removeEventListener('cut', preventCut)
      document.removeEventListener('contextmenu', preventContextMenu)
    }
  }, [sessionId])
}
