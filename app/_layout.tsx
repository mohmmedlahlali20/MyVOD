import "../global.css"
import React, { useEffect, useState } from "react"
import { Slot, Stack, useRouter, useSegments } from "expo-router"
import { Provider } from "react-redux"
import store from "./redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage";


function RootLayoutNav() {

  return (

    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: "#f8fafc" },
        }}
      />

    </Stack>

  )
}

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        router.push("/"); 
      } else {
        setIsLoggedIn(false);
        router.push("/login");
      }
    };

    checkLoginStatus();
  }, [router]);

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}
