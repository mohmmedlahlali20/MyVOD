import { Stack, useLocalSearchParams } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react"
import { fetchMovieDetails } from "../redux/movieSlice"
import { ActivityIndicator, View, Text, StatusBar, TouchableOpacity } from "react-native"
import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av"
import { replaceIp } from "~/hook/helpers"
import useVideoPlayback from "~/hook/useVideoPlayback"
import VideoControls from "~/components/VideoControls"

export default function VideoScreen() {
  const { movieId } = useLocalSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedMovie: movie, error } = useSelector((state: RootState) => ({
    ...state.movies,
    selectedMovie: {
      ...state.movies.selectedMovie,
    
    }
  }))
  const { videoRef, status, setStatus, showControls, setShowControls, togglePlayPause } = useVideoPlayback()

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId as string))
    }
  }, [dispatch, movieId])

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

      <TouchableOpacity activeOpacity={1} className="flex-1 justify-center" onPress={() => setShowControls(!showControls)}>
        <Video
          ref={videoRef}
          source={{ uri: replaceIp(movie.movies, "192.168.1.28") }}
          style={{ width: "100%", height: "100%" }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={false}
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(status as AVPlaybackStatusSuccess)}
        />

        {showControls && <VideoControls movie={movie} status={status} togglePlayPause={togglePlayPause} />}
      </TouchableOpacity>

      {error && (
        <View className="absolute bottom-0 left-0 right-0 bg-red-600 p-2">
          <Text className="text-white text-center">Error fetching video: {error}</Text>
        </View>
      )}
    </View>
  )
}
