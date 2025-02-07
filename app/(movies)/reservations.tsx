import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchMovieDetails } from "../redux/movieSlice";
import { fetchSessions, Seance } from "../redux/seanceSlice";
import { Ionicons } from "@expo/vector-icons";
import SessionList from "../../components/SessionList";

const Reservations = () => {
  const { movieId } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie: movie, error } = useSelector((state: RootState) => state.movies);
  const { seance } = useSelector((state: RootState) => state.seance);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<Seance | null>(null);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId as string));
      dispatch(fetchSessions(movieId as string));
    }
  }, [dispatch, movieId]);

  const handleSeatSelection = (seat: string, isAvailable: boolean) => {
    if (!isAvailable) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat);
      } else {
        return [...prev, seat];
      }
    });
  };

  if (error) {
    return (
      <Text className="text-red-500 text-lg text-center">
        Error fetching movie details
      </Text>
    );
  }

  return (
    <ScrollView className="bg-gray-900 flex-1">
      <Stack.Screen options={{ title: "Movies", headerStyle: { backgroundColor: "black" }, headerTintColor: "white" }} />

      {movie && (
        <View className="relative">
          <Image source={{ uri: `http://192.168.8.243:7000/${movie.image}` }} className="w-full h-96" />
          <View className="absolute bottom-0 left-0 right-0 p-6">
            <Text className="text-white text-3xl font-bold mb-2">{movie.title}</Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="text-white ml-1">4.5 (2.5k)</Text>
            </View>
          </View>
        </View>
      )}

      <View className="px-6 py-8">
        <SessionList movieId={movieId} />
      </View>
    </ScrollView>
  );
};

export default Reservations;
