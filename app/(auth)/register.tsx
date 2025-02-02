import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import path from "../axios/path"; 
import { register } from "../redux/userSlice";
import { useDispatch } from "react-redux";


export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter()
  const [form, setForm] = useState({
    firstname: "Mohammed",
    lastname: "Lahlali",
    email: "Mohammed203@gmail.com",
    password: "password123",
    confirmPassword: "password123",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleRegister = async () => {
    if (!form.firstname || !form.lastname || !form.email || !form.password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
      return;
    }

  
    try {
      const res = await path.post("auth/register", {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password
      });
      router.push("/login");
      dispatch(register(res.data));
      Alert.alert("Succès", "Inscription réussie !");
    } catch (error: any) {
      console.log("Error details:", error);
      Alert.alert("Erreur", error.response?.data?.message || "Erreur dans la requête !");
    }
  };
  


  return (
    <ScrollView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          title: "Register",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />
      <StatusBar style="light" />
      <View className="flex-1 justify-center px-6 py-12">
        <Text className="text-3xl font-bold mb-6 text-center text-white">Create Account</Text>

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-white mb-1">First Name</Text>
            <TextInput
              className="w-full px-3 py-2 border border-white rounded-md text-white"
              placeholder="John"
              value={form.firstname}
              onChangeText={(text) => handleChange("firstname", text)}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-white mb-1">Last Name</Text>
            <TextInput
              className="w-full px-3 py-2 text-white border border-white rounded-md"
              placeholder="Doe"
              value={form.lastname}
              onChangeText={(text) => handleChange("lastname", text)}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-white mb-1">Email</Text>
            <TextInput
              className="w-full px-3 py-2 text-white border border-white rounded-md"
              placeholder="john.doe@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>

          <View>
            <Text className="text-sm text-white font-medium mb-1">Password</Text>
            <TextInput
              className="w-full px-3 py-2 border border-white rounded-md text-white"
              placeholder="********"
              secureTextEntry
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-white mb-1">Confirm Password</Text>
            <TextInput
              className="w-full px-3 py-2 text-white border border-white rounded-md"
              placeholder="********"
              secureTextEntry
              value={form.confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
            />
          </View>
        </View>

        <TouchableOpacity className="mt-6 bg-red-600 py-3 rounded-md" activeOpacity={0.8} onPress={handleRegister}>
          <Text className="text-center text-white font-semibold">Register</Text>
        </TouchableOpacity>

        <Text className="mt-4 text-center text-sm text-white">
          Already have an account?
          <Text className="text-red-600 font-semibold">
            <Link href="/login">
              Sign In
            </Link>
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
