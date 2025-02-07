import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import path from "../axios/path";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("Mohammed203@gmail.com");
  const [password, setPassword] = useState("password123");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
     
      
      
      const res = await path.post("auth/login", { email, password });
      dispatch(login(res.data.user)); 
      await AsyncStorage.setItem("token", res.data.user.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user.user));
      Alert.alert("Success", "Welcome back!");

      router.push("/");
    } catch (error: any) {
      console.error("Login Error:", error); 

      const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";
      Alert.alert("Login Error", errorMessage);
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          title: "Login",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />
      <StatusBar style="light" />

      <View className="flex-1 justify-center px-6 py-12">
        <Text className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-white mb-1">Email</Text>
          <TextInput
            className="w-full px-3 py-2 border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="john.doe@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-white mb-1">Password</Text>
          <TextInput
            className="w-full px-3 py-2 border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity className="mt-6 bg-red-600 py-3 rounded-md" activeOpacity={0.8} onPress={handleLogin}>
          <Text className="text-center text-white font-semibold">Log In</Text>
        </TouchableOpacity>

        <Text className="mt-4 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-600 font-semibold">
            Sign Up
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
}
