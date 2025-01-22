import { Stack, Link } from 'expo-router';
import { StatusBar, Text, View, Image, ScrollView } from 'react-native';
import tom from '../assets/tom.jpg';
import tom2 from '../assets/tom2.jpg';

export default function Home() {
  return (
    <View className="bg-black flex-1">
      <StatusBar style="light" />
      <View>
      <Text className="text-white text-6xl font-extrabold m-10 text-center">
       Movie
    <Text className="text-[#FF5733]">Land</Text>
  </Text> 
  </View> 
      <View className="flex flex-row justify-between items-center px-4 py-8">
        <View className="flex flex-row">
          <Link href="movies" className="text-white mx-4">Movies</Link>
          <Text className="text-white mx-4">Series</Text>
          <Text className="text-white mx-4">Home</Text>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-4 mb-10">
          <Image 
            source={tom}
            className="w-full h-64 rounded-lg mb-4"
          />
          <Text className="text-white text-2xl font-semibold">Featured Movie</Text>
          <Text className="text-gray-300 mt-2">Some description about the featured movie.</Text>
        </View>
                <View className="mb-6 px-4">
          <Text className="text-white text-xl font-semibold mb-2">Trending Now</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image 
              source={tom}
              className="w-32 h-48 rounded-lg mr-4"
            />
            <Image 
              source={tom2}
              className="w-32 h-48 rounded-lg mr-4"
            />
            <Image 
              source={tom}
              className="w-32 h-48 rounded-lg mr-4"
            />
          </ScrollView>
        </View>
        
        <View className="mb-6 px-4">
          <Text className="text-white text-xl font-semibold mb-2">New Releases</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image 
              source={tom2}
              className="w-32 h-48 rounded-lg mr-4"
            />
            <Image 
              source={tom2}
              className="w-32 h-48 rounded-lg mr-4"
            />
            <Image 
              source={tom2}
              className="w-32 h-48 rounded-lg mr-4"
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
