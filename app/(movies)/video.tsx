import { useEffect, useState } from "react"
import { View, ActivityIndicator, Text, StatusBar, TouchableOpacity } from "react-native"
import { Video, ResizeMode, type AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av"
import { Stack, useLocalSearchParams, router } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { fetchMovieDetails } from "../redux/movieSlice"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { replaceIp } from "~/hook/helpers"

export default function VideoScreen() {
  const { movieId } = useLocalSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedMovie: movie, error } = useSelector((state: RootState) => state.movies)
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId as string))
    }
  }, [dispatch, movieId])

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(timer)
  }, []) 

  if (!movie) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    )
  }

  if (!movie.movies || movie.movies === "") {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white text-lg">No video available</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-black">
      <StatusBar hidden />
      <Stack.Screen options={{ headerShown: false }} />

      <TouchableOpacity
        activeOpacity={1}
        className="flex-1 justify-center"
        onPress={() => setShowControls(!showControls)}
      >
        <Video
          source={{ uri: replaceIp(movie.movies, "192.168.8.225") }}
          style={{ width: "100%", height: "100%" }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={false}
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        {showControls && (
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
                    onPress={() => {
                      if ((status as AVPlaybackStatusSuccess)?.isPlaying) {
                        setStatus((prevStatus) => prevStatus && { ...(prevStatus as AVPlaybackStatusSuccess), isPlaying: false })
                      } else {
                        setStatus((prevStatus) => prevStatus && { ...(prevStatus as AVPlaybackStatusSuccess), isPlaying: true })
                      }
                    }}
                  >
                    <Ionicons name={(status as AVPlaybackStatus)?.isLoaded && (status as AVPlaybackStatusSuccess).isPlaying ? "pause" : "play"} size={32} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BlurView>
        )}
      </TouchableOpacity>

      {error && (
        <View className="absolute bottom-0 left-0 right-0 bg-red-600 p-2">
          <Text className="text-white text-center">Error fetching video: {error}</Text>
        </View>
      )}
    </View>
  )
}

