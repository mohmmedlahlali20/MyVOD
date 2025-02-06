import AsyncStorage from "@react-native-async-storage/async-storage";
import {  createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import path from "../axios/path";

export type User = {
  id: string;
  name: string;
  email: string;
  favorites: string[];
};

type UserPayload = {
  user: User;
  token: string;
};

const initialState: {
  user: User | null;
  token: string | null;
  favorites: string[];
  isLoading: boolean;
} = {
  user: null,
  token: null,
  favorites: [],
  isLoading: false,
};

export const addMovieIntoFavorits = createAsyncThunk(
  "addMovieIntoFavorits",
  async ({ movieId, movieData }: { movieId: string; movieData: any }, { rejectWithValue }) => {
    try {
     
      
      const response = await path.post(`favoris/addFavoris/${movieId}`, movieData);
      return response.data;
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
      return rejectWithValue("Failed to add movie to favorites");
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserPayload>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.favorites = [];

      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    },
    register(state, action: PayloadAction<UserPayload>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
