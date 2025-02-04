import { Link, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import mov from "../assets/images/mov.jpg"
import movie3 from "../assets/images/movie3.jpg"
import movie2 from "../assets/images/movie2.jpg"
import image2 from "../assets/images/image2.png"
import image1 from "../assets/images/image1.png"
import image3 from "../assets/images/image3.png"

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-white text-4xl font-bold text-center">
            Movie<Text className="text-red-500">LanD</Text>
          </Text>
        </View>

        <View className="flex-row justify-center space-x-6 mb-6 gap-5">
          <NavLink href="/movies">Movies</NavLink>
          <NavLink href="/series">Series</NavLink>
          <NavLink href="/" isActive>
            Home
          </NavLink>
        </View>

        <View className="px-4 mb-8">
          <Image source={mov} className="w-full h-64 rounded-2xl mb-4" resizeMode="cover" />
          <Text className="text-white text-2xl font-semibold mb-2">Featured Movie</Text>
          <Text className="text-gray-400 text-sm">
            A thrilling adventure that will keep you on the edge of your seat.
          </Text>
        </View>

        <MovieSection title="Favorites" movies={[movie3, movie2,image2,image1,image3]} />
        <MovieSection title="New Releases" movies={[movie2, movie3,image2,image1,image3]} />
      </ScrollView>
    </SafeAreaView>
  )
}

function NavLink({ href, children, isActive = false }) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity>
        <Text className={`text-lg ${isActive ? "text-red-500 font-semibold" : "text-gray-300"}`}>{children}</Text>
      </TouchableOpacity>
    </Link>
  )
}

function MovieSection({ title, movies }) {
  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-white text-xl font-semibold">{title}</Text>
        <TouchableOpacity>
          <Text className="text-orange-500">See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
        {movies.map((movie, index) => (
          <TouchableOpacity key={index} className="mr-4">
            <Image source={movie} className="w-32 h-48 rounded-lg" resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

