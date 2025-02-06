import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import type { AVPlaybackStatus } from "expo-av"

interface VideoControlsProps {
  movie: {
    title: string
    overview: string
  }
  status: AVPlaybackStatus | null
  togglePlayPause: () => void
}

const VideoControls: React.FC<VideoControlsProps> = ({ movie, status, togglePlayPause }) => (
  <BlurView intensity={80} tint="dark" className="absolute inset-0">
    <View className="flex-1 justify-between p-4">
      <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center items-center">
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View>
        <Text className="text-white text-2xl font-bold mb-2">{movie.title}</Text>

        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity
            className="bg-white rounded-full w-16 h-16 justify-center items-center"
            onPress={togglePlayPause}
          >
            <Ionicons name={status && status.isLoaded ? (status.isPlaying ? "pause" : "play") : "play"} size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </BlurView>
)


export default VideoControls

