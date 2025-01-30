import "../global.css"
import React, { useEffect } from "react"
import { Slot, Stack, useRouter, useSegments } from "expo-router"

const useAuth = () => {
  return { user: null } 
}

function RootLayoutNav() {
  const { user } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)"

    if (!user && !inAuthGroup) {
      router.replace("/login")
    } else if (user && inAuthGroup) {
      router.replace("/")
    }
  }, [user, segments])

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
  return <RootLayoutNav />
}

