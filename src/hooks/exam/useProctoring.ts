import { useEffect, useRef, useState } from 'react'
import { api } from '@/lib/api'

export function useProctoring(sessionId: string, enabled: boolean = false) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    let snapshotInterval: ReturnType<typeof setInterval>

    const startProctoring = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        setStream(mediaStream)

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }

        // Take snapshots every 30 seconds
        snapshotInterval = setInterval(() => {
          captureSnapshot()
        }, 30_000)

      } catch (err) {
        console.error('Failed to access webcam:', err)
        setError('Failed to access webcam. Proctoring disabled.')
      }
    }

    const captureSnapshot = async () => {
      if (!videoRef.current) return

      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(videoRef.current, 0, 0)

      canvas.toBlob(async (blob) => {
        if (!blob) return

        const formData = new FormData()
        formData.append('image', blob, 'snapshot.jpg')
        formData.append('session_id', sessionId)
        formData.append('timestamp', new Date().toISOString())

        try {
          await api.post('/sessions/proctoring/snapshot', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        } catch (error) {
          console.error('Failed to upload snapshot:', error)
        }
      }, 'image/jpeg', 0.8)
    }

    startProctoring()

    return () => {
      if (snapshotInterval) {
        clearInterval(snapshotInterval)
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [sessionId, enabled])

  return { videoRef, error }
}
