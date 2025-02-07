import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "./movieSlice";
import { getSessionsForMovie } from "../server/session";
import { createReservarion } from "../server/reservation";

export interface Salle {
    _id: string;
    name: string;
}

export interface Seance {
    isAvailable(seat: any, isAvailable: any): void;
    _id: string;
    movieId: Movie;
    roomId: Salle;
    seats: { number: number; available: boolean }[];
    name: string;
    capacite: number;
    start_date: number;
    end_date: number;
}

interface SeanceState {
    seance: Seance[];
    loading: boolean;
    error: string | null;
}

const initialState: SeanceState = {
    seance: [],
    loading: false,
    error: null,
};

export const fetchSessions = createAsyncThunk<Seance[], string>(
    "seances/fetchSessions",
    async (movieId: string, { rejectWithValue }) => {
        try {
            return await getSessionsForMovie(movieId);
        } catch (err) {
            console.error("Error fetching sessions:", err);
            return rejectWithValue("Failed to fetch sessions");
        }
    }
);



const seanceSlice = createSlice({
    name: "seances",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSessions.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchSessions.fulfilled, (state, action: PayloadAction<Seance[]>) => {
            state.seance = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchSessions.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
    }
});

export default seanceSlice.reducer;
