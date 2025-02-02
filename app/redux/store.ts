import { configureStore } from '@reduxjs/toolkit';
import authreducer from './userSlice';
import Moviesreducer from './movieSlice';

const store = configureStore({
      reducer: {
        user: authreducer,
        movies: Moviesreducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


