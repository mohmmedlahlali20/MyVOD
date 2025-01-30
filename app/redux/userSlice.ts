import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";



export type User = {
    _id:string,
    name:string,
    email:string
    favorites:string[]
}

const initialState: {
    user: User | null;
    token: string | null;
    isloading: boolean;
} = {
    user: null,
    token: null,
    isloading: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isloading = false;
            AsyncStorage.setItem('token', action.payload.token);
            AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout(state) {
            state.user = null;
            state.token = null;
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('user');
        }
    }
})


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;