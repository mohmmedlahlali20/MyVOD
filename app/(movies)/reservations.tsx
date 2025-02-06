import { View, Text,Image } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchMovieDetails } from '../redux/movieSlice'
import { LinearGradient } from "expo-linear-gradient";

const reservations = () => {
    const { movieId } = useLocalSearchParams()
    const dispatch = useDispatch<AppDispatch>();
    const { selectedMovie: movie, error } = useSelector((state: RootState) => state.movies);
    const {seance} = useSelector((state: RootState) => state.seance);


    useEffect(() => {
        if (movieId) {
            dispatch(fetchMovieDetails(movieId as string));
        }

    }, [dispatch, movieId]);

    return (
        <View className='flex-1 bg-black'>
            <Stack.Screen
                options={{
                    title: movie ? movie.title : 'Loading...',
                    headerStyle: { backgroundColor: "transparent" },
                    headerTintColor: "white",
                    headerTransparent: true,
                }}
            />
            <Text>
               

            </Text>
        </View>
    )
}

export default reservations