import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function Movies() {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('All');
  const [movies, setMovies] = useState([
    { id: '1', title: 'Movie 1', genre: 'Action', year: 2021, image: { uri: 'https://i.pinimg.com/474x/9e/cb/35/9ecb3539a1cbe21443f4b54432324e4b.jpg' } },
    { id: '2', title: 'Movie 2', genre: 'Comedy', year: 2020, image: { uri: 'https://i.pinimg.com/474x/6c/93/de/6c93ded69034b02b2d3801293cbbafa6.jpg' } },
    { id: '3', title: 'Movie 3', genre: 'Drama', year: 2019, image: { uri: 'https://i.pinimg.com/474x/16/ae/9e/16ae9ef1f8e8e6405d9b9508d1e3232d.jpg' } },
    { id: '4', title: 'Movie 4', genre: 'Horror', year: 2022, image: { uri: 'https://i.pinimg.com/474x/46/4e/2a/464e2a939dd1e56d509e80d0a3ed7d95.jpg' } },
    { id: '5', title: 'Movie 5', genre: 'Thriller', year: 2021, image: { uri: 'https://i.pinimg.com/474x/94/00/10/940010831c9010d9bea0f40aff4c5fdb.jpg' } },
    { id: '6', title: 'Movie 6', genre: 'Romance', year: 2020, image: { uri: 'https://i.pinimg.com/474x/ea/01/d3/ea01d339a844c4a53589f1acfa799364.jpg' } },
    { id: '7', title: 'Movie 7', genre: 'Sci-Fi', year: 2018, image: { uri: 'https://i.pinimg.com/474x/c9/5b/de/c95bde62b2936a56c9edb7f560d628f1.jpg' } },
    { id: '8', title: 'Movie 8', genre: 'Adventure', year: 2017, image: { uri: 'https://i.pinimg.com/474x/87/47/b4/8747b4d6ba0072660e41ba42cc77349c.jpg' } },
    { id: '9', title: 'Movie 9', genre: 'Fantasy', year: 2021, image: { uri: 'https://i.pinimg.com/474x/24/e0/36/24e036e217f4bc4455412cc6609f19f3.jpg' } },
    { id: '10', title: 'Movie 10', genre: 'Animation', year: 2020, image: { uri: 'https://i.pinimg.com/736x/fa/d7/c1/fad7c1c8efce92cf76b041f9caf04f7c.jpg' } },
    { id: '11', title: 'Movie 11', genre: 'Crime', year: 2019, image: { uri: 'https://i.pinimg.com/474x/44/a8/6c/44a86c3293847b6faaf99faf7efc771d.jpg' } },
  ]);


  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Romance', 'Sci-Fi', 'Adventure', 'Fantasy', 'Animation', 'Crime'];

  const filteredMovies = movies.filter(movie =>
    (filter === 'All' || movie.genre === filter) &&
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = text => {
    setSearchText(text);
  };

  const handleFilter = genre => {
    setFilter(genre);
  };

  return (
    <View className="bg-black container mx-auto px-4 py-8 flex-1">
    <Text className="text-white text-4xl font-bold mb-4">Movies</Text>

    <TextInput
      placeholder="Search movies..."
      placeholderTextColor="gray"
      value={searchText}
      onChangeText={handleSearch}
      className="bg-gray-800 text-white p-3 rounded mb-4"
    />

    <ScrollView contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }} className="mb-6">
      {genres.map(genre => (
        <TouchableOpacity key={genre} onPress={() => handleFilter(genre)} style={{ marginBottom: 10, width: '22%' }}>
          <Text className={`p-2 text-center rounded ${filter === genre ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
            {genre}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    <FlatList
      data={filteredMovies}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View className="mb-6 flex flex-row items-center">
          <Image source={item.image} className="w-60 h-40 rounded mr-4" />
          <View>
            <Text className="text-white text-lg font-semibold">{item.title}</Text>
            <Text className="text-gray-400">{item.genre} - {item.year}</Text>
          </View>
        </View>
      )}
    />
  </View>
  );
}
