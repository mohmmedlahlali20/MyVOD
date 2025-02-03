import "../global.css";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "./context/useAuth";

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
}

function RootLayoutInner() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  

  return <RootLayoutNav />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutInner /> 
    </Provider>
  );
}
