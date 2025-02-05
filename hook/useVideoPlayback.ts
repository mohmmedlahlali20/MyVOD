import { useState, useEffect } from "react"
import type { AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av"

export const useVideoPlayback = () => {
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(timer)
  }, []) 

  const togglePlayPause = () => {
    if ((status as AVPlaybackStatusSuccess)?.isPlaying) {
      setStatus((prevStatus) => prevStatus && 'isPlaying' in prevStatus ? { ...prevStatus, isPlaying: false } : null)
    } else {
      setStatus((prevStatus) => prevStatus && 'isPlaying' in prevStatus ? { ...prevStatus, isPlaying: true } : null)
    }
  }

  return {
    status,
    setStatus,
    showControls,
    setShowControls,
    togglePlayPause,
  }
}

