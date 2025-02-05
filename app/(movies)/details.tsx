import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Stack, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { AppDispatch, RootState } from "../redux/store";
import { fetchMovieDetails } from "../redux/movieSlice";
import { addMovieIntoFavorits } from "../redux/userSlice";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function MoviesDetails() {
  const { movieId } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie: movie, error } = useSelector((state: RootState) => state.movies);
  const { favorites } = useSelector((state: RootState) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const userID = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser._id;
    }
    return null;
  };

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId as string));
    }
    const fetchUserID = async () => {
      const id = await userID();
      console.log("User ID:", id);
    };
    fetchUserID();
  }, [dispatch, movieId]);

  useEffect(() => {
    if (movie && favorites) {
      setIsFavorite(favorites.includes(movieId as string));
    }
  }, [movie, favorites]);

  const handleFavorite = async () => {
    if (!movie) return;
    try {
      const userId = await userID();
      if (!userId) return;
      await dispatch(
        addMovieIntoFavorits({
          movieId: movieId as string,
          movieData: { userId },
        })
      ).unwrap();
      setIsFavorite(true);
    } catch (error) {
      console.error("Failed to add movie to favorites:", error);
    }
  };

  if (!movie)
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );

  if (error)
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );

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
        <Image source={{ uri: `http://192.168.8.225:7000/${movie.image}` }} className="w-full h-96" resizeMode="cover" />
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)", "black"]} className="absolute bottom-0 left-0 right-0 h-32" />
      </View>

      <View className="px-4 pt-4 pb-8">
        <Text className="text-white text-3xl font-bold mb-2">{movie.title}</Text>
        <Text className="text-gray-400 mb-4">{movie.description}</Text>

        <TouchableOpacity onPress={handleFavorite} className="absolute top-4 right-4 bg-gray-800 p-3 rounded-full">
          <Icon name={isFavorite ? "heart" : "heart-o"} size={30} color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>


        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            className="bg-red-600 rounded-lg py-3 px-6 flex-1 mr-2 items-center"
            onPress={() => router.push(`/video?movieId=${movieId}`)}
          >
            <Text className="text-white font-semibold text-lg">Watch Now</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-800 rounded-lg py-3 px-6 flex-1 ml-2 items-center">
            <Text className="text-white font-semibold text-lg">Reserve</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-400 mb-2">Director: {movie.director?.firstname}</Text>
        <Text className="text-gray-400 mb-2">Release Date: {movie.publishedDate.toString()}</Text>
        <Text className="text-gray-400 mb-2">Genre: {movie.genre}</Text>
      </View>
    </ScrollView>
  );
}
