import { configureStore } from '@reduxjs/toolkit';
import authreducer from './userSlice';

const store = configureStore({
      reducer: {
        user: authreducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


