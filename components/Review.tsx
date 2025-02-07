"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { AntDesign } from "@expo/vector-icons"

interface Review {
  id: string
  rating: number
  user: string
}

interface ReviewSectionProps {
  movieId: string
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newRating, setNewRating] = useState(0)

  useEffect(() => {
    
}, [])

  const addReview = () => {
    if (newRating > 0) {
      const review: Review = {
        id: Date.now().toString(),
        rating: newRating,
        user: "Anonymous",
      }
      setReviews([...reviews, review])
      setNewRating(0)
    }
  }

  const StarRating: React.FC<{ rating: number, onRatingChange: (rating: number) => void, disabled?: boolean }> = ({ rating, onRatingChange, disabled = false }) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => !disabled && onRatingChange(star)} disabled={disabled}>
            <AntDesign name={star <= rating ? "star" : "staro"} size={24} color="#FFD700" />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <View className="mt-6 flex-1 px-4 py-3">
      <Text className="text-white text-xl font-bold mb-4">Reviews</Text>
      <View className="mb-4 justify-center">
        <StarRating rating={newRating} onRatingChange={setNewRating} />
      </View>      
    </View>
  )
}

export default ReviewSection

