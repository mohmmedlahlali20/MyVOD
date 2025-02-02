import { createAsyncThunk } from "@reduxjs/toolkit";
import path from "../axios/path";

export interface Movie{
    id: number;
    title: string;
    description: string;
    genre: string;
    image: string;
    publishedDate: string;
    director: string;
    movies: string;
}

export interface MovieListProps{
    movies: Movie[];
}

export interface MovieDetailsProps{
    movie: Movie;
}

export const fetchMovie = createAsyncThunk<Movie[]>("fetchMovies", async () => {
   try{
    const res = await path.get("film/getAllFilms");
    return res.data;

   }catch(error){
       console.log(error);
   }
})

export const fetchMovieDetails = createAsyncThunk<Movie, number>("fetchMovieDetails", async (movieId: number) => {
    try{
        const res = await path.get(`film/getFilms/${movieId}`);
        return res.data;
    }catch(error){
        console.log(error);
    }
});