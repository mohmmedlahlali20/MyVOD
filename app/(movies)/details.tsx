import { useEffect } from "react"
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import { LinearGradient } from "expo-linear-gradient"
import { AppDispatch, RootState } from "../redux/store"
import { fetchMovieDetails } from "../redux/movieSlice"

export default function MoviesDetails() {
    const { movieId } = useLocalSearchParams()
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const { selectedMovie: movie, error } = useSelector((state: RootState) => state.movies)

    useEffect(() => {
        if (movieId) {
            dispatch(fetchMovieDetails(movieId as string))
        }
    }, [dispatch, movieId])

    if (!movie)
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <ActivityIndicator size="large" color="#fff" />
            </View>
        )

    if (error)
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <Text className="text-red-500 text-lg">{error}</Text>
            </View>
        )

    return (
        <ScrollView className="flex-1 bg-black">
            <Stack.Screen
                options={{
                    title: movie.title,
                    headerStyle: { backgroundColor: "transparent" },
                    headerTintColor: "white",
                    headerTransparent: true,
                }}
            />
            <View className="relative">
                <Image
                    source={{ uri: `http://192.168.8.163:7000/${movie.image}` }}
                    className="w-full h-96"
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)", "black"]}
                    className="absolute bottom-0 left-0 right-0 h-32"
                />
            </View>
            <View className="px-4 pt-4 pb-8">
                <Text className="text-white text-3xl font-bold mb-2">{movie.title}</Text>
                <Text className="text-gray-400 mb-4">{movie.description}</Text>
                <View className="flex-row justify-between mb-6">
                    {movie.movies && movie.movies.length > 0 && (
                        <TouchableOpacity
                            className="bg-red-600 rounded-lg py-3 px-6 flex-1 mr-2 items-center"
                            onPress={() => console.log("Watch Now pressed")}
                        >
                            <Text className="text-white font-semibold text-lg">Watch Now</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        className="bg-gray-800 rounded-lg py-3 px-6 flex-1 ml-2 items-center"
                        onPress={() => console.log("Reserve pressed")}
                    >
                        <Text className="text-white font-semibold text-lg">Reserve</Text>
                    </TouchableOpacity>
                </View>
           


            <Text className="text-gray-400 mb-2">Director: {movie.director?.firstname}</Text>
            <Text className="text-gray-400 mb-2">Release Date: {movie.publishedDate.toString()}</Text>
            <Text className="text-gray-400 mb-2">Release Date: {movie.genre}</Text>
        </View>
    </ScrollView >
  )
}

