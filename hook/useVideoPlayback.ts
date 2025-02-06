import { useEffect, useRef, useState } from "react"
import { Video, AVPlaybackStatusSuccess } from "expo-av"


const useVideoPlayback = () => {
  const videoRef = useRef<Video>(null)
  const [status, setStatus] = useState<AVPlaybackStatusSuccess | null>(null)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(timer)
  }, [showControls])

  const togglePlayPause = async () => {
    if (!status) return
    if (status.isPlaying) {
      await videoRef.current?.pauseAsync()
    } else {
      await videoRef.current?.playAsync()
    }
  }

  return {
    videoRef,
    status,
    setStatus,
    showControls,
    setShowControls,
    togglePlayPause,
  }
}

export default useVideoPlayback;
