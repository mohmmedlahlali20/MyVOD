"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, FlatList,ScrollView } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

interface Comment {
    id: string
    text: string
    user: string
}

interface CommentSectionProps {
    movieId: string
}

const CommentSection: React.FC<CommentSectionProps> = ({ movieId }) => {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState("")

    const addComment = () => {
        console.log('====================================');
        console.log('Add comment');
        console.log('====================================');
        // if (newComment.trim()) {
        //   const comment: Comment = {
        //     id: Date.now().toString(),
        //     text: newComment,
        //     user: "Anonymous",
        //   }
        //   setComments([...comments, comment])
        //   setNewComment("")
        // }
    }

    return (
        <View className="mt-6 px-4 py-3">
            <Text className="text-white text-xl font-bold mb-4">Comments</Text>
            <View className="flex-row mb-4">
                <TextInput
                    className="flex-1 bg-gray-800 text-white rounded-l-lg px-4 py-2"
                    placeholder="Add a comment..."
                    placeholderTextColor="#9CA3AF"
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity className="bg-red-600 rounded-r-lg px-4 justify-center" onPress={addComment}>
                    <Icon name="send" size={20} color="white" />
                </TouchableOpacity>
            </View>


            <ScrollView className="bg-gray-300 rounded-lg p-3 mb-2">
                <View className="bg-gray-800 rounded-lg p-3 mb-2">
                    <Text className="text-white font-bold"> User</Text>
                    <Text className="text-gray-300">new comments </Text>
                </View>
            </ScrollView>

        </View>
    )
}

export default CommentSection

