import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovie } from '../redux/movieSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Stack, useRouter } from 'expo-router';

export default function Movies() {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const { movies, error } = useSelector((state: RootState) => state.movies);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchMovie());
  }, [dispatch]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [movies, search]);

  return (
    <View className="bg-black flex-1 px-4 py-8">
      <Stack.Screen
        options={{
          title: "Movies",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />
      <Text className="text-white text-4xl font-bold mb-4">Movies</Text>
      
      <View className="flex flex-row items-center space-x-2 mb-4">
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#ccc"
          value={search}
          onChangeText={setSearch}
          className="flex-1 px-4 py-2 border border-white rounded-md text-white bg-gray-800"
        />
        <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-md m-1">
          <Text className="text-white font-semibold">Search</Text>
        </TouchableOpacity>
      </View>

      {movies.length > 0 && filteredMovies.length === 0 && (
        <Text className="text-gray-400 text-center mt-4">No movies found.</Text>
      )}


      {!movies.length && !error && <ActivityIndicator size="large" color="#fff" />}

      {error && <Text className="text-red-500 text-center">{error}</Text>}

      <ScrollView>
        {filteredMovies.map((item) => (
          <View key={item._id} className="mb-6 flex flex-row items-center">
            <TouchableOpacity onPress={() => router.push(`/details?movieId=${item._id}` as any)}>
              <Image
                source={{ uri: `http://192.168.8.152:7000/${item.image}` }}
                className="w-60 h-40 rounded mr-4"
              />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-lg font-semibold">{item.title}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
