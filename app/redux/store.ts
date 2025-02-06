import { configureStore } from '@reduxjs/toolkit';
import authreducer from './userSlice';
import Moviesreducer from './movieSlice';
import seanceReducer from './seanceSlice';
import ReservationsReducer from './reservationSlice'

const store = configureStore({
      reducer: {
        user: authreducer,
        movies: Moviesreducer,
        seance: seanceReducer,
        reservations: ReservationsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


