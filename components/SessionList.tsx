import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions, Seance } from "~/app/redux/seanceSlice";
import { AppDispatch, RootState } from "~/app/redux/store";

export default function SessionList({ movieId }: { movieId: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { seance, error, loading } = useSelector((state: RootState) => state.seance);
    const [selectedSession, setSelectedSession] = useState<Seance | null>(null);

    useEffect(() => {
        if (movieId) {
            dispatch(fetchSessions(movieId));
        }
    }, [dispatch, movieId]);

    return (
        <View className="p-4">
            <Text className="text-white text-xl font-semibold mb-4">Séances disponibles</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                {seance.map((session) => (
                    <TouchableOpacity
                        key={session._id}
                        onPress={() => setSelectedSession(session)}
                        className={`mr-4 px-6 py-3 rounded-lg ${selectedSession?._id === session._id ? "bg-red-500" : "bg-gray-800"}`}
                    >
                        <Text className="text-white text-center">{session.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedSession && (
                <View>
                    <Text className="text-white text-lg font-semibold mb-4">Sièges disponibles</Text>
                    <View className="flex flex-wrap flex-row justify-center gap-2">
                        {selectedSession.seats.map((seat, index) => (
                            <View
                                key={index}
                                className={`w-12 h-12 flex justify-center items-center rounded-lg ${
                                    seat.available ? "bg-green-500" : "bg-gray-700 opacity-50"
                                }`}
                            >
                                <Text className="text-white font-semibold">{index + 1}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}
