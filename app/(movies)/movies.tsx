import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovie } from '../redux/movieSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Stack } from 'expo-router';

export default function Movies() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, error } = useSelector((state: RootState) => state.movies);
  console.log('====================================');
  console.log(movies);
  console.log('====================================');
  useEffect(() => {
    dispatch(fetchMovie());
  }, [dispatch]);

  return (
    <View className="bg-black container mx-auto px-4 py-8 flex-1">
      <Stack.Screen
        options={{
          title: "Movies",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />
      <Text className="text-white text-4xl font-bold mb-4">Movies</Text>


      {!movies.length && !error && <ActivityIndicator size="large" color="#fff" />}


      {error && <Text className="text-red-500 text-center">{error}</Text>}

      <ScrollView>

        {movies.map((item) => (
          <View key={item._id} className="mb-6 flex flex-row items-center">

            <Image
              source={{ uri: `http://192.168.1.193:7000/${item.image}` }}
              className="w-60 h-40 rounded mr-4"
            />
            <View>
              <Text className="text-white text-lg font-semibold">{item.title}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
