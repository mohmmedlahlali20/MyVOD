import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import path from "../axios/path";

export interface Movie {
  _id: number;
  title: string;
  description: string;
  genre: string;
  image: string;
  publishedDate: string;
  director: string;
  movies: string;
}
export interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  error: null,
};

export const fetchMovie = createAsyncThunk<Movie[], void>(
    "movies/fetchMovies",
    async (_, { rejectWithValue }) => {
      try {
        const res = await path.get("film/getAllFilms");
     
        if (!Array.isArray(res.data.films)) {
          throw new Error("Invalid API response");
        }
  
        return res.data.films; 
      } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || error.message || "Failed to fetch movies");
      }
    }
  );
  

export const fetchMovieDetails = createAsyncThunk<Movie, string>(
  "movies/fetchMovieDetails",
  async (movieId, { rejectWithValue }) => {
    try {
      const res = await path.get(`film/getFilms/${movieId}`);
      if (!res.data) throw new Error("Invalid movie details response");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.message || "Failed to fetch movie details");
    }
  }
);


const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.selectedMovie = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default moviesSlice.reducer;
