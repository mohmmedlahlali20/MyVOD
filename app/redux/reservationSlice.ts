import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createReservarion, Reservation } from "../server/reservation";


interface ReservationStat {
    reservations: Reservation[],
    sessionr: any,
    seats:number,
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}



const initialState: ReservationStat = {
    reservations: [],
    sessionr: {},
    seats: 0,
    status: "idle",
    error: null,
}


export const createReservations = createAsyncThunk(
    "reservations/createReservation",
    async ({ session, seats, userId }: Reservation, { rejectWithValue }) => {
        try {
            const response = await createReservarion(session, seats, userId);
            console.log("response", response);
            return response.data;
        } catch (err) {
            console.error("Error creating reservation:", err);
            return rejectWithValue("Failed to create reservation");
        }
    }
);

const reservationsSlice = createSlice({
    name: "reservations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(createReservations.pending, (state) => {
                state.status = "loading";
            })
           .addCase(createReservations.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reservations = [...state.reservations, action.payload];
            })
           .addCase(createReservations.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            });
    },
})

export default reservationsSlice.reducer;