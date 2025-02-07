import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createReservations } from "~/app/redux/reservationSlice";
import { fetchSessions, Seance } from "~/app/redux/seanceSlice";
import { AppDispatch, RootState } from "~/app/redux/store";

export default function SessionList({ movieId }: { movieId: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { seance, error, loading } = useSelector((state: RootState) => state.seance);
    const [selectedSession, setSelectedSession] = useState<Seance | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);


    const userID = async () => {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          return parsedUser._id;
        }
        return null;
      };

    useEffect(() => {
        if (movieId) {
            dispatch(fetchSessions(movieId));
        }
    }, [dispatch, movieId]);

    const handleSeatSelection = (seatNumber: number) => {
        setSelectedSeats((prevSeats) =>
            prevSeats.includes(seatNumber)
                ? prevSeats.filter((num) => num !== seatNumber)
                : [...prevSeats, seatNumber]
        );
    };

    const handleReservation = async () => {
        const userId = await userID();
        if (selectedSession && selectedSeats.length > 0) {
            dispatch(createReservations({ session: selectedSession._id, seats: selectedSeats, userId: userId }));
    
            setSelectedSession((prevSession) => {
                if (!prevSession) return null;
                return {
                    ...prevSession,
                    seats: prevSession.seats.map((seat) =>
                        selectedSeats.includes(seat.number) ? { ...seat, available: false } : seat
                    ),
                };
            });
    
            console.log("Session ID:", selectedSession._id);
            console.log("Selected Seats:", selectedSeats);
            console.log("UserId:", userId);
        }
    };

    return (
        <View className="p-4">
            <Text className="text-white text-xl font-semibold mb-4">Séances disponibles</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                {seance.map((session) => (
                    <TouchableOpacity
                        key={session._id}
                        onPress={() => {
                            setSelectedSession(session);
                            setSelectedSeats([]); 
                        }}
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
                        {selectedSession.seats.map((seat, index) => {
                            const isSelected = selectedSeats.includes(seat.number);
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => seat.available && handleSeatSelection(seat.number)}
                                    className={`w-12 h-12 flex justify-center items-center rounded-lg ${seat.available
                                        ? isSelected
                                            ? "bg-blue-500"
                                            : "bg-green-500"
                                        : "bg-gray-700 opacity-50"
                                        }`}
                                    disabled={!seat.available}
                                >
                                    <Text className="text-white font-semibold">{seat.number}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            )}

            <TouchableOpacity className="bg-red-600 py-4 rounded-xl mt-3" onPress={handleReservation}>
                <Text className="text-white text-center text-lg font-semibold">
                    Book Tickets ({selectedSeats.length})
                </Text>
            </TouchableOpacity>
        </View>
    );
}
