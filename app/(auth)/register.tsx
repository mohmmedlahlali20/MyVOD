import React from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { Link, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function Register() {
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
              className="w-full px-3 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="John"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-white mb-1">Last Name</Text>
            <TextInput
              className="w-full px-3 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Doe"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-white mb-1">Email</Text>
            <TextInput
              className="w-full px-3 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="john.doe@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-white mb-1">Password</Text>
            <TextInput
              className="w-full px-3 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="********"
              secureTextEntry
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-white mb-1">Confirm Password</Text>
            <TextInput
              className="w-full px-3 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="********"
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity className="mt-6 bg-red-600 py-3 rounded-md" activeOpacity={0.8}>
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
  )
}

