import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((movie) => movie !== action.payload);
    },
  },
});

export const { login, logout, register, addFavorite, removeFavorite } = authSlice.actions;
export default authSlice.reducer;
